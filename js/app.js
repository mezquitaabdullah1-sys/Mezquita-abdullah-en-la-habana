// 🚀 Inicialización principal de la app

// ============ TEMA ============
function applyTheme() {
  const mode = AppState.settings.theme;
  if (mode === 'auto') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light';
  } else {
    document.documentElement.dataset.theme = mode;
  }

  // Cambiar theme-color
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.content = document.documentElement.dataset.theme === 'dark' ? '#0D1829' : '#0F4C3A';
  }
}

// Detectar cambios en el tema del sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (AppState.settings.theme === 'auto') applyTheme();
});

// ============ TOAST ============
let toastTimer = null;
function showToast(message, duration = 2500) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove('hidden');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), duration);
}

// ============ MODAL ============
function showModal(title, options, currentValue, onSelect) {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  content.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">${title}</div>
      <button class="modal-close" onclick="closeModal()">×</button>
    </div>
    <div class="modal-options">
      ${options.map(opt => `
        <div class="modal-option ${opt.id === currentValue ? 'selected' : ''}"
             data-value="${opt.id}">
          ${opt.label}
        </div>
      `).join('')}
    </div>
  `;

  content.querySelectorAll('.modal-option').forEach(el => {
    el.addEventListener('click', () => {
      const value = el.dataset.value;
      const num = parseInt(value, 10);
      onSelect(isNaN(num) || String(num) !== value ? value : num);
      closeModal();
    });
  });

  overlay.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

document.getElementById('modal-overlay').addEventListener('click', (e) => {
  if (e.target.id === 'modal-overlay') closeModal();
});

// ============ INIT ============
async function initApp() {
  // 1) Cargar settings y aplicar idioma + tema
  Storage.loadSettings();

  // Sincronizar locale
  if (AppState.settings.locale && AppState.settings.locale !== currentLocale) {
    setLocale(AppState.settings.locale);
  } else {
    AppState.settings.locale = currentLocale;
    Storage.saveSettings();
  }

  applyTheme();
  applyTranslations();

  // Aplicar lang/dir tempranamente al <html>
  try {
    document.documentElement.lang = AppState.settings.locale || 'es';
    document.documentElement.dir = (AppState.settings.locale === 'ar') ? 'rtl' : 'ltr';
  } catch(e) {}

  // 2) Ocultar splash INMEDIATAMENTE cuando initApp termine (mín 400ms para evitar flash)
  const splashStart = Date.now();
  const hideSplash = () => {
    const elapsed = Date.now() - splashStart;
    // v14: hide splash as soon as init finishes (min 300ms to avoid flash)
    const wait = Math.max(0, 300 - elapsed);
    setTimeout(() => {
      const splash = document.getElementById('splash');
      const app = document.getElementById('app');
      if (splash) splash.classList.add('hidden');
      if (app) app.classList.remove('hidden');
    }, wait);
  };

  // 3) Init Router (parsea hash inicial y setea popstate)
  if (typeof Router.init === 'function') Router.init();

  // 4) Ir a Home si no hay ruta inicial en hash
  if (!location.hash || location.hash === '#' || location.hash === '#/') {
    await Router.go('home');
  }

  hideSplash();

  // 5) v21: si hay conexión, empezar a preparar el TEXTO del Corán para uso
  // sin conexión en segundo plano (ligero, no bloquea ni interrumpe).
  // v27: el AUDIO ya no se descarga automáticamente (es pesado) — se pide
  // permiso al usuario en la pantalla del Corán y se gestiona por sura.
  if (typeof QuranOfflineService !== 'undefined') {
    QuranOfflineService.maybeAutoDownload();
  }

  // 6) v23: descargar automáticamente el tafsir del idioma actual desde el CDN
  // (spa5k/tafsir_api vía jsDelivr) — antes se empaquetaba dentro del APK y
  // pesaba ~82 MB; ahora se guarda en IndexedDB tras la primera lectura y
  // queda disponible sin conexión para siempre. Sin botones, sin diálogos.
  if (typeof TafsirService !== 'undefined') TafsirService.maybeAutoDownload(AppState.settings.locale);

  // 7) v24: reprogramar el adhan y los recordatorios al abrir la app
  // (los temporizadores mueren al cerrar la pestaña — hay que recrearlos;
  // antes solo se programaban al abrir la pantalla de oración, así que el
  // adhan no sonaba automáticamente)
  if (typeof PrayerNotifications !== 'undefined' &&
      (PrayerNotifications.isEnabled() || PrayerNotifications.isReminderEnabled())) {
    PrayerNotifications._refreshForNewDay(AppState.settings.locale || 'es');
  }
}

// v21: avisos discretos de cambio de conectividad (afecta a toda la app,
// no solo a la pantalla actual — por eso vive en el arranque global)
window.addEventListener('offline', () => {
  if (typeof showToast === 'function') showToast('📴 ' + (t('offlineNowMsg') || ''), 3000);
});
window.addEventListener('online', () => {
  if (typeof showToast === 'function') showToast('📶 ' + (t('backOnlineMsg') || ''), 2000);
  if (typeof QuranOfflineService !== 'undefined') {
    QuranOfflineService.maybeAutoDownload(); // v27: solo texto; el audio requiere permiso
  }
  // v23: al recuperar red, reanudar la descarga del tafsir donde se quedó
  if (typeof TafsirService !== 'undefined') TafsirService.maybeAutoDownload(AppState.settings.locale);
});

// Lanzar al cargar el DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// popstate ahora manejado por Router.init() con historial nativo
