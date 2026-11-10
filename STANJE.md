# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (premium oglas v15 — cijeli 'Bez predujma.' u teal)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- localStorage ključevi ostaju `devforge-*` (ne mijenjati zbog kompatibilnosti).
- Dev server: `npm run dev` → http://localhost:5173/

## Gotovo (ova sesija)
- **CIJELI RED "Bez predujma." u teal boji** (prije se lomilo pa je "Bez" ostalo bijelo, a
  obojeno samo "predujma." — djelovalo slučajno).
  - `premiumLayout`: naslov se dijeli na `accentPhrase = "Bez predujma."` — `wrap` se radi
    ODVOJENO za tijelo (2 reda) i za akcent-frazu (1 red), pa akcent red UVIJEK počinje s "Bez".
  - bojenje: `accFrom = tl.length - built.acc.length`, svi redovi od tog indeksa su teal.
- Naslov ostaje **"Vaš biznis online. Za 5 dana. Bez predujma."** (korisnik ga zadržao).
- Provjereno: 41 objava 0 van viewBoxa, 0 gresaka, tsc=0, build OK, vision 1:1 i 3:4
  (potvrđeno da je "Bez" teal).
- **NAGLAŠENO DA SE UREĐUJE SAV SADRŽAJ STRANICE** (prije je djelovalo kao da su samo cijene i slike):
  - oglas: **"Sav sadržaj sajta mijenjate sami, u par klikova"**
  - caption: velikim slovima **"U njoj UREĐUJETE SAV SADRŽAJ SVOJE STRANICE — sami, bez programera."**
    pa lista 6 stavki, tekstovi PRVI (naslovi, opisi, cijeli sadržaj) prije cijena i slika.
- Caption skraćen/pojednostavljen: definicija (zaštićena lozinkom) → poređenje (kao Facebook)
  → negativna pojašnjenja (ne gledate kod / ne instalirate / ne učite) → 6 primjera.
- Provjereno: 41 objava 0 van viewBoxa, 0 gresaka, tsc=0, build OK, vision 1:1 i 3:4.
- **ADMIN PANEL OBJAŠNJEN TAKO DA SVAKO RAZUMIJE** (prije: samo "šta mijenjate", bez "šta je to"):
  - **poređenje s poznatim:** "radi kao Facebook: prijavite se, kliknete i promijenite"
  - **negativna pojašnjenja** (uklanjaju strah): "Vi NE GLEDATE kod, ne instalirate ništa,
    ne učite ništa novo"
  - **definicija prije liste:** "posebna stranica uz sajt, zaštićena lozinkom, sa nje upravljate sajtom"
  - pa tek onda 5 konkretnih primjera (cijena 150→120 KM, proizvodi, radno vrijeme, tekstovi, slika)
  - oglas (1 linija): **"Admin panel: sami mijenjate cijene i slike"**
- Provjereno: 41 objava 0 van viewBoxa, 0 gresaka, tsc=0, build OK, vision 1:1 i 3:4.
- **"ADMIN PANEL" LINIJA KONKRETIZOVANA** — "sami mijenjate tekst i cijene" nije reklo ČEGA:
  - oglas: **"Sami mijenjate cijene, slike i tekstove na sajtu"**
  - caption: naslov "vaša kontrolna tabla, otvara se kao obična stranica u browseru" +
    **5 konkretnih primjera** pod "Šta tu sami mijenjate, bez programera":
    cijena usluge (150→120 KM), proizvodi u shopu, radno vrijeme/telefon/adresa,
    tekstovi i vijesti, naslovna slika. Završava: "Sve u par klikova — bez poziva nama."
- Provjereno: 41 objava 0 van viewBoxa, 0 gresaka, tsc=0, build OK, vision 1:1 i 3:4.
- Vazno: izbjegavati `
` u Python heredocu za TS stringove — koristiti `chr(92)+'n'`
  (dva puta pokvarilo fajl pod "unterminated string literal").
- **OŠTRI UGLOVI na dugmadima** (rx uklonjen) — sajt koristi `rounded-none` na CTA dugmadima
  (`App.tsx` 1323/1325/1327), pa pilula u oglasu nije pripadala brendu. Kartice usluga ostaju
  zaobljene (`rounded-xl`/`2xl` na sajtu).
