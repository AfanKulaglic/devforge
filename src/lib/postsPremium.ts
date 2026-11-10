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
//   comparison       → bez predujma, gotova verzija za 5 radnih dana
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
  title: "Stranica, shop, aplikacija ili igrica. Gotovo za 5 dana.",
  lead: "Plaćate tek kad vidite gotov rezultat — bez predujma, bez ugovora, bez rizika.",
  site: "devlab.cc.cd",
  stats: [
    { value: "0 KM", label: "predujam", icon: "shield" },
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
    "Kod i admin panel ostaju 100% vaši",
  ],
  cta: "Zatraži besplatnu verziju",
  caption:
    "💎 STRANICA GOTOVA ZA 5 DANA — BEZ PREDUJMA\n" +
    "\n" +
    "Većina traži 30–50% unaprijed, pa tek onda pokaže nešto. Mi radimo obrnuto: prvo napravimo gotovu verziju, vi je vidite, i plaćate tek ako ste zadovoljni.\n" +
    "\n" +
    "Zvuči previše dobro? Zato evo tačno šta dobijate i koliko košta.\n" +
    "\n" +
    "ŠTA RADIMO\n" +
    "— 🌐 Web stranice — landing i korporativne, od 150 KM\n" +
    "— 🛒 Web shopovi — korpa, online plaćanje, admin panel, od 600 KM\n" +
    "— 📱 Mobilne aplikacije — iOS i Android, po dogovoru\n" +
    "— 🎮 2D igrice — za web i mobilne, po dogovoru\n" +
    "— 🤖 AI sistemi — AI chat i recepcionar koji rade 24/7\n" +
    "\n" +
    "ŠTA JE UKLJUČENO U CIJENU\n" +
    "✅ Dizajn i kod — sve radimo mi, vi ne tražite nikoga\n" +
    "✅ Admin panel — sami mijenjate tekst, slike i cijene, bez koda\n" +
    "✅ 4 revizije dizajna — dok ne bude kako treba\n" +
    "✅ Hosting i domena — podesimo za vas\n" +
    "✅ Kod ostaje 100% vaš — nema zaključavanja kod nas\n" +
    "\n" +
    "KAKO FUNKCIONIŠE\n" +
    "1️⃣ Javite se — DM, e-mail ili poziv. Recite čime se bavite.\n" +
    "2️⃣ Za par sati dobijate plan i cijenu — bez sitnih slova.\n" +
    "3️⃣ Za 5 dana gledate gotovu stranicu na svom linku.\n" +
    "4️⃣ Ako vam se svidi — plaćate. Ako ne — ne plaćate ništa.\n" +
    "\n" +
    "ZAŠTO JE JEFTINIJE\n" +
    "Radimo bez kancelarija, menadžera i prodajnih timova. Ne plaćate njihov najam — plaćate kod. Zato je do 60% jeftinije od agencija, uz iste provjerene tehnologije: React, WordPress, Shopify.\n" +
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
    "📩 Javite se u DM sa jednom rečenicom: čime se bavite.\n" +
    "Odgovaramo u roku od 10 minuta, bez obaveze i bez predujma.\n" +
    "\n" +
    "🌐 devlab.cc.cd\n" +
    "📧 kontakt@devlab.cc.cd\n" +
    "📱 +387 62 576 456\n" +
    "📸 @devlab.cc.cd\n" +
    "\n" +
    "—\n" +
    "Dev Lab · Sarajevo · cijela BiH\n" +
    "Web stranice · Shopovi · Aplikacije · Igrice · AI\n",
  tags: [
    "premium",
    "bezpredujma",
    "webdizajn",
    "webshop",
    "aplikacije",
    "aisistemi",
    "sarajevo",
    "devlab",
  ],
};
