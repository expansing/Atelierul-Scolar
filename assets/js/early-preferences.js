/* Se încarcă în <head>, înainte de afișare: aplică tema, fontul, mărimea și
   mișcarea salvate în profilul activ, ca pagina să nu clipească (de exemplu
   albă în modul întunecat). Valorile sunt verificate aici după aceleași reguli
   ca în preferences.js; app.js le aplică din nou, complet, după încărcare. */
(function () {
  'use strict';
  try {
    const root = document.documentElement;
    let prefs = null;
    const raw = localStorage.getItem('atelier-scolar-progress-v2');
    if (raw) {
      const data = JSON.parse(raw);
      const profile = data && data.profiles && data.profiles[data.active];
      prefs = profile && profile.preferences;
    }
    let theme = prefs && prefs.theme;
    if (!['auto', 'light', 'dark'].includes(theme)) {
      const legacy = localStorage.getItem('atelier-scolar-theme');
      theme = legacy === 'light' || legacy === 'dark' ? legacy : 'auto';
    }
    if (theme === 'auto') theme = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.dataset.theme = theme;
    if (prefs) {
      if (['readable', 'handwriting', 'serif'].includes(prefs.font)) root.dataset.font = prefs.font;
      if ([100, 110, 125, 150].includes(prefs.size)) root.style.fontSize = prefs.size + '%';
      if (typeof prefs.motion === 'boolean') root.dataset.motion = prefs.motion ? 'reduce' : 'full';
    }
  } catch (error) { /* stocare indisponibilă sau date invalide: rămâne tema implicită */ }
})();
