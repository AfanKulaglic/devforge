import { BufferTarget, CanvasSource, Mp4OutputFormat, Output, Quality } from "mediabunny";
import { toCanvas } from "html-to-image";

// ───────────────────────────────────────────────────────────────────────────
// Snimanje reklame u MP4 — sve u browseru, bez servera.
//
// Izlaz: MP4 H.264, 1080×1920 (9:16), 30 fps — Instagram Reels / Story /
// TikTok / Facebook format, tacno ono sto se vidi u pregledu na /reklama.
//
// Dva koraka:
//   A) iframe 1080x1920 ucita /reklama?record=1  → reklama u punoj rezoluciji
//      (bez panela; `cqh` jedinice se skaliraju na 1920px, ne na 90vh).
//   B) svakih 1/30 s: .ad-reel → html-to-image → canvas -> mediabunny -> MP4
//
// Zasto ne MediaRecorder + captureStream: canvas stream snima samo ono sto se
// crta u canvas, ali nam treba DOM sa CSS-om. MediaRecorder nad canvas-om bi
// radio tek kad bismo sami crtali kadar po kadar — sto je upravo ovo gore,
// samo sa MP4 muxerom umjesto MediaRecorder-a (MediaRecorder ne daje MP4 u
// svim browserima, mediabunny daje uvijek).
// ───────────────────────────────────────────────────────────────────────────

export const AD_W = 1080;
export const AD_H = 1920;
const FPS = 30;

export type RecordProgress = {
  phase: "loading" | "recording" | "encoding" | "done";
  frame: number;
  totalFrames: number;
  percent: number;
};

type Options = {
  sceneDurations: number[];
  onProgress: (p: RecordProgress) => void;
  signal?: AbortSignal;
};

/**
 * Snimi reklamu u MP4 (1080×1920, H.264, 30fps) i vrati Blob.
 * @throws ako browser ne podrzava potrebne API-je ili korisnik prekine.
 */
export async function recordAdToMp4({
  sceneDurations,
  onProgress,
  signal,
}: Options): Promise<Blob> {
  const totalMs = sceneDurations.reduce((a, b) => a + b, 0);
  const totalFrames = Math.round((totalMs / 1000) * FPS);
  onProgress({ phase: "loading", frame: 0, totalFrames, percent: 0 });
  console.info("[adRecorder] start", { totalFrames, totalMs, AD_W, AD_H, FPS });

  const frame = await openReelFrame();
  let aborted = false;
  const onAbort = () => { aborted = true; };
  signal?.addEventListener("abort", onAbort, { once: true });

  try {
    const { reel } = await waitForReel(frame);
    const { canvas, ctx } = makeCanvas();

    const output = new Output({
      format: new Mp4OutputFormat(),
      target: new BufferTarget(),
    });
    const videoSource = new CanvasSource(canvas, {
      codec: "avc",
      bitrate: new Quality("very-high"),
    });
    output.addVideoTrack(videoSource);
    await output.start();

    const maxDuration = totalMs / 1000;
    const start = performance.now();
    let written = 0;
    let prev = 0;

    // Ubrzaj rasterizaciju — skini blur/backdrop-filter tokom snimanja.
    const restoreEffects = stripHeavyEffects(frame.doc as Document);

    // ── SNAMANJE ──
    // Kljucno pravilo: timestamp kadra = STVARNO proteklo vrijeme.
    // Trajanje = razlika do sljedeceg stvarnog kadra. Time video uvijek
    // traje `maxDuration` sekundi, bez obzira na brzinu toCanvas-a.
    while (!aborted && !signal?.aborted) {
      const elapsed = (performance.now() - start) / 1000;
      if (elapsed >= maxDuration) break;

      // Uhvati kadar (moze potrajati 50-300ms).
      let snap: HTMLCanvasElement | null = null;
      try {
        snap = await toCanvas(reel, REEL_SNAPSHOT_OPTS);
      } catch {
        snap = null;
      }

      const now = Math.min((performance.now() - start) / 1000, maxDuration);
      if (now - prev < 1 / FPS) {
        // Preblizu prethodnom kadru — sacekaj da prodje barem jedan frame.
        await sleep(Math.max(1, (1 / FPS - (now - prev)) * 1000));
        continue;
      }

      if (snap) {
        ctx.fillStyle = "#040807";
        ctx.fillRect(0, 0, AD_W, AD_H);
        ctx.drawImage(snap, 0, 0, AD_W, AD_H);
      }

      await videoSource.add(prev, now - prev);
      prev = now;
      written++;

      onProgress({
        phase: "recording",
        frame: written,
        totalFrames,
        percent: Math.min(99, Math.round((now / maxDuration) * 100)),
      });
    }

    restoreEffects();

    // Popuni do kraja ako je zadnji kadar ranije uhvacen.
    if (prev < maxDuration) {
      await videoSource.add(prev, maxDuration - prev);
    }

    console.info("[adRecorder] recording done", {
      written,
      endedAt: Number(prev.toFixed(2)),
      maxDuration: Number(maxDuration.toFixed(2)),
      effectiveFps: Number((written / Math.max(prev, 0.001)).toFixed(1)),
    });

    onProgress({ phase: "encoding", frame: totalFrames, totalFrames, percent: 100 });
    await output.finalize();

    const buffer = output.target.buffer;
    if (!buffer) throw new Error("MP4 nije nastao");

    const blob = new Blob([buffer], { type: "video/mp4" });
    onProgress({ phase: "done", frame: totalFrames, totalFrames, percent: 100 });
    return blob;
  } finally {
    signal?.removeEventListener("abort", onAbort);
    frame.el.remove();
  }
}

