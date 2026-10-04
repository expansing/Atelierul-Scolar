/* ============================================================
   ATELIERUL ȘCOLAR — Validator de date
   Verifică structura din assets/js/data.js:
   - subiecte și activități complete
   - tipuri de demo valide și structuri corecte
   - ortografie românească (fără diacritice lipsă)
   ============================================================ */
const fs = require('fs');
const path = require('path');

const nodeMajor = Number(process.versions.node.split('.')[0]);
if (nodeMajor < 12) {
  console.error('Validatorul necesita Node.js 12 sau mai nou. Versiune detectata: ' + process.versions.node);
  process.exit(1);
}

const base = path.join(__dirname, 'assets', 'js');
const src = fs.readFileSync(path.join(base, 'data.js'), 'utf8')
  .replace(/^const SUBJECTS =/m, 'global.SUBJECTS =')
  .replace(/^const ACTIVITIES =/m, 'global.ACTIVITIES =')
  .replace(/^const ACTIVITIES_BY_SUBJECT =/m, 'global.ACTIVITIES_BY_SUBJECT =');
(0, eval)(src);

const SUBJECTS = global.SUBJECTS;
const ACTIVITIES = global.ACTIVITIES;
const ACTIVITIES_BY_SUBJECT = global.ACTIVITIES_BY_SUBJECT;

const SUPPORTED_DEMO_TYPES = new Set(['quiz', 'count', 'match', 'arrange', 'classify', 'memory', 'clock', 'shapes', 'type', 'balance', 'shop', 'gen']);

const FORBIDDEN_WORDS = {
  'Apasa': 'Apasă', 'apasa': 'apasă', 'Daca': 'Dacă', 'daca': 'dacă',
  'Fara': 'Fără', 'fara': 'fără', 'Inainte': 'Înainte', 'inainte': 'înainte',
  'afiseaza': 'afișează', 'Afiseaza': 'Afișează', 'protejeaza': 'protejează',
  'cauta': 'caută', 'Cauta': 'Caută', 'foloseste': 'folosește', 'Foloseste': 'Folosește',
  'intelege': 'înțelege', 'Intelege': 'Înțelege', 'intelegere': 'înțelegere',
  'invata': 'învață', 'Invata': 'Învață', 'invatare': 'învățare', 'Invatare': 'Învățare',
  'masina': 'mașina', 'Masina': 'Mașina', 'genereaza': 'generează', 'Genereaza': 'Generează',
  'scoala': 'școala', 'Scoala': 'Școala', 'impreuna': 'împreună', 'Impreuna': 'Împreună',
  'romana': 'română', 'Romana': 'Română', 'depaseste': 'depășește', 'Depaseste': 'Depășește',
  'incepe': 'începe', 'Incepe': 'începe', 'inceput': 'început', 'Inceput': 'început',
  'intrebare': 'întrebare', 'Intrebare': 'Întrebare', 'Urmeaza': 'Urmează', 'urmeaza': 'urmează',
  'Dupa': 'După', 'dupa': 'după', 'aparea': 'apărea', 'Aparea': 'Apărea',
  'gasesti': 'găsești', 'Gasesti': 'Găsești', 'Imagineaza': 'Imaginează', 'imagineaza': 'imaginează',
  'hotaraste': 'hotărăște', 'Hotaraste': 'Hotărăște', 'controleaza': 'controlează', 'Controleaza': 'Controlează',
  'urias': 'uriaș', 'Urias': 'Uriaș', 'stim': 'știm', 'Stim': 'Știm',
  'reala': 'reală', 'Reala': 'Reală', 'informatia': 'informația', 'Informatia': 'Informația',
  'informatie': 'informație', 'Informatie': 'Informație', 'solutia': 'soluția', 'Solutia': 'Soluția',
  'solutie': 'soluție', 'Solutie': 'Soluție', 'pozitiile': 'pozițiile', 'Pozitiile': 'Pozițiile',
  'pozitia': 'poziția', 'Pozitia': 'Poziția', 'biti': 'biți', 'Biti': 'Biți',
  'pastrat': 'păstrat', 'Pastrat': 'Păstrat', 'pastreaza': 'păstrează', 'Pastreaza': 'Păstrează',
  'construiesti': 'construiești', 'Construiesti': 'Construiești', 'siguranta': 'siguranță',
  'Siguranta': 'Siguranță', 'retea': 'rețea', 'Retea': 'Rețea', 'pastram': 'păstrăm',
  'Pastram': 'Păstrăm', 'temporara': 'temporară', 'Temporara': 'Temporară',
  'strain': 'străin', 'Strain': 'Străin', 'intamplat': 'întâmplat', 'Intamplat': 'Întâmplat',
  'indemana': 'îndemână', 'Indemana': 'Îndemână'
};

let bad = 0;
function problem(message) {
  console.log('❌ ' + message);
  bad++;
}

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}
function isNonEmptyArray(v) {
  return Array.isArray(v) && v.length > 0;
}

