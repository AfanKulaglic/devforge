# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p04: "ne agenciju" zeleno, vece ikone)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p04 — "ne agenciju" zeleno + vece ikone u listi

**1. Zeleno "ne agenciju"** (korisnik htio frazu, ne samo rijec):
```ts
accentWords: ["DevLab", "agenciju", "ne"],
```
Fraza "ne agenciju" se NE MOZE matchovati kao jedan string jer wrap()
lomi naslov na redove — "ne" zavrsi na prvom redu, "agenciju." na drugom.
Zato su to dvije odvojene akcent rijeci; oba <tspan> dobiju #4DEAE0.

**2. Ikone u listi povecane** (formBlocks):

| | prije | sada |
|---|---|---|
| IC (3:4) | 44px | **80px** |
| IC (1:1) | 38px | **70px** |
| stupac ikone | 66px | **108px** |

Stvarna velicina crteza je ~60px (pxIcon crta u tintama unutar boxa, ne
cijeli box) — prije je bila 46px. Razmak ikona-tekst 90px, bez preklapanja.

### Verifikacija
- Vision: "ne", "agenciju" i "DevLab" zeleni u naslovu.
- Vision: ikone 50–70px, razmak do labela 90px, bez preklapanja.
- 41 objava x 2 formata: 0 van kadra, 0 console gresaka.
- tsc=0, build OK.

## Sljedeći korak
- Pregledati p04 slajd 1 i 4 u 3:4.
- Ikone u listi se dalje mogu povecati mijenjajuci 80/70 u formBlocks.
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
