# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p03: DevLab logo, ikone, vise teksta)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p03 — logo, ikone, vise teksta
Korisnik: "DevLab skupa treba pisati", "vise teksta", "ikone ako ima potrebe".

**1. Logo "DevLab"** — bio je vec jedna `<text>` sa dva `<tspan>`, ali su
bili RAZLICITE boje na zelenoj ("Dev" bijel, "Lab" crn) pa je izgledalo
kao dvije rijeci. Sada su OBA CRNA na zelenoj podlozi (`brandMark`).

**2. Tri ikone** u `formFigure` — nova opcija `features` na objavi:
`{ icon, label }[]`. Crta se jedan red ispod biljeske, bez kartica.
Za p03: `clock` 5 dana / `monitor` Mobitel i PC / `shield` Bez rizika.
Ikone i labele su CRNE na zelenoj (bile su bijele — nevidljive).

**3. Vise teksta:**
- valueNote: "Sve je uključeno — dizajn, izrada, domena, hosting i
  postavljanje. Nema sitnih slova ni doplata na kraju. Platite tek kad je
  stranica gotova i kad vam se svidi; ako ne — ne plaćate ništa."
- title: "...Plaćate tek kad je vidite gotovu." (dodano "gotovu")

**4. Slika 46% -> 36%** da tekst + ikone stanu iznad nje.

### BUG popravljen: ikone padale na sliku
`photoBot` je centrirao tekst u punu zonu, ne racunajuci 180px gradijent
kojim se slika gore stapa u zelenu. Ikone su zavrsavale ISPOD stvarne ivice
slike. Sada: `blend = 150`, a `y` se pomjera gore za `blend/2`.
Rezultat: ikone zavrsavaju na 865, slika pocinje na 922 (57px cisto).

### Verifikacija
- Vision potvrdio: logo "DevLab" citljiv, 3 crne ikone + crne labele.
- 41 objava x 2 formata: 0 van kadra, 0 console gresaka.
- tsc=0, build OK.

## Sljedeći korak
- Pregledati p03 — logo, ikone, tekst.
- `features` se moze dodati na bilo koju cjenovnu objavu (p08, p09, p55,
  p56) jednom linijom; ikone su iz PX_ICONS (clock, monitor, shield, bolt,
  chat, coin, layers, tools, rocket, game, web, shop, app, ai, check).
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
