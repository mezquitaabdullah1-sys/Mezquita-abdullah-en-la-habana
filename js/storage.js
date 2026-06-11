// 💾 Almacenamiento local con TTL
const Storage = {
  set(key, value, ttl = null) {
    const item = {
      value,
      timestamp: Date.now(),
      ttl,
    };
    try {
      localStorage.setItem('quba_' + key, JSON.stringify(item));
    } catch (e) {
      console.warn('Storage full:', e);
    }
  },

  get(key) {
    try {
      const raw = localStorage.getItem('quba_' + key);
      if (!raw) return null;
      const item = JSON.parse(raw);
      if (item.ttl && Date.now() - item.timestamp > item.ttl) {
        localStorage.removeItem('quba_' + key);
        return null;
      }
      return item.value;
    } catch (e) {
      return null;
    }
  },

  remove(key) {
    localStorage.removeItem('quba_' + key);
  },

  loadSettings() {
    const settings = Storage.get('settings');
    if (settings) {
      Object.assign(AppState.settings, settings);
    }
    return AppState.settings;
  },

  saveSettings() {
    Storage.set('settings', AppState.settings);
  },
};

// Cargar ajustes al inicio
Storage.loadSettings();
