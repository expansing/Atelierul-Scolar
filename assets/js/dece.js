/* ============================================================
   ATELIERUL ȘCOLAR — „De ce învățăm?”
   Un drum special pentru copii: 6 opriri, ghidate de Bufnița.
   Model diferit de restul site-ului: un traseu interactiv cu
   un „metru de creștere” și un element interactiv la fiecare oprire.
   ============================================================ */

/* ---------- conținutul celor 6 opriri ---------- */
const DECE_CAMPS = [
  {
    icon: '🧠',
    num: 'Oprire 1',
    title: 'Creierul tău crește',
    owl: 'Salut! Eu sunt Bufnița. Hai să vedem un secret: creierul tău e ca un mușchi. Cu cât îl antrenezi, cu atât devine mai puternic!',
    body: [
      'Fiecare dată când înveți ceva nou — o literă, un număr, o regulă — creierul tău se antrenează.',
      'La început e greu, dar cu practica devine mai ușor. Exact ca atunci când înveți să pedalezi la bicicletă: la început tremuri, apoi mergi singur!'
    ],
    lesson: 'Învațarea = antrenament pentru creier. Cu cât exersezi mai mult, cu atât creierul crește mai tare.'
  },
  {
    icon: '👀',
    num: 'Oprire 2',
    title: 'Atenția e un superputere',
    owl: 'Știi de ce te rog să fii atent la școală? Pentru că atenția e ca un superputere. Fără ea, informația se scurge ca apa prin degete!',
    body: [
      'Când te uiți și asculți, creierul tău „prinde” ce învați. Dacă te joci cu degetele sau te uiți în altă parte, informația nu ajunge la tine.',
      'Atenția nu e o pedeapsă — e un cadou pe care ți-l faci ție. Cu cât ești mai atent, cu atât înveți mai repede și te simți mai bine.'
    ],
    lesson: 'Atenția la școală te ajută să prinzi informația. E un superputere pe care îl folosești pentru tine.'
  },
  {
    icon: '🧐',
    num: 'Oprire 3',
    title: 'Curiozitatea te face să descoperi',
    owl: 'Copiii care pun întrebări învață cel mai mult! „De ce?” și „Cum?” sunt cele mai puternice cuvinte din lume. Hai să descoperim împreună!',
    body: [
      'Curiozitatea înseamnă să vrei să afli mai multe. Când te întrebi „de ce cerul e albastru?” sau „cum crește o floare?”, creierul tău se trezește.',
      'Nu există întrebări proaste! Fiecare întrebare te duce la un răspuns nou. Întreabă mereu, acasă și la școală.'
    ],
    lesson: 'Curiozitatea = a întreba „de ce?” și „cum?”. Copiii curioși descoperă mai multe.'
  },
  {
    icon: '💪',
    num: 'Oprire 4',
    title: 'Nu te opri când e greu',
    owl: 'Uneori lucrurile sunt grele la început. Asta e NORMAL! Perseverența înseamnă să nu te oprești. Hai să încercăm împreună!',
    body: [
      'Fiecare om mare a greșit de multe ori înainte să reușească. Chiar și cei mai buni jucători au început cu greșeli.',
      'Perseverența înseamnă: „Nu reușesc acum, dar voi încerca din nou.” Fiecare încercare te aduce mai aproape de reușită. Nu te opri!'
    ],
    lesson: 'Perseverența = a nu te opri când e greu. Fiecare încercare te aduce mai aproape.'
  },
  {
    icon: '🏃',
    num: 'Oprire 5',
    title: 'Practica bate inteligența',
    owl: 'Iată un secret mare: nu inteligența te face bun, ci PRACTICA! Un copil care exersează zilnic învinge pe cel care e „deștept” dar nu exersează.',
    body: [
      'Există copii care par „deștepți” dar nu exersează, și copii care exersează în fiecare zi. La final, cei care exersează câștigă!',
      'Tu poți deveni bun la orice — matematică, citit, desene, sport — dacă exersezi puțin, în fiecare zi. Nu ești născut bun sau rău; devii bun prin practică.'
    ],
    lesson: 'Practica zilnică te face bun. Nu ești născut bun sau rău — devii bun prin exercițiu.'
  },
  {
    icon: '🌟',
    num: 'Oprire 6',
    title: 'Tu poți!',
    owl: 'Ai parcurs tot drumul! Amintește-ți cele 5 lecții: creierul crește, atenția e superputere, curiozitatea descoperă, perseverența nu te oprește, și practica te face bun. Tu poți! 🌟',
    body: [
      'Acum știi de ce învățăm: pentru că creierul tău crește, pentru că atenția te ajută, pentru că ești curios, pentru că nu te oprești, și pentru că practica te face bun.',
      'Nu ai nevoie să fii „cel mai deștept”. Ai nevoie doar să fii tu, să exersezi, să întrebi, și să nu te oprești. Asta e adevăratul secret!'
    ],
    lesson: 'Tu poți deveni bun la orice, dacă exersezi, întrebi, ești atent și nu te oprești.'
  }
];

