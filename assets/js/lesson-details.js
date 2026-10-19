/* Explicații, rezolvări și întrebări specifice fiecărei lecții. */
const LESSON_DETAILS = {
  'mat-1': {
    words: [['Unitate', 'Un singur obiect pe care îl numeri.'], ['Zece unități', 'Un grup de zece obiecte numărate împreună.']],
    explain: 'Ca să nu pierzi șirul, mută fiecare obiect numărat într-un loc separat. Dacă ai multe obiecte, fă grupuri de câte zece. Numără grupurile, apoi obiectele rămase. Nu număra încă o dată și obiectele aflate deja în grupuri.',
    worked: ['Pentru 34, pun deoparte trei grupuri de câte zece: 10, 20, 30.', 'Mai așez patru obiecte separate: 31, 32, 33, 34.', 'Verific: 30 + 4 = 34. Trei grupuri și patru obiecte nu înseamnă 3 + 4.'],
    goals: ['Să numere fiecare obiect o singură dată', 'Să reprezinte 34 prin trei grupuri de zece și patru unități', 'Să citească numărul construit și să verifice totalul'],
    reflection: [['Ce se schimbă dacă la 34 mai adaugi o unitate?', 'Construiește 34, adaugă un obiect și privește unitățile: 4 devine 5.'], ['Cum ai număra 24 de obiecte fără să reiei totul de la unu?', 'Arată două grupuri de zece și cele patru obiecte separate.']],
    check: 'Pentru 34 trebuie să poți arăta 30 în grupuri și încă 4 separat.'
  },
  'mat-2': {
    words: [['Sumă', 'Rezultatul unei adunări.'], ['Descompunere', 'Scrierea unui număr ca adunare de părți.']],
    explain: 'În 8 + 5, cele cinci obiecte noi nu dispar dacă le împarți în două grupe. Folosești două pentru a completa zece și apoi cele trei rămase. Este aceeași adunare făcută în pași mai ușor de urmărit.',
    worked: ['Pornesc de la 8. Până la 10 mai am nevoie de 2.', 'Împart cele 5 obiecte în 2 și 3: adaug 2 și obțin 10.', 'Adaug cele 3 rămase: 10 + 3 = 13. Verific: 13 − 5 = 8.'],
    goals: ['Să reprezinte cele două cantități prin obiecte', 'Să descompună 5 în 2 și 3 pentru a calcula 8 + 5', 'Să verifice adunarea prin scăderea cantității adăugate'],
    reflection: [['De ce adăugăm întâi doar 2 din cele 5 obiecte?', 'Privește cât lipsește de la 8 până la 10.'], ['Cum verifici 7 + 4 folosind obiecte?', 'Construiește șapte, adaugă patru și numără totalul. Poți completa întâi zece.']],
    check: 'În 8 + 5 trebuie folosite toate cele cinci obiecte noi, fără dublă numărare.'
  },
  'mat-3': {
    words: [['Diferență', 'Rezultatul unei scăderi.'], ['Verificare prin adunare', 'Pui la loc cât ai luat și cauți cantitatea inițială.']],
    explain: 'La 14 − 6 nu scazi șase de două ori. Împarți cele șase obiecte luate în patru și două. Întâi ajungi la zece, apoi iei restul. Un desen cu obiectele luate tăiate te ajută să urmărești ce a rămas.',
    worked: ['Din 14 iau 4 și rămân cu 10.', 'Din cele 6 de luat mai am 2: 10 − 2 = 8.', 'Verific prin punere la loc: 8 + 6 = 14.'],
    goals: ['Să deosebească numărul inițial de cantitatea luată', 'Să calculeze 14 − 6 în doi pași', 'Să verifice dacă restul și partea luată refac întregul'],
    reflection: [['De ce după 14 − 4 nu am terminat scăderea lui 6?', 'Am luat doar patru din cele șase; arată câte mai trebuie luate.'], ['Poți verifica 12 − 5 fără să repeți aceeași scădere?', 'Adună partea rămasă cu cele cinci obiecte luate.']],
    check: 'Cele 8 obiecte rămase și cele 6 luate trebuie să refacă 14.'
  },
  'mat-4': {
    words: [['Latură și vârf', 'Latura este o porțiune dreaptă a conturului; vârful este locul unde se întâlnesc două laturi.'], ['Unghi drept', 'Un colț ca acela al unei foi dreptunghiulare.']],
    explain: 'Ca să recunoști o figură, urmărește-i tot conturul, nu felul în care este întoarsă. Un triunghi are trei laturi drepte și trei vârfuri. Un pătrat are patru laturi egale și patru unghiuri drepte. Rotirea nu adaugă și nu șterge laturi. În jocuri vei construi, oglindi, acoperi și compara figuri.',
    worked: ['Desenez un dreptunghi de 3 pătrățele pe 2 pătrățele și închid conturul.', 'Număr interiorul pe rânduri: 3 + 3 = 6 pătrățele.', 'Urmăresc marginea: 3 + 2 + 3 + 2 = 10 laturi de pătrățel. Interiorul și marginea măsoară lucruri diferite.'],
    goals: ['Să descrie triunghiul, pătratul și dreptunghiul prin proprietăți', 'Să construiască un contur închis și să corecteze o latură nepotrivită', 'Să deosebească oglindirea, acoperirea interiorului și măsurarea conturului'],
    reflection: [['De ce un pătrat întors nu devine automat altă figură?', 'Numără din nou laturile, compară lungimile și verifică cele patru colțuri drepte.'], ['Ce verifici după ce pui o piesă într-un mozaic?', 'Privește dacă iese din suprafață, acoperă o piesă sau lasă un loc liber.']],
    check: 'O figură construită trebuie să aibă contur închis și proprietățile cerute, nu doar să semene cu modelul.'
  },
  'mat-5': {
    words: [['Centimetru', 'O unitate de lungime, notată cm.'], ['Reper de început', 'Semnul de pe riglă de la care începe obiectul.']],
    explain: 'Pe riglă numeri distanțele dintre semne, nu semnele în sine. Dacă obiectul începe la 2, numărul 9 de la capăt nu este lungimea lui. Între 2 și 9 sunt șapte intervale de câte un centimetru.',
    worked: ['Citesc începutul benzii: 2 cm.', 'Citesc sfârșitul: 9 cm. Calculez 9 − 2 = 7 cm.', 'Mut banda la începutul 3. Dacă se termină la 10, lungimea rămâne 10 − 3 = 7 cm.'],
    goals: ['Să alinieze obiectul la reperul ales', 'Să afle lungimea din diferența dintre capete', 'Să compare două lungimi exprimate în aceeași unitate'],
    reflection: [['De ce nu numărăm și semnul 2 ca pe un centimetru întreg?', 'Un centimetru este spațiul dintre două semne vecine, nu unul dintre semne.'], ['O bandă începe la 4 și se termină la 10. Cum îi afli lungimea?', 'Poți număra intervalele sau calcula 10 − 4. Spune și unitatea.']],
    check: 'Lungimea trebuie să fie sfârșit minus început, exprimată în centimetri.'
  },
  'mat-6': {
    words: [['Cadran', 'Fața ceasului pe care sunt numerele și acele.'], ['Sfert de oră', '15 minute; patru astfel de părți formează o oră.']],
    explain: 'Pentru minute pornești de la 12 cu zero, apoi numeri 5 la 1, 10 la 2 și tot așa. La 6 ai 30 de minute. Acul scurt se mișcă și el: la 3:30 a trecut de 3, dar nu a ajuns la 4.',
    worked: ['Acul scurt este între 3 și 4: ora este 3 și vom citi și minutele.', 'Acul lung este la 6: șase grupe de câte cinci minute înseamnă 30.', 'Citesc 3:30. După încă 15 minute este 3:45, nu 4:30.'],
    goals: ['Să distingă rolurile acului scurt și ale celui lung', 'Să citească minutele numărând din cinci în cinci', 'Să calculeze un interval scurt și să verifice ambele ace'],
    reflection: [['De ce acul scurt nu stă fix pe 3 la 3:30?', 'Ora este în curs; jumătate din drumul spre 4 a fost parcurs.'], ['Unde ajunge acul lung după 15 minute pornind de la 6?', 'Avansează trei numere pe cadran, câte cinci minute pentru fiecare.']],
    check: 'Ora citită trebuie să corespundă poziției ambelor ace, nu doar unuia.'
  },
  'mat-7': {
    words: [['Taler', 'Una dintre cele două platforme pe care punem obiectele balanței.'], ['Echilibru', 'Situația în care cele două părți au aceeași masă.']],
    explain: 'Talerul mai greu coboară. Când toate cuburile sunt identice, fiecare adaugă aceeași masă. Poți obține egalitate adăugând la grupa mai mică sau scoțând din cea mai mare. Pentru obiecte diferite nu hotărăști doar numărând.',
    worked: ['Compar 4 cuburi în stânga cu 7 în dreapta: dreapta este mai grea.', 'Calculez diferența: 7 − 4 = 3. Adaug trei cuburi în stânga.', 'Verific 4 + 3 = 7: acum sunt șapte cuburi identice pe fiecare taler.'],
    goals: ['Să prezică talerul care coboară pentru cuburi identice', 'Să determine câte cuburi lipsesc până la egalitate', 'Să explice de ce numărul nu compară singur masele unor obiecte diferite'],
    reflection: [['Poți echilibra 4 și 7 fără să adaugi cuburi?', 'Încearcă să scoți trei din grupa de șapte și compară din nou.'], ['O cutie mare și una mică au sigur mase diferite?', 'Mărimea nu îți spune singură ce conțin sau cât cântăresc.']],
    check: 'La echilibru masele sunt egale; pentru cuburi identice și numerele trebuie să fie egale.'
  },
  'mat-8': {
    words: [['Buget', 'Suma disponibilă pentru cumpărături.'], ['Rest', 'Diferența dintre suma dată la plată și costul cumpărăturilor.']],
    explain: 'A avea bani în buzunar nu înseamnă că îi dai pe toți la plată. Întâi aduni prețurile produselor alese. Compari costul cu bugetul ca să afli dacă ajunge. Restul îl calculezi numai din suma pe care o dai efectiv vânzătorului.',
    worked: ['Adun cartea de 12 lei și creionul de 3 lei: costul este 15 lei.', 'Dau 20 de lei. Calculez restul: 20 − 15 = 5 lei.', 'Verific: 15 lei cost plus 5 lei rest refac cei 20 de lei dați.'],
    goals: ['Să adune prețurile produselor alese', 'Să decidă dacă un cost încape în buget', 'Să calculeze și să verifice restul din suma plătită'],
    reflection: [['Dacă ai 30 de lei, dar dai 20 pentru un cost de 15, cât rest primești?', 'Pornește de la suma dată, nu de la toți banii din buzunar.'], ['Ce poți schimba când produsele costă mai mult decât bugetul?', 'Compară variante cu mai puține produse sau cu produse mai ieftine.']],
    check: 'Costul și restul trebuie să refacă exact suma dată la plată.'
  },
  'mat-9': {
    words: [['Formă plană', 'O figură pe o suprafață, ca un desen pe hârtie.'], ['Corp', 'Un obiect care ocupă loc în spațiu, ca o cutie sau o minge.']],
    explain: 'Privește o singură față a unei cutii, din față: îi poți desena conturul ca pe un dreptunghi. Cutia întreagă nu este dreptunghiul desenat. La fel, desenul unui cerc nu este o minge pe care o poți ține în mână.',
    worked: ['Aleg o față dreptunghiulară a unei cutii și îi desenez conturul.', 'Număr în desen patru laturi și patru vârfuri.', 'Arăt ce compar: fața cutiei cu desenul, nu întregul corp cu o figură plană.'],
    goals: ['Să distingă un corp de o figură plană', 'Să asocieze conturul unei fețe cu o figură geometrică', 'Să descrie un desen prin laturi și vârfuri, indiferent de rotire'],
    reflection: [['De ce nu putem spune că o minge este un cerc?', 'Compară un desen plat cu obiectul care ocupă loc și se poate rostogoli.'], ['Ce compari când spui că o fereastră seamănă cu un dreptunghi?', 'Urmărește conturul ferestrei și cele patru colțuri, nu culoarea ramei.']],
    check: 'Spune dacă descrii obiectul întreg sau doar o față ori conturul său.'
  },
  'mat-10': {
    words: [['Cifră', 'Un semn folosit pentru a scrie numere.'], ['Valoarea poziției', 'În 48, cifra 4 arată patru zeci, adică 40.']],
    explain: 'Aceeași cifră poate arăta cantități diferite după locul ei. În 48, cele patru grupuri au împreună 40 de obiecte. Când cele opt unități mai primesc două, nu scriem zece pe locul unei singure cifre: schimbăm cele zece unități într-un grup nou.',
    worked: ['Construiesc 48: patru grupuri de zece și opt unități.', 'Adaug două unități: cele zece unități separate formează încă un grup.', 'Am cinci grupuri și nicio unitate separată: 50. Verific 48 + 2 = 50.'],
    goals: ['Să precizeze valoarea cifrei zecilor, nu doar numele ei', 'Să schimbe zece unități într-un grup de zece', 'Să reprezinte același total în două grupări diferite'],
    reflection: [['Cum arăți 50 cu patru grupuri de zece?', 'Desfă unul dintre cele cinci grupuri și păstrează cele zece unități separat.'], ['Ce arată zero din 70?', 'Există șapte grupuri, dar nu mai rămâne niciun obiect separat.']],
    check: 'La un schimb, numărul grupurilor se modifică, dar totalul obiectelor rămâne același.'
  },
  'mat-11': {
    words: [['Pas intermediar', 'Un calcul al cărui rezultat îl folosești mai departe.'], ['Datele problemei', 'Informațiile primite despre cantități și schimbări.']],
    explain: 'Cuvintele „primești” și „oferi” descriu schimbări diferite. Înainte să calculezi, povestește ce se întâmplă cu obiectele. După prima schimbare, cantitatea nouă devine începutul pasului următor. Rezultatul intermediar nu este neapărat răspunsul final.',
    worked: ['Am 8 timbre și primesc 5: 8 + 5 = 13.', 'Din cele 13 ofer 3: 13 − 3 = 10.', 'Verific povestea înapoi: 10 + 3 = 13, apoi 13 − 5 = 8.'],
    goals: ['Să identifice cantitatea inițială și cele două schimbări', 'Să aleagă operația potrivită fiecărui pas', 'Să folosească rezultatul intermediar și să verifice finalul'],
    reflection: [['De ce 8 + 5 + 3 nu descrie povestea timbrelor?', 'Ultimele trei timbre sunt oferite, nu primite.'], ['Ce s-ar schimba dacă ai oferi două, nu trei timbre?', 'Păstrează primul calcul și modifică doar al doilea pas.']],
    check: 'Cele două calcule trebuie să urmărească schimbările în ordinea poveștii.'
  },
  'mat-12': {
    words: [['Întreg', 'Obiectul sau suprafața pe care o împărțim.'], ['Părți egale', 'Părți care au aceeași mărime în întregul ales.']],
    explain: 'O jumătate nu înseamnă orice bucată luată din două. Verifică dacă bucățile acoperă la fel de mult. Poți colora două sferturi alăturate sau separate: dacă părțile sunt egale și întregul este același, cantitatea colorată este tot o jumătate.',
    worked: ['Împart o foaie în patru părți egale: fiecare este un sfert.', 'Colorez două: am două sferturi din cele patru.', 'Compar cu jumătatea unei foi identice: suprafețele colorate sunt egale.'],
    goals: ['Să identifice întregul înainte de a numi o parte', 'Să verifice egalitatea părților pentru jumătăți și sferturi', 'Să arate că două sferturi sau patru optimi fac o jumătate'],
    reflection: [['Două bucăți diferite ca mărime sunt jumătăți?', 'Suprapune desenele sau îndoaie foaia ca să compari părțile.'], ['Trebuie să fie lipite cele două sferturi colorate?', 'Numără părțile egale colorate și compară totalul, nu poziția lor.']],
    check: 'Părțile trebuie să fie egale și să aparțină aceluiași întreg.'
  },
  'lim-1': {
    words: [['Sunet', 'Ceea ce auzim și rostim când vorbim.'], ['Literă', 'Semnul scris prin care notăm un sunet, singur sau împreună cu alte litere.']],
    explain: 'Mai întâi ascultă cuvântul fără să privești scrisul. Apoi privește literele. În exemple simple, precum „măr”, numărul lor este același, dar nu este o regulă pentru orice cuvânt. Numele unei litere, precum „em”, nu este sunetul m pe care îl auzi la începutul lui „măr”.',
    worked: ['Ascult „măr” și prelungesc primul sunet: mmm.', 'Privesc cuvântul scris: m, ă, r sunt cele trei litere.', 'Leg primul sunet auzit de litera m; nu adaug e din numele „em”.'],
    goals: ['Să identifice un sunet la începutul unui cuvânt cunoscut', 'Să asocieze sunetul cu litera din exemplu', 'Să explice de ce ascultarea și numărarea literelor sunt sarcini diferite'],
    reflection: [['Poți vedea un sunet pe o foaie?', 'Pe foaie vezi semnul care îl notează; sunetul îl auzi.'], ['Ce se întâmplă dacă spui „em” în loc de mmm?', 'Rostește încet și observă sunetul e adăugat de numele literei.']],
    check: 'Arată separat ce ai auzit și ce semn ai citit în exemplul dat.'
  },
  'lim-2': {
    words: [['Silabă', 'O parte a cuvântului rostită dintr-o dată.'], ['Reunire', 'Rostirea silabelor împreună pentru a reface cuvântul.']],
    explain: 'Nu despărți cuvântul după numărul de litere. Spune-l rar, dar firesc, și marchează fiecare parte rostită. După ce îl împarți, unește din nou părțile: trebuie să auzi cuvântul de la început, fără sunete lipsă sau adăugate.',
    worked: ['Rostesc „cameră” întreg, apoi rar: ca-me-ră.', 'Pun câte un jeton pentru ca, me și ră: am trei jetoane.', 'Reunesc cele trei silabe și aud din nou „cameră”.'],
    goals: ['Să rostească rar un cuvânt fără să îi schimbe sunetele', 'Să marcheze o silabă printr-o bătaie sau un jeton', 'Să refacă și să verifice cuvântul din silabele alese'],
    reflection: [['De ce „soare” nu se desparte în trei după o și a?', 'Ascultă soa-re: o și a se aud în aceeași silabă.'], ['Cum verifici dacă ai uitat o silabă?', 'Reunește ce ai marcat și compară cuvântul cu modelul rostit.']],
    check: 'Numărul jetoanelor trebuie să corespundă silabelor auzite, nu literelor scrise.'
  },
  'lim-3': {
    words: [['Propoziție', 'Cuvinte legate astfel încât să comunice un mesaj cu sens.'], ['Acord', 'Potrivirea formelor cuvintelor, precum „copiii citesc”.']],
    explain: 'Întreabă despre cine este vorba și ce face. Apoi verifică dacă toate cuvintele sunt necesare și se potrivesc. În scris, spațiile separă cuvintele, litera mare arată începutul, iar semnul final ajută cititorul să înțeleagă mesajul.',
    worked: ['Aleg persoana: Ana.', 'Adaug ce face și ce citește: „Ana citește o carte”.', 'Scriu „Ana citește o carte.” și recitesc mesajul complet.'],
    goals: ['Să identifice persoana și acțiunea dintr-un mesaj', 'Să ordoneze cuvinte pentru mesajul cerut', 'Să verifice acordul, litera mare și semnul final'],
    reflection: [['Ce informație lipsește din „Ana o carte”?', 'Spune ce face Ana; de exemplu, citește sau desenează.'], ['Pot exista două ordini cu sens pentru aceleași cuvinte?', 'Compară „Ana citește o carte” cu „O carte citește Ana”, apoi discută ce se accentuează.']],
    check: 'Citește mesajul ca unui ascultător care nu vede cartonașele și verifică dacă îl înțelege.'
  },
  'lim-4': {
    words: [['Rimă', 'Asemănarea sunetelor finale, de la ultima vocală rostită mai apăsat.'], ['Vers', 'Un rând dintr-o poezie sau dintr-un cântec.']],
    explain: 'Ascultă cuvintele, nu compara doar felul în care sunt scrise. „Casă” și „masă” încep diferit, dar au finalul „asă”. Două cuvinte care încep cu aceeași literă nu rimează neapărat. Poți rosti perechea într-un mic vers ca să auzi asemănarea.',
    worked: ['Rostesc „casă”, apoi „masă”.', 'Prelungesc finalurile: c-asă, m-asă; aud aceeași parte „asă”.', 'Compar cu „carte”: începe ca „casă”, dar finalul nu este același.'],
    goals: ['Să compare finalurile a două cuvinte rostite', 'Să distingă rima de asemănarea începutului', 'Să folosească o pereche de cuvinte care rimează într-un vers'],
    reflection: [['De ce „casă” și „carte” nu sunt perechea potrivită aici?', 'Ascultă finalurile, nu litera c de la început.'], ['Cum ajuți un partener care nu aude încă rima?', 'Rostește rar ambele cuvinte și accentuează partea finală, fără să îl grăbești.']],
    check: 'Justifică perechea prin sunetele de la sfârșit, nu prin imagini sau literele inițiale.'
  },
  'lim-5': {
    words: [['Personaj', 'Cine participă la întâmplarea povestită.'], ['Încheiere', 'Partea în care aflăm cum se termină întâmplarea.']],
    explain: 'Cititorul nu știe încă povestea din mintea ta. Spune cine este acolo, unde se află și ce se întâmplă. Leagă evenimentele, apoi arată cum se rezolvă sau se încheie întâmplarea. Poți începe prin desen ori povestire orală înainte de a scrie.',
    worked: ['Început: Mara este în parc; știm personajul și locul.', 'Întâmplare: găsește un cățel rătăcit și cheamă un adult.', 'Final: împreună găsesc stăpânul. Recitesc și verific dacă se înțelege legătura.'],
    goals: ['Să prezinte un personaj și un loc', 'Să lege o întâmplare de reacția personajului', 'Să revizuiască încheierea, claritatea și semnele de scriere'],
    reflection: [['Ce nu ar înțelege cititorul dacă ai omite prima propoziție?', 'Verifică dacă ar mai ști cine este personajul și unde se află.'], ['Ce întrebare ai pune cuiva care ți-a citit povestea?', 'Poți întreba „Ai înțeles ce s-a întâmplat după…?” și să asculți explicația.']],
    check: 'Verificarea automată a formei nu înlocuiește citirea poveștii împreună cu o persoană.'
  },
  'lim-6': {
    words: [['Diacritică', 'Un semn care face parte din scrierea unor litere, precum ă, â, î, ș, ț.'], ['Interiorul cuvântului', 'Locul unei litere care nu este nici prima, nici ultima.']],
    explain: 'Ascultarea te ajută să distingi ă de sunetul notat prin â sau î. Pentru a alege între â și î ai nevoie și de scrierea cuvântului. Regula poziției ajută în multe cuvinte, dar forme precum „neînțeles” păstrează î din cuvântul de la care s-au format.',
    worked: ['În „înot”, sunetul este la început și scriu î.', 'În „pâine”, scriu â în interior; citesc cuvântul complet.', 'În „neînțeles”, recunosc „ne-” plus „înțeles” și păstrez î.'],
    goals: ['Să distingă sunetul lui ă de cel al lui â și î', 'Să aleagă litera folosind poziția și modelul corect', 'Să recunoască păstrarea lui î în exemplul „neînțeles”'],
    reflection: [['De ce nu alegem între â și î numai după auz?', 'Cele două litere notează același sunet; caută poziția și forma cuvântului.'], ['Ce faci când regula simplă nu îți ajunge?', 'Compară cu un model corect sau verifică împreună cu un adult.']],
    check: 'Citește cuvântul complet și verifică litera în model, nu doar într-un loc izolat.'
  },
  'lim-7': {
    words: [['Etichetă', 'Un text scurt care numește sau descrie un obiect.'], ['Indicator', 'Un semn care poate arăta o direcție ori o informație despre un loc.']],
    explain: 'O imagine poate sugera un răspuns, dar textul trebuie citit până la capăt. „PARC” și „PIAȚĂ” pot apărea pe indicatoare care încep cu aceeași literă. Ca să alegi locul potrivit, citește întregul cuvânt și leagă-l de sens.',
    worked: ['Privesc eticheta „APĂ” și citesc toate cele trei litere.', 'Spun ce denumește cuvântul, nu doar prima literă.', 'Așez eticheta lângă desenul potrivit și recitesc pentru verificare.'],
    goals: ['Să citească un cuvânt întreg de pe o etichetă', 'Să lege cuvântul de obiectul sau locul denumit', 'Să observe și să corecteze două etichete schimbate'],
    reflection: [['De ce prima literă nu ajunge pentru „PARC” și „PIAȚĂ”?', 'Privește literele de după P și ascultă cele două cuvinte întregi.'], ['Cum verifici o etichetă care nu se potrivește desenului?', 'Citește cuvântul, spune sensul și compară cu obiectul reprezentat.']],
    check: 'Potrivirea trebuie susținută de cuvântul citit, nu numai de culoarea etichetei.'
  },
  'lim-8': {
    words: [['Indiciu din text', 'Un cuvânt sau un enunț care sprijină un răspuns.'], ['Concluzie', 'Ce afli legând informațiile disponibile.']],
    explain: 'Unele răspunsuri se găsesc exact în text. Pentru altele legi două informații, dar nu inventezi detalii. Recitește locul care te ajută și arată-l. Dacă textul nu spune ceva și nici indiciile nu ajung, poți spune că nu știm încă.',
    worked: ['Citesc: plouă, iar Lia își ia umbrela.', 'Leg ploaia de folosirea umbrelei: o ajută să nu se ude.', 'Nu afirm ce culoare are umbrela, fiindcă textul nu spune.'],
    goals: ['Să identifice personajul, locul și acțiunea', 'Să arate informația care susține un răspuns', 'Să deosebească o concluzie justificată de un detaliu inventat'],
    reflection: [['Ce cuvinte sprijină motivul pentru care Lia ia umbrela?', 'Recitește informația despre vreme și acțiunea Liei.'], ['Ce întrebare rămâne fără răspuns în exemplu?', 'Poți întreba culoarea umbrelei; verifică dacă apare în text.']],
    check: 'Pentru un răspuns despre întâmplare, arată informația din text care îl susține.'
  },
  'lim-9': {
    words: [['Intonație', 'Felul în care urcă, coboară sau se accentuează vocea.'], ['Semn final', 'Punctul, semnul întrebării ori al exclamării care încheie mesajul.']],
    explain: 'Întreabă ce vrea să facă vorbitorul: anunță, cere o informație sau avertizează? Nu alegi semnul după lungimea propoziției. Aceleași cuvinte pot transmite alt mesaj dacă schimbi intenția și felul în care le rostești.',
    worked: ['„Mara vine azi.” anunță o informație: aleg punctul.', '„Mara vine azi?” cere o confirmare: aleg semnul întrebării.', '„Ai grijă!” avertizează: aleg semnul exclamării și recitesc potrivit.'],
    goals: ['Să deosebească un anunț de o întrebare și un avertisment', 'Să aleagă semnul final după mesaj', 'Să recitească pentru a verifica legătura dintre intonație și semn'],
    reflection: [['Cum poți transforma un anunț într-o întrebare?', 'Rostește „Dan vine” în cele două feluri și alege semnele.'], ['De ce „Unde este cartea” nu se încheie cu punct aici?', 'Vorbitorul cere să afle locul cărții, nu îl anunță.']],
    check: 'Explică ce comunică enunțul înainte să numești semnul final.'
  },
  'lim-10': {
    words: [['Revizuire', 'Recitirea unui text pentru a-l îmbunătăți.'], ['Redactor', 'O persoană care pregătește și verifică texte.']],
    explain: 'Recitește mai întâi mesajul întreg. Caută apoi pe rând potrivirea cuvintelor, litera mare, diacriticele și semnul final. Dacă schimbi totul dintr-o dată, este mai greu să explici ce ai corectat și de ce.',
    worked: ['Citesc „Copiii citește.” și observ că vorbim despre mai mulți copii.', 'Aleg forma „citesc”, potrivită cu „copiii”.', 'Recitesc „Copiii citesc.”; păstrez sensul, litera mare și punctul.'],
    goals: ['Să localizeze o nepotrivire într-un enunț scurt', 'Să justifice alegerea formei corecte', 'Să recitească întregul mesaj după corectare'],
    reflection: [['De ce „citesc” este potrivit aici?', 'Înlocuiește „copiii” cu „ei” și rostește propoziția.'], ['Poate o corectare să strice sensul?', 'Verifică dacă persoana și acțiunea au rămas cele cerute, nu doar dacă textul arată diferit.']],
    check: 'Numește nepotrivirea și schimbarea făcută, apoi citește varianta completă.'
  },
  'log-1': {
    words: [['Tipar', 'O așezare care repetă o grupă sau urmează o regulă.'], ['Element vecin', 'Elementul aflat imediat înainte sau după altul.']],
    explain: 'Privește mai mult decât ultimul element. La culori, caută grupa care revine. La numere, compară fiecare pereche vecină. O regulă bună pentru exercițiu explică toate trecerile date, nu doar una.',
    worked: ['Privesc roșu–albastru–roșu–albastru și separ două grupe identice.', 'Spun regula: roșu, apoi albastru, repetat.', 'După ultimul albastru pun roșu și verific șirul de la început.'],
    goals: ['Să identifice grupa care se repetă', 'Să explice regula în cuvinte', 'Să verifice fiecare trecere înainte de a continua șirul'],
    reflection: [['Cum arăți unde începe repetarea?', 'Încadrează câte o grupă roșu–albastru.'], ['Ce faci dacă o regulă se potrivește doar la început?', 'Testeaz-o și pe perechile următoare înainte să o păstrezi.']],
    check: 'Regula aleasă trebuie să descrie toate elementele arătate.'
  },
  'log-2': {
    words: [['Indiciu', 'O informație care ajută la alegerea unei variante.'], ['Eliminare', 'Îndepărtarea unei variante care nu respectă o condiție.']],
    explain: 'Păstrează toate indiciile în minte sau pe cartonașe. O figură poate respecta primul indiciu și să nu îl respecte pe al doilea. Nu alege după culoare dacă cerința vorbește despre laturi și colțuri.',
    worked: ['Cerința spune patru laturi: elimin triunghiul și cercul.', 'Cere și patru unghiuri drepte: verific pătratul și dreptunghiul.', 'Cere toate laturile egale: păstrez pătratul și verific cele trei indicii.'],
    goals: ['Să elimine o figură printr-un indiciu precis', 'Să combine numărul laturilor cu egalitatea lor și unghiurile', 'Să justifice alegerea prin toate condițiile cerute'],
    reflection: [['Ajunge indiciul „patru laturi” ca să alegi numai pătratul?', 'Compară pătratul cu un dreptunghi care nu are toate laturile egale.'], ['Ce faci dacă rămân două figuri?', 'Caută un indiciu suplimentar care le deosebește.']],
    check: 'Figura finală trebuie să respecte toate indiciile, indiferent cum este rotită.'
  },
  'log-3': {
    words: [['Pereche', 'Două cartonașe cu același desen în acest joc.'], ['Strategie', 'Un mod de lucru pe care îl folosești ca să te orientezi.']],
    explain: 'Nu trebuie să ții minte toate pozițiile dintr-o dată. Numește locul unui desen: sus, jos, rândul întâi, lângă colț. Când două cartonașe nu se potrivesc, observă-le înainte să le ascunzi; informația poate ajuta încercarea următoare.',
    worked: ['Întorc un măr din stânga sus și un soare din dreapta jos.', 'Nu sunt pereche; spun locurile și le ascund.', 'Când găsesc alt măr, îl compar cu locul reținut din stânga sus.'],
    goals: ['Să descrie poziția unui cartonaș', 'Să folosească o observație anterioară pentru o pereche', 'Să compare două strategii fără a transforma încercările într-o notă'],
    reflection: [['Ce merită observat înainte să ascunzi două desene diferite?', 'Numește fiecare desen și locul lui.'], ['Ce poți schimba când începi să alegi la întâmplare?', 'Explorează pe rând o zonă mai mică sau ia o pauză.']],
    check: 'Poți explica un loc reținut și felul în care l-ai folosit; nu este nevoie de viteză.'
  },
  'log-4': {
    words: [['Criteriu', 'Regula după care formezi grupele.'], ['Două condiții', 'Două cerințe pe care același obiect trebuie să le respecte.']],
    explain: 'Pentru „roșu și triunghi” verifici pe rând culoarea și forma. Un singur răspuns da nu ajunge. Dacă schimbi criteriul în „roșu”, cercul roșu poate intra acum în grupă, deși înainte era exclus.',
    worked: ['Iau un cerc roșu: culoarea este potrivită.', 'Verific forma: nu este triunghi, deci nu respectă ambele condiții.', 'Aleg triunghiul roșu și repet verificarea pentru fiecare piesă.'],
    goals: ['Să numească regula înainte de sortare', 'Să verifice două condiții pentru același obiect', 'Să regrupeze obiectele când criteriul se schimbă'],
    reflection: [['De ce nu intră cercul roșu în grupa „roșu și triunghi”?', 'Are culoarea cerută, dar nu forma.'], ['Ce piesă ar putea schimba grupa dacă păstrăm doar culoarea?', 'Reverifică obiectele excluse numai din cauza formei.']],
    check: 'Fiecare piesă trebuie comparată cu întreaga regulă, nu doar cu o proprietate.'
  },
  'log-5': {
    words: [['Variantă posibilă', 'Un răspuns care nu este exclus de informațiile primite.'], ['Deducție', 'Un răspuns obținut folosind legătura dintre indicii.']],
    explain: 'Începe cu toate locurile permise de poveste. Taie doar ceea ce un indiciu exclude. Dacă rămân două locuri, nu inventa un motiv ca să alegi unul. A spune că lipsește o informație poate fi răspunsul corect.',
    worked: ['Bila este în una dintre cutiile roșie, verde și albastră.', 'Nu este în roșie, apoi aflu că nu este nici în verde.', 'Rămâne albastra; verific că aceasta este una dintre cele trei cutii permise.'],
    goals: ['Să enumere variantele permise', 'Să lege fiecare eliminare de un indiciu', 'Să recunoască o situație cu informații insuficiente'],
    reflection: [['Ce ai ști dacă ar lipsi indiciul despre verde?', 'Ar rămâne verde și albastru, fără o alegere sigură.'], ['De ce nu tăiem o variantă doar pentru că nu ne place?', 'Arată informația din poveste care permite fiecare eliminare.']],
    check: 'Poți spune de ce fiecare variantă exclusă nu se potrivește.'
  },
  'log-6': {
    words: [['Rând', 'O linie de locuri de la stânga la dreapta.'], ['Coloană', 'O linie de locuri de sus în jos.']],
    explain: 'Găsește întâi o linie completă, ca să vezi ce se păstrează. Apoi urmărește direcția cealaltă. La locul gol se întâlnesc două reguli: forma poate veni de pe rând și culoarea de pe coloană.',
    worked: ['Pe rândul locului gol sunt numai triunghiuri: aleg forma triunghi.', 'Pe coloana sa sunt piese albastre: aleg culoarea albastru.', 'Pun triunghiul albastru și verific din nou rândul și coloana.'],
    goals: ['Să distingă rândul de coloană', 'Să identifice separat regulile celor două direcții', 'Să verifice piesa lipsă folosind ambele reguli'],
    reflection: [['Poate un triunghi roșu să fie bun numai pe rând?', 'Compară separat forma cerută și culoarea coloanei.'], ['Cum explici unui partener locul piesei lipsă?', 'Numește rândul și coloana sau etichetele lor.']],
    check: 'Piesa aleasă trebuie să se potrivească simultan în cele două direcții.'
  },
  'log-7': {
    words: [['Creștere', 'Cantitatea adăugată de la un pas la următorul.'], ['Repetare', 'Revenirea aceleiași grupe în aceeași ordine.']],
    explain: 'Într-un șir de numere întreabă cât s-a adăugat, nu doar care număr este mai mare. În 3, 6, 9, 12 numerele nu se repetă; se repetă adăugarea a trei. Într-un șir de forme poate reveni grupa întreagă.',
    worked: ['Compar 3 cu 6: s-au adăugat 3.', 'Verific 6 cu 9 și 9 cu 12: același salt de 3.', 'Continui cu 12 + 3 = 15 și explic ce s-a repetat.'],
    goals: ['Să compare două valori vecine', 'Să distingă repetarea unei grupe de creșterea valorilor', 'Să prezică și să justifice următorul element'],
    reflection: [['De ce 13 nu urmează aici după 12?', 'Verifică dacă saltul de la 12 la 13 respectă salturile anterioare.'], ['Cum ai construi cu cuburi șirul 2, 4, 6?', 'Fă trei turnuri și arată cele două cuburi adăugate de fiecare dată.']],
    check: 'Verifică regula pe cel puțin două treceri, nu doar pe ultimul număr.'
  },
  'log-8': {
    words: [['Obstacol', 'Un loc prin care traseul nu are voie să treacă.'], ['Țintă', 'Locul în care trebuie să ajungă pionul sau robotul.']],
    explain: 'Un pas înseamnă trecerea într-o căsuță vecină în direcția aleasă. Nu sărim peste obstacole și nu ieșim din grilă. Un drum ocolit poate fi corect chiar dacă este mai lung decât o linie dreaptă blocată.',
    worked: ['Ținta este două căsuțe la dreapta, dar căsuța dintre ele este blocată.', 'Dacă locurile sunt libere, încerc jos, dreapta, dreapta, sus.', 'Verific fiecare căsuță și faptul că ultimul pas ajunge exact la țintă.'],
    goals: ['Să identifice plecarea, ținta și căsuțele interzise', 'Să construiască un traseu format din pași vecini', 'Să compare două drumuri valide prin numărul de pași'],
    reflection: [['Este mai bun un drum scurt care trece printr-un obstacol?', 'Verifică întâi dacă drumul este permis, apoi compară lungimile.'], ['Ce verifici înainte de fiecare comandă?', 'Arată căsuța în care urmează să intre pionul.']],
    check: 'Toți pașii trebuie să rămână în grilă, să evite obstacolele și să ducă la țintă.'
  },
  'log-9': {
    words: [['Antet', 'Eticheta care spune ce proprietate are un rând sau o coloană.'], ['Intersecție', 'Locul unde se întâlnesc rândul și coloana alese.']],
    explain: 'Etichetele nu sunt piese de mutat, ci instrucțiuni de citire a tabelului. Urmărește cu un deget rândul și cu altul coloana. Locul unde se întâlnesc îți spune combinația cerută. Dacă schimbi doar culoarea, forma trebuie păstrată.',
    worked: ['Citesc antetul rândului: triunghi.', 'Citesc antetul coloanei: albastru.', 'La intersecție aleg triunghiul albastru; dacă cer galben, schimb numai culoarea.'],
    goals: ['Să citească etichetele rândului și coloanei', 'Să combine forma și culoarea la intersecție', 'Să schimbe o proprietate păstrând-o pe cealaltă'],
    reflection: [['Ce informație pierzi dacă citești numai rândul?', 'Vei ști forma, dar nu și culoarea cerută.'], ['Ce rămâne la fel când triunghiul albastru devine galben?', 'Compară conturul celor două figuri.']],
    check: 'Numește separat cele două proprietăți înainte de a spune piesa completă.'
  },
  'log-10': {
    words: [['Observație', 'Ce arată direct scena sau textul.'], ['Presupunere', 'O explicație posibilă, încă neverificată.']],
    explain: 'O alee udă poate avea mai multe explicații. Nu adăuga un eveniment doar fiindcă se întâmplă des. Întreabă ce informație ar deosebi ploaia de udarea cu furtunul. Dacă textul nu o oferă, păstrează incertitudinea.',
    worked: ['Observ în scenă doar că pe jos este ud.', 'Propun ploaia și udarea plantelor ca explicații posibile.', 'Caut un indiciu nou; fără el nu aleg sigur una dintre explicații.'],
    goals: ['Să extragă informația directă dintr-o scenă', 'Să formuleze două explicații posibile', 'Să numească un indiciu care ar ajuta verificarea'],
    reflection: [['De ce ud nu înseamnă automat că a plouat?', 'Numește un alt mod în care apa putea ajunge acolo.'], ['Ce ai putea întreba un martor?', 'Întreabă ce a văzut el, fără să îi sugerezi răspunsul dorit.']],
    check: 'Separă informația văzută de explicația pe care o propui.'
  },
  'log-11': {
    words: [['Observație directă', 'Ce ai văzut, auzit sau măsurat în situația dată.'], ['Cauză', 'Ce a făcut să se întâmple un lucru; uneori nu o cunoaștem încă.']],
    explain: 'Paharul culcat este vizibil, dar cine l-a răsturnat nu apare automat în desen. Faptul că o persoană era aproape nu o face vinovată. Descrierea atentă te ajută să pui întrebări fără acuzații.',
    worked: ['Spun „Paharul este culcat și pe masă este apă”.', 'Nu adaug „Pisica l-a răsturnat”, fiindcă nu am văzut evenimentul.', 'Întreb ce s-a observat înainte; până atunci spun „Nu știu încă cine l-a răsturnat”.'],
    goals: ['Să descrie scena fără un vinovat inventat', 'Să distingă obiectele vizibile de cauza presupusă', 'Să formuleze o întrebare neutră despre informația lipsă'],
    reflection: [['Cum ar suna o întrebare fără acuzație?', 'Încearcă „Ai văzut cum a ajuns paharul culcat?” în loc de „De ce l-ai răsturnat?”.'], ['Poți verifica încă o dată și o observație?', 'Poate ai privit de departe; apropie desenul și descrie ce vezi acum.']],
    check: 'Nu transforma o explicație posibilă într-o acuzație sigură.'
  },
  'log-12': {
    words: [['Verificabil', 'Despre care poți căuta informații prin numărare, măsurare sau surse potrivite.'], ['Preferință', 'Ce îi place cuiva mai mult; poate diferi de alegerea altuia.']],
    explain: 'O propoziție despre numărul creioanelor se poate verifica chiar dacă a spus-o un adult. Ea poate fi și greșită. Propoziția „Îmi place verdele” descrie alegerea persoanei; nu trebuie dovedit că verdele este preferat de toată lumea.',
    worked: ['Număr creioanele de pe masă și găsesc patru.', 'Ina îl preferă pe cel verde, iar Dan pe cel roșu.', 'Numărul este comun scenei; culorile preferate pot rămâne diferite.'],
    goals: ['Să identifice ce parte a unui mesaj poate fi numărată', 'Să respecte două preferințe diferite', 'Să verifice o afirmație fără să o creadă automat adevărată'],
    reflection: [['Ce verifici în „Sunt patru creioane și mie îmi place verdele”?', 'Desparte propoziția despre cantitate de alegerea culorii.'], ['Dacă majoritatea preferă cercurile, pătratul devine greșit?', 'Votul arată alegerile grupului, nu gustul obligatoriu al fiecăruia.']],
    check: 'Arată dacă discuți o cantitate verificabilă sau ce îi place unei persoane.'
  },
  'log-13': {
    words: [['Dovadă relevantă', 'O informație care ajută la verificarea exact a întrebării puse.'], ['Concluzie limitată', 'Spui doar cât susțin observațiile, nu o regulă despre toate situațiile.']],
    explain: 'Pentru lungime este utilă măsurarea, nu numărul celor care preferă o culoare. Pentru cantitate este utilă numărarea. Verifică și metoda: dacă două persoane folosesc repere diferite, rezultatele pot să nu fie comparabile.',
    worked: ['Măsor panglicile cu aceeași riglă: albastra are 8 cm, roșia 11 cm.', 'Compar numerele în aceeași unitate: 11 este mai mult decât 8.', 'Conchid că această panglică roșie este mai lungă, nu că toate panglicile roșii sunt.'],
    goals: ['Să aleagă dovada potrivită întrebării', 'Să compare metodele de obținere a informației', 'Să limiteze concluzia la obiectele și condițiile observate'],
    reflection: [['De ce trei oameni care repetă o ghicire nu sunt trei verificări?', 'Întreabă dacă fiecare a numărat sau doar a copiat același răspuns.'], ['Ce ai păstra la fel când compari două măsurători?', 'Verifică unitatea, reperul de început și obiectul măsurat.']],
    check: 'Leagă dovada de întrebare și spune ce nu poți concluziona din ea.'
  },
  'log-14': {
    words: [['Sursă', 'Persoana sau locul de unde vine informația.'], ['Informație actuală', 'O informație potrivită perioadei despre care întrebi.']],
    explain: 'O fotografie veche poate arăta corect trecutul, fără să arate programul de azi. Două pagini care copiază același anunț nu sunt două confirmări independente. Caută cu un adult cine a publicat, când și despre ce zi vorbește.',
    worked: ['Citesc afișul vechi care spune că biblioteca deschide sâmbăta.', 'Compar cu anunțul săptămânii actuale despre reparații.', 'Întreb la bibliotecă pentru sâmbăta dorită; nu aleg după mărimea titlului.'],
    goals: ['Să identifice sursa și perioada unei informații', 'Să deosebească repetarea de verificarea independentă', 'Să ceară sprijin pentru o verificare sigură, inclusiv pentru răspunsuri ale programelor'],
    reflection: [['Poate un anunț vechi să fi fost corect la data lui?', 'Separă întrebarea despre trecut de cea despre programul actual.'], ['Ce faci când două surse nu se potrivesc?', 'Compară datele și autorii, cere ajutor și păstrează „nu știu încă” dacă nu poți confirma.']],
    check: 'Nu prezenta informația ca sigură doar pentru că este repetată, populară sau spusă hotărât.'
  },
  'inf-1': {
    words: [['Intrare', 'Datele sau comenzile primite de calculator.'], ['Ieșire', 'Rezultatul prezentat de calculator, de exemplu pe ecran sau prin sunet.']],
    explain: 'Urmărește traseul unei singure comenzi. Tastatura transmite ce ai apăsat, programul urmează instrucțiunile, iar ecranul afișează rezultatul. Dispozitivul și programul au roluri diferite; calculatorul nu ghicește singur ce ai vrut.',
    worked: ['Apăs tasta A: aceasta este intrarea.', 'Programul folosește comanda pentru a alege semnul de afișat.', 'Pe ecran apare A: aceasta este ieșirea.'],
    goals: ['Să identifice un dispozitiv de intrare', 'Să descrie rolul programului între comandă și rezultat', 'Să recunoască o ieșire vizuală sau sonoră'],
    reflection: [['Este ecranul același lucru cu programul de scris?', 'Compară obiectul pe care vezi rezultatul cu instrucțiunile care îl produc.'], ['Ce se schimbă dacă introduci un sunet prin microfon?', 'Intrarea poate fi sunet, nu doar o literă apăsată.']],
    check: 'Descrie un traseu complet: ce intră, ce urmează programul și ce rezultat observi.'
  },
  'inf-2': {
    words: [['Focalizare', 'Elementul ales în acel moment pentru folosirea tastaturii.'], ['Cursor de text', 'Semnul care arată unde va fi introdus textul.']],
    explain: 'Caută conturul vizibil înainte să apeși Enter. Tasta Tab mută alegerea între elemente, nu scrie un spațiu într-un cuvânt. Într-o căsuță de text, Spațiu separă cuvintele, iar Backspace șterge semnul din stânga locului de scriere.',
    worked: ['Apăs Tab până când butonul dorit are contur.', 'Dacă am trecut de el, revin cu Shift și Tab.', 'Apăs Enter pentru activare și observ efectul, fără să apăs repetat la întâmplare.'],
    goals: ['Să găsească un control folosind conturul de focalizare', 'Să navigheze înainte și înapoi prin tastatură', 'Să distingă activarea unui buton de editarea textului'],
    reflection: [['Ce verifici înainte de Enter?', 'Numește butonul care are contur, nu locul unde este mouse-ul.'], ['Cum corectezi o literă introdusă din greșeală?', 'Privește cursorul și folosește Backspace pentru semnul din stânga lui.']],
    check: 'Poți identifica elementul ales și efectul comenzii înainte de a continua.'
  },
  'inf-3': {
    words: [['Algoritm', 'O serie de pași clari pentru o sarcină.'], ['Dependență', 'Un pas care are nevoie să fie făcut mai întâi alt pas.']],
    explain: 'O instrucțiune trebuie să îi spună partenerului ce să facă, nu doar „fă bine”. La plantare nu poți acoperi sămânța înainte de a o așeza. Pentru alți pași pot exista mai multe ordini corecte; spune ce ordine cere exercițiul.',
    worked: ['Pregătesc ghiveciul cu pământ și locul seminței.', 'Așez sămânța, apoi o acopăr cu pământ.', 'Ud ușor și verific că am urmat pașii, cu sprijinul adultului.'],
    goals: ['Să exprime rezultatul urmărit', 'Să ordoneze pași cu dependențe clare', 'Să testeze dacă instrucțiunile pot fi urmate de altcineva'],
    reflection: [['Ce nu ar merge dacă ai acoperi locul înainte să pui sămânța?', 'Urmărește de ce are nevoie pasul de acoperire.'], ['Cum îmbunătățești instrucțiunea „pregătește”?', 'Spune exact ce obiecte trebuie așezate și unde.']],
    check: 'Fiecare pas trebuie să poată fi executat folosind ceea ce există în acel moment.'
  },
  'inf-4': {
    words: [['Program', 'Comenzi pe care robotul le urmează în ordine.'], ['Depanare', 'Căutarea și corectarea unei erori din program.']],
    explain: 'Înainte să schimbi programul, compară locul unde voiai să ajungă robotul cu locul unde ajunge. Rulează câte un pas. Prima abatere îți arată unde să investighezi; apoi retestezi și comenzile care urmează.',
    worked: ['Ținta cere două căsuțe la dreapta; citesc „dreapta, jos”.', 'Prima comandă este potrivită, dar a doua coboară în loc să înainteze.', 'Înlocuiesc jos cu dreapta și verific din nou întregul traseu.'],
    goals: ['Să prezică rezultatul unui program scurt', 'Să localizeze prima comandă nepotrivită', 'Să retesteze traseul după o corectare'],
    reflection: [['De ce nu schimbăm toate comenzile de la început?', 'O schimbare mică ne permite să urmărim ce a rezolvat eroarea.'], ['Este suficient că prima comandă este bună?', 'Verifică unde se termină programul și dacă toți pașii sunt permiși.']],
    check: 'Programul reparat trebuie să ajungă la țintă fără ieșire din grilă sau obstacole traversate.'
  },
  'inf-5': {
    words: [['Condiție', 'O cerință pe care o verificăm pentru fiecare element.'], ['Cel mult zece', 'Zece sau mai puțin; și zece este inclus.']],
    explain: 'Citește cu atenție chiar numărul de la limită. „Mai mic decât 10” îl exclude pe 10, iar „cel mult 10” îl include. Pentru „par și mai mare decât 10” verifici două lucruri, nu alegi după unul singur.',
    worked: ['Aplic regula „mai mic decât 10”: 9 intră în prima grupă.', 'Verific 10: nu este mai mic decât el însuși, deci intră în grupa „cel puțin 10”.', 'Schimb regula în „cel mult 10”: acum și 10 intră în prima grupă.'],
    goals: ['Să interpreteze corect expresiile de la limita numerică', 'Să aplice aceeași condiție tuturor elementelor', 'Să justifice mutarea unui element după schimbarea regulii'],
    reflection: [['De ce 10 schimbă grupa când schimbăm regula?', 'Compară „mai mic” cu „cel mult”; nu s-a schimbat numărul, ci cerința.'], ['De ce 8 nu respectă „par și mai mare decât 10”?', 'Este par, dar mai trebuie verificată a doua condiție.']],
    check: 'Testează separat numărul aflat chiar la limita regulii.'
  },
  'inf-6': {
    words: [['Rutină', 'Activități repetate frecvent, într-o ordine care ne ajută.'], ['Pas obligatoriu înainte', 'Un pas de care depinde o activitate ulterioară.']],
    explain: 'Nu toate familiile și zilele au aceeași ordine. Caută ce depinde de altceva și ce poate fi ales. Pregătirea ghiozdanului trebuie terminată înainte de plecare, dar poate fi făcută seara sau dimineața. Planul trebuie să lase loc și pauzelor.',
    worked: ['Aleg scopul: să plec cu materialele necesare.', 'Verific orarul și pun materialele în ghiozdan înainte de plecare.', 'Aleg cu adultul când pregătesc ghiozdanul și văd dacă rutina funcționează.'],
    goals: ['Să stabilească scopul unei rutine', 'Să distingă o dependență de o alegere personală', 'Să adapteze un plan care nu funcționează în situația dată'],
    reflection: [['Pregătirea ghiozdanului trebuie făcută de toți la aceeași oră?', 'Important este să fie pregătit înainte de plecare; momentul poate varia.'], ['Ce ai modifica într-un plan fără timp de pauză?', 'Caută un loc pentru odihnă, fără a elimina nevoile importante.']],
    check: 'Explică de ce o ordine este necesară sau de ce sunt posibile mai multe variante.'
  },
  'inf-7': {
    words: [['Repetare', 'Executarea aceleiași comenzi de mai multe ori.'], ['Număr de repetări', 'De câte ori trebuie executată comanda aleasă.']],
    explain: '„Dreapta de trei ori” înseamnă trei pași separați, nu un salt peste căsuțe. Robotul verifică și căsuțele dintre plecare și țintă. O repetare este utilă numai dacă fiecare pas este permis și numărul corespunde distanței.',
    worked: ['Pentru trei căsuțe libere spre dreapta, aleg comanda dreapta.', 'Setez trei repetări: dreapta, dreapta, dreapta.', 'Urmăresc toate cele trei căsuțe și verific locul de oprire.'],
    goals: ['Să înlocuiască o serie de comenzi identice printr-o repetare', 'Să determine numărul de pași necesari', 'Să verifice obstacolele din interiorul unei repetări'],
    reflection: [['De ce nu putem repeta dreapta peste un obstacol?', 'Fiecare repetare intră în căsuța vecină; nu sare peste ea.'], ['Cum desfaci o repetare ca să o verifici?', 'Rostește pe rând fiecare comandă și mută un pion câte o căsuță.']],
    check: 'Comanda repetată și numărul ales trebuie să descrie exact pașii doriți.'
  },
  'inf-8': {
    words: [['Dacă', 'Introduce condiția pe care o verificăm.'], ['Atunci', 'Introduce acțiunea aleasă când condiția este îndeplinită.']],
    explain: 'Nu executa acțiunea înainte să citești condiția. În „dacă plouă, iau umbrela”, ai nevoie de informația despre vreme. Dacă nu ai această informație, nu presupune că plouă. Unele reguli spun și ce faci când condiția nu este îndeplinită.',
    worked: ['Citesc regula: dacă plouă, personajul ia umbrela.', 'Scena arată ploaie: condiția este îndeplinită.', 'Aleg umbrela pentru această scenă și spun ce informație mi-a ghidat alegerea.'],
    goals: ['Să identifice condiția și acțiunea dintr-o regulă', 'Să verifice condiția în situația dată', 'Să nu aplice automat aceeași acțiune în orice context'],
    reflection: [['Ce informație îți trebuie înainte să aplici regula umbrelei?', 'Caută ce spune scena despre vreme, nu despre culoarea umbrelei.'], ['Cum explici alegerea fără „așa am ghicit”?', 'Începe cu „Condiția spune…, în scenă observ…, deci…”.']],
    check: 'Arată condiția verificată și acțiunea care decurge din ea.'
  },
  'inf-9': {
    words: [['Date personale', 'Informații precum numele complet, adresa sau parola.'], ['Adult de încredere', 'O persoană care te ascultă și te ajută să fii în siguranță.']],
    explain: 'Un mesaj poate părea prietenos și totuși să ceară informații pe care nu le dai. Nu verifica singur un link necunoscut și nu continua o conversație care te sperie. Poți opri folosirea dispozitivului și arăta mesajul unui adult, fără să fii vinovat pentru ce ai primit.',
    worked: ['Personajul primește un mesaj necunoscut care cere adresa pentru un premiu.', 'Nu răspunde, nu introduce date și nu apasă linkul.', 'Arată mesajul unui adult de încredere pentru sprijin.'],
    goals: ['Să recunoască cereri de date personale', 'Să aleagă oprirea unei interacțiuni nesigure', 'Să ceară ajutor fără a trimite mai departe mesajul ca informație sigură'],
    reflection: [['Un premiu promis face sigură cererea de adresă?', 'Separă promisiunea de informația personală cerută.'], ['Ce faci dacă primul adult nu te-a auzit?', 'Repetă cererea sau caută alt adult de încredere; nu trebuie să rezolvi singur.']],
    check: 'Nu introduce date reale în exemple și nu deschide linkuri necunoscute pentru a testa lecția.'
  },
  'sci-1': {
    words: [['Igienă', 'Obiceiuri de curățenie care sprijină îngrijirea corpului.'], ['Stare de rău', 'Un semn că ai nevoie de atenție și sprijin, nu de învinovățire.']],
    explain: 'Obiceiurile bune ajută, dar nu promit că nu te vei îmbolnăvi niciodată. Când te doare ceva sau te simți rău, spune unui adult ce observi. Nu este sarcina copilului să stabilească boala ori să aleagă un medicament.',
    worked: ['Înainte de masă, personajul își spală mâinile cu apă și săpun.', 'Dacă se simte rău, spune adultului ce îl deranjează.', 'Adultul îl ajută să primească îngrijire; personajul nu ia singur medicamente.'],
    goals: ['Să aleagă un obicei de îngrijire potrivit situației', 'Să descrie un semn de disconfort pentru a cere ajutor', 'Să distingă îngrijirea de învinovățirea unei persoane bolnave'],
    reflection: [['Este vinovat cineva care se îmbolnăvește deși se îngrijește?', 'Obiceiurile sprijină sănătatea, dar nu controlează toate cauzele bolilor.'], ['Cum ai ajuta un coleg care spune că se simte rău?', 'Ascultă și anunță adultul, fără să îi oferi medicamente.']],
    check: 'Pentru durere sau stare de rău, răspunsul trebuie să includă sprijinul unui adult.'
  },
  'sci-2': {
    words: [['Rădăcină', 'Partea care, la multe plante, ia apă și săruri minerale și fixează planta.'], ['Condiții de creștere', 'Lucruri precum apa, lumina și temperatura care influențează dezvoltarea.']],
    explain: 'Părțile plantei lucrează împreună. Rădăcina primește apă, tulpina transportă, iar frunzele folosesc lumina în producerea hranei. Pentru a întreba ce efect are apa, păstrezi pe cât posibil aceleași condiții în afară de udare și observi mai multe zile.',
    worked: ['Aleg cu adultul două plante asemănătoare și aceeași lumină.', 'Notez cantitățile de apă și păstrez celelalte condiții comparabile.', 'Urmăresc schimbările și nu trag concluzia despre toate plantele dintr-o singură comparație.'],
    goals: ['Să lege rădăcina, tulpina și frunzele de rolurile lor', 'Să identifice condiția schimbată într-o comparație', 'Să descrie observații în timp fără să promită același rezultat tuturor plantelor'],
    reflection: [['De ce nu schimbăm și lumina când testăm apa?', 'Dacă se schimbă două lucruri, cauza diferenței rămâne neclară.'], ['Înseamnă mai multă apă întotdeauna mai bine?', 'Recitește nevoile plantei; prea multă apă poate dăuna.']],
    check: 'Spune ce s-a schimbat, ce a rămas comparabil și ce ai observat efectiv.'
  },
  'sci-3': {
    words: [['Habitat', 'Mediul în care trăiește un animal și găsește condiții potrivite.'], ['Trăsătură', 'O însușire observabilă a corpului sau a felului de a se mișca.']],
    explain: 'Compară mai multe trăsături înainte să formezi o grupă. Aripile singure nu arată că un animal este pasăre: și fluturele are aripi. Observă penele, picioarele și felul de a se deplasa, folosind imagini fără a deranja animalele.',
    worked: ['Privesc vrabia și observ pene și aripi.', 'Privesc fluturele: are patru aripi și șase picioare, nu pene.', 'Ambele pot zbura, dar nu sunt din aceeași grupă de animale.'],
    goals: ['Să descrie două trăsături ale unui animal', 'Să lege o trăsătură de deplasare sau de mediul de viață', 'Să verifice un exemplu care nu respectă o generalizare simplă'],
    reflection: [['De ce un pinguin rămâne pasăre deși nu zboară?', 'Privește penele și compară cu ideea că toate păsările trebuie să zboare.'], ['Cum observi o viețuitoare fără să o deranjezi?', 'Folosește o fotografie ori păstrează distanța împreună cu adultul.']],
    check: 'Nu grupa animalele după o singură asemănare fără să verifici și celelalte informații.'
  },
  'sci-4': {
    words: [['Topire', 'Trecerea din solid în lichid.'], ['Condensare', 'Trecerea vaporilor în picături de apă lichidă.']],
    explain: 'Apa nu dispare când se evaporă; ajunge în aer sub formă de vapori invizibili. Picăturile de pe exteriorul paharului rece pot proveni din vaporii din aer care se răcesc lângă el, nu din apa care ar trece prin sticlă.',
    worked: ['Observ gheața într-o cameră suficient de caldă: este solidă la început.', 'Primește căldură și devine apă lichidă: aceasta este topirea.', 'Privesc separat paharul rece: picăturile de afară se formează prin condensare.'],
    goals: ['Să numească starea inițială și finală a apei', 'Să deosebească topirea de condensare', 'Să explice că vaporii sunt invizibili și apa poate evapora fără fierbere'],
    reflection: [['De ce o baltă poate scădea fără să fiarbă?', 'Evaporarea poate avea loc și la temperaturi obișnuite.'], ['Picăturile de afară dovedesc că paharul este spart?', 'Caută explicația prin vaporii din aer, fără să presupui o scurgere.']],
    check: 'Leagă numele transformării de stările inițială și finală, fără apă fierbinte în activitatea copilului.'
  },
  'sci-5': {
    words: [['Organ', 'O parte a corpului care îndeplinește anumite funcții.'], ['Sistem', 'Mai multe părți ale corpului care lucrează împreună.']],
    explain: 'Nu este nevoie să înveți toate denumirile dintr-o dată. Urmărește o legătură: plămânii participă la luarea oxigenului din aer, iar sângele îl transportă prin corp cu ajutorul inimii. Organele nu lucrează izolat.',
    worked: ['Personajul respiră: plămânii participă la schimbul de gaze.', 'Inima pompează sângele care transportă oxigenul.', 'La mișcare, corpul poate avea nevoie de un transport mai rapid; nu folosim jocul pentru un diagnostic.'],
    goals: ['Să asocieze un organ cu o funcție de bază', 'Să descrie o legătură între două organe', 'Să ceară ajutor pentru durere în loc să își stabilească singur cauza'],
    reflection: [['Cum lucrează împreună plămânii și inima?', 'Urmărește oxigenul luat din aer și transportat de sânge.'], ['De ce o imagine cu organe nu explică singură o durere?', 'Aceeași senzație poate avea cauze diferite; adultul sprijină accesul la îngrijire.']],
    check: 'Explică o funcție simplă fără să folosești activitatea ca test medical.'
  },
  'sci-6': {
    words: [['Înregistrare', 'Notarea unei observații ca să nu o numeri din nou fără să știi.'], ['Observație incompletă', 'Vezi doar o parte și nu cunoști sigur întregul.']],
    explain: 'Stabilește mai întâi ce numeri și în ce loc. O pasăre care pleacă și revine poate fi aceeași, deci suma observațiilor nu spune automat câte păsări diferite au fost. Notează ceea ce vezi și spune când o parte este ascunsă.',
    worked: ['Într-un desen văd două insecte adulte cu câte șase picioare.', 'Calculez 6 + 6 = 12 pentru cele două insecte descrise.', 'Dacă o fotografie ascunde picioare, deosebesc ce cunosc despre insectă de ce am văzut direct.'],
    goals: ['Să stabilească obiectul și locul numărării', 'Să noteze observații fără dublă numărare neexplicată', 'Să distingă o cantitate observată de una calculată sau presupusă'],
    reflection: [['Poți afirma numărul tuturor petalelor dacă jumătate din floare este ascunsă?', 'Spune câte vezi, apoi precizează ce nu poți verifica.'], ['De ce două vizite ale unei păsări nu înseamnă sigur două păsări diferite?', 'Aceeași pasăre ar fi putut reveni.']],
    check: 'Însoțește numărul de ce, unde și cum ai numărat.'
  },
  'sci-7': {
    words: [['Textură', 'Cum se simte o suprafață, de exemplu netedă sau aspră.'], ['Informație senzorială', 'Ce află corpul prin văz, auz și celelalte simțuri.']],
    explain: 'Mai multe simțuri pot ajuta la aceeași observație. Poți vedea forma unui obiect și îi poți simți textura dacă este sigur de atins. Nu trebuie să guști sau să miroși de aproape o substanță necunoscută pentru a afla ce este.',
    worked: ['Privesc un material curat și sigur, pregătit de adult.', 'Îl ating doar dacă doresc și spun dacă este neted ori aspru.', 'Deosebesc textura aflată prin atingere de culoarea observată prin văz.'],
    goals: ['Să lege o informație de simțul folosit', 'Să compare ce află prin două simțuri diferite', 'Să aleagă observații sigure și să respecte refuzul de a participa'],
    reflection: [['Poți afla culoarea unei foi numai pipăind-o?', 'Atingerea îți poate spune textura, nu culoarea.'], ['Ce faci cu un obiect necunoscut care pare interesant de gustat?', 'Nu îl guști; întrebi adultul și alegi o observație sigură.']],
    check: 'Spune ce simț ai folosit și de ce observarea aleasă este sigură.'
  },
  'sci-8': {
    words: [['Evaporare', 'Trecerea apei lichide în vapori.'], ['Precipitații', 'Apă care cade din nori, ca ploaie sau ninsoare.']],
    explain: 'Săgețile din desen arată transformări și deplasări ale apei, nu dispariția ei. Un ciclu poate continua și nu are un singur început obligatoriu. În joc ordonăm traseul care este numit în cerință.',
    worked: ['Apa dintr-o baltă se evaporă treptat și ajunge ca vapori în aer.', 'Prin răcire se pot forma picături mici în nori.', 'Apa poate reveni ca precipitații și se poate aduna din nou la suprafață.'],
    goals: ['Să explice evaporarea și condensarea prin schimbări de stare', 'Să lege precipitațiile de revenirea apei la sol', 'Să urmărească traseul cerut fără a presupune un final definitiv'],
    reflection: [['De ce nu spunem că balta a dispărut fără urmă?', 'Apa se poate afla în aer ca vapori invizibili.'], ['Poți începe povestirea ciclului de la ploaie?', 'Continuă de la apă la sol și verifică dacă legăturile dintre etape se păstrează.']],
    check: 'Fiecare săgeată trebuie explicată printr-o schimbare sau o deplasare a apei.'
  },
  'sci-9': {
    words: [['Predicție', 'Ce crezi că se va întâmpla înainte să observi rezultatul.'], ['Factor schimbat', 'Lucrul ales să fie diferit între cele două situații comparate.']],
    explain: 'Scrie sau desenează ce crezi înainte de încercare. Apoi separă predicția de rezultat. Dacă schimbi mărimea cubului, farfuria și temperatura odată, nu vei ști care schimbare explică diferența observată.',
    worked: ['Aleg cuburi de aceeași mărime și farfurii identice.', 'Cu adultul, compar două camere cu temperaturi diferite, pornind simultan și fără surse periculoase de căldură.', 'Observ la aceleași intervale și compar rezultatul cu predicția, chiar dacă diferă.'],
    goals: ['Să formuleze o predicție înainte de observare', 'Să identifice o singură condiție schimbată', 'Să descrie rezultatul fără să îl modifice pentru a confirma predicția'],
    reflection: [['De ce pornim observarea celor două cuburi în același timp?', 'Altfel unul ar primi mai mult timp pentru topire.'], ['Ai eșuat dacă rezultatul este altul decât ai prezis?', 'Predicția este o idee de verificat, nu o promisiune.']],
    check: 'Notează separat predicția, condițiile și rezultatul observat.'
  },
  'sci-10': {
    words: [['Tabel de observații', 'Date organizate după zile sau grupe.'], ['Diferență între valori', 'Cât s-a adăugat sau scăzut între două măsurători.']],
    explain: 'Citește mai întâi ce numără tabelul și pentru ce moment. Numărul patru poate însemna frunze, păsări ori centimetri, după titlu și etichetă. Diferența dintre două valori arată o schimbare, dar nu îi stabilește singură cauza.',
    worked: ['Luni planta are 2 frunze, iar vineri 4.', 'Calculez creșterea numărului: 4 − 2 = 2 frunze.', 'Nu afirm doar din aceste numere că apa sau lumina au fost singura cauză.'],
    goals: ['Să citească etichetele și unitatea unui tabel', 'Să compare valorile pentru momentele cerute', 'Să distingă schimbarea observată de explicația cauzei'],
    reflection: [['Ce s-ar schimba dacă numerele ar reprezenta centimetri, nu frunze?', 'Păstrezi calculul, dar spui corect ce cantitate și unitate compari.'], ['Ce informație suplimentară ai căuta pentru a explica creșterea?', 'Întreabă despre condiții și despre o comparație potrivită, nu doar despre două numere.']],
    check: 'Concluzia trebuie să numească observația și perioada, fără o cauză inventată.'
  },
  'civ-1': {
    words: [['Sprijin', 'Ajutor oferit pentru o nevoie a unei persoane.'], ['Responsabilitate potrivită vârstei', 'O sarcină sigură pe care copilul o poate exersa cu sprijin.']],
    explain: 'Nu există un singur desen corect al unei familii. În povești putem urmări cine îngrijește, cine ascultă și cum se împart sarcinile. Copilul poate contribui, dar nu este responsabil de grijile sau siguranța adulților. Poți folosi personaje inventate.',
    worked: ['Într-o familie inventată, adultul pregătește mâncarea în siguranță.', 'Copilul așază șervețelele, o sarcină potrivită lui.', 'Când nu știe unde se pun, cere ajutor; nu preia gătitul periculos.'],
    goals: ['Să recunoască sprijinul în familii diferite', 'Să aleagă o contribuție sigură pentru un copil', 'Să numească o cale de a cere ajutor fără a oferi date personale'],
    reflection: [['Trebuie toate familiile să împartă sarcinile identic?', 'Compară nevoile și posibilitățile personajelor, fără roluri impuse după gen.'], ['Ce poate face un copil care nu se simte în siguranță?', 'Poate vorbi cu alt adult de încredere, de exemplu un învățător; nu este vina sa.']],
    check: 'Soluția trebuie să respecte siguranța copilului și diversitatea familiilor.'
  },
  'civ-2': {
    words: [['Limită', 'Ce spune o persoană că acceptă sau nu acceptă.'], ['Refuz respectat', 'Un nu după care celălalt se oprește, fără presiune.']],
    explain: 'Poți descrie comportamentul care te deranjează fără să numești persoana rea. Spune ce s-a întâmplat și ce ai nevoie să se schimbe. O prietenie nu îți cere să împrumuți mereu, să renunți la toate alegerile sau să accepți ceva neplăcut.',
    worked: ['Colegul ia creionul fără să întrebe.', 'Personajul spune: „Îl folosesc acum. Te rog să întrebi înainte”.', 'Dacă luarea continuă, cere sprijin unui adult, nu este obligat să cedeze.'],
    goals: ['Să descrie un comportament fără jignirea persoanei', 'Să formuleze o limită clară într-o poveste', 'Să recunoască presiunea și să ceară sprijin când limita nu este respectată'],
    reflection: [['Cum răspunzi unui prieten care nu vrea să împrumute?', 'Respectă răspunsul și caută altă soluție.'], ['Poți aprecia un prieten și să nu accepți o faptă a lui?', 'Separă relația de comportamentul care trebuie oprit.']],
    check: 'Relația nu trebuie folosită ca motiv pentru a încălca un refuz.'
  },
  'civ-3': {
    words: [['Regulă clară', 'Spune un comportament concret, nu doar „fii cuminte”.'], ['Adaptare', 'O schimbare care ajută o persoană să participe în siguranță.']],
    explain: 'Întreabă la ce ajută regula și dacă poate fi înțeleasă. „Vorbim pe rând ca să ne auzim” explică atât acțiunea, cât și motivul. Dacă o regulă este greu de urmat din cauza unei nevoi, adultul poate ajuta la o variantă potrivită.',
    worked: ['Regula cere să vorbim pe rând: scopul este să ne putem auzi.', 'Un copil are nevoie de o pauză de mișcare.', 'Discută cu adultul o pauză sigură; nevoia nu este tratată ca lipsă de respect.'],
    goals: ['Să lege o regulă de scopul ei', 'Să înlocuiască o formulare vagă cu o acțiune observabilă', 'Să propună cererea de sprijin sau adaptare pentru o nevoie'],
    reflection: [['Cum ai explica regula fără „așa trebuie”?', 'Începe cu „Facem… ca să…”.'], ['O regulă care rănește trebuie acceptată pentru că o spune un adult?', 'Respectul nu cere acceptarea răului; copilul poate căuta sprijin și siguranță.']],
    check: 'Regula trebuie explicată prin siguranță, participare sau respect, nu doar prin autoritate.'
  },
  'civ-4': {
    words: [['Acord', 'Acceptarea liberă a unei propuneri; persoana poate spune și nu.'], ['Ajutor potrivit', 'Sprijin cerut sau acceptat, sigur și legat de nevoie.']],
    explain: 'Înainte să iei lucrarea sau obiectele altcuiva, întreabă dacă vrea ajutor și ce parte ar fi utilă. A face totul în locul lui poate opri exersarea. Dacă sarcina este periculoasă, nu intervii singur ca să dovedești că ajuți.',
    worked: ['Un coleg strânge piesele și pare să aibă nevoie de sprijin.', 'Întreb „Vrei să te ajut? Cu ce parte?”.', 'Dacă acceptă, împărțim sarcina; dacă refuză, nu îi iau piesele.'],
    goals: ['Să întrebe înainte de a interveni', 'Să adapteze ajutorul la nevoia exprimată', 'Să distingă sprijinul sigur de o intervenție periculoasă'],
    reflection: [['Cum poate ajutorul să devină neplăcut?', 'Gândește-te la luarea lucrării fără acord sau la rezolvarea întregii sarcini în locul celuilalt.'], ['Ce faci dacă nu poți oferi ajutorul cerut?', 'Poți spune limita ta și poți căuta împreună un adult.']],
    check: 'Verifică acordul, nevoia și siguranța înainte de a numi o acțiune ajutor.'
  },
  'civ-5': {
    words: [['Deșeu', 'Un material de care ne debarasăm și pe care îl colectăm potrivit regulilor locale.'], ['Protejare', 'O acțiune care evită deteriorarea și păstrează siguranța.']],
    explain: 'Grija pentru natură nu înseamnă să atingi orice obiect sau animal întâlnit. Strânge doar materiale sigure în activitatea pregătită de adult. Pentru sticlă spartă, substanțe necunoscute ori animale sălbatice păstrezi distanța și ceri ajutor.',
    worked: ['La picnicul din poveste, grupul adună propriile ambalaje.', 'Observă o bucată de sticlă spartă și nu o ridică cu mâna.', 'Anunță adultul și respectă indicațiile locale pentru deșeuri.'],
    goals: ['Să prevadă urmările unei acțiuni asupra naturii', 'Să aleagă colectarea sigură a materialelor permise', 'Să recunoască situațiile în care trebuie păstrată distanța'],
    reflection: [['De ce nu hrănim un animal sălbatic ca să fim prietenoși?', 'Hrana și apropierea pot dăuna animalului ori persoanei.'], ['Cum ajuți când vezi un deșeu periculos?', 'Semnalezi locul adultului fără să atingi obiectul.']],
    check: 'O soluție bună protejează și viețuitoarele, și copilul.'
  },
  'civ-6': {
    words: [['Emoție', 'Ce trăim într-o situație, precum bucurie, teamă sau furie.'], ['Nevoie', 'Ce ne-ar ajuta, de exemplu pauză, spațiu ori sprijin.']],
    explain: 'Un desen al feței poate sugera o emoție, dar nu ne spune sigur ce simte o persoană. Întrebăm și acceptăm dacă nu dorește să explice. Orice emoție poate fi simțită; nu orice acțiune făcută când o simțim este sigură.',
    worked: ['Personajul tace înainte de prezentare; observ doar tăcerea.', 'Întreb cu grijă dacă vrea sprijin, fără să decid că este trist.', 'Dacă spune că este furios, pot respecta emoția și opri lovirea.'],
    goals: ['Să distingă semnul observabil de emoția presupusă', 'Să exprime o nevoie pentru un personaj', 'Să aleagă o acțiune sigură fără a interzice emoția'],
    reflection: [['Poate cineva simți și bucurie, și teamă înainte de excursie?', 'Cele două emoții pot exista împreună; nu trebuie aleasă obligatoriu una singură.'], ['Cum oferi sprijin fără să ceri o explicație personală?', 'Poți întreba dacă dorește o pauză sau companie și să respecți refuzul.']],
    check: 'Nu nota emoția persoanei ca greșită și nu o ghici sigur numai din față.'
  },
  'civ-7': {
    words: [['Conflict', 'O neînțelegere între persoane cu dorințe sau nevoi diferite.'], ['Soluție acceptată', 'O variantă asupra căreia persoanele pot fi de acord fără presiune.']],
    explain: 'Când situația este sigură, fiecare poate spune ce dorește și asculta. Propune mai mult de o variantă și întreabă dacă funcționează pentru amândoi. Dacă există amenințare sau lovire, nu continua negocierea singur.',
    worked: ['Doi copii vor aceeași minge și se opresc din a o trage.', 'Compară folosirea pe rând cu un joc comun.', 'Aleg împreună o variantă sau cer sprijinul adultului dacă nu se înțeleg.'],
    goals: ['Să identifice dorințele ambelor personaje', 'Să compare două soluții fără forțare sau umilire', 'Să recunoască situațiile în care siguranța cere ajutor'],
    reflection: [['De ce a ceda mereu nu rezolvă toate conflictele?', 'O soluție trebuie să țină seama și de nevoia celui care cedează.'], ['Cum verifici dacă soluția chiar este acceptată?', 'Întreabă fiecare personaj, fără amenințare sau promisiunea pierderii prieteniei.']],
    check: 'Soluția trebuie să poată fi acceptată liber și să nu rănească pe nimeni.'
  },
  'civ-8': {
    words: [['Limită personală', 'Ce acceptă persoana privind corpul, imaginea sau obiectele sale.'], ['Presiune', 'Insistența care încearcă să transforme un refuz în acceptare forțată.']],
    explain: 'Un nu este suficient ca să oprești o îmbrățișare sau o fotografie propusă. Persoana nu trebuie să prezinte un motiv ca să îi respecți refuzul. Poți fi dezamăgit și totuși să alegi un salut diferit.',
    worked: ['Personajul întreabă dacă poate îmbrățișa un coleg.', 'Colegul spune nu; personajul se oprește.', 'Propune un salut cu mâna, fără să insiste și fără să ceară justificări.'],
    goals: ['Să ceară acordul înainte de o atingere ori fotografie', 'Să recunoască și să respecte un refuz', 'Să ceară sprijin când o limită este încălcată'],
    reflection: [['Trebuie să explici de ce nu dorești un salut prin atingere?', 'Refuzul trebuie respectat și fără explicație.'], ['Ce poate face un copil cu un secret care îl sperie?', 'Îl poate spune unui adult de încredere; nu este vinovat pentru amenințare.']],
    check: 'După refuz, acțiunea se oprește; nu continuă prin rugăminți repetate sau amenințări.'
  },
  'civ-9': {
    words: [['Decizie de grup', 'O alegere despre o activitate comună.'], ['Participare', 'Posibilitatea fiecăruia de a lua parte în condiții potrivite.']],
    explain: 'Înainte de vot, verifică dacă opțiunile sunt sigure și dacă toți pot participa. Numărul voturilor poate alege între opțiuni potrivite, dar nu hotărăște valoarea unei persoane sau dacă are voie să fie inclusă.',
    worked: ['Grupul dorește să aleagă o activitate comună.', 'Verifică nevoile și variantele accesibile înainte de vot.', 'Compară preferințele dintre variantele potrivite și explică alegerea fără a exclude un coleg.'],
    goals: ['Să distingă o preferință de o nevoie de participare', 'Să verifice opțiunile înainte de vot', 'Să justifice o decizie prin siguranță și includere'],
    reflection: [['Este suficient că o variantă are cele mai multe voturi?', 'Verifică întâi dacă cineva ar fi exclus ori pus în pericol.'], ['Ce ai putea schimba pentru un coleg care nu poate folosi o variantă?', 'Caută alt format, alt loc sau o activitate comună accesibilă.']],
    check: 'Votul nu trebuie folosit pentru a decide cine merită respect sau participare.'
  },
  'civ-10': {
    words: [['Interes', 'Ceva despre care vrei să afli ori să exersezi mai mult.'], ['Calitate arătată prin fapte', 'O însușire precum răbdarea, recunoscută într-un comportament concret.']],
    explain: 'A vrea să afli despre plante nu este același lucru cu a prefera să le desenezi. Nici preferința nu dovedește ce știi deja să faci. Privește separat întrebarea, alegerea și fapta personajului, fără etichete despre valoarea lui.',
    worked: ['Mira vrea să afle cum cresc plantele: acesta este interesul.', 'Dintre desenele cu flori și mașini, le preferă pe cele cu flori.', 'Când ascultă un coleg până termină, arată respect printr-o faptă.'],
    goals: ['Să identifice interesul declarat de un personaj', 'Să distingă o preferință de o abilitate sau o faptă', 'Să descrie o calitate fără a eticheta întreaga persoană'],
    reflection: [['Poate Mira să aibă și alte interese?', 'O informație despre plante nu spune tot ce îi place sau vrea să afle.'], ['Ce dovadă arată respectul în exemplu?', 'Caută comportamentul observabil, nu culoarea preferată.']],
    check: 'Leagă interesul de o întrebare, preferința de o alegere și calitatea de o faptă.'
  },
  'civ-11': {
    words: [['Indiciu de ajutor', 'O orientare care te lasă să continui tu sarcina.'], ['Corectare', 'O schimbare făcută după compararea încercării cu cerința.']],
    explain: 'Când ceva nu se potrivește, caută locul diferenței înainte să refaci totul. O cerere clară de ajutor numește ce nu înțelegi. Poți cere un exemplu, primul pas sau o pauză; nu este nevoie ca altcineva să facă totul în locul tău.',
    worked: ['Compar cerc–pătrat–cerc cu încercarea cerc–cerc–cerc.', 'Diferența este la mijloc; Vlad cere ajutor să recunoască pătratul.', 'Schimbă piesa din mijloc și verifică din nou toate cele trei locuri.'],
    goals: ['Să localizeze o diferență față de model', 'Să formuleze o cerere concretă de sprijin', 'Să verifice întregul rezultat după schimbare'],
    reflection: [['Ce este mai util decât „Nu pot nimic”?', 'Poți spune „La acest pas nu înțeleg… Îmi arăți un indiciu?”.'], ['De ce comparăm din nou după corectare?', 'O schimbare poate ajuta sau nu; verificarea arată rezultatul.']],
    check: 'Greșeala descrie un pas de revizuit, nu valoarea copilului.'
  },
  'civ-12': {
    words: [['Plan', 'O alegere a pașilor și a timpului pentru un scop.'], ['Prioritate', 'Ce trebuie avut în vedere înaintea altor alegeri.']],
    explain: 'Un plan bun nu înseamnă să lucrezi fără pauze. Verifică ce trebuie terminat înainte de alt pas și cât sprijin este necesar. Rutinele pot varia între familii; în joc urmezi condițiile explicite ale personajului, nu o zi obligatorie pentru toți.',
    worked: ['Personajul trebuie să pregătească materialele înainte să înceapă proiectul.', 'Lucrează la proiect, apoi verifică și strânge materialele.', 'Pune o pauză într-un loc potrivit și adaptează planul cu adultul dacă este obosit.'],
    goals: ['Să ordoneze pași folosind condițiile explicite', 'Să lase loc pregătirii, verificării și pauzelor', 'Să distingă o rutină posibilă de o ordine obligatorie pentru toată lumea'],
    reflection: [['De ce pregătirea materialelor trebuie făcută înainte de folosirea lor?', 'Pasul de lucru depinde de obiectele disponibile.'], ['Cum observi că un plan trebuie schimbat?', 'Caută oboseala, lipsa unui material sau timpul insuficient și cere sprijin.']],
    check: 'Justifică ordinea prin condițiile poveștii și păstrează nevoile de odihnă.'
  },
  'civ-13': {
    words: [['Îngrijire personală', 'Acțiuni prin care răspundem nevoilor corpului cu sprijin potrivit.'], ['Odihnă', 'Timp de refacere, inclusiv somn și pauze.']],
    explain: 'Corpul poate cere apă, mișcare, hrană, curățenie sau odihnă în momente diferite. Alege acțiunea potrivită situației personajului, fără comparații despre cum arată corpul. Un obicei nu garantează lipsa bolii, iar durerea cere ajutor.',
    worked: ['După joacă, personajul observă că are mâinile murdare.', 'Înainte de masă le spală cu apă și săpun.', 'Dacă este obosit, cere o pauză; nu înlocuiește odihna cu obligația de a continua.'],
    goals: ['Să recunoască o nevoie de îngrijire în context', 'Să propună un obicei sigur și realizabil', 'Să ceară sprijin pentru disconfort sau stare de rău'],
    reflection: [['Poate aceeași soluție să răspundă tuturor nevoilor?', 'Setea și oboseala cer lucruri diferite; identifică întâi nevoia.'], ['Ce răspuns respectuos dai cuiva care are nevoie de pauză?', 'Acceptă nevoia și caută o variantă sigură cu adultul, fără rușinare.']],
    check: 'Leagă obiceiul de o nevoie concretă, nu de etichete precum copil bun sau rău.'
  },
  'civ-14': {
    words: [['Ascultare', 'Atenție la mesaj și spațiu pentru răspuns, fără obligația de contact vizual.'], ['Cerere clară', 'Spune ce ar ajuta, fără să jignească sau să amenințe.']],
    explain: 'Înainte să propui o soluție, verifică dacă ai înțeles nevoia. Poți repeta în cuvintele tale și întreba. A asculta nu înseamnă să accepți orice cerere; și tu, și celălalt puteți păstra limitele personale.',
    worked: ['Mara spune că are nevoie de liniște ca să citească.', 'Dan întreabă: „Ai nevoie de liniște pentru citit, am înțeles?”.', 'După confirmare, propun o variantă permisă care îi ajută pe amândoi.'],
    goals: ['Să identifice nevoia din mesajul unui personaj', 'Să reformuleze și să verifice înțelegerea', 'Să compare o cerere respectuoasă cu presiunea sau jignirea'],
    reflection: [['De ce întrebăm înainte să alegem soluția?', 'Poate persoana cere spațiu, nu să îi rezolvăm lucrarea.'], ['Poți asculta și apoi refuza o cerere?', 'Da; verifică siguranța și propriile limite, apoi propune o alternativă dacă dorești.']],
    check: 'Cererea trebuie să fie clară, iar soluția să respecte și dreptul de a refuza.'
  },
  'civ-15': {
    words: [['Meserie', 'O muncă pentru care oamenii se pregătesc și învață.'], ['Voluntariat', 'O contribuție oferită din timpul propriu pentru a sprijini o activitate sau comunitatea.']],
    explain: 'Aceeași persoană poate avea mai multe roluri. Urmărește ce face și în ce context, nu numele, genul sau hainele. În joc potrivim contribuția exact descrisă; aceasta nu spune că numai acea persoană poate face activitatea.',
    worked: ['Ana conduce autobuzul la serviciu: acesta este rolul meseriei sale.', 'Duminică citește voluntar povești la bibliotecă.', 'Este aceeași persoană, dar contextul și contribuția descrisă diferă.'],
    goals: ['Să lege o persoană de contribuția explicit descrisă', 'Să distingă meseria de un rol de voluntar sau vecin', 'Să recunoască mai multe roluri fără stereotipuri despre gen'],
    reflection: [['De ce nu alegem meseria numai după prenumele persoanei?', 'Numele nu arată ce pregătire sau activitate are; citește descrierea.'], ['Poate un vecin ajuta fără ca acel ajutor să fie meseria lui?', 'Compară o contribuție între vecini cu munca descrisă la serviciu.']],
    check: 'Justifică perechea prin activitatea din poveste, nu prin aspectul persoanei.'
  },
  'civ-16': {
    words: [['Revizuirea părerii', 'Schimbarea unei concluzii când ai informații potrivite noi.'], ['Presiune de grup', 'Cererea de a spune ca ceilalți doar pentru a fi acceptat.']],
    explain: 'Poți păstra o concluzie susținută sau o poți schimba după o verificare. Important este motivul, nu cine vorbește mai tare. Nu trebuie să ai imediat un răspuns și nu trebuie să îți schimbi gusturile ca să arăți că înveți.',
    worked: ['Dan crede că sunt șase jetoane.', 'Numără cinci pe tavă și verifică săculețul gol.', 'Spune „Am crezut șase, am verificat cinci, îmi corectez răspunsul”, fără să se învinovățească.'],
    goals: ['Să identifice informația nouă care justifică o schimbare', 'Să deosebească dovada de presiunea de a fi de acord', 'Să exprime corectarea fără etichete negative despre persoană'],
    reflection: [['Ce motiv ar fi nepotrivit pentru a spune că sunt șase?', '„Ca să nu se supere grupul” nu este o numărare.'], ['Când poți păstra o preferință diferită?', 'O altă poveste preferată nu este o greșeală demonstrată prin numărare.']],
    check: 'Explică ce informație a schimbat concluzia sau de ce nu există încă un motiv să o schimbi.'
  },
  'civ-17': {
    words: [['Dezacord', 'Două persoane au răspunsuri sau păreri diferite.'], ['Motiv', 'Ce observație, nevoie sau informație susține ce spui.']],
    explain: 'Poți spune respectuos că observi altceva, inclusiv unui adult. Adultul are responsabilitatea să asculte fără pedeapsă sau ridiculizare. Nu trebuie să îl convingi cu orice preț și nu trebuie să continui o discuție amenințătoare.',
    worked: ['Adultul spune cinci creioane, iar Ana observă patru.', 'Ana răspunde „Eu număr patru. Putem verifica împreună?”.', 'Adultul numără și își corectează răspunsul; dacă discutau preferințe, puteau rămâne diferiți.'],
    goals: ['Să formuleze un dezacord despre idee fără jignirea persoanei', 'Să propună verificarea unei afirmații a adultului', 'Să distingă discuția sigură de o amenințare care cere sprijin'],
    reflection: [['Ce este diferit între „Nu ești bun” și „Eu număr patru”?', 'Prima atacă persoana; a doua descrie observația verificabilă.'], ['Ai eșuat dacă celălalt nu își schimbă preferința?', 'Poți explica și asculta fără câștigător; siguranța și respectul rămân importante.']],
    check: 'Dezacordul nu este pedepsit; copilul nu trebuie să accepte automat sau să câștige disputa.'
  }
};

ACTIVITIES.forEach(activity => {
  const detail = LESSON_DETAILS[activity.id];
  if (!detail) throw new Error('Lipsesc explicațiile detaliate pentru ' + activity.id + '.');
  activity.detail = detail;
  activity.objectives = [activity.objectives[0]].concat(detail.goals);
  activity.reflection = [
    { question: activity.questions[0], support: 'Pornește de la exemplul rezolvat. Poți arăta cu degetul, desena sau începe cu „Am observat…”.' }
  ].concat(detail.reflection.map(pair => ({ question: pair[0], support: pair[1] })), [
    { question: 'Ce poți arăta acum și unde ai mai avea nevoie de sprijin?', support: detail.check + ' Poți spune „Pot să…” sau „Aș mai vrea un exemplu pentru…”. Nu trebuie să dovedești totul din prima.' }
  ]);
});
