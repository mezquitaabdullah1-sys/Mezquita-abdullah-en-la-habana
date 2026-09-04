// 🎯 Event Delegation — reemplazo progresivo de onclick inline
// Uso en templates: <button data-action="navigate" data-route="wisdom/quiz">
// Los onclick inline existentes siguen funcionando; esto es una capa adicional.
const EventBus = {
  _handlers: new Map(),

  /**
   * Registra un manejador para un action ID.
   * @param {string} action - ej: 'navigate', 'copy-dua', 'toggle-adhan'
   * @param {(el: HTMLElement, event: Event) => void} handler
   */
  on(action, handler) {
    this._handlers.set(action, handler);
  },

  init() {
    document.addEventListener('click', (e) => {
      const el = e.target.closest('[data-action]');
      if (!el) return;
      const action = el.dataset.action;
      const handler = this._handlers.get(action);
      if (handler) {
        handler(el, e);
      }
    });

    // Enter/Space en elementos con role="button" o data-action
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const el = e.target.closest('[data-action]');
      if (!el) return;
      // Solo si no es un button nativo o input (que ya lo manejan)
      const tag = el.tagName.toLowerCase();
      if (tag === 'button' || tag === 'input' || tag === 'a') return;
      e.preventDefault();
      const handler = this._handlers.get(el.dataset.action);
      if (handler) handler(el, e);
    });
  },
};

// Handlers estándar
document.addEventListener('DOMContentLoaded', () => {
  EventBus.init();

  // navigate: <button data-action="navigate" data-route="wisdom/quiz">
  EventBus.on('navigate', (el) => {
    const route = el.dataset.route;
    if (route && typeof Router !== 'undefined') {
      const params = {};
      // Copia data-* attrs (excepto action y route) como params
      for (const k in el.dataset) {
        if (k !== 'action' && k !== 'route') params[k] = el.dataset[k];
      }
      Router.go(route, params);
    }
  });

  // back: <button data-action="back">
  EventBus.on('back', () => {
    if (typeof Router !== 'undefined') Router.back();
  });

  // toast: <button data-action="toast" data-message="Hola">
  EventBus.on('toast', (el) => {
    if (typeof showToast === 'function') showToast(el.dataset.message || '');
  });
});
