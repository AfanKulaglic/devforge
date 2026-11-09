import type { AdPost } from "./postsData";

// ───────────────────────────────────────────────────────────────────────────
// OBJAVE 21–40 — ISTE PORUKE SA HOME PAGE-A, DRUGI UGAO
//
// Samo 4 slike iz hero sekcije: hero · heroMob · web · mobile
// ───────────────────────────────────────────────────────────────────────────

export const POSTS_2: AdPost[] = [
  {
    id: "p21",
    template: "title",
    category: "ponuda",
    layout: "photoBg",
    photo: "hero",
    palette: "dark",
    eyebrow: "Bez rizika",
    title: "Vaš jedini rizik su 15 minuta razgovora.",
    subtitle: "Sve ostalo — besplatna verzija, izmjene, plaćanje — ide poslije.",
    caption:
      "Uložite 15 minuta razgovora. Ništa više.\n\n" +
      "Ne tražimo predujam. Ne tražimo da potpišete išta. Ne tražimo pristup Vašim računima.\n\n" +
      "Samo razgovor: čime se bavite, ko Vas zove, šta stranica treba da uradi.\n\n" +
      "Ako poslije razgovora odlučite da ne radimo — to je sasvim u redu i nema cijene.\n\n" +
      "Ako se dogovorimo — napravimo gotovu verziju u 5 dana i vidite je prije bilo kakve obaveze.\n\n" +
      "Vrijedi li probati?",
    tags: ["bezrizika", "konsultacija", "bezpredujma", "webdizajn", "sarajevo", "devforge"],
  },
  {
    id: "p22",
    template: "number",
    category: "ponuda",
    layout: "center",
    palette: "ink",
    eyebrow: "Brzo",
    title: "radnih dana do gotove verzije",
    value: "5",
    valueNote: "Vidite stranicu prije bilo kakve obaveze.",
    caption:
      "Pet radnih dana. Toliko nam treba da dobijete funkcionalnu verziju.\n\n" +
      "Ne maketu. Ne PDF. Pravu stranicu na pravom linku koju možete otvoriti na mobitelu i poslati kome hoćete.\n\n" +
      "Šta dobijete u tih 5 dana:\n" +
      "— dizajn koji odgovara Vašem brendu\n" +
      "— strukturu stranica (koja vodi gdje)\n" +
      "— funkcionalnosti koje ste tražili\n" +
      "— kontakt formu koja radi\n\n" +
      "Tek poslije toga razgovaramo o cijeni i nastavku.\n\n" +
      "Šta bi Vam značilo da vidite stranicu svoje firme ove sedmice?",
    tags: ["5dana", "brzina", "gotovaverzija", "besplatno", "sarajevo", "devforge"],
  },
  {
    id: "p23",
    template: "list",
    category: "ponuda",
    layout: "photo",
    photo: "mobile",
    palette: "teal",
    eyebrow: "Kontrola",
    title: "Šta mijenjate sami, bez ikoga",
    items: ["Tekst i naslove", "Slike i galerije", "Cijene u shopu", "Objave i novosti"],
    caption:
      "Najčešća frustracija s agencijama: za svaku sitnicu morate zvati i čekati.\n\n" +
      "Zato uz svaki projekt ide admin panel (CMS). Vi mijenjate, niko drugi.\n\n" +
      "Sami mijenjate:\n" +
      "— tekst i naslove na bilo kojoj stranici\n" +
      "— slike i galerije\n" +
      "— proizvode i cijene u shopu\n" +
      "— objave i novosti\n" +
      "— radno vrijeme i kontakt podatke\n\n" +
      "Sve kroz jednostavan panel, bez koda. Ako znate koristiti Facebook, znate koristiti i ovo.\n\n" +
      "Koliko Vas košta čekanje da neko drugi promijeni cijenu na Vašoj stranici?",
    tags: ["adminpanel", "cms", "samostalnost", "shop", "sarajevo", "devforge"],
  },
  {
    id: "p24",
    template: "title",
    category: "ponuda",
    layout: "band",
    palette: "sun",
    eyebrow: "Web stranice",
    title: "Landing, korporativna ili shop — od 150 KM.",
    subtitle: "Ista cijena na sajtu i u ponudi. Bez iznenađenja.",
    caption:
      "Web stranice od 150 KM. Web shopovi od 600 KM. To je na sajtu i to dobijete u ponudi.\n\n" +
      "Šta ulazi u cijenu:\n" +
      "— UI/UX dizajn\n" +
      "— mobilna verzija\n" +
      "— admin panel\n" +
      "— SEO osnova\n" +
      "— 4 besplatne revizije\n" +
      "— besplatna prva verzija\n\n" +
      "Šta ne ulazi: domena i hosting. Njih plaćate direktno provideru, bez naše marže. Nema skrivenih stavki.\n\n" +
      "Zašto je cijena javna: jer kupac koji mora pitati cijenu obično nagađa i pogriješi.\n\n" +
      "Znate broj prije nego što pošaljete poruku.",
    tags: ["cijene", "webstranice", "javnoc", "transparentnost", "sarajevo", "devforge"],
  },
  {
    id: "p25",
    template: "list",
    category: "ponuda",
    layout: "split",
    palette: "mint",
    eyebrow: "Uključeno",
    title: "Ono što drugi naplaćuju dodatno",
    items: ["Dizajn i UX", "Mobilna verzija", "Admin panel", "Četiri revizije"],
    caption:
      "Kod većine agencija osnovna cijena je početak. Nakon toga: dizajn se doplaćuje, mobilna verzija se doplaćuje, CMS se doplaćuje, izmjene se doplaćuju.\n\n" +
      "Kod nas je obrnuto — sve je u osnovnoj cijeni:\n\n" +
      "1. UI/UX dizajn — uključen\n" +
      "2. Mobilna verzija — uključena\n" +
      "3. Admin panel — uključen\n" +
      "4. Četiri besplatne revizije — uključene\n" +
      "5. Čist, dokumentiran kod — uključen\n" +
      "6. SEO osnova — uključena\n\n" +
      "Zato ne objavljujemo cijenu „od“ s deset zvjezdica. Jedna cijena, sve unutra.\n\n" +
      "Domena i hosting su jedino što ide odvojeno — i oni idu direktno provideru.",
    tags: ["ukljuceno", "cijene", "bezskrivenih", "webdizajn", "devforge"],
  },
  {
    id: "p26",
    template: "title",
    category: "ponuda",
    layout: "photoTop",
    photo: "web",
    palette: "dark",
    eyebrow: "2D igrice",
    title: "Igra drži pažnju duže od banera.",
    subtitle: "2D igrice za web i mobilne — s Vašim brendom.",
    caption:
      "Banner ljudi gledaju 1.7 sekundi. U igri provedu minute.\n\n" +
      "Razvijamo 2D igrice za mobilne platforme i web:\n" +
      "— marketing igre — kao dio kampanje ili promocije\n" +
      "— edukacijske igre — za zaposlene ili klijente\n" +
      "— casual igre — s Vašim brendom, za zabavu\n\n" +
      "Od jednostavne igre s jasnim ciljem do složenije mehanike. Radi na webu i na mobilnom.\n\n" +
      "Kad se kupac igra s Vašim brendom 3 minute, sjeća ga se. Kad gleda baner 2 sekunde — ne.\n\n" +
      "Imate ideju?",
    tags: ["2digrice", "gamedev", "marketing", "brend", "sarajevo", "devforge"],
  },
  {
    id: "p27",
    template: "list",
    category: "ponuda",
    layout: "center",
    palette: "light",
    eyebrow: "Mobilne aplikacije",
    title: "Jedan kod. iOS i Android.",
    items: ["Flutter i React Native", "Push notifikacije", "Backend integracija", "App Store i Play"],
    caption:
      "Razvijamo native i cross-platform mobilne aplikacije za iOS i Android.\n\n" +
      "Koristimo Flutter i React Native — jedan kod radi na obje platforme. To praktično znači: jedna izrada, jedna cijena, dva kanala distribucije.\n\n" +
      "Šta je uključeno:\n" +
      "— push notifikacije\n" +
      "— backend i baza podataka\n" +
      "— korisnički računi i prijava\n" +
      "— objava na App Store i Google Play\n\n" +
      "Od MVP-a (prva verzija za testiranje ideje) do potpune aplikacije.\n\n" +
      "Ista pravila kao za stranice: besplatna prva verzija, plaćate kad ste zadovoljni.\n\n" +
      "Imate ideju za aplikaciju?",
    tags: ["mobilneaplikacije", "flutter", "ios", "android", "sarajevo", "devforge"],
  },
  {
    id: "p28",
    template: "number",
    category: "ponuda",
    layout: "band",
    palette: "teal",
    eyebrow: "AI sistemi",
    title: "sata dnevno dostupan AI recepcionar",
    value: "24",
    valueNote: "Prima pozive, odgovara, zakazuje termine.",
    caption:
      "AI recepcionar i chat asistent rade 24 sata dnevno — bez pauze, bez bolovanja, bez „zatvoreno smo“.\n\n" +
      "Šta radi:\n" +
      "— prima pozive i poruke u svako doba\n" +
      "— odgovara na pitanja o cijenama i uslugama\n" +
      "— zakazuje termine i šalje potvrde\n" +
      "— bilježi narudžbe iz poruka\n" +
      "— sve komplikovano prosljeđuje Vama s cijelim razgovorom\n\n" +
      "Najveća korist: 41% upita dolazi van radnog vremena. Dosad su ti ljudi otišli konkurenciji. Sad ne odlaze.\n\n" +
      "AI ide kao dio projekta stranice, ne kao odvojen proizvod.",
    tags: ["airecepcionar", "aisistemi", "24sata", "automatizacija", "sarajevo", "devforge"],
  },
  {
    id: "p29",
    template: "quote",
    category: "brend",
    layout: "photo",
    photo: "heroMob",
    palette: "ink",
    eyebrow: "Naš stav",
    title: "Povjerenje ide prije novca.",
    subtitle: "Zato ne tražimo predujam. Nikad.",
    caption:
      "U većini poslova novac ide prvi — pa povjerenje. Kod nas je obrnuto.\n\n" +
      "Ne tražimo predujam jer znamo da naša cijena nije najmanja na tržištu. Neko ko plaća unaprijed mora vjerovati na riječ.\n\n" +
      "Mi ne tražimo da vjerujete na riječ. Napravimo dio posla besplatno, pokažemo ga, i tek onda razgovaramo o novcu.\n\n" +
      "To je skuplje za nas. Zato radimo manje projekata — ali nijedan klijent nije platio nešto što nije vidio.\n\n" +
      "Za Vas: nula rizika. Za nas: moramo biti dobri iz prve.",
    tags: ["povjerenje", "bezpredujma", "ferodnos", "agencija", "devforge"],
  },
  {
    id: "p30",
    template: "compare",
    category: "ponuda",
    layout: "center",
    palette: "sun",
    eyebrow: "Prije / Poslije",
    title: "Stranica prije vs. stranica s nama",
    items: ["Ne radi na mobitelu", "Nema kontakta", "Mijenja samo izvođač", "Nema upita", "Radi svuda", "Forma na vrhu", "Mijenjate sami", "Upiti svaki dan"],
    caption:
      "Razlika nije u bojama. Razlika je u tome radi li stranica svoj posao.\n\n" +
      "PRIJE:\n" +
      "— na mobitelu se raspada (a 76% ljudi dolazi s mobitela)\n" +
      "— nema načina da Vas kontaktiraju osim ako negdje nađu broj\n" +
      "— za svaku promjenu morate zvati izvođača\n" +
      "— mjesecima nema upita\n\n" +
      "POSLIJE:\n" +
      "— radi na svakom ekranu\n" +
      "— kontakt forma na vrhu\n" +
      "— sami mijenjate sadržaj kroz admin panel\n" +
      "— upiti dolaze jer ih se može poslati\n\n" +
      "Kako izgleda Vaša?",
    tags: ["prijeiposlije", "redizajn", "webdizajn", "konverzija", "sarajevo", "devforge"],
  },
  {
    id: "p31",
    template: "list",
    category: "ponuda",
    layout: "photoBg",
    photo: "hero",
    palette: "dark",
    eyebrow: "Provjera",
    title: "Četiri stvari koje dobijate bez plaćanja",
    items: ["Razgovor od 15 minuta", "Gotovu verziju za 5 dana", "Tačnu cijenu prije početka", "Četiri revizije"],
    caption:
      "Prije nego što date ijednu marku, dobijate četiri stvari besplatno:\n\n" +
      "1. Razgovor od 15 minuta. Bez obaveze, bez prodaje, bez pritiska.\n" +
      "2. Gotovu verziju za 5 dana. Prava stranica na pravom linku.\n" +
      "3. Tačnu cijenu prije početka. Ne okvirnu — tačnu.\n" +
      "4. Četiri revizije uključene. Bez doplata.\n\n" +
      "Sve to prije nego što platite ijednu marku.\n\n" +
      "Ako Vam se ne svidi — ne plaćate ništa i idemo dalje. Bez objašnjavanja.\n\n" +
      "Koji je Vaš rizik? Petnaest minuta.",
    tags: ["besplatno", "bezrizika", "revizije", "cijene", "sarajevo", "devforge"],
  },
  {
    id: "p32",
    template: "process",
    category: "izakulisa",
    layout: "band",
    palette: "light",
    eyebrow: "Naš proces",
    title: "Šta se dešava u prvih pet dana",
    items: ["Dan 1 — razgovor i materijal", "Dan 2–3 — struktura i tekst", "Dan 4 — dizajn i kod", "Dan 5 — Vaš pregled"],
    caption:
      "Transparentno — ovako izgleda prvih 5 dana:\n\n" +
      "DAN 1: razgovor i materijal. 15 minuta poziva, Vi pošaljete logo, slike i tekst koji imate. Ako nemate tekst — pišemo ga mi.\n\n" +
      "DAN 2–3: struktura i tekst. Nacrtamo koja stranica vodi gdje. Napišemo tekst prije dizajna (obrnuto nikad ne radi).\n\n" +
      "DAN 4: dizajn i kod. Prva funkcionalna verzija na pravom linku.\n\n" +
      "DAN 5: Vaš pregled. Kažete šta mijenjati, mi radimo izmjene.\n\n" +
      "Sve to bez predujma. Plaćanje ide kad ste zadovoljni.",
    tags: ["proces", "5dana", "izakulisa", "koraci", "sarajevo", "devforge"],
  },
  {
    id: "p33",
    template: "title",
    category: "ponuda",
    layout: "center",
    palette: "mint",
    eyebrow: "Web shopovi",
    title: "Shop koji sami punite. Od 600 KM.",
    subtitle: "Katalog, korpa, plaćanje i upravljanje narudžbama.",
    caption:
      "Web shop od 600 KM — sve uključeno.\n\n" +
      "Šta dobijate:\n" +
      "— katalog proizvoda s kategorijama\n" +
      "— korpa i checkout\n" +
      "— online plaćanje (kartice, ponuda, plaćanje pouzećem)\n" +
      "— upravljanje narudžbama i zalihama\n" +
      "— admin panel za dodavanje proizvoda\n\n" +
      "Sami dodajete proizvode, mijenjate cijene i pratite narudžbe. Bez koda i bez zvanja developera.\n\n" +
      "Povezujemo s onim što već koristite — Stripe, PayPal, dostavne službe.\n\n" +
      "Prva verzija besplatna, za 5 dana. Plaćate kad ste zadovoljni.",
    tags: ["webshop", "ecommerce", "shop", "katalog", "sarajevo", "devforge"],
  },
  {
    id: "p34",
    template: "number",
    category: "dokaz",
    layout: "photoTop",
    photo: "web",
    palette: "dark",
    eyebrow: "Naš rad",
    title: "klijenata zadovoljno isporukom",
    value: "100%",
    valueNote: "Svaki projekt isporučen prema dogovoru.",
    caption:
      "100% klijenata zadovoljno, svaki projekt isporučen prema dogovoru.\n\n" +
      "Nije marketinška brojka. To je posljedica načina na koji radimo:\n\n" +
      "— prvo vidite, pa plaćate (pa nema „nije to ono što sam očekivao“)\n" +
      "— četiri revizije uključene (pa nema „još samo ovo“)\n" +
      "— fiksna cijena prije početka (pa nema iznenađenja na kraju)\n\n" +
      "Kad klijent ne rizikuje novac, nema ni razočaranja. Zvuči jednostavno — ali većina radi obrnuto.\n\n" +
      "Rastemo na preporukama. Preporuka se ne kupuje.",
    tags: ["rezultati", "zadovoljstvo", "isporuka", "webdizajn", "sarajevo", "devforge"],
  },
  {
    id: "p35",
    template: "quote",
    category: "brend",
    layout: "stamp",
    palette: "ink",
    eyebrow: "Naš stav",
    title: "Ne prodajemo stranice. Prodajemo mir.",
    subtitle: "Stranica je posljedica. Mir je ono što klijent želi.",
    caption:
      "Niko ne želi „web stranicu“. Čovjek želi da ga nađu, da ga zovu, i da ne mora razmišljati o tome.\n\n" +
      "Zato ne počinjemo s dizajnom. Počinjemo s pitanjem: šta Vas trenutno sprječava da dobijete više posla?\n\n" +
      "Odgovori su obično isti:\n" +
      "— „ne mogu me naći na Google-u“\n" +
      "— „pošalju mi link i ne odgovore“\n" +
      "— „nemam vremena odgovarati na ista pitanja“\n\n" +
      "Tekst, raspored i funkcionalnosti se rade prema tim odgovorima. Boje dolaze na kraju.\n\n" +
      "Ljepota je posljedica. Mir je cilj.",
    tags: ["brend", "strategija", "webdizajn", "konverzija", "devforge"],
  },
  {
    id: "p36",
    template: "list",
    category: "ponuda",
    layout: "split",
    palette: "teal",
    eyebrow: "Za koga",
    title: "Za koga radimo najbolje",
    items: ["Male i srednje firme", "Servisne djelatnosti", "Ordinacije i saloni", "Restorani i shopovi"],
    caption:
      "Ne radimo za svakoga. Najbolji smo za:\n\n" +
      "— male i srednje firme koje trebaju ozbiljnu stranicu bez agencijske cijene\n" +
      "— servisne djelatnosti (majstori, agencije, konsultanti) kojima treba da ih zovu\n" +
      "— ordinacije, salone i studije kojima treba zakazivanje termina\n" +
      "— restorane i male shopove kojima treba online prisutnost\n\n" +
      "Ne radimo: velike enterprise sisteme, web shopove s 5000 proizvoda i integracijom na tri ERP-a. Za to preporučimo nekog drugog.\n\n" +
      "Ako ne možemo — reći ćemo Vam odmah, u prvom razgovoru.\n\n" +
      "Bavite se nečim od ovoga?",
    tags: ["zakoga", "malibiznis", "servisi", "ordinacije", "sarajevo", "devforge"],
  },
  {
    id: "p37",
    template: "title",
    category: "ponuda",
    layout: "photo",
    photo: "web",
    palette: "light",
    eyebrow: "Sve uključeno",
    title: "Dizajn, kod, panel i revizije. Jedna cijena.",
    subtitle: "Bez doplata i bez „to se posebno plaća“.",
    caption:
      "Jedna cijena. Sve unutra. Bez doplata nakon potpisa.\n\n" +
      "Uključeno:\n" +
      "— UI/UX dizajn\n" +
      "— razvoj (kod)\n" +
      "— mobilna verzija\n" +
      "— admin panel\n" +
      "— SEO osnova\n" +
      "— analitika\n" +
      "— četiri revizije\n" +
      "— besplatna prva verzija\n\n" +
      "Nije uključeno: domena i hosting — plaćate direktno provideru, bez naše marže. Nema skrivenih stavki jer nema stavki.\n\n" +
      "Zašto ovako: jer kupac koji ne zna konačnu cijenu ne može planirati. A firma koja ne može planirati ne kupuje.\n\n" +
      "Znate broj prije nego što počnemo.",
    tags: ["cijene", "ukljuceno", "transparentnost", "webdizajn", "devforge"],
  },
  {
    id: "p38",
    template: "list",
    category: "ponuda",
    layout: "band",
    palette: "dark",
    eyebrow: "AI sistemi",
    title: "Četiri posla koja AI preuzima",
    items: ["Odgovori na ista pitanja", "Zakazivanje termina", "Bilježenje narudžbi", "Prosljeđivanje hitnog"],
    caption:
      "AI u firmi nije filozofija. To su četiri konkretna posla:\n\n" +
      "1. Odgovori na ista pitanja. „Imate li na stanju“, „koliko košta“, „radite li subotom“ — 20 pitanja koja ponavljate svaki dan.\n\n" +
      "2. Zakazivanje termina. Kupac zakaže sam, dobije potvrdu, Vi dobijete zapis.\n\n" +
      "3. Bilježenje narudžbi iz poruka. Poruka na Instagramu → zapis u tabeli.\n\n" +
      "4. Prosljeđivanje hitnog. Nešto komplikovano ide Vama, s cijelim razgovorom.\n\n" +
      "Sve ostalo — ne diramo. AI ne pregovara o cijeni i ne obećava što Vi niste odobrili.\n\n" +
      "Koliko vremena dnevno potrošite na iste odgovore?",
    tags: ["aisistemi", "automatizacija", "termini", "upiti", "sarajevo", "devforge"],
  },
  {
    id: "p39",
    template: "quote",
    category: "brend",
    layout: "center",
    palette: "sun",
    eyebrow: "Naš stav",
    title: "Ako ne možemo — reći ćemo Vam.",
    subtitle: "Bolje izgubiti posao nego uraditi ga loše.",
    caption:
      "Dešava se da nas pitaju za nešto što ne radimo dobro.\n\n" +
      "Primjer: veliki web shop s 5000 proizvoda i integracijom na tri sistema. To nije naš teren.\n\n" +
      "Kažemo odmah, u prvom razgovoru. I preporučimo nekog ko to radi.\n\n" +
      "Zašto: loše urađen posao košta više od izgubljenog. Košta reputaciju, košta vrijeme, i na kraju ga morate ispravljati besplatno.\n\n" +
      "Ako Vam neko kaže da može sve — pitajte ga šta ne može.",
    tags: ["brend", "iskrenost", "povjerenje", "agencija", "devforge"],
  },
  {
    id: "p40",
    template: "cta",
    category: "ponuda",
    layout: "photoBg",
    photo: "hero",
    palette: "dark",
    eyebrow: "Počnite",
    title: "Recite čime se bavite. Mi pitamo dalje.",
    subtitle: "Ne morate imati ni ideju ni materijal.",
    caption:
      "Većina razgovora počne ovako: „Radim to i to, ne znam šta mi treba.“\n\n" +
      "To je sasvim dovoljno.\n\n" +
      "Ne morate imati:\n" +
      "— gotov tekst\n" +
      "— logo u vektoru\n" +
      "— ideju kako stranica treba izgledati\n" +
      "— ni odluku da li Vam uopšte treba stranica\n\n" +
      "Dovoljno je da se javite i kažete čime se bavite. Mi pitamo dalje i kažemo šta ima smisla.\n\n" +
      "Bez obaveze i bez predujma.\n\n" +
      "Javite nam se u DM.",
    tags: ["kontakt", "pocetak", "bezobaveze", "webdizajn", "sarajevo", "devforge"],
  },
];
