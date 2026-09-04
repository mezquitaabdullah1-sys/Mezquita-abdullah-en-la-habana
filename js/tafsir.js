// 📜 Tafsir service — v2 (descarga desde API + caché permanente IndexedDB, igual que el Corán)
//
// v1 empaquetaba ~82 MB de JSON de tafsir dentro del APK — hacía la app enorme
// y ralentizaba la instalación. v2 elimina esos JSON del bundle y los descarga
// bajo demanda desde el CDN público de spa5k/tafsir_api (jsDelivr), guardando
// cada sura de forma permanente en IndexedDB. Primera lectura online, todas
// las siguientes sin conexión — mismo modelo que ya usa el texto del Corán.
//
// Fuente de datos:
//   https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/<slug>/<surah>.json
//   Formato: [ { "text": "...", "ayah": N, "surah": N }, ... ]
//
// Ediciones utilizadas (una por idioma de la app):
//   • ar → ar-tafsir-muyassar        (التفسير الميسر)
//   • en → en-tafsir-al-mukhtasar    (Al-Mukhtasar en inglés)
//   • es → spanish-mokhtasar         (Mokhtasar en español)

const TafsirService = {
  // CDN base — jsDelivr sirve el repo GitHub spa5k/tafsir_api sin límites de uso
  CDN_BASE: 'https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir',

  // Ediciones remotas por idioma de la app
  REMOTE_TAFSIRS: {
    ar: {
      slug: 'ar-tafsir-muyassar',
      name_es: 'Al-Muyassar', name_en: 'Al-Muyassar', name_ar: 'التفسير الميسر',
      desc_es: 'Tafsir completo, sin conexión tras la primera descarga',
      desc_en: 'Complete tafsir, offline after first download',
      desc_ar: 'تفسير كامل بدون إنترنت بعد التنزيل الأول',
    },
    en: {
      slug: 'en-tafsir-al-mukhtasar',
      name_es: 'Al-Mukhtasar (EN)', name_en: 'Al-Mukhtasar', name_ar: 'التفسير المختصر (إنجليزي)',
      desc_es: 'Traducción oficial al inglés, sin conexión tras la primera descarga',
      desc_en: 'Official English translation, offline after first download',
      desc_ar: 'الترجمة الإنجليزية المعتمدة، بدون إنترنت بعد التنزيل',
    },
    es: {
      slug: 'spanish-mokhtasar',
      name_es: 'Mokhtasar (ES)', name_en: 'Mukhtasar (ES)', name_ar: 'المختصر (إسباني)',
      desc_es: 'Traducción oficial al español, sin conexión tras la primera descarga',
      desc_en: 'Official Spanish translation, offline after first download',
      desc_ar: 'الترجمة الإسبانية المعتمدة، بدون إنترنت بعد التنزيل',
    },
  },

  DEFAULT_TAFSIR: 'local.muyassar',

  // Cache version — bump si cambia el esquema
  CACHE_VER: 'v4',

  // In-memory cache de suras ya cargadas para navegación instantánea
  _surahCache: {},

  // ============ RESOLUCIÓN DE EDICIÓN ============
  /**
   * Pick the edition that matches the app locale.
   * ar → التفسير الميسر | en → Al-Mukhtasar | es → Mokhtasar (Español)
   */
  _resolveEdition(targetLang) {
    if (targetLang === 'ar') return this.REMOTE_TAFSIRS.ar;
    if (targetLang === 'en') return this.REMOTE_TAFSIRS.en;
    return this.REMOTE_TAFSIRS.es;
  },

  // ============ ALMACENAMIENTO PERMANENTE (IndexedDB, sin TTL) ============
  _idbKey(slug, surahNum) {
    return `tafsir_full_${this.CACHE_VER}_${slug}_${surahNum}`;
  },

  /** Try IndexedDB first (permanent, no TTL). */
  async _readSurahFromIDB(slug, surahNum) {
    if (typeof CacheDB === 'undefined') return null;
    try {
      const val = await CacheDB.get(this._idbKey(slug, surahNum));
      return Array.isArray(val) && val.length ? val : null;
    } catch (e) { return null; }
  },

  async _writeSurahToIDB(slug, surahNum, list) {
    if (typeof CacheDB === 'undefined' || !Array.isArray(list) || !list.length) return false;
    try {
      // null = sin caducidad (permanente hasta que el usuario borre datos)
      await CacheDB.set(this._idbKey(slug, surahNum), list, null);
      return true;
    } catch (e) { return false; }
  },

  // ============ FETCH JSON DESDE CDN ============
  /** Fetch JSON safely: verify HTTP status AND that body is really JSON. */
  async _fetchJson(url) {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error('Tafsir HTTP ' + res.status + ': ' + url);
    const raw = await res.text();
    try { return JSON.parse(raw); }
    catch (e) { throw new Error('Tafsir: invalid JSON at ' + url); }
  },

  /** Normalize any known payload shape into a plain ayah list. */
  _normalizeAyahList(json) {
    if (Array.isArray(json)) return json;
    if (json && Array.isArray(json.ayahs)) return json.ayahs;
    if (json && Array.isArray(json.data)) return json.data;
    return [];
  },

  /**
   * Load a full surah of tafsir. Priority:
   *   1) In-memory cache (instantáneo)
   *   2) IndexedDB permanente (offline forever)
   *   3) Descarga desde CDN + guardar en IndexedDB
   */
  async _loadSurah(slug, surahNum) {
    const memKey = slug + ':' + surahNum;
    if (this._surahCache[memKey]) return this._surahCache[memKey];

    // IndexedDB → sin red
    const cached = await this._readSurahFromIDB(slug, surahNum);
    if (cached) {
      this._surahCache[memKey] = cached;
      return cached;
    }

    // CDN
    const url = `${this.CDN_BASE}/${slug}/${surahNum}.json`;
    const json = await this._fetchJson(url);
    const list = this._normalizeAyahList(json);
    if (!list.length) throw new Error('Tafsir: empty surah file ' + surahNum);

    // Persistir permanentemente (silencioso si falla — al menos queda en memoria)
    this._writeSurahToIDB(slug, surahNum, list).catch(() => {});
    this._surahCache[memKey] = list;
    return list;
  },

  /** Buscar la áya concreta dentro del array de tafsir de la sura. */
  async _findAyahEntry(slug, surahNum, ayahNum) {
    const ayahs = await this._loadSurah(slug, surahNum);
    const entry = ayahs.find(a => Number(a.ayah) === Number(ayahNum));
    if (entry && entry.text) return entry;
    throw new Error('Tafsir: ayah not found ' + surahNum + ':' + ayahNum);
  },

  /** Texto árabe original — se usa para la pestaña "Árabe original" cuando la app está en es/en. */
  async _getArabicText(surahNum, ayahNum) {
    try {
      const entry = await this._findAyahEntry(this.REMOTE_TAFSIRS.ar.slug, surahNum, ayahNum);
      return entry?.text || '';
    } catch (e) { return ''; }
  },

  // ============ ESTADO DE DESCARGA (para el banner de progreso) ============
  MANIFEST_KEY: 'tafsir_offline_manifest_v1',
  _downloading: false,
  _cancelRequested: false,
  _listeners: [],

  async _getManifest() {
    if (typeof CacheDB === 'undefined') return { slug: null, done: [] };
    try {
      const m = await CacheDB.get(this.MANIFEST_KEY);
      return m || { slug: null, done: [] };
    } catch (e) { return { slug: null, done: [] }; }
  },

  async _markDone(slug, surahNum) {
    const m = await this._getManifest();
    if (m.slug !== slug) { m.slug = slug; m.done = []; }
    if (!m.done.includes(surahNum)) m.done.push(surahNum);
    try { await CacheDB.set(this.MANIFEST_KEY, m, null); } catch (e) {}
  },

  async getDownloadStatus(slug) {
    const m = await this._getManifest();
    const matches = m.slug === slug;
    return {
      downloaded: matches ? m.done.length : 0,
      total: 114,
      isCurrent: matches,
    };
  },

  async isFullyDownloaded(slug) {
    const st = await this.getDownloadStatus(slug);
    return st.downloaded >= st.total;
  },

  onProgress(cb) { this._listeners.push(cb); },
  _emit(evt) { this._listeners.forEach(cb => { try { cb(evt); } catch (e) {} }); },

  cancelDownload() { this._cancelRequested = true; },

  /**
   * Descarga toda una edición (114 suras) en segundo plano.
   * Idempotente: sura ya guardada se salta. Se llama automáticamente al arrancar
   * la app (ver maybeAutoDownload) — el usuario no necesita pulsar ningún botón.
   */
  async downloadAll(slug) {
    if (this._downloading) return;
    if (typeof CacheDB === 'undefined') return;
    this._downloading = true;
    this._cancelRequested = false;

    const m = await this._getManifest();
    const sameTarget = m.slug === slug;
    const done = new Set(sameTarget ? m.done : []);
    const total = 114;

    this._emit({ type: 'start', done: done.size, total, slug });

    for (let surahNum = 1; surahNum <= total; surahNum++) {
      if (this._cancelRequested) { this._emit({ type: 'cancelled', done: done.size, total }); break; }
      if (done.has(surahNum)) continue;

      // Si ya está en IndexedDB (descarga previa que no llegó a marcarse), sólo actualizar manifiesto
      const already = await this._readSurahFromIDB(slug, surahNum);
      if (already) {
        await this._markDone(slug, surahNum);
        done.add(surahNum);
        this._emit({ type: 'progress', done: done.size, total, surah: surahNum });
        continue;
      }

      try {
        const url = `${this.CDN_BASE}/${slug}/${surahNum}.json`;
        const json = await this._fetchJson(url);
        const list = this._normalizeAyahList(json);
        if (list.length) {
          await this._writeSurahToIDB(slug, surahNum, list);
          await this._markDone(slug, surahNum);
          done.add(surahNum);
          this._emit({ type: 'progress', done: done.size, total, surah: surahNum });
        }
      } catch (e) {
        // Sura individual falló (red inestable): seguir; se reintentará en el próximo arranque
        this._emit({ type: 'skip', done: done.size, total, surah: surahNum });
      }

      // Pausa breve entre peticiones (jsDelivr no tiene rate-limit pero somos buenos ciudadanos)
      await new Promise(r => setTimeout(r, 120));
      if (!navigator.onLine) { this._emit({ type: 'offline', done: done.size, total }); break; }
    }

    this._downloading = false;
    const finalStatus = await this.getDownloadStatus(slug);
    this._emit({
      type: finalStatus.downloaded >= total ? 'complete' : 'paused',
      done: finalStatus.downloaded,
      total,
    });
  },

  /**
   * Autoarranque: al abrir la app, si hay conexión y la edición del idioma actual
   * no está completa, empieza la descarga en segundo plano. Sin botones, sin diálogos.
   * Respeta el modo de ahorro de datos del dispositivo.
   */
  async maybeAutoDownload(targetLang) {
    try {
      if (!navigator.onLine) return;
      const conn = navigator.connection || navigator.webkitConnection || navigator.mozConnection;
      if (conn && conn.saveData) return;

      const lang = targetLang || (typeof AppState !== 'undefined' && AppState.settings.locale) || 'es';
      const edition = this._resolveEdition(lang === 'ar' ? 'ar' : (lang === 'en' ? 'en' : 'es'));
      const status = await this.getDownloadStatus(edition.slug);
      if (status.downloaded >= status.total) return; // ya completo

      // No bloquear el arranque
      setTimeout(() => this.downloadAll(edition.slug), 2500);
    } catch (e) { /* silencioso: nunca debe romper el arranque */ }
  },

  // ============ API PÚBLICA (compatible con v1) ============
  /** Clear every cached tafsir entry (used by the retry button). */
  clearCache() {
    this._surahCache = {};
    try {
      const doomed = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('quba_tafsir_')) doomed.push(k);
      }
      doomed.forEach(k => localStorage.removeItem(k));
    } catch (e) { /* storage unavailable */ }
  },

  /**
   * Get tafsir for an ayah.
   * Primera lectura: red (CDN). Siguientes: instantáneo desde IndexedDB.
   * Returns { arabic, translated, source, sourceAr, targetLang }
   */
  async getTafsir(surahNum, ayahNum, tafsirId = null, targetLang = 'es') {
    const edition = this._resolveEdition(targetLang);
    const cacheKey = `tafsir_${this.CACHE_VER}_${surahNum}_${ayahNum}_${edition.slug}`;

    // Caché sincrónico rápido (Storage → memoria + localStorage)
    const cached = Storage.get(cacheKey);
    if (cached && (cached.translated || cached.arabic)) return cached;

    const entry = await this._findAyahEntry(edition.slug, surahNum, ayahNum);
    if (!entry || !entry.text) throw new Error('Tafsir not found for this ayah');

    const nameKey = `name_${targetLang === 'ar' ? 'ar' : (targetLang === 'en' ? 'en' : 'es')}`;
    const result = {
      arabic: targetLang === 'ar' ? entry.text : (await this._getArabicText(surahNum, ayahNum)),
      translated: targetLang === 'ar' ? '' : entry.text,
      source: edition[nameKey] || edition.name_en,
      sourceAr: edition.name_ar || '',
      targetLang,
    };

    Storage.set(cacheKey, result, 365 * 24 * 60 * 60 * 1000);
    return result;
  },

  /** Available tafsirs for the current locale (single remote edition per language). */
  getAvailableTafsirs(locale = 'es') {
    const key = locale === 'ar' ? 'ar' : (locale === 'en' ? 'en' : 'es');
    const ed = this.REMOTE_TAFSIRS[key];
    return [{
      id: `local.${key}`,
      name: ed[`name_${key}`] || ed.name_en,
      desc: ed[`desc_${key}`] || ed.desc_en,
    }];
  },
};

if (typeof window !== 'undefined') {
  window.TafsirService = TafsirService;
}
