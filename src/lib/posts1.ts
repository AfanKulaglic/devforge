import type { AdPost } from "./postsData";

// ───────────────────────────────────────────────────────────────────────────
// OBJAVE 1–20 — REDOSLIJED KAO NA SAJTU
//
// Sve informacije su sa home page-a i /o-nama (src/App.tsx):
//   benefits, services, serviceList, deliverables, comparison, processSteps,
//   faqs, pricing, milestones, industries, techGroups.
//
// Galerije (uvod + slike): p04 · p06 · p08 · p10 · p12 · p13 · p17
// Slike su SAMO iz hero sekcije: hero · heroMob · web · mobile
// Paleta: #4DEAE0 + crna/bijela/sive
// ───────────────────────────────────────────────────────────────────────────

export const POSTS_1: AdPost[] = [
  // ── 1. BEZ PREDUJMA ──────────────────────────────────────────────────────
  {
    id: "p01",
    template: "number",
    category: "ponuda",
    layout: "photoBg",
    photo: "hero",
    palette: "dark",
    eyebrow: "Bez predujma",
    title: "predujma. Plaćate tek kada ste zadovoljni",
    value: "0 KM",
    valueNote: "Rizik je na nama, ne na Vama.",
    caption:
      "Većina agencija traži 50% predujma prije nego što počne. Vi platite, pa vidite šta ste dobili.\n\n" +
      "Kod nas je obrnuto.\n\n" +
      "0 KM predujma. Razvoj počinjemo na povjerenje. Plaćate tek kada je projekat gotov i kada ste u potpunosti zadovoljni rezultatom.\n\n" +
      "Sav rizik je na nama. Vi nemate šta izgubiti.\n\n" +
      "Javite se u DM — odgovaramo u 10 minuta.",
    tags: ["bezpredujma", "webdizajn", "agencija", "sarajevo", "devforge"],
  },

  // ── 2. POKREĆU BIZNIS WEB USLUGE ─────────────────────────────────────────
  {
    id: "p02",
    template: "title",
    category: "ponuda",
    layout: "center",
    palette: "ink",
    eyebrow: "Za Vaš biznis",
    title: "Web, aplikacije i igre koje pokreću Vaš biznis",
    subtitle: "Od ideje do gotovog proizvoda za nekoliko sedmica.",
    caption:
      "Digitalni proizvodi koji stvarno rade za Vaš biznis:\n\n" +
      "— web stranice koje pretvaraju posjetioce u klijente\n" +
      "— mobilne aplikacije za iOS i Android\n" +
      "— 2D igrice za web i mobilne\n" +
      "— AI sistemi koji odgovaraju umjesto Vas\n\n" +
      "Od ideje do gotovog proizvoda za nekoliko sedmica. Izrađujemo besplatnu gotovu verziju za 5 dana — plaćate tek kada budete zadovoljni.\n\n" +
      "Sarajevo i cijela BiH. Bez kancelarije u centru i bez velikih režija.\n\n" +
      "Šta Vama treba?",
    tags: ["webdizajn", "aplikacije", "igrice", "aisistemi", "sarajevo", "devforge"],
  },

  // ── 3. WEB STRANICA VEĆ OD 150 KM ────────────────────────────────────────
  {
    id: "p03",
    template: "price",
    category: "ponuda",
    layout: "band",
    palette: "teal",
    eyebrow: "Cijene",
    title: "Web stranica već od 150 KM",
    value: "150 KM",
    valueNote: "UI/UX dizajn, mobilna verzija i admin panel uključeni.",
    caption:
      "Web stranica od 150 KM. Web shop od 600 KM. To je na sajtu i to dobijete u ponudi.\n\n" +
      "U tih 150 KM:\n" +
      "— landing page ili jednostavna web stranica\n" +
      "— UI/UX dizajn uključen u cijenu\n" +
      "— responzivni dizajn (radi na mobitelu)\n" +
      "— kontakt forma\n" +
      "— admin panel\n" +
      "— postavljanje hostinga i domene\n" +
      "— besplatna gotova verzija\n\n" +
      "Nema skrivenih stavki na kraju. Bez naknadnih doplata.\n\n" +
      "Koliko ste platili svoju trenutnu?",
    tags: ["cijene", "150km", "webstranice", "transparentnost", "sarajevo", "devforge"],
  },

  // ── 4. ZAŠTO DEVFÖRGE — GALERIJA ─────────────────────────────────────────
  {
    id: "p04",
    template: "cover",
    category: "brend",
    layout: "photoBg",
    photo: "web",
    palette: "dark",
    eyebrow: "Zašto DevForge",
    title: "Zašto DevForge",
    slides: [
      {
        template: "cover",
        eyebrow: "Zašto DevForge",
        title: "Zašto DevForge",
        items: ["Bez predujma", "5 dana besplatno", "Cijene javne"],
        palette: "dark",
      },
      {
        template: "number",
        eyebrow: "Predujam",
        title: "predujma — plaćate na kraju",
        value: "0 KM",
        valueNote: "Sav rizik je na nama. Vi nemate šta izgubiti.",
        palette: "dark",
      },
      {
        template: "number",
        eyebrow: "Rok",
        title: "radnih dana do besplatne gotove verzije",
        value: "5",
        valueNote: "Vidite stranicu prije nego što potpišete bilo šta.",
        palette: "ink",
      },
      {
        template: "list",
        eyebrow: "Uključeno",
        title: "Bez doplata, u svakom projektu",
        items: ["UI/UX dizajn", "Mobilna verzija", "Admin panel", "4 besplatne revizije"],
        palette: "dark",
      },
      {
        template: "compare",
        eyebrow: "Razlika",
        title: "Tipična agencija vs. DevForge",
        items: ["50% predujma", "Plaćate pa vidite", "Bez probne verzije", "Skriveni troškovi", "0 KM predujma", "Vidite pa platite", "Verzija za 5 dana", "Cijene javne"],
        palette: "ink",
      },
    ],
    caption:
      "Četiri stvari koje nas razlikuju od tipične agencije:\n\n" +
      "1. BEZ PREDUJMA. 0 KM unaprijed. Plaćate tek kada ste zadovoljni rezultatom.\n\n" +
      "2. BESPLATNA GOTOVA VERZIJA ZA 5 DANA. Prava stranica na pravom linku, prije bilo kakve obaveze.\n\n" +
      "3. CIJENE SU JAVNE. Web od 150 KM, shopovi od 600 KM. Bez „po dogovoru“ i bez nagađanja.\n\n" +
      "4. SVE UKLJUČENO. UI/UX dizajn, mobilna verzija, admin panel i 4 revizije — bez doplata.\n\n" +
      "Javite nam se u DM.",
    tags: ["zastodevforge", "bezpredujma", "agencija", "sarajevo", "devforge"],
  },

  // ── 5. NAŠE USLUGE ───────────────────────────────────────────────────────
  {
    id: "p05",
    template: "list",
    category: "ponuda",
    layout: "photo",
    photo: "mobile",
    palette: "ink",
    eyebrow: "Usluge",
    title: "Četiri stvari koje radimo",
    items: ["Web stranice i shopovi", "2D igrice", "Mobilne aplikacije", "AI sistemi"],
    caption:
      "Radimo četiri stvari — i svaku dobro.\n\n" +
      "1. WEB STRANICE I SHOPOVI. Moderne, responzivne stranice koje predstavljaju Vaš brend. Od landing page-a do kompleksnih korporativnih stranica i shopova. Od 150 KM.\n\n" +
      "2. 2D IGRICE. Engaging igrice za mobilne platforme i web. Od casual do educational — prilagođeno Vašim zahtjevima.\n\n" +
      "3. MOBILNE APLIKACIJE. Native i cross-platform aplikacije za iOS i Android. Od MVP-a do potpune aplikacije s backend-om.\n\n" +
      "4. AI SISTEMI. AI recepcionar i chat asistent koji primaju pozive 24/7, odgovaraju kupcima, zakazuju termine i bilježe narudžbe — bez Vašeg učešća.\n\n" +
      "Sve ostalo — ne radimo. Za velike enterprise sisteme preporučimo nekog drugog.",
    tags: ["usluge", "webstranice", "igrice", "aplikacije", "sarajevo", "devforge"],
  },

  // ── 6. NAŠE USLUGE — GALERIJA ────────────────────────────────────────────
  {
    id: "p06",
    template: "cover",
    category: "ponuda",
    layout: "center",
    palette: "dark",
    eyebrow: "Usluge",
    title: "Naše usluge",
    slides: [
      {
        template: "cover",
        eyebrow: "Usluge",
        title: "Naše usluge",
        items: ["Web", "Igrice", "Aplikacije", "AI"],
        palette: "dark",
      },
      {
        template: "list",
        eyebrow: "01 · Web",
        title: "Web stranice i shopovi",
        items: ["Landing page", "Korporativna stranica", "Web shop", "Web aplikacija"],
        palette: "dark",
      },
      {
        template: "list",
        eyebrow: "02 · Igrice",
        title: "2D igrice za web i mobilne",
        items: ["Marketing igre", "Educational igre", "Casual igre", "S Vašim brendom"],
        palette: "ink",
      },
      {
        template: "list",
        eyebrow: "03 · Aplikacije",
        title: "Mobilne aplikacije",
        items: ["iOS i Android", "Flutter i React Native", "Push notifikacije", "App Store i Play"],
        palette: "dark",
      },
      {
        template: "list",
        eyebrow: "04 · AI",
        title: "AI sistemi",
        items: ["AI recepcionar", "Chat na sajtu", "Baza znanja", "Radi 24/7"],
        palette: "ink",
      },
      {
        template: "cta",
        eyebrow: "Počnite",
        title: "Prva verzija je besplatna.",
        subtitle: "Web od 150 KM · Shopovi od 600 KM · 0 KM predujma",
        palette: "dark",
      },
    ],
    caption:
      "Četiri usluge, detaljno:\n\n" +
      "WEB STRANICE I SHOPOVI — landing, korporativna, web shop, web aplikacija. Od 150 KM (shopovi od 600 KM).\n\n" +
      "2D IGRICE — marketing, edukacija ili zabava. Za web i mobilne, s Vašim brendom.\n\n" +
      "MOBILNE APLIKACIJE — iOS i Android iz jednog koda (Flutter / React Native). Push notifikacije, backend, objava u trgovinama.\n\n" +
      "AI SISTEMI — AI recepcionar i chat koji rade 24/7, zakazuju termine i bilježe narudžbe.\n\n" +
      "Svaka usluga: prva verzija besplatna, plaćate kad ste zadovoljni.",
    tags: ["usluge", "galerija", "webstranice", "aisistemi", "sarajevo", "devforge"],
  },

  // ── 7. SVE OSTALO ŠTO PROJEKAT TREBA ─────────────────────────────────────
  {
    id: "p07",
    template: "list",
    category: "ponuda",
    layout: "band",
    palette: "mint",
    eyebrow: "Sve ostalo",
    title: "Sve što Vaš projekat treba, na jednom mjestu",
    items: ["API razvoj i integracije", "Admin panel (CMS)", "Online plaćanje", "Domena, email i SSL"],
    caption:
      "Stranica nije samo dizajn. Ovo je sve što ide uz nju:\n\n" +
      "— API razvoj i integracije — REST i GraphQL API-ji, povezivanje s CRM, ERP i dostavnim službama\n" +
      "— Admin panel (CMS) — vlastiti panel za samostalno uređivanje sadržaja, slika i proizvoda\n" +
      "— Online plaćanje — Stripe, PayPal i servisi koje već koristite\n" +
      "— Domena, email i SSL — postavljamo ih, a plaćate direktno provideru, bez naše marže\n" +
      "— SEO i Google Analytics — tehnička osnova i mjerenje posjeta\n" +
      "— Višejezičnost — za klijente iz BiH, regije i inostranstva\n" +
      "— Copywriting — pišemo tekstove i opise proizvoda\n" +
      "— Logo i vizualni identitet — boje, tipografija, usklađen brend\n" +
      "— Održavanje i podrška — ažuriranja i optimizacija nakon isporuke\n\n" +
      "Ne morate tražiti pet izvođača. Sve je na jednom mjestu.",
    tags: ["api", "adminpanel", "placanje", "seo", "sarajevo", "devforge"],
  },

  // ── 8. CIJENE — GALERIJA ─────────────────────────────────────────────────
  {
    id: "p08",
    template: "cover",
    category: "ponuda",
    layout: "photoTop",
    photo: "web",
    palette: "ink",
    eyebrow: "Cijene",
    title: "Cijene",
    slides: [
      {
        template: "cover",
        eyebrow: "Cijene",
        title: "Cijene bez skrivenih stavki",
        items: ["Web od 150 KM", "Shop od 600 KM"],
        palette: "ink",
      },
      {
        template: "price",
        eyebrow: "Web stranice",
        title: "Landing ili korporativna stranica",
        value: "150 KM",
        valueNote: "Dizajn, mobilna verzija, kontakt forma, admin panel.",
        palette: "ink",
      },
      {
        template: "price",
        eyebrow: "Web shopovi",
        title: "Kompletan e-commerce sistem",
        value: "600 KM",
        valueNote: "Katalog, korpa, online plaćanje, upravljanje narudžbama.",
        palette: "dark",
      },
      {
        template: "price",
        eyebrow: "Aplikacije i AI",
        title: "Mobilne aplikacije i AI sistemi",
        value: "Dogovor",
        valueNote: "Zavisi od broja funkcionalnosti. Recite šta treba.",
        palette: "ink",
      },
      {
        template: "list",
        eyebrow: "U svakoj cijeni",
        title: "Ovo je uvijek uključeno",
        items: ["UI/UX dizajn", "Mobilna verzija", "Admin panel", "4 revizije"],
        palette: "dark",
      },
    ],
    caption:
      "Cijene su javne. Ovo je okvir — tačnu ponudu dobijate prije početka.\n\n" +
      "WEB STRANICE — od 150 KM. Landing ili jednostavna stranica. Uključeno: UI/UX dizajn, responzivni dizajn, kontakt forma, besplatna demo verzija, postavljanje hostinga i domene.\n\n" +
      "WEB SHOPOVI — od 600 KM. Kompletan e-commerce: online plaćanje (Stripe, PayPal), admin panel, upravljanje zalihama, demo se ne plaća.\n\n" +
      "MOBILNE APLIKACIJE — po dogovoru. iOS i/ili Android, backend API, push notifikacije, objava na App Store.\n\n" +
      "Domena i hosting se plaćaju direktno provideru — bez naše marže.",
    tags: ["cijene", "galerija", "150km", "600km", "sarajevo", "devforge"],
  },

  // ── 9. CIJENE ────────────────────────────────────────────────────────────
  {
    id: "p09",
    template: "list",
    category: "ponuda",
    layout: "split",
    palette: "light",
    eyebrow: "Cijene",
    title: "Tri paketa, tri jasne cijene",
    items: ["Web stranice od 150 KM", "Web shopovi od 600 KM", "Aplikacije po dogovoru"],
    caption:
      "Web Stranice — 150 KM\n" +
      "Landing page ili jednostavna web stranica, UI/UX dizajn uključen, responzivni dizajn, kontakt forma, demo se ne plaća, postavljanje hostinga i domene.\n\n" +
      "Web Shopovi — 600 KM\n" +
      "Kompletan e-commerce sistem, UI/UX dizajn uključen, online plaćanje (Stripe, PayPal), admin panel, inventory management, demo se ne plaća.\n\n" +
      "Mobilne Aplikacije — po dogovoru\n" +
      "iOS i/ili Android development, UI/UX dizajn, backend API integracija, push notifications, user authentication, App Store deployment, dokumentacija.\n\n" +
      "Tačnu ponudu dajemo nakon besplatne konsultacije — bez skrivenih troškova.",
    tags: ["cijene", "paketi", "webstranice", "shopovi", "sarajevo", "devforge"],
  },

  // ── 10. KAKO RADIMO — GALERIJA ───────────────────────────────────────────
  {
    id: "p10",
    template: "cover",
    category: "izakulisa",
    layout: "center",
    palette: "mint",
    eyebrow: "Kako radimo",
    title: "Kako radimo",
    slides: [
      {
        template: "cover",
        eyebrow: "Kako radimo",
        title: "Kako radimo",
        items: ["Konsultacija", "Gotova verzija", "Razvoj", "Isporuka"],
        palette: "mint",
      },
      {
        template: "process",
        eyebrow: "01",
        title: "Inicijalna konsultacija",
        items: ["Vaše potrebe", "Ciljevi", "Scope projekta", "Timeline"],
        palette: "mint",
      },
      {
        template: "process",
        eyebrow: "02",
        title: "Besplatna gotova verzija",
        items: ["Za 5 radnih dana", "Prava stranica", "Na pravom linku", "Bez obaveze"],
        palette: "dark",
      },
      {
        template: "process",
        eyebrow: "03",
        title: "Razvoj i implementacija",
        items: ["Moderne tehnologije", "Provjereni stack", "Prilagođeno Vama", "Redovni pregledi"],
        palette: "mint",
      },
      {
        template: "process",
        eyebrow: "04",
        title: "Testiranje i isporuka",
        items: ["Temeljno testiranje", "Deployment", "Dokumentacija", "Obuka"],
        palette: "dark",
      },
    ],
    caption:
      "Četiri koraka od prvog razgovora do gotovog projekta:\n\n" +
      "01 INICIJALNA KONSULTACIJA — razgovor o Vašim potrebama, ciljevima i očekivanjima. Definišemo scope projekta, tehnologije i timeline.\n\n" +
      "02 GOTOVA VERZIJA I POTVRDA — izrađujemo besplatnu gotovu verziju u nekoliko dana. Vidite konkretan smjer projekta prije nego što potpišete bilo šta.\n\n" +
      "03 RAZVOJ I IMPLEMENTACIJA — razvijamo Vaše digitalno rješenje koristeći moderne i provjerene tehnologije prilagođene Vašim potrebama.\n\n" +
      "04 TESTIRANJE I ISPORUKA — temeljno testiranje, deployment i predaja projekta sa kompletnom dokumentacijom i obukom za korištenje.\n\n" +
      "Tek onda plaćate.",
    tags: ["kakoradimo", "proces", "galerija", "koraci", "sarajevo", "devforge"],
  },
];
