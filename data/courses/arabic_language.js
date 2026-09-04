/**
 * 📖 Curso completo de Lengua Árabe — Quba v20
 * ══════════════════════════════════════════════════════════════════
 * Un curso INTERACTIVO diseñado para no-hispanohablantes/no-arabófonos
 * que quieren aprender árabe desde CERO — con enfoque en:
 *
 *  1) Pronunciación (Web Speech API + transliteración precisa)
 *  2) Reconocimiento visual de letras (aisladas y en palabras)
 *  3) Vocabulario esencial con imágenes/emojis contextuales
 *  4) Formas de las letras (inicial · medial · final · aislada)
 *  5) Diacríticos (fatha, damma, kasra, sukun, shadda)
 *  6) Lectura de palabras y frases simples
 *
 * Fuentes académicas:
 * ─────────────────────
 *  • «Al-Kitāb al-Asāsī fī Ta'līm al-Lugha al-'Arabiyya» (ALECSO)
 *  • «Alif Baa: Introduction to Arabic Letters and Sounds» (Kristen Brustad, Al-Batal, Al-Tonsi, Georgetown Univ. Press)
 *  • «Ta'līm al-'Arabiyya li-Ghayr al-Nāṭiqīn Bihā» — Madīnah Book Series (Dr. V. Abdur Rahim, Islamic University of Madinah)
 *  • «Mabādi' al-'Arabiyya» (Rashid al-Shartouni)
 *  • Al-Jazariyyah (para tajwid & articulación de letras)
 *
 * Compatibilidad:
 * ─────────────────
 *  Nueva estructura de lección: 'arabic_letter' — renderizada por CoursesPage.
 *  Los quizzes usan el formato estándar { question, options, correct, feedback }.
 *
 * @audience No-arabic speakers (starting from zero)
 * @level Beginner → A1 CEFR equivalent
 * @duration ~90 min (dividido en 8 estaciones)
 * @theological_review N/A — contenido lingüístico, no doctrinal.
 */

