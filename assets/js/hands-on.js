/* Jocuri practice: copilul face, nu alege o variantă.
   device — mouse, atingere și tastatură (inf-2); punctuation — pune semnul de la finalul
   propozițiilor (lim-9); routine — își așază activitățile zilei (civ-12).
   Orice tragere se poate face și prin două atingeri (obiect, apoi țintă), deci merge și pe
   tabletă, și cu tastatura. La fiecare joc se generează alte sarcini. */
const HandsOn = {
  types: ['device', 'punctuation', 'routine'],
  modes: { device: ['practice'], punctuation: ['marks'], routine: ['day'] },
  handles(type) { return this.types.includes(type); },

  rounds(demo, level, config) {
    const tasks = Engines.draw(this[demo.type + 'Tasks'](level), config.rounds);
    // la final, o întrebare de verificare din setul lecției (variante sau ordonare)
    const checks = (config.questions || []).concat(config.review || []);
    if (checks.length) {
      const q = Engines.pick(checks);
      tasks.push(q.tokens ? Object.assign({ kind: 'arrange' }, q) : Engines.questionRound(q));
    }
    return tasks;
  },

  /* ---------- mouse, atingere, tastatură ---------- */
  deviceTasks(level) {
    const things = [['⭐', 'steluța'], ['🍎', 'mărul'], ['🚗', 'mașinuța'], ['🎈', 'balonul'], ['🐟', 'peștișorul'], ['🌸', 'floarea']];
    const words = ['soare', 'mere', 'pom', 'lac', 'nas', 'minge', 'carte', 'nor', 'lapte', 'ou'];
    const pick = (list, n) => Engines.draw(list, n);
    const click = (double) => {
      const items = pick(things, level === 0 ? 3 : 4), goal = Engines.randInt(0, items.length - 1);
      return {
        kind: 'hands-click', double, items: items.map(item => item[0]), names: items.map(item => item[1]), goal,
        prompt: double ? 'Apasă de două ori, repede, pe ' + items[goal][1] + '.' : 'Apasă o dată pe ' + items[goal][1] + '.',
        explain: double ? 'Două apăsări rapide, una după alta, se numesc dublu-clic.' : 'O apăsare scurtă se numește clic. Așa alegem un obiect.',
        hint: double ? 'Apasă de două ori, fără pauză între apăsări.' : 'Caută desenul numit în cerință și apasă-l o singură dată.'
      };
    };
    const drag = () => {
      if (level === 2) {
        const fruits = pick([['🍎', 'măr'], ['🍐', 'pară'], ['🍌', 'banană'], ['🍇', 'struguri']], 2);
        const toys = pick([['🧸', 'ursuleț'], ['⚽', 'minge'], ['🪀', 'yo-yo'], ['🚂', 'trenuleț']], 2);
        return {
          kind: 'hands-drag', zones: ['🧺 Coșul cu fructe', '📦 Cutia cu jucării'],
          items: Engines.shuffle(fruits.map(f => ({ icon: f[0], name: f[1], zone: 0 })).concat(toys.map(t => ({ icon: t[0], name: t[1], zone: 1 })))),
          prompt: 'Trage fructele în coș și jucăriile în cutie.',
          explain: 'Ai mutat fiecare obiect în locul potrivit. Așa mutăm și fișierele în dosare.',
          hint: 'Ține apăsat pe obiect și mută-l. Sau apasă obiectul, apoi locul unde vrei să ajungă.'
        };
      }
      const item = Engines.pick([['🍎', 'mărul'], ['🍐', 'para'], ['🍌', 'banana']]);
      return {
        kind: 'hands-drag', zones: ['🧺 Coșul'], items: [{ icon: item[0], name: item[1], zone: 0 }],
        prompt: 'Trage ' + item[1] + ' în coș.',
        explain: 'Ai tras un obiect: l-ai ținut apăsat și l-ai mutat.',
        hint: 'Ține apăsat pe ' + item[1] + ' și mută-l în coș. Sau apasă ' + item[1] + ', apoi coșul.'
      };
    };
    const type = (kind) => {
      if (kind === 'erase') {
        const word = Engines.pick(words), extra = word + word[word.length - 1];
        return {
          kind: 'hands-type', start: extra, target: word, exact: false,
          prompt: 'Șterge litera în plus, ca să rămână „' + word + '”. Folosește tasta ⌫ (Backspace).',
          explain: 'Tasta ⌫ șterge litera din stânga liniuței care clipește.',
          hint: 'Apasă la finalul cuvântului, apoi o dată pe ⌫.'
        };
      }
      if (kind === 'two') {
        const pair = pick(words, 2), target = pair.join(' ');
        return {
          kind: 'hands-type', start: '', target, exact: false,
          prompt: 'Scrie „' + target + '”, cu un spațiu între cuvinte.',
          explain: 'Tasta lungă de jos, bara de spațiu, desparte cuvintele.',
          hint: 'Scrie primul cuvânt, apasă bara de spațiu, apoi scrie al doilea.'
        };
      }
      if (kind === 'sentence') {
        const target = Engines.pick(['Ana are mere.', 'Dan are o minge.', 'Eu citesc o carte.', 'Mara bea lapte.']);
        return {
          kind: 'hands-type', start: '', target, exact: true,
          prompt: 'Scrie propoziția „' + target + '”, cu literă mare la început și punct la final.',
          explain: 'Pentru litera mare folosești tasta Shift (⇧); punctul este pe tastă separată.',
          hint: 'Ține apăsat Shift (⇧) când scrii prima literă. Nu uita punctul de la final.'
        };
      }
      const word = Engines.pick(words);
      return {
        kind: 'hands-type', start: '', target: word, exact: false,
        prompt: 'Scrie cuvântul „' + word + '”.',
        explain: 'Ai găsit literele pe tastatură și le-ai scris în ordine.',
        hint: 'Caută pe rând fiecare literă a cuvântului „' + word + '”.'
      };
    };
    return [
      () => click(false), () => click(true), drag, () => type('word'), () => type('erase'), () => type('two'), () => type('sentence')
    ].filter((make, i) => [[0, 1, 2, 3], [0, 1, 2, 3, 4, 5], [1, 2, 4, 5, 6]][level].includes(i)).map(make => make());
  },

  /* ---------- semnele de la finalul propoziției ---------- */
  punctuationTasks(level) {
    const statements = ['Mama gătește supă', 'Am o minge roșie', 'Câinele doarme', 'Afară plouă', 'Bunicul citește ziarul', 'Mâine mergem la munte', 'Pisica bea lapte', 'Eu am șapte ani'];
    const questions = ['Unde este pisica', 'Vii la joacă', 'Cine a sunat la ușă', 'Ce ai desenat', 'Câți ani ai', 'Când pleacă trenul', 'Îți place supa'];
    const exclamations = ['Ce frumos e afară', 'Ura, am reușit', 'Atenție, vine mașina', 'Bravo, ai câștigat', 'Ce mare e balena'];
    const why = { '.': 'spune ceva, deci punem punct', '?': 'întreabă, deci punem semnul întrebării', '!': 'arată o emoție puternică sau un avertisment, deci punem semnul exclamării' };
    const make = () => {
      const mix = level === 0 ? [['.', statements], ['?', questions]]
        : level === 1 ? [['.', statements], ['?', questions], ['!', exclamations]]
          : [['.', statements], ['?', questions], ['!', exclamations], [Engines.pick(['.', '?']), null]];
      const sentences = Engines.shuffle(mix.map(([mark, list]) => ({ mark, text: Engines.pick(list || (mark === '.' ? statements : questions)) })));
      // fără propoziții repetate în aceeași sarcină
      const seen = new Set();
      sentences.forEach(s => { while (seen.has(s.text)) s.text = Engines.pick(s.mark === '.' ? statements : s.mark === '?' ? questions : exclamations); seen.add(s.text); });
      return {
        kind: 'hands-punctuate', sentences: sentences.map(s => s.text), marks: sentences.map(s => s.mark),
        prompt: sentences.length === 2 ? 'Pune semnul potrivit la finalul fiecărei propoziții.' : 'Pune semnul potrivit la finalul celor ' + sentences.length + ' propoziții.',
        explain: sentences.map(s => '„' + s.text + s.mark + '” ' + why[s.mark] + '.').join(' '),
        hint: 'Citește fiecare propoziție cu voce tare. Spune ceva, întreabă sau arată o emoție puternică?'
      };
    };
    return [make(), make(), make(), make()];
  },

  /* ---------- planul zilei ---------- */
  routineTasks(level) {
    // [activitate, momente potrivite (0 dimineața, 1 după-amiaza, 2 seara), de ce]
    const fixed = [
      ['Micul dejun', [0], 'micul dejun este masa de dimineață'],
      ['Mă trezesc și mă îmbrac', [0], 'ne trezim dimineața'],
      ['Merg la școală', [0], 'orele de școală încep dimineața'],
      ['Prânzul', [1], 'prânzul este masa de la mijlocul zilei'],
      ['Cina', [2], 'cina este masa de seară'],
      ['Mă spăl pe dinți și mă culc', [2], 'ne culcăm seara'],
      ['Îmi pregătesc ghiozdanul pentru mâine', [1, 2], 'ghiozdanul pentru mâine se pregătește după școală']
    ];
    const free = [
      ['Mă joc afară', [0, 1], 'ne jucăm afară cât este lumină'],
      ['Citesc o poveste', [0, 1, 2], 'poți citi oricând'],
      ['Desenez', [0, 1, 2], 'poți desena oricând'],
      ['Fac tema', [1, 2], 'tema se face după școală'],
      ['Fac o pauză de mișcare', [0, 1, 2], 'o pauză de mișcare ajută oricând'],
      ['Ajut la treburile casei', [0, 1, 2], 'poți ajuta oricând']
    ];
    const counts = [[2, 1], [3, 1], [3, 2]][level];
    const make = () => {
      const cards = Engines.shuffle(Engines.draw(fixed, counts[0]).concat(Engines.draw(free, counts[1])));
      return {
        kind: 'hands-routine', slots: ['Dimineața', 'După-amiaza', 'Seara'],
        cards: cards.map(card => ({ text: card[0], allowed: card[1], why: card[2] })),
        prompt: 'Așază activitățile în planul zilei: dimineața, după-amiaza sau seara.',
        explain: 'Unele activități au un moment potrivit, de exemplu micul dejun dimineața. Altele, ca desenul sau cititul, le poți alege tu: planul tău poate fi diferit de al unui coleg.',
        hint: 'Începe cu mesele și culcarea: ele au un moment clar. Apoi alege unde pui restul.'
      };
    };
    return [make(), make(), make(), make()];
  },

  /* ---------- afișare ---------- */
  render(content, q, tools) {
    const { button, check, announce, isSolved } = tools;
    if (q.kind === 'hands-click') {
      const row = document.createElement('div'); row.className = 'hands-row';
      let last = 0;
      q.items.forEach((icon, i) => {
        const node = button(icon, () => {
          if (isSolved()) return;
          if (i !== q.goal) { check(false, 'Acesta este ' + q.names[i] + '. Caută ' + q.names[q.goal] + '.'); return; }
          if (!q.double) { check(true); return; }
          const now = Date.now();
          if (now - last < 800) { node.textContent = '📭'; check(true); }
          else { last = now; announce('Bine! Acum încă o dată, repede.', false); }
        }, 'hands-target');
        node.dataset.goal = String(i === q.goal);
        node.setAttribute('aria-label', q.names[i]);
        row.appendChild(node);
      });
      content.appendChild(row);
      return;
    }
    if (q.kind === 'hands-drag') {
      const placed = new Map();
      let selected = null;
      const pool = document.createElement('div'); pool.className = 'hands-row';
      const zones = document.createElement('div'); zones.className = 'hands-zones';
      const nodes = q.items.map((item, i) => {
        const node = button(item.icon, () => {
          if (isSolved() || placed.has(i)) return;
          selected = selected === i ? null : i;
          nodes.forEach((n, j) => n.classList.toggle('selected', j === selected));
          if (selected !== null) announce('Ai ales ' + item.name + '. Acum apasă locul unde vrei să ajungă.', false);
        }, 'hands-target');
        node.setAttribute('aria-label', item.name);
        node.style.touchAction = 'none';
        // tragere cu degetul sau cu mouse-ul
        node.addEventListener('pointerdown', event => {
          if (isSolved() || placed.has(i)) return;
          node.setPointerCapture(event.pointerId);
          const start = { x: event.clientX, y: event.clientY };
          const move = e => { node.style.transform = 'translate(' + (e.clientX - start.x) + 'px,' + (e.clientY - start.y) + 'px)'; node.classList.add('dragging'); };
          const up = e => {
            node.removeEventListener('pointermove', move); node.removeEventListener('pointerup', up);
            node.style.transform = ''; node.classList.remove('dragging');
            const moved = Math.abs(e.clientX - start.x) + Math.abs(e.clientY - start.y) > 12;
            if (!moved) return;
            const target = zoneNodes.find(z => { const r = z.getBoundingClientRect(); return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom; });
            if (target) drop(i, zoneNodes.indexOf(target));
          };
          node.addEventListener('pointermove', move); node.addEventListener('pointerup', up);
        });
        pool.appendChild(node);
        return node;
      });
      const zoneNodes = q.zones.map((label, z) => {
        const zone = button(label, () => { if (selected !== null) drop(selected, z); }, 'hands-zone');
        zone.dataset.zone = String(z);
        zones.appendChild(zone);
        return zone;
      });
      const drop = (i, z) => {
        if (isSolved()) return;
        const item = q.items[i];
        selected = null; nodes.forEach(n => n.classList.remove('selected'));
        if (item.zone !== z) { check(false, item.name[0].toUpperCase() + item.name.slice(1) + ' nu se potrivește aici. Încearcă în celălalt loc.'); return; }
        placed.set(i, z);
        nodes[i].disabled = true; nodes[i].classList.add('placed');
        zoneNodes[z].textContent += ' ' + item.icon;
        if (placed.size === q.items.length) check(true);
        else announce('Bine! Mai sunt ' + (q.items.length - placed.size) + ' de mutat.', false);
      };
      content.appendChild(pool); content.appendChild(zones);
      return;
    }
    if (q.kind === 'hands-type') {
      const label = document.createElement('label'); label.textContent = 'Scrie aici'; label.htmlFor = 'hands-input';
      const input = document.createElement('input'); input.id = 'hands-input'; input.type = 'text'; input.className = 'hands-input';
      input.value = q.start; input.autocomplete = 'off'; input.spellcheck = false; input.setAttribute('autocapitalize', q.exact ? 'sentences' : 'off');
      content.appendChild(label); content.appendChild(input);
      content.appendChild(button('Verifică', () => {
        if (isSolved()) return;
        const value = input.value.trim().replace(/\s+/g, ' ');
        const ok = q.exact ? value === q.target : value.toLowerCase() === q.target;
        if (ok) { input.disabled = true; check(true); return; }
        if (!value) { announce('Încă nu ai scris nimic.', true); return; }
        check(false, q.exact && value.toLowerCase() === q.target.toLowerCase() ? 'Literele sunt bune. Verifică litera mare de la început.' :
          q.exact && value + '.' === q.target ? 'Aproape! Lipsește punctul de la final.' : 'Compară cu modelul: „' + q.target + '”.');
      }, 'btn btn-primary'));
      return;
    }
    if (q.kind === 'hands-punctuate') {
      let mark = null;
      const chosen = q.marks.map(() => '');
      const palette = document.createElement('div'); palette.className = 'hands-row';
      const names = { '.': 'punct', '?': 'semnul întrebării', '!': 'semnul exclamării' };
      const marks = ['.', '?', '!'].map(m => {
        const node = button(m, () => { mark = m; marks.forEach(n => n.classList.toggle('selected', n === node)); announce('Ai ales ' + names[m] + '. Apasă acum locul de la finalul propoziției.', false); }, 'hands-mark');
        node.setAttribute('aria-label', names[m]); node.dataset.mark = m; palette.appendChild(node);
        return node;
      });
      const list = document.createElement('ol'); list.className = 'hands-sentences';
      const slots = q.sentences.map((text, i) => {
        const item = document.createElement('li'); item.appendChild(document.createTextNode(text));
        const slot = button('＿', () => {
          if (isSolved()) return;
          if (!mark) { announce('Alege mai întâi un semn de sus.', true); return; }
          chosen[i] = mark; slot.textContent = mark; slot.setAttribute('aria-label', 'Finalul propoziției ' + (i + 1) + ': ' + names[mark]);
        }, 'hands-slot');
        slot.dataset.slot = String(i); slot.setAttribute('aria-label', 'Finalul propoziției ' + (i + 1) + ', gol');
        item.appendChild(slot); list.appendChild(item);
        return slot;
      });
      content.appendChild(palette); content.appendChild(list);
      content.appendChild(button('Verifică semnele', () => {
        if (isSolved()) return;
        if (chosen.some(m => !m)) { announce('Mai sunt propoziții fără semn.', true); return; }
        const wrong = chosen.findIndex((m, i) => m !== q.marks[i]);
        if (wrong < 0) { slots.forEach(s => { s.disabled = true; }); check(true); return; }
        check(false, 'Recitește propoziția ' + (wrong + 1) + ': „' + q.sentences[wrong] + '”. Ce face ea: spune, întreabă sau arată o emoție?');
      }, 'btn btn-primary'));
      return;
    }
    if (q.kind === 'hands-routine') {
      let selected = null;
      const where = q.cards.map(() => -1);
      const pool = document.createElement('div'); pool.className = 'hands-row';
      const day = document.createElement('div'); day.className = 'hands-day';
      const columns = q.slots.map((label, s) => {
        const column = document.createElement('div'); column.className = 'hands-column';
        const head = button(label, () => place(s), 'hands-zone');
        head.dataset.slot = String(s);
        const list = document.createElement('div'); list.className = 'hands-column-list';
        column.appendChild(head); column.appendChild(list); day.appendChild(column);
        return list;
      });
      const cards = q.cards.map((card, i) => {
        const node = button(card.text, () => {
          if (isSolved()) return;
          if (where[i] >= 0) { where[i] = -1; pool.appendChild(node); announce('„' + card.text + '” s-a întors în listă.', false); return; } // apăsarea unei activități așezate o readuce
          selected = selected === i ? null : i;
          cards.forEach((n, j) => n.classList.toggle('selected', j === selected));
          if (selected !== null) announce('Ai ales „' + card.text + '”. Apasă acum momentul zilei.', false);
        }, 'hands-card');
        node.dataset.card = String(i);
        pool.appendChild(node);
        return node;
      });
      const place = s => {
        if (isSolved() || selected === null) { if (selected === null) announce('Alege mai întâi o activitate.', true); return; }
        where[selected] = s; columns[s].appendChild(cards[selected]);
        cards[selected].classList.remove('selected');
        announce('Ai pus „' + q.cards[selected].text + '” la ' + q.slots[s].toLowerCase() + '. Apasă o activitate așezată ca să o muți.', false);
        selected = null;
      };
      content.appendChild(pool); content.appendChild(day);
      content.appendChild(button('Verifică planul', () => {
        if (isSolved()) return;
        if (where.some(s => s < 0)) { announce('Mai sunt activități neașezate.', true); return; }
        const wrong = q.cards.findIndex((card, i) => !card.allowed.includes(where[i]));
        if (wrong < 0) { cards.forEach(c => { c.disabled = true; }); check(true); return; }
        check(false, 'Verifică „' + q.cards[wrong].text + '”: ' + q.cards[wrong].why + '.');
      }, 'btn btn-primary'));
      return;
    }
    throw new Error('Joc practic necunoscut: ' + q.kind);
  }
};
