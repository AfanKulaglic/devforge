import { BufferTarget, CanvasSource, Mp4OutputFormat, Output, Quality } from "mediabunny";
import { toCanvas } from "html-to-image";

// ───────────────────────────────────────────────────────────────────────────
// Snimanje reklame u MP4 — sve u browseru, bez servera.
//
// Pristup:
//   1. Napravimo skriveni <iframe> sirine 1080px i visine 1920px i u njega
//      ucitamo /reklama?record=1&silent=1. Browser tamo renderuje reklamu u
//      punoj rezoluciji (cqh jedinice se skaliraju na 1920px visine).
//   2. Svakih 1/FPS sekundi pretvorimo DOM okvira u <canvas> (html-to-image),
//      pa canvas frame predamo mediabunny CanvasSource-u.
//   3. Na kraju mediabunny zatvori MP4 (H.264) i ponudimo download.
//
// Zasto iframe a ne snimanje postojeceg elementa: postojeci okvir je visine
// `min(90vh, ...)` pa bi snimak zavisio od velicine prozora. Iframe daje
// uvijek istih 1080x1920 — Instagram Reels / Story / TikTok standard.
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
 * Snimi reklamu u MP4 i vrati Blob.
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

  // 1) Skriveni iframe sa reklamom u punoj rezoluciji.
  const frame = document.createElement("iframe");
  frame.src = "/reklama?record=1";
  frame.setAttribute("aria-hidden", "true");
  frame.style.cssText = [
    "position:fixed",
    "left:-99999px",
    "top:0",
    `width:${AD_W}px`,
    `height:${AD_H}px`,
    "border:0",
    "visibility:hidden",
    "pointer-events:none",
  ].join(";");
  document.body.appendChild(frame);

  const cleanup = () => {
    frame.remove();
  };
  signal?.addEventListener("abort", cleanup, { once: true });

  try {
    await new Promise<void>((resolve, reject) => {
      const timer = window.setTimeout(() => reject(new Error("Reklama se nije učitala u 20s")), 20000);
      frame.onload = () => {
        window.clearTimeout(timer);
        resolve();
      };
    });

    const doc = frame.contentDocument;
    const win = frame.contentWindow as (Window & typeof globalThis) | null;
    if (!doc || !win) throw new Error("Iframe nije dostupan");

    // Sacekaj da React montira reklamu i da se ucitaju sve ikone/fontovi.
    const reel = await waitForElement(doc, ".ad-reel", 15000);
    await waitForFonts(doc);
    // Jedan frame da se stabilizuje layout.
    await sleep(250);

    // 2) Pripremi mediabunny izlaz.
    const output = new Output({
      format: new Mp4OutputFormat(),
      target: new BufferTarget(),
    });

    const canvas = document.createElement("canvas");
    canvas.width = AD_W;
    canvas.height = AD_H;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) throw new Error("Canvas 2D nije dostupan");
    ctx.fillStyle = "#040807";
    ctx.fillRect(0, 0, AD_W, AD_H);

    const videoSource = new CanvasSource(canvas, {
      codec: "avc",
      bitrate: new Quality("very-high"),
    });
    output.addVideoTrack(videoSource);
    await output.start();

    // 3) Snimi kadar po kadar.
    // Reklama se u iframe-u vrti po stvarnom vremenu, pa uzimamo kadar svakih
    // 1/FPS sekundi. Da ne bismo propustili scenu na sporom uredjaju, broj
    // kadrova se racuna iz ukupnog trajanja, a ne iz clock-a.
    const frameInterval = 1000 / FPS;
    const start = performance.now();

    for (let i = 0; i < totalFrames; i++) {
      if (signal?.aborted) throw new Error("Snimanje prekinuto");

      const target = start + i * frameInterval;
      const wait = target - performance.now();
      if (wait > 0) await sleep(wait);

      const snapshot = await toCanvas(reel as HTMLElement, {
        canvasWidth: AD_W,
        canvasHeight: AD_H,
        width: AD_W,
        height: AD_H,
        pixelRatio: 1,
        backgroundColor: "#040807",
        // Preskoci iframe-ove unutar reklame (nema ih, ali za svaki slucaj).
        filter: (node) => !(node instanceof win.HTMLIFrameElement),
      });

      ctx.fillStyle = "#040807";
      ctx.fillRect(0, 0, AD_W, AD_H);
      ctx.drawImage(snapshot, 0, 0, AD_W, AD_H);

      await videoSource.add(i / FPS, 1 / FPS);

      if (i % 3 === 0 || i === totalFrames - 1) {
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
    signal?.removeEventListener("abort", cleanup);
    cleanup();
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
      reject(new Error(`Element ${selector} se nije pojavio`));
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

/** Pokrene download MP4 fajla u browseru. */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Oslobodi memoriju tek kad browser zavrsi download.
  window.setTimeout(() => URL.revokeObjectURL(url), 60000);
}
