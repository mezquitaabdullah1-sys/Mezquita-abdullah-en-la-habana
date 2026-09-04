/**
 * ⭐ Curso: Los 5 Pilares del Islam — Quba v20 (rebuilt)
 *
 * Basado en el famoso hadith de Ibn Umar (رضي الله عنه):
 * "El Islam se construye sobre cinco..." (Bukhari 8, Muslim 16)
 *
 * @audience Todos los públicos (musulmanes nuevos y estudiantes)
 * @level Beginner
 * @duration ~30 min
 */

const COURSE_PILLARS = {
  id: 'pillars',
  slug: 'five-pillars',
  icon: '<i class="fas fa-mosque"></i>',
  mascotPose: 'thinking',
  color: '#D4AF37',
  ageGroup: 'all',
  durationMin: 30,
  difficulty: 'beginner',

  title: {
    es: 'Los 5 Pilares del Islam',
    ar: 'أركان الإسلام الخمسة',
    en: 'The 5 Pillars of Islam',
  },
  description: {
    es: 'Los cimientos fundamentales sobre los que se sustenta el Islam — con evidencias, historia y sabiduría.',
    ar: 'الأسس التي يقوم عليها الإسلام — مع الأدلة والحكمة والقصص.',
    en: 'The foundational cornerstones of Islam — with evidences, history and wisdom.',
  },

  stations: [
    // ═══════════════════════════════════════════════════════════════
    // 🏛️ STATION 1: Introduction — The Foundation
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'intro',
      icon: '<i class="fas fa-landmark"></i>',
      title: { es: 'Los Cimientos', ar: 'الأساس', en: 'The Foundation' },
      mascotIntro: {
        es: 'Bienvenido. El Islam se sostiene sobre 5 pilares. Sin ellos, el edificio se derrumba.',
        ar: 'مرحباً. الإسلام يقوم على خمسة أركان. بدونها ينهار البناء.',
        en: 'Welcome. Islam stands on 5 pillars. Without them, the building collapses.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'El Hadith fundacional', ar: 'الحديث الأساسي', en: 'The founding Hadith' },
          content: {
            es: '📖 Ibn Umar (رضي الله عنه) narró que el Profeta ﷺ dijo:\n\n«El Islam se construye sobre CINCO:\n\n1️⃣ El testimonio (Shahada) de que no hay divinidad sino Allah, y que Muhammad es Su mensajero.\n2️⃣ Establecer la Salah (oración).\n3️⃣ Pagar el Zakat.\n4️⃣ Peregrinar a la Casa (Hajj).\n5️⃣ Ayunar el Ramadán.»\n\n(Sahih al-Bukhari 8 · Sahih Muslim 16)\n\n💡 Cada pilar tiene un rol único:\n• Shahada = la puerta de entrada.\n• Salah = la columna diaria.\n• Zakat = la purificación social.\n• Sawm = la disciplina espiritual.\n• Hajj = la unión de la Ummah.',
            ar: '📖 عن ابن عمر (رضي الله عنه) عن النبي ﷺ:\n\n«بُنِيَ الإسلامُ على خَمْسٍ:\n\n1️⃣ شَهادةِ أنْ لا إلهَ إلا اللهُ وأنَّ مُحمَّداً رسولُ الله.\n2️⃣ وإقامِ الصَّلاةِ.\n3️⃣ وإيتاءِ الزَّكاةِ.\n4️⃣ والحَجِّ.\n5️⃣ وصَوْمِ رَمَضانَ.»\n\n(البخاري 8 · مسلم 16)\n\n💡 لكلّ ركن دوره:\n• الشهادة = باب الدخول.\n• الصلاة = العمود اليومي.\n• الزكاة = الطهارة الاجتماعية.\n• الصوم = الانضباط الروحي.\n• الحجّ = وحدة الأمّة.',
            en: '📖 Ibn Umar (رضي الله عنه) narrated that the Prophet ﷺ said:\n\n«Islam is built on FIVE:\n\n1️⃣ Testifying (Shahada) that there is no deity but Allah, and Muhammad is His messenger.\n2️⃣ Establishing the Salah.\n3️⃣ Paying Zakat.\n4️⃣ Pilgrimage to the House (Hajj).\n5️⃣ Fasting Ramadan.»\n\n(Sahih al-Bukhari 8 · Sahih Muslim 16)\n\n💡 Each pillar has a unique role:\n• Shahada = the entry gate.\n• Salah = the daily pillar.\n• Zakat = social purification.\n• Sawm = spiritual discipline.\n• Hajj = unity of the Ummah.',
          },
          source: 'Sahih al-Bukhari 8 · Sahih Muslim 16',
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuántos pilares tiene el Islam?',
            ar: 'كم عدد أركان الإسلام؟',
            en: 'How many pillars does Islam have?',
          },
          options: ['3', '4', '5', '6'],
          correct: 2,
          feedback: {
            es: '5 pilares. No los confundas con los 6 pilares del Iman (creencia).',
            ar: '5 أركان. لا تخلط بينها وبين أركان الإيمان الستة.',
            en: '5 pillars. Do not confuse with the 6 pillars of Iman (belief).',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿En qué colección de hadith está el Hadith de los 5 pilares?',
            ar: 'في أيّ كتاب من كتب الحديث ورد حديث الأركان الخمسة؟',
            en: 'In which hadith collection is the 5-Pillars Hadith found?',
          },
          options: [
            { es: 'Solo Bukhari', ar: 'البخاري فقط', en: 'Bukhari only' },
            { es: 'Solo Muslim', ar: 'مسلم فقط', en: 'Muslim only' },
            { es: 'Bukhari y Muslim (muttafaq alayh)', ar: 'البخاري ومسلم (متّفق عليه)', en: 'Bukhari and Muslim (muttafaq alayh)' },
            { es: 'Tirmidhi', ar: 'الترمذي', en: 'Tirmidhi' },
          ],
          correct: 2,
          feedback: {
            es: 'Reportado por ambos = grado más alto de autenticidad («muttafaq alayh»).',
            ar: 'رواه البخاري ومسلم — أعلى درجات الصحّة (متّفق عليه).',
            en: 'Reported by both = highest authenticity grade («muttafaq alayh»).',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // 1️⃣ STATION 2: SHAHADA
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'shahada',
      icon: '<i class="fas fa-hand-point-up"></i>',
      title: { es: '1. Shahada — Testimonio', ar: '1. الشهادة', en: '1. Shahada — Testimony' },
      mascotIntro: {
        es: 'El primer pilar. La llave del Islam.',
        ar: 'الركن الأول. مفتاح الإسلام.',
        en: 'The 1st pillar. The key to Islam.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'Las 2 partes de la Shahada', ar: 'ركنا الشهادة', en: 'The 2 parts of the Shahada' },
          content: {
            es: '✨ El texto:\n\nأَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ\n\n«Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan rasul Allah.»\n\n«Atestiguo que no hay divinidad sino Allah, y atestiguo que Muhammad es el mensajero de Allah.»\n\n🔑 Los 2 pilares de la Shahada:\n\n1️⃣ **La ilaha illa Allah**\n= Solo Allah merece ser adorado (Tawhid).\n= Rechazo de todos los falsos dioses (Kufr bit-Taghut).\n\n2️⃣ **Muhammadan rasul Allah**\n= Aceptar al Profeta ﷺ como el último mensajero.\n= Seguir su Sunnah.\n= Creer en todo lo que trajo.',
            ar: '✨ النصّ:\n\nأَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ\n\n🔑 ركنا الشهادة:\n\n1️⃣ **لا إله إلا الله**\n= توحيد الله بالعبادة.\n= الكفر بالطاغوت.\n\n2️⃣ **محمّد رسول الله**\n= قبول النبي ﷺ خاتماً للرسل.\n= اتّباع سنّته.\n= الإيمان بكلّ ما جاء به.',
            en: '✨ The text:\n\nأَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ\n\n«Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan rasul Allah.»\n\n«I testify there is no deity but Allah, and Muhammad is His messenger.»\n\n🔑 The 2 pillars of the Shahada:\n\n1️⃣ **La ilaha illa Allah**\n= Only Allah deserves worship (Tawhid).\n= Rejection of all false gods (Kufr bit-Taghut).\n\n2️⃣ **Muhammadan rasul Allah**\n= Accept the Prophet ﷺ as the final messenger.\n= Follow his Sunnah.\n= Believe in all he brought.',
          },
          source: 'Quran 47:19 · Sahih al-Bukhari 25',
        },
        {
          type: 'card',
          title: { es: 'Las 7 condiciones de la Shahada', ar: 'شروط الشهادة السبعة', en: 'The 7 conditions of the Shahada' },
          content: {
            es: 'Para que la Shahada sea válida y beneficiosa, debe cumplir 7 condiciones:\n\n1️⃣ **العلم** — Ilm (conocimiento) de su significado.\n2️⃣ **اليقين** — Yaqin (certeza absoluta) sin duda.\n3️⃣ **القبول** — Qabul (aceptación) de lo que implica.\n4️⃣ **الانقياد** — Inqiyad (sumisión) a sus consecuencias.\n5️⃣ **الصدق** — Sidq (sinceridad), no hipocresía.\n6️⃣ **الإخلاص** — Ikhlas (pureza), solo por Allah.\n7️⃣ **المحبة** — Mahabbah (amor) por lo que representa.\n\n💡 Estas 7 condiciones son la diferencia entre quien dice la Shahada de corazón y el hipócrita que la dice solo con la lengua.',
            ar: 'لا بدّ من توفّر 7 شروط لصحّة الشهادة ونفعها:\n\n1️⃣ **العلم** بمعناها.\n2️⃣ **اليقين** المنافي للشكّ.\n3️⃣ **القبول** لما تقتضيه.\n4️⃣ **الانقياد** لما تدلّ عليه.\n5️⃣ **الصدق** المنافي للكذب.\n6️⃣ **الإخلاص** المنافي للشرك.\n7️⃣ **المحبّة** لهذه الكلمة وأهلها.\n\n💡 هذه الشروط تُفرّق بين الموحّد الصادق والمنافق الذي يقولها بلسانه فقط.',
            en: 'For the Shahada to be valid and beneficial, 7 conditions must be met:\n\n1️⃣ **Ilm** (knowledge) of its meaning.\n2️⃣ **Yaqin** (certainty) without doubt.\n3️⃣ **Qabul** (acceptance) of what it entails.\n4️⃣ **Inqiyad** (submission) to its consequences.\n5️⃣ **Sidq** (truthfulness), not hypocrisy.\n6️⃣ **Ikhlas** (sincerity), only for Allah.\n7️⃣ **Mahabbah** (love) for what it represents.\n\n💡 These 7 conditions distinguish the truthful believer from the hypocrite who says it only with his tongue.',
          },
          source: 'Sheikh Muhammad Ibn Abdul-Wahhab · Kitab at-Tawhid',
        },
        {
          type: 'quiz',
          question: {
            es: '¿Qué significa "La ilaha illa Allah"?',
            ar: 'ما معنى «لا إله إلا الله»؟',
            en: 'What does "La ilaha illa Allah" mean?',
          },
          options: [
            { es: 'Allah es grande', ar: 'الله كبير', en: 'Allah is great' },
            { es: 'No hay divinidad que merezca adoración sino Allah', ar: 'لا معبود بحقّ إلا الله', en: 'There is no deity worthy of worship except Allah' },
            { es: 'Solo hay un profeta', ar: 'يوجد نبيّ واحد فقط', en: 'There is only one prophet' },
            { es: 'Islam es paz', ar: 'الإسلام سلام', en: 'Islam is peace' },
          ],
          correct: 1,
          feedback: {
            es: 'Exacto. Es negación + afirmación: NIEGA la divinidad de todo lo demás, y AFIRMA la exclusividad de Allah.',
            ar: 'صحيح. نفي وإثبات: نفي الألوهيّة عمّا سوى الله، وإثباتها له وحده.',
            en: 'Exact. It is negation + affirmation: NEGATES the divinity of everything else, and AFFIRMS Allah\'s exclusivity.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuántas condiciones tiene la Shahada?',
            ar: 'كم شرطاً للشهادة؟',
            en: 'How many conditions does the Shahada have?',
          },
          options: ['3', '5', '7', '10'],
          correct: 2,
          feedback: {
            es: '7 condiciones: Ilm, Yaqin, Qabul, Inqiyad, Sidq, Ikhlas, Mahabbah.',
            ar: '7 شروط: العلم واليقين والقبول والانقياد والصدق والإخلاص والمحبّة.',
            en: '7 conditions: Ilm, Yaqin, Qabul, Inqiyad, Sidq, Ikhlas, Mahabbah.',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // 2️⃣ STATION 3: SALAH
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'salah',
      icon: '<i class="fas fa-person-praying"></i>',
      title: { es: '2. Salah — Oración', ar: '2. الصلاة', en: '2. Salah — Prayer' },
      mascotIntro: {
        es: 'El pilar diario. Lo primero por lo que serás juzgado el Día del Juicio.',
        ar: 'العمود اليومي. أوّل ما تُحاسب عليه يوم القيامة.',
        en: 'The daily pillar. The first thing you\'ll be judged for on the Day of Judgment.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'Las 5 oraciones diarias', ar: 'الصلوات الخمس', en: 'The 5 daily prayers' },
          content: {
            es: '🕌 Cada musulmán adulto sano y consciente reza 5 veces al día:\n\n🌅 **Fajr** — 2 rakahs, antes del amanecer.\n🌞 **Dhuhr** — 4 rakahs, después del mediodía.\n🌤️ **Asr** — 4 rakahs, por la tarde.\n🌇 **Maghrib** — 3 rakahs, tras la puesta del sol.\n🌙 **Isha** — 4 rakahs, por la noche.\n\n📖 «Establecéis la Salah, ciertamente la Salah previene la indecencia y la maldad.» (Al-Ankabut 29:45)\n\n💡 **Fajr y Asr** son las más importantes:\n«Quien reza las dos oraciones frescas (Fajr y Asr) entrará al Paraíso.» (Bukhari 574)',
            ar: '🕌 يُصلّي كلّ مسلم بالغ عاقل خمس صلوات كلّ يوم:\n\n🌅 **الفجر** — ركعتان قبل شروق الشمس.\n🌞 **الظهر** — 4 ركعات بعد الزوال.\n🌤️ **العصر** — 4 ركعات.\n🌇 **المغرب** — 3 ركعات بعد الغروب.\n🌙 **العشاء** — 4 ركعات.\n\n📖 «إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ» (العنكبوت 45)\n\n💡 **الفجر والعصر** أعظمها:\n«من صلّى البردَين دخل الجنّة.» (البخاري 574)',
            en: '🕌 Every sane adult Muslim prays 5 times a day:\n\n🌅 **Fajr** — 2 rakahs, before sunrise.\n🌞 **Dhuhr** — 4 rakahs, after midday.\n🌤️ **Asr** — 4 rakahs, afternoon.\n🌇 **Maghrib** — 3 rakahs, after sunset.\n🌙 **Isha** — 4 rakahs, night.\n\n📖 «Establish the Salah, indeed the Salah prevents indecency and evil.» (Al-Ankabut 29:45)\n\n💡 **Fajr and Asr** are the most important:\n«Whoever prays the two cool prayers (Fajr and Asr) will enter Paradise.» (Bukhari 574)',
          },
          source: 'Quran 29:45 · Sahih al-Bukhari 574',
        },
        {
          type: 'card',
          title: { es: '¿Por qué es tan importante la Salah?', ar: 'لماذا الصلاة عظيمة جداً؟', en: 'Why is Salah so important?' },
          content: {
            es: '⭐ 5 razones:\n\n1️⃣ Es el **PRIMER acto** por el que serás juzgado el Día del Juicio (Tirmidhi 413).\n\n2️⃣ Fue prescrita **directamente por Allah** durante el Miraj (viaje nocturno) — no a través de Jibril como el resto de leyes.\n\n3️⃣ Es la **línea divisoria** entre el musulmán y el no musulmán: «Entre nosotros y ellos está la Salah; quien la abandona se ha convertido en incrédulo.» (Tirmidhi 2621)\n\n4️⃣ Es el **segundo pilar** más importante después de la Shahada.\n\n5️⃣ Es la **conexión directa** con Allah 5 veces al día. En el Sujud, estás más cerca de Él.',
            ar: '⭐ 5 أسباب:\n\n1️⃣ **أوّل** ما تُحاسب عليه يوم القيامة (الترمذي 413).\n\n2️⃣ فُرضت **مباشرةً من الله** ليلة الإسراء والمعراج — لا عبر جبريل كسائر الشرائع.\n\n3️⃣ هي **الفارق** بين المسلم والكافر: «العهد الذي بيننا وبينهم الصلاة، فمن تركها فقد كفر.» (الترمذي 2621)\n\n4️⃣ هي **الركن الثاني** بعد الشهادة.\n\n5️⃣ صلة مباشرة بالله 5 مرّات يومياً. وفي السجود تكون أقرب ما يكون العبد من ربّه.',
            en: '⭐ 5 reasons:\n\n1️⃣ It\'s the **FIRST deed** you\'ll be judged for on the Day of Judgment (Tirmidhi 413).\n\n2️⃣ It was prescribed **directly by Allah** during the Miraj (night journey) — not through Jibril like other laws.\n\n3️⃣ It\'s the **dividing line** between Muslim and non-Muslim: «Between us and them is the Salah; whoever abandons it has become a disbeliever.» (Tirmidhi 2621)\n\n4️⃣ It\'s the **second most important** pillar after the Shahada.\n\n5️⃣ It\'s the **direct connection** with Allah 5 times a day. In Sujud, you are closest to Him.',
          },
          source: 'Sunan at-Tirmidhi 413 & 2621',
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuántos rakahs tiene Maghrib?',
            ar: 'كم ركعة في المغرب؟',
            en: 'How many rakahs does Maghrib have?',
          },
          options: ['2', '3', '4', '5'],
          correct: 1,
          feedback: {
            es: '3 rakahs. Es la única oración obligatoria con número IMPAR de rakahs.',
            ar: '3 ركعات. الوحيدة الفريضة ذات العدد الفردي.',
            en: '3 rakahs. The only obligatory prayer with an ODD number of rakahs.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuándo fue prescrita la Salah al Profeta ﷺ?',
            ar: 'متى فُرضت الصلاة على النبي ﷺ؟',
            en: 'When was the Salah prescribed to the Prophet ﷺ?',
          },
          options: [
            { es: 'En Madinah después de la Hijra', ar: 'في المدينة بعد الهجرة', en: 'In Madinah after the Hijra' },
            { es: 'Durante el Isra y Miraj (viaje nocturno)', ar: 'ليلة الإسراء والمعراج', en: 'During Isra and Miraj (night journey)' },
            { es: 'Al final de su vida', ar: 'في آخر حياته ﷺ', en: 'At the end of his life' },
            { es: 'En Badr', ar: 'يوم بدر', en: 'At Badr' },
          ],
          correct: 1,
          feedback: {
            es: 'Durante el Miraj, Allah le habló directamente al Profeta ﷺ. Inicialmente 50 oraciones, luego reducidas a 5 con la recompensa de 50.',
            ar: 'ليلة الإسراء والمعراج، كلّم الله النبي ﷺ مباشرةً. فُرضت 50 صلاة، ثمّ خُفّفت إلى 5 بأجر 50.',
            en: 'During the Miraj, Allah spoke directly to the Prophet ﷺ. Initially 50 prayers, then reduced to 5 with the reward of 50.',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // 3️⃣ STATION 4: ZAKAT
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'zakat',
      icon: '<i class="fas fa-hand-holding-heart"></i>',
      title: { es: '3. Zakat — Caridad obligatoria', ar: '3. الزكاة', en: '3. Zakat — Obligatory charity' },
      mascotIntro: {
        es: 'La purificación de la riqueza — el derecho del pobre sobre el rico.',
        ar: 'تطهير المال — حقّ الفقير في مال الغني.',
        en: 'The purification of wealth — the right of the poor over the rich.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'La regla del 2.5%', ar: 'قاعدة الـ 2.5%', en: 'The 2.5% rule' },
          content: {
            es: '💰 Cada musulmán que tenga un patrimonio mínimo (**nisab**) durante un año lunar completo debe pagar:\n\n📊 **2.5% de su patrimonio acumulado**\n\n**¿Qué es el nisab?**\n• 85 gramos de oro (o su equivalente monetario).\n• O 595 gramos de plata (o su equivalente).\n\n**¿Sobre qué se paga?**\n• Dinero (efectivo, banco, ahorros).\n• Oro y plata.\n• Mercancía comercial.\n• Ganado (con reglas específicas).\n• Cosechas y frutos (5% ó 10%).\n\n**¿Sobre qué NO?**\n• Casa donde vives.\n• Auto personal.\n• Muebles y ropa de uso.\n• Herramientas de trabajo.\n\n📖 «Tomad de sus bienes una limosna con la cual los purifiques y los santifiques.» (At-Tawbah 9:103)',
            ar: '💰 كلّ مسلم يبلغ ماله **النصاب** ويحول عليه الحول القمريّ وجب عليه إخراج:\n\n📊 **2.5% من رأس المال**\n\n**ما النصاب؟**\n• 85 جراماً من الذهب (أو ما يعادل).\n• أو 595 جراماً من الفضّة.\n\n**فيمَ تجب؟**\n• النقد (كاش، بنك، مدّخرات).\n• الذهب والفضّة.\n• عروض التجارة.\n• الأنعام (بشروط خاصّة).\n• الزروع والثمار (5% أو 10%).\n\n**فيمَ لا تجب؟**\n• بيت السكن.\n• سيّارة الاستعمال.\n• الأثاث والملابس.\n• أدوات العمل.\n\n📖 «خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا» (التوبة 103)',
            en: '💰 Every Muslim whose wealth reaches the minimum threshold (**nisab**) for a full lunar year must pay:\n\n📊 **2.5% of accumulated wealth**\n\n**What is nisab?**\n• 85 grams of gold (or monetary equivalent).\n• Or 595 grams of silver (or equivalent).\n\n**Zakat applies to:**\n• Money (cash, bank, savings).\n• Gold and silver.\n• Business inventory.\n• Livestock (specific rules).\n• Crops and fruits (5% or 10%).\n\n**Zakat does NOT apply to:**\n• Your home.\n• Personal car.\n• Furniture and clothes.\n• Work tools.\n\n📖 «Take from their wealth a charity by which you purify and cleanse them.» (At-Tawbah 9:103)',
          },
          source: 'Quran 9:103 · Sahih al-Bukhari 1395',
        },
        {
          type: 'card',
          title: { es: 'Los 8 beneficiarios del Zakat', ar: 'أصناف المستحقّين الثمانية', en: 'The 8 beneficiaries of Zakat' },
          content: {
            es: 'El Corán menciona explícitamente 8 categorías (At-Tawbah 9:60):\n\n1️⃣ **Al-Fuqara** — Los pobres (que no tienen suficiente).\n2️⃣ **Al-Masakin** — Los necesitados (peor que los pobres).\n3️⃣ **Al-Amilin** — Los recaudadores del Zakat.\n4️⃣ **Al-Mu\'allafa qulubuhum** — Aquellos cuyos corazones se atraen (nuevos musulmanes, no-musulmanes que se acercan).\n5️⃣ **Ar-Riqab** — Los esclavos (para liberarlos).\n6️⃣ **Al-Gharimin** — Los endeudados que no pueden pagar.\n7️⃣ **Fi sabilillah** — En el camino de Allah (defensa, propagación del Islam).\n8️⃣ **Ibn as-sabil** — El viajero necesitado.\n\n📖 «Las limosnas son solo para los pobres, los necesitados, los recaudadores, los que se atraen sus corazones, los esclavos, los endeudados, [los que luchan] en el camino de Allah, y el viajero — como decreto de Allah.» (At-Tawbah 9:60)',
            ar: 'ذكر القرآن الأصناف الثمانية صراحةً (التوبة 60):\n\n1️⃣ **الفقراء**.\n2️⃣ **المساكين**.\n3️⃣ **العاملون عليها**.\n4️⃣ **المؤلّفة قلوبهم**.\n5️⃣ **الرقاب** (لتحرير العبيد).\n6️⃣ **الغارمون**.\n7️⃣ **في سبيل الله**.\n8️⃣ **ابن السبيل**.\n\n📖 «إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ ۖ فَرِيضَةً مِّنَ اللَّهِ» (التوبة 60)',
            en: 'The Quran explicitly mentions 8 categories (At-Tawbah 9:60):\n\n1️⃣ **Al-Fuqara** — The poor (insufficient means).\n2️⃣ **Al-Masakin** — The needy (worse than the poor).\n3️⃣ **Al-Amilin** — Zakat collectors.\n4️⃣ **Al-Mu\'allafa qulubuhum** — Those whose hearts are attracted (new Muslims, non-Muslims approaching).\n5️⃣ **Ar-Riqab** — Slaves (to free them).\n6️⃣ **Al-Gharimin** — Debtors unable to pay.\n7️⃣ **Fi sabilillah** — In the cause of Allah.\n8️⃣ **Ibn as-sabil** — The needy traveler.\n\n📖 «Charity is only for the poor, the needy, the collectors, those whose hearts are attracted, slaves, debtors, [those] in the way of Allah, and the traveler — a decree from Allah.» (At-Tawbah 9:60)',
          },
          source: 'Quran 9:60',
        },
        {
          type: 'card',
          title: { es: 'Zakat al-Fitr', ar: 'زكاة الفطر', en: 'Zakat al-Fitr' },
          content: {
            es: '🌙 Además del Zakat anual, hay el **Zakat al-Fitr**:\n\n📅 Se paga al final de Ramadán, ANTES de la oración del Eid al-Fitr.\n\n📊 Cantidad: ~2.5 kg (1 sa\') de la comida básica local (arroz, dátiles, trigo...).\n\n💰 Modernamente: su equivalente en dinero (~5-10 USD por persona).\n\n👨‍👩‍👧‍👦 Se paga por CADA miembro de la familia (incluyendo bebés).\n\n**Propósito:**\n• Purifica al ayunador de errores durante el ayuno.\n• Alimenta a los pobres para que celebren el Eid con alegría.\n\n📖 «El Zakat al-Fitr purifica al ayunador de las palabras vanas y obscenas, y alimenta a los pobres.» (Abu Dawud 1609, hasan)',
            ar: '🌙 إلى جانب زكاة المال السنويّة، هناك **زكاة الفطر**:\n\n📅 تُخرج آخر رمضان قبل صلاة العيد.\n\n📊 المقدار: صاع (~2.5 كجم) من غالب قوت البلد (أرز، تمر، قمح...).\n\n💰 أو ما يعادلها نقداً في العصر الحديث (~5-10 دولار).\n\n👨‍👩‍👧‍👦 تُخرج عن كلّ فرد من الأسرة (حتى الصغار).\n\n**الحكمة:**\n• طُهرة للصائم من اللغو والرفث.\n• طُعمة للمساكين ليفرحوا بالعيد.\n\n📖 «زكاة الفطر طُهرة للصائم من اللغو والرفث، وطُعمة للمساكين.» (أبو داود 1609، حسن)',
            en: '🌙 In addition to annual Zakat, there is **Zakat al-Fitr**:\n\n📅 Paid at end of Ramadan, BEFORE Eid al-Fitr prayer.\n\n📊 Amount: ~2.5 kg (1 sa\') of local staple food (rice, dates, wheat...).\n\n💰 Modernly: monetary equivalent (~5-10 USD per person).\n\n👨‍👩‍👧‍👦 Paid for EVERY family member (including babies).\n\n**Purpose:**\n• Purifies the faster from vain and obscene words.\n• Feeds the poor so they can celebrate Eid joyfully.\n\n📖 «Zakat al-Fitr purifies the faster from vain talk and obscenity, and feeds the poor.» (Abu Dawud 1609, hasan)',
          },
          source: 'Sunan Abu Dawud 1609',
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuál es el porcentaje del Zakat anual sobre la riqueza?',
            ar: 'كم نسبة الزكاة السنوية على المال؟',
            en: 'What is the annual Zakat percentage on wealth?',
          },
          options: ['1%', '2.5%', '5%', '10%'],
          correct: 1,
          feedback: {
            es: '2.5% (una cuarentava parte). Los cultivos regados sin esfuerzo pagan 10%, los regados con esfuerzo 5%.',
            ar: '2.5% (ربع العُشر). الزروع تُسقى بلا مؤونة 10%، وبمؤونة 5%.',
            en: '2.5% (one fortieth). Crops watered without effort pay 10%, watered crops 5%.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuántas categorías de beneficiarios del Zakat menciona el Corán?',
            ar: 'كم صنفاً من مستحقّي الزكاة ذكر القرآن؟',
            en: 'How many categories of Zakat beneficiaries does the Quran mention?',
          },
          options: ['4', '6', '8', '10'],
          correct: 2,
          feedback: {
            es: '8 categorías en At-Tawbah 9:60. No se puede dar Zakat a otras categorías.',
            ar: '8 أصناف في التوبة 60. لا يجوز صرفها لغير هذه الأصناف.',
            en: '8 categories in At-Tawbah 9:60. Zakat cannot be given to other categories.',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // 4️⃣ STATION 5: SAWM (Ramadan Fasting)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'sawm',
      icon: '<i class="fas fa-moon"></i>',
      title: { es: '4. Sawm — Ayuno de Ramadán', ar: '4. صوم رمضان', en: '4. Sawm — Ramadan fasting' },
      mascotIntro: {
        es: 'Un mes de disciplina espiritual, gratitud y conexión con Allah.',
        ar: 'شهر من الانضباط الروحي والشكر والقرب من الله.',
        en: 'A month of spiritual discipline, gratitude, and closeness to Allah.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: '¿Qué es el Sawm?', ar: 'ما هو الصوم؟', en: 'What is Sawm?' },
          content: {
            es: '🌙 Durante el mes lunar de **Ramadán** (9º mes hijri), todo musulmán adulto, sano y no viajero AYUNA:\n\n📵 **Desde el Fajr** (antes del amanecer) hasta **Maghrib** (puesta del sol).\n\n🚫 **Abstenerse de:**\n• Comida y bebida (incluso agua).\n• Relaciones íntimas.\n• Fumar.\n• Malas palabras, chismes, mentira.\n• Pelear y enojarse.\n\n✅ **Enfocarse en:**\n• Lectura del Corán (muchos completan el Corán en Ramadán).\n• Oración adicional (Taraweeh de noche).\n• Caridad (Sadaqah).\n• Dhikr y du\'a.\n• Ayudar a los pobres.\n\n📖 «Se os ha prescrito el ayuno, como se prescribió a los que os precedieron, para que quizás seáis piadosos.» (Al-Baqarah 2:183)',
            ar: '🌙 في شهر **رمضان** المبارك (الشهر التاسع الهجريّ)، يصوم كلّ مسلم بالغ عاقل صحيح مقيم:\n\n📵 **من الفجر** إلى **المغرب**.\n\n🚫 **يُمسك عن:**\n• الأكل والشرب (حتى الماء).\n• الجماع.\n• التدخين.\n• اللغو والغيبة والكذب.\n• الغضب والقتال.\n\n✅ **يُكثر من:**\n• قراءة القرآن (كثيرون يختمونه في رمضان).\n• التراويح.\n• الصدقة.\n• الذكر والدعاء.\n• إعانة الفقراء.\n\n📖 «يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ» (البقرة 183)',
            en: '🌙 During the lunar month of **Ramadan** (9th Hijri month), every adult, sane, healthy, non-traveling Muslim FASTS:\n\n📵 **From Fajr** (before dawn) until **Maghrib** (sunset).\n\n🚫 **Abstain from:**\n• Food and drink (even water).\n• Intimate relations.\n• Smoking.\n• Bad words, gossip, lying.\n• Fighting and anger.\n\n✅ **Focus on:**\n• Quran reading (many complete the Quran in Ramadan).\n• Extra prayers (Taraweeh at night).\n• Charity (Sadaqah).\n• Dhikr and du\'a.\n• Helping the poor.\n\n📖 «Fasting is prescribed for you as it was prescribed for those before you, that you may become mindful.» (Al-Baqarah 2:183)',
          },
          source: 'Quran 2:183',
        },
        {
          type: 'card',
          title: { es: 'Quiénes están EXENTOS del ayuno', ar: 'من يُعفى من الصيام', en: 'Who is EXEMPT from fasting' },
          content: {
            es: 'Allah es Misericordioso. Están exentos:\n\n👶 **Niños prepúberes** — no obligatorio.\n\n🤒 **Enfermos** — con esperanza de curación: recupera después. Sin esperanza: paga fidyah (alimentar 1 pobre por día).\n\n✈️ **Viajeros** (>~80 km): pueden romper el ayuno y recuperar después.\n\n🩸 **Mujeres en menstruación o postparto (nifás):** NO ayunan y RECUPERAN después.\n\n🤰 **Embarazadas y lactantes** con temor por sí mismas o el bebé: pueden romper y recuperar.\n\n👴 **Ancianos incapacitados** — pagan fidyah, no ayunan.\n\n💊 **Mentalmente incapacitados** — no obligatorio.\n\n📖 «Quien esté enfermo o de viaje, [ayune] el mismo número de otros días.» (Al-Baqarah 2:185)',
            ar: 'الله رحيم. يُعفى من الصيام:\n\n👶 **الأطفال قبل البلوغ**.\n\n🤒 **المريض** — يُرجى شفاؤه: يقضي. لا يُرجى: يُفدي (إطعام مسكين لكلّ يوم).\n\n✈️ **المسافر** (سفر >~80 كم): يُفطر ويقضي.\n\n🩸 **الحائض والنفساء**: لا تصوم وتقضي.\n\n🤰 **الحامل والمرضع** إن خافت على نفسها أو ولدها: تُفطر وتقضي.\n\n👴 **الشيخ الكبير العاجز** — يُفدي، لا يصوم.\n\n💊 **المجنون** — غير مكلّف.\n\n📖 «فَمَن كَانَ مِنكُم مَّرِيضًا أَوْ عَلَىٰ سَفَرٍ فَعِدَّةٌ مِّنْ أَيَّامٍ أُخَرَ» (البقرة 185)',
            en: 'Allah is Merciful. Exempted are:\n\n👶 **Pre-pubescent children** — not obligatory.\n\n🤒 **The sick** — with hope of recovery: make up later. Without hope: pay fidyah (feed 1 poor person per day).\n\n✈️ **Travelers** (>~80 km): may break the fast, make up later.\n\n🩸 **Women in menstruation or postpartum (nifas):** do NOT fast and MAKE UP later.\n\n🤰 **Pregnant and nursing** with fear for themselves or baby: may break and make up.\n\n👴 **Elderly incapacitated** — pay fidyah, do not fast.\n\n💊 **Mentally incapacitated** — not obligatory.\n\n📖 «Whoever is sick or traveling, [fast] an equal number of other days.» (Al-Baqarah 2:185)',
          },
          source: 'Quran 2:184-185',
        },
        {
          type: 'card',
          title: { es: 'Laylat al-Qadr — La Noche del Decreto', ar: 'ليلة القدر', en: 'Laylat al-Qadr — The Night of Power' },
          content: {
            es: '✨ En Ramadán hay una noche especial:\n\n📖 «Laylat al-Qadr es MEJOR que 1,000 meses.» (Al-Qadr 97:3)\n\n🔢 1,000 meses = ~83 años. Adorar en esa noche = adorar 83 años.\n\n📅 **¿Cuándo es?**\nEstá entre las últimas 10 noches de Ramadán, muy probablemente en las noches IMPARES (21, 23, 25, 27, 29). Muchos ulemas favorecen la noche del 27.\n\n🤲 **Du\'a de Laylat al-Qadr:**\n\nاللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي\n\n«Allahumma innaka \'afuwwun tuhibbul-\'afwa fa\'fu \'anni»\n\n«Oh Allah, Tú eres el Perdonador y amas perdonar, ¡perdóname!»\n(Tirmidhi 3513)',
            ar: '✨ في رمضان ليلة عظيمة:\n\n📖 «لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ» (القدر 3)\n\n🔢 1000 شهر ≈ 83 سنة! العبادة فيها كعبادة 83 سنة.\n\n📅 **متى؟**\nفي العشر الأواخر من رمضان، وتُلتمس في الأوتار (21، 23، 25، 27، 29). ويرى كثير من العلماء أنّها ليلة 27.\n\n🤲 **دعاء ليلة القدر:**\n\nاللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي\n\n(الترمذي 3513)',
            en: '✨ In Ramadan there is a special night:\n\n📖 «Laylat al-Qadr is BETTER than 1,000 months.» (Al-Qadr 97:3)\n\n🔢 1,000 months = ~83 years. Worshipping that night = worshipping 83 years.\n\n📅 **When?**\nIn the last 10 nights of Ramadan, most likely on ODD nights (21, 23, 25, 27, 29). Many scholars favor the 27th night.\n\n🤲 **Du\'a of Laylat al-Qadr:**\n\nاللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي\n\n«Allahumma innaka \'afuwwun tuhibbul-\'afwa fa\'fu \'anni»\n\n«O Allah, You are the Pardoner who loves to pardon, so pardon me!»\n(Tirmidhi 3513)',
          },
          source: 'Quran 97:3 · Sunan at-Tirmidhi 3513',
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuánto vale Laylat al-Qadr?',
            ar: 'كم تُساوي ليلة القدر؟',
            en: 'What is Laylat al-Qadr worth?',
          },
          options: [
            { es: '100 meses', ar: '100 شهر', en: '100 months' },
            { es: '500 meses', ar: '500 شهر', en: '500 months' },
            { es: '1,000 meses (~83 años)', ar: '1000 شهر (~83 سنة)', en: '1,000 months (~83 years)' },
            { es: '10,000 meses', ar: '10,000 شهر', en: '10,000 months' },
          ],
          correct: 2,
          feedback: {
            es: 'Mejor que 1,000 meses — más de 83 años de adoración concentrados en UNA noche. ¡Qué gran misericordia!',
            ar: 'خير من ألف شهر — أكثر من 83 سنة من العبادة في ليلة واحدة! رحمة عظيمة.',
            en: 'Better than 1,000 months — over 83 years of worship in ONE night. What great mercy!',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Qué debe hacer un viajero que rompe su ayuno en Ramadán?',
            ar: 'ماذا يفعل المسافر إذا أفطر في رمضان؟',
            en: 'What must a traveler who breaks his fast in Ramadan do?',
          },
          options: [
            { es: 'Nada, es libre', ar: 'لا شيء', en: 'Nothing, it\'s free' },
            { es: 'Recuperar los días perdidos después', ar: 'يقضي الأيام لاحقاً', en: 'Make up the missed days later' },
            { es: 'Pagar fidyah y no ayunar', ar: 'يدفع الفدية ولا يصوم', en: 'Pay fidyah and not fast' },
            { es: 'Ayunar el doble', ar: 'يصوم الضِعف', en: 'Fast double' },
          ],
          correct: 1,
          feedback: {
            es: 'Recupera «un número igual de otros días» (Al-Baqarah 2:185). El enfermo con esperanza de curación igual.',
            ar: '«فَعِدَّةٌ مِّنْ أَيَّامٍ أُخَرَ» (البقرة 185). والمريض المرجوّ شفاؤه كذلك.',
            en: 'Make up «an equal number of other days» (Al-Baqarah 2:185). The sick with hope of recovery too.',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // 5️⃣ STATION 6: HAJJ
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'hajj',
      icon: '<i class="fas fa-kaaba"></i>',
      title: { es: '5. Hajj — Peregrinación', ar: '5. الحجّ', en: '5. Hajj — Pilgrimage' },
      mascotIntro: {
        es: 'La mayor reunión humana. Obligatoria UNA vez en la vida para quien pueda.',
        ar: 'أكبر تجمّع بشري. فرض العمر لمن استطاع.',
        en: 'The greatest human gathering. Obligatory ONCE in a lifetime for those able.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: '¿Qué es el Hajj?', ar: 'ما هو الحجّ؟', en: 'What is the Hajj?' },
          content: {
            es: '🕋 El Hajj es la peregrinación a la **Ka\'aba en La Meca**, obligatoria UNA VEZ EN LA VIDA para quien tenga:\n\n💪 Capacidad física.\n💰 Capacidad económica (sin endeudarse).\n🛡️ Seguridad en el camino.\n👩 Para la mujer: acompañamiento de un mahram (esposo o pariente cercano).\n\n📅 **¿Cuándo?**\nDel 8 al 13 del mes de **Dhul-Hijjah** (12º mes hijri).\n\n👥 **~2-3 millones** de musulmanes lo realizan cada año. Es la mayor reunión humana del planeta.\n\n📖 «Y a Allah pertenece el peregrinaje a la Casa para quien pueda encontrar el camino a ella.» (Aal-Imran 3:97)',
            ar: '🕋 الحجّ إلى **الكعبة في مكّة**، فرض العمر لمن ملك:\n\n💪 القدرة البدنية.\n💰 الاستطاعة المالية (بلا استدانة).\n🛡️ الأمن في الطريق.\n👩 للمرأة: محرم.\n\n📅 **متى؟**\nمن 8 إلى 13 **ذي الحجّة**.\n\n👥 حوالي **2-3 مليون** مسلم يحجّون كلّ عام. أكبر تجمّع بشريّ على وجه الأرض.\n\n📖 «وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا» (آل عمران 97)',
            en: '🕋 Hajj is the pilgrimage to the **Ka\'aba in Makkah**, obligatory ONCE IN A LIFETIME for one who has:\n\n💪 Physical ability.\n💰 Financial capacity (without debt).\n🛡️ Safety on the road.\n👩 For women: mahram accompaniment.\n\n📅 **When?**\nFrom 8-13 of **Dhul-Hijjah** (12th Hijri month).\n\n👥 **~2-3 million** Muslims do it each year. The largest human gathering on Earth.\n\n📖 «Pilgrimage to the House is a duty owed to Allah by those who can find a way to it.» (Aal-Imran 3:97)',
          },
          source: 'Quran 3:97 · Sahih al-Bukhari 1521',
        },
        {
          type: 'card',
          title: { es: 'Los 9 rituales principales', ar: 'أعمال الحجّ التسعة الرئيسية', en: 'The 9 main rituals' },
          content: {
            es: '📿 Los rituales por orden:\n\n1️⃣ **Ihram** — Vestido blanco especial (2 telas sin costuras para los hombres) + intención + prohibiciones.\n\n2️⃣ **Tawaf al-Qudum** — 7 vueltas alrededor de la Ka\'aba (al llegar).\n\n3️⃣ **Sa\'i** — Caminar/correr 7 veces entre las colinas de Safa y Marwa.\n\n4️⃣ **Día 8 (Yawm at-Tarwiyah)** — Ir a Mina.\n\n5️⃣ **Día 9 (Yawm Arafah)** — **PILAR MÁXIMO**: estar en la llanura de Arafat desde el mediodía hasta la puesta del sol. Du\'a intensa.\n\n6️⃣ **Muzdalifah** — Noche al aire libre, recoger 49-70 piedritas.\n\n7️⃣ **Días 10-13 en Mina:**\n• Lapidación de las 3 columnas (Jamarat).\n• Sacrificio del animal (Eid al-Adha).\n• Rasurarse o cortarse el cabello.\n\n8️⃣ **Tawaf al-Ifadah** — Otra vez 7 vueltas alrededor de la Ka\'aba.\n\n9️⃣ **Tawaf al-Wada** — Vueltas de despedida antes de irse.\n\n📖 «El día de Arafat es el Hajj.» (Nasa\'i 3016)',
            ar: '📿 المناسك بالترتيب:\n\n1️⃣ **الإحرام** — لباس أبيض خاصّ (إزار ورداء بلا خياطة للرجال) + نيّة + محظورات.\n\n2️⃣ **طواف القدوم** — 7 أشواط حول الكعبة عند الوصول.\n\n3️⃣ **السعي** — 7 أشواط بين الصفا والمروة.\n\n4️⃣ **8 ذي الحجّة (يوم التروية)** — التوجّه إلى منى.\n\n5️⃣ **9 ذي الحجّة (يوم عرفة)** — **الركن الأعظم**: الوقوف بعرفة من الزوال إلى الغروب. الدعاء والذكر.\n\n6️⃣ **مزدلفة** — المبيت وجمع الحصى.\n\n7️⃣ **أيّام التشريق (10-13 في منى):**\n• رمي الجمرات.\n• ذبح الهدي (عيد الأضحى).\n• الحلق أو التقصير.\n\n8️⃣ **طواف الإفاضة** — 7 أشواط أخرى.\n\n9️⃣ **طواف الوداع** — قبل المغادرة.\n\n📖 «الحجّ عرفة.» (النسائي 3016)',
            en: '📿 The rituals in order:\n\n1️⃣ **Ihram** — Special white garment (2 unstitched cloths for men) + intention + prohibitions.\n\n2️⃣ **Tawaf al-Qudum** — 7 circuits around the Ka\'aba (upon arrival).\n\n3️⃣ **Sa\'i** — Walking/running 7 times between the hills of Safa and Marwa.\n\n4️⃣ **Day 8 (Yawm at-Tarwiyah)** — Go to Mina.\n\n5️⃣ **Day 9 (Yawm Arafah)** — **GREATEST PILLAR**: stand on the plain of Arafat from noon to sunset. Intense du\'a.\n\n6️⃣ **Muzdalifah** — Night in the open, collect 49-70 pebbles.\n\n7️⃣ **Days 10-13 in Mina:**\n• Stoning of the 3 pillars (Jamarat).\n• Animal sacrifice (Eid al-Adha).\n• Shaving or cutting the hair.\n\n8️⃣ **Tawaf al-Ifadah** — Another 7 circuits around the Ka\'aba.\n\n9️⃣ **Tawaf al-Wada** — Farewell circuits before leaving.\n\n📖 «The day of Arafat IS the Hajj.» (Nasa\'i 3016)',
          },
          source: 'Sunan an-Nasa\'i 3016 · Sahih Muslim 1218',
        },
        {
          type: 'card',
          title: { es: 'La gran recompensa del Hajj', ar: 'الأجر العظيم للحجّ', en: 'The great reward of Hajj' },
          content: {
            es: '💎 El Profeta ﷺ dijo:\n\n**«Quien peregrine sin obrar el mal ni cometer faltas, vuelve [de sus pecados] como el día en que su madre lo dio a luz.»** (Bukhari 1521)\n\n🌟 Otros hadith:\n\n• «Del Hajj a Hajj se perdonan los pecados entre ellos.» (Bukhari 1773)\n\n• «El Hajj Mabrur (aceptado) no tiene otra recompensa que el Paraíso.» (Bukhari 1773)\n\n• «El Hajj es el mejor jihad para las mujeres.» (Bukhari 1520)\n\n💡 **¿Cómo hacer un Hajj aceptado (Mabrur)?**\n1. Dinero halal (no dinero robado, no interés).\n2. Intención pura, solo para Allah.\n3. Sin pecados durante el Hajj.\n4. Buen carácter con otros peregrinos.\n5. Cambio de vida al volver — no volver a los pecados.',
            ar: '💎 قال النبي ﷺ:\n\n**«من حجّ فلم يرفث ولم يفسق رجع من ذنوبه كيوم ولدته أمّه.»** (البخاري 1521)\n\n🌟 أحاديث أخرى:\n\n• «العمرة إلى العمرة كفّارة لما بينهما، والحجّ المبرور ليس له جزاء إلا الجنّة.» (البخاري 1773)\n\n• «جهاد الكبير والصغير والضعيف والمرأة: الحجّ والعمرة.» (النسائي 2626)\n\n💡 **كيف يكون الحجّ مبروراً؟**\n1. مال حلال.\n2. إخلاص النيّة.\n3. اجتناب المعاصي في الحجّ.\n4. حسن الخلق مع الحُجّاج.\n5. تغيّر السلوك بعد الحجّ.',
            en: '💎 The Prophet ﷺ said:\n\n**«Whoever performs Hajj without lewdness or sin returns [from his sins] as on the day his mother bore him.»** (Bukhari 1521)\n\n🌟 Other hadith:\n\n• «From one Hajj to the next, the sins between them are forgiven.» (Bukhari 1773)\n\n• «Al-Hajj al-Mabrur (accepted) has no reward other than Paradise.» (Bukhari 1773)\n\n• «Hajj is the best jihad for women.» (Bukhari 1520)\n\n💡 **How to have an accepted (Mabrur) Hajj?**\n1. Halal money (no theft, no interest).\n2. Pure intention, only for Allah.\n3. No sins during the Hajj.\n4. Good character with other pilgrims.\n5. Life change on return — don\'t return to sins.',
          },
          source: 'Sahih al-Bukhari 1521 & 1773',
        },
        {
          type: 'quiz',
          question: {
            es: '¿En qué día está el pilar mayor del Hajj?',
            ar: 'في أيّ يوم أعظم أركان الحجّ؟',
            en: 'On what day is the greatest pillar of Hajj?',
          },
          options: [
            { es: 'Día 8 (Tarwiyah)', ar: '8 ذي الحجّة (التروية)', en: 'Day 8 (Tarwiyah)' },
            { es: 'Día 9 (Arafah)', ar: '9 ذي الحجّة (عرفة)', en: 'Day 9 (Arafah)' },
            { es: 'Día 10 (Eid al-Adha)', ar: '10 ذي الحجّة (العيد)', en: 'Day 10 (Eid al-Adha)' },
            { es: 'Día 13 (último)', ar: '13 ذي الحجّة', en: 'Day 13 (last)' },
          ],
          correct: 1,
          feedback: {
            es: '«El Hajj ES Arafah.» (Nasa\'i 3016). Quien pierde este día pierde el Hajj entero.',
            ar: '«الحجّ عرفة.» (النسائي 3016). من فاته يوم عرفة فاته الحجّ.',
            en: '«The Hajj IS Arafah.» (Nasa\'i 3016). Whoever misses this day misses the whole Hajj.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuál es la recompensa del Hajj Mabrur (aceptado)?',
            ar: 'ما جزاء الحجّ المبرور؟',
            en: 'What is the reward of the accepted (Mabrur) Hajj?',
          },
          options: [
            { es: 'Larga vida', ar: 'طول العمر', en: 'Long life' },
            { es: 'Riqueza', ar: 'الغنى', en: 'Wealth' },
            { es: 'El Paraíso', ar: 'الجنّة', en: 'Paradise' },
            { es: 'Perdón de un pecado', ar: 'مغفرة ذنب واحد', en: 'Forgiveness of one sin' },
          ],
          correct: 2,
          feedback: {
            es: '«El Hajj Mabrur no tiene otra recompensa que el Paraíso.» (Bukhari 1773). ¡SubhanAllah!',
            ar: '«الحجّ المبرور ليس له جزاء إلا الجنّة.» (البخاري 1773). سبحان الله!',
            en: '«The Hajj Mabrur has no reward other than Paradise.» (Bukhari 1773). SubhanAllah!',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // 🎓 STATION 7: Final review & conclusion
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'conclusion',
      icon: '<i class="fas fa-graduation-cap"></i>',
      title: { es: 'Repaso y Conclusión', ar: 'المراجعة والخاتمة', en: 'Review and Conclusion' },
      mascotIntro: {
        es: '¡Excelente! Repasemos y consolidemos lo aprendido.',
        ar: 'ممتاز! لنراجع ونثبّت ما تعلّمنا.',
        en: 'Excellent! Let\'s review and consolidate what you\'ve learned.',
      },
      lessons: [
        {
          type: 'flashcards',
          title: { es: 'Los 5 Pilares en Flashcards', ar: 'الأركان الخمسة (بطاقات)', en: 'The 5 Pillars flashcards' },
          cards: [
            { front: '1️⃣', back: { es: 'Shahada — el testimonio', ar: 'الشهادة', en: 'Shahada — testimony' } },
            { front: '2️⃣', back: { es: 'Salah — las 5 oraciones diarias', ar: 'الصلاة', en: 'Salah — 5 daily prayers' } },
            { front: '3️⃣', back: { es: 'Zakat — 2.5% de la riqueza al año', ar: 'الزكاة (2.5%)', en: 'Zakat — 2.5% of wealth yearly' } },
            { front: '4️⃣', back: { es: 'Sawm — ayuno de Ramadán', ar: 'صوم رمضان', en: 'Sawm — Ramadan fasting' } },
            { front: '5️⃣', back: { es: 'Hajj — peregrinación una vez en la vida', ar: 'الحجّ (مرّة في العمر)', en: 'Hajj — once-in-a-lifetime pilgrimage' } },
          ],
        },
        {
          type: 'drag_drop',
          title: { es: 'Ordena los pilares', ar: 'رتّب الأركان', en: 'Order the pillars' },
          instruction: { es: 'Arrastra para ordenar', ar: 'اسحب للترتيب', en: 'Drag to order' },
          items: [
            { id: 'shahada', label: { es: 'Shahada', ar: 'الشهادة', en: 'Shahada' }, order: 1 },
            { id: 'salah', label: { es: 'Salah', ar: 'الصلاة', en: 'Salah' }, order: 2 },
            { id: 'zakat', label: { es: 'Zakat', ar: 'الزكاة', en: 'Zakat' }, order: 3 },
            { id: 'sawm', label: { es: 'Sawm', ar: 'الصوم', en: 'Sawm' }, order: 4 },
            { id: 'hajj', label: { es: 'Hajj', ar: 'الحجّ', en: 'Hajj' }, order: 5 },
          ],
        },
        {
          type: 'quiz',
          question: {
            es: '¿Qué pilar se realiza SOLO UNA VEZ en la vida?',
            ar: 'أيّ ركن يُؤدّى مرّة واحدة في العمر؟',
            en: 'Which pillar is done ONLY ONCE in a lifetime?',
          },
          options: [
            { es: 'Shahada', ar: 'الشهادة', en: 'Shahada' },
            { es: 'Salah', ar: 'الصلاة', en: 'Salah' },
            { es: 'Hajj', ar: 'الحجّ', en: 'Hajj' },
            { es: 'Zakat', ar: 'الزكاة', en: 'Zakat' },
          ],
          correct: 2,
          feedback: {
            es: 'El Hajj — obligatorio UNA VEZ en la vida para quien pueda. La Shahada se dice muchas veces pero es una sola creencia.',
            ar: 'الحجّ — فرض العمر لمن استطاع. الشهادة تُقال كثيراً لكنّها عقيدة واحدة.',
            en: 'Hajj — obligatory ONCE in a lifetime for those able. The Shahada is said many times but is one belief.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuál es el ÚNICO pilar que se realiza DIARIAMENTE?',
            ar: 'ما الركن الوحيد الذي يُؤدّى يومياً؟',
            en: 'Which is the ONLY pillar performed DAILY?',
          },
          options: [
            { es: 'Shahada', ar: 'الشهادة', en: 'Shahada' },
            { es: 'Salah', ar: 'الصلاة', en: 'Salah' },
            { es: 'Zakat', ar: 'الزكاة', en: 'Zakat' },
            { es: 'Sawm', ar: 'الصوم', en: 'Sawm' },
          ],
          correct: 1,
          feedback: {
            es: 'Salah — 5 veces al día. Es la columna vertebral de la vida del musulmán.',
            ar: 'الصلاة — 5 مرّات يومياً. عمود الدين.',
            en: 'Salah — 5 times a day. The backbone of a Muslim\'s life.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuál pilar es un impuesto obligatorio para los ricos?',
            ar: 'أيّ ركن هو فريضة ماليّة على الأغنياء؟',
            en: 'Which pillar is an obligatory tax on the rich?',
          },
          options: [
            { es: 'Shahada', ar: 'الشهادة', en: 'Shahada' },
            { es: 'Salah', ar: 'الصلاة', en: 'Salah' },
            { es: 'Zakat', ar: 'الزكاة', en: 'Zakat' },
            { es: 'Hajj', ar: 'الحجّ', en: 'Hajj' },
          ],
          correct: 2,
          feedback: {
            es: 'Zakat = 2.5% anual sobre la riqueza que supera el nisab. Es un DERECHO del pobre sobre el rico.',
            ar: 'الزكاة 2.5% سنويّاً على من بلغ نصاباً. حقّ للفقير على الغنيّ.',
            en: 'Zakat = 2.5% annually on wealth exceeding nisab. It is a RIGHT of the poor over the rich.',
          },
        },
        {
          type: 'card',
          title: { es: '🎓 ¡Curso completo!', ar: '🎓 اكتمل الكورس!', en: '🎓 Course complete!' },
          content: {
            es: '🌟 **Alhamdulillah**, has completado el curso de los 5 Pilares.\n\n📚 Ahora sabes:\n\n✅ El Hadith fundacional (Bukhari 8).\n✅ Las 2 partes + 7 condiciones de la Shahada.\n✅ Las 5 oraciones diarias y su importancia.\n✅ La regla del 2.5% + los 8 beneficiarios del Zakat.\n✅ Las reglas del ayuno + Laylat al-Qadr.\n✅ Los 9 rituales del Hajj + su gran recompensa.\n\n🌱 **El siguiente paso:**\n1. Aplica lo aprendido.\n2. Estudia el curso «Cómo rezar» para dominar la Salah.\n3. Estudia el curso «La ablución» para dominar el Wudu.\n4. Aprende árabe con el nuevo curso de idioma.\n\n💫 «Los que dicen: \'Nuestro Señor es Allah\' y luego perseveran, sobre ellos no habrá miedo ni se entristecerán.» (Fussilat 41:30)',
            ar: '🌟 **الحمد لله**، أتممتَ كورس الأركان الخمسة.\n\n📚 الآن تعرف:\n\n✅ حديث الأركان (البخاري 8).\n✅ ركنَي الشهادة و 7 شروطها.\n✅ الصلوات الخمس وأهمّيتها.\n✅ قاعدة 2.5% وأصناف الزكاة الثمانية.\n✅ أحكام الصوم وليلة القدر.\n✅ أعمال الحجّ التسعة وفضله.\n\n🌱 **الخطوة التالية:**\n1. طبّق ما تعلّمت.\n2. ادرس كورس «كيف تصلّي» لإتقان الصلاة.\n3. ادرس كورس «الوضوء» لإتقانه.\n4. تعلّم العربيّة في الكورس الجديد.\n\n💫 «إِنَّ الَّذِينَ قَالُوا رَبُّنَا اللَّهُ ثُمَّ اسْتَقَامُوا تَتَنَزَّلُ عَلَيْهِمُ الْمَلَائِكَةُ» (فصّلت 30)',
            en: '🌟 **Alhamdulillah**, you\'ve completed the 5 Pillars course.\n\n📚 Now you know:\n\n✅ The founding Hadith (Bukhari 8).\n✅ The 2 parts + 7 conditions of the Shahada.\n✅ The 5 daily prayers and their importance.\n✅ The 2.5% rule + the 8 Zakat beneficiaries.\n✅ Fasting rules + Laylat al-Qadr.\n✅ The 9 Hajj rituals + its great reward.\n\n🌱 **Next steps:**\n1. Apply what you\'ve learned.\n2. Study the «How to Pray» course to master Salah.\n3. Study the «Wudu» course to master ablution.\n4. Learn Arabic with the new language course.\n\n💫 «Those who say: \'Our Lord is Allah\' and then remain steadfast, no fear shall come upon them nor shall they grieve.» (Fussilat 41:30)',
          },
          source: 'Quran 41:30',
        },
      ],
    },
  ],
};

if (typeof window !== 'undefined') window.COURSE_PILLARS = COURSE_PILLARS;
