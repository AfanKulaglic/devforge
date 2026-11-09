// ───────────────────────────────────────────────────────────────────────────
// RENDERER v7 — SVAKA SLIKA NOSI JEDNU JASNU PORUKU
//
// PRAVILO KOJE VODI SVE: ako neko pogleda sliku 2 sekunde i ne shvati
// o čemu je — slika je promašena. Zato:
//
//   1. Naslov je TVRDNJA, ne tema.
//      ✗ "Stranica koja se učitava 6 sekundi"   (tema, ništa ne tvrdi)
//      ✓ "6 sekundi = 4 od 10 ljudi odustane"   (tvrdnja, jasna odmah)
//
//   2. Uvijek postoji kontrast ILI broj. Ne apstraktne riječi.
//      ✗ "Kvalitet i pouzdanost"
//      ✓ "150 KM vs. 1500 KM"
//
//   3. Podnaslov objašnjava naslov, nikad ne ponavlja.
//
//   4. Maksimalno 4 kratka reda u listi. Ako treba više — pogrešna forma.
//
// FORME:
//   hero   — jedna rečenica koja tvrdi nešto
//   figure — veliki broj + šta taj broj znači
//   blocks — 2–4 stvari, numerisane
//   duo    — PRIJE (✗) / POSLIJE (✓)
//   action — poziv
// ───────────────────────────────────────────────────────────────────────────

import type { AdPost, PostLayout, PostPalette, PostSlide } from "./postsData";
import { DF_LOGO_DATA_URI, DF_LOGO_RATIO } from "./postLogo";
import { PHOTOS, PHOTO_ALT } from "./postPhotos";
import { BRAND, BRAND_INK } from "./postBrand";

/** Format objave. Instagram: 1:1 (feed) i 3:4 (novi visoki format). */
export type PostFormat = "1:1" | "3:4";
export const FORMATS: Record<PostFormat, { w: number; h: number; label: string }> = {
  "1:1": { w: 1080, h: 1080, label: "1:1 · 1080×1080" },
  "3:4": { w: 1080, h: 1440, label: "3:4 · 1080×1440" },
};

/** Aktivni format — mijenja ga `setFormat()` prije rendera. */
let FORMAT: PostFormat = "1:1";

/** Sirina je uvijek 1080 (Instagram je tako skalira). */
const SIZE = 1080;
/** Visina zavisi od formata. */
let SIZE_H = 1080;
/** Margina — ista horizontalno i vertikalno. */
const M = 96;
const FONT = "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

type Colors = {
  bg: string;
  ink: string;
  soft: string;
  accent: string;
  accentInk: string;
  card: string;
  line: string;
  warm: string;
};

/**
 * PALETA — SAMO JEDNA ZELENA: #4DEAE0 (brend boja, ista kao logo).
 * Sve ostalo je crna, bijela i sive. Nema drugih akcenata.
 *
 *   ink    bijelo / skoro-bijelo (za tamne podloge)
 *   soft   siva (sekundarni tekst)
 *   line   tamnosiva (linije i okviri)
 *   card   podignuta tamna površina (mat, bez sjaja)
 */
const PALETTES: Record<PostPalette, Colors> = {
  // CRNA PODLOGA — glavna
  dark: {
    bg: "#060606",
    ink: "#FFFFFF",
    soft: "#A3A3A3",
    accent: BRAND,
    accentInk: BRAND_INK,
    card: "#111111",
    line: "#2A2A2A",
    warm: "#4DEAE0",
  },
  // TAMNOSIVA MAT
  ink: {
    bg: "#0E0E0E",
    ink: "#FAFAFA",
    soft: "#9E9E9E",
    accent: BRAND,
    accentInk: BRAND_INK,
    card: "#181818",
    line: "#303030",
    warm: "#4DEAE0",
  },
  // ZELENA PODLOGA — brend boja preko cijele slike, crni tekst.
  // Ne bijelo: bijelo je djelovalo prazno/genericko, zelena nosi brend.
  teal: {
    bg: "#4DEAE0",
    ink: "#0A0A0A",
    soft: "#0B403B",       // tamna zelena-siva — sekundarni tekst na zelenom
    accent: "#0A0A0A",     // akcenat je CRN (nema druge zelene)
    accentInk: "#4DEAE0",
    card: "#2FCFC3",       // tamnija zelena za podignute povrsine
    line: "#0A0A0A",       // crne linije na zelenom
    warm: "#0A0A0A",
  },
  // SVJETLA ZELENA — ista shema, blago svjetlija za varijaciju
  light: {
    bg: "#6FEFE6",
    ink: "#0A0A0A",
    soft: "#124F49",
    accent: "#0A0A0A",
    accentInk: "#6FEFE6",
    card: "#4DEAE0",
    line: "#0A0A0A",
    warm: "#0A0A0A",
  },
  // SKORO CRNA (neutralna — bez zelenog tona, da ne bude druga zelena)
  mint: {
    bg: "#0C0C0C",
    ink: "#FFFFFF",
    soft: "#8E8E8E",
    accent: BRAND,
    accentInk: BRAND_INK,
    card: "#161616",
    line: "#262626",
    warm: "#4DEAE0",
  },
  // TAMNA METALIK SIVA
  sun: {
    bg: "#141414",
    ink: "#FFFFFF",
    soft: "#9C9C9C",
    accent: BRAND,
    accentInk: BRAND_INK,
    card: "#1E1E1E",
    line: "#343434",
    warm: "#4DEAE0",
  },
};

