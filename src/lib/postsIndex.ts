// ───────────────────────────────────────────────────────────────────────────
// SVE OBJAVE — jedan ulaz za stranicu /objave.
// Premium oglas stoji PRVI (to je oglas, ne dio serije).
// 60 objava podijeljeno u tri grupe po 20 (sadrzaj, edukacija/AI, povjerenje).
// ───────────────────────────────────────────────────────────────────────────

import type { AdPost } from "./postsData";
import { POSTS_1 } from "./posts1";
import { POSTS_2 } from "./posts2";
import { POSTS_3 } from "./posts3";
import { POST_PREMIUM, POST_FB_COVER } from "./postsPremium";

// COVER ide PRVI — to je naslovna slika, ne dio serije objava.
export const ALL_POSTS: AdPost[] = [POST_FB_COVER, POST_PREMIUM, ...POSTS_1, ...POSTS_2, ...POSTS_3];

export const CATEGORY_LABEL: Record<string, string> = {
  edukacija: "Edukacija",
  savjet: "Savjet",
  izakulisa: "Iza kulisa",
  dokaz: "Rezultati",
  ponuda: "Ponuda",
  brend: "Naš stav",
  sadrzaj: "Sadržaj",
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
