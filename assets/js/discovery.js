/* Ilustrații SVG originale și explorări fără notă sau salvarea răspunsurilor. */
const Discovery = {
  render(activity) {
    const e = Engines.escape, practice = activity.practical, exploration = this.exploration(activity);
    const themes = { mat: ['Atelierul ideilor', 'Construiește. Schimbă. Verifică.'], lim: ['Povești pe o pagină', 'Ascultă. Citește. Povestește.'],
      log: ['Biroul detectivilor', 'Observă. Caută regula. Explică.'], inf: ['Micul laborator de programe', 'Planifică. Rulează. Repară.'],
      sci: ['Carnetul de explorator', 'Întreabă. Observă. Compară.'], civ: ['Împreună în aceeași poveste', 'Ascultă. Alege. Ai grijă.'] };
    const theme = themes[activity.subject];
    return '<div class="discovery-spread" data-discovery="' + activity.id + '">' +
      '<header class="discovery-cover"><div><p class="eyebrow">' + theme[0] + '</p><h2>' + theme[1] + '</h2><p class="lesson-goal">' + e(activity.objectives[0]) + '</p>' +
      '<div class="game-controls"><button class="btn" id="read-lesson">Ascultă explicația</button><button class="btn" id="stop-reading" hidden>Oprește citirea</button></div></div>' +
      '<figure class="discovery-picture">' + this.scene(activity) + '<figcaption>' + e(this.caption(activity)) + '</figcaption></figure></header>' +
      '<div class="discovery-layout"><article class="discovery-card idea-card"><p class="eyebrow">O idee de luat cu tine</p><h3>Ce merită observat?</h3><p>' + e(activity.explanation[0]) + '</p></article>' +
      '<section class="discovery-card discovery-workbench"><p class="eyebrow">' + (activity.subject === 'mat' ? 'Experimente pe ecran' : 'Încercăm pas cu pas') +
      '</p><h3>' + e(exploration.title) + '</h3><p>' + e(exploration.context) + '</p>' +
      (activity.subject === 'mat' ? '<ol class="exploration-instructions">' + exploration.steps.map(step => '<li>' + e(step) + '</li>').join('') + '</ol>' :
        '<p class="exploration-example"><strong>Povestea de la care pornim:</strong> ' + e(activity.explanation[1]) + '</p><p><strong>Dacă vrei să lucrezi cu obiecte:</strong> ' + e(practice.materials) + '</p>') +
      '<p>Aceasta este o încercare liberă, fără notă și fără stele.</p><div data-discovery-lab></div></section>' +
      '<article class="discovery-card example-card"><p class="eyebrow">Privește o rezolvare</p><h3>Un exemplu, nu o rețetă de memorat</h3><p>' + e(activity.explanation[1]) + '</p>' +
      '<details><summary>Desfacem ideea în pași</summary><ol class="discovery-steps">' + activity.guided.map(step => '<li>' + e(step) + '</li>').join('') + '</ol></details></article>' +
      '<aside class="discovery-card detective-note"><p class="eyebrow">Lupa detectivului</p><h3>Ce te-ar putea păcăli?</h3><p>' + e(activity.explanation[2]) + '</p></aside>' +
      '<section class="discovery-card hands-on"><p class="eyebrow">Din ecran în camera ta</p><h3>O tavă cu idei</h3><p><strong>Pregătește:</strong> ' + e(practice.materials) + '</p><ol>' +
      practice.steps.map(step => '<li>' + e(step) + '</li>').join('') + '</ol><p class="self-check"><strong>Verifică singur:</strong> ' + e(practice.check) + '</p>' +
      '<p class="safety-note">Alege materialele și ritmul potrivit. Pentru obiecte mici sau activități afară, cere supravegherea unui adult.</p></section>' +
      '<section class="discovery-card reflection-card"><p class="eyebrow">Bilet de explorator</p><h3>Arată cum ai gândit</h3><p>' + e(activity.questions[0]) + '</p><p>Poți răspunde printr-un desen, cu obiecte sau printr-o scurtă poveste.</p>' +
      '<button class="btn btn-primary" data-open-game>Îmi testez ideea în atelier</button></section></div></div>';
  },
  exploration(activity) {
    if (activity.subject !== 'mat') return {
      title: 'Exersează: ' + activity.title,
      context: 'Pornește de la exemplul de mai jos. Apasă pe rând butoanele numerotate ca să vezi ce ai de făcut. Răspunsul îl spui, îl desenezi sau îl arăți cu obiecte; nu trebuie să scrii în pagină.' +
        (activity.subject === 'civ' ? ' Poți folosi personaje inventate. Nu trebuie să povestești experiențe personale.' : '')
    };
    const experiments = {
      1: ['Construiește același număr în două feluri', 'Începem cu 34: trei bare de câte zece și patru unități separate. Fiecare bară are zece segmente.',
        ['La „Zeci desfăcute în unități”, apasă plus o dată.', 'Numără barele și unitățile rămase. Ai tot 34?', 'Apasă minus ca să refaci grupul. Apoi alege alt număr și încearcă din nou.']],
      2: ['Ce se întâmplă când mai adaugi un obiect?', 'Ai 8 obiecte și adaugi încă 5. Punctele cu altă culoare arată obiectele adăugate.',
        ['Privește cele două cantități și totalul 13.', 'La „Câte adăugăm”, apasă plus o dată. Ce total obții?', 'Apasă minus o dată. Verifică dacă ai revenit la 13.']],
      3: ['Ia un obiect și urmărește ce rămâne', 'Pornim cu 8 obiecte și luăm 5. Punctele tăiate sunt obiectele luate; celelalte au rămas.',
        ['Numără punctele care nu sunt tăiate.', 'La „Câte luăm”, apasă plus o dată. Rămân mai multe sau mai puține?', 'Apasă minus o dată și verifică rezultatul de la început.']],
      4: ['Întoarce forma, fără să-i schimbi numele', 'Vezi un pătrat. Poți alege altă formă și o poți roti cu butoanele de mai jos.',
        ['Numără laturile și colțurile pătratului.', 'La „Rotirea, în grade”, apasă plus o dată. Numără din nou.', 'Alege un triunghi și repetă. Poziția schimbă numărul de laturi?']],
      5: ['Mută banda, nu lungimea ei', 'Banda începe la 2 cm și se termină la 9 cm. Lungimea ei este 9 − 2 = 7 cm.',
        ['Lasă „Lungimea benzii” la 7.', 'La „Reperul de început”, apasă plus o dată. Privește ambele capete.', 'Scade începutul din sfârșit. Banda are tot 7 cm?']],
      6: ['Dă ceasul înainte cu cinci minute', 'Ceasul arată 3:30. Acul lung arată minutele, iar cel scurt arată ora.',
        ['Găsește acul lung și acul scurt în desen.', 'La „Minutele”, apasă plus o dată. Citește ora afișată.', 'Urmărește cum s-au mișcat ambele ace. Apasă minus ca să revii.']],
      7: ['Adu balanța la echilibru', 'Pe talerul stâng sunt 4 cuburi, iar pe cel drept sunt 7. Toate cuburile cântăresc la fel.',
        ['Privește care taler este mai jos.', 'La „Cuburi identice în stânga”, apasă plus de trei ori.', 'Când ai 7 cuburi pe fiecare taler, apasă încă o dată plus. Ce parte coboară acum?']],
      8: ['Ajung banii pentru încă un caiet?', 'Un caiet costă 3 lei. Începem cu 2 caiete și un buget de 10 lei.',
        ['Citește prețul total și câți bani rămân.', 'La „Caiete de 3 lei”, apasă plus o dată. Mai ajung banii?', 'Adaugă încă un caiet. Folosește apoi plus la buget până ai suma necesară.']],
      9: ['Explorează conturul unei fețe', 'Aici rotim forme plane, ca desenele fețelor unor corpuri. Desenul nu reprezintă întregul corp.',
        ['Alege o formă și numără laturile ei.', 'Apasă plus la „Rotirea, în grade”. Ce s-a schimbat în desen?', 'Numără din nou laturile și colțurile. Forma a rămas aceeași?']],
      10: ['Desfă un grup de zece și numără din nou', 'Numărul 34 este arătat prin grupuri de zece și unități. Vrem să schimbăm gruparea, nu cantitatea.',
        ['La „Zeci desfăcute în unități”, apasă plus.', 'Observă cum o bară este înlocuită cu zece unități.', 'Verifică totalul, apoi apasă minus pentru a reface grupul.']],
      11: ['Primești timbre, apoi oferi trei', 'Ai 8 timbre, primești 5 și apoi oferi 3. Punctele tăiate arată cele trei timbre oferite.',
        ['Urmărește cele două calcule: 8 + 5 = 13, apoi 13 − 3 = 10.', 'La „Câte adăugăm”, apasă plus o dată.', 'Câte timbre rămân acum? Cele trei oferite rămân aceleași.']],
      12: ['Descoperă jumătatea unui întreg', 'Întregul este împărțit în 8 părți egale. La început, 4 dintre ele sunt colorate: o jumătate.',
        ['La „Optimi colorate”, apasă plus o dată. Mai este colorată doar jumătate?', 'Apasă minus ca să revii la 4 părți colorate.', 'Continuă cu plus până la 8. Ai colorat întregul?']]
    };
    const experiment = experiments[activity.num];
    if (!experiment) throw new Error('Lipsește explorarea pentru ' + activity.id + '.');
    return { title: experiment[0], context: experiment[1], steps: experiment[2] };
  },
  caption(activity) {
    if (activity.subject !== 'mat') return { lim: 'Din semne și cuvinte construim o poveste.', log: 'Piese diferite pot ascunde aceeași regulă.', inf: 'Un plan se urmărește pas cu pas.',
      sci: 'În natură observăm înainte să tragem concluzii.', civ: 'Fiecare persoană are o perspectivă care merită ascultată.' }[activity.subject];
    return { 1: 'Un grup de zece poate fi desfăcut în zece unități.', 2: 'Două grupe se întâlnesc într-un întreg.', 3: 'Ce a rămas? Ce s-a schimbat?', 4: 'Un oraș construit din contururi.',
      5: 'Distanța dintre repere este lungimea.', 6: 'Două ace, două feluri de a număra.', 7: 'Echilibrul înseamnă egalitate.', 8: 'Un coș de cumpărături are și un plan.',
      9: 'Observă fețele și contururile, nu doar numele obiectelor.', 10: 'Aceeași cantitate, o altă grupare.', 11: 'Fiecare schimbare are locul ei în poveste.', 12: 'Părțile egale reconstruiesc întregul.' }[activity.num];
  },
  scene(activity) {
    if (activity.subject === 'mat' && activity.num === 5) return MathWorkshop.rulerSVG({ start: 2, end: 9, max: 22 });
    if (activity.subject === 'mat' && activity.num === 6) return Engines.clockSVG(3, 30);
    if (activity.subject === 'mat' && activity.num === 7) return MathWorkshop.balanceSVG({ left: 4, right: 7, concealed: false });
    let art = '', description = this.caption(activity);
    const n = activity.num;
    const leaf = '<path d="M0 0q-48-45-52-8Q-40 18 0 0q48-45 52-8Q40 18 0 0" fill="#5e9b70"/>';
    const person = (x, color) => '<g transform="translate(' + x + ' 0)"><circle cx="0" cy="92" r="19" fill="#edbf93"/><path d="M-25 161v-35q25-25 50 0v35" fill="' + color + '"/><path d="M-8 90h1m14 0h1m-13 9q5 4 10 0" fill="none" stroke="#34415e" stroke-width="2"/></g>';
    if (activity.subject === 'mat' && [1, 10].includes(n)) {
      for (let x = 0; x < 3; x++) for (let y = 0; y < 10; y++) art += '<rect x="' + (45 + x * 32) + '" y="' + (34 + y * 13) + '" width="24" height="11" rx="2" fill="#51998c"/>';
      for (let i = 0; i < 4; i++) art += '<rect x="' + (180 + i % 2 * 30) + '" y="' + (70 + Math.floor(i / 2) * 30) + '" width="23" height="23" rx="4" fill="#e8a45d"/>';
      art += '<path d="M255 85h54m-12-12 14 12-14 12" stroke="#34415e" stroke-width="4" fill="none"/><text x="270" y="145" font-size="36" fill="#34415e">34</text>';
    } else if (activity.subject === 'mat' && [2, 3, 11].includes(n)) {
      art += '<path d="M35 156q145-100 290 0" fill="none" stroke="#97b7a4" stroke-width="6" stroke-dasharray="9 7"/>';
      (n === 3 ? [14, 6, 8] : n === 11 ? [8, 13, 10] : [8, 5, 13]).forEach((count, group) => {
        art += '<rect x="' + (25 + group * 115) + '" y="46" width="95" height="90" rx="20" fill="' + ['#d8ede2', '#f9deb6', '#dfe5fa'][group] + '"/>';
        for (let i = 0; i < count; i++) art += '<circle cx="' + (38 + group * 115 + i % 5 * 17) + '" cy="' + (65 + Math.floor(i / 5) * 24) + '" r="6" fill="' + ['#438577', '#b87029', '#6e7ca9'][group] + '"/>';
      });
      art += '<text x="178" y="190" text-anchor="middle" font-size="23" fill="#34415e">' + (n === 3 ? '14 − 6 = 8' : n === 11 ? '8 + 5 = 13, apoi 13 − 3 = 10' : '8 + 5 = 13') + '</text>';
    } else if (activity.subject === 'mat' && [4, 9].includes(n)) {
      art = '<path d="M20 175h320" stroke="#34415e" stroke-width="3"/><path d="M35 80l55-55 55 55" fill="#de8972"/><path d="M45 80h90v95H45z" fill="#f3cc80"/><rect x="72" y="118" width="32" height="57" rx="2" fill="#638d95"/><rect x="165" y="62" width="80" height="113" fill="#9badd7"/><path d="M165 62l40-35 40 35" fill="#6a799e"/><circle cx="290" cy="104" r="34" fill="#7eb292"/><path d="M290 138v37" stroke="#9b704a" stroke-width="12"/>';
      [[180, 82], [211, 82], [180, 122], [211, 122]].forEach(p => { art += '<rect x="' + p[0] + '" y="' + p[1] + '" width="19" height="24" fill="#fff1c5"/>'; });
    } else if (activity.subject === 'mat' && n === 8) {
      art = '<path d="M65 90h230l-20 88H85z" fill="#d99c67"/><path d="M110 94l45-66m90 66-45-66" fill="none" stroke="#34415e" stroke-width="6"/><rect x="120" y="68" width="55" height="72" rx="4" fill="#8a9dcd"/><path d="M130 68v72" stroke="#fff4d5" stroke-width="3"/><path d="M193 65l19 7-24 75-18-7z" fill="#edbe64"/><circle cx="245" cy="123" r="25" fill="#fff1c4"/><text x="245" y="132" text-anchor="middle" font-size="25" fill="#34415e">3</text>';
    } else if (activity.subject === 'mat') {
      for (let i = 0; i < 8; i++) art += '<rect x="' + (55 + i % 4 * 61) + '" y="' + (38 + Math.floor(i / 4) * 61) + '" width="57" height="57" rx="4" fill="' + (i % 4 < 2 ? '#75ae9f' : '#fff3d9') + '" stroke="#53647c" stroke-width="2"/>';
      art += '<text x="180" y="192" text-anchor="middle" font-size="23" fill="#34415e">4 optimi = o jumătate</text>';
    } else if (activity.subject === 'lim') {
      art = '<path d="M37 45q70-22 143 8 73-30 143-8v122q-70-22-143 8-73-30-143-8z" fill="#fff6dd" stroke="#ad8768" stroke-width="3"/><path d="M180 53v122" stroke="#ad8768" stroke-width="3"/><text x="70" y="108" font-size="45" fill="#ae523d">Ă a</text><path d="M65 130h85m-85 18h65m78-70h82m-82 20h82m-82 20h65m-65 20h82" stroke="#8292ae" stroke-width="4"/><path d="M263 32l9-18 9 18 20 3-15 14 4 20-18-10-18 10 4-20-15-14z" fill="#e7b857"/>';
    } else if (activity.subject === 'log') {
      const shapes = ['circle', 'triangle', 'square', 'pentagon'];
      for (let i = 0; i < 4; i++) {
        const x = 25 + i * 78, shape = shapes[(i + n) % 4];
        art += '<g transform="translate(' + x + ' 65) scale(.62)" fill="#718eb5">' + { circle: '<circle cx="50" cy="50" r="35"/>', triangle: '<path d="M50 10l40 75H10z"/>', square: '<rect x="17" y="17" width="66" height="66" fill="#ce8f66"/>', pentagon: '<path d="M50 8 91 38 75 87H25L9 38z" fill="#8aac83"/>' }[shape] + '</g>';
      }
      art += '<circle cx="193" cy="116" r="63" fill="none" stroke="#34415e" stroke-width="8"/><path d="M235 164l38 35" stroke="#34415e" stroke-width="15" stroke-linecap="round"/>';
    } else if (activity.subject === 'inf') {
      art = '<rect x="45" y="40" width="145" height="112" rx="13" fill="#6b91a1"/><rect x="57" y="52" width="121" height="80" rx="5" fill="#eff5de"/><path d="M92 70l20 18-20 18m35 0h25M97 166h43m-22-14v14" stroke="#34415e" stroke-width="5" fill="none"/><g fill="#e8ba69"><rect x="222" y="42" width="90" height="35" rx="10"/><rect x="222" y="93" width="90" height="35" rx="10"/><rect x="222" y="144" width="90" height="35" rx="10"/></g><path d="M267 77v16m0 35v16" stroke="#34415e" stroke-width="4"/><text x="267" y="68" text-anchor="middle" fill="#34415e" font-size="22">1 → 2</text>';
    } else if (activity.subject === 'sci') {
      art = '<circle cx="285" cy="48" r="25" fill="#efc56b"/><path d="M132 142V60" stroke="#5e8561" stroke-width="6"/><g transform="translate(132 89)">' + leaf + '</g><path d="M88 133h88l-14 55h-60z" fill="#c98d6d"/><path d="M222 144q22-38 44 0v44h-44z" fill="#c5e1df" stroke="#638b99" stroke-width="3"/><path d="M222 164h44" stroke="#638b99" stroke-width="3"/><path d="M47 48q-15 22 0 25 15-3 0-25" fill="#78a4cb"/><path d="M25 194h310" stroke="#719479" stroke-width="3"/>';
    } else {
      art = '<rect x="93" y="143" width="180" height="22" rx="11" fill="#d2a473"/><path d="M113 163v27m140-27v27" stroke="#966b46" stroke-width="7"/>' + person(66, '#809bcc') + person(294, '#88ad88') + '<path d="M89 125l40 18m143-18-40 18" stroke="#edbf93" stroke-width="12" stroke-linecap="round"/><path d="M140 36h84a14 14 0 0 1 14 14v30h-35l-18 16V80h-45a14 14 0 0 1-14-14V50a14 14 0 0 1 14-14" fill="#efd092"/><path d="M152 58h48" stroke="#876a43" stroke-width="4"/>';
    }
    return '<svg class="discovery-art" viewBox="0 0 360 220" role="img" aria-label="' + Engines.escape(description) + '"><rect x="2" y="2" width="356" height="216" rx="28" fill="#faf0db"/>' + art + '</svg>';
  },
  init(root) {
    (root || document).querySelectorAll('[data-discovery]').forEach(spread => {
      const activity = ACTIVITIES.find(a => a.id === spread.dataset.discovery), lab = spread.querySelector('[data-discovery-lab]');
      if (!activity || !lab || lab.dataset.ready) return;
      lab.dataset.ready = 'true';
      if (activity.subject === 'mat') this.mathLab(lab, activity);
      else this.thinkingLab(lab, activity);
    });
  },
  mathLab(lab, activity) {
    const n = activity.num, picture = document.createElement('div'), controls = document.createElement('div'), status = document.createElement('p');
    picture.className = 'lab-preview'; controls.className = 'lab-controls'; status.className = 'lab-observation'; status.setAttribute('role', 'status');
    let update;
    const refresh = () => { update(); Engines.refreshRangeControls(controls); };
    const slider = (labelText, min, max, value, step) => {
      const field = document.createElement('div'), label = document.createElement('label'), input = document.createElement('input');
      field.className = 'lab-control-field'; label.textContent = labelText; input.type = 'range'; input.min = min; input.max = max; input.value = value; input.step = step || 1;
      input.setAttribute('aria-label', labelText); input.id = 'explore-' + n + '-' + controls.children.length; label.htmlFor = input.id;
      input.addEventListener('input', refresh);
      field.appendChild(label); field.appendChild(Engines.rangeControl(input)); controls.appendChild(field); return input;
    };
    let a, b;
    if ([1, 10].includes(n)) {
      a = slider('Numărul construit', 0, 100, 34);
      b = slider('Zeci desfăcute în unități', 0, 1, 0);
      update = () => {
        const number = Number(a.value), split = Number(b.value) && number >= 10 ? 1 : 0, tens = Math.floor(number / 10) - split, units = number % 10 + split * 10;
        b.disabled = number < 10;
        if (b.disabled) b.value = 0;
        picture.innerHTML = '<div class="base-ten-art" aria-hidden="true">' + Array(tens).fill('<span class="ten-rod"></span>').join('') + '<div class="unit-bunch">' + Array(units).fill('<i></i>').join('') + '</div></div>';
        status.textContent = number + ' = ' + tens + ' × 10 + ' + units + '. ' + (split ? 'Am desfăcut un grup de zece în zece unități. Totalul a rămas același.' : 'Schimbă gruparea fără să schimbi cantitatea.');
      };
    } else if ([4, 9].includes(n)) {
      const label = document.createElement('label'); label.textContent = 'Forma de explorat';
      const select = document.createElement('select'); select.setAttribute('aria-label', 'Forma de explorat');
      [['square', 'Pătrat'], ['rectangle', 'Dreptunghi'], ['triangle', 'Triunghi'], ['pentagon', 'Pentagon'], ['hexagon', 'Hexagon']].forEach(item => select.appendChild(new Option(item[1], item[0])));
      label.appendChild(select); controls.appendChild(label); a = slider('Rotirea, în grade', 0, 315, 0, 45);
      update = () => {
        picture.innerHTML = Engines.shapeSVG(select.value, Number(a.value), 3);
        status.textContent = 'Rotire: ' + a.value + '°. Laturile și unghiurile se păstrează. Încearcă să explici fără să folosești culoarea sau poziția.';
      };
      select.addEventListener('change', refresh);
    } else if (n === 5) {
      a = slider('Reperul de început, în cm', 0, 6, 2); b = slider('Lungimea benzii, în cm', 2, 14, 7);
      update = () => {
        const start = Number(a.value), length = Number(b.value);
        picture.innerHTML = MathWorkshop.rulerHTML({ start, end: start + length, max: 22 });
        status.textContent = 'Lungimea: ' + (start + length) + ' − ' + start + ' = ' + length + ' cm. Mută începutul și păstrează lungimea: ce observi?';
      };
    } else if (n === 6) {
      a = slider('Ora', 1, 12, 3); b = slider('Minutele', 0, 55, 30, 5);
      update = () => { picture.innerHTML = Engines.clockSVG(Number(a.value), Number(b.value)); status.textContent = Engines.time(Number(a.value), Number(b.value)) + ' · Observă și deplasarea treptată a acului scurt.'; };
    } else if (n === 7) {
      a = slider('Cuburi identice în stânga', 0, 15, 4); b = slider('Cuburi identice în dreapta', 0, 15, 7);
      update = () => {
        const left = Number(a.value), right = Number(b.value); picture.innerHTML = MathWorkshop.balanceHTML({ left, right, concealed: false });
        status.textContent = left === right ? 'Echilibru: cantitățile sunt egale.' : 'Coboară ' + (left > right ? 'stânga' : 'dreapta') + '. Diferența este ' + Math.abs(left - right) + '. Cum poți obține egalitate?';
      };
    } else if (n === 8) {
      a = slider('Caiete de 3 lei', 1, 6, 2); b = slider('Bugetul, în lei', 5, 30, 10);
      update = () => {
        const total = Number(a.value) * 3, money = Number(b.value);
        picture.innerHTML = '<div class="discovery-products">' + Array(Number(a.value)).fill(MathWorkshop.productSVG('notebook')).join('') + '</div>';
        status.textContent = a.value + ' × 3 = ' + total + ' lei. ' + (money >= total ? 'După plată rămân ' + Engines.quantity(money - total, 'leu', 'lei') + '.' : 'Mai trebuie ' + Engines.quantity(total - money, 'leu', 'lei') + '. Nu avem încă suficienți bani.');
      };
    } else if (n === 12) {
      a = slider('Optimi colorate', 0, 8, 4);
      update = () => {
        picture.innerHTML = '<div class="fraction-preview" role="img" aria-label="' + a.value + ' din 8 părți egale colorate">' + Array.from({ length: 8 }, (_, i) => '<span class="' + (i < Number(a.value) ? 'painted' : '') + '"></span>').join('') + '</div>';
        status.textContent = a.value + '/8 din întreg. ' + ({ 0: 'Nicio parte colorată.', 2: 'Aceasta este un sfert.', 4: 'Aceasta este o jumătate.', 6: 'Acestea sunt trei sferturi.', 8: 'Ai colorat întregul.' }[a.value] || 'Compară cu două, patru sau șase optimi.');
      };
    } else {
      a = slider(n === 11 ? 'Timbre la început' : 'Prima cantitate', n === 11 ? 3 : 1, 20, 8);
      b = slider(n === 3 ? 'Câte luăm' : 'Câte adăugăm', 0, n === 3 ? 8 : 10, 5);
      update = () => {
        const first = Number(a.value), subtract = n === 3;
        if (subtract) b.max = first;
        const value = Number(b.value), result = subtract ? first - value : first + value;
        picture.innerHTML = '<div class="arithmetic-objects" aria-hidden="true">' + Array.from({ length: first + (subtract ? 0 : value) }, (_, i) => '<span class="' + ((subtract && i >= result) || (n === 11 && i >= result - 3) ? 'removed' : i >= first ? 'added' : '') + '">●</span>').join('') + '</div>';
        status.textContent = first + (subtract ? ' − ' : ' + ') + value + ' = ' + result + (n === 11 ? '. Oferim apoi 3: ' + result + ' − 3 = ' + (result - 3) + '.' : '. Explică ce s-a schimbat și verifică invers.');
      };
    }
    lab.appendChild(picture); lab.appendChild(controls); lab.appendChild(status); refresh();
  },
  thinkingLab(lab, activity) {
    const steps = document.createElement('div'), preview = document.createElement('div');
    steps.className = 'exploration-path'; preview.className = 'lab-observation'; preview.setAttribute('role', 'status');
    const show = index => {
      steps.querySelectorAll('button').forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
      preview.innerHTML = '<p><strong>Pasul ' + (index + 1) + ':</strong> ' + Engines.escape(activity.guided[index]) + '</p><p>' +
        Engines.escape(index === activity.guided.length - 1 ? 'La final, gândește-te: ' + activity.questions[0] :
          'Încearcă acest pas înainte să îl alegi pe următorul. Poți explica prin vorbe, desen sau obiecte.') + '</p>';
    };
    activity.guided.forEach((step, i) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'exploration-stop';
      button.textContent = (i + 1) + ' · ' + step; button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => show(i));
      steps.appendChild(button);
    });
    show(0);
    lab.appendChild(steps); lab.appendChild(preview);
  }
};