const COURSE_ARABIC_LANGUAGE = {
  id: 'arabic_language',
  slug: 'arabic-language',
  icon: '<i class="fas fa-language"></i>',
  mascotPose: 'welcome',
  color: '#8B5A2B', // sepia/manuscript color — evoca los antiguos manuscritos árabes
  ageGroup: 'all',
  durationMin: 90,
  difficulty: 'beginner',

  title: {
    es: 'Aprende Árabe desde Cero',
    ar: 'تعلّم العربية من الصفر',
    en: 'Learn Arabic from Zero',
  },
  description: {
    es: 'Un viaje interactivo por el alfabeto, sonidos, vocabulario y lectura del árabe — con audio y ejemplos visuales.',
    ar: 'رحلة تفاعلية عبر الأبجدية والأصوات والمفردات وقراءة العربية — مع الصوت وأمثلة بصرية.',
    en: 'An interactive journey through the alphabet, sounds, vocabulary and reading of Arabic — with audio and visual examples.',
  },

  stations: [
    // ═════════════════════════════════════════════════════════════════
    // 🏛️ ESTACIÓN 1 — Introducción al idioma árabe
    // ═════════════════════════════════════════════════════════════════
    {
      id: 'intro',
      icon: '<i class="fas fa-scroll"></i>',
      title: { es: 'Bienvenida al Árabe', ar: 'أهلاً بالعربية', en: 'Welcome to Arabic' },
      mascotIntro: {
        es: '¡As-salamu alaykum! El árabe es la lengua del Corán, hablada por más de 400 millones de personas. Comenzaremos por lo esencial.',
        ar: 'السلام عليكم! العربية لغة القرآن، يتكلم بها أكثر من 400 مليون شخص. سنبدأ بالأساسيات.',
        en: 'As-salamu alaykum! Arabic is the language of the Quran, spoken by over 400 million people. We\'ll start with the essentials.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: '¿Por qué aprender árabe?', ar: 'لماذا نتعلّم العربية؟', en: 'Why learn Arabic?' },
          content: {
            es: '📖 Es la lengua del Corán — leer el Libro Sagrado en su idioma original.\n\n🌍 6ª lengua más hablada del mundo (~420 millones de nativos).\n\n🕌 Lengua litúrgica del Islam: la Salah, adhan y du\'a son en árabe.\n\n🏛️ Puerta a 1400 años de literatura, ciencia, filosofía y poesía.\n\n🔤 Alfabeto de 28 letras — más simple de lo que parece.',
            ar: '📖 لغة القرآن الكريم — قراءة كتاب الله بلغته الأصلية.\n\n🌍 سادس أكثر اللغات تحدّثاً في العالم (~420 مليون ناطق).\n\n🕌 لغة الإسلام الطقسية: الصلاة والأذان والدعاء بالعربية.\n\n🏛️ باب إلى 1400 عام من الأدب والعلم والفلسفة والشعر.\n\n🔤 أبجدية من 28 حرفاً — أبسط ممّا تظنّ.',
            en: '📖 It is the language of the Quran — read the Holy Book in its original tongue.\n\n🌍 6th most spoken language in the world (~420 million native speakers).\n\n🕌 The liturgical language of Islam: Salah, adhan, and du\'a are in Arabic.\n\n🏛️ A gateway to 1400 years of literature, science, philosophy, and poetry.\n\n🔤 An alphabet of 28 letters — simpler than it looks.',
          },
          source: 'Ethnologue 2024 · UNESCO Arabic Language Day',
        },
        {
          type: 'card',
          title: { es: '3 características únicas del árabe', ar: '3 خصائص فريدة للعربية', en: '3 unique features of Arabic' },
          content: {
            es: '➡️ Se escribe de DERECHA a IZQUIERDA (← así).\n\n🔗 Las letras se CONECTAN entre sí, formando palabras cursivas.\n\n🔄 Cada letra tiene hasta 4 FORMAS: aislada · inicial · medial · final.\n\n🎵 Los sonidos (harakat) se marcan con símbolos ARRIBA o ABAJO de las letras.\n\n🌳 Las palabras se derivan de RAÍCES de 3 letras (ej: k-t-b → escribir, libro, escritor, biblioteca).',
            ar: '➡️ تُكتب من اليمين إلى اليسار.\n\n🔗 الحروف تتّصل ببعضها لتُكوّن كلمات متّصلة.\n\n🔄 لكل حرف حتى 4 أشكال: منفصل · في البداية · في الوسط · في النهاية.\n\n🎵 الحركات تُوضع فوق الحرف أو تحته.\n\n🌳 الكلمات تُشتقّ من جذور ثلاثية (مثال: ك-ت-ب → كتب، كتاب، كاتب، مكتبة).',
            en: '➡️ Written from RIGHT to LEFT (← like this).\n\n🔗 Letters CONNECT to each other, forming cursive words.\n\n🔄 Each letter has up to 4 SHAPES: isolated · initial · medial · final.\n\n🎵 Vowels (harakat) are marked with symbols ABOVE or BELOW letters.\n\n🌳 Words derive from 3-letter ROOTS (e.g. k-t-b → wrote, book, writer, library).',
          },
          source: 'Alif Baa (Georgetown Univ. Press) — Ch. Introduction',
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuántas letras tiene el alfabeto árabe?',
            ar: 'كم عدد حروف الأبجدية العربية؟',
            en: 'How many letters are in the Arabic alphabet?',
          },
          options: ['24', '26', '28', '30'],
          correct: 2,
          feedback: {
            es: '¡Correcto! 28 letras. Todas son consonantes; las vocales cortas se marcan con signos (harakat).',
            ar: 'صحيح! 28 حرفاً. جميعها صوامت، وتُضاف الحركات القصيرة بعلامات.',
            en: 'Correct! 28 letters. All are consonants; short vowels are marked with signs (harakat).',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿En qué dirección se escribe el árabe?',
            ar: 'في أيّ اتّجاه تُكتب العربية؟',
            en: 'In which direction is Arabic written?',
          },
          options: [
            { es: 'Izquierda a derecha', ar: 'من اليسار إلى اليمين', en: 'Left to right' },
            { es: 'Derecha a izquierda', ar: 'من اليمين إلى اليسار', en: 'Right to left' },
            { es: 'De arriba a abajo', ar: 'من الأعلى إلى الأسفل', en: 'Top to bottom' },
            { es: 'Depende del texto', ar: 'حسب النصّ', en: 'It depends on the text' },
          ],
          correct: 1,
          feedback: {
            es: 'Sí — el árabe se escribe de derecha a izquierda, como el hebreo y el persa.',
            ar: 'نعم — العربية تُكتب من اليمين إلى اليسار.',
            en: 'Yes — Arabic is written right to left, like Hebrew and Persian.',
          },
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════
    // 🔤 ESTACIÓN 2 — Las primeras 7 letras + audio
    // ═════════════════════════════════════════════════════════════════
    {
      id: 'letters_group_1',
      icon: '<i class="fas fa-font"></i>',
      title: { es: 'Grupo 1: ا ب ت ث ج ح خ', ar: 'المجموعة 1: ا ب ت ث ج ح خ', en: 'Group 1: ا ب ت ث ج ح خ' },
      mascotIntro: {
        es: '¡Empecemos! Toca el botón 🔊 para escuchar cada letra. Presta atención a las formas.',
        ar: 'لنبدأ! اضغط الزرّ 🔊 لسماع كلّ حرف. انتبه إلى الأشكال.',
        en: 'Let\'s start! Tap the 🔊 button to hear each letter. Pay attention to the shapes.',
      },
      lessons: [
        {
          type: 'arabic_letter',
          letter: 'ا',
          name: { ar: 'ألف', translit: 'Alif' },
          sound: { es: 'como la "a" en "casa" (sonido largo /aː/)', ar: 'مثل الألف في «باب»', en: 'like "a" in "father" (long /aː/)' },
          forms: { isolated: 'ا', initial: 'ا', medial: 'ـا', final: 'ـا' },
          notConnects: true, // Alif no conecta después
          example: {
            word: 'أَبٌ',
            translit: 'ab',
            meaning: { es: 'padre', ar: 'أب', en: 'father' },
            emoji: '👨',
          },
          note: {
            es: 'La Alif es la primera letra. NO se conecta con la letra que le sigue.',
            ar: 'الألف أوّل حرف. لا تتّصل بما بعدها.',
            en: 'Alif is the 1st letter. It does NOT connect to the letter after it.',
          },
          source: 'Alif Baa · Unit 1',
        },
        {
          type: 'arabic_letter',
          letter: 'ب',
          name: { ar: 'باء', translit: 'Baa' },
          sound: { es: 'como la "b" en "barco"', ar: 'مثل الباء في «باب»', en: 'like "b" in "book"' },
          forms: { isolated: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب' },
          example: {
            word: 'بَابٌ',
            translit: 'bāb',
            meaning: { es: 'puerta', ar: 'باب', en: 'door' },
            emoji: '🚪',
          },
          note: {
            es: 'El punto va DEBAJO. Cuidado: ت (2 puntos arriba) y ث (3 puntos arriba) tienen la misma forma.',
            ar: 'النقطة تحت الحرف. انتبه: ت (نقطتان فوق) و ث (ثلاث نقاط فوق) لهما نفس الشكل.',
            en: 'The dot goes BELOW. Beware: ت (2 dots above) and ث (3 dots above) share the same shape.',
          },
          source: 'Alif Baa · Unit 1',
        },
        {
          type: 'arabic_letter',
          letter: 'ت',
          name: { ar: 'تاء', translit: 'Taa' },
          sound: { es: 'como la "t" en "taza"', ar: 'مثل التاء في «تفّاح»', en: 'like "t" in "tea"' },
          forms: { isolated: 'ت', initial: 'تـ', medial: 'ـتـ', final: 'ـت' },
          example: {
            word: 'تُفّاحٌ',
            translit: 'tuffāḥ',
            meaning: { es: 'manzana', ar: 'تفّاح', en: 'apple' },
            emoji: '🍎',
          },
          note: {
            es: 'Dos puntos ARRIBA. Misma silueta que ب y ث.',
            ar: 'نقطتان فوق الحرف. نفس شكل ب و ث.',
            en: 'Two dots ABOVE. Same shape as ب and ث.',
          },
          source: 'Alif Baa · Unit 1',
        },
        {
          type: 'arabic_letter',
          letter: 'ث',
          name: { ar: 'ثاء', translit: 'Thaa' },
          sound: { es: 'como "th" en inglés "think" (interdental sorda)', ar: 'مثل الثاء في «ثوب»', en: 'like "th" in "think"' },
          forms: { isolated: 'ث', initial: 'ثـ', medial: 'ـثـ', final: 'ـث' },
          example: {
            word: 'ثَوْبٌ',
            translit: 'thawb',
            meaning: { es: 'vestimenta', ar: 'ثوب', en: 'garment' },
            emoji: '👕',
          },
          note: {
            es: 'Tres puntos ARRIBA. Este sonido no existe en español moderno (sí en el castellano de España como la "z" de "zapato").',
            ar: 'ثلاث نقاط فوق الحرف. هذا الصوت غير موجود في الإسبانية اللاتينية.',
            en: 'Three dots ABOVE. This sound doesn\'t exist in Spanish (Latin America) but is like Castilian "z".',
          },
          source: 'Alif Baa · Unit 1',
        },
        {
          type: 'arabic_letter',
          letter: 'ج',
          name: { ar: 'جيم', translit: 'Jīm' },
          sound: { es: 'como "y" en "yo" (Argentina) o "j" en inglés "job"', ar: 'مثل الجيم في «جمل»', en: 'like "j" in "job"' },
          forms: { isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج' },
          example: {
            word: 'جَمَلٌ',
            translit: 'jamal',
            meaning: { es: 'camello', ar: 'جمل', en: 'camel' },
            emoji: '🐫',
          },
          note: {
            es: 'Un punto DEBAJO. Comparte silueta con ح y خ.',
            ar: 'نقطة تحت الحرف. نفس شكل ح و خ.',
            en: 'One dot BELOW. Shares shape with ح and خ.',
          },
          source: 'Alif Baa · Unit 2',
        },
        {
          type: 'arabic_letter',
          letter: 'ح',
          name: { ar: 'حاء', translit: 'Ḥaa' },
          sound: { es: '"h" ASPIRADA muy fuerte, desde el fondo de la garganta (sin equivalente en español)', ar: 'حاء قويّة من عمق الحلق', en: 'strongly aspirated "h" from deep throat (no English equivalent)' },
          forms: { isolated: 'ح', initial: 'حـ', medial: 'ـحـ', final: 'ـح' },
          example: {
            word: 'حُبٌّ',
            translit: 'ḥubb',
            meaning: { es: 'amor', ar: 'حبّ', en: 'love' },
            emoji: '❤️',
          },
          note: {
            es: '⚠️ Letra "gutural". Practica: imagina que empañas un cristal con vaho, pero con más fuerza.',
            ar: '⚠️ حرف حلقيّ. تدرّب: كأنّك تُخرج نفَساً حارّاً بقوّة.',
            en: '⚠️ "Guttural" letter. Practice: imagine fogging a mirror with your breath, but stronger.',
          },
          source: 'Al-Jazariyyah · Makhārij al-Ḥurūf (throat letters)',
        },
        {
          type: 'arabic_letter',
          letter: 'خ',
          name: { ar: 'خاء', translit: 'Khaa' },
          sound: { es: 'como la "j" española de "jota" o "ch" alemana de "Bach"', ar: 'مثل الخاء في «خبز»', en: 'like Scottish "ch" in "loch" or German "Bach"' },
          forms: { isolated: 'خ', initial: 'خـ', medial: 'ـخـ', final: 'ـخ' },
          example: {
            word: 'خُبْزٌ',
            translit: 'khubz',
            meaning: { es: 'pan', ar: 'خبز', en: 'bread' },
            emoji: '🍞',
          },
          note: {
            es: 'Un punto ARRIBA. ¡Buena noticia para hispanohablantes: este sonido existe en tu idioma!',
            ar: 'نقطة فوق الحرف. هذا الصوت موجود بالإسبانية (مثل «jota»).',
            en: 'One dot ABOVE. Good news for Spanish speakers — this sound exists in their language!',
          },
          source: 'Alif Baa · Unit 2',
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuál de estas letras tiene UN punto DEBAJO?',
            ar: 'أيّ من هذه الحروف له نقطة واحدة تحته؟',
            en: 'Which of these letters has ONE dot BELOW?',
          },
          options: ['ت', 'ب', 'ث', 'خ'],
          correct: 1,
          feedback: {
            es: 'ب (Baa) es la única con un punto DEBAJO. ت tiene 2 arriba, ث tiene 3 arriba, خ tiene 1 arriba.',
            ar: 'الباء لها نقطة واحدة تحتها. التاء نقطتان فوق، الثاء ثلاث فوق، الخاء واحدة فوق.',
            en: 'ب (Baa) is the only one with one dot BELOW.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '"جَمَلٌ" significa:',
            ar: '«جَمَلٌ» تعني:',
            en: '"jamal" (جَمَلٌ) means:',
          },
          options: [
            { es: 'Perro 🐕', ar: 'كلب', en: 'Dog 🐕' },
            { es: 'Caballo 🐎', ar: 'حصان', en: 'Horse 🐎' },
            { es: 'Camello 🐫', ar: 'جمل', en: 'Camel 🐫' },
            { es: 'León 🦁', ar: 'أسد', en: 'Lion 🦁' },
          ],
          correct: 2,
          feedback: {
            es: '¡Correcto! Jamal = camello. Un animal muy importante en la cultura árabe.',
            ar: 'صحيح! جمل — حيوان مهمّ في الثقافة العربية.',
            en: 'Correct! Jamal = camel. A very important animal in Arabic culture.',
          },
        },
        {
          type: 'flashcards',
          title: { es: 'Repaso Grupo 1', ar: 'مراجعة المجموعة 1', en: 'Group 1 review' },
          cards: [
            { front: 'ا', back: { es: 'Alif — "a"', ar: 'ألف', en: 'Alif — "a"' } },
            { front: 'ب', back: { es: 'Baa — "b"', ar: 'باء', en: 'Baa — "b"' } },
            { front: 'ت', back: { es: 'Taa — "t"', ar: 'تاء', en: 'Taa — "t"' } },
            { front: 'ث', back: { es: 'Thaa — "th" (think)', ar: 'ثاء', en: 'Thaa — "th"' } },
            { front: 'ج', back: { es: 'Jīm — "y" argentina', ar: 'جيم', en: 'Jīm — "j"' } },
            { front: 'ح', back: { es: 'Ḥaa — "h" fuerte', ar: 'حاء', en: 'Ḥaa — strong h' } },
            { front: 'خ', back: { es: 'Khaa — "j" española', ar: 'خاء', en: 'Khaa — Scottish "ch"' } },
          ],
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════
    // 🔤 ESTACIÓN 3 — Grupo 2: د ذ ر ز س ش
    // ═════════════════════════════════════════════════════════════════
    {
      id: 'letters_group_2',
      icon: '<i class="fas fa-font"></i>',
      title: { es: 'Grupo 2: د ذ ر ز س ش', ar: 'المجموعة 2: د ذ ر ز س ش', en: 'Group 2: د ذ ر ز س ش' },
      mascotIntro: {
        es: '¡Bien! Continuemos con 6 letras más. Nota: د ذ ر ز NO se conectan con la letra siguiente.',
        ar: 'أحسنت! لنكمل مع 6 حروف أخرى. لاحظ: د ذ ر ز لا تتّصل بما بعدها.',
        en: 'Great! Let\'s continue with 6 more letters. Note: د ذ ر ز do NOT connect to the next letter.',
      },
      lessons: [
        {
          type: 'arabic_letter',
          letter: 'د',
          name: { ar: 'دال', translit: 'Dāl' },
          sound: { es: 'como la "d" en "dado"', ar: 'مثل الدال في «دار»', en: 'like "d" in "door"' },
          forms: { isolated: 'د', initial: 'د', medial: 'ـد', final: 'ـد' },
          notConnects: true,
          example: {
            word: 'دَارٌ',
            translit: 'dār',
            meaning: { es: 'casa/hogar', ar: 'دار', en: 'house/home' },
            emoji: '🏠',
          },
          note: {
            es: 'Sin puntos. NO se conecta con la letra siguiente.',
            ar: 'بدون نقاط. لا تتّصل بما بعدها.',
            en: 'No dots. Does NOT connect to the next letter.',
          },
          source: 'Alif Baa · Unit 3',
        },
        {
          type: 'arabic_letter',
          letter: 'ذ',
          name: { ar: 'ذال', translit: 'Dhāl' },
          sound: { es: 'como "th" en inglés "this" (interdental sonora)', ar: 'مثل الذال في «ذهب»', en: 'like "th" in "this"' },
          forms: { isolated: 'ذ', initial: 'ذ', medial: 'ـذ', final: 'ـذ' },
          notConnects: true,
          example: {
            word: 'ذَهَبٌ',
            translit: 'dhahab',
            meaning: { es: 'oro', ar: 'ذهب', en: 'gold' },
            emoji: '🪙',
          },
          note: {
            es: 'Un punto ARRIBA. Vibra la lengua entre los dientes, con voz.',
            ar: 'نقطة فوق الحرف. تُنطق باللسان بين الأسنان مع الصوت.',
            en: 'One dot ABOVE. Tongue vibrates between teeth, voiced.',
          },
          source: 'Alif Baa · Unit 3',
        },
        {
          type: 'arabic_letter',
          letter: 'ر',
          name: { ar: 'راء', translit: 'Rāa' },
          sound: { es: 'como la "r" en "pero" (una sola vibración, suave)', ar: 'مثل الراء في «رأس»', en: 'like Spanish soft "r" in "pero" (single tap)' },
          forms: { isolated: 'ر', initial: 'ر', medial: 'ـر', final: 'ـر' },
          notConnects: true,
          example: {
            word: 'رَأْسٌ',
            translit: 'ra\'s',
            meaning: { es: 'cabeza', ar: 'رأس', en: 'head' },
            emoji: '👤',
          },
          note: {
            es: 'Sin puntos. NO se conecta después. Es una vibración SIMPLE (no como la "rr" fuerte del español).',
            ar: 'بدون نقاط. لا تتّصل بما بعدها. تكرار واحد فقط.',
            en: 'No dots. Does NOT connect. A single tap, not a rolled "rr".',
          },
          source: 'Alif Baa · Unit 3',
        },
        {
          type: 'arabic_letter',
          letter: 'ز',
          name: { ar: 'زاي', translit: 'Zāy' },
          sound: { es: 'como la "z" del inglés "zebra" o la "s" sonora de "mismo"', ar: 'مثل الزاي في «زيت»', en: 'like "z" in "zebra"' },
          forms: { isolated: 'ز', initial: 'ز', medial: 'ـز', final: 'ـز' },
          notConnects: true,
          example: {
            word: 'زَيْتٌ',
            translit: 'zayt',
            meaning: { es: 'aceite', ar: 'زيت', en: 'oil' },
            emoji: '🫒',
          },
          note: {
            es: 'Un punto ARRIBA. Mismo dibujo que ر pero con punto.',
            ar: 'نقطة فوق الحرف. نفس رسم الراء مع نقطة.',
            en: 'One dot ABOVE. Same shape as ر but with a dot.',
          },
          source: 'Alif Baa · Unit 3',
        },
        {
          type: 'arabic_letter',
          letter: 'س',
          name: { ar: 'سين', translit: 'Sīn' },
          sound: { es: 'como la "s" en "sol"', ar: 'مثل السين في «سماء»', en: 'like "s" in "sun"' },
          forms: { isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس' },
          example: {
            word: 'سَمَاءٌ',
            translit: 'samā\'',
            meaning: { es: 'cielo', ar: 'سماء', en: 'sky' },
            emoji: '☁️',
          },
          note: {
            es: 'Tres "dientecitos" sin puntos.',
            ar: 'ثلاث أسنان بدون نقاط.',
            en: 'Three "teeth" without dots.',
          },
          source: 'Alif Baa · Unit 4',
        },
        {
          type: 'arabic_letter',
          letter: 'ش',
          name: { ar: 'شين', translit: 'Shīn' },
          sound: { es: 'como "sh" en inglés "she" o "ch" francés de "chat"', ar: 'مثل الشين في «شمس»', en: 'like "sh" in "she"' },
          forms: { isolated: 'ش', initial: 'شـ', medial: 'ـشـ', final: 'ـش' },
          example: {
            word: 'شَمْسٌ',
            translit: 'shams',
            meaning: { es: 'sol', ar: 'شمس', en: 'sun' },
            emoji: '☀️',
          },
          note: {
            es: 'Igual que س pero con TRES puntos arriba.',
            ar: 'نفس السين مع ثلاث نقاط فوق.',
            en: 'Like س but with THREE dots above.',
          },
          source: 'Alif Baa · Unit 4',
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuál letra NO se conecta con la letra siguiente?',
            ar: 'أيّ حرف لا يتّصل بما بعده؟',
            en: 'Which letter does NOT connect to the letter after it?',
          },
          options: ['س', 'ب', 'ر', 'ت'],
          correct: 2,
          feedback: {
            es: 'ر (Rāa) es una de las 6 letras "aisladas": ا د ذ ر ز و — nunca se conectan hacia adelante.',
            ar: 'الراء من الحروف الستّة التي لا تتّصل بما بعدها: ا د ذ ر ز و.',
            en: 'ر is one of the 6 "non-connecting" letters: ا د ذ ر ز و.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '"شَمْسٌ" (shams) significa:',
            ar: '«شَمْسٌ» تعني:',
            en: '"shams" (شَمْسٌ) means:',
          },
          options: [
            { es: 'Luna 🌙', ar: 'قمر', en: 'Moon 🌙' },
            { es: 'Sol ☀️', ar: 'شمس', en: 'Sun ☀️' },
            { es: 'Estrella ⭐', ar: 'نجم', en: 'Star ⭐' },
            { es: 'Nube ☁️', ar: 'سحاب', en: 'Cloud ☁️' },
          ],
          correct: 1,
          feedback: {
            es: '¡Sí! Shams = sol. Verás esta palabra en el Corán muchas veces.',
            ar: 'نعم! الشمس — كلمة تتكرّر كثيراً في القرآن.',
            en: 'Yes! Shams = sun. You\'ll see this word often in the Quran.',
          },
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════
    // 🔤 ESTACIÓN 4 — Grupo 3: ص ض ط ظ ع غ (letras "enfáticas")
    // ═════════════════════════════════════════════════════════════════
    {
      id: 'letters_group_3',
      icon: '<i class="fas fa-font"></i>',
      title: { es: 'Grupo 3: ص ض ط ظ ع غ (enfáticas)', ar: 'المجموعة 3: ص ض ط ظ ع غ', en: 'Group 3: ص ض ط ظ ع غ (emphatic)' },
      mascotIntro: {
        es: 'Estas son las letras "enfáticas" o "pesadas". Se pronuncian con la lengua hacia atrás y el sonido más grave. ¡Son únicas del árabe!',
        ar: 'هذه هي الحروف المُفَخَّمة. تُنطق باللسان مرفوعاً إلى أعلى الفم بصوت مُغلَّظ. فريدة في العربية!',
        en: 'These are the "emphatic" or "heavy" letters. Pronounced with tongue back and a deep sound. Unique to Arabic!',
      },
      lessons: [
        {
          type: 'arabic_letter',
          letter: 'ص',
          name: { ar: 'صاد', translit: 'Ṣād' },
          sound: { es: '"s" ENFÁTICA — lengua hacia atrás, sonido grave', ar: 'صاد مُفخَّمة', en: 'emphatic "s" — tongue back, deep' },
          forms: { isolated: 'ص', initial: 'صـ', medial: 'ـصـ', final: 'ـص' },
          example: {
            word: 'صَدِيقٌ',
            translit: 'ṣadīq',
            meaning: { es: 'amigo', ar: 'صديق', en: 'friend' },
            emoji: '🤝',
          },
          note: {
            es: 'La versión "grave" de س. Compara: سَيْف (espada) vs صَيْف (verano).',
            ar: 'النسخة المُفخَّمة من السين. قارن: سَيْف vs صَيْف.',
            en: 'Emphatic version of س. Compare: سَيْف (sword) vs صَيْف (summer).',
          },
          source: 'Al-Jazariyyah · Ḥurūf al-Iṭbāq',
        },
        {
          type: 'arabic_letter',
          letter: 'ض',
          name: { ar: 'ضاد', translit: 'Ḍād' },
          sound: { es: '"d" ENFÁTICA — el sonido más único del árabe', ar: 'ضاد مُفخَّمة', en: 'emphatic "d" — the most unique Arabic sound' },
          forms: { isolated: 'ض', initial: 'ضـ', medial: 'ـضـ', final: 'ـض' },
          example: {
            word: 'ضَوْءٌ',
            translit: 'ḍaw\'',
            meaning: { es: 'luz', ar: 'ضوء', en: 'light' },
            emoji: '💡',
          },
          note: {
            es: '💫 El árabe es llamado "Lughat al-Ḍād" (لغة الضاد, "la lengua del Ḍād") porque este sonido es EXCLUSIVO del árabe.',
            ar: '💫 تُسمّى العربية «لغة الضاد» لأنّ هذا الصوت خاصّ بها.',
            en: '💫 Arabic is called "Lughat al-Ḍād" (the language of the Ḍād) because this sound is EXCLUSIVE to Arabic.',
          },
          source: 'Al-Jazariyyah · Makhraj al-Ḍād',
        },
        {
          type: 'arabic_letter',
          letter: 'ط',
          name: { ar: 'طاء', translit: 'Ṭāa' },
          sound: { es: '"t" ENFÁTICA — sonido grave, lengua atrás', ar: 'طاء مُفخَّمة', en: 'emphatic "t" — deep sound' },
          forms: { isolated: 'ط', initial: 'طـ', medial: 'ـطـ', final: 'ـط' },
          example: {
            word: 'طَعَامٌ',
            translit: 'ṭa\'ām',
            meaning: { es: 'comida', ar: 'طعام', en: 'food' },
            emoji: '🍽️',
          },
          note: {
            es: 'Versión enfática de ت. Su forma no cambia mucho entre las 4 posiciones.',
            ar: 'النسخة المُفخَّمة من التاء.',
            en: 'Emphatic version of ت. Its shape barely changes across positions.',
          },
          source: 'Alif Baa · Unit 5',
        },
        {
          type: 'arabic_letter',
          letter: 'ظ',
          name: { ar: 'ظاء', translit: 'Ẓāa' },
          sound: { es: '"th" enfática (como "this" pero más grave)', ar: 'ظاء مُفخَّمة', en: 'emphatic "th" as in "this" but deeper' },
          forms: { isolated: 'ظ', initial: 'ظـ', medial: 'ـظـ', final: 'ـظ' },
          example: {
            word: 'ظِلٌّ',
            translit: 'ẓill',
            meaning: { es: 'sombra', ar: 'ظلّ', en: 'shade/shadow' },
            emoji: '🌳',
          },
          note: {
            es: 'Igual que ط pero con un punto arriba. Sonido enfático de ذ.',
            ar: 'نفس الطاء مع نقطة فوق. النسخة المُفخَّمة من الذال.',
            en: 'Like ط but with a dot above. Emphatic version of ذ.',
          },
          source: 'Alif Baa · Unit 5',
        },
        {
          type: 'arabic_letter',
          letter: 'ع',
          name: { ar: 'عين', translit: '\'Ayn' },
          sound: { es: 'Sonido GUTURAL profundo, sin equivalente. Se produce apretando la garganta.', ar: 'حرف حلقيّ عميق', en: 'Deep GUTTURAL sound, no equivalent. Produced by constricting the throat.' },
          forms: { isolated: 'ع', initial: 'عـ', medial: 'ـعـ', final: 'ـع' },
          example: {
            word: 'عَيْنٌ',
            translit: '\'ayn',
            meaning: { es: 'ojo / fuente de agua', ar: 'عين', en: 'eye / spring of water' },
            emoji: '👁️',
          },
          note: {
            es: '⚠️ Uno de los sonidos más difíciles. Practica: haz "ah" mientras aprietas la parte de atrás de la garganta.',
            ar: '⚠️ من أصعب الأصوات. تدرّب: قل «آه» مع ضغط أسفل الحلق.',
            en: '⚠️ One of the hardest sounds. Practice: say "ah" while constricting the back of your throat.',
          },
          source: 'Al-Jazariyyah · Makhārij al-Ḥalq',
        },
        {
          type: 'arabic_letter',
          letter: 'غ',
          name: { ar: 'غين', translit: 'Ghayn' },
          sound: { es: 'como la "g" de "gato" pero más gutural, o la "r" francesa parisina', ar: 'غين — كأنّ الحلق يهتزّ', en: 'like French "r" in "Paris"' },
          forms: { isolated: 'غ', initial: 'غـ', medial: 'ـغـ', final: 'ـغ' },
          example: {
            word: 'غُرَابٌ',
            translit: 'ghurāb',
            meaning: { es: 'cuervo', ar: 'غراب', en: 'crow' },
            emoji: '🐦‍⬛',
          },
          note: {
            es: 'Igual que ع pero con un punto arriba. Piensa en hacer gárgaras suaves.',
            ar: 'نفس العين مع نقطة فوق. كأنّك تُغرغِر بلطف.',
            en: 'Like ع but with a dot above. Think of a gentle gargle.',
          },
          source: 'Alif Baa · Unit 6',
        },
        {
          type: 'quiz',
          question: {
            es: '¿Por qué se llama al árabe "Lughat al-Ḍād"?',
            ar: 'لماذا تُسمّى العربية «لغة الضاد»؟',
            en: 'Why is Arabic called "Lughat al-Ḍād"?',
          },
          options: [
            { es: 'Porque el ض es la letra más común', ar: 'لأنّ الضاد الأكثر شيوعاً', en: 'Because ض is the most common letter' },
            { es: 'Porque el sonido ض es exclusivo del árabe', ar: 'لأنّ صوت الضاد خاصّ بالعربية', en: 'Because the ض sound is exclusive to Arabic' },
            { es: 'Porque el árabe empieza con ض', ar: 'لأنّ العربية تبدأ بالضاد', en: 'Because Arabic starts with ض' },
            { es: 'Es un nombre poético sin significado', ar: 'اسم شعريّ فقط', en: 'It\'s just a poetic name' },
          ],
          correct: 1,
          feedback: {
            es: 'Exacto. Ninguna otra lengua tiene el sonido puro del ض, por eso el árabe se identifica con él.',
            ar: 'بالضبط. لا توجد لغة أخرى فيها صوت الضاد الأصيل.',
            en: 'Exactly. No other language has the pure ض sound, so Arabic is identified with it.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuál de estas parejas es "letra normal" vs "letra enfática"?',
            ar: 'أيّ زوج «مرقّق» مقابل «مفخّم»؟',
            en: 'Which pair is "normal" vs "emphatic"?',
          },
          options: [
            { es: 'ب / ف', ar: 'ب / ف', en: 'ب / ف' },
            { es: 'س / ص', ar: 'س / ص', en: 'س / ص' },
            { es: 'م / ن', ar: 'م / ن', en: 'م / ن' },
            { es: 'ك / ل', ar: 'ك / ل', en: 'ك / ل' },
          ],
          correct: 1,
          feedback: {
            es: 'Correcto. س (s normal) ↔ ص (s enfática). Otros pares: ت↔ط, د↔ض, ذ↔ظ.',
            ar: 'صحيح. الأزواج: س↔ص، ت↔ط، د↔ض، ذ↔ظ.',
            en: 'Correct. Other pairs: ت↔ط, د↔ض, ذ↔ظ.',
          },
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════
    // 🔤 ESTACIÓN 5 — Grupo 4: ف ق ك ل م ن هـ و ي
    // ═════════════════════════════════════════════════════════════════
    {
      id: 'letters_group_4',
      icon: '<i class="fas fa-font"></i>',
      title: { es: 'Grupo 4: ف ق ك ل م ن هـ و ي', ar: 'المجموعة 4: ف ق ك ل م ن هـ و ي', en: 'Group 4: ف ق ك ل م ن هـ و ي' },
      mascotIntro: {
        es: '¡Últimas 9 letras! Después de esto sabrás las 28 completas.',
        ar: 'آخر 9 حروف! بعدها ستعرف الـ28 كاملة.',
        en: 'Final 9 letters! After this you\'ll know all 28.',
      },
      lessons: [
        {
          type: 'arabic_letter',
          letter: 'ف',
          name: { ar: 'فاء', translit: 'Fāa' },
          sound: { es: 'como la "f" en "foto"', ar: 'مثل الفاء في «فم»', en: 'like "f" in "foot"' },
          forms: { isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف' },
          example: { word: 'فَمٌ', translit: 'fam', meaning: { es: 'boca', ar: 'فم', en: 'mouth' }, emoji: '👄' },
          note: { es: 'Un punto ARRIBA.', ar: 'نقطة فوق.', en: 'One dot ABOVE.' },
          source: 'Alif Baa · Unit 6',
        },
        {
          type: 'arabic_letter',
          letter: 'ق',
          name: { ar: 'قاف', translit: 'Qāf' },
          sound: { es: '"k" pronunciada muy atrás en la garganta (uvular)', ar: 'قاف — من أقصى الحلق', en: '"k" pronounced far back in throat (uvular)' },
          forms: { isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق' },
          example: { word: 'قَمَرٌ', translit: 'qamar', meaning: { es: 'luna', ar: 'قمر', en: 'moon' }, emoji: '🌙' },
          note: {
            es: 'Dos puntos ARRIBA. NO es como la "k" española. Piensa en tragar una "k".',
            ar: 'نقطتان فوق. تُنطق من أقصى الحلق، ليست كالكاف.',
            en: 'Two dots ABOVE. NOT like English "k". Think of swallowing a "k".',
          },
          source: 'Al-Jazariyyah · Aqṣā al-Lisān',
        },
        {
          type: 'arabic_letter',
          letter: 'ك',
          name: { ar: 'كاف', translit: 'Kāf' },
          sound: { es: 'como la "k" en "casa"', ar: 'مثل الكاف في «كتاب»', en: 'like "k" in "kite"' },
          forms: { isolated: 'ك', initial: 'كـ', medial: 'ـكـ', final: 'ـك' },
          example: { word: 'كِتَابٌ', translit: 'kitāb', meaning: { es: 'libro', ar: 'كتاب', en: 'book' }, emoji: '📖' },
          note: {
            es: 'La forma cambia bastante entre aislada (ك) e inicial/medial (كـ ـكـ).',
            ar: 'الشكل يختلف كثيراً بين المنفصلة والمتّصلة.',
            en: 'Shape changes a lot between isolated (ك) and connected forms (كـ ـكـ).',
          },
          source: 'Alif Baa · Unit 7',
        },
        {
          type: 'arabic_letter',
          letter: 'ل',
          name: { ar: 'لام', translit: 'Lām' },
          sound: { es: 'como la "l" en "luna"', ar: 'مثل اللام في «ليل»', en: 'like "l" in "light"' },
          forms: { isolated: 'ل', initial: 'لـ', medial: 'ـلـ', final: 'ـل' },
          example: { word: 'لَيْلٌ', translit: 'layl', meaning: { es: 'noche', ar: 'ليل', en: 'night' }, emoji: '🌌' },
          note: {
            es: 'Cuando se combina con ا da la ligadura especial لا (lā = "no").',
            ar: 'مع الألف تُشكّل «لا».',
            en: 'When combined with ا forms the special ligature لا (lā = "no").',
          },
          source: 'Alif Baa · Unit 7',
        },
        {
          type: 'arabic_letter',
          letter: 'م',
          name: { ar: 'ميم', translit: 'Mīm' },
          sound: { es: 'como la "m" en "mamá"', ar: 'مثل الميم في «ماء»', en: 'like "m" in "moon"' },
          forms: { isolated: 'م', initial: 'مـ', medial: 'ـمـ', final: 'ـم' },
          example: { word: 'مَاءٌ', translit: 'māa\'', meaning: { es: 'agua', ar: 'ماء', en: 'water' }, emoji: '💧' },
          note: { es: 'Círculo con "cola" que baja.', ar: 'دائرة صغيرة مع ذيل ينزل.', en: 'A small circle with a tail going down.' },
          source: 'Alif Baa · Unit 7',
        },
        {
          type: 'arabic_letter',
          letter: 'ن',
          name: { ar: 'نون', translit: 'Nūn' },
          sound: { es: 'como la "n" en "nube"', ar: 'مثل النون في «نار»', en: 'like "n" in "noon"' },
          forms: { isolated: 'ن', initial: 'نـ', medial: 'ـنـ', final: 'ـن' },
          example: { word: 'نَارٌ', translit: 'nār', meaning: { es: 'fuego', ar: 'نار', en: 'fire' }, emoji: '🔥' },
          note: { es: 'Aislada: cuenco profundo con un punto. Inicial/medial: como ب pero con punto arriba.', ar: 'المنفصلة: قوس عميق. المتّصلة: كالباء بنقطة فوق.', en: 'Isolated: deep bowl. Connected: like ب but with dot ABOVE.' },
          source: 'Alif Baa · Unit 7',
        },
        {
          type: 'arabic_letter',
          letter: 'هـ',
          name: { ar: 'هاء', translit: 'Hāa' },
          sound: { es: 'como la "h" en inglés "hello" (suave)', ar: 'مثل الهاء في «هواء»', en: 'like "h" in "hello" (soft)' },
          forms: { isolated: 'ه', initial: 'هـ', medial: 'ـهـ', final: 'ـه' },
          example: { word: 'هَوَاءٌ', translit: 'hawā\'', meaning: { es: 'aire/viento', ar: 'هواء', en: 'air/wind' }, emoji: '💨' },
          note: {
            es: 'Sus 4 formas se ven MUY diferentes. ¡Práctica visual!',
            ar: 'أشكالها الأربعة مختلفة جدّاً. تدرّب على التمييز.',
            en: 'Its 4 forms look VERY different. Visual practice needed!',
          },
          source: 'Alif Baa · Unit 8',
        },
        {
          type: 'arabic_letter',
          letter: 'و',
          name: { ar: 'واو', translit: 'Wāw' },
          sound: { es: 'consonante: "w" de "Washington". Vocal larga: "ū" de "luna"', ar: 'واو — إمّا صامتة أو حركة طويلة', en: 'consonant: "w" as in "wave". Long vowel: "ū" as in "moon"' },
          forms: { isolated: 'و', initial: 'و', medial: 'ـو', final: 'ـو' },
          notConnects: true,
          example: { word: 'وَرْدَةٌ', translit: 'warda', meaning: { es: 'rosa (flor)', ar: 'وردة', en: 'rose (flower)' }, emoji: '🌹' },
          note: {
            es: 'Dos usos: consonante "w" o vocal larga "ū". NO se conecta con la letra siguiente.',
            ar: 'استخدامان: صامتة (w) أو حركة طويلة (ū). لا تتّصل بما بعدها.',
            en: 'Two uses: consonant "w" or long vowel "ū". Does NOT connect to next letter.',
          },
          source: 'Alif Baa · Unit 8',
        },
        {
          type: 'arabic_letter',
          letter: 'ي',
          name: { ar: 'ياء', translit: 'Yāa' },
          sound: { es: 'consonante: "y" de "yema". Vocal larga: "ī" de "mira"', ar: 'ياء — إمّا صامتة أو حركة طويلة', en: 'consonant: "y" as in "yes". Long vowel: "ī" as in "seen"' },
          forms: { isolated: 'ي', initial: 'يـ', medial: 'ـيـ', final: 'ـي' },
          example: { word: 'يَدٌ', translit: 'yad', meaning: { es: 'mano', ar: 'يد', en: 'hand' }, emoji: '✋' },
          note: {
            es: 'Dos puntos DEBAJO en aislada/final. Al conectarse pierde los puntos visuales (según fuente).',
            ar: 'نقطتان تحت في المنفصلة والأخيرة.',
            en: 'Two dots BELOW in isolated/final. Connected forms may hide the dots.',
          },
          source: 'Alif Baa · Unit 8',
        },
        {
          type: 'flashcards',
          title: { es: 'Repaso final — 28 letras', ar: 'المراجعة النهائية — 28 حرفاً', en: 'Final review — 28 letters' },
          cards: [
            { front: 'ف', back: { es: 'Fāa — f', ar: 'فاء', en: 'Fāa — f' } },
            { front: 'ق', back: { es: 'Qāf — k gutural', ar: 'قاف', en: 'Qāf — deep k' } },
            { front: 'ك', back: { es: 'Kāf — k', ar: 'كاف', en: 'Kāf — k' } },
            { front: 'ل', back: { es: 'Lām — l', ar: 'لام', en: 'Lām — l' } },
            { front: 'م', back: { es: 'Mīm — m', ar: 'ميم', en: 'Mīm — m' } },
            { front: 'ن', back: { es: 'Nūn — n', ar: 'نون', en: 'Nūn — n' } },
            { front: 'هـ', back: { es: 'Hāa — h suave', ar: 'هاء', en: 'Hāa — soft h' } },
            { front: 'و', back: { es: 'Wāw — w / ū', ar: 'واو', en: 'Wāw — w / ū' } },
            { front: 'ي', back: { es: 'Yāa — y / ī', ar: 'ياء', en: 'Yāa — y / ī' } },
          ],
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════
    // 🎵 ESTACIÓN 6 — Las Harakat (vocales cortas)
    // ═════════════════════════════════════════════════════════════════
    {
      id: 'harakat',
      icon: '<i class="fas fa-music"></i>',
      title: { es: 'Las Harakat (vocales)', ar: 'الحركات', en: 'The Harakat (vowels)' },
      mascotIntro: {
        es: 'Las vocales cortas se escriben con símbolos ARRIBA o ABAJO de la letra. Son 3 básicas + sukun + shadda.',
        ar: 'الحركات القصيرة تُكتب فوق الحرف أو تحته. ثلاث أساسية + السكون + الشدّة.',
        en: 'Short vowels are written with signs ABOVE or BELOW letters. 3 basic + sukun + shadda.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'Fatha (فَتْحَة) — sonido "a"', ar: 'الفَتْحَة', en: 'Fatha (فَتْحَة) — "a" sound' },
          content: {
            es: '➖ Se escribe como una PEQUEÑA LÍNEA DIAGONAL ARRIBA de la letra.\n\nEjemplo: بَ = "ba"\n\nبَ · تَ · جَ · دَ · رَ · سَ · فَ · مَ · نَ\n(ba · ta · ja · da · ra · sa · fa · ma · na)\n\nSe pronuncia CORTA, como la "a" de "casa".',
            ar: 'الفتحة هي شَرْطة مائلة فوق الحرف.\n\nمثال: بَ = "ba"\n\nبَ · تَ · جَ · دَ · رَ · سَ · فَ · مَ · نَ\n\nصوت قصير كالألف في «باب».',
            en: 'Fatha is a SMALL DIAGONAL LINE ABOVE the letter.\n\nExample: بَ = "ba"\n\nبَ · تَ · جَ · دَ · رَ · سَ · فَ · مَ · نَ\n\nPronounced SHORT, like "a" in "cat".',
          },
          source: 'Madīnah Book 1 · Lesson 1',
        },
        {
          type: 'card',
          title: { es: 'Damma (ضَمَّة) — sonido "u"', ar: 'الضَّمَّة', en: 'Damma (ضَمَّة) — "u" sound' },
          content: {
            es: '⭕ Se escribe como una PEQUEÑA "و" ARRIBA de la letra.\n\nEjemplo: بُ = "bu"\n\nبُ · تُ · جُ · دُ · رُ · سُ · فُ · مُ · نُ\n(bu · tu · ju · du · ru · su · fu · mu · nu)\n\nSe pronuncia CORTA, como la "u" de "luna".',
            ar: 'الضمّة تُشبه واواً صغيرة فوق الحرف.\n\nمثال: بُ = "bu"\n\nبُ · تُ · جُ · دُ · رُ · سُ · فُ · مُ · نُ\n\nصوت قصير كالواو في «قُلْ».',
            en: 'Damma looks like a SMALL "و" ABOVE the letter.\n\nExample: بُ = "bu"\n\nبُ · تُ · جُ · دُ · رُ · سُ · فُ · مُ · نُ\n\nPronounced SHORT, like "u" in "put".',
          },
          source: 'Madīnah Book 1 · Lesson 2',
        },
        {
          type: 'card',
          title: { es: 'Kasra (كَسْرَة) — sonido "i"', ar: 'الكَسْرَة', en: 'Kasra (كَسْرَة) — "i" sound' },
          content: {
            es: '➖ Se escribe como una PEQUEÑA LÍNEA DIAGONAL DEBAJO de la letra.\n\nEjemplo: بِ = "bi"\n\nبِ · تِ · جِ · دِ · رِ · سِ · فِ · مِ · نِ\n(bi · ti · ji · di · ri · si · fi · mi · ni)\n\nSe pronuncia CORTA, como la "i" de "mira".',
            ar: 'الكسرة شَرْطة مائلة تحت الحرف.\n\nمثال: بِ = "bi"\n\nبِ · تِ · جِ · دِ · رِ · سِ · فِ · مِ · نِ\n\nصوت قصير كالياء في «بِنْت».',
            en: 'Kasra is a SMALL DIAGONAL LINE BELOW the letter.\n\nExample: بِ = "bi"\n\nبِ · تِ · جِ · دِ · رِ · سِ · فِ · مِ · نِ\n\nPronounced SHORT, like "i" in "sit".',
          },
          source: 'Madīnah Book 1 · Lesson 3',
        },
        {
          type: 'card',
          title: { es: 'Sukūn (سُكُون) — sin vocal', ar: 'السُّكُون', en: 'Sukūn (سُكُون) — no vowel' },
          content: {
            es: '⭕ Se escribe como un CÍRCULO PEQUEÑO arriba de la letra.\n\nSignifica: "la letra se pronuncia sola, SIN vocal".\n\nEjemplo: مِنْ = "min" (la ن lleva sukun, se corta).\n\nبَلْ = "bal" (la ل lleva sukun).',
            ar: 'السكون دائرة صغيرة فوق الحرف.\n\nمعناه: الحرف يُنطق بدون حركة.\n\nمثال: مِنْ = "min" — النون ساكنة.\n\nبَلْ = "bal" — اللام ساكنة.',
            en: 'Sukūn is a SMALL CIRCLE above the letter.\n\nMeaning: "letter pronounced alone, WITHOUT a vowel".\n\nExample: مِنْ = "min" (ن has sukun, cuts short).\n\nبَلْ = "bal" (ل has sukun).',
          },
          source: 'Madīnah Book 1 · Lesson 4',
        },
        {
          type: 'card',
          title: { es: 'Shadda (شَدَّة) — letra doblada', ar: 'الشَّدَّة', en: 'Shadda (شَدَّة) — doubled letter' },
          content: {
            es: '𝑊 Se escribe como una "w" pequeña arriba de la letra.\n\nSignifica: "la letra se pronuncia DOBLE con énfasis".\n\nEjemplo: رَبٌّ = "rabb" (Señor) — la ب es doble.\n\nحَقٌّ = "ḥaqq" (verdad) — la ق es doble.\n\nحُبٌّ = "ḥubb" (amor) — la ب es doble.',
            ar: 'الشدّة كأنّها «w» صغيرة فوق الحرف.\n\nمعناها: يُنطق الحرف مضاعفاً.\n\nمثال: رَبٌّ — الباء مشدّدة.\n\nحَقٌّ — القاف مشدّدة.',
            en: 'Shadda looks like a small "w" above the letter.\n\nMeaning: "letter pronounced DOUBLE with emphasis".\n\nExample: رَبٌّ = "rabb" (Lord) — ب is doubled.\n\nحَقٌّ = "ḥaqq" (truth) — ق is doubled.',
          },
          source: 'Madīnah Book 1 · Lesson 5',
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cómo se pronuncia "بُ"?',
            ar: 'كيف تُنطق «بُ»؟',
            en: 'How is "بُ" pronounced?',
          },
          options: ['ba', 'bi', 'bu', 'b (sin vocal)'],
          correct: 2,
          feedback: {
            es: 'Correcto: bu. La damma (⭕) da el sonido "u".',
            ar: 'صحيح: بُ. الضمّة تعطي صوت الواو.',
            en: 'Correct: bu. Damma gives the "u" sound.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Qué diacrítico significa "letra doblada"?',
            ar: 'أيّ علامة تدلّ على تضعيف الحرف؟',
            en: 'Which mark means "doubled letter"?',
          },
          options: [
            { es: 'Fatha (َ)', ar: 'فتحة', en: 'Fatha' },
            { es: 'Sukūn (ْ)', ar: 'سكون', en: 'Sukūn' },
            { es: 'Shadda (ّ)', ar: 'شدّة', en: 'Shadda' },
            { es: 'Kasra (ِ)', ar: 'كسرة', en: 'Kasra' },
          ],
          correct: 2,
          feedback: {
            es: 'La Shadda (ّ) — obliga a pronunciar la letra DOS veces con énfasis.',
            ar: 'الشدّة — الحرف يُنطق مرّتين.',
            en: 'The Shadda (ّ) — forces the letter to be pronounced twice with emphasis.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '"كِتَابٌ" (kitāb) contiene:',
            ar: '«كِتَابٌ» فيها:',
            en: '"kitāb" (كِتَابٌ) contains:',
          },
          options: [
            { es: 'Fatha + Damma', ar: 'فتحة + ضمّة', en: 'Fatha + Damma' },
            { es: 'Kasra + Fatha + Damma', ar: 'كسرة + فتحة + ضمّة', en: 'Kasra + Fatha + Damma' },
            { es: 'Solo Fatha', ar: 'فتحة فقط', en: 'Only Fatha' },
            { es: 'Sukūn + Kasra', ar: 'سكون + كسرة', en: 'Sukūn + Kasra' },
          ],
          correct: 1,
          feedback: {
            es: 'K(kasra=i) + T(fatha=a) + Ā(alif larga) + B(damma=u con tanwīn) = "kitābun".',
            ar: 'ك(كسرة) + ت(فتحة) + ا(مدّ) + ب(ضمّة مع تنوين).',
            en: 'K(kasra=i) + T(fatha=a) + Ā(long) + B(damma+tanwīn).',
          },
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════
    // 📝 ESTACIÓN 7 — Vocabulario esencial (25 palabras clave)
    // ═════════════════════════════════════════════════════════════════
    {
      id: 'vocabulary',
      icon: '<i class="fas fa-book"></i>',
      title: { es: 'Vocabulario esencial', ar: 'المفردات الأساسية', en: 'Essential vocabulary' },
      mascotIntro: {
        es: '¡Ahora aprendamos palabras que oirás cada día en un contexto islámico y cotidiano!',
        ar: 'الآن لنتعلّم كلمات ستسمعها كلّ يوم في السياق الإسلاميّ والحياة اليومية!',
        en: 'Now let\'s learn words you\'ll hear every day in Islamic and daily contexts!',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'Saludos y expresiones', ar: 'التحيّات والتعابير', en: 'Greetings & expressions' },
          content: {
            es: '👋 السَّلَامُ عَلَيْكُمْ · as-salāmu \'alaykum · "la paz sea contigo"\n\n👋 وَعَلَيْكُمُ السَّلَامُ · wa \'alaykumu s-salām · "y sobre ti la paz"\n\n🙏 بِسْمِ اللَّهِ · bismillāh · "en el nombre de Allah"\n\n🤲 الْحَمْدُ لِلَّهِ · al-ḥamdu lillāh · "gracias a Allah"\n\n🌟 سُبْحَانَ اللَّهِ · subḥān-Allāh · "gloria a Allah"\n\n☝️ اللَّهُ أَكْبَرُ · Allāhu akbar · "Allah es el más Grande"\n\n💫 إِنْ شَاءَ اللَّهُ · in shā\'a-llāh · "si Allah quiere"\n\n🙏 مَا شَاءَ اللَّهُ · mā shā\'a-llāh · "lo que Allah ha querido"',
            ar: '👋 السَّلَامُ عَلَيْكُمْ\n👋 وَعَلَيْكُمُ السَّلَامُ\n🙏 بِسْمِ اللَّهِ\n🤲 الْحَمْدُ لِلَّهِ\n🌟 سُبْحَانَ اللَّهِ\n☝️ اللَّهُ أَكْبَرُ\n💫 إِنْ شَاءَ اللَّهُ\n🙏 مَا شَاءَ اللَّهُ',
            en: '👋 السَّلَامُ عَلَيْكُمْ · as-salāmu \'alaykum · "peace be upon you"\n\n👋 وَعَلَيْكُمُ السَّلَامُ · wa \'alaykumu s-salām · "and peace be upon you (reply)"\n\n🙏 بِسْمِ اللَّهِ · bismillāh · "in the name of Allah"\n\n🤲 الْحَمْدُ لِلَّهِ · al-ḥamdu lillāh · "praise be to Allah"\n\n🌟 سُبْحَانَ اللَّهِ · subḥān-Allāh · "glory be to Allah"\n\n☝️ اللَّهُ أَكْبَرُ · Allāhu akbar · "Allah is the Greatest"\n\n💫 إِنْ شَاءَ اللَّهُ · in shā\'a-llāh · "if Allah wills"\n\n🙏 مَا شَاءَ اللَّهُ · mā shā\'a-llāh · "what Allah has willed"',
          },
          source: 'Sahih al-Bukhari · Etiquette of greetings',
        },
        {
          type: 'card',
          title: { es: 'La familia (الأسرة)', ar: 'الأسرة', en: 'The family (الأسرة)' },
          content: {
            es: '👨 أَبٌ · ab · padre\n👩 أُمٌّ · umm · madre\n👦 ابْنٌ · ibn · hijo\n👧 بِنْتٌ · bint · hija\n👴 جَدٌّ · jadd · abuelo\n👵 جَدَّةٌ · jadda · abuela\n👨‍👦 أَخٌ · akh · hermano\n👩‍👧 أُخْتٌ · ukht · hermana\n💍 زَوْجٌ · zawj · esposo\n💍 زَوْجَةٌ · zawja · esposa',
            ar: '👨 أَبٌ · أب\n👩 أُمٌّ · أم\n👦 ابْنٌ\n👧 بِنْتٌ\n👴 جَدٌّ\n👵 جَدَّةٌ\n👨‍👦 أَخٌ\n👩‍👧 أُخْتٌ\n💍 زَوْجٌ\n💍 زَوْجَةٌ',
            en: '👨 أَبٌ · ab · father\n👩 أُمٌّ · umm · mother\n👦 ابْنٌ · ibn · son\n👧 بِنْتٌ · bint · daughter\n👴 جَدٌّ · jadd · grandfather\n👵 جَدَّةٌ · jadda · grandmother\n👨‍👦 أَخٌ · akh · brother\n👩‍👧 أُخْتٌ · ukht · sister\n💍 زَوْجٌ · zawj · husband\n💍 زَوْجَةٌ · zawja · wife',
          },
          source: 'Madīnah Book 1 · Family unit',
        },
        {
          type: 'card',
          title: { es: 'Números 1–10', ar: 'الأرقام 1–10', en: 'Numbers 1–10' },
          content: {
            es: '1️⃣ وَاحِدٌ · wāḥid\n2️⃣ اثْنَانِ · ithnān\n3️⃣ ثَلَاثَةٌ · thalātha\n4️⃣ أَرْبَعَةٌ · arba\'a\n5️⃣ خَمْسَةٌ · khamsa\n6️⃣ سِتَّةٌ · sitta\n7️⃣ سَبْعَةٌ · sab\'a\n8️⃣ ثَمَانِيَةٌ · thamāniya\n9️⃣ تِسْعَةٌ · tis\'a\n🔟 عَشَرَةٌ · \'ashara\n\nGrafía árabe (Hindī): ٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩',
            ar: '1️⃣ وَاحِدٌ\n2️⃣ اثْنَانِ\n3️⃣ ثَلَاثَةٌ\n4️⃣ أَرْبَعَةٌ\n5️⃣ خَمْسَةٌ\n6️⃣ سِتَّةٌ\n7️⃣ سَبْعَةٌ\n8️⃣ ثَمَانِيَةٌ\n9️⃣ تِسْعَةٌ\n🔟 عَشَرَةٌ\n\nالأرقام الهندية: ٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩',
            en: '1️⃣ وَاحِدٌ · wāḥid\n2️⃣ اثْنَانِ · ithnān\n3️⃣ ثَلَاثَةٌ · thalātha\n4️⃣ أَرْبَعَةٌ · arba\'a\n5️⃣ خَمْسَةٌ · khamsa\n6️⃣ سِتَّةٌ · sitta\n7️⃣ سَبْعَةٌ · sab\'a\n8️⃣ ثَمَانِيَةٌ · thamāniya\n9️⃣ تِسْعَةٌ · tis\'a\n🔟 عَشَرَةٌ · \'ashara\n\nEastern Arabic (Hindī) numerals: ٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩',
          },
          source: 'Alif Baa · Numbers appendix',
        },
        {
          type: 'card',
          title: { es: 'Colores (الألوان)', ar: 'الألوان', en: 'Colors (الألوان)' },
          content: {
            es: '🔴 أَحْمَرُ · aḥmar · rojo\n🟢 أَخْضَرُ · akhḍar · verde\n🔵 أَزْرَقُ · azraq · azul\n🟡 أَصْفَرُ · aṣfar · amarillo\n⚫ أَسْوَدُ · aswad · negro\n⚪ أَبْيَضُ · abyaḍ · blanco\n🟠 بُرْتُقَالِيٌّ · burtuqālī · naranja\n🟤 بُنِّيٌّ · bunnī · marrón',
            ar: '🔴 أَحْمَرُ\n🟢 أَخْضَرُ\n🔵 أَزْرَقُ\n🟡 أَصْفَرُ\n⚫ أَسْوَدُ\n⚪ أَبْيَضُ\n🟠 بُرْتُقَالِيٌّ\n🟤 بُنِّيٌّ',
            en: '🔴 أَحْمَرُ · aḥmar · red\n🟢 أَخْضَرُ · akhḍar · green\n🔵 أَزْرَقُ · azraq · blue\n🟡 أَصْفَرُ · aṣfar · yellow\n⚫ أَسْوَدُ · aswad · black\n⚪ أَبْيَضُ · abyaḍ · white\n🟠 بُرْتُقَالِيٌّ · burtuqālī · orange\n🟤 بُنِّيٌّ · bunnī · brown',
          },
          source: 'Madīnah Book 2 · Colors unit',
        },
        {
          type: 'flashcards',
          title: { es: 'Palabras coránicas frecuentes', ar: 'كلمات قرآنية شائعة', en: 'Frequent Quranic words' },
          cards: [
            { front: 'اللَّهُ', back: { es: 'Allāh · Dios', ar: 'الله', en: 'Allāh · God' } },
            { front: 'رَبٌّ', back: { es: 'Rabb · Señor', ar: 'ربّ', en: 'Rabb · Lord' } },
            { front: 'كِتَابٌ', back: { es: 'Kitāb · libro', ar: 'كتاب', en: 'Kitāb · book' } },
            { front: 'صَلَاةٌ', back: { es: 'Ṣalāh · oración', ar: 'صلاة', en: 'Ṣalāh · prayer' } },
            { front: 'سَلَامٌ', back: { es: 'Salām · paz', ar: 'سلام', en: 'Salām · peace' } },
            { front: 'رَحْمَةٌ', back: { es: 'Raḥma · misericordia', ar: 'رحمة', en: 'Raḥma · mercy' } },
            { front: 'دِينٌ', back: { es: 'Dīn · religión', ar: 'دين', en: 'Dīn · religion' } },
            { front: 'إِيمَانٌ', back: { es: 'Īmān · fe', ar: 'إيمان', en: 'Īmān · faith' } },
            { front: 'يَوْمٌ', back: { es: 'Yawm · día', ar: 'يوم', en: 'Yawm · day' } },
            { front: 'لَيْلٌ', back: { es: 'Layl · noche', ar: 'ليل', en: 'Layl · night' } },
            { front: 'أَرْضٌ', back: { es: 'Arḍ · tierra', ar: 'أرض', en: 'Arḍ · earth' } },
            { front: 'سَمَاءٌ', back: { es: 'Samā\' · cielo', ar: 'سماء', en: 'Samā\' · heaven' } },
          ],
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cómo se dice "libro" en árabe?',
            ar: 'كيف تُقال «كتاب» بالعربية؟',
            en: 'How do you say "book" in Arabic?',
          },
          options: ['قَلَمٌ (qalam)', 'بَيْتٌ (bayt)', 'كِتَابٌ (kitāb)', 'قَلْبٌ (qalb)'],
          correct: 2,
          feedback: {
            es: 'كِتَابٌ (kitāb) = libro. De la raíz k-t-b (escribir). El Corán es "Al-Kitāb", "El Libro".',
            ar: 'كِتَابٌ من الجذر ك-ت-ب. القرآن هو «الكتاب».',
            en: 'كِتَابٌ (kitāb) = book. From root k-t-b (to write). The Quran is "Al-Kitāb", "The Book".',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Qué se responde a "As-salāmu \'alaykum"?',
            ar: 'ما جواب «السلام عليكم»؟',
            en: 'What is the reply to "As-salāmu \'alaykum"?',
          },
          options: [
            { es: 'Bismillāh', ar: 'بسم الله', en: 'Bismillāh' },
            { es: 'Wa \'alaykumu s-salām', ar: 'وعليكم السلام', en: 'Wa \'alaykumu s-salām' },
            { es: 'Alḥamdulillāh', ar: 'الحمد لله', en: 'Alḥamdulillāh' },
            { es: 'In shā\' Allāh', ar: 'إن شاء الله', en: 'In shā\' Allāh' },
          ],
          correct: 1,
          feedback: {
            es: '"Wa \'alaykumu s-salām" — "y sobre vosotros la paz". El Profeta ﷺ enseñó a devolver el saludo con algo mejor o similar (Corán 4:86).',
            ar: '«وعليكم السلام». قال تعالى: {وَإِذَا حُيِّيتُم بِتَحِيَّةٍ فَحَيُّوا بِأَحْسَنَ مِنْهَا} (النساء 86).',
            en: '"Wa \'alaykumu s-salām" — "and upon you be peace". The Prophet ﷺ taught to return greetings with better or equal (Quran 4:86).',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuál es el número "5" en árabe?',
            ar: 'ما هو الرقم 5 بالعربية؟',
            en: 'What is the number "5" in Arabic?',
          },
          options: [
            { es: 'ثَلَاثَةٌ (thalātha)', ar: 'ثلاثة', en: 'thalātha (3)' },
            { es: 'أَرْبَعَةٌ (arba\'a)', ar: 'أربعة', en: 'arba\'a (4)' },
            { es: 'خَمْسَةٌ (khamsa)', ar: 'خمسة', en: 'khamsa (5)' },
            { es: 'سِتَّةٌ (sitta)', ar: 'ستّة', en: 'sitta (6)' },
          ],
          correct: 2,
          feedback: {
            es: '¡Correcto! Khamsa (خَمْسَة) = 5. De la misma raíz que "khamsah" (los 5 pilares).',
            ar: 'صحيح: خمسة.',
            en: 'Correct! Khamsa = 5. Same root as "khamsah" (the 5 pillars).',
          },
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════
    // 🏆 ESTACIÓN 8 — Lectura de palabras simples + evaluación final
    // ═════════════════════════════════════════════════════════════════
    {
      id: 'reading_practice',
      icon: '<i class="fas fa-book-open-reader"></i>',
      title: { es: 'Lectura y examen final', ar: 'القراءة والاختبار النهائي', en: 'Reading & final exam' },
      mascotIntro: {
        es: '¡Última estación! Vamos a leer palabras y frases reales. Luego el examen final.',
        ar: 'المحطة الأخيرة! سنقرأ كلمات وجُمَل حقيقية، ثم الاختبار النهائي.',
        en: 'Last station! Let\'s read real words & sentences, then the final exam.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'Palabras completas — leamos juntos', ar: 'كلمات كاملة — لنقرأ معاً', en: 'Complete words — let\'s read together' },
          content: {
            es: 'Aplica lo aprendido. Lee de DERECHA a IZQUIERDA:\n\n📚 كِتَابٌ = ki-tā-bun · libro\n🚪 بَابٌ = bā-bun · puerta\n🌙 قَمَرٌ = qa-ma-run · luna\n☀️ شَمْسٌ = sham-sun · sol\n💧 مَاءٌ = mā-\'un · agua\n🏠 بَيْتٌ = bay-tun · casa\n👨 أَبٌ = a-bun · padre\n👩 أُمٌّ = um-mun · madre (¡la م es doble por shadda!)\n❤️ حُبٌّ = ḥub-bun · amor (¡ب doble!)\n📖 قُرْآنٌ = qur-\'ā-nun · Corán\n🕌 مَسْجِدٌ = mas-ji-dun · mezquita\n🕋 كَعْبَةٌ = ka\'-ba-tun · Kaaba',
            ar: 'طبّق ما تعلّمتَ. اقرأ من اليمين إلى اليسار:\n\n📚 كِتَابٌ · كتاب\n🚪 بَابٌ · باب\n🌙 قَمَرٌ · قمر\n☀️ شَمْسٌ · شمس\n💧 مَاءٌ · ماء\n🏠 بَيْتٌ · بيت\n👨 أَبٌ · أب\n👩 أُمٌّ · أمّ (الميم مشدّدة)\n❤️ حُبٌّ · حبّ\n📖 قُرْآنٌ · قرآن\n🕌 مَسْجِدٌ · مسجد\n🕋 كَعْبَةٌ · كعبة',
            en: 'Apply what you learned. Read from RIGHT to LEFT:\n\n📚 كِتَابٌ = ki-tā-bun · book\n🚪 بَابٌ = bā-bun · door\n🌙 قَمَرٌ = qa-ma-run · moon\n☀️ شَمْسٌ = sham-sun · sun\n💧 مَاءٌ = mā-\'un · water\n🏠 بَيْتٌ = bay-tun · house\n👨 أَبٌ = a-bun · father\n👩 أُمٌّ = um-mun · mother (م doubled by shadda!)\n❤️ حُبٌّ = ḥub-bun · love (ب doubled!)\n📖 قُرْآنٌ = qur-\'ā-nun · Quran\n🕌 مَسْجِدٌ = mas-ji-dun · mosque\n🕋 كَعْبَةٌ = ka\'-ba-tun · Kaaba',
          },
          source: 'Alif Baa · Reading exercises',
        },
        {
          type: 'card',
          title: { es: 'Frases sagradas — ejemplos del Corán', ar: 'عبارات مقدّسة — أمثلة من القرآن', en: 'Sacred phrases — Quranic examples' },
          content: {
            es: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nbismi-llāhi r-raḥmāni r-raḥīm\n"En el nombre de Allah, el Compasivo, el Misericordioso"\n(Al-Fatiha 1:1)\n\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ\nal-ḥamdu lillāhi rabbi l-\'ālamīn\n"Alabado sea Allah, Señor de los mundos"\n(Al-Fatiha 1:2)\n\nقُلْ هُوَ اللَّهُ أَحَدٌ\nqul huwa-llāhu aḥad\n"Di: Él, Allah, es Uno"\n(Al-Ikhlas 112:1)',
            ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\n(الفاتحة 1)\n\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ\n(الفاتحة 2)\n\nقُلْ هُوَ اللَّهُ أَحَدٌ\n(الإخلاص 1)',
            en: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nbismi-llāhi r-raḥmāni r-raḥīm\n"In the name of Allah, the Most Compassionate, the Most Merciful"\n(Al-Fatiha 1:1)\n\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ\nal-ḥamdu lillāhi rabbi l-\'ālamīn\n"All praise is due to Allah, Lord of the worlds"\n(Al-Fatiha 1:2)\n\nقُلْ هُوَ اللَّهُ أَحَدٌ\nqul huwa-llāhu aḥad\n"Say: He, Allah, is One"\n(Al-Ikhlas 112:1)',
          },
          source: 'Al-Quran · Surahs 1 & 112',
        },
        {
          type: 'quiz',
          question: {
            es: 'Lee: "قَمَرٌ" — ¿qué significa?',
            ar: 'اقرأ: «قَمَرٌ» — ما معناها؟',
            en: 'Read: "قَمَرٌ" — what does it mean?',
          },
          options: [
            { es: '☀️ Sol', ar: 'شمس', en: '☀️ Sun' },
            { es: '🌙 Luna', ar: 'قمر', en: '🌙 Moon' },
            { es: '⭐ Estrella', ar: 'نجم', en: '⭐ Star' },
            { es: '☁️ Nube', ar: 'سحاب', en: '☁️ Cloud' },
          ],
          correct: 1,
          feedback: {
            es: 'Qamar = luna. Sura 54 se llama "Al-Qamar" (La Luna).',
            ar: 'القمر — سورة 54 تُسمّى «القمر».',
            en: 'Qamar = moon. Surah 54 is named "Al-Qamar" (The Moon).',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuántas letras tiene la palabra "بَيْتٌ" (bayt, casa)?',
            ar: 'كم عدد الحروف في كلمة «بَيْتٌ»؟',
            en: 'How many letters are in "بَيْتٌ" (bayt, house)?',
          },
          options: ['2', '3', '4', '5'],
          correct: 1,
          feedback: {
            es: '3 letras: ب + ي + ت. Los símbolos (fatha, sukun, damma+tanwīn) NO son letras.',
            ar: '3 حروف: ب + ي + ت. الحركات ليست حروفاً.',
            en: '3 letters: ب + ي + ت. Diacritics are NOT letters.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuál es la raíz de "كِتَابٌ, كَاتِبٌ, مَكْتَبَةٌ"?',
            ar: 'ما هو جذر «كتاب، كاتب، مكتبة»؟',
            en: 'What is the root of "kitāb, kātib, maktaba"?',
          },
          options: ['ق-ر-أ (q-r-\')', 'ك-ت-ب (k-t-b)', 'ع-ل-م (\'-l-m)', 'ذ-ك-ر (dh-k-r)'],
          correct: 1,
          feedback: {
            es: '¡Excelente! La raíz k-t-b relaciona: libro, escritor, biblioteca. Así es cómo funciona el árabe.',
            ar: 'الجذر ك-ت-ب: كتاب، كاتب، مكتبة. هكذا تعمل العربية.',
            en: 'Excellent! Root k-t-b links: book, writer, library. That\'s how Arabic works.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Qué significa "Bismillāh" (بِسْمِ اللَّهِ)?',
            ar: 'ما معنى «بسم الله»؟',
            en: 'What does "Bismillāh" (بِسْمِ اللَّهِ) mean?',
          },
          options: [
            { es: 'Gracias a Allah', ar: 'الحمد لله', en: 'Praise to Allah' },
            { es: 'En el nombre de Allah', ar: 'بسم الله', en: 'In the name of Allah' },
            { es: 'Allah es Grande', ar: 'الله أكبر', en: 'Allah is Greatest' },
            { es: 'Gloria a Allah', ar: 'سبحان الله', en: 'Glory to Allah' },
          ],
          correct: 1,
          feedback: {
            es: 'Bi- (con) + ism (nombre) + Allāh = "En el nombre de Allah". Se dice antes de empezar cualquier cosa buena.',
            ar: 'بـ + اسم + الله. تُقال قبل بدء كلّ عمل صالح.',
            en: 'Bi- (in/with) + ism (name) + Allāh. Said before starting anything good.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuál letra tiene 4 formas MUY diferentes entre sí?',
            ar: 'أيّ حرف أشكاله الأربعة مختلفة جدّاً؟',
            en: 'Which letter has 4 VERY different forms?',
          },
          options: ['ب (Baa)', 'ه (Hāa)', 'م (Mīm)', 'ن (Nūn)'],
          correct: 1,
          feedback: {
            es: 'ه (Hāa): aislada "ه", inicial "هـ", medial "ـهـ", final "ـه" — parecen 4 letras distintas!',
            ar: 'الهاء: ه ، هـ ، ـهـ ، ـه — تبدو كأنّها أربعة حروف مختلفة!',
            en: 'ه (Hāa): "ه", "هـ", "ـهـ", "ـه" — they look like 4 different letters!',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuál de estas letras es EMPHATIC (mufakhkhama)?',
            ar: 'أيّ حرف من الحروف المُفَخَّمة؟',
            en: 'Which letter is EMPHATIC (mufakhkhama)?',
          },
          options: ['س', 'ت', 'ص', 'ب'],
          correct: 2,
          feedback: {
            es: 'ص es la versión enfática de س. Las enfáticas: ص ض ط ظ ق (y ر, خ, غ contextualmente).',
            ar: 'الصاد مفخّمة. المفخّمات: ص ض ط ظ ق.',
            en: 'ص is the emphatic version of س. Emphatic letters: ص ض ط ظ ق.',
          },
        },
        {
          type: 'card',
          title: { es: '🎓 ¡MashaAllah! Has completado el curso', ar: '🎓 ما شاء الله! أتممتَ الدورة', en: '🎓 MashaAllah! You\'ve completed the course' },
          content: {
            es: '¡Alḥamdulillāh! Has aprendido:\n\n✅ Las 28 letras del alfabeto árabe\n✅ Las 4 formas de cada letra (aislada/inicial/medial/final)\n✅ Los 5 diacríticos: fatha, damma, kasra, sukūn, shadda\n✅ Más de 40 palabras esenciales\n✅ Frases del Corán\n✅ La estructura de raíces del árabe\n\n📚 Próximos pasos recomendados:\n1. Escuchar el Corán DIARIAMENTE (aunque no entiendas todo)\n2. Aprender la Sura Al-Fatiha\n3. Estudiar el Madīnah Book 1 (gratis online)\n4. Practicar 15 min/día\n\n💫 Recuerda: "Quien recorre un camino en busca de conocimiento, Allah le facilita un camino al Paraíso." (Muslim 2699)',
            ar: 'الحمد لله! تعلّمتَ:\n\n✅ الحروف الـ28\n✅ الأشكال الأربعة لكلّ حرف\n✅ الحركات الخمس: الفتحة، الضمّة، الكسرة، السكون، الشدّة\n✅ أكثر من 40 كلمة أساسية\n✅ عبارات قرآنية\n✅ نظام الجذور\n\n📚 الخطوات التالية:\n1. سماع القرآن يومياً\n2. حفظ الفاتحة\n3. دراسة كتاب المدينة الأول\n4. التدرّب 15 دقيقة يومياً\n\n💫 «مَن سلك طريقاً يلتمس فيه علماً، سهّل الله له به طريقاً إلى الجنّة» (مسلم 2699)',
            en: 'Alḥamdulillāh! You\'ve learned:\n\n✅ The 28 Arabic alphabet letters\n✅ The 4 forms of each letter\n✅ The 5 diacritics: fatha, damma, kasra, sukūn, shadda\n✅ 40+ essential words\n✅ Quranic phrases\n✅ The root system of Arabic\n\n📚 Recommended next steps:\n1. Listen to the Quran DAILY (even if you don\'t understand all)\n2. Memorize Surah Al-Fatiha\n3. Study Madīnah Book 1 (free online)\n4. Practice 15 min/day\n\n💫 "Whoever takes a path in search of knowledge, Allah eases for him a path to Paradise." (Muslim 2699)',
          },
          source: 'Sahih Muslim 2699',
        },
      ],
    },
  ],
};

if (typeof window !== 'undefined') window.COURSE_ARABIC_LANGUAGE = COURSE_ARABIC_LANGUAGE;
