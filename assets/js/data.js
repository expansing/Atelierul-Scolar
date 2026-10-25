/* Conținut original în limba română. Nivelurile sunt deschise, fără cronometru. */
const SUBJECTS = [
  { id: 'mat', title: 'Matematică', icon: '🔢', color: 'var(--s-mat)', desc: 'Construim numere, descoperim relații și rezolvăm probleme din viața de zi cu zi.', tagline: 'Gândesc și verific', age: '6–8 ani' },
  { id: 'lim', title: 'Limba română', icon: '📖', color: 'var(--s-lim)', desc: 'Ascultăm sunete, construim cuvinte, citim cu înțeles și scriem povești.', tagline: 'Citesc și povestesc', age: '6–8 ani' },
  { id: 'log', title: 'Logică și gândire', icon: '🧩', color: 'var(--s-log)', desc: 'Căutăm reguli, verificăm dovezi și explicăm cum am ajuns la o concluzie.', tagline: 'Gândesc și verific', age: '6–8 ani' },
  { id: 'inf', title: 'Informatică', icon: '💻', color: 'var(--s-inf)', desc: 'Construim instrucțiuni, reparăm programe și învățăm să folosim tehnologia în siguranță.', tagline: 'Planific și testez', age: '6–8 ani' },
  { id: 'sci', title: 'Științe și natură', icon: '🌱', color: 'var(--s-sci)', desc: 'Observăm, spunem ce credem că se va întâmpla, comparăm rezultate și descoperim natura.', tagline: 'Întreb și cercetez', age: '6–8 ani' },
  { id: 'civ', title: 'Dezvoltare personală', icon: '🤝', color: 'var(--s-civ)', desc: 'Ne cunoaștem, avem grijă de noi, construim relații respectuoase și învățăm să învățăm.', tagline: 'Mă cunosc și cresc', age: '6–8 ani' }
];

const LEVELS = [
  { id: 'discover', title: 'Descopăr', description: 'Pornesc de la exemple și obiecte concrete.' },
  { id: 'practice', title: 'Exersez', description: 'Aplic singur și verific prin altă metodă.' },
  { id: 'challenge', title: 'Provocare', description: 'Combin idei și rezolv în mai mulți pași.' }
];

const Content = {
  question(prompt, options, answer, explain, hint) {
    return { prompt, options, answer, explain, hint: hint || 'Compară fiecare variantă cu informațiile din cerință.' };
  },
  // sunet de ascultat: cuvântul „say” se rostește, iar imaginea îl arată fără să-l scrie
  sound(prompt, say, picture, options, answer, explain, hint) {
    return Object.assign(Content.question(prompt, options, answer, explain, hint || 'Spune cuvântul rar și prelungește sunetul căutat.'), { say, picture });
  },
  // joc practic (HandsOn): păstrează întrebările nivelului pentru verificarea de la final
  handsOn(type, mode, base, rounds) {
    return { type, mode, levels: base.levels.map((level, i) => ({ rounds: rounds[i], questions: level.questions })) };
  },
  // imagine de descris: „scene” se afișează deasupra variantelor
  picture(prompt, scene, options, answer, explain, hint) {
    return Object.assign(Content.question(prompt, options, answer, explain, hint || 'Arată cu degetul în imagine fiecare lucru din enunț.'), { scene });
  },
  // rounds[nivel]: câte sarcini se aleg la fiecare joc din setul nivelului (lipsă = toate)
  quiz(levels, rounds) { return { type: 'quiz', levels: levels.map((questions, i) => rounds ? { questions, rounds: rounds[i] } : { questions }) }; },
  sequence(levels, rounds) { return { type: 'arrange', levels: levels.map((questions, i) => rounds ? { questions, rounds: rounds[i] } : { questions }) }; },
  order(prompt, tokens, explain) { return { prompt, tokens, explain, hint: 'Caută primul pas. Ce trebuie să se întâmple înaintea celorlalți pași?' }; },
  // show[nivel]: câte perechi apar la fiecare joc din setul nivelului (lipsă = toate)
  matching(levels, show) { return { type: 'match', levels: levels.map((pairs, i) => show ? { pairs, show: show[i] } : { pairs }) }; },
  sorting(levels) { return { type: 'classify', levels }; },
  task(type, mode) { return { type, mode, levels: [{ rounds: 4 }, { rounds: 5 }, { rounds: 6 }] }; },
  lesson(subject, num, title, icon, goal, concept, example, steps, practical, mistake, demo, reflection) {
    return {
      id: subject + '-' + num, subject, num, title, icon, duration: '15–25 min',
      objectives: [goal, 'Să explice o alegere folosind exemplul lecției', 'Să verifice și să corecteze o rezolvare'],
      explanation: [concept, example, mistake],
      guided: steps,
      practical: { materials: practical[0], steps: practical.slice(1), check: 'Privește ce ai făcut. Ai urmat pașii? Arată sau povestește cum ai verificat. Dacă ai nevoie, cere ajutor.' },
      questions: [reflection, 'Cum ai verificat?', 'Ce ai schimba dacă ai încerca din nou?'],
      parent: {
        watch: [goal.replace(/^Să /, 'Poate să '), 'Poate arăta sau explica pașii, nu doar ghici răspunsul'],
        help: ['Porniți de la acest exemplu: ' + example, 'Ajutați copilul să aleagă materiale sigure și potrivite. Lăsați-i timp să observe nepotrivirile și întrebați-l ce ar încerca.', 'Oferiți un indiciu, apoi timp de gândire. O pauză sau ajutorul sunt alegeri potrivite.'],
        support: ['Dacă sarcina este dificilă, reveniți la obiecte concrete și la nivelul „Descopăr”. O greșeală nu este un diagnostic.']
      },
      pass: [goal.replace(/^Să /, ''), 'Verifică rezultatul și explică un pas important'],
      demo
    };
  }
};

