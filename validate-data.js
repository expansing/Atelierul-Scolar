const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadContent(extra) {
  const context = Object.assign({ console }, extra || {});
  vm.createContext(context);
  ['data', 'engines', 'math-games', 'discovery', 'preferences', 'progress', 'render', 'dece'].forEach(name => {
    vm.runInContext(fs.readFileSync(path.join(__dirname, 'assets/js', name + '.js'), 'utf8'), context, { filename: name + '.js' });
  });
  return vm.runInContext('({ SUBJECTS, ACTIVITIES, ACTIVITIES_BY_SUBJECT, LEVELS, Engines, MathWorkshop, Discovery, Preferences, Progress, Render, DECE_CAMPS })', context);
}

function validate(data) {
  const { SUBJECTS, ACTIVITIES, ACTIVITIES_BY_SUBJECT, LEVELS, Engines, DECE_CAMPS } = data;
  const errors = [];
  const requireValue = (condition, message) => { if (!condition) errors.push(message); };
  const text = value => typeof value === 'string' && value.trim().length > 0;
  const texts = value => Array.isArray(value) && value.length > 0 && value.every(text);
  const unique = values => new Set(values).size === values.length;
  const integer = (value, min, max) => Number.isInteger(value) && value >= min && value <= max;
  requireValue(SUBJECTS.length === 6, 'Sunt necesare șase discipline.');
  requireValue(ACTIVITIES.length >= 60 && ACTIVITIES.length <= 72, 'Inventarul trebuie să aibă între 60 și 72 de activități.');
  requireValue(LEVELS.length === 3, 'Sunt necesare trei niveluri.');
  requireValue(unique(SUBJECTS.map(s => s.id)), 'ID-uri duplicate de discipline.');
  requireValue(unique(ACTIVITIES.map(a => a.id)), 'ID-uri duplicate de activități.');
  const validSubjects = new Set(SUBJECTS.map(s => s.id));
  SUBJECTS.forEach(subject => {
    ['id', 'title', 'icon', 'color', 'desc', 'tagline', 'age'].forEach(key => requireValue(text(subject[key]), subject.id + ': lipsește ' + key));
    const acts = ACTIVITIES_BY_SUBJECT[subject.id];
    requireValue(Array.isArray(acts) && acts.length >= 9, subject.id + ': prea puține activități.');
    if (Array.isArray(acts)) requireValue(acts.every((a, i) => a.subject === subject.id && a.num === i + 1), subject.id + ': index sau numerotare incorectă.');
  });
  const oldCounts = { mat: 9, lim: 7, log: 7, inf: 6, sci: 7, civ: 6 };
  Object.keys(oldCounts).forEach(subject => {
    for (let i = 1; i <= oldCounts[subject]; i++) requireValue(ACTIVITIES.some(a => a.id === subject + '-' + i), 'Legătură veche pierdută: ' + subject + '-' + i);
  });
  const checkQuestion = (question, context) => {
    requireValue(text(question.prompt) && text(question.explain) && text(question.hint), context + ': cerință, indiciu sau explicație lipsă.');
    requireValue(texts(question.options) && question.options.length >= 2 && unique(question.options), context + ': opțiuni insuficiente sau duplicate.');
    requireValue(integer(question.answer, 0, (question.options || []).length - 1), context + ': răspuns invalid.');
  };
  ACTIVITIES.forEach(activity => {
    const id = activity.id;
    requireValue(validSubjects.has(activity.subject), id + ': disciplină necunoscută.');
    ['title', 'icon', 'duration'].forEach(key => requireValue(text(activity[key]), id + ': lipsește ' + key));
    ['objectives', 'explanation', 'guided', 'questions', 'pass'].forEach(key => requireValue(texts(activity[key]) && activity[key].length >= 2, id + ': secțiune incompletă: ' + key));
    requireValue(activity.explanation.length >= 3 && activity.guided.length >= 3, id + ': lecția nu are toți pașii.');
    requireValue(activity.practical && text(activity.practical.materials) && texts(activity.practical.steps) && text(activity.practical.check), id + ': explorare practică incompletă.');
    requireValue(activity.parent && ['watch', 'help', 'support'].every(key => texts(activity.parent[key])), id + ': sprijinul adultului este incomplet.');
    const demo = activity.demo;
    requireValue(demo && Engines.types.includes(demo.type), id + ': motor necunoscut.');
    if (!demo || !Array.isArray(demo.levels)) { errors.push(id + ': niveluri lipsă.'); return; }
    requireValue(demo.levels.length === 3, id + ': nu are trei niveluri.');
    requireValue(new Set(demo.levels.map(level => JSON.stringify(level))).size === 3 || !['quiz', 'arrange', 'match', 'classify'].includes(demo.type), id + ': niveluri identice.');
    demo.levels.forEach((config, level) => {
      const context = id + ' / ' + level;
      if (config.review) {
        requireValue(Array.isArray(config.review) && config.review.length >= 2, context + ': verificare conceptuală incompletă.');
        if (Array.isArray(config.review)) config.review.forEach(question => checkQuestion(question, context));
      }
      if (demo.type === 'quiz') {
        requireValue(Array.isArray(config.questions) && config.questions.length >= 3, context + ': minimum trei întrebări distincte.');
        (config.questions || []).forEach(question => checkQuestion(question, context));
        requireValue(unique((config.questions || []).map(q => q.prompt)), context + ': întrebări duplicate.');
      } else if (demo.type === 'arrange') {
        requireValue(Array.isArray(config.questions) && config.questions.length >= 2, context + ': minimum două ordonări.');
        (config.questions || []).forEach(q => requireValue(text(q.prompt) && texts(q.tokens) && q.tokens.length >= 2 && text(q.explain) && text(q.hint), context + ': ordonare incompletă.'));
      } else if (demo.type === 'match') {
        requireValue(Array.isArray(config.pairs) && config.pairs.length >= 3, context + ': prea puține perechi.');
        const pairs = config.pairs || [];
        requireValue(pairs.every(p => text(p.a) && text(p.b)) && unique(pairs.map(p => p.a)) && unique(pairs.map(p => p.b)), context + ': perechi incomplete sau ambigue.');
      } else if (demo.type === 'classify') {
        requireValue(texts(config.zones) && unique(config.zones), context + ': grupe invalide.');
        requireValue(Array.isArray(config.items) && config.items.length >= 4 &&
          config.items.every(item => text(item.label) && integer(item.zone, 0, config.zones.length - 1)), context + ': item de clasificare invalid.');
      } else requireValue(integer(config.rounds, 1, 12), context + ': număr de runde invalid.');
      try {
        const rounds = Engines.rounds(demo, level);
        requireValue(rounds.length > 0 && rounds.length <= 12, context + ': rundă goală sau prea lungă.');
        rounds.forEach(round => {
          requireValue(text(round.prompt) && text(round.explain) && text(round.hint), context + ': sarcină generată incompletă.');
          if (round.options) checkQuestion(round, context);
        });
      } catch (error) { errors.push(context + ': generator eșuat: ' + error.message); }
    });
  });
  requireValue(DECE_CAMPS.length === 11, 'Traseul de reflecție trebuie să aibă 11 opriri.');
  DECE_CAMPS.forEach((camp, index) => {
    requireValue(['title', 'body', 'question', 'explain'].every(key => text(camp[key])) && texts(camp.options) && integer(camp.answer, 0, camp.options.length - 1), 'Oprire incompletă: ' + index);
  });
  const textScan = value => {
    if (typeof value === 'string') {
      requireValue(!/[\u015e\u015f\u0162\u0163]/.test(value), 'Diacritice cu sedilă în loc de virgulă: ' + value);
      requireValue(!/\b(?:Învațăm|învațăm|casuță|superputer|prédicție)\b/.test(value), 'Formulare de revizuit: ' + value);
    } else if (Array.isArray(value)) value.forEach(textScan);
    else if (value && typeof value === 'object') Object.keys(value).forEach(key => textScan(value[key]));
  };
  textScan({ SUBJECTS, ACTIVITIES, DECE_CAMPS });
  return errors;
}

if (require.main === module) {
  const content = loadContent();
  const errors = validate(content);
  errors.forEach(error => console.error('✗ ' + error));
  if (errors.length) process.exitCode = 1;
  else console.log('✓ ' + content.SUBJECTS.length + ' discipline, ' + content.ACTIVITIES.length + ' activități, ' + content.ACTIVITIES.length * content.LEVELS.length + ' niveluri și 11 opriri valide structural. Revizia lingvistică și factuală rămâne și o responsabilitate editorială.');
}
module.exports = { loadContent, validate };
