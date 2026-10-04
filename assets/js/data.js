/* ============================================================
   ATELIERUL ȘCOLAR — Conținut
   6 subiecte, 42 de activități pentru copii de 6-8 ani
   (clasa 1-2 în România). Totul în limba română.
   Include jocuri generative și asimetrice (balanță, magazin, forme din jurul tău).
   ============================================================ */

const SUBJECTS = [
  {
    id: "mat",
    title: "Matematică",
    icon: "🔢",
    color: "var(--s-mat)",
    desc: "Numărăm, adunăm, scădem, măsurăm și citim ceasul — cu jocuri și obiecte din jurul nostru.",
    tagline: "Matematician mic",
    age: "6-8 ani"
  },
  {
    id: "lim",
    title: "Limba Română",
    icon: "📖",
    color: "var(--s-lim)",
    desc: "Litere, sunete, silabe, cuvinte și propoziții. Înțelegem și scriem limba noastră.",
    tagline: "Cititor curios",
    age: "6-8 ani"
  },
  {
    id: "log",
    title: "Logică și Gândire",
    icon: "🧩",
    color: "var(--s-log)",
    desc: "Tipare, ghicitori, memorie și probleme de gândire. Antrenăm creierul ca pe un superputer.",
    tagline: "Rezolvator de enigme",
    age: "6-8 ani"
  },
  {
    id: "inf",
    title: "Informatică",
    icon: "💻",
    color: "var(--s-inf)",
    desc: "Ce este un calculator, cum folosim mouse-ul și tastatura și cum gândim ca un programator.",
    tagline: "Explorator digital",
    age: "6-8 ani"
  },
  {
    id: "sci",
    title: "Științe și Natură",
    icon: "🌱",
    color: "var(--s-sci)",
    desc: "Plante, animale, stările apei și corpul nostru. Descoperim lumea din jur cu minune.",
    tagline: "Mic cercetător",
    age: "6-8 ani"
  },
  {
    id: "civ",
    title: "Educație Civică",
    icon: "🤝",
    color: "var(--s-civ)",
    desc: "Familia, prietenii, regulile și ajutorul reciproc. Învațăm să trăim bine împreună.",
    tagline: "Prieten responsabil",
    age: "6-8 ani"
  }
];