const Q = Content.question;
const S = Content.sound;
const P = Content.picture;
const O = Content.order;
const L = Content.lesson;
const ACTIVITIES = [
  L('mat', 1, 'Numărăm până la 100', '🔢',
    'Să construiască și să compare numere până la 100',
    'Numărăm fiecare obiect o singură dată. Ultimul număr rostit arată câte obiecte sunt. Un obiect numărat este o unitate. Când le grupăm câte zece, numărăm zeci: 2 zeci înseamnă 2 grupuri de câte 10 unități. Zece astfel de grupuri formează o sută.',
    'Pentru 34 facem 3 grupuri de câte 10 și păstrăm 4 obiecte separate: 3 zeci și 4 unități, adică 30 + 4 = 34. După 39 vine 40: al zecelea obiect separat completează încă un grup de zece.',
    ['Numără 14 obiecte, atingându-le pe rând.', 'Grupează 10 și lasă 4 separate.', 'Construiește 24, apoi explică ce s-a schimbat.'],
    ['Bețișoare, elastice și două cartonașe: ZECI și UNITĂȚI.', 'Leagă bețișoarele câte 10.', 'Alege un număr, construiește-l și roagă pe cineva să-l citească.'],
    'În 34, cifra 3 arată câte grupuri de zece avem, iar cifra 4 arată câte unități rămân în afara grupurilor.',
    Content.task('placevalue', 'build'), 'De ce 4 zeci și 2 unități nu înseamnă 24?'),
  L('mat', 2, 'Adunarea', '➕',
    'Să adune prin grupare, completarea unei zeci și calcul în pași',
    'La adunare aflăm câte obiecte sunt în total. Putem porni de la numărul mai mare și număra înainte sau putem completa mai întâi un grup de zece.',
    'La 8 + 5 descompunem 5 în 2 și 3: 8 + 2 = 10, apoi 10 + 3 = 13. Verificăm cu 13 obiecte.',
    ['Construiește 8 cu obiecte.', 'Adaugă 2 ca să faci 10.', 'Din cele 5 de adăugat au rămas 3: rezultatul este 13.'],
    ['Două boluri și 20 de nasturi mari.', 'Pune cantități în boluri, apoi reunește-le.', 'Schimbă ordinea grupelor și verifică dacă totalul se schimbă.'],
    'Când adaugi obiecte la cele pe care le ai, totalul crește. Numără fiecare obiect o singură dată ca să verifici.',
    Content.task('numberline', 'add'), 'Cum te ajută să ajungi întâi la 10 când calculezi 9 + 6?'),
  L('mat', 3, 'Scăderea', '➖',
    'Să scadă și să verifice prin adunare',
    'Scăderea ne ajută să aflăm câte obiecte rămân când luăm o parte din ele sau cu cât este o cantitate mai mare decât alta. Când scădem pe linia numerelor, mergem spre numere mai mici.',
    'Din 14 cuburi luăm 6. Luăm întâi 4 și ajungem la 10, apoi încă 2 și ajungem la 8. Verificare: 8 + 6 = 14.',
    ['Construiește 14 cu obiecte.', 'Ia 4 obiecte, apoi încă 2. Câte au rămas?', 'Pune la loc cele 6 obiecte. Ai din nou 14?'],
    ['20 de cuburi și o foaie.', 'Numără cuburile, apoi roagă pe cineva să acopere o parte dintre ele.', 'Numără cuburile rămase la vedere și află câte sunt ascunse. Descoperă-le și verifică.'],
    'În 9 − 4 pornim de la 9 și luăm 4. Urmărim ce număr arată cantitatea de la început și ce număr arată cât luăm.',
    Content.task('numberline', 'subtract'), 'Cum verifici că 15 − 7 = 8?'),
  L('mat', 4, 'Forme geometrice', '🔺',
    'Să recunoască și să construiască forme, să completeze simetrii și mozaicuri',
    'Triunghiul are 3 laturi și 3 vârfuri. Pătratul are 4 laturi egale și 4 colțuri ca ale unei foi dreptunghiulare: sunt unghiuri drepte. Dreptunghiul are 4 unghiuri drepte, iar laturile aflate față în față sunt egale.',
    'Un pătrat rotit rămâne pătrat. Pe o foaie cu pătrățele, un dreptunghi lung de 3 pătrățele și lat de 2 acoperă 6 pătrățele. Conturul lui măsoară 10 laturi de pătrățel: 3 + 2 + 3 + 2. Într-un desen în oglindă, punctele pereche sunt de o parte și de alta a liniei de oglindire, la aceeași distanță de ea.',
    ['Urmărește conturul și numără laturile și vârfurile.', 'Construiește o formă pe grilă, alegând vârfurile în ordinea conturului.', 'Rotește forma, acoperă o suprafață cu piese sau completează cealaltă jumătate a unui desen în oglindă.'],
    ['Bețișoare, sfoară și forme decupate.', 'Construiește un triunghi și un pătrat.', 'Separă formele folosind o proprietate, apoi schimbă regula.'],
    'Un pătrat rămâne pătrat dacă îl rotim sau îl desenăm mai mare. Este și un dreptunghi, fiindcă are patru unghiuri drepte; în plus, toate laturile lui sunt egale.',
    Content.task('shapes', 'properties'), 'Cum recunoști un triunghi întors?'),
  L('mat', 5, 'Măsurarea', '📏',
    'Să compare și să măsoare folosind aceeași unitate',
    'Măsurarea arată de câte ori încape o unitate într-o lungime. Așezăm unitățile fără spații și fără suprapuneri. La riglă pornim de la 0.',
    'Un creion începe la 0 și se termină la 12 pe riglă: are 12 cm. Dacă începe la 2 și se termină la 9, lungimea este 9 − 2 = 7 cm.',
    ['Găsește semnul 0 de pe riglă.', 'Aliniază începutul obiectului cu semnul 0, nu neapărat cu marginea riglei.', 'Citește numărul din dreptul celuilalt capăt și spune și unitatea: centimetri.'],
    ['O riglă, agrafe identice și două creioane.', 'Estimează care creion este mai lung.', 'Măsoară cu agrafe și cu rigla. Compară rezultatele.'],
    'Mai multe unități nu înseamnă mereu un obiect mai lung dacă unitățile diferă. Nu comparăm direct 5 pași cu 6 centimetri.',
    Content.task('measurement', 'ruler'), 'De ce trebuie să spunem și unitatea de măsură?'),
  L('mat', 6, 'Citim ceasul', '🕒',
    'Să citească ora și să calculeze intervale scurte',
    'Pe ceas, acul scurt arată orele, iar acul lung arată minutele. Când acul lung ajunge de la un număr la următorul, trec 5 minute. O oră are 60 de minute.',
    'La 3:30, acul lung este la 6, iar cel scurt este la jumătatea drumului dintre 3 și 4. La 3:45 spunem și „4 fără un sfert”.',
    ['Privește acul scurt: la ce oră a ajuns sau de ce oră a trecut?', 'Pentru acul lung, pornește de la 12 cu 0 minute și numără câte 5 până la el.', 'Spune ora și minutele, apoi verifică poziția ambelor ace.'],
    ['Un cadran din carton și două ace de hârtie.', 'Arată ora unei activități din ziua ta.', 'Mută acul lung cu un sfert de oră și spune noua oră.'],
    'La jumătatea orei, acul scurt nu stă exact pe numărul orei. El se deplasează treptat spre ora următoare.',
    Content.task('clock', 'time'), 'Unde se află acul scurt la 7:30?'),
  L('mat', 7, 'Balanța', '⚖️',
    'Să compare cantități și să afle un termen necunoscut',
    'Balanța se echilibrează când masele de pe cele două talere sunt egale. Dacă obiectele sunt identice, putem compara și numărul lor.',
    'Pe un taler sunt 4 cuburi, pe celălalt 7 cuburi identice. Adăugăm 3 la primul: 4 + 3 = 7. Acum balanța este în echilibru.',
    ['Numără cuburile identice de pe fiecare taler.', 'Află câte cuburi lipsesc din grupa mai mică.', 'Adaugă atâtea cuburi pe talerul mai ușor și verifică dacă balanța se echilibrează.'],
    ['Cuburi identice și două farfurii.', 'Construiește două grupe diferite.', 'Mută sau adaugă cuburi până când grupele au aceeași cantitate.'],
    'Mai multe obiecte nu înseamnă neapărat masă mai mare dacă obiectele nu sunt identice. O piatră poate cântări mai mult decât multe pene.',
    Content.task('balance', 'equal'), 'De ce folosim obiecte identice când comparăm numărul lor pe balanță?'),
  L('mat', 8, 'Magazinul', '🛒',
    'Să calculeze costul, restul și încadrarea într-un buget',
    'Prețul arată cât costă un produs. Pentru mai multe produse adunăm prețurile. Bugetul este suma pe care o putem cheltui. Dacă plătim mai mult decât costă cumpărăturile, primim înapoi diferența: acesta este restul.',
    'O carte costă 12 lei, iar un creion 3 lei. Costul este 15 lei. Dacă dai 20 de lei, primești 20 − 15 = 5 lei rest.',
    ['Citește toate prețurile.', 'Adună costul produselor.', 'Compară cu bugetul, apoi calculează restul.'],
    ['Produse de jucărie, etichete și bani din hârtie.', 'Alege două produse și calculează costul.', 'Schimbați rolurile: cumpărătorul verifică restul dat de vânzător.'],
    'Citește cât dai la plată, nu doar câți bani ai. Din suma dată la plată scazi costul ca să afli restul. Dacă suma nu ajunge, mai ai nevoie de bani.',
    Content.task('shop', 'budget'), 'Cum verifici restul prin adunare?'),
  L('mat', 9, 'Forme din jurul tău', '🏠',
    'Să lege formele plane de obiecte și să construiască modele geometrice',
    'O cutie ocupă loc în spațiu; desenul unei fețe a ei poate fi un dreptunghi. O formă plană este o formă întinsă pe o suprafață, ca un desen pe hârtie. Conturul unei farfurii rotunde seamănă cu un cerc.',
    'O fereastră dreptunghiulară are 4 laturi și 4 unghiuri drepte. O desenăm pe o foaie cu pătrățele, unind pe rând cele patru vârfuri. Pentru un model în oglindă punem pătrățele pereche de o parte și de alta a liniei din mijloc, la aceeași distanță de ea. Pentru un mozaic, acoperim suprafața fără goluri și fără să punem piesele unele peste altele.',
    ['Alege un obiect.', 'Privește o față sau conturul lui.', 'Descrie forma prin laturi, vârfuri și unghiuri.'],
    ['Obiecte din cameră și foi.', 'Desenează contururile a trei obiecte.', 'Grupează desenele după proprietăți și explică un caz diferit.'],
    'O minge nu este un cerc: este un corp rotund, numit sferă. Cercul este o formă plană.',
    Content.task('shapes', 'objects'), 'Ce deosebire este între o minge și desenul unui cerc?'),
  L('mat', 10, 'Zeci și unități', '🧮',
    'Să descompună numere și să grupeze zece unități într-un grup de zece',
    'O unitate este un obiect numărat separat. Zecile arată câte grupuri de zece unități avem. Într-un număr de două cifre, cifra din stânga arată zecile, iar cea din dreapta unitățile rămase separate. În 62 avem 6 zeci și 2 unități: 60 + 2.',
    '48 = 40 + 8. Dacă adăugăm 2 unități, avem 4 zeci și 10 unități, pe care le schimbăm în 5 zeci: 50.',
    ['Citește cifra zecilor.', 'Citește cifra unităților.', 'Construiește numărul și fă un schimb dacă ai 10 unități.'],
    ['Bețișoare legate câte 10 și o tăviță.', 'Arată același număr prin grupuri și printr-o sumă.', 'Desfă un grup de zece în 10 bețișoare separate. Verifică dacă totalul a rămas același.'],
    'În 70, cifra 0 arată că nu mai avem unități separate pe lângă cele 7 grupuri de zece. Cele 7 grupuri conțin în total 70 de unități.',
    Content.task('placevalue', 'exchange'), 'Cum poți arăta 50 fără să folosești cinci grupe?'),
  L('mat', 11, 'Probleme în doi pași', '🗺️',
    'Să aleagă și să ordoneze două operații',
    'Unele probleme cer două calcule. Facem primul calcul, apoi folosim ce am aflat la al doilea. Citim ce se întâmplă în poveste ca să alegem dacă adunăm sau scădem.',
    'Ai 8 timbre, primești 5 și oferi 3. Întâi 8 + 5 = 13, apoi 13 − 3 = 10. La final ai 10 timbre.',
    ['Spune ce știi la început.', 'Rezolvă prima schimbare.', 'Folosește rezultatul pentru a doua schimbare și verifică.'],
    ['20 de jetoane și două cartonașe: PRIMESC și OFER.', 'Joacă o poveste cu două schimbări.', 'Desenează fiecare pas înainte de calcul.'],
    'Nu adunăm toate numerele automat. Oferirea unor obiecte micșorează cantitatea.',
    Content.task('gen', 'two-step'), 'De ce rezultatul primului pas este important?'),
  L('mat', 12, 'Jumătăți și sferturi', '🍕',
    'Să recunoască împărțirea unui întreg în părți egale',
    'O jumătate este una dintre două părți egale. Un sfert este una dintre patru părți egale. Numărul de bucăți nu este suficient: ele trebuie să fie egale.',
    'Îndoim o foaie pătrată în două părți egale, apoi încă o dată în două părți egale. Când o desfacem, vedem patru sferturi. Două sferturi acoperă cât o jumătate din aceeași foaie. Dacă împărțim fiecare sfert în două părți egale, obținem opt părți numite optimi: patru optimi sunt o jumătate, iar șase optimi sunt trei sferturi.',
    ['Alege un întreg.', 'Împarte-l în părți egale.', 'Reunește părțile ca să verifici întregul.'],
    ['Două foi pătrate de aceeași mărime și creioane colorate.', 'Îndoaie o foaie în două părți egale și pe cealaltă în patru părți egale.', 'Colorează o jumătate pe prima foaie și două sferturi pe a doua. Compară părțile colorate.'],
    'Două bucăți de mărimi diferite nu sunt două jumătăți.',
    Content.task('fractions', 'parts'), 'De ce trebuie să fie egale părțile?'),

  L('lim', 1, 'Litere și sunete', '🔤',
    'Să distingă litera scrisă de sunetul rostit',
    'Sunetul se aude și se rostește; litera este un semn pe care îl vedem și îl scriem. Alfabetul limbii române are 31 de litere. Literele â și î sunt diferite, dar notează același sunet.',
    'În „măr” auzim trei sunete și scriem trei litere: m, ă, r. Pentru primul sunet, rostim mmm, cu buzele lipite, fără să adăugăm un alt sunet.',
    ['Ascultă un cuvânt rostit rar.', 'Identifică primul sunet.', 'Alege litera care îl notează în exemplul dat.'],
    ['Cartonașe cu litere și o tavă cu nisip curat.', 'Trasează o literă cu degetul, apoi rostește sunetul.', 'Găsește un obiect al cărui nume începe cu acel sunet.'],
    'Uneori, mai multe litere lucrează împreună pentru a nota un sunet. În „cheie”, literele c și h notează împreună primul sunet. Ascultăm cuvântul, nu numărăm doar literele.',
    Content.quiz([
      [S('Ascultă cuvântul. Cu ce sunet începe?', 'măr', '🍎', ['m', 'n', 'a'], 0, '„Măr” începe cu sunetul m: mmm-ăr. Îl scriem cu litera m.'),
        S('Ascultă cuvântul. Cu ce sunet începe?', 'casă', '🏠', ['c', 'g', 'a'], 0, '„Casă” începe cu sunetul c. Îl scriem cu litera c.'),
        S('Ascultă cuvântul. Cu ce sunet începe?', 'lună', '🌙', ['l', 'n', 'u'], 0, '„Lună” începe cu sunetul l: lll-ună.'),
        S('Ascultă cuvântul. Cu ce sunet începe?', 'pește', '🐟', ['p', 'b', 'e'], 0, '„Pește” începe cu p. Pune palma în fața gurii: la p simți aerul.'),
        S('Ascultă cuvântul. Cu ce sunet începe?', 'soare', '☀️', ['s', 'ș', 'o'], 0, '„Soare” începe cu s: sss-oare. „Ș” este alt sunet, ca în „șoarece”.'),
        S('Ascultă cuvântul. Cu ce sunet începe?', 'floare', '🌸', ['f', 'v', 'l'], 0, '„Floare” începe cu f: fff-loare. La v simți cum vibrează gâtul.'),
        S('Ascultă cuvântul. Cu ce sunet începe?', 'urs', '🐻', ['u', 'o', 'r'], 0, '„Urs” începe cu sunetul u.'),
        S('Ascultă cuvântul. Cu ce sunet începe?', 'ou', '🥚', ['o', 'u', 'a'], 0, '„Ou” începe cu sunetul o.'),
        S('Ascultă cuvântul. Cu ce sunet începe?', 'avion', '✈️', ['a', 'ă', 'v'], 0, '„Avion” începe cu a. „Ă” este alt sunet, ca în „ăsta”.'),
        S('Ascultă cuvântul. Cu ce sunet începe?', 'nor', '☁️', ['n', 'm', 'o'], 0, '„Nor” începe cu n: nnn-or. La m buzele se lipesc; la n, nu.'),
        S('Ascultă cuvântul. Cu ce sunet începe?', 'tren', '🚂', ['t', 'd', 'r'], 0, '„Tren” începe cu t. La d simți cum vibrează gâtul.'),
        S('Ascultă cuvântul. Cu ce sunet începe?', 'banană', '🍌', ['b', 'p', 'a'], 0, '„Banană” începe cu b. La b gâtul vibrează; la p, nu.')],
      [S('Ascultă cuvântul. Cu ce sunet se termină?', 'pat', '🛏️', ['t', 'd', 'a'], 0, '„Pat” se termină cu sunetul t.', 'Spune cuvântul și oprește-te pe ultimul sunet.'),
        S('Ascultă cuvântul. Cu ce sunet se termină?', 'nas', '👃', ['s', 'ș', 'a'], 0, '„Nas” se termină cu s: na-sss.', 'Spune cuvântul și oprește-te pe ultimul sunet.'),
        S('Ascultă cuvântul. Cu ce sunet se termină?', 'cal', '🐴', ['l', 'n', 'a'], 0, '„Cal” se termină cu l: ca-lll.', 'Spune cuvântul și oprește-te pe ultimul sunet.'),
        S('Ascultă cuvântul. Cu ce sunet se termină?', 'pom', '🌳', ['m', 'n', 'o'], 0, '„Pom” se termină cu m: buzele se lipesc la final.', 'Spune cuvântul și oprește-te pe ultimul sunet.'),
        S('Ascultă cuvântul. Cu ce sunet se termină?', 'os', '🦴', ['s', 'z', 'o'], 0, '„Os” se termină cu s.', 'Spune cuvântul și oprește-te pe ultimul sunet.'),
        S('Ascultă cuvântul. Cu ce sunet se termină?', 'cub', '🧊', ['b', 'p', 'u'], 0, '„Cub” se termină cu b.', 'Spune cuvântul și oprește-te pe ultimul sunet.'),
        S('Ascultă cuvântul. Câte sunete auzi?', 'nas', '👃', ['3', '2', '4'], 0, 'N-a-s: trei sunete. Scriem și trei litere.', 'Bate din palme o dată pentru fiecare sunet: n, a, s.'),
        S('Ascultă cuvântul. Câte sunete auzi?', 'lună', '🌙', ['4', '3', '5'], 0, 'L-u-n-ă: patru sunete.', 'Bate din palme o dată pentru fiecare sunet.'),
        S('Ascultă cuvântul. Câte sunete auzi?', 'urs', '🐻', ['3', '2', '4'], 0, 'U-r-s: trei sunete.', 'Bate din palme o dată pentru fiecare sunet.'),
        S('Ascultă cuvântul. Câte sunete auzi?', 'tren', '🚂', ['4', '3', '5'], 0, 'T-r-e-n: patru sunete.', 'Bate din palme o dată pentru fiecare sunet.'),
        S('Ascultă cuvântul. Care cuvânt începe cu același sunet?', 'minge', '⚽', ['mare', 'nas', 'pat'], 0, '„Minge” și „mare” încep amândouă cu m.', 'Spune primul sunet din „minge”, apoi primul sunet din fiecare variantă.'),
        S('Ascultă cuvântul. Care cuvânt începe cu același sunet?', 'pisică', '🐱', ['pod', 'bec', 'cal'], 0, '„Pisică” și „pod” încep amândouă cu p. „Bec” începe cu b.', 'Spune primul sunet din „pisică”, apoi primul sunet din fiecare variantă.')],
      [S('Ascultă cuvântul. Cum scriem primul sunet?', 'cheie', '🔑', ['ch', 'c', 'h'], 0, 'La „cheie”, primul sunet se scrie cu două litere: ch.', 'Înainte de e și i, sunetul din „cal” se scrie ch.'),
        S('Ascultă cuvântul. Cum scriem primul sunet?', 'ghete', '👢', ['gh', 'g', 'h'], 0, 'La „ghete”, primul sunet se scrie gh, ca în „ghem”.', 'Înainte de e și i, sunetul din „gâscă” se scrie gh.'),
        S('Ascultă cuvântul. Cum scriem primul sunet?', 'ceapă', '🧅', ['ce', 'che', 'se'], 0, '„Ceapă” începe cu ce, ca în „ceas”.', 'Ce se aude altfel decât che: ascultă „ceapă” și „chem”.'),
        S('Ascultă cuvântul. Cum scriem primul sunet?', 'cireașă', '🍒', ['ci', 'chi', 'și'], 0, '„Cireașă” începe cu ci, ca în „cinci”.', 'Ci se aude altfel decât chi: ascultă „cireașă” și „chibrit”.'),
        S('Ascultă cuvântul. Cum scriem primul sunet?', 'ghiozdan', '🎒', ['ghi', 'gi', 'chi'], 0, '„Ghiozdan” începe cu ghi, ca în „ghindă”.', 'Gi se aude altfel: ascultă „ghiozdan” și „girafă”.'),
        S('Ascultă cuvântul. Cum scriem primul sunet?', 'girafă', '🦒', ['gi', 'ghi', 'ji'], 0, '„Girafă” începe cu gi.', 'Ghi se aude altfel: ascultă „girafă” și „ghiozdan”.'),
        S('Ascultă cuvântul. Ce literă scriem pentru sunetul din mijloc?', 'pâine', '🍞', ['â', 'î', 'ă'], 0, 'În „pâine”, sunetul din mijloc se scrie cu â.', 'În interiorul cuvântului scriem de obicei â.'),
        S('Ascultă cuvântul. Ce literă scriem pentru sunetul din mijloc?', 'câine', '🐕', ['â', 'î', 'ă'], 0, 'În „câine” scriem â, în interiorul cuvântului.', 'În interiorul cuvântului scriem de obicei â.'),
        S('Ascultă cuvântul. Ce literă scriem la început?', 'înger', '👼', ['î', 'â', 'i'], 0, 'La începutul cuvântului scriem î: „înger”.', 'La începutul cuvântului scriem î, nu â.'),
        S('Ascultă cuvântul. Câte sunete auzi și câte litere scriem?', 'cheie', '🔑', ['4 sunete, 5 litere', '5 sunete, 5 litere', '4 sunete, 4 litere'], 0, 'Auzim 4 sunete, dar scriem 5 litere: ch notează un singur sunet.', 'Numără sunetele bătând din palme, apoi numără literele scrise.')]
    ], [5, 5, 6]), 'Ce auzi când cineva spune „măr” și ce vezi când cuvântul este scris?'),
  L('lim', 2, 'Silabe', '👏',
    'Să despartă cuvinte simple în silabe',
    'Când spunem rar un cuvânt, putem auzi părțile lui rostite dintr-o dată. Fiecare astfel de parte este o silabă. De exemplu, în „ma-mă” auzim două silabe.',
    '„Ma-mă” are două silabe, „ba-lon” are două, iar „ca-me-ră” are trei. În „soa-re”, oa este în aceeași silabă.',
    ['Rostește cuvântul întreg.', 'Repetă-l rar și bate o dată pentru fiecare silabă.', 'Reunește silabele și verifică dacă ai același cuvânt.'],
    ['Jetoane și imagini cu obiecte cunoscute.', 'Pune un jeton pentru fiecare silabă rostită.', 'Compară cuvinte cu una, două și trei silabe.'],
    'În „soa-re”, o și a se rostesc împreună, în aceeași silabă. Cuvântul are două silabe: ascultăm cum îl rostim.',
    Content.task('wordbuilder', 'syllables'), 'Ce silabe auzi când rostești rar „soare”?'),
  L('lim', 3, 'Cuvinte și propoziții', '📝',
    'Să construiască propoziții cu sens și punctuație potrivită',
    'Cuvintele se leagă pentru a transmite un mesaj. În scris, începem propoziția cu literă mare și folosim la final punct, semn de întrebare sau semn de exclamare, după mesaj.',
    '„Ana citește o carte.” spune ceva. „Ce citește Ana?” întreabă. Ordinea cuvintelor se poate schimba, dar sensul și acordurile trebuie păstrate.',
    ['Găsește despre cine este mesajul.', 'Alege ce se întâmplă.', 'Recitește și verifică începutul și semnul final.'],
    ['Cartonașe cu cuvinte și semne de punctuație.', 'Construiește o propoziție.', 'Mută cuvintele și discută ce variante păstrează sensul.'],
    'Nu orice șir de cuvinte formează o propoziție clară. În joc reconstruim mesajul indicat; pot exista și alte formulări corecte în afara lui.',
    Content.sequence([
      [O('Reconstruiește: Ana citește.', ['Ana', 'citește.'], 'Ana este persoana despre care vorbim; citește arată acțiunea.'),
        O('Reconstruiește: Pisica doarme.', ['Pisica', 'doarme.'], 'Aflăm cine face acțiunea și ce face.'),
        O('Reconstruiește: Mama gătește.', ['Mama', 'gătește.'], 'Propoziția începe cu literă mare și se încheie cu punct.'),
        O('Reconstruiește: Câinele latră.', ['Câinele', 'latră.'], 'Mai întâi spunem cine, apoi ce face.'),
        O('Reconstruiește: Ionel bea apă.', ['Ionel', 'bea', 'apă.'], 'Ionel face acțiunea; „apă” arată ce bea.')],
      [O('Reconstruiește: Copilul desenează o casă.', ['Copilul', 'desenează', 'o', 'casă.'], 'Cuvintele formează un mesaj complet, cu literă mare și punct.'),
        O('Reconstruiește: Bunica face o plăcintă.', ['Bunica', 'face', 'o', 'plăcintă.'], 'Aflăm cine face, ce face și ce anume.'),
        O('Reconstruiește: Noi mergem la școală.', ['Noi', 'mergem', 'la', 'școală.'], '„Noi” se potrivește cu „mergem”.'),
        O('Reconstruiește: Ana are o minge roșie.', ['Ana', 'are', 'o', 'minge', 'roșie.'], '„Roșie” stă după „minge” și spune cum este mingea.'),
        O('Reconstruiește: Pisica bea lapte cald.', ['Pisica', 'bea', 'lapte', 'cald.'], '„Cald” spune cum este laptele.')],
      [O('Reconstruiește întrebarea: De ce pleacă Maria?', ['De', 'ce', 'pleacă', 'Maria?'], 'Întrebarea cere un motiv și se încheie cu semnul întrebării.'),
        O('Reconstruiește întrebarea: Când vine bunicul?', ['Când', 'vine', 'bunicul?'], '„Când” cere momentul; la final punem semnul întrebării.'),
        O('Reconstruiește întrebarea: Cine a deschis fereastra?', ['Cine', 'a', 'deschis', 'fereastra?'], '„Cine” cere persoana care a făcut acțiunea.'),
        O('Reconstruiește: Ce frumos cântă păsările!', ['Ce', 'frumos', 'cântă', 'păsările!'], 'Semnul exclamării arată aici bucuria sau mirarea.'),
        O('Reconstruiește întrebarea: Ai luat umbrela?', ['Ai', 'luat', 'umbrela?'], 'Întrebarea așteaptă răspunsul „da” sau „nu”.')]
    ], [3, 4, 4]), 'Cum schimbă semnul întrebării mesajul?'),
  L('lim', 4, 'Rime și sunete', '🎵',
    'Să recunoască rime după asemănarea sunetelor finale',
    'Cuvintele care rimează se aud asemănător la sfârșit, de la ultima vocală pe care o rostim mai apăsat. De exemplu, în „casă” și „masă” auzim același final: „asă”.',
    '„Casă” și „masă” rimează. „Floare” și „soare” rimează. „Floare” și „poate” nu sunt un exemplu bun de rimă.',
    ['Rostește două cuvinte.', 'Ascultă partea finală.', 'Caută o pereche și spune-o într-un vers scurt.'],
    ['Imagini cu obiecte și cartonașe.', 'Așază împreună două imagini ale căror nume rimează.', 'Inventează un vers cu perechea aleasă.'],
    'Două cuvinte nu rimează doar pentru că încep la fel sau au același număr de litere.',
    Content.matching([
      [{ a: 'casă', b: 'masă' }, { a: 'mere', b: 'pere' }, { a: 'floare', b: 'soare' }, { a: 'ou', b: 'nou' }, { a: 'pom', b: 'om' }, { a: 'cal', b: 'bal' }, { a: 'urs', b: 'curs' }, { a: 'lac', b: 'sac' }],
      [{ a: 'pisică', b: 'bunică' }, { a: 'carte', b: 'parte' }, { a: 'dor', b: 'nor' }, { a: 'ceas', b: 'nas' }, { a: 'lună', b: 'bună' }, { a: 'stea', b: 'cafea' }, { a: 'minge', b: 'ninge' }, { a: 'cățel', b: 'purcel' }],
      [{ a: 'călător', b: 'visător' }, { a: 'jucărie', b: 'bucurie' }, { a: 'pădure', b: 'mure' }, { a: 'frumos', b: 'voios' }, { a: 'primăvară', b: 'seară' }, { a: 'luminiță', b: 'grădiniță' }, { a: 'ciocolată', b: 'odată' }]
    ], [4, 4, 5]), 'De ce ascultăm finalul, nu începutul?'),
  L('lim', 5, 'Povestea mea', '✍️',
    'Să scrie o poveste scurtă și să o revizuiască după criterii',
    'O poveste poate avea un început care prezintă personajul și locul, o întâmplare și o încheiere. Un detaliu îl ajută pe cititor să-și imagineze scena.',
    '„Mara era în parc. A găsit un cățel rătăcit și a chemat un adult. Împreună au găsit stăpânul.” Avem personaj, întâmplare și încheiere.',
    ['Alege un personaj și un loc.', 'Spune ce se întâmplă și cum reacționează personajul.', 'Scrie încheierea, apoi recitește cu voce tare.'],
    ['Trei foi mici și creioane.', 'Desenează începutul, întâmplarea și finalul.', 'Povestește după desene, apoi scrie câte un enunț.'],
    'Recitește povestea sau roagă un adult să o citească împreună cu tine. Se înțelege ce s-a întâmplat? Verifică și litera mare și semnele de la final. Jocul nu poate verifica singur dacă povestea are sens.',
    Content.task('type', 'story'), 'Ce află cititorul din încheiere?'),
  L('lim', 6, 'Scriem ă, â și î', '🔎',
    'Să completeze cuvinte uzuale cu ă, â sau î',
    'Ă notează un sunet diferit de cel notat prin â sau î. Ascultă „măr” și „râu”. Â și î notează același sunet. De obicei, scriem î la începutul și la sfârșitul cuvântului, iar â în interior.',
    'Scriem „înot” și „a coborî”, dar „pâine” și „râu”. Unele cuvinte păstrează î și în interior: „neînțeles” se formează adăugând ne- înaintea cuvântului „înțeles”.',
    ['Rostește cuvântul și observă sunetul.', 'Verifică poziția literei și forma cuvântului.', 'Citește cuvântul complet și compară cu modelul.'],
    ['Cartonașe cu ă, â, î și cuvinte incomplete.', 'Completează cuvinte cunoscute și compară-le cu un model scris corect.', 'Arată unde ai scris î sau â: la început, în interior ori la sfârșit. Privește separat perechea „înțeles” și „neînțeles”.'],
    'Sunetul singur nu ne spune dacă scriem â sau î. Privește locul literei și modelul cuvântului. Dacă nu ești sigur, cere ajutor.',
    Content.task('wordbuilder', 'diacritics'), 'De ce „neînțeles” păstrează î?'),
  L('lim', 7, 'Cuvinte din jurul tău', '🏷️',
    'Să citească etichete și să lege cuvintele de sens',
    'Cuvintele scrise ne ajută să găsim locuri, obiecte și informații. Pe etichete putem citi numele produsului; pe indicatoare putem afla o direcție.',
    '„PIAȚĂ”, „PARC” și „APĂ” sunt cuvinte întâlnite în jur. Citim întregul cuvânt, nu ghicim doar după prima literă sau imagine.',
    ['Privește toate literele.', 'Citește cuvântul și spune ce înseamnă.', 'Verifică dacă sensul se potrivește cu obiectul sau locul.'],
    ['Etichete scrise de mână și obiecte sigure.', 'Pune etichetele lângă obiectele potrivite.', 'Schimbă două etichete și găsește nepotrivirile.'],
    'O imagine ne ajută, dar nu înlocuiește citirea. „Masă” și „casă” diferă printr-o singură literă și au sensuri diferite.',
    Content.matching([
      [{ a: 'carte', b: '📖' }, { a: 'măr', b: '🍎' }, { a: 'floare', b: '🌸' }, { a: 'casă', b: '🏠' }, { a: 'pește', b: '🐟' }, { a: 'minge', b: '⚽' }, { a: 'lună', b: '🌙' }, { a: 'pisică', b: '🐱' }, { a: 'ceas', b: '⏰' }],
      [{ a: 'bibliotecă', b: 'Loc de împrumutat cărți' }, { a: 'farmacie', b: 'Loc de cumpărat medicamente' }, { a: 'parc', b: 'Spațiu verde pentru plimbare' }, { a: 'piață', b: 'Loc de cumpărat fructe și legume' },
        { a: 'spital', b: 'Loc unde sunt îngrijiți bolnavii' }, { a: 'brutărie', b: 'Loc de cumpărat pâine' }, { a: 'stație', b: 'Loc unde așteptăm autobuzul' }, { a: 'poștă', b: 'Loc de trimis scrisori și colete' }],
      [{ a: 'fragil', b: 'Se poate sparge ușor' }, { a: 'intrare', b: 'Pe aici poți intra' }, { a: 'ieșire', b: 'Pe aici poți ieși' }, { a: 'reciclabil', b: 'Materialul poate fi folosit pentru a face alte obiecte' }, { a: 'interzis', b: 'Nu este permis' },
        { a: 'trageți', b: 'Deschizi ușa trăgând-o spre tine' }, { a: 'împingeți', b: 'Deschizi ușa împingând-o' }, { a: 'închis', b: 'Acum nu se poate intra' }, { a: 'atenție', b: 'Fii atent, poate fi un pericol' }]
    ], [4, 4, 5]), 'Cum verifici că nu ai ghicit cuvântul după imagine?'),
  L('lim', 8, 'Citim cu înțeles', '📚',
    'Să găsească informații și să susțină o concluzie prin text',
    'Când citim o întâmplare, urmărim cine participă, unde și ce se întâmplă. Uneori aflăm și de ce. Unele răspunsuri sunt scrise direct; altele le aflăm legând indicii din text.',
    'Dacă textul spune că plouă și că Lia își ia umbrela, putem explica alegerea ei: umbrela o ajută să nu se ude.',
    ['Citește textul fără grabă.', 'Caută cuvintele sau propozițiile care te ajută să răspunzi.', 'Spune ce este scris în text și ce ai aflat legând indiciile.'],
    ['Un text scurt și trei creioane colorate.', 'Marchează personajul, locul și un indiciu.', 'Povestește folosind doar informațiile din text.'],
    'Nu alegem ce ni s-ar părea interesant, ci ce este susținut de text. Putem reciti oricând.',
    Content.task('reading', 'park'), 'Care propoziție te-a ajutat să răspunzi?'),
  L('lim', 9, 'Atelierul de punctuație', '❔',
    'Să aleagă semnul final și să păstreze sensul mesajului',
    'Punctul încheie o comunicare obișnuită. Semnul întrebării marchează o întrebare. Semnul exclamării poate arăta o strigare, o emoție puternică sau un îndemn.',
    '„Unde este mingea?” cere o informație. „Mingea este aici.” oferă o informație. „Ai grijă!” este un avertisment.',
    ['Citește mesajul cu voce tare.', 'Observă dacă oferă o informație, pune o întrebare sau exprimă o emoție, o urare ori un avertisment.', 'Alege semnul și recitește.'],
    ['Cartonașe cu punct, semn de întrebare și semn de exclamare.', 'Spune același mesaj cu intonații diferite.', 'Discutați când se schimbă semnul final.'],
    'Nu punem semnul întrebării doar pentru că enunțul este scurt. Contează ce comunică.',
    Content.handsOn('punctuation', 'marks', Content.quiz([
      [Q('„Unde este cartea” se termină cu…', ['?', '.', ','], 0, 'Mesajul cere o informație, deci este o întrebare.'),
        Q('„Pisica doarme pe pernă” se termină cu…', ['.', '?', '!'], 0, 'Mesajul ne spune ce face pisica, deci punem punct.'),
        Q('„Câți ani ai” se termină cu…', ['?', '.', '!'], 0, '„Câți” cere o informație: este o întrebare.'),
        Q('„Ura, am câștigat” arată bucurie. Alegem…', ['!', '?', '.'], 0, 'Semnul exclamării arată o emoție puternică, aici bucuria.'),
        Q('„Mâine mergem la bunici” se termină cu…', ['.', '?', ','], 0, 'Mesajul anunță un plan: este o comunicare obișnuită.')],
      [Q('„Oprește-te, vine o mașină” este un avertisment. Alegem…', ['!', '?', ','], 0, 'Un avertisment rostit apăsat poate fi încheiat cu semnul exclamării.'),
        Q('Care enunț este o întrebare?', ['Ai văzut mingea?', 'Am văzut mingea.', 'Ce minge frumoasă!'], 0, 'Doar primul enunț cere un răspuns.'),
        Q('Care enunț arată mirare?', ['Ce mare e balena!', 'Balena e mare.', 'E mare balena?'], 0, 'Semnul exclamării arată aici mirarea.'),
        Q('Alege semnul potrivit: „Unde ai pus cheile…”', ['?', '.', '!'], 0, '„Unde” cere locul: este o întrebare.')],
      [Q('Care variantă transmite o informație, nu o întrebare?', ['Mara vine azi.', 'Mara vine azi?', 'Când vine Mara?'], 0, 'Punctul marchează aici comunicarea unei informații.'),
        Q('Vrei să-l avertizezi pe Matei că alunecă. Ce scrii?', ['Atenție, e gheață!', 'Atenție, e gheață?', 'Atenție, e gheață,'], 0, 'Un avertisment se poate încheia cu semnul exclamării.'),
        Q('Care enunț îl întreabă pe Radu dacă vine?', ['Vii, Radu?', 'Vino, Radu!', 'Radu vine.'], 0, '„Vii, Radu?” întreabă; „Vino, Radu!” îl cheamă.'),
        Q('În care enunț virgula desparte numele celui strigat?', ['Ana, vino la masă!', 'Ana vino, la masă!', 'Ana vino la, masă!'], 0, 'Când strigăm pe cineva, despărțim numele prin virgulă.'),
        Q('Câte enunțuri sunt în „Plouă. Ia umbrela!”?', ['Două', 'Unul', 'Trei'], 0, 'Fiecare enunț se încheie cu semnul lui: punct, apoi semnul exclamării.')]
    ], [4, 4, 5]), [2, 3, 3]), 'Cum schimbă intonația sensul?'),
  L('lim', 10, 'Redactorul atent', '🖍️',
    'Să observe și să corecteze greșeli în enunțuri cunoscute',
    'Revizuirea înseamnă să recitim și să îmbunătățim ce am scris. Se înțelege mesajul? Se potrivesc formele cuvintelor, ca în „copiii citesc”? Verificăm și litera mare, semnele din ă, â, î, ș, ț și punctuația.',
    '„Copiii citește.” devine „Copiii citesc.” Vorbim despre mai mulți copii, de aceea folosim forma „citesc”.',
    ['Citește întregul enunț.', 'Caută o singură nepotrivire.', 'Alege corectarea și explică ce s-a schimbat.'],
    ['Două variante ale unui enunț, scrise pe foi.', 'Încercuiește diferența.', 'Citește varianta corectă și inventează un exemplu asemănător.'],
    'Nu schimbăm un cuvânt doar pentru că este mai lung. Corectarea trebuie să păstreze sensul și să respecte regula.',
    Content.quiz([
      [Q('Alege enunțul corect.', ['Ana citește.', 'ana citește.', 'Ana citește'], 0, 'Începem cu literă mare și încheiem cu un semn potrivit.'),
        Q('Alege enunțul scris corect.', ['Mihai are un câine.', 'mihai are un câine.', 'Mihai are un caine.'], 0, 'Mihai este un nume: îl scriem cu literă mare. „Câine” se scrie cu â.'),
        Q('Ce lipsește din „Bunica face plăcinte”?', ['Punctul', 'Litera mare', 'Un cuvânt'], 0, 'Enunțul are literă mare, dar nu are semn final.'),
        Q('Alege cuvântul scris corect.', ['pește', 'peste', 'pesțe'], 0, 'Animalul din apă se scrie „pește”, cu ș.')],
      [Q('Alege enunțul în care cuvintele se potrivesc.', ['Păsările zboară.', 'Păsările zbor.', 'Păsările zboarăre.'], 0, 'Spunem „păsările zboară”, așa cum spunem „copiii citesc”.'),
        Q('Alege forma potrivită: „Eu … o scrisoare.”', ['scriu', 'scrie', 'scriem'], 0, 'Spunem „eu scriu”.'),
        Q('Care enunț despre fete este corect?', ['Fetele se joacă.', 'Fetele se joc.', 'Fetele se joacăm.'], 0, 'Spunem „fetele se joacă”, ca „ele se joacă”.'),
        Q('Alege forma potrivită: „Tu … la școală?”', ['mergi', 'merge', 'mergem'], 0, 'Spunem „tu mergi”.')],
      [Q('Alege enunțul corect.', ['Câți copaci sunt în parc?', 'Câte copaci sunt în parc?', 'Câți copaci este în parc?'], 0, '„Copaci” cere „câți”, iar pluralul cere „sunt”.'),
        Q('Cum scriem corect „s-a dus”?', ['Ea s-a dus acasă.', 'Ea sa dus acasă.', 'Ea s-au dus acasă.'], 0, '„S-a dus” se scrie cu cratimă: „se” și „a dus” se rostesc împreună.'),
        Q('Cum scriem corect „mi-e”?', ['Mi-e foame.', 'Mie foame.', 'Mi e foame.'], 0, '„Mi-e” înseamnă „îmi este” și se scrie cu cratimă.'),
        Q('Care enunț are toate diacriticele?', ['Nu știu ce să fac.', 'Nu știu ce sa fac.', 'Nu stiu ce să fac.'], 0, 'Scriem „știu” cu ș și „să” cu ă.')]
    ], [4, 4, 5]), 'Cum alegi între „copiii citește” și „copiii citesc”?'),
  L('lim', 11, 'Cuvinte asemănătoare și opuse', '↔️',
    'Să găsească un cuvânt cu sens asemănător și unul cu sens opus',
    'Unele cuvinte au sens asemănător: „mare” și „uriaș”, „a vorbi” și „a spune”. Altele au sens opus: „mare” și „mic”, „cald” și „rece”. Ce cuvânt se potrivește depinde de propoziție.',
    'În „Ursul este mare.” putem spune „Ursul este uriaș.” și sensul rămâne. Dacă spunem „Ursul este mic.”, sensul devine opus.',
    ['Citește sau ascultă propoziția.', 'Pune în locul cuvântului varianta aleasă.', 'Verifică: sensul a rămas, a devenit opus sau doar altul?'],
    ['Cartonașe cu cuvinte și obiecte din casă.', 'Găsește perechi de obiecte opuse: unul mare și unul mic, unul greu și unul ușor.', 'Spune o propoziție despre un obiect, apoi schimbă un cuvânt cu unul asemănător.'],
    'Nu orice cuvânt diferit este opusul. „Mare” și „verde” sunt doar diferite; opusul lui „mare” este „mic”.',
    Content.quiz([
      [Q('Care este opusul cuvântului „mare”?', ['mic', 'înalt', 'verde'], 0, '„Mare” și „mic” au sensuri opuse. „Înalt” spune ceva apropiat de „mare”.'),
        Q('Care este opusul cuvântului „cald”?', ['rece', 'fierbinte', 'umed'], 0, '„Cald” și „rece” sunt opuse. „Fierbinte” înseamnă foarte cald.'),
        Q('Care este opusul cuvântului „zi”?', ['noapte', 'soare', 'dimineață'], 0, 'Ziua și noaptea sunt opuse. Dimineața face parte din zi.'),
        Q('Care este opusul cuvântului „sus”?', ['jos', 'departe', 'aproape'], 0, '„Sus” și „jos” sunt opuse. „Departe” este opusul lui „aproape”.'),
        Q('Care este opusul cuvântului „deschis”?', ['închis', 'larg', 'gol'], 0, 'O ușă deschisă și o ușă închisă: sensuri opuse.'),
        Q('Care este opusul cuvântului „vesel”?', ['trist', 'zâmbitor', 'obosit'], 0, '„Vesel” și „trist” sunt opuse. „Zâmbitor” are sens asemănător cu „vesel”.'),
        Q('Care este opusul cuvântului „plin”?', ['gol', 'greu', 'mare'], 0, 'Un pahar plin și un pahar gol: sensuri opuse.'),
        Q('Care este opusul cuvântului „nou”?', ['vechi', 'frumos', 'curat'], 0, 'O haină nouă și o haină veche: sensuri opuse.')],
      [Q('Ce cuvânt are sens asemănător cu „frumos”?', ['drăguț', 'urât', 'mare'], 0, '„Frumos” și „drăguț” spun aproape același lucru. „Urât” este opusul.'),
        Q('Ce cuvânt are sens asemănător cu „a începe”?', ['a porni', 'a termina', 'a aștepta'], 0, '„A începe” și „a porni” au sens asemănător. „A termina” este opusul.'),
        Q('Ce cuvânt are sens asemănător cu „repede”?', ['rapid', 'încet', 'târziu'], 0, '„Repede” și „rapid” spun același lucru.'),
        Q('Ce cuvânt are sens asemănător cu „a privi”?', ['a se uita', 'a asculta', 'a închide'], 0, 'Privim și ne uităm cu ochii.'),
        Q('Ce cuvânt are sens asemănător cu „fricos”?', ['speriat', 'curajos', 'vesel'], 0, '„Fricos” și „speriat” sunt apropiate. „Curajos” este opusul.'),
        Q('Ce cuvânt are sens asemănător cu „a vorbi”?', ['a spune', 'a tăcea', 'a scrie'], 0, 'Vorbim și spunem cu vocea. „A tăcea” este opusul.'),
        Q('Ce cuvânt are sens asemănător cu „bucuros”?', ['vesel', 'supărat', 'grăbit'], 0, '„Bucuros” și „vesel” au sens asemănător.')],
      [Q('„Câinele este mic.” Ce cuvânt face sensul opus?', ['mare', 'micuț', 'tânăr'], 0, '„Câinele este mare.” spune contrariul. „Micuț” păstrează sensul.'),
        Q('În „Dan a terminat tema.”, ce poate înlocui „a terminat” fără să schimbe sensul?', ['a încheiat', 'a început', 'a uitat'], 0, '„Dan a încheiat tema.” spune același lucru.'),
        Q('Care pereche are sensuri opuse?', ['ușor – greu', 'ușor – simplu', 'greu – dificil'], 0, 'Un rucsac ușor și unul greu: opuse. „Ușor” poate însemna și „simplu”, dar asta nu e un opus.'),
        Q('Care pereche are sensuri asemănătoare?', ['a alerga – a fugi', 'a alerga – a sta', 'a fugi – a dormi'], 0, 'Când alergi, fugi: sensurile sunt apropiate.'),
        Q('„Bunicul este bătrân.” Ce cuvânt are sens opus lui „bătrân”?', ['tânăr', 'vechi', 'înțelept'], 0, 'Pentru oameni, opusul lui „bătrân” este „tânăr”. „Vechi” spunem despre obiecte.'),
        Q('Ce cuvânt NU are sens asemănător cu „vesel”?', ['trist', 'bucuros', 'voios'], 0, '„Trist” este opusul lui „vesel”. Celelalte două au sens apropiat.'),
        Q('„Afară este întuneric.” Ce cuvânt spune opusul?', ['lumină', 'noapte', 'umbră'], 0, '„Afară este lumină.” spune contrariul. Noaptea și umbra țin de întuneric.')]
    ], [5, 5, 5]), 'Cum verifici dacă două cuvinte au sens opus?'),
  L('lim', 12, 'Unul sau mai mulți', '👥',
    'Să formeze și să recunoască forma pentru unul și pentru mai mulți',
    'Când vorbim despre un singur lucru, spunem „o carte” sau „un măr”. Când sunt mai multe, spunem „două cărți” sau „trei mere”. De obicei, cuvântul își schimbă sfârșitul.',
    '„O floare” devine „două flori”. „Un copil” devine „doi copii”. Uneori se schimbă și o literă din interior: „o masă”, dar „două mese”.',
    ['Numără câte lucruri sunt.', 'Spune cuvântul cu „un” sau „o” pentru unul.', 'Spune-l cu „doi” sau „două” și ascultă ce se schimbă la final.'],
    ['Obiecte mici din casă: nasturi, creioane, linguri.', 'Așază un obiect, apoi două, și spune forma potrivită de fiecare dată.', 'Joc pe rând: adultul spune „un creion”, copilul răspunde „două creioane”.'],
    'Nu adăugăm același final la toate cuvintele: spunem „doi pomi”, dar „două mere” și „două case”. Ascultăm cum sună firesc și verificăm.',
    Content.quiz([
      [Q('Un măr, două …', ['mere', 'mări', 'măruri'], 0, 'Spunem „un măr, două mere”. „Mări” vine de la „mare”.'),
        Q('O carte, două …', ['cărți', 'carte', 'cartele'], 0, 'Spunem „o carte, două cărți”.'),
        Q('Un copil, doi …', ['copii', 'copili', 'copiluri'], 0, 'Spunem „un copil, doi copii”.'),
        Q('O floare, două …', ['flori', 'floare', 'floari'], 0, 'Spunem „o floare, două flori”.'),
        Q('O casă, două …', ['case', 'căsi', 'casăuri'], 0, 'Spunem „o casă, două case”.'),
        Q('Un pom, doi …', ['pomi', 'pomuri', 'pome'], 0, 'Spunem „un pom, doi pomi”.'),
        Q('O pisică, două …', ['pisici', 'pisică', 'pisice'], 0, 'Spunem „o pisică, două pisici”.'),
        Q('Un câine, doi …', ['câini', 'câine', 'câinuri'], 0, 'Spunem „un câine, doi câini”.')],
      [Q('Două mese, o …', ['masă', 'mesă', 'mase'], 0, 'Spunem „o masă”: se schimbă și litera din mijloc.'),
        Q('Trei stele, o …', ['stea', 'stelă', 'stele'], 0, 'Spunem „o stea, trei stele”.'),
        Q('Care cuvânt arată mai multe lucruri?', ['ouă', 'ou', 'oul'], 0, '„Ouă” este forma pentru mai multe: un ou, două ouă.'),
        Q('Care cuvânt arată un singur lucru?', ['creion', 'creioane', 'creioanele'], 0, '„Creion” este forma pentru unul singur.'),
        Q('Completează: „Două … zboară.”', ['păsări', 'pasăre', 'păsare'], 0, 'Spunem „o pasăre, două păsări”.'),
        Q('Un băiat, doi …', ['băieți', 'băiați', 'băiate'], 0, 'Spunem „un băiat, doi băieți”.'),
        Q('Un frate, doi …', ['frați', 'frate', 'fratei'], 0, 'Spunem „un frate, doi frați”.')],
      [Q('„Pe cer este o stea.” Cum spunem dacă sunt mai multe?', ['Pe cer sunt stele.', 'Pe cer este stele.', 'Pe cer sunt stea.'], 0, 'Pentru mai multe se schimbă și „este” în „sunt”, și „stea” în „stele”.'),
        Q('„Am un ochi albastru.” Cum spunem despre amândoi ochii?', ['Am ochi albaștri.', 'Am ochi albastru.', 'Am ochii albastre.'], 0, '„Albastru” devine „albaștri” când vorbim despre mai mulți ochi.'),
        Q('Care cuvânt are aceeași formă pentru unul și pentru mai mulți?', ['ochi', 'măr', 'floare'], 0, '„Un ochi”, „doi ochi”: forma nu se schimbă.'),
        Q('Completează: „Câte … ai în penar?”', ['creioane', 'creion', 'creioni'], 0, '„Câte” întreabă de mai multe, deci folosim „creioane”.'),
        Q('Completează: „Mama a cumpărat trei … de lapte.”', ['sticle', 'sticlă', 'sticluri'], 0, 'Spunem „o sticlă, trei sticle”.'),
        Q('Care enunț vorbește despre mai mulți copii?', ['Copiii cântă.', 'Copilul cântă.', 'Un copil cântă.'], 0, '„Copiii” arată mai mulți copii.')]
    ], [5, 5, 5]), 'Ce se schimbă când spui „o floare” și „două flori”?'),
  L('lim', 13, 'Citim instrucțiuni', '📋',
    'Să citească o instrucțiune scurtă și să urmeze pașii în ordine',
    'O instrucțiune ne spune ce să facem, pas cu pas. Cuvinte precum „mai întâi”, „apoi” și „la final” ne arată ordinea. Dacă sărim un pas, rezultatul poate ieși altfel.',
    '„Mai întâi spală-te pe mâini. Apoi ia o farfurie. La final, pune fructele în ea.” Primul pas este spălatul pe mâini.',
    ['Citește toată instrucțiunea o dată.', 'Caută cuvintele de ordine: mai întâi, apoi, la final.', 'Fă pașii unul câte unul și verifică rezultatul.'],
    ['O rețetă simplă, fără foc, de exemplu un sandviș, și un adult alături.', 'Citiți împreună pașii și puneți un deget pe pasul la care ați ajuns.', 'Schimbați ordinea a doi pași și discutați ce s-ar întâmpla.'],
    'Ordinea în care sunt scriși pașii nu este mereu ordinea în care îi facem: „Înainte să pleci, închide fereastra.” cere mai întâi închiderea ferestrei.',
    Content.sequence([
      [O('Citește: „Mai întâi ia pensula. Apoi pictează.” Pune pașii în ordine.', ['Iau pensula', 'Pictez'], '„Mai întâi” arată primul pas.'),
        O('Citește: „Mai întâi deschide cartea. Apoi citește prima pagină.” Pune pașii în ordine.', ['Deschid cartea', 'Citesc prima pagină'], 'Nu putem citi pagina înainte să deschidem cartea.'),
        O('Citește: „Pune pasta pe periuță. Apoi spală-te pe dinți.” Pune pașii în ordine.', ['Pun pasta pe periuță', 'Mă spăl pe dinți'], '„Apoi” arată al doilea pas.'),
        O('Citește: „Mai întâi udă floarea. La final, pune ghiveciul la soare.” Pune pașii în ordine.', ['Ud floarea', 'Pun ghiveciul la soare'], '„La final” arată ultimul pas.')],
      [O('Citește: „Mai întâi spală-te pe mâini. Apoi ia o farfurie. La final, pune fructele în ea.” Pune pașii în ordine.', ['Mă spăl pe mâini', 'Iau o farfurie', 'Pun fructele'], 'Cuvintele de ordine arată pașii: mai întâi, apoi, la final.'),
        O('Citește: „Ia o foaie. Apoi îndoaie-o în două. La final, desenează o inimă pe ea.” Pune pașii în ordine.', ['Iau o foaie', 'Îndoi foaia', 'Desenez o inimă'], 'Fără foaie nu avem ce îndoi; desenul vine la final.'),
        O('Citește: „Mai întâi pune pământ în ghiveci. Apoi pune sămânța. La final, udă.” Pune pașii în ordine.', ['Pun pământ', 'Pun sămânța', 'Ud'], 'Sămânța stă în pământ, iar udatul vine la final.'),
        O('Citește: „Îmbracă-te. Apoi încalță-te. La final, ia ghiozdanul.” Pune pașii în ordine.', ['Mă îmbrac', 'Mă încalț', 'Iau ghiozdanul'], 'Pașii sunt scriși în ordinea în care îi facem.')],
      [O('Citește: „Înainte să pleci, închide fereastra.” Pune pașii în ordine.', ['Închid fereastra', 'Plec'], '„Înainte să pleci” înseamnă că fereastra se închide mai întâi.'),
        O('Citește: „După ce termini desenul, strânge creioanele.” Pune pașii în ordine.', ['Termin desenul', 'Strâng creioanele'], '„După ce” arată că desenul vine primul.'),
        O('Citește: „Ia un pahar. Înainte să torni apa, verifică dacă paharul e curat. Apoi bea.” Pune pașii în ordine.', ['Iau un pahar', 'Verific paharul', 'Torn apa', 'Beau'], '„Înainte să torni” pune verificarea înaintea turnării.'),
        O('Citește: „Pune ghetele lângă ușă după ce le cureți. Mai întâi, scoate-le din picioare.” Pune pașii în ordine.', ['Scot ghetele', 'Curăț ghetele', 'Le pun lângă ușă'], '„Mai întâi” arată primul pas, iar „după ce le cureți” pune curățatul înainte de așezarea lângă ușă.')]
    ], [3, 3, 3]), 'Ce cuvinte te-au ajutat să găsești ordinea?'),
  L('lim', 14, 'Descriem o imagine', '🖼️',
    'Să aleagă și să formuleze propoziții care descriu o imagine',
    'Când descriem o imagine, spunem ce vedem: cine apare, ce face, unde este și cum arată. Folosim cuvinte care arată culoarea, mărimea sau numărul.',
    'Pentru o imagine cu o pisică pe o pernă putem spune: „O pisică doarme pe o pernă.” Nu spunem ce nu se vede, de exemplu cum o cheamă.',
    ['Privește imaginea cu atenție.', 'Spune cine sau ce apare și ce face.', 'Verifică: tot ce ai spus se vede în imagine?'],
    ['O ilustrație dintr-o carte sau o fotografie de familie.', 'Spuneți pe rând câte o propoziție despre imagine.', 'Adultul spune o propoziție cu o greșeală, iar copilul o găsește.'],
    'Ce vedem și ce ne închipuim sunt lucruri diferite. „Câinele aleargă” se vede; „câinele e flămând” poate fi doar o presupunere.',
    Content.quiz([
      [P('Ce enunț descrie imaginea?', '🍎 🍎 🍎', ['Sunt trei mere.', 'Sunt două mere.', 'Este o pară.'], 0, 'Numărăm: în imagine sunt trei mere.'),
        P('Ce enunț descrie această imagine?', '🐶 ⚽', ['Un câine și o minge.', 'O pisică și o minge.', 'Un câine și o carte.'], 0, 'Vedem un câine și o minge.'),
        P('Ce se vede în imagine?', '☀️ 🌳', ['Un soare și un copac.', 'O lună și un copac.', 'Un soare și o floare.'], 0, 'Vedem soarele și un copac.'),
        P('Ce enunț descrie peștii din imagine?', '🐟 🐟', ['Sunt doi pești.', 'Sunt trei pești.', 'Sunt doi câini.'], 0, 'Numărăm: doi pești.'),
        P('Ce vehicule se văd în imagine?', '🚗 🚲', ['O mașină și o bicicletă.', 'Două mașini.', 'O mașină și un tren.'], 0, 'Vedem o mașină și o bicicletă.'),
        P('Ce vreme arată imaginea?', '🌧️ ☂️', ['Plouă și avem o umbrelă.', 'Ninge și avem o umbrelă.', 'E soare și avem o pălărie.'], 0, 'Norul cu picături arată ploaia; lângă el este o umbrelă.')],
      [P('Ce enunț descrie cercurile?', '🔴 🔵 🔵', ['Un cerc roșu și două albastre.', 'Două cercuri roșii și unul albastru.', 'Trei cercuri albastre.'], 0, 'Numărăm pe culori: unul roșu, două albastre.'),
        P('Ce enunț descrie mărimea animalelor?', '🐘 🐭', ['Un elefant mare și un șoarece mic.', 'Un elefant mic și un șoarece mare.', 'Doi elefanți mari.'], 0, 'Elefantul este mare, iar șoarecele este mic.'),
        P('Ce se vede pe cer?', '⭐ ⭐ ⭐ 🌙', ['Trei stele și o lună.', 'O stea și trei luni.', 'Patru stele.'], 0, 'Numărăm stelele: trei. Luna este una.'),
        P('Ce enunț descrie imaginea cu broasca?', '🐸 🍃', ['O broască și o frunză.', 'O broască și o floare.', 'Un pește și o frunză.'], 0, 'Vedem o broască și o frunză verde.'),
        P('Ce face copilul din imagine?', '🧒 📖', ['Citește o carte.', 'Desenează o casă.', 'Mănâncă un măr.'], 0, 'Lângă copil este o carte deschisă.')],
      [P('Ce putem spune sigur despre câine?', '🐕 🦴', ['Câinele are un os.', 'Câinele e flămând.', 'Câinele se numește Rex.'], 0, 'Osul se vede. Foamea și numele nu se văd.'),
        P('Ce putem spune sigur despre fată?', '👧 🎈', ['Fata are un balon.', 'Fata are ziua ei.', 'Fata e sora lui Dan.'], 0, 'Balonul se vede. Ziua de naștere și frații nu se văd.'),
        P('Ce putem spune sigur despre casă?', '🏠 🌙', ['Lângă casă se vede luna.', 'În casă toți dorm.', 'Casa este a bunicii.'], 0, 'Luna se vede. Ce e în casă și al cui e casa nu se văd.'),
        P('Care enunț este o presupunere, nu ceva ce se vede?', '🐈 🥛', ['Pisicii îi place laptele.', 'Lângă pisică este lapte.', 'În imagine este o pisică.'], 0, 'Laptele și pisica se văd; ce îi place pisicii nu se vede.'),
        P('Care enunț adaugă un detaliu care se vede?', '🌳 🍎 🍎', ['Sunt două mere.', 'Copacul e bătrân.', 'Merele sunt dulci.'], 0, 'Merele se văd și le putem număra. Vârsta copacului și gustul nu se văd.')]
    ], [4, 4, 4]), 'Ce ai văzut sigur și ce ai presupus?'),

  L('log', 1, 'Tipare și secvențe', '🔁',
    'Să identifice regula și să continue un tipar',
    'Un tipar repetă o grupă sau urmează o regulă de transformare. Căutăm ce rămâne la fel și ce se schimbă.',
    'În roșu–albastru–roșu–albastru se repetă o grupă de două culori. În 2, 4, 6, 8 adăugăm de fiecare dată 2.',
    ['Privește cel puțin două repetări.', 'Spune regula în cuvinte.', 'Aplică regula și verifică toate elementele.'],
    ['Mărgele mari sau capace de două culori.', 'Construiește un tipar și ascunde un element.', 'Lasă partenerul să-l completeze și să explice regula.'],
    'Nu alegem doar o culoare care ne place. Verificăm dacă regula se potrivește cu tot șirul dat. Dacă găsești altă regulă, arată cum funcționează.',
    Content.task('matrix', 'sequence'), 'Cum verifici dacă regula se potrivește cu tot șirul?'),
  L('log', 2, 'Ghici figura', '🕵️',
    'Să elimine variante folosind mai multe indicii',
    'Un indiciu reduce numărul de variante. Combinăm toate indiciile, nu ne oprim la primul care se potrivește.',
    'Forma are patru laturi, toate egale, și patru unghiuri drepte: este un pătrat. Patru laturi singure nu sunt suficiente.',
    ['Citește primul indiciu.', 'Elimină variantele nepotrivite.', 'Verifică indiciul următor pe variantele rămase.'],
    ['Forme decupate de culori și mărimi diferite.', 'Alege în secret o formă.', 'Oferă indicii despre proprietăți până când rămâne o singură variantă.'],
    'Mărimea și culoarea nu ne spun singure numele geometric al formei.',
    Content.task('shapes', 'riddle'), 'Ce indiciu deosebește pătratul de un dreptunghi cu laturi alăturate diferite?'),
  L('log', 3, 'Joc de memorie', '🧠',
    'Să folosească o strategie pentru a găsi perechi',
    'Memoria poate fi sprijinită prin atenție și organizare. Reținem poziția unui cartonaș în raport cu rândul și coloana.',
    'Dacă ai văzut un măr în colțul din stânga sus, numește locul. Când apare al doilea măr, revino la poziția reținută.',
    ['Întoarce două cartonașe.', 'Numește obiectele și locurile.', 'Folosește informația la următoarea încercare.'],
    ['Perechi de cartonașe cu desene.', 'Începe cu trei perechi.', 'După joc, discută o strategie care te-a ajutat.'],
    'Dacă nu îți amintești locul unui cartonaș, mai poți încerca. Privește din nou și numește locul ca să îl reții mai ușor. Nu trebuie să te grăbești.',
    Content.task('memory', 'pairs'), 'Cum te ajută să numești locul unui cartonaș?'),
  L('log', 4, 'Sortare și clasificare', '🗂️',
    'Să clasifice obiecte după unul sau două criterii',
    'Un criteriu este regula după care grupăm. Pentru două criterii verificăm ambele proprietăți: de exemplu, culoarea și forma.',
    'Dacă grupa cere „roșu și triunghi”, un triunghi roșu se potrivește. Un cerc roșu nu se potrivește: are culoarea cerută, dar nu și forma.',
    ['Spune regula de sortare.', 'Verifică fiecare proprietate.', 'Controlează dacă toate obiectele dintr-o grupă respectă aceeași regulă.'],
    ['Capace, forme de hârtie și cercuri desenate pe o foaie.', 'Sortează după culoare.', 'Schimbă regula: sortează după culoare și formă.'],
    'Un obiect are mai multe însușiri, cum ar fi forma și culoarea. Poate ajunge în altă grupă când schimbăm regula de sortare.',
    Content.task('matrix', 'classification'), 'Cum se schimbă grupele când schimbi criteriul?'),
  L('log', 5, 'Probleme logice', '💡',
    'Să deducă un răspuns și să justifice eliminarea variantelor',
    'Într-o problemă logică folosim doar informațiile date. O presupunere trebuie verificată cu fiecare indiciu.',
    'Sunt trei cutii: roșie, verde și albastră. Bila nu este în cea roșie și nici în cea verde. Dacă este într-una dintre cele trei, rămâne cea albastră.',
    ['Enumeră variantele.', 'Taie variantele excluse de indicii.', 'Verifică răspunsul rămas cu toate informațiile.'],
    ['Trei pahare opace și o bilă mare.', 'Ascunde bila și oferă două indicii clare.', 'Cere partenerului să spună de ce a eliminat fiecare pahar.'],
    'Nu orice problemă are destule indicii. Dacă rămân două variante posibile, cerem o informație în plus.',
    Content.quiz([
      [Q('Bila este într-o cutie roșie sau verde. Nu este în cea verde. Unde este?', ['În cea roșie', 'În cea verde', 'Nu este în nicio cutie'], 0, 'Din două variante, indiciul o exclude pe cea verde.')],
      [Q('Ana este înaintea lui Dan, iar Dan înaintea Liei. Cine este primul?', ['Ana', 'Dan', 'Lia'], 0, 'Ordinea este Ana, Dan, Lia.')],
      [Q('Bila este în cutia roșie, verde sau albastră. Nu este în cea roșie. Putem ști exact unde este?', ['Nu, mai trebuie un indiciu', 'Da, în cea verde', 'Da, în cea albastră'], 0, 'Au rămas două variante. Nu avem suficiente informații pentru una singură.')]
    ]), 'Când este corect să spui că nu ai suficiente informații?'),
  L('log', 6, 'Puzzle din jurul tău', '🧩',
    'Să combine două reguli pentru a completa o matrice',
    'O matrice este un tabel cu piese așezate pe rânduri și coloane. Rândurile merg de la stânga la dreapta, iar coloanele de sus în jos. Piesa lipsă trebuie să respecte și regula rândului, și regula coloanei.',
    'Dacă fiecare rând păstrează forma și fiecare coloană păstrează culoarea, piesa lipsă primește forma rândului și culoarea coloanei.',
    ['Privește un rând complet.', 'Verifică și o coloană completă.', 'Alege piesa care respectă ambele reguli.'],
    ['Nouă cartonașe: câte un cerc, un pătrat și un triunghi din fiecare dintre trei culori.', 'Așază-le într-un tabel cu trei rânduri și trei coloane: aceeași formă pe fiecare rând și aceeași culoare pe fiecare coloană.', 'Scoate o piesă și găsește-i locul folosind rândul și coloana.'],
    'O piesă care se potrivește doar pe rând poate fi greșită pe coloană.',
    Content.task('matrix', 'grid'), 'Cum verifici piesa în două direcții?'),
  L('log', 7, 'Ce vine mai departe?', '🔮',
    'Să distingă repetarea de creșterea unei secvențe',
    'Unele șiruri repetă același grup de forme sau numere. În altele, numerele ori grupurile de obiecte cresc după o regulă. Ne întrebăm: „Ce se întâmplă de la un pas la următorul?”',
    'În 3, 6, 9, 12 adăugăm 3. În cerc, cerc, pătrat, cerc, cerc, pătrat se repetă o grupă de trei forme.',
    ['Compară două elemente vecine.', 'Verifică aceeași schimbare la următoarea pereche.', 'Spune următorul element și regula.'],
    ['Cuburi și cartonașe cu numere.', 'Construiește turnuri care cresc cu două cuburi.', 'Desenează turnul următor înainte să-l construiești.'],
    'O regulă bazată pe un singur pas poate fi întâmplătoare. Verificăm mai multe treceri.',
    Content.task('matrix', 'growth'), 'Ce se repetă: obiectele sau schimbarea?'),
  L('log', 8, 'Trasee cu restricții', '🧭',
    'Să planifice un traseu care evită obstacole',
    'Un traseu este un drum alcătuit din mai mulți pași. Înainte de pornire observăm locul de plecare, locul unde vrem să ajungem și obstacolele pe care trebuie să le ocolim.',
    'Ținta este la două căsuțe spre dreapta, iar căsuța dintre noi și țintă este blocată. Dacă celelalte căsuțe sunt libere, putem ocoli: jos, dreapta, dreapta, sus. Verificăm fiecare pas.',
    ['Găsește plecarea și ținta.', 'Marchează obstacolele.', 'Planifică și testează câte o deplasare.'],
    ['O grilă desenată și un pion.', 'Pune un obstacol între pion și țintă.', 'Găsește două trasee sigure și compară lungimile.'],
    'Un drum mai scurt nu este o soluție dacă trece printr-un obstacol.',
    Content.task('robot', 'route'), 'Cum compari două trasee corecte?'),
  L('log', 9, 'Matrice de forme', '🔲',
    'Să combine forma, culoarea și poziția',
    'Un tabel ne ajută să grupăm piesele după două proprietăți, cum ar fi forma și culoarea. Eticheta de la începutul rândului arată forma, iar cea de deasupra coloanei arată culoarea. Aceste etichete se numesc antete.',
    'La intersecția rândului „triunghi” cu coloana „albastru” punem un triunghi albastru.',
    ['Citește proprietatea rândului.', 'Citește proprietatea coloanei.', 'Combină-le și verifică vecinii.'],
    ['Forme colorate și o foaie împărțită în pătrate.', 'Completează un tabel după două criterii.', 'Schimbă antetele și reașază piesele.'],
    'Poziția unei piese nu este aleasă la întâmplare: trebuie să respecte ambele antete.',
    Content.task('matrix', 'grid'), 'Ce două informații îți spune poziția?'),
  L('log', 10, 'Detectivul indiciilor', '🔍',
    'Să deosebească un fapt de o presupunere',
    'Un fapt este susținut de observații sau de text. O presupunere poate fi posibilă, dar nu este sigură. Un indiciu nou ne poate schimba concluzia.',
    'Pe jos este ud. Poate a plouat, dar poate cineva a udat plantele. Avem nevoie de alte indicii înainte să alegem explicația.',
    ['Spune ce observi sigur.', 'Enumeră două explicații posibile.', 'Caută indiciul care le poate deosebi.'],
    ['O imagine cu o scenă și o foaie cu două coloane.', 'Scrie sau desenează ce vezi sigur.', 'Separă presupunerile și caută întrebări de verificare.'],
    '„Se poate” nu înseamnă „este sigur”. Este în regulă să schimbi o concluzie când apar dovezi noi.',
    Content.task('reading', 'clues'), 'Ce informație te-ar face să-ți schimbi părerea?'),

  L('log', 11, 'Ce observ și ce presupun?', '🔎',
    'Să deosebească o observație de o explicație încă neverificată',
    'O observație spune ce am văzut, auzit, numărat sau măsurat într-o situație. O presupunere este o idee despre ce s-ar putea întâmpla sau de ce s-a întâmplat ceva. Poate fi bună, dar o verificăm înainte să o numim sigură. Putem spune „Nu știu încă”.',
    'Lia vede un pahar culcat și apă pe masă. Spune: „Paharul este culcat.” Aceasta este observația. „Pisica l-a răsturnat” este o presupunere: Lia nu a văzut cine l-a atins. Apa și paharul nu arată singure cine l-a răsturnat.',
    ['Desenează paharul culcat și apa, fără să adaugi un vinovat.', 'Spune ce vede Lia și două explicații posibile pentru paharul culcat.', 'Întreabă ce informație lipsește. Dacă nu o ai, spune „Nu știu încă cine l-a răsturnat”.'],
    ['O foaie și creioane; desenează apa, nu o vărsa.', 'Un partener descrie desenul, iar tu spui dacă a numit ceva vizibil sau a adăugat o explicație.', 'Schimbați rolurile și inventați o întrebare care ar ajuta la verificare.'],
    'Un indiciu nu arată mereu o singură explicație. Nu acuzăm o persoană doar pentru că era în apropiere. Și o observație poate fi verificată din nou dacă nu am văzut bine.',
    Content.quiz([
      [
        Q('Lia vede un pahar culcat și apă pe masă. Ce este observat în poveste?', ['Pisica a răsturnat paharul', 'Paharul este culcat', 'Cineva a vrut să facă rău'], 1, 'Povestea spune că Lia vede paharul culcat. Nu spune cine l-a răsturnat.'),
        Q('Teo vede pământ ud într-un ghiveci. Nu a văzut cine l-a udat. Ce poate spune sigur din această observație?', ['Bunicul l-a udat', 'A plouat în cameră', 'Pământul este ud'], 2, 'Ud este pământul observat; persoana sau cauza nu sunt încă stabilite.'),
        Q('Mara aude un clopoțel după ușă, dar nu vede cine este acolo. Ce nu știe încă?', ['Cine a sunat', 'Că a auzit un sunet', 'Că în poveste există o ușă'], 0, 'Sunetul nu identifică singur persoana care a sunat.')
      ],
      [
        Q('Pe podea sunt urme de noroi. Ina spune: „Dan le-a făcut”, fiindcă Dan stă lângă ușă. Ce lipsește?', ['Un ton mai hotărât', 'O informație care leagă urmele de Dan', 'Mai mulți copii care repetă acuzația'], 1, 'A fi lângă ușă nu dovedește că Dan a făcut urmele. Nu îl acuzăm doar din acest motiv.'),
        Q('Un desen are o pată albastră. Două explicații sunt: a curs carioca sau a căzut o picătură de vopsea. Ce ajută?', ['Alegem explicația preferată', 'Spunem că ambele sunt sigur adevărate', 'Căutăm informații despre cum a apărut pata'], 2, 'Explicațiile sunt posibile; informații despre apariția petei ne pot ajuta să le deosebim.'),
        Q('O cutie închisă face zgomot când este mișcată. Aflăm sigur culoarea obiectului dinăuntru?', ['Nu, sunetul nu ne spune culoarea', 'Da, este roșu', 'Da, dacă ascultăm cu atenție'], 0, 'Acest indiciu nu spune culoarea. Putem lăsa întrebarea fără răspuns până avem alte informații.')
      ],
      [
        Q('Lia observă trei scaune goale și spune: „Toți copiii au plecat acasă.” Nu a verificat celelalte camere. Ce concluzie este susținută?', ['Toți copiii au plecat sigur acasă', 'Trei scaune sunt goale; restul nu știm', 'Niciun copil nu a venit azi la școală'], 1, 'Observația privește trei scaune, nu toate locurile în care pot fi copiii.'),
        Q('Teo crede că ploaia a udat aleea. Apoi vede că aleea este sub un acoperiș și un adult folosește un furtun acolo. Ce este potrivit?', ['Să ignore furtunul pe care l-a văzut', 'Să spună sigur că a fost ploaia', 'Să verifice dacă furtunul a udat aleea'], 2, 'Informația nouă oferă o altă explicație. Teo poate verifica fără să rămână legat de prima idee.'),
        Q('Nimeni din poveste nu a văzut cum s-a rupt foaia. Ce răspuns este cinstit?', ['„Nu știm încă cine sau ce a rupt-o.”', '„Sigur a rupt-o cel mai mic copil.”', '„Cine vorbește primul are dreptate.”'], 0, 'Lipsa informației nu trebuie umplută cu o acuzație. „Nu știm încă” este un răspuns potrivit.')
      ]
    ]), 'Ce întrebare ar ajuta-o pe Lia să verifice o explicație fără să acuze pe cineva?'),
  L('log', 12, 'Fapt sau preferință?', '💭',
    'Să deosebească o afirmație verificabilă de o preferință personală',
    'Unele afirmații pot fi verificate: numărăm, măsurăm sau căutăm informații potrivite. Ele pot fi adevărate sau greșite. Preferințele spun ce îi place cuiva; oamenii pot avea preferințe diferite fără ca unul să greșească. Faptul că mie îmi place ceva nu dovedește că le place tuturor.',
    'Pe masă sunt patru creioane. „Sunt patru creioane” poate fi verificat prin numărare. „Îmi place cel verde” spune preferința Inei. Dan îl poate prefera pe cel roșu. Niciunul nu trebuie să își schimbe gustul ca să fie prieteni.',
    ['Desenează patru creioane și verifică numărul atingându-le pe rând.', 'Pune două personaje să aleagă culori preferate diferite.', 'Spune ce ați verificat prin numărare și ce a fost o alegere personală.'],
    ['Patru creioane sau patru creioane desenate și două personaje de hârtie.', 'Un personaj spune numărul creioanelor, iar celălalt spune ce culoare preferă.', 'Inventați o propoziție cu ambele: „Sunt patru creioane și mie îmi place cel verde”. Despărțiți cele două idei.'],
    'O afirmație verificabilă nu este automat adevărată: „Sunt cinci creioane” poate fi greșit. Nu votăm ce culoare ar trebui să îi placă fiecăruia.',
    Content.quiz([
      [
        Q('Care propoziție se poate verifica prin numărare?', ['„Mie îmi plac merele.”', '„În coș sunt trei mere.”', '„Prefer perele.”'], 1, 'Numărând merele verificăm afirmația despre cantitate.'),
        Q('Ina spune: „Îmi place verdele.” Dan preferă roșul. Cine trebuie să aibă gustul celuilalt?', ['Ina trebuie să prefere roșul', 'Dan trebuie să prefere verdele', 'Niciunul; pot prefera culori diferite'], 2, 'O preferință nu este o problemă cu un singur răspuns corect.'),
        Q('Care propoziție arată o preferință?', ['„Prefer povestea cu vulpea.”', '„Cartea are zece pagini.”', '„Pe copertă este o vulpe.”'], 0, 'Cuvântul „prefer” spune ce îi place vorbitorului.')
      ],
      [
        Q('În desen sunt patru creioane. Un adult spune că sunt cinci. Este afirmația corectă doar pentru că o spune adultul?', ['Da, adulții au mereu dreptate la numărat', 'Nu; numărăm creioanele și putem corecta afirmația', 'Nu avem voie să numărăm noi creioanele'], 1, 'Și adulții pot greși. Numărarea verifică afirmația, fără să jignească persoana.'),
        Q('Mara spune: „Cartea are opt pagini și este preferata mea.” Ce parte verificăm prin numărare?', ['Că este preferata tuturor', 'Că trebuie să ne placă și nouă', 'Că are opt pagini'], 2, 'Numărul paginilor se verifică; preferința Marei este despre ce îi place ei.'),
        Q('Lui Dan îi place un joc. Ce poate spune fără să ghicească gusturile tuturor?', ['„Mie îmi place acest joc.”', '„Tuturor trebuie să le placă.”', '„Cine nu îl preferă greșește.”'], 0, 'Dan își cunoaște preferința, dar nu poate hotărî preferințele altor persoane.')
      ],
      [
        Q('Cinci copii preferă cercurile, iar doi preferă pătratele. Ce aflăm din vot?', ['Cercurile sunt forma corectă pentru toți', 'Aici, mai mulți copii au ales cercurile', 'Pătratele sunt o alegere greșită pentru toți'], 1, 'Votul descrie alegerile grupului. Nu transformă o preferință într-un adevăr pentru toți.'),
        Q('Pe un afiș scrie: „Cel mai frumos caiet are 20 de foi.” Ce verificăm direct numărând?', ['Că este cel mai frumos pentru oricine', 'Că trebuie să îl cumpărăm', 'Dacă are 20 de foi'], 2, 'Numărul foilor este verificabil. „Cel mai frumos” depinde de gusturi și nu este dovedit prin numărare.'),
        Q('Două persoane nu sunt de acord dacă o panglică măsoară 10 cm. Este doar o diferență de gust?', ['Nu; o pot măsura la fel amândoi', 'Da; fiecare lungime este corectă dacă îi place', 'Da; o lungime nu se poate verifica deloc'], 0, 'Lungimea poate fi verificată prin măsurare. Nu toate dezacordurile sunt despre preferințe.')
      ]
    ]), 'Poți inventa o propoziție care conține și ceva verificabil, și o preferință?'),
  L('log', 13, 'Ce dovezi avem?', '⚖️',
    'Să aleagă dovezi potrivite și să recunoască ce nu arată ele',
    'O dovadă este o informație care ne ajută să verificăm o afirmație. O dovadă bună are legătură cu întrebarea. Dacă vrem să comparăm lungimi, măsurăm, nu alegem obiectul cu o culoare preferată. O singură încercare nu arată automat ce se întâmplă mereu.',
    'Mara spune că panglica albastră este mai lungă. Dan spune că cea roșie este mai lungă. Le așază de la același reper și le măsoară cu aceeași riglă: albastra are 8 cm, roșia 11 cm. Aceste măsurători susțin că panglica roșie este mai lungă.',
    ['Desenează două panglici cu capetele de început aliniate.', 'Compară 8 cm cu 11 cm și spune ce măsurătoare susține răspunsul.', 'Întreabă dacă preferința pentru albastru ar schimba lungimea. Explică de ce nu.'],
    ['Două benzi de hârtie pregătite de un adult și o riglă, fără foarfecă în joc.', 'Spune care bandă crezi că este mai lungă, apoi măsoară-le pornind de la același reper.', 'Arată numerele care îți susțin concluzia. Repetați măsurarea dacă citirile diferă.'],
    'Mai mulți oameni care repetă aceeași afirmație nu înlocuiesc verificarea. O dovadă poate susține o concluzie limitată, fără să dovedească o regulă despre toate obiectele.',
    Content.quiz([
      [
        Q('Vrei să afli care panglică este mai lungă. Ce ajută direct?', ['Culoarea preferată a unui coleg', 'Măsurarea ambelor cu aceeași unitate', 'Cine vorbește mai tare'], 1, 'Măsurarea răspunde întrebării despre lungime.'),
        Q('Vrei să verifici câte cuburi sunt într-o cutie deschisă. Ce faci?', ['Întrebi care cub este mai frumos', 'Ghicești după culoarea cutiei', 'Numeri cuburile, fiecare o singură dată'], 2, 'Numărarea verifică afirmația despre cantitate.'),
        Q('Un copil spune: „Panglica mea este mai lungă pentru că este verde.” Ce lipsește?', ['O comparație a lungimilor', 'O culoare și mai frumoasă', 'Un număr mai mare de prieteni'], 0, 'Culoarea nu arată lungimea. Trebuie comparate sau măsurate panglicile.')
      ],
      [
        Q('Panglica roșie are 11 cm, iar albastra 8 cm, măsurate corect. Ce susține concluzia că roșia este mai lungă?', ['Roșul este culoarea preferată a clasei', '11 cm sunt mai mult decât 8', 'Mara a ales-o prima dintre panglici'], 1, 'Comparația folosește măsurători în aceeași unitate.'),
        Q('Patru copii spun că într-o cutie sunt șase bile. Toți au repetat ce a ghicit primul copil, fără să deschidă cutia. Avem patru numărări?', ['Da, câte una pentru fiecare voce', 'Da, dacă sunt prieteni', 'Nu; este aceeași ghicire repetată'], 2, 'Repetarea unei informații nu este o nouă verificare independentă.'),
        Q('Teo și Ina obțin lungimi diferite pentru aceeași bandă. Ce verifică mai întâi?', ['Dacă au pornit de la același capăt', 'Care dintre ei este mai mare de vârstă', 'Cine a terminat primul de măsurat'], 0, 'Metoda poate explica diferența; vârsta sau viteza nu decid lungimea.')
      ],
      [
        Q('O mașinuță merge mai departe pe o rampă. În a doua încercare, copilul schimbă și rampa, și mașinuța. Știe sigur că numai rampa a făcut diferența?', ['Da, fiindcă a doua distanță este mai mare', 'Nu; a schimbat două lucruri deodată', 'Da, dacă îi place a doua rampă'], 1, 'Nu putem izola efectul rampei dacă s-a schimbat și mașinuța.'),
        Q('Trei semințe dintr-un pahar au încolțit. Ce putem spune numai din această observație?', ['Toate semințele din lume încolțesc mereu', 'Nicio altă sămânță nu are nevoie de apă', 'Aceste trei semințe au încolțit în condițiile observate'], 2, 'Observația susține concluzia despre semințele urmărite, nu o promisiune despre toate semințele.'),
        Q('Două măsurători atente arată același rezultat, dar un afiș fără explicații spune altceva. Ce este mai potrivit?', ['Verificăm cum a aflat afișul, apoi decidem', 'Să alegem automat afișul fiindcă este mare', 'Să ignorăm cele două măsurători atente'], 0, 'Comparăm cum au fost obținute informațiile. Aspectul afișului nu dovedește afirmația.')
      ]
    ]), 'Ce dovadă ai căuta ca să verifici o afirmație despre un număr de obiecte? Dar despre lungime?'),
  L('log', 14, 'De unde vine informația?', '📚',
    'Să întrebe cine oferă informația, când și cum a fost verificată',
    'Sursa este locul sau persoana de la care primim o informație: o carte, un anunț, un martor sau o pagină. Întrebăm cine spune, despre ce situație vorbește și cum a aflat. O informație poate fi veche, copiată sau greșită. Verificăm cu un adult de încredere în surse potrivite, fără să credem că o singură persoană are mereu dreptate.',
    'Ina găsește un afiș vechi: „Biblioteca este deschisă sâmbătă.” Programul de săptămâna aceasta, primit de la bibliotecă, spune că sâmbătă este închisă pentru reparații. Ina compară data și întreabă un bibliotecar despre ziua în care vrea să meargă.',
    ['Desenează un afiș vechi și un program pentru săptămâna aceasta.', 'Spune de unde vine fiecare informație și pentru ce perioadă este valabilă.', 'Formulează întrebarea: „Care este programul pentru sâmbăta aceasta și unde îl putem verifica?”'],
    ['Două anunțuri inventate de un adult, pe hârtie, cu date și programe diferite.', 'Joacă rolul cititorului care compară data, autorul și ziua despre care întreabă.', 'Cere o confirmare pentru ziua aleasă. Folosiți doar cartonașele; nu este nevoie să cauți singur pe internet.'],
    'Un mesaj repetat pe mai multe pagini poate veni din aceeași sursă. Multe aprecieri, o voce sigură sau un răspuns al unui program nu garantează că informația este corectă. Nu deschide linkuri necunoscute pentru a verifica singur.',
    Content.quiz([
      [
        Q('Un coleg spune că mâine biblioteca este închisă. Ce întrebare ajută?', ['„Cât de tare poți repeta?”', '„De unde ai aflat?”', '„Câți prieteni ai?”'], 1, 'Întrebarea caută sursa informației, nu popularitatea colegului.'),
        Q('Ai două programe ale bibliotecii: unul vechi și unul pentru săptămâna aceasta. Ce verifici pentru vizita de mâine?', ['Care hârtie are mai multe culori', 'Care titlu este mai mare', 'Programul pentru săptămâna aceasta'], 2, 'Data și perioada contează, fiindcă programul se poate schimba.'),
        Q('Primești un link necunoscut care promite răspunsul. Ce faci?', ['Nu îl deschid și întreb un adult', 'Îl deschid și îmi scriu adresa', 'Îl trimit tuturor ca fapt sigur'], 0, 'Verificarea informației trebuie să rămână sigură; nu dai date personale și nu deschizi singur linkuri necunoscute.')
      ],
      [
        Q('Două pagini au copiat același anunț vechi. Înseamnă că biblioteca a confirmat de două ori programul de azi?', ['Da, două pagini înseamnă două confirmări', 'Nu; ambele pot repeta aceeași informație veche', 'Da, dacă au multe aprecieri și comentarii'], 1, 'Trebuie urmărite sursa și data; copiile nu sunt confirmări separate.'),
        Q('Un coleg a fost ieri la bibliotecă. Despre ce poate povesti direct?', ['Despre toate bibliotecile din țară', 'Despre orice zi din anul viitor', 'Despre ce a observat acolo ieri'], 2, 'Experiența directă privește locul și momentul observate; nu garantează programul viitor.'),
        Q('Un adult nu își amintește programul și spune: „Cred că deschide la zece.” Cum continuăm?', ['Verificăm împreună programul actual sau întrebăm la bibliotecă', 'Tratăm amintirea ca dovadă sigură', 'Îi spunem că nu va mai avea dreptate'], 0, 'Un adult poate fi nesigur sau poate greși. Verificăm afirmația, fără să atacăm persoana.')
      ],
      [
        Q('Un program de conversație spune un orar, dar nu arată de unde l-a luat. Este suficient pentru a porni la bibliotecă?', ['Da, un program nu poate greși', 'Nu; verificăm cu un adult programul actual', 'Da, dacă răspunsul pare politicos'], 1, 'Și programele pot produce informații greșite sau vechi. Felul politicos de a răspunde nu este o dovadă.'),
        Q('Anunțul actual al bibliotecii spune „închis pentru reparații”; o fotografie de anul trecut arată ușa deschisă. Ce este relevant pentru azi?', ['Fotografia veche, fiindcă are oameni', 'Numărul de aprecieri al fotografiei', 'Anunțul actual al bibliotecii'], 2, 'Fotografia poate arăta corect trecutul fără să arate programul de azi.'),
        Q('Două surse dau informații diferite și nu poți afla încă data uneia. Ce poți spune?', ['„Nu am verificat încă suficient.”', '„Aleg ce îmi place și spun că e dovedit.”', '„Ambele sunt sigur false, deci nu contează.”'], 0, 'Un dezacord între surse cere verificare. Nu este nevoie să inventăm certitudine.')
      ]
    ]), 'Ce ai întreba despre o informație înainte să o spui mai departe ca sigură?'),

  L('inf', 1, 'Ce este un calculator?', '💻',
    'Să deosebească introducerea datelor, prelucrarea lor și prezentarea rezultatelor',
    'Calculatorul primește informații, numite date, urmează instrucțiunile unui program și arată rezultate. Prin tastatură introducem litere, iar prin microfon sunete: acestea sunt intrări. Programul folosește datele: aceasta este prelucrarea. Ecranul arată imagini, iar difuzoarele redau sunete: acestea sunt ieșiri.',
    'Într-un program de scris, apeși tasta A: calculatorul primește comanda de la tastatură. Programul o folosește pentru a afișa litera pe ecran.',
    ['Găsește dispozitivul prin care introduci informația.', 'Spune ce face programul cu informația, ca în exemplul tastei A.', 'Observă unde apare rezultatul.'],
    ['Cartonașe cu tastatură, microfon, ecran și difuzor.', 'Joacă rolurile de intrare, program și ieșire.', 'Schimbă un cartonaș și explică noul traseu.'],
    'Calculatorul nu gândește ca un om și nu știe automat ce dorești. Execută instrucțiuni și poate produce rezultate greșite dacă datele sau instrucțiunile sunt greșite.',
    Content.sorting([
      { zones: ['Introduc date', 'Prezintă rezultate'], rounds: 5, items: [{ label: 'Tastatură', zone: 0 }, { label: 'Mouse', zone: 0 }, { label: 'Ecran', zone: 1 }, { label: 'Difuzor', zone: 1 }, { label: 'Microfon', zone: 0 }, { label: 'Căști', zone: 1 }, { label: 'Imprimantă', zone: 1 }, { label: 'Joystick', zone: 0 }] },
      { zones: ['Intrare', 'Ieșire'], rounds: 5, items: [{ label: 'Microfon', zone: 0 }, { label: 'Cameră video', zone: 0 }, { label: 'Imprimantă', zone: 1 }, { label: 'Căști', zone: 1 }, { label: 'Scaner', zone: 0 }, { label: 'Proiector', zone: 1 }, { label: 'Telecomandă', zone: 0 }, { label: 'Ecranul ceasului inteligent', zone: 1 }] },
      { zones: ['Intrare', 'Prelucrare', 'Ieșire'], rounds: 5, items: [{ label: 'Apeși tasta A', zone: 0 }, { label: 'Programul calculează 4 + 3', zone: 1 }, { label: 'Ecranul arată 7', zone: 2 }, { label: 'Microfonul înregistrează vocea', zone: 0 }, { label: 'Difuzorul redă un sunet', zone: 2 }, { label: 'Atingi o imagine pe tabletă', zone: 0 }, { label: 'Programul sortează pozele după dată', zone: 1 }, { label: 'Imprimanta tipărește desenul', zone: 2 }, { label: 'Programul verifică parola', zone: 1 }] }
    ]), 'Ce se întâmplă între apăsarea tastei și apariția literei?'),
  L('inf', 2, 'Mouse-ul și tastatura', '⌨️',
    'Să aleagă o comandă potrivită și să folosească tastatura',
    'Când miști mouse-ul, se mișcă săgeata de pe ecran. Un clic înseamnă o apăsare scurtă pe un buton al mouse-ului, iar un dublu clic înseamnă două apăsări rapide. Efectul depinde de program. Cu tasta Tab alegem pe rând butoane, legături sau căsuțe de scris de pe ecran. Elementul ales pentru tastatură este „focalizat”.',
    'Pentru a apăsa un buton fără mouse, folosim Tab până când un contur sau alt semn vizibil arată că butonul este ales. Apoi apăsăm Enter sau Spațiu. Ca să revenim la elementul anterior, ținem apăsată tasta Shift și apăsăm Tab.',
    ['Găsește un buton folosind Tab.', 'Activează-l cu Enter.', 'Într-un câmp de text, folosește Spațiu între cuvinte și Backspace pentru corectare.'],
    ['O tastatură și o foaie cu taste desenate.', 'Găsește Tab, Enter, Spațiu și Backspace.', 'Exersează o navigare fără mouse, fără grabă.'],
    'Așază mâna confortabil pe mouse. De obicei apăsăm butonul principal cu arătătorul. Un adult te poate ajuta să adaptezi setările pentru mâna și nevoile tale.',
    Content.handsOn('device', 'practice', Content.quiz([
      [Q('Ce tastă lasă un spațiu între cuvinte?', ['Spațiu', 'Escape', 'Tab'], 0, 'Spațiu separă cuvintele când scriem.')],
      [Q('Ce tastă te ajută să alegi următorul buton al paginii fără mouse?', ['Tab', 'Backspace', 'Caps Lock'], 0, 'Tab trece pe rând la elementele paginii pe care le putem folosi cu tastatura.')],
      [Q('Ai trecut de butonul dorit. Cum revii prin tastatură?', ['Shift + Tab', 'Mai multe spații', 'Caps Lock'], 0, 'Shift + Tab mută focalizarea înapoi.')]
    ]), [3, 4, 4]), 'Cum observi ce buton este focalizat?'),
  L('inf', 3, 'Algoritmi simpli', '➡️',
    'Să construiască o succesiune de instrucțiuni clare',
    'Un algoritm este un șir de pași clari pentru a îndeplini o sarcină. Are un început și un sfârșit. Unii pași pot fi făcuți numai după alții: punem sămânța înainte să o acoperim cu pământ.',
    'Ca să plantăm o sămânță: punem pământul în ghiveci, facem o adâncitură, așezăm sămânța, o acoperim și udăm ușor.',
    ['Spune rezultatul dorit.', 'Alege primul pas posibil.', 'Execută fiecare pas și verifică rezultatul.'],
    ['Cartonașe cu pașii plantării și un ghiveci.', 'Pune pașii în ordine.', 'Cere unui partener să urmeze exact instrucțiunile.'],
    'Unele sarcini au mai multe ordini valide. În joc reconstruim ordinea indicată, iar în discuție putem compara alte variante.',
    Content.sequence([
      [O('Construiește drumul: dreapta, apoi jos.', ['Dreapta', 'Jos'], 'Robotul face pașii exact în ordinea cerută.'),
        O('Construiește drumul: jos, apoi stânga.', ['Jos', 'Stânga'], 'Primul pas este „jos”, al doilea „stânga”.'),
        O('Construiește drumul: sus, dreapta, jos.', ['Sus', 'Dreapta', 'Jos'], 'Trei comenzi, în ordinea scrisă.')],
      [O('Ordinea plantării: pregătire, sămânță, acoperire, udare.', ['Pun pământ', 'Așez sămânța', 'Acopăr', 'Ud ușor'], 'Sămânța are nevoie de pământ sub ea și deasupra; udăm la final.'),
        O('Algoritmul pentru un sandviș: iau pâinea, pun unt, pun brânză, închid.', ['Iau pâinea', 'Pun unt', 'Pun brânză', 'Închid sandvișul'], 'Fiecare pas folosește rezultatul pasului de dinainte.'),
        O('Algoritmul spălatului pe mâini: ud, pun săpun, frec, clătesc, șterg.', ['Ud mâinile', 'Pun săpun', 'Frec mâinile', 'Clătesc', 'Șterg mâinile'], 'Săpunul vine după udat, iar ștersul la final.')],
      [O('Reconstruiește: citesc cerința, planific, execut, verific, corectez.', ['Citesc', 'Planific', 'Execut', 'Verific', 'Corectez'], 'Verificarea vine după execuție, iar corectarea după verificare.'),
        O('Algoritmul pentru o carte de la bibliotecă: caut raftul, citesc titlurile, găsesc cartea, o împrumut.', ['Caut raftul', 'Citesc titlurile', 'Găsesc cartea', 'O împrumut'], 'Nu putem împrumuta cartea înainte să o găsim.'),
        O('Depanarea: rulez, observ greșeala, găsesc pasul, îl corectez, rulez din nou.', ['Rulez programul', 'Observ greșeala', 'Găsesc pasul greșit', 'Corectez pasul', 'Rulez din nou'], 'După corectare rulăm din nou, ca să verificăm.')]
    ], [2, 2, 2]), 'Ce pas depinde de un pas anterior?'),
  L('inf', 4, 'Gândim ca programatori', '🤖',
    'Să testeze și să repare un program de deplasare',
    'O eroare de program poate fi un pas lipsă, o comandă nepotrivită sau o ordine greșită. Testăm câte un pas și comparăm cu planul.',
    'Dacă robotul trebuie să ajungă două căsuțe la dreapta, programul „dreapta, jos” nu este potrivit. Schimbăm a doua comandă în „dreapta”.',
    ['Prezice unde va ajunge robotul.', 'Execută pe rând comenzile.', 'Găsește primul pas nepotrivit și reconstruiește programul.'],
    ['O grilă și săgeți decupate.', 'Scrie un traseu care conține intenționat o eroare.', 'Lasă partenerul să o găsească prin testare, nu prin ghicire.'],
    'Nu schimbăm toate comenzile odată. O schimbare mică ne ajută să înțelegem cauza erorii.',
    Content.task('robot', 'debug'), 'Cum găsești prima comandă care te abate de la traseu?'),
  L('inf', 5, 'Sortăm ca un computer', '🗃️',
    'Să clasifice date folosind o regulă clară',
    'Un program poate grupa date după o condiție. Regula trebuie să fie precisă, ca două persoane să poată obține aceeași grupare.',
    'Facem două grupe: „mai mic decât 10” și „10 sau mai mare”. Punem 9 în prima grupă și 10 în a doua. Un număr par se poate împărți în două grupe cu același număr de obiecte, fără rest; la un număr impar rămâne un obiect.',
    ['Citește regula celor două grupe.', 'Verifică unde pui chiar numărul 10.', 'Aplică aceeași regulă tuturor cartonașelor.'],
    ['Cartonașe cu numere de la 1 la 20.', 'Sortează după „mai mic decât 10”.', 'Schimbă regula în „cel mult 10” și observă ce se mută.'],
    '„Mai mic decât 10” nu îl include pe 10. „Cel mult 10” înseamnă 10 sau mai puțin, deci îl include și pe 10.',
    Content.sorting([
      { zones: ['Mai mic decât 10', 'Cel puțin 10'], rounds: 5, items: [{ label: '4', zone: 0 }, { label: '9', zone: 0 }, { label: '10', zone: 1 }, { label: '15', zone: 1 }, { label: '1', zone: 0 }, { label: '6', zone: 0 }, { label: '12', zone: 1 }, { label: '30', zone: 1 }] },
      { zones: ['Par', 'Impar'], rounds: 5, items: [{ label: '12', zone: 0 }, { label: '17', zone: 1 }, { label: '20', zone: 0 }, { label: '25', zone: 1 }, { label: '6', zone: 0 }, { label: '9', zone: 1 }, { label: '14', zone: 0 }, { label: '31', zone: 1 }] },
      { zones: ['Par și mai mare decât 10', 'Nu respectă ambele condiții'], rounds: 6, items: [{ label: '8', zone: 1 }, { label: '10', zone: 1 }, { label: '12', zone: 0 }, { label: '13', zone: 1 }, { label: '24', zone: 0 }, { label: '11', zone: 1 }, { label: '16', zone: 0 }, { label: '22', zone: 0 }, { label: '9', zone: 1 }, { label: '30', zone: 0 }] }
    ]), 'Cum verifici un număr aflat chiar la limita regulii?'),
  L('inf', 6, 'Algoritmul zilei mele', '🌤️',
    'Să distingă pașii obligatorii de alegerile unei rutine',
    'O rutină este un șir de activități pe care le facem des. Unii pași trebuie făcuți înaintea altora, dar pentru alte activități putem alege ordinea.',
    'Ne trezim înainte să plecăm la școală. Putem pregăti ghiozdanul seara sau dimineața: alegem o rutină care funcționează pentru noi.',
    ['Alege un scop al rutinei.', 'Găsește ce trebuie făcut înainte.', 'Testează ordinea și adapteaz-o.'],
    ['Desene cu activități zilnice.', 'Construiește rutina ta pe o bandă de hârtie.', 'Mută un pas și discută dacă noua ordine funcționează.'],
    'O rutină diferită nu este neapărat greșită. Verificăm dacă este sigură și dacă fiecare pas poate fi făcut în ordinea aleasă.',
    Content.sequence([
      [O('Reconstruiește rutina aleasă: mă trezesc, mă îmbrac, plec.', ['Mă trezesc', 'Mă îmbrac', 'Plec'], 'Rutina are o ordine: nu plecăm înainte să ne îmbrăcăm.'),
        O('Rutina de seară aleasă: mă spăl pe dinți, îmi pun pijamaua, mă culc.', ['Mă spăl pe dinți', 'Îmi pun pijamaua', 'Mă culc'], 'Somnul vine la finalul rutinei de seară.'),
        O('Rutina mesei: mă spăl pe mâini, mănânc, strâng farfuria.', ['Mă spăl pe mâini', 'Mănânc', 'Strâng farfuria'], 'Ne spălăm înainte de masă și strângem după.')],
      [O('Pregătirea pentru ploaie: verific, aleg, îmbrac, plec.', ['Verific vremea', 'Aleg haina', 'Îmbrac haina', 'Plec'], 'Alegerea hainei depinde de vremea verificată.'),
        O('Planul pentru floare: verific pământul, umplu stropitoarea, ud, pun stropitoarea la loc.', ['Verific pământul', 'Umplu stropitoarea', 'Ud floarea', 'Pun stropitoarea la loc'], 'Verificăm întâi dacă floarea are nevoie de apă.'),
        O('Planul pentru joacă afară: întreb un adult, mă îmbrac potrivit, ies, mă întorc la ora stabilită.', ['Întreb un adult', 'Mă îmbrac potrivit', 'Ies afară', 'Mă întorc la ora stabilită'], 'Întrebăm înainte să ieșim și respectăm ora de întoarcere.')],
      [O('Pregătirea ghiozdanului după plan: verific, aleg, pun, controlez, închid.', ['Verific orarul', 'Aleg materialele', 'Le pun în ghiozdan', 'Controlez lista', 'Închid ghiozdanul'], 'Orarul arată ce materiale alegem; lista ne ajută să nu uităm nimic.'),
        O('Planul pentru tema de scris: citesc cerința, scriu, recitesc, corectez, pun caietul în ghiozdan.', ['Citesc cerința', 'Scriu', 'Recitesc', 'Corectez', 'Pun caietul în ghiozdan'], 'Recitim înainte să corectăm și strângem caietul la final.'),
        O('Planul pentru o plimbare cu bicicleta: verific roțile, pun casca, ies cu un adult, merg pe pistă, pun bicicleta la loc.', ['Verific roțile', 'Pun casca', 'Ies cu un adult', 'Merg pe pistă', 'Pun bicicleta la loc'], 'Siguranța vine înainte de plimbare: roți verificate și cască.')]
    ], [2, 2, 2]), 'Ce pași ai putea schimba fără să strici rutina?'),
  L('inf', 7, 'Robotul și repetările', '🔄',
    'Să folosească repetări pentru secvențe de comenzi',
    'O comandă de repetare îi spune robotului să facă aceeași comandă sau același grup de comenzi de mai multe ori.',
    '„Dreapta, dreapta, dreapta” poate fi descris prin „repetă de 3 ori: dreapta”. Numărăm exact repetările, nu adăugăm una în plus.',
    ['Găsește comanda repetată.', 'Alege de câte ori este executată.', 'Rulează pas cu pas și verifică poziția finală.'],
    ['O grilă și un cartonaș REPETĂ.', 'Construiește un drum cu mai multe deplasări identice.', 'Înlocuiește-le cu o comandă și un număr de repetări.'],
    'Dacă o grupă are două comenzi, se repetă întreaga grupă, nu doar ultima comandă.',
    Content.task('robot', 'repeat'), 'Câte deplasări produce repetarea de trei ori a două comenzi?'),
  L('inf', 8, 'Condiții: dacă, atunci', '🚦',
    'Să aleagă o acțiune în funcție de o condiție',
    'O condiție este ceva ce verificăm, de exemplu: „Plouă?”. Dacă răspunsul este da, urmăm un pas; dacă este nu, putem urma alt pas. Așa folosim o regulă de tip „dacă…, atunci…; altfel…”.',
    'Dacă plouă, iau o haină impermeabilă; altfel aleg o haină potrivită temperaturii. Mai întâi verific dacă plouă.',
    ['Citește ce trebuie să verifici.', 'Observă situația: condiția este adevărată sau falsă?', 'Urmează pasul potrivit răspunsului și explică alegerea.'],
    ['Cartonașe cu vreme și haine.', 'Spune ce alegi dacă plouă și ce alegi dacă nu plouă.', 'Schimbă cartonașul cu vremea și urmează din nou regula.'],
    'La o regulă cu „dacă…; altfel…”, alegem doar una dintre cele două variante, după ce verificăm condiția.',
    Content.task('story', 'conditions'), 'Ce se schimbă când condiția nu mai este adevărată?'),
  L('inf', 9, 'Siguranță digitală', '🛡️',
    'Să protejeze date personale și să ceară ajutor unui adult de încredere',
    'Numele complet, adresa, școala și fotografiile tale sunt informații personale. Întreabă un adult de încredere înainte să le trimiți pe internet, chiar dacă mesajul pare să vină de la cineva cunoscut. Nu trimite parola prin mesaje. Un premiu neașteptat poate fi o încercare de a te păcăli.',
    'Un joc cere parola contului pentru un premiu. Nu o introduci: închizi cererea și vorbești cu un adult de încredere.',
    ['Oprește interacțiunea care te neliniștește.', 'Nu trimite date și nu deschide linkuri necunoscute.', 'Arată mesajul unui adult de încredere.'],
    ['Mesaje fictive scrise pe hârtie, fără date reale.', 'Identifică ce informații sunt cerute.', 'Exersează răspunsul: nu trimit, mă opresc, cer ajutor.'],
    'Nu trebuie să rezolvi singur o situație online neplăcută și nu ești vinovat dacă cineva încearcă să te păcălească.',
    Content.task('story', 'digital'), 'Cui poți arăta un mesaj care te neliniștește?'),

  L('sci', 1, 'Sănătos și bolnav', '🍎',
    'Să aleagă obiceiuri de îngrijire și să ceară ajutor când se simte rău',
    'Somnul, mișcarea, alimentația variată și igiena sprijină sănătatea. Ne putem îmbolnăvi chiar dacă avem obiceiuri bune; boala nu este o vină.',
    'Înainte să mâncăm ne spălăm pe mâini cu apă și săpun. Dacă ne simțim rău, anunțăm un adult de încredere. El ne ajută să primim îngrijire și, când este nevoie, sfatul unui medic.',
    ['Observă de ce are nevoie corpul.', 'Alege un obicei potrivit situației.', 'Cere ajutor pentru durere sau stare de rău.'],
    ['O foaie și creioane.', 'Desenează o zi cu somn, joacă, apă și mese variate.', 'Alege un obicei mic pe care îl poți exersa.'],
    'Nu luăm medicamente singuri și nu împărțim medicamente cu alți copii. Cerem ajutor unui adult.',
    Content.task('story', 'health'), 'Ce faci dacă un coleg se simte rău?'),
  L('sci', 2, 'Plantele', '🌿',
    'Să explice rolul părților plantei și să compare condiții de creștere',
    'La multe plante, rădăcinile le țin prinse în pământ și iau din el apă și săruri minerale, substanțe de care au nevoie. Tulpina susține planta și transportă apa și alte substanțe între părțile ei. Frunzele folosesc lumina, apa și un gaz din aer, numit dioxid de carbon, pentru a produce hrană.',
    'Pentru a testa rolul apei comparăm plante asemănătoare, păstrând lumina și celelalte condiții la fel. Observăm mai multe zile, nu doar un moment.',
    ['Alege o întrebare, de exemplu: „Cum influențează apa creșterea plantei?”.', 'Cu un adult, compară două plante asemănătoare. Schimbă doar cantitatea de apă și păstrează celelalte condiții la fel.', 'Notează ce observi în mai multe zile și spune ce ai aflat.'],
    ['Două ghivece și un jurnal desenat; un adult supraveghează.', 'Observă două plante fără să le deteriorezi.', 'Notează lumina, udarea și schimbările observate.'],
    'Prea multă apă poate dăuna. Nu toate plantele au aceleași nevoi și nu toate cresc în pământ.',
    Content.task('experiment', 'plants'), 'De ce păstrăm aceeași lumină când testăm apa?'),
  L('sci', 3, 'Animalele', '🦋',
    'Să lege trăsături ale animalelor de mediul de viață',
    'Animalele au nevoie de hrană, apă, aer și condiții potrivite, inclusiv locuri unde se pot adăposti. Habitatul este mediul în care trăiesc. Le observăm corpul și felul de a se mișca fără să le deranjăm.',
    'Peștii au înotătoare și respiră de regulă prin branhii. Păsările au pene, dar nu toate zboară. Fluturii au șase picioare și patru aripi.',
    ['Observă o trăsătură.', 'Leag-o de o nevoie sau de deplasare.', 'Verifică dacă afirmația este valabilă pentru exemplul dat.'],
    ['Fotografii sau desene de animale.', 'Grupează după învelișul corpului.', 'Compară două animale din habitate diferite.'],
    'Nu toate animalele cu aripi sunt păsări. Fluturele este o insectă, iar liliacul este un mamifer.',
    Content.matching([
      [{ a: 'Pește', b: 'Înotătoare' }, { a: 'Pisică', b: 'Blană' }, { a: 'Vrabie', b: 'Pene' }, { a: 'Melc', b: 'Cochilie' }, { a: 'Broască țestoasă', b: 'Carapace' }, { a: 'Arici', b: 'Țepi' }, { a: 'Elefant', b: 'Trompă' }, { a: 'Rață', b: 'Cioc lat' }],
      [{ a: 'Fluture', b: 'Patru aripi și șase picioare' }, { a: 'Păianjen', b: 'Opt picioare' }, { a: 'Melc', b: 'Lasă o urmă lucioasă' }, { a: 'Șarpe', b: 'Nu are picioare' },
        { a: 'Rac', b: 'Are clești' }, { a: 'Cangur', b: 'Își poartă puiul într-un buzunar' }, { a: 'Cămilă', b: 'Are cocoașă' }, { a: 'Bufniță', b: 'Vânează noaptea' }],
      [{ a: 'Liliac', b: 'Zboară și își hrănește puii cu lapte' }, { a: 'Pinguin', b: 'Are pene și înoată, dar nu zboară' }, { a: 'Delfin', b: 'Trăiește în apă, dar iese la suprafață ca să respire' }, { a: 'Broască', b: 'La începutul vieții este un mormoloc' }, { a: 'Albină', b: 'Poartă polen de la o floare la alta' },
        { a: 'Lup', b: 'Trăiește și vânează în haită' }, { a: 'Urs brun', b: 'Iarna doarme mult în bârlog' }, { a: 'Barză', b: 'Toamna pleacă spre țări mai calde' }]
    ], [4, 4, 5]), 'De ce aripile nu sunt suficiente ca să numim un animal pasăre?'),
  L('sci', 4, 'Stările apei', '💧',
    'Să lege schimbările de stare de încălzire și răcire',
    'Apa poate fi solidă, lichidă sau gazoasă. Gheața este apă solidă. Vaporii de apă sunt invizibili; norul alb de deasupra apei calde conține picături foarte mici.',
    'Gheața se topește când primește suficientă căldură. Pe exteriorul unui pahar rece se pot forma picături prin condensarea vaporilor din aer.',
    ['Observă starea inițială.', 'Spune dacă încălzim sau răcim.', 'Compară starea finală și numește transformarea.'],
    ['Un cub de gheață și un pahar rece, cu un adult.', 'Urmărește topirea la temperatura camerei.', 'Observă exteriorul paharului rece fără a folosi apă fierbinte.'],
    'Apa se evaporă și fără să fiarbă. Apa rece nu este automat gheață: contează temperatura și condițiile.',
    Content.task('experiment', 'water'), 'De unde vin picăturile de pe exteriorul paharului rece?'),
  L('sci', 5, 'Corpul meu', '🫀',
    'Să lege organe și sisteme de funcțiile lor de bază',
    'Inima împinge sângele prin corp. Plămânii ne ajută să luăm oxigen din aer și să eliminăm dioxid de carbon. Creierul primește informații și trimite comenzi în corp. Prin digestie, hrana este desfăcută în părți pe care corpul le poate folosi; la aceasta participă stomacul și alte organe.',
    'După mișcare, inima poate bate mai repede și respirația se poate accelera. Corpul are nevoie de mai mult oxigen și transportă mai repede substanțele necesare.',
    ['Numește o funcție.', 'Alege organul sau sistemul implicat.', 'Explică de ce organele lucrează împreună.'],
    ['O siluetă desenată și cartonașe cu organe.', 'Așază organele aproximativ la locul lor.', 'Unește fiecare organ cu funcția sa principală.'],
    'Un joc nu poate stabili de ce te doare ceva. Spune unui adult dacă te doare ceva sau nu te simți bine.',
    Content.matching([
      [{ a: 'Inimă', b: 'Pompează sângele' }, { a: 'Plămâni', b: 'Ne ajută să respirăm' }, { a: 'Creier', b: 'Gândește și dă comenzi corpului' }, { a: 'Dinți', b: 'Mestecă hrana' }, { a: 'Piele', b: 'Acoperă și apără corpul' }, { a: 'Nas', b: 'Pe aici intră aerul' }],
      [{ a: 'Stomac', b: 'Fărâmițează hrana' }, { a: 'Intestin subțire', b: 'De aici trece hrana în sânge' }, { a: 'Oase', b: 'Susțin corpul' }, { a: 'Mușchi', b: 'Ne ajută să ne mișcăm' },
        { a: 'Rinichi', b: 'Curăță sângele' }, { a: 'Vase de sânge', b: 'Duc sângele prin corp' }, { a: 'Încheieturi', b: 'Lasă oasele să se îndoaie' }],
      [{ a: 'Mișcare', b: 'Mușchii și oasele lucrează împreună' }, { a: 'Respirație', b: 'Plămânii iau oxigen, iar sângele îl duce prin corp' }, { a: 'Simțirea unei atingeri', b: 'Pielea trimite informații la creier prin nervi' }, { a: 'Folosirea hranei', b: 'Hrana este digerată, iar sângele o duce în corp' },
        { a: 'Creștere', b: 'Oasele și mușchii cresc cu hrană, mișcare și somn' }, { a: 'Apărarea de boli', b: 'Corpul luptă cu microbii care intră în el' }]
    ], [4, 4, 4]), 'De ce nu lucrează fiecare organ separat?'),
  L('sci', 6, 'Numărăm în natură', '🌳',
    'Să numere și să compare observații reale din natură',
    'În natură putem număra, măsura și compara. Numărul de petale diferă între specii; nu presupunem că toate florile au cinci petale.',
    'Un fluture are patru aripi, așezate în două perechi; uneori nu le vedem pe toate. Două insecte adulte cu câte șase picioare au împreună 12 picioare.',
    ['Alege ce observi și ce numeri.', 'Notează fiecare observație o singură dată.', 'Compară cantitățile fără să deranjezi viețuitoarele.'],
    ['Un carnet și un creion, într-un loc sigur cu un adult.', 'Numără copaci sau păsări fără să le atingi.', 'Desenează un tabel și compară două grupe observate.'],
    'Nu completăm o observație cu un număr presupus. Dacă nu vedem toate elementele, spunem ce putem observa sigur.',
    Content.task('gen', 'nature'), 'Ce faci dacă nu vezi toate petalele unei flori?'),
  L('sci', 7, 'Cele cinci simțuri', '👀',
    'Să lege informațiile senzoriale de organe și să respecte siguranța',
    'Văzul, auzul, mirosul, gustul și simțul tactil sunt cinci simțuri cunoscute. Corpul primește informații și despre echilibru și poziție.',
    'Pielea ne ajută să simțim dacă o suprafață este netedă sau aspră: aceasta este textura. Gustul și mirosul lucrează împreună când simțim aroma unui aliment.',
    ['Spune ce informație primești.', 'Numește organul implicat.', 'Alege o explorare sigură.'],
    ['Materiale curate cu texturi diferite și obiecte cunoscute.', 'Compară o suprafață netedă și una aspră.', 'Descrie fără să privești, dacă te simți confortabil.'],
    'Nu gustăm și nu mirosim de aproape substanțe necunoscute. Nu atingem obiecte fierbinți pentru a testa un simț.',
    Content.matching([
      [{ a: 'Văz', b: 'Ochi' }, { a: 'Auz', b: 'Urechi' }, { a: 'Miros', b: 'Nas' }, { a: 'Gust', b: 'Limbă' }, { a: 'Atingere', b: 'Piele' }],
      [{ a: 'Culoarea unui măr', b: 'Văz' }, { a: 'Sunetul ploii', b: 'Auz' }, { a: 'Mirosul pâinii calde', b: 'Miros' }, { a: 'Gustul lămâii', b: 'Gust' }, { a: 'Un fular moale', b: 'Atingere' }],
      [{ a: 'Un produs necunoscut', b: 'Nu îl gustăm' }, { a: 'Un sunet foarte puternic', b: 'Ne îndepărtăm și ne protejăm urechile' }, { a: 'Un obiect fierbinte', b: 'Nu îl atingem ca să-l testăm' }, { a: 'Miros de fum', b: 'Anunțăm imediat un adult' }, { a: 'O lumină foarte puternică', b: 'Nu privim direct spre ea' }, { a: 'Un animal necunoscut', b: 'Îl privim de la distanță' }]
    ], [4, 4, 5]), 'Cum explorăm fără să ne punem în pericol?'),
  L('sci', 8, 'Ciclul apei', '☁️',
    'Să explice legătura dintre evaporare, condensare și precipitații',
    'Apa circulă între suprafața Pământului și aerul din jurul lui. Când apa lichidă devine vapori, spunem că se evaporă. Când vaporii se răcesc și formează picături, are loc condensarea. Ploaia, ninsoarea și grindina sunt forme de precipitații: apă care cade din nori.',
    'Apa dintr-o baltă se evaporă treptat. Vaporii pot ajunge în aer mai rece, unde se formează picături foarte mici. Apa revine prin ploaie sau alte precipitații.',
    ['Pornește de la apa lichidă.', 'Urmărește evaporarea și condensarea.', 'Explică revenirea apei la sol.'],
    ['Un desen cu soare, apă și nori.', 'Adaugă săgeți între etape.', 'Povestește călătoria unei picături fără să presupui că apa dispare.'],
    'Norii sunt formați din picături foarte mici de apă sau din cristale de gheață, uneori din amândouă. Vaporii de apă nu se văd.',
    Content.sequence([
      [O('Ordonează etapele indicate: apă la sol, vapori, picături în nor.', ['Apă la sol', 'Vapori în aer', 'Picături în nor'], 'Apa lichidă poate deveni vapori prin evaporare. Când se răcesc, vaporii pot forma picături.'),
        O('Ordonează: nor, ploaie, băltoacă.', ['Nor', 'Ploaie', 'Băltoacă'], 'Din nor cade ploaia, iar apa se adună pe jos într-o băltoacă.'),
        O('Ordonează ce se întâmplă cu un om de zăpadă la soare.', ['Om de zăpadă', 'Zăpada se topește', 'Apă pe jos'], 'La căldură, zăpada se topește și devine apă.')],
      [O('Reconstruiește ciclul începând cu evaporarea: evaporare, condensare, precipitații, colectare.', ['Evaporare', 'Condensare', 'Precipitații', 'Colectare'], 'Apa se evaporă, formează picături în nori, cade ca precipitații și se adună din nou la suprafață. Ciclul poate continua.'),
        O('Ordonează drumul unei picături de ploaie spre mare.', ['Ploaie', 'Râu', 'Mare', 'Nor'], 'Ploaia ajunge în râu, râul în mare, iar din mare apa se evaporă și formează din nou nori.'),
        O('Ordonează drumul zăpezii de pe munte.', ['Zăpadă pe munte', 'Zăpada se topește', 'Pârâu', 'Râu'], 'Primăvara zăpada se topește; apa curge în pâraie, iar pâraiele se varsă în râuri.')],
      [O('Urmărește traseul ales al apei: se încălzește, se evaporă, vaporii se răcesc, se formează picături, apa revine la sol.', ['Apa se încălzește', 'O parte se evaporă', 'Vaporii se răcesc', 'Se formează picături', 'Apa revine la sol'], 'Căldura ajută apa să se evapore. Prin răcire se pot forma picături, iar apa poate reveni la sol.'),
        O('Ordonează ce se întâmplă cu apa din rufele întinse la soare.', ['Apa din rufe se încălzește', 'Apa se evaporă', 'Vaporii urcă', 'Vaporii se răcesc', 'Se formează nori'], 'Și apa din rufe intră în ciclul apei: se evaporă, urcă și se răcește.')]
    ], [2, 2, 2]), 'De ce spunem ciclu și nu drum cu un singur final?'),
  L('sci', 9, 'Un experiment corect', '🔬',
    'Să schimbe un singur factor și să lege concluzia de observații',
    'Într-un experiment de comparație punem o întrebare și spunem ce credem că se va întâmpla: aceasta este o predicție. Apoi schimbăm un singur lucru, păstrăm celelalte condiții la fel și observăm rezultatul.',
    'Vrem să aflăm dacă gheața se topește mai repede într-o cameră mai caldă decât într-una mai răcoroasă. Folosim cuburi de aceeași mărime și farfurii identice, fără soare direct. Pornim în același timp și verificăm la aceleași intervale.',
    ['Spune ce vrei să afli și ce crezi că se va întâmpla.', 'Alege singurul lucru pe care îl schimbi.', 'Observă și spune ce ai aflat din comparație.'],
    ['Două cuburi de gheață de aceeași mărime, două farfurii identice și un adult.', 'Cu adultul, pune câte un cub pe fiecare farfurie: unul într-o cameră mai caldă și altul într-una mai răcoroasă, fără soare direct și departe de surse de căldură.', 'Porniți în același timp. Observă ambele cuburi din două în două minute și desenează schimbările.'],
    'Dacă se întâmplă altceva decât ai crezut, nu ai greșit experimentul doar din acest motiv. Privește rezultatul și încearcă să afli de ce.',
    Content.task('experiment', 'fair'), 'De ce nu schimbăm toate condițiile odată?'),
  L('sci', 10, 'Cititorul de observații', '📊',
    'Să citească un tabel simplu și să distingă observația de explicație',
    'Un tabel păstrează observațiile organizate. El arată ce am numărat sau măsurat, dar nu dovedește singur cauza unei schimbări.',
    'Dacă o plantă are 2 frunze luni și 4 vineri, observăm o creștere de 2 frunze. Pentru a explica de ce a crescut, avem nevoie de mai multe informații.',
    ['Citește titlul tabelului și vezi ce ai numărat sau măsurat. Dacă ai măsurat, caută și unitatea.', 'Compară numerele pentru zilele sau grupele cerute.', 'Spune ce vezi în tabel și ce doar presupui.'],
    ['O foaie împărțită în zile și desene cu frunze.', 'Înregistrează aceeași observație în mai multe zile.', 'Spune o concluzie și o întrebare rămasă.'],
    'Dacă două lucruri se schimbă în același timp, nu înseamnă neapărat că unul îl schimbă pe celălalt. Avem nevoie de alte observații ca să aflăm de ce s-a întâmplat ceva.',
    Content.task('reading', 'observations'), 'Ce poți spune sigur din tabel?'),

  L('civ', 1, 'Familia mea', '🏡',
    'Să recunoască sprijinul și diversitatea familiilor',
    'Familiile pot arăta diferit. Un copil poate trăi cu unul sau mai mulți părinți, bunici, tutori sau alte persoane care îl îngrijesc. Respectul și siguranța contează.',
    'Cineva pregătește masa, altcineva strânge, iar copilul poate ajuta potrivit vârstei. Responsabilitățile se discută, nu depind de faptul că cineva este fată sau băiat.',
    ['Numește o persoană care te sprijină, dacă dorești.', 'Alege o responsabilitate potrivită vârstei.', 'Spune cui poți cere ajutor.'],
    ['O foaie și creioane.', 'Dacă dorești, desenează persoane de încredere cărora le poți cere ajutor. Nu trebuie să scrii nume sau alte date personale.', 'Alege o sarcină mică pe care o puteți face împreună.'],
    'Nu trebuie să povestești lucruri personale dacă nu dorești. Dacă nu te simți în siguranță acasă, poți cere ajutor unui alt adult de încredere, de exemplu unui învățător.',
    Content.task('story', 'family'), 'Cum poți contribui fără să preiei responsabilități de adult?'),
  L('civ', 2, 'Prietenii', '🤝',
    'Să aleagă comportamente respectuoase și să exprime limite',
    'Prietenia include ascultare, respect și libertatea de a spune nu. Putem aprecia o persoană și totuși să nu fim de acord cu un comportament.',
    'Dacă un coleg îți ia creionul fără să întrebe, poți spune: „Îl folosesc acum. Te rog să întrebi înainte.” Dacă situația continuă, ceri ajutor.',
    ['Spune ce a făcut persoana, fără să o jignești: „Ai luat creionul fără să întrebi.”', 'Spune ce simți și de ce ai nevoie.', 'Propune o soluție și cere sprijin dacă este necesar.'],
    ['Două păpuși sau personaje desenate.', 'Joacă o neînțelegere despre o jucărie.', 'Încearcă pe rând rolul celui care cere și al celui care răspunde.'],
    'Nu trebuie să accepți un lucru neplăcut ca să păstrezi o prietenie. Respectăm refuzul și limitele celuilalt.',
    Content.task('story', 'friends'), 'Cum spui nu fără să jignești?'),
  L('civ', 3, 'Reguli la școală', '🏫',
    'Să explice o regulă prin siguranță, respect și echitate',
    'O regulă bună ne ajută să învățăm și să fim în siguranță. Putem întreba de ce există. Când ne este greu să o urmăm, putem cere ajutor și putem discuta cum să fie potrivită și pentru nevoile noastre.',
    'Vorbim pe rând ca să ne putem auzi. Un copil care are nevoie de o pauză de mișcare poate discuta cu adultul despre o variantă sigură.',
    ['Spune la ce ajută regula.', 'Observă dacă fiecare copil este tratat cu respect.', 'Propune o soluție când cineva are nevoie de alt fel de ajutor.'],
    ['O foaie cu trei reguli de grup.', 'Desenează scopul fiecărei reguli.', 'Revizuiește o regulă prea vagă, precum „fii cuminte”.'],
    'Respectul față de un adult nu înseamnă să accepți ceva care te rănește sau te face să te simți în pericol. Cere ajutor.',
    Content.task('story', 'school'), 'Cum explici regula fără să spui doar „așa trebuie”?'),
  L('civ', 4, 'Ajutor reciproc', '🫶',
    'Să ofere ajutor cu acord și să recunoască limitele proprii',
    'Ajutorul este util când răspunde unei nevoi și respectă persoana. Întrebăm înainte și nu facem în locul ei tot ce poate exersa singură.',
    'Un coleg se chinuie să strângă piesele. Întrebi: „Vrei să te ajut?” Dacă spune da, stabiliți cum împărțiți sarcina.',
    ['Observă ce încearcă să facă persoana.', 'Întreabă dacă dorește ajutor și de ce fel.', 'Alege un ajutor sigur și potrivit puterilor tale.'],
    ['O sarcină comună, precum sortarea unor jetoane.', 'Cere și oferă ajutor pe rând.', 'Spune ce fel de ajutor te-a făcut să te simți respectat.'],
    'Nu încercăm intervenții periculoase pentru a ajuta. Într-o situație riscantă, chemăm un adult.',
    Content.task('story', 'help'), 'De ce întrebăm înainte să ajutăm?'),
  L('civ', 5, 'Reguli în natură', '🌍',
    'Să aleagă acțiuni care protejează mediul și siguranța',
    'În natură păstrăm distanța față de animale, nu deteriorăm plantele și nu lăsăm deșeuri. Regulile locale ne ajută să știm ce este permis.',
    'La un picnic adunăm propriile ambalaje. Dacă vedem sticlă spartă, nu o ridicăm cu mâna: anunțăm un adult.',
    ['Observă urmările unei acțiuni.', 'Alege o alternativă care nu deranjează viețuitoarele.', 'Cere ajutor pentru deșeuri sau situații periculoase.'],
    ['Ambalaje curate pentru sortare și un adult.', 'Simulează strângerea după picnic.', 'Verifică regulile locale pentru colectare separată.'],
    'Animalele sălbatice nu sunt jucării și nu presupunem că sunt prietenoase. Nu le hrănim și nu ne apropiem de ele.',
    Content.task('story', 'nature'), 'Cum protejezi natura fără să te expui unui risc?'),
  L('civ', 6, 'Emoțiile mele', '🙂',
    'Să numească emoții fără să presupună ce simte altcineva',
    'Emoțiile ne ajută să înțelegem ce trăim. Putem simți mai multe emoții în același timp, cum ar fi bucurie și teamă înaintea unei excursii. Nu știm sigur ce simte cineva doar privind fața sa.',
    'Un copil tace înaintea unei prezentări. Poate fi emoționat, concentrat sau obosit. Întrebăm cu grijă în loc să decidem în locul lui.',
    ['Observă ce simți în corp.', 'Alege un cuvânt pentru emoție, dacă poți.', 'Spune de ce ai nevoie: pauză, sprijin, spațiu sau discuție.'],
    ['Foi cu fețe desenate și culori.', 'Desenează o emoție în felul tău.', 'Spune o strategie care te ajută, fără să fii obligat să povestești ceva personal.'],
    'Este în regulă să simțim orice emoție, inclusiv furie. Contează ce facem: putem spune că suntem furioși, putem lua o pauză sau putem cere ajutor, fără să lovim.',
    Content.task('story', 'emotions'), 'Cum afli ce simte cineva fără să ghicești?'),
  L('civ', 7, 'Rezolvăm un conflict', '🕊️',
    'Să construiască o soluție respectuoasă pentru o neînțelegere',
    'Într-un conflict ne oprim dacă situația nu este sigură, ascultăm nevoile și căutăm soluții. Nu este obligatoriu ca fiecare conflict să fie rezolvat fără adult.',
    'Doi copii vor aceeași minge. O pot folosi pe rând, pot inventa un joc comun sau pot cere ajutor ca să găsească o soluție care ține seama de amândoi.',
    ['Dacă cineva lovește sau amenință, îndepărtează-te într-un loc sigur și cere ajutor unui adult.', 'Când este sigur, spune de ce ai nevoie și ascultă ce spune cealaltă persoană.', 'Comparați soluțiile și verificați dacă amândoi sunteți de acord.'],
    ['Două personaje și o jucărie.', 'Joacă o situație de dispută.', 'Propune două soluții și discută urmările fiecăreia.'],
    'A ceda mereu nu este singura soluție. Nici lovirea, amenințarea sau umilirea nu sunt soluții acceptabile.',
    Content.task('story', 'conflict'), 'Cum verifici dacă soluția ține seama de amândoi?'),
  L('civ', 8, 'Limitele mele și ale tale', '✋',
    'Să respecte un refuz și să ceară ajutor pentru limite încălcate',
    'Fiecare persoană poate spune că nu dorește o atingere, o fotografie sau împrumutarea unui obiect. Cerem acordul și respectăm răspunsul.',
    'Vrei să îmbrățișezi un coleg. Întrebi; dacă spune nu, poți saluta cu mâna. Refuzul nu trebuie justificat pentru a fi respectat.',
    ['Întreabă înainte.', 'Ascultă răspunsul fără presiune.', 'Oprește-te la refuz și cere sprijin dacă limita ta nu este respectată.'],
    ['Cartonașe cu saluturi: cu mâna, prin cuvinte, prin zâmbet.', 'Fiecare alege un salut cu care se simte bine.', 'Exersați acceptarea unui „nu” fără insistențe. Poți fi dezamăgit și totuși să respecți refuzul.'],
    'Un secret care te sperie sau te face să te simți în pericol poate fi spus unui adult de încredere. Nu ești vinovat pentru încălcarea limitelor de către altcineva.',
    Content.task('story', 'boundaries'), 'Cum arăți respect când cineva spune nu?'),
  L('civ', 9, 'Decizii pentru grup', '🗳️',
    'Să compare soluții și să includă nevoile diferite ale colegilor',
    'Un grup poate decide prin discuție, vot sau alegând pe rând. La vot, majoritatea înseamnă mai mult de jumătate dintre cei care votează. Chiar dacă mulți vor același lucru, alegerea trebuie să respecte siguranța și nevoile fiecăruia.',
    'Cei mai mulți vor un joc cu alergare, dar un coleg nu poate participa. Îl întrebăm ce l-ar ajuta și căutăm împreună să schimbăm jocul sau să alegem altul, la care să poată participa toți cei care doresc.',
    ['Ascultați propunerile și nevoile fiecăruia.', 'Verificați cine poate participa la fiecare joc.', 'Alegeți o variantă și verificați dacă funcționează pentru grup.'],
    ['Trei propuneri de joc scrise pe cartonașe.', 'Spune ce îți place la fiecare joc și ce ar putea împiedica pe cineva să participe.', 'Găsiți împreună o variantă la care pot participa toți cei care doresc.'],
    'O alegere dorită de mulți nu este neapărat potrivită pentru toți. Putem schimba decizia când observăm că lasă pe cineva pe dinafară.',
    Content.task('story', 'group'), 'Ce faci dacă votul lasă pe cineva fără posibilitatea de a participa?'),
  L('civ', 10, 'Mă cunosc: calități, interese și preferințe', '🪞',
    'Să deosebească o calitate arătată prin fapte, un interes și o preferință',
    'O calitate se vede în felul în care acționăm: de exemplu, răbdarea când așteptăm rândul. Un interes este ceva despre care vrem să aflăm sau să exersăm mai mult. O preferință arată ce ne place mai mult dintre câteva variante. Putem avea interese comune și preferințe diferite. Acestea se pot schimba.',
    'Mira spune: „Vreau să aflu cum cresc plantele. Prefer să desenez flori, nu mașini.” Interesul ei este să afle despre plante; preferința ei este desenul florilor. Când ascultă un coleg până termină, arată respect printr-o faptă.',
    ['Desenează personajul Mira și spune ce vrea să afle despre plante: acesta este interesul din exemplu.', 'Pe alt cartonaș, desenează alegerea ei între flori și mașini: aceasta este preferința declarată.', 'Pune lângă personaj un cartonaș cu fapta „ascultă până la capăt” și numește calitatea arătată: respect.'],
    ['Hârtie și creioane colorate; un adult poate citi sau scrie enunțurile.', 'Desenează un personaj inventat. Spune o întrebare care îl interesează și o alegere pe care o preferă.', 'Desenează o faptă prin care personajul arată grijă pentru cineva. Explică diferența dintre faptă, interes și preferință; nu trebuie să povestești despre tine.'],
    'O preferință diferită nu este o greșeală. O singură reușită sau greșeală nu spune totul despre o persoană. Calitățile pot fi exersate; nu împărțim copiii în „buni” și „răi”.',
    Content.quiz([
      [
        Q('Lia spune: „Prefer creionul verde celui albastru.” Ce aflăm?', ['Ce meserie va avea', 'Ce culoare preferă acum', 'Cât de bine desenează'], 1, 'Lia spune ce culoare alege, nu ce poate face sau ce va deveni.'),
        Q('Dan întreabă cum trăiesc albinele și caută o carte despre ele. Ce arată?', ['Un interes pentru albine', 'Că toți trebuie să aleagă albinele', 'Că știe deja totul'], 0, 'Întrebarea și căutarea unei cărți arată că Dan vrea să afle mai mult.'),
        Q('Nora așteaptă să termine colegul, apoi vorbește. Ce faptă arată răbdare?', ['Culoarea caietului ei', 'Numele pe care îl are', 'Faptul că așteaptă rândul'], 2, 'Răbdarea este arătată aici prin așteptarea rândului.')
      ],
      [
        Q('Alex preferă puzzle-uri, iar Ina preferă povești. Ce este respectuos?', ['Ina trebuie să aleagă puzzle-uri', 'Pot avea preferințe diferite', 'Unul dintre ei greșește'], 1, 'Niciuna dintre preferințele declarate nu trebuie corectată.'),
        Q('Radu vrea să afle despre trenuri și preferă să asculte o poveste despre ele. Care este interesul?', ['Să afle despre trenuri', 'Să fie identic cu ceilalți', 'Să nu mai învețe nimic'], 0, 'Trenurile sunt subiectul despre care vrea să afle; ascultarea este varianta preferată aici.'),
        Q('Ieri, Ema a ales desenul. Azi vrea să încerce modelajul. Ce putem spune?', ['Ieri a mințit sigur', 'Nu mai are voie să deseneze', 'Poate încerca o activitate nouă'], 2, 'Putem explora lucruri noi fără ca alegerile de ieri să fi fost greșite.')
      ],
      [
        Q('Teo spune: „Îmi plac păsările. Prefer să le desenez. Azi am împrumutat un creion unui coleg care mi-a cerut.” Care faptă arată generozitate?', ['Interesul pentru păsări', 'Împrumutarea creionului', 'Preferința pentru desen'], 1, 'Împrumutarea cu acord este fapta de ajutor; celelalte enunțuri descriu ce îi place.'),
        Q('Sara spune că preferă cântecele. Un coleg decide că nu îi pot plăcea și poveștile. Ce lipsește?', ['Să o întrebăm pe Sara', 'Să îi interzicem poveștile', 'Să aleagă colegul pentru ea'], 0, 'O preferință nu ne spune toate interesele persoanei. Întrebăm, nu presupunem.'),
        Q('Doi copii vor să afle despre stele. Unul preferă desene, altul explicații citite de adult. Ce au în comun?', ['Toate preferințele', 'Toate priceperile', 'Interesul pentru stele'], 2, 'Au același subiect de interes, dar preferă moduri diferite de explorare.')
      ]
    ]), 'Cum recunoști în exemplul Mirei un interes, o preferință și o faptă care arată respect?'),
  L('civ', 11, 'Învăț din greșeli și cer ajutor', '🌱',
    'Să folosească o greșeală pentru a verifica un pas și a cere ajutor concret',
    'Când învățăm, uneori rezultatul nu se potrivește cu cerința. Ne oprim, comparăm și alegem un pas de încercat din nou. Putem cere un indiciu, o explicație sau o pauză. A cere ajutor nu înseamnă că nu putem învăța. Pentru o situație periculoasă chemăm un adult, nu încercăm singuri.',
    'Vlad trebuie să copieze cerc–pătrat–cerc, dar pune cerc–cerc–cerc. Compară pe rând și vede că mijlocul diferă. Spune: „La mijloc nu găsesc pătratul. Mă ajuți să-l recunosc?” După un indiciu, schimbă doar piesa din mijloc și verifică din nou.',
    ['Desenează modelul cerc–pătrat–cerc și, dedesubt, încercarea cerc–cerc–cerc.', 'Atinge pe rând primul, al doilea și al treilea semn din ambele șiruri. Arată unde diferă.', 'Spune cererea de ajutor a lui Vlad, corectează semnul din mijloc și compară din nou cele trei locuri.'],
    ['O foaie și creioane; un adult sau un partener de joc.', 'Adultul desenează un model din trei forme mari și o copie cu o singură nepotrivire. Găsește locul diferit.', 'Cere un indiciu despre formă, nu rezolvarea întreagă. Corectează și arată cum ai verificat; schimbați rolurile dacă doriți.'],
    '„Am greșit un pas” nu înseamnă „nu sunt bun la nimic”. Nici repetarea fără verificare nu rezolvă întotdeauna problema: putem schimba metoda și putem cere sprijin.',
    Content.quiz([
      [
        Q('Mara pune patru jetoane, dar cerința cere trei. Ce o ajută să verifice?', ['Să numere și să compare', 'Să ascundă foaia cu cerința', 'Să spună că nu poate învăța'], 0, 'Numărarea arată nepotrivirea: sunt patru, nu trei.'),
        Q('Ionuț nu înțelege un cuvânt din cerință. Cum cere ajutor?', ['„Fă totul în locul meu.”', '„Nu mai ascult.”', '„Îmi explici acest cuvânt?”'], 2, 'Cererea numește exact ce nu înțelege, ca să poată continua.'),
        Q('Ada a greșit un desen după model. Ce este adevărat?', ['Greșeala spune totul despre ea', 'Poate verifica și încerca din nou', 'Nu mai are voie să deseneze'], 1, 'O încercare se poate revizui; nu este o etichetă pentru persoană.')
      ],
      [
        Q('Modelul este roșu–verde–roșu. Luca are roșu–albastru–roșu. Unde verifică mai atent?', ['La primul loc', 'La ultimul loc', 'La mijloc'], 2, 'Doar piesa din mijloc diferă de model: albastru în loc de verde.'),
        Q('Daria a încercat de două ori fără să înțeleagă. Ce cerere o ajută să învețe?', ['„Îmi arăți primul pas?”', '„Spune-mi că nu voi reuși.”', '„Rezolvă fără să-mi explici.”'], 0, 'Un prim pas explicat îi oferă sprijin și o lasă să exerseze.'),
        Q('Paul este obosit și nu mai urmărește cerința. Ce poate cere?', ['Să continue fără nicio oprire', 'O pauză, apoi recitirea cerinței', 'Să fie certat că e obosit'], 1, 'Pauza și recitirea sunt forme de sprijin, nu pedepse.')
      ],
      [
        Q('Ina corectează o piesă și vrea să termine. Cum află dacă modelul se potrivește acum?', ['Presupune că orice schimbare ajută sigur', 'Compară din nou toate locurile cu modelul', 'Ascunde modelul ca să termine'], 1, 'Verificarea întregului șir arată dacă schimbarea a rezolvat nepotrivirea.'),
        Q('Un adult nu a auzit cererea de ajutor a lui Sami. Ce poate face Sami?', ['Să creadă că nu merită ajutor', 'Să renunțe pentru totdeauna la ajutor', 'Să repete sau să întrebe alt adult'], 2, 'O cerere neauzită nu este un refuz al persoanei; Sami poate căuta sprijin din nou.'),
        Q('O piesă a căzut lângă un cablu electric deteriorat. Cum procedează copilul?', ['Se îndepărtează și anunță un adult', 'Repară singur cablul stricat', 'Ridică piesa de lângă cablu'], 0, 'Aici nu exersăm prin încercări: evităm pericolul și cerem ajutor unui adult.')
      ]
    ]), 'Ce a verificat Vlad înainte și după ce a schimbat piesa?'),
  L('civ', 12, 'Rutina mea: timp, pauze și organizare', '🗓️',
    'Să organizeze pași după un plan dat și să includă pauze',
    'O rutină este un grup de acțiuni pe care le repetăm și care ne ajută să știm ce urmează. Un plan arată ce facem și când luăm o pauză. Planurile pot fi diferite și se pot schimba cu ajutorul unui adult. În joc ordonăm doar după regulile scrise, nu după o singură rutină valabilă pentru toți.',
    'Pentru jocul de desen, planul Anei spune: întâi pregătește foaia, apoi desenează, după desen ia o pauză și la final pune creioanele în cutie. Așezăm patru cartonașe în această ordine fiindcă așa este planul dat. În alt plan, strângerea ar putea fi înaintea pauzei.',
    ['Desenează patru cartonașe: pregătesc foaia, desenez, fac pauză, strâng creioanele.', 'Așază-le după planul Anei: pregătire, desen, pauză, strângere. Spune cu voce tare ce vine înainte și după pauză.', 'Arată cu degetul pasul la care a ajuns Ana. Dacă are nevoie de o pauză mai devreme, discută cu adultul cum poate schimba planul.'],
    ['Patru bucăți de hârtie și creioane; fără cronometru obligatoriu.', 'Desenează pentru un personaj un plan scurt cu pregătire, activitate, pauză și strângere. Spune explicit ordinea aleasă.', 'Un partener așază cartonașele după planul tău. Verificați împreună; apoi schimbați planul și observați că altă ordine poate fi potrivită.'],
    'Un plan nu trebuie urmat cu orice preț. Dacă apare oboseala, o nevoie sau un pericol, cerem sprijin și îl adaptăm. În exercițiile de ordonare, răspunsul urmează numai instrucțiunile personajului.',
    Content.handsOn('routine', 'day', Content.sequence([
      [
        O('Planul lui Teo: întâi pregătește foaia, apoi desenează, la final pune desenul în mapă. Reface planul.', ['Pregătește foaia', 'Desenează', 'Pune desenul în mapă'], 'Foaia este prima, desenul urmează, iar mapa este ultimul pas, exact ca în plan.'),
        O('Planul Mirei: începe cu citirea, ia pauză după citire, apoi povestește. Ordonează doar după acest plan.', ['Citește', 'Ia pauză', 'Povestește'], 'Pauza este între citire și povestire în planul Mirei.'),
        O('Pentru acest joc: întâi deschide cutia, apoi scoate cartonașele, la final așază-le pe masă.', ['Deschide cutia', 'Scoate cartonașele', 'Așază cartonașele pe masă'], 'Ca să scoată cartonașele, deschide întâi cutia; abia apoi le așază.')
      ],
      [
        O('Planul Anei: pregătește creioanele înainte de desen; după desen ia pauză; după pauză strânge creioanele.', ['Pregătește creioanele', 'Desenează', 'Ia pauză', 'Strânge creioanele'], 'Cele trei legături „înainte” și „după” fixează toate cele patru locuri.'),
        O('Radu are patru pași: caută cartea înainte să citească; citește înainte de pauză; povestește după pauză.', ['Caută cartea', 'Citește', 'Ia pauză', 'Povestește'], 'Cartea se caută înainte de citire; pauza desparte citirea de povestire.'),
        O('În planul Danei, verificarea este ultima. Ea face puzzle-ul după pregătirea pieselor și înainte de pauză. Ordonează cei patru pași.', ['Pregătește piesele', 'Face puzzle-ul', 'Ia pauză', 'Verifică puzzle-ul'], 'Pregătirea precedă puzzle-ul, pauza vine după el, iar verificarea este cerută la final.')
      ],
      [
        O('Plan de cinci pași: alegerea modelului este prima, strângerea este ultima. Pregătirea hârtiei este înainte de desen, iar desenul este înainte de pauză.', ['Alege modelul', 'Pregătește hârtia', 'Desenează', 'Ia pauză', 'Strânge materialele'], 'Între primul și ultimul pas, regula fixează pregătire–desen–pauză. Nu ghicim o rutină universală.'),
        O('Planul nou al lui Vlad începe cu o pauză. Apoi caută cartea înainte de citire. După citire pune semnul de carte, iar la final așază cartea pe raft.', ['Ia pauză', 'Caută cartea', 'Citește', 'Pune semnul de carte', 'Așază cartea pe raft'], 'Pauza este prima în acest plan adaptat; celelalte legături fixează pașii rămași.'),
        O('La atelier, salutul este primul, plecarea este ultima. Copiii aleg materialele înainte de lucru. Strângerea este după lucru și înainte de plecare.', ['Salută', 'Aleg materialele', 'Lucrează', 'Strâng materialele', 'Pleacă'], 'Între salut și plecare, regulile cer alegere–lucru–strângere.')
      ]
    ]), [2, 2, 2]), 'De ce pauza poate avea alt loc într-un plan nou, chiar dacă jocul cere o ordine precisă?'),
  L('civ', 13, 'Am grijă de mine: odihnă, mișcare și igienă', '🧼',
    'Să recunoască alegeri de îngrijire și situații în care cere sprijin',
    'Corpul are nevoie de odihnă, mișcare potrivită și igienă. Igiena înseamnă îngrijirea curățeniei corpului, de exemplu spălarea mâinilor cu apă și săpun. Mișcarea poate fi adaptată fiecărui copil. Obiceiurile de îngrijire ne sprijină sănătatea, dar nu promit că nu ne vom îmbolnăvi. Dacă ne doare ceva sau ne simțim rău, spunem unui adult.',
    'După joaca în curte și înainte de gustare, Lia își spală mâinile cu apă și săpun și le usucă. Mai târziu spune că este obosită și cere o pauză. Adultul o ajută să aleagă odihna de care are nevoie, nu o ceartă.',
    ['Desenează două momente din exemplu: joaca în curte și gustarea. Între ele desenează spălarea mâinilor cu apă și săpun.', 'Arată pe desen ce ar putea spune Lia când este obosită: „Am nevoie de o pauză.”', 'Alege pentru un personaj o mișcare blândă, așezat sau în picioare, într-un spațiu liber, cu acordul adultului; opriți-vă dacă apare disconfort.'],
    ['Hârtie, creioane și un spațiu fără obstacole, verificat de adult.', 'Desenează trei cartonașe pentru un personaj: odihnă, mișcare adaptată și spălarea mâinilor. Povestește când l-ar ajuta fiecare.', 'Dacă dorești, fă o mișcare blândă potrivită ție, fără concurs. Poți doar să o desenezi; cere sprijin dacă apare durere sau nu știi ce este potrivit.'],
    'Îmbolnăvirea nu dovedește că un copil a făcut ceva rău. Nu comparăm corpurile și nu cerem tuturor aceeași mișcare. Copiii nu aleg singuri medicamente sau tratamente.',
    Content.quiz([
      [
        Q('După toaletă, înainte de a mânca, ce alegere de igienă este potrivită?', ['Doar să-și privească atent mâinile', 'Să își spele mâinile cu săpun', 'Să le șteargă de caiet'], 1, 'Spălarea cu apă și săpun și uscarea îngrijesc mâinile în aceste momente.'),
        Q('Nina spune adultului că este foarte obosită. Ce poate cere?', ['O pauză de odihnă', 'Să alerge fără oprire', 'Să ascundă oboseala'], 0, 'Poate spune că are nevoie de odihnă și poate cere sprijin.'),
        Q('Pe podea sunt cuburi. Înaintea unui joc de mișcare, ce trebuie făcut?', ['Să se sară peste ele cu ochii închiși', 'Să fie ignorate', 'Să fie eliberat spațiul cu ajutorul adultului'], 2, 'Îndepărtarea obstacolelor ajută la pregătirea unui loc mai sigur.')
      ],
      [
        Q('Într-un joc, pe Luca începe să îl doară piciorul. Ce alegere este potrivită?', ['Să continue jocul ca să câștige', 'Să se oprească și să anunțe un adult', 'Să ia singur o pastilă de acasă'], 1, 'Durerea este un motiv să oprească activitatea și să ceară sprijin, nu să o ascundă.'),
        Q('Un copil face mișcări așezat, altul în picioare, după indicațiile adulților. Ce este respectuos?', ['Să spunem că doar alergarea contează', 'Să îi punem să concureze la fel', 'Să respectăm mișcarea potrivită fiecăruia'], 2, 'Mișcarea se poate adapta; nu judecăm copiii după felul în care se mișcă.'),
        Q('Mâinile par curate după joaca afară. Începe gustarea. Ce alegere este potrivită?', ['Spălarea cu apă și săpun înainte de masă', 'Doar alegerea unei farfurii colorate', 'Să nu le spele dacă nu vede murdărie'], 0, 'Faptul că nu vedem murdărie nu înlocuiește spălarea mâinilor înainte de masă.')
      ],
      [
        Q('Un coleg spune: „Dacă mă spăl pe mâini, nu mă pot îmbolnăvi niciodată.” Ce răspuns este corect?', ['Este o garanție pentru orice boală', 'Igiena ajută, dar nu garantează', 'Igiena nu are niciun rost'], 1, 'Igiena este utilă fără să ofere o garanție împotriva tuturor îmbolnăvirilor.'),
        Q('Ana are un plan de joacă, dar spune că se simte rău. Ce contează acum?', ['Să termine planul cu orice preț', 'Să ia medicamentul unui prieten', 'Să anunțe adultul și să adapteze planul'], 2, 'Starea de rău cere sprijin; planul se poate schimba, iar medicamentele nu se aleg de copil.'),
        Q('Doi copii au răcit. Putem decide din asta cine s-a îngrijit mai bine?', ['Nu; răceala nu arată obiceiurile', 'Da; cel care tușește a greșit sigur', 'Da; cel absent este vinovat'], 0, 'Nu cunoaștem obiceiurile lor din simplul fapt că sunt bolnavi și nu îi învinovățim.')
      ]
    ]), 'Ce poate face Lia dacă are nevoie de odihnă înainte să termine activitatea?'),
  L('civ', 14, 'Ascult și spun ce am nevoie', '💬',
    'Să asculte un mesaj, să verifice înțelegerea și să exprime o nevoie respectuos',
    'Ascultarea înseamnă să fim atenți la mesaj și să lăsăm loc răspunsului. Nu este obligatoriu să privim pe cineva în ochi ca să îl ascultăm. Putem verifica: „Ai nevoie de liniște, am înțeles bine?” O cerere clară spune ce ne-ar ajuta fără jigniri. Celălalt poate refuza o propunere; căutăm o alternativă sigură.',
    'Mara spune: „Zgomotul mă deranjează. Am nevoie de liniște ca să citesc. Putem vorbi mai încet?” Dan răspunde: „Ai nevoie de liniște pentru citit, am înțeles?” Apoi propune să discute într-un alt loc permis de adult. Mara confirmă că această variantă o ajută.',
    ['Desenează două personaje și citește sau ascultă cererea Marei. Arată cu degetul cuvintele „am nevoie de liniște”.', 'Joacă răspunsul lui Dan: repetă nevoia în cuvintele tale și întreabă „Am înțeles bine?”', 'Propune pentru personaje vorbirea mai încet sau un alt loc permis. Întreabă dacă soluția îi ajută pe amândoi.'],
    ['Două personaje de hârtie și creioane; un partener poate citi replicile.', 'Un personaj cere spațiu pentru desen. Celălalt repetă ce a înțeles, fără să îi ia foaia și fără să îl atingă.', 'Schimbați rolurile și încercați o cerere despre împrumutarea unui creion. Includeți și un refuz respectat; nu trebuie să povestiți situații personale.'],
    'A asculta nu înseamnă a accepta orice cerere. Putem spune nu și putem cere ajutor. Dacă cineva amenință sau rănește, nu așteptăm să terminăm o discuție: ne îndepărtăm spre siguranță și căutăm un adult de încredere.',
    Content.quiz([
      [
        Q('Lia spune: „Am nevoie de loc pe masă pentru foaie.” Ce cere?', ['Să plece toată clasa', 'Să primească toate creioanele', 'Spațiu pentru foaia ei'], 2, 'Nevoia este spusă direct: loc pe masă pentru foaie.'),
        Q('Care cerere este clară și fără jigniri?', ['„Ești rău și gălăgios!”', '„Te rog, vorbește mai încet.”', '„Tu strici tot mereu!”'], 1, 'Cererea spune ce ar ajuta și în ce situație, fără să eticheteze persoana.'),
        Q('Cum verifică Teo dacă a înțeles mesajul?', ['„Vrei o pauză, am înțeles bine?”', '„Știu eu mai bine ce vrei.”', 'Vorbește peste colegul lui'], 0, 'Repetă mesajul ca întrebare, lăsând colegul să confirme sau să corecteze.')
      ],
      [
        Q('Ina ascultă și răspunde la întrebare, dar nu privește în ochi. Ce știm?', ['Sigur nu ascultă ce i se spune', 'Trebuie obligată să privească', 'Răspunsul arată că a ascultat'], 2, 'Privitul în ochi nu este o condiție obligatorie pentru ascultare.'),
        Q('Dan cere creionul. Mara spune: „Îl folosesc acum.” Ce răspuns respectă limita?', ['„Atunci îl iau fără voie.”', '„Bine. Pot întreba pe altcineva.”', '„Trebuie să mi-l dai.”'], 1, 'Mara poate refuza; Dan poate căuta o altă soluție fără presiune.'),
        Q('Un coleg spune: „Nu am cerut să mă ajuți, ci să lași puțin loc.” Ce face ascultătorul?', ['Corectează ce a înțeles și lasă spațiu', 'Insistă că știe el mai bine', 'Ia lucrarea colegului din mâini'], 0, 'Ascultarea include acceptarea unei corectări despre nevoia exprimată.')
      ],
      [
        Q('Mira are nevoie de liniște, iar Radu vrea să exerseze o poveste cu voce tare. Adultul permite două colțuri separate. Ce propunere ține seama de amândoi?', ['Mira trebuie să suporte orice zgomot', 'Radu nu mai are voie să vorbească deloc', 'Încearcă locurile separate și verifică'], 2, 'Soluția folosește spațiul permis și verifică nevoile ambilor copii.'),
        Q('Un copil spune „Sunt furios” și cere să lovească pe cineva. Ce răspuns deosebește emoția de faptă?', ['„Nu ai voie să simți furie.”', '„Poți fi furios, dar nu lovim.”', '„Dacă ești furios, poți lovi.”'], 1, 'Emoția nu este greșită; lovirea rănește, iar copilul poate primi sprijin pentru o alternativă.'),
        Q('Un coleg amenință că o va lovi pe Ana dacă ea cere ajutor. Ce este potrivit?', ['Ana pleacă și spune unui adult', 'Ana păstrează secretul ca să fie politicoasă', 'Ana rămâne să negocieze singură'], 0, 'Siguranța are prioritate față de continuarea discuției; amenințarea trebuie spusă unui adult.')
      ]
    ]), 'Cum îl ajută pe Dan întrebarea „Am înțeles bine?” înainte de a propune o soluție?'),
  L('civ', 15, 'Descopăr meserii și roluri în comunitate', '🏘️',
    'Să lege roluri din comunitate de contribuțiile descrise, fără stereotipuri',
    'O comunitate este un grup de oameni care trăiesc sau lucrează împreună. O meserie este o muncă pentru care oamenii învață și se pregătesc. Unele contribuții sunt roluri de voluntar sau de vecin, nu meserii. O persoană poate avea mai multe roluri. Genul nu stabilește ce meserie poate învăța cineva. Copiii pot explora prin povești și jocuri, fără să aleagă acum o meserie pentru toată viața.',
    'În poveste, Ana este șofer de autobuz și transportă călători. Mihai este asistent medical și îngrijește pacienți în echipa medicală. Duminică, Ana este și voluntar: citește povești la bibliotecă. Meseria ei și rolul de voluntar sunt contribuții diferite ale aceleiași persoane.',
    ['Desenează un autobuz și o bibliotecă. Pune personajul Ana lângă autobuz când vorbești despre meseria ei.', 'Mută același personaj lângă bibliotecă și spune ce face ca voluntar duminică: citește povești.', 'Desenează personajul Mihai și leagă-l de îngrijirea pacienților. Explică de ce nu alegem rolul după nume sau gen, ci după informația din poveste.'],
    ['Foi, creioane și cartonașe desenate; fără unelte reale de lucru sau medicamente.', 'Desenează o comunitate inventată și trei personaje: unul conduce autobuzul, unul repară cărți, unul ajută ca voluntar. Un adult poate scrie ce face fiecare.', 'Potrivește fiecare personaj cu contribuția scrisă. Adaugă unui personaj un al doilea rol și explică diferența. Explorați doar prin desen sau joc, fără să folosiți echipamente de meserie.'],
    'Nu ghicim meseria după haine, gen sau aspect. Mai multe meserii pot contribui la același rezultat. În joc, fiecare pereche folosește activitatea exact descrisă, nu spune că numai acea persoană o poate face.',
    Content.matching([
      [
        { a: 'Ana, șofer de autobuz în poveste', b: 'Transportă călători cu autobuzul.' },
        { a: 'Mihai, asistent medical în poveste', b: 'Îngrijește pacienți în echipa medicală.' },
        { a: 'Irina, bibliotecară în poveste', b: 'Ajută cititorii să găsească și să împrumute cărți.' },
        { a: 'Dan, pompier în poveste', b: 'Stinge incendiile și salvează oameni.' },
        { a: 'Elena, învățătoare în poveste', b: 'Îi ajută pe copii să învețe la școală.' },
        { a: 'Victor, brutar în poveste', b: 'Coace pâine pentru cartier.' },
        { a: 'Maria, poștaș în poveste', b: 'Aduce scrisori și colete la case.' },
        { a: 'Paul, medic veterinar în poveste', b: 'Îngrijește animalele bolnave.' }
      ],
      [
        { a: 'Roxana, mecanic: azi lucrează la o bicicletă', b: 'Repară frâna bicicletei în atelier.' },
        { a: 'Andrei, bucătar: azi pregătește supă', b: 'Gătește supa în bucătăria cantinei.' },
        { a: 'Dana, grădinar: azi îngrijește răsaduri', b: 'Îngrijește plantele tinere din grădina comunității.' },
        { a: 'Sorin, voluntar: azi citește copiilor', b: 'Oferă din timpul său pentru lectura de povești la bibliotecă.' },
        { a: 'Ioana, croitoreasă: azi coase un nasture', b: 'Coase nasturele căzut al unei haine.' },
        { a: 'Radu, electrician: azi lucrează la școală', b: 'Înlocuiește becul ars din clasă.' },
        { a: 'Cristina, farmacistă: azi explică o rețetă', b: 'Explică cum se ia medicamentul prescris de medic.' }
      ],
      [
        { a: 'Ana la serviciu, în autobuz', b: 'Rol de meserie: conduce autobuzul pentru călători.' },
        { a: 'Ana duminică, voluntar la bibliotecă', b: 'Rol de voluntar: citește povești, oferind din timpul său.' },
        { a: 'Mihai la serviciu, în echipa medicală', b: 'Rol de meserie: îngrijește pacienți ca asistent medical.' },
        { a: 'Mihai ca vecin: a promis să ude florile vecinei plecate', b: 'Rol de vecin: udă florile cu acordul vecinei.' },
        { a: 'Irina la bibliotecă: pregătește un împrumut de cărți', b: 'Rol de meserie: înregistrează cărțile împrumutate de cititor.' }
      ]
    ], [4, 4]), 'Cum poate aceeași persoană să aibă o meserie și un rol de voluntar? Folosește exemplul Anei.'),
  L('civ', 16, 'Pot să-mi schimb părerea', '🌱',
    'Să revizuiască o concluzie când apar dovezi noi, fără să se învinovățească',
    'Gândesc cu mintea mea când caut motive și verific, nu când spun mereu da sau mereu nu. Pot avea o idee la început și o pot schimba când apar dovezi potrivite. Pot și să păstrez o concluzie susținută, dacă aud doar o presiune sau o preferință. O greșeală nu mă face mai puțin valoros.',
    'Dan crede că într-un săculeț sunt șase jetoane. Îl golește pe tavă și numără cinci, apoi verifică dacă a rămas unul înăuntru: săculețul este gol. Spune: „Am crezut că sunt șase. Acum am numărat cinci. Îmi schimb răspunsul.” Nu a pierdut un concurs; a învățat ceva.',
    ['Desenează săculețul gol și cele cinci jetoane de pe tavă.', 'Joacă replica lui Dan: spune ideea de la început, apoi ce a verificat.', 'Explică de ce Dan își poate schimba răspunsul fără să fie rușinat.'],
    ['Cinci jetoane mari sau cinci cercuri desenate, o tavă și o foaie; un adult pregătește obiectele.', 'Un personaj ghicește șase. Altul numără pe tavă, verifică săculețul și arată cinci.', 'Spuneți pe rând „Am crezut…, am verificat…, acum cred…”. Nu este nevoie să greșești intenționat sau să povestești despre tine.'],
    'Nu trebuie să îmi schimb părerea doar ca să plac cuiva. Nici încăpățânarea, nici acordul automat nu înlocuiesc verificarea. Nu sunt obligat să am un răspuns imediat.',
    Content.quiz([
      [
        Q('Dan a crezut că sunt șase jetoane. Numără cinci și verifică săculețul gol. Ce poate spune?', ['„Rămân la șase, fiindcă așa am spus.”', '„Am verificat: sunt cinci. Îmi schimb răspunsul.”', '„Nu mai am voie să încerc.”'], 1, 'Dan folosește verificarea ca să corecteze răspunsul; o greșeală nu îl împiedică să învețe.'),
        Q('Ina nu are destule informații ca să aleagă o explicație. Ce poate spune?', ['„Orice ghicesc este sigur.”', '„Trebuie să copiez imediat răspunsul cuiva.”', '„Nu știu încă; caut informații.”'], 2, 'Poate lăsa întrebarea deschisă până găsește informații potrivite.'),
        Q('Mara află că a citit greșit un număr. Ce spune greșeala despre ea?', ['Că poate corecta și învăța', 'Că toate ideile ei sunt greșite', 'Că nu mai trebuie ascultată'], 0, 'O eroare privește un răspuns, nu valoarea persoanei sau toate ideile ei.')
      ],
      [
        Q('Teo a măsurat o bandă de 8 cm. Un prieten spune: „Zi că are 10 cm, ca mine!”, fără să măsoare. Ce este potrivit?', ['Să schimbe numărul ca să nu piardă prietenia', 'Să propună o nouă măsurare', 'Să îl jignească pe prieten'], 1, 'O cerere de acord nu este o dovadă despre lungime. O nouă măsurare poate clarifica.'),
        Q('Lia credea că programul începe la nouă. Biblioteca confirmă un anunț actual: începe la zece. Ce motiv are Lia să își revizuiască răspunsul?', ['Anunțul este mai colorat', 'Lia trebuie să fie de acord cu oricine', 'Informația actuală și confirmarea privesc exact programul căutat'], 2, 'Motivul este informația relevantă și actuală, nu nevoia de a mulțumi pe cineva.'),
        Q('Un adult spune „Ai dreptate, am numărat greșit”. Ce arată?', ['Că și adulții își pot corecta răspunsul', 'Că adultul nu mai poate ști nimic', 'Că a corecta o greșeală este rușinos'], 0, 'Recunoașterea unei erori este un model de învățare, nu pierderea valorii persoanei.')
      ],
      [
        Q('Ina credea că un cartonaș este albastru. La lumină bună vede că este verde și un coleg confirmă privind același cartonaș. Ce replică explică schimbarea?', ['„Spun verde fiindcă nu vreau întrebări.”', '„La lumină bună văd altă culoare.”', '„Prima idee trebuie păstrată mereu.”'], 1, 'Ina spune ce informație nouă a schimbat observația.'),
        Q('Dan și Mara au măsurători diferite și observă că o riglă este ruptă la capăt. Ce fac înainte de o concluzie?', ['Votează cine este mai popular', 'Decid că măsurarea nu folosește niciodată', 'Repetă măsurarea cu o riglă întreagă'], 2, 'Verifică metoda și instrumentul, în loc să aleagă o persoană pe care să o creadă automat.'),
        Q('Un grup spune că tuturor trebuie să le placă aceeași poveste. Ina preferă alta. Trebuie să își schimbe gustul ca să arate că poate învăța?', ['Nu; o preferință diferită nu este o greșeală', 'Da, fiindcă grupul este mai mare decât ea', 'Da, orice dezacord înseamnă că e încăpățânată'], 0, 'Schimbarea unei concluzii după dovezi este diferită de obligarea cuiva să aibă gustul grupului.')
      ]
    ]), 'Ce l-a ajutat pe Dan să își schimbe răspunsul: verificarea sau dorința de a fi ca ceilalți?'),
  L('civ', 17, 'Nu sunt de acord și pot explica de ce', '💬',
    'Să exprime un dezacord respectuos, inclusiv cu un adult, și să recunoască limitele de siguranță',
    'Pot să nu fiu de acord cu un copil sau cu un adult. Spun despre ce idee vorbesc și motivul meu: „Eu cred altfel, pentru că… Putem verifica împreună?” Ascult și răspunsul, fără să fiu obligat să îl accept. Respectul înseamnă să nu jignim sau amenințăm, nu să spunem mereu da. Nu trebuie să continui o discuție în care mă simt în pericol.',
    'Un adult spune: „Pe tavă sunt cinci creioane.” Ana numără patru și spune: „Eu număr patru. Putem număra împreună?” Adultul ascultă, verifică și răspunde: „Ai dreptate, sunt patru. Mulțumesc că ai arătat.” Dacă discută despre povestea preferată, pot rămâne cu preferințe diferite.',
    ['Desenează patru creioane și două personaje: un copil și un adult.', 'Joacă replica Anei: spune că numeri patru și propune să verificați împreună.', 'Schimbați rolurile. Adultul ascultă fără pedeapsă, verifică și poate recunoaște că a greșit.'],
    ['Patru creioane desenate și două personaje de hârtie; un adult dispus să joace ambele roluri.', 'Exersați dezacordul despre număr folosind „Eu observ…” și „Putem verifica?”. Apoi inventați două preferințe de poveste diferite.', 'Lăsați personajele să păstreze gusturi diferite. Oricine poate opri jocul; copilul nu trebuie să câștige o dispută sau să vă povestească un conflict real.'],
    'Pot explica fără să conving pe toată lumea. Dacă sunt amenințat sau rănit, mă îndepărtez spre siguranță și cer ajutor altui adult de încredere; nu trebuie să găsesc replica perfectă. Pot întreba de ce există o regulă de siguranță, dar nu o testez punându-mă în pericol.',
    Content.quiz([
      [
        Q('Un adult spune cinci creioane, iar Ana numără patru. Care replică arată dezacordul fără jignire?', ['„Tu nu știi nimic!”', '„Eu număr patru. Putem verifica împreună?”', '„Spun cinci, deși văd patru, fiindcă ești adult.”'], 1, 'Ana își spune observația și propune verificarea. Nu trebuie să fie de acord doar pentru că vorbește cu un adult.'),
        Q('Doi copii preferă povești diferite. Cum pot încheia discuția?', ['Unul trebuie să fie declarat greșit', 'Cel mai tare decide gustul celuilalt', 'Pot păstra preferințe diferite'], 2, 'Nu orice dezacord are nevoie de un câștigător; gusturile pot rămâne diferite.'),
        Q('Care replică vorbește despre idee, nu atacă persoana?', ['„Nu sunt de acord: am numărat patru.”', '„Ești prost și nu știi să numeri.”', '„Nimeni nu ar trebui să te asculte.”'], 0, 'Putem contesta răspunsul și explica motivul fără să jignim persoana.')
      ],
      [
        Q('Un coleg nu este de acord cu Mara. Ce poate întreba Mara ca să înțeleagă motivul?', ['„De ce nu spui ce vreau eu?”', '„Ce ai observat tu?”', '„Cum îndrăznești să gândești altfel?”'], 1, 'Întrebarea invită explicația. A asculta nu o obligă pe Mara să accepte concluzia.'),
        Q('Un adult spune: „Sunt mai mare, deci numărul meu este sigur corect.” Ce ar verifica afirmația despre creioane?', ['Vârsta adultului', 'Cât de hotărât vorbește', 'Numărarea creioanelor împreună'], 2, 'Vârsta nu stabilește câte creioane sunt. Adultul are responsabilitatea să permită verificarea fără pedeapsă.'),
        Q('Un personaj spune: „Dacă nu ești de acord, te lovesc.” Ce are prioritate pentru copil?', ['Să plece și să ceară ajutor unui adult', 'Să rămână singur cu el până îl convinge', 'Să caute o replică politicoasă cu orice preț'], 0, 'Amenințarea nu este o dezbatere. Siguranța este mai importantă decât continuarea discuției.')
      ],
      [
        Q('Copilul arată o greșeală reală de numărare a adultului. Ce răspuns al adultului sprijină gândirea independentă?', ['„Nu ai voie să mă contrazici.”', '„Hai să verificăm. Ai dreptate, am greșit.”', '„Îți retrag jocul fiindcă ai alt răspuns.”'], 1, 'Adultul ascultă și corectează fără să pedepsească dezacordul sau să ceară supunere.'),
        Q('După o discuție calmă despre preferințe, ceilalți nu își schimbă părerea. A eșuat copilul?', ['Da, trebuie să îi convingă pe toți', 'Da, trebuie să își retragă gustul', 'Nu; poate rămâne cu altă preferință'], 2, 'A gândi independent nu înseamnă a câștiga fiecare discuție.'),
        Q('Copilul întreabă de ce nu traversează pe roșu. Cum poate învăța fără să se pună în pericol?', ['Cere explicația, rămânând pe trotuar', 'Pășește pe carosabil ca să testeze regula', 'Crede că nu mai are voie să pună întrebări'], 0, 'Poate cere motive pentru o regulă, fără să o testeze printr-un comportament periculos.')
      ]
    ]), 'Cum poate Ana să arate ce a observat fără să fie obligată să accepte răspunsul adultului?')
];

