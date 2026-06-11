// 📖 Quran helpers: tashkeel removal, surah names normalization, search

const QuranHelpers = {
  /**
   * Remove Arabic diacritics (tashkeel/harakat) for easier search.
   * النَّاسِ → الناس
   * بِسْمِ → بسم
   */
  removeTashkeel(text) {
    if (!text) return '';
    return text
      // Remove harakat: fatha, kasra, damma, sukun, shadda, tanween, hamza variations
      .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
      // Normalize alef variants
      .replace(/[\u0622\u0623\u0625]/g, '\u0627') // آ أ إ → ا
      .replace(/\u0671/g, '\u0627') // ٱ → ا
      // Normalize yaa
      .replace(/\u0649/g, '\u064A') // ى → ي
      // Normalize taa marbouta
      .replace(/\u0629/g, '\u0647') // ة → ه (for search only)
      .trim();
  },

  /**
   * Normalize Arabic text for fuzzy search comparison.
   */
  normalizeForSearch(text) {
    return this.removeTashkeel(text || '').toLowerCase().replace(/\s+/g, ' ').trim();
  },

  /**
   * Check if a surah name (with or without tashkeel) matches a search query.
   */
  surahMatches(surah, query) {
    if (!query) return true;
    const q = this.normalizeForSearch(query);
    if (!q) return true;

    // Number match
    if (String(surah.number).startsWith(q)) return true;

    // Match against english name (case insensitive)
    if (surah.englishName?.toLowerCase().includes(q.toLowerCase())) return true;
    if (surah.englishNameTranslation?.toLowerCase().includes(q.toLowerCase())) return true;

    // Match against Arabic name (with tashkeel removed)
    const arabicNormalized = this.normalizeForSearch(surah.name);
    if (arabicNormalized.includes(q)) return true;

    return false;
  },

  /**
   * Strip Bismillah from the first ayah of a surah (all surahs except Al-Fatihah & At-Tawbah).
   * Used to avoid duplication when Bismillah is displayed at the top of the page.
   */
  stripBismillahFromFirstAyah(text) {
    if (!text) return text;
    // Common Bismillah patterns (with/without tashkeel, with/without variant chars)
    const patterns = [
      /^بِسْمِ\s*ٱللَّهِ\s*ٱلرَّحْمَـٰنِ\s*ٱلرَّحِيمِ\s*/,
      /^بِسْمِ\s*ٱللَّهِ\s*ٱلرَّحْمَٰنِ\s*ٱلرَّحِيمِ\s*/,
      /^بِسْمِ\s*اللَّهِ\s*الرَّحْمَٰنِ\s*الرَّحِيمِ\s*/,
      /^بِسْمِ\s*اللَّهِ\s*الرَّحْمَنِ\s*الرَّحِيمِ\s*/,
      /^بسم\s*الله\s*الرحمن\s*الرحيم\s*/,
    ];
    let result = text;
    for (const pat of patterns) {
      if (pat.test(result)) {
        result = result.replace(pat, '');
        break;
      }
    }
    return result.trim();
  },

  /**
   * Check if surah should display standalone Bismillah at top
   * (all surahs except Al-Fatihah (1) where it's part of the surah,
   *  and At-Tawbah (9) which has no Bismillah)
   */
  shouldShowBismillah(surahNumber) {
    return surahNumber !== 1 && surahNumber !== 9;
  },
};
