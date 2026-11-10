# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (naslov puni sirinu, veci razmak od logotipa)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### Naslov puni sirinu + vise zraka od logotipa (3:4)
Korisnik: "pocni font naslova da se popuni prostora, naslov udalji malo
od logotipa na vrhu, gledaj da se ispuni fino taj prostor".

**Glavni uzrok (pronaden mjerenjem):** wrap() je koristio koeficijent
0.58 za sirinu slova, a stvarna sirina u ovom fontu je **0.451**. Zbog toga
je wrap mislio da u red stane manje znakova, lomio naslov prerano, i font
je morao biti manji da sve stane u 3 reda. Naslov je zato stajao na 88px
i punio samo 77% sirine.

Promjene u premiumLayout (postRender.ts):
- wrap() koeficijent zavisi od velicine: size >= 100 ? 0.46 : size >= 40 ? 0.50 : 0.58.
  0.46 je za 3:4 (naslov do 110px), 0.50 za 1:1 (88-104px), 0.58 za sitni tekst.
- Naslov trazi **najveci** font od 132px nanize (prije: start 88 i samo padao).
  Petlja ide kroz sve velicine i pamti najvecu koja stane (prelamanje se
  mijenja s velicinom pa prvi koji prodje nije uvijek najveci).
- titleBoxH = 490 (3:4) / 292 (1:1); MAX_LINES = 4 (3:4) / 3 (1:1).
- LOGO_GAP = 150 (3:4) / 92 (1:1) — naslov udaljen od logotipa.
- TITLE_INDENT = 25 (3:4) / 33 (1:1) — sira kolona u 3:4.
- Akcenat moze u 2 reda u 3:4 (prije 1 red je zakljucavao font na 88px).
- LEAD_GAP +40px u 3:4 da krupniji naslov ne dodiruje lead.

Rezultat 3:4: font **110px**, sirina **882/918 = 96%**, razmak od logotipa
47px, naslov-blok 490px, 0 preklapanja, 98px lufta do dna.

### Verifikacija
- 3:4: naslov 110px / 96% sirine, 0 preklapanja, dugmad na 1258+84.
- 1:1: naslov 104px / 91% sirine, 0 van kadra.
- 41 objava, 0 console gresaka, tsc=0, build OK (1.820 kB).
## Sljedeći korak
- Pregledati premium u 3:4 (/objave → 3:4) — naslov sad puni sirinu.
- Ako naslov treba jos krupniji, dizati titleBoxH (3:4) uz provjeru da ne udari u lead.
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
