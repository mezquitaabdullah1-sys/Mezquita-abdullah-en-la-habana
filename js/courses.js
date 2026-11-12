/* =========================================================
   Courses & attendance
   ========================================================= */
(function () {
  const Views = window.Views = window.Views || {};

  async function personMap() {
    const all = await DB.all('persons');
    const m = {};
    all.forEach(p => m[p.id] = p);
    return m;
  }

  function pct(present, total) { return total ? (present / total * 100) : null; }

  async function attendanceOf(courseId, personId) {
    const atts = (await DB.byIndex('attendance', 'courseId', courseId)).filter(a => a.personId === personId);
    const sessions = await DB.byIndex('sessions', 'courseId', courseId);
    const present = atts.filter(a => a.status === 'present').length;
    return { present, total: sessions.length, pct: pct(present, sessions.length) };
  }

  Views.coursesForPerson = async function (personId) {
    const parts = await DB.byIndex('participants', 'personId', personId);
    const out = [];
    for (const pt of parts) {
      const c = await DB.get('courses', pt.courseId);
      if (!c) continue;
      const a = await attendanceOf(c.courseId, personId);
      out.push({ courseId: c.courseId, name: c.name, pct: a.pct, present: a.present, total: a.total });
    }
    return out;
  };

  /* ---------- list ---------- */
  Views.courses = async function (root) {
    const courses = (await DB.all('courses')).sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    root.innerHTML = `
      <div class="page-head">
        <div class="page-title"><span class="pi">📚</span>
          <div><h2 data-i18n="courses.title"></h2><div class="page-sub" data-i18n="courses.sub"></div></div></div>
        <button class="btn gold lg" id="addCourse">➕ <span data-i18n="courses.add"></span></button>
      </div>
      <div id="cWrap"></div>`;

    const wrap = root.querySelector('#cWrap');
    if (!courses.length) {
      wrap.innerHTML = `<div class="empty"><div class="eico">📚</div><h3>${t('common.noData')}</h3><p>${t('courses.noSessions')}</p></div>`;
    } else {
      const rows = [];
      for (const c of courses) {
        const members = await DB.byIndex('participants', 'courseId', c.courseId);
        const sessions = await DB.byIndex('sessions', 'courseId', c.courseId);
        const atts = await DB.byIndex('attendance', 'courseId', c.courseId);
        const presents = atts.filter(a => a.status === 'present').length;
        const totalSlots = members.length * sessions.length;
        const avg = totalSlots ? Math.round(presents / totalSlots * 100) : null;
        rows.push(`<div class="panel" style="cursor:pointer" data-course="${UI.esc(c.courseId)}">
          <div class="panel-head" style="margin-bottom:.4rem">
            <div><h3 style="margin:0">📘 ${UI.esc(c.name)}</h3>
              <div class="page-sub">${t('courses.teacher')}: ${UI.esc(c.teacher || '—')} · ${UI.esc(c.days || '')}</div></div>
            <div style="text-align:end">
              <div class="pct ${avg == null ? '' : avg < 60 ? 'low' : avg < 80 ? 'mid' : 'high'}">${avg == null ? '—' : avg + '%'}</div>
              <div class="small muted">${t('courses.pct')}</div>
            </div>
          </div>
          <div class="pcard-line">
            <span class="badge b-green">👤 ${members.length} ${t('courses.participants')}</span>
            <span class="badge b-gold">🗓 ${sessions.length} ${t('courses.sessions')}</span>
            <span class="badge b-grey">${c.start ? UI.fmtDate(c.start) : '—'} → ${c.end ? UI.fmtDate(c.end) : '—'}</span>
          </div>
        </div>`);
      }
      wrap.innerHTML = rows.join('');
      wrap.querySelectorAll('[data-course]').forEach(el => el.onclick = () => App.go('courseDetail', { id: el.dataset.course }));
    }
    root.querySelector('#addCourse').onclick = () => courseForm();
  };

  function courseForm() {
    UI.modal({
      title: t('courses.add'), size: '',
      body: `<div class="form-grid">
        <div class="field"><label>${t('common.name')} <span class="req">*</span></label><input id="cName"><span class="errmsg">${t('common.required')}</span></div>
        <div class="field"><label>${t('courses.teacher')}</label><input id="cTeacher"></div>
        <div class="field span2"><label>${t('courses.days')}</label><input id="cDays" placeholder="السبت والأحد 18:00"></div>
        <div class="field"><label>${t('courses.start')}</label><input type="date" id="cStart"></div>
        <div class="field"><label>${t('courses.end')}</label><input type="date" id="cEnd"></div>
      </div>`,
      footer: `<button class="btn" data-close>${t('common.cancel')}</button><button class="btn primary" id="cSave">${t('common.save')}</button>`,
      onMount(box, close) {
        box.querySelector('#cSave').onclick = async () => {
          const name = box.querySelector('#cName');
          if (!name.value.trim()) { name.classList.add('err'); return; }
          const courseId = await DB.nextId('CR', 'courseCounter');
          await DB.put('courses', {
            courseId, name: name.value.trim(),
            teacher: box.querySelector('#cTeacher').value.trim(),
            days: box.querySelector('#cDays').value.trim(),
            start: box.querySelector('#cStart').value, end: box.querySelector('#cEnd').value,
            createdAt: new Date().toISOString()
          });
          UI.ok(t('common.saved')); close(); App.render();
        };
      }
    });
  }

  /* ---------- detail ---------- */
  Views.courseDetail = async function (root) {
    const c = await DB.get('courses', App.params.id);
    if (!c) { root.innerHTML = `<div class="empty"><h3>${t('common.noData')}</h3></div>`; return; }
    const pm = await personMap();
    const members = await DB.byIndex('participants', 'courseId', c.courseId);
    const sessions = (await DB.byIndex('sessions', 'courseId', c.courseId)).sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    const atts = await DB.byIndex('attendance', 'courseId', c.courseId);

    // per-person pct + at-risk
    const rows = [];
    const atRisk = [];
    for (const m of members) {
      const p = pm[m.personId]; if (!p) continue;
      const present = atts.filter(a => a.personId === m.personId && a.status === 'present').length;
      const total = sessions.length;
      const ppct = pct(present, total);
      const cls = ppct == null ? '' : ppct < 60 ? 'low' : ppct < 80 ? 'mid' : 'high';
      if (ppct != null && ppct < 60 && total >= 2) atRisk.push(p);
      rows.push(`<tr>
        <td><b>${UI.esc(UI.displayName(p))}</b><div class="small muted">${UI.esc(p.id)}</div></td>
        <td>${present} / ${total}</td>
        <td><span class="pct ${cls}">${ppct == null ? '—' : Math.round(ppct) + '%'}</span>
          ${ppct != null && ppct < 60 && total >= 2 ? `<span class="badge b-red">⚠ ${t('courses.warn')}</span>` : ''}</td>
        <td><button class="btn sm danger-ghost" data-rm="${UI.esc(m.pid)}">✕</button></td>
      </tr>`);
    }

    root.innerHTML = `
      <button class="btn ghost sm" id="back" style="margin-bottom:.8rem">↩ ${t('common.back')}</button>
      <div class="page-head">
        <div class="page-title"><span class="pi">📘</span>
          <div><h2>${UI.esc(c.name)}</h2>
            <div class="page-sub">${t('courses.teacher')}: ${UI.esc(c.teacher || '—')} · ${UI.esc(c.days || '')} · ${c.start ? UI.fmtDate(c.start) : '—'} → ${c.end ? UI.fmtDate(c.end) : '—'}</div></div></div>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap">
          <button class="btn primary" id="addPart">➕ ${t('courses.addParticipant')}</button>
          <button class="btn gold" id="newSess">🗓 ${t('courses.newSession')}</button>
          <button class="btn danger-ghost" id="delCourse">🗑 ${t('common.delete')}</button>
        </div>
      </div>

      ${atRisk.length ? `<div class="banner warn"><span>⚠️</span><div><b>${t('courses.atRisk')}:</b>
        ${atRisk.map(p => UI.esc(UI.displayName(p))).join('، ')}</div></div>` : ''}

      <div class="panel">
        <div class="panel-head"><h3>👤 ${t('courses.participants')} (${members.length})</h3>
          <button class="btn sm" id="addPart2">➕</button></div>
        ${members.length ? `<div class="table-wrap"><table>
          <thead><tr><th>${t('common.name')}</th><th>${t('courses.present')}/${t('courses.sessions')}</th>
          <th>${t('courses.pct')}</th><th></th></tr></thead>
          <tbody>${rows.join('')}</tbody></table></div>` : `<p class="muted">${t('courses.noParticipants')}</p>`}
      </div>

      <div class="panel">
        <div class="panel-head"><h3>🗓 ${t('courses.sessions')} (${sessions.length})</h3>
          <button class="btn sm" id="newSess2">➕ ${t('courses.newSession')}</button></div>
        ${sessions.length ? `<div class="table-wrap"><table>
          <thead><tr><th>${t('courses.sessionDate')}</th><th>${t('courses.attendance')}</th><th>${t('common.actions')}</th></tr></thead>
          <tbody>${sessions.map(s => {
            const sAtts = atts.filter(a => a.sessionId === s.sessionId);
            const pres = sAtts.filter(a => a.status === 'present').length;
            return `<tr>
              <td><b>${UI.fmtDate(s.date)}</b></td>
              <td>${pres} / ${members.length}
                <div class="small muted">${members.length ? Math.round(pres / members.length * 100) + '%' : ''}</div></td>
              <td style="display:flex;gap:.4rem">
                <button class="btn sm primary" data-att="${UI.esc(s.sessionId)}">✎ ${t('courses.attendance')}</button>
                <button class="btn sm danger-ghost" data-delsess="${UI.esc(s.sessionId)}">🗑</button>
              </td></tr>`;
          }).join('')}</tbody></table></div>` : `<p class="muted">${t('courses.noSessions')}</p>`}
      </div>`;

    root.querySelector('#back').onclick = () => App.go('courses');
    root.querySelector('#addPart').onclick = () => root.querySelector('#addPart2').click();
    root.querySelector('#newSess').onclick = () => root.querySelector('#newSess2').click();
    root.querySelector('#addPart2').onclick = () => addParticipant(c.courseId);
    root.querySelector('#newSess2').onclick = () => newSession(c);
    root.querySelector('#delCourse').onclick = async () => {
      if (await UI.confirm({ message: t('common.confirmDelete') })) {
        for (const s of sessions) {
          for (const a of atts.filter(x => x.sessionId === s.sessionId)) await DB.del('attendance', a.aid);
          await DB.del('sessions', s.sessionId);
        }
        for (const m of members) await DB.del('participants', m.pid);
        await DB.del('courses', c.courseId);
        UI.ok(t('common.deleted')); App.go('courses');
      }
    };
    root.querySelectorAll('[data-rm]').forEach(b => b.onclick = async () => {
      if (await UI.confirm({ message: t('common.confirmDelete') })) { await DB.del('participants', b.dataset.rm); App.render(); }
    });
    root.querySelectorAll('[data-delsess]').forEach(b => b.onclick = async () => {
      if (await UI.confirm({ message: t('courses.deleteSession') })) {
        for (const a of atts.filter(x => x.sessionId === b.dataset.delsess)) await DB.del('attendance', a.aid);
        await DB.del('sessions', b.dataset.delsess);
        App.render();
      }
    });
    root.querySelectorAll('[data-att]').forEach(b => b.onclick = () => takeAttendance(c, b.dataset.att, sessions, members));
  };

  async function addParticipant(courseId) {
    const all = (await Views.listMuslims()).sort((a, b) => UI.displayName(a).localeCompare(UI.displayName(b)));
    const existing = (await DB.byIndex('participants', 'courseId', courseId)).map(p => p.personId);
    const avail = all.filter(p => existing.indexOf(p.id) === -1);
    UI.modal({
      title: t('courses.addParticipant'), size: '',
      body: `<input id="partSearch" class="search-inline" placeholder="${t('top.search')}"
        style="width:100%;padding:.7rem;border:2px solid var(--line);border-radius:12px;margin-bottom:.8rem">
        <div id="partList" style="max-height:400px;overflow:auto">
        ${avail.length ? avail.map(p => `<div class="att-row" data-pid="${UI.esc(p.id)}">
          ${UI.avatar(p, 'sm')}<span class="an">${UI.esc(UI.displayName(p))} <span class="small muted">${UI.esc(p.id)}</span></span>
          <button class="btn sm primary">➕</button></div>`).join('') : `<p class="muted">${t('common.noData')}</p>`}
        </div>`,
      onMount(box, close) {
        const search = box.querySelector('#partSearch');
        search.oninput = UI.debounce(() => {
          const q = search.value.trim().toLowerCase();
          box.querySelectorAll('[data-pid]').forEach(r => {
            r.hidden = q && r.textContent.toLowerCase().indexOf(q) === -1;
          });
        }, 150);
        box.querySelectorAll('[data-pid]').forEach(r => r.onclick = async () => {
          await DB.put('participants', { pid: UI.uid('pt'), courseId, personId: r.dataset.pid, joinedAt: new Date().toISOString() });
          UI.ok(t('toast.participantAdded')); close(); App.render();
        });
      }
    });
  }

  async function newSession(course) {
    const date = await UI.prompt({ title: t('courses.newSession'), label: t('courses.sessionDate'), type: 'date', value: UI.todayISO(), okText: t('common.save') });
    if (!date) return;
    const sessionId = UI.uid('s');
    await DB.put('sessions', { sessionId, courseId: course.courseId, date, createdAt: new Date().toISOString() });
    UI.ok(t('common.saved'));
    App.render();
    setTimeout(() => takeAttendance(course, sessionId, null, null), 250);
  }

  async function takeAttendance(course, sessionId, sessions, members) {
    const pm = await personMap();
    members = await DB.byIndex('participants', 'courseId', course.courseId);
    const sess = await DB.get('sessions', sessionId);
    const atts = await DB.byIndex('attendance', 'sessionId', sessionId);
    const map = {};
    atts.forEach(a => map[a.personId] = a.status);
    const body = `<div class="page-sub" style="margin-bottom:.7rem">🗓 ${UI.fmtDate(sess.date)} · ${UI.esc(course.name)}</div>
      <div id="attList">
      ${members.length ? members.map(m => {
        const p = pm[m.personId]; if (!p) return '';
        const st = map[m.personId] || 'present';
        return `<div class="att-row" data-pid="${UI.esc(p.id)}">
          ${UI.avatar(p, 'sm')}<span class="an">${UI.esc(UI.displayName(p))}</span>
          <div class="seg">
            <button class="${st === 'present' ? 'p' : ''}" data-st="present">✓ ${t('courses.present')}</button>
            <button class="${st === 'absent' ? 'a' : ''}" data-st="absent">✕ ${t('courses.absent')}</button>
          </div></div>`;
      }).join('') : `<p class="muted">${t('courses.noParticipants')}</p>`}
      </div>`;
    UI.modal({
      title: t('courses.attendance'), size: 'wide', body,
      footer: `<button class="btn" data-close>${t('common.cancel')}</button>
               <button class="btn primary" id="saveAtt">${t('courses.saveAttendance')}</button>`,
      onMount(box, close) {
        box.querySelectorAll('.att-row').forEach(r => {
          const seg = r.querySelector('.seg');
          seg.querySelectorAll('button').forEach(b => b.onclick = () => {
            seg.querySelectorAll('button').forEach(x => x.classList.remove('p', 'a'));
            b.classList.add(b.dataset.st === 'present' ? 'p' : 'a');
          });
        });
        box.querySelector('#saveAtt').onclick = async () => {
          for (const r of box.querySelectorAll('.att-row')) {
            const pid = r.dataset.pid;
            const active = r.querySelector('.seg button.p, .seg button.a');
            const status = active ? active.dataset.st : 'present';
            const ex = await DB.byIndex('attendance', 'sessionId', sessionId);
            const found = ex.find(a => a.personId === pid);
            const rec = found || { aid: UI.uid('a'), sessionId, courseId: course.courseId, personId: pid };
            rec.status = status; rec.at = new Date().toISOString();
            await DB.put('attendance', rec);
          }
          UI.ok(t('courses.attendanceSaved')); close(); App.render();
        };
      }
    });
  }
})();
