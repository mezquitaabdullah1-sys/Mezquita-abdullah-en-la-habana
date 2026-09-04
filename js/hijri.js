// 📅 Hijri — festividades y virtudes (multi-idioma)
// v14: virtues localized (es/ar/en), day name from JS Date (always matches),
// mapped by JS getDay() (0=Sun ... 6=Sat).

const ISLAMIC_HOLIDAYS = [
  { month: 1,  day: 1,  name_es: 'Año Nuevo Islámico',         name_ar: 'رأس السنة الهجرية',       name_en: 'Islamic New Year' },
  { month: 1,  day: 10, name_es: 'Día de Ashura',              name_ar: 'يوم عاشوراء',              name_en: 'Day of Ashura' },
  { month: 3,  day: 12, name_es: 'Mawlid an-Nabi ﷺ',            name_ar: 'المولد النبوي الشريف',     name_en: 'Mawlid an-Nabi ﷺ' },
  { month: 7,  day: 27, name_es: 'Isra y Miʿraj',              name_ar: 'الإسراء والمعراج',         name_en: 'Isra & Miʿraj' },
  { month: 8,  day: 15, name_es: 'Laylat al-Baraʾah',          name_ar: 'ليلة البراءة',             name_en: 'Laylat al-Baraʾah' },
  { month: 9,  day: 1,  name_es: 'Inicio de Ramadán',          name_ar: 'أول رمضان المبارك',        name_en: 'Start of Ramadan' },
  { month: 9,  day: 27, name_es: 'Laylat al-Qadr (probable)',  name_ar: 'ليلة القدر (المرجحة)',     name_en: 'Laylat al-Qadr (likely)' },
  { month: 10, day: 1,  name_es: 'Eid al-Fitr',                name_ar: 'عيد الفطر',                name_en: 'Eid al-Fitr' },
  { month: 12, day: 9,  name_es: 'Día de Arafa',               name_ar: 'يوم عرفة',                 name_en: 'Day of Arafah' },
  { month: 12, day: 10, name_es: 'Eid al-Adha',                name_ar: 'عيد الأضحى',               name_en: 'Eid al-Adha' },
];

const WHITE_DAYS = [13, 14, 15];

// JS getDay() → 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
// Monday=1, Thursday=4 → recommended for voluntary fasting
const FASTING_WEEKDAYS = [1, 4];

// Localized weekday names (JS getDay() index)
const WEEKDAY_NAMES = {
  es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};

function getWeekdayName(dayOfWeek, lang) {
  const l = (lang && ['es','ar','en'].includes(lang)) ? lang : 'es';
  return (WEEKDAY_NAMES[l] || WEEKDAY_NAMES.es)[dayOfWeek] || '';
}

function getHoliday(hijriMonth, hijriDay) {
  return ISLAMIC_HOLIDAYS.find(h => h.month === hijriMonth && h.day === hijriDay);
}

function getHolidayName(hijriMonth, hijriDay, lang) {
  const h = getHoliday(hijriMonth, hijriDay);
  if (!h) return null;
  const l = (lang && ['es','ar','en'].includes(lang)) ? lang : 'es';
  return h[`name_${l}`] || h.name_es;
}

function isFastingDay(hijriDay, dayOfWeek) {
  if (FASTING_WEEKDAYS.includes(dayOfWeek)) return 'weekday';
  if (WHITE_DAYS.includes(hijriDay)) return 'white';
  return false;
}

