// 🔍 Quran Smart Search — búsqueda de aleyas sin tashkeel ni signos
//
// Funciona como las apps de Corán (آية وغيرها): escribes la palabra o frase
// como quieras — sin harakat, con alef/hamza/ي/ى/ة como sea — y encuentra
// TODAS las aleyas que la contienen en TODO el Corán. Al pulsar un resultado
// se abre la sura directamente en esa aleya (resaltada).
//
// Datos: QURAN_TEXT_INDEX (data/quran_search_index.js) — texto Uthmani
// completo [sura, aleya, texto], precargado en memoria y normalizado una
// sola vez. Búsqueda 100% local y offline, instantánea.
const QuranSearch = {
  _norm: null, // índice normalizado en memoria: [{s, a, n}]

  // Normalización agresiva para comparación:
  // - quita harakat/tanwin/shadda/sukun y marcas coránicas
  // - آ أ إ ٱ → ا · ى → ي · ة → ه · ؤ ئ → ء
  _normalize(text) {
    if (!text) return '';
    return String(text)
      .replace(/[ً-ْٰـۖ-ۭ]/g, '')
      .replace(/[آأإٱ]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ة/g, 'ه')
      .replace(/[ؤئ]/g, 'ء')
      .replace(/[^\u0600-\u06FF\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  },

  _buildIndex() {
    if (this._norm) return this._norm;
    const src = (typeof QURAN_TEXT_INDEX !== 'undefined') ? QURAN_TEXT_INDEX : [];
    this._norm = src.map(row => ({ s: row[0], a: row[1], n: this._normalize(row[2]) }));
    return this._norm;
  },

  /**
   * Busca en todo el Corán. Devuelve [{s, a, text}] (máx. maxResults).
   * - q: palabra o frase (con o sin tashkeel)
   * - wordMode=false: búsqueda de subcadena (عليم encuentra العليم، عليم، تعليم...)
   */
  search(q, maxResults = 100) {
    const nq = this._normalize(q);
    if (!nq || nq.length < 2) return [];
    const idx = this._buildIndex();
    const tokens = nq.split(' ').filter(Boolean);
    const out = [];
    for (const row of idx) {
      // Frase completa o todos los términos presentes en la aleya
      const ok = tokens.length === 1
        ? row.n.includes(tokens[0])
        : (row.n.includes(nq) || tokens.every(tok => row.n.includes(tok)));
      if (ok) {
        out.push({ s: row.s, a: row.a, text: this._original(row.s, row.a) });
        if (out.length >= maxResults) break;
      }
    }
    return out;
  },

  // Texto original (con tashkeel) de una aleya del índice
  _original(surah, ayah) {
    // Índice secuencial: posición = suma de aleyas previas + ayah - 1
    const pos = this._pos(surah, ayah);
    return (typeof QURAN_TEXT_INDEX !== 'undefined' && QURAN_TEXT_INDEX[pos]) ? QURAN_TEXT_INDEX[pos][2] : '';
  },

  _pos(surah, ayah) {
    if (typeof QURAN_SURAH_TABLE === 'undefined') return 0;
    let start = 0;
    for (const row of QURAN_SURAH_TABLE) {
      if (row[0] === surah) return start + ayah - 1;
      start += row[4];
    }
    return ayah - 1;
  },

  /**
   * Resalta las coincidencias en el texto original: envuelve en <mark>
   * las palabras cuya forma normalizada contiene algún término buscado.
   */
  highlight(originalText, query) {
    const tokens = this._normalize(query).split(' ').filter(tk => tk.length >= 2);
    if (!tokens.length) return Validate.escapeHTML(originalText);
    return originalText.split(/\s+/).map(word => {
      const nw = this._normalize(word);
      const hit = tokens.some(tk => nw.includes(tk));
      return hit
        ? `<mark class="qs-mark">${Validate.escapeHTML(word)}</mark>`
        : Validate.escapeHTML(word);
    }).join(' ');
  },
};

if (typeof window !== 'undefined') window.QuranSearch = QuranSearch;
