# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (12 varijanti — 30 objava BEZ ikona)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### 12 varijanti bogatog sloja — 30 od 40 objava BEZ ikona
Korisnik: "svi postovi imaju ikonice, dosadno, ponavlja se isti dizajn".
Dodato 5 novih varijanti BEZ ikona ( RichVariant):

| varijanta | izgled |
|---|---|
|  | ogroman broj (210-250px) dominira, bez ikona |
|  | veliki citat sa akcent linijom lijevo |
|  | dvije kolone PRIJE | POSLIJE |
|  | numerisani redovi 01 02 03 sa linijama |
|  | nista osim dokaza i dugmadi |

Sa ikonama ostalo SAMO 10: (3) (3) (3) (1).

### Popravljeni bugovi
- **Vertikalno skaliranje je gazilo naslove** ( na 4 mjesta: buildRich,
  buildFitting, photo, photoTop). Sad  — proporcionalno.
-  sa 4 ikone zauzimao 372px i preklapao naslov → IC 120→72.
- Dodano polje  u PostSlide/AdPost.

### Verifikacija
- 41 objava, **0 tekstova van kadra**, 0 console gresaka, tsc=0, build OK.
## Sljedeći korak
- Pogledati `/objave` i proći kroz varijante — po potrebi zamijeniti `rich:` vrijednost
  pojedinog posta (jedno polje, jedan red).
- Opciono: 4:5 format za Instagram feed.
- Opciono: skinuti `devlab.publicvm.com` sa Vercela.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) je danas padao ~50% poziva — tada mjeriti geometrijski
  (`getBoundingClientRect`, `maxRectBottom`).
- `postRender.ts` `wrap()` lomi po širini znakova; naslovi sa akcent-frazom koriste
  `accentPhrase` split da akcent red uvijek počne cijelom frazom.
