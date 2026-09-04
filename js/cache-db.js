// 🗄️ CacheDB — IndexedDB con API tipo localStorage
// Uso: await CacheDB.set('key', value, ttlMs); await CacheDB.get('key');
// Ventaja: sin límite de 5-10 MB, async, no bloquea el hilo principal.
const CacheDB = {
  _dbName: 'quba_cache_v1',
  _storeName: 'kv',
  _db: null,
  _memCache: new Map(), // buffer sincrono para lecturas rápidas repetidas
  _ready: null,

  async _init() {
    if (this._db) return this._db;
    if (this._ready) return this._ready;
    this._ready = new Promise((resolve, reject) => {
      const req = indexedDB.open(this._dbName, 1);
      req.onupgradeneeded = e => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this._storeName)) {
          db.createObjectStore(this._storeName);
        }
      };
      req.onsuccess = e => { this._db = e.target.result; resolve(this._db); };
      req.onerror = e => reject(e.target.error);
    });
    return this._ready;
  },

  async _tx(mode) {
    const db = await this._init();
    return db.transaction(this._storeName, mode).objectStore(this._storeName);
  },

  async set(key, value, ttl = null) {
    try {
      const store = await this._tx('readwrite');
      const item = { value, timestamp: Date.now(), ttl };
      store.put(item, key);
      this._memCache.set(key, item);
      return true;
    } catch (e) {
      console.warn('CacheDB set fail:', e);
      // Fallback a localStorage para claves pequeñas
      try {
        localStorage.setItem('quba_' + key, JSON.stringify({ value, timestamp: Date.now(), ttl }));
      } catch(_) {}
      return false;
    }
  },

  async get(key) {
    // Buffer sincrono primero
    if (this._memCache.has(key)) {
      const item = this._memCache.get(key);
      if (item.ttl && Date.now() - item.timestamp > item.ttl) {
        this._memCache.delete(key);
        await this.remove(key);
        return null;
      }
      return item.value;
    }
    try {
      const store = await this._tx('readonly');
      return await new Promise((resolve, reject) => {
        const req = store.get(key);
        req.onsuccess = () => {
          const item = req.result;
          if (!item) return resolve(null);
          if (item.ttl && Date.now() - item.timestamp > item.ttl) {
            this.remove(key);
            return resolve(null);
          }
          this._memCache.set(key, item);
          resolve(item.value);
        };
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      // Fallback localStorage
      try {
        const raw = localStorage.getItem('quba_' + key);
        if (!raw) return null;
        const item = JSON.parse(raw);
        if (item.ttl && Date.now() - item.timestamp > item.ttl) {
          localStorage.removeItem('quba_' + key);
          return null;
        }
        return item.value;
      } catch(_) { return null; }
    }
  },

  async remove(key) {
    this._memCache.delete(key);
    try {
      const store = await this._tx('readwrite');
      store.delete(key);
    } catch(_) {}
    try { localStorage.removeItem('quba_' + key); } catch(_) {}
  },

  async clear() {
    this._memCache.clear();
    try {
      const store = await this._tx('readwrite');
      store.clear();
    } catch(_) {}
  },

  async keys() {
    try {
      const store = await this._tx('readonly');
      return await new Promise((resolve, reject) => {
        const req = store.getAllKeys();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
      });
    } catch(_) { return []; }
  },
};

// ===== Migración one-shot desde localStorage → IndexedDB =====
// Cachés grandes (tafsir, hijri_cal, translations) van a IndexedDB.
// Settings pequeños siguen en localStorage (síncronos, críticos al boot).
(async function migrateOnce() {
  const flag = 'quba_migrated_v10';
  if (localStorage.getItem(flag) === '1') return;
  try {
    const bigKeyPatterns = ['tafsir_', 'hijri_cal_', 'translate_', 'ummah_', 'duas_cat_', 'monthly_prayers_'];
    const migrated = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || !k.startsWith('quba_')) continue;
      const bareKey = k.slice(5); // quitar 'quba_'
      if (bigKeyPatterns.some(p => bareKey.startsWith(p))) {
        try {
          const item = JSON.parse(localStorage.getItem(k));
          if (item && 'value' in item) {
            await CacheDB.set(bareKey, item.value, item.ttl);
            migrated.push(bareKey);
          }
        } catch(_) {}
      }
    }
    // Borrar los migrados
    migrated.forEach(k => { try { localStorage.removeItem('quba_' + k); } catch(_) {} });
    localStorage.setItem(flag, '1');
    if (migrated.length > 0) console.log(`✅ Migradas ${migrated.length} entradas a IndexedDB`);
  } catch (e) {
    console.warn('Migración IDB falló:', e);
  }
})();
