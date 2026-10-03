# Website pentru restaurantul Relax
❕ Acest proiect a fost dezvoltat de Arseni Andrei și Gisca Artur, 2 elevi pasionați de fullstack development, în cadrul Tekwill Junior Ambassadors ediția IV, categoria de proiectare si dezvoltare web.

Scopul nostru a fost să creăm un website interactiv, plin de diferite functii pentru restaurantul Relax, un restaurant din orașul Leova care oferă cea mai bună mâncare din oraș și cele mai distractive petreceri.

## Prezentare generală a proiectului
Site-ul web va oferi restaurantului Relax o prezență online, unde clienții pot afla mai multe despre local, produsele și serviciile sale, precum și cum să găsească și să ia legătura cu staff-ul. Site-ul va include următoarele pagini:

- Meniu: o prezentare a bucatelor restaurantului,imagini și prețuri.
- Pagina Principală: o multitudine de informatii legate de Relax dar și o doză mică din serviciile restaurantului.
- Contact: un formular pentru clienți să ia legătura cu magazinul pentru întrebări sau feedback.
- Articole: Pagina unde clienții și proprietarul pot vorbi între ei.
- Articol: Pagina unde clienții pot discuta despre un eveniment și pentru a vizualiza toate detaliile acestuia.
- Checkout: Pagina unde clienții pot cumpăra produsele dorite.

## Tehnologii utilizate
Am folosit următoarele tehnologii pentru a dezvolta site-ul web:

- HTML - pentru structura și conținutul paginilor web.
- CSS - pentru prezentare și aspectul paginilor web.
- JavaScript - pentru interactivitate și conținut dinamic.
- Git și GitHub - pentru controlul versiunilor și colaborare.
- Firebase - pentru funcțiile backend (CRUD).
- EmailJS - pentru trimiterea email-urilor.

## Scopuri

- Design minimalist
- Sistem backend rapid și funcționabil
- Identitate unică
- Interactivitate
- Idei originale
- Doar content/functii necesare
- Animatii simple

## Link Netlify
[https://relaxbar.netlify.app/](https://relaxbar.netlify.app/)

### Contribuitori
Arseni Andrei: https://github.com/AAndrei06 <br>
Gisca Artur: https://github.com/Arsitur

### Mulțumiri
❤️ Dorim să le mulțumim instructorului nostru de dezvoltare web și colegilor noștri pentru sprijinul și feedback-ul acordat pe parcursul acestui proiect. De asemenea, dorim să mulțumim restaurantului Relax pentru că ne-a oferit oportunitatea de a crea acest website.

## Versiunea demo pentru portofoliu (2026)

Proiectul păstrează designul original, dar meniul și articolele sunt acum locale. Nu procesează comenzi sau plăți reale și nu are funcții de admin.

### Pornire

Folosește Node.js 22.12+ (sau Node.js 24).

```sh
npm install
npm run dev
```

Deschide adresa afișată de Vite. Importurile Firebase instalate prin npm necesită Vite; nu porni această versiune cu Live Server.

```sh
npm run build
npm run preview
```

Pentru GitHub Pages sub `/Relax_website/`, folosește `npm run build -- --base=/Relax_website/` și publică folderul `dist`, nu sursele. Nici `dist`, nici `node_modules` nu se comit.

### Conținut local

- `data/menu.json`: 100 produse, câte 10 în fiecare categorie. Majoritatea sunt exemple pentru demo, cu prețuri și imagini ilustrative; nu reprezintă meniul actual al restaurantului.
- `data/articles.json`: cele patru articole recuperate, cu blocuri `heading` și `paragraph`, în ordinea originală. Două articole nu aveau paragrafe în baza veche.
- `assets/Articles/<id>/`: imaginea fiecărui articol. Storage-ul vechi a returnat HTTP 402; imaginile disponibile în repo și o ilustrație locală înlocuiesc fișierele inaccesibile.
- Imaginile produselor sunt în `assets`, iar coșul demonstrativ este păstrat numai în localStorage.
- Recenziile vechi și identitățile utilizatorilor nu au fost importate. Meniul nu scrie recenzii în Firebase.

### Configurarea Firebase

Configurația web din `scripts/firebase/main.js` folosește proiectul `relax-9d431`. Aceste valori sunt identificatori publici ai aplicației web; nu sunt credențiale administrative.

În Firebase Console:

1. Authentication → Sign-in method: activează Google și Email/Password → Email link (passwordless sign-in). Google cere și un email de suport.
2. Authentication → Settings → Authorized domains: adaugă `localhost` pentru dezvoltare și domeniul de deployment (de exemplu `arsitur.github.io`). Dacă folosești `127.0.0.1`, autorizează și acel hostname.
3. Firestore Database: creează baza `(default)`, apoi copiază conținutul complet din `firestore.rules` în tabul Rules și apasă Publish. Nu folosi reguli care permit orice scriere.

Alternativ, după autentificarea proprie în CLI:

```sh
npx --package firebase-tools firebase login
npx --package firebase-tools firebase deploy --only firestore:rules --project relax-9d431
```

Codul din repo nu activează providerii și nu publică automat regulile în proiectul live.

Datele Firebase sunt limitate la:

- `users/<uid>`: nume afișat, email și data creării. Profilul este citibil/editabil doar de titular; comentariile publice păstrează o copie a numelui afișat.
- `interactions/<articleId>/comments/<id>`: comentarii publice de maximum 500 caractere, scrise de un utilizator conectat.
- `interactions/<articleId>/likes/<uid>`: cel mult un like per utilizator/articol; doar titularul îl poate șterge.

Nu se folosește Firebase Storage. Profilurile folosesc un avatar local. La adăugarea unui articol nou, adaugă ID-ul și în lista `knownArticle` din `firestore.rules`, apoi republică regulile.

### Verificări

```sh
npm test
npm run test:rules
```

`npm test` verifică datele, coșul și comportamentul auth fără mesaje reale sau conturi live. Testele regulilor sunt sărite dacă emulatorul nu este pornit. `npm run test:rules` pornește un emulator Firestore local, rulează verificările de autorizare și îl oprește; CLI-ul este descărcat la cerere și necesită Java 21+. Proiectul `demo-relax` nu accesează datele live.

Pentru a testa interacțiunile într-un mediu local complet, pornește `npx --package firebase-tools firebase emulators:start --only auth,firestore --project demo-relax`, apoi pornește Vite cu `VITE_USE_EMULATORS=true`. Pe PowerShell: `$env:VITE_USE_EMULATORS="true"; npm run dev`. Setarea este luată în considerare numai în dezvoltare; build-ul pentru producție folosește proiectul real.
