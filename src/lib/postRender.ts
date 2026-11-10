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

import type { AdPost, PhotoKey, PostLayout, PostPalette, PostSlide } from "./postsData";
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

// ── SV G ikone za oglas ────────────────────────────────────────────────────
// Layout "premium" crta SVG ručno (nema react-icons u lib sloju), zato su
// potrebne minijaturne ikone kao putanje. Svaka je 24×24 viewBox, stroke.
const PX_ICONS: Record<string, string> = {
  // Browser prozor: okvir + gornja traka + tri tacke + linije sadrzaja.
  // Prije je "web" bio globus (krug s meridijanima) — to citaju kao "internet",
  // ne kao "web stranica", pa ikona nije odgovarala labelu.
  web: "M3 4h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm0 5h18M5.5 6.5h.01M7.5 6.5h.01M9.5 6.5h.01M6 13h6M6 16h9",
  shop: "M3 7h18l-2 13H5L3 7Zm5 0V5a4 4 0 0 1 8 0v2",
  app: "M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm3 17h4",
  ai: "M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4M12 8a4 4 0 0 1 4 4c0 1.5-.8 2.7-2 3.4V17h-4v-1.6C8.8 14.7 8 13.5 8 12a4 4 0 0 1 4-4Z",
  check: "M5 12l5 5 9-10",
  shield: "M12 3l8 3v6c0 4-3 7-8 9-5-2-8-5-8-9V6l8-3Zm-3 8 2 2 4-4",
  rocket: "M5 19c-1.5 0-3-1-3-3 2 0 3 1 3 3ZM12 5l7 7-4 1-3 3-1-4-4 1-3-3 4-1 4-4ZM5 19c0-2 1-4 3-5",
  clock: "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
  chat: "M21 12a8 8 0 0 1-11.5 7.2L4 20l.8-5.5A8 8 0 1 1 21 12Z",
  bolt: "M13 3 4 14h6l-1 7 9-11h-6l1-7Z",
  coin: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5v8M9 12h6M10 10h4M10 14h4",
  layers: "M12 3 3 8l9 5 9-5-9-5ZM3 12l9 5 9-5M3 16l9 5 9-5",
  monitor: "M3 5h18v11H3V5Zm6 13h6M12 16v3",
  tools: "M14 6a4 4 0 0 1 6-1l-2 2-1-1-1 1-1-1-1 1V5a4 4 0 0 1 0 1ZM6 14l8-8 2 2-8 8-2-2Z",
  game: "M7 8h10a5 5 0 0 1 5 5v1a4 4 0 0 1-7.2 2.4L14 15h-4l-.8 1.4A4 4 0 0 1 2 14v-1a5 5 0 0 1 5-5Zm-1 4v2M5 13h1M16 12.5h.01M18 14h.01",
};

/** Crta ikonu u 48×48 ćeliju; ikona unutra 28px, centrirana. */
/**
 * Crta ikonu zadate veličine.
 *
 * BUG koji je ovo popravio: svi pathovi u PX_ICONS su crtani u koordinatnom
 * sistemu 0–24. Prije se path samo TRANSLIRAO, nikad SKALIRAO — pa je ikona
 * uvijek bila ~24px bez obzira na `size`. Zato su ikone "bile premale" iako je
 * kod tražio 64 ili 98px.
 *
 * Sada: viewBox 24 se skalira na `size`, pa `size` stvarno znači piksele.
 */
function pxIcon(name: string, x: number, y: number, color: string, size = 30): string {
  const d = PX_ICONS[name] ?? PX_ICONS.check;
  const k = size / 24; // 24 = izvorni viewBox svih ikona
  // Debljina linije raste s velicinom ikone — na 40px bi 2px izgledalo slabo.
  const sw = Math.max(2, size / 13) / k; // dijeli se s k jer grupa skalira
  return `<g transform="translate(${x},${y}) scale(${k.toFixed(4)})">
    <path d="${d}" fill="none" stroke="${color}" stroke-width="${sw.toFixed(2)}"
      stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;
}

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
//   ikona ............. 70%    →   70%
//   text-[22px] ....... 22px   →   46.2px
//   rounded-xl ........ 12px   →   25px
//   border 1px ........  1px   →    2px
//
const K = 2.1;                 // jedan faktor za sve — zato su razmaci tačni
const LOGO_BOX = 40 * K;       // 84
const LOGO_GAP = 10 * K;       // 21
const LOGO_RADIUS = 12 * K;    // 25.2
const LOGO_FONT = 22 * K;      // 46.2
const LOGO_STROKE = 1 * K;     // 2.1

// Ikonica je kvadratna (DF_LOGO_RATIO = 1) i zauzima 70% okvira na svim mjestima:
// navbar, reklama, objave i /logo. Ista proporcija = isti vizuelni ritam.
const LOGO_ICON_H = LOGO_BOX * 0.70;                   // 70% okvira - isto kao navbar
const LOGO_ICON_W = LOGO_ICON_H * DF_LOGO_RATIO;       // 1:1 → ista vrijednost

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
      letter-spacing="-0.6"><tspan fill="${devColor}">Dev</tspan><tspan fill="url(#${gid})">Lab</tspan></text>`,
  };
}

