import type { AdPost } from "./postsData";

// ───────────────────────────────────────────────────────────────────────────
// OBJAVE 1–20 — SADRŽAJ KOJI FIRME STVARNO KAČE
//
// Princip: kao da vodiš profil firme, ne prodajni katalog.
//   • edukacija ("zašto je stranica spora")
//   • iza kulisa ("ovako izgleda naš ponedjeljak")
//   • savjeti ("3 stvari koje klijenti najčešće zaborave")
//   • mišljenje ("ne slažemo se s ovim")
//   • rezultati ("prije / poslije")
//
// Prodaja postoji, ali kao svaka 5–6. objava, nikad kao pravilo.
// ───────────────────────────────────────────────────────────────────────────

export const POSTS_1: AdPost[] = [
  {
    id: "p01",
    template: "title",
    category: "edukacija",
    layout: "photoBg",
    photo: "code1",
    palette: "dark",
    eyebrow: "Edukacija",
    title: "Stranica koja se učitava 6 sekundi",
    subtitle: "Izgubi 4 od 10 posjetilaca prije nego što vidi prvu rečenicu.",
    slides: [
      { template: "title", eyebrow: "Edukacija", title: "Stranica koja se učitava 6 sekundi", subtitle: "Izgubi 4 od 10 posjetilaca." },
      { template: "number", eyebrow: "Podatak", title: "posjetilaca odustane nakon 3 sekunde", value: "53%", valueNote: "Google, mobilna verzija.", palette: "ink" },
      { template: "list", eyebrow: "Tri krivca", title: "Zašto je stranica spora", items: ["Slike od 4 MB", "12 plugina koji se blokiraju", "Hosting za 2 KM mjesečno"], palette: "sun" },
      { template: "cta", eyebrow: "Rješenje", title: "Sve tri stvari se rješavaju u jednom danu.", subtitle: "Testirajte svoju na PageSpeed-u.", palette: "teal" },
    ],
    caption:
      "Prosječan posjetilac čeka 2-3 sekunde. Nakon toga odlazi.\n\n" +
      "Najčešći krivci:\n" +
      "— slike od 4 MB koje niko ne optimizuje\n" +
      "— 12 plugina koji se međusobno blokiraju\n" +
      "— hosting za 2 KM mjesečno\n\n" +
      "Sve tri stvari se rješavaju u jednom danu.\n\n" +
      "Koja je Vaša stranica na PageSpeed testu?",
    tags: ["webstranica", "brzinastranice", "seo", "webdizajn", "sarajevo", "devforge"],
  },
  {
    id: "p02",
    template: "list",
    category: "izakulisa",
    layout: "center",
    palette: "ink",
    eyebrow: "Iza kulisa",
    title: "Naš ponedjeljak",
    items: ["3 stranice u izradi", "1 shop pred launchom", "2 poziva s novim klijentima", "0 neodgovorenih poruka"],
    caption:
      "Ovako izgleda jedan naš ponedjeljak.\n\n" +
      "Tri stranice su u izradi. Jedan shop čeka zadnje provjere prije objave. Dva poziva s novim ljudima koji tek razmišljaju da li im treba stranica.\n\n" +
      "I nula neodgovorenih poruka — to nam je pravilo, ne cilj.\n\n" +
      "Šta je na Vašoj listi ove sedmice?",
    tags: ["izakulisa", "agencija", "webdizajn", "produktivnost", "sarajevo", "devforge"],
  },
  {
    id: "p03",
    template: "title",
    category: "savjet",
    layout: "photo",
    photo: "desk1",
    palette: "teal",
    eyebrow: "Savjet",
    title: "Tri stvari koje klijenti zaborave",
    subtitle: "I onda ih skupljaju mjesecima nakon objave.",
    caption:
      "Prije nego što pustite stranicu u javnost, provjerite:\n\n" +
      "1. Da li imate pristup domeni i hostingu — na SVOJE ime, ne na agencijino.\n" +
      "2. Da li je Google Analytics povezan (inače nemate pojma ko dolazi).\n" +
      "3. Da li kontakt forma stvarno dostavlja poruke — testirajte sami.\n\n" +
      "Najgori scenario koji smo vidjeli: firma je platila stranicu, a domenu drži bivši izvođač. Godinu dana nisu mogli ništa mijenjati.\n\n" +
      "Provjerite danas. Traje 5 minuta.",
    tags: ["savjeti", "webstranica", "domena", "hosting", "malibiznis", "devforge"],
  },
  {
    id: "p04",
    template: "compare",
    category: "dokaz",
    layout: "band",
    palette: "sun",
    eyebrow: "Prije i poslije",
    title: "Ista firma, dvije stranice",
    items: ["6.2s učitavanje", "Ne radi na mobitelu", "Nema kontakt forme", "Niko ne zna za njih", "0.9s učitavanje", "Radi svuda", "Forma i poziv", "14 upita mjesečno"],
    caption:
      "Ovo je stvarna razlika kod jedne iste firme.\n\n" +
      "Prije: stranica napravljena 2016., učitava se 6 sekundi, na mobitelu se raspada, nema načina da Vas kontaktiraju osim ako negdje nađu broj.\n\n" +
      "Poslije: 0.9 sekundi, radi na svemu, forma je na vrhu.\n\n" +
      "Rezultat: 14 upita u prvom mjesecu. Nije magija — samo je stranica napravljena da radi.\n\n" +
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
    title: "„Prezentacija“ nije isto što i stranica.",
    subtitle: "Jedna donosi posao. Druga stoji na vizit karti.",
    caption:
      "Često dobijemo upit: „Treba mi prezentacija firme.“\n\n" +
      "Pitamo: šta ta stranica treba da uradi?\n\n" +
      "Ako je odgovor „da se nađe na Google-u i da ljudi nas kontaktiraju“ — to je jedna stvar, i radi se drugačije.\n\n" +
      "Ako je odgovor „da imamo nešto da pošaljemo“ — to može biti i PDF.\n\n" +
      "Stranica bez cilja je trošak. Stranica s ciljem je alat.\n\n" +
      "Znate li koji je cilj Vaše?",
    tags: ["brend", "webdizajn", "strategija", "malibiznis", "sarajevo", "devforge"],
  },
  {
    id: "p06",
    template: "list",
    category: "edukacija",
    layout: "split",
    palette: "mint",
    eyebrow: "Edukacija",
    title: "Šta Google stvarno gleda",
    items: ["Brzinu učitavanja", "Mobilnu verziju", "Jasnu strukturu naslova", "Tekst koji neko pročita"],
    caption:
      "SEO nije magija i nije 200 faktora koje morate znati.\n\n" +
      "Za lokalnu firmu u Bosni, Google praktično gleda četiri stvari:\n\n" +
      "1. Koliko brzo se stranica učita\n" +
      "2. Da li radi na mobitelu\n" +
      "3. Da li ima jasne naslove (H1, H2)\n" +
      "4. Da li tekst ima smisla čovjeku\n\n" +
      "Sve ostalo je nijansa. Ako ova četiri nisu riješena, ništa drugo ne pomaže.\n\n" +
      "Provjerite svoju stranicu na ove četiri stvari.",
    tags: ["seo", "google", "webstranica", "edukacija", "malibiznis", "devforge"],
  },
  {
    id: "p07",
    template: "number",
    category: "edukacija",
    layout: "center",
    palette: "light",
    eyebrow: "Podatak",
    title: "ljudi otvori stranicu na mobitelu",
    value: "76%",
    valueNote: "A mnoge firme je prave samo za računar.",
    caption:
      "76% ljudi koji dođu na Vašu stranicu to rade s mobitela.\n\n" +
      "Znači: ako stranica na mobitelu ne radi dobro, tri od četiri posjetioca ne vide ono što ste platili.\n\n" +
      "Najčešći problem: tekst koji se ne može pročitati bez zoom-a, dugmad koja su premala za prst, meni koji se ne otvara.\n\n" +
      "Otvorite svoju stranicu na mobitelu sad. Ako morate zoom-ati — imate problem.",
    tags: ["mobilni", "webdizajn", "podaci", "statistika", "malibiznis", "devforge"],
  },
  {
    id: "p08",
    template: "process",
    category: "izakulisa",
    layout: "photoTop",
    photo: "team1",
    palette: "ink",
    eyebrow: "Kako radimo",
    title: "Kako izgleda prva sedmica",
    items: ["Poziv od 15 minuta", "Vi pošaljete materijal", "Mi napravimo prvu verziju", "Vi kažete šta mijenjati"],
    caption:
      "Kad se javite, ne počinjemo s ugovorom.\n\n" +
      "Prvo: poziv od 15 minuta. Vi kažete čime se bavite, mi pitamo ko Vam je kupac i šta stranica treba da uradi.\n\n" +
      "Drugo: Vi pošaljete logo, slike i tekst koji imate. Ako nemate tekst — napišemo ga mi na osnovu razgovora.\n\n" +
      "Treće: u 2–5 dana napravimo radnu verziju. Vidite je na linku, nije screenshot.\n\n" +
      "Četvrto: kažete šta mijenjati. Radimo dok ne bude kako treba.\n\n" +
      "Tek onda pričamo o plaćanju.",
    tags: ["proces", "kakoradimo", "webdizajn", "izakulisa", "sarajevo", "devforge"],
  },
  {
    id: "p09",
    template: "list",
    category: "savjet",
    layout: "band",
    palette: "teal",
    eyebrow: "Savjet",
    title: "Znakovi da Vam treba nova stranica",
    items: ["Sramota Vas je poslati link", "Ne radi na mobitelu", "Ne možete sami ništa mijenjati", "Nema upita već mjesecima"],
    caption:
      "Ne treba Vam nova stranica jer je stara „ružna“.\n\n" +
      "Treba Vam nova stranica ako:\n\n" +
      "— je ne šaljete nikome jer Vas je sramota kako izgleda\n" +
      "— je otvorite na mobitelu i pola stvari se ne vidi\n" +
      "— za svaku sitnicu morate zvati izvođača\n" +
      "— mjesecima nema nijednog upita s nje\n\n" +
      "Ako ste prepoznali dva ili više — vrijeme je.\n\n" +
      "Ako nijedan — ne dirajte je, radi posao.",
    tags: ["savjeti", "webstranica", "redizajn", "malibiznis", "sarajevo", "devforge"],
  },
  {
    id: "p10",
    template: "quote",
    category: "brend",
    layout: "center",
    palette: "sun",
    eyebrow: "Naš stav",
    title: "Ne prodajemo obećanja. Pokazujemo rezultat.",
    subtitle: "Prva verzija uvijek ide prije plaćanja.",
    caption:
      "Najveći strah kad neko naručuje stranicu: „Šta ako platim i ne bude kako sam zamislio?“\n\n" +
      "Razumijemo. Zato radimo obrnuto.\n\n" +
      "Prvo napravimo radnu verziju. Vidite je na pravom linku, ne na slici. Prođete kroz nju, pošaljete prijatelju, pogledate na mobitelu.\n\n" +
      "Ako ne valja — ne plaćate ništa i idemo dalje.\n\n" +
      "Ako valja — plaćate i objavljujemo.\n\n" +
      "Rizik je na nama. To je jedini način da ljudi mirno spavaju.",
    tags: ["brend", "bezrizika", "webdizajn", "povjerenje", "sarajevo", "devforge"],
  },
  {
    id: "p11",
    template: "list",
    category: "edukacija",
    layout: "split",
    palette: "light",
    eyebrow: "Edukacija",
    title: "Zašto Vam stranica ne dolazi na Google",
    items: ["Nije nigdje linkovana", "Nema Google Business profil", "Nema ni jedne lokacije u tekstu", "Objavljena prije 3 dana"],
    caption:
      "„Napravili smo stranicu prije mjesec dana i nema nas na Google-u.“\n\n" +
      "Četiri najčešća razloga:\n\n" +
      "1. Nigdje nije linkovana — Google ne zna da postoji. Treba barem Google Business profil i društvene mreže.\n" +
      "2. Nemate Google Business profil — bez njega se ne pojavljujete na mapi, a to je 80% lokalnih pretraga.\n" +
      "3. U tekstu nigdje ne piše Vaš grad. Google ne zna gdje ste.\n" +
      "4. Prošla su 3 dana. Indeksiranje traje 1–4 sedmice.\n\n" +
      "Stranica sama nije dovoljna. Treba joj put do Google-a.",
    tags: ["seo", "google", "lokalni", "malibiznis", "edukacija", "devforge"],
  },
  {
    id: "p12",
    template: "number",
    category: "dokaz",
    layout: "photo",
    photo: "office",
    palette: "dark",
    eyebrow: "Rezultat",
    title: "sekundi — prosječno učitavanje naših stranica",
    value: "0.9",
    valueNote: "Mjereno na PageSpeed-u, mobilna verzija.",
    caption:
      "Naše stranice se u prosjeku učitavaju za 0.9 sekundi na mobitelu.\n\n" +
      "Zašto je to važno:\n" +
      "— Google rangira brže stranice više\n" +
      "— ljudi ne odlaze prije nego što pročitaju prvu rečenicu\n" +
      "— na slaboj vezi (koja je česta u Bosni) stranica i dalje radi\n\n" +
      "Kako postižemo: bez teških plugina, kompresovane slike, minimalan kod.\n\n" +
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
    title: "Šta staviti na naslovnu",
    items: ["Čime se bavite — jednom rečenicom", "Za koga radite", "Šta da uradi posjetilac", "Kako da Vas kontaktira"],
    caption:
      "Naslovna stranica ima jedan posao: da u 5 sekundi odgovori na tri pitanja.\n\n" +
      "1. Šta ova firma radi?\n" +
      "2. Da li je to za mene?\n" +
      "3. Šta treba da uradim sad?\n\n" +
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
    title: "Šablonska vs. rađena stranica",
    items: ["Gotova za dan", "0 KM mjesečno", "Sve firme izgledaju isto", "Ne možete ništa mijenjati", "3–5 dana", "Kod je Vaš", "Izgleda kao Vi", "Mijenjate sami"],
    caption:
      "Nije da je šablon loš. Nekad je ispravna odluka.\n\n" +
      "Šablon je dobar ako:\n" +
      "— tek počinjete i nemate budžet\n" +
      "— Vam stranica treba danas\n" +
      "— Vam je svejedno kako izgleda\n\n" +
      "Šablon je loš ako:\n" +
      "— se takmičite s firmama koje izgledaju ozbiljno\n" +
      "— Vam treba nešto što šablon ne može\n" +
      "— želite sami mijenjati tekst\n\n" +
      "Iskreno pitanje: koliko Vas košta to što izgledate kao 50 drugih firmi?",
    tags: ["poredjenje", "sablon", "webdizajn", "odluka", "malibiznis", "devforge"],
  },
  {
    id: "p15",
    template: "quote",
    category: "brend",
    layout: "stamp",
    palette: "teal",
    eyebrow: "Naš stav",
    title: "Dobra stranica nije ona koja je lijepa.",
    subtitle: "Nego ona nakon koje neko podigne telefon.",
    caption:
      "Možemo Vam napraviti najljepšu stranicu u Bosni. Ako niko ne pozove — promašili smo posao.\n\n" +
      "Zato prije dizajna pitamo:\n" +
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
    photo: "code2",
    palette: "dark",
    eyebrow: "Iza kulisa",
    title: "Alati koje koristimo svaki dan",
    items: ["React za sučelje", "Node i PHP za pozadinu", "Figma za dizajn", "Firebase za podatke"],
    caption:
      "Ljudi nas često pitaju u čemu radimo.\n\n" +
      "Sučelje: React i TypeScript. Razlog — brzo se učitava i lako se održava.\n" +
      "Pozadina: Node.js ili PHP, zavisno od projekta. Ne forsiramo jedno.\n" +
      "Dizajn: Figma. Prvo maketa, pa kod. Nikad obrnuto.\n" +
      "Podaci: Firebase kad treba brzo, PostgreSQL kad treba ozbiljno.\n\n" +
      "Alati nisu važni klijentu. Ali su važni kad za godinu tražite nekog da nastavi raditi na stranici.\n\n" +
      "Zato je kod uvijek Vaš.",
    tags: ["alati", "tehnologije", "react", "webdizajn", "izakulisa", "devforge"],
  },
  {
    id: "p17",
    template: "number",
    category: "edukacija",
    layout: "offset",
    palette: "light",
    eyebrow: "Podatak",
    title: "posjetilaca napusti stranicu ako se ne učita za 3 sekunde",
    value: "53%",
    valueNote: "Google, mobilna verzija.",
    caption:
      "Više od polovine ljudi ode prije nego što stranica pokaže prvi sadržaj.\n\n" +
      "To znači: ako se Vaša stranica učitava 5 sekundi, pola budžeta za marketing bacate na ljude koji nikad nisu vidjeli šta prodajete.\n\n" +
      "Najbrža popravka koju možete uraditi sami: smanjite slike.\n" +
      "— slika od 3 MB → 300 KB, ne vidi se razlika\n" +
      "— koristite WebP umjesto JPG\n" +
      "— provjerite na tinypng.com\n\n" +
      "Traje 20 minuta. Uštedi sekunde.",
    tags: ["brzina", "podaci", "webdizajn", "statistika", "malibiznis", "devforge"],
  },
  {
    id: "p18",
    template: "process",
    category: "izakulisa",
    layout: "center",
    palette: "sun",
    eyebrow: "Iza kulisa",
    title: "Šta radimo prije nego napišemo liniju koda",
    items: ["Razgovor o kupcu", "Pregled konkurencije", "Struktura stranica na papiru", "Tekst prije dizajna"],
    caption:
      "Redoslijed je važan. Ovako izgleda naš početak:\n\n" +
      "1. Razgovor — 30 minuta o tome ko je kupac i šta ga muči.\n" +
      "2. Konkurencija — gledamo 5 firmi koje rade isto. Šta im rade dobro, šta loše.\n" +
      "3. Struktura — nacrtamo stranice na papiru. Koja vodi gdje, šta je na svakoj.\n" +
      "4. Tekst — pišemo prvo tekst, pa dizajn. Obrnuto nikad ne radi.\n\n" +
      "Tek onda Figma. Tek onda kod.\n\n" +
      "Zato prva verzija obično bude dobra iz prve — jer je pola posla urađeno prije nego što se vidi.",
    tags: ["proces", "izakulisa", "webdizajn", "priprema", "devforge"],
  },
  {
    id: "p19",
    template: "list",
    category: "savjet",
    layout: "band",
    palette: "ink",
    eyebrow: "Savjet",
    title: "Kako da Vam Google Business profil radi",
    items: ["Stavite tačnu adresu i radno vrijeme", "Dodajte 10 stvarnih fotografija", "Tražite recenzije od kupaca", "Objavljujte jednom mjesečno"],
    caption:
      "Za lokalnu firmu, Google Business profil donosi više poziva nego stranica.\n\n" +
      "Četiri stvari koje većina ne uradi:\n\n" +
      "1. Radno vrijeme — ako je pogrešno, ljudi dolaze kad ste zatvoreni i ostavljaju lošu recenziju.\n" +
      "2. Fotografije — 10 stvarnih slika prostora i tima. Ne stock.\n" +
      "3. Recenzije — pitajte svakog zadovoljnog kupca. 20 recenzija mijenja sve.\n" +
      "4. Objave — jednom mjesečno nešto novo. Google to vidi.\n\n" +
      "Sve je besplatno. Samo traži vrijeme.",
    tags: ["google", "lokalni", "seo", "savjeti", "malibiznis", "devforge"],
  },
  {
    id: "p20",
    template: "quote",
    category: "brend",
    layout: "split",
    palette: "dark",
    eyebrow: "Naš stav",
    title: "Ako Vam ne možemo pomoći — reći ćemo Vam to.",
    subtitle: "Bolje izgubiti posao nego uraditi ga loše.",
    caption:
      "Dešava se da nas pitaju za nešto što ne radimo dobro.\n\n" +
      "Na primjer: veliki web shop s 5000 proizvoda i integracijom s 3 sistema. To nije naš teren.\n\n" +
      "Kažemo to odmah, u prvom razgovoru. I preporučimo nekog ko to radi.\n\n" +
      "Zašto? Jer loše urađen posao košta više od izgubljenog. Košta reputaciju, košta vrijeme, i na kraju moraš ga ispravljati besplatno.\n\n" +
      "Ako Vam neko kaže da može sve — pitajte ga šta ne može.",
    tags: ["brend", "iskrenost", "povjerenje", "agencija", "devforge"],
  },
];
