const Render = {
  escape(text) { return Engines.escape(text); },
  list(items) { return '<ul>' + items.map(text => '<li>' + this.escape(text) + '</li>').join('') + '</ul>'; },
  thinkingPath(currentId) {
    return '<nav class="callout thinking-path" aria-label="' + this.escape(THINKING_PATH.title) + '"><h2>' + this.escape(THINKING_PATH.title) +
      '</h2><p>' + this.escape(THINKING_PATH.description) + '</p><p>Un traseu între Logică și gândire și Dezvoltare personală. Poți începe cu prima activitate sau poți alege liber.</p><ol>' +
      THINKING_PATH.activities.map(id => {
        const activity = ACTIVITIES.find(item => item.id === id);
        return '<li><a href="activity.html?activity=' + id + '"' + (id === currentId ? ' aria-current="page"' : '') + '>' +
          this.escape(activity.title) + '</a>' + (id === currentId ? ' — ești aici' : '') + '</li>';
      }).join('') + '</ol><p>Poți spune „Nu știu încă” și poți avea altă preferință. Nu trebuie să câștigi o discuție sau să povestești ceva personal.</p></nav>';
  },
  profiles() {
    const data = Progress.load();
    return '<section class="profile-panel" aria-labelledby="profile-title"><h2 id="profile-title"><span id="profile-avatar" aria-hidden="true">' +
      Preferences.avatars[Preferences.get(Progress.profile()).avatar] + '</span> Atelierul meu</h2>' +
      '<label for="profile-select">Profil local</label><select id="profile-select">' +
      Object.keys(data.profiles).map(id => '<option value="' + id + '"' + (id === data.active ? ' selected' : '') + '>' + this.escape(data.profiles[id].name) + '</option>').join('') +
      '</select><form id="profile-form"><label for="profile-name">Profil nou: alege un pseudonim, nu numele real</label>' +
      '<div class="game-controls"><input id="profile-name" maxlength="40" required placeholder="De exemplu: Vulpița curioasă"><button class="btn" type="submit">Adaugă profil</button></div></form>' +
      '<div class="game-controls"><button class="btn" id="export-progress">Exportă progresul</button>' +
      '<label class="btn import-label" for="import-progress">Importă o copie</label><input id="import-progress" type="file" accept=".json,application/json"></div>' +
      '<p>Doar pe acest dispozitiv, fără cont. Importul înlocuiește toate profilurile locale după confirmare. Exportă întâi o copie. Textele scrise în jocuri nu sunt salvate.</p>' +
      (Progress.profile().legacyStars ? '<p>Stele păstrate din versiunea veche: ' + Progress.profile().legacyStars + '. Activitățile vechi sunt marcate „Parcurs”, nu evaluate ca stăpânite.</p>' : '') + '</section>';
  },
  settings() {
    const profile = Progress.profile(), preferences = Preferences.get(profile);
    const field = (id, label, options, value) => '<label for="setting-' + id + '">' + label + '<select id="setting-' + id + '">' +
      options.map(option => '<option value="' + this.escape(String(option[0])) + '"' + (String(option[0]) === String(value) ? ' selected' : '') + '>' + this.escape(option[1]) + '</option>').join('') + '</select></label>';
    return '<section class="subject-hero"><h1>Setări</h1><p>Alege cum îți este mai ușor să citești și să înveți. Setările sunt separate pentru fiecare profil și se aplică în tot atelierul.</p></section>' +
      this.profiles() + '<section class="settings-panel" aria-labelledby="preferences-title"><h2 id="preferences-title">Cum arată și se aude atelierul</h2>' +
      '<p>Modificările se salvează automat pe acest dispozitiv. Exportul progresului include și setările. Schimbarea aspectului nu schimbă rezultatele.</p>' +
      '<form id="preferences-form"><div class="settings-fields">' +
      field('font', 'Fontul textului', Object.keys(Preferences.fonts).map(key => [key, Preferences.fonts[key]]), preferences.font) +
      field('size', 'Mărimea textului', Preferences.sizes.map(size => [size, size + '%']), preferences.size) +
      field('theme', 'Tema', [['auto', 'După dispozitiv'], ['light', 'Luminoasă'], ['dark', 'Întunecată']], preferences.theme) +
      field('sound', 'Sunetele jocurilor', [['on', 'Pornite'], ['off', 'Oprite']], preferences.sound ? 'on' : 'off') +
      field('motion', 'Animații reduse', [['off', 'Urmează preferința dispozitivului'], ['on', 'Reducere activată']], preferences.motion ? 'on' : 'off') +
      field('level', 'Nivelul de joc preferat', LEVELS.map((value, index) => [index, value.title]), preferences.level) +
      field('avatar', 'Avatarul profilului', Object.keys(Preferences.avatars).map(key => [key, Preferences.avatars[key] + ' ' + Preferences.avatarNames[key]]), preferences.avatar) +
      '</div><p>Toate nivelurile rămân deschise. Preferința dispozitivului pentru mișcare redusă este respectată chiar dacă nu activezi opțiunea de aici.</p>' +
      '<div class="settings-preview" aria-labelledby="preview-title"><h3 id="preview-title">Așa vei citi în lecții</h3><p>Învăț în ritmul meu. Încerc, observ și întreb. Știu că pot cere ajutor.</p><p>Ăă · Ââ · Îî · Șș · Țț · 8 + 5 = 13</p></div>' +
      '<p>Fontul caligrafic este Playwrite RO, inspirat de scrisul predat în România, nu un model oficial unic. Cifrele din desene și unele controale păstrează un font simplu pentru lizibilitate.</p>' +
      '<button class="btn" id="reset-preferences" type="button">Restabilește setările inițiale</button></form></section>' +
      '<section class="settings-panel" aria-labelledby="rename-title"><h2 id="rename-title">Pseudonimul meu</h2><form id="rename-profile"><label for="settings-name">Alege un pseudonim, fără numele real sau alte date personale</label>' +
      '<div class="game-controls"><input id="settings-name" required maxlength="40" value="' + this.escape(profile.name) + '"><button class="btn" type="submit">Salvează pseudonimul</button></div></form></section>';
  },
  home() {
    const recommendations = Progress.recommendations();
    return '<div class="home-kid"><section class="hero"><div class="mascot-big" aria-hidden="true">🦉</div><h1>Ce vrei să înveți azi?</h1>' +
      '<div class="hero-motto">' + Engines.quantity(Progress.totalPracticed(), 'activitate exersată', 'activități exersate') + ' · ' +
      Engines.quantity(Progress.totalCompleted(), 'activitate stăpânită', 'activități stăpânite') + ' · ' + Engines.quantity(Progress.totalStars(), 'stea', 'stele') + '</div></section>' +
      '<div class="subjects-grid">' + SUBJECTS.map(s => {
        const acts = ACTIVITIES_BY_SUBJECT[s.id], count = acts.filter(a => ['practiced', 'mastered'].includes(Progress.status(a.id))).length;
        return '<a class="subject-card" href="subject.html?subject=' + s.id + '" style="--sc:' + s.color + '">' +
          '<div class="sc-icon" aria-hidden="true">' + s.icon + '</div><h2>' + s.title + '</h2><p>' + s.desc + '</p>' +
          '<div class="sc-meta"><span class="chip">' + Engines.quantity(acts.length, 'activitate', 'activități') + '</span><span class="chip">' + count + (count === 1 ? ' exersată' : ' exersate') + '</span></div>' +
          '<progress aria-label="Activități exersate la ' + s.title + '" max="' + acts.length + '" value="' + count + '"></progress></a>';
      }).join('') + '</div>' +
      (recommendations.length ? '<section class="callout"><h2>Mai încearcă o dată</h2><p>La aceste lecții ai avut nevoie de ajutor. Le poți relua, de la un nivel mai ușor.</p>' +
        recommendations.map(a => '<a class="btn" href="activity.html?activity=' + a.id + '">' + this.escape(a.title) + '</a>').join(' ') + '</section>' : '') +
      '<a class="dece-banner" href="dece.html"><span aria-hidden="true">🌱</span><span><strong>Cum învățăm?</strong> Curiozitate, strategii, practică și pauze.</span></a>' +
      '<a class="dece-banner" href="activity.html?activity=' + THINKING_PATH.activities[0] + '"><span aria-hidden="true">🔎</span><span><strong>' +
        this.escape(THINKING_PATH.title) + '</strong> Pentru copii mai mari sau împreună cu un adult: dovezi, păreri și „Nu sunt de acord”.</span></a></div>' +
      '<section class="callout"><h2>Pentru adulții care sprijină învățarea</h2><p>Steaua arată că aproape toate răspunsurile au fost corecte din prima (cel puțin 3 din 4), fără indicii, la un nivel evaluat obiectiv. Scrierea liberă și memoria sunt exerciții, nu certificări. Progresul nu este un diagnostic și nu înlocuiește feedbackul unui profesor.</p></section>';
  },
  subject(id) {
    const subject = SUBJECTS.find(s => s.id === id);
    if (!subject) return this.invalid('Disciplina nu a fost găsită.');
    return '<section class="subject-hero" style="--sc:' + subject.color + '"><div class="sh-icon" aria-hidden="true">' + subject.icon + '</div><h1>' + subject.title + '</h1><p>' + subject.desc + '</p><p>Alege ce lecție vrei.</p></section>' +
      '<div class="activities-list">' + ACTIVITIES_BY_SUBJECT[id].map(a => '<a class="activity-card" href="activity.html?activity=' + a.id + '" style="--sc:' + subject.color + '">' +
        '<div class="ac-num">' + a.num + '</div><div class="ac-icon" aria-hidden="true">' + a.icon + '</div><div class="ac-body"><h2>' + a.title + '</h2><p class="kid-line">' + this.escape(a.kid || a.objectives[0]) + '</p>' +
        '<span class="chip">' + Progress.label(a.id) + '</span></div></a>').join('') + '</div>' +
      (THINKING_PATH.activities.some(activityId => ACTIVITIES_BY_SUBJECT[id].some(activity => activity.id === activityId)) ? this.thinkingPath() : '');
  },
  activity(id) {
    const activity = ACTIVITIES.find(a => a.id === id);
    if (!activity) return this.invalid('Activitatea nu a fost găsită.');
    const subject = SUBJECTS.find(s => s.id === activity.subject), acts = ACTIVITIES_BY_SUBJECT[subject.id], index = acts.indexOf(activity);
    const preferredLevel = Preferences.get(Progress.profile()).level;
    const tabs = [['joc', '🎮 Joacă'], ['explicatie', '📖 Descoperă'], ['parinte', '👪 Pentru adulți']];
    const part = (pid, content) => '<section class="adult-part" id="panel-' + pid + '">' + content + '</section>';
    return '<section class="lesson-hero" style="--sc:' + subject.color + '"><div class="lh-icon" aria-hidden="true">' + activity.icon + '</div>' +
      '<a href="subject.html?subject=' + subject.id + '">' + subject.title + '</a><h1>' + activity.title + '</h1><p>' + activity.duration + ' · <span id="activity-status">' + Progress.label(id) + '</span></p></section>' +
      '<div class="tabs" role="tablist" aria-label="Secțiunile lecției">' + tabs.map((t, i) => '<button class="tab' + (i === 0 ? ' active' : '') +
        '" role="tab" id="tab-' + t[0] + '" aria-controls="panel-' + t[0] + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? '0' : '-1') + '" data-tab="' + t[0] + '">' + t[1] + '</button>').join('') + '</div>' +
      '<div class="panels">' +
      this.panel('joc', '<div class="level-picker" role="group" aria-label="Dificultatea jocului">' + LEVELS.map((l, i) => '<button class="level-button' + (i === preferredLevel ? ' selected' : '') +
          '" data-level="' + i + '" aria-pressed="' + (i === preferredLevel) + '"><strong>' + ['🌱 ', '🌿 ', '🌳 '][i] + l.title + '</strong></button>').join('') + '</div>' +
        '<h2 class="game-title" id="selected-game-title" hidden>Jocul lecției</h2><p class="game-rules" id="selected-game-description" role="status" hidden>Încearcă. Dacă greșești, mai încearcă o dată.</p><div class="game" id="game-area"></div>' +
        (MissionGames.options(activity.id).length ? '<details class="more-games"><summary>🎲 Alte jocuri (se citește mai mult)</summary><p>Trei jocuri de gândit, bune de făcut împreună cu un adult. Sunt exercițiu, fără stele.</p>' +
        this.gameCards(activity) + this.gameMenu(activity.demo) + '</details>' : ''), true) +
      this.panel('explicatie', Discovery.render(activity) + '<div class="lesson-actions"><button class="btn" id="btn-complete">Am citit explicația</button></div>') +
      this.panel('parinte', part('obiective', '<h2>Ce exersează copilul</h2><p>Lucrăm pe rând la aceste obiective. Nu trebuie să le poți face pe toate de la început.</p>' + this.list(activity.objectives) +
        '<h3>Cum îți dai seama că ai înțeles?</h3><p>' + this.escape(activity.detail.check) + '</p><p>Începe cu exemplul rezolvat, încearcă o situație nouă și explică ce ai verificat. Poți cere obiecte, desen sau un indiciu.</p>') +
      part('intrebari', '<h2>Reflectează: explică, compară, verifică</h2><p>Alege o întrebare și gândește-te la exemplul lecției. Nu este un test cu răspuns obligatoriu și nu primești notă.</p><div class="reflection-prompts">' +
        activity.reflection.map((item, i) => '<article class="discovery-card"><h3>' + (i + 1) + '. ' + this.escape(item.question) + '</h3><p>' + this.escape(item.support) + '</p></article>').join('') +
        '</div><p>Poți explica prin vorbe, desen, gesturi sau obiecte. Nu trebuie să vorbești despre experiențe personale dacă nu dorești.</p>') +
      part('sprijin', '<h2>Sprijin fără grabă</h2><h3>Ce observăm</h3>' + this.list(activity.parent.watch) + '<h3>Cum ajutăm</h3>' + this.list(activity.parent.help) + '<h3>Când revenim la concret</h3>' + this.list(activity.parent.support)) +
      part('trecere', '<h2>Parcurs, exersat, stăpânit</h2><p>Parcurs = lecția a fost marcată citită. Exersat = o rundă încheiată. Stea = cel puțin 3 din 4 răspunsuri corecte din prima, fără indiciu. Stăpânit = stea la toate cele trei niveluri.</p>' +
        '<p>Scrierea liberă și memoria rămân „Exersat”: nu pretindem că un algoritm simplu certifică aceste competențe.</p>' + this.list(activity.pass) +
        '<div id="level-results">' + this.results(id) + '</div>')) + '</div>' +
      (THINKING_PATH.activities.includes(id) ? this.thinkingPath(id) : '') +
      '<nav class="lesson-nav" aria-label="Alte lecții">' +
      (index > 0 ? '<a href="activity.html?activity=' + acts[index - 1].id + '">← ' + acts[index - 1].title + '</a>' : '<a href="subject.html?subject=' + subject.id + '">← Înapoi la disciplină</a>') +
      (index < acts.length - 1 ? '<a href="activity.html?activity=' + acts[index + 1].id + '">' + acts[index + 1].title + ' →</a>' : '<a href="subject.html?subject=' + subject.id + '">Înapoi la disciplină →</a>') + '</nav>';
  },
  gameCards(activity) {
    const games = [{ mode: '', title: 'Jocul lecției', icon: activity.icon,
      description: activity.objectives[0] + '. Jocul inițial și progresul său sunt păstrate.' }].concat(MissionGames.options(activity.id));
    const types = { evidence: 'Investigație', repair: 'Reparație', plan: 'Construcție și verificare' };
    return '<div class="lesson-game-cards" role="group" aria-label="Cele patru jocuri ale lecției">' +
      games.map(game => '<button type="button" class="lesson-game-card" data-mission-game="' + game.mode + '" aria-pressed="' + !game.mode + '">' +
        '<span class="game-card-icon" aria-hidden="true">' + game.icon + '</span><span class="eyebrow">' + (game.mode ? types[game.mode] : 'Joc inițial') + '</span>' +
        '<strong>' + this.escape(game.title) + '</strong><span>' + this.escape(game.description) + '</span></button>').join('') + '</div>';
  },
  gameMenu(demo) {
    const options = Engines.gameOptions(demo);
    if (!options.length) return '';
    return '<div class="game-menu"><label for="game-select">Variante suplimentare ale jocului inițial</label><select id="game-select" aria-describedby="game-selection-note"><option value="">Rundă completă: jocuri combinate</option>' +
      options.map(option => '<option value="' + option.id + '">' + this.escape(option.title) + '</option>').join('') +
      '</select><p id="game-selection-note" role="status">Runda completă combină mecanicile lecției și păstrează evaluarea obișnuită. Jocurile alese separat sunt practică fără stele și nu modifică progresul salvat. Schimbarea jocului reîncepe runda.</p></div>';
  },
  panel(id, content, active) {
    return '<section class="panel' + (active ? ' active' : '') + '" id="panel-' + id + '" role="tabpanel" aria-labelledby="tab-' + id + '" data-panel="' + id + '"' + (active ? '' : ' hidden') + '>' + content + '</section>';
  },
  results(id) {
    const results = Progress.entry(id).levels;
    return LEVELS.map((level, i) => {
      const result = results[i];
      return '<article class="level-result"><h3>' + level.title + '</h3><p>' + (!result ? 'Încă neexersat.' : result.evaluation === 'self' ? 'Autoevaluare încheiată; solicită și feedback uman.' :
        result.evaluation === 'practice' ? 'Strategie de memorie exersată; fără notă sau certificare.' :
          (result.mastered ? '⭐ Stea de independență. ' : 'În curs de exersare. ') + 'Ultima rundă: ' + result.latest + '%. Cel mai bun rezultat: ' + result.best + '%.') +
        '</p>' + (result ? '<p>Runde: ' + result.attempts + ' · Indicii în ultima rundă: ' + result.hints + ' · Corectări: ' + result.errors + '</p>' : '') + '</article>';
    }).join('');
  },
  invalid(message) { return '<section class="invalid-screen"><h1>' + this.escape(message) + '</h1><a class="btn" href="index.html">Înapoi acasă</a></section>'; }
};