/** Opcije za toCanvas — iste u MP4 i WebM putanji. */
const REEL_SNAPSHOT_OPTS = {
  width: AD_W,
  height: AD_H,
  canvasWidth: AD_W,
  canvasHeight: AD_H,
  pixelRatio: 1,
  backgroundColor: "#040807",
  style: { position: "relative", left: "0", top: "0", transform: "none" },
  skipFonts: true,
  filter: (node: Node) => {
    const name = (node as HTMLElement).nodeName;
    return name !== "IFRAME" && name !== "SCRIPT";
  },
} as const;

/**
 * Ukloni skupe CSS efekte prije snimanja (blur/backdrop-filter).
 *
 * Zasto: `toCanvas` mora da rasterizuje 1080x1920 sa 13 `filter: blur()` i
 * nekoliko `backdrop-filter` slojeva. To traje 100-300ms po kadru, pa snimak
 * ima malo kadrova i izgleda trzawo/sporo. Bez blura rasterizacija je 5-10x
 * brza, a razlika u izgledu je minimalna (blur je ionako suptilan).
 *
 * Vraca funkciju za vracanje originalnih vrijednosti.
 */
function stripHeavyEffects(root: Document | HTMLElement): () => void {
  const restore: Array<() => void> = [];
  const nodes = root.querySelectorAll<HTMLElement>("*");
  nodes.forEach((el) => {
    const cs = (root as Document).defaultView?.getComputedStyle(el) ?? window.getComputedStyle(el);
    const filter = cs.filter;
    const backdrop = cs.backdropFilter || (cs as unknown as { webkitBackdropFilter?: string }).webkitBackdropFilter;
    if (filter && filter !== "none" && filter.includes("blur")) {
      const prev = el.style.filter;
      el.style.filter = "none";
      restore.push(() => { el.style.filter = prev; });
    }
    if (backdrop && backdrop !== "none" && backdrop.includes("blur")) {
      const prev = el.style.backdropFilter;
      el.style.backdropFilter = "none";
      restore.push(() => { el.style.backdropFilter = prev; });
    }
  });
  return () => restore.forEach((fn) => fn());
}

function makeCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = AD_W;
  canvas.height = AD_H;
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) throw new Error("Canvas 2D nije dostupan u ovom browseru");
  ctx.fillStyle = "#040807";
  ctx.fillRect(0, 0, AD_W, AD_H);
  return { canvas, ctx };
}

