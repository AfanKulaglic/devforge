# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p10: 5 slajdova — ikone, opisi, lead; p11 NE POSTOJI)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p05–p09 — sređeni (detalji u gitu)

`buildNarrow` (p05), `formCover` 4 stavke + `formAction` lead/dokazi (p06),
`band`->`center` bez okvira (p07), `formFigure` grid ikona (p08),
logo na zelenoj podlozi (p09).

**Dva vazna buga popravljena globalno:**
1. `formFigure`: razmak broj->naslov bio `tall ? 8 : 52` — u 3:4 samo 8px,
   pa su se broj i naslov preklapali. Sada `tall ? 44 : 52`.
2. `richLayer` logo: `brandMark(..., c.accent)` je na `light` paleti
   (`accent #0A0A0A`) pravio „Lab" CRN na tirkiznoj — nevidljiv. Sada
   `richOnGreen` detekcija kao u `header()`.

### p10 — „Kako radimo", 5 slajdova

Template `process` koristi `formBlocks`, pa `{icon, label, note}` radi bez
ikakve promjene u renderu.

| slajd | tema | ikone |
|---|---|---|
| 1 | cover — „Četiri koraka. Prvi je razgovor." + lead | chat/rocket/tools/check |
| 2 | 01 · Razgovor — Inicijalna konsultacija | chat/bolt/layers/clock |
| 3 | 02 · Bez plaćanja — Besplatna gotova verzija | clock/web/rocket/shield |
| 4 | 03 · Razvoj — Razvoj i implementacija | tools/layers/check/chat |
| 5 | 04 · Isporuka — Testiranje i isporuka | check/rocket/layers/monitor |

Svaki slajd 2-5 dobio i `subtitle` (npr. „Dvadeset minuta razgovora — bez
prezentacija i bez ugovora.").

### p11 NE POSTOJI

ID-evi u projektu: **p01–p10**, pa skok na **p21–p30**, pa **p41–p60**.
Nema p11–p20 ni p31–p40. `posts1.ts` zavrsava na p10.

### Verifikacija
- p10: 5 slajdova, ikone 4/4/4/4/4, svi y 1344/1440.
- Vision: S1, S2, S3 potvrdjeni — sve stavke potpune, bez preklapanja.
- 70 slajdova x 2 formata: 0 van kadra.
- tsc=0, build OK.

## Sljedeći korak
- Pregledati p10 (5 slajdova) u 3:4 i 1:1.
- Sljedeci po redu: **p21** (nastavlja niz nakon p10).
- `band` layout vise nigdje ne koristi okvir — kandidat za brisanje.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
