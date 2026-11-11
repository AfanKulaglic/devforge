# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p06: karusel dobio život — ikone, opisi, lead na CTA)

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
su pocele koristiti `W_MUT` umjesto `W` (34 zamjene), pa nijedna nije morala
dobiti novi parametar sirine. Tekst zavrsava na x=560, slika pocinje na 750.

**BUG a)** biljeska se crtala IZNAD drugog reda labela — `noteTop` se sada
racuna iz `lastLabelBottom = baseline + (lines-1)*(fs+8)` + 14.
**BUG b)** `wrap(note, nfs, avail, 2)` tiho odbacivao rijeci — shrink-loop
do 3 reda / font 18px.
**BUG c)** `minRow` 64 -> 186 (3:4) / 158 (1:1).
**BUG d)** skript za `W→W_MUT` ostetio komentar u `renderSlideSvg`.

### p06 — karusel dobio život (6 slajdova)

Prije: svaki slajd je bio gola lista od 4 rijeci, bez ikona i bez objasnjenja.
Sada svaki ima subtitle + 4 stavke kao `{icon, label, note}`:

| slajd | tema | ikone |
|---|---|---|
| 1 | cover — "Cetiri usluge. Vecina klijenata uzme dvije." + lead | web, game, app, ai |
| 2 | Stranice i shopovi | web, monitor, shop, tools |
| 3 | 2D igrice | bolt, layers, game, check |
| 4 | Mobilne aplikacije | app, tools, chat, rocket |
| 5 | AI asistenti | ai, chat, layers, clock |
| 6 | CTA + lead + 3 dokaza | web, shop, shield |

### IZMJENE U RENDERU

**1. `formCover` — 4 stavke umjesto 3.**
Bio je `slice(0, 3)` fiksno, pa je cover govorio "cetiri usluge" a prikazivao
tri. Sada `slice(0, SIZE_H >= 1300 ? 4 : 3)` — 4 u 3:4, 3 u 1:1.

**2. `formAction` (CTA) — sada crta `lead` i `items`.**
Prije samo naslov + dugme, djelovalo prazno. Dodano:
- `lead` — recenica uz vertikalnu accent traku (shrink-loop za sve rijeci)
- 3 dokaza sa ikonom iznad dugmeta (`IC` 38/34, `rowH` 62/56)
- fallback na `subtitle` ako `lead` ne postoji

Dugme ostaje zadnje — oko ga vidi kao zadnju stvar, dokazi idu PRIJE njega.

### Verifikacija
- 3:4: 6 slajdova, nula preklapanja, ikone 4/4/4/4/4/3.
- 1:1: 6 slajdova, svi unutar kadra (y 984 / 1080).
- Vision: cover 4 stavke, lista 2 sve 4 potpune, CTA pun i balansiran.
- tsc=0, build OK.

## Sljedeći korak
- Pregledati p06 u 3:4 (6 slajdova).
- Isti `{icon,label,note}` tretman za p07 i ostale karusele.
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
