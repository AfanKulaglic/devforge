# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p08: ikone u price layoutu, popravljen preklop broj/naslov)

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
Tekst zavrsava x=560, slika pocinje 750.

**BUG a)** biljeska ispod drugog reda labela — `noteTop` iz `lastLabelBottom` + 14.
**BUG b)** `wrap(note,...,2)` odbacivao rijeci — shrink-loop do 3 reda.
**BUG c)** `minRow` 64 -> 186/158.  **BUG d)** skript ostetio komentar u `renderSlideSvg`.

### p06 — karusel dobio život (6 slajdova)

Svih 6: subtitle + 4 stavke `{icon, label, note}`. Cover: naslov + lead + 4 ikone.
CTA: lead + 3 dokaza + dugme.

**`formCover`**: `slice(0, 3)` -> `slice(0, SIZE_H >= 1300 ? 4 : 3)` —
cover je govorio "cetiri usluge" a prikazivao tri.
**`formAction`**: sada crta `lead` (accent traka) i 3 dokaza iznad dugmeta.

### p07 — bez okvira, ikone, krací naslov

`layout: "band"` -> `"center"` — band je crtao `stroke 1.5` okvir koji je
korisnik odbio ("ružno je"). Naslov bio odsjecen ("...bez") ->
**"Sve što vaš projekat treba. Bez doplata."** Lista: 4x `{icon, label, note}`
(tools/monitor/coin/shield) + subtitle.

### p08 — ikone u cjenovnim slajdovima (5 slajdova)

| slajd | dodano |
|---|---|
| 1 cover | lead + 3 ikone (web/shop/shield) |
| 2 Stranice 150 KM | 4 ikone: layers/monitor/chat/tools |
| 3 Shopovi 600 KM | 4 ikone: shop/coin/monitor/check |
| 4 Aplikacije Dogovor | 4 ikone: app/tools/ai/rocket |
| 5 U svakoj cijeni | 4x `{icon,label,note}` + subtitle |

**`formFigure` sada crta `items`** kao grid 2x2 ispod biljeske
(`IC` 32/29, `rowH` 56/50, `colW = W_MUT/2`).
Prije su cjenovni slajdovi imali samo broj + naslov + jednu recenicu.

### BUG POPRAVLJEN (vazan)
**Preklop broj / naslov u `formFigure`.**
Razmak je bio `h += tall ? 8 : 52` — u 3:4 samo **8px**. Veliki broj
(150-260px) ima donju ivicu na `h`, a naslov pocinje na `h + ts*0.78`, pa je
izmedju njih bilo bukvalno nula zraka. "150 KM" se preklapalo sa
"Landing ili korporativna".
Sada: `h += tall ? 44 : 52`. Izmjereno ~75-80px razmaka na slici.

### Verifikacija
- p08: 5 slajdova, ikone 3/4/4/4/4, 0 preklapanja, svi y 1344/1440.
- Geometrija (bounding box): 0 preklapanja na S2/S3/S4.
- 70 slajdova x 2 formata: 0 van kadra.
- tsc=0, build OK.

## Sljedeći korak
- Pregledati p08 u 3:4 i 1:1.
- p09 (cijene) i ostali mogu dobiti isti `{icon,label,note}` tretman.
- `band` layout vise nigdje ne koristi okvir — kandidat za brisanje iz koda.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
