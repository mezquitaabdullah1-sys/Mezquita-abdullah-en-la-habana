// ✅ PrayerTracker — Check-in diario de oraciones
// Guarda qué oraciones ya se hicieron hoy (Fajr, Dhuhr, Asr, Maghrib, Isha).
// El estado vive en localStorage con la FECHA del día: al cambiar de día las
// casillas quedan automáticamente vacías (no hay que borrar nada a mano).
const PrayerTracker = {
  STORE_KEY: 'prayer_checkin',
  PRAYERS: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'], // Sunrise no es oración obligatoria

  _todayKey(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`; // clave local del día: "2026-09-02"
  },

  _readAll() {
    return Storage.get(this.STORE_KEY) || {};
  },

  _writeAll(all) {
    Storage.set(this.STORE_KEY, all); // sin TTL: la fecha dentro hace el reset
  },

  // Estado de hoy: { Fajr: true, Dhuhr: false, ... } (solo claves de hoy)
  _today() {
    const all = this._readAll();
    const key = this._todayKey();
    return all[key] || {};
  },

  isDone(name, date = new Date()) {
    if (!this.PRAYERS.includes(name)) return false;
    const all = this._readAll();
    return !!(all[this._todayKey(date)] || {})[name];
  },

  // Devuelve el nuevo estado (true = marcado, false = desmarcado)
  toggle(name) {
    if (!this.PRAYERS.includes(name)) return false;
    const all = this._readAll();
    const key = this._todayKey();
    const today = all[key] || {};
    today[name] = !today[name];
    all[key] = today;
    this._writeAll(all);
    return today[name];
  },

  doneCount() {
    const today = this._today();
    return this.PRAYERS.filter(p => today[p]).length;
  },

  totalCount() {
    return this.PRAYERS.length;
  },
};

if (typeof window !== 'undefined') {
  window.PrayerTracker = PrayerTracker;
}
