# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (premium 3:4: raspored po visini — nema rupa)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### Premium oglas u 3:4 formatu — rješenje rupa
Korisnik: "kada pogledam na 3:4 premium post je lose pozicioniran,
ima puno rupa i praznog prostora".

Prije: svaki razmak je bio fiksan (+56, +50, +46) pa je u 3:4 formatu
izmedju dokaza i dugmadi ostajalo ~290px praznog. Izmjereno: 627px
praznog od 1440 = 43%.

Rjesenje u  (postRender.ts):
- **Proracun razmaka prije crtanja** — visina svake sekcije se izmjeri
  (naslov tlh, lead wrap, chipH, terms), pa se visak dijeli na 4 spoja
  (naslov→lead, lead→usluge, usluge→dokazi, dokazi→dugmad).
- **Dugmad** vise ne idu na  (zakucavanje na
  dno kraja) nego  — prate raspored, dno je samo granica.
- Faktori se ponderise: kartice blize leadu, najvise zraka iznad dugmadi.

Mjer eno u 3:4 (bilo → sad): lead→chip 196→91, chip→terms 167→102,
terms→btn 39→144 px. Raspon izmedju spojeva: 53px (bilo 122).

1:1 format ostao nepromijenjen (surplus=0, 0 van kadra).

### Verifikacija
- 3:4 premium: razmaci 91/102/144, raspon 53px, 0 van kadra.
- 1:1 premium: 0 van kadra, dugmad na 853+84=937 (143px lufta).
- tsc=0, build OK (1.820 kB).
## Sljedeći korak
- Pregledati premium oglas u 3:4 (/objave → 3:4).
- Ako i ostali postovi imaju rupe u 3:4, ista logika rasporeda po visini vazi za sve.
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
