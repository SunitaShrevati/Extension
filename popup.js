const collectBtn = document.getElementById('collect');
const pickBtn = document.getElementById('pick-element');
const colorsEl = document.getElementById('colors');
const fontsEl = document.getElementById('fonts');

function sendToActiveTab(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs[0]) return;
    chrome.tabs.sendMessage(tabs[0].id, message, (resp) => {
      // ignore errors if content script not ready
      const err = chrome.runtime.lastError;
      if (err) console.log('sendMessage error:', err.message);
    });
  });
}

collectBtn.addEventListener('click', () => {
  colorsEl.textContent = 'Collecting...';
  fontsEl.textContent = 'Collecting...';
  sendToActiveTab({ action: 'collect' });
});

pickBtn.addEventListener('click', () => {
  sendToActiveTab({ action: 'start-element-pick' });
  window.close();
});

function createColorSwatch(hex) {
  const btn = document.createElement('button');
  btn.className = 'swatch';
  btn.title = hex;
  btn.style.background = hex;
  btn.textContent = hex;
  btn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(hex); }
    catch (e) { console.warn('Clipboard failed', e); }
  });
  return btn;
}

function createFontItem(font) {
  const div = document.createElement('div');
  div.className = 'font-item';
  div.textContent = font;
  div.style.fontFamily = font;
  div.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(font); }
    catch (e) { console.warn('Clipboard failed', e); }
  });
  return div;
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'picked') {
    const { colors = [], fonts = [] } = msg;
    colorsEl.innerHTML = '';
    if (colors.length === 0) colorsEl.textContent = 'No colors found.';
    else colors.forEach(c => colorsEl.appendChild(createColorSwatch(c)));

    fontsEl.innerHTML = '';
    if (fonts.length === 0) fontsEl.textContent = 'No fonts found.';
    else fonts.forEach(f => fontsEl.appendChild(createFontItem(f)));
  }
});