function header(c: Colors, eyebrow: string, category: string, slide: number, total: number): string {
  // Na zelenoj podlozi (ink je crn) logo se invertuje: "Dev" BIJEL, "Lab" CRN —
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
  const budget = p.subtitle ? CONTENT_H() - 230 : CONTENT_H() - 20;
  while (lines.length * size * 1.2 > budget && size > 54) {
    size -= 6;
    lines = wrap(title, size, W, 3);
  }
  const lh = size * 1.2;

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

  // Naslov: veći prored (1.22) da se redovi ne slijube — prije 1.1 je izgledalo zbijeno.
  const ts = fit(p.title ?? "", W, 54);
  const tl = wrap(p.title ?? "", ts, W, 3);
  const tlh = ts * 1.22;
  h += 52;
  tl.forEach((l, i) => {
    svg += `<text x="0" y="${h + ts * 0.78 + i * tlh}" font-family="${FONT}"
      font-size="${ts}" font-weight="800" letter-spacing="-1.4" fill="${c.ink}">${esc(l)}</text>`;
  });
  h += (tl.length - 1) * tlh + ts;

  if (p.valueNote) {
    const nl = wrap(p.valueNote, 30, W, 2);
    h += 44;
    nl.forEach((l, i) => {
      svg += `<text x="0" y="${h + 24 + i * 44}" font-family="${FONT}" font-size="30"
        font-weight="500" fill="${c.soft}">${esc(l)}</text>`;
    });
    h += (nl.length - 1) * 44 + 24;
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
  let y = (tl.length - 1) * ts * 1.15 + ts;

  y += 44;
  svg += `<rect x="0" y="${y}" width="96" height="7" fill="${c.accent}"/>`;
  y += 7;

  const n = items.length || 1;
  // Visina reda se racuna iz STVARNO raspolozivog prostora. `avail` je ogranicen
  // na preostali dio sadrzajne zone; buildFitting() će ga dodatno skalirati ako
  // layout (npr. photoTop) ima manju zonu od pune CONTENT_H().
  const avail = Math.max(0, CONTENT_H() - y - 10);
  const rowH = Math.max(64, Math.min(104, avail / n));
  const fs = n >= 4 ? 34 : 38;

  // Preostala visina za liste: ako je raspoloziv prostor manji od punog CONTENT_H()
  // (photoTop/photoBot), redovi se pakuju u ono sto stvarno ima.
  y += Math.max(18, Math.min(28, (avail - rowH * n) * 0.28));
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

// Build + bogati rep. Ako post ima features/terms/cta, rep se crta uz dno i
// forma iznad se SKALIRA da ne bi preklopila rep.
//
//   buildRich() vraca puni SVG za datu zonu (top..bottom).
function buildRich(c: Colors, p: PostSlide, opts: { left: number; width: number; top: number; bottom: number }, total = 1): string {
  const layer = richLayer(c, p, { bottom: opts.bottom, width: opts.width, left: opts.left });
  const b = build(c, p, total);
  const avail = layer.top - opts.top;
  // Forma se skalira samo ako stvarno ne stane — nikad raste.
  const svg = b.h > avail && avail > 0
    ? '<g transform="scale(1, ' + (avail / b.h).toFixed(4) + ')">' + b.svg + '</g>'
    : b.svg;
  const h = Math.min(b.h, Math.max(0, avail));
  const y = opts.top + Math.max(0, (avail - h) / 2);
  return '<g transform="translate(' + opts.left + ', ' + y + ')">' + svg + '</g>' + layer.svg;
}

function buildFitting(c: Colors, p: PostSlide, maxH: number, total = 1): Block {
  const b = build(c, p, total);
  if (b.h <= maxH) return b;
  const k = maxH / b.h;
  return { svg: `<g transform="scale(1, ${k.toFixed(4)})">${b.svg}</g>`, h: maxH };
}

// PREMIUM POZADINA — tamna fotografija + gradijenti koji je pretvaraju u podlogu.
//
// Zašto: ravna crna je bila čista ali "prazna" — izgledala kao najava, ne kao
// plaćeni oglas. Fotografija daje dubinu i ton, a gradijenti garantuju da tekst
// ostane čitljiv bez obzira na to gdje slika ima svijetle dijelove.
//
// Tri sloja preko slike, svaki ima svrhu:
//   1. tamni veo (opacity 0.62) — obara svjetlinu cijele slike
//   2. vertikalni gradijent gore→dolje — dno najtamnije, tu su brojke i uslovi
//   3. lijevi gradijent — lijevo je tekst, pa je lijevo najtamnije
function premiumBackdrop(ph: PhotoKey): string {
  return `
  <image href="${PHOTOS[ph]}" x="0" y="0" width="${SIZE}" height="${SIZE_H}"
    preserveAspectRatio="xMidYMid slice" aria-label="${esc(PHOTO_ALT[ph])}"/>
  <rect x="0" y="0" width="${SIZE}" height="${SIZE_H}" fill="#050505" opacity="0.62"/>
  <rect x="0" y="0" width="${SIZE}" height="${SIZE_H}" fill="url(#pxVeil)"/>
  <rect x="0" y="0" width="${SIZE}" height="${SIZE_H}" fill="url(#pxLeft)"/>`;
}

// ── PREMIUM ───────────────────────────────────────────────────────────────
// Oglašavački oglas, namjerno DRUGAČIJI od ostalih 60 objava.
//
// Zašto izgleda drugačije (namjerno, ne slučajno):
//   • Vlastiti ram: dvostruki okvir (debeo zeleni + tanak unutrašnji) — ostale objave
//     imaju samo traku gore.
//   • Vlastita hijerarhija: kicker → OGROMAN naslov → lead → traka brojki → uslovi.
//     Ostale objave nikad ne kombiniraju brojke I uslove na istoj slici.
//   • Nutarnja kartica sa zelenom akcent-trakom — "certifikat" osjećaj.
//   • Ključni podaci (0 KM, 5 dana, 150 KM) su UVIJEK vidljivi — to je ono što
//     kupac mora zapamtiti ako vidi samo jednu sliku u feedu.
//
// Sve vrijednosti u `terms`/`stats` dolaze iz podataka objave, ne iz ove funkcije.
function premiumLayout(c: Colors, p: PostSlide): string {
  // ── PREMIUM OGLAS — plaćena reklama ───────────────────────────────────
  //
  // Pravilo: gledalac scrolla brzo. Ima ~2 sekunde. Zato svaki element mora
  // nešto PRODATI, ne samo opisati:
  //   1. naslov  → obećanje s rokom ("gotovo za 5 dana") + rizik nula
  //   2. usluge  → sve što nudimo, u jednom redu, sa velikim ikonama
  //   3. dokazi  → konkretni brojevi (cijena, revizije, vlasništvo koda)
  //   4. CTA     → šta sad, jednom riječju
  //
  // Namjerno BEZ trake brojki i bez grida — te dvije stvari su se prije
  // takmičile s naslovom i oglas se čitao kao tabela, a ne kao ponuda.

  const M_L = 68;
  const left = M_L;
  const right = SIZE - M_L;
  const wCol = right - left;

  const features = (p.features ?? []).slice(0, 5);
  const terms = (p.terms ?? []).slice(0, 3);

  let svg = "";

  // 0) LOGOTIP gore lijevo — reklama se odmah predstavlja.
  svg += brandMark(left, M_L - 12, c.ink, c.accent).svg;

  let y = M_L + 92;

  // VISAK PROSTORA: u 3:4 formatu ispod sadrzaja ostane ~290px. Da oglas ne
  // stoji zbijen gore, visak se dijeli na razmake izmedju sekcija (G).
  // U 1:1 formatu G je 0 — tamo mjesta nema i sve mora biti kompaktno.
  const G = Math.max(0, Math.min(150, (SIZE_H - 1160) * 0.38));

  // 1) Bez linije pod logom — ispod logotipa ne stoji nista.
  // Kicker se preskace namjerno: svaki dodatni red tu trosi prostor koji naslovu
  // treba, a nijedna varijanta nije dodala vrijednost (ili je ponavljala lead
  // ili je bila statistika koja ne prodaje).
  void p.kicker;

  // 2) NASLOV — najveći element. Veličina se traži, ne pogađa: ide od 84px
  // naniže dok CIJELI naslov ne stane u 3 reda (bez tihe odsječe riječi).
  const title = p.title ?? "";
  const TITLE_INDENT = 7 + 26; // akcenat-linija + razmak (vidi nize)
  const wTitle = wCol - TITLE_INDENT;
  // Zadnja rečenica naslova ide u akcent-boji. Da bi to izgledalo namjerno,
  // zadnji red mora POCETI tom rečenicom — inace se "Bez" odvoji u prethodni
  // red i oboji samo "predujma.", sto djeluje slucajno.
  const accentPhrase = "Bez plaćanja unaprijed.";
  const titleParts = title.split(accentPhrase);
  const hasAccent = titleParts.length === 2;

  let ts = 88;
  let tl: string[];
  let headBody = "";
  let accLines: string[] = [];
  const build = (size: number) => {
    if (!hasAccent) return { all: wrap(title, size, wTitle, 3), head: "", acc: [] as string[] };
    headBody = titleParts[0].trim();
    // Tijelo se lomi po RECENICAMA ("Vaš biznis online." / "Za 5 dana."), ne po
    // sirini znakova — inace "dana." ostane samo u redu i izgleda neuredno.
    const head = headBody
      .split(/(?<=\.)\s+/)
      .flatMap((sent) => wrap(sent, size, wTitle, 2));
    accLines = wrap(accentPhrase, size, wTitle, 1);
    return { all: [...head, ...accLines], head: head.join(" "), acc: accLines };
  };
  let built = build(ts);
  tl = built.all;
  const fitsAll = (ls: string[]) => ls.join(" ") === title.split(/\s+/).filter(Boolean).join(" ");
  while (ts > 48 && (!fitsAll(tl) || tl.length > 3 || tl.length * ts * 1.04 > 292)) {
    ts -= 3;
    built = build(ts);
    tl = built.all;
  }
  const tlh = ts * 1.04;

  // VERTIKALNA AKCENAT-LINIJA uz naslov. Daje "urednicki" izgled (kao kod
  // Awwwards/Stripe reklama): oko dobija sidro, a naslov vizualno odvoji od
  // ostatka. Linija je visoka kao blok naslova, tanka, u akcentnoj boji.
  const titleBlockH = (tl.length - 1) * tlh + ts * 0.8;
  const barX = left;
  const barY = y + 6;
  const barW = 7;
  const barH2 = titleBlockH + 10;
  svg += `<rect x="${barX}" y="${barY}" width="${barW}" height="${barH2}" rx="${barW / 2}"
    fill="${c.accent}"/>`;

  const textX = left + barW + 26; // naslov uvucen od linije
  const accFrom = hasAccent ? tl.length - built.acc.length : tl.length;
  tl.forEach((l, i) => {
    // Cijeli akcent-red ("Bez predujma.") je u teal boji, ne samo jedna rijec.
    const inAccent = i >= accFrom;
    svg += `<text x="${textX}" y="${y + ts * 0.8 + i * tlh}" font-family="${FONT}" font-size="${ts}"
      font-weight="900" letter-spacing="${(-ts * 0.03).toFixed(1)}"
      fill="${inAccent && tl.length > 1 ? c.accent : c.ink}">${esc(l)}</text>`;
  });
  y += (tl.length - 1) * tlh + ts * 0.8;

  // 3) LEAD — jedna rečenica koja objasnjava MEHANIZAM ponude.
  if (p.lead) {
    y += 50 + G * 0.30;
    const LEAD_FS = 29;
    const LEAD_LH = 40;
    const ll = wrap(p.lead, LEAD_FS, wCol - TITLE_INDENT, 2);
    ll.forEach((l: string, i: number) => {
      svg += `<text x="${left + TITLE_INDENT}" y="${y + i * LEAD_LH}" font-family="${FONT}" font-size="${LEAD_FS}"
        font-weight="600" fill="${c.soft}">${esc(l)}</text>`;
    });
    y += (ll.length - 1) * LEAD_LH + LEAD_FS * 0.5;
  }

  // 4) USLUGE — JEDAN red. Ikona je sada 40px (bila 28), bez okvira oko ikone:
  // na tamnoj fotografiji ikona sama nosi težinu, okvir je samo šum.
  if (features.length) {
    y += 56 + G * 0.45;
    const n = features.length;
    const gap = 12;
    const chipW = (wCol - gap * (n - 1)) / n;
    // Ikona mora DOMINIRATI chipom, ne sjediti u njemu. Prije je bila 64px u
    // 158px visokoj kartici (41%) pa je djelovala kao detalj. Sada je ~72%
    // visine kartice — chip CITAJU ikonom, a label je samo potvrda.
    const IC = 98;
    const chipH = Math.round(IC * 1.44) + 34;

    features.forEach((f, i) => {
      const cx = left + i * (chipW + gap);
      svg += `<rect x="${cx}" y="${y}" width="${chipW}" height="${chipH}" rx="20"
        fill="#ffffff" opacity="0.075"/>`;
      svg += `<rect x="${cx}" y="${y}" width="${chipW}" height="${chipH}" rx="20"
        fill="none" stroke="${c.accent}" stroke-opacity="0.22" stroke-width="1.5"/>`;
      // Ikona centrirana horizontalno, label ide pri dnu — bez okvira oko ikone,
      // jer je sada dovoljno velika da nosi sebe.
      // Ikona gore, label odmah pod njom. Razmak se racuna iz stvarne visine
      // ikone (IC*1.6 je path box), da ne ostane prazan pojas u sredini kartice.
      // VAZNO: pxIcon crta path u `IC*1.6` boxu, ali stvarna visina crteza je
      // ~IC*1.25 (path ne popunjava cijeli box). Zato se vertikalno centrira po
      // stvarnoj visini crteza, a label dobija fiksni razmak ispod njega —
      // prije se ikona spustala na label i preklapala ga.
      // pxIcon sada skalira path na TACNO `IC` piksela (prije se nije skalirao
      // — to je bio razlog sto su ikone izgledale sitno). Zato se raspored
      // racuna iz stvarnih piksela, bez "magic" faktora.
      const gapIL = 16;
      const lab = f.label;
      let lfs = 22;
      while (lfs > 13 && lab.length * lfs * 0.55 > chipW - 8) lfs -= 1;
      const blockH = IC + gapIL + lfs;
      const top = y + (chipH - blockH) / 2;
      svg += pxIcon(f.icon, cx + chipW / 2 - IC / 2, top, c.accent, IC);
      svg += `<text x="${cx + chipW / 2}" y="${top + IC + gapIL + lfs * 0.82}"
        text-anchor="middle" font-family="${FONT}" font-size="${lfs}" font-weight="800"
        fill="${c.ink}">${esc(lab)}</text>`;
    });
    y += chipH;
  }

  // 5) DOKAZI — kvačica + konkretna tvrdnja. Ovo je dio koji ubjeđuje:
  // apstraktne tvrdnje ("kvalitet") ne prodaju, brojevi prodaju.
  if (terms.length) {
    y += 50 + G * 0.55;
    terms.forEach((t, i) => {
      const ry = y + i * (42 + G * 0.14);
      svg += pxIcon("check", left - 2, ry - 26, c.accent, 27);
      svg += `<text x="${left + 42}" y="${ry}" font-family="${FONT}" font-size="27"
        font-weight="700" fill="${c.ink}">${esc(t)}</text>`;
    });
    y += (terms.length - 1) * (42 + G * 0.14);
  }

  // 6) DVA DUGMETA U REDU — primarno (akcija) + sekundarno (domena).
  //
  // CTA zauzima ~62% sirine i puni je teal. Desno od njega stoji domena kao
  // "outline" dugme — ista forma, ali providna, pa hijerarhija ostaje jasna:
  // prvo klikni, a adresa je tu ako zelis da ukucas.
  //
  // NIKAD preko sadrzaja: donja granica je `y + 46`, gornja `SIZE_H - ...`.
  const btnH = 84;
  const BTN_GAP = 16;
  const reserveBottom = 92; // luft do ivice kadra

  const ctaLabel = (p.cta ?? "Pišite nam u DM").toUpperCase();
  const siteLabel = (p.site ?? "devlab.cc.cd");
  // Oba dugmeta iste sirine — simetricno, bez "glavno/sporedno" po sirini.
  // Hierarhija se drzi BOJOM (puni teal vs outline), ne velicinom.
  const halfW = Math.floor((wCol - BTN_GAP) / 2);
  const ctaW = halfW;
  const siteW = halfW;

  const btnNear = y + 46;
  const btnBottom = SIZE_H - reserveBottom - btnH;
  const btnY = Math.max(btnNear, btnBottom);

  // Primarno dugme — puni teal, najjaci kontrast na slici.
  // OSTRI UGLOVI (rx=0): cijeli sajt koristi `rounded-none` na dugmadima
  // (vidi App.tsx), pa bi pilula u oglasu izgledala iz drugog brenda.
  svg += `<rect x="${left}" y="${btnY}" width="${ctaW}" height="${btnH}"
    fill="${c.accent}"/>`;
  let cfs = 26;
  // Koeficijent 0.655 je IZMJEREN na bold 900 (0.58 je podcjenjivao sirinu
  // pa je tekst izlazio 460px u 464px dugmetu — pritisnut do ivice).
  while (cfs > 13 && ctaLabel.length * cfs * 0.655 > ctaW - 52) cfs -= 1;
  svg += `<text x="${left + ctaW / 2}" y="${btnY + btnH / 2 + 10}" text-anchor="middle"
    font-family="${FONT}" font-size="${cfs}" font-weight="900" letter-spacing="0.8"
    fill="${c.accentInk}">${esc(ctaLabel)}</text>`;

  // Sekundarno dugme — outline, domena. Nema tacke/tačkica: samo ime sajta.
  const sx = left + ctaW + BTN_GAP;
  svg += `<rect x="${sx}" y="${btnY}" width="${siteW}" height="${btnH}"
    fill="none" stroke="${c.accent}" stroke-opacity="0.55" stroke-width="2.5"/>`;

  // KURSOR (strelica) IZA domene — signal "ovo se klika".
  // Oblik je standardna pokazivacka strelica (kao OS kursor), ne ruka.
  // BIJELI fill + accent stroke: na teal pozadini dugmeta bijelo je jedino
  // sto se jasno odvaja (teal na tealu se stapa).
  // Putanja zauzima ~15x20 od 0..24 boxa, pa je stvarna visina ~0.83*CUR.
  // CUR=34 daje kursor ~28px visok — jasno vidljiv pored teksta od 25px.
  const CUR = 24;
  const curGap = 10;
  // Stvarne dimenzije nacrtane putanje unutar 0..24 boxa (15.2 x 18).
  // Koriste se za centriranje grupe — CUR box je veci od same strelice.
  const CUR_W = (CUR * 15.2) / 24;
  const CUR_H = (CUR * 18) / 24;
  // Isti font kao lijevo dugme — dva dugmeta iste sirine moraju imati i istu
  // tipografsku tezinu, inace djeluju kao da nisu iz istog sistema.
  let sfs = cfs;
  while (sfs > 13 && (siteLabel.length * sfs * 0.62 + CUR_W + curGap) > siteW - 34) sfs -= 1;
  const inner = siteLabel.length * sfs * 0.62 + CUR_W + curGap;
  const startX = sx + (siteW - inner) / 2;
  const midY = btnY + btnH / 2;
  svg += `<text x="${startX}" y="${midY + 8}" text-anchor="start"
    font-family="${FONT}" font-size="${sfs}" font-weight="800" letter-spacing="0.2"
    fill="${c.accent}">${esc(siteLabel)}</text>`;
  // Strelica u 0..24 koordinatama; stroke u jedinicama lokalnog sistema pa je
  // debljina konstantna bez obzira na `scale`.
  const curX = startX + siteLabel.length * sfs * 0.62 + curGap;
  svg += `<g transform="translate(${curX.toFixed(1)},${(midY - CUR_H / 2 + 1).toFixed(1)}) scale(${(CUR / 24).toFixed(4)})">
    <path d="M3.6 1.6 L3.6 19.6 L8.7 14.8 L11.7 21.8 L15.2 20.3 L12.2 13.4 L18.8 13 Z"
      fill="${c.ink}" stroke="${c.ink}" stroke-width="1.1" stroke-linejoin="round"/>
  </g>`;

  return svg;
}


// ── BOGATI SLOJ ───────────────────────────────────────────────────────────
// Zajednicki "rep" za SVE nepremium objave: ikone, dokazi, dva dugmeta.
//
// Zasto: premium oglas (px01) ima gustinu i ikone, a ostalih 40 objava je bilo
// "jedna recenica + praznina" — citale su se kao najava, ne kao reklama.
// Ovaj sloj im daje istu vizuelnu klasu, ali BEZ diranja njihove price:
// naslov i fotografija ostaju kakvi jesu, samo se doda ono sto prodaje.
//
// Raspored (odozdo prema gore):
//   [ CTA dugme ][ domena ]        <- uvijek, fiksno uz dno
//   dokaz dokaz dokaz              <- kratke, konkretne tvrdnje
//   [ikona][ikona][ikona][ikona]   <- velike ikone s labelom
//
// Vraca { svg, top } — `top` je Y gdje sloj POCINJE, da forma iznad zna
// koliko joj prostora ostaje.
function richLayer(
  c: Colors,
  p: PostSlide,
  opts: { bottom: number; width: number; left: number },
): { svg: string; top: number } {
  const feats = (p.features ?? []).slice(0, 4);
  const terms = (p.terms ?? []).slice(0, 3);
  const hasCta = !!p.cta;
  const variant = p.rich ?? "chips";
  if (!feats.length && !terms.length && !hasCta) return { svg: "", top: opts.bottom };

  const bottom = opts.bottom;
  const width = opts.width;
  const left = opts.left;
  const btnH = variant === "band" ? 66 : 74;
  const BTN_GAP = 14;
  const reserve = 52;

  let svg = "";
  let y = bottom;

  // 1) DUGMAD — uvijek najnize.
  if (hasCta) {
    const btnY = y - reserve - btnH;
    const halfW = Math.floor((width - BTN_GAP) / 2);
    const ctaLabel = (p.cta ?? "").toUpperCase();
    const siteLabel = p.site ?? "devlab.cc.cd";

    svg += `<rect x="${left}" y="${btnY}" width="${halfW}" height="${btnH}" fill="${c.accent}"/>`;
    let cfs = 24;
    while (cfs > 12 && ctaLabel.length * cfs * 0.655 > halfW - 34) cfs -= 1;
    svg += `<text x="${left + halfW / 2}" y="${btnY + btnH / 2 + 9}" text-anchor="middle"
      font-family="${FONT}" font-size="${cfs}" font-weight="900" letter-spacing="0.4"
      fill="${c.accentInk}">${esc(ctaLabel)}</text>`;

    const sx = left + halfW + BTN_GAP;
    svg += `<rect x="${sx}" y="${btnY}" width="${halfW}" height="${btnH}" fill="none"
      stroke="${c.accent}" stroke-opacity="0.5" stroke-width="2.5"/>`;

    const CUR = 20;
    const curGap = 9;
    const CUR_W = (CUR * 15.2) / 24;
    const CUR_H = (CUR * 18) / 24;
    let sfs = cfs;
    while (sfs > 12 && (siteLabel.length * sfs * 0.62 + CUR_W + curGap) > halfW - 30) sfs -= 1;
    const inner = siteLabel.length * sfs * 0.62 + CUR_W + curGap;
    const startX = sx + (halfW - inner) / 2;
    const midY = btnY + btnH / 2;
    svg += `<text x="${startX}" y="${midY + 7}" text-anchor="start" font-family="${FONT}"
      font-size="${sfs}" font-weight="800" fill="${c.accent}">${esc(siteLabel)}</text>`;
    const curX = startX + siteLabel.length * sfs * 0.62 + curGap;
    svg += `<g transform="translate(${curX.toFixed(1)},${(midY - CUR_H / 2 + 1).toFixed(1)}) scale(${(CUR / 24).toFixed(4)})">
      <path d="M3.6 1.6 L3.6 19.6 L8.7 14.8 L11.7 21.8 L15.2 20.3 L12.2 13.4 L18.8 13 Z"
        fill="${c.ink}" stroke="${c.ink}" stroke-width="1.1" stroke-linejoin="round"/></g>`;
    y = btnY - 26;
  }

  // 2) DOKAZI
  if (terms.length) {
    const tfs = 24;
    const th = 40;
    y -= terms.length * th;
    terms.forEach((t, i) => {
      const ry = y + i * th + tfs * 0.8;
      svg += pxIcon("check", left - 1, ry - tfs * 0.85, c.accent, 24);
      svg += `<text x="${left + 36}" y="${ry}" font-family="${FONT}" font-size="${tfs}"
        font-weight="700" fill="${c.ink}">${esc(t)}</text>`;
    });
    y -= 28;
  }

  // 3) IKONE — 7 varijanti rasporeda da svaki post ne izgleda isto.
  if (feats.length) {
    const n = feats.length;

    // ── chips: kartice kao premium (podrazumijevano) ──
    if (variant === "chips") {
      const gap = 10;
      const chipW = (width - gap * (n - 1)) / n;
      const IC = Math.min(72, chipW * 0.56);
      const chipH = IC + 46;
      y -= chipH;
      feats.forEach((f, i) => {
        const cx = left + i * (chipW + gap);
        let lfs = 19;
        while (lfs > 11 && f.label.length * lfs * 0.55 > chipW - 6) lfs -= 1;
        svg += `<rect x="${cx}" y="${y}" width="${chipW}" height="${chipH}" fill="${c.card}"
          stroke="${c.line}" stroke-width="1.5"/>`;
        svg += pxIcon(f.icon, cx + chipW / 2 - IC / 2, y + 14, c.accent, IC);
        svg += `<text x="${cx + chipW / 2}" y="${y + 14 + IC + 24}" text-anchor="middle"
          font-family="${FONT}" font-size="${lfs}" font-weight="800" fill="${c.ink}">${esc(f.label)}</text>`;
      });
      y -= 24;
    }

    // ── inline: bez kartica, ikona + label u jednom redu, linija iznad ──
    else if (variant === "inline") {
      const IC = 40;
      const rowH = 64;
      y -= 36 + n * rowH;
      svg += `<rect x="${left}" y="${y}" width="${width}" height="3" fill="${c.line}"/>`;
      y += 30;
      feats.forEach((f, i) => {
        const ry = y + i * rowH;
        svg += pxIcon(f.icon, left + 2, ry + IC * 0.12, c.accent, IC);
        svg += `<text x="${left + IC + 24}" y="${ry + IC * 0.72}" font-family="${FONT}"
          font-size="26" font-weight="800" fill="${c.ink}">${esc(f.label)}</text>`;
        svg += `<text x="${width - 2}" y="${ry + IC * 0.72}" text-anchor="end" font-family="${FONT}"
          font-size="22" font-weight="700" fill="${c.soft}">✓</text>`;
      });
      y -= 18;
    }

    // ── duo: 2x2 velike ikone, bez kartica, sa labelom desno ──
    else if (variant === "duo") {
      const gap = 18;
      const colW = (width - gap) / 2;
      const IC = 56;
      const rowH = 84;
      const rows = Math.ceil(n / 2);
      y -= rows * rowH + 16;
      feats.forEach((f, i) => {
        const cx = left + (i % 2) * (colW + gap);
        const cy = y + Math.floor(i / 2) * rowH;
        svg += pxIcon(f.icon, cx, cy, c.accent, IC);
        svg += `<text x="${cx + IC + 12}" y="${cy + IC / 2 + 8}" font-family="${FONT}"
          font-size="24" font-weight="800" fill="${c.ink}">${esc(f.label)}</text>`;
      });
      y -= 10;
    }

    // ── list: ikona + tekst u vertikalnoj listi (interaktivno) ──
    else if (variant === "list") {
      const IC = 34;
      const rowH = 58;
      y -= 20 + n * rowH;
      feats.forEach((f, i) => {
        const ry = y + i * rowH + 16;
        svg += `<circle cx="${left + IC / 2}" cy="${ry + IC / 2}" r="${IC / 2 + 4}" fill="${c.accent}" opacity="0.12"/>`;
        svg += pxIcon(f.icon, left, ry, c.accent, IC);
        svg += `<text x="${left + IC + 22}" y="${ry + IC * 0.74}" font-family="${FONT}"
          font-size="25" font-weight="800" fill="${c.ink}">${esc(f.label)}</text>`;
      });
      y -= 14;
    }

    // ── bigtwo: dvije ogromne ikone sa kratkim redom ──
    else if (variant === "bigtwo") {
      const gap = 40;
      const colW = (width - gap) / 2;
      const IC = 120;
      const rowH = IC + 54;
      const rows = Math.ceil(n / 2);
      y -= rows * rowH + 24;
      feats.forEach((f, i) => {
        const cx = left + (i % 2) * (colW + gap);
        const cy = y + Math.floor(i / 2) * rowH;
        svg += pxIcon(f.icon, cx + colW / 2 - IC / 2, cy, c.accent, IC);
        svg += `<text x="${cx + colW / 2}" y="${cy + IC + 34}" text-anchor="middle"
          font-family="${FONT}" font-size="22" font-weight="800" fill="${c.ink}">${esc(f.label)}</text>`;
      });
      y -= 20;
    }

    // ── band: ikone u punoj traci accent boje ──
    else if (variant === "band") {
      const h = 120;
      y -= h;
      svg += `<rect x="${left - 20}" y="${y}" width="${width + 40}" height="${h}" fill="${c.accent}"/>`;
      const gap = 6;
      const chipW = (width - gap * (n - 1)) / n;
      const IC = 50;
      feats.forEach((f, i) => {
        const cx = left + i * (chipW + gap);
        svg += pxIcon(f.icon, cx + chipW / 2 - IC / 2, y + 16, c.accentInk, IC);
        svg += `<text x="${cx + chipW / 2}" y="${y + 16 + IC + 20}" text-anchor="middle"
          font-family="${FONT}" font-size="18" font-weight="900" fill="${c.accentInk}">${esc(f.label)}</text>`;
      });
      y -= 8;
    }
  }

  return { svg, top: y };
}

// ── Pozicioniranje ────────────────────────────────────────────────────────
const PLACE: Record<PostLayout, (c: Colors, p: PostSlide, total: number) => string> = {
  // PREMIUM — nema header/footer iz `header()`; vlastiti ram i vlastita hijerarhija.
  premium: (c, p) => premiumLayout(c, p),
  center: (c, p, total) => {
    // Bogati rep ide do dna kadra (nema fotke koja ga blokira).
    return buildRich(c, p, { left: M, width: W, top: CONTENT_TOP(), bottom: CONTENT_BOTTOM() }, total);
  },

  split: (c, p, total) => {
    return `<rect x="${M - 40}" y="${CONTENT_TOP()}" width="8" height="${CONTENT_H()}" fill="${c.accent}"/>` +
      buildRich(c, p, { left: M, width: W, top: CONTENT_TOP(), bottom: CONTENT_BOTTOM() }, total);
  },

  band: (c, p, total) => {
    // Traka je vizuelni ram; rep ide PREKO nje (unutar iste sirine).
    const bh = CONTENT_H();
    const by = CONTENT_TOP();
    return `<rect x="${M - 44}" y="${by}" width="${W + 88}" height="${bh}" fill="${c.card}"
      stroke="${c.line}" stroke-width="1.5"/>
      <rect x="${M - 44}" y="${by}" width="${W + 88}" height="8" fill="${c.accent}"/>` +
      buildRich(c, p, { left: M, width: W, top: CONTENT_TOP() + 34, bottom: CONTENT_BOTTOM() - 20 }, total);
  },

  offset: (c, p, total) => {
    const b = build(c, p, total);
    const y = CONTENT_TOP() + 10;
    return `<g transform="translate(${M}, ${y})">${b.svg}</g>
      <rect x="${SIZE - M - 120}" y="${CONTENT_BOTTOM() - 120}" width="120" height="120" fill="${c.accent}"/>`;
  },

  photoBg: (c, p, total) => {
    const ph = p.photo ?? "hero";
    // Rep (ikone+dokazi+dugmad) zauzima dno — forma se skalira na prostor iznad.
    const layer = richLayer(c, p, { bottom: CONTENT_BOTTOM(), width: W, left: M });
    const rawB = build(c, p, total);
    const availH = layer.top - CONTENT_TOP() - 30;
    const b = rawB.h > availH && availH > 0
      ? { svg: '<g transform="scale(1, ' + (availH / rawB.h).toFixed(4) + ')">' + rawB.svg + '</g>', h: availH }
      : rawB;
    void total;
    const y = CONTENT_TOP() + Math.max(0, (layer.top - CONTENT_TOP() - b.h) / 2);
    return `<image href="${PHOTOS[ph]}" x="0" y="0" width="${SIZE}" height="${SIZE_H}"
        preserveAspectRatio="xMidYMid slice" aria-label="${esc(PHOTO_ALT[ph])}"/>
      <rect x="0" y="0" width="${SIZE}" height="${SIZE_H}" fill="url(#fadeLeft)"/>
      <rect x="0" y="0" width="${SIZE}" height="${SIZE_H}" fill="#000000" opacity="0.18"/>
      <rect x="0" y="0" width="${SIZE}" height="200" fill="url(#fadeTop)"/>
      <rect x="0" y="0" width="${SIZE}" height="34" fill="${c.bg}" opacity="0.92"/>
      <rect x="0" y="${SIZE_H - 320}" width="${SIZE}" height="320" fill="url(#fadeBot)"/>
      <g transform="translate(${M}, ${y})">${b.svg}</g>` +
      layer.svg;
  },

  // Zrcalo `photoTop`: fotografija je DOLJE, tekst u gornjoj zoni.
  // Koristi se kad broj/cifra treba da dominira gore, a slika da zatvori sliku dolje.
  photoBot: (c, p, total) => {
    const ph = p.photo ?? "hero";
    const imgH = Math.round(SIZE_H * 0.38);
    const zoneTop = CONTENT_TOP();
    const zoneBot = SIZE_H - imgH;
    const b = buildFitting(c, p, zoneBot - 16, total);
    // Tekst CENTRIRAN u gornjoj zoni — ne lijepi se za sliku.
    const y = zoneTop + Math.max(0, (zoneBot - zoneTop - b.h) / 2);
    // Fotografija se stapa sa zelenom: gore se rastvara u boju podloge
    // (bez tvrde ivice), a preko nje ide blagi zeleni ton + zatamnjenje.
    return `<image href="${PHOTOS[ph]}" x="0" y="${SIZE_H - imgH}" width="${SIZE}" height="${imgH}"
        preserveAspectRatio="xMidYMid slice" aria-label="${esc(PHOTO_ALT[ph])}"/>
      <rect x="0" y="${SIZE_H - imgH}" width="${SIZE}" height="${imgH}" fill="${c.bg}" opacity="0.28"/>
      <rect x="0" y="${SIZE_H - imgH}" width="${SIZE}" height="${imgH}" fill="url(#blendBot)"/>
      <rect x="0" y="${SIZE_H - imgH}" width="${SIZE}" height="180" fill="url(#blendUp)"/>
      <g transform="translate(${M}, ${y})">${b.svg}</g>` +
      richLayer(c, p, { bottom: zoneBot - 28, width: W, left: M }).svg;
  },

  photoTop: (c, p, total) => {
    const ph = p.photo ?? "hero";
    // Visina slike raste s formatom: u 3:4 proporcionalno vise, ali ne
    // toliko da pojede tekst. 370 je u 1:1 (34% povrsine), u 3:4 ~493 (34%).
    const imgH = Math.round(SIZE_H * 0.343);
    const zoneTop = imgH;
    const zoneBot = CONTENT_BOTTOM();
    // BUG (prije): cap je bio `zoneBot - 40` (apsolutna koordinata), pa blok od
    // 552px u zoni od samo 530px NIJE bio skaliran i tekst je izlazio ispod zone.
    // Sada se blok skalira na STVARNU visinu zone: `zoneBot - zoneTop - rezerva`.
    // Rep zauzima dno — forma se skalira na prostor IZNAD repa.
    const layer = richLayer(c, p, { bottom: CONTENT_BOTTOM(), width: W, left: M });
    const zoneRealBot = Math.min(zoneBot, layer.top - 20);
    const b = buildFitting(c, p, zoneRealBot - zoneTop - 40, total);
    const realH = b.h + 20;
    const centered = zoneTop + Math.max(0, (zoneRealBot - zoneTop - realH) / 2 - 8);
    const maxY = Math.max(zoneTop + 8, zoneBot - realH - 4);
    const y = Math.max(zoneTop + 8, Math.min(centered, maxY));
    return `<image href="${PHOTOS[ph]}" x="0" y="0" width="${SIZE}" height="${imgH}"
        preserveAspectRatio="xMidYMid slice" aria-label="${esc(PHOTO_ALT[ph])}"/>
      <rect x="0" y="${imgH - 80}" width="${SIZE}" height="80" fill="url(#fadeBot)"/>
      <g transform="translate(${M}, ${y})">${b.svg}</g>` +
      layer.svg;
  },

  photo: (c, p, total) => {
    const ph = p.photo ?? "hero";
    const imgW = 330;
    // Rep (ikone+dokazi+dugmad) zauzima dno — forma se skalira na prostor iznad.
    const layer = richLayer(c, p, { bottom: CONTENT_BOTTOM(), width: SIZE - imgW - 110 - M, left: M });
    const rawB = build(c, p, total);
    const availH = layer.top - CONTENT_TOP() - 30;
    const b = rawB.h > availH && availH > 0
      ? { svg: '<g transform="scale(1, ' + (availH / rawB.h).toFixed(4) + ')">' + rawB.svg + '</g>', h: availH }
      : rawB;
    const y = CONTENT_TOP() + Math.max(0, (layer.top - CONTENT_TOP() - b.h) / 2);
    return `<image href="${PHOTOS[ph]}" x="${SIZE - imgW}" y="0" width="${imgW}" height="${SIZE_H}"
        preserveAspectRatio="xMidYMid slice" aria-label="${esc(PHOTO_ALT[ph])}"/>
      <rect x="${SIZE - imgW - 80}" y="0" width="80" height="${SIZE_H}" fill="url(#fadeRight)"/>
      <g transform="translate(${M}, ${y})">${b.svg}</g>` +
      layer.svg;
  },

  stamp: (c, p, total) => {
    // Rep (ikone+dokazi+dugmad) zauzima dno — forma se skalira na prostor iznad.
    const layer = richLayer(c, p, { bottom: CONTENT_BOTTOM(), width: W, left: M });
    const rawB = build(c, p, total);
    const availH = layer.top - CONTENT_TOP() - 30;
    const b = rawB.h > availH && availH > 0
      ? { svg: '<g transform="scale(1, ' + (availH / rawB.h).toFixed(4) + ')">' + rawB.svg + '</g>', h: availH }
      : rawB;
    const y = CONTENT_TOP() + Math.max(0, (layer.top - CONTENT_TOP() - b.h) / 2);
    const sh = 360;
    const sw = sh * DF_LOGO_RATIO;
    return `<g opacity="0.055"><image href="${DF_LOGO_DATA_URI}" x="${SIZE / 2 - sw / 2}"
        y="${CONTENT_TOP() + (CONTENT_H() - sh) / 2}" width="${sw}" height="${sh}"/></g>
      <g transform="translate(${M}, ${y})">${b.svg}</g>` +
      layer.svg;
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
  // Bogati sloj (ikone/dokazi/dugmad) zivi na POSTU, a PLACE dobija SLIDE.
  // Bez ovog spajanja svaki slajd bi izgubio features/terms/cta/rich.
  const richSlide: PostSlide = {
    ...slide,
    features: slide.features ?? post.features,
    terms: slide.terms ?? post.terms,
    cta: slide.cta ?? post.cta,
    site: slide.site ?? post.site,
    rich: slide.rich ?? post.rich,
  };
  let content = (PLACE[layout] ?? PLACE.center)(c, richSlide, slideTotal);

  // PREMIUM ima vlastiti ram i vlastito zaglavlje (logo je dio `premiumLayout`),
  // pa se opći `header()` preskače — inače bi se logo i eyebrow crtali dvaput.
  const isPremium = layout === "premium";

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
    <linearGradient id="blendUp" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c.bg}" stop-opacity="1"/>
      <stop offset="55%" stop-color="${c.bg}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${c.bg}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="blendBot" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.10"/>
      <stop offset="60%" stop-color="#000000" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.66"/>
    </linearGradient>
    <linearGradient id="topEdge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c.ink === "#0A0A0A" ? "#0A0A0A" : BRAND}" stop-opacity="1"/>
      <stop offset="45%" stop-color="${c.ink === "#0A0A0A" ? "#0A0A0A" : BRAND}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${c.ink === "#0A0A0A" ? "#0A0A0A" : BRAND}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="fadeLeft" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.94"/>
      <stop offset="45%" stop-color="#000000" stop-opacity="0.72"/>
      <stop offset="75%" stop-color="#000000" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.10"/>
    </linearGradient>
    <!-- PREMIUM: vertikalni veo — gore blago, dolje skoro crno (brojke se čitaju) -->
    <linearGradient id="pxVeil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.34"/>
      <stop offset="45%" stop-color="#000000" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.82"/>
    </linearGradient>
    <!-- PREMIUM: lijevi veo — tekst je lijevo, pa je lijevo najtamnije -->
    <linearGradient id="pxLeft" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.80"/>
      <stop offset="58%" stop-color="#000000" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.06"/>
    </linearGradient>
  </defs>
  ${isCover ? coverChrome(c) : `<rect width="${SIZE}" height="${SIZE_H}" fill="${c.bg}"/>`}
  ${isPremium ? premiumBackdrop(slide.photo ?? "ai") : ""}
  ${isCover || isPremium ? "" : decor(c, slideIndex + post.id.length)}
  ${content}
  <!-- Zaglavlje se crta POSLIJE sadržaja: foto-pozadine inače prekriju logo. -->
  ${isPremium ? "" : header(c, slide.eyebrow ?? post.eyebrow, post.category, slideIndex, slideTotal)}
  ${isCover ? coverFrame(c) : ""}
  ${isPremium ? "" : ""}
  <!-- Gornja traka: umjesto tvrde linije, kratki gradijent koji se stopi u pozadinu
       (na zelenim paletama crna traka je izgledala kao strana linija).
       PREMIUM je nema — oglas ima vlastiti ram/pozadinu i traka mu smeta. -->
  ${isPremium ? "" : `<rect x="0" y="0" width="${SIZE}" height="28" fill="url(#topEdge)"/>`}
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
      kicker: post.kicker,
      lead: post.lead,
      terms: post.terms,
      stats: post.stats,
      features: post.features,
      cta: post.cta,
      site: post.site,
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
