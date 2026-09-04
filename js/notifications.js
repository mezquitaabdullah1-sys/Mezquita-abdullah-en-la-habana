// 🔔 Servicio de notificaciones de oración
// - Solicita permiso
// - Programa alarmas para las 5 oraciones del día (adhan automático a su hora)
// - v24: recordatorio opcional 15 minutos ANTES de cada oración
//        («اقتربت صلاة الظهر» / «Se acerca la oración de Duhr») con su propio
//        interruptor de activación, independiente del adhan
// - v24: refresco automático a medianoche (recalcula los horarios del nuevo
//        día para que el adhan siga sonando sin abrir la app)
const PrayerNotifications = {
  timers: [],
  enabledKey: 'prayer_notif_enabled',
  reminderKey: 'prayer_reminder_enabled',
  REMINDER_MINUTES: 15, // recordatorio 15 min antes del adhan

  isEnabled() {
    return Storage.get(this.enabledKey) === true && Notification.permission === 'granted';
  },

  isReminderEnabled() {
    return Storage.get(this.reminderKey) === true && Notification.permission === 'granted';
  },

  async requestPermission() {
    if (!('Notification' in window)) {
      showToast(t('notifNotSupported') || 'Notificaciones no soportadas');
      return false;
    }
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') {
      showToast(t('notifDenied') || 'Permiso denegado. Actívalo en ajustes del navegador.');
      return false;
    }
    const result = await Notification.requestPermission();
    return result === 'granted';
  },

  async enable() {
    const ok = await this.requestPermission();
    if (!ok) return false;
    Storage.set(this.enabledKey, true);
    showToast(t('notifEnabled') || '✅ Notificaciones activadas');
    return true;
  },

  disable() {
    Storage.set(this.enabledKey, false);
    this.clearAll();
    // v24: si el recordatorio sigue activo, reprogramarlo solo a él
    if (this.isReminderEnabled() && typeof AppState !== 'undefined' && AppState.timings) {
      this.scheduleDay(AppState.timings, AppState.settings.locale || 'es');
    }
    showToast(t('notifDisabled') || 'Notificaciones desactivadas');
  },

  // ============ v24: RECORDATORIO 15 MIN ANTES ============
  async enableReminder() {
    const ok = await this.requestPermission();
    if (!ok) return false;
    Storage.set(this.reminderKey, true);
    showToast(t('reminderEnabled') || '✅ Recordatorios activados');
    return true;
  },

  disableReminder() {
    Storage.set(this.reminderKey, false);
    this.clearAll();
    // Reprogramar lo que siga activo (adhan a la hora de la oración)
    if (this.isEnabled() && typeof AppState !== 'undefined' && AppState.timings) {
      this.scheduleDay(AppState.timings, AppState.settings.locale || 'es');
    }
    showToast(t('reminderDisabled') || 'Recordatorios desactivados');
  },

  clearAll() {
    this.timers.forEach(id => clearTimeout(id));
    this.timers = [];
  },

  /**
   * Programa las alarmas del día:
   *  - A la hora exacta de cada oración → notificación + ADHAN automático
   *    (si las notificaciones están activadas)
   *  - 15 minutos antes de cada oración → notificación de aviso
   *    («اقتربت صلاة الظهر») si el recordatorio está activado
   * @param {Object} timings - { Fajr, Dhuhr, Asr, Maghrib, Isha } como "HH:MM"
   * @param {string} locale - idioma actual de la app
   */
  scheduleDay(timings, locale = 'es') {
    if (!timings) return;
    this.clearAll();

    const wantAdhan = this.isEnabled();
    const wantReminder = this.isReminderEnabled();
    if (!wantAdhan && !wantReminder) return;

    const prayerNames = {
      es: { Fajr: 'Fajr', Dhuhr: 'Duhr', Asr: 'Asr', Maghrib: 'Maghrib', Isha: 'Isha' },
      en: { Fajr: 'Fajr', Dhuhr: 'Dhuhr', Asr: 'Asr', Maghrib: 'Maghrib', Isha: 'Isha' },
      ar: { Fajr: 'الفجر', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء' },
    }[locale] || {};

    const timeMessages = {
      es: 'Es hora de la oración de',
      en: 'It is time for',
      ar: 'حان وقت صلاة',
    };
    const reminderMessages = {
      es: 'Se acerca la oración de',
      en: 'Prayer is approaching:',
      ar: 'اقتربت صلاة',
    };
    const body = timeMessages[locale] || timeMessages.es;
    const reminderBody = reminderMessages[locale] || reminderMessages.es;

    const DAY_MS = 24 * 60 * 60 * 1000;

    ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].forEach(prayer => {
      const timeStr = timings[prayer];
      if (!timeStr) return;
      const clean = timeStr.split(' ')[0]; // "05:30 (+03)" → "05:30"
      const [h, m] = clean.split(':').map(Number);
      if (isNaN(h) || isNaN(m)) return;

      const prayerName = prayerNames[prayer] || prayer;

      // 1) Adhan automático a la hora exacta de la oración
      const target = new Date();
      target.setHours(h, m, 0, 0);
      const delay = target.getTime() - Date.now();
      if (wantAdhan && delay >= 0 && delay <= DAY_MS) {
        const timerId = setTimeout(() => {
          this.notify(prayerName, `${body} ${prayerName}`, prayer);
        }, delay);
        this.timers.push(timerId);
      }

      // 2) v24: recordatorio 15 minutos ANTES (sin sonido de adhan)
      const reminderTarget = new Date(target.getTime() - this.REMINDER_MINUTES * 60 * 1000);
      const reminderDelay = reminderTarget.getTime() - Date.now();
      if (wantReminder && reminderDelay >= 0 && reminderDelay <= DAY_MS) {
        const reminderId = setTimeout(() => {
          this.notifyReminder(prayerName, `${reminderBody} ${prayerName}`, prayer + '-reminder');
        }, reminderDelay);
        this.timers.push(reminderId);
      }
    });

    // v24: refresco automático pasada la medianoche (horarios del nuevo día)
    this._scheduleMidnightRefresh(locale);

    console.log(`🔔 ${this.timers.length} alarmas programadas (adhan=${wantAdhan}, recordatorio=${wantReminder})`);
  },

  /**
   * v24: reprograma automáticamente al llegar la medianoche para que el
   * adhan y los recordatorios sigan funcionando día tras día sin que el
   // usuario tenga que abrir la pestaña de oración.
   */
  _scheduleMidnightRefresh(locale) {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 30, 0); // 00:00:30 del día siguiente
    const delay = midnight.getTime() - now.getTime();
    if (delay > 0) {
      this.timers.push(setTimeout(() => this._refreshForNewDay(locale), delay));
    }
  },

  async _refreshForNewDay(locale) {
    try {
      if (typeof AppState === 'undefined') return;
      const loc = AppState.location ||
        (typeof LocationService !== 'undefined' && LocationService.getCached && LocationService.getCached());
      if (!loc) return;

      let timings = null;
      // 1) Intentar la API (más precisa)
      if (typeof API !== 'undefined' && API.getPrayerTimes) {
        try {
          const r = await API.getPrayerTimes(loc.latitude, loc.longitude, new Date(), AppState.settings.calculationMethod);
          timings = r && r.timings;
        } catch (e) { /* sin red → offline */ }
      }
      // 2) Respaldo offline con el motor de cálculo local
      if (!timings && typeof PrayerCalc !== 'undefined') {
        timings = PrayerCalc.getTimings(loc.latitude, loc.longitude, new Date(), AppState.settings.calculationMethod || 3);
      }
      if (timings) {
        AppState.timings = timings;
        this.scheduleDay(timings, AppState.settings.locale || locale);
        console.log('🔔 Horarios reprogramados para el nuevo día');
      }
    } catch (e) {
      console.warn('No se pudieron reprogramar las alarmas:', e);
    }
  },

  async notify(title, body, tag) {
    // Vibrate
    if ('vibrate' in navigator) navigator.vibrate([300, 100, 300, 100, 500]);

    // Play adhan via AdhanService if available (respeta modo full/takbeer y mute)
    if (typeof AdhanService !== 'undefined' && AdhanService.playFullAdhan) {
      try { AdhanService.playFullAdhan(); } catch(e) { console.warn('Adhan play failed:', e); }
    }

    // Show notification directly (v22: sin service worker)
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🕌 ' + title, { body, icon: 'assets/icon.png' });
    }

    // Aviso visual dentro de la app por si está abierta en primer plano
    if (typeof showToast === 'function') showToast('🕌 ' + body, 5000);
  },

  /**
   * v24: notificación de recordatorio (15 min antes). SIN adhan:
   * solo vibración corta + notificación + toast.
   */
  notifyReminder(title, body, tag) {
    if ('vibrate' in navigator) navigator.vibrate([200, 100, 200]);

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('⏰ ' + title, { body, icon: 'assets/icon.png' });
    }

    if (typeof showToast === 'function') showToast('⏰ ' + body, 5000);
  },
};

if (typeof window !== 'undefined') {
  window.PrayerNotifications = PrayerNotifications;
}
