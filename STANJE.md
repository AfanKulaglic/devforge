# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p04: DevLab zeleno, kraci lead)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p04 — DevLab skupa + zeleni akcent + kraci lead
Korisnik trazi: "DevLab se pise skupa", "DevLab i agenciju u zelenoj boji",
"na prvom slajdu je previse teksta, skrati".

**1. "Dev Lab" -> "DevLab"** na sva tri mjesta: title objave, cover naslov,
compare naslov.

**2. Nove zelene rijeci u naslovu** — polje `accentWords` na slideu:

```ts
title: "Zašto firme biraju DevLab, a ne agenciju.",
accentWords: ["DevLab", "agenciju"],
```

`formCover` dijeli naslov na `<tspan>` dijelove: svaki match dobija
`fill=c.accent` = BRAND #4DEAE0, ista zelena kao svuda. Case-insensitive.

**3. Lead skracen** sa tri recenice na dvije:

prije: "Agencija traži 50% unaprijed i naplati prije nego što vidite ijedan
piksel. Mi radimo obrnuto: prvo napravimo stranicu, pokažemo vam je na pravom
linku — i tek onda razgovaramo o novcu. Ako vam se ne svidi, ne plaćate ništa
i nemate nikakvu obavezu."

sada: "Agencija traži 50% unaprijed, prije nego što vidite ijedan piksel. Mi
radimo obrnuto — prvo napravimo stranicu i pokažemo vam je na pravom linku.
Ako vam se ne svidi, ne plaćate ništa."

### Napomena
Polje `accentWords` radi na svakom cover slajdu — dovoljno dodati niz
rijeci. Regex escape je rucno popravljen jer je bash pojeo `$&`.

### Verifikacija
- Vision: "DevLab" i "agenciju" zeleni #4DEAE0, ostatak bijeli.
- "DevLab" citljiv kao jedna rijec na slajdu 1 i 5.
- 41 objava x 2 formata: 0 van kadra, 0 console gresaka.
- tsc=0, build OK.

## Sljedeći korak
- Pregledati p04 slajd 1 u 3:4 — zelene rijeci + kraci lead.
- `accentWords` se moze dodati na druge cover slajdove (p06, p07).
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
