/* ============================================================
   ATELIERUL ȘCOLAR — Game Engines
   12 tipuri de jocuri interactive:
   quiz, count, match, arrange, classify, memory, clock, shapes, type,
   balance, shop, gen (jocuri generative și asimetrice)
   ============================================================ */

const Engines = {

  /* ---------- utilitare ---------- */
  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  status(container, msg, cls) {
    let el = container.querySelector('.g-status');
    if (!el) {
      el = document.createElement('div');
      el.className = 'g-status';
      container.appendChild(el);
    }
    el.textContent = msg;
    el.className = 'g-status' + (cls ? ' ' + cls : '');
  },

  /* ---------- QUIZ ---------- */
  quiz(container, demo, onDone) {
    let idx = 0;
    let score = 0;
    const total = demo.questions.length;

    const render = () => {
      const q = demo.questions[idx];
      container.innerHTML =
        '<div class="g-title">' + demo.title + '</div>' +
        '<div class="g-intro">' + demo.intro + '</div>' +
        '<div class="g-status">Întrebarea ' + (idx + 1) + ' din ' + total + ' · Scor: ' + score + '</div>' +
        '<div class="q-text" style="font-size:1.3rem;font-weight:800;margin:0.6rem 0">' + q.q + '</div>' +
        '<div class="quiz-options"></div>';

      const opts = container.querySelector('.quiz-options');
      q.options.forEach((opt, i) => {
        const b = document.createElement('button');
        b.className = 'quiz-opt';
        b.textContent = opt;
        b.addEventListener('click', () => {
          if (b.disabled) return;
          const correct = i === q.answer;
          if (correct) {
            b.classList.add('correct');
            score++;
            Sound.good();
          } else {
            b.classList.add('wrong');
            opts.children[q.answer].classList.add('correct');
            Sound.bad();
          }
          Array.from(opts.children).forEach(c => c.disabled = true);
          setTimeout(() => {
            idx++;
            if (idx < total) render();
            else finish();
          }, 1100);
        });
        opts.appendChild(b);
      });
    };

    const finish = () => {
      const pct = Math.round((score / total) * 100);
      container.innerHTML =
        '<div class="g-title">' + demo.title + '</div>' +
        '<div style="text-align:center;padding:1rem">' +
        '<div style="font-size:3rem">' + (pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '💪') + '</div>' +
        '<div style="font-size:1.5rem;font-weight:800;margin:0.5rem">Ai răspuns corect la ' + score + ' din ' + total + '!</div>' +
        '<div style="color:var(--text-soft);margin:0.4rem 0">' +
        (pct >= 80 ? 'Excelent! Ești un adevărat campion!' : pct >= 50 ? 'Foarte bine! Continuă să exersezi!' : 'Nu te da bătut! Încearcă din nou!') +
        '</div>' +
        '<button class="btn-replay" id="replay">🔄 Joacă din nou</button>' +
        '</div>';
      container.querySelector('#replay').addEventListener('click', () => {
        idx = 0; score = 0; render();
      });
      if (onDone) onDone(pct);
    };

    render();
  },

  /* ---------- COUNT ---------- */
  count(container, demo, onDone) {
    let idx = 0;
    let score = 0;
    const total = demo.items.length;

    const render = () => {
      const item = demo.items[idx];
      const emojis = Array.from({ length: item.count }, () => item.emoji).join(' ');
      container.innerHTML =
        '<div class="g-title">' + demo.title + '</div>' +
        '<div class="g-intro">' + demo.intro + '</div>' +
        '<div class="g-status">Numără: ' + (idx + 1) + ' din ' + total + '</div>' +
        '<div class="count-display" style="font-size:2.2rem;text-align:center;background:var(--bg-soft);border-radius:var(--radius-sm);padding:1rem;margin:0.6rem 0;letter-spacing:0.2rem">' + emojis + '</div>' +
        '<div class="quiz-options" style="grid-template-columns:repeat(3,1fr)"></div>';

      const opts = container.querySelector('.quiz-options');
      demo.items[idx].options.forEach((opt, i) => {
        const b = document.createElement('button');
        b.className = 'quiz-opt';
        b.textContent = opt;
        b.addEventListener('click', () => {
          if (b.disabled) return;
          const correct = opt === item.count;
          if (correct) { b.classList.add('correct'); score++; Sound.good(); }
          else { b.classList.add('wrong'); Sound.bad(); }
          Array.from(opts.children).forEach(c => c.disabled = true);
          setTimeout(() => { idx++; if (idx < total) render(); else finish(); }, 1000);
        });
        opts.appendChild(b);
      });
    };

    const finish = () => {
      const pct = Math.round((score / total) * 100);
      container.innerHTML =
        '<div class="g-title">' + demo.title + '</div>' +
        '<div style="text-align:center;padding:1rem">' +
        '<div style="font-size:3rem">' + (pct >= 80 ? '🏆' : '👍') + '</div>' +
        '<div style="font-size:1.4rem;font-weight:800;margin:0.5rem">Ai numărat corect ' + score + ' din ' + total + '!</div>' +
        '<button class="btn-replay" id="replay">🔄 Joacă din nou</button></div>';
      container.querySelector('#replay').addEventListener('click', () => { idx = 0; score = 0; render(); });
      if (onDone) onDone(pct);
    };

    render();
  },

  /* ---------- MATCH (perechi) ---------- */
  match(container, demo, onDone) {
    const left = demo.pairs.map(p => p.a);
    const right = Engines.shuffle(demo.pairs.map(p => p.b));
    let matched = 0;
    let selectedLeft = null;
    let selectedRight = null;

    container.innerHTML =
      '<div class="g-title">' + demo.title + '</div>' +
      '<div class="g-intro">' + demo.intro + '</div>' +
      '<div class="g-status">Perechi găsite: 0 din ' + demo.pairs.length + '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">' +
      '<div class="match-col" id="match-left"></div>' +
      '<div class="match-col" id="match-right"></div></div>';

    const leftCol = container.querySelector('#match-left');
    const rightCol = container.querySelector('#match-right');

    left.forEach((label, i) => {
      const el = document.createElement('div');
      el.className = 'game-item';
      el.textContent = label;
      el.dataset.idx = i;
      el.addEventListener('click', () => selectLeft(el, i));
      leftCol.appendChild(el);
    });
    right.forEach((label, i) => {
      const el = document.createElement('div');
      el.className = 'game-item';
      el.textContent = label;
      el.dataset.label = label;
      el.addEventListener('click', () => selectRight(el));
      rightCol.appendChild(el);
    });

    function selectLeft(el, i) {
      if (el.classList.contains('correct')) return;
      leftCol.querySelectorAll('.game-item').forEach(x => x.classList.remove('selected'));
      el.classList.add('selected');
      selectedLeft = { el, i };
      tryMatch();
    }
    function selectRight(el) {
      if (el.classList.contains('correct')) return;
      rightCol.querySelectorAll('.game-item').forEach(x => x.classList.remove('selected'));
      el.classList.add('selected');
      selectedRight = el;
      tryMatch();
    }
    function tryMatch() {
      if (!selectedLeft || !selectedRight) return;
      const pair = demo.pairs[selectedLeft.i];
      if (selectedRight.dataset.label === pair.b) {
        selectedLeft.el.classList.remove('selected');
        selectedLeft.el.classList.add('correct');
        selectedRight.classList.remove('selected');
        selectedRight.classList.add('correct');
        matched++;
        Sound.good();
        container.querySelector('.g-status').textContent = 'Perechi găsite: ' + matched + ' din ' + demo.pairs.length;
        selectedLeft = null; selectedRight = null;
        if (matched === demo.pairs.length) finish();
      } else {
        selectedLeft.el.classList.add('wrong');
        selectedRight.classList.add('wrong');
        Sound.bad();
        setTimeout(() => {
          selectedLeft.el.classList.remove('selected', 'wrong');
          selectedRight.classList.remove('selected', 'wrong');
          selectedLeft = null; selectedRight = null;
        }, 700);
      }
    }
    function finish() {
      container.querySelector('.g-status').textContent = '🎉 Ai găsit toate perechile!';
      container.querySelector('.g-status').classList.add('good');
      if (onDone) onDone(100);
    }
  },

  /* ---------- ARRANGE (ordine) ---------- */
  arrange(container, demo, onDone) {
    let idx = 0;
    let score = 0;
    const total = demo.questions.length;

    const render = () => {
      const q = demo.questions[idx];
      // Detectăm dacă e tipar (are pool) sau propoziție (words + answer)
      const isPattern = q.pool;
      container.innerHTML =
        '<div class="g-title">' + demo.title + '</div>' +
        '<div class="g-intro">' + demo.intro + '</div>' +
        '<div class="g-status">' + (isPattern ? 'Completează tiparul: ' : 'Pune cuvintele în ordine: ') + (idx + 1) + ' din ' + total + '</div>' +
        '<div class="arrange-row" id="arrange-row"></div>' +
        (isPattern ? '<div class="arrange-pool" id="arrange-pool"></div>' : '<div class="arrange-pool" id="arrange-pool"></div>');

      const row = container.querySelector('#arrange-row');
      const pool = container.querySelector('#arrange-pool');

      if (isPattern) {
        // Afișăm secvența cu ❓ la final
        q.words.forEach(w => {
          const slot = document.createElement('div');
          slot.className = 'arrange-slot' + (w === '❓' ? ' filled' : '');
          slot.textContent = w === '❓' ? '❓' : w;
          if (w === '❓') slot.id = 'pattern-slot';
          row.appendChild(slot);
        });
        // Pool cu opțiuni
        Engines.shuffle(q.pool).forEach(opt => {
          const el = document.createElement('div');
          el.className = 'game-item';
          el.textContent = opt;
          el.addEventListener('click', () => {
            const slot = container.querySelector('#pattern-slot');
            if (slot.classList.contains('correct')) return;
            if (opt === q.answer) {
              slot.textContent = opt;
              slot.classList.add('correct');
              slot.style.borderColor = 'var(--success)';
              score++;
              Sound.good();
              pool.querySelectorAll('.game-item').forEach(x => x.classList.add('disabled'));
              setTimeout(() => { idx++; if (idx < total) render(); else finish(); }, 1000);
            } else {
              el.classList.add('wrong');
              Sound.bad();
              setTimeout(() => el.classList.remove('wrong'), 500);
            }
          });
          pool.appendChild(el);
        });
      } else {
        // Propoziție: sloturi goale + pool cu cuvinte
        const wordCount = q.words.length;
        for (let i = 0; i < wordCount; i++) {
          const slot = document.createElement('div');
          slot.className = 'arrange-slot';
          slot.dataset.slot = i;
          row.appendChild(slot);
        }
        Engines.shuffle(q.words).forEach(word => {
          const el = document.createElement('div');
          el.className = 'game-item';
          el.style.fontSize = '1rem';
          el.textContent = word;
          el.addEventListener('click', () => {
            // Găsim primul slot gol
            const emptySlot = row.querySelector('.arrange-slot:not(.filled)');
            if (!emptySlot) return;
            emptySlot.textContent = word;
            emptySlot.classList.add('filled');
            el.classList.add('disabled');
            Sound.click();
            // Verificăm dacă toate sunt umplute
            const filledCount = row.querySelectorAll('.arrange-slot.filled').length;
            if (filledCount === wordCount) {
              const built = Array.from(row.querySelectorAll('.arrange-slot')).map(s => s.textContent).join(' ');
              const expected = q.answer || q.words.join(' ');
              if (built === expected) {
                row.querySelectorAll('.arrange-slot').forEach(s => { s.style.borderColor = 'var(--success)'; });
                score++;
                Sound.good();
              } else {
                row.querySelectorAll('.arrange-slot').forEach(s => { s.style.borderColor = 'var(--danger)'; });
                Sound.bad();
              }
              setTimeout(() => { idx++; if (idx < total) render(); else finish(); }, 1200);
            }
          });
          pool.appendChild(el);
        });
      }
    };

    const finish = () => {
      const pct = Math.round((score / total) * 100);
      container.innerHTML =
        '<div class="g-title">' + demo.title + '</div>' +
        '<div style="text-align:center;padding:1rem">' +
        '<div style="font-size:3rem">' + (pct >= 80 ? '🏆' : '👍') + '</div>' +
        '<div style="font-size:1.4rem;font-weight:800;margin:0.5rem">Ai reușit ' + score + ' din ' + total + '!</div>' +
        '<button class="btn-replay" id="replay">🔄 Joacă din nou</button></div>';
      container.querySelector('#replay').addEventListener('click', () => { idx = 0; score = 0; render(); });
      if (onDone) onDone(pct);
    };

    render();
  },

  /* ---------- CLASSIFY (sortare în zone) ---------- */
  classify(container, demo, onDone) {
    const items = Engines.shuffle(demo.items.slice());
    let placed = 0;
    let correct = 0;
    const total = items.length;

    container.innerHTML =
      '<div class="g-title">' + demo.title + '</div>' +
      '<div class="g-intro">' + demo.intro + '</div>' +
      '<div class="g-status">Sortate: 0 din ' + total + '</div>' +
      '<div class="game-grid" id="classify-pool"></div>' +
      '<div class="classify-zones" id="classify-zones"></div>';

    const pool = container.querySelector('#classify-pool');
    const zonesWrap = container.querySelector('#classify-zones');

    demo.zones.forEach((z, zi) => {
      const zone = document.createElement('div');
      zone.className = 'classify-zone';
      zone.dataset.zone = zi;
      zone.innerHTML = '<h4>' + z + '</h4><div class="cz-items"></div>';
      zonesWrap.appendChild(zone);
    });

    items.forEach((item, i) => {
      const el = document.createElement('div');
      el.className = 'game-item';
      el.style.fontSize = '1rem';
      el.textContent = item.label;
      el.addEventListener('click', () => {
        if (el.classList.contains('disabled')) return;
        // Afișăm zonele ca ținte — copilul alege zona prin click pe zonă
        // Simplificăm: click pe item selectează, apoi click pe zonă
        el.classList.add('selected');
        container.querySelectorAll('.classify-zone').forEach(z => {
          z.style.outline = '3px dashed var(--sc)';
          z.style.cursor = 'pointer';
        });
        container.querySelector('.g-status').textContent = 'Unde pui: „' + item.label + '”? Alege o zonă!';
        container.querySelectorAll('.classify-zone').forEach(z => {
          z.onclick = (e) => {
            if (e.target !== z && !z.contains(e.target)) return;
            placeItem(el, item, parseInt(z.dataset.zone));
          };
        });
      });
      pool.appendChild(el);
    });

    function placeItem(el, item, zoneIdx) {
      el.classList.remove('selected');
      container.querySelectorAll('.classify-zone').forEach(z => {
        z.style.outline = '';
        z.style.cursor = '';
        z.onclick = null;
      });
      const zone = container.querySelector('.classify-zone[data-zone="' + zoneIdx + '"]');
      const chip = document.createElement('span');
      chip.className = 'cz-item';
      chip.textContent = item.label;
      zone.querySelector('.cz-items').appendChild(chip);
      el.remove();
      placed++;

      if (zoneIdx === item.zone) {
        correct++;
        chip.style.borderColor = 'var(--success)';
        Sound.good();
      } else {
        chip.style.borderColor = 'var(--danger)';
        Sound.bad();
      }
      container.querySelector('.g-status').textContent = 'Sortate: ' + placed + ' din ' + total;

      if (placed === total) finish();
    }

    function finish() {
      const pct = Math.round((correct / total) * 100);
      container.querySelector('.g-status').textContent =
        '🎉 Ai sortat ' + correct + ' din ' + total + ' corect!';
      container.querySelector('.g-status').classList.add('good');
      const btn = document.createElement('button');
      btn.className = 'btn-replay';
      btn.textContent = '🔄 Joacă din nou';
      btn.addEventListener('click', () => location.reload());
      container.appendChild(btn);
      if (onDone) onDone(pct);
    }
  },

  /* ---------- MEMORY (perechi ascunse) ---------- */
  memory(container, demo, onDone) {
    const pairs = demo.pairs.slice(0, 6);
    const cards = Engines.shuffle(pairs.concat(pairs));
    let flipped = [];
    let matched = 0;
    let moves = 0;
    let lock = false;

    container.innerHTML =
      '<div class="g-title">' + demo.title + '</div>' +
      '<div class="g-intro">' + demo.intro + '</div>' +
      '<div class="g-status">Mutări: 0 · Perechi: 0 din ' + pairs.length + '</div>' +
      '<div class="memory-grid" id="memory-grid"></div>';

    const grid = container.querySelector('#memory-grid');
    cards.forEach((emoji, i) => {
      const card = document.createElement('div');
      card.className = 'memory-card';
      card.dataset.emoji = emoji;
      card.dataset.idx = i;
      card.innerHTML = '<div class="face">❓</div>';
      card.addEventListener('click', () => flip(card));
      grid.appendChild(card);
    });

    function flip(card) {
      if (lock) return;
      if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
      card.classList.add('flipped');
      card.querySelector('.face').textContent = card.dataset.emoji;
      Sound.click();
      flipped.push(card);
      if (flipped.length === 2) {
        moves++;
        lock = true;
        const [a, b] = flipped;
        if (a.dataset.emoji === b.dataset.emoji) {
          a.classList.add('matched');
          b.classList.add('matched');
          matched++;
          Sound.good();
          flipped = [];
          lock = false;
          updateStatus();
          if (matched === pairs.length) finish();
        } else {
          setTimeout(() => {
            a.classList.remove('flipped');
            b.classList.remove('flipped');
            a.querySelector('.face').textContent = '❓';
            b.querySelector('.face').textContent = '❓';
            flipped = [];
            lock = false;
            Sound.bad();
          }, 800);
        }
        updateStatus();
      }
    }

    function updateStatus() {
      container.querySelector('.g-status').textContent =
        'Mutări: ' + moves + ' · Perechi: ' + matched + ' din ' + pairs.length;
    }

    function finish() {
      container.querySelector('.g-status').textContent =
        '🎉 Ai găsit toate perechile în ' + moves + ' mutări!';
      container.querySelector('.g-status').classList.add('good');
      const btn = document.createElement('button');
      btn.className = 'btn-replay';
      btn.textContent = '🔄 Joacă din nou';
      btn.addEventListener('click', () => location.reload());
      container.appendChild(btn);
      if (onDone) onDone(100);
    }
  },

  /* ---------- CLOCK ---------- */
  clock(container, demo, onDone) {
    let idx = 0;
    let score = 0;
    const total = demo.questions.length;

    const render = () => {
      const q = demo.questions[idx];
      container.innerHTML =
        '<div class="g-title">' + demo.title + '</div>' +
        '<div class="g-intro">' + demo.intro + '</div>' +
        '<div class="g-status">Ceas: ' + (idx + 1) + ' din ' + total + '</div>' +
        '<div class="clock-face" id="clock-face"></div>' +
        '<div style="text-align:center;color:var(--text-soft);margin:0.4rem 0">' + q.desc + '</div>' +
        '<div class="quiz-options" style="grid-template-columns:repeat(3,1fr)"></div>';

      Engines.drawClock(container.querySelector('#clock-face'), q.hour, q.minute);

      const opts = container.querySelector('.quiz-options');
      q.options.forEach((opt, i) => {
        const b = document.createElement('button');
        b.className = 'quiz-opt';
        b.textContent = opt;
        b.addEventListener('click', () => {
          if (b.disabled) return;
          // Ora corectă este q.hour + ':00'
          const correctOpt = q.hour + ':00';
          if (opt === correctOpt) {
            b.classList.add('correct'); score++; Sound.good();
          } else {
            b.classList.add('wrong');
            Array.from(opts.children).forEach(c => { if (c.textContent === correctOpt) c.classList.add('correct'); });
            Sound.bad();
          }
          Array.from(opts.children).forEach(c => c.disabled = true);
          setTimeout(() => { idx++; if (idx < total) render(); else finish(); }, 1100);
        });
        opts.appendChild(b);
      });
    };

    const finish = () => {
      const pct = Math.round((score / total) * 100);
      container.innerHTML =
        '<div class="g-title">' + demo.title + '</div>' +
        '<div style="text-align:center;padding:1rem">' +
        '<div style="font-size:3rem">' + (pct >= 80 ? '🏆' : '👍') + '</div>' +
        '<div style="font-size:1.4rem;font-weight:800;margin:0.5rem">Ai citit corect ' + score + ' din ' + total + ' ceasuri!</div>' +
        '<button class="btn-replay" id="replay">🔄 Joacă din nou</button></div>';
      container.querySelector('#replay').addEventListener('click', () => { idx = 0; score = 0; render(); });
      if (onDone) onDone(pct);
    };

    render();
  },

  drawClock(face, hour, minute) {
    face.innerHTML = '';
    // Ticks
    for (let i = 0; i < 12; i++) {
      const tick = document.createElement('div');
      tick.className = 'tick';
      const angle = i * 30;
      tick.style.transform = 'rotate(' + angle + 'deg) translateY(80px)';
      face.appendChild(tick);
      // Numere
      const num = document.createElement('div');
      num.className = 'clock-num';
      const n = i === 0 ? 12 : i;
      const rad = (angle - 90) * Math.PI / 180;
      const x = 50 + 38 * Math.cos(rad);
      const y = 50 + 38 * Math.sin(rad);
      num.style.left = x + '%';
      num.style.top = y + '%';
      num.style.transform = 'translate(-50%, -50%)';
      num.textContent = n;
      face.appendChild(num);
    }
    // Hands
    const hourAngle = (hour % 12) * 30 + (minute / 60) * 30;
    const minAngle = minute * 6;
    const hourHand = document.createElement('div');
    hourHand.className = 'clock-hand hour';
    hourHand.style.transform = 'rotate(' + hourAngle + 'deg)';
    face.appendChild(hourHand);
    const minHand = document.createElement('div');
    minHand.className = 'clock-hand minute';
    minHand.style.transform = 'rotate(' + minAngle + 'deg)';
    face.appendChild(minHand);
    const center = document.createElement('div');
    center.className = 'clock-center';
    face.appendChild(center);
  },

  /* ---------- SHAPES ---------- */
  shapes(container, demo, onDone) {
    let idx = 0;
    let score = 0;
    const total = demo.questions.length;

    const render = () => {
      const q = demo.questions[idx];
      container.innerHTML =
        '<div class="g-title">' + demo.title + '</div>' +
        '<div class="g-intro">' + demo.intro + '</div>' +
        '<div class="g-status">Formă: ' + (idx + 1) + ' din ' + total + '</div>' +
        '<div class="shape-display">' + Engines.shapeSVG(q.shape) + '</div>' +
        '<div class="quiz-options" style="grid-template-columns:repeat(3,1fr)"></div>';

      const opts = container.querySelector('.quiz-options');
      q.options.forEach((opt, i) => {
        const b = document.createElement('button');
        b.className = 'quiz-opt';
        b.textContent = opt;
        b.addEventListener('click', () => {
          if (b.disabled) return;
          if (opt === q.name) {
            b.classList.add('correct'); score++; Sound.good();
          } else {
            b.classList.add('wrong');
            Array.from(opts.children).forEach(c => { if (c.textContent === q.name) c.classList.add('correct'); });
            Sound.bad();
          }
          Array.from(opts.children).forEach(c => c.disabled = true);
          setTimeout(() => { idx++; if (idx < total) render(); else finish(); }, 1100);
        });
        opts.appendChild(b);
      });
    };

    const finish = () => {
      const pct = Math.round((score / total) * 100);
      container.innerHTML =
        '<div class="g-title">' + demo.title + '</div>' +
        '<div style="text-align:center;padding:1rem">' +
        '<div style="font-size:3rem">' + (pct >= 80 ? '🏆' : '👍') + '</div>' +
        '<div style="font-size:1.4rem;font-weight:800;margin:0.5rem">Ai recunoscut corect ' + score + ' din ' + total + ' forme!</div>' +
        '<button class="btn-replay" id="replay">🔄 Joacă din nou</button></div>';
      container.querySelector('#replay').addEventListener('click', () => { idx = 0; score = 0; render(); });
      if (onDone) onDone(pct);
    };

    render();
  },

  shapeSVG(shape) {
    const color = 'var(--sc, #4f8cff)';
    switch (shape) {
      case 'circle':
        return '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="' + color + '" opacity="0.85"/></svg>';
      case 'square':
        return '<svg viewBox="0 0 100 100"><rect x="15" y="15" width="70" height="70" fill="' + color + '" opacity="0.85"/></svg>';
      case 'triangle':
        return '<svg viewBox="0 0 100 100"><polygon points="50,10 90,90 10,90" fill="' + color + '" opacity="0.85"/></svg>';
      case 'rectangle':
        return '<svg viewBox="0 0 100 100"><rect x="10" y="30" width="80" height="40" fill="' + color + '" opacity="0.85"/></svg>';
      case 'star':
        return '<svg viewBox="0 0 100 100"><polygon points="50,5 61,38 95,38 68,59 78,92 50,72 22,92 32,59 5,38 39,38" fill="' + color + '" opacity="0.85"/></svg>';
      case 'pentagon':
        return '<svg viewBox="0 0 100 100"><polygon points="50,10 90,40 75,90 25,90 10,40" fill="' + color + '" opacity="0.85"/></svg>';
      default:
        return '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="' + color + '"/></svg>';
    }
  },

  /* ---------- TYPE (scriere) ---------- */
  type(container, demo, onDone) {
    container.innerHTML =
      '<div class="g-title">' + demo.title + '</div>' +
      '<div class="g-intro">' + demo.intro + '</div>' +
      '<div class="g-status">' + demo.prompt + '</div>' +
      '<input type="text" class="type-input" id="type-input" placeholder="Scrie aici..." autocomplete="off">' +
      '<div style="margin-top:0.8rem;color:var(--text-soft);font-size:0.9rem">' +
      '<strong>Exemple:</strong><br>' +
      demo.examples.map(e => '• ' + e).join('<br>') +
      '</div>' +
      '<div style="margin-top:0.8rem"><button class="btn btn-primary" id="type-check">✅ Verifică</button></div>' +
      '<div id="type-feedback" style="margin-top:0.8rem;font-weight:800"></div>';

    const input = container.querySelector('#type-input');
    const feedback = container.querySelector('#type-feedback');
    container.querySelector('#type-check').addEventListener('click', () => {
      const val = input.value.trim();
      if (val.length < 3) {
        feedback.textContent = 'Scrie o propoziție mai lungă!';
        feedback.style.color = 'var(--danger)';
        return;
      }
      feedback.textContent = '🎉 Foarte bine! Ai scris: „' + val + '”';
      feedback.style.color = 'var(--success)';
      Sound.good();
      Confetti.burst();
      if (onDone) onDone(100);
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') container.querySelector('#type-check').click();
    });
    input.focus();
  },

  /* ---------- BALANCE (balanță — formă fizică din jurul tău) ----------
     Joc generativ și asimetric: două tăvi cu numere diferite de obiecte.
     Copilul învață comparația, egalitatea și scăderea prin balanță. */
  balance(container, demo, onDone) {
    const ROUNDS = demo.rounds || 5;
    const emoji = demo.emoji || '🍎';
    let idx = 0;
    let score = 0;

    // generează o rundă: stânga vs. dreapta (asimetric)
    const genRound = () => {
      const left = 1 + Math.floor(Math.random() * 9);
      let right;
      const r = Math.random();
      if (r < 0.3) right = left;                 // egale
      else if (r < 0.65) right = left + 1 + Math.floor(Math.random() * 4); // dreapta mai grea
      else right = Math.max(1, left - (1 + Math.floor(Math.random() * 4))); // stânga mai grea
      return { left, right };
    };

    const render = () => {
      const r = genRound();
      const diff = r.left - r.right;
      const tilt = Math.max(-18, Math.min(18, diff * 3)); // unghiul de înclinare
      const leftItems = Array.from({ length: r.left }, () => emoji).join(' ');
      const rightItems = Array.from({ length: r.right }, () => emoji).join(' ');

      const correct = diff > 0 ? 0 : diff < 0 ? 1 : 2;
      const options = ['Partea stângă ⬅️', 'Partea dreaptă ➡️', 'Sunt egale ⚖️'];

      container.innerHTML =
        '<div class="g-title">' + demo.title + '</div>' +
        '<div class="g-intro">' + demo.intro + '</div>' +
        '<div class="g-status">Rundă ' + (idx + 1) + ' din ' + ROUNDS + ' · Scor: ' + score + '</div>' +
        '<div class="balance-scale">' +
          '<div class="balance-beam" style="transform:rotate(' + tilt + 'deg)">' +
            '<div class="balance-pan balance-pan-left"><div class="balance-pan-objects">' + leftItems + '</div><div class="balance-pan-label">' + r.left + '</div></div>' +
            '<div class="balance-pan balance-pan-right"><div class="balance-pan-objects">' + rightItems + '</div><div class="balance-pan-label">' + r.right + '</div></div>' +
          '</div>' +
          '<div class="balance-fulcrum"></div>' +
          '<div class="balance-base"></div>' +
        '</div>' +
        '<div class="quiz-options" style="grid-template-columns:repeat(3,1fr)"></div>';

      const opts = container.querySelector('.quiz-options');
      options.forEach((opt, i) => {
        const b = document.createElement('button');
        b.className = 'quiz-opt';
        b.textContent = opt;
        b.addEventListener('click', () => {
          if (b.disabled) return;
          if (i === correct) { b.classList.add('correct'); score++; Sound.good(); }
          else {
            b.classList.add('wrong');
            Array.from(opts.children).forEach(c => { if (c.textContent === options[correct]) c.classList.add('correct'); });
            Sound.bad();
          }
          Array.from(opts.children).forEach(c => c.disabled = true);
          setTimeout(() => { idx++; if (idx < ROUNDS) render(); else finish(); }, 1100);
        });
        opts.appendChild(b);
      });
    };

    const finish = () => {
      const pct = Math.round((score / ROUNDS) * 100);
      container.innerHTML =
        '<div class="g-title">' + demo.title + '</div>' +
        '<div style="text-align:center;padding:1rem">' +
        '<div style="font-size:3rem">' + (pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '💪') + '</div>' +
        '<div style="font-size:1.4rem;font-weight:800;margin:0.5rem">Ai echilibrat corect ' + score + ' din ' + ROUNDS + '!</div>' +
        '<div style="color:var(--text-soft);margin:0.4rem 0">Balanța ne arată care parte are mai multe obiecte — partea mai grea coboară!</div>' +
        '<button class="btn-replay" id="replay">🔄 Joacă din nou</button></div>';
      container.querySelector('#replay').addEventListener('click', () => { idx = 0; score = 0; render(); });
      if (onDone) onDone(pct);
    };

    render();
  },

  /* ---------- SHOP (magazinul — bani și prețuri din viața reală) ----------
     Joc generativ: prețuri aleatorii, copilul calculează restul de bani. */
  shop(container, demo, onDone) {
    const ROUNDS = demo.rounds || 5;
    const items = demo.items || [
      { name: 'Pâine', emoji: '🍞' }, { name: 'Lapte', emoji: '🥛' },
      { name: 'Mere', emoji: '🍎' }, { name: 'Ciocolată', emoji: '🍫' },
      { name: 'Carte', emoji: '📖' }, { name: 'Crayon', emoji: '🖍️' }
    ];
    let idx = 0;
    let score = 0;

    const genRound = () => {
      const item = items[Math.floor(Math.random() * items.length)];
      const price = (1 + Math.floor(Math.random() * 9)) * 5; // 5..45 lei
      const wallet = price + (1 + Math.floor(Math.random() * 8)) * 5; // mai mult decât prețul
      const change = wallet - price;
      const opts = Engines.shuffle([change, change + 5, change - 5 > 0 ? change - 5 : change + 10]);
      return { item, price, wallet, change, opts: Array.from(new Set(opts)) };
    };

    const render = () => {
      const r = genRound();
      const coins = Array.from({ length: Math.min(r.wallet / 5, 10) }, () => '🪙').join(' ');
      container.innerHTML =
        '<div class="g-title">' + demo.title + '</div>' +
        '<div class="g-intro">' + demo.intro + '</div>' +
        '<div class="g-status">Cumpărare ' + (idx + 1) + ' din ' + ROUNDS + ' · Scor: ' + score + '</div>' +
        '<div class="shop-scene">' +
          '<div class="shop-item-card"><div class="shop-item-emoji">' + r.item.emoji + '</div><div class="shop-item-name">' + r.item.name + '</div><div class="shop-item-price">' + r.price + ' lei</div></div>' +
          '<div class="shop-wallet"><div class="shop-wallet-label">Bani în buzunar</div><div class="shop-wallet-amount">' + r.wallet + ' lei</div><div class="shop-wallet-coins">' + coins + '</div></div>' +
        '</div>' +
        '<div class="q-text" style="font-size:1.2rem;font-weight:800;margin:0.6rem 0;text-align:center">Cât ban primești de la casieră?</div>' +
        '<div class="quiz-options" style="grid-template-columns:repeat(3,1fr)"></div>';

      const opts = container.querySelector('.quiz-options');
      r.opts.forEach((opt, i) => {
        const b = document.createElement('button');
        b.className = 'quiz-opt';
        b.textContent = opt + ' lei';
        b.addEventListener('click', () => {
          if (b.disabled) return;
          if (opt === r.change) { b.classList.add('correct'); score++; Sound.good(); }
          else {
            b.classList.add('wrong');
            Array.from(opts.children).forEach(c => { if (c.textContent === r.change + ' lei') c.classList.add('correct'); });
            Sound.bad();
          }
          Array.from(opts.children).forEach(c => c.disabled = true);
          setTimeout(() => { idx++; if (idx < ROUNDS) render(); else finish(); }, 1100);
        });
        opts.appendChild(b);
      });
    };

    const finish = () => {
      const pct = Math.round((score / ROUNDS) * 100);
      container.innerHTML =
        '<div class="g-title">' + demo.title + '</div>' +
        '<div style="text-align:center;padding:1rem">' +
        '<div style="font-size:3rem">' + (pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '💪') + '</div>' +
        '<div style="font-size:1.4rem;font-weight:800;margin:0.5rem">Ai calculat corect restul la ' + score + ' din ' + ROUNDS + '!</div>' +
        '<div style="color:var(--text-soft);margin:0.4rem 0">La magazin, restul de bani este ce rămâne după ce plătești prețul.</div>' +
        '<button class="btn-replay" id="replay">🔄 Joacă din nou</button></div>';
      container.querySelector('#replay').addEventListener('click', () => { idx = 0; score = 0; render(); });
      if (onDone) onDone(pct);
    };

    render();
  },

  /* ---------- GEN (forme din jurul tău — matematică prin obiecte reale) ----------
     Joc generativ: scenarii aleatorii cu obiecte fizice din mediul înconjurător. */
  gen(container, demo, onDone) {
    const ROUNDS = demo.rounds || 5;
    let idx = 0;
    let score = 0;

    // scenarii cu obiecte fizice din jurul copilului
    const scenarios = [
      {
        make: () => {
          const baskets = 1 + Math.floor(Math.random() * 4);
          const per = 2 + Math.floor(Math.random() * 4);
          const total = baskets * per;
          const scene = Array.from({ length: baskets }, () => '🧺').join(' ');
          return {
            scene,
            text: 'Sunt ' + baskets + ' coșuri, fiecare cu ' + per + ' mere. Câte mere sunt în total?',
            answer: total,
            explain: baskets + ' × ' + per + ' = ' + total
          };
        }
      },
      {
        make: () => {
          const chairs = 1 + Math.floor(Math.random() * 4);
          const total = chairs * 4;
          const scene = Array.from({ length: chairs }, () => '🪑').join(' ');
          return {
            scene,
            text: 'Sunt ' + chairs + ' scaune. Fiecare scaun are 4 picioare. Câte picioare sunt în total?',
            answer: total,
            explain: chairs + ' × 4 = ' + total
          };
        }
      },
      {
        make: () => {
          const bikes = 1 + Math.floor(Math.random() * 4);
          const total = bikes * 2;
          const scene = Array.from({ length: bikes }, () => '🚲').join(' ');
          return {
            scene,
            text: 'Sunt ' + bikes + ' biciclete. Fiecare are 2 roți. Câte roți sunt în total?',
            answer: total,
            explain: bikes + ' × 2 = ' + total
          };
        }
      },
      {
        make: () => {
          const hands = 1 + Math.floor(Math.random() * 3);
          const total = hands * 5;
          const scene = Array.from({ length: hands }, () => '✋').join(' ');
          return {
            scene,
            text: 'Sunt ' + hands + ' mâini. Fiecare mână are 5 degete. Câte degete sunt în total?',
            answer: total,
            explain: hands + ' × 5 = ' + total
          };
        }
      },
      {
        make: () => {
          const start = 3 + Math.floor(Math.random() * 6);
          const eaten = 1 + Math.floor(Math.random() * Math.max(1, start - 1));
          const left = start - eaten;
          const scene = Array.from({ length: start }, () => '🍎').join(' ');
          return {
            scene,
            text: 'În coș sunt ' + start + ' mere. Mănânci ' + eaten + '. Câte mere mai rămân?',
            answer: left,
            explain: start + ' − ' + eaten + ' = ' + left
          };
        }
      },
      {
        make: () => {
          const a = 2 + Math.floor(Math.random() * 6);
          const b = 2 + Math.floor(Math.random() * 6);
          const total = a + b;
          const scene = Array.from({ length: a }, () => '🐤').join(' ') + '  +  ' + Array.from({ length: b }, () => '🐥').join(' ');
          return {
            scene,
            text: 'Sunt ' + a + ' pui și încă ' + b + ' pui. Câte pui sunt în total?',
            answer: total,
            explain: a + ' + ' + b + ' = ' + total
          };
        }
      }
    ];

    const genRound = () => {
      const s = scenarios[Math.floor(Math.random() * scenarios.length)].make();
      const opts = Engines.shuffle([s.answer, s.answer + 1, s.answer - 1 > 0 ? s.answer - 1 : s.answer + 2]);
      return Object.assign(s, { opts: Array.from(new Set(opts)) });
    };

    const render = () => {
      const r = genRound();
      container.innerHTML =
        '<div class="g-title">' + demo.title + '</div>' +
        '<div class="g-intro">' + demo.intro + '</div>' +
        '<div class="g-status">Sarcină ' + (idx + 1) + ' din ' + ROUNDS + ' · Scor: ' + score + '</div>' +
        '<div class="gen-scene"><div class="gen-objects">' + r.scene + '</div></div>' +
        '<div class="q-text" style="font-size:1.2rem;font-weight:800;margin:0.6rem 0;text-align:center">' + r.text + '</div>' +
        '<div class="quiz-options" style="grid-template-columns:repeat(3,1fr)"></div>';

      const opts = container.querySelector('.quiz-options');
      r.opts.forEach((opt, i) => {
        const b = document.createElement('button');
        b.className = 'quiz-opt';
        b.textContent = opt;
        b.addEventListener('click', () => {
          if (b.disabled) return;
          if (opt === r.answer) { b.classList.add('correct'); score++; Sound.good(); }
          else {
            b.classList.add('wrong');
            Array.from(opts.children).forEach(c => { if (c.textContent === String(r.answer)) c.classList.add('correct'); });
            Sound.bad();
          }
          Array.from(opts.children).forEach(c => c.disabled = true);
          setTimeout(() => { idx++; if (idx < ROUNDS) render(); else finish(); }, 1100);
        });
        opts.appendChild(b);
      });
    };

    const finish = () => {
      const pct = Math.round((score / ROUNDS) * 100);
      container.innerHTML =
        '<div class="g-title">' + demo.title + '</div>' +
        '<div style="text-align:center;padding:1rem">' +
        '<div style="font-size:3rem">' + (pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '💪') + '</div>' +
        '<div style="font-size:1.4rem;font-weight:800;margin:0.5rem">Ai rezolvat corect ' + score + ' din ' + ROUNDS + '!</div>' +
        '<div style="color:var(--text-soft);margin:0.4rem 0">Matematica este peste tot în jurul tău: în coșuri, scaune, roți și degete!</div>' +
        '<button class="btn-replay" id="replay">🔄 Joacă din nou</button></div>';
      container.querySelector('#replay').addEventListener('click', () => { idx = 0; score = 0; render(); });
      if (onDone) onDone(pct);
    };

    render();
  }
};
