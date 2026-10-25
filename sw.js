/* Service worker: după prima vizită, atelierul funcționează și fără internet.
   Se înregistrează din app.js ca sw.js?v=<versiune>; versiunea este aceeași cu
   cea din paginile HTML, deci o versiune nouă instalează un cache nou și îl
   șterge pe cel vechi. Lista ASSETS trebuie să conțină fiecare fișier încărcat
   de pagini (verificat de tests/run-tests.js). */
const VERSION = new URL(self.location.href).searchParams.get('v') || 'dev';
const CACHE = 'atelier-scolar-' + VERSION;
const PAGES = ['index.html', 'subject.html', 'activity.html', 'dece.html', 'settings.html'];
const ASSETS = [
  'assets/css/main.css',
  'assets/js/early-preferences.js',
  'assets/js/data.js',
  'assets/js/lesson-details.js',
  'assets/js/mission-games.js',
  'assets/js/game-missions-mat-lim.js',
  'assets/js/game-missions-log-inf.js',
  'assets/js/game-missions-sci-civ.js',
  'assets/js/preferences.js',
  'assets/js/progress.js',
  'assets/js/sound.js',
  'assets/js/confetti.js',
  'assets/js/speech.js',
  'assets/js/engines.js',
  'assets/js/math-games.js',
  'assets/js/discovery.js',
  'assets/js/render.js',
  'assets/js/dece.js',
  'assets/js/app.js'
];
const FONTS = ['assets/fonts/playwrite-ro/PlaywriteRO.ttf'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE)
    .then(cache => cache.addAll(PAGES.concat(ASSETS.map(asset => asset + '?v=' + VERSION), FONTS)))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(key => key.startsWith('atelier-scolar-') && key !== CACHE).map(key => caches.delete(key))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const request = event.request, url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.includes('/tests/')) return;
  if (request.mode === 'navigate') {
    // Paginile: întâi rețeaua (conținut proaspăt), apoi copia salvată.
    // Parametrii (?activity=…&v=…) nu schimbă fișierul HTML.
    event.respondWith(fetch(request)
      .then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(url.pathname, copy));
        }
        return response;
      })
      .catch(() => caches.match(request, { ignoreSearch: true })
        .then(page => page || caches.match(new URL('index.html', self.registration.scope).pathname))));
    return;
  }
  // Fișierele versionate nu se schimbă: întâi copia salvată, apoi rețeaua.
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (response.ok) {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(request, copy));
    }
    return response;
  })));
});
