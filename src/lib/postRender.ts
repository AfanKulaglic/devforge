// ───────────────────────────────────────────────────────────────────────────
// RENDERER — pretvara AdPost (+ list karusela) u SVG 1080×1080.
//
// PRINCIPI:
//   1. Nema broja objave na slici — to je interna stvar galerije.
//   2. Umjesto teksta "DEVFORGE" stoji pravi DF monogram (vektorski).
//   3. Pet layout varijanti (center / split / band / offset / stamp) daju
//      raznolikost, ali sve dijele isti ram, mrežu, tipografiju i paletu.
//   4. Sve boje dolaze iz brend palete — nema slobodnog izbora.
//
// Ram svake slike je identičan: mreža 8×8, teal traka gore, monogram u kutu,
// eyebrow gore-lijevo, linija + kategorija dolje. Samo se SADRŽAJ slaže
// drugačije — kao što profesionalni tim radi set objava.
// ───────────────────────────────────────────────────────────────────────────

import type { AdPost, PostLayout, PostPalette, PostSlide } from "./postsData";
import { dfMark, dfMarkWidth } from "./postBrand";

const SIZE = 1080;
const PAD = 96;
const FONT = "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

type Colors = {
  bg: string;
  bgAlt: string;
  ink: string;
  inkSoft: string;
  accent: string;
  accent2: string;
  grid: string;
  card: string;
  border: string;
};

