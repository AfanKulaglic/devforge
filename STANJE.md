# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (FB naslovna: PRAVA slika zemlje + novi slogan)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### PREMIUM objava — svi okviri uklonjeni

Korisnik: "ne svidja mi se okvir na postu ekskluzivnog sadrzaja".

**BUG: invertovana logika okvira.** U `renderSlideSvg` je stajalo:

```ts
${isCover || isBare ? "" : coverFrame(c)}   // POGREGSNO
```

To znaci: okvir se crta SVUDA OSIM na coveru — dakle bas na premium objavi
(koja nije cover) je uvijek bio. Ispravno:

```ts
${isCover && !isBare ? coverFrame(c) : ""}
```

**Chip kartice bez okvira** — u `premiumLayout` su imale `stroke` 1.5
(`stroke-opacity 0.22`). Uklonjen; ostala je samo svjetlija podloga
(`fill #ffffff opacity 0.075`).

Ostala su namjerno samo 2 stroke recta: okvir logo-kutije i outline dugme.
Karuseli (p04, p06...) zadrzali su svoj okvir — provjereno.

### FB NASLOVNA — prava fotografija Zemlje

Korisnik: "planeta koju sam ti trazio umjesto kruga mora biti PRAVA slika
planete", i slogan "Digitalna agencija" mu se ne svidja — trazi nesto sto
vise predstavlja nas i sto je za reklamu.

**Slogan promijenjen** u: `Za 5 dana. Bez plaćanja unaprijed.` —
dvije konkretne koristi (brzina + nula rizika), iste dvije cifre koje se
ponavljaju svuda u projektu. "Digitalna agencija" je samo opis kategorije.

**Prava slika**: `PHOTOS.earth` — fotorealisticna Zemlja iz svemira,
1200x675, base64 u `postPhotos.ts` (101 kB, q72). Dodana kao `PhotoKey`
"earth" + `PHOTO_ALT.earth` + u `PHOTO_KEYS`.

Slika je generisana (nema pristupa internetu za stock). Izmjereno:
horizont na ~43% visine (y≈290 od 675), gornji dio cist crni svemir
(luminance 0-2) — logo i tekst sigurno stanu iznad horizonta.

| sloj | sadrzaj |
|---|---|
| baza | `#04060A` + `<image>` Zemlja (`preserveAspectRatio="xMidYMid slice"`) |
| zavjesa | `#covVeil` linearni gradijent gore (0.55 -> 0) — tekst citljiv |
| sjaj | `#covGlow` tirkizni radial iza logotipa |
| logo | **DevLab** 118px, "Dev" bijel, "Lab" `#4DEAE0` |
| slogan | **Za 5 dana. Bez plaćanja unaprijed.** 40px, `#C8D2D6` |
| ispod | `@devlab.cc.cd` (teal 800, 30px) |
| dno | `www.devlab.cc.cd` (sivo 600, 25px) |

Crtani krugovi, kontinenti-pathovi i atmosferski prstenovi su UKLONJENI —
zamijenila ih je fotografija. Ostao je samo `#covGlow` za brend boju.

**Bug fix:** slogan je preklapao logo (DevLab box y 145-313, slogan y
299-350) — `<text>` nosi veliki line-height. Pomjereno na `cy+52`, domena
na `cy+124` / `cy+162`. Sada 0 preklapanja.

### PREMIUM objava — svi okviri uklonjeni

Korisnik: "ne svidja mi se okvir na postu ekskluzivnog sadrzaja".

**BUG: invertovana logika okvira.** U `renderSlideSvg` je stajalo
`${isCover || isBare ? "" : coverFrame(c)}` — okvir se crtao SVUDA OSIM
na coveru, dakle bas na premium objavi uvijek. Ispravno:
`${isCover && !isBare ? coverFrame(c) : ""}`.

**Chip kartice bez okvira** — imale `stroke` 1.5. Uklonjen. Karuseli
(p04, p06...) zadrzali svoj okvir — provjereno.

### PREMIUM objava — svi okviri uklonjeni

Korisnik: "ne svidja mi se okvir na postu ekskluzivnog sadrzaja".

**BUG: invertovana logika okvira.** U `renderSlideSvg` je stajalo:

```ts
${isCover || isBare ? "" : coverFrame(c)}   // POGREGSNO
```

To znaci: okvir se crta SVUDA OSIM na coveru — dakle bas na premium objavi
(koja nije cover) je uvijek bio. Ispravno:

```ts
${isCover && !isBare ? coverFrame(c) : ""}
```

**Chip kartice bez okvira** — u `premiumLayout` su imale `stroke` 1.5
(`stroke-opacity 0.22`). Uklonjen; ostala je samo svjetlija podloga
(`fill #ffffff opacity 0.075`).

Ostala su namjerno samo 2 stroke recta: okvir logo-kutije i outline dugme.
Karuseli (p04, p06...) zadrzali su svoj okvir — provjereno.

