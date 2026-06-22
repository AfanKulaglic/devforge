# DevForge

Marketinška web stranica digitalne agencije **DevForge** — izrada web stranica, web shopova, mobilnih aplikacija i 2D igara. Gotova verzija za 5 dana, bez predujma.

## Tehnologije
- **React + Vite + TypeScript**
- **Tailwind CSS**
- `react-icons`

## Pokretanje
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # produkcijski build u dist/
npm run preview  # pregled builda
```

## Rute
Aplikacija koristi **history (path) routing** — čisti URL-ovi koji rade i na direktan unos:
`/`, `/o-nama`, `/usluge`, `/usluge/web-stranice`, `/usluge/2d-igrice`, `/usluge/mobilne-aplikacije`, `/projekti`, `/utisci`, `/cijene`, `/cesta-pitanja`, `/kontakt`, `/privatnost`, `/uslovi`, `/kolacici`, `/reklama`.

## Deploy (Vercel)
Vercel automatski detektira Vite (build: `vite build`, output: `dist`). `vercel.json` sadrži SPA rewrite tako da direktan unos čistih URL-ova (npr. `/usluge`) ne vraća 404.
