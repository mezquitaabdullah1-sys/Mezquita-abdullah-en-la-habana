/* ============================================
   CMS Weekly & Monthly Events Loader
   Reads weekly/monthly events from data/weekly-events/ and data/monthly-events/
   ============================================ */

const CMS_WEEKLY = {
    githubUser: 'mezquitaabdullah1-sys
',   // ej: 'mezquita-abdullah'
    githubRepo: 'Mezquita-abdullah-en-la-habana',
    githubBranch: 'main',

    weekly: [],
    monthly: [],

    DAY_NAMES: {
        es: { monday:'Lunes', tuesday:'Martes', wednesday:'Miércoles', thursday:'Jueves', friday:'Viernes', saturday:'Sábado', sunday:'Domingo' },
        en: { monday:'Monday', tuesday:'Tuesday', wednesday:'Wednesday', thursday:'Thursday', friday:'Friday', saturday:'Saturday', sunday:'Sunday' },
        ar: { monday:'الإثنين', tuesday:'الثلاثاء', wednesday:'الأربعاء', thursday:'الخميس', friday:'الجمعة', saturday:'السبت', sunday:'الأحد' },
        fr: { monday:'Lundi', tuesday:'Mardi', wednesday:'Mercredi', thursday:'Jeudi', friday:'Vendredi', saturday:'Samedi', sunday:'Dimanche' }
    },
    DAY_ORDER: ['friday','saturday','sunday','monday','tuesday','wednesday','thursday'],

    async loadFromFolder(folder) {
        // Try GitHub API
        if (this.githubUser && this.githubRepo) {
            try {
                const r = await fetch(`https://api.github.com/repos/${this.githubUser}/${this.githubRepo}/contents/${folder}?ref=${this.githubBranch}`);
                if (r.ok) {
                    const files = await r.json();
                    const jsonFiles = files.filter(f => f.name.endsWith('.json') && f.name !== 'index.json');
                    return Promise.all(jsonFiles.map(f =>
                        fetch(f.download_url).then(r => r.json()).then(d => ({ ...d, _file: f.name }))
                    ));
                }
            } catch (e) {}
        }
        // Fallback to index.json
        try {
            const r = await fetch(`${folder}/index.json`);
            if (r.ok) {
                const idx = await r.json();
                return Promise.all((idx.files || []).map(name =>
                    fetch(`${folder}/${name}`).then(r => r.json()).then(d => ({ ...d, _file: name }))
                ));
            }
        } catch (e) {}
        return [];
    },

    async load() {
        const [weekly, monthly] = await Promise.all([
            this.loadFromFolder('data/weekly-events'),
            this.loadFromFolder('data/monthly-events')
        ]);
        this.weekly = weekly;
        this.monthly = monthly;
    },

    tagIcon(tag) {
        return {
            friday: 'fa-mosque',
            lesson: 'fa-chalkboard-teacher',
            quran: 'fa-book-quran',
            adults: 'fa-users',
            youth: 'fa-child',
            women: 'fa-female'
        }[tag] || 'fa-calendar';
    },

    async render() {
        await this.load();
        const lang = (window.I18N && window.I18N.currentLang) || localStorage.getItem('mezquita_lang') || 'es';

        // Sort weekly events by day order
        const sortedWeekly = [...this.weekly].sort((a, b) =>
            this.DAY_ORDER.indexOf(a.day) - this.DAY_ORDER.indexOf(b.day)
        );

        // Render weekly events
        const weeklyList = document.querySelector('.weekly-events-list');
        if (weeklyList) {
            if (!sortedWeekly.length) {
                weeklyList.innerHTML = `<div class="cms-empty" style="grid-column:1/-1;text-align:center;padding:40px;color:#666;">
                    <i class="fas fa-calendar-xmark" style="font-size:32px;color:#D4AF37;margin-bottom:10px;display:block;"></i>
                    <p data-lang-key="cms_empty_text">No hay eventos semanales por ahora.</p>
                </div>`;
            } else {
                weeklyList.innerHTML = sortedWeekly.map(ev => {
                    const dayName = this.DAY_NAMES[lang][ev.day] || ev.day;
                    const icon = this.tagIcon(ev.tag);
                    const highlighted = ev.highlighted ? 'highlighted' : '';
                    return `
                        <div class="weekly-event ${highlighted}">
                            <div class="weekly-date">
                                <div class="day-name">${dayName}</div>
                                <div class="day-time">${ev.time}</div>
                            </div>
                            <div class="weekly-info">
                                <div class="event-tag"><i class="fas ${icon}"></i> ${ev.tag || ''}</div>
                                <h3>${ev.title}</h3>
                                <p class="event-meta"><i class="fas fa-location-dot"></i> ${ev.location || 'Mezquita Abdullah'}</p>
                                <p>${ev.description || ''}</p>
                            </div>
                        </div>
                    `;
                }).join('');
            }
        }

        // Render monthly events
        const monthlyGrid = document.querySelector('.monthly-events-grid');
        if (monthlyGrid) {
            if (!this.monthly.length) {
                monthlyGrid.innerHTML = `<div class="cms-empty" style="grid-column:1/-1;text-align:center;padding:40px;color:#666;">
                    <i class="fas fa-calendar-xmark" style="font-size:32px;color:#D4AF37;margin-bottom:10px;display:block;"></i>
                    <p>No hay eventos mensuales por ahora.</p>
                </div>`;
            } else {
                monthlyGrid.innerHTML = this.monthly.map(ev => `
                    <div class="monthly-event-card">
                        <div class="monthly-icon"><i class="fas fa-${ev.icon || 'calendar'}"></i></div>
                        <h3>${ev.title}</h3>
                        <p class="monthly-freq"><i class="far fa-clock"></i> ${ev.frequency || ''}</p>
                        <p>${ev.description || ''}</p>
                    </div>
                `).join('');
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.weekly-events-list') || document.querySelector('.monthly-events-grid')) {
        CMS_WEEKLY.render();
    }
});
document.addEventListener('languageChanged', () => {
    if (document.querySelector('.weekly-events-list') || document.querySelector('.monthly-events-grid')) {
        CMS_WEEKLY.render();
    }
});

window.CMS_WEEKLY = CMS_WEEKLY;
