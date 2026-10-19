# Atelierul Școlar

Atelier educațional static, în limba română, pentru copii de **6–8 ani** și adulții care îi sprijină. Nu necesită cont, server de aplicație, build sau pachete externe.

## Pornire

```bash
npm run serve
# deschide http://localhost:8080
```

Fișierele pot fi deschise și direct în browser. Pentru salvare predictibilă, recomandăm serverul static: comportamentul `localStorage` pentru adrese `file:` diferă între browsere. Progresul nu se sincronizează între dispozitive sau adrese diferite.

## Conținut

**72 de activități, fiecare cu trei niveluri deschise** — Descopăr, Exersez, Provocare — și un traseu suplimentar cu 11 opriri despre învățare.

| Disciplină | Activități |
|---|---:|
| Matematică | 12 |
| Limba română | 10 |
| Logică și gândire | 14 |
| Informatică | 9 |
| Științe și natură | 10 |
| Dezvoltare personală | 17 |

Fiecare dintre cele 72 de lecții include explicații suplimentare proprii, cel puțin două noțiuni definite, o rezolvare în minimum trei pași vizibili, patru obiective concrete și patru întrebări de reflecție cu sprijin pentru formularea răspunsului. Sunt păstrate explorarea cu materiale, pașii ghidați, autocontrolul, capcana de evitat și îndrumările pentru adulți. Copilul poate alege materiale, repeta și schimba nivelul fără blocaje sau cronometru.

„Descoperă” este un caiet vizual: copertă ilustrată, cartonașe tematice, masă de explorare, rezolvare cu pași vizibili, notiță de verificare și activitate practică. Ilustrațiile SVG sunt originale și locale. La matematică, copilul poate desface un grup de zece, roti o formă, muta reperele riglei, regla ceasul, echilibra cantități, modifica un buget sau colora optimi. Aceste explorări nu dau stele. La celelalte discipline, opririle interactive invită la predicție, reprezentare și explicarea pașilor lecției. Toate barele numerice au și butoane plus/minus de minimum 48 px; valorile, pașii și limitele sunt aceleași prin atingere, tragere sau tastatură.

Explorările precizează acum ce avem la început, ce control folosim și ce observăm. Activitățile de reflecție nu cer schimbarea unei imagini: afișează situația concretă, materialele opționale și butoane cu instrucțiunile reale ale pașilor. Primul pas este deschis de la început. Copilul poate răspunde oral, prin desen sau cu obiecte, fără să introducă text și fără să dezvăluie experiențe personale.

Dezvoltarea personală păstrează activitățile despre familie, prietenie, reguli, emoții, cooperare, conflicte și limite. Sunt adăugate șase teme: autocunoaștere, învățarea din greșeli și solicitarea ajutorului, organizare și pauze, îngrijire personală, ascultare și exprimarea nevoilor, meserii și roluri în comunitate. Exercițiile folosesc situații fictive și nu notează emoțiile sau preferințele copilului. Identificatorii `civ-1`–`civ-9` rămân neschimbați, astfel încât legăturile și rezultatele existente se păstrează.

Explicațiile pornesc de la obiecte și exemple familiare: „unitate” este definit printr-un obiect numărat, iar zecile prin grupuri de câte zece. În jocul de construire a numerelor, fiecare grup desenat are zece segmente vizibile. Nu se introduce noțiunea de zecime într-o avertizare despre numărare.

### Traseul „Gândesc cu mintea mea”

Șase activități legate între ele, în disciplinele existente, fără o categorie nouă:

1. [Ce observ și ce presupun?](activity.html?activity=log-11) — observație, explicații posibile și „Nu știu încă”.
2. [Fapt sau preferință?](activity.html?activity=log-12) — afirmații verificabile, care pot fi și greșite, și gusturi personale care pot diferi.
3. [Ce dovezi avem?](activity.html?activity=log-13) — dovezi relevante, măsurare, verificări separate și limitele unei concluzii.
4. [De unde vine informația?](activity.html?activity=log-14) — sursă, dată, informație copiată și verificare sigură cu sprijin; nici un adult, nici un program nu are automat dreptate.
5. [Pot să-mi schimb părerea](activity.html?activity=civ-16) — revizuirea unei concluzii după dovezi, nu din presiune sau rușine.
6. [Nu sunt de acord și pot explica de ce](activity.html?activity=civ-17) — dezacord respectuos inclusiv cu un adult, fără obligația de a convinge sau de a accepta răspunsul lui.

