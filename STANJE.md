# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p23 sređen; p22 potvrđen; mapa pozicija->ID u tabeli)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p05–p10, p21, p22 — sređeni (detalji u gitu)

**Dva vazna buga popravljena globalno:**
1. `formFigure`: razmak broj->naslov bio `tall ? 8 : 52` — u 3:4 samo 8px,
   pa su se broj i naslov preklapali. Sada `tall ? 44 : 52`.
2. `richLayer` logo: `brandMark(..., c.accent)` je na `light` paleti
   (`accent #0A0A0A`) pravio „Lab" CRN na tirkiznoj. Sada `richOnGreen`.

### p23 — „Naši projekti", 5 slajdova

Template `number` koristi `formFigure`, pa `items` grid radi automatski.

| slajd | tema | ikone |
|---|---|---|
| 1 | cover — „Dvadeset projekata. Nijedan nije platio ono što nije vidio." + lead | web/shop/app/ai |
| 2 | 20+ isporučenih projekata | web/shop/app/game |
| 3 | Vrste projekata + subtitle | shop/rocket/monitor/ai |
| 4 | 100% zadovoljstvo | shield/check/clock/tools |
| 5 | CTA — „Vaš projekt je sljedeći." + lead | chat/rocket/shield |

## ⚠️ VAZNO: ID-evi NISU 1-2-3 po redu

Korisnik trazi postove po REDOSLIJEDU na stranici ("p12", "p13"), ali
ID-evi u kodu skacu. **Uvijek provjeri poziciju, ne pretpostavljaj ID!**

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
| 12 | p21 | Prije prve linije koda |
| 13 | p22 | Četiri koraka. Nula plaćanja unaprijed. |
| 14 | **p23** | **Projekti koje smo radili** |
| 15 | p24 | Izrada sajtova u Sarajevu |
| 16 | p25 | Šta tačno dobijate za cijenu |
| 17 | p26 | Da li je gotova verzija zaista besplatna? |
| 18 | p27 | Koliko traje izrada? |

**Nema p11–p20 ni p31–p40.** Niz: p01–p10, p21–p30, p41–p60.

### Verifikacija
- p23: 5 slajdova, ikone 4/4/4/4/3, svi y 1344/1440.
- Vision: cover, 20+ slajd i CTA potvrdjeni — bez preklapanja.
- p22: 0 okvira (`stroke-width 1.5` = 0).
- 70 slajdova x 2 formata: 0 van kadra.
- tsc=0, build OK.

## Sljedeći korak
- Pregledati p23 (5 slajdova).
- Sljedeci po redu: **p24** (pozicija 15) — izrada sajtova u Sarajevu.
- `band` layout vise nigdje ne koristi okvir — kandidat za brisanje.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
