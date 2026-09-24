/* =========================================================
   DB — IndexedDB persistence layer (no external deps)
   ========================================================= */
(function () {
  const DB_NAME = 'mosque_abdullah_db';
  const DB_VERSION = 1;
  const STORES = {
    persons:    { keyPath: 'id',        indexes: [['type', 'type'], ['carnet', 'carnet'], ['name', 'name']] },
    documents:  { keyPath: 'docId',     indexes: [['personId', 'personId']] },
    notes:      { keyPath: 'noteId',    indexes: [['personId', 'personId']] },
    courses:    { keyPath: 'courseId',  indexes: [] },
    sessions:   { keyPath: 'sessionId', indexes: [['courseId', 'courseId']] },
    participants:{ keyPath: 'pid',      indexes: [['courseId', 'courseId'], ['personId', 'personId']] },
    attendance: { keyPath: 'aid',       indexes: [['sessionId', 'sessionId'], ['courseId', 'courseId'], ['personId', 'personId']] },
    meta:       { keyPath: 'key',       indexes: [] }
  };

  let _db = null;

  function open() {
    return new Promise((resolve, reject) => {
      if (_db) return resolve(_db);
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        Object.keys(STORES).forEach(name => {
          if (!db.objectStoreNames.contains(name)) {
            const cfg = STORES[name];
            const os = db.createObjectStore(name, { keyPath: cfg.keyPath });
            cfg.indexes.forEach(([iname, key]) => {
              if (!os.indexNames.contains(iname)) os.createIndex(iname, key, { unique: false });
            });
          }
        });
      };
      req.onsuccess = () => { _db = req.result; resolve(_db); };
      req.onerror = () => reject(req.error);
    });
  }

  const req2p = (r) => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });

  function tx(store, mode, fn) {
    return open().then(db => new Promise((resolve, reject) => {
      const t = db.transaction(store, mode);
      const os = t.objectStore(store);
      let out, isReq = false, reqVal;
      try { out = fn(os); } catch (err) { reject(err); return; }
      if (out && typeof out === 'object' && 'onsuccess' in out) {
        isReq = true;
        out.onsuccess = () => { reqVal = out.result; };
        out.onerror = () => reject(out.error);
      }
      t.oncomplete = () => resolve(isReq ? reqVal : out);
      t.onerror = () => reject(t.error);
      t.onabort = () => reject(t.error);
    }));
  }

  const DB = {
    init() { return open(); },
    put(store, obj)   { return tx(store, 'readwrite', os => os.put(obj)); },
    add(store, obj)   { return tx(store, 'readwrite', os => os.add(obj)); },
    get(store, key)   { return tx(store, 'readonly', os => os.get(key)); },
    all(store)        { return tx(store, 'readonly', os => os.getAll()); },
    count(store)      { return tx(store, 'readonly', os => os.count()); },
    del(store, key)   { return tx(store, 'readwrite', os => os.delete(key)); },
    clear(store)      { return tx(store, 'readwrite', os => os.clear()); },
    bulkPut(store, arr){ return tx(store, 'readwrite', os => { arr.forEach(o => os.put(o)); }); },
    byIndex(store, index, value) {
      return open().then(db => new Promise((resolve, reject) => {
        const t = db.transaction(store, 'readonly');
        const r = t.objectStore(store).index(index).getAll(value);
        r.onsuccess = () => resolve(r.result || []);
        r.onerror = () => reject(r.error);
      }));
    },
    async nextId(prefix, counterKey) {
      let c = await this.get('meta', counterKey);
      let n = (c && typeof c.value === 'number' && isFinite(c.value)) ? c.value : 0;
      n += 1;
      await this.put('meta', { key: counterKey, value: n });
      return prefix + '-' + String(n).padStart(4, '0');
    },
    async setMeta(key, value) { return this.put('meta', { key, value }); },
    async getMeta(key) { const m = await this.get('meta', key); return m ? m.value : undefined; }
  };

  window.DB = DB;
})();