Traseul apare pe pagina de acasă, în cele două discipline și la finalul fiecărei lecții din traseu, cu marcarea opririi curente. Cele 18 sesiuni au 54 de întrebări redactate, cu explicații; explorările practice și reflecția rămân fără notă. Jocurile verifică informații și alegeri din situații fictive, nu preferințele copilului, supunerea sau o presupusă certificare a gândirii independente.

Îndrumarea adultului invită explicit dezacordul, ascultarea fără pedeapsă sau ridiculizare și recunoașterea propriilor greșeli. Copilul nu trebuie să își dezvăluie experiențele, să provoace o dispută sau să convingă o persoană care îl amenință. Siguranța are prioritate; regulile de siguranță pot fi explicate fără experimente periculoase.

Motoarele noi includ:

- construire și schimburi între zeci și unități;
- deplasare pe axa numerică, numere necunoscute, operații inverse și completarea unui grup de zece;
- răspunsuri numerice deschise și verificarea tuturor pașilor unei probleme, nu doar a rezultatului final;
- construcție de triunghiuri, pătrate și dreptunghiuri pe grilă, inclusiv soluții rotite sau alternative;
- selecție multiplă după proprietăți, desene în oglindă și pavări cu piese rotibile de două pătrățele;
- compararea suprafeței cu lungimea conturului, ca extensie ghidată;
- măsurare pe riglă, inclusiv pornire de la un reper diferit de zero;
- colorarea părților egale și completarea unei fracții, cu mai multe aranjamente corecte;
- construire de cuvinte din silabe și completare cu diacritice;
- lectură cu informații explicite, deducții și interpretarea observațiilor;
- predicție, model simplificat și explicație pentru experimente;
- situații cu alegeri, consecințe și justificări;
- matrici și clasificare după două proprietăți;
- robot pe grilă, obstacole, depanare și repetări.

Sunt păstrate și dezvoltate asocierea, ordonarea cu posibilitate de corectare, memoria, clasificarea, formele, balanța, magazinul cu buget, problemele în doi pași și ceasul. Balanța poate fi în echilibru sau înclinată în oricare direcție; la nivelurile avansate apar mase necunoscute. Magazinul cere un bon, restul sau cantitatea maximă permisă de buget. La ceas, nivelul intermediar permite reglarea acelor; nivelul avansat cere calculul unui interval. Catalogul suportă 23 de tipuri de joc, inclusiv motorul cu cele trei mecanici de investigație, reparație și planificare. Tipul de numărare simplă rămâne testat și disponibil, fără să fie folosit de lecțiile actuale.

Geometria alternează mecanici în aceeași sesiune. Desenarea are instrucțiuni vizibile, un exemplu de legare a două puncte și colțuri numerotate în ordinea alegerii. Copilul apasă punctele, închide conturul prin buton sau apăsând din nou primul punct, apoi verifică figura. Nu este necesară tragerea cu degetul. Verificarea construcțiilor ține cont de laturi, unghiuri, contur simplu și, când este cerută, suprafață; nu compară desenul cu o singură listă de puncte. Mozaicurile sunt generate împreună cu o pavare validă, dar acceptă orice acoperire completă fără suprapunere. La măsurare și fracții se păstrează și o verificare conceptuală: de exemplu, de ce două bucăți inegale nu sunt jumătăți.

Balanța desenează exact numărul de cuburi din cerință, iar talerul mai greu coboară. Talerele și etichetele nu se rotesc odată cu bara. Masele necunoscute apar pe piese separate, iar valorile sunt repetate în etichete HTML mari, inclusiv pe telefon și în tema întunecată. Reperele de început și de sfârșit ale riglei sunt de asemenea afișate separat, fără a cere citirea unor cifre micșorate.

Indiciile au două trepte: orientare, apoi explicația verificării. După o greșeală copilul poate corecta. Avansarea se face explicit, prin „Continuă”.

### Alegerea jocului

**Fiecare dintre cele 72 de lecții are minimum patru jocuri distincte**, afișate prin cartonașe cu titlu și obiectiv:

1. Jocul inițial al lecției, cu mecanicile și evaluarea deja existente.
2. **Investigație:** copilul alege toate informațiile relevante pentru întrebarea dintr-o poveste și lasă deoparte detaliile adevărate, dar fără legătură.
3. **Reparație:** găsește unicul pas greșit dintr-o rezolvare și alege o înlocuire corectă. Identificarea locului și corectarea sunt verificate separat în aceeași încercare.
4. **Construcție și verificare:** construiește un plan în trei pași din patru cartonașe, apoi alege o verificare a rezultatului. Un plan corect nu încheie jocul fără verificarea finală.