// Multi-language virtue database, keyed by JS getDay() and special hijri conditions.
// title/verse/source per language.
const VIRTUES = {
  monday: {
    es: { title: 'Lunes — Día recomendado para ayunar', verse: 'El Profeta ﷺ dijo: «Las obras son presentadas los lunes y jueves, y me gusta que mis obras sean presentadas mientras estoy ayunando».', source: 'Sunan at-Tirmidhi 747 (hasan)' },
    ar: { title: 'الاثنين — يوم مستحب للصيام',           verse: 'قال النبي ﷺ: «تُعرض الأعمال يوم الاثنين والخميس، فأحبّ أن يُعرض عملي وأنا صائم».', source: 'سنن الترمذي ٧٤٧ (حسن)' },
    en: { title: 'Monday — Recommended day of fasting',   verse: 'The Prophet ﷺ said: "Deeds are presented on Mondays and Thursdays, so I love that my deeds be presented while I am fasting."', source: 'Sunan at-Tirmidhi 747 (hasan)' },
  },
  thursday: {
    es: { title: 'Jueves — Día recomendado para ayunar', verse: 'Las obras son presentadas ante Allah los lunes y jueves; el Profeta ﷺ ayunaba estos días.', source: 'Sunan at-Tirmidhi 747' },
    ar: { title: 'الخميس — يوم مستحب للصيام',            verse: 'تُعرض الأعمال على الله يوم الاثنين والخميس، وكان النبي ﷺ يصوم هذين اليومين.', source: 'سنن الترمذي ٧٤٧' },
    en: { title: 'Thursday — Recommended day of fasting', verse: 'Deeds are presented to Allah on Mondays and Thursdays; the Prophet ﷺ used to fast on these days.', source: 'Sunan at-Tirmidhi 747' },
  },
  friday: {
    es: { title: 'Viernes — El mejor día de la semana',   verse: '«El mejor día en que sale el sol es el viernes: en él fue creado Adán, en él entró al Paraíso y en él fue expulsado».', source: 'Sahih Muslim 854' },
    ar: { title: 'الجمعة — سيّد أيام الأسبوع',           verse: 'قال ﷺ: «خير يوم طلعت عليه الشمس يوم الجمعة، فيه خُلق آدم، وفيه أُدخل الجنة، وفيه أُخرج منها».', source: 'صحيح مسلم ٨٥٤' },
    en: { title: 'Friday — The best day of the week',     verse: '"The best day the sun rises upon is Friday: on it Adam was created, on it he entered Paradise, and on it he was expelled."', source: 'Sahih Muslim 854' },
  },
  whiteDay: {
    es: { title: 'Día blanco — Ayuno recomendado',        verse: 'El Profeta ﷺ ordenó ayunar los días blancos: el 13, 14 y 15 de cada mes lunar.', source: 'Sunan an-Nasaʾi 2422 (sahih)' },
    ar: { title: 'الأيام البيض — صيامها مستحب',          verse: 'كان النبي ﷺ يأمر بصيام الأيام البيض: الثالث عشر والرابع عشر والخامس عشر من كل شهر.', source: 'سنن النسائي ٢٤٢٢ (صحيح)' },
    en: { title: 'White Day — Recommended fast',          verse: 'The Prophet ﷺ ordered fasting the white days: the 13th, 14th and 15th of every lunar month.', source: 'Sunan an-Nasaʾi 2422 (sahih)' },
  },
  ramadan: {
    es: { title: 'Ramadán — mes bendecido',               verse: '«¡Creyentes! Se os ha prescrito el ayuno, al igual que se prescribió a los que os precedieron; quizás así seáis piadosos». (Q 2:183)', source: 'Al-Baqarah 2:183' },
    ar: { title: 'رمضان — الشهر المبارك',                 verse: '{يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِنْ قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ}', source: 'البقرة ١٨٣' },
    en: { title: 'Ramadan — the blessed month',           verse: '"O you who believe! Fasting is prescribed for you as it was prescribed for those before you, that you may attain piety." (Q 2:183)', source: 'Al-Baqarah 2:183' },
  },
  default: {
    es: { title: 'Día bendecido',                          verse: '«Quien recuerda a su Señor y quien no lo recuerda son como el vivo y el muerto».', source: 'Sahih al-Bukhari 6407' },
    ar: { title: 'يوم مبارك',                              verse: 'قال ﷺ: «مثل الذي يذكر ربه والذي لا يذكر ربه مثل الحي والميت».', source: 'صحيح البخاري ٦٤٠٧' },
    en: { title: 'A blessed day',                          verse: '"The example of one who remembers his Lord and one who does not is like the living and the dead."', source: 'Sahih al-Bukhari 6407' },
  },
};

function _pickLang(lang) {
  return ['es','ar','en'].includes(lang) ? lang : 'es';
}

/**
 * Multi-language daily virtue.
 * @param {number} hijriMonth 1-12
 * @param {number} hijriDay 1-30
 * @param {number} dayOfWeek JS getDay(): 0=Sun ... 6=Sat
 * @param {string} lang 'es' | 'ar' | 'en'
 * @returns {{title,verse,source}}
 */
function getDailyVirtue(hijriMonth, hijriDay, dayOfWeek, lang) {
  const l = _pickLang(lang);
  const holidayName = getHolidayName(hijriMonth, hijriDay, l);
  if (holidayName) {
    const blessed = {
      es: 'Día bendecido. Aumenta tus oraciones, du\'as y caridad hoy.',
      ar: 'يومٌ مبارك. أكثر من الصلاة والدعاء والصدقة اليوم.',
      en: 'A blessed day. Increase your prayers, du\'as and charity today.',
    };
    return { title: holidayName, verse: blessed[l], source: 'Sunnah' };
  }

  // Weekday-specific virtues take priority
  if (dayOfWeek === 1) return VIRTUES.monday[l];
  if (dayOfWeek === 4) return VIRTUES.thursday[l];
  if (dayOfWeek === 5) return VIRTUES.friday[l];

  // Ramadan month
  if (hijriMonth === 9) {
    const v = VIRTUES.ramadan[l];
    // Prefix with day number
    const dayLabel = { es: 'Día', ar: 'اليوم', en: 'Day' }[l];
    return { ...v, title: `${v.title} — ${dayLabel} ${hijriDay}` };
  }

  // White days (any month)
  if (WHITE_DAYS.includes(hijriDay)) return VIRTUES.whiteDay[l];

  return VIRTUES.default[l];
}

if (typeof window !== 'undefined') {
  window.getDailyVirtue = getDailyVirtue;
  window.getWeekdayName = getWeekdayName;
  window.getHolidayName = getHolidayName;
  window.getHoliday = getHoliday;
  window.isFastingDay = isFastingDay;
}
