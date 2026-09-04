// 👤 Pantalla de Perfil / Ajustes
const ProfilePage = {
  async render(container) {
    const methodName = CONFIG.CALCULATION_METHODS[AppState.settings.calculationMethod] || '—';

    const langLabel = { es: '🇪🇸 Español', ar: '🇸🇦 العربية', en: '🇬🇧 English' }[AppState.settings.locale];
    const themeLabel = {
      light: '<i class="fas fa-sun"></i> ' + t('themeLight'),
      dark: '<i class="fas fa-moon"></i> ' + t('themeDark'),
      auto: '<i class="fas fa-arrows-rotate"></i> ' + t('themeAuto'),
    }[AppState.settings.theme];

    // Adhan settings (with defaults)
    if (!AppState.settings.adhan) {
      AppState.settings.adhan = {
        voice1: 'makkah',       // 1er takbeer
        voice2: 'madinah',      // 2do takbeer
        volume: 0.8,
        muted: false,
        mode: 'full',           // v24: 'full' | 'takbeer'
        takbeerDuration: 12,    // v24: segundos (2 primeras takbeer)
      };
    } else {
      // v24: fusionar los defaults nuevos en ajustes guardados antes de la v24
      if (!AppState.settings.adhan.mode) AppState.settings.adhan.mode = 'full';
      if (!AppState.settings.adhan.takbeerDuration) AppState.settings.adhan.takbeerDuration = 12;
    }
    const adhanVoice1 = AdhanService.VOICES.find(v => v.id === AppState.settings.adhan.voice1) || AdhanService.VOICES[0];
    const adhanVoice2 = AdhanService.VOICES.find(v => v.id === AppState.settings.adhan.voice2) || AdhanService.VOICES[1];
    const loc = AppState.location || LocationService.getCached();

    container.innerHTML = `
      <div class="profile-header">
        <div class="profile-avatar">
          <picture>
            <source srcset="assets/mascot/avatar.webp" type="image/webp">
            <img src="assets/mascot/avatar.png" alt="Quba" style="width:90px;height:90px;border-radius:50%;">
          </picture>
        </div>
        <div class="profile-name">${escapeHtml(AppState.settings.userName || t('welcome'))}</div>
        <div class="profile-subtitle">${t('tagline')}</div>

        <!-- Redes sociales: Mezquita Abdullah -->
        <div class="social-links">
          <a class="social-link social-whatsapp" href="https://whatsapp.com/channel/0029Vb7hD1KKmCPJx0NlLU06" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp — Mezquita Abdullah" title="WhatsApp">
            <i class="fab fa-whatsapp"></i>
          </a>
          <a class="social-link social-instagram" href="https://www.instagram.com/mezquita__abdullah?igsi=MXZjZ2V0anEzZWllag==" target="_blank" rel="noopener noreferrer" aria-label="Instagram — Mezquita Abdullah" title="Instagram">
            <i class="fab fa-instagram"></i>
          </a>
          <a class="social-link social-facebook" href="https://www.facebook.com/share/1CB7kJePhg/" target="_blank" rel="noopener noreferrer" aria-label="Facebook — Mezquita Abdullah" title="Facebook">
            <i class="fab fa-facebook-f"></i>
          </a>
        </div>
      </div>

      <div style="padding: 0 var(--sp-md);">
        <!-- v15: Nombre del usuario (para certificados) -->
        <div class="section-label"><i class="fas fa-user"></i> ${t('yourName') || 'Tu nombre'}</div>
        <div class="card" style="padding:0;overflow:hidden;">
          <div class="list-row" onclick="ProfilePage.editUserName()">
            <div class="list-row-icon"><i class="fas fa-user-edit"></i></div>
            <div class="list-row-info">
              <div class="list-row-label">${t('displayName') || 'Nombre para mostrar'}</div>
              <div class="list-row-value">${AppState.settings.userName ? escapeHtml(AppState.settings.userName) : (t('nameHint') || 'Aparecerá en tus certificados')}</div>
            </div>
            <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
          </div>
        </div>

        <!-- Location -->
        <div class="section-label"><i class="fas fa-location-dot"></i> ${t('location') || 'Ubicación'}</div>
        <div class="card" style="padding:0;overflow:hidden;">
          <div class="list-row" onclick="ProfilePage.requestLocation()">
            <div class="list-row-icon"><i class="fas fa-map-marker-alt"></i></div>
            <div class="list-row-info">
              <div class="list-row-label">${loc ? (loc.city || t('unknownCity') || 'Desconocido') : t('noLocation') || 'Sin ubicación'}</div>
              <div class="list-row-value">${loc ? ((loc.country || '') + (loc.isDefault ? ' · ' + (t('defaultLocation') || 'por defecto') : '') + (loc.manual ? ' · ' + (t('manual') || 'manual') : '')) : ''}</div>
            </div>
            <i class="fas fa-sync-alt list-row-chevron"></i>
          </div>
          <div class="list-row" onclick="ProfilePage.pickCity()">
            <div class="list-row-icon"><i class="fas fa-city"></i></div>
            <div class="list-row-info">
              <div class="list-row-label">${t('changeCity') || 'Cambiar ciudad'}</div>
              <div class="list-row-value">${t('manualLocation') || 'Ubicación manual'}</div>
            </div>
            <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
          </div>
        </div>

        <!-- General settings -->
        <div class="section-label">${t('settings')}</div>
        <div class="card" style="padding: 0; overflow: hidden;">
          <div class="list-row" onclick="ProfilePage.pickLanguage()">
            <div class="list-row-icon"><i class="fas fa-language"></i></div>
            <div class="list-row-info">
              <div class="list-row-label">${t('language')}</div>
              <div class="list-row-value">${langLabel}</div>
            </div>
            <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
          </div>

          <div class="list-row" onclick="ProfilePage.pickTheme()">
            <div class="list-row-icon"><i class="fas fa-adjust"></i></div>
            <div class="list-row-info">
              <div class="list-row-label">${t('theme')}</div>
              <div class="list-row-value">${themeLabel}</div>
            </div>
            <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
          </div>

          <div class="list-row" onclick="ProfilePage.pickMethod()">
            <div class="list-row-icon"><i class="fas fa-calculator"></i></div>
            <div class="list-row-info">
              <div class="list-row-label">${t('calculationMethod')}</div>
              <div class="list-row-value">${methodName}</div>
            </div>
            <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
          </div>
        </div>

        <!-- v26: Horario de verano / invierno (DST) -->
        <div class="section-label"><i class="fas fa-clock"></i> ${t('timeShift')}</div>
        <div class="card" style="padding:0;overflow:hidden;">
          <div class="list-row" onclick="ProfilePage.pickTimeShift()">
            <div class="list-row-icon"><i class="fas fa-${(AppState.settings.timeShift || 'auto') === 'summer' ? 'sun' : ((AppState.settings.timeShift || 'auto') === 'winter' ? 'snowflake' : 'arrows-rotate')}"></i></div>
            <div class="list-row-info">
              <div class="list-row-label">${t('timeShift')}</div>
              <div class="list-row-value">${{
                auto: '<i class="fas fa-arrows-rotate"></i> ' + t('timeShiftAuto'),
                summer: '<i class="fas fa-sun"></i> ' + t('timeShiftSummer'),
                winter: '<i class="fas fa-snowflake"></i> ' + t('timeShiftWinter'),
              }[AppState.settings.timeShift || 'auto']}</div>
            </div>
            <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
          </div>
          <div style="padding: 0 var(--sp-md) 12px; font-size: 12px; color: var(--text-secondary); line-height: 1.5;">
            <i class="fas fa-circle-info"></i> ${t('timeShiftDesc')}
          </div>
        </div>

        <!-- ADHAN settings -->
        <div class="section-label"><i class="fas fa-mosque"></i> ${t('adhanSettings') || 'Adhan (Llamada a la oración)'}</div>
        <div class="card" style="padding:0;overflow:hidden;">
          <div class="list-row" onclick="ProfilePage.pickAdhanMode()">
            <div class="list-row-icon"><i class="fas fa-sliders"></i></div>
            <div class="list-row-info">
              <div class="list-row-label">${t('adhanMode') || 'Tipo de adhan'}</div>
              <div class="list-row-value">${AppState.settings.adhan.mode === 'takbeer' ? (t('adhanModeTakbeer') || 'Solo las dos primeras Takbeer') : (t('adhanModeFull') || 'Adhan completo')}</div>
            </div>
            <button class="list-row-btn" onclick="event.stopPropagation(); ProfilePage.previewTakbeer()">
              <i class="fas fa-play"></i>
            </button>
            <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
          </div>
          <div class="list-row" onclick="ProfilePage.pickAdhanVoice(1)">
            <div class="list-row-icon">1️⃣</div>
            <div class="list-row-info">
              <div class="list-row-label">${t('adhanFirstTakbeer') || 'Primer Takbeer'}</div>
              <div class="list-row-value">${adhanVoice1.name}</div>
            </div>
            <button class="list-row-btn" onclick="event.stopPropagation(); AdhanService.preview('${adhanVoice1.id}')">
              <i class="fas fa-play"></i>
            </button>
            <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
          </div>
          <div class="list-row" onclick="ProfilePage.pickAdhanVoice(2)">
            <div class="list-row-icon">2️⃣</div>
            <div class="list-row-info">
              <div class="list-row-label">${t('adhanSecondTakbeer') || 'Segundo Takbeer'}</div>
              <div class="list-row-value">${adhanVoice2.name}</div>
            </div>
            <button class="list-row-btn" onclick="event.stopPropagation(); AdhanService.preview('${adhanVoice2.id}')">
              <i class="fas fa-play"></i>
            </button>
            <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
          </div>
          <div class="list-row">
            <div class="list-row-icon"><i class="fas fa-${AppState.settings.adhan.muted ? 'volume-mute' : 'volume-up'}"></i></div>
            <div class="list-row-info">
              <div class="list-row-label">${t('adhanMute') || 'Silenciar Adhan'}</div>
              <div class="list-row-value">${AppState.settings.adhan.muted ? (t('muted') || 'Silenciado') : (t('active') || 'Activo')}</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" ${AppState.settings.adhan.muted ? 'checked' : ''} onchange="ProfilePage.setAdhanMuted(this.checked)">
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="list-row" style="flex-direction:column;align-items:stretch;">
            <div style="display:flex;align-items:center;gap:14px;">
              <div class="list-row-icon"><i class="fas fa-volume-down"></i></div>
              <div class="list-row-info">
                <div class="list-row-label">${t('adhanVolume') || 'Volumen'}</div>
                <div class="list-row-value" id="volume-value">${Math.round(AppState.settings.adhan.volume * 100)}%</div>
              </div>
            </div>
            <input type="range" min="0" max="100" value="${Math.round(AppState.settings.adhan.volume * 100)}"
              class="volume-slider"
              oninput="ProfilePage.setAdhanVolume(this.value)"
              onchange="ProfilePage.setAdhanVolume(this.value)"
              style="width:100%;margin-top:12px;">
          </div>

          <!-- <i class="fas fa-bell"></i> Notificaciones de oración (adhan automático a su hora) -->
          <div class="list-row">
            <div class="list-row-icon"><i class="fas fa-bell"></i></div>
            <div class="list-row-info">
              <div class="list-row-label">${t('prayerNotif') || 'Notificaciones de oración'}</div>
              <div class="list-row-value">${(typeof PrayerNotifications !== 'undefined' && PrayerNotifications.isEnabled()) ? (t('active') || 'Activo') : (t('inactive') || 'Inactivo')}</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" ${(typeof PrayerNotifications !== 'undefined' && PrayerNotifications.isEnabled()) ? 'checked' : ''} onchange="ProfilePage.setPrayerNotifEnabled(this.checked)">
              <span class="toggle-slider"></span>
            </label>
          </div>
          <!-- v24: recordatorio 15 min antes del adhan («اقتربت صلاة الظهر») -->
          <div class="list-row">
            <div class="list-row-icon"><i class="fas fa-hourglass-half"></i></div>
            <div class="list-row-info">
              <div class="list-row-label">${t('prayerReminder') || 'Recordatorio antes de la oración'}</div>
              <div class="list-row-value">${(typeof PrayerNotifications !== 'undefined' && PrayerNotifications.isReminderEnabled()) ? (t('active') || 'Activo') : (t('inactive') || 'Inactivo')} · ${t('reminderHint') || '15 minutos antes'}</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" ${(typeof PrayerNotifications !== 'undefined' && PrayerNotifications.isReminderEnabled()) ? 'checked' : ''} onchange="ProfilePage.setPrayerReminderEnabled(this.checked)">
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>

        <!-- <i class="fas fa-trash"></i> Zona de datos -->
        <div class="section-label">${t('dataZone') || 'Datos y progreso'}</div>
        <div class="card" style="padding:0;overflow:hidden;">
          <div class="list-row" onclick="ProfilePage.exportData()">
            <div class="list-row-icon"><i class="fas fa-download"></i></div>
            <div class="list-row-info">
              <div class="list-row-label">${t('exportData') || 'Exportar datos'}</div>
              <div class="list-row-value">${t('exportDataDesc') || 'Guardar copia local (JSON)'}</div>
            </div>
            <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
          </div>
          <div class="list-row list-row-danger" onclick="ProfilePage.confirmResetProgress()">
            <div class="list-row-icon" style="background:#fee;color:#c33;"><i class="fas fa-redo"></i></div>
            <div class="list-row-info">
              <div class="list-row-label" style="color:#c33;">${t('resetProgress') || 'Reiniciar progreso'}</div>
              <div class="list-row-value">${t('resetProgressDesc') || 'Borrar XP, marcadores y ajustes'}</div>
            </div>
            <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
          </div>
        </div>

        <!-- About -->
        <div class="section-label">${t('about')}</div>
        <div class="card about-card">
          <img src="assets/icon.png" alt="Quba" style="width:80px;height:80px;border-radius:22px;margin-bottom:8px;">
          <div class="about-name">Quba — قُبَّة</div>
          <div class="about-version">v${typeof APP_VERSION !== 'undefined' ? APP_VERSION : '1.0.0'} — Web App</div>
          <div class="about-desc">${t('tagline')}</div>
          <div class="about-credits">
            APIs: Aladhan · Al-Quran Cloud · UmmahAPI · OpenStreetMap
          </div>
        </div>

        <!-- Mosque footer credit -->
        <div class="mosque-footer">
          <img src="assets/mosque-logo.png" alt="Mezquita Abdullah" class="mosque-footer-logo" loading="lazy">
          <div class="mosque-footer-title">${t('mosqueFooterTitle') || 'Masjid Abdullah'}</div>
          <div class="mosque-footer-line">${t('mosqueFooterMade') || 'Hecho en La Habana, Cuba · 2026'}</div>
          <div class="mosque-footer-desc">${t('mosqueFooterDesc') || 'Diseñado especialmente para el Masjid Abdullah y la comunidad musulmana de Cuba y América Latina.'}</div>
        </div>
      </div>
    `;
  },

  // ============ v15: USER NAME (para certificados) ============
  editUserName() {
    const current = AppState.settings.userName || '';
    const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
    const labels = {
      es: { title: 'Tu nombre', hint: 'Aparecerá en tus certificados de cursos', placeholder: 'Ej: Ahmad Al-Sayyid', save: 'Guardar', cancel: 'Cancelar' },
      ar: { title: 'اسمك',        hint: 'سيظهر في شهادات إنجاز الدورات',        placeholder: 'مثال: أحمد السيد',    save: 'حفظ',      cancel: 'إلغاء' },
      en: { title: 'Your name',   hint: 'Will appear on your course certificates', placeholder: 'e.g. Ahmad Al-Sayyid', save: 'Save',     cancel: 'Cancel' },
    };
    const L = labels[lang];
    const html = `
      <div class="modal-header">
        <div class="modal-title"><i class="fas fa-user"></i> ${L.title}</div>
        <button class="modal-close" onclick="closeModal()" aria-label="${L.cancel}">×</button>
      </div>
      <div style="padding: 8px 4px 4px;">
        <div style="color:var(--text-secondary);font-size:13px;margin-bottom:12px;">${L.hint}</div>
        <input type="text" id="user-name-input" value="${escapeAttr(current)}" placeholder="${escapeAttr(L.placeholder)}" maxlength="60"
               style="width:100%;padding:12px 14px;border:2px solid #D4AF37;border-radius:12px;font-size:16px;background:var(--card);color:var(--text);">
        <div style="display:flex;gap:10px;margin-top:16px;">
          <button class="btn-secondary" style="flex:1;padding:12px;border-radius:12px;border:1px solid var(--text-secondary);background:transparent;color:var(--text);cursor:pointer;" onclick="closeModal()">${L.cancel}</button>
          <button class="btn-primary" style="flex:2;padding:12px;" onclick="ProfilePage.saveUserName()">${L.save}</button>
        </div>
      </div>
    `;
    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal-overlay').classList.remove('hidden');
    setTimeout(() => {
      const inp = document.getElementById('user-name-input');
      if (inp) { inp.focus(); inp.select(); }
    }, 100);
    // Enter to save
    const inp = document.getElementById('user-name-input');
    if (inp) inp.addEventListener('keypress', e => { if (e.key === 'Enter') ProfilePage.saveUserName(); });
  },

  saveUserName() {
    const inp = document.getElementById('user-name-input');
    if (!inp) return;
    const val = inp.value.trim().slice(0, 60);
    AppState.settings.userName = val;
    Storage.saveSettings();
    closeModal();
    showToast((t('nameSaved') || 'Nombre guardado'), 1500);
    this.render(document.getElementById('main-content'));
  },

  // ============ LOCATION ============
  async requestLocation() {
    showToast((t('requestingLocation') || 'Solicitando ubicación...'), 1500);
    const coords = await LocationService.requestPermission();
    if (coords) {
      AppState.location = coords;
      AppState.timings = null; // Invalidate prayer cache
      this.render(document.getElementById('main-content'));
    }
  },

  pickCity() {
    const cities = [
      { id: 'havana', label: '🇨🇺 La Habana, Cuba', lat: 23.1136, lon: -82.3666 },
      { id: 'madrid', label: '🇪🇸 Madrid, España', lat: 40.4168, lon: -3.7038 },
      { id: 'barcelona', label: '🇪🇸 Barcelona, España', lat: 41.3851, lon: 2.1734 },
      { id: 'mecca', label: '<i class="fas fa-mosque"></i> La Meca, Arabia Saudí', lat: 21.4225, lon: 39.8262 },
      { id: 'medina', label: '<i class="fas fa-mosque"></i> Medina, Arabia Saudí', lat: 24.4672, lon: 39.6111 },
      { id: 'cairo', label: '🇪🇬 El Cairo, Egipto', lat: 30.0444, lon: 31.2357 },
      { id: 'istanbul', label: '🇹🇷 Estambul, Turquía', lat: 41.0082, lon: 28.9784 },
      { id: 'buenos_aires', label: '🇦🇷 Buenos Aires, Argentina', lat: -34.6037, lon: -58.3816 },
      { id: 'mexico', label: '🇲🇽 CDMX, México', lat: 19.4326, lon: -99.1332 },
      { id: 'bogota', label: '🇨🇴 Bogotá, Colombia', lat: 4.7110, lon: -74.0721 },
    ];
    const currentId = null;
    showModal(t('changeCity') || 'Cambiar ciudad', cities.map(c => ({ id: c.id, label: c.label })), currentId, id => {
      const city = cities.find(c => c.id === id);
      if (!city) return;
      LocationService.setManual(city.lat, city.lon, city.label.split(',')[0].replace(/^[^\s]+\s/, '').trim(), city.label.split(',').pop().trim());
      AppState.timings = null;
      showToast(city.label, 2000);
      this.render(document.getElementById('main-content'));
    });
  },

  // ============ LANGUAGE / THEME / METHOD ============
  pickLanguage() {
    const options = [
      { id: 'es', label: '🇪🇸 Español' },
      { id: 'ar', label: '🇸🇦 العربية' },
      { id: 'en', label: '🇬🇧 English' },
    ];
    showModal(t('language'), options, AppState.settings.locale, id => {
      AppState.settings.locale = id;
      Storage.saveSettings();
      setLocale(id);
      this.render(document.getElementById('main-content'));
      showToast(t('settings'));
    });
  },

  pickTheme() {
    const options = [
      { id: 'light', label: '<i class="fas fa-sun"></i> ' + t('themeLight') },
      { id: 'dark', label: '<i class="fas fa-moon"></i> ' + t('themeDark') },
      { id: 'auto', label: '<i class="fas fa-arrows-rotate"></i> ' + t('themeAuto') },
    ];
    showModal(t('theme'), options, AppState.settings.theme, id => {
      AppState.settings.theme = id;
      Storage.saveSettings();
      applyTheme();
      this.render(document.getElementById('main-content'));
    });
  },

  pickMethod() {
    const options = Object.entries(CONFIG.CALCULATION_METHODS).map(([id, name]) => ({
      id: parseInt(id, 10),
      label: name,
    }));
    showModal(t('calculationMethod'), options, AppState.settings.calculationMethod, id => {
      AppState.settings.calculationMethod = id;
      Storage.saveSettings();
      AppState.timings = null;
      this.render(document.getElementById('main-content'));
      showToast(t('settings'));
    });
  },

  // v26: selector de ajuste horario (verano/invierno). Al cambiarlo se
  // invalida la caché de horarios en memoria y se reprograman las alarmas
  // (adhan/recordatorios) con los nuevos horarios ±1h.
  pickTimeShift() {
    const options = [
      { id: 'auto',   label: '<i class="fas fa-arrows-rotate"></i> ' + t('timeShiftAuto') },
      { id: 'summer', label: '<i class="fas fa-sun"></i> ' + t('timeShiftSummer') },
      { id: 'winter', label: '<i class="fas fa-snowflake"></i> ' + t('timeShiftWinter') },
    ];
    showModal(t('timeShift'), options, AppState.settings.timeShift || 'auto', id => {
      AppState.settings.timeShift = id;
      Storage.saveSettings();
      AppState.timings = null; // forzar recálculo con el nuevo desplazamiento
      // Reprogramar alarmas con los horarios desplazados
      if (typeof PrayerNotifications !== 'undefined' &&
          (PrayerNotifications.isEnabled() || PrayerNotifications.isReminderEnabled()) &&
          typeof API !== 'undefined' && AppState.location) {
        API.getPrayerTimes(AppState.location.latitude, AppState.location.longitude,
          new Date(), AppState.settings.calculationMethod)
          .then(r => {
            if (r && r.timings) {
              AppState.timings = r.timings;
              PrayerNotifications.scheduleDay(r.timings, AppState.settings.locale || 'es');
            }
          }).catch(() => {});
      }
      this.render(document.getElementById('main-content'));
      showToast(
        id === 'summer' ? '☀️ ' + t('timeShiftSummerApplied')
        : id === 'winter' ? '❄️ ' + t('timeShiftWinterApplied')
        : '✔️ ' + t('timeShiftAuto'), 2200);
    });
  },

  // ============ ADHAN ============
  pickAdhanVoice(takbeerNum) {
    const options = AdhanService.VOICES.map(v => ({
      id: v.id,
      label: `${v.flag || '<i class="fas fa-mosque"></i>'} ${v.name} · ${v.country}`,
    }));
    const currentId = takbeerNum === 1 ? AppState.settings.adhan.voice1 : AppState.settings.adhan.voice2;
    const title = takbeerNum === 1
      ? (t('adhanFirstTakbeer') || 'Primer Takbeer')
      : (t('adhanSecondTakbeer') || 'Segundo Takbeer');
    showModal(title, options, currentId, id => {
      if (takbeerNum === 1) AppState.settings.adhan.voice1 = id;
      else AppState.settings.adhan.voice2 = id;
      Storage.saveSettings();
      this.render(document.getElementById('main-content'));
      AdhanService.preview(id);
    });
  },

  // v24: selector de modo del adhan (completo / solo 2 primeras takbeer)
  pickAdhanMode() {
    const options = [
      { id: 'full',    label: '🕌 ' + (t('adhanModeFull') || 'Adhan completo') },
      { id: 'takbeer', label: '⏩ ' + (t('adhanModeTakbeer') || 'Solo las dos primeras Takbeer') },
    ];
    showModal(t('adhanMode') || 'Tipo de adhan', options, AppState.settings.adhan.mode, id => {
      AppState.settings.adhan.mode = id;
      Storage.saveSettings();
      this.render(document.getElementById('main-content'));
      if (id === 'takbeer') this.previewTakbeer();
    });
  },

  // v24: vista previa del modo «solo las dos primeras takbeer» (1ª voz con corte)
  previewTakbeer() {
    if (typeof AdhanService === 'undefined') return;
    const s = AppState.settings.adhan;
    const voice = AdhanService.VOICES.find(v => v.id === s.voice1) || AdhanService.VOICES[0];
    AdhanService.stopPreview();
    const wasMuted = s.muted;
    s.muted = false;
    AdhanService._playVoice(voice, s.volume, null, (s.takbeerDuration || 12) * 1000)
      .finally(() => { s.muted = wasMuted; });
    showToast('🔊 ' + (t('adhanModeTakbeer') || 'Solo las dos primeras Takbeer'), 2000);
  },

  // v24: interruptores con estado explícito (checked) — evita el doble cambio
  // que ocurría al tener onclick en la fila + onchange en la casilla a la vez
  setAdhanMuted(checked) {
    AppState.settings.adhan.muted = !!checked;
    if (checked && typeof AdhanService !== 'undefined') AdhanService.stop();
    Storage.saveSettings();
    this.render(document.getElementById('main-content'));
    showToast(checked
      ? '<i class="fas fa-volume-xmark"></i> ' + (t('adhanMuted') || 'Adhan silenciado')
      : '<i class="fas fa-volume-high"></i> ' + (t('adhanUnmuted') || 'Adhan activo'), 1500);
  },

  setAdhanVolume(val) {
    const v = Math.max(0, Math.min(100, parseInt(val, 10))) / 100;
    AppState.settings.adhan.volume = v;
    Storage.saveSettings();
    const el = document.getElementById('volume-value');
    if (el) el.textContent = Math.round(v * 100) + '%';
    AdhanService.setVolume(v);
  },

  exportData() {
    try {
      const data = { version: (typeof APP_VERSION !== 'undefined' ? APP_VERSION : '1.0.0'), exportedAt: new Date().toISOString(), storage: {} };
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('quba_')) data.storage[k] = localStorage.getItem(k);
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `quba-backup-${new Date().toISOString().slice(0,10)}.json`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 100);
      showToast(t('exportOk') || 'Backup descargado');
    } catch(e) {
      showToast(t('error') + ': '+ e.message);
    }
  },

  confirmResetProgress() {
    const msg = t('confirmReset') || '¿Borrar TODO tu progreso (XP, marcadores, ajustes, caché)? Esta acción no se puede deshacer.';
    if (!confirm(msg)) return;
    // Segunda confirmación
    const confirmText = t('resetTypeConfirm') || 'BORRAR';
    const input = prompt((t('resetTypeQuestion') || 'Escribe') + ` "${confirmText}" ` + (t('resetTypeToConfirm') || 'para confirmar:'));
    if (input !== confirmText) {
      showToast(t('resetCancelled') || 'Cancelado');
      return;
    }
    // Borrar localStorage (solo claves quba_)
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('quba_')) keysToRemove.push(k);
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
    // Borrar IndexedDB
    if (typeof CacheDB !== 'undefined') {
      CacheDB.clear().catch(() => {});
    }
    showToast(t('resetOk') || 'Progreso reiniciado. Recargando...');
    setTimeout(() => location.reload(), 1500);
  },

  async setPrayerNotifEnabled(checked) {
    if (typeof PrayerNotifications === 'undefined') return;
    if (!checked) {
      PrayerNotifications.disable();
    } else {
      const ok = await PrayerNotifications.enable();
      // Si activó, programar las oraciones del día (adhan automático)
      if (ok && AppState.timings) {
        PrayerNotifications.scheduleDay(AppState.timings, AppState.settings.locale || 'es');
      }
    }
    this.render(document.getElementById('main-content'));
  },

  // v24: interruptor del recordatorio «اقتربت صلاة الظهر» (15 min antes)
  async setPrayerReminderEnabled(checked) {
    if (typeof PrayerNotifications === 'undefined') return;
    if (!checked) {
      PrayerNotifications.disableReminder();
    } else {
      const ok = await PrayerNotifications.enableReminder();
      if (ok && AppState.timings) {
        PrayerNotifications.scheduleDay(AppState.timings, AppState.settings.locale || 'es');
      }
    }
    this.render(document.getElementById('main-content'));
  },

  cleanup() {
    AdhanService.stopPreview();
  },
};
