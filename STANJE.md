# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (premium oglas redizajniran + Instagram @devlab.cc.cd)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- localStorage ključevi ostaju `devforge-*` (ne mijenjati zbog kompatibilnosti).
- Dev server: `npm run dev` → http://localhost:5173/

## Gotovo (ova sesija)
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
