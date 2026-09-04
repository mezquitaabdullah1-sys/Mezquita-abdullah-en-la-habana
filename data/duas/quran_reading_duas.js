/**
 * 🤲 أدعية قراءة القرآن — Quba
 *
 * ثلاثة أدعية مأثورة/مشهورة مرتبطة بتلاوة القرآن الكريم:
 *  1) دعاء بدء القراءة (المأثور عن النبي ﷺ — رواه ابن ماجه)
 *  2) دعاء الفراغ من القراءة (كفارة المجلس — رواه الترمذي وأبو داود)
 *  3) دعاء ختم القرآن (المشهور — ذكره ابن تيمية في مجموع الفتاوى)
 *
 * @theological_review PENDIENTE — يُستحسن عرضها على لجنة شرعية قبل الإنتاج.
 */
const QURAN_READING_DUAS = [
  {
    id: 'before_reading',
    icon: '<i class="fas fa-book-open"></i>',
    title_es: 'Du\'a antes de comenzar la lectura',
    title_ar: 'دعاء بدء القراءة',
    title_en: 'Before starting the recitation',
    preamble: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
    arabic: 'اللَّهُمَّ افْتَحْ عَلَيَّ حِكْمَتَكَ، وَانْشُرْ عَلَيَّ رَحْمَتَكَ، وَذَكِّرْنِي مَا نَسِيتُ، يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    transliteration: "Allahumma-ftah 'alayya hikmatak, wanshur 'alayya rahmatak, wa dhakkirni ma nasitu, ya dhal-jalali wal-ikram",
    translation_es: 'Oh Allah, ábreme Tu sabiduría, extiende sobre mí Tu misericordia y recuérdame lo que haya olvidado, oh Poseedor de la majestad y la generosidad.',
    translation_ar: '',
    translation_en: 'O Allah, open Your wisdom to me, spread Your mercy over me, and remind me of what I have forgotten, O Possessor of majesty and honor.',
    source: 'Sunan Ibn Majah — del Profeta ﷺ',
  },
  {
    id: 'after_reading',
    icon: '<i class="fas fa-hands"></i>',
    title_es: 'Du\'a al terminar la lectura',
    title_ar: 'دعاء الفراغ من القراءة',
    title_en: 'After finishing the recitation',
    preamble: '',
    arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ',
    transliteration: 'Subhanaka Allahumma wa bihamdika, ashhadu an la ilaha illa Anta, astaghfiruka wa atubu ilayk',
    translation_es: 'Glorificado seas, oh Allah, y con Tu alabanza. Testifico que no hay divinidad digna de adoración sino Tú. Te pido perdón y a Ti me vuelvo arrepentido.',
    translation_ar: '',
    translation_en: 'Glory be to You, O Allah, and praise. I bear witness that there is no god but You. I seek Your forgiveness and repent to You.',
    source: 'At-Tirmidhi y Abu Dawud — expiación de la reunión',
  },
  {
    id: 'khatm',
    icon: '<i class="fas fa-star-and-crescent"></i>',
    title_es: 'Du\'a de completar el Corán (Jatm)',
    title_ar: 'دعاء ختم القرآن',
    title_en: "Du'a upon completing the Quran",
    preamble: '',
    arabic: 'اللَّهُمَّ ارْحَمْنِي بِالْقُرْآنِ، وَاجْعَلْهُ لِي إِمَامًا وَنُورًا وَهُدًى وَرَحْمَةً، اللَّهُمَّ ذَكِّرْنِي مِنْهُ مَا نُسِّيتُ، وَعَلِّمْنِي مِنْهُ مَا جَهِلْتُ، وَارْزُقْنِي تِلَاوَتَهُ آنَاءَ اللَّيْلِ وَأَطْرَافَ النَّهَارِ، وَاجْعَلْهُ لِي حُجَّةً يَا رَبَّ الْعَالَمِينَ',
    transliteration: "Allahumma-rhamni bil-Qur'an, waj'alhu li imaman wa nuran wa hudan wa rahmah. Allahumma dhakkirni minhu ma nussitu, wa 'allimni minhu ma jahiltu, warzuqni tilawatahu ana'a al-layli wa atrafa an-nahar, waj'alhu li hujjatan ya Rabbal-'alamin",
    translation_es: 'Oh Allah, ten misericordia de mí por el Corán y haz que sea para mí un imán, una luz, una guía y una misericordia. Oh Allah, recuérdame de él lo que haya olvidado, enséñame de él lo que ignore, concédeme recitarlo durante las horas de la noche y los extremos del día, y haz que sea una prueba a mi favor, oh Señor de los mundos.',
    translation_ar: '',
    translation_en: 'O Allah, have mercy on me through the Quran and make it for me a leader, a light, guidance and mercy. O Allah, remind me of what I have forgotten of it, teach me what I am ignorant of, grant me its recitation during the hours of the night and the ends of the day, and make it an argument in my favor, O Lord of the worlds.',
    source: "Mencionado en Majmu' al-Fatawa de Ibn Taymiyyah",
  },
];
