/* Progres local, fără nume reale, texte libere sau cereri de rețea. */
const Progress = {
  storageKey: 'atelier-scolar-progress-v2',
  cache: null,
  lastError: '',
  key() { return this.storageKey; },
  empty() {
    return { version: 2, active: 'learner-1', profiles: { 'learner-1': { name: 'Explorator 1', activities: {}, legacyStars: 0, journey: [], preferences: Preferences.defaults() } } };
  },
  notify(error, message) {
    this.lastError = message;
    console.error(message, error);
    if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') {
      window.dispatchEvent(new CustomEvent('atelier-storage-error', { detail: message }));
    }
  },
  validate(data) {
    const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
    const integer = (value, min, max) => Number.isInteger(value) && value >= min && value <= max;
    if (!object(data) || data.version !== 2 || !object(data.profiles) || typeof data.active !== 'string' ||
      !Object.prototype.hasOwnProperty.call(data.profiles, data.active)) throw new Error('Format de progres necunoscut.');
    const ids = Object.keys(data.profiles);
    if (!ids.length || ids.length > 12) throw new Error('Sunt permise între 1 și 12 profiluri locale.');
    ids.forEach(id => {
      const p = data.profiles[id];
      if (!/^learner-[A-Za-z0-9-]+$/.test(id) || !object(p) || typeof p.name !== 'string' || !p.name.trim() || p.name.length > 40 ||
        !object(p.activities) || !integer(p.legacyStars, 0, 10000) || !Array.isArray(p.journey) || p.journey.length > 11 || new Set(p.journey).size !== p.journey.length ||
        p.journey.some(n => !integer(n, 0, 10))) throw new Error('Profil local invalid.');
      if (p.preferences !== undefined) Preferences.validate(p.preferences);
      Object.keys(p.activities).forEach(activityId => {
        const activity = p.activities[activityId];
        if (!/^(mat|lim|log|inf|sci|civ)-[1-9][0-9]*$/.test(activityId) || !object(activity) ||
          typeof activity.viewed !== 'boolean' || !object(activity.levels)) throw new Error('Activitate salvată invalidă.');
        Object.keys(activity.levels).forEach(key => {
          const level = activity.levels[key];
          if (!['0', '1', '2'].includes(key) || !object(level) || !integer(level.attempts, 1, 1000000) ||
            !integer(level.best, 0, 100) || !integer(level.latest, 0, 100) || typeof level.mastered !== 'boolean' ||
            !['objective', 'self', 'practice'].includes(level.evaluation) ||
            !integer(level.hints, 0, 1000000) || !integer(level.errors, 0, 1000000) ||
            typeof level.finishedAt !== 'string' || Number.isNaN(Date.parse(level.finishedAt))) throw new Error('Rezultat salvat invalid.');
          if (level.mastered && (level.evaluation !== 'objective' || level.best < 80)) throw new Error('Competență incompatibilă cu rezultatul.');
        });
      });
    });
    return data;
  },
  load() {
    if (this.cache) return this.cache;
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) this.cache = this.validate(JSON.parse(raw));
      else {
        this.cache = this.empty();
        const host = (location.hostname || 'local') + ':' + (location.port || (location.protocol === 'https:' ? '443' : '80'));
        const old = localStorage.getItem('atelier-scolar-progress-v1__' + host) || localStorage.getItem('atelier-scolar-progress-v1');
        if (old) {
          const previous = JSON.parse(old);
          if (!previous || typeof previous.completed !== 'object' || previous.completed === null || Array.isArray(previous.completed) ||
            !Number.isInteger(previous.stars) || previous.stars < 0 || previous.stars > 10000) throw new Error('Progresul vechi nu poate fi migrat în siguranță.');
          Object.keys(previous.completed).forEach(id => {
            if (/^(mat|lim|log|inf|sci|civ)-[1-9][0-9]*$/.test(id) && previous.completed[id]) this.cache.profiles['learner-1'].activities[id] = { viewed: true, levels: {} };
          });
          this.cache.profiles['learner-1'].legacyStars = previous.stars;
          this.save(this.cache);
        }
      }
      if (!raw || Object.values(this.cache.profiles).some(profile => !profile.preferences)) {
        const theme = localStorage.getItem('atelier-scolar-theme'), sound = localStorage.getItem('atelier-scolar-sound');
        Object.values(this.cache.profiles).forEach(profile => {
          if (!raw || !profile.preferences) {
            profile.preferences = Preferences.defaults();
            if (theme === 'light' || theme === 'dark') profile.preferences.theme = theme;
            if (sound === 'off') profile.preferences.sound = false;
          }
        });
      }
    } catch (error) {
      this.cache = this.empty();
      this.notify(error, 'Progresul salvat nu poate fi citit. Datele existente nu au fost șterse. Poți importa o copie validă. Exportul va conține numai progresul nou din această sesiune; resetarea va înlocui datele care nu pot fi citite.');
      this.readOnly = true;
    }
    return this.cache;
  },
  save(data) {
    this.validate(data);
    this.cache = data;
    if (this.readOnly) {
      this.notify(new Error('Stocare protejată după o eroare de citire.'), 'Salvarea este oprită pentru a proteja datele existente. Progresul și setările noi rămân în memorie; le poți exporta.');
      return false;
    }
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      this.lastError = '';
      return true;
    } catch (error) {
      this.notify(error, 'Progresul și setările nu au putut fi salvate pe dispozitiv. Rămân în această sesiune; exportă-le înainte să închizi pagina.');
      return false;
    }
  },
  profile() { const data = this.load(); return data.profiles[data.active]; },
  entry(id) { return this.profile().activities[id] || { viewed: false, levels: {} }; },
  markViewed(id) {
    const data = this.load(), p = data.profiles[data.active];
    if (!p.activities[id]) p.activities[id] = { viewed: true, levels: {} };
    else p.activities[id].viewed = true;
    return this.save(data);
  },
  record(id, result) {
    const data = this.load(), profile = data.profiles[data.active];
    const activity = profile.activities[id] || { viewed: true, levels: {} };
    profile.activities[id] = activity;
    const old = activity.levels[result.level];
    const mastered = result.evaluation === 'objective' && result.percent >= 80 && result.hints === 0;
    activity.levels[result.level] = {
      attempts: (old ? old.attempts : 0) + 1,
      best: Math.max(old ? old.best : 0, result.percent), latest: result.percent,
      mastered: !!(old && old.mastered) || mastered,
      evaluation: result.evaluation, hints: result.hints, errors: result.errors, finishedAt: result.finishedAt
    };
    const saved = this.save(data);
    return { newStar: mastered && !(old && old.mastered), saved };
  },
  status(id) {
    const entry = this.entry(id), results = Object.values(entry.levels);
    if (results.length === 3 && results.every(r => r.mastered)) return 'mastered';
    if (results.length) return 'practiced';
    return entry.viewed ? 'viewed' : 'new';
  },
  label(id) { return { new: 'De explorat', viewed: 'Parcurs', practiced: 'Exersat', mastered: 'Stăpânit' }[this.status(id)]; },
  isCompleted(id) { return this.status(id) === 'mastered'; },
  totalCompleted() { return ACTIVITIES.filter(a => this.isCompleted(a.id)).length; },
  totalPracticed() { return ACTIVITIES.filter(a => ['practiced', 'mastered'].includes(this.status(a.id))).length; },
  totalStars() {
    const profile = this.profile();
    return profile.legacyStars + Object.values(profile.activities).reduce((sum, activity) => sum + Object.values(activity.levels).filter(level => level.mastered).length, 0);
  },
  globalProgress() { return Math.round(this.totalPracticed() / ACTIVITIES.length * 100); },
  recommendations() {
    return ACTIVITIES.filter(a => {
      const levels = Object.values(this.entry(a.id).levels);
      return levels.some(level => !level.mastered && level.evaluation === 'objective');
    }).slice(0, 4);
  },
  addProfile(name) {
    const data = this.load();
    if (Object.keys(data.profiles).length >= 12) throw new Error('Poți păstra cel mult 12 profiluri locale.');
    const clean = name.trim();
    if (!clean || clean.length > 40) throw new Error('Alege un pseudonim de 1–40 de caractere, fără date personale.');
    const id = 'learner-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    data.profiles[id] = { name: clean, activities: {}, legacyStars: 0, journey: [], preferences: Preferences.defaults() }; data.active = id;
    return this.save(data);
  },
  updateProfile(name, preferences) {
    const clean = name.trim();
    if (!clean || clean.length > 40) throw new Error('Alege un pseudonim de 1–40 de caractere, fără date personale.');
    Preferences.validate(preferences);
    const data = this.load(), profile = data.profiles[data.active];
    profile.name = clean;
    profile.preferences = Object.assign({}, preferences);
    return this.save(data);
  },
  selectProfile(id) {
    const data = this.load();
    if (!Object.prototype.hasOwnProperty.call(data.profiles, id)) throw new Error('Profilul nu există.');
    data.active = id; return this.save(data);
  },
  journeyComplete(index) {
    const data = this.load(), profile = data.profiles[data.active];
    if (!profile.journey.includes(index)) profile.journey.push(index);
    return this.save(data);
  },
  exportData() { return JSON.stringify(this.load(), null, 2); },
  importData(text) {
    if (text.length > 2000000) throw new Error('Fișierul este prea mare. Limita este de 2 MB.');
    const data = this.validate(JSON.parse(text));
    this.readOnly = false;
    return this.save(data);
  },
  reset() {
    const data = this.load(), profile = data.profiles[data.active];
    profile.activities = {}; profile.legacyStars = 0; profile.journey = [];
    this.readOnly = false;
    return this.save(data);
  }
};
