/* =========================================================
   Settings — backup / restore / export / language / PIN
   ========================================================= */
(function () {
  const Views = window.Views = window.Views || {};
  const STORES = ['persons', 'documents', 'notes', 'courses', 'sessions', 'participants', 'attendance', 'meta'];

  Views.settings = async function (root) {
    const persons = await DB.all('persons');
    const muslims = persons.filter(p => p.type === 'muslim').length;
    const non = persons.filter(p => p.type === 'nonmuslim').length;
    const pinOn = App.isPinSet();

    root.innerHTML = `
      <div class="page-head">
        <div class="page-title"><span class="pi">⚙️</span>
          <div><h2 data-i18n="settings.title"></h2><div class="page-sub" data-i18n="settings.sub"></div></div></div>
      </div>

      <div class="grid two">
        <div class="panel">
          <h3>💾 ${t('settings.backup')}</h3>
          <p class="muted small">يتم حفظ البيانات في متصفح هذا الجهاز. أنشئ نسخة احتياطية بانتظام.</p>
          <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.6rem">
            <button class="btn primary" id="backupBtn">⬇ ${t('settings.backupBtn')}</button>
            <button class="btn" id="restoreBtn">⬆ ${t('settings.restoreBtn')}</button>
            <input type="file" id="restoreFile" accept=".json,application/json" style="display:none">
          </div>
        </div>

        <div class="panel">
          <h3>📊 ${t('settings.exportAll')}</h3>
          <p class="muted small">تصدير كل الجداول إلى ملف Excel متعدد الأوراق.</p>
          <button class="btn gold" id="exportAllBtn" style="margin-top:.6rem">📊 ${t('common.exportExcel')}</button>
        </div>

        <div class="panel">
          <h3>🌐 ${t('settings.language')}</h3>
          <div class="lang-switch" id="setLang" style="margin-top:.4rem">
            <button data-lang="ar" class="${I18N.lang === 'ar' ? 'active' : ''}">العربية</button>
            <button data-lang="es" class="${I18N.lang === 'es' ? 'active' : ''}">Español</button>
          </div>
        </div>

        <div class="panel">
          <h3>🔒 ${t('settings.pin')}</h3>
          <p class="small">${pinOn ? '✅ ' + t('settings.pinOn') : '⭕ ' + t('settings.pinOff')}</p>
          <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.6rem">
            <button class="btn ${pinOn ? '' : 'primary'}" id="pinSetBtn">${pinOn ? t('settings.pinChange') : t('settings.pinSet')}</button>
            ${pinOn ? `<button class="btn danger-ghost" id="pinRemoveBtn">${t('settings.pinRemove')}</button>` : ''}
          </div>
        </div>

        <div class="panel" style="grid-column:1/-1">
          <h3>📈 ${t('settings.about')}</h3>
          <div class="info-grid">
            <div class="info-item"><div class="k">${t('stats.totalMuslims')}</div><div class="v">${muslims}</div></div>
            <div class="info-item"><div class="k">${t('stats.totalNon')}</div><div class="v">${non}</div></div>
            <div class="info-item"><div class="k">${t('common.added')}</div><div class="v">IndexedDB</div></div>
            <div class="info-item"><div class="k">${t('settings.storage')}</div><div class="v" id="stgVal">—</div></div>
          </div>
        </div>

        <div class="panel" style="grid-column:1/-1;border-color:#f2c9c3;background:#fffafa">
          <h3 style="color:var(--red)">⚠️ ${t('settings.dangerZone')}</h3>
          <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.6rem">
            <button class="btn danger-ghost" id="clearDemoBtn">🧪 ${t('settings.clearDemoBtn')}</button>
            <button class="btn danger" id="clearAllBtn">🗑 ${t('settings.clearAllBtn')}</button>
          </div>
        </div>
      </div>`;

    // storage estimate
    try {
      if (navigator.storage && navigator.storage.estimate) {
        const e = await navigator.storage.estimate();
        const el = root.querySelector('#stgVal'); if (el) el.textContent = (e.usage / 1048576).toFixed(2) + ' MB';
      }
    } catch (e) {}

    root.querySelector('#backupBtn').onclick = async () => {
      UI.info('...');
      const data = { app: 'mosque-abdullah', version: 1, at: new Date().toISOString(), stores: {} };
      for (const s of STORES) data.stores[s] = await DB.all(s);
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      UI.download(blob, `mosque-backup-${UI.todayISO()}.json`);
      UI.ok('✅');
    };

    const rf = root.querySelector('#restoreFile');
    root.querySelector('#restoreBtn').onclick = () => rf.click();
    rf.onchange = async (e) => {
      const file = e.target.files[0]; if (!file) return;
      if (!(await UI.confirm({ message: t('settings.restoreWarn'), danger: false, okText: t('common.confirm') }))) return;
      try {
        const txt = await file.text();
        const data = JSON.parse(txt);
        if (!data.stores) throw new Error('bad');
        for (const s of STORES) { await DB.clear(s); if (data.stores[s]) await DB.bulkPut(s, data.stores[s]); }
        UI.ok(t('settings.restored'));
        App.render();
      } catch (err) { UI.err(t('toast.errImport')); }
    };

    root.querySelector('#exportAllBtn').onclick = async () => {
      const persons = await DB.all('persons');
      const muslims = persons.filter(p => p.type === 'muslim');
      const non = persons.filter(p => p.type === 'nonmuslim');
      const notes = await DB.all('notes');
      const courses = await DB.all('courses');
      const sessions = await DB.all('sessions');
      const parts = await DB.all('participants');
      const atts = await DB.all('attendance');
      const pm = {}; persons.forEach(p => pm[p.id] = p);
      const cm = {}; courses.forEach(c => cm[c.courseId] = c);
      App.exportBook([
        { name: 'المسلمون', rows: muslims.map(p => Views.personRow ? Views.personRow(p) : { ID: p.id, الاسم: UI.displayName(p) }) },
        { name: 'غير المسلمين', rows: non.map(p => ({ 'ID': p.id, 'الاسم': UI.displayName(p), 'الهاتف': p.phone || '', 'الكرنيه': p.carnet || '', 'الاهتمام': UI.label('interest', p.interest), 'ملاحظات': p.notes || '' })) },
        { name: 'الملاحظات', rows: notes.map(n => ({ 'ID الشخص': n.personId, 'الاسم': pm[n.personId] ? UI.displayName(pm[n.personId]) : '', 'الملاحظة': n.text, 'التاريخ': n.at, 'الكاتب': n.author })) },
        { name: 'الدورات', rows: courses.map(c => ({ 'المعرّف': c.courseId, 'الاسم': c.name, 'المعلم': c.teacher, 'الأيام': c.days, 'البداية': c.start, 'النهاية': c.end })) },
        { name: 'الجلسات', rows: sessions.map(s => ({ 'المعرّف': s.sessionId, 'الدورة': cm[s.courseId] ? cm[s.courseId].name : s.courseId, 'التاريخ': s.date })) },
        { name: 'المشاركون', rows: parts.map(p => ({ 'الدورة': cm[p.courseId] ? cm[p.courseId].name : p.courseId, 'الشخص': pm[p.personId] ? UI.displayName(pm[p.personId]) : p.personId })) },
        { name: 'الحضور', rows: atts.map(a => ({ 'الدورة': cm[a.courseId] ? cm[a.courseId].name : a.courseId, 'الشخص': pm[a.personId] ? UI.displayName(pm[a.personId]) : a.personId, 'الجلسة': a.sessionId, 'الحالة': a.status === 'present' ? 'حاضر' : 'غائب' })) }
      ]);
      UI.ok(t('toast.exported'));
    };

    root.querySelectorAll('#setLang button').forEach(b => b.onclick = () => {
      I18N.set(b.dataset.lang);
      document.querySelectorAll('#langSwitch button').forEach(x => x.classList.toggle('active', x.dataset.lang === I18N.lang));
      App.render();
    });

    root.querySelector('#pinSetBtn').onclick = async () => {
      const v = await UI.prompt({ title: t('settings.pinSet'), label: t('settings.pinNew'), placeholder: '••••' });
      if (v === null) return;
      if (!/^\d{4,8}$/.test(v)) { UI.err(t('settings.pinInvalid')); return; }
      App.setPin(v); UI.ok(t('settings.pinSaved')); App.render();
    };
    const prm = root.querySelector('#pinRemoveBtn');
    if (prm) prm.onclick = async () => {
      if (await UI.confirm({ message: t('settings.pinRemove'), danger: false })) { App.clearPin(); UI.ok(t('settings.pinRemoved')); App.render(); }
    };

    root.querySelector('#clearDemoBtn').onclick = async () => {
      if (!(await UI.confirm({ message: t('common.confirmDelete'), body2: t('settings.clearDemoBtn') }))) return;
      await Views.clearDemo(); UI.ok(t('settings.demoCleared')); App.render();
    };
    root.querySelector('#clearAllBtn').onclick = async () => {
      if (!(await UI.confirm({ message: t('settings.clearAllBtn'), body2: t('common.confirmDeleteBody') }))) return;
      for (const s of STORES) await DB.clear(s);
      await DB.setMeta('seeded', true);
      App.go('muslims');
      UI.ok(t('settings.clearedAll'));
    };
  };

  Views.clearDemo = async function () {
    const persons = (await DB.all('persons')).filter(p => p.demo);
    for (const p of persons) {
      const docs = await DB.byIndex('documents', 'personId', p.id); for (const d of docs) await DB.del('documents', d.docId);
      const notes = await DB.byIndex('notes', 'personId', p.id); for (const n of notes) await DB.del('notes', n.noteId);
      const parts = await DB.byIndex('participants', 'personId', p.id); for (const pt of parts) await DB.del('participants', pt.pid);
      const atts = await DB.byIndex('attendance', 'personId', p.id); for (const a of atts) await DB.del('attendance', a.aid);
      await DB.del('persons', p.id);
    }
    const courses = (await DB.all('courses')).filter(c => c.demo);
    for (const c of courses) {
      const sess = await DB.byIndex('sessions', 'courseId', c.courseId); for (const s of sess) await DB.del('sessions', s.sessionId);
      const parts = await DB.byIndex('participants', 'courseId', c.courseId); for (const pt of parts) await DB.del('participants', pt.pid);
      const atts = await DB.byIndex('attendance', 'courseId', c.courseId); for (const a of atts) await DB.del('attendance', a.aid);
      await DB.del('courses', c.courseId);
    }
  };
})();
