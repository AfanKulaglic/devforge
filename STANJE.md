# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p03: crno/bijelo, bez nabrajanja)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p03 ("150 KM") — mijesane boje, nabrajanje uklonjeno
Korisnik: "rekao sam da nesto bude crno nesto bijelog fonta, ali izbrisi
nabrajanje ispod teksta i daj bolji tekst".

**1. Boje izmijesane** (formFigure):
- `150 KM` -> **crno** (#0A0A0A) u 3:4 formatu, kao sidro.
- Naslov i biljeska -> **bijelo** / bijelo 82%.
- Kontrast je jak: crn broj na teal podlozi, bijeli tekst oko njega.

**2. Nabrajanje uklonjeno** — cijeli `includes` blok iz `formFigure`
(i polje `includes` iz p03). Lista sa crticama je djelovala kao formular
i gusila je oglas.

**3. Tekst bolji i marketinski:**
- valueNote: "Dizajn, kod, domena i hosting — jedan trošak, bez dodataka.
  Gotova za 5 radnih dana, a platiti je trebate tek kad je vidite i kad vam
  se svidi."
- title: "Kompletna stranica za 150 KM. Plaćate tek kad je vidite."
  (prije: "Bez skrivenih stavki")

### BUG popravljen
Prored biljeske nije bio isti na sva tri mjesta: linija je racunala
(nfs+20), a tekst (nfs+16) — zadnja rijec je izlazila i gubila se
("svid" umjesto "svidi"). Sada svuda `(nfs + 20)` -> `NLH`.

### Verifikacija
- p03: 150 KM crno (#0A0A0A), naslov bijeli, bez liste, tekst cijeli.
- 41 objava x 2 formata: 0 van kadra, 0 console gresaka.
- tsc=0, build OK (1.822 kB).

## Sljedeći korak
- Pregledati p03 — crno "150 KM" + bijeli tekst.
- Ostali cjenovni postovi (p08, p09, p55, p56) mogu dobiti isti tretman.
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
