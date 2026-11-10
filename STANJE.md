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
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija — premium oglas px01, v18)
- **DUGMAD:**
  - primarno: **"JAVITE SE NA INSTAGRAM DM"** (bilo "Javite se u DM ili na sajtu")
  - sekundarno: **"www.devlab.cc.cd"** (dodato `www`)
  - font se auto-smanjuje (padding 56→24, letter-spacing 0.8→0.2) da duži tekst stane bez klipovanja
  - izmjereno: tekst 418px u dugmetu 464px → stane
- **BUG FIX — `site` se nije prenosio:** u `renderPostSlides` (postRender.ts ~1136) `single`
  objekat nije imao `site: post.site`, pa je sekundarno dugme uvijek padalo na fallback
  `"devlab.cc.cd"` bez `www`. Dodato.
- **CAPTION:** link **🌍 www.devlab.cc.cd** odmah na vrhu (2. red), jak CTA na dnu
  "👉 JAVITE NAM SE NA INSTAGRAM DM", korak 1 u KAKO FUNKCIONIŠE = Instagram DM.
- Naslov: "Vaš biznis online. / Za 5 dana. / Bez plaćanja unaprijed." (zadnji red teal,
  lomi se PO REČENICAMA ne po širini).
- Lead: "Prvo vidite gotov rezultat pa platite. Ne svidi li se, ne plaćate ništa i nemate
  nikakvu obavezu."
- Provjereno: 41 objava 0 polomljenih, 0 console grešaka, tsc=0, build OK.

## Sljedeći korak
- Pogledati `/objave` i potvrditi da dugmad izgledaju kako treba.
- Opciono: 4:5 format za Instagram feed.
- Opciono: skinuti `devlab.publicvm.com` sa Vercela.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- `postRender.ts` `wrap()` lomi po širini znakova — za naslove sa akcent-frazom koristi se
  `accentPhrase` split da akcent red uvijek počne cijelom frazom.
- Vision servis povremeno pada — tada mjeriti geometrijski (`getBBox`, `maxRectBottom`).
