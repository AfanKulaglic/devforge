# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p07: bez okvira, ikone + opisi, naslov skracen)

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

`buildNarrow()` privremeno smanjuje modul-level `W_MUT` na tekst zonu
(`SIZE - imgW - fadeW - M - 34`), izgradi blok, vrati u `finally`. Sve forme
su pocele koristiti `W_MUT` umjesto `W` (34 zamjene). Tekst zavrsava x=560,
slika pocinje 750.

**BUG a)** biljeska se crtala IZNAD drugog reda labela — `noteTop` iz
`lastLabelBottom` + 14.  **BUG b)** `wrap(note,...,2)` odbacivao rijeci —
shrink-loop do 3 reda.  **BUG c)** `minRow` 64 -> 186/158.  **BUG d)** skript
za `W→W_MUT` ostetio komentar u `renderSlideSvg`.

### p06 — karusel dobio život (6 slajdova)

Svih 6 slajdova: subtitle + 4 stavke kao `{icon, label, note}`.
Cover: naslov + lead + 4 ikone. Liste 2-5: web/monitor/shop/tools,
bolt/layers/game/check, app/tools/chat/rocket, ai/chat/layers/clock.
CTA: lead + 3 dokaza (web/shop/shield) + dugme.

**`formCover`**: `slice(0, 3)` -> `slice(0, SIZE_H >= 1300 ? 4 : 3)` —
cover je govorio "cetiri usluge" a prikazivao tri.
**`formAction`**: sada crta `lead` (accent traka + shrink-loop) i 3 dokaza
sa ikonom IZNAD dugmeta.

### p07 — bez okvira, ikone, kraći naslov

Prije: `layout: "band"` crtao je `stroke 1.5` okvir oko cijelog bloka
(korisnik: "izbaci ovaj border, ruzno je"). Sad `layout: "center"` — bez
okvira, sadrzaj slobodno stoji na podlozi.

Naslov je bio odsjecen: "...ukljuceno u cijenu, bez" (nedostajalo "doplata").
Sada: **"Sve što vaš projekat treba. Bez doplata."**

Lista 4 stavke sa ikonom + opisom (prije gola lista sa crticama):

| ikona | label | note |
|---|---|---|
| tools | API i integracije | Povezivanje s CRM, ERP i dostavnim službama. |
| monitor | Admin panel | Sami mijenjate tekstove, slike i proizvode. |
| coin | Plaćanje karticom | Kartice i PayPal — novac ide direktno vama. |
| shield | Domena, email i SSL | Postavljamo ih, a plaćate provideru bez naše marže. |

Dodan `subtitle`: "Stranica nije samo dizajn. Ovo ide uz nju, bez doplate."

### Verifikacija
- p07: border nestao, naslov cijeli, 4 ikone, 0 preklapanja, y 1344/1440.
- 70 slajdova x 2 formata: 0 van kadra.
- tsc=0, build OK.

## Sljedeći korak
- Pregledati p07 u 3:4 i 1:1.
- Isti tretman za p08 (cijene) i ostale.
- `band` layout vise nigdje ne koristi okvir — provjeriti da ga ni jedan
  drugi post ne koristi (sada: nijedan).

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
