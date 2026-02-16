# Andreea & George - Invitatie Nunta

Site React + TypeScript + Vite pentru invitatia digitala.

## Comenzi

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Continut editabil

- `src/content.ts`: nume, data, locatii, program, contacte, poveste, galerie, link RSVP.
- `index.html`: meta title/description/Open Graph.

## Open Graph image

Sursa SVG este in `public/og-image.svg`.

Genereaza PNG-ul:

```bash
node src/scripts/generate-og.mjs
```

Rezultatul este scris in `public/og-image.png`.

## Deploy

- Build output: `dist/`
- `public/_headers` si `public/_redirects` sunt copiate automat in `dist/` la build.
- Publica folderul `dist` pe hosting.
