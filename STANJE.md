# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p03 vracen na ZELENU - kao prije)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p03 ("150 KM") — VRACEN NA ZELENU
Korisnik je trazio da se p03 vrati kako je ranije bilo (zelena podloga,
crn tekst, bijeli "150 KM"). Moja prethodna izmjena na CRNU podlogu
(`inkgreen` paleta) je bila pogresno razumljena — ponistena.

**Trenutno stanje p03:**
- `palette: "tealwhite"` (zelena #4DEAE0 podloga)
- eyebrow / 150 KM / domena -> BIJELI
- naslov + biljeska -> CRNI (#0A0A0A / 72%)

**p01 ("0 KM"):** vracen na `dark` paletu (foto pozadina). "0 KM" je
zelen (BRAND) na tamnoj fotografiji — jedini nacin da bude citljivo, jer
layout `photoBg` uvijek stavlja taman fade preko slike.

### Napomena o `inkgreen` paleti
Paleta `inkgreen` (crna podloga + bijeli naslov + zeleni akcent) je
OSTALA u kodu ali se NIGDJE ne koristi. Ako zatreba, samo se postavi
`palette: "inkgreen"` na post.

### Verifikacija
- p03: zelena podloga, crn naslov/biljeska, bijeli broj (vision potvrdio).
- 41 objava x 2 formata: 0 van kadra, 0 console gresaka.
- tsc=0, build OK (1.822 kB).

## Sljedeći korak
- Pregledati p03 na zelenoj — vraceno kako je bilo.
- Cekati sljedecu konkretnu zelju za p03 (npr. koja boja za koji
  element) prije daljih promjena palete.
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
