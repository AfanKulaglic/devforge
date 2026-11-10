# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (premium SEO + bogati sloj sa 7 varijanti za svih 40 objava)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### 1. Premium oglas px01 — SEO
- Caption dobio SEO blok na kraju: ključne riječi (izrada web stranice, web shop,
  aplikacije, Sarajevo, Tuzla, Zenica, Mostar, Banja Luka, Bihać), cijene (150/600 KM)
  i **25 hashtagova**.
- `tags[]` proširen na 18 (Instagram dozvoljava 30).
- Naslov/lead/dokazi/dugmad nepromijenjeni.

### 2. Bogati sloj za SVIH 40 ostalih objava
**Problem:** ostale objave su bile "jedna rečenica + praznina", premium je bio gust
sa ikonama. Ostale su čitale kao najava, ne kao reklama.

**Rješenje:** `richLayer()` u `postRender.ts` — zajednički rep koji svaka forma dobija:
```
[ CTA dugme ][ www.devlab.cc.cd ]   <- fiksno uz dno
✓ dokaz  ✓ dokaz  ✓ dokaz            <- iz `terms`
[ikone/raspored po varijanti]        <- iz `features`
```

**7 varijanti rasporeda** (polje `rich?: RichVariant` u `postsData.ts`), da svaki post
ne izgleda isto:

| varijanta | izgled | korištena na |
|---|---|---|
| `chips` | kartice kao premium (podrazumijevano) | usluge, shop, kod |
| `inline` | lista sa linijom iznad, ikona+label+✓ | proces, koraci, timeline |
| `duo` | 2×2 velike ikone sa labelom desno | poređenja, parovi |
| `list` | kružić iza ikone, vertikalna lista | pitanja, beneficije |
| `bigtwo` | ogromne ikone (120px), label ispod | 2 jaka argumenta |
| `band` | **puna accent traka** sa ikonama | cjenovni/agresivni postovi |
| `none` | bez ikona — samo dokazi + dugmad | postovi već dovoljno jaki |

Raspodjela: band 5, chips 5, bigtwo 4, duo 4, inline 6, list 4, none 7.

### 3. Popravljeni bugovi (3 ista uzroka — polja se nisu prenosila)
- `site: post.site` u `renderPostSlides` single-slide objekat.
- `rich: post.rich` isto.
- **Najveći:** `PLACE[layout]` dobija `slide`, a ne `post` — pa su `features/terms/cta/rich`
  nestajali. Dodato `richSlide` spajanje u `renderSlideSvg` (~1281).
- Foto-layouti (`photoBg`, `photoTop`, `photo`, `stamp`) nisu zvali `richLayer` — dodato.
- Forma iznad repa se **skalira** (`scale(1, availH/b.h)`) da ne preklopi rep.

### 4. Verifikacija
- 41 objava, **0 tekstova van kadra**, 0 console grešaka, tsc=0, build OK.
- 34 objave imaju dugmad (ostalih 7 su multi-slide galerije).
- 0 preklapanja preko accent trake.

## Sljedeći korak
- Pogledati `/objave` i proći kroz varijante — po potrebi zamijeniti `rich:` vrijednost
  pojedinog posta (jedno polje, jedan red).
- Opciono: 4:5 format za Instagram feed.
- Opciono: skinuti `devlab.publicvm.com` sa Vercela.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) je danas padao ~50% poziva — tada mjeriti geometrijski
  (`getBoundingClientRect`, `maxRectBottom`).
- `postRender.ts` `wrap()` lomi po širini znakova; naslovi sa akcent-frazom koriste
  `accentPhrase` split da akcent red uvijek počne cijelom frazom.