### FB NASLOVNA — planeta Zemlja iza logotipa

Korisnik: stari slogan ("Stranice, shopovi i aplikacije — bez plaćanja
unaprijed.") mu se ne svidja, a krug u pozadini zamijeniti **planetom
Zemljom iz daljine, samo gornja polovina luka**. Trazi "premium" izgled.

`coverLayout()` u `postRender.ts`, sve vertikalno centrirano:

| sloj | sadrzaj |
|---|---|
| svemir | `#05060A` + `#covStars` + `#covGlow` (teal) |
| planeta | `circle r=620`, `cy = SIZE_H + 268` — centar je IZVAN kadra, vidi se samo luk |
| kontinenti | 3 organska `path` oblika u `clipPath` (`#covEarthClip`) |
| terminator | `#covTerm` gradijent desno — tamna strana planete |
| atmosfera | `#covAtmo` 3px rub + 7px prigušeni prsten + tanki "sunčev odraz" |
| logo | **DevLab** 126px, "Dev" bijel, "Lab" `#4DEAE0` |
| slogan | **Digitalna agencija** 38px, `#9AA0A8` |
| ispod | `@devlab.cc.cd` (teal 800) |
| dno | `www.devlab.cc.cd` (sivo 600) |

**Slogan promijenjen** — bila cijela recenica koja se citala kao podnaslov
clanka. Sada dvije rijeci, kao potpis brenda.

**Zasto kontinenti:** bez njih je to samo sivi luk. Planeta se prepoznaje
po kopnu i atmosferskom rubu. Kopno je blagi teal (ne zelena) da ostane
u brendu. Izmjereno: lijevo `[13,59,54]`, desno `[7,30,28]` (terminator).

**BUG:** prvi render imao je ravnu crnu pozadinu — gradienti `covGlow`/
`covGrid` su regexom upali u `brandMark` (pogresan `</defs>`), pa se nisu
definisali. Premjesteni u `defs` od `renderSlideSvg`.

**BUG:** slogan je preklapao logo (DevLab box y 145-313, slogan y 299-350)
jer `<text>` box nosi veliki line-height. Pomjereno na `cy + 58`, dalje
`cy + 126` i `cy + 164` — sada 0 preklapanja.

### PREMIUM objava — svi okviri uklonjeni

Korisnik: "ne svidja mi se okvir na postu ekskluzivnog sadrzaja".

**BUG: invertovana logika okvira.** U `renderSlideSvg` je stajalo:

```ts
${isCover || isBare ? "" : coverFrame(c)}   // POGREGSNO
```

To znaci: okvir se crta SVUDA OSIM na coveru — dakle bas na premium objavi
(koja nije cover) je uvijek bio. Ispravno:

```ts
${isCover && !isBare ? coverFrame(c) : ""}
```

**Chip kartice bez okvira** — u `premiumLayout` su imale `stroke` 1.5
(`stroke-opacity 0.22`). Uklonjen; ostala je samo svjetlija podloga.
Karuseli (p04, p06...) zadrzali su svoj okvir — provjereno.

### Ranije ove sesije

- FB cover kao objava `fbc01` (prva u /objave), format 16:9, `fixedFormat`.
- BUG: preuzimanje davalo 1080x1080 -> sada cita dimenzije iz `viewBox`.
- PREMIUM oznaka u /objave: znacka, teal okvir, filter "Premium".
- Preloader: "Dev Lab" -> "DevLab".
- p05–p10, p21–p24 sređeni; tri globalna buga (formFigure razmak,
  richLayer logo na zelenom, formHero items).

## Dev server

`npx vite --port 5173` (background, log: /tmp/vite.log)
http://localhost:5173/

## ⚠️ VAZNO: ID-evi NISU 1-2-3 po redu

| # | id | naslov |
|---|---|---|
| 1 | fbc01 | FB COVER (16:9) |
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
- px01: okvir 8px = false, tanak 0.30 = false, chip 0.22 = false.
- p04/p06 (karuseli): okvir 8px = true (zadrzan).
- FB naslovna: sve centrirano na cx=540, 0 preklapanja, max text y 476/628.
- Zemlja: fotorealisticna, horizont ~43% visine, gornji dio crn za logo.
- Preuzimanje: fbc01 -> PNG 1080x628.
- Planeta: kontinenti vidljivi, terminator lijevo/desno razlika potvrdjena.
- Preuzimanje: fbc01 -> PNG 1080x628.
- 71 slajd x 2 formata: 0 van kadra. tsc=0, build OK.

## Dev server

`npx vite --port 5173` (background, log: /tmp/vite.log)
http://localhost:5173/

## Sljedeći korak
- Otvoriti /objave: proveriti px01 bez okvira i fbc01 naslovnu.
- Preuzeti fbc01 (PNG 1080x628) i postaviti kao FB cover.
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
