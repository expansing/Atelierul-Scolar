/* ============================================================
   ATELIERUL ȘCOLAR — Sunet (Web Audio API)
   Tonuri scurte, prietenoase. Fără fișiere externe.
   ============================================================ */

const Sound = {
  ctx: null,
  enabled: true,

  _init() {
    if (!this.ctx) {
      try {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        this.enabled = false;
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  _tone(freq, start, dur, type, vol) {
    if (!this.enabled) return;
    this._init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.value = freq;
    const t = this.ctx.currentTime + start;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(vol || 0.15, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  },

  good() {
    // Do-Mi-Sol ascendent
    this._tone(523.25, 0, 0.15, 'sine', 0.18);
    this._tone(659.25, 0.12, 0.15, 'sine', 0.18);
    this._tone(783.99, 0.24, 0.25, 'sine', 0.18);
  },

  bad() {
    // Ton descendent blând
    this._tone(330, 0, 0.18, 'triangle', 0.14);
    this._tone(247, 0.15, 0.25, 'triangle', 0.14);
  },

  click() {
    this._tone(880, 0, 0.06, 'sine', 0.08);
  },

  win() {
    // Fanfară scurtă
    this._tone(523.25, 0, 0.12, 'sine', 0.16);
    this._tone(659.25, 0.1, 0.12, 'sine', 0.16);
    this._tone(783.99, 0.2, 0.12, 'sine', 0.16);
    this._tone(1046.5, 0.3, 0.35, 'sine', 0.18);
  },

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) this.click();
    return this.enabled;
  }
};
