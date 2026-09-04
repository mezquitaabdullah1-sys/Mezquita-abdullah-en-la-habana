// 🏆 Sistema de gamificación: XP, niveles, rachas, vidas, logros

const Gamification = {
  // Configuración de XP
  XP_PER_CORRECT: 10,
  XP_CORRECT_ANSWER: 10,        // alias for quiz.js compatibility
  XP_PER_WRONG: 0,
  XP_BONUS_STREAK: 5,           // bonus por cada respuesta correcta consecutiva
  XP_BONUS_NO_MISTAKES: 50,     // bonus al terminar sin fallos
  XP_PER_LESSON: 25,            // por completar lección de curso
  XP_PER_TASBIH_100: 20,        // 100 conteos del tasbih
  XP_PER_ADHKAR_SET: 30,        // por completar un set de adhkar

  // Sistema de vidas
  MAX_LIVES: 5,
  LIFE_REGEN_MINUTES: 30,       // 1 vida cada 30 minutos

  // Niveles (umbral acumulativo de XP)
  // v21: nombres de niveles trilingües — se resuelven con L() al mostrar
  LEVELS: [
    { level: 1, xp: 0, name: { es: 'Iniciado', ar: 'مبتدئ', en: 'Initiate' }, icon: '<i class="fas fa-seedling"></i>', color: '#4CAF50' },
    { level: 2, xp: 50, name: { es: 'Buscador', ar: 'باحث', en: 'Seeker' }, icon: '<i class="fas fa-leaf"></i>', color: '#66BB6A' },
    { level: 3, xp: 150, name: { es: 'Estudiante', ar: 'طالب', en: 'Student' }, icon: '<i class="fas fa-book-open"></i>', color: '#8BC34A' },
    { level: 4, xp: 300, name: { es: 'Aprendiz', ar: 'متعلم', en: 'Learner' }, icon: '<i class="fas fa-graduation-cap"></i>', color: '#9CCC65' },
    { level: 5, xp: 500, name: { es: 'Conocedor', ar: 'عارف', en: 'Knowledgeable' }, icon: '<i class="fas fa-lightbulb"></i>', color: '#FFA726' },
    { level: 6, xp: 750, name: { es: 'Sabio', ar: 'حكيم', en: 'Wise' }, icon: '<i class="fas fa-star"></i>', color: '#FFB74D' },
    { level: 7, xp: 1000, name: { es: 'Maestro', ar: 'معلّم', en: 'Master' }, icon: '<i class="fas fa-user"></i>', color: '#FF7043' },
    { level: 8, xp: 1500, name: { es: 'Erudito', ar: 'عالم', en: 'Scholar' }, icon: '<i class="fas fa-mosque"></i>', color: '#D4AF37' },
    { level: 9, xp: 2500, name: { es: 'Hakim', ar: 'حكيم كبير', en: 'Hakim' }, icon: '<i class="fas fa-star"></i>', color: '#FFD700' },
    { level: 10, xp: 5000, name: { es: 'Imam', ar: 'إمام', en: 'Imam' }, icon: '<i class="fas fa-moon"></i>', color: '#9C27B0' },
  ],

  // Logros disponibles
  // v21: logros trilingües (name/desc como {es, ar, en}) — se resuelven con L() al mostrar
  ACHIEVEMENTS: [
    { id: 'first_quiz', name: { es: 'Primer paso', ar: 'الخطوة الأولى', en: 'First step' }, desc: { es: 'Completa tu primer quiz', ar: 'أكمل أول اختبار لك', en: 'Complete your first quiz' }, icon: '<i class="fas fa-bullseye"></i>' },
    { id: 'perfect_quiz', name: { es: 'Perfección', ar: 'الكمال', en: 'Perfection' }, desc: { es: 'Quiz sin errores', ar: 'اختبار بلا أخطاء', en: 'Quiz with no mistakes' }, icon: '<i class="fas fa-award"></i>' },
    { id: 'streak_3', name: { es: 'Racha de 3', ar: 'سلسلة 3 أيام', en: '3-day streak' }, desc: { es: '3 días consecutivos activos', ar: '3 أيام متتالية من النشاط', en: '3 consecutive active days' }, icon: '<i class="fas fa-fire"></i>' },
    { id: 'streak_7', name: { es: 'Semana espiritual', ar: 'أسبوع روحي', en: 'Spiritual week' }, desc: { es: '7 días consecutivos', ar: '7 أيام متتالية', en: '7 consecutive days' }, icon: '<i class="fas fa-fire"></i>' },
    { id: 'streak_30', name: { es: 'Mes constante', ar: 'شهر من الثبات', en: 'Steady month' }, desc: { es: '30 días consecutivos', ar: '30 يوماً متتالياً', en: '30 consecutive days' }, icon: '<i class="fas fa-fire"></i>' },
    { id: 'quran_master', name: { es: 'Maestro del Corán', ar: 'أستاذ القرآن', en: 'Quran Master' }, desc: { es: '50 respuestas correctas en quiz de Corán', ar: '50 إجابة صحيحة في اختبار القرآن', en: '50 correct answers in the Quran quiz' }, icon: '<i class="fas fa-book-open-reader"></i>' },
    { id: 'sira_lover', name: { es: 'Conocedor de la Sira', ar: 'عاشق السيرة', en: 'Sira lover' }, desc: { es: '50 correctas en Sira', ar: '50 إجابة صحيحة في السيرة', en: '50 correct answers in Sira' }, icon: '<i class="fas fa-mosque"></i>' },
    { id: 'hadith_scholar', name: { es: 'Estudioso del Hadiz', ar: 'باحث الحديث', en: 'Hadith scholar' }, desc: { es: '50 correctas en Hadiz', ar: '50 إجابة صحيحة في الحديث', en: '50 correct answers in Hadith' }, icon: '<i class="fas fa-scroll"></i>' },
    { id: 'fiqh_jurist', name: { es: 'Jurista', ar: 'فقيه', en: 'Jurist' }, desc: { es: '50 correctas en Fiqh', ar: '50 إجابة صحيحة في الفقه', en: '50 correct answers in Fiqh' }, icon: '<i class="fas fa-scale-balanced"></i>' },
    { id: 'history_buff', name: { es: 'Historiador', ar: 'مؤرخ', en: 'Historian' }, desc: { es: '50 correctas en Historia', ar: '50 إجابة صحيحة في التاريخ', en: '50 correct answers in History' }, icon: '<i class="fas fa-moon"></i>' },
    { id: 'prophet_friend', name: { es: 'Amigo de los Profetas', ar: 'صديق الأنبياء', en: 'Friend of the Prophets' }, desc: { es: '50 correctas en Profetas', ar: '50 إجابة صحيحة في الأنبياء', en: '50 correct answers in Prophets' }, icon: '<i class="fas fa-user"></i>' },
    { id: 'tasbih_1000', name: { es: 'Mil dhikrs', ar: 'ألف ذكر', en: 'A thousand dhikrs' }, desc: { es: '1000 conteos en el tasbih', ar: '1000 تسبيحة في المسبحة الرقمية', en: '1000 counts on the tasbih' }, icon: '<i class="fas fa-circle-nodes"></i>' },
    { id: 'all_adhkar', name: { es: 'Devoto del dhikr', ar: 'مواظب على الذكر', en: 'Dhikr devotee' }, desc: { es: 'Completa los 4 sets de adhkar', ar: 'أكمل مجموعات الأذكار الأربع', en: 'Complete the 4 adhkar sets' }, icon: '<i class="fas fa-hands-praying"></i>' },
    { id: 'first_course', name: { es: 'Aprendiz curioso', ar: 'متعلم فضولي', en: 'Curious learner' }, desc: { es: 'Completa tu primer curso', ar: 'أكمل أول دورة لك', en: 'Complete your first course' }, icon: '<i class="fas fa-graduation-cap"></i>' },
    { id: 'all_courses', name: { es: 'Erudito completo', ar: 'عالم شامل', en: 'Complete scholar' }, desc: { es: 'Completa todos los cursos', ar: 'أكمل جميع الدورات', en: 'Complete all courses' }, icon: '<i class="fas fa-crown"></i>' },
    { id: 'level_5', name: { es: 'Conocedor', ar: 'عارف', en: 'Knowledgeable' }, desc: { es: 'Alcanza el nivel 5', ar: 'اصل إلى المستوى 5', en: 'Reach level 5' }, icon: '<i class="fas fa-star"></i>' },
    { id: 'level_10', name: { es: 'Imam', ar: 'إمام', en: 'Imam' }, desc: { es: 'Alcanza el nivel 10', ar: 'اصل إلى المستوى 10', en: 'Reach level 10' }, icon: '<i class="fas fa-mosque"></i>' },
    { id: 'xp_1000', name: { es: 'Mil XP', ar: 'ألف نقطة', en: 'A thousand XP' }, desc: { es: 'Acumula 1000 XP', ar: 'اجمع 1000 نقطة خبرة', en: 'Accumulate 1000 XP' }, icon: '<i class="fas fa-bolt"></i>' },
  ],

  // ============ Estado ============
  getState() {
    return Storage.get('gamification') || {
      xp: 0,
      level: 1,
      lives: this.MAX_LIVES,
      lastLifeRegenTime: Date.now(),
      streak: 0,
      lastActiveDay: null,
      achievements: [],
      stats: {
        quizzesCompleted: 0,
        questionsAnswered: 0,
        correctAnswers: 0,
        coursesCompleted: [],
        adhkarCompleted: [],
        tasbihCount: 0,
        categoryStats: {
          quran: { correct: 0, total: 0 },
          sira: { correct: 0, total: 0 },
          hadith: { correct: 0, total: 0 },
          fiqh: { correct: 0, total: 0 },
          history: { correct: 0, total: 0 },
          prophets: { correct: 0, total: 0 },
        },
      },
    };
  },

  saveState(state) {
    Storage.set('gamification', state);
  },

  // ============ XP y niveles ============
  addXP(amount) {
    const state = this.getState();
    const oldLevel = this.getLevelInfo(state.xp).level;
    state.xp += amount;
    const newLevel = this.getLevelInfo(state.xp).level;
    this.saveState(state);

    // Detectar level up
    if (newLevel > oldLevel) {
      this.onLevelUp(newLevel);
    }

    // Detectar logros por XP
    if (state.xp >= 1000 && !state.achievements.includes('xp_1000')) {
      this.unlockAchievement('xp_1000');
    }
    if (newLevel >= 5 && !state.achievements.includes('level_5')) {
      this.unlockAchievement('level_5');
    }
    if (newLevel >= 10 && !state.achievements.includes('level_10')) {
      this.unlockAchievement('level_10');
    }

    return { newLevel, oldLevel, leveledUp: newLevel > oldLevel };
  },

  getLevelInfo(xp) {
    let current = this.LEVELS[0];
    let next = this.LEVELS[1];
    for (let i = 0; i < this.LEVELS.length; i++) {
      if (xp >= this.LEVELS[i].xp) {
        current = this.LEVELS[i];
        next = this.LEVELS[i + 1] || null;
      }
    }
    const progress = next ? (xp - current.xp) / (next.xp - current.xp) : 1;
    return {
      ...current,
      next,
      progress: Math.min(1, Math.max(0, progress)),
      xpInLevel: xp - current.xp,
      xpForNext: next ? next.xp - current.xp : 0,
    };
  },

  onLevelUp(newLevel) {
    const lvl = this.LEVELS[newLevel - 1];
    const name = typeof L === 'function' ? L(lvl.name) : (lvl.name?.es || lvl.name);
    const lbl = (typeof t === 'function' ? t('level') : '') || 'Nivel';
    showToast(`${lbl} ${newLevel}: ${name}! ${lvl.icon}`, 4000);
  },

  // ============ Vidas ============
  getLives() {
    const state = this.getState();
    // Regenerar vidas según tiempo
    const elapsedMs = Date.now() - state.lastLifeRegenTime;
    const elapsedMin = Math.floor(elapsedMs / 60000);
    if (elapsedMin >= this.LIFE_REGEN_MINUTES && state.lives < this.MAX_LIVES) {
      const livesToAdd = Math.min(
        Math.floor(elapsedMin / this.LIFE_REGEN_MINUTES),
        this.MAX_LIVES - state.lives
      );
      state.lives += livesToAdd;
      state.lastLifeRegenTime = Date.now();
      this.saveState(state);
    }
    return state.lives;
  },

  // v12: lives system disabled — unlimited play, XP always preserved
  loseLife() {
    // No-op: users can play indefinitely without losing lives.
    // XP and progress are always kept.
    const state = this.getState();
    return state.lives;
  },

  // Minutes remaining until next life is granted
  getMinutesToNextLife() {
    const state = this.getState();
    if (state.lives >= this.MAX_LIVES) return 0;
    const elapsedMs = Date.now() - state.lastLifeRegenTime;
    const elapsedMin = elapsedMs / 60000;
    const remaining = this.LIFE_REGEN_MINUTES - (elapsedMin % this.LIFE_REGEN_MINUTES);
    return Math.max(0, remaining);
  },

  // Aggregated stats for UI cards
  getStats() {
    const state = this.getState();
    const levelInfo = this.getLevelInfo(state.xp);
    return {
      xp: state.xp,
      level: levelInfo.level,
      lives: this.getLives(),
      streak: state.streak || 0,
      achievements: state.achievements || [],
      totalAnswered: state.stats?.totalAnswered || 0,
      categoryStats: state.stats?.categoryStats || {},
    };
  },

  // Percentage progress to next level (0-100)
  // Garantizado: instalación nueva => xp = 0 => progreso = 0%.
  // Se clampea a [0, 100] por robustez ante estados corruptos o negativos.
  getProgressToNextLevel(xp) {
    const info = this.getLevelInfo(xp);
    if (!info.next) return 100;
    return Math.max(0, Math.min(100, Math.round(info.progress * 100)));
  },

  timeUntilNextLife() {
    const state = this.getState();
    if (state.lives >= this.MAX_LIVES) return 0;
    const elapsedMs = Date.now() - state.lastLifeRegenTime;
    const remainingMs = (this.LIFE_REGEN_MINUTES * 60000) - elapsedMs;
    return Math.max(0, remainingMs);
  },

  // ============ Racha (streak) ============
  updateStreak() {
    const state = this.getState();
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (state.lastActiveDay === today) {
      // Ya activo hoy, no hacer nada
      return state.streak;
    }
    if (state.lastActiveDay === yesterday) {
      // Continuar racha
      state.streak++;
    } else {
      // Romper racha
      state.streak = 1;
    }
    state.lastActiveDay = today;
    this.saveState(state);

    // Logros por racha
    if (state.streak >= 3 && !state.achievements.includes('streak_3')) {
      this.unlockAchievement('streak_3');
    }
    if (state.streak >= 7 && !state.achievements.includes('streak_7')) {
      this.unlockAchievement('streak_7');
    }
    if (state.streak >= 30 && !state.achievements.includes('streak_30')) {
      this.unlockAchievement('streak_30');
    }

    return state.streak;
  },

  // ============ Logros ============
  unlockAchievement(achievementId) {
    const state = this.getState();
    if (state.achievements.includes(achievementId)) return false;
    state.achievements.push(achievementId);
    this.saveState(state);
    const ach = this.ACHIEVEMENTS.find(a => a.id === achievementId);
    if (ach) {
      const achName = typeof L === 'function' ? L(ach.name) : (ach.name?.es || ach.name);
      const achLbl = (typeof t === 'function' ? t('achievement') : '') || 'Logro';
      showToast(`${achLbl}: ${ach.icon} ${achName}`, 4500);
    }
    return true;
  },

  // ============ Estadísticas por categoría ============
  recordQuizAnswer(category, isCorrect) {
    const state = this.getState();
    state.stats.questionsAnswered++;
    if (isCorrect) state.stats.correctAnswers++;
    if (state.stats.categoryStats[category]) {
      state.stats.categoryStats[category].total++;
      if (isCorrect) state.stats.categoryStats[category].correct++;
    }
    this.saveState(state);

    // Achievements por categoría
    const catMap = {
      quran: 'quran_master',
      sira: 'sira_lover',
      hadith: 'hadith_scholar',
      fiqh: 'fiqh_jurist',
      history: 'history_buff',
      prophets: 'prophet_friend',
    };
    const achId = catMap[category];
    if (achId && state.stats.categoryStats[category].correct >= 50 && !state.achievements.includes(achId)) {
      this.unlockAchievement(achId);
    }
  },

  recordQuizCompleted(perfectScore = false) {
    const state = this.getState();
    state.stats.quizzesCompleted++;
    this.saveState(state);
    if (state.stats.quizzesCompleted === 1) {
      this.unlockAchievement('first_quiz');
    }
    if (perfectScore) {
      this.unlockAchievement('perfect_quiz');
    }
  },

  recordCourseCompleted(courseId) {
    const state = this.getState();
    if (!state.stats.coursesCompleted.includes(courseId)) {
      state.stats.coursesCompleted.push(courseId);
      this.saveState(state);
      if (state.stats.coursesCompleted.length === 1) {
        this.unlockAchievement('first_course');
      }
      if (state.stats.coursesCompleted.length >= 3) {
        this.unlockAchievement('all_courses');
      }
    }
  },

  recordTasbihCount(count = 1) {
    const state = this.getState();
    state.stats.tasbihCount += count;
    this.saveState(state);
    if (state.stats.tasbihCount >= 1000) {
      this.unlockAchievement('tasbih_1000');
    }
  },

  recordAdhkarCompleted(setId) {
    const state = this.getState();
    if (!state.stats.adhkarCompleted.includes(setId)) {
      state.stats.adhkarCompleted.push(setId);
      this.saveState(state);
      if (state.stats.adhkarCompleted.length >= 4) {
        this.unlockAchievement('all_adhkar');
      }
    }
  },
};