- **ADMIN PANEL OBJAŠNJEN, RIJEČ "kod" UKLONJENA (0 pojava):**
  - oglas: "Admin panel: sami mijenjate tekst i cijene"
  - caption: "Admin panel — vaša kontrolna tabla. Otvorite je kao običnu stranicu u browseru i tu sami
    mijenjate tekst, slike, cijene i proizvode. Bez čekanja na programera."
  - "Dizajn i kod" → "Dizajn i izrada"
  - "Kod ostaje 100% vaš" → "Sve ostaje vaše — stranica, domena i pristupi na vaše ime"
  - "plaćate kod" → "plaćate samo izradu"; tehnologije (React/WordPress/Shopify) uklonjene
- Provjereno: 41 objava 0 van viewBoxa, 0 gresaka, tsc=0, build OK, vision 1:1 i 3:4.
- **DUGMAD ISTE ŠIRINE:** `halfW = (wCol - 16) / 2` → oba 464px. Hijerarhija se drži
  BOJOM (puni teal vs outline), ne veličinom.
- **KURSOR IKONA** u domen dugmetu (strelica pokazivač, 20px, ispred teksta) —
  bez nje outline dugme izgleda kao etiketa, ne kao link.
- **CTA TEKST:** "Zatraži besplatnu verziju" → **"Javite se u DM ili na sajtu"**.
- **Font izjednačen:** oba 26px (`sfs = cfs`, ne fiksno 25) — dva dugmeta iste
  širine moraju imati istu tipografsku težinu.
- Provjereno: 41 objava 0 van viewBoxa, 0 gresaka, tsc=0, build OK,
  vision 1:1 i 3:4 (dugmad 464px/466px, kursor vidljiv, luft do dna).
- **STIL — vertikalna akcenat-linija uz naslov:** teal bar 7px, visok kao blok naslova,
  naslov uvučen 26px od linije. Daje "urednicki" izgled i sidro za oko.
  Lead i dokazi poravnati na isti `TITLE_INDENT` (33px).
- **FOOTER LINIJA UKLONJENA:** "devlab.cc.cd · SARAJEVO · CIJELA BIH" više ne postoji.
- **DVA DUGMETA U REDU (novo):**
  - primarno: `ZATRAŽI BESPLATNU VERZIJU` — puni teal, 60% širine, h 84, auto-shrink font
  - sekundarno: `devlab.cc.cd` — outline (stroke 2.5, opacity 0.55), teal tekst
  - gap 16px, `reserveBottom=92` da ne dodiruju ivicu
- `G` povećan (max 150, faktor 0.38) — popunjava visak u 3:4 formatu.
- Provjereno: 41 objava 0 van viewBoxa, 0 gresaka, tsc=0, build OK, vision 1:1 i 3:4
  (obje dugmadi u kadru, 74px/90px lufta do dna).
- **NASLOV v8 — fokus na REZULTAT za kupca, ne na tehnologiju:**
  **"Vaš biznis online. Za 5 dana. Bez predujma."** (3 reda, zadnji "predujma." teal)
  - Probao i odbacio: "Vaša ideja. Gotova za 5 dana." (apstraktno),
    "Web, shop ili aplikacija. Za 5 dana. Bez predujma." (nabrajanje, suhoparno),
    "Stranica, shop, aplikacija ili igrica." (predugo).
- **Lead bez duplikata:** "Prvo vidite gotov rezultat pa platite. Bez ugovora, bez skrivenih troškova."
  (prije je ponavljao "bez predujma" iz naslova).
- Provjereno: 41 objava 0 van viewBoxa, 0 gresaka, tsc=0, build OK, vision 1:1 i 3:4.
- **KICKER POTPUNO UKLONJEN** — ispod logotipa više ne stoji ništa (`void p.kicker`, prostor ide naslovu).
- **NASLOV POKRIVA SVE USLUGE** (prije "Vaš projekat. Gotov za 5 dana." — nije predstavljao ponudu):
  **"Stranica, shop, aplikacija ili igrica. Gotovo za 5 dana."**
  - 3 reda: "Stranica, shop," / "aplikacija ili igrica." (bijelo) / "Gotovo za 5 dana." (teal)
