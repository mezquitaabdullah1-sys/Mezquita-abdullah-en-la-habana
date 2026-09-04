// 💾 Almacenamiento local con TTL + caché en memoria
// v22: capa síncrona en memoria (Map) — las lecturas repetidas (navegación
// entre pestañas) ya no tocan localStorage ni reparsean JSON. Los datos se
// cargan una vez y la navegación es instantánea.
const Storage = {
  _mem: new Map(),

  set(key, value, ttl = null) {
    const item = {
      value,
      timestamp: Date.now(),
      ttl,
    };
    this._mem.set(key, item);
    try {
      localStorage.setItem('quba_' + key, JSON.stringify(item));
    } catch (e) {
      console.warn('Storage full:', e);
    }
  },

  get(key) {
    // 1) Caché en memoria (instantáneo)
    if (this._mem.has(key)) {
      const item = this._mem.get(key);
      if (item.ttl && Date.now() - item.timestamp > item.ttl) {
        this._mem.delete(key);
        return null;
      }
      return item.value;
    }
    // 2) localStorage (persistente)
    try {
      const raw = localStorage.getItem('quba_' + key);
      if (!raw) return null;
      const item = JSON.parse(raw);
      if (item.ttl && Date.now() - item.timestamp > item.ttl) {
        localStorage.removeItem('quba_' + key);
        return null;
      }
      this._mem.set(key, item); // promover a memoria para próximas lecturas
      return item.value;
    } catch (e) {
      return null;
    }
  },

  remove(key) {
    this._mem.delete(key);
    localStorage.removeItem('quba_' + key);
  },

  loadSettings() {
    const settings = Storage.get('settings');
    if (settings) {
      Object.assign(AppState.settings, settings);
    } else {
      // Primer uso: selección automática de Maher Al-Muaiqly como recitador base
      AppState.settings.reciter = 'ar.mahermuaiqly';
    }
    return AppState.settings;
  },

  saveSettings() {
    Storage.set('settings', AppState.settings);
  },
};

// Cargar ajustes al inicio
Storage.loadSettings();
