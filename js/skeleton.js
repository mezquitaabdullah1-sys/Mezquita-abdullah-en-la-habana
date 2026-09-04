// 🦴 Skeleton loaders + estados de UI (loading / error / success)
// v22: en vez de spinners genéricos, cada pantalla muestra barras grises
// que replican el layout real mientras los datos cargan (estilo YouTube).
const Skeleton = {
  _bar(width, height, extra = '') {
    return `<div class="sk-bar ${extra}" style="width:${width};height:${height}px;"></div>`;
  },

  _card(inner) {
    return `<div class="sk-card">${inner}</div>`;
  },

  // Fila tipo list-row: icono redondo + dos líneas de texto
  _row() {
    return `
      <div class="sk-row">
        <div class="sk-bar sk-circle"></div>
        <div style="flex:1;display:flex;flex-direction:column;gap:8px;">
          ${this._bar('60%', 14)}
          ${this._bar('38%', 11, 'sk-dim')}
        </div>
      </div>
    `;
  },

  // Inicio: header + tarjeta de próxima oración + frase del día + accesos
  home() {
    return `
      <div class="sk-page" aria-busy="true" aria-label="${t('loading')}">
        ${this._bar('45%', 22)}
        ${this._bar('30%', 13, 'sk-dim')}
        ${this._bar('38%', 13, 'sk-dim')}
        <div style="margin:14px 0;">${this._card(`
          ${this._bar('40%', 14)}
          ${this._bar('70%', 34)}
          ${this._bar('55%', 13, 'sk-dim')}
        `)}</div>
        ${this._card(`
          ${this._bar('35%', 13)}
          ${this._bar('85%', 16)}
          ${this._bar('70%', 13, 'sk-dim')}
        `)}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px;">
          ${this._card(this._bar('50%', 14) + this._bar('80%', 12, 'sk-dim'))}
          ${this._card(this._bar('50%', 14) + this._bar('80%', 12, 'sk-dim'))}
        </div>
      </div>
    `;
  },

  // Oración: header + 6 filas de horarios
  prayer() {
    return `
      <div class="sk-page" aria-busy="true" aria-label="${t('loading')}">
        ${this._bar('35%', 22)}
        ${this._bar('45%', 13, 'sk-dim')}
        <div style="margin:14px 0;">${this._card(`${this._bar('50%', 16)}${this._bar('65%', 30)}`)}</div>
        ${this._card(Array.from({ length: 6 }, () => this._row()).join(''))}
      </div>
    `;
  },

  // Tabla mensual de oración: 8 filas
  prayerMonth() {
    return `
      <div class="sk-page" aria-busy="true" aria-label="${t('loading')}">
        ${this._card(Array.from({ length: 8 }, () => this._row()).join(''))}
      </div>
    `;
  },

  // Calendario: cabecera de días + 5 filas de 7 celdas
  calendar() {
    const cells = Array.from({ length: 7 }, () => '<div class="sk-bar sk-cell"></div>').join('');
    const weeks = Array.from({ length: 5 }, () => `<div class="sk-week">${cells}</div>`).join('');
    return `
      <div class="sk-page" aria-busy="true" aria-label="${t('loading')}">
        <div class="sk-week" style="opacity:.6;">${cells}</div>
        ${weeks}
      </div>
    `;
  },

  // Corán — lista de 114 suras
  quranList() {
    return `
      <div class="sk-page" aria-busy="true" aria-label="${t('loading')}">
        ${this._card(Array.from({ length: 9 }, () => this._row()).join(''))}
      </div>
    `;
  },

  // Corán — lector de sura: título + líneas de texto árabe
  quranReader() {
    const ayah = `
      ${this._bar('100%', 22)}
      ${this._bar('92%', 22)}
      ${this._bar('100%', 14, 'sk-dim')}
      <div style="height:14px;"></div>
    `;
    return `
      <div class="sk-page" aria-busy="true" aria-label="${t('loading')}">
        ${this._card(this._bar('55%', 24) + this._bar('40%', 13, 'sk-dim'))}
        ${this._card(ayah.repeat(3))}
      </div>
    `;
  },

  // Tafsir dentro del modal
  tafsir() {
    return `
      <div class="sk-page" style="padding:8px 0;" aria-busy="true" aria-label="${t('loading')}">
        ${this._bar('100%', 15)}
        ${this._bar('96%', 15)}
        ${this._bar('88%', 15)}
        ${this._bar('98%', 15)}
        ${this._bar('70%', 15)}
      </div>
    `;
  },

  // Duas — grid de categorías 2 columnas
  duasGrid() {
    const tile = this._card(`${this._bar('44px', 44, 'sk-circle')}${this._bar('75%', 14)}${this._bar('50%', 11, 'sk-dim')}`);
    return `
      <div class="sk-page" aria-busy="true" aria-label="${t('loading')}">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          ${tile.repeat(6)}
        </div>
      </div>
    `;
  },

  // Duas — lista de una categoría
  duasList() {
    return `
      <div class="sk-page" style="padding:var(--sp-md);" aria-busy="true" aria-label="${t('loading')}">
        ${this._card(`${this._bar('60%', 15)}${this._bar('100%', 20)}${this._bar('88%', 20)}${this._bar('70%', 13, 'sk-dim')}`)}
        ${this._card(`${this._bar('60%', 15)}${this._bar('100%', 20)}${this._bar('88%', 20)}${this._bar('70%', 13, 'sk-dim')}`)}
      </div>
    `;
  },

  // Lista genérica de N filas
  list(rows = 6) {
    return `
      <div class="sk-page" aria-busy="true" aria-label="${t('loading')}">
        ${this._card(Array.from({ length: rows }, () => this._row()).join(''))}
      </div>
    `;
  },
};

