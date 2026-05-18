/* ============================================
   Mezquita Abdullah - Main JS
   ============================================ */

let currentLanguage = localStorage.getItem('mezquita_lang') || 'es';

document.addEventListener('DOMContentLoaded', () => {
    // Apply saved language on load
    if (currentLanguage !== 'es') {
        switchLanguage(currentLanguage);
        const lcSpan = document.getElementById('currentLang');
        if (lcSpan) lcSpan.textContent = currentLanguage.toUpperCase();
    }

    // Language switcher
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const currentLangSpan = document.getElementById('currentLang');

    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            if (langDropdown) langDropdown.classList.remove('active');
        });

        document.querySelectorAll('.lang-dropdown button').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                switchLanguage(lang);
                currentLangSpan.textContent = lang.toUpperCase();
                langDropdown.classList.remove('active');
                localStorage.setItem('mezquita_lang', lang);
            });
        });
    }

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Welcome words rotation
    rotateWelcomeWords();

    // Stats counter animation
    initStatsCounter();

    // Scroll reveal animations
    initScrollReveal();

    // Form handling
    initForms();

    // Smooth scroll for hash links
    initSmoothScroll();
});

function switchLanguage(lang) {
    currentLanguage = lang;
    const trans = translations[lang];
    if (!trans) return;

    if (lang === 'ar') {
        document.body.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
    } else {
        document.body.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', lang);
    }

    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (trans[key]) {
            el.textContent = trans[key];
        }
    });

    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        if (trans[key]) {
            el.setAttribute('placeholder', trans[key]);
        }
    });

    document.querySelectorAll('select option').forEach(opt => {
        const key = opt.getAttribute('data-translate');
        if (key && trans[key]) {
            opt.textContent = trans[key];
        }
    });
}

function rotateWelcomeWords() {
    const words = document.querySelectorAll('.welcome-word');
    if (words.length === 0) return;
    let currentIndex = 0;

    setInterval(() => {
        words[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % words.length;
        words[currentIndex].classList.add('active');
    }, 2500);
}

function initStatsCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 10);
        } else {
            counter.innerText = target + (target >= 100 ? '+' : '');
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function initScrollReveal() {
    const elements = document.querySelectorAll('.section-header, .discover-card, .question-card, .event-card, .goal-card, .journey-step, .resource-card, .monthly-card, .facility-card, .et-item, .other-way, .contact-method');
    elements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

function initForms() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            if (form.id === 'donationForm') return; // handled by donate.js
            e.preventDefault();
            const messages = {
                es: '✅ ¡JazakAllah khair! Hemos recibido tu mensaje. Te contactaremos pronto in sha\' Allah.',
                en: '✅ JazakAllah khair! We received your message. We will contact you soon in sha\' Allah.',
                ar: '✅ جزاك الله خيراً! استلمنا رسالتك. سنتواصل معك قريباً إن شاء الله.',
                fr: '✅ JazakAllah khair! Nous avons reçu votre message. Nous vous contacterons bientôt in sha\' Allah.'
            };
            alert(messages[currentLanguage] || messages.es);
            form.reset();
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
