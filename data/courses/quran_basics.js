// 📖 Quran basics — Reading, Tajwid intro, short surahs
const COURSE_QURAN_BASICS = {
  id: 'quran_basics',
  icon: '<i class="fas fa-book-open-reader"></i>',
  mascotPose: 'thinking',
  color: '#D4AF37',
  ageGroup: 'all',
  durationMin: 30,
  difficulty: 'beginner',
  title: { es: 'Aprende a Leer el Corán', ar: 'تعلّم قراءة القرآن', en: 'Learn to Read the Quran' },
  description: {
    es: 'Letras, tajwid básico y las suras cortas más importantes',
    ar: 'الحروف، أساسيات التجويد، وأهم السور القصيرة',
    en: 'Letters, basic Tajwid, and the most important short surahs',
  },
  stations: [
    {
      id: 'arabic_letters',
      icon: '<i class="fas fa-font"></i>',
      title: { es: 'Las Letras Árabes', ar: 'الحروف العربية', en: 'Arabic Letters' },
      mascotIntro: { es: 'El alfabeto árabe tiene 28 letras. ¡Comencemos!', ar: 'الأبجدية العربية فيها 28 حرفاً. هيا نبدأ!', en: 'The Arabic alphabet has 28 letters. Let\'s start!' },
      lessons: [
        {
          type: 'card',
          title: { es: 'Las 28 Letras', ar: 'الحروف الـ28', en: 'The 28 Letters' },
          content: {
            es: 'ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن هـ و ي',
            ar: 'ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن هـ و ي',
            en: 'ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن هـ و ي',
          },
          source: 'Tradición del Tajwid',
        },
        {
          type: 'flashcards',
          title: { es: 'Reconoce las primeras letras', ar: 'تعرّف على الحروف الأولى', en: 'Recognize the first letters' },
          cards: [
            { front: 'ا', back: { es: 'Alif — "A"', ar: 'ألف', en: 'Alif — "A"' } },
            { front: 'ب', back: { es: 'Ba — "B"', ar: 'باء', en: 'Ba — "B"' } },
            { front: 'ت', back: { es: 'Ta — "T"', ar: 'تاء', en: 'Ta — "T"' } },
            { front: 'ث', back: { es: 'Tha — "TH"', ar: 'ثاء', en: 'Tha — "TH"' } },
            { front: 'ج', back: { es: 'Jim — "J"', ar: 'جيم', en: 'Jim — "J"' } },
            { front: 'ح', back: { es: 'Ha — "H" (gutural)', ar: 'حاء', en: 'Ha — "H" (deep)' } },
          ],
        },
        {
          type: 'quiz',
          question: { es: '¿Cuántas letras tiene el alfabeto árabe?', ar: 'كم عدد حروف الأبجدية العربية؟', en: 'How many letters in the Arabic alphabet?' },
          options: ['24', '26', '28', '30'],
          correct: 2,
          feedback: { es: '28 letras. Algunas tienen sonidos únicos sin equivalente en español.', ar: '28 حرفاً.', en: '28 letters. Some have unique sounds.' },
        },
      ],
    },
    {
      id: 'tajwid_intro',
      icon: '<i class="fas fa-music"></i>',
      title: { es: 'Introducción al Tajwid', ar: 'مقدمة في التجويد', en: 'Tajwid Introduction' },
      mascotIntro: { es: 'El Tajwid es el arte de pronunciar correctamente el Corán.', ar: 'التجويد هو فنّ نطق القرآن بشكل صحيح.', en: 'Tajwid is the art of pronouncing the Quran correctly.' },
      lessons: [
        {
          type: 'card',
          title: { es: 'Las 3 reglas básicas', ar: 'القواعد الثلاث الأساسية', en: 'The 3 basic rules' },
          content: {
            es: '1) ⏱️ Madd (alargamiento): algunas letras se alargan 2, 4 o 6 tiempos.\n2) 🔁 Idgham (asimilación): unir dos letras parecidas.\n3) 🌬️ Ikhfa (ocultación): pronunciar la nun con un ligero zumbido nasal.',
            ar: '1) ⏱️ المدّ: تطويل بعض الحروف 2 أو 4 أو 6 حركات.\n2) 🔁 الإدغام: دمج حرفين متماثلين.\n3) 🌬️ الإخفاء: نطق النون بغنّة خفيفة.',
            en: '1) ⏱️ Madd (elongation): some letters extend for 2, 4 or 6 counts.\n2) 🔁 Idgham (merging): joining two similar letters.\n3) 🌬️ Ikhfa (concealment): pronouncing nun with a slight nasal sound.',
          },
          source: 'Jazariyyah & traditional Tajwid manuals',
        },
        {
          type: 'quiz',
          question: { es: '¿Qué significa "Tajwid"?', ar: 'ما معنى التجويد؟', en: 'What does "Tajwid" mean?' },
          options: [
            { es: 'Memorizar el Corán', ar: 'حفظ القرآن', en: 'Memorize the Quran' },
            { es: 'Pronunciar correctamente', ar: 'النطق الصحيح', en: 'Correct pronunciation' },
            { es: 'Traducir el Corán', ar: 'ترجمة القرآن', en: 'Translate the Quran' },
            { es: 'Escribir el Corán', ar: 'كتابة القرآن', en: 'Write the Quran' },
          ],
          correct: 1,
          feedback: { es: 'Tajwid significa "embellecer / perfeccionar" la pronunciación.', ar: 'التجويد يعني إتقان وتحسين النطق.', en: 'Tajwid means "to beautify/perfect" pronunciation.' },
        },
      ],
    },
    {
      id: 'short_surahs',
      icon: '<i class="fas fa-sparkles"></i>',
      title: { es: 'Las Suras Cortas', ar: 'السور القصيرة', en: 'The Short Surahs' },
      mascotIntro: { es: 'Empecemos con Al-Fatiha — recitada en cada oración.', ar: 'لنبدأ بالفاتحة — تُقرأ في كل صلاة.', en: 'Let\'s start with Al-Fatiha — recited in every prayer.' },
      lessons: [
        {
          type: 'card',
          title: { es: 'Al-Fatiha (La Apertura) — 7 versículos', ar: 'الفاتحة — 7 آيات', en: 'Al-Fatiha (The Opening) — 7 verses' },
          content: {
            es: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ\nالرَّحْمَٰنِ الرَّحِيمِ\nمَالِكِ يَوْمِ الدِّينِ\nإِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ\nاهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ\nصِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
            ar: 'الحمد لله رب العالمين، الرحمن الرحيم، مالك يوم الدين...',
            en: 'In the name of Allah, the Most Compassionate, the Most Merciful. Praise be to Allah, Lord of all worlds...',
          },
          source: 'Surah Al-Fatiha 1:1-7',
        },
        {
          type: 'quiz',
          question: { es: '¿Cuántos versículos tiene Al-Fatiha?', ar: 'كم آية في الفاتحة؟', en: 'How many verses in Al-Fatiha?' },
          options: ['5', '6', '7', '10'],
          correct: 2,
          feedback: { es: '7 versículos. Por eso se llama "As-Sab\' al-Mathani" (las 7 repetidas).', ar: '7 آيات، تُسمّى السبع المثاني.', en: '7 verses, called "As-Sab\' al-Mathani".' },
        },
      ],
    },
  ],
};

if (typeof window !== 'undefined') window.COURSE_QURAN_BASICS = COURSE_QURAN_BASICS;