- **Lead:** "Plaćate tek kad vidite gotov rezultat — bez predujma, bez ugovora, bez rizika."
- Provjereno: 41 objava 0 van viewBoxa, 0 gresaka, tsc=0, build OK, vision 1:1 i 3:4 (2 reda ispod loga nema, footer vidljiv).
- **KICKER (linija pod logom) promijenjen u marketinški:** "40+ projekata · 5 godina iskustva · Sarajevo"
  (tri nepovezane cinjenice, slabo djeluju) → **"Ideja danas — stranica za 5 dana"**.
  - Prva varijanta "Bez rizika · Bez predujma · Bez ugovora" je odbacena jer je PONAVLJALA lead tekst.
  - Sada kicker govori o BRZINI, lead o PLAĆANJU — bez duplikata.
- Provjereno: 41 objava 0 van viewBoxa, 0 gresaka, tsc=0, build OK, vision 1:1 i 3:4 (kicker u jednom redu).
- **IKONA "Web stranice" POPRAVLJENA:** bila je globus (krug s meridijanima) — citaju je kao "internet",
  ne kao "web stranica". Sada je **browser prozor** (okvir + gornja traka + 3 tacke + linije sadrzaja).
- **UDARNI NASLOV:** "Vaša stranica gotova je za 5 dana. Plaćate tek kad je vidite." (duga, opisna)
  → **"Vaš projekat." (bijeli) / "Gotov za 5 dana." (teal)** — 2 kratke recenice, druga u akcentu.
- **Lead preureden:** "Plaćate tek kad vidite gotov rezultat. Bez predujma, bez ugovora, bez rizika."
- Provjereno: 41 objava 0 van viewBoxa, 0 gresaka, tsc=0, build OK, vision oba formata (naslov 2 reda,
  ikona browser prozor, footer vidljiv).
- **KICKER ZAMIJENJEN TRUST LINIJOM:** "Prva verzija besplatno" (ponavljao naslov) → **"40+ projekata · 5 godina iskustva · Sarajevo"**.
- **KRITIČAN BUG — `pxIcon` nije skalirao:** svi pathovi crtani 0–24, samo translirani, pa je ikona bila ~24px BEZ OBZIRA na `size` (64/98). Popravljeno:
  `scale(size/24)` + stroke-width se dijeli s skalom. Rezultat: ikone sad stvarno 98px → **mjereno 124px, 71% visine chipa** (bilo 26px/15%).
- **Ikone u chipovima preuređene:** ikona gore (top = centrirano), label tačno ispod s gap 16 — pine preklapanja (prije se label oduzimao fiksno `chipH-20` pa je ulazio u ikonu).
- Chip: IC 98px, `chipH = IC*1.44+34` = 175px, rx 20, stroke 1.5 opacity 0.22.
- **Footer popravljen:** FOOT_RESERVE 96, ctaH 86 → footer `y=1060` unutar 1080 kadra (prije 1082 → odrezan).
- Provjereno: 41 objava, 0 van viewBoxa, 0 grešaka, tsc=0, build OK, vision oba formata čista (footer vidljiv u 1:1).
- **PREMIUM OGLAS v3 — uvjerljivija verzija:**
  - naslov prodaje: **"Vaša stranica gotova je za 5 dana. Plaćate tek kad je vidite."**
    (zadnji red automatski u teal akcentu → oko hvata ponudu bez čitanja)
  - kicker: "Prva verzija besplatno"
  - lead: "Bez predujma, bez ugovora, bez rizika. Prvo vidite gotov rezultat — onda odlučujete."
  - **5 usluga u jednom redu**: Web stranice / Web shopovi / Aplikacije / **2D igrice** / AI sistemi
  - ikone **64px** (stvarno izmjereno 130×104px u 1080 slici), stroke skalira s veličinom
  - dokazi konkretni: "5 dana — ne 5 sedmica" / "150 KM, shopovi od 600 KM" / "Kod 100% vaši"
  - CTA: "Zatraži besplatnu verziju", footer `devlab.cc.cd · Sarajevo · cijela BiH`
  - nova ikona `game` (gamepad) u PX_ICONS
  - polje `site` dodano u PostSlide + AdPost
- **Caption prepisan** (~1841 znakova): pozicioniranje, 5 usluga, šta je uključeno, 4 koraka,
  zašto jeftinije, za koga, cijene, svi kontakti (web/mail/tel/IG)
- **Popravljeno:** naveo `
` u Pythonu → pravi prelom reda u TS stringu (unterminated literal);
  vraćeno iz gita i urađeno preko `chr(92)`.