const REVIEW_QUESTIONS = {
  'mat-5': [
    [Q('Cum așezăm agrafele când măsurăm cu ele?', ['Una lângă alta, fără spații', 'Cu spații mari între ele', 'Unele peste altele, suprapuse'], 0, 'Unitatea trebuie repetată continuu, fără a număra aceeași lungime de două ori.'),
      Q('Ce comparăm direct pentru două creioane?', ['Lungimi măsurate în aceeași unitate', 'Culoarea', 'Numărul de litere din nume'], 0, 'Aceeași unitate permite o comparație corectă.')],
    [Q('O panglică de 8 cm este prelungită cu 5 cm. Cât măsoară?', ['13 cm', '3 cm', '85 cm'], 0, 'Adunăm lungimile: 8 + 5 = 13 cm.'),
      Q('Un creion măsoară cât 6 agrafe mici puse cap la cap. Alt creion măsoară cât 5 agrafe mai mari. Aflăm care creion este mai lung comparând doar 6 cu 5?', ['Nu, agrafele au mărimi diferite', 'Da, întotdeauna', 'Da, dacă agrafele au aceeași culoare'], 0, 'Pentru a compara direct numerele, trebuie să folosim agrafe de aceeași mărime.')],
    [Q('Tai 4 cm dintr-o panglică de 17 cm. Apoi tai încă 3 cm. Cât rămâne?', ['10 cm', '13 cm', '14 cm'], 0, '17 − 4 = 13, apoi 13 − 3 = 10 cm.'),
      Q('Un obiect începe la 5 cm și se termină la 12 cm. Altul măsoară 8 cm. Care este mai lung?', ['Al doilea, cu 1 cm', 'Primul, cu 4 cm', 'Sunt egale'], 0, 'Primul are 12 − 5 = 7 cm; al doilea este cu 1 cm mai lung.')]
  ],
  'mat-12': [
    [Q('Două bucăți inegale ale unui întreg sunt două jumătăți?', ['Nu', 'Da', 'Doar dacă sunt colorate'], 0, 'Jumătățile trebuie să fie părți egale ale aceluiași întreg.'),
      Q('Câte jumătăți formează un întreg?', ['2', '4', '1'], 0, 'Două jumătăți reunite refac întregul.')],
    [Q('Ai un sfert dintr-o foaie. Câte sferturi mai lipsesc pentru întreg?', ['3', '2', '1'], 0, 'Întregul are 4 sferturi; 4 − 1 = 3.'),
      Q('Împarți în jumătate fiecare dintre două jumătăți. Ce obții?', ['Patru sferturi', 'Două sferturi', 'Patru întregi'], 0, 'Fiecare jumătate dă două sferturi, deci obținem patru.')],
    [Q('Ai trei sferturi dintr-o foaie. Dai un sfert. Cât păstrezi?', ['O jumătate', 'Un întreg', 'Un sfert'], 0, 'Rămân două sferturi, adică o jumătate.'),
      Q('O jumătate dintr-o foaie mare și o jumătate dintr-o foaie mică au sigur aceeași suprafață?', ['Nu, întregii diferă', 'Da, sunt jumătăți', 'Da, dacă au aceeași culoare'], 0, 'Mărimea unei părți depinde și de mărimea întregului.')]
  ],
  'lim-1': [
    [Q('Spui „mmm” la începutul lui „măr”. Ce este „mmm”?', ['Un sunet', 'O literă', 'O silabă'], 0, '„Mmm” se aude: este un sunet. Litera m este semnul scris.'),
      Q('Pe tablă este scris semnul m. Ce vezi?', ['O literă', 'Un sunet', 'O silabă'], 0, 'Semnul scris este o literă. Sunetul îl auzi când citești.')],
    [Q('Care pereche de litere notează același sunet?', ['â și î', 'a și ă', 'i și e'], 0, 'Â și î sunt litere diferite pentru același sunet.'),
      Q('Câte litere scriem în „măr”?', ['3', '2', '4'], 0, 'Scriem m, ă, r: trei litere.')],
    [Q('Litera m se numește „em”. Auzim și e la începutul cuvântului „măr”?', ['Nu', 'Da', 'Doar dacă scriem M mare'], 0, 'În „măr” auzim la început m, fără e. Numele literei nu este același lucru cu sunetul din cuvânt.'),
      Q('În „cheie”, c și h notează împreună primul sunet. Ce ne ajută să găsim sunetele?', ['Să ascultăm cuvântul', 'Să numărăm doar literele', 'Să privim mărimea literelor'], 0, 'Ascultăm cuvântul: uneori mai multe litere notează împreună un sunet.')]
  ],
  'lim-9': [
    [Q('„Ana citește o carte” oferă o informație obișnuită. Alegem…', ['.', '?', ','], 0, 'Punctul încheie această comunicare.'),
      Q('„Cine bate la ușă” este…', ['o întrebare', 'un răspuns sigur', 'o enumerare'], 0, 'Cuvântul „cine” cere aici o informație.')],
    [Q('Care este o întrebare?', ['Când plecăm?', 'Plecăm acum.', 'Drum bun!'], 0, '„Când plecăm?” cere informații despre moment.'),
      Q('Ce variantă exprimă aici o urare?', ['La mulți ani!', 'La mulți ani?', 'La, mulți, ani'], 0, 'Semnul exclamării poate marca o urare rostită cu emoție.')],
    [Q('Vrei să afli, nu să anunți, dacă Dan vine. Alegi…', ['Dan vine?', 'Dan vine.', 'Dan, vine.'], 0, 'Semnul întrebării transformă enunțul într-o cerere de informație.'),
      Q('Care pereche transmite mesaje diferite prin semnul final?', ['Vii. / Vii?', 'Vii. / Vii.', 'Vii? / Vii?'], 0, 'Prima variantă anunță; a doua întreabă.')]
  ],
  'lim-10': [
    [Q('Alege începutul corect al unui enunț.', ['Mara merge.', 'mara merge.', 'mARA merge.'], 0, 'Numele propriu și începutul propoziției se scriu cu literă mare.'),
      Q('Completează enunțul: „Mara merge la …”.', ['școală', 'scoală', 'școalaă'], 0, 'Pentru locul unde învățăm, forma cerută este „școală”, cu ș și ă.')],
    [Q('Alege forma potrivită: „Noi … în parc.”', ['mergem', 'merge', 'mergi'], 0, 'Pentru „noi” folosim „mergem”.'),
      Q('Alege enunțul corect.', ['Copiii sunt triști.', 'Copiii sunt trisți.', 'Copiii este triști.'], 0, 'Pluralul cere „sunt”, iar forma corectă este „triști”.')],
    [Q('Alege varianta corectă.', ['Câți pui sunt în curte?', 'Câte pui sunt în curte?', 'Câți pui este în curte?'], 0, '„Pui” cere „câți”, iar pluralul se acordă cu „sunt”.'),
      Q('Vorbim despre mai mulți copii. Ce enunț este corect?', ['Copiii desenează o casă.', 'Copiii desenezi o casă.', 'Copiii desenez o casă.'], 0, 'Spunem „copiii desenează”, la fel ca „ei desenează”.')]
  ],
  'inf-2': [
    [Q('Când scrii, liniuța care clipește arată locul scrierii. Ce tastă șterge litera din stânga ei?', ['Backspace', 'Spațiu', 'Caps Lock'], 0, 'Acea liniuță se numește cursor de text. Backspace șterge de obicei litera sau semnul din stânga lui.'),
      Q('Ce comandă poate selecta un obiect cu mouse-ul?', ['Un clic', 'Scuturarea mouse-ului', 'Apăsarea pe masă'], 0, 'În multe programe, un clic alege obiectul spre care arată săgeata mouse-ului.')],
    [Q('Cum observi ce buton ai ales cu Tab?', ['Printr-un contur în jurul butonului', 'Doar după culoarea mouse-ului', 'Nu se poate observa deloc'], 0, 'Un contur sau alt semn vizibil trebuie să arate ce element poți folosi acum cu tastatura.'),
      Q('Ce tastă poate apăsa butonul ales cu Tab?', ['Enter', 'Caps Lock', 'Backspace'], 0, 'După ce ai ales butonul cu Tab, îl poți apăsa cu Enter sau Spațiu.')],
    [Q('Un coleg folosește mouse-ul cu mâna stângă. Ce este potrivit?', ['Poate adapta setările butonului principal', 'Trebuie să folosească obligatoriu dreapta', 'Nu poate folosi calculatorul'], 0, 'Setările și dispozitivele pot fi adaptate utilizatorului.'),
      Q('Un buton poate fi folosit cu mouse-ul, dar deloc cu tastatura. Ce este potrivit să faci?', ['Cer ajutor unui adult și îi arăt problema', 'Mă învinovățesc', 'Cred că nimeni nu are nevoie de tastatură'], 0, 'Butoanele trebuie să poată fi folosite și cu tastatura. Dacă nu poți folosi unul, poate fi o problemă a paginii, nu o greșeală a ta.')]
  ],
  'log-5': [
    [Q('Sunt două cutii: una cu mere și una cu pere. Cea din stânga nu are mere. Ce are?', ['Pere', 'Mere', 'Nimic, sigur'], 0, 'Din cele două variante, indiciul exclude merele.'),
      Q('Lia este mai înaltă decât Dan. Cine este mai scund?', ['Dan', 'Lia', 'Nu există diferență'], 0, 'Relația dată arată că Dan este mai scund decât Lia.')],
    [Q('Radu este după Ina, iar Ina este după Mara. Cine este ultimul?', ['Radu', 'Ina', 'Mara'], 0, 'Ordinea este Mara, Ina, Radu.'),
      Q('Trei cartonașe au numerele 2, 4 și 6. Caut numărul mai mare decât 3 și mai mic decât 5.', ['4', '2', '6'], 0, 'Doar 4 respectă ambele limite.')],
    [Q('Un obiect este roșu sau albastru. Este și rotund. Știm sigur culoarea?', ['Nu, forma nu elimină o culoare', 'Da, e sigur roșu, fiind rotund', 'Da, e sigur albastru, fiind rotund'], 0, 'Indiciul despre formă nu decide între cele două culori.'),
      Q('Ana este înaintea lui Dan. Despre Lia nu știm nimic. Putem ordona sigur toți trei?', ['Nu, lipsesc informații despre Lia', 'Da, Lia este ultima', 'Da, Lia este prima'], 0, 'Relația dintre Ana și Dan nu fixează poziția Liei.')]
  ]
};
const ORDER_PRACTICE = {
  'lim-3': [
    O('Reconstruiește: Dan aleargă.', ['Dan', 'aleargă.'], 'Mesajul numește persoana și acțiunea.'),
    O('Reconstruiește: Maria udă o floare.', ['Maria', 'udă', 'o', 'floare.'], 'Propoziția are sens și semn final.'),
    O('Reconstruiește întrebarea: Unde a pus Ina cartea?', ['Unde', 'a', 'pus', 'Ina', 'cartea?'], 'Întrebarea cere locul cărții.')
  ],
  'inf-3': [
    O('Urmează planul: sus, apoi dreapta.', ['Sus', 'Dreapta'], 'Ordinea cerută se verifică pas cu pas.'),
    O('Reconstruiește planul pentru un desen: aleg foaia, desenez, colorez, expun.', ['Aleg foaia', 'Desenez', 'Colorez', 'Expun'], 'Acesta este planul indicat; alte desene pot avea alte proceduri.'),
    O('Reconstruiește testarea: aleg ținta, scriu, prezic, rulez, compar.', ['Aleg ținta', 'Scriu programul', 'Prezic rezultatul', 'Rulez', 'Compar'], 'Predicția este făcută înainte de rulare.')
  ],
  'inf-6': [
    O('Rutina aleasă: deschid cartea, citesc, o închid.', ['Deschid cartea', 'Citesc', 'Închid cartea'], 'Acesta este planul specific din cerință.'),
    O('Planul de plecare: verific vremea, aleg încălțămintea, mă încalț, plec.', ['Verific vremea', 'Aleg încălțămintea', 'Mă încalț', 'Plec'], 'Alegerea se bazează pe informația verificată.'),
    O('Rutina de proiect: aleg, pregătesc, lucrez, verific, strâng.', ['Aleg proiectul', 'Pregătesc materialele', 'Lucrez', 'Verific rezultatul', 'Strâng materialele'], 'Planul include verificare și grijă față de spațiul de lucru.')
  ],
  'sci-8': [
    O('Traseul ales: gheață, apă lichidă, vapori.', ['Gheață', 'Apă lichidă', 'Vapori'], 'Prin încălzire pot avea loc topirea și apoi evaporarea.'),
    O('Drumul ales: apă de ploaie, râu, mare, evaporare.', ['Apă de ploaie', 'Râu', 'Mare', 'Evaporare'], 'Acesta este unul dintre traseele posibile ale apei.'),
    O('Reconstruiește observația: așez paharul rece, aerul din jur se răcește, vaporii se condensează, apar picături, picăturile se adună.', ['Așez paharul rece', 'Aerul din jur se răcește', 'Vaporii se condensează', 'Apar picături pe exterior', 'Picăturile se adună'], 'Dacă aerul de lângă pahar este suficient de rece, vaporii din el se transformă în picături. Apa nu trece prin sticlă.')
  ]
};
/* Întrebări suplimentare: se adaugă la setul fiecărui nivel, iar EXTRA_ROUNDS spune câte
   se aleg la un joc. Astfel, o reluare aduce alte întrebări. */
