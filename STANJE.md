# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p04: vise teksta + ikone na svim slajdovima)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p04 "Zašto firme biraju Dev Lab" — vise teksta + ikone
Korisnik: "p04 napravi da ima vise teksta i da svaka slika u galeriji
bude sa vise teksta i ikone dodaj ali na prava mjesta".

**p04 ima 5 slajdova (karusel), svi napunjeni:**

1. **COVER** — naslov, lead od 3 recenice (sa akcenat trakom), 3 najave
   sa ikonama: coin "0 KM unaprijed", clock "Gotovo za 5 radnih dana",
   shield "Cijene javne".
2. **0 KM** — prosiren valueNote (objasnjava mehanizam placanja).
3. **5 dana** — valueNote sa rasporedom po danima (1. dan struktura,
   3. dan ziva stranica, 5. dan gotova; shop 10 dana).
4. **LIST** — 4 stavke, svaka sa IKONOM + label + siva biljeska ispod:
   layers "Dizajn i struktura", monitor "Mobilna verzija",
   tools "Admin panel", check "4 besplatne revizije".
5. **COMPARE** — PRIJE/POSLIJE, svaki red sa X ili kvačicom + biljeska:
   4+4 stavke sa objasnjenjima (npr. "0 KM unaprijed — ništa ne
   plaćate do kraja").

### Kod — nove stvari
- `PostItem` tip: string | { icon?, label, note? } u postsData.ts.
- `formBlocks` (list): podrzava objekte, ikona lijevo + note ispod.
- `formCover`: lead sa akcenat trakom + najave sa ikonama.
- `formDuo` (compare): redovi sa X/kvačicom ikonom + note, visi redovi.
- `PX_ICONS.x` nova ikona (X).

### BUGOVI POPRAVLJENI (gubljenje rijeci)
- `wrap()` sa maxLines TIHO odbacuje rijeci. Lead, valueNote i najave su
  se odsijecali na pola recenice. Svuda dodat shrink-loop koji smanjuje
  font dok BROJ RIJECI nije kompletan (prije se provjeravalo samo `whole`
  koje gleda prvi red).
- valueNote: MAXN 6 (3:4) / 5 (1:1), font do 20px.

### Verifikacija
- Svih 5 slajdova: 0 odsjecenih tekstova, ikone 3/0/0/4/8, sve u kadru.
- Vision proverio: cover lead cijeli, 0KM biljeska cijela ("prema nama."),
  lista ikone+note, compare X/kvačica+note.
- 41 objava x 2 formata: 0 van kadra, 0 console gresaka.
- tsc=0, build OK.

## Sljedeći korak
- Pregledati p04 u 3:4 (otvoriti karusel, svi slajdovi).
- Ostali karuseli (p06, p07...) mogu dobiti isti tretman: items objekti
  sa {icon,label,note} - radi automatski.
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
