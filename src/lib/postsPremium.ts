// ───────────────────────────────────────────────────────────────────────────
// PREMIUM OBJAVA — jedna, posebna, namjerno drugačija od svih ostalih.
//
// Ovo nije dio serije od 60 objava. To je oglas: sve što bi kupac platio da
// vidi, na jednoj slici. Koristi layout "premium" (vlastiti ram, tipografija i
// hijerarhija — vidi `premiumLayout` u postRender.ts), a ne standardne sablone.
//
// SVI PODACI SU STVARNI, preuzeti sa sajta (src/App.tsx):
//   pricing          → 150 KM web stranice, 600 KM shopovi
//   deliverables     → UI/UX uključen, responzivno, demo se ne plaća, 4 revizije
//   comparison       → bez plaćanja unaprijed, gotova verzija za 5 radnih dana
//   milestones       → 20+ isporučenih projekata
// Ništa izmišljeno: nema izmišljenih brojeva ni lažnih garancija.
// ───────────────────────────────────────────────────────────────────────────

import type { AdPost } from "./postsData";

export const POST_PREMIUM: AdPost = {
  id: "px01",
  template: "title",
  category: "ponuda",
  layout: "premium",
  palette: "dark",
  photo: "ai",
  eyebrow: "Premium ponuda",
  kicker: "Ideja danas — stranica za 5 dana",
  title: "Vaš biznis online. Za 5 dana. Bez plaćanja unaprijed.",
  lead: "Prvo vidite gotov rezultat pa platite. Ne svidi li se, ne plaćate ništa i nemate nikakvu obavezu.",
  site: "www.devlab.cc.cd",
  stats: [
    { value: "0 KM", label: "unaprijed", icon: "shield" },
    { value: "5 dana", label: "gotova verzija", icon: "clock" },
    { value: "150 KM", label: "web od", icon: "coin" },
    { value: "4", label: "revizije", icon: "layers" },
  ],
  features: [
    { icon: "web", label: "Web stranice" },
    { icon: "shop", label: "Web shopovi" },
    { icon: "app", label: "Aplikacije" },
    { icon: "game", label: "2D igrice" },
    { icon: "ai", label: "AI sistemi" },
  ],
  terms: [
    "Gotova verzija za 5 dana — ne za 5 sedmica",
    "Web stranice od 150 KM, shopovi od 600 KM",
    "Sav sadržaj sajta mijenjate sami, u par klikova",
  ],
  cta: "Javite nam se na Instagramu",
  caption:
    "💎 Stranica gotova za 5 dana. Bez plaćanja unaprijed.\n" +
    "\uD83C\uDF0D www.devlab.cc.cd\n" +
    "\n" +
    "Većina traži 30–50% unaprijed, pa tek onda pokaže nešto. Mi radimo obrnuto: prvo napravimo gotovu verziju, vi je vidite, i plaćate tek ako ste zadovoljni.\n" +
    "\n" +
    "Zvuči previše dobro? Zato evo tačno šta dobijate i koliko košta.\n" +
    "\n" +
    "ŠTA RADIMO\n" +
    "— 🌐 Web stranice — landing i korporativne, od 150 KM\n" +
    "— 🛒 Web shopovi — korpa, online plaćanje i tabla za upravljanje proizvodima, od 600 KM\n" +
    "— 📱 Mobilne aplikacije — iOS i Android, po dogovoru\n" +
    "— 🎮 2D igrice — za web i mobilne, po dogovoru\n" +
    "— 🤖 AI sistemi — AI chat i recepcionar koji rade 24/7\n" +
    "\n" +
    "ŠTA JE UKLJUČENO U CIJENU\n" +
    "✅ Dizajn i izrada — sve radimo mi, vi ne tražite nikoga\n" +
    "✅ Admin panel — vaša kontrolna tabla, posebna stranica uz sajt zaštićena lozinkom.\n   U njoj UREĐUJETE SAV SADRŽAJ SVOJE STRANICE — sami, bez programera.\n   Radi kao Facebook: prijavite se, kliknete, promijenite. Ne gledate kod,\n   ne instalirate ništa i ne učite ništa novo.\n   Konkretno, uređujete:\n   · tekstove — naslove, opise usluga, cijeli sadržaj stranice\n   · cijene — promijenite broj i odmah se vidi na sajtu\n   · slike i fotografije — zamijenite ih kad vam dosade\n   · proizvode u shopu — dodate novi, uredite opis i cijenu\n   · kontakt podatke — telefon, adresu, radno vrijeme\n   · vijesti i objave — pišete novo bez da nas zovete\n   Sve u par klikova, u par minuta — bez poziva nama i bez dodatnog troška.\n" +
    "✅ 4 revizije dizajna — dok ne bude kako treba\n" +
    "✅ Hosting i domena — podesimo za vas\n" +
    "✅ Sve ostaje vaše — stranica, domena i pristupi na vaše ime\n" +
    "\n" +
    "KAKO FUNKCIONIŠE\n" +
    "1️⃣ Javite nam se na Instagram DM — recite čime se bavite.\n" +
    "2️⃣ Za par sati dobijate plan i cijenu — bez sitnih slova.\n" +
    "3️⃣ Za 5 dana gledate gotovu stranicu na svom linku.\n" +
    "4️⃣ Ako vam se svidi — plaćate. Ako ne — ne plaćate ništa.\n" +
    "\n" +
    "ZAŠTO JE JEFTINIJE\n" +
    "Radimo bez kancelarija, menadžera i prodajnih timova. Ne plaćate njihov najam ni sastanke — plaćate samo izradu. Zato je do 60% jeftinije od agencija, uz isti kvalitet.\n" +
    "\n" +
    "ZA KOGA RADIMO\n" +
    "— 🥇 Male firme koje još nemaju stranicu\n" +
    "— 🥈 Firme koje imaju zastarjelu stranicu koja ne prodaje\n" +
    "— 🥉 Oni koji su već platili agenciji i ostali bez rezultata\n" +
    "\n" +
    "CIJENE\n" +
    "— Web stranice: od 150 KM\n" +
    "— Web shopovi: od 600 KM\n" +
    "— Aplikacije, igrice, AI: po dogovoru\n" +
    "\n" +
    "👉 JAVITE NAM SE NA INSTAGRAM DM\n" +
    "Dovoljna je jedna rečenica: čime se bavite.\n" +
    "Odgovaramo u roku od 10 minuta.\n" +
    "\n" +
    "🌐 www.devlab.cc.cd\n" +
    "📧 kontakt@devlab.cc.cd\n" +
    "📱 +387 62 576 456\n" +
    "📸 @devlab.cc.cd\n" +
    "\n" +
    "—\n" +
    "Dev Lab · Sarajevo · cijela BiH\n" +
    "Web stranice · Shopovi · Aplikacije · Igrice · AI\n" +
    "\n" +
    "🔎 Tražite izradu web stranice, web shopa ili aplikacije u Sarajevu? Dev Lab radi stranice za male firme, obrte i freelancere u cijeloj Bosni i Hercegovini — Sarajevo, Tuzla, Zenica, Mostar, Banja Luka, Bihać.\n" +
    "Web dizajn, izrada sajta, online shop, mobilne aplikacije i 2D igrice. Cijena web stranice od 150 KM, web shopa od 600 KM.\n" +
    "Bez plaćanja unaprijed — prvo vidite gotovu verziju.\n" +
    "\n" +
    "#izradastranica #izradasajta #webdizajn #websajt #webshop #onlineshop #sarajevo #bosnaihercegovina #bih #tuzla #zenica #mostar #banjaluka\n" +
    "#malafirma #preduzetnik #obrt #digitalnimarketing #devlab #webstranica #aplikacije #aiautomatizacija #2digrice #freelancerbih #agencijabih #posaobih\n",
  tags: [
    "premium",
    "bezplacanjaunaprijed",
    "webdizajn",
    "webshop",
    "aplikacije",
    "aisistemi",
    "sarajevo",
    "devlab",
    "izradastranica",
    "izradasajta",
    "websajt",
    "onlineshop",
    "bosnaihercegovina",
    "malafirma",
    "preduzetnik",
    "webstranica",
    "freelancerbih",
    "posaobih",
  ],
};

