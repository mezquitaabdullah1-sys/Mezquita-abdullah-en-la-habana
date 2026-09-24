/* =========================================================
   Wizard — 8-step add/edit Muslim form with validation + drafts
   ========================================================= */
(function () {
  const STEPS = 8;
  let state = { step: 1, person: null, editing: false, convert: false, files: {} };

  function el(id) { return document.getElementById(id); }
  function fieldId(n) { return 'wz' + n; }

  function defPerson() {
    return {
      id: '', type: 'muslim', carnetName: '', usedName: '', islamicName: '', kunya: '', carnet: '',
      dob: '', gender: '', phone: '', address: '', photo: '',
      islamDate: '', islamStory: '', islamCert: '',
      marital: '', spouseName: '', spouseCarnet: '', marriageDate: '', children: '', marriageContract: '',
      level: '', knowledge: '',
      hasHealth: 'no', healthDesc: '', healthNotes: '',
      finStatus: '', finDesc: '', aidType: '', finUpdated: '',
      attStatus: '', prayers: '', lastAttendance: '',
      createdAt: '', updatedAt: ''
    };
  }

  function input(name, labelKey, opts) {
    opts = opts || {};
    const val = state.person[name] != null ? state.person[name] : '';
    const req = opts.req ? ' <span class="req">*</span>' : '';
    let inner;
    if (opts.type === 'select') {
      inner = `<select id="${fieldId(name)}" data-name="${name}">
        <option value="">${t('common.select')}</option>
        ${opts.options.map(o => `<option value="${o.value}" ${String(val) === String(o.value) ? 'selected' : ''}>${UI.esc(o.label)}</option>`).join('')}
      </select>`;
    } else if (opts.type === 'textarea') {
      inner = `<textarea id="${fieldId(name)}" data-name="${name}" placeholder="${UI.esc(opts.ph || '')}">${UI.esc(val)}</textarea>`;
    } else if (opts.type === 'date') {
      inner = `<input type="date" id="${fieldId(name)}" data-name="${name}" value="${UI.esc(val)}">`;
    } else if (opts.type === 'number') {
      inner = `<input type="number" min="0" id="${fieldId(name)}" data-name="${name}" value="${UI.esc(val)}">`;
    } else {
      inner = `<input type="${opts.type || 'text'}" id="${fieldId(name)}" data-name="${name}" value="${UI.esc(val)}" placeholder="${UI.esc(opts.ph || '')}">`;
    }
    return `<div class="field ${opts.span ? 'span2' : ''} ${req ? 'req-field' : ''}" data-field="${name}">
      <label for="${fieldId(name)}">${t(labelKey)}${req}</label>${inner}
      <span class="errmsg">${t('common.required')}</span>
      ${opts.hint ? `<span class="hint">${UI.esc(opts.hint)}</span>` : ''}
    </div>`;
  }

  function choices(name, group, labelKey) {
    const val = state.person[name];
    return `<div class="field span2" data-field="${name}">
      <label>${t(labelKey)} <span class="req">*</span></label>
      <div class="choices" data-choices="${name}">
        ${UI.options(group).map((o, i) => `<button type="button" class="choice ${String(val) === String(o.value) ? 'on' : ''}"
          data-value="${o.value}">${group === 'level' ? `<span class="num">${i + 1}</span>` : ''}
          <span class="ct">${UI.esc(o.label)}</span></button>`).join('')}
      </div>
      <span class="errmsg">${t('common.required')}</span>
    </div>`;
  }

  function fileField(name, labelKey, accept, hint) {
    const cur = state.person[name];
    return `<div class="field span2">
      <label>${t(labelKey)} <span class="muted small">(${t('common.optional')})</span></label>
      <input type="file" id="${fieldId(name)}" data-file="${name}" accept="${accept}">
      <span class="hint">${UI.esc(hint || '')}</span>
      <div id="${fieldId(name)}Prev" style="margin-top:.5rem">
        ${cur ? `<div class="doc-item" style="max-width:170px"><img src="${UI.esc(cur)}" alt=""><div class="dn">${t(labelKey)}</div></div>` : ''}
      </div>
    </div>`;
  }

  function stepHTML(n) {
    const p = state.person;
    switch (n) {
      case 1:
        return `<div class="step-title"><span class="si">🧑</span><h3>${t('step.1')}</h3></div>
          <div class="calc-box" style="margin-bottom:1rem">🆔 <b>${UI.esc(state.person.id || '—')}</b> · ${t('f.autoId')}</div>
          <div class="form-grid">
            ${input('carnetName', 'f.carnetName', { req: true })}
            ${input('usedName', 'f.usedName')}
            ${input('islamicName', 'f.islamicName')}
            ${input('kunya', 'f.kunya')}
            ${input('carnet', 'f.carnet', { req: true })}
            ${input('dob', 'f.dob', { type: 'date' })}
            <div class="field" data-field="ageBox"><label>${t('f.age')}</label>
              <div class="calc-box" id="${fieldId('ageBox')}">${p.dob ? UI.ageText(p.dob) : '—'}</div></div>
            ${input('gender', 'f.gender', { type: 'select', options: UI.options('gender') })}
            ${input('phone', 'f.phone')}
            ${input('address', 'f.address', { span: true })}
            ${fileField('photo', 'f.photo', 'image/*', t('common.optional'))}
          </div>`;
      case 2:
        return `<div class="step-title"><span class="si">🕋</span><h3>${t('step.2')}</h3></div>
          <div class="form-grid">
            ${input('islamDate', 'f.islamDate', { type: 'date' })}
            ${input('islamStory', 'f.islamStory', { type: 'textarea', span: true })}
            ${fileField('islamCert', 'f.islamCert', 'image/*,application/pdf')}
          </div>`;
      case 3: {
        const married = p.marital === 'married';
        return `<div class="step-title"><span class="si">💍</span><h3>${t('step.3')}</h3></div>
          ${choices('marital', 'marital', 'f.marital')}
          <div class="form-grid" id="maritalExtra" style="margin-top:1rem;${married ? '' : 'display:none'}">
            ${input('spouseName', 'f.spouseName')}
            ${input('spouseCarnet', 'f.spouseCarnet')}
            ${input('marriageDate', 'f.marriageDate', { type: 'date' })}
            <div class="field" data-field="durBox"><label>${t('f.marriageDuration')}</label>
              <div class="calc-box">${p.marriageDate ? (UI.duration(p.marriageDate) || '—') : '—'}</div></div>
            ${input('children', 'f.children', { type: 'number' })}
            ${fileField('marriageContract', 'f.marriageContract', 'image/*,application/pdf')}
          </div>`;
      }
      case 4:
        return `<div class="step-title"><span class="si">📖</span><h3>${t('step.4')}</h3></div>
          ${choices('level', 'level', 'f.level')}
          <div class="form-grid" style="margin-top:1rem">
            ${input('knowledge', 'f.knowledge', { type: 'textarea', span: true, ph: 'القرآن، الصلاة، العقيدة...' })}
          </div>`;
      case 5:
        return `<div class="step-title"><span class="si">🩺</span><h3>${t('step.5')}</h3></div>
          <div class="field" data-field="hasHealth"><label>${t('f.hasHealth')}</label>
            <div class="choices" data-choices="hasHealth" style="grid-template-columns:repeat(2,minmax(0,1fr));max-width:340px">
              <button type="button" class="choice ${p.hasHealth === 'yes' ? 'on' : ''}" data-value="yes"><span class="ct">${t('common.yes')}</span></button>
              <button type="button" class="choice ${p.hasHealth !== 'yes' ? 'on' : ''}" data-value="no"><span class="ct">${t('common.no')}</span></button>
            </div></div>
          <div class="form-grid" id="healthExtra" style="margin-top:1rem;${p.hasHealth === 'yes' ? '' : 'display:none'}">
            ${input('healthDesc', 'f.healthDesc', { type: 'textarea', span: true })}
            ${input('healthNotes', 'f.healthNotes', { type: 'textarea', span: true })}
          </div>`;
      case 6:
        return `<div class="step-title"><span class="si">💰</span><h3>${t('step.6')}</h3></div>
          ${choices('finStatus', 'fin', 'f.finStatus')}
          <div class="form-grid" style="margin-top:1rem">
            ${input('finDesc', 'f.finDesc', { type: 'textarea', span: true })}
            ${input('aidType', 'f.aidType')}
            ${input('finUpdated', 'f.finUpdated', { type: 'date' })}
          </div>`;
      case 7:
        return `<div class="step-title"><span class="si">🕌</span><h3>${t('step.7')}</h3></div>
          ${choices('attStatus', 'att', 'f.attStatus')}
          <div class="form-grid" style="margin-top:1rem">
            ${input('prayers', 'f.prayers', { type: 'textarea', span: true })}
            ${input('lastAttendance', 'f.lastAttendance', { type: 'date' })}
          </div>`;
      case 8:
        return `<div class="step-title"><span class="si">📁</span><h3>${t('step.8')}</h3></div>
          <p class="muted small">${t('f.docTypes')}</p>
          <div class="field span2">
            <input type="file" id="wzDocs" multiple accept="image/*,application/pdf">
          </div>
          <div class="docs-grid" id="wzDocsPreview"></div>
          <div class="form-grid" style="margin-top:1rem">
            ${input('noteText', 'f.notes', { type: 'textarea', span: true })}
          </div>`;
      default: return '';
    }
  }

  function collect() {
    document.querySelectorAll('#wzBody [data-name]').forEach(inp => {
      state.person[inp.dataset.name] = inp.value;
    });
    // numbers stay strings; convert children
    if (state.person.children !== '' && state.person.children != null) state.person.children = Number(state.person.children);
  }

  function validateStep(n) {
    const body = el('wzBody');
    let ok = true;
    const need = {
      1: ['carnetName', 'carnet'],
      3: ['marital'],
      4: ['level'],
      6: ['finStatus'],
      7: ['attStatus']
    }[n] || [];
    need.forEach(name => {
      const f = body.querySelector(`[data-field="${name}"]`);
      if (!f) return;
      const val = state.person[name];
      const bad = !val || String(val).trim() === '';
      f.classList.toggle('invalid', bad);
      const inp = f.querySelector('input,select,textarea');
      if (inp) inp.classList.toggle('err', bad);
      if (bad) ok = false;
    });
    return ok;
  }

  async function checkDupeCarnet() {
    const list = await DB.all('persons');
    const carnet = (state.person.carnet || '').trim().toLowerCase();
    if (!carnet) return false;
    return list.some(p => p.id !== state.person.id && (p.carnet || '').trim().toLowerCase() === carnet);
  }

  function renderSteps() {
    el('wzSteps').innerHTML = Array.from({ length: STEPS }, (_, i) => {
      const n = i + 1;
      const cls = n < state.step ? 'done' : (n === state.step ? 'active' : '');
      return `<li class="${cls}">${n}. ${t('step.' + n)}</li>`;
    }).join('');
    el('wzDots').innerHTML = Array.from({ length: STEPS }, (_, i) =>
      `<i class="${i + 1 === state.step ? 'on' : ''}"></i>`).join('');
    el('wzProgress').style.width = (state.step / STEPS * 100) + '%';
    el('wzStepLabel').textContent = t('wizard.stepOf', { n: state.step });
    el('wzId').textContent = state.person.id || 'MA-…';
    el('wzTitle').textContent = state.editing ? t('wizard.edit') : t('wizard.new');
    el('wzPrev').disabled = state.step === 1;
    el('wzNext').textContent = state.step === STEPS ? t('wizard.finish') : t('common.next');
    el('wzNext').classList.toggle('gold', state.step === STEPS);
  }

  function renderStep() {
    collect();
    const body = el('wzBody');
    body.innerHTML = state.step === STEPS && state.showSummary ? summaryHTML() : stepHTML(state.step);
    body.scrollTop = 0;
    bindStep();
  }

  function bindStep() {
    const body = el('wzBody');
    body.querySelectorAll('[data-choices]').forEach(g => {
      g.querySelectorAll('.choice').forEach(c => c.onclick = () => {
        const name = g.dataset.choices;
        g.querySelectorAll('.choice').forEach(x => x.classList.remove('on'));
        c.classList.add('on');
        state.person[name] = c.dataset.value;
        g.closest('[data-field]') && g.closest('[data-field]').classList.remove('invalid');
        if (name === 'marital') {
          const ex = body.querySelector('#maritalExtra');
          if (ex) ex.style.display = c.dataset.value === 'married' ? '' : 'none';
        }
        if (name === 'hasHealth') {
          const ex = body.querySelector('#healthExtra');
          if (ex) ex.style.display = c.dataset.value === 'yes' ? '' : 'none';
        }
      });
    });
    body.querySelectorAll('[data-file]').forEach(inp => {
      inp.onchange = async (e) => {
        const file = e.target.files[0]; if (!file) return;
        if (file.size > 8 * 1048576) { UI.err(t('toast.photoTooBig')); return; }
        const durl = await UI.readFile(file, true);
        state.person[inp.dataset.file] = durl;
        const prev = body.querySelector('#' + inp.id + 'Prev');
        if (prev) prev.innerHTML = `<div class="doc-item" style="max-width:170px"><img src="${durl}" alt=""><div class="dn">${file.name}</div></div>`;
      };
    });
    const dob = body.querySelector(`[data-name="dob"]`);
    if (dob) dob.onchange = () => {
      state.person.dob = dob.value;
      const box = body.querySelector(`#${fieldId('ageBox')}`);
      if (box) box.textContent = dob.value ? UI.ageText(dob.value) : '—';
    };
    const md = body.querySelector(`[data-name="marriageDate"]`);
    if (md) md.onchange = () => {
      state.person.marriageDate = md.value;
      const box = md.closest('.form-grid') && md.closest('.form-grid').querySelector('[data-field="durBox"] .calc-box');
      if (box) box.textContent = md.value ? (UI.duration(md.value) || '—') : '—';
    };
    const docs = body.querySelector('#wzDocs');
    if (docs) docs.onchange = (e) => {
      const files = Array.from(e.target.files);
      state.files.docs = (state.files.docs || []).concat(files);
      const prev = body.querySelector('#wzDocsPreview');
      prev.innerHTML = (state.files.docs || []).map((f, i) =>
        `<div class="doc-item"><div class="pdfph">${f.type.indexOf('pdf') !== -1 ? '📄' : '🖼'}</div>
         <div class="dn">${UI.esc(f.name)}</div>
         <button class="del" data-rmdoc="${i}">✕</button></div>`).join('');
      prev.querySelectorAll('[data-rmdoc]').forEach(b => b.onclick = () => {
        state.files.docs.splice(Number(b.dataset.rmdoc), 1); docs.dispatchEvent(new Event('change'));
      });
    };
  }

  function summaryHTML() {
    const p = state.person;
    const L = (g, v) => UI.label(g, v);
    const card = (title, icon, rows) => `<div class="sum-card"><h4>${icon} ${t(title)}</h4>
      ${rows.map(r => `<div class="sum-row"><span>${UI.esc(r[0])}</span><span>${UI.esc(r[1] == null || r[1] === '' ? '—' : r[1])}</span></div>`).join('')}</div>`;
    return `<div class="step-title"><span class="si">✅</span><h3>${t('wizard.summary')}</h3></div>
      <div class="summary-list">
        ${card('step.1', '🧑', [[t('f.carnetName'), p.carnetName], [t('f.usedName'), p.usedName], [t('f.islamicName'), p.islamicName],
          [t('f.kunya'), p.kunya], [t('f.carnet'), p.carnet], [t('f.dob'), p.dob ? UI.fmtDate(p.dob) : ''],
          [t('f.age'), p.dob ? UI.ageText(p.dob) : ''], [t('f.gender'), L('gender', p.gender)], [t('f.phone'), p.phone], [t('f.address'), p.address]])}
        ${card('step.2', '🕋', [[t('f.islamDate'), p.islamDate ? UI.fmtDate(p.islamDate) : ''], [t('f.islamStory'), p.islamStory]])}
        ${card('step.3', '💍', [[t('f.marital'), L('marital', p.marital)], [t('f.spouseName'), p.spouseName],
          [t('f.marriageDate'), p.marriageDate ? UI.fmtDate(p.marriageDate) : ''], [t('f.children'), p.children]])}
        ${card('step.4', '📖', [[t('f.level'), L('level', p.level)], [t('f.knowledge'), p.knowledge]])}
        ${card('step.5', '🩺', [[t('f.hasHealth'), p.hasHealth === 'yes' ? t('common.yes') : t('common.no')],
          [t('f.healthDesc'), p.healthDesc], [t('f.healthNotes'), p.healthNotes]])}
        ${card('step.6', '💰', [[t('f.finStatus'), L('fin', p.finStatus)], [t('f.finDesc'), p.finDesc], [t('f.aidType'), p.aidType]])}
        ${card('step.7', '🕌', [[t('f.attStatus'), L('att', p.attStatus)], [t('f.prayers'), p.prayers],
          [t('f.lastAttendance'), p.lastAttendance ? UI.fmtDate(p.lastAttendance) : '']])}
        ${card('step.8', '📁', [[t('tab.docs'), String((state.files.docs || []).length)], [t('f.notes'), p.noteText]])}
      </div>`;
  }

  /* ---------- open / close ---------- */
  function open(person, opts) {
    opts = opts || {};
    state.editing = !!person;
    state.convert = !!opts.convert;
    state.step = opts.fromDraft && person.step ? person.step : 1;
    state.showSummary = false;
    state.files = {};
    const base = defPerson();
    state.person = person ? Object.assign(base, person) : base;
    if (!state.person.id && !state.editing) state.person.id = '';
    if (!state.person.finUpdated) state.person.finUpdated = UI.todayISO();
    el('wizardRoot').hidden = false;
    document.body.style.overflow = 'hidden';
    renderSteps(); renderStep();
  }
  function close() {
    el('wizardRoot').hidden = true;
    document.body.style.overflow = '';
    state = { step: 1, person: null, editing: false, convert: false, files: {} };
  }

  async function next() {
    collect();
    if (!validateStep(state.step)) { UI.err(t('wizard.incomplete')); return; }
    if (state.step === 1) {
      if (await checkDupeCarnet()) { UI.err(t('toast.dupeCarnet')); return; }
    }
    if (state.step === STEPS && !state.showSummary) {
      state.showSummary = true; renderStep(); return;
    }
    if (state.step === STEPS) { await save(); return; }
    state.step++; renderSteps(); renderStep();
  }
  function prev() {
    collect();
    if (state.step === STEPS && state.showSummary) { state.showSummary = false; renderStep(); return; }
    if (state.step > 1) { state.step--; renderSteps(); renderStep(); }
  }

  async function persistFiles(personId) {
    if (!state.person.id) { /* handled by save */ }
  }

  async function save() {
    collect();
    if (await checkDupeCarnet()) { UI.err(t('toast.dupeCarnet')); return; }
    const p = state.person;
    const now = new Date().toISOString();
    if (!p.id) { p.id = await DB.nextId('MA', 'personCounter'); p.createdAt = now; }
    else if (!p.createdAt) p.createdAt = now;
    p.updatedAt = now;
    p.type = 'muslim';
    p.demo = false;
    if (p.finStatus === 'urgent') p.needy = true;
    delete p.noteText;
    await DB.put('persons', p);

    // documents uploaded in step 8
    for (const f of (state.files.docs || [])) {
      const durl = await UI.readFile(f, true);
      await DB.put('documents', { docId: UI.uid('d'), personId: p.id, name: f.name, type: f.type, data: durl, addedAt: now });
    }
    // note from step 8
    const noteText = p.noteText;
    if (noteText && noteText.trim()) {
      await DB.put('notes', { noteId: UI.uid('n'), personId: p.id, text: noteText.trim(),
        author: await DB.getMeta('imamName') || 'الإمام', at: now });
    }
    // conversion: remove from non-muslim list
    if (state.convert && p.convertFromId) {
      await DB.del('persons', p.convertFromId);
      delete p.convertFromId;
      await DB.put('persons', p);
    }
    await DB.setMeta('wizardDraft', null);
    UI.ok(t('common.saved'));
    close();
    App.go('profile', { id: p.id });
  }

  async function saveDraft() {
    collect();
    state.person.step = state.step;
    state.person.draft = true;
    await DB.setMeta('wizardDraft', { person: state.person, files: (state.files.docs || []).map(f => f.name), at: new Date().toISOString() });
    UI.ok(t('wizard.draftSaved'));
  }

  const Wizard = {
    open, close, next, prev, save, saveDraft
  };
  window.Wizard = Wizard;

  document.addEventListener('DOMContentLoaded', () => {
    el('wzNext').onclick = next;
    el('wzPrev').onclick = prev;
    el('wzDraft').onclick = saveDraft;
    el('wzClose').onclick = async () => {
      if (await UI.confirm({ message: t('common.confirmDelete'), body2: '', danger: false, okText: t('common.confirm'), cancelText: t('common.cancel') })) close();
    };
  });
})();
