/* ============================================================
   ATELIERUL ȘCOLAR — Aplicație
   Rutare, taburi, temă, sunet, inițializare joc.
   ============================================================ */

(function () {
  'use strict';

  const page = document.body.dataset.page; // 'home' | 'subject' | 'activity'
  const params = new URLSearchParams(location.search);

  /* ---------- temă ---------- */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('btn-theme');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    try { localStorage.setItem('atelier-scolar-theme', theme); } catch (e) {}
  }
  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem('atelier-scolar-theme'); } catch (e) {}
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved || (prefersDark ? 'dark' : 'light'));
  }

  /* ---------- sunet ---------- */
  function initSound() {
    const btn = document.getElementById('btn-sound');
    if (!btn) return;
    btn.textContent = Sound.enabled ? '🔊' : '🔇';
    btn.addEventListener('click', () => {
      const on = Sound.toggle();
      btn.textContent = on ? '🔊' : '🔇';
    });
  }

  /* ---------- taburi ---------- */
  function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    if (tabs.length === 0) return;
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.toggle('active', t === tab));
        document.querySelectorAll('.panel').forEach(p => {
          p.classList.toggle('active', p.dataset.panel === target);
        });
        // Dacă e tabul de joc, pornim motorul
        if (target === 'joc') startGame();
      });
    });
  }

  /* ---------- joc ---------- */
  let gameStarted = false;
  function startGame() {
    if (gameStarted) return;
    const a = ACTIVITIES.find(x => x.id === params.get('activity'));
    const area = document.getElementById('game-area');
    if (!a || !area) return;
    gameStarted = true;

    const onDone = (pct) => {
      if (pct >= 60) {
        const first = Progress.complete(a.id, 1);
        if (first) {
          Sound.win();
          Confetti.burst();
          showToast('⭐ Ai câștigat o stea!');
          updateStars();
          // Actualizăm butonul de finalizare
          const btn = document.getElementById('btn-complete');
          if (btn) {
            btn.textContent = '🏆 Activitate finalizată!';
            btn.disabled = true;
          }
        }
      }
    };

    const demo = a.demo;
    switch (demo.type) {
      case 'quiz':     Engines.quiz(area, demo, onDone); break;
      case 'count':    Engines.count(area, demo, onDone); break;
      case 'match':    Engines.match(area, demo, onDone); break;
      case 'arrange':  Engines.arrange(area, demo, onDone); break;
      case 'classify': Engines.classify(area, demo, onDone); break;
      case 'memory':   Engines.memory(area, demo, onDone); break;
      case 'clock':    Engines.clock(area, demo, onDone); break;
      case 'shapes':   Engines.shapes(area, demo, onDone); break;
      case 'type':     Engines.type(area, demo, onDone); break;
      case 'balance':  Engines.balance(area, demo, onDone); break;
      case 'shop':     Engines.shop(area, demo, onDone); break;
      case 'gen':      Engines.gen(area, demo, onDone); break;
      default:
        area.innerHTML = '<div class="g-status bad">Jocul nu este disponibil.</div>';
    }
  }

  /* ---------- finalizare manuală ---------- */
  function initComplete() {
    const btn = document.getElementById('btn-complete');
    if (!btn) return;
    const a = ACTIVITIES.find(x => x.id === params.get('activity'));
    if (!a) return;
    if (Progress.isCompleted(a.id)) {
      btn.textContent = '🏆 Activitate finalizată!';
      btn.disabled = true;
    }
    btn.addEventListener('click', () => {
      const first = Progress.complete(a.id, 1);
      if (first) {
        Sound.win();
        Confetti.burst();
        showToast('⭐ Ai câștigat o stea!');
        updateStars();
      } else {
        Sound.good();
        showToast('Bine ai făcut!');
      }
      btn.textContent = '🏆 Activitate finalizată!';
      btn.disabled = true;
      // Actualizăm panoul de trecere
      const panel = document.querySelector('[data-panel="trecere"]');
      if (panel && !panel.querySelector('.callout')) {
        const c = document.createElement('div');
        c.className = 'callout';
        c.style.borderColor = 'var(--success)';
        c.innerHTML = '<div class="co-title">🏆 Felicitări!</div><p>Această activitate este finalizată. Poți reveni oricând pentru a exersa din nou.</p>';
        panel.appendChild(c);
      }
    });
  }

  /* ---------- toast ---------- */
  function showToast(msg) {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* ---------- stele ---------- */
  function updateStars() {
    const chip = document.getElementById('stars-chip');
    if (chip) chip.textContent = '⭐ ' + Progress.totalStars();
  }

  /* ---------- resetare progres ---------- */
  function initReset() {
    const btn = document.getElementById('btn-reset-progress');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const stars = Progress.totalStars();
      const done = Progress.totalCompleted();
      if (stars === 0 && done === 0) {
        showToast('Nu ai niciun progres de resetat. 🌱');
        return;
      }
      showResetModal();
    });
  }

  function showResetModal() {
    // Elimină un modal deja deschis
    const old = document.getElementById('reset-modal');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.id = 'reset-modal';
    overlay.className = 'modal-overlay';
    overlay.innerHTML =
      '<div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="reset-title">' +
        '<div class="modal-emoji">🦉</div>' +
        '<h2 id="reset-title">Sigur vrei să resetezi?</h2>' +
        '<p>Se vor șterge <strong>toate stelele</strong> și <strong>activitățile finalizate</strong> de pe acest dispozitiv. Nu se poate anula.</p>' +
        '<div class="modal-actions">' +
          '<button id="reset-cancel" class="btn btn-ghost" type="button">Nu, rămân</button>' +
          '<button id="reset-confirm" class="btn btn-danger" type="button">Da, resetează</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    // Animare de intrare
    requestAnimationFrame(() => overlay.classList.add('show'));

    const close = () => {
      overlay.classList.remove('show');
      setTimeout(() => overlay.remove(), 200);
    };

    overlay.querySelector('#reset-cancel').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
    });

    overlay.querySelector('#reset-confirm').addEventListener('click', () => {
      Progress.reset();
      location.reload();
    });
  }

  /* ---------- injectare conținut ---------- */
  function injectContent() {
    const main = document.getElementById('main');
    if (!main) return;
    let html = '';
    if (page === 'home') {
      html = Render.home();
    } else if (page === 'subject') {
      html = Render.subject(params.get('subject'));
    } else if (page === 'activity') {
      html = Render.activity(params.get('activity'));
    } else if (page === 'dece') {
      html = Render.dece();
    }
    main.innerHTML = html;
  }

  /* ---------- pornire ---------- */
  function boot() {
    initTheme();
    initSound();
    injectContent();
    initTabs();
    initComplete();
    initReset();
    updateStars();
    if (typeof Dece !== 'undefined') Dece.init();

    // Buton temă
    const themeBtn = document.getElementById('btn-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme');
        applyTheme(cur === 'dark' ? 'light' : 'dark');
      });
    }

    // Dacă pagina e de activitate și tabul activ e deja joc, pornim
    const activeTab = document.querySelector('.tab.active');
    if (page === 'activity' && activeTab && activeTab.dataset.tab === 'joc') {
      startGame();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
