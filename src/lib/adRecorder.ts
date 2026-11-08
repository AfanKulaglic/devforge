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

    for (let i = 0; i < totalFrames; i++) {
      if (aborted || signal?.aborted) throw new Error("Snimanje prekinuto");

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
        // Nastavi dalje sa prethodnim kadrom umjesto da sve propadne.
        if (!ctx) throw err;
        await videoSource.add(i / FPS, 1 / FPS);
        continue;
      }

      ctx.fillStyle = "#040807";
      ctx.fillRect(0, 0, AD_W, AD_H);
      ctx.drawImage(snapshot, 0, 0, AD_W, AD_H);

      await videoSource.add(i / FPS, 1 / FPS);
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
  // MediaRecorder nije potreban, ali provjerimo da nema ociglednih blokada.
  if (!window.isSecureContext && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
    return "Snimanje zahtijeva HTTPS ili localhost.";
  }
  return null;
}
