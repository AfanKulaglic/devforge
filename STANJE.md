# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (premium oglas v18 — dugmad + link u captionu)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- localStorage ključevi ostaju `devforge-*` (ne mijenjati zbog kompatibilnosti).
- Dev server: `npm run dev` → http://localhost:5173/

## Gotovo (ova sesija)
- **DUGMAD PROMIJENJENA:**
  - primarno: **"JAVITE SE NA INSTAGRAM DM"** (bilo "Javite se u DM ili na sajtu")
  - sekundarno: **"www.devlab.cc.cd"** (dodato www, bilo bez)
  - font auto-smanjuje (padding 56->24, letter-spacing 0.8->0.2) da duzi tekst stane bez klipovanja
- **BUG FIX:  se NIJE prenosio** u  single-slide objekat ( ~1136)
  — pa je sekundarno dugme uvijek padalo na fallback "devlab.cc.cd". Dodato .
- **CAPTION:** link **www.devlab.cc.cd** odmah na vrhu (2. red), CTA na dnu
  "👉 JAVITE NAM SE NA INSTAGRAM DM", korak 1 u KAKO FUNKCIONISE isto Instagram DM.
- Provjereno: 418px tekst u 464px dugmetu (fits), 41 objava 0 polomljenih, tsc=0, build OK.
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
