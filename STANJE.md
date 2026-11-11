# Dev Lab — TRENUTNO STANJE
> Prepisuje se na kraju svake sesije. Kratko i aktualno.
Zadnje ažuriranо: 2026-11-11 (poruke u Firebase — vidljive sa svih uredjaja)

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
| `src/lib/inquiries.ts` | NOVO — tip `Inquiry` (`email?` opcionalan) + localStorage + fetch |
| `src/AdminMessagesTab.tsx` | NOVO — tab "Poruke" u adminu |
| `src/App.tsx` | `submitMail` -> `submitInquiry`, honeypot, stanja |
| `src/AdminPanel.tsx` | tab "Poruke" + badge neodgovorenih |

**`api/inquiry.ts` sigurnost:**
- primalac FIKSNI (`kontakt@devlab.cc.cd`) — ne moze se poslati nikome drugom
- `replyTo` = korisnikov email (ako ga ostavi), pa "Odgovori" ide njemu
- rate limit 6/10min po IP, honeypot `website`, duzine se sijeku, HTML escape
- bez `BREVO_API_KEY` vraca 404 -> klijent samo sacuva lokalno, bez greske

**Forma izmjene (`App.tsx`):**
- polje "Telefon *" — **OBAVEZNO**, mora biti broj (min 6 cifara)
- honeypot input `name="website"` (skriven, botovi ga popune)
- stanja `sent` / `sending` / `sendError` umjesto `mailOpened`
- uspjeh: "Poruka je poslana" + ponuda da pisu na mejl ako je hitno

### PORUKE U FIREBASE (kriticni bug)

Korisnik: "popunim sve i posaljem poruku ali mi ona ne dodje u hotmail
niti nas trnaici admin".

**BUG 1 — admin nikad ne vidi poruku.** Poruke su bile SAMO u
`localStorage`. To znaci: poruka se upise u preglednik POSJETIOCA, a admin
gleda u SVOM pregledniku — nikad je ne vidi. Testirano: forma poslala,
Firebase bio prazan, admin prazan.

**Rjesenje:** `src/lib/inquiries.ts` sada cuva u Firebase
(`devforge/inquiries`), isti obrazac kao `analytics.ts`.

| funkcija | radi |
|---|---|
| `saveInquiryRemote()` | upis u Firebase (push) — poziva se iz forme |
| `loadInquiries()` | async: Firebase + localStorage rezerva, dedup |
| `subscribeInquiries()` | `onValue` — nova poruka se pojavi bez refresh |
| `setInquiryHandled()` / `deleteInquiry()` | async, `handled` polje u Firebase |
| `unhandledCount(list)` | prima listu (vise nije globalna) |

**Pravila:** `database.rules.json` — dodana grana `devforge/inquiries`
(`.read true`, `.write true`, `.indexOn ["at"]`).

**Verifikacija (bitno):** test iz NOVOG browser konteksta (cist
localStorage = kao drugi uredjaj): forma poslala -> Firebase zapis
`-P6BfzLmjw7NgyJTslUe` -> admin u cistom kontekstu (`localStorage === null`)
prikazuje karticu, badge = 1. **Radi.**

**BUG 2 — mail ne stize (nije u kodu).**
`POST /api/inquiry` na produkciji vraca `{"ok":true}` HTTP 200 — Brevo je
mail PRIHVATIO. Mail tehnika je ispravna:

```
MX:    mx1/mx2.improvmx.com   <- ImprovMX (samo FORWARD, ne prima postu)
SPF:   v=spf1 include:spf.improvmx.com include:spf.brevo.com ~all
DMARC: v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com
```

SPF i DMARC ukljucuju Brevo — posiljalac je dozvoljen.

**Zato mail ne stize:** `kontakt@devlab.cc.cd` je ALIAS na ImprovMX-u koji
prosljedjuje na odrediste podeseno u ImprovMX nalogu. Ako to odrediste nije
postavljeno (ili je pogresno), mail se negdje izgubi nakon sto ga Brevo
prihvati. To se NE moze popraviti iz koda.

