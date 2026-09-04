// 🏠 Pantalla de Inicio
const HomePage = {
  countdownInterval: null,

  async render(container, params = {}, navToken = null) {
    // v19: if the user navigates away while we await APIs, do NOT touch the
    // DOM afterwards — otherwise a late Home render wipes the new page
    // (this was the root cause of "calendar not opening / stuck loading").
    const isStale = () => navToken !== null && typeof Router !== 'undefined' && !Router.isCurrent(navToken);

    container.innerHTML = Skeleton.home();

    try {
      const loc = AppState.location || await LocationService.getCurrent();
      if (isStale()) return;
      AppState.location = loc;

      const [timings, hijri] = await Promise.all([
        API.getPrayerTimes(loc.latitude, loc.longitude, new Date(), AppState.settings.calculationMethod),
        API.gregorianToHijri(),
      ]);
      if (isStale()) return;

      AppState.timings = timings.timings;
      AppState.hijri = hijri;

      // Use curated famous verses with wisdom (not random)
      const verse = getFamousVerseOfTheDay();
      const dua = getDuaOfTheDay();
      const virtue = hijri ? getDailyVirtue(
        parseInt(hijri.month?.number, 10),
        parseInt(hijri.day, 10),
        new Date().getDay()
      ) : null;

      this.renderContent(container, loc, timings.timings, hijri, verse, dua, virtue);
      this.startCountdown();
    } catch (e) {
      console.warn('Home error:', e);
      if (isStale()) return;
      // v21: skeleton offline — no perder el saludo ni la posibilidad de
      // reintentar solo porque falló todo lo demás (ubicación/red/etc.)
      const offline = !navigator.onLine;
      container.innerHTML = `
        <div class="home-header">
          <div class="home-top">
            <div>
              <div class="home-greeting">${getGreetingByHour()}</div>
            </div>
          </div>
        </div>
        ${UIState.error("HomePage.render(document.getElementById('main-content'))", offline ? t('offlineHomeDesc') : t('locationDesc'))}
      `;
    }
  },

  renderContent(container, loc, timings, hijri, verse, dua, virtue) {
    const dailyPrayers = getDailyPrayers(timings);
    const nextPrayer = getNextPrayer(timings);
    const isEstimated = !!(timings && timings._estimated) || !!(hijri && hijri._estimated);
    // v26: progreso del check-in diario de oraciones (se reinicia cada día)
    const doneCount = (typeof PrayerTracker !== 'undefined') ? PrayerTracker.doneCount() : 0;
    const totalCount = (typeof PrayerTracker !== 'undefined') ? PrayerTracker.totalCount() : 5;

    container.innerHTML = `
      <div class="home-header">
        <div class="home-top">
          <div>
            <div class="home-greeting">${getGreetingByHour()}</div>
            <div class="home-location"><i class="fas fa-location-dot"></i> ${escapeHtml(loc.city || '')}${loc.country ? ', ' + escapeHtml(loc.country) : ''}</div>
            ${hijri ? `<div class="home-hijri">${hijri.day} ${hijri.month?.en} ${hijri.year} هـ</div>` : ''}
          </div>
          <button class="home-profile-btn" onclick="Router.go('profile')">
            <i class="fas fa-user-circle"></i>
          </button>
        </div>

        ${nextPrayer ? `
          <div class="next-prayer-card">
            <div class="next-prayer-label">${t('nextPrayer')}</div>
            <div class="next-prayer-name">${t('prayers.' + nextPrayer.name)}</div>
            <div class="next-prayer-countdown" id="countdown">${formatCountdown(nextPrayer.diffMs)}</div>
            <div class="next-prayer-time">${formatTime12h(nextPrayer.time)}</div>
            ${isEstimated ? `<div class="estimated-badge"><i class="fas fa-wifi-slash"></i> ${t('estimatedTimes')}</div>` : ''}
          </div>
        ` : ''}
      </div>

      <!-- Two prominent CTA buttons: Hijri Calendar + Prayer Table -->
      <div class="home-cta-row">
        <button class="hijri-cta-btn" onclick="Router.go('calendar')">
          <div class="hijri-cta-icon"><i class="fas fa-moon"></i></div>
          <div class="hijri-cta-content">
            <div class="hijri-cta-title">${t('hijriCalendar')}</div>
            <div class="hijri-cta-date">${hijri ? `${hijri.day} ${hijri.month?.ar || hijri.month?.en} ${hijri.year} هـ` : ''}</div>
          </div>
        </button>

        <button class="prayer-table-cta-btn" onclick="Router.go('prayer',{tab:'monthly'})">
          <div class="hijri-cta-icon"><i class="fas fa-chart-column"></i></div>
          <div class="hijri-cta-content">
            <div class="hijri-cta-title">${t('prayerTable') || 'Tabla de oraciones'}</div>
            <div class="hijri-cta-date">${t('viewMonth') || 'Vista mensual'}</div>
          </div>
        </button>
      </div>

      <div style="padding: var(--sp-md);">
        <!-- Oraciones del día -->
        <h2 class="section-title">${t('todayPrayers')}
          <span class="prayer-checkin-progress" title="${t('prayerCheckinTitle')}">${doneCount}/${totalCount} ✔</span>
        </h2>
        <div class="card prayers-card">
          ${dailyPrayers.map(p => {
            const canCheck = (typeof PrayerTracker !== 'undefined') && PrayerTracker.PRAYERS.includes(p.name);
            const isDone = canCheck && PrayerTracker.isDone(p.name);
            return `
            <div class="prayer-row ${nextPrayer?.name === p.name ? 'next' : ''} ${isDone ? 'prayer-done' : ''}">
              <span class="prayer-emoji">${getPrayerEmoji(p.name)}</span>
              <div class="prayer-name-block">
                <div class="prayer-name">${t('prayers.' + p.name)}</div>
                <div class="prayer-arabic">${this.prayerArabic(p.name)}</div>
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
        </div>

        <!-- Famous Verse of the Day with Wisdom -->
        ${verse ? `
          <h2 class="section-title"><i class="fas fa-book-open-reader"></i> ${t('verseOfDay')}</h2>
          <div class="card-gradient">
            <div class="verse-arabic">${escapeHtml(verse.arabic)}</div>
            <div class="verse-translit">${escapeHtml(verse.transliteration)}</div>
            <div class="verse-divider"></div>
            <div class="verse-translation">"${escapeHtml(verse['translation_' + (AppState.settings.locale || 'es')] || verse.translation_es)}"</div>
            <div class="verse-source">— ${escapeHtml(verse.surahName)} ${verse.surahNumber}:${verse.ayahNumber}</div>
            <div class="verse-wisdom">
              <i class="fas fa-lightbulb"></i>
              <span>${escapeHtml(verse['wisdom_' + (AppState.settings.locale || 'es')] || verse.wisdom_es)}</span>
            </div>
          </div>
        ` : ''}

        <!-- Du'a del día -->
        <h2 class="section-title"><i class="fas fa-hands-praying"></i> ${t('duaOfDay')}</h2>
        <div class="card">
          <div class="dua-title">${dua.title}</div>
          <div class="dua-arabic">${dua.arabic}</div>
          <div class="dua-transliteration">${dua.transliteration}</div>
          <div class="dua-translation">"${dua.translation}"</div>
          <div class="dua-source">— ${dua.source}</div>
        </div>

        <!-- Virtud del día -->
        ${virtue ? `
          <h2 class="section-title"><i class="fas fa-sparkles"></i> ${virtue.title}</h2>
          <div class="card virtue-card">
            <div class="virtue-text">${virtue.verse}</div>
            <div class="virtue-source">— ${virtue.source}</div>
          </div>
        ` : ''}

      </div>
    `;
  },

  // v26: marcar/desmarcar una oración como realizada (check-in diario).
  // El estado se guarda por fecha: mañana las casillas vuelven a estar vacías.
  toggleCheckin(name, btn) {
    if (typeof PrayerTracker === 'undefined') return;
    const nowDone = PrayerTracker.toggle(name);
    if (btn) {
      btn.classList.toggle('checked', nowDone);
      btn.setAttribute('aria-pressed', nowDone);
      const row = btn.closest('.prayer-row');
      if (row) row.classList.toggle('prayer-done', nowDone);
    }
    // Actualizar el contador del encabezado (X/5 ✔)
    const prog = document.querySelector('.prayer-checkin-progress');
    if (prog) prog.textContent = `${PrayerTracker.doneCount()}/${PrayerTracker.totalCount()} ✔`;
    if (navigator.vibrate) navigator.vibrate(30);
    if (nowDone) {
      showToast('✔️ ' + (t('prayerDoneToast') || ''), 1800);
      if (PrayerTracker.doneCount() === PrayerTracker.totalCount()) {
        showToast('🎉 ' + (t('allPrayersDoneToast') || ''), 3000);
      }
    }
  },

  prayerArabic(name) {
    const map = {
      Fajr: 'الفجر', Sunrise: 'الشروق', Dhuhr: 'الظهر',
      Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء',
    };
    return map[name] || '';
  },

  progressRing(progress, icon, label, value, color) {
    const r = 32;
    const circ = 2 * Math.PI * r;
    const offset = circ * (1 - progress);
    return `
      <div class="progress-ring-container">
        <div class="progress-ring-wrapper">
          <svg class="progress-ring-svg" width="80" height="80">
            <circle class="progress-ring-bg" cx="40" cy="40" r="${r}"></circle>
            <circle class="progress-ring-fg" cx="40" cy="40" r="${r}"
                    style="stroke: ${color}; stroke-dasharray: ${circ}; stroke-dashoffset: ${offset};"></circle>
          </svg>
          <div class="progress-ring-center">
            <div>${icon}</div>
            <div class="progress-ring-value">${value}</div>
          </div>
        </div>
        <div class="progress-ring-label">${label}</div>
      </div>
    `;
  },

  startCountdown() {
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    this.countdownInterval = setInterval(() => {
      const el = document.getElementById('countdown');
      if (!el || !AppState.timings) return;
      const np = getNextPrayer(AppState.timings);
      if (np) el.textContent = formatCountdown(np.diffMs);
    }, 1000);
  },

  cleanup() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  },
};
