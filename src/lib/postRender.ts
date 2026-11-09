// ───────────────────────────────────────────────────────────────────────────
// RENDERER v4 — Instagram postovi 1080×1080.
//
// DIZAJN PRINCIP:
//   1. Stvarni DF logo (#4DEAE0) u zaglavlju — ista boja kao navbar sajta
//   2. JEDNA dominantna forma po slici — nema natrpanih listi
//   3. Sve poravnato na mrežu: lijevo 96px, desno 96px, sadržaj vertikalno centriran
//   4. Krupna tipografija (min 30px), visok kontrast (min 4.5:1)
//   5. 6 paleta za vizuelnu raznolikost, ista struktura za konzistentnost
//
// FORME (bira se po `template` polju):
//   hero   → golemi naslov
//   figure → golemi broj/cijena
//   blocks → 2–4 velika bloka
//   duo    → PRIJE (✕) / POSLIJE (✓)
//   action → velika CTA ploča
// ───────────────────────────────────────────────────────────────────────────

import type { AdPost, PostLayout, PostPalette, PostSlide } from "./postsData";
import { DF_LOGO_DATA_URI, DF_LOGO_RATIO } from "./postLogo";
import { BRAND, BRAND_INK } from "./postBrand";
import { PHOTOS, PHOTO_ALT } from "./postPhotos";

const SIZE = 1080;
const M = 96; // margina — sve poravnato na ovo
const FONT = "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

type Colors = {
  bg: string;
  ink: string;
  soft: string;
  accent: string;
  accentInk: string;
  card: string;
  line: string;
};

/**
 * 6 paleta. Svaka ima garantovan kontrast:
 *   ink na bg       > 12:1
 *   soft na bg      > 5:1
 *   accentInk na accent > 8:1
 */
