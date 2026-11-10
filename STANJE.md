# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p01 "0 KM": vise teksta i bolji razmak)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p01 ("0 KM") — vise teksta i bolji razmak
Korisnik: drugi post ("0 KM") treba vise teksta i bolji razmak.

`formFigure` prepravljen (postRender.ts):
- **Biljeska** (`valueNote`): 2 reda u 1:1, **3 u 3:4**, sa akcenat-linijom
  lijevo (prije: samo goli tekst bez linije).
- **Naslov**: 3 reda u 1:1, **4 u 3:4**, sa provjerom da nijedna rijec ne
  nestane (`whole()` — isti bug kao u formHero, wrap tiho reze rijeci).
- **Prored naslova 1.34** — bb visine slova je ~1.33*font, pa je 1.22 i
  1.24 davalo preklapanje redova (mjer eno: 782 vs 776).
- **Razmaci se racunaju iz formata**: broj->naslov 104 (3:4) / 52 (1:1),
  naslov->biljeska 90 / 44.
- Prored biljeske (nfs + 20) — prije (nfs + 16) su se redovi dodirivali.

Tekst p01 prosiren (posts1.ts): valueNote sada objasnjava cijeli mehanizam
— napravimo pa pokazemo pa tek onda placanje, bez avansa i ugovora.

### Verifikacija
- 3:4: broj 340-620, naslov 699-859, biljeska 942-1098.
  Razmaci 79 / 83 px (ujednaceni), 0 preklapanja.
- 1:1: tekst 237-846, domena 952, 0 preklapanja.
- 41 objava u oba formata: 0 van kadra, 0 console gresaka.
- tsc=0, build OK (1.822 kB).

## Sljedeći korak
- Pregledati p01 ("0 KM") u oba formata.
- Ostali broj-postovi (p45 24/7, p56 0, p57 5) koriste isti formFigure —
  provjeriti da im tekst nije kratak za 3 reda u 1:1.
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
