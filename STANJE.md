# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (FB cover kao objava fbc01 u /objave, 16:9)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### FB COVER kao objava u /objave (`fbc01`)

Cover vise NIJE samo fajl na disku — sada je PRVA objava u `/objave`, sa
istim dugmetom za preuzimanje kao sve ostale.

**Novi format `16:9`** (`FORMATS` u `postRender.ts`): 1200x628 (FB preporuka).

**Novo polje `fixedFormat?: "1:1" | "3:4" | "16:9"`** na `AdPost`.
Objava sa tim poljem se UVIJEK renderuje u svom formatu, bez obzira na
prekidac 1:1 / 3:4. `PostCard`, `PostModal` i `downloadPng` svi postavljaju
`setFormat(post.fixedFormat ?? format)` prije rendera i vrate prethodni u
`finally`.

**Novi layout `cover16x9`** (`coverLayout()` u `postRender.ts`):
horizontalan banner, namjenski za FB. Zasto ne `premium`: premium je gradjen
za VISOKE formate i u 16:9 mu se kartice sa ikonama odsijeku van kadra
(izmjereno y=825 u 628px kadru).

| zona | sadrzaj |
|---|---|
| gore lijevo | wordmark DevLab (Dev bijel, Lab `#4DEAE0`) |
| lijevo | naslov 3 reda, zadnji (`Za 5 dana.`) u akcent boji |
| lijevo dolje | lead 2 reda uz vertikalnu traku |
| desno | tri dokaza: 0 KM / 5 dana / 150 KM |
| dolje desno | `www.devlab.cc.cd` |
| **dolje lijevo** | **NAMJERNO PRAZNO** — tu sjeda FB profilna slika |

**Guard `isBare`**: `renderSlideSvg` preskace `header()` i `coverFrame()` za
`cover16x9` — inace bi se domena pojavila DVAPUT i cover bi dobio okvir.

### PREMIUM oznaka u /objave

Detekcija `post.layout === "premium"` (bez novog polja):
1. Znacka gore lijevo na kartici (`bg-teal-300`, `HiOutlineSparkles`).
2. Kartica dobija teal okvir (`border-teal-300/60`).
3. Znacka u modalu: "Premium objava".
4. Filter **Premium** (`PostFilter = PostCategory | "sve" | "premium"`).

### Preloader

`<p className="preloader-logo">` je pisao "Dev Lab" -> "DevLab".
Animacija (shimmer gradijent) netaknuta.

### Ranije ove sesije: p05–p10, p21–p24 sređeni

**Tri globalna buga popravljena:**
1. `formFigure`: razmak broj->naslov bio `tall ? 8 : 52` — u 3:4 samo 8px.
2. `richLayer` logo: `brandMark(..., c.accent)` na `light` paleti pravio
   „Lab" CRN na tirkiznoj. Sada `richOnGreen`.
3. `formHero` nije crtao `items`. Sada grid 2x2 sa `note` ispod labela.

## ⚠️ VAZNO: ID-evi NISU 1-2-3 po redu

Korisnik trazi postove po REDOSLIJEDU na stranici ("p12", "p13"), ali
ID-evi u kodu skacu. **Uvijek provjeri poziciju, ne pretpostavljaj ID!**

| # | id | naslov |
|---|---|---|
| 1 | **fbc01** | **FB COVER (16:9)** |
| 2 | px01 | Premium ponuda |
| 3 | p01 | Ne plaćate ni marku… |
| 4 | p02 | Stranica, shop, aplikacija, igrica ili AI |
| 5 | p03 | Kompletna stranica za 150 KM |
| 6 | p04 | Zašto firme biraju DevLab |
| 7 | p05 | Četiri stvari koje radimo |
| 8 | p06 | Pet usluga. Jedan tim. |
| 9 | p07 | Sve što vaš projekat treba |
| 10 | p08 | Cijene bez sitnih slova |
| 11 | p09 | Tri paketa. Tri jasne cijene. |
| 12 | p10 | Kako radimo |
| 13 | p21 | Prije prve linije koda |
| 14 | p22 | Četiri koraka. Nula plaćanja. |
| 15 | p23 | Projekti koje smo radili |
| 16 | p24 | Izrada sajtova u Sarajevu |
| 17 | p25 | Šta tačno dobijate za cijenu |

**Nema p11–p20 ni p31–p40.** Niz: p01–p10, p21–p30, p41–p60.

### Verifikacija
- /objave: 42 kartice, prva je fbc01 u 16:9 (odnos 1.72, viewBox 1080x628).
- Cover: domena samo JEDNOM, donji lijevi ugao slobodan (0 elemenata u
  zoni x<360 / y>490), maxY 566/628.
- 71 slajd x 2 formata: 0 van kadra.
- tsc=0, build OK, 0 console gresaka.

## Sljedeći korak
- Otvoriti /objave — prva kartica je FB cover, preuzmi je dugmetom za PNG.
- Upload na Facebook kao naslovnu fotografiju stranice.
- Sljedeci post po redu: **p25** (pozicija 17).
- Opciono: ostalih ~20 mjesta "Dev Lab" -> "DevLab".

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
