/**
 * 🌟 Curso: Los 99 Nombres de Allah (Asma ul-Husna) — Quba v20 (rebuilt)
 *
 * Basado en:
 * - Sahih al-Bukhari 2736 / Muslim 2677 (Hadith de los 99 nombres)
 * - Ibn Kathir · Al-Bidayah wan-Nihayah
 * - Al-Qurtubi · Al-Asnā fī Sharh Asmā' Allāh al-Ḥusnā
 * - Al-Bayhaqi · Al-Asmā' wa-ṣ-Ṣifāt
 *
 * @audience Todos los públicos
 * @level Beginner-Intermediate
 * @duration ~40 min
 */

const COURSE_NAMES = {
  id: 'names_of_allah',
  slug: 'asma-ul-husna',
  icon: '<i class="fas fa-sparkles"></i>',
  mascotPose: 'thinking',
  color: '#1A6B52',
  ageGroup: 'all',
  durationMin: 40,
  difficulty: 'beginner',

  title: {
    es: 'Los 99 Nombres de Allah',
    ar: 'أسماء الله الحسنى',
    en: 'The 99 Names of Allah',
  },
  description: {
    es: 'Asma ul-Husna — Los nombres más bellos de Allah, sus significados y cómo conocer a Allah.',
    ar: 'الأسماء الحسنى — أجمل أسماء الله، معانيها وكيف نتعرّف إلى الله من خلالها.',
    en: 'Asma ul-Husna — The most beautiful names of Allah, their meanings, and how to know Allah.',
  },

  stations: [
    // ═══════════════════════════════════════════════════════════════
    // 🌟 STATION 1: Introducción a los Asma ul-Husna
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'names_intro',
      icon: '<i class="fas fa-book-open"></i>',
      title: { es: 'Introducción', ar: 'مقدمة', en: 'Introduction' },
      mascotIntro: {
        es: 'Allah tiene 99 nombres. Aprenderlos es aprender a conocer a Allah mejor.',
        ar: 'لله تسعة وتسعون اسماً. تعلّمها هو تعرّف إلى الله.',
        en: 'Allah has 99 names. Learning them is learning to know Allah better.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'El Hadith de los 99 nombres', ar: 'حديث التسعة والتسعين اسماً', en: 'The Hadith of the 99 names' },
          content: {
            es: '📖 Abu Hurayra (رضي الله عنه) narró que el Profeta ﷺ dijo:\n\n«إِنَّ لِلَّهِ تِسْعَةً وَتِسْعِينَ اسْمًا، مِائَةً إِلَّا وَاحِدًا، مَنْ أَحْصَاهَا دَخَلَ الْجَنَّةَ»\n\n«Allah tiene 99 nombres — cien menos uno. Quien los ENUMERE (aḥṣāhā) entrará al Paraíso.»\n\n(Bukhari 2736, Muslim 2677)\n\n🔑 «Aḥṣāhā» tiene 3 significados según los ulemas:\n\n1️⃣ **Memorizarlos** de memoria.\n2️⃣ **Comprender** sus significados.\n3️⃣ **Aplicarlos** en la vida (adorar a Allah por cada uno).\n\n💡 Los 99 nombres NO son un límite exhaustivo — Allah tiene más nombres. Los 99 son los que llevan una recompensa específica.',
            ar: '📖 عن أبي هريرة (رضي الله عنه) عن النبي ﷺ:\n\n«إِنَّ لِلَّهِ تِسْعَةً وَتِسْعِينَ اسْمًا، مِائَةً إِلَّا وَاحِدًا، مَنْ أَحْصَاهَا دَخَلَ الْجَنَّةَ»\n\n(البخاري 2736، مسلم 2677)\n\n🔑 «أحصاها» فسّرها العلماء بثلاثة معانٍ:\n\n1️⃣ **حفظها** ظاهراً.\n2️⃣ **فهم معانيها**.\n3️⃣ **العمل بمقتضاها** (التعبّد لله بكلّ اسم).\n\n💡 التسعة والتسعون ليست حصراً لأسماء الله — لله أسماء أخرى. لكن هذه المئة إلا واحدة لها فضل مخصوص.',
            en: '📖 Abu Hurayra (رضي الله عنه) narrated that the Prophet ﷺ said:\n\n«Allah has 99 names — one hundred less one. Whoever ENUMERATES (aḥṣāhā) them will enter Paradise.»\n\n(Bukhari 2736, Muslim 2677)\n\n🔑 «Aḥṣāhā» has 3 meanings per scholars:\n\n1️⃣ **Memorize** them.\n2️⃣ **Understand** their meanings.\n3️⃣ **Apply** them in life (worship Allah by each one).\n\n💡 The 99 names are NOT an exhaustive limit — Allah has more names. These 99 carry a specific reward.',
          },
          source: 'Sahih al-Bukhari 2736 · Sahih Muslim 2677',
        },
        {
          type: 'card',
          title: { es: '¿Por qué aprenderlos?', ar: 'لماذا نتعلّمها؟', en: 'Why learn them?' },
          content: {
            es: '🌟 5 razones para aprender los Asma ul-Husna:\n\n1️⃣ **Para conocer a Allah**: cada nombre revela un aspecto de Él.\n\n2️⃣ **Para hacer du\'a con ellos**: «A Allah pertenecen los nombres más bellos, invocadle con ellos.» (Al-A\'raf 7:180)\n\n3️⃣ **Para tranquilizar el corazón**: saber que Él es Ar-Razzaq (el Proveedor), Al-Hakim (el Sabio), Ar-Rahim (el Misericordioso)...\n\n4️⃣ **Para imitar Sus atributos** en lo que nos es apropiado: ser misericordioso, generoso, justo, paciente.\n\n5️⃣ **La gran promesa**: entrar al Paraíso.\n\n📖 «قُلِ ادْعُوا اللَّهَ أَوِ ادْعُوا الرَّحْمَٰنَ ۖ أَيًّا مَّا تَدْعُوا فَلَهُ الْأَسْمَاءُ الْحُسْنَىٰ» (الإسراء 17:110)',
            ar: '🌟 خمسة أسباب لتعلّم الأسماء الحسنى:\n\n1️⃣ **معرفة الله**: كلّ اسم يكشف جانباً منه.\n\n2️⃣ **الدعاء بها**: «وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا» (الأعراف 180).\n\n3️⃣ **طمأنينة القلب**: علمك بأنّه الرزّاق، الحكيم، الرحيم...\n\n4️⃣ **التخلّق بمعانيها** فيما يليق بالعبد: الرحمة، الكرم، العدل، الصبر.\n\n5️⃣ **الوعد العظيم**: دخول الجنّة.\n\n📖 «قُلِ ادْعُوا اللَّهَ أَوِ ادْعُوا الرَّحْمَٰنَ ۖ أَيًّا مَّا تَدْعُوا فَلَهُ الْأَسْمَاءُ الْحُسْنَىٰ» (الإسراء 110)',
            en: '🌟 5 reasons to learn the Asma ul-Husna:\n\n1️⃣ **To know Allah**: each name reveals an aspect of Him.\n\n2️⃣ **To make du\'a with them**: «To Allah belong the most beautiful names, so invoke Him by them.» (Al-A\'raf 7:180)\n\n3️⃣ **To calm the heart**: knowing He is Ar-Razzaq (Provider), Al-Hakim (Wise), Ar-Rahim (Merciful)...\n\n4️⃣ **To imitate His attributes** in what suits us: be merciful, generous, just, patient.\n\n5️⃣ **The great promise**: entering Paradise.\n\n📖 «Say: Call on Allah or call on Ar-Rahman; by whichever name you call, His are the most beautiful names.» (Al-Isra 17:110)',
          },
          source: 'Quran 7:180 & 17:110',
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuántos nombres tiene Allah según el hadith?',
            ar: 'كم اسماً لله حسب الحديث؟',
            en: 'How many names does Allah have per the hadith?',
          },
          options: ['77', '99 (100 - 1)', '100', '1000'],
          correct: 1,
          feedback: {
            es: '99 = «cien menos uno». Recompensa: el Paraíso para quien los enumere (aḥṣāhā).',
            ar: '99 = «مئة إلا واحدة». الجزاء: الجنّة لمن أحصاها.',
            en: '99 = «one hundred less one». Reward: Paradise for whoever enumerates (aḥṣāhā) them.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Qué significa «aḥṣāhā»?',
            ar: 'ما معنى «أحصاها»؟',
            en: 'What does «aḥṣāhā» mean?',
          },
          options: [
            { es: 'Solo memorizarlos', ar: 'مجرّد الحفظ', en: 'Just memorize them' },
            { es: 'Memorizar + comprender + aplicar', ar: 'حفظ + فهم + عمل', en: 'Memorize + understand + apply' },
            { es: 'Escribirlos', ar: 'كتابتها', en: 'Write them down' },
            { es: 'Contarlos con los dedos', ar: 'عدّها بالأصابع', en: 'Count on fingers' },
          ],
          correct: 1,
          feedback: {
            es: 'Los 3 niveles: memoria, comprensión y aplicación práctica en la adoración.',
            ar: 'المراتب الثلاث: الحفظ والفهم والتعبّد.',
            en: 'The 3 levels: memory, understanding, and practical application in worship.',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // 🌟 STATION 2: Los 10 nombres más famosos
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'top_10_names',
      icon: '<i class="fas fa-star"></i>',
      title: { es: 'Los 10 más famosos', ar: 'أشهر عشرة أسماء', en: 'The 10 most famous' },
      mascotIntro: {
        es: 'Empecemos por los 10 nombres que oirás cada día en el Corán y la Salah.',
        ar: 'لنبدأ بأشهر 10 أسماء تسمعها يوميّاً في القرآن والصلاة.',
        en: 'Let\'s start with the 10 names you\'ll hear daily in the Quran and Salah.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: '1. Ar-Rahman (الرَّحْمَنُ) — El Compasivo', ar: '1. الرَّحْمَنُ', en: '1. Ar-Rahman — The Most Compassionate' },
          content: {
            es: '🌸 **Ar-Rahman** — El Compasivo, el de la misericordia UNIVERSAL.\n\n💡 Significado:\nAllah es misericordioso con TODA la creación — musulmanes y no musulmanes, humanos, animales, plantas. Su misericordia hace salir el sol, dar la lluvia y sostener el universo.\n\n📖 «الرَّحْمَٰنُ عَلَى الْعَرْشِ اسْتَوَىٰ» (Ta-Ha 20:5)\n«Ar-Rahman se estableció sobre el Trono.»\n\n🔑 **Cómo aplicar este nombre:**\n• Confía en la Misericordia de Allah en todo momento.\n• Sé compasivo con la creación (personas, animales, plantas).\n• Nunca desesperes de la Rahmah de Allah.',
            ar: '🌸 **الرَّحْمَنُ** — واسع الرحمة على جميع الخلق.\n\n💡 المعنى:\nالله يرحم الخلق كلّهم — المسلم والكافر، الإنسان والحيوان والنبات. رحمته تخرج الشمس وتنزل المطر وتُقيم الكون.\n\n📖 «الرَّحْمَٰنُ عَلَى الْعَرْشِ اسْتَوَىٰ» (طه 5)\n\n🔑 **كيف نتعبّد بهذا الاسم:**\n• الثقة برحمة الله دائماً.\n• الرحمة بالخلق (بشراً وحيواناً ونباتاً).\n• لا نيأس من رحمة الله أبداً.',
            en: '🌸 **Ar-Rahman** — The Most Compassionate, of UNIVERSAL mercy.\n\n💡 Meaning:\nAllah is merciful to ALL creation — Muslim and non-Muslim, humans, animals, plants. His mercy makes the sun rise, brings the rain, and sustains the universe.\n\n📖 «Ar-Rahman is established over the Throne.» (Ta-Ha 20:5)\n\n🔑 **How to apply this name:**\n• Trust in Allah\'s Mercy at all times.\n• Be compassionate to creation (people, animals, plants).\n• Never despair of Allah\'s Rahmah.',
          },
          source: 'Quran 20:5 · Ibn Kathir Tafsir',
        },
        {
          type: 'card',
          title: { es: '2. Ar-Raheem (الرَّحِيمُ) — El Misericordioso', ar: '2. الرَّحِيمُ', en: '2. Ar-Raheem — The Most Merciful' },
          content: {
            es: '💚 **Ar-Raheem** — El Misericordioso, específicamente con los creyentes.\n\n💡 Diferencia con Ar-Rahman:\n• **Ar-Rahman**: misericordia UNIVERSAL en esta vida (con todos).\n• **Ar-Raheem**: misericordia ESPECIAL con los creyentes en esta vida y en la próxima.\n\n📖 «وَكَانَ بِالْمُؤْمِنِينَ رَحِيمًا» (Al-Ahzab 33:43)\n«Y Él es siempre Misericordioso con los creyentes.»\n\n🔑 Ambos nombres se combinan en la Basmala: «بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ»',
            ar: '💚 **الرَّحِيمُ** — الرحمة الخاصّة بالمؤمنين.\n\n💡 الفرق:\n• **الرحمن**: رحمة عامّة في الدنيا لجميع الخلق.\n• **الرحيم**: رحمة خاصّة بالمؤمنين في الدنيا والآخرة.\n\n📖 «وَكَانَ بِالْمُؤْمِنِينَ رَحِيمًا» (الأحزاب 43)\n\n🔑 يجتمعان في البسملة: «بسم الله الرحمن الرحيم».',
            en: '💚 **Ar-Raheem** — The Merciful, specifically to the believers.\n\n💡 Difference with Ar-Rahman:\n• **Ar-Rahman**: UNIVERSAL mercy in this life (to all).\n• **Ar-Raheem**: SPECIAL mercy to believers in this life and the next.\n\n📖 «And He is always Merciful to the believers.» (Al-Ahzab 33:43)\n\n🔑 Both combine in the Basmala: «In the name of Allah, Ar-Rahman, Ar-Raheem».',
          },
          source: 'Quran 33:43',
        },
        {
          type: 'card',
          title: { es: '3-4. Al-Malik & Al-Quddus', ar: '3-4. الملك والقدّوس', en: '3-4. Al-Malik & Al-Quddus' },
          content: {
            es: '👑 **Al-Malik (الْمَلِكُ)** — El Rey absoluto.\n= Soberano de TODO cuanto existe. Los reyes humanos son solo temporales.\n📖 «فَتَعَالَى اللَّهُ الْمَلِكُ الْحَقُّ» (Ta-Ha 20:114)\n\n✨ **Al-Quddus (الْقُدُّوسُ)** — El Santo, el Puro.\n= Libre de TODA imperfección, defecto o similitud con la creación.\n📖 «هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْمَلِكُ الْقُدُّوسُ السَّلَامُ» (Al-Hashr 59:23)\n\n💡 Estos 3 nombres aparecen juntos en Al-Hashr: Al-Malik, Al-Quddus, As-Salam. Fórmula perfecta.',
            ar: '👑 **الْمَلِكُ** — المالك المتصرّف في كلّ شيء.\n= الملوك في الأرض ملكهم مؤقّت وناقص.\n📖 «فَتَعَالَى اللَّهُ الْمَلِكُ الْحَقُّ» (طه 114)\n\n✨ **الْقُدُّوسُ** — المنزّه عن كلّ نقص وعيب وشبيه.\n📖 «هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْمَلِكُ الْقُدُّوسُ السَّلَامُ» (الحشر 23)\n\n💡 اجتمعت الأسماء الثلاثة في سورة الحشر.',
            en: '👑 **Al-Malik (الْمَلِكُ)** — The Absolute King.\n= Sovereign of ALL that exists. Human kings are only temporary.\n📖 «Exalted is Allah, the True King.» (Ta-Ha 20:114)\n\n✨ **Al-Quddus (الْقُدُّوسُ)** — The Holy, the Pure.\n= Free of ALL imperfection, defect, or similarity to creation.\n📖 «He is Allah — there is no deity but Him — Al-Malik, Al-Quddus, As-Salam.» (Al-Hashr 59:23)\n\n💡 These 3 names appear together in Al-Hashr. A perfect formula.',
          },
          source: 'Quran 20:114 · 59:23',
        },
        {
          type: 'card',
          title: { es: '5-6. Al-Aziz & Al-Hakim', ar: '5-6. العزيز والحكيم', en: '5-6. Al-Aziz & Al-Hakim' },
          content: {
            es: '⚔️ **Al-Aziz (الْعَزِيزُ)** — El Todopoderoso, Invencible.\n= NADA puede vencerlo. Ningún poder existe sin Su permiso.\n\n📚 **Al-Hakim (الْحَكِيمُ)** — El Sabio, el Justo Juez.\n= Toda Su ley y decreto tiene sabiduría profunda, aunque no la veamos.\n\n💡 Estos 2 nombres aparecen JUNTOS más de 40 veces en el Corán. ¿Por qué?\n\nPorque el poder sin sabiduría es tiranía. La sabiduría sin poder es debilidad. Allah los UNE — tiene poder Y sabiduría infinitos.\n\n📖 «إِنَّهُ هُوَ الْعَزِيزُ الْحَكِيمُ» (Al-Hashr 59:24)\n\n🔑 Cuando la vida te confunde, recuerda: hay un plan sabio de un Todo Sabio y Todopoderoso.',
            ar: '⚔️ **الْعَزِيزُ** — الغالب الذي لا يُغلب.\n= لا يوجد قوّة إلا بإذنه.\n\n📚 **الْحَكِيمُ** — ذو الحكمة البالغة في تشريعه وتقديره.\n\n💡 اقترن الاسمان في القرآن أكثر من 40 مرّة. لماذا؟\n\nلأنّ القوّة بلا حكمة ظلم، والحكمة بلا قوّة عجز. الله يجمعهما — القوّة الكاملة مع الحكمة الكاملة.\n\n📖 «إِنَّهُ هُوَ الْعَزِيزُ الْحَكِيمُ» (الحشر 24)\n\n🔑 عندما تحتار في أمر الحياة: خطّة حكيم قدير.',
            en: '⚔️ **Al-Aziz (الْعَزِيزُ)** — The Almighty, Invincible.\n= NOTHING can defeat Him. No power exists without His permission.\n\n📚 **Al-Hakim (الْحَكِيمُ)** — The Wise, the Just Judge.\n= All His law and decree has deep wisdom, even if we don\'t see it.\n\n💡 These 2 names appear TOGETHER over 40 times in the Quran. Why?\n\nBecause power without wisdom is tyranny. Wisdom without power is weakness. Allah UNITES them — infinite power AND wisdom.\n\n📖 «Indeed He is Al-Aziz, Al-Hakim.» (Al-Hashr 59:24)\n\n🔑 When life confuses you, remember: there\'s a wise plan from the All-Wise, All-Mighty.',
          },
          source: 'Quran 59:24',
        },
        {
          type: 'card',
          title: { es: '7-8. Al-Ghafur & At-Tawwab', ar: '7-8. الغفور والتوّاب', en: '7-8. Al-Ghafur & At-Tawwab' },
          content: {
            es: '🕊️ **Al-Ghafur (الْغَفُورُ)** — El Perdonador.\n= Perdona los pecados una y otra vez, sin importar cuán grandes sean.\n\n🌊 **At-Tawwab (التَّوَّابُ)** — El que acepta el arrepentimiento.\n= No solo acepta tu arrepentimiento — se VUELVE hacia ti primero, ¡inspirándote a arrepentirte!\n\n📖 «قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا»\n\n«Diles a Mis siervos que se han excedido contra sí mismos: no perdáis la esperanza en la misericordia de Allah. Ciertamente Allah perdona TODOS los pecados.» (Az-Zumar 39:53)\n\n🔑 No importa cuán manchado creas tener tu corazón — vuelve a Allah. Él te está ESPERANDO.',
            ar: '🕊️ **الْغَفُورُ** — كثير المغفرة.\n= يغفر الذنوب مهما كثرت أو عظمت.\n\n🌊 **التَّوَّابُ** — الذي يقبل التوبة.\n= بل يبدأ بتوفيق العبد للتوبة أوّلاً!\n\n📖 «قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا» (الزمر 53)\n\n🔑 مهما ظننت قلبك مسوَدّاً — عد إلى الله. هو ينتظرك.',
            en: '🕊️ **Al-Ghafur (الْغَفُورُ)** — The Forgiving.\n= Forgives sins over and over, no matter how great.\n\n🌊 **At-Tawwab (التَّوَّابُ)** — The Acceptor of repentance.\n= Not only accepts your repentance — He TURNS to you first, inspiring you to repent!\n\n📖 «Say: O My servants who have transgressed against themselves — do not despair of Allah\'s mercy. Indeed Allah forgives ALL sins.» (Az-Zumar 39:53)\n\n🔑 No matter how stained you think your heart is — return to Allah. He is WAITING for you.',
          },
          source: 'Quran 39:53',
        },
        {
          type: 'card',
          title: { es: '9-10. Al-Wadud & As-Salam', ar: '9-10. الودود والسلام', en: '9-10. Al-Wadud & As-Salam' },
          content: {
            es: '❤️ **Al-Wadud (الْوَدُودُ)** — El Amante.\n= NO es solo que perdona — te AMA. Ama a Sus siervos rectos con un amor puro y activo.\n\n☮️ **As-Salam (السَّلَامُ)** — La Paz, Fuente de toda paz.\n= De Él viene toda seguridad, tranquilidad y salvación. Los habitantes del Paraíso serán saludados por Él: «Salām — palabra de un Señor Misericordioso.» (Ya-Sin 36:58)\n\n📖 «إِنَّ رَبِّي رَحِيمٌ وَدُودٌ» (Hud 11:90)\n«Mi Señor es Misericordioso y Amante.»\n\n🔑 El nombre As-Salam se dice después de cada Salah:\n\n«اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ»\n\n(Muslim 592)',
            ar: '❤️ **الْوَدُودُ** — المُحبُّ لعباده الصالحين.\n= ليس فقط يغفر — بل يُحبّ. حبّاً صافياً فعّالاً.\n\n☮️ **السَّلَامُ** — منه السلامة والأمان.\n= أهل الجنّة تحيّتهم منه: «سَلَامٌ قَوْلًا مِّن رَّبٍّ رَّحِيمٍ» (يس 58).\n\n📖 «إِنَّ رَبِّي رَحِيمٌ وَدُودٌ» (هود 90)\n\n🔑 اسم السلام يُذكر بعد كلّ صلاة:\n\n«اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ» (مسلم 592)',
            en: '❤️ **Al-Wadud (الْوَدُودُ)** — The Most Loving.\n= NOT just that He forgives — He LOVES you. He loves His righteous servants with pure, active love.\n\n☮️ **As-Salam (السَّلَامُ)** — The Peace, Source of all peace.\n= From Him comes all security, tranquility, and salvation. Paradise dwellers will be greeted by Him: «Peace — a word from a Merciful Lord.» (Ya-Sin 36:58)\n\n📖 «Indeed my Lord is Merciful and Loving.» (Hud 11:90)\n\n🔑 The name As-Salam is said after every Salah:\n\n«O Allah, You are As-Salam, from You is peace, blessed are You O Owner of Majesty and Honor.» (Muslim 592)',
          },
          source: 'Quran 11:90 · Sahih Muslim 592',
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuál es la diferencia entre Ar-Rahman y Ar-Raheem?',
            ar: 'ما الفرق بين الرحمن والرحيم؟',
            en: 'What is the difference between Ar-Rahman and Ar-Raheem?',
          },
          options: [
            { es: 'No hay diferencia', ar: 'لا فرق', en: 'No difference' },
            { es: 'Rahman: misericordia universal / Raheem: misericordia con creyentes', ar: 'الرحمن رحمة عامّة / الرحيم رحمة خاصّة بالمؤمنين', en: 'Rahman: universal mercy / Raheem: mercy for believers' },
            { es: 'Rahman es del pasado, Raheem del futuro', ar: 'الرحمن للماضي والرحيم للمستقبل', en: 'Rahman is past, Raheem is future' },
            { es: 'Rahman es un profeta', ar: 'الرحمن نبيّ', en: 'Rahman is a prophet' },
          ],
          correct: 1,
          feedback: {
            es: 'Ar-Rahman = misericordia AMPLIA para TODA la creación en esta vida. Ar-Raheem = misericordia ESPECIAL para creyentes en ambas vidas.',
            ar: 'الرحمن رحمة عامّة لجميع الخلق في الدنيا. الرحيم رحمة خاصّة بالمؤمنين في الدنيا والآخرة.',
            en: 'Ar-Rahman = WIDE mercy for ALL creation in this life. Ar-Raheem = SPECIAL mercy for believers in both lives.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuál nombre significa "El Sabio"?',
            ar: 'أيّ اسم يعني «صاحب الحكمة»؟',
            en: 'Which name means "The Wise"?',
          },
          options: [
            { es: 'Al-Aziz (العزيز)', ar: 'العزيز', en: 'Al-Aziz' },
            { es: 'Al-Hakim (الحكيم)', ar: 'الحكيم', en: 'Al-Hakim' },
            { es: 'Al-Malik (الملك)', ar: 'الملك', en: 'Al-Malik' },
            { es: 'Al-Ghafur (الغفور)', ar: 'الغفور', en: 'Al-Ghafur' },
          ],
          correct: 1,
          feedback: {
            es: 'Al-Hakim (الحكيم). Frecuentemente aparece junto a Al-Aziz (poder + sabiduría).',
            ar: 'الحكيم. يقترن كثيراً بالعزيز (قوّة + حكمة).',
            en: 'Al-Hakim (الحكيم). Frequently paired with Al-Aziz (power + wisdom).',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuál nombre significa que Allah AMA a Sus siervos rectos?',
            ar: 'أيّ اسم يدلّ على محبّة الله لعباده الصالحين؟',
            en: 'Which name means Allah LOVES His righteous servants?',
          },
          options: [
            { es: 'Al-Ghafur (الغفور)', ar: 'الغفور', en: 'Al-Ghafur' },
            { es: 'Al-Wadud (الودود)', ar: 'الودود', en: 'Al-Wadud' },
            { es: 'Al-Quddus (القدوس)', ar: 'القدوس', en: 'Al-Quddus' },
            { es: 'As-Salam (السلام)', ar: 'السلام', en: 'As-Salam' },
          ],
          correct: 1,
          feedback: {
            es: 'Al-Wadud — no solo perdona, sino que ama. «Mi Señor es Misericordioso y Amante.» (Hud 11:90)',
            ar: 'الودود — لا يغفر فحسب بل يحبّ. «إِنَّ رَبِّي رَحِيمٌ وَدُودٌ» (هود 90).',
            en: 'Al-Wadud — He does not just forgive, He loves. «My Lord is Merciful and Loving.» (Hud 11:90)',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // 🌟 STATION 3: Nombres del Cuidado y la Provisión
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'care_names',
      icon: '<i class="fas fa-hand-holding-heart"></i>',
      title: { es: 'Nombres del Cuidado', ar: 'أسماء العناية والرزق', en: 'Names of Care & Provision' },
      mascotIntro: {
        es: 'Nombres que te muestran cómo Allah cuida de ti cada segundo.',
        ar: 'أسماء تُريك كيف يعتني الله بك في كلّ لحظة.',
        en: 'Names that show you how Allah cares for you every second.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'Ar-Razzaq (الرَّزَّاقُ) — El Proveedor', ar: 'الرَّزَّاقُ', en: 'Ar-Razzaq — The Provider' },
          content: {
            es: '🍞 **Ar-Razzaq** — El Proveedor de TODA criatura.\n\n💡 Allah provee alimento y sustento a:\n• Todo ser humano (musulmán o no).\n• Todos los animales (desde la ballena hasta la hormiga).\n• Todas las plantas.\n\nIncluso al feto en el vientre de su madre, al pájaro en el nido, al pez en el fondo del mar.\n\n📖 «إِنَّ اللَّهَ هُوَ الرَّزَّاقُ ذُو الْقُوَّةِ الْمَتِينُ» (Adh-Dhariyat 51:58)\n«Ciertamente Allah es Ar-Razzaq, el de la Fuerza, el Firme.»\n\n🔑 **Lección práctica:**\n• Tu sustento (rizq) YA fue decretado. Trabaja duro, pero confía.\n• Nunca temas la pobreza — tu Rabb es Ar-Razzaq.\n• No robes ni engañes — tu rizq viene de Él, no de la injusticia.',
            ar: '🍞 **الرَّزَّاقُ** — رازق كلّ خلق.\n\n💡 يرزق الله:\n• كلّ إنسان (مسلم أو غيره).\n• كلّ حيوان (من الحوت إلى النملة).\n• كلّ نبات.\n\nحتى الجنين في بطن أمّه، والطير في وكره، والسمك في قاع البحر.\n\n📖 «إِنَّ اللَّهَ هُوَ الرَّزَّاقُ ذُو الْقُوَّةِ الْمَتِينُ» (الذاريات 58)\n\n🔑 **درس عملي:**\n• رزقك مكتوب. اسعَ، لكن ثِق.\n• لا تخشَ الفقر — ربّك هو الرزّاق.\n• لا تسرق ولا تغشّ — رزقك منه لا من الظلم.',
            en: '🍞 **Ar-Razzaq** — The Provider of ALL creatures.\n\n💡 Allah provides sustenance to:\n• Every human (Muslim or not).\n• Every animal (from whale to ant).\n• Every plant.\n\nEven the fetus in its mother\'s womb, the bird in its nest, the fish in the depths.\n\n📖 «Indeed Allah is Ar-Razzaq, the Possessor of Strength, the Firm.» (Adh-Dhariyat 51:58)\n\n🔑 **Practical lesson:**\n• Your sustenance (rizq) is ALREADY decreed. Work hard, but trust.\n• Never fear poverty — your Rabb is Ar-Razzaq.\n• Do not steal or cheat — your rizq comes from Him, not from injustice.',
          },
          source: 'Quran 51:58 · Hud 11:6',
        },
        {
          type: 'card',
          title: { es: 'Al-Hafiz (الْحَفِيظُ) — El Protector', ar: 'الْحَفِيظُ', en: 'Al-Hafiz — The Protector' },
          content: {
            es: '🛡️ **Al-Hafiz** — El que preserva, protege y guarda.\n\n💡 Allah preserva:\n• A Sus siervos de daños que ni siquiera saben.\n• El Corán de toda alteración: «Somos Nosotros quienes protegemos el Recuerdo.» (Al-Hijr 15:9)\n• Los actos de Sus siervos (nada se pierde).\n• Cada célula del cuerpo, cada estrella del cosmos.\n\n📖 «فَاللَّهُ خَيْرٌ حَافِظًا ۖ وَهُوَ أَرْحَمُ الرَّاحِمِينَ» (Yusuf 12:64)\n«Allah es el mejor Protector, y Él es el más Misericordioso de los misericordiosos.»\n\n🔑 **Aplicación:**\nAntes de dormir, recita el Ayat al-Kursi (2:255) y los últimos versos de Al-Baqarah — Allah Al-Hafiz te protegerá esa noche.',
            ar: '🛡️ **الْحَفِيظُ** — الذي يحفظ ويصون كلّ شيء.\n\n💡 الله يحفظ:\n• عباده من شرور لا يعلمونها.\n• القرآن من كلّ تحريف: «إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ» (الحجر 9).\n• أعمال العباد (لا يضيع شيء).\n• كلّ خلية في الجسد وكلّ نجم في السماء.\n\n📖 «فَاللَّهُ خَيْرٌ حَافِظًا ۖ وَهُوَ أَرْحَمُ الرَّاحِمِينَ» (يوسف 64)\n\n🔑 **التطبيق:**\nقبل النوم اقرأ آية الكرسي وخواتيم البقرة — يحفظك الله في ليلتك.',
            en: '🛡️ **Al-Hafiz** — The Preserver, Protector, Guardian.\n\n💡 Allah preserves:\n• His servants from harms they don\'t even know.\n• The Quran from any alteration: «Indeed We revealed the Reminder, and We will preserve it.» (Al-Hijr 15:9)\n• The deeds of His servants (nothing is lost).\n• Every cell in the body, every star in the cosmos.\n\n📖 «Allah is the best Preserver, and He is the most Merciful of the merciful.» (Yusuf 12:64)\n\n🔑 **Application:**\nBefore sleep, recite Ayat al-Kursi (2:255) and the last verses of Al-Baqarah — Allah Al-Hafiz will protect you that night.',
          },
          source: 'Quran 15:9 · 12:64',
        },
        {
          type: 'card',
          title: { es: 'Al-Wakil (الْوَكِيلُ) — El Encargado', ar: 'الْوَكِيلُ', en: 'Al-Wakil — The Trustee' },
          content: {
            es: '📋 **Al-Wakil** — El Encargado, en quien confiamos todos nuestros asuntos.\n\n💡 Cuando dices «Ḥasbunā-llāhu wa ni\'ma-l-wakīl»:\n\n**«حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ»**\n«Nos basta Allah, y qué excelente Encargado.»\n\n... estás poniendo TODOS tus asuntos en Sus manos.\n\n📖 Ibrahim (عليه السلام) la dijo cuando fue arrojado al fuego. El Profeta ﷺ y los sahaba la dijeron en el día de Uhud (Aal-Imran 3:173).\n\n💡 **Tawakkul** (confianza total) ≠ dejadez:\n1. Haz TUS esfuerzos (ata tu camello).\n2. Luego, confía en Allah al 100% (y ponlo en Sus manos).\n\n🔑 Cuando algo esté fuera de tu control, di: «Ḥasbunā-llāhu wa ni\'ma-l-wakīl». Verás milagros.',
            ar: '📋 **الْوَكِيلُ** — المتكفّل بأمور عباده.\n\n💡 عندما تقول: **«حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ»**\n\n... تُفوّض كلّ أمرك إلى الله.\n\n📖 قالها إبراهيم (عليه السلام) حين أُلقي في النار. وقالها النبي ﷺ والصحابة يوم أحد (آل عمران 173).\n\n💡 **التوكّل** ≠ التواكل:\n1. ابذل الأسباب (اعقل ناقتك).\n2. ثمّ توكّل على الله بالكامل.\n\n🔑 عند العجز، قل: «حسبنا الله ونعم الوكيل». سترى العجائب.',
            en: '📋 **Al-Wakil** — The Trustee, in whom we entrust all our affairs.\n\n💡 When you say «Ḥasbunā-llāhu wa ni\'ma-l-wakīl»:\n\n**«حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ»**\n«Sufficient for us is Allah, and He is the best Trustee.»\n\n... you are placing ALL your affairs in His hands.\n\n📖 Ibrahim (عليه السلام) said it when thrown into the fire. The Prophet ﷺ and the sahaba said it on the day of Uhud (Aal-Imran 3:173).\n\n💡 **Tawakkul** (total trust) ≠ laziness:\n1. Do YOUR efforts (tie your camel).\n2. Then trust in Allah 100% (place it in His hands).\n\n🔑 When something is beyond your control, say: «Ḥasbunā-llāhu wa ni\'ma-l-wakīl». You\'ll see miracles.',
          },
          source: 'Quran 3:173 · Sahih al-Bukhari 4563',
        },
        {
          type: 'card',
          title: { es: 'Al-Latif (اللَّطِيفُ) — El Sutil', ar: 'اللَّطِيفُ', en: 'Al-Latif — The Subtle' },
          content: {
            es: '🌸 **Al-Latif** — El Sutil, el Amable en Sus tratos.\n\n💡 Doble significado:\n1. **Latif = Sutilmente sabio**: conoce los detalles más ocultos de todas las cosas.\n2. **Latif = Amable**: Su cuidado es delicado, dulce, imperceptible a veces.\n\n📖 «لَا تُدْرِكُهُ الْأَبْصَارُ وَهُوَ يُدْرِكُ الْأَبْصَارَ ۖ وَهُوَ اللَّطِيفُ الْخَبِيرُ» (Al-An\'am 6:103)\n\n💡 A veces Allah te da algo bueno DISFRAZADO de dificultad. Eso es Su Lutf (amabilidad sutil):\n\n• Un trabajo que perdiste → una oportunidad mejor.\n• Un plan que falló → protección de un daño.\n• Una espera larga → tiempo para prepararte.\n\n🔑 Confía en Su Lutf. Él sabe lo que no ves.',
            ar: '🌸 **اللَّطِيفُ** — الرفيق بعباده، العالم بالدقائق.\n\n💡 معنيان:\n1. **العليم بلطائف الأمور** — يعلم أدقّ التفاصيل.\n2. **الرفيق بعباده** — لطفه بهم في تدبيره خفيّ.\n\n📖 «لَا تُدْرِكُهُ الْأَبْصَارُ وَهُوَ يُدْرِكُ الْأَبْصَارَ ۖ وَهُوَ اللَّطِيفُ الْخَبِيرُ» (الأنعام 103)\n\n💡 قد يعطيك الله خيراً مغلّفاً بمصيبة. هذا لطفه:\n\n• عملٌ خسرته → فرصة أفضل.\n• خطّة فشلت → حماية من ضرر.\n• انتظار طويل → استعداد لأمر عظيم.\n\n🔑 ثِق بلطفه. هو يعلم ما لا تراه.',
            en: '🌸 **Al-Latif** — The Subtle, the Kind in His dealings.\n\n💡 Double meaning:\n1. **Latif = Subtly Wise**: knows the most hidden details of everything.\n2. **Latif = Kind**: His care is gentle, sweet, sometimes imperceptible.\n\n📖 «Vision cannot grasp Him, but He grasps all vision. He is Al-Latif, Al-Khabir.» (Al-An\'am 6:103)\n\n💡 Sometimes Allah gives you something good DISGUISED as difficulty. That is His Lutf (subtle kindness):\n\n• A job you lost → a better opportunity.\n• A plan that failed → protection from harm.\n• A long wait → time to prepare.\n\n🔑 Trust His Lutf. He knows what you don\'t see.',
          },
          source: 'Quran 6:103 · 12:100',
        },
        {
          type: 'quiz',
          question: {
            es: '¿Qué nombre invocamos cuando nos sentimos abrumados y necesitamos poner todo en manos de Allah?',
            ar: 'أيّ اسم ندعو به عند الضيق وتفويض الأمر لله؟',
            en: 'Which name do we invoke when overwhelmed and needing to place all in Allah\'s hands?',
          },
          options: [
            { es: 'Al-Wakil (الوكيل)', ar: 'الوكيل', en: 'Al-Wakil' },
            { es: 'Al-Malik (الملك)', ar: 'الملك', en: 'Al-Malik' },
            { es: 'Al-Aziz (العزيز)', ar: 'العزيز', en: 'Al-Aziz' },
            { es: 'Al-Quddus (القدوس)', ar: 'القدوس', en: 'Al-Quddus' },
          ],
          correct: 0,
          feedback: {
            es: 'Al-Wakil. Ibrahim la dijo en el fuego, el Profeta ﷺ en Uhud: «Ḥasbunā-llāhu wa ni\'ma-l-wakīl».',
            ar: 'الوكيل. قالها إبراهيم في النار والنبي ﷺ في أحد: «حسبنا الله ونعم الوكيل».',
            en: 'Al-Wakil. Ibrahim said it in the fire, the Prophet ﷺ at Uhud: «Ḥasbunā-llāhu wa ni\'ma-l-wakīl».',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿A quién provee sustento Ar-Razzaq?',
            ar: 'من الذي يرزقهم الرزّاق؟',
            en: 'Whom does Ar-Razzaq provide for?',
          },
          options: [
            { es: 'Solo los musulmanes', ar: 'المسلمون فقط', en: 'Only Muslims' },
            { es: 'Solo los rectos', ar: 'الصالحون فقط', en: 'Only the righteous' },
            { es: 'A TODA Su creación', ar: 'كلّ خلقه', en: 'ALL His creation' },
            { es: 'Solo humanos', ar: 'البشر فقط', en: 'Only humans' },
          ],
          correct: 2,
          feedback: {
            es: 'TODAS Sus criaturas: musulmanes, no musulmanes, animales, plantas — incluso al feto y al pez del fondo del mar.',
            ar: 'كلّ الخلق: المسلم والكافر، الحيوان والنبات — حتى الجنين والسمك في قاع البحر.',
            en: 'ALL His creatures: Muslims, non-Muslims, animals, plants — even the fetus and fish at the sea\'s bottom.',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // 🌟 STATION 4: Nombres de la Grandeza
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'majesty_names',
      icon: '<i class="fas fa-crown"></i>',
      title: { es: 'Nombres de Grandeza', ar: 'أسماء العظمة', en: 'Names of Majesty' },
      mascotIntro: {
        es: 'Nombres que revelan la Grandeza absoluta de Allah — que dan humildad al corazón.',
        ar: 'أسماء تكشف عظمة الله المطلقة — تُورث القلبَ الخشوع.',
        en: 'Names revealing Allah\'s absolute Greatness — bringing humility to the heart.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'Al-Khaliq / Al-Bari / Al-Musawwir', ar: 'الخالق والبارئ والمصوّر', en: 'Al-Khaliq / Al-Bari / Al-Musawwir' },
          content: {
            es: '🎨 Tres nombres relacionados con la Creación:\n\n1️⃣ **Al-Khaliq (الْخَالِقُ)** — El Creador que crea de la nada.\n\n2️⃣ **Al-Bari (الْبَارِئُ)** — El Originador que da a la creación su forma inicial.\n\n3️⃣ **Al-Musawwir (الْمُصَوِّرُ)** — El Formador que da a cada cosa su forma final única.\n\n📖 «هُوَ اللَّهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ ۖ لَهُ الْأَسْمَاءُ الْحُسْنَىٰ» (Al-Hashr 59:24)\n\n💡 Ningún ser humano es idéntico a otro. NUNCA. Ni gemelos. Cada cara, cada huella dactilar, cada retina, cada voz — son ÚNICAS.\n\nEsto es Al-Musawwir — el Formador de cada individualidad.\n\n🔑 Reflexiona: si Allah te dio forma con tanto detalle, ¡cuánto te ama!',
            ar: '🎨 ثلاثة أسماء مرتبطة بالخلق:\n\n1️⃣ **الْخَالِقُ** — الذي يخلق من العدم.\n\n2️⃣ **الْبَارِئُ** — الذي يبرأ الخلق ويُنشئه على شكله الأوّل.\n\n3️⃣ **الْمُصَوِّرُ** — الذي يُشكّل كلّ شيء صورةً مميّزة.\n\n📖 «هُوَ اللَّهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ ۖ لَهُ الْأَسْمَاءُ الْحُسْنَىٰ» (الحشر 24)\n\n💡 ما من إنسانٍ يُشبه غيره تماماً. ولو التوأمين. كلّ وجه، كلّ بصمة، كلّ شبكيّة عين، كلّ صوت — فريد.\n\nهذا معنى المصوّر — مصوّر كلّ فرد.\n\n🔑 تأمّل: إن كان الله صوّرك بكلّ هذه الدقّة، فكم يحبّك!',
            en: '🎨 Three names related to Creation:\n\n1️⃣ **Al-Khaliq (الْخَالِقُ)** — The Creator who creates from nothing.\n\n2️⃣ **Al-Bari (الْبَارِئُ)** — The Originator who gives creation its initial form.\n\n3️⃣ **Al-Musawwir (الْمُصَوِّرُ)** — The Fashioner who gives each thing its unique final form.\n\n📖 «He is Allah, Al-Khaliq, Al-Bari, Al-Musawwir. To Him belong the most beautiful names.» (Al-Hashr 59:24)\n\n💡 No human is identical to another. EVER. Not even twins. Each face, each fingerprint, each retina, each voice — is UNIQUE.\n\nThis is Al-Musawwir — the Fashioner of each individuality.\n\n🔑 Reflect: if Allah gave you form with such detail, how much does He love you!',
          },
          source: 'Quran 59:24',
        },
        {
          type: 'card',
          title: { es: 'Al-Kabir & Al-Muta\'ali', ar: 'الكبير والمتعالي', en: 'Al-Kabir & Al-Muta\'ali' },
          content: {
            es: '👑 **Al-Kabir (الْكَبِيرُ)** — El Grande, el Supremo.\n= Su Grandeza NO se compara con nada.\n\n🌌 **Al-Muta\'ali (الْمُتَعَالِ)** — El Elevado sobre TODO.\n= Trasciende toda imperfección, todo lo creado, todo lo imaginable.\n\n📖 «اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ» (Al-Baqarah 2:255)\n\n💡 Cuando ves las galaxias, las montañas, los océanos... piensas: «¡Qué grande el que los creó!» Eso es Al-Kabir.\n\nCuando comprendes que Allah NO es como nada de lo creado (no tiene forma similar a nosotros, ni tiempo, ni espacio limitado)... eso es Al-Muta\'ali.\n\n🔑 En el Ruku decimos: «سُبْحَانَ رَبِّيَ الْعَظِيمِ» (SubhanaRabbiya-l-Aẓim). El Aẓim (Grandioso) es primo hermano del Kabir.',
            ar: '👑 **الْكَبِيرُ** — العظيم الذي لا يماثله شيء.\n\n🌌 **الْمُتَعَالِ** — المرتفع عن كلّ نقص وشبيه من خلقه.\n\n📖 «اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ» (البقرة 255)\n\n💡 إذا رأيت المجرّات والجبال والبحار... خطر ببالك: «ما أعظم من خلقها!» هذا الكبير.\n\nوإذا فقهت أنّ الله لا يشبه شيئاً من خلقه (لا صورة كصورنا، ولا زمان ولا مكان محدود)... هذا المتعالي.\n\n🔑 في الركوع: «سُبْحَانَ رَبِّيَ الْعَظِيمِ» — والعظيم قريب من الكبير.',
            en: '👑 **Al-Kabir (الْكَبِيرُ)** — The Great, the Supreme.\n= His Greatness is INCOMPARABLE.\n\n🌌 **Al-Muta\'ali (الْمُتَعَالِ)** — The Exalted above ALL.\n= Transcends every imperfection, every created thing, every imaginable.\n\n📖 «Allah — no deity but Him — Al-Hayy, Al-Qayyum.» (Al-Baqarah 2:255)\n\n💡 When you see galaxies, mountains, oceans... you think: «How great is their Creator!» That is Al-Kabir.\n\nWhen you understand Allah is NOT like anything created (no form like ours, no limited time or space)... that is Al-Muta\'ali.\n\n🔑 In Ruku we say: «SubhanaRabbiya-l-Aẓim». Al-Aẓim (the Magnificent) is a close cousin of Al-Kabir.',
          },
          source: 'Quran 2:255 · 13:9',
        },
        {
          type: 'card',
          title: { es: 'Al-Hayy & Al-Qayyum — Los 2 nombres SUPREMOS', ar: 'الحيّ القيّوم — أعظم اسمين', en: 'Al-Hayy & Al-Qayyum — The 2 SUPREME names' },
          content: {
            es: '⭐ **Al-Hayy (الْحَيُّ)** — El Viviente eternamente.\n\n⭐ **Al-Qayyum (الْقَيُّومُ)** — El que se sostiene por Sí mismo y sostiene todo lo demás.\n\n💡 Estos 2 nombres son considerados por muchos ulemas como **«Ism Allah al-A\'ẓam»** (el Nombre Supremo de Allah).\n\nCuando alguien invoca a Allah por Su Nombre Supremo, ¡Él responde!\n\n📖 «اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ» (Al-Baqarah 2:255 - Ayat al-Kursi)\n«اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ» (Aal-Imran 3:2)\n«وَعَنَتِ الْوُجُوهُ لِلْحَيِّ الْقَيُّومِ» (Ta-Ha 20:111)\n\n💡 Los 3 versículos que contienen «Al-Hayy Al-Qayyum» son de una PODER especial.\n\n🔑 **Du\'a con el Nombre Supremo:**\n«يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ»\n«Yā Ḥayy yā Qayyūm, biraḥmatika astaghīth»\n«Oh Viviente, oh Autosuficiente, por Tu misericordia busco ayuda.»\n(Tirmidhi 3524)',
            ar: '⭐ **الْحَيُّ** — الحيّ حياة أبديّة.\n\n⭐ **الْقَيُّومُ** — القائم بنفسه، القائم على كلّ شيء.\n\n💡 هذان الاسمان يعدّهما كثير من العلماء **«اسم الله الأعظم»**.\n\nمن دعا الله باسمه الأعظم أجابه.\n\n📖 اجتمعا في ثلاثة مواضع من القرآن:\n• آية الكرسي (البقرة 255).\n• آل عمران 2.\n• طه 111.\n\n🔑 **الدعاء بالاسم الأعظم:**\n«يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ» (الترمذي 3524)',
            en: '⭐ **Al-Hayy (الْحَيُّ)** — The Ever-Living.\n\n⭐ **Al-Qayyum (الْقَيُّومُ)** — The Self-Sustaining Sustainer of all.\n\n💡 Many scholars consider these 2 names to be **«Ism Allah al-A\'ẓam»** (Allah\'s Supreme Name).\n\nWhen someone invokes Allah by His Supreme Name, He responds!\n\n📖 Appears in 3 verses:\n• Ayat al-Kursi (Al-Baqarah 2:255).\n• Aal-Imran 3:2.\n• Ta-Ha 20:111.\n\n🔑 **Du\'a with the Supreme Name:**\n«يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ»\n«Yā Ḥayy yā Qayyūm, biraḥmatika astaghīth»\n«O Ever-Living, O Self-Sustaining, by Your mercy I seek help.»\n(Tirmidhi 3524)',
          },
          source: 'Quran 2:255, 3:2, 20:111 · Sunan at-Tirmidhi 3524',
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuál nombre significa que Allah forma a cada individuo con una imagen ÚNICA?',
            ar: 'أيّ اسم يعني أنّ الله يُصوّر كلّ فرد بشكل فريد؟',
            en: 'Which name means Allah forms each individual with a UNIQUE image?',
          },
          options: [
            { es: 'Al-Khaliq (الخالق)', ar: 'الخالق', en: 'Al-Khaliq' },
            { es: 'Al-Musawwir (المصوّر)', ar: 'المصوّر', en: 'Al-Musawwir' },
            { es: 'Al-Kabir (الكبير)', ar: 'الكبير', en: 'Al-Kabir' },
            { es: 'Al-Hafiz (الحفيظ)', ar: 'الحفيظ', en: 'Al-Hafiz' },
          ],
          correct: 1,
          feedback: {
            es: 'Al-Musawwir (المصوّر). Nadie es idéntico a otro — cada rostro, huella y voz es única.',
            ar: 'المصوّر. لا أحد يشبه غيره — كلّ وجه وبصمة وصوت فريد.',
            en: 'Al-Musawwir. No one is identical to another — every face, fingerprint, voice is unique.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuáles son los 2 nombres considerados posiblemente el «Ism Allah al-A\'ẓam»?',
            ar: 'ما الاسمان اللذان قيل إنّهما «اسم الله الأعظم»؟',
            en: 'Which 2 names are considered possibly the «Ism Allah al-A\'ẓam»?',
          },
          options: [
            { es: 'Ar-Rahman & Ar-Raheem', ar: 'الرحمن والرحيم', en: 'Ar-Rahman & Ar-Raheem' },
            { es: 'Al-Aziz & Al-Hakim', ar: 'العزيز والحكيم', en: 'Al-Aziz & Al-Hakim' },
            { es: 'Al-Hayy & Al-Qayyum', ar: 'الحيّ والقيّوم', en: 'Al-Hayy & Al-Qayyum' },
            { es: 'Al-Malik & Al-Quddus', ar: 'الملك والقدّوس', en: 'Al-Malik & Al-Quddus' },
          ],
          correct: 2,
          feedback: {
            es: 'Al-Hayy Al-Qayyum. Aparecen en Ayat al-Kursi, Aal-Imran 3:2, y Ta-Ha 20:111.',
            ar: 'الحيّ القيّوم. في آية الكرسي، آل عمران 2، وطه 111.',
            en: 'Al-Hayy Al-Qayyum. In Ayat al-Kursi, Aal-Imran 3:2, and Ta-Ha 20:111.',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // 🌟 STATION 5: La Lista Completa de los 99
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'full_list',
      icon: '<i class="fas fa-list-ol"></i>',
      title: { es: 'Los 99 Completos', ar: 'الـ99 كاملة', en: 'The 99 Complete' },
      mascotIntro: {
        es: 'Aquí están los 99 nombres. Aprende de a poco. ¡El Paraíso te espera!',
        ar: 'هذه الـ99 كاملة. تعلّمها شيئاً فشيئاً. الجنّة تنتظرك!',
        en: 'Here are all 99 names. Learn little by little. Paradise awaits!',
      },
      lessons: [
        {
          type: 'flashcards',
          title: { es: 'Nombres 1-20 (Flashcards)', ar: 'الأسماء 1-20', en: 'Names 1-20 (Flashcards)' },
          cards: [
            { front: 'الرَّحْمَنُ', back: { es: '1. Ar-Rahman · El Compasivo', ar: '1. الرحمن', en: '1. Ar-Rahman · The Compassionate' } },
            { front: 'الرَّحِيمُ', back: { es: '2. Ar-Raheem · El Misericordioso', ar: '2. الرحيم', en: '2. Ar-Raheem · The Merciful' } },
            { front: 'الْمَلِكُ', back: { es: '3. Al-Malik · El Rey', ar: '3. الملك', en: '3. Al-Malik · The King' } },
            { front: 'الْقُدُّوسُ', back: { es: '4. Al-Quddus · El Santo', ar: '4. القدّوس', en: '4. Al-Quddus · The Holy' } },
            { front: 'السَّلَامُ', back: { es: '5. As-Salam · La Paz', ar: '5. السلام', en: '5. As-Salam · The Peace' } },
            { front: 'الْمُؤْمِنُ', back: { es: '6. Al-Mu\'min · El que da seguridad', ar: '6. المؤمن', en: '6. Al-Mu\'min · The Faithful' } },
            { front: 'الْمُهَيْمِنُ', back: { es: '7. Al-Muhaymin · El Vigilante', ar: '7. المهيمن', en: '7. Al-Muhaymin · The Guardian' } },
            { front: 'الْعَزِيزُ', back: { es: '8. Al-Aziz · El Todopoderoso', ar: '8. العزيز', en: '8. Al-Aziz · The Almighty' } },
            { front: 'الْجَبَّارُ', back: { es: '9. Al-Jabbar · El Restaurador', ar: '9. الجبّار', en: '9. Al-Jabbar · The Compeller' } },
            { front: 'الْمُتَكَبِّرُ', back: { es: '10. Al-Mutakabbir · El Supremo', ar: '10. المتكبّر', en: '10. Al-Mutakabbir · The Majestic' } },
            { front: 'الْخَالِقُ', back: { es: '11. Al-Khaliq · El Creador', ar: '11. الخالق', en: '11. Al-Khaliq · The Creator' } },
            { front: 'الْبَارِئُ', back: { es: '12. Al-Bari · El Originador', ar: '12. البارئ', en: '12. Al-Bari · The Originator' } },
            { front: 'الْمُصَوِّرُ', back: { es: '13. Al-Musawwir · El Formador', ar: '13. المصوّر', en: '13. Al-Musawwir · The Fashioner' } },
            { front: 'الْغَفَّارُ', back: { es: '14. Al-Ghaffar · El Perdonador', ar: '14. الغفّار', en: '14. Al-Ghaffar · The Ever-Forgiving' } },
            { front: 'الْقَهَّارُ', back: { es: '15. Al-Qahhar · El Dominante', ar: '15. القهّار', en: '15. Al-Qahhar · The Subduer' } },
            { front: 'الْوَهَّابُ', back: { es: '16. Al-Wahhab · El Dador', ar: '16. الوهّاب', en: '16. Al-Wahhab · The Bestower' } },
            { front: 'الرَّزَّاقُ', back: { es: '17. Ar-Razzaq · El Proveedor', ar: '17. الرزّاق', en: '17. Ar-Razzaq · The Provider' } },
            { front: 'الْفَتَّاحُ', back: { es: '18. Al-Fattah · El que abre', ar: '18. الفتّاح', en: '18. Al-Fattah · The Opener' } },
            { front: 'الْعَلِيمُ', back: { es: '19. Al-\'Alim · El Omnisciente', ar: '19. العليم', en: '19. Al-\'Alim · The All-Knowing' } },
            { front: 'الْقَابِضُ', back: { es: '20. Al-Qabid · El que retiene', ar: '20. القابض', en: '20. Al-Qabid · The Restrainer' } },
          ],
        },
        {
          type: 'flashcards',
          title: { es: 'Nombres 21-40', ar: 'الأسماء 21-40', en: 'Names 21-40' },
          cards: [
            { front: 'الْبَاسِطُ', back: { es: '21. Al-Basit · El que extiende', ar: '21. الباسط', en: '21. Al-Basit · The Extender' } },
            { front: 'الْخَافِضُ', back: { es: '22. Al-Khafid · El que humilla', ar: '22. الخافض', en: '22. Al-Khafid · The Abaser' } },
            { front: 'الرَّافِعُ', back: { es: '23. Ar-Rafi\' · El que eleva', ar: '23. الرافع', en: '23. Ar-Rafi\' · The Exalter' } },
            { front: 'الْمُعِزُّ', back: { es: '24. Al-Mu\'izz · El que honra', ar: '24. المعزّ', en: '24. Al-Mu\'izz · The Honorer' } },
            { front: 'الْمُذِلُّ', back: { es: '25. Al-Mudhill · El que humilla', ar: '25. المذلّ', en: '25. Al-Mudhill · The Humiliator' } },
            { front: 'السَّمِيعُ', back: { es: '26. As-Sami\' · El que todo lo Oye', ar: '26. السميع', en: '26. As-Sami\' · The All-Hearing' } },
            { front: 'الْبَصِيرُ', back: { es: '27. Al-Basir · El que todo lo Ve', ar: '27. البصير', en: '27. Al-Basir · The All-Seeing' } },
            { front: 'الْحَكَمُ', back: { es: '28. Al-Hakam · El Juez', ar: '28. الحكم', en: '28. Al-Hakam · The Judge' } },
            { front: 'الْعَدْلُ', back: { es: '29. Al-\'Adl · El Justo', ar: '29. العدل', en: '29. Al-\'Adl · The Just' } },
            { front: 'اللَّطِيفُ', back: { es: '30. Al-Latif · El Sutil', ar: '30. اللطيف', en: '30. Al-Latif · The Subtle' } },
            { front: 'الْخَبِيرُ', back: { es: '31. Al-Khabir · El Bien Informado', ar: '31. الخبير', en: '31. Al-Khabir · The Well-Informed' } },
            { front: 'الْحَلِيمُ', back: { es: '32. Al-Halim · El Indulgente', ar: '32. الحليم', en: '32. Al-Halim · The Forbearing' } },
            { front: 'الْعَظِيمُ', back: { es: '33. Al-Adhim · El Magnífico', ar: '33. العظيم', en: '33. Al-Adhim · The Magnificent' } },
            { front: 'الْغَفُورُ', back: { es: '34. Al-Ghafur · El Perdonador', ar: '34. الغفور', en: '34. Al-Ghafur · The Forgiving' } },
            { front: 'الشَّكُورُ', back: { es: '35. Ash-Shakur · El Agradecido', ar: '35. الشكور', en: '35. Ash-Shakur · The Appreciative' } },
            { front: 'الْعَلِيُّ', back: { es: '36. Al-\'Aliyy · El Altísimo', ar: '36. العليّ', en: '36. Al-\'Aliyy · The Most High' } },
            { front: 'الْكَبِيرُ', back: { es: '37. Al-Kabir · El Grande', ar: '37. الكبير', en: '37. Al-Kabir · The Great' } },
            { front: 'الْحَفِيظُ', back: { es: '38. Al-Hafiz · El Protector', ar: '38. الحفيظ', en: '38. Al-Hafiz · The Preserver' } },
            { front: 'الْمُقِيتُ', back: { es: '39. Al-Muqit · El Sustentador', ar: '39. المقيت', en: '39. Al-Muqit · The Sustainer' } },
            { front: 'الْحَسِيبُ', back: { es: '40. Al-Hasib · El Contable', ar: '40. الحسيب', en: '40. Al-Hasib · The Reckoner' } },
          ],
        },
        {
          type: 'flashcards',
          title: { es: 'Nombres 41-60', ar: 'الأسماء 41-60', en: 'Names 41-60' },
          cards: [
            { front: 'الْجَلِيلُ', back: { es: '41. Al-Jalil · El Majestuoso', ar: '41. الجليل', en: '41. Al-Jalil · The Majestic' } },
            { front: 'الْكَرِيمُ', back: { es: '42. Al-Karim · El Generoso', ar: '42. الكريم', en: '42. Al-Karim · The Generous' } },
            { front: 'الرَّقِيبُ', back: { es: '43. Ar-Raqib · El Observador', ar: '43. الرقيب', en: '43. Ar-Raqib · The Watchful' } },
            { front: 'الْمُجِيبُ', back: { es: '44. Al-Mujib · El que Responde', ar: '44. المجيب', en: '44. Al-Mujib · The Responsive' } },
            { front: 'الْوَاسِعُ', back: { es: '45. Al-Wasi\' · El Vasto', ar: '45. الواسع', en: '45. Al-Wasi\' · The Vast' } },
            { front: 'الْحَكِيمُ', back: { es: '46. Al-Hakim · El Sabio', ar: '46. الحكيم', en: '46. Al-Hakim · The Wise' } },
            { front: 'الْوَدُودُ', back: { es: '47. Al-Wadud · El Amante', ar: '47. الودود', en: '47. Al-Wadud · The Loving' } },
            { front: 'الْمَجِيدُ', back: { es: '48. Al-Majid · El Glorioso', ar: '48. المجيد', en: '48. Al-Majid · The Glorious' } },
            { front: 'الْبَاعِثُ', back: { es: '49. Al-Ba\'ith · El Resucitador', ar: '49. الباعث', en: '49. Al-Ba\'ith · The Resurrector' } },
            { front: 'الشَّهِيدُ', back: { es: '50. Ash-Shahid · El Testigo', ar: '50. الشهيد', en: '50. Ash-Shahid · The Witness' } },
            { front: 'الْحَقُّ', back: { es: '51. Al-Haqq · La Verdad', ar: '51. الحقّ', en: '51. Al-Haqq · The Truth' } },
            { front: 'الْوَكِيلُ', back: { es: '52. Al-Wakil · El Encargado', ar: '52. الوكيل', en: '52. Al-Wakil · The Trustee' } },
            { front: 'الْقَوِيُّ', back: { es: '53. Al-Qawiyy · El Fuerte', ar: '53. القويّ', en: '53. Al-Qawiyy · The Strong' } },
            { front: 'الْمَتِينُ', back: { es: '54. Al-Matin · El Firme', ar: '54. المتين', en: '54. Al-Matin · The Firm' } },
            { front: 'الْوَلِيُّ', back: { es: '55. Al-Waliyy · El Protector', ar: '55. الوليّ', en: '55. Al-Waliyy · The Ally' } },
            { front: 'الْحَمِيدُ', back: { es: '56. Al-Hamid · El Digno de Alabanza', ar: '56. الحميد', en: '56. Al-Hamid · The Praiseworthy' } },
            { front: 'الْمُحْصِي', back: { es: '57. Al-Muhsi · El Contador', ar: '57. المحصي', en: '57. Al-Muhsi · The Reckoner' } },
            { front: 'الْمُبْدِئُ', back: { es: '58. Al-Mubdi · El Comenzador', ar: '58. المبدئ', en: '58. Al-Mubdi · The Originator' } },
            { front: 'الْمُعِيدُ', back: { es: '59. Al-Mu\'id · El Restaurador', ar: '59. المعيد', en: '59. Al-Mu\'id · The Restorer' } },
            { front: 'الْمُحْيِي', back: { es: '60. Al-Muhyi · El que da Vida', ar: '60. المحيي', en: '60. Al-Muhyi · The Life-Giver' } },
          ],
        },
        {
          type: 'flashcards',
          title: { es: 'Nombres 61-80', ar: 'الأسماء 61-80', en: 'Names 61-80' },
          cards: [
            { front: 'الْمُمِيتُ', back: { es: '61. Al-Mumit · El que da Muerte', ar: '61. المميت', en: '61. Al-Mumit · The Bringer of Death' } },
            { front: 'الْحَيُّ', back: { es: '62. Al-Hayy · El Viviente', ar: '62. الحيّ', en: '62. Al-Hayy · The Ever-Living' } },
            { front: 'الْقَيُّومُ', back: { es: '63. Al-Qayyum · El Autosuficiente', ar: '63. القيّوم', en: '63. Al-Qayyum · The Self-Sustaining' } },
            { front: 'الْوَاجِدُ', back: { es: '64. Al-Wajid · El Localizador', ar: '64. الواجد', en: '64. Al-Wajid · The Perceiver' } },
            { front: 'الْمَاجِدُ', back: { es: '65. Al-Majid · El Ilustre', ar: '65. الماجد', en: '65. Al-Majid · The Illustrious' } },
            { front: 'الْوَاحِدُ', back: { es: '66. Al-Wahid · El Único', ar: '66. الواحد', en: '66. Al-Wahid · The One' } },
            { front: 'الْأَحَدُ', back: { es: '67. Al-Ahad · El Único Absoluto', ar: '67. الأحد', en: '67. Al-Ahad · The Absolute One' } },
            { front: 'الصَّمَدُ', back: { es: '68. As-Samad · El Eterno Refugio', ar: '68. الصمد', en: '68. As-Samad · The Eternal Refuge' } },
            { front: 'الْقَادِرُ', back: { es: '69. Al-Qadir · El Capaz', ar: '69. القادر', en: '69. Al-Qadir · The Able' } },
            { front: 'الْمُقْتَدِرُ', back: { es: '70. Al-Muqtadir · El Poderoso', ar: '70. المقتدر', en: '70. Al-Muqtadir · The Powerful' } },
            { front: 'الْمُقَدِّمُ', back: { es: '71. Al-Muqaddim · El que adelanta', ar: '71. المقدّم', en: '71. Al-Muqaddim · The Expediter' } },
            { front: 'الْمُؤَخِّرُ', back: { es: '72. Al-Mu\'akhkhir · El que retrasa', ar: '72. المؤخّر', en: '72. Al-Mu\'akhkhir · The Delayer' } },
            { front: 'الْأَوَّلُ', back: { es: '73. Al-Awwal · El Primero', ar: '73. الأوّل', en: '73. Al-Awwal · The First' } },
            { front: 'الْآخِرُ', back: { es: '74. Al-Akhir · El Último', ar: '74. الآخر', en: '74. Al-Akhir · The Last' } },
            { front: 'الظَّاهِرُ', back: { es: '75. Az-Zahir · El Manifiesto', ar: '75. الظاهر', en: '75. Az-Zahir · The Manifest' } },
            { front: 'الْبَاطِنُ', back: { es: '76. Al-Batin · El Oculto', ar: '76. الباطن', en: '76. Al-Batin · The Hidden' } },
            { front: 'الْوَالِي', back: { es: '77. Al-Wali · El Gobernador', ar: '77. الوالي', en: '77. Al-Wali · The Governor' } },
            { front: 'الْمُتَعَالِ', back: { es: '78. Al-Muta\'ali · El Elevado', ar: '78. المتعالي', en: '78. Al-Muta\'ali · The Exalted' } },
            { front: 'الْبَرُّ', back: { es: '79. Al-Barr · El Benefactor', ar: '79. البرّ', en: '79. Al-Barr · The Benefactor' } },
            { front: 'التَّوَّابُ', back: { es: '80. At-Tawwab · El que acepta la Tawbah', ar: '80. التوّاب', en: '80. At-Tawwab · The Acceptor of Repentance' } },
          ],
        },
        {
          type: 'flashcards',
          title: { es: 'Nombres 81-99', ar: 'الأسماء 81-99', en: 'Names 81-99' },
          cards: [
            { front: 'الْمُنْتَقِمُ', back: { es: '81. Al-Muntaqim · El Vengador', ar: '81. المنتقم', en: '81. Al-Muntaqim · The Avenger' } },
            { front: 'الْعَفُوُّ', back: { es: '82. Al-\'Afuww · El Indulgente', ar: '82. العفوّ', en: '82. Al-\'Afuww · The Pardoner' } },
            { front: 'الرَّءُوفُ', back: { es: '83. Ar-Ra\'uf · El Compasivo', ar: '83. الرؤوف', en: '83. Ar-Ra\'uf · The Compassionate' } },
            { front: 'مَالِكُ الْمُلْكِ', back: { es: '84. Malik al-Mulk · El Rey del Reino', ar: '84. مالك الملك', en: '84. Malik al-Mulk · Owner of Dominion' } },
            { front: 'ذُو الْجَلَالِ وَالْإِكْرَامِ', back: { es: '85. Dhul-Jalali wal-Ikram · Señor de Majestad y Honor', ar: '85. ذو الجلال والإكرام', en: '85. Dhul-Jalali wal-Ikram · Lord of Majesty' } },
            { front: 'الْمُقْسِطُ', back: { es: '86. Al-Muqsit · El Equitativo', ar: '86. المقسط', en: '86. Al-Muqsit · The Equitable' } },
            { front: 'الْجَامِعُ', back: { es: '87. Al-Jami\' · El que Reúne', ar: '87. الجامع', en: '87. Al-Jami\' · The Gatherer' } },
            { front: 'الْغَنِيُّ', back: { es: '88. Al-Ghaniyy · El Auto-Suficiente', ar: '88. الغنيّ', en: '88. Al-Ghaniyy · The Self-Sufficient' } },
            { front: 'الْمُغْنِي', back: { es: '89. Al-Mughni · El Enriquecedor', ar: '89. المغني', en: '89. Al-Mughni · The Enricher' } },
            { front: 'الْمَانِعُ', back: { es: '90. Al-Mani\' · El que Impide', ar: '90. المانع', en: '90. Al-Mani\' · The Preventer' } },
            { front: 'الضَّارُّ', back: { es: '91. Ad-Darr · El que Daña', ar: '91. الضارّ', en: '91. Ad-Darr · The Distresser' } },
            { front: 'النَّافِعُ', back: { es: '92. An-Nafi\' · El Benefactor', ar: '92. النافع', en: '92. An-Nafi\' · The Beneficial' } },
            { front: 'النُّورُ', back: { es: '93. An-Nur · La Luz', ar: '93. النور', en: '93. An-Nur · The Light' } },
            { front: 'الْهَادِي', back: { es: '94. Al-Hadi · El Guía', ar: '94. الهادي', en: '94. Al-Hadi · The Guide' } },
            { front: 'الْبَدِيعُ', back: { es: '95. Al-Badi\' · El Inigualable', ar: '95. البديع', en: '95. Al-Badi\' · The Incomparable' } },
            { front: 'الْبَاقِي', back: { es: '96. Al-Baqi · El Eterno', ar: '96. الباقي', en: '96. Al-Baqi · The Everlasting' } },
            { front: 'الْوَارِثُ', back: { es: '97. Al-Warith · El Heredero', ar: '97. الوارث', en: '97. Al-Warith · The Inheritor' } },
            { front: 'الرَّشِيدُ', back: { es: '98. Ar-Rashid · El Guía Correcto', ar: '98. الرشيد', en: '98. Ar-Rashid · The Rightly-Guiding' } },
            { front: 'الصَّبُورُ', back: { es: '99. As-Sabur · El Paciente', ar: '99. الصبور', en: '99. As-Sabur · The Patient' } },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // 🌟 STATION 6: Aplicación y Conclusión
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'application',
      icon: '<i class="fas fa-graduation-cap"></i>',
      title: { es: 'Aplicación y Cierre', ar: 'التطبيق والخاتمة', en: 'Application & Conclusion' },
      mascotIntro: {
        es: 'No basta con memorizar. Ahora aplica lo aprendido en tu vida.',
        ar: 'الحفظ لا يكفي. طبّق ما تعلّمت في حياتك.',
        en: 'Memorizing is not enough. Now apply what you learned in your life.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'Cómo hacer du\'a con los Nombres', ar: 'كيف تدعو بالأسماء الحسنى', en: 'How to make du\'a with the Names' },
          content: {
            es: '🤲 Allah dice: «A Allah pertenecen los nombres más bellos, invocadle con ellos.» (Al-A\'raf 7:180)\n\n**Regla de oro:**\nInvoca a Allah con el nombre que corresponda a tu necesidad.\n\n📋 **Ejemplos prácticos:**\n\n• ¿Sin sustento? → «Yā Razzāq, arzuqnī...» (Oh Proveedor, provéeme...)\n\n• ¿En un problema? → «Yā Ḥayy yā Qayyūm, biraḥmatika astaghīth»\n\n• ¿Con pecados? → «Yā Ghafūr, ighfir lī...» (Oh Perdonador, perdóname...)\n\n• ¿En dificultad? → «Yā Latīf, ulṭuf bī...» (Oh Sutil, sé sutil conmigo...)\n\n• ¿Sin sabiduría? → «Yā Ḥakīm, waffiqnī...» (Oh Sabio, guíame...)\n\n• ¿Buscando paz? → «Yā Salām, aslimnī...» (Oh Paz, dame paz...)\n\n💡 **Regla clave:** después de invocar el nombre, pide algo relacionado con su significado.',
            ar: '🤲 قال الله: «وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا» (الأعراف 180).\n\n**القاعدة الذهبية:**\nادعُ الله بالاسم الذي يناسب حاجتك.\n\n📋 **أمثلة:**\n\n• ضيق رزق؟ → «يا رزّاق، ارزقني...»\n\n• كرب شديد؟ → «يا حيّ يا قيّوم، برحمتك أستغيث»\n\n• ذنوب؟ → «يا غفور، اغفر لي...»\n\n• شدّة؟ → «يا لطيف، الطف بي...»\n\n• عجز عن قرار؟ → «يا حكيم، وفّقني...»\n\n• قلق؟ → «يا سلام، أسلمني...»\n\n💡 **القاعدة**: بعد ذكر الاسم، اسأل ما يناسب معناه.',
            en: '🤲 Allah says: «To Allah belong the most beautiful names, so invoke Him by them.» (Al-A\'raf 7:180)\n\n**Golden rule:**\nInvoke Allah by the name matching your need.\n\n📋 **Practical examples:**\n\n• No sustenance? → «Yā Razzāq, arzuqnī...» (O Provider, provide for me...)\n\n• In distress? → «Yā Ḥayy yā Qayyūm, biraḥmatika astaghīth»\n\n• With sins? → «Yā Ghafūr, ighfir lī...» (O Forgiving, forgive me...)\n\n• In difficulty? → «Yā Latīf, ulṭuf bī...» (O Subtle, be kind to me...)\n\n• Lacking wisdom? → «Yā Ḥakīm, waffiqnī...» (O Wise, guide me...)\n\n• Seeking peace? → «Yā Salām, aslimnī...» (O Peace, grant me peace...)\n\n💡 **Key rule:** after invoking the name, ask for something related to its meaning.',
          },
          source: 'Quran 7:180 · Ibn al-Qayyim · Madarij as-Salikin',
        },
        {
          type: 'card',
          title: { es: 'Imitar los atributos (Ta\'abbud)', ar: 'التخلّق بمعاني الأسماء', en: 'Imitating the attributes (Ta\'abbud)' },
          content: {
            es: '🌱 Como criaturas, no podemos ser como Allah. Pero podemos IMITAR aspectos de Sus atributos donde nos es apropiado:\n\n• **Ar-Rahman** → sé compasivo con la creación.\n• **Al-Ghafur** → perdona a los que te hicieron mal.\n• **Ar-Razzaq** → comparte tu sustento con los pobres.\n• **Al-Karim** → sé generoso, no tacaño.\n• **As-Sabur** → sé paciente en las pruebas.\n• **Al-\'Adl** → sé justo con TODOS, incluso enemigos.\n• **Al-Hafiz** → cuida los depósitos y confianzas.\n• **Al-Wadud** → ama a los creyentes.\n\n📖 «Adornáos con las características de Allah.» (dicho sabio de los ulemas — takhalluq bi-akhlāq Allah)\n\n💡 Los MEJORES musulmanes son los que reflejan los nombres de Allah en su carácter.\n\n🔑 Reflexiona: ¿qué nombre de Allah necesito IMITAR MÁS en mi vida?',
            ar: '🌱 لا يمكن للعبد أن يكون كالله، لكن يمكنه التخلّق بمعاني بعض الأسماء فيما يليق به:\n\n• **الرحمن** → ارحم الخلق.\n• **الغفور** → اعفُ عمّن أساء إليك.\n• **الرزّاق** → شارك رزقك مع المحتاجين.\n• **الكريم** → كن كريماً.\n• **الصبور** → اصبر على البلاء.\n• **العدل** → اعدل حتى مع الأعداء.\n• **الحفيظ** → احفظ الأمانات.\n• **الودود** → أحبب المؤمنين.\n\n📖 «تخلّقوا بأخلاق الله» (مقولة العلماء).\n\n💡 خير المسلمين من ظهرت فيه معاني أسماء الله.\n\n🔑 تأمّل: أيّ اسم من أسماء الله أحتاج إلى التخلّق به أكثر في حياتي؟',
            en: '🌱 As creatures, we cannot be like Allah. But we can IMITATE aspects of His attributes where suitable for us:\n\n• **Ar-Rahman** → be merciful to creation.\n• **Al-Ghafur** → forgive those who wronged you.\n• **Ar-Razzaq** → share your sustenance with the poor.\n• **Al-Karim** → be generous, not stingy.\n• **As-Sabur** → be patient in trials.\n• **Al-\'Adl** → be just with ALL, even enemies.\n• **Al-Hafiz** → guard trusts and secrets.\n• **Al-Wadud** → love the believers.\n\n📖 «Adorn yourselves with Allah\'s characteristics» (scholar saying — takhalluq bi-akhlāq Allah).\n\n💡 The BEST Muslims are those who reflect Allah\'s names in their character.\n\n🔑 Reflect: which of Allah\'s names do I need to IMITATE MORE in my life?',
          },
          source: 'Ibn al-Qayyim · Ibn Taymiyyah',
        },
        {
          type: 'quiz',
          question: {
            es: 'Si buscas sustento (rizq), ¿con qué nombre invocas a Allah?',
            ar: 'إذا احتجت إلى الرزق، بأيّ اسم تدعو الله؟',
            en: 'If you seek sustenance (rizq), by which name do you invoke Allah?',
          },
          options: [
            { es: 'Yā Malik', ar: 'يا ملك', en: 'Yā Malik' },
            { es: 'Yā Razzāq', ar: 'يا رزّاق', en: 'Yā Razzāq' },
            { es: 'Yā Ghafūr', ar: 'يا غفور', en: 'Yā Ghafūr' },
            { es: 'Yā Salām', ar: 'يا سلام', en: 'Yā Salām' },
          ],
          correct: 1,
          feedback: {
            es: 'Yā Razzāq — el Proveedor. Regla clave: invoca con el nombre que corresponda a la necesidad.',
            ar: 'يا رزّاق — الرازق. القاعدة: ادعُ بالاسم الموافق للحاجة.',
            en: 'Yā Razzāq — the Provider. Key rule: invoke with the name matching your need.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: 'Si tienes muchos pecados y quieres arrepentirte, ¿con qué nombre invocas?',
            ar: 'إذا كانت عليك ذنوب كثيرة وتريد التوبة، بأيّ اسم تدعو؟',
            en: 'If you have many sins and wish to repent, by which name do you invoke?',
          },
          options: [
            { es: 'Yā Ghafūr / Yā Tawwāb', ar: 'يا غفور / يا توّاب', en: 'Yā Ghafūr / Yā Tawwāb' },
            { es: 'Yā Aziz', ar: 'يا عزيز', en: 'Yā Aziz' },
            { es: 'Yā Kabir', ar: 'يا كبير', en: 'Yā Kabir' },
            { es: 'Yā Qawiyy', ar: 'يا قويّ', en: 'Yā Qawiyy' },
          ],
          correct: 0,
          feedback: {
            es: 'Ambos son excelentes: Al-Ghafur (Perdonador) o At-Tawwab (Aceptador del arrepentimiento). ¡Nunca desesperes!',
            ar: 'كلاهما صحيح: الغفور أو التوّاب. لا تيأس أبداً!',
            en: 'Both are excellent: Al-Ghafur (Forgiver) or At-Tawwab (Acceptor of repentance). Never despair!',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Es correcto rezar a los muertos rectos por sus nombres «piadosos»?',
            ar: 'هل يجوز الدعاء للأولياء الأموات بأسمائهم؟',
            en: 'Is it correct to pray to righteous dead people by their pious names?',
          },
          options: [
            { es: 'Sí, ayudan como intermediarios', ar: 'نعم كوسطاء', en: 'Yes, they help as intermediaries' },
            { es: 'No — solo Allah escucha, solo por Sus nombres', ar: 'لا — الله وحده يسمع، ويُدعى بأسمائه هو', en: 'No — only Allah listens, only by His names' },
            { es: 'Depende del país', ar: 'حسب البلد', en: 'Depends on the country' },
            { es: 'Solo los viernes', ar: 'يوم الجمعة فقط', en: 'Only on Fridays' },
          ],
          correct: 1,
          feedback: {
            es: 'Solo Allah escucha y responde du\'a. Invocar a otros — vivos o muertos — para pedirles cosas que solo Allah puede dar es shirk. Los nombres son de Allah, para Allah.',
            ar: 'الله وحده يسمع ويستجيب. دعاء غير الله فيما لا يقدر عليه إلا الله شرك. الأسماء لله وبها يُدعى.',
            en: 'Only Allah hears and responds to du\'a. Invoking others — living or dead — for things only Allah can grant is shirk. The names belong to Allah, for Allah.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuántos nombres de Allah conocemos con certeza absoluta?',
            ar: 'كم اسماً لله نعرفها بيقين مطلق؟',
            en: 'How many of Allah\'s names do we know with absolute certainty?',
          },
          options: [
            { es: 'Exactamente 99, ni más ni menos', ar: '99 بالضبط لا أكثر ولا أقل', en: 'Exactly 99, no more no less' },
            { es: 'Los 99 mencionados + otros. Allah tiene más nombres que solo Él conoce', ar: 'الـ99 المذكورة + غيرها. لله أسماء استأثر بها في علم الغيب', en: 'The 99 + others. Allah has more names known only to Him' },
            { es: 'Solo 5', ar: '5 فقط', en: 'Only 5' },
            { es: 'Ningún nombre — Allah no tiene nombre', ar: 'لا اسم — الله بلا اسم', en: 'No name — Allah has no name' },
          ],
          correct: 1,
          feedback: {
            es: 'Los 99 con recompensa específica + otros. En un hadith el Profeta ﷺ dijo: «...o [un nombre] que has guardado para Ti en el conocimiento del Ghayb.» (Ahmad, sahih)',
            ar: 'الـ99 لها الفضل المخصوص + غيرها. قال ﷺ: «...أو استأثرت به في علم الغيب عندك.» (أحمد، صحيح)',
            en: 'The 99 with specific reward + others. In a hadith: «...or [a name] You have reserved in the knowledge of the Unseen with You.» (Ahmad, sahih)',
          },
        },
        {
          type: 'card',
          title: { es: '🎓 ¡Curso completo!', ar: '🎓 اكتمل الكورس!', en: '🎓 Course complete!' },
          content: {
            es: '🌟 MashaAllah, has completado el curso de los 99 Nombres.\n\n📚 Ahora sabes:\n✅ El Hadith fundacional y su recompensa.\n✅ Los 10 nombres más famosos y sus significados profundos.\n✅ Nombres del Cuidado, la Provisión y la Grandeza.\n✅ Los 99 completos en 5 flashcards.\n✅ Cómo hacer du\'a con los nombres.\n✅ Cómo imitar los atributos (ta\'abbud).\n\n🌱 **Práctica diaria:**\n1. Memoriza 5 nombres nuevos por semana.\n2. Reflexiona sobre lo que cada nombre significa PARA TI.\n3. Al hacer du\'a, comienza con el nombre apropiado.\n4. Imita 1 atributo por mes en tu carácter.\n\n💫 «الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ» (Ar-Ra\'d 13:28)\n\n«Aquellos que creen y sus corazones se tranquilizan con el recuerdo de Allah — realmente, con el recuerdo de Allah los corazones se tranquilizan.»',
            ar: '🌟 ما شاء الله، أتممتَ كورس الأسماء الحسنى.\n\n📚 الآن تعرف:\n✅ حديث الأسماء والفضل.\n✅ العشرة الأشهر ومعانيها العميقة.\n✅ أسماء العناية والرزق والعظمة.\n✅ الـ99 كاملة في 5 مجموعات بطاقات.\n✅ الدعاء بالأسماء.\n✅ التخلّق بمعانيها.\n\n🌱 **التطبيق اليوميّ:**\n1. احفظ 5 أسماء جديدة كلّ أسبوع.\n2. تأمّل ما يعنيه كلّ اسم لك.\n3. ابدأ دعاءك بالاسم المناسب.\n4. تخلّق بصفة واحدة كلّ شهر.\n\n💫 «الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ» (الرعد 28)',
            en: '🌟 MashaAllah, you\'ve completed the 99 Names course.\n\n📚 Now you know:\n✅ The founding Hadith and its reward.\n✅ The 10 most famous names and deep meanings.\n✅ Names of Care, Provision, and Majesty.\n✅ All 99 in 5 flashcard sets.\n✅ How to make du\'a with the names.\n✅ How to imitate the attributes (ta\'abbud).\n\n🌱 **Daily practice:**\n1. Memorize 5 new names per week.\n2. Reflect on what each name means FOR YOU.\n3. When making du\'a, start with the appropriate name.\n4. Imitate 1 attribute per month in your character.\n\n💫 «Those who believe and whose hearts find rest in the remembrance of Allah — verily in Allah\'s remembrance do hearts find rest.» (Ar-Ra\'d 13:28)',
          },
          source: 'Quran 13:28',
        },
      ],
    },
  ],
};

if (typeof window !== 'undefined') window.COURSE_NAMES = COURSE_NAMES;
