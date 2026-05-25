/* ============================================
   Islamic Calendar - Hijri / Gregorian
   FIXED: Uses CSS Grid (7 columns) reliably
   FIXED: Local Hijri calculation (no API needed) + works on file://
   Keeps virtue/info modal on click
   ============================================ */

let calCurrentDate = new Date();

const HIJRI_MONTHS = {
    es: ["Muharram","Safar","Rabi' al-Awwal","Rabi' al-Thani","Jumada al-Awwal","Jumada al-Thani","Rajab","Sha'ban","Ramadan","Shawwal","Dhu al-Qi'dah","Dhu al-Hijjah"],
    en: ["Muharram","Safar","Rabi' al-Awwal","Rabi' al-Thani","Jumada al-Awwal","Jumada al-Thani","Rajab","Sha'ban","Ramadan","Shawwal","Dhu al-Qi'dah","Dhu al-Hijjah"],
    ar: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"],
    fr: ["Mouharram","Safar","Rabi' al-Awwal","Rabi' al-Thani","Joumada al-Awwal","Joumada al-Thani","Rajab","Cha'ban","Ramadan","Chawwal","Dhou al-Qi'dah","Dhou al-Hijjah"]
};

const GREG_MONTHS = {
    es: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    ar: ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
    fr: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
};

const WEEKDAYS_FULL = {
    es: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
    en: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    ar: ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],
    fr: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi']
};

const WEEKDAYS_SHORT = {
    es: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
    en: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    ar: ['أحد','إثن','ثلا','أرب','خمي','جمع','سبت'],
    fr: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']
};

