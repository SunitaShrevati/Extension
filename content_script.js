/* content_script.js
   - Responds to messages: {action:'collect'} or {action:'start-element-pick'}
   - Collects colors and fonts used on the page and sends them to the popup
*/

function toHex(rgb) {
  if (!rgb) return null;
  rgb = rgb.trim();
  if (rgb === 'transparent') return 'transparent';
  // handle hex input
  if (rgb[0] === '#') return rgb;
  const rgba = rgb.match(/rgba?\(([^)]+)\)/);
  if (!rgba) return rgb; // fallback
  const parts = rgba[1].split(',').map(s => s.trim());
  const r = parseInt(parts[0], 10) || 0;
  const g = parseInt(parts[1], 10) || 0;
  const b = parseInt(parts[2], 10) || 0;
  if (parts.length === 4) {
    const a = Math.round(parseFloat(parts[3]) * 255);
    return ('#' + [r,g,b,a].map(x => x.toString(16).padStart(2,'0')).join('')).toUpperCase();
  }
  return ('#' + [r,g,b].map(x => x.toString(16).padStart(2,'0')).join('')).toUpperCase();
}

function collectFromDocument() {
  const colors = new Set();
  const fonts = new Set();

  // check computed styles of many elements, but limit to visible ones
  const all = Array.from(document.querySelectorAll('*'));
  for (const el of all) {
    try {
      const cs = window.getComputedStyle(el);
      if (!cs) continue;
      const color = toHex(cs.color);
      const bg = toHex(cs.backgroundColor);
      const border = toHex(cs.borderTopColor);
      if (color) colors.add(color);
      if (bg) colors.add(bg);
      if (border) colors.add(border);

      const ff = cs.fontFamily || '';
      if (ff) {
        const primary = ff.split(',')[0].replace(/['\"]/g, '').trim();
        if (primary) fonts.add(primary);
      }
    } catch (e) {
      // ignore
    }
  }

  // also try inline style colors on body
  const bodycs = window.getComputedStyle(document.body || document.documentElement);
  if (bodycs) {
    colors.add(toHex(bodycs.color));
  }

  // remove falsy and normalize
  const colorList = Array.from(colors).filter(Boolean);
  const fontList = Array.from(fonts).filter(Boolean);
  return { colors: colorList, fonts: fontList };
}

function sendPickedResult(win = window) {
  const result = collectFromDocument();
  // send to extension runtime - popup will receive
  chrome.runtime.sendMessage({ type: 'picked', ...result });
}

// message handling
chrome.runtime.onMessage.addListener((msg, sender, reply) => {
  if (!msg || !msg.action) return;
  if (msg.action === 'collect') {
    sendPickedResult();
  } else if (msg.action === 'start-element-pick') {
    startElementPicker();
  }
});

// element picker overlay
let pickerActive = false;
let hoverEl = null;
let overlayStyleEl = null;

function makeOverlayStyle() {
  overlayStyleEl = document.createElement('style');
  overlayStyleEl.id = 'color-font-picker-overlay-style';
  overlayStyleEl.textContent = `
    .__cfp_highlight { outline: 3px dashed #ff9800 !important; cursor: crosshair !important; }
  `;
  document.head.appendChild(overlayStyleEl);
}

function removeOverlayStyle() {
  if (overlayStyleEl) overlayStyleEl.remove();
  overlayStyleEl = null;
}

function onMouseOver(e) {
  if (hoverEl && hoverEl !== e.target) hoverEl.classList.remove('__cfp_highlight');
  hoverEl = e.target;
  hoverEl.classList.add('__cfp_highlight');
  e.stopPropagation();
}

function onMouseOut(e) {
  if (e.target) e.target.classList.remove('__cfp_highlight');
}

function onClickPick(e) {
  e.preventDefault();
  e.stopPropagation();
  const el = e.target;
  try {
    const cs = window.getComputedStyle(el);
    const color = toHex(cs.color);
    const bg = toHex(cs.backgroundColor);
    const border = toHex(cs.borderTopColor);
    const ff = cs.fontFamily ? cs.fontFamily.split(',')[0].replace(/['\"]/g,'').trim() : null;
    const colors = [color, bg, border].filter(Boolean);
    const fonts = ff ? [ff] : [];
    chrome.runtime.sendMessage({ type: 'picked', colors, fonts });
  } catch (e) {
    chrome.runtime.sendMessage({ type: 'picked', colors: [], fonts: [] });
  }
  stopElementPicker();
}

function startElementPicker() {
  if (pickerActive) return;
  pickerActive = true;
  makeOverlayStyle();
  document.addEventListener('mouseover', onMouseOver, true);
  document.addEventListener('mouseout', onMouseOut, true);
  document.addEventListener('click', onClickPick, true);
  // pressing Escape cancels
  document.addEventListener('keydown', escHandler, true);
}

function stopElementPicker() {
  if (!pickerActive) return;
  pickerActive = false;
  if (hoverEl) hoverEl.classList.remove('__cfp_highlight');
  document.removeEventListener('mouseover', onMouseOver, true);
  document.removeEventListener('mouseout', onMouseOut, true);
  document.removeEventListener('click', onClickPick, true);
  document.removeEventListener('keydown', escHandler, true);
  removeOverlayStyle();
}

function escHandler(e) {
  if (e.key === 'Escape') stopElementPicker();
}

// When the popup connects via runtime.onConnect we can also send initial data
// But we prefer explicit messages.

// Also respond to external runtime.sendMessage from popup via chrome.runtime.sendMessage
// so popup can receive the message via chrome.runtime.onMessage

