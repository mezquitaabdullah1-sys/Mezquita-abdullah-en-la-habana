// 🌐 Cliente API — Aladhan + Al-Quran Cloud (v3: con transliteration y navegación)

const API = {
  // ============ PRAYER TIMES (Aladhan) ============
  async getPrayerTimes(lat, lng, date = new Date(), method = 3) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    const cacheKey = `prayer_${lat.toFixed(2)}_${lng.toFixed(2)}_${dd}-${mm}-${yyyy}_${method}`;
    const cached = Storage.get(cacheKey);
    if (cached) return this._applyTimeShift(cached);

    // v21: sin red y sin caché → calcular localmente (offline) en vez de fallar
    if (!navigator.onLine) return this._offlinePrayerTimes(lat, lng, date, method);

    try {
      // v18: If online, fetch + also prefetch next 14 days in background
      const url = `${CONFIG.API.ALADHAN}/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lng}&method=${method}`;
      const res = await this._fetchWithTimeout(url, 8000);
      if (!res.ok) throw new Error('Prayer API error');
      const json = await res.json();
      if (json.code !== 200) throw new Error('Prayer API error');

      Storage.set(cacheKey, json.data, CONFIG.CACHE_TTL * 14); // 14 days cache

      // Background prefetch: next 14 days so app works offline for 2 weeks
      this._prefetchNext14Days(lat, lng, method).catch(() => {});

      return this._applyTimeShift(json.data);
    } catch (e) {
      // Red inestable/caída a mitad: nunca dejar al usuario sin nada
      console.warn('Prayer API offline, calculando localmente:', e.message);
      return this._offlinePrayerTimes(lat, lng, date, method);
    }
  },

  // v26: aplica el ajuste manual verano/invierno (±1h) sobre los horarios
  // devueltos (por API o por caché). No toca el objeto original.
  _applyTimeShift(data) {
    try {
      if (!data || !data.timings) return data;
      const mode = (typeof AppState !== 'undefined' && AppState.settings && AppState.settings.timeShift) || 'auto';
      if (mode === 'auto' || typeof PrayerCalc === 'undefined') return data;
      const delta = mode === 'summer' ? 1 : (mode === 'winter' ? -1 : 0);
      if (!delta) return data;
      const shifted = PrayerCalc.shiftTimings(data.timings, delta);
      shifted._timeShifted = mode;
      return Object.assign({}, data, { timings: shifted, _timeShifted: mode });
    } catch (e) { return data; }
  },

  // v21: respaldo 100% local (sin red) usando PrayerCalc — precisión ±1-2 min
  // v26: PrayerCalc.getTimings ya aplica internamente el ajuste manual
  //      verano/invierno (AppState.settings.timeShift).
  _offlinePrayerTimes(lat, lng, date, method) {
    if (typeof PrayerCalc === 'undefined') throw new Error('Prayer API error');
    const timings = PrayerCalc.getTimings(lat, lng, date, method);
    // _estimated se duplica DENTRO de timings porque varias pantallas hacen
    // `AppState.timings = resultado.timings` (pierden el nivel exterior).
    timings._estimated = true;
    return {
      timings,
      date: {
        readable: date.toDateString(),
        gregorian: {
          date: `${String(date.getDate()).padStart(2,'0')}-${String(date.getMonth()+1).padStart(2,'0')}-${date.getFullYear()}`,
          day: String(date.getDate()),
        },
      },
      meta: { method: CONFIG.CALCULATION_METHODS[method] || '' },
      _estimated: true, // la UI puede mostrar un aviso de "horario aproximado"
    };
  },

  // Prefetch the next 14 days of prayer times so the app works offline
  async _prefetchNext14Days(lat, lng, method) {
    if (!navigator.onLine) return;
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      const key = `prayer_${lat.toFixed(2)}_${lng.toFixed(2)}_${dd}-${mm}-${yyyy}_${method}`;
      if (Storage.get(key)) continue; // already cached
      try {
        const url = `${CONFIG.API.ALADHAN}/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lng}&method=${method}`;
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          if (json.code === 200) {
            Storage.set(key, json.data, CONFIG.CACHE_TTL * 30); // 30 days cache
          }
        }
        // Small delay to avoid rate-limit
        await new Promise(r => setTimeout(r, 150));
      } catch (_) { /* ignore */ }
    }
  },

  // ============ HIJRI CALENDAR ============
  async gregorianToHijri(date = new Date()) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    const cacheKey = `hijri_${dd}-${mm}-${yyyy}`;
    const cached = Storage.get(cacheKey);
    if (cached) return cached;

    // v21: sin red → usar el cálculo aritmético local (ya usado en el calendario)
    if (!navigator.onLine) return this._gregorianToHijriRich(date);

    try {
      const url = `${CONFIG.API.ALADHAN}/gToH/${dd}-${mm}-${yyyy}`;
      const res = await this._fetchWithTimeout(url, 8000);
      if (!res.ok) throw new Error('Hijri API error');
      const json = await res.json();
      const hijri = json.data?.hijri;
      if (!hijri) throw new Error('Hijri API empty');
      Storage.set(cacheKey, hijri, CONFIG.CACHE_TTL * 7);
      return hijri;
    } catch (e) {
      console.warn('Hijri API offline, calculando localmente:', e.message);
      return this._gregorianToHijriRich(date);
    }
  },

  // v21: envuelve _gregorianToHijri (día/mes/año simples) en la misma forma
  // "rica" que devuelve Aladhan ({day, month:{number,en,ar}, year, weekday}),
  // para que sea intercambiable con cualquier código que ya consuma el hijri.
  _gregorianToHijriRich(gregDate) {
    const h = this._gregorianToHijri(gregDate);
    const monthName = this._hijriMonthName(h.month);
    const weekdayName = this._weekdayName(gregDate.getDay());
    return {
      date: `${String(h.day).padStart(2,'0')}-${String(h.month).padStart(2,'0')}-${h.year}`,
      day: String(h.day),
      month: { number: h.month, en: monthName.en, ar: monthName.ar },
      year: String(h.year),
      weekday: { en: weekdayName.en, ar: weekdayName.ar },
      _estimated: true,
    };
  },

  // Nombres de mes hijri (compartido por el calendario y el fallback de un solo día)
  _hijriMonthName(monthNum) {
    const en = ['Muharram','Safar','Rabi al-Awwal','Rabi al-Thani','Jumada al-Ula','Jumada al-Akhirah','Rajab','Sha\'ban','Ramadan','Shawwal','Dhul-Qa\'dah','Dhul-Hijjah'][monthNum-1];
    const ar = ['محرم','صفر','ربيع الأول','ربيع الثاني','جمادى الأولى','جمادى الآخرة','رجب','شعبان','رمضان','شوال','ذو القعدة','ذو الحجة'][monthNum-1];
    return { en, ar };
  },

  // Nombre de día de la semana (0=domingo), compartido por varios fallbacks offline
  _weekdayName(dayOfWeek) {
    const en = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][dayOfWeek];
    const ar = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'][dayOfWeek];
    return { en, ar };
  },

  // v19: fetch with hard timeout — a hung request must not leave the UI loading forever
  _fetchWithTimeout(url, ms = 8000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
  },

  async getHijriCalendarMonth(month, year) {
    const cacheKey = `hijri_cal_${month}_${year}`;
    const cached = Storage.get(cacheKey);
    if (cached) return cached;

    // v18: offline-first — if no network, compute Hijri calendar locally
    if (!navigator.onLine) {
      return this._computeHijriCalendarOffline(month, year);
    }

    const url = `${CONFIG.API.ALADHAN}/gToHCalendar/${month}/${year}`;
    try {
      const res = await this._fetchWithTimeout(url, 8000);
      if (!res.ok) throw new Error('Hijri calendar error');
      const json = await res.json();
      const data = json.data || [];
      if (!Array.isArray(data) || data.length === 0) throw new Error('Hijri calendar empty');
      Storage.set(cacheKey, data, CONFIG.CACHE_TTL * 14); // 14 days cache
      return data;
    } catch (e) {
      // Network failed/timeout — fallback to offline computation (always resolves)
      console.warn('Hijri API offline, computing locally:', e.message);
      return this._computeHijriCalendarOffline(month, year);
    }
  },

  // Compute Hijri calendar offline using arithmetic Hijri calendar (Umm al-Qura approximation)
  _computeHijriCalendarOffline(month, year) {
    const daysInGregMonth = new Date(year, month, 0).getDate();
    const result = [];
    for (let d = 1; d <= daysInGregMonth; d++) {
      const greg = new Date(year, month - 1, d);
      const hijri = this._gregorianToHijri(greg);
      const dayOfWeek = greg.getDay(); // 0=Sun
      const weekdayNames = {
        en: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][dayOfWeek],
        ar: ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'][dayOfWeek],
      };
      const monthNames = {
        en: ['January','February','March','April','May','June','July','August','September','October','November','December'][month-1],
        ar: ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'][month-1],
      };
      const hijriMonths = {
        en: ['Muharram','Safar','Rabi al-Awwal','Rabi al-Thani','Jumada al-Ula','Jumada al-Akhirah','Rajab','Sha\'ban','Ramadan','Shawwal','Dhul-Qa\'dah','Dhul-Hijjah'][hijri.month-1],
        ar: ['محرم','صفر','ربيع الأول','ربيع الثاني','جمادى الأولى','جمادى الآخرة','رجب','شعبان','رمضان','شوال','ذو القعدة','ذو الحجة'][hijri.month-1],
      };
      const dd = String(d).padStart(2,'0');
      const mm = String(month).padStart(2,'0');
      const hd = String(hijri.day).padStart(2,'0');
      const hm = String(hijri.month).padStart(2,'0');
      result.push({
        gregorian: {
          date: `${dd}-${mm}-${year}`,
          day: String(d),
          month: { number: month, en: monthNames.en, ar: monthNames.ar },
          year: String(year),
          weekday: { en: weekdayNames.en, ar: weekdayNames.ar },
        },
        hijri: {
          date: `${hd}-${hm}-${hijri.year}`,
          day: String(hijri.day),
          month: { number: hijri.month, en: hijriMonths.en, ar: hijriMonths.ar },
          year: String(hijri.year),
          weekday: { en: weekdayNames.en, ar: weekdayNames.ar },
        },
      });
    }
    return result;
  },

  // Convert Gregorian Date → Hijri using arithmetic approximation (Umm al-Qura)
  _gregorianToHijri(gregDate) {
    // Tabular Islamic calendar (civil, Friday epoch: 1948440 Julian day)
    // JD = Julian Day Number at noon
    const y = gregDate.getFullYear();
    const m = gregDate.getMonth() + 1;
    const d = gregDate.getDate();
    // Julian Day calculation (Gregorian)
    const a = Math.floor((14 - m) / 12);
    const y2 = y + 4800 - a;
    const m2 = m + 12 * a - 3;
    const jdn = d + Math.floor((153 * m2 + 2) / 5) + 365 * y2 + Math.floor(y2 / 4) - Math.floor(y2 / 100) + Math.floor(y2 / 400) - 32045;
    // Islamic epoch: July 16, 622 (Julian) = JD 1948440
    const islamicEpoch = 1948440;
    const daysSinceEpoch = jdn - islamicEpoch;
    // Arithmetic Islamic calendar: 30 years cycle = 10631 days; 11 leap years in 30
    const year30 = Math.floor(daysSinceEpoch / 10631);
    let remaining = daysSinceEpoch - year30 * 10631;
    let year = year30 * 30 + 1;
    while (true) {
      const daysInYear = this._isHijriLeapYear(year) ? 355 : 354;
      if (remaining < daysInYear) break;
      remaining -= daysInYear;
      year++;
    }
    // Month lengths (civil): odd months 30, even months 29, Dhul-Hijjah 30 in leap year
    const monthLengths = [30,29,30,29,30,29,30,29,30,29,30, this._isHijriLeapYear(year) ? 30 : 29];
    let month = 1;
    while (remaining >= monthLengths[month-1]) {
      remaining -= monthLengths[month-1];
      month++;
    }
    const day = remaining + 1;
    return { day, month, year };
  },

  _isHijriLeapYear(y) {
    // 11 leap years in a 30-year cycle: 2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29
    const leapYears = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
    return leapYears.includes(y % 30);
  },

  // Monthly prayer times table for a given lat/lon, method, month, year
  async getPrayerTimesMonth(lat, lon, month, year, method = 3) {
    const cacheKey = `prayer_month_${lat.toFixed(2)}_${lon.toFixed(2)}_${month}_${year}_${method}`;
    const cached = Storage.get(cacheKey);
    if (cached) return this._applyTimeShiftMonth(cached);

    if (!navigator.onLine) return this._computePrayerMonthOffline(lat, lon, month, year, method);

    try {
      const url = `${CONFIG.API.ALADHAN}/calendar/${year}/${month}?latitude=${lat}&longitude=${lon}&method=${method}`;
      const res = await this._fetchWithTimeout(url, 8000);
      if (!res.ok) throw new Error('Prayer month error');
      const json = await res.json();
      const data = json.data || [];
      if (!Array.isArray(data) || data.length === 0) throw new Error('Prayer month empty');
      // Cache for 7 days
      Storage.set(cacheKey, data, CONFIG.CACHE_TTL * 7);
      return this._applyTimeShiftMonth(data);
    } catch (e) {
      console.warn('Prayer month API offline, calculando localmente:', e.message);
      return this._computePrayerMonthOffline(lat, lon, month, year, method);
    }
  },

  // v26: aplica ±1h verano/invierno a la tabla mensual (API o caché)
  _applyTimeShiftMonth(data) {
    try {
      const mode = (typeof AppState !== 'undefined' && AppState.settings && AppState.settings.timeShift) || 'auto';
      if (mode === 'auto' || typeof PrayerCalc === 'undefined') return data;
      const delta = mode === 'summer' ? 1 : (mode === 'winter' ? -1 : 0);
      if (!delta || !Array.isArray(data)) return data;
      return data.map(d => Object.assign({}, d, { timings: PrayerCalc.shiftTimings(d.timings, delta) }));
    } catch (e) { return data; }
  },

  // v21: tabla mensual calculada localmente (mismo shape que Aladhan /calendar)
  _computePrayerMonthOffline(lat, lon, month, year, method) {
    if (typeof PrayerCalc === 'undefined') return [];
    const gregMonthNames = {
      en: ['January','February','March','April','May','June','July','August','September','October','November','December'][month-1],
      ar: ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'][month-1],
    };
    const daysInMonth = new Date(year, month, 0).getDate();
    const result = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const greg = new Date(year, month - 1, d);
      const timings = PrayerCalc.getTimings(lat, lon, greg, method);
      const hijri = this._gregorianToHijri(greg);
      const hijriMonths = this._hijriMonthName(hijri.month);
      const weekdayNames = this._weekdayName(greg.getDay());
      result.push({
        timings,
        date: {
          gregorian: {
            date: `${String(d).padStart(2,'0')}-${String(month).padStart(2,'0')}-${year}`,
            day: String(d),
            month: { number: month, en: gregMonthNames.en, ar: gregMonthNames.ar },
            year: String(year),
            weekday: { en: weekdayNames.en, ar: weekdayNames.ar },
          },
          hijri: {
            day: String(hijri.day),
            month: { number: hijri.month, en: hijriMonths.en, ar: hijriMonths.ar },
            year: String(hijri.year),
          },
        },
      });
    }
    return result;
  },

  // ============ QURAN (Al-Quran Cloud) ============
  // v21: la lista de 114 suras vive local (QuranOfflineService) — instantánea
  // y disponible sin red desde el primer arranque, sin depender de la API.
  async getSurahList() {
    if (typeof QuranOfflineService !== 'undefined') {
      return QuranOfflineService.getSurahList();
    }
    // Respaldo por si el script no cargó (no debería ocurrir)
    const cached = Storage.get('surah_list');
    if (cached) return cached;
    const res = await fetch(`${CONFIG.API.QURAN}/surah`);
    if (!res.ok) throw new Error('Surah list error');
    const json = await res.json();
    const data = json.data || [];
    Storage.set('surah_list', data, CONFIG.CACHE_TTL * 30);
    return data;
  },

  /**
   * Get a surah with arabic + translation + transliteration + audio in parallel.
   * @param {number} surahNumber
   * @param {string} translation - e.g. 'es.cortes', 'es.garcia', 'en.sahih'
   * @param {string} audio - e.g. 'ar.abdurrahmaansudais'
   */
  async getSurahWithTranslation(surahNumber, translation = 'es.cortes', audio = 'ar.mahermuaiqly') {
    if (typeof QuranOfflineService !== 'undefined') {
      const local = await QuranOfflineService.getLocalSurah(surahNumber, translation, audio);
      if (local) return local;
    }

    const cacheKey = `surah_${surahNumber}_${translation}_${audio}_v3`;
    const cached = Storage.get(cacheKey);
    if (cached) {
      // Ya se leyó antes: promover a almacenamiento permanente para el futuro
      if (typeof QuranOfflineService !== 'undefined') {
        QuranOfflineService.saveSurah(surahNumber, translation, audio, cached).catch(() => {});
      }
      return cached;
    }

    const result = await this._fetchSurahFromNetwork(surahNumber, translation, audio);

    Storage.set(cacheKey, result, CONFIG.CACHE_TTL * 7);
    if (typeof QuranOfflineService !== 'undefined') {
      QuranOfflineService.saveSurah(surahNumber, translation, audio, result).catch(() => {});
    }
    return result;
  },

  // v21: extraído de getSurahWithTranslation para que QuranOfflineService
  // pueda reutilizar exactamente la misma llamada de red durante la
  // descarga masiva (mismo shape de datos, una sola fuente de la verdad).
  async _fetchSurahFromNetwork(surahNumber, translation, audio) {
    // Always include transliteration as 4th edition
    const editions = `quran-uthmani,${translation},${audio},en.transliteration`;
    const url = `${CONFIG.API.QURAN}/surah/${surahNumber}/editions/${editions}`;
    const res = await this._fetchWithTimeout(url, 15000);
    if (!res.ok) throw new Error('Surah error');
    const json = await res.json();
    const editionsData = json.data || [];

    if (editionsData.length < 2) throw new Error('Sura no disponible');

    const arabic = editionsData[0];
    const trans = editionsData[1];
    const aud = editionsData[2];
    const translit = editionsData[3];

    const ayahs = arabic.ayahs.map((a, idx) => ({
      number: a.numberInSurah,
      numberGlobal: a.number, // global ayah index 1-6236
      arabic: a.text,
      translation: trans?.ayahs?.[idx]?.text || '',
      transliteration: translit?.ayahs?.[idx]?.text || '',
      audio: aud?.ayahs?.[idx]?.audio || null,
      audioSecondary: aud?.ayahs?.[idx]?.audioSecondary || [],
      juz: a.juz,
      page: a.page,
      sajda: a.sajda,
    }));

    return {
      number: arabic.number,
      name: arabic.name,
      englishName: arabic.englishName,
      englishNameTranslation: arabic.englishNameTranslation,
      revelationType: arabic.revelationType,
      numberOfAyahs: arabic.numberOfAyahs,
      ayahs,
    };
  },

  async getVerseOfTheDay(translation = 'es.cortes') {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const totalAyahs = 6236;
    const ayahNumber = ((dayOfYear * 17) % totalAyahs) + 1;

    const cacheKey = `vod_${ayahNumber}_${translation}`;
    const cached = Storage.get(cacheKey);
    if (cached) return cached;

    try {
      const [arRes, trRes] = await Promise.all([
        fetch(`${CONFIG.API.QURAN}/ayah/${ayahNumber}/quran-uthmani`),
        fetch(`${CONFIG.API.QURAN}/ayah/${ayahNumber}/${translation}`),
      ]);
      const arJ = await arRes.json();
      const trJ = await trRes.json();
      const result = {
        arabic: arJ.data?.text,
        translation: trJ.data?.text,
        surah: arJ.data?.surah?.englishName,
        surahNumber: arJ.data?.surah?.number,
        ayahNumber: arJ.data?.numberInSurah,
      };
      Storage.set(cacheKey, result, CONFIG.CACHE_TTL);
      return result;
    } catch (e) {
      return {
        arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
        translation: 'Ciertamente, con la dificultad viene la facilidad.',
        surah: 'Ash-Sharh',
        surahNumber: 94,
        ayahNumber: 6,
      };
    }
  },

  // ============ DUAS (UmmahAPI) ============
  /**
   * Get all dua categories.
   * Returns: [{ id, name, description, count }, ...]
   */
  async getDuaCategories() {
    // 📚 Prefer local vetted dataset (Hisnul Muslim references)
    if (CONFIG.USE_LOCAL_DUAS && typeof LocalDuasService !== 'undefined') {
      const res = await LocalDuasService.getCategories();
      return res.data || [];
    }

    const cacheKey = 'dua_cats_v1';
    const cached = Storage.get(cacheKey);
    if (cached) return cached;
    try {
      // ☁️ Prefer proxy backend if configured
      const url = CONFIG.API.PROXY
        ? `${CONFIG.API.PROXY}/duas/categories`
        : `${CONFIG.API.UMMAH}/duas/categories`;
      const res = await fetch(url);
      const json = await res.json();
      const cats = json?.data?.categories || json?.data || [];
      Storage.set(cacheKey, cats, 7 * 24 * 60 * 60 * 1000); // 7 days
      return cats;
    } catch (e) {
      console.warn('getDuaCategories failed:', e);
      return [];
    }
  },

  /**
   * Get duas for a given category.
   * Returns: [{ id, title, arabic, transliteration, translation, source, repeat }, ...]
   */
  async getDuasByCategory(categoryId) {
    // 📚 Prefer local vetted dataset
    if (CONFIG.USE_LOCAL_DUAS && typeof LocalDuasService !== 'undefined') {
      const lang = AppState.settings.locale || 'es';
      const res = await LocalDuasService.getCategory(categoryId, lang);
      return res.data || [];
    }

    const cacheKey = `dua_cat_${categoryId}_v1`;
    const cached = Storage.get(cacheKey);
    if (cached) return cached;
    try {
      const url = CONFIG.API.PROXY
        ? `${CONFIG.API.PROXY}/duas/category/${encodeURIComponent(categoryId)}`
        : `${CONFIG.API.UMMAH}/duas/category/${encodeURIComponent(categoryId)}`;
      const res = await fetch(url);
      const json = await res.json();
      const duas = json?.data?.duas || json?.data || [];
      Storage.set(cacheKey, duas, 7 * 24 * 60 * 60 * 1000);
      return duas;
    } catch (e) {
      console.warn('getDuasByCategory failed:', e);
      return [];
    }
  },

  /**
   * Get a single random dua.
   */
  async getRandomDua() {
    try {
      const res = await fetch(`${CONFIG.API.UMMAH}/duas/random`);
      const json = await res.json();
      return json?.data || null;
    } catch (e) {
      return null;
    }
  },

  /**
   * Search duas by keyword.
   */
  async searchDuas(query) {
    if (!query || query.length < 2) return [];
    try {
      const res = await fetch(`${CONFIG.API.UMMAH}/duas/search?q=${encodeURIComponent(query)}`);
      const json = await res.json();
      return json?.data?.duas || [];
    } catch (e) {
      return [];
    }
  },
};

