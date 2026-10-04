/* ============================================================
   ATELIERUL ȘCOLAR — Progres (localStorage)
   Salvează activitățile finalizate și stelele câștigate.
   ============================================================ */

const Progress = {
  /* Cheia de stocare este unică pentru fiecare hostname (adresa de la care
     se accesează site-ul). Astfel, progresul nu se amestecă între dispozitive
     sau adrese diferite (ex. localhost vs. IP-ul de acasă vs. un domeniu). */
  key() {
    const host = (location.hostname || 'local') + ':' + (location.port || (location.protocol === 'https:' ? '443' : '80'));
    return 'atelier-scolar-progress-v1__' + host;
  },

  load() {
    try {
      const raw = localStorage.getItem(this.key());
      if (!raw) return { completed: {}, stars: 0 };
      return JSON.parse(raw);
    } catch (e) {
      return { completed: {}, stars: 0 };
    }
  },

  save(data) {
    try {
      localStorage.setItem(this.key(), JSON.stringify(data));
    } catch (e) { /* storage indisponibil */ }
  },

  isCompleted(activityId) {
    return !!this.load().completed[activityId];
  },

  complete(activityId, stars) {
    const data = this.load();
    if (!data.completed[activityId]) {
      data.completed[activityId] = true;
      data.stars = (data.stars || 0) + (stars || 1);
      this.save(data);
      return true; // prima finalizare
    }
    return false;
  },

  totalCompleted() {
    return Object.keys(this.load().completed).length;
  },

  totalStars() {
    return this.load().stars || 0;
  },

  subjectProgress(subjectId) {
    const acts = ACTIVITIES_BY_SUBJECT[subjectId] || [];
    if (acts.length === 0) return 0;
    const done = acts.filter(a => this.isCompleted(a.id)).length;
    return Math.round((done / acts.length) * 100);
  },

  globalProgress() {
    const total = ACTIVITIES.length;
    if (total === 0) return 0;
    return Math.round((this.totalCompleted() / total) * 100);
  },

  reset() {
    this.save({ completed: {}, stars: 0 });
  }
};
