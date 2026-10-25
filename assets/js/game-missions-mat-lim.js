/* Misiuni originale: indicii, repararea unui pas și reconstruirea unui plan. */
Object.assign(GAME_MISSIONS, {
  'mat-1': {
    titles: { evidence: 'Indiciile din cutia cu nasturi', repair: 'Repară numărătoarea pe zeci', plan: 'Drumul de la grupe la număr' },
    cases: [
      {
        context: 'Lia are un săculeț cu 10 nasturi și încă 4 nasturi separați. Săculețul este verde. Pe masă este o carte.',
        question: 'Câți nasturi are Lia în total?',
        facts: [{ text: 'În săculeț sunt 10 nasturi.', relevant: true }, { text: 'Sunt încă 4 nasturi separați.', relevant: true }, { text: 'Săculețul este verde.', relevant: false }, { text: 'Pe masă este o carte.', relevant: false }],
        plan: ['Număr grupa: 10 nasturi.', 'Continui cu cei separați: 11, 12, 13, 14.', 'Scriu totalul obținut: 14 nasturi.'],
        error: { index: 1, wrong: 'Număr săculețul ca un nasture: 1 + 4 = 5.', alternatives: ['Număr fiecare nasture separat de două ori: 10 + 8 = 18.', 'Las deoparte cei 4 nasturi și păstrez doar 10.'] },
        check: { correct: 'Desfac săculețul și număr toți nasturii o singură dată: 14.', wrong: ['Număr numai nasturii separați și spun că totalul este 4.', 'Culoarea verde dovedește că sunt 14 nasturi.'] }
      },
      {
        context: 'Dan strânge 3 legături cu câte 10 bețișoare și 6 bețișoare libere. Legăturile au elastice roșii. Lângă ele este un caiet.',
        question: 'Câte bețișoare sunt, fără să numeri din nou obiectele legate?',
        facts: [{ text: 'Sunt 3 legături cu câte 10 bețișoare.', relevant: true }, { text: 'Sunt 6 bețișoare libere.', relevant: true }, { text: 'Elasticele sunt roșii.', relevant: false }, { text: 'Lângă bețișoare este un caiet.', relevant: false }],
        plan: ['Număr legăturile: 10, 20, 30.', 'Pornesc de la 30 și adaug cele 6 unități: 36.', 'Notez totalul: 36 de bețișoare.'],
        error: { index: 0, wrong: 'Cele 3 legături înseamnă numai 3 bețișoare.', alternatives: ['Cele 3 legături conțin 20 de bețișoare.', 'Cele 3 legături conțin 40 de bețișoare.'] },
        check: { correct: 'Desfac toate legăturile: cele 30 de bețișoare și cele 6 libere dau 36.', wrong: ['Adun doar numărul legăturilor cu unitățile: 3 + 6 = 9.', 'Număr elasticele și obțin totalul bețișoarelor.'] }
      },
      {
        context: 'În atelier sunt 8 cutii cu câte 10 mărgele și încă 9 mărgele pe tavă. Tava este albă. Pe perete este un calendar.',
        question: 'Câte mărgele sunt în cutii și pe tavă împreună?',
        facts: [{ text: 'Sunt 8 cutii cu câte 10 mărgele.', relevant: true }, { text: 'Pe tavă sunt 9 mărgele.', relevant: true }, { text: 'Tava este albă.', relevant: false }, { text: 'Pe perete este un calendar.', relevant: false }],
        plan: ['Aflu câte sunt în cutii, numărând din zece în zece până la 80.', 'La cele 80 adaug cele 9 de pe tavă: 89.', 'Scriu numărul obținut: 89 de mărgele.'],
        error: { index: 2, wrong: 'Scriu 98, inversând zecile cu unitățile.', alternatives: ['Scriu 17, fiindcă adun 8 cu 9.', 'Scriu 80 și omit mărgelele de pe tavă.'] },
        check: { correct: 'Descompun 89 în 80 + 9: regăsesc cele 8 zeci și cele 9 unități.', wrong: ['În 89 citesc 9 zeci și 8 unități.', 'Verific numai cele 9 mărgele de pe tavă, nu și cutiile.'] }
      }
    ]
  },
  'mat-2': {
    titles: { evidence: 'Ce cantități reunim?', repair: 'Salvează adunarea peste zece', plan: 'Podul către zecea întreagă' },
    cases: [
      {
        context: 'Ana are 7 mere și primește încă 5 mere. Coșul este galben. Ana poartă o șapcă. Calculează completând întâi zece.',
        question: 'Câte mere are după ce le primește?',
        facts: [{ text: 'Ana are la început 7 mere.', relevant: true }, { text: 'Ana primește încă 5 mere.', relevant: true }, { text: 'Coșul este galben.', relevant: false }, { text: 'Ana poartă o șapcă.', relevant: false }],
        plan: ['Aflu cât lipsește de la 7 la 10: 3.', 'Împart cele 5 mere noi în 3 și 2; cu 3 completez 10.', 'Adaug restul de 2 la 10: în total sunt 12 mere.'],
        error: { index: 1, wrong: 'Împart cele 5 mere în 3 și 3.', alternatives: ['Împart cele 5 mere în 3 și 1.', 'Adaug 3 la 7 și spun că am folosit toate cele 5 mere.'] },
        check: { correct: 'Din totalul 12 scad cele 5 primite și regăsesc 7.', wrong: ['12 − 7 = 5 arată că Ana are doar 5 mere la final.', 'Adun din nou cele 5 la totalul 12 și păstrez 17 ca total inițial.'] }
      },
      {
        context: 'Radu a lipit 8 timbre și mai lipește 6. Albumul are copertă albastră. Lângă album este un creion. Folosește completarea lui 10.',
        question: 'Câte timbre sunt lipite după această adăugare?',
        facts: [{ text: 'Sunt deja lipite 8 timbre.', relevant: true }, { text: 'Radu mai lipește 6 timbre.', relevant: true }, { text: 'Coperta albumului este albastră.', relevant: false }, { text: 'Lângă album este un creion.', relevant: false }],
        plan: ['Aflu cât lipsește de la 8 la 10: 2.', 'Despart cele 6 timbre în 2 și 4; adaug întâi 2 la 8.', 'Adaug cele 4 rămase la 10 și obțin 14 timbre.'],
        error: { index: 2, wrong: 'Adaug din nou toate cele 6 la 10 și obțin 16 timbre.', alternatives: ['Adaug doar 2 la 10 și obțin 12 timbre.', 'Scad cele 4 rămase din 10 și obțin 6 timbre.'] },
        check: { correct: 'Scad cele 6 adăugate din 14: rămân cele 8 inițiale.', wrong: ['14 + 6 = 20 verifică întoarcerea la cele 8 inițiale.', 'Culoarea albumului confirmă totalul 14.'] }
      },
      {
        context: 'La joc sunt 27 de jetoane, apoi sosesc încă 8. Cutia este rotundă. Masa este lângă geam. Calculează completând întâi 30.',
        question: 'Câte jetoane sunt după sosirea celor noi?',
        facts: [{ text: 'La început sunt 27 de jetoane.', relevant: true }, { text: 'Sosesc încă 8 jetoane.', relevant: true }, { text: 'Cutia este rotundă.', relevant: false }, { text: 'Masa este lângă geam.', relevant: false }],
        plan: ['Aflu cât lipsește de la 27 la 30: 3.', 'Despart cele 8 jetoane în 3 și 5; adaug 3 și ajung la 30.', 'Adaug cele 5 rămase: 30 + 5 = 35 de jetoane.'],
        error: { index: 0, wrong: 'De la 27 până la 30 lipsesc 2.', alternatives: ['De la 27 până la 30 lipsesc 7.', 'De la 27 până la 30 lipsesc 8.'] },
        check: { correct: '35 − 8 = 27: scot jetoanele sosite și regăsesc începutul.', wrong: ['35 − 3 = 32 este cantitatea inițială de 27.', '35 + 8 = 43 dovedește că la început erau 27.'] }
      }
    ]
  },
  'mat-3': {
    titles: { evidence: 'Urmele obiectelor luate', repair: 'Repară scăderea în doi pași', plan: 'Ajungem la zece, apoi mai departe' },
    cases: [
      {
        context: 'Pe farfurie sunt 12 biscuiți; se iau 5. Farfuria este albă. Pe masă este un șervet. Scade trecând întâi prin 10.',
        question: 'Câți biscuiți rămân?',
        facts: [{ text: 'La început sunt 12 biscuiți.', relevant: true }, { text: 'Se iau 5 biscuiți.', relevant: true }, { text: 'Farfuria este albă.', relevant: false }, { text: 'Pe masă este un șervet.', relevant: false }],
        plan: ['Iau 2 din 12 și ajung la 10.', 'Din cei 5 de luat mai rămân 3: 10 − 3 = 7.', 'Notez restul obținut: 7 biscuiți.'],
        error: { index: 1, wrong: 'După primii 2, mai iau încă 5: 10 − 5 = 5.', alternatives: ['După primii 2, mai iau doar 1: 10 − 1 = 9.', 'După primii 2, adaug 3 la 10 și obțin 13.'] },
        check: { correct: 'Pun la loc cei 5 luați: 7 + 5 = 12.', wrong: ['7 + 2 = 9 reface cei 12 inițiali.', 'Număr doar biscuiții luați și declar că restul este 5.'] }
      },
      {
        context: 'Mara are 16 cuburi și dă 9 cuburi unui coleg. Cuburile sunt din lemn. Mara stă pe covor. Folosește trecerea prin 10.',
        question: 'Câte cuburi păstrează Mara?',
        facts: [{ text: 'Mara are la început 16 cuburi.', relevant: true }, { text: 'Ea dă 9 cuburi.', relevant: true }, { text: 'Cuburile sunt din lemn.', relevant: false }, { text: 'Mara stă pe covor.', relevant: false }],
        plan: ['Scot 6 din 16 și ajung la 10.', 'Mai trebuie să scot 3 din cele 9: 10 − 3 = 7.', 'Scriu răspunsul: Mara păstrează 7 cuburi.'],
        error: { index: 0, wrong: 'Scot 5 din 16 și spun că am ajuns la 10.', alternatives: ['Scot 7 din 16 și spun că am ajuns la 10.', 'Adaug 6 la 16 și spun că am ajuns la 10.'] },
        check: { correct: 'Cele 7 păstrate și cele 9 date refac 16: 7 + 9 = 16.', wrong: ['7 + 6 = 13 reface cele 16 cuburi.', '9 − 7 = 2 dovedește că Mara păstrează 7.'] }
      },
      {
        context: 'Biblioteca are 34 de semne de carte și oferă 8. Raftul este maro. La geam se află o plantă. Scade trecând întâi prin 30.',
        question: 'Câte semne de carte rămân?',
        facts: [{ text: 'Sunt 34 de semne de carte la început.', relevant: true }, { text: 'Se oferă 8 semne de carte.', relevant: true }, { text: 'Raftul este maro.', relevant: false }, { text: 'La geam se află o plantă.', relevant: false }],
        plan: ['Scad 4 din 34 și ajung la 30.', 'Din cele 8 de oferit mai scad 4: 30 − 4 = 26.', 'Notez rezultatul final: 26 de semne de carte.'],
        error: { index: 2, wrong: 'Notez 30, deși mai trebuiau oferite 4.', alternatives: ['Notez 22, ca și când aș fi scăzut încă 8 din 30.', 'Notez 42, adunând cele 8 la început.'] },
        check: { correct: 'Adun cele 8 oferite la cele 26 rămase: 26 + 8 = 34.', wrong: ['26 + 4 = 30 reface toate cele 34 inițiale.', '34 + 8 = 42 arată câte au rămas după oferire.'] }
      }
    ]
  },
  'mat-4': {
    titles: { evidence: 'Detectivul contururilor și al mozaicurilor', repair: 'Atelierul figurilor reparate', plan: 'Construiește, oglindește, acoperă' },
    cases: [
      {
        context: 'Ina unește capetele a 3 bețișoare drepte într-un contur închis, fără încrucișări. Bețișoarele sunt albastre. Foaia este galbenă.',
        question: 'Ce figură a construit și câte vârfuri are?',
        facts: [{ text: 'Conturul are 3 laturi drepte.', relevant: true }, { text: 'Capetele sunt unite într-un contur închis, fără încrucișări.', relevant: true }, { text: 'Bețișoarele sunt albastre.', relevant: false }, { text: 'Foaia este galbenă.', relevant: false }],
        plan: ['Urmăresc conturul închis și număr cele 3 laturi.', 'Din numărul laturilor recunosc triunghiul.', 'Număr întâlnirile laturilor triunghiului: are 3 vârfuri.'],
        error: { index: 1, wrong: 'Cu 3 laturi recunosc un pătrat.', alternatives: ['Cu 3 laturi recunosc un cerc.', 'Cu 3 laturi recunosc un dreptunghi.'] },
        check: { correct: 'Parcurg conturul: întâlnesc exact 3 segmente și 3 colțuri.', wrong: ['Culoarea albastră dovedește că figura are 3 vârfuri.', 'Număr doar 2 colțuri și confirm triunghiul complet.'] }
      },
      {
        context: 'Pe o grilă, o linie verticală este oglinda. Punctul A este la 2 pătrățele în stânga ei. Oglindirea păstrează rândul și distanța față de linie. Punctul este roșu. Foaia are o pată.',
        question: 'Unde așezi punctul pereche al lui A?',
        facts: [{ text: 'A este la 2 pătrățele în stânga liniei verticale.', relevant: true }, { text: 'Perechea păstrează rândul și distanța față de linie.', relevant: true }, { text: 'Punctul A este roșu.', relevant: false }, { text: 'Foaia are o pată.', relevant: false }],
        plan: ['Pornesc de la A și urmăresc rândul până la linia de oglindire.', 'De la acel loc număr 2 pătrățele spre dreapta, pe același rând.', 'Marchez acolo perechea: la 2 pătrățele în dreapta liniei.'],
        error: { index: 1, wrong: 'De la linie număr doar 1 pătrățel spre dreapta.', alternatives: ['De la linie număr 3 pătrățele spre dreapta.', 'De la linie număr 2 pătrățele tot spre stânga.'] },
        check: { correct: 'Cele două puncte sunt pe același rând, în părți opuse, fiecare la 2 pătrățele de linie.', wrong: ['Verific doar că ambele puncte sunt roșii.', 'Punctele sunt amândouă în stânga, deci sunt în oglindă.'] }
      },
      {
        context: 'Un mozaic dreptunghiular are 3 rânduri de câte 4 locuri pătrate egale. Fiecare piesă acoperă exact un loc, fără suprapuneri. Piesele sunt verzi. Rama este albă.',
        question: 'Câte piese sunt necesare pentru a acoperi întregul mozaic?',
        facts: [{ text: 'Sunt 3 rânduri cu câte 4 locuri pătrate.', relevant: true }, { text: 'O piesă acoperă exact un loc, fără suprapuneri.', relevant: true }, { text: 'Piesele sunt verzi.', relevant: false }, { text: 'Rama este albă.', relevant: false }],
        plan: ['Număr primul rând: sunt necesare 4 piese.', 'Adaug celelalte două rânduri egale: 4 + 4 + 4 = 12.', 'Așez cele 12 piese, câte una în fiecare loc, fără goluri.'],
        error: { index: 2, wrong: 'Așez doar 7 piese pentru cele 12 locuri.', alternatives: ['Pun toate cele 12 piese suprapuse în același loc.', 'Las ultimul rând gol și folosesc numai 8 piese.'] },
        check: { correct: 'Verific toate cele 3 rânduri: fiecare are 4 piese, fără goluri sau suprapuneri.', wrong: ['Verific numai rama, nu interiorul mozaicului.', 'Adun 3 cu 4 și declar că 7 piese acoperă cele 12 locuri.'] }
      }
    ]
  },
  'mat-5': {
    titles: { evidence: 'Indiciile de pe riglă', repair: 'Repară măsurarea benzii', plan: 'De la capete la centimetri' },
    cases: [
      {
        context: 'O panglică întinsă începe la semnul 0 cm și se termină la 6 cm pe riglă. Panglica este roz. Lângă riglă este o gumă.',
        question: 'Ce lungime are panglica?',
        facts: [{ text: 'Panglica începe la 0 cm.', relevant: true }, { text: 'Panglica se termină la 6 cm.', relevant: true }, { text: 'Panglica este roz.', relevant: false }, { text: 'Lângă riglă este o gumă.', relevant: false }],
        plan: ['Citesc începutul panglicii: 0 cm.', 'Din capătul 6 scad începutul citit: 6 − 0 = 6.', 'Scriu lungimea calculată cu unitate: 6 cm.'],
        error: { index: 1, wrong: 'Număr și semnul 0 ca interval și obțin 7.', alternatives: ['Scad invers: 0 − 6 și spun că lungimea este −6.', 'Ignor ultimul interval și obțin 5.'] },
        check: { correct: 'Număr spațiile de câte 1 cm dintre 0 și 6: sunt 6.', wrong: ['Număr 7 semne de pe riglă și le numesc 7 cm.', 'Culoarea roz confirmă lungimea de 6 cm.'] }
      },
      {
        context: 'Un creion întins pe riglă începe la 3 cm și se termină la 11 cm. Creionul este verde. Pe masă este un desen.',
        question: 'Câți centimetri măsoară creionul?',
        facts: [{ text: 'Începutul creionului este la 3 cm.', relevant: true }, { text: 'Sfârșitul creionului este la 11 cm.', relevant: true }, { text: 'Creionul este verde.', relevant: false }, { text: 'Pe masă este un desen.', relevant: false }],
        plan: ['Citesc reperul de început: 3 cm.', 'Scad acest reper din capătul 11: 11 − 3 = 8.', 'Notez lungimea obținută: 8 cm.'],
        error: { index: 2, wrong: 'Notez 11 cm, folosind doar semnul de la capăt.', alternatives: ['Notez 14 cm, adunând cele două repere.', 'Notez 3 cm, folosind doar începutul.'] },
        check: { correct: 'Pornind de la 3, avansez 8 intervale de 1 cm și ajung la 11.', wrong: ['Pornesc de la 0 și ajung la 11, ignorând începutul creionului.', 'Adun 3 + 11 = 14 și confirm lungimea de 8 cm.'] }
      },
      {
        context: 'Banda A este întinsă de la 2 cm la 9 cm; banda B, de la 4 cm la 13 cm. A este roșie. B are buline. Pentru comparație, calculează întâi A, apoi B, apoi diferența.',
        question: 'Care bandă este mai lungă și cu cât?',
        facts: [{ text: 'Banda A are capetele la 2 cm și 9 cm.', relevant: true }, { text: 'Banda B are capetele la 4 cm și 13 cm.', relevant: true }, { text: 'Banda A este roșie.', relevant: false }, { text: 'Banda B are buline.', relevant: false }],
        plan: ['Aflu lungimea benzii A: 9 − 2 = 7 cm.', 'Păstrez lungimea A și calculez B: 13 − 4 = 9 cm.', 'Compar lungimile: B este mai lungă cu 9 − 7 = 2 cm.'],
        error: { index: 2, wrong: 'Compar doar capetele 13 și 9: B este mai lungă cu 4 cm.', alternatives: ['Declar că A este mai lungă cu 2 cm.', 'Adun 9 + 7 și spun că diferența este 16 cm.'] },
        check: { correct: 'Pun începuturile împreună: după cei 7 cm ai lui A, la B mai rămân 2 cm.', wrong: ['Compar culorile pentru a confirma diferența.', 'Compar numai reperele de început 2 și 4, fără lungimi.'] }
      }
    ]
  },
  'mat-6': {
    titles: { evidence: 'Indiciile celor două ace', repair: 'Ceasornicarul corectează ora', plan: 'Traseul minutelor' },
    cases: [
      {
        context: 'La ceasul din clasă, acul scurt este exact la 8, iar acul lung la 12. Rama este verde. Sub ceas este un tablou. Citește întâi orele, apoi minutele.',
        question: 'Ce oră arată ceasul?',
        facts: [{ text: 'Acul scurt este exact la 8.', relevant: true }, { text: 'Acul lung este la 12.', relevant: true }, { text: 'Rama ceasului este verde.', relevant: false }, { text: 'Sub ceas este un tablou.', relevant: false }],
        plan: ['Citesc acul scurt: ora 8.', 'Adaug minutele arătate de acul lung la 12: zero minute.', 'Reunesc citirile și scriu 8:00.'],
        error: { index: 1, wrong: 'Acul lung la 12 înseamnă 12 minute.', alternatives: ['Acul lung la 12 înseamnă 60 de minute trecute din aceeași oră.', 'Acul lung la 12 înseamnă 30 de minute.'] },
        check: { correct: 'La 8:00 acul scurt este pe 8, iar cel lung pe 12, exact ca în poveste.', wrong: ['Verific numai rama verde pentru a confirma ora.', 'La 8:00 acul lung trebuie să fie pe 8.'] }
      },
      {
        context: 'Ceasul arată acul scurt la jumătatea drumului dintre 2 și 3, iar acul lung la 6. Cadranul este alb. Ceasul este deasupra ușii. Citește întâi orele, apoi minutele.',
        question: 'Ce oră indică ambele ace împreună?',
        facts: [{ text: 'Acul scurt este la jumătatea drumului dintre 2 și 3.', relevant: true }, { text: 'Acul lung este la 6.', relevant: true }, { text: 'Cadranul este alb.', relevant: false }, { text: 'Ceasul este deasupra ușii.', relevant: false }],
        plan: ['Acul scurt a trecut de 2, dar nu de 3: păstrez ora 2.', 'Citesc minutele la 6: 5 + 5 + 5 + 5 + 5 + 5 = 30.', 'Unesc ora și minutele: este 2:30.'],
        error: { index: 2, wrong: 'Rotunjesc la ora următoare și scriu 3:30.', alternatives: ['Folosesc numărul 6 ca minute și scriu 2:06.', 'Inversez rolurile acelor și scriu 6:10.'] },
        check: { correct: 'La 2:30 acul lung este la 6, iar cel scurt la jumătatea dintre 2 și 3.', wrong: ['La 2:30 acul scurt trebuie să fie exact pe 2.', 'La 2:30 acul lung trebuie să fie exact pe 3.'] }
      },
      {
        context: 'Lectura începe la 4:45 și durează 20 de minute. Cartea are copertă roșie. Perna este moale. Împarte timpul la schimbarea orei.',
        question: 'La ce oră se termină lectura?',
        facts: [{ text: 'Lectura începe la 4:45.', relevant: true }, { text: 'Lectura durează 20 de minute.', relevant: true }, { text: 'Coperta cărții este roșie.', relevant: false }, { text: 'Perna este moale.', relevant: false }],
        plan: ['De la 4:45 până la 5:00 număr 15 minute.', 'Din cele 20 de minute scad cele 15 folosite: mai rămân 5.', 'Adaug cele 5 minute după 5:00: lectura se termină la 5:05.'],
        error: { index: 2, wrong: 'Scriu 4:65, fără să schimb ora.', alternatives: ['Adaug din nou toate cele 20 după 5:00 și scriu 5:20.', 'Păstrez 5:00, deși mai sunt 5 minute.'] },
        check: { correct: 'De la 4:45 la 5:00 sunt 15 minute și până la 5:05 încă 5: în total 20.', wrong: ['Verific numai că 45 + 20 = 65 și accept ora 4:65.', 'De la 4:45 la 5:05 sunt 60 de minute.'] }
      }
    ]
  },
  'mat-7': {
    titles: { evidence: 'Dovezile de pe talere', repair: 'Repară echilibrul balanței', plan: 'Cuburi egale, mase egale' },
    cases: [
      {
        context: 'Balanța are 3 cuburi în stânga și 5 în dreapta. Toate cuburile au aceeași masă. Balanța este gri. Pe perete este un desen. Ai voie doar să adaugi cuburi în stânga.',
        question: 'Câte cuburi identice adaugi pentru echilibru?',
        facts: [{ text: 'Sunt 3 cuburi în stânga și 5 în dreapta.', relevant: true }, { text: 'Toate cuburile au aceeași masă.', relevant: true }, { text: 'Balanța este gri.', relevant: false }, { text: 'Pe perete este un desen.', relevant: false }],
        plan: ['Compar numerele: stânga are mai puține cuburi, 3 față de 5.', 'Aflu câte lipsesc în stânga: 5 − 3 = 2.', 'Adaug cele 2 cuburi în stânga: 3 + 2 = 5, deci talerele se echilibrează.'],
        error: { index: 2, wrong: 'Adaug cele 2 cuburi în dreapta, unde sunt deja 5.', alternatives: ['Adaug numai un cub în stânga și declar echilibru.', 'Adaug 3 cuburi în stânga și declar echilibru.'] },
        check: { correct: 'Număr 5 cuburi identice pe fiecare taler: masele sunt egale.', wrong: ['Compar doar culoarea talerelor pentru echilibru.', 'Consider că 4 cuburi identice cântăresc cât 5.'] }
      },
      {
        context: 'Pe un taler sunt 9 cuburi, pe celălalt 4; toate au aceeași masă. Suportul este albastru. Pe masă este un pix. Echilibrează doar scoțând din grupa de 9.',
        question: 'Câte cuburi trebuie scoase?',
        facts: [{ text: 'Talerele au 9 cuburi, respectiv 4 cuburi.', relevant: true }, { text: 'Cuburile au toate aceeași masă.', relevant: true }, { text: 'Suportul este albastru.', relevant: false }, { text: 'Pe masă este un pix.', relevant: false }],
        plan: ['Identific grupa mai grea: cele 9 cuburi identice.', 'Calculez surplusul ei față de 4: 9 − 4 = 5.', 'Scot cele 5 cuburi din grupa de 9 și rămân 4 pe fiecare taler.'],
        error: { index: 1, wrong: 'Surplusul este 9 + 4 = 13 cuburi.', alternatives: ['Surplusul este 4 cuburi.', 'Surplusul este 9 cuburi.'] },
        check: { correct: 'După scoatere, 9 − 5 = 4: am câte 4 cuburi de aceeași masă.', wrong: ['Scot 4 din 9 și spun că 5 este egal cu 4.', 'Numărul pixurilor confirmă echilibrul.'] }
      },
      {
        context: 'Un săculeț închis echilibrează 6 cuburi identice. Apoi pe talerul săculețului se pun încă 2 cuburi la fel. Săculețul este mov. Balanța stă lângă geam. Nu scoți nimic de pe talere.',
        question: 'Câte cuburi adaugi pe talerul opus pentru a reface echilibrul?',
        facts: [{ text: 'Săculețul singur echilibrează 6 cuburi identice.', relevant: true }, { text: 'Lângă săculeț se adaugă 2 cuburi la fel.', relevant: true }, { text: 'Săculețul este mov.', relevant: false }, { text: 'Balanța stă lângă geam.', relevant: false }],
        plan: ['Înlocuiesc în gând masa săculețului cu masa celor 6 cuburi.', 'Cu cele 2 noi, acel taler are masa a 6 + 2 = 8 cuburi.', 'Pe talerul opus sunt 6; adaug 8 − 6 = 2 cuburi identice.'],
        error: { index: 2, wrong: 'Adaug 8 cuburi peste cele 6 de pe talerul opus.', alternatives: ['Nu adaug nimic și declar că 6 echilibrează 8.', 'Adaug un singur cub și declar că 7 echilibrează 8.'] },
        check: { correct: 'Un taler are masa a 8 cuburi, iar celălalt 6 + 2 = 8 cuburi.', wrong: ['Număr săculețul ca un singur cub, indiferent de masa lui.', 'Culoarea săculețului dovedește că balanța este egală.'] }
      }
    ]
  },
  'mat-8': {
    titles: { evidence: 'Bonul cu indicii folositoare', repair: 'Restul calculat corect', plan: 'Cumpăr, plătesc, verific' },
    cases: [
      {
        context: 'Un caiet costă 6 lei. Ina îl cumpără și dă vânzătorului 10 lei. Caietul are dungi. Ina poartă un rucsac.',
        question: 'Câți lei trebuie să primească rest?',
        facts: [{ text: 'Caietul costă 6 lei.', relevant: true }, { text: 'Ina dă la plată 10 lei.', relevant: true }, { text: 'Caietul are dungi.', relevant: false }, { text: 'Ina poartă un rucsac.', relevant: false }],
        plan: ['Identific prețul de scăzut: 6 lei.', 'Îl scad din suma dată: 10 − 6 = 4 lei.', 'Cer restul calculat: 4 lei.'],
        error: { index: 1, wrong: 'Adun prețul la suma dată: 10 + 6 = 16 lei rest.', alternatives: ['Scad doar 4 lei din 10 și spun că restul este 6 lei.', 'Păstrez toți cei 10 lei ca rest, fără să plătesc prețul.'] },
        check: { correct: 'Prețul 6 lei și restul 4 lei refac cei 10 lei dați.', wrong: ['6 + 10 = 16 este restul de primit.', 'Dungile caietului confirmă suma restului.'] }
      },
      {
        context: 'Un suc costă 7 lei, iar un sandviș 8 lei. Dan cumpără ambele și dă 20 de lei. Sucul este de mere. Punga este albă.',
        question: 'Cât rest primește Dan?',
        facts: [{ text: 'Produsele cumpărate costă 7 lei și 8 lei.', relevant: true }, { text: 'Dan dă la plată 20 de lei.', relevant: true }, { text: 'Sucul este de mere.', relevant: false }, { text: 'Punga este albă.', relevant: false }],
        plan: ['Adun prețurile: 7 + 8 = 15 lei.', 'Scad costul aflat din suma dată: 20 − 15 = 5 lei.', 'Notez restul: Dan primește 5 lei.'],
        error: { index: 0, wrong: 'Scad prețurile: 8 − 7 = 1 leu cost total.', alternatives: ['Costul total este doar 7 lei, fără sandviș.', 'Costul total este 7 + 7 = 14 lei, deși sandvișul costă 8.'] },
        check: { correct: 'Costul 15 lei plus restul 5 lei dau exact 20 de lei.', wrong: ['Verific doar prețul sucului: 7 + 5 = 12, deci plata de 20 este refăcută.', '20 + 15 = 35 confirmă restul de 5 lei.'] }
      },
      {
        context: 'Mara are 30 de lei, dar dă la casă doar 20 de lei. Cumpără o carte de 12 lei și o gumă de 4 lei. Cartea este despre animale. Guma este rotundă.',
        question: 'Ce rest primește la casă, nu câți bani are în total după cumpărare?',
        facts: [{ text: 'Mara dă la casă doar 20 de lei.', relevant: true }, { text: 'Cartea costă 12 lei și guma 4 lei.', relevant: true }, { text: 'Cartea este despre animale.', relevant: false }, { text: 'Guma este rotundă.', relevant: false }],
        plan: ['Adun prețurile cumpărăturilor: 12 + 4 = 16 lei.', 'Scad cei 16 lei din cei 20 dați efectiv: 20 − 16 = 4 lei.', 'Răspund pentru restul de la casă: 4 lei.'],
        error: { index: 1, wrong: 'Scad costul din toți banii: 30 − 16 = 14 lei rest de la casă.', alternatives: ['Scad doar cartea din suma dată: 20 − 12 = 8 lei rest.', 'Adun costul la suma dată: 20 + 16 = 36 lei rest.'] },
        check: { correct: '16 lei pentru produse plus 4 lei rest refac cei 20 de lei dați casierului.', wrong: ['16 + 14 = 30 verifică restul pentru plata de 20 de lei.', 'Număr banii rămași în buzunar drept bani primiți de la casier.'] }
      }
    ]
  },
  'mat-9': {
    titles: { evidence: 'Obiect sau contur desenat?', repair: 'Repară eticheta feței', plan: 'De la corp la figura plană' },
    cases: [
      {
        context: 'Tudor pune pe foaie o față a unui cub. Fața are 4 laturi egale și 4 unghiuri drepte. Cubul este roșu. Foaia este crem.',
        question: 'Ce figură obține trasând conturul acestei fețe?',
        facts: [{ text: 'Fața aleasă are 4 laturi egale.', relevant: true }, { text: 'Fața aleasă are 4 unghiuri drepte.', relevant: true }, { text: 'Cubul este roșu.', relevant: false }, { text: 'Foaia este crem.', relevant: false }],
        plan: ['Urmăresc cele 4 laturi egale ale feței.', 'Verific și cele 4 unghiuri drepte: recunosc un pătrat.', 'Trasez conturul feței și numesc desenul pătrat, nu cub.'],
        error: { index: 2, wrong: 'Numesc desenul plat cub, ca obiectul întreg.', alternatives: ['Numesc conturul cerc, deși are colțuri.', 'Numesc conturul triunghi, deși are 4 laturi.'] },
        check: { correct: 'Desenul are 4 laturi egale și 4 colțuri drepte; cubul rămâne obiectul cu mai multe fețe.', wrong: ['Desenul și cubul sunt același corp pentru că au aceeași culoare.', 'Un pătrat desenat trebuie să aibă 6 fețe ca un cub.'] }
      },
      {
        context: 'O cutie are o față cu laturile de 5 cm, 3 cm, 5 cm, 3 cm, în această ordine, și 4 unghiuri drepte. Cutia este albastră. Lângă ea este o panglică.',
        question: 'Ce figură plană descrie conturul feței și câte vârfuri are?',
        facts: [{ text: 'Laturile feței sunt 5 cm, 3 cm, 5 cm, 3 cm.', relevant: true }, { text: 'Fața are 4 unghiuri drepte.', relevant: true }, { text: 'Cutia este albastră.', relevant: false }, { text: 'Lângă cutie este o panglică.', relevant: false }],
        plan: ['Observ laturile opuse egale și lungimile vecine diferite: 5 cm și 3 cm.', 'Folosesc și cele 4 unghiuri drepte: conturul este un dreptunghi, nu un pătrat.', 'Număr colțurile dreptunghiului: sunt 4 vârfuri.'],
        error: { index: 1, wrong: 'Numesc conturul pătrat, deși laturile vecine au 5 cm și 3 cm.', alternatives: ['Numesc conturul triunghi cu 3 laturi.', 'Numesc conturul cerc fără vârfuri.'] },
        check: { correct: 'Pe desen regăsesc două laturi de 5 cm, două de 3 cm și 4 colțuri drepte.', wrong: ['Verific numai culoarea cutiei pentru a numi figura.', 'Spun că întregul obiect este un desen plat fiindcă o față este dreptunghiulară.'] }
      },
      {
        context: 'În atelier sunt două obiecte: o minge sferică și o cutie cu o față triunghiulară. Fața are 3 laturi drepte. Mingea este galbenă. Cutia are o etichetă. Pentru contururi, examinează întâi mingea, apoi fața cutiei, apoi compară.',
        question: 'Care dintre cele două obiecte oferă o față plană al cărei contur este un triunghi?',
        facts: [{ text: 'Mingea este sferică.', relevant: true }, { text: 'Cutia are o față triunghiulară cu 3 laturi drepte.', relevant: true }, { text: 'Mingea este galbenă.', relevant: false }, { text: 'Cutia are o etichetă.', relevant: false }],
        plan: ['Examinez mingea sferică: nu are o față plană triunghiulară.', 'Examinez apoi fața cutiei: îi urmăresc cele 3 laturi drepte.', 'Compar observațiile și aleg fața cutiei pentru conturul de triunghi.'],
        error: { index: 2, wrong: 'Aleg mingea ca față plană triunghiulară.', alternatives: ['Aleg ambele obiecte, spunând că ambele au fețe triunghiulare.', 'Nu aleg cutia, spunând că triunghiul nu are laturi drepte.'] },
        check: { correct: 'Conturul feței alese are 3 laturi și 3 vârfuri; mingea nu are o asemenea față.', wrong: ['Culoarea galbenă dovedește că mingea are o față triunghiulară.', 'Număr etichetele, nu laturile feței alese.'] }
      }
    ]
  },
  'mat-10': {
    titles: { evidence: 'Ce valorează fiecare cifră?', repair: 'Schimbul de unități reparat', plan: 'Construim o zece nouă' },
    cases: [
      {
        context: 'Nora are 2 legături de câte 10 paie și 7 paie separate. Legăturile au funde verzi. Paiele sunt pe o tavă.',
        question: 'Ce număr reprezintă paiele și ce valoare are cifra zecilor?',
        facts: [{ text: 'Sunt 2 legături cu câte 10 paie.', relevant: true }, { text: 'Sunt 7 paie separate.', relevant: true }, { text: 'Fundele sunt verzi.', relevant: false }, { text: 'Paiele sunt pe o tavă.', relevant: false }],
        plan: ['Transform cele 2 zeci în 20 de unități.', 'Adaug cele 7 unități separate: 20 + 7 = 27.', 'Scriu 27 și precizez: cifra 2 are aici valoarea 20.'],
        error: { index: 2, wrong: 'Scriu 27, dar spun că cifra 2 valorează doar 2 unități.', alternatives: ['Scriu 72 și spun că sunt 7 zeci.', 'Scriu 9, adunând numărul legăturilor cu paiele separate.'] },
        check: { correct: 'Descompun 27 în 20 + 7 și regăsesc 2 legături de zece și 7 paie.', wrong: ['Descompun 27 în 2 + 7 și pretind că totalul rămâne 27.', 'Număr fundele drept toate paiele din legături.'] }
      },
      {
        context: 'Vlad are 3 pachete a câte 10 cartonașe și 9 cartonașe libere. Primește încă unul. Pachetele sunt albastre. Pe masă este o riglă.',
        question: 'Ce număr obține după schimbarea unităților în zeci?',
        facts: [{ text: 'Vlad are 3 pachete de zece și 9 cartonașe libere.', relevant: true }, { text: 'Vlad primește încă un cartonaș.', relevant: true }, { text: 'Pachetele sunt albastre.', relevant: false }, { text: 'Pe masă este o riglă.', relevant: false }],
        plan: ['Adaug cartonașul primit la cele 9 libere: obțin 10 unități.', 'Schimb cele 10 unități într-un pachet de zece și îl pun lângă cele 3.', 'Număr 4 zeci și zero unități separate: 40.'],
        error: { index: 1, wrong: 'Schimb cele 10 unități în două pachete de câte zece.', alternatives: ['Arunc cele 10 unități fără să adaug un pachet.', 'Fac un pachet nou, dar păstrez și cele 10 unități numărate încă o dată.'] },
        check: { correct: '39 + 1 = 40; desfacerea noului pachet redă aceleași 10 cartonașe.', wrong: ['39 + 1 = 310, fiindcă lipesc cifrele.', 'La schimb pot dubla cartonașele fără să schimb totalul.'] }
      },
      {
        context: 'Ema are 4 tuburi cu câte 10 mărgele și 8 mărgele libere; primește încă 5. Tuburile sunt transparente. Masa are o față de masă. Grupează întâi unitățile.',
        question: 'Câte zeci și unități are după un schimb complet?',
        facts: [{ text: 'Ema are 4 zeci și 8 mărgele libere.', relevant: true }, { text: 'Ema primește încă 5 mărgele.', relevant: true }, { text: 'Tuburile sunt transparente.', relevant: false }, { text: 'Masa are o față de masă.', relevant: false }],
        plan: ['Adun unitățile libere: 8 + 5 = 13.', 'Din cele 13 fac o zece nouă și las 3 unități libere.', 'Adaug zecea nouă celor 4: am 5 zeci și 3 unități, adică 53.'],
        error: { index: 2, wrong: 'Păstrez numai cele 4 zeci vechi și cele 3 unități: 43.', alternatives: ['Adaug două zeci noi în loc de una și scriu 63.', 'Inversez pozițiile și scriu 35.'] },
        check: { correct: '53 = 40 + 13 = 48 + 5: schimbul păstrează toate mărgelele.', wrong: ['53 = 4 + 13 verifică toate mărgelele.', 'Dacă am un tub nou, pot ignora cele 3 mărgele rămase.'] }
      }
    ]
  },
  'mat-11': {
    titles: { evidence: 'Indiciile schimbărilor din poveste', repair: 'Repară calculul intermediar', plan: 'Două întâmplări, un răspuns' },
    cases: [
      {
        context: 'Daria are 6 abțibilduri. Primește 4, apoi oferă 3 din cele pe care le are. Albumul este mov. Daria stă la birou.',
        question: 'Câte abțibilduri îi rămân după ambele întâmplări?',
        facts: [{ text: 'Daria are 6 abțibilduri și primește 4.', relevant: true }, { text: 'După primire oferă 3 abțibilduri.', relevant: true }, { text: 'Albumul este mov.', relevant: false }, { text: 'Daria stă la birou.', relevant: false }],
        plan: ['După primire calculez 6 + 4 = 10.', 'Din totalul nou ofer 3: 10 − 3 = 7.', 'Răspund după ambele schimbări: rămân 7 abțibilduri.'],
        error: { index: 1, wrong: 'Adun și cele oferite: 10 + 3 = 13.', alternatives: ['Scad cele 4 primite în loc de cele 3 oferite: 10 − 4 = 6.', 'Ignor oferirea și păstrez totalul 10.'] },
        check: { correct: 'Refac drumul înapoi: 7 + 3 = 10, apoi 10 − 4 = 6.', wrong: ['7 + 4 = 11 reface începutul de 6.', 'Verific numai primirea și ignor cele 3 oferite.'] }
      },
      {
        context: 'În cutie sunt 15 creioane. Copiii scot 7 pentru desen, apoi pun în cutie 5 creioane noi. Cutia este din lemn. Desenele sunt pe perete.',
        question: 'Câte creioane sunt în cutie la final?',
        facts: [{ text: 'Din cele 15 creioane se scot 7.', relevant: true }, { text: 'După scoatere se pun 5 creioane noi.', relevant: true }, { text: 'Cutia este din lemn.', relevant: false }, { text: 'Desenele sunt pe perete.', relevant: false }],
        plan: ['După scoatere rămân 15 − 7 = 8 creioane.', 'La restul de 8 adaug cele 5 noi: 8 + 5 = 13.', 'Notez cantitatea finală: 13 creioane în cutie.'],
        error: { index: 0, wrong: 'Adun creioanele scoase: 15 + 7 = 22.', alternatives: ['Scad 5 în loc de cele 7 scoase: 15 − 5 = 10.', 'Declar că toate cele 15 rămân în cutie după scoatere.'] },
        check: { correct: 'Scot cele 5 noi din 13 și pun la loc cele 7 luate: 13 − 5 + 7 = 15.', wrong: ['Adun ambele schimbări la 13 și pretind că obțin 15.', 'Cele 8 de după primul pas sunt răspunsul final, fără adăugare.'] }
      },
      {
        context: 'Pe raft sunt 28 de cărți. Se împrumută 9, apoi se înapoiază 6 cărți. Raftul este alb. Lângă el este un ghiveci.',
        question: 'Câte cărți se află pe raft după înapoiere?',
        facts: [{ text: 'Din cele 28 de cărți se împrumută 9.', relevant: true }, { text: 'Apoi se înapoiază 6 cărți pe raft.', relevant: true }, { text: 'Raftul este alb.', relevant: false }, { text: 'Lângă raft este un ghiveci.', relevant: false }],
        plan: ['Calculez ce rămâne după împrumut: 28 − 9 = 19.', 'Adaug cărțile înapoiate la rest: 19 + 6 = 25.', 'Scriu răspunsul final: 25 de cărți pe raft.'],
        error: { index: 1, wrong: 'Scad și cărțile înapoiate: 19 − 6 = 13.', alternatives: ['Adaug din nou 9 în loc de 6: 19 + 9 = 28.', 'Pornesc iar de la 28 și ignor împrumutul: 28 + 6 = 34.'] },
        check: { correct: '25 − 6 = 19, iar 19 + 9 = 28: refac cele două schimbări înapoi.', wrong: ['25 + 6 + 9 = 40 reface începutul de 28.', '28 − 9 = 19 verifică singur răspunsul final 25, fără a folosi înapoierea.'] }
      }
    ]
  },
  'mat-12': {
    titles: { evidence: 'Părți egale din același întreg', repair: 'Repară numele bucății', plan: 'De la împărțire la jumătate' },
    cases: [
      {
        context: 'O foaie este tăiată în 2 bucăți care se suprapun exact. Una este colorată. Foaia este galbenă. Foarfeca are mâner verde.',
        question: 'Ce parte din foaie este colorată?',
        facts: [{ text: 'Foaia are 2 bucăți care se suprapun exact.', relevant: true }, { text: 'Este colorată una dintre cele două bucăți.', relevant: true }, { text: 'Foaia este galbenă.', relevant: false }, { text: 'Foarfeca are mâner verde.', relevant: false }],
        plan: ['Din suprapunere constat că cele 2 bucăți sunt egale.', 'Fiecare dintre cele 2 părți egale este o jumătate din foaie.', 'Este colorată o asemenea parte: o jumătate.'],
        error: { index: 1, wrong: 'Fiecare dintre cele 2 părți egale este un sfert.', alternatives: ['Fiecare bucată este foaia întreagă.', 'Fiecare dintre cele 2 părți egale este o optime.'] },
        check: { correct: 'Două copii ale bucății colorate refac foaia fără goluri sau suprapuneri.', wrong: ['Orice două bucăți, chiar inegale, sunt jumătăți.', 'Culoarea galbenă dovedește că bucata este o jumătate.'] }
      },
      {
        context: 'O tavă dreptunghiulară de plăcintă este împărțită în 4 bucăți egale. Se servesc 2 bucăți. Tava este gri. Pe masă este o cană.',
        question: 'Ce parte din plăcinta întreagă a fost servită?',
        facts: [{ text: 'Plăcinta este împărțită în 4 bucăți egale.', relevant: true }, { text: 'Se servesc 2 dintre cele 4 bucăți.', relevant: true }, { text: 'Tava este gri.', relevant: false }, { text: 'Pe masă este o cană.', relevant: false }],
        plan: ['Numesc fiecare dintre cele 4 părți egale un sfert.', 'Pentru cele 2 bucăți servite număr două sferturi.', 'Compar cu întregul: două sferturi reprezintă o jumătate din plăcintă.'],
        error: { index: 2, wrong: 'Două sferturi reprezintă plăcinta întreagă.', alternatives: ['Două sferturi reprezintă doar un sfert.', 'Două sferturi reprezintă trei sferturi.'] },
        check: { correct: 'Cele 2 bucăți servite și cele 2 rămase au suprafețe totale egale: fiecare grupă este jumătate.', wrong: ['Număr numai bucățile servite și le numesc două întreguri.', 'Compar culoarea tăvii cu aceea a cănii pentru a verifica jumătatea.'] }
      },
      {
        context: 'O bandă este împărțită în 8 părți egale. Sunt colorate 4 părți, chiar dacă nu sunt alăturate. Banda este pe o coală albă. Lângă ea este un stilou.',
        question: 'Ce parte din aceeași bandă este colorată?',
        facts: [{ text: 'Banda are 8 părți egale.', relevant: true }, { text: 'Sunt colorate 4 dintre aceste părți.', relevant: true }, { text: 'Coala de sub bandă este albă.', relevant: false }, { text: 'Lângă bandă este un stilou.', relevant: false }],
        plan: ['Numesc fiecare parte egală o optime din bandă.', 'Număr cele 4 părți colorate: patru optimi.', 'Compar cele 4 colorate cu cele 4 necolorate: suprafața colorată este o jumătate.'],
        error: { index: 2, wrong: 'Patru optimi nu pot fi o jumătate dacă nu sunt alăturate.', alternatives: ['Patru optimi formează banda întreagă.', 'Patru optimi formează doar un sfert din bandă.'] },
        check: { correct: 'Grupez pe o copie cele 4 părți colorate și cele 4 necolorate: acoperă suprafețe egale.', wrong: ['Locul părților pe bandă schimbă mărimea lor totală.', 'Numărul stilourilor arată fracția colorată.'] }
      }
    ]
  },
  'lim-1': {
    titles: { evidence: 'Urmele sunetelor în cuvinte', repair: 'Repară legătura sunet–literă', plan: 'Ascult, despart sunetele, citesc' },
    cases: [
      {
        context: 'Pe cartonaș scrie „măr”. Ana îl rostește firesc: m, ă, r. Cartonașul este verde. Ana poartă o vestă. Întâi ascultă, apoi caută litera, apoi verifică.',
        question: 'Ce sunet se aude primul și ce literă îl notează?',
        facts: [{ text: 'Cuvântul rostit are sunetele m, ă, r, în această ordine.', relevant: true }, { text: 'Pe cartonaș scrie „măr”.', relevant: true }, { text: 'Cartonașul este verde.', relevant: false }, { text: 'Ana poartă o vestă.', relevant: false }],
        plan: ['Ascult începutul cuvântului și izolez sunetul m.', 'Caut în „măr” litera pentru sunetul auzit: m.', 'Recitesc „măr” și verific că m este primul sunet și prima literă.'],
        error: { index: 0, wrong: 'Spun că primul sunet este „em”, numele literei.', alternatives: ['Spun că primul sunet este ă.', 'Spun că primul sunet este r.'] },
        check: { correct: 'Prelungesc mmm, apoi rostesc „măr”; nu adaug sunetul e.', wrong: ['Rostesc „emăr” și spun că am păstrat cuvântul.', 'Privesc culoarea cartonașului, fără să ascult cuvântul.'] }
      },
      {
        context: 'Dan citește „lup” și aude pe rând l, u, p. Cuvântul este pe o etichetă albă. Pe birou este o lampă. Ascultă, numără sunetele, apoi compară cu literele.',
        question: 'Câte sunete și câte litere are cuvântul „lup”?',
        facts: [{ text: 'Sunetele auzite în ordine sunt l, u, p.', relevant: true }, { text: 'Cuvântul scris este „lup”.', relevant: true }, { text: 'Eticheta este albă.', relevant: false }, { text: 'Pe birou este o lampă.', relevant: false }],
        plan: ['Izolez sunetele cuvântului: l, u, p.', 'Pun câte un jeton pentru fiecare sunet izolat: 3 sunete.', 'Număr literele l, u, p: 3 litere, tot atâtea ca sunetele acestui cuvânt.'],
        error: { index: 1, wrong: 'Pun un singur jeton pentru cuvânt și spun că are un sunet.', alternatives: ['Pun 4 jetoane și spun că aud 4 sunete.', 'Număr numai l și p și spun că sunt 2 sunete.'] },
        check: { correct: 'Ating pe rând cele 3 litere și rostesc l, u, p, apoi reunesc „lup”.', wrong: ['Număr silaba „lup” ca dovadă că ar exista numai o literă.', 'Din acest exemplu decid că toate cuvintele au mereu tot atâtea sunete ca litere.'] }
      },
      {
        context: 'Ina are cartonașul „drum” și rostește d, r, u, m. Cartonașul este portocaliu. Lângă el este o cutie. Ascultă, identifică ultimul sunet, apoi caută litera.',
        question: 'Care este ultimul sunet și cu ce literă este scris?',
        facts: [{ text: 'Ina rostește sunetele d, r, u, m, în această ordine.', relevant: true }, { text: 'Pe cartonaș este scris „drum”.', relevant: true }, { text: 'Cartonașul este portocaliu.', relevant: false }, { text: 'Lângă el este o cutie.', relevant: false }],
        plan: ['Ascult întregul cuvânt și urmăresc ordinea d, r, u, m.', 'Din șirul ascultat aleg ultimul sunet: m.', 'Caut semnul ultimului sunet: litera m de la sfârșitul lui „drum”.'],
        error: { index: 2, wrong: 'Aleg litera n pentru sunetul m auzit.', alternatives: ['Aleg litera d de la început drept ultima literă.', 'Scriu „em” în locul literei m de la sfârșit.'] },
        check: { correct: 'Citesc d-r-u-m și reunesc „drum”; ultimul semn m corespunde sunetului m.', wrong: ['Citesc „drun” și spun că sunetul final este n în cuvântul dat.', 'Confirm litera finală numai după culoarea cartonașului.'] }
      }
    ]
  },
  'lim-2': {
    titles: { evidence: 'Indiciile silabelor auzite', repair: 'Repară cuvântul despărțit', plan: 'Bătăi, jetoane și reunire' },
    cases: [
      {
        context: 'Mara rostește „masă” rar: ma-să, cu o bătaie pentru fiecare parte. Stă pe un scaun albastru. Pe masă este un vas.',
        question: 'Câte silabe are „masă” și cum refaci cuvântul?',
        facts: [{ text: 'Cuvântul este rostit „ma-să”.', relevant: true }, { text: 'Fiecare parte rostită primește o bătaie.', relevant: true }, { text: 'Scaunul este albastru.', relevant: false }, { text: 'Pe masă este un vas.', relevant: false }],
        plan: ['Ascult părțile rostite: ma și să.', 'Pun câte un jeton pentru fiecare parte auzită: 2 silabe.', 'Reunesc cele 2 silabe, ma-să, și obțin „masă”.'],
        error: { index: 1, wrong: 'Pun 4 jetoane pentru cele 4 litere și spun că sunt 4 silabe.', alternatives: ['Pun un singur jeton și spun că „ma-să” are o silabă.', 'Pun 3 jetoane și spun că „ma-să” are 3 silabe.'] },
        check: { correct: 'Rostesc ma-să în două bătăi, apoi leg părțile și aud „masă”.', wrong: ['Număr literele și le numesc silabe fără să rostesc.', 'Reunesc doar „ma” și spun că am refăcut „masă”.'] }
      },
      {
        context: 'Toma rostește „banană” rar: ba-na-nă. Pune jetoane de la stânga la dreapta în ordinea rostirii. Jetoanele sunt roșii. Foaia este albă.',
        question: 'Cum reprezinți și refaci toate silabele cuvântului?',
        facts: [{ text: 'Cuvântul este rostit „ba-na-nă”.', relevant: true }, { text: 'Jetoanele urmează de la stânga la dreapta ordinea rostirii.', relevant: true }, { text: 'Jetoanele sunt roșii.', relevant: false }, { text: 'Foaia este albă.', relevant: false }],
        plan: ['Ascult cele trei părți: ba, na, nă.', 'Le reprezint în ordinea auzită prin 3 jetoane: ba | na | nă.', 'Citesc jetoanele în ordine și reunesc „banană”.'],
        error: { index: 2, wrong: 'Sar peste jetonul „na” și reunesc „bană”.', alternatives: ['Citesc jetoanele invers și obțin „nănaba”.', 'Repet „ba” în loc de „nă” și obțin „banaba”.'] },
        check: { correct: 'Compar cu modelul ba-na-nă: fiecare silabă apare o dată și în aceeași ordine.', wrong: ['Numărul de litere dovedește singur că am rostit toate silabele în ordine.', 'Orice ordine a celor 3 jetoane reface același cuvânt.'] }
      },
      {
        context: 'Pe afiș scrie „locomotivă”; modelul rostit este lo-co-mo-ti-vă. Nina pune un jeton pentru fiecare silabă. Afișul are ramă verde. Nina are un creion.',
        question: 'Câte jetoane sunt necesare și ce cuvânt trebuie să refacă?',
        facts: [{ text: 'Modelul rostit este „lo-co-mo-ti-vă”.', relevant: true }, { text: 'Nina pune un jeton pentru fiecare silabă.', relevant: true }, { text: 'Afișul are ramă verde.', relevant: false }, { text: 'Nina are un creion.', relevant: false }],
        plan: ['Urmăresc în model părțile lo, co, mo, ti, vă.', 'Pun câte un jeton pentru părțile urmărite: 5 jetoane.', 'Reunesc cele 5 silabe în ordine și refac „locomotivă”.'],
        error: { index: 1, wrong: 'Pun numai 4 jetoane pentru cele 5 silabe.', alternatives: ['Pun 6 jetoane pentru cele 5 silabe.', 'Pun un singur jeton și spun că fiecare cuvânt are o singură silabă.'] },
        check: { correct: 'Ating succesiv cele 5 jetoane și rostesc lo-co-mo-ti-vă, fără omisiuni.', wrong: ['Omit „ti” și accept „locomovă” ca verificare.', 'Verific silabele după culoarea ramei.'] }
      }
    ]
  },
  'lim-3': {
    titles: { evidence: 'Cine face acțiunea din mesaj?', repair: 'Propoziția cu pasul greșit', plan: 'De la persoană la propoziție' },
    cases: [
      {
        context: 'Cartonașele sunt „Ana”, „udă”, „florile”. Mesajul cerut spune cine, apoi ce face, apoi ce udă. Cartonașele sunt verzi. Masa este rotundă.',
        question: 'Ce propoziție afirmativă formezi în ordinea cerută?',
        facts: [{ text: 'Cuvintele disponibile sunt „Ana”, „udă”, „florile”.', relevant: true }, { text: 'Ordinea cerută este cine, ce face, ce udă.', relevant: true }, { text: 'Cartonașele sunt verzi.', relevant: false }, { text: 'Masa este rotundă.', relevant: false }],
        plan: ['Aleg cine face acțiunea: Ana.', 'După Ana pun acțiunea „udă”, apoi „florile”.', 'Scriu propoziția cu literă mare și punct: „Ana udă florile.”'],
        error: { index: 2, wrong: 'Scriu „ana udă florile.”, fără literă mare la început.', alternatives: ['Scriu „Ana udă florile”, fără semn final.', 'Scriu „Ana udăflorile.”, lipind două cuvinte.'] },
        check: { correct: 'Recitesc: aflu cine, ce face și ce udă; verific spațiile, A mare și punctul.', wrong: ['Verific numai că toate cartonașele sunt verzi.', 'Lipsa acțiunii din „Ana florile.” nu afectează mesajul cerut.'] }
      },
      {
        context: 'Mesajul este despre mai mulți copii care desenează un pod. Trebuie să înceapă cu „Copiii” și să fie un anunț. Hârtia este galbenă. Pe birou este o gumă.',
        question: 'Cum scrii corect anunțul despre copii?',
        facts: [{ text: 'Mai mulți copii desenează un pod.', relevant: true }, { text: 'Anunțul trebuie să înceapă cu „Copiii”.', relevant: true }, { text: 'Hârtia este galbenă.', relevant: false }, { text: 'Pe birou este o gumă.', relevant: false }],
        plan: ['Pornesc cu „Copiii”, fiindcă mesajul este despre mai mulți copii.', 'Aleg forma potrivită pentru ei: „desenează”, apoi adaug „un pod”.', 'Unesc și punctuez anunțul: „Copiii desenează un pod.”'],
        error: { index: 1, wrong: 'Aleg „desenezi” pentru „Copiii”: „Copiii desenezi un pod”.', alternatives: ['Aleg „desenez” pentru „Copiii”: „Copiii desenez un pod”.', 'Omit acțiunea și las doar „Copiii un pod”.'] },
        check: { correct: 'Înlocuiesc în rostire „Copiii” cu „Ei”: „Ei desenează un pod.” se potrivește.', wrong: ['„Eu desenez” justifică folosirea lui „desenez” după „Copiii”.', 'Verific doar numărul literelor, nu potrivirea cuvintelor.'] }
      },
      {
        context: 'Trebuie să anunți că două fete citesc o hartă. Propoziția începe cu „Fetele”, urmat de acțiune, apoi de obiect. Harta este pe o masă albă. Lângă masă este o plantă.',
        question: 'Ce propoziție respectă sensul, ordinea și acordul?',
        facts: [{ text: 'Două fete citesc o hartă.', relevant: true }, { text: 'Ordinea cerută este „Fetele”, acțiunea, apoi obiectul.', relevant: true }, { text: 'Masa este albă.', relevant: false }, { text: 'Lângă masă este o plantă.', relevant: false }],
        plan: ['Identific persoanele și încep cu „Fetele”.', 'Pentru ele aleg „citesc” și adaug obiectul „o hartă”.', 'Scriu enunțul complet, cu spații și punct: „Fetele citesc o hartă.”'],
        error: { index: 1, wrong: 'După „Fetele” aleg „citește o hartă”.', alternatives: ['După „Fetele” aleg „citești o hartă”.', 'După „Fetele” aleg „citim o hartă”.'] },
        check: { correct: 'Rostesc „Ele citesc o hartă”, apoi verific F mare, spațiile și punctul în propoziția cu „Fetele”.', wrong: ['„Ea citește” dovedește acordul dintre „Fetele” și „citește”.', 'Dacă propoziția are punct, orice formă a acțiunii este corectă.'] }
      }
    ]
  },
  'lim-4': {
    titles: { evidence: 'Vânătorul finalurilor care rimează', repair: 'Repară perechea de rimă', plan: 'Ascultăm sfârșitul cuvintelor' },
    cases: [
      {
        context: 'Lia caută pentru „casă” o rimă dintre „masă” și „carte”. Compară sunetele finale, nu începuturile. Cuvintele sunt pe foi verzi. Lia are un pix.',
        question: 'Care dintre cele două cuvinte rimează cu „casă”?',
        facts: [{ text: 'Cuvântul de pornire este „casă”.', relevant: true }, { text: 'Alegerea este între „masă” și „carte”, după sunetele finale.', relevant: true }, { text: 'Foile sunt verzi.', relevant: false }, { text: 'Lia are un pix.', relevant: false }],
        plan: ['Rostesc „casă” și ascult finalul apăsat „asă”.', 'Compar cu finalurile din „masă” și „carte”: numai „masă” are „asă”.', 'Aleg perechea „casă–masă”, care rimează.'],
        error: { index: 2, wrong: 'Aleg „casă–carte” doar fiindcă ambele încep cu c.', alternatives: ['Declar că „casă–masă” nu rimează fiindcă primele litere diferă.', 'Aleg ambele cuvinte, spunând că și „carte” are finalul „asă”.'] },
        check: { correct: 'Rostesc c-asă, m-asă și aud același final, de la vocala accentuată.', wrong: ['Compar numai prima literă a cuvintelor.', 'Numărul foilor dovedește care pereche rimează.'] }
      },
      {
        context: 'Dan caută o rimă pentru „floare”, alegând între „soare” și „frunză”. Ascultă finalul de la vocala accentuată. Caietul are spirală. Dan stă lângă geam.',
        question: 'Ce pereche alegi după sunete?',
        facts: [{ text: 'Cuvântul căutat pentru rimă este „floare”.', relevant: true }, { text: 'Variantele sunt „soare” și „frunză”, comparate după finalul accentuat.', relevant: true }, { text: 'Caietul are spirală.', relevant: false }, { text: 'Dan stă lângă geam.', relevant: false }],
        plan: ['Ascult în „floare” finalul „oare”.', 'Compar acest final cu „soare” și „frunză”: îl regăsesc în „soare”.', 'Aleg rima „floare–soare”.'],
        error: { index: 1, wrong: 'Spun că „frunză” are același final „oare” ca „floare”.', alternatives: ['Spun că „soare” se termină în „unză”.', 'Spun că nici „soare”, nici „frunză” nu au finalul „oare”.'] },
        check: { correct: 'Rostesc fl-oare și s-oare; aud același final „oare”.', wrong: ['„Floare” și „frunză” rimează fiindcă ambele numesc părți de plante.', 'Verific numai că ambele cuvinte încep cu f.'] }
      },
      {
        context: 'Nora caută pentru „călător” o rimă dintre „zburător” și „călimară”. Compară de la ultima vocală accentuată până la final. Tabla este neagră. Nora ține o cretă.',
        question: 'Care cuvânt are finalul potrivit pentru rimă?',
        facts: [{ text: 'Cuvântul de pornire este „călător”.', relevant: true }, { text: 'Variantele sunt „zburător” și „călimară”, comparate după finalul accentuat.', relevant: true }, { text: 'Tabla este neagră.', relevant: false }, { text: 'Nora ține o cretă.', relevant: false }],
        plan: ['Rostesc „călător” și izolez finalul accentuat „or”.', 'Caut același final în variante: „zburător” îl are, „călimară” nu.', 'Aleg „călător–zburător” ca pereche de rimă.'],
        error: { index: 0, wrong: 'Izolez începutul „că” și îl numesc finalul lui „călător”.', alternatives: ['Spun că „călător” se termină în „ară”.', 'Spun că ultima vocală accentuată din „călător” este ă.'] },
        check: { correct: 'Rostesc călăt-or, zburăt-or: de la o accentuat până la sfârșit aud „or” în ambele.', wrong: ['„Călimară” rimează cu „călător” numai pentru că începe cu „că”.', 'Lungimea cuvintelor este suficientă pentru a dovedi rima.'] }
      }
    ]
  },
  'lim-5': {
    titles: { evidence: 'Indiciile unei povești legate', repair: 'Repară firul întâmplării', plan: 'Început, întâmplare, încheiere' },
    cases: [
      {
        context: 'În parc, Ina scapă o minge sub bancă. O scoate cu ajutorul bunicului, apoi continuă jocul. Banca este verde. Ina are o șapcă.',
        question: 'Cum povestești în ordine întâmplarea cu mingea?',
        facts: [{ text: 'În parc, Ina scapă mingea sub bancă.', relevant: true }, { text: 'Bunicul o ajută să o scoată, apoi Ina continuă jocul.', relevant: true }, { text: 'Banca este verde.', relevant: false }, { text: 'Ina are o șapcă.', relevant: false }],
        plan: ['Prezint începutul: Ina se joacă în parc.', 'Continui cu problema: mingea ajunge sub bancă.', 'Închei prin rezolvare: bunicul o ajută să scoată mingea și jocul continuă.'],
        error: { index: 2, wrong: 'Închei spunând că mingea rămâne sub bancă și nu este scoasă.', alternatives: ['Închei spunând că Ina pleacă fără minge, deși și-a reluat jocul.', 'Închei spunând că bunicul ascunde mingea, nu o scoate.'] },
        check: { correct: 'Recitesc și regăsesc locul, mingea ajunsă sub bancă și ajutorul care permite reluarea jocului.', wrong: ['Verific numai culoarea băncii, fără ordinea faptelor.', 'O încheiere care contrazice recuperarea mingii păstrează povestea dată.'] }
      },
      {
        context: 'La bibliotecă, Luca găsește o carte cu o filă desprinsă. Anunță bibliotecara, care repară fila, apoi Luca citește cartea. Cartea are copertă albastră. Pe raft este un glob.',
        question: 'Cum legi problema cărții de rezolvarea ei în poveste?',
        facts: [{ text: 'La bibliotecă, Luca găsește o carte cu o filă desprinsă.', relevant: true }, { text: 'Luca anunță bibliotecara; ea repară fila, apoi el citește.', relevant: true }, { text: 'Coperta este albastră.', relevant: false }, { text: 'Pe raft este un glob.', relevant: false }],
        plan: ['Prezint locul și problema: Luca găsește la bibliotecă o filă desprinsă.', 'Pornind de la problemă, spun reacția: Luca anunță bibliotecara.', 'Închei cu urmarea: bibliotecara repară fila, iar Luca poate citi cartea.'],
        error: { index: 1, wrong: 'Spun că Luca ascunde fila și nu anunță bibliotecara.', alternatives: ['Spun că Luca rupe intenționat cartea, deși doar găsește fila desprinsă.', 'Spun că Luca pleacă înainte să spună cuiva, contrar întâmplării.'] },
        check: { correct: 'Urmăresc legătura: fila desprinsă duce la cererea de ajutor, iar repararea permite lectura.', wrong: ['Citesc numai finalul și ignor dacă problema a fost prezentată.', 'O carte albastră dovedește singură că bibliotecara a reparat fila.'] }
      },
      {
        context: 'În curtea școlii, Sara vrea să ude răsadurile, dar stropitoarea este goală. Împreună cu un adult o umple la robinet, apoi udă răsadurile. Stropitoarea este galbenă. Pe zid este un ceas.',
        question: 'Cum construiești o poveste care explică de ce este umplută stropitoarea?',
        facts: [{ text: 'În curte, Sara vrea să ude răsadurile, dar stropitoarea este goală.', relevant: true }, { text: 'Sara și un adult umplu stropitoarea la robinet, apoi udă răsadurile.', relevant: true }, { text: 'Stropitoarea este galbenă.', relevant: false }, { text: 'Pe zid este un ceas.', relevant: false }],
        plan: ['Prezint dorința Sarei în curte: vrea să ude răsadurile.', 'Arăt obstacolul pentru această dorință: stropitoarea este goală.', 'Leg rezolvarea de obstacol: o umple cu un adult, apoi poate uda răsadurile.'],
        error: { index: 2, wrong: 'Spun că Sara udă răsadurile cu stropitoarea goală, fără să o umple.', alternatives: ['Spun că adultul golește stropitoarea deja plină, contrar textului.', 'Spun că răsadurile nu sunt udate deloc, deși povestea spune că sunt.'] },
        check: { correct: 'La recitire, umplerea rezolvă lipsa apei și are loc înainte de udare.', wrong: ['Dacă menționez ceasul, nu mai trebuie să explic lipsa apei.', 'Pot muta umplerea după udarea cu stropitoarea goală fără să schimb logica.'] }
      }
    ]
  },
  'lim-6': {
    titles: { evidence: 'Indiciile literelor cu diacritice', repair: 'Repară litera din cuvânt', plan: 'Poziție, model, scriere corectă' },
    cases: [
      {
        context: 'Pe etichetă trebuie completat „m_r”. Modelul pentru fruct este „măr”, cu ă între m și r. Eticheta este albă. Creionul este roșu.',
        question: 'Ce literă completează corect numele fructului?',
        facts: [{ text: 'Eticheta incompletă este „m_r”.', relevant: true }, { text: 'Modelul numelui fructului este „măr”, cu ă.', relevant: true }, { text: 'Eticheta este albă.', relevant: false }, { text: 'Creionul este roșu.', relevant: false }],
        plan: ['Găsesc locul liber dintre m și r în „m_r”.', 'Compar acel loc cu modelul „măr” și aleg ă.', 'Completez și recitesc numele fructului: „măr”.'],
        error: { index: 1, wrong: 'Aleg â pentru locul lui ă din model.', alternatives: ['Aleg î pentru locul lui ă din model.', 'Aleg a fără diacritică pentru locul lui ă din model.'] },
        check: { correct: 'Compar literă cu literă cu modelul: m, ă, r; litera din mijloc este aceeași.', wrong: ['Orice literă cu diacritică se potrivește în „măr”.', 'Culoarea creionului arată dacă trebuie ă sau â.'] }
      },
      {
        context: 'Pentru verbul „a începe”, modelul este „începe”, iar cartonașul arată „_ncepe”. În acest cuvânt se scrie î la început. Cartonașul este verde. Pe masă este o cană.',
        question: 'Cu ce literă începe forma cerută?',
        facts: [{ text: 'Modelul cerut este „începe”, iar forma incompletă este „_ncepe”.', relevant: true }, { text: 'În acest cuvânt, la început se scrie î.', relevant: true }, { text: 'Cartonașul este verde.', relevant: false }, { text: 'Pe masă este o cană.', relevant: false }],
        plan: ['Observ că locul liber din „_ncepe” este chiar la început.', 'Pentru această poziție și model aleg litera î.', 'Scriu cuvântul întreg: „începe”.'],
        error: { index: 1, wrong: 'Aleg â la început și pregătesc forma „âncepe”.', alternatives: ['Aleg ă la început și pregătesc forma „ăncepe”.', 'Aleg i fără diacritică și pregătesc forma „incepe”.'] },
        check: { correct: 'Compar cu „începe”: prima literă este î, cu semnul ei, nu â, ă sau i.', wrong: ['Pentru că â și î notează același sunet, le pot schimba în orice loc.', 'Omit semnul de pe î și spun că scrierea a rămas identică.'] }
      },
      {
        context: 'Un cartonaș cere opusul lui „înțeles”, folosind „ne-”. Modelul complet este „neînțeles”: păstrează î din „înțeles”. Cartonașul are o stea. Caietul este deschis.',
        question: 'Cum scrii cuvântul format cu „ne-”, fără să schimbi î în â?',
        facts: [{ text: 'Se adaugă „ne-” înaintea cuvântului „înțeles”.', relevant: true }, { text: 'Modelul este „neînțeles” și păstrează î din „înțeles”.', relevant: true }, { text: 'Cartonașul are o stea.', relevant: false }, { text: 'Caietul este deschis.', relevant: false }],
        plan: ['Identific în cuvântul de pornire prima literă: î din „înțeles”.', 'Adaug „ne-” înainte, păstrând litera î a cuvântului de pornire.', 'Scriu legat și recitesc: „neînțeles”.'],
        error: { index: 1, wrong: 'După „ne-” schimb î în â și pregătesc „neânțeles”.', alternatives: ['După „ne-” elimin î și pregătesc „nențeles”.', 'După „ne-” schimb î în ă și pregătesc „neănțeles”.'] },
        check: { correct: 'Acopăr „ne” în „neînțeles” și regăsesc exact „înțeles”, cu î păstrat.', wrong: ['Orice sunet din interiorul oricărui cuvânt se scrie obligatoriu cu â.', 'Steaua cartonașului decide ce diacritică trebuie scrisă.'] }
      }
    ]
  },
  'lim-7': {
    titles: { evidence: 'Citește indiciile de pe etichete', repair: 'Eticheta rătăcită', plan: 'Cuvântul întreg arată locul' },
    cases: [
      {
        context: 'Pe o masă sunt o cană cu apă și un măr. Eticheta „APĂ” trebuie pusă lângă ceea ce denumește. Cana este albastră. Masa este albă.',
        question: 'Unde așezi eticheta „APĂ”?',
        facts: [{ text: 'Eticheta de citit este „APĂ”.', relevant: true }, { text: 'Pe masă sunt o cană cu apă și un măr.', relevant: true }, { text: 'Cana este albastră.', relevant: false }, { text: 'Masa este albă.', relevant: false }],
        plan: ['Citesc toate literele etichetei și reunesc „APĂ”.', 'Folosesc sensul cuvântului: numește lichidul din cană.', 'Așez eticheta lângă cana cu apă, nu lângă măr.'],
        error: { index: 2, wrong: 'Pun eticheta „APĂ” lângă măr.', alternatives: ['Nu aleg cana, spunând că „APĂ” numește masa.', 'Pun eticheta între obiecte și spun că numește și mărul, și apa.'] },
        check: { correct: 'Recitesc „APĂ” și arăt apa din cană: cuvântul și conținutul se potrivesc.', wrong: ['Culoarea albastră este singura dovadă, fără a citi eticheta.', 'Orice obiect de pe masă poate fi numit „APĂ”.'] }
      },
      {
        context: 'Două indicatoare spun „PARC” cu săgeată spre stânga și „PIAȚĂ” cu săgeată spre dreapta. Dan vrea la parc. Indicatoarele sunt verzi. Dan are o șapcă.',
        question: 'Ce indicator citești pentru a alege direcția către parc?',
        facts: [{ text: 'Dan vrea să ajungă la parc.', relevant: true }, { text: '„PARC” arată spre stânga, iar „PIAȚĂ” spre dreapta.', relevant: true }, { text: 'Indicatoarele sunt verzi.', relevant: false }, { text: 'Dan are o șapcă.', relevant: false }],
        plan: ['Rețin destinația cerută: parc.', 'Citesc întregul cuvânt și aleg „PARC”, nu „PIAȚĂ”.', 'Urmăresc săgeata indicatorului ales: direcția este spre stânga.'],
        error: { index: 1, wrong: 'Aleg „PIAȚĂ” doar fiindcă începe tot cu P.', alternatives: ['Declar că „PARC” și „PIAȚĂ” sunt același cuvânt.', 'Ignor ambele cuvinte și aleg după culoarea verde, ca și cum ar numi destinația.'] },
        check: { correct: 'Recitesc P-A-R-C pe indicatorul spre stânga și îl compar cu destinația parc.', wrong: ['Prima literă P este suficientă pentru a deosebi cele două indicatoare.', 'Șapca lui Dan arată direcția corectă.'] }
      },
      {
        context: 'Două sertare conțin separat creioane și cărți. Eticheta „CĂRȚI” este pe sertarul creioanelor, iar „CREIOANE” pe cel al cărților. Mânerele sunt rotunde. Dulapul este alb. Verifică întâi „CĂRȚI”, apoi „CREIOANE”, apoi schimbă etichetele.',
        question: 'Cum repari ambele etichete schimbate?',
        facts: [{ text: '„CĂRȚI” este pe sertarul care conține creioane.', relevant: true }, { text: '„CREIOANE” este pe sertarul care conține cărți.', relevant: true }, { text: 'Mânerele sunt rotunde.', relevant: false }, { text: 'Dulapul este alb.', relevant: false }],
        plan: ['Citesc „CĂRȚI” și observ că nu numește creioanele din sertarul ei.', 'Citesc apoi „CREIOANE” și observ nepotrivirea cu cărțile din celălalt sertar.', 'Schimb etichetele: „CĂRȚI” la cărți și „CREIOANE” la creioane.'],
        error: { index: 2, wrong: 'Las ambele etichete unde sunt, deși numesc conținutul celuilalt sertar.', alternatives: ['Pun ambele etichete pe sertarul cărților și las creioanele fără etichetă.', 'Pun ambele etichete pe sertarul creioanelor și las cărțile fără etichetă.'] },
        check: { correct: 'Deschid pe rând sertarele și recitesc etichetele: fiecare numește exact conținutul său.', wrong: ['Mânerele rotunde garantează potrivirea cuvintelor.', 'Verific doar că etichetele încep amândouă cu C, fără să le citesc complet.'] }
      }
    ]
  },
  'lim-8': {
    titles: { evidence: 'Răspunsul sprijinit de text', repair: 'Repară concluzia inventată', plan: 'Citesc, leg indiciile, răspund' },
    cases: [
      {
        context: 'Textul spune: „Plouă în curte. Lia își deschide umbrela ca să nu se ude. Poartă cizme roșii. Pe bancă este o frunză.”',
        question: 'De ce își deschide Lia umbrela?',
        facts: [{ text: 'Plouă în curte.', relevant: true }, { text: 'Lia deschide umbrela ca să nu se ude.', relevant: true }, { text: 'Lia poartă cizme roșii.', relevant: false }, { text: 'Pe bancă este o frunză.', relevant: false }],
        plan: ['Caut în text ce se întâmplă cu vremea: plouă.', 'Leg ploaia de scopul scris: Lia nu vrea să se ude.', 'Răspund: Lia deschide umbrela ca să se ferească de ploaie.'],
        error: { index: 2, wrong: 'Răspund că Lia deschide umbrela fiindcă ninge, deși textul spune că plouă.', alternatives: ['Răspund că Lia deschide umbrela ca să ude cizmele, contrar scopului scris.', 'Răspund că o folosește ca să adune frunza, deși textul dă alt scop.'] },
        check: { correct: 'Arăt în text „Plouă” și „ca să nu se ude”: ambele sprijină răspunsul.', wrong: ['Culoarea cizmelor dovedește singură motivul umbrelei.', 'Inventez ninsoarea și o folosesc drept dovadă din text.'] }
      },
      {
        context: 'Textul spune: „Toma pune un cub de gheață într-un bol. După o vreme, în bol este apă în locul cubului. Bolul este verde. Pe masă este un șervet.”',
        question: 'Ce schimbare a cubului este susținută de text?',
        facts: [{ text: 'La început, Toma pune un cub de gheață în bol.', relevant: true }, { text: 'După o vreme, în locul cubului este apă.', relevant: true }, { text: 'Bolul este verde.', relevant: false }, { text: 'Pe masă este un șervet.', relevant: false }],
        plan: ['Identific starea de la început: în bol este un cub de gheață.', 'Compar cu starea de după: apa este în locul cubului.', 'Conchid din această schimbare că gheața s-a topit.'],
        error: { index: 2, wrong: 'Conchid că apa a înghețat și a devenit cub, inversând textul.', alternatives: ['Conchid că în bol nu mai este nimic, deși textul spune că este apă.', 'Conchid că în locul cubului a apărut un șervet, contrar textului.'] },
        check: { correct: 'Recitesc cele două momente: întâi gheață, apoi apă în locul ei, ceea ce susține topirea.', wrong: ['Culoarea verde este dovada că apa a înghețat.', 'Folosesc un eveniment nescris ca și când l-aș fi citit în text.'] }
      },
      {
        context: 'Textul spune: „Nora merge la bibliotecă. Împrumută o carte despre păsări. Nu este precizată culoarea copertei. Nora are o eșarfă galbenă. În hol se află un ghiveci.”',
        question: 'Ce aflăm despre tema cărții și putem afla culoarea copertei?',
        facts: [{ text: 'Cartea împrumutată este despre păsări.', relevant: true }, { text: 'Textul nu precizează culoarea copertei.', relevant: true }, { text: 'Eșarfa Norei este galbenă.', relevant: false }, { text: 'În hol se află un ghiveci.', relevant: false }],
        plan: ['Identific tema cărții din text: este despre păsări.', 'Caut apoi o culoare a copertei acelei cărți și observ că nu este precizată.', 'Răspund: cartea este despre păsări, dar culoarea copertei nu poate fi aflată din text.'],
        error: { index: 2, wrong: 'Răspund „galbenă”, mutând culoarea eșarfei pe coperta cărții.', alternatives: ['Răspund „verde”, inventând o culoare care nu apare pentru copertă.', 'Răspund „albastră”, fiindcă toate cărțile despre păsări ar avea această copertă.'] },
        check: { correct: 'Recitesc fiecare mențiune a cărții: aflu tema, dar nicio culoare a copertei.', wrong: ['Folosesc culoarea altui obiect drept dovadă pentru copertă.', 'Tema despre păsări fixează automat culoarea copertei.'] }
      }
    ]
  },
  'lim-9': {
    titles: { evidence: 'Intenția ascunsă în enunț', repair: 'Repară semnul de la final', plan: 'De la mesaj la intonație' },
    cases: [
      {
        context: 'Mara știe că trenul sosește și anunță calm: „Trenul sosește”. Nu întreabă și nu exclamă. Pe peron este un ceas. Geanta ei este verde.',
        question: 'Ce semn final se potrivește anunțului neutru?',
        facts: [{ text: 'Mara anunță calm „Trenul sosește”.', relevant: true }, { text: 'Ea nu întreabă și nu exclamă.', relevant: true }, { text: 'Pe peron este un ceas.', relevant: false }, { text: 'Geanta Marei este verde.', relevant: false }],
        plan: ['Identific intenția: Mara transmite o informație, nu cere un răspuns.', 'Pentru acest anunț neutru aleg punctul.', 'Scriu și recitesc calm: „Trenul sosește.”'],
        error: { index: 1, wrong: 'Aleg semnul întrebării pentru anunțul care nu cere răspuns.', alternatives: ['Aleg semnul exclamării, deși mesajul este precizat ca neutru, fără exclamare.', 'Aleg virgula ca unic semn de încheiere a enunțului.'] },
        check: { correct: 'Recitirea comunică o informație sigură și se încheie cu punct, potrivit intenției date.', wrong: ['Lungimea enunțului decide singură semnul final.', 'Ceasul de pe peron cere obligatoriu semnul întrebării.'] }
      },
      {
        context: 'Dan nu știe locul caietului și cere o informație: „Unde este caietul”. Caietul are copertă roșie. Pe masă este o gumă.',
        question: 'Cu ce semn închei întrebarea lui Dan?',
        facts: [{ text: 'Dan nu știe unde este caietul și cere informația.', relevant: true }, { text: 'Enunțul lui este „Unde este caietul”.', relevant: true }, { text: 'Coperta caietului este roșie.', relevant: false }, { text: 'Pe masă este o gumă.', relevant: false }],
        plan: ['Observ că Dan cere să afle un loc, nu îl anunță.', 'Pentru intenția de întrebare aleg semnul întrebării.', 'Scriu și rostesc întrebarea: „Unde este caietul?”'],
        error: { index: 2, wrong: 'Scriu „Unde este caietul.”, tratând cererea de informații ca anunț.', alternatives: ['Scriu „Unde este caietul,” și las virgula drept semn final.', 'Scriu „Unde este caietul” fără niciun semn final.'] },
        check: { correct: 'Un ascultător poate răspunde cu locul caietului; semnul ? arată cererea de informații.', wrong: ['Culoarea copertei justifică punctul în locul semnului întrebării.', 'Dacă enunțul este scurt, trebuie să aibă punct, indiferent de intenție.'] }
      },
      {
        context: 'Lia vede o baltă în fața lui Radu și îl avertizează hotărât, cu voce de alarmă: „Ai grijă”. Nu cere o informație și nu face un anunț neutru. Balta reflectă cerul. Radu are o șapcă albastră.',
        question: 'Cum marchezi în scris avertismentul rostit cu alarmă?',
        facts: [{ text: 'Lia îl avertizează cu voce de alarmă: „Ai grijă”.', relevant: true }, { text: 'Mesajul nu este o întrebare și nici un anunț neutru.', relevant: true }, { text: 'Balta reflectă cerul.', relevant: false }, { text: 'Șapca lui Radu este albastră.', relevant: false }],
        plan: ['Identific intenția și vocea: Lia avertizează cu alarmă.', 'Pentru avertismentul astfel rostit aleg semnul exclamării.', 'Scriu „Ai grijă!” și recitesc cu voce de avertizare.'],
        error: { index: 1, wrong: 'Aleg semnul întrebării ca și cum Lia ar cere o informație.', alternatives: ['Aleg punctul pentru un anunț neutru, ignorând vocea de alarmă cerută.', 'Aleg virgula ca unic semn final al avertismentului.'] },
        check: { correct: 'Semnul ! și vocea de avertizare transmit aceeași alarmă descrisă în context.', wrong: ['Orice propoziție cu două cuvinte trebuie încheiată cu !.', 'Verific doar culoarea șepcii pentru a hotărî intonația.'] }
      }
    ]
  },
  'lim-10': {
    titles: { evidence: 'Indiciile redactorului atent', repair: 'Clinica propozițiilor', plan: 'Recitesc, corectez, verific' },
    cases: [
      {
        context: 'În caiet apare anunțul „mara cântă.”, despre fata cu numele Mara. Trebuie păstrate persoana și acțiunea. Caietul este albastru. Pe birou este un penar.',
        question: 'Ce corectezi pentru ca numele și începutul propoziției să fie scrise corect?',
        facts: [{ text: 'Anunțul scris este „mara cântă.”.', relevant: true }, { text: 'Fata se numește Mara, iar persoana și acțiunea trebuie păstrate.', relevant: true }, { text: 'Caietul este albastru.', relevant: false }, { text: 'Pe birou este un penar.', relevant: false }],
        plan: ['Recitesc anunțul și găsesc numele „mara” scris cu literă mică.', 'Corectez numele de la început în „Mara”, cu M mare.', 'Recitesc forma completă și păstrez acțiunea și punctul: „Mara cântă.”'],
        error: { index: 1, wrong: 'Las „mara” cu m mic, deși este nume și începe propoziția.', alternatives: ['Schimb numele în „Dara”, deși fata se numește Mara.', 'Șterg numele și las doar „cântă.”, fără persoana cerută.'] },
        check: { correct: 'Compar cu cerința: numele este Mara, acțiunea rămâne „cântă”, iar începutul are literă mare.', wrong: ['Dacă există punct, numele poate rămâne cu literă mică.', 'Schimb persoana și declar că am păstrat mesajul.'] }
      },
      {
        context: 'Textul „Fetele aleargă în curte” este un anunț neutru complet, dar fără semn final. Trebuie păstrate toate cuvintele. Foaia este crem. Creionul este verde.',
        question: 'Cum închei corect anunțul fără să îi schimbi sensul?',
        facts: [{ text: 'Textul este „Fetele aleargă în curte”, fără semn final.', relevant: true }, { text: 'Este un anunț neutru ale cărui cuvinte trebuie păstrate.', relevant: true }, { text: 'Foaia este crem.', relevant: false }, { text: 'Creionul este verde.', relevant: false }],
        plan: ['Recitesc anunțul și observ lipsa semnului final.', 'Pentru anunțul neutru identificat adaug punctul după „curte”.', 'Recitesc și compar cuvintele păstrate: „Fetele aleargă în curte.”'],
        error: { index: 1, wrong: 'Adaug semnul întrebării și transform anunțul în întrebare.', alternatives: ['Adaug o virgulă drept unic semn final.', 'Pun punct după „în” și las „curte” în afara propoziției.'] },
        check: { correct: 'Cuvintele sunt neschimbate, iar punctul încheie anunțul după ultimul cuvânt, „curte”.', wrong: ['Orice semn pus oriunde păstrează același mesaj.', 'Verific doar primul cuvânt, fără să privesc finalul reparat.'] }
      },
      {
        context: 'În caiet scrie „Băieții citește o carte.”. Anunțul este despre mai mulți băieți și trebuie păstrată lectura aceleiași cărți. Coperta caietului este mov. Pe masă este o riglă.',
        question: 'Ce formă înlocuiește „citește” pentru a potrivi acțiunea cu „Băieții”?',
        facts: [{ text: 'Enunțul greșit este „Băieții citește o carte.”.', relevant: true }, { text: 'Acțiunea este a mai multor băieți, care citesc aceeași carte.', relevant: true }, { text: 'Coperta caietului este mov.', relevant: false }, { text: 'Pe masă este o riglă.', relevant: false }],
        plan: ['Identific cine citește: „Băieții” înseamnă mai mulți, adică „ei”.', 'Pentru „ei” înlocuiesc forma „citește” cu „citesc”.', 'Recitesc enunțul reparat: „Băieții citesc o carte.”'],
        error: { index: 1, wrong: 'Păstrez „citește”, deși acțiunea este a mai multor băieți.', alternatives: ['Înlocuiesc cu „citești”, forma pentru „tu”.', 'Înlocuiesc cu „citim”, forma pentru „noi”.'] },
        check: { correct: 'Rostesc „Ei citesc o carte”, apoi regăsesc aceeași potrivire în „Băieții citesc o carte.”', wrong: ['„El citește” dovedește că „Băieții citește” este corect.', 'Prezența punctului compensează orice nepotrivire dintre cuvinte.'] }
      }
    ]
  },
  'lim-11': {
    titles: { evidence: 'Indiciile cuvintelor potrivite', repair: 'Repară perechea de cuvinte', plan: 'Caut, înlocuiesc, verific' },
    cases: [
      {
        context: 'Mara scrie „Apa din pahar este rece.” și caută cuvântul cu sens opus lui „rece”. Paharul este albastru. Pe masă este și un șervețel.',
        question: 'Ce cuvânt are sens opus lui „rece” în propoziția Marei?',
        facts: [{ text: 'Propoziția este „Apa din pahar este rece.”.', relevant: true }, { text: 'Mara caută opusul lui „rece”.', relevant: true }, { text: 'Paharul este albastru.', relevant: false }, { text: 'Pe masă este un șervețel.', relevant: false }],
        plan: ['Citesc propoziția și găsesc cuvântul „rece”.', 'Caut cuvântul cu sens opus: „caldă”.', 'Citesc „Apa din pahar este caldă.” și verific că sensul a devenit opus.'],
        error: { index: 1, wrong: 'Aleg „înghețată”, care are sens asemănător cu „rece”.', alternatives: ['Aleg „albastră”, care spune culoarea paharului.', 'Aleg „pahar”, un cuvânt care este deja în propoziție.'] },
        check: { correct: 'Citesc ambele propoziții: „rece” și „caldă” arată temperaturi opuse.', wrong: ['Orice cuvânt diferit de „rece” este opusul lui.', 'Verific doar dacă noul cuvânt este mai lung.'] }
      },
      {
        context: 'Dan a scris „Cățelul aleargă repede.” Vrea alt cuvânt cu același sens în locul lui „repede”. Caietul lui are linii. Creionul este galben.',
        question: 'Ce cuvânt păstrează sensul lui „repede”?',
        facts: [{ text: 'Propoziția este „Cățelul aleargă repede.”.', relevant: true }, { text: 'Dan vrea un cuvânt cu același sens ca „repede”.', relevant: true }, { text: 'Caietul are linii.', relevant: false }, { text: 'Creionul este galben.', relevant: false }],
        plan: ['Găsesc cuvântul „repede” în propoziție.', 'Îl înlocuiesc cu „rapid”, care are sens asemănător.', 'Citesc „Cățelul aleargă rapid.” și verific că sensul a rămas același.'],
        error: { index: 1, wrong: 'Îl înlocuiesc cu „încet”, care are sens opus.', alternatives: ['Îl înlocuiesc cu „cățel”, care spune cine aleargă.', 'Șterg cuvântul și las „Cățelul aleargă.”.'] },
        check: { correct: 'Compar: „aleargă repede” și „aleargă rapid” spun același lucru.', wrong: ['Dacă propoziția are tot punct, sensul sigur a rămas.', 'Un cuvânt cu aceeași primă literă are sigur același sens.'] }
      },
      {
        context: 'Ina are perechea „ușor – greu”. Vorbește despre un rucsac pe care îl cântărește în mână. Rucsacul este roșu. Afară este soare.',
        question: 'Ce înseamnă „ușor” în această situație și care este opusul lui?',
        facts: [{ text: 'Perechea propusă este „ușor – greu”.', relevant: true }, { text: 'Ina vorbește despre un rucsac cântărit în mână.', relevant: true }, { text: 'Rucsacul este roșu.', relevant: false }, { text: 'Afară este soare.', relevant: false }],
        plan: ['Citesc despre ce este vorba: greutatea unui rucsac.', 'Aleg sensul potrivit: „ușor” înseamnă că rucsacul nu cântărește mult.', 'Verific opusul într-o propoziție: „Rucsacul este greu.”'],
        error: { index: 1, wrong: 'Aleg sensul „ușor = simplu”, deși vorbim despre greutate.', alternatives: ['Spun că „ușor” înseamnă „roșu”, culoarea rucsacului.', 'Spun că „ușor” nu are niciun opus.'] },
        check: { correct: 'Pun ambele cuvinte în aceeași propoziție despre rucsac și compar greutatea.', wrong: ['Un cuvânt are un singur sens, oriunde ar apărea.', 'Verific doar dacă perechea rimează.'] }
      }
    ]
  },
  'lim-12': {
    titles: { evidence: 'Indiciile pentru unul și mai mulți', repair: 'Repară forma pentru mai mulți', plan: 'Număr, schimb, verific' },
    cases: [
      {
        context: 'Pe masă sunt două mere. Toma scrie „două măr”. Merele sunt roșii. Lângă ele stă un șervețel.',
        question: 'Ce formă trebuie să scrie Toma după „două”?',
        facts: [{ text: 'Pe masă sunt două mere.', relevant: true }, { text: 'Toma a scris „două măr”.', relevant: true }, { text: 'Merele sunt roșii.', relevant: false }, { text: 'Lângă mere stă un șervețel.', relevant: false }],
        plan: ['Număr merele: sunt două, deci mai multe.', 'Schimb „măr” în forma pentru mai multe: „mere”.', 'Citesc „două mere” și verific că se potrivește cu numărul.'],
        error: { index: 1, wrong: 'Las „măr”, forma pentru un singur măr.', alternatives: ['Scriu „mări”, care vine de la „mare”.', 'Scriu „măruri”, o formă care nu există.'] },
        check: { correct: 'Spun „un măr, două mere” și compar cu ce am scris.', wrong: ['Dacă merele sunt roșii, forma nu contează.', 'Verific doar prima literă a cuvântului.'] }
      },
      {
        context: 'În penar sunt trei creioane. Ana spune: „Am trei creion.” Penarul este verde. Ana stă în bancă.',
        question: 'Cum spune corect Ana câte creioane are?',
        facts: [{ text: 'În penar sunt trei creioane.', relevant: true }, { text: 'Ana a spus „Am trei creion.”.', relevant: true }, { text: 'Penarul este verde.', relevant: false }, { text: 'Ana stă în bancă.', relevant: false }],
        plan: ['Număr creioanele: sunt trei.', 'Folosesc forma pentru mai multe: „creioane”.', 'Spun „Am trei creioane.” și verific potrivirea cu numărul.'],
        error: { index: 1, wrong: 'Păstrez „creion”, forma pentru unul singur.', alternatives: ['Spun „creioni”, după modelul lui „pomi”.', 'Schimb numărul în „un”, deși sunt trei.'] },
        check: { correct: 'Număr din nou creioanele și spun: un creion, trei creioane.', wrong: ['Orice cuvânt de după un număr rămâne neschimbat.', 'Verific doar culoarea penarului.'] }
      },
      {
        context: 'Pe cer apar multe stele. Matei scrie „Pe cer este multe stea.” Este seară. Matei are o lanternă.',
        question: 'Cum repară Matei enunțul despre mai multe stele?',
        facts: [{ text: 'Pe cer apar mai multe stele.', relevant: true }, { text: 'Matei a scris „Pe cer este multe stea.”.', relevant: true }, { text: 'Este seară.', relevant: false }, { text: 'Matei are o lanternă.', relevant: false }],
        plan: ['Observ că vorbim despre mai multe stele.', 'Schimb „este” în „sunt” și „stea” în „stele”.', 'Citesc „Pe cer sunt multe stele.” și verific ambele potriviri.'],
        error: { index: 1, wrong: 'Schimb doar „stea” în „stele” și las „este”.', alternatives: ['Schimb doar „este” în „sunt” și las „stea”.', 'Scriu „steaua”, forma pentru o singură stea anume.'] },
        check: { correct: 'Verific și cuvântul pentru stele, și cuvântul „sunt”: amândouă arată mai multe.', wrong: ['Este suficient să schimbi un singur cuvânt.', 'Dacă enunțul are punct, este corect.'] }
      }
    ]
  },
  'lim-13': {
    titles: { evidence: 'Indiciile din instrucțiune', repair: 'Repară ordinea pașilor', plan: 'Citesc, ordonez, fac' },
    cases: [
      {
        context: 'Instrucțiunea spune: „Mai întâi spală-te pe mâini. Apoi pune biscuiții în farfurie.” Farfuria este albă. Biscuiții sunt rotunzi.',
        question: 'Ce faci mai întâi, după instrucțiune?',
        facts: [{ text: 'Instrucțiunea începe cu „Mai întâi spală-te pe mâini.”.', relevant: true }, { text: 'Al doilea pas începe cu „Apoi”.', relevant: true }, { text: 'Farfuria este albă.', relevant: false }, { text: 'Biscuiții sunt rotunzi.', relevant: false }],
        plan: ['Citesc toată instrucțiunea.', 'Găsesc pasul cu „Mai întâi”: mă spăl pe mâini.', 'Fac apoi pasul cu „Apoi”: pun biscuiții în farfurie.'],
        error: { index: 1, wrong: 'Încep cu biscuiții, pentru că îi văd primii pe masă.', alternatives: ['Sar peste spălatul pe mâini.', 'Fac pașii în ordinea care îmi place.'] },
        check: { correct: 'Compar ce am făcut cu cuvintele de ordine: „mai întâi”, apoi „apoi”.', wrong: ['Ordinea nu contează dacă la final biscuiții sunt în farfurie.', 'Verific doar culoarea farfuriei.'] }
      },
      {
        context: 'Biletul spune: „Înainte să pleci, închide fereastra.” Ina vrea să plece la joacă. Perdelele sunt galbene. Pe pervaz este o carte.',
        question: 'Ce face Ina mai întâi?',
        facts: [{ text: 'Biletul spune „Înainte să pleci, închide fereastra.”.', relevant: true }, { text: 'Ina vrea să plece la joacă.', relevant: true }, { text: 'Perdelele sunt galbene.', relevant: false }, { text: 'Pe pervaz este o carte.', relevant: false }],
        plan: ['Citesc tot biletul.', 'Înțeleg că „înainte să pleci” cere mai întâi închiderea ferestrei.', 'Închid fereastra, apoi plec la joacă.'],
        error: { index: 1, wrong: 'Plec mai întâi, pentru că „pleci” apare primul în bilet.', alternatives: ['Las fereastra deschisă, pentru că perdelele sunt galbene.', 'Închid ușa în loc de fereastră.'] },
        check: { correct: 'Verific: fereastra este închisă înainte să ies din cameră.', wrong: ['Primul cuvânt din bilet arată mereu primul pas.', 'Dacă am plecat repede, am respectat biletul.'] }
      },
      {
        context: 'Rețeta spune: „Pune iaurtul în bol. După ce adaugi fructele, amestecă.” Bolul este mare. Fructele sunt căpșuni.',
        question: 'În ce ordine faci cei trei pași?',
        facts: [{ text: 'Primul pas este „Pune iaurtul în bol.”.', relevant: true }, { text: '„După ce adaugi fructele, amestecă” arată că fructele vin înainte de amestecat.', relevant: true }, { text: 'Bolul este mare.', relevant: false }, { text: 'Fructele sunt căpșuni.', relevant: false }],
        plan: ['Pun iaurtul în bol.', 'Adaug fructele.', 'Amestec.'],
        error: { index: 1, wrong: 'Amestec înainte să adaug fructele.', alternatives: ['Pun fructele într-un alt bol.', 'Pun fructele în frigider.'] },
        check: { correct: 'Recitesc rețeta: „după ce adaugi fructele” înseamnă că amestecatul vine la final.', wrong: ['Fac pașii în ordinea în care îmi amintesc de ei.', 'Verific doar dacă bolul este mare.'] }
      }
    ]
  },
  'lim-14': {
    titles: { evidence: 'Indiciile din imagine', repair: 'Repară descrierea', plan: 'Privesc, spun, verific' },
    cases: [
      {
        context: 'Imaginea arată un câine maro care aleargă după o minge roșie, pe iarbă. Radu scrie: „Un câine maro aleargă.” Radu are o geacă verde. Este dimineață.',
        question: 'Ce detaliu din imagine poate adăuga Radu în descriere?',
        facts: [{ text: 'În imagine, câinele aleargă după o minge roșie.', relevant: true }, { text: 'Descrierea lui Radu este „Un câine maro aleargă.”.', relevant: true }, { text: 'Radu are o geacă verde.', relevant: false }, { text: 'Este dimineață.', relevant: false }],
        plan: ['Privesc imaginea și găsesc ce lipsește din descriere: mingea.', 'Adaug detaliul: „Un câine maro aleargă după o minge roșie.”', 'Verific că tot ce am scris se vede în imagine.'],
        error: { index: 1, wrong: 'Adaug „Câinele se numește Azor.”, deși numele nu se vede.', alternatives: ['Adaug „Câinele aleargă după o pisică.”, deși în imagine este o minge.', 'Adaug că Radu are o geacă verde.'] },
        check: { correct: 'Compar fiecare cuvânt din descriere cu imaginea: câine maro, aleargă, minge roșie.', wrong: ['O descriere lungă este sigur corectă.', 'Pot adăuga orice, dacă sună frumos.'] }
      },
      {
        context: 'Imaginea arată trei pisici albe care dorm pe o canapea. Ana scrie: „Două pisici dorm pe canapea.” Ana stă la masă. Pe masă este un pahar.',
        question: 'Ce greșeală are descrierea Anei?',
        facts: [{ text: 'În imagine sunt trei pisici.', relevant: true }, { text: 'Ana a scris „Două pisici dorm pe canapea.”.', relevant: true }, { text: 'Ana stă la masă.', relevant: false }, { text: 'Pe masă este un pahar.', relevant: false }],
        plan: ['Număr pisicile din imagine: sunt trei.', 'Corectez numărul: „Trei pisici dorm pe canapea.”', 'Verific restul: pisicile dorm și sunt pe canapea.'],
        error: { index: 1, wrong: 'Las „două”, pentru că sună bine.', alternatives: ['Scriu „Trei câini dorm pe canapea.”.', 'Scriu „Trei pisici se joacă pe canapea.”.'] },
        check: { correct: 'Număr din nou pisicile și citesc descrierea corectată lângă imagine.', wrong: ['Numărul nu contează într-o descriere.', 'Verific doar dacă propoziția are punct.'] }
      },
      {
        context: 'Imaginea arată un copil cu umbrelă, în ploaie, lângă o băltoacă. Matei spune: „Copilul este trist pentru că plouă.” Matei poartă ochelari. În cameră este o lampă.',
        question: 'Ce parte din descrierea lui Matei se vede sigur și ce parte este o presupunere?',
        facts: [{ text: 'În imagine, copilul are umbrelă, iar afară plouă.', relevant: true }, { text: 'Matei a spus că copilul este trist pentru că plouă.', relevant: true }, { text: 'Matei poartă ochelari.', relevant: false }, { text: 'În cameră este o lampă.', relevant: false }],
        plan: ['Despart ce se vede: un copil cu umbrelă, ploaia, o băltoacă.', 'Marchez „este trist” ca presupunere: tristețea nu se vede sigur.', 'Spun descrierea sigură: „Un copil stă cu umbrela în ploaie.”'],
        error: { index: 1, wrong: 'Spun că tristețea se vede sigur, ca umbrela.', alternatives: ['Spun că ploaia este o presupunere.', 'Spun că umbrela lipsește din imagine.'] },
        check: { correct: 'Pentru fiecare parte întreb: „Pot arăta cu degetul unde se vede?”', wrong: ['Dacă o presupunere pare logică, devine sigur adevărată.', 'Verific doar dacă descrierea este lungă.'] }
      }
    ]
  }
});