// ============ LOCATION ============
const LocationService = {
  // Default fallback: Mosque Abdullah, Havana, Cuba
  DEFAULT_LOCATION: {
    latitude: 23.1136,
    longitude: -82.3666,
    city: 'La Habana',
    country: 'Cuba',
    isDefault: true,
  },

  // Check current permission state (works on modern browsers)
  async checkPermission() {
    if (!navigator.permissions) return 'unknown';
    try {
      const res = await navigator.permissions.query({ name: 'geolocation' });
      return res.state; // 'granted' | 'prompt' | 'denied'
    } catch (e) {
      return 'unknown';
    }
  },

  // Reverse geocode via Nominatim with graceful failure
  async reverseGeocode(lat, lon) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
        { headers: { 'Accept-Language': currentLocale || 'es' } }
      );
      const data = await res.json();
      return {
        city: data.address?.city || data.address?.town || data.address?.village || data.address?.county || '',
        country: data.address?.country || '',
      };
    } catch (e) {
      return { city: '', country: '' };
    }
  },

  // Main entry — with cascading fallbacks
  async getCurrent(options = {}) {
    const { forceRefresh = false, silent = false } = options;

    // 1) Use cached if available and not forcing refresh
    if (!forceRefresh) {
      const cached = Storage.get('last_location');
      if (cached) return cached;
    }

    // 2) Try browser geolocation
    if (!navigator.geolocation) {
      if (!silent) showToast((t('geoNotSupported') || 'Geolocalización no soportada. Usando ubicación por defecto.'), 3000);
      return this.useDefault();
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };
          const geo = await this.reverseGeocode(coords.latitude, coords.longitude);
          Object.assign(coords, geo);
          Storage.set('last_location', coords, CONFIG.CACHE_TTL * 7);
          resolve(coords);
        },
        (err) => {
          // Cascading fallback: cached -> default
          const cached = Storage.get('last_location');
          if (cached) return resolve(cached);

          if (!silent) {
            const msg = err.code === 1
              ? (t('geoPermDenied') || '<i class="fas fa-triangle-exclamation"></i> Permiso denegado. Usando La Habana por defecto. Puedes cambiarla en el perfil.')
              : err.code === 2
              ? (t('geoUnavailable') || '<i class="fas fa-triangle-exclamation"></i> Posición no disponible. Usando ubicación por defecto.')
              : (t('geoTimeout') || '<i class="fas fa-triangle-exclamation"></i> Tiempo agotado. Usando ubicación por defecto.');
            showToast(msg, 4000);
          }
          resolve(this.useDefault());
        },
        { enableHighAccuracy: false, timeout: 12000, maximumAge: 600000 }
      );
    });
  },

  // Explicitly request permission (with clear UX)
  async requestPermission() {
    if (!navigator.geolocation) {
      showToast((t('geoNotSupported') || 'No soportado'), 3000);
      return null;
    }
    // Trigger the browser prompt
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };
          const geo = await this.reverseGeocode(coords.latitude, coords.longitude);
          Object.assign(coords, geo);
          Storage.set('last_location', coords, CONFIG.CACHE_TTL * 7);
          showToast((t('geoGranted') || 'Ubicación activada: '+ (coords.city || '')), 2500);
          resolve(coords);
        },
        (err) => {
          const msg = err.code === 1
            ? (t('geoPermDeniedHelp') || '<i class="fas fa-circle-xmark"></i> Permiso denegado. Abre la configuración del navegador para habilitarlo.')
            : (t('geoError') || '<i class="fas fa-circle-xmark"></i> Error al obtener ubicación.');
          showToast(msg, 5000);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    });
  },

  // Set a manual location (from profile settings)
  setManual(lat, lon, city, country) {
    const coords = {
      latitude: lat,
      longitude: lon,
      city: city || '',
      country: country || '',
      manual: true,
    };
    Storage.set('last_location', coords, CONFIG.CACHE_TTL * 30);
    AppState.location = coords;
    return coords;
  },

  useDefault() {
    Storage.set('last_location', this.DEFAULT_LOCATION, CONFIG.CACHE_TTL * 7);
    return { ...this.DEFAULT_LOCATION };
  },

  getCached() {
    return Storage.get('last_location');
  },
};

