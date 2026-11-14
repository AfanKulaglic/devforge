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
    valueNote: "Bez uplate na početku. Napravimo sajt, pokažemo vam ga i tek onda razgovaramo o plaćanju. Ako vam se ne svidi, ne plaćate ništa i nemate nikakvu obavezu. Bez avansa, bez ugovora, bez rizika.",
    caption:
      "🛑 STOP. Ne plaćajte ništa unaprijed.\n\nVećina agencija traži 50% predujma prije nego što počne. Vi platite, pa vidite šta ste dobili.\n\nKod nas je obrnuto.\n\n0 KM predujma. Razvoj počinjemo na povjerenje. Plaćate tek kada je projekat gotov i kada ste u potpunosti zadovoljni rezultatom.\n\nPovjerenje gradimo na rezultatu, a ne na avansu.\n\nJavite se u DM — odgovaramo u 10 minuta.",
    tags: ["bezpredujma", "webdizajn", "agencija", "sarajevo", "devlab"],
  },

  // ── 2. POKREĆU BIZNIS WEB USLUGE ─────────────────────────────────────────
  {
    id: "p02",
    title: "Stranica, shop, aplikacija, igrica ili AI sistem — sve na jednom mjestu.",
    template: "title",
    category: "ponuda",
    layout: "center",
    palette: "ink",
    eyebrow: "Šta radimo",
    subtitle: "Ne morate tražiti tri firme. Jedan tim radi sve — od prve skice do puštanja u rad.",
    caption:
      "⚡ Vaš biznis treba biti na internetu. Danas.\n\nDigitalni proizvodi koji stvarno rade za Vaš biznis:\n\n— ✅ stranice koje pretvaraju posjetioce u klijente\n— 🔥 mobilne aplikacije za iOS i Android\n— 💡 2D igrice za web i mobilne\n— ⚡ AI sistemi koji odgovaraju umjesto Vas\n\nOd ideje do gotovog proizvoda za nekoliko sedmica. Izrađujemo besplatnu gotovu verziju za 5 dana — plaćate tek kada budete zadovoljni.\n\nSarajevo i cijela BiH. Bez kancelarije u centru i bez velikih režija.\n\nŠta Vama treba?",
    tags: ["webdizajn", "aplikacije", "igrice", "aisistemi", "sarajevo", "devlab"],
  },

  // ── 3. WEB STRANICA VEĆ OD 150 KM ────────────────────────────────────────
  {
    id: "p03",
    valueNote: "Dizajn, kod, domena i hosting — jedan trošak, bez dodataka. Gotova za 5 radnih dana, a platiti je trebate tek kad je vidite i kad vam se svidi.",
    template: "price",
    category: "ponuda",
    layout: "photoBot",
    photo: "web",
    palette: "tealwhite",
    eyebrow: "Cijena bez sitnih slova",
    title: "Kompletna stranica za 150 KM. Plaćate tek kad je vidite.",
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
    title: "Zašto firme biraju DevLab.",
    slides: [
      {
        template: "cover",
        eyebrow: "Zašto baš DevLab",
        title: "Zašto firme biraju baš DevLab.",
        accentWords: ["DevLab"],
        lead: "Agencija traži 50% unaprijed, prije nego što vidite ijedan piksel. Mi radimo obrnuto — prvo napravimo stranicu i pokažemo vam je na pravom linku. Ako vam se ne svidi, ne plaćate ništa.",
        items: [
          { icon: "coin", label: "0 KM unaprijed" },
          { icon: "clock", label: "Gotovo za 5 radnih dana" },
          { icon: "shield", label: "Cijene javne" },
        ],
        palette: "dark",
      },
      {
        template: "number",
        eyebrow: "Plaćanje unaprijed",
        title: "Ne tražimo ni marku prije nego što vidite svoju stranicu.",
        value: "0 KM",
        valueNote: "Većina agencija traži 50% unaprijed — dakle plaćate obećanje. Kod nas je obrnuto: stranica se prvo napravi, postavi na pravi link i vi je otvorite na svom telefonu. Tek kad je vidite gotovu i kad vam se svidi, dogovaramo plaćanje. Ako se ne svidi — ne plaćate ništa i nemate nikakvu obavezu prema nama.",
        palette: "dark",
      },
      {
        template: "number",
        eyebrow: "Rok izrade",
        title: "radnih dana od razgovora do stranice koju možete otvoriti.",
        value: "5",
        valueNote: "Prvi dan dobijete grubu strukturu da vidite pravac. Treći dan je stranica živa na linku — s vašim tekstom, vašim slikama i vašim bojama. Peti dan je gotova i radi na svakom telefonu. Za web shop je potrebno oko 10 radnih dana, jer se dodaju proizvodi i plaćanje.",
        palette: "ink",
      },
      {
        template: "list",
        eyebrow: "Uključeno u cijenu",
        title: "Sve što vam treba — bez ijedne doplate na kraju.",
        items: [
          {
            icon: "layers",
            label: "Dizajn i struktura",
            note: "Raspored, boje i fontovi rađeni za vaš biznis — ne gotov šablon.",
          },
          {
            icon: "monitor",
            label: "Mobilna verzija",
            note: "Više od 70% ljudi otvori sajt na telefonu. Kod nas to nije dodatak.",
          },
          {
            icon: "tools",
            label: "Admin panel",
            note: "Samostalno mijenjate tekstove, slike i cijene — bez programera.",
          },
          {
            icon: "check",
            label: "4 besplatne revizije",
            note: "Tražite izmjene dok ne bude kako želite. Bez dodatnih troškova.",
          },
        ],
        palette: "dark",
      },
      {
        template: "compare",
        eyebrow: "Razlika",
        title: "Agencija ili DevLab? Stavka po stavku.",
        items: [
          { label: "50% unaprijed", note: "Plaćate obećanje" },
          { label: "2–4 sedmice čekanja", note: "Bez linka do kraja" },
          { label: "Vidite tek finalno", note: "Bez probne verzije" },
          { label: "Doplate na kraju", note: "Cijena naraste" },
          { label: "0 KM unaprijed", note: "Plaćate tek na kraju" },
          { label: "Gotovo za 5 dana", note: "Link odmah, ne sedmicama" },
          { label: "Vidite prije plaćanja", note: "Živa stranica na linku" },
          { label: "Cijene javne", note: "od 150 KM, bez dogovora" },
        ],
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
    title: "Sve što vaš biznis treba.",
    // Manji font labela/biljeske u listi — samo za p05. Globalne velicine
    // u formBlocks() ostaju iste za 26 ostalih "list"/"process" objava.
    tightList: true,
    // Podnaslov NE nabraja usluge — to lista vec radi ispod. Nosi RAZLOG
    // zasto jedan tim: nema podugovaranja, nema cekanja na treceg.
    subtitle: "Ne prepuštamo dio posla dalje. Radimo ga mi.",
    items: [
      {
        icon: "web",
        label: "Web stranice i shopovi",
        note: "Od predstavljanja do prodaje. Gotovo za 5 dana, od 150 KM.",
      },
      {
        icon: "game",
        label: "2D igrice za web i mobilne",
        note: "Od jednostavnih do obrazovnih — po vašoj mjeri.",
      },
      {
        icon: "app",
        label: "Mobilne aplikacije",
        note: "Jedan tim, obje platforme. Od ideje do trgovine.",
      },
      {
        icon: "ai",
        label: "AI sistemi",
        note: "Chat asistenti, automatizacija i AI rješenja — po mjeri projekta.",
      },
    ],
    caption:
      "🎯 Sve što vaš biznis treba.\n\n" +
      "Ne prepuštamo dio posla dalje. Radimo ga mi — od prve skice do dana kad stranica krene raditi.\n\n" +
      "Zašto je to važnije nego što izgleda:\n" +
      "Kad firma radi samo jedan dio, a ostalo daje dalje, vi na kraju razgovarate s tri osobe koje ne znaju šta je druga uradila. Rok se produži, cijena naraste, a vi ne znate kome se javiti kad nešto ne radi.\n\n" +
      "Kod nas je drugačije: jedna osoba vodi vaš projekat od početka do kraja i odgovara vam na svako pitanje.\n\n" +
      "Šta dobijete:\n" +
      "1. WEB STRANICE I SHOPOVI — od predstavljanja do prodaje. Gotovo za 5 dana, od 150 KM.\n" +
      "2. 2D IGRICE — za web i mobilne, sa vašim brendom.\n" +
      "3. MOBILNE APLIKACIJE — iOS i Android, od ideje do objave u trgovinama.\n" +
      "4. AI SISTEMI — chat asistenti, automatizacija i AI rješenja po mjeri.\n\n" +
      "Jedan od AI projekata koje smo radili je Recello — AI recepcionist za zakazivanje termina.\n\n" +
      "Ne morate tražiti pet firmi i spajati ih sami. Javite se u DM i recite šta vam treba — ostatak je naš posao.",
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
    title: "Stranice, shopovi, aplikacije, igrice i AI.",
    slides: [
      {
        template: "cover",
        eyebrow: "Naše usluge",
        title: "Stranice, shopovi, aplikacije, igrice i AI.",
        // Podnaslov nosi POSLJEDICU za klijenta, ne ponavlja listu ispod.
        subtitle: "Pet usluga. Sve od istog tima. Sve po javnoj cijeni.",
        accentWords: [],
        lead: "Radimo stranice, igrice, aplikacije i AI asistente. Bez podugovaranja i bez posrednika — isti tim radi sve, pa se dijelovi poklapaju bez duplih troškova.",
        items: [
          { icon: "web", label: "Stranice i shopovi" },
          { icon: "game", label: "2D igrice" },
          { icon: "app", label: "Mobilne aplikacije" },
          { icon: "ai", label: "AI asistenti" },
        ],
        palette: "dark",
      },
      {
        template: "list",
        eyebrow: "01 · Stranice",
        title: "Stranice i shopovi",
        subtitle: "Od jedne stranice do shopa koji sam prima narudžbe.",
        items: [
          {
            icon: "web",
            label: "Landing page",
            note: "Jedna stranica, jedan cilj — da posjetilac ostavi broj.",
          },
          {
            icon: "monitor",
            label: "Korporativna stranica",
            note: "Predstavljanje, usluge, galerija i kontakt. Do 5 podstranica.",
          },
          {
            icon: "shop",
            label: "Web shop",
            note: "Proizvodi, korpa i plaćanje. Sami dodajete artikle.",
          },
          {
            icon: "tools",
            label: "Web aplikacija",
            note: "Prijava, baza podataka i panel — kad sajt treba da radi.",
          },
        ],
        palette: "dark",
      },
      {
        template: "list",
        eyebrow: "02 · Igrice",
        title: "2D igrice za web i mobilne",
        subtitle: "Igra ljude zadrži duže od oglasa — i podijele je sami.",
        items: [
          {
            icon: "bolt",
            label: "Marketing igre",
            note: "Nagradna igra uz kampanju. Prikuplja kontakte i širi brend.",
          },
          {
            icon: "layers",
            label: "Educational igre",
            note: "Učenje kroz igru — za škole, kurseve i obuke zaposlenih.",
          },
          {
            icon: "game",
            label: "Casual igre",
            note: "Kratke igre za pauzu. Rade na webu i na telefonu.",
          },
          {
            icon: "check",
            label: "S vašim brendom",
            note: "Boje, logo i likovi prilagođeni vašem brendu.",
          },
        ],
        palette: "ink",
      },
      {
        template: "list",
        eyebrow: "03 · Aplikacije",
        title: "Mobilne aplikacije",
        subtitle: "Jedna aplikacija, obje platforme — bez duplog razvoja.",
        items: [
          {
            icon: "app",
            label: "iOS i Android",
            note: "Jedan kod, dvije trgovine. Isti izgled na oba sistema.",
          },
          {
            icon: "tools",
            label: "Flutter i React Native",
            note: "Provjerene tehnologije — lakše ih je kasnije održavati.",
          },
          {
            icon: "chat",
            label: "Push notifikacije",
            note: "Povratna vijest kupcu: narudžba, termin ili akcija.",
          },
          {
            icon: "rocket",
            label: "App Store i Play",
            note: "Objavu u trgovinama radimo mi — vi ne dirate papirologiju.",
          },
        ],
        palette: "dark",
      },
      {
        template: "list",
        eyebrow: "04 · AI",
        title: "AI asistenti koji rade dok vi spavate",
        subtitle: "Ne propuštate pozive noću, vikendom ni za vrijeme ručka.",
        items: [
          {
            icon: "ai",
            label: "AI recepcionar",
            note: "Javlja se na poziv, razumije pitanje i zakaže termin.",
          },
          {
            icon: "chat",
            label: "Chat na sajtu",
            note: "Odgovara na ista pitanja umjesto vas — bez čekanja.",
          },
          {
            icon: "layers",
            label: "Baza znanja",
            note: "Uči iz vaših cjenovnika, usluga i radnog vremena.",
          },
          {
            icon: "clock",
            label: "Radi 24/7",
            note: "Bez pauze, bez bolovanja i bez dodatne plate.",
          },
        ],
        palette: "ink",
      },
      {
        template: "cta",
        eyebrow: "Počnite",
        title: "Prva verzija je besplatna.",
        lead: "Recite nam šta vam treba. Napravimo prvu verziju, pokažemo je na pravom linku — i tek onda razgovaramo o plaćanju.",
        items: [
          { icon: "web", label: "Stranice od 150 KM" },
          { icon: "shop", label: "Shopovi od 600 KM" },
          { icon: "shield", label: "0 KM unaprijed" },
        ],
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
    title: "Sve što vaš projekat treba. Bez doplata.",
    template: "list",
    category: "ponuda",
    // `band` je crtao okvir oko sadrzaja (stroke 1.5) — uklonjen, sad je `center`.
    layout: "center",
    palette: "mint",
    eyebrow: "Sve uključeno",
    subtitle: "Stranica nije samo dizajn. Ovo ide uz nju, bez doplate.",
    items: [
      {
        icon: "tools",
        label: "API i integracije",
        note: "Povezivanje s CRM, ERP i dostavnim službama.",
      },
      {
        icon: "monitor",
        label: "Admin panel",
        note: "Sami mijenjate tekstove, slike i proizvode.",
      },
      {
        icon: "coin",
        label: "Plaćanje karticom",
        note: "Kartice i PayPal — novac ide direktno vama.",
      },
      {
        icon: "shield",
        label: "Domena, email i SSL",
        note: "Postavljamo ih, a plaćate provideru bez naše marže.",
      },
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
        title: "Cijene bez sitnih slova",
        lead: "Nema onoga kontaktirajte nas za ponudu. Brojevi su javni, a tačnu ponudu dobijate prije početka — ne poslije.",
        items: [
          { icon: "web", label: "Stranice od 150 KM" },
          { icon: "shop", label: "Shop od 600 KM" },
          { icon: "shield", label: "0 KM unaprijed" },
        ],
        palette: "ink",
      },
      {
        template: "price",
        eyebrow: "01 · Stranice",
        title: "Landing ili korporativna stranica",
        value: "150 KM",
        valueNote: "Dizajn, mobilna verzija, kontakt forma i admin panel — sve u cijeni.",
        items: [
          { icon: "layers", label: "UI/UX dizajn" },
          { icon: "monitor", label: "Mobilna verzija" },
          { icon: "chat", label: "Kontakt forma" },
          { icon: "tools", label: "Admin panel" },
        ],
        palette: "ink",
      },
      {
        template: "price",
        eyebrow: "02 · Web shopovi",
        title: "Kompletan e-commerce sistem",
        value: "600 KM",
        valueNote: "Katalog, korpa i plaćanje — kupac prolazi od pregleda do potvrde bez zastoja.",
        items: [
          { icon: "shop", label: "Katalog i korpa" },
          { icon: "coin", label: "Kartice i PayPal" },
          { icon: "monitor", label: "Upravljanje narudžbama" },
          { icon: "check", label: "Demo se ne plaća" },
        ],
        palette: "dark",
      },
      {
        template: "price",
        eyebrow: "03 · Aplikacije i AI",
        title: "Mobilne aplikacije i AI sistemi",
        value: "Dogovor",
        valueNote: "Cijena zavisi od broja funkcionalnosti. Recite šta vam treba — damo broj isti dan.",
        items: [
          { icon: "app", label: "iOS i Android" },
          { icon: "tools", label: "Backend i baza" },
          { icon: "ai", label: "AI asistent" },
          { icon: "rocket", label: "Objava u trgovinama" },
        ],
        palette: "ink",
      },
      {
        template: "list",
        eyebrow: "U svakoj cijeni",
        title: "Ovo je uvijek uključeno",
        subtitle: "Bez doplata i bez iznenađenja na kraju.",
        items: [
          {
            icon: "layers",
            label: "UI/UX dizajn",
            note: "Prvo izgled, pa kod. Ništa se ne gradi naslijepo.",
          },
          {
            icon: "monitor",
            label: "Mobilna verzija",
            note: "Ista stranica radi na telefonu, tabletu i računaru.",
          },
          {
            icon: "tools",
            label: "Admin panel",
            note: "Sami mijenjate tekstove, slike i proizvode.",
          },
          {
            icon: "check",
            label: "4 revizije",
            note: "Četiri kruga ispravki su u cijeni, ne naplaćuju se.",
          },
        ],
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
    subtitle: "Izaberite paket — ili nas pitajte šta vam treba.",
    items: [
      {
        icon: "web",
        label: "Web stranica — od 150 KM",
        note: "Dizajn, mobilna verzija, kontakt forma i admin panel.",
      },
      {
        icon: "shop",
        label: "Web shop — od 600 KM",
        note: "Katalog, korpa, plaćanje karticom i upravljanje narudžbama.",
      },
      {
        icon: "app",
        label: "Aplikacije i igrice — dogovor",
        note: "iOS i Android, ili igrica za web. Cijena zavisi od obima.",
      },
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
        title: "Četiri koraka. Prvi je razgovor.",
        lead: "Ne tražimo potpis prije nego što vidite stranicu. Prvo razgovor, onda gotova verzija na pravom linku — tek nakon toga razvoj.",
        items: [
          { icon: "chat", label: "Konsultacija" },
          { icon: "rocket", label: "Gotova verzija" },
          { icon: "tools", label: "Razvoj" },
          { icon: "check", label: "Isporuka" },
        ],
        palette: "mint",
      },
      {
        template: "process",
        eyebrow: "01 · Razgovor",
        title: "Inicijalna konsultacija",
        subtitle: "Dvadeset minuta razgovora — bez prezentacija i bez ugovora.",
        items: [
          {
            icon: "chat",
            label: "Vaše potrebe",
            note: "Šta vam treba i šta vas trenutno koči.",
          },
          {
            icon: "bolt",
            label: "Ciljevi",
            note: "Više poziva, više narudžbi ili samo da vas ima na Google-u.",
          },
          {
            icon: "layers",
            label: "Obim posla",
            note: "Koliko stranica, koje funkcije i šta sve ulazi u cijenu.",
          },
          {
            icon: "clock",
            label: "Rok",
            note: "Kad vam treba gotovo — i da li je realno.",
          },
        ],
        palette: "mint",
      },
      {
        template: "process",
        eyebrow: "02 · Bez plaćanja",
        title: "Besplatna gotova verzija",
        subtitle: "Ovo je korak zbog kojeg plaćate tek kad ste zadovoljni.",
        items: [
          {
            icon: "clock",
            label: "Za 5 radnih dana",
            note: "Ne mockup i ne slajdovi — stvarna stranica.",
          },
          {
            icon: "web",
            label: "Prava stranica",
            note: "Radi na telefonu i računaru, s vašim tekstovima.",
          },
          {
            icon: "rocket",
            label: "Na pravom linku",
            note: "Otvorite je na svom telefonu i pokažete kolegama.",
          },
          {
            icon: "shield",
            label: "Bez obaveze",
            note: "Ne svidi se — ne plaćate i ne dugujete ništa.",
          },
        ],
        palette: "dark",
      },
      {
        template: "process",
        eyebrow: "03 · Razvoj",
        title: "Razvoj i implementacija",
        subtitle: "Tek sada kreće pravi posao — i vidite ga kako raste.",
        items: [
          {
            icon: "tools",
            label: "Moderne tehnologije",
            note: "Brze stranice koje se dobro otvaraju i na slabijoj vezi.",
          },
          {
            icon: "layers",
            label: "Provjeren stack",
            note: "Ne eksperimentišemo na vašem projektu.",
          },
          {
            icon: "check",
            label: "Prilagođeno vama",
            note: "Ništa iz šablona. Sadržaj i funkcije po vašoj mjeri.",
          },
          {
            icon: "chat",
            label: "Redovni pregledi",
            note: "Javljamo se s napretkom — ne nestajemo na mjesec.",
          },
        ],
        palette: "mint",
      },
      {
        template: "process",
        eyebrow: "04 · Isporuka",
        title: "Testiranje i isporuka",
        subtitle: "Predajemo projekt koji vi možete mijenjati sami.",
        items: [
          {
            icon: "check",
            label: "Temeljno testiranje",
            note: "Forme, plaćanje i brzina — provjereno prije objave.",
          },
          {
            icon: "rocket",
            label: "Postavljanje online",
            note: "Domena, hosting i email rade od prvog dana.",
          },
          {
            icon: "layers",
            label: "Dokumentacija",
            note: "Kratko uputstvo šta smijete mijenjati i kako.",
          },
          {
            icon: "monitor",
            label: "Obuka",
            note: "Prolazimo kroz panel dok vi ne budete sigurni.",
          },
        ],
        palette: "dark",
      },
    ],
    caption:
      "⏱️ Od razgovora do objave — bez čekanja mjesecima.\n\nČetiri koraka od prvog razgovora do gotovog projekta:\n\n01 INICIJALNA KONSULTACIJA — razgovor o Vašim potrebama, ciljevima i očekivanjima. Definišemo scope projekta, tehnologije i timeline.\n\n02 GOTOVA VERZIJA I POTVRDA — izrađujemo besplatnu gotovu verziju u nekoliko dana. Vidite konkretan smjer projekta prije nego što potpišete bilo šta.\n\n03 RAZVOJ I IMPLEMENTACIJA — razvijamo Vaše digitalno rješenje koristeći moderne i provjerene tehnologije prilagođene Vašim potrebama.\n\n04 TESTIRANJE I ISPORUKA — temeljno testiranje, deployment i predaja projekta sa kompletnom dokumentacijom i obukom za korištenje.\n\nTek onda plaćate.",
    tags: ["kakoradimo", "proces", "galerija", "koraci", "sarajevo", "devlab"],
  },
];
