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
    subtitle: "Napravimo ga, pokažemo vam, i tek onda razgovaramo o plaćanju. Bez avansa, bez ugovora, bez rizika.",
    template: "number",
    category: "ponuda",
    layout: "photoBg",
    photo: "hero",
    palette: "dark",
    eyebrow: "Bez plaćanja unaprijed",
    title: "Ne plaćate ni marku dok svoj sajt ne vidite gotov.",
    value: "0 KM",
    valueNote: "Bez uplate na početku. Ako vam se ne svidi, ne plaćate ništa i nemate nikakvu obavezu.",
    caption:
      "🛑 STOP. Ne plaćajte ništa unaprijed.\n\nVećina agencija traži 50% predujma prije nego što počne. Vi platite, pa vidite šta ste dobili.\n\nKod nas je obrnuto.\n\n0 KM predujma. Razvoj počinjemo na povjerenje. Plaćate tek kada je projekat gotov i kada ste u potpunosti zadovoljni rezultatom.\n\nPovjerenje gradimo na rezultatu, a ne na avansu.\n\nJavite se u DM — odgovaramo u 10 minuta.",
    tags: ["bezpredujma", "webdizajn", "agencija", "sarajevo", "devlab"],
  },

  // ── 2. POKREĆU BIZNIS WEB USLUGE ─────────────────────────────────────────
  {
    id: "p02",
    title: "Stranica, shop, aplikacija ili igrica — sve na jednom mjestu.",
    template: "title",
    category: "ponuda",
    layout: "center",
    palette: "ink",
    eyebrow: "Šta radimo",
    subtitle: "Ne morate tražiti tri različite firme. Jedan tim radi sve, od prve skice do puštanja u rad.",
    caption:
      "⚡ Vaš biznis treba biti na internetu. Danas.\n\nDigitalni proizvodi koji stvarno rade za Vaš biznis:\n\n— ✅ stranice koje pretvaraju posjetioce u klijente\n— 🔥 mobilne aplikacije za iOS i Android\n— 💡 2D igrice za web i mobilne\n— ⚡ AI sistemi koji odgovaraju umjesto Vas\n\nOd ideje do gotovog proizvoda za nekoliko sedmica. Izrađujemo besplatnu gotovu verziju za 5 dana — plaćate tek kada budete zadovoljni.\n\nSarajevo i cijela BiH. Bez kancelarije u centru i bez velikih režija.\n\nŠta Vama treba?",
    tags: ["webdizajn", "aplikacije", "igrice", "aisistemi", "sarajevo", "devlab"],
  },

  // ── 3. WEB STRANICA VEĆ OD 150 KM ────────────────────────────────────────
  {
    id: "p03",
    valueNote: "Dizajn, mobilna verzija i admin panel uključeni u cijenu. Gotova za 5 dana.",
    template: "price",
    category: "ponuda",
    layout: "photoBot",
    photo: "web",
    palette: "teal",
    eyebrow: "Cijena",
    title: "Kompletna stranica za 150 KM. Bez skrivenih stavki.",
    value: "150 KM",
    caption:
      "💸 150 KM. Ne 1500. Ista stvar.\n\nWeb stranica od 150 KM. Web shop od 600 KM. To je na sajtu i to dobijete u ponudi.\n\nU tih 150 KM:\n— ✅ landing page ili jednostavna web stranica\n— 🔥 UI/UX dizajn uključen u cijenu\n— 💡 responzivni dizajn (radi na mobitelu)\n— ⚡ kontakt forma\n— 🎯 admin panel\n— 💰 postavljanje hostinga i domene\n— 📈 besplatna gotova verzija\n\nNema skrivenih stavki na kraju. Bez naknadnih doplata.\n\nKoliko ste platili svoju trenutnu?",
    tags: ["cijene", "150km", "webstranice", "transparentnost", "sarajevo", "devlab"],
  },

  // ── 4. ZAŠTO DEVFÖRGE — GALERIJA ─────────────────────────────────────────
  {
    id: "p04",
    template: "cover",
    category: "brend",
    layout: "photoBg",
    photo: "zasto",
    palette: "dark",
    eyebrow: "Zašto baš mi",
    title: "Zašto firme biraju Dev Lab umjesto agencije.",
    slides: [
      {
        template: "cover",
        eyebrow: "Zašto Dev Lab",
        title: "Zašto Dev Lab",
        items: ["Bez predujma", "5 dana besplatno", "Cijene javne"],
        palette: "dark",
      },
      {
        template: "number",
        eyebrow: "Predujam",
        title: "Bez predujma — plaćate na kraju",
        value: "0 KM",
        valueNote: "Prvo vidite rezultat, onda odlučujete.",
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
        title: "Tipična agencija vs. Dev Lab",
        items: ["50% predujma", "Plaćate pa vidite", "Bez probne verzije", "Skriveni troškovi", "0 KM predujma", "Vidite pa platite", "Verzija za 5 dana", "Cijene javne"],
        palette: "ink",
      },
    ],
    caption:
      "🔥 Zašto nas ljudi biraju kad ima 50 agencija?\n\nČetiri stvari koje nas razlikuju od tipične agencije:\n\n1. BEZ PREDUJMA. 0 KM unaprijed. Plaćate tek kada ste zadovoljni rezultatom.\n\n2. BESPLATNA GOTOVA VERZIJA ZA 5 DANA. Prava stranica na pravom linku, prije bilo kakve obaveze.\n\n3. CIJENE SU JAVNE. Web od 150 KM, shopovi od 600 KM. Bez „po dogovoru“ i bez nagađanja.\n\n4. SVE UKLJUČENO. UI/UX dizajn, mobilna verzija, admin panel i 4 revizije — bez doplata.\n\nJavite nam se u DM.",
    tags: ["zastodevlab", "bezpredujma", "agencija", "sarajevo", "devlab"],
  },

  // ── 5. NAŠE USLUGE ───────────────────────────────────────────────────────
  {
    id: "p05",
    template: "list",
    category: "ponuda",
    layout: "photo",
    photo: "stvari",
    palette: "ink",
    eyebrow: "Naše usluge",
    title: "Četiri stvari koje radimo — i radimo ih dobro.",
    items: [
      "Web stranice i shopovi",
      "2D igrice za web i mobilne",
      "Mobilne aplikacije iOS i Android",
      "AI chat i recepcionar 24/7",
    ],
    caption:
      "🎯 Četiri stvari. Bez filozofije.\n\nRadimo četiri stvari — i svaku dobro.\n\n1. WEB STRANICE I SHOPOVI. Moderne, responzivne stranice koje predstavljaju Vaš brend. Od landing page-a do kompleksnih korporativnih stranica i shopova. Od 150 KM.\n\n2. 2D IGRICE. Engaging igrice za mobilne platforme i web. Od casual do educational — prilagođeno Vašim zahtjevima.\n\n3. MOBILNE APLIKACIJE. Native i cross-platform aplikacije za iOS i Android. Od MVP-a do potpune aplikacije s backend-om.\n\n4. AI SISTEMI. AI recepcionar i chat asistent koji primaju pozive 24/7, odgovaraju kupcima, zakazuju termine i bilježe narudžbe — bez Vašeg učešća.\n\nSve ostalo — ne radimo. Za velike enterprise sisteme preporučimo nekog drugog.",
    tags: ["usluge", "webstranice", "igrice", "aplikacije", "sarajevo", "devlab"],
  },

  // ── 6. NAŠE USLUGE — GALERIJA ────────────────────────────────────────────
  {
    id: "p06",
    template: "cover",
    category: "ponuda",
    layout: "center",
    palette: "dark",
    eyebrow: "Naše usluge",
    title: "Pet usluga. Jedan tim. Cijene javne.",
    slides: [
      {
        template: "cover",
        eyebrow: "Usluge",
        title: "Naše usluge",
        items: ["Stranice", "Aplikacije", "Igre", "AI"],
        palette: "dark",
      },
      {
        template: "list",
        eyebrow: "01 · Stranice",
        title: "Stranice i shopovi",
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
        subtitle: "Stranice od 150 KM · Shopovi od 600 KM · 0 KM predujma",
        palette: "dark",
      },
    ],
    caption:
      "📦 Sve na jednom mjestu — i to jeftinije.\n\nČetiri usluge, detaljno:\n\nWEB STRANICE I SHOPOVI — landing, korporativna, web shop, web aplikacija. Od 150 KM (shopovi od 600 KM).\n\n2D IGRICE — marketing, edukacija ili zabava. Za web i mobilne, s Vašim brendom.\n\nMOBILNE APLIKACIJE — iOS i Android iz jednog koda (Flutter / React Native). Push notifikacije, backend, objava u trgovinama.\n\nAI SISTEMI — AI recepcionar i chat koji rade 24/7, zakazuju termine i bilježe narudžbe.\n\nSvaka usluga: prva verzija besplatna, plaćate kad ste zadovoljni.",
    tags: ["usluge", "galerija", "webstranice", "aisistemi", "sarajevo", "devlab"],
  },

  // ── 7. SVE OSTALO ŠTO PROJEKAT TREBA ─────────────────────────────────────
  {
    id: "p07",
    title: "Sve što vaš projekat treba — uključeno u cijenu, bez doplata.",
    template: "list",
    category: "ponuda",
    layout: "band",
    palette: "mint",
    eyebrow: "Sve uključeno",
    items: [
      "API razvoj i integracije",
      "Admin panel za samostalno uređivanje",
      "Online plaćanje karticom",
      "Domena, email i SSL certifikat",
    ],
    caption:
      "🧩 Fali Vam pola stvari? Rješavamo sve.\n\nStranica nije samo dizajn. Ovo je sve što ide uz nju:\n\n— ✅ API razvoj i integracije — REST i GraphQL API-ji, povezivanje s CRM, ERP i dostavnim službama\n— 🔥 Admin panel (CMS) — vlastiti panel za samostalno uređivanje sadržaja, slika i proizvoda\n— 💡 Online plaćanje — Stripe, PayPal i servisi koje već koristite\n— ⚡ Domena, email i SSL — postavljamo ih, a plaćate direktno provideru, bez naše marže\n— 🎯 SEO i Google Analytics — tehnička osnova i mjerenje posjeta\n— 💰 Višejezičnost — za klijente iz BiH, regije i inostranstva\n— 📈 Copywriting — pišemo tekstove i opise proizvoda\n— 🚀 Logo i vizualni identitet — boje, tipografija, usklađen brend\n— 📱 Održavanje i podrška — ažuriranja i optimizacija nakon isporuke\n\nNe morate tražiti pet izvođača. Sve je na jednom mjestu.",
    tags: ["api", "adminpanel", "placanje", "seo", "sarajevo", "devlab"],
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
    title: "Cijene bez sitnih slova. Od 150 KM.",
    slides: [
      {
        template: "cover",
        eyebrow: "Cijene",
        title: "Cijene bez skrivenih stavki",
        items: ["Stranice od 150 KM", "Shop od 600 KM"],
        palette: "ink",
      },
      {
        template: "price",
        eyebrow: "Stranice",
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
      "💵 Cijene na stolu, bez „kontaktirajte nas za ponudu“.\n\nCijene su javne. Ovo je okvir — tačnu ponudu dobijate prije početka.\n\nWEB STRANICE — od 150 KM. Landing ili jednostavna stranica. Uključeno: UI/UX dizajn, responzivni dizajn, kontakt forma, besplatna demo verzija, postavljanje hostinga i domene.\n\nWEB SHOPOVI — od 600 KM. Kompletan e-commerce: online plaćanje (Stripe, PayPal), admin panel, upravljanje zalihama, demo se ne plaća.\n\nMOBILNE APLIKACIJE — po dogovoru. iOS i/ili Android, backend API, push notifikacije, objava na App Store.\n\nDomena i hosting se plaćaju direktno provideru — bez naše marže.",
    tags: ["cijene", "galerija", "150km", "600km", "sarajevo", "devlab"],
  },

  // ── 9. CIJENE ────────────────────────────────────────────────────────────
  {
    id: "p09",
    title: "Tri paketa. Tri jasne cijene. Bez iznenađenja.",
    template: "list",
    category: "ponuda",
    layout: "split",
    palette: "light",
    eyebrow: "Cijene",
    items: [
      "Web stranica — od 150 KM",
      "Web shop — od 600 KM",
      "Aplikacije i igrice — po dogovoru",
    ],
    caption:
      "💰 Tri paketa. Tri cijene. Nula iznenađenja.\n\nWeb Stranice — 150 KM\nLanding page ili jednostavna web stranica, UI/UX dizajn uključen, responzivni dizajn, kontakt forma, demo se ne plaća, postavljanje hostinga i domene.\n\nWeb Shopovi — 600 KM\nKompletan e-commerce sistem, UI/UX dizajn uključen, online plaćanje (Stripe, PayPal), admin panel, inventory management, demo se ne plaća.\n\nMobilne Aplikacije — po dogovoru\niOS i/ili Android development, UI/UX dizajn, backend API integracija, push notifications, user authentication, App Store deployment, dokumentacija.\n\nTačnu ponudu dajemo nakon besplatne konsultacije — bez skrivenih troškova.",
    tags: ["cijene", "paketi", "webstranice", "shopovi", "sarajevo", "devlab"],
  },

  // ── 10. KAKO RADIMO — GALERIJA ───────────────────────────────────────────
  {
    id: "p10",
    template: "cover",
    category: "izakulisa",
    layout: "center",
    palette: "mint",
    eyebrow: "Kako radimo",
    title: "Kako radimo: od prve poruke do gotovog sajta.",
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
      "⏱️ Od razgovora do objave — bez čekanja mjesecima.\n\nČetiri koraka od prvog razgovora do gotovog projekta:\n\n01 INICIJALNA KONSULTACIJA — razgovor o Vašim potrebama, ciljevima i očekivanjima. Definišemo scope projekta, tehnologije i timeline.\n\n02 GOTOVA VERZIJA I POTVRDA — izrađujemo besplatnu gotovu verziju u nekoliko dana. Vidite konkretan smjer projekta prije nego što potpišete bilo šta.\n\n03 RAZVOJ I IMPLEMENTACIJA — razvijamo Vaše digitalno rješenje koristeći moderne i provjerene tehnologije prilagođene Vašim potrebama.\n\n04 TESTIRANJE I ISPORUKA — temeljno testiranje, deployment i predaja projekta sa kompletnom dokumentacijom i obukom za korištenje.\n\nTek onda plaćate.",
    tags: ["kakoradimo", "proces", "galerija", "koraci", "sarajevo", "devlab"],
  },
];
