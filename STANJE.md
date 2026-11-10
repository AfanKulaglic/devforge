# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p02: AI u naslovu, wrap ne gubi rijeci)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p02 — AI sistemi u naslovu, stari stil vracen
Korisnik: lista/nabrajanje mu se ne svidja — trazio vracanje starog stila
uz AI sisteme spomenute u naslovu.

- p02 vracen na stari hero stil (template "title"), bez items liste.
- Naslov: "Stranica, shop, aplikacija, igrica ili AI sistem — sve na jednom mjestu."
- Subtitle skracen da stane bez odsjecanja.

### BUG (ozbiljan): wrap() je TIHO gubio rijeci
wrap(text, size, W, maxLines) odbacuje rijeci koje ne stanu u dozvoljen
broj redova — bez ijedne greske. Zbog toga je iz naslova nestajalo
"jednom mjestu", a iz podnaslova "shopove, aplikacije, igrice".

Popravak u formHero (postRender.ts):
- fitsWhole() poredi broj rijeci u linijama sa brojem rijeci u naslovu.
- Dok se ne poklope, font se smanjuje za 4px (prije: nije bilo provjere).
- MAXL = 4 reda u 3:4 / 3 u 1:1.

### Verifikacija
- p02 3:4: naslov 100px, 4 reda, SVE rijeci prisutne, 390-883px,
  lead 926 (43px zraka), 0 preklapanja.
- 41 objava u 1:1: 0 van kadra, 0 console gresaka, tsc=0, build OK.

## Sljedeći korak
- Pregledati p02 u 3:4 — AI sistemi su sad u naslovu.
- Ako jos neki naslov izgleda odsjeceno: to je wrap() — provjeriti broj rijeci.
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
