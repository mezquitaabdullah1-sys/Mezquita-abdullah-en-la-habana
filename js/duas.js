// 🤲 Du'as curadas
const DAILY_DUAS = [
  {
    id: 'morning_1',
    title: "Du'a de la mañana",
    arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
    transliteration: 'Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu, wa ilayka an-nushur',
    translation: 'Oh Allah, contigo amanecemos y contigo anochecemos, contigo vivimos y contigo morimos, y a Ti es el retorno.',
    source: 'At-Tirmidhi',
  },
  {
    id: 'guidance_1',
    title: 'Para pedir guía',
    arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
    transliteration: 'Ihdina as-sirat al-mustaqim',
    translation: 'Guíanos por el camino recto.',
    source: 'Al-Fatihah 1:6',
  },
  {
    id: 'forgiveness_1',
    title: 'Para pedir perdón',
    arabic: 'رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    transliteration: 'Rabbana zalamna anfusana wa in lam taghfir lana wa tarhamna lanakunanna min al-khasirin',
    translation: 'Señor nuestro, hemos sido injustos con nosotros mismos. Si no nos perdonas y Te apiadas de nosotros, seremos de los perdedores.',
    source: "Al-A'raf 7:23",
  },
  {
    id: 'knowledge_1',
    title: 'Para pedir conocimiento útil',
    arabic: 'رَبِّ زِدْنِي عِلْمًا',
    transliteration: "Rabbi zidni 'ilman",
    translation: 'Señor mío, auméntame en conocimiento.',
    source: 'Taha 20:114',
  },
  {
    id: 'parents_1',
    title: 'Por los padres',
    arabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbi-rhamhuma kama rabbayani saghira',
    translation: 'Señor mío, ten misericordia de ellos como ellos la tuvieron de mí cuando era pequeño.',
    source: 'Al-Isra 17:24',
  },
  {
    id: 'protection_1',
    title: 'Protección al salir de casa',
    arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: "Bismillah, tawakkaltu 'ala Allah, wa la hawla wa la quwwata illa billah",
    translation: 'En el nombre de Allah, en Él confío. No hay poder ni fuerza sino con Allah.',
    source: 'Abu Dawud',
  },
  {
    id: 'anxiety_1',
    title: 'Para alivio de la ansiedad',
    arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    transliteration: "Hasbuna Allah wa ni'ma al-wakil",
    translation: 'Allah nos basta, ¡qué excelente Protector!',
    source: 'Al-Imran 3:173',
  },
];

function getDuaOfTheDay() {
  const today = new Date();
  const day = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  return DAILY_DUAS[day % DAILY_DUAS.length];
}
