# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-10 (p04: ikone centrirane, AGENCIJA vs DEVLAB)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)
### p04 — tri stvari

**1. "ne agenciju" vraceno u BIJELO.** `accentWords` je sada samo
`["DevLab"]`. Fraza "ne agenciju" je opet bijela kao ostatak naslova.

**2. Ikone na slajdu 4 centrirane po CIJELOM BLOKU.**
Prije: `pxIcon(icon, 0, baseline - IC*0.78, ...)` — vezano za baseline
LABELA, pa kad stavka ima biljesku ikona bjezi prema gore.
Sada: `iconMid = top + blockH / 2` → ikona centrirana na sredinu
(label + biljeska). Vision potvrdio centriranje u svim redovima.

**3. Slajd 5 (compare) — jasnije razdvojeno.**

| | prije | sada |
|---|---|---|
| lijevi header | "PRIJE" | **AGENCIJA** + X ikona |
| desni header | "POSLIJE" | **DEVLAB** + kvačica |
| headeri | samo tekst | ikona + tekst + linija ispod |
| visina headera | 76px | **74px + 14px padding** |

Kontrast ploha je ono sto razdvaja: AGENCIJA = tamna ploha (c.card) +
siv tekst + X; DEVLAB = puna zelena ploha (c.accent) + crn tekst + kvačica.

Naslov slajda: "Agencija ili DevLab? Stavka po stavku." (bio "Tipična
agencija i DevLab, stavka po stavku.")

Stavke preformulisane da su razlike jasnije i kraće:
- 50% unaprijed / Plaćate obećanje  ->  0 KM unaprijed / Plaćate tek na kraju
- 2–4 sedmice čekanja / Bez linka    ->  Gotovo za 5 dana / Link odmah
- Vidite tek finalno                 ->  Vidite prije plaćanja / Živa stranica
- Doplate na kraju                   ->  Cijene javne / od 150 KM

### Verifikacija
- Vision slajd 5: "clearly identify left as AGENCIJA and right as DEVLAB".
- Vision slajd 4: ikone centrirane sa blokom, bez pomjeranja.
- Naslov 1: samo "DevLab" zelen (lista tspan boja potvrdjena).
- 41 objava x 2 formata: 0 van kadra, 0 console gresaka.
- tsc=0, build OK.

## Sljedeći korak
- Pregledati p04 slajdove 1, 4 i 5 u 3:4.
- Ako neka stavka u compare treba drugaciji tekst — samo posts1.ts.
- Opciono: 4:5 format.

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
