# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažurirano: 2026-11-11 (kontakt forma salje direktno + admin tab Poruke)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`, stilovi `src/index.css`.
- Brend: **Dev Lab** (wordmark **DevLab**), teal `#4DEAE0`. Valuta KM.
- Produkcija: `https://devlab.cc.cd` (zaštićeni identifikator — ne mijenjati).
- Kontakt: `kontakt@devlab.cc.cd`, `@devlab.cc.cd`, `+387 62 576 456`.
- Admin: `/admin`, login `afan` / `080513` (sessionStorage `devforge-admin-session`).
- Dev server: `npm run dev` → http://localhost:5173/
- Build ponekad padne na OOM → `NODE_OPTIONS=--max-old-space-size=4096 npm run build`.

## Gotovo (ova sesija)

### KONTAKT FORMA — salje direktno, bez otvaranja mejla

Korisnik: "zatrazi gotovu verziju ukuca se poruka onda se korisnik
preusmjeri na mail — mozes li da on posalje meni tu poruku bez da mu
otvara mail".

**Problem prije:** `submitMail` je radio `window.location.href = mailto:`.
To otvara korisnikov mejl klijent. Na telefonu pola ljudi nema podesen
mail klijent — poruka se NIKAD ne posalje, a korisnik misli da jeste.

**Sada:** `submitInquiry` salje na `/api/inquiry` (Brevo), nista se ne
otvara. Korisnik klikne "Posalji" i vidi "Poruka je poslana".

| fajl | sta radi |
|---|---|
| `api/inquiry.ts` | NOVO — prima poruku, salje mail na `kontakt@devlab.cc.cd` |
| `src/lib/inquiries.ts` | NOVO — tip `Inquiry` + localStorage + fetch |
| `src/AdminMessagesTab.tsx` | NOVO — tab "Poruke" u adminu |
| `src/App.tsx` | `submitMail` -> `submitInquiry`, honeypot, stanja |
| `src/AdminPanel.tsx` | tab "Poruke" + badge neodgovorenih |

**`api/inquiry.ts` sigurnost:**
- primalac FIKSNI (`kontakt@devlab.cc.cd`) — ne moze se poslati nikome drugom
- `replyTo` = korisnikov email (ako ga ostavi), pa "Odgovori" ide njemu
- rate limit 6/10min po IP, honeypot `website`, duzine se sijeku, HTML escape
- bez `BREVO_API_KEY` vraca 404 -> klijent samo sacuva lokalno, bez greske

**Forma izmjene (`App.tsx`):**
- polje "Telefon" -> **"Telefon ili email *"** (obavezno, jedno ili drugo)
- honeypot input `name="website"` (skriven, botovi ga popune)
- stanja `sent` / `sending` / `sendError` umjesto `mailOpened`
- uspjeh: "Poruka je poslana" + ponuda da pisu na mejl ako je hitno

### ADMIN TAB "PORUKE"

- Lista upita, najnoviji prvi. Kartica: ime, kontakt, usluga, budzet,
  poruka, "NOVO" oznaka dok nije odgovoreno.
- Dugmad: **oznaci odgovoreno** (check), **kopiraj**, **obrisi** (uz potvrdu).
- Akcije: **Odgovori mejlom** (mailto, samo ako je kontakt email),
  **Pozovi** (tel, ako je broj), **WhatsApp** (wa.me).
- Filter `Sve (n)` / `Novo (n)`.
- **Badge na tabu** = broj neodgovorenih; osvjezava se na fokus + svakih 15s.
- Prazno stanje objasnjava da poruke dolaze sa forme i na mejl.

**Napomena o cuvanju:** poruke su u `localStorage` (bez baze). To znaci da
admin vidi poruke iz TOG preglednika. Mail na `kontakt@devlab.cc.cd` je
izvor istine i stize odmah — tab je brzi pregled, ne arhiva.

## Dev server

`npx vite --port 5173` (background, log: /tmp/vite.log)
http://localhost:5173/

## ⚠️ VAZNO: ID-evi NISU 1-2-3 po redu

| # | id | naslov |
|---|---|---|
| 1 | fbc01 | FB COVER (16:9) |
| 2 | px01 | Premium ponuda |
| 3 | p01 | Ne plaćate ni marku… |
| 4 | p02 | Stranica, shop, aplikacija, igrica ili AI |
| 5 | p03 | Kompletna stranica za 150 KM |
| 6 | p04 | Zašto firme biraju DevLab |
| 7 | p05 | Četiri stvari koje radimo |
| 8 | p06 | Pet usluga. Jedan tim. |
| 9 | p07 | Sve što vaš projekat treba |
| 10 | p08 | Cijene bez sitnih slova |
| 11 | p09 | Tri paketa. Tri jasne cijene. |
| 12 | p10 | Kako radimo |
| 13 | p21 | Prije prve linije koda |
| 14 | p22 | Četiri koraka. Nula plaćanja. |
| 15 | p23 | Projekti koje smo radili |
| 16 | p24 | Izrada sajtova u Sarajevu |
| 17 | p25 | Šta tačno dobijate za cijenu |

**Nema p11–p20 ni p31–p40.** Niz: p01–p10, p21–p30, p41–p60.

### Verifikacija
- px01: okvir 8px = false, tanak 0.30 = false, chip 0.22 = false.
- p04/p06 (karuseli): okvir 8px = true (zadrzan).
- FB naslovna: sve centrirano na cx=540, 0 preklapanja, max text y 476/628.
- Zemlja: fotorealisticna, horizont ~43% visine, gornji dio crn za logo.
- Preuzimanje: fbc01 -> PNG 1080x628.
- Planeta: kontinenti vidljivi, terminator lijevo/desno razlika potvrdjena.
- Preuzimanje: fbc01 -> PNG 1080x628.
- 71 slajd x 2 formata: 0 van kadra. tsc=0, build OK.

## Dev server

`npx vite --port 5173` (background, log: /tmp/vite.log)
http://localhost:5173/

## Sljedeći korak
- Testirati formu na produkciji (Vercel + `BREVO_API_KEY`) — lokalno
  `/api/inquiry` vraca 404 pa se poruka samo cuva lokalno.
- Provjeriti da mail stize na `kontakt@devlab.cc.cd` i da "Odgovori"
  ide korisniku (replyTo).
- Sljedeci post po redu: **p25** (pozicija 17).

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