// ───────────────────────────────────────────────────────────────────────────
// FACEBOOK COVER — naslovna fotografija za FB stranicu.
//
// Nije Instagram objava: 16:9 format (1200x628) i `fixedFormat`, pa se na
// /objave uvijek renderuje u tom formatu bez obzira na prekidac 1:1 / 3:4.
// Skida se istim dugmetom kao i sve ostale objave.
//
// Sadrzaj je namjerno kratak: cover se gleda 2 sekunde i mora reci tri
// stvari — ko smo, sta radimo, koliko kosta. Nema karusela i nema mreze.
// ───────────────────────────────────────────────────────────────────────────
export const POST_FB_COVER: AdPost = {
  id: "fbc01",
  template: "title",
  category: "brend",
  layout: "cover16x9",
  palette: "dark",
  photo: "ai",
  fixedFormat: "16:9",
  eyebrow: "DevLab",
  title: "Web stranice. Za 5 dana. Bez plaćanja unaprijed.",
  lead: "Stranice, shopovi, aplikacije i AI sistemi — iz Sarajeva, za firme iz cijele BiH.",
  site: "www.devlab.cc.cd",
  stats: [
    { value: "0 KM", label: "unaprijed", icon: "shield" },
    { value: "5 dana", label: "gotova verzija", icon: "clock" },
    { value: "150 KM", label: "web od", icon: "coin" },
  ],
  features: [
    { icon: "web", label: "Web stranice" },
    { icon: "shop", label: "Shopovi" },
    { icon: "app", label: "Aplikacije" },
    { icon: "game", label: "Igrice" },
    { icon: "ai", label: "AI" },
  ],
  terms: [
    "Gotova verzija za 5 dana, ne za 5 sedmica",
    "Stranice od 150 KM, shopovi od 600 KM",
    "Sav sadržaj mijenjate sami, u par klikova",
  ],
  cta: "Javite nam se na Instagramu",
  caption:
    "🖼️ Naslovna fotografija za Facebook stranicu — DevLab.\n\nDimenzije: 1200×628 (16:9), preporučena veličina za FB cover.\n\nŠta stoji na njoj:\n— DevLab wordmark i tagline (web stranice, shopovi, aplikacije, AI)\n— tri broja: 0 KM unaprijed, 5 dana do gotove verzije, od 150 KM\n— domena i poziv na kontakt\n\nPostavi je kao cover na FB stranici tako što je preuzmeš ovdje i uploaduješ direktno.",
  tags: ["devlab", "facebookcover", "sarajevo", "webstranica", "webshop", "digitalnaagencija"],
};
