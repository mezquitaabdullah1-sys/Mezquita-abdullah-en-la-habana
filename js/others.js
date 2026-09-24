/* =========================================================
   Non-Muslims — list + simple one-page form
   ========================================================= */
(function () {
  const Views = window.Views = window.Views || {};

  function match(p, q) {
    if (!q) return true;
    q = q.trim().toLowerCase(); if (!q) return true;
    return [p.carnetName, p.usedName, p.carnet, p.id, p.phone, p.how, p.notes]
      .filter(Boolean).join(' ').toLowerCase().indexOf(q) !== -1;
  }

  function cardHTML(p) {
    return `<article class="pcard" data-id="${UI.esc(p.id)}">
      ${UI.avatar(p)}
      <div class="pcard-main">
        <div class="pcard-id">${UI.esc(p.id)}${p.demo ? ' · تجريبي' : ''}</div>
        <div class="pcard-name">${UI.esc(UI.displayName(p))}</div>
        <div class="pcard-line">
          ${p.interest ? `<span class="badge b-blue">${UI.esc(UI.label('interest', p.interest))}</span>` : ''}
          ${p.carnet ? `<span class="badge b-grey">${UI.esc(p.carnet)}</span>` : ''}
        </div>
      </div>
    </article>`;
  }

  Views.nonmuslims = async function (root) {
    const all = (await DB.all('persons')).filter(p => p.type === 'nonmuslim');
    const filtered = all.filter(p => match(p, App.q))
      .sort((a, b) => UI.displayName(a).localeCompare(UI.displayName(b), I18N.lang === 'ar' ? 'ar' : 'es'));

    root.innerHTML = `
      <div class="page-head">
        <div class="page-title"><span class="pi">🤝</span>
          <div><h2 data-i18n="nm.title"></h2><div class="page-sub" data-i18n="nm.sub"></div></div></div>
        <button class="btn gold lg" id="addNM">➕ <span data-i18n="nm.add"></span></button>
      </div>
      <div class="page-sub" id="nmCount"></div>
      <div id="nmWrap" style="margin-top:1rem"></div>`;

    const wrap = root.querySelector('#nmWrap');
    if (!filtered.length) {
      wrap.innerHTML = `<div class="empty"><div class="eico">🤝</div><h3>${t('common.emptyList')}</h3><p>${t('common.emptyHint')}</p></div>`;
    } else {
      wrap.innerHTML = `<div class="grid cards">${filtered.map(cardHTML).join('')}</div>`;
      wrap.querySelectorAll('.pcard').forEach(c => c.onclick = () => App.go('profile', { id: c.dataset.id }));
    }
    root.querySelector('#nmCount').textContent = `${filtered.length} ${t('common.results')} ${t('common.of')} ${all.length}`;
    root.querySelector('#addNM').onclick = () => Views.nonMuslimForm(null);
  };

  Views.nonMuslimForm = function (person) {
    const p = person || {};
    const opts = UI.options('interest');
    const body = `
      <div class="form-grid">
        <div class="field"><label>${t('f.carnetName')} <span class="req">*</span></label>
          <input id="nmName" value="${UI.esc(p.carnetName || '')}"><span class="errmsg">${t('common.required')}</span></div>
        <div class="field"><label>${t('f.phone')}</label><input id="nmPhone" value="${UI.esc(p.phone || '')}"></div>
        <div class="field"><label>${t('f.carnet')}</label><input id="nmCarnet" value="${UI.esc(p.carnet || '')}"></div>
        <div class="field"><label>${t('nm.interest')}</label>
          <select id="nmInterest"><option value="">${t('common.select')}</option>
          ${opts.map(o => `<option value="${o.value}" ${p.interest === o.value ? 'selected' : ''}>${UI.esc(o.label)}</option>`).join('')}</select></div>
        <div class="field span2"><label>${t('nm.how')}</label><textarea id="nmHow">${UI.esc(p.how || '')}</textarea></div>
        <div class="field span2"><label>${t('nm.courses')}</label><textarea id="nmCourses">${UI.esc(p.courses || '')}</textarea></div>
        <div class="field span2"><label>${t('nm.notes')}</label><textarea id="nmNotes">${UI.esc(p.notes || '')}</textarea></div>
      </div>`;
    UI.modal({
      title: person ? t('common.edit') : t('nm.add'),
      size: 'wide',
      body,
      footer: `<button class="btn" data-close>${t('common.cancel')}</button>
               <button class="btn primary" id="nmSave">${t('common.save')}</button>`,
      onMount(box, close) {
        box.querySelector('#nmSave').onclick = async () => {
          const nameEl = box.querySelector('#nmName');
          if (!nameEl.value.trim()) { nameEl.classList.add('err'); nameEl.closest('.field').classList.add('invalid'); return; }
          const obj = person || { id: '', type: 'nonmuslim', createdAt: '' };
          obj.carnetName = box.querySelector('#nmName').value.trim();
          obj.usedName = obj.usedName || '';
          obj.phone = box.querySelector('#nmPhone').value.trim();
          obj.carnet = box.querySelector('#nmCarnet').value.trim();
          obj.interest = box.querySelector('#nmInterest').value;
          obj.how = box.querySelector('#nmHow').value.trim();
          obj.courses = box.querySelector('#nmCourses').value.trim();
          obj.notes = box.querySelector('#nmNotes').value.trim();
          obj.type = 'nonmuslim';
          const now = new Date().toISOString();
          if (!obj.id) { obj.id = await DB.nextId('NM', 'nonmuslimCounter'); obj.createdAt = now; }
          obj.updatedAt = now;
          await DB.put('persons', obj);
          UI.ok(t('common.saved'));
          close();
          App.render();
        };
      }
    });
  };
})();
