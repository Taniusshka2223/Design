# Architecture

This is a dependency-free static web application with hash-based routing.
All content is local; no remote API calls, authentication, or database are
required. Google Fonts is used only for typography when available online.

## Runtime

- `index.html`: entry point and metadata.
- `assets/css/fonts.css`: typography and fallback stack.
- `assets/css/styles.css`: tokens, responsive layout, transitions and cursor.
- `assets/js/translations.js`: Russian/English UI labels and text translations.
- `assets/js/details.js`: supplementary Ozon analytics and interactive filters.
- `assets/js/app.js`: main routing, dashboard rendering, charts, navigation,
  animation, CSV export and custom pointer.

The classic scripts are loaded in this order: translations, details, app.
Please keep that order when editing the HTML or build script.

## Routes

The main dashboard has eleven routes, e.g. `#/work/all`, `#/achievements/overview`,
`#/problems`, `#/plans`. Four detailed analytics routes start with
`#/details/`. English uses the same routes prefixed with `#/en/`.

## Assets

Vector brand icon: `assets/icons/favicon.svg`.
Fonts are requested online by default; optional local TTF support is
documented in `docs/fonts.md`.

## Build and release

`scripts/build.mjs` produces `dist/index.html` by inlining local CSS, JS,
and the SVG favicon. No dependencies are required for the static build.
`npm run check` verifies all entry files, script syntax and routing markers.