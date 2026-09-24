/* =========================================================
   App core — shell, routing, search, language, seed, print
   ========================================================= */
(function () {
  const App = {};
  window.App = App;

  App.view = 'muslims';
  App.params = {};
  App.q = '';
  App.filters = {};
  App.lists = {};
  App.state = {};
  App.pinUnlocked = false;

  /* ---------- Mosque logo SVG ---------- */
  App.logo = function () {
    return `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 5c-4 6-8 8-8 13h16c0-5-4-7-8-13z" fill="#14532d"/>
      <path d="M32 3.2c1.1 2 2.6 3.3 2.6 5.2 0 1.7-1.2 3-2.6 3s-2.6-1.3-2.6-3c0-1.9 1.5-3.2 2.6-5.2z" fill="#d4af37"/>
      <rect x="6" y="19" width="7" height="30" rx="3" fill="#14532d"/>
      <rect x="51" y="19" width="7" height="30" rx="3" fill="#14532d"/>
      <path d="M6 19c0-3 3.5-3 3.5-6 0 3 3.5 3 3.5 6z" fill="#d4af37"/>
      <path d="M51 19c0-3 3.5-3 3.5-6 0 3 3.5 3 3.5 6z" fill="#d4af37"/>
      <path d="M15 49V33c0-9.4 7.6-17 17-17s17 7.6 17 17v16z" fill="#1c6b3c"/>
      <path d="M15 49V33c0-9.4 7.6-17 17-17s17 7.6 17 17v16z" fill="none" stroke="#0f3d24" stroke-width="1.6"/>
      <path d="M27 49V38a5 5 0 0 1 10 0v11z" fill="#faf1d8"/>
      <path d="M32 16c-6 3-9 8-9 14h18c0-6-3-11-9-14z" fill="#d4af37" opacity=".85"/>
      <rect x="4" y="48" width="56" height="5" rx="2" fill="#0b2e1c"/>
    </svg>`;
  };

  /* ---------- Print helper ---------- */
  App.print = function (html) {
    const area = document.getElementById('printArea');
    area.innerHTML = html;
    setTimeout(() => {
      window.print();
      setTimeout(() => { area.innerHTML = ''; }, 600);
    }, 60);
  };

  /* ---------- Excel helper ---------- */
  App.exportSheet = function (sheetName, rows) {
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName.slice(0, 31));
    XLSX.writeFile(wb, `mosque-abdullah-${sheetName}-${UI.todayISO()}.xlsx`);
  };
  App.exportBook = function (sheets) {
    const wb = XLSX.utils.book_new();
    sheets.forEach(s => {
      const ws = XLSX.utils.json_to_sheet(s.rows.length ? s.rows : [{ note: '—' }]);
      XLSX.utils.book_append_sheet(wb, ws, s.name.slice(0, 31));
    });
    XLSX.writeFile(wb, `mosque-abdullah-all-${UI.todayISO()}.xlsx`);
  };

  /* ---------- Storage info ---------- */
  async function storageLine() {
    const el = document.getElementById('storageInfo');
    if (!el) return;
    let txt = '';
    try {
      if (navigator.storage && navigator.storage.estimate) {
        const est = await navigator.storage.estimate();
        txt = (est.usage / 1048576).toFixed(1) + ' MB · IndexedDB';
      } else txt = 'IndexedDB';
    } catch (e) { txt = 'IndexedDB'; }
    el.textContent = txt;
  }

  /* ---------- Render ---------- */
  App.render = async function () {
    document.querySelectorAll('.nav-item').forEach(b =>
      b.classList.toggle('active', b.dataset.view === App.view));
    I18N.apply();
    const root = document.getElementById('viewRoot');
    root.innerHTML = '';
    try {
      if (Views[App.view]) await Views[App.view](root, App.params);
      else root.innerHTML = '<div class="empty"><h3>—</h3></div>';
    } catch (e) {
      console.error('render error', e);
      root.innerHTML = `<div class="empty"><div class="eico">⚠️</div><h3>${UI.esc(String(e.message || e))}</h3></div>`;
    }
    I18N.apply();
    storageLine();
  };

  App.go = function (view, params) {
    App.view = view;
    App.params = params || {};
    App.filters = {};
    if (view !== 'muslims' && view !== 'nonmuslims') { App.q = ''; setSearchInput(''); }
    document.getElementById('sidebar').classList.remove('open');
    App.render();
  };
  App.refresh = function () { return App.render(); };

  function setSearchInput(v) {
    const s = document.getElementById('globalSearch');
    if (s && s.value !== v) s.value = v;
    const c = document.getElementById('clearSearch');
    if (c) c.hidden = !v;
  }
  App.setSearch = setSearchInput;

  /* ---------- PIN ---------- */
  App.isPinSet = function () { try { return !!localStorage.getItem('ma_pin'); } catch (e) { return false; } };
  App.setPin = function (p) { try { localStorage.setItem('ma_pin', btoa(p)); } catch (e) {} };
  App.clearPin = function () { try { localStorage.removeItem('ma_pin'); } catch (e) {} };
  App.checkPin = function (v) {
    try { return atob(localStorage.getItem('ma_pin') || '') === v; } catch (e) { return false; }
  };

  function showLock() {
    const lock = document.getElementById('pinLock');
    lock.hidden = false;
    const inp = document.getElementById('pinInput');
    const msg = document.getElementById('pinMsg');
    const submit = () => {
      if (App.checkPin(inp.value)) {
        App.pinUnlocked = true; lock.hidden = true; reveal();
      } else { msg.textContent = t('pin.wrong'); inp.value = ''; inp.focus(); }
    };
    document.getElementById('pinSubmit').onclick = submit;
    document.getElementById('pinReset').onclick = () => {
      msg.textContent = t('pin.resetHelp');
    };
    inp.onkeydown = e => { if (e.key === 'Enter') submit(); };
    setTimeout(() => inp.focus(), 200);
  }

  function reveal() {
    document.getElementById('app').hidden = false;
    App.render();
  }

  /* ---------- Seed demo data ---------- */
  App.maybeSeed = async function () {
    const done = await DB.getMeta('seeded');
    if (done) return;
    await App.seedDemo();
    await DB.setMeta('seeded', true);
  };

  App.seedDemo = async function () {
    const demo = [
      { carnetName: 'أحمد محمد صالح', usedName: 'أحمد صالح', islamicName: 'أحمد', kunya: 'أبو خالد', carnet: 'DEMO-1001',
        dob: '1988-04-12', gender: 'male', phone: '+34 600 111 222', address: 'شارع النور 12، مدريد',
        islamDate: '2015-06-10', islamStory: 'تعرّف على الإسلام عبر دروس المسجد واعتنقه بعد دراسة سنة كاملة.',
        marital: 'married', spouseName: 'فاطمة الزهراء', spouseCarnet: 'DEMO-1002', marriageDate: '2017-03-05', children: 3,
        level: '3', knowledge: 'القرآن، الصلاة، العقيدة', hasHealth: 'no',
        finStatus: 'stable', finDesc: 'يعمل في متجر، دخله يكفي احتياجاته', aidType: '', finUpdated: '2026-05-01',
        attStatus: 'regular', prayers: 'الفرض الخمس، درس التفسير', lastAttendance: '2026-09-20' },
      { carnetName: 'يوسف عبد الرحمن عيسى', usedName: 'يوسف عيسى', islamicName: 'يوسف', kunya: 'أبو مريم', carnet: 'DEMO-1002',
        dob: '1995-11-03', gender: 'male', phone: '+34 600 333 444', address: 'شارع الأندلس 5، خيتافي',
        islamDate: '2020-01-15', islamStory: 'اعتنق الإسلام بعد صداقة مع مسلم في العمل وحضور دورات المسجد.',
        marital: 'married', spouseName: 'مريم', spouseCarnet: 'DEMO-1003', marriageDate: '2021-09-20', children: 1,
        level: '2', knowledge: 'الصلاة، الطهارة', hasHealth: 'yes', healthDesc: 'ربو خفيف',
        healthNotes: 'يستخدم بخاخاً عند الحاجة', finStatus: 'urgent', finDesc: 'متوقف عن العمل منذ ثلاثة أشهر',
        aidType: 'مساعدة مالية ومتابعة طبية', finUpdated: '2026-08-15', attStatus: 'medium',
        prayers: 'الجمعة، درس الفقه', lastAttendance: '2026-09-06' },
      { carnetName: 'بلال عمر حسن', usedName: 'بلال حسن', islamicName: 'بلال', kunya: 'أبو بكر', carnet: 'DEMO-1003',
        dob: '2001-02-27', gender: 'male', phone: '+34 600 555 666', address: 'حي السلام 8، ليغانيس',
        islamDate: '2022-07-01', islamStory: 'شاهد خطبة الجمعة فتأثر وقرر الدخول في الإسلام.',
        marital: 'single', level: '2', knowledge: 'القرآن، الصلاة', hasHealth: 'no',
        finStatus: 'weak', finDesc: 'طالب جامعي بلا دخل ثابت', aidType: 'مصروف دراسي', finUpdated: '2026-06-01',
        attStatus: 'regular', prayers: 'الصلاة، حلقة تحفيظ', lastAttendance: '2026-09-22' },
      { carnetName: 'إبراهيم خليل منصور', usedName: 'إبراهيم منصور', islamicName: 'إبراهيم', kunya: 'أبو عبد الله', carnet: 'DEMO-1004',
        dob: '1975-09-30', gender: 'male', phone: '+34 600 777 888', address: 'شارع المدينة 30، مدريد',
        islamDate: '2008-04-20', islamStory: 'اعتنق الإسلام مبكراً وساهم في تأسيس دروس المسجد.',
        marital: 'married', spouseName: 'عائشة', spouseCarnet: 'DEMO-1005', marriageDate: '2009-12-01', children: 5,
        level: '5', knowledge: 'التفسير، الحديث، الفقه، العقيدة', hasHealth: 'yes', healthDesc: 'سكري من النوع الثاني',
        healthNotes: 'متابعة دورية كل ثلاثة أشهر', finStatus: 'excellent', finDesc: 'صاحب مشروع تجاري',
        aidType: '', finUpdated: '2026-04-10', attStatus: 'regular', prayers: 'الفرض، دروس علمية، إمامة متطوع', lastAttendance: '2026-09-23' },
      { carnetName: 'عمر سعيد رمضان', usedName: 'عمر رمضان', islamicName: 'عمر', kunya: 'أبو سلمى', carnet: 'DEMO-1005',
        dob: '1990-06-18', gender: 'male', phone: '+34 600 999 000', address: 'شارع الوحدة 2، ألكوركون',
        islamDate: '2018-11-05', islamStory: 'أسلم بعد سلسلة لقاءات تعريفية بالمسجد.',
        marital: 'divorced', children: 2, level: '1', knowledge: 'يتعلم الصلاة والوضوء',
        hasHealth: 'no', finStatus: 'weak', finDesc: 'دخل محدود بعد الانفصال',
        aidType: 'مساعدة غذائية', finUpdated: '2026-07-20', attStatus: 'rare',
        prayers: 'الجمعة أحياناً', lastAttendance: '2026-07-11' }
    ];
    for (const d of demo) {
      const id = await DB.nextId('MA', 'personCounter');
      const p = Object.assign({
        id, type: 'muslim', createdAt: new Date().toISOString(),
        photo: '', islamCert: '', marriageContract: ''
      }, d, { demo: true, updatedAt: new Date().toISOString() });
      await DB.put('persons', p);
      if (d.attStatus === 'regular') {
        await DB.put('notes', { noteId: UI.uid('n'), personId: id, author: 'الإمام', at: new Date().toISOString(),
          text: 'منتظم في الحضور، يُنصح بإشراكه في تعليم المبتدئين.' });
      }
    }
    // demo course
    const cid = await DB.nextId('CR', 'courseCounter');
    await DB.put('courses', { courseId: cid, name: 'دورة أساسيات الإسلام', teacher: 'الشيخ إبراهيم منصور',
      days: 'السبت والأحد 18:00', start: '2026-08-01', end: '2026-12-20', createdAt: new Date().toISOString(), demo: true });
    const all = (await DB.all('persons')).filter(p => p.demo);
    for (const p of all.slice(0, 4)) {
      await DB.put('participants', { pid: UI.uid('pt'), courseId: cid, personId: p.id, joinedAt: new Date().toISOString() });
    }
    for (let i = 0; i < 3; i++) {
      const d = new Date(); d.setDate(d.getDate() - (i * 7));
      const sid = UI.uid('s');
      const date = d.toISOString().slice(0, 10);
      await DB.put('sessions', { sessionId: sid, courseId: cid, date, createdAt: new Date().toISOString() });
      for (const p of all.slice(0, 4)) {
        const present = (i === 0) ? (p.carnet !== 'DEMO-1003') : (i === 1 ? true : (p.carnet === 'DEMO-1001' || p.carnet === 'DEMO-1004'));
        await DB.put('attendance', { aid: UI.uid('a'), sessionId: sid, courseId: cid, personId: p.id,
          status: present ? 'present' : 'absent', at: new Date().toISOString() });
      }
    }
  };

  /* ---------- Shell bindings ---------- */
  function bindShell() {
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.onclick = () => App.go(btn.dataset.view);
    });
    document.getElementById('langSwitch').querySelectorAll('button').forEach(b => {
      b.onclick = () => {
        I18N.set(b.dataset.lang);
        document.querySelectorAll('#langSwitch button').forEach(x => x.classList.toggle('active', x.dataset.lang === I18N.lang));
        App.render();
      };
    });
    const search = document.getElementById('globalSearch');
    const clear = document.getElementById('clearSearch');
    search.addEventListener('input', UI.debounce(() => {
      App.q = search.value;
      clear.hidden = !App.q;
      if (['muslims', 'nonmuslims', 'courses'].includes(App.view)) App.render();
      else if (App.q.trim()) App.go('muslims');
    }, 180));
    search.addEventListener('keydown', e => { if (e.key === 'Escape') { search.value = ''; App.q = ''; clear.hidden = true; App.render(); } });
    clear.onclick = () => { search.value = ''; App.q = ''; clear.hidden = true; App.render(); };
    document.getElementById('menuBtn').onclick = () => document.getElementById('sidebar').classList.toggle('open');
  }

  function applyStatic() {
    document.getElementById('brandLogo').innerHTML = App.logo();
    document.getElementById('topLogo').innerHTML = App.logo();
    document.querySelectorAll('#langSwitch button').forEach(x => x.classList.toggle('active', x.dataset.lang === I18N.lang));
  }

  /* ---------- Boot ---------- */
  App.init = async function () {
    await DB.init();
    I18N.init();
    applyStatic();
    bindShell();
    await App.maybeSeed();
    if (App.isPinSet() && !App.pinUnlocked) { document.getElementById('app').hidden = true; showLock(); }
    else reveal();
  };

  window.addEventListener('DOMContentLoaded', () => { App.init().catch(e => { console.error(e); alert('Init error: ' + e.message); }); });
})();
