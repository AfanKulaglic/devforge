// ───────────────────────────────────────────────────────────────────────────
// SVE OBJAVE — jedan ulaz za stranicu /objave.
// 60 objava podijeljeno u tri grupe po 20 (sadrzaj, edukacija/AI, povjerenje).
// ───────────────────────────────────────────────────────────────────────────

import type { AdPost } from "./postsData";
import { POSTS_1 } from "./posts1";
import { POSTS_2 } from "./posts2";
import { POSTS_3 } from "./posts3";

export const ALL_POSTS: AdPost[] = [...POSTS_1, ...POSTS_2, ...POSTS_3];

export const CATEGORY_LABEL: Record<string, string> = {
  sadrzaj: "Sadržaj",
  edukacija: "Edukacija",
  ponuda: "Ponuda",
  dokaz: "Dokaz",
  brend: "Brend",
};

export const TEMPLATE_LABEL: Record<string, string> = {
  title: "Naslov",
  price: "Cijena",
  quote: "Citat",
  list: "Lista",
  compare: "Poređenje",
  number: "Broj",
  process: "Proces",
  cta: "CTA",
};
