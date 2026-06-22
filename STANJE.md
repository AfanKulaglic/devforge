# DevGen — TRENUTNO STANJE
> Ovaj fajl se PREPISUJE (ne dopisuje) na kraju svake sesije. Drži ga kratkim.
Zadnje ažurirano: 2026-06-15 (nova stranica Projekti)

## Projekt
- React + Vite + TypeScript + Tailwind. Skoro sav kod u `src/App.tsx`. Stilovi `src/index.css`.
- Marketinška landing/home + podstranice: O nama, Usluge, 3 detaljne usluge, **Projekti**.
- Valuta: KM (ne €). Ikona novca: `HiOutlineBanknotes`.
- **Akcent boja: TEAL/AQUA** (`teal-*` Tailwind, gradijent teal→cyan). Gl. CTA gradijent `from-teal-400 to-[#0891B2]`. Deep end `#0E7490`. Fokus prsten `#2dd4bf`. (rebrand s ljubičaste).

## Gotovo (ova sesija)
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
- (prazno — čeka novi zadatak korisnika)
- Preporuka iz ranije: obrisati `shots/profile-review/` (Chrome profil, ne pripada projektu).

## Komande
- Pokreni dev: `npm run dev`  → http://localhost:5173/
- Provjera tipova: `npx tsc --noEmit`
- Build: `npm run build`
- Nastavi prošli chat: `claude --continue`  (u E:\0_Downloads\devgen11)

## Ključne lokacije u App.tsx (orijentaciono, provjeri grep-om)
- `pricing` data ~339 | `PricingCard` ~1520 | `Pricing` ~1584 | `DeviceMockup` ~1330 | `projects` data ~274
- `ProjectsPage`/`ProjectsHero`/`ProjectsGallery` (uz `AboutPage`), `Header`+`NavLink` (navbar), App router ~2330
- `serviceDetails` (web/games/mobile) sadrži `pricingGroups`/`pricingSubtitle`/`pricingNote`
- Hash rute: #/o-nama, #/usluge, **#/projekti**, #/usluge/web-stranice, #/usluge/2d-igrice, #/usluge/mobilne-aplikacije
- Stranice u App router (~2362): about / services / projects / svc-web / svc-games / svc-mobile / home