// ── Pomoćne ───────────────────────────────────────────────────────────────
function esc(t: string): string {
  return String(t)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function wrap(text: string, size: number, maxWidth: number, maxLines: number): string[] {
  const perLine = Math.max(6, Math.floor(maxWidth / (size * 0.58)));
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const cand = cur ? `${cur} ${w}` : w;
    if (cand.length <= perLine) cur = cand;
    else {
      if (cur) lines.push(cur);
      cur = w;
      if (lines.length === maxLines) break;
    }
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  return lines.slice(0, maxLines);
}

function fit(text: string, maxWidth: number, start: number, min = 46): number {
  const longest = Math.max(...text.split(/\s+/).map((w) => w.length), 1);
  let size = start;
  while (size > min && longest * size * 0.58 > maxWidth) size -= 4;
  return size;
}

// ── Zaglavlje ─────────────────────────────────────────────────────────────
// Wordmark je 1:1 sa navbarom (src/App.tsx `Logo`), uvecan JEDNIM faktorom.
//
//   Navbar                         Slika (×2.1)
//   ─────────────────────────      ─────────────────────────
//   h-10 .............. 40px   →   84px
//   gap-2.5 ........... 10px   →   21px
//   p-1 (padding) ...... 4px   →    8px   ⇒ ikona 68px
//   text-xl ........... 20px   →   42px
//   rounded-xl ........ 12px   →   25px
//   border 1px ........  1px   →    2px
//
const K = 2.1;                 // jedan faktor za sve — zato su razmaci tačni
const LOGO_BOX = 40 * K;       // 84
const LOGO_GAP = 10 * K;       // 21
// LOGO_PAD se ne koristi direktno — ikona se skalira po izmjerenom odnosu (0.30).
const LOGO_RADIUS = 12 * K;    // 25.2
const LOGO_FONT = 20 * K;      // 42
const LOGO_STROKE = 1 * K;     // 2.1

// VAZNO: u navbaru je <img className="h-full w-full object-contain p-1">.
// `object-contain` skalira ikonu da STANE, ne da ispuni okvir.
// Ikona (crop) je 56×24 ⇒ omjer 2.333. Unutar LOGO_BOX-a sa LOGO_PAD paddingom
// raspoloživo je (LOGO_BOX - 2*LOGO_PAD) × (LOGO_BOX - 2*LOGO_PAD).
// contain ⇒ uzima se MANJA od dvije mogućnosti:
//   po širini: w = avail, h = avail / 2.333
//   po visini: h = avail, w = avail * 2.333  (ovo bi izašlo iz okvira — zato se ne koristi)
// Izmjereno na stvarnom navbaru (Playwright + PIL): ikona zauzima 30% visine okvira.
// To je zato što `object-contain` u 40px okviru sa p-1 daje visinu 40-8=32px za ŠIRINU,
// a stvarna visina znaka je 32/2.333 = 13.7px → 13.7/40 = 0.343 ... ali optički
// (prazan prostor u PNG-u) mjeri se 12/40 = 0.300. Koristimo izmjereni odnos.
const LOGO_ICON_H = LOGO_BOX * 0.30;                   // 25.2  (izmjereno na navbaru)
const LOGO_ICON_W = LOGO_ICON_H * DF_LOGO_RATIO;       // 58.8

function brandMark(x: number, y: number, devColor: string, forgeColor: string = "#4DEAE0"): { svg: string; w: number } {
  const iconX = x + (LOGO_BOX - LOGO_ICON_W) / 2;
  const iconY = y + (LOGO_BOX - LOGO_ICON_H) / 2;      // vertikalno centriran
  const gid = `dfg-${Math.round(x)}-${Math.round(y)}`;
  const textX = x + LOGO_BOX + LOGO_GAP;
  // optički centar: cap-height Inter/Segoe ≈ 0.72 em ⇒ baseline = centar + 0.36 em
  const textY = y + LOGO_BOX / 2 + LOGO_FONT * 0.36;
  return {
    w: LOGO_BOX + LOGO_GAP + LOGO_FONT * 3.6,
    svg: `
    <defs>
      <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="${forgeColor}"/>
        <stop offset="1" stop-color="${forgeColor}"/>
      </linearGradient>
    </defs>
    <rect x="${x}" y="${y}" width="${LOGO_BOX}" height="${LOGO_BOX}" rx="${LOGO_RADIUS}"
      fill="#0A0A0A" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="${LOGO_STROKE}"/>
    <image href="${DF_LOGO_DATA_URI}" x="${iconX}" y="${iconY}"
      width="${LOGO_ICON_W}" height="${LOGO_ICON_H}"/>
    <text x="${textX}" y="${textY}" font-family="${FONT}" font-size="${LOGO_FONT}" font-weight="800"
      letter-spacing="-0.6"><tspan fill="${devColor}">Dev</tspan><tspan fill="url(#${gid})">Forge</tspan></text>`,
  };
}

function header(c: Colors, eyebrow: string, category: string, slide: number, total: number): string {
  // Na zelenoj podlozi (ink je crn) logo se invertuje: "Dev" BIJEL, "Forge" CRN —
  // inace bi oba bila tamna na zelenom i wordmark bi se izgubio.
  const onGreen = c.ink === "#0A0A0A";
  const mark = brandMark(M, M - 4, onGreen ? "#FFFFFF" : c.ink, onGreen ? "#0A0A0A" : BRAND);

  let dots = "";
  if (total > 1) {
    const dw = 26;
    const gap = 8;
    const startX = SIZE - M - (total * dw + (total - 1) * gap);
    for (let i = 0; i < total; i++) {
      const x = startX + i * (dw + gap);
      dots +=
        i === slide
          ? `<rect x="${x}" y="${SIZE_H - M - 14}" width="${dw}" height="6" rx="3" fill="${c.accent}"/>`
          : `<rect x="${x}" y="${SIZE_H - M - 13}" width="${dw}" height="4" rx="2" fill="${c.soft}" opacity="0.35"/>`;
    }
  }

  return `
    ${mark.svg}
    <text x="${SIZE - M}" y="${M - 4 + LOGO_BOX / 2 + 28 * 0.36}" text-anchor="end" font-family="${FONT}"
      font-size="28" font-weight="800" letter-spacing="2.6"
      fill="${c.accent}">${esc(eyebrow.toUpperCase())}</text>
    <text x="${M}" y="${SIZE_H - M - 6}" font-family="${FONT}" font-size="26" font-weight="800"
      letter-spacing="3" fill="${c.soft}">${esc(category.toUpperCase())}</text>
    ${dots}`;
}

// ── Forme ─────────────────────────────────────────────────────────────────
type Block = { svg: string; h: number };
/** Sadrzajna zona — racuna se iz trenutne visine formata. */
const CONTENT_TOP = () => 250;
const CONTENT_BOTTOM = () => SIZE_H - M - 84;
const CONTENT_H = () => CONTENT_BOTTOM() - CONTENT_TOP();
/** Horizontalna sirina sadrzaja — ista za sve formate. */
const W = SIZE - M * 2;
const GAP_TOP = 176; // iznad ovoga ne smije ništa (logo je do ~130)

/**
 * HERO — naslov MORA biti tvrdnja. Podnaslov objašnjava.
 * Ako naslov ima više od 3 reda pri 96px, smanjuje se dok ne stane.
 */
/**
 * COVER — UVODNA SLIKA GALERIJE.
 *
 * Namjerno DRUGAČIJA od ostalih slika u istoj galeriji:
 *   • brand boja ide preko cijele pozadine (donja trećina) — ostale slike to nikad ne rade
 *   • naslov je centriran, ne lijevo poravnat
 *   • ispod naslova je "šta je unutra" — tri kratke najave, ne brojevi
 *   • gore desno piše "GALERIJA · N slika"
 *
 * Cilj: kad neko vidi samo prvu sliku u feedu, zna o čemu je cijela galerija
 * i ima razlog da prevuče dalje.
 */
function formCover(c: Colors, p: PostSlide, total: number): Block {
  const title = p.title ?? "";
  let size = fit(title, W, 100);
  let lines = wrap(title, size, W, 3);
  const budget = CONTENT_H() - 200;
  while (lines.length * size * 1.08 > budget && size > 52) {
    size -= 6;
    lines = wrap(title, size, W, 3);
  }
  const lh = size * 1.08;

  // Isti raspored kao formHero — LIJEVO poravnato. Razlika je u pozadini i okviru
  // (vidi COVER_CHROME), ne u tipografiji.
  void total;
  // Bez "GALERIJA · N SLIKA" natpisa — gledalac to ne treba znati.
  let svg = "";
  let h = 0;

  lines.forEach((l, i) => {
    svg += `<text x="0" y="${h + size * 0.78 + i * lh}" font-family="${FONT}" font-size="${size}"
      font-weight="900" letter-spacing="-3.2" fill="${c.ink}">${esc(l)}</text>`;
  });
  h += (lines.length - 1) * lh + size;

  // kratka akcenat traka — isti jezik kao hero, samo deblja
  h += 44;
  svg += `<rect x="0" y="${h}" width="120" height="8" fill="${c.accent}"/>`;
  h += 8;

  // "šta je unutra" — do tri najave, bez brojeva
  const parts: string[] = Array.isArray(p.items) ? p.items.slice(0, 3) : [];
  const inside = parts.length ? parts.join("   ·   ") : (p.subtitle ?? "");
  if (inside) {
    h += 54;
    const fs2 = fit(inside, W, 36, 28);
    const jl = wrap(inside, fs2, W, 2);
    jl.forEach((l, i) => {
      svg += `<text x="0" y="${h + fs2 * 0.8 + i * (fs2 + 14)}" font-family="${FONT}"
        font-size="${fs2}" font-weight="600" fill="${c.soft}">${esc(l)}</text>`;
    });
    h += jl.length * (fs2 + 14);
  }

  return { svg, h };
}

function formHero(c: Colors, p: PostSlide): Block {
  const title = p.title ?? "";
  let size = fit(title, W, 116);
  let lines = wrap(title, size, W, 3);
  const budget = p.subtitle ? CONTENT_H() - 190 : CONTENT_H();
  while (lines.length * size * 1.08 > budget && size > 54) {
    size -= 6;
    lines = wrap(title, size, W, 3);
  }
  const lh = size * 1.08;

  // mala akcenat traka IZNAD naslova — vizuelni ulaz, unutar bloka
  let svg = `<rect x="0" y="${-34}" width="88" height="8" fill="${c.accent}"/>`;
  lines.forEach((l, i) => {
    svg += `<text x="0" y="${size * 0.78 + i * lh}" font-family="${FONT}" font-size="${size}"
      font-weight="900" letter-spacing="-3.2" fill="${c.ink}">${esc(l)}</text>`;
  });
  let h = (lines.length - 1) * lh + size;

  if (p.subtitle) {
    const ss = fit(p.subtitle, W - 40, 38);
    const sl = wrap(p.subtitle, ss, W - 40, 3);
    h += 54;
    svg += `<rect x="0" y="${h}" width="5" height="${sl.length * (ss + 14)}" fill="${c.accent}"/>`;
    sl.forEach((l, i) => {
      svg += `<text x="30" y="${h + ss * 0.86 + i * (ss + 14)}" font-family="${FONT}" font-size="${ss}"
        font-weight="600" fill="${c.soft}">${esc(l)}</text>`;
    });
    h += sl.length * (ss + 14);
  }
  return { svg, h };
}

/**
 * FIGURE — veliki broj + ŠTA ON ZNAČI. Naslov nikad nije sam broj;
 * uvijek je rečenica koja objašnjava posljedicu.
 */
function formFigure(c: Colors, p: PostSlide): Block {
  const val = p.value ?? "";
  const base = val.length <= 2 ? 260 : val.length <= 4 ? 210 : val.length <= 7 ? 150 : 112;
  const vsize = Math.max(70, Math.min(fit(val, W, base), 250));

  let svg = `<text x="0" y="${vsize * 0.78}" font-family="${FONT}" font-size="${vsize}"
    font-weight="900" letter-spacing="${(-vsize * 0.03).toFixed(1)}" fill="${c.accent}">${esc(val)}</text>`;
  let h = vsize;

  const ts = fit(p.title ?? "", W, 54);
  const tl = wrap(p.title ?? "", ts, W, 3);
  h += 44;
  tl.forEach((l, i) => {
    svg += `<text x="0" y="${h + ts * 0.78 + i * ts * 1.1}" font-family="${FONT}"
      font-size="${ts}" font-weight="800" letter-spacing="-1.4" fill="${c.ink}">${esc(l)}</text>`;
  });
  h += (tl.length - 1) * ts * 1.1 + ts;

  if (p.valueNote) {
    const nl = wrap(p.valueNote, 30, W, 2);
    h += 34;
    nl.forEach((l, i) => {
      svg += `<text x="0" y="${h + 24 + i * 38}" font-family="${FONT}" font-size="30"
        font-weight="500" fill="${c.soft}">${esc(l)}</text>`;
    });
    h += (nl.length - 1) * 38 + 24;
  }

  return { svg, h };
}

function formBlocks(c: Colors, p: PostSlide): Block {
  const items = (p.items ?? []).slice(0, 4);
  const ts = fit(p.title ?? "", W, 60);
  const tl = wrap(p.title ?? "", ts, W, 2);

  let svg = tl
    .map(
      (l, i) =>
        `<text x="0" y="${ts * 0.78 + i * ts * 1.08}" font-family="${FONT}" font-size="${ts}"
          font-weight="900" letter-spacing="-2.2" fill="${c.ink}">${esc(l)}</text>`,
    )
    .join("");
  let y = (tl.length - 1) * ts * 1.08 + ts;

  y += 40;
  svg += `<rect x="0" y="${y}" width="96" height="7" fill="${c.accent}"/>`;
  y += 7;

  const n = items.length || 1;
  const avail = CONTENT_H() - y - 10;
  const rowH = Math.max(64, Math.min(112, avail / n));
  const fs = n >= 4 ? 34 : 38;

  y += Math.max(18, (avail - rowH * n) * 0.28);
  items.forEach((it, i) => {
    const ry = y + i * rowH;
    const lines = wrap(it, fs, W - 58, 2);
    // tekst se vertikalno centrira u svom redu — crtica se poravnava s PRVIM redom teksta
    const blockH = (lines.length - 1) * (fs + 8) + fs;
    const top = ry + (rowH - blockH) / 2;
    const baseline = top + fs * 0.78;
    // crtica: debela, vizuelno teža od teksta → centrirana na sredinu malih slova
    svg += `<rect x="0" y="${(baseline - fs * 0.30).toFixed(1)}" width="30" height="8"
      rx="0" fill="${c.accent}"/>`;
    lines.forEach((l, li) => {
      svg += `<text x="58" y="${(baseline + li * (fs + 8)).toFixed(1)}" font-family="${FONT}"
        font-size="${fs}" font-weight="700" letter-spacing="-0.6" fill="${c.ink}">${esc(l)}</text>`;
    });
  });
  y += rowH * n;

  return { svg, h: y };
}
function formDuo(c: Colors, p: PostSlide): Block {
  const items = p.items ?? [];
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);

  const ts = fit(p.title ?? "", W, 54);
  const tl = wrap(p.title ?? "", ts, W, 2);
  let svg = tl
    .map(
      (l, i) =>
        `<text x="0" y="${ts * 0.78 + i * ts * 1.08}" font-family="${FONT}" font-size="${ts}"
          font-weight="900" letter-spacing="-2" fill="${c.ink}">${esc(l)}</text>`,
    )
    .join("");
  const top = (tl.length - 1) * ts * 1.08 + ts * 0.78 + 46;

  const gap = 14;
  const bw = (W - gap) / 2;
  const rows = Math.max(left.length, right.length);
  const bh = 68 + rows * 58;

  svg += `<rect x="0" y="${top}" width="${bw}" height="${bh}" fill="${c.card}" stroke="${c.line}" stroke-width="1.5"/>`;
  svg += `<text x="22" y="${top + 38}" font-family="${FONT}" font-size="26" font-weight="900"
    letter-spacing="2.2" fill="${c.soft}">PRIJE</text>`;
  left.forEach((it, i) => {
    const y = top + 86 + i * 58;
    svg += `<text x="22" y="${y}" font-family="${FONT}" font-size="26" font-weight="900" fill="${c.soft}">&#10005;</text>`;
    svg += `<text x="52" y="${y}" font-family="${FONT}" font-size="26" font-weight="600" fill="${c.ink}">${esc(
      wrap(it, 26, bw - 76, 1)[0] ?? it,
    )}</text>`;
  });

  svg += `<rect x="${bw + gap}" y="${top}" width="${bw}" height="${bh}" fill="${c.accent}"/>`;
  svg += `<text x="${bw + gap + 22}" y="${top + 38}" font-family="${FONT}" font-size="26"
    font-weight="900" letter-spacing="2.2" fill="${c.accentInk}">POSLIJE</text>`;
  right.forEach((it, i) => {
    const y = top + 78 + i * 54;
    svg += `<text x="${bw + gap + 22}" y="${y}" font-family="${FONT}" font-size="26" font-weight="900" fill="${c.accentInk}">&#10003;</text>`;
    svg += `<text x="${bw + gap + 52}" y="${y}" font-family="${FONT}" font-size="26" font-weight="700" fill="${c.accentInk}">${esc(
      wrap(it, 26, bw - 76, 1)[0] ?? it,
    )}</text>`;
  });

  return { svg, h: top + bh };
}