- Provjereno: strokeWidth ikona 4.92 (debeo), 41 objava 0 polomljenih, 0 grešaka, tsc=0, build OK.
- **Instagram promijenjen na `@devlab.cc.cd`** — 7 fajlova (`CONTACT`, posts2/3, MailSignaturePage,
  index.html, INSTAGRAM-PLAN). Provjereno: 0 ostataka `devlab_studio`.
- **PREMIUM OGLAS POTPUNO REDIZAJNIRAN** (`premiumLayout` u postRender.ts) — cilj: čitljiv u 2 sekunde.
  - uklonjeno: 2x2 grid, traka brojki 190px, teal akcenat-linija, dvostruki okviri
  - novo: logo gore LIJEVO → kicker → veliki naslov (78px) → lead → **JEDAN red 4 usluge**
    (chip sa ikonom u piluli) → **3 dokaza sa check ikonom** → velika CTA pilula (88px, puna širina)
    → footer `DEVLAB.CC.CD · SARAJEVO · CIJELA BIH`
  - novi tekst: kicker "Dev Lab · Digitalna rješenja", naslov "Stranica gotova za 5 dana. Bez predujma.",
    lead "Prvo vidite gotov rezultat — platite tek ako ste zadovoljni."
- **Popravljeni bugovi pri redizajnu:**
  - CTA prekrivao listu dokaza → `ctaY = max(ctaNear, ...)` garantuje da je uvijek ISPOD sadržaja
  - CTA+footer bili odrezani na dnu u 1:1 → `FOOT_RESERVE=78` + manji naslov 88→78px
  - u 3:4 bilo 430px praznine → `G` varijabla ravnomjerno dijeli višak (sada ~290px)
- Provjereno: 41 objava, 0 polomljenih, 0 console grešaka, tsc=0, build OK, vision oba formata čista.
- **SVE REFERENCE NA NOVU DOMENU I KONTAKT** (0 starih ostalo):
  - domena `dev-forge-studio.vercel.app` → **`devlab.cc.cd`** (index.html canonical/og/hreflang/JSON-LD,
    public/sitemap.xml, public/robots.txt, INSTAGRAM-PLAN.md, naracija reklame u App.tsx)
  - email `devforge.studio@gmail.com` → **`kontakt@devlab.cc.cd`** (App.tsx CONTACT + 6 mjesta,
    posts2.ts, posts3.ts, MailSignaturePage)
  - Instagram `@devforge_studio` → **`@devlab.cc.cd`**, DM link `ig.me/m/devlab.cc.cd`
  - Provjereno: grep 0 ostataka; renderovani UI (/, /kontakt) prikazuje samo nove podatke;
    produkcijski HTML ima `canonical https://devlab.cc.cd/` i 0 starih referenci
- **PREMIUM OGLAS — 2x2 grid usluga:**
  - `features[]` u postsData: Web stranice / Web shopovi / Aplikacije / AI sistemi
  - ikona u zaobljenom teal kvadratu + label pored
  - traka brojki: teal akcenat-linija na vrhu, cifre 52→58px
  - 3:4 format: CTA+uslovi zakucani za dno (praznina 160px → 85px)
- **MAIL SLANJE SA SAJTA — RADI** (`/mail` → `api/send-mail.ts` → Brevo):
  - Brevo domena autentifikovana: TXT brevo-code, DKIM1/2, DMARC, branded `send`/`r.send`/`img.send`
  - SPF spojen: `v=spf1 include:spf.improvmx.com include:spf.brevo.com ~all` (SAMO JEDAN SPF!)
  - Pošiljaoci verifikovani u Brevo: `kontakt@` i `info@devlab.cc.cd`
  - `api/send-mail.ts`: rate limit 5/10min po IP, honeypot, fiksna lista pošiljalaca,
    HTML potpis se gradi na serveru, API ključ samo u `BREVO_API_KEY` env
  - `src/MailSignaturePage.tsx`: forma (primalac/tema/sadržaj) + 5 gotovih tema + 3 gotova pisma
    + live pregled sa Od/Za/Tema i potpisom
  - **Testirano na produkciji: HTTP 200, rate limit vraća 429 nakon 5 zahtjeva**
  - ⚠️ API ključ MORA biti `xkeysib-...` (SMTP ključ `xsmtpsib-...` daje 401 Key not found)
  - ⚠️ Poslije promjene env varijable na Vercelu OBAVEZAN redeploy (commit --allow-empty radi)
