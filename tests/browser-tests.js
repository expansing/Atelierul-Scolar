(function () {
  'use strict';
  const fixture = document.getElementById('fixture'), output = document.getElementById('test-results'), results = [];
  const originalKey = Progress.storageKey;
  const temporaryKey = 'atelier-test-' + Date.now() + '-' + Math.random().toString(36).slice(2);
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const test = (name, fn) => {
    try { fn(); results.push({ name, passed: true }); }
    catch (error) { console.error(name, error); results.push({ name, passed: false, error: error.message }); }
  };
  window.Sound = { good() {}, bad() {}, win() {} };
  function start(demo, level, callback) { return Engines.start(fixture, demo, level || 0, callback || (() => {})); }
  function click(text) {
    const button = Array.from(fixture.querySelectorAll('button')).find(node => node.textContent === text && !node.hidden);
    assert(button, 'Buton negăsit: ' + text); button.click(); return button;
  }
  try {
    Progress.storageKey = temporaryKey;
    Progress.cache = Progress.empty();
    localStorage.setItem(temporaryKey, JSON.stringify(Progress.cache));
    test('All ' + ACTIVITIES.length * 3 + ' lesson-level interfaces initialize without an exception', () => {
      ACTIVITIES.forEach(activity => { for (let level = 0; level < 3; level++) { const game = start(activity.demo, level); assert(fixture.querySelector('.game-prompt'), activity.id); game.dispose(); } });
    });
    test('All complete rounds and selected game sessions can be completed through their real controls', () => {
      const factory = Engines.rounds;
      let questions;
      Engines.rounds = function (demo, level) { questions = factory.call(this, demo, level); return questions; };
      try {
        const sessions = ACTIVITIES.slice();
        ACTIVITIES.forEach(activity => Engines.gameOptions(activity.demo).forEach(option => {
          sessions.push({ id: activity.id + '/' + option.id, demo: Object.assign({}, activity.demo, { focus: option.id }), minLevel: option.minLevel || 0 });
        }));
        ACTIVITIES.forEach(activity => MissionGames.modes.forEach(mode => {
          sessions.push({ id: activity.id + '/mission-' + mode, demo: MissionGames.demo(activity.id, mode) });
        }));
        let completed = 0;
        sessions.forEach(activity => {
          for (let level = 0; level < 3; level++) {
            if (level < (activity.minLevel || 0)) continue;
            let result;
            const game = start(activity.demo, level, value => { result = value; });
            questions.forEach(q => {
              if (q.clock) {
                const hands = fixture.querySelectorAll('.learning-clock line');
                assert(hands[0].getAttribute('transform') === 'rotate(' + ((q.clock.hour % 12) * 30 + q.clock.minutes / 2) + ' 100 100)', activity.id + ': acul scurt corespunde orei');
                assert(hands[1].getAttribute('transform') === 'rotate(' + q.clock.minutes * 6 + ' 100 100)', activity.id + ': acul lung corespunde minutelor');
              }
              if (q.ruler) {
                const band = fixture.querySelector('.ruler-illustration > rect:nth-child(2)');
                assert(Number(band.getAttribute('x')) === 22 + q.ruler.start * 20, activity.id + ': începutul benzii');
                assert(Number(band.getAttribute('width')) === (q.ruler.end - q.ruler.start) * 20, activity.id + ': lungimea desenată');
                const labels = fixture.querySelectorAll('.measurement-readings strong');
                assert(labels[0].textContent === q.ruler.start + ' cm' && labels[1].textContent === q.ruler.end + ' cm', activity.id + ': repere lizibile');
              }
              if (q.kind === 'mission-evidence') {
                q.scenario.facts.forEach((fact, i) => { if (fact.relevant) fixture.querySelector('[data-fact="' + i + '"]').click(); });
                click('Verifică dovezile');
              } else if (q.kind === 'mission-repair') {
                fixture.querySelector('[data-repair-step="' + q.scenario.error.index + '"]').click();
                fixture.querySelector('[data-correct="true"]').click(); click('Verifică reparația');
              } else if (q.kind === 'mission-plan') {
                for (let i = 0; i < 3; i++) fixture.querySelector('[data-plan-token="' + i + '"]').click();
                click('Verifică planul construit');
                assert(fixture.querySelector('#game-next').hidden, 'Planul singur nu încheie jocul înainte de verificarea rezultatului');
                fixture.querySelector('[data-correct="true"]').click(); click('Verifică rezultatul planului');
              }
              if (q.kind === 'shape-select') {
                fixture.querySelectorAll('.shape-card svg').forEach((svg, i) => {
                  const vertices = svg.querySelector('circle') ? 0 : svg.querySelector('rect') ? 4 : svg.querySelector('polygon').points.numberOfItems;
                  assert(vertices === { circle: 0, triangle: 3, square: 4, rectangle: 4, pentagon: 5, hexagon: 6 }[q.shapes[i].shape], activity.id + ': conturul desenat are proprietățile cerute');
                });
              }
              if (q.garden) assert(fixture.querySelectorAll('.garden-grid > span').length === q.garden.width * q.garden.height, activity.id + ': suprafața desenată');
              if (q.matrix) {
                const rows = fixture.querySelectorAll('.learning-matrix tbody tr');
                assert(rows.length === q.matrix.forms.length, activity.id + ': rânduri');
                assert(rows[q.matrix.row].querySelectorAll('td')[q.matrix.col].textContent === '❓', activity.id + ': piesa lipsește la intersecția cerută');
              }
              if (q.kind === 'experiment') {
                const radio = Array.from(fixture.querySelectorAll('input[type=radio]')).find(input => input.parentElement.textContent.trim() === q.options[q.answer]);
                assert(radio, 'Predicție disponibilă'); radio.checked = true; radio.dispatchEvent(new Event('change'));
                click('Pornește modelul și observă');
              }
              if (['choice', 'story', 'experiment'].includes(q.kind)) click(q.options[q.answer]);
              else if (q.kind === 'arrange') {
                q.tokens.forEach(token => {
                  const node = Array.from(fixture.querySelector('.token-pool').children).find(b => b.textContent === token && !b.disabled);
                  assert(node, activity.id + ': token disponibil'); node.click();
                });
                click('Verifică ordinea');
              } else if (q.kind === 'match') {
                fixture.querySelectorAll('select').forEach((select, i) => { select.value = String(i); select.dispatchEvent(new Event('change')); });
                click('Verifică perechile');
              } else if (q.kind === 'placevalue') {
                for (let i = 0; i < q.tens; i++) click('+ un grup de 10');
                for (let i = 0; i < q.units; i++) click('+ o unitate');
                assert(fixture.querySelectorAll('.rod-segments > i').length === q.tens * 10 && fixture.querySelectorAll('.unit-dot').length === q.units, activity.id + ': fiecare grup desenat conține zece unități');
                click('Verifică numărul');
              } else if (q.kind === 'numberline') {
                const input = fixture.querySelector('input[type=range]'); input.value = q.answer; input.dispatchEvent(new Event('input')); click('Verifică poziția');
              } else if (q.kind === 'calculation') {
                fixture.querySelectorAll('.calculation-form input').forEach((input, i) => { input.value = q.fields[i].answer; });
                click('Verifică planul');
              } else if (q.kind === 'geoboard') {
                q.solution.forEach(p => fixture.querySelector('.peg[data-x="' + p.x + '"][data-y="' + p.y + '"]').click());
                click('Închide conturul');
                click('Verifică figura');
              } else if (q.kind === 'symmetry') {
                q.solution.forEach(p => fixture.querySelector('[data-cell="' + (p.y * q.size + p.x) + '"]').click());
                click('Verifică oglindirea');
              } else if (q.kind === 'mosaic') {
                q.solution.forEach(tile => {
                  fixture.querySelector('[aria-label="Orientarea piesei"]').value = tile[0].x === tile[1].x ? 'vertical' : 'horizontal';
                  fixture.querySelector('.mosaic-cell[data-x="' + tile[0].x + '"][data-y="' + tile[0].y + '"]').click();
                });
                click('Verifică mozaicul');
              } else if (q.kind === 'fraction-paint') {
                for (let i = q.initial.length; i < q.target; i++) fixture.querySelector('[data-cell="' + i + '"]').click();
                click('Verifică părțile');
              } else if (q.kind === 'shape-select') {
                q.correct.forEach(i => fixture.querySelectorAll('.shape-card')[i].click());
                click('Verifică selecția');
              } else if (q.kind === 'clock-set') {
                const hour = fixture.querySelector('[aria-label="Ora de pe ceas"]'), minute = fixture.querySelector('[aria-label="Minutele de pe ceas"]');
                hour.value = q.target.hour; minute.value = q.target.minutes;
                hour.dispatchEvent(new Event('change')); minute.dispatchEvent(new Event('change')); click('Verifică ceasul');
              } else if (q.kind === 'robot') {
                click('Șterge programul');
                if (q.repeat) {
                  const repetitions = fixture.querySelector('[aria-label="Număr de repetări"]');
                  repetitions.value = q.goal.y; click('Jos'); repetitions.value = '1';
                } else for (let i = 0; i < q.goal.y; i++) click('Jos');
                for (let i = 0; i < q.goal.x; i++) click('Dreapta');
                for (let i = 0; i < q.goal.x + q.goal.y; i++) click('Execută un pas');
                click('Verifică destinația');
              } else if (q.kind === 'writing') {
                fixture.querySelector('textarea').value = 'Mara merge încet în parcul liniștit. Acolo vede o floare galbenă și frumoasă. La final se întoarce bucuroasă acasă.';
                fixture.querySelectorAll('input[type=checkbox]').forEach(input => { input.checked = true; });
                click('Verifică forma și încheie autoevaluarea');
              } else if (q.kind === 'memory') {
                const cards = Array.from(fixture.querySelectorAll('.memory-card')), known = new Map();
                let safety = 0;
                while (fixture.querySelector('#game-next').hidden && safety++ < 100) {
                  const available = cards.map((card, i) => i).filter(i => !cards[i].disabled);
                  let pair;
                  for (const a of available) {
                    const b = available.find(i => i !== a && known.has(a) && known.get(i) === known.get(a));
                    if (b !== undefined) { pair = [a, b]; break; }
                  }
                  if (!pair) {
                    const a = available.find(i => !known.has(i));
                    assert(a !== undefined, 'Există un cartonaș de explorat'); cards[a].click(); known.set(a, cards[a].textContent);
                    const b = available.find(i => i !== a && known.get(i) === known.get(a));
                    const second = b === undefined ? available.find(i => i !== a && !known.has(i)) : b;
                    assert(second !== undefined, 'Există al doilea cartonaș'); cards[second].click(); known.set(second, cards[second].textContent);
                  } else { cards[pair[0]].click(); cards[pair[1]].click(); }
                  const hide = Array.from(fixture.querySelectorAll('button')).find(b => b.textContent === 'Ascunde cele două cartonașe');
                  if (!hide.hidden) hide.click();
                }
                assert(safety < 100, 'Memoria poate fi încheiată');
              } else if (q.kind.indexOf('mission-') !== 0) throw new Error('Tip netestat: ' + q.kind);
              assert(!fixture.querySelector('#game-next').hidden, activity.id + ': rezolvarea este acceptată');
              click('Continuă');
            });
            assert(result && result.level === level && result.total === questions.length, activity.id + ': rezultat complet');
            if (activity.demo.focus || activity.demo.type === 'mission') {
              assert(result.evaluation === 'practice', 'Selected games cannot certify the whole lesson');
              assert(fixture.textContent.includes('fără modificarea progresului salvat'), 'Practice outcome is explicit');
            } else Progress.record(activity.id, result);
            completed++;
            game.dispose();
          }
        });
        window.workshopCompletedSessions = completed;
      } finally { Engines.rounds = factory; }
    });
    test('The remaining count engine also has a functional interface', () => { const game = start(Content.task('count', 'count'), 2); assert(fixture.querySelectorAll('.quiz-opt').length === 3, 'count options'); game.dispose(); });
    test('Evidence selection allows correction, freezes on success and restarts without changing progress', () => {
      const before = Progress.exportData(), scenario = GAME_MISSIONS['mat-1'].cases[0];
      let result;
      const game = start(MissionGames.demo('mat-1', 'evidence'), 0, value => { result = value; });
      click('Verifică dovezile'); assert(fixture.querySelector('#game-next').hidden, 'Alegerea goală nu este acceptată');
      const irrelevant = scenario.facts.findIndex(fact => !fact.relevant);
      fixture.querySelector('[data-fact="' + irrelevant + '"]').click(); click('Verifică dovezile');
      assert(fixture.querySelector('#game-next').hidden, 'Un detaliu irelevant nu este dovadă');
      fixture.querySelector('[data-fact="' + irrelevant + '"]').click();
      scenario.facts.forEach((fact, i) => { if (fact.relevant) fixture.querySelector('[data-fact="' + i + '"]').click(); });
      click('Un indiciu'); click('Verifică dovezile');
      assert(fixture.querySelector('fieldset').disabled, 'Dovezile rezolvate nu mai pot fi schimbate');
      click('Continuă');
      assert(result.errors === 2 && result.hints === 1 && result.evaluation === 'practice', 'Corectările și ajutorul rămân vizibile');
      click('Reia acest caz');
      assert(fixture.querySelectorAll('input:checked').length === 0, 'Reluarea șterge doar alegerile cazului');
      assert(before === Progress.exportData(), 'Practica nu modifică progresul');
      game.dispose();
    });
    test('Repair requires both the faulty step and its correct replacement', () => {
      const scenario = GAME_MISSIONS['mat-1'].cases[0];
      let result;
      const game = start(MissionGames.demo('mat-1', 'repair'), 0, value => { result = value; });
      fixture.querySelector('[data-repair-step="' + ((scenario.error.index + 1) % 3) + '"]').click();
      fixture.querySelector('[data-correct="true"]').click(); click('Verifică reparația');
      assert(fixture.querySelector('#game-next').hidden, 'O înlocuire potrivită la locul greșit nu repară eroarea');
      fixture.querySelector('[data-repair-step="' + scenario.error.index + '"]').click();
      assert(!fixture.querySelector('input:checked'), 'Schimbarea pasului cere o alegere nouă');
      fixture.querySelector('[data-correct="false"]').click(); click('Verifică reparația');
      assert(fixture.querySelector('#game-next').hidden, 'Pasul greșit nu este suficient fără corectare');
      fixture.querySelector('[data-correct="true"]').click(); click('Verifică reparația'); click('Continuă');
      assert(result.errors === 2 && result.percent === 0 && result.evaluation === 'practice', 'Repararea păstrează încercările reale');
      game.dispose();
    });
    test('Planning rejects distractors and wrong order, and requires a final valid check', () => {
      let result;
      const game = start(MissionGames.demo('mat-1', 'plan'), 0, value => { result = value; });
      [3, 1, 2].forEach(i => fixture.querySelector('[data-plan-token="' + i + '"]').click());
      click('Verifică planul construit');
      assert(fixture.querySelector('fieldset').hidden, 'Pasul nepotrivit nu deschide verificarea finală');
      for (let i = 0; i < 3; i++) fixture.querySelector('.mission-plan-selected button').click();
      [2, 1, 0].forEach(i => fixture.querySelector('[data-plan-token="' + i + '"]').click());
      click('Verifică planul construit'); assert(fixture.querySelector('#game-next').hidden, 'Ordinea contează');
      for (let i = 0; i < 3; i++) fixture.querySelector('.mission-plan-selected button').click();
      [0, 1, 2].forEach(i => fixture.querySelector('[data-plan-token="' + i + '"]').click());
      click('Verifică planul construit');
      assert(!fixture.querySelector('fieldset').hidden && fixture.querySelector('#game-next').hidden, 'Planul corect mai cere verificarea rezultatului');
      fixture.querySelector('[data-correct="false"]').click(); click('Verifică rezultatul planului');
      assert(fixture.querySelector('#game-next').hidden, 'Un control fără legătură nu încheie jocul');
      fixture.querySelector('[data-correct="true"]').click(); click('Verifică rezultatul planului'); click('Continuă');
      assert(result.errors === 3 && result.evaluation === 'practice', 'Etapele sunt verificate, nu doar numărul de cartonașe');
      game.dispose();
    });
    test('Wrong choice, hints, correction and explicit continuation affect real scoring', () => {
      let result;
      const demo = Content.quiz([[Q('Test', ['Corect', 'Greșit'], 0, 'Explicație.', 'Indiciu.')], [], []]);
      const game = start(demo, 0, value => { result = value; });
      click('Greșit'); assert(fixture.querySelector('#game-next').hidden, 'Nu avansează după eroare');
      click('Un indiciu'); click('Corect'); click('Continuă');
      assert(result.errors === 1 && result.hints === 1 && result.firstCorrect === 0, 'Scorul păstrează ajutorul și eroarea');
      click('Reia cu o rundă nouă'); click('Corect'); click('Continuă');
      assert(result.percent === 100 && result.hints === 0, 'Reluarea resetează doar runda');
      game.dispose(); assert(!fixture.children.length, 'Dispose oprește și runda reluată');
    });
    test('Tokens cannot be reused, and can be removed to repair the answer', () => {
      const demo = Content.sequence([[O('Ana citește.', ['Ana', 'citește.'], 'Explicație.')], [], []]);
      const game = start(demo);
      const ana = Array.from(fixture.querySelector('.token-pool').children).find(b => b.textContent === 'Ana');
      ana.click(); ana.click(); assert(fixture.querySelector('.token-row').children.length === 1, 'Un token nu poate fi folosit de două ori');
      click('Ana ×'); assert(fixture.querySelector('.token-row').children.length === 0, 'Tokenul poate fi mutat înapoi');
      Array.from(fixture.querySelector('.token-pool').children).find(b => b.textContent === 'Ana').click();
      Array.from(fixture.querySelector('.token-pool').children).find(b => b.textContent === 'citește.').click();
      click('Verifică ordinea'); assert(!fixture.querySelector('#game-next').hidden, 'Ordinea corectă este recunoscută'); game.dispose();
    });
    test('Matching validates relationships and allows correction', () => {
      const demo = Content.matching([[{ a: 'A', b: '1' }, { a: 'B', b: '2' }, { a: 'C', b: '3' }], [], []]);
      const game = start(demo);
      fixture.querySelectorAll('select').forEach(select => { select.value = '0'; select.dispatchEvent(new Event('change')); });
      click('Verifică perechile'); assert(fixture.querySelector('#game-next').hidden, 'Perechile greșite nu sunt acceptate');
      fixture.querySelectorAll('select').forEach((select, i) => { select.value = String(i); select.dispatchEvent(new Event('change')); });
      click('Verifică perechile'); assert(!fixture.querySelector('#game-next').hidden, 'Perechile pot fi corectate'); game.dispose();
    });
    test('Writing rejects xxx in the actual interface and never claims grammatical certification', () => {
      let result;
      const game = start(Content.task('type', 'story'), 0, value => { result = value; });
      fixture.querySelector('textarea').value = 'xxx'; click('Verifică forma și încheie autoevaluarea');
      assert(fixture.querySelector('#game-next').hidden, 'xxx este respins');
      fixture.querySelector('textarea').value = 'Mara merge în parc.';
      fixture.querySelectorAll('input[type=checkbox]').forEach(input => { input.checked = true; });
      click('Verifică forma și încheie autoevaluarea'); click('Continuă');
      assert(result.evaluation === 'self', 'Scrierea nu certifică o competență automat'); game.dispose();
    });
    test('Robot accepts a valid route and rejects a blocked command', () => {
      const game = start(Content.task('robot', 'route'), 1);
      click('Dreapta'); click('Execută un pas');
      assert(fixture.querySelector('#game-feedback').textContent.includes('obstacol'), 'Coliziunea este semnalată');
      click('Șterge programul');
      const target = fixture.querySelector('.robot-board').getAttribute('aria-label');
      const col = Number(target.match(/coloana (\d+)/)[1]);
      for (let i = 0; i < 3; i++) click('Jos');
      for (let i = 0; i < col - 1; i++) click('Dreapta');
      for (let i = 0; i < 3 + col - 1; i++) click('Execută un pas');
      click('Verifică destinația'); assert(!fixture.querySelector('#game-next').hidden, 'Traseul sigur este acceptat'); game.dispose();
    });
    test('Memory cards expose keyboard controls and explicit mismatch concealment', () => {
      const game = start(Content.task('memory', 'pairs'), 0);
      const cards = Array.from(fixture.querySelectorAll('.memory-card'));
      const values = [];
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].disabled) continue;
        cards[i].click(); values[i] = cards[i].textContent;
        const open = cards.filter(card => !card.disabled && card.textContent !== '❓');
        if (open.length === 2) {
          const hide = Array.from(fixture.querySelectorAll('button')).find(b => b.textContent === 'Ascunde cele două cartonașe');
          if (!hide.hidden) hide.click();
        }
      }
      assert(cards.every(card => card.tagName === 'BUTTON' && card.hasAttribute('aria-label')), 'Cartonașe native accesibile');
      game.dispose();
    });
    test('All render surfaces include guided practice and accessible tabs', () => {
      ACTIVITIES.forEach(activity => {
        fixture.innerHTML = Render.activity(activity.id);
        assert(fixture.querySelectorAll('[role=tab]').length === 6, activity.id + ': taburi');
        assert(fixture.querySelector('.hands-on'), activity.id + ': explorare');
        assert(fixture.querySelectorAll('[data-level]').length === 3, activity.id + ': niveluri');
        assert(fixture.querySelectorAll('[data-mission-game]').length === 4, activity.id + ': minimum patru jocuri vizibile');
        MissionGames.options(activity.id).forEach(option => assert(fixture.textContent.includes(option.title), activity.id + ': titlu propriu pentru joc'));
        assert(fixture.querySelectorAll('.lesson-words dt').length >= 2, activity.id + ': vocabular explicat');
        assert(fixture.querySelectorAll('.example-card > ol > li').length >= 3, activity.id + ': rezolvare vizibilă');
        assert(fixture.querySelectorAll('#panel-obiective > ul > li').length === 4, activity.id + ': patru obiective');
        assert(fixture.querySelectorAll('.reflection-prompts > article').length === 4, activity.id + ': patru întrebări cu sprijin');
        const column = fixture.querySelector('.discovery-column'), cards = Array.from(column.children);
        const gap = parseFloat(getComputedStyle(column).rowGap);
        cards.slice(1).forEach((card, i) => assert(Math.abs(card.getBoundingClientRect().top - cards[i].getBoundingClientRect().bottom - gap) < 1, activity.id + ': fără spații întinse între casete'));
      });
      fixture.innerHTML = Render.home(); assert(fixture.querySelectorAll('.subject-card').length === 6, 'Discipline');
      assert(!fixture.querySelector('.profile-panel'), 'Profilurile se gestionează numai în Setări');
      fixture.innerHTML = Render.settings(); assert(fixture.querySelector('.profile-panel'), 'Setările păstrează gestionarea profilurilor');
      fixture.innerHTML = Render.dece(); assert(fixture.querySelectorAll('.journey-stop').length === 11, 'Opriri');
    });
    test('Every discovery workbench initializes and changes its observation without grading', () => {
      const before = Progress.exportData();
      ACTIVITIES.forEach(activity => {
        fixture.innerHTML = Render.activity(activity.id); Discovery.init(fixture); Discovery.init(fixture);
        const lab = fixture.querySelector('[data-discovery-lab]');
        assert(lab && lab.children.length, activity.id + ': explorare interactivă');
        const observation = lab.querySelector('.lab-observation'), text = observation.textContent;
        const input = lab.querySelector('input[type=range]');
        if (input) { input.value = Number(input.value) + Number(input.step); input.dispatchEvent(new Event('input')); }
        else lab.querySelectorAll('.exploration-stop')[1].click();
        assert(observation.textContent !== text, activity.id + ': observația se schimbă');
        assert(lab.querySelectorAll('.lab-preview').length <= 1, 'Inițializare idempotentă');
      });
      assert(before === Progress.exportData(), 'Explorarea nu acordă stele și nu schimbă progresul');
    });
    function singleRound(q, callback) {
      const factory = Engines.rounds; Engines.rounds = () => [q];
      try { return start(Content.task('shapes', 'properties'), 0, callback); }
      finally { Engines.rounds = factory; }
    }
    test('Every slider has working touch-sized plus/minus buttons with synchronized boundaries', () => {
      ACTIVITIES.filter(a => a.subject === 'mat').forEach(activity => {
        fixture.innerHTML = Render.activity(activity.id); Discovery.init(fixture);
        fixture.querySelectorAll('input[type=range]').forEach(input => {
          const group = input.closest('.range-control'); assert(group, activity.id + ': butoane pentru fiecare bară');
          const minus = group.querySelector('[data-direction="-1"]'), plus = group.querySelector('[data-direction="1"]');
          assert(minus.getBoundingClientRect().width >= 44 && plus.getBoundingClientRect().height >= 44, 'Ținte tactile de minimum 44 px');
          input.value = input.min; input.dispatchEvent(new Event('input'));
          assert(minus.disabled, 'Nu coboară sub limita minimă');
          if (input.disabled) { assert(plus.disabled, 'Respectă un control dezactivat'); return; }
          plus.click();
          assert(Number(input.value) === Number(input.min) + Number(input.step), activity.id + ': respectă pasul');
          assert(group.querySelector('output').value === input.value, 'Valoarea afișată este sincronizată');
          minus.click(); assert(input.value === input.min, 'Butonul minus inversează pasul');
          input.value = input.max; input.dispatchEvent(new Event('input'));
          assert(plus.disabled && group.querySelector('output').value === input.value, 'Nu trece de limita maximă');
        });
      });
    });
    test('Dependent slider limits clamp subtraction and disable impossible regrouping', () => {
      fixture.innerHTML = Render.activity('mat-3'); Discovery.init(fixture);
      const inputs = fixture.querySelectorAll('input[type=range]');
      inputs[1].value = '8'; inputs[1].dispatchEvent(new Event('input'));
      inputs[0].value = '2'; inputs[0].dispatchEvent(new Event('input'));
      assert(inputs[1].value === '2' && inputs[1].max === '2', 'Nu luăm mai multe obiecte decât avem');
      assert(inputs[1].closest('.range-control').querySelector('output').value === '2', 'Afișajul reflectă noua limită');
      assert(inputs[1].closest('.range-control').querySelector('[data-direction="1"]').disabled, 'Plus este dezactivat la noua limită');
      fixture.innerHTML = Render.activity('mat-1'); Discovery.init(fixture);
      const count = fixture.querySelector('input[aria-label="Numărul construit"]'), split = fixture.querySelector('input[aria-label="Zeci desfăcute în unități"]');
      split.value = '1'; split.dispatchEvent(new Event('input')); count.value = '5'; count.dispatchEvent(new Event('input'));
      assert(split.disabled && split.value === '0', 'Nu desfacem un grup de zece când avem doar cinci obiecte');
      assert(split.closest('.range-control').querySelectorAll('button:disabled').length === 2, 'Ambele butoane respectă indisponibilitatea');
    });
    test('Number line can be solved entirely with plus/minus and freezes after verification', () => {
      const q = MathWorkshop.arithmetic('add', 0, 0), game = singleRound(q);
      const input = fixture.querySelector('input[type=range]'), plus = fixture.querySelector('[data-direction="1"]');
      for (let i = q.start; i < q.answer; i++) plus.click();
      assert(Number(input.value) === q.answer, 'Ajunge la rezultat fără tragerea barei');
      click('Verifică poziția');
      assert(!fixture.querySelector('#game-next').hidden && input.disabled, 'Poziția corectă este confirmată și rămâne stabilă');
      assert(fixture.querySelectorAll('.range-control button:disabled').length === 2, 'Butoanele sunt blocate după rezolvare'); game.dispose();
    });
    test('Drawing instructions teach closing a contour, and an invalid construction remains repairable', () => {
      const q = { kind: 'geoboard', size: 4, goal: { shape: 'triangle', area: null }, prompt: 'Desenează un triunghi', hint: 'Alege trei colțuri.', explain: 'Trei laturi.' };
      const game = singleRound(q), peg = (x, y) => fixture.querySelector('.peg[data-x="' + x + '"][data-y="' + y + '"]');
      const verify = Array.from(fixture.querySelectorAll('button')).find(node => node.textContent === 'Verifică figura');
      assert(fixture.querySelector('.drawing-guide').textContent.includes('Apasă, nu trage.'), 'Instrucțiunile sunt vizibile înainte de desen');
      assert(verify.disabled, 'Nu cere verificarea unui desen încă neînceput');
      peg(0, 0).click(); peg(1, 0).click(); peg(2, 0).click();
      assert(verify.disabled, 'Întâi trebuie închis conturul');
      peg(0, 0).click(); assert(!verify.disabled, 'Apăsarea primului punct închide conturul');
      click('Verifică figura'); assert(fixture.querySelector('#game-next').hidden, 'Trei puncte pe aceeași linie nu sunt un triunghi');
      click('Înapoi un vârf'); peg(1, 2).click(); click('Închide conturul'); click('Verifică figura');
      assert(!fixture.querySelector('#game-next').hidden, 'Corectarea desenului este acceptată'); game.dispose();
    });
    test('Balance quantities, actual cubes, pan heights and unknown labels agree in every case', () => {
      for (let level = 0; level < 3; level++) for (let index = 0; index < 6; index++) {
        const q = MathWorkshop.balance(level, index), game = singleRound(q), model = q.balance;
        const left = fixture.querySelector('.balance-pan[data-side=left]'), right = fixture.querySelector('.balance-pan[data-side=right]');
        const leftY = left.transform.baseVal.consolidate().matrix.f, rightY = right.transform.baseVal.consolidate().matrix.f;
        assert(Number(fixture.querySelector('.balance-illustration').dataset.left) === model.left, 'Datele din imagine folosesc runda curentă');
        if (!model.concealed) {
          assert(left.querySelectorAll('.balance-cube').length === model.left && right.querySelectorAll('.balance-cube').length === model.right, 'Numărul de cuburi desenate este exact');
          assert(Math.sign(rightY - leftY) === Math.sign(model.right - model.left), 'Coboară exact talerul mai greu, inclusiv la egalitate');
          assert(q.prompt.includes(Engines.quantity(model.left, 'cub', 'cuburi')) && q.prompt.includes(Engines.quantity(model.right, 'cub', 'cuburi')), 'Cerința numește cantitățile din desen');
        } else {
          assert(leftY === rightY, 'Ecuația cu piese necunoscute arată echilibrul');
          const unknowns = Array.from(left.querySelectorAll('text')).filter(node => node.textContent === '?');
          assert(unknowns.length === (model.unknowns || 1), 'Piesele necunoscute sunt desenate separat');
        }
        const labels = fixture.querySelectorAll('.balance-readings strong');
        assert(labels.length === 2 && parseFloat(getComputedStyle(labels[0]).fontSize) >= 18, 'Valorile au etichete HTML mari, nerotite');
        fixture.querySelectorAll('.balance-weight-label').forEach(text => {
          const box = text.getBBox(), rect = text.previousElementSibling;
          assert(box.width < Number(rect.getAttribute('width')), 'Cifrele încap în piesă');
        });
        game.dispose();
      }
    });
    test('Balance exploration buttons redraw cubes, readable values and the direction of tilt', () => {
      const before = Progress.exportData();
      fixture.innerHTML = Render.activity('mat-7'); Discovery.init(fixture);
      const lab = fixture.querySelector('[data-discovery-lab]');
      const plus = lab.querySelector('[aria-label="Mărește: Cuburi identice în stânga"]');
      const current = () => lab.querySelector('.balance-illustration');
      assert(Number(current().dataset.angle) > 0, 'La început coboară dreapta');
      plus.click(); plus.click(); plus.click();
      assert(Number(current().dataset.angle) === 0, 'La 7 și 7 este echilibru');
      plus.click();
      assert(Number(current().dataset.angle) < 0 && lab.querySelectorAll('[data-side=left] .balance-cube').length === 8, 'La 8 și 7 coboară stânga');
      assert(lab.querySelector('.balance-readings strong').textContent === '8 cuburi', 'Eticheta vizibilă se actualizează');
      assert(before === Progress.exportData(), 'Explorarea rămâne fără notă');
    });
    test('Numeric responses reject malformed input, require all steps and track correction honestly', () => {
      const q = MathWorkshop.calculation('8 + 5, apoi − 3', [{ label: 'După primire', answer: 13 }, { label: 'La final', answer: 10 }], '13, apoi 10.', 'Lucrează în doi pași.');
      let result;
      const game = singleRound(q, value => { result = value; }), inputs = fixture.querySelectorAll('input');
      inputs[0].value = '13x'; inputs[1].value = '10'; click('Verifică planul');
      assert(fixture.querySelector('#game-feedback').textContent.includes('număr întreg'), 'Textul invalid este semnalat');
      inputs[0].value = '12'; click('Verifică planul'); assert(fixture.querySelector('#game-next').hidden, 'Un rezultat final corect nu ascunde un pas intermediar greșit');
      click('Un indiciu'); inputs[0].value = '13'; click('Verifică planul'); click('Continuă');
      assert(result.errors === 1 && result.hints === 1 && result.firstCorrect === 0, 'Aceleași reguli de evaluare');
      game.dispose();
    });
    test('Geoboard accepts a rotated alternative, supports undo, and freezes a solved construction', () => {
      const q = { kind: 'geoboard', size: 5, goal: { shape: 'square', area: 8 }, prompt: 'Pătrat de 8 pătrățele', hint: 'Rotește.', explain: 'Aria este 8.' };
      const game = singleRound(q);
      const peg = (x, y) => fixture.querySelector('.peg[data-x="' + x + '"][data-y="' + y + '"]');
      peg(2, 0).click(); peg(2, 0).click();
      assert(fixture.querySelectorAll('.peg[aria-pressed=true]').length === 1, 'Nu dublează un vârf');
      peg(1, 1).click(); click('Înapoi un vârf'); peg(4, 2).click(); peg(2, 4).click(); peg(0, 2).click();
      assert(fixture.querySelector('.drawn-outline').tagName.toLowerCase() === 'polyline', 'Conturul rămâne deschis până la închidere');
      click('Închide conturul'); click('Verifică figura');
      assert(!fixture.querySelector('#game-next').hidden, 'Soluția alternativă rotită este acceptată');
      click('Golește grila'); assert(fixture.querySelectorAll('.peg[aria-pressed=true]').length === 4, 'Figura rezolvată rămâne stabilă');
      game.dispose();
    });
    test('Symmetry rejects translation and permits correction by toggling cells', () => {
      const q = { kind: 'symmetry', size: 6, fixed: [{ x: 0, y: 1 }, { x: 2, y: 2 }], solution: [{ x: 5, y: 1 }, { x: 3, y: 2 }], prompt: 'Oglindește', hint: 'Numără distanța.', explain: 'Distanțe egale.' };
      const game = singleRound(q), cell = (x, y) => fixture.querySelector('[data-cell="' + (y * q.size + x) + '"]');
      assert(cell(0, 1).disabled, 'Modelul nu se poate șterge');
      cell(3, 1).click(); cell(3, 2).click(); click('Verifică oglindirea'); assert(fixture.querySelector('#game-next').hidden, 'O translație nu este o oglindire');
      cell(3, 1).click(); cell(5, 1).click(); click('Verifică oglindirea'); assert(!fixture.querySelector('#game-next').hidden, 'Corectarea este acceptată'); game.dispose();
    });
    test('Mosaic supports rotation and removal, refuses overlap and accepts an alternative tiling', () => {
      const q = { kind: 'mosaic', width: 2, height: 2, blocked: [], prompt: 'Acoperă', hint: 'Rotește.', explain: 'Două piese acoperă patru celule.' };
      const game = singleRound(q), cell = (x, y) => fixture.querySelector('.mosaic-cell[data-x="' + x + '"][data-y="' + y + '"]');
      const orientation = fixture.querySelector('select');
      cell(0, 0).click(); assert(fixture.querySelectorAll('.covered').length === 2, 'Piesă orizontală');
      orientation.value = 'vertical'; cell(1, 1).click(); assert(fixture.querySelectorAll('.covered').length === 2, 'Nu iese din grilă');
      cell(0, 0).click(); assert(!fixture.querySelectorAll('.covered').length, 'Scoate piesa completă');
      cell(1, 0).click(); orientation.value = 'horizontal'; cell(0, 1).click();
      assert(fixture.querySelectorAll('.covered').length === 2, 'Nu suprapune o piesă');
      cell(1, 0).click(); orientation.value = 'vertical';
      cell(0, 0).click(); cell(1, 0).click(); click('Verifică mozaicul');
      assert(!fixture.querySelector('#game-next').hidden, 'Altă pavare validă este acceptată'); game.dispose();
    });
    test('Fractions accept separated equal parts and protect the precolored model', () => {
      const q = MathWorkshop.fractions(2, 1), game = singleRound(q);
      const cells = fixture.querySelectorAll('.paint-cell');
      assert(cells[0].disabled && cells[1].disabled, 'Sfertul inițial este protejat');
      click('Verifică părțile'); assert(fixture.querySelector('#game-next').hidden, 'Colorarea incompletă nu este acceptată');
      [2, 4, 6, 7].forEach(i => cells[i].click()); click('Verifică părțile');
      assert(!fixture.querySelector('#game-next').hidden, 'Șase optimi sunt trei sferturi, chiar în poziții diferite'); game.dispose();
    });
    test('Guided reflection exposes the actual situation and concrete steps from the start', () => {
      const before = Progress.exportData();
      ACTIVITIES.filter(activity => activity.subject !== 'mat').forEach(activity => {
        fixture.innerHTML = Render.activity(activity.id); Discovery.init(fixture);
        const card = fixture.querySelector('.discovery-workbench'), buttons = card.querySelectorAll('.exploration-stop');
        assert(card.querySelector('.exploration-example').textContent.includes(activity.explanation[1]), activity.id + ': exemplul oferă context');
        assert(buttons.length === activity.guided.length && buttons[0].getAttribute('aria-pressed') === 'true', 'Primul pas este deschis');
        buttons.forEach((button, index) => {
          assert(button.textContent.includes(activity.guided[index]), 'Butoanele spun ce avem de făcut');
          button.click();
          assert(card.querySelector('.lab-observation').textContent.includes(activity.guided[index]), 'Instrucțiunea corespunde pasului ales');
        });
      });
      assert(before === Progress.exportData(), 'Reflecția nu schimbă evaluarea');
    });
    test('Settings offer all preferences, scale real text by 150 percent and keep levels open', () => {
      const original = Progress.profile(), saved = JSON.parse(JSON.stringify(Preferences.get(original)));
      try {
        fixture.innerHTML = Render.settings();
        assert(fixture.querySelectorAll('#setting-font option').length === 3, 'Trei fonturi');
        assert(fixture.querySelectorAll('#setting-size option').length === 4, 'Patru mărimi');
        assert(fixture.querySelectorAll('#preferences-form select').length === 7, 'Toate preferințele');
        Preferences.apply(original);
        const baseline = parseFloat(getComputedStyle(document.body).fontSize);
        Progress.updateProfile(original.name, Object.assign({}, saved, { size: 150, motion: true, level: 2, font: 'handwriting' }));
        Preferences.apply(Progress.profile());
        assert(Math.abs(parseFloat(getComputedStyle(document.body).fontSize) / baseline - 1.5) < 0.01, 'Textul crește efectiv cu 50%');
        assert(getComputedStyle(document.body).fontFamily.includes('Playwrite RO'), 'Fontul ales se aplică');
        assert(document.documentElement.dataset.motion === 'reduce', 'Mișcarea redusă se aplică');
        fixture.innerHTML = Render.activity('civ-10');
        assert(fixture.querySelector('[data-level="2"]').getAttribute('aria-pressed') === 'true', 'Provocare este preferat');
        assert(Array.from(fixture.querySelectorAll('[data-level]')).every(button => !button.disabled), 'Niciun nivel nu este blocat');
      } finally {
        Progress.updateProfile(original.name, saved);
        Preferences.apply(Progress.profile());
      }
    });
    test('The thinking pathway connects both subjects and marks only the current lesson', () => {
      ['log', 'civ'].forEach(subject => {
        fixture.innerHTML = Render.subject(subject);
        const links = fixture.querySelectorAll('.thinking-path a');
        assert(links.length === 6, 'Șase opriri accesibile din ambele discipline');
        links.forEach((link, index) => assert(link.getAttribute('href') === 'activity.html?activity=' + THINKING_PATH.activities[index], 'Ordinea traseului'));
      });
      THINKING_PATH.activities.forEach(id => {
        fixture.innerHTML = Render.activity(id); Discovery.init(fixture);
        const current = fixture.querySelectorAll('.thinking-path [aria-current="page"]');
        assert(current.length === 1 && current[0].getAttribute('href') === 'activity.html?activity=' + id, 'Lecția curentă este marcată');
        assert(fixture.querySelector('.exploration-stop').getAttribute('aria-pressed') === 'true', 'Explorare cu primul pas deschis');
        assert(fixture.querySelector('#panel-parinte').textContent.includes('fără ridiculizare, pedeapsă'), 'Îndrumare explicită pentru adult');
      });
    });
    test('All 54 thinking cases allow correction and explain the evidence rather than demand obedience', () => {
      THINKING_PATH.activities.forEach(id => {
        const activity = ACTIVITIES.find(item => item.id === id);
        for (let level = 0; level < 3; level++) {
          const rounds = Engines.rounds(activity.demo, level);
          rounds.forEach(q => {
            let result;
            const game = singleRound(q, value => { result = value; });
            const wrong = q.options.find((option, index) => index !== q.answer);
            click(wrong);
            assert(fixture.querySelector('#game-next').hidden, id + ': alegerea greșită se poate corecta');
            click(q.options[q.answer]);
            assert(fixture.querySelector('#game-feedback').textContent.includes(q.explain), id + ': explicația apare integral');
            click('Continuă');
            assert(result && result.errors === 1 && result.firstCorrect === 0, id + ': corectarea nu devine reușită din prima');
            game.dispose();
          });
        }
      });
    });
    test('Garden cells stay inside narrow drawings with large handwriting selected', () => {
      const profile = Progress.profile(), saved = Preferences.get(profile);
      const q = MathWorkshop.calculation('Numără pătrățelele.', [{ label: 'Suprafața', answer: 24 }], '8 × 3 = 24.', 'Numără rândurile.', { garden: { width: 8, height: 3 } });
      let game;
      try {
        Preferences.apply({ preferences: Object.assign({}, saved, { font: 'handwriting', size: 150 }) });
        fixture.style.width = '180px';
        game = singleRound(q);
        const grid = fixture.querySelector('.garden-grid'), bounds = grid.getBoundingClientRect();
        assert(grid.scrollWidth <= grid.clientWidth + 1, 'Pătrățelele nu lățesc grila');
        grid.querySelectorAll('span').forEach(cell => assert(cell.getBoundingClientRect().right <= bounds.right, 'Fiecare celulă încape în desen'));
      } finally {
        if (game) game.dispose();
        fixture.style.removeProperty('width');
        Preferences.apply(profile);
      }
    });
  } finally {
    fixture.replaceChildren();
    localStorage.removeItem(temporaryKey);
    Progress.storageKey = originalKey; Progress.cache = null;
  }
  window.workshopTestResults = results;
  output.textContent = results.map(result => (result.passed ? '✓ ' : '✗ ') + result.name + (result.error ? ': ' + result.error : '')).join('\n') +
    '\n\n' + results.filter(result => result.passed).length + '/' + results.length + ' verificări reușite.';
  // tests/run-browser-tests.js deschide pagina cu ?report=1 și primește rezultatele aici
  if (new URLSearchParams(location.search).has('report')) {
    fetch('/__test-results', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(results) })
      .finally(() => window.close()); // profilul de test permite închiderea, deci browserul se oprește singur
  }
})();