function scanForbiddenWords(text, context) {
  Object.keys(FORBIDDEN_WORDS).forEach(word => {
    const re = new RegExp('(^|[^A-Za-zĂÂÎȘȚăâîșț])' + word + '([^A-Za-zĂÂÎȘȚăâîșț]|$)');
    if (re.test(text)) {
      problem('Ortografie: folosește „' + FORBIDDEN_WORDS[word] + '” în loc de „' + word + '” la ' + context);
    }
  });
}

function scanTexts(obj, context) {
  if (typeof obj === 'string') {
    scanForbiddenWords(obj, context);
  } else if (Array.isArray(obj)) {
    obj.forEach((v, i) => scanTexts(v, context + '[' + i + ']'));
  } else if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach(k => scanTexts(obj[k], context + '.' + k));
  }
}

console.log('Subiecte:', SUBJECTS.length, '| Activitati:', ACTIVITIES.length);

/* ---------- subiecte ---------- */
const subjectIds = new Set();
SUBJECTS.forEach(s => {
  if (!isNonEmptyString(s.id)) problem('Subiect fără id');
  if (!isNonEmptyString(s.title)) problem('Subiect ' + s.id + ' fără titlu');
  if (!isNonEmptyString(s.icon)) problem('Subiect ' + s.id + ' fără icon');
  if (!isNonEmptyString(s.desc)) problem('Subiect ' + s.id + ' fără descriere');
  subjectIds.add(s.id);
});

