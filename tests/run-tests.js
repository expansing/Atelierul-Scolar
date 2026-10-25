const assert = require('assert');
const { loadContent, validate } = require('../validate-data');
let total = 0;
function test(name, fn) {
  try { fn(); total++; console.log('✓ ' + name); }
  catch (error) { console.error('✗ ' + name); throw error; }
}
function fixture(seed) {
  const storage = new Map(Object.entries(seed || {})), messages = [];
  let unavailable = false;
  const content = loadContent({
    localStorage: {
      getItem(key) { if (unavailable) throw new Error('Storage blocked'); return storage.get(key) || null; },
      setItem(key, value) { if (unavailable) throw new Error('Storage full'); storage.set(key, value); }
    },
    location: { hostname: 'localhost', port: '8080', protocol: 'http:' },
    console: { error(message) { messages.push(message); }, log() {}, warn() {} }
  });
  return Object.assign(content, { storage, messages, block() { unavailable = true; } });
}
function result(overrides) {
  return Object.assign({ level: 0, total: 5, firstCorrect: 4, percent: 80, hints: 0, errors: 1, moves: 0, evaluation: 'objective', finishedAt: '2026-10-16T12:00:00.000Z' }, overrides || {});
}
const data = fixture();
test('76 activities, 228 levels and complete structural content', () => {
  assert.strictEqual(data.ACTIVITIES.length, 76);
  assert.strictEqual(data.LEVELS.length, 3);
  assert.deepStrictEqual(validate(data), []);
});
test('All 42 original activity links survive', () => {
  const counts = { mat: 9, lim: 7, log: 7, inf: 6, sci: 7, civ: 6 };
  Object.keys(counts).forEach(subject => { for (let i = 1; i <= counts[subject]; i++) assert(data.ACTIVITIES.some(a => a.id === subject + '-' + i)); });
});
test('Eight distinct new mechanics are used by real lessons', () => {
  ['placevalue', 'numberline', 'wordbuilder', 'reading', 'experiment', 'story', 'matrix', 'robot'].forEach(type => assert(data.ACTIVITIES.some(a => a.demo.type === type)));
});
test('Every generated round has valid distinct answers across 100 samples per level', () => {
  data.ACTIVITIES.forEach(activity => {
    for (let level = 0; level < 3; level++) for (let n = 0; n < 100; n++) {
      const rounds = data.Engines.rounds(activity.demo, level);
      rounds.forEach(q => {
        assert(q.prompt && q.hint && q.explain);
        if (q.options) {
          assert.strictEqual(new Set(q.options).size, q.options.length);
          assert(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length);
        }
        if (q.kind === 'placevalue') { assert.strictEqual(q.tens * 10 + q.units, q.number); assert(q.units >= 0 && q.units <= 9); }
        if (q.kind === 'numberline') { assert.strictEqual(q.answer, q.subtract ? q.start - q.step : q.start + q.step); assert(q.answer >= 0 && q.answer <= q.max); }
        if (q.kind === 'robot') {
          let x = 0, y = 0;
          while (y < q.goal.y) { y++; assert(!q.blocked.some(p => p.x === x && p.y === y)); }
          while (x < q.goal.x) { x++; assert(!q.blocked.some(p => p.x === x && p.y === y)); }
        }
      });
    }
  });
});
test('Procedural content varies, and counting really reaches 100', () => {
  const numbers = new Set();
  for (let i = 0; i < 1000; i++) numbers.add(data.Engines.generate('placevalue', 'build', 2, i * 3).number);
  assert(numbers.size > 35);
  const random = data.Engines.randInt;
  try {
    data.Engines.randInt = (min, max) => max;
    assert.strictEqual(data.Engines.generate('placevalue', 'build', 2, 0).number, 100);
  } finally { data.Engines.randInt = random; }
  assert(data.Engines.generate('numberline', 'add', 2, 0).max === 100);
});
test('Unknown engines and missing levels fail explicitly', () => {
  assert.throws(() => data.Engines.rounds({ type: 'unknown', levels: [] }, 0), /necunoscut/);
  assert.throws(() => data.Engines.rounds({ type: 'quiz', levels: [] }, 0), /inexistent/);
  assert.throws(() => data.Engines.rounds({ type: 'robot', mode: 'unknown', levels: [{ rounds: 1 }] }, 0), /necunoscut/);
});
test('Math sessions vary the task, not just the numbers', () => {
  ['mat-1', 'mat-2', 'mat-3', 'mat-4', 'mat-9', 'mat-10', 'log-2'].forEach(id => {
    const activity = data.ACTIVITIES.find(a => a.id === id);
    for (let level = 0; level < 3; level++) {
      const rounds = data.Engines.rounds(activity.demo, level);
      assert(new Set(rounds.map(q => q.kind)).size >= (activity.demo.type === 'shapes' ? 4 : 2), id);
    }
  });
  ['measurement', 'fractions'].forEach(type => assert(data.ACTIVITIES.some(a => a.demo.type === type)));
  assert.strictEqual(data.Engines.generate('numberline', 'add', 2, 4).fields.length, 3);
  assert.strictEqual(data.Engines.generate('numberline', 'subtract', 2, 4).fields.length, 3);
});
test('All generated geometry boards have valid solutions and exact tilings', () => {
  const math = data.MathWorkshop;
  for (let level = 0; level < 3; level++) for (let i = 0; i < 150; i++) {
    const q = math.geometry('properties', level, i);
    if (q.kind === 'geoboard') {
      assert(math.validPolygon(q.solution, q.goal));
      assert(math.validPolygon(q.solution.slice().reverse(), q.goal));
      assert(q.solution.every(p => p.x >= 0 && p.y >= 0 && p.x < q.size && p.y < q.size));
    } else if (q.kind === 'symmetry') {
      assert.strictEqual(q.solution.length, q.fixed.length);
      q.fixed.forEach((p, j) => { assert.strictEqual(q.solution[j].x, q.size - 1 - p.x); assert.strictEqual(q.solution[j].y, p.y); });
      assert.strictEqual(new Set(q.solution.map(p => p.x + ':' + p.y)).size, q.solution.length);
    } else if (q.kind === 'mosaic') {
      const cells = q.blocked.slice();
      q.solution.forEach(tile => {
        assert.strictEqual(tile.length, 2);
        assert.strictEqual(Math.abs(tile[0].x - tile[1].x) + Math.abs(tile[0].y - tile[1].y), 1); cells.push(...tile);
      });
      assert.strictEqual(cells.length, q.width * q.height);
      assert.strictEqual(new Set(cells.map(p => p.x + ':' + p.y)).size, cells.length);
      assert(cells.every(p => p.x >= 0 && p.x < q.width && p.y >= 0 && p.y < q.height));
    } else if (q.kind === 'shape-select') {
      assert(q.correct.length > 0 && q.correct.length < q.shapes.length);
      const corners = { circle: 0, triangle: 3, square: 4, rectangle: 4, pentagon: 5, hexagon: 6 };
      const target = Number(q.prompt.match(/cu (\d+) vârfuri/) ? q.prompt.match(/cu (\d+) vârfuri/)[1] : 4);
      q.shapes.forEach((s, j) => assert.strictEqual(q.correct.includes(j), corners[s.shape] === target));
    } else if (q.garden) {
      assert.strictEqual(q.fields[0].answer, q.garden.width * q.garden.height);
      assert.strictEqual(q.fields[1].answer, 2 * (q.garden.width + q.garden.height));
    }
  }
});
test('Polygon validation accepts alternative rotated constructions and rejects degeneracy', () => {
  const valid = data.MathWorkshop.validPolygon.bind(data.MathWorkshop);
  const square = { shape: 'square', area: 8 }, diamond = [{ x: 2, y: 0 }, { x: 4, y: 2 }, { x: 2, y: 4 }, { x: 0, y: 2 }];
  assert(valid(diamond, square));
  assert(valid(diamond.map(p => ({ x: p.x + 1, y: p.y + 1 })), square));
  assert(valid(diamond, { shape: 'rectangle', area: null }));
  assert(!valid(diamond, { shape: 'square', area: 4 }));
  assert(!valid([{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 2, y: 2 }, { x: 0, y: 2 }], { shape: 'rectangle' }));
  assert(!valid([diamond[0], diamond[2], diamond[1], diamond[3]], square));
  assert(!valid([diamond[0], diamond[1], diamond[1], diamond[3]], square));
  assert(!valid([{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }], { shape: 'triangle' }));
  assert(!valid([{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 4 }], { shape: 'rectangle' }));
});
test('Visual arithmetic, measurement, fractions, shopping and balance agree with their models', () => {
  for (let level = 0; level < 3; level++) for (let i = 0; i < 200; i++) {
    const ruler = data.MathWorkshop.measurement(level, i);
    assert.strictEqual(ruler.fields[0].answer, ruler.ruler.end - ruler.ruler.start);
    assert(ruler.ruler.start >= 0 && ruler.ruler.end <= ruler.ruler.max);
    const fraction = data.MathWorkshop.fractions(level, i);
    assert(Number.isInteger(fraction.target) && fraction.target > fraction.initial.length && fraction.target < fraction.parts);
    assert(fraction.parts % fraction.columns === 0);
    assert([1 / 4, 1 / 2, 3 / 4].includes(fraction.target / fraction.parts));
    const shop = data.MathWorkshop.shopping(level, i), cost = shop.products.reduce((sum, p) => sum + p.price, 0);
    if (level === 2 && i % 2) {
      const count = shop.fields[0].answer, price = shop.products[0].price;
      assert(count * price <= shop.budget && (count + 1) * price > shop.budget);
      assert.strictEqual(shop.fields[1].answer, shop.budget - count * price);
    } else {
      assert.strictEqual(shop.fields[0].answer, cost); assert.strictEqual(shop.fields[1].answer, shop.budget - cost);
    }
    const balance = data.MathWorkshop.balance(level, i), model = balance.balance;
    if (level === 0) assert.strictEqual(balance.answer, model.left === model.right ? 2 : model.left > model.right ? 0 : 1);
    else assert.strictEqual(model.left + balance.fields[0].answer * (model.unknowns || 1), model.right);
    ['add', 'subtract'].forEach(mode => {
      const q = data.MathWorkshop.arithmetic(mode, level, i);
      if (q.kind === 'calculation') q.fields.forEach(field => assert(Number.isInteger(field.answer) && field.answer >= 0));
      if (i % 5 === 4 && level > 0) {
        const operands = q.numberCard.match(/^(\d+) [−+] (\d+)/), a = Number(operands[1]), b = Number(operands[2]);
        assert.strictEqual(q.fields[0].answer + q.fields[1].answer, b);
        assert.strictEqual(q.fields[2].answer, mode === 'add' ? a + b : a - b);
        assert.strictEqual((mode === 'add' ? a + q.fields[0].answer : a - q.fields[0].answer) % 10, 0);
      }
    });
  }
});
test('Discovery preserves all explanations, examples, materials and reflection, with local artwork', () => {
  data.ACTIVITIES.forEach(activity => {
    const html = data.Discovery.render(activity);
    activity.explanation.concat(activity.practical.materials, activity.practical.steps, activity.questions[0]).forEach(text => assert(html.includes(data.Engines.escape(text)), activity.id));
    assert(html.includes('data-discovery-lab') && html.includes('<svg') && html.includes('<figcaption>'));
    assert(!html.includes('https://'));
  });
});
test('The bundled handwriting font includes Romanian comma-below letters', () => {
  const font = require('fs').readFileSync(require('path').join(__dirname, '../assets/fonts/playwrite-ro/PlaywriteRO.ttf'));
  const tables = [];
  let cmap;
  for (let i = 0; i < font.readUInt16BE(4); i++) {
    const offset = 12 + i * 16;
    tables.push(font.toString('ascii', offset, offset + 4));
    if (font.toString('ascii', offset, offset + 4) === 'cmap') cmap = font.readUInt32BE(offset + 8);
  }
  assert(cmap, 'Unicode character map');
  assert(tables.includes('GSUB') && tables.includes('fvar'), 'Cursive joining and variable weight tables');
  let table;
  for (let i = 0; i < font.readUInt16BE(cmap + 2); i++) {
    const offset = cmap + 4 + i * 8, start = cmap + font.readUInt32BE(offset + 4);
    if (font.readUInt16BE(start) === 4 && [0, 3].includes(font.readUInt16BE(offset))) table = start;
  }
  assert(table, 'BMP Unicode mapping');
  const count = font.readUInt16BE(table + 6) / 2, ends = table + 14, starts = ends + count * 2 + 2, deltas = starts + count * 2, ranges = deltas + count * 2;
  Array.from('ĂăÂâÎîȘșȚț').forEach(character => {
    const code = character.charCodeAt(0); let glyph = 0;
    for (let i = 0; i < count; i++) if (code >= font.readUInt16BE(starts + i * 2) && code <= font.readUInt16BE(ends + i * 2)) {
      const range = font.readUInt16BE(ranges + i * 2), delta = font.readInt16BE(deltas + i * 2);
      glyph = range ? font.readUInt16BE(ranges + i * 2 + range + (code - font.readUInt16BE(starts + i * 2)) * 2) : code;
      if (glyph) glyph = (glyph + delta) & 65535;
      break;
    }
    assert(glyph !== 0, 'Missing glyph: ' + character);
  });
});
test('Romanian quantities handle singular, plural and de', () => {
  assert.strictEqual(data.Engines.quantity(1, 'leu', 'lei'), '1 leu');
  assert.strictEqual(data.Engines.quantity(2, 'leu', 'lei'), '2 lei');
  assert.strictEqual(data.Engines.quantity(20, 'leu', 'lei'), '20 de lei');
  assert.strictEqual(data.Engines.quantity(100, 'leu', 'lei'), '100 de lei');
  assert(data.MathWorkshop.balanceSVG({ left: 1, right: 2, concealed: false }).includes('1 cub identic'));
  assert(data.MathWorkshop.balanceSVG({ left: 2, right: 3, concealed: true }).includes('1 piesă necunoscută'));
  const random = data.Engines.randInt;
  try {
    data.Engines.randInt = min => min;
    assert(data.MathWorkshop.arithmetic('subtract', 1, 3).prompt.includes('A fost luat 1 jeton.'));
    assert(data.MathWorkshop.arithmetic('add', 1, 3).prompt.includes('A fost adăugat 1 jeton.'));
  } finally { data.Engines.randInt = random; }
});
test('Writing rejects xxx, incomplete and undersized text honestly', () => {
  const review = data.Engines.reviewWriting.bind(data.Engines);
  assert(!review('xxx', 1, 4).valid);
  assert(!review('mara merge în parc.', 1, 4).valid);
  assert(!review('Mara merge în parc', 1, 4).valid);
  assert(!review('Mara merge în parc.', 3, 15).valid);
  assert(review('Mara merge în parc.', 1, 4).valid);
  assert(data.Engines.writingRounds(2)[0].evaluation === 'self');
});
test('Marking a lesson viewed gives no stars or mastery', () => {
  const { Progress: p } = fixture();
  p.markViewed('mat-1'); assert.strictEqual(p.status('mat-1'), 'viewed'); assert.strictEqual(p.totalStars(), 0);
});
test('Visible counters use singular and plural Romanian agreement', () => {
  const { Progress: p, Render: render } = fixture();
  p.record('mat-1', result());
  assert(render.home().includes('1 activitate exersată'));
  assert(render.home().includes('1 stea'));
  assert(!render.home().includes('1 activități'));
});
test('The exact 80% threshold, no hints, and all-three-level mastery', () => {
  const { Progress: p } = fixture();
  p.record('mat-1', result({ percent: 79 })); assert.strictEqual(p.totalStars(), 0);
  p.record('mat-1', result({ hints: 1 })); assert.strictEqual(p.totalStars(), 0);
  assert(p.record('mat-1', result()).newStar); assert.strictEqual(p.totalStars(), 1);
  assert(!p.record('mat-1', result()).newStar); assert.strictEqual(p.totalStars(), 1);
  p.record('mat-1', result({ level: 1 })); assert.strictEqual(p.status('mat-1'), 'practiced');
  p.record('mat-1', result({ level: 2 })); assert.strictEqual(p.status('mat-1'), 'mastered');
  p.record('mat-1', result({ percent: 20, hints: 2 })); assert.strictEqual(p.totalStars(), 3);
});
test('Self-assessment and memory cannot award competency stars', () => {
  const { Progress: p } = fixture();
  p.record('lim-5', result({ percent: 100, evaluation: 'self' }));
  p.record('log-3', result({ percent: 100, evaluation: 'practice' }));
  assert.strictEqual(p.totalStars(), 0); assert.strictEqual(p.status('lim-5'), 'practiced');
});
test('Profiles isolate progress and reset only the active profile', () => {
  const { Progress: p } = fixture();
  p.record('mat-1', result()); p.addProfile('Vulpița'); assert.strictEqual(p.totalStars(), 0);
  p.record('lim-1', result()); p.reset(); assert.strictEqual(p.totalStars(), 0);
  p.selectProfile('learner-1'); assert.strictEqual(p.totalStars(), 1);
});
test('Legacy migration preserves stars but never invents competency', () => {
  const { Progress: p } = fixture({ 'atelier-scolar-progress-v1__localhost:8080': JSON.stringify({ completed: { 'mat-1': true }, stars: 7 }) });
  assert.strictEqual(p.totalStars(), 7); assert.strictEqual(p.status('mat-1'), 'viewed'); assert.strictEqual(p.totalCompleted(), 0);
});
test('Export/import round-trip and invalid-file protection', () => {
  const first = fixture().Progress, second = fixture().Progress;
  first.record('mat-1', result()); first.journeyComplete(2);
  second.importData(first.exportData()); assert.strictEqual(second.exportData(), first.exportData());
  const before = second.exportData();
  assert.throws(() => second.importData('not JSON'));
  assert.throws(() => second.importData(JSON.stringify({ version: 1 })));
  assert.throws(() => second.importData(' '.repeat(2000001)), /mare/);
  assert.strictEqual(second.exportData(), before);
  const invalid = JSON.parse(before); invalid.profiles['learner-1'].activities['mat-1'].levels[0].best = 200;
  assert.throws(() => second.importData(JSON.stringify(invalid)), /invalid/);
});
test('Storage failure is visible and keeps session progress exportable', () => {
  const f = fixture(); f.Progress.load(); f.block();
  assert.strictEqual(f.Progress.markViewed('mat-1'), false);
  assert(f.messages.length); assert(f.Progress.exportData().includes('mat-1'));
});
test('Corrupt stored progress is protected against accidental overwrite', () => {
  const f = fixture({ 'atelier-scolar-progress-v2': '{corrupt' });
  f.Progress.load(); f.Progress.markViewed('mat-1');
  assert.strictEqual(f.storage.get('atelier-scolar-progress-v2'), '{corrupt'); assert(f.messages.length);
});
test('Imported names are escaped, and navigation stays within the discipline', () => {
  const { Progress: p, Render: render } = fixture();
  p.addProfile('<img src=x onerror=alert(1)>');
  assert(!render.settings().includes('<img src=x')); assert(render.settings().includes('&lt;img'));
  assert(!render.home().includes('profile-panel') && !render.home().includes('profile-select'));
  const lastMath = render.activity('mat-12');
  assert(!lastMath.includes('activity=lim-1')); assert(lastMath.includes('subject=mat'));
});
test('Journey completion is profile-scoped and idempotent', () => {
  const { Progress: p } = fixture();
  p.journeyComplete(1); p.journeyComplete(1); assert.strictEqual(p.profile().journey.length, 1);
  p.addProfile('Ariciul'); assert.strictEqual(p.profile().journey.length, 0);
});
test('All lessons have specific vocabulary, visible worked steps, four goals and supported reflection', () => {
  const explanations = new Set(), checks = new Set();
  data.ACTIVITIES.forEach(activity => {
    const detail = activity.detail, html = data.Render.activity(activity.id), speech = data.Discovery.readingText(activity);
    explanations.add(detail.explain); checks.add(detail.check);
    assert.strictEqual(activity.objectives.length, 4);
    assert.strictEqual(activity.reflection.length, 4);
    [detail.explain, detail.check].concat(detail.worked, detail.words.reduce((all, pair) => all.concat(pair), [])).forEach(text => {
      assert(html.includes(data.Engines.escape(text)), activity.id + ': rendered teaching detail');
      assert(speech.includes(text), activity.id + ': spoken teaching detail');
    });
    activity.reflection.forEach(item => {
      assert(html.includes(data.Engines.escape(item.question)) && html.includes(data.Engines.escape(item.support)), activity.id);
    });
    assert.strictEqual((html.match(/class="discovery-column"/g) || []).length, 2);
    assert(!html.includes('<details><summary>Desfacem'), 'Worked steps should not start hidden');
  });
  assert.strictEqual(explanations.size, 76);
  assert.strictEqual(checks.size, 76);
});
test('Selected games produce only the chosen mechanic at every supported level', () => {
  const expected = { draw: 'geoboard', symmetry: 'symmetry', mosaic: 'mosaic', properties: 'shape-select',
    garden: 'calculation', build: 'placevalue', decompose: 'calculation', exchange: 'calculation',
    line: 'numberline', unknown: 'calculation', family: 'calculation', story: 'calculation',
    route: 'robot', debug: 'robot', repeat: 'robot' };
  data.ACTIVITIES.forEach(activity => {
    const options = data.Engines.gameOptions(activity.demo);
    assert.strictEqual(new Set(options.map(option => option.id)).size, options.length);
    options.forEach(option => {
      for (let level = 0; level < 3; level++) {
        const demo = Object.assign({}, activity.demo, { focus: option.id });
        if (level < (option.minLevel || 0)) { assert.throws(() => data.Engines.rounds(demo, level), /disponibil/); continue; }
        for (let sample = 0; sample < 20; sample++) {
          const rounds = data.Engines.rounds(demo, level);
          assert.strictEqual(rounds.length, demo.levels[level].rounds);
          rounds.forEach(q => {
            assert.strictEqual(q.kind, expected[option.id], activity.id + '/' + option.id);
            if (option.id === 'unknown') assert.strictEqual(q.fields.length, 1);
            if (option.id === 'family' || option.id === 'story') assert.strictEqual(q.fields.length, 2);
            if (option.id === 'draw') assert(data.MathWorkshop.validPolygon(q.solution, q.goal));
            if (q.kind === 'robot') {
              assert.strictEqual(q.debug, option.id === 'debug');
              assert.strictEqual(q.repeat, option.id === 'repeat');
            }
          });
        }
      }
    });
    assert.throws(() => data.Engines.rounds(Object.assign({}, activity.demo, { focus: 'invalid' }), 0), /disponibil/);
    if (options.length) assert(data.Render.gameMenu(activity.demo).includes('fără stele'));
  });
});
test('Every lesson adds three genuinely distinct mechanics with three authored situations', () => {
  assert.strictEqual(Object.keys(data.GAME_MISSIONS).length, 76);
  let cases = 0, sessions = 0;
  const contexts = new Set();
  data.ACTIVITIES.forEach(activity => {
    const mission = data.GAME_MISSIONS[activity.id];
    assert.strictEqual(mission.cases.length, 3); cases += mission.cases.length;
    mission.cases.forEach(scenario => contexts.add(scenario.context));
    assert.strictEqual(new Set(mission.cases.map(item => item.context)).size, 3);
    assert.strictEqual((data.Render.gameCards(activity).match(/data-mission-game=/g) || []).length, 4);
    const kinds = new Set();
    data.MissionGames.modes.forEach(mode => {
      const demo = data.MissionGames.demo(activity.id, mode);
      for (let level = 0; level < 3; level++) {
        const rounds = data.Engines.rounds(demo, level);
        assert.strictEqual(rounds.length, 1);
        assert.strictEqual(rounds[0].scenario.context, mission.cases[level].context);
        assert.strictEqual(rounds[0].kind, 'mission-' + mode);
        assert(rounds[0].explain.includes(mission.cases[level].check.correct));
        assert(rounds[0].passage && rounds[0].hint && rounds[0].prompt);
        kinds.add(rounds[0].kind); sessions++;
      }
    });
    assert.strictEqual(kinds.size, 3);
  });
  assert.strictEqual(cases, 228); assert.strictEqual(contexts.size, 228); assert.strictEqual(sessions, 684);
  assert.throws(() => data.MissionGames.demo('missing', 'evidence'), /necunoscut/);
  assert.throws(() => data.MissionGames.demo('mat-1', 'unknown'), /necunoscut/);
  assert.throws(() => data.MissionGames.rounds({ activityId: 'mat-1', mode: 'plan' }, 3), /inexistent/);
});
test('Missing missions, duplicate goals and ambiguous case choices fail structural validation', () => {
  const broken = fixture();
  delete broken.GAME_MISSIONS['mat-1'];
  assert(validate(broken).some(error => error.includes('acopere exact toate lecțiile')));
  const mission = broken.GAME_MISSIONS['mat-2'], scenario = mission.cases[0];
  mission.titles.repair = mission.titles.evidence;
  scenario.facts[0].text = scenario.facts[1].text;
  scenario.error.wrong = scenario.plan[scenario.error.index];
  scenario.check.wrong[0] = scenario.check.correct;
  const errors = validate(broken);
  ['minimum trei jocuri noi', 'dovezi incomplete', 'reparație invalidă', 'verificări incomplete'].forEach(text => {
    assert(errors.some(error => error.includes(text)), text);
  });
});
test('Personal development preserves old IDs and adds six authored three-level lessons', () => {
  assert.strictEqual(data.SUBJECTS.find(subject => subject.id === 'civ').title, 'Dezvoltare personală');
  for (let i = 1; i <= 15; i++) assert(data.ACTIVITIES.some(activity => activity.id === 'civ-' + i));
  const added = data.ACTIVITIES.filter(activity => activity.subject === 'civ' && activity.num >= 10 && activity.num <= 15);
  assert.strictEqual(added.length, 6);
  assert(new Set(added.map(activity => activity.demo.type)).size >= 3);
  added.forEach(activity => {
    assert(['quiz', 'arrange', 'match', 'classify'].includes(activity.demo.type));
    assert.strictEqual(new Set(activity.demo.levels.map(level => JSON.stringify(level))).size, 3);
  });
});
test('Explorations explain the concrete activity instead of asking an undefined change', () => {
  data.ACTIVITIES.forEach(activity => {
    const exploration = data.Discovery.exploration(activity), html = data.Discovery.render(activity);
    assert(exploration.title && exploration.context);
    assert(!html.includes('Dar dacă schimbi ceva?'));
    if (activity.subject === 'mat') assert.strictEqual(exploration.steps.length, 3);
    else {
      assert(html.includes(data.Engines.escape(activity.explanation[1])));
      assert(exploration.context.includes('nu trebuie să scrii în pagină'));
    }
  });
});
test('New profiles default to readable text and validated independent preferences', () => {
  const { Progress: p, Preferences: preferences } = fixture();
  assert.strictEqual(preferences.get(p.profile()).font, 'readable');
  assert.strictEqual(preferences.get(p.profile()).size, 100);
  p.record('civ-1', result()); p.journeyComplete(2);
  const chosen = Object.assign({}, preferences.defaults(), { font: 'handwriting', size: 150, avatar: 'fox', theme: 'dark', sound: false, motion: true, level: 2 });
  assert(p.updateProfile('Vulpea curioasă', chosen));
  chosen.size = 100;
  assert.strictEqual(p.profile().preferences.size, 150);
  assert.strictEqual(p.totalStars(), 1);
  assert.strictEqual(p.profile().journey[0], 2);
  p.addProfile('Ariciul');
  assert.strictEqual(p.profile().preferences.font, 'readable');
  assert.strictEqual(p.profile().preferences.level, 0);
  p.selectProfile('learner-1');
  assert.strictEqual(p.profile().name, 'Vulpea curioasă');
  assert.strictEqual(p.profile().preferences.level, 2);
  p.reset();
  assert.strictEqual(p.totalStars(), 0);
  assert.strictEqual(p.profile().preferences.font, 'handwriting');
});
test('Preferences survive persistence, export/import and old profiles without settings', () => {
  const f = fixture(), p = f.Progress;
  p.markViewed('civ-1');
  p.updateProfile('Țestoasa', Object.assign({}, f.Preferences.defaults(), { font: 'serif', size: 125 }));
  const exported = p.exportData();
  p.cache = null;
  assert.strictEqual(p.exportData(), exported);
  const imported = fixture();
  imported.Progress.importData(exported);
  assert.strictEqual(imported.Progress.exportData(), exported);
  const legacy = JSON.parse(exported);
  delete legacy.profiles['learner-1'].preferences;
  const migrated = fixture({ 'atelier-scolar-progress-v2': JSON.stringify(legacy), 'atelier-scolar-theme': 'dark', 'atelier-scolar-sound': 'off' });
  assert.strictEqual(migrated.Progress.profile().preferences.theme, 'dark');
  assert.strictEqual(migrated.Progress.profile().preferences.sound, false);
  assert.strictEqual(migrated.Progress.profile().preferences.font, 'readable');
  assert.strictEqual(migrated.Progress.status('civ-1'), 'viewed');
  imported.Progress.importData(JSON.stringify(legacy));
  assert.strictEqual(imported.Preferences.get(imported.Progress.profile()).font, 'readable');
});
test('Malformed preference imports and invalid pseudonyms cannot overwrite profiles', () => {
  const { Progress: p, Preferences: preferences } = fixture();
  const before = p.exportData();
  const invalidValues = { font: 'unknown', size: 1000, theme: 'unknown', sound: 'yes', motion: 1, level: 3, avatar: 'https://example.com/avatar' };
  Object.keys(invalidValues).forEach(key => {
    const invalid = JSON.parse(before);
    invalid.profiles['learner-1'].preferences[key] = invalidValues[key];
    assert.throws(() => p.importData(JSON.stringify(invalid)), /invalide/);
    assert.strictEqual(p.exportData(), before);
  });
  assert.throws(() => p.updateProfile('   ', preferences.defaults()), /pseudonim/);
  assert.strictEqual(p.exportData(), before);
});
test('Settings failures are visible and session preferences remain exportable', () => {
  const f = fixture(); f.Progress.load(); f.block();
  const saved = f.Progress.updateProfile('Explorator', Object.assign({}, f.Preferences.defaults(), { size: 150 }));
  assert.strictEqual(saved, false);
  assert(f.messages.length);
  assert.strictEqual(JSON.parse(f.Progress.exportData()).profiles['learner-1'].preferences.size, 150);
});
test('Every app page exposes settings and loads preferences before progress', () => {
  const fs = require('fs'), path = require('path');
  ['index', 'subject', 'activity', 'dece', 'settings'].forEach(name => {
    const html = fs.readFileSync(path.join(__dirname, '..', name + '.html'), 'utf8');
    assert(html.includes('href="settings.html"'));
    assert(html.includes('id="active-profile"'));
    const scripts = Array.from(html.matchAll(/<script src="([^"]+)"/g), match => match[1].split('?')[0]);
    assert(scripts.indexOf('assets/js/lesson-details.js') > scripts.indexOf('assets/js/data.js'));
    assert(scripts.indexOf('assets/js/lesson-details.js') < scripts.indexOf('assets/js/discovery.js'));
    assert(scripts.indexOf('assets/js/preferences.js') < scripts.indexOf('assets/js/progress.js'));
  });
});
test('All app pages and the browser harness request the same explicit asset release', () => {
  const fs = require('fs'), path = require('path'), versions = new Set();
  ['index.html', 'subject.html', 'activity.html', 'dece.html', 'settings.html', 'tests/browser.html'].forEach(name => {
    const html = fs.readFileSync(path.join(__dirname, '..', name), 'utf8');
    const assets = Array.from(html.matchAll(/(?:src|href)="([^"]+\.(?:js|css)(?:\?[^"]*)?)"/g), match => match[1]);
    assert(assets.length >= 11, name + ': missing assets');
    assets.forEach(asset => {
      assert(/\?v=[A-Za-z0-9-]+$/.test(asset), name + ': unversioned asset ' + asset);
      versions.add(asset.split('?v=')[1]);
      assert(fs.existsSync(path.resolve(__dirname, '..', path.dirname(name), asset.split('?')[0])), asset);
    });
  });
  assert.strictEqual(versions.size, 1, 'Mixed releases can break lesson rendering and the active profile header');
});
test('Thinking pathway preserves existing lessons and connects four logic and two personal lessons', () => {
  assert.strictEqual(data.ACTIVITIES_BY_SUBJECT.log.length, 14);
  assert.strictEqual(data.ACTIVITIES_BY_SUBJECT.civ.length, 17);
  for (let i = 1; i <= 15; i++) assert(data.ACTIVITIES.some(activity => activity.id === 'civ-' + i));
  for (let i = 1; i <= 10; i++) assert(data.ACTIVITIES.some(activity => activity.id === 'log-' + i));
  assert.strictEqual(JSON.stringify(data.THINKING_PATH.activities), JSON.stringify(['log-11', 'log-12', 'log-13', 'log-14', 'civ-16', 'civ-17']));
  ['log', 'civ'].forEach(subject => data.THINKING_PATH.activities.forEach(id => {
    assert(data.Render.subject(subject).includes('href="activity.html?activity=' + id + '"'));
  }));
  assert(!data.Render.subject('mat').includes('thinking-path'));
  data.THINKING_PATH.activities.forEach(id => {
    const html = data.Render.activity(id);
    assert(html.includes('href="activity.html?activity=' + id + '" aria-current="page"'));
    assert(data.Discovery.render(data.ACTIVITIES.find(activity => activity.id === id)).includes('Povestea de la care pornim'));
  });
});
test('Critical thinking lessons assess explicit cases and support independent reasoning in adult guidance', () => {
  const prompts = new Set();
  data.THINKING_PATH.activities.forEach(id => {
    const activity = data.ACTIVITIES.find(item => item.id === id);
    assert.strictEqual(activity.demo.type, 'quiz');
    activity.demo.levels.forEach(level => {
      assert.strictEqual(level.questions.length, 3);
      level.questions.forEach(question => {
        assert(!prompts.has(question.prompt), 'Repeated critical thinking question');
        prompts.add(question.prompt);
        assert(question.explain.length > 30 && question.hint.length > 15);
      });
    });
    assert(activity.parent.help.some(text => text.includes('fără ridiculizare, pedeapsă')));
    assert(activity.parent.help.some(text => text.includes('Nu știu încă')));
    assert(activity.parent.support.some(text => text.includes('copilul nu trebuie să convingă')));
  });
  assert.strictEqual(prompts.size, 54);
});
test('Critical thinking correct answers include uncertainty, adult errors and independent preferences', () => {
  const answers = id => data.ACTIVITIES.find(activity => activity.id === id).demo.levels.reduce((all, level) =>
    all.concat(level.questions.map(question => question.options[question.answer])), []);
  assert(answers('log-11').some(answer => answer.includes('Nu știm încă')));
  assert(answers('log-12').some(answer => answer.includes('numărăm creioanele și putem corecta')));
  assert(answers('log-14').some(answer => answer.includes('Nu am verificat încă suficient')));
  assert(answers('civ-16').some(answer => answer.includes('o preferință diferită nu este o greșeală')));
  assert(answers('civ-17').some(answer => answer.includes('Hai să verificăm. Ai dreptate, am greșit')));
  assert(answers('civ-17').some(answer => answer.includes('să ceară ajutor unui adult')));
});
test('New thinking results coexist with old progress and survive export/import', () => {
  const first = fixture().Progress, second = fixture().Progress;
  first.record('mat-1', result());
  first.markViewed('civ-1');
  data.THINKING_PATH.activities.forEach(id => {
    first.markViewed(id);
    first.record(id, result({ level: 0, hints: 1, percent: 100 }));
    assert.strictEqual(first.status(id), 'practiced');
  });
  assert.strictEqual(first.totalStars(), 1, 'Guided thinking practice does not earn independent stars');
  second.importData(first.exportData());
  assert.strictEqual(second.exportData(), first.exportData());
  assert.strictEqual(second.status('civ-1'), 'viewed');
  assert.strictEqual(second.entry('mat-1').levels[0].mastered, true);
  data.THINKING_PATH.activities.forEach(id => assert.strictEqual(second.entry(id).levels[0].hints, 1));
});
test('Romanian lessons draw a different set of tasks on replay', () => {
  data.ACTIVITIES.filter(a => a.subject === 'lim' && a.demo.type !== 'type').forEach(activity => {
    [0, 1, 2].forEach(level => {
      const seen = new Set(), sizes = new Set();
      for (let i = 0; i < 60; i++) {
        const rounds = data.Engines.rounds(activity.demo, level);
        sizes.add(rounds.length);
        rounds.forEach(q => seen.add(JSON.stringify([q.prompt, q.say, q.passage, q.tokens, (q.pairs || []).map(p => p.a).sort()])));
      }
      const config = activity.demo.levels[level];
      if (config.rounds && ['quiz', 'arrange', 'classify', 'wordbuilder'].includes(activity.demo.type)) assert(sizes.size === 1 && sizes.has(config.rounds), activity.id + '/' + level + ': ' + config.rounds + ' sarcini pe joc');
      const per = Math.max(...sizes);
      assert(seen.size > per, activity.id + '/' + level + ': aceleași ' + per + ' sarcini la fiecare reluare');
    });
  });
});
test('Sound questions carry a word and a picture, and rhyme levels have no rhymes across pairs', () => {
  const lim1 = data.ACTIVITIES.find(a => a.id === 'lim-1');
  lim1.demo.levels.forEach((config, level) => {
    const sounds = config.questions.filter(q => q.say);
    assert(sounds.length >= 8, 'lim-1/' + level + ': prea puține cuvinte de ascultat');
    sounds.forEach(q => assert(q.picture && !q.prompt.includes(q.say), 'lim-1: cuvântul ' + q.say + ' nu trebuie scris în cerință'));
  });
  const ending = word => word.slice(-3);
  data.ACTIVITIES.find(a => a.id === 'lim-4').demo.levels.forEach((config, level) => {
    const endings = config.pairs.map(pair => ending(pair.a));
    assert.strictEqual(new Set(endings).size, endings.length, 'lim-4/' + level + ': două perechi au același final (' + endings + ')');
  });
});
test('Every page applies saved preferences in the head and names the learning path consistently', () => {
  const fs = require('fs'), path = require('path');
  ['index', 'subject', 'activity', 'dece', 'settings'].forEach(name => {
    const html = fs.readFileSync(path.join(__dirname, '..', name + '.html'), 'utf8');
    const head = html.slice(0, html.indexOf('</head>'));
    assert(head.indexOf('assets/js/early-preferences.js') !== -1, name + ': early preferences missing from <head>');
    assert(head.indexOf('assets/js/early-preferences.js') < head.indexOf('assets/css/main.css'), name + ': preferences must apply before styles');
    assert(html.includes('href="dece.html"'), name + ': no link to the learning path');
    assert(!html.includes('De ce învățăm'), name + ': old learning path name');
  });
});
test('The service worker caches every asset the pages load', () => {
  const fs = require('fs'), path = require('path');
  const sw = fs.readFileSync(path.join(__dirname, '..', 'sw.js'), 'utf8');
  const listed = new Set(Array.from(sw.matchAll(/'(assets\/[^']+)'/g), match => match[1]));
  ['index', 'subject', 'activity', 'dece', 'settings'].forEach(name => {
    const html = fs.readFileSync(path.join(__dirname, '..', name + '.html'), 'utf8');
    assert(sw.includes("'" + name + ".html'"), 'sw.js does not cache ' + name + '.html');
    Array.from(html.matchAll(/(?:src|href)="(assets\/[^"?]+)\?v=/g), match => match[1])
      .forEach(asset => assert(listed.has(asset), 'sw.js does not cache ' + asset + ' (loaded by ' + name + '.html)'));
  });
  const css = fs.readFileSync(path.join(__dirname, '..', 'assets/css/main.css'), 'utf8');
  Array.from(css.matchAll(/url\('\.\.\/([^']+)'\)/g), match => 'assets/' + match[1])
    .forEach(asset => assert(listed.has(asset), 'sw.js does not cache ' + asset + ' (used by main.css)'));
});
console.log('\n' + total + ' groups passed. Generated content tested over ' + (data.ACTIVITIES.length * 3 * 100).toLocaleString('en-US') + ' lesson-level samples.');