/** ACTION — poziv. Naslov govori šta se dešava, dugme šta kliknuti. */
function formAction(c: Colors, p: PostSlide): Block {
  let ts = fit(p.title ?? "", W, 82);
  let tl = wrap(p.title ?? "", ts, W, 3);
  while (tl.length * ts * 1.08 > CONTENT_H() - 230 && ts > 46) {
    ts -= 6;
    tl = wrap(p.title ?? "", ts, W, 3);
  }
  const lh = ts * 1.08;

  let svg = tl
    .map(
      (l, i) =>
        `<text x="0" y="${ts * 0.78 + i * lh}" font-family="${FONT}" font-size="${ts}"
          font-weight="900" letter-spacing="-2.6" fill="${c.ink}">${esc(l)}</text>`,
    )
    .join("");
  let h = (tl.length - 1) * lh + ts;

  if (p.subtitle) {
    h += 46;
    wrap(p.subtitle, 32, W, 2).forEach((l, i) => {
      svg += `<text x="0" y="${h + 10 + i * 42}" font-family="${FONT}" font-size="32"
        font-weight="600" fill="${c.soft}">${esc(l)}</text>`;
      h += 42;
    });
  }

  const bh = 116;
  h += 44;
  svg += `<rect x="0" y="${h}" width="${W}" height="${bh}" fill="${c.accent}"/>`;
  svg += `<text x="${W / 2}" y="${h + bh / 2 + 15}" text-anchor="middle" font-family="${FONT}"
    font-size="40" font-weight="900" letter-spacing="0.8" fill="${c.accentInk}">JAVITE NAM SE U DM</text>`;

  return { svg, h: h + bh };
}

