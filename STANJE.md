# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p03: konacne boje)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p03 ("150 KM") — KONACNE BOJE

| element | boja | hex |
|---|---|---|
| podloga | zelena | #4DEAE0 |
| "150 KM" (broj) | **CRNA** | #0A0A0A |
| "Kompletna stranica..." (naslov) | **BIJELA** | #FFFFFF |
| "Dizajn, kod, domena..." (biljeska) | **CRNA** | #0A0A0A |
| linija uz biljesku | **CRNA** | #0A0A0A |
| slogan gore + domena | BIJELA | #FFFFFF |

Prvo sam broj stavio u tamnozelenu #0E7A72, jer sam mislio da korisnik
zeli zelenu. Korisnik je rekao "10 km nije crne boje?" -> broj mora biti
CRN. Sada je #0A0A0A, potvrdjeno mjerenjem piksela: (10,10,10).

### Napomena o kontrastu
Bijeli naslov na teal podlozi ima kontrast **1.48:1** (WCAG min 4.5:1).
Cita se jer je 54px bold, ali je slabo. Ako korisnik trazi jace: tamnija
podloga, tamni naslov, ili obrub slova.

### Verifikacija
- Vision potvrdio sve 4: broj crn, naslov bijel, biljeska crna, linija crna.
- Piksel-mjerenje: "150 KM" zona dominantna #0A0A0A.
- 41 objava x 2 formata: 0 van kadra, 0 console gresaka.
- tsc=0, build OK.

## Sljedeći korak
- Pregledati p03 — crn broj, bijel naslov, crna biljeska + crna linija.
- Ako je bijeli naslov preslab na zelenom, reci pa pojacam kontrast.
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
