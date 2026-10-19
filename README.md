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

Fiecare lecție include o idee de pornire, un exemplu rezolvat, pași ghidați, explorare cu materiale concrete, autocontrol, o capcană de evitat, reflecție și îndrumări pentru adulți. Copilul poate alege materiale, repeta și schimba nivelul fără blocaje sau cronometru.

„Descoperă” este un caiet vizual: copertă ilustrată, cartonașe tematice, masă de explorare, exemplu cu pași extensibili, notiță de verificare și activitate practică. Ilustrațiile SVG sunt originale și locale. La matematică, copilul poate desface un grup de zece, roti o formă, muta reperele riglei, regla ceasul, echilibra cantități, modifica un buget sau colora optimi. Aceste explorări nu dau stele. La celelalte discipline, opririle interactive invită la predicție, reprezentare și explicarea pașilor lecției. Toate barele numerice au și butoane plus/minus de minimum 48 px; valorile, pașii și limitele sunt aceleași prin atingere, tragere sau tastatură.

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

Sunt păstrate și dezvoltate asocierea, ordonarea cu posibilitate de corectare, memoria, clasificarea, formele, balanța, magazinul cu buget, problemele în doi pași și ceasul. Balanța poate fi în echilibru sau înclinată în oricare direcție; la nivelurile avansate apar mase necunoscute. Magazinul cere un bon, restul sau cantitatea maximă permisă de buget. La ceas, nivelul intermediar permite reglarea acelor; nivelul avansat cere calculul unui interval. Catalogul suportă 22 de motoare, dintre care 21 sunt folosite în lecțiile actuale; motorul de numărare simplă rămâne testat și disponibil.

Geometria alternează mecanici în aceeași sesiune. Desenarea are instrucțiuni vizibile, un exemplu de legare a două puncte și colțuri numerotate în ordinea alegerii. Copilul apasă punctele, închide conturul prin buton sau apăsând din nou primul punct, apoi verifică figura. Nu este necesară tragerea cu degetul. Verificarea construcțiilor ține cont de laturi, unghiuri, contur simplu și, când este cerută, suprafață; nu compară desenul cu o singură listă de puncte. Mozaicurile sunt generate împreună cu o pavare validă, dar acceptă orice acoperire completă fără suprapunere. La măsurare și fracții se păstrează și o verificare conceptuală: de exemplu, de ce două bucăți inegale nu sunt jumătăți.

Balanța desenează exact numărul de cuburi din cerință, iar talerul mai greu coboară. Talerele și etichetele nu se rotesc odată cu bara. Masele necunoscute apar pe piese separate, iar valorile sunt repetate în etichete HTML mari, inclusiv pe telefon și în tema întunecată. Reperele de început și de sfârșit ale riglei sunt de asemenea afișate separat, fără a cere citirea unor cifre micșorate.

Indiciile au două trepte: orientare, apoi explicația verificării. După o greșeală copilul poate corecta. Avansarea se face explicit, prin „Continuă”.

## Setări pentru fiecare profil

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

Necesită Node.js 12 sau mai nou. Nu sunt necesare instalări.

```bash
npm run check         # sintaxă, structură, conținut generat, teste de regresie
npm run validate      # 72 de lecții, 216 niveluri, 11 opriri și legături vechi
npm test              # teste Node fără dependențe
```

Pentru verificările DOM, deschide [tests/browser.html](tests/browser.html) prin același server static. Pagina rulează testele și afișează rezultatele. Testele folosesc o cheie temporară de stocare și nu modifică progresul real. Verifică inițializarea și parcurgerea tuturor celor 216 sesiuni, corectarea răspunsurilor, indicii, reluare, ordonare, perechi, scriere, robot și memorie. Sunt testate și toate mesele de explorare, răspunsurile numerice invalide, construcțiile alternative, închiderea explicită a conturului, corectarea simetriei, rotirea/scoaterea pieselor și fracțiile cu părți nealăturate. Verificările compară și grafica efectivă cu datele: cuburi și poziția talerelor, acele ceasului, reperele riglei, vârfurile formelor, suprafața grădinii și intersecția lipsă din tabel. Pentru plus/minus se testează pașii, limitele, afișajul și dependențele dintre comenzi. Sunt verificate contextul și pașii explorărilor, controalele de setări, mărirea efectivă a textului cu 50%, nivelul preferat și grila la text mărit. Traseul de gândire are verificări pentru legături, oprirea curentă, îndrumarea adultului și corectarea tuturor celor 54 de întrebări prin controalele reale.

Testele Node verifică 21.600 de eșantioane lecție–nivel, soluțiile și limitele grilelor, pavarea completă, operațiile în pași, rigla, fracțiile, bugetele și prezența efectivă a glifelor ĂăÂâÎîȘșȚț în font. Verifică și izolarea preferințelor între profiluri, păstrarea progresului la redenumire, persistența, migrarea, importul/exportul, respingerea setărilor invalide și structura traseului de gândire.

Validatorul verifică structura, consistența răspunsurilor și anumite regresii de text. **Nu este un corector gramatical complet și nu certifică adevărul științific.** Conținutul trebuie revizuit editorial când se adaugă sau se schimbă lecții.

## Structură

```text
index.html              Pagina de acasă, recomandări și profiluri
subject.html            Inventarul unei discipline
activity.html           Lecția, atelierul și progresul pe niveluri
dece.html               Traseul despre cum învățăm
settings.html           Preferințe de citire, aspect și profil
assets/js/data.js       Lecții, niveluri și întrebări redactate
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
