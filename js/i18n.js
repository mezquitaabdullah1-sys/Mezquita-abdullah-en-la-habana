/* ============================================
   Dynamic i18n system
   Works both with fetch (server) AND file:// protocol
   - Reads translations from window.EMBEDDED_TRANSLATIONS (translations.js)
   - Falls back to fetching translations.json if available
   - Applies translations to [data-lang-key] and [data-translate] elements
   - Persists language choice in localStorage
   ============================================ */

const I18N = {
    translations: null,
    currentLang: localStorage.getItem('mezquita_lang') || 'es',
    fallbackLang: 'es',
    ready: false,

    async init() {
        // 1) Try embedded (works on file:// too)
        if (window.EMBEDDED_TRANSLATIONS && typeof window.EMBEDDED_TRANSLATIONS === 'object') {
            this.translations = window.EMBEDDED_TRANSLATIONS;
        }

        // 2) Also try to fetch JSON (will fail silently on file://, that's OK)
        if (window.location.protocol !== 'file:') {
            try {
                const r = await fetch('translations.json');
                if (r.ok) {
                    const json = await r.json();
                    // Merge: JSON wins over embedded
                    if (this.translations) {
                        for (const lang of Object.keys(json)) {
                            this.translations[lang] = { ...(this.translations[lang] || {}), ...json[lang] };
                        }
                    } else {
                        this.translations = json;
                    }
                }
            } catch (e) {
                // silent — embedded is good enough
            }
        }

        if (!this.translations) {
            console.warn('[i18n] No translations available');
            this.translations = {};
        }

        this.ready = true;
        this.applyLanguage(this.currentLang);
        this.setupLanguageButtons();
        // Tell other modules we're ready
        document.dispatchEvent(new CustomEvent('i18nReady', { detail: { lang: this.currentLang } }));
    },

    t(key, lang) {
        lang = lang || this.currentLang;
        const langData = this.translations[lang] || this.translations[this.fallbackLang];
        if (langData && langData[key] !== undefined) return langData[key];
        const fb = this.translations[this.fallbackLang];
        return (fb && fb[key] !== undefined) ? fb[key] : key;
    },

    applyLanguage(lang) {
        if (!this.translations) return;
        this.currentLang = lang;
        localStorage.setItem('mezquita_lang', lang);

        // RTL handling
        if (lang === 'ar') {
            document.body.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'ar');
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.body.setAttribute('dir', 'ltr');
            document.documentElement.setAttribute('lang', lang);
            document.documentElement.setAttribute('dir', 'ltr');
        }

        // Replace all text-content elements
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            const text = this.t(key, lang);
            if (text !== undefined && text !== null && text !== key) el.textContent = text;
        });

        // Backward compat: data-translate
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            const text = this.t(key, lang);
            if (text !== undefined && text !== null && text !== key) el.textContent = text;
        });

        // Placeholders
        document.querySelectorAll('[data-lang-placeholder], [data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-lang-placeholder') || el.getAttribute('data-translate-placeholder');
            const text = this.t(key, lang);
            if (text !== undefined && text !== null && text !== key) el.setAttribute('placeholder', text);
        });

        // Update current language indicator
        const cur = document.getElementById('currentLang');
        if (cur) cur.textContent = lang.toUpperCase();

        // Expose globally for legacy code
        window.currentLanguage = lang;

        // Notify listeners
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    },

    setupLanguageButtons() {
        const langBtn = document.getElementById('langBtn');
        const langDropdown = document.getElementById('langDropdown');

        if (langBtn && langDropdown) {
            // Remove any previous listeners by cloning
            const newBtn = langBtn.cloneNode(true);
            langBtn.parentNode.replaceChild(newBtn, langBtn);

            newBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                langDropdown.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                if (!langDropdown.contains(e.target) && !newBtn.contains(e.target)) {
                    langDropdown.classList.remove('active');
                }
            });

            document.querySelectorAll('.lang-dropdown button[data-lang]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const lang = btn.dataset.lang;
                    this.applyLanguage(lang);
                    langDropdown.classList.remove('active');
                });
            });
        }
    }
};

// Auto-init: try DOMContentLoaded, fallback to immediate
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => I18N.init());
} else {
    I18N.init();
}

// Expose globally
window.I18N = I18N;
window.currentLanguage = I18N.currentLang;
