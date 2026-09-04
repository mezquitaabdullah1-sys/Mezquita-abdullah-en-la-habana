// 📚 Cursos Interactivos — Self-contained, with mascot guide, gamification, certificates
const CoursesPage = {
  state: null, // current lesson playing state

  // Auto-registers all loaded COURSE_* globals
  getAllCourses() {
    const courses = [];
    if (typeof COURSE_ARABIC_LANGUAGE !== 'undefined') courses.push(COURSE_ARABIC_LANGUAGE);
    if (typeof COURSE_JOURNEY !== 'undefined') courses.push(COURSE_JOURNEY);
    if (typeof COURSE_SALAH_COMPLETE !== 'undefined') courses.push(COURSE_SALAH_COMPLETE);
    if (typeof COURSE_WUDU_COMPLETE !== 'undefined') courses.push(COURSE_WUDU_COMPLETE);
    if (typeof COURSE_QURAN_BASICS !== 'undefined') courses.push(COURSE_QURAN_BASICS);
    if (typeof COURSE_PILLARS !== 'undefined') courses.push(COURSE_PILLARS);
    if (typeof COURSE_NAMES !== 'undefined') courses.push(COURSE_NAMES);
    if (typeof COURSE_KIDS !== 'undefined') courses.push(COURSE_KIDS);
    return courses;
  },

  // ============ HUB ============
  renderHub(container) {
    const courses = this.getAllCourses();
    const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
    const gameState = Gamification.getState();
    const userProgress = gameState.stats?.coursesProgress || {};
    const completedCourses = gameState.stats?.coursesCompleted || [];
    const totalXp = gameState.xp || 0;
    const streak = gameState.streak || 0;

    container.innerHTML = `
      <div class="top-bar courses-top-bar">
        <button class="top-bar-btn" onclick="Router.go('wisdom')">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title"><i class="fas fa-book-open"></i> ${t('coursesTitle') || 'Cursos'}</div>
        <div style="width: 30px;"></div>
      </div>

      <!-- Hero: mascot welcome -->
      <div class="courses-hero">
        ${Mascot.renderWithSpeech('welcome', t('coursesWelcome') || '¡Hola! Empieza tu viaje <i class="fas fa-moon"></i>', 'large')}
        <div class="courses-progress-row">
          <div class="cp-stat"><span class="cp-emoji"><i class="fas fa-star"></i></span><span class="cp-val">${totalXp}</span><span class="cp-lbl">XP</span></div>
          <div class="cp-stat"><span class="cp-emoji"><i class="fas fa-fire"></i></span><span class="cp-val">${streak}</span><span class="cp-lbl">${t('streak') || 'racha'}</span></div>
          <div class="cp-stat"><span class="cp-emoji"><i class="fas fa-trophy"></i></span><span class="cp-val">${completedCourses.length}</span><span class="cp-lbl">${t('completed') || 'completos'}</span></div>
        </div>
      </div>

      <div style="padding: 0 var(--sp-md) var(--sp-md);">
        <!-- Featured / Current course -->
        ${this.renderFeatured(courses, userProgress, lang)}

        <!-- All courses -->
        <h2 class="section-title"><i class="fas fa-book-open"></i> ${t('allCourses') || 'Todos los cursos'}</h2>
        <div class="courses-grid">
          ${courses.map(c => this.renderCourseCard(c, userProgress, completedCourses, lang)).join('')}
        </div>

        <!-- Achievements showcase -->
        ${this.renderAchievements(gameState)}
      </div>
    `;
  },

  renderFeatured(courses, userProgress, lang) {
    // Show course in progress (or the first incomplete one)
    let featured = null;
    for (const c of courses) {
      const prog = userProgress[c.id];
      if (prog && prog.completedLessons > 0 && !prog.completed) {
        featured = c;
        break;
      }
    }
    if (!featured) return '';

    const prog = userProgress[featured.id] || {};
    const total = this.countLessons(featured);
    const pct = total > 0 ? Math.round((prog.completedLessons / total) * 100) : 0;

    return `
      <div class="featured-course-card" onclick="CoursesPage.openCourse('${featured.id}')" style="--course-color: ${featured.color};">
        <div class="featured-badge">${t('continueLearning') || '▶ Continuar'}</div>
        <div class="featured-icon">${featured.icon}</div>
        <div class="featured-info">
          <div class="featured-title">${featured.title[lang] || featured.title.es}</div>
          <div class="featured-progress-bar">
            <div class="featured-progress-fill" style="width:${pct}%; background:${featured.color};"></div>
          </div>
          <div class="featured-progress-text">${prog.completedLessons || 0} / ${total} · ${pct}%</div>
        </div>
        <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} featured-arrow"></i>
      </div>
    `;
  },

  renderCourseCard(course, userProgress, completedCourses, lang) {
    const prog = userProgress[course.id] || { completedLessons: 0 };
    const total = this.countLessons(course);
    const pct = total > 0 ? Math.round((prog.completedLessons / total) * 100) : 0;
    const isDone = completedCourses.includes(course.id);

    return `
      <div class="course-card" onclick="CoursesPage.openCourse('${course.id}')" style="--course-color: ${course.color};">
        <div class="course-card-header" style="background: linear-gradient(135deg, ${course.color}, ${course.color}dd);">
          <div class="course-card-icon">${course.icon}</div>
          ${isDone ? `<div class="course-done-badge"><i class="fas fa-check"></i></div>` : ''}
          <div class="course-card-meta">
            <span><i class="fas fa-clock"></i> ${course.durationMin}m</span>
            <span><i class="fas fa-signal"></i> ${this.difficultyIcon(course.difficulty)}</span>
          </div>
        </div>
        <div class="course-card-body">
          <div class="course-card-title">${course.title[lang] || course.title.es}</div>
          <div class="course-card-desc">${(course.description[lang] || course.description.es).slice(0, 80)}...</div>
          <div class="course-card-progress">
            <div class="ccp-bar"><div class="ccp-fill" style="width:${pct}%; background:${course.color};"></div></div>
            <div class="ccp-text">${pct}%</div>
          </div>
        </div>
      </div>
    `;
  },

  renderAchievements(gameState) {
    const achievements = gameState.achievements || [];
    if (achievements.length === 0) return '';
    return `
      <h2 class="section-title"><i class="fas fa-trophy"></i> ${t('achievements') || 'Logros'}</h2>
      <div class="achievements-row">
        ${achievements.slice(0, 6).map(a => `
          <div class="achievement-badge">
            <div class="ab-icon"><i class="fas fa-medal"></i></div>
            <div class="ab-name">${a}</div>
          </div>
        `).join('')}
      </div>
    `;
  },

  countLessons(course) {
    return course.stations.reduce((sum, s) => sum + s.lessons.length, 0);
  },

  difficultyIcon(d) {
    return d === 'easy' ? '●○○' : d === 'intermediate' ? '●●○' : d === 'beginner' ? '●○○' : '●●●';
  },

  // ============ COURSE OVERVIEW ============
  openCourse(courseId) {
    const container = document.getElementById('main-content');
    const course = this.getAllCourses().find(c => c.id === courseId);
    if (!course) {
      this.renderHub(container);
      return;
    }
    this.renderCourseOverview(container, course);
  },

  renderCourseOverview(container, course) {
    const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
    const gameState = Gamification.getState();
    const prog = gameState.stats?.coursesProgress?.[course.id] || { completedStations: [], completedLessons: 0 };
    const total = this.countLessons(course);
    const pct = total > 0 ? Math.round((prog.completedLessons / total) * 100) : 0;

    container.innerHTML = `
      <div class="top-bar" style="background: linear-gradient(135deg, ${course.color}, ${course.color}dd);">
        <button class="top-bar-btn" onclick="Router.go('wisdom/courses')" style="color:#fff;">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title" style="color:#fff;">${course.icon} ${course.title[lang] || course.title.es}</div>
        <div style="width: 30px;"></div>
      </div>

      <div class="course-overview" style="--course-color: ${course.color};">
        <div class="overview-hero" style="background: linear-gradient(135deg, ${course.color}, ${course.color}dd);">
          ${Mascot.render(course.mascotPose || 'welcome', 'large', 'mascot-pop-in')}
          <div class="overview-title">${course.title[lang] || course.title.es}</div>
          <div class="overview-desc">${course.description[lang] || course.description.es}</div>
          <div class="overview-meta">
            <span><i class="fas fa-clock"></i> ${course.durationMin} min</span>
            <span><i class="fas fa-map-marker-alt"></i> ${course.stations.length} ${t('stations') || 'estaciones'}</span>
            <span><i class="fas fa-list"></i> ${total} ${t('lessons') || 'lecciones'}</span>
          </div>
          <div class="overview-progress">
            <div class="overview-progress-bar"><div class="overview-progress-fill" style="width:${pct}%;"></div></div>
            <div class="overview-progress-text">${prog.completedLessons || 0} / ${total} · ${pct}%</div>
          </div>
        </div>

        <div class="stations-list">
          <h3><i class="fas fa-map"></i> ${t('stations') || 'Estaciones'}</h3>
          ${course.stations.map((s, idx) => {
            const isDone = prog.completedStations?.includes(s.id);
            const isLocked = idx > 0 && !prog.completedStations?.includes(course.stations[idx-1].id);
            const onClick = isLocked
              ? `CoursesPage.showLocked()`
              : `CoursesPage.startStation('${course.id}', '${s.id}')`;
            return `
              <div class="station-row ${isDone ? 'done' : ''} ${isLocked ? 'locked' : ''}" onclick="${onClick}">
                <div class="station-num" style="background:${isDone ? '#4CAF50' : (isLocked ? '#999' : course.color)};">
                  ${isDone ? '<i class="fas fa-check"></i>' : (isLocked ? '<i class="fas fa-lock"></i>' : (idx + 1))}
                </div>
                <div class="station-info">
                  <div class="station-title">${s.icon} ${s.title[lang] || s.title.es}</div>
                  <div class="station-meta">${s.lessons.length} ${t('lessons') || 'lecciones'}</div>
                </div>
                <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'}"></i>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  showLocked() {
    Mascot.showTip(t('lockedStation') || '<i class="fas fa-lock"></i> Completa la estación anterior primero', 'thinking', 2500);
  },

  // ============ LESSON PLAYBACK ============
  startStation(courseId, stationId) {
    const course = this.getAllCourses().find(c => c.id === courseId);
    if (!course) return;
    const station = course.stations.find(s => s.id === stationId);
    if (!station) return;

    this.state = {
      courseId, stationId,
      course, station,
      lessonIdx: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      startTime: Date.now(),
    };
    const container = document.getElementById('main-content');
    this.renderStationIntro(container);
  },

  renderStationIntro(container) {
    const { course, station } = this.state;
    const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');

    container.innerHTML = `
      <div class="lesson-screen" style="--course-color: ${course.color};">
        <div class="lesson-topbar">
          <button class="lesson-close" onclick="CoursesPage.exitLesson()">
            <i class="fas fa-times"></i>
          </button>
          <div class="lesson-progress-track">
            <div class="lesson-progress-fill" id="lesson-progress-fill" style="width:0%; background:${course.color};"></div>
          </div>
        </div>
        <div class="station-intro-content">
          ${Mascot.renderWithSpeech(course.mascotPose || 'welcome', (station.mascotIntro && (station.mascotIntro[lang] || station.mascotIntro.es)) || '', 'xl')}
          <h2 class="station-intro-title">${station.icon} ${station.title[lang] || station.title.es}</h2>
          <div class="station-intro-meta">${station.lessons.length} ${t('lessons') || 'lecciones'}</div>
          <button class="btn-primary station-start-btn" onclick="CoursesPage.nextLesson()" style="background:${course.color};">
            ${t('start') || 'Empezar'} →
          </button>
        </div>
      </div>
    `;
  },

  nextLesson() {
    const { course, station, lessonIdx } = this.state;
    const container = document.getElementById('main-content');

    if (lessonIdx >= station.lessons.length) {
      // Station complete!
      this.completeStation(container);
      return;
    }

    const lesson = station.lessons[lessonIdx];
    const progress = ((lessonIdx + 1) / station.lessons.length) * 100;

    container.innerHTML = `
      <div class="lesson-screen" style="--course-color: ${course.color};">
        <div class="lesson-topbar">
          <button class="lesson-close" onclick="CoursesPage.exitLesson()">
            <i class="fas fa-times"></i>
          </button>
          <div class="lesson-progress-track">
            <div class="lesson-progress-fill" style="width:${progress}%; background:${course.color};"></div>
          </div>
          <div class="lesson-counter">${lessonIdx + 1}/${station.lessons.length}</div>
        </div>
        <div class="lesson-content" id="lesson-content">
          ${this.renderLesson(lesson)}
        </div>
      </div>
    `;

    // Init drag-drop if needed
    if (lesson.type === 'drag_drop') {
      setTimeout(() => this.initDragDrop(), 100);
    }
  },

  renderLesson(lesson) {
    const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
    switch (lesson.type) {
      case 'card': return this.renderCardLesson(lesson, lang);
      case 'quiz': return this.renderQuizLesson(lesson, lang);
      case 'flashcards': return this.renderFlashcards(lesson, lang);
      case 'drag_drop': return this.renderDragDrop(lesson, lang);
      case 'prayer_step': return this.renderPrayerStep(lesson, lang);
      case 'wudu_step': return this.renderWuduStep(lesson, lang);
      case 'arabic_letter': return this.renderArabicLetter(lesson, lang);
      default: return `<div>${t('unknownLessonType') || 'Unknown lesson type'}</div>`;
    }
  },

  // ----- Arabic Letter lesson (NEW: with Web Speech API audio) -----
  renderArabicLetter(lesson, lang) {
    const letterName = lesson.name.translit + ' (' + lesson.name.ar + ')';
    const soundDesc = typeof lesson.sound === 'object' ? (lesson.sound[lang] || lesson.sound.es) : lesson.sound;
    const noteText = lesson.note ? (typeof lesson.note === 'object' ? (lesson.note[lang] || lesson.note.es) : lesson.note) : '';
    const exWord = lesson.example ? lesson.example.word : '';
    const exTranslit = lesson.example ? lesson.example.translit : '';
    const exMeaning = lesson.example ? (typeof lesson.example.meaning === 'object' ? (lesson.example.meaning[lang] || lesson.example.meaning.es) : lesson.example.meaning) : '';
    const exEmoji = lesson.example ? (lesson.example.emoji || '') : '';

    const soundLabel = lang === 'ar' ? 'الصوت' : (lang === 'en' ? 'Sound' : 'Sonido');
    const formsLabel = lang === 'ar' ? 'الأشكال الأربعة' : (lang === 'en' ? 'The 4 forms' : 'Las 4 formas');
    const exampleLabel = lang === 'ar' ? 'مثال' : (lang === 'en' ? 'Example' : 'Ejemplo');
    const isolatedLbl = lang === 'ar' ? 'منفصل' : (lang === 'en' ? 'Isolated' : 'Aislada');
    const initialLbl = lang === 'ar' ? 'أوّل' : (lang === 'en' ? 'Initial' : 'Inicial');
    const medialLbl = lang === 'ar' ? 'وسط' : (lang === 'en' ? 'Medial' : 'Medial');
    const finalLbl = lang === 'ar' ? 'أخير' : (lang === 'en' ? 'Final' : 'Final');
    const listenLbl = lang === 'ar' ? 'استمع' : (lang === 'en' ? 'Listen' : 'Escuchar');

    // Sanitize word for JS injection into onclick
    const speak = (txt) => txt.replace(/'/g, "\\'").replace(/"/g, '&quot;');

    return `
      <div class="arabic-letter-lesson">
        <div class="al-letter-hero">
          <div class="al-letter-glyph" dir="rtl">${lesson.letter}</div>
          <div class="al-letter-name">${letterName}</div>
          <button class="al-speak-btn" onclick="CoursesPage.speakArabic('${speak(lesson.letter)}')" aria-label="${listenLbl}">
            <i class="fas fa-volume-high"></i> ${listenLbl}
          </button>
        </div>

        <div class="al-section">
          <div class="al-section-label"><i class="fas fa-waveform"></i> ${soundLabel}</div>
          <div class="al-sound-desc">${soundDesc}</div>
        </div>

        ${lesson.forms ? `
          <div class="al-section">
            <div class="al-section-label"><i class="fas fa-shapes"></i> ${formsLabel}</div>
            <div class="al-forms-grid">
              <div class="al-form-cell">
                <div class="al-form-glyph" dir="rtl">${lesson.forms.isolated}</div>
                <div class="al-form-lbl">${isolatedLbl}</div>
              </div>
              <div class="al-form-cell">
                <div class="al-form-glyph" dir="rtl">${lesson.forms.initial}</div>
                <div class="al-form-lbl">${initialLbl}</div>
              </div>
              <div class="al-form-cell">
                <div class="al-form-glyph" dir="rtl">${lesson.forms.medial}</div>
                <div class="al-form-lbl">${medialLbl}</div>
              </div>
              <div class="al-form-cell">
                <div class="al-form-glyph" dir="rtl">${lesson.forms.final}</div>
                <div class="al-form-lbl">${finalLbl}</div>
              </div>
            </div>
            ${lesson.notConnects ? `<div class="al-warning"><i class="fas fa-triangle-exclamation"></i> ${lang === 'ar' ? 'لا يتّصل بما بعده' : (lang === 'en' ? 'Does NOT connect to the next letter' : 'NO se conecta con la letra siguiente')}</div>` : ''}
          </div>
        ` : ''}

        ${lesson.example ? `
          <div class="al-section al-example-card">
            <div class="al-section-label"><i class="fas fa-lightbulb"></i> ${exampleLabel}</div>
            <div class="al-example-row">
              <div class="al-example-emoji">${exEmoji}</div>
              <div class="al-example-content">
                <div class="al-example-word" dir="rtl">${exWord}</div>
                <div class="al-example-translit">${exTranslit}</div>
                <div class="al-example-meaning">${exMeaning}</div>
              </div>
              <button class="al-speak-btn small" onclick="CoursesPage.speakArabic('${speak(exWord)}')" aria-label="${listenLbl}">
                <i class="fas fa-volume-high"></i>
              </button>
            </div>
          </div>
        ` : ''}

        ${noteText ? `<div class="al-note"><i class="fas fa-circle-info"></i> ${noteText}</div>` : ''}

        ${lesson.source ? `<div class="lesson-source"><i class="fas fa-book"></i> ${lesson.source}</div>` : ''}

        <button class="btn-primary lesson-continue-btn" onclick="CoursesPage.advance()">
          ${t('nextStep') || 'Siguiente'} →
        </button>
      </div>
    `;
  },

  // Speak Arabic text using Web Speech API
  speakArabic(text) {
    if (!('speechSynthesis' in window)) {
      showToast('Audio not supported in this browser', 1800);
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'ar-SA';
      utter.rate = 0.75;
      utter.pitch = 1.0;
      // Try to find an Arabic voice
      const voices = window.speechSynthesis.getVoices();
      const arVoice = voices.find(v => v.lang && v.lang.startsWith('ar'));
      if (arVoice) utter.voice = arVoice;
      window.speechSynthesis.speak(utter);
      // Visual feedback
      if (navigator.vibrate) navigator.vibrate(30);
    } catch (e) {
      console.error('speakArabic error', e);
    }
  },

  // ----- Prayer step lesson (special, with real photo + dhikr) -----
  renderPrayerStep(lesson, lang) {
    const title = lesson.title[lang] || lesson.title.es;
    const description = lesson.description[lang] || lesson.description.es;
    const tip = lesson.tip ? (lesson.tip[lang] || lesson.tip.es) : '';
    const transRaw = lesson.dhikr.translation;
    const dhikrTrans = typeof transRaw === 'object' ? (transRaw[lang] || transRaw.es) : transRaw;
    const secondDhikrTrans = lesson.secondDhikr
      ? (typeof lesson.secondDhikr.translation === 'object'
          ? (lesson.secondDhikr.translation[lang] || lesson.secondDhikr.translation.es)
          : lesson.secondDhikr.translation)
      : null;

    return `
      <div class="prayer-step-lesson">
        <div class="ps-step-badge">${lesson.stepNumber || ''}</div>
        <h2 class="ps-title">${title}</h2>

        <div class="ps-image-wrap">
          <picture>
            <source srcset="assets/prayer/${lesson.image}.webp" type="image/webp">
            <img src="assets/prayer/${lesson.image}.png" alt="${escapeHtml(title)}" class="ps-image" loading="lazy">
          </picture>
        </div>

        <div class="ps-description">${description}</div>

        <!-- Main Dhikr -->
        <div class="ps-dhikr-card">
          <div class="ps-dhikr-label"><i class="fas fa-scroll"></i> ${t('whatToSay') || 'Qué decir'}</div>
          <div class="ps-dhikr-arabic" dir="rtl">${lesson.dhikr.arabic}</div>
          <div class="ps-dhikr-translit"><i class="fas fa-volume-high"></i> ${lesson.dhikr.translit}</div>
          <div class="ps-dhikr-translation">«${dhikrTrans}»</div>
        </div>

        ${lesson.secondDhikr ? `
          <div class="ps-dhikr-card ps-dhikr-secondary">
            <div class="ps-dhikr-label">${t('thenSay') || 'Luego di'}</div>
            <div class="ps-dhikr-arabic" dir="rtl">${lesson.secondDhikr.arabic}</div>
            <div class="ps-dhikr-translit"><i class="fas fa-volume-high"></i> ${lesson.secondDhikr.translit}</div>
            <div class="ps-dhikr-translation">«${secondDhikrTrans}»</div>
          </div>
        ` : ''}

        ${tip ? `<div class="ps-tip">${tip}</div>` : ''}

        ${lesson.source ? `<div class="lesson-source"><i class="fas fa-book"></i> ${lesson.source}</div>` : ''}

        <button class="btn-primary lesson-continue-btn" onclick="CoursesPage.advance()">
          ${t('nextStep') || 'Siguiente paso'} →
        </button>
      </div>
    `;
  },

  // ----- Wudu step lesson -----
  // FIX v20.1: supports both nested ({es,ar,en}) and flat (title_es) shapes.
  // Previously the flat-only reads produced `[object Object]` and empty gaps
  // because wudu_complete.js uses the nested shape.
  renderWuduStep(lesson, lang) {
    // Localized text — use _loc() so nested OR flat works
    const title = this._loc(lesson, 'title', lang);
    const description = this._loc(lesson, 'description', lang);

    // Hadith Arabic text is language-neutral (Arabic script) — always shown
    const hadith = lesson.hadith || '';

    // Hadith translation: try requested lang → fall back to Spanish → English
    // Arabic UI reader doesn't need a translation (the hadith IS Arabic), so
    // if we're in Arabic and no _ar translation exists, keep it empty (clean look)
    let hadithTrans = lesson[`hadith_translation_${lang}`] || '';
    if (!hadithTrans && lang !== 'ar') {
      hadithTrans = lesson.hadith_translation_es || lesson.hadith_translation_en || '';
    }

    // Dhikr meaning: same fallback strategy
    let dhikrMeaning = lesson[`dhikr_meaning_${lang}`] || '';
    if (!dhikrMeaning && lang !== 'ar') {
      dhikrMeaning = lesson.dhikr_meaning_es || lesson.dhikr_meaning_en || '';
    }

    // Defensive normalization — never let an object leak into the DOM
    const safeTitle = (typeof title === 'object') ? (title[lang] || title.es || title.en || '') : (title || '');
    const safeDescription = (typeof description === 'object') ? (description[lang] || description.es || description.en || '') : (description || '');

    return `
      <div class="prayer-step-lesson wudu-step-lesson">
        <div class="ps-step-badge" style="background:linear-gradient(135deg,#42A5F5,#1976D2);">${lesson.number || ''}</div>
        <h2 class="ps-title">${escapeHtml(safeTitle)}</h2>

        <div class="ps-image-wrap">
          <picture>
            <source srcset="assets/wudu/${lesson.image}.webp" type="image/webp">
            <img src="assets/wudu/${lesson.image}.png" alt="${escapeHtml(safeTitle)}" class="ps-image" loading="lazy" onerror="this.style.display='none'">
          </picture>
        </div>

        ${safeDescription ? `<div class="ps-description" style="white-space:pre-line;">${escapeHtml(safeDescription)}</div>` : ''}

        ${lesson.dhikr ? `
          <div class="ps-dhikr-card">
            <div class="ps-dhikr-label"><i class="fas fa-scroll"></i> ${t('whatToSay') || 'Qué decir'}</div>
            <div class="ps-dhikr-arabic" dir="rtl">${escapeHtml(lesson.dhikr)}</div>
            ${lesson.dhikr_translit ? `<div class="ps-dhikr-translit"><i class="fas fa-volume-high"></i> ${escapeHtml(lesson.dhikr_translit)}</div>` : ''}
            ${dhikrMeaning ? `<div class="ps-dhikr-translation">«${escapeHtml(dhikrMeaning)}»</div>` : ''}
          </div>
        ` : ''}

        ${hadith ? `
          <div class="ps-hadith-card">
            <div class="ps-hadith-label"><i class="fas fa-book-open-reader"></i> ${t('hadith') || 'Hadiz'}</div>
            <div class="ps-hadith-text">${escapeHtml(hadith)}</div>
            ${hadithTrans ? `<div class="ps-hadith-trans">«${escapeHtml(hadithTrans)}»</div>` : ''}
          </div>
        ` : ''}

        <button class="btn-primary lesson-continue-btn" onclick="CoursesPage.advance()">
          ${t('nextStep') || 'Siguiente paso'} →
        </button>
      </div>
    `;
  },

  // ----- Card lesson -----
  // Helper: read a localized field supporting both nested (title.es) and flat (title_es) shapes
  _loc(lesson, field, lang) {
    if (lesson[field] && typeof lesson[field] === 'object') {
      return lesson[field][lang] || lesson[field].es || '';
    }
    return lesson[`${field}_${lang}`] || lesson[`${field}_es`] || lesson[field] || '';
  },

  renderCardLesson(lesson, lang) {
    const title = this._loc(lesson, 'title', lang);
    const content = this._loc(lesson, 'content', lang);

    return `
      <div class="lesson-card">
        ${Mascot.render('thinking', 'medium', 'lesson-mascot mascot-float')}
        <h2 class="lesson-card-title">${title}</h2>
        <div class="lesson-card-content">${this.formatContent(content)}</div>
        ${lesson.source ? `<div class="lesson-source"><i class="fas fa-book"></i> ${lesson.source}</div>` : ''}
        <button class="btn-primary lesson-continue-btn" onclick="CoursesPage.advance()">
          ${t('understand') || 'Lo entiendo'} →
        </button>
      </div>
    `;
  },

  formatContent(text) {
    // Convert newlines to <br> and preserve emojis
    return text.split('\n').map(line => `<p>${line.trim()}</p>`).join('');
  },

  // ----- Quiz lesson -----
  renderQuizLesson(lesson, lang) {
    const question = this._loc(lesson, 'question', lang);
    // options may be nested arr per lang (options_es/ar/en) or array of objects
    let options;
    if (lesson[`options_${lang}`]) {
      options = lesson[`options_${lang}`];
    } else if (lesson.options_es) {
      options = lesson.options_es;
    } else {
      options = lesson.options.map(opt => typeof opt === 'object' ? (opt[lang] || opt.es) : opt);
    }

    return `
      <div class="lesson-quiz">
        ${Mascot.render('thinking', 'medium', 'lesson-mascot')}
        <h2 class="lesson-quiz-q">${question}</h2>
        <div class="lesson-quiz-options" id="lesson-quiz-options">
          ${options.map((opt, idx) => `
            <button class="lq-option" data-idx="${idx}" onclick="CoursesPage.answerQuiz(${idx})">
              <span class="lq-letter">${String.fromCharCode(65 + idx)}</span>
              <span class="lq-text">${opt}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  answerQuiz(idx) {
    const lesson = this.state.station.lessons[this.state.lessonIdx];
    const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
    const isCorrect = idx === lesson.correct;
    const feedback = this._loc(lesson, 'feedback', lang) || this._loc(lesson, 'explanation', lang);

    // Disable all options & mark
    document.querySelectorAll('.lq-option').forEach((btn, i) => {
      btn.disabled = true;
      if (i === lesson.correct) btn.classList.add('correct');
      else if (i === idx && !isCorrect) btn.classList.add('wrong');
    });

    if (isCorrect) {
      this.state.correctAnswers++;
      if (navigator.vibrate) navigator.vibrate(50);
    } else {
      this.state.wrongAnswers++;
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }

    // Inject feedback bubble + continue button
    const content = document.getElementById('lesson-content');
    const banner = document.createElement('div');
    banner.className = `quiz-feedback ${isCorrect ? 'correct' : 'wrong'}`;
    banner.innerHTML = `
      <div class="qf-row">
        ${Mascot.render(isCorrect ? 'celebrate' : 'shy', 'small')}
        <div class="qf-text">
          <div class="qf-status">${isCorrect ? '<i class="fas fa-circle-check"></i> ' + (t('correct') || '¡Correcto!') : '<i class="fas fa-lightbulb"></i> ' + (t('learn') || 'Aprendamos')}</div>
          <div class="qf-explanation">${feedback}</div>
        </div>
      </div>
      <button class="btn-primary" onclick="CoursesPage.advance()">${t('continue') || 'Continuar'} →</button>
    `;
    content.appendChild(banner);
    banner.scrollIntoView({ behavior: 'smooth', block: 'end' });
  },

  // ----- Flashcards -----
  renderFlashcards(lesson, lang) {
    const title = lesson.title[lang] || lesson.title.es;
    return `
      <div class="lesson-flashcards">
        ${Mascot.render('encourage', 'medium', 'lesson-mascot')}
        <h2 class="lesson-fc-title">${title}</h2>
        <div class="lesson-fc-hint"><i class="fas fa-hand-point-up"></i> ${t('tapToFlip') || 'Toca para girar'}</div>
        <div class="flashcards-grid">
          ${lesson.cards.map((card, idx) => {
            const front = typeof card.front === 'object' ? (card.front[lang] || card.front.es) : card.front;
            const back = typeof card.back === 'object' ? (card.back[lang] || card.back.es) : card.back;
            return `
              <div class="flashcard" onclick="this.classList.toggle('flipped')">
                <div class="flashcard-inner">
                  <div class="flashcard-front">${front}</div>
                  <div class="flashcard-back">${back}</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        <button class="btn-primary lesson-continue-btn" onclick="CoursesPage.advance()">
          ${t('done') || 'Listo'} →
        </button>
      </div>
    `;
  },

  // ----- Drag & Drop -----
  renderDragDrop(lesson, lang) {
    const title = lesson.title[lang] || lesson.title.es;
    const instruction = lesson.instruction[lang] || lesson.instruction.es;
    // Shuffle items for the puzzle
    const shuffled = [...lesson.items].sort(() => Math.random() - 0.5);

    return `
      <div class="lesson-dragdrop">
        ${Mascot.render('thinking', 'medium', 'lesson-mascot')}
        <h2 class="lesson-dd-title">${title}</h2>
        <div class="lesson-dd-instruction">${instruction}</div>
        <div class="dd-items" id="dd-items">
          ${shuffled.map(item => {
            const label = typeof item.label === 'object' ? (item.label[lang] || item.label.es) : item.label;
            return `
              <div class="dd-item" draggable="true" data-id="${item.id}" data-order="${item.order}">
                <i class="fas fa-grip-vertical"></i>
                <span>${label}</span>
              </div>
            `;
          }).join('')}
        </div>
        <button class="btn-primary lesson-continue-btn" onclick="CoursesPage.checkDragDrop()">
          ${t('checkAnswer') || 'Verificar'} <i class="fas fa-check"></i>
        </button>
      </div>
    `;
  },

  initDragDrop() {
    const container = document.getElementById('dd-items');
    if (!container) return;
    let dragged = null;

    container.addEventListener('dragstart', e => {
      dragged = e.target.closest('.dd-item');
      if (dragged) dragged.classList.add('dragging');
    });
    container.addEventListener('dragend', e => {
      if (dragged) dragged.classList.remove('dragging');
      dragged = null;
    });
    container.addEventListener('dragover', e => {
      e.preventDefault();
      const target = e.target.closest('.dd-item');
      if (target && target !== dragged) {
        const rect = target.getBoundingClientRect();
        const after = (e.clientY - rect.top) > rect.height / 2;
        container.insertBefore(dragged, after ? target.nextSibling : target);
      }
    });

    // Touch support (basic)
    let touchDragging = null;
    container.querySelectorAll('.dd-item').forEach(item => {
      item.addEventListener('touchstart', e => {
        touchDragging = item;
        item.classList.add('dragging');
      }, { passive: true });
      item.addEventListener('touchmove', e => {
        if (!touchDragging) return;
        e.preventDefault();
        const touch = e.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY)?.closest('.dd-item');
        if (target && target !== touchDragging) {
          const rect = target.getBoundingClientRect();
          const after = (touch.clientY - rect.top) > rect.height / 2;
          container.insertBefore(touchDragging, after ? target.nextSibling : target);
        }
      }, { passive: false });
      item.addEventListener('touchend', () => {
        if (touchDragging) touchDragging.classList.remove('dragging');
        touchDragging = null;
      });
    });
  },

  checkDragDrop() {
    const items = [...document.querySelectorAll('#dd-items .dd-item')];
    let correct = true;
    items.forEach((el, idx) => {
      const expected = idx + 1;
      const actual = parseInt(el.dataset.order, 10);
      if (expected !== actual) {
        correct = false;
        el.classList.add('wrong');
      } else {
        el.classList.add('correct');
      }
    });

    const content = document.getElementById('lesson-content');
    const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
    const banner = document.createElement('div');
    banner.className = `quiz-feedback ${correct ? 'correct' : 'wrong'}`;
    banner.innerHTML = `
      <div class="qf-row">
        ${Mascot.render(correct ? 'celebrate' : 'shy', 'small')}
        <div class="qf-text">
          <div class="qf-status">${correct ? '<i class="fas fa-circle-check"></i> ' + (t('correct') || '¡Perfecto!') : '<i class="fas fa-lightbulb"></i> ' + (t('tryAgain') || 'Vuelve a intentarlo')}</div>
          <div class="qf-explanation">${correct ? (t('orderCorrect') || 'Has ordenado correctamente.') : (t('orderWrong') || 'Casi. El orden correcto te ayudará a recordarlo.')}</div>
        </div>
      </div>
      <button class="btn-primary" onclick="CoursesPage.advance()">${t('continue') || 'Continuar'} →</button>
    `;
    content.appendChild(banner);
    if (correct) this.state.correctAnswers++; else this.state.wrongAnswers++;
    if (navigator.vibrate) navigator.vibrate(correct ? 50 : [100, 50, 100]);
    banner.scrollIntoView({ behavior: 'smooth', block: 'end' });
  },

  // Advance to next lesson
  advance() {
    Gamification.addXP(Gamification.XP_PER_LESSON || 25);
    // Save progress
    this.recordLessonComplete();
    this.state.lessonIdx++;
    this.nextLesson();
  },

  recordLessonComplete() {
    const state = Gamification.getState();
    if (!state.stats.coursesProgress) state.stats.coursesProgress = {};
    const cid = this.state.courseId;
    if (!state.stats.coursesProgress[cid]) {
      state.stats.coursesProgress[cid] = { completedLessons: 0, completedStations: [], lastStation: null };
    }
    state.stats.coursesProgress[cid].completedLessons = (state.stats.coursesProgress[cid].completedLessons || 0) + 1;
    state.stats.coursesProgress[cid].lastStation = this.state.stationId;
    Gamification.saveState(state);
  },

  // ============ STATION COMPLETE ============
  completeStation(container) {
    const { course, station, correctAnswers, wrongAnswers } = this.state;
    const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');

    // Mark station done & award bonus XP
    const gameState = Gamification.getState();
    if (!gameState.stats.coursesProgress) gameState.stats.coursesProgress = {};
    if (!gameState.stats.coursesProgress[course.id]) {
      gameState.stats.coursesProgress[course.id] = { completedLessons: 0, completedStations: [] };
    }
    const prog = gameState.stats.coursesProgress[course.id];
    if (!prog.completedStations.includes(station.id)) {
      prog.completedStations.push(station.id);
    }

    // Check if course is now fully complete
    const allStationsDone = course.stations.every(s => prog.completedStations.includes(s.id));
    let courseJustCompleted = false;
    if (allStationsDone && !gameState.stats.coursesCompleted.includes(course.id)) {
      gameState.stats.coursesCompleted.push(course.id);
      courseJustCompleted = true;
      Gamification.addXP(100); // course completion bonus
    }
    Gamification.saveState(gameState);

    // Render completion screen
    container.innerHTML = `
      <div class="station-complete" style="--course-color: ${course.color};">
        <div class="celebration-overlay">
          ${Mascot.renderWithSpeech('success', t('stationComplete') || '¡Estación completada!', 'xl')}
          <div class="confetti-container">
            ${Array(30).fill(0).map((_, i) => `<div class="confetti" style="--i:${i}; --c:${Mascot.confettiColor(i)}; --d:${Math.random() * 0.5}s;"></div>`).join('')}
          </div>
        </div>

        <h2 class="sc-title">${station.icon} ${station.title[lang] || station.title.es}</h2>

        <div class="sc-stats">
          <div class="sc-stat"><div class="scs-icon"><i class="fas fa-circle-check"></i></div><div class="scs-val">${correctAnswers}</div><div class="scs-lbl">${t('correct') || 'correctas'}</div></div>
          <div class="sc-stat"><div class="scs-icon"><i class="fas fa-star"></i></div><div class="scs-val">+${station.lessons.length * 25}</div><div class="scs-lbl">XP</div></div>
          <div class="sc-stat"><div class="scs-icon">⏱️</div><div class="scs-val">${Math.round((Date.now() - this.state.startTime) / 60000)}m</div><div class="scs-lbl">${t('time') || 'tiempo'}</div></div>
        </div>

        ${courseJustCompleted ? this.renderCertificate(course, lang) : ''}

        <div class="sc-actions">
          ${!courseJustCompleted ? `
            <button class="btn-primary" onclick="CoursesPage.openCourse('${course.id}')" style="background:${course.color};">
              ${t('continueCourse') || 'Continuar curso'} →
            </button>
          ` : ''}
          <button class="btn-ghost" onclick="Router.go('wisdom/courses')">
            ${t('backToCourses') || 'Volver a cursos'}
          </button>
        </div>
      </div>
    `;
  },

  renderCertificate(course, lang) {
    // v15: read from persisted settings.userName; fallback to default
    const userName = (AppState.settings && AppState.settings.userName)
      || AppState.userName
      || (lang === 'ar' ? 'الطالب' : (lang === 'en' ? 'Student' : 'Estudiante'));
    const date = new Date().toLocaleDateString(currentLocale === 'ar' ? 'ar-EG' : currentLocale);
    const editLabel = lang === 'ar' ? 'تعديل الاسم' : (lang === 'en' ? 'Edit name' : 'Editar nombre');
    return `
      <div class="certificate" id="certificate">
        <div class="cert-corner cert-tl"><i class="fas fa-star"></i></div>
        <div class="cert-corner cert-tr"><i class="fas fa-star"></i></div>
        <div class="cert-corner cert-bl"><i class="fas fa-star"></i></div>
        <div class="cert-corner cert-br"><i class="fas fa-star"></i></div>
        <div class="cert-header">
          <div class="cert-mascot-row">${Mascot.render('celebrate', 'small')}</div>
          <h3><i class="fas fa-trophy"></i> ${t('certificateOfCompletion') || 'Certificado de Finalización'}</h3>
        </div>
        <div class="cert-body">
          <div class="cert-presented">${t('presentedTo') || 'Otorgado a'}:</div>
          <div class="cert-name" id="cert-name-display">${escapeHtml(userName)}</div>
          <button class="cert-edit-name-btn" onclick="CoursesPage.editCertName()" title="${editLabel}" aria-label="${editLabel}">
            <i class="fas fa-pen"></i> <span>${editLabel}</span>
          </button>
          <div class="cert-completed">${t('hasCompleted') || 'ha completado el curso'}:</div>
          <div class="cert-course-name">${course.icon} ${escapeHtml(course.title[lang] || course.title.es)}</div>
          <div class="cert-date">${date}</div>
        </div>
        <div class="cert-footer">
          <div class="cert-signature">Quba — ${t('islamicLearning') || 'Aprendizaje Islámico'}</div>
        </div>
        <button class="btn-primary cert-share-btn" onclick="CoursesPage.shareCertificate('${course.id}')">
          <i class="fas fa-share-alt"></i> ${t('shareCertificate') || 'Compartir certificado'}
        </button>
      </div>
    `;
  },

  // v15: edit name directly from the certificate
  editCertName() {
    const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
    const current = (AppState.settings && AppState.settings.userName) || '';
    const promptText = lang === 'ar'
      ? 'اكتب اسمك للشهادة:'
      : (lang === 'en' ? 'Enter your name for the certificate:' : 'Escribe tu nombre para el certificado:');
    const val = window.prompt(promptText, current);
    if (val === null) return; // cancelled
    const clean = val.trim().slice(0, 60);
    if (!AppState.settings) AppState.settings = {};
    AppState.settings.userName = clean;
    Storage.saveSettings();
    // Update the certificate display in place
    const nameEl = document.getElementById('cert-name-display');
    if (nameEl) {
      const fallback = lang === 'ar' ? 'الطالب' : (lang === 'en' ? 'Student' : 'Estudiante');
      nameEl.textContent = clean || fallback;
    }
    showToast((t('nameSaved') || 'Nombre guardado'), 1500);
  },

  shareCertificate(courseId) {
    const course = this.getAllCourses().find(c => c.id === courseId);
    const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
    const text = `<i class="fas fa-trophy"></i> ${t('justCompleted') || 'Acabo de completar el curso'}: ${course.title[lang]} en Quba app! <i class="fas fa-moon"></i>`;
    if (navigator.share) {
      navigator.share({ title: 'Quba — ' + course.title[lang], text }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast((t('copied') || 'Copiado'), 1500);
    }
  },

  exitLesson() {
    if (confirm(t('confirmExitLesson') || '¿Salir de la lección? Tu progreso se guardará.')) {
      this.state = null;
      Router.go('wisdom/courses');
    }
  },

  cleanup() {
    this.state = null;
  },
};