const EXTRA_QUESTIONS = {
  'log-5': [
    [Q('Pisica este pe pat sau pe covor. Nu este pe pat. Unde este?', ['Pe covor', 'Pe pat', 'Sub masă'], 0, 'Sunt doar două locuri, iar patul este eliminat. Rămâne covorul.'),
      Q('Am un fruct galben: o banană sau o cireașă. Ce am?', ['O banană', 'O cireașă', 'Un măr'], 0, 'Cireașa este roșie, deci rămâne banana.'),
      Q('Dan are mai multe bile decât Ana. Cine are mai puține?', ['Ana', 'Dan', 'Au la fel'], 0, 'Dacă Dan are mai multe, Ana are mai puține.')],
    [Q('Mara stă între Ion și Lia. Ion este primul. Cine este ultima?', ['Lia', 'Mara', 'Ion'], 0, 'Ion este primul, Mara la mijloc, deci Lia este ultima.'),
      Q('Caut un număr par între 1 și 5, dar nu 2. Ce număr este?', ['4', '3', '6'], 0, 'Numerele pare între 1 și 5 sunt 2 și 4. Fără 2, rămâne 4.'),
      Q('Câinele este mai mare decât pisica, iar pisica este mai mare decât șoarecele. Care este cel mai mic?', ['Șoarecele', 'Pisica', 'Câinele'], 0, 'Câinele, apoi pisica, apoi șoarecele: șoarecele este cel mai mic.')],
    [Q('Ana, Dan și Ion au o minge, o carte și o păpușă. Ana nu are mingea. Dan are cartea. Ce are Ana?', ['Păpușa', 'Mingea', 'Cartea'], 0, 'Cartea este a lui Dan, iar Ana nu are mingea. Îi rămâne păpușa.'),
      Q('Toate florile din vază sunt galbene. Este în vază o floare roșie?', ['Nu, toate sunt galbene', 'Da, una singură', 'Poate, dacă e mică'], 0, 'Dacă toate sunt galbene, nicio floare nu este roșie.'),
      Q('Ion este mai înalt decât Dan. Lia este mai înaltă decât Ion. Cine este cel mai înalt?', ['Lia', 'Ion', 'Dan'], 0, 'Lia, apoi Ion, apoi Dan: Lia este cea mai înaltă.')]
  ],
  'log-11': [
    [Q('Dan vede o umbrelă udă lângă ușă. Ce a observat?', ['Umbrela este udă', 'Afară plouă sigur', 'Mama a venit acasă'], 0, 'Umbrela udă se vede. Ploaia și cine a venit sunt doar presupuneri.'),
      Q('Ina vede firimituri pe masă. Ce poate spune sigur?', ['Pe masă sunt firimituri', 'Fratele a mâncat biscuiți', 'Cineva a fost neatent'], 0, 'Firimiturile se văd. Cine le-a lăsat nu se vede.'),
      Q('Mara aude lătrat afară. Ce știe sigur?', ['A auzit un lătrat', 'Câinele vecinului latră', 'Vine poștașul'], 0, 'Lătratul se aude. Al cui câine este și de ce latră nu știm încă.')],
    [Q('Fereastra este deschisă și pe jos sunt frunze. Radu spune: „Vântul le-a adus.” Ce este afirmația lui?', ['O presupunere de verificat', 'O observație sigură', 'O regulă pentru orice cameră'], 0, 'Radu leagă două observații printr-o explicație. Poate fi adevărată, dar trebuie verificată.'),
      Q('Un coleg lipsește. Ana spune: „E bolnav.” Ce întrebare ajută?', ['„Cum aflăm de ce lipsește?”', '„Cine e cel mai bolnav?”', '„De ce lipsește mereu?”'], 0, 'Ana face o presupunere. O întrebare de verificare ne ajută să aflăm.'),
      Q('Pe tablă scrie „Ziua lui Dan!”. Ce putem spune sigur?', ['Pe tablă scrie un mesaj', 'Dan are azi tort', 'Dan este foarte fericit'], 0, 'Mesajul de pe tablă se vede. Tortul și ce simte Dan sunt presupuneri.')],
    [Q('Teo vede ghiozdanul Linei în clasă, dar nu o vede pe Lina. Ce poate spune sigur?', ['Ghiozdanul ei este aici', 'Lina e sigur în curte', 'Lina a plecat sigur acasă'], 0, 'Ghiozdanul se vede. Unde este Lina acum nu știm încă.'),
      Q('Doi copii dau explicații diferite pentru o pată pe covor. Ce faceți?', ['Căutăm împreună alte indicii', 'Alegem explicația celui mai mare', 'Spunem că ambele sunt sigure'], 0, 'Când explicațiile diferă, căutăm informații care le pot verifica.'),
      Q('Dan crede că pisica e în dulap, fiindcă a auzit un zgomot. Deschide și vede o carte căzută. Ce face?', ['Își schimbă explicația', 'Spune că pisica a fugit', 'Uită de cartea căzută'], 0, 'O observație nouă poate schimba o presupunere. Asta înseamnă să gândești atent.')]
  ],
  'log-12': [
    [Q('Care propoziție arată ce îi place cuiva?', ['„Îmi place iarna.”', '„Azi ninge.”', '„Azi este luni.”'], 0, '„Îmi place” arată ce simte cineva. Nu se verifică prin numărare sau măsurare.'),
      Q('Care propoziție se poate verifica privind?', ['„Mingea este roșie.”', '„Mingea e cea mai frumoasă.”', '„Prefer mingea mare.”'], 0, 'Culoarea se poate vedea și verifica. „Frumoasă” și „prefer” sunt păreri.'),
      Q('Lui Radu îi place supa, Linei nu. Cine greșește?', ['Niciunul dintre ei', 'Radu greșește', 'Lina greșește'], 0, 'Gusturile pot fi diferite. Nimeni nu greșește pentru că îi place altceva.')],
    [Q('„Pisica mea e cea mai drăgălașă și are trei pete.” Ce parte putem verifica?', ['Că are trei pete', 'Că e cea mai drăgălașă', 'Că trebuie să ne placă'], 0, 'Petele se pot număra; „cea mai drăgălașă” este o părere.'),
      Q('Mama spune: „Ploaia e plictisitoare.” Ce este afirmația ei?', ['O părere a mamei', 'Un fapt verificat', 'O regulă pentru toți'], 0, 'Mama spune ce simte ea despre ploaie. Altcuiva ploaia poate să-i placă.'),
      Q('Cum verifici afirmația „Clasa are 20 de bănci”?', ['Număr băncile', 'Întreb care bancă e preferată', 'Ghicesc după mărimea clasei'], 0, 'O afirmație despre un număr se verifică numărând.')],
    [Q('Un afiș spune: „Cea mai gustoasă înghețată are trei straturi.” Ce poți verifica?', ['Dacă are trei straturi', 'Dacă e cea mai gustoasă', 'Dacă toți o preferă'], 0, 'Straturile se pot număra; gustul este o preferință.'),
      Q('Ana spune: „Câinii sunt mai buni decât pisicile.” Se poate dovedi?', ['Nu, este o preferință', 'Da, printr-un vot', 'Da, dacă spune tare'], 0, 'Este o preferință. Un vot ar arăta ce preferă grupul, nu ce este adevărat pentru toți.'),
      Q('Opt copii spun că desenul e frumos, doi că nu. Ce aflăm?', ['Ce preferă copiii din grup', 'Că desenul e sigur frumos', 'Că doi copii greșesc'], 0, 'Răspunsurile arată preferințele grupului, nu un fapt despre desen.')]
  ],
  'log-13': [
    [Q('Vrei să afli dacă plouă afară. Ce dovadă ajută?', ['Mă uit pe fereastră', 'Întreb ce culoare preferă colegul', 'Ghicesc după ziua săptămânii'], 0, 'Privind afară, vezi direct dacă plouă.'),
      Q('Vrei să știi care cană e mai grea. Ce faci?', ['Le cântăresc pe amândouă', 'Aleg cana mai frumoasă', 'Întreb cine a cumpărat-o'], 0, 'Greutatea se compară cântărind.'),
      Q('Ion spune că a câștigat pentru că a strigat primul. Ce dovadă lipsește?', ['Rezultatul jocului', 'O voce mai puternică', 'Un tricou nou'], 0, 'Strigatul nu arată cine a câștigat; rezultatul jocului arată.')],
    [Q('Trei copii spun că apa e rece. Ce dovadă ar fi mai sigură?', ['Un termometru pus în apă', 'Încă un copil care repetă', 'Culoarea paharului cu apă'], 0, 'Termometrul măsoară temperatura; o vorbă repetată nu adaugă o dovadă.'),
      Q('Ina a numărat 9 nasturi, iar Dan a numărat 10. Ce faceți?', ['Numărăm din nou împreună', 'Alegem numărul mai mare', 'Îl credem pe cel mai mare'], 0, 'O nouă numărare atentă arată care număr este corect.'),
      Q('Un copil spune că o plantă crește mai bine dacă e udată cu lapte. Ce ar ajuta?', ['Un test cu două plante la fel', 'Faptul că laptele este alb', 'Ce cred prietenii lui despre lapte'], 0, 'Un test corect compară două plante la fel, schimbând doar ce udăm.')],
    [Q('Un film arată un animal care vorbește. Este o dovadă că animalele vorbesc?', ['Nu, filmele pot inventa', 'Da, se vede în film', 'Da, dacă filmul e colorat'], 0, 'Filmele pot fi povești inventate; nu sunt dovezi despre lumea reală.'),
      Q('Ai măsurat o singură dată și rezultatul pare ciudat. Ce faci?', ['Măsor din nou', 'Șterg rezultatul', 'Spun că e sigur corect'], 0, 'Repetarea ne arată dacă rezultatul se confirmă.'),
      Q('Doi copii spun lucruri diferite. Unul arată și o măsurătoare. Ce verificăm întâi?', ['Măsurătoarea arătată', 'Cine vorbește mai mult', 'Cine este mai înalt'], 0, 'Măsurătoarea este o dovadă pe care o putem verifica și repeta.')]
  ],
  'log-14': [
    [Q('Vrei să afli când începe filmul la cinema. Unde te uiți?', ['Pe programul cinematografului', 'Pe un afiș de anul trecut', 'Pe ce crede un prieten'], 0, 'Programul actual al cinematografului este sursa care știe ora.'),
      Q('Un coleg spune: „Am auzit că mâine nu avem școală.” Ce faci?', ['Întreb un adult care știe', 'Rămân acasă mâine', 'Spun tuturor că e sigur'], 0, 'Un zvon se verifică la cineva care știe: învățătoarea sau părinții.'),
      Q('Cine știe sigur ce lecții aveți mâine?', ['Învățătoarea', 'Un copil din altă școală', 'Vânzătorul de la magazin'], 0, 'Învățătoarea face orarul clasei, deci știe.')],
    [Q('Un anunț nu are dată. Ce întrebare pui?', ['„Când a fost scris?”', '„Ce culoare are?”', '„Cât de mare e?”'], 0, 'Data ne spune dacă informația mai este valabilă azi.'),
      Q('Bunicul crede că parcul se închide la 8, dar nu e sigur. Ce faceți?', ['Citim panoul de la intrare', 'Credem amintirea lui', 'Nu mai mergem în parc'], 0, 'O amintire nesigură se verifică la o sursă actuală.'),
      Q('Un mesaj spune: „Trimite-l la zece prieteni sau ai ghinion!” Este de încredere?', ['Nu, nu arată nicio dovadă', 'Da, fiindcă este scris', 'Da, fiindcă e de la un prieten'], 0, 'Mesajele care sperie fără dovezi nu sunt de încredere. Arată-l unui adult.')],
    [Q('Două site-uri spun același lucru, dar unul l-a copiat de la celălalt. Câte surse ai de fapt?', ['Una', 'Două', 'Niciuna'], 0, 'Dacă unul copiază, informația vine de fapt dintr-un singur loc.'),
      Q('O poză arată un pește uriaș. Poza ar putea fi modificată. Ce faci?', ['Caut cine explică poza', 'O trimit ca sigur reală', 'O cred fiindcă e poză'], 0, 'Pozele pot fi modificate; căutăm de unde vine și cine o explică.'),
      Q('Un adult spune o informație greșită, apoi o corectează. Ce arată asta?', ['Oricine poate greși și corecta', 'Adultul nu mai știe nimic', 'Nu mai avem voie să întrebăm'], 0, 'Oricine poate greși. Corectarea unei greșeli este un lucru bun.')]
  ],
  'civ-10': [
    [Q('Ion termină puzzle-ul fără să renunțe. Ce calitate arată?', ['Răbdare', 'Grabă', 'Supărare'], 0, 'Ion lucrează până la capăt, fără să renunțe: arată răbdare.'),
      Q('Ce poate fi un interes?', ['Îmi place să desenez animale', 'Am ochi căprui și păr negru', 'Am șapte ani împliniți'], 0, 'Un interes este ceva ce îți place să faci sau să afli.'),
      Q('Lia spune: „Prefer fotbalul.” Ce aflăm?', ['Ce sport îi place ei', 'Că fotbalul e cel mai bun', 'Că toți trebuie să joace'], 0, 'O preferință spune ce îi place unei persoane, nu ce trebuie să le placă tuturor.')],
    [Q('Dan ajută un coleg să-și găsească penarul. Ce calitate arată?', ['Grijă față de ceilalți', 'Neatenție la ce face', 'Grabă să termine repede'], 0, 'Când ajutăm pe cineva, arătăm grijă față de ceilalți.'),
      Q('Ana se pricepe la desen, dar îi e greu la alergat. Ce este adevărat?', ['Fiecare are lucruri de exersat', 'Ana nu se pricepe la nimic', 'Ana trebuie să renunțe la sport'], 0, 'Toți avem puncte tari și lucruri pe care le exersăm.'),
      Q('Care propoziție descrie o calitate, nu un lucru pe care îl ai?', ['Sunt curajos', 'Am o bicicletă', 'Am un ghiozdan nou'], 0, 'Curajul este o calitate; bicicleta și ghiozdanul sunt obiecte.')],
    [Q('Mara spunea că nu-i place supa de dovleac, dar acum îi place. Ce arată?', ['Preferințele se pot schimba', 'Mara spune o minciună', 'Gusturile nu se schimbă'], 0, 'Preferințele se pot schimba în timp; asta e firesc.'),
      Q('Radu e timid la o petrecere, dar vorbește mult cu prietenii. Ce putem spune?', ['Se poartă diferit în locuri diferite', 'Este mereu timid, oriunde ar fi', 'Nu are deloc prieteni apropiați'], 0, 'Oamenii se pot purta diferit în situații diferite.'),
      Q('Cum descoperi ce te interesează?', ['Încerc activități noi', 'Fac doar ce fac alții', 'Nu încerc nimic nou'], 0, 'Încercând lucruri noi, afli ce îți place cu adevărat.')]
  ],
  'civ-11': [
    [Q('Ai greșit o literă. Ce faci?', ['O corectez', 'Rup foaia', 'Renunț la temă'], 0, 'O greșeală se poate corecta; nu e nevoie să renunți.'),
      Q('Nu reușești să legi șireturile. Ce poți spune?', ['„Mă ajuți, te rog?”', '„Nu voi reuși niciodată.”', '„Nu mă mai încalț.”'], 0, 'Cererea de ajutor este o alegere bună când ceva e greu.'),
      Q('Un coleg greșește la tablă. Ce faci?', ['Îl încurajez', 'Râd de el', 'Îi spun că e prost'], 0, 'Toți greșim. Încurajarea îl ajută să încerce din nou.')],
    [Q('Ai încercat de trei ori și nu iese. Ce încerci acum?', ['Altă metodă sau un indiciu', 'Același lucru, mai tare', 'Renunț pentru totdeauna'], 0, 'O metodă nouă sau un indiciu te pot ajuta să reușești.'),
      Q('Ce înseamnă „încă” în „Nu știu încă”?', ['Că pot învăța mai târziu', 'Că nu voi ști niciodată', 'Că nu este important'], 0, '„Încă” arată că învățarea continuă.'),
      Q('Cui poți cere ajutor la școală?', ['Învățătoarei sau unui coleg', 'Nimănui, niciodată', 'Unui străin de pe stradă'], 0, 'La școală te pot ajuta învățătoarea și colegii.')],
    [Q('Ai greșit și cineva râde. Ce îți spui?', ['„Greșelile mă ajută să învăț.”', '„Sunt cel mai prost.”', '„Nu mai încerc nimic.”'], 0, 'Greșelile fac parte din învățare, chiar dacă cineva râde.'),
      Q('Cum folosești o greșeală la următoarea încercare?', ['Mă uit ce am greșit', 'O uit cât mai repede', 'Fac exact la fel'], 0, 'Când înțelegi greșeala, o poți evita data viitoare.'),
      Q('Un adult îți arată primul pas. Ce faci apoi?', ['Încerc și eu singur', 'Îl las să facă tot', 'Mă uit și nu încerc'], 0, 'Ajutorul te pregătește să încerci singur pașii următori.')]
  ],
  'civ-13': [
    [Q('Ce faci înainte de culcare?', ['Mă spăl pe dinți', 'Mănânc bomboane', 'Mă joc pe tabletă'], 0, 'Periajul de seară curăță dinții înainte de somn.'),
      Q('Ce gustare ajută corpul?', ['Un măr', 'Multe bomboane', 'Chipsuri în fiecare zi'], 0, 'Fructele ajută corpul să crească sănătos.'),
      Q('Cât dorm de obicei pe noapte copiii de șapte ani?', ['Cam 10 ore', 'Cam 3 ore', 'Cam 20 de ore'], 0, 'Copiii de vârsta ta au nevoie de aproximativ 9–11 ore de somn.')],
    [Q('Ai stat mult pe scaun. Ce faci?', ['Mă mișc puțin', 'Mai stau două ore', 'Mănânc ceva dulce'], 0, 'Mișcarea ajută corpul după ce ai stat mult.'),
      Q('Când te speli pe mâini?', ['Înainte de masă și după toaletă', 'Doar o dată pe săptămână', 'Doar când am vopsea pe ele'], 0, 'Spălarea mâinilor înainte de masă și după toaletă oprește microbii.'),
      Q('Afară e foarte cald. Ce faci?', ['Beau apă și stau la umbră', 'Alerg mult în plin soare', 'Mă îmbrac cu haine foarte groase'], 0, 'Apa și umbra protejează corpul de căldură.')],
    [Q('Un prieten spune că dacă nu mănânci dulciuri nu te îmbolnăvești niciodată. Este adevărat?', ['Nu; ajută, dar nu garantează', 'Da, este sigur adevărat', 'Da, nimeni nu se îmbolnăvește'], 0, 'Obiceiurile bune ajută, dar nu ne pot garanta că nu ne îmbolnăvim.'),
      Q('De ce ne odihnim după efort?', ['Corpul se reface', 'Ca să pierdem timp', 'Pentru că e o pedeapsă'], 0, 'În timpul odihnei, corpul își reface puterile.'),
      Q('Te simți obosit în fiecare dimineață. Ce poți face?', ['Spun unui adult cum dorm', 'Beau cafea ca adulții', 'Nu mai merg la școală'], 0, 'Un adult te poate ajuta să afli de ce ești obosit și ce să schimbi.')]
  ],
  'civ-14': [
    [Q('Cum arăți că asculți?', ['Mă uit la cel care vorbește', 'Vorbesc peste el', 'Mă joc cu altceva între timp'], 0, 'Privirea și atenția arată că urmărești ce spune celălalt.'),
      Q('Ți-e foame la școală. Ce spui?', ['„Pot mânca gustarea, te rog?”', 'Plâng fără să spun nimic', 'Iau gustarea altcuiva'], 0, 'Când spui clar ce îți trebuie, ceilalți te pot ajuta.'),
      Q('Ce înseamnă să aștepți rândul la vorbit?', ['Vorbesc după ce termină celălalt', 'Vorbesc oricând vreau eu', 'Nu vorbesc niciodată, deloc'], 0, 'Așteptăm să termine celălalt, apoi vorbim noi.')],
    [Q('Colegul vorbește și tu nu înțelegi. Ce faci?', ['Îl rog să repete', 'Mă prefac că am înțeles', 'Plec fără să spun nimic'], 0, 'O cerere de a repeta ne ajută să înțelegem corect.'),
      Q('Ai nevoie de liniște ca să citești. Cum spui?', ['„Poți vorbi mai încet?”', '„Taci odată!”', 'Arunc cartea pe jos'], 0, 'O cerere politicoasă spune ce îți trebuie fără să jignești.'),
      Q('Prietenul îți povestește ceva trist. Ce faci?', ['Îl ascult până la capăt', 'Schimb repede subiectul', 'Râd de povestea lui'], 0, 'Ascultarea până la capăt îi arată că îți pasă.')],
    [Q('Tu și sora ta aveți nevoie de aceeași masă. Ce faceți?', ['Spunem ce ne trebuie', 'Cine e mai mare câștigă', 'Ne certăm până plânge una'], 0, 'Când fiecare spune ce îi trebuie, putem găsi o soluție pentru amândouă.'),
      Q('Cum spui că ești supărat fără să jignești?', ['„Sunt supărat pentru că…”', '„Ești cel mai rău!”', 'Trântesc ușa tare'], 0, 'Spunem ce simțim și de ce, fără să atacăm persoana.'),
      Q('Un adult nu te-a auzit când ai cerut ajutor. Ce faci?', ['Repet mai clar', 'Renunț', 'Țip foarte tare'], 0, 'O cerere repetată clar are mai multe șanse să fie auzită.')]
  ],
  'civ-16': [
    [Q('Ai crezut că afară e frig, dar vezi că e cald. Ce faci?', ['Îmi schimb părerea', 'Spun tot că e frig', 'Mă supăr pe soare'], 0, 'O observație nouă este un motiv bun să îți schimbi părerea.'),
      Q('Este bine să spui „Am greșit”?', ['Da, așa învățăm', 'Nu, e rușinos', 'Nu, niciodată'], 0, 'Când recunoaștem o greșeală, o putem corecta și învățăm.'),
      Q('Ai crezut că jucăria e în cutie, dar nu e. Ce spui?', ['„M-am înșelat, caut în altă parte.”', '„Sigur e acolo, dar ascunsă.”', '„Cineva a furat-o sigur.”'], 0, 'Ai verificat și nu e acolo; îți schimbi părerea și cauți mai departe.')],
    [Q('Un coleg îți arată că 7 + 2 face 9, nu 8. Ce faci?', ['Verific și îmi corectez răspunsul', 'Spun că tot 8 face', 'Mă supăr pe coleg'], 0, 'Verifici calculul: 7 + 2 = 9. Corectarea arată gândire atentă.'),
      Q('Te răzgândești după ce afli ceva nou. Ce arată asta?', ['Că gândești atent', 'Că ești slab', 'Că nu știi nimic'], 0, 'Schimbarea părerii după o informație nouă arată că gândești atent.'),
      Q('Toți spun că filmul e plictisitor, dar ție ți-a plăcut. Trebuie să-ți schimbi părerea?', ['Nu, e preferința mea', 'Da, ca să fiu ca ei', 'Da, toți au dreptate'], 0, 'Despre preferințe nu trebuie să fim toți de acord.')],
    [Q('Ce motiv este bun pentru a-ți schimba o părere?', ['O informație nouă, verificată', 'Presiunea grupului', 'Teama de ceartă'], 0, 'O informație verificată este un motiv bun; presiunea sau teama nu sunt.'),
      Q('Ai spus ieri o informație greșită. Ce faci azi?', ['Le spun că am aflat altceva', 'Mă prefac că n-am spus', 'Repet informația greșită'], 0, 'Când corectăm o informație, îi ajutăm și pe ceilalți.'),
      Q('Un prieten insistă să spui că desenul lui e cel mai frumos. Ție îți place altul. Ce faci?', ['Spun ce îmi place, cu grijă', 'Mint ca să-l mulțumesc', 'Îi spun că al lui e urât'], 0, 'Poți spune ce preferi fără să jignești și fără să minți.')]
  ],
  'civ-17': [
    [Q('Cum spui politicos că nu ești de acord?', ['„Eu cred altceva.”', '„Ești prost!”', 'Tac și mă supăr'], 0, 'Spui ce crezi tu, fără să jignești persoana.'),
      Q('Cineva spune că 2 + 2 face 5. Ce faci?', ['Spun calm că face 4', 'Râd de el', 'Tac chiar dacă știu'], 0, 'Poți spune calm ce știi și poți arăta cum ai numărat.'),
      Q('După ce spui că nu ești de acord, ce faci?', ['Ascult și părerea celuilalt', 'Plec imediat', 'Strig mai tare'], 0, 'Un dezacord bun înseamnă să vorbești și să asculți.')],
    [Q('Ce face un dezacord respectuos?', ['Vorbește despre idee', 'Jignește persoana', 'Strigă cât mai tare'], 0, 'Discutăm ideea, nu atacăm persoana care o spune.'),
      Q('Cum îți explici părerea?', ['Spun și motivul', 'Repet mai tare', 'Spun „pentru că da”'], 0, 'Un motiv îi ajută pe ceilalți să înțeleagă de ce gândești așa.'),
      Q('Învățătoarea a scris greșit o dată pe tablă. Ce poți face?', ['Îi spun politicos', 'Râd de ea', 'Tac și copiez greșit'], 0, 'Și adulții greșesc. Le putem spune politicos ce am observat.')],
    [Q('Nu ești de acord cu regula unui joc. Ce faci?', ['Propun o schimbare', 'Stric tot jocul', 'Trișez pe ascuns'], 0, 'Poți propune o regulă nouă și poți explica de ce ar fi mai bună.'),
      Q('Un prieten se supără că nu ești de acord cu el. Ce faci?', ['Rămân prieten și gândesc altfel', 'Îmi schimb părerea ca să nu se supere', 'Nu mai vorbesc cu el'], 0, 'Prietenii pot avea păreri diferite și pot rămâne prieteni.'),
      Q('Când e bine să ceri ajutorul unui adult într-o ceartă?', ['Când cineva amenință sau lovește', 'Niciodată, rezolv singur', 'Doar dacă pierd cearta'], 0, 'Siguranța e mai importantă decât câștigarea unei discuții.')]
  ]

};
const EXTRA_ROUNDS = { 'log-5': 4, 'log-11': 4, 'log-12': 4, 'log-13': 4, 'log-14': 4, 'civ-10': 4, 'civ-11': 4, 'civ-13': 4, 'civ-14': 4, 'civ-16': 4, 'civ-17': 4 };