/* ---------- randare pagina ---------- */
Render.dece = function () {
  let camps = '';
  DECE_CAMPS.forEach((c, i) => {
    camps +=
      '<div class="dece-camp' + (i % 2 === 1 ? ' right' : '') + '" data-camp="' + i + '">' +
      '<div class="dece-node">' + c.icon + '</div>' +
      '<div class="dece-camp-card">' +
      '<div class="dece-camp-num">' + c.num + '</div>' +
      '<h2>' + c.title + '</h2>' +
      '<div class="dece-owl"><span class="dece-owl-face">🦉</span><p>' + c.owl + '</p></div>' +
      '<div class="dece-body">' + c.body.map(p => '<p>' + p + '</p>').join('') + '</div>' +
      '<div class="dece-interactive" data-interactive="' + i + '"></div>' +
      '<div class="dece-lesson"><span class="dece-lesson-tag">📌 Lecția</span> ' + c.lesson + '</div>' +
      '<button class="btn btn-primary dece-done-btn" data-done="' + i + '">Am înțeles! ✅</button>' +
      '</div>' +
      '</div>';
  });

  return '' +
    '<div class="dece-hero">' +
    '<div class="dece-mascot">🦉</div>' +
    '<h1>De ce <span class="grad">învățăm</span>?</h1>' +
    '<p>Bufnița te duce pe un drum special, cu 6 opriri. La fiecare oprire înveți ceva important despre creierul tău și despre cum devii mai bun. Nu e un test — e o aventură!</p>' +
    '<div class="dece-meter">' +
    '<div class="dece-meter-label">🌱 Drumul tău</div>' +
    '<div class="dece-meter-bar"><i id="dece-progress"></i></div>' +
    '<div class="dece-meter-count" id="dece-count">0 / ' + DECE_CAMPS.length + '</div>' +
    '</div>' +
    '</div>' +
    '<div class="dece-path">' + camps + '</div>' +
    '<div class="dece-finish" id="dece-finish" hidden>' +
    '<div class="dece-finish-card">' +
    '<div class="dece-finish-emoji">🏆</div>' +
    '<h2>Bravo! Ai parcurs tot drumul!</h2>' +
    '<p>Amintește-ți cele 5 lecții:</p>' +
    '<ul class="dece-finish-list">' +
    '<li>🧠 Creierul tău crește cu practica</li>' +
    '<li>👀 Atenția e un superputere</li>' +
    '<li>🧐 Curiozitatea te face să descoperi</li>' +
    '<li>💪 Perseverența te face să nu te oprești</li>' +
    '<li>🏃 Practica te face bun</li>' +
    '</ul>' +
    '<p class="dece-finish-big">Tu poți! 🌟</p>' +
    '<a class="btn btn-primary" href="index.html">🏠 Înapoi la activități</a>' +
    '</div>' +
    '</div>';
};

