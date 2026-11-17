/* Un traseu de reflecție, nu o competiție între copii. */
const DECE_CAMPS = [
  { title: 'Creierul învață', icon: '🧠', body: 'Creierul te ajută să înveți. Când încerci din nou, unele lucruri devin mai ușoare. Ai nevoie și de somn, joacă și ajutor.', question: 'Ce te ajută când întâlnești o idee nouă?', options: ['Un exemplu și timp de încercare', 'Să mă compar cu alt copil'], answer: 0, explain: 'Privește un exemplu. Apoi încearcă tu, fără grabă.' },
  { title: 'Atenția are nevoie de sprijin', icon: '👀', body: 'Poți asculta și când privești în altă parte. Dacă este prea mult zgomot, cere liniște. Poți cere și o pauză.', question: 'Te pierzi într-o cerință lungă. Ce poți face?', options: ['Cer să o împărțim în pași', 'Încerc totul deodată, fără ajutor'], answer: 0, explain: 'Ia câte un pas pe rând. A cere ajutor nu este o greșeală.' },
  { title: 'Curiozitatea începe cu o întrebare', icon: '🔍', body: 'De ce se topește gheața? De ce crește planta spre geam? Privește, pune întrebări și caută răspunsuri cu un adult.', question: 'Cum verifici o idee despre natură?', options: ['Privesc atent și întreb un adult', 'Aleg ce sună bine, fără să verific'], answer: 0, explain: 'Caută ce poți observa. Un adult te ajută să verifici în siguranță.' },
  { title: 'Încerc din nou, cu pauze', icon: '🌿', body: 'Nu trebuie să lucrezi până obosești tare. Poți lua o pauză, cere ajutor sau încerca în alt fel.', question: 'Ai încercat de multe ori și ești obosit.', options: ['Fac o pauză și încerc altfel', 'Continui chiar dacă mă simt rău'], answer: 0, explain: 'Odihnește-te. După pauză poți încerca din nou.' },
  { title: 'Învăț pas cu pas', icon: '🛠️', body: 'Alege ceva potrivit pentru tine. Încearcă, verifică și corectează. Uită-te ce poți face acum și ce era greu la început.', question: 'La ce îți folosește să te uiți?', options: ['La ce fac mai bine decât ieri', 'La cine termină înaintea mea'], answer: 0, explain: 'Fiecare învață în ritmul său. Compară încercările tale.' },
  { title: 'Citesc și ascult', icon: '📖', body: 'Poți citi singur sau cu un adult. Poți și să asculți textul. Nu te grăbi: important este să înțelegi ce se întâmplă.', question: 'Nu ai înțeles o parte din text.', options: ['Recitesc și caut un indiciu', 'Trec mai departe doar ca să termin'], answer: 0, explain: 'Înțelegerea contează mai mult decât viteza.' },
  { title: 'De la obiecte la numere', icon: '🔢', body: 'Poți arăta un număr cu obiecte, apoi printr-un desen și prin cifre. Mutând obiectele, vezi ce se schimbă și poți verifica singur.', question: '8 + 5 este greu de calculat în minte.', options: ['Formez un grup de zece obiecte, apoi adaug restul', 'Ghicesc fără să verific'], answer: 0, explain: 'Când lucrezi cu obiecte, poți vedea și verifica fiecare pas al calculului.' },
  { title: 'Greșelile oferă informații', icon: '💡', body: 'O greșeală poate arăta ce pas trebuie verificat. Nu orice greșeală se repară doar repetând: uneori avem nevoie de o explicație nouă sau de un material diferit.', question: 'Obții mereu același rezultat nepotrivit.', options: ['Verific primul pas și cer o explicație diferită', 'Repet exact la fel fără să mă uit la pași'], answer: 0, explain: 'Schimbarea metodei poate lămuri cauza greșelii.' },
  { title: 'Pot spune sau desena', icon: '👐', body: 'Poți arăta ce ai înțeles prin vorbe, desen sau obiecte. Alege ce te ajută la întrebarea de acum. Data viitoare poți alege altfel.', question: 'Vrei să explici o problemă, dar îți găsești greu cuvintele.', options: ['Pot folosi un desen sau obiecte', 'Spun repede, fără să mai verific'], answer: 0, explain: 'Arată desenul sau obiectele. Ele te pot ajuta să explici.' },
  { title: 'Pași mici și reveniri', icon: '⏰', body: 'Poți exersa puțin azi și poți reveni în altă zi. Așa îți amintești ce ai învățat. Păstrează timp și pentru somn și joacă.', question: 'Ai ratat o zi de exersare.', options: ['Reiau când pot, fără să mă cert', 'Fac totul repede, fără pauze'], answer: 0, explain: 'O pauză nu șterge ce ai învățat.' },
  { title: 'Aleg următorul pas', icon: '🌟', body: 'Alege o lecție și un nivel. Poți reveni la un nivel mai ușor. Poți cere ajutor oricând.', question: 'Cum alegi ce exersezi mai departe?', options: ['După ce știu și ce vreau să aflu', 'Doar după ce aleg ceilalți'], answer: 0, explain: 'Poți alege singur și poți cere ajutor când ai nevoie.' }
];

