/* =========================================================
   UI helpers — toasts, modals, lightbox, formatting, files
   ========================================================= */
(function () {
  const UI = {};

  /* ---------- Toast ---------- */
  UI.toast = function (msg, kind, ms) {
    const wrap = document.getElementById('toasts');
    if (!wrap) return;
    const el = document.createElement('div');
    el.className = 'toast ' + (kind || '');
    el.textContent = msg;
    wrap.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity .3s, transform .3s';
      el.style.opacity = '0'; el.style.transform = 'translateX(-12px)';
      setTimeout(() => el.remove(), 320);
    }, ms || 3000);
  };
  UI.ok   = (m) => UI.toast(m, '', 2800);
  UI.err  = (m) => UI.toast(m, 'err', 4200);
  UI.warn = (m) => UI.toast(m, 'warn', 3600);
  UI.info = (m) => UI.toast(m, 'info', 3200);

  /* ---------- Escape ---------- */
  UI.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  };

  /* ---------- Modal ---------- */
  UI.modal = function (opts) {
    const root = document.getElementById('modalRoot');
    const box = document.getElementById('modalBox');
    box.className = 'modal-box ' + (opts.size || '');
    box.innerHTML = `
      <div class="modal-head">
        <h3>${UI.esc(opts.title || '')}</h3>
        <button class="icon-btn" data-close aria-label="close">✕</button>
      </div>
      <div class="modal-body">${opts.body || ''}</div>
      ${opts.footer ? `<div class="modal-foot">${opts.footer}</div>` : ''}`;
    root.hidden = false;
    const close = () => { root.hidden = true; box.innerHTML = ''; if (opts.onClose) opts.onClose(); };
    box.querySelectorAll('[data-close]').forEach(b => b.onclick = close);
    root.querySelector('.modal-backdrop').onclick = close;
    if (opts.onMount) opts.onMount(box, close);
    return { box, close };
  };

  UI.confirm = function (opts) {
    return new Promise(resolve => {
      let done = false;
      const m = UI.modal({
        title: opts.title || t('common.deleteTitle'),
        size: 'narrow',
        body: `<p class="confirm-text">${UI.esc(opts.message || t('common.confirmDelete'))}</p>
               ${opts.body2 ? `<p class="muted small">${UI.esc(opts.body2)}</p>` : ''}`,
        footer: `<button class="btn" data-cancel>${UI.esc(opts.cancelText || t('common.cancel'))}</button>
                 <button class="btn ${opts.danger === false ? 'primary' : 'danger'}" data-ok>${UI.esc(opts.okText || t('common.confirm'))}</button>`,
        onClose() { if (!done) resolve(false); },
        onMount(box, close) {
          box.querySelector('[data-ok]').onclick = () => { done = true; close(); resolve(true); };
          box.querySelector('[data-cancel]').onclick = () => { done = true; close(); resolve(false); };
        }
      });
      void m;
    });
  };

  UI.prompt = function (opts) {
    return new Promise(resolve => {
      let done = false;
      UI.modal({
        title: opts.title,
        size: 'narrow',
        body: `<div class="field"><label>${UI.esc(opts.label || '')}</label>
               <input id="uiPromptInput" type="${opts.type || 'text'}" value="${UI.esc(opts.value || '')}" placeholder="${UI.esc(opts.placeholder || '')}"></div>`,
        footer: `<button class="btn" data-cancel>${UI.esc(t('common.cancel'))}</button>
                 <button class="btn primary" data-ok>${UI.esc(opts.okText || t('common.save'))}</button>`,
        onClose() { if (!done) resolve(null); },
        onMount(box, close) {
          const inp = box.querySelector('#uiPromptInput');
          setTimeout(() => inp.focus(), 60);
          const ok = () => { const v = inp.value.trim(); done = true; close(); resolve(v); };
          box.querySelector('[data-ok]').onclick = ok;
          box.querySelector('[data-cancel]').onclick = () => { done = true; close(); resolve(null); };
          inp.addEventListener('keydown', e => { if (e.key === 'Enter') ok(); });
        }
      });
    });
  };

  /* ---------- Lightbox ---------- */
  UI.lightbox = function (src, isPdf) {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `<button class="lb-close">✕</button>` +
      (isPdf ? `<iframe class="lb-frame" src="${src}"></iframe>` : `<img src="${src}" alt="">`);
    lb.querySelector('.lb-close').onclick = () => { lb.remove(); if (src.startsWith('blob:')) URL.revokeObjectURL(src); };
    lb.onclick = (e) => { if (e.target === lb) lb.querySelector('.lb-close').click(); };
    document.body.appendChild(lb);
  };

  /* ---------- Date / age ---------- */
  UI.fmtDate = function (iso, lang) {
    if (!iso) return '—';
    const d = new Date(iso + (iso.length === 10 ? 'T00:00:00' : ''));
    if (isNaN(d)) return iso;
    const l = lang || I18N.lang;
    try {
      return d.toLocaleDateString(l === 'ar' ? 'ar-EG' : 'es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) { return d.toISOString().slice(0, 10); }
  };
  UI.fmtDateTime = function (iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    const l = I18N.lang;
    try {
      return d.toLocaleString(l === 'ar' ? 'ar-EG' : 'es-ES',
        { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) { return d.toISOString(); }
  };
  UI.age = function (dob) {
    if (!dob) return null;
    const b = new Date(dob + 'T00:00:00'); if (isNaN(b)) return null;
    const n = new Date();
    let y = n.getFullYear() - b.getFullYear();
    let m = n.getMonth() - b.getMonth();
    if (n.getDate() < b.getDate()) m -= 1;
    if (m < 0) { y -= 1; m += 12; }
    return { years: y, months: m };
  };
  UI.ageText = function (dob) {
    const a = UI.age(dob); if (!a) return '—';
    return `${a.years} ${t('common.years.old')}${a.months ? ' · ' + a.months + ' ' + t('common.months') : ''}`;
  };
  UI.duration = function (fromIso, toIso) {
    if (!fromIso) return null;
    const a = new Date(fromIso + 'T00:00:00');
    const b = toIso ? new Date(toIso + 'T00:00:00') : new Date();
    if (isNaN(a) || isNaN(b)) return null;
    let y = b.getFullYear() - a.getFullYear();
    let m = b.getMonth() - a.getMonth();
    if (b.getDate() < a.getDate()) m -= 1;
    if (m < 0) { y -= 1; m += 12; }
    if (y < 0) return null;
    return `${y} ${t('common.years')}${m ? ' · ' + m + ' ' + t('common.months') : ''}`;
  };

  /* ---------- Choices / labels ---------- */
  const LABEL_KEYS = {
    level:  { 1: 'level.1', 2: 'level.2', 3: 'level.3', 4: 'level.4', 5: 'level.5' },
    marital:{ single: 'marital.single', married: 'marital.married', divorced: 'marital.divorced', widowed: 'marital.widowed' },
    fin:    { excellent: 'fin.excellent', stable: 'fin.stable', weak: 'fin.weak', urgent: 'fin.urgent' },
    att:    { regular: 'att.regular', medium: 'att.medium', rare: 'att.rare', absent: 'att.absent' },
    gender: { male: 'gender.male', female: 'gender.female' },
    interest:{low:'interest.low',medium:'interest.medium',high:'interest.high',veryhigh:'interest.veryhigh'}
  };
  UI.label = function (group, val) {
    if (val == null || val === '') return '—';
    const map = LABEL_KEYS[group];
    if (!map) return String(val);
    const k = map[val];
    return k ? t(k) : String(val);
  };
  UI.options = function (group) {
    return Object.keys(LABEL_KEYS[group]).map(v => ({ value: v, label: UI.label(group, v) }));
  };

  /* ---------- Badges ---------- */
  UI.finBadge = function (v) {
    if (!v) return '';
    const cls = { excellent: 'b-green', stable: 'b-blue', weak: 'b-amber', urgent: 'b-red' }[v] || 'b-grey';
    return `<span class="badge ${cls}">${UI.esc(UI.label('fin', v))}</span>`;
  };
  UI.attBadge = function (v) {
    if (!v) return '';
    const cls = { regular: 'b-green', medium: 'b-blue', rare: 'b-amber', absent: 'b-red' }[v] || 'b-grey';
    return `<span class="badge ${cls}">${UI.esc(UI.label('att', v))}</span>`;
  };
  UI.levelBadge = function (v) {
    if (!v) return '';
    return `<span class="badge b-gold">📖 ${UI.esc(UI.label('level', v))}</span>`;
  };

  /* ---------- Avatar ---------- */
  UI.initials = function (p) {
    const n = (p.carnetName || p.usedName || p.islamicName || p.name || '?').trim();
    const parts = n.split(/\s+/).filter(Boolean);
    return (parts[0] ? parts[0][0] : '?') + (parts[1] ? parts[1][0] : '');
  };
  UI.avatar = function (p, size) {
    const cls = 'avatar' + (size ? ' ' + size : '');
    if (p && p.photo) return `<img class="${cls}" src="${p.photo}" alt="">`;
    return `<div class="${cls}">${UI.esc(UI.initials(p || {}))}</div>`;
  };
  UI.displayName = function (p) {
    return p.usedName || p.carnetName || p.islamicName || p.name || p.id || '—';
  };

  /* ---------- Files ---------- */
  UI.readFile = function (file, asDataUrl) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = () => reject(fr.error);
      if (asDataUrl) fr.readAsDataURL(file); else fr.readAsArrayBuffer(file);
    });
  };
  UI.blobToDataURL = function (blob) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = () => reject(fr.error);
      fr.readAsDataURL(blob);
    });
  };
  UI.dataURLtoBlob = function (dataUrl) {
    const [head, body] = dataUrl.split(',');
    const mime = (head.match(/:(.*?);/) || [, 'application/octet-stream'])[1];
    const bin = atob(body);
    const u8 = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    return new Blob([u8], { type: mime });
  };

  /* ---------- Misc ---------- */
  UI.todayISO = function () { return new Date().toISOString().slice(0, 10); };
  UI.uid = function (prefix) {
    return (prefix || 'x') + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  };
  UI.debounce = function (fn, ms) {
    let t; return function (...a) { clearTimeout(t); t = setTimeout(() => fn.apply(this, a), ms || 220); };
  };
  UI.download = function (blob, filename) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };
  UI.sum = (arr) => arr.reduce((a, b) => a + b, 0);

  window.UI = UI;
})();
