// ───────────────────────────────────────────────────────────────────────────
// OBJAVE 21–40 — EDUKACIJA, AI I DOKAZ
// Druga trecina: pozicioniranje kao strucnjak + AI kao najjaci adut.
// ───────────────────────────────────────────────────────────────────────────

import type { AdPost } from "./postsData";

export const POSTS_2: AdPost[] = [
  {
    id: "p21",
    template: "title",
    category: "edukacija",
    palette: "dark",
    eyebrow: "AI",
    title: "AI nije budućnost. AI je danas.",
    subtitle: "I već prima Vaše telefonske pozive.",
    caption:
      "AI nije nešto što dolazi 2030. Radi već sada — i to za male firme.\n\n" +
      "Zamislite: neko pozove Vaš broj u 22h, u nedjelju. Niko se ne javlja jer ste zatvorili.\n\n" +
      "AI recepcionar se javi. Razgovara prirodnim glasom. Odgovori na pitanja o uslugama, cijenama, radnom vremenu. Primi narudžbu, zakaže termin. Ujutro Vi dobijete transkript.\n\n" +
      "Bez propuštenog poziva.\n" +
      "Bez izgubljene mušterije.\n\n" +
      "DM da vidite kako radi.",
    tags: ["ai", "aisistemi", "automatizacija", "sarajevo", "bosna", "malibiznis", "devforge"],
  },
  {
    id: "p22",
    template: "list",
    category: "ponuda",
    palette: "light",
    eyebrow: "AI paketi",
    title: "Pet AI sistema, po težini",
    items: ["AI Chat — asistent na sajtu", "AI Chat Plus — baza znanja", "AI Recepcionar — prima pozive", "AI Narudžbe — narudžbe i termini", "AI Complete — sve + aplikacija"],
    caption:
      "Pet AI sistema — od najjednostavnijeg do najkompleksnijeg.\n\n" +
      "1️⃣ AI Chat\n" +
      "Chat asistent na sajtu. Odgovara na pitanja o uslugama i cijenama.\n\n" +
      "2️⃣ AI Chat Plus\n" +
      "Isto + baza znanja, prepoznavanje namjere, dva jezika.\n\n" +
      "3️⃣ AI Recepcionar\n" +
      "Prima telefonske pozive 24/7. Prirodan glas, transkript, preusmjeravanje.\n\n" +
      "4️⃣ AI Narudžbe\n" +
      "Isto + automatske narudžbe, kalendar, SMS/email potvrde.\n\n" +
      "5️⃣ AI Complete\n" +
      "Sve + web i mobilna aplikacija, AI analitika, CRM integracije.\n\n" +
      "Svi po dogovoru. DM za koji Vas zanima.",
    tags: ["ai", "aipaketi", "aisistemi", "automatizacija", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p23",
    template: "number",
    category: "dokaz",
    palette: "teal",
    eyebrow: "AI",
    title: "svaki dan — svaki sat",
    value: "24/7",
    valueNote: "AI recepcionar ne spava",
    caption:
      "AI recepcionar radi 24 sata, 7 dana u sedmici, 365 dana u godini.\n\n" +
      "Bez pauze za kafu. Bez godišnjeg odmora. Bez „javit ću se sutra”.\n\n" +
      "Poziv u 3 ujutro? Javi se.\n" +
      "Poziv u nedjelju? Javi se.\n" +
      "Poziv dok ste na sastanku? Javi se.\n\n" +
      "Prirodnim glasom, na Vašem jeziku. Odgovara na pitanja, prima narudžbe, zakazuje termine. Ako nešto ne zna — preusmjeri na Vas.\n\n" +
      "Ujutro uključite transkripte i vidite sve što se dogodilo.\n\n" +
      "DM za demo.",
    tags: ["ai", "airecepcionar", "24/7", "automatizacija", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p24",
    template: "compare",
    category: "edukacija",
    palette: "dark",
    eyebrow: "AI",
    title: "Šta AI može, a šta ne",
    items: ["Zaboravi da postoji poziv", "Niko se ne javi van radnog vremena", "Mušterija ode konkurenciji", "Vi saznate tek sutra", "Javi se u svakom trenutku", "Odgovori na sva pitanja", "Zakaže termin ili narudžbu", "Vi dobijete transkript"],
    caption:
      "Da ne bude previše obećanja — evo iskreno.\n\n" +
      "BEZ AI:\n" +
      "✕ Propustite poziv van radnog vremena\n" +
      "✕ Niko se ne javi dok ste zauzeti\n" +
      "✕ Mušterija ode konkurenciji\n" +
      "✕ Saznate tek sljedeći dan\n\n" +
      "SA AI:\n" +
      "✓ Javi se u svakom trenutku\n" +
      "✓ Odgovori na uobičajena pitanja\n" +
      "✓ Zakaže termin ili primi narudžbu\n" +
      "✓ Vi dobijete transkript\n\n" +
      "Šta AI NE može: donijeti odluku umjesto Vas, pregovarati o velikom poslu, riješiti reklamaciju. Za to se preusmjerava na Vas.\n\n" +
      "AI radi prvi kontakt. Vi radite posao.",
    tags: ["ai", "automatizacija", "iskrenost", "sarajevo", "bosna", "malibiznis", "devforge"],
  },
  {
    id: "p25",
    template: "process",
    category: "sadrzaj",
    palette: "light",
    eyebrow: "Kako radi AI",
    title: "Od poziva do transkripta",
    items: ["Mušterija pozove Vaš broj", "AI se javi prirodnim glasom", "Odgovori, zakaže ili preusmjeri", "Vi ujutro čitate transkript"],
    caption:
      "Kako AI recepcionar stvarno radi — korak po korak.\n\n" +
      "1. Mušterija pozove\n" +
      "Vaš postojeći broj. Ništa se ne mijenja za mušteriju.\n\n" +
      "2. AI se javi\n" +
      "Prirodnim glasom, na Vašem jeziku. „Dobar dan, firma X, kako mogu pomoći?”\n\n" +
      "3. Razgovara\n" +
      "Odgovara na pitanja o uslugama i cijenama. Prima narudžbu. Zakaže termin. Ako treba čovjek — preusmjeri na Vas.\n\n" +
      "4. Vi čitate transkript\n" +
      "Svaki razgovor se snima i prevodi u tekst. Ujutro vidite ko je zvao i šta je tražio.\n\n" +
      "DM da vidite demo.",
    tags: ["ai", "airecepcionar", "kakoradi", "automatizacija", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p26",
    template: "quote",
    category: "brend",
    palette: "dark",
    eyebrow: "AI",
    title: "AI ne zamjenjuje ljude. Zamjenjuje propuštene pozive.",
    subtitle: "To je razlika.",
    caption:
      "Najčešća reakcija na AI: „Znači hoćete da me zamijenite?”\n\n" +
      "Ne. AI ne sjedi na Vaše mjesto. AI sjedi na telefonu dok Vi radite.\n\n" +
      "Zamjenjuje ono što inače nemate:\n" +
      "→ propuštene pozive\n" +
      "→ odgovore van radnog vremena\n" +
      "→ čekanje da se sjetite ko je zvao\n\n" +
      "Vi i dalje razgovarate s mušterijama. Samo više ne propuštate one koji zovu u 21h.\n\n" +
      "DM.",
    tags: ["ai", "aisistemi", "automatizacija", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p27",
    template: "price",
    category: "ponuda",
    palette: "teal",
    eyebrow: "AI model",
    title: "AI sistemi",
    value: "Po dogovoru",
    items: ["Izrada po obimu posla", "Mjesečna naknada za AI", "Bez naše marže na resurse", "Cijena zavisi od broja razgovora"],
    caption:
      "Iskreno o cijeni AI sistema — jer mnogi to izbjegavaju.\n\n" +
      "AI sistem se plaća u dva dijela:\n\n" +
      "1. Izrada\n" +
      "Zavisi od obima — koliko pitanja pokriva, koliko integracija, da li ima aplikaciju.\n\n" +
      "2. Mjesečna naknada\n" +
      "AI modeli troše resurse svaki put kad razgovaraju s mušterijom. To su stvarni troškovi — ne naša marža.\n\n" +
      "Telefon, hosting i AI potrošnju plaćate direktno provideru.\n\n" +
      "Zato ne stavljamo fiksnu cijenu — jer svaki sistem je drugačiji.\n\n" +
      "DM za procjenu za Vaš slučaj.",
    tags: ["ai", "cijene", "aisistemi", "transparentnost", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p28",
    template: "number",
    category: "edukacija",
    palette: "light",
    eyebrow: "AI",
    title: "AI sistema je u upotrebi",
    value: "5",
    valueNote: "od chata do cijelog sistema",
    caption:
      "Pet nivoa AI sistema — koliko Vam stvarno treba?\n\n" +
      "1. AI Chat — imate sajt i želite da odgovara na pitanja\n" +
      "2. AI Chat Plus — imate puno upita i želite bazu znanja\n" +
      "3. AI Recepcionar — propuštate pozive\n" +
      "4. AI Narudžbe — primate narudžbe i termine telefonom\n" +
      "5. AI Complete — želite sve + aplikaciju\n\n" +
      "Većina malih firmi stane na 1 ili 3. Ne treba Vam najveći paket — treba Vam onaj koji rješava Vaš problem.\n\n" +
      "DM pa ćemo vidjeti šta ima smisla za Vas.",
    tags: ["ai", "aipaketi", "sarajevo", "bosna", "malibiznis", "devforge"],
  },
  {
    id: "p29",
    template: "list",
    category: "edukacija",
    palette: "dark",
    eyebrow: "AI",
    title: "Ko stvarno treba AI?",
    items: ["Firme koje propuštaju pozive", "Saloni i ordinacije s terminima", "Restorani s narudžbama", "Servisi koji primaju prijave", "Trgovine s čestim pitanjima"],
    caption:
      "AI nije za svakoga. Evo ko stvarno ima koristi:\n\n" +
      "✓ Firme koje propuštaju pozive\n" +
      "Ako Vam telefon zvoni dok radite — AI to rješava.\n\n" +
      "✓ Saloni i ordinacije\n" +
      "AI zakaže termin dok ste u stolici ili s pacijentom.\n\n" +
      "✓ Restorani i dostava\n" +
      "Prima narudžbe telefonom bez prekida rada.\n\n" +
      "✓ Servisi\n" +
      "Primi prijavu kvara i zabilježi adresu.\n\n" +
      "✓ Trgovine s ponavljajućim pitanjima\n" +
      "„Imate li na stanju?”, „Koliko košta dostava?” — AI odgovara.\n\n" +
      "Ako ste frizer koji radi samo po preporuci i ima pun raspored — ne treba Vam.\n\n" +
      "DM pa procijenimo.",
    tags: ["ai", "malibiznis", "automatizacija", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p30",
    template: "title",
    category: "dokaz",
    palette: "teal",
    eyebrow: "Projekat",
    title: "Recello — AI koji prima pozive u UK.",
    subtitle: "Naš AI sistem u stvarnoj upotrebi.",
    caption:
      "Recello je naš AI sistem napravljen za tržište Ujedinjenog Kraljevstva.\n\n" +
      "AI telefonska recepcionarka koja prima pozive, razgovara prirodnim glasom i obrađuje upite — bez ljudskog operatera.\n\n" +
      "Zašto ovo pokazujemo:\n" +
      "Ne pričamo o AI-u teoretski. Napravili smo ga, objavili i radi.\n\n" +
      "Isti sistem možemo prilagoditi Vašoj firmi — na bosanskom, s Vašim uslugama i cijenama.\n\n" +
      "recello.co.uk\n\n" +
      "DM ako želite nešto slično.",
    tags: ["ai", "airecepcionar", "recello", "portfolio", "uk", "sarajevo", "devforge"],
  },
  {
    id: "p31",
    template: "list",
    category: "ponuda",
    palette: "light",
    eyebrow: "Usluge",
    title: "Web shop — šta sve dobijate",
    items: ["Katalog proizvoda i kategorije", "Korpa i checkout", "Plaćanje karticom ili pouzećem", "Upravljanje narudžbama", "Integracija dostave", "Sve iz web stranice"],
    caption:
      "Web shop nije „stranica s proizvodima”. Evo šta stvarno ulazi:\n\n" +
      "✓ Katalog s kategorijama i varijacijama\n" +
      "Veličine, boje, stanje na lageru.\n\n" +
      "✓ Korpa i checkout\n" +
      "Bez komplikacija — kupac završi u tri klika.\n\n" +
      "✓ Plaćanje\n" +
      "Kartica ili pouzećem.\n\n" +
      "✓ Upravljanje narudžbama\n" +
      "Vidite sve narudžbe, mijenjate status.\n\n" +
      "✓ Integracija dostave\n" +
      "Cijena dostave se obračunava automatski.\n\n" +
      "✓ Sve iz web stranice\n" +
      "Dizajn, mobilna verzija, SEO.\n\n" +
      "Od 600 KM. DM.",
    tags: ["webshop", "ecommerce", "onlineshop", "sarajevo", "bosna", "prodaja", "devforge"],
  },
  {
    id: "p32",
    template: "quote",
    category: "edukacija",
    palette: "dark",
    eyebrow: "Savjet",
    title: "Ako morate zumirati da pročitate svoj sajt — imate problem.",
    subtitle: "Otvorite ga na telefonu. Sad. Mi ćemo čekati.",
    caption:
      "Test koji traje 10 sekundi:\n\n" +
      "Otvori svoj sajt na telefonu.\n\n" +
      "Da li moraš zumirati da pročitaš tekst?\n" +
      "Da li se dugmad preklapaju?\n" +
      "Da li moraš skrolati vodoravno?\n" +
      "Da li se slika razvukla?\n\n" +
      "Ako je i jedan odgovor „da” — gubiš mušterije svaki dan.\n\n" +
      "Više od 70% ljudi dolazi s telefona. Ako je iskustvo loše, odu prije nego što pročitaju prvu rečenicu.\n\n" +
      "Pošalji nam link. Reći ćemo ti besplatno šta ne valja.\n\n" +
      "DM.",
    tags: ["mobitelt", "webdizajn", "savjeti", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p33",
    template: "process",
    category: "sadrzaj",
    palette: "teal",
    eyebrow: "Razvoj",
    title: "Kako teče izrada",
    items: ["Dizajn i Vaše odobrenje", "Programiranje po odobrenom dizajnu", "Testiranje na svim uređajima", "Objava i predaja"],
    caption:
      "Transparentno o tome šta se dešava nakon što odobrite besplatnu verziju.\n\n" +
      "1. Dizajn i odobrenje\n" +
      "Dotjerujemo dizajn dok ne bude tačno kako želite.\n\n" +
      "2. Programiranje\n" +
      "Kod se piše po odobrenom dizajnu — bez iznenađenja.\n\n" +
      "3. Testiranje\n" +
      "Mobitel, tablet, desktop, različiti browseri. Sve mora raditi.\n\n" +
      "4. Objava\n" +
      "Postavljamo na hosting, povezujemo domenu, predajemo Vam pristup.\n\n" +
      "Nakon toga — stranica je Vaša.\n\n" +
      "DM.",
    tags: ["proces", "webdizajn", "razvoj", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p34",
    template: "number",
    category: "edukacija",
    palette: "light",
    eyebrow: "Brzina",
    title: "sekunde — nakon toga odustaju",
    value: "3",
    valueNote: "prosječno strpljenje posjetioca",
    caption:
      "Tri sekunde. Toliko prosječan posjetilac čeka da se stranica učita.\n\n" +
      "Nakon toga zatvara tab.\n\n" +
      "Šta usporava stranicu:\n" +
      "• Prevelike slike (neoptimizirane)\n" +
      "• Previše dodataka i skripti\n" +
      "• Loš hosting\n" +
      "• Nedostatak keširanja\n\n" +
      "Zato kod nas brzina nije „kasnije ćemo”. Radi se u startu — slike se optimizuju, kod se ne trpa bez potrebe.\n\n" +
      "Testiraj svoj sajt: PageSpeed Insights.\n\n" +
      "Ako je crveno — DM.",
    tags: ["brzina", "webdizajn", "seo", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p35",
    template: "compare",
    category: "edukacija",
    palette: "dark",
    eyebrow: "Razlika",
    title: "Šablon ili custom dizajn",
    items: ["Svi izgledaju isto", "Teško se prilagođava", "Sporo zbog dodataka", "Niko ne zna popraviti", "Izgleda kao Vaša firma", "Prilagođeno tačno Vama", "Brzo — samo što treba", "Čist kod, lako održavanje"],
    caption:
      "Šablon vs custom — bez marketinga, evo stvarne razlike.\n\n" +
      "ŠABLON:\n" +
      "✕ Svi izgledaju isto\n" +
      "✕ Teško se prilagođava\n" +
      "✕ Sporo zbog gomile dodataka\n" +
      "✕ Niko ne zna popraviti kad pukne\n\n" +
      "CUSTOM:\n" +
      "✓ Izgleda kao Vaša firma\n" +
      "✓ Prilagođeno tačno Vama\n" +
      "✓ Brzo — samo što treba\n" +
      "✓ Čist kod, lako održavanje\n\n" +
      "Da, šablon je jeftiniji u startu. Ali kad treba izmjena, custom je uvijek isplativiji.\n\n" +
      "DM.",
    tags: ["webdizajn", "customdesign", "sarajevo", "bosna", "malibiznis", "devforge"],
  },
  {
    id: "p36",
    template: "quote",
    category: "brend",
    palette: "dark",
    eyebrow: "Naš pristup",
    title: "Cijena ne zavisi od toga koliko dugo radimo — nego šta dobijate.",
    subtitle: "Zato je uvijek znate unaprijed.",
    caption:
      "Ponekad nam kažu: „A zašto toliko, pa brzo je gotovo?”\n\n" +
      "Zato što cijena ne mjeri našo vrijeme. Mjeri vrijednost koju dobijate.\n\n" +
      "Godinama smo gradili sistem koji radi brzo. To je naša prednost, ne razlog za popust.\n\n" +
      "Ono što je bitno: cijenu znate PRIJE nego što počnemo. Nema „javimo se s ponudom”. Nema iznenađenja na kraju.\n\n" +
      "Web stranica od 150 KM. Shop od 600. To je to.\n\n" +
      "DM.",
    tags: ["cijene", "transparentnost", "webdizajn", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p37",
    template: "list",
    category: "dokaz",
    palette: "teal",
    eyebrow: "Portfolio",
    title: "Naši radovi",
    items: ["Elesonic — web shop elektronike", "MyIcon — custom ikone", "Sarajevo Visit — turizam", "Recello — AI recepcionar (UK)", "Game Launcher — desktop aplikacija"],
    caption:
      "Nekoliko radova iz portfolija — sve objavljeno i u upotrebi.\n\n" +
      "🛒 Elesonic\n" +
      "Web shop elektronike i tehničke opreme.\n\n" +
      "🎨 MyIcon\n" +
      "Stranica za custom ikone.\n\n" +
      "🏛️ Sarajevo Visit\n" +
      "Turistička prezentacija grada.\n\n" +
      "🤖 Recello\n" +
      "AI telefonska recepcionarka za UK tržište.\n\n" +
      "🎮 Game Launcher\n" +
      "Desktop aplikacija za pokretanje igara.\n\n" +
      "Sve na → /projekti\n\n" +
      "DM ako želite nešto slično.",
    tags: ["portfolio", "radovi", "webdizajn", "ai", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p38",
    template: "title",
    category: "edukacija",
    palette: "light",
    eyebrow: "SEO",
    title: "SEO nije magija. To je osnova koju svi preskaču.",
    subtitle: "Naslov, opis, brzina, mobitel. To je 80%.",
    caption:
      "Nećemo Vam prodavati „SEO za 500 KM mjesečno”. Evo šta stvarno treba.\n\n" +
      "1. Meta naslov\n" +
      "Onaj plavi tekst u Google rezultatima. Bez njega Google izmišlja sam.\n\n" +
      "2. Meta opis\n" +
      "Dvije rečenice koje tjeraju ljude da kliknu.\n\n" +
      "3. Brzina\n" +
      "Spora stranica pada u rezultatima.\n\n" +
      "4. Mobilna verzija\n" +
      "Google indeksira mobilnu verziju prvo.\n\n" +
      "5. Struktura naslova\n" +
      "Jedan H1, logični H2.\n\n" +
      "Sve pet je kod nas uključeno u osnovnu cijenu. Bez doplate, bez mjesečne rente.\n\n" +
      "DM.",
    tags: ["seo", "webdizajn", "google", "sarajevo", "bosna", "malibiznis", "devforge"],
  },
  {
    id: "p39",
    template: "number",
    category: "dokaz",
    palette: "dark",
    eyebrow: "Zadovoljstvo",
    title: "KM predujma",
    value: "0",
    valueNote: "prva verzija je uvijek besplatna",
    caption:
      "Nula. Toliko predujma tražimo.\n\n" +
      "Znamo da zvuči čudno. Većina traži 50% unaprijed, pa se poslije natežete.\n\n" +
      "Mi radimo obrnuto — prvo napravimo, pa pokažemo, pa tek onda naplatimo.\n\n" +
      "Zašto? Zato što smo sigurni u svoj rad. I zato što znamo koliko ljudi ima loše iskustvo s „plati pa vidi”.\n\n" +
      "Bez predujma.\n" +
      "Bez rizika.\n\n" +
      "DM.",
    tags: ["bezpredujma", "besplatno", "povjerenje", "sarajevo", "bosna", "devforge"],
  },
  {
    id: "p40",
    template: "cta",
    category: "ponuda",
    palette: "teal",
    eyebrow: "Krenimo",
    title: "Recite nam čime se bavite.",
    subtitle: "Vaša stranica je gotova za par dana — besplatno.",
    caption:
      "Jedna poruka je dovoljna da počnemo.\n\n" +
      "Napišite nam:\n" +
      "• Čime se bavite\n" +
      "• Kako se firma zove\n" +
      "• Da li imate logo ili boje\n\n" +
      "To je sve. Ostalo radimo mi.\n\n" +
      "U 2–5 dana dobijate link na radnu stranicu. Otvorite je, pogledajte, recite šta mijenjati.\n\n" +
      "Bez predujma. Bez ugovora. Bez rizika.\n\n" +
      "DM, Viber ili WhatsApp — kako Vam je lakše.",
    tags: ["besplatno", "webdizajn", "krenimo", "sarajevo", "bosna", "malibiznis", "devforge"],
  },
];
