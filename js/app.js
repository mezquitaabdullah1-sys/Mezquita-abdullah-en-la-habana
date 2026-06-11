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

  // 2) Mostrar app después del splash
  setTimeout(() => {
    document.getElementById('splash').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
  }, 1800);

  // 3) Ir a Home
  Router.go('home');
}

// Lanzar al cargar el DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Manejar botón "atrás" del navegador / móvil
window.addEventListener('popstate', () => {
  Router.back();
});
