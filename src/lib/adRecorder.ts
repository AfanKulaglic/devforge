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

  // ── A) Skriveni iframe sa reklamom u punoj rezoluciji ──
  const frame = document.createElement("iframe");
  frame.src = new URL("/reklama?record=1", window.location.origin).href;
  frame.setAttribute("aria-hidden", "true");
  frame.setAttribute("tabindex", "-1");
  frame.style.cssText = [
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
  document.body.appendChild(frame);

  let aborted = false;
  const onAbort = () => {
    aborted = true;
  };
  signal?.addEventListener("abort", onAbort, { once: true });

  try {
    // Sacekaj da se iframe ucita (React mount + fontovi + ikone).
    await new Promise<void>((resolve, reject) => {
      const timer = window.setTimeout(
        () => reject(new Error("Reklama se nije učitala u 25s. Provjerite da li je /reklama dostupna.")),
        25000,
      );
      frame.onload = () => {
        window.clearTimeout(timer);
        resolve();
      };
      frame.onerror = () => {
        window.clearTimeout(timer);
        reject(new Error("Iframe nije mogao učitati /reklama"));
      };
    });

    const doc = frame.contentDocument;
    const win = frame.contentWindow as (Window & typeof globalThis) | null;
    if (!doc || !win) throw new Error("Iframe nije dostupan (cross-origin?)");

    console.info("[adRecorder] iframe loaded, waiting for .ad-reel");
    const reel = await waitForElement(doc, ".ad-reel", 20000);
    console.info("[adRecorder] reel found", {
      w: (reel as HTMLElement).offsetWidth,
      h: (reel as HTMLElement).offsetHeight,
    });
    // Ikone su SVG (sinkrone), ali fontovi mogu kasniti — sacekaj ih.
    await waitForFonts(doc);
    await sleep(400);

    // ── B) Canvas + mediabunny izlaz ──
    const canvas = document.createElement("canvas");
    canvas.width = AD_W;
    canvas.height = AD_H;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) throw new Error("Canvas 2D nije dostupan u ovom browseru");
    ctx.fillStyle = "#040807";
    ctx.fillRect(0, 0, AD_W, AD_H);

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
    console.info("[adRecorder] output started");

    const frameInterval = 1000 / FPS;
    const start = performance.now();

    // ── Snimanje u stvarnom vremenu ──
    //
    // Reklama u iframe-u se vrti real-time (setTimeout po sceni). Ako bismo
    // samo upisivali N kadrova u niz sa fiksnim 1/FPS razmakom, a toCanvas je
    // sporiji od 1/FPS, snimak bi "preskocio" vrijeme i video bi bio brzi od
    // pregleda.
    //
    // Zato svaki kadar dobije timestamp iz STVARNOG proteklog vremena:
    //   timestamp = (now - start) / 1000
    // i trajanje = razlika do sljedeceg timestampa. Tako video traje tacno
    // onoliko koliko je snimanje trajalo — a toCanvas ne moze "ubrzati" video.
    //
    // Da video ne bi bio predugacak na sporim uredjajima, ogranicavamo
    // ukupno trajanje na `totalMs` (trajanje reklame u pregledu).
    let lastTimestamp = 0;
    const maxDuration = totalMs / 1000;

    for (let i = 0; i < totalFrames; i++) {
      if (aborted || signal?.aborted) throw new Error("Snimanje prekinuto");

      const elapsed = (performance.now() - start) / 1000;
      // Stani kad predjemo stvarno trajanje reklame.
      if (elapsed >= maxDuration) break;

      // Cekaj da prodje 1/FPS od prethodnog kadra (animacija napreduje).
      const targetTime = start + i * frameInterval;
      const wait = targetTime - performance.now();
      if (wait > 0) await sleep(wait);

      let snapshot: HTMLCanvasElement;
      try {
        snapshot = await toCanvas(reel as HTMLElement, {
          canvasWidth: AD_W,
          canvasHeight: AD_H,
          width: AD_W,
          height: AD_H,
          pixelRatio: 1,
          backgroundColor: "#040807",
          // Klonirani cvor se renderuje van toka dokumenta — `position: fixed`
          // bi mu dao pogresne mere, pa ga forsiramo na relative.
          style: { position: "relative", left: "0", top: "0", transform: "none" },
          // Fontovi se ne mijenjaju izmedju kadrova — preskoci ponovno citanje.
          skipFonts: true,
          // Preskoci elemente koji mogu rusiti render.
          filter: (node) => {
            const name = (node as HTMLElement).nodeName;
            return name !== "IFRAME" && name !== "SCRIPT";
          },
        });
      } catch (err) {
        // Nastavi dalje — preskoci kadar, ali ne gubi vrijeme.
        if (!ctx) throw err;
        void err;
        continue;
      }

      ctx.fillStyle = "#040807";
      ctx.fillRect(0, 0, AD_W, AD_H);
      ctx.drawImage(snapshot, 0, 0, AD_W, AD_H);

      // Stvarni timestamp + trajanje do sljedeceg kadra.
      // Timestampi moraju biti monotono rastuci i ne smiju se preklapati,
      // pa trajanje racunamo iz razlike stvarnog vremena, uz minimalni 1/FPS.
      const now = Math.min((performance.now() - start) / 1000, maxDuration);
      const duration = Math.max(now - lastTimestamp, 1 / FPS);
      await videoSource.add(lastTimestamp, duration);
      lastTimestamp = lastTimestamp + duration;
      if (i === 0) console.info("[adRecorder] first frame added", snapshot.width, snapshot.height);

      if (i % 2 === 0 || i === totalFrames - 1) {
        onProgress({
          phase: "recording",
          frame: i + 1,
          totalFrames,
          percent: Math.round(((i + 1) / totalFrames) * 100),
        });
      }
    }

    onProgress({ phase: "encoding", frame: totalFrames, totalFrames, percent: 100 });
    await output.finalize();

    const buffer = output.target.buffer;
    if (!buffer) throw new Error("MP4 nije nastao");

    const blob = new Blob([buffer], { type: "video/mp4" });
    onProgress({ phase: "done", frame: totalFrames, totalFrames, percent: 100 });
    return blob;
  } finally {
    signal?.removeEventListener("abort", onAbort);
    frame.remove();
  }
}

