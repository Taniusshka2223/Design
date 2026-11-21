# Typography: Plus Jakarta Sans

## Web font (enabled by default)

The project loads the **Plus Jakarta Sans** family from Google Fonts in
`assets/css/fonts.css`, with weights **400, 500, 600, 700 and 800**, as well
as matching italics. This keeps the site lightweight and does not require
any font installation or package manager. Internet access is required for
first-time loading; system fonts provide the offline fallback.

The main heading `DESIGN / ДИЗАЙН` uses `letter-spacing: 0.02em` (2%),
matching the Figma design.

## Use your own original font archive offline

The uploaded `Plus_Jakarta_Sans.zip` contains variable and static TTF files.
If an entirely offline presentation with the original font is required:

1. Extract the two variable TTF fonts from your original archive into
   `assets/fonts/` (the exact filenames are listed in that folder's README).
2. Rename `assets/css/fonts-local.example.css` to `assets/css/fonts-local.css`.
3. Add this tag in `index.html` **after** `fonts.css`, **before** `styles.css`:

   ```html
   <link rel="stylesheet" href="./assets/css/fonts-local.css" />
   ```

4. Open the source `index.html` locally or through `npm run dev`. This is
   the locally hosted version that can use your original TTF files.

The single-file `dist/index.html` intentionally **does not embed or link**
the local TTF binaries. It continues using Google Fonts (with system font
fallback) so that it can be distributed independently of your font archive.

The font license is included for reference in `docs/licenses/`.