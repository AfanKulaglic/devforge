import type { AdPost } from "./postsData";

// ───────────────────────────────────────────────────────────────────────────
// OBJAVE 1–20 — SVE SA HOME PAGE-A
//
// Izvor: src/App.tsx — `benefits` (4), `services` (4), hero, deliverables.
// Ništa izmišljeno. Sve što je na slikama postoji na sajtu.
//
// 4 BENEFITA (glavna poruka):
//   1. Bez predujma — plaćate tek kada ste zadovoljni
//   2. Besplatna gotova verzija za 5 dana — bez obaveze
//   3. Vlastiti admin panel — sami mijenjate sadržaj
//   4. Transparentne cijene bez skrivenih troškova
//
// 4 USLUGE: Web stranice · 2D igrice · Mobilne aplikacije · AI sistemi
// ───────────────────────────────────────────────────────────────────────────

export const POSTS_1: AdPost[] = [
  {
    id: "p01",
    template: "number",
    category: "ponuda",
    layout: "photoBg",
    photo: "hero",
    palette: "dark",
    eyebrow: "Bez predujma",
    title: "predujma. Plaćate tek kad ste zadovoljni",
    value: "0 KM",
    valueNote: "Rizik je na nama, ne na Vama.",
    slides: [
      {
        template: "cover",
        eyebrow: "Galerija",
        title: "Kako radimo bez predujma",
        items: ["0 KM unaprijed", "Vidite prvo", "Platite na kraju"],
        palette: "dark",
      },
      {
        template: "number",
        eyebrow: "Bez predujma",
        title: "predujma. Plaćate tek kad ste zadovoljni",
        value: "0 KM",
        valueNote: "Rizik je na nama, ne na Vama.",
      },
      {
        template: "compare",
        eyebrow: "Razlika",
        title: "Kako rade drugi vs. kako mi radimo",
        items: ["Predujam 50%", "Platite pa vidite", "Rizik na Vama", "Nema povratka", "0 KM predujma", "Vidite pa platite", "Rizik na nama", "Bez obaveze"],
        palette: "ink",
      },
      {
        template: "list",
        eyebrow: "Kako ide",
        title: "Tri koraka bez rizika",
        items: ["Javite se — bez obaveze", "Dobijete gotovu verziju", "Plaćate kad ste zadovoljni"],
        palette: "teal",
      },
      {
        template: "cta",
        eyebrow: "Počnite",
        title: "Ne plaćate ništa dok ne kažete da je dobro.",
        subtitle: "Javite nam se u DM — odgovaramo u 10 minuta.",
        palette: "sun",
      },
    ],
    caption:
      "Većina agencija traži 50% predujma prije nego što počne. Vi platite, pa vidite šta ste dobili.\n\n" +
      "Kod nas je obrnuto.\n\n" +
      "0 KM predujma. Razvoj počinjemo na povjerenje. Plaćate tek kada je projekat gotov i kada ste u potpunosti zadovoljni rezultatom.\n\n" +
      "Sav rizik je na nama. Vi nemate šta izgubiti.\n\n" +
      "Zašto ovo radimo: jer je najveći strah kupca „šta ako platim i ne bude kako sam zamislio“. Mi taj strah uzimamo na sebe.\n\n" +
      "Javite se u DM — odgovaramo u 10 minuta.",
    tags: ["bezpredujma", "webdizajn", "agencija", "povjerenje", "sarajevo", "devforge"],
  },
  {
    id: "p02",
    template: "title",
    category: "ponuda",
    layout: "photoTop",
    photo: "web",
    palette: "ink",
    eyebrow: "Besplatno",
    title: "Gotova verzija u 5 dana. Besplatno.",
    subtitle: "Vidite stranicu prije nego što potpišete bilo šta.",
    slides: [
      {
        template: "cover",
        eyebrow: "Galerija",
        title: "Šta dobijete za 5 dana",
        items: ["Prava stranica", "Na pravom linku", "Bez predujma"],
        palette: "ink",
      },
      {
        template: "number",
        eyebrow: "Rok",
        title: "radnih dana do gotove verzije",
        value: "5",
        valueNote: "Ne maketa. Stranica koju otvorite na mobitelu.",
        palette: "ink",
      },
      {
        template: "list",
        eyebrow: "Prvih 5 dana",
        title: "Kako ide, dan po dan",
        items: ["Dan 1 — razgovor i materijal", "Dan 2–3 — struktura i tekst", "Dan 4 — dizajn i kod", "Dan 5 — Vaš pregled"],
        palette: "dark",
      },
      {
        template: "cta",
        eyebrow: "Bez obaveze",
        title: "Ako ne valja — ne plaćate ništa.",
        subtitle: "Javite nam se u DM i počinjemo ove sedmice.",
        palette: "ink",
      },
    ],
    caption:
      "Prije nego što se dogovorimo o bilo čemu, izrađujemo besplatnu, funkcionalnu gotovu verziju Vašeg projekta — u roku od 5 radnih dana.\n\n" +
      "Vidite konkretan dizajn, strukturu i funkcionalnost. Na pravom linku, ne na slici. Možete je otvoriti, poslati prijatelju, pogledati na mobitelu.\n\n" +
      "Nema predujma. Nema pritiska. Nema obaveze.\n\n" +
      "Ako Vam se ne svidi — ne plaćate ništa i idemo dalje. Ako se svidi — nastavljamo.\n\n" +
      "Za 5 dana znate tačno šta dobijate. Bez nagađanja.",
    tags: ["besplatno", "gotovaverzija", "5dana", "webdizajn", "sarajevo", "devforge"],
  },
  {
    id: "p03",
    template: "list",
    category: "ponuda",
    layout: "photo",
    photo: "heroMob",
    palette: "teal",
    eyebrow: "Admin panel",
    title: "Sami mijenjate tekst, slike i cijene",
    items: ["Bez koda", "Bez developera", "Bez mjesečnih naknada"],
    slides: [
      {
        template: "cover",
        eyebrow: "Galerija",
        title: "Vaša stranica. Vaša kontrola.",
        items: ["Tekst", "Slike", "Cijene"],
        palette: "teal",
      },
      {
        template: "list",
        eyebrow: "Bez ikoga",
        title: "Šta mijenjate sami",
        items: ["Tekst i naslove", "Slike i galerije", "Cijene u shopu", "Objave i novosti"],
        palette: "teal",
      },
      {
        template: "compare",
        eyebrow: "Razlika",
        title: "Sa panelom vs. bez panela",
        items: ["Čekate izvođača", "Plaćate svaku sitnicu", "Stranica stoji", "Zovete i podsjećate", "Mijenjate sami", "Bez doplata", "Uvijek aktuelna", "Bez čekanja"],
        palette: "light",
      },
      {
        template: "cta",
        eyebrow: "Kontrola",
        title: "Ako znate koristiti Facebook, znate i ovo.",
        subtitle: "Panel dolazi uz svaki projekt — bez doplate.",
        palette: "dark",
      },
    ],
    caption:
      "Uz svaki projekt dobijate vlastiti admin panel (CMS) kroz koji sami mijenjate sadržaj.\n\n" +
      "Šta možete sami:\n" +
      "— tekst na bilo kojoj stranici\n" +
      "— slike i fotografije\n" +
      "— proizvode i cijene u shopu\n" +
      "— objave i novosti\n\n" +
      "Sve bez koda i bez plaćanja developeru za svaku sitnicu. Ne morate zvati nikoga da promijenite cijenu ili dodate sliku.\n\n" +
      "Potpuna kontrola nad Vašom stranicom je u Vašim rukama. Od prvog dana.\n\n" +
      "Koliko puta ste htjeli nešto promijeniti i odustali jer „ne znate kako“?",
    tags: ["adminpanel", "cms", "kontrola", "webdizajn", "malibiznis", "devforge"],
  },
  {
    id: "p04",
    template: "number",
    category: "ponuda",
    layout: "band",
    palette: "sun",
    eyebrow: "Cijene",
    title: "skrivenih troškova. Cijene su javne",
    value: "0",
    valueNote: "Web stranice od 150 KM · Shopovi od 600 KM",
    caption:
      "Cijene su javne i jasne od početka. Nema „zavisno od projekta“ i nema nagađanja.\n\n" +
      "Web stranice — od 150 KM\n" +
      "Web shopovi — od 600 KM\n" +
      "Mobilne aplikacije i AI sistemi — po dogovoru\n\n" +
      "Tačnu ponudu dobijate prije početka rada. Bez naknadnih iznenađenja, skrivenih stavki ili dodatnih naplata na kraju.\n\n" +
      "Znate tačno za šta plaćate. I znate to prije nego što počnemo.\n\n" +
      "Zašto je to rijetkost: jer većina agencija kaže „pošaljite upit za ponudu“ — i onda čekate tri dana da saznate okvirnu cijenu.\n\n" +
      "Kod nas je cijena na sajtu.",
    tags: ["cijene", "transparentnost", "bezskrivenih", "webdizajn", "sarajevo", "devforge"],
  },
  {
    id: "p05",
    template: "title",
    category: "ponuda",
    layout: "photoTop",
    photo: "web",
    palette: "dark",
    eyebrow: "Web stranice",
    title: "Stranica koja predstavlja Vaš brend",
    subtitle: "Od landing page-a do korporativne stranice — od 150 KM.",
    caption:
      "Moderne, responzivne web stranice koje predstavljaju Vaš brend na najbolji način.\n\n" +
      "Šta radimo:\n" +
      "— Landing page — jedna fokusirana stranica za kampanju ili uslugu\n" +
      "— Korporativna stranica — višestranični sajt s uslugama i timom\n" +
      "— Web shop — katalog, korpa, online plaćanje\n" +
      "— Web aplikacija — dashboardi, portali, interni alati\n\n" +
      "Svaki projekt uključuje UI/UX dizajn, mobilnu verziju i admin panel. Bez doplata.\n\n" +
      "Od 150 KM. Prva verzija besplatna, za 5 dana.\n\n" +
      "Šta Vam treba?",
    tags: ["webstranice", "webdizajn", "landing", "korporativna", "sarajevo", "devforge"],
  },
  {
    id: "p06",
    template: "list",
    category: "ponuda",
    layout: "split",
    palette: "mint",
    eyebrow: "Šta dobijate",
    title: "Šest stvari u svakom projektu",
    items: ["UI/UX dizajn uključen", "Radi na svim uređajima", "Brzo se učitava", "Demo se ne plaća"],
    caption:
      "Šta dobijate uz svaki projekt — bez doplata:\n\n" +
      "1. UI/UX dizajn uključen. Profesionalan, moderan dizajn dolazi uz svaki paket.\n" +
      "2. Responzivno na svim uređajima. Mobitel, tablet i desktop — kao da je rađen za taj ekran.\n" +
      "3. Brza i optimizovana izrada. Kod koji se brzo učitava — bolji dojam i veća konverzija.\n" +
      "4. Demo se ne plaća. Prvo besplatna demo verzija, plaćanje tek kad se dogovorimo.\n" +
      "5. Čist, dokumentiran kod. Projekt je u potpunosti Vaš.\n" +
      "6. 4 besplatne revizije. Dorađujemo dok rezultat ne odgovara Vašoj viziji.\n\n" +
      "Nema skrivenih stavki. Ovo je sve uključeno.",
    tags: ["ukljuceno", "webdizajn", "revizije", "kod", "sarajevo", "devforge"],
  },
  {
    id: "p07",
    template: "title",
    category: "ponuda",
    layout: "center",
    palette: "light",
    eyebrow: "2D igrice",
    title: "2D igrice za web i mobilne",
    subtitle: "Od casual do educational — prilagođeno Vašim zahtjevima.",
    caption:
      "Razvijamo engaging 2D igrice za mobilne platforme i web.\n\n" +
      "Za šta ih firme koriste:\n" +
      "— marketing i promocije (igra kao dio kampanje)\n" +
      "— edukacija (educational game za zaposlene ili klijente)\n" +
      "— zabava (casual igra s Vašim brendom)\n\n" +
      "Od jednostavne igre s ciljem do kompleksnije mehanike. Radi na webu i na mobilnom.\n\n" +
      "Zašto igra a ne oglas: ljudi provedu minute u igri, a sekunde na baneru.\n\n" +
      "Imate ideju za igru?",
    tags: ["2digrice", "gamedev", "web", "mobilne", "sarajevo", "devforge"],
  },
  {
    id: "p08",
    template: "title",
    category: "ponuda",
    layout: "photo",
    photo: "mobile",
    palette: "ink",
    eyebrow: "Mobilne aplikacije",
    title: "Aplikacija za iOS i Android",
    subtitle: "Od MVP-a do potpune aplikacije s backend-om.",
    caption:
      "Native i cross-platform mobilne aplikacije za iOS i Android.\n\n" +
      "Šta radimo:\n" +
      "— MVP — prva verzija da testirate ideju na tržištu\n" +
      "— Potpuna aplikacija — sve funkcionalnosti\n" +
      "— Backend integracija — podaci, korisnici, notifikacije\n" +
      "— Objava na App Store i Google Play\n\n" +
      "Koristimo Flutter i React Native — jedan kod, obje platforme. Znači: brže i jeftinije nego dvije odvojene aplikacije.\n\n" +
      "Ista pravila kao za stranice: prva verzija besplatna, plaćate kad ste zadovoljni.\n\n" +
      "Imate ideju za aplikaciju?",
    tags: ["mobilneaplikacije", "ios", "android", "flutter", "sarajevo", "devforge"],
  },
  {
    id: "p09",
    template: "list",
    category: "ponuda",
    layout: "band",
    palette: "teal",
    eyebrow: "AI sistemi",
    title: "AI koji prima pozive dok Vi spavate",
    items: ["Odgovara kupcima 24/7", "Zakaže termine", "Bilježi narudžbe", "Bez Vašeg učešća"],
    caption:
      "AI recepcionar i chat asistent koji primaju pozive 24 sata, odgovaraju kupcima, zakazuju termine i bilježe narudžbe — bez Vašeg učešća.\n\n" +
      "Šta to znači praktično:\n" +
      "— kupac pita u 23:40 „imate li na stanju“ — dobije odgovor u 5 sekundi\n" +
      "— pacijent/klijent zakaže termin sam, bez poziva\n" +
      "— narudžba iz poruke se pretvori u zapis\n" +
      "— nešto komplikovano — proslijedi Vama s cijelim razgovorom\n\n" +
      "41% upita dolazi van radnog vremena. Ovo pokriva taj dio.\n\n" +
      "AI ide kao dio projekta stranice, ne odvojeno.",
    tags: ["aisistemi", "airecepcionar", "automatizacija", "chatbot", "sarajevo", "devforge"],
  },
  {
    id: "p10",
    template: "number",
    category: "dokaz",
    layout: "photoTop",
    photo: "web",
    palette: "dark",
    eyebrow: "Rezultat",
    title: "besplatnih revizija u svakom projektu",
    value: "4",
    valueNote: "Dorađujemo dok ne odgovara Vašoj viziji.",
    caption:
      "Dorađujemo dizajn i funkcionalnosti dok rezultat ne odgovara točno Vašoj viziji.\n\n" +
      "Četiri revizije su uključene u cijenu. Bez doplata i bez brojanja „ovo je peta izmjena, to se dodatno plaća“.\n\n" +
      "Zašto četiri: jer prva verzija nikad nije savršena. Prve dvije revizije su obično sitnice (boja, raspored). Treća i četvrta su one koje stvarno poprave stvar.\n\n" +
      "Ako i poslije četiri treba još — sjeli bismo i vidjeli šta nije u redu u startu.\n\n" +
      "Koliko revizija Vam je trebalo na prošlom projektu?",
    tags: ["revizije", "dorada", "webdizajn", "kvalitet", "sarajevo", "devforge"],
  },
  {
    id: "p11",
    template: "compare",
    category: "ponuda",
    layout: "center",
    palette: "mint",
    eyebrow: "Prije / Poslije",
    title: "Druge agencije vs. DevForge",
    items: ["50% predujma", "Plaćate pa vidite", "Bez probne verzije", "Skriveni troškovi", "0 KM predujma", "Vidite pa platite", "Verzija za 5 dana", "Cijene javne"],
    caption:
      "Ovo nije kritika drugih — samo objašnjenje kako mi radimo drugačije.\n\n" +
      "Standardno u industriji:\n" +
      "— 50% predujma prije početka\n" +
      "— Vidite tek kad platite\n" +
      "— Cijena „po dogovoru“ i onda nagađanje\n\n" +
      "Kod nas:\n" +
      "— 0 KM predujma\n" +
      "— Besplatna gotova verzija za 5 dana\n" +
      "— Cijene javne na sajtu (od 150 KM)\n\n" +
      "Isti posao. Drugačija podjela rizika.\n\n" +
      "Koji model Vam je logičniji?",
    tags: ["poredjenje", "agencija", "bezpredujma", "transparentnost", "devforge"],
  },
  {
    id: "p12",
    template: "process",
    category: "izakulisa",
    layout: "band",
    palette: "light",
    eyebrow: "Naš proces",
    title: "Četiri koraka do gotovog projekta",
    items: ["Inicijalna konsultacija", "Gotova verzija i potvrda", "Razvoj i implementacija", "Testiranje i isporuka"],
    caption:
      "Ovako izgleda projekat od početka do kraja:\n\n" +
      "1. Inicijalna konsultacija. Razgovor od 15 minuta — čime se bavite, ko Vas zove, šta stranica treba da uradi.\n\n" +
      "2. Gotova verzija i potvrda. U 5 dana napravimo besplatnu radnu verziju. Vidite je na linku, kažete šta mijenjati.\n\n" +
      "3. Razvoj i implementacija. Kad ste potvrdili, radimo punu verziju — sve stranice, funkcionalnosti i admin panel.\n\n" +
      "4. Testiranje i isporuka. Test na mobitelu, tabletu i računaru. Povezujemo analitiku. Predajemo sve pristupe — domena i kod idu na Vaše ime.\n\n" +
      "Tek onda plaćate.",
    tags: ["proces", "kakoradimo", "koraci", "isporuka", "sarajevo", "devforge"],
  },
  {
    id: "p13",
    template: "quote",
    category: "brend",
    layout: "stamp",
    palette: "dark",
    eyebrow: "Naš stav",
    title: "Od ideje do gotovog proizvoda za nekoliko sedmica.",
    subtitle: "Bez mjeseci čekanja i bez nagađanja.",
    caption:
      "Od ideje do gotovog proizvoda — za nekoliko sedmica, ne mjeseci.\n\n" +
      "Zašto ne traje mjesecima:\n" +
      "— pola posla je urađeno prije nego što se išta vidi (struktura, tekst, odluke)\n" +
      "— prva verzija u 5 dana daje jasan pravac\n" +
      "— revizije su planirane, ne iznenađenje\n\n" +
      "Kad se radi obrnuto (počne s dizajnom bez teksta), prva verzija traje 3 sedmice i sve se ruši u drugom krugu.\n\n" +
      "Brzo nije isto što i brzopleto. Brzo znači: priprema prije, rad poslije.",
    tags: ["brzina", "proces", "ideja", "webdizajn", "sarajevo", "devforge"],
  },
  {
    id: "p14",
    template: "number",
    category: "dokaz",
    layout: "photoBg",
    photo: "mobile",
    palette: "ink",
    eyebrow: "Naš rad",
    title: "isporučenih projekata do danas",
    value: "20+",
    valueNote: "Web stranice, shopovi, aplikacije i igrice.",
    caption:
      "Preko 20 isporučenih projekata — web stranice, shopovi, mobilne aplikacije, igrice i AI sistemi.\n\n" +
      "Ono što nam je važnije od broja: nijedan klijent nije platio nešto što nije vidio.\n\n" +
      "Svaki projekt prošao je isti put: dogovor → besplatna verzija → pregled → izmjene → objava → plaćanje.\n\n" +
      "100% klijenata zadovoljno, svaki projekt isporučen prema dogovoru.\n\n" +
      "Rastemo na preporukama, ne na oglasima. Zato i radimo bez predujma — preporuka se ne kupuje.",
    tags: ["projekti", "rezultati", "iskustvo", "webdizajn", "sarajevo", "devforge"],
  },
  {
    id: "p15",
    template: "title",
    category: "ponuda",
    layout: "photoTop",
    photo: "hero",
    palette: "teal",
    eyebrow: "AI sistemi",
    title: "Recepcionar koji nikad ne spava",
    subtitle: "Prima pozive, odgovara kupcima i zakazuje termine — 24 sata.",
    caption:
      "AI recepcionar radi i kad Vi ne radite. Vikendom, noću, za praznike.\n\n" +
      "Šta radi:\n" +
      "— prima pozive i poruke 24 sata\n" +
      "— zna Vaš cjenovnik, radno vrijeme i termine\n" +
      "— zakaže termin i pošalje potvrdu\n" +
      "— bilježi narudžbe iz poruka\n" +
      "— proslijedi Vama sve što je komplikovano, s cijelim razgovorom\n\n" +
      "Šta NE radi: ne pregovara o cijeni, ne obećava što Vi niste odobrili, ne izmišlja.\n\n" +
      "Za frizerske, stomatološke, autoservise i sve koji ne mogu stalno biti na telefonu — ovo je najveća ušteda.\n\n" +
      "Koliko poziva Vam promakne dok radite?",
    tags: ["airecepcionar", "aisistemi", "termini", "automatizacija", "sarajevo", "devforge"],
  },
  {
    id: "p16",
    template: "quote",
    category: "brend",
    layout: "split",
    palette: "sun",
    eyebrow: "Naš stav",
    title: "Kod je Vaš. Domena je Vaša.",
    subtitle: "Nema zatočeništva i nema otkupa.",
    caption:
      "Najgori scenario koji smo vidjeli: firma je platila stranicu, a domenu drži bivši izvođač. Godinu dana nisu mogli ništa mijenjati.\n\n" +
      "Zato radimo drugačije:\n" +
      "— domena se registruje na Vaše ime\n" +
      "— hosting je Vaš račun\n" +
      "— izvorni kod dobijate u cjelosti, dokumentiran\n" +
      "— sve lozinke idu Vama\n\n" +
      "Ako nas sutra poželite zamijeniti, uzmete sve i idete. Bez poziva i bez otkupa.\n\n" +
      "Firma koja Vas drži zatočenicima ne radi dobro — radi zato što mora.",
    tags: ["vlasnistvo", "domena", "kod", "ferodnos", "sarajevo", "devforge"],
  },
  {
    id: "p17",
    template: "list",
    category: "ponuda",
    layout: "center",
    palette: "mint",
    eyebrow: "Cijene",
    title: "Paketi, bez skrivenih stavki",
    items: ["Web stranice od 150 KM", "Web shopovi od 600 KM", "Aplikacije po dogovoru", "AI sistemi po dogovoru"],
    caption:
      "Cijene su javne. Ovo je okvir — tačnu ponudu dobijate prije početka.\n\n" +
      "Web stranice — od 150 KM\n" +
      "Landing, korporativna, višestranična. Uključeno: dizajn, mobilna verzija, admin panel, SEO osnova.\n\n" +
      "Web shopovi — od 600 KM\n" +
      "Katalog, korpa, online plaćanje, upravljanje narudžbama.\n\n" +
      "Mobilne aplikacije i AI sistemi — po dogovoru\n" +
      "Zavisi od broja funkcionalnosti. Recite šta Vam treba i dobijete broj isti dan.\n\n" +
      "Hosting i domena se plaćaju direktno provideru — bez naše marže. To nije skriveno, to je transparentno.\n\n" +
      "Šta Vam treba?",
    tags: ["cijene", "paketi", "webstranice", "shopovi", "sarajevo", "devforge"],
  },
  {
    id: "p18",
    template: "list",
    category: "izakulisa",
    layout: "photo",
    photo: "mobile",
    palette: "dark",
    eyebrow: "Iza kulisa",
    title: "Tehnologije koje koristimo",
    items: ["React i Next.js", "Node i Laravel", "Flutter", "Firebase"],
    caption:
      "Radimo u standardnim tehnologijama — bez egzotike koja se ne može održavati.\n\n" +
      "Frontend: React i Next.js, TypeScript, Tailwind.\n" +
      "Backend: Node.js i Laravel, PostgreSQL ili MySQL.\n" +
      "Mobilne: Flutter i React Native — jedan kod, obje platforme.\n" +
      "Podaci: Firebase kad treba brzo, PostgreSQL kad treba ozbiljno.\n\n" +
      "Zašto Vam je to važno kao klijentu: kad za godinu dana tražite nekog da nastavi raditi, standardne tehnologije znači da će ga lako naći.\n\n" +
      "Kod u nekoj egzotičnoj tehnologiji je zatočeništvo, ne zaštita.",
    tags: ["tehnologije", "react", "flutter", "node", "sarajevo", "devforge"],
  },
  {
    id: "p19",
    template: "quote",
    category: "brend",
    layout: "stamp",
    palette: "light",
    eyebrow: "Naš stav",
    title: "Izrađujemo besplatnu verziju. Plaćate kad ste zadovoljni.",
    subtitle: "To je cijela poanta. Sve ostalo je detalj.",
    caption:
      "Naš cijeli model stane u jednu rečenicu: izrađujemo besplatnu gotovu verziju, plaćate tek kada budete zadovoljni.\n\n" +
      "Zvuči jednostavno. I jeste — samo malo firmi to radi, jer traži povjerenje u vlastiti rad.\n\n" +
      "Šta to znači za Vas:\n" +
      "— ne rizikujete novac prije nego što vidite rezultat\n" +
      "— ne potpisujete ništa prije nego što vidite stranicu\n" +
      "— ne plaćate ako ne valja\n\n" +
      "Šta to znači za nas: moramo biti dobri iz prve. Zato pola posla radimo prije nego što počnemo.\n\n" +
      "Javite se u DM.",
    tags: ["besplatno", "bezrizika", "model", "povjerenje", "sarajevo", "devforge"],
  },
  {
    id: "p20",
    template: "cta",
    category: "ponuda",
    layout: "center",
    palette: "dark",
    eyebrow: "Počnite",
    title: "Recite nam šta Vam treba. Prva verzija je besplatna.",
    subtitle: "Web stranice od 150 KM · Shopovi od 600 KM · Bez predujma",
    caption:
      "Ako ne znate odakle početi — javite se i recite čime se bavite.\n\n" +
      "Ne morate imati ni ideju ni materijal. Većina razgovora počne ovako: „Radim to i to, ne znam šta mi treba.“\n\n" +
      "To je sasvim dovoljno. Mi pitamo dalje.\n\n" +
      "Šta dobijate:\n" +
      "— besplatnu gotovu verziju za 5 dana\n" +
      "— 0 KM predujma\n" +
      "— fiksnu cijenu prije početka\n" +
      "— 4 besplatne revizije\n\n" +
      "Javite nam se u DM — odgovaramo u roku od 10 minuta.",
    tags: ["kontakt", "besplatno", "webdizajn", "sarajevo", "devforge"],
  },
];
