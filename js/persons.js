/* =========================================================
   Persons — Muslims list + profile page
   ========================================================= */
(function () {
  const Views = window.Views = window.Views || {};
  let sortMode = 'name';

  function match(p, q) {
    if (!q) return true;
    q = q.trim().toLowerCase();
    if (!q) return true;
    const hay = [p.carnetName, p.usedName, p.islamicName, p.kunya, p.carnet, p.id, p.phone, p.address]
      .filter(Boolean).join(' ').toLowerCase();
    return hay.indexOf(q) !== -1;
  }
  function passFilters(p, f) {
    f = f || {};
    if (f.level && String(p.level) !== String(f.level)) return false;
    if (f.marital && p.marital !== f.marital) return false;
    if (f.fin && p.finStatus !== f.fin) return false;
    if (f.att && p.attStatus !== f.att) return false;
    if (f.needy && p.finStatus !== 'urgent') return false;
    return true;
  }
  function sortList(list) {
    return list.sort((a, b) => {
      if (sortMode === 'recent') return (b.createdAt || '').localeCompare(a.createdAt || '');
      if (sortMode === 'updated') return (b.updatedAt || '').localeCompare(a.updatedAt || '');
      return UI.displayName(a).localeCompare(UI.displayName(b), I18N.lang === 'ar' ? 'ar' : 'es');
    });
  }
  Views.listMuslims = async function () {
    const all = await DB.all('persons');
    return all.filter(p => p.type === 'muslim');
  };

  function cardHTML(p) {
    const needy = p.finStatus === 'urgent';
    return `<article class="pcard ${needy ? 'needy' : ''}" data-id="${UI.esc(p.id)}">
      ${UI.avatar(p)}
      <div class="pcard-main">
        <div class="pcard-id">${UI.esc(p.id)}${p.demo ? ' · تجريبي' : ''}</div>
        <div class="pcard-name">${UI.esc(UI.displayName(p))}</div>
        <div class="pcard-line">
          ${UI.levelBadge(p.level)}
          ${UI.finBadge(p.finStatus)}
          ${UI.attBadge(p.attStatus)}
        </div>
      </div>
    </article>`;
  }

  Views.muslims = async function (root) {
    const list = await Views.listMuslims();
    const f = App.filters || {};
    const filtered = sortList(list.filter(p => match(p, App.q) && passFilters(p, f)));

    root.innerHTML = `
      <div class="page-head">
        <div class="page-title">
          <span class="pi">👥</span>
          <div><h2 data-i18n="muslims.title"></h2><div class="page-sub" data-i18n="muslims.sub"></div></div>
        </div>
        <button class="btn gold lg" id="addMuslim">➕ <span data-i18n="muslims.add"></span></button>
      </div>

      <div class="panel">
        <div class="filters" style="margin-top:0">
          <select id="fLevel"><option value="" data-i18n="f.level"></option></select>
          <select id="fMarital"><option value="" data-i18n="f.marital"></option></select>
          <select id="fFin"><option value="" data-i18n="f.fin"></option></select>
          <select id="fAtt"><option value="" data-i18n="f.att"></option></select>
          <label class="chk" id="needyChk"><input type="checkbox" id="fNeedy"><span data-i18n="muslims.needyOnly"></span></label>
          <select id="fSort">
            <option value="name" data-i18n="sort.name"></option>
            <option value="recent" data-i18n="sort.recent"></option>
            <option value="updated" data-i18n="sort.updated"></option>
          </select>
        </div>
        <div class="page-sub" style="margin-top:.8rem" id="resCount"></div>
      </div>

      <div id="cardsWrap" style="margin-top:1rem"></div>`;

    // fill selects
    const fill = (sel, group, current) => {
      group.forEach(o => {
        const op = document.createElement('option');
        op.value = o.value; op.textContent = o.label;
        sel.appendChild(op);
      });
      if (current) sel.value = current;
    };
    fill(root.querySelector('#fLevel'), UI.options('level'), f.level);
    fill(root.querySelector('#fMarital'), UI.options('marital'), f.marital);
    fill(root.querySelector('#fFin'), UI.options('fin'), f.fin);
    fill(root.querySelector('#fAtt'), UI.options('att'), f.att);
    root.querySelector('#fSort').value = sortMode;
    const needy = root.querySelector('#fNeedy');
    needy.checked = !!f.needy;
    root.querySelector('#needyChk').classList.toggle('on', !!f.needy);

    const draw = () => {
      const wrap = root.querySelector('#cardsWrap');
      if (!filtered.length) {
        wrap.innerHTML = `<div class="empty"><div class="eico">🕌</div><h3 data-i18n="common.emptyList"></h3>
          <p data-i18n="common.emptyHint"></p></div>`;
        I18N.apply(wrap);
      } else {
        wrap.innerHTML = `<div class="grid cards">${filtered.map(cardHTML).join('')}</div>`;
      }
      const cnt = root.querySelector('#resCount');
      cnt.textContent = `${filtered.length} ${t('common.results')} ${t('common.of')} ${list.length}`;
      wrap.querySelectorAll('.pcard').forEach(c => c.onclick = () => App.go('profile', { id: c.dataset.id }));
    };

    root.querySelector('#addMuslim').onclick = () => Wizard.open(null);
    root.querySelector('#fLevel').onchange = e => { App.filters.level = e.target.value; App.render(); };
    root.querySelector('#fMarital').onchange = e => { App.filters.marital = e.target.value; App.render(); };
    root.querySelector('#fFin').onchange = e => { App.filters.fin = e.target.value; App.render(); };
    root.querySelector('#fAtt').onchange = e => { App.filters.att = e.target.value; App.render(); };
    root.querySelector('#fSort').onchange = e => { sortMode = e.target.value; App.render(); };
    needy.onchange = e => { App.filters.needy = e.target.checked; App.render(); };

    draw();

    // draft banner
    const draft = await DB.getMeta('wizardDraft');
    if (draft && draft.person) {
      const b = document.createElement('div');
      b.className = 'banner';
      b.style.marginTop = '1rem';
      b.innerHTML = `<span>📝</span><div style="flex:1"><b>${t('draft.resume')}</b>
        <div class="muted small">${UI.esc(UI.displayName(draft.person))}</div></div>
        <button class="btn sm primary" id="resumeDraft">${t('draft.resumeBtn')}</button>
        <button class="btn sm" id="discardDraft">${t('draft.discardBtn')}</button>`;
      root.insertBefore(b, root.children[1]);
      b.querySelector('#resumeDraft').onclick = () => Wizard.open(draft.person, { fromDraft: true });
      b.querySelector('#discardDraft').onclick = async () => { await DB.setMeta('wizardDraft', null); App.render(); };
    }
  };

  /* ================= PROFILE ================= */
  let activeTab = 'personal';

  function info(k, v) {
    return `<div class="info-item"><div class="k">${UI.esc(k)}</div><div class="v">${v == null || v === '' ? '—' : UI.esc(v)}</div></div>`;
  }
  function infoRaw(k, html) {
    return `<div class="info-item"><div class="k">${UI.esc(k)}</div><div class="v">${html}</div></div>`;
  }

  Views.profile = async function (root) {
    const p = await DB.get('persons', App.params.id);
    if (!p) { root.innerHTML = `<div class="empty"><h3>${t('profile.notFound')}</h3></div>`; return; }
    const docs = await DB.byIndex('documents', 'personId', p.id);
    const notes = (await DB.byIndex('notes', 'personId', p.id)).sort((a, b) => (b.at || '').localeCompare(a.at || ''));
    const courses = await Views.coursesForPerson(p.id);

    const tabs = ['personal', 'islam', 'social', 'education', 'health', 'financial', 'attendance', 'docs', 'notes'];
    const isNM = p.type === 'nonmuslim';

    root.innerHTML = `
      <button class="btn ghost sm" id="backBtn" style="margin-bottom:.8rem">↩ <span data-i18n="common.back"></span></button>
      <div class="profile-head">
        ${UI.avatar(p, 'lg')}
        <div>
          <h2>${UI.esc(UI.displayName(p))}</h2>
          <div class="pmeta"><b>${UI.esc(p.id)}</b> · ${UI.esc(p.carnetName || '')}${p.kunya ? ' · ' + UI.esc(p.kunya) : ''}</div>
          <div class="pcard-line" style="margin-top:.5rem">
            ${isNM ? `<span class="badge b-blue">${t('nav.nonmuslims')}</span>` : ''}
            ${UI.levelBadge(p.level)} ${UI.finBadge(p.finStatus)} ${UI.attBadge(p.attStatus)}
            ${p.finStatus === 'urgent' ? `<span class="badge b-red">⚠ ${t('fin.urgent')}</span>` : ''}
          </div>
        </div>
        <div class="profile-actions">
          ${isNM ? `<button class="btn gold" id="convertBtn">🔁 <span data-i18n="nm.convert"></span></button>` : ''}
          <button class="btn" id="editBtn">✏️ <span data-i18n="common.edit"></span></button>
          <button class="btn danger" id="delBtn">🗑 <span data-i18n="common.delete"></span></button>
          <button class="btn" id="printBtn">🖨 <span data-i18n="common.print"></span></button>
        </div>
      </div>
      <div class="tabs" id="tabs" style="margin-top:1rem">
        ${tabs.map(x => `<button class="tab ${x === activeTab ? 'active' : ''}" data-tab="${x}">${t('tab.' + x)}</button>`).join('')}
      </div>
      <div id="tabBody" class="panel"></div>`;

    root.querySelector('#backBtn').onclick = () => App.go(isNM ? 'nonmuslims' : 'muslims');
    root.querySelector('#editBtn').onclick = () => {
      if (isNM) Views.nonMuslimForm(p); else Wizard.open(p);
    };
    root.querySelector('#delBtn').onclick = async () => {
      if (await UI.confirm({ message: t('common.confirmDelete'), body2: t('common.confirmDeleteBody') })) {
        await Views.deletePerson(p.id);
        UI.ok(t('common.deleted'));
        App.go(isNM ? 'nonmuslims' : 'muslims');
      }
    };
    root.querySelector('#printBtn').onclick = () => Views.printProfile(p, docs, notes, courses);
    const cb = root.querySelector('#convertBtn');
    if (cb) cb.onclick = async () => {
      if (await UI.confirm({ message: t('nm.convertConfirm'), danger: false, okText: t('common.confirm') })) {
        Wizard.open({
          carnetName: p.carnetName || '', usedName: p.usedName || '', carnet: p.carnet || '',
          phone: p.phone || '', convertFromId: p.id, islamStory: p.notes || ''
        }, { convert: true });
      }
    };
    root.querySelectorAll('.tab').forEach(tb => tb.onclick = () => { activeTab = tb.dataset.tab; App.render(); });

    const body = root.querySelector('#tabBody');
    const L = (g, v) => UI.label(g, v);
    let html = '';
    switch (activeTab) {
      case 'personal':
        html = `<div class="info-grid">
          ${info(t('f.carnetName'), p.carnetName)}${info(t('f.usedName'), p.usedName)}
          ${info(t('f.islamicName'), p.islamicName)}${info(t('f.kunya'), p.kunya)}
          ${info(t('f.carnet'), p.carnet)}${info(t('f.dob'), p.dob ? UI.fmtDate(p.dob) : '')}
          ${info(t('f.age'), p.dob ? UI.ageText(p.dob) : '')}${info(t('f.gender'), L('gender', p.gender))}
          ${info(t('f.phone'), p.phone)}${info(t('f.address'), p.address)}
          ${infoRaw(t('common.added'), UI.esc(UI.fmtDateTime(p.createdAt)))}
          ${p.marked ? info(t('nm.convertedFrom'), '×') : ''}
        </div>`;
        break;
      case 'islam':
        html = `<div class="info-grid">
          ${info(t('f.islamDate'), p.islamDate ? UI.fmtDate(p.islamDate) : '')}
          ${info(t('f.level'), L('level', p.level))}
        </div>
        <div class="field" style="margin-top:1rem"><label>${t('f.islamStory')}</label>
          <div class="info-item"><div class="v">${UI.esc(p.islamStory || '—')}</div></div></div>
        ${p.islamCert ? `<div style="margin-top:1rem"><div class="k muted">${t('f.islamCert')}</div>
          <div class="doc-item" data-src="${UI.esc(p.islamCert)}" style="max-width:200px;margin-top:.4rem">
            ${p.islamCert.startsWith('data:application/pdf') ? '<div class="pdfph">📄</div>' : `<img src="${UI.esc(p.islamCert)}">`}
            <div class="dn">${t('f.islamCert')}</div></div></div>` : ''}`;
        break;
      case 'social':
        html = `<div class="info-grid">
          ${info(t('f.marital'), L('marital', p.marital))}
          ${p.marital === 'married' ? info(t('f.spouseName'), p.spouseName) : ''}
          ${p.marital === 'married' ? info(t('f.spouseCarnet'), p.spouseCarnet) : ''}
          ${p.marital === 'married' ? info(t('f.marriageDate'), p.marriageDate ? UI.fmtDate(p.marriageDate) : '') : ''}
          ${p.marital === 'married' ? info(t('f.marriageDuration'), p.marriageDate ? UI.duration(p.marriageDate) : '') : ''}
          ${info(t('f.children'), p.children != null && p.children !== '' ? p.children : '')}
        </div>`;
        break;
      case 'education':
        html = `<div class="info-grid">${info(t('f.level'), L('level', p.level))}</div>
          <div class="field" style="margin-top:1rem"><label>${t('f.knowledge')}</label>
          <div class="info-item"><div class="v">${UI.esc(p.knowledge || '—')}</div></div></div>`;
        break;
      case 'health':
        html = `<div class="info-grid">
          ${info(t('f.hasHealth'), p.hasHealth === 'yes' ? t('common.yes') : t('common.no'))}
          ${p.hasHealth === 'yes' ? info(t('f.healthDesc'), p.healthDesc) : ''}
        </div>
        ${p.hasHealth === 'yes' ? `<div class="field" style="margin-top:1rem"><label>${t('f.healthNotes')}</label>
          <div class="info-item"><div class="v">${UI.esc(p.healthNotes || '—')}</div></div></div>` : ''}`;
        break;
      case 'financial':
        html = `<div class="info-grid">
          ${infoRaw(t('f.finStatus'), UI.finBadge(p.finStatus) || '—')}
          ${info(t('f.finUpdated'), p.finUpdated ? UI.fmtDate(p.finUpdated) : '')}
          ${info(t('f.aidType'), p.aidType)}
        </div>
        <div class="field" style="margin-top:1rem"><label>${t('f.finDesc')}</label>
        <div class="info-item"><div class="v">${UI.esc(p.finDesc || '—')}</div></div></div>`;
        break;
      case 'attendance': {
        let chtml;
        if (courses.length) {
          chtml = courses.map(function (c) {
            const pct = c.pct == null ? null : Math.round(c.pct);
            const cls = pct == null ? '' : (pct < 60 ? 'low' : pct < 80 ? 'mid' : 'high');
            const lbl = pct == null ? '—' : pct + '%';
            return '<div class="att-row"><span class="an">' + UI.esc(c.name) + '</span>' +
                   '<span class="pct ' + cls + '">' + lbl + '</span></div>';
          }).join('');
        } else {
          chtml = '<p class="muted">' + t('courses.noParticipants') + '</p>';
        }
        html = `<div class="info-grid">
          ${infoRaw(t('f.attStatus'), UI.attBadge(p.attStatus) || '—')}
          ${info(t('f.lastAttendance'), p.lastAttendance ? UI.fmtDate(p.lastAttendance) : '')}
        </div>
        <div class="field" style="margin-top:1rem"><label>${t('f.prayers')}</label>
        <div class="info-item"><div class="v">${UI.esc(p.prayers || '—')}</div></div></div>
        <h3 style="margin-top:1.2rem">${t('courses.forCourse')}</h3>
        ${chtml}`;
        break;
      }
      case 'docs':
        html = `<div class="panel-head"><h3>${t('tab.docs')} (${docs.length})</h3>
          <button class="btn primary sm" id="addDocBtn">➕ ${t('common.upload')}</button></div>
          <input type="file" id="docFile" accept="image/*,application/pdf" style="display:none">
          <div class="docs-grid" id="docsGrid">
            ${docs.length ? docs.map(d => docItemHTML(d, true)).join('') :
              `<div class="empty" style="grid-column:1/-1"><div class="eico">📄</div><p>${t('common.noData')}</p></div>`}
          </div>`;
        break;
      case 'notes':
        html = `<div class="field"><label>${t('f.addNote')}</label>
          <textarea id="newNote" placeholder="${t('profile.addQuickNote')}"></textarea></div>
          <button class="btn primary sm" id="addNoteBtn">➕ ${t('f.addNote')}</button>
          <div class="timeline" id="notesTL" style="margin-top:1rem">
            ${notes.length ? notes.map(n => `<div class="tl-item">${UI.esc(n.text)}
              <div class="tl-meta">${UI.fmtDateTime(n.at)} · ${t('note.by')} ${UI.esc(n.author || 'الإمام')}
              <button class="btn sm danger-ghost" data-delnote="${UI.esc(n.noteId)}" style="padding:.1rem .4rem;margin-inline-start:.4rem">✕</button></div></div>`).join('')
              : `<p class="muted">${t('common.noData')}</p>`}
          </div>`;
        break;
    }
    body.innerHTML = html;

    if (activeTab === 'docs') {
      body.querySelector('#addDocBtn').onclick = () => body.querySelector('#docFile').click();
      body.querySelector('#docFile').onchange = async e => {
        const file = e.target.files[0]; if (!file) return;
        if (file.size > 15 * 1048576) { UI.err(t('toast.fileTooBig')); return; }
        const durl = await UI.readFile(file, true);
        const d = await UI.prompt({ title: t('f.docLabel'), label: t('f.docLabel'), value: file.name.replace(/\.[^.]+$/, '') });
        if (d === null) return;
        await DB.put('documents', { docId: UI.uid('d'), personId: p.id, name: d || file.name, type: file.type,
          data: durl, addedAt: new Date().toISOString() });
        UI.ok(t('toast.docAdded')); App.render();
      };
      bindDocs(body);
    }
    if (activeTab === 'notes') {
      body.querySelector('#addNoteBtn').onclick = async () => {
        const ta = body.querySelector('#newNote');
        const txt = ta.value.trim(); if (!txt) return;
        await DB.put('notes', { noteId: UI.uid('n'), personId: p.id, text: txt, author: await DB.getMeta('imamName') || 'الإمام', at: new Date().toISOString() });
        UI.ok(t('toast.noteAdded')); App.render();
      };
      body.querySelectorAll('[data-delnote]').forEach(b => b.onclick = async () => {
        if (await UI.confirm({ message: t('common.confirmDelete') })) { await DB.del('notes', b.dataset.delnote); App.render(); }
      });
    }
    // islam cert / any doc-item click
    body.querySelectorAll('.doc-item[data-src]').forEach(el => el.onclick = () => UI.lightbox(el.dataset.src, false));
  };

  function docItemHTML(d, withDel) {
    const isPdf = (d.type || '').indexOf('pdf') !== -1;
    return `<div class="doc-item" data-doc="${UI.esc(d.docId)}" data-src="${UI.esc(d.data)}" data-pdf="${isPdf ? '1' : '0'}">
      ${isPdf ? '<div class="pdfph">📄</div>' : `<img src="${UI.esc(d.data)}" alt="">`}
      <div class="dn">${UI.esc(d.name || 'وثيقة')}</div>
      ${withDel ? `<button class="del" data-del="${UI.esc(d.docId)}">🗑</button>` : ''}
    </div>`;
  }
  function bindDocs(scope) {
    scope.querySelectorAll('.doc-item').forEach(el => {
      el.onclick = (e) => {
        if (e.target.closest('[data-del]')) return;
        UI.lightbox(el.dataset.src, el.dataset.pdf === '1');
      };
    });
    scope.querySelectorAll('[data-del]').forEach(b => b.onclick = async (e) => {
      e.stopPropagation();
      if (await UI.confirm({ message: t('common.confirmDelete') })) { await DB.del('documents', b.dataset.del); App.render(); }
    });
  }
  Views.docItemHTML = docItemHTML;
  Views.bindDocs = bindDocs;

  Views.deletePerson = async function (id) {
    const docs = await DB.byIndex('documents', 'personId', id);
    for (const d of docs) await DB.del('documents', d.docId);
    const notes = await DB.byIndex('notes', 'personId', id);
    for (const n of notes) await DB.del('notes', n.noteId);
    const parts = await DB.byIndex('participants', 'personId', id);
    for (const pt of parts) await DB.del('participants', pt.pid);
    const atts = await DB.byIndex('attendance', 'personId', id);
    for (const a of atts) await DB.del('attendance', a.aid);
    await DB.del('persons', id);
  };

  Views.printProfile = async function (p, docs, notes, courses) {
    const row = (k, v) => `<tr><td>${UI.esc(k)}</td><td>${UI.esc(v == null || v === '' ? '—' : v)}</td></tr>`;
    const sec = (title, rows) => `<div class="pr-sec"><h3>${UI.esc(title)}</h3><table class="pr-tbl">${rows}</table></div>`;
    const L = (g, v) => UI.label(g, v);
    const html = `<div class="pr-paper">
      <div class="pr-head">
        <div style="width:60px">${App.logo()}</div>
        <div style="flex:1"><h1>${t('app.name')}</h1><div class="pr-sub">${t('common.print')} · ${UI.fmtDate(UI.todayISO())}</div></div>
        ${p.photo ? `<img class="pr-img" src="${p.photo}">` : ''}
      </div>
      <h2 style="margin:0 0 8px">${UI.esc(UI.displayName(p))} <span style="color:#a8842a">(${UI.esc(p.id)})</span></h2>
      ${sec(t('step.1'), row(t('f.carnetName'), p.carnetName) + row(t('f.usedName'), p.usedName) + row(t('f.islamicName'), p.islamicName)
        + row(t('f.kunya'), p.kunya) + row(t('f.carnet'), p.carnet) + row(t('f.dob'), p.dob ? UI.fmtDate(p.dob) : '')
        + row(t('f.age'), p.dob ? UI.ageText(p.dob) : '') + row(t('f.gender'), L('gender', p.gender)) + row(t('f.phone'), p.phone) + row(t('f.address'), p.address))}
      ${sec(t('step.2'), row(t('f.islamDate'), p.islamDate ? UI.fmtDate(p.islamDate) : '') + row(t('f.islamStory'), p.islamStory))}
      ${sec(t('step.3'), row(t('f.marital'), L('marital', p.marital)) + (p.marital === 'married'
        ? row(t('f.spouseName'), p.spouseName) + row(t('f.spouseCarnet'), p.spouseCarnet) + row(t('f.marriageDate'), p.marriageDate ? UI.fmtDate(p.marriageDate) : '') + row(t('f.marriageDuration'), p.marriageDate ? UI.duration(p.marriageDate) : '') : '')
        + row(t('f.children'), p.children))}
      ${sec(t('step.4'), row(t('f.level'), L('level', p.level)) + row(t('f.knowledge'), p.knowledge))}
      ${sec(t('step.5'), row(t('f.hasHealth'), p.hasHealth === 'yes' ? t('common.yes') : t('common.no'))
        + (p.hasHealth === 'yes' ? row(t('f.healthDesc'), p.healthDesc) + row(t('f.healthNotes'), p.healthNotes) : ''))}
      ${sec(t('step.6'), row(t('f.finStatus'), L('fin', p.finStatus)) + row(t('f.finDesc'), p.finDesc) + row(t('f.aidType'), p.aidType) + row(t('f.finUpdated'), p.finUpdated ? UI.fmtDate(p.finUpdated) : ''))}
      ${sec(t('step.7'), row(t('f.attStatus'), L('att', p.attStatus)) + row(t('f.prayers'), p.prayers) + row(t('f.lastAttendance'), p.lastAttendance ? UI.fmtDate(p.lastAttendance) : ''))}
      ${docs.length ? sec(t('tab.docs'), docs.map(d => row(d.name, '•')).join('')) : ''}
      ${notes.length ? sec(t('tab.notes'), notes.map(n => row(UI.fmtDateTime(n.at), n.text)).join('')) : ''}
      <div class="pr-foot">${t('app.name')} · ${UI.esc(p.id)}</div>
    </div>`;
    App.print(html);
  };
})();
