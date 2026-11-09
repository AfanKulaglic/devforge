import type { AdPost } from "./postsData";

// ───────────────────────────────────────────────────────────────────────────
// OBJAVE 21–40 — REDOSLIJED KAO NA SAJTU (nastavak)
//
// 21–22  kako radimo
// 23     naši projekti (galerija)
// 24     izrada web stranica u Sarajevu — šta dobijate
// 25     šta dobijate (galerija)
// 26–28  česta pitanja
// 29     javite nam se brzo, bez forme
// 30     javite nam se
// ───────────────────────────────────────────────────────────────────────────

export const POSTS_2: AdPost[] = [
  // ── 21. KAKO RADIMO ──────────────────────────────────────────────────────
  {
    id: "p21",
    template: "list",
    category: "izakulisa",
    layout: "photoBg",
    photo: "hero",
    palette: "dark",
    eyebrow: "Kako radimo",
    title: "Šta radimo prije prve linije koda",
    items: ["Razgovor o kupcu", "Pregled konkurencije", "Struktura na papiru", "Tekst prije dizajna"],
    caption:
      "Redoslijed je važan. Ovako izgleda naš početak:\n\n" +
      "1. Razgovor — 30 minuta o tome ko je kupac i šta ga muči. Ne o tome šta Vam se sviđa.\n" +
      "2. Konkurencija — gledamo 5 firmi koje rade isto. Šta im rade dobro, šta loše.\n" +
      "3. Struktura — nacrtamo stranice na papiru. Koja vodi gdje, šta je na svakoj.\n" +
      "4. Tekst — pišemo prvo tekst, pa dizajn. Obrnuto nikad ne radi.\n\n" +
      "Tek onda Figma. Tek onda kod.\n\n" +
      "Zato prva verzija obično bude dobra iz prve — pola posla je urađeno prije nego što se išta vidi.",
    tags: ["proces", "kakoradimo", "priprema", "izakulisa", "sarajevo", "devforge"],
  },

  // ── 22. KAKO RADIMO ──────────────────────────────────────────────────────
  {
    id: "p22",
    template: "process",
    category: "izakulisa",
    layout: "band",
    palette: "ink",
    eyebrow: "Naš proces",
    title: "Četiri koraka, nula unaprijed",
    items: ["Konsultacija", "Gotova verzija", "Razvoj", "Isporuka"],
    caption:
      "Transparentno — ovako izgleda projekat od prvog razgovora do zadnjeg dana:\n\n" +
      "DAN 1 — Razgovor od 15-30 minuta. Čime se bavite, ko Vas zove, šta stranica treba da uradi.\n\n" +
      "DAN 2–5 — Besplatna gotova verzija. Prava stranica na pravom linku, koju otvorite na mobitelu i pošaljete kome hoćete.\n\n" +
      "DAN 6–20 — Puni razvoj. Sve stranice, funkcionalnosti, admin panel. Redovni pregledi i izmjene.\n\n" +
      "ZADNJI DAN — Testiranje na tri uređaja. Domena na Vaše ime, kod u cjelosti, sve lozinke predate.\n\n" +
      "Tek onda plaćate. Bez predujma, bez rizika.",
    tags: ["proces", "koraci", "isporuka", "kakoradimo", "sarajevo", "devforge"],
  },

  // ── 23. NAŠI PROJEKTI — GALERIJA ─────────────────────────────────────────
  {
    id: "p23",
    template: "cover",
    category: "dokaz",
    layout: "photoTop",
    photo: "mobile",
    palette: "dark",
    eyebrow: "Naši projekti",
    title: "Naši projekti",
    slides: [
      {
        template: "cover",
        eyebrow: "Naši projekti",
        title: "Naši projekti",
        items: ["Web", "Shopovi", "Aplikacije", "AI"],
        palette: "dark",
      },
      {
        template: "number",
        eyebrow: "Do danas",
        title: "isporučenih projekata",
        value: "20+",
        valueNote: "Web stranice, shopovi, aplikacije i igrice.",
        palette: "dark",
      },
      {
        template: "list",
        eyebrow: "Šta smo radili",
        title: "Vrste projekata",
        items: ["Korporativne stranice", "Web shopovi", "Mobilne aplikacije", "AI sistemi"],
        palette: "ink",
      },
      {
        template: "number",
        eyebrow: "Zadovoljstvo",
        title: "klijenata zadovoljno isporukom",
        value: "100%",
        valueNote: "Svaki projekt isporučen prema dogovoru.",
        palette: "dark",
      },
      {
        template: "cta",
        eyebrow: "Sljedeći",
        title: "Vaš projekt je sljedeći.",
        subtitle: "Javite nam se u DM — prva verzija je besplatna.",
        palette: "ink",
      },
    ],
    caption:
      "Preko 20 isporučenih projekata — web stranice, shopovi, mobilne aplikacije, igrice i AI sistemi.\n\n" +
      "Klijenti iz BiH i regiona. E-commerce i trgovine, startupi i agencije, lokalni biznisi i obrti, edukacija, uslužne djelatnosti, SaaS.\n\n" +
      "Ono što nam je važnije od broja: nijedan klijent nije platio nešto što nije vidio.\n\n" +
      "Svaki projekt prošao je isti put: dogovor → besplatna verzija → pregled → izmjene → objava → plaćanje.\n\n" +
      "100% klijenata zadovoljno, svaki projekt isporučen prema dogovoru.\n\n" +
      "Pogledajte sve na /projekti.",
    tags: ["projekti", "rezultati", "portfolio", "sarajevo", "devforge"],
  },

  // ── 24. IZRADA WEB STRANICA U SARAJEVU ───────────────────────────────────
  {
    id: "p24",
    template: "title",
    category: "ponuda",
    layout: "center",
    palette: "teal",
    eyebrow: "Sarajevo",
    title: "Izrada web stranica u Sarajevu",
    subtitle: "Bez kancelarije u centru i bez velikih režija — zato je cijena niža.",
    caption:
      "Radimo iz Sarajeva, za firme iz cijele BiH.\n\n" +
      "Bez kancelarije u centru i bez velikih režija. Zato ne plaćate tuđu kiriju kroz cijenu projekta.\n\n" +
      "Šta to znači praktično:\n" +
      "— web stranica od 150 KM, shop od 600 KM\n" +
      "— cijena je ista za firmu iz Sarajeva i iz Bihaća\n" +
      "— sve ide online: razgovor, pregledi, izmjene\n" +
      "— ne morate dolaziti nigdje\n\n" +
      "Radimo s klijentima iz cijele Bosne i Hercegovine i regiona.\n\n" +
      "Ako Vam je neko rekao da stranica košta 2000 KM — javite nam se.",
    tags: ["sarajevo", "webstranice", "lokalni", "cijene", "devforge"],
  },

  // ── 25. ŠTA DOBIJATE — GALERIJA ──────────────────────────────────────────
  {
    id: "p25",
    template: "cover",
    category: "ponuda",
    layout: "photoBg",
    photo: "web",
    palette: "ink",
    eyebrow: "Šta dobijate",
    title: "Šta dobijate",
    slides: [
      {
        template: "cover",
        eyebrow: "Šta dobijate",
        title: "Šta dobijate uz projekt",
        items: ["Dizajn", "Mobilna verzija", "Panel", "Revizije"],
        palette: "ink",
      },
      {
        template: "list",
        eyebrow: "Uključeno",
        title: "Šest stvari bez doplata",
        items: ["UI/UX dizajn uključen", "Responzivno na svim uređajima", "Brza i optimizovana izrada", "Demo se ne plaća"],
        palette: "ink",
      },
      {
        template: "list",
        eyebrow: "Uključeno",
        title: "I još dvije",
        items: ["Čist, dokumentiran kod", "4 besplatne revizije", "Obuka za korištenje"],
        palette: "dark",
      },
      {
        template: "quote",
        eyebrow: "Naš stav",
        title: "Kod je Vaš. Domena je Vaša.",
        subtitle: "Nema zatočeništva i nema otkupa.",
        palette: "ink",
      },
      {
        template: "cta",
        eyebrow: "Počnite",
        title: "Recite nam šta Vam treba.",
        subtitle: "Prva verzija je besplatna, za 5 dana.",
        palette: "dark",
      },
    ],
    caption:
      "Šta dobijate uz svaki projekt — bez doplata:\n\n" +
      "1. UI/UX DIZAJN UKLJUČEN. Profesionalan, moderan dizajn dolazi uz svaki paket — bez doplate i bez kompromisa na izgledu.\n\n" +
      "2. RESPONZIVNO NA SVIM UREĐAJIMA. Svaki proizvod izgleda i radi besprijekorno na mobitelu, tabletu i desktopu.\n\n" +
      "3. BRZA I OPTIMIZOVANA IZRADA. Optimizovan kod koji se brzo učitava — bolji dojam, niža stopa napuštanja i veća konverzija.\n\n" +
      "4. DEMO SE NE PLAĆA. Prvo dobijate besplatnu demo verziju — za nju ne plaćate ništa.\n\n" +
      "5. ČIST, DOKUMENTIRAN KOD. Predajemo uredan, održiv kod s dokumentacijom — projekt je u potpunosti Vaš.\n\n" +
      "6. 4 BESPLATNE REVIZIJE. Dorađujemo dizajn i funkcionalnosti dok rezultat ne odgovara Vašoj viziji.",
    tags: ["ukljuceno", "webdizajn", "revizije", "kod", "sarajevo", "devforge"],
  },

  // ── 26. ČESTA PITANJA ────────────────────────────────────────────────────
  {
    id: "p26",
    template: "quote",
    category: "ponuda",
    layout: "band",
    palette: "dark",
    eyebrow: "Česta pitanja",
    title: "Da li je gotova verzija zaista besplatna?",
    subtitle: "Da — potpuno, i bez ikakvih obaveza.",
    caption:
      "Najčešće pitanje koje dobijamo.\n\n" +
      "ODGOVOR: Da, gotova verzija je potpuno besplatna i bez ikakvih obaveza.\n\n" +
      "Izrađujemo funkcionalan prototip Vašeg projekta u roku od 5 radnih dana kako biste vidjeli dizajn, strukturu i osnovne funkcionalnosti prije nego što se odlučite za saradnju.\n\n" +
      "Nema skrivenih troškova niti predujma.\n\n" +
      "Ako Vam se ne svidi — ne plaćate ništa i idemo dalje. Bez objašnjavanja.\n\n" +
      "Javite nam se u DM.",
    tags: ["cestapitanja", "faq", "besplatno", "bezpredujma", "sarajevo", "devforge"],
  },

  // ── 27. ČESTA PITANJA ────────────────────────────────────────────────────
  {
    id: "p27",
    template: "list",
    category: "ponuda",
    layout: "split",
    palette: "light",
    eyebrow: "Česta pitanja",
    title: "Koliko traje razvoj projekta",
    items: ["Stranica — 1-2 sedmice", "Web shop — 3-4 sedmice", "Aplikacija — 4-8 sedmica"],
    caption:
      "Vrijeme razvoja zavisi od kompleksnosti projekta.\n\n" +
      "— Landing page ili jednostavna web stranica: 1–2 sedmice\n" +
      "— Web shop sa payment integracijom: 3–4 sedmice\n" +
      "— Mobilna aplikacija: 4–8 sedmica\n\n" +
      "Tačan timeline definišemo nakon inicijalne konsultacije i analize zahtjeva.\n\n" +
      "Ali prva verzija koju možete vidjeti — za 5 radnih dana. Bez obzira na veličinu projekta.\n\n" +
      "Tako ne čekate mjesec da vidite je li krenulo u pravom smjeru.",
    tags: ["cestapitanja", "faq", "rok", "timeline", "sarajevo", "devforge"],
  },

  // ── 28. ČESTA PITANJA ────────────────────────────────────────────────────
  {
    id: "p28",
    template: "list",
    category: "ponuda",
    layout: "center",
    palette: "mint",
    eyebrow: "Česta pitanja",
    title: "Četiri stvari koje svi pitaju",
    items: ["Je li kod moj?", "Kako teče plaćanje?", "Imate li podršku?", "Radite li AI?"],
    caption:
      "Četiri pitanja koja dobijamo svaki dan — četiri kratka odgovora:\n\n" +
      "DA LI JE KOD I PROJEKAT U POTPUNOSTI MOJ? Da. Nakon isporuke i izmirenja dogovorene cijene, kompletan kod, dizajn i sva prava nad projektom pripadaju isključivo Vama. Dobijate i dokumentaciju te kratku obuku za korištenje.\n\n" +
      "KAKO TEČE PLAĆANJE? Plaćate tek kada budete zadovoljni rezultatom. Prvo besplatna gotova verzija, a tek nakon Vaše potvrde krećemo u puni razvoj. Nema predujma.\n\n" +
      "DA LI NUDITE PODRŠKU NAKON ZAVRŠETKA? Da. Prvo izrađujemo besplatnu demo verziju, a podrška i održavanje su dostupni nakon isporuke.\n\n" +
      "RADITE LI AI SISTEME I AI CHAT? Da. AI chat asistenti na sajtu i AI telefonski recepcionari koji odgovaraju kupcima 24 sata dnevno.\n\n" +
      "Imate drugo pitanje? Javite se u DM.",
    tags: ["cestapitanja", "faq", "kod", "placanje", "sarajevo", "devforge"],
  },

  // ── 29. JAVITE NAM SE BRZO, BEZ FORME ────────────────────────────────────
  {
    id: "p29",
    template: "cta",
    category: "ponuda",
    layout: "photoBg",
    photo: "heroMob",
    palette: "dark",
    eyebrow: "Bez forme",
    title: "Javite nam se u DM. Bez forme, bez čekanja.",
    subtitle: "Odgovaramo u roku od 10 minuta.",
    caption:
      "Ne volimo forme koje traže 12 polja prije nego što popričate s nekim.\n\n" +
      "Zato je najbrži način — DM.\n\n" +
      "Šta nam pošaljete:\n" +
      "— čime se bavite (jedna rečenica)\n" +
      "— šta Vam treba (stranica, shop, aplikacija, AI)\n" +
      "— grad, ako nije Sarajevo\n\n" +
      "To je dovoljno. Mi pitamo dalje.\n\n" +
      "Odgovaramo u roku od 10 minuta. Ako je noć — ujutro prvo.\n\n" +
      "Ne morate imati ni ideju ni materijal. Većina razgovora počne s „ne znam šta mi treba“.",
    tags: ["kontakt", "dm", "bezforme", "brzo", "sarajevo", "devforge"],
  },

  // ── 30. JAVITE NAM SE ────────────────────────────────────────────────────
  {
    id: "p30",
    template: "cta",
    category: "ponuda",
    layout: "center",
    palette: "ink",
    eyebrow: "Kontakt",
    title: "Recite čime se bavite. Mi pitamo dalje.",
    subtitle: "Instagram DM · devforge.studio@gmail.com · Sarajevo",
    caption:
      "Ne morate imati:\n" +
      "— gotov tekst\n" +
      "— logo u vektoru\n" +
      "— ideju kako stranica treba izgledati\n" +
      "— ni odluku da li Vam uopšte treba stranica\n\n" +
      "Dovoljno je da se javite i kažete čime se bavite.\n\n" +
      "Kako nas kontaktirate:\n" +
      "— Instagram DM: @devforge_studio\n" +
      "— e-mail: devforge.studio@gmail.com\n" +
      "— ili pozovite: +387 62 576 456\n\n" +
      "Odgovaramo u roku od 10 minuta. Bez obaveze i bez predujma.\n\n" +
      "Javite nam se u DM.",
    tags: ["kontakt", "pocetak", "bezobaveze", "sarajevo", "devforge"],
  },
];