/* ---------- activități ---------- */
const actIds = new Set();
ACTIVITIES.forEach(a => {
  const ctx = 'activitatea ' + a.id;
  if (!isNonEmptyString(a.id)) { problem('Activitate fără id'); return; }
  if (actIds.has(a.id)) problem('ID duplicat: ' + a.id);
  actIds.add(a.id);
  if (!isNonEmptyString(a.title)) problem(ctx + ' fără titlu');
  if (!isNonEmptyString(a.icon)) problem(ctx + ' fără icon');
  if (!isNonEmptyString(a.duration)) problem(ctx + ' fără durată');
  if (!subjectIds.has(a.subject)) problem(ctx + ' cu subiect necunoscut: ' + a.subject);
  if (!isNonEmptyArray(a.objectives)) problem(ctx + ' fără obiective');
  if (!isNonEmptyArray(a.explanation)) problem(ctx + ' fără explicație');
  if (!isNonEmptyArray(a.questions)) problem(ctx + ' fără întrebări');
  if (!isNonEmptyArray(a.pass)) problem(ctx + ' fără criterii de trecere');
  if (!a.parent || !isNonEmptyArray(a.parent.watch) || !isNonEmptyArray(a.parent.help) || !isNonEmptyArray(a.parent.redflags)) {
    problem(ctx + ' fără secțiune completă pentru părinți');
  }

  /* demo */
  const d = a.demo;
  if (!d || !isNonEmptyString(d.type)) { problem(ctx + ' fără demo'); return; }
  if (!SUPPORTED_DEMO_TYPES.has(d.type)) problem(ctx + ' cu tip demo nesuportat: ' + d.type);
  if (!isNonEmptyString(d.title)) problem(ctx + ' demo fără titlu');

  switch (d.type) {
    case 'quiz':
      if (!isNonEmptyArray(d.questions)) problem(ctx + ' quiz fără întrebări');
      else d.questions.forEach((q, i) => {
        if (!isNonEmptyString(q.q)) problem(ctx + ' quiz[' + i + '] fără întrebare');
        if (!isNonEmptyArray(q.options) || q.options.length < 2) problem(ctx + ' quiz[' + i + '] cu opțiuni insuficiente');
        if (typeof q.answer !== 'number' || q.answer < 0 || q.answer >= q.options.length) problem(ctx + ' quiz[' + i + '] cu index de răspuns invalid');
      });
      break;
    case 'count':
      if (!isNonEmptyArray(d.items)) problem(ctx + ' count fără itemi');
      else d.items.forEach((it, i) => {
        if (!isNonEmptyString(it.emoji)) problem(ctx + ' count[' + i + '] fără emoji');
        if (typeof it.count !== 'number' || it.count < 1) problem(ctx + ' count[' + i + '] cu număr invalid');
        if (!isNonEmptyArray(it.options) || !it.options.includes(it.count)) problem(ctx + ' count[' + i + '] nu conține răspunsul corect în opțiuni');
      });
      break;
    case 'match':
      if (!isNonEmptyArray(d.pairs)) problem(ctx + ' match fără perechi');
      else d.pairs.forEach((p, i) => {
        if (!isNonEmptyString(p.a) || !isNonEmptyString(p.b)) problem(ctx + ' match[' + i + '] incompletă');
      });
      break;
    case 'arrange':
      if (!isNonEmptyArray(d.questions)) problem(ctx + ' arrange fără întrebări');
      else d.questions.forEach((q, i) => {
        if (!isNonEmptyArray(q.words)) problem(ctx + ' arrange[' + i + '] fără cuvinte');
        if (!isNonEmptyString(q.answer)) problem(ctx + ' arrange[' + i + '] fără răspuns');
        if (q.pool && !isNonEmptyArray(q.pool)) problem(ctx + ' arrange[' + i + '] cu pool invalid');
      });
      break;
    case 'classify':
      if (!isNonEmptyArray(d.zones) || d.zones.length < 2) problem(ctx + ' classify cu zone insuficiente');
      if (!isNonEmptyArray(d.items)) problem(ctx + ' classify fără itemi');
      else d.items.forEach((it, i) => {
        if (!isNonEmptyString(it.label)) problem(ctx + ' classify[' + i + '] fără etichetă');
        if (typeof it.zone !== 'number' || it.zone < 0 || it.zone >= d.zones.length) problem(ctx + ' classify[' + i + '] cu zonă invalidă');
      });
      break;
    case 'memory':
      if (!isNonEmptyArray(d.pairs) || d.pairs.length < 3) problem(ctx + ' memory cu perechi insuficiente');
      else {
        const uniq = new Set(d.pairs);
        if (uniq.size !== d.pairs.length) problem(ctx + ' memory cu emoji duplicate');
      }
      break;
    case 'clock':
      if (!isNonEmptyArray(d.questions)) problem(ctx + ' clock fără întrebări');
      else d.questions.forEach((q, i) => {
        if (typeof q.hour !== 'number' || q.hour < 1 || q.hour > 12) problem(ctx + ' clock[' + i + '] cu oră invalidă');
        if (typeof q.minute !== 'number' || q.minute < 0 || q.minute > 59) problem(ctx + ' clock[' + i + '] cu minute invalide');
        if (!isNonEmptyArray(q.options)) problem(ctx + ' clock[' + i + '] fără opțiuni');
      });
      break;
    case 'shapes':
      if (!isNonEmptyArray(d.questions)) problem(ctx + ' shapes fără întrebări');
      else d.questions.forEach((q, i) => {
        if (!isNonEmptyString(q.shape)) problem(ctx + ' shapes[' + i + '] fără formă');
        if (!isNonEmptyString(q.name)) problem(ctx + ' shapes[' + i + '] fără nume');
        if (!isNonEmptyArray(q.options) || !q.options.includes(q.name)) problem(ctx + ' shapes[' + i + '] nu conține numele corect în opțiuni');
      });
      break;
    case 'type':
      if (!isNonEmptyString(d.prompt)) problem(ctx + ' type fără prompt');
      if (!isNonEmptyArray(d.examples)) problem(ctx + ' type fără exemple');
      break;
    case 'balance':
      // joc generativ: doar titlu, intro și opțional rounds/emoji
      if (typeof d.rounds !== 'undefined' && (typeof d.rounds !== 'number' || d.rounds < 1)) problem(ctx + ' balance cu rounds invalid');
      break;
    case 'shop':
      if (typeof d.rounds !== 'undefined' && (typeof d.rounds !== 'number' || d.rounds < 1)) problem(ctx + ' shop cu rounds invalid');
      if (d.items && !isNonEmptyArray(d.items)) problem(ctx + ' shop cu itemi invalid');
      else if (d.items) d.items.forEach((it, i) => {
        if (!isNonEmptyString(it.name) || !isNonEmptyString(it.emoji)) problem(ctx + ' shop.items[' + i + '] incomplet');
      });
      break;
    case 'gen':
      if (typeof d.rounds !== 'undefined' && (typeof d.rounds !== 'number' || d.rounds < 1)) problem(ctx + ' gen cu rounds invalid');
      break;
  }

  /* montessori (opțional, dar validat dacă există) */
  if (a.montessori) {
    if (!isNonEmptyString(a.montessori.intro)) problem(ctx + ' montessori fără intro');
    if (!isNonEmptyArray(a.montessori.materials)) problem(ctx + ' montessori fără materiale');
    else a.montessori.materials.forEach((m, i) => {
      if (!isNonEmptyString(m.icon)) problem(ctx + ' montessori.materials[' + i + '] fără icon');
      if (!isNonEmptyString(m.name)) problem(ctx + ' montessori.materials[' + i + '] fără nume');
      if (!isNonEmptyString(m.how)) problem(ctx + ' montessori.materials[' + i + '] fără descriere');
    });
    if (a.montessori.tips && !isNonEmptyArray(a.montessori.tips)) problem(ctx + ' montessori.tips gol');
  }

  /* pool / extra pentru jocuri generative (opțional, dar validat dacă există) */
  if (d.pool && !isNonEmptyArray(d.pool)) problem(ctx + ' demo.pool gol');
  if (d.extra && !isNonEmptyArray(d.extra)) problem(ctx + ' demo.extra gol');

  /* ortografie */
  scanTexts(a, ctx);
});

/* ---------- index pe subiect ---------- */
SUBJECTS.forEach(s => {
  const acts = ACTIVITIES_BY_SUBJECT[s.id];
  if (!isNonEmptyArray(acts)) problem('Subiectul ' + s.id + ' nu are activități în index');
});

if (bad === 0) {
  console.log('✅ Toate datele sunt valide: ' + SUBJECTS.length + ' subiecte, ' + ACTIVITIES.length + ' activități.');
} else {
  console.log('\n⚠️  ' + bad + ' problemă(e) găsite.');
  process.exit(1);
}