// ============ Helpers de fecha y oración ============
// ⏰ v20: Iqamah (tiempo de espera hasta la congregación) en minutos por oración
// Fajr +20 · Dhuhr +15 · Asr +15 · Maghrib +5 · Isha +15
const IQAMAH_OFFSETS = { Fajr: 20, Dhuhr: 15, Asr: 15, Maghrib: 5, Isha: 15 };

function addMinutesToTime(time24, minutes) {
  if (!time24 || !time24.includes(':')) return '--:--';
  let [h, m] = time24.split(':').map(Number);
  if (isNaN(h) || isNaN(m)) return '--:--';
  const total = (h * 60 + m + minutes) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

function getIqamahTime(prayerName, adhanTime24) {
  const off = IQAMAH_OFFSETS[prayerName];
  if (off === undefined) return null;
  return addMinutesToTime(adhanTime24, off);
}

function getDailyPrayers(timings) {
  if (!timings) return [];
  const names = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  return names.map(n => {
    const time = (timings[n] || '--:--').split(' ')[0];
    return {
      name: n,
      time,
      iqamah: getIqamahTime(n, time),
      iqamahOffset: IQAMAH_OFFSETS[n] || null,
    };
  });
}

function getNextPrayer(timings) {
  if (!timings) return null;
  const order = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const now = new Date();
  for (const name of order) {
    const ts = (timings[name] || '').split(' ')[0];
    if (!ts) continue;
    const [h, m] = ts.split(':').map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    if (d > now) {
      const diffMs = d - now;
      return { name, time: ts, diffMs, date: d };
    }
  }
  const ts = (timings.Fajr || '05:00').split(' ')[0];
  const [h, m] = ts.split(':').map(Number);
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(h, m, 0, 0);
  return { name: 'Fajr', time: ts, diffMs: d - now, date: d, nextDay: true };
}

function formatCountdown(ms) {
  if (ms <= 0) return '00:00:00';
  const s = Math.floor(ms / 1000);
  const h = String(Math.floor(s / 3600)).padStart(2, '0');
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const sec = String(s % 60).padStart(2, '0');
  return `${h}:${m}:${sec}`;
}

function formatTime12h(time24) {
  if (!time24 || !time24.includes(':')) return '--:--';
  let [h, m] = time24.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, '0')} ${ampm}`;
}

function getGreetingByHour() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return t('greetingMorning');
  if (h >= 12 && h < 18) return t('greetingAfternoon');
  if (h >= 18 && h < 22) return t('greetingEvening');
  return t('greetingNight');
}

if (typeof window !== 'undefined') {
  window.IQAMAH_OFFSETS = IQAMAH_OFFSETS;
  window.getIqamahTime = getIqamahTime;
  window.addMinutesToTime = addMinutesToTime;
}

function getPrayerEmoji(name) {
  const map = {
    Fajr: '<i class="fas fa-cloud-sun"></i>',
    Sunrise: '<i class="fas fa-sun"></i>',
    Dhuhr: '<i class="fas fa-sun"></i>',
    Asr: '<i class="fas fa-cloud-sun"></i>',
    Maghrib: '<i class="fas fa-mountain-sun"></i>',
    Isha: '<i class="fas fa-moon"></i>',
  };
  return map[name] || '<i class="fas fa-mosque"></i>';
}
