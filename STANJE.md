# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p03: vecina teksta CRNA, bijelo samo akcent)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p03 — boje okrenute: VISE crnog teksta
Korisnik: "ne svidja mi se, zelim da vise teksta bude crno a nesto bijelo".

U `formFigure` dodane dvije boje koje vaze SAMO na zelenoj podlozi:

| element | prije | sada |
|---|---|---|
| 150 KM (broj) | crno | **BIJELO** |
| naslov | bijelo | **CRNO** #0A0A0A |
| biljeska | bijelo 82% | **CRNO** rgba(10,10,10,0.72) |

Bijelo ostaje samo kao akcent: broj, eyebrow slogan i domena.
Time je vecina teksta crna (sto korisnik trazi), a bijelo nosi kontrast.

```ts
const onTeal = c.bg === "#4DEAE0" || c.bg === "#6FEFE6";
const headInk = onTeal ? "#0A0A0A" : c.ink;
const noteInk = onTeal ? "rgba(10,10,10,0.72)" : c.soft;
```

Na tamnoj paleti (dark/ink) nista se ne mijenja — tamo bi crni tekst bio
nevidljiv, pa naslov ostaje `c.ink` i biljeska `c.soft`.

### Verifikacija
- p03: naslov i biljeska crni, broj/slogan/domena bijeli (vision potvrdio).
- 41 objava x 2 formata: 0 van kadra, 0 console gresaka.
- tsc=0, build OK (1.822 kB).

## Sljedeći korak
- Pregledati p03 — vecina crno, bijeli akcent na broju.
- Ako neki drugi post ide na zelenu podlogu, koristiti paletu `tealwhite`
  i automatski dobija isti tretman (crni tekst, bijeli broj).
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
