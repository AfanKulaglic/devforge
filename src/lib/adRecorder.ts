import { BufferTarget, CanvasSource, Mp4OutputFormat, Output, Quality } from "mediabunny";

// ───────────────────────────────────────────────────────────────────────────
// Snimanje reklame u MP4 — varijanta sa `getDisplayMedia`.
//
// Zasto ova varijanta: DOM->canvas pristup (html-to-image) je bio prekompleksan
// i nepouzdan — spora rasterizacija, gubitak rezolucije, neuskladjena brzina.
//
// `getDisplayMedia` snima STVARNI piksel output browsera: rezolucija je tacna
// (1080x1920 iz naseg okvira), fps je tacan (60), boje i blur su identicni
// pregledu. Nema rekonstrukcije DOM-a, nema gubitka kvaliteta.
//
// Tok:
//   1. Otvorimo `/reklama?record=1` u NOVOM prozoru (1080x1920).
//   2. `getDisplayMedia` — korisnik odabere taj prozor (jedan klik).
//   3. Snimamo video track u realnom vremenu kroz mediabunny -> MP4 H.264.
//   4. Zatvorimo prozor, ponudimo download.
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

/**
 * Snimi reklamu u MP4 (H.264) preko snimanja ekrana.
 *
 * Korisnik mora odabrati prozor sa reklamom u dijalogu koji browser prikaze.
 */
export async function recordAdToMp4({
  sceneDurations,
  onProgress,
  signal,
}: Options): Promise<Blob> {
  const totalMs = sceneDurations.reduce((a, b) => a + b, 0);
  const totalFrames = Math.round((totalMs / 1000) * FPS);
  onProgress({ phase: "loading", frame: 0, totalFrames, percent: 0 });

  // 1) Otvori prozor sa reklamom u punoj rezoluciji.
  const win = window.open(
    new URL("/reklama?record=1", window.location.origin).href,
    "devforge-ad-reel",
    `width=${AD_W},height=${AD_H},menubar=no,toolbar=no,location=no,status=no,resizable=yes`,
  );
  if (!win) {
    throw new Error(
      "Browser je blokirao prozor sa reklamom. Dozvolite pop-up za ovu stranicu pa pokušajte ponovo.",
    );
  }

  let stream: MediaStream | null = null;
  let aborted = false;
  const onAbort = () => {
    aborted = true;
  };
  signal?.addEventListener("abort", onAbort, { once: true });

  try {
    // Sacekaj da se prozor ucita i da reklama krene.
    await new Promise<void>((resolve) => {
      const timer = window.setInterval(() => {
        try {
          if (win.document.querySelector(".ad-reel")) {
            window.clearInterval(timer);
            resolve();
          }
        } catch {
          /* cross-origin dok se ucitava */
        }
      }, 150);
      window.setTimeout(() => window.clearInterval(timer), 15000);
    });

    // Ponovo pokreni reklamu od scene 0 preko postMessage.
    try {
      win.postMessage({ type: "ad:reset" }, window.location.origin);
    } catch {
      /* ignorisi */
    }
    await sleep(400);

    // 2) Trazi dozvolu za snimanje ekrana — korisnik bira prozor reklame.
    const display = await navigator.mediaDevices.getDisplayMedia({
      video: {
        // Trazimo tacnu rezoluciju; browser daje najblizu mogucu.
        width: { ideal: AD_W },
        height: { ideal: AD_H },
        frameRate: { ideal: FPS, max: 60 },
      },
      audio: false,
    });
    stream = display;

    const track = display.getVideoTracks()[0];
    if (!track) throw new Error("Nema video zapisa u odabranom izvoru");

    // 3) Postavi canvas u tacnoj rezoluciji i crtaj dolazne kadrove.
    const canvas = document.createElement("canvas");
    canvas.width = AD_W;
    canvas.height = AD_H;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) throw new Error("Canvas 2D nije dostupan");
    ctx.fillStyle = "#040807";
    ctx.fillRect(0, 0, AD_W, AD_H);

    // Video element koji prima stream, pa crtamo u nas canvas.
    const video = document.createElement("video");
    video.srcObject = display;
    video.muted = true;
    video.playsInline = true;
    await video.play();

    await new Promise<void>((resolve) => {
      if (video.videoWidth) return resolve();
      video.onloadedmetadata = () => resolve();
    });

    const srcW = video.videoWidth || AD_W;
    const srcH = video.videoHeight || AD_H;

    // Skaliraj proporcionalno (contain) — nikad ne rastezi sliku.
    const scale = Math.min(AD_W / srcW, AD_H / srcH);
    const drawW = Math.round(srcW * scale);
    const drawH = Math.round(srcH * scale);
    const offX = Math.round((AD_W - drawW) / 2);
    const offY = Math.round((AD_H - drawH) / 2);

    console.info("[adRecorder] capture", { srcW, srcH, drawW, drawH, offX, offY });

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

    while (!aborted && !signal?.aborted) {
      if ((performance.now() - start) / 1000 >= maxDuration) break;

      // Crtaj trenutni kadar stream-a u canvas (visoka rezolucija, bez gubitka).
      ctx.fillStyle = "#040807";
      ctx.fillRect(0, 0, AD_W, AD_H);
      if (video.readyState >= 2) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(video, offX, offY, drawW, drawH);
      }

      const now = Math.min((performance.now() - start) / 1000, maxDuration);
      if (now - prev < 1 / FPS) {
        await sleep(Math.max(1, (1 / FPS - (now - prev)) * 1000));
        continue;
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
    stream?.getTracks().forEach((t) => t.stop());
    try {
      win.close();
    } catch {
      /* prozor je vec zatvoren */
    }
  }
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, Math.max(0, ms)));
}

