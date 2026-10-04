# 🦉 Atelierul Școlar

Un atelier educațional **static** (HTML/CSS/JS, fără build) pentru copii de **6-8 ani** (clasa 1-2 în România), în **limba română**. Conținut inspirat din programa școlară: matematică, limba română, logică, informatică, științe și educație civică — totul transformat în **jocuri interactive cu imagini (emoji), animații și sunete**.

## 🚀 Pornire

Site-ul este 100% static. Oricare server static merge:

```bash
# din folderul proiectului
python3 -m http.server 8080
# apoi deschide http://localhost:8080
```

Sau deschide direct `index.html` în browser (progresul se salvează în `localStorage`).

## 📁 Structură

```
index.html          — pagina de acasă (grila de subiecte + progres global)
subject.html        — pagina unui subiect (lista de activități)
activity.html       — pagina unei activități (taburi: Explicație, Joc, Obiective, Întrebări, Părinți, Trecere)
assets/css/main.css — design system (temă luminoasă/întunecată, animații, stiluri jocuri)
assets/js/data.js   — conținut: 6 subiecte, 29 de activități (obiective, explicații, demo, întrebări, secțiune părinți)
assets/js/engines.js— 9 motoare de joc: quiz, count, match, arrange, classify, memory, clock, shapes, type
assets/js/progress.js — progres în localStorage (activități finalizate + stele)
assets/js/sound.js  — sunete Web Audio (fără fișiere externe)
assets/js/confetti.js — confetti la finalizare
assets/js/render.js — construiește conținutul celor 3 pagini
assets/js/app.js    — rutare, taburi, temă, sunet, inițializare joc
validate-data.js    — validator de date (structură + ortografie românească)
```

## 🎮 Subiecte și activități

| Subiect | Activități |
|---|---|
| 🔢 Matematică | Numărare până la 100, Adunare, Scădere, Forme geometrice, Măsurare, Ceasul |
| 📖 Limba Română | Litere și sunete, Vocale și consoane, Cuvinte și propoziții, Rime, Scriere |
| 🧩 Logică și Gândire | Tipare, Ghici figura, Memorie, Sortare, Probleme logice |
| 💻 Informatică | Ce este un calculator, Mouse și tastatură, Algoritmi, Bug-uri |
| 🌱 Științe și Natură | Plante, Animale, Stările apei, Corpul nostru, Experimente |
| 🤝 Educație Civică | Familia, Prietenii, Reguli, Ajutor reciproc |

## ⭐ Progres

- Fiecare activitate finalizată (joc terminat cu ≥60% sau butonul „Am terminat”) câștigă **o stea**.
- Progresul se salvează în `localStorage` (cheia `atelier-scolar-progress-v1`) — pe dispozitiv, fără cont.
- Temă luminoasă/întunecată (buton 🌙) și comutare sunet (buton 🔊).

## ✅ Verificare

```bash
npm run check        # sintaxă JS + validare date (structură + ortografie)
```

## 🎯 Design pentru copii

- Font rotunjit (Baloo 2 / Comic Neue), butoane mari, contrast ridicat
- Mascotă bufniță 🦉 cu animații, fundal cu bule plutitoare
- Feedback imediat: sunete, culori (verde/roșu), confetti, stele
- Fiecare activitate are secțiune **„Pentru părinți”**: ce să urmărești, cum să ajuți, semnale de atenție
