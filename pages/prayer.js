// 🕋 Pantalla de Oración + Qibla
const PrayerPage = {
  activeTab: 'times',
  qiblaBearing: 0,
  deviceHeading: 0,
  orientationHandler: null,
  permissionGranted: false,

  async render(container, params = {}) {
    // v14: honor incoming tab param (e.g. Router.go('prayer',{tab:'monthly'}))
    if (params && params.tab && ['times','monthly','qibla'].includes(params.tab)) {
      this.activeTab = params.tab;
    }

    container.innerHTML = Skeleton.prayer();

    try {
      const loc = AppState.location || await LocationService.getCurrent();
      AppState.location = loc;

      this.qiblaBearing = Qibla.calculateBearing(loc.latitude, loc.longitude);
      const distance = Qibla.distance(loc.latitude, loc.longitude);

      const [timings, hijri] = await Promise.all([
        AppState.timings ? Promise.resolve({ timings: AppState.timings }) :
          API.getPrayerTimes(loc.latitude, loc.longitude, new Date(), AppState.settings.calculationMethod),
        AppState.hijri ? Promise.resolve(AppState.hijri) : API.gregorianToHijri(),
      ]);

      AppState.timings = timings.timings;
      AppState.hijri = hijri;

      // 🔔 Programar las alarmas del día: adhan automático a la hora de cada
      // oración y/o recordatorio 15 min antes (cada uno con su interruptor)
      if (typeof PrayerNotifications !== 'undefined' &&
          (PrayerNotifications.isEnabled() || PrayerNotifications.isReminderEnabled())) {
        PrayerNotifications.scheduleDay(AppState.timings, AppState.settings.locale || 'es');
      }

      // Escapar datos de ubicación (Nominatim)
      if (loc) { loc.city = loc.city && String(loc.city); loc.country = loc.country && String(loc.country); }

      this.renderUI(container, loc, hijri, distance);
    } catch (e) {
      console.warn('Prayer error:', e);
      container.innerHTML = this.permissionPrompt();
    }
  },

  renderUI(container, loc, hijri, distance) {
    container.innerHTML = `
      <div class="page-header">
        <div class="page-title"><i class="fas fa-mosque"></i> ${t('tabPrayer')}</div>
        ${hijri ? `<div class="page-subtitle">${hijri.day} ${hijri.month?.en} ${hijri.year} هـ</div>` : ''}
        ${loc.city ? `<div class="page-meta"><i class="fas fa-location-dot"></i> ${escapeHtml(loc.city)}${loc.country ? ', ' + escapeHtml(loc.country) : ''}</div>` : ''}

        <div class="inner-tabs">
          <button class="inner-tab ${this.activeTab === 'times' ? 'active' : ''}" onclick="PrayerPage.switchTab('times')">
            ⏰ ${t('todayPrayers')}
          </button>
          <button class="inner-tab ${this.activeTab === 'monthly' ? 'active' : ''}" onclick="PrayerPage.switchTab('monthly')">
            <i class="fas fa-calendar-days"></i> ${t('monthlyTable') || 'Mensual'}
          </button>
          <button class="inner-tab ${this.activeTab === 'qibla' ? 'active' : ''}" onclick="PrayerPage.switchTab('qibla')">
            <i class="fas fa-compass"></i> ${t('qibla')}
          </button>
        </div>

        <!-- v22: shortcut to the Salah course -->
        <button class="btn-primary prayer-course-btn" onclick="(typeof CoursesPage !== 'undefined') ? CoursesPage.openCourse('salah_complete') : Router.go('wisdom/courses')">
          <i class="fas fa-graduation-cap"></i> ${t('prayerCourseBtn') || 'Curso de Oración'}
        </button>
      </div>

      <div id="prayer-tab-content" style="padding: var(--sp-md);">
        ${this.activeTab === 'times' ? this.timesTab() : (this.activeTab === 'monthly' ? this.monthlyTab(loc) : this.qiblaTab(distance))}
      </div>
    `;

    if (this.activeTab === 'qibla') {
      this.initOrientationListener();
    }
  },

  switchTab(tab) {
    this.cleanup();
    this.activeTab = tab;
    this.render(document.getElementById('main-content'));
  },

  timesTab() {
    const prayers = getDailyPrayers(AppState.timings);
    const next = getNextPrayer(AppState.timings);
    const isEstimated = !!(AppState.timings && AppState.timings._estimated);
    // v26: insignia del ajuste manual de horario (verano/invierno)
    const shiftMode = (AppState.settings && AppState.settings.timeShift) || 'auto';
    const shiftBadge = shiftMode === 'summer'
      ? `<div class="estimated-badge" style="margin: 0 var(--sp-md) var(--sp-sm);"><i class="fas fa-sun"></i> ${t('timeShiftSummerApplied')}</div>`
      : shiftMode === 'winter'
      ? `<div class="estimated-badge" style="margin: 0 var(--sp-md) var(--sp-sm);"><i class="fas fa-snowflake"></i> ${t('timeShiftWinterApplied')}</div>`
      : '';
    return `
      ${isEstimated ? `<div class="estimated-badge" style="margin: 0 var(--sp-md) var(--sp-sm);"><i class="fas fa-wifi-slash"></i> ${t('estimatedTimes')}</div>` : ''}
      ${shiftBadge}
      <div class="card prayers-card">
        ${prayers.map(p => {
          const canCheck = (typeof PrayerTracker !== 'undefined') && PrayerTracker.PRAYERS.includes(p.name);
          const isDone = canCheck && PrayerTracker.isDone(p.name);
          return `
          <div class="prayer-row ${next?.name === p.name ? 'next' : ''} ${isDone ? 'prayer-done' : ''}">
            <span class="prayer-emoji">${getPrayerEmoji(p.name)}</span>
            <div class="prayer-name-block">
              <div class="prayer-name">${t('prayers.' + p.name)}</div>
              <div class="prayer-arabic">${HomePage.prayerArabic(p.name)}</div>
            </div>
            <div class="prayer-time-block">
              <div class="prayer-time">${formatTime12h(p.time)}</div>
              ${p.iqamah ? `<div class="prayer-iqamah"><i class="fas fa-bell"></i> ${t('iqamah') || 'Iqamah'} ${formatTime12h(p.iqamah)} <span class="iqamah-off">+${p.iqamahOffset} ${t('minShort') || 'min'}</span></div>` : ''}
            </div>
            ${canCheck ? `
              <button class="prayer-check ${isDone ? 'checked' : ''}"
                      aria-label="${t('prayerCheckinTitle')}"
                      aria-pressed="${isDone}"
                      onclick="HomePage.toggleCheckin('${p.name}', this)">
                <i class="fas fa-check"></i>
              </button>` : ''}
          </div>`;
        }).join('')}
        <div style="padding: 8px;">
          <button class="btn-ghost pdf-btn" onclick="PrayerPdf.downloadDaily(this)" aria-label="${t('downloadPdf') || 'PDF'}">
            <span><i class="fas fa-file-pdf"></i> ${t('downloadPdf') || 'Descargar PDF'}</span>
            <i class="fas fa-download"></i>
          </button>
          <button class="btn-ghost" onclick="Router.go('calendar')">
            <span><i class="fas fa-calendar"></i> ${t('hijriCalendar')}</span>
            <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'}"></i>
          </button>
        </div>
      </div>
    `;
  },

  qiblaTab(distance) {
    const loc = AppState.location;
    const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
    const atMakkah = loc && Qibla.isAtMakkah(loc.latitude, loc.longitude);
    const cardinal = Qibla.cardinalName(this.qiblaBearing, lang);
    const decl = loc ? Qibla.magneticDeclination(loc.latitude, loc.longitude) : 0;
    const trueBearing = this.qiblaBearing.toFixed(1);

    // Labels per language
    const L = {
      atMakkah:      { es: '¡Estás en la Qibla!',       ar: 'أنت في القبلة!',              en: 'You are at the Qibla!' },
      atMakkahDesc:  { es: 'Te encuentras en Meca o sus alrededores. La Kaaba está cerca.', ar: 'أنت في مكة المكرمة أو ضواحيها. الكعبة قريبة.', en: 'You are in Makkah or its surroundings. The Kaaba is nearby.' },
      pointToKaaba:  { es: 'Gira hasta que la aguja dorada apunte arriba', ar: 'أدر حتى تشير الإبرة الذهبية إلى الأعلى', en: 'Rotate until the golden needle points up' },
      aligned:       { es: '¡Perfecto! Estás mirando a la Qibla', ar: 'ممتاز! أنت تنظر إلى القبلة', en: 'Perfect! You are facing the Qibla' },
      qiblaDir:      { es: 'Dirección Qibla',            ar: 'اتجاه القبلة',                en: 'Qibla Direction' },
      trueNorth:     { es: 'Norte verdadero',            ar: 'الشمال الحقيقي',              en: 'True North' },
      magneticNorth: { es: 'Norte magnético',            ar: 'الشمال المغناطيسي',           en: 'Magnetic North' },
      declination:   { es: 'Declinación magnética',      ar: 'الانحراف المغناطيسي',         en: 'Magnetic declination' },
      distance:      { es: 'Distancia a la Kaaba',       ar: 'المسافة إلى الكعبة',          en: 'Distance to Kaaba' },
      activateCompass:{ es: 'Activar brújula',           ar: 'تفعيل البوصلة',               en: 'Enable compass' },
      noCompass:     { es: 'Sin brújula: la dirección se muestra sin sensor', ar: 'بدون بوصلة: يظهر الاتجاه بدون حساس', en: 'No compass: direction shown without sensor' },
      tip:           { es: '<i class="fas fa-lightbulb"></i> Mantén el teléfono horizontal y alejado de objetos metálicos. La aguja dorada siempre apunta a la Kaaba.', ar: '<i class="fas fa-lightbulb"></i> حافظ على الهاتف أفقيًا وبعيدًا عن الأجسام المعدنية. الإبرة الذهبية تشير دائمًا إلى الكعبة.', en: '<i class="fas fa-lightbulb"></i> Keep the phone horizontal and away from metal objects. The golden needle always points to the Kaaba.' },
    };

    return `
      <div class="qibla-v17">
        ${atMakkah ? `
          <div class="card makkah-card">
            <div class="makkah-icon"><i class="fas fa-mosque"></i></div>
            <div class="makkah-title">${L.atMakkah[lang]}</div>
            <div class="makkah-desc">${L.atMakkahDesc[lang]}</div>
            <div class="makkah-dist">${distance.toFixed(1)} km</div>
          </div>
        ` : `
          <div class="card qibla-card">
            <div class="qibla-hint-v17" id="qibla-hint">${L.pointToKaaba[lang]}</div>

            <!-- Compass circle -->
            <div class="compass-v17" id="compass">
              <!-- Outer ring with cardinal marks -->
              <div class="compass-ring">
                <div class="cardinal-mark n"><span class="cardinal-letter">N</span><span class="cardinal-sub">${L.trueNorth[lang]}</span></div>
                <div class="cardinal-mark e"><span class="cardinal-letter">E</span></div>
                <div class="cardinal-mark s"><span class="cardinal-letter">S</span></div>
                <div class="cardinal-mark w"><span class="cardinal-letter">W</span></div>
              </div>

              <!-- Magnetic North marker (small red dot, moves with heading) -->
              <div class="magnetic-north-marker" id="magnetic-north-marker" style="transform: rotate(${-decl}deg);">
                <div class="mn-dot"></div>
              </div>

              <!-- Golden Qibla needle -->
              <div class="qibla-needle" id="qibla-arrow" style="transform: rotate(${this.qiblaBearing}deg);">
                <div class="needle-body"></div>
                <div class="needle-tip">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22l10-4 10 4z"/></svg>
                </div>
                <div class="needle-label">القِبْلَة</div>
              </div>

              <!-- Center hub -->
              <div class="compass-hub">
                <div class="hub-inner"></div>
              </div>
            </div>

            <!-- Numeric info panel -->
            <div class="qibla-info-v17">
              <div class="info-row">
                <div class="info-item">
                  <div class="info-label">${L.qiblaDir[lang]}</div>
                  <div class="info-value main-value">${trueBearing}°</div>
                  <div class="info-sub">${cardinal.long}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">${L.distance[lang]}</div>
                  <div class="info-value">${distance.toFixed(0)} km</div>
                </div>
              </div>
              <div class="info-row secondary">
                <div class="info-item">
                  <div class="info-label">${L.declination[lang]}</div>
                  <div class="info-value">${decl > 0 ? '+' : ''}${decl.toFixed(1)}°</div>
                </div>
                <div class="info-item">
                  <div class="info-label">${L.magneticNorth[lang]}</div>
                  <div class="info-value" id="magnetic-heading-val">—</div>
                </div>
              </div>
            </div>
          </div>

          <div class="qibla-tip-v17">${L.tip[lang]}</div>

          <button class="btn-primary qibla-activate-btn" id="qibla-activate-btn" onclick="PrayerPage.requestOrientationPermission()">
            <i class="fas fa-compass"></i> ${L.activateCompass[lang]}
          </button>
        `}
      </div>
    `;
  },

  // ============ MONTHLY PRAYER TABLE ============
  monthlyTab(loc) {
    // Trigger async load
    setTimeout(() => this.loadMonthlyPrayers(loc), 100);
    return `
      <div id="monthly-prayer-container">
        ${Skeleton.prayerMonth()}
      </div>
    `;
  },

  async loadMonthlyPrayers(loc) {
    const container = document.getElementById('monthly-prayer-container');
    if (!container) return;

    try {
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      const data = await API.getPrayerTimesMonth(
        loc.latitude,
        loc.longitude,
        month,
        year,
        AppState.settings.calculationMethod || 3
      );

      this._monthly = { data, month, year }; // guardado para la exportación PDF
      this.renderMonthlyTable(container, data, month, year);
    } catch (e) {
      console.warn('Monthly prayers error:', e);
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon"><i class="fas fa-triangle-exclamation"></i></div>
          <div class="empty-state-text">${t('errorLoading') || 'Error al cargar. Verifica tu conexión.'}</div>
          <button class="btn-primary" onclick="PrayerPage.loadMonthlyPrayers(${JSON.stringify(loc).replace(/"/g,'&quot;')})">${t('retry') || 'Reintentar'}</button>
        </div>`;
    }
  },

  renderMonthlyTable(container, data, month, year) {
    if (!data || data.length === 0) {
      container.innerHTML = `<div class="empty-state"><div>${t('noData') || 'Sin datos'}</div></div>`;
      return;
    }

    const monthName = new Date(year, month - 1).toLocaleString(currentLocale, { month: 'long' });
    const today = new Date();
    const isCurrentMonth = today.getMonth() + 1 === month && today.getFullYear() === year;
    const todayDay = today.getDate();

    // Prayer column headers
    const prayerLabels = {
      Fajr: t('prayers.Fajr') || 'Fajr',
      Dhuhr: t('prayers.Dhuhr') || 'Dhuhr',
      Asr: t('prayers.Asr') || 'Asr',
      Maghrib: t('prayers.Maghrib') || 'Maghrib',
      Isha: t('prayers.Isha') || 'Isha',
    };

    const rows = data.map(day => {
      const gDate = day.date?.gregorian;
      const hDate = day.date?.hijri;
      const dayNum = parseInt(gDate?.day, 10);
      const isToday = isCurrentMonth && dayNum === todayDay;
      const t24 = t => (t || '').split(' ')[0].slice(0,5); // "05:12 (CET)" -> "05:12"
      const isFriday = new Date(gDate?.date?.split('-').reverse().join('-'))?.getDay() === 5;

      return `
        <tr class="${isToday ? 'monthly-row-today' : ''} ${isFriday ? 'monthly-row-friday' : ''}">
          <td class="monthly-day-col">
            <div class="monthly-greg">${dayNum}</div>
            <div class="monthly-hijri">${hDate?.day} ${hDate?.month?.ar || hDate?.month?.en || ''}</div>
            ${isFriday ? '<div class="monthly-friday-badge"><i class="fas fa-book"></i></div>' : ''}
            ${isToday ? '<div class="monthly-today-badge"><i class="fas fa-star"></i></div>' : ''}
          </td>
          <td>${t24(day.timings?.Fajr)}<div class="monthly-iqamah">${getIqamahTime('Fajr', t24(day.timings?.Fajr)) || ''}</div></td>
          <td>${t24(day.timings?.Dhuhr)}<div class="monthly-iqamah">${getIqamahTime('Dhuhr', t24(day.timings?.Dhuhr)) || ''}</div></td>
          <td>${t24(day.timings?.Asr)}<div class="monthly-iqamah">${getIqamahTime('Asr', t24(day.timings?.Asr)) || ''}</div></td>
          <td>${t24(day.timings?.Maghrib)}<div class="monthly-iqamah">${getIqamahTime('Maghrib', t24(day.timings?.Maghrib)) || ''}</div></td>
          <td>${t24(day.timings?.Isha)}<div class="monthly-iqamah">${getIqamahTime('Isha', t24(day.timings?.Isha)) || ''}</div></td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div class="monthly-header">
        <div class="monthly-title"><i class="fas fa-calendar-days"></i> ${monthName} ${year}</div>
        <div class="monthly-subtitle">${data.length} ${t('days') || 'días'}</div>
        <button class="btn-primary pdf-btn-month" onclick="PrayerPdf.downloadMonth(this)" aria-label="${t('downloadPdf') || 'PDF'}">
          <i class="fas fa-file-pdf"></i> ${t('downloadPdf') || 'Descargar PDF'}
        </button>
      </div>
      <div class="monthly-table-wrap">
        <table class="monthly-table">
          <thead>
            <tr>
              <th>${t('day') || 'Día'}</th>
              <th><i class="fas fa-cloud-sun"></i> ${prayerLabels.Fajr}</th>
              <th><i class="fas fa-sun"></i> ${prayerLabels.Dhuhr}</th>
              <th><i class="fas fa-cloud-sun"></i> ${prayerLabels.Asr}</th>
              <th><i class="fas fa-mountain-sun"></i> ${prayerLabels.Maghrib}</th>
              <th><i class="fas fa-moon"></i> ${prayerLabels.Isha}</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="monthly-legend">
        <span><span class="legend-dot today"></span> ${t('today') || 'Hoy'}</span>
        <span><span class="legend-dot friday"></span> ${t('friday') || 'Viernes'}</span>
      </div>
    `;
  },

  async requestOrientationPermission() {
    // iOS 13+ requiere permiso explícito
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const perm = await DeviceOrientationEvent.requestPermission();
        if (perm === 'granted') {
          this.permissionGranted = true;
          this.initOrientationListener();
          showToast('Brújula activada');
        } else {
          showToast('Permiso denegado');
        }
      } catch (e) {
        showToast('Error: '+ e.message);
      }
    } else {
      // Android / desktop: no requiere permiso
      this.permissionGranted = true;
      this.initOrientationListener();
      showToast('Brújula activa');
    }
  },

  initOrientationListener() {
    if (this.orientationHandler) {
      window.removeEventListener('deviceorientation', this.orientationHandler);
      window.removeEventListener('deviceorientationabsolute', this.orientationHandler);
    }

    this.orientationHandler = (e) => {
      // alpha: 0..360 (rotación alrededor del eje Z) — Norte magnético
      let heading = null;
      if (e.webkitCompassHeading !== undefined) {
        // iOS Safari gives TRUE heading directly (corrected by the OS)
        heading = e.webkitCompassHeading;
      } else if (e.absolute && e.alpha !== null) {
        // Android Chrome with absolute=true: alpha is relative to true north already
        heading = 360 - e.alpha;
      } else if (e.alpha !== null) {
        // Android Chrome without absolute: magnetic heading, need declination correction
        heading = 360 - e.alpha;
      }

      if (heading === null) return;

      // Smooth the heading (EMA filter) to avoid jitter
      const smoothed = Qibla.smoothHeading(heading);
      this.deviceHeading = smoothed;

      const loc = AppState.location;
      const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
      const computed = Qibla.compute(loc?.latitude || 0, loc?.longitude || 0, smoothed, lang);

      const arrowAngle = computed.arrowAngle;
      const arrow = document.getElementById('qibla-arrow');
      if (arrow) {
        arrow.style.transform = `rotate(${arrowAngle}deg)`;
        const aligned = computed.aligned;
        arrow.classList.toggle('aligned', aligned);

        const hint = document.getElementById('qibla-hint');
        if (hint) {
          const L = {
            aligned: { es: '¡Perfecto! Estás mirando a la Qibla', ar: 'ممتاز! أنت تنظر إلى القبلة', en: 'Perfect! You are facing the Qibla' },
            pointTo: { es: 'Gira hasta que la aguja dorada apunte arriba', ar: 'أدر حتى تشير الإبرة الذهبية إلى الأعلى', en: 'Rotate until the golden needle points up' },
          };
          hint.textContent = aligned ? L.aligned[lang] : L.pointTo[lang];
          hint.classList.toggle('aligned', aligned);
        }

        // Update magnetic north marker position (rotates with the compass)
        const mnMarker = document.getElementById('magnetic-north-marker');
        if (mnMarker) {
          // Magnetic north points at -declination relative to true north.
          // As the device rotates, this marker must rotate in opposition so the dot stays at "magnetic north" on the card.
          mnMarker.style.transform = `rotate(${-smoothed}deg)`;
        }

        // Update magnetic heading numeric display
        const mhVal = document.getElementById('magnetic-heading-val');
        if (mhVal) {
          mhVal.textContent = smoothed.toFixed(1) + '°';
        }

        // Haptic feedback on alignment (debounced)
        if (aligned && navigator.vibrate && !this._lastAligned) {
          navigator.vibrate([30, 50, 30]);
        }
        this._lastAligned = aligned;
      }
    };

    window.addEventListener('deviceorientationabsolute', this.orientationHandler, true);
    window.addEventListener('deviceorientation', this.orientationHandler, true);
  },

  permissionPrompt() {
    return `
      <div class="permission-needed">
        <div class="permission-needed-icon"><i class="fas fa-location-dot"></i></div>
        <div class="permission-needed-title">${t('locationNeeded')}</div>
        <div class="permission-needed-desc">${t('locationDesc')}</div>
        <button class="btn-primary" onclick="PrayerPage.render(document.getElementById('main-content'))">
          ${t('grantPermission')}
        </button>
      </div>
    `;
  },

  cleanup() {
    if (this.orientationHandler) {
      window.removeEventListener('deviceorientation', this.orientationHandler);
      window.removeEventListener('deviceorientationabsolute', this.orientationHandler);
      this.orientationHandler = null;
    }
  },
};
