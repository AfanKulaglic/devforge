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
  // X — za listu "prije / lose" u compare layoutu.
  x: "M6 6l12 12M18 6L6 18",
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
  // CRNA PODLOGA + BIJELI NASLOV + ZELENI AKCENT.
  //
  // Za p03 ("150 KM"): podloga crna, glavni naslov bijeli, a sve ostalo
  // (broj, slogan, domena) u BRAND teal. Tako oglas ima tri jasan sloja:
  // crna nosi mirnocu, bijelo nosi poruku, zeleno nosi brend.
  inkgreen: {
    bg: "#060606",
    ink: "#FFFFFF",
    soft: "#FFFFFF",
    accent: BRAND,
    accentInk: "#0A0A0A",
    card: "#111111",
    line: "rgba(255,255,255,0.16)",
    warm: BRAND,
  },
  // ZELENA PODLOGA + BIJELI TEKST.
  //
  // Paleta teal ima CRNI tekst na zelenoj — to je citljivo, ali djeluje kao
  // plakat, a ne kao oglas. Bijeli tekst na teal podlozi je meksi i skuplji
  // (kao Stripe/Linear reklame). Sekundarni tekst mora biti BIJEL
  // poluprovidan, ne tamnozelen — inace na zelenoj izgleda kao prljav.
  tealwhite: {
    bg: "#4DEAE0",
    ink: "#FFFFFF",
    soft: "rgba(255,255,255,0.82)",
    accent: "#FFFFFF",
    accentInk: "#4DEAE0",
    card: "#2FCFC3",
    line: "rgba(255,255,255,0.35)",
    warm: "#FFFFFF",
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
  // Koeficijent 0.58 je bio PREVISOK za naslove (bold 900) — stvarna sirina
  // slova u ovom fontu je ~0.451. Zbog greske je wrap mislio da u red stane
  // manje znakova, lomio naslov prerano, i onda je font morao biti manji da
  // sve stane u dozvoljen broj redova. Zato je naslov ostajao na 77% sirine.
  //
  // Za sitniji tekst (600 tezina) 0.58 je priblizno tacan, pa se koeficijent
  // bira po velicini fonta: krupni naslovi (>= 40px) koriste 0.46.
  // 0.46 je izmjereno na 3:4 formatu gdje naslov ide do 110px. U 1:1 naslov
  // je manji (88px) pa je i koeficijent drugaciji — 0.50 drzi red unutar
  // kolone bez prelaska (mjer eno: 0.46 je dao 921px u 918px koloni).
  const K = size >= 100 ? 0.46 : size >= 40 ? 0.50 : 0.58;
  const perLine = Math.max(6, Math.floor(maxWidth / (size * K)));
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

// DONJI LIJEVI UGAO — natpis na svakom postu.
//
// Prije je tu stajala kategorija ("PONUDA", "BREND") koja nista ne govori
// covjeku koji gleda sliku. Sada stoji DOMENA kao poziv: covjek odmah zna
// gdje da ode ako ga zanima, bez citanja captiona.
//
// Bez strelice — natpis samo stoji, mirno, bez ikakvih dodataka.
function domainLine(c: Colors, category: string): string {
  const SITE = "www.devlab.cc.cd";
  const fs0 = 24;
  const baseY = SIZE_H - M - 6;
  // Kategorija ("PONUDA", "BREND") se NE ispisuje — natpis ništa ne znači
  // onome ko gleda sliku. Donji lijevi ugao nosi samo domenu.
  void category;
  return `<text x="${M}" y="${baseY}" font-family="${FONT}" font-size="${fs0}"
    font-weight="800" letter-spacing="0.6" fill="${c.accent}">${esc(SITE)}</text>`;
}
function header(c: Colors, eyebrow: string, category: string, slide: number, total: number): string {
  // Na ZELENOJ podlozi wordmark se mora preokrenuti, inace se izgubi:
  // "Dev" bijel, "Lab" crn. Prije se to detektovalo po tome sto je 
  // crn — ali paleta  ima ZELENU podlogu i BIJELI ink, pa se
  // "Lab" ispisivao BRAND teal na teal podlozi i bio nevidljiv.
  // Zato se gleda sama PODLOGA, ne boja teksta.
  const onGreen = c.bg.toUpperCase() === "#4DEAE0" || c.bg.toUpperCase() === "#6FEFE6";
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
    ${domainLine(c, category)}
    ${dots}`;
}

// ── Forme ─────────────────────────────────────────────────────────────────
type Block = { svg: string; h: number };
/** Sadrzajna zona — racuna se iz trenutne visine formata. */
const CONTENT_TOP = () => 250;
const CONTENT_BOTTOM = () => SIZE_H - M - 84;
const CONTENT_H = () => CONTENT_BOTTOM() - CONTENT_TOP();
/** Horizontalna sirina sadrzaja — ista za sve formate. */
const W = SIZE - 2 * M;
/** Aktivna sirina sadrzaja — `photo` layout je privremeno smanjuje. */
let W_MUT = W;
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
  let size = fit(title, W_MUT, 100);
  let lines = wrap(title, size, W_MUT, 3);
  // Naslov ne smije pojesti svu visinu — lead i najave dolaze ispod.
  const budget = CONTENT_H() - (p.lead ? 420 : 300);
  while (lines.length * size * 1.08 > budget && size > 52) {
    size -= 6;
    lines = wrap(title, size, W_MUT, 3);
  }
  const lh = size * 1.08;

  // Isti raspored kao formHero — LIJEVO poravnato. Razlika je u pozadini i okviru
  // (vidi COVER_CHROME), ne u tipografiji.
  void total;
  // Bez "GALERIJA · N SLIKA" natpisa — gledalac to ne treba znati.
  let svg = "";
  let h = 0;

  // RIJECI U AKCENT BOJI UNUTAR NASLOVA.
  //
  // "DevLab" i "agenciju" treba da budu zelene, a ostatak bijeli. Ne moze
  // se cijeli naslov obojiti (izgubio bi se), pa se red dijeli na dijelove:
  // svaki `accentWords` match dobija svoj <tspan> u BRAND boji.
  //
  // Boja: `c.accent` (BRAND #4DEAE0). Na tamnoj paleti to je teal — tacno
  // boja koju koristimo svuda za zelenu.
  const accentWords: string[] = Array.isArray((p as any).accentWords)
    ? ((p as any).accentWords as string[])
    : [];
  const paintLine = (line: string): string => {
    if (!accentWords.length) return esc(line);
    // Napravi regex od svih akcent rijeci, bez obzira na velika/mala slova.
    const rx = new RegExp(
      "(" +
        accentWords
          .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
          .join("|") +
        ")",
      "gi",
    );
    let out = "";
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = rx.exec(line)) !== null) {
      out += esc(line.slice(last, m.index));
      out += `<tspan fill="${c.accent}">${esc(m[0])}</tspan>`;
      last = m.index + m[0].length;
    }
    out += esc(line.slice(last));
    return out;
  };

  lines.forEach((l, i) => {
    svg += `<text x="0" y="${h + size * 0.78 + i * lh}" font-family="${FONT}" font-size="${size}"
      font-weight="900" letter-spacing="-3.2" fill="${c.ink}">${paintLine(l)}</text>`;
  });
  h += (lines.length - 1) * lh + size;

  // kratka akcenat traka — isti jezik kao hero, samo deblja
  h += 44;
  svg += `<rect x="0" y="${h}" width="120" height="8" fill="${c.accent}"/>`;
  h += 8;

  // PODNASLOV / LEAD — recenica koja objasnjava naslov.
  //
  // Prije je cover imao samo naslov + jednu kratku liniju najava. To je za
  // karusel premalo: prvi slajd mora sam reci o cemu je i zasto da gledas
  // dalje. Zato lead dobija 2–3 reda, sa akcenat-trakom lijevo.
  const lead = p.lead ?? "";
  if (lead) {
    h += 46;
    const lfs = SIZE_H >= 1300 ? 32 : 30;
    // wrap() TIHO ODBACUJE rijeci preko maxLines. Lead ima 3 recenice, pa se
    // mora provjeriti da su SVE rijeci usle — inace recenica ostane napola.
    // Zato se font smanjuje dok cijeli lead ne stane.
    let lfsX = lfs;
    let ll = wrap(lead, lfsX, W_MUT - 30, 4);
    const leadWords = lead.trim().split(/s+/).length;
    while (lfsX > 20 && ll.join(" ").trim().split(/s+/).length < leadWords) {
      lfsX -= 2;
      ll = wrap(lead, lfsX, W_MUT - 30, 6);
    }
    svg += `<rect x="0" y="${h}" width="6" height="${ll.length * (lfsX + 16)}" fill="${c.accent}"/>`;
    ll.forEach((l: string, li: number) => {
      svg += `<text x="30" y="${h + lfsX * 0.86 + li * (lfsX + 16)}" font-family="${FONT}"
        font-size="${lfs}" font-weight="500" fill="${c.soft}">${esc(l)}</text>`;
    });
    h += (ll.length - 1) * (lfsX + 16) + lfsX;
  }

  // NAJAVE — najvise 3, sa IKONOM. Ikona se stavlja lijevo od teksta i
  // poravnava se sa prvim redom; svaka najava je svoj mali blok, ne
  // razbijena recenica sa tackama izmedju (to se nije dalo citati).
  // 4 stavke u 3:4 (ima visine), 3 u 1:1. Prije je bio fiksno 3, pa je na p06
  // coveru nedostajala cetvrta usluga iako naslov kaze "cetiri usluge".
  const parts: any[] = Array.isArray(p.items) ? p.items.slice(0, SIZE_H >= 1300 ? 4 : 3) : [];
  if (parts.length) {
    h += 48;
    const IC = SIZE_H >= 1300 ? 40 : 36;
    const pfs = SIZE_H >= 1300 ? 29 : 27;
    const rowH = SIZE_H >= 1300 ? 56 : 50;
    parts.forEach((it: any, pi: number) => {
      const isObj = typeof it === "object" && it !== null;
      const label = isObj ? (it.label ?? "") : String(it);
      const icon = isObj ? (it.icon ?? "") : "";
      const ry = h + pi * rowH;
      const baseline = ry + pfs * 0.82;
      if (icon && PX_ICONS[icon]) {
        svg += pxIcon(icon, 0, baseline - IC * 0.80, c.accent, IC);
      } else {
        svg += `<rect x="0" y="${(baseline - pfs * 0.3).toFixed(1)}" width="22" height="6" fill="${c.accent}"/>`;
      }
      // wrap sa maxLines=1 TIHO odbacuje ostatak — label mora stati cijeli.
      let tl2 = wrap(label, pfs, W_MUT - IC - 26, 1);
      let pfsX = pfs;
      while (pfsX > 18 && (tl2.join(" ").trim().split(/s+/).length < label.trim().split(/s+/).length)) {
        pfsX -= 1;
        tl2 = wrap(label, pfsX, W_MUT - IC - 26, 1);
      }
      svg += `<text x="${IC + 26}" y="${baseline}" font-family="${FONT}" font-size="${pfsX}"
        font-weight="700" letter-spacing="-0.5" fill="${c.ink}">${esc(tl2[0] ?? label)}</text>`;
    });
    h += (parts.length - 1) * rowH + pfs;
  } else if (p.subtitle) {
    h += 54;
    const fs2 = fit(p.subtitle, W_MUT, 36, 28);
    const jl = wrap(p.subtitle, fs2, W_MUT, 2);
    jl.forEach((l: string, li: number) => {
      svg += `<text x="0" y="${h + fs2 * 0.8 + li * (fs2 + 14)}" font-family="${FONT}"
        font-size="${fs2}" font-weight="600" fill="${c.soft}">${esc(l)}</text>`;
    });
    h += jl.length * (fs2 + 14);
  }

  return { svg, h };
}

function formHero(c: Colors, p: PostSlide): Block {
  const title = p.title ?? "";
  let size = fit(title, W_MUT, 116);
  // 4 reda u 3:4 formatu — ima visine za duze naslove (prije 3 reda su
  // odsjekla "sistem — sve na jednom mjestu" iz naslova).
  const MAXL = SIZE_H >= 1300 ? 4 : 3;
  // wrap() sa ogranicenim brojem redova TIHO odbaci rijeci koje ne stanu —
  // zato je "jednom mjestu" nestajalo iz naslova. Ov dje se trazi velicina
  // pri kojoj CIJELI naslov stane (provjera po broju rijeci), pa se onda
  // jos smanjuje dok blok ne udje u budzet.
  const allWords = title.split(/\s+/).filter(Boolean).length;
  const fitsWhole = (ls: string[]) => ls.join(" ").split(/\s+/).filter(Boolean).length === allWords;
  let lines = wrap(title, size, W_MUT, MAXL);
  while (size > 54 && (!fitsWhole(lines) || lines.length > MAXL)) {
    size -= 4;
    lines = wrap(title, size, W_MUT, MAXL);
  }
  const budget = p.subtitle ? CONTENT_H() - 230 : CONTENT_H() - 20;
  while (lines.length * size * 1.2 > budget && size > 54) {
    size -= 4;
    lines = wrap(title, size, W_MUT, MAXL);
  }
  const lh = size * 1.2;

  // DIO NASLOVA U AKCENT BOJI.
  //
  // p02 ima naslov sa crtom: "Stranica, shop, aplikacija, igrica ili AI
  // sistem — sve na jednom mjestu." Dio IZA crte je poruka, a dio prije je
  // samo nabrajanje. Zato taj dio ide u teal — oko prvo vidi "sve na jednom
  // mjestu", a lista usluga ostaje kao kontekst u bijelom.
  //
  // Racuna se po RIJECIMA, ne po znakovima: prati se koliko je rijeci vec
  // ispisano, i prva rijec koja pripada akcent dijelu oboji cijeli ostatak
  // reda i sve redove ispod.
  const ACCENT_FROM = "sve na jednom mjestu.";
  const titleFlat = title.replace(/\s+/g, " ").trim();
  const accIdx = titleFlat.indexOf(ACCENT_FROM);
  // Koliko rijeci dolazi PRIJE akcent dijela — to je granica.
  const wordsBefore = accIdx > 0 ? titleFlat.slice(0, accIdx).trim().split(/\s+/).filter(Boolean).length : -1;
  let wordCount = 0;

  // mala akcenat traka IZNAD naslova — vizuelni ulaz, unutar bloka
  let svg = `<rect x="0" y="${-34}" width="88" height="8" fill="${c.accent}"/>`;
  lines.forEach((l, i) => {
    const lineWords = l.split(/\s+/).filter(Boolean);
    // Da li ovaj red sadrzi prvu rijec akcent dijela? Ako da, dio reda od te
    // rijeci dalje je teal, a ostatak reda prije nje bijeli.
    let headPart = l;
    let tailPart = "";
    if (wordsBefore >= 0) {
      if (wordCount < wordsBefore && wordCount + lineWords.length > wordsBefore) {
        const cut = wordsBefore - wordCount;
        headPart = lineWords.slice(0, cut).join(" ");
        tailPart = lineWords.slice(cut).join(" ");
      } else if (wordCount >= wordsBefore) {
        headPart = "";
        tailPart = l;
      }
    }
    const by = size * 0.78 + i * lh;
    if (headPart) {
      svg += `<text x="0" y="${by}" font-family="${FONT}" font-size="${size}"
        font-weight="900" letter-spacing="-3.2" fill="${c.ink}">${esc(headPart)}</text>`;
    }
    if (tailPart) {
      // Akcent dio krece tamo gdje se bijeli dio zavrsava. Sirina se racuna
      // istim koeficijentom kao wrap(), da se rijec ne odvoji od ostatka reda.
      // Sirina bijelog dijela + razmak. Koeficijent 0.441 je IZMJEREN na
      // ovom fontu (0.46 je dao 74px razmak umjesto 28px).
      const hw = headPart ? headPart.length * size * 0.441 + size * 0.22 : 0;
      svg += `<text x="${hw.toFixed(1)}" y="${by}" font-family="${FONT}" font-size="${size}"
        font-weight="900" letter-spacing="-3.2" fill="${c.accent}">${esc(tailPart)}</text>`;
    }
    wordCount += lineWords.length;
  });
  let h = (lines.length - 1) * lh + size;

  if (p.subtitle) {
    const ss = fit(p.subtitle, W_MUT - 40, 38);
    const sl = wrap(p.subtitle, ss, W_MUT - 40, 3);
    h += 54;
    svg += `<rect x="0" y="${h}" width="5" height="${sl.length * (ss + 14)}" fill="${c.accent}"/>`;
    sl.forEach((l, i) => {
      svg += `<text x="30" y="${h + ss * 0.86 + i * (ss + 14)}" font-family="${FONT}" font-size="${ss}"
        font-weight="600" fill="${c.soft}">${esc(l)}</text>`;
    });
    h += sl.length * (ss + 14);
  }

  // KRATKE STAVKE SA IKONOM — ispod podnaslova.
  //
  // `formHero` je nosio samo naslov + podnaslov. Postovi koji su htjeli
  // listu (npr. p24 sa cetiri dokaza) nisu imali gdje da je predaju, pa su
  // ostajali na dvije recenice. Sada `items` ide u dva stupca, isto kao u
  // `formFigure`.
  const heroItems = (p.items ?? []) as any[];
  if (heroItems.length) {
    h += SIZE_H >= 1300 ? 60 : 50;
    const hIC = SIZE_H >= 1300 ? 40 : 36;
    const hfs = SIZE_H >= 1300 ? 28 : 26;
    const hRow = SIZE_H >= 1300 ? 62 : 56;
    const half = Math.ceil(heroItems.length / 2);
    const colW = W_MUT / 2;
    const nfs = SIZE_H >= 1300 ? 22 : 20;
    // Ima li ijedna stavka biljesku? Ako ima, red je visi i ikona se
    // centrira po CIJELOM bloku (label + biljeska), ne po labelu.
    const anyNote = heroItems.some((it: any) => typeof it === "object" && it && it.note);
    const rowStep = anyNote ? hRow + nfs + 10 : hRow;
    heroItems.forEach((it: any, i: number) => {
      const isObj = typeof it === "object" && it !== null;
      const label = isObj ? (it.label ?? "") : String(it);
      const icon = isObj ? (it.icon ?? "") : "";
      const note = isObj ? (it.note ?? "") : "";
      const col = i < half ? 0 : 1;
      const row = i < half ? i : i - half;
      const ix = col * colW;
      const iy = h + row * rowStep;
      const blockH = note ? hIC * 0.74 + 8 + nfs : hIC;
      const iyIcon = note ? iy + (blockH - hIC) / 2 : iy;
      if (icon && PX_ICONS[icon]) {
        svg += pxIcon(icon, ix, Math.max(iy, iyIcon), c.accent, hIC);
      } else {
        svg += `<rect x="${ix}" y="${iy + hIC * 0.4}" width="20" height="6" fill="${c.accent}"/>`;
      }
      svg += `<text x="${ix + hIC + 18}" y="${iy + hIC * 0.74}" font-family="${FONT}"
        font-size="${hfs}" font-weight="700" fill="${c.ink}">${esc(label)}</text>`;
      if (note) {
        const nl = wrap(note, nfs, colW - hIC - 30, 2);
        nl.forEach((l: string, li: number) => {
          svg += `<text x="${ix + hIC + 18}" y="${iy + hIC * 0.74 + 8 + nfs + li * (nfs + 6)}"
            font-family="${FONT}" font-size="${nfs}" font-weight="500" fill="${c.soft}">${esc(l)}</text>`;
        });
      }
    });
    h += (half - 1) * rowStep + (anyNote ? hIC * 0.74 + 8 + nfs : hIC);
  }
  return { svg, h };
}

/**
 * FIGURE — veliki broj + ŠTA ON ZNAČI. Naslov nikad nije sam broj;
 * uvijek je rečenica koja objašnjava posljedicu.
 */
function formFigure(c: Colors, p: PostSlide): Block {
  // FORMA "VELIKI BROJ".
  //
  // Prije: broj, naslov max 3 reda, biljeska max 2 reda, fiksni razmaci
  // (52 i 44). U 3:4 formatu to je ostavljalo prazan pojas jer je tekst
  // bio kratak i nije mogao popuniti visinu.
  //
  // Sada: razmaci se racunaju iz visine formata, a naslov i biljeska dobijaju
  // po jedan red vise. Tekst se NE rasteze — samo se ravnomjernije rasporedi.
  const tall = SIZE_H >= 1300;
  // BOJE ZA ZELENU PODLOGU.
  //
  // Korisnik zeli VISE CRNOG teksta, a manje bijelog. Na teal podlozi se
  // zato naslov i biljeska pisu CRNO, a broj ostaje BIJELI kao jedini
  // svijetli element — on nosi kontrast, ostalo je citljiv tekst.
  //
  // Na tamnoj paleti (dark/ink) ovo se ne primjenjuje: tamo crni tekst ne
  // bi bio vidljiv, pa naslov ostaje `c.ink` a biljeska `c.soft`.
  const onTeal = c.bg.toUpperCase() === "#4DEAE0" || c.bg.toUpperCase() === "#6FEFE6";
  // Na zelenoj podlozi tekst ide u CRNO (korisnik zeli vecinu crnog teksta).
  // Na crnoj podlozi naslov je BIJEL, a akcent (broj, linija) je ZELEN.
  // Naslov na zelenoj podlozi je BIJELI, biljeska i broj CRNI.
  const headInk = onTeal ? "#FFFFFF" : c.ink;
  const noteInk = onTeal ? "#0A0A0A" : c.soft;
  const val = p.value ?? "";
  const base = val.length <= 2 ? 260 : val.length <= 4 ? 210 : val.length <= 7 ? 150 : 112;
  const vsize = Math.max(70, Math.min(fit(val, W_MUT, base), tall ? 280 : 250));

  let svg = `<text x="0" y="${vsize * 0.78}" font-family="${FONT}" font-size="${vsize}"
    font-weight="900" letter-spacing="${(-vsize * 0.03).toFixed(1)}" fill="${onTeal ? "#0A0A0A" : c.accent}">${esc(val)}</text>`;
  let h = vsize;

  // Naslov: 3 reda u 1:1, 4 u 3:4. Prored 1.22 da se redovi ne slijube.
  const MAXT = tall ? 4 : 3;
  let ts = fit(p.title ?? "", W_MUT, tall ? 60 : 54);
  const titleText = p.title ?? "";
  const allW = titleText.split(/\s+/).filter(Boolean).length;
  const whole = (ls: string[]) => ls.join(" ").split(/\s+/).filter(Boolean).length === allW;
  let tl = wrap(titleText, ts, W_MUT, MAXT);
  while (ts > 34 && (!whole(tl) || tl.length > MAXT)) {
    ts -= 2;
    tl = wrap(titleText, ts, W_MUT, MAXT);
  }
  // Prored 1.34 — bb visine slova je ~1.33*font, pa 1.24 nije dovoljno.
  const tlh = ts * 1.34;

  // Razmak broj -> naslov.
  //
  // U 3:4 je bio 8px — to nije zrak, to je preklapanje. Veliki broj (150-260px)
  // ima donju ivicu na h, a naslov pocinje na h + ts*0.78, pa je 8px ostavljalo
  // bukvalno nula prostora. Sada 44 u 3:4, 52 u 1:1.
  h += tall ? 44 : 52;
  tl.forEach((l, i) => {
    svg += `<text x="0" y="${h + ts * 0.78 + i * tlh}" font-family="${FONT}"
      font-size="${ts}" font-weight="800" letter-spacing="-1.4" fill="${headInk}">${esc(l)}</text>`;
  });
  h += (tl.length - 1) * tlh + ts;

  // Biljeska ispod naslova: 2 reda u 1:1, 3 u 3:4. Tanke akcenat-linije
  // lijevo drze blok na okupu i odvajaju ga od fotografije.
  if (p.valueNote) {
    // BILJESKA NE SMIJE IZGUBITI RIJECI.
    //
    // `wrap()` prihvata `maxLines` i TIHO odbacuje sve preko toga. Prije je
    // MAXN bio 3 (3:4) / 2 (1:1), a font se smanjivao samo do 26px — dugacka
    // biljeska na p04 se zato odsjekla na pola recenice ("Tek kad je vidite
    // gotovu" i nista dalje).
    //
    // Sada: 6 redova u 3:4 / 5 u 1:1, font klizi do 20px, i provjera ide na
    // BROJ RIJECI (ne samo `whole`) — jer `whole` gleda da li su sve rijeci iz
    // PRVOG reda prisutne, ne iz cijelog teksta.
    const noteFS = tall ? 33 : 30;
    const MAXN = tall ? 6 : 5;
    const allNoteWords = p.valueNote.trim().split(/\s+/).length;
    let nfs = noteFS;
    let nl = wrap(p.valueNote, nfs, W_MUT - 30, MAXN);
    while (
      nfs > 20 &&
      nl.join(" ").trim().split(/\s+/).length < allNoteWords
    ) {
      nfs -= 2;
      nl = wrap(p.valueNote, nfs, W_MUT - 30, MAXN);
    }
    h += tall ? 48 : 44;
    svg += `<rect x="0" y="${h - 6}" width="5" height="${nl.length * (nfs + 20)}" fill="${onTeal ? "#0A0A0A" : c.accent}"/>`;
    nl.forEach((l: string, i: number) => {
      svg += `<text x="30" y="${h + nfs * 0.86 + i * (nfs + 20)}" font-family="${FONT}"
        font-size="${nfs}" font-weight="500" fill="${noteInk}">${esc(l)}</text>`;
    });
    h += (nl.length - 1) * (nfs + 20) + nfs;
  }

  // STA JE U CIJENI — kratka lista sa ikonama ispod biljeske.
  //
  // Cjenovni slajd je prije imao samo broj, naslov i jednu recenicu. Kupac
  // je morao vjerovati na rijec da je sve ukljuceno. Sada se vidi stavka po
  // stavka: ikona + kratak label, u dva stupca da ne pojede visinu.
  const incl = (p.items ?? []) as any[];
  if (incl.length) {
    h += tall ? 56 : 46;
    const IC = tall ? 32 : 29;
    const ifs = tall ? 26 : 24;
    const rowH = tall ? 56 : 50;
    const half = Math.ceil(incl.length / 2);
    const colW = W_MUT / 2;
    incl.forEach((it: any, i: number) => {
      const isObj = typeof it === "object" && it !== null;
      const label = isObj ? (it.label ?? "") : String(it);
      const icon = isObj ? (it.icon ?? "") : "";
      const col = i < half ? 0 : 1;
      const row = i < half ? i : i - half;
      const ix = col * colW;
      const iy = h + row * rowH;
      if (icon && PX_ICONS[icon]) {
        svg += pxIcon(icon, ix, iy, onTeal ? "#0A0A0A" : c.accent, IC);
      } else {
        svg += `<rect x="${ix}" y="${iy + IC * 0.4}" width="18" height="6" fill="${onTeal ? "#0A0A0A" : c.accent}"/>`;
      }
      svg += `<text x="${ix + IC + 16}" y="${iy + IC * 0.74}" font-family="${FONT}"
        font-size="${ifs}" font-weight="700" fill="${headInk}">${esc(label)}</text>`;
    });
    h += (half - 1) * rowH + IC;
  }

  return { svg, h };
}

function formBlocks(c: Colors, p: PostSlide): Block {
  // 5 stavki u 3:4 formatu — ima visine, a pet usluga je kompletna ponuda.
  const items = (p.items ?? []).slice(0, SIZE_H >= 1300 ? 4 : 3);
  const ts = fit(p.title ?? "", W_MUT, 60);
  const tl = wrap(p.title ?? "", ts, W_MUT, 2);

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

  // PODNASLOV — recenica koja objasnjava o cemu je lista.
  //
  // Bez njega lista od cetiri stavke je samo popis: covjek vidi "web, igrice,
  // aplikacije, AI" i ne zna zasto bi to bilo bolje od bilo koga drugog.
  // Podnaslov nosi poentu ("ne radimo sve, radimo cetiri stvari do kraja").
  if (p.subtitle) {
    const sfs = SIZE_H >= 1300 ? 29 : 27;
    // wrap() odbacuje rijeci preko maxLines — provjeri da su SVE usle.
    const sWords = p.subtitle.trim().split(/\s+/).length;
    let sfsX = sfs;
    let sl = wrap(p.subtitle, sfsX, W_MUT - 30, 3);
    while (sfsX > 20 && sl.join(" ").trim().split(/\s+/).length < sWords) {
      sfsX -= 2;
      sl = wrap(p.subtitle, sfsX, W_MUT - 30, 5);
    }
    y += 34;
    sl.forEach((l: string, li: number) => {
      svg += `<text x="0" y="${y + sfsX * 0.82 + li * (sfsX + 12)}" font-family="${FONT}"
        font-size="${sfsX}" font-weight="500" fill="${c.soft}">${esc(l)}</text>`;
    });
    y += (sl.length - 1) * (sfsX + 12) + sfsX;
  }

  const n = items.length || 1;
  // Visina reda se racuna iz STVARNO raspolozivog prostora. `avail` je ogranicen
  // na preostali dio sadrzajne zone; buildFitting() će ga dodatno skalirati ako
  // layout (npr. photoTop) ima manju zonu od pune CONTENT_H().
  const avail = Math.max(0, CONTENT_H() - y - 10);
  // Redovi smiju narasti do 150px — u 3:4 formatu ima 1010px zone, a prije su
  // bili zakljucani na 104px pa je lista zauzimala 416px i ostajalo je 273px
  // praznog iznad naslova (blok je bio centriran u praznini).
  // Minimalna visina reda mora pokriti NAJVECI sadrzaj stavke: ikona + label
  // + biljeska. Prije je minimum bio 64px i `avail / n` je mogao spustiti red
  // toliko da se labeli i biljeske preklope (p05 sa subtitleom).
  // Biljeska sad smije imati 3 reda, pa je red visi: 156 -> 186 (3:4).
  const minRow = SIZE_H >= 1300 ? 186 : 158;
  const rowH = Math.max(minRow, Math.min(SIZE_H >= 1300 ? 240 : 180, avail / n));
  const fs = SIZE_H >= 1300 ? (n >= 4 ? 38 : 44) : n >= 4 ? 34 : 38;

  // Preostala visina za liste: ako je raspoloziv prostor manji od punog CONTENT_H()
  // (photoTop/photoBot), redovi se pakuju u ono sto stvarno ima.
  y += Math.max(18, Math.min(28, (avail - rowH * n) * 0.28));
  // IKONE U LISTI.
  //
  // Stavka moze biti string ("UI/UX dizajn") ili objekat
  // ({ icon, label, note }) kad zelimo ikonu i objasnjenje. Bez ikona lista
  // izgleda kao obican tekst; ikona lijevo od stavke je ono sto oko prvo
  // uhvati i po cemu se stavke razlikuju medjusobno.
  //
  // Raspored: [ikona 44px] [label bold] / [note sivo ispod, u istom redu].
  // Note NE ide u novi red sa ikonom — ostaje uvučen pod label, da se lista
  // cita kao jedna cjelina, a ne kao dva stupca.
  const hasIcons = items.some((it: any) => typeof it === "object" && it !== null);
  // IKONE MORAJU BITI VELIKE.
  //
  // Prije su bile 44px (3:4) / 38px (1:1) — u listi od cetiri stavke djelovale
  // su kao ukras, a ne kao orijentir. Sada su 62/54, a stupac se siri na 88/78
  // da label ne bi poceo preblizu ikone.
  const iconCol = hasIcons ? (SIZE_H >= 1300 ? 108 : 96) : 0;
  const IC = SIZE_H >= 1300 ? 80 : 70;

  items.forEach((it: any, i: number) => {
    const ry = y + i * rowH;
    const isObj = typeof it === "object" && it !== null;
    const label = isObj ? (it.label ?? "") : String(it);
    const note = isObj ? (it.note ?? "") : "";
    const icon = isObj ? (it.icon ?? "") : "";
    const avail = W_MUT - 58 - iconCol;
    const lines = wrap(label, fs, avail, 2);
    // BILJESKA NE SMIJE IZGUBITI RIJECI.
    //
    // `wrap()` sa maxLines TIHO odbacuje ostatak. Prije je limit bio 2 reda,
    // pa su se biljeske na p05 odsijecale ("Od predstavljanja do prodaje.
    // Gotovo za 5" — bez "radnih dana"). Sada se font smanjuje dok SVE rijeci
    // ne stanu, a limit je 3 reda.
    let nfs = SIZE_H >= 1300 ? 25 : 23;
    const noteWords = note ? note.trim().split(/\s+/).length : 0;
    let nlines = note ? wrap(note, nfs, avail, 3) : [];
    while (nfs > 18 && note && nlines.join(" ").trim().split(/\s+/).length < noteWords) {
      nfs -= 1;
      nlines = wrap(note, nfs, avail, 4);
    }
    // ukupna visina bloka = label + (razmak + note)
    const blockH =
      (lines.length - 1) * (fs + 8) +
      fs +
      (nlines.length ? 12 + (nlines.length - 1) * (nfs + 6) + nfs : 0);
    const top = ry + (rowH - blockH) / 2;
    const baseline = top + fs * 0.78;

    if (icon && PX_ICONS[icon]) {
      // IKONA SE CENTRIRA PO CIJELOM BLOKU (label + biljeska), ne po labelu.
      //
      // Prije je bila vezana za baseline labela — kad stavka ima biljesku,
      // label je gore, pa je ikona vizuelno bjezala prema gore i nije bila
      // u ravni sa tekstom desno. Sada se racuna sredina bloka (top + blockH/2)
      // i ikona se centrira na nju.
      const iconMid = top + blockH / 2;
      svg += pxIcon(icon, 0, iconMid - IC / 2, c.accent, IC);
    } else {
      // crtica: debela, vizuelno teza od teksta → centrirana na mala slova
      svg += `<rect x="0" y="${(baseline - fs * 0.30).toFixed(1)}" width="30" height="8"
        rx="0" fill="${c.accent}"/>`;
    }

    lines.forEach((l: string, li: number) => {
      svg += `<text x="${58 + iconCol}" y="${(baseline + li * (fs + 8)).toFixed(1)}" font-family="${FONT}"
        font-size="${fs}" font-weight="700" letter-spacing="-0.6" fill="${c.ink}">${esc(l)}</text>`;
    });

    // BILJESKA POCINJE ISPOD CIJELOG LABELA, ne ispod prvog reda.
    //
    // Prije: y = baseline + fs * 0.30 + 12. Kad label ima DVA reda, drugi red
    // je na baseline + (fs + 8), a biljeska na baseline + fs * 0.30 + 12 —
    // dakle IZNAD drugog reda. Zato su se redovi preklapali na p05.
    //
    // Sada se racuna stvarna donja ivica zadnjeg reda labela i biljeska ide
    // 14px ispod toga.
    const lastLabelBottom = baseline + (lines.length - 1) * (fs + 8);
    const noteTop = lastLabelBottom + 14;
    nlines.forEach((l: string, li: number) => {
      svg += `<text x="${58 + iconCol}" y="${(noteTop + nfs * 0.82 + li * (nfs + 6)).toFixed(1)}"
        font-family="${FONT}" font-size="${nfs}" font-weight="500" fill="${c.soft}">${esc(l)}</text>`;
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

  const ts = fit(p.title ?? "", W_MUT, 54);
  const tl = wrap(p.title ?? "", ts, W_MUT, 2);
  let svg = tl
    .map(
      (l, i) =>
        `<text x="0" y="${ts * 0.78 + i * ts * 1.08}" font-family="${FONT}" font-size="${ts}"
          font-weight="900" letter-spacing="-2" fill="${c.ink}">${esc(l)}</text>`,
    )
    .join("");
  const top = (tl.length - 1) * ts * 1.08 + ts * 0.78 + 46;

  // DVIJE STRANE, DVIJE PRICE.
  //
  // Lijevo = agencija: tamna ploha, siv tekst, X ikona. Desno = DevLab:
  // puna akcent (zelena) ploha, crn tekst, kvačica. Kontrast plohe je ono
  // sto oko prvo uhvati — prije su obje bile slicne pa se nije vidjelo koja
  // je koja dok se ne procita tekst.
  const gap = 16;
  const bw = (W - gap) / 2;
  const rows = Math.max(left.length, right.length);
  const rowH = SIZE_H >= 1300 ? 82 : 70;
  const headerH = 74;
  const bh = headerH + rows * rowH + 14;

  // ── LIJEVO: AGENCIJA ────────────────────────────────────────────────────
  svg += `<rect x="0" y="${top}" width="${bw}" height="${bh}" fill="${c.card}" stroke="${c.line}" stroke-width="1.5"/>`;
  // Ikona "x" u zaglavlju — odmah se vidi da je ovo losa strana.
  svg += pxIcon("x", 22, top + 30, c.soft, 22);
  svg += `<text x="58" y="${top + 48}" font-family="${FONT}" font-size="26" font-weight="900"
    letter-spacing="2.2" fill="${c.soft}">AGENCIJA</text>`;
  // tanka linija ispod zaglavlja — razdvaja header od stavki
  svg += `<rect x="16" y="${top + headerH - 10}" width="${bw - 32}" height="1" fill="${c.line}"/>`;

  // ── DESNO: DEVLAB ───────────────────────────────────────────────────────
  svg += `<rect x="${bw + gap}" y="${top}" width="${bw}" height="${bh}" fill="${c.accent}"/>`;
  svg += pxIcon("check", bw + gap + 22, top + 30, c.accentInk, 22);
  svg += `<text x="${bw + gap + 58}" y="${top + 48}" font-family="${FONT}" font-size="26"
    font-weight="900" letter-spacing="2.2" fill="${c.accentInk}">DEVLAB</text>`;
  svg += `<rect x="${bw + gap + 16}" y="${top + headerH - 10}" width="${bw - 32}" height="1" fill="${c.accentInk}" opacity="0.35"/>`;

  const drawRow = (item: any, x: number, y: number, colW: number, ok: boolean) => {
    const isObj = typeof item === "object" && item !== null;
    const label = isObj ? (item.label ?? "") : String(item);
    const note = isObj ? (item.note ?? "") : "";
    const ink = ok ? c.accentInk : c.ink;
    const sub = ok ? c.accentInk : c.soft;
    const lfs = SIZE_H >= 1300 ? 27 : 25;
    const nfs = SIZE_H >= 1300 ? 21 : 20;
    // Znak X / kvacica je ikona, ne slovo — poravnata sa labelom.
    const mark = ok ? "check" : "x";
    if (PX_ICONS[mark]) {
      svg += pxIcon(mark, x + 22, y - lfs * 0.78, ok ? ink : sub, ok ? 26 : 22);
    }
    const textX = x + 60;
    const tw = colW - 78;
    svg += `<text x="${textX}" y="${y}" font-family="${FONT}" font-size="${lfs}" font-weight="${ok ? 700 : 600}"
      fill="${ink}">${esc(wrap(label, lfs, tw, 1)[0] ?? label)}</text>`;
    if (note) {
      // NOTE ide ISPOD labela, manjim slovima — objasnjava ZASTO je bolje.
      // Bez note-a "50% predujma" i "0 KM predujma" su samo dvije brojke.
      const nl = wrap(note, nfs, tw, 1);
      svg += `<text x="${textX}" y="${y + nfs + 12}" font-family="${FONT}" font-size="${nfs}"
        font-weight="500" fill="${sub}" opacity="0.85">${esc(nl[0] ?? note)}</text>`;
    }
  };

  left.forEach((it: any, ri: number) => {
    drawRow(it, 0, top + headerH + 34 + ri * rowH, bw, false);
  });

  // DESNO: ploha i header su vec nacrtani gore.
  right.forEach((it: any, ri: number) => {
    drawRow(it, bw + gap, top + headerH + 34 + ri * rowH, bw, true);
  });

  return { svg, h: top + bh };
}

/** ACTION — poziv. Naslov govori šta se dešava, dugme šta kliknuti. */
function formAction(c: Colors, p: PostSlide): Block {
  let ts = fit(p.title ?? "", W_MUT, 82);
  let tl = wrap(p.title ?? "", ts, W_MUT, 3);
  while (tl.length * ts * 1.08 > CONTENT_H() - 230 && ts > 46) {
    ts -= 6;
    tl = wrap(p.title ?? "", ts, W_MUT, 3);
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

  // LEAD — recenica koja objasnjava sta se desava kad se jave.
  //
  // CTA slajd je zadnji u karuselu i mora sam zatvoriti pricu: sta dobijem,
  // koliko kosta, sta se desi kad kliknem. Prije je imao samo naslov i dugme,
  // pa je djelovao prazno.
  if (p.lead) {
    const lfs = SIZE_H >= 1300 ? 32 : 30;
    const lWords = p.lead.trim().split(/\s+/).length;
    let lfsX = lfs;
    let ll = wrap(p.lead, lfsX, W_MUT - 30, 4);
    while (lfsX > 20 && ll.join(" ").trim().split(/\s+/).length < lWords) {
      lfsX -= 2;
      ll = wrap(p.lead, lfsX, W_MUT - 30, 6);
    }
    h += 46;
    svg += `<rect x="0" y="${h - 6}" width="6" height="${ll.length * (lfsX + 16)}" fill="${c.accent}"/>`;
    ll.forEach((l: string, li: number) => {
      svg += `<text x="30" y="${h + lfsX * 0.86 + li * (lfsX + 16)}" font-family="${FONT}"
        font-size="${lfsX}" font-weight="500" fill="${c.soft}">${esc(l)}</text>`;
    });
    h += (ll.length - 1) * (lfsX + 16) + lfsX;
  } else if (p.subtitle) {
    h += 46;
    wrap(p.subtitle, 32, W_MUT, 2).forEach((l, i) => {
      svg += `<text x="0" y="${h + 10 + i * 42}" font-family="${FONT}" font-size="32"
        font-weight="600" fill="${c.soft}">${esc(l)}</text>`;
      h += 42;
    });
  }

  // TRI KRATKA DOKAZA SA IKONOM — iznad dugmeta, ne ispod.
  //
  // Dugme je zadnja stvar koju oko vidi; dokazi moraju biti PRIJE njega da
  // bi ih covjek procitao. Ikona + kratka rijec, u jednom redu, bez kartica.
  const feats = (p.items ?? []) as any[];
  if (feats.length) {
    h += 54;
    const IC = SIZE_H >= 1300 ? 38 : 34;
    const ffs = SIZE_H >= 1300 ? 27 : 25;
    const rowH = SIZE_H >= 1300 ? 62 : 56;
    feats.slice(0, 3).forEach((it: any, fi: number) => {
      const isObj = typeof it === "object" && it !== null;
      const label = isObj ? (it.label ?? "") : String(it);
      const icon = isObj ? (it.icon ?? "") : "";
      const ry = h + fi * rowH;
      if (icon && PX_ICONS[icon]) {
        svg += pxIcon(icon, 0, ry, c.accent, IC);
      } else {
        svg += `<rect x="0" y="${ry + IC * 0.4}" width="22" height="7" fill="${c.accent}"/>`;
      }
      svg += `<text x="${IC + 22}" y="${ry + IC * 0.72}" font-family="${FONT}" font-size="${ffs}"
        font-weight="700" fill="${c.ink}">${esc(label)}</text>`;
    });
    h += (feats.slice(0, 3).length - 1) * rowH + IC;
  }

  const bh = 116;
  h += 44;
  svg += `<rect x="0" y="${h}" width="${W_MUT}" height="${bh}" fill="${c.accent}"/>`;
  svg += `<text x="${W_MUT / 2}" y="${h + bh / 2 + 15}" text-anchor="middle" font-family="${FONT}"
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

// TEXT ZONA ZA LAYOUT SA SLIKOM DESNO.
//
// `W_MUT` je konstanta (944) i sve forme racunaju sirinu iz nje. Za `photo`
// layout tekst mora stati u uzu zonu (bez desne trecine gdje je slika),
// ali ne zelimo da svaka forma dobije novi parametar sirine.
//
// Zato: `W_MUT` se privremeno smanji, forma se izgradi, pa se vrati. Forme
// citaju `W` pri izgradnji, pa ovo radi bez ijedne izmjene u njima.
// `try/finally` garantuje vracanje i ako forma baci gresku.
function buildNarrow(c: Colors, p: PostSlide, total: number, width: number): Block {
  const prev = W_MUT;
  W_MUT = width;
  try {
    return build(c, p, total);
  } finally {
    W_MUT = prev;
  }
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
  //
  // ISTA onGreen DETEKCIJA KAO U header().
  //
  // Prije je ovdje bio `c.accent` za boju "Lab". U paleti `light`
  // (bg #6FEFE6, accent #0A0A0A) to znaci da "Lab" postaje CRN na tirkiznoj
  // podlozi — a "Dev" ostaje crn takodjer — pa se cijeli wordmark stapa s
  // podlogom. Na zelenoj podlozi "Lab" mora biti CRN a "Dev" BIJEL, isto kao
  // u header-u, da logo bude citljiv.
  const richOnGreen = c.bg.toUpperCase() === "#4DEAE0" || c.bg.toUpperCase() === "#6FEFE6";
  svg += brandMark(left, M_L - 12, richOnGreen ? "#FFFFFF" : c.ink, richOnGreen ? "#0A0A0A" : c.accent).svg;

  // Razmak logo → naslov. Prije 92px: u 3:4 formatu naslov je sjedio
  // zalijepljen uz logo i ostajao prazan pojas ispod. Sada se razmak
  // skalira s formatom — u 1:1 ostaje 92 (nema mjesta za vise).
  const LOGO_GAP = SIZE_H >= 1300 ? 150 : 92;
  let y = M_L + LOGO_GAP;

  // VISAK PROSTORA: u 3:4 formatu ispod sadrzaja ostane ~290px. Da oglas ne
  // stoji zbijen gore, visak se dijeli na razmake izmedju sekcija (G).
  // U 1:1 formatu G je 0 — tamo mjesta nema i sve mora biti kompaktno.
  // RASPORED PO VISINI FORMATU.
  //
  // Prije je svaki razmak bio fiksan (`+ 56`, `+ 50`) pa je u 3:4 formatu
  // izmedju dokaza i dugmadi ostajalo 290px praznog. Sada se svi razmaci
  // racunaju iz STVARNE visine sadrzaja i preostalog prostora — sav visak
  // se dijeli ravnomjerno na 3 spoja (naslov→lead, lead→usluge, usluge→dokazi).

  // 1) Bez linije pod logom — ispod logotipa ne stoji nista.
  // Kicker se preskace namjerno: svaki dodatni red tu trosi prostor koji naslovu
  // treba, a nijedna varijanta nije dodala vrijednost (ili je ponavljala lead
  // ili je bila statistika koja ne prodaje).
  void p.kicker;

  // 2) NASLOV — najveći element. Veličina se traži, ne pogađa: ide od 84px
  // naniže dok CIJELI naslov ne stane u 3 reda (bez tihe odsječe riječi).
  const title = p.title ?? "";
  // U 3:4 formatu kolona se siri (manji uvlak od linije) — naslov dobija ~10px
  // vise sirine, dovoljno da font naraste za nekoliko stepeni.
  const TITLE_INDENT = 7 + (SIZE_H >= 1300 ? 18 : 26);
  const wTitle = wCol - TITLE_INDENT;
  // Zadnja rečenica naslova ide u akcent-boji. Da bi to izgledalo namjerno,
  // zadnji red mora POCETI tom rečenicom — inace se "Bez" odvoji u prethodni
  // red i oboji samo "predujma.", sto djeluje slucajno.
  const accentPhrase = "Bez plaćanja unaprijed.";
  const titleParts = title.split(accentPhrase);
  const hasAccent = titleParts.length === 2;

  // Naslov se ne smije skupljati u uglu. Krece od najveceg moguceg i
  // spusta se SAMO dok ne stane — prije je start bio 88px i samo padao, pa je
  // u 3:4 formatu ostajalo 226px praznog desno od naslova.
  //
  // MAX_TS se racuna iz visine formata: u 3:4 ima vise prostora pa naslov
  // smije biti krupniji (oko 118px), u 1:1 ostaje na ~88px jer nema mjesta.
  // 4 reda x ~1.04 line-height; 3:4 ima vise visine pa naslov smije krupnije.
  const titleBoxH = SIZE_H >= 1300 ? 490 : 292;
  let ts = 132;
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
    // U 3:4 formatu akcenat smije u 2 reda — inace bi zadnji red morao stati u
    // 911px kolonu, pa je cijeli naslov bio zakljucan na 88px i ostajalo je
    // 226px praznog desno. U 1:1 ostaje 1 red (nema mjesta za vise).
    accLines = wrap(accentPhrase, size, wTitle, SIZE_H >= 1300 ? 2 : 1);
    return { all: [...head, ...accLines], head: head.join(" "), acc: accLines };
  };
  let built = build(ts);
  tl = built.all;
  const fitsAll = (ls: string[]) => ls.join(" ") === title.split(/\s+/).filter(Boolean).join(" ");
  // Maksimum 3 reda, blok ne smije preci titleBoxH, i nijedan red ne smije
  // biti siri od kolone (wrap to vec garantuje, ali provjera je jeftina).
  // U 3:4 dozvoljena su 4 reda (tijelo 2 + akcenat 2) — visina je tu jedini limit.
  const MAX_LINES = SIZE_H >= 1300 ? 4 : 3;
  // Trazi NAJVECI font koji stane. Problem sa obicnom petljom: kako font pada,
  // redovi se prelamaju drugacije, pa se desi da 100px stane u 4 reda a 106px
  // u 3 — petlja bi stala na prvom koji prodje, ne na najvecem. Zato se
  // pamti najbolji rezultat do sada, a petlja ide do kraja.
  let bestTs = 0;
  let bestTl: string[] = [];
  let bestBuilt: { all: string[]; head: string; acc: string[] } | null = null;
  for (let t = 132; t >= 48; t -= 2) {
    const b2 = build(t);
    if (!fitsAll(b2.all)) continue;
    if (b2.all.length > MAX_LINES) continue;
    if (b2.all.length * t * 1.04 > titleBoxH) continue;
    bestTs = t;
    bestTl = b2.all;
    bestBuilt = b2;
    break;
  }
  if (bestBuilt) { ts = bestTs; tl = bestTl; built = bestBuilt; }
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

  // ── PRORACUN RAZMAKA ─────────────────────────────────────────────────
  //
  // Sve sekcije imaju poznatu visinu PRIJE crtanja (naslov se vec izmjerio,
  // broj usluga i dokaza je poznat). Zato se visak prostora moze tacno
  // podijeliti umjesto da se pogadja fiksnim brojem.
  const BTN_H_PRE = 84;
  const RESERVE_BOTTOM_PRE = 92;
  const contentTopY = M_L + LOGO_GAP;
  // Visina naslova (vec izracunata gore)
  const titleBlockHPx = (tl.length - 1) * tlh + ts * 0.8;
  // Lead
  const LEAD_FS_PRE = 29;
  const LEAD_LH_PRE = 40;
  const leadLinesPre = p.lead ? wrap(p.lead, LEAD_FS_PRE, wCol - TITLE_INDENT, 2) : [];
  const leadHPre = leadLinesPre.length ? (leadLinesPre.length - 1) * LEAD_LH_PRE + LEAD_FS_PRE * 0.5 : 0;
  // Usluge (chip visina)
  const IC_PRE = 98;
  const chipHPre = Math.round(IC_PRE * 1.44) + 34;
  const featsHPre = features.length ? chipHPre : 0;
  // Dokazi
  const termsHPre = terms.length ? (terms.length - 1) * 42 + 27 : 0;
  // Koliko prostora treba za sadrzaj + minimalni razmaci (3 x 40)
  const MIN_GAP = 40;
  const usedH = titleBlockHPx + leadHPre + featsHPre + termsHPre + MIN_GAP * 4;
  // Dostupno: od vrha sadrzaja do dna dugmadi
  const availH = (SIZE_H - RESERVE_BOTTOM_PRE - BTN_H_PRE) - (contentTopY + 26);
  // Visak se dijeli na 3 spoja; naslov→lead dobija malo manje (opticki je
  // najblizi), usluge→dokazi jednako.
  // Visak se dijeli na 4 spoja: naslov→lead, lead→usluge, usluge→dokazi,
  // dokazi→dugmad. Prije su bila 3 spoja, pa je zadnji (dokazi→dugmad)
  // ostajao zakucan na `y + 46` — sve nepravilno: 196 / 167 / 39 px.
  const surplus = Math.max(0, availH - usedH);
  const extra = surplus / 4;
  const LEAD_GAP = MIN_GAP + extra * 0.9 + (SIZE_H >= 1300 ? 40 : 0); // naslov je krupniji pa treba vise zraka ispod
  const FEAT_GAP = MIN_GAP + extra * 0.8;
  const TERM_GAP = MIN_GAP + extra * 0.95;
  const BTN_GAP_Y = MIN_GAP + extra * 1.15;
  const TERM_ROW = 42 + (surplus > 0 ? Math.min(16, extra * 0.25) : 0);
  // 3) LEAD — jedna rečenica koja objasnjava MEHANIZAM ponude.
  if (p.lead) {
    y += LEAD_GAP;
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
    y += FEAT_GAP;
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
    y += TERM_GAP;
    terms.forEach((t, i) => {
      const ry = y + i * TERM_ROW;
      svg += pxIcon("check", left - 2, ry - 26, c.accent, 27);
      svg += `<text x="${left + 42}" y="${ry}" font-family="${FONT}" font-size="27"
        font-weight="700" fill="${c.ink}">${esc(t)}</text>`;
    });
    y += (terms.length - 1) * TERM_ROW;
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

  const btnNear = y + BTN_GAP_Y;
  const btnBottom = SIZE_H - reserveBottom - btnH;
  // Prije: Math.max() je ZAKUCAVAO dugmad na dno kadra, pa je razmak iznad
  // njih narastao na 237px dok su ostali bili 57-93px. Sada dugmad idu tamo
  // gdje ih raspored stavi — dno je samo sigurnosna granica, ne cilj.
  const btnY = Math.min(btnNear, btnBottom);

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

// ── Pozicioniranje ────────────────────────────────────────────────────────
const PLACE: Record<PostLayout, (c: Colors, p: PostSlide, total: number) => string> = {
  // PREMIUM — nema header/footer iz `header()`; vlastiti ram i vlastita hijerarhija.
  premium: (c, p) => premiumLayout(c, p),
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

  // Zrcalo `photoTop`: fotografija je DOLJE, tekst u gornjoj zoni.
  // Koristi se kad broj/cifra treba da dominira gore, a slika da zatvori sliku dolje.
  photoBot: (c, p, total) => {
    const ph = p.photo ?? "hero";
    // Visina slike mora zavisti od formata: u 3:4 ima puno teksta pa slika
    // smije zauzeti manje (0.27), u 1:1 teksta je manje pa slika moze vise.
    const imgH = Math.round(SIZE_H * (SIZE_H >= 1300 ? 0.46 : 0.42));
    const zoneTop = CONTENT_TOP();
    const zoneBot = SIZE_H - imgH;
    const b = buildFitting(c, p, zoneBot - 16, total);
    // Tekst CENTRIRAN u gornjoj zoni — ne lijepi se za sliku.
    // Centriranje mora uzeti u obzir da se slika GORE stapa u zelenu preko
    // 180px gradijenta — taj dio je vizuelno jos prazan. Zato se zona
    // skracuje za taj blend, da tekst ne bjezi previsoko od slike.
    const blend = 60;
    const y = zoneTop + Math.max(0, (zoneBot - blend - zoneTop - b.h) / 2);
    // Fotografija se stapa sa zelenom: gore se rastvara u boju podloge
    // (bez tvrde ivice), a preko nje ide blagi zeleni ton + zatamnjenje.
    return `<image href="${PHOTOS[ph]}" x="0" y="${SIZE_H - imgH}" width="${SIZE}" height="${imgH}"
        preserveAspectRatio="xMidYMid slice" aria-label="${esc(PHOTO_ALT[ph])}"/>
      <rect x="0" y="${SIZE_H - imgH}" width="${SIZE}" height="${imgH}" fill="${c.bg}" opacity="0.28"/>
      <rect x="0" y="${SIZE_H - imgH}" width="${SIZE}" height="${imgH}" fill="url(#blendBot)"/>
      <rect x="0" y="${SIZE_H - imgH}" width="${SIZE}" height="180" fill="url(#blendUp)"/>
      <g transform="translate(${M}, ${y})">${b.svg}</g>`;
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
    const b = buildFitting(c, p, zoneBot - zoneTop - 40, total);
    const realH = b.h + 20;
    const centered = zoneTop + Math.max(0, (zoneBot - zoneTop - realH) / 2 - 8);
    const maxY = Math.max(zoneTop + 8, zoneBot - realH - 4);
    const y = Math.max(zoneTop + 8, Math.min(centered, maxY));
    return `<image href="${PHOTOS[ph]}" x="0" y="0" width="${SIZE}" height="${imgH}"
        preserveAspectRatio="xMidYMid slice" aria-label="${esc(PHOTO_ALT[ph])}"/>
      <rect x="0" y="${imgH - 80}" width="${SIZE}" height="80" fill="url(#fadeBot)"/>
      <g transform="translate(${M}, ${y})">${b.svg}</g>`;
  },

  photo: (c, p, total) => {
    const ph = p.photo ?? "hero";
    const imgW = 330;
    // TEKST NE SMIJE PRECI NA SLIKU.
    //
    // Prije je `build()` radio sa punom sirinom W (944px), pa su dugacke
    // stavke ulazile u desnu zonu gdje je fotografija — tekst je doslovno
    // nestajao preko slike. Zona se sada racuna od stvarne lijeve ivice
    // slike minus razmak za fade, i tekst se tu skracuje (`buildNarrow`).
    //
    // 70px je sirina `fadeRight` gradijenta: do te ivice tekst smije ici,
    // dalje ga pocinje prekrivati tama prema fotografiji.
    const fadeW = 70;
    const textW = SIZE - imgW - fadeW - M - 34;
    const b = buildNarrow(c, p, total, textW);
    const y = CONTENT_TOP() + Math.max(0, (CONTENT_H() - b.h) / 2);
    return `<image href="${PHOTOS[ph]}" x="${SIZE - imgW}" y="0" width="${imgW}" height="${SIZE_H}"
        preserveAspectRatio="xMidYMid slice" aria-label="${esc(PHOTO_ALT[ph])}"/>
      <rect x="${SIZE - imgW - fadeW}" y="0" width="${fadeW}" height="${SIZE_H}" fill="url(#fadeRight)"/>
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
  // POLJA SA NIVOA OBJAVE MORAJU DOCI NA SLIDE.
  //
  // PLACE[layout] prima `slide`, a ne `post`. Ako polje postoji samo na objavi
  // (npr. `includes` za cjenovne objave), layout ga ne vidi — lista se tiho
  // ne nacrta. Zato se ovdje spaja: sta god nedostaje na slideu uzima se s
  // objave. Isto vazi za `title`, `subtitle`, `value`, `valueNote`, `items`.
  const merged: PostSlide = {
    ...slide,
    title: slide.title ?? post.title,
    subtitle: slide.subtitle ?? post.subtitle,
    value: slide.value ?? post.value,
    valueNote: slide.valueNote ?? post.valueNote,
    includes: slide.includes ?? post.includes,
    items: slide.items ?? post.items,
    eyebrow: slide.eyebrow ?? post.eyebrow,
  };
  let content = (PLACE[layout] ?? PLACE.center)(c, merged, slideTotal);

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
