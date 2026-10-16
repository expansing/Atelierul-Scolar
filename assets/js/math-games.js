/* Sarcini de construcție. Soluțiile geometrice se verifică prin proprietăți. */
const MathWorkshop = {
  handles(type, mode) {
    return ['numberline', 'shapes', 'measurement', 'fractions', 'balance', 'shop'].includes(type) || (type === 'gen' && mode === 'two-step');
  },
  calculation(prompt, fields, explain, hint, extra) {
    return Object.assign({ kind: 'calculation', prompt, fields, explain, hint }, extra || {});
  },
  generate(type, mode, level, index) {
    if (type === 'shapes') return this.geometry(mode, level, index);
    if (type === 'measurement') return this.measurement(level, index);
    if (type === 'fractions') return this.fractions(level, index);
    if (type === 'numberline') return this.arithmetic(mode, level, index);
    if (type === 'shop') return this.shopping(level, index);
    if (type === 'balance') return this.balance(level, index);
    if (type === 'gen' && mode === 'two-step') return this.story(level, index);
    throw new Error('Atelier matematic necunoscut: ' + type);
  },
  arithmetic(mode, level, index) {
    const subtract = mode === 'subtract', limit = [10, 30, 100][level];
    if (level > 0 && index % 5 === 4) {
      const units = Engines.randInt(3, 8), base = (level === 1 ? 1 : Engines.randInt(1, 7)) * 10, a = base + units;
      const gap = subtract ? units : 10 - units, b = Engines.randInt(gap + 1, gap + 5), answer = subtract ? a - b : a + b;
      return this.calculation('Calculează în doi pași: ' + a + (subtract ? ' − ' : ' + ') + b + '. Ajungi întâi la ' + (subtract ? base : base + 10) + ', apoi continui cu ce a rămas.',
        [{ label: 'Cât ' + (subtract ? 'scazi' : 'adaugi') + ' întâi ca să ajungi la ' + (subtract ? base : base + 10) + '?', answer: gap },
          { label: 'Cât mai rămâne de ' + (subtract ? 'scăzut' : 'adăugat') + '?', answer: b - gap }, { label: 'Rezultatul final', answer }],
        b + ' = ' + gap + ' + ' + (b - gap) + '. ' + a + (subtract ? ' − ' : ' + ') + gap + ' = ' + (subtract ? base : base + 10) +
          ', apoi ' + (subtract ? base + ' − ' : (base + 10) + ' + ') + (b - gap) + ' = ' + answer + '.',
        'Caută cât lipsește până la numărul care se termină cu 0. Folosește doar partea rămasă în al doilea pas.', { numberCard: a + (subtract ? ' − ' : ' + ') + b + ' → ' + (subtract ? base : base + 10) + ' → ?' });
    }
    const a = Engines.randInt(level === 0 ? 3 : 12, limit - 1);
    const b = Engines.randInt(1, subtract ? Math.min(a - 1, [5, 12, 35][level]) : Math.min(limit - a, [5, 12, 35][level]));
    const answer = subtract ? a - b : a + b, sign = subtract ? '−' : '+';
    const explain = a + ' ' + sign + ' ' + b + ' = ' + answer + '. Verificăm prin ' + (subtract ? answer + ' + ' + b + ' = ' + a : answer + ' − ' + b + ' = ' + a) + '.';
    if (index % 4 === 0) return { kind: 'numberline', prompt: 'Un salt, un plan: ' + a + ' ' + sign + ' ' + b + '. Unde ajungi pe axă?',
      start: a, step: b, subtract, answer, max: limit, explain, hint: 'Pornește de la ' + a + ' și fă ' + b + ' pași ' + (subtract ? 'înapoi.' : 'înainte.') };
    if (index % 4 === 1) return this.calculation('Detectivul numărului ascuns: ' + a + ' ' + sign + ' □ = ' + answer + '.',
      [{ label: 'Ce număr lipsește?', answer: b }], explain, 'Folosește operația inversă. Reprezintă diferența pe axă.', { numberCard: a + ' ' + sign + ' ? = ' + answer });
    if (index % 4 === 2) {
      const first = subtract ? answer : a, second = b;
      const total = subtract ? a : answer;
      return this.calculation('Completează familia de operații pornind de la aceleași trei numere.',
        [{ label: first + ' + ' + second + ' =', answer: total }, { label: total + ' − ' + first + ' =', answer: second }],
        first + ' + ' + second + ' = ' + total + ', iar ' + total + ' − ' + first + ' = ' + second + '.',
        'Întregul este suma celor două părți. Acoperă pe rând o parte.', { bars: [first, second] });
    }
    const change = Engines.randInt(1, Math.min(5, answer));
    return this.calculation('În atelier erau ' + Engines.quantity(a, 'jeton', 'jetoane') + '. ' +
      (subtract ? (b === 1 ? 'A fost luat ' : 'Au fost luate ') : (b === 1 ? 'A fost adăugat ' : 'Au fost adăugate ')) +
      Engines.quantity(b, 'jeton', 'jetoane') + '. Apoi mai primești ' + change + '. Construiește calculul în doi pași.',
      [{ label: 'Câte sunt după prima schimbare?', answer }, { label: 'Câte sunt la final?', answer: answer + change }],
      explain + ' Apoi ' + answer + ' + ' + change + ' = ' + (answer + change) + '.',
      'Nu combina toate numerele din prima. Păstrează rezultatul fiecărei schimbări.', { numberCard: a + ' → ' + (subtract ? '−' : '+') + b + ' → +' + change });
  },
  story(level, index) {
    const a = Engines.randInt(6, [10, 25, 60][level]), b = Engines.randInt(2, [5, 9, 18][level]), c = Engines.randInt(1, Math.min(a, 5 + level * 3));
    const stories = [
      ['Ai ' + Engines.quantity(a, 'timbru', 'timbre') + '. Primești ' + b + ', apoi oferi ' + c + '.', a + b, a + b - c, a + ' + ' + b, '− ' + c],
      ['În autobuz sunt ' + Engines.quantity(a, 'călător', 'călători') + '. Coboară ' + c + ', apoi urcă ' + b + '.', a - c, a - c + b, a + ' − ' + c, '+ ' + b],
      ['Un raft are ' + Engines.quantity(a, 'carte', 'cărți') + ', iar altul are cu ' + b + ' mai multe. Câte cărți are al doilea raft și câte sunt pe ambele?', a + b, a * 2 + b, a + ' + ' + b, '+ ' + a]
    ];
    const story = stories[index % stories.length];
    return this.calculation(story[0], [{ label: index % 3 === 2 ? 'Cărți pe al doilea raft' : 'Rezultatul primului pas', answer: story[1] }, { label: 'Rezultatul final', answer: story[2] }],
      'Primul pas: ' + story[3] + ' = ' + story[1] + '. Al doilea: ' + story[1] + ' ' + story[4] + ' = ' + story[2] + '.',
      'Desenează câte o stare pentru fiecare moment. Nu confunda o comparație cu o schimbare.', { numberCard: 'Observă → reprezintă → calculează → verifică' });
  },
  shopping(level, index) {
    const products = [
      { name: 'Caiet', icon: 'notebook', price: Engines.randInt(3, 8) },
      { name: 'Creion', icon: 'pencil', price: Engines.randInt(1, 4) },
      { name: 'Carte', icon: 'book', price: Engines.randInt(6, 14) }
    ].slice(0, level === 0 ? 1 : level === 1 ? 2 : 3);
    const total = products.reduce((sum, p) => sum + p.price, 0), paid = Math.ceil(total / 10) * 10 + 10;
    if (level === 2 && index % 2) {
      const budget = Engines.randInt(20, 45), price = products[0].price, quantity = Math.floor(budget / price);
      return this.calculation('Ai ' + budget + ' de lei pentru caiete identice, de ' + Engines.quantity(price, 'leu', 'lei') + ' fiecare. Cumpără cât mai multe fără să depășești bugetul.',
        [{ label: 'Numărul maxim de caiete', answer: quantity }, { label: 'Bani rămași', answer: budget - quantity * price }],
        quantity + ' × ' + price + ' = ' + quantity * price + '. Încă un caiet ar depăși bugetul de ' + budget + ' de lei.',
        'Adună repetat prețul până când următorul caiet nu mai încape în buget.', { products: [products[0]], budget });
    }
    return this.calculation('Pregătește bonul cumpărăturilor. Iei câte un produs din fiecare fel și dai la plată ' + paid + ' de lei.',
      [{ label: 'Costul tuturor produselor', answer: total }, { label: 'Restul primit', answer: paid - total }],
      'Adunăm prețurile: ' + products.map(p => p.price).join(' + ') + ' = ' + total + '. Restul: ' + paid + ' − ' + total + ' = ' + (paid - total) + '.',
      'Scrie întâi totalul bonului, apoi compară cu suma dată.', { products, budget: paid });
  },
  balance(level, index) {
    const a = Engines.randInt(2, [8, 18, 35][level]), delta = Engines.randInt(1, 7);
    const b = index % 3 === 0 ? a : index % 3 === 1 ? a + delta : Math.max(1, a - delta);
    if (level === 0) return Engines.choice('Cuburile sunt identice. În stânga: ' + Engines.quantity(a, 'cub', 'cuburi') + '. În dreapta: ' + Engines.quantity(b, 'cub', 'cuburi') + '. Ce observi la balanță?',
      ['Coboară stânga', 'Coboară dreapta', 'Rămâne în echilibru'], a > b ? 0 : b > a ? 1 : 2,
      'Comparăm ' + a + ' cu ' + b + '. ' + (a === b ? 'Cantitățile sunt egale.' : 'Talerul cu mai multe cuburi identice coboară.'),
      'Nu presupune că dreapta este mereu mai grea. Compară ambele cantități.', { balance: { left: a, right: b, concealed: false } });
    const known = Engines.randInt(2, 9), missing = Engines.randInt(2, level === 1 ? 10 : 25);
    if (level === 1 || index % 2 === 0) return this.calculation('Balanța trebuie să fie în echilibru. Află masa piesei cu semnul întrebării, exprimată în unități.',
      [{ label: 'Masa piesei necunoscute', answer: missing }],
      known + ' + ' + missing + ' = ' + (known + missing) + '. Piesa necunoscută completează diferența.',
      'Înlătură mental aceeași cantitate cunoscută din ambele talere.',
      { balance: { left: known, right: known + missing, concealed: true } });
    return this.calculation('Două piese identice cu semnul întrebării și ' + known + ' unități echilibrează ' + (known + missing * 2) + ' unități. Cât are o singură piesă?',
      [{ label: 'Masa unei piese', answer: missing }],
      'Scădem ' + known + ': rămân ' + missing * 2 + ' unități pentru două piese. Împărțim în două grupe egale: ' + missing + '.',
      'Află întâi cât cântăresc împreună cele două piese, apoi împarte egal.',
      { balance: { left: known, right: known + missing * 2, concealed: true, unknowns: 2 } });
  },
  measurement(level, index) {
    const start = level === 0 ? 0 : Engines.randInt(2, 6), length = Engines.randInt(3, [9, 12, 14][level]);
    if (level < 2 || index % 2 === 0) return this.calculation('Rigla nu trebuie ghicită: citește cele două capete ale benzii și află lungimea.',
      [{ label: 'Lungimea benzii, în centimetri', answer: length }],
      'Capătul final este la ' + (start + length) + ' cm, începutul la ' + start + ' cm: ' + (start + length) + ' − ' + start + ' = ' + length + ' cm.',
      'Lungimea este distanța dintre repere, nu întotdeauna numărul de la capătul din dreapta.', { ruler: { start, end: start + length, max: 22 } });
    const cut = Engines.randInt(1, length - 1);
    return this.calculation('Măsoară panglica din desen. Apoi taie mental ' + cut + ' cm și calculează cât rămâne.',
      [{ label: 'Lungimea inițială, în cm', answer: length }, { label: 'Lungimea rămasă, în cm', answer: length - cut }],
      'Lungimea inițială: ' + (start + length) + ' − ' + start + ' = ' + length + ' cm. Apoi ' + length + ' − ' + cut + ' = ' + (length - cut) + ' cm.',
      'Fă întâi măsurarea de la reperul de început, apoi scăderea.', { ruler: { start, end: start + length, max: 22 } });
  },
  fractions(level, index) {
    const parts = level === 0 ? (index % 2 ? 4 : 2) : level === 1 ? (index % 3 ? 4 : 8) : (index % 3 ? 8 : 16);
    const target = level === 0 ? parts / 2 : level === 1 ? parts / (index % 2 ? 2 : 4) : parts * (index % 2 ? 3 / 4 : 1 / 2);
    const initial = level === 2 ? Array.from({ length: parts / 4 }, (_, i) => i) : [];
    return { kind: 'fraction-paint', parts, target, initial, columns: level === 0 ? 2 : 4,
      prompt: level === 0 ? 'Colorează o jumătate din foaie. Părțile au aceeași mărime.' :
        level === 1 ? 'Colorează ' + (target * 2 === parts ? 'o jumătate' : 'un sfert') + ' din foaia împărțită în ' + parts + ' părți egale.' :
          'Un sfert este deja colorat. Completează până la ' + (target * 2 === parts ? 'o jumătate' : 'trei sferturi') + ' din întreg, fără să ștergi modelul.',
      explain: 'Ai colorat ' + target + ' din ' + parts + ' părți egale. ' + (target * 2 === parts ? 'Acestea formează o jumătate.' : target * 4 === parts ? 'Aceasta este un sfert.' : 'Părțile colorate reprezintă trei sferturi.'),
      hint: 'Toate părțile sunt egale. Numără câte părți trebuie să fie colorate în total, nu doar câte adaugi.' };
  },
  geometry(mode, level, index) {
    const offset = mode === 'objects' ? 1 : mode === 'riddle' ? 2 : 0;
    const variant = (index + offset) % (level === 0 ? 4 : 5);
    if (variant === 0) {
      const target = level === 0 ? 'triangle' : index % 2 ? 'rectangle' : 'square', size = level === 0 ? 4 : 6;
      const width = Engines.randInt(2, size - 1), height = target === 'square' ? width : Engines.randInt(1, size - 2);
      const solution = target === 'triangle' ? [{ x: 0, y: 0 }, { x: width, y: 0 }, { x: 0, y: 2 }] :
        [{ x: 0, y: 0 }, { x: width, y: 0 }, { x: width, y: height }, { x: 0, y: height }];
      const area = level === 2 ? width * height : null;
      return { kind: 'geoboard', size, goal: { shape: target, area }, solution,
        prompt: 'Arhitect pe grilă: construiește ' + (target === 'triangle' ? 'un triunghi' : target === 'square' ? 'un pătrat' : 'un dreptunghi') +
          (area ? ' care acoperă ' + Engines.quantity(area, 'pătrățel', 'pătrățele') : '') + '. Sunt acceptate toate construcțiile corecte.',
        explain: 'Am verificat laturile, unghiurile, conturul fără încrucișări' + (area ? ' și suprafața de ' + Engines.quantity(area, 'pătrățel', 'pătrățele') : '') + '. Poziția și orientarea pot fi diferite.',
        hint: 'Alege vârfurile pe rând de-a lungul conturului. Pentru un pătrat, laturile sunt egale și unghiurile sunt drepte.' };
    }
    if (variant === 1) {
      const size = [6, 6, 8][level], half = size / 2, points = [];
      const candidates = [];
      for (let y = 0; y < size - 1; y++) for (let x = 0; x < half; x++) candidates.push({ x, y });
      Engines.shuffle(candidates).slice(0, 3 + level * 2).forEach(p => points.push(p));
      return { kind: 'symmetry', size, fixed: points, solution: points.map(p => ({ x: size - 1 - p.x, y: p.y })),
        prompt: 'Oglinda atelierului: completează desenul în partea dreaptă. Fiecare pătrățel trebuie să fie la aceeași distanță de linia din mijloc.',
        explain: 'Piesele sunt pe același rând și la distanțe egale de axa verticală. Reflexia nu este doar mutarea desenului spre dreapta.',
        hint: 'Pornește de lângă axă. Numără același număr de pătrățele în partea cealaltă.' };
    }
    if (variant === 2) {
      const width = [3, 4, 5][level], height = [2, 3, 4][level], solution = [];
      for (let y = 0; y < height; y++) for (let x = 0; x + 1 < width; x += 2) solution.push([{ x, y }, { x: x + 1, y }]);
      if (width % 2) for (let y = 0; y < height; y += 2) solution.push([{ x: width - 1, y }, { x: width - 1, y: y + 1 }]);
      const blocked = level === 2 ? solution.splice(Engines.randInt(0, solution.length - 1), 1)[0] : [];
      return { kind: 'mosaic', width, height, blocked, solution,
        prompt: 'Pavator de mozaic: acoperă toate pătrățelele libere cu piese de câte două pătrățele. Fără suprapuneri și fără spații.',
        explain: 'Fiecare piesă acoperă exact două pătrățele vecine. Poți găsi și alte pavări decât modelul inițial.',
        hint: 'Alege orientarea, apoi primul pătrățel al piesei. Dacă te blochezi, scoate o piesă și încearcă altă așezare.' };
    }
    if (variant === 3) {
      const catalog = ['triangle', 'square', 'rectangle', 'pentagon', 'circle', 'hexagon'];
      const shapes = Engines.shuffle(catalog).map((shape, i) => ({ shape, rotation: Engines.randInt(0, 11) * 30, variant: Engines.randInt(0, 5), id: i }));
      const corners = { triangle: 3, square: 4, rectangle: 4, pentagon: 5, circle: 0, hexagon: 6 };
      const target = level === 0 ? 4 : level === 1 ? Engines.pick([3, 4, 5, 6]) : 4;
      const correct = shapes.map((s, i) => ({ s, i })).filter(item => level === 2 ? ['square', 'rectangle'].includes(item.s.shape) : corners[item.s.shape] === target).map(item => item.i);
      return { kind: 'shape-select', shapes, correct,
        prompt: level === 2 ? 'Colecționar de proprietăți: selectează toate figurile cu patru unghiuri drepte. Un pătrat este și un dreptunghi.' :
          'Selectează toate figurile cu ' + target + ' vârfuri. Culoarea, mărimea și rotirea nu schimbă numărul de vârfuri.',
        explain: 'Am verificat proprietatea fiecărei figuri, nu asemănarea cu un singur desen memorat.',
        hint: 'Urmărește conturul fiecărei figuri. Pot exista mai multe răspunsuri corecte.' };
    }
    const width = Engines.randInt(2, 6), height = Engines.randInt(2, 5);
    return this.calculation('Grădina are ' + width + ' pătrățele pe lungime și ' + height + ' pe lățime. Numără suprafața și drumul de jur împrejur.',
      [{ label: 'Pătrățele în interior', answer: width * height }, { label: 'Laturi de pătrățel pe contur', answer: 2 * (width + height) }],
      'Suprafața: ' + width + ' × ' + height + ' = ' + width * height + '. Conturul: ' + width + ' + ' + height + ' + ' + width + ' + ' + height + ' = ' + 2 * (width + height) + '.',
      'Interiorul se numără pe rânduri. Conturul este doar drumul de pe margine.', { garden: { width, height } });
  },
  polygonArea(points) {
    return Math.abs(points.reduce((sum, p, i) => { const next = points[(i + 1) % points.length]; return sum + p.x * next.y - next.x * p.y; }, 0)) / 2;
  },
  validPolygon(points, goal) {
    if (points.length !== (goal.shape === 'triangle' ? 3 : 4)) return false;
    if (new Set(points.map(p => p.x + ':' + p.y)).size !== points.length) return false;
    const cross = (a, b, c) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    const turns = points.map((p, i) => cross(p, points[(i + 1) % points.length], points[(i + 2) % points.length]));
    if (!turns.every(v => v > 0) && !turns.every(v => v < 0)) return false;
    if (goal.area !== null && goal.area !== undefined && this.polygonArea(points) !== goal.area) return false;
    if (goal.shape === 'triangle') return true;
    const vectors = points.map((p, i) => ({ x: points[(i + 1) % 4].x - p.x, y: points[(i + 1) % 4].y - p.y }));
    if (!vectors.every((v, i) => v.x * vectors[(i + 1) % 4].x + v.y * vectors[(i + 1) % 4].y === 0)) return false;
    return goal.shape !== 'square' || vectors.every(v => v.x * v.x + v.y * v.y === vectors[0].x * vectors[0].x + vectors[0].y * vectors[0].y);
  },
  rulerSVG(ruler) {
    let ticks = '';
    for (let i = 0; i <= ruler.max; i++) ticks += '<path d="M' + (22 + i * 20) + ' 80v' + (i % 5 ? 10 : 18) + '"/><text x="' + (22 + i * 20) + '" y="116" text-anchor="middle">' + i + '</text>';
    return '<svg class="math-illustration ruler-illustration" viewBox="0 0 490 140" role="img" aria-label="Bandă de la reperul ' + ruler.start + ' cm la reperul ' + ruler.end + ' cm."><rect x="15" y="76" width="455" height="52" rx="8" fill="#ffdc87"/>' +
      '<rect x="' + (22 + ruler.start * 20) + '" y="28" width="' + (ruler.end - ruler.start) * 20 + '" height="30" rx="6" fill="#378a80"/><g stroke="#26324f" fill="#26324f" font-size="12">' + ticks + '</g></svg>';
  },
  rulerHTML(ruler) {
    return '<div class="ruler-model">' + this.rulerSVG(ruler) + '<div class="measurement-readings"><p>Început<strong>' + ruler.start + ' cm</strong></p>' +
      '<p>Sfârșit<strong>' + ruler.end + ' cm</strong></p></div></div>';
  },
  balanceSVG(data) {
    const tilt = data.concealed ? 0 : Math.max(-12, Math.min(12, (data.right - data.left) * 3));
    const offset = 120 * Math.sin(tilt * Math.PI / 180), leftY = 105 - offset, rightY = 105 + offset;
    const pan = (x, y, side, count) => {
      let objects = '';
      if (!data.concealed) {
        for (let i = 0; i < count; i++) {
          const columns = Math.min(5, count), cx = -(columns * 18) / 2 + i % 5 * 18;
          objects += '<rect class="balance-cube" x="' + cx + '" y="' + (79 - Math.floor(i / 5) * 18) + '" width="16" height="16" rx="2" fill="#e2a050" stroke="#754918" stroke-width="1.5"/>';
        }
      } else {
        const pieces = side === 'left' ? [String(count)].concat(Array(data.unknowns || 1).fill('?')) : [String(count)];
        pieces.forEach((piece, i) => {
          const px = -pieces.length * 19 + i * 38;
          objects += '<rect x="' + px + '" y="55" width="34" height="40" rx="5" fill="' + (piece === '?' ? '#c7b5e4' : '#f1cb80') + '" stroke="#53647c" stroke-width="2"/>' +
            '<text class="balance-weight-label" x="' + (px + 17) + '" y="83" text-anchor="middle" fill="#25304b" font-size="23">' + piece + '</text>';
        });
      }
      return '<g class="balance-pan" data-side="' + side + '" data-quantity="' + count + '" transform="translate(' + x + ' ' + y + ')">' +
        '<path d="M0 0L-64 100M0 0l64 100" fill="none" stroke="#53647c" stroke-width="3"/>' + objects +
        '<path d="M-64 100H64l-20 22h-88z" fill="#65b7ac" stroke="#276b60" stroke-width="2"/></g>';
    };
    return '<svg class="math-illustration balance-illustration" viewBox="0 0 460 310" role="img" data-left="' + data.left + '" data-right="' + data.right + '" data-angle="' + tilt + '" aria-label="Stânga: ' +
      (data.concealed ? Engines.quantity(data.left, 'unitate', 'unități') + ' plus ' + Engines.quantity(data.unknowns || 1, 'piesă necunoscută', 'piese necunoscute') : Engines.quantity(data.left, 'cub identic', 'cuburi identice')) +
      '. Dreapta: ' + Engines.quantity(data.right, data.concealed ? 'unitate' : 'cub identic', data.concealed ? 'unități' : 'cuburi identice') + '.">' +
      '<path d="M210 286l20-181 20 181z" fill="#e6ad61"/><path d="M110 ' + leftY + 'L350 ' + rightY + '" stroke="#34415e" stroke-width="8" stroke-linecap="round"/>' +
      pan(110, leftY, 'left', data.left) + pan(350, rightY, 'right', data.right) +
      '<circle cx="230" cy="105" r="7" fill="#34415e"/><rect x="180" y="286" width="100" height="12" rx="6" fill="#34415e"/></svg>';
  },
  balanceHTML(data) {
    const unknown = data.concealed ? ' + ' + Array(data.unknowns || 1).fill('?').join(' + ') : '';
    return '<div class="balance-model">' + this.balanceSVG(data) + '<div class="balance-readings">' +
      '<p><span>Stânga</span><strong>' + (data.concealed ? data.left + unknown : Engines.quantity(data.left, 'cub', 'cuburi')) + '</strong></p>' +
      '<p><span>Dreapta</span><strong>' + Engines.quantity(data.right, data.concealed ? 'unitate' : 'cub', data.concealed ? 'unități' : 'cuburi') + '</strong></p>' +
      '</div></div>';
  },
  render(content, q, api) {
    const { button, check, announce, isSolved } = api;
    if (q.ruler) content.insertAdjacentHTML('beforeend', this.rulerHTML(q.ruler));
    if (q.balance) content.insertAdjacentHTML('beforeend', this.balanceHTML(q.balance));
    if (q.bars) content.insertAdjacentHTML('beforeend', '<div class="part-whole" aria-label="Două părți ale aceluiași întreg">' + q.bars.map(value => '<span style="flex:' + value + '">' + value + '</span>').join('') + '</div>');
    if (q.numberCard) { const note = document.createElement('p'); note.className = 'math-postcard'; note.textContent = q.numberCard; content.appendChild(note); }
    if (q.products) {
      const shop = document.createElement('div'); shop.className = 'market-products';
      q.products.forEach(product => {
        const card = document.createElement('article');
        card.innerHTML = this.productSVG(product.icon) + '<h4>' + product.name + '</h4><p>' + Engines.quantity(product.price, 'leu', 'lei') + '</p>';
        shop.appendChild(card);
      });
      content.appendChild(shop);
    }
    if (q.garden) {
      const garden = document.createElement('div'); garden.className = 'garden-grid'; garden.style.gridTemplateColumns = 'repeat(' + q.garden.width + ', minmax(0, 1fr))';
      garden.setAttribute('role', 'img'); garden.setAttribute('aria-label', q.garden.width + ' coloane și ' + q.garden.height + ' rânduri de pătrățele.');
      for (let i = 0; i < q.garden.width * q.garden.height; i++) { const cell = document.createElement('span'); cell.textContent = '✿'; garden.appendChild(cell); }
      content.appendChild(garden);
    }
    if (q.kind === 'calculation') {
      const form = document.createElement('form'); form.className = 'calculation-form'; form.noValidate = true;
      const inputs = q.fields.map((field, i) => {
        const label = document.createElement('label'); label.textContent = field.label;
        const input = document.createElement('input'); input.type = 'text'; input.inputMode = 'numeric'; input.pattern = '[0-9]+'; input.maxLength = 4;
        input.autocomplete = 'off'; input.id = 'math-answer-' + i; input.setAttribute('aria-label', field.label);
        label.appendChild(input); form.appendChild(label); return input;
      });
      const verify = button('Verifică planul', () => {});
      verify.type = 'submit'; verify.classList.add('btn-primary'); form.appendChild(verify);
      form.addEventListener('submit', event => {
        event.preventDefault(); if (isSolved()) return;
        if (inputs.some(input => !/^\d+$/.test(input.value.trim()))) { announce('Completează fiecare răspuns cu un număr întreg, fără litere sau semne.', true); return; }
        check(inputs.every((input, i) => Number(input.value) === q.fields[i].answer));
      });
      content.appendChild(form); return true;
    }
    if (q.kind === 'shape-select') {
      const selected = new Set(), gallery = document.createElement('div'); gallery.className = 'shape-gallery';
      q.shapes.forEach((shape, i) => {
        const card = button('', () => {
          if (isSolved()) return;
          if (selected.has(i)) selected.delete(i); else selected.add(i);
          card.setAttribute('aria-pressed', String(selected.has(i))); card.classList.toggle('chosen', selected.has(i));
        }, 'shape-card');
        card.innerHTML = Engines.shapeSVG(shape.shape, shape.rotation, shape.variant) + '<span>Figura ' + (i + 1) + '</span>';
        card.setAttribute('aria-pressed', 'false'); gallery.appendChild(card);
      });
      content.appendChild(gallery);
      content.appendChild(button('Verifică selecția', () => check(selected.size === q.correct.length && q.correct.every(i => selected.has(i))), 'btn btn-primary'));
      return true;
    }
    if (q.kind === 'geoboard') {
      let points = [], closed = false;
      const vertices = q.goal.shape === 'triangle' ? 3 : 4;
      const guide = document.createElement('section'); guide.className = 'drawing-guide';
      guide.innerHTML = '<h4>Cum desenezi? Apasă, nu trage.</h4>' +
        '<svg viewBox="0 0 180 72" role="img" aria-label="Aleg primul punct, apoi al doilea. Între ele apare o linie."><path d="M30 36h120" stroke="#276b60" stroke-width="4"/>' +
        '<circle cx="30" cy="36" r="19" fill="#276b60"/><circle cx="150" cy="36" r="19" fill="#276b60"/><g fill="white" font-size="22" text-anchor="middle"><text x="30" y="44">1</text><text x="150" y="44">2</text></g></svg>' +
        '<ol><li>Apasă un punct: acesta este primul colț.</li><li>Alege pe rând celelalte colțuri. Liniile apar singure.</li>' +
        '<li>După ' + vertices + ' colțuri, apasă „Închide conturul”, apoi „Verifică figura”.</li></ol>';
      content.appendChild(guide);
      const board = document.createElement('div'); board.className = 'geoboard'; board.style.setProperty('--grid-size', q.size);
      const drawing = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      drawing.setAttribute('viewBox', '0 0 ' + q.size * 40 + ' ' + q.size * 40); drawing.setAttribute('aria-hidden', 'true');
      const status = document.createElement('p'); status.setAttribute('role', 'status');
      const close = button('Închide conturul', () => {
        if (isSolved() || points.length !== vertices || closed) return;
        closed = true; update();
      });
      const verify = button('Verifică figura', () => {
        if (!closed) return;
        const correct = this.validPolygon(points, q.goal);
        const detail = correct ? '' : q.goal.area && this.polygonArea(points) !== q.goal.area ?
          'Conturul trebuie să acopere ' + Engines.quantity(q.goal.area, 'pătrățel', 'pătrățele') + '. Numără pătrățelele din interior și schimbă un colț.' :
          q.goal.shape === 'triangle' ? 'Cele trei colțuri nu trebuie să fie pe aceeași linie. Mută un colț și încearcă din nou.' :
            'Verifică fiecare colț: trebuie să fie ca un colț al foii.' + (q.goal.shape === 'square' ? ' La pătrat, toate cele patru laturi trebuie să fie egale.' : '');
        check(correct, detail); update();
      }, 'btn btn-primary');
      const update = () => {
        let gridLines = '';
        for (let i = 0; i < q.size; i++) gridLines += '<path d="M20 ' + (20 + i * 40) + 'H' + (q.size * 40 - 20) + 'M' + (20 + i * 40) + ' 20V' + (q.size * 40 - 20) + '"/>';
        drawing.innerHTML = '<g fill="none" stroke="#b9c2b5" stroke-width="1">' + gridLines + '</g>' +
          (points.length ? '<' + (closed ? 'polygon' : 'polyline') + ' class="drawn-outline" points="' + points.map(p => (20 + p.x * 40) + ',' + (20 + p.y * 40)).join(' ') +
          '" fill="' + (closed ? '#77bcaf66' : 'none') + '" stroke="#276b60" stroke-width="3" stroke-linejoin="round"/>' : '');
        board.querySelectorAll('button').forEach(node => {
          const index = points.findIndex(p => p.x === Number(node.dataset.x) && p.y === Number(node.dataset.y));
          node.setAttribute('aria-pressed', String(index !== -1)); node.textContent = index === -1 ? '·' : String(index + 1);
          node.classList.toggle('first-peg', index === 0); node.disabled = isSolved();
        });
        close.disabled = isSolved() || closed || points.length !== vertices; verify.disabled = isSolved() || !closed;
        status.textContent = closed ? 'Contur închis. ' + (isSolved() ? 'Figura este corectă.' : 'Acum poți verifica figura.') +
          (q.goal.area ? ' Suprafață (pătrățele): ' + this.polygonArea(points).toLocaleString('ro-RO') + '.' : '') :
          points.length === 0 ? 'Pasul 1: apasă primul colț pe grilă.' :
            points.length < vertices ? 'Ai ales ' + points.length + ' din ' + vertices + ' colțuri. Apasă următorul colț.' :
              'Ai ales toate cele ' + vertices + ' colțuri. Apasă „Închide conturul” sau apasă din nou punctul 1.';
      };
      board.appendChild(drawing);
      for (let y = 0; y < q.size; y++) for (let x = 0; x < q.size; x++) {
        const node = button('●', () => {
          if (isSolved()) return;
          if (points.length === vertices && points[0].x === x && points[0].y === y && !closed) { closed = true; update(); return; }
          if (points.some(p => p.x === x && p.y === y)) { announce('Acest vârf este deja ales. Folosește „Înapoi un vârf” pentru a corecta.', true); return; }
          if (points.length >= vertices) { announce('Ai ales toate colțurile. Închide conturul sau folosește „Înapoi un vârf” pentru a schimba ultimul colț.', true); return; }
          points.push({ x, y }); update();
        }, 'peg');
        node.dataset.x = x; node.dataset.y = y; node.setAttribute('aria-label', 'Rândul ' + (y + 1) + ', coloana ' + (x + 1)); node.setAttribute('aria-pressed', 'false'); board.appendChild(node);
      }
      content.appendChild(board); content.appendChild(status);
      const actions = document.createElement('div'); actions.className = 'game-controls';
      actions.appendChild(button('Înapoi un vârf', () => { if (!isSolved()) { points.pop(); closed = false; update(); } }));
      actions.appendChild(button('Golește grila', () => { if (!isSolved()) { points = []; closed = false; update(); } }));
      actions.appendChild(close); actions.appendChild(verify);
      content.appendChild(actions); update(); return true;
    }
    if (q.kind === 'symmetry' || q.kind === 'fraction-paint') {
      const symmetry = q.kind === 'symmetry', selected = new Set((q.initial || []).map(String));
      const grid = document.createElement('div'); grid.className = symmetry ? 'symmetry-grid' : 'fraction-grid';
      const size = symmetry ? q.size : q.parts, columns = symmetry ? q.size : q.columns;
      grid.style.gridTemplateColumns = 'repeat(' + columns + ', minmax(0, 1fr))';
      for (let i = 0; i < (symmetry ? size * (size - 1) : q.parts); i++) {
        const x = i % columns, y = Math.floor(i / columns), fixed = symmetry ? x < size / 2 : (q.initial || []).includes(i);
        const active = symmetry ? q.fixed.some(p => p.x === x && p.y === y) : fixed;
        const node = button(symmetry ? '' : String(i + 1), () => {
          if (fixed || isSolved()) return;
          if (selected.has(String(i))) selected.delete(String(i)); else selected.add(String(i));
          node.classList.toggle('painted', selected.has(String(i))); node.setAttribute('aria-pressed', String(selected.has(String(i))));
          node.textContent = selected.has(String(i)) ? '✓' : symmetry ? '' : String(i + 1);
        }, 'paint-cell' + (active ? ' painted' : ''));
        node.setAttribute('aria-label', symmetry ? 'Rândul ' + (y + 1) + ', coloana ' + (x + 1) + (fixed ? ', model' : '') : 'Partea ' + (i + 1) + ' din ' + q.parts);
        if (active) node.textContent = '✓';
        node.setAttribute('aria-pressed', String(active)); node.disabled = fixed;
        if (symmetry && x === size / 2) node.classList.add('mirror-edge');
        node.dataset.cell = i; grid.appendChild(node);
      }
      content.appendChild(grid);
      content.appendChild(button(symmetry ? 'Verifică oglindirea' : 'Verifică părțile', () => {
        const expected = symmetry ? q.solution.map(p => String(p.y * size + p.x)) : null;
        check(symmetry ? selected.size === expected.length && expected.every(key => selected.has(key)) : selected.size === q.target);
      }, 'btn btn-primary'));
      return true;
    }
    if (q.kind === 'mosaic') {
      let tiles = [];
      const label = document.createElement('label'); label.textContent = 'Orientarea piesei';
      const orientation = document.createElement('select'); orientation.setAttribute('aria-label', 'Orientarea piesei');
      orientation.appendChild(new Option('Orizontală', 'horizontal')); orientation.appendChild(new Option('Verticală', 'vertical')); label.appendChild(orientation);
      const board = document.createElement('div'); board.className = 'mosaic-grid'; board.style.gridTemplateColumns = 'repeat(' + q.width + ', 1fr)';
      const update = () => board.querySelectorAll('button').forEach(node => {
        const x = Number(node.dataset.x), y = Number(node.dataset.y), tile = tiles.findIndex(t => t.some(p => p.x === x && p.y === y));
        node.textContent = node.disabled ? '×' : tile === -1 ? '·' : String(tile + 1);
        node.classList.toggle('covered', tile !== -1); node.style.setProperty('--tile-color', ['#76baad', '#efbd75', '#d3a4bf', '#9eafe0'][Math.max(0, tile) % 4]);
        node.setAttribute('aria-pressed', String(tile !== -1));
        node.setAttribute('aria-label', 'Rândul ' + (y + 1) + ', coloana ' + (x + 1) + (node.disabled ? ', în afara suprafeței' : tile === -1 ? ', liber' : ', piesa ' + (tile + 1)));
      });
      for (let y = 0; y < q.height; y++) for (let x = 0; x < q.width; x++) {
        const node = button('·', () => {
          if (isSolved()) return;
          const occupied = tiles.findIndex(tile => tile.some(p => p.x === x && p.y === y));
          if (occupied !== -1) { tiles.splice(occupied, 1); update(); return; }
          const second = { x: x + (orientation.value === 'horizontal' ? 1 : 0), y: y + (orientation.value === 'vertical' ? 1 : 0) };
          if (second.x >= q.width || second.y >= q.height || q.blocked.some(p => p.x === second.x && p.y === second.y) || tiles.some(t => t.some(p => p.x === second.x && p.y === second.y))) {
            announce('Piesa nu încape aici fără suprapunere. Schimbă orientarea sau locul.', true); return;
          }
          tiles.push([{ x, y }, second]); update();
        }, 'mosaic-cell');
        node.dataset.x = x; node.dataset.y = y; node.disabled = q.blocked.some(p => p.x === x && p.y === y);
        node.setAttribute('aria-label', 'Rândul ' + (y + 1) + ', coloana ' + (x + 1) + (node.disabled ? ', în afara suprafeței' : '')); board.appendChild(node);
      }
      content.appendChild(label); content.appendChild(board);
      const instruction = document.createElement('p'); instruction.textContent = 'Apasă o piesă așezată pentru a o scoate. Numerele identice arată cele două jumătăți ale aceleiași piese.'; content.appendChild(instruction);
      content.appendChild(button('Verifică mozaicul', () => check(tiles.length * 2 === q.width * q.height - q.blocked.length), 'btn btn-primary'));
      update(); return true;
    }
    return false;
  },
  productSVG(icon) {
    const inside = icon === 'pencil' ? '<g transform="rotate(32 60 50)"><path d="M50 15h20v60l-10 18-10-18z" fill="#f1bf62"/><path d="M50 15h20v12H50z" fill="#df8b96"/><path d="M55 84l5 9 5-9" fill="#34415e"/></g>' :
      '<rect x="28" y="14" width="65" height="80" rx="6" fill="' + (icon === 'book' ? '#7cb8ad' : '#b1bde8') + '"/><path d="M39 15v79" stroke="#34415e" stroke-width="3"/><path d="M49 38h32m-32 12h32m-32 12h23" stroke="#fff" stroke-width="4"/>';
    return '<svg viewBox="0 0 120 105" class="product-art" aria-hidden="true">' + inside + '</svg>';
  }
};
