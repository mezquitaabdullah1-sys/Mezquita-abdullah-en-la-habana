// 📴 Quran Offline Service — v22
//
// Objetivo: la lista de suras SIEMPRE funciona sin red (datos locales), y el
// TEXTO de cada sura (árabe + traducción + transliteración) queda disponible
// sin conexión para siempre en cuanto se descarga una vez (IndexedDB, sin
// TTL). v27: el AUDIO de recitación ya NO se descarga automáticamente (es
// pesado) — se pide permiso al usuario y este elige recitador y sura desde
// el gestor de descargas (icono en la pantalla del Corán). Los MP3 se
// guardan en la Cache API por aleya y el reproductor los sirve como Blob
// local sin conexión; cada descarga muestra su tamaño y puede borrarse.
// El texto y el tafsir (ligeros) siguen descargándose automáticamente.
//
// Fuente de los metadatos: recuento verificado (escuela Kúfica, 6236 ayát,
// 114 suras), igual que usa la propia Al-Quran Cloud API que ya consume esta
// app — así que la lista local no diverge de lo que se vería online.
//
// Formato compacto por fila: [numero, nombreArabe, nombreIngles, significado, numAyat, 'M'|'D', nombreEspanol]
const QURAN_SURAH_TABLE = [
  [1,'الفاتحة','Al-Fatihah','The Opening',7,'M','La Apertura'],
  [2,'البقرة','Al-Baqarah','The Cow',286,'D','La Vaca'],
  [3,'آل عمران',"Aal-i-Imraan",'The Family of Imran',200,'D','La Familia de Imrán'],
  [4,'النساء','An-Nisa','The Women',176,'D','Las Mujeres'],
  [5,'المائدة',"Al-Ma'idah",'The Table Spread',120,'D','La Mesa Servida'],
  [6,'الأنعام',"Al-An'am",'The Cattle',165,'M','El Ganado'],
  [7,'الأعراف',"Al-A'raf",'The Heights',206,'M','Las Alturas'],
  [8,'الأنفال','Al-Anfal','The Spoils of War',75,'D','Los Botines de Guerra'],
  [9,'التوبة','At-Tawbah','The Repentance',129,'D','El Arrepentimiento'],
  [10,'يونس','Yunus','Jonah',109,'M','Jonás'],
  [11,'هود','Hud','Hud',123,'M','Hud'],
  [12,'يوسف','Yusuf','Joseph',111,'M','José'],
  [13,'الرعد',"Ar-Ra'd",'The Thunder',43,'D','El Trueno'],
  [14,'ابراهيم','Ibrahim','Abraham',52,'M','Abraham'],
  [15,'الحجر','Al-Hijr','The Rocky Tract',99,'M','Al-Hiyr (El Valle de Piedra)'],
  [16,'النحل','An-Nahl','The Bee',128,'M','La Abeja'],
  [17,'الإسراء','Al-Isra','The Night Journey',111,'M','El Viaje Nocturno'],
  [18,'الكهف','Al-Kahf','The Cave',110,'M','La Caverna'],
  [19,'مريم','Maryam','Mary',98,'M','María'],
  [20,'طه','Ta-Ha','Ta-Ha',135,'M','Ta-Ha'],
  [21,'الأنبياء','Al-Anbiya','The Prophets',112,'M','Los Profetas'],
  [22,'الحج','Al-Hajj','The Pilgrimage',78,'D','La Peregrinación'],
  [23,'المؤمنون',"Al-Mu'minun",'The Believers',118,'M','Los Creyentes'],
  [24,'النور','An-Nur','The Light',64,'D','La Luz'],
  [25,'الفرقان','Al-Furqan','The Criterion',77,'M','El Criterio'],
  [26,'الشعراء',"Ash-Shu'ara",'The Poets',227,'M','Los Poetas'],
  [27,'النمل','An-Naml','The Ants',93,'M','Las Hormigas'],
  [28,'القصص','Al-Qasas','The Stories',88,'M','Los Relatos'],
  [29,'العنكبوت','Al-Ankabut','The Spider',69,'M','La Araña'],
  [30,'الروم','Ar-Rum','The Romans',60,'M','Los Romanos'],
  [31,'لقمان','Luqman','Luqman',34,'M','Luqmán'],
  [32,'السجدة','As-Sajdah','The Prostration',30,'M','La Prosternación'],
  [33,'الأحزاب','Al-Ahzab','The Combined Forces',73,'D','Las Facciones'],
  [34,'سبإ','Saba',"Sheba",54,'M','Sabá'],
  [35,'فاطر','Fatir','Originator',45,'M','El Creador'],
  [36,'يس','Ya-Sin','Ya Sin',83,'M','Ya Sin'],
  [37,'الصافات','As-Saffat','Those Who Set The Ranks',182,'M','Los Alineados en Filas'],
  [38,'ص','Sad','The Letter "Saad"',88,'M','La Letra «Sad»'],
  [39,'الزمر','Az-Zumar','The Troops',75,'M','Los Grupos'],
  [40,'غافر','Ghafir','The Forgiver',85,'M','El Perdonador'],
  [41,'فصلت','Fussilat','Explained In Detail',54,'M','Detalladamente Explicadas'],
  [42,'الشورى','Ash-Shura','The Consultation',53,'M','La Consulta'],
  [43,'الزخرف','Az-Zukhruf','The Ornaments Of Gold',89,'M','Los Ornamentos de Oro'],
  [44,'الدخان','Ad-Dukhan','The Smoke',59,'M','El Humo'],
  [45,'الجاثية','Al-Jathiyah','The Crouching',37,'M','Los Arrodillados'],
  [46,'الأحقاف','Al-Ahqaf','The Wind-Curved Sandhills',35,'M','Las Dunas'],
  [47,'محمد','Muhammad','Muhammad',38,'D','Muhammad'],
  [48,'الفتح','Al-Fath','The Victory',29,'D','La Victoria'],
  [49,'الحجرات','Al-Hujurat','The Rooms',18,'D','Las Habitaciones'],
  [50,'ق','Qaf','The Letter "Qaf"',45,'M','La Letra «Qaf»'],
  [51,'الذاريات','Adh-Dhariyat','The Winnowing Winds',60,'M','Los Vientos que Dispersan'],
  [52,'الطور','At-Tur','The Mount',49,'M','El Monte'],
  [53,'النجم','An-Najm','The Star',62,'M','La Estrella'],
  [54,'القمر','Al-Qamar','The Moon',55,'M','La Luna'],
  [55,'الرحمن','Ar-Rahman','The Most Merciful',78,'D','El Compasivo'],
  [56,'الواقعة',"Al-Waqi'ah",'The Inevitable',96,'M','El Acontecimiento Inevitable'],
  [57,'الحديد','Al-Hadid','The Iron',29,'D','El Hierro'],
  [58,'المجادلة','Al-Mujadilah','The Pleading Woman',22,'D','La Mujer que Discute'],
  [59,'الحشر','Al-Hashr','The Exile',24,'D','El Destierro'],
  [60,'الممتحنة','Al-Mumtahanah','She That Is To Be Examined',13,'D','La Mujer Puesta a Prueba'],
  [61,'الصف','As-Saff','The Ranks',14,'D','Las Filas'],
  [62,'الجمعة',"Al-Jumu'ah",'Friday',11,'D','El Viernes'],
  [63,'المنافقون','Al-Munafiqun','The Hypocrites',11,'D','Los Hipócritas'],
  [64,'التغابن','At-Taghabun','The Mutual Disillusion',18,'D','El Engaño Mutuo'],
  [65,'الطلاق','At-Talaq','The Divorce',12,'D','El Divorcio'],
  [66,'التحريم','At-Tahrim','The Prohibition',12,'D','La Prohibición'],
  [67,'الملك','Al-Mulk','The Sovereignty',30,'M','El Dominio'],
  [68,'القلم','Al-Qalam','The Pen',52,'M','La Pluma'],
  [69,'الحاقة','Al-Haqqah','The Reality',52,'M','La Realidad Inevitable'],
  [70,'المعارج',"Al-Ma'arij",'The Ascending Stairways',44,'M','Las Vías de Ascenso'],
  [71,'نوح','Nuh','Noah',28,'M','Noé'],
  [72,'الجن','Al-Jinn','The Jinn',28,'M','Los Genios'],
  [73,'المزمل','Al-Muzzammil','The Enshrouded One',20,'M','El Arropado'],
  [74,'المدثر','Al-Muddaththir','The Cloaked One',56,'M','El Envuelto en Manto'],
  [75,'القيامة','Al-Qiyamah','The Resurrection',40,'M','La Resurrección'],
  [76,'الانسان','Al-Insan','Man',31,'D','El Hombre'],
  [77,'المرسلات','Al-Mursalat','The Emissaries',50,'M','Los Enviados'],
  [78,'النبأ','An-Naba','The Tidings',40,'M','La Gran Noticia'],
  [79,'النازعات',"An-Nazi'at",'Those Who Drag Forth',46,'M','Los Que Arrancan'],
  [80,'عبس',"'Abasa",'He Frowned',42,'M','Frunció el Ceño'],
  [81,'التكوير','At-Takwir','The Overthrowing',29,'M','El Oscurecimiento'],
  [82,'الإنفطار','Al-Infitar','The Cleaving',19,'M','La Hendidura'],
  [83,'المطففين','Al-Mutaffifin','The Defrauding',36,'M','Los Defraudadores'],
  [84,'الإنشقاق','Al-Inshiqaq','The Sundering',25,'M','La Grieta del Cielo'],
  [85,'البروج','Al-Buruj','The Mansions Of The Stars',22,'M','Las Constelaciones'],
  [86,'الطارق','At-Tariq','The Morning Star',17,'M','El Astro Nocturno'],
  [87,'الأعلى',"Al-A'la",'The Most High',19,'M','El Altísimo'],
  [88,'الغاشية','Al-Ghashiyah','The Overwhelming',26,'M','La Catástrofe'],
  [89,'الفجر','Al-Fajr','The Dawn',30,'M','El Alba'],
  [90,'البلد','Al-Balad','The City',20,'M','La Ciudad'],
  [91,'الشمس','Ash-Shams','The Sun',15,'M','El Sol'],
  [92,'الليل','Al-Layl','The Night',21,'M','La Noche'],
  [93,'الضحى','Ad-Duha','The Morning Hours',11,'M','Las Horas de la Mañana'],
  [94,'الشرح','Ash-Sharh','The Relief',8,'M','La Apertura del Pecho'],
  [95,'التين','At-Tin','The Fig',8,'M','La Higuera'],
  [96,'العلق',"Al-'Alaq",'The Clot',19,'M','El Coágulo'],
  [97,'القدر','Al-Qadr','The Power, Fate',5,'M','La Noche del Decreto'],
  [98,'البينة','Al-Bayyinah','The Clear Proof',8,'D','La Prueba Clara'],
  [99,'الزلزلة','Az-Zalzalah','The Earthquake',8,'D','El Terremoto'],
  [100,'العاديات',"Al-'Adiyat",'The Courser',11,'M','Los Corceles'],
  [101,'القارعة',"Al-Qari'ah",'The Calamity',11,'M','La Calamidad'],
  [102,'التكاثر','At-Takathur','The Rivalry In World Increase',8,'M','La Rivalidad en la Abundancia'],
  [103,'العصر',"Al-'Asr",'The Declining Day',3,'M','El Tiempo'],
  [104,'الهمزة','Al-Humazah','The Traducer',9,'M','El Calumniador'],
  [105,'الفيل','Al-Fil','The Elephant',5,'M','El Elefante'],
  [106,'قريش','Quraysh','Quraysh',4,'M','Los Quraysh'],
  [107,'الماعون',"Al-Ma'un",'The Small Kindnesses',7,'M','La Ayuda Menuda'],
  [108,'الكوثر','Al-Kawthar','The Abundance',3,'M','La Abundancia'],
  [109,'الكافرون','Al-Kafirun','The Disbelievers',6,'M','Los Incrédulos'],
  [110,'النصر','An-Nasr','The Divine Support',3,'D','El Auxilio Divino'],
  [111,'المسد','Al-Masad','The Palm Fiber',5,'M','La Fibra de Palma'],
  [112,'الإخلاص','Al-Ikhlas','The Sincerity',4,'M','La Sinceridad'],
  [113,'الفلق','Al-Falaq','The Dawn',5,'M','La Aurora'],
  [114,'الناس','An-Nas','Mankind',6,'M','Los Hombres'],
];

