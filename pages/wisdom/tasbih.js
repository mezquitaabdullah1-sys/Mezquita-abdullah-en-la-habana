// 📿 Tasbih digital con feedback háptico - self-contained, multilenguaje
const TasbihPage = {
  count: 0,
  totalCount: 0,
  targetCount: 33,
  currentDhikr: 0,
  soundEnabled: true,

  DHIKRS: [
    {
      ar: 'سُبْحَانَ اللَّهِ', tr: 'Subhanallah',
      es: 'Glorificado sea Allah', en: 'Glory be to Allah',
      target: 33,
    },
    {
      ar: 'الْحَمْدُ لِلَّهِ', tr: 'Alhamdulillah',
      es: 'Alabado sea Allah', en: 'All praise is for Allah',
      target: 33,
    },
    {
      ar: 'اللَّهُ أَكْبَرُ', tr: 'Allahu Akbar',
      es: 'Allah es el más Grande', en: 'Allah is the Greatest',
      target: 34,
    },
    {
      ar: 'لَا إِلَهَ إِلَّا اللَّهُ', tr: "La ilaha illa-Allah",
      es: 'No hay divinidad sino Allah', en: 'There is no god but Allah',
      target: 100,
    },
    {
      ar: 'أَسْتَغْفِرُ اللَّهَ', tr: 'Astaghfirullah',
      es: 'Pido perdón a Allah', en: 'I seek Allah\'s forgiveness',
      target: 100,
    },
    {
      ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', tr: 'Subhanallahi wa bihamdihi',
      es: 'Glorificado y alabado sea Allah', en: 'Glory and praise be to Allah',
      target: 100,
    },
    {
      ar: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', tr: 'La hawla wa la quwwata illa billah',
      es: 'No hay fuerza ni poder sino con Allah', en: 'There is no power nor might except with Allah',
      target: 100,
    },
    {
      ar: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', tr: 'Allahumma salli ala Muhammad',
      es: 'Oh Allah, bendice a Muhammad ﷺ', en: 'O Allah, send blessings upon Muhammad ﷺ',
      target: 100,
    },
  ],

  render(container) {
    const saved = Storage.get('tasbih') || { count: 0, totalCount: 0, currentDhikr: 0, soundEnabled: true };
    this.count = saved.count || 0;
    this.totalCount = saved.totalCount || 0;
    this.currentDhikr = saved.currentDhikr || 0;
    this.soundEnabled = saved.soundEnabled !== false;
    this.targetCount = this.DHIKRS[this.currentDhikr].target;
    this.renderUI(container);
  },

  renderUI(container) {
    const dhikr = this.DHIKRS[this.currentDhikr];
    const progress = Math.min(this.count / this.targetCount, 1);
    const isComplete = this.count >= this.targetCount;
    const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
    const translation = dhikr[lang] || dhikr.es; // show translation in the active UI language

    container.innerHTML = `
      <div class="top-bar">
        <button class="top-bar-btn" onclick="Router.go('wisdom')">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title"><i class="fas fa-circle-nodes"></i> ${t('tasbihTitle') || 'Tasbih'}</div>
        <button class="top-bar-btn" onclick="TasbihPage.toggleSound()" title="${t('sound') || 'Sound'}">
          <i class="fas fa-${this.soundEnabled ? 'volume-up' : 'volume-mute'}"></i>
        </button>
      </div>

      <div class="tasbih-container">
        <!-- Dhikr selector -->
        <div class="dhikr-selector">
          <button class="dhikr-nav" onclick="TasbihPage.changeDhikr(-1)" ${this.currentDhikr === 0 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="dhikr-name">${this.currentDhikr + 1} / ${this.DHIKRS.length}</div>
          <button class="dhikr-nav" onclick="TasbihPage.changeDhikr(1)" ${this.currentDhikr === this.DHIKRS.length - 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>

        <!-- Dhikr text display -->
        <div class="dhikr-display">
          <div class="dhikr-arabic">${dhikr.ar}</div>
          <div class="dhikr-trans">${dhikr.tr}</div>
          <div class="dhikr-es">${dhikr[lang] || dhikr.es}</div>
        </div>

        <!-- Counter circle -->
        <div class="tasbih-counter ${isComplete ? 'complete' : ''}" id="tasbih-counter" onclick="TasbihPage.increment()">
          <svg class="tasbih-ring" width="260" height="260" viewBox="0 0 260 260">
            <circle cx="130" cy="130" r="118" fill="none" stroke="rgba(212,175,55,0.15)" stroke-width="10"/>
            <circle cx="130" cy="130" r="118" fill="none" stroke="url(#tasbih-gradient)" stroke-width="10"
                    stroke-linecap="round"
                    stroke-dasharray="${2 * Math.PI * 118}"
                    stroke-dashoffset="${2 * Math.PI * 118 * (1 - progress)}"
                    transform="rotate(-90 130 130)"
                    style="transition: stroke-dashoffset 0.4s cubic-bezier(0.4,0,0.2,1);"/>
            <defs>
              <linearGradient id="tasbih-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0F4C3A"/>
                <stop offset="100%" stop-color="#D4AF37"/>
              </linearGradient>
            </defs>
          </svg>
          <div class="tasbih-center">
            <div class="tasbih-count" id="tasbih-count-val">${this.count}</div>
            <div class="tasbih-target">/ ${this.targetCount}</div>
            <div class="tasbih-hint">${isComplete ? '<i class="fas fa-circle-check"></i> ' + (t('completed') || '¡Completo!') : '<i class="fas fa-hand-point-up"></i> ' + (t('tapToCount') || 'Toca para contar')}</div>
          </div>
        </div>

        <!-- Stats -->
        <div class="tasbih-stats">
          <div class="tasbih-stat">
            <div class="tasbih-stat-value" id="tasbih-session">${this.totalCount}</div>
            <div class="tasbih-stat-label">${t('sessionTotal') || 'Sesión'}</div>
          </div>
          <div class="tasbih-stat">
            <div class="tasbih-stat-value">${Gamification.getState().stats.tasbihCount || 0}</div>
            <div class="tasbih-stat-label">${t('lifetimeTotal') || 'Histórico'}</div>
          </div>
          <div class="tasbih-stat">
            <div class="tasbih-stat-value">+${Math.floor(this.totalCount / 100) * Gamification.XP_PER_TASBIH_100}</div>
            <div class="tasbih-stat-label">XP</div>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="tasbih-buttons">
          <button class="btn-ghost tasbih-btn-secondary" onclick="TasbihPage.reset()">
            <i class="fas fa-redo"></i> ${t('resetCounter') || 'Reiniciar'}
          </button>
          <button class="btn-ghost tasbih-btn-secondary" onclick="TasbihPage.resetAll()">
            <i class="fas fa-trash"></i> ${t('clearAll') || 'Limpiar todo'}
          </button>
        </div>

        <!-- Quick dhikr picker -->
        <div class="dhikr-picker">
          <div class="dhikr-picker-title">${t('selectDhikr') || 'Elegir dhikr'}</div>
          <div class="dhikr-picker-grid">
            ${this.DHIKRS.map((d, idx) => `
              <div class="dhikr-pick-item ${idx === this.currentDhikr ? 'active' : ''}" onclick="TasbihPage.selectDhikr(${idx})">
                <div class="dhikr-pick-ar">${d.ar}</div>
                <div class="dhikr-pick-target">×${d.target}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  increment() {
    this.count++;
    this.totalCount++;

    if (navigator.vibrate) {
      navigator.vibrate(this.count === this.targetCount ? [50, 30, 50, 30, 100] : 20);
    }
    if (this.soundEnabled) this.playTick();

    if (this.totalCount > 0 && this.totalCount % 100 === 0) {
      Gamification.addXP(Gamification.XP_PER_TASBIH_100);
      showToast(`+${Gamification.XP_PER_TASBIH_100} XP (${this.totalCount} dhikrs)`, 2000);
    }

    if (this.count === this.targetCount) {
      if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
      setTimeout(() => {
        if (this.currentDhikr < this.DHIKRS.length - 1) {
          showToast(`${this.DHIKRS[this.currentDhikr].tr} ${t('completed') || 'completo'}`, 2000);
          this.changeDhikr(1, true);
        } else {
          showToast(`${t('allDhikrsDone') || '¡Todos los dhikrs completos!'}`, 3000);
        }
      }, 600);
    }

    Gamification.recordTasbihCount(1);
    this.saveState();
    this.updateUI();
  },

  updateUI() {
    const countEl = document.getElementById('tasbih-count-val');
    if (!countEl) return;
    countEl.textContent = this.count;

    const sessionEl = document.getElementById('tasbih-session');
    if (sessionEl) sessionEl.textContent = this.totalCount;

    const ring = document.querySelector('.tasbih-ring circle:last-of-type');
    if (ring) {
      const progress = Math.min(this.count / this.targetCount, 1);
      const circ = 2 * Math.PI * 118;
      ring.setAttribute('stroke-dashoffset', circ * (1 - progress));
    }

    const counter = document.getElementById('tasbih-counter');
    if (this.count >= this.targetCount && counter) {
      counter.classList.add('complete');
    }
  },

  playTick() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
      setTimeout(() => ctx.close && ctx.close(), 150);
    } catch (e) {}
  },

  changeDhikr(delta, autoReset = false) {
    const newIdx = this.currentDhikr + delta;
    if (newIdx < 0 || newIdx >= this.DHIKRS.length) return;
    this.currentDhikr = newIdx;
    if (autoReset) this.count = 0;
    this.targetCount = this.DHIKRS[this.currentDhikr].target;
    this.saveState();
    this.renderUI(document.getElementById('main-content'));
  },

  selectDhikr(idx) {
    if (idx === this.currentDhikr) return;
    this.currentDhikr = idx;
    this.count = 0;
    this.targetCount = this.DHIKRS[idx].target;
    this.saveState();
    this.renderUI(document.getElementById('main-content'));
  },

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.saveState();
    showToast(this.soundEnabled ? ''+ (t('soundOn') || 'Sonido activado') : ''+ (t('soundOff') || 'Sonido desactivado'), 1500);
    this.renderUI(document.getElementById('main-content'));
  },

  reset() {
    if (confirm(t('confirmReset') || '¿Reiniciar el contador actual?')) {
      this.count = 0;
      this.saveState();
      this.renderUI(document.getElementById('main-content'));
    }
  },

  resetAll() {
    if (confirm(t('confirmResetAll') || '¿Limpiar contador y total de sesión? (El histórico se conserva)')) {
      this.count = 0;
      this.totalCount = 0;
      this.saveState();
      this.renderUI(document.getElementById('main-content'));
    }
  },

  saveState() {
    Storage.set('tasbih', {
      count: this.count,
      totalCount: this.totalCount,
      currentDhikr: this.currentDhikr,
      soundEnabled: this.soundEnabled,
    });
  },

  cleanup() {},
};