**Sta treba korisnik:**
1. Otvoriti ImprovMX -> `devlab.cc.cd` -> Aliases.
2. Provjeriti da `kontakt@` postoji i da forward ide na STVARNI mailbox
   (hotmail/gmail). Ako alias ne postoji, mail se odbija.
3. Provjeriti spam folder.
4. U Brevo -> Transactional -> Logs vidjeti da li je mail `delivered`
   ili `bounced`.
### TELEFON JE OBAVEZAN (korisnikov zahtjev)

Korisnik: "oni moraju unjeti broj telefona jako bitno!!! bez toga ne moze
posalti".

**Tri sloja zastite** — forma ne prolazi bez ispravnog broja:

| sloj | gdje | sta provjerava |
|---|---|---|
| HTML | `App.tsx` | `required` + `type="tel"` na polju |
| JS | `submitInquiry` | `digits.length < 6` -> greska ispod forme |
| SERVER | `api/inquiry.ts` | ista provjera — POST se moze poslati i rucno |

Polja sada: Ime * · **Telefon *** · Email (opcionalno) · Usluga · Budzet ·
Poruka. Email je odvojen od telefona (`email?` u tipu `Inquiry`).

**Zasto telefon, a ne email:** to je jedini kanal na koji stvarno dobijemo
covjeka isti dan. Email ljudi ne provjere danima, a obecavamo odgovor u
toku dana.

**Bug uhvacen testom:** honeypot polje je bilo `required` i browser je
traziо da se popuni skriveno polje — blokiralo je CIJELU formu. Popravljeno
sa `required={false}`.

**Bug uhvacen testom 2:** prvi pokusaj izmjene je ubacio DUPLIKAT honeypot
inputa unutar dugmeta "Zatvori". Uklopljen rucno; sada je tacno jedan
`name="website"` u formi.

**Admin kartica:** `email` se prikazuje kao zaseban red. Dugme "Odgovori
mejlom" postoji SAMO ako je covjek ostavio email; "Pozovi" i "WhatsApp"
uvijek (telefon je obavezan).
### ADMIN TAB "PORUKE"

- Lista upita, najnoviji prvi. Kartica: ime, kontakt, usluga, budzet,
  poruka, "NOVO" oznaka dok nije odgovoreno.
- Dugmad: **oznaci odgovoreno** (check), **kopiraj**, **obrisi** (uz potvrdu).
- Akcije: **Odgovori mejlom** (mailto, samo ako je kontakt email),
  **Pozovi** (tel, ako je broj), **WhatsApp** (wa.me).
- Filter `Sve (n)` / `Novo (n)`.
- **Badge na tabu** = broj neodgovorenih; osvjezava se na fokus + svakih 15s.
- Prazno stanje objasnjava da poruke dolaze sa forme i na mejl.

**Cuvanje:** poruke su u **Firebase** (`devforge/inquiries`), pa ih admin
vidi sa svih uredjaja i u realtime. `localStorage` je samo rezerva za
slucaj da je mreza pala. Mail je odvojen kanal — ako jedan zakaze, drugi radi.

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
- **PODESITI IMPROVMX**: provjeriti da `kontakt@devlab.cc.cd` alias
  forwarduje na stvarni mailbox. API vraca `ok:true` ali mail se gubi —
  problem je forward, ne kod.
- U Brevo -> Transactional -> Logs pogledati status (delivered/bounced).
- Sljedeci post po redu: **p25** (pozicija 17).

## Napomene / zamke
- **Python heredoc + `\n` u TS stringu = pokvaren string.** Koristiti `.cjs` skriptu sa
  `String.fromCharCode(92)` ili pisati fajl preko `write` alata.
- **`postRender.ts`/`posts*.ts` su CRLF** — zamjene stringova moraju normalizovati
  `\r\n` → `\n` ili markeri neće pasati.
- Vision servis (`look_at_image`) pada često — tada mjeriti geometrijski
  (`getBoundingClientRect`).
- **Rollback tačka:** `834ac0d` = premium uređen + ostali original.
