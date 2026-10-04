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
    icon: '📖',
    num: 'Oprire 6',
    title: 'Cititul e o călătorie',
    owl: 'Știi ce fac cărțile? Te duc în locuri fără să te urci în avion! Fiecare pagină pe care o citești e un pas într-o aventură nouă.',
    body: [
      'Când citești, creierul tău învață cuvinte noi, înțelege povești și își antrenează imaginația. Cu cât citești mai mult, cu atât ai mai multe cuvinte în „pachetul” tău de cunoștințe.',
      'Nu trebuie să citești ore întregi. Doar 10-15 minute pe zi, în fiecare zi, te fac un cititor bun. Alege cărți care ți se par interesante — povești, poezii, cărți despre animale sau spațiu.'
    ],
    lesson: 'Cititul zilnic, chiar și 10 minute, îți crește vocabularul și îți antrenează creierul.'
  },
  {
    icon: '🌱',
    num: 'Oprire 7',
    title: 'Mintea ta crește ca o plantă',
    owl: 'Iată un secret minunat: mintea ta nu e fixă, ca o piatră. Ea crește, ca o plantă, cu cât o „apari” cu apă și soare — adică cu exercițiu și răbdare!',
    body: [
      'Cercetătorii au descoperit că creierul se schimbă cu adevărat când înveți. Fiecare dată când exersezi, se fac „drumuri noi” în creier, ca niște poteci pe care le folosești din ce în ce mai repede.',
      'Asta înseamnă că nu există „copii buni” și „copii răi” la un lucru. Există doar copii care au exersat mai mult. Tu poți crește la orice, dacă ești răbdător cu tine.'
    ],
    lesson: 'Mintea crește cu exercițiu, ca o plantă cu apă și soare. Nu ești fixat — te poți dezvolta.'
  },
  {
    icon: '😊',
    num: 'Oprire 8',
    title: 'Greșelile sunt prietene',
    owl: 'Spune-mi: ce faci când greșești? Mulți copii se supără. Dar eu îți spun un secret: greșelile sunt cele mai bune prietene ale învățării!',
    body: [
      'Fiecare greșeală îți arată exact unde trebuie să exersezi. E ca un semn de drum: „atenție, aici ai de învățat ceva nou!”. Fără greșeli, nu ai ști ce să îmbunătățești.',
      'Când greșești, nu spune „nu pot”. Spune „nu pot încă”. Aceste două cuvinte mici schimbă totul: „încă” înseamnă că, cu practică, vei putea.'
    ],
    lesson: 'Greșelile te ajută să înveți. Spune „nu pot încă”, nu „nu pot”.'
  },
  {
    icon: '🎯',
    num: 'Oprire 9',
    title: 'Cum să fii atent',
    owl: 'Atenția e ca un arc: dacă îl ții mereu strâns, se obosește. Dar dacă știi cum să-l folosești, te ajută să prinzi exact ce contează!',
    body: [
      'Câteva trucuri simple: (1) Uită-te la cel care vorbește. (2) Ascultă până la final, nu întrerupe. (3) Când simți că „plutești”, respiră adânc și revino la ce se spune. (4) Întreabă-te: „ce am auzit acum?”',
      'Atenția se antrenează ca un mușchi. Cu cât o folosești mai mult, cu atât devine mai puternică. La școală, atenția te ajută să prinzi informația de la prima dată, fără să o repeți de zece ori.'
    ],
    lesson: 'Atenția se antrenează: uită-te, ascultă până la final, respiră și revino la ce se spune.'
  },
  {
    icon: '⏰',
    num: 'Oprire 10',
    title: 'Puterea micilor pași',
    owl: 'Nu trebuie să înveți tot într-o zi. Micile pași, făcute în fiecare zi, te duc mai departe decât un maraton o singură dată!',
    body: [
      '10 minute de matematică în fiecare zi sunt mai bune decât 2 ore o singură dată pe săptămână. Creierul are nevoie de timp să „digeră” ce învați, ca stomacul care are nevoie de timp să digere mâncarea.',
      'Alege-ți un mic obiectiv zilnic: o pagină de citit, 5 probleme de matematică, 10 minute de desen. Când le termini, te-ai antrenat! Micul pas zilnic te face mare, în timp.'
    ],
    lesson: 'Micile pași zilnice (10 min) te duc mai departe decât un maraton o singură dată.'
  },
  {
    icon: '🌟',
    num: 'Oprire 11',
    title: 'Tu poți!',
    owl: 'Ai parcurs tot drumul! Amintește-ți lecțiile: creierul crește, atenția e superputere, curiozitatea descoperă, perseverența nu te oprește, practica te face bun, cititul e o călătorie, mintea crește ca o plantă, greșelile sunt prietene, atenția se antrenează și micile pași te duc departe. Tu poți! 🌟',
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
    '<p>Bufnița te duce pe un drum special, cu ' + DECE_CAMPS.length + ' opriri. La fiecare oprire înveți ceva important despre creierul tău și despre cum devii mai bun. Nu e un test — e o aventură!</p>' +
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
    '<p>Amintește-ți lecțiile:</p>' +
    '<ul class="dece-finish-list">' +
    '<li>🧠 Creierul tău crește cu practica</li>' +
    '<li>👀 Atenția e un superputere</li>' +
    '<li>🧐 Curiozitatea te face să descoperi</li>' +
    '<li>💪 Perseverența te face să nu te oprești</li>' +
    '<li>🏃 Practica te face bun</li>' +
    '<li>📖 Cititul zilnic te duce în aventuri noi</li>' +
    '<li>🌱 Mintea crește ca o plantă, cu exercițiu</li>' +
    '<li>😊 Greșelile sunt prietene — spune „nu pot încă”</li>' +
    '<li>🎯 Atenția se antrenează: uită-te, ascultă, respiră</li>' +
    '<li>⏰ Micile pași zilnice te duc departe</li>' +
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
      case 5: return this._reading();
      case 6: return this._growth();
      case 7: return this._mistakes();
      case 8: return this._focus();
      case 9: return this._steps();
      case 10: return this._celebrate();
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

  /* Oprire 6 — cititul: un cuvânt nou pe zi */
  _reading() {
    return '' +
      '<div class="di di-reading">' +
      '<div class="di-reading-title">Cuvântul zilei! Apeasă pe carte ca să descoperi un cuvânt nou.</div>' +
      '<button class="btn btn-primary di-btn di-reading-book" id="di-reading-book">📖 Deschide cartea</button>' +
      '<div class="di-reading-word" id="di-reading-word"></div>' +
      '<div class="di-reading-count" id="di-reading-count">Cuvinte descoperite: 0</div>' +
      '</div>';
  },

  /* Oprire 7 — mintea crește ca o plantă */
  _growth() {
    return '' +
      '<div class="di di-growth">' +
      '<div class="di-growth-title">Apa mintea ta! Fiecare „apă” o face să crească.</div>' +
      '<div class="di-growth-plant" id="di-growth-plant">🌱</div>' +
      '<div class="di-growth-status" id="di-growth-status">Mintea ta e o sămânță. Apasă „Apă mintea!”</div>' +
      '<button class="btn btn-primary di-btn" id="di-growth-btn">💧 Apă mintea!</button>' +
      '</div>';
  },

  /* Oprire 8 — greșelile sunt prietene */
  _mistakes() {
    return '' +
      '<div class="di di-mistakes">' +
      '<div class="di-mistakes-title">Ce spui când greșești? Alege varianta care te ajută!</div>' +
      '<div class="di-mistakes-choices">' +
      '<button class="di-mistakes-choice" data-mist="bad">„Nu pot!” 😞</button>' +
      '<button class="di-mistakes-choice" data-mist="good">„Nu pot încă!” 😊</button>' +
      '</div>' +
      '<div class="di-mistakes-answer" id="di-mistakes-answer"></div>' +
      '</div>';
  },

  /* Oprire 9 — atenția: respiră și revino */
  _focus() {
    return '' +
      '<div class="di di-focus">' +
      '<div class="di-focus-title">Exercițiul de atenție: respiră cu cercul.</div>' +
      '<div class="di-focus-circle" id="di-focus-circle">🎯</div>' +
      '<div class="di-focus-status" id="di-focus-status">Apasă „Respiră” și urmărește cercul.</div>' +
      '<button class="btn btn-primary di-btn" id="di-focus-btn">Respiră 🌬️</button>' +
      '</div>';
  },

  /* Oprire 10 — micile pași */
  _steps() {
    return '' +
      '<div class="di di-steps">' +
      '<div class="di-steps-title">Micul tău pas de azi! Alege un obiectiv mic și termină-l.</div>' +
      '<div class="di-steps-list" id="di-steps-list"></div>' +
      '<div class="di-steps-status" id="di-steps-status">Alege un obiectiv mic!</div>' +
      '</div>';
  },

  /* Oprire 11 — celebrare */
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
    else if (i === 5) this._wireReading(el);
    else if (i === 6) this._wireGrowth(el);
    else if (i === 7) this._wireMistakes(el);
    else if (i === 8) this._wireFocus(el);
    else if (i === 9) this._wireSteps(el);
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

  _wireReading(el) {
    const words = [
      { w: 'AVENTURĂ', d: 'O călătorie plină de lucruri noi și interesante!' },
      { w: 'CURIOZITATE', d: 'Vrea să afli mai multe despre ceva. E un superputere al creierului!' },
      { w: 'PERSEVERENȚĂ', d: 'Să nu te oprești când e greu. Să încerci din nou și din nou!' },
      { w: 'VOCABULAR', d: 'Pachetul de cuvinte pe care le știi. Cu cât citești, cu cât crește!' },
      { w: 'ATENȚIE', d: 'Superputerea de a te uita și a asculta exact ce contează.' },
      { w: 'OBIECTIV', d: 'Un lucru mic pe care vrei să-l termini. De exemplu: o pagină de citit.' }
    ];
    const btn = el.querySelector('#di-reading-book');
    const word = el.querySelector('#di-reading-word');
    const count = el.querySelector('#di-reading-count');
    let found = 0;
    const used = new Set();
    btn.addEventListener('click', () => {
      let idx;
      do { idx = Math.floor(Math.random() * words.length); } while (used.has(idx) && used.size < words.length);
      used.add(idx);
      found++;
      word.innerHTML = '<span class="di-reading-word-big">' + words[idx].w + '</span><p>' + words[idx].d + '</p>';
      word.classList.add('show');
      count.textContent = 'Cuvinte descoperite: ' + found;
      Sound.good();
      if (found >= 3) Confetti.burst();
    });
  },

  _wireGrowth(el) {
    const stages = ['🌱', '🌿', '🪴', '🌳', '🌳✨'];
    const msgs = [
      'Mintea ta e o sămânță. Apasă „Apă mintea!”',
      'Aproape! Sămânța dă radăcină.',
      'Crește! Mintea ta învață din ce în ce mai repede.',
      'E o plantă zdravănă! Exercițiul o face puternică.',
      '🎉 Mintea ta e un copac înalt! Ai înțeles: crește cu exercițiu!'
    ];
    const plant = el.querySelector('#di-growth-plant');
    const status = el.querySelector('#di-growth-status');
    const btn = el.querySelector('#di-growth-btn');
    let stage = 0;
    btn.addEventListener('click', () => {
      stage = Math.min(stages.length - 1, stage + 1);
      plant.textContent = stages[stage];
      plant.style.transform = 'scale(' + (1 + stage * 0.25) + ')';
      status.textContent = msgs[stage];
      Sound.good();
      if (stage === stages.length - 1) {
        btn.disabled = true;
        btn.textContent = 'Copacul e gata! 🌳';
        Confetti.burst();
      }
    });
  },

  _wireMistakes(el) {
    const answer = el.querySelector('#di-mistakes-answer');
    el.querySelectorAll('[data-mist]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.mist === 'good') {
          answer.textContent = '🎉 Corect! „Nu pot încă” înseamnă că, cu practică, vei putea. Greșelile sunt prietene!';
          answer.classList.add('show', 'good');
          Sound.good();
          Confetti.burst();
        } else {
          answer.textContent = 'Hmm... „Nu pot” te oprește. Încearcă varianta care te ajută să continui!';
          answer.classList.add('show', 'bad');
          Sound.bad();
        }
      });
    });
  },

  _wireFocus(el) {
    const circle = el.querySelector('#di-focus-circle');
    const status = el.querySelector('#di-focus-status');
    const btn = el.querySelector('#di-focus-btn');
    let running = false;
    btn.addEventListener('click', () => {
      if (running) return;
      running = true;
      btn.disabled = true;
      const phases = [
        ['Respiri adânc... (cercul crește)', 1.8],
        ['Ții aerul... (cercul e mare)', 1.2],
        ['Expiri lent... (cercul scade)', 1.8],
        ['Gata! Ești atent și calm. 🎯', 0]
      ];
      let pi = 0;
      const runPhase = () => {
        if (pi >= phases.length) {
          running = false;
          btn.disabled = false;
          status.textContent = '🎉 Ai exersat atenția! Mai poți respira o dată.';
          return;
        }
        status.textContent = phases[pi][0];
        const dur = phases[pi][1];
        if (dur === 0) {
          circle.style.transform = 'scale(1)';
          pi++;
          setTimeout(runPhase, 600);
          return;
        }
        const grow = pi === 0;
        circle.style.transition = 'transform ' + dur + 's ease-in-out';
        circle.style.transform = 'scale(' + (grow ? 1.8 : 0.7) + ')';
        pi++;
        setTimeout(runPhase, dur * 1000);
      };
      runPhase();
    });
  },

  _wireSteps(el) {
    const steps = [
      { e: '📖', t: 'Citește o pagină' },
      { e: '🔢', t: 'Rezolvă 5 probleme' },
      { e: '🎨', t: 'Desenează 10 minute' },
      { e: '🧩', t: 'Joc de logică 10 min' },
      { e: '✍️', t: 'Scrie 3 propoziții' }
    ];
    const list = el.querySelector('#di-steps-list');
    const status = el.querySelector('#di-steps-status');
    let doneCount = 0;
    steps.forEach((s, idx) => {
      const b = document.createElement('button');
      b.className = 'di-steps-item';
      b.innerHTML = '<span class="di-steps-emoji">' + s.e + '</span> ' + s.t;
      b.addEventListener('click', () => {
        if (b.classList.contains('done')) return;
        b.classList.add('done');
        doneCount++;
        Sound.good();
        if (doneCount >= steps.length) {
          status.textContent = '🎉 Ai terminat toate micile pași de azi! Ești un campion al practicii!';
          Confetti.burst();
        } else {
          status.textContent = '✅ Gata! Mai ai ' + (steps.length - doneCount) + ' pași mici de făcut.';
        }
      });
      list.appendChild(b);
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