Cele trei mecanici noi au titluri și situații redactate pentru fiecare lecție: **216 jocuri noi**, susținute de **216 cazuri distincte** (trei cazuri pentru fiecare lecție, câte unul pentru fiecare nivel). Cele trei mecanici lucrează diferit asupra cazului ales. Reluarea repetă același caz, cu opțiuni reordonate; schimbarea nivelului aduce altă situație, nu doar o amestecare a răspunsurilor. Nu promitem generare infinită de cazuri.

Investigațiile, reparațiile și planurile sunt practică fără stele și nu modifică rezultatele salvate. Cazurile de dezvoltare personală verifică informații și acțiuni din povești fictive, nu emoțiile, preferințele, supunerea ori experiențele copilului. Planurile urmăresc dependențe explicite sau ordinea anunțată în poveste; nu impun o singură rutină pentru toate familiile.

Lecțiile cu mai multe mecanici păstrează și selectorul de variante suplimentare ale jocului inițial: geometrie (construcție, simetrie, mozaic, proprietăți și suprafață/contur), zeci și unități (construire, descompunere, schimb), adunare/scădere (axă, număr ascuns, operații inverse, problemă în doi pași) și robot (traseu, depanare, repetări). Aceste variante reutilizează mecanicile existente și sunt suplimentare celor patru cartonașe principale. Suprafața și conturul se aleg de la nivelul Exersez; revenirea la Descopăr selectează explicit runda completă.

**Runda completă** rămâne opțiunea inițială și păstrează evaluarea și verificările conceptuale existente. **Jocul ales separat** este practică fără stele: nu salvează o rundă și nu modifică rezultatele sau competențele deja obținute. Schimbarea jocului ori nivelului abandonează încercarea în curs. Alegerea jocului se păstrează la schimbarea nivelului dacă este disponibilă; schimbarea profilului revine la runda completă.

Cartonașele din Descoperă sunt organizate în două coloane verticale independente, cu distanțe constante între vecini, nu în rânduri întinse de înălțimea explorării. Pe telefon, explicația și rezolvarea preced explorarea și activitatea practică. Citirea vocală include și vocabularul, explicațiile noi, rezolvarea și criteriul de verificare.

## Setări pentru fiecare profil

Gestionarea profilurilor, crearea lor și importul/exportul sunt numai în Setări, nu pe pagina principală. În antetul tuturor celor cinci pagini apare vizibil avatarul și pseudonimul profilului activ, cu legătură spre Setări. Indicatorul se actualizează la redenumire, schimbarea profilului și import.

Pagina [Setări](settings.html) este accesibilă din antetul tuturor paginilor. Permite:

- font simplu de citit, scris caligrafic românesc Playwrite RO sau font cu serife;
- mărimea textului de 100%, 110%, 125% sau 150%, aplicată în tot atelierul, cu exemplu de citire;
- temă luminoasă, întunecată sau după dispozitiv, sunete pornite/oprite și animații reduse;
- alegerea unui avatar local și schimbarea pseudonimului, fără date personale;
- nivel de joc preferat, fără blocarea celorlalte niveluri.

Fontul implicit este cel simplu, la 100%. Preferințele de aspect se salvează automat; pseudonimul are buton separat de salvare. Butoanele rapide pentru temă și sunet modifică preferințele profilului activ. Modificarea exclusivă a preferințelor în altă filă actualizează aspectul fără să abandoneze jocul în curs; schimbarea profilului sau a progresului rămâne anunțată și oprește runda neîncheiată. Reducerea mișcării cerută de dispozitiv este întotdeauna respectată. Restabilirea setărilor nu șterge pseudonimul sau progresul; resetarea progresului nu șterge setările.

Exportul/importul include preferințele. Fișierele vechi fără setări sunt acceptate, iar valorile invalide sunt respinse înainte de înlocuirea datelor. La încărcarea profilurilor vechi sunt preluate preferințele anterioare de temă și sunet de pe dispozitiv. Setările sunt locale, nu se sincronizează între dispozitive. Dacă salvarea eșuează, eroarea este afișată, iar datele din sesiune pot fi exportate.

## Progres și limitele evaluării

- **Parcurs:** explicația a fost marcată ca citită; nu acordă stele.
- **Exersat:** s-a încheiat cel puțin o rundă.
- **Stea de independență:** minimum 80% din sarcini rezolvate din prima, fără niciun indiciu, într-o rundă evaluată obiectiv. Repetarea nu dublează steaua.
- **Stăpânit:** toate cele trei niveluri ale activității au stea.
- **Scrierea liberă:** verificări limitate de formă și listă de autoevaluare, fără certificare automată a sensului sau gramaticii și fără stele de competență.
- **Memoria:** exercițiu de strategie, fără notă sau certificare a inteligenței. Rămâne „Exersat”.

