import type { AdPost } from "./postsData";

// ───────────────────────────────────────────────────────────────────────────
// OBJAVE 1–20 — SVAKA SLIKA NOSI JEDNU JASNU PORUKU
//
// Test koji svaka objava mora proći: pokažete sliku nekome 2 sekunde.
// Ako ne može prepričati o čemu je — tekst je loš.
//
// Zato naslov uvijek TVRDI nešto, nikad ne imenuje temu:
//   ✗ "Stranica koja se učitava 6 sekundi"  → tema, ništa ne tvrdi
//   ✓ "6 sekundi = 4 kupca odlaze"          → tvrdnja, jasna odmah
//
// Podnaslov objašnjava, nikad ne ponavlja naslov.
// ───────────────────────────────────────────────────────────────────────────

export const POSTS_1: AdPost[] = [
  {
    id: "p01",
    template: "title",
    category: "edukacija",
    layout: "photoBg",
    photo: "hero",
    palette: "dark",
    eyebrow: "Brzina",
    title: "6 sekundi = 4 kupca odu",
    subtitle: "Toliko traje učitavanje. Ljudi ne čekaju toliko.",
    slides: [
      {
        template: "title",
        eyebrow: "Brzina",
        title: "6 sekundi = 4 kupca odu",
        subtitle: "Toliko traje učitavanje. Ljudi ne čekaju toliko.",
      },
      {
        template: "number",
        eyebrow: "Podatak",
        title: "ljudi zatvori stranicu nakon 3 sekunde",
        value: "53%",
        valueNote: "Mjereno na mobilnom. Google podaci.",
        palette: "ink",
      },
      {
        template: "list",
        eyebrow: "Tri uzroka",
        title: "Zašto je spora",
        items: ["Slike od 4 MB", "Plugin koji blokira", "Loš hosting"],
        palette: "sun",
      },
      {
        template: "cta",
        eyebrow: "Popravka",
        title: "Sve tri se rješavaju u jednom danu.",
        subtitle: "Testirajte svoju na PageSpeed-u — besplatno je.",
        palette: "teal",
      },
    ],
    caption:
      "6 sekundi zvuči kratko. Ali 53% ljudi zatvori stranicu nakon 3.\n\n" +
      "Dakle: od 10 ljudi koji kliknu na Vaš link, 5 nikad ne vidi šta prodajete. Ne zato što im ne treba — zato što su odustali.\n\n" +
      "Tri uzroka koja pokrivaju 90% slučajeva:\n" +
      "1. Slike od 3–4 MB koje niko nije smanjio. Rješenje traje 20 minuta.\n" +
      "2. Plugin (često slider ili chat) koji blokira učitavanje dok se ne učita sam.\n" +
      "3. Hosting za 2 KM mjesečno — dijeli server sa 500 drugih sajtova.\n\n" +
      "Testirajte svoju stranicu na PageSpeed Insights. Ako je preko 3 sekunde, imate posla.\n\n" +
      "Koliko je Vaša?",
    tags: ["webstranica", "brzinastranice", "seo", "webdizajn", "sarajevo", "devforge"],
  },
  {
    id: "p02",
    template: "list",
    category: "izakulisa",
    layout: "center",
    palette: "ink",
    eyebrow: "Iza kulisa",
    title: "Ponedjeljak: 3 stranice, 0 neodgovorenih",
    items: ["3 stranice u izradi", "1 shop pred objavom", "0 neodgovorenih poruka"],
    caption:
      "Subota uveče, nedjelja — niko ne radi. Ponedjeljak ujutro izgleda ovako.\n\n" +
      "Tri stranice su u izradi. Jedan shop čeka zadnje provjere prije objave. I nula neodgovorenih poruka — to nam je pravilo od prvog dana, ne cilj kojem težimo.\n\n" +
      "Zašto to pišem: jer „odgovaramo brzo“ je fraza koju svi stavljaju. Ovo je broj koji se može provjeriti.\n\n" +
      "Šta je na Vašoj listi ove sedmice?",
    tags: ["izakulisa", "agencija", "webdizajn", "produktivnost", "sarajevo", "devforge"],
  },
  {
    id: "p03",
    template: "title",
    category: "savjet",
    layout: "photo",
    photo: "heroMob",
    palette: "teal",
    eyebrow: "Savjet",
    title: "Domena mora biti na Vaše ime",
    subtitle: "Ne na izvođačevo. Inače je stranica njegova, ne Vaša.",
    caption:
      "Najgori slučaj koji smo vidjeli: firma je platila stranicu, a domenu drži bivši izvođač. Godinu dana nisu mogli ništa mijenjati.\n\n" +
      "Kako se to desi: izvođač registruje domenu na svoj račun jer je „brže tako“. Poslije ne da pristup.\n\n" +
      "Tri stvari provjerite danas — traje 5 minuta:\n\n" +
      "1. Na koga je registrovana domena? (Provjerite na whois servisu.)\n" +
      "2. Imate li pristup hosting panelu, ili samo izvođač?\n" +
      "3. Ako danas prekinete saradnju — zadržavate li stranicu?\n\n" +
      "Ako je odgovor na bilo koje „ne“ — riješite to sada, dok je sve u redu.",
    tags: ["savjeti", "domena", "hosting", "webstranica", "malibiznis", "devforge"],
  },
  {
    id: "p04",
    template: "compare",
    category: "dokaz",
    layout: "band",
    palette: "sun",
    eyebrow: "Prije i poslije",
    title: "Ista firma: 6s vs. 0.9s učitavanje",
    items: ["6.2s učitavanje", "Ne radi na mobitelu", "Nema kontakt forme", "Niko ne zna za njih", "0.9s učitavanje", "Radi svuda", "Forma na vrhu", "14 upita mjesečno"],
    caption:
      "Stvarna razlika kod jedne iste firme. Ništa nije mijenjano osim stranice.\n\n" +
      "PRIJE: stranica iz 2016., učitava se 6.2 sekunde, na mobitelu se raspada, nema načina da ih kontaktirate osim ako negdje nađete broj.\n\n" +
      "POSLIJE: 0.9 sekundi, radi na svemu, forma je na vrhu.\n\n" +
      "Rezultat u prvom mjesecu: 14 upita. Nije magija — samo je stranica napravljena da radi.\n\n" +
      "Kako izgleda Vaša?",
    tags: ["prijeiposlije", "webdizajn", "rezultati", "malibiznis", "sarajevo", "devforge"],
  },
  {
    id: "p05",
    template: "quote",
    category: "brend",
    layout: "stamp",
    palette: "dark",
    eyebrow: "Naš stav",
    title: "Stranica bez cilja je trošak.",
    subtitle: "Pitajte se: šta ova stranica treba da uradi?",
    caption:
      "Često dobijemo upit: treba mi stranica za firmu.\n\n" +
      "Pitamo: šta ta stranica treba da uradi?\n\n" +
      "Ako je odgovor „da nas nađu na Google-u i da nas pozovu“ — to je jedan posao, i radi se na jedan način.\n\n" +
      "Ako je odgovor „da imamo nešto da pošaljemo“ — to može biti i PDF.\n\n" +
      "Stranica s jasnim ciljem je alat. Stranica bez cilja je trošak koji stoji.\n\n" +
      "Znate li koji je cilj Vaše?",
    tags: ["brend", "webdizajn", "strategija", "malibiznis", "sarajevo", "devforge"],
  },
  {
    id: "p06",
    template: "list",
    category: "edukacija",
    layout: "split",
    palette: "mint",
    eyebrow: "Google",
    title: "Četiri stvari koje Google gleda",
    items: ["Brzina učitavanja", "Mobilna verzija", "Jasni naslovi", "Tekst koji se čita"],
    caption:
      "SEO nije 200 faktora. Za lokalnu firmu Google praktično gleda četiri stvari:\n\n" +
      "1. Koliko brzo se stranica učita — preko 3 sekunde i gubite poziciju.\n" +
      "2. Da li radi na mobitelu — 76% pretraga je s mobitela.\n" +
      "3. Da li ima jasne naslove (H1, H2) — Google tako razumije o čemu je stranica.\n" +
      "4. Da li tekst ima smisla čovjeku — ne natrpan ključnim riječima.\n\n" +
      "Sve ostalo je nijansa. Ako ova četiri nisu riješena, ništa drugo ne pomaže.\n\n" +
      "Provjerite svoju na ove četiri stvari.",
    tags: ["seo", "google", "webstranica", "edukacija", "malibiznis", "devforge"],
  },
  {
    id: "p07",
    template: "number",
    category: "edukacija",
    layout: "center",
    palette: "light",
    eyebrow: "Podatak",
    title: "ljudi dođe na stranicu preko mobitela",
    value: "76%",
    valueNote: "A mnoge firme je prave samo za računar.",
    caption:
      "76 od 100 ljudi koji dođu na Vašu stranicu to rade s mobitela.\n\n" +
      "Znači: ako stranica na mobitelu ne radi, tri od četiri posjetioca ne vide ono što ste platili.\n\n" +
      "Tri najčešća problema:\n" +
      "— tekst koji se ne može pročitati bez zumiranja\n" +
      "— dugmad premala za prst (treba min. 44px)\n" +
      "— meni koji se ne otvara ili se otvori pa ne zatvori\n\n" +
      "Otvorite svoju stranicu na telefonu sad. Ako morate zumirati — imate problem koji rješava dva dana rada.\n\n" +
      "Kad ste je zadnji put pogledali na mobitelu?",
    tags: ["mobilni", "webdizajn", "podaci", "statistika", "malibiznis", "devforge"],
  },
  {
    id: "p08",
    template: "process",
    category: "izakulisa",
    layout: "photoTop",
    photo: "project1",
    palette: "ink",
    eyebrow: "Kako radimo",
    title: "Prva sedmica, korak po korak",
    items: ["Poziv 15 minuta", "Vi šaljete materijal", "Mi radimo prvu verziju", "Vi kažete šta mijenjati"],
    caption:
      "Kad se javite, ne počinjemo s ugovorom.\n\n" +
      "1. Poziv od 15 minuta. Vi kažete čime se bavite, mi pitamo ko Vas zove i šta stranica treba da uradi.\n\n" +
      "2. Vi pošaljete logo, slike i tekst koji imate. Ako nemate tekst — napišemo ga mi na osnovu razgovora.\n\n" +
      "3. U 2–5 dana napravimo radnu verziju na pravom linku. Ne screenshot — prava stranica koju možete otvoriti.\n\n" +
      "4. Kažete šta mijenjati. Radimo dok ne bude kako treba. Tek onda plaćate.\n\n" +
      "Bez predujma, bez avansa, bez ugovora prije nego što vidite.",
    tags: ["proces", "kakoradimo", "webdizajn", "izakulisa", "sarajevo", "devforge"],
  },
  {
    id: "p09",
    template: "list",
    category: "savjet",
    layout: "band",
    palette: "teal",
    eyebrow: "Provjera",
    title: "Četiri znaka da Vam treba nova stranica",
    items: ["Sramota Vas je poslati link", "Na mobitelu se raspada", "Ne mijenjate ništa sami", "Nema upita mjesecima"],
    caption:
      "Ne treba Vam nova stranica zato što je „ružna“. Treba Vam ako:\n\n" +
      "1. Je ne šaljete nikome jer Vas je sramota kako izgleda. To je najjasniji znak.\n" +
      "2. Je otvorite na mobitelu i pola stvari se ne vidi ili ne radi.\n" +
      "3. Za svaku sitnicu (promjena cijene, nova slika) morate zvati izvođača.\n" +
      "4. Mjesecima nema nijednog upita s nje.\n\n" +
      "Ako ste prepoznali dva ili više — vrijeme je.\n\n" +
      "Ako nijedan — ne dirajte je. Radi posao, a novac ide na nešto drugo.",
    tags: ["savjeti", "webstranica", "redizajn", "malibiznis", "sarajevo", "devforge"],
  },
  {
    id: "p10",
    template: "quote",
    category: "brend",
    layout: "center",
    palette: "sun",
    eyebrow: "Naš stav",
    title: "Prvo vidite, pa platite.",
    subtitle: "Radnu verziju pravimo prije nego što date ijednu marku.",
    caption:
      "Najveći strah kad neko naručuje stranicu: šta ako platim i ne bude kako sam zamislio?\n\n" +
      "Razumijemo. Zato radimo obrnuto.\n\n" +
      "Prvo napravimo radnu verziju. Vidite je na pravom linku — ne na slici, ne u prezentaciji. Otvorite je, pošaljete prijatelju, pogledate na mobitelu.\n\n" +
      "Ako ne valja — ne plaćate ništa i idemo dalje.\n" +
      "Ako valja — plaćate i objavljujemo.\n\n" +
      "Rizik je na nama. To je jedini način da ljudi mirno spavaju, i jedini način da mi radimo bez stresa.",
    tags: ["brend", "bezrizika", "webdizajn", "povjerenje", "sarajevo", "devforge"],
  },
  {
    id: "p11",
    template: "list",
    category: "edukacija",
    layout: "split",
    palette: "light",
    eyebrow: "Google",
    title: "Zašto Vas nema na Google-u",
    items: ["Niko ne linkuje na Vas", "Nema Google Business profil", "Nema grada u tekstu", "Nije prošla indeksacija"],
    caption:
      "Napravili smo stranicu prije mjesec dana i nema nas na Google-u.\n\n" +
      "Četiri najčešća razloga:\n\n" +
      "1. Nigdje nije linkovana. Google ne zna da postoji. Treba barem Google Business profil i društvene mreže.\n" +
      "2. Nemate Google Business profil. Bez njega se ne pojavljujete na mapi — a to je 80% lokalnih pretraga.\n" +
      "3. U tekstu nigdje ne piše Vaš grad. Google ne zna gdje ste.\n" +
      "4. Prošla su 3 dana. Indeksiranje traje 1–4 sedmice.\n\n" +
      "Stranica sama nije dovoljna. Treba joj put do Google-a.\n\n" +
      "Kad ste zadnji put provjerili svoju poziciju?",
    tags: ["seo", "google", "lokalni", "malibiznis", "edukacija", "devforge"],
  },
  {
    id: "p12",
    template: "number",
    category: "dokaz",
    layout: "photo",
    photo: "project2",
    palette: "dark",
    eyebrow: "Naš rezultat",
    title: "sekundi — prosječno učitavanje naših stranica",
    value: "0.9",
    valueNote: "PageSpeed, mobilna verzija.",
    caption:
      "Naše stranice se u prosjeku učitavaju za 0.9 sekundi na mobitelu. Mjereno na PageSpeed-u.\n\n" +
      "Zašto to nije samo tehnička stvar:\n" +
      "— Google rangira brže stranice više\n" +
      "— ljudi ne odlaze prije nego što pročitaju prvu rečenicu\n" +
      "— na slaboj vezi (koja je česta van Sarajeva) stranica i dalje radi\n\n" +
      "Kako postižemo: bez teških plugina, kompresovane slike, minimalan kod. Ništa egzotično.\n\n" +
      "Testirajte svoju na PageSpeed Insights. Ako je preko 3 sekunde — imate posla.",
    tags: ["brzina", "rezultati", "webdizajn", "pagespeed", "devforge"],
  },
  {
    id: "p13",
    template: "list",
    category: "savjet",
    layout: "center",
    palette: "ink",
    eyebrow: "Savjet",
    title: "Šta mora biti na prvom ekranu",
    items: ["Šta firma radi", "Za koga radi", "Šta da uradi posjetilac"],
    caption:
      "Naslovna stranica ima jedan posao: odgovoriti na tri pitanja u 5 sekundi.\n\n" +
      "1. Šta ova firma radi? Jedna rečenica, bez fraza poput „sinonim za kvalitet“.\n" +
      "2. Da li je to za mene? Za koga radite — mala firma, velika firma, građani.\n" +
      "3. Šta da uradim sad? Dugme koje se vidi bez skrolanja.\n\n" +
      "Ako posjetilac ne nađe odgovore u prvom ekranu, skrola dalje ili odlazi.\n\n" +
      "Najčešća greška: velika slika, logo, i nigdje živa rečenica šta firma radi.\n\n" +
      "Napišite svoju prvu rečenicu. Ako je duža od 12 riječi — skratite.",
    tags: ["savjeti", "webdizajn", "naslovna", "ux", "malibiznis", "devforge"],
  },
  {
    id: "p14",
    template: "compare",
    category: "edukacija",
    layout: "band",
    palette: "mint",
    eyebrow: "Poređenje",
    title: "Šablon vs. stranica po mjeri",
    items: ["Gotova za dan", "Džabe mjesečno", "Svi izgledaju isto", "Ne mijenjate ništa", "3–5 dana", "Kod je Vaš", "Izgleda kao Vi", "Mijenjate sami"],
    caption:
      "Nije da je šablon loš. Nekad je ispravna odluka.\n\n" +
      "Šablon je dobar ako: tek počinjete, nemate budžet, ili Vam stranica treba danas.\n\n" +
      "Šablon je loš ako: se takmičite s firmama koje izgledaju ozbiljno, ili Vam treba nešto što šablon ne može.\n\n" +
      "Ključna razlika nije dizajn. Razlika je: šablon ne možete mijenjati sami, a kod po mjeri možete.\n\n" +
      "Iskreno pitanje: koliko Vas košta to što izgledate kao 50 drugih firmi u Bosni?",
    tags: ["poredjenje", "sablon", "webdizajn", "odluka", "malibiznis", "devforge"],
  },
  {
    id: "p15",
    template: "quote",
    category: "brend",
    layout: "stamp",
    palette: "teal",
    eyebrow: "Naš stav",
    title: "Lijepa stranica nije dobra stranica.",
    subtitle: "Dobra je ona nakon koje neko podigne telefon.",
    caption:
      "Možemo Vam napraviti najljepšu stranicu u Bosni. Ako niko ne pozove — promašili smo posao.\n\n" +
      "Zato prije dizajna pitamo tri stvari:\n" +
      "— Ko je Vaš kupac?\n" +
      "— Šta ga trenutno sprječava da Vas pozove?\n" +
      "— Šta mora vidjeti da bi Vam vjerovao?\n\n" +
      "Tekst, raspored i dugmad se rade prema tim odgovorima. Boje i fontovi dolaze na kraju.\n\n" +
      "Ljepota je posljedica. Ne cilj.",
    tags: ["brend", "webdizajn", "strategija", "konverzija", "devforge"],
  },
  {
    id: "p16",
    template: "list",
    category: "izakulisa",
    layout: "photoBg",
    photo: "web",
    palette: "dark",
    eyebrow: "Iza kulisa",
    title: "React, Node, Figma, Firebase",
    items: ["React za sučelje", "Node i PHP za pozadinu", "Figma za dizajn", "Firebase za podatke"],
    caption:
      "Ljudi nas često pitaju u čemu radimo. Odgovor:\n\n" +
      "Sučelje: React i TypeScript. Razlog — brzo se učitava i lako se održava.\n" +
      "Pozadina: Node.js ili PHP, zavisno od projekta. Ne forsiramo jedno.\n" +
      "Dizajn: Figma. Prvo maketa, pa kod. Nikad obrnuto.\n" +
      "Podaci: Firebase kad treba brzo, PostgreSQL kad treba ozbiljno.\n\n" +
      "Zašto Vam je ovo važno kao klijentu: kad za godinu dana tražite nekog da nastavi raditi na stranici, alati određuju koliko će to biti lako.\n\n" +
      "Zato je kod uvijek Vaš, u standardnim tehnologijama, bez zaključavanja.",
    tags: ["alati", "tehnologije", "react", "webdizajn", "izakulisa", "devforge"],
  },
  {
    id: "p17",
    template: "number",
    category: "edukacija",
    layout: "offset",
    palette: "light",
    eyebrow: "Brzina",
    title: "ljudi ode ako se stranica ne učita za 3 sekunde",
    value: "53%",
    valueNote: "Google, mobilna verzija.",
    caption:
      "Više od polovine ljudi ode prije nego što stranica pokaže prvi sadržaj.\n\n" +
      "To praktično znači: ako se Vaša stranica učitava 5 sekundi, pola budžeta za marketing bacate na ljude koji nikad nisu vidjeli šta prodajete.\n\n" +
      "Najbrža popravka koju možete uraditi sami — smanjite slike:\n" +
      "— slika od 3 MB → 300 KB, razlika se ne vidi\n" +
      "— WebP umjesto JPG, 30% manje\n" +
      "— tinypng.com, besplatno\n\n" +
      "Traje 20 minuta. Uštedi sekunde.\n\n" +
      "Koliko slika imate na naslovnoj?",
    tags: ["brzina", "podaci", "webdizajn", "statistika", "malibiznis", "devforge"],
  },
  {
    id: "p18",
    template: "process",
    category: "izakulisa",
    layout: "center",
    palette: "sun",
    eyebrow: "Iza kulisa",
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
    tags: ["proces", "izakulisa", "webdizajn", "priprema", "devforge"],
  },
  {
    id: "p19",
    template: "list",
    category: "savjet",
    layout: "band",
    palette: "ink",
    eyebrow: "Savjet",
    title: "Google Business profil donosi više od stranice",
    items: ["Tačno radno vrijeme", "10 stvarnih fotografija", "Recenzije kupaca", "Mjesečna objava"],
    caption:
      "Za lokalnu firmu, Google Business profil donosi više poziva nego stranica. I besplatan je.\n\n" +
      "Četiri stvari koje većina ne uradi:\n\n" +
      "1. Radno vrijeme. Ako je pogrešno, ljudi dolaze kad ste zatvoreni i ostavljaju lošu recenziju.\n" +
      "2. Fotografije. 10 stvarnih slika prostora i tima. Ne stock fotografije.\n" +
      "3. Recenzije. Pitajte svakog zadovoljnog kupca. 20 recenzija mijenja sve.\n" +
      "4. Objave. Jednom mjesečno nešto novo — Google to vidi i rangira.\n\n" +
      "Sve je besplatno, samo traži dva sata mjesečno.\n\n" +
      "Imate li profil?",
    tags: ["google", "lokalni", "seo", "savjeti", "malibiznis", "devforge"],
  },
  {
    id: "p20",
    template: "quote",
    category: "brend",
    layout: "split",
    palette: "dark",
    eyebrow: "Naš stav",
    title: "Ako ne možemo — reći ćemo Vam.",
    subtitle: "Bolje izgubiti posao nego uraditi ga loše.",
    caption:
      "Dešava se da nas pitaju za nešto što ne radimo dobro.\n\n" +
      "Primjer: veliki web shop s 5000 proizvoda i integracijom na tri sistema. To nije naš teren.\n\n" +
      "Kažemo odmah, u prvom razgovoru. I preporučimo nekog ko to radi.\n\n" +
      "Zašto: loše urađen posao košta više od izgubljenog. Košta reputaciju, košta vrijeme, i na kraju ga moraš ispravljati besplatno.\n\n" +
      "Ako Vam neko kaže da može sve — pitajte ga šta ne može.",
    tags: ["brend", "iskrenost", "povjerenje", "agencija", "devforge"],
  },
];
