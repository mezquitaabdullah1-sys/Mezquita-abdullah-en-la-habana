/* ============================================
   Prayer Times - Aladhan API (free, accurate, daily auto-refresh)
   Location: La Habana, Cuba (23.139272, -82.349244)
   Method: 3 = Muslim World League
   Same calculation method used by Muslim Pro for Cuba.
   ============================================ */

const PRAYER_CONFIG = {
    latitude: 23.139272,
    longitude: -82.349244,
    method: 3,
    school: 0,
    timezone: 'America/Havana'
};

const PRAYER_NAMES = {
    es: { Fajr: 'Fajr', Sunrise: 'Amanecer', Dhuhr: 'Dhuhr', Asr: 'Asr', Maghrib: 'Maghrib', Isha: 'Isha' },
    en: { Fajr: 'Fajr', Sunrise: 'Sunrise', Dhuhr: 'Dhuhr', Asr: 'Asr', Maghrib: 'Maghrib', Isha: 'Isha' },
    ar: { Fajr: 'الفجر', Sunrise: 'الشروق', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء' },
    fr: { Fajr: 'Fajr', Sunrise: 'Lever', Dhuhr: 'Dhuhr', Asr: 'Asr', Maghrib: 'Maghrib', Isha: 'Isha' }
};

const PRAYER_ICONS = {
    Fajr: 'fas fa-cloud-moon',
    Sunrise: 'fas fa-sun',
    Dhuhr: 'fas fa-sun',
    Asr: 'fas fa-cloud-sun',
    Maghrib: 'fas fa-mountain-sun',
    Isha: 'fas fa-moon'
};

/* ---------- Fallback table for offline use (avg for Havana) ----------
   Used only if API fails. Pre-calculated monthly averages. */
const FALLBACK_TIMES = {
    1:  { Fajr:'06:00', Sunrise:'07:14', Dhuhr:'12:39', Asr:'15:30', Maghrib:'18:04', Isha:'19:14' },
    2:  { Fajr:'05:50', Sunrise:'07:01', Dhuhr:'12:45', Asr:'15:50', Maghrib:'18:28', Isha:'19:36' },
    3:  { Fajr:'05:25', Sunrise:'06:34', Dhuhr:'12:42', Asr:'16:00', Maghrib:'18:51', Isha:'19:57' },
    4:  { Fajr:'04:53', Sunrise:'06:02', Dhuhr:'12:33', Asr:'16:00', Maghrib:'19:05', Isha:'20:14' },
    5:  { Fajr:'04:27', Sunrise:'05:39', Dhuhr:'12:28', Asr:'15:55', Maghrib:'19:17', Isha:'20:29' },
    6:  { Fajr:'04:18', Sunrise:'05:33', Dhuhr:'12:31', Asr:'15:56', Maghrib:'19:29', Isha:'20:44' },
    7:  { Fajr:'04:30', Sunrise:'05:43', Dhuhr:'12:36', Asr:'16:00', Maghrib:'19:30', Isha:'20:43' },
    8:  { Fajr:'04:46', Sunrise:'05:56', Dhuhr:'12:36', Asr:'15:58', Maghrib:'19:15', Isha:'20:25' },
    9:  { Fajr:'04:58', Sunrise:'06:06', Dhuhr:'12:28', Asr:'15:48', Maghrib:'18:51', Isha:'19:59' },
    10: { Fajr:'05:07', Sunrise:'06:13', Dhuhr:'12:19', Asr:'15:32', Maghrib:'18:25', Isha:'19:31' },
    11: { Fajr:'05:23', Sunrise:'06:30', Dhuhr:'12:13', Asr:'15:20', Maghrib:'18:07', Isha:'19:14' },
    12: { Fajr:'05:43', Sunrise:'06:54', Dhuhr:'12:21', Asr:'15:21', Maghrib:'18:00', Isha:'19:11' }
};

function getFallbackToday() {
    const month = new Date().getMonth() + 1;
    const timings = FALLBACK_TIMES[month] || FALLBACK_TIMES[1];
    return {
        timings: { ...timings },
        date: {
            hijri: { day: '--', month: { en: '--', ar: '--' }, year: '--', weekday: { en: '' } },
            gregorian: { day: String(new Date().getDate()), month: { en: '' }, year: String(new Date().getFullYear()), weekday: { en: '' } }
        },
        _fallback: true
    };
}

/* ---------- Fetch with cache (avoids API hammering) ---------- */
async function fetchTodayPrayerTimes() {
    const today = new Date();
    const dateStr = `${String(today.getDate()).padStart(2,'0')}-${String(today.getMonth()+1).padStart(2,'0')}-${today.getFullYear()}`;
    const cacheKey = `prayer_${dateStr}`;

    // Try cache
    try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
    } catch (e) {}

    // Try API (only on http/https — file:// will fail CORS)
    if (window.location.protocol !== 'file:') {
        try {
            const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${PRAYER_CONFIG.latitude}&longitude=${PRAYER_CONFIG.longitude}&method=${PRAYER_CONFIG.method}&school=${PRAYER_CONFIG.school}`;
            const r = await fetch(url);
            if (r.ok) {
                const data = await r.json();
                if (data.data && data.data.timings) {
                    // Clean timings (remove timezone suffix)
                    Object.keys(data.data.timings).forEach(k => {
                        data.data.timings[k] = data.data.timings[k].split(' ')[0];
                    });
                    try { localStorage.setItem(cacheKey, JSON.stringify(data.data)); } catch(e){}
                    return data.data;
                }
            }
        } catch (e) {
            console.warn('Aladhan API failed, using fallback', e);
        }
    }

    // Fallback (always works — even offline / file://)
    return getFallbackToday();
}

/* ---------- Next prayer calculation ---------- */
function calculateNextPrayer(timings) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    for (const prayer of prayers) {
        if (!timings[prayer]) continue;
        const [h, m] = timings[prayer].split(':').map(Number);
        const prayerTime = h * 60 + m;
        if (prayerTime > currentTime) {
            const diff = prayerTime - currentTime;
            const hours = Math.floor(diff / 60);
            const mins = diff % 60;
            return {
                name: prayer,
                time: timings[prayer],
                countdown: `${hours > 0 ? hours + 'h ' : ''}${mins}m`
            };
        }
    }

    // After Isha, next is Fajr tomorrow
    const [fh, fm] = timings.Fajr.split(':').map(Number);
    const fajrTime = fh * 60 + fm + (24 * 60);
    const diff = fajrTime - currentTime;
    const hours = Math.floor(diff / 60);
    const mins = diff % 60;
    return { name: 'Fajr', time: timings.Fajr, countdown: `${hours}h ${mins}m` };
}

/* ---------- Update top prayer bar ---------- */
function updatePrayerBar(timings) {
    const next = calculateNextPrayer(timings);
    const lang = (window.currentLanguage || localStorage.getItem('mezquita_lang') || 'es');

    const nameEl = document.getElementById('nextPrayerName');
    const timeEl = document.getElementById('nextPrayerTime');
    const countdownEl = document.getElementById('prayerCountdown');

    if (nameEl) nameEl.textContent = PRAYER_NAMES[lang][next.name] || next.name;
    if (timeEl) timeEl.textContent = next.time;
    if (countdownEl) {
        const labels = { es: 'en', en: 'in', ar: 'بعد', fr: 'dans' };
        countdownEl.textContent = `${labels[lang]} ${next.countdown}`;
    }
}

/* ---------- Render horizontal prayer strip on homepage ---------- */
function renderPrayerStrip(data) {
    const grid = document.getElementById('prayerStripGrid');
    if (!grid) return;

    const timings = data.timings;
    const next = calculateNextPrayer(timings);
    const lang = (window.currentLanguage || localStorage.getItem('mezquita_lang') || 'es');
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    grid.innerHTML = prayers.map(p => {
        const isNext = p === next.name;
        const label = { es:'Próxima', en:'Next', ar:'القادمة', fr:'Prochaine' }[lang] || 'Next';
        return `
            <div class="prayer-strip-card ${isNext ? 'next' : ''}">
                <i class="${PRAYER_ICONS[p]} ps-icon"></i>
                <div class="ps-name">${PRAYER_NAMES[lang][p] || p}</div>
                <div class="ps-time">${timings[p] || '--:--'}</div>
                ${isNext ? `<span class="next-tag">${label}</span>` : ''}
            </div>
        `;
    }).join('');

    // Date label
    const dateEl = document.getElementById('prayerStripDate');
    if (dateEl) {
        const today = new Date();
        const opts = { weekday: 'long', day: 'numeric', month: 'long' };
        const locales = { es: 'es-ES', en: 'en-US', ar: 'ar-EG', fr: 'fr-FR' };
        try {
            dateEl.textContent = today.toLocaleDateString(locales[lang] || 'es-ES', opts);
        } catch(e) {
            dateEl.textContent = today.toLocaleDateString();
        }
    }
}

/* ---------- Prayer-times.html page render ---------- */
function renderPrayerPage(data) {
    const grid = document.getElementById('prayerPageGrid');
    if (!grid) return;
    const timings = data.timings;
    const next = calculateNextPrayer(timings);
    const lang = (window.currentLanguage || localStorage.getItem('mezquita_lang') || 'es');
    const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    grid.innerHTML = prayers.map(p => {
        const isNext = p === next.name;
        const label = { es:'Próxima oración', en:'Next prayer', ar:'الصلاة القادمة', fr:'Prochaine prière' }[lang];
        return `
            <div class="prayer-page-card ${isNext ? 'next' : ''}">
                ${isNext ? `<span class="next-badge">${label}</span>` : ''}
                <i class="${PRAYER_ICONS[p]}"></i>
                <h2>${PRAYER_NAMES[lang][p] || p}</h2>
                <p class="prayer-page-time">${timings[p] || '--:--'}</p>
            </div>
        `;
    }).join('');

    const hijriEl = document.getElementById('ptHijriDate');
    if (hijriEl && data.date && data.date.hijri) {
        const h = data.date.hijri;
        hijriEl.textContent = `${h.weekday?.en || ''}${h.weekday?.en ? ', ' : ''}${h.day} ${h.month.en || h.month.ar || ''} ${h.year} AH`;
    }
}

/* ---------- Init: load & render on every page that needs it ---------- */
async function initPrayerTimes() {
    const data = await fetchTodayPrayerTimes();
    if (!data || !data.timings) return;

    updatePrayerBar(data.timings);
    renderPrayerStrip(data);
    renderPrayerPage(data);

    // Re-calculate next prayer every minute
    setInterval(() => {
        updatePrayerBar(data.timings);
        renderPrayerStrip(data);
    }, 60 * 1000);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPrayerTimes);
} else {
    initPrayerTimes();
}

document.addEventListener('languageChanged', async () => {
    const data = await fetchTodayPrayerTimes();
    if (!data || !data.timings) return;
    updatePrayerBar(data.timings);
    renderPrayerStrip(data);
    renderPrayerPage(data);
});

/* ============================================
   Weekly prayer times table (next 7 days)
   ============================================ */
async function fetchPrayerForDate(dateObj) {
    const dateStr = `${String(dateObj.getDate()).padStart(2,'0')}-${String(dateObj.getMonth()+1).padStart(2,'0')}-${dateObj.getFullYear()}`;
    const cacheKey = `prayer_${dateStr}`;
    try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) return JSON.parse(cached);
    } catch(e) {}

    if (window.location.protocol !== 'file:') {
        try {
            const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${PRAYER_CONFIG.latitude}&longitude=${PRAYER_CONFIG.longitude}&method=${PRAYER_CONFIG.method}&school=${PRAYER_CONFIG.school}`;
            const r = await fetch(url);
            if (r.ok) {
                const data = await r.json();
                if (data.data && data.data.timings) {
                    Object.keys(data.data.timings).forEach(k => {
                        data.data.timings[k] = data.data.timings[k].split(' ')[0];
                    });
                    try { localStorage.setItem(cacheKey, JSON.stringify(data.data)); } catch(e){}
                    return data.data;
                }
            }
        } catch (e) {}
    }
    // Fallback: monthly average for the requested month
    const month = dateObj.getMonth() + 1;
    const timings = FALLBACK_TIMES[month] || FALLBACK_TIMES[1];
    return { timings: { ...timings }, _fallback: true };
}