ACTIVITIES.forEach(activity => {
  const review = REVIEW_QUESTIONS[activity.id], order = ORDER_PRACTICE[activity.id];
  if (review) activity.demo.levels.forEach((level, index) => {
    if (activity.demo.type === 'quiz') level.questions = level.questions.concat(review[index]);
    else level.review = review[index];
  });
  if (order) activity.demo.levels.forEach((level, index) => { level.questions.push(order[index]); });
  const extra = EXTRA_QUESTIONS[activity.id];
  if (extra) activity.demo.levels.forEach((level, index) => {
    level.questions = level.questions.concat(extra[index]);
    level.rounds = EXTRA_ROUNDS[activity.id];
  });
});

const THINKING_PATH = {
  title: 'Gândesc cu mintea mea',
  description: 'Observ, verific dovezile, îmi formez o părere și pot spune respectuos când gândesc altfel.',
  activities: ['log-11', 'log-12', 'log-13', 'log-14', 'civ-16', 'civ-17']
};
THINKING_PATH.activities.forEach(id => {
  const activity = ACTIVITIES.find(item => item.id === id);
  if (!activity) throw new Error('Lipsește activitatea din traseul de gândire: ' + id);
  activity.parent.watch = [
    activity.objectives[0].replace(/^Să /, 'Poate să '),
    'Deosebește „am observat”, „cred” și „nu știu încă”, cu sprijin potrivit vârstei.',
    'Poate avea o părere diferită de a adultului fără să fie presat să fie de acord.'
  ];
  activity.parent.help.push(
    'Invitați explicit dezacordul: „Poți să nu fii de acord cu mine. Ce ai observat?” Ascultați fără ridiculizare, pedeapsă sau retragerea afecțiunii.',
    'Modelați corectarea: „Am numărat greșit. Ai arătat patru, nu cinci. Îmi schimb răspunsul.” Nu cereți copilului să vă contrazică intenționat.',
    'Întrebați „Cum putem verifica?” și acceptați „Nu știu încă”. Nu transformați preferințele, emoțiile sau dezacordul cu dumneavoastră în răspunsuri greșite.'
  );
  activity.parent.support.push('Dacă apare tensiune, opriți discuția și reveniți la personaje fictive. Adultul răspunde de siguranță; copilul nu trebuie să convingă pe cineva care îl amenință.');
});

const ACTIVITIES_BY_SUBJECT = {};
SUBJECTS.forEach(subject => {
  ACTIVITIES_BY_SUBJECT[subject.id] = ACTIVITIES.filter(activity => activity.subject === subject.id);
});
