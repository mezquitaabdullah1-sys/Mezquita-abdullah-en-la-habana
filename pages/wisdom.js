// 🎯 Pantalla Sabiduría - Hub con Quiz, Tasbih, Adhkar, Du'as
const WisdomPage = {
  async render(container) {
    const stats = Gamification.getStats();
    const levelInfo = Gamification.getLevelInfo(stats.xp);
    const lang = AppState.settings?.locale || currentLocale || 'es';

    // Mascot greeting messages (rotating)
    const greetings = {
      es: [
        '¡As-Salām ‘alaikum! Aprendamos algo hoy',
        'Elige un módulo para ganar XP',
        `Llevas ${stats.streak || 0} días seguidos`,
      ],
      ar: [
        'السلام عليكم! هيّا نتعلّم شيئًا اليوم',
        'اختر وحدة لتربح خبرة',
        `لديك ${stats.streak || 0} يومًا متتاليًا`,
      ],
      en: [
        'As-Salām ‘alaikum! Let\'s learn something today',
        'Pick a module to earn XP',
        `You\'re on a ${stats.streak || 0}-day streak`,
      ],
    };
    const g = greetings[lang] || greetings.es;
    const greetingIdx = Math.floor(Date.now() / (1000 * 60 * 30)) % g.length; // rotates every 30min
    const mascotMsg = g[greetingIdx];

    const modules = [
      {
        id: 'quiz', icon: '<i class="fas fa-brain"></i>',
        title: t('quizTitle') || 'Quiz Islámico',
        desc: t('quizDesc') || '305 preguntas · 6 categorías · XP y niveles',
        color: '#0F4C3A',
        route: 'wisdom/quiz',
      },
      {
        id: 'duas', icon: '<i class="fas fa-hands-praying"></i>',
        title: t('duasTitle') || "Du'as y Súplicas",
        desc: t('duasModuleDesc') || '300+ súplicas auténticas · 27 categorías',
        color: '#D4AF37',
        route: 'wisdom/duas',
      },
      {
        id: 'adhkar', icon: '<i class="fas fa-cloud-sun"></i>',
        title: t('adhkarTitle') || 'Adhkar diarios',
        desc: t('adhkarModuleDesc') || 'Mañana · Tarde · Antes de dormir · Tras la oración',
        color: '#FF7043',
        route: 'wisdom/adhkar',
      },
      {
        id: 'courses', icon: '<i class="fas fa-book-open"></i>',
        title: t('coursesTitle') || 'Cursos interactivos',
        desc: t('coursesModuleDesc') || 'Viaje del musulmán · Tajwid · Fiqh · Kids',
        color: '#5C6BC0',
        route: 'wisdom/courses',
      },
      {
        id: 'tasbih', icon: '<i class="fas fa-circle-nodes"></i>',
        title: t('tasbihTitle') || 'Tasbih digital',
        desc: t('tasbihModuleDesc') || 'Contador con vibración y sonido · 8 dhikrs',
        color: '#1A6B52',
        route: 'wisdom/tasbih',
      },
    ];

    container.innerHTML = `
      <div class="page-header">
        <div class="page-title"><i class="fas fa-bullseye"></i> ${t('tabWisdom')}</div>
        <div class="page-subtitle">${t('wisdomSubtitle')}</div>
      </div>

      <div style="padding: var(--sp-md);">
        <!-- 🧚 Mascot Welcome (first thing users see in Wisdom hub) -->
        <div class="wisdom-mascot-welcome">
          ${Mascot.renderWithSpeech('welcome', escapeHtml(mascotMsg), 'medium')}
        </div>

        <!-- Player Stats Card -->
        <div class="player-stats-card">
          <div class="player-level-row">
            <div class="player-level-icon">${levelInfo.icon}</div>
            <div class="player-level-info">
              <div class="player-level-name">${t('level')} ${stats.level} — ${typeof levelInfo.name === 'object' ? (levelInfo.name[lang] || levelInfo.name.es) : levelInfo.name}</div>
              <div class="player-xp">${stats.xp} XP</div>
            </div>
            <!-- Hearts removed in v12: play unlimited, keep XP -->
          </div>
          <div class="xp-bar-wrapper">
            <div class="xp-bar-fill" style="width: ${Gamification.getProgressToNextLevel(stats.xp)}%"></div>
          </div>
          <div class="stats-row">
            <div class="stat-item">
              <div class="stat-value"><i class="fas fa-fire"></i> ${stats.streak || 0}</div>
              <div class="stat-label">${t('streak')}</div>
            </div>
            <div class="stat-item">
              <div class="stat-value"><i class="fas fa-trophy"></i> ${stats.achievements?.length || 0}</div>
              <div class="stat-label">${t('badges')}</div>
            </div>
            <div class="stat-item">
              <div class="stat-value"><i class="fas fa-chart-column"></i> ${stats.totalAnswered || 0}</div>
              <div class="stat-label">${t('answered')}</div>
            </div>
          </div>
        </div>

        <!-- 4 modules: Quiz / Du'as / Adhkar / Tasbih -->
        <h2 class="section-title">${t('modules') || 'Módulos'}</h2>
        <div class="wisdom-grid">
          ${modules.map(m => `
            <div class="wisdom-module-card" onclick="Router.go('${m.route}')" style="border-left-color: ${m.color};">
              <div class="wm-icon" style="background: ${m.color}22; color: ${m.color};">${m.icon}</div>
              <div class="wm-content">
                <div class="wm-title">${m.title}</div>
                <div class="wm-desc">${m.desc}</div>
              </div>
              <i class="fas fa-chevron-${document.documentElement.dir === 'rtl' ? 'left' : 'right'} wm-arrow"></i>
            </div>
          `).join('')}
        </div>

        <div class="card" style="background: rgba(15,76,58,0.06); margin-top: var(--sp-md);">
          <div style="font-size: 13px; line-height: 1.6; color: var(--text-secondary, #666);">
            <i class="fas fa-lightbulb"></i> <strong>${t('quizInfoTitle') || 'Aprende jugando'}:</strong> ${t('wisdomHubInfo') || 'Acumula XP en cualquier módulo, sube de nivel y desbloquea logros.'}
          </div>
        </div>
      </div>
    `;
  },
  cleanup() {},
};
