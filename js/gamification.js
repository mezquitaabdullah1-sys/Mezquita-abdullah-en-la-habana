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
  LEVELS: [
    { level: 1, xp: 0, name: 'Iniciado', icon: '🌱', color: '#4CAF50' },
    { level: 2, xp: 50, name: 'Buscador', icon: '🌿', color: '#66BB6A' },
    { level: 3, xp: 150, name: 'Estudiante', icon: '📚', color: '#8BC34A' },
    { level: 4, xp: 300, name: 'Aprendiz', icon: '🎓', color: '#9CCC65' },
    { level: 5, xp: 500, name: 'Conocedor', icon: '💡', color: '#FFA726' },
    { level: 6, xp: 750, name: 'Sabio', icon: '🌟', color: '#FFB74D' },
    { level: 7, xp: 1000, name: 'Maestro', icon: '👳', color: '#FF7043' },
    { level: 8, xp: 1500, name: 'Erudito', icon: '🕌', color: '#D4AF37' },
    { level: 9, xp: 2500, name: 'Hakim', icon: '⭐', color: '#FFD700' },
    { level: 10, xp: 5000, name: 'Imam', icon: '🌙', color: '#9C27B0' },
  ],

  // Logros disponibles
  ACHIEVEMENTS: [
    { id: 'first_quiz', name: 'Primer paso', desc: 'Completa tu primer quiz', icon: '🎯' },
    { id: 'perfect_quiz', name: 'Perfección', desc: 'Quiz sin errores', icon: '💯' },
    { id: 'streak_3', name: 'Racha de 3', desc: '3 días consecutivos activos', icon: '🔥' },
    { id: 'streak_7', name: 'Semana espiritual', desc: '7 días consecutivos', icon: '🔥🔥' },
    { id: 'streak_30', name: 'Mes constante', desc: '30 días consecutivos', icon: '🔥🔥🔥' },
    { id: 'quran_master', name: 'Maestro del Corán', desc: '50 respuestas correctas en quiz de Corán', icon: '📖' },
    { id: 'sira_lover', name: 'Conocedor de la Sira', desc: '50 correctas en Sira', icon: '🕋' },
    { id: 'hadith_scholar', name: 'Estudioso del Hadiz', desc: '50 correctas en Hadiz', icon: '📜' },
    { id: 'fiqh_jurist', name: 'Jurista', desc: '50 correctas en Fiqh', icon: '⚖️' },
    { id: 'history_buff', name: 'Historiador', desc: '50 correctas en Historia', icon: '🌙' },
    { id: 'prophet_friend', name: 'Amigo de los Profetas', desc: '50 correctas en Profetas', icon: '👨' },
    { id: 'tasbih_1000', name: 'Mil dhikrs', desc: '1000 conteos en el tasbih', icon: '📿' },
    { id: 'all_adhkar', name: 'Devoto del dhikr', desc: 'Completa los 4 sets de adhkar', icon: '🤲' },
    { id: 'first_course', name: 'Aprendiz curioso', desc: 'Completa tu primer curso', icon: '🎓' },
    { id: 'all_courses', name: 'Erudito completo', desc: 'Completa todos los cursos', icon: '👑' },
    { id: 'level_5', name: 'Conocedor', desc: 'Alcanza el nivel 5', icon: '🌟' },
    { id: 'level_10', name: 'Imam', desc: 'Alcanza el nivel 10', icon: '🕌' },
    { id: 'xp_1000', name: 'Mil XP', desc: 'Acumula 1000 XP', icon: '⚡' },
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
    showToast(`🎉 ¡Nivel ${newLevel}: ${lvl.name}! ${lvl.icon}`, 4000);
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

  loseLife() {
    const state = this.getState();
    if (state.lives > 0) {
      state.lives--;
      if (state.lives < this.MAX_LIVES) {
        state.lastLifeRegenTime = Date.now();
      }
      this.saveState(state);
    }
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
  getProgressToNextLevel(xp) {
    const info = this.getLevelInfo(xp);
    if (!info.next) return 100;
    return Math.round(info.progress * 100);
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
      showToast(`🏆 Logro: ${ach.icon} ${ach.name}`, 4500);
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