/** Pretvori bilo kakav "throw" (ukljucujuci objekte) u citljiv string. */
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

  const frame = document.createElement("iframe");
  frame.src = new URL("/reklama?record=1", window.location.origin).href;
  frame.setAttribute("aria-hidden", "true");
  frame.style.cssText = ["position:fixed", "left:0", "top:0", `width:${AD_W}px`, `height:${AD_H}px`, "border:0", "opacity:0", "pointer-events:none", "z-index:-1"].join(";");
  document.body.appendChild(frame);

  let aborted = false;
  const onAbort = () => { aborted = true; };
  signal?.addEventListener("abort", onAbort, { once: true });

  try {
    await new Promise<void>((resolve, reject) => {
      const timer = window.setTimeout(() => reject(new Error("Reklama se nije učitala u 25s.")), 25000);
      frame.onload = () => { window.clearTimeout(timer); resolve(); };
    });

    const doc = frame.contentDocument;
    if (!doc) throw new Error("Iframe nije dostupan");
    const reel = await waitForElement(doc, ".ad-reel", 20000);
    await waitForFonts(doc);
    await sleep(400);

    const canvas = document.createElement("canvas");
    canvas.width = AD_W;
    canvas.height = AD_H;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) throw new Error("Canvas 2D nije dostupan");
    ctx.fillStyle = "#040807";
    ctx.fillRect(0, 0, AD_W, AD_H);

    const stream = canvas.captureStream(FPS);
    const mime = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"].find((m) =>
      MediaRecorder.isTypeSupported(m),
    );
    if (!mime) throw new Error("MediaRecorder ne podržava WebM u ovom browseru");

    const chunks: BlobPart[] = [];
    const recorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 12_000_000 });
    recorder.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
    recorder.start();

    const frameInterval = 1000 / FPS;
    const start = performance.now();
    const maxDuration = totalMs / 1000;

    for (let i = 0; i < totalFrames; i++) {
      if (aborted || signal?.aborted) throw new Error("Snimanje prekinuto");
      // Stani kad predjemo stvarno trajanje reklame (kao u MP4 putanji).
      if ((performance.now() - start) / 1000 >= maxDuration) break;
      const wait = start + i * frameInterval - performance.now();
      if (wait > 0) await sleep(wait);

      try {
        const snap = await toCanvas(reel as HTMLElement, {
          canvasWidth: AD_W,
          canvasHeight: AD_H,
          width: AD_W,
          height: AD_H,
          pixelRatio: 1,
          backgroundColor: "#040807",
          style: { position: "relative", left: "0", top: "0", transform: "none" },
          skipFonts: true,
        });
        ctx.fillStyle = "#040807";
        ctx.fillRect(0, 0, AD_W, AD_H);
        ctx.drawImage(snap, 0, 0, AD_W, AD_H);
      } catch {
        /* drzi prethodni kadar */
      }

      if (i % 2 === 0 || i === totalFrames - 1) {
        onProgress({ phase: "recording", frame: i + 1, totalFrames, percent: Math.round(((i + 1) / totalFrames) * 100) });
      }
    }

    onProgress({ phase: "encoding", frame: totalFrames, totalFrames, percent: 100 });
    await new Promise<void>((resolve) => {
      recorder.onstop = () => resolve();
      recorder.stop();
    });

    const blob = new Blob(chunks, { type: mime.split(";")[0] });
    stream.getTracks().forEach((t) => t.stop());
    onProgress({ phase: "done", frame: totalFrames, totalFrames, percent: 100 });
    return blob;
  } finally {
    signal?.removeEventListener("abort", onAbort);
    frame.remove();
  }
}
