# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (uklonjena kategorija iz donjeg desnog ugla)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### Uklonjena kategorija iz donjeg desnog ugla
Korisnik: "vidis li sto pise ponuda u donjem desnom uglu posta — obrisi to".

Prije: donji desni ugao je ispisivao kategoriju (PONUDA, BREND, SAVJET)
blijedim slovima. Ta rijec nista ne znaci onome ko gleda sliku na
Instagramu i samo je pravila sum.

Promjena u `domainLine()` (postRender.ts): uklonjen drugi `<text>` element.
Ostaje samo domena lijevo. Parametar `category` se vise ne koristi (`void`).

### Verifikacija
- 41 objava: kategorija vidljiva na **0** objava, domena na **41/41**.
- 0 van kadra, 0 console gresaka, tsc=0, build OK (1.820 kB).
- Vision: donji desni ugao prazan, domena lijevo.

## Sljedeći korak
- Pregledati /objave — donji ugao sad nosi samo domenu.
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