- **DOMENA `devlab.cc.cd` JE ŽIVA** (Vercel + DNSHE):
  - A `@` → `216.198.79.1`, CNAME `www` → Vercel, HTTPS 200, SSL Vercel
  - Mail: ImprovMX forwarding (`kontakt@`, `info@`, `@` → afankul42@gmail.com)
    MX `mx1/mx2.improvmx.com` (10/20) + SPF TXT `v=spf1 include:spf.improvmx.com ~all`
  - **Napomena:** Hotmail odbija ImprovMX (`S8002` Microsoftova interna lista) — Gmail radi.
- **`/mail` — generator e-mail potpisa** (`src/MailSignaturePage.tsx`):
  - Dvije varijante (puni / kompaktni), bira se pošiljalac `kontakt@` ili `info@`
  - Potpis je **tabela sa inline stilovima** (Gmail briše `<style>`, Outlook ne podržava flex)
  - Logo je **javni URL** `https://devlab.cc.cd/images/logo-icon.png` (Gmail blokira base64)
  - Live pregled + "u kontekstu poruke" + dugme **Kopiraj potpis** (ClipboardItem text/html)
  - Uputstvo za Gmail / Outlook.com / Outlook Desktop
  - Ruta dodana u `App.tsx` (route map, noindex lista, render)
- **PREMIUM OBJAVA (`px01`) — namjerno drugačiji oglas od svih ostalih:**
  - Novi fajl: `src/lib/postsPremium.ts` (jedina objava, stoji PRVA u galeriji)
  - Novi layout `"premium"` u `postRender.ts` → `premiumLayout()`
  - **Dizajn se razlikuje po konstrukciji:** BEZ rama i BEZ gornje trake (korisnik tražio da se sklone),
    hijerarhija: **logo gore desno** → kicker → naslov → lead → traka 4 brojke → **CTA pilula** → uslovi.
    Preskaču se `header()`, `decor()`, `premiumFrame()` i gornja traka.
  - **Tamna pozadinska fotografija** (`photo: "ai"` — robotska ruka/mreža) + 3 sloja gradijenata
    (`pxVeil`, `pxLeft` + tamni veo 0.62) — slika se vidi ali ne krade tekst.
  - **Auto-fit naslova:** naslov se smanjuje (96→40px) dok CIJELI ne stane u 3 reda.
    `wrap()` odbacuje višak redova — zato se provjerava `fitsAll()`; prije se gubio „Bez predujma".
    Lead pravilo: `y` ide ISPOD zadnjeg reda teksta — prije je traka prekrivala lead (bug).
  - Redoslijed dna je fiksan i nepreklopiv: TRAKA → CTA → USLOVI (svaki se računa iz prethodnog).
  - Sadržaj (stvarno sa sajta): 0 KM predujam · 5 dana · 150 KM web od · 4 revizije;
    uslovi: demo se ne plaća, kod je 100% vaš, UI/UX + admin panel uključeni.
  - Caption predstavlja CIJELU stranicu (5 blokova): ŠTA RADIMO / UVIJEK UKLJUČENO /
    KAKO IDE (4 koraka) / ZAŠTO BEZ PREDUJMA / CIJENE.
  - Nova polja u `postsData.ts` (`kicker`, `lead`, `terms`, `stats`, `cta`) — opcionalna, ne diraju ostale objave.
  - Verifikovano na 1080px: 1:1 i 3:4 čisti, bez preklapanja, 0 console grešaka, tsc=0, build OK.