const PALETTES: Record<PostPalette, Colors> = {
  dark: {
    bg: "#060606",
    bgAlt: "#0B0B0F",
    ink: "#FFFFFF",
    inkSoft: "#A7AABB",
    accent: "#14B8A6",
    accent2: "#0891B2",
    grid: "rgba(20,184,166,0.055)",
    card: "rgba(255,255,255,0.035)",
    border: "rgba(255,255,255,0.10)",
  },
  teal: {
    bg: "#0A3F3D",
    bgAlt: "#072C2B",
    ink: "#FFFFFF",
    inkSoft: "#9FE7DF",
    accent: "#14B8A6",
    accent2: "#0891B2",
    grid: "rgba(255,255,255,0.05)",
    card: "rgba(255,255,255,0.07)",
    border: "rgba(255,255,255,0.16)",
  },
  light: {
    bg: "#F4F5F7",
    bgAlt: "#FFFFFF",
    ink: "#0B0B0F",
    inkSoft: "#5A5D6E",
    accent: "#0F9E8E",
    accent2: "#0891B2",
    grid: "rgba(11,11,15,0.035)",
    card: "rgba(11,11,15,0.03)",
    border: "rgba(11,11,15,0.10)",
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

function wrap(text: string, fontSize: number, maxWidth: number, maxLines: number): string[] {
  const perLine = Math.max(6, Math.floor(maxWidth / (fontSize * 0.6)));
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const cand = cur ? `${cur} ${w}` : w;
    if (cand.length <= perLine) {
      cur = cand;
    } else {
      if (cur) lines.push(cur);
      cur = w;
      if (lines.length === maxLines) break;
    }
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  return lines.slice(0, maxLines);
}

/** Najveći font koji staje u datu širinu za dati broj redova. */
function fitSize(text: string, maxWidth: number, start: number, min = 44): number {
  const words = text.split(/\s+/);
  const longest = Math.max(...words.map((w) => w.length));
  let size = start;
  while (size > min) {
    // najduža riječ mora stati u jedan red
    if (longest * size * 0.6 <= maxWidth) return size;
    size -= 4;
  }
  return min;
}

function gridPattern(c: Colors): string {
  const step = SIZE / 8;
  let out = "";
  for (let i = 1; i < 8; i++) {
    out += `<line x1="${i * step}" y1="0" x2="${i * step}" y2="${SIZE}" stroke="${c.grid}" stroke-width="1"/>`;
    out += `<line x1="0" y1="${i * step}" x2="${SIZE}" y2="${i * step}" stroke="${c.grid}" stroke-width="1"/>`;
  }
  return out;
}

// ── Ram: monogram u kutu + eyebrow ────────────────────────────────────────
function header(c: Colors, eyebrow: string): string {
  const mh = 34; // visina monograma
  const mw = dfMarkWidth(mh);
  const mx = SIZE - PAD - mw;
  const my = PAD - 10;
  return `
    ${dfMark(mx, my, mh, c.ink, c.bg)}
    <text x="${PAD}" y="${PAD + 12}" font-family="${FONT}" font-size="26" font-weight="800"
      letter-spacing="4.2" fill="${c.accent}">${esc(eyebrow.toUpperCase())}</text>`;
}

function footer(c: Colors, category: string, slideNo: number, slideTotal: number): string {
  const dots =
    slideTotal > 1
      ? Array.from({ length: slideTotal })
          .map((_, i) => {
            const cx = SIZE / 2 - ((slideTotal - 1) * 18) / 2 + i * 18;
            return i === slideNo
              ? `<rect x="${cx - 9}" y="${SIZE - PAD - 6}" width="18" height="7" fill="${c.accent}"/>`
              : `<rect x="${cx - 3}" y="${SIZE - PAD - 5}" width="6" height="5" fill="${c.inkSoft}" opacity="0.45"/>`;
          })
          .join("")
      : "";
  return `
    <line x1="${PAD}" y1="${SIZE - PAD - 34}" x2="${SIZE - PAD}" y2="${SIZE - PAD - 34}"
      stroke="${c.border}" stroke-width="1"/>
    <text x="${PAD}" y="${SIZE - PAD}" font-family="${FONT}" font-size="22" font-weight="700"
      letter-spacing="2.6" fill="${c.inkSoft}">${esc(category.toUpperCase())}</text>
    ${dots}`;
}

// ── Sadržaj po šablonu ────────────────────────────────────────────────────
type Block = { svg: string; h: number };

function blkTitle(c: Colors, p: PostSlide, w: number): Block {
  const size = fitSize(p.title ?? "", w, 104);
  const lines = wrap(p.title ?? "", size, w, 4);
  const lh = size * 1.1;
  const svg =
    lines
      .map(
        (l, i) =>
          `<text x="0" y="${size * 0.86 + i * lh}" font-family="${FONT}" font-size="${size}"
            font-weight="900" letter-spacing="-2.5" fill="${c.ink}">${esc(l)}</text>`,
      )
      .join("") +
    (p.subtitle
      ? wrap(p.subtitle, 33, w, 2)
          .map(
            (l, i) =>
              `<text x="0" y="${lines.length * lh + 26 + i * 46}" font-family="${FONT}"
                font-size="33" font-weight="500" fill="${c.inkSoft}">${esc(l)}</text>`,
          )
          .join("")
      : "");
  const h = lines.length * lh + (p.subtitle ? 26 + 46 : 0);
  return { svg, h };
}

function blkPrice(c: Colors, p: PostSlide, w: number): Block {
  const val = p.value ?? "";
  const vsize = fitSize(val, w, val.length <= 5 ? 200 : val.length <= 8 ? 140 : 104);
  const tsize = fitSize(p.title ?? "", w, 60);
  const tlines = wrap(p.title ?? "", tsize, w, 2);
  const items = (p.items ?? []).slice(0, 4);
  let y = vsize * 0.9;
  let svg = `<text x="0" y="${y}" font-family="${FONT}" font-size="${vsize}" font-weight="900"
    letter-spacing="-6" fill="${c.accent}">${esc(val)}</text>`;
  y += 40;
  for (const l of tlines) {
    y += tsize * 1.05;
    svg += `<text x="0" y="${y}" font-family="${FONT}" font-size="${tsize}" font-weight="800"
      letter-spacing="-1" fill="${c.ink}">${esc(l)}</text>`;
  }
  y += 22;
  items.forEach((it) => {
    y += 46;
    svg += `<rect x="0" y="${y - 18}" width="14" height="14" fill="${c.accent}"/>`;
    svg += `<text x="32" y="${y - 2}" font-family="${FONT}" font-size="28" font-weight="500"
      fill="${c.inkSoft}">${esc(it)}</text>`;
  });
  return { svg, h: y };
}

function blkQuote(c: Colors, p: PostSlide, w: number): Block {
  const size = fitSize(p.title ?? "", w, 64);
  const lines = wrap(p.title ?? "", size, w, 5);
  const lh = size * 1.16;
  let svg = `<text x="-14" y="${size * 0.7}" font-family="Georgia, 'Times New Roman', serif"
    font-size="${size * 2.6}" font-weight="700" fill="${c.accent}" opacity="0.28">&#8220;</text>`;
  lines.forEach((l, i) => {
    svg += `<text x="20" y="${size * 3 + i * lh}" font-family="${FONT}" font-size="${size}"
      font-weight="800" letter-spacing="-1.4" fill="${c.ink}">${esc(l)}</text>`;
  });
  let h = size * 3 + lines.length * lh;
  if (p.subtitle) {
    svg += `<line x1="20" y1="${h + 4}" x2="140" y2="${h + 4}" stroke="${c.accent}" stroke-width="5"/>`;
    wrap(p.subtitle, 31, w - 20, 2).forEach((l, i) => {
      svg += `<text x="20" y="${h + 60 + i * 44}" font-family="${FONT}" font-size="31"
        font-weight="500" fill="${c.inkSoft}">${esc(l)}</text>`;
    });
    h += 60 + 44;
  }
  return { svg, h };
}

function blkList(c: Colors, p: PostSlide, w: number): Block {
  const items = (p.items ?? []).slice(0, 6);
  const tsize = fitSize(p.title ?? "", w, 58);
  const tl = wrap(p.title ?? "", tsize, w, 2);
  let y = 0;
  let svg = tl
    .map((l, i) => {
      const yy = tsize * 0.9 + i * tsize * 1.1;
      y = yy;
      return `<text x="0" y="${yy}" font-family="${FONT}" font-size="${tsize}" font-weight="900"
        letter-spacing="-1.6" fill="${c.ink}">${esc(l)}</text>`;
    })
    .join("");
  y += 44;
  items.forEach((it, i) => {
    y += 76;
    const line = wrap(it, 32, w - 60, 1)[0] ?? it;
    svg += `<rect x="0" y="${y - 26}" width="24" height="24" fill="${c.accent}"/>`;
    svg += `<text x="48" y="${y - 2}" font-family="${FONT}" font-size="32" font-weight="600"
      fill="${i === 0 ? c.ink : c.inkSoft}">${esc(line)}</text>`;
    svg += `<line x1="0" y1="${y + 26}" x2="${w}" y2="${y + 26}" stroke="${c.border}" stroke-width="1"/>`;
  });
  return { svg, h: y + 26 };
}

function blkCompare(c: Colors, p: PostSlide, w: number): Block {
  const items = p.items ?? [];
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);
  const tsize = fitSize(p.title ?? "", w, 54);
  const tl = wrap(p.title ?? "", tsize, w, 2);
  const colGap = 26;
  const colW = (w - colGap) / 2;
  const rows = Math.max(left.length, right.length);
  const boxH = 70 + rows * 62;
  const top = tl.length * tsize * 1.1 + 56;
  let svg = tl
    .map(
      (l, i) =>
        `<text x="0" y="${tsize * 0.9 + i * tsize * 1.1}" font-family="${FONT}"
          font-size="${tsize}" font-weight="900" letter-spacing="-1.4" fill="${c.ink}">${esc(l)}</text>`,
    )
    .join("");
  // lijeva kolona
  svg += `<rect x="0" y="${top}" width="${colW}" height="${boxH}" fill="${c.card}" stroke="${c.border}"/>`;
  svg += `<text x="16" y="${top - 10}" font-family="${FONT}" font-size="22" font-weight="800"
    letter-spacing="2.4" fill="${c.inkSoft}">PRIJE</text>`;
  left.forEach((it, i) => {
    svg += `<text x="16" y="${top + 46 + i * 62}" font-family="${FONT}" font-size="27"
      font-weight="600" fill="${c.inkSoft}">&#10005;  ${esc(it)}</text>`;
  });
  // desna kolona
  svg += `<rect x="${colW + colGap}" y="${top}" width="${colW}" height="${boxH}"
    fill="${c.accent}" opacity="0.12"/>`;
  svg += `<text x="${colW + colGap + 16}" y="${top - 10}" font-family="${FONT}" font-size="22"
    font-weight="800" letter-spacing="2.4" fill="${c.accent}">POSLIJE</text>`;
  right.forEach((it, i) => {
    svg += `<text x="${colW + colGap + 16}" y="${top + 46 + i * 62}" font-family="${FONT}"
      font-size="27" font-weight="600" fill="${c.accent}">&#10003;  ${esc(it)}</text>`;
  });
  return { svg, h: top + boxH };
}

function blkNumber(c: Colors, p: PostSlide, w: number, center: boolean): Block {
  const val = p.value ?? "0";
  const vsize = fitSize(val, w, val.length <= 2 ? 320 : val.length <= 4 ? 240 : 160);
  const tsize = fitSize(p.title ?? "", w, 50);
  const tl = wrap(p.title ?? "", tsize, w, 2);
  const anchor = center ? "middle" : "start";
  const cx = center ? w / 2 : 0;
  let y = vsize * 0.82;
  let svg = `<text x="${cx}" y="${y}" text-anchor="${anchor}" font-family="${FONT}"
    font-size="${vsize}" font-weight="900" letter-spacing="-8" fill="${c.accent}">${esc(val)}</text>`;
  y += 26;
  tl.forEach((l) => {
    y += tsize * 1.05;
    svg += `<text x="${cx}" y="${y}" text-anchor="${anchor}" font-family="${FONT}"
      font-size="${tsize}" font-weight="800" letter-spacing="-1" fill="${c.ink}">${esc(l)}</text>`;
  });
  if (p.valueNote) {
    y += 42;
    svg += `<text x="${cx}" y="${y}" text-anchor="${anchor}" font-family="${FONT}"
      font-size="29" font-weight="500" fill="${c.inkSoft}">${esc(p.valueNote)}</text>`;
  }
  return { svg, h: y };
}

function blkProcess(c: Colors, p: PostSlide, w: number): Block {
  const items = (p.items ?? []).slice(0, 4);
  const tsize = fitSize(p.title ?? "", w, 58);
  const tl = wrap(p.title ?? "", tsize, w, 2);
  let y = tl.length * tsize * 1.1;
  let svg = tl
    .map(
      (l, i) =>
        `<text x="0" y="${tsize * 0.9 + i * tsize * 1.1}" font-family="${FONT}"
          font-size="${tsize}" font-weight="900" letter-spacing="-1.6" fill="${c.ink}">${esc(l)}</text>`,
    )
    .join("");
  const startY = y + 54;
  if (items.length > 1) {
    svg += `<line x1="26" y1="${startY}" x2="26" y2="${startY + (items.length - 1) * 108}"
      stroke="${c.border}" stroke-width="3"/>`;
  }
  y = startY;
  items.forEach((it, i) => {
    const yy = startY + i * 108;
    svg += `<circle cx="26" cy="${yy}" r="26" fill="${c.bg}" stroke="${c.accent}" stroke-width="3"/>`;
    svg += `<text x="26" y="${yy + 9}" text-anchor="middle" font-family="${FONT}" font-size="24"
      font-weight="900" fill="${c.accent}">${i + 1}</text>`;
    const line = wrap(it, 31, w - 80, 1)[0] ?? it;
    svg += `<text x="74" y="${yy + 8}" font-family="${FONT}" font-size="31" font-weight="700"
      fill="${c.ink}">${esc(line)}</text>`;
    y = yy;
  });
  return { svg, h: y + 30 };
}

function blkCta(c: Colors, p: PostSlide, w: number): Block {
  const size = fitSize(p.title ?? "", w, 74);
  const lines = wrap(p.title ?? "", size, w, 3);
  const lh = size * 1.1;
  let svg = lines
    .map(
      (l, i) =>
        `<text x="0" y="${size * 0.86 + i * lh}" font-family="${FONT}" font-size="${size}"
          font-weight="900" letter-spacing="-2" fill="${c.ink}">${esc(l)}</text>`,
    )
    .join("");
  let h = lines.length * lh;
  if (p.subtitle) {
    wrap(p.subtitle, 31, w, 2).forEach((l, i) => {
      svg += `<text x="0" y="${h + 30 + i * 44}" font-family="${FONT}" font-size="31"
        font-weight="500" fill="${c.inkSoft}">${esc(l)}</text>`;
    });
    h += 30 + 44;
  }
  h += 46;
  svg += `<rect x="0" y="${h}" width="${w}" height="96" fill="${c.accent}"/>`;
  svg += `<text x="${w / 2}" y="${h + 61}" text-anchor="middle" font-family="${FONT}"
    font-size="35" font-weight="900" letter-spacing="1.6" fill="#04120F">POSALJITE NAM DM</text>`;
  return { svg, h: h + 96 };
}

function buildBlock(c: Colors, p: PostSlide, w: number, center: boolean): Block {
  switch (p.template ?? "title") {
    case "price":
      return blkPrice(c, p, w);
    case "quote":
      return blkQuote(c, p, w);
    case "list":
      return blkList(c, p, w);
    case "compare":
      return blkCompare(c, p, w);
    case "number":
      return blkNumber(c, p, w, center);
    case "process":
      return blkProcess(c, p, w);
    case "cta":
      return blkCta(c, p, w);
    default:
      return blkTitle(c, p, w);
  }
}

// ── Layouti ───────────────────────────────────────────────────────────────
// Svaki vraća gotov sadržaj postavljen u platno. Ram (header/footer) je isti.
const CONTENT_TOP = 240;
const CONTENT_BOTTOM = SIZE - PAD - 70;
const CONTENT_H = CONTENT_BOTTOM - CONTENT_TOP;
const FULL_W = SIZE - PAD * 2;

function layoutCenter(c: Colors, p: PostSlide): { content: string; centered: boolean } {
  // Centriranje: blok gradimo na punoj sirini pa ga pomjeramo na sredinu.
  // buildBlock sa `center=true` sam postavlja text-anchor="middle" i x=w/2,
  // pa ga samo translatiramo na lijevu marginu.
  const b = buildBlock(c, p, FULL_W, true);
  const y = CONTENT_TOP + Math.max(0, (CONTENT_H - b.h) / 2);
  return { content: `<g transform="translate(${PAD}, ${y})">${b.svg}</g>`, centered: true };
}

function layoutSplit(c: Colors, p: PostSlide): { content: string; centered: boolean } {
  const colW = FULL_W * 0.62;
  const b = buildBlock(c, p, colW, false);
  const y = CONTENT_TOP + Math.max(0, (CONTENT_H - b.h) / 2);
  // desni akcenat blok — vizuelni balans
  const bx = PAD + colW + 48;
  const bw = FULL_W - colW - 48;
  const accent = `
    <rect x="${bx}" y="${CONTENT_TOP}" width="${bw}" height="${CONTENT_H}" fill="${c.card}"/>
    <rect x="${bx}" y="${CONTENT_TOP}" width="8" height="${CONTENT_H}" fill="${c.accent}"/>`;
  return { content: `${accent}<g transform="translate(${PAD}, ${y})">${b.svg}</g>`, centered: false };
}

function layoutBand(c: Colors, p: PostSlide): { content: string; centered: boolean } {
  const b = buildBlock(c, p, FULL_W - 96, false);
  const bandH = Math.min(CONTENT_H, b.h + 120);
  const bandY = CONTENT_TOP + (CONTENT_H - bandH) / 2;
  const bg = `
    <rect x="${PAD - 48}" y="${bandY}" width="${FULL_W + 96}" height="${bandH}" fill="${c.bgAlt}"/>
    <rect x="${PAD - 48}" y="${bandY}" width="${FULL_W + 96}" height="5" fill="${c.accent}"/>`;
  const y = bandY + (bandH - b.h) / 2;
  return { content: `${bg}<g transform="translate(${PAD}, ${y})">${b.svg}</g>`, centered: false };
}

function layoutOffset(c: Colors, p: PostSlide): { content: string; centered: boolean } {
  const b = buildBlock(c, p, FULL_W, false);
  // sadrzaj gore, s velikim praznim prostorom dole — asimetricno, mirnije
  const y = CONTENT_TOP + 20;
  const mark = `<circle cx="${SIZE - PAD - 60}" cy="${CONTENT_BOTTOM - 60}" r="46" fill="none"
    stroke="${c.accent}" stroke-width="3" opacity="0.5"/>
    <circle cx="${SIZE - PAD - 60}" cy="${CONTENT_BOTTOM - 60}" r="16" fill="${c.accent}" opacity="0.5"/>`;
  return { content: `${mark}<g transform="translate(${PAD}, ${y})">${b.svg}</g>`, centered: false };
}

function layoutStamp(c: Colors, p: PostSlide): { content: string; centered: boolean } {
  const b = buildBlock(c, p, FULL_W, false);
  const y = CONTENT_TOP + Math.max(0, (CONTENT_H - b.h) / 2);
  // veliki poluprovidni monogram u pozadini — "pecat"
  const sh = 420;
  const sw = dfMarkWidth(sh);
  const stamp = `<g opacity="0.055">${dfMark(SIZE / 2 - sw / 2, CONTENT_TOP + CONTENT_H / 2 - sh / 2, sh, c.accent, c.bg)}</g>`;
  return { content: `${stamp}<g transform="translate(${PAD}, ${y})">${b.svg}</g>`, centered: false };
}

const LAYOUTS: Record<
  PostLayout,
  (c: Colors, p: PostSlide) => { content: string; centered: boolean }
> = {
  center: layoutCenter,
  split: layoutSplit,
  band: layoutBand,
  offset: layoutOffset,
  stamp: layoutStamp,
};

// ── Render jednog lista ───────────────────────────────────────────────────
export function renderSlideSvg(
  post: AdPost,
  slide: PostSlide,
  slideIndex: number,
  slideTotal: number,
): string {
  const palette = slide.palette ?? post.palette;
  const c = PALETTES[palette];
  const layout = post.layout ?? "center";
  const { content } = LAYOUTS[layout](c, slide);
  const eyebrow = slide.eyebrow ?? post.eyebrow;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" role="img" aria-label="${esc(slide.title ?? post.title)}">
  <rect width="${SIZE}" height="${SIZE}" fill="${c.bg}"/>
  ${gridPattern(c)}
  <rect x="0" y="0" width="${SIZE}" height="8" fill="${c.accent}"/>
  ${header(c, eyebrow)}
  ${content}
  ${footer(c, post.category, slideIndex, slideTotal)}
</svg>`;
}

/** Broj slika u objavi (1 = pojedinačna, više = karusel). */
export function slideCount(post: AdPost): number {
  return post.slides && post.slides.length > 0 ? post.slides.length : 1;
}

/** Svi listovi objave kao SVG stringovi. */
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

/** Prva slika — za pregled u galeriji. */
export function renderPostSvg(post: AdPost, _index: number): string {
  return renderPostSlides(post)[0];
}

export function postSvgDataUri(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** CSS za demonstraciju layout varijanti (koristi galerija). */
export const LAYOUT_LIST: PostLayout[] = ["center", "split", "band", "offset", "stamp"];
