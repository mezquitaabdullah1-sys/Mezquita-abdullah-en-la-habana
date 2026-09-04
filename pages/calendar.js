// 🌙 Hijri + Gregorian Calendar — v16 (Masjid Abdullah design, no heavy emojis, real day matching)
// Design tokens from Masjid Abdullah's print calendar:
//   deep navy #0d2b4e · gold #d4a017 · Amiri serif · Lato sans
const CalendarPage = {
  monthOffset: 0, // 0 = current month; ±N = next/prev Gregorian month
  selectedDay: null,
  calendar: [],
  _loadToken: 0, // v19: race guard — only the latest loadMonth() may touch the DOM

  async render(container) {
    container.innerHTML = `
      <div class="cal-header-v16">
        <div class="cal-header-title" id="cal-title"></div>
        <div class="cal-header-sub" id="cal-sub"></div>
        <div class="cal-header-nav">
          <button class="cal-nav-btn" onclick="CalendarPage.changeMonth(-1)" aria-label="${t('prevMonth') || 'Mes anterior'}">‹</button>
          <button class="cal-nav-btn cal-today-btn" onclick="CalendarPage.goToToday()" aria-label="${t('today') || 'Hoy'}">${t('today') || 'Hoy'}</button>
          <button class="cal-nav-btn" onclick="CalendarPage.changeMonth(1)" aria-label="${t('nextMonth') || 'Mes siguiente'}">›</button>
        </div>
      </div>

      <div id="calendar-wrap" class="cal-wrap">
        ${Skeleton.calendar()}
      </div>

      <div id="selected-day-info"></div>

      <!-- Upcoming events countdowns -->
      <div id="cal-countdowns" class="cal-countdowns"></div>
    `;

    // v19: load into the WRAP, not the page container. Passing `container`
    // here made loadMonth overwrite the whole page markup (header included)
    // with the spinner, so the grid could never appear (endless loading).
    this.loadMonth(document.getElementById('calendar-wrap'));
  },

  formatMonth() {
    const d = new Date();
    d.setMonth(d.getMonth() + this.monthOffset);
    return d;
  },

  changeMonth(delta) {
    this.monthOffset += delta;
    const containerSel = document.getElementById('calendar-wrap');
    this.loadMonth(containerSel);
  },

  goToToday() {
    this.monthOffset = 0;
    const containerSel = document.getElementById('calendar-wrap');
    this.loadMonth(containerSel);
  },

  async loadMonth(containerSel) {
    // v19: token-based race guard. If the user navigates away (or taps another
    // month) while the API call is in flight, this invocation must NOT touch
    // the DOM afterwards — otherwise it throws on null elements and the
    // spinner stays forever ("calendar not opening / long loading" bug).
    const token = ++this._loadToken;
    const isStale = () => token !== this._loadToken
      || !document.getElementById('calendar-wrap')
      || !document.getElementById('cal-title');

    if (!containerSel) containerSel = document.getElementById('calendar-wrap');
    if (!containerSel) return;
    containerSel.innerHTML = Skeleton.calendar();

    const d = this.formatMonth();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    const langKey = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
    const monthNameGreg = d.toLocaleString(langKey === 'ar' ? 'ar-EG' : langKey, { month: 'long', year: 'numeric' });
    const titleEl = document.getElementById('cal-title');
    if (titleEl) titleEl.textContent = monthNameGreg;

    try {
      const data = await API.getHijriCalendarMonth(month, year);
      if (isStale()) return; // user navigated away or a newer load started
      this.calendar = data;
      // Hijri month for header: pick the one from the middle day (more reliable)
      const midDay = this.calendar[Math.floor(this.calendar.length / 2)];
      const hijriMonthName = midDay?.hijri?.month?.[langKey === 'ar' ? 'ar' : 'en'] || '';
      const hijriYear = midDay?.hijri?.year || '';
      const subEl = document.getElementById('cal-sub');
      if (subEl) subEl.textContent = `${hijriMonthName} ${hijriYear} هـ`;

      // Auto-select today if in this month
      const today = new Date();
      const isCurrentMonth = today.getMonth() + 1 === month && today.getFullYear() === year;
      this.selectedDay = isCurrentMonth
        ? this.calendar.find(dd => parseInt(dd.gregorian?.day, 10) === today.getDate())
        : this.calendar[0];

      const wrap = document.getElementById('calendar-wrap');
      if (!wrap) return;
      this.renderGrid(wrap);
      this.renderCountdowns();
    } catch (e) {
      console.warn('Calendar error:', e);
      if (isStale()) return;
      const wrap = document.getElementById('calendar-wrap');
      if (!wrap) return;
      wrap.innerHTML = UIState.error('CalendarPage.loadMonth()');
    }
  },

  renderGrid(container) {
    if (!container) container = document.getElementById('calendar-wrap');
    if (!container || !this.calendar || this.calendar.length === 0) return;
    const langKey = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
    const today = new Date();

    // Weekday headers: JS getDay() 0=Sun ... 6=Sat. We render Monday-first (Islamic week starts Monday).
    // Order: Mon Tue Wed Thu Fri Sat Sun
    const wd = {
      es: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
      ar: ['اثن','ثلا','أرب','خمي','جمع','سبت','أحد'],
      en: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    }[langKey] || ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];

    // First day of month → JS getDay() (0=Sun..6=Sat). Convert to Monday-first index.
    const firstDay = this.calendar[0];
    const gParts0 = firstDay.gregorian?.date?.split('-');
    const iso0 = `${gParts0[2]}-${gParts0[1].padStart(2,'0')}-${gParts0[0].padStart(2,'0')}`;
    const firstDow = new Date(iso0 + 'T00:00:00').getDay();
    const firstMondayIdx = (firstDow + 6) % 7; // Monday=0, Sunday=6
    const empties = Array(firstMondayIdx).fill(null);

    // Render header row: Mon-Sun order
    const headerOrder = [1,2,3,4,5,6,0]; // JS dow indices for Mon..Sun

    const gridHTML = [...empties.map(() => `<div class="cal-day-empty"></div>`),
      ...this.calendar.map((day, idx) => this.renderDay(day, idx, today, langKey))
    ].join('');

    container.innerHTML = `
      <div class="cal-month-block">
        <table class="cal-table">
          <thead>
            <tr>
              ${headerOrder.map((dow, i) => {
                const isFri = dow === 5;
                const isSat = dow === 6;
                return `<th class="${isFri ? 'fri' : (isSat ? 'sat' : '')}">${wd[i]}</th>`;
              }).join('')}
            </tr>
          </thead>
          <tbody>
            ${this.renderWeeks(empties, langKey)}
          </tbody>
        </table>
      </div>
    `;

    this.renderSelectedDay();
  },

  // Group days into weeks of 7, starting with empties for alignment
  renderWeeks(empties, langKey) {
    // v19: carry the day index explicitly instead of calendar.indexOf(cell)
    // inside the loop (was O(n²) per render — noticeable on low-end phones)
    const cells = [...empties.map(() => null), ...this.calendar];
    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) {
      const week = cells.slice(i, i + 7);
      // Pad last week
      while (week.length < 7) week.push(null);
      weeks.push(week);
    }
    const today = new Date();
    let dayIdx = 0; // running index into this.calendar — O(n) total
    return weeks.map(week => `
      <tr>
        ${week.map(cell => cell === null
          ? `<td><div class="cal-day-empty"></div></td>`
          : `<td>${this.renderDay(cell, dayIdx++, today, langKey)}</td>`
        ).join('')}
      </tr>
    `).join('');
  },

  renderDay(day, idx, today, langKey) {
    const gParts = day.gregorian?.date?.split('-');
    const iso = `${gParts[2]}-${gParts[1].padStart(2,'0')}-${gParts[0].padStart(2,'0')}`;
    const dateObj = new Date(iso + 'T00:00:00');
    const dayOfWeek = dateObj.getDay(); // 0=Sun..6=Sat

    const greg = parseInt(day.gregorian?.day, 10);
    const hijriDay = parseInt(day.hijri?.day, 10);
    const hijriMonth = parseInt(day.hijri?.month?.number, 10);

    // Today's flag
    const isToday = today.getDate() === greg
      && today.getMonth() + 1 === parseInt(day.gregorian?.month?.number, 10)
      && today.getFullYear() === parseInt(day.gregorian?.year, 10);
    const isSelected = this.selectedDay
      && this.selectedDay.gregorian?.date === day.gregorian?.date;

    // Day-type classification
    const type = this.classifyDay(hijriMonth, hijriDay, dayOfWeek, iso);

    // Build class list
    const cls = ['cal-day'];
    if (isToday) cls.push('is-today');
    if (isSelected) cls.push('is-selected');
    if (dayOfWeek === 5) cls.push('is-friday');
    if (dayOfWeek === 6) cls.push('is-saturday');
    if (type) cls.push('dc-' + type);
    if (hijriMonth === 9 && hijriDay >= 21) cls.push('is-last10');
    if (hijriMonth === 12 && hijriDay >= 1 && hijriDay <= 10) cls.push('is-tendh');

    // Event label (short, 2-line max)
    const evLabel = this.getEventLabel(hijriMonth, hijriDay, dayOfWeek, langKey);

    return `
      <div class="${cls.join(' ')}" onclick="CalendarPage.selectDay(${idx})" data-idx="${idx}" role="button" tabindex="0" aria-label="${escapeAttr(this._getAriaLabel(day, langKey))}">
        <div class="cal-day-gnum">${greg}</div>
        <div class="cal-day-hnum">${hijriDay}</div>
        ${evLabel ? `<div class="cal-day-event">${escapeHtml(evLabel)}</div>` : ''}
        ${isToday ? '<div class="cal-day-today-dot"></div>' : ''}
      </div>
    `;
  },

  _getAriaLabel(day, langKey) {
    const g = day.gregorian;
    const h = day.hijri;
    const wd = getWeekdayName(new Date(g.date.split('-').reverse().join('-') + 'T00:00:00').getDay(), langKey);
    return `${wd}, ${g.day} ${g.month.en}, ${h.day} ${h.month.en} ${h.year}`;
  },

  // Classify a Hijri day into a type
  classifyDay(hijriMonth, hijriDay, dayOfWeek, iso) {
    // Eid al-Fitr: Shawwal 1-3
    if (hijriMonth === 10 && hijriDay >= 1 && hijriDay <= 3) return 'eid';
    // Eid al-Adha: Dhul-Hijjah 10-13
    if (hijriMonth === 12 && hijriDay >= 10 && hijriDay <= 13) return 'eid';
    // Day of Arafah: Dhul-Hijjah 9
    if (hijriMonth === 12 && hijriDay === 9) return 'arafah';
    // First 10 of Dhul-Hijjah (1-8)
    if (hijriMonth === 12 && hijriDay >= 1 && hijriDay <= 8) return 'tendh';
    // Laylat al-Qadr probable: Ramadan 27
    if (hijriMonth === 9 && hijriDay === 27) return 'qadr';
    // Ramadan: month 9
    if (hijriMonth === 9) return 'ramadan';
    // Nisf Sha'ban: month 8, day 15
    if (hijriMonth === 8 && hijriDay === 15) return 'holy';
    // Isra & Mi'raj: month 7, day 27
    if (hijriMonth === 7 && hijriDay === 27) return 'holy';
    // Ashura: Muharram 10 (and 9=Tasu'a)
    if (hijriMonth === 1 && (hijriDay === 9 || hijriDay === 10)) return 'holy';
    // Islamic New Year: Muharram 1
    if (hijriMonth === 1 && hijriDay === 1) return 'newyear';
    // Mawlid an-Nabi: Rabi al-Awwal 12
    if (hijriMonth === 3 && hijriDay === 12) return 'holy';
    // White days: 13, 14, 15
    if ([13,14,15].includes(hijriDay)) return 'white';
    // Monday/Thursday recommended fasting
    if (dayOfWeek === 1 || dayOfWeek === 4) return 'fastweekday';
    return null;
  },

  getEventLabel(hijriMonth, hijriDay, dayOfWeek, langKey) {
    // Returns short label like "Eid" / "عيد" / "Eid al-Fitr"
    const labels = {
      eid_fitr:    { es:'Eid al-Fitr',      ar:'عيد الفطر',       en:'Eid al-Fitr' },
      eid_adha:    { es:'Eid al-Adha',      ar:'عيد الأضحى',       en:'Eid al-Adha' },
      arafah:      { es:'Arafa',            ar:'يوم عرفة',         en:'Arafah' },
      qadr:        { es:'Laylat al-Qadr',   ar:'ليلة القدر',       en:'Laylat al-Qadr' },
      ramadan:     { es:'Ramadán',          ar:'رمضان',            en:'Ramadan' },
      last10:      { es:'Últimos 10',       ar:'العشر الأواخر',    en:'Last 10 nights' },
      nisf_shaban: { es:'Nisf Sha\'bán',    ar:'ليلة النصف',       en:'Nisf Sha\'ban' },
      isra_miraj:  { es:'Isra y Mi\'raj',   ar:'الإسراء والمعراج', en:'Isra & Mi\'raj' },
      ashura:      { es:'Ashura',           ar:'عاشوراء',          en:'Ashura' },
      tasua:       { es:'Tasu\'a',          ar:'تاسوعاء',          en:'Tasu\'a' },
      newyear:     { es:'Año Nuevo Hijri',  ar:'رأس السنة',        en:'Hijri New Year' },
      mawlid:      { es:'Mawlid an-Nabi',   ar:'المولد النبوي',    en:'Mawlid an-Nabi' },
      white:       { es:'Día blanco',       ar:'الأيام البيض',     en:'White day' },
    };

    // Priority order for overlapping events
    if (hijriMonth === 10 && hijriDay === 1) return labels.eid_fitr[langKey];
    if (hijriMonth === 10 && hijriDay >= 2 && hijriDay <= 3) return labels.eid_fitr[langKey];
    if (hijriMonth === 12 && hijriDay === 9) return labels.arafah[langKey];
    if (hijriMonth === 12 && hijriDay === 10) return labels.eid_adha[langKey];
    if (hijriMonth === 12 && hijriDay >= 11 && hijriDay <= 13) return labels.eid_adha[langKey];
    if (hijriMonth === 12 && hijriDay >= 1 && hijriDay <= 8) return labels.tendh ? null : null; // generic marker only
    if (hijriMonth === 9 && hijriDay === 27) return labels.qadr[langKey];
    if (hijriMonth === 9 && hijriDay >= 21) return labels.last10[langKey];
    if (hijriMonth === 9) return labels.ramadan[langKey];
    if (hijriMonth === 8 && hijriDay === 15) return labels.nisf_shaban[langKey];
    if (hijriMonth === 7 && hijriDay === 27) return labels.isra_miraj[langKey];
    if (hijriMonth === 1 && hijriDay === 9) return labels.tasua[langKey];
    if (hijriMonth === 1 && hijriDay === 10) return labels.ashura[langKey];
    if (hijriMonth === 1 && hijriDay === 1) return labels.newyear[langKey];
    if (hijriMonth === 3 && hijriDay === 12) return labels.mawlid[langKey];
    if ([13,14,15].includes(hijriDay)) return labels.white[langKey];
    return null;
  },

  selectDay(idx) {
    this.selectedDay = this.calendar[idx];
    // Re-render grid to update 'is-selected' visual state
    const container = document.getElementById('calendar-wrap');
    if (container) this.renderGrid(container);
  },

  renderSelectedDay() {
    const info = document.getElementById('selected-day-info');
    if (!info || !this.selectedDay) return;

    const day = this.selectedDay;
    const hijriMonth = parseInt(day.hijri?.month?.number, 10);
    const hijriDay = parseInt(day.hijri?.day, 10);
    const langKey = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');

    const gParts = day.gregorian?.date?.split('-');
    const iso = `${gParts[2]}-${gParts[1].padStart(2,'0')}-${gParts[0].padStart(2,'0')}`;
    const dateObj = new Date(iso + 'T00:00:00');
    const dayOfWeek = dateObj.getDay();

    const weekdayName = getWeekdayName(dayOfWeek, langKey);
    const holidayName = getHolidayName(hijriMonth, hijriDay, langKey);
    const virtue = getDailyVirtue(hijriMonth, hijriDay, dayOfWeek, langKey);

    // Official 2026 calendar data (Mosque Abdullah Havana) — if exists
    let officialInfo = null;
    try {
      if (typeof getCalendarInfo === 'function') {
        officialInfo = getCalendarInfo(iso);
      }
    } catch (e) {}

    const hijriMonthName = day.hijri?.month?.[langKey === 'ar' ? 'ar' : 'en'] || '';

    info.innerHTML = `
      <div class="card selected-day-card">
        <div class="selected-day-header">
          <div>
            <div class="selected-day-greg">${escapeHtml(weekdayName)}, ${day.gregorian?.day} ${escapeHtml(day.gregorian?.month?.en || '')} ${day.gregorian?.year || ''}</div>
            <div class="selected-day-hijri">${day.hijri?.day} ${escapeHtml(hijriMonthName)} ${day.hijri?.year} هـ</div>
          </div>
          ${holidayName ? `<div class="holiday-badge">${escapeHtml(holidayName)}</div>` : ''}
        </div>

        ${dayOfWeek === 5 ? `
          <div class="jumuah-notice">
            <div class="jumuah-notice-title"><i class="fas fa-mosque"></i> ${t('jumuahNoticeTitle') || '⚠️ Aviso importante — Oración del Jumuah'}</div>
            <div class="jumuah-notice-body">${t('jumuahNoticeBody') || 'La oración del Jumuah es a las 2:10 PM hora de La Habana.'}</div>
            <div class="jumuah-notice-time"><i class="fas fa-clock"></i> ${t('jumuahNoticeTime') || '2:10 PM — La Habana'}</div>
          </div>
        ` : ''}

        ${officialInfo ? `
          <div class="virtue-box" style="border-left-color:#D4AF37;">
            <div class="virtue-box-title">${officialInfo['title_'+langKey] || officialInfo.title_es || ''}</div>
            <div class="virtue-box-text">${escapeHtml(officialInfo['virtue_'+langKey] || officialInfo.virtue_es || '')}</div>
            ${(officialInfo['quote_'+langKey] || officialInfo.quote_es) ? `<div class="virtue-box-quote">"${escapeHtml(officialInfo['quote_'+langKey] || officialInfo.quote_es)}"</div>` : ''}
            <div class="virtue-box-source">— ${escapeHtml(officialInfo['reference_'+langKey] || officialInfo.reference_es || '')}</div>
          </div>
        ` : (virtue ? `
          <div class="virtue-box">
            <div class="virtue-box-title">${escapeHtml(virtue.title)}</div>
            <div class="virtue-box-text">${escapeHtml(virtue.verse)}</div>
            <div class="virtue-box-source">— ${escapeHtml(virtue.source)}</div>
          </div>
        ` : '')}
      </div>
    `;
  },

  // === Upcoming events with "days left" countdowns ===
  renderCountdowns() {
    const wrap = document.getElementById('cal-countdowns');
    if (!wrap) return;
    const langKey = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');

    const events = this._computeUpcomingEvents();
    if (events.length === 0) {
      wrap.innerHTML = '';
      return;
    }

    const daysLeftLabel = { es: 'días', ar: 'أيام', en: 'days' }[langKey];
    const leftLabel = { es: 'quedan', ar: 'متبقٍ', en: 'left' }[langKey];

    wrap.innerHTML = `
      <div class="countdowns-title">${langKey === 'ar' ? 'مناسبات قادمة' : (langKey === 'en' ? 'Upcoming occasions' : 'Próximas ocasiones')}</div>
      <div class="countdowns-grid">
        ${events.map(ev => `
          <div class="countdown-card" style="border-left-color:${ev.color};">
            <div class="countdown-icon">${ev.icon}</div>
            <div class="countdown-info">
              <div class="countdown-name">${escapeHtml(ev.name[langKey])}</div>
              <div class="countdown-date">${ev.hijriDate} · ${ev.gregDate}</div>
              <div class="countdown-days">${ev.daysLeft === 0
                ? (langKey==='ar' ? 'اليوم' : (langKey==='en' ? 'Today' : 'Hoy'))
                : `${leftLabel} ${ev.daysLeft} ${daysLeftLabel}`}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  _computeUpcomingEvents() {
    // Use known Hijri calendar dates for 1447-1449 AH
    // Format: { hMonth, hDay, name:{es,ar,en}, color, icon, gregEstimate }
    const defs = [
      { h: 1,  d: 1,  key: 'hijri_new_year',   color: '#8E6E1E', icon: '<i class="fas fa-star"></i>', name: { es:'Año Nuevo Islámico', ar:'رأس السنة الهجرية', en:'Islamic New Year' } },
      { h: 1,  d: 10, key: 'ashura',            color: '#7E57C2', icon: '<i class="fas fa-mosque"></i>', name: { es:'Ashura', ar:'عاشوراء', en:'Ashura' } },
      { h: 3,  d: 12, key: 'mawlid',            color: '#1A6B52', icon: '<i class="fas fa-heart"></i>', name: { es:'Mawlid an-Nabi ﷺ', ar:'المولد النبوي', en:'Mawlid an-Nabi' } },
      { h: 7,  d: 27, key: 'isra_miraj',        color: '#5C6BC0', icon: '<i class="fas fa-meteor"></i>', name: { es:'Isra y Mi\'raj', ar:'الإسراء والمعراج', en:'Isra & Mi\'raj' } },
      { h: 8,  d: 15, key: 'nisf_shaban',       color: '#9575CD', icon: '<i class="fas fa-sparkles"></i>', name: { es:'Laylat al-Bara\'ah', ar:'ليلة البراءة', en:'Laylat al-Bara\'ah' } },
      { h: 9,  d: 1,  key: 'ramadan_start',     color: '#0F4C3A', icon: '<i class="fas fa-moon"></i>', name: { es:'Inicio de Ramadán', ar:'أول رمضان', en:'Ramadan starts' } },
      { h: 9,  d: 21, key: 'last10_start',      color: '#047857', icon: '<i class="fas fa-mosque"></i>', name: { es:'Últimos 10 de Ramadán', ar:'العشر الأواخر', en:'Last 10 of Ramadan' } },
      { h: 9,  d: 27, key: 'laylat_qadr',       color: '#5b21b6', icon: '<i class="fas fa-star"></i>', name: { es:'Laylat al-Qadr', ar:'ليلة القدر', en:'Laylat al-Qadr' } },
      { h: 10, d: 1,  key: 'eid_fitr',          color: '#D4AF37', icon: '<i class="fas fa-star-and-crescent"></i>', name: { es:'Eid al-Fitr', ar:'عيد الفطر', en:'Eid al-Fitr' } },
      { h: 12, d: 1,  key: 'tendh_start',       color: '#b8923a', icon: '<i class="fas fa-moon"></i>', name: { es:'Inicio Diez de Dhul-Hijjah', ar:'أول عشر ذي الحجة', en:'First 10 Dhul-Hijjah' } },
      { h: 12, d: 9,  key: 'arafah',            color: '#15803d', icon: '<i class="fas fa-mountain"></i>', name: { es:'Día de Arafa', ar:'يوم عرفة', en:'Day of Arafah' } },
      { h: 12, d: 10, key: 'eid_adha',          color: '#D4AF37', icon: '<i class="fas fa-paw"></i>', name: { es:'Eid al-Adha', ar:'عيد الأضحى', en:'Eid al-Adha' } },
    ];

    const today = new Date();
    today.setHours(0,0,0,0);
    const todayMs = today.getTime();

    // v19: fixed countdown math. Old code mixed months+days
    // (`(h-1)+(d-1)` × 29.5) and anchored ONLY to Hijri year 1447, so dates
    // were off by weeks and events never rolled into the current Hijri year.
    // Now: compute the event's next occurrence in the CURRENT or NEXT Hijri
    // year, using 1 Muharram 1447 ≈ 2025-06-25 as epoch anchor.
    const currentHijriYear = (typeof API !== 'undefined' && typeof API._gregorianToHijri === 'function')
      ? API._gregorianToHijri(new Date()).year
      : 1447;
    const anchor1447 = new Date('2025-06-25T00:00:00'); // 1 Muharram 1447
    const AVG_HIJRI_YEAR = 354.367;   // days per Hijri year (30-year cycle average)
    const AVG_HIJRI_MONTH = 29.5306;  // days per lunar month

    const out = [];
    for (const def of defs) {
      for (const hYear of [currentHijriYear, currentHijriYear + 1]) {
        const approxDays = Math.round(
          (hYear - 1447) * AVG_HIJRI_YEAR + (def.h - 1) * AVG_HIJRI_MONTH + (def.d - 1)
        );
        const targetGreg = new Date(anchor1447.getTime() + approxDays * 86400000);
        const diffDays = Math.round((targetGreg.getTime() - todayMs) / 86400000);
        if (diffDays >= 0) { // next occurrence found
          out.push({
            ...def,
            daysLeft: diffDays,
            gregDate: targetGreg.toLocaleDateString(currentLocale === 'ar' ? 'ar-EG' : currentLocale, { month:'short', day:'numeric' }),
            hijriDate: `${def.d}/${def.h}/${hYear}`,
          });
          break;
        }
      }
    }
    // Sort by days left
    out.sort((a, b) => a.daysLeft - b.daysLeft);
    return out.slice(0, 8);
  },

  cleanup() {},
};
