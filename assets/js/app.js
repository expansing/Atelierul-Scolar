(function () {
  'use strict';
  const assetVersion = new URL(document.currentScript.src).searchParams.get('v');
  const params = new URLSearchParams(location.search);
  const activity = ACTIVITIES.find(a => a.id === params.get('activity'));
  let game = null, level = 0, focusGame = '', missionMode = '', toastTimer;

  function message(text, error) {
    let toast = document.getElementById('notification');
    if (!toast) {
      toast = document.createElement('div'); toast.id = 'notification'; toast.className = 'notification';
      toast.setAttribute('role', 'status'); document.body.appendChild(toast);
    }
    clearTimeout(toastTimer);
    toast.textContent = text; toast.hidden = false;
    toast.classList.toggle('notification-error', !!error);
    if (!error) toastTimer = setTimeout(() => { toast.hidden = true; }, 7000);
  }
  function updateProgress() {
    const stars = document.getElementById('stars-chip');
    if (stars) {
      const count = Progress.totalStars();
      stars.textContent = '⭐ ' + count;
      stars.setAttribute('aria-label', Engines.quantity(count, 'stea câștigată', 'stele câștigate'));
    }
    const status = document.getElementById('activity-status'), results = document.getElementById('level-results');
    if (activity && status) status.textContent = Progress.label(activity.id);
    if (activity && results) results.innerHTML = Render.results(activity.id);
  }
  function startGame() {
    const area = document.getElementById('game-area');
    if (!activity || !area || game) return;
    try {
      const practiceOnly = !!focusGame || !!missionMode;
      const demo = missionMode ? MissionGames.demo(activity.id, missionMode) : Object.assign({}, activity.demo, { focus: focusGame });
      game = Engines.start(area, demo, level, result => {
        if (practiceOnly) {
          message('Practică încheiată. Stelele și progresul salvat au rămas neschimbate. Revino la jocul inițial pentru înregistrarea progresului lecției.');
          return;
        }
        const saved = Progress.record(activity.id, result);
        updateProgress();
        if (saved.newStar) { Sound.win(); Confetti.burst(); }
        if (saved.saved) message(saved.newStar ? 'Ai câștigat o stea: minimum 80% din prima, fără indicii!' : 'Rundă înregistrată. Ai exersat și ai verificat pașii.');
      });
    } catch (error) {
      console.error('Jocul nu a putut fi pornit.', error);
      area.textContent = 'Jocul nu a putut fi pornit. Poți continua explicația; anunță adultul care întreține atelierul.';
      message('A apărut o eroare la pornirea jocului.', true);
    }
  }
  function activateTab(id, focus) {
    document.querySelectorAll('[role="tab"]').forEach(tab => {
      const active = tab.dataset.tab === id;
      tab.classList.toggle('active', active); tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1;
      if (active && focus) tab.focus();
    });
    document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
      const active = panel.dataset.panel === id; panel.hidden = !active; panel.classList.toggle('active', active);
    });
    if (id === 'joc') startGame();
    if (focus) {
      const selected = document.querySelector('[role="tab"][aria-selected="true"]');
      if (selected) selected.focus();
    }
    if (id !== 'explicatie' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const read = document.getElementById('read-lesson'), stop = document.getElementById('stop-reading');
      if (read && stop && !stop.hidden) { read.disabled = false; stop.hidden = true; }
    }
  }
  function initTabs() {
    const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab.dataset.tab, false));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) { event.preventDefault(); activateTab(tabs[next].dataset.tab, true); }
      });
    });
    document.querySelectorAll('[data-open-game]').forEach(button => button.addEventListener('click', () => activateTab('joc', true)));
    document.querySelectorAll('[data-level]').forEach(button => button.addEventListener('click', () => {
      level = Number(button.dataset.level);
      if (game) game.dispose(); game = null;
      document.querySelectorAll('[data-level]').forEach(node => {
        const active = node === button; node.classList.toggle('selected', active); node.setAttribute('aria-pressed', String(active));
      });
      updateGameMenu();
      startGame();
    }));
    const select = document.getElementById('game-select');
    if (select) select.addEventListener('change', () => {
      missionMode = '';
      focusGame = select.value;
      if (game) game.dispose(); game = null;
      updateGameMenu();
      startGame();
    });
    document.querySelectorAll('[data-mission-game]').forEach(button => button.addEventListener('click', () => {
      missionMode = button.dataset.missionGame; focusGame = '';
      if (game) game.dispose(); game = null;
      updateGameMenu(); startGame();
    }));
    updateGameMenu();
  }
  function updateGameMenu() {
    const title = document.getElementById('selected-game-title');
    if (!activity || !title) return;
    document.querySelectorAll('[data-mission-game]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.missionGame === missionMode && !focusGame));
    });
    const mission = MissionGames.options(activity.id).find(option => option.mode === missionMode);
    title.textContent = mission ? mission.title : 'Jocul lecției';
    document.getElementById('selected-game-description').textContent = mission ?
      mission.description + ' Practică fără stele. Fiecare nivel are o altă situație; reluarea repetă cazul ales.' :
      'Încearcă, corectează și citește explicația. „Continuă” apare după rezolvare.';
    const select = document.getElementById('game-select');
    if (!select) return;
    const options = Engines.gameOptions(activity.demo);
    options.forEach(option => {
      select.querySelector('option[value="' + option.id + '"]').disabled = level < (option.minLevel || 0);
    });
    const chosen = options.find(option => option.id === focusGame);
    if (chosen && level < (chosen.minLevel || 0)) {
      focusGame = '';
      document.querySelector('[data-mission-game=""]').setAttribute('aria-pressed', 'true');
      message('Acest joc începe de la nivelul Exersez. La Descopăr am selectat runda completă.');
    }
    select.value = focusGame;
    document.getElementById('game-selection-note').textContent = missionMode ?
      'Ai ales unul dintre jocurile noi. Acest selector te poate readuce la o variantă a jocului inițial.' : focusGame ?
      chosen.description + ' Practică fără stele: nu modifică progresul salvat. Schimbarea jocului reîncepe runda.' :
      'Runda completă combină mecanicile lecției și păstrează evaluarea obișnuită. Jocurile alese separat sunt practică fără stele și nu modifică progresul salvat. Schimbarea jocului reîncepe runda.';
  }
  function confirmAction(title, text, action) {
    const previous = document.activeElement;
    const overlay = document.createElement('div'); overlay.className = 'modal-overlay show';
    overlay.innerHTML = '<div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="confirm-title"><h2 id="confirm-title">' +
      Engines.escape(title) + '</h2><p>' + Engines.escape(text) + '</p><div class="modal-actions">' +
      '<button class="btn" id="confirm-cancel">Renunță</button><button class="btn btn-primary" id="confirm-accept">Confirmă</button></div></div>';
    document.body.appendChild(overlay);
    const close = () => { overlay.remove(); document.removeEventListener('keydown', keys); if (previous && previous.isConnected) previous.focus(); };
    const keys = event => {
      if (event.key === 'Escape') close();
      if (event.key === 'Tab') {
        const buttons = overlay.querySelectorAll('button'), first = buttons[0], last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', keys);
    overlay.querySelector('#confirm-cancel').addEventListener('click', close);
    overlay.querySelector('#confirm-accept').addEventListener('click', () => { close(); action(); });
    overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
    overlay.querySelector('#confirm-cancel').focus();
  }
  function renderPage() {
    if (game) game.dispose(); game = null;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    applyPreferences();
    level = Preferences.get(Progress.profile()).level;
    focusGame = '';
    missionMode = '';
    const main = document.getElementById('main');
    const page = document.body.dataset.page;
    main.innerHTML = page === 'home' ? Render.home() : page === 'subject' ? Render.subject(params.get('subject')) :
      page === 'activity' ? Render.activity(params.get('activity')) : page === 'dece' ? Render.dece() :
        page === 'settings' ? Render.settings() : Render.invalid('Pagina nu a fost găsită.');
    if (activity) document.title = activity.title + ' — Atelierul Școlar';
    Discovery.init(main);
    initTabs(); initProfiles(); initSettings(); initReading(); updateProgress();
    if (typeof Dece !== 'undefined') Dece.init();
    if (assetVersion) document.querySelectorAll('a[href]').forEach(link => {
      if (!/^[a-z-]+\.html(?:[?#]|$)/.test(link.getAttribute('href'))) return;
      const url = new URL(link.href);
      url.searchParams.set('v', assetVersion);
      link.href = url.href;
    });
    const complete = document.getElementById('btn-complete');
    if (complete && activity) complete.addEventListener('click', () => {
      const saved = Progress.markViewed(activity.id); updateProgress();
      if (saved) message('Explicație marcată ca parcursă. Jocul și competențele se înregistrează separat.');
    });
  }
  function initProfiles() {
    const select = document.getElementById('profile-select'), form = document.getElementById('profile-form');
    if (!select || !form) return;
    select.addEventListener('change', () => { Progress.selectProfile(select.value); renderPage(); });
    form.addEventListener('submit', event => {
      event.preventDefault();
      try { Progress.addProfile(document.getElementById('profile-name').value); renderPage(); }
      catch (error) { console.error('Profilul nu a putut fi creat.', error); message(error.message, true); }
    });
    document.getElementById('export-progress').addEventListener('click', () => {
      const url = URL.createObjectURL(new Blob([Progress.exportData()], { type: 'application/json' }));
      const link = document.createElement('a'); link.href = url; link.download = 'atelier-progres.json'; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      message('Copia de progres a fost pregătită pentru descărcare.');
    });
    const input = document.getElementById('import-progress');
    input.addEventListener('change', async () => {
      const file = input.files[0];
      if (!file) return;
      if (file.size > 2000000) { message('Fișierul depășește limita de 2 MB.', true); input.value = ''; return; }
      try {
        const text = await file.text();
        Progress.validate(JSON.parse(text));
        confirmAction('Înlocuiești progresul local?', 'Toate profilurile locale vor fi înlocuite cu cele din fișier. Exportă mai întâi o copie dacă vrei să păstrezi datele actuale.', () => {
          try { const saved = Progress.importData(text); renderPage(); if (saved) message('Progres importat și salvat pe dispozitiv.'); }
          catch (error) { console.error('Import eșuat.', error); message('Importul a eșuat: ' + error.message, true); }
        });
      } catch (error) { console.error('Fișier de progres invalid.', error); message('Fișierul nu a fost importat: ' + error.message, true); }
      input.value = '';
    });
  }
  function initReading() {
    const button = document.getElementById('read-lesson'), stop = document.getElementById('stop-reading');
    if (!button || !activity) return;
    if (!Speech.supported()) {
      button.disabled = true; button.textContent = 'Citirea vocală nu este disponibilă în acest browser'; return;
    }
    const idle = () => { stop.hidden = true; button.disabled = false; };
    button.addEventListener('click', async () => {
      stop.hidden = false; button.disabled = true;
      const problem = await Speech.speak(Discovery.readingText(activity), { end: idle, error: text => message(text, true) });
      if (problem) { idle(); message(problem, true); }
    });
    stop.addEventListener('click', () => { Speech.stop(); idle(); });
  }
  function initPreferences() {
    const theme = document.getElementById('btn-theme'), sound = document.getElementById('btn-sound');
    theme.addEventListener('click', () => changePreferences({ theme: document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark' }));
    sound.addEventListener('click', () => changePreferences({ sound: !Sound.enabled }));
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (Preferences.get(Progress.profile()).theme === 'auto') applyPreferences();
    });
  }
  function applyPreferences() {
    const profile = Progress.profile();
    Preferences.apply(profile);
    const theme = document.getElementById('btn-theme'), sound = document.getElementById('btn-sound'), link = document.getElementById('settings-link');
    const dark = document.documentElement.dataset.theme === 'dark';
    theme.textContent = dark ? '☀️' : '🌙';
    theme.setAttribute('aria-label', dark ? 'Activează tema luminoasă' : 'Activează tema întunecată');
    sound.textContent = Sound.enabled ? '🔊' : '🔇';
    sound.setAttribute('aria-label', Sound.enabled ? 'Oprește sunetul' : 'Pornește sunetul');
    sound.setAttribute('aria-pressed', String(Sound.enabled));
    if (link) { link.textContent = Preferences.avatars[Preferences.get(profile).avatar] + ' Setări'; link.setAttribute('aria-label', 'Setări pentru ' + profile.name); }
    const activeProfile = document.getElementById('active-profile');
    if (activeProfile) activeProfile.textContent = Preferences.avatars[Preferences.get(profile).avatar] + ' Profil activ: ' + profile.name;
    const avatar = document.getElementById('profile-avatar');
    if (avatar) avatar.textContent = Preferences.avatars[Preferences.get(profile).avatar];
  }
  function changePreferences(changes) {
    const profile = Progress.profile(), next = Object.assign({}, Preferences.get(profile), changes);
    const saved = Progress.updateProfile(profile.name, next);
    applyPreferences();
    Object.keys(next).forEach(key => {
      const field = document.getElementById('setting-' + key);
      if (field) field.value = typeof next[key] === 'boolean' ? (next[key] ? 'on' : 'off') : String(next[key]);
    });
    return saved;
  }
  function initSettings() {
    const form = document.getElementById('preferences-form'), rename = document.getElementById('rename-profile');
    if (!form || !rename) return;
    const save = event => {
      event.preventDefault();
      const value = key => document.getElementById('setting-' + key).value;
      try {
        const saved = changePreferences({ font: value('font'), size: Number(value('size')), theme: value('theme'),
          sound: value('sound') === 'on', motion: value('motion') === 'on', level: Number(value('level')), avatar: value('avatar') });
        if (saved) message('Setările profilului au fost salvate.');
      } catch (error) { console.error('Setările nu au putut fi salvate.', error); message(error.message, true); }
    };
    form.addEventListener('change', save);
    form.addEventListener('submit', save);
    document.getElementById('reset-preferences').addEventListener('click', () => {
      const saved = changePreferences(Preferences.defaults());
      if (saved) message('Setările inițiale au fost restabilite. Progresul și pseudonimul au rămas neschimbate.');
    });
    rename.addEventListener('submit', event => {
      event.preventDefault();
      try {
        const saved = Progress.updateProfile(document.getElementById('settings-name').value, Preferences.get(Progress.profile()));
        applyPreferences();
        document.querySelector('#profile-select option:checked').textContent = Progress.profile().name;
        document.getElementById('settings-name').value = Progress.profile().name;
        if (saved) message('Pseudonimul profilului a fost salvat.');
      } catch (error) { console.error('Pseudonimul nu a putut fi salvat.', error); message(error.message, true); }
    });
  }
  function boot() {
    window.addEventListener('atelier-storage-error', event => message(event.detail, true));
    initPreferences(); renderPage();
    if (Progress.lastError) message(Progress.lastError, true);
    const reset = document.getElementById('btn-reset-progress');
    reset.textContent = 'Resetează progresul profilului activ';
    reset.title = 'Șterge doar progresul profilului activ. Setările rămân.';
    reset.addEventListener('click', () => confirmAction(Progress.readOnly ? 'Înlocuiești datele locale care nu pot fi citite?' : 'Resetezi profilul activ?',
      Progress.readOnly ? 'Fișierul local existent nu a putut fi citit. Resetarea îl va înlocui cu datele din această sesiune, fără posibilitatea de a recupera aici profilurile necunoscute. Poți renunța și importa o copie validă.' :
        'Se șterg rezultatele, stelele și traseul profilului activ. Setările și celelalte profiluri rămân. Poți exporta o copie din Setări.', () => {
      const saved = Progress.reset(); renderPage(); if (saved) message('Profilul activ a fost resetat.');
    }));
    window.addEventListener('storage', event => {
      if (event.key === Progress.key() || event.key === null) {
        const previous = Progress.cache;
        Progress.cache = null; Progress.readOnly = false; Progress.lastError = '';
        const current = Progress.load(), before = previous && previous.profiles[previous.active], after = current.profiles[current.active];
        const sameProgress = before && previous.active === current.active &&
          JSON.stringify(before.activities) === JSON.stringify(after.activities) &&
          JSON.stringify(before.journey) === JSON.stringify(after.journey) && before.legacyStars === after.legacyStars;
        const changedPreferences = before && (before.name !== after.name ||
          JSON.stringify(Preferences.get(before)) !== JSON.stringify(Preferences.get(after)));
        if (game && sameProgress && changedPreferences && !Progress.readOnly) {
          applyPreferences(); updateProgress();
          message('Setările profilului au fost actualizate din altă filă. Runda curentă continuă.');
        } else {
          renderPage();
          if (Progress.lastError) message(Progress.lastError, true);
          else message('Progresul local s-a schimbat în altă filă. Pagina a fost actualizată; runda neîncheiată a fost oprită.');
        }
      }
    });
    window.addEventListener('pagehide', () => { if (game) game.dispose(); if ('speechSynthesis' in window) window.speechSynthesis.cancel(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  // Funcționare offline: doar prin http(s); deschis ca fișier, site-ul merge ca înainte.
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && assetVersion) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js?v=' + assetVersion).catch(error => console.warn('Modul offline nu este disponibil.', error));
    });
  }
})();
