# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p01 razmaci stegnuti: 37/41px)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p01 ("0 KM") — razmaci stegnuti
Korisnik: "previse je odmaknuto 0 KM i naslov i treci dio jedni od drugih".

Razmaci u `formFigure` (3:4 format) smanjeni:

| spoj | prije | sada |
|---|---|---|
| broj -> naslov | 104 px | **62 px** |
| naslov -> biljeska | 90 px | **48 px** |

Stvarni razmak izmedju elemenata (mjereno na slici):
- 0 KM dno 662 -> naslov vrh 699 = **37 px**
- naslov dno 859 -> biljeska vrh 900 = **41 px**

Dva su ujednacena, sto je i bio cilj.

### Verifikacija
- 3:4 i 1:1: 41 objava, 0 van kadra, 0 console gresaka.
- tsc=0, build OK (1.822 kB).

## Sljedeći korak
- Pregledati p01 u 3:4 — razmaci 37/41 px.
- Ostali broj-postovi (p45, p56, p57) koriste isti formFigure.
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
