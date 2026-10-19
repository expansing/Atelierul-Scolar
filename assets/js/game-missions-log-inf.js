/* Misiuni originale: dovezi, repararea unui pas și construirea unui plan. */
Object.assign(GAME_MISSIONS, {
  'log-1': {
    titles: { evidence: 'Mărgelele cu indicii', repair: 'Repară șiragul', plan: 'Atelierul tiparelor' },
    cases: [
      {
        context: 'Ina continuă o brățară după regula repetării. Modelul este roșu, verde, roșu, verde. Grupa roșu, verde se repetă fără schimbare. Cutia este rotundă. Masa este albă.',
        question: 'Ce culoare urmează în brățară?',
        facts: [{ text: 'Modelul este roșu, verde, roșu, verde.', relevant: true }, { text: 'Grupa roșu, verde se repetă fără schimbare.', relevant: true }, { text: 'Cutia este rotundă.', relevant: false }, { text: 'Masa este albă.', relevant: false }],
        plan: ['Separ două grupe: roșu, verde și roșu, verde.', 'Din grupele găsite aleg începutul următoarei grupe: roșu.', 'Adaug roșu și verific că începe aceeași grupă.'],
        error: { index: 1, wrong: 'Din grupele găsite aleg verde ca început al următoarei grupe.', alternatives: ['Aleg albastru, deși nu apare în grupa repetată.', 'Opreșc șirul fiindcă nicio culoare nu mai poate urma.'] },
        check: { correct: 'Recitesc roșu-verde / roșu-verde / roșu: ultima mărgea începe o grupă identică.', wrong: ['Aleg verde fiindcă este ultima culoare văzută.', 'Culoarea cutiei dovedește regula șirului.'] }
      },
      {
        context: 'Teo aranjează stegulețe. Șirul este cerc, triunghi, triunghi, cerc, triunghi, triunghi. Grupa cerc, triunghi, triunghi se repetă mereu. Sfoara este lungă de un metru. Fereastra este deschisă.',
        question: 'Care sunt următoarele două forme?',
        facts: [{ text: 'Șirul este cerc, triunghi, triunghi, cerc, triunghi, triunghi.', relevant: true }, { text: 'Grupa cerc, triunghi, triunghi se repetă mereu.', relevant: true }, { text: 'Sfoara este lungă de un metru.', relevant: false }, { text: 'Fereastra este deschisă.', relevant: false }],
        plan: ['Împart cele șase forme în două grupe de câte trei.', 'Folosesc grupa găsită: următoarea începe cu cerc, apoi triunghi.', 'Adaug cerc și triunghi și compar începuturile celor trei grupe.'],
        error: { index: 2, wrong: 'Adaug două cercuri ca început al noii grupe.', alternatives: ['Adaug două triunghiuri după cele două triunghiuri finale.', 'Adaug un pătrat și un cerc, schimbând grupa.'] },
        check: { correct: 'Pozițiile 1, 4 și 7 sunt cercuri, iar 2, 5 și 8 sunt triunghiuri.', wrong: ['Număr numai triunghiurile fără să verific pozițiile.', 'Lungimea sforii arată că urmează două cercuri.'] }
      },
      {
        context: 'Mara completează bilete numerotate. Biletele arată 4, 7, 10, 13. Regula scrisă cere adăugarea lui 3 de fiecare dată. Pixul are capac. Caietul are copertă mov.',
        question: 'Ce două numere se scriu după 13?',
        facts: [{ text: 'Biletele arată 4, 7, 10, 13.', relevant: true }, { text: 'Regula scrisă cere adăugarea lui 3 de fiecare dată.', relevant: true }, { text: 'Pixul are capac.', relevant: false }, { text: 'Caietul are copertă mov.', relevant: false }],
        plan: ['Verific salturile: 7 − 4 = 3, 10 − 7 = 3, 13 − 10 = 3.', 'Aplic saltul verificat: 13 + 3 = 16.', 'Pornesc de la 16: 16 + 3 = 19; completez 16, 19.'],
        error: { index: 1, wrong: 'După salturile de 3 calculez 13 + 1 = 14.', alternatives: ['Dublez ultimul număr și scriu 26.', 'Scad 3 din 13 și scriu 10 ca următor număr.'] },
        check: { correct: '16 − 13 și 19 − 16 sunt ambele 3, ca toate salturile date.', wrong: ['Este suficient ca 16 și 19 să fie mai mari decât 13.', 'Număr capacele pixurilor pentru a verifica șirul.'] }
      }
    ]
  },
  'log-2': {
    titles: { evidence: 'Dosarul figurii ascunse', repair: 'Indiciul răstălmăcit', plan: 'Elimină contururile nepotrivite' },
    cases: [
      {
        context: 'În plic sunt un cerc, un triunghi și un pătrat. Figura căutată are trei laturi drepte. Dintre cele trei, numai triunghiul are trei laturi drepte. Plicul este galben. Pe masă este un penar.',
        question: 'Ce figură este descrisă?',
        facts: [{ text: 'Figura căutată are trei laturi drepte.', relevant: true }, { text: 'Dintre cele trei, numai triunghiul are trei laturi drepte.', relevant: true }, { text: 'Plicul este galben.', relevant: false }, { text: 'Pe masă este un penar.', relevant: false }],
        plan: ['Citesc cerința: trebuie exact trei laturi drepte.', 'Aplic cerința și elimin cercul și pătratul.', 'Păstrez triunghiul și îi număr cele trei laturi.'],
        error: { index: 1, wrong: 'Elimin triunghiul fiindcă are trei laturi.', alternatives: ['Păstrez cercul fiindcă nu are laturi drepte.', 'Aleg pătratul fiindcă patru laturi înseamnă trei.'] },
        check: { correct: 'Urmăresc conturul triunghiului și număr 1, 2, 3 laturi drepte.', wrong: ['Verific doar culoarea plicului.', 'Aleg cercul pentru că pare mai neted.'] }
      },
      {
        context: 'Lia are un triunghi, un pătrat și un dreptunghi cu laturi de 2 și 5 cm. Figura căutată are patru unghiuri drepte. Toate laturile figurii căutate sunt egale. Lia poartă o eșarfă. Cutia are un mâner.',
        question: 'Care dintre cele trei figuri respectă ambele indicii?',
        facts: [{ text: 'Figura căutată are patru unghiuri drepte.', relevant: true }, { text: 'Toate laturile figurii căutate sunt egale.', relevant: true }, { text: 'Lia poartă o eșarfă.', relevant: false }, { text: 'Cutia are un mâner.', relevant: false }],
        plan: ['Folosesc unghiurile drepte și elimin triunghiul.', 'Dintre figurile rămase elimin dreptunghiul de 2 pe 5 cm: laturile nu sunt toate egale.', 'Aleg pătratul și verific cele patru unghiuri drepte și laturile egale.'],
        error: { index: 2, wrong: 'Aleg dreptunghiul de 2 pe 5 cm, ignorând laturile inegale.', alternatives: ['Aleg triunghiul, deși nu are patru unghiuri drepte.', 'Declar că nici pătratul nu are laturile egale.'] },
        check: { correct: 'La pătrat verific separat cele patru colțuri drepte și egalitatea tuturor laturilor.', wrong: ['Patru laturi sunt suficiente, fără compararea lungimilor.', 'Eșarfa Liei confirmă numele figurii.'] }
      },
      {
        context: 'Pe tablă sunt două pătrate, unul mic și unul mare, și un triunghi mare. Căutăm o figură mare. Căutăm o figură cu patru laturi egale și patru unghiuri drepte. Tabla are ramă de lemn. Creta este albă. În joc verificăm întâi mărimea, apoi geometria.',
        question: 'Care piesă rămâne după ambele filtre?',
        facts: [{ text: 'Căutăm o figură mare.', relevant: true }, { text: 'Căutăm o figură cu patru laturi egale și patru unghiuri drepte.', relevant: true }, { text: 'Tabla are ramă de lemn.', relevant: false }, { text: 'Creta este albă.', relevant: false }],
        plan: ['Aplic filtrul de mărime și elimin pătratul mic.', 'În grupa mare verific geometria și elimin triunghiul.', 'Păstrez pătratul mare și reiau ambele filtre pe el.'],
        error: { index: 0, wrong: 'Elimin toate figurile mari, deși cerința cere o figură mare.', alternatives: ['Păstrez numai pătratul mic, încălcând mărimea cerută.', 'Consider toate cele trei piese mari, inclusiv pătratul mic.'] },
        check: { correct: 'Pătratul mare este mare și are cele patru laturi egale și patru colțuri drepte.', wrong: ['Verific numai că piesa este mare.', 'Rotesc triunghiul și declar că are acum patru laturi.'] }
      }
    ]
  },
  'log-3': {
    titles: { evidence: 'Harta cartonașelor văzute', repair: 'Perechea încurcată', plan: 'Memoria cu adrese' },
    cases: [
      {
        context: 'Într-un joc, cartonașele rămân pe loc când sunt ascunse; perechea are același desen. La A s-a văzut un măr. La B este acum întors tot un măr. Covorașul este moale. Cutia jocului este verde.',
        question: 'Cu ce cartonaș ascuns formează B o pereche cunoscută?',
        facts: [{ text: 'La A s-a văzut un măr.', relevant: true }, { text: 'La B este acum întors tot un măr.', relevant: true }, { text: 'Covorașul este moale.', relevant: false }, { text: 'Cutia jocului este verde.', relevant: false }],
        plan: ['Numesc desenul vizibil de la B: măr.', 'Caut în amintiri același desen și aleg locul A.', 'Întorc A și compar cele două mere pentru perechea A–B.'],
        error: { index: 1, wrong: 'Aleg cutia verde în locul unui cartonaș cu măr.', alternatives: ['Declar că mărul de la B nu poate avea pereche cu un alt măr.', 'Ignor locul A cunoscut și declar că nu știm niciun loc cu măr.'] },
        check: { correct: 'Întorc A fără să mut piesele și văd același desen ca la B.', wrong: ['Faptul că două cartonașe sunt apropiate dovedește perechea.', 'Culoarea cutiei dovedește desenul ascuns.'] }
      },
      {
        context: 'Grila are rânduri numărate de sus în jos și coloane de la stânga la dreapta. Cartonașele nu se mută; perechile au același desen. O stea a fost văzută la rândul 1, coloana 2. Acum este vizibilă o stea la rândul 2, coloana 3. Masa are patru picioare. Fereastra are perdea.',
        question: 'Ce loc ascuns alegem pentru steaua vizibilă?',
        facts: [{ text: 'O stea a fost văzută la rândul 1, coloana 2.', relevant: true }, { text: 'Acum este vizibilă o stea la rândul 2, coloana 3.', relevant: true }, { text: 'Masa are patru picioare.', relevant: false }, { text: 'Fereastra are perdea.', relevant: false }],
        plan: ['Identific steaua vizibilă de la rândul 2, coloana 3.', 'Pentru același desen recitesc adresa reținută: rândul 1, coloana 2.', 'Întorc locul reținut și verific perechea de stele.'],
        error: { index: 1, wrong: 'Inversez adresa reținută și aleg rândul 2, coloana 1.', alternatives: ['Aleg rândul 1, coloana 1, deși steaua a fost văzută în coloana 2.', 'Realeg doar cartonașul deja vizibil și îl numesc două cartonașe.'] },
        check: { correct: 'Urmăresc întâi rândul 1, apoi coloana 2 și compar desenul cu steaua de la (2, 3).', wrong: ['Două adrese cu aceleași cifre sunt întotdeauna același loc.', 'Verific perdeaua în loc să întorc cartonașul.'] }
      },
      {
        context: 'Perechile au același desen, iar piesele nu se mută. Jurnalul arată: C = lună, D = soare. Acum E arată un soare și F arată o lună. Penarul este închis. Pe raft este un atlas. Alegem întâi perechea lui E, apoi pe a lui F.',
        question: 'Ce două perechi putem găsi fără ghicit?',
        facts: [{ text: 'Jurnalul arată: C = lună, D = soare.', relevant: true }, { text: 'Acum E arată un soare și F arată o lună.', relevant: true }, { text: 'Penarul este închis.', relevant: false }, { text: 'Pe raft este un atlas.', relevant: false }],
        plan: ['Citesc soarele de la E și găsesc în jurnal soarele de la D.', 'După perechea D–E, citesc luna de la F și aleg C din jurnal.', 'Verific D–E: doi sori, apoi C–F: două luni.'],
        error: { index: 2, wrong: 'Confirm C–E și D–F, deși fiecare leagă o lună cu un soare.', alternatives: ['Declar C–D o pereche de desene identice.', 'Confirm numai E–F ca pereche, deși desenele diferă.'] },
        check: { correct: 'Întorc fiecare pereche propusă și compar desenele, păstrând adresele din jurnal.', wrong: ['Oricare două litere vecine în alfabet formează pereche.', 'Două cartonașe formează pereche dacă au fost văzute în aceeași tură.'] }
      }
    ]
  },
  'log-4': {
    titles: { evidence: 'Coșul criteriilor', repair: 'Musafirul din grupa greșită', plan: 'Două filtre pentru piese' },
    cases: [
      {
        context: 'Ina sortează cercul galben și cercul albastru. Coșul primește numai piese galbene. Cercul galben este galben, iar cel albastru nu este galben. Coșul are toartă. Lângă masă este un scaun.',
        question: 'Care cerc intră în coș?',
        facts: [{ text: 'Coșul primește numai piese galbene.', relevant: true }, { text: 'Cercul galben este galben, iar cel albastru nu este galben.', relevant: true }, { text: 'Coșul are toartă.', relevant: false }, { text: 'Lângă masă este un scaun.', relevant: false }],
        plan: ['Citesc criteriul coșului: galben.', 'Compar culorile cu acest criteriu: numai cercul galben îl respectă.', 'Pun cercul galben în coș și las cercul albastru afară.'],
        error: { index: 2, wrong: 'Pun ambele cercuri în coș, inclusiv cercul albastru.', alternatives: ['Pun numai cercul albastru în coș.', 'Las ambele afară, deși cercul galben respectă regula.'] },
        check: { correct: 'În coș este cercul galben; afară este cercul albastru care nu respectă culoarea.', wrong: ['Este suficient că toate piesele sunt cercuri.', 'Toarta coșului decide culoarea acceptată.'] }
      },
      {
        context: 'Piesele sunt un triunghi roșu, un cerc roșu și un triunghi verde. Grupa cere roșu și triunghi. Triunghiul roșu îndeplinește ambele cerințe; celelalte piese îndeplinesc fiecare doar una. Foaia este netedă. Creionul are gumă. Verificăm întâi culoarea, apoi forma.',
        question: 'Ce piesă respectă întreaga regulă?',
        facts: [{ text: 'Grupa cere roșu și triunghi.', relevant: true }, { text: 'Triunghiul roșu îndeplinește ambele cerințe; celelalte piese îndeplinesc fiecare doar una.', relevant: true }, { text: 'Foaia este netedă.', relevant: false }, { text: 'Creionul are gumă.', relevant: false }],
        plan: ['Păstrez piesele roșii: triunghiul roșu și cercul roșu.', 'Dintre cele păstrate aleg forma triunghi și elimin cercul.', 'Pun numai triunghiul roșu în grupă și verific ambele proprietăți.'],
        error: { index: 1, wrong: 'Păstrez cercul roșu drept triunghi.', alternatives: ['Elimin triunghiul roșu fiindcă are forma cerută.', 'Aduc triunghiul verde și îl declar roșu.'] },
        check: { correct: 'Piesa aleasă este și roșie, și triunghi; niciuna dintre celelalte nu are ambele proprietăți.', wrong: ['Ajunge un singur răspuns da dintre cele două condiții.', 'Verific numai că piesa are culoare, oricare ar fi ea.'] }
      },
      {
        context: 'Într-un atelier sunt pătratul mov, cercul mov și pătratul portocaliu. Regula veche cere mov și pătrat. Regula nouă cere numai mov. Foarfeca este închisă. Peretele are un ceas. Mai întâi refacem grupa veche, apoi aplicăm regula nouă.',
        question: 'Ce piesă intră în plus când schimbăm regula?',
        facts: [{ text: 'Regula veche cere mov și pătrat.', relevant: true }, { text: 'Regula nouă cere numai mov.', relevant: true }, { text: 'Foarfeca este închisă.', relevant: false }, { text: 'Peretele are un ceas.', relevant: false }],
        plan: ['Aplic regula veche: numai pătratul mov intră.', 'Reverific piesele excluse după regula nouă: cercul mov intră, pătratul portocaliu nu.', 'Compar grupele: cercul mov este singura piesă adăugată.'],
        error: { index: 1, wrong: 'Adaug pătratul portocaliu fiindcă noua regulă cere doar mov.', alternatives: ['Resping cercul mov pentru că nu este pătrat, păstrând regula veche.', 'Scot pătratul mov, deși culoarea lui încă este acceptată.'] },
        check: { correct: 'Noua grupă conține pătratul mov și cercul mov; compararea cu vechea grupă arată doar cercul în plus.', wrong: ['Forma pătrat este suficientă pentru noua grupă.', 'Ceasul de pe perete verifică schimbarea criteriului.'] }
      }
    ]
  },
  'log-5': {
    titles: { evidence: 'Cutii și posibilități', repair: 'Deducția grăbită', plan: 'Eliminări fără ghicit' },
    cases: [
      {
        context: 'O bilă este în exact una dintre cutiile A și B. Bila nu este în A. Cele două cutii sunt singurele locuri posibile. Cutia A are o dungă. Pe raft este o carte.',
        question: 'Unde trebuie să fie bila?',
        facts: [{ text: 'Bila nu este în A.', relevant: true }, { text: 'Cele două cutii sunt singurele locuri posibile.', relevant: true }, { text: 'Cutia A are o dungă.', relevant: false }, { text: 'Pe raft este o carte.', relevant: false }],
        plan: ['Notez toate locurile permise: A și B.', 'Din lista făcută elimin A folosind indiciul.', 'Rămâne numai B; concluzionez că bila este în B.'],
        error: { index: 2, wrong: 'Rămâne B, dar declar că bila este în A.', alternatives: ['Declar că bila este în carte, în afara locurilor permise.', 'Declar că ambele cutii conțin aceeași bilă în același timp.'] },
        check: { correct: 'B este permisă, A este exclusă și lista nu are alt loc; B este unica posibilitate.', wrong: ['Dunga de pe A dovedește că bila este în A.', 'Aleg B doar fiindcă litera îmi place.'] }
      },
      {
        context: 'Trei copii stau la rând, fără alte persoane: Ina, Radu și Lia. Ina este înaintea lui Radu. Radu este înaintea Liei. Ina are șapcă. Lia ține o carte.',
        question: 'Care este ordinea de la primul la ultimul?',
        facts: [{ text: 'Ina este înaintea lui Radu.', relevant: true }, { text: 'Radu este înaintea Liei.', relevant: true }, { text: 'Ina are șapcă.', relevant: false }, { text: 'Lia ține o carte.', relevant: false }],
        plan: ['Scriu prima legătură: Ina înainte de Radu.', 'După Radu din legătura scrisă o așez pe Lia.', 'Citesc Ina, Radu, Lia și verific ambele indicii.'],
        error: { index: 1, wrong: 'O pun pe Lia înaintea lui Radu, împotriva celui de-al doilea indiciu.', alternatives: ['O pun pe Lia între Ina și Radu, deși Radu este înaintea ei.', 'O elimin pe Lia din rând, deși sunt exact trei copii.'] },
        check: { correct: 'În Ina–Radu–Lia, Ina îl precedă pe Radu, iar Radu o precedă pe Lia.', wrong: ['Cartea Liei arată că ea trebuie să fie prima.', 'Verific numai că apar trei nume, nu și ordinea.'] }
      },
      {
        context: 'Un jeton este într-un singur săculeț dintre X, Y și Z. Jetonul nu este în X. Nu există alt indiciu despre Y sau Z. Săculețul X are șnur. Masa are față de masă.',
        question: 'Putem numi sigur un singur săculeț?',
        facts: [{ text: 'Jetonul nu este în X.', relevant: true }, { text: 'Nu există alt indiciu despre Y sau Z.', relevant: true }, { text: 'Săculețul X are șnur.', relevant: false }, { text: 'Masa are față de masă.', relevant: false }],
        plan: ['Scriu variantele permise X, Y și Z și elimin X.', 'Privesc lista rămasă: Y și Z nu sunt deosebite de niciun indiciu.', 'Spun că nu știm încă exact locul și cer un indiciu care să deosebească Y de Z.'],
        error: { index: 2, wrong: 'Declar sigur Y, deși Z rămâne la fel de posibil.', alternatives: ['Declar sigur Z fără nicio informație în plus.', 'Declar sigur X, deși este exclus explicit.'] },
        check: { correct: 'Încerc separat Y și Z: fiecare respectă toate datele, deci nu există încă un răspuns unic.', wrong: ['Un vot pentru Y transformă ghicirea în dovadă.', 'Șnurul lui X dovedește că jetonul este în Z.'] }
      }
    ]
  },
  'log-6': {
    titles: { evidence: 'Piesa de la răscruce', repair: 'Puzzle cu o proprietate greșită', plan: 'Întâi rândul, apoi coloana' },
    cases: [
      {
        context: 'Un puzzle are forme păstrate pe rânduri și culori păstrate pe coloane. Rândul golului conține numai cercuri. Coloana golului conține numai piese verzi. Rama este groasă. Cutia este sub masă. Citim întâi rândul, apoi coloana.',
        question: 'Ce piesă completează golul?',
        facts: [{ text: 'Rândul golului conține numai cercuri.', relevant: true }, { text: 'Coloana golului conține numai piese verzi.', relevant: true }, { text: 'Rama este groasă.', relevant: false }, { text: 'Cutia este sub masă.', relevant: false }],
        plan: ['Din rând stabilesc forma piesei: cerc.', 'Păstrez cercul și îi aleg culoarea din coloană: verde.', 'Pun cercul verde și verific ambele direcții.'],
        error: { index: 1, wrong: 'Păstrez cercul, dar aleg roșu în coloana verde.', alternatives: ['Schimb forma în pătrat și aleg verde.', 'Aleg triunghi albastru, încălcând ambele reguli.'] },
        check: { correct: 'Cercul verde păstrează cercurile pe rând și verdele pe coloană.', wrong: ['Orice cerc este bun, indiferent de coloană.', 'Grosimea ramei verifică forma lipsă.'] }
      },
      {
        context: 'Într-un tabel, fiecare rând păstrează forma și fiecare coloană culoarea. Pe rândul 2 sunt triunghiuri. În coloana 3 sunt piese albastre. Golul este la rândul 2, coloana 3. Peretele este crem. Pe scaun este o pernă. Citim întâi rândul golului, apoi coloana lui.',
        question: 'Ce combinație trebuie pusă la (rândul 2, coloana 3)?',
        facts: [{ text: 'Pe rândul 2 sunt triunghiuri.', relevant: true }, { text: 'În coloana 3 sunt piese albastre.', relevant: true }, { text: 'Peretele este crem.', relevant: false }, { text: 'Pe scaun este o pernă.', relevant: false }],
        plan: ['Urmăresc rândul 2 al golului și aleg triunghi.', 'Pentru triunghiul ales citesc coloana 3 și aleg albastru.', 'Completez cu triunghiul albastru și recitesc rândul 2 și coloana 3.'],
        error: { index: 2, wrong: 'Pun un triunghi galben în golul coloanei albastre.', alternatives: ['Pun un cerc albastru în rândul triunghiurilor.', 'Pun un pătrat roșu, care nu respectă niciuna dintre reguli.'] },
        check: { correct: 'Piesa este triunghi ca vecinii de pe rând și albastră ca vecinii de pe coloană.', wrong: ['Compar doar cu perna de pe scaun.', 'Verific numai că am umplut golul cu o piesă oarecare.'] }
      },
      {
        context: 'Două goluri A și B sunt pe același rând al unui puzzle. Rândul ambelor goluri păstrează forma pătrat. Coloana lui A păstrează galbenul, iar coloana lui B păstrează movul. Cutia are capac. Covorul are franjuri. Rezolvăm A înainte de B.',
        question: 'Ce piesă punem în A și ce piesă în B?',
        facts: [{ text: 'Rândul ambelor goluri păstrează forma pătrat.', relevant: true }, { text: 'Coloana lui A păstrează galbenul, iar coloana lui B păstrează movul.', relevant: true }, { text: 'Cutia are capac.', relevant: false }, { text: 'Covorul are franjuri.', relevant: false }],
        plan: ['Pentru A combin pătratul de pe rând cu galbenul coloanei: pătrat galben.', 'Păstrez forma găsită pe rând și rezolv B folosind coloana lui: pătrat mov.', 'Pun A galben și B mov, ambele pătrate, apoi verific cele două coloane.'],
        error: { index: 1, wrong: 'Pentru B copiez și culoarea lui A: aleg pătrat galben.', alternatives: ['Pentru B aleg cerc mov, schimbând forma rândului.', 'Pentru B aleg triunghi verde, ignorând ambele direcții.'] },
        check: { correct: 'Pe rând am două pătrate; coloana A rămâne galbenă și coloana B mov.', wrong: ['Același rând obligă toate piesele să aibă și aceeași culoare.', 'Verific doar piesa A și declar automat că B este corectă.'] }
      }
    ]
  },
  'log-7': {
    titles: { evidence: 'Salturile turnurilor', repair: 'Predicția care schimbă regula', plan: 'Mai întâi descopăr creșterea' },
    cases: [
      {
        context: 'Ina construiește turnuri. Turnurile au 1, 3 și 5 cuburi. Regula cere încă două cuburi la fiecare turn nou. Cuburile sunt din lemn. Ina stă pe covor.',
        question: 'Câte cuburi are turnul următor?',
        facts: [{ text: 'Turnurile au 1, 3 și 5 cuburi.', relevant: true }, { text: 'Regula cere încă două cuburi la fiecare turn nou.', relevant: true }, { text: 'Cuburile sunt din lemn.', relevant: false }, { text: 'Ina stă pe covor.', relevant: false }],
        plan: ['Compar 1 cu 3 și 3 cu 5: de fiecare dată cresc cu 2.', 'Aplic creșterea găsită la ultimul turn: 5 + 2 = 7.', 'Construiesc turnul de 7 și verific că are cu 2 mai multe cuburi decât cel de 5.'],
        error: { index: 1, wrong: 'Reiau 1 după 5, deși regula cere creștere cu 2.', alternatives: ['Calculez 5 + 1 = 6 ca și cum saltul ar fi 1.', 'Dublez 5 și aleg 10 în loc să adaug 2.'] },
        check: { correct: 'Înlătur două cuburi din turnul de 7 și obțin cele 5 cuburi ale turnului anterior.', wrong: ['Orice turn mai înalt decât 5 este corect.', 'Materialul lemnos dovedește că răspunsul este 10.'] }
      },
      {
        context: 'Două benzi trebuie continuate. Banda A repetă grupa frunză, floare: frunză, floare, frunză, floare. Banda B crește cu 4: 4, 8, 12. Benzile sunt prinse cu cleme. Masa este rotundă. Analizăm A înainte de B.',
        question: 'Ce urmează pe fiecare bandă și ce regulă folosește?',
        facts: [{ text: 'Banda A repetă grupa frunză, floare: frunză, floare, frunză, floare.', relevant: true }, { text: 'Banda B crește cu 4: 4, 8, 12.', relevant: true }, { text: 'Benzile sunt prinse cu cleme.', relevant: false }, { text: 'Masa este rotundă.', relevant: false }],
        plan: ['Pe A găsesc grupa care revine și aleg frunză după ultima floare.', 'După repetarea din A, analizez separat B: 12 + 4 = 16.', 'Completez A cu frunză și B cu 16; numesc repetarea, respectiv creșterea.'],
        error: { index: 1, wrong: 'Pe B reiau 4 după 12, tratând creșterea drept repetarea celor trei numere.', alternatives: ['Pe B scriu 13, schimbând saltul de 4 în salt de 1.', 'Pe B scriu floare, înlocuind numărul cerut cu un desen.'] },
        check: { correct: 'Frunza începe încă o grupă pe A; 16 − 12 = 4 păstrează saltul pe B.', wrong: ['Ambele benzi trebuie să reia primul element.', 'Forma mesei arată regula ambelor benzi.'] }
      },
      {
        context: 'Pe trei tăvi sunt 2, 5 și 8 nasturi. Fiecare tavă nouă primește cu 3 nasturi mai mult decât precedenta. Tăvile au margini ridicate. Cutia nasturilor este metalică.',
        question: 'Câți nasturi vor fi pe a patra și pe a cincea tavă?',
        facts: [{ text: 'Pe trei tăvi sunt 2, 5 și 8 nasturi.', relevant: true }, { text: 'Fiecare tavă nouă primește cu 3 nasturi mai mult decât precedenta.', relevant: true }, { text: 'Tăvile au margini ridicate.', relevant: false }, { text: 'Cutia nasturilor este metalică.', relevant: false }],
        plan: ['Verific 5 − 2 = 3 și 8 − 5 = 3.', 'Aplic saltul verificat: pe tava a patra pun 8 + 3 = 11.', 'Pornesc de la 11 și pun 14 pe tava a cincea; verific saltul de 3.'],
        error: { index: 2, wrong: 'Pun tot 11 pe tava a cincea, fără creșterea cerută.', alternatives: ['Pun 12 pe tava a cincea, crescând numai cu 1.', 'Reiau 2 pe tava a cincea ca într-un șir repetitiv.'] },
        check: { correct: '11 − 8 = 3 și 14 − 11 = 3; ambele tăvi noi respectă creșterea.', wrong: ['Verific numai că numerele noi sunt pozitive.', 'Dacă tăvile au aceeași formă, trebuie să aibă același număr de nasturi.'] }
      }
    ]
  },
  'log-8': {
    titles: { evidence: 'Harta ocolului sigur', repair: 'Pasul care intră în obstacol', plan: 'Drumul pe căsuțe libere' },
    cases: [
      {
        context: 'Grila are x = 1…3 spre dreapta și y = 1…2 în jos. Un pas intră în căsuța vecină; direcțiile sunt absolute, fără rotire. Plecarea este (1,1), ținta este (3,1). Obstacolul este (2,1); toate celelalte căsuțe sunt libere. Pionul este mov. Harta are ramă. Alegem ocolul jos, dreapta de două ori, sus.',
        question: 'Cum ajunge pionul la țintă fără să intre în obstacol?',
        facts: [{ text: 'Plecarea este (1,1), ținta este (3,1).', relevant: true }, { text: 'Obstacolul este (2,1); toate celelalte căsuțe sunt libere.', relevant: true }, { text: 'Pionul este mov.', relevant: false }, { text: 'Harta are ramă.', relevant: false }],
        plan: ['Cobor din (1,1) în (1,2), pe o căsuță liberă.', 'Din (1,2) merg dreapta prin (2,2) la (3,2).', 'Din (3,2) urc la (3,1) și verific sosirea la țintă.'],
        error: { index: 0, wrong: 'Pornesc dreapta în (2,1), căsuța blocată.', alternatives: ['Pornesc sus în (1,0), în afara grilei.', 'Pornesc stânga în (0,1), în afara grilei.'] },
        check: { correct: 'Urmăresc (1,2), (2,2), (3,2), (3,1): niciun loc nu este (2,1), iar ultimul este ținta.', wrong: ['Număr doar patru pași, fără a controla locurile.', 'Sar direct din (1,1) în (3,1) și ignor obstacolul.'] }
      },
      {
        context: 'Pe grila x = 1…4 spre dreapta, y = 1…3 în jos, un pas merge la vecin; fără diagonale sau rotiri. Startul este (1,2), destinația este (4,2). Sunt blocate (2,2) și (3,2); restul este liber. Tabla este verde. Pionul are desen de urs. Alegem ocolul de sus: sus, trei pași dreapta, jos.',
        question: 'Ce traseu urmează ocolul de sus?',
        facts: [{ text: 'Startul este (1,2), destinația este (4,2).', relevant: true }, { text: 'Sunt blocate (2,2) și (3,2); restul este liber.', relevant: true }, { text: 'Tabla este verde.', relevant: false }, { text: 'Pionul are desen de urs.', relevant: false }],
        plan: ['Urc de la (1,2) la (1,1).', 'Din (1,1) fac trei pași dreapta: (2,1), (3,1), (4,1).', 'Cobor de la (4,1) la (4,2) și verific ținta.'],
        error: { index: 1, wrong: 'Din (1,1) cobor în (1,2) în loc să parcurg rândul de sus.', alternatives: ['Din (1,1) merg dreapta de patru ori, până la (5,1), în afara grilei.', 'Din (1,1) urc la (1,0), în afara grilei.'] },
        check: { correct: 'Cele cinci căsuțe vizitate sunt libere, în grilă, și ultima este (4,2).', wrong: ['Este suficient că prima căsuță este liberă.', 'Ursul desenat pe pion garantează un drum sigur.'] }
      },
      {
        context: 'Grila folosește x = 1…4 spre dreapta, y = 1…4 în jos; un pas este la vecin, fără rotire sau diagonală. Pornim la (1,3) și vrem la (4,3). (2,3) și (3,3) sunt blocate; restul este liber. Pionul este din lemn. Grila are titlu albastru. Comparăm ocolul A: sus, dreapta de trei ori, jos, cu B: sus de două ori, dreapta de trei ori, jos de două ori; executăm ocolul mai scurt.',
        question: 'Care ocol sigur are mai puțini pași și unde se termină?',
        facts: [{ text: 'Pornim la (1,3) și vrem la (4,3).', relevant: true }, { text: '(2,3) și (3,3) sunt blocate; restul este liber.', relevant: true }, { text: 'Pionul este din lemn.', relevant: false }, { text: 'Grila are titlu albastru.', relevant: false }],
        plan: ['Verific ocolurile date: A are 1 + 3 + 1 = 5 pași, B are 2 + 3 + 2 = 7; ambele evită blocajele.', 'Aleg A din comparație și execut sus, apoi dreapta de trei ori până la (4,2).', 'Cobor la (4,3) și verific cei 5 pași și sosirea fără obstacole.'],
        error: { index: 1, wrong: 'Aleg B ca fiind mai scurt, fiindcă 7 ar fi mai mic decât 5.', alternatives: ['Aleg drumul drept prin (2,3) ca drum sigur.', 'Încep A mergând stânga spre (0,3), în afara grilei.'] },
        check: { correct: 'A vizitează (1,2), (2,2), (3,2), (4,2), (4,3): 5 pași liberi, față de 7 pentru B.', wrong: ['A este sigur doar fiindcă este mai scurt, fără verificarea căsuțelor.', 'Compar numai numărul comenzilor scrise, ignorând repetările.'] }
      }
    ]
  },
  'log-9': {
    titles: { evidence: 'Antetele spun piesa', repair: 'Adresa schimbată în tabel', plan: 'Forma rămâne, culoarea se schimbă' },
    cases: [
      {
        context: 'Un tabel grupează piese după antete. Rândul ales este etichetat cerc. Coloana aleasă este etichetată roșu. Tabelul este pe o foaie mare. Lângă foaie este o gumă. Citim rândul înaintea coloanei.',
        question: 'Ce piesă stă la intersecția aleasă?',
        facts: [{ text: 'Rândul ales este etichetat cerc.', relevant: true }, { text: 'Coloana aleasă este etichetată roșu.', relevant: true }, { text: 'Tabelul este pe o foaie mare.', relevant: false }, { text: 'Lângă foaie este o gumă.', relevant: false }],
        plan: ['Citesc antetul rândului și aleg forma cerc.', 'Pentru cercul ales citesc antetul coloanei: roșu.', 'Așez cercul roșu la intersecție și verific ambele etichete.'],
        error: { index: 2, wrong: 'Așez un pătrat roșu pe rândul cercurilor.', alternatives: ['Așez un cerc verde în coloana roșie.', 'Așez un triunghi albastru, nepotrivit cu ambele etichete.'] },
        check: { correct: 'Conturul este cerc, iar culoarea este roșu, exact ca cele două antete.', wrong: ['Ajunge ca piesa să fie pe foaia mare.', 'Guma de lângă foaie arată culoarea corectă.'] }
      },
      {
        context: 'În tabel mutăm o piesă pe același rând. Piesa de pornire este un triunghi albastru. Noul loc este pe rândul triunghi și în coloana galben. Tabelul are ramă gri. Pe masă este un pahar gol.',
        question: 'Ce schimbăm și ce păstrăm pentru noul loc?',
        facts: [{ text: 'Piesa de pornire este un triunghi albastru.', relevant: true }, { text: 'Noul loc este pe rândul triunghi și în coloana galben.', relevant: true }, { text: 'Tabelul are ramă gri.', relevant: false }, { text: 'Pe masă este un pahar gol.', relevant: false }],
        plan: ['Compar piesa de pornire cu rândul nou: păstrez forma triunghi.', 'Cu forma păstrată schimb albastrul în galben, după coloana nouă.', 'Așez triunghiul galben și verific că numai culoarea s-a schimbat.'],
        error: { index: 1, wrong: 'Schimb forma în cerc și păstrez albastrul.', alternatives: ['Păstrez triunghiul albastru fără schimbarea culorii cerute.', 'Schimb galbenul cerut în mov.'] },
        check: { correct: 'Vechiul și noul contur sunt triunghiuri; noua culoare corespunde coloanei galben.', wrong: ['Verific numai că piesa diferă de cea veche.', 'Rama gri cere o piesă gri.'] }
      },
      {
        context: 'Un tabel are antete de formă pe rânduri și de culoare pe coloane. Locul A cere pătrat verde. Locul B cere cerc mov. Pe perete este un calendar. Creionul este ascuțit. În A este pus un cerc verde, în B un pătrat mov; corectăm întâi A, apoi B, schimbând doar formele.',
        question: 'Cum corectăm ambele locuri păstrând culorile potrivite?',
        facts: [{ text: 'Locul A cere pătrat verde.', relevant: true }, { text: 'Locul B cere cerc mov.', relevant: true }, { text: 'Pe perete este un calendar.', relevant: false }, { text: 'Creionul este ascuțit.', relevant: false }],
        plan: ['Compar A cu antetele lui și înlocuiesc cercul verde cu pătrat verde.', 'După corectarea lui A verific B și înlocuiesc pătratul mov cu cerc mov.', 'Recitesc ambele adrese: A pătrat verde, B cerc mov, fără schimbări de culoare.'],
        error: { index: 1, wrong: 'La B pun cerc verde, deși coloana lui cere mov.', alternatives: ['La B păstrez pătratul mov, deși rândul cere cerc.', 'La B pun triunghi roșu, încălcând ambele antete.'] },
        check: { correct: 'La A verific pătrat și verde; la B verific cerc și mov, fiecare față de propriile antete.', wrong: ['Dacă A este corect, B nu mai trebuie verificat.', 'Două forme diferite înseamnă automat două adrese corecte.'] }
      }
    ]
  },
  'log-10': {
    titles: { evidence: 'Urmele nu spun totul', repair: 'Concluzia prea sigură', plan: 'Detectivul cere un indiciu nou' },
    cases: [
      {
        context: 'Lia privește o alee. Aleea este udă. Lia nu a văzut dacă a plouat sau dacă cineva a folosit un furtun. Gardul este verde. Pe bancă este un ziar.',
        question: 'Știm sigur că ploaia a udat aleea?',
        facts: [{ text: 'Aleea este udă.', relevant: true }, { text: 'Lia nu a văzut dacă a plouat sau dacă cineva a folosit un furtun.', relevant: true }, { text: 'Gardul este verde.', relevant: false }, { text: 'Pe bancă este un ziar.', relevant: false }],
        plan: ['Notez observația directă: aleea este udă.', 'Pornind de la apă propun două explicații posibile: ploaie sau furtun.', 'Cum niciuna nu este verificată, spun „Nu știm încă” și întreb un martor ce a văzut.'],
        error: { index: 2, wrong: 'Declar sigur că a plouat, fără un indiciu nou.', alternatives: ['Declar sigur că furtunul a udat aleea, fără să fi fost văzut.', 'Declar că aleea este uscată, contrazicând observația.'] },
        check: { correct: 'Recitesc datele: apa este observată, dar nicio cauză nu este observată; concluzia rămâne nesigură.', wrong: ['Ploaia este explicația preferată, deci este dovedită.', 'Ziarul de pe bancă dovedește folosirea furtunului.'] }
      },
      {
        context: 'Teo cercetează urme desenate în noroi. Se văd urme de încălțăminte lângă ușă. Nimeni din poveste nu a văzut cine le-a lăsat. Ușa este albastră. În curte este un leagăn.',
        question: 'Putem numi persoana care a făcut urmele?',
        facts: [{ text: 'Se văd urme de încălțăminte lângă ușă.', relevant: true }, { text: 'Nimeni din poveste nu a văzut cine le-a lăsat.', relevant: true }, { text: 'Ușa este albastră.', relevant: false }, { text: 'În curte este un leagăn.', relevant: false }],
        plan: ['Descriu numai ce se vede: urme de încălțăminte lângă ușă.', 'Separ de descriere numele presupus al unei persoane: urmele nu îi arată singure numele.', 'Păstrez „Nu știm cine” și caut o observație despre momentul când s-au făcut urmele.'],
        error: { index: 1, wrong: 'Declar că orice copil aflat lângă ușă a făcut sigur urmele.', alternatives: ['Declar că albastrul ușii identifică persoana.', 'Declar că un leagăn poate spune numele celui care a trecut.'] },
        check: { correct: 'Caut în poveste o legătură observată între o persoană și urme; nu există, deci nu acuz pe nimeni.', wrong: ['Mai mulți copii repetă un nume, deci acuzația este verificată.', 'Cel care vorbește cel mai tare trebuie să aibă dreptate.'] }
      },
      {
        context: 'Ina credea că ploaia a udat dalele. Ina vede acum un adult care stropește dalele cu furtunul. Nimeni nu a observat dacă plouase înainte. Furtunul este galben. Adultul poartă pălărie.',
        question: 'Ce putem spune despre apă după noua observație?',
        facts: [{ text: 'Ina vede acum un adult care stropește dalele cu furtunul.', relevant: true }, { text: 'Nimeni nu a observat dacă plouase înainte.', relevant: true }, { text: 'Furtunul este galben.', relevant: false }, { text: 'Adultul poartă pălărie.', relevant: false }],
        plan: ['Notez indiciul nou: furtunul udă dalele acum.', 'Compar cu prima idee: furtunul este observat, dar ploaia anterioară nu este verificată.', 'Îmi schimb concluzia: furtunul adaugă apă acum; despre ploaia de dinainte nu știm încă.'],
        error: { index: 2, wrong: 'Conchid că sigur nu a plouat niciodată acolo.', alternatives: ['Ignor furtunul și spun că numai ploaia udă dalele acum.', 'Conchid că dalele sunt uscate în timp ce sunt stropite.'] },
        check: { correct: 'Concluzia afirmă doar stropirea observată acum și nu inventează vremea de dinainte.', wrong: ['O observație de acum dovedește toate evenimentele de ieri.', 'Pălăria adultului dovedește că ploaia este imposibilă.'] }
      }
    ]
  },
  'log-11': {
    titles: { evidence: 'Văd, aud sau presupun?', repair: 'Scoate acuzația din poveste', plan: 'Întrebări fără vinovați inventați' },
    cases: [
      {
        context: 'Mara intră într-o cameră. Vede un pahar culcat și apă pe masă. Nu a văzut cum a ajuns paharul culcat. Perdeaua este crem. Raftul are trei polițe.',
        question: 'Ce știe Mara și ce nu știe despre pahar?',
        facts: [{ text: 'Vede un pahar culcat și apă pe masă.', relevant: true }, { text: 'Nu a văzut cum a ajuns paharul culcat.', relevant: true }, { text: 'Perdeaua este crem.', relevant: false }, { text: 'Raftul are trei polițe.', relevant: false }],
        plan: ['Descriu observația: pahar culcat și apă pe masă.', 'Din descriere separ cauza necunoscută: nu știm ce l-a răsturnat.', 'Întreb „Ai văzut cum a ajuns culcat?” și păstrez lipsa răspunsului dacă nu există martor.'],
        error: { index: 1, wrong: 'Adaug drept fapt că pisica l-a răsturnat, deși nimeni nu a văzut.', alternatives: ['Adaug drept fapt că Mara l-a răsturnat doar fiindcă a intrat.', 'Neg apa observată și spun că masa este sigur uscată.'] },
        check: { correct: 'Compar descrierea cu ce a văzut Mara: obiectele și apa apar, dar niciun vinovat nu apare în observație.', wrong: ['Aleg persoana cea mai apropiată ca dovadă suficientă.', 'Raftul cu trei polițe dovedește cauza răsturnării.'] }
      },
      {
        context: 'Radu ascultă lângă o ușă închisă. Aude un clopoțel dincolo de ușă. Nu vede cine sau ce produce sunetul. Covorul este roșu. Clanța este metalică.',
        question: 'Poate Radu spune sigur că Lia a sunat?',
        facts: [{ text: 'Aude un clopoțel dincolo de ușă.', relevant: true }, { text: 'Nu vede cine sau ce produce sunetul.', relevant: true }, { text: 'Covorul este roșu.', relevant: false }, { text: 'Clanța este metalică.', relevant: false }],
        plan: ['Notez observația auzită: un sunet de clopoțel.', 'Separ de sunet ideea „Lia a sunat”, care nu a fost verificată.', 'Spun că sursa sunetului nu este încă identificată și cer unui adult cunoscut ajutor pentru verificare.'],
        error: { index: 2, wrong: 'Declar sigur că Lia a sunat numai din sunetul clopoțelului.', alternatives: ['Declar sigur că nu există niciun sunet, deși Radu îl aude.', 'Declar sigur că metalul clanței dovedește cine a sunat.'] },
        check: { correct: 'Datele confirmă auzirea sunetului, nu identitatea celui care l-a produs.', wrong: ['Repet numele Lia de trei ori pentru a-l transforma în observație.', 'Culoarea covorului identifică persoana de după ușă.'] }
      },
      {
        context: 'La atelier, Ina caută o foaie. Foaia este ruptă în două. Nimeni nu a văzut ruperea; Teo se află acum lângă masă. Ceasul arată ora două. Penarul are fermoar.',
        question: 'Este justificat să spunem că Teo a rupt foaia?',
        facts: [{ text: 'Foaia este ruptă în două.', relevant: true }, { text: 'Nimeni nu a văzut ruperea; Teo se află acum lângă masă.', relevant: true }, { text: 'Ceasul arată ora două.', relevant: false }, { text: 'Penarul are fermoar.', relevant: false }],
        plan: ['Descriu foaia ruptă, fără să adaug un autor al ruperii.', 'Compar apropierea lui Teo cu evenimentul nevăzut: apropierea nu dovedește cine a rupt foaia.', 'Resping acuzația sigură și întreb neutru ce s-a observat înainte de găsirea foii.'],
        error: { index: 1, wrong: 'Transform apropierea lui Teo în dovadă sigură că el a rupt foaia.', alternatives: ['Consider că ora două dovedește vinovăția lui Teo.', 'Consider că fermoarul penarului dovedește cine a rupt foaia.'] },
        check: { correct: 'Pot susține „foaia este ruptă”, dar nu găsesc o observație a ruperii care să îl identifice pe Teo.', wrong: ['Dacă Teo nu este de acord, acuzația devine adevărată.', 'Aleg un vinovat ca să nu mai rămână nicio întrebare.'] }
      }
    ]
  },
  'log-12': {
    titles: { evidence: 'Număr sau gust personal?', repair: 'Afirmația adultului se verifică', plan: 'Desparte faptul de preferință' },
    cases: [
      {
        context: 'Ina și Dan privesc un coș. În coș sunt trei mere, care pot fi numărate. Ina spune „Mie îmi plac merele”, iar Dan preferă perele. Coșul este din nuiele. Masa este pătrată.',
        question: 'Ce se verifică prin numărare și ce poate diferi între copii?',
        facts: [{ text: 'În coș sunt trei mere, care pot fi numărate.', relevant: true }, { text: 'Ina spune „Mie îmi plac merele”, iar Dan preferă perele.', relevant: true }, { text: 'Coșul este din nuiele.', relevant: false }, { text: 'Masa este pătrată.', relevant: false }],
        plan: ['Separ propoziția despre cele trei mere de alegerile copiilor.', 'Verific partea despre cantitate numărând merele: unu, doi, trei.', 'Confirm trei mere și păstrez separat preferințele diferite, fără un câștigător al gusturilor.'],
        error: { index: 2, wrong: 'Confirm trei mere și declar că Dan greșește fiindcă preferă perele.', alternatives: ['Declar că gustul Inei dovedește că sunt patru mere.', 'Declar că amândoi trebuie să prefere merele ca numărarea să fie corectă.'] },
        check: { correct: 'Numărarea confirmă trei mere; schimbarea fructului preferat nu schimbă numărul din coș.', wrong: ['Votez fructul preferat pentru a afla câte mere sunt.', 'Forma mesei dovedește gustul corect al tuturor.'] }
      },
      {
        context: 'Într-un desen se pot număra patru creioane. Un adult afirmă „Sunt cinci creioane”. Desenul este pe hârtie albă. Adultul poartă un pulover. Ina dorește să verifice afirmația, vorbind respectuos.',
        question: 'Cum verificăm afirmația adultului?',
        facts: [{ text: 'Într-un desen se pot număra patru creioane.', relevant: true }, { text: 'Un adult afirmă „Sunt cinci creioane”.', relevant: true }, { text: 'Desenul este pe hârtie albă.', relevant: false }, { text: 'Adultul poartă un pulover.', relevant: false }],
        plan: ['Identific afirmația verificabilă a adultului: cinci creioane.', 'Testez afirmația numărând fiecare creion o singură dată și obțin patru.', 'Compar patru cu cinci și spun respectuos „Eu număr patru; putem verifica împreună?”.'],
        error: { index: 1, wrong: 'Înlocuiesc numărarea cu regula „Un adult nu poate greși”.', alternatives: ['Număr intenționat același creion de două ori ca să obțin cinci.', 'Votăm cinci și tratăm votul drept numărare a desenului.'] },
        check: { correct: 'Refac numărarea marcând pe rând cele patru creioane, fără să omit sau să repet unul.', wrong: ['Puloverul adultului face afirmația adevărată.', 'Acordul cu adultul este suficient chiar dacă desenul arată alt număr.'] }
      },
      {
        context: 'Mara descrie o carte. Spune „Cartea are opt pagini și este preferata mea”. Paginile cărții sunt numerotate de la 1 la 8, fără pagini lipsă. Coperta este lucioasă. Cartea stă pe un suport.',
        question: 'Ce parte a mesajului este verificabilă și ce parte este preferință?',
        facts: [{ text: 'Spune „Cartea are opt pagini și este preferata mea”.', relevant: true }, { text: 'Paginile cărții sunt numerotate de la 1 la 8, fără pagini lipsă.', relevant: true }, { text: 'Coperta este lucioasă.', relevant: false }, { text: 'Cartea stă pe un suport.', relevant: false }],
        plan: ['Despart mesajul în numărul paginilor și preferința Marei.', 'Verific partea despre număr urmărind paginile 1–8: sunt opt.', 'Confirm cele opt pagini și notez că preferința Marei nu obligă pe altcineva să aleagă aceeași carte.'],
        error: { index: 2, wrong: 'Din cele opt pagini deduc că aceasta trebuie să fie cartea preferată a tuturor.', alternatives: ['Declar că preferința Marei schimbă numărul paginilor în nouă.', 'Declar greșită preferința Marei dacă alt copil preferă altă carte.'] },
        check: { correct: 'Pot renumăra opt pagini; alt copil poate prefera altă carte fără să schimbe acest rezultat.', wrong: ['Luciu pe copertă dovedește că tuturor trebuie să le placă.', 'Un vot verifică numărul paginilor fără să deschidem cartea.'] }
      }
    ]
  },
  'log-13': {
    titles: { evidence: 'Dovada potrivită întrebării', repair: 'Concluzia care promite prea mult', plan: 'Măsoară înainte să compari' },
    cases: [
      {
        context: 'Ina compară două panglici, măsurate de la zero cu aceeași riglă în centimetri. Panglica verde măsoară 6 cm. Panglica mov măsoară 9 cm. Trei copii preferă verdele. Rigla are o gaură pentru agățat.',
        question: 'Care dintre aceste două panglici este mai lungă?',
        facts: [{ text: 'Panglica verde măsoară 6 cm.', relevant: true }, { text: 'Panglica mov măsoară 9 cm.', relevant: true }, { text: 'Trei copii preferă verdele.', relevant: false }, { text: 'Rigla are o gaură pentru agățat.', relevant: false }],
        plan: ['Citesc măsurătorile comparabile: verde 6 cm, mov 9 cm.', 'Compar numerele citite: 9 este mai mare decât 6.', 'Conchid că această panglică mov este mai lungă decât această panglică verde.'],
        error: { index: 2, wrong: 'Conchid că toate panglicile mov din lume sunt mai lungi decât toate cele verzi.', alternatives: ['Conchid că panglica verde de 6 cm este mai lungă decât cea de 9 cm.', 'Conchid că ambele au aceeași lungime fiindcă sunt panglici.'] },
        check: { correct: 'Aliniez capetele de început și verific că panglica de 9 cm o depășește pe cea de 6 cm cu 3 cm.', wrong: ['Preferința celor trei copii dovedește lungimea.', 'Gaura riglei dovedește că panglicile sunt egale.'] }
      },
      {
        context: 'Teo măsoară o bandă cu o riglă în centimetri. Banda începe la semnul 2 cm. Banda se termină la semnul 10 cm. Banda este albastră. Un coleg preferă benzile late.',
        question: 'Ce lungime are banda, fără a confunda capătul cu lungimea?',
        facts: [{ text: 'Banda începe la semnul 2 cm.', relevant: true }, { text: 'Banda se termină la semnul 10 cm.', relevant: true }, { text: 'Banda este albastră.', relevant: false }, { text: 'Un coleg preferă benzile late.', relevant: false }],
        plan: ['Citesc ambele repere: început 2 cm, sfârșit 10 cm.', 'Din repere calculez distanța: 10 − 2 = 8 cm.', 'Notez 8 cm și verific opt intervale de câte un centimetru între 2 și 10.'],
        error: { index: 1, wrong: 'Folosesc doar sfârșitul și declar lungimea 10 cm.', alternatives: ['Adun reperele și declar lungimea 12 cm.', 'Număr și ambele semne ca intervale și declar 9 cm.'] },
        check: { correct: 'Mut banda cu începutul la zero; capătul ajunge la 8 cm, aceeași lungime.', wrong: ['Verific doar culoarea benzii.', 'Preferința pentru benzi late confirmă lungimea de 10 cm.'] }
      },
      {
        context: 'O clasă verifică numărul cuburilor dintr-un bol. Lia numără fiecare cub o dată și găsește șapte. Doi colegi spun „șapte”, dar explică faptul că au copiat răspunsul Liei, fără să numere. Bolul este alb. Fereastra este închisă.',
        question: 'Avem trei numărări independente sau doar una?',
        facts: [{ text: 'Lia numără fiecare cub o dată și găsește șapte.', relevant: true }, { text: 'Doi colegi spun „șapte”, dar explică faptul că au copiat răspunsul Liei, fără să numere.', relevant: true }, { text: 'Bolul este alb.', relevant: false }, { text: 'Fereastra este închisă.', relevant: false }],
        plan: ['Identific metoda Liei: o numărare directă cu rezultatul șapte.', 'Compar metodele celorlalți cu a Liei: repetă răspunsul, nu fac numărări noi.', 'Conchid că există o singură numărare independentă și propun o renumărare separată pentru control.'],
        error: { index: 2, wrong: 'Număr trei voci și declar trei numărări independente.', alternatives: ['Declar că nimeni nu a numărat, ignorând numărarea Liei.', 'Declar că răspunsul trebuie să fie nouă fiindcă două voci au copiat.'] },
        check: { correct: 'Întreb ce a făcut fiecare: numai Lia a atins și numărat cuburile, deci numai una este o numărare independentă.', wrong: ['Cu cât răspunsul este repetat mai tare, cu atât sunt mai multe măsurători.', 'Bolul alb dovedește că trei voci înseamnă trei verificări.'] }
      }
    ]
  },
  'log-14': {
    titles: { evidence: 'Cine a publicat și când?', repair: 'Anunțul vechi nu decide azi', plan: 'Verificarea sursei cu un adult' },
    cases: [
      {
        context: 'Ina vrea să afle programul bibliotecii pentru sâmbăta aceasta. Un afiș de anul trecut spune „Deschis sâmbăta”. Anunțul bibliotecii pentru această săptămână spune „Închis sâmbăta pentru reparații”. Afișul vechi are litere mari. Ușa bibliotecii este maro.',
        question: 'Ce anunț se potrivește sâmbetei despre care întreabă Ina?',
        facts: [{ text: 'Un afiș de anul trecut spune „Deschis sâmbăta”.', relevant: true }, { text: 'Anunțul bibliotecii pentru această săptămână spune „Închis sâmbăta pentru reparații”.', relevant: true }, { text: 'Afișul vechi are litere mari.', relevant: false }, { text: 'Ușa bibliotecii este maro.', relevant: false }],
        plan: ['Citesc sursa și perioada celor două anunțuri: anul trecut și săptămâna aceasta.', 'Aleg pentru întrebarea de acum anunțul actual al bibliotecii, care spune închis.', 'Planific să nu merg sâmbătă pe baza lui și, cu un adult, pot cere bibliotecii confirmarea programului.'],
        error: { index: 1, wrong: 'Aleg afișul de anul trecut doar pentru că are litere mai mari.', alternatives: ['Declar că anul trecut și această săptămână sunt aceeași perioadă.', 'Declar că anunțul actual spune deschis, deși scrie închis.'] },
        check: { correct: 'Compar data vizată cu perioada anunțului actual și pot confirma direct la bibliotecă împreună cu un adult.', wrong: ['Mărimea literelor dovedește că un anunț este actual.', 'Culoarea ușii verifică programul de sâmbătă.'] }
      },
      {
        context: 'Teo caută informații despre un spectacol școlar. Două pagini spun aceeași oră, iar a doua precizează că a copiat prima pagină. Organizatorul nu a fost încă întrebat despre ora spectacolului de azi. Prima pagină are fundal roz. A doua are o stea în antet.',
        question: 'Sunt cele două pagini două confirmări independente ale orei de azi?',
        facts: [{ text: 'Două pagini spun aceeași oră, iar a doua precizează că a copiat prima pagină.', relevant: true }, { text: 'Organizatorul nu a fost încă întrebat despre ora spectacolului de azi.', relevant: true }, { text: 'Prima pagină are fundal roz.', relevant: false }, { text: 'A doua are o stea în antet.', relevant: false }],
        plan: ['Urmăresc proveniența mesajelor și observ copierea primei pagini.', 'Din proveniență deduc că nu sunt două confirmări independente și ora de azi rămâne de verificat.', 'Cer unui adult să verifice la organizator data și ora, fără să trimit date personale pe pagini.'],
        error: { index: 1, wrong: 'Declar două confirmări independente doar fiindcă sunt două adrese de pagini.', alternatives: ['Declar verificată ora de azi pe baza stelei din antet.', 'Declar că organizatorul a confirmat deja, deși nu a fost întrebat.'] },
        check: { correct: 'O confirmare directă de la organizator pentru ziua de azi ar fi o verificare nouă, nu încă o copie.', wrong: ['Deschid aceeași copie de două ori și obțin două surse independente.', 'Fundalul roz dovedește că informația este actuală.'] }
      },
      {
        context: 'Mara verifică un răspuns al unui program. Programul afirmă că expoziția de azi începe la 9, fără să arate o sursă. Mesajul muzeului datat pentru azi spune că expoziția începe la 11. Programul are o pictogramă zâmbitoare. Mesajul muzeului are chenar verde.',
        question: 'Ce oră este susținută de sursa potrivită și cum verificăm diferența?',
        facts: [{ text: 'Programul afirmă că expoziția de azi începe la 9, fără să arate o sursă.', relevant: true }, { text: 'Mesajul muzeului datat pentru azi spune că expoziția începe la 11.', relevant: true }, { text: 'Programul are o pictogramă zâmbitoare.', relevant: false }, { text: 'Mesajul muzeului are chenar verde.', relevant: false }],
        plan: ['Compar proveniența și data: răspuns fără sursă față de mesajul muzeului pentru azi.', 'Pe baza comparației păstrez ora 11 ca susținută de muzeu, nu ora 9 nesusținută.', 'Verific împreună cu un adult mesajul actual direct la muzeu și corectez răspunsul programului dacă se confirmă 11.'],
        error: { index: 1, wrong: 'Păstrez automat ora 9 pentru că un program nu ar putea greși.', alternatives: ['Aleg ora 10 ca medie, fără nicio sursă care să o anunțe.', 'Aleg ora 9 pentru că pictograma zâmbește.'] },
        check: { correct: 'Caut confirmarea muzeului pentru exact expoziția și ziua vizate; un program poate avea informații greșite.', wrong: ['Tonul sigur al programului înlocuiește verificarea sursei.', 'Chenarul verde este singurul motiv pentru alegerea orei 11.'] }
      }
    ]
  },
  'inf-1': {
    titles: { evidence: 'Urmele unei comenzi', repair: 'Intrarea confundată cu ieșirea', plan: 'De la tastă la rezultat' },
    cases: [
      {
        context: 'Ina folosește un program de scris cu litere mari, într-un câmp gol focalizat. Ina apasă tasta M pe tastatură. Programul afișează litera apăsată pe ecran. Biroul este maro. Mouse-ul stă pe un covoraș.',
        question: 'Cum ajunge litera M de la comandă la rezultat?',
        facts: [{ text: 'Ina apasă tasta M pe tastatură.', relevant: true }, { text: 'Programul afișează litera apăsată pe ecran.', relevant: true }, { text: 'Biroul este maro.', relevant: false }, { text: 'Mouse-ul stă pe un covoraș.', relevant: false }],
        plan: ['Identific intrarea: apăsarea tastei M la tastatură.', 'Urmăresc comanda primită: programul alege litera M pentru afișare.', 'Identific ieșirea: litera M vizibilă pe ecran.'],
        error: { index: 0, wrong: 'Numesc ecranul dispozitivul prin care Ina a apăsat tasta M.', alternatives: ['Numesc covorașul sursa comenzii M.', 'Declar că nu există intrare, deși Ina a apăsat M.'] },
        check: { correct: 'Leg tastatura de apăsare și ecranul de M afișat, cu programul între comandă și rezultat.', wrong: ['Biroul maro dovedește că litera vine din mouse.', 'Ecranul și programul sunt întotdeauna același obiect.'] }
      },
      {
        context: 'Radu înregistrează un clopoțel într-o aplicație pregătită cu un adult. Microfonul primește sunetul clopoțelului. Aplicația păstrează sunetul și, la redare, îl trimite în difuzor. Clopoțelul are panglică. Scaunul este verde.',
        question: 'Care este traseul sunetului în aplicație?',
        facts: [{ text: 'Microfonul primește sunetul clopoțelului.', relevant: true }, { text: 'Aplicația păstrează sunetul și, la redare, îl trimite în difuzor.', relevant: true }, { text: 'Clopoțelul are panglică.', relevant: false }, { text: 'Scaunul este verde.', relevant: false }],
        plan: ['Identific intrarea sonoră prin microfon.', 'După primire, aplicația păstrează înregistrarea pentru redare.', 'La redare identific ieșirea sonoră în difuzor și o compar cu clopoțelul.'],
        error: { index: 2, wrong: 'Numesc panglica ieșirea sonoră a calculatorului.', alternatives: ['Numesc scaunul dispozitivul care redă înregistrarea.', 'Declar că difuzorul este sursa de intrare care a înregistrat clopoțelul.'] },
        check: { correct: 'Clopoțelul este captat prin microfon, apoi înregistrarea redată se aude în difuzor.', wrong: ['Culoarea scaunului verifică sunetul înregistrat.', 'Orice obiect cu panglică este un dispozitiv de ieșire.'] }
      },
      {
        context: 'Lia testează un calculator simplu. Prin tastatură introduce calculul 4 + 5. Programul adună numerele și trimite rezultatul pe ecran. Carcasa este gri. Pe birou este o plantă.',
        question: 'Ce este intrare, ce este prelucrare și ce rezultat apare?',
        facts: [{ text: 'Prin tastatură introduce calculul 4 + 5.', relevant: true }, { text: 'Programul adună numerele și trimite rezultatul pe ecran.', relevant: true }, { text: 'Carcasa este gri.', relevant: false }, { text: 'Pe birou este o plantă.', relevant: false }],
        plan: ['Citesc intrarea transmisă de tastatură: 4 + 5.', 'Urmăresc prelucrarea acelei intrări: programul calculează suma 9.', 'Caut ieșirea 9 pe ecran și o verific numărând două grupe de 4 și 5 obiecte.'],
        error: { index: 1, wrong: 'Afirm că programul adună 4 și 5 și obține 8.', alternatives: ['Scad 5 din 4 deși comanda introdusă cere adunare.', 'Declar că planta calculează suma în locul programului.'] },
        check: { correct: 'Patru jetoane și încă cinci dau nouă; compar nouă cu rezultatul de pe ecran.', wrong: ['Cred orice număr afișat fără să verific calculul.', 'Carcasa gri garantează că rezultatul este 8.'] }
      }
    ]
  },
  'inf-2': {
    titles: { evidence: 'Conturul care primește comanda', repair: 'Tasta cu efect nepotrivit', plan: 'Navighez și corectez textul' },
    cases: [
      {
        context: 'Pe o pagină, Tab mută focalizarea înainte între butoane, iar Enter activează butonul focalizat. Butonul Joacă are acum conturul de focalizare. Ina vrea să activeze Joacă fără mouse. Mouse-ul este negru. Fundalul paginii este crem.',
        question: 'Ce comandă activează butonul dorit?',
        facts: [{ text: 'Butonul Joacă are acum conturul de focalizare.', relevant: true }, { text: 'Ina vrea să activeze Joacă fără mouse.', relevant: true }, { text: 'Mouse-ul este negru.', relevant: false }, { text: 'Fundalul paginii este crem.', relevant: false }],
        plan: ['Identific butonul cu contur: Joacă.', 'Fiind deja pe butonul dorit, apăs Enter pentru activare.', 'Verific că s-a deschis jocul, fără apăsări repetate la întâmplare.'],
        error: { index: 1, wrong: 'Apăs Tab pentru a activa Joacă, deși Tab mută focalizarea.', alternatives: ['Apăs Backspace ca și cum ar activa butonul Joacă.', 'Mut focalizarea de pe Joacă înainte de Enter și pretind că activez tot Joacă.'] },
        check: { correct: 'Observ deschiderea jocului după Enter pe Joacă; aceasta confirmă activarea cerută.', wrong: ['Culoarea mouse-ului confirmă ce buton a fost activat.', 'Orice schimbare de contur înseamnă că jocul a pornit.'] }
      },
      {
        context: 'O pagină are butoanele în ordinea Start, Ajutor, Sunet. Focalizarea este pe Sunet, imediat după Ajutor. Teo vrea Ajutor; Shift + Tab revine un buton, iar Enter îl activează. Pagina are o ilustrație cu munți. Tastatura este albă.',
        question: 'Cum deschide Teo Ajutor folosind tastatura?',
        facts: [{ text: 'Focalizarea este pe Sunet, imediat după Ajutor.', relevant: true }, { text: 'Teo vrea Ajutor; Shift + Tab revine un buton, iar Enter îl activează.', relevant: true }, { text: 'Pagina are o ilustrație cu munți.', relevant: false }, { text: 'Tastatura este albă.', relevant: false }],
        plan: ['Privesc conturul de pe Sunet și identific Ajutor ca butonul anterior.', 'Revin cu Shift + Tab o singură dată și verific conturul pe Ajutor.', 'Cu Ajutor focalizat apăs Enter și verific apariția instrucțiunilor.'],
        error: { index: 1, wrong: 'Apăs Enter pe Sunet înainte să mut focalizarea la Ajutor.', alternatives: ['Apăs Shift + Tab de două ori și ajung la Start în loc de Ajutor.', 'Apăs Caps Lock ca și cum ar muta focalizarea la Ajutor.'] },
        check: { correct: 'Conturul este pe Ajutor înainte de Enter, iar după activare apar instrucțiunile.', wrong: ['Ajunge ca mouse-ul să fie desenat lângă Ajutor, indiferent de focalizare.', 'Munții din imagine dovedesc că s-a deschis Ajutor.'] }
      },
      {
        context: 'Într-un câmp de text focalizat este scris „maraa”, fără selecție, cu cursorul la final. Ținta exactă este „mara vine”. Backspace șterge caracterul din stânga cursorului, Spațiu introduce un spațiu, iar literele tastate se adaugă la cursor. Chenarul este albastru. În colț este un soare desenat. Corectăm întâi litera în plus, apoi adăugăm restul.',
        question: 'Cum obținem exact textul cerut?',
        facts: [{ text: 'Într-un câmp de text focalizat este scris „maraa”, fără selecție, cu cursorul la final.', relevant: true }, { text: 'Ținta exactă este „mara vine”.', relevant: true }, { text: 'Chenarul este albastru.', relevant: false }, { text: 'În colț este un soare desenat.', relevant: false }],
        plan: ['Apăs Backspace o dată la final și obțin „mara”.', 'După „mara” introduc un Spațiu, apoi tastez „vine”.', 'Recitesc „mara vine” și verific un singur spațiu și nicio literă în plus.'],
        error: { index: 0, wrong: 'Apăs Backspace de două ori și obțin „mar”, ștergând și o literă necesară.', alternatives: ['Tastez încă un „a” și obțin „maraaa”.', 'Apăs Spațiu înainte să șterg litera în plus și păstrez „maraa”.'] },
        check: { correct: 'Compar caracter cu caracter cu „mara vine”: patru litere, un spațiu, apoi patru litere.', wrong: ['Textul este corect dacă începe cu m, indiferent de rest.', 'Chenarul albastru dovedește că nu sunt litere în plus.'] }
      }
    ]
  },
  'inf-3': {
    titles: { evidence: 'De ce depinde pasul?', repair: 'Instrucțiunea imposibilă', plan: 'Rețeta pașilor clari' },
    cases: [
      {
        context: 'Ina face o felicitare dintr-o foaie întreagă, neîndoită. Ordinea aleasă este: îndoaie foaia, desenează pe fața obținută, deschide și scrie salutul în interior. Materialele sunt o foaie și un creion, iar salutul cerut este „Bună!”. Foaia este galbenă. Masa are sertar.',
        question: 'Cum execută Ina felicitarea în ordinea aleasă?',
        facts: [{ text: 'Ordinea aleasă este: îndoaie foaia, desenează pe fața obținută, deschide și scrie salutul în interior.', relevant: true }, { text: 'Materialele sunt o foaie și un creion, iar salutul cerut este „Bună!”.', relevant: true }, { text: 'Foaia este galbenă.', relevant: false }, { text: 'Masa are sertar.', relevant: false }],
        plan: ['Îndoi foaia întreagă în două pentru a obține felicitarea.', 'Pe fața felicitării îndoite desenez cu creionul.', 'Deschid felicitarea desenată și scriu „Bună!” în interior; verific locul salutului.'],
        error: { index: 1, wrong: 'Sar peste desen și declar că fața cerută este deja desenată.', alternatives: ['Desfac foaia și rup fața pe care trebuia desenat.', 'Scriu numai salutul în interior în loc să fac desenul cerut la acest pas.'] },
        check: { correct: 'Verific o foaie îndoită, desen pe față și „Bună!” în interior, realizate în ordinea cerută.', wrong: ['Orice foaie galbenă este deja felicitarea cerută.', 'Sertarul mesei dovedește că salutul este în interior.'] }
      },
      {
        context: 'Teo plantează o sămânță cu un adult, în pământ potrivit. Ghiveciul gol și sămânța sunt pregătite. Ordinea cerută este: pune pământ și fă o adâncitură; așază sămânța; acoperă cu puțin pământ și udă ușor. Ghiveciul are buline. Adultul poartă mănuși verzi.',
        question: 'Cum pregătim un loc înainte de a acoperi sămânța?',
        facts: [{ text: 'Ghiveciul gol și sămânța sunt pregătite.', relevant: true }, { text: 'Ordinea cerută este: pune pământ și fă o adâncitură; așază sămânța; acoperă cu puțin pământ și udă ușor.', relevant: true }, { text: 'Ghiveciul are buline.', relevant: false }, { text: 'Adultul poartă mănuși verzi.', relevant: false }],
        plan: ['Pun pământ în ghiveciul gol și fac o adâncitură.', 'În adâncitura pregătită așez sămânța.', 'Acopăr sămânța așezată cu puțin pământ și ud ușor cu adultul; verific ordinea.'],
        error: { index: 0, wrong: 'Pun sămânța direct pe fundul gol și declar că am pregătit pământul și adâncitura.', alternatives: ['Umplu ghiveciul numai cu apă în loc să pregătesc pământul.', 'Acopăr locul fără să pun pământ sau să fac adâncitura cerută.'] },
        check: { correct: 'Urmăresc jurnalul pașilor: adâncitura a existat înainte de sămânță, iar acoperirea a urmat așezării ei.', wrong: ['Bulinele ghiveciului confirmă ordinea plantării.', 'Dacă sămânța nu se vede, orice ordine folosită este cea cerută.'] }
      },
      {
        context: 'Mara construiește un pod din trei cuburi: două suporturi și un cub lung drept grindă. Cuburile suport trebuie să fie separate, cu loc între ele. Ordinea aleasă este: așază suporturile, pune grinda pe ambele, treci un pion mic prin spațiul de dedesubt. Pionul este roșu. Covorul este moale.',
        question: 'Cum construim și testăm podul în ordinea dată?',
        facts: [{ text: 'Cuburile suport trebuie să fie separate, cu loc între ele.', relevant: true }, { text: 'Ordinea aleasă este: așază suporturile, pune grinda pe ambele, treci un pion mic prin spațiul de dedesubt.', relevant: true }, { text: 'Pionul este roșu.', relevant: false }, { text: 'Covorul este moale.', relevant: false }],
        plan: ['Așez cele două suporturi separate, lăsând un spațiu pentru pion.', 'Pe suporturile așezate pun grinda astfel încât să se sprijine pe ambele.', 'Trec pionul mic prin spațiul podului și verific că grinda rămâne pe suporturi.'],
        error: { index: 1, wrong: 'Pun grinda lângă suporturi, fără să se sprijine pe ele.', alternatives: ['Scot ambele suporturi și declar podul construit.', 'Pun grinda în spațiul de trecere, blocând drumul pionului.'] },
        check: { correct: 'Grinda atinge ambele suporturi, iar pionul trece pe sub ea fără să dărâme podul.', wrong: ['Pionul roșu garantează că orice aranjament este un pod.', 'Număr trei cuburi fără să verific sprijinul sau trecerea.'] }
      }
    ]
  },
  'inf-4': {
    titles: { evidence: 'Jurnalul robotului testat', repair: 'Prima abatere din program', plan: 'Corectez și rulez din nou' },
    cases: [
      {
        context: 'Grila este x = 1…3 spre dreapta, y = 1…2 în jos; direcțiile sunt absolute, fără rotire, câte o căsuță pe pas. Toate căsuțele sunt libere. Robotul pornește la (1,1) și trebuie la (3,1). Programul greșit este dreapta, jos. Robotul are antenă. Tabla este albă. Testăm, schimbăm doar a doua comandă, apoi retestăm.',
        question: 'Ce comandă repară programul?',
        facts: [{ text: 'Robotul pornește la (1,1) și trebuie la (3,1).', relevant: true }, { text: 'Programul greșit este dreapta, jos.', relevant: true }, { text: 'Robotul are antenă.', relevant: false }, { text: 'Tabla este albă.', relevant: false }],
        plan: ['Testez dreapta, jos: robotul ajunge la (2,2), nu la țintă.', 'Din test găsesc a doua comandă nepotrivită și schimb jos în dreapta.', 'Resetez la (1,1), rulez dreapta, dreapta și verific sosirea la (3,1).'],
        error: { index: 1, wrong: 'Schimb a doua comandă în stânga și îl trimit înapoi la start.', alternatives: ['Păstrez jos, deși testul s-a terminat la (2,2).', 'Schimb a doua comandă în sus, ieșind la (2,0).'] },
        check: { correct: 'La retestare vizitez (2,1), apoi (3,1), ambele în grilă; ultima este ținta.', wrong: ['Dacă prima comandă este bună, a doua nu mai contează.', 'Antena robotului dovedește că programul este corect.'] }
      },
      {
        context: 'Grila are x = 1…3 spre dreapta și y = 1…3 în jos; fiecare comandă absolută mută un vecin, fără rotire. Toate căsuțele sunt libere. Startul este (2,1), ținta este (2,3). Programul este jos, dreapta, jos. Pionul este gri. Rama este rotundă. Testăm, corectăm prin ștergerea comenzii inutile, apoi retestăm.',
        question: 'Ce comandă trebuie ștearsă pentru a ajunge la țintă?',
        facts: [{ text: 'Startul este (2,1), ținta este (2,3).', relevant: true }, { text: 'Programul este jos, dreapta, jos.', relevant: true }, { text: 'Pionul este gri.', relevant: false }, { text: 'Rama este rotundă.', relevant: false }],
        plan: ['Testez: jos duce la (2,2), dreapta la (3,2), jos la (3,3).', 'Compar cu ținta și șterg dreapta, prima abatere spre coloana 3.', 'Reiau de la (2,1) programul jos, jos și verific oprirea la (2,3).'],
        error: { index: 1, wrong: 'Șterg prima comandă jos și păstrez dreapta, jos, care ajunge la (3,2).', alternatives: ['Șterg ultima comandă jos și păstrez jos, dreapta, care ajunge la (3,2).', 'Nu șterg nimic și declar (3,3) egal cu (2,3).'] },
        check: { correct: 'Programul rămas păstrează x = 2 și crește y de la 1 la 3 în doi pași.', wrong: ['Orice program mai scurt este automat corect.', 'Rama rotundă arată că orice coloană este bună.'] }
      },
      {
        context: 'Grila are x = 1…4 spre dreapta, y = 1…3 în jos; comenzile absolute mută un vecin, fără rotire. Startul este (1,2), ținta (4,2), iar (2,2) este blocată; restul este liber. Programul de test este sus, dreapta, dreapta, jos, dreapta. Pionul are două roți desenate. Tabla are colțuri rotunjite. Ocolul cerut trece pe rândul y = 1; depanăm schimbând ordinea ultimelor două comenzi.',
        question: 'Cum reparăm ordinea finală ca să evităm blocajul și să ajungem la țintă?',
        facts: [{ text: 'Startul este (1,2), ținta (4,2), iar (2,2) este blocată; restul este liber.', relevant: true }, { text: 'Programul de test este sus, dreapta, dreapta, jos, dreapta.', relevant: true }, { text: 'Pionul are două roți desenate.', relevant: false }, { text: 'Tabla are colțuri rotunjite.', relevant: false }],
        plan: ['Testez primele trei comenzi și ajung la (3,1); observ că jos coboară înainte de capătul ocolului cerut.', 'După (3,1) schimb ultimele două comenzi în dreapta, jos, ca să închei rândul de sus la (4,1).', 'Resetez și rulez sus, dreapta, dreapta, dreapta, jos: ajung la (4,2) fără obstacol, pe ocolul cerut.'],
        error: { index: 1, wrong: 'Schimb ultimele două comenzi în stânga, jos și intru în (2,2), blocată.', alternatives: ['Schimb ultimele două comenzi în sus, dreapta și ies la y = 0.', 'Schimb ultimele două comenzi în dreapta, dreapta și ies la x = 5.'] },
        check: { correct: 'Trasez (1,1), (2,1), (3,1), (4,1), (4,2): toate sunt libere și ocolul rămâne sus până la coloana 4.', wrong: ['Numărul de comenzi este suficient, indiferent de ordinea lor.', 'Roțile desenate permit să sar peste căsuța blocată.'] }
      }
    ]
  },
  'inf-5': {
    titles: { evidence: 'Numărul de la granița regulii', repair: 'Filtrul care include prea mult', plan: 'Aplic aceeași condiție tuturor' },
    cases: [
      {
        context: 'Un program sortează cartonașe. Cartonașele sunt 7 și 10. Grupa A cere numere mai mici decât 10; grupa B primește restul. Cartonașele sunt lucioase. Cutia are etichetă albastră. Verificăm 7 înainte de 10.',
        question: 'Unde ajunge fiecare cartonaș?',
        facts: [{ text: 'Cartonașele sunt 7 și 10.', relevant: true }, { text: 'Grupa A cere numere mai mici decât 10; grupa B primește restul.', relevant: true }, { text: 'Cartonașele sunt lucioase.', relevant: false }, { text: 'Cutia are etichetă albastră.', relevant: false }],
        plan: ['Compar 7 cu 10: 7 este mai mic, deci îl pun în A.', 'Aplic aceeași regulă lui 10: nu este mai mic decât 10, deci îl pun în B.', 'Verific A = {7}, B = {10}, fără să includ limita în A.'],
        error: { index: 1, wrong: 'Pun 10 în A, tratând „mai mic” ca „mai mic sau egal”.', alternatives: ['Pun 10 în ambele grupe, deși grupele sunt separate.', 'Omit cartonașul 10 și declar sortarea completă.'] },
        check: { correct: 'Întreb pentru fiecare „este mai mic decât 10?”: da pentru 7, nu pentru 10.', wrong: ['Citesc numai prima cifră a fiecărui număr.', 'Luciu pe cartonaș înseamnă apartenență la A.'] }
      },
      {
        context: 'Într-un joc schimbăm filtrul. Cartonașele sunt 8, 12 și 15. Filtrul vechi cere mai mic decât 12, iar cel nou cere cel mult 12. Tabla este mov. Pixul este cu capac. Aplicăm întâi filtrul vechi, apoi pe cel nou.',
        question: 'Ce cartonaș intră în plus după schimbarea filtrului?',
        facts: [{ text: 'Cartonașele sunt 8, 12 și 15.', relevant: true }, { text: 'Filtrul vechi cere mai mic decât 12, iar cel nou cere cel mult 12.', relevant: true }, { text: 'Tabla este mov.', relevant: false }, { text: 'Pixul este cu capac.', relevant: false }],
        plan: ['Aplic filtrul vechi: numai 8 este mai mic decât 12.', 'Reiau cartonașele după „cel mult 12”: accept 8 și 12, resping 15.', 'Compar rezultatele și identific 12 drept singurul cartonaș adăugat.'],
        error: { index: 2, wrong: 'Declar 15 drept cartonașul adăugat, deși depășește 12.', alternatives: ['Declar că 8 este nou adăugat, deși era deja acceptat.', 'Declar că nu se schimbă nimic, ignorând includerea lui 12.'] },
        check: { correct: '8 rămâne acceptat, 15 rămâne respins, iar 12 trece de la respins la acceptat.', wrong: ['Culoarea tablei hotărăște dacă limita este inclusă.', 'Orice număr cu două cifre este cel mult 12.'] }
      },
      {
        context: 'Un filtru verifică două condiții. Numerele de test sunt 10, 14 și 17. Sunt acceptate numai numerele pare și mai mari decât 10. Plicul este verde. Pe masă este un calendar. Verificăm întâi paritatea, apoi limita.',
        question: 'Ce număr trece ambele verificări?',
        facts: [{ text: 'Numerele de test sunt 10, 14 și 17.', relevant: true }, { text: 'Sunt acceptate numai numerele pare și mai mari decât 10.', relevant: true }, { text: 'Plicul este verde.', relevant: false }, { text: 'Pe masă este un calendar.', relevant: false }],
        plan: ['Verific paritatea: 10 și 14 sunt pare, 17 este impar și se respinge.', 'Dintre cele pare verific limita: 10 nu este mai mare decât 10, dar 14 este.', 'Accept numai 14 și verific că are ambele proprietăți.'],
        error: { index: 1, wrong: 'Accept 10 fiindcă este egal cu 10, deși regula cere mai mare.', alternatives: ['Resping 14 fiindcă 14 este mai mare decât 10.', 'Readuc 17 în grupa acceptată ignorând condiția de paritate.'] },
        check: { correct: '14 se împarte în două grupe de 7 fără rest și 14 > 10; ceilalți pierd câte o condiție.', wrong: ['Este suficient să fie par sau mai mare decât 10.', 'Plicul verde verifică ambele condiții numerice.'] }
      }
    ]
  },
  'inf-6': {
    titles: { evidence: 'Rutina are un scop', repair: 'Pasul făcut prea devreme', plan: 'Programul zilei cu loc de pauză' },
    cases: [
      {
        context: 'Ina pregătește ghiozdanul pentru desen. Lista pentru mâine cere caietul de desen și creioanele. Rutina aleasă pentru această seară este: citește lista, pune materialele cerute, închide ghiozdanul după verificare. Ghiozdanul este roșu. Ceasul are cadran rotund.',
        question: 'Cum pregătește Ina materialele fără să închidă ghiozdanul prea devreme?',
        facts: [{ text: 'Lista pentru mâine cere caietul de desen și creioanele.', relevant: true }, { text: 'Rutina aleasă pentru această seară este: citește lista, pune materialele cerute, închide ghiozdanul după verificare.', relevant: true }, { text: 'Ghiozdanul este roșu.', relevant: false }, { text: 'Ceasul are cadran rotund.', relevant: false }],
        plan: ['Citesc lista și identific caietul de desen și creioanele.', 'Pun materialele identificate în ghiozdan.', 'Verific prezența ambelor materiale, apoi închid ghiozdanul.'],
        error: { index: 1, wrong: 'Pun numai caietul și las creioanele afară, deși sunt pe listă.', alternatives: ['Închid ghiozdanul gol în loc să pun materialele.', 'Pun un prosop în locul ambelor materiale cerute.'] },
        check: { correct: 'Compar conținutul cu lista: caietul de desen și creioanele sunt înăuntru înainte de închidere.', wrong: ['Culoarea roșie dovedește că ghiozdanul este complet.', 'Dacă fermoarul se închide, sigur nu lipsește nimic.'] }
      },
      {
        context: 'Radu merge la o activitate după-amiază. Plecarea este la ora 15, iar materialele trebuie să fie gata înainte de plecare. Radu a ales pentru azi: pregătire la 14:30, pauză la 14:40, plecare la 15. Geaca este albastră. Pe hol este o oglindă.',
        question: 'Cum păstrează planul ales și dependența pregătirii de plecare?',
        facts: [{ text: 'Plecarea este la ora 15, iar materialele trebuie să fie gata înainte de plecare.', relevant: true }, { text: 'Radu a ales pentru azi: pregătire la 14:30, pauză la 14:40, plecare la 15.', relevant: true }, { text: 'Geaca este albastră.', relevant: false }, { text: 'Pe hol este o oglindă.', relevant: false }],
        plan: ['La 14:30 pregătesc materialele pentru a fi gata înainte de 15.', 'După pregătire iau pauza aleasă la 14:40.', 'După pauză plec la 15 cu materialele pregătite și verific că ordinea aleasă a fost respectată.'],
        error: { index: 0, wrong: 'Amân pregătirea până la 15:10, după plecarea de la 15.', alternatives: ['Elimin pregătirea materialelor și presupun că sunt în bagaj.', 'Plec la 14:20 fără materiale, înainte de pregătirea aleasă.'] },
        check: { correct: 'Pe axa timpului, 14:30 este înainte de 14:40 și ambele înainte de 15; materialele sunt gata la plecare.', wrong: ['Toate familiile trebuie să pregătească materialele exact la 14:30.', 'Oglinda de pe hol confirmă prezența materialelor în bagaj.'] }
      },
      {
        context: 'Mara adaptează rutina pentru un atelier. Lista atelierului de azi cere plastilină, nu acuarele. Planul vechi punea acuarele în geantă; planul nou ales este: citește lista actuală, schimbă materialul, verifică și ia o pauză înainte de plecare. Geanta are buzunar. Camera are perdele verzi.',
        question: 'Cum adaptăm rutina fără să păstrăm materialul nepotrivit?',
        facts: [{ text: 'Lista atelierului de azi cere plastilină, nu acuarele.', relevant: true }, { text: 'Planul vechi punea acuarele în geantă; planul nou ales este: citește lista actuală, schimbă materialul, verifică și ia o pauză înainte de plecare.', relevant: true }, { text: 'Geanta are buzunar.', relevant: false }, { text: 'Camera are perdele verzi.', relevant: false }],
        plan: ['Citesc lista actuală și observ că cere plastilină în loc de acuarele.', 'După lista citită scot acuarelele și pun plastilina în geantă.', 'Verific plastilina în geantă, apoi iau pauza prevăzută înainte de plecare.'],
        error: { index: 1, wrong: 'Păstrez doar acuarelele, ignorând lista actuală care cere plastilină.', alternatives: ['Scot acuarelele și las geanta fără plastilină.', 'Pun o carte în locul plastilinei cerute.'] },
        check: { correct: 'Compar materialul pregătit cu lista de azi, nu cu planul vechi: plastilina este prezentă, iar pauza rămâne în rutină.', wrong: ['O rutină veche nu trebuie schimbată nici dacă se schimbă cerința.', 'Buzunarul genții dovedește că înăuntru este plastilină.'] }
      }
    ]
  },
  'inf-7': {
    titles: { evidence: 'Câte repetări încap pe hartă?', repair: 'Bucla cu un pas în plus', plan: 'Desfac repetarea în pași' },
    cases: [
      {
        context: 'Grila are x = 1…4 spre dreapta și y = 1…2 în jos, fără obstacole. Direcțiile sunt absolute, fără rotire; fiecare repetare mută o singură căsuță vecină. Robotul pornește la (1,1) și ținta este (4,1). Comanda aleasă pentru repetare este dreapta. Robotul este portocaliu. Tabla are mâner.',
        question: 'De câte ori repetăm dreapta pentru a opri exact la țintă?',
        facts: [{ text: 'Robotul pornește la (1,1) și ținta este (4,1).', relevant: true }, { text: 'Comanda aleasă pentru repetare este dreapta.', relevant: true }, { text: 'Robotul este portocaliu.', relevant: false }, { text: 'Tabla are mâner.', relevant: false }],
        plan: ['Număr distanța pe orizontală: 4 − 1 = 3 pași.', 'Folosesc distanța și scriu „repetă dreapta de 3 ori”.', 'Desfac repetarea: (2,1), (3,1), (4,1); verific oprirea exactă.'],
        error: { index: 1, wrong: 'Repet dreapta de 4 ori și ies în (5,1), în afara grilei.', alternatives: ['Repet dreapta de 2 ori și mă opresc la (3,1).', 'Repet stânga de 3 ori și ies din grilă.'] },
        check: { correct: 'Sunt trei mutări, nu patru căsuțe numărate cu tot cu start; ultima poziție este (4,1).', wrong: ['Număr și startul ca primă mutare, deci cer patru pași.', 'Mânerul tablei arată numărul repetărilor.'] }
      },
      {
        context: 'Grila are x = 1…3 spre dreapta, y = 1…4 în jos; mișcări absolute la vecin, fără rotire. Startul este (2,1), ținta (2,4). Căsuța (2,3) este blocată; restul este liber. Pionul are pălărie desenată. Tabla este gri. Testăm propunerea „jos de 3 ori” înainte să o folosim.',
        question: 'Poate fi executată în siguranță repetarea propusă?',
        facts: [{ text: 'Startul este (2,1), ținta (2,4).', relevant: true }, { text: 'Căsuța (2,3) este blocată; restul este liber.', relevant: true }, { text: 'Pionul are pălărie desenată.', relevant: false }, { text: 'Tabla este gri.', relevant: false }],
        plan: ['Desfac propunerea în jos, jos, jos și verific prima mutare la (2,2), liberă.', 'Continui verificarea cu a doua mutare: ar intra în (2,3), blocată.', 'Resping repetarea ca nesigură: chiar dacă numără trei pași până la țintă, al doilea nu este permis.'],
        error: { index: 2, wrong: 'Accept repetarea fiindcă ținta este la trei pași, ignorând căsuța blocată.', alternatives: ['Declar că repetarea sare direct peste toate căsuțele intermediare.', 'Declar liberă căsuța (2,3), deși harta o arată blocată.'] },
        check: { correct: 'Simulez fiecare mutare, nu un salt: a doua atinge (2,3), deci programul trebuie schimbat înainte de rulare.', wrong: ['Verific numai ținta și ignor interiorul repetării.', 'Pălăria pionului îl lasă să treacă prin obstacole.'] }
      },
      {
        context: 'Grila are x = 1…4 spre dreapta și y = 1…3 în jos; fără obstacole, fără rotire, câte un vecin pe comandă absolută. Startul este (1,1), ținta (4,3). Ordinea aleasă este întâi toate mutările dreapta, apoi toate mutările jos. Robotul are ochi albaștri. Grila este pe carton.',
        question: 'Ce două repetări descriu exact traseul ales?',
        facts: [{ text: 'Startul este (1,1), ținta (4,3).', relevant: true }, { text: 'Ordinea aleasă este întâi toate mutările dreapta, apoi toate mutările jos.', relevant: true }, { text: 'Robotul are ochi albaștri.', relevant: false }, { text: 'Grila este pe carton.', relevant: false }],
        plan: ['Calculez distanțele: 4 − 1 = 3 spre dreapta și 3 − 1 = 2 în jos.', 'După calcule execut dreapta de 3 ori și ajung la (4,1).', 'Din (4,1) execut jos de 2 ori până la (4,3) și verific cele 5 mutări.'],
        error: { index: 2, wrong: 'Din (4,1) repet jos de 3 ori și ies în (4,4), în afara grilei.', alternatives: ['Din (4,1) repet jos o dată și mă opresc prea devreme la (4,2).', 'Din (4,1) repet dreapta de două ori și ies din grilă.'] },
        check: { correct: 'Desfac cele două bucle: (2,1), (3,1), (4,1), (4,2), (4,3), toate în grilă.', wrong: ['Inversarea direcțiilor înseamnă mereu aceeași ordine cerută.', 'Număr doar două bucle și declar că robotul a făcut două mutări.'] }
      }
    ]
  },
  'inf-8': {
    titles: { evidence: 'Condiția înaintea acțiunii', repair: 'Ramura aleasă pe dos', plan: 'Dacă se potrivește, atunci…' },
    cases: [
      {
        context: 'Un personaj se pregătește să iasă. Regula jocului este: dacă plouă, ia umbrela; altfel, lasă umbrela în suport. Scena arată că plouă. Umbrela este mov. Suportul are buline.',
        question: 'Ce acțiune cere regula în scena dată?',
        facts: [{ text: 'Regula jocului este: dacă plouă, ia umbrela; altfel, lasă umbrela în suport.', relevant: true }, { text: 'Scena arată că plouă.', relevant: true }, { text: 'Umbrela este mov.', relevant: false }, { text: 'Suportul are buline.', relevant: false }],
        plan: ['Citesc condiția din regulă: plouă sau nu plouă?', 'Compar scena cu ea: plouă, deci condiția este îndeplinită.', 'Aleg ramura adevărată: personajul ia umbrela, apoi verific potrivirea cu scena.'],
        error: { index: 2, wrong: 'Aleg ramura fără ploaie și las umbrela în suport.', alternatives: ['Declar că regula cere o pălărie în locul umbrelei.', 'Refuz orice acțiune deși condiția și ambele ramuri sunt cunoscute.'] },
        check: { correct: 'Înlocuiesc în regulă „dacă plouă” cu observația adevărată: rezultă „ia umbrela”.', wrong: ['Culoarea mov decide ramura, indiferent de vreme.', 'Dacă umbrela există, regula cere mereu să o lăsăm.'] }
      },
      {
        context: 'Un robot sortează piese pe o masă. Regula este: dacă piesa este rotundă, pune-o în A; altfel, pune-o în B. Piesa curentă este un pătrat, nu este rotundă. Piesa este galbenă. Robotul are o antenă.',
        question: 'În ce cutie ajunge piesa potrivit regulii?',
        facts: [{ text: 'Regula este: dacă piesa este rotundă, pune-o în A; altfel, pune-o în B.', relevant: true }, { text: 'Piesa curentă este un pătrat, nu este rotundă.', relevant: true }, { text: 'Piesa este galbenă.', relevant: false }, { text: 'Robotul are o antenă.', relevant: false }],
        plan: ['Identific cerința condiției: piesa trebuie să fie rotundă.', 'Testez piesa pătrată: condiția este falsă.', 'Urmez ramura „altfel” găsită și pun pătratul în B.'],
        error: { index: 1, wrong: 'Declar condiția adevărată fiindcă pătratul este galben.', alternatives: ['Declar pătratul rotund doar pentru că îl rotim pe masă.', 'Declar că antena robotului face orice piesă rotundă.'] },
        check: { correct: 'Conturul pătratului nu este rotund; regula trimite orice piesă nerotundă în B.', wrong: ['Piesele galbene merg mereu în A, deși regula nu spune asta.', 'O rotire schimbă automat un pătrat în cerc.'] }
      },
      {
        context: 'O jucărie are două stări posibile de baterie: sub 3 bare sau cel puțin 3 bare. Regula este: sub 3 bare, cere adultului încărcarea; altfel, pornește jocul. Indicatorul arată exact 3 bare. Carcasa este verde. Pe capac este o stea.',
        question: 'Ce ramură se execută chiar la limita de 3 bare?',
        facts: [{ text: 'Regula este: sub 3 bare, cere adultului încărcarea; altfel, pornește jocul.', relevant: true }, { text: 'Indicatorul arată exact 3 bare.', relevant: true }, { text: 'Carcasa este verde.', relevant: false }, { text: 'Pe capac este o stea.', relevant: false }],
        plan: ['Citesc limita strictă a condiției: mai puțin de 3 bare.', 'Compar cele 3 bare cu limita: 3 nu este mai mic decât 3, deci condiția este falsă.', 'Aleg „altfel” și pornesc jocul conform regulii acestei jucării.'],
        error: { index: 1, wrong: 'Consider că exact 3 bare înseamnă mai puțin de 3.', alternatives: ['Ignor indicatorul și decid condiția după steaua de pe capac.', 'Adun culoarea verde la numărul barelor și declar că sunt doar două.'] },
        check: { correct: 'Testez vecinii limitei: 2 ar cere încărcare; 3 este deja în ramura „altfel”, ca orice valoare cel puțin 3.', wrong: ['Toate jucăriile trebuie să aibă exact aceeași regulă de încărcare.', 'Steaua de pe capac dovedește că bateria este sub limită.'] }
      }
    ]
  },
  'inf-9': {
    titles: { evidence: 'Semnalele mesajului nesigur', repair: 'Oprește răspunsul riscant', plan: 'Pauză, sprijin și verificare' },
    cases: [
      {
        context: 'Un personaj primește un mesaj în joc. Un necunoscut îi cere adresa de acasă pentru un „premiu”. Personajul poate opri conversația și poate cere ajutor unui adult de încredere, fără să răspundă. Mesajul are fundal roz. Avatarul expeditorului poartă o coroană.',
        question: 'Cum protejează personajul informațiile personale?',
        facts: [{ text: 'Un necunoscut îi cere adresa de acasă pentru un „premiu”.', relevant: true }, { text: 'Personajul poate opri conversația și poate cere ajutor unui adult de încredere, fără să răspundă.', relevant: true }, { text: 'Mesajul are fundal roz.', relevant: false }, { text: 'Avatarul expeditorului poartă o coroană.', relevant: false }],
        plan: ['Recunosc cererea de adresă drept cerere de informație personală și nu o trimit.', 'După oprirea răspunsului cer ajutor unui adult de încredere și îi arăt mesajul.', 'Cu adultul folosesc raportarea sau blocarea potrivită și verific că adresa nu a fost trimisă.'],
        error: { index: 0, wrong: 'Trimit adresa pentru a afla dacă premiul este adevărat.', alternatives: ['Trimit adresa unui prieten în locul adresei personajului.', 'Public adresa în chat ca să voteze ceilalți dacă este sigur.'] },
        check: { correct: 'Istoricul nu conține o adresă trimisă, conversația este oprită și un adult de încredere ajută la următorul pas.', wrong: ['Coroana avatarului dovedește că persoana este sigură.', 'Promisiunea unui premiu permite trimiterea oricăror date personale.'] }
      },
      {
        context: 'Lia vede un mesaj neașteptat. Mesajul spune „Apasă linkul acum și scrie parola ca să nu pierzi jocul”. Lia nu a cerut acest mesaj și poate verifica jocul cu un adult prin aplicația cunoscută, fără link. Butonul mesajului este verde. În colț este desenată o rachetă.',
        question: 'Cum verifică Lia fără să ofere parola sau să urmeze linkul?',
        facts: [{ text: 'Mesajul spune „Apasă linkul acum și scrie parola ca să nu pierzi jocul”.', relevant: true }, { text: 'Lia nu a cerut acest mesaj și poate verifica jocul cu un adult prin aplicația cunoscută, fără link.', relevant: true }, { text: 'Butonul mesajului este verde.', relevant: false }, { text: 'În colț este desenată o rachetă.', relevant: false }],
        plan: ['Observ graba și cererea parolei; nu apăs linkul și nu scriu parola.', 'După oprire îi arăt mesajul unui adult de încredere.', 'Împreună verificăm prin aplicația cunoscută, nu prin link, și folosim opțiunile de raportare potrivite.'],
        error: { index: 2, wrong: 'Deschid linkul din mesaj și introduc parola pentru a verifica dacă este sigur.', alternatives: ['Trimit parola în răspuns mesajului ca să cer explicații.', 'Public parola pe un forum și întreb dacă mesajul este adevărat.'] },
        check: { correct: 'Verificarea pornește din aplicația cunoscută cu adultul; linkul nu a fost folosit și parola nu a fost divulgată.', wrong: ['Un buton verde garantează că orice link este sigur.', 'Dacă mesajul amenință cu pierderea jocului, parola trebuie trimisă imediat.'] }
      },
      {
        context: 'Un personaj a trimis din greșeală o fotografie într-o conversație. Fotografia arată ecusonul personajului cu nume și școală, fără ca noi să citim sau să introducem acele date. Un adult de încredere este disponibil pentru ajutor, iar aplicația are raportare și opțiune de ștergere. Rama fotografiei este albastră. Avatarul personajului este o vulpe.',
        question: 'Ce face personajul după greșeală, fără rușinare sau promisiuni false?',
        facts: [{ text: 'Fotografia arată ecusonul personajului cu nume și școală, fără ca noi să citim sau să introducem acele date.', relevant: true }, { text: 'Un adult de încredere este disponibil pentru ajutor, iar aplicația are raportare și opțiune de ștergere.', relevant: true }, { text: 'Rama fotografiei este albastră.', relevant: false }, { text: 'Avatarul personajului este o vulpe.', relevant: false }],
        plan: ['Oprește alte trimiteri și recunoaște că fotografia deja trimisă conține date personale.', 'După oprire îi spune adultului de încredere ce s-a întâmplat și cere ajutor, fără să se învinovățească.', 'Cu adultul folosește opțiunile potrivite de ștergere și raportare; verifică pașii făcuți, știind că pot exista copii ale fotografiei.'],
        error: { index: 2, wrong: 'Promite că ștergerea din aplicație elimină sigur toate copiile de pretutindeni.', alternatives: ['Retrimite fotografia în grupuri ca să întrebe dacă este periculoasă.', 'Decide să ascundă situația și să continue trimiterea altor fotografii cu ecusonul.'] },
        check: { correct: 'Adultul ajută, trimiterile s-au oprit și opțiunile au fost folosite; nu pretindem că ștergerea poate garanta dispariția tuturor copiilor.', wrong: ['Dacă avatarul este o vulpe, fotografia nu mai conține date personale.', 'Personajul trebuie pedepsit înainte să poată cere ajutor.'] }
      }
    ]
  }
});
