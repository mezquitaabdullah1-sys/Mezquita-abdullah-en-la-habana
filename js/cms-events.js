/* ============================================
   CMS Events Loader
   Reads event JSON files from data/events/
   Falls back to GitHub API if running on github.io
   ============================================ */

const CMS_EVENTS = {
    // Optional: set these if you want auto-discovery via GitHub API
    githubUser: '',   // e.g. 'yourusername' (leave empty to skip GitHub API)
    githubRepo: '',   // e.g. 'mezquita-abdullah'
    githubBranch: 'main',
    eventsPath: 'data/events',

    events: [],

    async load() {
        // Strategy 1: try GitHub API (works on any static host, gives auto-discovery)
        if (this.githubUser && this.githubRepo) {
            try {
                const r = await fetch(`https://api.github.com/repos/${this.githubUser}/${this.githubRepo}/contents/${this.eventsPath}?ref=${this.githubBranch}`);
                if (r.ok) {
                    const files = await r.json();
                    const jsonFiles = files.filter(f => f.name.endsWith('.json') && f.name !== 'index.json');
                    const promises = jsonFiles.map(f => fetch(f.download_url).then(r => r.json()).then(d => ({ ...d, _file: f.name })));
                    this.events = await Promise.all(promises);
                    return this.events;
                }
            } catch (e) {
                console.warn('GitHub API failed, trying index.json fallback', e);
            }
        }

        // Strategy 2: load index.json (the manual file list)
        try {
            const r = await fetch('data/events/index.json');
            if (r.ok) {
                const idx = await r.json();
                const files = idx.files || [];
                const promises = files.map(name =>
                    fetch(`data/events/${name}`).then(r => r.json()).then(d => ({ ...d, _file: name }))
                );
                this.events = await Promise.all(promises);
                return this.events;
            }
        } catch (e) {
            console.warn('index.json fallback failed', e);
        }

        // Strategy 3: nothing found
        this.events = [];
        return this.events;
    },

    // Return only upcoming events sorted by date ascending
    sortUpcoming(includePast = false) {
        const now = new Date();
        now.setHours(0, 0, 0, 0); // include today
        const upcoming = this.events.filter(e => new Date(e.date) >= now);
        upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
        if (includePast) {
            const past = this.events.filter(e => new Date(e.date) < now);
            past.sort((a, b) => new Date(b.date) - new Date(a.date));
            return [...upcoming, ...past];
        }
        return upcoming;
    },

    formatDate(dateStr, lang) {
        const d = new Date(dateStr);
        const locales = { es: 'es-ES', en: 'en-US', ar: 'ar-EG', fr: 'fr-FR' };
        const loc = locales[lang] || 'es-ES';
        try {
            return d.toLocaleString(loc, {
                weekday: 'short', day: 'numeric', month: 'short',
                hour: '2-digit', minute: '2-digit'
            });
        } catch (e) {
            return d.toLocaleString();
        }
    },

    categoryIcon(cat) {
        return {
            religious: 'fa-mosque',
            educational: 'fa-book-open',
            community: 'fa-users',
            ramadan: 'fa-moon',
            youth: 'fa-child',
            women: 'fa-female',
            other: 'fa-calendar'
        }[cat] || 'fa-calendar';
    },

    async renderTo(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const { includePast = false, limit = null } = options;

        // Loading state
        container.innerHTML = `
            <div class="cms-loading">
                <i class="fas fa-spinner fa-spin"></i>
                <span data-lang-key="cms_loading">Cargando eventos...</span>
            </div>
        `;

        await this.load();
        const lang = (window.I18N && window.I18N.currentLang) || localStorage.getItem('mezquita_lang') || 'es';
        let sorted = this.sortUpcoming(includePast);
        if (limit) sorted = sorted.slice(0, limit);

        if (!sorted.length) {
            container.innerHTML = `
                <div class="cms-empty">
                    <i class="fas fa-calendar-xmark"></i>
                    <h3 data-lang-key="cms_empty_title">Sin eventos por ahora</h3>
                    <p data-lang-key="cms_empty_text">Vuelve pronto para ver las próximas actividades de la mezquita.</p>
                </div>
            `;
            return;
        }

        // Render cards
        container.innerHTML = sorted.map(ev => {
            const isFuture = new Date(ev.date) >= new Date();
            const icon = this.categoryIcon(ev.category);
            const imgHtml = ev.image
                ? `<div class="cms-card-image"><img src="${ev.image}" alt="${ev.title}" loading="lazy"></div>`
                : `<div class="cms-card-icon-only"><i class="fas ${icon}"></i></div>`;
            const dateLabel = this.formatDate(ev.date, lang);
            const featuredBadge = ev.featured ? `<span class="cms-featured">★</span>` : '';
            const pastClass = isFuture ? '' : 'cms-past';
            const registerBtn = ev.register_url
                ? `<a href="${ev.register_url}" target="_blank" rel="noopener" class="cms-card-btn"><i class="fas fa-arrow-right"></i> <span data-lang-key="cms_more">Más info</span></a>`
                : '';
            // Pick localized description if available (description_en, description_ar, description_fr)
            const localizedKey = `description_${lang}`;
            const description = ((ev[localizedKey] && ev[localizedKey].trim()) || ev.description || '').replace(/</g, '&lt;');
            return `
                <article class="cms-event-card ${pastClass}">
                    ${imgHtml}
                    <div class="cms-card-body">
                        ${featuredBadge}
                        <span class="cms-card-cat"><i class="fas ${icon}"></i> ${ev.category || 'event'}</span>
                        <h3 class="cms-card-title">${ev.title}</h3>
                        <p class="cms-card-date"><i class="far fa-calendar"></i> ${dateLabel}</p>
                        ${ev.location ? `<p class="cms-card-loc"><i class="fas fa-location-dot"></i> ${ev.location}</p>` : ''}
                        <p class="cms-card-desc">${description}</p>
                        ${registerBtn}
                    </div>
                </article>
            `;
        }).join('');
    }
};

// Auto-init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Home page: upcoming only, limit 6
    if (document.getElementById('cmsEventsGrid')) {
        CMS_EVENTS.renderTo('cmsEventsGrid', { includePast: false, limit: 6 });
    }
    // Events page: all upcoming events
    if (document.getElementById('cmsAllEventsGrid')) {
        CMS_EVENTS.renderTo('cmsAllEventsGrid', { includePast: false });
    }
    // Events page (past): show past events in a separate grid
    if (document.getElementById('cmsPastEventsGrid')) {
        CMS_EVENTS.renderTo('cmsPastEventsGrid', { includePast: true });
    }
});
// Re-render on language change
document.addEventListener('languageChanged', () => {
    if (document.getElementById('cmsEventsGrid')) {
        CMS_EVENTS.renderTo('cmsEventsGrid', { includePast: false, limit: 6 });
    }
    if (document.getElementById('cmsAllEventsGrid')) {
        CMS_EVENTS.renderTo('cmsAllEventsGrid', { includePast: false });
    }
});

window.CMS_EVENTS = CMS_EVENTS;
