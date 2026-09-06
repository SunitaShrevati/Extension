<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=32&pause=1000&color=6C63FF&center=true&vCenter=true&width=600&lines=Color+%26+Font+Picker;Grab+colors+from+any+page;Grab+fonts+from+any+page;Copy+with+one+click" alt="Typing SVG" />

# 🎨 Color & Font Picker

**A lightweight browser extension that extracts colors and fonts from any webpage — instantly.**

![GitHub last commit](https://img.shields.io/github/last-commit/SunitaShrevati/Extension?color=6C63FF&style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/SunitaShrevati/Extension?color=6C63FF&style=flat-square)
![GitHub license](https://img.shields.io/github/license/SunitaShrevati/Extension?color=6C63FF&style=flat-square)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=googlechrome&logoColor=white)
![Status](https://img.shields.io/badge/status-active-brightgreen?style=flat-square)

</div>

---

## ✨ What it does

<table>
<tr>
<td width="50%">

### 🖱️ Collect from Page
Scans every visible element's computed styles and gathers:
- Text, background & border **colors**
- Primary **font-family** names

</td>
<td width="50%">

### 🎯 Pick Element
Enables an on-page picker:
- Hover to **highlight** any element
- Click to **capture** its colors & font

</td>
</tr>
</table>

<div align="center">

```
┌─────────────────────────────┐
│   🎨  Color & Font Picker   │
├─────────────────────────────┤
│  ● #6C63FF   ● #FFFFFF      │
│  ● #1A1A2E   ● #F0F0F5      │
│                             │
│  Aa  Inter, sans-serif      │
│  Aa  Fira Code, monospace   │
├─────────────────────────────┤
│  [ Collect from page ]      │
│  [ Pick element     ]       │
└─────────────────────────────┘
      click a swatch → copied! ✅
```

</div>

Click any swatch or font in the popup to **copy its value to the clipboard** instantly.

---

## 🚀 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/SunitaShrevati/Extension.git

# 2. Open Chrome and go to
chrome://extensions

# 3. Enable "Developer mode" (top-right toggle)

# 4. Click "Load unpacked" → select the repo folder
```

Then open any website, click the extension icon, and hit **Collect from page** or **Pick element**.

---

## 📦 Project Structure

```
Extension/
├── manifest.json        # Extension config
├── popup.html            # Popup UI
├── popup.js              # Popup logic + clipboard copy
├── content_script.js     # Page scanning + element picker
├── styles.css            # Popup styling
└── README.md
```

---

## 🧭 Roadmap

- [ ] Add extension icons (16 / 48 / 128 px)
- [ ] Smarter color normalization — handle CSS variables & gradients
- [ ] Detect `@font-face` / Google Fonts sources + weights
- [ ] Sort colors by frequency or contrast
- [ ] Export picks as JSON / CSS variables
- [ ] Options page with saved preferences (hex vs RGBA)
- [ ] Firefox / cross-browser manifest support
- [ ] Linting, formatting & CI
- [ ] Merge `add/color-font-picker-extension-2` → default branch via PR

---

<div align="center">

### 🔗 Latest Change

**Branch:** `add/color-font-picker-extension-2`


---

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=16&pause=1500&color=8892B0&center=true&vCenter=true&width=500&lines=Made+with+%E2%9C%A8+for+designers+%26+developers" alt="footer" />

</div>
