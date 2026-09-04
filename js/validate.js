// ✅ Client-side input validation & output encoding helpers (v20)
//
// Espejo ligero de backend/lib/validate.js para validar ANTES de llamar a la
// API y para escapar cualquier dato de red antes de meterlo en innerHTML.
// Regla: todo dato de red (traducciones, nombres de sura, geocoding) debe
// pasar por escapeHTML() antes de interpolarse en templates.

const Validate = {
  /** Escapa HTML para prevenir XSS al usar innerHTML. */
  escapeHTML(s) {
    return String(s ?? '').replace(/[&<>"'`]/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '`': '&#96;',
    }[c]));
  },

  /**
   * Escapa un valor para usarlo DENTRO de un atributo HTML de comillas
   * dobles (p.ej. title="...", value="..."). Idéntico a escapeHTML pero
   * garantiza que " y ' quedan neutralizadas para no romper el atributo.
   */
  escapeAttr(s) {
    return String(s ?? '').replace(/[&<>"'`]/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '`': '&#96;',
    }[c]));
  },

  /**
   * Sanitiza una URL remota (p.ej. audio) antes de incrustarla en un atributo
   * o en un handler inline. Solo permite http(s); cualquier otro esquema
   * (javascript:, data:, etc.) se descarta devolviendo cadena vacía.
   */
  safeUrl(s) {
    const u = String(s ?? '').trim();
    if (/^https?:\/\//i.test(u)) return u.replace(/["'`\\\s]/g, '');
    return '';
  },

  /** Locale de 2 letras (p.ej. 'es', 'ar'). */
  isLang(s) { return typeof s === 'string' && /^[a-z]{2}$/.test(s); },

  /** Número dentro de rango; devuelve null si inválido. */
  numberInRange(v, min, max) {
    const n = Number(v);
    return Number.isFinite(n) && n >= min && n <= max ? n : null;
  },

  /** Latitud/longitud válidas o null. */
  coords(lat, lng) {
    const la = this.numberInRange(lat, -90, 90);
    const lo = this.numberInRange(lng, -180, 180);
    return la !== null && lo !== null ? { lat: la, lng: lo } : null;
  },

  /** String acotada (anti payload gigante) o null. */
  boundedString(s, maxLen = 500) {
    return typeof s === 'string' && s.length > 0 && s.length <= maxLen ? s : null;
  },

  /** JSON.parse seguro: null en vez de throw. */
  safeJSON(text, maxBytes = 1024 * 1024) {
    if (typeof text !== 'string' || text.length > maxBytes) return null;
    try { return JSON.parse(text); } catch { return null; }
  },
};

if (typeof window !== 'undefined') window.Validate = Validate;