Render.dece = function () {
  const completed = Progress.profile().journey;
  return '<section class="hero"><div class="mascot-big" aria-hidden="true">🦉</div><h1>Cum învățăm?</h1><p>11 opriri despre explorare, strategii și grijă față de tine. Le poți parcurge în orice ordine.</p><p id="journey-count">' + completed.length + ' din 11 opriri explorate</p></section>' +
    '<div class="journey-grid">' + DECE_CAMPS.map((camp, i) => '<section class="callout journey-stop" aria-labelledby="journey-title-' + i + '"><h2 id="journey-title-' + i + '">' + camp.icon + ' ' + (i + 1) + '. ' + camp.title + '</h2><button class="btn btn-listen" type="button" data-listen-stop="' + i + '">🔊 Ascultă</button><p>' + this.escape(camp.body) + '</p>' +
      '<fieldset><legend>' + this.escape(camp.question) + '</legend>' + camp.options.map((option, j) => '<button class="btn journey-choice" data-stop="' + i + '" data-answer="' + j + '">' + this.escape(option) + '</button>').join('') + '</fieldset>' +
      '<p class="journey-feedback" role="status">' + (completed.includes(i) ? 'Deja explorat. Poți reveni oricând.' : '') + '</p></section>').join('') + '</div>';
};
const Dece = {
  init() {
    document.querySelectorAll('[data-listen-stop]').forEach(button => button.addEventListener('click', async () => {
      const camp = DECE_CAMPS[Number(button.dataset.listenStop)];
      const feedback = button.closest('.journey-stop').querySelector('.journey-feedback');
      const text = [camp.title, camp.body, camp.question].concat(camp.options.map((option, index) => (index + 1) + ': ' + option), feedback.textContent).join('. ');
      const problem = await Speech.speak(text, { error: message => { feedback.textContent = message; } });
      if (problem) feedback.textContent = problem;
    }));
    document.querySelectorAll('.journey-choice').forEach(button => button.addEventListener('click', () => {
      const index = Number(button.dataset.stop), camp = DECE_CAMPS[index], correct = Number(button.dataset.answer) === camp.answer;
      const feedback = button.closest('.journey-stop').querySelector('.journey-feedback');
      feedback.textContent = correct ? camp.explain : 'Ai ales „' + camp.options[Number(button.dataset.answer)] + '”. Încearcă alt răspuns. ' + camp.explain;
      if (correct) {
        Progress.journeyComplete(index);
        document.getElementById('journey-count').textContent = Progress.profile().journey.length + ' din 11 opriri explorate';
        Sound.good();
      }
    }));
  }
};
