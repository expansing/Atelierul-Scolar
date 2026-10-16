const Preferences = {
  fonts: { readable: 'Simplu, ușor de citit', handwriting: 'Scris caligrafic românesc', serif: 'Litere de tipar cu serife' },
  avatars: { owl: '🦉', fox: '🦊', cat: '🐱', turtle: '🐢', hedgehog: '🦔', star: '🌟' },
  avatarNames: { owl: 'Bufniță', fox: 'Vulpe', cat: 'Pisică', turtle: 'Țestoasă', hedgehog: 'Arici', star: 'Stea' },
  sizes: [100, 110, 125, 150],
  defaults() { return { font: 'readable', size: 100, theme: 'auto', sound: true, motion: false, level: 0, avatar: 'owl' }; },
  validate(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value) ||
      !Object.prototype.hasOwnProperty.call(this.fonts, value.font) || !this.sizes.includes(value.size) ||
      !['auto', 'light', 'dark'].includes(value.theme) || typeof value.sound !== 'boolean' ||
      typeof value.motion !== 'boolean' || ![0, 1, 2].includes(value.level) ||
      !Object.prototype.hasOwnProperty.call(this.avatars, value.avatar)) throw new Error('Setările profilului sunt invalide.');
    return value;
  },
  get(profile) { return profile.preferences || this.defaults(); },
  apply(profile) {
    const value = this.validate(this.get(profile)), root = document.documentElement;
    root.dataset.font = value.font;
    root.style.fontSize = value.size + '%';
    root.dataset.theme = value.theme === 'auto' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : value.theme;
    root.dataset.motion = value.motion ? 'reduce' : 'full';
    Sound.enabled = value.sound;
  }
};