const ACTIVITIES = [
/* ==================== MATEMATICĂ ==================== */
{
  id: "mat-1", subject: "mat", num: 1, title: "Numărăm până la 100", icon: "🔢", duration: "20 min",
  montessori: {
    intro: "Maria Montessori a folosit mărgele pentru a învăța numerele. Fiecare mărgele este o unitate mică pe care o poți ține în mână — așa numerele devin reale.",
    materials: [
      { icon: "🔵", name: "Mărgele aurii", how: "Numără 10 mărgele și le pui într-un grup. Aia e o zecime! Fă 10 grupuri și ai o sută." },
      { icon: "🧮", name: "Cadru de numărat", how: "Mută mărgelele pe cadrul: 3 pe rândul de sus, 2 pe cel de jos — aia e 5. Fă-ți numerele tale." },
    ],
    tips: [
      "Numără cu degetele, dar și cu ochii: arată la fiecare obiect pe când numeri.",
      "Numără lucruri din jur: pași, linguri, nasturi.",
    ]
  },
  objectives: [
    "Să numere corect de la 1 la 100",
    "Să numere obiecte din jur și să le asocieze cu numărul corect",
    "Să recunoască ordinea numerelor (care vine înainte, care după)"
  ],
  explanation: [
    "Numerele sunt ca treptele unei scări: fiecare număr stă exact pe o treaptă, după cel dinaintea lui și înaintea celui din spate. Când numărăm obiecte, punem fiecare obiect „la mână” cu un număr: 1, 2, 3... și ne oprim când nu mai avem obiecte.",
    "Un truc bun: numerele se termină în 0 la fiecare zeci (10, 20, 30...). Între două zeci sunt exact 9 numere. De exemplu, după 29 vine 30, iar după 30 vine 31.",
    "Când ai de numărat multe obiecte, le poți grupa câte 10. O mână are 5 degete, deci două mâini fac 10. Așa numărări mai repede și mai corect."
  ],
  demo: {
    type: "count",
    title: "Câte obiecte vezi?",
    intro: "Numără obiectele din fiecare casuță și alege numărul corect!",
    items: [
      { emoji: "🍎", count: 3, options: [2, 3, 4] },
      { emoji: "⭐", count: 5, options: [4, 5, 6] },
      { emoji: "🐟", count: 7, options: [6, 7, 8] },
      { emoji: "🌸", count: 9, options: [8, 9, 10] },
      { emoji: "🚗", count: 12, options: [10, 11, 12] }
    ],
    pool: ["🍎", "⭐", "🐟", "🌸", "🚗", "🍌", "🐱", "🏀", "🍪", "🎈", "🐞", "🧸", "🍇", "🐢", "🌻", "⚽", "🍩", "🦋"]
  },
  questions: [
    "Care număr vine după 49?",
    "Care număr vine înainte de 30?",
    "Câte numere sunt între 10 și 20 (fără 10 și 20)?"
  ],
  parent: {
    watch: ["Copilul numără fără să sară numere", "Asociază numărul cu cantitatea de obiecte"],
    help: ["Numărați împreună treptele scării sau obiectele din casă", "Jocați „ce lipsește”: spuneți 7, 8, __, 10"],
    redflags: ["Sare numere (1, 2, 4, 5...) — repetați numărătoarea lent, cu degetele"]
  },
  pass: [
    "Numără corect de la 1 la 50",
    "Spune ce număr vine după și înainte de un număr dat",
    "Numără corect un grup de obiecte"
  ]
},
{
  id: "mat-2", subject: "mat", num: 2, title: "Adunarea", icon: "➕", duration: "20 min",
  montessori: {
    intro: "La Montessori, adunarea se face cu obiecte reale: iei câteva mărgele, apoi iei mai multe, și numeri ce ai în față.",
    materials: [
      { icon: "🪙", name: "Mărgele sau nasturi", how: "Ia 3 nasturi, apoi ia încă 2. Numără-i pe toți: aia e 5. Încearcă cu numerele tale." },
      { icon: "🍎", name: "Fructe pe masă", how: "Pune 2 mere pe farfurie, apoi adaugă încă 3. Câte sunt acum? Numără-le cu voce tare." },
    ],
    tips: [
      "Adunarea e punerea lucrurilor împreună. Împrăștierea e scăderea.",
      "Începe cu numere mici și crește pe măsură ce te descurci mai bine.",
    ]
  },
  objectives: [
    "Să înțeleagă că adunarea înseamnă „punem împreună”",
    "Să adune numere mici (până la 20) corect",
    "Să rezolve probleme simple din viața de zi cu zi"
  ],
  explanation: [
    "Adunarea înseamnă să punem două grupe împreună și să aflăm cât fac în total. Dacă ai 3 mere și primești încă 2, acum ai 5 mere. Semnul + înseamnă „mai” sau „împreună cu”.",
    "Un truc: adunarea este comutativă — 3 + 5 dă același rezultat ca 5 + 3. Ordinea nu contează, contează doar ce adunăm.",
    "Când aduni 0, numărul rămâne la fel: 7 + 0 = 7. Zero înseamnă „nimic”, deci nu adaugi nimic."
  ],
  demo: {
    type: "quiz",
    title: "Să adunăm!",
    intro: "Alege rezultatul corect pentru fiecare adunare.",
    questions: [
      { q: "3 + 2 = ?", options: ["4", "5", "6"], answer: 1 },
      { q: "4 + 4 = ?", options: ["7", "8", "9"], answer: 1 },
      { q: "5 + 3 = ?", options: ["7", "8", "9"], answer: 1 },
      { q: "6 + 2 = ?", options: ["7", "8", "9"], answer: 1 },
      { q: "9 + 1 = ?", options: ["9", "10", "11"], answer: 1 }
    ],
    pool: [
      { q: "2 + 2 = ?", options: ["3", "4", "5"], answer: 1 },
      { q: "7 + 1 = ?", options: ["7", "8", "9"], answer: 1 },
      { q: "8 + 2 = ?", options: ["9", "10", "11"], answer: 1 },
      { q: "1 + 4 = ?", options: ["4", "5", "6"], answer: 1 },
      { q: "6 + 4 = ?", options: ["9", "10", "11"], answer: 1 },
      { q: "5 + 5 = ?", options: ["9", "10", "11"], answer: 1 },
      { q: "3 + 6 = ?", options: ["8", "9", "10"], answer: 1 },
      { q: "10 + 0 = ?", options: ["9", "10", "11"], answer: 1 }
    ]
  },
  questions: [
    "Ai 4 creioane și primești încă 3. Câte ai acum?",
    "Ce este 5 + 5?",
    "Care este mai mare: 3 + 4 sau 4 + 3?"
  ],
  parent: {
    watch: ["Copilul înțelege că + înseamnă „mai”", "Adună corect numere mici"],
    help: ["Folosiți obiecte reale: mere, mărgele, cuburi", "Jocați „cât fac împreună” cu obiecte din casă"],
    redflags: ["Confundă adunarea cu numărătoarea — folosiți obiecte concrete"]
  },
  pass: [
    "Adună corect numere până la 10",
    "Rezolvă o problemă simplă de adunare",
    "Explică de ce 3 + 5 = 5 + 3"
  ]
},
{
  id: "mat-3", subject: "mat", num: 3, title: "Scăderea", icon: "➖", duration: "20 min",
  montessori: {
    intro: "Scăderea e luarea de la. Montessori o învață cu obiecte reale: ai câteva, iei câteva, și vezi ce rămâne.",
    materials: [
      { icon: "🍪", name: "Biscuiți sau crackers", how: "Pune 5 biscuiți pe masă. Mănâncă 2. Câte rămân? Numără-le: aia e 3." },
      { icon: "🧸", name: "Jucării", how: "Pune 4 jucării pe podea. Ia una. Câte rămân? Încearcă cu numerele tale." },
    ],
    tips: [
      "Scăderea e luarea de la. Nu poți lua mai mult decât ai!",
      "Numără mai întâi ce ai, apoi ia, apoi numără ce rămâne.",
    ]
  },
  objectives: [
    "Să înțeleagă că scăderea înseamnă „luăm dintr-un grup”",
    "Să scadă numere mici (până la 20) corect",
    "Să lege scăderea cu adunarea (operația inversă)"
  ],
  explanation: [
    "Scăderea înseamnă să luăm ceva dintr-un grup și să aflăm cât rămâne. Dacă ai 5 mere și mănânci 2, îți rămân 3. Semnul − înseamnă „mai puțin” sau „luăm”.",
    "Scăderea este inversa adunării. Dacă 3 + 2 = 5, atunci 5 − 2 = 3 și 5 − 3 = 2. Acestea se numesc „familii de numere”.",
    "Când scizi un număr din el însuși, rezultatul este 0: 7 − 7 = 0. Nu mai rămâne nimic."
  ],
  demo: {
    type: "quiz",
    title: "Să scădem!",
    intro: "Alege rezultatul corect pentru fiecare scădere.",
    questions: [
      { q: "5 − 2 = ?", options: ["2", "3", "4"], answer: 1 },
      { q: "7 − 3 = ?", options: ["3", "4", "5"], answer: 1 },
      { q: "9 − 4 = ?", options: ["4", "5", "6"], answer: 1 },
      { q: "8 − 5 = ?", options: ["2", "3", "4"], answer: 1 },
      { q: "6 − 6 = ?", options: ["0", "1", "6"], answer: 0 }
    ],
    pool: [
      { q: "4 − 1 = ?", options: ["2", "3", "4"], answer: 1 },
      { q: "10 − 3 = ?", options: ["6", "7", "8"], answer: 1 },
      { q: "8 − 4 = ?", options: ["3", "4", "5"], answer: 1 },
      { q: "9 − 5 = ?", options: ["3", "4", "5"], answer: 1 },
      { q: "7 − 7 = ?", options: ["0", "1", "7"], answer: 0 },
      { q: "6 − 2 = ?", options: ["3", "4", "5"], answer: 0 },
      { q: "10 − 5 = ?", options: ["4", "5", "6"], answer: 1 },
      { q: "5 − 3 = ?", options: ["1", "2", "3"], answer: 1 }
    ]
  },
  questions: [
    "Ai 8 bomboane și le dai 3 unui prieten. Câte îți rămân?",
    "Dacă 4 + 3 = 7, ce este 7 − 3?",
    "Ce este 10 − 10?"
  ],
  parent: {
    watch: ["Copilul înțelege că − înseamnă „mai puțin”", "Leagă scăderea de adunare"],
    help: ["Folosiți obiecte: puneți 5 cuburi, luați 2, numărați ce rămâne", "Jocați „familii de numere”"],
    redflags: ["Încrucișează adunarea cu scăderea — reveniți la obiecte concrete"]
  },
  pass: [
    "Scade corect numere până la 10",
    "Rezolvă o problemă simplă de scădere",
    "Explică legătura dintre adunare și scădere"
  ]
},
{
  id: "mat-4", subject: "mat", num: 4, title: "Forme geometrice", icon: "📐", duration: "20 min",
  montessori: {
    intro: "Montessori are un „cabinet geometric”: forme de lemn pe care le atingi cu ochii închiși. Forma se simte cu degetele, nu doar se vede.",
    materials: [
      { icon: "🧊", name: "Forme din carton", how: "Taie un pătrat, un triunghi și un cerc. Trasează-le cu degetul și spune numele fiecăreia." },
      { icon: "🔲", name: "Cabinet geometric", how: "Acoperă-ți ochii și atinge forma. Ghicește care e înainte să deschizi ochii!" },
    ],
    tips: [
      "Formele au colțuri și laturi. Numără-le cu degetul.",
      "Găsește forme în cameră: ceasul e un cerc, masa e un pătrat.",
    ]
  },
  objectives: [
    "Să recunoască forme de bază: pătrat, triunghi, cerc, dreptunghi",
    "Să numere laturile și vârfurile (colțurile) fiecărei forme",
    "Să găsească forme în obiecte din jur"
  ],
  explanation: [
    "Formele geometrice sunt „scheletele” obiectelor din jur. Un ceas este un cerc, o carte este un dreptunghi, o piramidă este un triunghi. Fiecare formă are laturi (liniile drepte sau curbe) și vârfuri (colțurile).",
    "Pătratul are 4 laturi egale și 4 colțuri. Triunghiul are 3 laturi și 3 colțuri. Cercul nu are colțuri — este o linie curbată închisă. Dreptunghiul are 4 laturi, dar cele opuse sunt egale.",
    "Un joc bun: caută forme în casă. Ușa este dreptunghi, farfuria este cerc, cutia de șervețele este pătrat."
  ],
  demo: {
    type: "shapes",
    title: "Ce formă este?",
    intro: "Uită-te la formă și alege numele ei corect.",
    questions: [
      { shape: "circle", name: "Cerc", options: ["Cerc", "Pătrat", "Triunghi"] },
      { shape: "square", name: "Pătrat", options: ["Dreptunghi", "Pătrat", "Triunghi"] },
      { shape: "triangle", name: "Triunghi", options: ["Triunghi", "Cerc", "Pătrat"] },
      { shape: "rectangle", name: "Dreptunghi", options: ["Pătrat", "Triunghi", "Dreptunghi"] },
      { shape: "star", name: "Stea", options: ["Stea", "Cerc", "Pătrat"] }
    ]
  },
  questions: [
    "Câte laturi are un triunghi?",
    "Ce formă are o farfurie?",
    "Care formă nu are colțuri?"
  ],
  parent: {
    watch: ["Copilul recunoaște formele de bază", "Numără laturile și colțurile"],
    help: ["Căutați forme împreună în casă și afară", "Desenați forme și numărați laturile cu degetul"],
    redflags: ["Confundă pătratul cu dreptunghiul — desenați-le și comparați laturile"]
  },
  pass: [
    "Recunoaște 4 forme de bază",
    "Numără laturile și colțurile unei forme",
    "Găsește 3 forme în casă"
  ]
},
{
  id: "mat-5", subject: "mat", num: 5, title: "Măsurarea", icon: "📏", duration: "20 min",
  montessori: {
    intro: "Montessori măsoară cu corpul: o „măsură” e distanța de la vârful degetului mare la vârful degetului mic când mână e deschisă. E rigla ta proprie!",
    materials: [
      { icon: "✋", name: "Mâna ta", how: "Măsoară masa cu măsura ta: câte măsuri ai nevoie? Compară cu măsura părintelui tău — e mai mare!" },
      { icon: "📏", name: "Riglă", how: "Măsoară creionul, cartea și pantoful. Care e cel mai lung? Care e cel mai scurt?" },
    ],
    tips: [
      "Estimează mai întâi: cât de lung crezi că e? Apoi măsoară și verifică.",
      "Un centimetru e cam cât lățimea degetului mic.",
    ]
  },
  objectives: [
    "Să înțeleagă ce înseamnă a măsura",
    "Să compare lungimi: mai lung, mai scurt, egal",
    "Să folosească unități simple de măsură (pas, mână, creion)"
  ],
  explanation: [
    "A măsura înseamnă să aflăm cât de lung, de înalt sau de greu este ceva. La început folosim obiecte ca unități: un pas, o mână, un creion. Mai târziu folosim rigla și metrul.",
    "Comparăm lungimile cu cuvinte: „mai lung”, „mai scurt”, „la fel de lung”. Dacă un creion este mai lung decât un pix, creionul câștigă.",
    "Un truc: când măsori cu pași, pașii trebuie să fie egali. Dacă un pas este mare și altul mic, măsura nu este corectă."
  ],
  demo: {
    type: "quiz",
    title: "Compară lungimile",
    intro: "Care obiect este mai lung?",
    questions: [
      { q: "Care este mai lung: un creion sau un pix?", options: ["Creionul", "Pixul", "La fel"], answer: 0 },
      { q: "Care este mai scurt: o masă sau un scaun?", options: ["Masa", "Scaunul", "La fel"], answer: 1 },
      { q: "Care este mai înalt: un copac sau o floare?", options: ["Copacul", "Floarea", "La fel"], answer: 0 },
      { q: "Care este mai lung: un șnur de 5 pași sau unul de 3 pași?", options: ["Cel de 5 pași", "Cel de 3 pași", "La fel"], answer: 0 },
      { q: "Ce folosim ca unitate simplă de măsură?", options: ["Un pas", "Un nor", "O idee"], answer: 0 }
    ],
    pool: [
      { q: "Care este mai lung: o masă sau un creion?", options: ["Masa", "Creionul", "La fel"], answer: 0 },
      { q: "Care este mai înalt: un om sau o masă?", options: ["Omul", "Masa", "La fel"], answer: 0 },
      { q: "Care este mai scurt: un șnur de 2 pași sau unul de 4 pași?", options: ["Cel de 2 pași", "Cel de 4 pași", "La fel"], answer: 0 },
      { q: "Ce este mai greu: o piatră sau o pânză?", options: ["Piatra", "Pânza", "La fel"], answer: 0 },
      { q: "Cu ce putem măsura lungimea unei hârtii?", options: ["Un creion", "Un nor", "O cântec"], answer: 0 },
      { q: "Care este mai lung: brațul tău sau degetul tău?", options: ["Brațul", "Degetul", "La fel"], answer: 0 }
    ]
  },
  questions: [
    "Ce este mai lung: brațul tău sau piciorul tău?",
    "Cu ce poți măsura lungimea unei mese?",
    "De ce trebuie să fie pașii egali când măsuri?"
  ],
  parent: {
    watch: ["Copilul compară lungimi corect", "Folosește unități simple"],
    help: ["Măsurați obiecte cu pași, mâini, creioane", "Jocați „ce este mai lung” cu obiecte din casă"],
    redflags: ["Nu înțelege ideea de unitate — măsurați împreună cu un creion"]
  },
  pass: [
    "Compară corect lungimi",
    "Măsoară un obiect cu o unitate simplă",
    "Explică de ce unitățile trebuie să fie egale"
  ]
},
{
  id: "mat-6", subject: "mat", num: 6, title: "Citim ceasul", icon: "⏰", duration: "20 min",
  montessori: {
    intro: "Montessori are un „cabinet de timp”: un ceas cu acuri mobile. Le rotești și vezi cum trece timpul.",
    materials: [
      { icon: "🕐", name: "Ceas de hârtie", how: "Taie un ceas și fă două acuri. Pune-l pe 3. Unde e acul mare? Unde e acul mic?" },
      { icon: "⏰", name: "Ceas real", how: "Uită-te la ceas în fiecare oră și spune ce oră e. Observă cum se mișcă acurile." },
    ],
    tips: [
      "Acul mare face o tură în jurul ceasului într-o oră.",
      "Acul mic îți spune ora. Acul mare îți spune minutele.",
    ]
  },
  objectives: [
    "Să recunoască ceasul și cele două ace (ore și minute)",
    "Să citească orele rotunde (3:00, 6:00)",
    "Să înțeleagă ordinea orelor din zi"
  ],
  explanation: [
    "Ceasul are două ace: una scurtă (cea a orelor) și una lungă (cea a minutelor). Când ceasul arată o oră rotundă, acea lungă este pe 12, iar cea scurtă pe numărul orei.",
    "Orele din zi au o ordine: dimineața este 7:00, prânzul este 12:00, seara este 18:00. Ziua are 24 de ore.",
    "Un truc: când acea lungă este pe 12, este oră rotundă. Când este pe 6, este jumătate de oră (30 de minute)."
  ],
  demo: {
    type: "clock",
    title: "Ce oră este?",
    intro: "Uită-te la ceas și alege ora corectă.",
    questions: [
      { hour: 3, minute: 0, desc: "Acea scurtă este pe 3, cea lungă pe 12.", options: ["3:00", "12:00", "6:00"] },
      { hour: 6, minute: 0, desc: "Acea scurtă este pe 6, cea lungă pe 12.", options: ["12:00", "6:00", "9:00"] },
      { hour: 9, minute: 0, desc: "Acea scurtă este pe 9, cea lungă pe 12.", options: ["3:00", "9:00", "6:00"] },
      { hour: 12, minute: 0, desc: "Ambele ace sunt pe 12.", options: ["6:00", "12:00", "3:00"] },
      { hour: 7, minute: 0, desc: "Acea scurtă este pe 7, cea lungă pe 12.", options: ["7:00", "12:00", "9:00"] }
    ]
  },
  questions: [
    "Ce oră este când ambele ace sunt pe 12?",
    "Câte ore are o zi?",
    "Ce oră este când acea lungă este pe 6?"
  ],
  parent: {
    watch: ["Copilul recunoaște cele două ace", "Citește ore rotunde"],
    help: ["Folosiți un ceas real și mutați acele", "Jocați „ce oră este acum”"],
    redflags: ["Confundă cele două ace — arătați-le de fiecare dată"]
  },
  pass: [
    "Recunoaște cele două ace ale ceasului",
    "Citește 3 ore rotunde",
    "Spune ordinea a 3 ore din zi"
  ]
},
{
  id: "mat-7", subject: "mat", num: 7, title: "Balanța", icon: "⚖️", duration: "20 min",
  montessori: {
    intro: "Balanța Montessori e o balanță reală cu două tăvi. Pui obiecte pe ea și vezi care e mai greu — fără să ghicești.",
    materials: [
      { icon: "⚖️", name: "Balanță", how: "Pune o carte pe o tavă și un creion pe cealaltă. Care coboară? Aia e mai grea." },
      { icon: "🧱", name: "Obiecte de greutăți diferite", how: "Pune o lingură pe o tavă. Adaugă nasturi pe cealaltă până se echilibrează. Câte nasturi ai nevoie?" },
    ],
    tips: [
      "Un obiect mare nu e mereu mai greu. O piatră mică poate fi mai grea decât o spumă mare!",
      "Ghicește mai întâi, apoi verifică cu balanța.",
    ]
  },
  objectives: [
    "Să compare două cantități (mai mult, mai puțin, egal)",
    "Să înțeleagă echilibrul prin balanță",
    "Să descopere diferența dintre două numere"
  ],
  explanation: [
    "Balanța este o formă fizică pe care o găsim în jurul nostru: la cântarul din piață, la balancă sau chiar în bucătărie. Are două tăvi legate de o bară. Când o tavă are mai multe obiecte, ea coboară — este mai grea.",
    "Când cele două tăvi au același număr de obiecte, bara rămâne dreaptă: sunt egale. Când o parte are mai multe, partea aceea coboară.",
    "Un truc: numără obiectele din fiecare tavă. Diferența dintre ele ne spune cât de mult „coboară” balanța. Matematica este peste tot: chiar și o balanță ne ajută să comparăm!"
  ],
  demo: {
    type: "balance",
    title: "Care parte coboară?",
    intro: "Uită-te la balanță și alege care parte are mai multe obiecte.",
    rounds: 5,
    emoji: "🍎"
  },
  questions: [
    "Ce se întâmplă când cele două tăvi au același număr de obiecte?",
    "Care parte a balanței coboară când are mai multe obiecte?",
    "Unde găsești o balanță în jurul tău?"
  ],
  parent: {
    watch: ["Copilul compară două cantități", "Înțelege conceptul de echilibru"],
    help: ["Folosiți o balancă reală sau o lingură ca balanță", "Cântăriți obiecte din casă"],
    redflags: ["Confundă „mai mult” cu „mai puțin” — numărați împreună"]
  },
  pass: [
    "Compară corect 3 perechi de cantități",
    "Explică de ce o parte coboară",
    "Găsește o balanță în jurul tău"
  ]
},
{
  id: "mat-8", subject: "mat", num: 8, title: "Magazinul", icon: "🛒", duration: "20 min",
  montessori: {
    intro: "Montessori are un „joc de bancă”: numeri monede reale și înveți că banii sunt o cantitate pe care o poți număra și aduna.",
    materials: [
      { icon: "🪙", name: "Monede", how: "Numără 10 monede. Câte grupuri de 5 poți face? Așa înveți să numeri pe câte 5." },
      { icon: "🏪", name: "Magazin mic", how: "Fă un magazin cu jucării și prețuri pe hârtie. Cumpără și vinde cu monede reale." },
    ],
    tips: [
      "Banii sunt o cantitate: îi poți aduna și scădea ca pe mărgele.",
      "Numără mai întâi ce ai, apoi ce ai nevoie.",
    ]
  },
  objectives: [
    "Să calculeze restul de bani (scădere)",
    "Să recunoască prețurile și monedele",
    "Să aplice matematica în viața reală"
  ],
  explanation: [
    "La magazin, fiecare produs are un preț. Când plătim, casierul ne dă restul de bani. Restul este diferența dintre banii pe care îi avem și prețul produsului.",
    "De exemplu: dacă ai 20 de lei și cumperi o pâine de 5 lei, primești 15 lei de la casieră. 20 − 5 = 15.",
    "Un truc: banii sunt pretutindeni în jurul nostru — în buzunar, în portofel, la casă. Matematica ne ajută să nu pierdem banii! Fiecare cumpărare este o problemă de scădere."
  ],
  demo: {
    type: "shop",
    title: "Cât primești de la casieră?",
    intro: "Cumpără produsul și calculează restul de bani.",
    rounds: 5
  },
  questions: [
    "Ce este restul de bani?",
    "Dacă ai 10 lei și cumperi ceva de 3 lei, cât primești?",
    "Unde găsești prețuri în jurul tău?"
  ],
  parent: {
    watch: ["Copilul calculează restul de bani", "Recunoaște prețurile"],
    help: ["Jocați „magazinul” acasă cu obiecte și prețuri", "Cumpărați împreună și calculați restul"],
    redflags: ["Greșește scăderea — exersați cu monede reale"]
  },
  pass: [
    "Calculează corect restul la 3 cumpărări",
    "Explică ce este restul de bani",
    "Recunoaște prețuri în jurul tău"
  ]
},
{
  id: "mat-9", subject: "mat", num: 9, title: "Forme din jurul tău", icon: "🧺", duration: "25 min",
  montessori: {
    intro: "Montessori numește asta „lecția în trei perioade”: arăți forma, o numești, și copilul o găsește. Lumea e o clasă mare.",
    materials: [
      { icon: "🧺", name: "Coș de forme", how: "Colecționează 5 obiecte de aceeași formă: o minge, un nasture, o monedă. Pune-le într-un coș." },
      { icon: "🔍", name: "Vânătoare de forme", how: "Mergi prin casă și găsește 3 cercuri, 3 pătrate și 3 triunghiuri. Aduce-le și arată-le." },
    ],
    tips: [
      "Lumea e plină de forme. Uită-te la tavan, la podea, la ferestre.",
      "Găsește mai întâi formele ușoare, apoi pe cele ascunse.",
    ]
  },
  objectives: [
    "Să aplice adunarea și înmulțirea la obiecte reale",
    "Să numere obiecte din mediul înconjurător",
    "Să descopere matematica în viața de zi cu zi"
  ],
  explanation: [
    "Matematica nu este doar în caiet — este în tot ce ne înconjoară! În coșuri cu mere, în scaune cu picioare, în roțile bicicletelor și în degetele mâinilor.",
    "De exemplu: dacă ai 3 coșuri și fiecare are 4 mere, ai 3 × 4 = 12 mere. Sau: dacă ai 2 scaune și fiecare are 4 picioare, ai 2 × 4 = 8 picioare.",
    "Un truc: uită-te în jur! Câte roți au bicicletele din curte? Câte degete ai pe ambele mâini? Câte picioare au mesele din casă? Fiecare obiect ascunde o problemă de matematică."
  ],
  demo: {
    type: "gen",
    title: "Matematica din jurul tău",
    intro: "Rezolvă probleme cu obiecte reale din viața ta.",
    rounds: 5
  },
  questions: [
    "Câte roți au 3 biciclete?",
    "Câte degete ai pe ambele mâini?",
    "Unde găsești matematică în casă?"
  ],
  parent: {
    watch: ["Copilul aplică adunarea/înmulțirea la obiecte reale", "Numără obiecte din jur"],
    help: ["Căutați împreună obiecte și numărați-le părțile", "Jocați „câte sunt în total” cu jucării"],
    redflags: ["Nu leagă numerele de obiecte reale — numărați împreună în casă"]
  },
  pass: [
    "Rezolvă 3 probleme cu obiecte reale",
    "Numără corect părțile unui obiect",
    "Găsește matematică în 3 obiecte din casă"
  ]
},

/* ==================== LIMBA ROMÂNĂ ==================== */
{
  id: "lim-1", subject: "lim", num: 1, title: "Litere și sunete", icon: "🔤", duration: "20 min",
  montessori: {
    intro: "Montessori a inventat „literele de hârtie abrazivă”: scrii litera cu degetul pe hârtia abrazivă și o simți. Litera se simte, nu doar se vede.",
    materials: [
      { icon: "📜", name: "Litere de hârtie abrazivă", how: "Taie literele A, B, C din carton. Trasează-le cu degetul și spune sunetul." },
      { icon: "🖐️", name: "Litere în aer", how: "Scrie litera în aer cu degetul. Mare, lent, și spune sunetul pe când scrii." },
    ],
    tips: [
      "Fiecare literă are un sunet. A spune „ah”, B spune „buh”.",
      "Simte mai întâi litera, apoi spune sunetul, apoi scrie-o.",
    ]
  },
  objectives: [
    "Să recunoască literele alfabetului",
    "Să distingă vocalele de consoane",
    "Să asocieze litera cu sunetul ei"
  ],
  explanation: [
    "Alfabetul românesc are 30 de litere. Unele litere fac sunete „deschise” — acestea sunt vocalele: A, E, I, O, U, Ă și Â. Celelalte sunt consoane: B, C, D, F, G... Vocalele sunt ca „ușile” sunetelor, pentru că le putem cânta.",
    "Atenție la cele două vocale speciale! Litera „Ă” se scrie cu o „șapcă” deasupra: ă. Sună ca un „a” scurt și rotunjit. O găsim în cuvinte ca „păpușă”, „căciulă”, „măr”, „ăsta”.",
    "Litera „Â” (și „Î”) sună exact la fel — ca un „i” lung, „îîî”. Le folosim în cuvinte ca „pâine”, „râu”, „mâncare”, „împreună”. Regula: la începutul cuvântului scriem „î” (împreună, înot), iar în mijlocul cuvântului scriem „â” (pâine, râu, mâncare).",
    "Un truc: cântă vocalele! A-E-I-O-U, plus Ă și Â. Dacă poți cânta o literă, este vocală. Vocalele sunt 7: A, E, I, O, U, Ă, Â."
  ],
  demo: {
    type: "quiz",
    title: "Vocală sau consoană?",
    intro: "Alege dacă litera este vocală sau consoană.",
    questions: [
      { q: "Litera A este...", options: ["Vocală", "Consoană"], answer: 0 },
      { q: "Litera B este...", options: ["Vocală", "Consoană"], answer: 1 },
      { q: "Litera Ă este...", options: ["Vocală", "Consoană"], answer: 0 },
      { q: "Litera M este...", options: ["Vocală", "Consoană"], answer: 1 },
      { q: "Litera Â este...", options: ["Vocală", "Consoană"], answer: 0 },
      { q: "Litera U este...", options: ["Vocală", "Consoană"], answer: 0 },
      { q: "Litera S este...", options: ["Vocală", "Consoană"], answer: 1 }
    ],
    pool: [
      { q: "Litera E este...", options: ["Vocală", "Consoană"], answer: 0 },
      { q: "Litera I este...", options: ["Vocală", "Consoană"], answer: 0 },
      { q: "Litera O este...", options: ["Vocală", "Consoană"], answer: 0 },
      { q: "Litera T este...", options: ["Vocală", "Consoană"], answer: 1 },
      { q: "Litera P este...", options: ["Vocală", "Consoană"], answer: 1 },
      { q: "Litera L este...", options: ["Vocală", "Consoană"], answer: 1 },
      { q: "Litera R este...", options: ["Vocală", "Consoană"], answer: 1 },
      { q: "Litera N este...", options: ["Vocală", "Consoană"], answer: 1 }
    ]
  },
  questions: [
    "Câte vocale sunt în alfabetul românesc? (7: A, E, I, O, U, Ă, Â)",
    "Care este prima literă a numelui tău?",
    "Cântează vocalele în ordine! A-E-I-O-U-Ă-Â",
    "Când scriem „î” și când scriem „â”?"
  ],
  parent: {
    watch: ["Copilul recunoaște literele", "Distinge vocalele de consoane"],
    help: ["Cântați împreună alfabetul", "Căutați litere în cărți și pe etichete"],
    redflags: ["Nu distinge vocalele — repetați cântatul A-E-I-O-U"]
  },
  pass: [
    "Recunoaște 10 litere",
    "Distinge 3 vocale de 3 consoane",
    "Asociază o literă cu sunetul ei"
  ]
},
{
  id: "lim-2", subject: "lim", num: 2, title: "Silabe", icon: "🗣️", duration: "20 min",
  montessori: {
    intro: "Montessori bate silabele: bati din palme pentru fiecare parte a cuvântului. „Ba-lan-ță” e 3 bătăi.",
    materials: [
      { icon: "👏", name: "Băt din palme", how: "Bate silabele numelui tău. Câte bătăi? Încearcă cu alte cuvinte." },
      { icon: "🥁", name: "Tob sau masă", how: "Bate silabele pe masă: „ma-șină” e 2 bătăi. Fă-ți cuvintele tale." },
    ],
    tips: [
      "Silabele sunt părțile cuvântului. Bati fiecare parte.",
      "Cuvintele scurte au 1 silabă, cele lungi au mai multe.",
    ]
  },
  objectives: [
    "Să înțeleagă ce este o silabă",
    "Să numere silabele dintr-un cuvânt",
    "Să bată din palme la fiecare silabă"
  ],
  explanation: [
    "O silabă este o „bucățică” de cuvânt pe care o putem rosti într-o singură suflare. Cuvântul „ma-nă” are 2 silabe, „ba-lon” are 2, „ca-meră” are 2.",
    "Pentru a număra silabele, batem din palme la fiecare silabă: ma (clap) - nă (clap). Câte clapete, atâtea silabe.",
    "Un truc: fiecare silabă are o vocală. Numărând vocalele, aflăm de obicei numărul de silabe."
  ],
  demo: {
    type: "quiz",
    title: "Câte silabe?",
    intro: "Numără silabele din fiecare cuvânt.",
    questions: [
      { q: "Câte silabe are „ma-nă”?", options: ["1", "2", "3"], answer: 1 },
      { q: "Câte silabe are „ba-lon”?", options: ["1", "2", "3"], answer: 1 },
      { q: "Câte silabe are „ca-meră”?", options: ["1", "2", "3"], answer: 1 },
      { q: "Câte silabe are „so-le-șe”?", options: ["2", "3", "4"], answer: 1 },
      { q: "Câte silabe are „fa-ntâ-nă”?", options: ["2", "3", "4"], answer: 1 }
    ],
    pool: [
      { q: "Câte silabe are „ca-să”?", options: ["1", "2", "3"], answer: 1 },
      { q: "Câte silabe are „me-re”?", options: ["1", "2", "3"], answer: 1 },
      { q: "Câte silabe are „pa-pu-șă”?", options: ["2", "3", "4"], answer: 1 },
      { q: "Câte silabe are „floa-re”?", options: ["1", "2", "3"], answer: 1 },
      { q: "Câte silabe are „ca-me-ra”?", options: ["2", "3", "4"], answer: 1 },
      { q: "Câte silabe are „pi-pă-ră”?", options: ["2", "3", "4"], answer: 1 },
      { q: "Câte silabe are „to-ca”?", options: ["1", "2", "3"], answer: 1 },
      { q: "Câte silabe are „ma-șină”?", options: ["1", "2", "3"], answer: 1 }
    ]
  },
  questions: [
    "Câte silabe are numele tău?",
    "Care cuvânt are mai multe silabe: „casă” sau „fântână”?",
    "Bate din palme la fiecare silabă din „balon”!"
  ],
  parent: {
    watch: ["Copilul numără silabe corect", "Bate din palme la silabe"],
    help: ["Jocați „clapeta”: bateți din palme la fiecare silabă", "Spuneți cuvinte și numărați silabele împreună"],
    redflags: ["Nu separă silabele — începeți cu cuvinte de 2 silabe"]
  },
  pass: [
    "Numără silabele din 3 cuvinte",
    "Bate din palme la fiecare silabă",
    "Explică ce este o silabă"
  ]
},
{
  id: "lim-3", subject: "lim", num: 3, title: "Cuvinte și propoziții", icon: "✍️", duration: "20 min",
  montessori: {
    intro: "Montessori folosește „alfabetul mobil”: pui literele împreună ca să faci cuvinte, ca un puzzle. Le poți muta până când cuvântul e corect.",
    materials: [
      { icon: "🔤", name: "Alfabet mobil", how: "Taie litere din carton. Pune-le împreună ca să faci cuvântul „casă”. Mute-le până e corect." },
      { icon: "✂️", name: "Puzzle de cuvinte", how: "Scrie un cuvânt pe hârtie și taie-l în litere. Amestecă-le și pune-le înapoi în ordine." },
    ],
    tips: [
      "Un cuvânt e făcut din litere. O propoziție e făcută din cuvinte.",
      "Fă mai întâi cuvinte scurte, apoi mai lungi.",
    ]
  },
  objectives: [
    "Să înțeleagă diferența dintre cuvânt și propoziție",
    "Să pună cuvintele în ordine corectă pentru a forma o propoziție",
    "Să recunoască subiectul și acțiunea dintr-o propoziție"
  ],
  explanation: [
    "Un cuvânt este o singură idee: „pisică”, „aleargă”, „roșie”. O propoziție este un grup de cuvinte care spun ceva complet: „Pisica aleargă repede.”",
    "O propoziție are de obicei un subiect (despre cine sau ce vorbim) și o acțiune (ce face). În „Pisica aleargă”, subiectul este „pisica”, acțiunea este „aleargă”.",
    "Un truc: o propoziție corectă începe cu literă mare și se termină cu punct."
  ],
  demo: {
    type: "arrange",
    title: "Pune cuvintele în ordine",
    intro: "Așază cuvintele în ordine ca să formezi o propoziție corectă.",
    questions: [
      { words: ["Pisica", "bea", "lapte"], answer: "Pisica bea lapte" },
      { words: ["Copilul", "citește", "carte"], answer: "Copilul citește carte" },
      { words: ["Flori", "mireasmă", "frumos"], answer: "Flori mireasmă frumos" },
      { words: ["Soarele", "răsare", "dimineața"], answer: "Soarele răsare dimineața" }
    ],
    extra: [
      { words: ["Pisica", "doarme", "pe", "pat"], answer: "Pisica doarme pe pat" },
      { words: ["Copilul", "joacă", "în", "parc"], answer: "Copilul joacă în parc" },
      { words: ["Mama", "cântă", "frumos"], answer: "Mama cântă frumos" },
      { words: ["Păsările", "zboară", "în", "cer"], answer: "Păsările zboară în cer" }
    ]
  },
  questions: [
    "Care este subiectul în „Copilul citește carte”?",
    "Ce lipsește la o propoziție corectă?",
    "Scrie o propoziție despre tine!"
  ],
  parent: {
    watch: ["Copilul formează propoziții corecte", "Recunoaște subiectul și acțiunea"],
    help: ["Jocați „cuvinte amestecate”: spuneți cuvinte și copilul le pune în ordine", "Scrieți împreună propoziții simple"],
    redflags: ["Pune cuvintele în ordine greșită — repetați cu propoziții de 3 cuvinte"]
  },
  pass: [
    "Formează 2 propoziții corecte",
    "Recunoaște subiectul dintr-o propoziție",
    "Explică diferența dintre cuvânt și propoziție"
  ]
},
{
  id: "lim-4", subject: "lim", num: 4, title: "Rime și sunete", icon: "🎵", duration: "20 min",
  montessori: {
    intro: "Montessori ascultă sunetele: găsești cuvinte care se termină la fel. „Soare” și „floare” se termină cu același sunet.",
    materials: [
      { icon: "🎵", name: "Joc de rime", how: "Spune un cuvânt și găsește altul care rimează: „măr” — „păr”, „casă” — „masă”." },
      { icon: "👂", name: "Ascultare", how: "Închide ochii și ascultă sunetele din jur. Care rimează?" },
    ],
    tips: [
      "Rimele sunt cuvinte care se termină cu același sunet.",
      "Spune cuvintele cu voce tare și ascultă finalul fiecăruia.",
    ]
  },
  objectives: [
    "Să înțeleagă ce este o rimă",
    "Să găsească cuvinte care rimează",
    "Să asocieze cuvinte cu sunetele lor"
  ],
  explanation: [
    "O rimă este când două cuvinte se termină cu același sunet. „Casă” rimează cu „masă”, „floare” cu „poate” (nu exact, dar aproape). Rimele fac poezia și cântecele frumoase.",
    "Cuvintele care rimează au aceeași „coadă” de sunete. „Mere” și „pere” rimează pentru că se termină cu „-ere”.",
    "Un truc: cântă cuvintele! Dacă se termină la fel, rimează."
  ],
  demo: {
    type: "match",
    title: "Găsește rimele",
    intro: "Asociază fiecare cuvânt cu cel care rimează cu el.",
    pairs: [
      { a: "🏠 Casă", b: "🪑 Masă" },
      { a: "🍎 Mere", b: "🍐 Pere" },
      { a: "🌸 Floare", b: "🌹 Roză" },
      { a: "🐱 Pisică", b: "🐶 Cățel" }
    ],
    pool: [
      { a: "🏠 Casă", b: "🪑 Masă" },
      { a: "🍎 Mere", b: "🍐 Pere" },
      { a: "🌸 Floare", b: "🌹 Roză" },
      { a: "🐱 Pisică", b: "🐶 Cățel" },
      { a: "🌞 Soare", b: "🌸 Floare" },
      { a: "🍎 Măr", b: "💇 Păr" }
    ]
  },
  questions: [
    "Ce rimăază cu „casă”?",
    "Găsește un cuvânt care rimăază cu „floare”!",
    "De ce fac rimele poezia frumoasă?"
  ],
  parent: {
    watch: ["Copilul găsește rime", "Asociază cuvinte cu sunete"],
    help: ["Jocați „rima”: spuneți un cuvânt și copilul găsește unul care rimăază", "Cântați împreună cântece cu rime"],
    redflags: ["Nu aude rimele — începeți cu rime clare (casă-masă)"]
  },
  pass: [
    "Găsește 3 perechi de rime",
    "Explică ce este o rimă",
    "Asociază 2 cuvinte cu sunetele lor"
  ]
},
{
  id: "lim-5", subject: "lim", num: 5, title: "Povestea mea", icon: "📝", duration: "25 min",
  montessori: {
    intro: "Montessori scrie cu „alfabetul mobil”: pui literele împreună ca să faci cuvinte, apoi scrii povestea. Le poți muta până când povestea e corectă.",
    materials: [
      { icon: "📝", name: "Alfabet mobil", how: "Pune literele împreună ca să faci cuvintele poveștii tale. Mute-le până e corect." },
      { icon: "📖", name: "Carte de povești", how: "Scrie povestea ta într-un caiet. Desenează o imagine pentru fiecare propoziție." },
    ],
    tips: [
      "O poveste are un început, un mijloc și un sfârșit.",
      "Spune mai întâi povestea cu voce tare, apoi scrie-o.",
    ]
  },
  objectives: [
    "Să scrie propoziții simple",
    "Să folosească literele corect",
    "Să creeze o mică poveste din 3-4 propoziții"
  ],
  explanation: [
    "Scrierea este modul în care punem gândurile pe hârtie. Când scriem, folosim literele pentru a forma cuvinte, iar cuvintele pentru a forma propoziții.",
    "O poveste are de obicei un început (cine și unde), un mijloc (ce se întâmplă) și un sfârșit (cum se termină). Chiar și o poveste de 3 propoziții poate fi frumoasă.",
    "Un truc: începe cu „Era odată...” sau „Azi am...”. Apoi adaugă ce s-a întâmplat și cum s-a terminat."
  ],
  demo: {
    type: "type",
    title: "Scrie o propoziție",
    intro: "Scrie o propoziție despre ce ai făcut azi.",
    prompt: "Scrie o propoziție care începe cu „Azi am...”",
    examples: ["Azi am citit o carte.", "Azi am jucat în parc.", "Azi am desenat o floare."],
    pool: [
      "Scrie o propoziție care începe cu „Azi am...”",
      "Scrie o propoziție care începe cu „Îmi place...”",
      "Scrie o propoziție care începe cu „Mâine voi...”",
      "Scrie o propoziție care începe cu „Familia mea...”",
      "Scrie o propoziție care începe cu „În vacanță...”",
      "Scrie o propoziție care începe cu „Prietenul meu...”"
    ]
  },
  questions: [
    "Scrie 3 propoziții despre familia ta.",
    "Care este începutul unei povești?",
    "Ce ai învățat azi?"
  ],
  parent: {
    watch: ["Copilul scrie propoziții simple", "Folosește literele corect"],
    help: ["Scrieți împreună o poveste scurtă", "Lăsați copilul să scrie despre ziua lui"],
    redflags: ["Scrie greu — lăsați-l să scrie cu majuscule sau să deseneze"]
  },
  pass: [
    "Scrie 2 propoziții corecte",
    "Folosește literă mare la început",
    "Creează o mică poveste de 3 propoziții"
  ]
},
{
  id: "lim-6", subject: "lim", num: 6, title: "Vocalele speciale: ă și â", icon: "🎩", duration: "20 min",
  montessori: {
    intro: "Montessori simte literele: scrii „ă” și „â” cu degetul și simți diferența. Pălăria mică de pe „a” schimbă sunetul.",
    materials: [
      { icon: "📜", name: "Litere de hârtie abrazivă", how: "Taie literele „ă” și „â” din carton. Trasează-le cu degetul și spune sunetul." },
      { icon: "🖐️", name: "Litere în aer", how: "Scrie „ă” și „â” în aer cu degetul. Mare, lent, și spune sunetul pe când scrii." },
    ],
    tips: [
      "„ă” spune „ah” și „â” spune „ah”. Sună diferit!",
      "Uită-te la pălăria mică: e deasupra lui „a” și schimbă sunetul.",
    ]
  },
  objectives: [
    "Să recunoască vocalele ă și â",
    "Să distingă când se scrie „î” și când „â”",
    "Să citească cuvinte cu ă și â"
  ],
  explanation: [
    "Românul are 7 vocale: A, E, I, O, U, Ă și Â. Două dintre ele sunt speciale pentru că au o „șapcă” deasupra: ă și â.",
    "Litera „ă” sună ca un „a” scurt și rotunjit. O găsim în cuvinte ca „păpușă”, „căciulă”, „măr”, „ăsta”. Litera „â” (și „î”) sună ca un „i” lung: „pâine”, „râu”, „mâncare”.",
    "Regula de aur: la începutul cuvântului scriem „î” (împreună, înot, îmi), iar în mijlocul cuvântului scriem „â” (pâine, râu, mâncare). Ambele sună la fel, dar se scriu diferit!"
  ],
  demo: {
    type: "quiz",
    title: "Când scriem î și când â?",
    intro: "Alege litera corectă pentru fiecare cuvânt.",
    questions: [
      { q: "La începutul cuvântului scriem...", options: ["î", "â"], answer: 0 },
      { q: "În mijlocul cuvântului scriem...", options: ["â", "î"], answer: 0 },
      { q: "Cuvântul „pâine” are...", options: ["â", "î"], answer: 0 },
      { q: "Cuvântul „împreună” are...", options: ["î", "â"], answer: 0 },
      { q: "Cuvântul „râu” are...", options: ["â", "î"], answer: 0 },
      { q: "Câte vocale are limba română?", options: ["7", "5"], answer: 0 }
    ],
    pool: [
      { q: "Cuvântul „mâncare” are...", options: ["â", "î"], answer: 0 },
      { q: "Cuvântul „înot” are...", options: ["î", "â"], answer: 0 },
      { q: "Cuvântul „îmi” are...", options: ["î", "â"], answer: 0 },
      { q: "Cuvântul „pâine” are...", options: ["â", "î"], answer: 0 },
      { q: "Cuvântul „râd” are...", options: ["â", "î"], answer: 0 },
      { q: "Cuvântul „împreună” are...", options: ["î", "â"], answer: 0 },
      { q: "La începutul cuvântului scriem...", options: ["î", "â"], answer: 0 },
      { q: "În mijlocul cuvântului scriem...", options: ["â", "î"], answer: 0 }
    ]
  },
  questions: [
    "Câte vocale are limba română?",
    "Când scriem „î” și când scriem „â”?",
    "Găsește 3 cuvinte cu „ă” în jurul tău!"
  ],
  parent: {
    watch: ["Copilul recunoaște ă și â", "Aplică regula î/â"],
    help: ["Căutați împreună cuvinte cu ă și â în cărți", "Jocați „care este litera specială”"],
    redflags: ["Confundă î cu â — repetați regula: început=î, mijloc=â"]
  },
  pass: [
    "Recunoaște vocalele ă și â",
    "Aplică regula î/â la 3 cuvinte",
    "Găsește 3 cuvinte cu ă în jurul tău"
  ]
},
{
  id: "lim-7", subject: "lim", num: 7, title: "Cuvinte din jurul tău", icon: "🏷️", duration: "20 min",
  montessori: {
    intro: "Montessori numește asta „lecția în trei perioade”: arăți cuvântul, îl numești, și copilul îl găsește. Lumea e o clasă mare.",
    materials: [
      { icon: "🏷️", name: "Etichete", how: "Scrie numele lucrurilor pe hârtie și lipește-le: „masă”, „fereastră”, „ușă”." },
      { icon: "🔍", name: "Vânătoare de cuvinte", how: "Mergi prin casă și găsește 5 cuvinte care încep cu „a”. Aduce-le și arată-le." },
    ],
    tips: [
      "Lumea e plină de cuvinte. Uită-te la semne, la cărți, la televizor.",
      "Găsește mai întâi cuvintele ușoare, apoi pe cele ascunse.",
    ]
  },
  objectives: [
    "Să asocieze cuvinte cu obiecte reale",
    "Să recunoască litere pe etichete și semne",
    "Să citească cuvinte simple din mediul înconjurător"
  ],
  explanation: [
    "Limbile nu sunt doar în cărți — sunt pretutindeni! Pe etichetele produselor, pe semnele din parc, pe cutiile de jucării și pe ușile din casă.",
    "Când ieși în oraș, caută cuvinte: „PIAZĂ”, „PARC”, „ȘCOALĂ”, „APĂ”. Fiecare cuvânt pe care îl citești este o victorie!",
    "Un truc: alege un obiect din casă și spune-l cu voce tare. Apoi caută-l scris: pe cutie, pe etichetă, pe pungi. Astfel leagă sunetul de literă."
  ],
  demo: {
    type: "match",
    title: "Cuvântul și obiectul",
    intro: "Asociază fiecare cuvânt cu obiectul pe care îl descrie.",
    pairs: [
      { a: "PÂINE", b: "🍞" },
      { a: "APĂ", b: "💧" },
      { a: "CARTE", b: "📖" },
      { a: "MERE", b: "🍎" },
      { a: "FLOARE", b: "🌸" }
    ],
    pool: [
      { a: "BANANĂ", b: "🍌" },
      { a: "MAȘINĂ", b: "🚗" },
      { a: "BALON", b: "🎈" },
      { a: "PISICĂ", b: "🐱" },
      { a: "BOMBOANE", b: "🍬" },
      { a: "FLUTURUȘ", b: "🦋" },
      { a: "FÂNTÂNĂ", b: "⛲" },
      { a: "LUNĂ", b: "🌙" }
    ]
  },
  questions: [
    "Câte cuvinte noi ai găsit azi în jurul tău?",
    "Unde ai văzut cuvântul „APĂ” scris?",
    "Care este primul cuvânt pe care l-ai citit azi?"
  ],
  parent: {
    watch: ["Copilul asociază cuvinte cu obiecte", "Citește etichete simple"],
    help: ["Cumpărați împreună și citiți etichetele", "Jocați „vânătoare de cuvinte” în parc"],
    redflags: ["Nu leagă sunetul de literă — repetați cuvintele cu voce tare"]
  },
  pass: [
    "Asociază 4 cuvinte cu obiecte",
    "Citește 2 etichete simple",
    "Găsește 3 cuvinte noi în jurul tău"
  ]
},

/* ==================== LOGICĂ ȘI GÂNDIRE ==================== */
{
  id: "log-1", subject: "log", num: 1, title: "Tipare și secvențe", icon: "🔁", duration: "20 min",
  montessori: {
    intro: "Montessori are „mărgele roșii”: faci tipare cu mărgelele și vezi cum se repetă. Tiparul e o melodie pe care o auzi cu ochii.",
    materials: [
      { icon: "🔴", name: "Mărgele sau nasturi", how: "Fă un tipar: roșu, albastru, roșu, albastru. Ce vine mai departe? Fă-ți tiparul tău." },
      { icon: "🧱", name: "Blocuri", how: "Fă un tipar cu blocuri: mare, mic, mare, mic. Ce vine mai departe?" },
    ],
    tips: [
      "Un tipar e ceva ce se repetă. Caută partea care se repetă.",
      "Fă mai întâi tipare ușoare, apoi mai grele.",
    ]
  },
  objectives: [
    "Să recunoască tipare simple (AB, AAB)",
    "Să completeze tipare cu elementul lipsă",
    "Să creeze propriul tipar"
  ],
  explanation: [
    "Un tipar este o secvență de obiecte care se repetă. De exemplu: roșu, albastru, roșu, albastru... (tipar AB). Sau: roșu, roșu, albastru, roșu, roșu, albastru... (tipar AAB).",
    "Pentru a completa un tipar, trebuie să ghicești ce vine după. Dacă tiparul este „măr, pere, măr, pere...”, după „măr” vine „pere”.",
    "Un truc: spune tiparul cu voce tare! „Măr, pere, măr, pere...” — auzi repetarea."
  ],
  demo: {
    type: "arrange",
    title: "Completează tiparul",
    intro: "Alege elementul care completează tiparul.",
    questions: [
      { words: ["🍎", "🍐", "🍎", "🍐", "❓"], answer: "🍎", pool: ["🍎", "🍐", "🍌"] },
      { words: ["⭐", "⭐", "🌙", "⭐", "⭐", "❓"], answer: "🌙", pool: ["⭐", "🌙", "☀️"] },
      { words: ["🔴", "🔵", "🟢", "🔴", "🔵", "❓"], answer: "🟢", pool: ["🔴", "🔵", "🟢"] },
      { words: ["🐱", "🐶", "🐱", "🐶", "❓"], answer: "🐱", pool: ["🐱", "🐶", "🐰"] }
    ],
    extra: [
      { words: ["🔺", "🔵", "🔺", "🔵", "❓"], answer: "🔺", pool: ["🔺", "🔵", "🟢"] },
      { words: ["🌸", "🌸", "🌻", "🌸", "🌸", "❓"], answer: "🌻", pool: ["🌸", "🌻", "🍀"] },
      { words: ["🍎", "🍌", "🍎", "🍌", "❓"], answer: "🍎", pool: ["🍎", "🍌", "🍇"] },
      { words: ["⭐", "🌙", "⭐", "🌙", "❓"], answer: "⭐", pool: ["⭐", "🌙", "☀️"] }
    ]
  },
  questions: [
    "Ce vine după: măr, pere, măr, pere, ...?",
    "Creează un tipar cu 3 obiecte!",
    "Care este tiparul: roșu, roșu, albastru, roșu, roșu, ...?"
  ],
  parent: {
    watch: ["Copilul recunoaște tipare", "Completează tipare corect"],
    help: ["Creați tipare cu obiecte: jucării, cuburi, mâncare", "Jocați „ce vine după”"],
    redflags: ["Nu vede repetarea — începeți cu tipare AB clare"]
  },
  pass: [
    "Recunoaște 2 tipare simple",
    "Completează 3 tipare corect",
    "Creează propriul tipar"
  ]
},
{
  id: "log-2", subject: "log", num: 2, title: "Ghici figura", icon: "🔍", duration: "20 min",
  montessori: {
    intro: "Montessori are un „cabinet geometric”: atingi forma cu ochii închiși și o ghicești. Forma se simte cu degetele, nu doar se vede.",
    materials: [
      { icon: "🧊", name: "Forme din carton", how: "Taie un pătrat, un triunghi și un cerc. Acoperă-ți ochii și atinge forma. Ghicește care e." },
      { icon: "🔲", name: "Cabinet geometric", how: "Pune formele într-o cutie. Ia una cu ochii închiși și ghicește-o înainte să deschizi ochii." },
    ],
    tips: [
      "Formele au colțuri și laturi. Numără-le cu degetul.",
      "Atinge mai întâi formele ușoare, apoi pe cele grele.",
    ]
  },
  objectives: [
    "Să ghicească o figură din indicii",
    "Să folosească proprietățile figurilor (laturi, colțuri)",
    "Să pună întrebări pentru a ghici"
  ],
  explanation: [
    "Ghici figura este un joc de logică: primești indicii despre o figură și trebuie s-o ghicești. De exemplu: „Are 3 laturi și 3 colțuri” — este triunghiul.",
    "Pentru a ghici, punem întrebări: „Are colțuri?”, „Câte laturi are?”, „Este rotundă?”. Fiecare răspuns ne apropie de figură.",
    "Un truc: începe cu întrebări largi („Are colțuri?”), apoi îngustează („Câte laturi?”)."
  ],
  demo: {
    type: "quiz",
    title: "Ghicește figura",
    intro: "Care figură se potrivește cu indiciile?",
    questions: [
      { q: "Are 4 laturi egale și 4 colțuri. Ce este?", options: ["Pătrat", "Triunghi", "Cerc"], answer: 0 },
      { q: "Are 3 laturi și 3 colțuri. Ce este?", options: ["Pătrat", "Triunghi", "Dreptunghi"], answer: 1 },
      { q: "Nu are colțuri, este rotund. Ce este?", options: ["Cerc", "Pătrat", "Triunghi"], answer: 0 },
      { q: "Are 4 laturi, dar cele opuse sunt egale. Ce este?", options: ["Pătrat", "Dreptunghi", "Triunghi"], answer: 1 },
      { q: "Are 5 laturi și 5 colțuri. Ce este?", options: ["Pătrat", "Pentagon", "Cerc"], answer: 1 }
    ],
    pool: [
      { q: "Are 4 laturi egale și 4 colțuri. Ce este?", options: ["Pătrat", "Dreptunghi", "Cerc"], answer: 0 },
      { q: "Are 3 laturi și 3 colțuri. Ce este?", options: ["Triunghi", "Pătrat", "Cerc"], answer: 0 },
      { q: "Nu are colțuri, este rotund. Ce este?", options: ["Pătrat", "Cerc", "Triunghi"], answer: 1 },
      { q: "Are 4 laturi, cele opuse sunt egale. Ce este?", options: ["Dreptunghi", "Pătrat", "Triunghi"], answer: 0 },
      { q: "Are 6 laturi și 6 colțuri. Ce este?", options: ["Pătrat", "Hexagon", "Cerc"], answer: 1 },
      { q: "Are 4 laturi egale, dar colțuri ascuțite. Ce este?", options: ["Pătrat", "Dreptunghi", "Cerc"], answer: 0 }
    ]
  },
  questions: [
    "Ce figură are 4 laturi egale?",
    "Pune o întrebare pentru a ghici o figură!",
    "Care figură nu are colțuri?"
  ],
  parent: {
    watch: ["Copilul ghicește figuri din indicii", "Pune întrebări logice"],
    help: ["Jocați „ghicește figura” cu forme din carton", "Dați indicii și lăsați copilul să ghicească"],
    redflags: ["Nu folosește proprietățile — repetați laturile și colțurile"]
  },
  pass: [
    "Ghicește 3 figuri din indicii",
    "Pune 2 întrebări logice",
    "Explică de ce o figură se potrivește cu indiciile"
  ]
},
{
  id: "log-3", subject: "log", num: 3, title: "Joc de memorie", icon: "🧠", duration: "20 min",
  montessori: {
    intro: "Montessori are „jocuri de memorie”: te uiți la obiecte, apoi închizi ochii și le ții minte. Memoria e un mușchi pe care îl poți antrena.",
    materials: [
      { icon: "🧠", name: "Joc de memorie", how: "Pune 5 obiecte pe masă. Uită-te la ele 10 secunde. Închide ochii și spune ce ai văzut." },
      { icon: "🃏", name: "Cartonașe", how: "Pune 6 cartonașe cu fața în jos. Răstoarnă 2 și vezi dacă se potrivesc. Ține minte unde e fiecare." },
    ],
    tips: [
      "Memoria e un mușchi: cu cât o folosești mai mult, cu atât e mai puternică.",
      "Ține minte mai întâi lucruri ușoare, apoi mai grele.",
    ]
  },
  objectives: [
    "Să își antreneze memoria vizuală",
    "Să găsească perechi identice",
    "Să își amintească poziția cărților"
  ],
  explanation: [
    "Jocul de memorie antrenează creierul să țină minte informații. Răsturnăm cărțile una câte una și încercăm să găsim perechile identice.",
    "Când găsești o pereche, rămâne deschisă. Când nu, o răsturni înapoi și încerci altă pereche. Scopul este să găsești toate perechile în cât mai puține mutări.",
    "Un truc: amintește-ți unde ai văzut fiecare carte. Cu cât joci mai mult, cu atât îți amintești mai bine."
  ],
  demo: {
    type: "memory",
    title: "Găsește perechile",
    intro: "Răsturnă cărțile și găsește perechile identice!",
    pairs: ["🐱", "🐶", "🦋", "🌸", "⭐", "🍎"],
    pool: ["🐸", "🦁", "🐢", "🌻", "🍌", "🚗", "🏀", "🍕", "🎈", "🐟", "🧸", "🍇"]
  },
  questions: [
    "Câte perechi ai găsit?",
    "Cum te-ai ajutat să ții minte cărțile?",
    "Care a fost perechea cea mai grea de găsit?"
  ],
  parent: {
    watch: ["Copilul își antrenează memoria", "Găsește perechi"],
    help: ["Jocați împreună jocul de memorie", "Încurajați-l să spună cu voce tare ce caută"],
    redflags: ["Se descurajează repede — începeți cu 4 perechi"]
  },
  pass: [
    "Găsește 3 perechi",
    "Ține minte poziția a 2 cărți",
    "Explică cum te-ai ajutat să ții minte"
  ]
},
{
  id: "log-4", subject: "log", num: 4, title: "Sortare și clasificare", icon: "🗂️", duration: "20 min",
  montessori: {
    intro: "Montessori are „jocuri de clasificare”: sortezi obiecte după culoare, mărime sau formă. Sortarea e cum creierul organizează lumea.",
    materials: [
      { icon: "🗂️", name: "Cutii de sortare", how: "Sortează nasturii după culoare: roșii într-o cutie, albaștri în alta. Încearcă cu alte lucruri." },
      { icon: "🧱", name: "Blocuri", how: "Sortează blocurile după mărime: mic, mediu, mare. Pune-le în ordine." },
    ],
    tips: [
      "Poți sorta după culoare, mărime, formă sau orice altceva.",
      "Sortează mai întâi după un lucru, apoi după două în același timp.",
    ]
  },
  objectives: [
    "Să sorteze obiecte după criterii (culoare, formă, mărime)",
    "Să creeze grupuri de obiecte",
    "Să explice criteriul de sortare"
  ],
  explanation: [
    "Sortarea înseamnă să punem obiectele în grupuri, după o regulă. De exemplu: toate roșiile într-un grup, toate albastrele în altul. Sau: toate rotunde, toate pătrate.",
    "Criteriul de sortare este regula pe care o folosim. Putem sorta după culoare, formă, mărime, tip (animale, fructe, jucării).",
    "Un truc: spune cu voce tare regula înainte să sortezi: „Pun toate roșiile aici, toate albastrele acolo”."
  ],
  demo: {
    type: "classify",
    title: "Sortează obiectele",
    intro: "Pune fiecare obiect în grupul potrivit!",
    zones: ["Fructe", "Animale"],
    items: [
      { label: "🍎 Măr", zone: 0 },
      { label: "🐱 Pisică", zone: 1 },
      { label: "🍌 Banană", zone: 0 },
      { label: "🐶 Cățel", zone: 1 },
      { label: "🍇 Struguri", zone: 0 },
      { label: "🦋 Fluture", zone: 1 }
    ],
    pool: [
      { label: "🍐 Pară", zone: 0 },
      { label: "🐸 Broască", zone: 1 },
      { label: "🍊 Portocală", zone: 0 },
      { label: "🐟 Pește", zone: 1 },
      { label: "🍓 Câpșună", zone: 0 },
      { label: "🐢 Țestoasă", zone: 1 },
      { label: "🍉 Pepene", zone: 0 },
      { label: "🦁 Leu", zone: 1 }
    ]
  },
  questions: [
    "După ce criteriu ai sortat obiectele?",
    "Găsește alt criteriu de sortare!",
    "Câte obiecte sunt în fiecare grup?"
  ],
  parent: {
    watch: ["Copilul sortează obiecte corect", "Explică criteriul de sortare"],
    help: ["Sortați împreună obiecte din casă: jucării, fructe, haine", "Jocați „pune în grup”"],
    redflags: ["Nu explică criteriul — întrebați „de ce le-ai pus aici?”"]
  },
  pass: [
    "Sortează 6 obiecte corect",
    "Explică criteriul de sortare",
    "Creează un grup nou cu alt criteriu"
  ]
},
{
  id: "log-5", subject: "log", num: 5, title: "Probleme logice", icon: "🧩", duration: "25 min",
  montessori: {
    intro: "Montessori are „jocuri logice”: rezolvi probleme cu obiecte reale. Problema e un puzzle pe care îl poți atinge.",
    materials: [
      { icon: "🧩", name: "Puzzle", how: "Rezolvă un puzzle cu 10 piese. Începe cu marginile, apoi completează mijlocul." },
      { icon: "🧱", name: "Blocuri", how: "Construiește o turn cu 5 blocuri. Câte blocuri ai nevoie ca să fie mai înalt?" },
    ],
    tips: [
      "O problemă e un puzzle. Caută piesa care se potrivește.",
      "Încearcă mai întâi modul ușor, apoi cel greu.",
    ]
  },
  objectives: [
    "Să rezolve probleme logice simple",
    "Să folosească eliminarea (ce nu poate fi)",
    "Să explice raționamentul"
  ],
  explanation: [
    "Problemele logice ne învață să gândim pas cu pas. De exemplu: „Ana este mai înaltă decât Berta. Berta este mai înaltă decât Ceca. Cine este cea mai înaltă?” Răspuns: Ana.",
    "Un truc bun este eliminarea: dacă știm că ceva NU este adevărat, îl scoatem din listă. Rămâne doar răspunsul corect.",
    "Alt truc: desenează sau scrie pașii. Dacă Ana > Berta și Berta > Ceca, atunci Ana > Berta > Ceca."
  ],
  demo: {
    type: "quiz",
    title: "Probleme logice",
    intro: "Gândește pas cu pas și alege răspunsul corect.",
    questions: [
      { q: "Ana este mai înaltă decât Berta. Berta este mai înaltă decât Ceca. Cine este cea mai înaltă?", options: ["Ana", "Berta", "Ceca"], answer: 0 },
      { q: "Mihai are 3 mere. Ioana are cu 2 mai multe. Câte mere are Ioana?", options: ["1", "5", "6"], answer: 1 },
      { q: "Un ceainic are 4 căni. Dacă se toarnă în 2 căni, câte căni rămân goale?", options: ["2", "3", "4"], answer: 0 },
      { q: "Pisica este în casă. Cățelul este în curte. Unde este pisica?", options: ["În casă", "În curte", "În parc"], answer: 0 },
      { q: "Are 3 bile roșii și 2 albastre. Câte bile are în total?", options: ["3", "5", "6"], answer: 1 }
    ],
    pool: [
      { q: "Ana este mai înaltă decât Berta. Berta este mai înaltă decât Ceca. Cine este cea mai înaltă?", options: ["Ceca", "Ana", "Berta"], answer: 1 },
      { q: "Mihai are 4 mere. Ioana are cu 2 mai multe. Câte mere are Ioana?", options: ["2", "6", "8"], answer: 1 },
      { q: "Pisica este în casă. Cățelul este în curte. Unde este pisica?", options: ["În curte", "În casă", "În parc"], answer: 1 },
      { q: "Are 3 bile roșii și 2 albastre. Câte bile are în total?", options: ["5", "3", "6"], answer: 0 },
      { q: "Maria are 5 flori. Dă 2 unei prietene. Câte flori îi rămân?", options: ["7", "3", "2"], answer: 1 },
      { q: "Un scaun are 4 picioare. Câte picioare au 2 scaune?", options: ["6", "8", "4"], answer: 1 }
    ]
  },
  questions: [
    "Explică cum ai rezolvat prima problemă.",
    "Ce este „eliminarea”?",
    "Creează o problemă logică pentru un prieten!"
  ],
  parent: {
    watch: ["Copilul rezolvă probleme logice", "Explică raționamentul"],
    help: ["Jocați „de ce crezi?” — întrebați întotdeauna cum a gândit", "Creați probleme logice simple împreună"],
    redflags: ["Nu explică raționamentul — întrebați „cum ai știut?”"]
  },
  pass: [
    "Rezolvă 3 probleme logice",
    "Explică raționamentul pentru 2 probleme",
    "Folosește eliminarea pentru a rezolva o problemă"
  ]
},
{
  id: "log-6", subject: "log", num: 6, title: "Puzzle din jurul tău", icon: "🧮", duration: "25 min",
  montessori: {
    intro: "Montessori numește asta „lecția în trei perioade”: arăți puzzle-ul, îl numești, și copilul îl găsește. Lumea e o clasă mare.",
    materials: [
      { icon: "🧮", name: "Coș de puzzle-uri", how: "Colecționează 5 puzzle-uri din casă. Rezolvă-le unul câte unul." },
      { icon: "🔍", name: "Vânătoare de puzzle-uri", how: "Mergi prin casă și găsește 3 puzzle-uri. Aduce-le și rezolvă-le." },
    ],
    tips: [
      "Lumea e plină de puzzle-uri. Uită-te la podea, la tavan, la pereți.",
      "Rezolvă mai întâi puzzle-urile ușoare, apoi pe cele grele.",
    ]
  },
  objectives: [
    "Să rezolve probleme logice cu obiecte reale",
    "Să numere și să compare obiecte din mediul înconjurător",
    "Să gândească pas cu pas"
  ],
  explanation: [
    "Gândirea logică este ca un detectiv: aduni indicii, numără și descoperi răspunsul. Indiciile sunt pretutindeni — în coșuri, în scaune, în roți și în degete.",
    "De exemplu: dacă vezi 3 scaune și știi că fiecare are 4 picioare, poți număra: 4, 8, 12. Sau poți înmulți: 3 × 4 = 12.",
    "Un truc: desparte problema în pași mici. Mai întâi numără obiectele, apoi numără părțile fiecăruia, apoi adună. Gândirea pas cu pas te ajută să nu te pierzi!"
  ],
  demo: {
    type: "gen",
    title: "Detectivul obiectelor",
    intro: "Rezolvă puzzle-uri cu obiecte reale din jurul tău.",
    rounds: 5
  },
  questions: [
    "Câte picioare au 2 scaune?",
    "Cum desparți o problemă mare în pași mici?",
    "Unde ai găsit un puzzle în jurul tău azi?"
  ],
  parent: {
    watch: ["Copilul rezolvă probleme cu obiecte reale", "Gândește pas cu pas"],
    help: ["Jocați „detectivul” — dați indicii și numărați împreună", "Creați puzzle-uri cu jucării"],
    redflags: ["Se pierde în probleme — desparteți-le în pași mici împreună"]
  },
  pass: [
    "Rezolvă 3 puzzle-uri cu obiecte reale",
    "Explică pașii pentru 2 probleme",
    "Găsește un puzzle în jurul tău"
  ]
},
{
  id: "log-7", subject: "log", num: 7, title: "Ce vine mai departe?", icon: "🔮", duration: "20 min",
  montessori: {
    intro: "Montessori are „jocuri de secvențe”: te uiți la o secvență și ghicești ce vine mai departe. Secvența e o melodie pe care o auzi cu ochii.",
    materials: [
      { icon: "🔮", name: "Joc de secvențe", how: "Uită-te la secvența: 1, 2, 3, 4. Ce vine mai departe? Fă-ți secvența ta." },
      { icon: "🧱", name: "Blocuri", how: "Fă o secvență cu blocuri: 1, 2, 3. Câte blocuri ai nevoie pentru următoarea?" },
    ],
    tips: [
      "O secvență e ceva ce crește sau se repetă. Caută regula.",
      "Ghicește mai întâi, apoi verifică.",
    ]
  },
  objectives: [
    "Să recunoască tipare mai complexe",
    "Să prevadă elementul următor dintr-o secvență",
    "Să creeze propriile tipare"
  ],
  explanation: [
    "Tiparele sunt ca muzica: se repetă și ne bucură. Unele tipare sunt simple (măr, pere, măr, pere...), altele sunt mai complexe (măr, măr, pere, măr, măr, pere...).",
    "Pentru a ghici ce vine mai departe, ascultă „melodia” tiparului. Repetă-l de câteva ori și vei simți ce lipsește.",
    "Un truc: spune tiparul cu voce tare și bate din palme la fiecare element. Ritmul te ajută să auzi ce vine după."
  ],
  demo: {
    type: "arrange",
    title: "Completează tiparul",
    intro: "Alege elementul care completează tiparul.",
    questions: [
      { words: ["🍎", "🍐", "🍎", "🍐", "❓"], pool: ["🍎", "🍐", "🍊"], answer: "🍎" },
      { words: ["🔵", "🔵", "🔴", "🔵", "🔵", "❓"], pool: ["🔵", "🔴", "🟢"], answer: "🔴" },
      { words: ["⭐", "🌙", "⭐", "🌙", "⭐", "❓"], pool: ["⭐", "🌙", "☀️"], answer: "🌙" },
      { words: ["🐱", "🐶", "🐱", "🐶", "🐱", "❓"], pool: ["🐱", "🐶", "🐰"], answer: "🐶" }
    ],
    extra: [
      { words: ["🔺", "🔵", "🔺", "🔵", "❓"], pool: ["🔺", "🔵", "🟢"], answer: "🔺" },
      { words: ["🌸", "🌸", "🌻", "🌸", "🌸", "❓"], pool: ["🌸", "🌻", "🍀"], answer: "🌻" },
      { words: ["🍎", "🍌", "🍎", "🍌", "❓"], pool: ["🍎", "🍌", "🍇"], answer: "🍎" },
      { words: ["⭐", "🌙", "⭐", "🌙", "❓"], pool: ["⭐", "🌙", "☀️"], answer: "⭐" }
    ]
  },
  questions: [
    "Ce vine după: măr, pere, măr, pere, ...?",
    "Creează un tipar de 4 elemente!",
    "Care este diferența dintre un tipar simplu și unul complex?"
  ],
  parent: {
    watch: ["Copilul recunoaște tipare complexe", "Previne elementul următor"],
    help: ["Creați tipare cu jucării și cereți copilului să completeze", "Bateți din palme la fiecare element"],
    redflags: ["Nu simte ritmul tiparului — repetați cu voce tare"]
  },
  pass: [
    "Completează 3 tipare corect",
    "Previne elementul următor",
    "Creează un tipar propriu"
  ]
},

/* ==================== INFORMATICĂ ==================== */
{
  id: "inf-1", subject: "inf", num: 1, title: "Ce este un calculator?", icon: "💻", duration: "20 min",
  montessori: {
    intro: "Montessori are „viața practică”: faci lucruri reale cu mâinile. Un calculator e un instrument pe care îl poți atinge și folosi.",
    materials: [
      { icon: "💻", name: "Calculator", how: "Atinge calculatorul: ecranul, tastatura, mouse-ul. Ce face fiecare parte?" },
      { icon: "🔍", name: "Vânătoare de calculatoare", how: "Mergi prin casă și găsește 3 lucruri care sunt ca un calculator: telefon, tabletă, televizor." },
    ],
    tips: [
      "Un calculator e un instrument. Îl folosești ca să faci lucruri.",
      "Atinge mai întâi părțile ușoare, apoi pe cele grele.",
    ]
  },
  objectives: [
    "Să recunoască părțile unui calculator",
    "Să înțeleagă ce face un calculator",
    "Să distingă calculatorul de alte dispozitive"
  ],
  explanation: [
    "Un calculator este o mașină care ne ajută să lucrăm, să jucăm și să învățăm. Are un ecran (unde vedem), o tastatură (unde scriem) și un mouse (unde apăsăm).",
    "Calculatorul primește informații (input), le procesează (gândește) și ne dă rezultate (output). De exemplu: apăsăm o tastă (input), calculatorul o procesează, și apare litera pe ecran (output).",
    "Un truc: calculatorul este ca un creier electronic — primește, gândește, răspunde."
  ],
  demo: {
    type: "classify",
    title: "Părțile calculatorului",
    intro: "Pune fiecare piesă în grupul potrivit!",
    zones: ["Calculator", "Nu e calculator"],
    items: [
      { label: "🖥️ Ecran", zone: 0 },
      { label: "📱 Telefon", zone: 1 },
      { label: "⌨️ Tastatură", zone: 0 },
      { label: "📺 Televizor", zone: 1 },
      { label: "🖱️ Mouse", zone: 0 },
      { label: "📻 Radio", zone: 1 }
    ],
    pool: [
      { label: "🖥️ Ecran", zone: 0 },
      { label: "📱 Telefon", zone: 1 },
      { label: "⌨️ Tastatură", zone: 0 },
      { label: "📺 Televizor", zone: 1 },
      { label: "🖱️ Mouse", zone: 0 },
      { label: "📻 Radio", zone: 1 },
      { label: "🖨️ Imprimantă", zone: 0 },
      { label: "📷 Aparat foto", zone: 1 }
    ]
  },
  questions: [
    "Care sunt cele 3 părți principale ale unui calculator?",
    "Ce este input, ce este output?",
    "Ce alt dispozitiv este ca un calculator?"
  ],
  parent: {
    watch: ["Copilul recunoaște părțile calculatorului", "Înțelege input/output"],
    help: ["Arătați-i părțile calculatorului: ecran, tastatură, mouse", "Jocați „ce face calculatorul”"],
    redflags: ["Confundă calculatorul cu televizorul — explicați diferența"]
  },
  pass: [
    "Recunoaște 3 părți ale calculatorului",
    "Explică ce este input și output",
    "Distinge calculatorul de alte dispozitive"
  ]
},
{
  id: "inf-2", subject: "inf", num: 2, title: "Mouse-ul și tastatura", icon: "🖱️", duration: "20 min",
  montessori: {
    intro: "Montessori are „viața practică”: faci lucruri reale cu mâinile. Mouse-ul și tastatura sunt instrumente pe care le poți atinge și folosi.",
    materials: [
      { icon: "🖱️", name: "Mouse", how: "Mișcă mouse-ul: stânga, dreapta, sus, jos. Dă click pe lucruri. Fă-ți jocul tău." },
      { icon: "⌨️", name: "Tastatură", how: "Apasă tasta: A, B, C. Tastează numele tău. Fă-ți cuvintele tale." },
    ],
    tips: [
      "Mouse-ul mișcă săgeata. Tastatura tastează litere.",
      "Mișcă mai întâi mouse-ul încet, apoi mai repede.",
    ]
  },
  objectives: [
    "Să folosească mouse-ul (click, dublu-click)",
    "Să folosească tastatura (litere, spațiu, enter)",
    "Să navigheze pe ecran"
  ],
  explanation: [
    "Mouse-ul este ca degetul tău pe ecran. Apasă butonul stâng pentru a selecta (click), apasă de două ori rapid pentru a deschide (dublu-click).",
    "Tastatura are litere, numere și taste speciale. Tasta „spațiu” este cea mai lată — o folosim între cuvinte. Tasta „Enter” este ca un „gata” sau „nou rând”.",
    "Un truc: ține mouse-ul ca pe o lingură, nu ca pe un pumn. Degetul mare pe butonul stâng."
  ],
  demo: {
    type: "quiz",
    title: "Cum folosim mouse-ul și tastatura?",
    intro: "Alege răspunsul corect.",
    questions: [
      { q: "Cum deschizi un program cu mouse-ul?", options: ["Click simplu", "Dublu-click", "Nu se poate"], answer: 1 },
      { q: "Ce tastă folosim între cuvinte?", options: ["Enter", "Spațiu", "Shift"], answer: 1 },
      { q: "Ce face tasta Enter?", options: ["Șterge", "Nou rând", "Închide"], answer: 1 },
      { q: "Cum selectezi un obiect cu mouse-ul?", options: ["Click simplu", "Dublu-click", "Nu se poate"], answer: 0 },
      { q: "Cum ții mouse-ul?", options: ["Ca pe un pumn", "Ca pe o lingură", "Cu toată mâna"], answer: 1 }
    ],
    pool: [
      { q: "Cum deschizi un program cu mouse-ul?", options: ["Dublu-click", "Click simplu", "Nu se poate"], answer: 0 },
      { q: "Ce tastă folosim între cuvinte?", options: ["Enter", "Spațiu", "Shift"], answer: 1 },
      { q: "Ce face tasta Enter?", options: ["Nou rând", "Șterge", "Închide"], answer: 0 },
      { q: "Cum selectezi un obiect cu mouse-ul?", options: ["Dublu-click", "Click simplu", "Nu se poate"], answer: 1 },
      { q: "Cum ții mouse-ul?", options: ["Ca pe o lingură", "Ca pe un pumn", "Cu toată mâna"], answer: 0 },
      { q: "Ce este cea mai lată tastă?", options: ["Spațiu", "Enter", "A"], answer: 0 }
    ]
  },
  questions: [
    "Care este diferența dintre click și dublu-click?",
    "Ce tastă este cea mai lată de pe tastatură?",
    "Cum deschizi un fișier cu mouse-ul?"
  ],
  parent: {
    watch: ["Copilul folosește mouse-ul corect", "Folosește tastatura"],
    help: ["Practicați împreună click, dublu-click, scriere", "Jocați jocuri simple de navigare"],
    redflags: ["Ține mouse-ul greșit — arătați-i poziția corectă"]
  },
  pass: [
    "Folosește click și dublu-click",
    "Scrie cu tastatura 3 litere",
    "Explică ce face tasta Enter"
  ]
},
{
  id: "inf-3", subject: "inf", num: 3, title: "Algoritmi simpli", icon: "📋", duration: "25 min",
  montessori: {
    intro: "Montessori are „jocuri de secvențe”: faci lucruri în ordine. Un algoritm e o listă de pași pe care îi urmezi.",
    materials: [
      { icon: "📋", name: "Rețetă", how: "Scrie o rețetă pentru a face un sandviș: 1. Ia pâinea. 2. Pune brânza. 3. Închide-l. Urmează pașii." },
      { icon: "🧱", name: "Blocuri", how: "Construiește o turn: 1. Ia un bloc. 2. Pune-l pe masă. 3. Pune alt bloc deasupra. Urmează pașii." },
    ],
    tips: [
      "Un algoritm e o listă de pași. Ii faci în ordine.",
      "Scrie mai întâi pași ușori, apoi mai greli.",
    ]
  },
  objectives: [
    "Să înțeleagă ce este un algoritm",
    "Să pună pașii în ordine corectă",
    "Să creeze un algoritm simplu"
  ],
  explanation: [
    "Un algoritm este o listă de pași, în ordine, care te ajută să faci ceva. De exemplu: „Cum fac ceai”: 1. Pun apă în ceainic. 2. Aștept să fiarbă. 3. Pun punga de ceai. 4. Aștept 3 minute. 5. Toarn în ceașcă.",
    "Calculatorul urmează algoritmi: pași clari, în ordine, fără să sară nimic. Dacă un pas lipsește, calculatorul nu știe ce să facă.",
    "Un truc: un algoritm bun are pași clari, în ordine, și se termină cu un rezultat."
  ],
  demo: {
    type: "arrange",
    title: "Pune pașii în ordine",
    intro: "Așază pașii în ordine ca să faci un sandviș.",
    questions: [
      { words: ["Iau pâine", "Pun brânza", "Pun roșia", "Închid sandvișul"], answer: "Iau pâine, Pun brânza, Pun roșia, Închid sandvișul" },
      { words: ["Mă trezesc", "Mă spăl", "Mănânc", "Merg la școală"], answer: "Mă trezesc, Mă spăl, Mănânc, Merg la școală" },
      { words: ["Iau creionul", "Desenez un cer", "Desenez un soare", "Coloriez"], answer: "Iau creionul, Desenez un cer, Desenez un soare, Coloriez" }
    ],
    extra: [
      { words: ["Mă trezesc", "Mă spăl", "Mănânc", "Merg la școală"], answer: "Mă trezesc, Mă spăl, Mănânc, Merg la școală" },
      { words: ["Pun apă", "Aștept să fiarbă", "Pun ceaiul", "Toarn în ceașcă"], answer: "Pun apă, Aștept să fiarbă, Pun ceaiul, Toarn în ceașcă" },
      { words: ["Iau hainele", "Mă îmbrac", "Mă pieptănez", "Merg afară"], answer: "Iau hainele, Mă îmbrac, Mă pieptănez, Merg afară" }
    ]
  },
  questions: [
    "Ce este un algoritm?",
    "Creează un algoritm pentru „cum te îmbraci”!",
    "Ce se întâmplă dacă un pas lipsește din algoritm?"
  ],
  parent: {
    watch: ["Copilul înțelege ideea de algoritm", "Pune pașii în ordine"],
    help: ["Creați algoritmi împreună: cum fac ceai, cum te îmbraci", "Jocați „ce vine după” cu pași"],
    redflags: ["Sare pași — repetați cu algoritmi de 3 pași"]
  },
  pass: [
    "Explică ce este un algoritm",
    "Pune 3 pași în ordine corectă",
    "Creează un algoritm simplu"
  ]
},
{
  id: "inf-4", subject: "inf", num: 4, title: "Gândim ca programatori", icon: "🤖", duration: "25 min",
  montessori: {
    intro: "Montessori are „jocuri logice”: rezolvi probleme cu obiecte reale. Programarea e un puzzle pe care îl poți atinge.",
    materials: [
      { icon: "🤖", name: "Robot", how: "Fii robot: prietenul tău spune „mearge înainte” și tu mergi înainte. „Întoarce-te stânga” și te întorci stânga." },
      { icon: "🧱", name: "Blocuri", how: "Construiește o casă cu blocuri: 1. Fă podeaua. 2. Fă pereții. 3. Fă acoperișul. Urmează pașii." },
    ],
    tips: [
      "Programarea e darea de instrucțiuni. Spui ce să faci, pas cu pas.",
      "Dă mai întâi instrucțiuni ușoare, apoi mai grele.",
    ]
  },
  objectives: [
    "Să înțeleagă ce înseamnă a programa",
    "Să descompună o sarcină în pași mici",
    "Să găsească erori într-un algoritm"
  ],
  explanation: [
    "A programa înseamnă să îi spui calculatorului ce să facă, pas cu pas. Programatorii descompun problemele mari în pași mici, clari.",
    "Uneori algoritmul are o greșeală — o numim „bug”. De exemplu: „Pune apa în ceainic, toarn în ceașcă” — lipsește pasul „așteaptă să fiarbă”. Bug-ul este lipsa unui pas.",
    "Un truc: când găsești un bug, întreabă-te: „Ce pas lipsește?” sau „Ce pas este în ordine greșită?”"
  ],
  demo: {
    type: "quiz",
    title: "Găsește bug-ul",
    intro: "Care pas lipsește sau este greșit?",
    questions: [
      { q: "Algoritm: „Iau pâine, pun brânza, închid sandvișul”. Ce lipsește?", options: ["Roșia", "Mâncatul", "Nimic"], answer: 0 },
      { q: "Algoritm: „Mă trezesc, merg la școală, mă spăl”. Ce este greșit?", options: ["Ordinea", "Nimic", "Lipsește un pas"], answer: 0 },
      { q: "Ce este un „bug”?", options: ["Un pas lipsă", "Un program bun", "Un calculator"], answer: 0 },
      { q: "Algoritm: „Pun apă, aștept să fiarbă, pun ceaiul”. Ce lipsește?", options: ["Toarn în ceașcă", "Nimic", "Un alt ceainic"], answer: 0 },
      { q: "Cum găsești un bug?", options: ["Verifici pașii", "Nu poți", "Ștergi tot"], answer: 0 }
    ],
    pool: [
      { q: "Algoritm: „Iau pâine, pun brânza, închid sandvișul”. Ce lipsește?", options: ["Mâncatul", "Roșia", "Nimic"], answer: 1 },
      { q: "Algoritm: „Mă trezesc, merg la școală, mă spăl”. Ce este greșit?", options: ["Lipsește un pas", "Ordinea", "Nimic"], answer: 1 },
      { q: "Ce este un „bug”?", options: ["Un program bun", "Un pas lipsă", "Un calculator"], answer: 1 },
      { q: "Algoritm: „Pun apă, aștept să fiarbă, pun ceaiul”. Ce lipsește?", options: ["Un alt ceainic", "Toarn în ceașcă", "Nimic"], answer: 1 },
      { q: "Cum găsești un bug?", options: ["Nu poți", "Verifici pașii", "Ștergi tot"], answer: 1 }
    ]
  },
  questions: [
    "Ce este un bug?",
    "Găsește bug-ul din: „Mă trezesc, mănânc, mă spăl, merg la școală”.",
    "Cum descompui o problemă mare în pași mici?"
  ],
  parent: {
    watch: ["Copilul descompune sarcini în pași", "Găsește erori"],
    help: ["Jocați „găsește bug-ul” cu algoritmi", "Descompuneți împreună sarcini simple"],
    redflags: ["Nu vede erorile — repetați cu algoritmi scurte"]
  },
  pass: [
    "Explică ce este un bug",
    "Găsește bug-ul din 2 algoritmi",
    "Descompune o sarcină în 3 pași"
  ]
},
{
  id: "inf-5", subject: "inf", num: 5, title: "Sortăm ca un computer", icon: "🗃️", duration: "20 min",
  montessori: {
    intro: "Montessori are „jocuri de clasificare”: sortezi obiecte după culoare, mărime sau formă. Sortarea e cum computerul organizează lucrurile.",
    materials: [
      { icon: "🗃️", name: "Cutii de sortare", how: "Sortează cartonașele după număr: 1, 2, 3, 4. Pune-le în ordine." },
      { icon: "🧱", name: "Blocuri", how: "Sortează blocurile după mărime: mic, mediu, mare. Pune-le în ordine." },
    ],
    tips: [
      "Un computer sortează lucrurile după mărime sau număr. Poți și tu!",
      "Sortează mai întâi lucruri ușoare, apoi mai grele.",
    ]
  },
  objectives: [
    "Să înțeleagă ce înseamnă a sorta date",
    "Să grupeze obiecte după criterii",
    "Să recunoască categorii în viața reală"
  ],
  explanation: [
    "Calculatoarele sunt foarte bune la sortare: ordonează și grupează informațiile. Noi putem face la fel cu obiecte din jurul nostru!",
    "De exemplu: poți sorta jucăriile pe culori (roșu, albastru, verde), pe tip (mașini, păpuși, blocuri) sau pe mărime (mic, mediu, mare).",
    "Un truc: alege un criteriu (o regulă) și pune fiecare obiect în categoria potrivită. Calculatoarele fac exact asta — doar că mult mai repede!"
  ],
  demo: {
    type: "classify",
    title: "Sortează obiectele",
    intro: "Pune fiecare obiect în categoria potrivită.",
    zones: ["Fructe", "Legume", "Jucării"],
    items: [
      { label: "🍎 Măr", zone: 0 },
      { label: "🥕 Morcov", zone: 1 },
      { label: "🧸 Ursuleț", zone: 2 },
      { label: "🍌 Banană", zone: 0 },
      { label: "🥦 Broccoli", zone: 1 },
      { label: "⚽ Minge", zone: 2 }
    ],
    pool: [
      { label: "🍇 Struguri", zone: 0 },
      { label: "🥒 Castravete", zone: 1 },
      { label: "🧸 Ursuleț", zone: 2 },
      { label: "🍊 Portocală", zone: 0 },
      { label: "🌽 Porumb", zone: 1 },
      { label: "🎲 Zar", zone: 2 },
      { label: "🍓 Câpșună", zone: 0 },
      { label: "🥔 Cartof", zone: 1 }
    ]
  },
  questions: [
    "Cum sortezi jucăriile din camera ta?",
    "Ce criterii poți folosi pentru a sorta fructele?",
    "Ce face un calculator când sortează date?"
  ],
  parent: {
    watch: ["Copilul sortează obiecte după criterii", "Grupați categorii"],
    help: ["Sortați împreună jucăriile sau hainele", "Jocați „pune în cutia potrivită”"],
    redflags: ["Nu alege un criteriu clar — alegeți împreună o regulă"]
  },
  pass: [
    "Sortează 5 obiecte corect",
    "Alege un criteriu de sortare",
    "Explică cum sortează un computer"
  ]
},
{
  id: "inf-6", subject: "inf", num: 6, title: "Algoritmul zilei mele", icon: "📅", duration: "25 min",
  montessori: {
    intro: "Montessori are „viața practică”: faci lucruri reale în ordine. Ziua ta e un algoritm pe care îl urmezi în fiecare zi.",
    materials: [
      { icon: "📅", name: "Program de zi", how: "Scrie ziua ta: 1. Te trezești. 2. Mănânci micul dejun. 3. Mergi la școală. Urmează pașii." },
      { icon: "🧱", name: "Blocuri", how: "Construiește ziua ta cu blocuri: un bloc pentru fiecare lucru pe care îl faci. Pune-le în ordine." },
    ],
    tips: [
      "Ziua ta e un algoritm. Făci lucrurile în ordine.",
      "Scrie mai întâi pașii ușori, apoi pe cei greli.",
    ]
  },
  objectives: [
    "Să ordoneze pașii unei activități",
    "Să înțeleagă ordinea cronologică",
    "Să creeze un algoritm pentru rutina zilnică"
  ],
  explanation: [
    "Un algoritm este o listă de pași, în ordine, care ne ajută să facem ceva. Dimineața, de exemplu, urmezi un algoritm: te trezești, te speli, mănânci, mergi la școală.",
    "Dacă schimbi ordinea pașilor, lucrurile nu mai merg bine! Nu te poți spăla pe dinți înainte să te trezești. Ordinea contează.",
    "Un truc: spune-ți rutina dimineții cu voce tare, pas cu pas. Apoi scrie-o sau deseneaz-o. Așa înveți cum gândesc calculatoarele — pas cu pas, în ordine!"
  ],
  demo: {
    type: "arrange",
    title: "Pune pașii în ordine",
    intro: "Aranjează pașii dimineții în ordinea corectă.",
    questions: [
      { words: ["Te trezești", "Te speli", "Mănânci", "Mergi la școală"], answer: "Te trezești Te speli Mănânci Mergi la școală" },
      { words: ["Ieși afară", "Pune hainele", "Pune încălțămintea", "Deschizi ușa"], answer: "Pune hainele Pune încălțămintea Deschizi ușa Ieși afară" },
      { words: ["Speli pe dinți", "Îți pui periuța", "Pui pastă", "Te speli"], answer: "Îți pui periuța Pui pastă Speli pe dinți Te speli" }
    ],
    extra: [
      { words: ["Te trezești", "Te speli", "Mănânci", "Mergi la școală"], answer: "Te trezești Te speli Mănânci Mergi la școală" },
      { words: ["Pune hainele", "Pune încălțămintea", "Deschizi ușa", "Ieși afară"], answer: "Pune hainele Pune încălțămintea Deschizi ușa Ieși afară" },
      { words: ["Îți pui periuța", "Pui pastă", "Speli pe dinți", "Te speli"], answer: "Îți pui periuța Pui pastă Speli pe dinți Te speli" }
    ]
  },
  questions: [
    "Care este primul pas dimineața?",
    "Ce se întâmplă dacă schimbi ordinea pașilor?",
    "Scrie algoritmul pentru cum te pregătești de școală!"
  ],
  parent: {
    watch: ["Copilul ordonează pașii corect", "Înțelege ordinea cronologică"],
    help: ["Spuneți împreună rutina dimineții, pas cu pas", "Desenați algoritmul zilei"],
    redflags: ["Confundă ordinea pașilor — repetați rutina împreună"]
  },
  pass: [
    "Ordonează 3 secvențe de pași",
    "Explică de ce ordinea contează",
    "Creează un algoritm pentru rutina ta"
  ]
},

/* ==================== ȘTIINȚE ȘI NATURĂ ==================== */
{
  id: "sci-1", subject: "sci", num: 1, title: "Sănătos și bolnav", icon: "🏥", duration: "20 min",
  montessori: {
    intro: "Montessori are „viața practică”: te ocupi de corpul tău. Corpul tău e un instrument pe care îl poți atinge și folosi.",
    materials: [
      { icon: "🏥", name: "Joc de doctor", how: "Fii doctor: măsoară temperatura, ascultă inima. Ce face un doctor?" },
      { icon: "🧼", name: "Spălat pe mâini", how: "Spală-te pe mâini: 1. Le udă. 2. Pune săpun. 3. Freacă-le. 4. Clătește. Urmează pașii." },
    ],
    tips: [
      "Corpul tău e un instrument. Te ocupi de el în fiecare zi.",
      "Fă mai întâi lucruri ușoare, apoi mai grele.",
    ]
  },
  objectives: [
    "Să recunoască obiceiuri sănătoase",
    "Să distingă comportamente sănătoase de cele nesănătoase",
    "Să explice de ce este important să fim sănătoși"
  ],
  explanation: [
    "Corpul nostru este ca o mașină: are nevoie de „combustibil” bun (mâncare sănătoasă), „odihnă” (somn) și „mișcare” (exerciții). Dacă îi dăm lucruri bune, funcționează bine.",
    "Obiceiurile sănătoase includ: mâncare frumosă, somn suficient, mișcare, spălat pe mâini. Cele nesănătoase: prea mult zahăr, prea puțin somn, prea mult ecran.",
    "Un truc: corpul tău îți mulțumește când faci lucruri bune — te simți energic și fericit."
  ],
  demo: {
    type: "classify",
    title: "Sănătos sau nesănătos?",
    intro: "Pune fiecare obicei în grupul potrivit!",
    zones: ["Sănătos", "Nesănătos"],
    items: [
      { label: "🥗 Mănânc legume", zone: 0 },
      { label: "📱 5 ore de ecran", zone: 1 },
      { label: "😴 Dorm 10 ore", zone: 0 },
      { label: "🍭 Mănânc mult zahăr", zone: 1 },
      { label: "⚽ Juc fotbal", zone: 0 },
      { label: "🖐️ Nu mă spăl pe mâini", zone: 1 }
    ],
    pool: [
      { label: "🍎 Mănânc fructe", zone: 0 },
      { label: "🍭 Mănânc mult zahăr", zone: 1 },
      { label: "🚶 Merg pe jos", zone: 0 },
      { label: "📺 Stau toată ziua pe ecran", zone: 1 },
      { label: "🛏️ Mă odihnesc bine", zone: 0 },
      { label: "🍟 Mănânc doar chipsuri", zone: 1 },
      { label: "🏊 Înot", zone: 0 },
      { label: "😴 Dorm foarte puțin", zone: 1 }
    ]
  },
  questions: [
    "Ce obicei sănătos ai făcut azi?",
    "De ce este important să ne spălăm pe mâini?",
    "Câte ore de somn ai nevoie?"
  ],
  parent: {
    watch: ["Copilul recunoaște obiceiuri sănătoase", "Explică de ce sunt importante"],
    help: ["Discutați împreună obiceiurile sănătoase", "Jocați „ce este sănătos” cu mâncare"],
    redflags: ["Nu distinge sănătos de nesănătos — repetați cu exemple clare"]
  },
  pass: [
    "Recunoaște 3 obiceiuri sănătoase",
    "Explică de ce este important somnul",
    "Clasifică 4 obiceiuri corect"
  ]
},
{
  id: "sci-2", subject: "sci", num: 2, title: "Plantele", icon: "🌱", duration: "20 min",
  montessori: {
    intro: "Montessori are „materiale vii”: te ocupi de o plantă reală. Planta crește și o vezi cum se schimbă.",
    materials: [
      { icon: "🌱", name: "Plantă", how: "Plantează o sămânță: 1. Pune sâmbăna în pământ. 2. Ud-o. 3. Pune-o la soare. Uite-o cum crește." },
      { icon: "🔍", name: "Vânătoare de plante", how: "Ieși afară și găsește 3 plante. Ce au în comun?" },
    ],
    tips: [
      "O plantă are nevoie de apă, soare și pământ. Crește încet.",
      "Uită-te mai întâi la părțile ușoare, apoi la cele grele.",
    ]
  },
  objectives: [
    "Să recunoască părțile unei plante",
    "Să înțeleagă ce are nevoie o plantă pentru a crește",
    "Să distingă plantele de alte organisme"
  ],
  explanation: [
    "O plantă are rădăcini (care o țin în pământ și iau apă), tulpină (care o susține), frunze (care fac hrana) și flori (care o ajută să se înmulțească).",
    "Plantele au nevoie de: apă, lumină (soare), pământ și aer. Fără aceste lucruri, planta nu crește.",
    "Un truc: plantele sunt „mâncătoare de lumină” — folosesc lumina soarelui pentru a-și face hrana. Acest proces se numește fotosinteză."
  ],
  demo: {
    type: "quiz",
    title: "Despre plante",
    intro: "Alege răspunsul corect.",
    questions: [
      { q: "Ce parte a plantei o ține în pământ?", options: ["Rădăcina", "Frunza", "Flora"], answer: 0 },
      { q: "Ce are nevoie o plantă pentru a crește?", options: ["Apă și lumină", "Doar apă", "Doar lumină"], answer: 0 },
      { q: "Ce parte a plantei face hrana?", options: ["Rădăcina", "Frunza", "Tulpina"], answer: 1 },
      { q: "Ce se întâmplă cu o plantă fără apă?", options: ["Crește mai repede", "Se usucă", "Rămâne la fel"], answer: 1 },
      { q: "Cum se numește procesul prin care planta își face hrana?", options: ["Fotosinteză", "Digestie", "Respirație"], answer: 0 }
    ],
    pool: [
      { q: "Ce parte a plantei o susține?", options: ["Tulpina", "Rădăcina", "Flora"], answer: 0 },
      { q: "Ce parte a plantei o ajută să se înmulțească?", options: ["Flora", "Rădăcina", "Tulpina"], answer: 0 },
      { q: "Ce iau rădăcinile din pământ?", options: ["Apă", "Lumină", "Aer"], answer: 0 },
      { q: "Ce are nevoie o plantă, în afară de apă?", options: ["Lumină", "Zahăr", "Muzică"], answer: 0 },
      { q: "Ce fac frunzele pentru plantă?", options: ["Fac hrana", "O țin în pământ", "O susțin"], answer: 0 },
      { q: "Ce se întâmplă cu o plantă fără lumină?", options: ["Crește mai repede", "Slăbește", "Rămâne la fel"], answer: 1 }
    ]
  },
  questions: [
    "Care sunt părțile unei plante?",
    "Ce are nevoie o plantă pentru a crește?",
    "Ce s-ar întâmpla dacă o plantă nu ar primi lumină?"
  ],
  parent: {
    watch: ["Copilul recunoaște părțile plantei", "Înțelege nevoile plantei"],
    help: ["Plantați împreună o sămânță și observați-o", "Arătați-i părțile unei plante reale"],
    redflags: ["Nu distinge părțile plantei — desenați-le împreună"]
  },
  pass: [
    "Recunoaște 3 părți ale unei plante",
    "Explică ce are nevoie o plantă",
    "Distinge o plantă de alt organism"
  ]
},
{
  id: "sci-3", subject: "sci", num: 3, title: "Animalele", icon: "🦁", duration: "20 min",
  montessori: {
    intro: "Montessori are „materiale vii”: înveți despre animale reale. Animalul e un lucru viu pe care îl poți observa.",
    materials: [
      { icon: "🦁", name: "Cartonașe de animale", how: "Uită-te la cartonașe de animale: leu, elefant, pasăre. Ce mănâncă? Unde locuiesc?" },
      { icon: "🔍", name: "Vânătoare de animale", how: "Ieși afară și găsește 3 animale. Ce au în comun?" },
    ],
    tips: [
      "Animalele sunt lucruri vii. Mănâncă, cresc și se mișcă.",
      "Uită-te mai întâi la animalele ușoare, apoi la cele grele.",
    ]
  },
  objectives: [
    "Să recunoască animale comune",
    "Să asocieze animalul cu habitatul lui",
    "Să distingă animalele după caracteristici"
  ],
  explanation: [
    "Animalele sunt ființe vii care se mișcă, mănâncă și cresc. Fiecare animal are un „acasă” — habitatul. Peștii trăiesc în apă, păsările zbor, animalele de pământ trăiesc pe uscat.",
    "Animalele sunt diferite: unele au pene, altele blănuri, altele solzi. Unele mănâncă plante, altele mănâncă alte animale.",
    "Un truc: pentru a ghice un animal, întreabă-te: „Unde trăiește?”, „Ce mănâncă?”, „Cum se mișcă?”"
  ],
  demo: {
    type: "match",
    title: "Animalul și habitatul lui",
    intro: "Asociază fiecare animal cu locul unde trăiește.",
    pairs: [
      { a: "🐟 Pește", b: "🌊 Apă" },
      { a: "🦅 Vultur", b: "🏔️ Munte" },
      { a: "🐘 Elefant", b: "🌍 Savană" },
      { a: "🐭 Șoarece", b: "🏠 Casă" }
    ],
    pool: [
      { a: "🐦 Pasăre", b: "🌳 Copac" },
      { a: "🐢 Țestoasă", b: "🏖️ Plajă" },
      { a: "🐺 Lup", b: "🌲 Pădure" },
      { a: "🐝 Albină", b: "🌼 Grădină" },
      { a: "🦋 Fluture", b: "🌸 Flori" },
      { a: "🦈 Rechin", b: "🌊 Mare" },
      { a: "🐇 Iepure", b: "🌾 Câmp" }
    ]
  },
  questions: [
    "Unde trăiește peștele?",
    "Ce animal are pene?",
    "Găsește un animal care trăiește în apă!"
  ],
  parent: {
    watch: ["Copilul recunoaște animale", "Asociază animalul cu habitatul"],
    help: ["Jocați „ghicește animalul” cu indicii", "Citiți împreună cărți despre animale"],
    redflags: ["Nu asociază animalul cu habitatul — repetați cu exemple clare"]
  },
  pass: [
    "Recunoaște 4 animale",
    "Asociază 3 animale cu habitatul",
    "Explică o caracteristică a unui animal"
  ]
},
{
  id: "sci-4", subject: "sci", num: 4, title: "Stările apei", icon: "💧", duration: "20 min",
  montessori: {
    intro: "Montessori are „viața practică”: faci lucruri reale cu apă. Apa se schimbă de formă și o poți vedea.",
    materials: [
      { icon: "💧", name: "Apă", how: "Pune apă într-o cană: 1. Încălzește-o. 2. Devine abur. 3. Răcește-o. 4. Devine gheață. Uite-o cum se schimbă." },
      { icon: "🔍", name: "Vânătoare de apă", how: "Găsește 3 lucruri care sunt apă: ploaie, rouă, abur. Ce au în comun?" },
    ],
    tips: [
      "Apa poate fi lichid, gaz sau solid. Se schimbă de formă.",
      "Uită-te mai întâi la formele ușoare, apoi la cele grele.",
    ]
  },
  objectives: [
    "Să recunoască cele 3 stări ale apei (lichid, solid, gaz)",
    "Să înțeleagă cum se transformă apa",
    "Să dea exemple din viața de zi cu zi"
  ],
  explanation: [
    "Apa poate fi în 3 stări: lichidă (ca în pahar), solidă (gheață) și gazoasă (abur). Când apa este caldă, devine abur (gaz). Când este rece, devine gheață (solid).",
    "Transformările: lichid → solid se numește „înghețare”. Lichid → gaz se numește „evaporare”. Solid → lichid se numește „topire”.",
    "Un truc: gândește-te la un cub de gheață. Când se încălzește, devine apă (lichid). Când apa fierbe, devine abur (gaz)."
  ],
  demo: {
    type: "classify",
    title: "Stările apei",
    intro: "Pune fiecare exemplu în starea potrivită!",
    zones: ["Lichid", "Solid", "Gaz"],
    items: [
      { label: "💧 Apă în pahar", zone: 0 },
      { label: "🧊 Cub de gheață", zone: 1 },
      { label: "♨️ Abur de la ceai", zone: 2 },
      { label: "🌧️ Ploaie", zone: 0 },
      { label: "❄️ Zăpadă", zone: 1 },
      { label: "💨 Nori", zone: 2 }
    ],
    pool: [
      { label: "🥤 Suc în pahar", zone: 0 },
      { label: "🧊 Gheață de la înghețată", zone: 1 },
      { label: "♨️ Abur de la supă", zone: 2 },
      { label: "🌊 Apă din fântână", zone: 0 },
      { label: "❄️ Gheață pe geam", zone: 1 },
      { label: "💨 Abur de la ceainic", zone: 2 }
    ]
  },
  questions: [
    "Care sunt cele 3 stări ale apei?",
    "Ce se întâmplă cu gheața când se încălzește?",
    "Ce este evaporarea?"
  ],
  parent: {
    watch: ["Copilul recunoaște stările apei", "Înțelege transformările"],
    help: ["Folosiți un cub de gheață și observați topirea", "Folosiți aburul de la ceai ca exemplu"],
    redflags: ["Confundă stările — folosiți exemple concrete"]
  },
  pass: [
    "Recunoaște cele 3 stări ale apei",
    "Explică o transformare",
    "Clasifică 4 exemple corect"
  ]
},
{
  id: "sci-5", subject: "sci", num: 5, title: "Corpul meu", icon: "🫀", duration: "20 min",
  montessori: {
    intro: "Montessori are „viața practică”: te ocupi de corpul tău. Corpul tău e un instrument pe care îl poți atinge și folosi.",
    materials: [
      { icon: "🫀", name: "Hartă a corpului", how: "Desenează-ți corpul: cap, brațe, picioare. Unde e inima? Unde sunt plămânii?" },
      { icon: "🔍", name: "Vânătoare de corp", how: "Atinge-ți corpul: cap, umeri, genunchi, degete. Ce simți?" },
    ],
    tips: [
      "Corpul tău e un instrument. Te ocupi de el în fiecare zi.",
      "Uită-te mai întâi la părțile ușoare, apoi la cele grele.",
    ]
  },
  objectives: [
    "Să recunoască organele principale",
    "Să înțeleagă rolul fiecărui organ",
    "Să explice cum funcționează corpul"
  ],
  explanation: [
    "Corpul nostru are organe importante: inima (care pompează sângele), plămânii (care ne ajută să respirăm), creierul (care gândește), stomacul (care digeră mâncarea).",
    "Inima bate toată ziua, chiar și când dormi. Plămânii ne ajută să luăm aer. Creierul ne controlează totul — mișcarea, gândirea, sentimentele.",
    "Un truc: pune-ți mâna pe piept și simte inima bătând. Acum pune-ți mâna pe burtă și simte stomacul. Corpul tău este o mașină minunată!"
  ],
  demo: {
    type: "quiz",
    title: "Organele corpului",
    intro: "Care organ face ce?",
    questions: [
      { q: "Ce organ pompează sângele?", options: ["Inima", "Plămânii", "Creierul"], answer: 0 },
      { q: "Ce organ ne ajută să respirăm?", options: ["Stomacul", "Plămânii", "Inima"], answer: 1 },
      { q: "Ce organ gândește?", options: ["Creierul", "Inima", "Stomacul"], answer: 0 },
      { q: "Ce organ digeră mâncarea?", options: ["Plămânii", "Stomacul", "Creierul"], answer: 1 },
      { q: "Ce se întâmplă cu inima când dormi?", options: ["Se oprește", "Continuă să bată", "Dispare"], answer: 1 }
    ],
    pool: [
      { q: "Ce organ ne ajută să auzim?", options: ["Urechile", "Ochii", "Mâinile"], answer: 0 },
      { q: "Ce organ ne ajută să vedem?", options: ["Ochii", "Urechile", "Nasul"], answer: 0 },
      { q: "Ce organ simte mirosurile?", options: ["Nasul", "Ochii", "Inima"], answer: 0 },
      { q: "Ce organ simte gustul mâncării?", options: ["Limba", "Inima", "Creierul"], answer: 0 },
      { q: "Ce organ ne ajută să ne mișcăm?", options: ["Mușchii", "Oasele", "Plămânii"], answer: 0 },
      { q: "Ce ne susține corpul ca pe un schelet?", options: ["Oasele", "Mușchii", "Plămânii"], answer: 0 }
    ]
  },
  questions: [
    "Care sunt cele 4 organe principale?",
    "Ce face inima?",
    "Pune-ți mâna pe piept: simți inima?"
  ],
  parent: {
    watch: ["Copilul recunoaște organele", "Înțelege rolul lor"],
    help: ["Arătați-i organele pe un model sau desen", "Jocați „ce face organul”"],
    redflags: ["Nu recunoaște organele — desenați-le împreună"]
  },
  pass: [
    "Recunoaște 3 organe principale",
    "Explică rolul a 2 organe",
    "Simte inima bătând"
  ]
},
{
  id: "sci-6", subject: "sci", num: 6, title: "Numărăm în natură", icon: "🌳", duration: "20 min",
  montessori: {
    intro: "Montessori are „materiale vii”: numeri lucruri reale în natură. Natura e o clasă mare.",
    materials: [
      { icon: "🌳", name: "Numărare în natură", how: "Ieși afară și numără 5 copaci, 5 flori, 5 pietre. Câte sunt?" },
      { icon: "🔍", name: "Vânătoare în natură", how: "Ieși afară și găsește 3 lucruri rotunde. Ce au în comun?" },
    ],
    tips: [
      "Natura e plină de numere. Numără copacii, florile, pietrele.",
      "Numără mai întâi lucruri ușoare, apoi mai grele.",
    ]
  },
  objectives: [
    "Să numere elemente din natură",
    "Să observe și să compare cantități",
    "Să descopere matematica în natură"
  ],
  explanation: [
    "Natura este plină de matematică! Florile au petale, copacii au frunze, păsările au aripi. Totul poate fi numărat.",
    "De exemplu: o floare are de obicei 5 petale. Un fluture are 2 aripi. Un pui are 2 picioare. Natura ne ajută să înțelegem numerele.",
    "Un truc: când ieși în parc, numără! Câte flori ai văzut? Câte păsări? Câte copaci? Natura este cea mai bună carte de matematică!"
  ],
  demo: {
    type: "gen",
    title: "Matematica din natură",
    intro: "Numără elemente din natură și rezolvă probleme.",
    rounds: 5
  },
  questions: [
    "Câte petale are o floare?",
    "Câte aripi are un fluture?",
    "Ce ai numărat în natură azi?"
  ],
  parent: {
    watch: ["Copilul numără elemente din natură", "Observă și compară cantități"],
    help: ["Ieșiți în parc și numărați împreună flori, păsări, copaci", "Desenați ce ați numărat"],
    redflags: ["Nu observă detaliile — numărați împreună, lent"]
  },
  pass: [
    "Numără corect 3 elemente din natură",
    "Rezolvă 2 probleme cu obiecte naturale",
    "Observă matematica în natură"
  ]
},
{
  id: "sci-7", subject: "sci", num: 7, title: "Cele 5 simțuri", icon: "👀", duration: "20 min",
  montessori: {
    intro: "Montessori are „materiale senzoriale”: folosești cele 5 simțuri ca să înveți. Simțurile sunt instrumente pe care le poți atinge și folosi.",
    materials: [
      { icon: "👀", name: "Joc de simțuri", how: "Folosește cele 5 simțuri: vezi, auzi, mirosi, gusti, atingi. Ce observi?" },
      { icon: "🔍", name: "Vânătoare de simțuri", how: "Ieși afară și folosește cele 5 simțuri. Ce vezi, auzi, mirosi, gusti, atingi?" },
    ],
    tips: [
      "Cele 5 simțuri sunt instrumente. Le folosești ca să înveți despre lume.",
      "Folosește mai întâi simțurile ușoare, apoi pe cele grele.",
    ]
  },
  objectives: [
    "Să recunoască cele 5 simțuri",
    "Să asocieze fiecare simț cu organul său",
    "Să exploreze lumea prin simțuri"
  ],
  explanation: [
    "Avem 5 simțuri care ne ajută să explorăm lumea: văz (ochii), auz (urechile), miros (nasul), gust (limba) și atingere (pielea).",
    "Cu ochii vedem culorile, cu urechile auzim muzica, cu nasul mirosim florile, cu limba gustăm mâncarea și cu pielea simțim căldura și frigul.",
    "Un truc: închide un simț deodată și vezi cât de mult îl foloseai! De exemplu, dacă îți acoperi nasul, mâncarea nu mai are același gust."
  ],
  demo: {
    type: "match",
    title: "Simțul și organul",
    intro: "Asociază fiecare simț cu organul care îl folosește.",
    pairs: [
      { a: "Văz", b: "👁️ Ochii" },
      { a: "Auz", b: "👂 Urechile" },
      { a: "Miros", b: "👃 Nasul" },
      { a: "Gust", b: "👅 Limba" },
      { a: "Atingere", b: "✋ Pielea" }
    ]
  },
  questions: [
    "Câte simțuri avem?",
    "Cu ce organ vedem?",
    "Ce simț folosești când mănânci?"
  ],
  parent: {
    watch: ["Copilul recunoaște cele 5 simțuri", "Asociază simțuri cu organe"],
    help: ["Jocați „ce simț folosești?” cu obiecte din casă", "Explorați împreună prin simțuri"],
    redflags: ["Confundă simțurile — repetați cu exemple clare"]
  },
  pass: [
    "Recunoaște cele 5 simțuri",
    "Asociază 4 simțuri cu organele",
    "Explică cum explorezi lumea prin simțuri"
  ]
},

/* ==================== EDUCAȚIE CIVICĂ ==================== */
{
  id: "civ-1", subject: "civ", num: 1, title: "Familia mea", icon: "👨‍👩‍👧", duration: "20 min",
  montessori: {
    intro: "Montessori are „viața practică”: înveți despre familia ta. Familia ta e o societate mică pe care o poți observa.",
    materials: [
      { icon: "👨‍👩‍👧", name: "Copac familial", how: "Desenează-ți familia: mamă, tată, frați. Cine e cel mai mare? Cine e cel mai mic?" },
      { icon: "🔍", name: "Vânătoare familială", how: "Întreabă familia: ce le place să facă? Ce meserii au?" },
    ],
    tips: [
      "Familia ta e o societate mică. Înveți unii de la alții.",
      "Întreabă mai întâi întrebări ușoare, apoi mai grele.",
    ]
  },
  objectives: [
    "Să recunoască membrii familiei",
    "Să înțeleagă rolurile din familie",
    "Să explice de ce familia este importantă"
  ],
  explanation: [
    "Familia este grupul de oameni care te iubesc și te ajută. De obicei, familia include părinții (tată și mamă) și frații/surorile. Uneori familia include și bunicii, unchii, verii.",
    "Fiecare membru al familiei are un rol: părinții ne îngrijesc, noi învățăm și ajutăm. Toată lumea din familie se ajută reciproc.",
    "Un truc: familia este „acasul” tău — locul unde te simți în siguranță și iubit."
  ],
  demo: {
    type: "quiz",
    title: "Despre familie",
    intro: "Alege răspunsul corect.",
    questions: [
      { q: "Cine sunt părinții tăi?", options: ["Tată și mamă", "Doar tată", "Doar mamă"], answer: 0 },
      { q: "Ce fac părinții pentru tine?", options: ["Te îngrijesc", "Te ignoră", "Nu fac nimic"], answer: 0 },
      { q: "Cine mai poate fi în familie?", options: ["Frați, bunici", "Doar tu", "Nimeni"], answer: 0 },
      { q: "De ce este familia importantă?", options: ["Te iubește și te ajută", "Nu contează", "Este plictisitoare"], answer: 0 },
      { q: "Ce poți face pentru familia ta?", options: ["Ajuța", "Ignora", "Striga"], answer: 0 }
    ]
  },
  questions: [
    "Cine sunt membrii familiei tale?",
    "Ce rol ai tu în familie?",
    "De ce este familia importantă?"
  ],
  parent: {
    watch: ["Copilul recunoaște membrii familiei", "Înțelege rolurile"],
    help: ["Discutați împreună despre familie", "Desenați împreună un arbore genealogic"],
    redflags: ["Nu identifică rolurile — întrebați „ce faci tu pentru familie?”"]
  },
  pass: [
    "Recunoaște 3 membri ai familiei",
    "Explică un rol din familie",
    "Spune de ce familia este importantă"
  ]
},
{
  id: "civ-2", subject: "civ", num: 2, title: "Prietenii", icon: "🤝", duration: "20 min",
  montessori: {
    intro: "Montessori are „viața socială”: înveți despre prietenii tăi. Prietenii tăi sunt oameni de la care poți învăța.",
    materials: [
      { icon: "🤝", name: "Joc de prietenie", how: "Joculește cu prietenii: rândul, împarte, ajută. Ce face un prieten bun?" },
      { icon: "🔍", name: "Vânătoare de prieteni", how: "Întreabă prietenii: ce le place să facă? Ce hobby-uri au?" },
    ],
    tips: [
      "Prietenii tăi sunt oameni de la care înveți. Vă ajutați unii pe alții.",
      "Fă mai întâi lucruri ușoare, apoi mai grele.",
    ]
  },
  objectives: [
    "Să recunoască comportamente de prieten",
    "Să distingă prietenul bun de cel rău",
    "Să explice cum să fii un bun prieten"
  ],
  explanation: [
    "Un prieten bun te ascultă, te ajută, te respectă și te tratează frumos. Un prieten rău te strigă, te ignoră sau te face să te simți prost.",
    "Prietenia înseamnă reciprocitate: eu te ajut, tu mă ajuți. Înseamnă și respect: nu strig, nu bat, nu fac glume răutăcioase.",
    "Un truc: un prieten bun este ca o oglindă — te reflectă frumos, nu te distorsionează."
  ],
  demo: {
    type: "classify",
    title: "Prieten bun sau rău?",
    intro: "Pune fiecare comportament în grupul potrivit!",
    zones: ["Prieten bun", "Prieten rău"],
    items: [
      { label: "👂 Te ascultă", zone: 0 },
      { label: "😡 Strigă la tine", zone: 1 },
      { label: "🤗 Te ajută", zone: 0 },
      { label: "🙈 Te ignoră", zone: 1 },
      { label: "😊 Se bucură cu tine", zone: 0 },
      { label: "😈 Te face glume răutăcioase", zone: 1 }
    ],
    pool: [
      { label: "🤝 Împarte cu tine", zone: 0 },
      { label: "😠 Te strigă", zone: 1 },
      { label: "🎁 Îți dă un cadou", zone: 0 },
      { label: "🙄 Te ignoră", zone: 1 },
      { label: "👏 Te laudă", zone: 0 },
      { label: "😈 Te face glume răutăcioase", zone: 1 }
    ]
  },
  questions: [
    "Ce face un prieten bun?",
    "Ce faci dacă un prieten te strigă?",
    "Cum poți fi un bun prieten?"
  ],
  parent: {
    watch: ["Copilul recunoaște comportamente de prieten", "Distinge prietenul bun de cel rău"],
    help: ["Discutați despre prietenii", "Jocați „ce face un prieten bun”"],
    redflags: ["Nu distinge comportamentele — repetați cu exemple clare"]
  },
  pass: [
    "Recunoaște 3 comportamente de prieten bun",
    "Explică cum să fii un bun prieten",
    "Clasifică 4 comportamente corect"
  ]
},
{
  id: "civ-3", subject: "civ", num: 3, title: "Reguli la școală", icon: "🏫", duration: "20 min",
  montessori: {
    intro: "Montessori are „viața socială”: înveți despre regulile școlii. Școala e o societate mică pe care o poți observa.",
    materials: [
      { icon: "🏫", name: "Reguli de școală", how: "Scrie regulile școlii: 1. Ascultă. 2. Ridică mâna. 3. Fii drăguț. Urmează regulile." },
      { icon: "🔍", name: "Vânătoare de reguli", how: "Mergi prin școală și găsește 3 reguli. Ce spun ele?" },
    ],
    tips: [
      "Regulile școlii sunt ca un joc. Le urmezi ca să joci bine.",
      "Urmează mai întâi regulile ușoare, apoi pe cele grele.",
    ]
  },
  objectives: [
    "Să recunoască reguli importante la școală",
    "Să înțeleagă de ce există reguli",
    "Să explice cum să respecte regulile"
  ],
  explanation: [
    "Regulile la școală ne ajută să trăim bine împreună. De exemplu: ridicăm mâna când vrem să vorbim, nu alergăm pe coridor, respectăm profesorii și colegii.",
    "Regulile există pentru că, fără ele, ar fi haos. Dacă toată lumea ar vorbi în același timp, nimeni nu ar auzi. Dacă toată lumea ar alerga, am face accident.",
    "Un truc: regulile sunt ca semnalele de trafic — ne ajută să ne mișcăm în siguranță."
  ],
  demo: {
    type: "quiz",
    title: "Reguli la școală",
    intro: "Care este regula corectă?",
    questions: [
      { q: "Ce faci când vrei să vorbești la ora?", options: ["Ridici mâna", "Strigi", "Alergi"], answer: 0 },
      { q: "Ce faci pe coridor?", options: ["Mergi liniștit", "Alergi", "Strigi"], answer: 0 },
      { q: "Cum tratezi colegii?", options: ["Cu respect", "Cu strigăt", "Cu batere"], answer: 0 },
      { q: "De ce există reguli?", options: ["Pentru a trăi bine împreună", "Pentru a fi plictisitori", "Nu există motiv"], answer: 0 },
      { q: "Ce faci dacă un coleg te deranjează?", options: ["Spui unui profesor", "Lui bat", "Ignori"], answer: 0 }
    ],
    pool: [
      { q: "Ce faci când vrei să vorbești la ora?", options: ["Ridici mâna", "Strigi", "Alergi"], answer: 0 },
      { q: "Ce faci pe coridor?", options: ["Mergi liniștit", "Alergi", "Strigi"], answer: 0 },
      { q: "Cum tratezi colegii?", options: ["Cu respect", "Cu strigăt", "Cu batere"], answer: 0 },
      { q: "De ce există reguli?", options: ["Pentru a trăi bine împreună", "Pentru a fi plictisitori", "Nu există motiv"], answer: 0 },
      { q: "Ce faci dacă un coleg te deranjează?", options: ["Spui unui profesor", "Lui bat", "Ignori"], answer: 0 },
      { q: "Ce faci când primești un lucru de la profesor?", options: ["Mulțumesc", "Strig", "Ignor"], answer: 0 }
    ]
  },
  questions: [
    "Care sunt 3 reguli importante la școală?",
    "De ce există reguli?",
    "Ce faci dacă un coleg nu respectă regulile?"
  ],
  parent: {
    watch: ["Copilul recunoaște reguli", "Înțelege de ce există"],
    help: ["Discutați despre regulile din clasa lui", "Jocați „ce faci când...”"],
    redflags: ["Nu respectă regulile — repetați cu exemple clare"]
  },
  pass: [
    "Recunoaște 3 reguli la școală",
    "Explică de ce există reguli",
    "Spune ce faci într-o situație dificilă"
  ]
},
{
  id: "civ-4", subject: "civ", num: 4, title: "Ajutor reciproc", icon: "🤲", duration: "20 min",
  montessori: {
    intro: "Montessori are „viața socială”: înveți despre ajutorul reciproc. Ajutarea e o abilitate pe care o poți exersa.",
    materials: [
      { icon: "🤲", name: "Joc de ajutor", how: "Ajută-ți prietenii: poartă-le cărțile, împarte-ți jucăriile. Ce face un ajutor bun?" },
      { icon: "🔍", name: "Vânătoare de ajutor", how: "Mergi prin casă și găsește 3 lucruri la care poți ajuta. Ce poți face?" },
    ],
    tips: [
      "Ajutarea e o abilitate. O exersezi în fiecare zi.",
      "Ajută mai întâi cu lucruri ușoare, apoi cu cele grele.",
    ]
  },
  objectives: [
    "Să recunoască situații în care putem ajuta",
    "Să înțeleagă importanța ajutorului reciproc",
    "Să explice cum să ajute pe alții"
  ],
  explanation: [
    "Ajutorul reciproc înseamnă să ne ajutăm unii pe alții. Când ajut pe cineva, mă simt bine. Când primesc ajutor, mă simt iubit. Este un cerc virtuos.",
    "Putem ajuta în multe feluri: ajut un coleg cu o temă, ajut un bunici cu cumpărături, ajut mama cu menajul. Ajutorul nu trebuie să fie mare — chiar și un zâmbet ajută.",
    "Un truc: ajutorul este ca o lumină — cu cât o dai mai mult, cu atât devine mai puternică."
  ],
  demo: {
    type: "classify",
    title: "Ajuți sau nu ajuți?",
    intro: "Pune fiecare acțiune în grupul potrivit!",
    zones: ["Ajutor", "Nu e ajutor"],
    items: [
      { label: "📚 Ajut un coleg cu tema", zone: 0 },
      { label: "🙄 Ignor pe cineva", zone: 1 },
      { label: "🛒 Ajut bunica cu cumpărături", zone: 0 },
      { label: "😡 Strig la un coleg", zone: 1 },
      { label: "🍽️ Ajut mama cu farfuriile", zone: 0 },
      { label: "📱 Juc pe telefon în loc să ajut", zone: 1 }
    ],
    pool: [
      { label: "🧹 Curăț camera", zone: 0 },
      { label: "😈 Fac glume răutăcioase", zone: 1 },
      { label: "🐕 Îmi hrănesc câinele", zone: 0 },
      { label: "🙄 Ignor pe cineva", zone: 1 },
      { label: "🍽️ Ajut mama cu farfuriile", zone: 0 },
      { label: "📱 Juc pe telefon în loc să ajut", zone: 1 },
      { label: "🛒 Ajut bunica cu cumpărături", zone: 0 },
      { label: "😡 Strig la un coleg", zone: 1 }
    ]
  },
  questions: [
    "Cum ai ajutat pe cineva azi?",
    "Ce ajutor mic poți face mâine?",
    "Cum te simți când ajuți pe cineva?"
  ],
  parent: {
    watch: ["Copilul recunoaște situații de ajutor", "Înțelege importanța ajutorului"],
    help: ["Discutați despre ajutorul reciproc", "Jocați „cum poți ajuta”"],
    redflags: ["Nu vede situațiile de ajutor — repetați cu exemple clare"]
  },
  pass: [
    "Recunoaște 3 situații de ajutor",
    "Explică de ce ajutorul este important",
    "Clasifică 4 acțiuni corect"
  ]
},
{
  id: "civ-5", subject: "civ", num: 5, title: "Reguli în natură", icon: "🌿", duration: "20 min",
  montessori: {
    intro: "Montessori are „materiale vii”: înveți despre regulile naturii. Natura e o clasă mare pe care o poți observa.",
    materials: [
      { icon: "🌿", name: "Reguli de natură", how: "Învață regulile naturii: 1. Nu culege flori. 2. Nu hrăni animalele. 3. Ține parcul curat." },
      { icon: "🔍", name: "Vânătoare de reguli", how: "Ieși afară și găsește 3 reguli de natură. Ce spun ele?" },
    ],
    tips: [
      "Regulile naturii sunt ca un joc. Le urmezi ca să ții natura frumoasă.",
      "Urmează mai întâi regulile ușoare, apoi pe cele grele.",
    ]
  },
  objectives: [
    "Să înțeleagă regulile de protecție a naturii",
    "Să recunoască comportamente corecte în natură",
    "Să respecte mediul înconjurător"
  ],
  explanation: [
    "Natura are reguli, la fel ca școala! Nu aruncăm gunoiul în pădure, nu rupem florile și nu sperii animalele. Când respectăm natura, ea ne oferă aer curat, frunze verzi și animale prietenoase.",
    "Reguli simple: strângem gunoiul, nu poluăm, economisim apa și protejăm plantele. Fiecare dintre noi poate fi un mic erou al naturii.",
    "Un truc: când ieși în natură, întreabă-te: „Ce pot face eu ca să ajut natura?” Răspunsul este mereu: să fiu curat, atent și bun."
  ],
  demo: {
    type: "classify",
    title: "Corect sau greșit în natură?",
    intro: "Pune fiecare acțiune în categoria potrivită.",
    zones: ["Corect ✅", "Greșit ❌"],
    items: [
      { label: "Strângi gunoiul", zone: 0 },
      { label: "Rupi o floare", zone: 1 },
      { label: "Dai apă florilor", zone: 0 },
      { label: "Arunci gunoiul în iarbă", zone: 1 },
      { label: "Economisești apa", zone: 0 },
      { label: "Speri păsările", zone: 1 }
    ],
    pool: [
      { label: "Plantezi un copac", zone: 0 },
      { label: "Ard frunzele", zone: 1 },
      { label: "Adaugi apă la flori", zone: 0 },
      { label: "Rupi o floare", zone: 1 },
      { label: "Strângi gunoiul", zone: 0 },
      { label: "Arunci gunoiul în iarbă", zone: 1 },
      { label: "Economisești apa", zone: 0 },
      { label: "Speri păsările", zone: 1 }
    ]
  },
  questions: [
    "Ce poți face ca să protejezi natura?",
    "De ce nu aruncăm gunoiul în pădure?",
    "Care este o regulă de protecție a naturii?"
  ],
  parent: {
    watch: ["Copilul recunoaște reguli de protecție", "Alege comportamente corecte"],
    help: ["Ieșiți în natură și discutați despre reguli", "Jocați „eroul naturii”"],
    redflags: ["Nu înțelege de ce regulile contează — dați exemple concrete"]
  },
  pass: [
    "Clasifică 5 acțiuni corect",
    "Explică o regulă de protecție a naturii",
    "Propune o acțiune pentru natură"
  ]
},
{
  id: "civ-6", subject: "civ", num: 6, title: "Emoțiile mele", icon: "😊", duration: "20 min",
  montessori: {
    intro: "Montessori are „viața socială”: înveți despre emoțiile tale. Emoțiile tale sunt instrumente pe care le folosești ca să te cunoști.",
    materials: [
      { icon: "😊", name: "Joc de emoții", how: "Joculește cu emoții: fericit, trist, supărat, speriat. Ce te face să le simți?" },
      { icon: "🔍", name: "Vânătoare de emoții", how: "Mergi prin casă și găsește 3 lucruri care te fac fericit. Ce sunt ele?" },
    ],
    tips: [
      "Emoțiile tale sunt instrumente. Le folosești ca să te cunoști.",
      "Simte mai întâi emoțiile ușoare, apoi pe cele grele.",
    ]
  },
  objectives: [
    "Să recunoască emoțiile de bază",
    "Să asocieze emoțiile cu situații",
    "Să exprime ce simte"
  ],
  explanation: [
    "Toată lumea are emoții: bucurie, tristețe, supărare, frică, surpriză. Emoțiile sunt normale și ne ajută să înțelegem lumea.",
    "Când ne bucurăm, zâmbim. Când suntem trisți, plângem. Când suntem supărați, ne enervăm. Este important să știm ce simțim și să spunem altora.",
    "Un truc: numește emoția! „Sunt supărat pentru că...” sau „Mă bucur pentru că...”. Când pui un nume pe emoție, ea devine mai ușor de înțeles."
  ],
  demo: {
    type: "match",
    title: "Emoția și situația",
    intro: "Asociază fiecare emoție cu situația care o provoacă.",
    pairs: [
      { a: "Bucurie 😄", b: "Primești o jucărie nouă" },
      { a: "Tristețe 😢", b: "Se strică jucăria ta" },
      { a: "Supărare 😠", b: "Îți ia cineva creionul" },
      { a: "Frică 😨", b: "Audi un zgomot puternic" },
      { a: "Surpriză 😲", b: "Primești un cadou neașteptat" }
    ],
    pool: [
      { a: "Bucurie 😄", b: "Joci cu prietenul tău" },
      { a: "Tristețe 😢", b: "Se strică jucăria ta" },
      { a: "Supărare 😠", b: "Îți ia cineva creionul" },
      { a: "Frică 😨", b: "Mergi singur în întuneric" },
      { a: "Surpriză 😲", b: "Primești un cadou neașteptat" },
      { a: "Bucurie 😄", b: "Mergi în parc cu familia" },
      { a: "Tristețe 😢", b: "Pierzi o jucărie" }
    ]
  },
  questions: [
    "Ce emoție simți când primești un cadou?",
    "Cum te simți când nu îți iese un lucru?",
    "Care este emoția ta preferată?"
  ],
  parent: {
    watch: ["Copilul recunoaște emoțiile", "Exprimă ce simte"],
    help: ["Discutați despre emoții la finalul zilei", "Jocați „ce simți?” cu măști de față"],
    redflags: ["Nu exprimă emoțiile — întrebați-l ce simte"]
  },
  pass: [
    "Recunoaște 4 emoții de bază",
    "Asociază 3 emoții cu situații",
    "Exprimă o emoție pe care a simțit-o"
  ]
}
];

/* Index de activități pe subiect */
const ACTIVITIES_BY_SUBJECT = {};
SUBJECTS.forEach(s => { ACTIVITIES_BY_SUBJECT[s.id] = []; });
ACTIVITIES.forEach(a => { ACTIVITIES_BY_SUBJECT[a.subject].push(a); });
