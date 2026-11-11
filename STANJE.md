# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p24 sređen; formHero dobio items grid sa opisima)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p05–p10, p21–p24 — sređeni (detalji u gitu)

**Tri vazna buga popravljena globalno:**
1. `formFigure`: razmak broj->naslov bio `tall ? 8 : 52` — u 3:4 samo 8px,
   pa su se broj i naslov preklapali. Sada `tall ? 44 : 52`.
2. `richLayer` logo: `brandMark(..., c.accent)` je na `light` paleti
   (`accent #0A0A0A`) pravio „Lab" CRN na tirkiznoj. Sada `richOnGreen`.
3. `formHero` NIJE crtao `items` — postovi sa `layout: center` i `title`
   templateom (p24) nisu imali gdje predati listu. Sada crta grid 2x2.

### p24 — „Izrada sajtova u Sarajevu"

`layout: center`, `palette: teal` (zelena podloga), template `title` ->
`formHero`. Dodan `items` sa 4 dokaza — prije je imao samo naslov +
podnaslov. `subtitle` skracen (bio prestan).

| ikona | label | note |
|---|---|---|
| web | Stranica od 150 KM | Shop od 600 KM — bez skrivenih stavki. |
| check | Ista cijena svugdje | Jednako za firmu iz Sarajeva i iz Bihaća. |
| chat | Sve ide online | Razgovor, pregledi i izmjene — bez dolaska. |
| shield | Bez kirije u cijeni | Ne plaćate naš najam ni naše režije. |

### `formHero` — items grid sa `note`

Dodano na kraj forme: grid 2x2, `hIC` 40/36, `hfs` 28/26, `hRow` 62/56.
Kad stavka ima `note`, red je visi za `nfs + 10` (22/20) i ikona se centrira
po CIJELOM bloku (label + note), ne po labelu.

## ⚠️ VAZNO: ID-evi NISU 1-2-3 po redu

Korisnik trazi postove po REDOSLIJEDU na stranici ("p12", "p13"), ali
ID-evi u kodu skacu. **Uvijek provjeri poziciju, ne pretpostavljaj ID!**

| # | id | naslov |
|---|---|---|
| 1 | px01 | Premium ponuda |
| 2 | p01 | Ne plaćate ni marku… |
| 3 | p02 | Stranica, shop, aplikacija, igrica ili AI |
| 4 | p03 | Kompletna stranica za 150 KM |
| 5 | p04 | Zašto firme biraju DevLab |
| 6 | p05 | Četiri stvari koje radimo |
| 7 | p06 | Pet usluga. Jedan tim. |
| 8 | p07 | Sve što vaš projekat treba |
| 9 | p08 | Cijene bez sitnih slova |
| 10 | p09 | Tri paketa. Tri jasne cijene. |
| 11 | p10 | Kako radimo |
| 12 | p21 | Prije prve linije koda |
| 13 | p22 | Četiri koraka. Nula plaćanja. |
| 14 | p23 | Projekti koje smo radili |
| 15 | **p24** | **Izrada sajtova u Sarajevu** |
| 16 | p25 | Šta tačno dobijate za cijenu |
| 17 | p26 | Da li je gotova verzija zaista besplatna? |
| 18 | p27 | Koliko traje izrada? |

**Nema p11–p20 ni p31–p40.** Niz: p01–p10, p21–p30, p41–p60.

### Verifikacija
- p24: 4 ikone sa opisima, sve čitljivo na zelenoj podlozi (vision potvrdio).
- **Svih 70 slajdova (3:4): 0 STVARNOG preklapanja** (tolerancija: sijeku se
  >40% visine reda). Susjedni redovi naslova nisu preklop.
- 70 slajdova x 2 formata: 0 van kadra.
- tsc=0, build OK.

## Sljedeći korak
- Pregledati p24.
- Sljedeci po redu: **p25** (pozicija 16) — šta tačno dobijate za cijenu.
- `band` layout vise nigdje ne koristi okvir — kandidat za brisanje.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
