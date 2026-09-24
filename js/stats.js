/* =========================================================
   Statistics — KPI cards + Chart.js charts + exports
   ========================================================= */
(function () {
  const Views = window.Views = window.Views || {};
  let charts = [];

  function destroyCharts() { charts.forEach(c => { try { c.destroy(); } catch (e) {} }); charts = []; }

  function palette(n) {
    const base = ['#14532d', '#2e8b57', '#d4af37', '#c87f0a', '#1f6feb', '#c0392b', '#7d8b83', '#8e6f1c', '#4a5a50', '#e8c96a'];
    const out = []; for (let i = 0; i < n; i++) out.push(base[i % base.length]); return out;
  }

  function ageBucket(dob) {
    const a = UI.age(dob); if (!a) return null;
    const y = a.years;
    if (y < 18) return '0-17';
    if (y < 30) return '18-29';
    if (y < 45) return '30-44';
    if (y < 60) return '45-59';
    return '60+';
  }

  function countBy(list, fn) {
    const m = {};
    list.forEach(x => { let k = fn(x); if (k == null || k === '') k = '—'; m[k] = (m[k] || 0) + 1; });
    return m;
  }

  function makeChart(canvas, type, labels, data, label) {
    const ctx = canvas.getContext('2d');
    const c = new Chart(ctx, {
      type,
      data: {
        labels,
        datasets: [{
          label: label || '', data,
          backgroundColor: type === 'bar' || type === 'line' ? palette(labels.length).map(x => x + 'cc') : palette(labels.length),
          borderColor: '#fff', borderWidth: 2, borderRadius: 6, tension: .35, fill: false
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: type === 'doughnut' || type === 'pie' ? 'bottom' : 'top',
          labels: { font: { size: 12 }, boxWidth: 12, padding: 10 } } },
        scales: (type === 'bar' || type === 'line') ? {
          y: { beginAtZero: true, ticks: { precision: 0 } },
          x: { ticks: { font: { size: 11 } } }
        } : undefined
      }
    });
    charts.push(c);
    return c;
  }

  Views.stats = async function (root) {
    destroyCharts();
    const persons = await DB.all('persons');
    const muslims = persons.filter(p => p.type === 'muslim');
    const nonmuslims = persons.filter(p => p.type === 'nonmuslim');
    const needy = muslims.filter(p => p.finStatus === 'urgent');
    const sick = muslims.filter(p => p.hasHealth === 'yes');
    const married = muslims.filter(p => p.marital === 'married');
    const courses = await DB.all('courses');
    const docsCount = await DB.count('documents');
    const notesCount = await DB.count('notes');

    const L = (g, arr) => {
      const labels = [], data = [];
      Object.keys(arr).forEach(k => { labels.push(g ? UI.label(g, k) : k); data.push(arr[k]); });
      return { labels, data };
    };

    const byLevel = L('level', countBy(muslims, p => p.level));
    const byMarital = L('marital', countBy(muslims, p => p.marital));
    const byAtt = L('att', countBy(muslims, p => p.attStatus));
    const byFin = L('fin', countBy(muslims, p => p.finStatus));
    const ageOrder = ['0-17', '18-29', '30-44', '45-59', '60+'];
    const ageMap = countBy(muslims, p => ageBucket(p.dob));
    const byAge = { labels: ageOrder, data: ageOrder.map(k => ageMap[k] || 0) };

    const conv = countBy(muslims.filter(p => p.islamDate), p => (p.islamDate || '').slice(0, 4));
    const convLabels = Object.keys(conv).sort();
    const byConv = { labels: convLabels, data: convLabels.map(k => conv[k]) };

    // course attendance percentages
    const attLabels = [], attData = [];
    for (const c of courses) {
      const members = await DB.byIndex('participants', 'courseId', c.courseId);
      const sessions = await DB.byIndex('sessions', 'courseId', c.courseId);
      const atts = await DB.byIndex('attendance', 'courseId', c.courseId);
      const slots = members.length * sessions.length;
      const pres = atts.filter(a => a.status === 'present').length;
      attLabels.push(c.name);
      attData.push(slots ? Math.round(pres / slots * 100) : 0);
    }

    root.innerHTML = `
      <div class="page-head">
        <div class="page-title"><span class="pi">📊</span>
          <div><h2 data-i18n="stats.title"></h2><div class="page-sub" data-i18n="stats.sub"></div></div></div>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap">
          <button class="btn" id="expPdf">🖨 <span data-i18n="common.exportPdf"></span></button>
          <button class="btn primary" id="expXls">📊 <span data-i18n="common.exportExcel"></span></button>
        </div>
      </div>

      <div class="stat-cards">
        <div class="stat"><div class="sicon">👥</div><div><div class="snum">${muslims.length}</div>
          <div class="slab">${t('stats.totalMuslims')}</div></div></div>
        <div class="stat"><div class="sicon">🤝</div><div><div class="snum">${nonmuslims.length}</div>
          <div class="slab">${t('stats.totalNon')}</div></div></div>
        <div class="stat red clickable" id="needyCard"><div class="sicon">🆘</div><div><div class="snum">${needy.length}</div>
          <div class="slab">${t('stats.needy')}</div></div></div>
        <div class="stat"><div class="sicon">🩺</div><div><div class="snum">${sick.length}</div>
          <div class="slab">${t('stats.sick')}</div></div></div>
        <div class="stat"><div class="sicon">💍</div><div><div class="snum">${married.length}</div>
          <div class="slab">${t('stats.married')}</div></div></div>
        <div class="stat"><div class="sicon">📚</div><div><div class="snum">${courses.length}</div>
          <div class="slab">${t('stats.totalCourses')}</div></div></div>
        <div class="stat"><div class="sicon">📄</div><div><div class="snum">${docsCount}</div>
          <div class="slab">${t('stats.docs')}</div></div></div>
        <div class="stat"><div class="sicon">📝</div><div><div class="snum">${notesCount}</div>
          <div class="slab">${t('stats.notes')}</div></div></div>
      </div>

      <div class="grid two">
        <div class="chart-box"><h3>📖 ${t('stats.byLevel')}</h3><div class="chart-holder"><canvas id="chLevel"></canvas></div></div>
        <div class="chart-box"><h3>💍 ${t('stats.byMarital')}</h3><div class="chart-holder"><canvas id="chMarital"></canvas></div></div>
        <div class="chart-box"><h3>🕌 ${t('stats.byAttendance')}</h3><div class="chart-holder"><canvas id="chAtt"></canvas></div></div>
        <div class="chart-box"><h3>💰 ${t('stats.byFinance')}</h3><div class="chart-holder"><canvas id="chFin"></canvas></div></div>
        <div class="chart-box"><h3>🎂 ${t('stats.byAge')}</h3><div class="chart-holder"><canvas id="chAge"></canvas></div></div>
        <div class="chart-box"><h3>🕋 ${t('stats.conversions')}</h3><div class="chart-holder"><canvas id="chConv"></canvas></div></div>
        <div class="chart-box" style="grid-column:1/-1"><h3>📚 ${t('stats.attendancePct')}</h3>
          <div class="chart-holder"><canvas id="chCourses"></canvas></div></div>
      </div>`;

    makeChart(root.querySelector('#chLevel'), 'doughnut', byLevel.labels, byLevel.data);
    makeChart(root.querySelector('#chMarital'), 'pie', byMarital.labels, byMarital.data);
    makeChart(root.querySelector('#chAtt'), 'bar', byAtt.labels, byAtt.data);
    makeChart(root.querySelector('#chFin'), 'doughnut', byFin.labels, byFin.data);
    makeChart(root.querySelector('#chAge'), 'bar', byAge.labels, byAge.data);
    makeChart(root.querySelector('#chConv'), 'line', byConv.labels, byConv.data);
    makeChart(root.querySelector('#chCourses'), 'bar', attLabels.length ? attLabels : ['—'], attData.length ? attData : [0]);

    root.querySelector('#needyCard').onclick = () => needyList(needy);
    root.querySelector('#expXls').onclick = async () => {
      const rows = muslims.map(p => personRow(p));
      App.exportSheet('المسلمون', rows);
      UI.ok(t('toast.exported'));
    };
    root.querySelector('#expPdf').onclick = () => printStats(muslims, nonmuslims, needy, sick, married, courses, byLevel, byMarital, byAtt, byFin, byAge, byConv);
  };

  function personRow(p) {
    return {
      'ID': p.id, 'الاسم في الكرنيه': p.carnetName || '', 'الاسم المستخدم': p.usedName || '',
      'الاسم الإسلامي': p.islamicName || '', 'اللقب': p.kunya || '', 'رقم الكرنيه': p.carnet || '',
      'تاريخ الميلاد': p.dob || '', 'العمر': p.dob ? (UI.age(p.dob) ? UI.age(p.dob).years : '') : '',
      'الجنس': UI.label('gender', p.gender), 'الهاتف': p.phone || '', 'العنوان': p.address || '',
      'تاريخ الإسلام': p.islamDate || '', 'الحالة الاجتماعية': UI.label('marital', p.marital),
      'عدد الأطفال': p.children != null ? p.children : '', 'مستوى العلم': UI.label('level', p.level),
      'العلم': p.knowledge || '', 'حالة صحية': p.hasHealth === 'yes' ? 'نعم' : 'لا',
      'وصف الحالة': p.healthDesc || '', 'الحالة المادية': UI.label('fin', p.finStatus),
      'نوع المساعدة': p.aidType || '', 'الانتظام': UI.label('att', p.attStatus),
      'آخر حضور': p.lastAttendance || ''
    };
  }
  Views.personRow = personRow;

  async function needyList(needy) {
    UI.modal({
      title: `🆘 ${t('stats.needyList')} (${needy.length})`, size: 'wide',
      body: `<div class="table-wrap"><table><thead><tr>
        <th>${t('common.name')}</th><th>ID</th><th>${t('f.phone')}</th><th>${t('f.aidType')}</th><th>${t('f.finUpdated')}</th>
        </tr></thead><tbody>
        ${needy.map(p => `<tr class="clickable" data-id="${UI.esc(p.id)}">
          <td><b>${UI.esc(UI.displayName(p))}</b></td><td>${UI.esc(p.id)}</td>
          <td>${UI.esc(p.phone || '—')}</td><td>${UI.esc(p.aidType || '—')}</td>
          <td>${p.finUpdated ? UI.fmtDate(p.finUpdated) : '—'}</td></tr>`).join('')}
      </tbody></table></div>
      ${needy.length ? '' : `<p class="muted">${t('common.noData')}</p>`}`,
      footer: `<button class="btn primary" id="expNeedy">📊 ${t('common.exportExcel')}</button>
               <button class="btn" data-close>${t('common.close')}</button>`,
      onMount(box, close) {
        box.querySelectorAll('tr[data-id]').forEach(r => r.onclick = () => { close(); App.go('profile', { id: r.dataset.id }); });
        box.querySelector('#expNeedy').onclick = () => {
          App.exportSheet('المحتاجون', needy.map(p => ({
            'ID': p.id, 'الاسم': UI.displayName(p), 'الهاتف': p.phone || '',
            'نوع المساعدة': p.aidType || '', 'الوصف': p.finDesc || '', 'آخر تحديث': p.finUpdated || ''
          })));
          UI.ok(t('toast.exported'));
        };
      }
    });
  }

  function printStats(m, nm, needy, sick, married, courses, byLevel, byMarital, byAtt, byFin, byAge, byConv) {
    const tbl = (title, obj) => `<div class="pr-sec"><h3>${UI.esc(title)}</h3><table class="pr-tbl">
      ${obj.labels.map((l, i) => `<tr><td>${UI.esc(l)}</td><td>${obj.data[i]}</td></tr>`).join('')}</table></div>`;
    const html = `<div class="pr-paper">
      <div class="pr-head"><div style="width:60px">${App.logo()}</div>
        <div style="flex:1"><h1>${t('app.name')}</h1><div class="pr-sub">${t('stats.title')} · ${UI.fmtDate(UI.todayISO())}</div></div></div>
      <div class="pr-sec"><h3>${t('stats.title')}</h3><table class="pr-tbl">
        <tr><td>${t('stats.totalMuslims')}</td><td>${m.length}</td></tr>
        <tr><td>${t('stats.totalNon')}</td><td>${nm.length}</td></tr>
        <tr><td>${t('stats.needy')}</td><td>${needy.length}</td></tr>
        <tr><td>${t('stats.sick')}</td><td>${sick.length}</td></tr>
        <tr><td>${t('stats.married')}</td><td>${married.length}</td></tr>
        <tr><td>${t('stats.totalCourses')}</td><td>${courses.length}</td></tr></table></div>
      ${tbl(t('stats.byLevel'), byLevel)}
      ${tbl(t('stats.byMarital'), byMarital)}
      ${tbl(t('stats.byAttendance'), byAtt)}
      ${tbl(t('stats.byFinance'), byFin)}
      ${tbl(t('stats.byAge'), byAge)}
      ${tbl(t('stats.conversions'), byConv)}
      <div class="pr-sec"><h3>${t('stats.needyList')}</h3><table class="pr-tbl">
        ${needy.map(p => `<tr><td>${UI.esc(UI.displayName(p))} (${UI.esc(p.id)})</td><td>${UI.esc(p.phone || '—')}</td></tr>`).join('') || '<tr><td>—</td><td></td></tr>'}
      </table></div>
      <div class="pr-foot">${t('app.name')}</div></div>`;
    App.print(html);
  }
})();
