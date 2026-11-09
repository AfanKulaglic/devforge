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
  | "cta" // poziv na akciju
  | "cover"; // uvodna slika galerije

export type PostCategory =
  | "sadrzaj"
  | "edukacija"
  | "savjet"
  | "izakulisa"
  | "dokaz"
  | "ponuda"
  | "brend";

export type PostPalette = "dark" | "teal" | "light" | "ink" | "mint" | "sun";

// Jedan list karusela. Ako ga nema, objava je jedna slika.
// Kod karusela (2–10 listova) svaki list dobija isti vizuelni ram, ali
// drugačiji sadržaj — kao pravi Instagram karusel.
export type PostSlide = {
  template?: PostTemplate; // ako nije zadato, koristi se template objave
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: string[];
  value?: string;
  valueNote?: string;
  palette?: PostPalette; // dozvoljeno mijenjati ton unutar karusela
  photo?: PhotoKey; // fotografija za ovaj list
};

export type AdPost = {
  id: string;
  template: PostTemplate;
  category: PostCategory;
  palette: PostPalette;
  /** Fotografija — koristi se u photo/photoTop/photoBg layoutima. */
  photo?: PhotoKey;
  layout?: PostLayout; // varijanta kompozicije (razlicitost bez lomljenja stila)
  eyebrow: string; // mala etiketa gore
  title: string; // glavni naslov
  subtitle?: string; // podnaslov / objasnjenje
  items?: string[]; // za list / process / compare
  value?: string; // za number / price (veliki broj)
  valueNote?: string; // sitno ispod broja
  caption: string; // tekst objave za Instagram
  tags: string[]; // hashtagovi
  slides?: PostSlide[]; // ako postoji → karusel
};

// Varijante kompozicije — daju raznolikost a da sve ostane u istom sistemu:
//   "center"   — sadrzaj centriran, mirniji
//   "split"    — lijevo tekst, desno akcenat-blok
//   "band"     — sadrzaj u tamnoj/tamnijoj traci preko pozadine
//   "offset"   — sadrzaj pomjeren gore ili dole, asimetricno
//   "stamp"    — sadrzaj + veliki poluprovidni "pecat" u pozadini
export type PostLayout =
  | "center"
  | "split"
  | "band"
  | "offset"
  | "stamp"
  | "photo"    // fotografija desno, tekst lijevo
  | "photoTop" // fotografija gore, tekst dolje
  | "photoBot" // fotografija dolje, tekst gore (zrcalo photoTop)
  | "photoBg"; // fotografija preko cijele pozadine

/** Fotografije dostupne za postove (vidi postPhotos.ts). */
export type PhotoKey =
  | "hero" | "heroMob" | "web" | "game" | "mobile"
  | "ai" | "project1" | "project2" | "project3" | "stvari" | "zasto";
