/* ============================================
   Islamic Calendar - Hijri / Gregorian
   With virtue/event info per day
   ============================================ */

let calCurrentDate = new Date();

const HIJRI_MONTHS = {
    es: ['Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani', 'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'],
    en: ['Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani', 'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'],
    ar: ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الثانية', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'],
    fr: ['Mouharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani', 'Joumada al-Awwal', 'Joumada al-Thani', 'Rajab', 'Cha\'ban', 'Ramadan', 'Chawwal', 'Dhou al-Qi\'dah', 'Dhou al-Hijjah']
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

// Format date YYYY-MM-DD
function fmtDate(year, month, day) {
    return `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}

// Fetch Hijri date via Aladhan API (with localStorage cache)
async function gToH(date) {
    const dateStr = `${String(date.getDate()).padStart(2,'0')}-${String(date.getMonth()+1).padStart(2,'0')}-${date.getFullYear()}`;
    const cacheKey = `hijri_${dateStr}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        try { return JSON.parse(cached); } catch(e) {}
    }
    try {
        const r = await fetch(`https://api.aladhan.com/v1/gToH/${dateStr}`);
        const d = await r.json();
        if (d.data && d.data.hijri) {
            localStorage.setItem(cacheKey, JSON.stringify(d.data.hijri));
            return d.data.hijri;
        }
    } catch (e) {
        console.error('Hijri fetch error', e);
    }
    return null;
}

// Update today display
async function updateToday() {
    const today = new Date();
    const lang = currentLanguage || 'es';
    const hijri = await gToH(today);
    
    const hijriEl = document.getElementById('todayHijri');
    if (hijriEl && hijri) {
        const wd = WEEKDAYS_FULL[lang][today.getDay()];
        const monthIdx = parseInt(hijri.month.number) - 1;
        hijriEl.textContent = `${wd}, ${hijri.day} ${HIJRI_MONTHS[lang][monthIdx]} ${hijri.year} ${lang === 'ar' ? 'هـ' : 'AH'}`;
    }
    
    const gEl = document.getElementById('todayGregorian');
    if (gEl) {
        gEl.textContent = `${today.getDate()} ${GREG_MONTHS[lang][today.getMonth()]} ${today.getFullYear()}`;
    }
}

// Render calendar month
async function renderCalendar() {
    const lang = currentLanguage || 'es';
    const year = calCurrentDate.getFullYear();
    const month = calCurrentDate.getMonth();
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    
    // Get hijri for middle of month
    const midDate = new Date(year, month, 15);
    const midHijri = await gToH(midDate);
    
    const monthLabel = document.getElementById('currentMonth');
    if (monthLabel) {
        let hijriLabel = '';
        if (midHijri) {
            const mIdx = parseInt(midHijri.month.number) - 1;
            hijriLabel = ` · ${HIJRI_MONTHS[lang][mIdx]} ${midHijri.year}`;
        }
        monthLabel.textContent = `${GREG_MONTHS[lang][month]} ${year}${hijriLabel}`;
    }
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const tbody = document.getElementById('calendarBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    let row = document.createElement('tr');
    // Empty cells
    for (let i = 0; i < firstDay; i++) {
        row.appendChild(document.createElement('td'));
    }
    
    // Build cells
    const cellPromises = [];
    for (let day = 1; day <= daysInMonth; day++) {
        const td = document.createElement('td');
        const dateStr = fmtDate(year, month, day);
        const dayDate = new Date(year, month, day);
        const wd = dayDate.getDay();
        const isFriday = wd === 5;
        const isToday = isCurrentMonth && today.getDate() === day;
        
        // Determine info_key from EVENTS_MAP or fallback
        let infoKey = 'regular';
        if (typeof EVENTS_MAP !== 'undefined' && EVENTS_MAP[dateStr]) {
            infoKey = EVENTS_MAP[dateStr];
        } else if (isFriday) {
            infoKey = 'friday';
        }
        
        const classes = ['cal-day'];
        if (isToday) classes.push('today');
        if (isFriday) classes.push('friday-cell');
        if (infoKey === 'ramadan' || infoKey === 'ramadan_start' || infoKey === 'last_ten_ramadan') classes.push('ramadan-cell');
        if (infoKey === 'eid_fitr' || infoKey === 'eid_adha') classes.push('eid-cell');
        if (['isra_miraj','nisf_shaban','laylat_qadr','arafah','ashura','hijri_new_year','mawlid'].includes(infoKey)) classes.push('holy-cell');
        if (infoKey === 'white_days') classes.push('white-cell');
        
        td.className = classes.join(' ');
        td.dataset.date = dateStr;
        td.dataset.info = infoKey;
        td.dataset.weekday = wd;
        
        td.innerHTML = `
            <div class="day-cell-inner">
                <span class="g-num">${day}</span>
                <span class="info-icon"><i class="fas fa-info-circle"></i></span>
            </div>
        `;
        
        td.addEventListener('click', () => openDayModal(td));
        
        // Get hijri day number async
        cellPromises.push((async () => {
            const h = await gToH(dayDate);
            if (h) {
                td.dataset.h = h.day;
                td.dataset.hMonth = h.month.number;
                td.dataset.hYear = h.year;
                const inner = td.querySelector('.day-cell-inner');
                if (inner) {
                    const hSpan = document.createElement('span');
                    hSpan.className = 'h-num';
                    hSpan.textContent = h.day;
                    inner.appendChild(hSpan);
                }
            }
        })());
        
        row.appendChild(td);
        
        if (row.children.length === 7) {
            tbody.appendChild(row);
            row = document.createElement('tr');
        }
    }
    
    // Fill remaining cells
    while (row.children.length > 0 && row.children.length < 7) {
        row.appendChild(document.createElement('td'));
    }
    if (row.children.length > 0) tbody.appendChild(row);
    
    // Wait for hijri data
    await Promise.all(cellPromises);
}

// Open day modal
function openDayModal(td) {
    const lang = currentLanguage || 'es';
    const infoKey = td.dataset.info || 'regular';
    const dateStr = td.dataset.date;
    const wd = parseInt(td.dataset.weekday);
    const h = td.dataset.h || '--';
    
    const info = (typeof ISLAMIC_INFO !== 'undefined' && ISLAMIC_INFO[infoKey]) 
        ? ISLAMIC_INFO[infoKey] 
        : ISLAMIC_INFO['regular'];
    
    const [yy, mm, dd] = dateStr.split('-').map(Number);
    const wdName = WEEKDAYS_FULL[lang][wd];
    const monthName = GREG_MONTHS[lang][mm - 1];
    
    document.getElementById('modalDateBar').innerHTML = 
        `<strong>${wdName}</strong> · ${dd} ${monthName} ${yy} · <span class="hijri-tag">${h} ${lang === 'ar' ? 'هـ' : 'H'}</span>`;
    
    const isArabic = lang === 'ar';
    document.getElementById('modalTitle').textContent = isArabic ? info.title_ar : info.title_es;
    document.getElementById('modalVirtue').textContent = isArabic ? info.virtue_ar : info.virtue_es;
    document.getElementById('modalQuoteAr').textContent = info.quote_ar;
    document.getElementById('modalQuoteTrans').textContent = isArabic ? '' : info.quote_es;
    document.getElementById('modalQuoteRef').textContent = info.ref;
    
    document.getElementById('dayModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDayModal() {
    document.getElementById('dayModal').classList.remove('active');
    document.body.style.overflow = '';
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('calendarBody')) return;
    
    updateToday();
    renderCalendar();
    
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
});