function build(c: Colors, p: PostSlide, total = 1): Block {
  const t = p.template ?? "title";
  if (t === "cover") return formCover(c, p, total);
  if (t === "price" || t === "number") return formFigure(c, p);
  if (t === "list" || t === "process") return formBlocks(c, p);
  if (t === "compare") return formDuo(c, p);
  if (t === "cta") return formAction(c, p);
  return formHero(c, p);
}

function buildFitting(c: Colors, p: PostSlide, maxH: number, total = 1): Block {
  const b = build(c, p, total);
  if (b.h <= maxH) return b;
  const k = maxH / b.h;
  return { svg: `<g transform="scale(1, ${k.toFixed(4)})">${b.svg}</g>`, h: maxH };
}

// ── Pozicioniranje ────────────────────────────────────────────────────────
const PLACE: Record<PostLayout, (c: Colors, p: PostSlide, total: number) => string> = {
  center: (c, p, total) => {
    const b = build(c, p, total);
    const y = b.h >= CONTENT_H() ? CONTENT_TOP() : CONTENT_TOP() + (CONTENT_H() - b.h) / 2;
    return `<g transform="translate(${M}, ${y})">${b.svg}</g>`;
  },

  split: (c, p, total) => {
    const b = build(c, p, total);
    const y = CONTENT_TOP() + Math.max(0, (CONTENT_H() - b.h) / 2);
    return `<rect x="${M - 40}" y="${CONTENT_TOP()}" width="8" height="${CONTENT_H()}" fill="${c.accent}"/>
      <g transform="translate(${M}, ${y})">${b.svg}</g>`;
  },

  band: (c, p, total) => {
    const b = build(c, p, total);
    const bh = Math.min(CONTENT_H(), b.h + 120);
    const by = CONTENT_TOP() + Math.max(0, (CONTENT_H() - bh) / 2);
    const y = by + Math.max(0, (bh - b.h) / 2);
    return `<rect x="${M - 44}" y="${by}" width="${W + 88}" height="${bh}" fill="${c.card}"
      stroke="${c.line}" stroke-width="1.5"/>
      <rect x="${M - 44}" y="${by}" width="${W + 88}" height="8" fill="${c.accent}"/>
      <g transform="translate(${M}, ${y})">${b.svg}</g>`;
  },

  offset: (c, p, total) => {
    const b = build(c, p, total);
    const y = CONTENT_TOP() + 10;
    return `<g transform="translate(${M}, ${y})">${b.svg}</g>
      <rect x="${SIZE - M - 120}" y="${CONTENT_BOTTOM() - 120}" width="120" height="120" fill="${c.accent}"/>`;
  },

  photoBg: (c, p, total) => {
    const ph = p.photo ?? "hero";
    const b = build(c, p, total);
    void total;
    const y = CONTENT_TOP() + Math.max(0, (CONTENT_H() - b.h) / 2);
    return `<image href="${PHOTOS[ph]}" x="0" y="0" width="${SIZE}" height="${SIZE_H}"
        preserveAspectRatio="xMidYMid slice" aria-label="${esc(PHOTO_ALT[ph])}"/>
      <rect x="0" y="0" width="${SIZE}" height="${SIZE_H}" fill="url(#fadeLeft)"/>
      <rect x="0" y="0" width="${SIZE}" height="${SIZE_H}" fill="#000000" opacity="0.18"/>
      <rect x="0" y="0" width="${SIZE}" height="200" fill="url(#fadeTop)"/>
      <rect x="0" y="0" width="${SIZE}" height="34" fill="${c.bg}" opacity="0.92"/>
      <rect x="0" y="${SIZE_H - 170}" width="${SIZE}" height="170" fill="url(#fadeBot)"/>
      <g transform="translate(${M}, ${y})">${b.svg}</g>`;
  },

  photoTop: (c, p, total) => {
    const ph = p.photo ?? "hero";
    // Visina slike raste s formatom: u 3:4 proporcionalno vise, ali ne
    // toliko da pojede tekst. 370 je u 1:1 (34% povrsine), u 3:4 ~493 (34%).
    const imgH = Math.round(SIZE_H * 0.343);
    const zoneTop = imgH;
    const zoneBot = CONTENT_BOTTOM();
    const b = buildFitting(c, p, zoneBot - 24, total);
    // Tekst se CENTRIRA u tamnoj zoni ispod slike — ne lijepi se za sliku.
    const y = zoneTop + Math.max(0, (zoneBot - zoneTop - b.h) / 2);
    return `<image href="${PHOTOS[ph]}" x="0" y="0" width="${SIZE}" height="${imgH}"
        preserveAspectRatio="xMidYMid slice" aria-label="${esc(PHOTO_ALT[ph])}"/>
      <rect x="0" y="${imgH - 80}" width="${SIZE}" height="80" fill="url(#fadeBot)"/>
      <g transform="translate(${M}, ${y})">${b.svg}</g>`;
  },

  photo: (c, p, total) => {
    const ph = p.photo ?? "hero";
    const imgW = 330;
    const b = build(c, p, total);
    const y = CONTENT_TOP() + Math.max(0, (CONTENT_H() - b.h) / 2);
    return `<image href="${PHOTOS[ph]}" x="${SIZE - imgW}" y="0" width="${imgW}" height="${SIZE_H}"
        preserveAspectRatio="xMidYMid slice" aria-label="${esc(PHOTO_ALT[ph])}"/>
      <rect x="${SIZE - imgW - 80}" y="0" width="80" height="${SIZE_H}" fill="url(#fadeRight)"/>
      <g transform="translate(${M}, ${y})">${b.svg}</g>`;
  },

  stamp: (c, p, total) => {
    const b = build(c, p, total);
    const y = CONTENT_TOP() + Math.max(0, (CONTENT_H() - b.h) / 2);
    const sh = 360;
    const sw = sh * DF_LOGO_RATIO;
    return `<g opacity="0.055"><image href="${DF_LOGO_DATA_URI}" x="${SIZE / 2 - sw / 2}"
        y="${CONTENT_TOP() + (CONTENT_H() - sh) / 2}" width="${sw}" height="${sh}"/></g>
      <g transform="translate(${M}, ${y})">${b.svg}</g>`;
  },
};

