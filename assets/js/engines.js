/* Motoare fără cronometru: încercare, indiciu, corectare, explicație, continuare. */
const Engines = {
  types: ['quiz', 'count', 'match', 'arrange', 'classify', 'memory', 'clock', 'shapes', 'type', 'balance', 'shop', 'gen', 'placevalue', 'numberline', 'wordbuilder', 'reading', 'experiment', 'story', 'matrix', 'robot', 'measurement', 'fractions'],
  modes: {
    count: ['count'], memory: ['pairs'], clock: ['time'], shapes: ['properties', 'objects', 'riddle'], type: ['story'],
    balance: ['equal'], shop: ['budget'], gen: ['two-step', 'nature'], placevalue: ['build', 'exchange'], numberline: ['add', 'subtract'],
    wordbuilder: ['syllables', 'diacritics'], reading: ['park', 'clues', 'observations'], experiment: ['plants', 'water', 'fair'],
    story: ['conditions', 'digital', 'health', 'family', 'friends', 'school', 'help', 'nature', 'emotions', 'conflict', 'boundaries', 'group'],
    matrix: ['sequence', 'classification', 'grid', 'growth'], robot: ['route', 'debug', 'repeat'], measurement: ['ruler'], fractions: ['parts']
  },
  shuffle(items) {
    const result = items.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  },
  randInt(min, max) { return min + Math.floor(Math.random() * (max - min + 1)); },
  pick(items) { return items[this.randInt(0, items.length - 1)]; },
  quantity(number, singular, plural) {
    return number + ' ' + (number === 1 ? singular : ((number !== 0 && (number % 100 === 0 || number % 100 >= 20)) ? 'de ' : '') + plural);
  },
  escape(text) {
    return String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  },
  rangeControl(input) {
    const label = input.getAttribute('aria-label');
    if (!label) throw new Error('Controlul numeric are nevoie de o etichetă.');
    if (!input.id) input.id = 'range-' + (++this.rangeId);
    const group = document.createElement('div'); group.className = 'range-control';
    group.setAttribute('role', 'group'); group.setAttribute('aria-label', label);
    const output = document.createElement('output'); output.htmlFor = input.id; output.className = 'range-value';
    const change = direction => {
      if (input.disabled) return;
      if (direction < 0) input.stepDown(); else input.stepUp();
      input.dispatchEvent(new Event('input', { bubbles: true }));
    };
    const minus = document.createElement('button'), plus = document.createElement('button');
    [[minus, '−', 'Micșorează: ', -1], [plus, '+', 'Mărește: ', 1]].forEach(entry => {
      const node = entry[0]; node.type = 'button'; node.className = 'range-step'; node.textContent = entry[1];
      node.setAttribute('aria-label', entry[2] + label); node.dataset.direction = entry[3];
      node.addEventListener('click', () => change(entry[3]));
    });
    group.appendChild(minus); group.appendChild(output); group.appendChild(plus); group.appendChild(input);
    input.addEventListener('input', () => this.refreshRangeControls(group));
    this.refreshRangeControls(group);
    return group;
  },
  rangeId: 0,
  refreshRangeControls(root) {
    const groups = root.classList.contains('range-control') ? [root] : root.querySelectorAll('.range-control');
    groups.forEach(group => {
      const input = group.querySelector('input'), value = Number(input.value);
      group.querySelector('output').value = input.value;
      group.querySelector('[data-direction="-1"]').disabled = input.disabled || value <= Number(input.min);
      group.querySelector('[data-direction="1"]').disabled = input.disabled || value >= Number(input.max);
    });
  },
  choice(prompt, options, answer, explain, hint, extra) {
    return Object.assign({ kind: 'choice', prompt, options, answer, explain, hint: hint || 'Reprezintă situația și verifică fiecare variantă.' }, extra || {});
  },
  numeric(prompt, answer, explain, hint, extra) {
    const delta = this.randInt(1, 4);
    const candidates = [answer, answer + delta, Math.max(0, answer - delta)];
    if (new Set(candidates).size < 3) candidates[2] = answer + delta + 1;
    const options = this.shuffle(candidates).map(String);
    return this.choice(prompt, options, options.indexOf(String(answer)), explain, hint, extra);
  },
  questionRound(question) {
    const correct = question.options[question.answer], options = this.shuffle(question.options);
    return this.choice(question.prompt, options, options.indexOf(correct), question.explain, question.hint);
  },
  rounds(demo, level) {
    if (!this.types.includes(demo.type)) throw new Error('Tip de joc necunoscut: ' + demo.type);
    if (this.modes[demo.type] && !this.modes[demo.type].includes(demo.mode)) throw new Error('Variantă de joc necunoscută: ' + demo.mode);
    const config = demo.levels[level];
    if (!config) throw new Error('Nivel de joc inexistent.');
    if (demo.type === 'quiz') {
      return this.shuffle(config.questions).map(q => this.questionRound(q));
    }
    if (demo.type === 'arrange') return this.shuffle(config.questions).map(q => Object.assign({ kind: 'arrange' }, q));
    if (demo.type === 'match') {
      return [{ kind: 'match', prompt: 'Asociază fiecare element din stânga cu perechea lui. Poți schimba selecția înainte de verificare.', pairs: this.shuffle(config.pairs), explain: config.pairs.map(p => p.a + ' — ' + p.b).join('; ') + '.', hint: 'Alege un element din stânga, apoi caută relația lui în dreapta.' }];
    }
    if (demo.type === 'classify') {
      return this.shuffle(config.items).map(item => this.choice('Unde se potrivește: ' + item.label + '?', config.zones, item.zone,
        '„' + item.label + '” aparține grupei „' + config.zones[item.zone] + '”, conform regulii afișate.',
        'Citește toate condițiile din numele grupei, inclusiv limitele și cuvântul „și”.'));
    }
    if (demo.type === 'memory') {
      const pairs = ['🍎', '🌻', '🐟', '🚲', '📖', '🦋', '🌳', '⭐', '🐢', '🧩'].slice(0, [3, 5, 8][level]);
      return [{ kind: 'memory', prompt: 'Găsește perechile. Reține și numește pozițiile, fără grabă.', pairs,
        hint: 'Explorează pe rând și amintește-ți rândul și coloana.', explain: 'Perechile sunt identice. Ai exersat reținerea pozițiilor; acest joc nu măsoară inteligența.' }];
    }
    if (demo.type === 'type') return this.writingRounds(level);
    if (demo.type === 'reading') return this.readingRounds(demo.mode, level);
    if (demo.type === 'experiment') return this.experimentRounds(demo.mode, level);
    if (demo.type === 'story') return this.storyRounds(demo.mode, level);
    if (demo.type === 'wordbuilder') return this.wordRounds(demo.mode, level);
    const result = [];
    for (let index = 0; index < config.rounds; index++) result.push(this.generate(demo.type, demo.mode, level, index));
    if (config.review) result[result.length - 1] = this.questionRound(this.pick(config.review));
    return result;
  },

  generate(type, mode, level, index) {
    if (MathWorkshop.handles(type, mode)) return MathWorkshop.generate(type, mode, level, index);
    if (type === 'placevalue') {
      if (index % 3 === 1) {
        const tens = this.randInt(1, [3, 7, 9][level]), units = this.randInt(0, 9), number = tens * 10 + units;
        return MathWorkshop.calculation('Aceleași cifre, valori diferite: descompune numărul ' + number + '.',
          [{ label: 'Valoarea cifrei ' + tens + ' de pe locul zecilor', answer: tens * 10 }, { label: 'Unități rămase', answer: units }],
          number + ' = ' + tens * 10 + ' + ' + units + '. Cifra zecilor arată grupe de câte zece.',
          'Nu confunda cifra scrisă cu valoarea ei. Construiește grupele de zece.', { numberCard: String(number) });
      }
      if (index % 3 === 2) {
        const tens = this.randInt(1, [2, 5, 8][level]), units = this.randInt(10, 19), number = tens * 10 + units;
        return MathWorkshop.calculation('Schimbul care nu modifică totalul: ai ' + this.quantity(tens, 'grupă de câte zece', 'grupe de câte zece') + ' și ' + units + ' unități separate.',
          [{ label: 'Zeci după gruparea tuturor unităților în plus', answer: tens + 1 }, { label: 'Unități rămase separate', answer: units - 10 }],
          units + ' unități = un grup de zece și ' + (units - 10) + ' unități separate. Totalul rămâne ' + number + '.',
          'Ia zece dintre unitățile separate și formează o nouă grupă.', { bars: [tens * 10, units] });
      }
      const initial = level === 2 ? this.randInt(40, 90) : null;
      const added = level === 2 ? this.randInt(5, 10) : 0;
      const number = level === 2 ? initial + added : this.randInt(level === 0 ? 10 : 20, level === 0 ? 30 : 69);
      const tens = Math.floor(number / 10), units = number % 10;
      const exchange = mode === 'exchange' && level > 0 && number < 100;
      const shownTens = exchange ? tens - 1 : tens;
      const shownUnits = exchange ? units + 10 : units;
      return { kind: 'placevalue', prompt: level === 2
        ? 'Pornește de la ' + initial + '. Adaugă ' + this.quantity(added, 'unitate', 'unități') + '. Construiește rezultatul din zeci și unități, făcând schimburile necesare.'
        : exchange
        ? 'Ai ' + this.quantity(shownTens, 'grup de zece', 'grupuri de zece') + ' și ' + this.quantity(shownUnits, 'unitate separată', 'unități separate') + '. Grupează câte zece dintre unitățile separate.'
        : 'Construiește numărul ' + number + ' din zeci și unități.',
      number, tens, units, shownTens, shownUnits, explain: (level === 2 ? initial + ' + ' + added + ' = ' + number + '. ' : '') + number + ' = ' + tens + ' × 10 + ' + units + '. Zece unități formează un grup de zece.',
      hint: 'Separă grupele de câte 10 de obiectele rămase. La 100 poți folosi 10 zeci.' };
    }
    if (type === 'count') {
      const count = this.randInt(1, [10, 20, 40][level]);
      return this.numeric('Câte obiecte sunt? Grupează-le mental câte 5 sau 10.', count,
        (count === 1 ? 'Este ' : 'Sunt ') + this.quantity(count, 'obiect', 'obiecte') + '. Ultimul număr rostit arată cantitatea.', 'Numără fiecare obiect o singură dată.', { scene: Array(count).fill('●').join(' ') });
    }
    if (type === 'clock') {
      const hour = this.randInt(1, 11), minutes = this.pick(level === 0 ? [0, 30] : level === 1 ? [15, 30, 45] : [5, 10, 20, 35, 40, 50]);
      const elapsed = level === 2 ? this.pick([10, 15, 20, 25]) : 0;
      const end = (hour * 60 + minutes + elapsed) % 720;
      const answer = this.time(Math.floor(end / 60) || 12, end % 60);
      const options = this.shuffle([answer, this.time((Math.floor(end / 60) + 1) % 12 || 12, end % 60), this.time(Math.floor(end / 60) || 12, (end % 60 + 30) % 60)]);
      const round = this.choice(elapsed ? 'Ce oră va fi peste ' + elapsed + ' minute față de ceasul afișat?' : 'Ce oră arată ceasul?',
        options, options.indexOf(answer), elapsed ? 'Pornim de la ' + this.time(hour, minutes) + ' și adăugăm ' + elapsed + ' minute: ' + answer + '.' :
          'Ceasul arată ' + answer + '. Acul scurt se află între ore când minutele nu sunt zero.',
        elapsed ? 'Citește ora de început. Adaugă minutele și treci la ora următoare dacă depășești 60.' : 'Citește întâi acul scurt, apoi numără minutele câte 5.',
        { clock: { hour, minutes } });
      if (level === 1) {
        round.kind = 'clock-set'; round.prompt = 'Potrivește acele ceasului la ' + this.time(hour, minutes) + '.';
        round.target = { hour, minutes }; delete round.clock;
      }
      return round;
    }
    if (type === 'gen') {
      if (mode === 'nature') {
        const insects = this.randInt(1, level + 2), birds = this.randInt(1, level + 2);
        if (level === 0) return this.numeric('Pe ramură observi ' + this.quantity(insects, 'pasăre', 'păsări') + '. Apoi observi încă ' + this.quantity(birds, 'pasăre', 'păsări') + '. Câte păsări sunt în total?', insects + birds,
          insects + ' + ' + birds + ' = ' + (insects + birds) + '.', 'Unește cele două grupe de păsări.');
        if (level === 1) return this.numeric('Observi ' + this.quantity(insects, 'fluture', 'fluturi') + '. Fiecare are 4 aripi. Câte aripi au în total?', insects * 4,
          'Adunăm câte 4 pentru fiecare fluture: ' + insects + ' × 4 = ' + insects * 4 + '.', 'Desenează patru aripi pentru fiecare fluture.');
        return this.numeric('Observi ' + this.quantity(insects, 'insectă', 'insecte') + ', cu 6 picioare fiecare, și ' + this.quantity(birds, 'pasăre', 'păsări') + ', cu 2 picioare fiecare. Câte picioare sunt în total?', insects * 6 + birds * 2,
          insects + ' × 6 + ' + birds + ' × 2 = ' + (insects * 6 + birds * 2) + '.', 'Calculează separat picioarele insectelor și ale păsărilor.');
      }
    }
    if (type === 'matrix') return this.matrixRound(mode, level, index);
    if (type === 'robot') return this.robotRound(mode, level, index);
    throw new Error('Generator indisponibil: ' + type);
  },
  time(hour, minute) { return hour + ':' + String(minute).padStart(2, '0'); },

  matrixRound(mode, level, index) {
    if (mode === 'sequence' || mode === 'growth') {
      const start = this.randInt(1, 9), step = level + 1, values = [start, start + step, start + 2 * step];
      if (level < 2) return this.numeric('Continuă șirul: ' + values.join(', ') + ', ?', start + 3 * step,
        'Adăugăm de fiecare dată ' + step + '. Urmează ' + (start + 3 * step) + '.', 'Compară diferența dintre două numere vecine.');
      const a = this.randInt(1, 4), seq = [a, a + 1, a + 3, a + 6];
      return this.numeric('Creșterile sunt +1, +2, +3. Continuă cu +4: ' + seq.join(', ') + ', ?', a + 10,
        'Creșterea se mărește cu 1. Ultimul număr este ' + (a + 6) + ', apoi adăugăm 4: ' + (a + 10) + '.', 'Nu se repetă același salt; cresc și salturile.');
    }
    const forms = ['cerc', 'triunghi', 'pătrat'], colors = ['roșu', 'albastru', 'verde'];
    const row = index % (level === 0 ? 2 : 3), col = this.randInt(0, level === 0 ? 1 : 2);
    const label = forms[row] + ' ' + colors[col];
    const alternatives = [label, forms[(row + 1) % 3] + ' ' + colors[col], forms[row] + ' ' + colors[(col + 1) % 3]];
    if (level < 2) return this.choice('Rândul cere „' + forms[row] + '”, coloana cere „' + colors[col] + '”. Ce piesă alegi?',
      alternatives, 0, 'Combinăm forma rândului cu culoarea coloanei: ' + label + '.', 'Piesa trebuie să respecte ambele proprietăți.',
      { matrix: { forms: forms.slice(0, level === 0 ? 2 : 3), colors: colors.slice(0, level === 0 ? 2 : 3), row, col } });
    return this.choice('În tabelul afișat, piesa lipsă este pe rândul „' + forms[row] + '” și coloana „' + colors[col] + '”. După schimbarea culorii în galben, ce piesă obținem?',
      [forms[row] + ' galben', label, forms[(row + 1) % 3] + ' galben'], 0,
      'Mai întâi identificăm ' + label + ', apoi schimbăm doar culoarea. Forma rămâne ' + forms[row] + '.',
      'Rezolvă intersecția, apoi aplică schimbarea fără să modifici forma.',
      { matrix: { forms, colors, row, col } });
  },
  robotRound(mode, level, index) {
    const size = [3, 4, 5][level];
    const start = { x: 0, y: 0 }, goal = { x: this.randInt(1, size - 1), y: size - 1 };
    const blocked = level === 0 ? [] : [{ x: 1, y: 0 }, { x: this.randInt(1, size - 1), y: this.randInt(1, size - 2) }];
    return { kind: 'robot', prompt: mode === 'debug' ? 'Repară programul de probă și du robotul la stea. Rulează pas cu pas.' :
      mode === 'repeat' ? 'Folosește numărul de repetări pentru comenzi. Du robotul la stea fără să atingi obstacolele.' :
        'Construiește un traseu de la robot la stea. Obstacolele nu pot fi traversate.',
    size, start, goal, blocked, repeat: mode === 'repeat', debug: mode === 'debug', maxCommands: size * size,
    explain: 'Un program corect rămâne în grilă, evită obstacolele și se termină la stea. Sunt acceptate toate traseele valide.',
    hint: 'Un traseu sigur: mergi până jos pe prima coloană, apoi până la stea pe ultimul rând. Ținta este la rândul ' + size + ', coloana ' + (goal.x + 1) + '.' };
  },

  wordRounds(mode, level) {
    if (mode === 'syllables') {
      const words = [
        [['ma', 'mă'], ['ba', 'lon'], ['ca', 'să']],
        [['ca', 'me', 'ră'], ['pă', 'pu', 'șă'], ['pi', 'si', 'că']],
        [['soa', 're'], ['școa', 'lă'], ['bi', 'bli', 'o', 'te', 'că']]
      ][level];
      return words.map(tokens => ({ kind: 'arrange', prompt: 'Construiește cuvântul „' + tokens.join('') + '” din silabe.', tokens,
        explain: tokens.join('-') + ': ' + tokens.length + ' silabe. Citim silabele împreună pentru a verifica cuvântul.',
        hint: 'Spune cuvântul întreg, apoi rar. Bate o dată din palme pentru fiecare silabă: de exemplu, „ma-mă”.' }));
    }
    const words = [
      [['m_r', 'ă', 'măr'], ['p_pușă', 'ă', 'păpușă'], ['p_ine', 'â', 'pâine']],
      [['_not', 'î', 'înot'], ['r_u', 'â', 'râu'], ['m_ncare', 'â', 'mâncare']],
      [['a cobor_', 'î', 'a coborî'], ['ne_nțeles', 'î', 'neînțeles'], ['hotăr_', 'î', 'hotărî']]
    ][level];
    return words.map(item => this.choice('Completează: ' + item[0], ['ă', 'â', 'î'], ['ă', 'â', 'î'].indexOf(item[1]),
      'Forma corectă este „' + item[2] + '”. ' + (level === 2 ? 'La finalul acestor verbe și în cuvântul format cu prefix păstrăm î.' : 'Compară sunetul și poziția literei cu exemplele lecției.'),
      'Ă notează alt sunet. Pentru â/î verifică forma și poziția, nu lungimea sunetului.'));
  },
  writingRounds(level) {
    return [{
      kind: 'writing',
      prompt: ['Scrie un enunț despre un personaj și un loc.', 'Scrie cel puțin două enunțuri: o întâmplare și urmarea ei.', 'Scrie cel puțin trei enunțuri: început, întâmplare, încheiere.'][level],
      minimum: [1, 2, 3][level], minWords: [4, 8, 15][level],
      checklist: ['Mesajul are sens pentru un cititor.', 'Am numit personajul și am legat ideile.', 'Am recitit acordurile, diacriticele și semnele finale.'],
      hint: 'Poți porni de la „Mara era în parc.” Adaugă ce s-a întâmplat și cum s-a încheiat.',
      explain: 'Ai folosit o listă de revizuire. Verificarea automată urmărește numai câteva criterii de formă, nu confirmă gramatica sau sensul. Cere feedback unui adult.',
      evaluation: 'self'
    }];
  },
  readingRounds(mode, level) {
    const passages = {
      park: [
        { text: 'Lia merge în parc cu bunicul. Ei iau o minge albastră. În parc, Lia o împrumută lui Dan.', questions: [
          Q('Cu cine merge Lia în parc?', ['Cu bunicul', 'Cu Dan', 'Singură'], 0, 'Prima propoziție spune că Lia merge cu bunicul.'),
          Q('Ce culoare are mingea?', ['Albastră', 'Roșie', 'Nu este precizat'], 0, 'Textul spune „o minge albastră”.')
        ] },
        { text: 'Mara pune o carte în rucsac. Cerul este acoperit, iar la radio se anunță ploaie. Ea adaugă o umbrelă. La bibliotecă, lasă cartea pe masa de returnare.', questions: [
          Q('De ce ia Mara o umbrelă?', ['Pentru că se anunță ploaie', 'Ca să returneze cartea', 'Fiindcă este deja la bibliotecă'], 0, 'Anunțul despre ploaie susține alegerea umbrelei.'),
          Q('Unde duce cartea?', ['La bibliotecă', 'La magazin', 'La școală'], 0, 'Ultima propoziție numește biblioteca.')
        ] },
        { text: 'La clubul de lectură, Radu propune să aleagă cartea prin vot. Ina observă că un coleg nu vede bine literele mici. Grupul caută o ediție cu litere mari și o variantă audio. Abia apoi compară titlurile disponibile pentru toți.', questions: [
          Q('De ce nu votează imediat?', ['Verifică mai întâi accesul tuturor', 'Nu vor să citească', 'Nu există nicio carte'], 0, 'Grupul caută mai întâi formate pe care le pot folosi toți.'),
          Q('Ce concluzie este susținută de text?', ['O alegere bună ține cont și de accesibilitate', 'Votul este întotdeauna greșit', 'Toți preferă cărțile audio'], 0, 'Textul nu respinge votul, ci arată pregătirea unei alegeri incluzive.')
        ] }
      ],
      clues: [
        { text: 'Pe masă sunt trei creioane și o foaie cu un soare desenat. Nu vedem cine a făcut desenul.', questions: [
          Q('Ce știm sigur?', ['Pe foaie este un soare', 'Ana a desenat', 'Desenul a fost făcut azi'], 0, 'Soarele este observat; autorul și momentul nu sunt precizate.'),
          Q('Ce informație lipsește?', ['Cine a desenat', 'Câte creioane sunt', 'Ce apare pe foaie'], 0, 'Textul precizează că nu vedem autorul.')
        ] },
        { text: 'Curtea este udă. Lângă flori se află un furtun. Nu știm dacă a plouat. Un copil spune că poate cineva a udat grădina.', questions: [
          Q('Care este o presupunere?', ['Cineva a udat grădina', 'Curtea este udă', 'Există un furtun'], 0, 'Udarea este o explicație posibilă, nu un fapt confirmat.'),
          Q('Ce întrebare ajută verificarea?', ['A udat cineva curtea?', 'Ce culoare preferi?', 'Câte flori îți plac?'], 0, 'Întrebarea caută o informație relevantă pentru cauză.')
        ] },
        { text: 'Un ghiveci a fost mutat la fereastră și udat mai des. După o săptămână, planta are două frunze noi. O colegă spune că lumina a produs sigur schimbarea.', questions: [
          Q('De ce nu știm sigur cauza?', ['S-au schimbat și lumina, și udarea', 'Nu există frunze noi', 'Plantele nu cresc'], 0, 'Două condiții s-au modificat simultan, deci nu izolăm cauza.'),
          Q('Cum am putea verifica mai bine?', ['Comparăm plante similare schimbând un singur factor', 'Schimbăm toate condițiile', 'Privim o singură dată'], 0, 'O comparație controlată ajută să distingem efectele.')
        ] }
      ],
      observations: [
        { text: 'Observații despre o plantă: luni — 2 frunze; miercuri — 3 frunze; vineri — 4 frunze. Numărăm frunzele aceleiași plante.', questions: [
          Q('Câte frunze are vineri?', ['4', '3', '2'], 0, 'Valoarea de vineri este 4.'),
          Q('Cu câte frunze a crescut numărul de luni până vineri?', ['2', '4', '1'], 0, 'Calculăm diferența: 4 − 2 = 2.')
        ] },
        { text: 'Număr de păsări observate în același loc, câte zece minute: luni — 5; marți — 8; miercuri — 6. Nu urmărim fiecare pasăre după plecare.', questions: [
          Q('În ce zi au fost observate cele mai multe păsări?', ['Marți', 'Luni', 'Miercuri'], 0, '8 este valoarea cea mai mare.'),
          Q('Putem spune că sunt 19 păsări diferite?', ['Nu, unele pot fi observate în mai multe zile', 'Da, sigur', 'Nu există păsări'], 0, 'Suma observațiilor nu garantează numărul de animale distincte.')
        ] },
        { text: 'Două plante asemănătoare au aceeași lumină. Planta A primește udare potrivită și crește de la 8 la 12 cm. Planta B primește prea puțină apă și crește de la 8 la 9 cm. Observăm o singură pereche de plante.', questions: [
          Q('Care este diferența dintre creșterile lor?', ['3 cm', '4 cm', '1 cm'], 0, 'A crește cu 4 cm, B cu 1 cm: 4 − 1 = 3 cm.'),
          Q('Care concluzie este prudentă?', ['Rezultatul susține rolul apei, dar repetăm observația', 'Am demonstrat nevoile tuturor plantelor', 'Lumina nu contează niciodată'], 0, 'O singură pereche oferă un indiciu, nu o regulă universală.')
        ] }
      ]
    };
    const passage = passages[mode][level];
    return passage.questions.map(q => this.choice(q.prompt, q.options, q.answer, q.explain, 'Recitește și caută propoziția sau valorile care susțin răspunsul.', { passage: passage.text }));
  },

  experimentRounds(mode, level) {
    const bank = {
      plants: [
        ['Vrei să afli dacă apa influențează o plantă. Ce schimbi între două plante asemănătoare?', ['Doar cantitatea de apă', 'Apa, lumina și ghiveciul', 'Doar culoarea etichetei'], 'Schimbăm factorul studiat și păstrăm celelalte condiții relevante la fel.'],
        ['Două plante primesc aceeași lumină. A este udată potrivit, B prea puțin. Ce prezici?', ['A are condiții mai bune de creștere', 'B nu are nevoie de apă', 'Ambele cresc sigur identic'], 'Apa este necesară, dar rezultatul se observă în timp; predicția nu este o garanție.'],
        ['A crește 4 cm, B crește 1 cm. Ce concluzie formulăm?', ['Comparația susține rolul apei în aceste condiții', 'Orice cantitate de apă ajută', 'Lumina nu are niciun rol'], 'Rezultatul susține o concluzie limitată la condițiile testate. Prea multă apă poate dăuna.']
      ],
      water: [
        ['Un cub de gheață stă într-o cameră suficient de caldă. Ce prezici?', ['Se topește treptat', 'Devine imediat piatră', 'Rămâne mereu neschimbat'], 'Gheața primește căldură și se poate transforma în apă lichidă.'],
        ['Un pahar foarte rece stă în aer umed. Ce se poate forma pe exterior?', ['Picături de apă', 'Apă care trece prin sticlă', 'Doar gheață în orice condiții'], 'Vaporii din aer pot condensa pe suprafața rece.'],
        ['O baltă se micșorează fără să fiarbă. Ce explicație este potrivită?', ['O parte din apă se evaporă', 'Apa există doar la fierbere', 'Apa se transformă în pământ'], 'Evaporarea are loc și sub temperatura de fierbere; apa poate trece în aer ca vapori.']
      ],
      fair: [
        ['Compari topirea a două cuburi. Ce păstrezi la fel?', ['Mărimea cuburilor și timpul de observare', 'Doar numele lor', 'Nimic'], 'Ca să comparăm efectul locului, celelalte condiții relevante trebuie să fie asemănătoare.'],
        ['Schimbi și locul, și mărimea cubului. Ce problemă apare?', ['Nu mai separi efectele celor două schimbări', 'Rezultatul devine sigur', 'Nu mai există gheață'], 'Nu știm care schimbare a produs diferența observată.'],
        ['Rezultatul diferă de predicție. Care este pasul științific potrivit?', ['Notezi rezultatul, verifici condițiile și repeți', 'Ștergi observația', 'Schimbi rezultatul ca să se potrivească'], 'Datele se păstrează chiar când contrazic predicția.']
      ]
    };
    const item = bank[mode][level];
    const observation = {
      plants: ['În model, planta udată potrivit rămâne viguroasă; cea fără suficientă apă începe să se ofilească.', 'În model, A are o creștere mai mare decât B. În realitate ar trebui observații repetate.', 'În model, valorile sunt A: +4 cm și B: +1 cm.'],
      water: ['În model, cubul se micșorează și apare apă lichidă.', 'În model, apar picături pe exteriorul paharului rece.', 'În model, nivelul apei scade treptat fără fierbere.'],
      fair: ['În model folosim două cuburi egale și același interval de observare.', 'Modelul arată două condiții schimbate: loc și mărime. Cauza nu poate fi izolată.', 'Modelul păstrează observația și marchează necesitatea repetării.']
    }[mode][level];
    return [
      Object.assign(this.choice(item[0], item[1], 0, item[2], 'Alege mai întâi predicția sau planul. Apoi pornește modelul și compară.'), { kind: 'experiment', observation }),
      this.choice('După model: care afirmație este susținută?', [item[2], 'Modelul dovedește toate cazurile din natură.', 'O predicție nu poate fi schimbată.'], 0,
        'O concluzie se limitează la dovezile și condițiile disponibile. Modelul este simplificat, nu înlocuiește observațiile reale.',
        'Recitește observația modelului și evită formulările „toate” sau „niciodată”.', { passage: observation })
    ];
  },

  storyRounds(mode, level) {
    const bank = {
      conditions: [
        ['Regulă: dacă plouă, ia umbrela; altfel, nu. Acum plouă.', 'Iau umbrela', 'Nu iau umbrela', 'Execut ambele ramuri', 'Condiția este adevărată, deci alegem ramura pentru ploaie.'],
        ['Regulă: dacă numărul este par, îl pun în cutia A; altfel în B. Numărul este 13.', 'Îl pun în B', 'Îl pun în A', 'Îl pun în ambele', '13 este impar, deci condiția „este par” este falsă.'],
        ['Regulă: dacă numărul este par și mai mare decât 10, aleg A; altfel B. Numărul este 10.', 'Aleg B', 'Aleg A', 'Nu pot verifica', '10 este par, dar nu este mai mare decât 10. Ambele condiții trebuie respectate.']
      ],
      digital: [
        ['Un necunoscut într-un joc îți cere adresa.', 'Nu o trimit și cer ajutor unui adult de încredere', 'Trimit adresa', 'Trimit și numele școlii', 'Adresa este o informație personală, nu un lucru de oferit unui necunoscut.'],
        ['Primești un link care promite un premiu dacă introduci parola.', 'Nu deschid linkul și arăt mesajul unui adult', 'Introduc parola', 'Trimit linkul tuturor', 'O cerere de parolă pentru un premiu este un semnal de risc.'],
        ['Ai trimis deja o informație personală și cineva te amenință să păstrezi secretul.', 'Opresc discuția și cer imediat ajutor unui adult de încredere', 'Păstrez secretul de teamă', 'Trimit alte date', 'Poți cere ajutor și după o greșeală. Nu ești vinovat pentru amenințările altcuiva.']
      ],
      health: [
        ['Urmează să mănânci după joaca afară.', 'Mă spăl pe mâini cu apă și săpun', 'Șterg mâinile de haine', 'Nu schimb nimic', 'Spălarea cu apă și săpun ajută la igiena mâinilor.'],
        ['Te simți rău în timpul unui joc.', 'Mă opresc și anunț un adult', 'Iau singur medicamente', 'Ascund starea de rău', 'Un adult te poate ajuta să primești îngrijirea potrivită.'],
        ['Un coleg îți oferă medicamentul lui pentru o durere.', 'Refuz și cer ajutor unui adult', 'Îl iau fiindcă l-a ajutat pe el', 'Îl împart cu altcineva', 'Medicamentele nu se aleg și nu se împart între copii.']
      ],
      family: [
        ['Vrei să ajuți la masa de seară.', 'Întreb ce sarcină sigură pot face', 'Folosesc singur un cuțit ascuțit', 'Decid că numai fetele strâng masa', 'Alegem treburi pe care le putem face în siguranță. Fetele și băieții pot ajuta la aceleași treburi.'],
        ['Un coleg locuiește cu bunica, altul cu un părinte.', 'Respect faptul că familiile pot fi diferite', 'Spun că doar o familie este adevărată', 'Cer detalii personale în fața clasei', 'Familiile pot fi diferite. Nu judecăm familia cuiva și nu îi cerem să povestească lucruri personale.'],
        ['Un copil spune că nu se simte în siguranță acasă.', 'Îl încurajez să vorbească cu un adult de încredere care îl poate proteja', 'Îi cer să păstreze secretul', 'Îi spun că sigur greșește', 'Siguranța are prioritate. Un adult de încredere din afara casei poate ajuta.']
      ],
      friends: [
        ['Vrei creionul unui coleg.', 'Întreb dacă îl pot împrumuta', 'Îl iau fără să întreb', 'Îl ascund', 'Acordul respectă persoana și lucrurile ei.'],
        ['Un prieten insistă să joci un joc care te face să te simți inconfortabil.', 'Spun nu și propun alt joc', 'Accept orice de teamă să nu-l pierd', 'Îl jignesc', 'Poți exprima o limită fără să jignești.'],
        ['Ai spus nu, dar colegul continuă să-ți ia lucrurile.', 'Repet limita și cer sprijin unui adult', 'Cred că trebuie să accept', 'Îl lovesc', 'O limită încălcată repetat poate necesita ajutor. Nu răspundem prin violență.']
      ],
      school: [
        ['Mai mulți copii vorbesc deodată și nu vă auziți.', 'Stabilim cum vorbim pe rând', 'Vorbesc și mai tare', 'Nu mai ascult pe nimeni', 'Rândurile ne ajută să auzim și să fim auziți.'],
        ['Ai nevoie de o pauză de mișcare în timpul lecției.', 'Discut cu adultul o pauză sigură', 'Îi împing pe ceilalți', 'Cred că nevoia mea nu contează', 'O regulă poate include adaptări care ajută învățarea.'],
        ['Un coleg nu poate participa la joc din cauza unei reguli.', 'Propunem să schimbăm regula și cerem ajutor', 'Spunem că regula nu poate fi discutată', 'Îl obligăm să participe la fel', 'Putem schimba regula pentru ca și colegul să poată participa.']
      ],
      help: [
        ['Un coleg strânge multe piese.', 'Întreb dacă vrea ajutor', 'Îi iau piesele fără acord', 'Râd de el', 'Întrebăm înainte să ajutăm. Colegul poate alege dacă vrea ajutor.'],
        ['Un coleg încearcă să rezolve singur și cere doar un indiciu.', 'Ofer un indiciu, apoi îi las timp', 'Fac totul în locul lui', 'Îi ascund materialele', 'Ajutorul potrivit sprijină învățarea, nu o înlocuiește.'],
        ['Vezi un obiect greu căzut lângă un copil.', 'Chem un adult și păstrez distanța față de risc', 'Încerc singur să ridic orice greutate', 'Îi cer altui copil să intre sub obiect', 'Într-o situație riscantă, cerem ajutor calificat unui adult.']
      ],
      nature: [
        ['După picnic au rămas ambalajele tale.', 'Le strâng și le duc la colectarea potrivită', 'Le las sub un copac', 'Le arunc în apă', 'Nu lăsăm deșeuri în natură.'],
        ['Vezi un animal sălbatic aproape de potecă.', 'Păstrez distanța și îl observ fără să-l hrănesc', 'Încerc să-l ating', 'Îl urmăresc', 'Distanța protejează animalul și oamenii.'],
        ['Lângă un loc de joacă este sticlă spartă.', 'Avertizez și anunț un adult', 'O strâng cu mâna', 'O ascund în iarbă', 'Sticla spartă poate răni. Un adult poate organiza strângerea în siguranță.']
      ],
      emotions: [
        ['Te simți supărat după o neînțelegere.', 'Numesc emoția și aleg o pauză sau sprijin', 'Lovesc pentru că sunt supărat', 'Spun că nu am voie să simt nimic', 'Emoția este acceptabilă; alegem comportamente sigure.'],
        ['Un coleg tace înaintea unei prezentări.', 'Întreb cu grijă dacă dorește sprijin', 'Decid sigur că îi este frică', 'Râd de el', 'Nu putem cunoaște sigur emoția doar din comportament.'],
        ['Ești și bucuros, și îngrijorat înaintea unei excursii.', 'Accept ambele emoții și discut nevoia de sprijin', 'Cred că trebuie să aleg o singură emoție', 'Îi învinovățesc pe ceilalți', 'Putem avea mai multe emoții simultan.']
      ],
      conflict: [
        ['Doi copii vor aceeași minge.', 'Discută despre rânduri sau un joc comun', 'Cel mai puternic o ia', 'O ascund ca să nu joace nimeni', 'O soluție respectuoasă ține cont de ambii copii.'],
        ['Soluția propusă îi lasă mereu pe aceiași copii pe dinafară.', 'Schimbăm regula și îi ascultăm pe toți', 'Spunem că nu contează', 'Îi obligăm să accepte', 'O soluție bună nu îi lasă mereu pe aceiași copii fără rând la joc.'],
        ['Discuția devine amenințătoare și cineva împinge.', 'Ne îndepărtăm de risc și chemăm un adult', 'Continuăm disputa cu orice preț', 'Răspundem tot prin împingere', 'Siguranța are prioritate față de rezolvarea independentă.']
      ],
      boundaries: [
        ['Vrei să îmbrățișezi un coleg.', 'Întreb și respect răspunsul', 'Îl îmbrățișez fără să întreb', 'Insist până acceptă', 'Întrebăm fără să insistăm. Dacă auzim „nu”, ne oprim.'],
        ['Un coleg nu vrea să fie fotografiat.', 'Nu fac fotografia', 'O fac pe ascuns', 'Spun că refuzul nu contează', 'Respectăm refuzul unei fotografii.'],
        ['Cineva îți cere să păstrezi un secret care te sperie.', 'Îl spun unui adult de încredere', 'Îl păstrez chiar dacă mă simt în pericol', 'Cred că este vina mea', 'Poți cere protecție. Nu ești responsabil pentru cererea nepotrivită a altcuiva.']
      ],
      group: [
        ['Grupul are trei propuneri de joc.', 'Ascultăm propunerile înainte de alegere', 'Aleg eu fără discuție', 'Nu las pe nimeni să propună', 'Participarea începe prin ascultarea variantelor.'],
        ['Cei mai mulți aleg un joc la care un coleg nu poate participa.', 'Schimbăm jocul sau alegem unul la care poate participa și colegul', 'Spunem că votul rezolvă orice', 'Îl lăsăm mereu pe dinafară', 'Chiar dacă mulți aleg un joc, ne gândim și la colegul care nu poate participa.'],
        ['Ați testat o regulă nouă, dar nu funcționează pentru toți.', 'O revizuim folosind observațiile grupului', 'O păstrăm doar fiindcă am votat-o', 'Îi învinovățim pe cei excluși', 'O decizie bună poate fi îmbunătățită după testare.']
      ]
    };
    const item = bank[mode][level];
    const first = this.choice(item[0] + ' Ce alegi?', item.slice(1, 4), 0, item[4],
      'Compară consecințele: ce alegere respectă siguranța, acordul și nevoile persoanelor?');
    first.kind = 'story';
    first.consequences = [item[4], 'Această alegere nu rezolvă nevoia sau introduce un risc. Poți reveni și alege altfel.', 'Această alegere poate încălca o limită ori ignora informațiile. Încearcă o alternativă.'];
    return [first, this.choice('De ce este potrivită soluția aleasă?', [item[4], 'Pentru că trebuie să câștig mereu.', 'Pentru că nu contează consecințele.'], 0,
      'Explicația trebuie să se lege de situație, nu de o regulă de tip „câștig cu orice preț”.',
      'Revino la urmarea alegerii și numește nevoia protejată.')];
  },

  start(container, demo, level, onDone) {
    let rounds = this.rounds(demo, level);
    let index = 0, firstCorrect = 0, hints = 0, errors = 0, moves = 0, disposed = false;
    let attempts = 0, assisted = false, solved = false, roundHints = 0;
    const cleanup = [];
    const listen = (element, event, callback) => element.addEventListener(event, callback);
    const button = (text, callback, className) => {
      const node = document.createElement('button');
      node.type = 'button'; node.className = className || 'btn'; node.textContent = text;
      listen(node, 'click', callback);
      return node;
    };
    const announce = (text, bad) => {
      const status = container.querySelector('#game-feedback');
      status.textContent = text;
      status.className = 'game-feedback ' + (bad ? 'needs-work' : 'good');
    };
    const check = (correct, detail) => {
      if (solved || disposed) return;
      attempts++;
      if (!correct) {
        errors++;
        announce((detail || 'Pasul acesta nu se potrivește încă. Modifică răspunsul și încearcă din nou.') + ' Poți folosi un indiciu.', true);
        Sound.bad();
        return;
      }
      solved = true;
      if (attempts === 1 && !assisted) firstCorrect++;
      announce((detail ? detail + ' ' : '') + rounds[index].explain, false);
      container.querySelector('#game-next').hidden = false;
      container.querySelector('#game-hint').disabled = true;
      container.querySelector('#game-next').focus();
      Sound.good();
    };
    const render = () => {
      if (disposed) return;
      cleanup.splice(0).forEach(fn => fn());
      attempts = 0; assisted = false; solved = false; roundHints = 0;
      const q = rounds[index];
      container.innerHTML = '<div class="g-status">Sarcina ' + (index + 1) + ' din ' + rounds.length + ' · ' + LEVELS[level].title + '</div>' +
        '<progress aria-label="Sarcini parcurse" value="' + index + '" max="' + rounds.length + '"></progress>' +
        '<h3 class="game-prompt" tabindex="-1">' + this.escape(q.prompt) + '</h3>' +
        '<div id="round-content"></div><p id="game-feedback" class="game-feedback" role="status" aria-live="polite" aria-atomic="true"></p>' +
        '<div class="game-controls"><button class="btn" id="game-hint" type="button">Un indiciu</button>' +
        '<button class="btn btn-primary" id="game-next" type="button" hidden>Continuă</button></div>';
      const content = container.querySelector('#round-content');
      if (q.passage) {
        const passage = document.createElement('blockquote');
        passage.className = 'reading-passage'; passage.textContent = q.passage; content.appendChild(passage);
      }
      if (q.clock) content.insertAdjacentHTML('beforeend', this.clockSVG(q.clock.hour, q.clock.minutes));
      if (q.shape) content.insertAdjacentHTML('beforeend', this.shapeSVG(q.shape, q.rotation));
      if (q.scene) { const scene = document.createElement('div'); scene.className = 'count-scene'; scene.textContent = q.scene; content.appendChild(scene); }
      if (q.matrix) content.insertAdjacentHTML('beforeend', this.matrixHTML(q.matrix));
      const showChoices = () => {
        const options = document.createElement('div'); options.className = 'quiz-options';
        this.shuffle(q.options.map((option, optionIndex) => ({ option, optionIndex }))).forEach(({ option, optionIndex }) => {
          const node = button(option, () => {
            if (solved) return;
            const correct = optionIndex === q.answer;
            if (correct) Array.from(options.children).forEach(b => { b.disabled = true; });
            check(correct, q.consequences ? q.consequences[optionIndex] : '');
          }, 'quiz-opt');
          options.appendChild(node);
        });
        content.appendChild(options);
      };
      const workshopKind = ['calculation', 'shape-select', 'geoboard', 'symmetry', 'fraction-paint', 'mosaic'].includes(q.kind);
      if (workshopKind) MathWorkshop.render(content, q, { button, check, announce, isSolved: () => solved });
      else if (['choice', 'story'].includes(q.kind)) {
        if (q.balance) content.insertAdjacentHTML('beforeend', MathWorkshop.balanceHTML(q.balance));
        showChoices();
      }
      else if (q.kind === 'experiment') {
        let selected = null;
        const fieldset = document.createElement('fieldset');
        fieldset.innerHTML = '<legend>Predicția mea / alegerea planului</legend>';
        this.shuffle(q.options.map((option, i) => ({ option, i }))).forEach(({ option, i }) => {
          const label = document.createElement('label'); label.className = 'radio-choice';
          const input = document.createElement('input'); input.type = 'radio'; input.name = 'prediction';
          listen(input, 'change', () => { selected = i; });
          label.appendChild(input); label.appendChild(document.createTextNode(' ' + option)); fieldset.appendChild(label);
        });
        content.appendChild(fieldset);
        content.appendChild(button('Pornește modelul și observă', () => {
          if (selected === null) { announce('Alege întâi o predicție sau un plan.', true); return; }
          const observation = document.createElement('p'); observation.className = 'reading-passage'; observation.textContent = q.observation;
          content.appendChild(observation);
          Array.from(fieldset.elements).forEach(input => { input.disabled = true; });
          const correct = selected === q.answer;
          if (!correct) {
            attempts++; errors++;
            announce('Modelul te ajută să revizuiești predicția. Citește observația, apoi alege explicația potrivită.', true);
          }
          fieldset.hidden = true;
          run.disabled = true;
          showChoices();
        }));
        const run = content.lastElementChild;
      } else if (q.kind === 'clock-set') {
        const preview = document.createElement('div');
        const hourLabel = document.createElement('label'), minuteLabel = document.createElement('label');
        hourLabel.textContent = 'Acul scurt: ora'; minuteLabel.textContent = 'Acul lung: minutele';
        const hour = document.createElement('select'), minute = document.createElement('select');
        hour.setAttribute('aria-label', 'Ora de pe ceas'); minute.setAttribute('aria-label', 'Minutele de pe ceas');
        for (let value = 1; value <= 12; value++) hour.appendChild(new Option(String(value), String(value)));
        for (let value = 0; value < 60; value += 5) minute.appendChild(new Option(String(value), String(value)));
        hour.value = '12';
        const update = () => { preview.innerHTML = this.clockSVG(Number(hour.value), Number(minute.value)); };
        listen(hour, 'change', update); listen(minute, 'change', update);
        hourLabel.appendChild(hour); minuteLabel.appendChild(minute);
        content.appendChild(preview); content.appendChild(hourLabel); content.appendChild(minuteLabel);
        content.appendChild(button('Verifică ceasul', () => check(Number(hour.value) === q.target.hour && Number(minute.value) === q.target.minutes), 'btn btn-primary'));
        update();
      } else if (q.kind === 'arrange') {
        const selected = [];
        const row = document.createElement('div'); row.className = 'token-row'; row.setAttribute('aria-label', 'Răspunsul construit');
        const pool = document.createElement('div'); pool.className = 'token-pool';
        const tokens = this.shuffle(q.tokens.map((text, id) => ({ text, id })));
        const update = () => {
          row.replaceChildren();
          selected.forEach((id, position) => row.appendChild(button(tokens.find(t => t.id === id).text + ' ×', () => {
            if (solved) return; selected.splice(position, 1); update();
          })));
          pool.replaceChildren();
          tokens.forEach(token => {
            const node = button(token.text, () => { if (solved || selected.includes(token.id)) return; selected.push(token.id); update(); });
            node.disabled = solved || selected.includes(token.id); pool.appendChild(node);
          });
        };
        content.appendChild(row); content.appendChild(pool);
        content.appendChild(button('Verifică ordinea', () => {
          if (selected.length !== q.tokens.length) { announce('Folosește toate piesele. Apasă o piesă din răspuns pentru a o muta înapoi.', true); return; }
          check(selected.every((id, position) => q.tokens[id] === q.tokens[position]));
        }, 'btn btn-primary'));
        const instruction = document.createElement('p'); instruction.textContent = 'Apasă o piesă din răspuns pentru a o scoate și a schimba ordinea.'; content.appendChild(instruction);
        update();
      } else if (q.kind === 'match') {
        const selections = new Map();
        const right = this.shuffle(q.pairs.map((pair, id) => ({ text: pair.b, id })));
        q.pairs.forEach((pair, i) => {
          const label = document.createElement('label'); label.className = 'match-select'; label.textContent = pair.a + ' → ';
          const select = document.createElement('select'); select.setAttribute('aria-label', 'Pereche pentru ' + pair.a);
          select.appendChild(new Option('Alege perechea', ''));
          right.forEach(item => select.appendChild(new Option(item.text, String(item.id))));
          listen(select, 'change', () => selections.set(i, select.value)); label.appendChild(select); content.appendChild(label);
        });
        content.appendChild(button('Verifică perechile', () => {
          if (selections.size !== q.pairs.length || Array.from(selections.values()).includes('')) { announce('Alege o pereche pentru fiecare element.', true); return; }
          check(q.pairs.every((pair, i) => Number(selections.get(i)) === i));
        }, 'btn btn-primary'));
      } else if (q.kind === 'placevalue') {
        let tens = 0, units = 0;
        const model = document.createElement('div'); model.className = 'place-model'; model.setAttribute('aria-live', 'polite');
        const controls = document.createElement('div'); controls.className = 'game-controls';
        const update = () => {
          model.innerHTML = '<p>' + this.quantity(tens, 'grup de zece', 'grupuri de zece') + ' + ' + this.quantity(units, 'unitate separată', 'unități separate') + ' = <strong>' + (tens * 10 + units) + '</strong></p>' +
            '<div aria-hidden="true" class="tens-model">' + Array(tens).fill('<span class="ten-rod"><span class="rod-segments">' + Array(10).fill('<i></i>').join('') + '</span><span>10</span></span>').join('') + '</div>' +
            '<div aria-hidden="true" class="units-model">' + Array(units).fill('<span class="unit-dot">1</span>').join('') + '</div>';
        };
        [['− un grup de 10', () => { tens = Math.max(0, tens - 1); }], ['+ un grup de 10', () => { tens = Math.min(10, tens + 1); }],
          ['− o unitate', () => { units = Math.max(0, units - 1); }], ['+ o unitate', () => { units = Math.min(9, units + 1); }]].forEach(entry => {
          controls.appendChild(button(entry[0], () => { if (solved) return; entry[1](); update(); }));
        });
        content.appendChild(model); content.appendChild(controls);
        content.appendChild(button('Verifică numărul', () => check(tens === q.tens && units === q.units), 'btn btn-primary'));
        update();
      } else if (q.kind === 'numberline') {
        const label = document.createElement('label'); label.textContent = 'Poziția pe axă'; label.htmlFor = 'axis-input';
        const input = document.createElement('input'); input.type = 'range'; input.min = 0; input.max = q.max; input.value = q.start;
        input.id = 'axis-input'; input.setAttribute('aria-label', 'Poziția pe axă');
        const track = document.createElement('p'); track.className = 'axis-labels'; track.textContent = '0 ←────────→ ' + q.max;
        content.appendChild(label); content.appendChild(this.rangeControl(input)); content.appendChild(track);
        content.appendChild(button('Verifică poziția', () => {
          check(Number(input.value) === q.answer);
          input.disabled = solved; this.refreshRangeControls(content);
        }, 'btn btn-primary'));
      } else if (q.kind === 'robot') {
        this.renderRobot(content, q, check, announce, button, () => solved, cleanup);
      } else if (q.kind === 'memory') {
        const cards = this.shuffle(q.pairs.concat(q.pairs)), nodes = [], opened = [];
        let matched = 0;
        const grid = document.createElement('div'); grid.className = 'memory-grid';
        const status = document.createElement('p'); status.setAttribute('role', 'status');
        const update = () => { status.textContent = 'Perechi: ' + matched + '/' + q.pairs.length + ' · Încercări: ' + moves; };
        const closePair = button('Ascunde cele două cartonașe', () => {
          opened.splice(0).forEach(i => { nodes[i].textContent = '❓'; nodes[i].setAttribute('aria-label', 'Cartonaș ' + (i + 1) + ', ascuns'); });
          closePair.hidden = true;
        });
        closePair.hidden = true;
        cards.forEach((emoji, i) => {
          const node = button('❓', () => {
            if (solved || node.disabled || opened.includes(i) || opened.length === 2) return;
            node.textContent = emoji; node.setAttribute('aria-label', 'Cartonaș ' + (i + 1) + ': ' + emoji); opened.push(i);
            if (opened.length === 2) {
              moves++;
              if (cards[opened[0]] === cards[opened[1]]) {
                opened.forEach(id => { nodes[id].disabled = true; }); opened.length = 0; matched++;
                if (matched === q.pairs.length) {
                  if (moves > q.pairs.length) assisted = true;
                  check(true, 'Ai găsit perechile în ' + moves + ' încercări. Acesta este un exercițiu de strategie, nu o notă.');
                }
              } else { closePair.hidden = false; closePair.focus(); }
              update();
            }
          }, 'memory-card');
          node.setAttribute('aria-label', 'Cartonaș ' + (i + 1) + ', ascuns'); nodes.push(node); grid.appendChild(node);
        });
        content.appendChild(status); content.appendChild(grid); content.appendChild(closePair); update();
      } else if (q.kind === 'writing') {
        const label = document.createElement('label'); label.textContent = 'Textul tău'; label.htmlFor = 'writing-text';
        const input = document.createElement('textarea'); input.id = 'writing-text'; input.rows = 6; input.lang = 'ro'; input.maxLength = 5000;
        const note = document.createElement('p'); note.textContent = 'Autoevaluare: nu primești o certificare automată a gramaticii. Textul nu este trimis unui server și nu este salvat în progres.';
        const checks = q.checklist.map((text, i) => {
          const row = document.createElement('label'); row.className = 'radio-choice';
          const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.id = 'writing-check-' + i;
          row.appendChild(checkbox); row.appendChild(document.createTextNode(' ' + text)); return { row, checkbox };
        });
        content.appendChild(label); content.appendChild(input); content.appendChild(note); checks.forEach(item => content.appendChild(item.row));
        content.appendChild(button('Verifică forma și încheie autoevaluarea', () => {
          const review = this.reviewWriting(input.value, q.minimum, q.minWords);
          if (!review.valid) { announce(review.message, true); return; }
          if (!checks.every(item => item.checkbox.checked)) { announce('Recitește textul și verifică fiecare criteriu. Cere feedback unui adult dacă ai dubii.', true); return; }
          check(true, 'Autoevaluare înregistrată, fără acordarea unei stele de competență.');
        }, 'btn btn-primary'));
      } else throw new Error('Interfață de joc indisponibilă: ' + q.kind);
      listen(container.querySelector('#game-hint'), 'click', () => {
        if (solved) return; hints++; roundHints++; assisted = true;
        announce(roundHints === 1 ? q.hint : q.hint + ' Exemplu de verificare: ' + q.explain, false);
      });
      listen(container.querySelector('#game-next'), 'click', () => {
        if (!solved || disposed) return;
        if (++index < rounds.length) render(); else finish();
      });
      container.querySelector('.game-prompt').focus();
    };
    const finish = () => {
      cleanup.splice(0).forEach(fn => fn());
      const self = rounds.some(q => q.evaluation === 'self');
      const result = { level, total: rounds.length, firstCorrect, hints, errors, moves, evaluation: self ? 'self' : demo.type === 'memory' ? 'practice' : 'objective',
        percent: Math.round(firstCorrect / rounds.length * 100), finishedAt: new Date().toISOString() };
      container.innerHTML = '<h3 tabindex="-1">Ai încheiat runda!</h3><p>' + (self ? 'Ai exersat scrierea și autoevaluarea. Cere și feedback uman.' :
        demo.type === 'memory' ? 'Ai exersat o strategie de memorare. Numărul de încercări nu este o notă.' :
          firstCorrect + ' din ' + rounds.length + ' sarcini rezolvate din prima, fără indiciu. Ai corectat și ai parcurs toate explicațiile.') +
        '</p><p>Indicii folosite: ' + hints + '. Corectări necesare: ' + errors + '.</p><p>O pauză este binevenită. Poți relua sau poți alege alt nivel.</p>';
      container.appendChild(button('Reia cu o rundă nouă', () => {
        if (disposed) return;
        rounds = this.rounds(demo, level); index = 0; firstCorrect = 0; hints = 0; errors = 0; moves = 0;
        render();
      }, 'btn btn-primary'));
      container.querySelector('h3').focus();
      onDone(result);
    };
    render();
    return { dispose() { disposed = true; cleanup.splice(0).forEach(fn => fn()); container.replaceChildren(); } };
  },

  reviewWriting(text, minimum, minWords) {
    const value = text.trim();
    const words = value.match(/[A-Za-zĂÂÎȘȚăâîșț]+/g) || [];
    const sentences = value.match(/[^.!?]+[.!?]+/g) || [];
    if (words.length < minWords) return { valid: false, message: 'Adaugă idei: ai nevoie de cel puțin ' + minWords + ' cuvinte pentru această sarcină.' };
    if (!/^[A-ZĂÂÎȘȚ]/.test(value)) return { valid: false, message: 'Începe textul cu o literă mare.' };
    if (!/[.!?]$/.test(value)) return { valid: false, message: 'Încheie textul cu un semn de punctuație potrivit.' };
    if (sentences.length < minimum) return { valid: false, message: 'Scrie cel puțin ' + this.quantity(minimum, 'enunț încheiat', 'enunțuri încheiate') + ' cu semne de punctuație.' };
    if (words.some(word => /^(.)\1{2,}$/i.test(word))) return { valid: false, message: 'Am observat un șir de litere repetate. Recitește și scrie cuvinte cu sens.' };
    return { valid: true, message: 'Criteriile automate de formă sunt îndeplinite. Sensul și gramatica necesită recitire și feedback uman.' };
  },

  renderRobot(content, q, check, announce, button, isSolved, cleanup) {
    let position = Object.assign({}, q.start), commands = q.debug ? ['right', 'right'] : [], cursor = 0, usedRepeat = false;
    const directions = { up: [0, -1, 'Sus'], right: [1, 0, 'Dreapta'], down: [0, 1, 'Jos'], left: [-1, 0, 'Stânga'] };
    const board = document.createElement('div'); board.className = 'robot-board'; board.style.gridTemplateColumns = 'repeat(' + q.size + ', minmax(0, 1fr))';
    board.setAttribute('role', 'img'); board.setAttribute('aria-label', 'Grilă de ' + q.size + ' pe ' + q.size + '. Robotul pornește în colțul stânga sus; ținta este la rândul ' + (q.goal.y + 1) + ', coloana ' + (q.goal.x + 1) + '.');
    const status = document.createElement('p'); status.setAttribute('role', 'status');
    const program = document.createElement('ol'); program.className = 'robot-program'; program.setAttribute('aria-label', 'Programul construit');
    const controls = document.createElement('div'); controls.className = 'game-controls';
    const repeatLabel = document.createElement('label'); repeatLabel.textContent = 'Repetări: ';
    const repetitions = document.createElement('select'); repetitions.setAttribute('aria-label', 'Număr de repetări');
    for (let i = 1; i <= q.size; i++) repetitions.appendChild(new Option(String(i), String(i)));
    if (q.repeat) { repeatLabel.appendChild(repetitions); content.appendChild(repeatLabel); }
    const update = () => {
      board.replaceChildren();
      for (let y = 0; y < q.size; y++) for (let x = 0; x < q.size; x++) {
        const cell = document.createElement('span'); cell.className = 'robot-cell';
        cell.textContent = position.x === x && position.y === y ? '🤖' : q.blocked.some(p => p.x === x && p.y === y) ? '⛔' : q.goal.x === x && q.goal.y === y ? '⭐' : '·';
        board.appendChild(cell);
      }
      status.textContent = 'Robot: rândul ' + (position.y + 1) + ', coloana ' + (position.x + 1) + '. Comanda următoare: ' + (cursor + 1) + '. Obstacole: ' +
        (q.blocked.map(p => 'rând ' + (p.y + 1) + ', coloană ' + (p.x + 1)).join('; ') || 'niciunul') + '.';
      program.replaceChildren();
      commands.forEach((command, i) => {
        const item = document.createElement('li');
        const remove = button((i < cursor ? '✓ ' : '') + directions[command][2] + ' ×', () => {
          if (isSolved()) return; commands.splice(i, 1); reset();
        });
        remove.setAttribute('aria-label', 'Șterge comanda ' + (i + 1) + ': ' + directions[command][2]); item.appendChild(remove); program.appendChild(item);
      });
    };
    const reset = () => { cursor = 0; position = Object.assign({}, q.start); update(); };
    Object.keys(directions).forEach(direction => controls.appendChild(button(directions[direction][2], () => {
      if (isSolved()) return;
      const count = q.repeat ? Number(repetitions.value) : 1;
      if (commands.length + count > q.maxCommands) { announce('Programul este prea lung. Șterge comenzi sau reia planul.', true); return; }
      if (count > 1) usedRepeat = true;
      for (let i = 0; i < count; i++) commands.push(direction);
      reset();
    })));
    const step = () => {
      if (isSolved()) return;
      if (cursor >= commands.length) { announce('Adaugă comenzi sau apasă „Verifică destinația” dacă ai încheiat programul.', true); return; }
      const direction = directions[commands[cursor]], next = { x: position.x + direction[0], y: position.y + direction[1] };
      if (next.x < 0 || next.x >= q.size || next.y < 0 || next.y >= q.size || q.blocked.some(p => p.x === next.x && p.y === next.y)) {
        check(false, 'Comanda ' + (cursor + 1) + ' lovește un obstacol sau iese din grilă. Șterge-o și reconstruiește.'); return;
      }
      position = next; cursor++; update();
    };
    content.appendChild(board); content.appendChild(status); content.appendChild(controls); content.appendChild(program);
    const actions = document.createElement('div'); actions.className = 'game-controls';
    if (q.repeat) actions.appendChild(button('Repetă întregul program', () => {
      if (isSolved()) return;
      const count = Number(repetitions.value);
      if (!commands.length || count < 2) { announce('Construiește întâi o grupă de comenzi și alege cel puțin două repetări.', true); return; }
      if (commands.length * count > q.maxCommands) { announce('Repetarea depășește lungimea permisă. Folosește o grupă mai scurtă.', true); return; }
      const group = commands.slice();
      for (let i = 1; i < count; i++) commands = commands.concat(group);
      usedRepeat = true; reset();
    }));
    actions.appendChild(button('Execută un pas', step));
    actions.appendChild(button('Reia execuția', () => { if (!isSolved()) reset(); }));
    actions.appendChild(button('Șterge programul', () => { if (!isSolved()) { commands = []; usedRepeat = false; reset(); } }));
    actions.appendChild(button('Verifică destinația', () => {
      if (q.repeat && !usedRepeat) { announce('În această lecție exersăm repetările. Folosește de cel puțin două ori o comandă sau o grupă prin controlul de repetare.', true); return; }
      check(cursor === commands.length && position.x === q.goal.x && position.y === q.goal.y,
        cursor < commands.length ? 'Execută toate comenzile înainte de verificare.' : '');
    }, 'btn btn-primary'));
    content.appendChild(actions); update();
  },
  shapeSVG(shape, rotation, variant) {
    const v = variant || 0;
    const paths = {
      circle: '<circle cx="50" cy="50" r="38"/>',
      triangle: '<polygon points="' + (v % 2 ? '20,20 78,30 45,88' : '50,9 88,74 12,74') + '"/>',
      square: '<rect x="' + (22 + v) + '" y="' + (22 + v) + '" width="' + (56 - v * 2) + '" height="' + (56 - v * 2) + '"/>',
      rectangle: '<rect x="' + (10 + v) + '" y="' + (28 + v) + '" width="' + (80 - v * 2) + '" height="' + (44 - v * 2) + '"/>',
      pentagon: '<polygon points="50,8 90,37 75,84 25,84 10,37"/>',
      hexagon: '<polygon points="50,8 86,29 86,71 50,92 14,71 14,29"/>'
    };
    const descriptions = {
      circle: 'Contur curb închis, fără laturi drepte și fără vârfuri.',
      triangle: 'Contur cu trei laturi drepte și trei vârfuri.',
      square: 'Patru laturi egale și patru unghiuri drepte.',
      rectangle: 'Patru unghiuri drepte și laturi alăturate de lungimi diferite.',
      pentagon: 'Contur cu cinci laturi drepte și cinci vârfuri.',
      hexagon: 'Contur cu șase laturi drepte și șase vârfuri.'
    };
    return '<svg class="learning-shape" viewBox="0 0 100 100" role="img" aria-label="' + descriptions[shape] + '"><g fill="currentColor" transform="rotate(' + (rotation || 0) + ' 50 50)">' + paths[shape] + '</g></svg>';
  },
  clockSVG(hour, minute) {
    let numbers = '';
    for (let n = 1; n <= 12; n++) {
      const angle = (n * 30 - 90) * Math.PI / 180;
      numbers += '<text x="' + (100 + 78 * Math.cos(angle)) + '" y="' + (105 + 78 * Math.sin(angle)) + '" text-anchor="middle">' + n + '</text>';
    }
    const description = (minute === 0 ? 'acul scurt indică ' + hour : 'acul scurt este între ' + hour + ' și ' + (hour % 12 + 1)) +
      ', iar acul lung indică ' + (minute === 0 ? 12 : minute / 5);
    return '<svg class="learning-clock" viewBox="0 0 200 200" role="img" aria-label="Ceas analogic: ' + description + '.">' +
      '<circle cx="100" cy="100" r="96" fill="var(--bg-card)" stroke="currentColor"/>' + numbers +
      '<line x1="100" y1="100" x2="100" y2="52" stroke="currentColor" stroke-width="7" transform="rotate(' + ((hour % 12) * 30 + minute / 2) + ' 100 100)"/>' +
      '<line x1="100" y1="100" x2="100" y2="25" stroke="var(--s-mat)" stroke-width="4" transform="rotate(' + minute * 6 + ' 100 100)"/><circle cx="100" cy="100" r="5" fill="currentColor"/></svg>';
  },
  matrixHTML(matrix) {
    let html = '<div class="matrix-scroll"><table class="learning-matrix"><caption>Forme pe rânduri, culori pe coloane</caption><thead><tr><th scope="col">Formă / culoare</th>';
    matrix.colors.forEach(color => { html += '<th scope="col">' + color + '</th>'; });
    html += '</tr></thead><tbody>';
    matrix.forms.forEach((form, row) => {
      html += '<tr><th scope="row">' + form + '</th>';
      matrix.colors.forEach((color, col) => { html += '<td>' + (row === matrix.row && col === matrix.col ? '❓' : form + ' ' + color) + '</td>'; });
      html += '</tr>';
    });
    return html + '</tbody></table></div>';
  }
};
