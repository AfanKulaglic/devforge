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
    eyebrow: "Prije izrade",
    title: "Prije prve linije koda sjednemo i razmislimo.",
    items: [
      "Razgovor o tome ko je vaš kupac",
      "Pregled onoga što radi konkurencija",
      "Struktura stranice na papiru",
      "Tekstovi prije dizajna, ne poslije",
    ],
    caption:
      "🧠 Stranica se ne pravi u Figmi. Pravi se u glavi.\n\nRedoslijed je važan. Ovako izgleda naš početak:\n\n1. Razgovor — 30 minuta o tome ko je kupac i šta ga muči. Ne o tome šta Vam se sviđa.\n2. Konkurencija — gledamo 5 firmi koje rade isto. Šta im rade dobro, šta loše.\n3. Struktura — nacrtamo stranice na papiru. Koja vodi gdje, šta je na svakoj.\n4. Tekst — pišemo prvo tekst, pa dizajn. Obrnuto nikad ne radi.\n\nTek onda Figma. Tek onda kod.\n\nZato prva verzija obično bude dobra iz prve — pola posla je urađeno prije nego što se išta vidi.",
    tags: ["proces", "kakoradimo", "priprema", "izakulisa", "sarajevo", "devlab"],
  },

  // ── 22. KAKO RADIMO ──────────────────────────────────────────────────────
  {
    id: "p22",
    title: "Četiri koraka. Nula plaćanja unaprijed.",
    template: "process",
    category: "izakulisa",
    layout: "band",
    palette: "ink",
    eyebrow: "Naš proces",
    items: [
      "Konsultacija — 15 minuta",
      "Gotova verzija — za 5 dana",
      "Vaše revizije — 4 besplatne",
      "Isporuka — sve na vaše ime",
    ],
    caption:
      "📋 Četiri koraka. Nema koraka petog.\n\nTransparentno — ovako izgleda projekat od prvog razgovora do zadnjeg dana:\n\nDAN 1 — Razgovor od 15-30 minuta. Čime se bavite, ko Vas zove, šta stranica treba da uradi.\n\nDAN 2–5 — Besplatna gotova verzija. Prava stranica na pravom linku, koju otvorite na mobitelu i pošaljete kome hoćete.\n\nDAN 6–20 — Puni razvoj. Sve stranice, funkcionalnosti, admin panel. Redovni pregledi i izmjene.\n\nZADNJI DAN — Testiranje na tri uređaja. Domena na Vaše ime, kod u cjelosti, sve lozinke predate.\n\nTek onda plaćate. Bez predujma, bez rizika.",
    tags: ["proces", "koraci", "isporuka", "kakoradimo", "sarajevo", "devlab"],
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
    title: "Projekti koje smo radili — i šta su donijeli.",
    slides: [
      {
        template: "cover",
        eyebrow: "Naši projekti",
        title: "Naši projekti",
        items: ["Stranice", "Shopovi", "Aplikacije", "AI"],
        palette: "dark",
      },
      {
        template: "number",
        eyebrow: "Do danas",
        title: "isporučenih projekata",
        value: "20+",
        valueNote: "Stranice, shopovi, aplikacije i igrice.",
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
      "🏆 20+ projekata. Nula nezadovoljnih.\n\nPreko 20 isporučenih projekata — web stranice, shopovi, mobilne aplikacije, igrice i AI sistemi.\n\nKlijenti iz BiH i regiona. E-commerce i trgovine, startupi i agencije, lokalni biznisi i obrti, edukacija, uslužne djelatnosti, SaaS.\n\nOno što nam je važnije od broja: nijedan klijent nije platio nešto što nije vidio.\n\nSvaki projekt prošao je isti put: dogovor → besplatna verzija → pregled → izmjene → objava → plaćanje.\n\n100% klijenata zadovoljno, svaki projekt isporučen prema dogovoru.\n\nPogledajte sve na /projekti.",
    tags: ["projekti", "rezultati", "portfolio", "sarajevo", "devlab"],
  },

  // ── 24. IZRADA WEB STRANICA U SARAJEVU ───────────────────────────────────
  {
    id: "p24",
    template: "title",
    category: "ponuda",
    layout: "center",
    palette: "teal",
    eyebrow: "Sarajevo",
    title: "Izrada sajtova u Sarajevu, bez cijene kancelarije u centru.",
    subtitle: "Radimo iz malog ureda bez režija, pa je cijena niža od agencijske. Isti kvalitet, manje troškova.",
    caption:
      "📍 Sarajevo. Bez kancelarije u centru, bez Vaše kirije u cijeni.\n\nRadimo iz Sarajeva, za firme iz cijele BiH.\n\nBez kancelarije u centru i bez velikih režija. Zato ne plaćate tuđu kiriju kroz cijenu projekta.\n\nŠta to znači praktično:\n— ✅ web stranica od 150 KM, shop od 600 KM\n— 🔥 cijena je ista za firmu iz Sarajeva i iz Bihaća\n— 💡 sve ide online: razgovor, pregledi, izmjene\n— ⚡ ne morate dolaziti nigdje\n\nRadimo s klijentima iz cijele Bosne i Hercegovine i regiona.\n\nAko Vam je neko rekao da stranica košta 2000 KM — javite nam se.",
    tags: ["sarajevo", "webstranice", "lokalni", "cijene", "devlab"],
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
    title: "Šta tačno dobijate za cijenu koju platite.",
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
      "🎁 Šest stvari koje drugi naplaćuju. Kod nas su uključene.\n\nŠta dobijate uz svaki projekt — bez doplata:\n\n1. UI/UX DIZAJN UKLJUČEN. Profesionalan, moderan dizajn dolazi uz svaki paket — bez doplate i bez kompromisa na izgledu.\n\n2. RESPONZIVNO NA SVIM UREĐAJIMA. Svaki proizvod izgleda i radi besprijekorno na mobitelu, tabletu i desktopu.\n\n3. BRZA I OPTIMIZOVANA IZRADA. Optimizovan kod koji se brzo učitava — bolji dojam, niža stopa napuštanja i veća konverzija.\n\n4. DEMO SE NE PLAĆA. Prvo dobijate besplatnu demo verziju — za nju ne plaćate ništa.\n\n5. ČIST, DOKUMENTIRAN KOD. Predajemo uredan, održiv kod s dokumentacijom — projekt je u potpunosti Vaš.\n\n6. 4 BESPLATNE REVIZIJE. Dorađujemo dizajn i funkcionalnosti dok rezultat ne odgovara Vašoj viziji.",
    tags: ["ukljuceno", "webdizajn", "revizije", "kod", "sarajevo", "devlab"],
  },

  // ── 26. ČESTA PITANJA ────────────────────────────────────────────────────
  {
    id: "p26",
    subtitle: "Jeste. Napravimo je bez naplate i bez obaveze — ako vam se ne svidi, ne dugujete ništa.",
    template: "quote",
    category: "ponuda",
    layout: "band",
    palette: "dark",
    eyebrow: "Česta pitanja",
    title: "Da li je gotova verzija zaista besplatna?",
    caption:
      "❓ Najčešće pitanje koje dobijamo. I odgovor.\n\nNajčešće pitanje koje dobijamo.\n\nODGOVOR: Da, gotova verzija je potpuno besplatna i bez ikakvih obaveza.\n\nIzrađujemo funkcionalan prototip Vašeg projekta u roku od 5 radnih dana kako biste vidjeli dizajn, strukturu i osnovne funkcionalnosti prije nego što se odlučite za saradnju.\n\nNema skrivenih troškova niti predujma.\n\nAko Vam se ne svidi — ne plaćate ništa i idemo dalje. Bez objašnjavanja.\n\nJavite nam se u DM.",
    tags: ["cestapitanja", "faq", "besplatno", "bezpredujma", "sarajevo", "devlab"],
  },

  // ── 27. ČESTA PITANJA ────────────────────────────────────────────────────
  {
    id: "p27",
    template: "list",
    category: "ponuda",
    layout: "split",
    palette: "light",
    eyebrow: "Česta pitanja",
    title: "Koliko traje izrada? Evo tačnih rokova.",
    items: [
      "Web stranica — 5 radnih dana",
      "Web shop — 10 do 15 dana",
      "Aplikacija — 4 do 8 sedmica",
    ],
    caption:
      "⏱️ Koliko se čeka? Realno, bez laži.\n\nVrijeme razvoja zavisi od kompleksnosti projekta.\n\n— ✅ Landing page ili jednostavna web stranica: 1–2 sedmice\n— 🔥 Web shop sa payment integracijom: 3–4 sedmice\n— 💡 Mobilna aplikacija: 4–8 sedmica\n\nTačan timeline definišemo nakon inicijalne konsultacije i analize zahtjeva.\n\nAli prva verzija koju možete vidjeti — za 5 radnih dana. Bez obzira na veličinu projekta.\n\nTako ne čekate mjesec da vidite je li krenulo u pravom smjeru.",
    tags: ["cestapitanja", "faq", "rok", "timeline", "sarajevo", "devlab"],
  },

  // ── 28. ČESTA PITANJA ────────────────────────────────────────────────────
  {
    id: "p28",
    template: "list",
    category: "ponuda",
    layout: "center",
    palette: "mint",
    eyebrow: "Česta pitanja",
    title: "Četiri pitanja koja nam svi postavljaju.",
    items: [
      "Je li kod na kraju moj?",
      "Kako ide plaćanje?",
      "Šta poslije isporuke?",
      "Radite li i AI?",
    ],
    caption:
      "❓ Četiri pitanja. Četiri poštena odgovora.\n\nČetiri pitanja koja dobijamo svaki dan — četiri kratka odgovora:\n\nDA LI JE KOD I PROJEKAT U POTPUNOSTI MOJ? Da. Nakon isporuke i izmirenja dogovorene cijene, kompletan kod, dizajn i sva prava nad projektom pripadaju isključivo Vama. Dobijate i dokumentaciju te kratku obuku za korištenje.\n\nKAKO TEČE PLAĆANJE? Plaćate tek kada budete zadovoljni rezultatom. Prvo besplatna gotova verzija, a tek nakon Vaše potvrde krećemo u puni razvoj. Nema predujma.\n\nDA LI NUDITE PODRŠKU NAKON ZAVRŠETKA? Da. Prvo izrađujemo besplatnu demo verziju, a podrška i održavanje su dostupni nakon isporuke.\n\nRADITE LI AI SISTEME I AI CHAT? Da. AI chat asistenti na sajtu i AI telefonski recepcionari koji odgovaraju kupcima 24 sata dnevno.\n\nImate drugo pitanje? Javite se u DM.",
    tags: ["cestapitanja", "faq", "kod", "placanje", "sarajevo", "devlab"],
  },

  // ── 29. JAVITE NAM SE BRZO, BEZ FORME ────────────────────────────────────
  {
    id: "p29",
    title: "Pišite nam na Instagram. Bez formi, bez čekanja.",
    template: "cta",
    category: "ponuda",
    layout: "photoBg",
    photo: "heroMob",
    palette: "dark",
    eyebrow: "Kontakt",
    subtitle: "Odgovaramo u roku od 10 minuta, radnim danom od 9 do 20 sati.",
    caption:
      "💬 Bez forme. Bez 12 polja. Samo DM.\n\nNe volimo forme koje traže 12 polja prije nego što popričate s nekim.\n\nZato je najbrži način — DM.\n\nŠta nam pošaljete:\n— ✅ čime se bavite (jedna rečenica)\n— 🔥 šta Vam treba (stranica, shop, aplikacija, AI)\n— 💡 grad, ako nije Sarajevo\n\nTo je dovoljno. Mi pitamo dalje.\n\nOdgovaramo u roku od 10 minuta. Ako je noć — ujutro prvo.\n\nNe morate imati ni ideju ni materijal. Većina razgovora počne s „ne znam šta mi treba“.",
    tags: ["kontakt", "dm", "bezforme", "brzo", "sarajevo", "devlab"],
  },

  // ── 30. JAVITE NAM SE ────────────────────────────────────────────────────
  {
    id: "p30",
    template: "cta",
    category: "ponuda",
    layout: "center",
    palette: "ink",
    eyebrow: "Kontakt",
    title: "Recite čime se bavite. Ostalo je naš posao.",
    subtitle: "Instagram: @devlab.cc.cd · Email: kontakt@devlab.cc.cd · Sarajevo, cijela BiH",
    caption:
      "👋 Ne morate imati ni ideju. Ozbiljno.\n\nNe morate imati:\n— ✅ gotov tekst\n— 🔥 logo u vektoru\n— 💡 ideju kako stranica treba izgledati\n— ⚡ ni odluku da li Vam uopšte treba stranica\n\nDovoljno je da se javite i kažete čime se bavite.\n\nKako nas kontaktirate:\n— 🎯 Instagram DM: @devlab.cc.cd\n— 💰 e-mail: kontakt@devlab.cc.cd\n— 📈 ili pozovite: +387 62 576 456\n\nOdgovaramo u roku od 10 minuta. Bez obaveze i bez predujma.\n\nJavite nam se u DM.",
    tags: ["kontakt", "pocetak", "bezobaveze", "sarajevo", "devlab"],
  },
];