- **Post p04 („Zašto Dev Lab") — nova pozadinska slika:**
  - Izvor: `E:\0_Downloads\Modern DevLab Office Reception.png` (1672×941)
  - Centar-crop na kvadrat → 900×900, JPEG q72 → base64 u `src/lib/postPhotos.ts` (`const ZASTO`)
  - Stara slika `ZASTO` (bila 900×900, 85 kB) **zamijenjena** (nova 97 kB / 130 kB b64)
  - Referenca u `public/images/post-zasto-office.jpg` (q80)
  - Alt tekst: `PHOTO_ALT.zasto` = „Moderna Dev Lab kancelarija — recepcija"
  - Layout ostaje `photoBg` (slika preko cijele površine, tekst lijevo) — korisnik je tražio „s lijeve strane"
- **Verifikacija:** `npx tsc --noEmit` → 0; `npm run build` → OK (1.794 kB / gzip 812 kB); Playwright na `/objave`: p04 SVG sadrži **novu** sliku i ne sadrži staru, 0 grešaka; vizuelna provjera — naslov „Zašto Dev Lab" čitljiv preko fotografije.

## Gotovo (prethodna sesija)
- **Nova flask ikona ubačena svuda** (korisnikov attachment `flask (1).png`, 64×64, teal, transparentno):
  - `public/images/logo-icon.png` (navbar, favicon)
  - `public/images/icon-192.png`, `icon-512.png`, `apple-touch-icon.png` (16-boja kvantizovano, transparentno)
  - `src/lib/postLogo.ts` — base64 192×192 (16-boja, ~3.6 kB b64) za objave
- **Ikonica je 70% spoljnog okvira na svim mjestima** (ista proporcija):
  - Navbar / reklama / `/logo`: `LOGO_ICON_SCALE = "calc(70% + 1.4px)"` u `App.tsx` (kompenzuje 1px border)
  - Objave: `LOGO_ICON_H = LOGO_BOX * 0.70` u `src/lib/postRender.ts`
  - Reklama: `AdMark size="13.1cqh"` u obje scene (brand open + end card), da wordmark ostane 55% okvira
- **Wordmark „DevLab“ povećan ~10%:**
  - Navbar: `text-[22px]` (bilo `text-xl` 20px)
  - `/logo`: `12.1vmin` (55% okvira; bilo 11vmin)
  - Objave: `LOGO_FONT = 22 * K` = 46.2px (bilo 42px)
  - Reklama: `.ad-wm-xl 7.2cqh`, `.ad-wm-lg 6.0cqh`
- **Verifikacija:** `npx tsc --noEmit` → 0; `npm run build` → OK (1.778 kB, gzip 799 kB); Playwright: navbar ikona 70.0%, wordmark 22px, odnos 1.273; `/logo` desktop 70.0% / 108.9px / 1.273, mobilni 70.0% / 47.19px / 1.272; `/reklama` 70.0% / 64.8px / 1.278, end card se uklapa (kartice do 755px, okvir do 950px); 0 grešaka.
- **Ispravljena naracija reklame:** „devlab corporation“ → „dev lab tačka c c tačka c d“ (prava domena `devlab.cc.cd`).

## Poznato / sljedeće
- **Commit/push:** 24+ izmijenjenih fajlova još nije commitano; zadnji commit `c478916`. Pitati korisnika za commit/push.
- **Stare „DevForge" slike u objavama:** `E:\0_Downloads\Post2.png` i `PostImage1.png` još imaju stari DevForge logo/tekst (odnose se na p05/stvari, ne na p04). Ako korisnik želi, zamijeniti/urediti.
- **Napomena:** nova ikona ima ugrađen transparentan padding (alpha bbox 12,4–52,60 unutar 64×64), pa je vidljivi dio dodatno manji od 70% — namjerno; korisnik je tražio manju ikonu, a 70% je kompromis.
- **p04:** izvorna slika je 16:9 pejzažna, a post je kvadratan — centar-crop odsijeca lijevu i desnu trećinu. Ako je bitan širi kadar, treba crop/anchor prilagoditi.

## Ključne lokacije
- `src/lib/postsPremium.ts`: `POST_PREMIUM` — premium oglas (px01)
- `src/lib/postRender.ts`: `premiumLayout()`, `premiumFrame()`, `PLACE.premium`, `isPremium` grana
- `src/App.tsx`: `Logo()`, `AdMark()`, `AdWordmark()`, `LogoPage`, `LOGO_ICON_SCALE`
- `src/lib/postRender.ts`: `brandMark()`, `LOGO_BOX`, `LOGO_FONT`, `LOGO_ICON_H`
- `src/lib/postLogo.ts`: `DF_LOGO_DATA_URI`, `DF_LOGO_RATIO = 1`
- `src/index.css`: `.ad-wm-lg`, `.ad-wm-xl`
- `public/images/*`: logo + PWA ikone
- `STANJE.md`: ovaj fajl

## Komande
- `npm run dev` → http://localhost:5173/
- `npx tsc --noEmit`
- `npm run build`
