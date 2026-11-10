import type { AdPost } from "./postsData";

// ───────────────────────────────────────────────────────────────────────────
// OBJAVE 41–60 — REDOSLIJED KAO NA SAJTU (završetak)
//
// 41     devlab vs tipična agencija
// 42     naš put do danas (galerija)
// 43–60  ostale informacije sa sajta (tehnologije, industrije, način rada,
//        za koga radimo, stavovi, garancije, kontakt)
// ───────────────────────────────────────────────────────────────────────────

export const POSTS_3: AdPost[] = [
  // ── 41. DEVFÖRGE VS TIPIČNA AGENCIJA ─────────────────────────────────────
  {
    id: "p41",
    template: "compare",
    category: "brend",
    layout: "band",
    palette: "dark",
    eyebrow: "Agencija vs. mi",
    title: "Šta agencija traži — i šta mi radimo drugačije.",
    items: [
      "Avans 30–50% prije početka",
      "Platite pa vidite šta ste dobili",
      "Svaka revizija se dodatno naplaćuje",
      "Stavke koje se pojave tek na računu",
      "0 KM avansa, plaćate na kraju",
      "Prvo vidite gotovu verziju",
      "4 revizije uključene u cijenu",
      "Sve cijene javne, bez doplata",
    ],
    caption:
      "⚖️ Isti posao, drugačija podjela rizika.\n\nOvo nije kritika drugih — samo objašnjenje kako mi radimo drugačije.\n\nPREDUJAM PRIJE POČETKA\nOni: obavezan, često 30–50%\nMi: ne — plaćate tek na kraju\n\nBESPLATNA GOTOVA VERZIJA\nOni: rijetko ili uz naplatu\nMi: da, za 5 radnih dana\n\nBESPLATNE REVIZIJE\nOni: naplata po svakoj izmjeni\nMi: 4 uključene u cijenu\n\nTRANSPARENTNE CIJENE\nOni: skrivene stavke i doplate\nMi: javne, od 150 KM\n\nVLASNIŠTVO NAD KODOM\nOni: ograničeno ili vezano\nMi: 100% pripada Vama\n\nIsti posao. Drugačija podjela rizika.",
    tags: ["poredjenje", "agencija", "devlab", "bezpredujma", "sarajevo"],
  },

  // ── 42. NAŠ PUT DO DANAS — GALERIJA ──────────────────────────────────────
  {
    id: "p42",
    template: "cover",
    category: "brend",
    layout: "center",
    palette: "mint",
    eyebrow: "Naš put",
    title: "Kako je Dev Lab nastao — i zašto ovako radimo.",
    slides: [
      {
        template: "cover",
        eyebrow: "Naš put",
        title: "Naš put do danas",
        items: ["2023", "2024", "2025", "Danas"],
        palette: "mint",
      },
      {
        template: "title",
        eyebrow: "2023",
        title: "Osnovan Dev Lab",
        subtitle: "Krećemo s jasnom misijom: izrada digitalnih proizvoda bez rizika za klijenta i bez predujma.",
        palette: "mint",
      },
      {
        template: "number",
        eyebrow: "2024",
        title: "prvih 10 projekata",
        value: "10",
        valueNote: "Stranice, shopovi i aplikacije za klijente iz BiH i regiona.",
        palette: "dark",
      },
      {
        template: "number",
        eyebrow: "2025",
        title: "isporučenih projekata",
        value: "20+",
        valueNote: "Rastemo na preporukama. 100% klijenata zadovoljno.",
        palette: "mint",
      },
      {
        template: "title",
        eyebrow: "Danas",
        title: "Vaš projekt je sljedeći",
        subtitle: "Spremni smo preuzeti rizik Vašeg sljedećeg digitalnog koraka — počevši od besplatne gotove verzije.",
        palette: "dark",
      },
    ],
    caption:
      "🌱 Od nule do 20+ projekata.\n\nNaš put do danas:\n\n2023 — OSNOVAN DEVFÖRGE. Krećemo s jasnom misijom: izrada digitalnih proizvoda bez rizika za klijenta i bez predujma.\n\n2024 — PRVIH 10 PROJEKATA. Web stranice, shopovi i mobilne aplikacije za klijente iz BiH i regiona. Model bez predujma se pokazao.\n\n2025 — 20+ ISPORUČENIH PROJEKATA. Rastemo na preporukama. 100% klijenata zadovoljno, svaki projekt isporučen prema dogovoru.\n\nDANAS — VAŠ PROJEKT JE SLJEDEĆI. Spremni smo preuzeti rizik Vašeg sljedećeg digitalnog koraka — počevši od besplatne gotove verzije.\n\nRastemo na preporukama, ne na oglasima. Zato i radimo bez predujma.",
    tags: ["nasput", "istorija", "milestones", "devlab", "sarajevo"],
  },

  // ── 43. TEHNOLOGIJE ──────────────────────────────────────────────────────
  {
    id: "p43",
    template: "list",
    category: "izakulisa",
    layout: "photo",
    photo: "mobile",
    palette: "dark",
    eyebrow: "Tehnologije",
    title: "Tehnologije koje koristimo — i zašto baš njih.",
    items: [
      "React i Next.js — brze stranice",
      "Node i Laravel — sigurna poveznica",
      "Flutter — iOS i Android odjednom",
      "PostgreSQL i Firebase — pouzdana baza",
    ],
    caption:
      "⚛️ Standardne tehnologije, da Vas niko ne drži u šaci.\n\nRadimo u standardnim tehnologijama — bez egzotike koja se ne može održavati.\n\nFRONTEND: React & Next.js, TypeScript, Tailwind CSS, animacije i interakcije.\n\nBACKEND: Node.js & Laravel, PostgreSQL / MySQL, REST i GraphQL API, autentikacija i sigurnost.\n\nMOBILNE: Flutter & React Native, iOS i Android, push notifikacije, App Store / Google Play.\n\nZašto Vam je to važno kao klijentu: kad za godinu dana tražite nekog da nastavi raditi na projektu, standardne tehnologije znače da će ga lako naći.\n\nKod u nekoj egzotičnoj tehnologiji je zatočeništvo, ne zaštita.",
    tags: ["tehnologije", "react", "flutter", "node", "sarajevo", "devlab"],
  },

  // ── 44. ZA KOGA RADIMO ───────────────────────────────────────────────────
  {
    id: "p44",
    template: "list",
    category: "ponuda",
    layout: "split",
    palette: "light",
    eyebrow: "Za koga radimo",
    title: "S kim najbolje radimo.",
    items: [
      "Online trgovine",
      "Startupi i manje agencije",
      "Lokalni biznisi i obrti",
      "Uslužne djelatnosti",
    ],
    caption:
      "🎯 Najbolji smo za ove ljude. Za ostale preporučimo nekog.\n\nNe radimo za svakoga. Najbolji smo za:\n\n— ✅ e-commerce i trgovine — shopovi s katalogom i online plaćanjem\n— 🔥 startupi i agencije — MVP i prve verzije proizvoda\n— 💡 lokalni biznisi i obrti — stranice koje donose pozive\n— ⚡ edukacija i 2D igre — educational i marketing igrice\n— 🎯 uslužne djelatnosti — zakazivanje termina i kontakt forme\n— 💰 SaaS i digitalni proizvodi — web aplikacije i dashboardi\n\nNe radimo: velike enterprise sisteme, shopove s 5000 proizvoda i integracijom na tri ERP-a.\n\nAko ne možemo — reći ćemo Vam odmah, u prvom razgovoru, i preporučiti nekog drugog.",
    tags: ["zakoga", "malibiznis", "industrije", "sarajevo", "devlab"],
  },

  // ── 45. AI SISTEMI ───────────────────────────────────────────────────────
  {
    id: "p45",
    valueNote: "Prima pozive, odgovara na pitanja i zakazuje termine — i noću, i vikendom.",
    template: "number",
    category: "ponuda",
    layout: "photoBg",
    photo: "hero",
    palette: "ink",
    eyebrow: "AI sistemi",
    title: "AI recepcionar koji nikad ne spava.",
    value: "24/7",
    caption:
      "🤖 Recepcionar koji nikad ne spava i nikad ne kaže „ne znam“.\n\nAI recepcionar i chat asistent koji primaju pozive 24 sata, odgovaraju kupcima, zakazuju termine i bilježe narudžbe — bez Vašeg učešća.\n\nŠta radi:\n— ✅ prima pozive i poruke u svako doba\n— 🔥 odgovara na osnovu podataka o Vašoj firmi: usluge, cijene, radno vrijeme\n— 💡 zakazuje termine i šalje potvrde\n— ⚡ bilježi narudžbe iz poruka\n— 🎯 preusmjerava poziv na Vas kad treba\n\nAI sistemi se naplaćuju izradom plus mjesečnom naknadom, jer razgovori imaju stalne troškove.\n\nAI ide kao dio projekta stranice, ne odvojeno.",
    tags: ["aisistemi", "airecepcionar", "24sata", "automatizacija", "sarajevo"],
  },

  // ── 46. GARANCIJA / BEZ RIZIKA ───────────────────────────────────────────
  {
    id: "p46",
    template: "quote",
    category: "brend",
    layout: "stamp",
    palette: "teal",
    eyebrow: "Bez rizika",
    title: "Vaš jedini rizik je 15 minuta razgovora.",
    subtitle: "Poslije toga dobijate plan i cijenu. Ako vam ne odgovara, tu se zaustavljamo — bez obaveze.",
    caption:
      "🤝 Vaš rizik? 15 minuta razgovora. To je sve.\n\nUložite 15 minuta razgovora. Ništa više.\n\nNe tražimo predujam. Ne tražimo da potpišete išta. Ne tražimo pristup Vašim računima.\n\nSamo razgovor: čime se bavite, ko Vas zove, šta stranica treba da uradi.\n\nAko poslije razgovora odlučite da ne radimo — to je sasvim u redu i nema cijene.\n\nAko se dogovorimo — napravimo gotovu verziju u 5 dana i vidite je prije bilo kakve obaveze.\n\nVrijedi li probati?",
    tags: ["bezrizika", "bezpredujma", "konsultacija", "sarajevo", "devlab"],
  },

  // ── 47. ADMIN PANEL ──────────────────────────────────────────────────────
  {
    id: "p47",
    title: "Mijenjate tekst, slike i cijene sami — u par klikova.",
    template: "list",
    category: "ponuda",
    layout: "photoTop",
    photo: "web",
    palette: "dark",
    eyebrow: "Admin panel",
    items: [
      "Bez znanja programiranja",
      "Bez zvanja developera",
      "Bez mjesečnih naknada",
    ],
    caption:
      "⚙️ Mijenjate sami, bez zvanja developera za svaku sitnicu.\n\nUz svaki projekt dobijate vlastiti admin panel (CMS) kroz koji sami mijenjate sadržaj.\n\nŠta možete sami:\n— ✅ tekst na bilo kojoj stranici\n— 🔥 slike i fotografije\n— 💡 proizvode i cijene u shopu\n— ⚡ objave i novosti\n— 🎯 radno vrijeme i kontakt podatke\n\nSve bez koda i bez plaćanja developeru za svaku sitnicu.\n\nAko znate koristiti Facebook, znate koristiti i ovo.\n\nKoliko puta ste htjeli nešto promijeniti i odustali jer „ne znate kako“?",
    tags: ["adminpanel", "cms", "kontrola", "webdizajn", "devlab"],
  },

  // ── 48. 2D IGRICE ────────────────────────────────────────────────────────
  {
    id: "p48",
    template: "title",
    category: "ponuda",
    layout: "center",
    palette: "light",
    eyebrow: "2D igrice",
    title: "Igra drži pažnju duže od bilo kojeg banera.",
    subtitle: "2D igrice za web i mobilne, sa vašim brendom i vašom nagradom na kraju.",
    caption:
      "🎮 Baner gledaju 2 sekunde. Igru igraju 3 minute.\n\nBanner ljudi gledaju 1.7 sekundi. U igri provedu minute.\n\nRazvijamo engaging 2D igrice za mobilne platforme i web:\n— ✅ marketing igre — kao dio kampanje ili promocije\n— 🔥 edukacijske igre — za zaposlene ili klijente\n— 💡 casual igre — s Vašim brendom, za zabavu\n\nOd jednostavne igre s jasnim ciljem do složenije mehanike. Radi na webu i na mobilnom.\n\nKad se kupac igra s Vašim brendom 3 minute, sjeća ga se. Kad gleda baner 2 sekunde — ne.\n\nImate ideju?",
    tags: ["2digrice", "gamedev", "marketing", "brend", "sarajevo"],
  },

  // ── 49. MOBILNE APLIKACIJE ───────────────────────────────────────────────
  {
    id: "p49",
    template: "list",
    category: "ponuda",
    layout: "band",
    palette: "ink",
    eyebrow: "Mobilne aplikacije",
    title: "Jedna izrada — aplikacija i za iOS i za Android.",
    items: [
      "Flutter i React Native",
      "Push notifikacije",
      "Backend i baza podataka",
      "Objavljivanje na App Store i Play",
    ],
    caption:
      "📱 Nekad ste plaćali dva projekta. Sad jedan.\n\nNajčešća zabluda: aplikacija košta kao dva projekta jer trebaju Android i iOS.\n\nNe više. Flutter i React Native omogućavaju jedan kod za obje platforme.\n\nŠta to znači praktično:\n— ✅ jedna izrada, jedna cijena\n— 🔥 iste funkcionalnosti na oba sistema\n— 💡 jedna baza podataka\n— ⚡ brže objavljivanje i na App Store i na Google Play\n\nŠta dobijate: push notifikacije, korisničke račune, backend i bazu, objavu u trgovinama, dokumentaciju.\n\nIsta pravila kao za stranice: besplatna prva verzija, plaćate kad ste zadovoljni.",
    tags: ["mobilneaplikacije", "flutter", "ios", "android", "sarajevo"],
  },

  // ── 50. PONUDA / KONTAKT ─────────────────────────────────────────────────
  {
    id: "p50",
    template: "cta",
    category: "ponuda",
    layout: "photoBg",
    photo: "hero",
    palette: "dark",
    eyebrow: "Počnite",
    title: "Dovoljna je jedna rečenica. Prva verzija je besplatna.",
    subtitle: "Stranice od 150 KM · Shopovi od 600 KM · 0 KM unaprijed · Gotovo za 5 dana",
    caption:
      "🚀 Recite čime se bavite. To je dovoljno.\n\nStranice, mobilne aplikacije i igre koje pokreću Vaš biznis.\n\nOd ideje do gotovog proizvoda za nekoliko sedmica. Izrađujemo besplatnu gotovu verziju za 5 dana — plaćate tek kada budete zadovoljni.\n\nŠta dobijate:\n— ✅ besplatnu gotovu verziju za 5 dana\n— 🔥 0 KM predujma\n— 💡 fiksnu cijenu prije početka\n— ⚡ četiri besplatne revizije\n— 🎯 vlastiti admin panel\n— 💰 domenu i kod na Vaše ime\n\nJavite nam se u DM — odgovaramo u roku od 10 minuta.\n\ndevlab.cc.cd",
    tags: ["kontakt", "pocetak", "webdizajn", "sarajevo", "devlab"],
  },

  // ── 51. VRIJEDNOSTI / NAŠ STAV ───────────────────────────────────────────
  {
    id: "p51",
    template: "quote",
    category: "brend",
    layout: "stamp",
    palette: "dark",
    eyebrow: "Naš stav",
    title: "Ne pravimo sajtove za pohvalu. Pravimo ih da vas zovu.",
    subtitle: "Ako niko ne pozove, posao nije urađen — bez obzira kako lijepo izgleda.",
    caption:
      "🎯 Lijepa stranica bez poziva je umjetnost, ne biznis.\n\nMožemo Vam napraviti najljepšu stranicu u Bosni. Ako niko ne pozove — promašili smo posao.\n\nZato prije dizajna pitamo tri stvari:\n— ✅ Ko je Vaš kupac?\n— 🔥 Šta ga trenutno sprječava da Vas pozove?\n— 💡 Šta mora vidjeti da bi Vam vjerovao?\n\nTekst, raspored i dugmad se rade prema tim odgovorima. Boje i fontovi dolaze na kraju.\n\nLjepota je posljedica. Poziv je cilj.\n\nKoliko poziva Vam je donijela trenutna stranica?",
    tags: ["brend", "konverzija", "webdizajn", "strategija", "devlab"],
  },

  // ── 52. VLASNIŠTVO ───────────────────────────────────────────────────────
  {
    id: "p52",
    template: "list",
    category: "brend",
    layout: "photo",
    photo: "heroMob",
    palette: "teal",
    eyebrow: "Vlasništvo",
    title: "Zadnji dan: sve lozinke idu vama.",
    items: [
      "Domena na vaše ime",
      "Hosting i pristupi vaši",
      "Kod predan vama",
      "Bez zaključavanja",
    ],
    caption:
      "🔑 Zadnji dan: sve lozinke idu Vama. Sve.\n\nNajvažniji dan projekta nije prvi — zadnji je.\n\nNa zadnji dan:\n— ✅ domena se prebacuje na Vaše ime\n— 🔥 hosting je Vaš račun, ne naš\n— 💡 izvorni kod dobijate u cjelosti, dokumentiran\n— ⚡ sve lozinke i pristupi idu Vama\n— 🎯 povezujemo analitiku, radimo test na tri uređaja\n— 💰 dobijate kratku obuku za korištenje\n\nZašto to naglašavamo: najgori slučaj koji smo vidjeli je firma koja je platila stranicu, a domenu drži bivši izvođač.\n\nAko nas sutra poželite zamijeniti, uzmete sve i idete.",
    tags: ["vlasnistvo", "domena", "kod", "isporuka", "sarajevo"],
  },

  // ── 53. CIJENE / TRANSPARENTNOST ─────────────────────────────────────────
  {
    id: "p53",
    template: "quote",
    category: "brend",
    layout: "split",
    palette: "dark",
    eyebrow: "Prodaja",
    title: "Kupac koji mora pitati cijenu — često ne kupi.",
    subtitle: "Zato cijene stavljamo na sajt, vidljivo. Kupac koji zna cijenu odmah odlučuje.",
    caption:
      "💬 Ako morate pitati cijenu, nećete kupiti.\n\nKad neko mora poslati upit da bi saznao okvirnu cijenu, dvije stvari se dese:\n\n1. Nagađa. Obično pogriješi u većem smjeru i odustane.\n2. Čeka. I u međuvremenu nađe nekog ko je cijenu objavio.\n\nZato su naše cijene javne: web stranice od 150 KM, shopovi od 600 KM.\n\nŠta to ne pokriva: konačnu cijenu za Vaš konkretni projekt. Ona zavisi od broja stranica i funkcionalnosti — i dobijate je prije početka, ne poslije.\n\nTransparentnost nije marketinška riječ. To je jedan broj na sajtu.",
    tags: ["cijene", "transparentnost", "povjerenje", "webdizajn", "devlab"],
  },

  // ── 54. ODRŽAVANJE I PODRŠKA ─────────────────────────────────────────────
  {
    id: "p54",
    subtitle: "Ista osoba od prvog razgovora do zadnjeg dana. Tu smo i poslije, za pitanja i izmjene.",
    template: "list",
    category: "ponuda",
    layout: "center",
    palette: "mint",
    eyebrow: "Poslije isporuke",
    title: "Ne nestajemo kad sajt bude gotov.",
    items: ["Ažuriranja i sigurnost", "Optimizacija brzine", "Nove funkcionalnosti", "Pomoć kad zapne"],
    caption:
      "🛡️ Ne nestajemo nakon isporuke.\n\nNajčešći problem s agencijama: projekt se preda i telefon se ugasi.\n\nKod nas ne. Nakon isporuke:\n— ✅ ažuriranja i sigurnosne zakrpe\n— 🔥 optimizacija brzine kad stranica naraste\n— 💡 dodavanje novih funkcionalnosti po potrebi\n— ⚡ pomoć kad nešto zapne u admin panelu\n\nPrvih mjesec dana podrška je uključena. Poslije toga po potrebi — bez ugovora na godinu.\n\nZašto ovako: jer stranica nije gotova na dan objave. Ona živi dalje.\n\nImate pitanje o postojećoj stranici? Javite se — i ako nije naša, reći ćemo šta vidimo.",
    tags: ["podrska", "odrzavanje", "sigurnost", "webdizajn", "devlab"],
  },

  // ── 55. WEB SHOP ─────────────────────────────────────────────────────────
  {
    id: "p55",
    subtitle: "Dodajete proizvode, mijenjate cijene i slike — bez da nas zovete.",
    template: "title",
    category: "ponuda",
    layout: "photoTop",
    photo: "web",
    palette: "ink",
    eyebrow: "Web shop",
    title: "Shop koji sami punite proizvodima. Od 600 KM.",
    caption:
      "🛒 Shop od 600 KM, a punite ga sami.\n\nWeb shop od 600 KM — sve uključeno.\n\nŠta dobijate:\n— ✅ kompletan e-commerce sistem\n— 🔥 katalog proizvoda s kategorijama\n— 💡 korpa i checkout\n— ⚡ online plaćanje (Stripe, PayPal)\n— 🎯 admin panel\n— 💰 inventory management\n— 📈 UI/UX dizajn uključen\n— 🚀 demo se ne plaća\n\nSami dodajete proizvode, mijenjate cijene i pratite narudžbe. Bez koda i bez zvanja developera.\n\nKoliko proizvoda imate?",
    tags: ["webshop", "ecommerce", "shop", "katalog", "sarajevo"],
  },

  // ── 56. BEZ SKRIVENIH TROŠKOVA ───────────────────────────────────────────
  {
    id: "p56",
    template: "number",
    category: "ponuda",
    layout: "band",
    palette: "light",
    eyebrow: "Cijena",
    title: "Nula skrivenih troškova. Cijena koju čujete je cijena koju plaćate.",
    value: "0",
    valueNote: "Nema dodatnih nalaza, nema doplata za revizije, nema stavki na kraju.",
    caption:
      "🚫 Nula skrivenih troškova. Doslovno nula.\n\nNula skrivenih troškova. To je jednostavno pravilo koje većina ne poštuje.\n\nŠta to znači konkretno:\n— ✅ cijena na sajtu je cijena u ponudi\n— 🔥 dizajn, mobilna verzija i admin panel su uključeni\n— 💡 4 revizije su uključene\n— ⚡ nema „dodatne stavke“ na kraju\n— 🎯 nema doplate za ono što je dogovoreno\n\nJedino što ide odvojeno: domena i hosting. Njih plaćate direktno provideru, bez naše marže — i to je jasno napisano prije početka.\n\nZašto ovako: jer kupac koji ne zna konačnu cijenu ne može planirati.",
    tags: ["cijene", "transparentnost", "bezskrivenih", "webdizajn", "devlab"],
  },

  // ── 57. 5 DANA ───────────────────────────────────────────────────────────
  {
    id: "p57",
    valueNote: "Brojimo radne dane, ne sedmice. Prvog dana dobijate plan, petog gledate gotov sajt.",
    template: "number",
    category: "ponuda",
    layout: "center",
    palette: "dark",
    eyebrow: "Rok",
    title: "Pet radnih dana do besplatne gotove verzije.",
    value: "5",
    caption:
      "⏱️ 5 dana. Prava stranica. Besplatno.\n\nPet radnih dana. Toliko nam treba da dobijete funkcionalnu verziju.\n\nNe maketu. Ne PDF. Pravu stranicu na pravom linku koju možete otvoriti na mobitelu i poslati kome hoćete.\n\nŠta dobijete u tih 5 dana:\n— ✅ dizajn koji odgovara Vašem brendu\n— 🔥 strukturu stranica (koja vodi gdje)\n— 💡 funkcionalnosti koje ste tražili\n— ⚡ kontakt formu koja radi\n\nTek poslije toga razgovaramo o cijeni i nastavku.\n\nŠta bi Vam značilo da vidite stranicu svoje firme ove sedmice?",
    tags: ["5dana", "rok", "besplatno", "gotovaverzija", "sarajevo"],
  },

  // ── 58. KONTAKT SAJT ─────────────────────────────────────────────────────
  {
    id: "p58",
    subtitle: "www.devlab.cc.cd",
    template: "cta",
    category: "ponuda",
    layout: "photoBg",
    photo: "heroMob",
    palette: "ink",
    eyebrow: "Sve na jednom",
    title: "Sve što vam treba — na jednom linku.",
    caption:
      "🌐 Sve je javno. Ne morate nikoga zvati.\n\nAko ne volite razgovarati prije nego što vidite brojeve — sve je javno na sajtu.\n\nŠta tamo nađete:\n— ✅ usluge detaljno (web, igrice, aplikacije, AI)\n— 🔥 cijene: web od 150 KM, shopovi od 600 KM\n— 💡 projekti koje smo radili\n— ⚡ česta pitanja s odgovorima\n— 🎯 način rada, korak po korak\n\nNe morate nikoga zvati da saznate cijenu.\n\ndevlab.cc.cd\n\nAko i poslije toga imate pitanje — javite se u DM.",
    tags: ["kontakt", "sajt", "cijene", "usluge", "devlab"],
  },

  // ── 59. NAŠ STAV / MANJA EKIPA ───────────────────────────────────────────
  {
    id: "p59",
    template: "quote",
    category: "brend",
    layout: "center",
    palette: "sun",
    eyebrow: "Naš način",
    title: "Ista osoba od prvog razgovora do zadnjeg dana.",
    subtitle: "Bez prebacivanja s menadžera na developera. Onaj kome ste pisali — taj i radi.",
    caption:
      "🤝 Ista osoba od prvog razgovora do zadnjeg dana.\n\nU većim agencijama projekat prelazi kroz pet ruku: prodaja, projektni voditelj, dizajner, developer, podrška.\n\nKod nas: jedna osoba od početka do kraja.\n\nŠta to znači praktično:\n— ✅ ne objašnjavate istu stvar pet puta\n— 🔥 ne gubite ništa u „proslijedio sam kolegi“\n— 💡 znate kome se javiti i taj čovjek zna Vaš projekt\n— ⚡ odgovor dolazi u 10 minuta, ne u tri dana\n\nManja ekipa nije slabost. To je razlog zašto stvari rade.",
    tags: ["brend", "tim", "komunikacija", "agencija", "devlab"],
  },

  // ── 60. ZAVRŠNI KONTAKT ──────────────────────────────────────────────────
  {
    id: "p60",
    template: "cta",
    category: "ponuda",
    layout: "photoBg",
    photo: "hero",
    palette: "dark",
    eyebrow: "Početak",
    title: "Ne morate imati ni ideju. Dovoljno je da kažete čime se bavite.",
    subtitle: "Strukturu, tekstove i dizajn predlažemo mi. Vi kažete šta vam se sviđa.",
    caption:
      "👋 Ne morate imati ni ideju, samo se javite.\n\nVećina razgovora počne ovako: „Radim to i to, ne znam šta mi treba.“\n\nTo je sasvim dovoljno.\n\nNe morate imati:\n— ✅ gotov tekst\n— 🔥 logo\n— 💡 ideju kako stranica treba izgledati\n— ⚡ budžet na papiru\n\nMi pitamo dalje i kažemo šta ima smisla.\n\nInstagram DM: @devlab.cc.cd\nE-mail: kontakt@devlab.cc.cd\nSarajevo · cijela BiH\n\nOdgovaramo u roku od 10 minuta. Bez obaveze i bez predujma.",
    tags: ["kontakt", "pocetak", "bezobaveze", "sarajevo", "devlab"],
  },
];