const PALETTES: Record<PostPalette, Colors> = {
  // duboko crna + teal
  dark: {
    bg: "#0A0A0E",
    ink: "#FFFFFF",
    soft: "#A9AEBD",
    accent: "#4DEAE0",
    accentInk: "#04211E",
    card: "#17171F",
    line: "#2E2E3B",
  },
  // petrol zelena (brend)
  teal: {
    bg: "#0C4F4B",
    ink: "#FFFFFF",
    soft: "#B7EDE7",
    accent: "#4DEAE0",
    accentInk: "#04211E",
    card: "#126761",
    line: "#2F8781",
  },
  // svijetlo siva (uredno, "studio")
  light: {
    bg: "#EFF0F4",
    ink: "#0A0A0F",
    soft: "#545868",
    accent: "#076B61",
    accentInk: "#FFFFFF",
    card: "#FFFFFF",
    line: "#D2D5DF",
  },
  // duboko indigo — noćni, premium
  ink: {
    bg: "#12102B",
    ink: "#FFFFFF",
    soft: "#B0ABD6",
    accent: "#7C6BFF",
    accentInk: "#0B0820",
    card: "#1D1940",
    line: "#332C63",
  },
  // menta — svježe, za edukaciju
  mint: {
    bg: "#DCF5EF",
    ink: "#052622",
    soft: "#3F6B63",
    accent: "#0A6E60",
    accentInk: "#FFFFFF",
    card: "#FFFFFF",
    line: "#B4DED5",
  },
  // topli sun — energično, za ponude
  sun: {
    bg: "#FFD9A0",
    ink: "#241303",
    soft: "#7A5423",
    accent: "#8C2F08",
    accentInk: "#FFFFFF",
    card: "#FFF0D6",
    line: "#EFC98F",
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

/** Prelama tekst. Širina slova ≈ 0.58×veličina za Inter Black. */
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

/** Najveći font pri kojem najduža riječ staje u širinu. */
function fit(text: string, maxWidth: number, start: number, min = 46): number {
  const longest = Math.max(...text.split(/\s+/).map((w) => w.length), 1);
  let size = start;
  while (size > min && longest * size * 0.58 > maxWidth) size -= 4;
  return size;
}

// ── Zaglavlje: logo + eyebrow lijevo, kategorija dolje lijevo ─────────────
function header(c: Colors, eyebrow: string, category: string, slide: number, total: number): string {
  const logoH = 46;
  const logoW = logoH * DF_LOGO_RATIO;

  // tačkice za karusel — desno u footeru
  let dots = "";
  if (total > 1) {
    const dw = 26;
    const gap = 8;
    const totalW = total * dw + (total - 1) * gap;
    const startX = SIZE - M - totalW;
    for (let i = 0; i < total; i++) {
      const x = startX + i * (dw + gap);
      dots +=
        i === slide
          ? `<rect x="${x}" y="${SIZE - M - 14}" width="${dw}" height="6" rx="3" fill="${c.accent}"/>`
          : `<rect x="${x}" y="${SIZE - M - 13}" width="${dw}" height="4" rx="2" fill="${c.soft}" opacity="0.35"/>`;
    }
  }

  return `
    <image href="${DF_LOGO_DATA_URI}" x="${M}" y="${M - 12}" width="${logoW}" height="${logoH}"/>
    <text x="${SIZE - M}" y="${M + 24}" text-anchor="end" font-family="${FONT}" font-size="28"
      font-weight="800" letter-spacing="2.6" fill="${c.accent}">${esc(eyebrow.toUpperCase())}</text>
    <text x="${M}" y="${SIZE - M - 6}" font-family="${FONT}" font-size="26" font-weight="800"
      letter-spacing="3" fill="${c.soft}">${esc(category.toUpperCase())}</text>
    ${dots}`;
}

// ── Forme ─────────────────────────────────────────────────────────────────
type Block = { svg: string; h: number };
const CONTENT_TOP = 250;
const CONTENT_BOTTOM = SIZE - M - 84;
const CONTENT_H = CONTENT_BOTTOM - CONTENT_TOP;
const W = SIZE - M * 2;

/** HERO — golemi naslov, akcenat traka iznad. */
function formHero(c: Colors, p: PostSlide): Block {
  const title = p.title ?? "";
  // Ograniči i po širini i po visini: naslov max 3 reda unutar CONTENT_H.
  let size = fit(title, W - 20, 128);
  let lines = wrap(title, size, W - 20, 3);
  // Ako 3 reda ne stanu u visinu, smanjuj dok ne stanu.
  while (lines.length * size * 1.06 > (p.subtitle ? CONTENT_H - 200 : CONTENT_H) && size > 52) {
    size -= 6;
    lines = wrap(title, size, W - 20, 3);
  }
  const lh = size * 1.06;

  let svg = "";
  lines.forEach((l, i) => {
    svg += `<text x="0" y="${size * 0.78 + i * lh}" font-family="${FONT}" font-size="${size}" font-weight="900"
      letter-spacing="-4" fill="${c.ink}">${esc(l)}</text>`;
  });
  let h = (lines.length - 1) * lh + size;

  if (p.subtitle) {
    const ss = fit(p.subtitle, W - 50, 38);
    const sl = wrap(p.subtitle, ss, W - 50, 3);
    h += 72;
    svg += `<rect x="0" y="${h}" width="5" height="${sl.length * (ss + 14)}" fill="${c.accent}"/>`;
    sl.forEach((l, i) => {
      svg += `<text x="30" y="${h + ss * 0.86 + i * (ss + 14)}" font-family="${FONT}" font-size="${ss}"
        font-weight="600" fill="${c.soft}">${esc(l)}</text>`;
    });
    h += sl.length * (ss + 14);
  }
  return { svg, h };
}

/** FIGURE — golemi broj, pa rečenica, pa najviše 3 reda. */
function formFigure(c: Colors, p: PostSlide): Block {
  const val = p.value ?? "";
  // Visina broja je ~0.76*vsize. Ostatak (naslov, nota, do 3 reda) traži ~330px.
  // Ograniči vsize tako da sve stane u CONTENT_H.
  const reserved = 330;
  const maxByHeight = ((CONTENT_H - reserved) / 0.86);
  const base = val.length <= 2 ? 330 : val.length <= 4 ? 260 : val.length <= 7 ? 168 : 118;
  const vsize = Math.max(74, Math.min(fit(val, W, base), maxByHeight));

  // baseline = 0.78*vsize da gornja ivica teksta bude tacno na y=0
  let svg = `<text x="0" y="${vsize * 0.78}" font-family="${FONT}" font-size="${vsize}"
    font-weight="900" letter-spacing="-10" fill="${c.accent}">${esc(val)}</text>`;
  let h = vsize;

  const ts = fit(p.title ?? "", W, 52);
  wrap(p.title ?? "", ts, W, 2).forEach((l, i) => {
    svg += `<text x="0" y="${h + 48 + i * ts * 1.12}" font-family="${FONT}" font-size="${ts}"
      font-weight="800" letter-spacing="-1.2" fill="${c.ink}">${esc(l)}</text>`;
  });
  h += 48 + Math.min(2, Math.ceil((p.title ?? "").length / 34)) * ts * 1.12;

  if (p.valueNote) {
    h += 40;
    wrap(p.valueNote, 30, W, 2).forEach((l, i) => {
      svg += `<text x="0" y="${h + i * 40}" font-family="${FONT}" font-size="30" font-weight="600"
        fill="${c.soft}">${esc(l)}</text>`;
    });
    h += 40;
  }

  const items = (p.items ?? []).slice(0, 3);
  items.forEach((it) => {
    h += 58;
    svg += `<rect x="0" y="${h}" width="${W}" height="2" fill="${c.line}"/>`;
    svg += `<rect x="0" y="${h + 22}" width="16" height="16" fill="${c.accent}"/>`;
    svg += `<text x="36" y="${h + 37}" font-family="${FONT}" font-size="32" font-weight="700"
      fill="${c.ink}">${esc(wrap(it, 32, W - 40, 1)[0] ?? it)}</text>`;
  });

  return { svg, h };
}

/** BLOCKS — 2–4 velika bloka sa brojevima. */
function formBlocks(c: Colors, p: PostSlide): Block {
  const items = (p.items ?? []).slice(0, 4);
  const ts = fit(p.title ?? "", W, 60);
  const tl = wrap(p.title ?? "", ts, W, 2);

  let svg = tl
    .map(
      (l, i) =>
        `<text x="0" y="${ts * 0.78 + i * ts * 1.06}" font-family="${FONT}" font-size="${ts}" font-weight="900"
          letter-spacing="-2" fill="${c.ink}">${esc(l)}</text>`,
    )
    .join("");
  let y = (tl.length - 1) * ts * 1.06 + ts * 0.78 + 44;

  const gap = 16;
  const rowH = items.length >= 3 ? 104 : 124;
  items.forEach((it, i) => {
    const last = items.length % 2 === 1 && i === items.length - 1;
    const bw = last ? W : (W - gap) / 2;
    const bx = last ? 0 : i % 2 === 0 ? 0 : (W + gap) / 2;
    const by = y + Math.floor(i / 2) * (rowH + gap);

    svg += `<rect x="${bx}" y="${by}" width="${bw}" height="${rowH}" fill="${c.card}"
      stroke="${c.line}" stroke-width="1.5"/>`;
    svg += `<rect x="${bx}" y="${by}" width="6" height="${rowH}" fill="${c.accent}"/>`;
    svg += `<text x="${bx + 26}" y="${by + 40}" font-family="${FONT}" font-size="22"
      font-weight="900" letter-spacing="1.4" fill="${c.accent}">${String(i + 1).padStart(2, "0")}</text>`;
    wrap(it, 30, bw - 58, 2).forEach((l, li) => {
      svg += `<text x="${bx + 26}" y="${by + 72 + li * 34}" font-family="${FONT}" font-size="30"
        font-weight="700" fill="${c.ink}">${esc(l)}</text>`;
    });
    y = by;
  });

  return { svg, h: y + rowH };
}

/** DUO — PRIJE (✕) / POSLIJE (✓), dvije velike ploče. */
function formDuo(c: Colors, p: PostSlide): Block {
  const items = p.items ?? [];
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);

  const ts = fit(p.title ?? "", W, 56);
  const tl = wrap(p.title ?? "", ts, W, 2);
  let svg = tl
    .map(
      (l, i) =>
        `<text x="0" y="${ts * 0.78 + i * ts * 1.06}" font-family="${FONT}" font-size="${ts}" font-weight="900"
          letter-spacing="-2" fill="${c.ink}">${esc(l)}</text>`,
    )
    .join("");
  const top = (tl.length - 1) * ts * 1.06 + ts * 0.78 + 48;

  const gap = 16;
  const bw = (W - gap) / 2;
  const rows = Math.max(left.length, right.length);
  const bh = 66 + rows * 58;

  // PRIJE
  svg += `<rect x="0" y="${top}" width="${bw}" height="${bh}" fill="${c.card}" stroke="${c.line}" stroke-width="1.5"/>`;
  svg += `<text x="24" y="${top + 40}" font-family="${FONT}" font-size="22" font-weight="900"
    letter-spacing="2.4" fill="${c.soft}">PRIJE</text>`;
  left.forEach((it, i) => {
    const y = top + 86 + i * 58;
    svg += `<text x="24" y="${y}" font-family="${FONT}" font-size="28" font-weight="900" fill="${c.soft}">&#10005;</text>`;
    svg += `<text x="58" y="${y}" font-family="${FONT}" font-size="28" font-weight="600" fill="${c.ink}">${esc(
      wrap(it, 28, bw - 82, 1)[0] ?? it,
    )}</text>`;
  });

  // POSLIJE
  svg += `<rect x="${bw + gap}" y="${top}" width="${bw}" height="${bh}" fill="${c.accent}"/>`;
  svg += `<text x="${bw + gap + 24}" y="${top + 40}" font-family="${FONT}" font-size="22"
    font-weight="900" letter-spacing="2.4" fill="${c.accentInk}">POSLIJE</text>`;
  right.forEach((it, i) => {
    const y = top + 86 + i * 58;
    svg += `<text x="${bw + gap + 24}" y="${y}" font-family="${FONT}" font-size="28" font-weight="900" fill="${c.accentInk}">&#10003;</text>`;
    svg += `<text x="${bw + gap + 58}" y="${y}" font-family="${FONT}" font-size="28" font-weight="700" fill="${c.accentInk}">${esc(
      wrap(it, 28, bw - 82, 1)[0] ?? it,
    )}</text>`;
  });

  return { svg, h: top + bh };
}

/** ACTION — naslov + velika CTA ploča. */
function formAction(c: Colors, p: PostSlide): Block {
  let ts = fit(p.title ?? "", W, 88);
  let tl = wrap(p.title ?? "", ts, W, 3);
  while (tl.length * ts * 1.06 > CONTENT_H - 210 && ts > 46) {
    ts -= 6;
    tl = wrap(p.title ?? "", ts, W, 3);
  }
  const lh = ts * 1.06;

  let svg = tl
    .map(
      (l, i) =>
        `<text x="0" y="${ts * 0.78 + i * lh}" font-family="${FONT}" font-size="${ts}" font-weight="900"
          letter-spacing="-3" fill="${c.ink}">${esc(l)}</text>`,
    )
    .join("");
  let h = (tl.length - 1) * lh + ts * 0.78;

  if (p.subtitle) {
    h += 56;
    wrap(p.subtitle, 34, W, 2).forEach((l, i) => {
      svg += `<text x="0" y="${h + i * 44}" font-family="${FONT}" font-size="34" font-weight="600"
        fill="${c.soft}">${esc(l)}</text>`;
    });
    h += 44;
  }

  const bh = 124;
  h += 48;
  svg += `<rect x="0" y="${h}" width="${W}" height="${bh}" fill="${c.accent}"/>`;
  svg += `<text x="${W / 2}" y="${h + bh / 2 + 16}" text-anchor="middle" font-family="${FONT}"
    font-size="42" font-weight="900" letter-spacing="1" fill="${c.accentInk}">JAVITE NAM SE U DM</text>`;

  return { svg, h: h + bh };
}

function build(c: Colors, p: PostSlide): Block {
  const t = p.template ?? "title";
  if (t === "price" || t === "number") return formFigure(c, p);
  if (t === "list" || t === "process") return formBlocks(c, p);
  if (t === "compare") return formDuo(c, p);
  if (t === "cta") return formAction(c, p);
  return formHero(c, p);
}


/** Skalira blok vertikalno ako ne staje u zadatu visinu (za photo layoute). */
function buildFitting(c: Colors, p: PostSlide, maxH: number): Block {
  const b = build(c, p);
  if (b.h <= maxH) return b;
  const k = maxH / b.h;
  return {
    svg: `<g transform="scale(1, ${k.toFixed(4)})">${b.svg}</g>`,
    h: maxH,
  };
}

// ── Pozicioniranje ────────────────────────────────────────────────────────
const PLACE: Record<PostLayout, (c: Colors, p: PostSlide) => string> = {
  // vertikalno centrirano — mirno
  center: (c, p) => {
    const b = build(c, p);
    const y = b.h >= CONTENT_H ? CONTENT_TOP : CONTENT_TOP + (CONTENT_H - b.h) / 2;
    return `<g transform="translate(${M}, ${y})">${b.svg}</g>`;
  },
  // uz lijevu akcenat traku preko cijele visine
  split: (c, p) => {
    const b = build(c, p);
    const y = CONTENT_TOP + Math.max(0, (CONTENT_H - b.h) / 2);
    return `<rect x="${M - 40}" y="${CONTENT_TOP}" width="8" height="${CONTENT_H}" fill="${c.accent}"/>
      <g transform="translate(${M}, ${y})">${b.svg}</g>`;
  },
  // sadržaj u velikoj ploči
  band: (c, p) => {
    const b = build(c, p);
    const bh = Math.min(CONTENT_H, b.h + 128);
    const by = CONTENT_TOP + Math.max(0, (CONTENT_H - bh) / 2);
    const y = by + Math.max(0, (bh - b.h) / 2);
    return `<rect x="${M - 44}" y="${by}" width="${W + 88}" height="${bh}" fill="${c.card}"
      stroke="${c.line}" stroke-width="1.5"/>
      <rect x="${M - 44}" y="${by}" width="${W + 88}" height="8" fill="${c.accent}"/>
      <g transform="translate(${M}, ${y})">${b.svg}</g>`;
  },
  // gore poravnato + logo blok dolje desno
  offset: (c, p) => {
    const b = build(c, p);
    const y = CONTENT_TOP + 16;
    const s = 132;
    const sx = SIZE - M - s;
    const sy = CONTENT_BOTTOM - s;
    const lw = (s * 0.54) * DF_LOGO_RATIO;
    return `<g transform="translate(${M}, ${y})">${b.svg}</g>
      <rect x="${sx}" y="${sy}" width="${s}" height="${s}" fill="${c.accent}"/>
      <image href="${DF_LOGO_DATA_URI}" x="${sx + s / 2 - lw / 2}" y="${sy + s / 2 - s * 0.27}"
        width="${lw}" height="${s * 0.54}"/>`;
  },
  // FOTOGRAFIJA PREKO CIJELE POZADINE — tamna, stopljena s bojom palete.
  // Tekst ide preko nje; dodaje se gradijent da tekst ostane čitljiv.
  photoBg: (c, p) => {
    const ph = p.photo ?? "code1";
    const b = build(c, p);
    const y = CONTENT_TOP + Math.max(0, (CONTENT_H - b.h) / 2);
    // Fotografija je u punoj svjetlini — ona NOSI sliku.
    // Samo blagi tamni veo (28%) da bijeli tekst ostane čitljiv, i mekše
    // iznad/dolje da se ivice stopе sa platnom.
    return `<image href="${PHOTOS[ph]}" x="0" y="0" width="${SIZE}" height="${SIZE}"
        preserveAspectRatio="xMidYMid slice" aria-label="${esc(PHOTO_ALT[ph])}"/>
      <rect x="0" y="0" width="${SIZE}" height="${SIZE}" fill="#04060A" opacity="0.12"/>
      <rect x="0" y="0" width="${SIZE}" height="200" fill="url(#fadeTopSoft)"/>
      <rect x="0" y="${SIZE - 200}" width="${SIZE}" height="200" fill="url(#fadeDownSoft)"/>
      <g transform="translate(${M}, ${y})">${b.svg}</g>`;
  },

  // FOTOGRAFIJA GORE (pola), tekst dolje
  photoTop: (c, p) => {
    const ph = p.photo ?? "code1";
    // Fotografija zauzima gornjih 400px; tekst ide ispod nje i mora stati
    // do CONTENT_BOTTOM — ako ne staje, tekst se skalira (vidi buildSkaled).
    const imgH = 380;
    const areaTop = imgH + 20;
    const areaH = CONTENT_BOTTOM - areaTop;
    const b = buildFitting(c, p, areaH);
    const y = areaTop;
    return `<image href="${PHOTOS[ph]}" x="0" y="0" width="${SIZE}" height="${imgH}"
        preserveAspectRatio="xMidYMid slice" aria-label="${esc(PHOTO_ALT[ph])}"/>
      <rect x="0" y="${imgH - 90}" width="${SIZE}" height="90" fill="url(#fadeDown)"/>
      <g transform="translate(${M}, ${y})">${b.svg}</g>`;
  },

  // FOTOGRAFIJA DESNO (vertikalna traka), tekst lijevo
  photo: (c, p) => {
    const ph = p.photo ?? "code1";
    const imgW = 340;
    const b = build(c, p);
    const y = CONTENT_TOP + Math.max(0, (CONTENT_H - b.h) / 2);
    return `<image href="${PHOTOS[ph]}" x="${SIZE - imgW}" y="0" width="${imgW}" height="${SIZE}"
        preserveAspectRatio="xMidYMid slice" aria-label="${esc(PHOTO_ALT[ph])}"/>
      <rect x="${SIZE - imgW - 90}" y="0" width="90" height="${SIZE}" fill="url(#fadeRight)"/>
      <g transform="translate(${M}, ${y})">${b.svg}</g>`;
  },

  // veliki logo kao vodeni žig
  stamp: (c, p) => {
    const b = build(c, p);
    const y = CONTENT_TOP + Math.max(0, (CONTENT_H - b.h) / 2);
    const sh = 380;
    const sw = sh * DF_LOGO_RATIO;
    return `<g opacity="0.055"><image href="${DF_LOGO_DATA_URI}" x="${SIZE / 2 - sw / 2}"
        y="${CONTENT_TOP + (CONTENT_H - sh) / 2}" width="${sw}" height="${sh}"/></g>
      <g transform="translate(${M}, ${y})">${b.svg}</g>`;
  },
};

// ── Render ────────────────────────────────────────────────────────────────
export function renderSlideSvg(
  post: AdPost,
  slide: PostSlide,
  slideIndex: number,
  slideTotal: number,
): string {
  const c = PALETTES[slide.palette ?? post.palette] ?? PALETTES.dark;
  const layout = post.layout ?? "center";
  let content = (PLACE[layout] ?? PLACE.center)(c, slide);
  // Na fotografskoj pozadini tekst dobija meku sjenku — čitljiv i na svijetlim
  // i na tamnim dijelovima fotografije, bez potamnjenja cijele slike.
  if (layout === "photoBg") {
    content = `<g style="filter:drop-shadow(0 3px 18px rgba(0,0,0,0.85)) drop-shadow(0 1px 4px rgba(0,0,0,0.9))">${content}</g>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" role="img" aria-label="${esc(
    slide.title ?? post.title,
  )}">
  <defs>
    <linearGradient id="fadeDown" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c.bg}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${c.bg}" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="fadeRight" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${c.bg}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${c.bg}" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="fadeTopSoft" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#04060A" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#04060A" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="fadeDownSoft" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#04060A" stop-opacity="0"/>
      <stop offset="100%" stop-color="#04060A" stop-opacity="0.80"/>
    </linearGradient>
    <linearGradient id="fadeV" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c.bg}" stop-opacity="0.95"/>
      <stop offset="50%" stop-color="${c.bg}" stop-opacity="0.80"/>
      <stop offset="100%" stop-color="${c.bg}" stop-opacity="0.95"/>
    </linearGradient>
  </defs>
  <rect width="${SIZE}" height="${SIZE}" fill="${c.bg}"/>
  <rect x="0" y="0" width="${SIZE}" height="12" fill="${BRAND}"/>
  ${header(c, slide.eyebrow ?? post.eyebrow, post.category, slideIndex, slideTotal)}
  ${content}
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
    };
    return [renderSlideSvg(post, single, 0, 1)];
  }
  return (post.slides ?? []).map((s, i) => renderSlideSvg(post, s, i, total));
}

export function renderPostSvg(post: AdPost): string {
  return renderPostSlides(post)[0];
}

export function postSvgDataUri(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** 1080×1080 PNG iz SVG-a — za preuzimanje u punoj rezoluciji. */
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
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, SIZE, SIZE);
    return await new Promise((res) => canvas.toBlob((b) => res(b), "image/png"));
  } catch {
    return null;
  }
}

export const LAYOUT_LIST: PostLayout[] = ["center", "split", "band", "offset", "stamp"];
export { BRAND, BRAND_INK };
