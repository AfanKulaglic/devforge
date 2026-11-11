# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p05: detaljan opis, bez crtica, tekst ne ulazi u sliku)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p05 — detaljniji opis, bez crtica, tekst ne prelazi na sliku

**1. Tekst ne prelazi na sliku** (layout `photo`).
Prije je `build()` radio sa punom sirinom W=944, pa su dugacke stavke
ulazile u desnu zonu gdje je fotografija. Sada:

```ts
const fadeW = 70;
const textW = SIZE - imgW - fadeW - M - 34;
const b = buildNarrow(c, p, total, textW);
```

`buildNarrow()` privremeno smanjuje modul-level `W_MUT` (koji su sve forme
pocele koristiti umjesto `W`), izgradi blok, pa vrati u `finally`. Tako nijedna
forma nije morala dobiti novi parametar sirine.

**2. Nema crtica.** Sve stavke p05 imaju `icon` — crtica se crta samo kad
stavka nema ikonu. Ikone: web, game, app, ai.

**3. Detaljniji opis** — svaka stavka sada ima `label` + `note`:

| label | note |
|---|---|
| Web stranice i shopovi | Od predstavljanja do prodaje. Gotovo za 5 dana, od 150 KM. |
| 2D igrice za web i mobilne | Od jednostavnih do obrazovnih — po vašoj mjeri. |
| Mobilne aplikacije | Jedan tim, obje platforme. Od ideje do trgovine. |
| AI chat i recepcionar 24/7 | Prima pozive i bilježi narudžbe — bez vas. |

Dodan i `subtitle`: "Ne radimo sve. Radimo četiri stvari i svaku do kraja."
(`formBlocks` prije nije crtao subtitle — sada crta.)

### BUGOVI POPRAVLJENI
**a) Biljeska se crtala IZNAD drugog reda labela.** y je bio
`baseline + fs*0.30 + 12`, a drugi red labela je `baseline + (fs+8)` —
biljeska je ulazila u drugi red. Sada: `lastLabelBottom = baseline +
(lines.length-1)*(fs+8)`, biljeska 14px ispod.

**b) Biljeske su se odsijecale** — `wrap(note, nfs, avail, 2)` odbacuje
rijeci preko 2 reda. Sada shrink-loop do 3 reda / font 18px.

**c) minRow je bio 64px** — premalo za ikonu + label + biljesku. Sada 186
(3:4) / 158 (1:1).

**d) Skript za W→W_MUT ostetio komentar** u `renderSlideSvg` (pojeo
backtick sadrzaj). Popravljeno rucno.

### Verifikacija
- Vision: sve 4 stavke potpune, nista odsjeceno, tekst ne dira sliku ni domenu.
- Mjereno: najveci x teksta 560, slika pocinje na 750. Tekst zavrsava 1241,
  domena na 1312.
- 41 objava x 2 formata: 0 van kadra, 0 console gresaka.
- tsc=0, build OK.

## Sljedeći korak
- Pregledati p05 u 3:4.
- `photo` layout sada ima `buildNarrow` — drugi postovi s tim layoutom
  automatski dobijaju uzu tekst zonu.
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
