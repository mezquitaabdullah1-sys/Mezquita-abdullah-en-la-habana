// 🔦 Wake Lock — mantiene la pantalla encendida durante recitación o Adhan
// Uso: await WakeLockService.acquire(); ... WakeLockService.release();
const WakeLockService = {
  _lock: null,
  _refCount: 0,

  async acquire(reason = 'recitation') {
    if (!('wakeLock' in navigator)) return false;
    this._refCount++;
    if (this._lock) return true;
    try {
      this._lock = await navigator.wakeLock.request('screen');
      this._lock.addEventListener('release', () => { this._lock = null; });
      console.log('🔦 WakeLock acquired for:', reason);
      // Re-adquirir cuando la pestaña vuelve a estar visible
      document.addEventListener('visibilitychange', this._onVisibilityChange);
      return true;
    } catch (e) {
      console.warn('WakeLock failed:', e.message);
      this._refCount = Math.max(0, this._refCount - 1);
      return false;
    }
  },

  release() {
    this._refCount = Math.max(0, this._refCount - 1);
    if (this._refCount > 0) return;
    if (this._lock) {
      try { this._lock.release(); } catch(_) {}
      this._lock = null;
    }
    document.removeEventListener('visibilitychange', this._onVisibilityChange);
  },

  _onVisibilityChange: async function() {
    if (document.visibilityState === 'visible' && WakeLockService._refCount > 0 && !WakeLockService._lock) {
      try {
        WakeLockService._lock = await navigator.wakeLock.request('screen');
      } catch(_) {}
    }
  },
};
