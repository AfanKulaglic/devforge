# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p03 "150 KM": bijeli font, lista ukljucenog)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p03 ("150 KM") — bijeli font + lista ukljucenog
Korisnik: zeli bijeli font na tom postu (ne samo crni) i vise teksta,
marketinski objasnjeno.

**1. Nova paleta `tealwhite`** (postsData.ts + postRender.ts):
zeleni bg #4DEAE0, ink #FFFFFF, soft rgba(255,255,255,0.82),
accent #FFFFFF. Postojeca `teal` je imala CRNI ink — to je plakat, ne oglas.

**2. Nova lista `includes`** (AdPost + PostSlide + formFigure):
kratke stavke ispod biljeske, malim slovima, sa tankom crticom. 5 stavki u
3:4, 4 u 1:1. Za p03: dizajn, admin panel, domena/hosting/SSL,
kontakt forma, rok 5 dana.

### BUGOVI POPRAVLJENI
**a) Polja sa objave nisu dolazila na slide.** PLACE[layout] prima `slide`,
a `includes` je na objavi — lista se tiho ne bi nacrtala. U
`renderSlideSvg` dodan `merged` objekat koji spaja title/subtitle/value/
valueNote/includes/items/eyebrow s objave na slide.

**b) Logo "Lab" nevidljiv na zelenoj podlozi.** `onGreen` se detektovao po
`c.ink === "#0A0A0A"` — ali tealwhite ima zeleni bg i BIJELI ink, pa je
"Lab" ispisivan u BRAND teal na teal podlozi. Sada se gleda `c.bg`.

**c) Prored liste bio premali** (iGap 34 za font 27) — redovi su se
preklapali. Sada 46/40.

### Verifikacija
- p03: bijeli #FFFFFF tekst, 150KM 150px, lista 5 stavki, 0 preklapanja.
- Logo "DevLab" citljiv na zelenom (vision potvrdio).
- 41 objava x 2 formata: 0 van kadra, 0 console gresaka.
- tsc=0, build OK (1.823 kB).

## Sljedeći korak
- Pregledati p03 u oba formata.
- Ostali cjenovni postovi (p08, p09, p55, p56) mogu dobiti `includes` listu
  i paletu `tealwhite` na isti nacin — samo polje u postsN.ts.
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
