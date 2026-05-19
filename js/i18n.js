/* ============================================
   Dynamic i18n system - reads translations.json
   Applies translation to [data-lang-key] elements
   ============================================ */

const I18N = {
    translations: null,
    currentLang: localStorage.getItem('mezquita_lang') || 'es',
    fallbackLang: 'es',
    
    async init() {
        try {
            // Try to load JSON; fallback to embedded data
            const r = await fetch('translations.json');
            this.translations = await r.json();
        } catch(e) {
            console.warn('Loading translations.json failed, using embedded:', e);
            this.translations = window.EMBEDDED_TRANSLATIONS || {};
        }
        this.applyLanguage(this.currentLang);
        this.setupLanguageButtons();
    },
    
    t(key, lang) {
        lang = lang || this.currentLang;
        const langData = this.translations[lang] || this.translations[this.fallbackLang];
        if (langData && langData[key]) return langData[key];
        // Fallback
        const fb = this.translations[this.fallbackLang];
        return (fb && fb[key]) ? fb[key] : key;
    },
    
    applyLanguage(lang) {
        if (!this.translations) return;
        this.currentLang = lang;
        localStorage.setItem('mezquita_lang', lang);
        
        // RTL handling
        if (lang === 'ar') {
            document.body.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'ar');
        } else {
            document.body.setAttribute('dir', 'ltr');
            document.documentElement.setAttribute('lang', lang);
        }
        
        // Apply to all [data-lang-key] elements
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            const text = this.t(key, lang);
            if (text) el.textContent = text;
        });
        
        // Backward compat: [data-translate]
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            const text = this.t(key, lang);
            if (text && text !== key) el.textContent = text;
        });
        
        // Placeholders
        document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
            const key = el.getAttribute('data-lang-placeholder');
            const text = this.t(key, lang);
            if (text) el.setAttribute('placeholder', text);
        });
        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            const text = this.t(key, lang);
            if (text && text !== key) el.setAttribute('placeholder', text);
        });
        
        // Update language label
        const cur = document.getElementById('currentLang');
        if (cur) cur.textContent = lang.toUpperCase();
        
        // Notify listeners
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    },
    
    setupLanguageButtons() {
        const langBtn = document.getElementById('langBtn');
        const langDropdown = document.getElementById('langDropdown');
        
        if (langBtn && langDropdown) {
            langBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                langDropdown.classList.toggle('active');
            });
            
            document.addEventListener('click', () => {
                langDropdown.classList.remove('active');
            });
            
            document.querySelectorAll('.lang-dropdown button[data-lang]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const lang = btn.dataset.lang;
                    this.applyLanguage(lang);
                    langDropdown.classList.remove('active');
                });
            });
        }
    }
};

// Auto-init
document.addEventListener('DOMContentLoaded', () => I18N.init());

// Expose globally + back-compat helpers
window.I18N = I18N;
window.currentLanguage = I18N.currentLang;
document.addEventListener('languageChanged', (e) => {
    window.currentLanguage = e.detail.lang;
});