function fmtDate(year, month, day) {
    return `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}

/* ---------- Hijri conversion (Umm al-Qura / Kuwaiti algorithm) ---------- */
/* Local computation – no network required, works offline & on file:// */
function gregorianToJulianDay(y, m, d) {
    if (m < 3) { y -= 1; m += 12; }
    const a = Math.floor(y / 100);
    const b = 2 - a + Math.floor(a / 4);
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + b - 1524.5;
}

function gregorianToHijri(year, month, day) {
    const jd = gregorianToJulianDay(year, month, day) + 0.5;
    const daysSinceEpoch = jd - 1948439.5;
    let hYear = Math.floor((30 * daysSinceEpoch + 10646) / 10631);
    let hMonth, hDay;
    // Find the correct Hijri month
    for (hMonth = 1; hMonth <= 12; hMonth++) {
        const firstDayOfMonth = hijriToJulianDay(hYear, hMonth, 1);
        const firstDayOfNext = hijriToJulianDay(hYear, hMonth + 1, 1);
        if (jd >= firstDayOfMonth && jd < firstDayOfNext) {
            hDay = Math.floor(jd - firstDayOfMonth) + 1;
            return { year: hYear, month: hMonth, day: hDay };
        }
    }
    // Fallback
    return { year: hYear, month: 1, day: 1 };
}

function hijriToJulianDay(year, month, day) {
    return Math.floor((11 * year + 3) / 30) + 354 * year + 30 * month - Math.floor((month - 1) / 2) + day + 1948440 - 386;
}

/* ---------- Today display ---------- */
function updateToday() {
    const today = new Date();
    const lang = (window.currentLanguage || localStorage.getItem('mezquita_lang') || 'es');
    const hijri = gregorianToHijri(today.getFullYear(), today.getMonth() + 1, today.getDate());

    const hijriEl = document.getElementById('todayHijri');
    if (hijriEl) {
        const wd = WEEKDAYS_FULL[lang][today.getDay()];
        const mIdx = hijri.month - 1;
        hijriEl.textContent = `${wd}, ${hijri.day} ${HIJRI_MONTHS[lang][mIdx]} ${hijri.year} ${lang === 'ar' ? 'هـ' : 'AH'}`;
    }

    const gEl = document.getElementById('todayGregorian');
    if (gEl) {
        gEl.textContent = `${today.getDate()} ${GREG_MONTHS[lang][today.getMonth()]} ${today.getFullYear()}`;
    }
}

/* ---------- Calendar render (CSS Grid layout) ---------- */
function renderCalendar() {
    const lang = (window.currentLanguage || localStorage.getItem('mezquita_lang') || 'es');
    const year = calCurrentDate.getFullYear();
    const month = calCurrentDate.getMonth();
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

    // Hijri label (use middle of month for accuracy)
    const midHijri = gregorianToHijri(year, month + 1, 15);
    const monthLabel = document.getElementById('currentMonth');
    if (monthLabel) {
        const hijriLabel = ` · ${HIJRI_MONTHS[lang][midHijri.month - 1]} ${midHijri.year}`;
        monthLabel.textContent = `${GREG_MONTHS[lang][month]} ${year}${hijriLabel}`;
    }

    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Container: rebuild the table as a CSS grid for reliable layout
    let grid = document.getElementById('calendarGrid');
    const oldTable = document.getElementById('calendarTable');
    if (!grid) {
        // Replace the table with a div grid
        if (oldTable) {
            const wrapper = oldTable.parentElement;
            const newGrid = document.createElement('div');
            newGrid.id = 'calendarGrid';
            newGrid.className = 'cal-grid';
            wrapper.appendChild(newGrid);
            oldTable.style.display = 'none';
            grid = newGrid;
        } else {
            console.error('Calendar container not found');
            return;
        }
    }

    grid.innerHTML = '';

    // Day headers
    const headers = WEEKDAYS_SHORT[lang];
    headers.forEach((wd, idx) => {
        const cell = document.createElement('div');
        cell.className = 'cal-head' + (idx === 5 ? ' friday-col' : '') + (idx === 6 ? ' sat-col' : '');
        cell.textContent = wd;
        grid.appendChild(cell);
    });

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'cal-day cal-empty';
        grid.appendChild(empty);
    }

    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = fmtDate(year, month, day);
        const dayDate = new Date(year, month, day);
        const wd = dayDate.getDay();
        const isFriday = wd === 5;
        const isToday = isCurrentMonth && today.getDate() === day;

        // Determine event key
        let infoKey = 'regular';
        if (typeof EVENTS_MAP !== 'undefined' && EVENTS_MAP[dateStr]) {
            infoKey = EVENTS_MAP[dateStr];
        } else if (isFriday) {
            infoKey = 'friday';
        }

        const cell = document.createElement('div');
        const classes = ['cal-day'];
        if (isToday) classes.push('today');
        if (isFriday) classes.push('friday-cell');
        if (['ramadan','ramadan_start','last_ten_ramadan'].includes(infoKey)) classes.push('ramadan-cell');
        if (['eid_fitr','eid_adha'].includes(infoKey)) classes.push('eid-cell');
        if (['isra_miraj','nisf_shaban','laylat_qadr','arafah','ashura','hijri_new_year','mawlid'].includes(infoKey)) classes.push('holy-cell');
        if (infoKey === 'white_days') classes.push('white-cell');
        cell.className = classes.join(' ');
        cell.dataset.date = dateStr;
        cell.dataset.info = infoKey;
        cell.dataset.weekday = wd;

        // Hijri day (local calculation)
        const hijri = gregorianToHijri(year, month + 1, day);
        cell.dataset.h = hijri.day;
        cell.dataset.hMonth = hijri.month;
        cell.dataset.hYear = hijri.year;

        const hasEvent = infoKey !== 'regular';
        cell.innerHTML = `
            <span class="g-num">${day}</span>
            <span class="h-num">${hijri.day}</span>
            ${hasEvent ? '<span class="info-icon"><i class="fas fa-star-and-crescent"></i></span>' : ''}
        `;

        cell.addEventListener('click', () => openDayModal(cell));
        grid.appendChild(cell);
    }
}

/* ---------- Day modal ---------- */
function openDayModal(cell) {
    const lang = (window.currentLanguage || localStorage.getItem('mezquita_lang') || 'es');
    const infoKey = cell.dataset.info || 'regular';
    const dateStr = cell.dataset.date;
    const wd = parseInt(cell.dataset.weekday);
    const h = cell.dataset.h || '--';
    const hMonth = parseInt(cell.dataset.hMonth);
    const hYear = cell.dataset.hYear;

    const info = (typeof ISLAMIC_INFO !== 'undefined' && ISLAMIC_INFO[infoKey])
        ? ISLAMIC_INFO[infoKey]
        : (typeof ISLAMIC_INFO !== 'undefined' ? ISLAMIC_INFO['regular'] : null);

    if (!info) return;

    const [yy, mm, dd] = dateStr.split('-').map(Number);
    const wdName = WEEKDAYS_FULL[lang][wd];
    const monthName = GREG_MONTHS[lang][mm - 1];
    const hMonthName = HIJRI_MONTHS[lang][hMonth - 1] || '';

    const dateBar = document.getElementById('modalDateBar');
    if (dateBar) {
        dateBar.innerHTML = `<strong>${wdName}</strong> · ${dd} ${monthName} ${yy} · <span class="hijri-tag">${h} ${hMonthName} ${hYear} ${lang === 'ar' ? 'هـ' : 'H'}</span>`;
    }

    const isArabic = lang === 'ar';
    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || ''; };
    setText('modalTitle', isArabic ? info.title_ar : info.title_es);
    setText('modalVirtue', isArabic ? info.virtue_ar : info.virtue_es);
    setText('modalQuoteAr', info.quote_ar);
    setText('modalQuoteTrans', isArabic ? '' : info.quote_es);
    setText('modalQuoteRef', info.ref);

    const modal = document.getElementById('dayModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeDayModal() {
    const modal = document.getElementById('dayModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

/* ---------- Upcoming events summary ---------- */
const KEY_EVENTS = ['ramadan_start','laylat_qadr','eid_fitr','arafah','eid_adha','hijri_new_year','ashura','mawlid','isra_miraj','nisf_shaban'];

const EVENT_ICONS = {
    ramadan_start: 'fa-moon', laylat_qadr: 'fa-star', eid_fitr: 'fa-gift',
    arafah: 'fa-mountain', eid_adha: 'fa-kaaba', hijri_new_year: 'fa-calendar-plus',
    ashura: 'fa-droplet', mawlid: 'fa-heart', isra_miraj: 'fa-rocket', nisf_shaban: 'fa-moon'
};

function renderUpcomingEvents() {
    const grid = document.getElementById('upcomingEventsGrid');
    if (!grid || typeof EVENTS_MAP === 'undefined') return;
    const lang = (window.currentLanguage || localStorage.getItem('mezquita_lang') || 'es');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get the FIRST upcoming occurrence of each key event (deduplication)
    const found = {};
    Object.keys(EVENTS_MAP).sort().forEach(ds => {
        const ev = EVENTS_MAP[ds];
        if (!KEY_EVENTS.includes(ev)) return;
        if (found[ev]) return; // ALREADY HAVE THE FIRST UPCOMING — skip duplicates
        const [y, m, d] = ds.split('-').map(Number);
        const dt = new Date(y, m - 1, d);
        if (dt >= today) found[ev] = { dateStr: ds, dt };
    });

    const items = Object.entries(found)
        .map(([key, val]) => ({ key, ...val }))
        .sort((a, b) => a.dt - b.dt)
        .slice(0, 8);

    if (!items.length) {
        grid.innerHTML = `<p class="upcoming-empty" style="text-align:center;color:#666;grid-column:1/-1;padding:30px;">No hay próximos eventos islámicos en los datos cargados.</p>`;
        return;
    }

    grid.innerHTML = items.map(it => {
        const info = ISLAMIC_INFO[it.key];
        if (!info) return '';
        const isAr = lang === 'ar';
        const title = isAr ? info.title_ar : info.title_es;
        const hijri = gregorianToHijri(it.dt.getFullYear(), it.dt.getMonth() + 1, it.dt.getDate());
        const gDay = it.dt.getDate();
        const gMonthName = GREG_MONTHS[lang][it.dt.getMonth()];
        const gYear = it.dt.getFullYear();
        const wdName = WEEKDAYS_FULL[lang][it.dt.getDay()];
        const hijriLabel = `${hijri.day} ${HIJRI_MONTHS[lang][hijri.month - 1]} ${hijri.year} ${isAr ? 'هـ' : 'AH'}`;
        const daysLeft = Math.ceil((it.dt - today) / (1000 * 60 * 60 * 24));
        const icon = EVENT_ICONS[it.key] || 'fa-star-and-crescent';
        const daysLabel = isAr ? `بعد ${daysLeft} يوم` : (lang === 'en' ? `In ${daysLeft} days` : (lang === 'fr' ? `Dans ${daysLeft} jours` : `En ${daysLeft} días`));
        const todayLabel = isAr ? 'اليوم' : (lang === 'en' ? 'Today' : (lang === 'fr' ? "Aujourd'hui" : 'Hoy'));

        return `
            <div class="upcoming-card ${it.key}">
                <div class="up-card-icon"><i class="fas ${icon}"></i></div>
                <div class="up-card-body">
                    <span class="up-card-countdown">${daysLeft === 0 ? todayLabel : daysLabel}</span>
                    <h3 class="up-card-title">${title}</h3>
                    <div class="up-card-dates">
                        <div class="up-date greg"><i class="far fa-calendar"></i> ${wdName}, ${gDay} ${gMonthName} ${gYear}</div>
                        <div class="up-date hijri"><i class="fas fa-moon"></i> ${hijriLabel}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/* ---------- Init ---------- */
function initCalendarPage() {
    if (!document.getElementById('calendarTable') && !document.getElementById('calendarGrid')) return;

    updateToday();
    renderCalendar();
    renderUpcomingEvents();

    document.getElementById('prevMonth')?.addEventListener('click', () => {
        calCurrentDate.setMonth(calCurrentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('nextMonth')?.addEventListener('click', () => {
        calCurrentDate.setMonth(calCurrentDate.getMonth() + 1);
        renderCalendar();
    });

    document.getElementById('modalClose')?.addEventListener('click', closeDayModal);
    document.getElementById('dayModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'dayModal') closeDayModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDayModal();
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalendarPage);
} else {
    initCalendarPage();
}

document.addEventListener('languageChanged', () => {
    updateToday();
    renderCalendar();
    renderUpcomingEvents();
});