/* ---------- logica interactivă ---------- */
const Dece = {
  done: {},

  init() {
    if (document.body.dataset.page !== 'dece') return;
    this.buildInteractives();
    this.bindDoneButtons();
    this.updateMeter();
  },

  /* construiește elementul interactiv al fiecărei opriri */
  buildInteractives() {
    document.querySelectorAll('[data-interactive]').forEach(el => {
      const i = parseInt(el.dataset.interactive, 10);
      el.innerHTML = this.interactiveFor(i);
      this.wireInteractive(i, el);
    });
  },

  interactiveFor(i) {
    switch (i) {
      case 0: return this._brain();
      case 1: return this._attention();
      case 2: return this._curiosity();
      case 3: return this._perseverance();
      case 4: return this._practice();
      case 5: return this._celebrate();
      default: return '';
    }
  },

  /* Oprire 1 — antrenează creierul */
  _brain() {
    return '' +
      '<div class="di di-brain">' +
      '<div class="di-brain-emoji" id="di-brain-emoji">🧠</div>' +
      '<div class="di-brain-meter"><i id="di-brain-fill"></i></div>' +
      '<div class="di-brain-label" id="di-brain-label">Puterea creierului: 0%</div>' +
      '<button class="btn btn-primary di-btn" id="di-brain-btn">Exersează! 💪</button>' +
      '</div>';
  },

  /* Oprire 2 — găsește bufnița */
  _attention() {
    return '' +
      '<div class="di di-attention">' +
      '<div class="di-attention-title">Găsește bufnița! 🦉</div>' +
      '<div class="di-attention-grid" id="di-attention-grid"></div>' +
      '<div class="di-attention-status" id="di-attention-status">Runda 1 din 3</div>' +
      '</div>';
  },

  /* Oprire 3 — curiozitatea */
  _curiosity() {
    const items = [
      { e: '🍎', q: 'De ce mărul e roș?', a: 'Mărul e roș pentru că are un pigment numit antocianină. Soarele îl ajută să devină mai colorat!' },
      { e: '🍃', q: 'De ce frunzele sunt verzi?', a: 'Frunzele sunt verzi pentru că au clorofilă, care le ajută să „mănânce” lumina soarelui!' },
      { e: '🚗', q: 'Cum merge mașina?', a: 'Mașina merge pentru că motorul aruncă aerul în spate, iar roțile împing mașina înainte!' },
      { e: '📖', q: 'De ce citim cărți?', a: 'Cărțile ne duc în locuri noi, fără să ne urcăm în avion! Fiecare pagină e o aventură.' }
    ];
    let cards = '';
    items.forEach((it, idx) => {
      cards += '<button class="di-curiosity-card" data-cur="' + idx + '"><span class="di-curiosity-emoji">' + it.e + '</span><span class="di-curiosity-q">' + it.q + '</span></button>';
    });
    return '' +
      '<div class="di di-curiosity">' +
      '<div class="di-curiosity-title">Ce te face curios? Apeasă pe un lucru!</div>' +
      '<div class="di-curiosity-grid">' + cards + '</div>' +
      '<div class="di-curiosity-answer" id="di-curiosity-answer">Alege un lucru și descoperă răspunsul! 🧐</div>' +
      '</div>';
  },

  /* Oprire 4 — perseverența */
  _perseverance() {
    return '' +
      '<div class="di di-perseverance">' +
      '<div class="di-perseverance-title">Construiește turnul! Nu te opri!</div>' +
      '<div class="di-perseverance-tower" id="di-perseverance-tower"></div>' +
      '<div class="di-perseverance-status" id="di-perseverance-status">Încearcă să pui o cărămidă!</div>' +
      '<button class="btn btn-primary di-btn" id="di-perseverance-btn">Pune o cărămidă 🧱</button>' +
      '</div>';
  },

  /* Oprire 5 — practica bate inteligența */
  _practice() {
    return '' +
      '<div class="di di-practice">' +
      '<div class="di-practice-title">Geniu vs. Luptător — cine câștigă?</div>' +
      '<div class="di-practice-track">' +
      '<div class="di-practice-racer" data-racer="geniu"><span class="di-practice-emoji">🧑‍🎓</span><span class="di-practice-name">Geniu (nu exersează)</span><div class="di-practice-bar"><i id="di-practice-geniu"></i></div></div>' +
      '<div class="di-practice-racer" data-racer="luptator"><span class="di-practice-emoji">🏃</span><span class="di-practice-name">Luptător (exersează zilnic)</span><div class="di-practice-bar"><i id="di-practice-luptator"></i></div></div>' +
      '</div>' +
      '<div class="di-practice-status" id="di-practice-status">Apasă „Practică o zi!” și vezi ce se întâmplă!</div>' +
      '<button class="btn btn-primary di-btn" id="di-practice-btn">Practică o zi! 📚</button>' +
      '</div>';
  },

  /* Oprire 6 — celebrare */
  _celebrate() {
    return '' +
      '<div class="di di-celebrate">' +
      '<div class="di-celebrate-emoji">🎉</div>' +
      '<div class="di-celebrate-text">Ai ajuns la finalul drumului! Apasă „Am înțeles!” de la fiecare oprire pentru a-ți umple metru de creștere.</div>' +
      '</div>';
  },

  /* leagă evenimentele pentru fiecare interactiv */
  wireInteractive(i, el) {
    if (i === 0) this._wireBrain(el);
    else if (i === 1) this._wireAttention(el);
    else if (i === 2) this._wireCuriosity(el);
    else if (i === 3) this._wirePerseverance(el);
    else if (i === 4) this._wirePractice(el);
  },

  _wireBrain(el) {
    let power = 0;
    const btn = el.querySelector('#di-brain-btn');
    const emoji = el.querySelector('#di-brain-emoji');
    const fill = el.querySelector('#di-brain-fill');
    const label = el.querySelector('#di-brain-label');
    btn.addEventListener('click', () => {
      power = Math.min(100, power + 10);
      fill.style.width = power + '%';
      label.textContent = 'Puterea creierului: ' + power + '%';
      const size = 40 + (power / 100) * 40;
      emoji.style.fontSize = size + 'px';
      emoji.style.transform = 'scale(' + (1 + power / 200) + ')';
      Sound.good();
      if (power >= 100) {
        label.textContent = '🎉 Creierul tău a crescut!';
        btn.disabled = true;
        btn.textContent = 'Creier antrenat! 🧠';
        Confetti.burst();
      }
    });
  },

  _wireAttention(el) {
    const grid = el.querySelector('#di-attention-grid');
    const status = el.querySelector('#di-attention-status');
    let round = 0;
    const total = 3;
    const startRound = () => {
      round++;
      status.textContent = 'Runda ' + round + ' din ' + total;
      // 9 emoji, unul e bufnița
      const items = [];
      for (let k = 0; k < 9; k++) items.push('🐦');
      const owlPos = Math.floor(Math.random() * 9);
      items[owlPos] = '🦉';
      // amestecăm
      for (let k = items.length - 1; k > 0; k--) {
        const j = Math.floor(Math.random() * (k + 1));
        [items[k], items[j]] = [items[j], items[k]];
      }
      grid.innerHTML = '';
      items.forEach((it, idx) => {
        const b = document.createElement('button');
        b.className = 'di-attention-cell';
        b.textContent = it;
        b.addEventListener('click', () => {
          if (it === '🦉') {
            b.classList.add('found');
            Sound.good();
            setTimeout(() => {
              if (round >= total) {
                status.textContent = '🎉 Ai găsit toate bufnițele! Atenția ta e superputere!';
                Confetti.burst();
              } else {
                startRound();
              }
            }, 500);
          } else {
            b.classList.add('wrong');
            Sound.bad();
            setTimeout(() => b.classList.remove('wrong'), 400);
          }
        });
        grid.appendChild(b);
      });
    };
    startRound();
  },

  _wireCuriosity(el) {
    const items = [
      { a: 'Mărul e roș pentru că are un pigment numit antocianină. Soarele îl ajută să devină mai colorat!' },
      { a: 'Frunzele sunt verzi pentru că au clorofilă, care le ajută să „mănânce” lumina soarelui!' },
      { a: 'Mașina merge pentru că motorul aruncă aerul în spate, iar roțile împing mașina înainte!' },
      { a: 'Cărțile ne duc în locuri noi, fără să ne urcăm în avion! Fiecare pagină e o aventură.' }
    ];
    const answer = el.querySelector('#di-curiosity-answer');
    el.querySelectorAll('[data-cur]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.cur, 10);
        answer.textContent = '🦉 ' + items[idx].a;
        answer.classList.add('show');
        Sound.good();
      });
    });
  },

  _wirePerseverance(el) {
    const tower = el.querySelector('#di-perseverance-tower');
    const status = el.querySelector('#di-perseverance-status');
    const btn = el.querySelector('#di-perseverance-btn');
    let tries = 0;
    const needed = 3 + Math.floor(Math.random() * 3); // 3-5 încercări
    btn.addEventListener('click', () => {
      tries++;
      if (tries < needed) {
        // turnul cade
        tower.innerHTML = '<div class="di-perseverance-fall">💥 Turnul a căzut! Încearcă din nou!</div>';
        status.textContent = 'Nu te opri! Mai ai de încercat.';
        Sound.bad();
      } else {
        // turnul e construit
        let blocks = '';
        for (let k = 0; k < 5; k++) blocks += '<div class="di-perseverance-block"></div>';
        tower.innerHTML = '<div class="di-perseverance-built">' + blocks + '</div>';
        status.textContent = '🎉 Ai reușit după ' + tries + ' încercări! Perseverența a câștigat!';
        btn.disabled = true;
        btn.textContent = 'Turnul e gata! 🏆';
        Sound.win();
        Confetti.burst();
      }
    });
  },

  _wirePractice(el) {
    const geniu = el.querySelector('#di-practice-geniu');
    const luptator = el.querySelector('#di-practice-luptator');
    const status = el.querySelector('#di-practice-status');
    const btn = el.querySelector('#di-practice-btn');
    let g = 0, l = 0;
    const goal = 100;
    btn.addEventListener('click', () => {
      // Geniu avansează puțin (e deștept dar nu exersează)
      g = Math.min(goal, g + 4);
      // Luptător avansează mai mult (exersează zilnic)
      l = Math.min(goal, l + 8);
      geniu.style.width = g + '%';
      luptator.style.width = l + '%';
      Sound.good();
      if (l >= goal && g < goal) {
        status.textContent = '🏆 Luptătorul a câștigat! Practica bate inteligența!';
        btn.disabled = true;
        btn.textContent = 'Luptătorul a câștigat! 🏆';
        Confetti.burst();
      } else if (l >= goal) {
        status.textContent = '🎉 Luptătorul a ajuns la final! Practica a câștigat!';
        btn.disabled = true;
        btn.textContent = 'Practica a câștigat! 🏆';
        Confetti.burst();
      } else {
        status.textContent = 'Luptătorul avansează mai repede! Mai apasă „Practică o zi!”';
      }
    });
  },

  /* butoanele „Am înțeles!” */
  bindDoneButtons() {
    document.querySelectorAll('.dece-done-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.done, 10);
        if (this.done[i]) return;
        this.done[i] = true;
        btn.textContent = '✅ Înțeles!';
        btn.disabled = true;
        const camp = document.querySelector('[data-camp="' + i + '"]');
        if (camp) camp.classList.add('done');
        Sound.good();
        this.updateMeter();
        this.checkFinish();
      });
    });
  },

  updateMeter() {
    const count = Object.keys(this.done).length;
    const total = DECE_CAMPS.length;
    const fill = document.getElementById('dece-progress');
    const label = document.getElementById('dece-count');
    if (fill) fill.style.width = (count / total * 100) + '%';
    if (label) label.textContent = count + ' / ' + total;
  },

  checkFinish() {
    const count = Object.keys(this.done).length;
    if (count >= DECE_CAMPS.length) {
      const finish = document.getElementById('dece-finish');
      if (finish) {
        finish.hidden = false;
        finish.scrollIntoView({ behavior: 'smooth', block: 'center' });
        Confetti.burst();
        Sound.win();
      }
    }
  }
};
