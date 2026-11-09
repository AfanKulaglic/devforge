// ───────────────────────────────────────────────────────────────────────────
// RENDERER — pretvara AdPost u SVG string 1080×1080.
//
// Jedan dizajn sistem za svih 60 objava:
//   - mreza 8×8 u pozadini (suptilna, teal 4% alfa)
//   - gornji red: eyebrow + DevForge oznaka
//   - sadrzaj: sablon odredjuje raspored
//   - donji red: kategorija + broj objave
//
// Nema CSS-a, nema dependency-a — cist SVG string koji se moze prikazati
// direktno ili preuzeti kao .svg fajl.
// ───────────────────────────────────────────────────────────────────────────

import type { AdPost, PostPalette } from "./postsData";

const SIZE = 1080;
const PAD = 96; // margina sadrzaja
const FONT =
  "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

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

// ── XML escape — naslovi mogu sadrzati & < > " ────────────────────────────
function esc(t: string): string {
  return String(t)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── Automatsko prelamanje teksta bez mjerenja fonta ───────────────────────
// Gruba procjena: prosjecan karakter ≈ 0.52 × velicine fonta za bold sans.
function wrap(text: string, fontSize: number, maxWidth: number, maxLines: number): string[] {
  // Bold sans je siri od 0.52 — koristimo 0.60 da tekst sigurno stane.
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

// ── Zajednicki dijelovi ───────────────────────────────────────────────────
function gridPattern(c: Colors): string {
  const step = SIZE / 8;
  let out = "";
  for (let i = 1; i < 8; i++) {
    out += `<line x1="${i * step}" y1="0" x2="${i * step}" y2="${SIZE}" stroke="${c.grid}" stroke-width="1"/>`;
    out += `<line x1="0" y1="${i * step}" x2="${SIZE}" y2="${i * step}" stroke="${c.grid}" stroke-width="1"/>`;
  }
  return out;
}

function header(c: Colors, post: AdPost): string {
  return `
    <text x="${PAD}" y="${PAD + 8}" font-family="${FONT}" font-size="26" font-weight="800"
      letter-spacing="4.2" fill="${c.accent}">${esc(post.eyebrow.toUpperCase())}</text>
    <g transform="translate(${SIZE - PAD - 210}, ${PAD - 14})">
      <rect x="0" y="0" width="12" height="30" fill="${c.accent}"/>
      <text x="24" y="24" font-family="${FONT}" font-size="26" font-weight="900"
        letter-spacing="3.4" fill="${c.ink}">DEVFORGE</text>
    </g>`;
}

function footer(c: Colors, post: AdPost, index: number): string {
  const cat = post.category.toUpperCase();
  return `
    <line x1="${PAD}" y1="${SIZE - PAD - 34}" x2="${SIZE - PAD}" y2="${SIZE - PAD - 34}"
      stroke="${c.border}" stroke-width="1"/>
    <text x="${PAD}" y="${SIZE - PAD}" font-family="${FONT}" font-size="22" font-weight="700"
      letter-spacing="2.6" fill="${c.inkSoft}">${esc(cat)}</text>
    <text x="${SIZE - PAD}" y="${SIZE - PAD}" text-anchor="end" font-family="${FONT}"
      font-size="22" font-weight="700" letter-spacing="2.6" fill="${c.accent}">${String(
        index + 1,
      ).padStart(2, "0")} / 60</text>`;
}

// ── Sabloni ───────────────────────────────────────────────────────────────

// 1. Naslov — najveci tipografski udarac, za jake tvrdnje.
function tplTitle(c: Colors, p: AdPost): string {
  const size = 108;
  const lines = wrap(p.title, size, SIZE - PAD * 2, 4);
  const startY = 430 - (lines.length - 1) * 60;
  const body = lines
    .map(
      (l, i) =>
        `<text x="${PAD}" y="${startY + i * 118}" font-family="${FONT}" font-size="${size}"
          font-weight="900" letter-spacing="-2.5" fill="${c.ink}">${esc(l)}</text>`,
    )
    .join("");
  const sub = p.subtitle
    ? wrap(p.subtitle, 34, SIZE - PAD * 2, 2)
        .map(
          (l, i) =>
            `<text x="${PAD}" y="${startY + lines.length * 118 + 24 + i * 48}"
              font-family="${FONT}" font-size="34" font-weight="500" fill="${c.inkSoft}">${esc(l)}</text>`,
        )
        .join("")
    : "";
  return body + sub;
}

// 2. Cijena — veliki broj + sta je ukljuceno.
function tplPrice(c: Colors, p: AdPost): string {
  const val = p.value ?? "";
  // "150 KM" (6) stane na 200px, ali "Po dogovoru" (11) mora biti manji.
  const len = val.length;
  const size = len <= 5 ? 200 : len <= 7 ? 150 : len <= 9 ? 118 : 96;
  const tracking = size >= 150 ? -8 : -4;
  return `
    <text x="${PAD}" y="410" font-family="${FONT}" font-size="${size}" font-weight="900"
      letter-spacing="${tracking}" fill="${c.accent}">${esc(val)}</text>
    ${wrap(p.title, 62, SIZE - PAD * 2, 2)
      .map(
        (l, i) =>
          `<text x="${PAD}" y="${560 + i * 76}" font-family="${FONT}" font-size="62"
            font-weight="800" letter-spacing="-1" fill="${c.ink}">${esc(l)}</text>`,
      )
      .join("")}
    ${(p.items ?? [])
      .slice(0, 4)
      .map((it, i) => {
        const y = 720 + i * 52;
        return `<g>
          <rect x="${PAD}" y="${y - 16}" width="14" height="14" fill="${c.accent}"/>
          <text x="${PAD + 32}" y="${y}" font-family="${FONT}" font-size="30"
            font-weight="500" fill="${c.inkSoft}">${esc(it)}</text>
        </g>`;
      })
      .join("")}`;
}

// 3. Citat — izjava u velikom serifnom navodniku + tekst.
function tplQuote(c: Colors, p: AdPost): string {
  const lines = wrap(p.title, 66, SIZE - PAD * 2 - 40, 5);
  return `
    <text x="${PAD - 8}" y="330" font-family="Georgia, 'Times New Roman', serif"
      font-size="200" font-weight="700" fill="${c.accent}" opacity="0.30">&#8220;</text>
    ${lines
      .map(
        (l, i) =>
          `<text x="${PAD + 20}" y="${420 + i * 84}" font-family="${FONT}" font-size="66"
            font-weight="800" letter-spacing="-1.4" fill="${c.ink}">${esc(l)}</text>`,
      )
      .join("")}
    ${p.subtitle ? `<line x1="${PAD + 20}" y1="${420 + lines.length * 84 + 10}" x2="${PAD + 140}"
      y2="${420 + lines.length * 84 + 10}" stroke="${c.accent}" stroke-width="5"/>` : ""}
    ${p.subtitle
      ? wrap(p.subtitle, 32, SIZE - PAD * 2 - 40, 2)
          .map(
            (l, i) =>
              `<text x="${PAD + 20}" y="${420 + lines.length * 84 + 72 + i * 46}"
                font-family="${FONT}" font-size="32" font-weight="500" fill="${c.inkSoft}">${esc(l)}</text>`,
          )
          .join("")
      : ""}`;
}

// 4. Lista — stavke s teal kvadratom, do 6 redova.
function tplList(c: Colors, p: AdPost): string {
  const items = (p.items ?? []).slice(0, 6);
  const size = 60;
  const titleLines = wrap(p.title, size, SIZE - PAD * 2, 2);
  const titleY = 300;
  return `
    ${titleLines
      .map(
        (l, i) =>
          `<text x="${PAD}" y="${titleY + i * 72}" font-family="${FONT}" font-size="${size}"
            font-weight="900" letter-spacing="-1.6" fill="${c.ink}">${esc(l)}</text>`,
      )
      .join("")}
    ${items
      .map((it, i) => {
        const y = titleY + titleLines.length * 72 + 40 + i * 84;
        const lines = wrap(it, 34, SIZE - PAD * 2 - 70, 1);
        return `<g>
          <rect x="${PAD}" y="${y - 28}" width="26" height="26" fill="${c.accent}"/>
          <text x="${PAD + 52}" y="${y}" font-family="${FONT}" font-size="34"
            font-weight="600" fill="${i === 0 ? c.ink : c.inkSoft}">${esc(lines[0] ?? it)}</text>
          <line x1="${PAD}" y1="${y + 26}" x2="${SIZE - PAD}" y2="${y + 26}"
            stroke="${c.border}" stroke-width="1"/>
        </g>`;
      })
      .join("")}`;
}

// 5. Poredjenje — dvije kolone: prije (crveno-crno) i poslije (teal).
function tplCompare(c: Colors, p: AdPost): string {
  const items = p.items ?? [];
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);
  const colW = (SIZE - PAD * 2 - 32) / 2;
  const rowH = 66;
  const row = (label: string, y: number, color: string, mark: string) => `
    <g>
      <text x="${PAD + 20}" y="${y}" font-family="${FONT}" font-size="30" font-weight="600"
        fill="${color}">${mark}  ${esc(label)}</text>
    </g>`;
  return `
    ${wrap(p.title, 56, SIZE - PAD * 2, 2)
      .map(
        (l, i) =>
          `<text x="${PAD}" y="${280 + i * 68}" font-family="${FONT}" font-size="56"
            font-weight="900" letter-spacing="-1.4" fill="${c.ink}">${esc(l)}</text>`,
      )
      .join("")}
    <g>
      <rect x="${PAD}" y="410" width="${colW}" height="${30 + Math.max(left.length, right.length) * rowH + 24}"
        fill="${c.card}" stroke="${c.border}" stroke-width="1"/>
      <text x="${PAD + 20}" y="396" font-family="${FONT}" font-size="24" font-weight="800"
        letter-spacing="2.4" fill="${c.inkSoft}">PRIJE</text>
      ${left.map((it, i) => row(it, 462 + i * rowH, c.inkSoft, "&#10005;")).join("")}
    </g>
    <g>
      <rect x="${PAD + colW + 32}" y="410" width="${colW}" height="${30 + Math.max(left.length, right.length) * rowH + 24}"
        fill="${c.accent}" opacity="0.10"/>
      <text x="${PAD + colW + 52}" y="396" font-family="${FONT}" font-size="24" font-weight="800"
        letter-spacing="2.4" fill="${c.accent}">POSLIJE</text>
      ${right.map((it, i) => row(it, 462 + i * rowH, c.accent, "&#10003;")).join("")}
    </g>`;
}

// 6. Broj — jedna velika cifra u centru, s objasnjenjem.
function tplNumber(c: Colors, p: AdPost): string {
  const val = p.value ?? "0";
  // Velicina se skalira po duzini stringa da uvijek stane u 1080 - 2*96.
  // ("24/7" i "150 KM" su duzi od "8", pa im treba manji font.)
  const len = val.length;
  const size = len <= 2 ? 340 : len <= 4 ? 260 : len <= 6 ? 200 : 150;
  return `
    <text x="${SIZE / 2}" y="500" text-anchor="middle" font-family="${FONT}"
      font-size="${size}" font-weight="900" letter-spacing="${size > 200 ? -10 : -5}"
      fill="${c.accent}">${esc(val)}</text>
    ${wrap(p.title, 52, SIZE - PAD * 2, 2)
      .map(
        (l, i) =>
          `<text x="50%" y="${610 + i * 64}" text-anchor="middle" font-family="${FONT}"
            font-size="52" font-weight="800" letter-spacing="-1" fill="${c.ink}">${esc(l)}</text>`,
      )
      .join("")}
    ${p.valueNote
      ? `<text x="50%" y="${610 + 2 * 64 + 30}" text-anchor="middle" font-family="${FONT}"
          font-size="30" font-weight="500" fill="${c.inkSoft}">${esc(p.valueNote)}</text>`
      : ""}`;
}

// 7. Proces — numerisani koraci s vertikalnom linijom.
function tplProcess(c: Colors, p: AdPost): string {
  const items = (p.items ?? []).slice(0, 4);
  return `
    ${wrap(p.title, 60, SIZE - PAD * 2, 2)
      .map(
        (l, i) =>
          `<text x="${PAD}" y="${290 + i * 70}" font-family="${FONT}" font-size="60"
            font-weight="900" letter-spacing="-1.6" fill="${c.ink}">${esc(l)}</text>`,
      )
      .join("")}
    <line x1="${PAD + 30}" y1="410" x2="${PAD + 30}" y2="${410 + items.length * 118 - 40}"
      stroke="${c.border}" stroke-width="3"/>
    ${items
      .map((it, i) => {
        const y = 440 + i * 118;
        const lines = wrap(it, 32, SIZE - PAD * 2 - 110, 1);
        return `<g>
          <circle cx="${PAD + 30}" cy="${y - 12}" r="30" fill="${c.bg}" stroke="${c.accent}" stroke-width="3"/>
          <text x="${PAD + 30}" y="${y - 1}" text-anchor="middle" font-family="${FONT}"
            font-size="28" font-weight="900" fill="${c.accent}">${i + 1}</text>
          <text x="${PAD + 86}" y="${y - 2}" font-family="${FONT}" font-size="32"
            font-weight="700" fill="${c.ink}">${esc(lines[0] ?? it)}</text>
        </g>`;
      })
      .join("")}`;
}

// 8. CTA — poziv na akciju s teal blokom.
function tplCta(c: Colors, p: AdPost): string {
  return `
    ${wrap(p.title, 76, SIZE - PAD * 2, 3)
      .map(
        (l, i) =>
          `<text x="${PAD}" y="${360 + i * 92}" font-family="${FONT}" font-size="76"
            font-weight="900" letter-spacing="-2" fill="${c.ink}">${esc(l)}</text>`,
      )
      .join("")}
    ${p.subtitle
      ? wrap(p.subtitle, 32, SIZE - PAD * 2, 2)
          .map(
            (l, i) =>
              `<text x="${PAD}" y="${620 + i * 46}" font-family="${FONT}" font-size="32"
                font-weight="500" fill="${c.inkSoft}">${esc(l)}</text>`,
          )
          .join("")
      : ""}
    <rect x="${PAD}" y="730" width="${SIZE - PAD * 2}" height="104" fill="${c.accent}"/>
    <text x="${SIZE / 2}" y="796" text-anchor="middle" font-family="${FONT}" font-size="38"
      font-weight="900" letter-spacing="1.6" fill="#04120F">POSALJITE NAM DM</text>`;
}

const TEMPLATES: Record<AdPost["template"], (c: Colors, p: AdPost) => string> = {
  title: tplTitle,
  price: tplPrice,
  quote: tplQuote,
  list: tplList,
  compare: tplCompare,
  number: tplNumber,
  process: tplProcess,
  cta: tplCta,
};

// ── Glavni renderer ───────────────────────────────────────────────────────
export function renderPostSvg(post: AdPost, index: number): string {
  const c = PALETTES[post.palette];
  const body = TEMPLATES[post.template](c, post);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" role="img" aria-label="${esc(post.title)}">
  <rect width="${SIZE}" height="${SIZE}" fill="${c.bg}"/>
  ${gridPattern(c)}
  <rect x="0" y="0" width="${SIZE}" height="8" fill="${c.accent}"/>
  ${header(c, post)}
  ${body}
  ${footer(c, post, index)}
</svg>`;
}

/** Data-URI za <img src> — bez ijednog HTTP zahtjeva. */
export function postSvgDataUri(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