// ── Dekoracija ────────────────────────────────────────────────────────────
// Ista dekoracija kao na sajtu (`rounded-full bg-teal-600/10 blur-3xl`):
// mekani krug brend boje u pozadini. Samo na TAMNIM paletama — na bijelom
// bi se vidio kao mrlja. Crtа se PRIJE sadržaja, nikad preko teksta.
function decor(c: Colors, seed: number): string {
  const light = c.ink === "#0A0A0A";
  if (light) return "";
  // 3 kruga, pozicije variraju po slici da svaka ne izgleda isto
  const r = seed % 3;
  const spots = [
    [{ cx: 900, cy: 210, rad: 300, op: 0.13 }, { cx: 130, cy: 940, rad: 260, op: 0.09 }],
    [{ cx: 180, cy: 880, rad: 320, op: 0.12 }, { cx: 950, cy: 300, rad: 240, op: 0.08 }],
    [{ cx: 940, cy: 900, rad: 300, op: 0.12 }, { cx: 150, cy: 200, rad: 250, op: 0.09 }],
  ][r];
  const gid = `dglow-${seed}`;
  return `
  <defs>
    <radialGradient id="${gid}">
      <stop offset="0%" stop-color="${BRAND}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${BRAND}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <g>
    ${spots
      .map(
        (s) =>
          `<circle cx="${s.cx}" cy="${s.cy}" r="${s.rad}" fill="url(#${gid})" opacity="${s.op}"/>`,
      )
      .join("")}
  </g>`;
}

