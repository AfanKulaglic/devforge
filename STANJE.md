# DevGen — TRENUTNO STANJE
> Ovaj fajl se PREPISUJE (ne dopisuje) na kraju svake sesije. Drži ga kratkim.
Zadnje ažurirano: 2026-06-15 (CMS / admin panel na /admin)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`. Stilovi `src/index.css`.
- Marketinška landing/home + podstranice: O nama, Usluge, 3 detaljne usluge, **Projekti**.
- Valuta: KM (ne €). Ikona novca: `HiOutlineBanknotes`.
- **Akcent boja: TEAL/AQUA** (`teal-*` Tailwind, gradijent teal→cyan). Gl. CTA gradijent `from-teal-400 to-[#0891B2]`. Deep end `#0E7490`. Fokus prsten `#2dd4bf`. (rebrand s ljubičaste).

## Gotovo (ova sesija)
- **UKLONJENA SEKCIJA „ŠTA KLIJENTI KAŽU / UTISCI" (kompletno)** — izbačeno: `const testimonials[]` (3 izmisljena klijenta), `function Testimonials()` (home rotirajuci), `TestimonialsGrid()`, `UtisciPage()`, `<Testimonials />` sa home, ruta `/utisci` iz `App()` i `routeMap`, oba linka iz navigacije/footer-a (`serviceLinks` + footer lista), SEO meta `utisci:`, `isInfo` provjera, `.testimonial-fade` iz `index.css` i unos iz `public/sitemap.xml`. `/utisci` sad vraca `NotFoundPage`. Razlog: izmisljena imena/recenzije su rizik za povjerenje i zakonski problem (nepostojeca lica).
- **CAROUSEL: kartice manje + veci mobitel u mockupu** — kartica 46% desktop (bila 62%) / 72% mobilni → susjed vidljiv **59%** sa svake strane umjesto 31%. Mobitel u `DeviceMockup` povecan: `w-[30%] max-w-[150px]` (mobilni) / `sm:w-[34%] max-w-[165px]` (desktop), bio `26% max-w-[120px]` → sad ~165x330 px, skoro iste visine kao browser prozor (165 umjesto 120 = **+37%**). Ivice `bottom-2 right-2` (ostaje unutar okvira, `overflow-hidden` bi ga odrezao). Susjedi `opacity-75` → hover `opacity-95`, bez blura.
- **CAROUSEL: susjedi jasno vidljivi (marketing)** — aktivna kartica NIJE u sjeni (`opacity-100`), susjedi su `opacity-75` (bez blura!) i na hover `opacity-90`, pa im se vidi sadrzaj. Sirina kartice smanjena 70%→**62%** desktop (78% mobilni) → susjed vidljiv **31%** sa svake strane (prije 21%). Uklonjene su i ivicne gradient maske (`w-4`). Klik na susjednu karticu je centrira (`goTo(i)` + `role=button` + Enter/Space).
- **UKLONJEN GLOW (osvjetljenje) iza aktivnog projekta** u `/projekti` carouselu — teal/cyan `blur-3xl` sloj `absolute -inset-6` je uklonjen u potpunosti; `DeviceMockup glow={false}`. Home marquee (linija ~2037) jos ima default glow — nije dirano jer korisnik nije trazio.
- **LIVE PREVIEW + MARKETINSKA DUGMAD ZA SVAKI PROJEKAT** — nova komponenta `ProjectActions` (koristi se i na home marquee i na /projekti carouselu) sa tri elementa: **1) „Otvori demo"** (primarno, teal gradient, novi tab), **2) „Pregled uzivo"** (otvara `LivePreviewModal` — iframe unutar sajta, prekidac Desktop/Mobitel, browser traka, ESC zatvara, blokira skrol), **3) oznaka „bez instalacije"**. Fallback: ako sajt zabranjuje ugradnju (`X-Frame-Options`) iframe se ne ucita u 4.5s → prikazuje se poruka + veliki link umjesto praznog okvira. NAPOMENA: `qiro-tools.vercel.app` salje `X-Frame-Options: SAMEORIGIN` pa mu live preview nece raditi — ostali rade.
- **FIX 2: carousel u /projekti — klonovi su bili glavni bug** — traka je klonirala kartice (`[zadnji, ...svi, prvi, drugi]`) sa `loopOffset`, pa je pri `count=2` kartica A postojala 3x i DVA klona su bila "aktivna" (`realIndex === index`) → odsjaj i dimovanje na pogrešnoj kartici. Sada: `looped = group.items` (bez klonova), `active = (i === index)` → uvijek tacno jedna aktivna. Dodatno: (a) `centering` se racuna iz STATE `viewportWidth` umjesto iz `ref.current` (ref je `null` na prvom renderu → skok trake), (b) glow je izdvojen u poseban `absolute -inset-6 -z-10` sloj IZVAN opacity wrappera i `DeviceMockup glow={false}`, (c) strelice disabled i na krajevima (`index === 0` / `index === count-1`), nema vise wrap-a.
- **FIX: blur na pogresnoj kartici u /projekti carouselu** — tri uzroka: (1) `willChange: "transform"` na traci stvarao je novi compositing layer zbog cega je `blur` na susjednim karticama izgledao kao da je na centriranoj, (2) `blur-[1.5px] saturate-50` je previse unistavao sliku susjeda, (3) ivicne gradient maske bile su `z-20` i `w-10/md:w-16` pa su prekrivale ivice centrirane kartice. Sada: blur i saturate potpuno uklonjeni (susjedi samo `opacity-35`), maske `z-10` i `w-4`.
- **NOVI PROJEKAT: Saraya Hotspot — Sarajevo Visit** (`sarajevo-visit.vercel.app/map`, repo `AfanKulaglic/sarajevo-visit`) — kategorija **Mobilne aplikacije** (iako je web/PWA — korisnik tako tražio). Turistička PWA: GPS check-in na 50 m, 3D glTF modeli (Sebilj, Vijećnica, Sahat kula, Vječna vatra, Spomenik ubijenoj djeci, Multicultural Man), 9 jezika, MapLibre + Leaflet, Firebase, vlastiti admin. Next.js 16 + React 19 + Tailwind 4. Slike: `/logos/logo.png` (desktop) i `/icons/icon-512.png` (mobile). `SEED_VERSION` podignut na `"7"`.
- **PROJEKTI STRANICA: CAROUSEL SA SUSJEDNIM KARTICAMA** — `/projekti` vise nije slajder koji prikazuje JEDAN projekt preko cijele sirine. Sada je carousel gdje je aktivna kartica centrirana (70% sirine na desktopu, 82% na mobilnom), a lijevo/desno se vidi ~21% susjedne kartice (11% na mobilnom) sa blur+opacity efektom — odmah se vidi da ima jos projekata. Sirina se mjeri `ResizeObserver`-om (fluidno na svakom ekranu), gap se cita iz `getComputedStyle`. Podrzano: strelice, tackice, swipe prstom, drag misem, beskonacna petlja. Tekst (tag/naslov/opis/dugme "Pogledaj projekt") je sada ISPOD slike, ne sa strane.
- **ADMIN: PROMJENA REDOSLIJEDA PROJEKATA U KATEGORIJI** — svaka kartica u admin tabu Projekti ima zaglavlje „#N po redu" + strelice gore/dole (disabled na ivicama). Funkcija `reorderProjects(service, orderedIds)` u `projectsStore.ts` prepisuje `createdAt` na strogo rastuće vrijednosti unutar samo te kategorije — ostale kategorije netaknute. `groupProjects()` i `useHomeProjects()` sortiraju po `createdAt`, pa se isti redoslijed automatski vidi na `/projekti` i u home marquee sekciji.
- **FIX: seed projekti se sada auto-nadograđuju** — `SEED_VERSION` (`devforge-projects-seed-version`, trenutno `"6"`) u `projectsStore.ts`. Kad se u kodu pojavi novi seed projekt, povećaj `SEED_VERSION` → novi seed se dodaje u postojeći localStorage BEZ brisanja korisnikovih izmjena. `resetProjects()` briše i verziju.
- **ADMIN TAB PROJEKTI GRUPISAN PO KATEGORIJAMA** — umjesto ravne liste, akordeoni po `SERVICE_OPTIONS` (Web shopovi, Web stranice, 2D igrice, Mobilne aplikacije) + "Ostalo" za nepoznate vrijednosti. Svaka grupa: broj projekata, chevron otvori/zatvori (default sve otvorene), prazna grupa nudi dugme "Dodaj u <kategorija>" koje otvara formu sa unaprijed izabranom kategorijom. Kartica izdvojena u `ProjectCard` komponentu.
- **FIX: STRELICE U HOME PROJEKTI SEKCIJI** — nisu radile jer je `scrollByCard` koristio `behavior: "smooth"`, a auto-marquee `tick` loop svakih 16 ms piše u `scrollLeft` i prekida smooth scroll. Sada: rAF animacija sa easing-om, `pausedRef.current = true` tokom animacije, gap se čita iz `getComputedStyle(track).columnGap` (umjesto hardkodovanih 24 px — stvarni je 20/28 px).
- **HOME PROJEKTI VEZANI ZA BAZU** — marquee sekcija `Projects` (#projects) na naslovnoj sada čita iz istog `projectsStore` (localStorage) preko novog hooka `useHomeProjects()`. Obrisan hardkodirani `const projects[]`. Kartice prikazuju `service` kao kategoriju, `imageDesktop`/`imageMobile` kroz `DeviceMockup`, a dugme vodi na pravi URL projekta (`target="_blank"`) umjesto mrtvog `#contact`. Label promijenjen u „Pogledaj projekt".
- **NOVI TAB „CIJENE" u admin panelu** (/admin, pored taba Projekti) — potpuno upravljanje paketima.
  - `src/lib/pricingStore.ts` — lokalna baza cijena (localStorage kljuc `devforge-pricing-v1`). 4 grupe: `web-sites` / `web-shops` / `games` / `mobile`. Tipovi `PricingGroupData`/`PricingPlanData`, `saveGroup`/`deleteGroup`/`moveGroup`/`resetPricing`, event `devforge:pricing-changed`, `GROUP_TO_SERVICE` mapiranje.
  - `src/AdminPricingTab.tsx` — akordeon po grupi: uređivanje naslova/podnaslova/napomene grupe, CRUD paketa (naziv, cijena, tagline, checkbox „Najpopularnije", stavke = jedan red = jedna kvačica), pomicanje grupa gore/dolje, brisanje grupe i paketa sa potvrdom, dodavanje nove grupe, reset na početno.
  - `App.tsx`: `Pricing` sada čita iz store-a preko `usePricingGroups()`/`usePricingMeta()`. `/cijene` → `AllPricing`; `/usluge/*` → `ServicePricing serviceKey=...` (novo polje `ServiceDetail.pricingKey`). Ikone paketa se izvode iz naziva kroz `planIcon()` (ne mogu u localStorage).
  - NAPOMENA: cijena u hero badge-u („Web već od 150 KM"), u `pricing[]` karticama, `AD_SERVICES` i SEO meta naslovima ostaje **fiksni tekst** — nije vezana za store.
- **KATEGORIJE PROMIJENJENE** u 4 grupe (redom): **Web shopovi · Web stranice · 2D igrice · Mobilne aplikacije**. `SERVICE_OPTIONS` u `projectsStore.ts`. `/projekti` filtrira prazne grupe (`filter(items.length > 0)`) da se ne prikazuje prazan slajder.
- **5 PROJEKATA UBAČENO kao seed** u `src/lib/projectsStore.ts`:
  1. **ELESONIC** (`elesonic.ba`) — *Web shopovi* — elektronika/sigurnosna oprema, 30 proizvoda, 7 kategorija. Slike: `picturetolink.com` banneri.
  2. **MYICON** (`my-icon.shop`) — *Web shopovi* — tekstil i štampa, nemački, 34 proizvoda. `myicon2025@gmail.com`. Slike: `i.ibb.co`.
  3. **Formula Racers** (`formula1-unbranded.vercel.app`) — *2D igrice* — top-down racing, Next.js + canvas.
  4. **Qiro** (`qiro-tools.vercel.app`) — *Web stranice* — short linkovi, QR, konverzija fajlova WebAssembly.
  5. **Ljaljević Dental** (`ljaljevic-dental.vercel.app`, repo `AfanKulaglic/Ljaljevic-Dental`) — *Web stranice* — stomatološka ordinacija Sarajevo (Zlatni standard: protetika, cirkon krunice, proteze, estetika, endodoncija). React + Vite + Tailwind, Framer Motion, schema.org Dentist. Bardakčije 23, +387 33 567 890, info@ljaljevic-dental.ba. Slika: `/images/hero/dental-clinic.jpg` sa vercel.app domena (domena .ba još ne resolva).
  5. **Fun4Four — Game Launcher** (`github.com/AfanKulaglic/GameLauncher`) — *Mobilne aplikacije* — multiplayer launcher za 2–4 igrača (Battleship, Ludo, Slagalica, Runbound Rivals). React Native + Expo SDK 54, Firebase RTDB (lobi + gameState realtime), Auth email/Google, React Navigation stack+tabs, custom SVG ikone. Repo ima `GAME_INTEGRATION_GUIDE.md` + `GAME_SUBSYSTEMS_PLAYBOOK.md` (1060 + 214 linija).
  - NAPOMENA: seed se prikazuje samo dok lokalni `devforge-projects-v1` kljuc ne postoji. Ako je vec postojao u browseru, kliknuti **"Resetuj na pocetno"** u `/admin`.
- **NOVI CMS / ADMIN PANEL na `/admin`** (bez baze, sve lokalno — `localStorage`).
  - `src/lib/projectsStore.ts` — lokalna "baza": `AdminProject` tip, `SERVICE_OPTIONS` (4 grupe), `getProjects`/`saveProject`/`deleteProject`/`resetProjects`, `groupProjects()`, event `devforge:projects-changed`. Kljuc `devforge-projects-v1`. Seed od 3 projekta kad kljuca nema.
  - `src/AdminPanel.tsx` — login (sessionStorage kljuc `devforge-admin-session`; **afan / 080513**) + jedan tab **Projekti**. Forma: naslov, usluga (select), tag, link `https://`, opis, **link slike za DESKTOP** i **link slike za MOBITEL** (bez browse/upload-a, samo URL) + live preview obje. Kartice: uredi / obriši (sa potvrdom) / reset na početno.
  - Ruta `/admin` prikazuje se **bez** Headera, Footera, CustomCursor-a i cookie banera (rani `if (route === "admin") return <AdminPanel/>`).
  - `/projekti` sada čita iz baze kroz `useStoredProjects()` (useSyncExternalStore) umjesto hardkodiranog `projectGroups`; `ProjectRow` prosleđuje `project.imageMobile`; `DeviceMockup` dobio opcioni `imageMobile` (telefon prikazuje tu sliku, fallback na desktop).
  - Home marquee (`Projects`, `#projects`) NETAKNUT — još koristi stari niz `projects[]`.
- **GARANCIJA UKLONJENA SVIJUDJE** (bilo 8 mesta: companyStats, FAQ "podrška nakon projekta", pricing items ×3, deliverables, comparison tabela, legal FAQ "Odgovornost"). Nema više ni jedne reči "garancija"/"warranty" u projektu. Umesto nje svuda stoji **"Demo se ne plaća"** — demo verzija je besplatna, plaćanje kreće tek kad se klijent odluči za puni razvoj.
- **CIJENE PODIGNUTE (sve stranice, sweep kroz App.tsx):** web stranice 39→**150 KM**, web shopovi 199→**600 KM**, mobilne ostaju "Po dogovoru". Paketi: Web Start 150–250, Business 300–450, Premium 500–800; Shop Start 600–1.000, Shop Business 1.200–1.800, Shop Premium 2.000–3.500. Logo 19→100 KM. Poređenje s agencijama 500→1.500 KM.
- NOVA stranica **Projekti** (`#/projekti` → `ProjectsPage`): `ProjectsHero` → `TrustBar` → `ProjectsGallery` → `Facts`. navItems href `#projects`→`#/projekti`; Header `isProjects` + underline; App router grana `projects`. Home `<Projects/>` (#projects marquee) OSTAJE.
  - `ProjectsGallery`: 1 red = 1 usluga, svaki red je SLAJDER (`ProjectRow`) kroz više projekata te usluge (strelice + tačkice + touch swipe, brojač `index/count`, naizmjenična strana mockupa `flip`). Podaci `projectGroups` (3 usluge × 3 projekta, placeholder slike). Mrtvi "Detaljnije o projektu" link UKLONJEN (nigdje nije vodio).
- (ranije danas) Novi desktop navbar: `NavLink` + teal underline (aktivni/hover), puni teal CTA, bogat "Usluge" dropdown, kompaktan na scroll. Status-tačka "Dostupni za projekte" je BILA dodana pa UKLONJENA na zahtjev.
- (ranije danas) Rebrand boje ljubičasta→teal (sweep App.tsx+index.css). Redizajn cijena. Fix mobilni overflow (`overflow-x: clip` na html+body).
- Verifikacija: `tsc --noEmit` ✓, `npm run build` ✓. `/projekti` desktop+mobitel `sw==430` (bez overflowa).

## Gotovo (ranije)
- Cijene po uslugama preko `pricingGroups` (web = "Web stranice" + "Web shopovi", svaka 3 paketa; hosting/održavanje u `pricingNote`).
- Hero benefit "4 besplatne revizije" → admin panel/CMS. "Zašto DevGen" 4 kartice.
- FIX dev server (heap OOM): `vite.config.ts` → `server.watch.ignored: ["**/shots/**","**/dist/**"]`.

## Sljedeći korak
- **CMS radi.** Login: `/admin` → `afan` / `080513`. Ako se ne vide 4 nova projekta, klikni **"Resetuj na početno"**.
- **EMAILI IZ ISTRAŽIVANJA (za chatanje / kontakt):** elesonic.ba — *nije objavljen na sajtu* (SPA/Firebase, kontakt forma); my-icon.shop — **myicon2025@gmail.com**, tel +49 176 64824863 / 02191 5606112.
- **BLOKATORI za lansiranje:** (1) `FORM_ENDPOINT` (App.tsx:55) je prazan → forme su demo, ne šalju ništa; treba Formspree. (2) `info@devforge.ba` mora postojati. (3) Pravi telefon još nije ubačen — placeholder `(+387) 61 000 000` na 4 mjesta (App.tsx:2032, 2098, 2851 + `tel:`). Korisnik dao 062 576 456 — čeka potvrdu formata.
- **OGRANIČENJE:** localStorage je per-browser/per-uređaj — projekti dodani na jednom računaru se NE vide na drugom ni na produkciji za posjetioce. Za pravu višekorisničku bazu treba Supabase/Firebase.
- Preporuka iz ranije: obrisati `shots/profile-review/` (Chrome profil, ne pripada projektu).

## Komande
- Pokreni dev: `npm run dev`  → http://localhost:5173/
- Provjera tipova: `npx tsc --noEmit`
- Build: `npm run build`
- Nastavi prošli chat: `claude --continue`  (u E:\0_Downloads\devgen11)

## Ključne lokacije u App.tsx (orijentaciono, provjeri grep-om)
- `src/lib/projectsStore.ts` — **lokalna baza projekata** (localStorage)
- `src/AdminPanel.tsx` — **/admin** login + tab Projekti
- `useStoredProjects()` ~321 — hook koji hrani `/projekti`
- `/admin` rana grana u `App()` pre glavnog return-a
- `pricing` data ~339 | `PricingCard` ~1520 | `Pricing` ~1584 | `DeviceMockup` ~1330 | `projects` data ~274
- `ProjectsPage`/`ProjectsHero`/`ProjectsGallery` (uz `AboutPage`), `Header`+`NavLink` (navbar), App router ~2330
- `serviceDetails` (web/games/mobile) sadrži `pricingGroups`/`pricingSubtitle`/`pricingNote`
- Hash rute: #/o-nama, #/usluge, **#/projekti**, #/usluge/web-stranice, #/usluge/2d-igrice, #/usluge/mobilne-aplikacije
- Stranice u App router (~2362): about / services / projects / svc-web / svc-games / svc-mobile / home
