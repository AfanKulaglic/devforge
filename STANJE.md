# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p21 + p22 sređeni; VAZNO: ID-evi nisu 1-2-3, vidi mapu)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p05–p10 — sređeni (detalji u gitu)

**Dva vazna buga popravljena globalno:**
1. `formFigure`: razmak broj->naslov bio `tall ? 8 : 52` — u 3:4 samo 8px,
   pa su se broj i naslov preklapali. Sada `tall ? 44 : 52`.
2. `richLayer` logo: `brandMark(..., c.accent)` je na `light` paleti
   (`accent #0A0A0A`) pravio „Lab" CRN na tirkiznoj. Sada `richOnGreen`.

### p21 — „Prije izrade"

`layout: photoBg`, `palette: dark`. Dodan `subtitle` + 4x `{icon,label,note}`
(chat/monitor/layers/check). Prije gola lista sa crticama.

### p22 — „Naš proces"

`layout: "band"` -> `"center"` — band je crtao `stroke 1.5` okvir koji je
korisnik odbio na p07. Dodan `subtitle` + 4x `{icon,label,note}`
(chat/rocket/layers/check).

## ⚠️ VAZNO: ID-evi NISU 1-2-3 po redu

Korisnik trazi postove po REDOSLIJEDU na stranici ("p12", "p13"), ali
ID-evi u kodu skacu. Mapa (pozicija -> id):

| # | id | naslov |
|---|---|---|
| 1 | px01 | Premium ponuda |
| 2 | p01 | Ne plaćate ni marku dok svoj sajt ne vidite gotov |
| 3 | p02 | Stranica, shop, aplikacija, igrica ili AI sistem |
| 4 | p03 | Kompletna stranica za 150 KM |
| 5 | p04 | Zašto firme biraju DevLab |
| 6 | p05 | Četiri stvari koje radimo |
| 7 | p06 | Pet usluga. Jedan tim. |
| 8 | p07 | Sve što vaš projekat treba |
| 9 | p08 | Cijene bez sitnih slova |
| 10 | p09 | Tri paketa. Tri jasne cijene. |
| 11 | p10 | Kako radimo |
| 12 | **p21** | **Prije prve linije koda** |
| 13 | **p22** | **Četiri koraka. Nula plaćanja unaprijed.** |
| 14 | p23 | Projekti koje smo radili |
| 15 | p24 | Izrada sajtova u Sarajevu |
| 16 | p25 | Šta tačno dobijate za cijenu |

**Nema p11–p20 ni p31–p40.** Niz: p01–p10, p21–p30, p41–p60.
Kad korisnik kaze "pN", provjeri da li misli ID ili poziciju!

### Verifikacija
- p21: 4 ikone, subtitle vidljiv, 0 preklapanja, y 1344/1440.
- p22: 4 ikone, BEZ okvira (stroke-width 1.5 = 0), 0 preklapanja.
- 70 slajdova x 2 formata: 0 van kadra.
- tsc=0, build OK.

## Sljedeći korak
- Pregledati p21 i p22 (pozicije 12 i 13).
- Sljedeci po redu: **p23** (pozicija 14) — galerija projekata.
- `band` layout vise nigdje ne koristi okvir — kandidat za brisanje.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
