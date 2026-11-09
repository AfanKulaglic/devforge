// ───────────────────────────────────────────────────────────────────────────
// RENDERER v3 — dizajniran za SCREENSHOT, ne za preuzimanje.
//
// Šta to znači konkretno:
//   1. Nema tankih linija (1px se izgubi pri skaliranju/kopresiji)
//   2. Krupna tipografija — čitljiva i na thumbnailu
//   3. Visok kontrast teksta (nikad sivi tekst na srednjem tonu)
//   4. Nema sitnica (bez tačkica, bez sitnih etiketa, bez suptilnih mreža)
//   5. Velike pune površine boje — jasne i na malom ekranu
//
// PRINCIP KOMPOZICIJE (novi, zamjenjuje stare šablone):
//   Svaka slika ima JEDNU dominantnu formu:
//     - "hero"   : golemi naslov, jedina stvar na slici
//     - "figure" : golemi broj/cijena + kratka rečenica
//     - "blocks" : 2–4 velika bloka (kartice), ne lista teksta
//     - "duo"    : dvije velike suprotne ploče (prije/poslije)
//     - "steps"  : vertikalne trake s brojevima
//     - "action" : jedna velika teal ploča s pozivom
// ───────────────────────────────────────────────────────────────────────────

import type { AdPost, PostLayout, PostPalette, PostSlide } from "./postsData";
import { dfMark, dfMarkWidth } from "./postBrand";

const SIZE = 1080;
const PAD = 88;
const FONT = "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

type Colors = {
  bg: string;
  ink: string;
  inkSoft: string;
  accent: string;
  accentInk: string; // tekst na akcentu
  card: string;
  border: string;
};