Se păstrează pentru fiecare nivel numărul de runde, cel mai bun rezultat, ultimul rezultat, indiciile și corectările ultimei runde. Recomandările de pe pagina de acasă propun revenirea la activități obiective încă nestăpânite. Acesta nu este un diagnostic sau un substitut pentru evaluarea unui profesor.

### Profiluri, copii de siguranță și migrare

Pe pagina Acasă pot fi create până la 12 profiluri locale cu pseudonime. Exportul JSON conține toate profilurile; importul este validat și înlocuiește datele doar după confirmare. Limita unui import este de 2 MB. Resetarea afectează numai profilul activ.

Datele folosesc cheia `atelier-scolar-progress-v2`. La prima utilizare se migrează progresul vechi din cheia cu sufix de adresă sau din cheia simplă v1: stelele vechi se păstrează, iar activitățile sunt marcate „Parcurs”, nu declarate automat stăpânite. Datele vechi nu sunt șterse.

Erorile de stocare sunt afișate. Dacă salvarea nu funcționează, progresul rămâne în memorie și poate fi exportat înainte de închiderea paginii. Dacă datele existente sunt corupte, salvarea peste ele este blocată până la un import valid sau o resetare explicită.

## Accesibilitate și confidențialitate

- Controale HTML native, navigare prin tastatură, focalizare vizibilă și legătură de salt la conținut.
- Taburi cu stări ARIA și navigare prin săgeți, Home și End.
- Mesaje de feedback anunțate cititoarelor de ecran; descrieri pentru forme, ceas și grilă.
- Aspect adaptat de la 320 px, temă luminoasă/întunecată și reducerea animațiilor prin preferința sistemului.
- Citirea explicațiilor este opțională și folosește numai o voce română locală, dacă browserul oferă una. Dacă nu există, aplicația explică limitarea.
- Fontul cursiv opțional **Playwrite RO** este inclus local, cu diacriticele românești și tabelele pentru legarea literelor verificate. Se bazează pe cercetarea scrisului de mână predat în România. Nu este un font oficial al Ministerului Educației, iar modelele din manuale pot avea mici diferențe. Nu se aplică îngroșare sau înclinare artificială. Secțiunea pentru adulți, profilurile, controalele de setări, cifrele tehnice și etichetele balanței folosesc fonturi de sistem pentru lizibilitate.
- Fără servicii de analiză, cereri către Google Fonts sau trimiterea rezultatelor și textelor scrise către un server. Textele libere nu se salvează în progres.
- Exemplele de experimente sunt modele simplificate; activitățile reale cer supravegherea adultului și nu folosesc apă fierbinte sau substanțe necunoscute.

## Verificare

Fișierele JavaScript și CSS sunt încărcate cu aceeași versiune explicită în toate cele cinci pagini și în pagina testelor. Aplicația transmite versiunea și în legăturile interne, păstrând parametrii lecției sau disciplinei, pentru a evita și paginile HTML vechi din cache. La publicarea modificărilor acestor fișiere, actualizează parametrul `v` peste tot: astfel, browserul nu combină un motor de joc vechi din cache cu noua pagină. Testele verifică prezența și consistența versiunilor. Această versiune nu schimbă cheia progresului local și nu șterge profilurile.

Necesită Node.js 12 sau mai nou. Nu sunt necesare instalări.

```bash
npm run check         # sintaxă, structură, conținut generat, teste de regresie
npm run validate      # 72 de lecții, 216 niveluri, 11 opriri și legături vechi
npm test              # teste Node fără dependențe
```

Pentru verificările DOM, deschide [tests/browser.html](tests/browser.html) prin același server static. Pagina rulează testele și afișează rezultatele. Testele folosesc o cheie temporară de stocare și nu modifică progresul real. Verifică inițializarea și parcurgerea tuturor celor 216 sesiuni, corectarea răspunsurilor, indicii, reluare, ordonare, perechi, scriere, robot și memorie. Sunt testate și toate mesele de explorare, răspunsurile numerice invalide, construcțiile alternative, închiderea explicită a conturului, corectarea simetriei, rotirea/scoaterea pieselor și fracțiile cu părți nealăturate. Verificările compară și grafica efectivă cu datele: cuburi și poziția talerelor, acele ceasului, reperele riglei, vârfurile formelor, suprafața grădinii și intersecția lipsă din tabel. Pentru plus/minus se testează pașii, limitele, afișajul și dependențele dintre comenzi. Sunt verificate contextul și pașii explorărilor, controalele de setări, mărirea efectivă a textului cu 50%, nivelul preferat și grila la text mărit. Traseul de gândire are verificări pentru legături, oprirea curentă, îndrumarea adultului și corectarea tuturor celor 54 de întrebări prin controalele reale.

