// ───────────────────────────────────────────────────────────────────────────
// OBJAVE 1–20 — SADRZAJ & PONUDA
// Prva trecina: upoznavanje, sta radimo, cijene, proces.
// Namjena: privuci ljude koji nas ne znaju i odmah im reci sta nudimo.
// ───────────────────────────────────────────────────────────────────────────

import type { AdPost } from "./postsData";

export const POSTS_1: AdPost[] = [
  {
    id: "p01",
    template: "title",
    category: "brend",
    layout: "center",
    palette: "dark",
    eyebrow: "DevForge",
    title: "Vaša firma nema web stranicu?",
    subtitle: "Napravimo Vam gotovu verziju — prije nego što platite ijednu marku.",
    caption:
      "Ako Vaša firma još nema web stranicu, ili ima onu koja ne radi na mobitelu — ovo je za Vas.\n\n" +
      "Napravimo Vam gotovu, radnu verziju stranice. Vidite je, prođete kroz nju, kažete šta mijenjati. Tek onda pričamo o plaćanju.\n\n" +
      "Bez predujma.\n" +
      "Bez rizika.\n\n" +
      "Javite nam se u DM — odgovaramo u roku od 10 minuta.",
    tags: ["webstranica", "webdizajn", "bosna", "sarajevo", "digitalnamarketing", "malibiznis", "devforge"],
  },
  {
    id: "p02",
    template: "price",
    category: "ponuda",
    layout: "split",
    palette: "teal",
    eyebrow: "Cijene",
    title: "Web stranice",
    value: "150 KM",
    items: ["Dizajn uključen", "Radi na mobitelu", "Osnovni SEO", "Kontakt forma", "Brzo učitavanje"],
    slides: [
      { template: "price", eyebrow: "Cijene", title: "Web stranice", value: "150 KM", items: ["Dizajn uključen", "Radi na mobitelu"] },
      { template: "list", eyebrow: "Šta je uključeno", title: "Bez doplate", items: ["Profesionalni dizajn", "Mobilna i tablet verzija", "Osnovni SEO", "Kontakt forma", "Brzo učitavanje"], palette: "light" },
      { template: "cta", eyebrow: "Besplatno", title: "Prva verzija Vas ne košta ništa.", subtitle: "Hosting i domena idu direktno provideru — bez naše marže." },
    ],
    caption:
      "Web stranica od 150 KM.\n\n" +
      "To nije promotivna cijena koja nestane sutra — to je naša stvarna početna cijena.\n\n" +
      "Ono što je UVIJEK uključeno, bez doplate:\n" +
      "• Profesionalni dizajn\n" +
      "• Prilagođeno mobitelu i tabletu\n" +
      "• Osnovna SEO podešavanja\n" +
      "• Kontakt forma\n" +
      "• Brzo učitavanje\n\n" +
      "Hosting i domena se plaćaju direktno provideru, oko 50–100 KM godišnje. Bez naše marže.\n\n" +
      "Javite nam se u DM i napravimo Vam prvu verziju besplatno.",
    tags: ["cijene", "webstranica", "webdizajn", "sarajevo", "bosna", "malibiznis", "devforge"],
  },
  {
    id: "p03",
    template: "price",
    category: "ponuda",
    layout: "photoBg",
    photo: "ai1",
    palette: "ink",
    eyebrow: "Cijene",
    title: "Web shopovi",
    value: "600 KM",
    items: ["Proizvodi i kategorije", "Korpa i naplata", "Upravljanje narudžbama", "Plaćanje karticom", "Dostava"],
    caption:
      "Web shop od 600 KM.\n\n" +
      "Za one koji stvarno prodaju online — ne samo prikazuju.\n\n" +
      "Šta dobijate:\n" +
      "• Proizvodi i kategorije\n" +
      "• Korpa i checkout\n" +
      "• Plaćanje karticom ili pouzećem\n" +
      "• Upravljanje narudžbama\n" +
      "• Integracija dostave\n" +
      "• Sve iz web stranice (dizajn, SEO, mobilna verzija)\n\n" +
      "Isti princip — prvo vidite radnu verziju, tek onda plaćate.\n\n" +
      "DM za detalje.",
    tags: ["webshop", "onlineshop", "ecommerce", "sarajevo", "bosna", "malibiznis", "prodaja", "devforge"],
  },
  {
    id: "p04",
    template: "process",
    category: "sadrzaj",
    layout: "offset",
    palette: "mint",
    eyebrow: "Kako radimo",
    title: "Četiri koraka do stranice",
    items: ["Javite se na DM ili Viber", "Napravimo besplatnu verziju", "Pregledate i tražite izmjene", "Tek onda plaćate"],
    slides: [
      { template: "process", eyebrow: "Kako radimo", title: "Četiri koraka", items: ["Javite se na DM ili Viber", "Napravimo besplatnu verziju", "Pregledate i tražite izmjene", "Tek onda plaćate"] },
      { template: "compare", eyebrow: "Zašto ovako", title: "Rizik je na nama", items: ["Platite pa vidite", "Bez probne verzije", "Iznenađenja na kraju", "Nema povratka", "Vidite pa platite", "Radna verzija", "Fiksna cijena", "Bez predujma"], palette: "sun" },
      { template: "cta", eyebrow: "Krenimo", title: "Prva verzija je besplatna.", subtitle: "Ne plaćate ništa dok ne kažete da je dobro.", palette: "dark" },
    ],
    caption:
      "Naš proces je namjerno okrenut — vi prvo vidite, pa plaćate.\n\n" +
      "1. Javite se\n" +
      "DM, Viber, WhatsApp ili telefon. Kažete nam čime se bavite i šta Vam treba.\n\n" +
      "2. Besplatna verzija\n" +
      "U 2–5 dana napravimo radnu stranicu s Vašim imenom, bojama i sadržajem.\n\n" +
      "3. Pregled\n" +
      "Skrolate, klikate, kažete šta mijenjati. Bez žurbe.\n\n" +
      "4. Plaćanje\n" +
      "Tek kad ste zadovoljni.\n\n" +
      "Bez predujma, bez rizika.",
    tags: ["proces", "webdizajn", "transparentnost", "sarajevo", "bosna", "malibiznis", "devforge"],
  },
  {
    id: "p05",
    template: "compare",
    category: "edukacija",
    layout: "stamp",
    palette: "teal",
    eyebrow: "Razlika",
    title: "Šta dobijate, a šta ne",
    items: ["Dizajn posebno naplaćen", "Ne radi na mobitelu", "Sporo se učitava", "Bez SEO podešavanja", "Dizajn uključen", "Radi na svakom ekranu", "Brzo učitavanje", "Osnovni SEO uključen"],
    caption:
      "Većina agencija naplaćuje dizajn kao dodatnu stavku. Mi ne.\n\n" +
      "PRIJE (klasična ponuda):\n" +
      "✕ Dizajn se plaća posebno\n" +
      "✕ Ne radi na mobitelu\n" +
      "✕ Sporo se učitava\n" +
      "✕ Bez SEO podešavanja\n\n" +
      "KOD NAS:\n" +
      "✓ Dizajn uključen u cijenu\n" +
      "✓ Radi na svakom ekranu\n" +
      "✓ Brzo učitavanje\n" +
      "✓ Osnovni SEO uključen\n\n" +
      "Nema skrivenih troškova. Cijena koju vidite je cijena koju plaćate.",
    tags: ["webdizajn", "transparentnost", "cijene", "sarajevo", "bosna", "malibiznis", "devforge"],
  },
  {
    id: "p06",
    template: "number",
    category: "dokaz",
    layout: "center",
    palette: "light",
    eyebrow: "Portfolio",
    title: "gotovih projekata",
    value: "8",
    valueNote: "web stranice, shopovi i AI sistemi",
    caption:
      "Osam gotovih projekata — i svaki je stvarno objavljen, ne samo „demo na slici”.\n\n" +
      "Web stranice, web shopovi, mobilne aplikacije i AI sistemi.\n\n" +
      "Ne pričamo o tome šta možemo. Pokazujemo šta smo napravili.\n\n" +
      "Pogledajte ih na našem sajtu → /projekti\n\n" +
      "Ako želite da i Vaš rad bude tu — DM.",
    tags: ["portfolio", "webdizajn", "radovi", "sarajevo", "bosna", "devforge", "agencija"],
  },
  {
    id: "p07",
    template: "quote",
    category: "brend",
    layout: "photo",
    photo: "office",
    palette: "ink",
    eyebrow: "Naš princip",
    title: "Ne prodajemo obećanja. Pokazujemo rezultat.",
    subtitle: "Zato prva verzija uvijek ide besplatno.",
    caption:
      "„Ne prodajemo obećanja. Pokazujemo rezultat.”\n\n" +
      "To nije marketinška fraza — to je razlog zašto radimo ovako:\n\n" +
      "Prije nego što platite, dobijate stvarnu, radnu stranicu. Ne mockup na slici, ne „koncept u Figmi”. Prava stranica u browseru.\n\n" +
      "Možete je otvoriti na svom mobitelu. Poslati kolegi. Pokazati mušterijama.\n\n" +
      "Ako Vam se ne svidi — ne plaćate ništa.\n\n" +
      "DM kad ste spremni.",
    tags: ["webdizajn", "povjerenje", "transparentnost", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p08",
    template: "list",
    category: "edukacija",
    layout: "band",
    palette: "mint",
    eyebrow: "Zašto mobitel",
    title: "Šta mora imati svaka stranica",
    items: ["Radi besprijekorno na mobitelu", "Učita se za manje od 3 sekunde", "Naslovna govori šta radite u 5 sekundi", "Kontakt je vidljiv bez skrolanja", "Ima jasan poziv na akciju"],
    caption:
      "Pet stvari koje stranica MORA imati — bez njih ste izgubili posjetioca u prvoj sekundi.\n\n" +
      "1. Radi na mobitelu\n" +
      "Više od 70% ljudi otvori stranicu na telefonu. Ako je neuredna — otišli su.\n\n" +
      "2. Učita se za manje od 3 sekunde\n" +
      "Svaka sekunda čekanja = ljudi koji odustaju.\n\n" +
      "3. Naslovna govori šta radite\n" +
      "U 5 sekundi mora biti jasno čime se bavite.\n\n" +
      "4. Kontakt je odmah vidljiv\n" +
      "Ako moraju tražiti broj — tražiće kod konkurencije.\n\n" +
      "5. Jasan poziv na akciju\n" +
      "Šta da urade? PISATI im.\n\n" +
      "Sve ovo je kod nas uvijek uključeno.",
    tags: ["webdizajn", "savjeti", "mobitelt", "uxdesign", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p09",
    template: "list",
    category: "sadrzaj",
    layout: "offset",
    palette: "sun",
    eyebrow: "Usluge",
    title: "Čime se bavimo",
    items: ["Web stranice — od 150 KM", "Web shopovi — od 600 KM", "Mobilne aplikacije — po dogovoru", "2D igrice — po dogovoru", "AI sistemi — po dogovoru"],
    slides: [
      { template: "list", eyebrow: "Usluge", title: "Čime se bavimo", items: ["Web stranice", "Web shopovi", "Mobilne aplikacije", "2D igrice", "AI sistemi"] },
      { template: "price", eyebrow: "Cijene", title: "Web stranice", value: "150 KM", items: ["Dizajn uključen", "Mobilna verzija"], palette: "dark" },
      { template: "price", eyebrow: "Cijene", title: "Web shopovi", value: "600 KM", items: ["Korpa i naplata", "Upravljanje narudžbama"] },
      { template: "cta", eyebrow: "Ostalo", title: "App, igrice i AI — po dogovoru.", subtitle: "Recite nam šta Vam treba, dajemo tačnu cijenu.", palette: "teal" },
    ],
    caption:
      "Pet stvari radimo — i svaku radimo do kraja.\n\n" +
      "🌐 Web stranice — od 150 KM\n" +
      "Prezentacije, portfolio, landing stranice.\n\n" +
      "🛒 Web shopovi — od 600 KM\n" +
      "Online prodavnice s korpom, plaćanjem i dostavom.\n\n" +
      "📱 Mobilne aplikacije — po dogovoru\n" +
      "Android i iOS, od ideje do objave na store.\n\n" +
      "🎮 2D igrice — po dogovoru\n" +
      "Web i mobilne igre s custom grafikom.\n\n" +
      "🤖 AI sistemi — po dogovoru\n" +
      "Chat asistenti i AI recepcionar koji prima pozive 24/7.\n\n" +
      "DM za ono što Vas zanima.",
    tags: ["usluge", "webdizajn", "webshop", "mobilneaplikacije", "aisistemi", "sarajevo", "devforge"],
  },
  {
    id: "p10",
    template: "quote",
    category: "brend",
    layout: "stamp",
    palette: "light",
    eyebrow: "Naš pristup",
    title: "Nije gotovo dok Vi ne kažete da je gotovo.",
    subtitle: "Izmjene dizajna tokom razvoja su uvijek besplatne.",
    caption:
      "Mnoge agencije naplaćuju „dodatne izmjene”. Mi ne.\n\n" +
      "Tokom razvoja možete tražiti koliko god izmjena želite — boje, raspored, tekstovi, slike. Sve je uključeno.\n\n" +
      "Zašto? Jer stranica je Vaša. Ako Vama nije dobra, nije dobra ni nama.\n\n" +
      "Gotovo je tek kad Vi kažete da je gotovo.\n\n" +
      "DM da počnemo.",
    tags: ["webdizajn", "kvalitet", "transparentnost", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p11",
    template: "number",
    category: "edukacija",
    layout: "photoTop",
    photo: "ai1",
    palette: "ink",
    eyebrow: "Statistika",
    title: "ljudi otvori stranicu na mobitelu",
    value: "70%",
    valueNote: "zato mobilna verzija nije opcija",
    caption:
      "Sedam od deset ljudi će Vašu stranicu otvoriti na telefonu.\n\n" +
      "Ako na telefonu izgleda loše — izgubili ste 70% posjetilaca prije nego što su pročitali prvu rečenicu.\n\n" +
      "Zato kod nas mobilna verzija nije „dodatna usluga”. Nije „premium paket”. Uvijek je uključena.\n\n" +
      "Otvori svoju stranicu na telefonu. Ako moraš zumirati da pročitaš tekst — vrijeme je za novu.\n\n" +
      "DM za besplatnu procjenu.",
    tags: ["mobitelt", "webdizajn", "statistika", "uxdesign", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p12",
    template: "process",
    category: "ponuda",
    layout: "split",
    palette: "mint",
    eyebrow: "Bez rizika",
    title: "Zašto besplatna verzija",
    items: ["Vidite stvarnu stranicu, ne sliku", "Možete je otvoriti na mobitelu", "Pokažete je kolegama i mušterijama", "Ako ne valja — ne plaćate"],
    caption:
      "Zašto radimo besplatnu verziju prije plaćanja?\n\n" +
      "Zato što slika na ekranu nije isto što i stranica u browseru.\n\n" +
      "1. Stvarna stranica, ne mockup\n" +
      "Možete je skrolati, klikati, testirati.\n\n" +
      "2. Na svom mobitelu\n" +
      "Vidite tačno kako će izgledati Vašim mušterijama.\n\n" +
      "3. Pokažete drugima\n" +
      "Pošaljite link kolegi ili porodici. Neka kažu šta misle.\n\n" +
      "4. Ako ne valja — ništa ne plaćate\n" +
      "Bez predujma. Bez obaveze.\n\n" +
      "Tako se gradi povjerenje.",
    tags: ["besplatno", "webdizajn", "povjerenje", "sarajevo", "bosna", "malibiznis", "devforge"],
  },
  {
    id: "p13",
    template: "title",
    category: "edukacija",
    layout: "band",
    palette: "sun",
    eyebrow: "Savjet",
    title: "Instagram profil nije web stranica.",
    subtitle: "I nikad ga ne može zamijeniti — evo zašto.",
    caption:
      "Često čujemo: „Ma imam Instagram, dovoljno mi je.”\n\n" +
      "Nije. Evo razlike:\n\n" +
      "Instagram profil:\n" +
      "• Nestaje ako platforma padne ili ugasi profil\n" +
      "• Ne pojavljuje se u Google pretrazi\n" +
      "• Nema mjesta za cijene, usluge, opis\n" +
      "• Konkurencija je uvijek pored\n\n" +
      "Web stranica:\n" +
      "• Vaša je, zauvijek\n" +
      "• Google je nalazi\n" +
      "• Sve informacije na jednom mjestu\n" +
      "• Radite šta želite\n\n" +
      "Instagram je izlog. Web stranica je kuća.",
    tags: ["instagram", "webstranica", "savjeti", "sarajevo", "bosna", "malibiznis", "devforge"],
  },
  {
    id: "p14",
    template: "list",
    category: "ponuda",
    layout: "offset",
    palette: "dark",
    eyebrow: "Uključeno",
    title: "Šta dobijate za 150 KM",
    items: ["Profesionalni dizajn", "Mobilna i tablet verzija", "Osnovni SEO (meta naslovi i opisi)", "Kontakt forma", "Brzo učitavanje", "Besplatne izmjene tokom razvoja"],
    caption:
      "Da ne bude zabune — evo šta 150 KM stvarno pokriva.\n\n" +
      "✓ Profesionalni dizajn\n" +
      "Ne template. Dizajn prilagođen Vašoj firmi.\n\n" +
      "✓ Mobilna i tablet verzija\n" +
      "Radi na svakom ekranu.\n\n" +
      "✓ Osnovni SEO\n" +
      "Meta naslovi i opisi — da Vas Google može naći.\n\n" +
      "✓ Kontakt forma\n" +
      "Da Vam ljudi mogu pisati direktno.\n\n" +
      "✓ Brzo učitavanje\n" +
      "Bez čekanja.\n\n" +
      "✓ Besplatne izmjene\n" +
      "Tokom razvoja — koliko god treba.\n\n" +
      "Šta NIJE uključeno: hosting i domena (oko 50–100 KM/god, direktno provideru).\n\n" +
      "DM.",
    tags: ["cijene", "webdizajn", "webstranica", "sarajevo", "bosna", "malibiznis", "devforge"],
  },
  {
    id: "p15",
    template: "compare",
    category: "edukacija",
    layout: "photoBg",
    photo: "office",
    palette: "teal",
    eyebrow: "Razlika",
    title: "Logo nije brend",
    items: ["Samo slika", "Nema pravila korištenja", "Nema paletu boja", "Nema ton komunikacije", "Cijeli vizualni sistem", "Pravila korištenja", "Paleta boja i fontova", "Jasan ton glasa"],
    caption:
      "Logo je dio brenda. Nije cijeli brend.\n\n" +
      "Logo bez sistema:\n" +
      "✕ Samo slika\n" +
      "✕ Nema pravila korištenja\n" +
      "✕ Nema palete boja\n" +
      "✕ Nema tona komunikacije\n\n" +
      "Brend:\n" +
      "✓ Cijeli vizualni sistem\n" +
      "✓ Pravila korištenja\n" +
      "✓ Paleta boja i fontova\n" +
      "✓ Jasan ton glasa\n\n" +
      "Ipak — većini malih firmi prvo treba stranica, ne brend priručnik. Zato dizajn radimo uz stranicu, od 100 KM.\n\n" +
      "DM.",
    tags: ["brending", "logo", "design", "sarajevo", "bosna", "malibiznis", "devforge"],
  },
  {
    id: "p16",
    template: "quote",
    category: "sadrzaj",
    layout: "center",
    palette: "light",
    eyebrow: "Naš pristup",
    title: "Brzo je važnije od savršenog.",
    subtitle: "Stranica koja je online danas vrijedi više od one koja je „savršena” za mjesec.",
    caption:
      "Beskrajno dotjerivanje je najčešći razlog zašto firma nikad ne dobije stranicu.\n\n" +
      "Mjesecima se čeka „pravi trenutak”, „bolji tekst”, „ljepša slika”.\n\n" +
      "A konkurencija je već online. Primaju pozive dok Vaš sajt još ne postoji.\n\n" +
      "Zato radimo ovako: napravimo radnu verziju u 2–5 dana, pustimo je online, i dotjerujemo u hodu.\n\n" +
      "Bolje online danas, nego savršeno nikad.\n\n" +
      "DM — krećemo ove sedmice.",
    tags: ["webdizajn", "produktivnost", "sarajevo", "bosna", "malibiznis", "devforge"],
  },
  {
    id: "p17",
    template: "list",
    category: "edukacija",
    layout: "split",
    palette: "ink",
    eyebrow: "Greške",
    title: "Četiri greške koje koštaju mušterija",
    items: ["Broj telefona nije vidljiv", "Nema cijene ni okvira", "Stranica se ne otvara na mobitelu", "Nema poziva na akciju"],
    caption:
      "Četiri greške koje sam vidio na desetinama stranica u BiH:\n\n" +
      "1. Broj telefona nije vidljiv\n" +
      "Ako moraju tražiti kontakt — tražit će kod konkurencije.\n\n" +
      "2. Nema cijene ni okvira\n" +
      "„Kontaktirajte nas za ponudu” plaši ljude. Okvirna cijena gradí povjerenje.\n\n" +
      "3. Ne otvara se na mobitelu\n" +
      "70% ljudi dolazi s telefona. Ako se raspada — izgubili ste ih.\n\n" +
      "4. Nema poziva na akciju\n" +
      "Posjetilac ne zna šta da uradi. Zato ode.\n\n" +
      "Sve četiri popravljamo u startu.",
    tags: ["savjeti", "webdizajn", "greske", "sarajevo", "bosna", "malibiznis", "devforge"],
  },
  {
    id: "p18",
    template: "cta",
    category: "ponuda",
    layout: "band",
    palette: "mint",
    eyebrow: "Besplatno",
    title: "Vaša stranica. Besplatno.",
    subtitle: "Napravimo gotovu verziju — vidite je prije nego što platite.",
    caption:
      "Evo kako počinjemo: napravimo Vašu stranicu. Besplatno.\n\n" +
      "Bez ugovora. Bez predujma. Bez „potpišite pa da vidite”.\n\n" +
      "Dobijete radnu stranicu s Vašim imenom, bojama i sadržajem. Otvorite je, pokažete mušterijama, kažete šta mijenjati.\n\n" +
      "Ako Vam se svidi — nastavljamo.\n" +
      "Ako ne — nema problema, ništa ne plaćate.\n\n" +
      "Javite nam se u DM s imenom firme. Odgovaramo u 10 minuta.",
    tags: ["besplatno", "webdizajn", "sarajevo", "bosna", "malibiznis", "devforge"],
  },
  {
    id: "p19",
    template: "number",
    category: "sadrzaj",
    layout: "photo",
    photo: "ai1",
    palette: "dark",
    eyebrow: "Brzina",
    title: "dana do prve verzije",
    value: "2–5",
    valueNote: "ne sedmica, ne mjeseci",
    caption:
      "Gotova verzija u 2 do 5 dana.\n\n" +
      "Ne mjesecima. Ne „javimo se za dvije sedmice”.\n\n" +
      "Zašto tako brzo? Zato što ne krećemo od nule — imamo sistem, komponente i dizajn jezik koji već radi. Vaše vrijeme trošimo na ono što je stvarno Vaše: sadržaj, boje, slike.\n\n" +
      "U 2–5 dana dobijate link koji možete otvoriti.\n\n" +
      "DM danas, stranica za par dana.",
    tags: ["brzina", "webdizajn", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p20",
    template: "title",
    category: "brend",
    layout: "stamp",
    palette: "dark",
    eyebrow: "DevForge",
    title: "Sarajevo. Radimo online. Cijela regija.",
    subtitle: "BiH, Hrvatska, Srbija, Crna Gora — sve na daljinu.",
    caption:
      "Radimo iz Sarajeva, ali lokacija nije prepreka.\n\n" +
      "Klijente primamo online — cijela Bosna i Hercegovina, Hrvatska, Srbija i Crna Gora. Sve ide na daljinu: dogovor, dizajn, odobrenje, objava.\n\n" +
      "Za klijente iz Sarajeva moguć je i sastanak uživo, uz kafu.\n\n" +
      "Sve ostalo — poruke, pozivi, video poziv ako treba.\n\n" +
      "DM bez obzira odakle ste.",
    tags: ["sarajevo", "bosna", "hrvatska", "srbija", "crnagora", "onlineposlovanje", "devforge"],
  },
];
