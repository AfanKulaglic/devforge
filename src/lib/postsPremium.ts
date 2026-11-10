// ───────────────────────────────────────────────────────────────────────────
// PREMIUM OBJAVA — jedna, posebna, namjerno drugačija od svih ostalih.
//
// Ovo nije dio serije od 60 objava. To je oglas: sve što bi kupac platio da
// vidi, na jednoj slici. Koristi layout "premium" (vlastiti ram, tipografija i
// hijerarhija — vidi `premiumLayout` u postRender.ts), a ne standardne sablone.
//
// SVI PODACI SU STVARNI, preuzeti sa sajta (src/App.tsx):
//   pricing          → 150 KM web stranice, 600 KM shopovi
//   deliverables     → UI/UX uključen, responzivno, demo se ne plaća, 4 revizije
//   comparison       → bez predujma, gotova verzija za 5 radnih dana
//   milestones       → 20+ isporučenih projekata
// Ništa izmišljeno: nema izmišljenih brojeva ni lažnih garancija.
// ───────────────────────────────────────────────────────────────────────────

import type { AdPost } from "./postsData";

export const POST_PREMIUM: AdPost = {
  id: "px01",
  template: "title",
  category: "ponuda",
  layout: "premium",
  palette: "dark",
  photo: "ai",
  eyebrow: "Premium ponuda",
  kicker: "Web · Shopovi · Aplikacije · AI",
  title: "Sve za vaš digitalni nastup. Bez predujma.",
  lead: "Dizajn, kod i admin panel uključeni. Prvo gotova verzija — plaćate tek kad ste zadovoljni.",
  stats: [
    { value: "0 KM", label: "predujam", icon: "shield" },
    { value: "5 dana", label: "gotova verzija", icon: "clock" },
    { value: "150 KM", label: "web od", icon: "coin" },
    { value: "4", label: "revizije", icon: "layers" },
  ],
  features: [
    { icon: "web", label: "Web stranice" },
    { icon: "shop", label: "Web shopovi" },
    { icon: "app", label: "Aplikacije" },
    { icon: "ai", label: "AI sistemi" },
  ],
  terms: ["Demo se ne plaća", "Kod je 100% vaš", "UI/UX i admin panel uključeni"],
  cta: "Pišite nam u DM",
  caption:
    "💎 DEV LAB — vaša stranica, shop ili aplikacija. Bez predujma.\n\n" +
    "Većina traži 30–50% unaprijed, pa tek onda pokaže nešto. Mi radimo obrnuto: prvo vidite gotov rezultat, pa odlučujete da li plaćate.\n\n" +
    "ŠTA RADIMO\n" +
    "— 🌐 Web stranice — landing i korporativne, od 150 KM\n" +
    "— 🛒 Web shopovi — korpa, online plaćanje, admin panel, od 600 KM\n" +
    "— 📱 Mobilne aplikacije — iOS i Android, po dogovoru\n" +
    "— 🤖 AI sistemi — AI chat i recepcionar koji rade 24/7\n" +
    "— ✨ Uz sve: UI/UX dizajn, logo, SEO, copywriting i hosting\n\n" +
    "ŠTA JE UVIJEK UKLJUČENO (bez doplate)\n" +
    "— ✅ UI/UX dizajn — profesionalan izgled od prvog dana\n" +
    "— ✅ Mobilna verzija — radi besprijekorno na svakom ekranu\n" +
    "— ✅ Admin panel — sami mijenjate tekst, slike i cijene\n" +
    "— ✅ Brz i čist kod — optimizovan za učitavanje i Google\n" +
    "— ✅ Dokumentacija — projekt je 100% vaš, znate šta imate\n\n" +
    "KAKO IDE (bez rizika)\n" +
    "1. Konsultacija — kažete čime se bavite, mi predložimo rješenje\n" +
    "2. Besplatna gotova verzija — za 5 radnih dana, bez obaveze\n" +
    "3. Vi kažete da ili ne. Ako ne — ne plaćate ništa.\n" +
    "4. Razvoj, 4 besplatne revizije, isporuka i postavljanje domene\n\n" +
    "ZAŠTO BEZ PREDUJMA\n" +
    "Radimo bez kancelarije u centru i bez velikih režija — ta razlika ide u vašu cijenu. Nemamo šta izgubiti ako pokažemo rezultat: 20+ isporučenih projekata govori umjesto nas.\n\n" +
    "CIJENE (javne, bez iznenađenja)\n" +
    "Web stranica 150 KM · Web shop 600 KM · Aplikacije po dogovoru\n" +
    "Domenu, email i SSL plaćate direktno provideru — bez naše marže.\n\n" +
    "Sarajevo i cijela BiH.\n\n" +
    "📩 Pišite nam u DM — odgovaramo u 10 minuta. Recite dvije rečenice o svom poslu i pošaljite prvu verziju za 5 dana.",
  tags: [
    "premium",
    "bezpredujma",
    "webdizajn",
    "webshop",
    "aplikacije",
    "aisistemi",
    "sarajevo",
    "devlab",
  ],
};