/** Skida fajl na uredjaj. */
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

/** Provjeri podrsku prije pokretanja. */
export function checkRecorderSupport(): string | null {
  if (typeof window === "undefined") return "Snimanje radi samo u browseru.";
  if (!navigator.mediaDevices?.getDisplayMedia) {
    return "Ovaj browser ne podržava snimanje ekrana (getDisplayMedia). Koristite Chrome/Edge/Firefox na desktopu.";
  }
  if (!window.isSecureContext && !["localhost", "127.0.0.1"].includes(window.location.hostname)) {
    return "Snimanje zahtijeva HTTPS ili localhost.";
  }
  if (typeof (window as unknown as { VideoEncoder?: unknown }).VideoEncoder !== "function") {
    return "Ovaj browser ne podržava WebCodecs. Koristite Chrome/Edge 94+.";
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

/**
 * WebM fallback preko MediaRecorder-a — koristi isti `getDisplayMedia` stream,
 * pa je i kvalitet identican. Kontejner je WebM (VP9) umjesto MP4.
 */
export async function recordAdToWebm(opts: Options): Promise<Blob> {
  // Isti pristup, samo drugi muxer — pozajmljujemo MP4 tok i prekodiramo?
  // Ne: MediaRecorder snima stream direktno, bez canvasa, sto je najkvalitetnije.
  const { sceneDurations, onProgress, signal } = opts;
  const totalMs = sceneDurations.reduce((a, b) => a + b, 0);
  const totalFrames = Math.round((totalMs / 1000) * FPS);
  onProgress({ phase: "loading", frame: 0, totalFrames, percent: 0 });

  const win = window.open(
    new URL("/reklama?record=1", window.location.origin).href,
    "devforge-ad-reel",
    `width=${AD_W},height=${AD_H},menubar=no,toolbar=no,location=no,status=no`,
  );
  if (!win) throw new Error("Browser je blokirao prozor sa reklamom. Dozvolite pop-up.");

  let stream: MediaStream | null = null;
  let aborted = false;
  const onAbort = () => {
    aborted = true;
  };
  signal?.addEventListener("abort", onAbort, { once: true });

  try {
    await new Promise<void>((resolve) => {
      const timer = window.setInterval(() => {
        try {
          if (win.document.querySelector(".ad-reel")) {
            window.clearInterval(timer);
            resolve();
          }
        } catch {
          /* ignore */
        }
      }, 150);
      window.setTimeout(() => window.clearInterval(timer), 15000);
    });
    try {
      win.postMessage({ type: "ad:reset" }, window.location.origin);
    } catch {
      /* ignore */
    }
    await sleep(400);

    stream = await navigator.mediaDevices.getDisplayMedia({
      video: { width: { ideal: AD_W }, height: { ideal: AD_H }, frameRate: { ideal: FPS, max: 60 } },
      audio: false,
    });

    const mime = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"].find((m) =>
      MediaRecorder.isTypeSupported(m),
    );
    if (!mime) throw new Error("MediaRecorder ne podržava WebM");

    const chunks: BlobPart[] = [];
    const recorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 12_000_000 });
    recorder.ondataavailable = (e) => {
      if (e.data.size) chunks.push(e.data);
    };
    recorder.start();

    const maxDuration = totalMs / 1000;
    const start = performance.now();
    while (!aborted && !signal?.aborted) {
      const elapsed = (performance.now() - start) / 1000;
      if (elapsed >= maxDuration) break;
      onProgress({
        phase: "recording",
        frame: Math.round(elapsed * FPS),
        totalFrames,
        percent: Math.min(99, Math.round((elapsed / maxDuration) * 100)),
      });
      await sleep(200);
    }

    onProgress({ phase: "encoding", frame: totalFrames, totalFrames, percent: 100 });
    await new Promise<void>((resolve) => {
      recorder.onstop = () => resolve();
      recorder.stop();
    });

    const blob = new Blob(chunks, { type: mime.split(";")[0] });
    onProgress({ phase: "done", frame: totalFrames, totalFrames, percent: 100 });
    return blob;
  } finally {
    signal?.removeEventListener("abort", onAbort);
    stream?.getTracks().forEach((t) => t.stop());
    try {
      win.close();
    } catch {
      /* ignore */
    }
  }
}
