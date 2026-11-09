import type { AdPost } from "./postsData";

// ───────────────────────────────────────────────────────────────────────────
// OBJAVE 41–60 — ISTE PORUKE SA HOME PAGE-A, TREĆI UGAO
//
// Samo 4 slike iz hero sekcije: hero · heroMob · web · mobile
// ───────────────────────────────────────────────────────────────────────────

export const POSTS_3: AdPost[] = [
  {
    id: "p41",
    template: "title",
    category: "ponuda",
    layout: "photoBg",
    photo: "hero",
    palette: "ink",
    eyebrow: "Bez predujma",
    title: "Rizik smo uzeli na sebe. Doslovno.",
    subtitle: "Razvoj počinjemo bez da ste dali ijednu marku.",
    caption:
      "Kad neko kaže „sav rizik je na nama“, obično misli na marketinšku frazu. Kod nas je doslovno.\n\n" +
      "Kako to izgleda u praksi:\n\n" +
      "— Ne dajete predujam. Nula.\n" +
      "— Mi potrošimo 5 dana na gotovu verziju prije bilo kakvog dogovora.\n" +
      "— Ako Vam se ne svidi — tih 5 dana je naš gubitak, ne Vaš.\n" +
      "— Ako se svidi — plaćate kad je gotovo.\n\n" +
      "Zašto to možemo: jer pola posla radimo prije nego što počnemo (struktura, tekst, odluke). Zato prva verzija obično bude dobra iz prve.\n\n" +
      "Nemate šta izgubiti osim 15 minuta razgovora.",
    tags: ["bezpredujma", "rizik", "povjerenje", "webdizajn", "sarajevo", "devforge"],
  },
  {
    id: "p42",
    template: "number",
    category: "ponuda",
    layout: "center",
    palette: "dark",
    eyebrow: "Cijena",
    title: "KM — početna cijena web stranice",
    value: "150",
    valueNote: "Uključen dizajn, mobilna verzija i admin panel.",
    caption:
      "Web stranica od 150 KM. To je početna cijena i to je na sajtu.\n\n" +
      "Šta je u tih 150 KM:\n" +
      "— dizajn prilagođen Vašem brendu\n" +
      "— mobilna verzija (radi na telefonu)\n" +
      "— admin panel (sami mijenjate sadržaj)\n" +
      "— SEO osnova\n" +
      "— kontakt forma\n" +
      "— četiri besplatne revizije\n\n" +
      "Zašto ne „od 150 KM*“ s fusnotom: jer fusnote služe da sakriju konačnu cijenu. Naša je javna.\n\n" +
      "Konačna cijena zavisi od broja stranica i funkcionalnosti — i dobijate je prije početka, ne poslije.\n\n" +
      "Web shopovi su od 600 KM.\n\n" +
      "Šta Vam treba?",
    tags: ["cijene", "150km", "webstranice", "transparentnost", "sarajevo", "devforge"],
  },
  {
    id: "p43",
    template: "list",
    category: "ponuda",
    layout: "photo",
    photo: "mobile",
    palette: "teal",
    eyebrow: "Admin panel",
    title: "Vaša stranica. Vaša kontrola.",
    items: ["Mijenjate kad hoćete", "Bez čekanja izvođača", "Bez dodatnih troškova", "Bez znanja koda"],
    caption:
      "Najveća razlika između „stranice“ i „stranice koja radi za Vas“ je ko je može mijenjati.\n\n" +
      "S admin panelom:\n" +
      "— mijenjate kad hoćete, ne kad izvođač ima vremena\n" +
      "— ne plaćate svaku sitnicu\n" +
      "— ne morate znati kod\n" +
      "— ne čekate da neko odgovori na mejl\n\n" +
      "Praktično: ako znate koristiti Facebook, znate i ovo.\n\n" +
      "Zašto je to važno: stranica koja se ne ažurira izgleda napušteno. A napuštena stranica odbija kupce više nego nikakva.\n\n" +
      "Koliko puta ste htjeli nešto promijeniti i odustali?",
    tags: ["adminpanel", "cms", "kontrola", "samostalnost", "sarajevo", "devforge"],
  },
  {
    id: "p44",
    template: "compare",
    category: "ponuda",
    layout: "band",
    palette: "mint",
    eyebrow: "Pet dana",
    title: "Šta dobijete u 5 dana vs. u mjesec",
    items: ["Čekate odgovor", "Nagađate cijenu", "Ne vidite ništa", "Mjesec prođe", "Vidite stranicu", "Znate cijenu", "Kažete šta mijenjati", "Za 5 dana gotovo"],
    caption:
      "Razlika između „za 5 dana“ i „za mjesec“ nije u brzini rada. U pripremi je.\n\n" +
      "MJESEC (standardno):\n" +
      "— pošaljete upit, čekate odgovor\n" +
      "— dobijete „po dogovoru“, pa nagađate\n" +
      "— nedjeljama ne vidite ništa\n" +
      "— prva verzija dođe i pola stvari nije kako treba\n\n" +
      "PET DANA (kod nas):\n" +
      "— 15 minuta razgovora, isti dan\n" +
      "— struktura i tekst prije dizajna (pola posla)\n" +
      "— stranica na pravom linku u 5 dana\n" +
      "— kažete šta mijenjati, radimo izmjene\n\n" +
      "Brzo nije brzopleto. Brzo znači: priprema prije, rad poslije.",
    tags: ["5dana", "brzina", "proces", "poredjenje", "sarajevo", "devforge"],
  },
  {
    id: "p45",
    template: "quote",
    category: "brend",
    layout: "stamp",
    palette: "sun",
    eyebrow: "Naš stav",
    title: "Kupac koji mora pitati cijenu ne kupuje.",
    subtitle: "Zato su naše cijene na sajtu.",
    caption:
      "Kad neko mora poslati upit da bi saznao okvirnu cijenu, dvije stvari se dese:\n\n" +
      "1. Nagađa. Obično pogriješi u Visočiju smjeru i odustane.\n" +
      "2. Čeka. I u međuvremenu nađe nekog ko je cijenu objavio.\n\n" +
      "Zato su naše cijene javne: web stranice od 150 KM, shopovi od 600 KM.\n\n" +
      "Šta to ne pokriva: konačnu cijenu za Vaš konkretni projekt. Ona zavisi od broja stranica i funkcionalnosti — i dobijate je prije početka, ne poslije.\n\n" +
      "Transparentnost nije marketinška riječ. To je jedan broj na sajtu.",
    tags: ["cijene", "transparentnost", "povjerenje", "webdizajn", "devforge"],
  },
  {
    id: "p46",
    template: "title",
    category: "ponuda",
    layout: "photoTop",
    photo: "web",
    palette: "dark",
    eyebrow: "Šta dobijate",
    title: "Stranica, panel i četiri revizije. Sve uključeno.",
    subtitle: "Bez doplata i bez naknadnih stavki na kraju.",
    caption:
      "Sve što Vam treba za početak — u jednoj cijeni.\n\n" +
      "Uključeno:\n" +
      "— UI/UX dizajn\n" +
      "— razvoj i kod\n" +
      "— mobilna verzija\n" +
      "— admin panel\n" +
      "— SEO osnova\n" +
      "— analitika (znate ko dolazi)\n" +
      "— četiri revizije\n" +
      "— besplatna prva verzija\n\n" +
      "Nije uključeno: domena i hosting. Njih plaćate direktno provideru, bez naše marže.\n\n" +
      "Zašto je to važno: kod većine agencija osnovna cijena je početak. Dizajn se doplaćuje, mobilna verzija se doplaćuje, izmjene se doplaćuju.\n\n" +
      "Ovdje nema doplata jer nema stavki.",
    tags: ["ukljuceno", "cijene", "webdizajn", "revizije", "sarajevo", "devforge"],
  },
  {
    id: "p47",
    template: "list",
    category: "ponuda",
    layout: "split",
    palette: "light",
    eyebrow: "AI sistemi",
    title: "AI koji odgovara umjesto Vas",
    items: ["Na pitanja o cijenama", "Na pitanja o terminima", "Na pitanja o dostavi", "Na pitanja o lokaciji"],
    caption:
      "Četiri pitanja koja dobijate svaki dan — AI odgovara umjesto Vas:\n\n" +
      "— „Koliko košta?“ → zna Vaš cjenovnik\n" +
      "— „Imate li termin u srijedu?“ → zna raspored\n" +
      "— „Dostavljate li u Zenicu?“ → zna područje\n" +
      "— „Gdje se nalazite?“ → zna adresu i radno vrijeme\n\n" +
      "Odgovara 24 sata, bez pauze. Za sve komplikovano prosljeđuje Vama s cijelim razgovorom.\n\n" +
      "Šta to znači praktično: 41% upita dolazi van radnog vremena. Dosad su ti ljudi otišli konkurenciji.\n\n" +
      "AI ide kao dio projekta stranice.",
    tags: ["aisistemi", "automatizacija", "upiti", "odgovori", "sarajevo", "devforge"],
  },
  {
    id: "p48",
    template: "number",
    category: "ponuda",
    layout: "center",
    palette: "ink",
    eyebrow: "Naš rad",
    title: "besplatne revizije, uvijek uključene",
    value: "4",
    valueNote: "Bez doplata i bez brojanja izmjena.",
    caption:
      "Četiri revizije su uključene u svaku cijenu. Bez doplata i bez „ovo je peta izmjena, to se dodatno plaća“.\n\n" +
      "Zašto četiri: jer prva verzija nikad nije savršena.\n" +
      "— Prva i druga revizija su obično sitnice: boja, raspored, tekst.\n" +
      "— Treća i četvrta su one koje stvarno poprave stvar.\n\n" +
      "Ako i poslije četiri treba još — sjeli bismo i vidjeli šta nije u redu u startu. To je onda naš propust, ne Vaš.\n\n" +
      "U praksi: 90% projekata završi u dvije revizije.\n\n" +
      "Koliko revizija Vam je trebalo na prošlom projektu?",
    tags: ["revizije", "dorada", "kvalitet", "webdizajn", "sarajevo", "devforge"],
  },
  {
    id: "p49",
    template: "list",
    category: "ponuda",
    layout: "band",
    palette: "teal",
    eyebrow: "Usluge",
    title: "Četiri stvari koje radimo",
    items: ["Web stranice i shopovi", "2D igrice", "Mobilne aplikacije", "AI sistemi"],
    caption:
      "Radimo četiri stvari — i svaku dobro.\n\n" +
      "1. WEB STRANICE I SHOPOVI. Landing, korporativna, shop — od 150 KM.\n\n" +
      "2. 2D IGRICE. Za web i mobilne. Marketing, edukacija ili zabava — s Vašim brendom.\n\n" +
      "3. MOBILNE APLIKACIJE. iOS i Android, jedan kod (Flutter / React Native).\n\n" +
      "4. AI SISTEMI. Recepcionar i chat koji rade 24/7, zakazuju termine i bilježe narudžbe.\n\n" +
      "Ne radimo sve. Za velike enterprise sisteme i shopove s 5000 proizvoda preporučimo nekog drugog.\n\n" +
      "Pogledajte /usluge na sajtu — sve detaljno.",
    tags: ["usluge", "webstranice", "igrice", "aplikacije", "sarajevo", "devforge"],
  },
  {
    id: "p50",
    template: "quote",
    category: "brend",
    layout: "photoBg",
    photo: "hero",
    palette: "dark",
    eyebrow: "Naš stav",
    title: "Ne pravimo stranice za pohvalu. Pravimo ih da Vas zovu.",
    subtitle: "Ako niko ne pozove — promašili smo posao.",
    caption:
      "Možemo Vam napraviti najljepšu stranicu u Bosni. Ako niko ne pozove — promašili smo posao.\n\n" +
      "Zato prije dizajna pitamo tri stvari:\n" +
      "— Ko je Vaš kupac?\n" +
      "— Šta ga trenutno sprječava da Vas pozove?\n" +
      "— Šta mora vidjeti da bi Vam vjerovao?\n\n" +
      "Tekst, raspored i dugmad se rade prema tim odgovorima. Boje i fontovi dolaze na kraju.\n\n" +
      "Ljepota je posljedica. Poziv je cilj.\n\n" +
      "Koliko poziva Vam je donijela trenutna stranica?",
    tags: ["brend", "konverzija", "webdizajn", "strategija", "devforge"],
  },
  {
    id: "p51",
    template: "process",
    category: "izakulisa",
    layout: "photoTop",
    photo: "mobile",
    palette: "dark",
    eyebrow: "Isporuka",
    title: "Zadnji dan: sve lozinke idu Vama",
    items: ["Domena na Vaše ime", "Hosting je Vaš", "Kod u cjelosti", "Svi pristupi predati"],
    caption:
      "Najvažniji dan projekta nije prvi — zadnji je.\n\n" +
      "Na zadnji dan:\n" +
      "— domena se prebacuje na Vaše ime (ako nije već bila)\n" +
      "— hosting je Vaš račun, ne naš\n" +
      "— izvorni kod dobijate u cjelosti, dokumentiran\n" +
      "— sve lozinke i pristupi idu Vama\n" +
      "— povezujemo analitiku, radimo test na tri uređaja\n\n" +
      "Zašto to naglašavamo: najgori slučaj koji smo vidjeli je firma koja je platila stranicu, a domenu drži bivši izvođač. Godinu dana nisu mogli ništa mijenjati.\n\n" +
      "Ako nas sutra poželite zamijeniti, uzmete sve i idete.",
    tags: ["isporuka", "vlasnistvo", "domena", "kod", "sarajevo", "devforge"],
  },
  {
    id: "p52",
    template: "title",
    category: "ponuda",
    layout: "center",
    palette: "mint",
    eyebrow: "Web shop",
    title: "Shop koji sami punite. Bez developera.",
    subtitle: "Proizvodi, cijene i narudžbe — sve na jednom mjestu.",
    caption:
      "Web shop od 600 KM. Sve uključeno — katalog, korpa, plaćanje i admin panel.\n\n" +
      "Šta sami radite:\n" +
      "— dodajete proizvode\n" +
      "— mijenjate cijene\n" +
      "— pratite narudžbe\n" +
      "— upravljate zalihama\n\n" +
      "Sve kroz panel. Bez koda i bez čekanja da neko drugi to uradi.\n\n" +
      "Povezujemo s onim što već koristite: Stripe, PayPal, dostavne službe, plaćanje pouzećem.\n\n" +
      "Prva verzija besplatna, za 5 dana. Plaćate kad ste zadovoljni.\n\n" +
      "Koliko proizvoda imate?",
    tags: ["webshop", "ecommerce", "adminpanel", "shop", "sarajevo", "devforge"],
  },
  {
    id: "p53",
    template: "number",
    category: "dokaz",
    layout: "band",
    palette: "light",
    eyebrow: "Naš rad",
    title: "projekata isporučeno bez predujma",
    value: "20+",
    valueNote: "Nijedan klijent nije platio nešto što nije vidio.",
    caption:
      "Preko 20 isporučenih projekata — i nijedan nije plaćen unaprijed.\n\n" +
      "Web stranice, shopovi, mobilne aplikacije, igrice, AI sistemi.\n\n" +
      "Svaki projekt prošao je isti put:\n" +
      "dogovor → besplatna verzija → Vaš pregled → izmjene → objava → plaćanje.\n\n" +
      "Zašto to navodimo: jer većina agencija ne bi mogla raditi tako. Traži predujam jer ne vjeruje da će posao biti plaćen. Mi tražimo da prvo vidite — jer vjerujemo da će biti.\n\n" +
      "Rastemo na preporukama, ne na oglasima. Zato i radimo bez predujma.",
    tags: ["projekti", "rezultati", "bezpredujma", "iskustvo", "devforge"],
  },
  {
    id: "p54",
    template: "list",
    category: "izakulisa",
    layout: "photo",
    photo: "web",
    palette: "ink",
    eyebrow: "Iza kulisa",
    title: "Priprema koja ubrza posao duplo",
    items: ["Razgovor o kupcu", "Pregled konkurencije", "Struktura na papiru", "Tekst prije dizajna"],
    caption:
      "Zadnjih 5 dana nije magija. Magija je u onome što radimo prije prve linije koda.\n\n" +
      "1. Razgovor — 30 minuta o tome ko je kupac i šta ga muči. Ne o tome šta Vam se sviđa.\n" +
      "2. Konkurencija — gledamo 5 firmi koje rade isto. Šta im rade dobro, šta loše.\n" +
      "3. Struktura — nacrtamo stranice na papiru. Koja vodi gdje, šta je na svakoj.\n" +
      "4. Tekst — pišemo prvo tekst, pa dizajn. Obrnuto nikad ne radi.\n\n" +
      "Tek onda Figma. Tek onda kod.\n\n" +
      "Zato prva verzija obično bude dobra iz prve — pola posla je urađeno prije nego što se išta vidi.",
    tags: ["proces", "priprema", "izakulisa", "webdizajn", "devforge"],
  },
  {
    id: "p55",
    template: "list",
    category: "ponuda",
    layout: "split",
    palette: "sun",
    eyebrow: "Materijal",
    title: "Šta nam je potrebno od Vas",
    items: ["Logo ako imate", "Tri rečenice o firmi", "Slike ako imate", "Ništa više"],
    caption:
      "Ljudi misle da nam treba gomila materijala. Ne treba.\n\n" +
      "Potrebno:\n" +
      "— logo, ako ga imate (ako nemate — napravimo ga)\n" +
      "— tri rečenice o tome čime se bavite\n" +
      "— slike, ako ih imate (ako nemate — koristimo stock ili fotkamo)\n" +
      "— ime firme i grad\n\n" +
      "To je sve. Tekst pišemo mi na osnovu razgovora.\n\n" +
      "Nemate ni to? Javite se i recite čime se bavite — to je dovoljno za prvi razgovor.\n\n" +
      "Većina razgovora počne s „ne znam šta mi treba“. To je sasvim u redu.",
    tags: ["materijal", "pocetak", "priprema", "webdizajn", "sarajevo", "devforge"],
  },
  {
    id: "p56",
    template: "quote",
    category: "brend",
    layout: "stamp",
    palette: "mint",
    eyebrow: "Naš stav",
    title: "Ista osoba od prvog razgovora do zadnjeg dana.",
    subtitle: "Ne prelazite iz ruke u ruku.",
    caption:
      "U većim agencijama projekat prelazi kroz pet ruku: prodaja, projektni voditelj, dizajner, developer, podrška.\n\n" +
      "Kod nas: jedna osoba od početka do kraja.\n\n" +
      "Šta to znači praktično:\n" +
      "— ne objašnjavate istu stvar pet puta\n" +
      "— ne gubite ništa u „proslijedio sam kolegi“\n" +
      "— znate kome se javiti i taj čovjek zna Vaš projekt\n" +
      "— odgovor dolazi u 10 minuta, ne u tri dana\n\n" +
      "Manja ekipa nije slabost. To je razlog zašto stvari rade.",
    tags: ["brend", "manjitim", "komunikacija", "agencija", "devforge"],
  },
  {
    id: "p57",
    template: "list",
    category: "ponuda",
    layout: "center",
    palette: "dark",
    eyebrow: "Uključeno",
    title: "SEO osnova u svakom projektu",
    items: ["Jasni naslovi stranica", "Meta opisi", "Brzo učitavanje", "Google Business profil"],
    caption:
      "SEO nije 200 faktora. Za lokalnu firmu praktično četiri:\n\n" +
      "1. Jasni naslovi (H1, H2) — Google tako razumije o čemu je stranica. Radimo to u svakom projektu.\n" +
      "2. Meta opisi — tekst koji se vidi u rezultatima pretrage. Radimo za svaku stranicu.\n" +
      "3. Brzo učitavanje — preko 3 sekunde i gubite poziciju. Naše stranice su ispod 1.5s.\n" +
      "4. Google Business profil — bez njega se ne pojavljujete na mapi, a to je 80% lokalnih pretraga.\n\n" +
      "Sve četiri su uključene. Bez doplata.\n\n" +
      "Sve ostalo je nijansa. Ako ova četiri nisu riješena, ništa drugo ne pomaže.",
    tags: ["seo", "google", "lokalni", "webdizajn", "malibiznis", "devforge"],
  },
  {
    id: "p58",
    template: "title",
    category: "ponuda",
    layout: "photoTop",
    photo: "heroMob",
    palette: "teal",
    eyebrow: "Mobilne aplikacije",
    title: "Aplikacija nije skupa ako je jedan kod.",
    subtitle: "Flutter i React Native — iOS i Android iz jedne izrade.",
    caption:
      "Najčešća zabluda: „aplikacija košta kao dva projekta jer trebaju Android i iOS“.\n\n" +
      "Ne više. Flutter i React Native omogućavaju jedan kod za obje platforme.\n\n" +
      "Šta to znači praktično:\n" +
      "— jedna izrada, jedna cijena\n" +
      "— iste funkcionalnosti na oba sistema\n" +
      "— jedna baza podataka\n" +
      "— brže objavljivanje i na App Store i na Google Play\n\n" +
      "Šta dobijate: push notifikacije, korisničke račune, backend i bazu, objavu u trgovinama.\n\n" +
      "Ista pravila kao za stranice: besplatna prva verzija, plaćate kad ste zadovoljni.\n\n" +
      "Imate ideju za aplikaciju?",
    tags: ["mobilneaplikacije", "flutter", "reactnative", "ios", "sarajevo", "devforge"],
  },
  {
    id: "p59",
    template: "title",
    category: "ponuda",
    layout: "band",
    palette: "light",
    eyebrow: "Za 5 dana",
    title: "Stranica Vaše firme. Ove sedmice.",
    subtitle: "Besplatna gotova verzija — bez obaveze i bez predujma.",
    caption:
      "Ne za mjesec. Ne „kad se nađe vremena“. Ove sedmice.\n\n" +
      "Kako:\n" +
      "DAN 1 — razgovor od 15 minuta i materijal koji imate\n" +
      "DAN 2–3 — struktura i tekst\n" +
      "DAN 4 — dizajn i kod\n" +
      "DAN 5 — Vaš pregled\n\n" +
      "Poslije toga: stranica na pravom linku, koju možete otvoriti na mobitelu i poslati kome hoćete.\n\n" +
      "Ne plaćate ništa dok ne kažete da je dobro.\n\n" +
      "Šta Vas sprječava da se javite danas?",
    tags: ["5dana", "brzina", "besplatno", "webdizajn", "sarajevo", "devforge"],
  },
  {
    id: "p60",
    template: "cta",
    category: "ponuda",
    layout: "photoBg",
    photo: "hero",
    palette: "dark",
    eyebrow: "Počnite",
    title: "Recite čime se bavite. Prva verzija je besplatna.",
    subtitle: "Web stranice od 150 KM · Shopovi od 600 KM · 0 KM predujma",
    caption:
      "Web, mobilne aplikacije i igre koje pokreću Vaš biznis.\n\n" +
      "Od ideje do gotovog proizvoda za nekoliko sedmica. Izrađujemo besplatnu gotovu verziju za 5 dana — plaćate tek kada budete zadovoljni.\n\n" +
      "Šta dobijate:\n" +
      "— besplatnu gotovu verziju za 5 dana\n" +
      "— 0 KM predujma\n" +
      "— fiksnu cijenu prije početka\n" +
      "— četiri besplatne revizije\n" +
      "— vlastiti admin panel\n" +
      "— domenu i kod na Vaše ime\n\n" +
      "Javite nam se u DM — odgovaramo u roku od 10 minuta.\n\n" +
      "dev-forge-studio.vercel.app",
    tags: ["kontakt", "pocetak", "webdizajn", "sarajevo", "devforge"],
  },
];
