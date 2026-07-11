THE BREKKIE CLUB — LANDING PAGE
================================

FOLDER CONTENTS
  index.html   → the page structure
  styles.css   → all colors, fonts, layout
  script.js    → contact links + pop-up schedule logic
  assets/      → logo, menu PDF, menu thumbnail image

BEFORE YOU GO LIVE — edit script.js
  Open script.js in any text editor and update:
    - WHATSAPP_NUMBER   → your number with country code, no + or spaces
    - INSTAGRAM_HANDLE  → your handle, without the @

UPDATING POP-UP DATES
  Still in script.js, edit the POPUPS list — add, remove, or change
  entries any time. Each entry needs: location, address, date, time.
  The first entry in the list is shown as the featured "Next Up" card.
  Leave the list empty (POPUPS = []) if nothing is scheduled.

UPDATING THE MENU
  Replace assets/brekkie-club-menu.pdf with a new PDF (keep the same
  filename), and swap assets/menu-thumbnail.jpg for a matching preview
  image if you want the thumbnail to update too.

USING YOUR REAL LOGO FONT (TAN Tangkiwood)
  The wordmark is currently an image exported from your logo file, so
  it's already exact. If you'd like the rest of the site's text to use
  TAN Tangkiwood too (it's a paid font from TanType, so it isn't
  included here), open styles.css, find the @font-face comment block
  near the top, add your licensed .woff2/.woff files into a "fonts"
  folder next to this README, and uncomment that block.

HOSTING
  This is a static site — upload the whole folder as-is to any static
  host (Netlify, Vercel, GitHub Pages, or your own server) and point
  your domain or Instagram bio link at it. Keep index.html, styles.css,
  script.js, and the assets folder together in the same structure.