// ============ ESTADOS DE UI: error / éxito / vacío ============
// Todos incluyen botón de reintento opcional y soportan los 3 idiomas.
const UIState = {
  _labels() {
    const lang = (typeof currentLocale !== 'undefined' ? currentLocale : 'es');
    return {
      errorTitle:  t('error') || { es: 'Error', ar: 'خطأ', en: 'Error' }[lang],
      errorDesc:   { es: 'No se pudieron cargar los datos. Verifica tu conexión e inténtalo de nuevo.',
                     ar: 'تعذّر تحميل البيانات. تحقق من اتصالك وحاول مجدداً.',
                     en: 'Could not load the data. Check your connection and try again.' }[lang],
      offlineDesc: { es: 'Estás sin conexión. Mostrando lo disponible localmente.',
                     ar: 'أنت غير متصل. نعرض ما هو متاح محلياً.',
                     en: 'You are offline. Showing what is available locally.' }[lang],
      retry:       t('retry') || { es: 'Reintentar', ar: 'إعادة المحاولة', en: 'Retry' }[lang],
    };
  },

  // Estado de ERROR con reintento. `retryAction` = string JS inline (onclick).
  error(retryAction = '', desc = '') {
    const L = this._labels();
    const offline = (typeof navigator !== 'undefined' && !navigator.onLine);
    return `
      <div class="empty-state ui-state ui-state-error" role="alert">
        <div class="empty-state-icon"><i class="fas fa-${offline ? 'wifi-slash' : 'triangle-exclamation'}"></i></div>
        <div class="empty-state-text" style="font-weight:600;">${L.errorTitle}</div>
        <div class="empty-state-text">${escapeHtml(desc || (offline ? L.offlineDesc : L.errorDesc))}</div>
        ${retryAction ? `<button class="btn-primary empty-state-btn" onclick="${retryAction}">${L.retry}</button>` : ''}
      </div>
    `;
  },

  // Estado de ÉXITO transitorio (check + mensaje). Útil tras guardar/completar.
  success(message) {
    return `
      <div class="empty-state ui-state ui-state-success" role="status">
        <div class="empty-state-icon" style="color:#1A6B52;"><i class="fas fa-circle-check"></i></div>
        <div class="empty-state-text" style="font-weight:600;">${escapeHtml(message)}</div>
      </div>
    `;
  },

  // Estado VACÍO (sin datos, sin error)
  empty(icon = 'inbox', message = '') {
    return `
      <div class="empty-state ui-state">
        <div class="empty-state-icon"><i class="fas fa-${icon}"></i></div>
        <div class="empty-state-text">${escapeHtml(message)}</div>
      </div>
    `;
  },
};
