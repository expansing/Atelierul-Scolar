/* Un traseu de reflecție, nu o competiție între copii. */
const DECE_CAMPS = [
  { title: 'Creierul învață', icon: '🧠', body: 'Când exersezi, legăturile dintre celulele nervoase se pot modifica. Imaginea unui mușchi este doar o comparație: creierul nu este un mușchi. Somnul, sprijinul și experiențele contează și ele.', question: 'Ce te ajută când întâlnești o idee nouă?', options: ['Un exemplu și timp de încercare', 'Să mă compar cu alt copil'], answer: 0, explain: 'Un exemplu concret și timpul de explorare sprijină înțelegerea.' },
  { title: 'Atenția are nevoie de sprijin', icon: '👀', body: 'Nu toți oamenii arată atenția la fel. Unii ascultă mai bine când se mișcă puțin sau privesc în altă parte. Putem reduce zgomotul, împărți sarcina și cere o pauză.', question: 'Te pierzi într-o cerință lungă. Ce poți face?', options: ['Cer să o împărțim în pași', 'Cred că este ceva în neregulă cu mine'], answer: 0, explain: 'Adaptarea sarcinii este o strategie, nu un eșec.' },
  { title: 'Curiozitatea începe cu o întrebare', icon: '🔍', body: 'O întrebare bună ne ajută să observăm. De ce frunzele sunt verzi? Clorofila participă la captarea luminii pentru fotosinteză. De ce merge mașina? Motorul pune roțile în mișcare, iar roțile exercită forțe asupra drumului.', question: 'Cum verifici o idee despre natură?', options: ['Observ, caut surse potrivite și cer sprijin', 'Aleg prima explicație care sună frumos'], answer: 0, explain: 'O explicație trebuie verificată, nu doar să pară convingătoare.' },
  { title: 'Perseverență cu pauze', icon: '🌿', body: 'Perseverența nu înseamnă să continui până la epuizare. Poți încerca altă strategie, poți cere ajutor și poți reveni după o pauză.', question: 'Ai încercat de multe ori și ești obosit.', options: ['Fac o pauză și revin cu o altă strategie', 'Continui fără oprire chiar dacă mă simt rău'], answer: 0, explain: 'Odihna și schimbarea strategiei fac parte din învățare.' },
  { title: 'Practica utilă', icon: '🛠️', body: 'Practica ajută când include feedback și sarcini potrivite. Nu este o luptă cu inteligența și nu garantează același rezultat pentru toți. Compară ce poți face acum cu propriul tău început.', question: 'Ce comparație este utilă?', options: ['Cum rezolv acum față de încercarea mea anterioară', 'Cine este cel mai deștept copil'], answer: 0, explain: 'Progresul personal ne ajută să alegem următorul pas fără etichete.' },
  { title: 'Cititul are multe forme', icon: '📖', body: 'Poți citi singur, împreună cu un adult sau cu sprijin audio. Alege un text potrivit și discută despre el. Câteva minute cu înțeles sunt mai utile decât graba de a termina multe pagini.', question: 'Nu ai înțeles un paragraf.', options: ['Recitesc și caut un indiciu', 'Trec mai departe doar ca să termin'], answer: 0, explain: 'Înțelegerea contează mai mult decât viteza.' },
  { title: 'De la obiecte la numere', icon: '🧮', body: 'Poți arăta un număr cu obiecte, apoi printr-un desen și prin cifre. Mutând obiectele, vezi ce se schimbă și poți verifica singur.', question: '8 + 5 este greu de calculat în minte.', options: ['Formez un grup de zece obiecte, apoi adaug restul', 'Ghicesc fără să verific'], answer: 0, explain: 'Când lucrezi cu obiecte, poți vedea și verifica fiecare pas al calculului.' },
  { title: 'Greșelile oferă informații', icon: '💡', body: 'O greșeală poate arăta ce pas trebuie verificat. Nu orice greșeală se repară doar repetând: uneori avem nevoie de o explicație nouă sau de un material diferit.', question: 'Obții mereu același rezultat nepotrivit.', options: ['Verific primul pas și cer o explicație diferită', 'Repet exact la fel fără să mă uit la pași'], answer: 0, explain: 'Schimbarea metodei poate lămuri cauza greșelii.' },
  { title: 'Învățăm în moduri diferite', icon: '👐', body: 'Poți arăta ce înțelegi prin cuvinte, desen, mișcare sau obiecte. Nu trebuie să te încadrezi într-o singură etichetă de „stil de învățare”. Alegem sprijinul potrivit sarcinii.', question: 'Vrei să explici o problemă, dar îți găsești greu cuvintele.', options: ['Pot folosi un desen sau obiecte', 'Înseamnă sigur că nu am înțeles'], answer: 0, explain: 'O reprezentare poate arăta înțelegerea și poate sprijini exprimarea.' },
  { title: 'Pași mici și reveniri', icon: '⏰', body: 'Exersarea distribuită în timp și revenirea la idei pot ajuta memoria. Planul trebuie să lase loc somnului, jocului și nevoilor tale, nu să creeze presiune pentru o serie zilnică perfectă.', question: 'Ai ratat o zi de exersare.', options: ['Reiau când pot, fără să mă învinovățesc', 'Cred că tot progresul a dispărut'], answer: 0, explain: 'O pauză nu șterge ce ai învățat.' },
  { title: 'Aleg următorul pas', icon: '🌟', body: 'Acum poți alege o lecție, un material și un nivel. Spune ce ai învățat și ce sprijin îți este util. Ai voie să revii la un nivel mai simplu.', question: 'Cum alegi următoarea provocare?', options: ['După ce înțeleg și ce vreau să exersez', 'Doar după ce aleg ceilalți'], answer: 0, explain: 'Autonomia înseamnă alegeri informate și posibilitatea de a cere sprijin.' }
];

Render.dece = function () {
  const completed = Progress.profile().journey;
  return '<section class="hero"><div class="mascot-big" aria-hidden="true">🦉</div><h1>Cum învățăm?</h1><p>11 opriri despre explorare, strategii și grijă față de tine. Le poți parcurge în orice ordine.</p><p id="journey-count">' + completed.length + ' din 11 opriri explorate</p></section>' +
    '<div class="journey-grid">' + DECE_CAMPS.map((camp, i) => '<section class="callout journey-stop" aria-labelledby="journey-title-' + i + '"><h2 id="journey-title-' + i + '">' + camp.icon + ' ' + (i + 1) + '. ' + camp.title + '</h2><p>' + this.escape(camp.body) + '</p>' +
      '<fieldset><legend>' + this.escape(camp.question) + '</legend>' + camp.options.map((option, j) => '<button class="btn journey-choice" data-stop="' + i + '" data-answer="' + j + '">' + this.escape(option) + '</button>').join('') + '</fieldset>' +
      '<p class="journey-feedback" role="status">' + (completed.includes(i) ? 'Deja explorat. Poți reveni oricând.' : '') + '</p></section>').join('') + '</div>';
};
const Dece = {
  init() {
    document.querySelectorAll('.journey-choice').forEach(button => button.addEventListener('click', () => {
      const index = Number(button.dataset.stop), camp = DECE_CAMPS[index], correct = Number(button.dataset.answer) === camp.answer;
      const feedback = button.closest('.journey-stop').querySelector('.journey-feedback');
      feedback.textContent = correct ? camp.explain : 'Încearcă altă strategie. Recitește explicația; poți reveni oricând.';
      if (correct) {
        Progress.journeyComplete(index);
        document.getElementById('journey-count').textContent = Progress.profile().journey.length + ' din 11 opriri explorate';
        Sound.good();
      }
    }));
  }
};