const PALETTES: Record<PostPalette, Colors> = {
  dark: {
    bg: "#08080B",
    ink: "#FFFFFF",
    inkSoft: "#CDD0DC",
    accent: "#14B8A6",
    accentInk: "#04211E",
    card: "#13131A",
    border: "#2A2A35",
  },
  teal: {
    bg: "#0B4744",
    ink: "#FFFFFF",
    inkSoft: "#D6F5F1", // svjetlije od pozadine — kontrast > 7
    accent: "#5EEAD4",
    accentInk: "#04211E", // gotovo crn — kontrast > 12 na #5EEAD4
    card: "#0E5C57",
    border: "#3D8F88",
  },
  light: {
    bg: "#F2F3F6",
    ink: "#0A0A0F",
    inkSoft: "#3A3D4A",
    accent: "#0E9C8C",
    accentInk: "#FFFFFF",
    card: "#FFFFFF",
    border: "#D4D7E0",
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
  const perLine = Math.max(5, Math.floor(maxWidth / (size * 0.62)));
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

/** Najveći font koji staje: najduža riječ mora ući u širinu. */
function fit(text: string, maxWidth: number, start: number, min = 40): number {
  const longest = Math.max(...text.split(/\s+/).map((w) => w.length), 1);
  let size = start;
  while (size > min && longest * size * 0.62 > maxWidth) size -= 6;
  return size;
}

// ── Ram: samo monogram + akcenat traka. Nema sitnih etiketa. ──────────────
function frame(c: Colors, eyebrow: string, category: string, slide: number, total: number): string {
  const mh = 40;
  const mw = dfMarkWidth(mh);
  const dots =
    total > 1
      ? Array.from({ length: total })
          .map((_, i) => {
            const cx = SIZE - PAD - (total - 1 - i) * 22;
            return i === slide
              ? `<rect x="${cx - 11}" y="${SIZE - PAD - 8}" width="22" height="10" fill="${c.accent}"/>`
              : `<rect x="${cx - 4}" y="${SIZE - PAD - 7}" width="8" height="8" fill="${c.inkSoft}" opacity="0.4"/>`;
          })
          .join("")
      : "";
  return `
    ${dfMark(SIZE - PAD - mw, PAD - 6, mh, c.ink, c.bg)}
    <text x="${PAD}" y="${PAD + 22}" font-family="${FONT}" font-size="34" font-weight="900"
      letter-spacing="3.4" fill="${c.accent}">${esc(eyebrow.toUpperCase())}</text>
    <text x="${PAD}" y="${SIZE - PAD}" font-family="${FONT}" font-size="26" font-weight="800"
      letter-spacing="2.8" fill="${c.inkSoft}">${esc(category.toUpperCase())}</text>
    ${dots}`;
}

// ── Forme ─────────────────────────────────────────────────────────────────

/** HERO — golemi naslov. Ništa drugo ne smije odvlačiti pažnju. */
function formHero(c: Colors, p: PostSlide, w: number): { svg: string; h: number } {
  const size = fit(p.title ?? "", w, 132);
  const lines = wrap(p.title ?? "", size, w, 4);
  const lh = size * 1.08;
  let svg = "";
  // akcenatska traka iznad naslova — vizuelni ulaz u tekst
  svg += `<rect x="0" y="${-lh * 0.86 - 34}" width="88" height="12" fill="${c.accent}"/>`;
  lines.forEach((l, i) => {
    svg += `<text x="0" y="${i * lh}" font-family="${FONT}" font-size="${size}" font-weight="900"
      letter-spacing="-4" fill="${c.ink}">${esc(l)}</text>`;
  });
  let h = (lines.length - 1) * lh + size * 0.2;
  if (p.subtitle) {
    const ss = 40;
    const sl = wrap(p.subtitle, ss, w, 3);
    svg += `<rect x="0" y="${h + 46}" width="6" height="${18 + sl.length * 56}" fill="${c.accent}"/>`;
    sl.forEach((l, i) => {
      svg += `<text x="34" y="${h + 74 + i * 56}" font-family="${FONT}" font-size="${ss}"
        font-weight="600" fill="${c.inkSoft}">${esc(l)}</text>`;
    });
    h += 74 + sl.length * 56;
  }
  return { svg, h };
}

/** FIGURE — golemi broj/cijena, pa kratka rečenica. */
function formFigure(c: Colors, p: PostSlide, w: number): { svg: string; h: number } {
  const val = p.value ?? "";
  const vsize = fit(val, w, val.length <= 2 ? 380 : val.length <= 4 ? 300 : val.length <= 7 ? 190 : 130);
  let svg = `<text x="0" y="${vsize * 0.78}" font-family="${FONT}" font-size="${vsize}"
    font-weight="900" letter-spacing="-14" fill="${c.accent}">${esc(val)}</text>`;
  let h = vsize * 0.9;
  const tsize = fit(p.title ?? "", w, 54);
  wrap(p.title ?? "", tsize, w, 3).forEach((l, i) => {
    svg += `<text x="0" y="${h + 56 + i * tsize * 1.14}" font-family="${FONT}"
      font-size="${tsize}" font-weight="800" letter-spacing="-1.4" fill="${c.ink}">${esc(l)}</text>`;
    h += i === 0 ? tsize * 1.14 : tsize * 1.14;
  });
  if (p.valueNote) {
    h += 46;
    wrap(p.valueNote, 34, w, 2).forEach((l, i) => {
      svg += `<text x="0" y="${h + 56 + i * 44}" font-family="${FONT}" font-size="34"
        font-weight="600" fill="${c.inkSoft}">${esc(l)}</text>`;
    });
  }
  // opcionalna lista ispod — veliki redovi, ne sitni
  const items = (p.items ?? []).slice(0, 3);
  items.forEach((it) => {
    h += 78;
    svg += `<rect x="0" y="${h + 56}" width="${w}" height="2" fill="${c.border}"/>`;
    svg += `<rect x="0" y="${h + 76}" width="20" height="20" fill="${c.accent}"/>`;
    svg += `<text x="40" y="${h + 95}" font-family="${FONT}" font-size="36" font-weight="700"
      fill="${c.ink}">${esc(wrap(it, 36, w - 40, 1)[0] ?? it)}</text>`;
    h += 56;
  });
  return { svg, h: h + 70 };
}

/** BLOCKS — 2–4 velike kartice umjesto liste teksta. */
function formBlocks(c: Colors, p: PostSlide, w: number): { svg: string; h: number } {
  const items = (p.items ?? []).slice(0, 4);
  const tsize = fit(p.title ?? "", w, 66);
  const tl = wrap(p.title ?? "", tsize, w, 2);
  let svg = tl
    .map(
      (l, i) =>
        `<text x="0" y="${i * tsize * 1.08}" font-family="${FONT}" font-size="${tsize}"
          font-weight="900" letter-spacing="-2.4" fill="${c.ink}">${esc(l)}</text>`,
    )
    .join("");
  let y = (tl.length - 1) * tsize * 1.08 + tsize * 0.3 + 56;
  const gap = 18;
  const rowH = items.length >= 3 ? 116 : 148;
  items.forEach((it, i) => {
    const isLast = items.length % 2 === 1 && i === items.length - 1;
    const bw = isLast ? w : (w - gap) / 2;
    const bx = isLast ? 0 : i % 2 === 0 ? 0 : (w + gap) / 2;
    const by = y + Math.floor(i / 2) * (rowH + gap);
    const text = wrap(it, 36, bw - 76, 2);
    svg += `<rect x="${bx}" y="${by}" width="${bw}" height="${rowH}" fill="${c.card}"
      stroke="${c.border}" stroke-width="2"/>`;
    svg += `<rect x="${bx}" y="${by}" width="8" height="${rowH}" fill="${c.accent}"/>`;
    svg += `<text x="${bx + 32}" y="${by + 44}" font-family="${FONT}" font-size="24"
      font-weight="900" fill="${c.accent}">${String(i + 1).padStart(2, "0")}</text>`;
    text.forEach((l, li) => {
      svg += `<text x="${bx + 32}" y="${by + 78 + li * 40}" font-family="${FONT}" font-size="32"
        font-weight="700" fill="${c.ink}">${esc(l)}</text>`;
    });
    y = by;
  });
  return { svg, h: y + rowH };
}

/** DUO — dvije velike suprotne ploče. */
function formDuo(c: Colors, p: PostSlide, w: number): { svg: string; h: number } {
  const items = p.items ?? [];
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);
  const tsize = fit(p.title ?? "", w, 62);
  const tl = wrap(p.title ?? "", tsize, w, 2);
  let svg = tl
    .map(
      (l, i) =>
        `<text x="0" y="${i * tsize * 1.08}" font-family="${FONT}" font-size="${tsize}"
          font-weight="900" letter-spacing="-2" fill="${c.ink}">${esc(l)}</text>`,
    )
    .join("");
  const top = (tl.length - 1) * tsize * 1.08 + tsize * 0.3 + 62;
  const gap = 20;
  const bw = (w - gap) / 2;
  const rows = Math.max(left.length, right.length);
  const bh = 78 + rows * 64;
  // loša strana
  svg += `<rect x="0" y="${top}" width="${bw}" height="${bh}" fill="${c.card}" stroke="${c.border}" stroke-width="2"/>`;
  svg += `<text x="26" y="${top + 46}" font-family="${FONT}" font-size="26" font-weight="900"
    letter-spacing="2.6" fill="${c.inkSoft}">PRIJE</text>`;
  left.forEach((it, i) => {
    svg += `<text x="26" y="${top + 100 + i * 64}" font-family="${FONT}" font-size="30"
      font-weight="700" fill="${c.inkSoft}">&#10005;</text>`;
    svg += `<text x="62" y="${top + 100 + i * 64}" font-family="${FONT}" font-size="30"
      font-weight="700" fill="${c.inkSoft}">${esc(wrap(it, 30, bw - 90, 1)[0] ?? it)}</text>`;
  });
  // dobra strana
  svg += `<rect x="${bw + gap}" y="${top}" width="${bw}" height="${bh}" fill="${c.accent}"/>`;
  svg += `<text x="${bw + gap + 26}" y="${top + 46}" font-family="${FONT}" font-size="26"
    font-weight="900" letter-spacing="2.6" fill="${c.accentInk}">POSLIJE</text>`;
  right.forEach((it, i) => {
    svg += `<text x="${bw + gap + 26}" y="${top + 100 + i * 64}" font-family="${FONT}"
      font-size="30" font-weight="900" fill="${c.accentInk}">&#10003;</text>`;
    svg += `<text x="${bw + gap + 62}" y="${top + 100 + i * 64}" font-family="${FONT}"
      font-size="30" font-weight="700" fill="${c.accentInk}">${esc(wrap(it, 30, bw - 90, 1)[0] ?? it)}</text>`;
  });
  return { svg, h: top + bh };
}

/** ACTION — jedna velika ploča s pozivom. */
function formAction(c: Colors, p: PostSlide, w: number): { svg: string; h: number } {
  const size = fit(p.title ?? "", w, 92);
  const lines = wrap(p.title ?? "", size, w, 3);
  const lh = size * 1.06;
  let svg = lines
    .map(
      (l, i) =>
        `<text x="0" y="${i * lh}" font-family="${FONT}" font-size="${size}" font-weight="900"
          letter-spacing="-3" fill="${c.ink}">${esc(l)}</text>`,
    )
    .join("");
  let h = (lines.length - 1) * lh + size * 0.24;
  if (p.subtitle) {
    wrap(p.subtitle, 38, w, 2).forEach((l, i) => {
      svg += `<text x="0" y="${h + 62 + i * 50}" font-family="${FONT}" font-size="38"
        font-weight="600" fill="${c.inkSoft}">${esc(l)}</text>`;
      h += 50;
    });
    h += 12;
  }
  // velika teal ploča — jedina "dugmad" stvar na slici
  const bh = 132;
  svg += `<rect x="0" y="${h + 46}" width="${w}" height="${bh}" fill="${c.accent}"/>`;
  svg += `<text x="${w / 2}" y="${h + 46 + bh / 2 + 17}" text-anchor="middle" font-family="${FONT}"
    font-size="46" font-weight="900" letter-spacing="1.2" fill="${c.accentInk}">JAVITE NAM SE U DM</text>`;
  return { svg, h: h + 46 + bh };
}

type Block = { svg: string; h: number };

function build(c: Colors, p: PostSlide, w: number): Block {
  const t = p.template ?? "title";
  if (t === "price" || t === "number") return formFigure(c, p, w);
  if (t === "list" || t === "process") return formBlocks(c, p, w);
  if (t === "compare") return formDuo(c, p, w);
  if (t === "cta") return formAction(c, p, w);
  if (t === "quote") return formHero(c, { ...p, title: p.title ?? "" }, w);
  return formHero(c, p, w);
}

// ── Pozicioniranje: varijante daju raznolikost, ram ostaje isti ───────────
const TOP = 250;
const BOTTOM = SIZE - PAD - 84;
const CONTENT_H = BOTTOM - TOP;
const FULL_W = SIZE - PAD * 2;

type Placed = { content: string };

const PLACE: Record<PostLayout, (c: Colors, p: PostSlide) => Placed> = {
  // centrirano vertikalno — mirno, za jake izjave
  center: (c, p) => {
    const b = build(c, p, FULL_W);
    const y = TOP + Math.max(0, (CONTENT_H - b.h) / 2);
    return { content: `<g transform="translate(${PAD}, ${y + b.h * 0.02})">${b.svg}</g>` };
  },
  // lijevo, uz lijevu akcenat traku preko cijele visine
  split: (c, p) => {
    const b = build(c, p, FULL_W - 90);
    const y = TOP + Math.max(0, (CONTENT_H - b.h) / 2);
    return {
      content: `<rect x="${PAD - 40}" y="${TOP}" width="10" height="${CONTENT_H}" fill="${c.accent}"/>
        <g transform="translate(${PAD + 40}, ${y})">${b.svg}</g>`,
    };
  },
  // sadržaj u velikoj tamnoj ploči
  band: (c, p) => {
    const b = build(c, p, FULL_W - 110);
    const bh = Math.min(CONTENT_H, b.h + 150);
    const by = TOP + (CONTENT_H - bh) / 2;
    const y = by + (bh - b.h) / 2;
    return {
      content: `<rect x="${PAD - 55}" y="${by}" width="${FULL_W + 110}" height="${bh}" fill="${c.card}"
        stroke="${c.border}" stroke-width="2"/>
        <rect x="${PAD - 55}" y="${by}" width="${FULL_W + 110}" height="9" fill="${c.accent}"/>
        <g transform="translate(${PAD}, ${y})">${b.svg}</g>`,
    };
  },
  // gore poravnato + veliki akcenat blok dolje desno
  offset: (c, p) => {
    const b = build(c, p, FULL_W * 0.86);
    const y = TOP + 24;
    const s = 168;
    const sx = SIZE - PAD - s;
    const sy = BOTTOM - s;
    return {
      content: `<g transform="translate(${PAD}, ${y})">${b.svg}</g>
        <rect x="${sx}" y="${sy}" width="${s}" height="${s}" fill="${c.accent}"/>
        ${dfMark(sx + s / 2 - dfMarkWidth(s * 0.44) / 2, sy + s / 2 - s * 0.22, s * 0.44, c.accentInk, c.accent)}`,
    };
  },
  // veliki monogram kao vodeni žig — samo na tamnim paletama ima efekta
  stamp: (c, p) => {
    const b = build(c, p, FULL_W);
    const y = TOP + Math.max(0, (CONTENT_H - b.h) / 2);
    const sh = 520;
    const sw = dfMarkWidth(sh);
    return {
      content: `<g opacity="0.07">${dfMark(SIZE / 2 - sw / 2, TOP + CONTENT_H / 2 - sh / 2, sh, c.accent, c.bg)}</g>
        <g transform="translate(${PAD}, ${y})">${b.svg}</g>`,
    };
  },
};

// ── Render ────────────────────────────────────────────────────────────────
export function renderSlideSvg(
  post: AdPost,
  slide: PostSlide,
  slideIndex: number,
  slideTotal: number,
): string {
  const c = PALETTES[slide.palette ?? post.palette];
  const layout = post.layout ?? "center";
  const { content } = PLACE[layout](c, slide);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" role="img" aria-label="${esc(slide.title ?? post.title)}">
  <rect width="${SIZE}" height="${SIZE}" fill="${c.bg}"/>
  <rect x="0" y="0" width="${SIZE}" height="14" fill="${c.accent}"/>
  ${frame(c, slide.eyebrow ?? post.eyebrow, post.category, slideIndex, slideTotal)}
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

/** 1080×1080 PNG podaci iz SVG-a — za preuzimanje u punoj rezoluciji. */
export async function svgToPngBlob(svg: string): Promise<Blob | null> {
  try {
    const img = new Image();
    const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = () => rej(new Error("svg load"));
      img.src = url;
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
