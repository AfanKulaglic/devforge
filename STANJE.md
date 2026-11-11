# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p03 vracen na 5f985ca)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p03 vracen na stanje prije ikona (commit 5f985ca)
Korisnik je rekao da nije mislio ikone/tekst na p03 ("150 KM"), nego na
"onaj post gdje ide DevLab". Ja sam promjene (ikone, novi tekst, slika 36%)
NAPRAVIO na p03 — pogresan post. Vraceno komandom:

```
git checkout 5f985ca -- src/lib/posts1.ts src/lib/postRender.ts src/lib/postsData.ts
```

**Stanje p03 sada (kao na 5f985ca):**
- zelena podloga #4DEAE0, crn "150 KM", bijel naslov, crna biljeska
- slika 46% visine, pocinje na y=778
- BEZ reda ikona (features uklonjeno)
- originalni valueNote i title

### VAZNO
Opcija `features` i ikone su UKLONJENE iz koda vracanjem na 5f985ca.
Ako ikone trebaju na NEKU DRUGU objavu, treba ponovo dodati `features`
blok u `formFigure` (bio je u commit c875f8b, moze se vratiti selektivno).

### Verifikacija
- Vision: nema reda ikona, samo logo flask; slika velika (46%).
- 41 objava x 2 formata: 0 van kadra, 0 console gresaka.
- tsc=0, build OK.

## Sljedeći korak
- KORISNIK TREBA RECI KOJI JE TACNO POST "gdje ide DevLab" za ikone i
  vise teksta (p03 je bio pogresan).
- Kad se zna post: vratiti `features` blok iz commita c875f8b u
  `formFigure` i dodati `features` polje na tu objavu.
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
