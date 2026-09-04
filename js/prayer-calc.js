// 🕌 PrayerCalc — Cálculo astronómico de horarios de oración 100% offline
//
// Se usa SOLO como respaldo cuando no hay red y no hay nada en caché: la API
// de Aladhan sigue siendo la fuente preferida (más precisa, ajustada por
// autoridades locales). Este motor implementa el método astronómico estándar
// (posición solar de baja precisión + ángulo horario), el mismo tipo de
// cálculo público que usan la mayoría de apps/calculadoras de oración.
// Precisión típica: ±1-2 minutos frente a la API oficial.
//
// Simplificación asumida: se usa el huso horario LOCAL del dispositivo. Es
// correcto en el caso de uso real (sin conexión + ubicación propia = mismo
// huso horario del dispositivo).
const PrayerCalc = {
  // Ángulos (grados) de Fajr/Isha y modo de Isha por método de cálculo.
  // Claves = mismos IDs que CONFIG.CALCULATION_METHODS
  METHOD_PARAMS: {
    2:  { fajr: 15,   isha: 15,   ishaMinutes: null }, // ISNA
    3:  { fajr: 18,   isha: 17,   ishaMinutes: null }, // Liga Mundial Musulmana
    4:  { fajr: 18.5, isha: null, ishaMinutes: 90 },   // Umm Al-Qura (Makkah)
    5:  { fajr: 19.5, isha: 17.5, ishaMinutes: null }, // Egipto
    8:  { fajr: 19.5, isha: null, ishaMinutes: 90 },   // Gulf Region
    12: { fajr: 12,   isha: 12,   ishaMinutes: null }, // UOIF (Europa)
    13: { fajr: 18,   isha: 17,   ishaMinutes: null }, // Diyanet (Turquía)
    14: { fajr: 18,   isha: 17,   ishaMinutes: null }, // Aprox. (sin espec. pública offline)
  },
  ASR_SHADOW_FACTOR: 1, // Shafi'i/estándar (igual que el default de Aladhan)

  _dtr(d) { return (d * Math.PI) / 180; },
  _rtd(r) { return (r * 180) / Math.PI; },
  _fixAngle(a) { a = a % 360; return a < 0 ? a + 360 : a; },
  _fixHour(h) { h = h % 24; return h < 0 ? h + 24 : h; },

  _sin(d) { return Math.sin(this._dtr(d)); },
  _cos(d) { return Math.cos(this._dtr(d)); },
  _tan(d) { return Math.tan(this._dtr(d)); },
  _arcsin(x) { return this._rtd(Math.asin(x)); },
  _arccos(x) { return this._rtd(Math.acos(Math.max(-1, Math.min(1, x)))); },
  _arccot(x) { return this._rtd(Math.atan2(1, x)); },

  // Día juliano a las 0h UT
  _julian(year, month, day) {
    if (month <= 2) { year -= 1; month += 12; }
    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
  },

  // Posición solar de baja precisión (declinación + ecuación del tiempo)
  // Referencia: fórmulas solares estándar (Meeus, low-precision sun),
  // usadas ampliamente en calculadoras públicas de horarios de oración.
  _sunPosition(jd) {
    const D = jd - 2451545.0;
    const g = this._fixAngle(357.529 + 0.98560028 * D);
    const q = this._fixAngle(280.459 + 0.98564736 * D);
    const L = this._fixAngle(q + 1.915 * this._sin(g) + 0.020 * this._sin(2 * g));
    const e = 23.439 - 0.00000036 * D;

    const RA = this._rtd(Math.atan2(this._cos(e) * this._sin(L), this._cos(L))) / 15;
    const eqt = q / 15 - this._fixHour(RA);
    const decl = this._arcsin(this._sin(e) * this._sin(L));
    return { declination: decl, equation: eqt };
  },

  // Ángulo horario para un ángulo solar dado (grados bajo el horizonte)
  _hourAngle(angle, lat, decl) {
    const val = (-this._sin(angle) - this._sin(lat) * this._sin(decl)) / (this._cos(lat) * this._cos(decl));
    return this._arccos(val) / 15;
  },

  // Ángulo horario para Asr (usa el factor de sombra en vez de un ángulo fijo).
  // A diferencia de Fajr/Isha, aquí el ángulo es una ALTITUD positiva sobre el
  // horizonte, así que el seno entra sin negar (a diferencia de _hourAngle).
  _asrHourAngle(factor, lat, decl) {
    const altitude = this._arccot(factor + this._tan(Math.abs(lat - decl)));
    const val = (this._sin(altitude) - this._sin(lat) * this._sin(decl)) / (this._cos(lat) * this._cos(decl));
    return this._arccos(val) / 15;
  },

  _timeToStr(hours) {
    if (!isFinite(hours)) return '--:--';
    hours = this._fixHour(hours + 0.5 / 60); // redondeo al minuto
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  },

  /**
   * v26: Desplazamiento manual de horario (verano/invierno).
   * Lee `AppState.settings.timeShift`:
   *   'auto' (defecto) → 0, el sistema ya aplica el horario de verano (DST)
   *   'summer' → +1 hora   ·   'winter' → -1 hora
   * Devuelve el desplazamiento en HORAS (-1, 0, +1).
   */
  _manualShiftHours() {
    try {
      if (typeof AppState === 'undefined') return 0;
      const mode = (AppState.settings && AppState.settings.timeShift) || 'auto';
      if (mode === 'summer') return 1;
      if (mode === 'winter') return -1;
    } catch (e) { /* nunca romper el cálculo por un ajuste */ }
    return 0;
  },

  /**
   * Desplaza "HH:MM" (acepta también "HH:MM (CET)") en `deltaHours` horas.
   * No muta el objeto original.
   */
  shiftTimings(timings, deltaHours) {
    if (!timings || !deltaHours) return timings;
    const out = {};
    for (const key of Object.keys(timings)) {
      const v = timings[key];
      if (typeof v !== 'string' || !v.includes(':')) { out[key] = v; continue; }
      const suffix = v.includes(' ') ? v.slice(v.indexOf(' ')) : '';
      const [hh, mm] = v.split(' ')[0].split(':').map(Number);
      if (isNaN(hh) || isNaN(mm)) { out[key] = v; continue; }
      const total = ((hh * 60 + mm + deltaHours * 60) % 1440 + 1440) % 1440;
      out[key] = `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}${suffix}`;
    }
    if (timings._estimated) out._estimated = true;
    if (timings._timeShifted) out._timeShifted = true;
    return out;
  },

  /**
   * Calcula los horarios de oración para una fecha/ubicación/método dados.
   * @returns {{Fajr,Sunrise,Dhuhr,Asr,Maghrib,Isha}} en formato "HH:MM" (hora local del dispositivo)
   */
  getTimings(lat, lon, date = new Date(), methodId = 3) {
    const params = this.METHOD_PARAMS[methodId] || this.METHOD_PARAMS[3];
    const jd = this._julian(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const timezone = -date.getTimezoneOffset() / 60; // huso horario local en horas

    const { declination: decl, equation: eqt } = this._sunPosition(jd - lon / (15 * 24));

    // v26: en modo 'auto' el huso del dispositivo ya incluye el horario de
    // verano (DST); 'summer'/'winter' fuerzan ±1h a petición del usuario.
    const shift = this._manualShiftHours();
    const dhuhr = this._fixHour(12 - lon / 15 - eqt + timezone + shift);
    const sunriseHA = this._hourAngle(0.833, lat, decl);
    const maghribHA = sunriseHA; // mismo ángulo, lado opuesto
    const fajrHA = this._hourAngle(params.fajr, lat, decl);
    const asrHA = this._asrHourAngle(this.ASR_SHADOW_FACTOR, lat, decl);

    const fajr = dhuhr - fajrHA;
    const sunrise = dhuhr - sunriseHA;
    const asr = dhuhr + asrHA;
    const maghrib = dhuhr + maghribHA;
    let isha;
    if (params.ishaMinutes) {
      isha = maghrib + params.ishaMinutes / 60;
    } else {
      const ishaHA = this._hourAngle(params.isha, lat, decl);
      isha = dhuhr + ishaHA;
    }

    return {
      Fajr: this._timeToStr(fajr),
      Sunrise: this._timeToStr(sunrise),
      Dhuhr: this._timeToStr(dhuhr),
      Asr: this._timeToStr(asr),
      Maghrib: this._timeToStr(maghrib),
      Isha: this._timeToStr(isha),
    };
  },
};

if (typeof window !== 'undefined') {
  window.PrayerCalc = PrayerCalc;
}
