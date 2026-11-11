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

export type PostPalette =
  | "dark"
  | "teal"
  | "tealwhite"
  | "inkgreen"
  | "light"
  | "ink"
  | "mint"
  | "sun";

// Jedan list karusela. Ako ga nema, objava je jedna slika.
// Kod karusela (2–10 listova) svaki list dobija isti vizuelni ram, ali
// drugačiji sadržaj — kao pravi Instagram karusel.
// Stavka liste: obican string ILI objekat sa ikonom i objasnjenjem.
//
// Zasto unija a ne uvijek objekat: stari postovi imaju items: ["a","b"] i
// ne treba ih sve prepravljati. Novi mogu dati { icon, label, note }.
export type PostItem = string | { icon?: string; label: string; note?: string };

export type PostSlide = {
  template?: PostTemplate; // ako nije zadato, koristi se template objave
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: PostItem[];
  value?: string;
  valueNote?: string;
  palette?: PostPalette; // dozvoljeno mijenjati ton unutar karusela
  photo?: PhotoKey; // fotografija za ovaj list
  kicker?: string; // PREMIUM: sitni red iznad naslova
  lead?: string; // recenica ispod naslova
  /** Rijeci u naslovu koje se crtaju akcent (zelenom) bojom. */
  accentWords?: string[];
  terms?: string[]; // PREMIUM: uslovi u podnozju
  stats?: { value: string; label: string; icon?: string }[]; // PREMIUM: kljucne brojke
  /** PREMIUM: 2–5 usluga sa ikonom (npr. web / shop / app / game / ai). */
  features?: { icon: string; label: string }[];
  /** PREMIUM: domena u podnožju oglasa. */
  site?: string;
  /** PREMIUM: tekst CTA dugmeta (npr. "Pišite nam u DM"). */
  cta?: string;
  /** Kratka lista "sta je ukljuceno u cijenu" (cjenovne objave). */
  includes?: string[];
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
  items?: PostItem[]; // za list / process / compare
  value?: string; // za number / price (veliki broj)
  valueNote?: string; // sitno ispod broja
  includes?: string[]; // kratka lista "sta je ukljuceno u cijenu"
  caption: string; // tekst objave za Instagram
  tags: string[]; // hashtagovi
  slides?: PostSlide[]; // ako postoji → karusel
  /** PREMIUM: sitni red iznad glavnog naslova (npr. "PREMIUM PONUDA"). */
  kicker?: string;
  /** PREMIUM: rečenica ispod naslova. */
  lead?: string;
  /** PREMIUM: uslovi/podnožje (garancije, rok, cijena "od"). */
  terms?: string[];
  /** PREMIUM: 3–4 ključne brojke (npr. "0 KM" / "predujam"). */
  stats?: { value: string; label: string; icon?: string }[];
  /** PREMIUM: domena u podnožju oglasa. */
  site?: string;
  /** PREMIUM: 2–5 usluga sa ikonom. */
  features?: { icon: string; label: string }[];
  /** PREMIUM: tekst CTA dugmeta. */
  cta?: string;
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
  | "photoBg" // fotografija preko cijele pozadine
  | "premium"; // PREMIUM oglas — potpuno drugaciji ram, tip i hijerarhija

/** Fotografije dostupne za postove (vidi postPhotos.ts). */
export type PhotoKey =
  | "hero" | "heroMob" | "web" | "game" | "mobile"
  | "ai" | "project1" | "project2" | "project3" | "stvari" | "zasto";
