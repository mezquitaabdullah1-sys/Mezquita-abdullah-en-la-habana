// 🌙 Adhkar antes de dormir — TRILINGÜE (es/ar/en)
const ADHKAR_SLEEP = [
  {
    id: 'sleep_ayat_kursi',
    title: { es: 'Ayat al-Kursi', ar: 'آية الكرسي', en: 'Ayat al-Kursi' },
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
    transliteration: 'Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum...',
    translation: {
      es: 'Allah, no hay más divinidad que Él, el Viviente, el Eterno...',
      ar: 'الله لا إله إلا هو الحي القيوم، لا تأخذه سنة ولا نوم...',
      en: 'Allah — there is no god but He, the Ever-Living, the Sustainer of all. Neither drowsiness nor sleep overtakes Him...',
    },
    times: 1,
    benefit: {
      es: 'Quien la recita antes de dormir tiene un guardián de Allah toda la noche.',
      ar: 'من قرأها قبل النوم لم يزل عليه من الله حافظ طوال الليل.',
      en: 'Whoever recites it before sleeping has a guardian from Allah all night.',
    },
    source: 'Bukhari',
  },
  {
    id: 'sleep_quls',
    title: { es: 'Las tres Quls (con soplo en las manos)', ar: 'المعوذات الثلاث (مع النفث في اليدين)', en: 'The three Quls (blowing into the hands)' },
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ • قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ • قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
    transliteration: "Qul huwa Allahu ahad... Qul a'udhu...",
    translation: {
      es: 'Las tres últimas suras del Corán.',
      ar: 'السور الثلاث الأخيرة من القرآن.',
      en: 'The last three surahs of the Quran.',
    },
    times: 3,
    benefit: {
      es: 'El Profeta ﷺ las recitaba, soplaba en sus manos y se frotaba el cuerpo.',
      ar: 'كان النبي ﷺ يقرؤها وينفث في يديه ثم يمسح بهما جسده.',
      en: 'The Prophet ﷺ would recite them, blow into his hands, and rub his body with them.',
    },
    source: 'Bukhari',
  },
  {
    id: 'sleep_subhanallah',
    title: { es: 'Tasbih antes de dormir', ar: 'تسبيح قبل النوم', en: 'Tasbih before sleep' },
    arabic: 'سُبْحَانَ اللَّهِ • الْحَمْدُ لِلَّهِ • اللَّهُ أَكْبَرُ',
    transliteration: 'Subhanallah (33) • Alhamdulillah (33) • Allahu Akbar (34)',
    translation: {
      es: 'Glorificado sea Allah / Alabado sea Allah / Allah es el más Grande',
      ar: 'سبحان الله (33) • الحمد لله (33) • الله أكبر (34)',
      en: 'Glory be to Allah / All praise is for Allah / Allah is the Greatest',
    },
    times: 100,
    benefit: {
      es: 'El Profeta ﷺ lo enseñó a Fatimah: 33+33+34 antes de dormir.',
      ar: 'علّمه النبي ﷺ لفاطمة: 33+33+34 قبل النوم.',
      en: 'The Prophet ﷺ taught it to Fatimah: 33+33+34 before sleeping.',
    },
    source: 'Bukhari',
  },
  {
    id: 'sleep_bismika',
    title: { es: 'Bismika Allahumma...', ar: 'باسمك اللهم...', en: 'Bismika Allahumma (In Your name, O Allah)...' },
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismika Allahumma amutu wa ahya',
    translation: {
      es: 'Con Tu nombre, oh Allah, muero y vivo.',
      ar: 'باسمك اللهم أموت وأحيا.',
      en: 'In Your name, O Allah, I die and I live.',
    },
    times: 1,
    benefit: {
      es: 'Dicho del Profeta ﷺ al acostarse.',
      ar: 'كان يقولها النبي ﷺ عند مضجعه.',
      en: 'The Prophet ﷺ would say it when lying down to sleep.',
    },
    source: 'Bukhari',
  },
  {
    id: 'sleep_amantu',
    title: { es: 'Amantu bi kitabik', ar: 'آمنت بكتابك', en: 'Amantu bi kitabik (I believe in Your Book)' },
    arabic: 'اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ',
    transliteration: 'Allahumma aslamtu nafsi ilayk, wa fawwadtu amri ilayk...',
    translation: {
      es: 'Oh Allah, me he sometido a Ti, he confiado mi asunto a Ti, he vuelto mi rostro hacia Ti, he buscado refugio en Ti, con esperanza y temor. No hay refugio ni salvación de Ti excepto en Ti. He creído en Tu libro que revelaste y en Tu Profeta que enviaste.',
      ar: 'اللهم أسلمت نفسي إليك، وفوضت أمري إليك، ووجهت وجهي إليك، وألجأت ظهري إليك، رغبة ورهبة إليك، لا ملجأ ولا منجا منك إلا إليك، آمنت بكتابك الذي أنزلت، وبنبيك الذي أرسلت.',
      en: 'O Allah, I have submitted myself to You, entrusted my affairs to You, turned my face to You, and sought Your protection, in hope and fear of You. There is no refuge or escape from You except to You. I believe in Your Book which You revealed and in Your Prophet whom You sent.',
    },
    times: 1,
    benefit: {
      es: 'Quien lo dice y muere esa noche, muere en la fitrah (estado natural).',
      ar: 'من قالها فمات من ليلته مات على الفطرة.',
      en: 'Whoever says it and dies that night dies upon the fitrah (natural state).',
    },
    source: 'Bukhari',
  },
];
