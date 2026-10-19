/* Cazurile sunt redactate separat; alegerile nu evaluează experiențe personale. */
const GAME_MISSIONS = {};
const MissionGames = {
  modes: ['evidence', 'repair', 'plan'],
  options(activityId) {
    const mission = GAME_MISSIONS[activityId];
    if (!mission) throw new Error('Lipsesc jocurile pentru ' + activityId + '.');
    return [
      { id: 'mission-evidence', mode: 'evidence', title: mission.titles.evidence, icon: '🔎',
        description: 'Investighezi o situație și alegi toate informațiile care ajută la răspuns. Separi dovezile relevante de detaliile fără legătură.' },
      { id: 'mission-repair', mode: 'repair', title: mission.titles.repair, icon: '🔧',
        description: 'Găsești pasul greșit într-o rezolvare și îl înlocuiești. Nu refaci la întâmplare pașii care sunt deja potriviți.' },
      { id: 'mission-plan', mode: 'plan', title: mission.titles.plan, icon: '🧩',
        description: 'Construiești un plan din cartonașe, lași deoparte pasul nepotrivit și alegi cum verifici rezultatul.' }
    ];
  },
  demo(activityId, mode) {
    if (!this.modes.includes(mode) || !GAME_MISSIONS[activityId]) throw new Error('Joc de investigație necunoscut.');
    return { type: 'mission', mode, activityId, levels: [{ rounds: 1 }, { rounds: 1 }, { rounds: 1 }] };
  },
  rounds(demo, level) {
    const mission = GAME_MISSIONS[demo.activityId];
    if (!mission || !this.modes.includes(demo.mode) || !Number.isInteger(level) || level < 0 || level > 2) {
      throw new Error('Caz sau nivel de investigație inexistent.');
    }
    const scenario = mission.cases[level];
    if (!scenario) throw new Error('Lipsește situația jocului pentru nivelul ales.');
    return [{
      kind: 'mission-' + demo.mode, scenario, passage: scenario.context, prompt: scenario.question,
      hint: demo.mode === 'evidence' ? 'Citește întrebarea. Pentru fiecare cartonaș, întreabă: mă ajută această informație să răspund sau este doar un detaliu al poveștii?' :
        demo.mode === 'repair' ? 'Compară fiecare pas cu informațiile din poveste. Alege locul nepotrivit, apoi o înlocuire care rezolvă eroarea.' :
          'Urmărește ce trebuie făcut înainte de alt pas. Păstrează trei cartonașe potrivite și caută o verificare legată de rezultat.',
      explain: scenario.plan.join(' ') + ' ' + scenario.check.correct
    }];
  },
  render(content, q, tools) {
    if (q.kind === 'mission-evidence') this.evidence(content, q, tools);
    else if (q.kind === 'mission-repair') this.repair(content, q, tools);
    else if (q.kind === 'mission-plan') this.plan(content, q, tools);
    else throw new Error('Interfață de investigație necunoscută: ' + q.kind);
  },
  text(parent, tag, text, className) {
    const node = document.createElement(tag);
    node.textContent = text;
    if (className) node.className = className;
    parent.appendChild(node);
    return node;
  },
  evidence(content, q, { button, check, isSolved }) {
    this.text(content, 'p', 'Alege toate cartonașele care ajută la răspuns, nu toate detaliile adevărate. Poți schimba alegerile înainte de verificare.', 'mission-instructions');
    const fieldset = document.createElement('fieldset');
    this.text(fieldset, 'legend', 'Ce informații sunt relevante?');
    const inputs = [];
    Engines.shuffle(q.scenario.facts.map((fact, index) => ({ fact, index }))).forEach(({ fact, index }) => {
      const label = document.createElement('label'); label.className = 'mission-fact';
      const input = document.createElement('input'); input.type = 'checkbox'; input.dataset.fact = index;
      label.appendChild(input); label.appendChild(document.createTextNode(' ' + fact.text));
      fieldset.appendChild(label); inputs.push({ input, fact });
    });
    content.appendChild(fieldset);
    const verify = button('Verifică dovezile', () => {
      if (isSolved()) return;
      const correct = inputs.every(item => item.input.checked === item.fact.relevant);
      if (correct) { fieldset.disabled = true; verify.disabled = true; }
      check(correct, correct ? 'Ai separat informațiile utile de detaliile fără legătură.' :
        'Mai verifică legătura fiecărui cartonaș cu întrebarea. Un detaliu poate fi adevărat fără să ajute la răspuns.');
    }, 'btn btn-primary');
    content.appendChild(verify);
  },
  repair(content, q, { button, check, isSolved }) {
    const scenario = q.scenario;
    let selectedStep = null, replacement = null;
    this.text(content, 'p', 'Un singur pas din rezolvarea de mai jos este greșit. Apasă pe acel pas, alege înlocuirea potrivită și verifică reparația.', 'mission-instructions');
    const steps = document.createElement('ol'); steps.className = 'mission-repair-steps';
    const choices = document.createElement('fieldset'); choices.hidden = true;
    this.text(choices, 'legend', 'Cu ce înlocuiești pasul ales?');
    const replacementInputs = [];
    Engines.shuffle([scenario.plan[scenario.error.index]].concat(scenario.error.alternatives)).forEach(text => {
      const label = document.createElement('label'); label.className = 'radio-choice';
      const input = document.createElement('input'); input.type = 'radio'; input.name = 'mission-replacement';
      input.dataset.correct = String(text === scenario.plan[scenario.error.index]);
      input.addEventListener('change', () => { if (!isSolved()) replacement = text; });
      replacementInputs.push(input); label.appendChild(input); label.appendChild(document.createTextNode(' ' + text)); choices.appendChild(label);
    });
    scenario.plan.forEach((text, index) => {
      const item = document.createElement('li');
      const node = button(index === scenario.error.index ? scenario.error.wrong : text, () => {
        if (isSolved()) return;
        selectedStep = index; replacement = null;
        replacementInputs.forEach(input => { input.checked = false; });
        steps.querySelectorAll('button').forEach(other => other.setAttribute('aria-pressed', String(other === node)));
        choices.hidden = false;
      }, 'mission-step');
      node.dataset.repairStep = index; node.setAttribute('aria-pressed', 'false');
      item.appendChild(node); steps.appendChild(item);
    });
    content.appendChild(steps); content.appendChild(choices);
    const verify = button('Verifică reparația', () => {
      if (isSolved()) return;
      const correct = selectedStep === scenario.error.index && replacement === scenario.plan[scenario.error.index];
      if (correct) {
        steps.querySelectorAll('button').forEach(node => { node.disabled = true; });
        choices.disabled = true; verify.disabled = true;
        steps.querySelector('[data-repair-step="' + selectedStep + '"]').textContent = replacement;
      }
      check(correct, selectedStep === null ? 'Alege întâi pasul care nu se potrivește cu povestea.' :
        replacement === null ? 'Alege și textul care va înlocui pasul.' :
          correct ? 'Ai reparat pasul nepotrivit și ai păstrat restul rezolvării.' : 'Verifică atât locul erorii, cât și înlocuirea. Compară cu informațiile din poveste.');
    }, 'btn btn-primary');
    content.appendChild(verify);
  },
  plan(content, q, { button, check, announce, isSolved }) {
    const scenario = q.scenario, selected = [];
    let planReady = false, verification = null;
    this.text(content, 'p', 'Alege trei pași și pune-i în ordinea cerută de situație. Un cartonaș nu se potrivește. Apasă un pas din plan ca să îl scoți; apoi verifică planul și alege cum controlezi rezultatul.', 'mission-instructions');
    this.text(content, 'h4', '1. Construiește planul');
    const row = document.createElement('ol'); row.className = 'mission-plan-selected'; row.setAttribute('aria-label', 'Planul construit');
    const pool = document.createElement('div'); pool.className = 'mission-plan-pool';
    const tokens = Engines.shuffle(scenario.plan.concat(scenario.error.wrong).map((text, id) => ({ text, id })));
    const update = () => {
      row.replaceChildren(); pool.replaceChildren();
      selected.forEach((id, position) => {
        const item = document.createElement('li');
        const node = button(tokens.find(token => token.id === id).text + ' ×', () => {
          if (isSolved() || planReady) return;
          selected.splice(position, 1); update();
        });
        node.disabled = planReady || isSolved(); item.appendChild(node); row.appendChild(item);
      });
      tokens.forEach(token => {
        const node = button(token.text, () => {
          if (isSolved() || planReady || selected.includes(token.id) || selected.length >= 3) return;
          selected.push(token.id); update();
        }, 'mission-step');
        node.dataset.planToken = token.id;
        node.disabled = planReady || isSolved() || selected.includes(token.id) || selected.length >= 3;
        pool.appendChild(node);
      });
    };
    content.appendChild(row); content.appendChild(pool);
    const final = document.createElement('fieldset'); final.hidden = true;
    this.text(final, 'legend', '2. Cum verifici rezultatul?');
    Engines.shuffle([scenario.check.correct].concat(scenario.check.wrong)).forEach(text => {
      const label = document.createElement('label'); label.className = 'radio-choice';
      const input = document.createElement('input'); input.type = 'radio'; input.name = 'mission-verification';
      input.dataset.correct = String(text === scenario.check.correct);
      input.addEventListener('change', () => { if (!isSolved()) verification = text; });
      label.appendChild(input); label.appendChild(document.createTextNode(' ' + text)); final.appendChild(label);
    });
    const verifyPlan = button('Verifică planul construit', () => {
      if (isSolved() || planReady) return;
      if (selected.length !== 3 || selected.some((id, index) => id !== index)) {
        check(false, 'Planul nu urmează încă situația. Scoate pasul nepotrivit sau schimbă ordinea; ai nevoie de trei pași.');
        return;
      }
      planReady = true; update(); verifyPlan.disabled = true; final.hidden = false;
      announce('Planul este potrivit. Mai ai un pas: alege cum verifici rezultatul.', false);
    }, 'btn btn-primary');
    const verifyResult = button('Verifică rezultatul planului', () => {
      if (isSolved() || !planReady) return;
      const correct = verification === scenario.check.correct;
      if (correct) { final.disabled = true; verifyResult.disabled = true; }
      check(correct, verification === null ? 'Alege o verificare înainte de a continua.' :
        correct ? 'Ai construit planul și ai ales un control legat de rezultat.' : 'O verificare trebuie să controleze rezultatul, nu un detaliu fără legătură.');
    }, 'btn btn-primary');
    content.appendChild(verifyPlan); content.appendChild(final); final.appendChild(verifyResult);
    update();
  }
};
