/* Motoare fără cronometru: încercare, indiciu, corectare, explicație, continuare. */
const Engines = {
  types: ['quiz', 'count', 'match', 'arrange', 'classify', 'memory', 'clock', 'shapes', 'type', 'balance', 'shop', 'gen', 'placevalue', 'numberline', 'wordbuilder', 'reading', 'experiment', 'story', 'matrix', 'robot', 'measurement', 'fractions', 'mission', 'device', 'punctuation', 'routine'],
  modes: {
    count: ['count'], memory: ['pairs'], clock: ['time'], shapes: ['properties', 'objects', 'riddle'], type: ['story'],
    balance: ['equal'], shop: ['budget'], gen: ['two-step', 'nature', 'multiply', 'divide', 'thousand', 'compare', 'money', 'data'], placevalue: ['build', 'exchange'], numberline: ['add', 'subtract'],
    wordbuilder: ['syllables', 'diacritics'], reading: ['park', 'clues', 'observations', 'long'], experiment: ['plants', 'water', 'fair'],
    story: ['conditions', 'digital', 'health', 'family', 'friends', 'school', 'help', 'nature', 'emotions', 'conflict', 'boundaries', 'group'],
    matrix: ['sequence', 'classification', 'grid', 'growth'], robot: ['route', 'debug', 'repeat'], measurement: ['ruler'], fractions: ['parts'],
    mission: ['evidence', 'repair', 'plan'], device: ['practice'], punctuation: ['marks'], routine: ['day']
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
    return Object.assign({ kind: 'choice', prompt, options, answer, explain, hint: hint || 'Fă un desen sau folosește obiecte. Apoi verifică fiecare variantă.' }, extra || {});
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
    // say/picture: cuvânt de ascultat (jocuri cu sunete) și imaginea lui
    const extra = question.say ? { say: question.say, picture: question.picture || '' } : question.scene ? { scene: question.scene, pictureScene: true } : undefined;
    return this.choice(question.prompt, options, options.indexOf(correct), question.explain, question.hint, extra);
  },
  // un nivel poate avea mai multe sarcini decât rundele unui joc: la fiecare joc se aleg altele
  draw(list, count) {
    const shuffled = this.shuffle(list);
    return Number.isInteger(count) && count > 0 ? shuffled.slice(0, count) : shuffled;
  },
  gameOptions(demo) {
    if (demo.type === 'shapes') return [
      { id: 'draw', title: 'Construiesc figuri pe grilă', description: 'Alegi vârfurile în ordine, închizi conturul și verifici proprietățile figurii.' },
      { id: 'symmetry', title: 'Completez imaginea în oglindă', description: 'Colorezi pătrățelele la fel de departe de linia din mijloc.' },
      { id: 'mosaic', title: 'Acopăr un mozaic', description: 'Rotești și așezi piese de două pătrățele, fără goluri sau suprapuneri.' },
      { id: 'properties', title: 'Aleg după proprietăți', description: 'Selectezi toate figurile care respectă cerința, indiferent de rotire sau culoare.' },
      { id: 'garden', title: 'Compar suprafața și conturul', minLevel: 1, description: 'Numeri pătrățelele din interior și laturile mici de pe margine. Disponibil de la Exersez.' }
    ];
    if (demo.type === 'placevalue') return [
      { id: 'build', title: 'Construiesc un număr', description: 'Alegi grupurile de câte zece și unitățile necesare numărului cerut.' },
      { id: 'decompose', title: 'Descompun numărul', description: 'Scrii separat valoarea cifrei zecilor și unitățile rămase.' },
      { id: 'exchange', title: 'Schimb zece unități', description: 'Regrupezi unitățile în grupuri de câte zece, păstrând totalul.' }
    ];
    if (demo.type === 'numberline') return [
      { id: 'line', title: 'Mă deplasez pe axă', description: 'Pornești de la numărul dat și urmărești saltul cerut.' },
      { id: 'unknown', title: 'Găsesc numărul ascuns', description: 'Folosești legătura dintre adunare și scădere pentru numărul lipsă.' },
      { id: 'family', title: 'Leg adunarea de scădere', description: 'Completezi operații care folosesc aceleași părți și același întreg.' },
      { id: 'story', title: 'Rezolv o poveste în doi pași', description: 'Păstrezi rezultatul primei schimbări și continui cu a doua.' }
    ];
    if (demo.type === 'robot') return [
      { id: 'route', title: 'Planific traseul robotului', description: 'Alegi comenzile care duc la țintă, fără obstacole.' },
      { id: 'debug', title: 'Repar programul robotului', description: 'Compari programul dat cu traseul și corectezi comenzile nepotrivite.' },
      { id: 'repeat', title: 'Folosesc repetări', description: 'Alegi comanda și numărul de repetări, verificând fiecare căsuță traversată.' }
    ];
    return [];
  },
  rounds(demo, level) {
    if (!this.types.includes(demo.type)) throw new Error('Tip de joc necunoscut: ' + demo.type);
    if (this.modes[demo.type] && !this.modes[demo.type].includes(demo.mode)) throw new Error('Variantă de joc necunoscută: ' + demo.mode);
    const config = demo.levels[level];
    if (!config) throw new Error('Nivel de joc inexistent.');
    if (demo.type === 'mission') return MissionGames.rounds(demo, level);
    if (demo.focus) {
      const option = this.gameOptions(demo).find(item => item.id === demo.focus);
      if (!option || level < (option.minLevel || 0)) throw new Error('Jocul ales nu este disponibil la acest nivel.');
      if (!Number.isInteger(config.rounds) || config.rounds < 1) throw new Error('Număr de sarcini invalid.');
      return Array.from({ length: config.rounds }, (_, index) => {
        if (demo.type === 'shapes') return MathWorkshop.geometry(demo.mode, level, index,
          ['draw', 'symmetry', 'mosaic', 'properties', 'garden'].indexOf(demo.focus));
        if (demo.type === 'placevalue') return this.generate(demo.type, demo.mode, level,
          index * 3 + ['build', 'decompose', 'exchange'].indexOf(demo.focus));
        if (demo.type === 'numberline') return MathWorkshop.arithmetic(demo.mode, level,
          index * 20 + ['line', 'unknown', 'family', 'story'].indexOf(demo.focus));
        return this.robotRound(demo.focus, level, index);
      });
    }
    if (typeof HandsOn !== 'undefined' && HandsOn.handles(demo.type)) return HandsOn.rounds(demo, level, config);
    if (demo.type === 'quiz') {
      return this.draw(config.questions, config.rounds).map(q => this.questionRound(q));
    }
    if (demo.type === 'arrange') return this.draw(config.questions, config.rounds).map(q => Object.assign({ kind: 'arrange' }, q));
    if (demo.type === 'match') {
      const pairs = this.draw(config.pairs, config.show);
      return [{ kind: 'match', prompt: config.prompt || 'Potrivește fiecare cuvânt din stânga cu perechea lui.', pairs, explain: pairs.map(p => p.a + ' — ' + p.b).join('; ') + '.', hint: config.hint || 'Alege un element din stânga, apoi caută relația lui în dreapta.' }];
    }
    if (demo.type === 'classify') {
      return this.draw(config.items, config.rounds).map(item => this.choice('Unde se potrivește: ' + item.label + '?', config.zones, item.zone,
        '„' + item.label + '” merge la grupa „' + config.zones[item.zone] + '”.',
        'Citește numele fiecărei grupe. Dacă scrie „și”, trebuie să se potrivească amândouă.'));
    }
    if (demo.type === 'memory') {
      const pairs = ['🍎', '🌻', '🐟', '🚲', '📖', '🦋', '🌳', '⭐', '🐢', '🎲'].slice(0, [3, 5, 8][level]);
      return [{ kind: 'memory', prompt: 'Găsește perechile. Ține minte unde este fiecare desen.', pairs,
        hint: 'Întoarce cartonașele pe rând. Spune în gând unde ai văzut fiecare desen.', explain: 'Ai găsit toate perechile. Ți-ai antrenat memoria!' }];
    }
    if (demo.type === 'type') return this.writingRounds(level);
    if (demo.type === 'reading') return this.readingRounds(demo.mode, level);
    if (demo.type === 'experiment') return this.experimentRounds(demo.mode, level);
    if (demo.type === 'story') return this.storyRounds(demo.mode, level);
    if (demo.type === 'wordbuilder') return this.wordRounds(demo.mode, level, config.rounds);
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
        return MathWorkshop.calculation('Desfă numărul ' + number + ' în zeci și unități.',
          [{ label: 'Cât ' + (tens === 1 ? 'face o zece' : 'fac ' + tens + ' zeci') + '?', answer: tens * 10 }, { label: 'Câte unități mai sunt?', answer: units }],
          number + ' = ' + tens * 10 + ' + ' + units + '. Cifra zecilor arată grupe de câte zece.',
          'Nu confunda cifra scrisă cu valoarea ei. Construiește grupele de zece.', { numberCard: String(number) });
      }
      if (index % 3 === 2) {
        const tens = this.randInt(1, [2, 5, 8][level]), units = this.randInt(10, 19), number = tens * 10 + units;
        return MathWorkshop.calculation('Ai ' + this.quantity(tens, 'grupă de câte zece', 'grupe de câte zece') + ' și ' + units + ' unități. Fă încă o grupă de zece din unități.',
          [{ label: 'Câte grupe de zece ai acum?', answer: tens + 1 }, { label: 'Câte unități au rămas?', answer: units - 10 }],
          units + ' unități = un grup de zece și ' + this.quantity(units - 10, 'unitate separată', 'unități separate') + '. Totalul rămâne ' + number + '.',
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
        ? 'Pornește de la ' + initial + '. Adaugă ' + this.quantity(added, 'unitate', 'unități') + '. Construiește numărul nou din zeci și unități.'
        : exchange
        ? 'Ai ' + this.quantity(shownTens, 'grup de zece', 'grupuri de zece') + ' și ' + this.quantity(shownUnits, 'unitate separată', 'unități separate') + '. Fă un grup de zece din unități.'
        : 'Construiește numărul ' + number + ' din zeci și unități.',
      number, tens, units, shownTens, shownUnits, explain: (level === 2 ? initial + ' + ' + added + ' = ' + number + '. ' : '') + number + ' = ' + tens * 10 + ' + ' + units + '. Zece unități fac un grup de zece.',
      hint: 'Fă întâi grupurile de câte 10. Apoi numără ce a rămas.' };
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
      const round = this.choice(elapsed ? 'Ce oră va fi peste ' + this.quantity(elapsed, 'minut', 'minute') + ' față de ceasul afișat?' : 'Ce oră arată ceasul?',
        options, options.indexOf(answer), elapsed ? 'Pornim de la ' + this.time(hour, minutes) + ' și adăugăm ' + this.quantity(elapsed, 'minut', 'minute') + ': ' + answer + '.' :
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
      // ——— lecții adăugate în noiembrie 2026: înmulțire, împărțire, numere până la 1000, comparare, bani, tabele ———
      if (mode === 'multiply') {
        const things = this.pick([['🍎', 'măr', 'mere', 'farfurie', 'farfurii'], ['⭐', 'stea', 'stele', 'cutie', 'cutii'], ['🌷', 'lalea', 'lalele', 'vază', 'vaze'], ['🖍️', 'creion', 'creioane', 'pahar', 'pahare']]);
        const groups = this.randInt(2, level === 0 ? 4 : level === 1 ? 5 : 9), each = level === 0 ? this.randInt(2, 4) : level === 1 ? this.pick([2, 3, 4, 5, 10]) : this.randInt(2, 9);
        const total = groups * each, sum = Array(groups).fill(each).join(' + ') + ' = ' + total;
        if (level === 0) return this.numeric('Sunt ' + this.quantity(groups, things[3], things[4]) + ' cu câte ' + this.quantity(each, things[1], things[2]) + '. Câte ' + things[2] + ' sunt în total?', total,
          sum + '. Adunăm același număr de ' + groups + ' ori.', 'Numără grupele din desen. Adună numărul din fiecare grupă.', { scene: Array(groups).fill(things[0].repeat(each)).join('   ') });
        if (level === 2 && index % 3 === 2) return this.numeric('Ce număr lipsește? □ × ' + each + ' = ' + total, groups,
          'Adunăm ' + each + ' până ajungem la ' + total + ': ' + sum + '. Am adunat de ' + groups + ' ori.', 'Numără din ' + each + ' în ' + each + ' până la ' + total + '. De câte ori ai numărat?');
        if (index % 2 === 1) return this.numeric('Sunt ' + this.quantity(groups, things[3], things[4]) + ' cu câte ' + this.quantity(each, things[1], things[2]) + '. Câte ' + things[2] + ' sunt în total?', total,
          groups + ' × ' + each + ' = ' + total + ', adică ' + sum + '.', 'Scrie o adunare cu ' + groups + ' numere la fel.');
        return this.numeric('Cât face ' + groups + ' × ' + each + '?', total, groups + ' × ' + each + ' înseamnă ' + each + ' adunat de ' + groups + ' ori: ' + sum + '.', 'Numără din ' + each + ' în ' + each + ', de ' + groups + ' ori.');
      }
      if (mode === 'divide') {
        const each = this.randInt(2, level === 0 ? 4 : level === 1 ? 5 : 9), groups = level === 0 ? 2 : level === 1 ? this.pick([2, 3, 4, 5]) : this.randInt(2, 9);
        const total = each * groups, check = Array(groups).fill(each).join(' + ') + ' = ' + total;
        if (level === 0) return this.numeric('Împarți ' + total + ' bomboane la ' + groups + ' copii. Fiecare primește la fel. Câte bomboane primește un copil?', each,
          each + ' + ' + each + ' = ' + total + ', deci fiecare copil primește ' + each + '.', 'Dă câte o bomboană fiecărui copil, pe rând, până se termină.', { scene: '🍬'.repeat(total) + '   →   ' + '🧒'.repeat(groups) });
        if (index % 2 === 1) return this.numeric('Ai ' + this.quantity(total, 'floare', 'flori') + '. Faci buchete de câte ' + each + '. Câte buchete faci?', groups,
          'Luăm câte ' + each + ' până se termină florile: ' + Array(groups).fill(each).join(' + ') + ' = ' + total + '. Sunt ' + groups + ' buchete.', 'Scade ' + each + ' de mai multe ori, până ajungi la 0. Numără scăderile.');
        return this.numeric('Cât face ' + total + ' : ' + groups + '?', each, 'Căutăm numărul care, adunat de ' + groups + ' ori, dă ' + total + ': ' + check + '. Proba: ' + groups + ' × ' + each + ' = ' + total + '.',
          'Împarte ' + this.quantity(total, 'bilă', 'bile') + ' în ' + groups + ' grămezi egale. Câte sunt într-o grămadă?');
      }
      if (mode === 'thousand') {
        const h = this.randInt(1, level === 0 && index % 3 === 1 ? 7 : 9), t = this.randInt(0, 9), u = this.randInt(0, 9), n = h * 100 + t * 10 + u;
        if (level === 0) {
          if (index % 3 === 0) return this.numeric(this.quantity(h, 'sută', 'sute') + ', ' + this.quantity(t, 'zece', 'zeci') + ' și ' + this.quantity(u, 'unitate', 'unități') + '. Ce număr este?', n,
            h * 100 + ' + ' + t * 10 + ' + ' + u + ' = ' + n + '.', 'Scrie cifrele pe rând: sutele, apoi zecile, apoi unitățile.');
          if (index % 3 === 1) return this.numeric('Numărăm din 100 în 100: ' + [h, h + 1, h + 2].map(x => x * 100).join(', ') + ', … Ce urmează?', (h + 3) * 100,
            'Adăugăm câte o sută: după ' + (h + 2) * 100 + ' vine ' + (h + 3) * 100 + '.', 'Numără sutele ca pe degete: una, două, trei…');
          return this.numeric('Câte sute are numărul ' + n + '?', h, 'În ' + n + ', prima cifră arată sutele: ' + h + '.', 'La un număr cu trei cifre, sutele sunt scrise primele.');
        }
        if (level === 1) {
          if (index % 3 === 0) return this.numeric('Ce număr vine imediat după ' + (n === 999 ? 998 : n) + '?', (n === 999 ? 998 : n) + 1, 'Adăugăm 1: ' + ((n === 999 ? 998 : n) + 1) + '.', 'Adaugă o unitate. Dacă unitățile sunt 9, se face o zece nouă.');
          if (index % 3 === 1) { const base = this.randInt(1, 7) * 100 + this.randInt(0, 9) * 10, add = this.randInt(1, 2) * 100; return this.numeric('Cât face ' + base + ' + ' + add + '?', base + add, 'Adunăm doar sutele: ' + base + ' + ' + add + ' = ' + (base + add) + '. Zecile rămân la fel.', 'Câte sute are primul număr? Mai adaugă sutele din al doilea.'); }
          return this.numeric('Ce număr vine imediat înaintea lui ' + (h * 100 + t * 10) + '?', h * 100 + t * 10 - 1, 'Scădem 1: ' + (h * 100 + t * 10 - 1) + '.', 'Numără înapoi cu un pas.');
        }
        const a = this.randInt(1, 4) * 100 + this.randInt(1, 4) * 10 + this.randInt(1, 4), b = this.randInt(1, 4) * 100 + this.randInt(1, 5) * 10 + this.randInt(1, 5);
        if (index % 2 === 0) return this.numeric('Cât face ' + a + ' + ' + b + '?', a + b, 'Adunăm unitățile, apoi zecile, apoi sutele: ' + a + ' + ' + b + ' = ' + (a + b) + '.', 'Scrie numerele unul sub altul. Începe cu unitățile.');
        const big = a + b; return this.numeric('Cât face ' + big + ' − ' + a + '?', b, 'Scădem unitățile, zecile și sutele: ' + big + ' − ' + a + ' = ' + b + '. Proba: ' + b + ' + ' + a + ' = ' + big + '.', 'Scrie numerele unul sub altul. Începe cu unitățile.');
      }
      if (mode === 'compare') {
        const max = level === 2 ? 999 : 99, nums = this.draw(Array.from({ length: 40 }, () => this.randInt(level === 2 ? 100 : 10, max)).filter((x, i, all) => all.indexOf(x) === i), 3);
        const sorted = nums.slice().sort((x, y) => x - y), text = nums.map(String);
        if (level === 0) return index % 2 ? this.choice('Care număr este cel mai mic?', text, nums.indexOf(sorted[0]), sorted[0] + ' este cel mai mic. Ne uităm întâi la zeci, apoi la unități.', 'Compară întâi zecile. Dacă sunt la fel, compară unitățile.') :
          this.choice('Care număr este cel mai mare?', text, nums.indexOf(sorted[2]), sorted[2] + ' este cel mai mare. Ne uităm întâi la zeci, apoi la unități.', 'Compară întâi zecile. Dacă sunt la fel, compară unitățile.');
        if (level === 1 && index % 3 === 0) { const even = this.randInt(5, 49) * 2, opts = this.shuffle([even, even + 1, even - 1]).map(String); return this.choice('Care număr este par?', opts, opts.indexOf(String(even)), even + ' este par: se poate împărți în două grupe egale. Numerele pare se termină în 0, 2, 4, 6 sau 8.', 'Uită-te la ultima cifră.'); }
        if (level === 1 && index % 3 === 1) { const n = this.randInt(1, 8) * 10 + this.pick([1, 2, 3, 4, 6, 7, 8, 9]), r = Math.round(n / 10) * 10, opts = this.shuffle([r, r === Math.floor(n / 10) * 10 ? r + 10 : r - 10, n]).map(String); return this.choice('Care zece întreagă este cea mai aproape de ' + n + '?', opts, opts.indexOf(String(r)), n + ' este mai aproape de ' + r + '. Așa rotunjim la zeci.', 'Între ce zeci stă numărul? De care este mai aproape?'); }
        const up = sorted.join(', '), wrong1 = sorted.slice().reverse().join(', '), wrong2 = [sorted[1], sorted[0], sorted[2]].join(', '), opts = this.shuffle([up, wrong1, wrong2]);
        return this.choice('În ce șir sunt numerele de la cel mai mic la cel mai mare?', opts, opts.indexOf(up), 'De la mic la mare: ' + up + '.', level === 2 ? 'Compară întâi sutele, apoi zecile, apoi unitățile.' : 'Caută întâi cel mai mic număr.');
      }
      if (mode === 'money') {
        const notes = level === 0 ? [1, 5, 10] : [1, 5, 10, 50];
        if (level === 2 && index % 3 === 0) { const a = this.randInt(2, 6) * 5, b = this.randInt(1, 4) * 5; return this.numeric('Ai 100 de lei. Cumperi o carte de ' + this.quantity(a, 'leu', 'lei') + ' și un joc de ' + this.quantity(b, 'leu', 'lei') + '. Câți lei îți rămân?', 100 - a - b, a + ' + ' + b + ' = ' + (a + b) + '. Apoi 100 − ' + (a + b) + ' = ' + (100 - a - b) + '.', 'Află întâi cât costă amândouă. Apoi scade din 100.'); }
        if (level === 2 && index % 3 === 1) { const k = this.randInt(2, 9); return this.numeric('Câte bancnote de 10 lei fac ' + k * 10 + ' de lei?', k, Array(k).fill(10).join(' + ') + ' = ' + k * 10 + '. Sunt ' + k + ' bancnote.', 'Numără din 10 în 10 până la ' + k * 10 + '.'); }
        if (level === 2) { const k = this.randInt(2, 5); return this.numeric('Un leu are 100 de bani. Câți bani au ' + k + ' lei?', k * 100, Array(k).fill(100).join(' + ') + ' = ' + k * 100 + ' de bani.', 'Adună 100 pentru fiecare leu.'); }
        if (level === 1 && index % 3 === 2) { const price = this.randInt(2, 8) * 5; return this.numeric('Plătești cu o bancnotă de 50 de lei o jucărie de ' + this.quantity(price, 'leu', 'lei') + '. Ce rest primești?', 50 - price, '50 − ' + price + ' = ' + this.quantity(50 - price, 'leu', 'lei') + '.', 'Restul este ce rămâne din bani după ce plătești.'); }
        const picked = Array.from({ length: level === 0 ? 2 : 3 }, () => this.pick(notes)).sort((x, y) => y - x), total = picked.reduce((s, x) => s + x, 0);
        return this.numeric('Câți lei sunt aici?', total, picked.join(' + ') + ' = ' + this.quantity(total, 'leu', 'lei') + '.', 'Începe cu bancnota cea mai mare. Adună pe rând celelalte.', { scene: picked.map(x => '💵 ' + this.quantity(x, 'leu', 'lei')).join('   +   ') });
      }
      if (mode === 'data') {
        const sets = [[['🍎', 'mere'], ['🍐', 'pere'], ['🍌', 'banane']], [['🐶', 'câini'], ['🐱', 'pisici'], ['🐟', 'pești']], [['⚽', 'mingi'], ['🚗', 'mașinuțe'], ['🎈', 'baloane']], [['☀️', 'zile cu soare'], ['🌧️', 'zile cu ploaie'], ['☁️', 'zile cu nori']]];
        const set = this.pick(sets), counts = this.draw([1, 2, 3, 4, 5, 6, 7, 8].slice(0, level === 0 ? 5 : 8), 3);
        const passage = set.map((row, i) => row[1] + ': ' + row[0].repeat(counts[i]) + '  (' + counts[i] + ')').join('\n'), names = set.map(row => row[1]);
        const most = counts.indexOf(Math.max.apply(null, counts)), least = counts.indexOf(Math.min.apply(null, counts));
        const hint = 'Numără desenele de pe fiecare rând.';
        if (level === 0) return index % 2 ? this.numeric('Câte desene sunt pe rândul „' + names[0] + '”?', counts[0], 'Pe rândul „' + names[0] + '” ' + (counts[0] === 1 ? 'este ' : 'sunt ') + this.quantity(counts[0], 'desen', 'desene') + '.', hint, { passage }) :
          this.choice('Din ce sunt cele mai multe?', names, most, 'Rândul „' + names[most] + '” este cel mai lung: ' + counts[most] + '.', 'Caută rândul cel mai lung.', { passage });
        if (level === 1) return index % 2 ? this.choice('Din ce sunt cele mai puține?', names, least, 'Rândul „' + names[least] + '” este cel mai scurt: ' + counts[least] + '.', 'Caută rândul cel mai scurt.', { passage }) :
          this.numeric('Câte desene are în plus rândul „' + names[most] + '” față de rândul „' + names[least] + '”?', counts[most] - counts[least], counts[most] + ' − ' + counts[least] + ' = ' + (counts[most] - counts[least]) + '.', 'Numără cele două rânduri. Apoi scade numărul mic din cel mare.', { passage });
        return index % 2 ? this.numeric('Câte sunt în total, pe toate rândurile?', counts[0] + counts[1] + counts[2], counts.join(' + ') + ' = ' + (counts[0] + counts[1] + counts[2]) + '.', 'Adună numerele de pe cele trei rânduri.', { passage }) :
          this.numeric('Mai adaugi 3 la rândul „' + names[least] + '”. Câte sunt acum pe acest rând?', counts[least] + 3, counts[least] + ' + 3 = ' + (counts[least] + 3) + '.', 'Găsește rândul. Numără, apoi adaugă 3.', { passage });
      }
      if (mode === 'nature') {
        const insects = this.randInt(1, level + 2), birds = this.randInt(1, level + 2);
        if (level === 0) return this.numeric('Pe ramură vezi ' + this.quantity(insects, 'pasăre', 'păsări') + '. Apoi mai ' + (birds === 1 ? 'vine ' : 'vin ') + this.quantity(birds, 'pasăre', 'păsări') + '. Câte păsări sunt în total?', insects + birds,
          insects + ' + ' + birds + ' = ' + (insects + birds) + '.', 'Unește cele două grupe de păsări.');
        if (level === 1) return this.numeric('Vezi ' + this.quantity(insects, 'fluture', 'fluturi') + '. Fiecare are 4 aripi. Câte aripi au în total?', insects * 4,
          'Adunăm câte 4 pentru fiecare fluture: ' + (insects === 1 ? '4' : Array(insects).fill(4).join(' + ') + ' = ' + insects * 4) + '.', 'Desenează patru aripi pentru fiecare fluture.');
        return this.numeric('Vezi ' + this.quantity(insects, 'insectă', 'insecte') + ', cu 6 picioare fiecare, și ' + this.quantity(birds, 'pasăre', 'păsări') + ', cu 2 picioare fiecare. Câte picioare sunt în total?', insects * 6 + birds * 2,
          'Insecte: ' + Array(insects).fill(6).join(' + ') + ' = ' + insects * 6 + '. Păsări: ' + Array(birds).fill(2).join(' + ') + ' = ' + birds * 2 + '. Împreună: ' + (insects * 6 + birds * 2) + '.', 'Numără întâi picioarele insectelor. Apoi pe ale păsărilor. La final adună.');
      }
    }
    if (type === 'matrix') return this.matrixRound(mode, level, index);
    if (type === 'robot') return this.robotRound(mode, level, index);
    throw new Error('Generator indisponibil: ' + type);
  },
  time(hour, minute) { return hour + ':' + String(minute).padStart(2, '0'); },

  matrixRound(mode, level, index) {
    if (mode === 'sequence' || mode === 'growth') {
      // Descopăr: din 2 în 2 sau din 5 în 5; Exersez: din 10 în 10 sau înapoi
      const back = level === 1 && index % 2 === 1;
      const step = level === 0 ? this.pick([2, 5]) : back ? this.pick([2, 3]) : this.pick([3, 10]);
      const start = back ? this.randInt(20, 40) : this.randInt(1, level === 0 ? 10 : 30), sign = back ? -1 : 1;
      const values = [0, 1, 2].map(i => start + sign * i * step), next = start + sign * 3 * step;
      if (level < 2) return this.numeric('Continuă șirul: ' + values.join(', ') + ', ?', next,
        (back ? 'Scădem de fiecare dată ' : 'Adăugăm de fiecare dată ') + step + '. Urmează ' + next + '.', 'Cu cât se schimbă de la un număr la următorul? Crește sau scade?');
      const a = this.randInt(1, 4), seq = [a, a + 1, a + 3, a + 6];
      return this.numeric('Salturile cresc: +1, +2, +3. Urmează +4: ' + seq.join(', ') + ', ?', a + 10,
        'Fiecare salt e mai mare cu 1. Ultimul număr este ' + (a + 6) + ', apoi adăugăm 4: ' + (a + 10) + '.', 'Saltul nu e mereu la fel: și el crește cu 1.');
    }
    // la fiecare rundă: alte forme și culori (toate se acordă la masculin: „romb roșu”)
    const size = level === 0 ? 2 : 3;
    const palette = this.draw(['roșu', 'albastru', 'verde', 'galben', 'mov', 'portocaliu', 'negru'], size + 1);
    const forms = this.draw(['cerc', 'triunghi', 'pătrat', 'romb', 'dreptunghi', 'oval'], size), colors = palette.slice(0, size), changed = palette[size];
    const row = index % size, col = this.randInt(0, size - 1);
    const label = forms[row] + ' ' + colors[col];
    const alternatives = [label, forms[(row + 1) % size] + ' ' + colors[col], forms[row] + ' ' + colors[(col + 1) % size]];
    if (level < 2) return this.choice('Rândul cere „' + forms[row] + '”, coloana cere „' + colors[col] + '”. Ce piesă alegi?',
      alternatives, 0, 'Combinăm forma rândului cu culoarea coloanei: ' + label + '.', 'Piesa trebuie să respecte ambele proprietăți.',
      { matrix: { forms, colors, row, col } });
    return this.choice('Piesa care lipsește stă pe rândul „' + forms[row] + '” și coloana „' + colors[col] + '”. O vopsim în ' + changed + '. Ce piesă avem acum?',
      [forms[row] + ' ' + changed, label, forms[(row + 1) % size] + ' ' + changed], 0,
      'Piesa care lipsea era ' + label + '. Am schimbat doar culoarea. Forma rămâne ' + forms[row] + '.',
      'Găsește forma și culoarea de la locul gol. Apoi schimbă doar culoarea.',
      { matrix: { forms, colors, row, col } });
  },
  robotRound(mode, level, index) {
    const size = [3, 4, 5][level];
    const start = { x: 0, y: 0 };
    // la primul nivel steaua poate fi oriunde, la cel puțin doi pași; cu obstacole rămâne pe ultimul rând
    let goal = { x: this.randInt(1, size - 1), y: size - 1 };
    // în lecția despre repetări, cel puțin o direcție cere doi pași, ca repetarea să aibă rost
    if (level === 0) do { goal = { x: this.randInt(0, size - 1), y: this.randInt(0, size - 1) }; } while (goal.x + goal.y < 2 || (mode === 'repeat' && Math.max(goal.x, goal.y) < 2));
    const blocked = level === 0 ? [] : [{ x: 1, y: 0 }, { x: this.randInt(1, size - 1), y: this.randInt(1, size - 2) }];
    return { kind: 'robot', prompt: mode === 'debug' ? 'Repară programul de probă și du robotul la stea. Rulează pas cu pas.' :
      mode === 'repeat' ? 'Folosește numărul de repetări pentru comenzi. Du robotul la stea fără să atingi obstacolele.' :
        'Construiește un traseu de la robot la stea. Obstacolele nu pot fi traversate.',
    size, start, goal, blocked, repeat: mode === 'repeat', debug: mode === 'debug', maxCommands: size * size,
    explain: 'Bravo! Robotul a ocolit obstacolele și a ajuns la stea. Pot exista și alte drumuri bune.',
    hint: level === 0 ? 'Numără câte pătrățele are robotul de mers în jos și câte spre dreapta. Ținta este la rândul ' + (goal.y + 1) + ', coloana ' + (goal.x + 1) + '.' :
      'Un traseu sigur: mergi până jos pe prima coloană, apoi până la stea pe ultimul rând. Ținta este la rândul ' + size + ', coloana ' + (goal.x + 1) + '.' };
  },

  wordRounds(mode, level, count) {
    if (mode === 'syllables') {
      const words = [
        [['ca', 'me', 'ră'], ['pă', 'pu', 'șă'], ['pi', 'si', 'că'], ['ba', 'na', 'nă'], ['ro', 'chi', 'ță'], ['ma', 'și', 'nă'], ['al', 'bi', 'nă'], ['pă', 'du', 're'], ['gră', 'di', 'nă'], ['mo', 'ne', 'dă']],
        [['fe', 'reas', 'tră'], ['flu', 'tu', 're'], ['stră', 'du', 'ță'], ['cio', 'co', 'la', 'tă'], ['a', 'ni', 'ma', 'le'], ['po', 'ves', 'ti', 're'], ['pră', 'ji', 'tu', 'ră'], ['te', 'le', 'vi', 'zor'], ['bi', 'ci', 'cle', 'tă'], ['pri', 'mă', 'va', 'ră']],
        [['bi', 'bli', 'o', 'te', 'că'], ['că', 'lă', 'to', 'ri', 'e'], ['în', 'ghe', 'ța', 'tă'], ['ca', 'len', 'da', 'rul'], ['lo', 'co', 'mo', 'ti', 'vă'], ['e', 'le', 'fan', 'tul'], ['cu', 'ri', 'o', 'zi', 'ta', 'te'], ['mul', 'țu', 'mi', 're'], ['în', 'vă', 'ță', 'toa', 're'], ['bu', 'cu', 'ri', 'e']]
      ][level];
      return this.draw(words, count).map(tokens => ({ kind: 'arrange', prompt: 'Construiește cuvântul „' + tokens.join('') + '” din silabe.', tokens,
        explain: tokens.join('-') + ': ' + tokens.length + ' silabe. Citim silabele împreună pentru a verifica cuvântul.',
        hint: 'Spune cuvântul întreg, apoi rar. Bate o dată din palme pentru fiecare silabă: de exemplu, „ma-mă”.' }));
    }
    const words = [
      [['m_r', 'ă', 'măr'], ['p_pușă', 'ă', 'păpușă'], ['p_ine', 'â', 'pâine'], ['c_ine', 'â', 'câine'], ['cas_', 'ă', 'casă'], ['m_nă', 'â', 'mână'], ['fat_', 'ă', 'fată'], ['p_r', 'ă', 'păr'], ['c_mp', 'â', 'câmp'], ['v_nt', 'â', 'vânt']],
      [['_not', 'î', 'înot'], ['r_u', 'â', 'râu'], ['m_ncare', 'â', 'mâncare'], ['_nger', 'î', 'înger'], ['_nghețată', 'î', 'înghețată'], ['_nalt', 'î', 'înalt'], ['_mi place', 'î', 'îmi place'], ['c_ntec', 'â', 'cântec'], ['gr_u', 'â', 'grâu'], ['l_ngă', 'â', 'lângă']],
      [['a cobor_', 'î', 'a coborî'], ['ne_nțeles', 'î', 'neînțeles'], ['hotăr_', 'î', 'hotărî'], ['a ur_', 'î', 'a urî'], ['re_ntoarcere', 'î', 'reîntoarcere'], ['ne_ncetat', 'î', 'neîncetat'], ['a izvor_', 'î', 'a izvorî'], ['m_ine', 'â', 'mâine'], ['c_știg', 'â', 'câștig'], ['p_dure', 'ă', 'pădure']]
    ][level];
    return this.draw(words, count).map(item => this.choice('Completează: ' + item[0], ['ă', 'â', 'î'], ['ă', 'â', 'î'].indexOf(item[1]),
      'Forma corectă este „' + item[2] + '”. ' + this.diacriticRule(item),
      'Ă notează alt sunet. Pentru â/î verifică forma și poziția, nu lungimea sunetului.'));
  },
  writingRounds(level) {
    return [{
      kind: 'writing',
      prompt: this.pick([
        ['Scrie un enunț despre un personaj și un loc.', 'Scrie un enunț despre animalul tău preferat și locul unde trăiește.', 'Scrie un enunț despre ce faci în parc.'],
        ['Scrie cel puțin două enunțuri: o întâmplare și urmarea ei.', 'Scrie două enunțuri despre o zi cu ploaie: ce s-a întâmplat și ce ai făcut.', 'Scrie două enunțuri despre un cadou: ce ai primit și cum te-ai simțit.'],
        ['Scrie cel puțin trei enunțuri: început, întâmplare, încheiere.', 'Scrie o poveste de trei enunțuri despre un robot care se rătăcește.', 'Scrie o poveste de trei enunțuri despre o excursie la munte.']
      ][level]),
      minimum: [1, 2, 3][level], minWords: [4, 8, 15][level],
      checklist: ['Se înțelege ce am vrut să spun.', 'Se înțelege despre cine am scris.', 'Am verificat litera mare și semnul de la final.'],
      hint: 'Spune mai întâi cu voce tare ce vrei să scrii. Începe cu cine și unde, de exemplu „Mara era în parc.”, apoi adaugă ce s-a întâmplat.',
      explain: 'Ai scris și ai recitit. Jocul verifică doar câteva reguli de scriere. Un adult te poate ajuta să vezi dacă textul are sens și este scris corect.',
      evaluation: 'self'
    }];
  },
  // explicația potrivită cuvântului: ă (alt sunet), î la început, î la final/după prefix, â în interior
  diacriticRule(item) {
    const position = item[0].replace(/^a /, '').indexOf('_'), word = item[0].replace(/^a /, '');
    if (item[1] === 'ă') return 'Ă notează alt sunet decât â și î: ascultă „măr” și „râu”.';
    if (item[1] === 'â') return 'În interiorul cuvântului scriem â.';
    if (position === 0) return 'La începutul cuvântului scriem î.';
    if (position === word.length - 1) return 'La sfârșitul cuvântului scriem î.';
    return 'Cuvântul s-a format adăugând un început (ne-, re-) la un cuvânt care începe cu î, de aceea păstrăm î.';
  },
  readingRounds(mode, level) {
    const passages = {
      park: [
        [{ text: 'Lia merge în parc cu bunicul. Ei iau o minge albastră. În parc, Lia o împrumută lui Dan.', questions: [
          Q('Cu cine merge Lia în parc?', ['Cu bunicul', 'Cu Dan', 'Singură'], 0, 'Prima propoziție spune că Lia merge cu bunicul.'),
          Q('Ce culoare are mingea?', ['Albastră', 'Roșie', 'Nu este precizat'], 0, 'Textul spune „o minge albastră”.')
        ] },
        { text: 'Tudor are un cățel negru. Îl cheamă Bobi. În fiecare dimineață, Tudor îi pune apă proaspătă.', questions: [
          Q('Ce culoare are cățelul?', ['Negru', 'Alb', 'Maro'], 0, 'Textul spune „un cățel negru”.'),
          Q('Ce face Tudor în fiecare dimineață?', ['Îi pune apă', 'Îl spală', 'Îl plimbă'], 0, 'Ultima propoziție spune că îi pune apă proaspătă.')
        ] },
        { text: 'Ioana și Matei fac o prăjitură. Ioana bate ouăle. Matei pune făina. Mama aprinde cuptorul.', questions: [
          Q('Cine pune făina?', ['Matei', 'Ioana', 'Mama'], 0, 'Textul spune „Matei pune făina”.'),
          Q('Ce pregătesc copiii?', ['O prăjitură', 'O ciorbă', 'O salată'], 0, 'Prima propoziție spune că fac o prăjitură.')
        ] },
        { text: 'Este iarnă. Afară ninge. Radu își ia fularul și mănușile și iese la săniuș.', questions: [
          Q('Ce anotimp este?', ['Iarna', 'Vara', 'Toamna'], 0, 'Prima propoziție spune „Este iarnă”.'),
          Q('De ce își ia Radu mănușile?', ['Fiindcă afară ninge', 'Fiindcă merge la școală', 'Fiindcă afară plouă'], 0, 'Ninge, iar Radu iese la săniuș: mănușile îl țin de cald.')
        ] }],
        [{ text: 'Mara pune o carte în rucsac. Cerul este acoperit, iar la radio se anunță ploaie. Ea adaugă o umbrelă. La bibliotecă, lasă cartea pe masa de returnare.', questions: [
          Q('De ce ia Mara o umbrelă?', ['Pentru că se anunță ploaie', 'Ca să returneze cartea', 'Fiindcă este deja la bibliotecă'], 0, 'Anunțul despre ploaie susține alegerea umbrelei.'),
          Q('Unde duce cartea?', ['La bibliotecă', 'La magazin', 'La școală'], 0, 'Ultima propoziție numește biblioteca.')
        ] },
        { text: 'Andrei vrea să planteze o floare. Sapă o groapă mică, pune sămânța și o acoperă cu pământ. Apoi o udă. După două săptămâni, apare o frunză verde.', questions: [
          Q('Ce face Andrei după ce acoperă sămânța?', ['O udă', 'Sapă o groapă', 'Culege floarea'], 0, 'Textul spune „Apoi o udă”, după ce acoperă sămânța.'),
          Q('Cât timp trece până apare frunza?', ['Două săptămâni', 'O zi', 'Un an'], 0, 'Ultima propoziție spune „După două săptămâni”.')
        ] },
        { text: 'Bunica i-a dat Sarei un coș. Sara a cules zece mere din livadă. Pe drum, i-a dat trei mere vecinului. Acasă, a pus pe masă merele rămase.', questions: [
          Q('De unde a cules Sara merele?', ['Din livadă', 'Din piață', 'Din grădina vecinului'], 0, 'Textul spune „din livadă”.'),
          Q('Câte mere a pus Sara pe masă?', ['Șapte', 'Zece', 'Trei'], 0, 'A cules zece și a dat trei: 10 − 3 = 7.')
        ] }],
        [{ text: 'La clubul de lectură, Radu propune să aleagă cartea prin vot. Ina observă că un coleg nu vede bine literele mici. Grupul caută o ediție cu litere mari și o variantă audio. Abia apoi compară titlurile disponibile pentru toți.', questions: [
          Q('De ce nu votează imediat?', ['Verifică mai întâi accesul tuturor', 'Nu vor să citească', 'Nu există nicio carte'], 0, 'Grupul caută mai întâi formate pe care le pot folosi toți.'),
          Q('Ce concluzie este susținută de text?', ['O alegere bună ține cont și de accesibilitate', 'Votul este întotdeauna o alegere greșită', 'Toți copiii din club preferă cărțile audio'], 0, 'Textul nu respinge votul, ci arată pregătirea unei alegeri incluzive.')
        ] },
        { text: 'Afară ploua. Victor a ajuns la școală ud. Avea ghiozdanul în mână, dar umbrela rămăsese acasă, lângă ușă. Doamna învățătoare i-a dat un prosop.', questions: [
          Q('De ce a ajuns Victor ud?', ['Ploua și nu avea umbrela', 'A sărit într-un lac', 'S-a udat la cișmea'], 0, 'Textul spune că ploua și că umbrela rămăsese acasă.'),
          Q('Ce a făcut învățătoarea?', ['I-a dat un prosop', 'L-a trimis acasă', 'I-a adus umbrela'], 0, 'Ultima propoziție spune că i-a dat un prosop.')
        ] },
        { text: 'Pe banca din parc stau o carte și o sticlă de apă. Lângă bancă, o fetiță se uită în jur îngrijorată. Ea strigă: „Cine a văzut cartea mea cu dinozauri?”', questions: [
          Q('Ce caută probabil fetița?', ['Cartea de pe bancă', 'O sticlă de apă', 'O jucărie pierdută'], 0, 'Fetița întreabă de cartea ei, iar pe bancă stă o carte.'),
          Q('Ce cuvânt arată cum se simte fetița?', ['îngrijorată', 'bancă', 'strigă'], 0, '„Îngrijorată” spune ce simte fetița.')
        ] }]
      ],
      long: [
        [{ text: 'Ariciul Țepi\n\nEra o dimineață de toamnă. Ariciul Țepi căuta mere în livadă. A găsit un măr roșu sub un copac. L-a rostogolit și mărul i s-a prins în țepi. Pe drum s-a întâlnit cu iepurașul Urechilă. Iepurașului îi era foame. Țepi a împărțit mărul în două. Au mâncat împreună și au râs. De atunci, cei doi sunt prieteni buni.', questions: [
          Q('Ce căuta ariciul în livadă?', ['Mere', 'Nuci', 'Ciuperci'], 0, 'Textul spune că Țepi căuta mere.'),
          Q('În ce anotimp se petrece povestea?', ['Toamna', 'Iarna', 'Vara'], 0, 'Prima propoziție spune „o dimineață de toamnă”.'),
          Q('Cu cine s-a întâlnit Țepi?', ['Cu iepurașul Urechilă', 'Cu o vulpe', 'Cu un urs'], 0, 'Pe drum s-a întâlnit cu iepurașul Urechilă.'),
          Q('Ce a făcut Țepi cu mărul?', ['L-a împărțit în două', 'L-a ascuns', 'L-a mâncat singur'], 0, 'Țepi a împărțit mărul în două, pentru el și pentru iepuraș.')
        ] },
        { text: 'Barca de hârtie\n\nMara a făcut o barcă din hârtie albastră. A pus-o într-o băltoacă din curte. Vântul a suflat ușor și barca a pornit. Fratele ei, Luca, a făcut și el o barcă, dar galbenă. Barca lui Luca s-a răsturnat. Mara l-a învățat să îndoaie mai bine hârtia. A doua barcă a plutit foarte bine. Copiii au făcut o cursă până la marginea băltoacei.', questions: [
          Q('Ce culoare avea barca Marei?', ['Albastră', 'Galbenă', 'Roșie'], 0, 'Mara a făcut o barcă din hârtie albastră.'),
          Q('Unde au pus copiii bărcile?', ['Într-o băltoacă', 'Într-un râu', 'În cadă'], 0, 'Barca a fost pusă într-o băltoacă din curte.'),
          Q('Ce s-a întâmplat cu prima barcă a lui Luca?', ['S-a răsturnat', 'A zburat', 'A câștigat cursa'], 0, 'Textul spune că barca lui Luca s-a răsturnat.'),
          Q('Cum l-a ajutat Mara pe Luca?', ['L-a învățat să îndoaie hârtia', 'I-a dat barca ei', 'A râs de el'], 0, 'Mara l-a învățat să îndoaie mai bine hârtia.')
        ] }],
        [{ text: 'Cheia pierdută\n\nBunicul Ion nu-și găsea cheia de la magazie. A căutat-o în buzunare, pe masă și sub pernă. Nepoata lui, Ilinca, s-a gândit puțin. Ea și-a amintit că dimineață bunicul udase florile. Ilinca a alergat în grădină. Lângă stropitoare, în iarbă, strălucea ceva. Era cheia! Bunicul a zâmbit și i-a mulțumit. Apoi au deschis magazia împreună și au scos sania veche. „O reparăm până vine zăpada”, a spus bunicul.', questions: [
          Q('Ce nu găsea bunicul?', ['Cheia de la magazie', 'Stropitoarea de flori', 'Sania cea veche'], 0, 'Bunicul nu-și găsea cheia de la magazie.'),
          Q('Unde era cheia?', ['În iarbă, lângă stropitoare', 'Sub perna din cameră', 'Pe masa din bucătărie'], 0, 'Cheia strălucea în iarbă, lângă stropitoare.'),
          Q('De ce a căutat Ilinca în grădină?', ['Bunicul udase florile dimineață', 'Acolo se juca ea', 'Acolo era sania'], 0, 'Ilinca și-a amintit că bunicul udase florile, deci fusese în grădină.'),
          Q('Ce vor să facă bunicul și Ilinca cu sania?', ['Să o repare', 'Să o vândă', 'Să o arunce'], 0, 'Bunicul spune: „O reparăm până vine zăpada”.')
        ] },
        { text: 'Albinele\n\nAlbinele sunt insecte mici și harnice. Ele trăiesc împreună într-un stup. Într-un stup pot fi mii de albine. Fiecare are treaba ei. Unele adună nectar din flori. Altele au grijă de pui sau păzesc intrarea. Din nectar, albinele fac miere. Când zboară din floare în floare, ele duc polen. Așa ajută plantele să facă fructe și semințe. Albinele înțeapă doar când se simt în pericol.', questions: [
          Q('Unde trăiesc albinele?', ['Într-un stup', 'Într-un cuib', 'Sub pământ'], 0, 'Textul spune că albinele trăiesc împreună într-un stup.'),
          Q('Din ce fac albinele miere?', ['Din nectar', 'Din frunze', 'Din apă'], 0, 'Din nectarul florilor, albinele fac miere.'),
          Q('Cum ajută albinele plantele?', ['Duc polen între flori', 'Le udă', 'Le țin de cald'], 0, 'Ducând polen, albinele ajută plantele să facă fructe și semințe.'),
          Q('Când înțeapă albinele?', ['Când se simt în pericol', 'Când le e foame', 'Când plouă'], 0, 'Ultima propoziție spune că înțeapă doar când se simt în pericol.')
        ] }],
        [{ text: 'Ploaia\n\nPic, pic, pic, pe geam ușor,\nBate ploaia dintr-un nor.\nFrunzele se spală-n grabă,\nMelcul iese la plimbare prin iarbă.\n\nBroscuța sare-n băltoacă,\nRața după ea se joacă.\nEu privesc de la fereastră\nCum se face lumea-albastră.\n\nCând norul s-a dus departe,\nSoarele culori împarte:\nPeste casă, peste vii,\nUn curcubeu pentru copii.', questions: [
          Q('Ce fel de text este acesta?', ['O poezie', 'O rețetă', 'O scrisoare'], 0, 'Textul are versuri și rime: este o poezie.'),
          Q('Cine iese la plimbare prin iarbă?', ['Melcul', 'Broscuța', 'Rața'], 0, 'Versul spune: „Melcul iese la plimbare prin iarbă”.'),
          Q('De unde privește copilul ploaia?', ['De la fereastră', 'Din curte', 'Din băltoacă'], 0, '„Eu privesc de la fereastră”.'),
          Q('Ce apare pe cer după ploaie?', ['Un curcubeu', 'Luna', 'Zăpada'], 0, 'După ce pleacă norul, apare un curcubeu.'),
          Q('Ce cuvânt rimează cu „ușor”?', ['nor', 'geam', 'ploaie'], 0, '„Ușor” și „nor” se termină la fel.')
        ] },
        { text: 'Scrisoare de la mare\n\nDragă bunico,\n\nAm ajuns ieri la mare. Drumul cu trenul a durat mult, dar am văzut pe geam câmpuri cu floarea-soarelui. Azi-dimineață am mers pe plajă. Apa era rece, așa că am intrat doar până la genunchi. Am construit cu tata un castel de nisip cu trei turnuri. Un val mare l-a dărâmat, dar nu m-am supărat. Mâine facem altul, mai departe de apă. Ți-am strâns scoici albe și o piatră cu dungi.\n\nCu drag,\nAndrei', questions: [
          Q('Cui îi scrie Andrei?', ['Bunicii', 'Tatălui', 'Unui coleg'], 0, 'Scrisoarea începe cu „Dragă bunico”.'),
          Q('Cu ce a călătorit Andrei?', ['Cu trenul', 'Cu avionul', 'Cu mașina'], 0, 'Andrei scrie despre drumul cu trenul.'),
          Q('De ce a intrat Andrei în apă doar până la genunchi?', ['Apa era rece', 'Nu știa să înoate', 'Era seară'], 0, 'Textul spune: „Apa era rece, așa că am intrat doar până la genunchi”.'),
          Q('De ce vor face castelul nou mai departe de apă?', ['Ca să nu-l dărâme valul', 'Ca să fie mai mare', 'Ca să-l vadă bunica'], 0, 'Primul castel a fost dărâmat de un val. Mai departe de apă, valul nu ajunge.'),
          Q('Ce i-a strâns Andrei bunicii?', ['Scoici și o piatră', 'Nisip și apă', 'Flori și frunze'], 0, 'I-a strâns scoici albe și o piatră cu dungi.')
        ] }]
      ],
      clues: [
        [{ text: 'Pe masă sunt trei creioane și o foaie cu un soare desenat. Nu vedem cine a făcut desenul.', questions: [
          Q('Ce știm sigur?', ['Pe foaie este un soare', 'Ana a desenat', 'Desenul a fost făcut azi'], 0, 'Soarele este observat; autorul și momentul nu sunt precizate.'),
          Q('Ce informație lipsește?', ['Cine a desenat', 'Câte creioane sunt', 'Ce apare pe foaie'], 0, 'Textul precizează că nu vedem autorul.')
        ] },
        { text: 'Pe prag sunt urme mici de lăbuțe. Ușa spre curte este deschisă. Nu vedem niciun animal.', questions: [
          Q('Ce știm sigur?', ['Pe prag sunt urme de lăbuțe', 'Pisica a intrat în casă', 'Câinele a fugit în curte'], 0, 'Urmele se văd. Ce animal le-a lăsat nu știm.'),
          Q('Ce informație lipsește?', ['Ce animal a lăsat urmele', 'Unde sunt urmele', 'Dacă ușa este deschisă'], 0, 'Textul nu spune ce animal a fost.')
        ] },
        { text: 'În coșul de pe masă erau cinci mere. Acum sunt trei. Lângă coș este o farfurie goală.', questions: [
          Q('Ce știm sigur?', ['Lipsesc două mere', 'Ana a mâncat merele', 'Merele s-au stricat'], 0, '5 − 3 = 2: lipsesc două mere. Cine le-a luat nu știm.'),
          Q('Ce întrebare ajută?', ['Cine a luat merele?', 'Ce culoare are coșul?', 'Câte farfurii avem?'], 0, 'Întrebarea caută informația care lipsește.')
        ] }],
        [{ text: 'Curtea este udă. Lângă flori se află un furtun. Nu știm dacă a plouat. Un copil spune că poate cineva a udat grădina.', questions: [
          Q('Care este o presupunere?', ['Cineva a udat grădina', 'Curtea este udă', 'Există un furtun'], 0, 'Udarea este o explicație posibilă, nu un fapt confirmat.'),
          Q('Ce întrebare ajută verificarea?', ['A udat cineva curtea?', 'Ce culoare preferi?', 'Câte flori îți plac?'], 0, 'Întrebarea caută o informație relevantă pentru cauză.')
        ] },
        { text: 'Becul din cameră nu se aprinde. Lampa de pe birou merge. Ieri becul mergea.', questions: [
          Q('Care este o presupunere?', ['Becul s-a ars', 'Lampa de pe birou merge', 'Becul nu se aprinde'], 0, '„S-a ars” este o explicație posibilă; celelalte două sunt observații.'),
          Q('Ce verificare poate face un adult?', ['Verifică becul în siguranță', 'Privește culoarea abajurului', 'Așteaptă până mâine'], 0, 'Doar adultul verifică sau schimbă becul, cu electricitatea oprită. Copilul nu umblă la bec sau la fire.')
        ] },
        { text: 'Câinele Rex latră la ușă. Se aude soneria. Bunica spune că sigur a venit poștașul.', questions: [
          Q('Ce se știe sigur?', ['Câinele latră și sună soneria', 'A venit sigur poștașul', 'Rex vrea să iasă afară'], 0, 'Lătratul și soneria se aud. Cine este la ușă nu știm încă.'),
          Q('Cum verificăm cine a sunat?', ['Întrebăm cine este', 'Lăsăm câinele să latre', 'Ghicim după oră'], 0, 'Întrebând, aflăm cine este la ușă. Ușa o deschide un adult.')
        ] }],
        [{ text: 'Un ghiveci a fost mutat la fereastră și udat mai des. După o săptămână, planta are două frunze noi. O colegă spune că lumina a produs sigur schimbarea.', questions: [
          Q('De ce nu știm sigur cauza?', ['S-au schimbat și lumina, și udarea', 'Planta nu are deloc frunze noi', 'Frunzele cresc fără lumină și apă'], 0, 'Două condiții s-au modificat simultan, deci nu izolăm cauza.'),
          Q('Cum am putea verifica mai bine?', ['Schimbăm un singur lucru odată', 'Schimbăm toate condițiile deodată', 'Privim planta o singură dată'], 0, 'O comparație controlată ajută să distingem efectele.')
        ] },
        { text: 'Toți copiii care au mâncat azi la cantină au primit supă. Ion spune că nu a primit supă. Nu știm dacă Ion a mâncat la cantină.', questions: [
          Q('Ce putem spune?', ['Poate Ion nu a mâncat la cantină', 'Ion spune sigur o minciună acum', 'Regula de la cantină e greșită'], 0, 'Regula este despre cei care au mâncat la cantină. Nu știm dacă Ion a fost acolo.'),
          Q('Ce întrebare ajută?', ['A mâncat Ion la cantină?', 'Îi place lui Ion supa?', 'Ce supă a fost azi?'], 0, 'Răspunsul ne spune dacă regula se aplică lui Ion.')
        ] },
        { text: 'Două pahare cu lapte au stat o zi: unul în frigider, altul pe masă. Laptele de pe masă miroase acru. Mara spune: „Căldura strică laptele mai repede.”', questions: [
          Q('Ce susține observația?', ['Aici, laptele ținut la cald s-a stricat', 'Orice lapte se strică într-o oră', 'Frigiderul strică laptele'], 0, 'Observația este despre aceste două pahare, în aceste condiții.'),
          Q('Cum ar fi mai sigură concluzia?', ['Repetăm cu mai multe pahare', 'Mirosim o singură dată', 'Aruncăm ambele pahare'], 0, 'Mai multe încercări ne arată dacă rezultatul se repetă.')
        ] }]
      ],
      observations: [
        [{ text: 'Observații despre o plantă: luni — 2 frunze; miercuri — 3 frunze; vineri — 4 frunze. Numărăm frunzele aceleiași plante.', questions: [
          Q('Câte frunze are vineri?', ['4', '3', '2'], 0, 'Valoarea de vineri este 4.'),
          Q('Cu câte frunze a crescut numărul de luni până vineri?', ['2', '4', '1'], 0, 'Calculăm diferența: 4 − 2 = 2.')
        ] },
        { text: 'Am privit cerul la prânz, trei zile la rând: luni — soare; marți — ploaie; miercuri — soare.', questions: [
          Q('În câte zile a fost soare?', ['2', '1', '3'], 0, 'Luni și miercuri: două zile cu soare.'),
          Q('Ce vreme a fost marți?', ['Ploaie', 'Soare', 'Ninsoare'], 0, 'Lângă „marți” scrie „ploaie”.')
        ] },
        { text: 'Am numărat fluturii din grădină: dimineața — 3; la prânz — 6; seara — 1.', questions: [
          Q('Când au fost cei mai mulți fluturi?', ['La prânz', 'Dimineața', 'Seara'], 0, '6 este cel mai mare număr din listă.'),
          Q('Câți fluturi au fost dimineața?', ['3', '6', '1'], 0, 'Lângă „dimineața” scrie 3.')
        ] }],
        [{ text: 'Număr de păsări observate în același loc, câte zece minute: luni — 5; marți — 8; miercuri — 6. Nu urmărim fiecare pasăre după plecare.', questions: [
          Q('În ce zi au fost observate cele mai multe păsări?', ['Marți', 'Luni', 'Miercuri'], 0, '8 este valoarea cea mai mare.'),
          Q('Putem spune că sunt 19 păsări diferite?', ['Nu, unele au venit în mai multe zile', 'Da, fiecare pasăre a venit o dată', 'Nu, au fost doar 8 păsări'], 0, 'Suma observațiilor nu garantează numărul de animale distincte.')
        ] },
        { text: 'Temperatura la ora 8, trei zile la rând: luni — 5 grade; marți — 8 grade; miercuri — 3 grade.', questions: [
          Q('În ce zi a fost cel mai frig la ora 8?', ['Miercuri', 'Luni', 'Marți'], 0, '3 grade este temperatura cea mai mică.'),
          Q('Cu câte grade a fost mai cald marți decât luni?', ['3', '8', '13'], 0, '8 − 5 = 3 grade.')
        ] },
        { text: 'Am măsurat zăpada din curte: luni — 10 cm; marți — 7 cm; miercuri — 4 cm. Nu a mai nins.', questions: [
          Q('Ce s-a întâmplat cu stratul de zăpadă?', ['A scăzut în fiecare zi', 'A crescut în fiecare zi', 'A rămas la fel'], 0, '10, apoi 7, apoi 4: stratul s-a subțiat.'),
          Q('Cu câți centimetri a scăzut de luni până miercuri?', ['6', '4', '14'], 0, '10 − 4 = 6 centimetri.')
        ] }],
        [{ text: 'Două plante asemănătoare au aceeași lumină. Planta A primește udare potrivită și crește de la 8 la 12 cm. Planta B primește prea puțină apă și crește de la 8 la 9 cm. Observăm o singură pereche de plante.', questions: [
          Q('Care este diferența dintre creșterile lor?', ['3 cm', '4 cm', '1 cm'], 0, 'A crește cu 4 cm, B cu 1 cm: 4 − 1 = 3 cm.'),
          Q('Care concluzie este prudentă?', ['Rezultatul susține rolul apei, dar repetăm observația', 'Am demonstrat ce le trebuie tuturor plantelor', 'Lumina nu contează niciodată pentru plante'], 0, 'O singură pereche oferă un indiciu, nu o regulă universală.')
        ] },
        { text: 'Două grupe au numărat păsările de la hrănitoare, câte 10 minute. Grupa 1 a numărat la prânz: 7 păsări. Grupa 2 a numărat dimineața: 12 păsări.', questions: [
          Q('De ce nu putem spune că grupa 2 a numărat mai atent?', ['Au numărat la ore diferite', 'Au numărat aceleași păsări', 'Grupa 2 are mai mulți copii'], 0, 'La ore diferite pot veni păsări diferite; diferența nu arată atenția.'),
          Q('Ce ar face comparația mai corectă?', ['Numărăm la aceeași oră', 'Numărăm doar o grupă', 'Adunăm cele două numere'], 0, 'Când ora este aceeași, comparăm doar felul în care numără grupele.')
        ] },
        { text: 'Trei pahare cu apă au stat afară într-o noapte de iarnă. Dimineața, paharele 1 și 2, din curte, aveau gheață. Paharul 3, lângă un geam încălzit, avea apă.', questions: [
          Q('Câte pahare au înghețat?', ['2', '3', '1'], 0, 'Paharele 1 și 2 aveau gheață.'),
          Q('Ce concluzie este prudentă?', ['Locul poate conta; repetăm testul', 'În paharul 3 nu a fost apă', 'Apa nu îngheață lângă case'], 0, 'Un singur pahar nu ajunge pentru o regulă; repetăm cu mai multe pahare.')
        ] }]
      ]
    };
    // un nivel poate avea mai multe texte: la fiecare joc se alege altul
    const passage = this.pick([].concat(passages[mode][level]));
    return passage.questions.map(q => this.choice(q.prompt, q.options, q.answer, q.explain, 'Citește textul încă o dată, rar. Răspunsul se află în el.', { passage: passage.text }));
  },

  experimentRounds(mode, level) {
    // E(întrebare, [corect, greșit, greșit], explicație, observația din model, [concluzie susținută, greșită, greșită])
    const E = (ask, options, explain, observation, supported) => ({ ask, options, explain, observation, supported });
    const bank = {
      plants: [
        [E('Vrei să afli dacă o plantă are nevoie de apă. Ce schimbi între două plante la fel?', ['Doar cantitatea de apă', 'Apa și lumina', 'Doar culoarea ghiveciului'], 'Schimbăm un singur lucru, apa, și păstrăm restul la fel.',
            'În model, planta udată rămâne verde; cea neudată începe să se ofilească.', ['Planta are nevoie de apă', 'Planta crește mai bine fără apă', 'Udarea nu a schimbat nimic']),
          E('O plantă stă într-un dulap întunecat, alta la fereastră. Ce prezici?', ['Cea de la fereastră crește mai bine', 'Cea din dulap crește mai bine', 'Vor arăta la fel'], 'Plantele au nevoie de lumină ca să crească sănătoase.',
            'În model, după o săptămână, planta din dulap are frunze palide și o tulpină subțire.', ['Plantele au nevoie de lumină', 'Plantele cresc mai bine la întuneric', 'Lumina nu a schimbat nimic']),
          E('O sămânță de fasole stă pe vată. Ce îi trebuie ca să încolțească?', ['Vată udă', 'Vată uscată', 'Vată pusă la congelator'], 'Sămânța are nevoie de apă și de căldură potrivită ca să încolțească.',
            'În model, după câteva zile, din sămânța de pe vata udă apare un firicel alb: rădăcina.', ['Sămânța are nevoie de apă', 'Sămânța încolțește în gheață', 'Vata singură face sămânța să crească'])],
        [E('Două plante primesc aceeași lumină. A este udată potrivit, B prea puțin. Ce prezici?', ['A va crește mai bine', 'B va crește mai bine', 'Vor crește sigur la fel'], 'Apa este necesară, dar rezultatul se vede în timp; predicția nu este o garanție.',
            'În model, A crește mai mult decât B. În realitate am repeta observația.', ['Aici, apa potrivită a ajutat creșterea', 'B a crescut mai mult decât A', 'Plantele au avut lumină diferită']),
          E('Măsori o plantă luni: 5 cm. Vineri măsori 8 cm. Cât a crescut?', ['3 cm', '8 cm', '13 cm'], 'Scădem: 8 − 5 = 3 cm.',
            'În model, rigla arată 5 cm luni și 8 cm vineri.', ['Planta a crescut 3 cm', 'Planta a crescut 13 cm', 'Planta a scăzut']),
          E('Planta de pe pervaz se înclină spre geam. Ce explicație verifici?', ['Crește spre lumină', 'Crește spre perete', 'Se apleacă sub greutatea apei'], 'Plantele cresc spre lumină.',
            'În model, întorci ghiveciul; după câteva zile, planta se înclină din nou spre fereastră.', ['Planta se întoarce spre lumină', 'Planta se înclină spre perete', 'Planta nu se mișcă deloc'])],
        [E('Vrei să afli dacă apa influențează o plantă. Ce schimbi între două plante asemănătoare?', ['Doar cantitatea de apă', 'Apa, lumina și ghiveciul', 'Doar eticheta ghiveciului'], 'Schimbăm factorul studiat și păstrăm celelalte condiții la fel.',
            'În model, valorile sunt A: +4 cm și B: +1 cm.', ['Rezultatul susține rolul apei, aici', 'Orice cantitate de apă ajută', 'Lumina nu are niciun rol']),
          E('Uzi o plantă de trei ori pe zi și ea se îngălbenește. Ce verifici?', ['Dacă primește prea multă apă', 'Dacă îi trebuie și mai multă apă', 'Dacă frunzele galbene sunt sănătoase'], 'Și prea multă apă poate dăuna: rădăcinile au nevoie și de aer.',
            'În model, pământul este îmbibat de apă, iar rădăcinile nu primesc aer.', ['Prea multă apă poate dăuna', 'Mai multă apă e mereu mai bine', 'Frunzele galbene arată sănătate']),
          E('O plantă udată mai mult stă la soare, alta udată mai puțin stă la umbră. Ce problemă are testul?', ['Am schimbat două lucruri deodată', 'Am folosit prea puține frunze', 'Testul nu are nicio problemă'], 'Când schimbăm apa și lumina deodată, nu știm care a produs diferența.',
            'În model, plantele cresc diferit, dar au primit și apă diferită, și lumină diferită.', ['Nu știm dacă a contat apa sau lumina', 'Sigur doar apa a făcut toată diferența', 'Sigur doar lumina a făcut toată diferența'])]
      ],
      water: [
        [E('Un cub de gheață stă într-o cameră caldă. Ce prezici?', ['Se topește treptat', 'Se face mai mare', 'Rămâne la fel'], 'Gheața primește căldură și se transformă în apă lichidă.',
            'În model, cubul se micșorează și apare apă lichidă.', ['Gheața s-a topit și a devenit apă', 'Gheața a rămas la fel de mare', 'Gheața s-a făcut mai mare la căldură']),
          E('Pui un pahar cu apă în congelator. Ce prezici după câteva ore?', ['Apa devine gheață', 'Apa începe să fiarbă', 'Apa se face abur'], 'La frig mare, apa îngheață și devine solidă.',
            'În model, apa din pahar s-a întărit: acum este gheață.', ['La frig, apa poate îngheța', 'La frig, apa fierbe', 'Frigul face apa abur']),
          E('Rufele nu mai picură. Stau la soare și se usucă. Unde ajunge apa?', ['Se evaporă în aer', 'Se scurge toată pe jos', 'Rămâne toată în rufe'], 'Apa trece în aer sub formă de vapori: se evaporă.',
            'În model, după câteva ore, rufele sunt uscate.', ['Apa a trecut în aer ca vapori', 'Apa a rămas ascunsă în rufe', 'Toată apa s-a scurs pe jos'])],
        [E('Pe exteriorul unui pahar rece apar picături. De unde vine apa?', ['Din vaporii din aer', 'Din apa trecută prin sticlă', 'Din gheața aflată în pahar'], 'Vaporii din aer se transformă în picături pe suprafața rece.',
            'În model, apar picături pe exteriorul paharului rece.', ['Vaporii din aer au format picături', 'Apa a trecut prin sticlă', 'Paharul a produs apa singur']),
          E('Iarna, pe geamul rece apar picături pe partea dinăuntru. De unde vin?', ['Din vaporii din aerul camerei', 'Prin sticlă, de afară', 'Din vopseaua ramei'], 'Aerul cald din cameră are vapori, care se fac picături pe geamul rece.',
            'În model, aerul cald din cameră atinge geamul rece și apar picături.', ['Vaporii se fac picături pe geamul rece', 'Apa de afară trece prin sticlă', 'Picăturile vin din rama ferestrei']),
          E('Un adult fierbe apă într-o oală cu capac. Ce apare pe capac?', ['Picături de apă', 'Bucăți de gheață', 'Nu apare nimic'], 'Aburul urcă, atinge capacul mai rece și se transformă înapoi în apă.',
            'În model, aburul urcă și pe capac se strâng picături. Doar adultul lucrează cu apa fierbinte.', ['Aburul poate redeveni apă lichidă', 'Aburul devine gheață pe capac', 'Capacul produce apa'])],
        [E('O baltă se micșorează fără să fiarbă. Ce explicație este potrivită?', ['O parte din apă se evaporă', 'Apa se evaporă doar când fierbe', 'Apa îngheață la căldură'], 'Evaporarea are loc și fără fierbere; apa trece în aer ca vapori.',
          'În model, nivelul apei scade treptat, fără fierbere.', ['Apa se evaporă și fără să fiarbă', 'Apa se evaporă numai când fierbe', 'Apa a rămas la același nivel']),
          E('Două farfurii au aceeași cantitate de apă: una la soare, una la umbră. Ce prezici?', ['La soare se evaporă mai repede', 'La umbră se evaporă mai repede', 'Se evaporă la fel de repede'], 'Căldura grăbește evaporarea.',
            'În model, după o oră, în farfuria de la soare a rămas mai puțină apă.', ['Căldura grăbește evaporarea', 'Apa se evaporă doar la soare', 'Apa a scăzut la fel în ambele']),
          E('Un cub de gheață stă pe o farfurie, altul învelit într-un prosop. Care se topește mai încet?', ['Cel învelit în prosop', 'Cel de pe farfurie', 'Se topesc la fel'], 'Prosopul încetinește trecerea căldurii din aer spre gheață.',
            'În model, cubul din prosop mai are gheață când celălalt s-a topit.', ['Prosopul încetinește topirea', 'Prosopul răcește gheața', 'Gheața învelită nu se topește'])]
      ],
      fair: [
        [E('Vrei să afli care minge sare mai sus. Ce păstrezi la fel?', ['Înălțimea de la care le lași', 'Culoarea și desenul fiecărei mingi', 'Mingea pe care o folosești'], 'Lăsăm mingile de la aceeași înălțime, pe aceeași podea; doar mingea diferă.',
            'În model, ambele mingi cad de la aceeași înălțime, pe aceeași podea.', ['Testul compară corect mingile', 'Culoarea a făcut diferența', 'Testul nu arată nimic']),
          E('Compari topirea la soare și la umbră. Ce cuburi alegi?', ['Două cuburi de aceeași mărime', 'Un cub mare și unul mic', 'Un cub întreg și unul spart'], 'Folosim cuburi la fel și farfurii identice. Le urmărim la fel de mult timp. Schimbăm doar locul.',
            'În model, cuburile sunt la fel, pe farfurii identice. După același timp, cubul de la soare s-a topit mai mult.', ['Aici, soarele a grăbit topirea', 'Aici, umbra a grăbit topirea', 'Ambele cuburi s-au topit la fel']),
          E('Vrei să afli ce hârtie absoarbe mai multă apă. Ce faci?', ['Pun aceeași apă pe fiecare', 'Pun câtă apă vreau', 'Pun apă doar pe una'], 'Aceeași cantitate de apă pe fiecare hârtie face comparația corectă.',
            'În model, pe fiecare hârtie cade câte o linguriță de apă.', ['Diferența vine de la hârtie', 'Mai multă apă face hârtia mai bună', 'Nu putem compara hârtiile'])],
        [E('Schimbi și locul, și mărimea cubului. Ce problemă apare?', ['Nu știi ce a produs diferența', 'Rezultatul devine mai sigur', 'Gheața nu se mai topește'], 'Nu știm care schimbare a produs diferența observată.',
            'Modelul arată două lucruri schimbate: locul și mărimea. Cauza nu poate fi aflată.', ['Schimbăm un singur lucru odată', 'Sigur locul a contat', 'Sigur mărimea a contat']),
          E('Testezi dacă sarea grăbește topirea gheții. Ce pui pe al doilea cub?', ['Nimic, ca să compar', 'Tot sare', 'Sare și zahăr'], 'Un cub cu sare și unul fără: așa vedem efectul sării.',
            'În model, cubul cu sare se topește mai repede decât cel fără nimic.', ['Aici, sarea a grăbit topirea', 'Sarea a încetinit topirea', 'Cuburile s-au topit la fel']),
          E('Faci testul o singură dată și rezultatul pare ciudat. Ce faci?', ['Repet testul', 'Schimb rezultatul', 'Renunț la test'], 'Repetarea ne arată dacă rezultatul se confirmă.',
            'În model, a doua și a treia încercare dau un rezultat asemănător cu primul.', ['Repetarea ne face mai siguri', 'O încercare ajunge mereu', 'Rezultatul se schimbă cum vrem'])],
        [E('Se întâmplă altceva decât credeai. Ce faci cu rezultatul?', ['Notez, verific și repet', 'Șterg observația din caiet', 'Scriu doar ce am crezut'], 'Păstrăm ce am observat, chiar dacă ne așteptam la altceva.',
            'Modelul păstrează observația și arată că testul trebuie repetat.', ['O predicție greșită ne învață ceva', 'Predicția trebuie să iasă mereu', 'Datele nepotrivite se șterg']),
          E('Două grupe lasă aceeași mașinuță pe aceeași pantă. Distanțele diferă puțin. Ce facem?', ['Repetăm și comparăm măsurările', 'Spunem că o grupă a greșit', 'Păstrăm numai distanța mai mare'], 'Măsurătorile pot varia puțin; repetăm și comparăm.',
            'În model, distanțele sunt 52 cm și 55 cm.', ['Măsurătorile pot varia puțin', '3 cm dovedesc o greșeală', 'Contează doar prima măsurare']),
          E('Vrei să afli dacă muzica ajută plantele. Ce plan este corect?', ['Două plante la fel, doar una cu muzică', 'Una cu muzică la soare, una fără la umbră', 'O singură plantă, cu muzică'], 'Plantele trebuie să fie la fel și în aceleași condiții; diferă doar muzica.',
            'În model, cele două plante cresc aproape la fel.', ['Aici, muzica nu a făcut diferență', 'Muzica ajută sigur orice plantă', 'Planta fără muzică a crescut mai mult'])]
      ]
    };
    return this.draw(bank[mode][level], 2).flatMap(item => [
      Object.assign(this.choice(item.ask, item.options, 0, item.explain, 'Spune întâi ce crezi tu. Apoi pornește experimentul și vezi ce se întâmplă.'), { kind: 'experiment', observation: item.observation }),
      this.choice('Ce am aflat din acest experiment?', item.supported, 0,
        'Spunem doar ce am văzut aici. Ca să fim siguri, repetăm experimentul.',
        'Citește din nou ce s-a văzut în experiment. Alege ce spune exact același lucru.', { passage: item.observation })
    ]);
  },

  storyRounds(mode, level) {
    const bank = {
      conditions: [
        [['Regulă: dacă plouă, ia umbrela; altfel, nu. Acum plouă.', 'Iau umbrela', 'Nu iau umbrela', 'Iau umbrela și o las acasă', 'Condiția este adevărată, deci alegem ramura pentru ploaie.'],
          ['Regulă: dacă semaforul e roșu, aștepți; altfel, treci cu un adult. Semaforul e roșu.', 'Aștept', 'Trec strada', 'Trec strada în fugă', 'Condiția „roșu” este adevărată, deci urmăm ramura „aștept”.'],
          ['Regulă: dacă e frig, iau căciula; altfel, nu. Afară e cald.', 'Nu iau căciula', 'Iau căciula', 'Iau două căciuli', 'Condiția „e frig” este falsă, deci nu iau căciula.'],
          ['Regulă: dacă numărul se termină cu 0, bat din palme. Numărul este 20.', 'Bat din palme', 'Nu bat din palme', 'Bat din picior', '20 se termină cu 0, deci condiția este adevărată.']],
        [['Regulă: dacă numărul este par, îl pun în cutia A; altfel în B. Numărul este 13.', 'Îl pun în B', 'Îl pun în A', 'Îl pun în ambele', '13 este impar, deci condiția „este par” este falsă.'],
          ['Regulă: dacă cartonașul e albastru, îl pun în cutia A; altfel în B. Cartonașul e verde.', 'Îl pun în B', 'Îl pun în A', 'Îl pun în ambele', 'Verde nu este albastru, deci condiția este falsă și alegem B.'],
          ['Regulă: dacă un animal are pene, îl pun la „păsări”. Pinguinul are pene.', 'Îl pun la păsări', 'Îl pun la pești', 'Nu îl pun nicăieri', 'Pinguinul are pene, deci condiția este adevărată, chiar dacă nu zboară.'],
          ['Regulă: dacă scorul este mai mare decât 5, primești o stea. Scorul este 5.', 'Nu primesc steaua', 'Primesc steaua', 'Primesc două stele', '5 nu este mai mare decât 5, deci condiția este falsă.']],
        [['Regulă: dacă numărul este par și mai mare decât 10, aleg A; altfel B. Numărul este 10.', 'Aleg B', 'Aleg A', 'Nu pot verifica', '10 este par, dar nu este mai mare decât 10. Ambele condiții trebuie respectate.'],
          ['Regulă: dacă plouă sau e foarte frig, ne jucăm înăuntru. Nu plouă, dar e foarte frig.', 'Ne jucăm înăuntru', 'Ne jucăm afară', 'Nu ne mai jucăm', 'Cu „sau” ajunge ca o singură condiție să fie adevărată.'],
          ['Regulă: dacă ai terminat tema și e încă lumină, mergi în parc. Tema e gata, dar s-a întunecat.', 'Rămân acasă', 'Merg în parc', 'Merg în parc singur', 'Cu „și” trebuie să fie adevărate ambele condiții, iar lumina lipsește.'],
          ['Regulă: dacă numărul nu este par, îl pun în cutia A; altfel în B. Numărul este 7.', 'Îl pun în A', 'Îl pun în B', 'Nu pot decide', '7 nu este par, deci condiția „nu este par” este adevărată.']]
      ],
      digital: [
        [['Un necunoscut dintr-un joc îți cere adresa.', 'Nu o dau și spun unui adult', 'Îi spun doar orașul meu', 'Îi spun doar strada și școala', 'Adresa este o informație personală, nu un lucru de oferit unui necunoscut.'],
          ['Un joc îți cere să descarci ceva ca să primești monede gratuite.', 'Întreb mai întâi un adult', 'Descarc, fiindcă e gratuit', 'Întreb un prieten din joc', 'Descărcările necunoscute pot strica dispozitivul. Un adult te ajută să decizi.'],
          ['Vezi pe ecran ceva care te sperie.', 'Închid și spun unui adult', 'Închid și încerc să uit', 'Nu spun nimănui nimic', 'Nu ești vinovat pentru ce ai văzut. Un adult te poate ajuta.'],
          ['Un prieten vrea să afle parola ta de la joc.', 'Nu o spun nici prietenilor', 'I-o spun, fiindcă e prieten', 'Îi spun doar jumătate din ea', 'Parola se păstrează doar pentru tine și pentru părinții tăi.']],
        [['Primești un link care promite un premiu dacă introduci parola.', 'Îl arăt unui adult, fără să-l deschid', 'Introduc parola ca să primesc premiul', 'Îl deschid doar ca să mă uit', 'O cerere de parolă pentru un premiu este un semnal de risc.'],
          ['Cineva postează o poză cu tine fără să te întrebe.', 'Spun unui adult și cer ștergerea', 'Îi scriu ceva urât înapoi', 'Tac și nu spun nimănui', 'Ai dreptul să fii întrebat înainte să apară o poză cu tine.'],
          ['Un coleg scrie mesaje urâte despre altcineva în grupul clasei.', 'Nu le trimit și spun unui adult', 'Ies din grup și nu spun nimic', 'Râd și le trimit mai departe', 'Mesajele care jignesc fac rău. Un adult poate opri ce se întâmplă.'],
          ['Vrei să cauți o imagine pentru un proiect.', 'Caut împreună cu un adult', 'Deschid orice link primit', 'Iau prima poză, de oriunde', 'Un adult te ajută să găsești pagini sigure.']],
        [['Ai trimis deja o informație personală și cineva te amenință să păstrezi secretul.', 'Opresc discuția și cer ajutor', 'Păstrez secretul de teamă', 'Trimit și alte informații', 'Poți cere ajutor și după o greșeală. Nu ești vinovat pentru amenințările altcuiva.'],
          ['Cineva din joc spune că are 8 ani și vrea să vă întâlniți în parc.', 'Nu merg și spun unui adult', 'Merg singur să-l cunosc', 'Merg cu un prieten, fără adulți', 'Online nu putem ști cine este cineva cu adevărat. Nu ne întâlnim cu necunoscuți.'],
          ['Ai stat mult la tabletă și te dor ochii.', 'Fac o pauză și mă mișc', 'Mai joc încă o oră', 'Țin tableta mai aproape', 'Pauzele odihnesc ochii și corpul.'],
          ['Ai apăsat din greșeală un buton care cere bani.', 'Spun imediat unui adult', 'Apăs din nou ca să anulez', 'Închid jocul și nu spun nimic', 'E bine să spui imediat: un adult poate rezolva plata.']]
      ],
      health: [
        [['Urmează să mănânci după joaca afară.', 'Mă spăl cu apă și săpun', 'Îmi șterg mâinile de tricou', 'Le clătesc repede, fără săpun', 'Spălarea cu apă și săpun îndepărtează murdăria și microbii de pe mâini.'],
          ['Strănuți și nu ai un șervețel la îndemână.', 'Strănut în cot', 'Strănut în palmă', 'Îmi țin strănutul cu forța', 'Strănutul în cot oprește o parte din stropi și îți păstrează mâinile curate.'],
          ['Ți-e sete după alergat.', 'Beau apă', 'Beau suc foarte dulce', 'Mănânc o înghețată în loc', 'Apa ajută corpul după efort.'],
          ['Ai mâncat bomboane și urmează să te culci.', 'Mă spăl pe dinți', 'Beau puțină apă și atât', 'Mă culc imediat', 'Zahărul rămas pe dinți îi poate strica. Periajul îi curăță.'],
          ['Este seară, iar mâine ai școală.', 'Mă culc la ora obișnuită', 'Mă joc pe tabletă până târziu', 'Stau treaz cât vreau', 'Somnul suficient ajută corpul să se refacă și te ajută să fii atent.']],
        [['Te simți rău în timpul unui joc.', 'Mă opresc și anunț un adult', 'Iau singur un medicament de acasă', 'Continui jocul și nu spun nimic', 'Un adult te poate ajuta să primești îngrijirea potrivită.'],
          ['Găsești pastile colorate pe masă.', 'Nu le ating și chem un adult', 'Gust una să văd cum e', 'Le pun eu singur în dulap', 'Medicamentele pot semăna cu bomboanele, dar pot face rău. Doar un adult le dă.'],
          ['Te-ai tăiat puțin la deget.', 'Îi spun unui adult', 'Ascund degetul', 'Îl șterg de pantaloni', 'Un adult te ajută să cureți rana și să o protejezi.'],
          ['Un coleg tușește mult în clasă.', 'Îi spunem învățătoarei', 'Ne mutăm departe de el', 'Îi dau eu un sirop de acasă', 'Învățătoarea îl poate ajuta. Nu împărțim sticla, ca să nu se transmită microbii.']],
        [['Un coleg îți oferă medicamentul lui pentru o durere.', 'Refuz și cer ajutor unui adult', 'Îl iau fiindcă pe el l-a ajutat', 'Îl împart cu altcineva', 'Medicamentele nu se aleg și nu se împart între copii. Ce ajută pe cineva poate face rău altcuiva.'],
          ['Ai febră, dar vrei să mergi la un concurs la școală.', 'Spun părinților și mă odihnesc', 'Merg fără să spun nimic', 'Iau singur un medicament', 'Când ești bolnav, corpul are nevoie de odihnă, iar colegii sunt feriți de boală.'],
          ['Un prieten spune că fructele unei plante din parc sunt bune de mâncat.', 'Întreb mai întâi un adult', 'Gust puțin', 'Mănânc doar unul mic', 'Unele fructe sălbatice sunt otrăvitoare. Nu le gustăm fără un adult care cunoaște plantele.'],
          ['Te doare burta după ce ai mâncat ceva nou.', 'Spun unui adult ce am mâncat', 'Aștept să treacă de la sine', 'Beau un suc rece', 'Dacă afli ce și când ai mâncat, adultul poate decide cum te ajută.']]
      ],
      family: [
        [['Vrei să ajuți la masa de seară.', 'Întreb ce pot face în siguranță', 'Iau singur cuțitul ascuțit', 'Aprind singur aragazul din bucătărie', 'Alegem o treabă potrivită vârstei. Fetele și băieții pot ajuta la aceleași treburi.'],
          ['Fratele mai mic plânge pentru că și-a pierdut jucăria.', 'Îl ajut să o caute', 'Îl las, că îi trece', 'Îi spun că o găsește el', 'Când ajutăm, celălalt se simte sprijinit.'],
          ['Bunica e obosită după drum.', 'O întreb ce o ajută', 'Îi cer să se joace cu mine', 'Îi povestesc tot ce am făcut', 'Întrebarea arată grijă și ne spune de ce are nevoie.'],
          ['Mama îți cere să-ți strângi jucăriile.', 'Le pun la locul lor', 'Le împing sub pat', 'Le las pentru altcineva', 'Fiecare membru al familiei are grijă de spațiul comun.']],
        [['Un coleg locuiește cu bunica, altul cu un părinte.', 'Respect că familiile sunt diferite', 'Întreb de ce nu are ca mine', 'Le cer detalii în fața clasei', 'Familiile pot fi diferite. Nu judecăm familia cuiva și nu cerem lucruri personale.'],
          ['Părinții nu au timp acum să se joace cu tine.', 'Aștept sau mă joc singur', 'Îi întreb din cinci în cinci minute', 'Spun că nu țin la mine', 'Uneori adulții au alte treburi; asta nu înseamnă că nu țin la tine.'],
          ['Tu și sora ta vreți același scaun.', 'Stăm pe rând', 'O împing de pe scaun', 'Îl iau eu, că sunt mai mare', 'O înțelegere pe rând este corectă pentru amândoi.'],
          ['Un coleg spune că familia lui sărbătorește altfel decât a ta.', 'Îl întreb cum sărbătoresc', 'Îi spun că e greșit', 'Schimb vorba, că e ciudat', 'Familiile pot avea obiceiuri diferite. Curiozitatea respectuoasă ne ajută să învățăm.']],
        [['Un copil spune că nu se simte în siguranță acasă.', 'Îi spun unui adult de încredere', 'Îi cer să păstreze secretul', 'Îi spun că sigur exagerează', 'Siguranța are prioritate. Un adult de încredere din afara casei poate ajuta.'],
          ['Părinții se ceartă și te simți îngrijorat.', 'Spun ce simt unui adult apropiat', 'Cred că e vina mea', 'Mă ascund și tac mereu', 'Certurile adulților nu sunt vina copiilor. Poți spune ce simți.'],
          ['Familia se mută în alt oraș.', 'Spun ce mă îngrijorează', 'Refuz să vorbesc cu oricine', 'Cred că nu voi avea prieteni', 'Schimbările sunt grele. Când vorbim despre ele, primim sprijin.'],
          ['Un adult din familie îți cere ceva care te face să te simți în pericol.', 'Spun nu și cer ajutor altui adult', 'Fac ce cere, pentru că e adult', 'Păstrez totul secret față de toți', 'Poți spune nu. Un alt adult de încredere te poate proteja.']]
      ],
      friends: [
        [['Vrei creionul unui coleg.', 'Întreb dacă îl pot împrumuta', 'Îl iau fără să întreb', 'Îl iau și îi spun după', 'Acordul respectă persoana și lucrurile ei.'],
          ['Un coleg nou stă singur în pauză.', 'Îl invit să se joace', 'Îl privesc de departe', 'Aștept să vină el la noi', 'O invitație îl ajută pe colegul nou să se simtă primit.'],
          ['Prietenul tău a câștigat la un joc.', 'Îl felicit', 'Spun că a trișat', 'Nu mai zic nimic', 'Ne putem bucura pentru reușita unui prieten.'],
          ['Ai lovit din greșeală un coleg.', 'Îmi cer iertare', 'Mă prefac că nu am văzut', 'Spun că e vina lui', 'Când greșim, ne cerem iertare și verificăm dacă celălalt e bine.']],
        [['Un prieten insistă să joci un joc care nu-ți place deloc.', 'Spun nu și propun alt joc', 'Accept, ca să nu-l pierd', 'Mă prefac că mă doare capul', 'Poți spune nu fără să jignești.'],
          ['Doi prieteni vor să te joci doar cu ei, nu și cu Ana.', 'Propun să ne jucăm toți', 'Îi spun Anei să plece', 'Azi cu ei, mâine cu Ana', 'Un joc deschis nu lasă pe nimeni pe dinafară.'],
          ['Un prieten îți spune un secret despre o petrecere surpriză.', 'Îl păstrez până la petrecere', 'Îl spun imediat tuturor', 'Îl spun doar unui prieten bun', 'Un secret bun, ca o surpriză, se păstrează. Un secret care sperie se spune unui adult.'],
          ['Prietenul tău e trist că nu a fost ales în echipă.', 'Îl întreb cum se simte', 'Schimb repede subiectul', 'Îi spun că nu contează', 'Întrebarea îi arată că ne pasă de el.']],
        [['Ai spus nu, dar colegul continuă să-ți ia lucrurile.', 'Repet limita și cer sprijin', 'Cred că trebuie să accept', 'Îl lovesc ca să înceteze', 'O limită încălcată repetat poate cere ajutorul unui adult. Nu răspundem prin violență.'],
          ['Un prieten îți propune să copiezi tema lui.', 'Îmi fac singur tema', 'Copiez tot în grabă', 'Copiez doar jumătate', 'Tema te ajută să înveți; copiată nu te ajută.'],
          ['Un grup râde mereu de același coleg.', 'Nu râd și spun unui adult', 'Râd ca să fiu în grup', 'Plec și mă fac că nu aud', 'Râsul repetat la adresa cuiva rănește. Un adult poate opri situația.'],
          ['Tu și prietenul tău vreți jocuri diferite.', 'Facem pe rând câte un joc', 'Plec și nu mai vorbesc', 'Joc mereu ce vrea el', 'Pe rând, fiecare prieten are parte de jocul lui.']]
      ],
      school: [
        [['Mai mulți copii vorbesc deodată și nu vă auziți.', 'Propunem să vorbim pe rând', 'Vorbesc și mai tare', 'Tac și nu mai spun nimic', 'Rândurile ne ajută să auzim și să fim auziți.'],
          ['Vrei să spui ceva în timpul lecției.', 'Ridic mâna și aștept', 'Strig ce am de spus', 'Îl întrerup pe coleg', 'Ridicarea mâinii îi lasă pe toți să vorbească pe rând.'],
          ['Ai terminat de lucrat cu plastilina.', 'O pun la loc în cutie', 'O las pe bancă așa cum e', 'O dau colegului să o strângă', 'Când punem materialele la loc, le găsim și data viitoare.'],
          ['Sună clopoțelul de pauză.', 'Ies calm, fără să împing', 'Alerg și împing colegii', 'Ies primul, ca să prind loc', 'Ieșirea calmă ne ferește de lovituri.']],
        [['Ai nevoie de o pauză de mișcare în timpul lecției.', 'Discut cu învățătoarea o pauză', 'Mă ridic și mă plimb prin clasă', 'Cred că nevoia mea nu contează', 'O regulă poate include adaptări care ajută învățarea.'],
          ['Nu ai înțeles explicația.', 'Întreb învățătoarea', 'Mă prefac că am înțeles', 'Copiez de la colegul meu', 'Întrebările sunt binevenite: așa învățăm.'],
          ['Ai uitat penarul acasă.', 'Cer politicos un creion', 'Iau un creion fără să întreb', 'Nu lucrez deloc azi', 'O cerere politicoasă rezolvă problema.'],
          ['Un coleg a vărsat apă pe jos.', 'Anunț și ajut să ștergem', 'Îi spun că e vina lui', 'Ocolesc apa și plec', 'Ajutorul și anunțul previn alunecarea.']],
        [['Un coleg nu poate participa la joc din cauza unei reguli.', 'Propunem schimbarea regulii', 'Spunem că regula nu se schimbă', 'Îl obligăm să joace la fel', 'O regulă se poate schimba ca să poată participa toți.'],
          ['Clasa face o regulă nouă pentru pauze.', 'Spun ideea mea și îi ascult', 'Las doar copiii mari să decidă', 'Refuz orice regulă nouă', 'O regulă bună ține cont de ideile tuturor.'],
          ['Vezi un coleg care ia pe ascuns gustarea altuia.', 'Îi spun învățătoarei', 'Îi spun doar prietenului meu', 'Mă fac că nu văd', 'Un adult poate rezolva corect situația.'],
          ['Regula spune „fără telefon în clasă”, dar un coleg trebuie să-și anunțe părinții.', 'Întreabă învățătoarea', 'Sună pe ascuns', 'Nu își mai anunță părinții', 'Regulile pot avea excepții discutate cu un adult.']]
      ],
      help: [
        [['Un coleg strânge multe piese.', 'Întreb dacă vrea ajutor', 'Îi iau piesele fără acord', 'Mă apuc singur să le sortez', 'Întrebăm înainte să ajutăm. Colegul poate alege dacă vrea ajutor.'],
          ['Bunicul cară o sacoșă grea.', 'Îl întreb dacă îl ajut', 'Merg repede înainte', 'Îi iau sacoșa din mână', 'Oferta de ajutor arată grijă.'],
          ['Un copil a scăpat creioanele pe jos.', 'Îl ajut să le adune', 'Trec pe lângă, că mă grăbesc', 'Îi spun să fie mai atent', 'Un ajutor mic face o mare diferență.'],
          ['Ai nevoie de ajutor la un puzzle.', 'Cer ajutor politicos', 'Forțez piesele să intre', 'Plâng și renunț', 'Și cererea de ajutor este o alegere bună.']],
        [['Un coleg încearcă singur și cere doar un indiciu.', 'Îi dau un indiciu și aștept', 'Rezolv totul în locul lui', 'Îi spun direct răspunsul', 'Ajutorul potrivit sprijină învățarea, nu o înlocuiește.'],
          ['Un coleg spune „nu, mulțumesc” când îi oferi ajutor.', 'Respect răspunsul lui', 'Îl ajut cu forța', 'Mă supăr pe el', 'Și ajutorul se oferă cu acordul celuilalt.'],
          ['Un copil cu piciorul în ghips vrea să se joace.', 'Căutăm un joc pentru el', 'Îi spunem să stea deoparte', 'Îl punem mereu să țină scorul', 'Putem adapta jocul ca să participe toți.'],
          ['Un coleg nu vorbește încă bine română.', 'Îi arăt cu gesturi și desene', 'Râd de cum vorbește', 'Vorbesc mai tare cu el', 'Gesturile și desenele ne ajută să ne înțelegem.']],
        [['Vezi un obiect greu căzut lângă un copil.', 'Chem un adult și stau departe', 'Încerc singur să-l ridic', 'Cer altui copil să-l ridice', 'Într-o situație riscantă, chemăm un adult.'],
          ['Un copil s-a rătăcit în parc și plânge.', 'Chemăm un adult de încredere', 'Îl duc acasă la mine singur', 'Îl las și plec mai departe', 'Un adult de încredere, de exemplu un paznic sau un polițist, îl poate ajuta.'],
          ['Ai promis că ajuți un coleg, dar acum vrei să te joci.', 'Îi spun și găsim alt moment', 'Plec fără să-i spun', 'Mă prefac că am uitat', 'Când nu putem, spunem sincer și căutăm o soluție.'],
          ['Cineva îți cere ajutorul la ceva periculos.', 'Refuz și chem un adult', 'Ajut, ca să nu se supere', 'Ajut, dar pe ascuns', 'Nu ajutăm la lucruri periculoase. Un adult poate ajuta în siguranță.']]
      ],
      nature: [
        [['După picnic au rămas ambalajele tale.', 'Le duc la coșul de gunoi', 'Le las sub un copac', 'Le îngrop în iarbă', 'Nu lăsăm deșeuri în natură.'],
          ['Vezi o floare frumoasă în parc.', 'O privesc și o las acolo', 'O rup ca să o iau', 'Iau doar o petală', 'Florile rămân pentru albine și pentru ceilalți oameni.'],
          ['Robinetul curge după ce te-ai spălat.', 'Îl închid', 'Îl las deschis', 'Îl închid doar pe jumătate', 'Închiderea robinetului economisește apa.'],
          ['Ai o sticlă de plastic goală.', 'O pun la reciclare', 'O arunc pe stradă', 'O pun la gunoiul obișnuit', 'Plasticul reciclat poate deveni alte obiecte.']],
        [['Vezi un animal sălbatic aproape de potecă.', 'Îl privesc de la distanță', 'Încerc să-l ating', 'Îi dau mâncare din mână', 'Distanța protejează animalul și oamenii.'],
          ['Ieși din cameră și lumina e aprinsă.', 'Sting lumina', 'Las lumina aprinsă', 'O sting doar seara', 'Stingem lumina ca să economisim energie.'],
          ['Găsești un pui de pasăre căzut din cuib.', 'Chem un adult și nu-l ating', 'Îl iau acasă în buzunar', 'Îl pun eu înapoi în cuib', 'Un adult știe cum să ajute puiul fără să-l rănească.'],
          ['Mergi la cumpărături.', 'Iau o sacoșă de acasă', 'Cer mereu pungi noi', 'Iau o pungă nouă, doar una', 'O sacoșă folosită din nou înseamnă mai puțin plastic aruncat.']],
        [['Lângă un loc de joacă este sticlă spartă.', 'Anunț un adult și pe ceilalți', 'O strâng singur cu mâna', 'O ascund repede în iarbă', 'Sticla spartă poate răni. Un adult o poate strânge în siguranță.'],
          ['Grupul vrea să facă focul în pădure.', 'Doar adulții, unde este voie', 'Facem focul oriunde', 'Facem un foc mic, lângă copaci', 'Focul poate scăpa de sub control. Îl fac doar adulții, unde este voie.'],
          ['Vezi gunoi aruncat lângă un râu.', 'Îl strângem cu un adult', 'Îl împingem în apă', 'Îl lăsăm, nu e al nostru', 'Râul și animalele lui sunt protejate când strângem gunoiul cu mănuși și cu un adult.'],
          ['Un copil vrea să ia acasă o broască din lac.', 'O lăsăm în lacul ei', 'O ducem acasă într-o cutie', 'O mutăm într-o baltă', 'Animalele sălbatice trăiesc cel mai bine în locul lor.']]
      ],
      emotions: [
        [['Te simți supărat după o neînțelegere.', 'Spun ce simt și iau o pauză', 'Trântesc ușa și plec din cameră', 'Spun că nu simt nimic deloc', 'Emoția este în regulă; alegem ce facem în siguranță.'],
          ['Vrei să-i spui bunicii că te bucuri să o vezi.', 'Îi spun că mă bucur', 'Îi spun că nu vreau să vină', 'Schimb vorba despre joacă', 'Poți spune ce simți. Nu trebuie să îți arăți bucuria în același fel ca altcineva.'],
          ['Ți-e frică de întuneric seara.', 'Spun unui adult ce simt', 'Ascund frica de toți', 'Stau treaz până adorm de oboseală', 'Frica este o emoție normală. Un adult te poate ajuta.'],
          ['Un coleg plânge.', 'Îl întreb ce s-a întâmplat', 'Mă fac că nu văd', 'Îi spun să nu mai plângă', 'Plânsul arată o emoție. Întrebarea arată grijă.']],
        [['Un coleg tace înaintea unei prezentări.', 'Îl întreb dacă vrea sprijin', 'Decid că sigur îi e frică', 'Îi spun că nu e mare lucru', 'Nu putem ști sigur emoția cuiva doar privindu-l.'],
          ['Ești gelos pe noua bicicletă a prietenului.', 'Recunosc ce simt și îl felicit', 'Spun că a mea e mai bună', 'Nu mai vorbesc cu el azi', 'Gelozia e o emoție. O putem recunoaște fără să facem rău.'],
          ['Ai pierdut un joc și te simți furios.', 'Respir adânc și număr', 'Arunc piesele pe jos', 'Spun că ceilalți au trișat', 'Respirația ne ajută să ne liniștim.'],
          ['Te simți rușinat după o greșeală.', 'Îmi amintesc că toți greșim', 'Mă ascund toată ziua', 'Îi învinovățesc pe alții', 'Greșelile ne ajută să învățăm.']],
        [['Ești și bucuros, și îngrijorat înaintea unei excursii.', 'Accept ambele emoții', 'Aleg o singură emoție', 'Renunț la excursie', 'Putem avea mai multe emoții în același timp.'],
          ['Un prieten spune „sunt bine”, dar pare trist.', 'Îi spun că sunt aici pentru el', 'Îi spun că sigur nu e bine', 'Îl forțez să-mi spună totul', 'Îl lăsăm să aleagă și îi arătăm că suntem aici.'],
          ['Ești foarte supărat și vrei să spui ceva urât.', 'Fac o pauză înainte să vorbesc', 'Spun primul lucru care îmi vine', 'Țip cât pot de tare', 'O pauză ne ajută să alegem cuvintele.'],
          ['O tristețe nu trece de mai multe zile.', 'Vorbesc cu un adult de încredere', 'Aștept să treacă singură, în tăcere', 'Nu spun nimănui ce simt', 'Un adult te poate ajuta când o emoție durează mult.']]
      ],
      conflict: [
        [['Doi copii vor aceeași minge.', 'Se joacă pe rând sau împreună', 'Cel mai puternic o ia', 'O ia cine a văzut-o primul', 'O soluție bună ține cont de amândoi.'],
          ['Doi frați vor ultima felie de prăjitură.', 'O împart în două', 'O ia cel mai rapid', 'O ia cel mai mare', 'Împărțirea este corectă pentru amândoi.'],
          ['Colegul ți-a stricat desenul din greșeală.', 'Îi spun ce simt și îl ascult', 'Îi stric și eu desenul lui', 'Nu mai vorbesc deloc cu el', 'Ascultarea ne ajută să aflăm că a fost o greșeală.'],
          ['Tu și o colegă vreți creionul roșu.', 'Îl folosim pe rând', 'Îl iau eu, că am cerut primul', 'Îl ascund de ea', 'Pe rând, amândouă puteți colora.']],
        [['Soluția propusă îi lasă mereu pe aceiași copii pe dinafară.', 'Căutăm o regulă bună pentru toți', 'Spunem că așa e regula și gata', 'Îi obligăm pe ei să accepte', 'O soluție bună nu lasă mereu aceiași copii fără rând.'],
          ['Doi colegi se ceartă cine a fost primul la rând.', 'Hotărâm o regulă pentru rând', 'Cine strigă mai tare e primul', 'Îl lăsăm în față pe cel mai mare', 'O regulă clară oprește cearta.'],
          ['Un coleg spune că ai trișat, dar nu e adevărat.', 'Explic calm ce am făcut', 'Plec și nu mai joc', 'Îi spun că el trișează mereu', 'Explicația calmă ajută mai mult decât răzbunarea.'],
          ['Grupul nu se înțelege ce joc să aleagă.', 'Facem un vot sau pe rând', 'Joc doar ce vreau eu', 'Alege mereu cel mai bun la jocuri', 'Votul sau rândul sunt moduri corecte de a decide.']],
        [['Discuția devine amenințătoare și cineva împinge.', 'Ne îndepărtăm și chemăm un adult', 'Continuăm disputa cu orice preț', 'Răspundem tot prin împingere', 'Siguranța are prioritate față de rezolvarea fără adulți.'],
          ['Doi prieteni se ceartă și fiecare vrea să fii de partea lui.', 'Îi ascult pe amândoi', 'Aleg pe cel mai puternic', 'Le spun altora secretele lor', 'Poți rămâne prieten cu amândoi și îi poți asculta.'],
          ['Într-o ceartă ai spus ceva urât.', 'Îmi cer iertare', 'Spun că nu am vrut nimic', 'Aștept să uite', 'O scuză sinceră repară relația.'],
          ['Un conflict se repetă în fiecare pauză.', 'Cerem ajutorul unui adult', 'Ne certăm în fiecare zi', 'Nu mai ieșim la pauză', 'Un adult ne poate ajuta să găsim o soluție care durează.']]
      ],
      boundaries: [
        [['Vrei să îmbrățișezi un coleg.', 'Întreb și respect răspunsul', 'Îl îmbrățișez fără să întreb', 'Insist până acceptă', 'Întrebăm fără să insistăm. Dacă auzim „nu”, ne oprim.'],
          ['Un coleg te gâdilă și tu nu mai vrei.', 'Spun clar „stop”', 'Râd și tac', 'Îl gâdil și eu mai tare', 'Poți spune „stop”. Celălalt trebuie să se oprească.'],
          ['Cineva vrea să se uite în ghiozdanul tău.', 'Spun dacă sunt de acord', 'Îl las, deși nu vreau', 'Îi smulg ghiozdanul din mână', 'Lucrurile tale îți aparțin. Poți spune da sau nu.'],
          ['Un coleg spune „nu vreau să mă joc acum”.', 'Respect ce a spus', 'Insist până acceptă', 'Îi spun că nu mai suntem prieteni', 'Un „nu” se respectă.']],
        [['Un coleg nu vrea să fie fotografiat.', 'Nu fac fotografia', 'O fac pe ascuns', 'Spun că refuzul nu contează', 'Respectăm refuzul unei fotografii.'],
          ['O rudă vrea să te pupe, dar tu nu vrei.', 'Propun în loc un salut', 'Accept chiar dacă nu vreau', 'Fug și mă ascund', 'Poți alege cum saluți; un adult de încredere te susține.'],
          ['Prietenul tău îți spune „nu” la un joc.', 'Accept și propun altceva', 'Mă supăr pe el', 'Insist mereu', 'Un prieten poate spune nu fără să piardă prietenia.'],
          ['Un coleg vrea să-ți citească jurnalul. Nu vrei să-l arăți.', 'Îi spun că nu vreau', 'Îl las deși nu vreau', 'Îi promit că i-l arăt mâine', 'Poți refuza. Tu alegi dacă și cui îi arăți jurnalul.']],
        [['Cineva îți cere să păstrezi un secret care te sperie.', 'Îl spun unui adult de încredere', 'Îl păstrez chiar dacă mi-e frică', 'Cred că este vina mea', 'Poți cere protecție. Nu ești responsabil pentru cererea nepotrivită a altcuiva.'],
          ['Un adult necunoscut îți cere să mergi cu el.', 'Spun nu și merg la un adult cunoscut', 'Merg cu el dacă îmi dă dulciuri', 'Stau și ascult tot ce spune', 'Nu pleci cu necunoscuți. Mergi la un adult de încredere.'],
          ['Cineva te atinge într-un fel care nu-ți place.', 'Spun nu și anunț un adult', 'Tac ca să nu se supere', 'Cred că e vina mea', 'Corpul tău îți aparține. Ai dreptul să spui nu și să ceri ajutor.'],
          ['Ai spus nu, dar te simți vinovat.', 'Știu că am dreptul să spun nu', 'Mă răzgândesc ca să fie bine', 'Îmi cer iertare că am spus nu', 'Este în regulă să spui nu. Nu e nevoie să te simți vinovat.']]
      ],
      group: [
        [['Grupul are trei propuneri de joc.', 'Ascultăm toate propunerile', 'Aleg eu fără discuție', 'Alegem prima propunere, repede', 'Decizia bună începe cu ascultarea.'],
          ['Grupul face un desen împreună.', 'Fiecare desenează o parte', 'Desenez doar eu tot', 'Desenează doar cei mai buni', 'Lucrul în echipă înseamnă că fiecare contribuie.'],
          ['Echipa ta a pierdut un joc.', 'Îi încurajez pe colegi', 'Îl învinovățesc pe unul', 'Plec supărat', 'Încurajarea ajută echipa data viitoare.'],
          ['Grupul trebuie să strângă jucăriile.', 'Ne împărțim treaba', 'Las pe alții să strângă', 'Strâng doar jucăriile mele', 'Împreună terminăm mai repede.']],
        [['Cei mai mulți aleg un joc la care un coleg nu poate participa.', 'Alegem un joc pentru toți', 'Spunem că votul rezolvă orice', 'Îl lăsăm mereu pe dinafară', 'Chiar dacă mulți aleg un joc, ne gândim și la colegul care nu poate participa.'],
          ['Un coleg are o idee bună, dar vorbește încet.', 'Îi cerem să o repete', 'Trecem la ideea următoare', 'Spunem ideea ca a noastră', 'Fiecare idee merită ascultată, chiar dacă e spusă încet.'],
          ['Echipa trebuie să aleagă un căpitan.', 'Votăm după ce ascultăm', 'Se alege singur cel mai înalt', 'Rămâne mereu același căpitan', 'Oricine poate fi căpitan; alegem împreună.'],
          ['Un coleg nu și-a făcut partea din proiect.', 'Îl întrebăm de ce și îl ajutăm', 'Îl dăm imediat afară din grup', 'Spunem tuturor că e un leneș', 'Întrebarea poate arăta o problemă pe care o rezolvăm împreună.']],
        [['Ați testat o regulă nouă, dar nu merge pentru toți.', 'O schimbăm după ce vedem', 'O păstrăm, fiindcă am votat', 'Îi învinovățim pe cei excluși', 'O decizie bună poate fi îmbunătățită după testare.'],
          ['În grup, doi copii decid mereu totul.', 'Propunem să decidem pe rând', 'Lăsăm tot așa, mereu', 'Ne certăm tare cu ei', 'Fiecare copil merită să participe la decizii.'],
          ['Votul este egal: trei la trei.', 'Căutăm o soluție împreună', 'Decide cel care strigă', 'Renunțăm la joc', 'Când votul e egal, discutăm sau facem pe rând.'],
          ['Un coleg are o părere diferită de a grupului.', 'Îl ascultăm și ne gândim', 'Îl obligăm să fie de acord', 'Râdem de părerea lui', 'O părere diferită poate aduce o idee nouă.']]
      ]
    };
    const story = item => {
      const round = this.choice(item[0] + ' Ce alegi?', item.slice(1, 4), 0, item[4],
        mode === 'conditions' ? 'Citește regula încă o dată. Este adevărat ce scrie după „dacă”?' :
          'Gândește-te ce s-ar întâmpla după fiecare alegere. Care este sigură și bună pentru toți?');
      round.kind = 'story';
      return round;
    };
    const entry = bank[mode][level];
    // nivel cu mai multe situații: la fiecare joc se aleg altele; explicația apare după fiecare alegere
    if (Array.isArray(entry[0])) return this.draw(entry, Math.min(3, entry.length)).map(story);
    return [story(entry), this.choice('De ce este potrivită soluția aleasă?', [entry[4], 'Pentru că trebuie să câștig mereu.', 'Pentru că nu contează consecințele.'], 0,
      'Explicația trebuie să se lege de situație, nu de o regulă de tip „câștig cu orice preț”.',
      'Revino la urmarea alegerii și numește nevoia protejată.')];
  },

  // indiciile generale nu ajută un copil: le recunoaștem și le înlocuim cu un pas concret
  generalHint(hint) {
    return !hint || /^(Citește întrebarea încă o dată, rar|Compară fiecare variantă)/.test(hint);
  },
  nudge(q) {
    if (!this.generalHint(q.hint)) return q.hint;
    if (q.passage) return 'Citește textul încă o dată, rar. Răspunsul se află în el.';
    if (q.kind === 'story') return 'Gândește-te ce s-ar întâmpla după fiecare alegere. Care este sigură și bună pentru toți?';
    return 'Citește întrebarea încă o dată, rar. Apoi ia variantele pe rând.';
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
      const listen = container.querySelector('#game-listen-feedback');
      if (listen) listen.hidden = !text;
    };
    // citire vocală: sarcina cu variantele numerotate, apoi mesajul de după răspuns
    const speak = async text => {
      if (typeof Speech === 'undefined') return;
      const problem = await Speech.speak(text, { error: message => { if (!disposed) announce(message, true); } });
      if (problem) announce(problem, true);
    };
    const canSpeak = typeof Speech !== 'undefined' && Speech.supported();
    const taskText = q => {
      const list = nodes => nodes.map(text => Speech.clean(text)).filter(Boolean).join(', ');
      const options = Array.from(container.querySelectorAll('#round-content .quiz-opt'), (node, i) => (i + 1) + ': ' + Speech.clean(node.textContent) + '.');
      const firstSelect = container.querySelector('#round-content .match-select select');
      const parts = [q.prompt, q.passage, q.say ? 'Cuvântul este: ' + q.say + '.' : ''].filter(Boolean).map(text => Speech.clean(text));
      if (q.scene) parts.push(q.scene.split('\n').map((row, index) => 'Rândul ' + (index + 1) + ': ' + Speech.clean(row) + '.').join(' '));
      if (options.length) parts.push('Variantele sunt. ' + options.join(' '));
      if (q.kind === 'experiment') parts.push('Variantele sunt: ' + q.options.map((option, index) => (index + 1) + ': ' + Speech.clean(option)).join('. ') + '.');
      if (q.fields) parts.push('Completează: ' + list(q.fields.map(field => field.label)) + '.');
      if (q.products) parts.push(q.products.map(product => product.name + ': ' + this.quantity(product.price, 'leu', 'lei')).join('. ') + '.');
      if (q.matrix) parts.push('Rândurile sunt: ' + list(q.matrix.forms) + '. Coloanele sunt: ' + list(q.matrix.colors) + '.');
      if (q.kind === 'robot') parts.push('Steaua este la rândul ' + (q.goal.y + 1) + ', coloana ' + (q.goal.x + 1) + '.');
      if (q.kind === 'writing') parts.push(list(q.checklist) + '.');
      parts.push(...Array.from(container.querySelectorAll('#round-content svg[aria-label]'), node => node.getAttribute('aria-label')));
      if (q.kind === 'match' && firstSelect) {
        const left = list((q.pairs || []).map(pair => pair.a)), right = list(Array.from(firstSelect.options).slice(1).map(option => option.textContent));
        parts.push('Cuvintele sunt: ' + left + '.' + (right ? ' Perechile posibile: ' + right + '.' : ''));
      }
      const tokens = list(Array.from(container.querySelectorAll('#round-content .token-pool button'), node => node.textContent));
      if (q.kind === 'arrange' && tokens) parts.push('Piesele de ordonat: ' + tokens + '.');
      if (q.kind === 'hands-punctuate') parts.push('Propozițiile sunt: ' + q.sentences.map((text, i) => (i + 1) + ': ' + text + '.').join(' '));
      if (q.kind === 'hands-routine') parts.push('Activitățile sunt: ' + list(q.cards.map(card => card.text)) + '.');
      return parts.join(' ');
    };
    const check = (correct, detail, explained) => {
      if (solved || disposed) return;
      attempts++;
      if (!correct) {
        errors++;
        const hint = this.nudge(rounds[index]);
        announce((detail || 'Răspunsul nu se potrivește încă.') + (explained || detail && detail.includes(hint) ? '' : ' ' + hint), true);
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
        '<div class="prompt-row"><h3 class="game-prompt" tabindex="-1">' + this.escape(q.prompt) + '</h3>' +
        '<button class="btn btn-listen" id="game-listen" type="button" aria-label="Ascultă sarcina și variantele">🔊 Ascultă</button></div>' +
        '<div id="round-content"></div><p id="game-feedback" class="game-feedback" role="status" aria-live="polite" aria-atomic="true"></p>' +
        '<div class="game-controls">' +
        '<button class="btn btn-listen" id="game-listen-feedback" type="button" hidden aria-label="Ascultă mesajul de sub sarcină">🔊 Ascultă mesajul</button>' +
        '<button class="btn" id="game-hint" type="button">Un indiciu</button>' +
        '<button class="btn btn-primary" id="game-next" type="button" hidden>Continuă</button></div>';
      const content = container.querySelector('#round-content');
      content.dataset.kind = q.kind;
      if (q.passage) {
        const passage = document.createElement('blockquote');
        passage.className = 'reading-passage'; passage.textContent = q.passage; content.appendChild(passage);
        if (q.passage.split('\n').length > 10) {
          passage.classList.add('verse-passage');
          passage.replaceChildren();
          q.passage.split('\n\n').forEach(text => {
            const stanza = document.createElement('p'); stanza.textContent = text; passage.appendChild(stanza);
          });
        }
      }
      if (q.clock) content.insertAdjacentHTML('beforeend', this.clockSVG(q.clock.hour, q.clock.minutes));
      if (q.shape) content.insertAdjacentHTML('beforeend', this.shapeSVG(q.shape, q.rotation));
      if (q.scene) { const scene = document.createElement('div'); scene.className = 'count-scene' + (q.pictureScene ? ' picture-scene' : ''); scene.textContent = q.scene; content.appendChild(scene); }
      if (q.matrix) content.insertAdjacentHTML('beforeend', this.matrixHTML(q.matrix));
      if (q.say) {
        // cuvântul se ascultă; scris apare doar la cerere, ca sarcina să rămână una de auz
        const card = document.createElement('div'); card.className = 'word-card';
        const picture = document.createElement('span'); picture.className = 'word-picture'; picture.setAttribute('aria-hidden', 'true'); picture.textContent = q.picture;
        const word = document.createElement('strong'); word.className = 'word-text'; word.textContent = q.say; word.hidden = true;
        card.appendChild(picture);
        if (canSpeak) card.appendChild(button('🔊 Ascultă cuvântul', () => speak(q.say), 'btn btn-primary btn-listen'));
        const reveal = button('Arată cuvântul scris (pentru adult)', () => { word.hidden = false; reveal.hidden = true; }, 'btn');
        card.appendChild(reveal); card.appendChild(word);
        if (!canSpeak) {
          const note = document.createElement('p'); note.className = 'word-note';
          note.textContent = 'Fără voce română pe dispozitiv: un adult poate citi cuvântul cu voce tare.';
          card.appendChild(note);
        }
        content.appendChild(card);
      }
      let wrongPicks = 0;
      const showChoices = () => {
        const options = document.createElement('div'); options.className = 'quiz-options';
        this.shuffle(q.options.map((option, optionIndex) => ({ option, optionIndex }))).forEach(({ option, optionIndex }) => {
          const node = button(option, () => {
            if (solved) return;
            const correct = optionIndex === q.answer;
            if (correct) { Array.from(options.children).forEach(b => { b.disabled = true; }); node.classList.add('correct'); check(true, ''); return; }
            wrongPicks++;
            node.disabled = true; node.classList.add('wrong');
            const left = Array.from(options.children).filter(b => !b.disabled).length;
            check(false, '„' + option + '” nu este răspunsul bun. ' + (left > 1 ? this.nudge(q) : 'A rămas o singură variantă. Iată de ce este bună: ' + q.explain + ' Apas-o ca să mergi mai departe.'), left <= 1);
          }, 'quiz-opt' + (/^[\p{Extended_Pictographic}\uFE0F\u200D\s]+$/u.test(option) ? ' emoji-opt' : ''));
          options.appendChild(node);
        });
        content.appendChild(options);
      };
      const workshopKind = ['calculation', 'shape-select', 'geoboard', 'symmetry', 'fraction-paint', 'mosaic'].includes(q.kind);
      if (q.kind.indexOf('mission-') === 0) MissionGames.render(content, q, { button, check, announce, isSolved: () => solved });
      else if (q.kind.indexOf('hands-') === 0) HandsOn.render(content, q, { button, check, announce, isSolved: () => solved });
      else if (workshopKind) MathWorkshop.render(content, q, { button, check, announce, isSolved: () => solved });
      else if (['choice', 'story'].includes(q.kind)) {
        if (q.balance) content.insertAdjacentHTML('beforeend', MathWorkshop.balanceHTML(q.balance));
        showChoices();
      }
      else if (q.kind === 'experiment') {
        let selected = null;
        const fieldset = document.createElement('fieldset');
        fieldset.innerHTML = '<legend>Eu cred că…</legend>';
        this.shuffle(q.options.map((option, i) => ({ option, i }))).forEach(({ option, i }) => {
          const label = document.createElement('label'); label.className = 'radio-choice';
          const input = document.createElement('input'); input.type = 'radio'; input.name = 'prediction';
          listen(input, 'change', () => { selected = i; });
          label.appendChild(input); label.appendChild(document.createTextNode(' ' + option)); fieldset.appendChild(label);
        });
        content.appendChild(fieldset);
        content.appendChild(button('▶ Pornește experimentul', () => {
          if (selected === null) { announce('Alege întâi ce crezi tu.', true); return; }
          const observation = document.createElement('p'); observation.className = 'reading-passage'; observation.textContent = q.observation;
          content.appendChild(observation);
          Array.from(fieldset.elements).forEach(input => { input.disabled = true; });
          const correct = selected === q.answer;
          if (!correct) {
            attempts++; errors++;
            announce('Ai ales „' + q.options[selected] + '”. Observația arată altceva. Compară alegerea cu ce s-a văzut, apoi încearcă din nou.', true);
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
        content.appendChild(button('Verifică ceasul', () => check(Number(hour.value) === q.target.hour && Number(minute.value) === q.target.minutes,
          'Ai potrivit ceasul la ' + this.time(Number(hour.value), Number(minute.value)) + '.'), 'btn btn-primary'));
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
          const wrong = selected.findIndex((id, position) => q.tokens[id] !== q.tokens[position]);
          check(wrong === -1, wrong === -1 ? '' : 'La locul ' + (wrong + 1) + ', „' + q.tokens[selected[wrong]] + '” nu se potrivește. Scoate această piesă și caută alta.');
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
          const wrong = q.pairs.findIndex((pair, i) => Number(selections.get(i)) !== i);
          check(wrong === -1, wrong === -1 ? '' : 'Ai legat „' + q.pairs[wrong].a + '” de „' + q.pairs[Number(selections.get(wrong))].b + '”. Mai caută o pereche pentru „' + q.pairs[wrong].a + '”.');
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
        content.appendChild(button('Verifică numărul', () => check(tens === q.tens && units === q.units, 'Ai construit numărul ' + (tens * 10 + units) + '.'), 'btn btn-primary'));
        update();
      } else if (q.kind === 'numberline') {
        const label = document.createElement('label'); label.textContent = 'Poziția pe axă'; label.htmlFor = 'axis-input';
        const input = document.createElement('input'); input.type = 'range'; input.min = 0; input.max = q.max; input.value = q.start;
        input.id = 'axis-input'; input.setAttribute('aria-label', 'Poziția pe axă');
        const track = document.createElement('p'); track.className = 'axis-labels'; track.textContent = '0 ←────────→ ' + q.max;
        content.appendChild(label); content.appendChild(this.rangeControl(input)); content.appendChild(track);
        content.appendChild(button('Verifică poziția', () => {
          check(Number(input.value) === q.answer, 'Ai ales numărul ' + input.value + '.');
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
        const note = document.createElement('p'); note.textContent = 'Recitește ce ai scris. Jocul nu poate verifica dacă povestea are sens. Textul tău nu se păstrează și nu se trimite nimănui.';
        const checks = q.checklist.map((text, i) => {
          const row = document.createElement('label'); row.className = 'radio-choice';
          const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.id = 'writing-check-' + i;
          row.appendChild(checkbox); row.appendChild(document.createTextNode(' ' + text)); return { row, checkbox };
        });
        content.appendChild(label); content.appendChild(input); content.appendChild(note); checks.forEach(item => content.appendChild(item.row));
        content.appendChild(button('Verifică textul', () => {
          const review = this.reviewWriting(input.value, q.minimum, q.minWords);
          if (!review.valid) { announce(review.message, true); return; }
          if (!checks.every(item => item.checkbox.checked)) { announce('Recitește textul. Bifează fiecare rând pe care l-ai verificat. Poți cere ajutor unui adult.', true); return; }
          check(true, 'Ai terminat exercițiul de scriere. La acest joc nu se dau stele.');
        }, 'btn btn-primary'));
      } else throw new Error('Interfață de joc indisponibilă: ' + q.kind);
      const listenTask = container.querySelector('#game-listen'), listenFeedback = container.querySelector('#game-listen-feedback');
      if (listenTask) {
        listen(listenTask, 'click', () => speak(taskText(q)));
        listen(listenFeedback, 'click', () => speak(Speech.clean(container.querySelector('#game-feedback').textContent)));
        cleanup.push(() => Speech.stop());
      }
      listen(container.querySelector('#game-hint'), 'click', () => {
        if (solved) return; hints++; roundHints++; assisted = true;
        const open = Array.from(container.querySelectorAll('#round-content .quiz-opt')).filter(b => !b.disabled);
        const wrong = open.filter(b => b.textContent !== q.options[q.answer]);
        if (roundHints === 1 && this.generalHint(q.hint) && q.options && wrong.length > 1) {
          const out = wrong[0]; out.disabled = true; out.classList.add('wrong');
          announce('Am tăiat o variantă greșită: „' + out.textContent + '”. ' + this.nudge(q), false);
          return;
        }
        announce(roundHints === 1 ? this.nudge(q) : this.nudge(q) + ' Iată cum gândim: ' + q.explain, false);
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
      const practice = !!demo.focus || demo.type === 'mission';
      const result = { level, total: rounds.length, firstCorrect, hints, errors, moves, evaluation: practice ? 'practice' : self ? 'self' : demo.type === 'memory' ? 'practice' : 'objective',
        percent: Math.round(firstCorrect / rounds.length * 100), finishedAt: new Date().toISOString() };
      container.innerHTML = '<h3 tabindex="-1">Ai încheiat runda!</h3><p>' + (practice ? 'Ai exersat un joc în plus, fără stele. Pentru stele, alege „Jocul lecției”.' :
        self ? 'Ai scris și ai recitit. Poți ruga un adult să citească și el povestea ta.' :
        demo.type === 'memory' ? 'Ai exersat o strategie de memorare. Numărul de încercări nu este o notă.' :
          'Ai rezolvat din prima ' + firstCorrect + ' din ' + rounds.length + '. ' + (firstCorrect === rounds.length ? 'Toate corecte!' : 'Pe celelalte le-ai corectat. Așa se învață!')) +
        '</p>' + (hints ? '<p>Indicii folosite: ' + hints + '.</p>' : '') + '<p>Poți lua o pauză, poți juca din nou sau poți alege alt nivel.</p>';
      container.appendChild(button(demo.type === 'mission' ? 'Reia acest caz' : 'Reia cu o rundă nouă', () => {
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
    return { valid: true, message: 'Ai urmat regulile verificate de joc. Recitește textul. Un adult te poate ajuta să verifici dacă are sens și este scris corect.' };
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
