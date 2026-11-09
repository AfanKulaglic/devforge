import type { AdPost } from "./postsData";

// ───────────────────────────────────────────────────────────────────────────
// OBJAVE 41–60 — povjerenje, priča, ljudi
//
// Ovo su objave koje grade odnos: kako razmišljamo, šta smo naučili,
// gdje griješimo, kako radimo s ljudima. Prodaja je usput, nikad glavna.
// ───────────────────────────────────────────────────────────────────────────

export const POSTS_3: AdPost[] = [
  {
    id: "p41",
    template: "quote",
    category: "brend",
    layout: "stamp",
    palette: "dark",
    eyebrow: "Naš stav",
    title: "Kad cijena nije jasna, ne pitate.",
    subtitle: "Odlazite. A firma misli da niste zainteresovani.",
    caption:
      "Najčešći razlog zašto ljudi ne pošalju upit: ne znaju koliko će to koštati, a ne žele da ispadnu da nemaju.\n\n" +
      "Zato na sajtu imamo cijene. Nije zato što volimo da ih objavljujemo — zato što ljudi mirnije pitaju kad znaju okvir.\n\n" +
      "„Web stranica od 150 KM“ znači: znate početak. Ako Vam treba nešto veće, znate da će biti više i možete pitati koliko.\n\n" +
      "Firme koje kriju cijene misle da tako zadržavaju pregovaračku poziciju. U stvarnosti gube upite od onih koji su transparentni.",
    tags: ["brend", "cijena", "transparentnost", "povjerenje", "devforge"],
  },
  {
    id: "p42",
    template: "list",
    category: "izakulisa",
    layout: "photoTop",
    photo: "project1",
    palette: "teal",
    eyebrow: "Iza kulisa",
    title: "Četiri stvari iz 40+ projekata",
    items: ["Klijent zna svoj posao", "Prva verzija nije zadnja", "Sitnice odnesu vrijeme", "Jasna cijena štedi"],
    caption:
      "Četiri stvari koje smo naučili radeći, i koje bi svako trebao znati:\n\n" +
      "1. Klijent zna svoj posao bolje od nas. Mi znamo stranice. Zato pitamo, ne pretpostavljamo.\n\n" +
      "2. Prva verzija nikad nije zadnja, i to je normalno. Ne treba se stidjeti izmjena.\n\n" +
      "3. Najviše vremena ode na sitnice — boja dugmeta, razmak, tekst koji nigdje ne stoji. To se ne vidi ali je pola posla.\n\n" +
      "4. Kad je cijena jasna na početku, projekat ide dvostruko brže. Kad nije, pola vremena ode na pregovore.",
    tags: ["izakulisa", "iskustvo", "agencija", "lekcije", "devforge"],
  },
  {
    id: "p43",
    template: "compare",
    category: "savjet",
    layout: "band",
    palette: "sun",
    eyebrow: "Savjet",
    title: "Četiri zablude koje Vas koštaju upita",
    items: ["Cijena je previsoka", "Traje mjesecima", "Treba mi firma", "Mobitel je dovoljan", "Cijena je jasna", "2–5 dana", "Treba ideja i kupac", "Mobitel je 76%"],
    caption:
      "Četiri najčešće zablude koje čujemo:\n\n" +
      "1. „Preskupo je.“ — Možda. Ali uporedite s tim koliko Vas košta što Vas niko ne nađe.\n\n" +
      "2. „Traje mjesecima.“ — Kod nas 2–5 dana za stranicu, jer je prva verzija gotova prije nego što platite.\n\n" +
      "3. „Treba mi firma da bih imao stranicu.“ — Ne. Treba Vam nešto što prodajete i neko kome to treba. Firma je forma.\n\n" +
      "4. „Dovoljan je mobitel.“ — 76% ljudi dođe s mobitela. Ali na mobitelu Vam treba stranica da bi Vas našli.\n\n" +
      "Nijedna od ovih nije glupa. Samo su netačne.",
    tags: ["savjeti", "zablude", "poredjenje", "webdizajn", "devforge"],
  },
  {
    id: "p44",
    template: "title",
    category: "brend",
    layout: "center",
    palette: "light",
    eyebrow: "O nama",
    title: "Radimo iz Sarajeva, bez režija",
    subtitle: "Zato ne plaćate kancelariju u centru.",
    caption:
      "Nismo velika agencija. Nemamo 30 zaposlenih i ne iznajmljujemo sprat u centru.\n\n" +
      "To znači da ne plaćate tu režiju.\n\n" +
      "Radimo s firmama iz Sarajeva, Tuzle, Banje Luke, Mostara, Travnika — i s ljudima iz dijaspore koji vode posao u BiH.\n\n" +
      "Sve ide preko poziva, poruka i linkova. Kad treba, dođemo.\n\n" +
      "Mali tim znači: znate s kim razgovarate, i ta osoba radi na Vašem projektu. Nema prebacivanja između odjela.",
    tags: ["onama", "sarajevo", "bosna", "agencija", "devforge"],
  },
  {
    id: "p45",
    template: "list",
    category: "savjet",
    layout: "split",
    palette: "ink",
    eyebrow: "Savjet",
    title: "Četiri stvari daju tačnu ponudu",
    items: ["Čime se bavite", "Ko Vas zove", "Tri primjera", "Budžet, iskreno"],
    caption:
      "Kad tražite ponudu, ove četiri stvari je razlika između „ne znamo šta hoćete“ i tačne cijene isti dan:\n\n" +
      "1. Čime se bavite i šta prodajete — jedna rečenica.\n" +
      "2. Ko Vas najčešće zove i šta pita.\n" +
      "3. Tri sajta koja Vam se sviđaju. Nije važno što nisu iz Vaše branše.\n" +
      "4. Budžet koji imate. Iskreno. Ako je 200 KM, recite 200 — smislit ćemo šta se može.\n\n" +
      "Bez ovoga, ponuda je nagađanje. A nagađanje uvijek košta više.",
    tags: ["savjeti", "ponuda", "saradnja", "malibiznis", "devforge"],
  },
  {
    id: "p46",
    template: "number",
    category: "dokaz",
    layout: "photo",
    photo: "project2",
    palette: "mint",
    eyebrow: "Rezultat",
    title: "projekata, nijedan plaćen naslijepo",
    value: "40+",
    valueNote: "Stranice, shopovi, aplikacije, AI.",
    caption:
      "Preko 40 projekata. Neki veliki, neki jedna stranica za frizerski salon.\n\n" +
      "Ono što nam je važnije od broja: nijedan klijent nije platio nešto što nije vidio.\n\n" +
      "Svaki projekat je prošao isti put: dogovor → radna verzija → pregled → izmjene → objava → plaćanje.\n\n" +
      "Neki projekti su propali jer klijent nije imao materijal, ili je odustao. I to je dio posla — bolje da odustanete prije nego platite.\n\n" +
      "Broj nije poenta. Poenta je da nema neprijatnih iznenađenja.",
    tags: ["rezultati", "projekti", "iskustvo", "devforge"],
  },
  {
    id: "p47",
    template: "quote",
    category: "brend",
    layout: "center",
    palette: "teal",
    eyebrow: "Naš stav",
    title: "Domena, kod i pristupi su Vaši.",
    subtitle: "Nikad na naše ime. Bez zatočeništva.",
    caption:
      "Najgori scenario koji smo vidjeli: firma je platila stranicu, a domenu drži bivši izvođač. Godinu dana nisu mogli ništa.\n\n" +
      "Zato radimo drugačije:\n" +
      "— domena se registruje na Vaše ime\n" +
      "— hosting je Vaš račun\n" +
      "— izvorni kod dobijate u cjelosti\n" +
      "— sve lozinke idu Vama\n\n" +
      "Ako nas sutra poželite zamijeniti, uzmete sve i idete. Bez poziva i bez otkupa.\n\n" +
      "Firma koja Vas drži zatočenicima ne radi dobro — radi zato što mora.",
    tags: ["brend", "povjerenje", "vlasnistvo", "ferodnos", "devforge"],
  },
  {
    id: "p48",
    template: "list",
    category: "izakulisa",
    layout: "band",
    palette: "dark",
    eyebrow: "Iza kulisa",
    title: "Četiri pravila po kojima radimo",
    items: ["Radna verzija prvo", "Fiksna cijena", "Odgovor u 10 min", "Kažemo ne"],
    slides: [
      { template: "list", eyebrow: "Principi", title: "Četiri pravila", items: ["Radna verzija prvo", "Fiksna cijena", "Odgovor u 10 min", "Kažemo ne"] },
      { template: "quote", eyebrow: "Prvo pravilo", title: "Vidite, pa platite.", subtitle: "Ako ne valja — ne plaćate ništa.", palette: "teal" },
      { template: "quote", eyebrow: "Drugo pravilo", title: "Cijena se ne mijenja.", subtitle: "Nema doplata nakon dogovora.", palette: "ink" },
      { template: "cta", eyebrow: "Provjerite", title: "Držite nas za riječ.", subtitle: "Ako nešto padne, pitajte zašto.", palette: "sun" },
    ],
    caption:
      "Ovo nije marketing. Ovo su pravila po kojima radimo, i po kojima nas možete držati odgovornima:\n\n" +
      "1. Prvo radna verzija, pa plaćanje. Ako ne valja — ne plaćate.\n" +
      "2. Fiksna cijena na početku. Nema „ispostavilo se da treba još“.\n" +
      "3. Odgovaramo u 10 minuta radnim danom. Ako ne možemo odgovoriti odmah, kažemo kad ćemo.\n" +
      "4. Ako nešto ne znamo ili ne radimo — kažemo to. Ne uzimamo posao da bismo „naučili usput“.\n\n" +
      "Ako neko od ovih padne, slobodno nas pitajte zašto.",
    tags: ["principi", "izakulisa", "povjerenje", "ferodnos", "devforge"],
  },
  {
    id: "p49",
    template: "list",
    category: "savjet",
    layout: "offset",
    palette: "sun",
    eyebrow: "Savjet",
    title: "Četiri provjere za 30 minuta",
    items: ["PageSpeed brzina", "Mobitel prikaz", "Test forme", "Pristup domeni"],
    caption:
      "Ne morate nikog platiti da biste popravili najvažnije stvari. Za 30 minuta:\n\n" +
      "1. PageSpeed Insights — upišite svoju adresu. Ako je preko 3 sekunde, imate posla.\n" +
      "2. Otvorite svoju stranicu na mobitelu. Možete li pročitati bez zoom-a?\n" +
      "3. Popunite svoju kontakt formu i pošaljite sebi. Je li stigla?\n" +
      "4. Pokušajte se prijaviti na hosting. Znate li lozinku?\n\n" +
      "Ovo je 20% stvari koje uzrokuju 80% problema.\n\n" +
      "Ako sve radi — stranica je bolja od većine.",
    tags: ["savjeti", "diy", "webstranica", "provjera", "devforge"],
  },
  {
    id: "p50",
    template: "title",
    category: "edukacija",
    layout: "photoBg",
    photo: "hero",
    palette: "ink",
    eyebrow: "Edukacija",
    title: "Izgledate kao 30 drugih firmi.",
    subtitle: "Jer ste kupili isti šablon kao one.",
    caption:
      "Ako Vam stranica izgleda kao 30 drugih u Bosni, vjerovatno je tako i nastala.\n\n" +
      "Šablon nije loš. Loše je to što isti šablon koristi još hiljade firmi, i svi ostave iste sekcije, iste ikonice, isti raspored.\n\n" +
      "Kupac to prepoznaje nesvjesno. Ne zna zašto, ali osjeća da je „ono što svi imaju“.\n\n" +
      "Kad se radi po mjeri, čak i jednostavna stranica izgleda kao Vaša. Jer je rađena za Vaš sadržaj, ne za tuđi.\n\n" +
      "Nije poenta u luksuzu. Poenta je da se prepoznaje.",
    tags: ["edukacija", "sablon", "webdizajn", "brend", "devforge"],
  },
  {
    id: "p51",
    template: "process",
    category: "izakulisa",
    layout: "center",
    palette: "mint",
    eyebrow: "Kako radimo",
    title: "Zadnji dan: sve lozinke idu Vama",
    items: ["Prebacivanje domene", "Povezivanje analitike", "Test na 3 uređaja", "Predaja pristupa"],
    caption:
      "Objava nije samo „pustiti na internet“. Ovako izgleda zadnji dan:\n\n" +
      "1. Prebacivanje — stranica ide s test adrese na Vašu pravu domenu.\n" +
      "2. Analitika — povezujemo Google Analytics i Search Console. Tako znate ko dolazi.\n" +
      "3. Test — otvaramo na mobitelu, tabletu i računaru. Provjeravamo forme i brzinu.\n" +
      "4. Predaja — dobijate sve lozinke, pristup hostingu, domeni i kodu. Sve na Vaše ime.\n\n" +
      "Nakon toga: 30 dana podrške za sitnice besplatno.\n\n" +
      "Onda je Vaša.",
    tags: ["proces", "objava", "izakulisa", "predaja", "devforge"],
  },
  {
    id: "p52",
    template: "quote",
    category: "brend",
    layout: "stamp",
    palette: "teal",
    eyebrow: "Naš stav",
    title: "Jedna stvar dobro, pet površno.",
    subtitle: "Zato radimo samo četiri usluge.",
    caption:
      "Mogli bismo raditi i marketing, i društvene mreže, i video produkciju, i SEO za cijelu BiH.\n\n" +
      "Ne radimo.\n\n" +
      "Radimo stranice, shopove, aplikacije i AI sisteme. To je to.\n\n" +
      "Zašto: jer kad radiš pet stvari, radiš ih osrednje. A osrednje u digitalnom ne prolazi — ljudi odmah vide razliku.\n\n" +
      "Ako Vam treba nešto što nije na ovoj listi, reći ćemo Vam kome da se obratite. Bez provizije, bez interesa.\n\n" +
      "Fokus je usluga, ne ograničenje.",
    tags: ["brend", "fokus", "agencija", "kvalitet", "devforge"],
  },
  {
    id: "p53",
    template: "list",
    category: "savjet",
    layout: "photoTop",
    photo: "heroMob",
    palette: "dark",
    eyebrow: "Savjet",
    title: "Dobar materijal ubrza posao duplo",
    items: ["Logo u vektoru", "Tekst u dokumentu", "Originalne slike", "Cjenovnik kao tekst"],
    caption:
      "Ako nam pošaljete ovo u startu, projekat ide dvostruko brže:\n\n" +
      "1. Logo u vektoru — SVG, AI ili PDF. Ne screenshot s Facebooka. Ako nemate, pretvorit ćemo ga.\n\n" +
      "2. Tekst u dokumentu — Word, Google Doc, bilo šta. Nikad tekst „na slici“ jer se ne može kopirati.\n\n" +
      "3. Fotografije originalne, bez filtera i bez WhatsApp kompresije. Šaljite kao fajl, ne kao sliku u chatu.\n\n" +
      "4. Cjenovnik kao tekst — pa makar u poruci. Samo da znamo brojeve tačno.\n\n" +
      "Nemate sve? Nije problem. Napišemo mi tekst, a logo sredimo. Samo recite u startu da nemate.",
    tags: ["savjeti", "priprema", "materijal", "saradnja", "devforge"],
  },
  {
    id: "p54",
    template: "number",
    category: "dokaz",
    layout: "band",
    palette: "light",
    eyebrow: "Podatak",
    title: "dana do prve verzije koju vidite",
    value: "4",
    valueNote: "Nakon što dobijemo materijal.",
    caption:
      "Naša prva radna verzija obično bude gotova za 4 dana.\n\n" +
      "Nije zato što žurimo — zato što prije nego počnemo, pola posla je već urađeno: struktura, tekst, odluke.\n\n" +
      "Kad se radi obrnuto (počne se s dizajnom bez teksta), prva verzija traje 3 sedmice i sve se ruši u drugom krugu.\n\n" +
      "4 dana je realno za stranicu od 5–7 podstranica. Shop traje duže, aplikacija duže.\n\n" +
      "Ne obećavamo rokove koje ne možemo ispuniti. Kad nešto traje 3 sedmice, kažemo 3 sedmice.",
    tags: ["rezultati", "rok", "brzina", "proces", "devforge"],
  },
  {
    id: "p55",
    template: "compare",
    category: "edukacija",
    layout: "center",
    palette: "sun",
    eyebrow: "Poređenje",
    title: "Čovjek traži cijenu. Ne Vašu priču.",
    items: ["Cijenu", "Da li rade to što tražim", "Kako da ih kontaktiram", "Da li su stvarni", "Naša priča od 2009.", "Naša misija i vizija", "Svi naši partneri", "Nagrade"],
    caption:
      "Na stranicu dolazi čovjek koji ima problem. Ne dolazi da čita o Vama.\n\n" +
      "Traži četiri stvari: koliko košta, da li radite to što mu treba, kako da Vas kontaktira, i da li ste stvarni.\n\n" +
      "A firme najčešće stavljaju: priču o osnivanju, misiju, viziju, partnere, nagrade.\n\n" +
      "To nije loše — ali nije prvo.\n\n" +
      "Prvi ekran: šta radite, za koga, koliko, i dugme. Priča ide poslije, za one koje zanima.\n\n" +
      "Provjerite svoju naslovnu: nađete li te četiri stvari u prvoj sekundi?",
    tags: ["edukacija", "webdizajn", "ux", "naslovna", "devforge"],
  },
  {
    id: "p56",
    template: "quote",
    category: "brend",
    layout: "split",
    palette: "mint",
    eyebrow: "Naš stav",
    title: "Nekad kažemo ne. Namjerno.",
    subtitle: "Bolje izgubiti posao nego uraditi ga loše.",
    caption:
      "Nekad kažemo ne.\n\n" +
      "Ne ako je budžet 50 KM a očekivanja kao za veliki shop. Bolje da to kažemo odmah nego poslije tri sedmice.\n\n" +
      "Ne ako klijent zna tačno kako sve treba izgledati do najmanjeg piksela i ne želi razgovor. Tada nije potreban tim — potreban je izvođač.\n\n" +
      "Ne ako se projekat ne može završiti u razumnom roku jer nema materijala.\n\n" +
      "To nije bahatost. To je poštenje. Bolje da izgubim posao nego da uzmem pare i uradim loše.\n\n" +
      "I zato većina naših klijenata dođe preko preporuke.",
    tags: ["brend", "iskrenost", "povjerenje", "agencija", "devforge"],
  },
  {
    id: "p57",
    template: "list",
    category: "savjet",
    layout: "photo",
    photo: "mobile",
    palette: "ink",
    eyebrow: "Savjet",
    title: "Kontakt traže u podnožju. Stavite ga",
    items: ["Naziv i grad", "Telefon i e-mail", "Radno vrijeme", "Linkovi na mreže"],
    caption:
      "Podnožje je najviše zanemaren dio stranice — a tu ljudi traže kontakt.\n\n" +
      "Obavezno:\n" +
      "— pun naziv firme i grad (za Google)\n" +
      "— telefon i e-mail, kao link (da se može kliknuti)\n" +
      "— radno vrijeme\n" +
      "— linkovi na Instagram i Facebook\n\n" +
      "Dobro je imati:\n" +
      "— tačnu adresu\n" +
      "— brze linkove na glavne stranice\n" +
      "— godine osnivanja (daje povjerenje)\n\n" +
      "Ne treba: 40 linkova, mapa u podnožju, i „powered by“ tuđi logo.\n\n" +
      "Otvorite svoju stranicu i skrolajte do kraja. Nađete li telefon u 3 sekunde?",
    tags: ["savjeti", "webdizajn", "podnozje", "kontakt", "devforge"],
  },
  {
    id: "p58",
    template: "title",
    category: "izakulisa",
    layout: "offset",
    palette: "light",
    eyebrow: "Iza kulisa",
    title: "Ista osoba od početka do kraja.",
    subtitle: "Ne prelazi iz ruke u ruku.",
    caption:
      "U velikim agencijama projekat prelazi iz ruke u ruku: prodaja → projektni menadžer → dizajner → developer → tester.\n\n" +
      "Svaki prelaz izgubi dio informacija. Na kraju developer dobije „napravi ovako“ bez ikakvog konteksta zašto.\n\n" +
      "Kod nas: ista osoba razgovara s Vama, pravi strukturu, i radi na projektu.\n\n" +
      "Prednost: manje gubljenja, brže odluke, i ne morate objašnjavati istu stvar tri puta.\n\n" +
      "Nedostatak: ne možemo primiti 10 projekata odjednom. Primamo 3–4.\n\n" +
      "Zato nekad imamo listu čekanja. To je cijena fokusa.",
    tags: ["izakulisa", "mali tim", "proces", "agencija", "devforge"],
  },
  {
    id: "p59",
    template: "quote",
    category: "brend",
    layout: "photoBg",
    photo: "game",
    palette: "dark",
    eyebrow: "Za kraj",
    title: "Ne morate imati ni ideju.",
    subtitle: "Dovoljno je da se javite i kažete čime se bavite.",
    caption:
      "Najčešće ljudi ne pišu jer misle da moraju imati sve smišljeno.\n\n" +
      "Ne morate. Većina razgovora počne ovako: „Radim to i to, ne znam šta mi treba.“\n\n" +
      "To je sasvim dovoljno. Mi pitamo dalje.\n\n" +
      "Ako ne treba stranica — reći ćemo Vam.\n" +
      "Ako je dovoljna jedna stranica — reći ćemo.\n" +
      "Ako je bolje da prvo sredite nešto drugo — reći ćemo i to.\n\n" +
      "Razgovor ništa ne košta. Javite nam se u DM ili na Viber.",
    tags: ["kontakt", "brend", "pocetak", "sarajevo", "devforge"],
  },
  {
    id: "p60",
    template: "list",
    category: "edukacija",
    layout: "center",
    palette: "teal",
    eyebrow: "Sažetak",
    title: "Stranica koja radi ima četiri stvari",
    items: ["Radi na mobitelu", "Učita se za 3s", "Kaže čime se bavite", "Ima jasan kontakt"],
    caption:
      "Ako zapamtite samo jednu objavu, neka bude ova.\n\n" +
      "Stranica koja radi ima četiri stvari:\n\n" +
      "1. Radi na mobitelu — 76% ljudi dolazi tako.\n" +
      "2. Učita se brzo — ispod 3 sekunde, inače odlaze.\n" +
      "3. Kaže čime se bavite — jednom rečenicom, bez fraza.\n" +
      "4. Ima jasan kontakt — dugme koje se vidi bez skrolanja.\n\n" +
      "Uradi li stranica ove četiri stvari, radi bolje od većine.\n\n" +
      "Ostalo (animacije, dizajn, efekti) dolazi poslije.\n\n" +
      "Ako Vaša ne radi ove četiri — tu počnite.",
    tags: ["edukacija", "sazetak", "webdizajn", "osnove", "devforge"],
  },
];