/** Napravi skriveni iframe 1080x1920 sa reklamom u record modu. */
async function openReelFrame() {
  const el = document.createElement("iframe");
  el.src = new URL("/reklama?record=1", window.location.origin).href;
  el.setAttribute("aria-hidden", "true");
  el.setAttribute("tabindex", "-1");
  el.style.cssText = [
    "position:fixed",
    "left:0",
    "top:0",
    `width:${AD_W}px`,
    `height:${AD_H}px`,
    "border:0",
    "opacity:0",
    "pointer-events:none",
    "z-index:-1",
  ].join(";");
  document.body.appendChild(el);

  await new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(
      () => reject(new Error("Reklama se nije učitala u 25s. Provjerite /reklama.")),
      25000,
    );
    el.onload = () => {
      window.clearTimeout(timer);
      resolve();
    };
    el.onerror = () => {
      window.clearTimeout(timer);
      reject(new Error("Iframe nije mogao učitati /reklama"));
    };
  });

  return { el, doc: el.contentDocument, win: el.contentWindow };
}

async function waitForReel(frame: { doc: Document | null; win: Window | null }) {
  const doc = frame.doc;
  if (!doc) throw new Error("Iframe nije dostupan (cross-origin?)");
  const reel = await waitForElement(doc, ".ad-reel", 20000);
  await waitForFonts(doc);

  // Vrati reklamu na scenu 0 da snimak pocne od pocetka. Bez ovoga bismo
  // uhvatili reklamu koja je vec odmakla (npr. 600ms) i snimak bi izgledao
  // "presporo" jer bi prva scena bila skracena.
  try {
    frame.win?.postMessage({ type: "ad:reset" }, window.location.origin);
  } catch {
    /* postMessage nije kriticno */
  }
  // Sacekaj da React obradi reset i da se prva animacija pokrene od nule.
  const firstScene = doc.querySelector(".ad-scene-enter");
  if (firstScene) {
    // Ukloni i vrati animaciju da krene ispocetka.
    (firstScene as HTMLElement).style.animation = "none";
    void (firstScene as HTMLElement).offsetWidth;
    (firstScene as HTMLElement).style.animation = "";
  }
  await sleep(120);

  console.info("[adRecorder] reel ready", {
    w: (reel as HTMLElement).offsetWidth,
    h: (reel as HTMLElement).offsetHeight,
  });
  return { reel: reel as HTMLElement };
}

/** Pretvori bilo kakav throw (ukljucujuci goli objekat) u citljiv string. */
export function describeError(err: unknown): string {
  if (err instanceof Error) return `${err.name}: ${err.message}`;
  if (typeof err === "string") return err;
  try {
    const json = JSON.stringify(err, Object.getOwnPropertyNames(err ?? {}), 1);
    return json === "{}" ? String(err) : json;
  } catch {
    return String(err);
  }
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, Math.max(0, ms)));
}

function waitForElement(doc: Document, selector: string, timeout: number) {
  return new Promise<Element>((resolve, reject) => {
    const found = doc.querySelector(selector);
    if (found) return resolve(found);

    const timer = window.setTimeout(() => {
      observer.disconnect();
      reject(
        new Error(
          `Reklama nije spremna (nema ${selector}). Provjerite da li se /reklama?record=1 ispravno prikazuje.`,
        ),
      );
    }, timeout);

    const Observer = doc.defaultView?.MutationObserver ?? MutationObserver;
    const observer = new Observer(() => {
      const el = doc.querySelector(selector);
      if (el) {
        window.clearTimeout(timer);
        observer.disconnect();
        resolve(el);
      }
    });
    observer.observe(doc.documentElement, { childList: true, subtree: true });
  });
}

async function waitForFonts(doc: Document) {
  try {
    await doc.fonts?.ready;
  } catch {
    /* fontovi nisu kriticni */
  }
}

/** Skida MP4 na uredjaj. */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 120000);
}

/**
 * Provjera podrske prije nego sto korisnik klikne.
 * Vraca null ako je sve u redu, inace poruku greske.
 */
