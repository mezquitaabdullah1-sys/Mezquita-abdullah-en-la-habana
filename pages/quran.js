// 📖 Pantalla del Corán - v4 (Tafsir mobile fix + audio repeat + Mishary removed)
const QuranPage = {
  surahs: [],
  playingAyah: null,
  currentSurah: null,
  readerSettings: null,
  repeatMode: 'off', // 'off' | 'ayah' | 'surah'

  loadReaderSettings() {
    this.readerSettings = Storage.get('reader_settings') || {
      showTransliteration: true,
      showTranslation: true,
      fontSize: 'medium',
      tafsir: 'local.auto', // tafsir local empaquetado — sigue el idioma de la app
    };
    // Migration: if user had Mishary saved, switch to Maher Al-Muaiqly
    if (AppState.settings.reciter === 'ar.alafasy') {
      AppState.settings.reciter = 'ar.mahermuaiqly';
      Storage.saveSettings();
    }
    return this.readerSettings;
  },

  saveReaderSettings() {
    Storage.set('reader_settings', this.readerSettings);
  },

  loadRepeatMode() {
    this.repeatMode = Storage.get('quran_repeat') || 'off';
  },

  saveRepeatMode() {
    Storage.set('quran_repeat', this.repeatMode);
  },

  // ============ SURAH LIST ============
  async render(container) {
    this.loadReaderSettings();
    this.loadRepeatMode();

    container.innerHTML = `
      <div class="page-header quran-list-header">
        <button class="quran-list-settings-btn" onclick="QuranPage.openReaderSettings()" title="${t('settings_reader') || 'Ajustes'}" aria-label="${t('settings_reader') || 'Ajustes'}">
          <i class="fas fa-sliders-h"></i>
        </button>
        <button class="quran-list-download-btn" id="quran-audio-dl-btn" onclick="QuranPage.openAudioManager()" title="${t('audioDownloadsTitle')}" aria-label="${t('audioDownloadsTitle')}">
          <i class="fas fa-cloud-arrow-down"></i>
        </button>
        <div class="page-title">📖 ${t('tabQuran')}</div>
        <div class="page-subtitle">القرآن الكريم</div>
        <div class="page-meta">114 ${t('surahs').toLowerCase()}</div>
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input type="text" id="surah-search" placeholder="${t('searchSurah')}" autocomplete="off">
        </div>
        <button class="quran-ayah-search-btn" onclick="QuranPage.openQuranSearch()" aria-label="${t('quranSearchTitle')}">
          <i class="fas fa-magnifying-glass quran-ayah-search-icon"></i>
          <span>${t('searchAyahInQuran')}</span>
          <span class="quran-ayah-search-badge">﴿ ﴾</span>
        </button>
        <button class="quran-ayah-search-btn quran-duas-entry-btn" onclick="QuranPage.openReadingDuas()" aria-label="${t('readingDuasTitle')}">
          <i class="fas fa-hands-praying quran-ayah-search-icon"></i>
          <span>${t('readingDuasTitle')}</span>
          <span class="quran-ayah-search-badge">🤲</span>
        </button>
      </div>
      <div id="offline-download-banner"></div>
      <div id="bookmarks-entry"></div>
      <div id="surah-list" style="padding: var(--sp-md);">
        ${Skeleton.quranList()}
      </div>
    `;

    try {
      this.surahs = await API.getSurahList();
      this._downloadedNumbers = [];
      if (typeof QuranOfflineService !== 'undefined') {
        const tr = AppState.settings.translation;
        const rc = AppState.settings.reciter;
        this._downloadedNumbers = await QuranOfflineService.getDownloadedNumbers(tr, rc);
      }
      this.renderList(this.surahs);
      this.renderOfflineBanner();
      this.renderBookmarksEntry();
      this._attachAudioEvents();
      this.updateAudioDownloadBadge();
      this.maybeShowAudioPermission();

      const search = document.getElementById('surah-search');
      if (search) {
        search.addEventListener('input', e => {
          const query = e.target.value.trim();
          if (!query) return this.renderList(this.surahs);
          const filtered = this.surahs.filter(s => QuranHelpers.surahMatches(s, query));
          this.renderList(filtered);
        });
      }
    } catch (e) {
      document.getElementById('surah-list').innerHTML =
        UIState.error("QuranPage.render(document.getElementById('main-content'))");
    }
  },

  // v21: banner de "descargar Corán para uso sin conexión" (TEXTO solamente,
  // es ligero y automático). v27: el audio ya no forma parte del banner — se
  // gestiona con permiso desde el icono de descarga (esquina) por sura.
  async renderOfflineBanner() {
    const el = document.getElementById('offline-download-banner');
    if (!el || typeof QuranOfflineService === 'undefined') return;
    const translation = AppState.settings.translation;
    const reciter = AppState.settings.reciter;
    const status = await QuranOfflineService.getDownloadStatus(translation, reciter);

    const downloading = QuranOfflineService._downloading;
    const textDone = status.downloaded >= status.total;

    // Solo el texto: se oculta al completarse las 114 suras
    if (textDone) { el.innerHTML = ''; return; }

    const pct = Math.round((status.downloaded / status.total) * 100);
    const title = downloading ? t('quranDownloading') : t('downloadQuranOffline');
    const subtitle = `${status.downloaded}/${status.total} ${t('surahs').toLowerCase()}${navigator.onLine ? '' : ' · ' + t('quranDownloadPaused')}`;

    el.innerHTML = `
      <div class="offline-download-card">
        <div class="offline-download-icon"><i class="fas fa-${downloading ? 'spinner fa-spin' : 'cloud-arrow-down'}"></i></div>
        <div class="offline-download-body">
          <div class="offline-download-title">${title}</div>
          <div class="offline-download-subtitle">${subtitle}</div>
          <div class="offline-download-progress-track"><div class="offline-download-progress-fill" style="width:${pct}%"></div></div>
        </div>
        ${!downloading ? `<button class="offline-download-btn" onclick="QuranPage.startOfflineDownload()">${t('downloadQuranOffline').split(' ')[0]}</button>` : ''}
      </div>
    `;
  },

  startOfflineDownload() {
    if (typeof QuranOfflineService === 'undefined') return;
    const translation = AppState.settings.translation;
    const reciter = AppState.settings.reciter;

    if (!this._offlineListenerAttached) {
      this._offlineListenerAttached = true;
      QuranOfflineService.onProgress(async (evt) => {
        this._downloadedNumbers = await QuranOfflineService.getDownloadedNumbers(translation, reciter);
        this.renderOfflineBanner();
        // Actualiza discretamente las insignias visibles sin recargar toda la lista
        this._refreshOfflineBadges();
        if (evt.type === 'complete') showToast('✅ ' + t('quranDownloaded'));
      });
    }
    QuranOfflineService.downloadAll(translation, reciter);
    this.renderOfflineBanner();
  },

  _refreshOfflineBadges() {
    document.querySelectorAll('.surah-card').forEach(card => {
      const num = Number(card.dataset.surah);
      const has = card.querySelector('.surah-offline-badge');
      const isDown = (this._downloadedNumbers || []).includes(num);
      if (isDown && !has) {
        card.insertAdjacentHTML('beforeend', '<div class="surah-offline-badge"><i class="fas fa-circle-check"></i></div>');
      }
    });
  },

  renderList(surahs) {
    const container = document.getElementById('surah-list');
    if (!container) return;
    if (surahs.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <div class="empty-state-text">${t('error')}</div>
        </div>
      `;
      return;
    }
    const downloaded = this._downloadedNumbers || [];
    container.innerHTML = surahs.map(s => {
      const cleanArName = QuranHelpers.removeTashkeel(s.name);
      const isDown = downloaded.includes(s.number);
      return `
        <div class="surah-card" data-surah="${s.number}" onclick="QuranPage.openSurah(${s.number})">
          <div class="surah-number"><span>${s.number}</span></div>
          <div class="surah-info">
            <div class="surah-name">${Validate.escapeHTML(QuranHelpers.surahDisplayName(s))}</div>
            <div class="surah-meta">${Validate.escapeHTML(QuranHelpers.surahMeaning(s))} • ${s.numberOfAyahs} ${t('ayah').toLowerCase()}s • ${s.revelationType === 'Meccan' ? t('meccan') : t('medinan')}</div>
          </div>
          <div class="surah-arabic-name">${cleanArName}</div>
          ${isDown ? '<div class="surah-offline-badge"><i class="fas fa-circle-check"></i></div>' : ''}
        </div>
      `;
    }).join('');
  },

  async openSurah(number) {
    Router.push('surah', { surahNumber: number });
  },

  // ============ SURAH DETAIL ============
  async renderDetail(container, params) {
    this.loadReaderSettings();
    this.loadRepeatMode();
    const surahNumber = parseInt(params.surahNumber, 10);
    const targetAyah = params.ayah ? parseInt(params.ayah, 10) : null;

    container.innerHTML = `
      <div class="top-bar reader-top-bar">
        <button class="top-bar-btn" onclick="QuranPage.backToList()">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title">${t('loading')}...</div>
        <div style="width: 30px;"></div>
      </div>
      <div style="padding: var(--sp-md);">
        ${Skeleton.quranReader()}
      </div>
    `;

    try {
      // Make sure reciter isn't Mishary
      if (AppState.settings.reciter === 'ar.alafasy') {
        AppState.settings.reciter = 'ar.mahermuaiqly';
        Storage.saveSettings();
      }

      const surah = await API.getSurahWithTranslation(
        surahNumber,
        AppState.settings.translation,
        AppState.settings.reciter
      );
      this.currentSurah = surah;

      // Strip Bismillah from first ayah on all surahs except Al-Fatihah (1) & At-Tawbah (9)
      if (QuranHelpers.shouldShowBismillah(surah.number) && surah.ayahs[0]) {
        const a0 = surah.ayahs[0];
        a0.arabicDisplay = QuranHelpers.stripBismillahFromFirstAyah(a0.arabic);
        // Also strip from translation if it starts with Bismillah-equivalent
        if (a0.translation) {
          a0.translation = a0.translation
            .replace(/^\s*[¡¿]?\s*(En\s+el\s+nombre|In\s+the\s+name)\s+de(l)?\s+(Dios|Allā?h|Allah)[\s,\.\-—]+(el\s+)?(Compasivo|Clémente|Misericordioso|Merciful|Most\s+Gracious|the\s+Entirely\s+Merciful)[^\n]{0,80}/i, '')
            .trim();
        }
        // Strip from transliteration
        if (a0.transliteration) {
          a0.transliteration = a0.transliteration
            .replace(/^\s*Bismi[lL]+[aā]+hi?\s+a?[lL]?-?Ra[hḥ]m[aā]ni?\s+a?[lL]?-?Ra[hḥ][iī]m[i]?\.?\s*/i, '')
            .trim();
        }
      }
      surah.ayahs.forEach(a => {
        if (a.arabicDisplay === undefined) a.arabicDisplay = a.arabic;
      });

      this.renderReader(container, surah);
      if (targetAyah) {
        setTimeout(() => this.scrollToAyah(targetAyah, true), 200);
      }
    } catch (e) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">⚠️</div>
          <div class="empty-state-text">${t('error')}: ${escapeHtml(e.message || '')}</div>
          <button class="btn-primary empty-state-btn" onclick="QuranPage.backToList()">${t('backToWisdom')}</button>
        </div>
      `;
    }
  },

  renderReader(container, surah) {
    const cleanArName = QuranHelpers.removeTashkeel(surah.name);
    const showBismillah = QuranHelpers.shouldShowBismillah(surah.number);
    const s = this.readerSettings;

    const repeatIcon = this.repeatMode === 'off' ? 'fa-repeat' :
                       this.repeatMode === 'ayah' ? 'fa-redo' : 'fa-sync-alt';
    const repeatLabel = this.repeatMode === 'off' ? t('repeatOff') :
                       this.repeatMode === 'ayah' ? t('repeatAyah') : t('repeatSurah');
    const bookmarkCount = this.getBookmarks().length;

    container.innerHTML = `
      <div class="top-bar reader-top-bar">
        <button class="top-bar-btn" onclick="QuranPage.backToList()">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title-container">
          <div class="top-bar-title">${Validate.escapeHTML(surah.englishName)}</div>
          <div class="top-bar-subtitle">${Validate.escapeHTML(surah.englishNameTranslation)} · ${surah.numberOfAyahs} ${t('ayah').toLowerCase()}s</div>
        </div>
        <button class="top-bar-btn" onclick="QuranPage.openReaderSettings()" title="${t('settings_reader')}">
          <i class="fas fa-sliders-h"></i>
        </button>
      </div>

      <div class="reader-toolbar">
        <button class="toolbar-btn" onclick="QuranPage.openSurahPicker()">
          <i class="fas fa-list-ul"></i> <span>${surah.number}. ${Validate.escapeHTML(surah.englishName)}</span>
        </button>
        <button class="toolbar-btn" onclick="QuranPage.openAyahPicker()">
          <i class="fas fa-bookmark"></i> <span>${t('ayah')} 1</span>
        </button>
        <button class="toolbar-btn" onclick="QuranPage.openQuranSearch()" title="${t('quranSearchTitle')}" aria-label="${t('quranSearchTitle')}">
          <i class="fas fa-magnifying-glass"></i>
        </button>
        <button class="toolbar-btn ${this.repeatMode !== 'off' ? 'active' : ''}" onclick="QuranPage.toggleRepeat()" title="${repeatLabel}">
          <i class="fas ${repeatIcon}"></i>
        </button>
        <button class="toolbar-btn bookmark-list-btn" onclick="QuranPage.openBookmarks()" title="${t('bookmarksTitle')}">
          <i class="fas fa-bookmark"></i>${bookmarkCount ? `<span class="bm-badge">${bookmarkCount}</span>` : ''}
        </button>
        <button class="toolbar-btn" onclick="QuranPage.openReadingDuas()" title="${t('readingDuasTitle')}">
          <i class="fas fa-hands-praying"></i>
        </button>
      </div>

      <div class="mushaf-page font-${s.fontSize}" id="mushaf-page">
        <div class="surah-banner">
          <div class="surah-banner-decoration">۞</div>
          <div class="surah-banner-content">
            <div class="surah-banner-arabic">${cleanArName}</div>
            <div class="surah-banner-en">${Validate.escapeHTML(QuranHelpers.surahDisplayName(surah))} · ${Validate.escapeHTML(QuranHelpers.surahMeaning(surah))}</div>
            <div class="surah-banner-meta">
              <span><i class="fas fa-${surah.revelationType === 'Meccan' ? 'kaaba' : 'mosque'}"></i> ${surah.revelationType === 'Meccan' ? t('meccan') : t('medinan')}</span>
              <span class="dot-sep">•</span>
              <span>${surah.numberOfAyahs} ${t('ayah').toLowerCase()}s</span>
            </div>
          </div>
          <div class="surah-banner-decoration">۞</div>
        </div>

        ${showBismillah ? `
          <div class="bismillah-row">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</div>
        ` : ''}

        <div class="ayahs-container" id="ayahs-container">
          ${surah.ayahs.map((a, idx) => this.renderAyah(a, idx, surah)).join('')}
        </div>

        <div class="surah-nav-footer">
          ${surah.number > 1 ? `
            <button class="nav-btn prev" onclick="QuranPage.goToSurah(${surah.number - 1})">
              <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
              <div class="nav-btn-text">
                <div class="nav-btn-label">${t('previousSurah')}</div>
                <div class="nav-btn-name">${surah.number - 1}. ${this.getSurahNameByNumber(surah.number - 1)}</div>
              </div>
            </button>
          ` : '<div></div>'}
          ${surah.number < 114 ? `
            <button class="nav-btn next" onclick="QuranPage.goToSurah(${surah.number + 1})">
              <div class="nav-btn-text">
                <div class="nav-btn-label">${t('nextSurah')}</div>
                <div class="nav-btn-name">${surah.number + 1}. ${this.getSurahNameByNumber(surah.number + 1)}</div>
              </div>
              <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'}"></i>
            </button>
          ` : '<div></div>'}
        </div>
      </div>

      <button class="ayah-fab" onclick="QuranPage.openAyahPicker()" title="${t('jumpToAyah')}">
        <i class="fas fa-search"></i>
      </button>
    `;
  },

  renderAyah(a, idx, surah) {
    const s = this.readerSettings;
    const showTranslit = s.showTransliteration && currentLocale !== 'ar' && a.transliteration;
    const showTrans = s.showTranslation;
    const bm = this.getBookmarkFor(surah.number, a.number);

    return `
      <div class="ayah-block ${bm ? `bookmarked bm-${bm.c}` : ''}" id="ayah-${a.number}" data-ayah="${a.number}">
        <div class="ayah-arabic-line" dir="rtl">
          <span class="ayah-arabic-text">${Validate.escapeHTML(a.arabicDisplay || a.arabic)}</span>
          <span class="ayah-end-marker">﴿${a.number}﴾</span>
        </div>

        ${showTranslit ? `
          <div class="ayah-transliteration">
            <span class="translit-label">📢</span>
            ${Validate.escapeHTML(a.transliteration)}
          </div>
        ` : ''}

        ${showTrans && a.translation ? `
          <div class="ayah-translation">${Validate.escapeHTML(a.translation)}</div>
        ` : ''}

        <div class="ayah-actions">
          <button class="ayah-action-btn" onclick="QuranPage.playAyah(${a.number}, '${Validate.safeUrl(a.audio)}')" id="play-btn-${a.number}" title="${t('play')}">
            <i class="fas fa-play"></i>
          </button>
          <button class="ayah-action-btn repeat-btn" onclick="QuranPage.toggleRepeat(${a.number}, '${Validate.safeUrl(a.audio)}')" id="repeat-btn-${a.number}" title="${t('repeatAudio')}">
            <i class="fas fa-redo"></i>
          </button>
          <button class="ayah-action-btn tafsir-btn" onclick="QuranPage.openTafsir(${surah.number}, ${a.number})" title="${t('tafsir')}">
            <i class="fas fa-book"></i> <span>${t('tafsir')}</span>
          </button>
          <button class="ayah-action-btn" onclick="QuranPage.copyAyah(${surah.number}, ${a.number})" title="${t('copy')}">
            <i class="fas fa-copy"></i>
          </button>
          <button class="ayah-action-btn" onclick="QuranPage.shareAyah(${surah.number}, ${a.number})" title="${t('share')}">
            <i class="fas fa-share-alt"></i>
          </button>
          <button class="ayah-action-btn" onclick="QuranPage.toggleBookmark(${surah.number}, ${a.number})" id="bookmark-${a.number}" title="${t('bookmark')}">
            ${bm ? `<i class="fas fa-bookmark" style="color:${this.BOOKMARK_COLORS[bm.c]};"></i>` : '<i class="far fa-bookmark"></i>'}
          </button>
        </div>
      </div>
    `;
  },

  // ============ AD'IYAS DE LECTURA DEL CORÁN (أدعية قراءة القرآن) ============
  // Icono de manos unidas 🤲: abre las du'as de antes de leer, al terminar
  // la lectura y al completar el Corán (Jatm). Datos en data/duas/quran_reading_duas.js
  openReadingDuas() {
    const DUAS = (typeof QURAN_READING_DUAS !== 'undefined') ? QURAN_READING_DUAS : [];
    const cards = DUAS.map(d => {
      const title = d[`title_${currentLocale}`] || d.title_en;
      const tr = d[`translation_${currentLocale}`] || '';
      return `
        <div class="qd-card">
          <div class="qd-card-head">
            <span class="qd-card-icon">${d.icon}</span>
            <div class="qd-card-title">${Validate.escapeHTML(title)}</div>
          </div>
          ${d.preamble ? `<div class="qd-arabic qd-preamble" dir="rtl">${Validate.escapeHTML(d.preamble)}</div>` : ''}
          <div class="qd-arabic" dir="rtl">${Validate.escapeHTML(d.arabic)}</div>
          <div class="qd-translit">${Validate.escapeHTML(d.transliteration)}</div>
          ${tr ? `<div class="qd-translation">${Validate.escapeHTML(tr)}</div>` : ''}
          <div class="qd-source"><i class="fas fa-book-open"></i> ${Validate.escapeHTML(d.source)}</div>
        </div>`;
    }).join('');

    document.getElementById('modal-content').innerHTML = `
      <div class="modal-header">
        <div class="modal-title">🤲 ${t('readingDuasTitle')}</div>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>
      <div class="qd-body">${cards}</div>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
  },

  // ============ SMART QURAN SEARCH (بحث ذكي بدون تشكيل) ============
  // Buscador global de aleyas: normaliza la entrada (sin tashkeel, sin
  // distinción alef/hamza, ي/ى, ة/ه) y busca en TODO el Corán de forma local
  // e instantánea. Al pulsar un resultado se abre la sura en esa aleya.
  openQuranSearch() {
    document.getElementById('modal-content').innerHTML = `
      <div class="modal-header">
        <div class="modal-title">🔍 ${t('quranSearchTitle')}</div>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>
      <div class="picker-search qs-search-row">
        <i class="fas fa-search"></i>
        <input type="text" id="qs-input" placeholder="${t('quranSearchPlaceholder')}" autocomplete="off" dir="auto">
        <button class="qs-clear-btn hidden" id="qs-clear" onclick="QuranPage.clearQuranSearch()" aria-label="×"><i class="fas fa-xmark"></i></button>
      </div>
      <div class="qs-hint" id="qs-hint"><i class="fas fa-circle-info"></i> ${t('quranSearchHint')}</div>
      <div class="qs-results-meta" id="qs-meta"></div>
      <div class="picker-list qs-results" id="qs-results"></div>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');

    const input = document.getElementById('qs-input');
    setTimeout(() => input?.focus(), 120);

    input.addEventListener('input', e => {
      const q = e.target.value;
      document.getElementById('qs-clear')?.classList.toggle('hidden', !q);
      clearTimeout(this._qsTimer);
      this._qsTimer = setTimeout(() => this._runQuranSearch(q.trim()), 200);
    });
  },

  clearQuranSearch() {
    const input = document.getElementById('qs-input');
    if (input) { input.value = ''; input.focus(); }
    document.getElementById('qs-clear')?.classList.add('hidden');
    const meta = document.getElementById('qs-meta');
    if (meta) meta.textContent = '';
    const res = document.getElementById('qs-results');
    if (res) res.innerHTML = '';
    const hint = document.getElementById('qs-hint');
    if (hint) hint.style.display = '';
  },

  _runQuranSearch(q) {
    const resEl = document.getElementById('qs-results');
    const metaEl = document.getElementById('qs-meta');
    const hintEl = document.getElementById('qs-hint');
    if (!resEl || typeof QuranSearch === 'undefined') return;

    if (!q || q.length < 2) {
      resEl.innerHTML = q && q.length === 1
        ? `<div class="empty-state-mini">${t('quranSearchMinChars')}</div>`
        : '';
      if (metaEl) metaEl.textContent = '';
      if (hintEl) hintEl.style.display = '';
      return;
    }

    if (hintEl) hintEl.style.display = 'none';
    const results = QuranSearch.search(q, 100);

    if (!results.length) {
      if (metaEl) metaEl.textContent = '';
      resEl.innerHTML = `
        <div class="empty-state-mini qs-empty">
          <div class="empty-state-icon">🔎</div>
          ${Validate.escapeHTML(t('quranSearchEmpty').replace('%s', q))}
        </div>`;
      return;
    }

    const more = results.length >= 100 ? '+' : '';
    if (metaEl) metaEl.textContent = `${results.length}${more} ${t('quranSearchResults')}`;

    resEl.innerHTML = results.map(r => {
      const meta = (typeof QuranOfflineService !== 'undefined') ? QuranOfflineService.getSurahMeta(r.s) : null;
      const surahName = meta ? QuranHelpers.surahDisplayName(meta) : String(r.s);
      const arName = meta ? QuranHelpers.removeTashkeel(meta.name) : '';
      return `
        <div class="picker-item qs-result-item" onclick="QuranPage.goToSearchResult(${r.s}, ${r.a})">
          <div class="qs-result-head">
            <span class="qs-result-ref"><i class="fas fa-book-open"></i> ${r.s}. ${Validate.escapeHTML(surahName)} · ${t('ayah')} ${r.a}</span>
            <span class="qs-result-ar-name">${Validate.escapeHTML(arName)}</span>
          </div>
          <div class="qs-result-text" dir="rtl">${QuranSearch.highlight(r.text, q)}</div>
        </div>
      `;
    }).join('');
  },

  goToSearchResult(surahNum, ayahNum) {
    closeModal();
    if (this.currentSurah && this.currentSurah.number === surahNum) {
      this.scrollToAyah(ayahNum, true);
    } else {
      Router.push('surah', { surahNumber: surahNum, ayah: ayahNum });
    }
  },

  // ============ NAVIGATION ============
  backToList() {
    this.cleanup();
    Router.go('quran');
  },

  goToSurah(num) {
    if (num < 1 || num > 114) return;
    this.cleanup();
    Router.push('surah', { surahNumber: num });
  },

  scrollToAyah(ayahNumber, highlight = false) {
    const el = document.getElementById(`ayah-${ayahNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (highlight) {
        el.classList.add('highlight');
        setTimeout(() => el.classList.remove('highlight'), 2000);
      }
    }
  },

  getSurahNameByNumber(num) {
    const s = this.surahs.find(x => x.number === num);
    return s ? QuranHelpers.surahDisplayName(s) : '';
  },

  // ============ PICKERS ============
  openSurahPicker() {
    const current = this.currentSurah?.number;
    const html = `
      <div class="modal-header">
        <div class="modal-title">${t('surahs')}</div>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>
      <div class="picker-search">
        <i class="fas fa-search"></i>
        <input type="text" id="picker-search-input" placeholder="${t('searchSurah')}" autocomplete="off">
      </div>
      <div class="picker-list" id="picker-list">
        ${this.renderPickerList(this.surahs, current)}
      </div>
    `;
    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal-overlay').classList.remove('hidden');

    document.getElementById('picker-search-input')?.addEventListener('input', e => {
      const q = e.target.value.trim();
      const filtered = q ? this.surahs.filter(s => QuranHelpers.surahMatches(s, q)) : this.surahs;
      document.getElementById('picker-list').innerHTML = this.renderPickerList(filtered, current);
    });

    setTimeout(() => {
      const el = document.querySelector('.picker-item.current');
      if (el) el.scrollIntoView({ block: 'center' });
    }, 100);
  },

  renderPickerList(surahs, current) {
    if (!surahs.length) return `<div class="empty-state-mini">${t('noResults') || 'No'}</div>`;
    return surahs.map(s => {
      const cleanName = QuranHelpers.removeTashkeel(s.name);
      const isCurrent = s.number === current;
      return `
        <div class="picker-item ${isCurrent ? 'current' : ''}" onclick="QuranPage.pickSurah(${s.number})">
          <div class="picker-num">${s.number}</div>
          <div class="picker-info">
            <div class="picker-name">${Validate.escapeHTML(QuranHelpers.surahDisplayName(s))}</div>
            <div class="picker-meta">${Validate.escapeHTML(QuranHelpers.surahMeaning(s))} · ${s.numberOfAyahs} ${t('ayah').toLowerCase()}s</div>
          </div>
          <div class="picker-arabic">${cleanName}</div>
        </div>
      `;
    }).join('');
  },

  pickSurah(num) {
    closeModal();
    this.goToSurah(num);
  },

  openAyahPicker() {
    if (!this.currentSurah) return;
    const total = this.currentSurah.numberOfAyahs;
    const grid = [];
    for (let i = 1; i <= total; i++) grid.push(i);

    const html = `
      <div class="modal-header">
        <div class="modal-title">${t('jumpToAyah')} (1-${total})</div>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>
      <div class="picker-search">
        <i class="fas fa-hashtag"></i>
        <input type="number" id="ayah-input" min="1" max="${total}" placeholder="${t('ayah')} #" autocomplete="off">
        <button class="btn-primary" style="padding: 8px 16px;" onclick="QuranPage.jumpToInputAyah()">${t('jumpToAyah')}</button>
      </div>
      <div class="ayah-number-grid">
        ${grid.map(n => `<button class="ayah-num-btn" onclick="QuranPage.jumpToAyahInPage(${n})">${n}</button>`).join('')}
      </div>
    `;
    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal-overlay').classList.remove('hidden');
    setTimeout(() => document.getElementById('ayah-input')?.focus(), 100);
    document.getElementById('ayah-input')?.addEventListener('keypress', e => {
      if (e.key === 'Enter') this.jumpToInputAyah();
    });
  },

  jumpToInputAyah() {
    const input = document.getElementById('ayah-input');
    if (!input) return;
    const n = parseInt(input.value, 10);
    if (n && n >= 1 && n <= this.currentSurah.numberOfAyahs) {
      this.jumpToAyahInPage(n);
    }
  },

  jumpToAyahInPage(ayahNumber) {
    closeModal();
    this.scrollToAyah(ayahNumber, true);
  },

  // ============ READER SETTINGS ============
  openReaderSettings() {
    const s = this.readerSettings;
    const localeKey = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
    const html = `
      <div class="modal-header">
        <div class="modal-title">${t('settings_reader')}</div>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>

      <div class="settings-group">
        <div class="settings-label">${t('fontSize')}</div>
        <div class="font-size-options">
          ${['small', 'medium', 'large', 'xlarge'].map(size => `
            <button class="font-opt ${s.fontSize === size ? 'active' : ''}" onclick="QuranPage.setFontSize('${size}', this)">
              <span class="font-opt-letter font-${size}-preview">أ</span>
              <span class="font-opt-label">${size === 'small' ? 'A' : size === 'medium' ? 'AA' : size === 'large' ? 'AAA' : 'AAAA'}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="settings-group">
        <label class="settings-toggle">
          <span>${t('transliteration')}</span>
          <input type="checkbox" ${s.showTransliteration ? 'checked' : ''} onchange="QuranPage.toggleSetting('showTransliteration', this.checked)">
          <span class="toggle-slider"></span>
        </label>
        <label class="settings-toggle">
          <span>${t('translation')}</span>
          <input type="checkbox" ${s.showTranslation ? 'checked' : ''} onchange="QuranPage.toggleSetting('showTranslation', this.checked)">
          <span class="toggle-slider"></span>
        </label>
      </div>

      <div class="settings-group">
        <div class="settings-label">🎤 ${t('reciter') || 'Recitador'}</div>
        ${(CONFIG.RECITERS || []).map(r => `
          <div class="tafsir-option ${AppState.settings.reciter === r.id ? 'active' : ''}" onclick="QuranPage.setReciter('${r.id}', this)">
            <div class="tafsir-opt-info">
              <div class="tafsir-opt-name">${r.name}</div>
              <div class="tafsir-opt-desc">${r.country || ''}</div>
            </div>
            ${AppState.settings.reciter === r.id ? '<i class="fas fa-check-circle"></i>' : ''}
          </div>
        `).join('')}
      </div>

      <div class="settings-group">
        <div class="settings-label">${t('selectTafsir')}</div>
        ${TafsirService.getAvailableTafsirs(localeKey).map(tf => `
          <div class="tafsir-option ${s.tafsir === tf.id ? 'active' : ''}" onclick="QuranPage.setTafsir('${tf.id}', this)">
            <div class="tafsir-opt-info">
              <div class="tafsir-opt-name">${tf.name}</div>
              <div class="tafsir-opt-desc">${tf.desc}</div>
            </div>
            ${s.tafsir === tf.id ? '<i class="fas fa-check-circle"></i>' : ''}
          </div>
        `).join('')}
      </div>
    `;
    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal-overlay').classList.remove('hidden');
  },

  setReciter(reciterId, el) {
    AppState.settings.reciter = reciterId;
    Storage.saveSettings();
    // Update UI: mark selected
    if (el && el.parentElement) {
      el.parentElement.querySelectorAll('.tafsir-option').forEach(o => o.classList.remove('active'));
      el.classList.add('active');
    }
    // Invalidate cached surah audio
    if (this.currentSurah && this.currentSurah.number) {
      const num = this.currentSurah.number;
      // Re-fetch surah with new reciter next time (clear cache key)
      try { localStorage.removeItem(`surah_${num}_${AppState.settings.translation}_${AppState.settings.reciter}`); } catch (e) {}
    }
    showToast('✅ ' + (CONFIG.RECITERS.find(r => r.id === reciterId)?.name || ''), 1500);
    // v27: el audio ya no se descarga solo al cambiar de recitador — el
    // usuario elige qué suras descargar desde el gestor (icono de descarga).
  },

  setFontSize(size, btn) {
    this.readerSettings.fontSize = size;
    this.saveReaderSettings();
    const page = document.getElementById('mushaf-page');
    if (page) {
      page.classList.remove('font-small', 'font-medium', 'font-large', 'font-xlarge');
      page.classList.add(`font-${size}`);
    }
    if (btn) {
      btn.parentElement.querySelectorAll('.font-opt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
  },

  toggleSetting(key, value) {
    this.readerSettings[key] = value;
    this.saveReaderSettings();
    if (this.currentSurah) {
      const cont = document.getElementById('ayahs-container');
      if (cont) {
        cont.innerHTML = this.currentSurah.ayahs.map((a, idx) =>
          this.renderAyah(a, idx, this.currentSurah)
        ).join('');
      }
    }
  },

  setTafsir(tafsirId, btn) {
    this.readerSettings.tafsir = tafsirId;
    this.saveReaderSettings();
    if (btn) {
      btn.parentElement.querySelectorAll('.tafsir-option').forEach(o => o.classList.remove('active'));
      btn.classList.add('active');
    }
    showToast('✓');
  },

  // ============ TAFSIR (Fixed mobile tabs + better translation) ============
  async openTafsir(surahNum, ayahNum) {
    const localeKey = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
    const targetLangLabel = { es: 'Español', en: 'English', ar: 'العربية' }[currentLocale] || 'Español';

    // Prefetch local tafsir so it shows instantly (works 100% offline)
    TafsirService.getTafsir(surahNum, ayahNum, this.readerSettings.tafsir, localeKey).catch(() => {});

    const html = `
      <div class="modal-header">
        <div class="modal-title">${t('tafsirOf')} ${surahNum}:${ayahNum}</div>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>
      <div class="tafsir-content" id="tafsir-content">
        ${Skeleton.tafsir()}
      </div>
    `;
    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal-overlay').classList.remove('hidden');

    try {
      const tafsir = await TafsirService.getTafsir(
        surahNum, ayahNum,
        this.readerSettings.tafsir,
        localeKey
      );

      const ayah = this.currentSurah?.ayahs.find(a => a.number === ayahNum);
      const content = document.getElementById('tafsir-content');
      if (!content) return;

      // Default tab is translated (unless in arabic locale)
      // Consider translation "useful" only if it's not nearly empty
      const hasTranslation = tafsir.translated
        && tafsir.translated.trim().length > 20
        && currentLocale !== 'ar';
      const translationFailed = currentLocale !== 'ar' && (!tafsir.translated || tafsir.translated.trim().length <= 20);

      content.innerHTML = `
        ${ayah ? `
          <div class="tafsir-ayah-preview">
            <div class="tafsir-ayah-arabic" dir="rtl">${ayah.arabic}</div>
            ${ayah.translation && currentLocale !== 'ar' ? `<div class="tafsir-ayah-trans">"${ayah.translation}"</div>` : ''}
          </div>
        ` : ''}

        <div class="tafsir-source-line">
          <i class="fas fa-book"></i>
          ${t('tafsirSource')}: <strong>${tafsir.source}</strong> ${tafsir.sourceAr && currentLocale !== 'ar' ? `(${tafsir.sourceAr})` : ''}
        </div>

        ${hasTranslation ? `
          <div class="tafsir-tabs" role="tablist">
            <button class="tafsir-tab active" data-tab="translated" onclick="QuranPage.switchTafsirTab(event, 'translated')" type="button">
              <i class="fas fa-language"></i> ${targetLangLabel}
            </button>
            <button class="tafsir-tab" data-tab="arabic" onclick="QuranPage.switchTafsirTab(event, 'arabic')" type="button">
              ﺍ ${t('arabicOriginal')}
            </button>
          </div>

          <div class="tafsir-body tafsir-body-translated" id="tafsir-translated">
            ${this.escapeHtml(tafsir.translated)}
            <div class="tafsir-disclaimer">
              <i class="fas fa-check-circle"></i> ${t('tafsirOffline')}.
            </div>
          </div>

          <div class="tafsir-body tafsir-body-arabic" id="tafsir-arabic" style="display: none;" dir="rtl">
            ${this.escapeHtml(tafsir.arabic)}
          </div>
        ` : `
          ${translationFailed ? `
            <div class="tafsir-translation-error">
              <i class="fas fa-exclamation-triangle"></i>
              <span>${t('translationUnavailable') || 'Traducción automática no disponible. Mostrando texto original en árabe.'}</span>
              <button class="btn-ghost btn-small" onclick="QuranPage.retryTafsirTranslation(${surahNum}, ${ayahNum})">
                <i class="fas fa-redo"></i> ${t('retry') || 'Reintentar'}
              </button>
            </div>
          ` : ''}
          <div class="tafsir-body tafsir-body-arabic" dir="rtl">
            ${this.escapeHtml(tafsir.arabic)}
          </div>
        `}
      `;
    } catch (e) {
      const content = document.getElementById('tafsir-content');
      if (content) {
        const esc = (typeof escapeHtml === 'function') ? escapeHtml : this.escapeHtml.bind(this);
        content.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-icon">⚠️</div>
            <div class="empty-state-text">${t('error')}: ${esc(String(e.message || ''))}</div>
          </div>
        `;
      }
    }
  },

  escapeHtml(text) {
    if (!text) return '';
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  },

  // Force re-fetch of tafsir, bypassing cache (for failed translations)
  async retryTafsirTranslation(surahNum, ayahNum) {
    // Clear ALL tafsir cache entries (memory + localStorage) — the old code removed a
    // key that never matched the real cache key, so retry never actually re-fetched.
    if (typeof TafsirService !== 'undefined' && TafsirService.clearCache) {
      TafsirService.clearCache();
    }
    this.openTafsir(surahNum, ayahNum);
  },

  switchTafsirTab(event, tab) {
    event.preventDefault();
    event.stopPropagation();
    // Toggle tab buttons
    document.querySelectorAll('.tafsir-tab').forEach(b => b.classList.remove('active'));
    const targetBtn = event.currentTarget || event.target.closest('.tafsir-tab');
    if (targetBtn) targetBtn.classList.add('active');

    const tr = document.getElementById('tafsir-translated');
    const ar = document.getElementById('tafsir-arabic');
    if (tab === 'translated') {
      if (tr) tr.style.display = 'block';
      if (ar) ar.style.display = 'none';
    } else {
      if (tr) tr.style.display = 'none';
      if (ar) ar.style.display = 'block';
    }
  },

  // ============ GESTOR DE DESCARGAS DE AUDIO (v27) ============
  // El audio de recitación (pesado) ya no se descarga automáticamente: se
  // pide permiso una vez y el usuario elige recitador + sura. Cada descarga
  // muestra su tamaño, puede borrarse, y puede guardarse en el dispositivo
  // como MP3 para escucharla sin abrir la app.

  _attachAudioEvents() {
    if (this._audioEventsAttached || typeof QuranOfflineService === 'undefined') return;
    this._audioEventsAttached = true;
    QuranOfflineService.onProgress(evt => {
      if (!evt || typeof evt.type !== 'string' || !evt.type.startsWith('audio')) return;
      this.updateAudioDownloadBadge();
      // Si el gestor está abierto, refrescar su contenido en vivo
      if (document.getElementById('audio-manager-body')) {
        if (evt.type === 'audio-progress') this._updateAudioManagerProgress();
        else if (evt.type === 'audio-complete') {
          showToast('✅ ' + t('audioDownloaded'));
          this._renderAudioManagerBody();
        } else if (evt.type === 'audio-deleted' || evt.type === 'audio-paused' || evt.type === 'audio-error') {
          this._renderAudioManagerBody();
        }
      }
    });
  },

  updateAudioDownloadBadge() {
    const btn = document.getElementById('quran-audio-dl-btn');
    if (!btn || typeof QuranOfflineService === 'undefined') return;
    const count = QuranOfflineService.getAudioDownloadCount();
    const active = QuranOfflineService._audioDownloading;
    btn.classList.toggle('downloading', !!active);
    btn.innerHTML = `<i class="fas fa-${active ? 'spinner fa-spin' : 'cloud-arrow-down'}"></i>${count ? `<span class="quran-dl-badge">${count}</span>` : ''}`;
  },

  // Ventana de permiso: se muestra una sola vez (o al pulsar el icono de
  // descarga si nunca se respondió). El texto y el tafsir siguen siendo
  // automáticos; solo el audio necesita permiso por su tamaño.
  maybeShowAudioPermission(force = false) {
    if (typeof QuranOfflineService === 'undefined' || !QuranOfflineService._audioCacheSupported()) return;
    const decision = Storage.get('audio_download_permission');
    if (!force && decision) return; // ya respondió (granted/declined)
    if (!force && document.getElementById('offline-download-banner')?.innerHTML) {
      // Dejar respirar al usuario si el banner de texto está en pantalla
      setTimeout(() => this.maybeShowAudioPermission(), 4000);
      return;
    }
    const estTotal = QuranOfflineService.formatBytes(QuranOfflineService.estimateTotalAudioBytes());
    const reciterName = CONFIG.RECITERS.find(r => r.id === AppState.settings.reciter)?.name || '';
    document.getElementById('modal-content').innerHTML = `
      <div class="modal-header">
        <div class="modal-title">🎧 ${t('audioPermissionTitle')}</div>
        <button class="modal-close" onclick="QuranPage.dismissAudioPermission()">×</button>
      </div>
      <div class="audio-permission-body">
        <div class="audio-permission-icon"><i class="fas fa-headphones"></i></div>
        <p>${t('audioPermissionBody')}</p>
        <div class="audio-permission-meta">
          <span><i class="fas fa-microphone"></i> ${reciterName}</span>
          <span><i class="fas fa-database"></i> ~${estTotal}</span>
        </div>
        <div class="audio-permission-note"><i class="fas fa-circle-info"></i> ${t('audioPermissionNote')}</div>
        <div class="audio-permission-actions">
          <button class="btn-primary" onclick="QuranPage.grantAudioPermission()">
            <i class="fas fa-check"></i> ${t('audioPermissionAllow')}
          </button>
          <button class="btn-ghost" onclick="QuranPage.dismissAudioPermission()">${t('audioPermissionLater')}</button>
        </div>
      </div>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
  },

  grantAudioPermission() {
    Storage.set('audio_download_permission', 'granted');
    this.openAudioManager();
  },

  dismissAudioPermission() {
    // No insistir en esta sesión de arranque; el icono sigue disponible
    Storage.set('audio_download_permission', 'declined');
    closeModal();
  },

  // Ventana de descarga: recitador + sura, con tamaño, borrado y exportación.
  openAudioManager() {
    this._attachAudioEvents();
    if (typeof QuranOfflineService === 'undefined' || !QuranOfflineService._audioCacheSupported()) {
      showToast('⚠️');
      return;
    }
    if (!this._amReciter) this._amReciter = AppState.settings.reciter;
    document.getElementById('modal-content').innerHTML = `
      <div class="modal-header">
        <div class="modal-title">⬇️ ${t('audioDownloadsTitle')}</div>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>
      <div id="audio-manager-body"></div>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
    this._renderAudioManagerBody();
  },

  _renderAudioManagerBody() {
    const body = document.getElementById('audio-manager-body');
    if (!body || typeof QuranOfflineService === 'undefined') return;
    const svc = QuranOfflineService;
    const reciter = this._amReciter || AppState.settings.reciter;
    const reciterMeta = CONFIG.RECITERS.find(r => r.id === reciter) || CONFIG.RECITERS[0];
    const surahNum = Math.min(114, Math.max(1, parseInt(this._amSurah || this.currentSurah?.number || 1, 10)));
    const surahMeta = svc.getSurahMeta(surahNum);
    const surahName = surahMeta ? QuranHelpers.surahDisplayName(surahMeta) : String(surahNum);
    const downloaded = svc.isSurahAudioDownloaded(reciter, surahNum);
    const rec = svc.getAudioDownloads().find(d => d.reciter === reciter && d.surah === surahNum);
    const sizeLabel = svc.formatBytes(rec?.bytes || svc.estimateSurahBytes(surahNum));
    const dl = svc._audioDl;
    const isThis = dl && dl.reciter === reciter && dl.surah === surahNum;
    const all = svc.getAudioDownloads();
    const totalBytes = all.reduce((s, d) => s + (d.bytes || 0), 0);

    body.innerHTML = `
      <div class="audio-manager">
        <div class="am-selectors">
          <div class="am-field">
            <div class="am-label"><i class="fas fa-microphone"></i> ${t('reciter')}</div>
            <button class="am-select" onclick="QuranPage.openAudioReciterPicker()">
              <span>${reciterMeta.name}</span><i class="fas fa-chevron-down"></i>
            </button>
          </div>
          <div class="am-field">
            <div class="am-label"><i class="fas fa-book-open"></i> ${t('surah')}</div>
            <button class="am-select" onclick="QuranPage.openAudioSurahPicker()">
              <span>${surahNum}. ${Validate.escapeHTML(surahName)}</span><i class="fas fa-chevron-down"></i>
            </button>
          </div>
        </div>

        <div class="am-target-card">
          <div class="am-target-info">
            <div class="am-target-name">${surahNum}. ${Validate.escapeHTML(surahName)}</div>
            <div class="am-target-meta">
              <span><i class="fas fa-microphone"></i> ${reciterMeta.name}</span>
              <span><i class="fas fa-database"></i> ${rec ? '' : '~'}${sizeLabel}</span>
              <span><i class="fas fa-list-ol"></i> ${surahMeta?.numberOfAyahs || ''} ${t('ayah').toLowerCase()}s</span>
            </div>
          </div>
          ${isThis ? `
            <div class="am-progress">
              <div class="am-progress-track"><div class="am-progress-fill" id="am-progress-fill" style="width:${Math.round((dl.done / dl.total) * 100)}%"></div></div>
              <div class="am-progress-text" id="am-progress-text">${dl.done}/${dl.total} · ${svc.formatBytes(dl.bytes)}</div>
              <button class="btn-ghost btn-small" onclick="QuranOfflineService.cancelDownload(); QuranPage._renderAudioManagerBody();"><i class="fas fa-stop"></i> ${t('audioCancel')}</button>
            </div>
          ` : downloaded ? `
            <div class="am-status ok"><i class="fas fa-circle-check"></i> ${t('audioSavedOffline')} · ${sizeLabel}</div>
            <div class="am-actions">
              <button class="btn-primary" onclick="QuranPage.exportSurahAudio()"><i class="fas fa-file-arrow-down"></i> ${t('audioSaveToDevice')}</button>
              <button class="btn-ghost am-danger" onclick="QuranPage.deleteSurahAudio()"><i class="fas fa-trash-alt"></i> ${t('audioDelete')}</button>
            </div>
          ` : `
            <div class="am-actions">
              <button class="btn-primary" ${svc._audioDownloading ? 'disabled' : ''} onclick="QuranPage.downloadSurahAudio()">
                <i class="fas fa-cloud-arrow-down"></i> ${t('audioDownload')} (~${sizeLabel})
              </button>
              <button class="btn-ghost" onclick="QuranPage.exportSurahAudio()"><i class="fas fa-file-arrow-down"></i> ${t('audioSaveToDevice')}</button>
            </div>
          `}
        </div>

        ${all.length ? `
          <div class="am-downloaded-head">
            <span><i class="fas fa-hard-drive"></i> ${t('audioDownloadedList')} · ${svc.formatBytes(totalBytes)}</span>
            <button class="btn-ghost btn-small am-danger" onclick="QuranPage.deleteAllAudio()"><i class="fas fa-trash-alt"></i> ${t('audioDeleteAll')}</button>
          </div>
          <div class="am-downloaded-list">
            ${all.sort((a, b) => a.surah - b.surah).map(d => {
              const m = svc.getSurahMeta(d.surah);
              const rName = CONFIG.RECITERS.find(r => r.id === d.reciter)?.name || d.reciter;
              return `
                <div class="am-downloaded-item">
                  <div class="am-downloaded-info">
                    <div class="am-downloaded-name">${d.surah}. ${Validate.escapeHTML(m ? QuranHelpers.surahDisplayName(m) : String(d.surah))}</div>
                    <div class="am-downloaded-meta">${rName} · ${svc.formatBytes(d.bytes)}</div>
                  </div>
                  <button class="am-mini-btn" title="${t('audioSaveToDevice')}" onclick="QuranPage.exportSurahAudioFor('${d.reciter}', ${d.surah})"><i class="fas fa-file-arrow-down"></i></button>
                  <button class="am-mini-btn am-danger" title="${t('audioDelete')}" onclick="QuranPage.deleteSurahAudioFor('${d.reciter}', ${d.surah})"><i class="fas fa-trash-alt"></i></button>
                </div>
              `;
            }).join('')}
          </div>
        ` : `<div class="empty-state-mini">🎧 ${t('audioNoDownloads')}</div>`}

        <div class="audio-permission-note"><i class="fas fa-wifi"></i> ${t('audioManagerNote')}</div>
      </div>
    `;
  },

  _updateAudioManagerProgress() {
    const svc = QuranOfflineService;
    const dl = svc._audioDl;
    if (!dl) return;
    const fill = document.getElementById('am-progress-fill');
    const text = document.getElementById('am-progress-text');
    if (fill) fill.style.width = Math.round((dl.done / dl.total) * 100) + '%';
    if (text) text.textContent = `${dl.done}/${dl.total} · ${svc.formatBytes(dl.bytes)}`;
  },

  openAudioReciterPicker() {
    const current = this._amReciter;
    document.getElementById('audio-manager-body').innerHTML = `
      <div class="am-picker-head">
        <button class="btn-ghost btn-small" onclick="QuranPage._renderAudioManagerBody()"><i class="fas fa-chevron-left"></i> ${t('backToWisdom')}</button>
        <div class="am-label">${t('reciter')}</div>
      </div>
      <div class="picker-list">
        ${(CONFIG.RECITERS || []).map(r => `
          <div class="picker-item ${r.id === current ? 'current' : ''}" onclick="QuranPage.pickAudioReciter('${r.id}')">
            <div class="picker-info">
              <div class="picker-name">${r.name}</div>
              <div class="picker-meta">${r.country || ''}</div>
            </div>
            ${r.id === current ? '<i class="fas fa-check-circle"></i>' : ''}
          </div>
        `).join('')}
      </div>
    `;
  },

  pickAudioReciter(id) {
    this._amReciter = id;
    this._renderAudioManagerBody();
  },

  openAudioSurahPicker() {
    const svc = QuranOfflineService;
    const current = Math.min(114, Math.max(1, parseInt(this._amSurah || this.currentSurah?.number || 1, 10)));
    document.getElementById('audio-manager-body').innerHTML = `
      <div class="am-picker-head">
        <button class="btn-ghost btn-small" onclick="QuranPage._renderAudioManagerBody()"><i class="fas fa-chevron-left"></i> ${t('backToWisdom')}</button>
        <div class="am-label">${t('surah')}</div>
      </div>
      <div class="picker-search">
        <i class="fas fa-search"></i>
        <input type="text" id="am-surah-search" placeholder="${t('searchSurah')}" autocomplete="off">
      </div>
      <div class="picker-list" id="am-surah-list">${this._renderAudioSurahList(this.surahs.length ? this.surahs : svc.getSurahList(), current)}</div>
    `;
    document.getElementById('am-surah-search')?.addEventListener('input', e => {
      const q = e.target.value.trim();
      const src = this.surahs.length ? this.surahs : svc.getSurahList();
      const filtered = q ? src.filter(s => QuranHelpers.surahMatches(s, q)) : src;
      document.getElementById('am-surah-list').innerHTML = this._renderAudioSurahList(filtered, current);
    });
  },

  _renderAudioSurahList(surahs, current) {
    const svc = QuranOfflineService;
    return surahs.map(s => {
      const isDown = svc.isSurahAudioDownloaded(this._amReciter, s.number);
      return `
        <div class="picker-item ${s.number === current ? 'current' : ''}" onclick="QuranPage.pickAudioSurah(${s.number})">
          <div class="picker-num">${s.number}</div>
          <div class="picker-info">
            <div class="picker-name">${Validate.escapeHTML(QuranHelpers.surahDisplayName(s))}</div>
            <div class="picker-meta">${svc.formatBytes(svc.estimateSurahBytes(s.number))}${isDown ? ' · ✔' : ''}</div>
          </div>
          ${isDown ? '<i class="fas fa-circle-check" style="color:var(--success)"></i>' : ''}
        </div>
      `;
    }).join('');
  },

  pickAudioSurah(num) {
    this._amSurah = num;
    this._renderAudioManagerBody();
  },

  async downloadSurahAudio() {
    const svc = QuranOfflineService;
    const reciter = this._amReciter || AppState.settings.reciter;
    const surahNum = Math.min(114, Math.max(1, parseInt(this._amSurah || 1, 10)));
    if (!navigator.onLine) { showToast('📴 ' + t('quranDownloadPaused')); return; }
    this._renderAudioManagerBody();
    const ok = await svc.downloadSurahAudio(reciter, surahNum);
    this.updateAudioDownloadBadge();
    if (ok) showToast('✅ ' + t('audioDownloaded'));
    this._renderAudioManagerBody();
  },

  async deleteSurahAudio() {
    const svc = QuranOfflineService;
    await svc.deleteSurahAudio(this._amReciter || AppState.settings.reciter, Math.min(114, Math.max(1, parseInt(this._amSurah || 1, 10))));
    this.updateAudioDownloadBadge();
    showToast('🗑️ ' + t('audioDeleted'));
    this._renderAudioManagerBody();
  },

  async deleteSurahAudioFor(reciter, surah) {
    await QuranOfflineService.deleteSurahAudio(reciter, surah);
    this.updateAudioDownloadBadge();
    showToast('🗑️ ' + t('audioDeleted'));
    this._renderAudioManagerBody();
  },

  async deleteAllAudio() {
    await QuranOfflineService.deleteAllAudio();
    this.updateAudioDownloadBadge();
    showToast('🗑️ ' + t('audioDeleted'));
    this._renderAudioManagerBody();
  },

  async exportSurahAudio() {
    await this.exportSurahAudioFor(this._amReciter || AppState.settings.reciter, Math.min(114, Math.max(1, parseInt(this._amSurah || 1, 10))));
  },

  async exportSurahAudioFor(reciter, surah) {
    showToast('⏳ ' + t('audioPreparingFile'), 1500);
    const res = await QuranOfflineService.exportSurahAudio(reciter, surah);
    if (res.ok) {
      showToast(`💾 ${res.name} (${QuranOfflineService.formatBytes(res.bytes)})`, 3500);
    } else if (!navigator.onLine) {
      showToast('📴 ' + t('audioExportOfflineFail'), 3500);
    } else {
      showToast('⚠️ ' + t('error'), 2500);
    }
  },

  // ============ AUDIO with REPEAT ============
  toggleRepeat(ayahNum, audioUrl) {
    // Per-ayah repeat button: toggle ayah-loop and start playback
    if (ayahNum !== undefined) {
      if (this.repeatMode === 'ayah' && this.playingAyah === ayahNum) {
        this.repeatMode = 'off';
        this.saveRepeatMode();
        showToast(t('repeatOff'));
      } else {
        this.repeatMode = 'ayah';
        this.saveRepeatMode();
        showToast(t('repeatAyah'));
        // Start playing this ayah if not already
        if (this.playingAyah !== ayahNum && audioUrl) {
          this.playAyah(ayahNum, audioUrl);
        }
      }
      // Update repeat button visual
      document.querySelectorAll('.repeat-btn').forEach(b => b.classList.remove('active'));
      if (this.repeatMode === 'ayah') {
        document.getElementById('repeat-btn-' + ayahNum)?.classList.add('active');
      }
      return;
    }
    // Global toolbar button: cycle off -> ayah -> surah
    const modes = ['off', 'ayah', 'surah'];
    const idx = modes.indexOf(this.repeatMode);
    this.repeatMode = modes[(idx + 1) % modes.length];
    this.saveRepeatMode();
    const labels = { off: t('repeatOff'), ayah: t('repeatAyah'), surah: t('repeatSurah') };
    showToast(labels[this.repeatMode]);
    if (this.currentSurah) {
      this.renderReader(document.getElementById('main-content'), this.currentSurah);
    }
  },

  // v27: si la aleya está descargada en la caché, se sirve como Blob local
  // (funciona sin conexión). La pausa/reanudación se maneja antes de la
  // resolución async para que el botón responda al instante.
  async playAyah(num, audioUrl) {
    const player = document.getElementById('audio-player');
    if (!player || !audioUrl || audioUrl === 'null' || audioUrl === '') return;

    if (this.playingAyah === num) {
      player.pause();
      this.playingAyah = null;
      document.getElementById(`ayah-${num}`)?.classList.remove('playing');
      // 🔦 Liberar WakeLock cuando se pausa
      if (typeof WakeLockService !== 'undefined') WakeLockService.release();
      return;
    }

    if (this.playingAyah !== null) {
      const prevBtn = document.getElementById('play-btn-' + this.playingAyah);
      if (prevBtn) prevBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    // Resolver desde la caché offline (si existe) → Blob local
    try {
      if (typeof QuranOfflineService !== 'undefined') {
        const ayah = this.currentSurah?.ayahs?.find(a => a.number === num);
        audioUrl = await QuranOfflineService.getPlayableUrl(audioUrl, ayah?.numberGlobal, AppState.settings.reciter);
      }
    } catch (e) {}

    if (this._lastBlobUrl && this._lastBlobUrl !== audioUrl) {
      try { URL.revokeObjectURL(this._lastBlobUrl); } catch (e) {}
    }
    this._lastBlobUrl = audioUrl.startsWith('blob:') ? audioUrl : null;

    player.src = audioUrl;
    player.play().catch(e => console.warn('Audio:', e));
    this.playingAyah = num;

    // 🔦 Adquirir WakeLock durante la recitación
    if (typeof WakeLockService !== 'undefined') WakeLockService.acquire('recitation');

    const btn = document.getElementById('play-btn-' + num);
    if (btn) btn.innerHTML = '<i class="fas fa-pause"></i>';

    document.querySelectorAll('.ayah-block').forEach(b => b.classList.remove('playing'));
    document.getElementById(`ayah-${num}`)?.classList.add('playing');

    player.onended = () => {
      const b = document.getElementById('play-btn-' + num);
      if (b) b.innerHTML = '<i class="fas fa-play"></i>';
      document.getElementById(`ayah-${num}`)?.classList.remove('playing');
      this.playingAyah = null;

      // Repeat logic
      if (this.repeatMode === 'ayah') {
        // Replay same ayah after small delay
        setTimeout(() => this.playAyah(num, audioUrl), 300);
        return;
      }

      // Auto-advance to next ayah
      const next = this.currentSurah?.ayahs.find(a => a.number === num + 1);
      if (next) {
        this.scrollToAyah(num + 1);
        this.playAyah(num + 1, next.audio);
      } else if (this.repeatMode === 'surah') {
        // Restart from ayah 1
        const first = this.currentSurah?.ayahs[0];
        if (first) {
          this.scrollToAyah(1);
          this.playAyah(1, first.audio);
        }
      } else {
        // Fin de recitación: liberar WakeLock
        if (typeof WakeLockService !== 'undefined') WakeLockService.release();
      }
    };
  },

  // ============ AYAH BOOKMARKS (max 5, cada una con su color) ============
  BOOKMARK_COLORS: ['#D4AF37', '#2E8B57', '#3B82F6', '#8B5CF6', '#E11D48'],
  MAX_BOOKMARKS: 5,

  getBookmarks() {
    let bm = Storage.get('quran_bookmarks_v2');
    if (!Array.isArray(bm)) {
      // Migración: antiguos marcadores en formato "s:a"
      const old = Storage.get('bookmarks');
      bm = (Array.isArray(old) ? old : []).slice(0, this.MAX_BOOKMARKS).map((key, i) => {
        const [s, a] = String(key).split(':').map(n => parseInt(n, 10));
        return { s, a, c: i, t: Date.now() };
      }).filter(b => b.s >= 1 && b.s <= 114 && b.a >= 1);
      Storage.set('quran_bookmarks_v2', bm);
      Storage.remove('bookmarks');
    }
    return bm;
  },

  saveBookmarks(bm) {
    Storage.set('quran_bookmarks_v2', bm);
  },

  getBookmarkFor(surahNum, ayahNum) {
    return this.getBookmarks().find(b => b.s === surahNum && b.a === ayahNum) || null;
  },

  toggleBookmark(surahNum, ayahNum) {
    const bookmarks = this.getBookmarks();
    const idx = bookmarks.findIndex(b => b.s === surahNum && b.a === ayahNum);
    if (idx >= 0) {
      // Ya guardada: quitar
      bookmarks.splice(idx, 1);
      this.saveBookmarks(bookmarks);
      this._refreshAyahBookmarkUI(surahNum, ayahNum);
      showToast('🔖 ' + t('bookmarkRemoved'));
      return;
    }
    if (bookmarks.length >= this.MAX_BOOKMARKS) {
      showToast('⚠️ ' + t('bookmarkLimit'));
      this.openBookmarks();
      return;
    }
    // Primer color libre
    const usedColors = bookmarks.map(b => b.c);
    let colorIdx = 0;
    while (usedColors.includes(colorIdx)) colorIdx++;
    bookmarks.push({ s: surahNum, a: ayahNum, c: colorIdx, t: Date.now() });
    this.saveBookmarks(bookmarks);
    this._refreshAyahBookmarkUI(surahNum, ayahNum);
    showToast('🔖 ' + t('bookmarkSaved'));
  },

  _refreshAyahBookmarkUI(surahNum, ayahNum) {
    const bm = this.getBookmarkFor(surahNum, ayahNum);
    const btn = document.getElementById(`bookmark-${ayahNum}`);
    const block = document.getElementById(`ayah-${ayahNum}`);
    if (btn) btn.innerHTML = bm
      ? `<i class="fas fa-bookmark" style="color:${this.BOOKMARK_COLORS[bm.c]};"></i>`
      : '<i class="far fa-bookmark"></i>';
    if (block) {
      block.classList.remove('bookmarked', 'bm-0', 'bm-1', 'bm-2', 'bm-3', 'bm-4');
      if (bm) block.classList.add('bookmarked', `bm-${bm.c}`);
    }
    this._updateBookmarkBadge();
  },

  _updateBookmarkBadge() {
    const count = this.getBookmarks().length;
    const btn = document.querySelector('.bookmark-list-btn');
    if (btn) {
      btn.innerHTML = `<i class="fas fa-bookmark"></i>${count ? `<span class="bm-badge">${count}</span>` : ''}`;
    }
  },

  renderBookmarksEntry() {
    const el = document.getElementById('bookmarks-entry');
    if (!el) return;
    const bookmarks = this.getBookmarks();
    el.innerHTML = `
      <button class="bookmarks-entry-card" onclick="QuranPage.openBookmarks()">
        <span class="bookmarks-entry-icon"><i class="fas fa-bookmark"></i></span>
        <span class="bookmarks-entry-text">
          <span class="bookmarks-entry-title">${t('bookmarksTitle')}</span>
          <span class="bookmarks-entry-sub">${bookmarks.length}/${this.MAX_BOOKMARKS}</span>
        </span>
        ${bookmarks.length ? `<span class="bookmarks-entry-dots">${bookmarks.map(b => `<span class="bookmark-color-dot" style="background:${this.BOOKMARK_COLORS[b.c]};"></span>`).join('')}</span>` : ''}
        <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'}"></i>
      </button>
    `;
  },

  async openBookmarks() {
    if (!this.surahs.length) {
      try { this.surahs = await API.getSurahList(); } catch (e) {}
    }
    const bookmarks = this.getBookmarks();
    const locale = typeof currentLocale !== 'undefined' ? currentLocale : 'en';
    const listHtml = bookmarks.length ? bookmarks.map(b => {
      const surahName = this.getSurahNameByNumber(b.s);
      const color = this.BOOKMARK_COLORS[b.c];
      const date = b.t ? new Date(b.t).toLocaleDateString(locale) : '';
      return `
        <div class="bookmark-item" onclick="QuranPage.goToBookmark(${b.s}, ${b.a})">
          <span class="bookmark-color-dot" style="background:${color};"></span>
          <div class="bookmark-item-info">
            <div class="bookmark-item-title">${b.s}. ${Validate.escapeHTML(surahName || String(b.s))}</div>
            <div class="bookmark-item-meta">${t('ayah')} ${b.a}${date ? ' · ' + date : ''}</div>
          </div>
          <span class="bookmark-item-go">${t('bookmarkGo')} <i class="fas fa-chevron-${locale === 'ar' ? 'left' : 'right'}"></i></span>
          <button class="bookmark-item-del" onclick="QuranPage.removeBookmark(${b.s}, ${b.a}, event)" aria-label="Delete">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
    }).join('') : `<div class="empty-state-mini">🔖 ${t('noBookmarks')}</div>`;

    document.getElementById('modal-content').innerHTML = `
      <div class="modal-header">
        <div class="modal-title">🔖 ${t('bookmarksTitle')} (${bookmarks.length}/${this.MAX_BOOKMARKS})</div>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>
      <div class="bookmarks-list">${listHtml}</div>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
  },

  goToBookmark(surahNum, ayahNum) {
    closeModal();
    if (this.currentSurah && this.currentSurah.number === surahNum) {
      // Misma sura ya abierta: scroll directo con resaltado
      this.scrollToAyah(ayahNum, true);
    } else {
      Router.push('surah', { surahNumber: surahNum, ayah: ayahNum });
    }
  },

  removeBookmark(surahNum, ayahNum, event) {
    if (event) event.stopPropagation();
    this.saveBookmarks(this.getBookmarks().filter(b => !(b.s === surahNum && b.a === ayahNum)));
    if (this.currentSurah && this.currentSurah.number === surahNum) {
      this._refreshAyahBookmarkUI(surahNum, ayahNum);
    }
    this.renderBookmarksEntry();
    this.openBookmarks();
  },

  async copyAyah(surahNum, ayahNum) {
    const ayah = this.currentSurah?.ayahs.find(a => a.number === ayahNum);
    if (!ayah) return;
    const text = `${ayah.arabic}\n\n"${ayah.translation || ''}"\n\n— ${this.currentSurah.englishName} ${surahNum}:${ayahNum}\n\nQuba 🕌`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback para contextos sin Clipboard API (HTTP, WebViews antiguos)
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      showToast(t('copied') || '📋', 1500);
    } catch (e) {
      showToast(t('error') || 'Error', 1500);
    }
  },

  async shareAyah(surahNum, ayahNum) {
    const ayah = this.currentSurah?.ayahs.find(a => a.number === ayahNum);
    if (!ayah) return;
    const text = `${ayah.arabic}\n\n"${ayah.translation}"\n\n— ${this.currentSurah.englishName} ${surahNum}:${ayahNum}\n\nQuba 🕌`;
    if (navigator.share) {
      try { await navigator.share({ text }); } catch (e) {}
    } else {
      try {
        await navigator.clipboard.writeText(text);
        showToast('📋');
      } catch (e) {}
    }
  },

  cleanup() {
    const player = document.getElementById('audio-player');
    if (player) { player.pause(); player.src = ''; }
    this.playingAyah = null;
  },
};