Testele Node verifică 21.600 de eșantioane lecție–nivel, soluțiile și limitele grilelor, pavarea completă, operațiile în pași, rigla, fracțiile, bugetele și prezența efectivă a glifelor ĂăÂâÎîȘșȚț în font. Verifică și izolarea preferințelor între profiluri, păstrarea progresului la redenumire, persistența, migrarea, importul/exportul, respingerea setărilor invalide și structura traseului de gândire.

Suita DOM parcurge 216 runde complete, 111 variante suplimentare și 648 sesiuni ale celor trei mecanici noi: **975 de sesiuni în total**. Verifică și corectarea dovezilor, locul și înlocuirea erorii, eliminarea unui pas nepotrivit, ordinea planului și verificarea finală obligatorie. Verifică marcarea practicii fără stele, vocabularul și rezolvările vizibile pentru toate lecțiile, cele patru obiective/reflecții și distanțele reale dintre cartonașele din stânga. Testele Node verifică și că selecția produce exclusiv mecanica cerută, respectă limitele de nivel și respinge explicit opțiunile inexistente.

Validatorul verifică structura, consistența răspunsurilor și anumite regresii de text. **Nu este un corector gramatical complet și nu certifică adevărul științific.** Conținutul trebuie revizuit editorial când se adaugă sau se schimbă lecții.

## Structură

```text
index.html              Pagina de acasă și recomandări
subject.html            Inventarul unei discipline
activity.html           Lecția, atelierul și progresul pe niveluri
dece.html               Traseul despre cum învățăm
settings.html           Preferințe de citire, aspect și profil
assets/js/data.js       Lecții, niveluri și întrebări redactate
assets/js/lesson-details.js Vocabular, explicații, rezolvări, obiective și reflecții pentru fiecare lecție
assets/js/mission-games.js Investigație, reparație și planificare cu verificare
assets/js/game-missions-*.js Cele 216 situații redactate pentru toate cele 72 de lecții
assets/js/engines.js    Generatoare, controale și evaluare pe rundă
assets/js/math-games.js Matematică vizuală, grile și verificări geometrice
assets/js/discovery.js  Caietul ilustrat și explorările fără notă
assets/js/preferences.js Valori implicite, validare și aplicarea preferințelor
assets/js/progress.js   Profiluri, rezultate, migrare și import/export
assets/js/render.js     Conținutul paginilor și semantica accesibilă
assets/js/dece.js       Conținutul și interacțiunile traseului
assets/js/app.js        Integrare, navigare, preferințe și notificări
assets/css/main.css     Aspect adaptabil, teme și focalizare
assets/fonts/           Font manuscris local și licența sa
validate-data.js        Validare fără dependențe
tests/                 Teste Node și teste DOM în browser
```

## Repere de design și licențe

Au fost consultate descrierile publice ale următoarelor instrumente pentru ideile de lucru, nu pentru copierea desenelor, exercițiilor sau codului:

- [The Math Learning Center — Number Pieces](https://www.mathlearningcenter.org/apps/number-pieces): reprezentări vizibile și schimburi între unități și zeci.
- [Toy Theater — Geoboard](https://toytheater.com/geoboard/): construirea figurilor prin puncte și investigarea proprietăților.
- [Toy Theater — Pattern Blocks](https://toytheater.com/pattern-blocks/): compunere, rotire și explorare cu piese.

Conținutul și ilustrațiile atelierului sunt redactate separat. Fontul nemodificat Playwrite RO, de autorii proiectului Playwrite/TypeTogether, provine din [depozitul Google Fonts](https://github.com/google/fonts/tree/main/ofl/playwritero). Modelul său este documentat în [Primarium — Romania](https://primarium.info/countries/romania/). Este redistribuit sub [SIL Open Font License 1.1](assets/fonts/playwrite-ro/OFL.txt), cu înștiințarea de copyright inclusă. Fontul variabil acoperă greutățile 100–400; aplicația nu simulează caractere aldine sau italice. Nu este încărcat de la un serviciu extern în timpul utilizării.
