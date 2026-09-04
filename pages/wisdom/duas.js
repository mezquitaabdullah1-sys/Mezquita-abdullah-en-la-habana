// 🤲 Du'as (Súplicas) — Live data from UmmahAPI (300+ duas across 27 categories)
const DuasPage = {
  categories: [],
  currentCategory: null,
  currentDuas: [],
  searchResults: null,

  // Multilingual category labels (frontend translation of the English API titles)
  CAT_TRANSLATIONS: {
    morning:     { es: 'Mañana',          ar: 'الصباح',       icon: '<i class="fas fa-cloud-sun"></i>', color: '#FFA726' },
    evening:     { es: 'Tarde',           ar: 'المساء',       icon: '<i class="fas fa-mountain-sun"></i>', color: '#FF7043' },
    wudu:        { es: 'Ablución',        ar: 'الوضوء',       icon: '<i class="fas fa-droplet"></i>', color: '#29B6F6' },
    prayer:      { es: 'En la oración',   ar: 'في الصلاة',    icon: '<i class="fas fa-mosque"></i>', color: '#0F4C3A' },
    after_prayer:{ es: 'Tras la oración', ar: 'بعد الصلاة',   icon: '<i class="fas fa-sparkles"></i>', color: '#1A6B52' },
    sleep:       { es: 'Antes de dormir', ar: 'قبل النوم',    icon: '<i class="fas fa-moon"></i>', color: '#5C6BC0' },
    food:        { es: 'Comida y bebida', ar: 'الطعام والشراب', icon: '<i class="fas fa-utensils"></i>', color: '#8D6E63' },
    travel:      { es: 'Viaje',           ar: 'السفر',        icon: '<i class="fas fa-suitcase"></i>', color: '#26A69A' },
    home:        { es: 'Hogar',           ar: 'البيت',        icon: '<i class="fas fa-house"></i>', color: '#9CCC65' },
    masjid:      { es: 'Mezquita',        ar: 'المسجد',       icon: '<i class="fas fa-mosque"></i>', color: '#D4AF37' },
    distress:    { es: 'Angustia',        ar: 'الكرب',        icon: '<i class="fas fa-heart-crack"></i>', color: '#EF5350' },
    forgiveness: { es: 'Perdón',          ar: 'الاستغفار',     icon: '<i class="fas fa-hands-praying"></i>', color: '#7E57C2' },
    illness:     { es: 'Enfermedad',      ar: 'المرض',        icon: '<i class="fas fa-stethoscope"></i>', color: '#EC407A' },
    weather:     { es: 'Clima',           ar: 'الطقس',        icon: '<i class="fas fa-cloud-sun-rain"></i>', color: '#42A5F5' },
    knowledge:   { es: 'Conocimiento',    ar: 'العلم',        icon: '<i class="fas fa-book-open"></i>', color: '#5E35B1' },
    parents:     { es: 'Padres',          ar: 'الوالدين',     icon: '<i class="fas fa-people-roof"></i>', color: '#AB47BC' },
    guidance:    { es: 'Guía',            ar: 'الهداية',      icon: '<i class="fas fa-compass"></i>', color: '#66BB6A' },
    gratitude:   { es: 'Gratitud',        ar: 'الشكر',        icon: '<i class="fas fa-hands-praying"></i>', color: '#FFD54F' },
    protection:  { es: 'Protección',      ar: 'الحماية',      icon: '<i class="fas fa-shield-halved"></i>', color: '#455A64' },
    dhikr:       { es: 'Dhikr general',   ar: 'الذكر',         icon: '<i class="fas fa-circle-nodes"></i>', color: '#0F4C3A' },
    marriage:    { es: 'Matrimonio',      ar: 'الزواج',       icon: '<i class="fas fa-ring"></i>', color: '#EC407A' },
    hajj:        { es: 'Hajj y Umrah',    ar: 'الحج والعمرة', icon: '<i class="fas fa-mosque"></i>', color: '#212121' },
    grief:       { es: 'Duelo',           ar: 'الحزن',         icon: '<i class="fas fa-dove"></i>', color: '#78909C' },
    children:    { es: 'Niños',           ar: 'الأطفال',      icon: '<i class="fas fa-baby"></i>', color: '#FFB74D' },
    business:    { es: 'Provisión',       ar: 'الرزق',        icon: '<i class="fas fa-briefcase"></i>', color: '#8D6E63' },
    night_prayer:{ es: 'Oración nocturna',ar: 'قيام الليل',   icon: '<i class="fas fa-city"></i>', color: '#3949AB' },
    quran_recitation: { es: 'Recitación', ar: 'تلاوة القرآن', icon: '<i class="fas fa-book-open-reader"></i>', color: '#0F4C3A' },

    // v20.1 — Local dataset expansion (v12 duas): 10 new categories
    sickness:        { es: 'Enfermedad y curación',      ar: 'المرض والشفاء',   icon: '<i class="fas fa-notes-medical"></i>', color: '#EF5350' },
    children_family: { es: 'Familia e hijos',            ar: 'الأهل والأولاد',  icon: '<i class="fas fa-children"></i>', color: '#EC407A' },
    rizq_work:       { es: 'Sustento y trabajo',         ar: 'الرزق والعمل',    icon: '<i class="fas fa-briefcase"></i>', color: '#26A69A' },
    marriage:        { es: 'Matrimonio',                 ar: 'الزواج',          icon: '<i class="fas fa-ring"></i>', color: '#F06292' },
    rain_weather:    { es: 'Lluvia y clima',             ar: 'المطر والطقس',    icon: '<i class="fas fa-cloud-rain"></i>', color: '#4FC3F7' },
    oppression:      { es: 'Injusticia y miedo',         ar: 'الظلم والخوف',    icon: '<i class="fas fa-scale-balanced"></i>', color: '#78909C' },
    deceased:        { es: 'Por los difuntos',           ar: 'للميت',           icon: '<i class="fas fa-dove"></i>', color: '#90A4AE' },
    general_quranic: { es: 'Duas coránicas universales', ar: 'أدعية قرآنية جامعة', icon: '<i class="fas fa-book-quran"></i>', color: '#00897B' },
    // Note: `parents` and `knowledge` already exist in the base map above; the v12 dataset uses the same ids so they reuse those definitions.
  },

  async renderHub(container) {
    container.innerHTML = `
      <div class="top-bar">
        <button class="top-bar-btn" onclick="Router.go('wisdom')">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title"><i class="fas fa-hands-praying"></i> ${t('duasTitle') || "Du'as"}</div>
        <div style="width: 30px;"></div>
      </div>

      <div style="padding: var(--sp-md);">
        <p class="duas-intro">${t('duasIntro') || 'Más de 300 súplicas auténticas del Profeta ﷺ en 27 categorías.'}</p>

        <!-- Search bar -->
        <div class="duas-search-bar">
          <i class="fas fa-search"></i>
          <input type="text" id="duas-search-input" placeholder="${t('searchDuas') || 'Buscar súplicas...'}" oninput="DuasPage.onSearchInput(this.value)">
          <button id="duas-clear-search" style="display:none;" onclick="DuasPage.clearSearch()">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Random dua quick button -->
        <button class="duas-random-btn" onclick="DuasPage.showRandom()">
          <i class="fas fa-random"></i> ${t('randomDua') || "Du'a aleatoria"}
        </button>

        <!-- Categories grid -->
        <div id="duas-categories-container">
          ${Skeleton.duasGrid()}
        </div>
      </div>
    `;

    await this.loadCategories();
  },

  async loadCategories() {
    try {
      this.categories = await API.getDuaCategories();
      this.renderCategories();
    } catch (e) {
      const c = document.getElementById('duas-categories-container');
      if (c) c.innerHTML = UIState.error('DuasPage.loadCategories()', t('errorLoading') || '');
    }
  },

  renderCategories() {
    const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
    const container = document.getElementById('duas-categories-container');
    if (!container) return;

    if (this.categories.length === 0) {
      container.innerHTML = `<div class="empty-state"><div class="empty-state-icon"><i class="fas fa-inbox"></i></div><div>${t('noCategories') || 'Sin categorías disponibles'}</div></div>`;
      return;
    }

    container.innerHTML = `
      <div class="duas-cat-grid">
        ${this.categories.map(cat => {
          const meta = this.CAT_TRANSLATIONS[cat.id] || { icon: cat.icon || '<i class="fas fa-hands-praying"></i>', color: cat.color || '#0F4C3A' };
          // FIX v20.1: prefer localized names embedded in the dataset itself (name_es/name_ar).
          // Falls back to the CAT_TRANSLATIONS map, then to English `cat.name`.
          // Guarantees correct display in ALL 3 languages for every category.
          let displayName;
          if (lang === 'ar') displayName = cat.name_ar || meta.ar || cat.name;
          else if (lang === 'es') displayName = cat.name_es || meta.es || cat.name;
          else displayName = cat.name || cat.name_en;
          // Prefer the dataset's own icon/color when the map doesn't override them
          const icon = meta.icon || cat.icon || '<i class="fas fa-hands-praying"></i>';
          const color = meta.color || cat.color || '#0F4C3A';
          return `
            <div class="duas-cat-card" onclick="DuasPage.openCategory('${cat.id}', '${this.escapeAttr(displayName)}')" style="border-left-color: ${color};">
              <div class="duas-cat-icon" style="background: ${color}22; color: ${color};">${icon}</div>
              <div class="duas-cat-info">
                <div class="duas-cat-name">${displayName}</div>
                <div class="duas-cat-meta">${cat.count} ${t('duas') || 'súplicas'}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="duas-credit">
        <i class="fas fa-info-circle"></i>
        ${t('duasCredit') || 'Datos proporcionados por UmmahAPI (sadaqah jariyah).'}
      </div>
    `;
  },

  async openCategory(catId, displayName) {
    const container = document.getElementById('main-content');
    container.innerHTML = `
      <div class="top-bar">
        <button class="top-bar-btn" onclick="Router.go('wisdom/duas')">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title"><i class="fas fa-hands-praying"></i> ${displayName}</div>
        <div style="width: 30px;"></div>
      </div>
      ${Skeleton.duasList()}
    `;

    try {
      const duas = await API.getDuasByCategory(catId);
      this.currentCategory = catId;
      this.currentDuas = duas;
      this.renderDuasList(container, displayName, duas, catId);
    } catch (e) {
      container.innerHTML += `
        <div class="empty-state">
          <div class="empty-state-icon"><i class="fas fa-triangle-exclamation"></i></div>
          <div>${t('errorLoading') || 'Error al cargar.'}</div>
          <button class="btn-primary" onclick="DuasPage.openCategory('${catId}', '${this.escapeAttr(displayName)}')">${t('retry') || 'Reintentar'}</button>
        </div>`;
    }
  },

  renderDuasList(container, title, duas, catId) {
    const meta = this.CAT_TRANSLATIONS[catId] || { color: '#0F4C3A' };
    const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
    // Con el dataset local (Hisnul Muslim) la traducción ya viene localizada
    // (translation_es/ar/en) — NO re-traducir con MyMemory (produciría texto corrupto).
    this._usingLocalDataset = (typeof CONFIG !== 'undefined' && CONFIG.USE_LOCAL_DUAS && typeof LocalDuasService !== 'undefined');

    container.innerHTML = `
      <div class="top-bar" style="background: linear-gradient(135deg, ${meta.color}, ${meta.color}dd);">
        <button class="top-bar-btn" onclick="Router.go('wisdom/duas')">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title" style="color:#fff;"><i class="fas fa-hands-praying"></i> ${escapeHtml(title)}</div>
        <div style="width: 30px;"></div>
      </div>

      <div style="padding: var(--sp-md);">
        ${duas.length === 0 ? `<div class="empty-state"><div class="empty-state-icon"><i class="fas fa-inbox"></i></div><div>${t('noDuas') || 'Sin súplicas en esta categoría'}</div></div>` : duas.map((d, idx) => `
          <div class="dua-card" id="dua-${d.id}">
            <div class="dua-card-header">
              <div class="dua-title">${idx + 1}. ${escapeHtml(d.title)}</div>
              ${d.repeat > 1 ? `<div class="dua-times" style="background:${escapeAttr(meta.color)}22;color:${escapeAttr(meta.color)};">×${d.repeat}</div>` : ''}
            </div>

            <div class="dua-arabic" dir="rtl">${escapeHtml(d.arabic || '')}</div>

            ${d.transliteration ? `<div class="dua-translit"><i class="fas fa-microphone"></i> ${escapeHtml(d.transliteration)}</div>` : ''}

            ${d.translation ? `
              <div class="dua-translation">
                <div class="dua-translation-label">${lang === 'en' ? 'Translation' : (lang === 'ar' ? 'الترجمة' : 'Traducción')}:</div>
                <div class="dua-translation-text">${this.maybeTranslate(d.translation, idx, d.id, lang)}</div>
              </div>
            ` : ''}

            ${d.source ? `<div class="dua-source"><i class="fas fa-book"></i> ${escapeHtml(d.source)}</div>` : ''}

            <div class="dua-actions">
              <button class="dua-action-btn" onclick="DuasPage.copyDua('${this.escapeJs(String(d.id))}')" title="${t('copy') || 'Copiar'}">
                <i class="fas fa-copy"></i>
              </button>
              <button class="dua-action-btn" onclick="DuasPage.shareDua('${this.escapeJs(String(d.id))}')" title="${t('share') || 'Compartir'}">
                <i class="fas fa-share-alt"></i>
              </button>
              <button class="dua-action-btn" onclick="DuasPage.bookmarkDua('${this.escapeJs(String(d.id))}')" id="bookmark-dua-${d.id}" title="${t('bookmark') || 'Marcador'}">
                <i class="${this.isBookmarked(d.id) ? 'fas' : 'far'} fa-bookmark"></i>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Auto-translate translations for non-English locales in background
    // (solo para datos de API en inglés; el dataset local ya está traducido)
    if (!this._usingLocalDataset && lang !== 'en' && duas.length > 0) {
      this.autoTranslateAll(duas, lang);
    }
  },

  // Show translation cell; if not English, fetch translation via MyMemory
  maybeTranslate(englishText, idx, duaId, lang) {
    if (this._usingLocalDataset || lang === 'en' || !englishText) return escapeHtml(englishText || '');
    // Show original first, will be replaced by translation when ready
    return `<span class="dua-trans-pending" id="trans-${duaId}">${englishText}</span>`;
  },

  async autoTranslateAll(duas, lang) {
    if (lang === 'en') return;
    for (const d of duas) {
      if (!d.translation) continue;
      const cacheKey = `dua_trans_${d.id}_${lang}`;
      let translated = Storage.get(cacheKey);
      if (!translated) {
        try {
          translated = await this.translateText(d.translation, 'en', lang);
          if (translated) Storage.set(cacheKey, translated, 30 * 24 * 60 * 60 * 1000);
        } catch (e) {
          continue;
        }
      }
      const el = document.getElementById('trans-' + d.id);
      if (el && translated) {
        el.textContent = translated;
        el.classList.remove('dua-trans-pending');
      }
      // small delay so we don't hammer the API
      await new Promise(r => setTimeout(r, 200));
    }
  },

  async translateText(text, source, target) {
    if (!text || text.length > 480) {
      // Use TafsirService chunking if available
      if (typeof TafsirService !== 'undefined' && TafsirService.translateLongText) {
        return await TafsirService.translateLongText(text, source, target);
      }
    }
    // Single-shot MyMemory
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}&de=app@quba.local`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('translate failed');
    const json = await res.json();
    const out = json?.responseData?.translatedText || '';
    if (out.toUpperCase().includes('MYMEMORY WARNING')) throw new Error('quota');
    return out;
  },

  // === Search ===
  onSearchInput(value) {
    const clearBtn = document.getElementById('duas-clear-search');
    if (clearBtn) clearBtn.style.display = value ? 'inline-block' : 'none';

    clearTimeout(this._searchTimer);
    if (!value || value.length < 2) {
      this.searchResults = null;
      this.renderCategories();
      return;
    }
    this._searchTimer = setTimeout(() => this.performSearch(value), 400);
  },

  async performSearch(query) {
    const container = document.getElementById('duas-categories-container');
    if (container) container.innerHTML = Skeleton.duasGrid();

    const results = await API.searchDuas(query);
    this.searchResults = results;
    this.renderSearchResults(query);
  },

  renderSearchResults(query) {
    const container = document.getElementById('duas-categories-container');
    if (!container) return;
    const results = this.searchResults || [];
    container.innerHTML = `
      <div class="search-results-header">
        <i class="fas fa-search"></i> ${results.length} ${t('resultsFor') || 'resultados para'} "<strong>${this.escapeAttr(query)}</strong>"
      </div>
      ${results.length === 0 ? `<div class="empty-state"><div class="empty-state-icon"><i class="fas fa-magnifying-glass"></i></div><div>${t('noResults') || 'Sin resultados'}</div></div>` : results.map(d => `
        <div class="dua-card" id="dua-${d.id}">
          <div class="dua-card-header">
            <div class="dua-title">${Validate.escapeHTML(d.title)}</div>
            ${d.category ? `<div class="dua-times" style="background:rgba(15,76,58,0.1);color:#0F4C3A;">${d.category}</div>` : ''}
          </div>
          <div class="dua-arabic" dir="rtl">${escapeHtml(d.arabic || '')}</div>
          ${d.transliteration ? `<div class="dua-translit">${d.transliteration}</div>` : ''}
          ${d.translation ? `<div class="dua-translation"><div class="dua-translation-text">${d.translation}</div></div>` : ''}
          ${d.source ? `<div class="dua-source"><i class="fas fa-book"></i> ${escapeHtml(d.source)}</div>` : ''}
        </div>
      `).join('')}
    `;
  },

  clearSearch() {
    const input = document.getElementById('duas-search-input');
    if (input) input.value = '';
    this.searchResults = null;
    document.getElementById('duas-clear-search').style.display = 'none';
    this.renderCategories();
  },

  // === Random dua ===
  async showRandom() {
    showToast((t('loading') || 'Cargando...'), 1000);
    const dua = await API.getRandomDua();
    if (!dua) {
      showToast((t('errorLoading') || 'Error al cargar'), 2000);
      return;
    }
    // Show in modal
    this.renderDuaModal(dua);
  },

  renderDuaModal(d) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay-simple';
    overlay.onclick = e => { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = `
      <div class="modal-simple">
        <div class="modal-simple-header">
          <h3><i class="fas fa-dice"></i> ${t('randomDua') || "Du'a aleatoria"}</h3>
          <button class="modal-close" onclick="this.closest('.modal-overlay-simple').remove()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="dua-card">
          <div class="dua-title">${d.title || ''}</div>
          <div class="dua-arabic" dir="rtl">${escapeHtml(d.arabic || '')}</div>
          ${d.transliteration ? `<div class="dua-translit">${d.transliteration}</div>` : ''}
          ${d.translation ? `<div class="dua-translation"><div class="dua-translation-text">${d.translation}</div></div>` : ''}
          ${d.source ? `<div class="dua-source"><i class="fas fa-book"></i> ${escapeHtml(d.source)}</div>` : ''}
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  },

  // === Actions ===
  // v28 FIX: comparación tolerante a tipos — el dataset local usa ids STRING
  // ('sayyid_istighfar') pero el onclick anterior los inyectaba SIN comillas
  // → el navegador lo interpretaba como variable no definida (ReferenceError)
  // y el botón de copiar no hacía nada. También la API cacheada antigua usaba
  // ids numéricos: ahora se compara siempre como String.
  _findDua(duaId) {
    if (duaId === null || duaId === undefined) return null;
    return this.currentDuas.find(d => String(d.id) === String(duaId)) || null;
  },

  // Reconstruye el texto del dua desde la tarjeta del DOM si existe — así el
  // texto copiado respeta la traducción en segundo plano ya aplicada, en vez
  // de copiar la traducción inglesa original del dataset.
  _buildDuaText(dua, duaId) {
    const card = document.getElementById('dua-' + duaId);
    const grab = (sel) => {
      const el = card ? card.querySelector(sel) : null;
      return el ? el.textContent.trim() : '';
    };
    const title    = grab('.dua-title') || dua.title || '';
    const arabic   = grab('.dua-arabic') || dua.arabic || '';
    const translit = grab('.dua-translit') || dua.transliteration || '';
    const trans    = grab('.dua-translation-text') || dua.translation || '';
    const source   = grab('.dua-source').replace(/^\s*[\u{1F4D8}\u{1F4D6}\u{1F4DA}]?\s*/u, '') || dua.source || '';
    const lines = [title, '', arabic];
    if (translit) lines.push('', translit);
    if (trans) lines.push('', trans);
    if (source) lines.push('', '— ' + source);
    return lines.join('\n');
  },

  // v28: copia robusta — Clipboard API y, si el contexto no la permite (HTTP
  // sin certificado, WebViews antiguas, permiso denegado), fallback con
  // execCommand DENTRO del mismo gesto del usuario.
  async _copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (e) { /* permiso/contexto → fallback */ }
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.left = '0';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    ta.remove();
    return ok;
  },

  async copyDua(duaId) {
    const dua = this._findDua(duaId);
    if (!dua) {
      showToast((t('error') || 'Error'), 1500);
      return;
    }
    try {
      const ok = await this._copyText(this._buildDuaText(dua, dua.id));
      if (ok) {
        showToast((t('copied') || 'Copiado') + ' ✓', 1500);
      } else {
        showToast((t('error') || 'Error'), 1500);
      }
    } catch (e) {
      showToast((t('error') || 'Error'), 1500);
    }
  },

  async shareDua(duaId) {
    const dua = this._findDua(duaId);
    if (!dua) return;
    const text = `${this._buildDuaText(dua, dua.id)}\n\n📱 Quba App`;
    if (navigator.share) {
      try { await navigator.share({ title: dua.title, text }); } catch (e) { /* cancelado por el usuario */ }
    } else {
      await this.copyDua(duaId);
    }
  },

  bookmarkDua(duaId) {
    // v28: marcadores también tolerantes a tipos (string vs número)
    const rawBm = Storage.get('dua_bookmarks');
    let bookmarks = Array.isArray(rawBm) ? rawBm.map(b => String(b)) : [];
    const idx = bookmarks.indexOf(String(duaId));
    const btn = document.getElementById('bookmark-dua-' + duaId);
    if (idx >= 0) {
      bookmarks.splice(idx, 1);
      if (btn) btn.innerHTML = '<i class="far fa-bookmark"></i>';
    } else {
      bookmarks.push(String(duaId));
      if (btn) btn.innerHTML = '<i class="fas fa-bookmark"></i>';
      showToast((t('bookmarked') || 'Guardado'), 1200);
    }
    Storage.set('dua_bookmarks', bookmarks);
  },
  isBookmarked(duaId) {
    const rawBm2 = Storage.get('dua_bookmarks');
    const bookmarks = Array.isArray(rawBm2) ? rawBm2.map(b => String(b)) : [];
    return bookmarks.includes(String(duaId));
  },

  escapeAttr(s) {
    return String(s || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
  },

  // v28: escapa un valor para inyectarlo de forma segura dentro de
  // onclick="DuasPage.xxx('valor')" — comillas, barras y < >.
  escapeJs(s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  },

  cleanup() {
    clearTimeout(this._searchTimer);
  },
};
