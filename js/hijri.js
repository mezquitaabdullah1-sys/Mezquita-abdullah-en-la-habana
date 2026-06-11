// 📅 Hijri — festividades y virtudes
const ISLAMIC_HOLIDAYS = [
  { month: 1, day: 1, name: 'Año nuevo islámico' },
  { month: 1, day: 10, name: 'Día de Ashura' },
  { month: 3, day: 12, name: 'Mawlid an-Nabi' },
  { month: 7, day: 27, name: "Isra y Mi'raj" },
  { month: 8, day: 15, name: "Laylat al-Bara'ah" },
  { month: 9, day: 1, name: 'Inicio de Ramadán' },
  { month: 9, day: 27, name: 'Laylat al-Qadr (probable)' },
  { month: 10, day: 1, name: 'Eid al-Fitr' },
  { month: 12, day: 9, name: 'Día de Arafa' },
  { month: 12, day: 10, name: 'Eid al-Adha' },
];

const FASTING_WEEKDAYS = [1, 4]; // Lunes y jueves
const WHITE_DAYS = [13, 14, 15];

function getHoliday(hijriMonth, hijriDay) {
  return ISLAMIC_HOLIDAYS.find(h => h.month === hijriMonth && h.day === hijriDay);
}

function isFastingDay(hijriDay, dayOfWeek) {
  if (FASTING_WEEKDAYS.includes(dayOfWeek)) return 'weekday';
  if (WHITE_DAYS.includes(hijriDay)) return 'white';
  return false;
}

function getDailyVirtue(hijriMonth, hijriDay, dayOfWeek) {
  const holiday = getHoliday(hijriMonth, hijriDay);
  if (holiday) {
    return {
      title: holiday.name,
      verse: 'Día bendecido. Aumenta tus oraciones y du\'as hoy.',
      source: 'Sunnah',
    };
  }
  if (dayOfWeek === 1) {
    return {
      title: 'Lunes — Día recomendado para ayunar',
      verse: 'El Profeta ﷺ dijo: "Las obras son presentadas los lunes y jueves, y me gusta que mis obras sean presentadas mientras estoy ayunando."',
      source: 'At-Tirmidhi',
    };
  }
  if (dayOfWeek === 4) {
    return {
      title: 'Jueves — Día recomendado para ayunar',
      verse: 'Las obras son presentadas a Allah los lunes y jueves.',
      source: 'At-Tirmidhi',
    };
  }
  if (dayOfWeek === 5) {
    return {
      title: 'Viernes — Mejor día de la semana',
      verse: 'El mejor día en que sale el sol es el viernes; en él fue creado Adán y en él entró al Paraíso.',
      source: 'Sahih Muslim',
    };
  }
  if (WHITE_DAYS.includes(hijriDay)) {
    return {
      title: 'Día blanco — Ayuno recomendado',
      verse: 'El Profeta ﷺ ordenó ayunar los días blancos: el 13, 14 y 15 de cada mes lunar.',
      source: "An-Nasa'i",
    };
  }
  if (hijriMonth === 9) {
    return {
      title: `Ramadán — Día ${hijriDay}`,
      verse: '"¡Creyentes! Se os ha prescrito el ayuno, al igual que se prescribió a los que os precedieron." (Q 2:183)',
      source: 'Al-Baqarah',
    };
  }
  return {
    title: 'Día bendecido',
    verse: '"Quien recuerda a Allah es como el vivo, y quien no lo recuerda es como el muerto."',
    source: 'Sahih al-Bukhari',
  };
}
