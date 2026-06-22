# DevGen projekt — instrukcije za svaku sesiju

## OBAVEZNO NA POČETKU SVAKE SESIJE
1. Pročitaj `STANJE.md` u rootu projekta — to je sažetak trenutnog stanja i sljedećeg koraka. NE kopaj po starim transkriptima.

## OBAVEZNO NAKON SVAKE PROMJENE / GENERISANJA
2. Nakon što završiš zadatak (svaki edit/feature/fix), AŽURIRAJ `STANJE.md`:
   - PREPIŠI ga (ne dopisuj beskonačno) — drži ga kratkim i aktualnim.
   - Ažuriraj: "Zadnje ažurirano" datum, sekciju "Gotovo (zadnja sesija)" i "Sljedeći korak".
   - Cilj: da sljedeća sesija za 5 sekundi zna gdje smo stali.

## Tehnički podsjetnik
- Skoro sav kod je u `src/App.tsx`. Stilovi `src/index.css`.
- Stack: React + Vite + TypeScript + Tailwind, ikone `react-icons`.
- Valuta je KM (ne €). Ikona novca `HiOutlineBanknotes`.
- Verifikacija prije kraja: `npx tsc --noEmit` (mora exit 0). Build po potrebi: `npm run build`.
- Dev server: `npm run dev` → http://localhost:5173/
