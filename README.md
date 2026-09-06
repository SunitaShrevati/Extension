# Page Color & Font Picker extension

This extension collects colors and fonts used on any webpage and lets you copy them from the popup.

Install (developer flow):
1. Clone this repo.
2. Open Chrome and go to chrome://extensions.
3. Enable "Developer mode".
4. Click "Load unpacked" and select the repository folder (the folder that contains manifest.json).

Usage:
- Open a page you want to inspect.
- Click the extension icon and press "Collect from page" to gather colors and fonts used on the page.
- Or press "Pick element" then click an element on the page to pick its colors and font.
- Click a color swatch to copy the hex value. Click a font to copy the font-family name.

Notes & limitations:
- This collects computed styles and attempts to normalize colors to hex. Some values (transparent, gradients) may not convert neatly.
- Fonts are taken from the computed font-family (primary family in the list). It doesn't enumerate the full fallback stack.

Files added:
- manifest.json
- content_script.js
- popup.html
- popup.js
- styles.css
- README.md