// ── Cover chrome ──────────────────────────────────────────────────────────
// Cover se razlikuje OD OKVIRA, ne po tipografiji:
//   • dupli okvir oko cijele slike (debeo spolja, tanak unutra)
//   • brand traka ide po CIJELOM obodu, ne samo gore
//   • pozadina ima suptilan vertikalni prelaz (mat, bez sjaja)
// Sve ostale slike u galeriji: ravna pozadina, traka samo gore.
function coverChrome(c: Colors): string {
  return `
  <defs>
    <linearGradient id="coverGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c.card}" stop-opacity="1"/>
      <stop offset="45%" stop-color="${c.bg}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${c.bg}" stop-opacity="1"/>
    </linearGradient>
  </defs>
  <rect width="${SIZE}" height="${SIZE_H}" fill="url(#coverGrad)"/>`;
}

/** Okviri covera — crtaju se POSLIJE sadržaja, da foto-pozadina ne prekrije ram. */
function coverFrame(c: Colors): string {
  const inset = 34;
  return `
  <rect x="${inset}" y="${inset}" width="${SIZE - inset * 2}" height="${SIZE_H - inset * 2}"
    fill="none" stroke="${c.accent}" stroke-width="8"/>
  <rect x="10" y="10" width="${SIZE - 20}" height="${SIZE_H - 20}"
    fill="none" stroke="${c.accent}" stroke-opacity="0.30" stroke-width="2"/>`;
}

