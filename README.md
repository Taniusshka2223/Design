# DESIGN · Interactive Dashboard

[**Открыть сайт / Open the dashboard**](https://Taniusshka2223.github.io/Design/)

> GitHub Pages may need one-time activation in **Settings → Pages → Source: GitHub Actions** before this link becomes live.

## About

Bilingual Russian/English e-commerce design performance dashboard based on Figma. Includes 15 screens in each language, animated data visualizations, a custom cursor, responsive layout and keyboard navigation.

## Development

```bash
npm run dev
npm run check
npm run build
```

No packages are required for local development (Node 18+). Public deployment uses GitHub Actions / GitHub Pages.

## Structure

- `index.html` — source entry point for the site
- `assets/css` — styles and Plus Jakarta Sans configuration
- `assets/js` — dashboard, translations and extended analytics
- `assets/icons` — vector favicon
- `scripts` — zero-dependency local dev, verification and standalone build
- `dist/index.html` — self-contained portable version
- `docs` — setup and architecture documentation

The dashboard's data is static, sourced from the original design presentation; it is not connected to a live Ozon account.
