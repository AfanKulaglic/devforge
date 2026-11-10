# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (40 objava: novi naslovi + domena u uglu)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### 1. Domena u donjem lijevom uglu — na SVIH 41 objavi
Prije je tu stajala kategorija ("PONUDA", "BREND") koja nista ne govori
covjeku koji gleda sliku. Sada stoji **www.devlab.cc.cd** u teal boji +
mala bijela strelica (17px), a kategorija je premjestena desno u istom redu,
blijeda (opacity 0.55) da ne konkurira.

Nova funkcija domainLine(c, category) u postRender.ts (~270).

### 2. Novi naslovi i tekstovi za svih 40 nepremium objava
Svi naslovi konkretniji — brojevi, rokovi, cijene. Npr:

| id | prije | sada |
|---|---|---|
| p01 | Bez predujma. Plaćate tek kada ste zadovoljni | **Ne plaćate ni marku dok svoj sajt ne vidite gotov.** |
| p02 | Stranice, aplikacije i igre koje pokreću Vaš biznis | **Stranica, shop, aplikacija ili igrica — sve na jednom mjestu.** |
| p03 | Stranica već od 150 KM | **Kompletna stranica za 150 KM. Bez skrivenih stavki.** |
| p05 | Četiri stvari koje radimo | **Četiri stvari koje radimo — i radimo ih dobro.** |
| p27 | Koliko traje razvoj projekta | **Koliko traje izrada? Evo tačnih rokova.** |
| p45 | sata dnevno dostupan AI recepcionar | **AI recepcionar koji nikad ne spava.** |
| p56 | skrivenih troškova u svakoj ponudi | **Nula skrivenih troškova. Cijena koju čujete je cijena koju plaćate.** |
| p57 | radnih dana do besplatne gotove verzije | **Pet radnih dana do besplatne gotove verzije.** |

Itemi su konkretizovani: "Stranice od 150 KM" → "Web stranica — od 150 KM",
"Stranice — 1-2 sedmice" → "Web stranica — 5 radnih dana", itd.

### Verifikacija
- 41 objava, **0 tekstova van kadra**, 0 console grešaka, tsc=0, build OK (1.820 kB).
- Domena prisutna na **41/41** objavi.
## Sljedeći korak
- Pregledati  — svi postovi imaju domenu u uglu i novi tekst.
- Ako neki naslov ne odgovara, to je jedan red u .
- Opciono: 4:5 format za Instagram feed.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