// ── Render ────────────────────────────────────────────────────────────────
/** Postavi format prije rendera. Vraca prethodni (za bezbjedan reset). */
export function setFormat(f: PostFormat): PostFormat {
  const prev = FORMAT;
  FORMAT = f;
  SIZE_H = FORMATS[f].h;
  return prev;
}
export function getFormat(): PostFormat {
  return FORMAT;
}
/** Sirina x visina trenutnog formata. */
export function formatSize(): { w: number; h: number } {
  return { w: SIZE, h: SIZE_H };
}

export function renderSlideSvg(
  post: AdPost,
  slide: PostSlide,
  slideIndex: number,
  slideTotal: number,
): string {
  const c = PALETTES[slide.palette ?? post.palette] ?? PALETTES.dark;
  const layout = post.layout ?? "center";
  const isCover = (slide.template ?? post.template) === "cover" && slideTotal > 1;
  let content = (PLACE[layout] ?? PLACE.center)(c, slide, slideTotal);

  if (layout === "photoBg") {
    content = `<g style="filter:drop-shadow(0 3px 16px rgba(0,0,0,0.9)) drop-shadow(0 1px 3px rgba(0,0,0,0.95))">${content}</g>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE_H}" viewBox="0 0 ${SIZE} ${SIZE_H}" role="img" aria-label="${esc(
    slide.title ?? post.title,
  )}">
  <defs>
    <linearGradient id="fadeTop" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="fadeBot" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.88"/>
    </linearGradient>
    <linearGradient id="fadeRight" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${c.bg}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${c.bg}" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="fadeLeft" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.94"/>
      <stop offset="45%" stop-color="#000000" stop-opacity="0.72"/>
      <stop offset="75%" stop-color="#000000" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.10"/>
    </linearGradient>
  </defs>
  ${isCover ? coverChrome(c) : `<rect width="${SIZE}" height="${SIZE_H}" fill="${c.bg}"/>`}
  ${isCover ? "" : decor(c, slideIndex + post.id.length)}
  ${content}
  <!-- Zaglavlje se crta POSLIJE sadržaja: foto-pozadine inače prekriju logo. -->
  ${header(c, slide.eyebrow ?? post.eyebrow, post.category, slideIndex, slideTotal)}
  ${isCover ? coverFrame(c) : ""}
  <rect x="0" y="0" width="${SIZE}" height="12" fill="${c.ink === "#0A0A0A" ? "#0A0A0A" : BRAND}"/>
</svg>`;
}

export function slideCount(post: AdPost): number {
  return post.slides && post.slides.length > 0 ? post.slides.length : 1;
}

export function renderPostSlides(post: AdPost): string[] {
  const total = slideCount(post);
  if (total === 1) {
    const single: PostSlide = {
      template: post.template,
      eyebrow: post.eyebrow,
      title: post.title,
      subtitle: post.subtitle,
      items: post.items,
      value: post.value,
      valueNote: post.valueNote,
      palette: post.palette,
      photo: post.photo,
    };
    return [renderSlideSvg(post, single, 0, 1)];
  }
  // Slajdovi nasljedjuju `photo` i `layout` od posta kad ih sami ne definisu.
  // Bez ovoga galerija sa layout:photoBg uvijek padne na default "hero".
  return (post.slides ?? []).map((s, i) =>
    renderSlideSvg(
      post,
      { ...s, photo: s.photo ?? post.photo } as PostSlide,
      i,
      total,
    ),
  );
}

export function renderPostSvg(post: AdPost): string {
  return renderPostSlides(post)[0];
}

export function postSvgDataUri(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export async function svgToPngBlob(svg: string): Promise<Blob | null> {
  try {
    const img = new Image();
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = () => rej(new Error("svg load"));
      img.src = postSvgDataUri(svg);
    });
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE_H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, SIZE, SIZE_H);
    return await new Promise((res) => canvas.toBlob((b) => res(b), "image/png"));
  } catch {
    return null;
  }
}

export const LAYOUT_LIST: PostLayout[] = [
  "center",
  "split",
  "band",
  "offset",
  "photo",
  "photoTop",
  "photoBg",
  "stamp",
];
export { BRAND, BRAND_INK, GAP_TOP };