const QuranOfflineService = {
  MANIFEST_KEY: 'quran_offline_manifest_v1',
  _downloading: false,
  _cancelRequested: false,
  _listeners: [],

  // ============ SURAH LIST (100% local, sin red, siempre disponible) ============
  _listCache: null,
  getSurahList() {
    if (this._listCache) return this._listCache;
    this._listCache = QURAN_SURAH_TABLE.map(row => ({
      number: row[0],
      name: row[1],
      englishName: row[2],
      englishNameTranslation: row[3],
      numberOfAyahs: row[4],
      revelationType: row[5] === 'D' ? 'Medinan' : 'Meccan',
      spanishName: row[6] || '', // v22: nombre del capítulo traducido al español
    }));
    return this._listCache;
  },

  getSurahMeta(number) {
    return this.getSurahList().find(s => s.number === Number(number)) || null;
  },

  // ============ ALMACENAMIENTO PERMANENTE (IndexedDB vía CacheDB, sin TTL) ============
  _key(number, translation, reciter) {
    return `quran_full_v1_${number}_${translation}_${reciter}`;
  },

  async getLocalSurah(number, translation, reciter) {
    if (typeof CacheDB === 'undefined') return null;
    try {
      const val = await CacheDB.get(this._key(number, translation, reciter));
      return val || null;
    } catch (e) { return null; }
  },

  async saveSurah(number, translation, reciter, data) {
    if (typeof CacheDB === 'undefined' || !data) return false;
    try {
      await CacheDB.set(this._key(number, translation, reciter), data, null); // null = sin caducidad
      await this._markDone(number, translation, reciter);
      return true;
    } catch (e) { return false; }
  },

  async _getManifest() {
    if (typeof CacheDB === 'undefined') return { translation: null, reciter: null, done: [] };
    try {
      const m = await CacheDB.get(this.MANIFEST_KEY);
      return m || { translation: null, reciter: null, done: [] };
    } catch (e) { return { translation: null, reciter: null, done: [] }; }
  },

  async _markDone(number, translation, reciter) {
    const m = await this._getManifest();
    if (m.translation !== translation || m.reciter !== reciter) {
      // Cambió la traducción/recitador preferido: empezar manifiesto nuevo
      m.translation = translation;
      m.reciter = reciter;
      m.done = [];
    }
    if (!m.done.includes(number)) m.done.push(number);
    try { await CacheDB.set(this.MANIFEST_KEY, m, null); } catch (e) {}
  },

  async getDownloadStatus(translation, reciter) {
    const m = await this._getManifest();
    const matches = m.translation === translation && m.reciter === reciter;
    return {
      downloaded: matches ? m.done.length : 0,
      total: QURAN_SURAH_TABLE.length,
      isCurrent: matches,
    };
  },

  async isFullyDownloaded(translation, reciter) {
    const st = await this.getDownloadStatus(translation, reciter);
    return st.downloaded >= st.total;
  },

  async getDownloadedNumbers(translation, reciter) {
    const m = await this._getManifest();
    if (m.translation !== translation || m.reciter !== reciter) return [];
    return m.done.slice();
  },

  // ============ DESCARGA (solo texto: árabe + traducción + transliteración) ============
  onProgress(cb) { this._listeners.push(cb); },
  _emit(evt) { this._listeners.forEach(cb => { try { cb(evt); } catch (e) {} }); },

  cancelDownload() { this._cancelRequested = true; },

  async downloadAll(translation, reciter) {
    if (this._downloading) return; // ya en marcha
    if (typeof API === 'undefined' || typeof CacheDB === 'undefined') return;
    this._downloading = true;
    this._cancelRequested = false;

    const m = await this._getManifest();
    const sameTarget = m.translation === translation && m.reciter === reciter;
    const done = new Set(sameTarget ? m.done : []);

    const total = QURAN_SURAH_TABLE.length;
    this._emit({ type: 'start', done: done.size, total });

    for (const row of QURAN_SURAH_TABLE) {
      const number = row[0];
      if (this._cancelRequested) { this._emit({ type: 'cancelled', done: done.size, total }); break; }
      if (done.has(number)) continue;

      try {
        // Reutiliza exactamente la misma llamada/forma que usa la lectura online,
        // así el dato guardado es idéntico al que vería el usuario conectado.
        const data = await API._fetchSurahFromNetwork(number, translation, reciter);
        if (data) {
          await this.saveSurah(number, translation, reciter, data);
          done.add(number);
          this._emit({ type: 'progress', done: done.size, total, surah: number });
        }
      } catch (e) {
        // Sura individual falló (red inestable): seguir con las demás,
        // se reintentará en la próxima ejecución (no está marcada como 'done').
        this._emit({ type: 'skip', done: done.size, total, surah: number });
      }

      // Pausa breve entre peticiones para no saturar la API gratuita
      await new Promise(r => setTimeout(r, 200));
      if (!navigator.onLine) { this._emit({ type: 'offline', done: done.size, total }); break; }
    }

    this._downloading = false;
    const finalStatus = await this.getDownloadStatus(translation, reciter);
    this._emit({ type: finalStatus.downloaded >= total ? 'complete' : 'paused', done: finalStatus.downloaded, total });
    // v27: ya NO se encadena la descarga automática de audio — el audio solo
    // se descarga con permiso del usuario, por sura, desde el gestor.
  },

  // ============ AUDIO OFFLINE POR SURA (v27) ============
  // El audio de recitación ya NO se descarga automáticamente (6236 MP3 ≈
  // varios cientos de MB). En su lugar: la app pide permiso una vez y el
  // usuario elige recitador y sura desde el gestor de descargas del Corán.
  // Los MP3 de las aleyas de esa sura se guardan en la Cache API; al
  // reproducir, se sirven como Blob local (funcionan sin conexión). Cada
  // descarga muestra su tamaño y puede borrarse por sura o por completo.
  AUDIO_CACHE: 'quba-quran-audio-v1',
  SURAH_AUDIO_KEY: 'quran_surah_audio_v1', // {downloads: [{reciter, surah, bytes, at}]}
  AUDIO_BITRATE: 128,                      // kbps del CDN → estimación de tamaño
  _audioDownloading: false,
  _audioDl: null,                          // progreso de la descarga en curso
  _surahAudioCache: null,                  // caché en memoria del registro
  _lastTotalBytes: null,                   // tamaño medido de la última descarga

  _audioCacheSupported() {
    return typeof caches !== 'undefined';
  },

  // URL cacheable del MP3 de una aleya (CDN estable por número global)
  audioUrlFor(ayahGlobal, reciter) {
    return `https://cdn.islamic.network/quran/audio/128/${reciter}/${ayahGlobal}.mp3`;
  },

  // Estimación del tamaño de una sura (128 kbps ≈ 2,5-4 s/aleya).
  estimateSurahBytes(number) {
    const meta = this.getSurahMeta(number);
    if (!meta) return 0;
    return Math.round(meta.numberOfAyahs * 3.2 * (this.AUDIO_BITRATE / 8) * 1024);
  },

  estimateTotalAudioBytes() {
    const ayahs = QURAN_SURAH_TABLE.reduce((sum, r) => sum + r[4], 0);
    return Math.round(ayahs * 3.2 * (this.AUDIO_BITRATE / 8) * 1024);
  },

  formatBytes(bytes) {
    if (!bytes || bytes <= 0) return '0 KB';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  },

  // ---- Registro de suras con audio descargado (persistente, localStorage) ----
  _getSurahAudioRec() {
    if (this._surahAudioCache) return this._surahAudioCache;
    let rec = { downloads: [] };
    try {
      const raw = localStorage.getItem('quba_' + this.SURAH_AUDIO_KEY);
      if (raw) rec = JSON.parse(raw) || rec;
    } catch (e) {}
    if (!Array.isArray(rec.downloads)) rec.downloads = [];
    this._surahAudioCache = rec;
    return rec;
  },

  _saveSurahAudioRec() {
    try {
      localStorage.setItem('quba_' + this.SURAH_AUDIO_KEY, JSON.stringify(this._getSurahAudioRec()));
    } catch (e) {}
  },

  getAudioDownloads() { return this._getSurahAudioRec().downloads.slice(); },

  isSurahAudioDownloaded(reciter, surahNumber) {
    return this._getSurahAudioRec().downloads.some(
      d => d.reciter === reciter && d.surah === Number(surahNumber)
    );
  },

  getAudioDownloadCount() { return this._getSurahAudioRec().downloads.length; },

  _setSurahAudioDone(reciter, surahNumber, bytes) {
    const rec = this._getSurahAudioRec();
    const num = Number(surahNumber);
    const ex = rec.downloads.find(d => d.reciter === reciter && d.surah === num);
    if (ex) { ex.bytes = bytes; ex.at = Date.now(); }
    else rec.downloads.push({ reciter, surah: num, bytes, at: Date.now() });
    this._saveSurahAudioRec();
  },

  _removeSurahAudio(reciter, surahNumber) {
    const rec = this._getSurahAudioRec();
    const num = Number(surahNumber);
    rec.downloads = rec.downloads.filter(d => !(d.reciter === reciter && d.surah === num));
    this._saveSurahAudioRec();
  },

  // Índice global (1-6236) de la primera aleya de una sura
  _surahStartGlobal(number) {
    let start = 1;
    for (const row of QURAN_SURAH_TABLE) {
      if (row[0] === number) return start;
      start += row[4];
    }
    return 1;
  },

  // ---- Reproducción offline: si la aleya está en caché, se sirve como Blob
  // local (el elemento <audio> no pasa por la Cache API sin Service Worker).
  async getPlayableUrl(originalUrl, ayahGlobal, reciter) {
    try {
      if (!reciter || !ayahGlobal || !this._audioCacheSupported()) return originalUrl;
      const hit = await caches.open(this.AUDIO_CACHE).then(c => c.match(this.audioUrlFor(ayahGlobal, reciter)));
      if (!hit) return originalUrl;
      const blob = await hit.blob();
      return URL.createObjectURL(blob);
    } catch (e) { return originalUrl; }
  },

  // ---- Descarga por sura (con progreso y cancelación) ----
  async downloadSurahAudio(reciter, surahNumber) {
    if (this._audioDownloading) return false;
    if (!this._audioCacheSupported() || !navigator.onLine) return false;
    const meta = this.getSurahMeta(surahNumber);
    if (!meta) return false;

    this._audioDownloading = true;
    this._cancelRequested = false;
    const start = this._surahStartGlobal(meta.number);
    const total = meta.numberOfAyahs;
    let done = 0, totalBytes = 0, measured = false;
    this._audioDl = { reciter, surah: meta.number, done, total, bytes: 0 };
    this._emit({ type: 'audio-start', reciter, surah: meta.number, done, total });

    try {
      const cache = await caches.open(this.AUDIO_CACHE);
      for (let i = 0; i < total; i++) {
        if (this._cancelRequested || !navigator.onLine) break;
        const url = this.audioUrlFor(start + i, reciter);
        try {
          const hit = await cache.match(url);
          if (hit) {
            const b = await hit.blob();
            totalBytes += b.size || 0;
            measured = measured || b.size > 0;
          } else {
            // v28: triple reintento por aleya (CDN 128k → 64k → everyayah) —
            // antes, los recitadores bloqueados a 128 kbps dejaban la
            // descarga de la sura incompleta para siempre.
            const b = await this._fetchAyahAudioBlob(start + i, reciter, meta.number, i + 1);
            if (b) {
              try { await cache.put(url, new Response(b, { headers: { 'Content-Type': 'audio/mpeg' } })); } catch (e2) {}
              totalBytes += b.size || 0;
              measured = measured || b.size > 0;
            }
          }
        } catch (e) { /* aleya individual falló: seguir con las demás */ }
        done++;
        this._audioDl.done = done;
        this._audioDl.bytes = totalBytes;
        if (done % 3 === 0 || done === total) {
          this._emit({ type: 'audio-progress', reciter, surah: meta.number, done, total, bytes: totalBytes });
        }
      }
      if (done >= total && !this._cancelRequested) {
        // Si el CDN devolvió respuestas opacas (sin tamaño legible) usar la
        // estimación por bitrate para mostrar el tamaño al usuario.
        const bytes = measured && totalBytes > 0 ? totalBytes : this.estimateSurahBytes(meta.number);
        this._lastTotalBytes = bytes;
        this._setSurahAudioDone(reciter, meta.number, bytes);
        this._emit({ type: 'audio-complete', reciter, surah: meta.number, bytes });
        return true;
      }
      this._emit({ type: 'audio-paused', reciter, surah: meta.number, done, total });
      return false;
    } catch (e) {
      this._emit({ type: 'audio-error' });
      return false;
    } finally {
      this._audioDownloading = false;
      this._audioDl = null;
    }
  },

  // ---- Borrado ----
  async deleteSurahAudio(reciter, surahNumber) {
    try {
      if (this._audioCacheSupported()) {
        const meta = this.getSurahMeta(surahNumber);
        if (meta) {
          const cache = await caches.open(this.AUDIO_CACHE);
          const start = this._surahStartGlobal(meta.number);
          for (let i = 0; i < meta.numberOfAyahs; i++) {
            try { await cache.delete(this.audioUrlFor(start + i, reciter)); } catch (e) {}
          }
        }
      }
    } catch (e) {}
    this._removeSurahAudio(reciter, surahNumber);
    this._emit({ type: 'audio-deleted', reciter, surah: Number(surahNumber) });
    return true;
  },

  async deleteAllAudio() {
    this._cancelRequested = true;
    try { if (this._audioCacheSupported()) await caches.delete(this.AUDIO_CACHE); } catch (e) {}
    this._surahAudioCache = { downloads: [] };
    this._saveSurahAudioRec();
    this._emit({ type: 'audio-deleted', all: true });
  },

  // ---- Guardar MP3 en el dispositivo (para escuchar sin abrir la app) ----
  // v28 FIX: `cdn.islamic.network/quran/audio-surah/…` (el endpoint de sura
  // completa) devuelve 403 desde mediados de 2026 → el botón «Guardar en el
  // dispositivo» fallaba SIEMPRE. Nueva cadena con fuentes verificadas
  // (todas responden 200 con CORS `*`):
  //   Plan A — MP3 de la sura completa por recitador (download.quranicaudio.com).
  //   Plan B — aleyas ya descargadas en la Cache API, unidas en un único MP3.
  //   Plan C — descarga de las aleyas ahora mismo con triple reintento
  //            (CDN 128k → CDN 64k → everyayah.com) y unión del resultado.
  // Los MP3 MPEG-1 Layer III se pueden concatenar byte a byte, por lo que la
  // unión de aleyas produce un archivo MP3 válido.
  SURAH_FILE_SOURCES: {
    'ar.mahermuaiqly':       ['https://download.quranicaudio.com/quran/maher_almu3aiqly/year1440/', 'https://download.quranicaudio.com/quran/maher_almu3aiqly/year1422-1423/'],
    'ar.abdurrahmaansudais': ['https://download.quranicaudio.com/quran/abdurrahmaan_as-sudays/'],
    'ar.husary':             ['https://download.quranicaudio.com/quran/mahmood_khaleel_al-husaree/'],
    'ar.saadalghamdi':       ['https://download.quranicaudio.com/quran/sa3d_al-ghaamidi/complete/'],
    'ar.minshawi':           ['https://download.quranicaudio.com/quran/muhammad_siddeeq_al-minshaawee/'],
    'ar.abdulbasitmurattal': ['https://download.quranicaudio.com/quran/abdul_basit_murattal/'],
    'ar.hudhaify':           ['https://download.quranicaudio.com/quran/huthayfi/'],
  },

  // Tercera fuente por aleya (everyayah.com) — carpeta por recitador
  EVERYAYAH_FOLDERS: {
    'ar.mahermuaiqly':       'MaherAlMuaiqly_128kbps',
    'ar.abdurrahmaansudais': 'Abdurrahmaan_As-Sudais_192kbps',
    'ar.husary':             'Husary_128kbps',
    'ar.saadalghamdi':       'Ghamadi_40kbps',
    'ar.minshawi':           'Minshawy_Murattal_128kbps',
    'ar.abdulbasitmurattal': 'Abdul_Basit_Murattal_192kbps',
    'ar.hudhaify':           'Hudhaify_128kbps',
  },

  // URLs candidatas del MP3 de la sura completa (en orden de preferencia)
  surahFileUrlsFor(reciter, surahNumber) {
    const n = String(surahNumber).padStart(3, '0');
    return (this.SURAH_FILE_SOURCES[reciter] || []).map(base => base + n + '.mp3');
  },

  // Compatibilidad: primera URL candidata (misma firma que la antigua)
  surahFileUrlFor(reciter, surahNumber) {
    return this.surahFileUrlsFor(reciter, surahNumber)[0] || '';
  },

  // Descarga una aleya con triple reintento: CDN 128k → CDN 64k → everyayah.
  // (Algunos recitadores devuelven 403 a 128 kbps pero sí a 64; everyayah
  // usa numeración sura/aleya, no el índice global 1-6236.)
  async _fetchAyahAudioBlob(ayahGlobal, reciter, surahNumber, ayahInSurah) {
    const urls = [
      `https://cdn.islamic.network/quran/audio/128/${reciter}/${ayahGlobal}.mp3`,
      `https://cdn.islamic.network/quran/audio/64/${reciter}/${ayahGlobal}.mp3`,
    ];
    const folder = this.EVERYAYAH_FOLDERS[reciter];
    if (folder && surahNumber && ayahInSurah) {
      const s = String(surahNumber).padStart(3, '0');
      const a = String(ayahInSurah).padStart(3, '0');
      urls.push(`https://everyayah.com/data/${folder}/${s}${a}.mp3`);
    }
    for (const u of urls) {
      try {
        const res = await fetch(u);
        if (res && res.ok) {
          const blob = await res.blob();
          if (blob && blob.size > 512 && (blob.type.includes('audio') || blob.type === '')) return blob;
        }
      } catch (e) { /* siguiente fuente */ }
    }
    return null;
  },

  async exportSurahAudio(reciter, surahNumber) {
    const meta = this.getSurahMeta(surahNumber);
    if (!meta) return { ok: false };
    const name = `${String(meta.number).padStart(3, '0')}_${(meta.englishName || 'surah').replace(/[^A-Za-z0-9-]+/g, '_')}_${reciter}.mp3`;

    // Plan A: MP3 de la sura completa (una sola descarga, más rápido)
    if (navigator.onLine) {
      for (const url of this.surahFileUrlsFor(reciter, meta.number)) {
        try {
          const res = await fetch(url);
          if (res && res.ok) {
            const blob = await res.blob();
            if (blob.size > 1024 && (blob.type.includes('audio') || blob.type === '')) {
              this._triggerBlobDownload(blob, name);
              return { ok: true, source: 'surah-file', bytes: blob.size, name };
            }
          }
        } catch (e) { /* siguiente fuente */ }
      }
    }

    // Plan B: concatenar las aleyas ya cacheadas de esa sura
    try {
      if (this._audioCacheSupported()) {
        const cache = await caches.open(this.AUDIO_CACHE);
        const start = this._surahStartGlobal(meta.number);
        const parts = [];
        let complete = true;
        for (let i = 0; i < meta.numberOfAyahs; i++) {
          const hit = await cache.match(this.audioUrlFor(start + i, reciter));
          if (!hit) { complete = false; break; } // falta alguna aleya: no exportable
          parts.push(await hit.blob());
        }
        if (complete && parts.length) {
          const blob = new Blob(parts, { type: 'audio/mpeg' });
          this._triggerBlobDownload(blob, name);
          return { ok: true, source: 'cache', bytes: blob.size, name };
        }
      }
    } catch (e) { /* pasa al plan C */ }

    // Plan C: descargar ahora las aleyas una a una (con reintentos) y unirlas.
    // Cada aleya conseguida se guarda además en la Cache API → queda offline.
    if (navigator.onLine) {
      try {
        const cache = this._audioCacheSupported() ? await caches.open(this.AUDIO_CACHE) : null;
        const start = this._surahStartGlobal(meta.number);
        const parts = [];
        for (let i = 0; i < meta.numberOfAyahs; i++) {
          const url = this.audioUrlFor(start + i, reciter);
          let wasCached = false;
          let blob = null;
          if (cache) {
            const hit = await cache.match(url);
            if (hit) { blob = await hit.blob(); wasCached = true; }
          }
          if (!blob) blob = await this._fetchAyahAudioBlob(start + i, reciter, meta.number, i + 1);
          if (!blob) return { ok: false }; // una aleya falló en todas las fuentes
          parts.push(blob);
          if (cache && !wasCached) {
            try { await cache.put(url, new Response(blob, { headers: { 'Content-Type': 'audio/mpeg' } })); } catch (e2) {}
          }
        }
        if (parts.length === meta.numberOfAyahs) {
          const blob = new Blob(parts, { type: 'audio/mpeg' });
          this._lastTotalBytes = blob.size;
          this._setSurahAudioDone(reciter, meta.number, blob.size);
          this._emit({ type: 'audio-complete', reciter, surah: meta.number, bytes: blob.size });
          this._triggerBlobDownload(blob, name);
          return { ok: true, source: 'ayah-join', bytes: blob.size, name };
        }
      } catch (e) { /* sin más opciones */ }
    }

    return { ok: false };
  },

  _triggerBlobDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.rel = 'noopener';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    // Ventana amplia antes de revocar: Safari/iOS y archivos grandes necesitan
    // tiempo para iniciar la descarga desde el blob: URL.
    setTimeout(() => { a.remove(); URL.revokeObjectURL(url); }, 10000);
  },

  // Se llama una vez al iniciar la app: si hay conexión y no está completo,
  // arranca la descarga en segundo plano del TEXTO (ligero). El audio ya no
  // se toca aquí: requiere permiso explícito del usuario (v27).
  async maybeAutoDownload() {
    try {
      if (!navigator.onLine) return;
      // Respeta el modo de ahorro de datos del dispositivo si el navegador lo expone
      const conn = navigator.connection || navigator.webkitConnection || navigator.mozConnection;
      if (conn && conn.saveData) return;

      const translation = (typeof AppState !== 'undefined' && AppState.settings.translation) || 'es.cortes';
      const reciter = (typeof AppState !== 'undefined' && AppState.settings.reciter) || 'ar.mahermuaiqly';
      const status = await this.getDownloadStatus(translation, reciter);
      if (status.downloaded >= status.total) return; // ya completo

      // No bloquear el arranque de la app
      setTimeout(() => this.downloadAll(translation, reciter), 3000);
    } catch (e) { /* silencioso: nunca debe romper el arranque */ }
  },
};

if (typeof window !== 'undefined') {
  window.QuranOfflineService = QuranOfflineService;
  window.QURAN_SURAH_TABLE = QURAN_SURAH_TABLE;
}
