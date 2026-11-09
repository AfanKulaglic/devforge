// ───────────────────────────────────────────────────────────────────────────
// OBJAVE — marketinške slike za Instagram, generisane isključivo kodom (SVG).
//
// Zašto SVG a ne slike: 60 slika × 1080×1080 = preko 200 MB. SVG je tekst,
// učitava se trenutno, savršeno oštar na svakom ekranu, i svaka slika se
// generise iz PODATAKA — pa je dizajn 100% konzistentan po konstrukciji.
//
// Svaka objava ima:
//   - tip (posto je 8 vizualnih sablona: naslov, cijena, citat, lista,
//     poredjenje, broj, proces, CTA)
//   - kategoriju (sadrzaj / edukacija / ponuda / dokaz / brend)
//   - caption (tekst za Instagram) + hashtagove
//   - paleta (teal / dark / light — sve unutar brend palete)
//
// Boje su iskljucivo iz brenda: #14B8A6, #0891B2, #060606, #0B0B0F, #A7AABB.
// ───────────────────────────────────────────────────────────────────────────

export type PostTemplate =
  | "title" // veliki naslov + podnaslov
  | "price" // cijena / ponuda
  | "quote" // izjava, citat
  | "list" // lista stavki
  | "compare" // prije / poslije, lose / dobro
  | "number" // statistika, veliki broj
  | "process" // koraci 1-2-3
  | "cta"; // poziv na akciju

export type PostCategory = "sadrzaj" | "edukacija" | "ponuda" | "dokaz" | "brend";

export type PostPalette = "teal" | "dark" | "light";

export type AdPost = {
  id: string;
  template: PostTemplate;
  category: PostCategory;
  palette: PostPalette;
  eyebrow: string; // mala etiketa gore
  title: string; // glavni naslov
  subtitle?: string; // podnaslov / objasnjenje
  items?: string[]; // za list / process / compare
  value?: string; // za number / price (veliki broj)
  valueNote?: string; // sitno ispod broja
  caption: string; // tekst objave za Instagram
  tags: string[]; // hashtagovi
};
