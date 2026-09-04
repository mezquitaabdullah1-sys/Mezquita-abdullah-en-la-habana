// 🤲 Adhkar (colecciones de invocaciones) - self-contained
const AdhkarPage = {
  currentSet: null,
  counters: {},

  SETS: [
    { id: 'morning', nameKey: 'adhkarMorning', icon: '<i class="fas fa-cloud-sun"></i>', data: () => (typeof ADHKAR_MORNING !== 'undefined' ? ADHKAR_MORNING : []), color: '#FFA726' },
    { id: 'evening', nameKey: 'adhkarEvening', icon: '<i class="fas fa-mountain-sun"></i>', data: () => (typeof ADHKAR_EVENING !== 'undefined' ? ADHKAR_EVENING : []), color: '#FF7043' },
    { id: 'sleep', nameKey: 'adhkarSleep', icon: '<i class="fas fa-moon"></i>', data: () => (typeof ADHKAR_SLEEP !== 'undefined' ? ADHKAR_SLEEP : []), color: '#5C6BC0' },
    { id: 'after_prayer', nameKey: 'adhkarAfterPrayer', icon: '<i class="fas fa-mosque"></i>', data: () => (typeof ADHKAR_AFTER_PRAYER !== 'undefined' ? ADHKAR_AFTER_PRAYER : []), color: '#0F4C3A' },
    { id: 'wake_up', nameKey: 'adhkarWakeUp', icon: '<i class="fas fa-sun"></i>', data: () => (typeof ADHKAR_WAKE_UP !== 'undefined' ? ADHKAR_WAKE_UP : []), color: '#F9A825' },
    { id: 'home', nameKey: 'adhkarHome', icon: '<i class="fas fa-house"></i>', data: () => (typeof ADHKAR_HOME !== 'undefined' ? ADHKAR_HOME : []), color: '#8D6E63' },
    { id: 'bathroom', nameKey: 'adhkarBathroom', icon: '<i class="fas fa-toilet"></i>', data: () => (typeof ADHKAR_BATHROOM !== 'undefined' ? ADHKAR_BATHROOM : []), color: '#607D8B' },
    { id: 'food_drink', nameKey: 'adhkarFoodDrink', icon: '<i class="fas fa-utensils"></i>', data: () => (typeof ADHKAR_FOOD_DRINK !== 'undefined' ? ADHKAR_FOOD_DRINK : []), color: '#EF6C00' },
    { id: 'mosque', nameKey: 'adhkarMosque', icon: '<i class="fas fa-mosque"></i>', data: () => (typeof ADHKAR_MOSQUE !== 'undefined' ? ADHKAR_MOSQUE : []), color: '#00897B' },
    { id: 'travel', nameKey: 'adhkarTravel', icon: '<i class="fas fa-plane"></i>', data: () => (typeof ADHKAR_TRAVEL !== 'undefined' ? ADHKAR_TRAVEL : []), color: '#1E88E5' },
    { id: 'distress', nameKey: 'adhkarDistress', icon: '<i class="fas fa-cloud-showers-heavy"></i>', data: () => (typeof ADHKAR_DISTRESS !== 'undefined' ? ADHKAR_DISTRESS : []), color: '#6D4C41' },
    { id: 'friday', nameKey: 'adhkarFriday', icon: '<i class="fas fa-calendar-day"></i>', data: () => (typeof ADHKAR_FRIDAY !== 'undefined' ? ADHKAR_FRIDAY : []), color: '#43A047' },
    { id: 'quran', nameKey: 'adhkarQuran', icon: '<i class="fas fa-book-quran"></i>', data: () => (typeof ADHKAR_QURAN !== 'undefined' ? ADHKAR_QURAN : []), color: '#7B1FA2' },
  ],

  renderHub(container) {
    const gameState = Gamification.getState();
    const completed = gameState.stats?.adhkarCompleted || [];

    container.innerHTML = `
      <div class="top-bar">
        <button class="top-bar-btn" onclick="Router.go('wisdom')">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title"><i class="fas fa-hands-praying"></i> ${t('adhkarTitle') || 'Adhkar'}</div>
        <div style="width: 30px;"></div>
      </div>

      <div style="padding: var(--sp-md);">
        <p class="adhkar-intro">${t('adhkarIntro') || 'Colecciones de invocaciones del Profeta ﷺ para diferentes momentos del día.'}</p>

        ${this.SETS.map(set => {
          const data = set.data();
          const isDone = completed.includes(set.id);
          return `
            <div class="adhkar-set-card" style="border-left: 4px solid ${set.color};" onclick="AdhkarPage.openSet('${set.id}')">
              <div class="adhkar-set-icon" style="background: ${set.color}22; color: ${set.color};">${set.icon}</div>
              <div class="adhkar-set-info">
                <div class="adhkar-set-name">${t(set.nameKey) || set.id} ${isDone ? '<span class="set-done-badge"><i class="fas fa-check"></i></span>' : ''}</div>
                <div class="adhkar-set-meta">${data.length} ${t('dhikrs') || 'dhikrs'}</div>
              </div>
              <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'}" style="color: var(--text-secondary);"></i>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  openSet(setId) {
    const container = document.getElementById('main-content');
    this.renderSet(container, setId);
  },

  renderSet(container, setId) {
    const set = this.SETS.find(s => s.id === setId);
    if (!set) {
      this.renderHub(container);
      return;
    }

    this.currentSet = set;
    this.counters = {};
    const data = set.data();
    data.forEach(d => { this.counters[d.id] = 0; });
    const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
    // Helper local: resuelve valores trilingües {es, ar, en} o texto plano.
    // Evita el bug "[object Object]" cuando title/translation/benefit son objetos.
    const txt = (val) => (typeof L === 'function' ? L(val) : (typeof val === 'object' && val !== null ? (val[lang] || val.es || val.en || '') : (val || '')));

    if (data.length === 0) {
      container.innerHTML = `
        <div class="top-bar">
          <button class="top-bar-btn" onclick="Router.go('wisdom/adhkar')">
            <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
          </button>
          <div class="top-bar-title">${set.icon} ${t(set.nameKey) || set.id}</div>
          <div style="width: 30px;"></div>
        </div>
        <div class="empty-state">
          <div class="empty-state-icon"><i class="fas fa-inbox"></i></div>
          <div>${t('noDataAvailable') || 'No hay datos disponibles'}</div>
        </div>`;
      return;
    }

    container.innerHTML = `
      <div class="top-bar" style="background: linear-gradient(135deg, ${set.color}, ${set.color}dd);">
        <button class="top-bar-btn" onclick="Router.go('wisdom/adhkar')">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title" style="color:#fff;">${set.icon} ${t(set.nameKey) || set.id}</div>
        <div style="width: 30px;"></div>
      </div>

      <div class="adhkar-progress-bar">
        <div class="adhkar-progress-fill" id="adhkar-progress-fill" style="width:0%; background:${set.color};"></div>
      </div>

      <div style="padding: var(--sp-md);">
        ${data.map((d, idx) => `
          <div class="adhkar-card" id="adhkar-${d.id}" data-target="${d.times || 1}">
            <div class="adhkar-card-header">
              <div class="adhkar-title">${idx + 1}. ${escapeHtml(txt(d.title))}</div>
              <div class="adhkar-times" style="background:${set.color}22;color:${set.color};">×${d.times || 1}</div>
            </div>

            <div class="adhkar-arabic">${d.arabic}</div>
            ${d.transliteration ? `<div class="adhkar-trans">${d.transliteration}</div>` : ''}
            ${txt(d.translation) ? `<div class="adhkar-translation">${escapeHtml(txt(d.translation))}</div>` : ''}

            ${txt(d.benefit) ? `<div class="adhkar-benefit"><i class="fas fa-star"></i> ${escapeHtml(txt(d.benefit))}</div>` : ''}
            <div class="adhkar-source">— ${escapeHtml(txt(d.source))}</div>

            ${(d.times || 1) > 1 ? `
              <button class="adhkar-counter-btn" id="counter-${d.id}" onclick="AdhkarPage.incrementCount('${d.id}', ${d.times})">
                <i class="fas fa-hand-pointer"></i>
                <span id="count-text-${d.id}">0 / ${d.times}</span>
              </button>
            ` : `
              <button class="adhkar-counter-btn" id="counter-${d.id}" onclick="AdhkarPage.markDone('${d.id}')">
                <i class="fas fa-check"></i>
                <span>${t('markRead') || 'Marcar leído'}</span>
              </button>
            `}
          </div>
        `).join('')}

        <button class="btn-primary" style="width: 100%; margin-top: 20px; background:${set.color};" onclick="AdhkarPage.markSetComplete()">
          <i class="fas fa-check-circle"></i> ${t('completeSet') || 'Completar set'} (+${Gamification.XP_PER_ADHKAR_SET} XP)
        </button>
      </div>
    `;
  },

  incrementCount(id, target) {
    this.counters[id] = (this.counters[id] || 0) + 1;
    if (navigator.vibrate) navigator.vibrate(15);

    const textEl = document.getElementById(`count-text-${id}`);
    if (textEl) {
      textEl.textContent = `${this.counters[id]} / ${target}`;
    }

    if (this.counters[id] >= target) {
      const btn = document.getElementById(`counter-${id}`);
      if (btn) {
        btn.classList.add('done');
        btn.innerHTML = `<i class="fas fa-check-circle"></i><span><i class="fas fa-circle-check"></i> ${target} / ${target}</span>`;
      }
      if (navigator.vibrate) navigator.vibrate([60, 40, 60]);
      this.updateProgress();
    }
  },

  markDone(id) {
    const btn = document.getElementById(`counter-${id}`);
    if (btn && !btn.classList.contains('done')) {
      btn.classList.add('done');
      btn.innerHTML = `<i class="fas fa-check-circle"></i><span><i class="fas fa-circle-check"></i> ${t('done') || 'Leído'}</span>`;
      this.counters[id] = 999; // mark complete
      if (navigator.vibrate) navigator.vibrate(20);
      this.updateProgress();
    }
  },

  updateProgress() {
    if (!this.currentSet) return;
    const data = this.currentSet.data();
    const totalDone = data.filter(d => {
      const target = d.times || 1;
      return (this.counters[d.id] || 0) >= target;
    }).length;
    const pct = data.length > 0 ? (totalDone / data.length) * 100 : 0;
    const fill = document.getElementById('adhkar-progress-fill');
    if (fill) fill.style.width = pct + '%';
  },

  markSetComplete() {
    if (!this.currentSet) return;
    Gamification.addXP(Gamification.XP_PER_ADHKAR_SET);
    Gamification.recordAdhkarCompleted(this.currentSet.id);
    showToast(`${t(this.currentSet.nameKey) || this.currentSet.id} +${Gamification.XP_PER_ADHKAR_SET} XP`, 3000);
    setTimeout(() => Router.go('wisdom/adhkar'), 1500);
  },

  cleanup() {},
};
