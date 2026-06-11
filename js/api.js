// 🌐 Cliente API — Aladhan + Al-Quran Cloud (v3: con transliteration y navegación)

const API = {
  // ============ PRAYER TIMES (Aladhan) ============
  async getPrayerTimes(lat, lng, date = new Date(), method = 3) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    const cacheKey = `prayer_${lat.toFixed(2)}_${lng.toFixed(2)}_${dd}-${mm}-${yyyy}_${method}`;
    const cached = Storage.get(cacheKey);
    if (cached) return cached;

    const url = `${CONFIG.API.ALADHAN}/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lng}&method=${method}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Prayer API error');
    const json = await res.json();
    if (json.code !== 200) throw new Error('Prayer API error');

    Storage.set(cacheKey, json.data, CONFIG.CACHE_TTL);
    return json.data;
  },

  // ============ HIJRI CALENDAR ============
  async gregorianToHijri(date = new Date()) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    const cacheKey = `hijri_${dd}-${mm}-${yyyy}`;
    const cached = Storage.get(cacheKey);
    if (cached) return cached;

    const url = `${CONFIG.API.ALADHAN}/gToH/${dd}-${mm}-${yyyy}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Hijri API error');
    const json = await res.json();
    const hijri = json.data?.hijri;
    if (hijri) Storage.set(cacheKey, hijri, CONFIG.CACHE_TTL * 7);
    return hijri;
  },

  async getHijriCalendarMonth(month, year) {
    const cacheKey = `hijri_cal_${month}_${year}`;
    const cached = Storage.get(cacheKey);
    if (cached) return cached;

    const url = `${CONFIG.API.ALADHAN}/gToHCalendar/${month}/${year}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Hijri calendar error');
    const json = await res.json();
    const data = json.data || [];
    Storage.set(cacheKey, data, CONFIG.CACHE_TTL * 7);
    return data;
  },

  // ============ QURAN (Al-Quran Cloud) ============
  async getSurahList() {
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
   * @param {string} audio - e.g. 'ar.alafasy'
   */
  async getSurahWithTranslation(surahNumber, translation = 'es.cortes', audio = 'ar.alafasy') {
    const cacheKey = `surah_${surahNumber}_${translation}_${audio}_v3`;
    const cached = Storage.get(cacheKey);
    if (cached) return cached;

    // Always include transliteration as 4th edition
    const editions = `quran-uthmani,${translation},${audio},en.transliteration`;
    const url = `${CONFIG.API.QURAN}/surah/${surahNumber}/editions/${editions}`;
    const res = await fetch(url);
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

    const result = {
      number: arabic.number,
      name: arabic.name,
      englishName: arabic.englishName,
      englishNameTranslation: arabic.englishNameTranslation,
      revelationType: arabic.revelationType,
      numberOfAyahs: arabic.numberOfAyahs,
      ayahs,
    };

    Storage.set(cacheKey, result, CONFIG.CACHE_TTL * 7);
    return result;
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
};

// ============ LOCATION ============
const LocationService = {
  async getCurrent() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const cached = Storage.get('last_location');
        if (cached) return resolve(cached);
        return reject(new Error('Geolocation no soportado'));
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}&zoom=10&addressdetails=1`,
              { headers: { 'Accept-Language': currentLocale || 'es' } }
            );
            const data = await res.json();
            coords.city = data.address?.city || data.address?.town || data.address?.village || data.address?.county;
            coords.country = data.address?.country;
          } catch (e) {}

          Storage.set('last_location', coords, CONFIG.CACHE_TTL * 7);
          resolve(coords);
        },
        (err) => {
          const cached = Storage.get('last_location');
          if (cached) return resolve(cached);
          reject(err);
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 600000 }
      );
    });
  },

  getCached() {
    return Storage.get('last_location');
  },
};

// ============ Helpers de fecha y oración ============
function getDailyPrayers(timings) {
  if (!timings) return [];
  const names = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  return names.map(n => ({
    name: n,
    time: (timings[n] || '--:--').split(' ')[0],
  }));
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

function getPrayerEmoji(name) {
  const map = {
    Fajr: '🌅',
    Sunrise: '☀️',
    Dhuhr: '🌞',
    Asr: '🌤️',
    Maghrib: '🌇',
    Isha: '🌙',
  };
  return map[name] || '🕌';
}
