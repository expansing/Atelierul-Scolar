/* Rulează automat tests/browser.html într-un browser fără fereastră (headless).
   Fără dependențe: un server local servește site-ul, browserul deschide pagina
   de teste, iar pagina trimite rezultatele înapoi la server.
   Browser: variabila BROWSER (cale către executabil) sau primul găsit dintre
   google-chrome, chromium, chromium-browser, firefox. */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TIMEOUT_MS = 180000;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.ttf': 'font/ttf', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8' };

function findBrowser() {
  if (process.env.BROWSER) return process.env.BROWSER;
  for (const name of ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser', 'firefox']) {
    try { return execFileSync('which', [name], { encoding: 'utf8' }).trim(); } catch (error) { /* nu există */ }
  }
  return null;
}

function browserArgs(executable, profile, url) {
  if (/firefox/i.test(path.basename(executable))) return ['-headless', '-no-remote', '-profile', profile, url];
  return ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--user-data-dir=' + profile, url];
}

const executable = findBrowser();
if (!executable) {
  console.error('Nu am găsit un browser. Instalează Chrome, Chromium sau Firefox, sau setează BROWSER=/cale/către/browser.');
  process.exit(2);
}

// Profil temporar în proiect (nu în /tmp): Firefox instalat ca snap nu vede /tmp-ul sistemului.
const profile = fs.mkdtempSync(path.join(__dirname, 'browser-profile-'));
// Firefox snap nu acceptă mereu semnale de oprire; pagina de teste își închide singură
// fereastra, iar browserul se oprește când nu mai are ferestre.
fs.writeFileSync(path.join(profile, 'user.js'), [
  'dom.allow_scripts_to_close_windows', 'browser.shell.checkDefaultBrowser:false', 'browser.aboutwelcome.enabled:false',
  'datareporting.policy.dataSubmissionEnabled:false', 'toolkit.telemetry.reportingpolicy.firstRun:false'
].map(entry => {
  const [name, value] = entry.split(':');
  return 'user_pref("' + name + '", ' + (value || 'true') + ');';
}).join('\n') + '\n');
let browser = null, finished = false;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'POST' && url.pathname === '/__test-results') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => { res.end('ok'); report(JSON.parse(body)); });
    return;
  }
  const file = path.normalize(path.join(ROOT, decodeURIComponent(url.pathname)));
  if (!file.startsWith(ROOT + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.statusCode = 404; res.end('Not found'); return;
  }
  res.setHeader('Content-Type', TYPES[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});

function cleanup() {
  server.close();
  // lăsăm browserului câteva secunde să se închidă singur, apoi îl oprim și ștergem profilul
  setTimeout(() => {
    if (browser && browser.exitCode === null) {
      try { process.kill(-browser.pid, 'SIGTERM'); } catch (error) { /* deja închis sau fără permisiune */ }
      try { process.kill(browser.pid, 'SIGTERM'); } catch (error) { /* idem */ }
    }
    fs.rmSync(profile, { recursive: true, force: true });
    process.exit();
  }, 3000);
}

function report(results) {
  if (finished) return;
  finished = true;
  results.forEach(r => console.log((r.passed ? '✓ ' : '✗ ') + r.name + (r.error ? ': ' + r.error : '')));
  const failed = results.filter(r => !r.passed).length;
  console.log('\n' + (results.length - failed) + '/' + results.length + ' verificări în browser reușite (' + path.basename(executable) + ').');
  cleanup();
  process.exitCode = failed ? 1 : 0;
}

server.listen(0, '127.0.0.1', () => {
  const url = 'http://127.0.0.1:' + server.address().port + '/tests/browser.html?report=1';
  browser = spawn(executable, browserArgs(executable, profile, url), { stdio: 'ignore', detached: true });
  browser.on('error', error => {
    console.error('Browserul nu a pornit: ' + error.message);
    finished = true; cleanup(); process.exitCode = 2;
  });
  setTimeout(() => {
    if (finished) return;
    finished = true;
    console.error('Testele nu au trimis rezultate în ' + TIMEOUT_MS / 1000 + ' s. Deschide manual tests/browser.html pentru detalii.');
    cleanup(); process.exitCode = 1;
  }, TIMEOUT_MS).unref();
});
