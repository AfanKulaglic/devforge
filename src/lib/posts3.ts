// ───────────────────────────────────────────────────────────────────────────
// OBJAVE 41–60 — POVJERENJE, SAVJETI I ZATVARANJE
// Treca trecina: rjesavanje sumnji, mitovi, konkretni savjeti, pozivi.
// ───────────────────────────────────────────────────────────────────────────

import type { AdPost } from "./postsData";

export const POSTS_3: AdPost[] = [
  {
    id: "p41",
    template: "list",
    category: "edukacija",
    layout: "center",
    palette: "light",
    eyebrow: "Mitovi",
    title: "Četiri mita o web stranicama",
    items: ["„Preskupo je” — od 150 KM", "„Traje mjesecima” — 2 do 5 dana", "„Treba mi firma” — treba samo ideja", "„Mobitel je dovoljan” — nije"],
    caption:
      "Četiri stvari koje najčešće čujem — i zašto nisu tačne.\n\n" +
      "1. „Preskupo je”\n" +
      "Web stranica od 150 KM. To je manje od jedne plate za posao koji radi 24/7.\n\n" +
      "2. „Traje mjesecima”\n" +
      "Prva verzija: 2–5 dana. Gotova stranica: 1–2 sedmice za jednostavniju.\n\n" +
      "3. „Treba mi registrovana firma”\n" +
      "Ne. Treba ideja i sadržaj. Obrt, freelancer, lični brend — sve prolazi.\n\n" +
      "4. „Mobitel je dovoljan”\n" +
      "Instagram profil ne postoji u Google pretrazi. Web stranica postoji.\n\n" +
      "DM ako imate još neko pitanje.",
    tags: ["mitovi", "webdizajn", "sarajevo", "bosna", "malibiznis", "devforge"],
  },
  {
    id: "p42",
    template: "quote",
    category: "brend",
    layout: "split",
    palette: "dark",
    eyebrow: "Naš pristup",
    title: "Radije ćemo odbiti posao nego uzeti novac za nešto što Vam ne treba.",
    subtitle: "Dogodi se — i to je u redu.",
    caption:
      "Nekoliko puta smo rekli: „Ovo Vam ne treba.”\n\n" +
      "Primjer: firma je tražila web shop, a imala 4 proizvoda i prodaju preko Instagrama. Shop od 600 KM bi bio bacanje novca.\n\n" +
      "Rekli smo: uzmite običnu stranicu s kontaktom i nastavite prodavati preko DM-a. Kad dođete do 20+ proizvoda — javite se za shop.\n\n" +
      "Izgubili smo posao tada. Dobili smo klijenta za dvije godine.\n\n" +
      "Ne prodajemo sve. Prodajemo ono što ima smisla.\n\n" +
      "DM.",
    tags: ["iskrenost", "povjerenje", "webdizajn", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p43",
    template: "process",
    category: "edukacija",
    layout: "band",
    palette: "teal",
    eyebrow: "Vodič",
    title: "Šta pripremiti prije javljanja",
    items: ["Naziv firme i šta radite", "Logo i boje (ako imate)", "Fotografije ili primjeri", "Tekstove o uslugama i cijenama"],
    caption:
      "Da bi prva verzija bila što bolja, pripremite ovo prije nego se javite:\n\n" +
      "1. Naziv firme i čime se bavite\n" +
      "Dvije rečenice su dovoljne. „Frizer u Sarajevu, radim po terminu.”\n\n" +
      "2. Logo i boje\n" +
      "Ako imate — super. Ako ne — predložit ćemo.\n\n" +
      "3. Fotografije\n" +
      "Radovi, prostor, tim. Ako nemate profesionalne — poslužiće i telefonske.\n\n" +
      "4. Tekstovi\n" +
      "Usluge, cijene, radno vrijeme. Ako nemate — napisaćemo mi, Vi ispravite.\n\n" +
      "Ne treba sve biti savršeno. Samo počnimo.\n\n" +
      "DM.",
    tags: ["vodic", "webdizajn", "sarajevo", "bosna", "malibiznis", "devforge"],
  },
  {
    id: "p44",
    template: "number",
    category: "dokaz",
    layout: "offset",
    palette: "dark",
    eyebrow: "Podrška",
    title: "minuta — prosječno vrijeme odgovora",
    value: "10",
    valueNote: "na DM, Viber i WhatsApp",
    caption:
      "Deset minuta. Toliko nam prosječno treba da odgovorimo.\n\n" +
      "Ne „u roku od 24 sata”. Ne „javimo se u toku radnog dana”.\n\n" +
      "Znamo kako je kad ti treba odgovor sada — jer čekaš da neko drugi odgovori, a posao stoji.\n\n" +
      "Pišite na:\n" +
      "→ Instagram DM\n" +
      "→ Viber\n" +
      "→ WhatsApp\n\n" +
      "Ako ne odgovorimo u 10 minuta, vjerovatno smo na sastanku. Javit ćemo se prvom prilikom.\n\n" +
      "DM.",
    tags: ["podrska", "brzina", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p45",
    template: "list",
    category: "edukacija",
    layout: "stamp",
    palette: "light",
    eyebrow: "Odlučivanje",
    title: "Kako odabrati firmu za web stranicu",
    items: ["Pitajte da vidite radove", "Tražite fiksnu cijenu unaprijed", "Provjerite da li su radovi živi", "Pitajte šta je uključeno", "Tražite probnu verziju prije plaćanja"],
    slides: [
      { template: "list", eyebrow: "Odlučivanje", title: "Pet pitanja prije plaćanja", items: ["Pokažite mi radove", "Koliko tačno košta?", "Da li su radovi još živi?", "Šta je uključeno?", "Mogu li vidjeti prije plaćanja?"] },
      { template: "compare", eyebrow: "Crvene zastave", title: "Na šta paziti", items: ["Bez linkova na radove", "Cijena „po dogovoru”", "Traže 50% unaprijed", "Nema odgovora na pitanja", "Radovi živi", "Fiksna cijena", "Bez predujma", "Odgovor u 10 minuta"], palette: "light" },
      { template: "cta", eyebrow: "Kod nas", title: "Odgovor na svih pet je jasan." },
    ],
    caption:
      "Prije nego date novac bilo kome — pitajte ovih pet stvari.\n\n" +
      "1. „Pokažite mi radove”\n" +
      "Ne slike. Linkove. Otvorite ih sami.\n\n" +
      "2. „Koliko tačno košta?”\n" +
      "Ako ne daju fiksnu cijenu prije početka — veliki znak.\n\n" +
      "3. „Da li su ti radovi još živi?”\n" +
      "Neke firme pokazuju sajtove kojih više nema.\n\n" +
      "4. „Šta je uključeno?”\n" +
      "Dizajn? Mobitel? SEO? Izmjene?\n\n" +
      "5. „Mogu li vidjeti verziju prije plaćanja?”\n" +
      "Ako ne — pitajte zašto.\n\n" +
      "Kod nas je odgovor na svih pet jasan.\n\n" +
      "DM.",
    tags: ["savjeti", "webdizajn", "odlucivanje", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p46",
    template: "title",
    category: "edukacija",
    layout: "center",
    palette: "dark",
    eyebrow: "Realno",
    title: "Stranica nije garant prodaje.",
    subtitle: "Ali bez nje nemate ni šansu.",
    caption:
      "Iskreno: web stranica sama po sebi neće donijeti prodaju.\n\n" +
      "Ne postoji dugme koje donosi mušterije.\n\n" +
      "Šta stranica STVARNO radi:\n" +
      "→ Daje kredibilitet (firma postoji, ozbiljna je)\n" +
      "→ Drži sve informacije na jednom mjestu\n" +
      "→ Pojavljuje se u Google pretrazi\n" +
      "→ Radi 24/7 dok Vi spavate\n\n" +
      "Šta još treba:\n" +
      "→ Ljudi da znaju da postojite (Instagram, preporuke)\n" +
      "→ Jasna ponuda\n" +
      "→ Odgovor na upit u razumnom roku\n\n" +
      "Stranica je temelj, ne cijela kuća.\n\n" +
      "DM.",
    tags: ["iskrenost", "webdizajn", "marketing", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p47",
    template: "compare",
    category: "edukacija",
    layout: "split",
    palette: "teal",
    eyebrow: "AI",
    title: "AI chat vs AI recepcionar",
    items: ["Radi na sajtu", "Posjetilac mora pisati", "Odgovara na pitanja", "Nema glasa", "Radi na telefonu", "Mušterija samo pozove", "Obavlja razgovor", "Prirodan glas"],
    caption:
      "Dvije stvari koje ljudi stalno miješaju.\n\n" +
      "AI CHAT:\n" +
      "• Radi na sajtu\nu\n" +
      "• Posjetilac mora pisati\n" +
      "• Odgovara na pitanja o uslugama\n" +
      "• Nema glasa\n\n" +
      "AI RECEPCIONAR:\n" +
      "• Radi na telefonu\n" +
      "• Mušterija samo pozove\n" +
      "• Obavlja cijeli razgovor\n" +
      "• Prirodan glas\n\n" +
      "Chat je za ljude koji već gledaju sajt. Recepcionar je za sve koji Vas zovu.\n\n" +
      "Oboje su AI sistemi — samo rješavaju različite probleme.\n\n" +
      "DM pa vidimo šta Vama treba.",
    tags: ["ai", "aichat", "airecepcionar", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p48",
    template: "quote",
    category: "brend",
    layout: "band",
    palette: "light",
    eyebrow: "Naš pristup",
    title: "Jedan klijent, jedan projekt, puna pažnja.",
    subtitle: "Ne radimo 20 projekata paralelno.",
    caption:
      "Neke agencije uzmu 20 projekata odjednom, pa svi čekaju.\n\n" +
      "Mi radimo drugačije — ograničen broj projekata u isto vrijeme.\n\n" +
      "Zašto?\n" +
      "→ Vaše izmjene ne čekaju u redu\n" +
      "→ Odgovor dobijete za 10 minuta, ne za 3 dana\n" +
      "→ Kvalitet ne pada jer se ne žuri\n\n" +
      "Možda zvuči kao da gubimo posao. Ali tako radimo od početka i tako ćemo nastaviti.\n\n" +
      "DM ako ste spremni da čekate svoj red — obično 1–2 sedmice.\n\n" +
      "Vrijedi.",
    tags: ["kvalitet", "povjerenje", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p49",
    template: "list",
    category: "ponuda",
    layout: "offset",
    palette: "dark",
    eyebrow: "Dodatno",
    title: "Šta još radimo",
    items: ["Logo i vizualni identitet — od 100 KM", "Održavanje stranice — po dogovoru", "Redizajn postojeće stranice", "Migracija na novi hosting", "Tehnička podrška"],
    caption:
      "Uz stranice i shopove, radimo i ovo:\n\n" +
      "🎨 Logo i vizualni identitet — od 100 KM\n" +
      "Znak, paleta boja, fontovi, osnovna pravila korištenja.\n\n" +
      "🔧 Održavanje — po dogovoru\n" +
      "Ažuriranja, sigurnosne kopije, manje izmjene.\n\n" +
      "🔄 Redizajn\n" +
      "Imate stranicu koja ne radi dobro? Popravljamo ili pravimo novu.\n\n" +
      "📦 Migracija na hosting\n" +
      "Prebacivanje s lošeg hostinga na stabilan.\n\n" +
      "🛠️ Tehnička podrška\n" +
      "Nešto puklo? Javite se.\n\n" +
      "DM za ono što Vam treba.",
    tags: ["usluge", "logo", "odrzavanje", "redizajn", "sarajevo", "devforge"],
  },
  {
    id: "p50",
    template: "number",
    category: "sadrzaj",
    layout: "stamp",
    palette: "teal",
    eyebrow: "Iskustvo",
    title: "usluga pod jednim krovom",
    value: "5",
    valueNote: "web, shop, app, igrice, AI",
    caption:
      "Pet usluga, jedan tim — ne morate mijenjati tri firme.\n\n" +
      "🌐 Web stranice\n" +
      "🛒 Web shopovi\n" +
      "📱 Mobilne aplikacije\n" +
      "🎮 2D igrice\n" +
      "🤖 AI sistemi\n\n" +
      "Zašto je to bitno:\n" +
      "Ako Vam treba stranica + AI chat — ne morate tražiti dva izvođača koji se poslije ne razumiju.\n\n" +
      "Ako trebate shop + mobilnu app — isti tim drži sve.\n\n" +
      "Manje dogovaranja, manje zabune, jedna odgovornost.\n\n" +
      "DM.",
    tags: ["usluge", "sarajevo", "bosna", "devforge", "agencija"],
  },
  {
    id: "p51",
    template: "title",
    category: "edukacija",
    layout: "center",
    palette: "light",
    eyebrow: "Savjet",
    title: "Prva rečenica na stranici je najvažnija.",
    subtitle: "Ako nije jasna u 5 sekundi — posjetilac odlazi.",
    caption:
      "Test: otvori svoj sajt i pokrij sve osim prve rečenice.\n\n" +
      "Da li iz nje znaš čime se firma bavi?\n\n" +
      "Ako ne — imaš problem.\n\n" +
      "Loše:\n" +
      "„Dobrodošli na našu stranicu. Mi smo tim stručnjaka posvećenih kvaliteti.”\n\n" +
      "Dobro:\n" +
      "„Frizer u Sarajevu. Šišanje, bojenje, njega kose — po terminu.”\n\n" +
      "Razlika: prva ne kaže ništa, druga kaže sve u 10 riječi.\n\n" +
      "Ljudi ne čitaju. Skeniraju.\n\n" +
      "DM ako želite da Vam napišemo prvu rečenicu.",
    tags: ["savjeti", "copywriting", "webdizajn", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p52",
    template: "list",
    category: "edukacija",
    layout: "split",
    palette: "dark",
    eyebrow: "Sigurnost",
    title: "Šta čuva Vašu stranicu",
    items: ["Redovne sigurnosne kopije", "Ažuriranja sistema", "HTTPS i SSL certifikat", "Čista i provjerena baza", "Sigurni pristupi"],
    caption:
      "Stranica je napravljena — šta sad? Evo šta je drži zdravom:\n\n" +
      "🔒 Sigurnosne kopije\n" +
      "Ako nešto pukne — vraća se iz kopije, ne ispočetka.\n\n" +
      "🔄 Ažuriranja\n" +
      "Sigurnosne zakrpe se ne preskaču.\n\n" +
      "🔐 HTTPS certifikat\n" +
      "Bez njega browser piše „Nije sigurno”. Google to kažnjava.\n\n" +
      "🧹 Čista baza\n" +
      "Bez starih dodataka i smeća koje usporava.\n\n" +
      "🔑 Sigurni pristupi\n" +
      "Jake lozinke, bez dijeljenja.\n\n" +
      "Ovo je ono što većina „zaboravi”. Mi ne.\n\n" +
      "DM.",
    tags: ["sigurnost", "webdizajn", "odrzavanje", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p53",
    template: "quote",
    category: "dokaz",
    layout: "band",
    palette: "teal",
    eyebrow: "Klijenti",
    title: "Ne tražimo recenzije. Tražimo da se vrate.",
    subtitle: "Zato ne nalazite zvjezdice na našoj stranici.",
    caption:
      "Primijetit ćete — na našoj stranici nema recenzija ni ocjena.\n\n" +
      "Nije zato što ih nemamo. Zato što ne mislimo da pet zvjezdica od nepoznatog imena nešto dokazuje.\n\n" +
      "Ono što dokazuje:\n" +
      "→ Pogledajte naše radove. Otvorite ih. Radi li?\n" +
      "→ Pošaljite nam poruku. Vidite kako brzo odgovaramo.\n" +
      "→ Tražite besplatnu verziju. Vidite šta dobijete.\n\n" +
      "Sve tri stvari možete provjeriti sami, bez da nam vjerujete na riječ.\n\n" +
      "DM.",
    tags: ["povjerenje", "iskrenost", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p54",
    template: "process",
    category: "edukacija",
    layout: "offset",
    palette: "dark",
    eyebrow: "Pokretanje",
    title: "Od ideje do online stranice",
    items: ["Dogovor i prikupljanje materijala", "Besplatna verzija za pregled", "Odobrenje i finalna izrada", "Objava i predaja pristupa"],
    caption:
      "Cijeli put — od prve poruke do stranice koja je online.\n\n" +
      "1. Dogovor\n" +
      "Kažete nam čime se bavite. Prikupimo logo, slike, tekstove — ili napišemo sami.\n\n" +
      "2. Besplatna verzija\n" +
      "U 2–5 dana dobijate link. Otvorite, pogledajte, šaljete komentare.\n\n" +
      "3. Odobrenje\n" +
      "Kad ste zadovoljni dizajnom — kreće finalna izrada.\n\n" +
      "4. Objava\n" +
      "Postavljamo na hosting, povezujemo domenu, predajemo Vam pristup.\n\n" +
      "Nakon toga — stranica je Vaša. Nema nas kao „taoca”.\n\n" +
      "DM.",
    tags: ["proces", "webdizajn", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p55",
    template: "number",
    category: "dokaz",
    layout: "stamp",
    palette: "light",
    eyebrow: "Vlasništvo",
    title: "% Vaše",
    value: "100",
    valueNote: "stranica, domena i kod ostaju kod Vas",
    caption:
      "Sto posto. Toliko je Vaše.\n\n" +
      "Neke firme drže domenu i hosting na svom imenu. Kad prestanete plaćati — stranica nestaje.\n\n" +
      "Mi radimo drugačije:\n" +
      "→ Domena je na Vaše ime\n" +
      "→ Hosting je Vaš\n" +
      "→ Kod i sadržaj predajemo Vama\n\n" +
      "Ako jednog dana poželite drugoga da održava — nema problema. Sve je Vaše.\n\n" +
      "Nema zaključavanja. Nema „ne možemo vam dati pristup”.\n\n" +
      "DM.",
    tags: ["vlasnistvo", "transparentnost", "webdizajn", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p56",
    template: "title",
    category: "ponuda",
    layout: "center",
    palette: "teal",
    eyebrow: "Za firme",
    title: "Imate firmu bez stranice? Ovo je Vaš trenutak.",
    subtitle: "Prva verzija besplatno. Plaćate samo ako Vam se svidi.",
    caption:
      "Konkurencija je online. Vi još niste.\n\n" +
      "Znamo zašto — nikad nije bio „pravi trenutak”. Uvijek nešto preče.\n\n" +
      "Evo kako preskočiti sve izgovore:\n\n" +
      "1. Pošaljete nam ime firme i čime se bavite\n" +
      "2. Mi napravimo stranicu — besplatno\n" +
      "3. Pogledate je i kažete šta mijenjati\n" +
      "4. Ako Vam se svidi — plaćate od 150 KM\n\n" +
      "Ako ne — ništa.\n\n" +
      "Nema rizika. Samo odluka.\n\n" +
      "DM.",
    tags: ["webdizajn", "besplatno", "sarajevo", "bosna", "malibiznis", "devforge"],
  },
  {
    id: "p57",
    template: "list",
    category: "edukacija",
    layout: "split",
    palette: "dark",
    eyebrow: "Content",
    title: "Šta staviti na stranicu",
    items: ["Šta radite — jasno u prvoj rečenici", "Cijene ili okviri", "Fotografije radova", "Kontakt koji se vidi", "Radno vrijeme i lokacija", "Pitanja koja svi postavljaju"],
    slides: [
      { template: "list", eyebrow: "Content", title: "Šta ide na stranicu", items: ["Šta radite — prva rečenica", "Cijene ili okviri", "Fotografije radova", "Kontakt koji se vidi"] },
      { template: "list", eyebrow: "Obavezno", title: "Ne preskačite", items: ["Radno vrijeme", "Lokacija i mapa", "Pitanja koja svi postavljaju", "Jasan poziv na akciju"], palette: "teal" },
      { template: "cta", eyebrow: "Pomoć", title: "Ako nemate tekstove — pišemo mi.", subtitle: "Vi samo ispravite ono što ne valja.", palette: "light" },
    ],
    caption:
      "Nemate ideju šta ide na stranicu? Evo minimuma:\n\n" +
      "1. Šta radite — jasno\n" +
      "Prva rečenica. Bez fraza.\n\n" +
      "2. Cijene ili okviri\n" +
      "„Od 50 KM” je bolje od „kontaktirajte za ponudu”.\n\n" +
      "3. Fotografije radova\n" +
      "Vaši radovi, Vaš prostor, Vaš tim.\n\n" +
      "4. Kontakt koji se vidi\n" +
      "Bez skrolanja do dna.\n\n" +
      "5. Radno vrijeme i lokacija\n" +
      "Ljudi to traže prvo.\n\n" +
      "6. Pitanja koja svi postavljaju\n" +
      "Odgovorite jednom — uštedite 50 razgovora.\n\n" +
      "Ostalo je nadgradnja.\n\n" +
      "DM.",
    tags: ["content", "webdizajn", "savjeti", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p58",
    template: "quote",
    category: "brend",
    layout: "band",
    palette: "light",
    eyebrow: "Naš pristup",
    title: "Ne trebamo Vas uvjeravati. Dovoljno je da pogledate.",
    subtitle: "Zato nikad ne pritiskamo na odluku.",
    caption:
      "Nikad nećemo pisati „POŽURI, ostalo samo 2 mjesta!”\n\n" +
      "Nema lažne oskudnosti. Nema odbrojavanja. Nema „samo danas 50%”.\n\n" +
      "Zašto?\n" +
      "Jer ako Vam nešto treba — sami ćete odlučiti kad bude vrijeme.\n\n" +
      "Ako ne treba — bolje da to saznate sad nego da platite za nešto što stoji neiskorišteno.\n\n" +
      "Naša ponuda ne nestaje. Cijene su iste sljedeće sedmice i sljedeći mjesec.\n\n" +
      "DM kad budete spremni. Tu smo.",
    tags: ["iskrenost", "povjerenje", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p59",
    template: "cta",
    category: "ponuda",
    layout: "offset",
    palette: "dark",
    eyebrow: "Kontakt",
    title: "Jedna poruka. To je sve.",
    subtitle: "Viber, WhatsApp, Instagram DM ili poziv — kako Vam je lakše.",
    caption:
      "Ne treba Vam formular. Ne treba Vam sastanak. Ne treba Vam priprema.\n\n" +
      "Dovoljna je jedna poruka:\n" +
      "„Bavim se [time]. Treba mi [to].”\n\n" +
      "Odgovaramo u 10 minuta.\n\n" +
      "Kontakt:\n" +
      "→ Instagram DM\n" +
      "→ Viber\n" +
      "→ WhatsApp\n" +
      "→ Pozovite nas\n" +
      "→ devforge.studio@gmail.com\n\n" +
      "Radimo iz Sarajeva, primamo klijente iz cijele regije.\n\n" +
      "Vidimo se u porukama.",
    tags: ["kontakt", "sarajevo", "bosna", "devforge", "webdizajn"],
  },
  {
    id: "p60",
    template: "title",
    category: "brend",
    layout: "stamp",
    palette: "teal",
    eyebrow: "DevForge",
    title: "Vidite svoju stranicu prije nego što platite.",
    subtitle: "To nije slogan. To je način na koji radimo.",
    caption:
      "Ovo je cijela naša filozofija u jednoj rečenici.\n\n" +
      "Vidite svoju stranicu prije nego što platite.\n\n" +
      "Ne sliku. Ne mockup. Prava stranica u browseru, na Vašem telefonu, s Vašim imenom i bojama.\n\n" +
      "Bez predujma.\n" +
      "Bez rizika.\n\n" +
      "Web stranice od 150 KM.\n" +
      "Web shopovi od 600 KM.\n" +
      "Aplikacije, igrice i AI — po dogovoru.\n\n" +
      "Sarajevo. Cijela regija. Online.\n\n" +
      "Pošaljite nam DM.",
    tags: ["devforge", "webdizajn", "sarajevo", "bosna", "malibiznis", "agencija"],
  },
];
