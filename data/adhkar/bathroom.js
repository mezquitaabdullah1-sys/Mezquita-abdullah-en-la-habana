// 🚪 Adhkar al entrar y salir del baño (Adhkar Dukhul wa Khuruj al-Khala) — TRILINGÜE (es/ar/en)
const ADHKAR_BATHROOM = [
  {
    id: 'enter_bathroom',
    title: { es: 'Al entrar al baño', ar: 'عند دخول الخلاء', en: 'Upon entering the bathroom' },
    arabic: 'بِسْمِ اللَّهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    transliteration: "Bismillah, Allahumma inni a'udhu bika mina-l-khubuthi wa-l-khaba'ith",
    translation: {
      es: 'En el nombre de Allah. ¡Oh Allah! Me refugio en Ti de los demonios machos y hembras.',
      ar: 'بسم الله، اللهم إني أعوذ بك من الخبث والخبائث.',
      en: 'In the name of Allah. O Allah! I seek refuge in You from the male and female devils.',
    },
    times: 1,
    benefit: {
      es: "Barrera de protección entre los ojos de los yinn y la 'awra (partes íntimas) del creyente. Se dice antes de entrar (o antes de descubrirse si es al aire libre).",
      ar: 'ستر بين أعين الجن وعورة المؤمن. يُقال قبل الدخول (أو قبل كشف العورة إن كان في العراء).',
      en: 'A barrier of protection between the eyes of the jinn and the believer\'s awrah (private parts). Said before entering (or before uncovering if outdoors).',
    },
    source: 'Bukhari 142',
  },
  {
    id: 'exit_bathroom',
    title: { es: 'Al salir del baño', ar: 'عند الخروج من الخلاء', en: 'Upon leaving the bathroom' },
    arabic: 'غُفْرَانَكَ',
    transliteration: 'Ghufranak',
    translation: {
      es: 'Tu perdón (¡oh Allah!).',
      ar: 'غفرانك.',
      en: 'Your forgiveness (O Allah!).',
    },
    times: 1,
    benefit: {
      es: 'Se pide perdón porque uno estuvo un tiempo sin recordar a Allah. Muestra la humildad del creyente.',
      ar: 'يُستغفر لأن المرء مكث بلا ذكر لله، وهذا من تواضع المؤمن.',
      en: 'Forgiveness is sought because one spent time unable to remember Allah. It shows the believer\'s humility.',
    },
    source: 'Tirmidhi 7',
  },
  {
    id: 'exit_bathroom_long',
    title: { es: 'Súplica extendida al salir del baño', ar: 'دعاء مطوّل عند الخروج من الخلاء', en: 'Extended supplication upon leaving the bathroom' },
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَذْهَبَ عَنِّي الْأَذَى وَعَافَانِي',
    transliteration: "Al-hamdu lillahi-lladhi adhhaba 'anni-l-adha wa 'afani",
    translation: {
      es: 'Alabado sea Allah, Quien alejó de mí el daño y me dio salud.',
      ar: 'الحمد لله الذي أذهب عني الأذى وعافاني.',
      en: 'All praise is for Allah, Who removed harm from me and granted me health.',
    },
    times: 1,
    benefit: {
      es: 'Agradecimiento por la bendición de la salud digestiva y la eliminación del daño del cuerpo.',
      ar: 'شكر على نعمة الصحة وإخراج الأذى من الجسد.',
      en: 'Gratitude for the blessing of digestive health and the removal of harm from the body.',
    },
    source: 'Ibn Majah 301',
  },
  {
    id: 'after_wudu_bathroom',
    title: { es: 'Después del wudu (que suele seguir al baño)', ar: 'بعد الوضوء (الذي يلي الخلاء غالباً)', en: 'After wudu (which often follows the bathroom)' },
    arabic: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ، وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
    transliteration: "Ashhadu an la ilaha illa Allah wahdahu la sharika lah, wa ashhadu anna Muhammadan 'abduhu wa rasuluh. Allahumma-j'alni mina-t-tawwabin, waj'alni mina-l-mutatahhirin",
    translation: {
      es: 'Atestiguo que no hay divinidad sino Allah, Único, sin asociados, y atestiguo que Muhammad es Su siervo y Mensajero. ¡Oh Allah! Hazme de los que se arrepienten y hazme de los que se purifican.',
      ar: 'أشهد أن لا إله إلا الله وحده لا شريك له، وأشهد أن محمداً عبده ورسوله. اللهم اجعلني من التوابين، واجعلني من المتطهرين.',
      en: 'I bear witness that there is no god but Allah alone, without partner, and I bear witness that Muhammad is His servant and Messenger. O Allah! Make me among those who repent and make me among those who purify themselves.',
    },
    times: 1,
    benefit: {
      es: 'Se le abren las ocho puertas del Paraíso y puede entrar por la que quiera.',
      ar: 'تُفتح له أبواب الجنة الثمانية يدخل من أيها شاء.',
      en: 'The eight gates of Paradise are opened for him to enter through whichever he wishes.',
    },
    source: 'Muslim 234',
  },
];
