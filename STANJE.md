# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p03: slika povecana)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p03 ("150 KM") — SLIKA POVECANA I PODIGNUTA
Korisnik: "podigni sliku prema gore da je rasiris, sada je previse mala".

U `photoBot` layoutu (postRender.ts):

| | prije | sada |
|---|---|---|
| visina slike 3:4 | 38% | **46%** |
| visina slike 1:1 | 38% | **42%** |
| slika pocinje na y | ~1130 | **778** |
| praznina tekst->slika | ~250px | **60px** |

**Centriranje:** dodat `blend = 60` — zona teksta se skracuje za blend
posto se slika gore rastvara u zelenu preko gradijenta. Bez toga je tekst
bio centriran previsoko i ostajalo je 250px prazne zelene.

Rezultat: tekst zauzima ~55%, slika ~45%. Vision potvrdio da slika
"feels large enough as a supporting image".

### Verifikacija
- Oba formata: 0 objava van kadra, 0 console gresaka.
- tsc=0, build OK.

## Sljedeći korak
- Pregledati p03 — slika 46% visine, tekst iznad nje.
- Ako treba jos veca/manja slika: mijenjati 0.46 u photoBot.
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
