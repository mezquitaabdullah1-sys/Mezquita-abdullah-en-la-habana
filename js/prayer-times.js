/* ============================================
   Prayer Times - Aladhan API Integration
   Location: La Habana, Cuba (23.13, -82.35)
   Method: 3 = Muslim World League
   ============================================ */

const PRAYER_CONFIG = {
    latitude: 23.139272,
    longitude: -82.349244,
    method: 3, // Muslim World League
    school: 0,  // Shafi
    timezone: 'America/Havana'
};

const PRAYER_NAMES = {
    es: { Fajr: 'Fajr', Sunrise: 'Amanecer', Dhuhr: 'Dhuhr', Asr: 'Asr', Maghrib: 'Maghrib', Isha: 'Isha' },
    en: { Fajr: 'Fajr', Sunrise: 'Sunrise', Dhuhr: 'Dhuhr', Asr: 'Asr', Maghrib: 'Maghrib', Isha: 'Isha' },
    ar: { Fajr: 'الفجر', Sunrise: 'الشروق', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء' },
    fr: { Fajr: 'Fajr', Sunrise: 'Lever du soleil', Dhuhr: 'Dhuhr', Asr: 'Asr', Maghrib: 'Maghrib', Isha: 'Isha' }
};

const PRAYER_ICONS = {
    Fajr: 'fas fa-cloud-moon',
    Sunrise: 'fas fa-sun',
    Dhuhr: 'fas fa-sun',
    Asr: 'fas fa-cloud-sun',
    Maghrib: 'fas fa-mountain-sun',
    Isha: 'fas fa-moon'
};

// Fetch prayer times for today
async function fetchTodayPrayerTimes() {
    try {
        const date = new Date();
        const dateStr = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
        const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${PRAYER_CONFIG.latitude}&longitude=${PRAYER_CONFIG.longitude}&method=${PRAYER_CONFIG.method}&school=${PRAYER_CONFIG.school}`;
        
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching prayer times:', error);
        return getFallbackPrayerTimes();
    }
}

// Fallback prayer times (in case API fails)
function getFallbackPrayerTimes() {
    return {
        timings: {
            Fajr: '05:30',
            Sunrise: '06:45',
            Dhuhr: '12:30',
            Asr: '15:45',
            Maghrib: '18:20',
            Isha: '19:35'
        },
        date: {
            hijri: {
                day: '18',
                month: { en: 'Dhu al-Qi\'dah', ar: 'ذو القعدة' },
                year: '1447',
                weekday: { en: 'Al Thalatha' }
            },
            gregorian: {
                day: '26',
                month: { en: 'May' },
                year: '2026',
                weekday: { en: 'Tuesday' }
            }
        }
    };
}

// Calculate next prayer
function calculateNextPrayer(timings) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    
    for (let prayer of prayers) {
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
    return {
        name: 'Fajr',
        time: timings.Fajr,
        countdown: `${hours}h ${mins}m`
    };
}

// Update prayer bar (top of page)
function updatePrayerBar(timings) {
    const nextPrayer = calculateNextPrayer(timings);
    
    const nameEl = document.getElementById('nextPrayerName');
    const timeEl = document.getElementById('nextPrayerTime');
    const countdownEl = document.getElementById('prayerCountdown');
    
    if (nameEl) {
        const lang = currentLanguage || 'es';
        nameEl.textContent = PRAYER_NAMES[lang][nextPrayer.name] || nextPrayer.name;
    }
    if (timeEl) timeEl.textContent = nextPrayer.time;
    if (countdownEl) {
        const labels = { es: 'en', en: 'in', ar: 'بعد', fr: 'dans' };
        countdownEl.textContent = `${labels[currentLanguage || 'es']} ${nextPrayer.countdown}`;
    }
}

// Render prayer cards on homepage
function renderPrayerCards(timings) {
    const grid = document.getElementById('prayerCardsGrid');
    if (!grid) return;
    
    const nextPrayer = calculateNextPrayer(timings);
    const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const lang = currentLanguage || 'es';
    
    grid.innerHTML = prayers.map(prayer => {
        const isNext = prayer === nextPrayer.name;
        return `
            <div class="prayer-card ${isNext ? 'next' : ''}">
                ${isNext ? `<span class="next-badge">${{es:'Próxima',en:'Next',ar:'القادمة',fr:'Prochaine'}[lang] || 'Próxima'}</span>` : ''}
                <i class="${PRAYER_ICONS[prayer]}"></i>
                <h3>${PRAYER_NAMES[lang][prayer] || prayer}</h3>
                <p class="prayer-time">${timings[prayer]}</p>
            </div>
        `;
    }).join('');
}

// Render prayer times on prayer-times.html
function renderPrayerPage(data) {
    const grid = document.getElementById('prayerPageGrid');
    if (!grid) return;
    
    const timings = data.timings;
    const nextPrayer = calculateNextPrayer(timings);
    const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const lang = currentLanguage || 'es';
    
    grid.innerHTML = prayers.map(prayer => {
        const isNext = prayer === nextPrayer.name;
        return `
            <div class="prayer-page-card ${isNext ? 'next' : ''}">
                ${isNext ? `<span class="next-badge">${{es:'Próxima oración',en:'Next prayer',ar:'الصلاة القادمة',fr:'Prochaine prière'}[lang] || 'Próxima'}</span>` : ''}
                <i class="${PRAYER_ICONS[prayer]}"></i>
                <h2>${PRAYER_NAMES[lang][prayer] || prayer}</h2>
                <p class="prayer-page-time">${timings[prayer]}</p>
            </div>
        `;
    }).join('');
    
    // Hijri date
    const hijriEl = document.getElementById('ptHijriDate');
    if (hijriEl && data.date && data.date.hijri) {
        const h = data.date.hijri;
        hijriEl.textContent = `${h.weekday?.en || ''}, ${h.day} ${h.month.en} ${h.year} AH`;
    }
}

// Update homepage hijri date
function updateHijriDate(data) {
    const el = document.getElementById('hijriDate');
    if (el && data.date) {
        const h = data.date.hijri;
        const g = data.date.gregorian;
        const lang = currentLanguage || 'es';
        const labels = {
            es: { ah: 'AH', gregorian: '' },
            en: { ah: 'AH', gregorian: '' },
            ar: { ah: 'هـ', gregorian: '' },
            fr: { ah: 'AH', gregorian: '' }
        };
        el.textContent = `${h.day} ${lang === 'ar' ? h.month.ar : h.month.en} ${h.year} ${labels[lang].ah} · ${g.day} ${g.month.en} ${g.year}`;
    }
}

// Render weekly table on prayer-times.html
async function renderWeeklyTable() {
    const tbody = document.querySelector('#weeklyPrayerTable tbody');
    if (!tbody) return;
    
    const rows = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
        
        try {
            const response = await fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=${PRAYER_CONFIG.latitude}&longitude=${PRAYER_CONFIG.longitude}&method=${PRAYER_CONFIG.method}`);
            const data = await response.json();
            const t = data.data.timings;
            const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' });
            const dayNum = date.getDate();
            const monthName = date.toLocaleDateString('es-ES', { month: 'short' });
            
            rows.push(`
                <tr ${i === 0 ? 'class="today-row"' : ''}>
                    <td><strong>${dayName} ${dayNum} ${monthName}</strong></td>
                    <td>${t.Fajr}</td>
                    <td>${t.Sunrise}</td>
                    <td>${t.Dhuhr}</td>
                    <td>${t.Asr}</td>
                    <td>${t.Maghrib}</td>
                    <td>${t.Isha}</td>
                </tr>
            `);
        } catch (e) {
            console.error('Error loading day', i, e);
        }
    }
    
    tbody.innerHTML = rows.join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchTodayPrayerTimes();
    
    if (data && data.timings) {
        updatePrayerBar(data.timings);
        renderPrayerCards(data.timings);
        renderPrayerPage(data);
        updateHijriDate(data);
        
        // Update prayer bar every minute
        setInterval(() => updatePrayerBar(data.timings), 60000);
    }
    
    // Weekly table for prayer-times.html
    if (document.querySelector('#weeklyPrayerTable')) {
        renderWeeklyTable();
    }
});
