// 📜 Tafsir service — Improved translation with proper chunking + locale awareness

const TafsirService = {
  TAFSIRS: {
    'ar.muyassar': {
      name_es: 'Al-Muyassar', name_en: 'Al-Muyassar', name_ar: 'التفسير الميسر',
      desc_es: 'Conciso y moderno (recomendado)',
      desc_en: 'Concise and modern (recommended)',
      desc_ar: 'مختصر وحديث (موصى به)',
    },
    'ar.jalalayn': {
      name_es: 'Al-Jalalayn', name_en: 'Al-Jalalayn', name_ar: 'تفسير الجلالين',
      desc_es: 'Clásico, breve', desc_en: 'Classic, brief', desc_ar: 'كلاسيكي مختصر',
    },
    'ar.qurtubi': {
      name_es: 'Al-Qurtubi', name_en: 'Al-Qurtubi', name_ar: 'تفسير القرطبي',
      desc_es: 'Clásico, detallado', desc_en: 'Classic, detailed', desc_ar: 'كلاسيكي مفصل',
    },
    'ar.baghawi': {
      name_es: 'Al-Baghawi', name_en: 'Al-Baghawi', name_ar: 'تفسير البغوي',
      desc_es: 'Clásico tradicional', desc_en: 'Classic traditional', desc_ar: 'كلاسيكي تراثي',
    },
  },

  DEFAULT_TAFSIR: 'ar.muyassar',

  /**
   * Get tafsir for an ayah, with proper full-text translation.
   * Returns { arabic, translated, source, sourceAr, targetLang }
   */
  async getTafsir(surahNum, ayahNum, tafsirId = null, targetLang = 'es') {
    const tafsir = tafsirId || this.DEFAULT_TAFSIR;
    const cacheKey = `tafsir_v2_${surahNum}_${ayahNum}_${tafsir}_${targetLang}`;
    const cached = Storage.get(cacheKey);
    if (cached) return cached;

    // Fetch Arabic tafsir
    const url = `${CONFIG.API.QURAN}/ayah/${surahNum}:${ayahNum}/${tafsir}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Tafsir not found');
    const json = await res.json();
    const arabicText = json.data?.text || '';
    if (!arabicText) throw new Error('Empty tafsir');

    // Translate if target language is not Arabic
    let translatedText = '';
    let translationError = null;
    if (targetLang !== 'ar') {
      try {
        translatedText = await this.translateLongText(arabicText, 'ar', targetLang);
      } catch (e) {
        translationError = e;
        console.warn('Chunked translation failed, trying single-shot fallbacks', e);
        // Try a final single-shot Lingva on the whole text (may work for short tafsirs)
        try {
          if (arabicText.length < 4500) {
            translatedText = await this._lingvaTranslate(arabicText, 'ar', targetLang);
          }
        } catch (e2) {
          try {
            translatedText = await this._libreTranslate(arabicText, 'ar', targetLang);
          } catch (e3) {
            translatedText = '';
          }
        }
      }
    }

    const tafsirInfo = this.TAFSIRS[tafsir] || {};
    const result = {
      arabic: arabicText,
      translated: translatedText,
      source: tafsirInfo[`name_${targetLang === 'ar' ? 'ar' : (targetLang === 'en' ? 'en' : 'es')}`] || tafsirInfo.name_es || tafsir,
      sourceAr: tafsirInfo.name_ar || '',
      targetLang,
    };

    // Only cache successful translations (or arabic-only)
    if (targetLang === 'ar' || translatedText) {
      Storage.set(cacheKey, result, 30 * 24 * 60 * 60 * 1000);
    }
    return result;
  },

  /**
   * Translate long Arabic text by splitting into chunks under 480 chars
   * (MyMemory limit is 500). Properly concatenates results.
   */
  async translateLongText(text, sourceLang = 'ar', targetLang = 'es') {
    if (!text || sourceLang === targetLang) return text;

    const MAX_CHARS = 450;
    if (text.length <= MAX_CHARS) {
      return await this._myMemoryTranslate(text, sourceLang, targetLang);
    }

    // Split by Arabic sentence-ending punctuation (. ! ? ؟ ، ;)
    const chunks = this._splitIntoChunks(text, MAX_CHARS);

    // Translate chunks sequentially to be friendly to free API rate limits.
    // For each chunk, try MyMemory first, then Lingva, then LibreTranslate.
    const translations = [];
    let failedCount = 0;
    for (const chunk of chunks) {
      let translated = null;
      try {
        translated = await this._myMemoryTranslate(chunk, sourceLang, targetLang);
      } catch (e1) {
        try {
          translated = await this._lingvaTranslate(chunk, sourceLang, targetLang);
        } catch (e2) {
          try {
            translated = await this._libreTranslate(chunk, sourceLang, targetLang);
          } catch (e3) {
            // All three failed for this chunk
            failedCount++;
            translated = null;
          }
        }
      }
      // If still null, leave a placeholder marker that the UI can detect
      translations.push(translated || `«…»`);
      await new Promise(r => setTimeout(r, 250));
    }
    const result = translations.join(' ').replace(/\s+/g, ' ').trim();
    // If majority of chunks failed, throw so caller can show error / arabic-only
    if (failedCount > chunks.length / 2) {
      throw new Error('Most translation chunks failed');
    }
    return result;
  },

  /**
   * Lingva Translate (Google Translate proxy, free, no key).
   */
  async _lingvaTranslate(text, source, target) {
    const url = `https://lingva.ml/api/v1/${source}/${target}/${encodeURIComponent(text)}`;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);
    try {
      const res = await fetch(url, { signal: ctrl.signal });
      clearTimeout(timer);
      if (!res.ok) throw new Error('Lingva HTTP ' + res.status);
      const json = await res.json();
      const out = json.translation || '';
      if (!out) throw new Error('Empty Lingva response');
      return out;
    } finally {
      clearTimeout(timer);
    }
  },

  _splitIntoChunks(text, maxLen) {
    const sentences = text.split(/(?<=[\.\!\?؟\،])\s+/);
    const chunks = [];
    let current = '';
    for (const s of sentences) {
      if ((current + ' ' + s).length > maxLen && current) {
        chunks.push(current.trim());
        current = s;
      } else {
        current = current ? current + ' ' + s : s;
      }
    }
    if (current.trim()) chunks.push(current.trim());

    // If a single sentence is still too long, split by words
    const finalChunks = [];
    for (const c of chunks) {
      if (c.length <= maxLen) {
        finalChunks.push(c);
      } else {
        const words = c.split(/\s+/);
        let buf = '';
        for (const w of words) {
          if ((buf + ' ' + w).length > maxLen && buf) {
            finalChunks.push(buf.trim());
            buf = w;
          } else {
            buf = buf ? buf + ' ' + w : w;
          }
        }
        if (buf.trim()) finalChunks.push(buf.trim());
      }
    }
    return finalChunks;
  },

  async _myMemoryTranslate(text, source, target) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}&de=app@quba.local`;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);
    try {
      const res = await fetch(url, { signal: ctrl.signal });
      clearTimeout(timer);
      if (!res.ok) throw new Error('MyMemory HTTP ' + res.status);
      const json = await res.json();
      if (json.responseStatus !== 200 && json.responseStatus !== '200') {
        throw new Error('MyMemory error');
      }
      let translated = json.responseData?.translatedText || '';
      // MyMemory sometimes returns "MYMEMORY WARNING" — strip
      if (translated.toUpperCase().includes('MYMEMORY WARNING')) {
        throw new Error('Quota exceeded');
      }
      return translated;
    } finally {
      clearTimeout(timer);
    }
  },

  /**
   * LibreTranslate fallback (Argos public instance).
   */
  async _libreTranslate(text, source, target) {
    const url = 'https://translate.argosopentech.com/translate';
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, source, target, format: 'text' }),
    });
    if (!res.ok) throw new Error('LibreTranslate failed');
    const json = await res.json();
    return json.translatedText || '';
  },

  /**
   * List of available tafsirs (with locale-aware names).
   */
  getAvailableTafsirs(locale = 'es') {
    return Object.entries(this.TAFSIRS).map(([id, info]) => ({
      id,
      name: info[`name_${locale}`] || info.name_es,
      desc: info[`desc_${locale}`] || info.desc_es,
    }));
  },
};
