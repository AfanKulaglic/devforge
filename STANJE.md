# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (premium oznaka u /objave + FB cover)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### PREMIUM oznaka na /objave

Premium objava (`layout: "premium"` — za sada samo `px01`) se sada prepoznaje
na tri mjesta u `src/PostsPage.tsx`:

1. **Značka na kartici** — gore lijevo, `bg-teal-300`, tekst `#062a28`,
   ikona `HiOutlineSparkles` + "Premium". Kartica dobija i teal okvir
   (`border-teal-300/60` umjesto `border-white/10`).
2. **Značka u modalu** — "Premium objava" ispod kategorije.
3. **Filter "Premium"** — nov tip `PostFilter = PostCategory | "sve" |
   "premium"`, prikazuje samo premium objave, broji ih u zagradi.

**Detekcija:** `post.layout === "premium"` — nema novog polja u podacima.

### FB cover fotografija

`images/fb-cover-devlab-fadec2.jpg` (16:9). DevLab wordmark lijevo
("Dev" bijel, "Lab" `#4DEAE0`), tagline "Web stranice · Shopovi ·
Aplikacije · AI", desno apstraktni teal glass paneli. Vision potvrdio
tekst. **Nisam mogao lično vidjeti sliku.**

### Preloader

`<p className="preloader-logo">` je pisao "Dev Lab" sa razmakom -> "DevLab".
Animacija (shimmer gradijent) netaknuta.

### Ranije ove sesije: p05–p10, p21–p24 sređeni

**Tri globalna buga popravljena:**
1. `formFigure`: razmak broj->naslov bio `tall ? 8 : 52` — u 3:4 samo 8px.
   Sada `tall ? 44 : 52`.
2. `richLayer` logo: `brandMark(..., c.accent)` na `light` paleti pravio
   „Lab" CRN na tirkiznoj. Sada `richOnGreen`.
3. `formHero` nije crtao `items`. Sada grid 2x2 sa `note` ispod labela.

## ⚠️ VAZNO: ID-evi NISU 1-2-3 po redu

Korisnik trazi postove po REDOSLIJEDU na stranici ("p12", "p13"), ali
ID-evi u kodu skacu. **Uvijek provjeri poziciju, ne pretpostavljaj ID!**

| # | id | naslov |
|---|---|---|
| 1 | px01 | **Premium ponuda** |
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
| 15 | p24 | Izrada sajtova u Sarajevu |
| 16 | **p25** | **Šta tačno dobijate za cijenu** |
| 17 | p26 | Da li je gotova verzija zaista besplatna? |
| 18 | p27 | Koliko traje izrada? |

**Nema p11–p20 ni p31–p40.** Niz: p01–p10, p21–p30, p41–p60.

### Verifikacija
- /objave: Premium značka na kartici (1), filter "Premium 1" radi, 0 grešaka.
- Vision potvrdio značku, teal okvir i filter red.
- FB cover: vision potvrdio tekst "DevLab" (jedna rijec) + tagline.
- 70 slajdova x 2 formata: 0 van kadra; 0 stvarnog preklapanja.
- tsc=0, build OK.

## Sljedeći korak
- Pogledati /objave — Premium značka na px01 kartici + filter.
- FB cover: `images/fb-cover-devlab-fadec2.jpg` — upload na Facebook.
- Sljedeci post po redu: **p25** (pozicija 16).
- Opciono: ostalih ~20 mjesta "Dev Lab" -> "DevLab" (naslovi sekcija,
  footer, alt tekstovi, AdminPanel).

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
