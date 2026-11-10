# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (premium uređen; ostali postovi vraćeni na original)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### VRAĆENO — ostali postovi su opet original
Korisnik je tražio da se vrati stanje **prije** diranja ostalih 40 objava
(ikone/dokazi/dugmad/12 varijanti su mu bila previše — "dosadno, isti dizajn").

`git checkout 834ac0d -- posts1.ts posts2.ts posts3.ts postsData.ts postRender.ts`

Rezultat:
- **premium (px01)** — ostaje uređen, sa CTA dugmadima, ikonama usluga, dokazima i SEO-om
- **ostalih 40 objava** — originalni dizajn, bez ikona/dokaza/dugmadi

### Stanje premium oglasa (px01) — finalno
- Naslov: "Vaš biznis online. / Za 5 dana. / Bez plaćanja unaprijed." (zadnji red teal,
  lomi se PO REČENICAMA).
- Lead: "Prvo vidite gotov rezultat pa platite. Ne svidi li se, ne plaćate ništa i nemate
  nikakvu obavezu."
- 5 usluga sa velikim ikonama (web, shop, app, igrice, AI).
- 3 dokaza sa kvačicama.
- **Dugmad:** "JAVITE NAM SE NA INSTAGRAMU" (puni teal) + "www.devlab.cc.cd" (outline,
  bijeli kursor IZA teksta, CUR=24, centrirano 104/102px).
- **SEO:** blok ključnih riječi u captionu (izrada stranica, web shop, Sarajevo, Tuzla,
  Zenica, Mostar, Banja Luka, Bihać, cijene 150/600 KM) + 25 hashtagova; `tags[]` = 18.
- Caption: link `www.devlab.cc.cd` na vrhu, CTA na dnu.

### Verifikacija
- 41 objava, 0 tekstova van kadra, 0 console grešaka, tsc=0, build OK (1.818 kB).

## Sljedeći korak
- Pregledati `/objave` — premium uređen, ostali vraćeni na original.
- Ako se opet želi bogatiji dizajn ostalih: raditi POSTEPENO, po 2-3 posta, uz odobrenje.
- Opciono: 4:5 format za Instagram feed.
- Opciono: skinuti `devlab.publicvm.com` sa Vercela.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
