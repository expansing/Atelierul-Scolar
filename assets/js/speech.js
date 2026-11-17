/* Citire vocală comună (explicația lecției și jocurile).
   Folosește întâi o voce română de pe dispozitiv; dacă nu există, vocea română online
   a browserului. Se citesc numai textele lecțiilor. */
const Speech = {
  supported() {
    return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
  },
  // vocile se încarcă asincron în unele browsere: așteptăm scurt evenimentul voiceschanged
  voice() {
    const pick = () => {
      const voices = window.speechSynthesis.getVoices().filter(v => /^ro(?:-|_)/i.test(v.lang) || v.lang === 'ro');
      return voices.find(v => v.localService) || voices[0]; // întâi vocea de pe dispozitiv
    };
    const now = pick();
    if (now || window.speechSynthesis.getVoices().length) return Promise.resolve(now || null);
    return new Promise(resolve => {
      const done = () => { window.speechSynthesis.removeEventListener('voiceschanged', done); resolve(pick() || null); };
      window.speechSynthesis.addEventListener('voiceschanged', done);
      setTimeout(done, 1200);
    });
  },
  // semnele singure și emoji-urile nu se citesc bine: le înlocuim sau le scoatem
  clean(text) {
    const marks = { ',': 'virgulă', '.': 'punct', '?': 'semnul întrebării', '!': 'semnul exclamării', ':': 'două puncte', ';': 'punct și virgulă', '-': 'liniuță' };
    const value = String(text).trim();
    if (marks[value]) return marks[value];
    return value.replace(/\p{Extended_Pictographic}️?/gu, '').replace(/\s+/g, ' ').trim();
  },
  stop() { if (this.supported()) window.speechSynthesis.cancel(); },
  // întoarce un mesaj de eroare sau '' dacă citirea a pornit
  async speak(text, handlers) {
    const on = handlers || {};
    if (!this.supported()) return 'Citirea vocală nu este disponibilă în acest browser.';
    window.speechSynthesis.cancel();
    const voice = await this.voice();
    if (!voice) return 'Browserul nu are o voce română disponibilă. Poți instala una din setările dispozitivului; textul rămâne disponibil pentru citire.';
    // Fără voce română pe dispozitiv folosim vocea online a browserului, ca un copil care
    // citește greu să nu rămână blocat. Se citesc numai textele lecțiilor, nu ce scrie copilul.
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'ro-RO'; speech.voice = voice; speech.rate = 0.85;
    speech.onend = () => { if (on.end) on.end(); };
    speech.onerror = event => {
      if (on.end) on.end();
      if (on.error && event.error !== 'canceled' && event.error !== 'interrupted') on.error('Citirea vocală a eșuat. Textul poate fi citit în continuare pe pagină.');
    };
    window.speechSynthesis.speak(speech);
    return '';
  }
};
