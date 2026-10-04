/* ============================================================
   ATELIERUL ȘCOLAR — Confetti
   Piese colorate care cad de sus. Fără dependențe.
   ============================================================ */

const Confetti = {
  colors: ['#ff7a59', '#ffc93c', '#34c77b', '#4f8cff', '#9b5cff', '#ff6fa5', '#12c2b0'],

  burst(count) {
    count = count || 60;
    for (let i = 0; i < count; i++) {
      this._piece();
    }
  },

  _piece() {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    const left = Math.random() * 100;
    const size = 8 + Math.random() * 10;
    const dur = 2 + Math.random() * 2;
    const delay = Math.random() * 0.5;
    const round = Math.random() > 0.5;

    el.style.left = left + 'vw';
    el.style.width = size + 'px';
    el.style.height = (round ? size : size * 0.5) + 'px';
    el.style.background = color;
    el.style.borderRadius = round ? '50%' : '2px';
    el.style.animationDuration = dur + 's';
    el.style.animationDelay = delay + 's';

    document.body.appendChild(el);
    setTimeout(() => el.remove(), (dur + delay) * 1000 + 200);
  }
};
