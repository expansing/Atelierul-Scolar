/* ============================================================
   ATELIERUL ȘCOLAR — Render
   Construiește conținutul celor 3 pagini:
   index (acasă), subject (subiect), activity (activitate)
   ============================================================ */

const Render = {

  /* ---------- PAGINA ACASĂ ---------- */
  home() {
    const pct = Progress.globalProgress();
    const done = Progress.totalCompleted();
    const total = ACTIVITIES.length;

    let cards = '';
    SUBJECTS.forEach(s => {
      const acts = ACTIVITIES_BY_SUBJECT[s.id];
      const sDone = acts.filter(a => Progress.isCompleted(a.id)).length;
      const sPct = Math.round((sDone / acts.length) * 100);
      cards +=
        '<a class="subject-card" href="subject.html?subject=' + s.id + '" style="--sc:' + s.color + '">' +
        '<div class="sc-icon">' + s.icon + '</div>' +
        '<h3>' + s.title + '</h3>' +
        '<p>' + s.desc + '</p>' +
        '<div class="sc-meta"><span class="chip">' + acts.length + ' activități</span><span class="chip">' + s.age + '</span></div>' +
        '<div class="sc-progress"><i style="width:' + sPct + '%"></i></div>' +
        '</a>';
    });

    return '' +
      '<div class="hero">' +
      '<div class="mascot-big">🦉</div>' +
      '<h1>Bine ai venit la <span class="grad">Atelierul Școlar</span>!</h1>' +
      '<p>Aici înveți ce înveți la școală — dar cu jocuri, culori și distracție. Alege un subiect și hai să jucăm!</p>' +
      '<div class="hero-motto">📚 ' + done + ' din ' + total + ' activități finalizate · ' + pct + '%</div>' +
      '</div>' +
      '<a class="dece-banner" href="dece.html">' +
      '<span class="dece-banner-emoji">🌱</span>' +
      '<span class="dece-banner-text"><strong>De ce învățăm?</strong> Un drum special cu Bufnița: de ce contează atenția, curiozitatea, perseverența și practica.</span>' +
      '<span class="dece-banner-arrow">→</span>' +
      '</a>' +
      '<div class="subjects-grid">' + cards + '</div>' +
      '<div class="callout" style="margin:2rem auto;max-width:700px">' +
      '<div class="co-title">👨‍👩‍👧 Pentru părinți</div>' +
      '<p>Fiecare activitate are o secțiune „Pentru părinți” cu sfaturi de sprijin, semnale de urmărit și idei de joc acasă. Progresul se salvează automat pe acest dispozitiv.</p>' +
      '</div>';
  },

  /* ---------- PAGINA SUBIECT ---------- */
  subject(subjectId) {
    const s = SUBJECTS.find(x => x.id === subjectId);
    if (!s) return this.invalid('Subiectul nu a fost găsit.');
    const acts = ACTIVITIES_BY_SUBJECT[s.id];

    let list = '';
    acts.forEach(a => {
      const done = Progress.isCompleted(a.id);
      list +=
        '<a class="activity-card' + (done ? ' done' : '') + '" href="activity.html?activity=' + a.id + '" style="--sc:' + s.color + '">' +
        '<div class="ac-num">' + (done ? '✓' : a.num) + '</div>' +
        '<div class="ac-icon">' + a.icon + '</div>' +
        '<div class="ac-body"><h3>' + a.title + '</h3><p>' + a.objectives[0] + '</p></div>' +
        '<div class="ac-meta"><span class="chip">' + a.duration + '</span></div>' +
        '</a>';
    });

    return '' +
      '<div class="subject-hero" style="--sc:' + s.color + '">' +
      '<div class="sh-icon">' + s.icon + '</div>' +
      '<h1>' + s.title + '</h1>' +
      '<p>' + s.desc + '</p>' +
      '<div class="sc-meta"><span class="chip">' + s.tagline + '</span><span class="chip">' + s.age + '</span></div>' +
      '</div>' +
      '<div class="activities-list">' + list + '</div>';
  },

  /* ---------- PAGINA ACTIVITATE ---------- */
  activity(activityId) {
    const a = ACTIVITIES.find(x => x.id === activityId);
    if (!a) return this.invalid('Activitatea nu a fost găsită.');
    const s = SUBJECTS.find(x => x.id === a.subject);
    const idx = ACTIVITIES.indexOf(a);
    const prev = idx > 0 ? ACTIVITIES[idx - 1] : null;
    const next = idx < ACTIVITIES.length - 1 ? ACTIVITIES[idx + 1] : null;
    const done = Progress.isCompleted(a.id);

    const tabs = [
      { id: 'explicatie', label: '📖 Explicație' },
      { id: 'joc', label: '🎮 Joc' },
      { id: 'obiective', label: '🎯 Obiective' },
      { id: 'intrebari', label: '💬 Întrebări' },
      { id: 'parinte', label: '👨‍👩‍👧 Părinți' },
      { id: 'trecere', label: '✅ Trecere' }
    ];

    let tabsHtml = '';
    tabs.forEach((t, i) => {
      tabsHtml += '<button class="tab' + (i === 0 ? ' active' : '') + '" data-tab="' + t.id + '">' + t.label + '</button>';
    });

    const panels =
      this._panelExplicatie(a) +
      this._panelJoc(a) +
      this._panelObiective(a) +
      this._panelIntrebari(a) +
      this._panelParinte(a) +
      this._panelTrecere(a, done);

    return '' +
      '<div class="lesson-hero" style="--sc:' + s.color + '">' +
      '<div class="lh-icon">' + a.icon + '</div>' +
      '<div class="lh-sub">' + s.icon + ' ' + s.title + ' · Activitatea ' + a.num + '</div>' +
      '<h1>' + a.title + '</h1>' +
      '<div class="sc-meta"><span class="chip">⏱ ' + a.duration + '</span>' + (done ? '<span class="chip" style="background:var(--success);color:#fff">✓ Finalizată</span>' : '') + '</div>' +
      '</div>' +
      '<div class="tabs">' + tabsHtml + '</div>' +
      '<div class="panels">' + panels + '</div>' +
      '<div class="lesson-actions">' +
      '<button class="btn btn-primary" id="btn-complete">🎉 Am terminat activitatea!</button>' +
      '</div>' +
      '<div class="lesson-nav">' +
      (prev ? '<a href="activity.html?activity=' + prev.id + '"><span>← Anterior</span><strong>' + prev.title + '</strong></a>' : '<span></span>') +
      (next ? '<a href="activity.html?activity=' + next.id + '"><span>Următorul →</span><strong>' + next.title + '</strong></a>' : '<a href="subject.html?subject=' + s.id + '"><span>Înapoi la subiect</span><strong>' + s.title + '</strong></a>') +
      '</div>';
  },

  /* ---------- panouri ---------- */
  _panelExplicatie(a) {
    let html = '<div class="panel active" data-panel="explicatie"><h2>📖 Hai să înțelegem!</h2>';
    a.explanation.forEach(p => { html += '<p>' + p + '</p>'; });
    if (a.montessori) {
      html += this._montessoriBlock(a);
    }
    html += '</div>';
    return html;
  },

  _panelJoc(a) {
    let hint = '';
    if (a.montessori && a.montessori.materials && a.montessori.materials.length) {
      const m = a.montessori.materials[0];
      hint = '<div class="ms-game-hint"><span class="ms-game-hint-icon">' + m.icon + '</span><div><strong>🌿 Moment Montessori</strong><p>' + m.how + '</p></div></div>';
    }
    return '<div class="panel" data-panel="joc">' + hint + '<div class="game" id="game-area"></div></div>';
  },

  /* Blocul Montessori — integrat în explicație, nu tab separat */
  _montessoriBlock(a) {
    const m = a.montessori;
    let html = '<div class="ms-block"><div class="ms-block-title">🌿 La fel ca la Montessori</div>';
    html += '<p class="ms-intro">' + m.intro + '</p>';
    html += '<div class="ms-grid">';
    m.materials.forEach(mat => {
      html += '<div class="ms-card"><div class="ms-card-icon">' + mat.icon + '</div><div class="ms-card-body"><strong>' + mat.name + '</strong><p>' + mat.how + '</p></div></div>';
    });
    html += '</div></div>';
    return html;
  },

  _panelObiective(a) {
    let html = '<div class="panel" data-panel="obiective"><h2>🎯 Ce înveți aici</h2><ul class="objectives">';
    a.objectives.forEach(o => { html += '<li>' + o + '</li>'; });
    html += '</ul></div>';
    return html;
  },

  _panelIntrebari(a) {
    let html = '<div class="panel" data-panel="intrebari"><h2>💬 Întrebări pentru discuție</h2><ul>';
    a.questions.forEach(q => { html += '<li>' + q + '</li>'; });
    html += '</ul><div class="callout"><div class="co-title">💡 Sfat</div><p>Răspunde cu voce tare, chiar dacă nu ești sigur. Gândirea în voce ajută creierul!</p></div></div>';
    return html;
  },

  _panelParinte(a) {
    const p = a.parent;
    let html = '<div class="panel" data-panel="parinte"><h2>👨‍👩‍👧 Pentru părinți</h2>';
    html += '<div class="callout"><div class="co-title">👀 Ce să urmărești</div><ul>';
    p.watch.forEach(w => { html += '<li>' + w + '</li>'; });
    html += '</ul></div>';
    html += '<div class="callout"><div class="co-title">🤝 Cum să ajuți</div><ul>';
    p.help.forEach(h => { html += '<li>' + h + '</li>'; });
    html += '</ul></div>';
    html += '<div class="callout" style="border-color:var(--danger)"><div class="co-title">🚩 Semnale de atenție</div><ul>';
    p.redflags.forEach(r => { html += '<li>' + r + '</li>'; });
    html += '</ul></div>';
    if (a.montessori && a.montessori.tips && a.montessori.tips.length) {
      html += '<div class="callout" style="border-color:#b8e6cc"><div class="co-title">🌿 Joc Montessori acasă</div><ul>';
      a.montessori.tips.forEach(t => { html += '<li>' + t + '</li>'; });
      html += '</ul></div>';
    }
    html += '</div>';
    return html;
  },

  _panelTrecere(a, done) {
    let html = '<div class="panel" data-panel="trecere"><h2>✅ Când este gata</h2><ul class="objectives">';
    a.pass.forEach(p => { html += '<li>' + p + '</li>'; });
    html += '</ul>';
    if (done) html += '<div class="callout" style="border-color:var(--success)"><div class="co-title">🏆 Felicitări!</div><p>Această activitate este finalizată. Poți reveni oricând pentru a exersa din nou.</p></div>';
    html += '</div>';
    return html;
  },

  /* ---------- eroare ---------- */
  invalid(msg) {
    return '<div class="invalid-screen"><div class="big">🤔</div><h1>' + (msg || 'Ups, ceva nu a mers!') + '</h1><a class="btn btn-primary" href="index.html">🏠 Înapoi acasă</a></div>';
  }
};
