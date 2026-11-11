# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p03: boje po elementima)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p03 ("150 KM") — boje po elementima
Korisnik je tacno odredio boju za svaki element. Stanje:

| element | boja | hex |
|---|---|---|
| podloga | zelena | #4DEAE0 |
| "150 KM" (broj) | ZELENA (tamnija) | #0E7A72 |
| "Kompletna stranica..." (naslov) | BIJELA | #FFFFFF |
| "Dizajn, kod, domena..." (biljeska) | CRNA | #0A0A0A |
| linija uz biljesku | CRNA | #0A0A0A |
| slogan gore + domena | BIJELA | #FFFFFF |

**Zasto #0E7A72 a ne BRAND #4DEAE0 za broj:** BRAND je ista boja kao
podloga, pa bi broj bio nevidljiv. #0E7A72 je tamnija zelena iste porodice
— kontrast 3.5:1, vidljivo ali jos uvijek "zeleno".

### Napomena o kontrastu (ne rijeseno)
Bijeli naslov na teal podlozi ima kontrast samo **1.48:1**. Cita se jer je
font 54px bold, ali je ispod WCAG minimuma (4.5:1). Ako korisnik zeli jaci
kontrast, opcije su: (a) tamnija podloga, (b) tamniji naslov, (c) debeli
tamni obrub slova. Nije mijenjano jer korisnik nije trazio.

### Verifikacija
- Oba formata: 0 objava van kadra, 0 console gresaka.
- Vision potvrdio sve 4 boje i crnu liniju.
- tsc=0, build OK.

## Sljedeći korak
- Pregledati p03 — zeleni broj, bijeli naslov, crna biljeska + crna linija.
- Ako bijeli naslov djeluje preslabo na zelenom, reci pa pojacam kontrast
  (tamnija podloga ili obrub slova).
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
