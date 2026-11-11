# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p09: ikone + opisi, popravljen logo na zelenoj podlozi)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p05 — tekst ne prelazi na sliku (layout `photo`)

`buildNarrow()` privremeno smanjuje modul-level `W_MUT` na tekst zonu,
izgradi blok, vrati u `finally`. Sve forme koriste `W_MUT` umjesto `W`.

**BUG a)** biljeska ispod drugog reda labela.  **BUG b)** `wrap(note,...,2)`
odbacivao rijeci.  **BUG c)** `minRow` 64 -> 186/158.  **BUG d)** skript
ostetio komentar u `renderSlideSvg`.

### p06 — karusel dobio život (6 slajdova)

Svih 6: subtitle + 4 stavke `{icon, label, note}`. Cover: naslov + lead + 4
ikone. CTA: lead + 3 dokaza.

**`formCover`**: `slice(0, 3)` -> `slice(0, SIZE_H >= 1300 ? 4 : 3)`.
**`formAction`**: crta `lead` (accent traka) i 3 dokaza iznad dugmeta.

### p07 — bez okvira, ikone, kraći naslov

`layout: "band"` -> `"center"` (band je crtao `stroke 1.5` okvir).
Naslov bio odsjecen -> **"Sve što vaš projekat treba. Bez doplata."**
Lista: 4x `{icon, label, note}` + subtitle.

### p08 — ikone u cjenovnim slajdovima (5 slajdova)

Svih 5: cover (lead + 3 ikone), tri cjenovna slajda (4 ikone grid 2x2),
zadnji (4x `{icon,label,note}` + subtitle).

**`formFigure` sada crta `items`** kao grid 2x2 ispod biljeske.

### BUG (vazan, rijesen) — preklop broj / naslov u `formFigure`

Razmak je bio `h += tall ? 8 : 52` — u 3:4 samo **8px**. Veliki broj
(150-260px) ima donju ivicu na `h`, naslov pocinje na `h + ts*0.78`, pa je
izmedju bilo nula zraka. Sada `tall ? 44 : 52` -> ~75-80px.
**Vrijedi za sve cjenovne slajdove u svim postovima.**

### p09 — ikone + opisi, popravljen logo na zelenoj podlozi

Post je `layout: "split"`, `palette: "light"` (tirkizna podloga `#6FEFE6`).

**BUG: logo „Lab" je bio CRN na tirkiznoj — nevidljiv.**
`richLayer` je zvao `brandMark(left, ..., c.ink, c.accent)`, a u `light`
paleti je `c.accent = "#0A0A0A"`. Dakle i „Dev" i „Lab" crni na tirkiznoj.
`header()` je to vec rjesavao preko `onGreen`, ali `richLayer` nije.
Sada i `richLayer` ima istu detekciju: `richOnGreen` -> „Dev" BIJEL,
„Lab" CRN. **Popravak vrijedi za sve postove na `light`/`tealwhite` paleti.**

Lista 3 stavke sa ikonom + opisom (prije gole stavke sa crticama):

| ikona | label | note |
|---|---|---|
| web | Web stranica — od 150 KM | Dizajn, mobilna verzija, kontakt forma i admin panel. |
| shop | Web shop — od 600 KM | Katalog, korpa, plaćanje karticom i upravljanje narudžbama. |
| app | Aplikacije i igrice — dogovor | iOS i Android, ili igrica za web. Cijena zavisi od obima. |

Dodan `subtitle`: "Izaberite paket — ili nas pitajte šta vam treba."

### Verifikacija
- p09: 3 ikone, 0 preklapanja, y 1344/1440, „Lab" vidljiv (vision potvrdio).
- 70 slajdova x 2 formata: 0 van kadra.
- tsc=0, build OK.

## Sljedeći korak
- Pregledati p09 u 3:4 i 1:1.
- p10 (kako radimo) je karusel — kandidat za isti tretman.
- `band` layout vise nigdje ne koristi okvir — kandidat za brisanje.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
