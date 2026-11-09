import type { AdPost } from "./postsData";

// ───────────────────────────────────────────────────────────────────────────
// OBJAVE 21–40 — AI, tehnologija, edukacija
//
// AI nije "magija" — pišemo o tome gdje stvarno pomaže maloj firmi,
// gdje ne pomaže, i koliko to košta. Bez hype-a.
// ───────────────────────────────────────────────────────────────────────────

export const POSTS_2: AdPost[] = [
  {
    id: "p21",
    template: "title",
    category: "edukacija",
    layout: "photoBg",
    photo: "ai1",
    palette: "ink",
    eyebrow: "AI",
    title: "AI neće zamijeniti Vaš posao",
    subtitle: "Ali će firma koja ga koristi zamijeniti onu koja ga ne koristi.",
    caption:
      "Ovo nije prijetnja — to je već stvarnost u Bosni.\n\n" +
      "Firme koje koriste AI za dosadne stvari (odgovaranje na ista pitanja, pisanje ponuda, prevode) imaju više vremena za ono što donosi novac.\n\n" +
      "AI ne odlučuje umjesto Vas. Ne prodaje umjesto Vas. Ne gradi odnose umjesto Vas.\n\n" +
      "Ali odgovori na 40 identičnih pitanja mjesečno? To može.\n\n" +
      "Pitanje nije „da li ću koristiti AI“ nego „za šta ću ga prvo koristiti“.",
    tags: ["ai", "umjetnainteligencija", "malibiznis", "automatizacija", "devforge"],
  },
  {
    id: "p22",
    template: "list",
    category: "edukacija",
    layout: "center",
    palette: "mint",
    eyebrow: "AI",
    title: "Gdje AI stvarno pomaže maloj firmi",
    items: ["Odgovara na ista pitanja", "Piše prve verzije tekstova", "Prepoznaje narudžbe iz poruka", "Prevodi na engleski i njemački"],
    slides: [
      { template: "list", eyebrow: "AI", title: "Gdje AI pomaže", items: ["Odgovara na ista pitanja", "Piše prve verzije tekstova", "Prepoznaje narudžbe iz poruka", "Prevodi tekstove"] },
      { template: "number", eyebrow: "Primjer", title: "istih pitanja svaki mjesec", value: "50x", valueNote: "Ista četiri pitanja, svaki put.", palette: "ink" },
      { template: "compare", eyebrow: "Prije / Poslije", title: "Isti upit, dva odgovora", items: ["Čekate do jutra", "Odgovara čovjek", "Neko zaboravi", "Kupac ode", "Odgovor u 5s", "Odgovara asistent", "Uvijek isto", "Kupac ostaje"], palette: "teal" },
      { template: "cta", eyebrow: "Prvi korak", title: "Počnite s jednim pitanjem.", subtitle: "Ne s deset. Samo ono koje dolazi najviše.", palette: "sun" },
    ],
    caption:
      "Nema potrebe za složenim rješenjima. Ovo su četiri stvari gdje AI odmah vraća novac:\n\n" +
      "1. Odgovaranje na pitanja — „imate li na stanju“, „koliko je dostava“, „radite li subotom“. Isto pitanje 50 puta sedmično.\n\n" +
      "2. Prve verzije tekstova — opisi proizvoda, objave, ponude. Vi doradite.\n\n" +
      "3. Narudžbe iz poruka — kada kupac pošalje „2x bijela majica L“, sistem to pretvori u narudžbu.\n\n" +
      "4. Prijevod — ako prodajete van BiH, to je ogromna ušteda.\n\n" +
      "Ništa od ovoga ne traži veliki budžet.",
    tags: ["ai", "automatizacija", "malibiznis", "edukacija", "produktivnost", "devforge"],
  },
  {
    id: "p23",
    template: "quote",
    category: "brend",
    layout: "stamp",
    palette: "dark",
    eyebrow: "Naš stav",
    title: "AI bez podataka o Vašoj firmi je samo pametan đak.",
    subtitle: "Zna sve općenito, ništa konkretno o Vama.",
    caption:
      "ChatGPT zna napisati tekst. Ali ne zna da Vi radite dostavu samo u Kantonu Sarajevo, da ne primate kartice, i da Vam je najveći kupac firma iz Zenice.\n\n" +
      "Zato AI asistent za firmu nije „spojite ChatGPT “. To je posao: prikupiti Vaše podatke, srediti ih, i dati modelu da odgovara SAMO iz njih.\n\n" +
      "Razlika je ogromna:\n" +
      "— bez podataka: izmišlja i halucinira\n" +
      "— s podacima: odgovori su tačni i provjerljivi\n\n" +
      "Prvi korak nije tehnologija. Prvi korak je Vaš cjenovnik i Vaša pravila.",
    tags: ["ai", "chatbot", "automatizacija", "brend", "devforge"],
  },
  {
    id: "p24",
    template: "list",
    category: "savjet",
    layout: "band",
    palette: "sun",
    eyebrow: "Savjet",
    title: "Kada AI NIJE rješenje",
    items: ["Kad imate 3 upita mjesečno", "Kad nemate sredjen cjenovnik", "Kad kupci traže razgovor", "Kad je proces sam po sebi loš"],
    caption:
      "Iskreno: AI nije za svakoga, i nije za svaki problem.\n\n" +
      "Ne isplati se ako:\n" +
      "— imate 3 upita mjesečno. Odgovorite sami, traje 2 minute.\n" +
      "— nemate sredjen cjenovnik. AI ne može odgovarati tačno ako ni Vi ne znate cijene.\n" +
      "— Vaši kupci traže razgovor s čovjekom (npr. ozbiljne usluge, visoke cijene).\n" +
      "— je Vaš proces loš. Automatizacija lošeg procesa daje brži loš proces.\n\n" +
      "Prvo sredite proces. Onda automatizujte.\n\n" +
      "Ako neko počne s tehnologijom, a nije pitao kako radite — bježite.",
    tags: ["ai", "savjeti", "kadafunkcionise", "malibiznis", "devforge"],
  },
  {
    id: "p25",
    template: "number",
    category: "dokaz",
    layout: "photo",
    photo: "ai1",
    palette: "teal",
    eyebrow: "Rezultat",
    title: "sati sedmično manje na istim odgovorima",
    value: "8h",
    valueNote: "Kod klijenta koji ima 60–80 upita sedmično.",
    caption:
      "Jedan klijent, 60–80 upita sedmično. Ista pitanja: cijena, dostava, na stanju, radno vrijeme.\n\n" +
      "Prije: dvije osobe po 4 sata sedmično samo na odgovaranje.\n" +
      "Poslije: AI asistent odgovara na 70% pitanja tačno. Ostatak proslijedi čovjeku.\n\n" +
      "Ušteda: oko 8 sati sedmično.\n\n" +
      "Ali evo šta je važnije od sati: kupci dobijaju odgovor u 5 sekundi, ne u 5 sati. To se vidi na konverziji.\n\n" +
      "Nije riječ o tome da otpustite ljude. Riječ je o tome da rade ono što AI ne može.",
    tags: ["ai", "rezultati", "usparada", "automatizacija", "devforge"],
  },
  {
    id: "p26",
    template: "process",
    category: "izakulisa",
    layout: "center",
    palette: "light",
    eyebrow: "Kako radimo",
    title: "Kako nastaje AI asistent",
    items: ["Popišemo Vaša pravila i cijene", "Povežemo s Vašim dokumentima", "Testiramo na 50 stvarnih pitanja", "Puštamo i mjerimo tačnost"],
    caption:
      "AI asistent se ne „uključi“. Pravi se u četiri koraka:\n\n" +
      "1. Popis — sjednemo i popišemo sve što mu treba znati: cjenovnik, dostava, radno vrijeme, šta ne radite, kako se ponašati kad ne znate odgovor.\n\n" +
      "2. Povezivanje — Vaši dokumenti, cjenovnik i pravila se ubace u sistem. Asistent odgovara SAMO iz toga.\n\n" +
      "3. Testiranje — postavimo mu 50 pitanja koja su Vam kupci stvarno slali. Gledamo gdje griješi.\n\n" +
      "4. Puštanje — mjerimo tačnost prve dvije sedmice. Šta promaši, popravljamo.\n\n" +
      "Bez koraka 3 nema smisla puštati u rad.",
    tags: ["ai", "proces", "chatbot", "izakulisa", "devforge"],
  },
  {
    id: "p27",
    template: "compare",
    category: "edukacija",
    layout: "band",
    palette: "ink",
    eyebrow: "Poređenje",
    title: "Chatbot star 10 godina vs. AI asistent",
    items: ["Samo dugmad", "Padne na svako drugo pitanje", "Kupac odustane", "Niko ga ne koristi", "Razumije slobodan tekst", "Odgovara iz Vaših podataka", "Rješava ili prosljeđuje", "Radi 24 sata"],
    caption:
      "Stari chatboti su bili drvo odluka: „Pritisnite 1 za cijene, 2 za dostavu“. Ljudi mrze to.\n\n" +
      "AI asistent razumije šta ste napisali, i ako ne zna, kaže „ne znam, evo kolege“ umjesto da izmišlja.\n\n" +
      "Ključna razlika: stari chatbot je tjerao kupca da uči kako sistem radi. Novi se prilagođava kupcu.\n\n" +
      "Zato je stopa korištenja drastično veća. Ljudi pišu kao što pišu prijatelju.\n\n" +
      "Ako imate chatbot na stranici koji niko ne koristi — znate zašto.",
    tags: ["ai", "chatbot", "poredjenje", "ux", "devforge"],
  },
  {
    id: "p28",
    template: "list",
    category: "edukacija",
    layout: "photoTop",
    photo: "code3",
    palette: "dark",
    eyebrow: "AI",
    title: "Šta AI asistent može zvati",
    items: ["Provjeri stanje u skladištu", "Kreiraj narudžbu", "Zakaži termin", "Proslijedi čovjeku"],
    caption:
      "Ovo je dio koji većina ne zna: AI asistent može raditi stvari, ne samo pričati.\n\n" +
      "Primjeri iz prakse:\n" +
      "— Kupac pita „imate li bijelu majicu L“. Asistent provjeri skladište i kaže tačno.\n" +
      "— Kupac napiše „2x majica, dostava u Travnik“. Asistent napravi narudžbu i pošalje potvrdu.\n" +
      "— Pacijent pita za termin. Asistent provjeri kalendar i zakaže.\n" +
      "— Nešto je komplikovano. Asistent prosljeđuje čovjeku s cijelim razgovorom.\n\n" +
      "To se zove „AI s alatima“ i to je razlika između igračke i alata.",
    tags: ["ai", "automatizacija", "integracija", "malibiznis", "devforge"],
  },
  {
    id: "p29",
    template: "number",
    category: "dokaz",
    layout: "offset",
    palette: "mint",
    eyebrow: "Podatak",
    title: "kupaca očekuje odgovor u prvih 5 minuta",
    value: "78%",
    valueNote: "A prosječna firma odgovori za 12 sati.",
    caption:
      "Istraživanja su konzistentna: ako kupac pita i ne dobije odgovor brzo, ide dalje. Ne čeka.\n\n" +
      "78% očekuje odgovor u prvih 5 minuta.\n" +
      "Prosječna firma u Bosni odgovori za 12 sati (ako odgovori).\n\n" +
      "To je ogromna praznina, i tu se gubi najviše novca.\n\n" +
      "Ne treba Vam 24/7 call centar. Treba Vam nešto što odgovori u 5 sekundi na 70% pitanja, i kaže „kolega će se javiti ujutro“ na ostalih 30%.\n\n" +
      "To je danas rješivo. Prije 3 godine nije bilo.",
    tags: ["ai", "podaci", "brzinoodgovora", "konverzija", "devforge"],
  },
  {
    id: "p30",
    template: "quote",
    category: "brend",
    layout: "split",
    palette: "sun",
    eyebrow: "Naš stav",
    title: "Automatizujte dosadu, ne odnose.",
    subtitle: "AI treba da preuzme ponavljanje — ne razgovor s kupcem.",
    caption:
      "Postoji pogrešna ideja da AI treba „voditi“ odnos s kupcem od početka do kraja.\n\n" +
      "Ne. Odnos je Vaš.\n\n" +
      "AI treba raditi ono što je dosadno i ponavlja se:\n" +
      "— „koliko je dostava“\n" +
      "— „radite li subotom“\n" +
      "— „imate li na stanju“\n" +
      "— „koji je IBAN“\n\n" +
      "A Vi radite ono što donosi novac: razgovor, ponuda, dogovor, rješavanje problema.\n\n" +
      "Firme koje pokušaju sve automatizovati izgube kupce. One koje automatizuju dosadu — dobiju vrijeme.",
    tags: ["ai", "brend", "automatizacija", "odnosi", "devforge"],
  },
  {
    id: "p31",
    template: "list",
    category: "savjet",
    layout: "center",
    palette: "teal",
    eyebrow: "Savjet",
    title: "Prije nego uvedete AI, uradite ovo",
    items: ["Napišite cjenovnik na jedno mjesto", "Popišite 20 najčešćih pitanja", "Odredite šta se NIKAD ne smije reći", "Odaberite ko provjerava odgovore"],
    caption:
      "AI projekti propadaju iz organizacijskih razloga, ne tehničkih.\n\n" +
      "Prije tehničkog dijela, uradite četiri stvari:\n\n" +
      "1. Cjenovnik na jednom mjestu. Ako je u tri Excel fajla i glavi, AI ne može raditi.\n" +
      "2. Dvadeset najčešćih pitanja, napisanih kako ih kupci stvarno pišu (s greškama, bez interpunkcije).\n" +
      "3. Šta se NIKAD ne smije reći — npr. ne obećavaj rokove, ne daj popust bez odobrenja.\n" +
      "4. Ko provjerava prve dvije sedmice. Svakodnevno, 10 minuta.\n\n" +
      "Ako ova četiri nisu riješena, tehnologija neće pomoći.",
    tags: ["ai", "savjeti", "priprema", "automatizacija", "malibiznis", "devforge"],
  },
  {
    id: "p32",
    template: "title",
    category: "edukacija",
    layout: "photo",
    photo: "phone1",
    palette: "light",
    eyebrow: "Edukacija",
    title: "Stranica i AI nisu dvije stvari",
    subtitle: "Jedno bez drugog radi na pola snage.",
    caption:
      "Često nas pitaju odvojeno: „treba mi stranica“ ili „treba mi AI asistent“.\n\n" +
      "A to je isti projekat.\n\n" +
      "AI asistent bez stranice nema gdje stajati. Stranica bez AI asistenta propušta upite noću, vikendom, dok ste na terenu.\n\n" +
      "Kad se rade zajedno:\n" +
      "— asistent zna šta piše na stranici\n" +
      "— stranica ima živi element koji odgovara odmah\n" +
      "— sve ide na jednu adresu i jedan sistem\n\n" +
      "Zato kod nas AI ide kao dio projekta stranice, ne kao odvojen proizvod.",
    tags: ["ai", "webstranica", "integracija", "edukacija", "devforge"],
  },
  {
    id: "p33",
    template: "list",
    category: "edukacija",
    layout: "band",
    palette: "mint",
    eyebrow: "AI",
    title: "AI recepcionar — šta to znači",
    items: ["Odgovara na pozive i poruke", "Zna Vaše cijene i termine", "Zakaže i potvrdi termin", "Proslijedi hitno čovjeku"],
    caption:
      "AI recepcionar je najkorisnija stvar za firme koje ne mogu stalno biti na telefonu.\n\n" +
      "Šta radi:\n" +
      "— prima pozive i poruke 24 sata\n" +
      "— zna Vaš cjenovnik, radno vrijeme i termine\n" +
      "— zakaže termin i pošalje potvrdu\n" +
      "— ako je nešto hitno ili komplikovano, proslijedi Vama s cijelim razgovorom\n\n" +
      "Šta NE radi: ne pregovara o cijeni, ne obećava što Vi niste odobrili, ne izmišlja.\n\n" +
      "Za frizerske, stomatološke, autoservise i slične — ovo je najveća ušteda.",
    tags: ["ai", "recepcionar", "automatizacija", "termini", "devforge"],
  },
  {
    id: "p34",
    template: "quote",
    category: "brend",
    layout: "stamp",
    palette: "ink",
    eyebrow: "Naš stav",
    title: "Svaki AI odgovor mora imati izvor.",
    subtitle: "Ako ne može pokazati odakle zna — ne vjerujemo mu.",
    caption:
      "AI modeli imaju naviku izmišljati. To se zove halucinacija i to je najveći rizik u poslu.\n\n" +
      "Zato u svakom asistentu kojeg napravimo vrijedi pravilo: odgovor mora doći iz Vašeg dokumenta.\n\n" +
      "Ako asistent kaže „dostava je 5 KM“, to mora biti u Vašem cjenovniku. Ako nije — mora reći „ne znam, provjerit ću“.\n\n" +
      "Lažno samouvjeren odgovor je gori od „ne znam“.\n\n" +
      "Kad birate dobavljača AI rješenja, pitajte: „šta se desi kad asistent ne zna odgovor?“\n\n" +
      "Ako odgovor nije jasan — nemojte potpisati.",
    tags: ["ai", "povjerenje", "brend", "kvalitet", "devforge"],
  },
  {
    id: "p35",
    template: "number",
    category: "dokaz",
    layout: "center",
    palette: "dark",
    eyebrow: "Podatak",
    title: "upita dolazi van radnog vremena",
    value: "41%",
    valueNote: "Večeri, vikendi, praznici.",
    caption:
      "Skoro polovina upita dolazi kad niko ne radi.\n\n" +
      "20:40 u srijedu. Subota ujutro. Nedjelja uveče kad ljudi gledaju telefone.\n\n" +
      "Ako tada nema odgovora:\n" +
      "— 78% njih ode konkurenciji\n" +
      "— ujutro odgovarate na prazan prostor\n\n" +
      "AI asistent ne mora biti savršen. Dovoljno je da u 20:40 kaže: „Dostava je 5 KM, dostupno odmah. Ostavite broj, javljamo se ujutro.“\n\n" +
      "To je upit koji bi inače bio izgubljen.\n\n" +
      "41% je velik broj da ga ignorišete.",
    tags: ["ai", "podaci", "vanradnogvremena", "konverzija", "devforge"],
  },
  {
    id: "p36",
    template: "process",
    category: "izakulisa",
    layout: "photoTop",
    photo: "desk1",
    palette: "teal",
    eyebrow: "Iza kulisa",
    title: "Kako testiramo AI asistenta",
    items: ["50 stvarnih pitanja kupaca", "Tražimo izmišljene odgovore", "Provjeravamo ton i pravila", "Mjerimo 2 sedmice uživo"],
    caption:
      "Testiranje je najvažniji dio, i najčešće preskočen.\n\n" +
      "Naš proces:\n\n" +
      "1. Uzmemo 50 stvarnih pitanja iz Vaših poruka — s greškama, skraćeno, kako ljudi pišu.\n" +
      "2. Pustimo asistenta kroz njih i tražimo gdje izmišlja. Svaki izmišljeni odgovor je greška.\n" +
      "3. Provjerimo ton — da ne zvuči kao robot i da nikad ne obećava ono što ne smije.\n" +
      "4. Prve dvije sedmice gledamo svaki razgovor. Popravljamo.\n\n" +
      "Nakon toga, asistent radi sam.\n\n" +
      "Bez koraka 2, pušten asistent izmišlja cijene. To se odmah vidi.",
    tags: ["ai", "testiranje", "izakulisa", "kvalitet", "devforge"],
  },
  {
    id: "p37",
    template: "list",
    category: "savjet",
    layout: "offset",
    palette: "sun",
    eyebrow: "Savjet",
    title: "Pitanja za dobavljača AI rješenja",
    items: ["Gdje se čuvaju naši podaci?", "Šta kad asistent ne zna?", "Koliko je mjesečno stvarno?", "Kako prekidamo saradnju?"],
    caption:
      "Prije nego potpišete bilo šta, pitajte ovo:\n\n" +
      "1. Gdje se čuvaju naši podaci i ko im ima pristup?\n" +
      "2. Šta asistent radi kad ne zna odgovor? (Ako kaže „snaći će se“ — bježite.)\n" +
      "3. Koliko je ukupno mjesečno — uključujući sve naknade, ne samo osnovnu cijenu?\n" +
      "4. Kako prekidamo saradnju i šta dobijamo na kraju? (Vaši podaci moraju biti Vaši.)\n\n" +
      "Dobra firma odgovori na sva četiri bez okolišanja.\n\n" +
      "Loša kaže „to je detalj, riješit ćemo“.\n\n" +
      "Uvijek tražite odgovore napismeno.",
    tags: ["ai", "savjeti", "dobavljaci", "ugovor", "devforge"],
  },
  {
    id: "p38",
    template: "quote",
    category: "brend",
    layout: "center",
    palette: "mint",
    eyebrow: "Naš stav",
    title: "AI je alat. Ne strategija.",
    subtitle: "Firma bez plana s AI-jem je samo firma bez plana.",
    caption:
      "Tehnologija ne rješava loš poslovni model.\n\n" +
      "Ako ne znate ko je Vaš kupac, AI neće to otkriti.\n" +
      "Ako je cijena pogrešna, AI neće to popraviti.\n" +
      "Ako Vam proces traje 5 dana, automatizacija traje 4.\n\n" +
      "AI ubrzava ono što već radite. Dobro ili loše.\n\n" +
      "Zato prije svakog AI projekta pitamo ista tri pitanja koja pitamo za stranicu:\n" +
      "— Ko je kupac?\n" +
      "— Šta ga sprječava da kupi?\n" +
      "— Šta mjerimo?\n\n" +
      "Ako na ova tri nema odgovora, tehnologija je odgađanje.",
    tags: ["ai", "strategija", "brend", "poslovanje", "devforge"],
  },
  {
    id: "p39",
    template: "list",
    category: "edukacija",
    layout: "band",
    palette: "light",
    eyebrow: "AI",
    title: "Koliko AI stvarno košta",
    items: ["Nema velikog početnog troška", "Mjesečno kao jedan zaposleni na sat", "Cijena raste s brojem razgovora", "Skupo je samo ako se ne koristi"],
    caption:
      "Transparentno, bez okolišanja:\n\n" +
      "AI asistent ne traži veliki početni trošak kao nekad softver. Nema licenci, nema servera u Vašoj kancelariji.\n\n" +
      "Mjesečno: obično manje od jednog sata rada zaposlenog. Zavisno od broja razgovora.\n\n" +
      "Cijena raste s količinom — više razgovora, više troška. Ali i više posla.\n\n" +
      "Skupo je samo kad ga niko ne koristi. Zato se mjeri: koliko razgovora, koliko riješeno bez čovjeka, koliko upita pretvoreno u posao.\n\n" +
      "Ako ta tri broja ne rastu u prvom mjesecu — nešto je pogrešno postavljeno.",
    tags: ["ai", "cijena", "transparentnost", "malibiznis", "devforge"],
  },
  {
    id: "p40",
    template: "title",
    category: "edukacija",
    layout: "photoBg",
    photo: "code2",
    palette: "ink",
    eyebrow: "AI",
    title: "Počnite s jednim pitanjem, ne s deset",
    subtitle: "Najčešća greška je preveliki prvi projekat.",
    caption:
      "Firme često krenu s planom: „automatizovat ćemo sve — pozive, poruke, narudžbe, račune, marketing“.\n\n" +
      "To propadne u 3 sedmice.\n\n" +
      "Šta radi: uzmete JEDNO pitanje koje Vam dolazi najviše puta. Samo to.\n\n" +
      "Primjer: „imate li na stanju“. Automatizujete samo to. Mjerite dvije sedmice. Ako radi — dodate sljedeće.\n\n" +
      "Za mjesec dana imate 5 automatizovanih stvari koje stvarno rade, umjesto 10 koje su „u izradi“.\n\n" +
      "Malo, ali završeno. To je pravilo.",
    tags: ["ai", "savjeti", "pocetak", "automatizacija", "devforge"],
  },
];