export function checkRecorderSupport(): string | null {
  if (typeof window === "undefined") return "Snimanje radi samo u browseru.";
  if (typeof document.createElement("canvas").getContext !== "function") {
    return "Ovaj browser ne podržava canvas.";
  }
  if (!window.isSecureContext && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
    return "Snimanje zahtijeva HTTPS ili localhost.";
  }
  // mediabunny koristi WebCodecs API — bez njega MP4 ne moze nastati.
  if (typeof (window as unknown as { VideoEncoder?: unknown }).VideoEncoder !== "function") {
    return "Ovaj browser ne podržava WebCodecs (VideoEncoder). Koristite Chrome/Edge 94+ ili noviji.";
  }
  return null;
}

/** Da li browser moze krojiti H.264 u MP4 preko WebCodecs. */
export async function canEncodeH264(): Promise<boolean> {
  const VE = (window as unknown as { VideoEncoder?: { isConfigSupported?: (c: unknown) => Promise<{ supported?: boolean }> } })
    .VideoEncoder;
  if (!VE?.isConfigSupported) return false;
  try {
    const res = await VE.isConfigSupported({
      codec: "avc1.640028",
      width: AD_W,
      height: AD_H,
      bitrate: 12_000_000,
      framerate: FPS,
    });
    return res.supported === true;
  } catch {
    return false;
  }
}

// ───────────────────────────────────────────────────────────────────────────
// FALLBACK — WebM preko MediaRecorder-a (bez WebCodecs).
//
// Ako browser ne moze H.264 u MP4, snimamo isti canvas tok u WebM (VP9/VP8).
// Rezolucija i sadrzaj su identicni; samo kontejner nije MP4. Instagram i
// TikTok prihvataju WebM, a ako treba MP4 — konverzija je jedan klik u
// bilo kojem online konverteru.
// ───────────────────────────────────────────────────────────────────────────

export async function recordAdToWebm({
  sceneDurations,
  onProgress,
  signal,
}: Options): Promise<Blob> {
  const totalMs = sceneDurations.reduce((a, b) => a + b, 0);
  const totalFrames = Math.round((totalMs / 1000) * FPS);
  onProgress({ phase: "loading", frame: 0, totalFrames, percent: 0 });

  const frame = await openReelFrame();
  let aborted = false;
  const onAbort = () => { aborted = true; };
  signal?.addEventListener("abort", onAbort, { once: true });

  try {
    const { reel } = await waitForReel(frame);
    const { canvas, ctx } = makeCanvas();

    const stream = canvas.captureStream(FPS);
    const mime = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"].find((m) =>
      MediaRecorder.isTypeSupported(m),
    );
    if (!mime) throw new Error("MediaRecorder ne podržava WebM u ovom browseru");

    const chunks: BlobPart[] = [];
    const recorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 12_000_000 });
    recorder.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
    recorder.start();

    // MediaRecorder sam radi u realnom vremenu, pa samo crtamo sto brze mozemo.
    const maxDuration = totalMs / 1000;
    const start = performance.now();
    let written = 0;

    while (!aborted && !signal?.aborted) {
      const elapsed = (performance.now() - start) / 1000;
      if (elapsed >= maxDuration) break;

      try {
        const snap = await toCanvas(reel, REEL_SNAPSHOT_OPTS);
        ctx.fillStyle = "#040807";
        ctx.fillRect(0, 0, AD_W, AD_H);
        ctx.drawImage(snap, 0, 0, AD_W, AD_H);
        written++;
      } catch {
        /* zadrzi prethodni kadar */
      }

      onProgress({
        phase: "recording",
        frame: written,
        totalFrames,
        percent: Math.min(99, Math.round((elapsed / maxDuration) * 100)),
      });
    }

    onProgress({ phase: "encoding", frame: totalFrames, totalFrames, percent: 100 });
    await new Promise<void>((resolve) => {
      recorder.onstop = () => resolve();
      recorder.stop();
    });
    stream.getTracks().forEach((t) => t.stop());

    const blob = new Blob(chunks, { type: mime.split(";")[0] });
    console.info("[adRecorder] webm done", { written, size: blob.size });
    onProgress({ phase: "done", frame: totalFrames, totalFrames, percent: 100 });
    return blob;
  } finally {
    signal?.removeEventListener("abort", onAbort);
    frame.el.remove();
  }
}
