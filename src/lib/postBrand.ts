// ───────────────────────────────────────────────────────────────────────────
// BREND ZNAK — DevForge "DF" monogram, crtan vektorski.
//
// Zašto ne <image href="/images/logo-icon.png">:
//   1) SVG koji se preuzima mora raditi i kad se otvori samostalno (bez servera)
//   2) PNG od 64px izgleda mutno razvučen na 1080px platnu
//   3) Vektorski znak je oštar u svakoj veličini i mijenja boju po paleti
//
// Oblik prati original: "D" lijevo (zaobljen sa rupom), "F" desno (pravougaonik
// sa dva horizontalna reza), dijagonalni rez gore-desno kao na logu sajta.
// ───────────────────────────────────────────────────────────────────────────

/**
 * Vraća SVG grupu s monogramom.
 * @param x lijevi rub
 * @param y gornji rub
 * @param h visina znaka (širina se računa ~2.3×h)
 * @param fill boja znaka
 * @param bg boja "rupe" u D (obično boja pozadine plakata)
 */
export function dfMark(x: number, y: number, h: number, fill: string, bg: string): string {
  const d = h * 0.44; // širina D
  const gap = h * 0.1; // razmak D ↔ F
  const fx = x + d + gap;

  // "D" — debeli prsten s rupom; desna strana je ravna (kutna, kao na logu)
  const dOuter = `M ${x} ${y} h ${d * 0.55} a ${d * 0.45} ${h / 2} 0 0 1 0 ${h} H ${x} Z`;
  const dHole = `M ${x + h * 0.19} ${y + h * 0.19} h ${d * 0.3} a ${d * 0.26} ${h * 0.31} 0 0 1 0 ${h * 0.62} H ${x + h * 0.19} Z`;

  // "F" — pravougaonik sa dva horizontalna reza (gornji duži, donji kraći)
  const fW = h * 0.62;
  const t = h * 0.19; // debljina "šipki"
  const fBar = `M ${fx} ${y} h ${fW} v ${t} h ${-fW * 0.62} v ${h * 0.24} h ${fW * 0.72} v ${t} h ${-fW * 0.72} v ${h * 0.26} h ${fW * 0.94} v ${t} H ${fx} Z`;

  return `<g fill="${fill}">
    <path d="${dOuter}"/>
    <path d="${dHole}" fill="${bg}"/>
    <path d="${fBar}"/>
  </g>`;
}

/** Širina monograma za datu visinu (za centriranje). */
export function dfMarkWidth(h: number): number {
  return h * 0.44 + h * 0.1 + h * 0.62;
}