async function renderWeeklyTable() {
    const table = document.getElementById('weeklyPrayerTable');
    if (!table) return;
    const tbody = table.querySelector('tbody');
    if (!tbody) return;

    const lang = (window.currentLanguage || localStorage.getItem('mezquita_lang') || 'es');
    const weekdayNames = {
        es: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
        en: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
        ar: ['أحد','إثن','ثلا','أرب','خمي','جمع','سبت'],
        fr: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']
    };
    const monthNames = {
        es: ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'],
        en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        ar: ['ينا','فبر','مار','أبر','ماي','يون','يول','أغس','سبت','أكت','نوف','ديس'],
        fr: ['jan','fév','mar','avr','mai','juin','juil','aoû','sep','oct','nov','déc']
    };

    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:20px;">⏳ ...</td></tr>';

    const rows = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const data = await fetchPrayerForDate(d);
        if (!data || !data.timings) continue;
        const t = data.timings;
        const wd = weekdayNames[lang][d.getDay()];
        const month = monthNames[lang][d.getMonth()];
        const dateLabel = `${wd}, ${d.getDate()} ${month}`;
        const isToday = (i === 0);
        rows.push(`
            <tr ${isToday ? 'class="today-row"' : ''}>
                <td><strong>${dateLabel}</strong>${isToday ? ' <span class="today-badge">●</span>' : ''}</td>
                <td>${t.Fajr || '--'}</td>
                <td>${t.Sunrise || '--'}</td>
                <td>${t.Dhuhr || '--'}</td>
                <td>${t.Asr || '--'}</td>
                <td>${t.Maghrib || '--'}</td>
                <td>${t.Isha || '--'}</td>
            </tr>
        `);
    }

    tbody.innerHTML = rows.join('');
}

// Auto-init weekly table
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('weeklyPrayerTable')) {
        renderWeeklyTable();
    }
});
document.addEventListener('languageChanged', () => {
    if (document.getElementById('weeklyPrayerTable')) {
        renderWeeklyTable();
    }
});
