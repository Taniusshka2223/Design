# Deployment

## Local preview

From the project root, either open `index.html` directly or run:

```bash
npm run dev
```

Then visit `http://localhost:8000`.
You can use `python3 -m http.server 8000` instead if Node.js is unavailable.

## One-file export

```bash
npm run build
```

This creates `dist/index.html` with application scripts, styles and favicon
embedded in the page. No JavaScript packages are needed. The font still loads
through Google Fonts if the visitor is online; fallback fonts are available.

## Static hosting

Upload the project root, or the built `dist/index.html` for a single-file
version, to GitHub Pages, Netlify, Vercel, Cloudflare Pages, or an Nginx
static folder. No rewrite rules are required because navigation uses `#/`.

## Important

The dashboard uses historical data represented in the Figma design. It does
not sync to Figma or Ozon automatically. Only publish the data if permitted.