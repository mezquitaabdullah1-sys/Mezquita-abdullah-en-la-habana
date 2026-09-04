// 🕌 Course: How to Pray (Complete Salah Guide) — based on authentic Islamic sources
// Uses real-photo prayer position illustrations (11 photos)
const COURSE_SALAH_COMPLETE = {
  id: 'salah_complete',
  icon: '<i class="fas fa-mosque"></i>',
  mascotPose: 'encourage',
  color: '#1A6B52',
  ageGroup: 'all',
  durationMin: 45,
  difficulty: 'beginner',
  title: {
    es: 'Cómo Rezar Paso a Paso',
    ar: 'تعلّم الصلاة خطوة بخطوة',
    en: 'How to Pray — Step by Step',
  },
  description: {
    es: 'Aprende la Salah con imágenes reales: condiciones, pilares, posiciones, súplicas',
    ar: 'تعلّم الصلاة بصور حقيقية: الشروط، الأركان، الحركات، الأدعية',
    en: 'Learn Salah with real photos: conditions, pillars, positions, supplications',
  },
  stations: [
    // ============ STATION 1: CONDITIONS ============
    {
      id: 'conditions',
      icon: '<i class="fas fa-circle-check"></i>',
      title: { es: 'Condiciones de la Salah', ar: 'شروط الصلاة', en: 'Conditions of Salah' },
      mascotIntro: {
        es: 'Antes de orar, debes cumplir 6 condiciones. ¡Vamos!',
        ar: 'قبل الصلاة، يجب توفّر 6 شروط. هيا بنا!',
        en: 'Before praying, 6 conditions must be met. Let\'s go!',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'Las 6 Condiciones', ar: 'الشروط الستة', en: 'The 6 Conditions' },
          content: {
            es: '1️⃣ Islam, razón y discernimiento\n2️⃣ Tahara (Wudu) y ausencia de impurezas\n3️⃣ Cubrir el Awrah (cuerpo)\n4️⃣ Entrada del tiempo de oración\n5️⃣ Orientarse a la Qibla (La Meca)\n6️⃣ Niyyah (intención sincera en el corazón)',
            ar: '1️⃣ الإسلام والعقل والتمييز\n2️⃣ رفع الحدث (الطهارة) وإزالة النجاسة\n3️⃣ ستر العورة\n4️⃣ دخول الوقت\n5️⃣ استقبال القبلة\n6️⃣ النية',
            en: '1️⃣ Islam, sanity, and discernment\n2️⃣ Purity (Wudu) and freedom from impurity\n3️⃣ Covering the Awrah\n4️⃣ Entry of the prayer time\n5️⃣ Facing the Qibla (Makkah)\n6️⃣ Niyyah (sincere intention in the heart)',
          },
          source: 'Ijma\' (consensus of scholars)',
        },
        {
          type: 'quiz',
          question: { es: '¿Cuántas condiciones tiene la Salah?', ar: 'كم عدد شروط الصلاة؟', en: 'How many conditions does Salah have?' },
          options: ['4', '5', '6', '8'],
          correct: 2,
          feedback: {
            es: '6 condiciones: Islam, Wudu, cubrir Awrah, entrada del tiempo, Qibla, Niyyah.',
            ar: '6 شروط: الإسلام، الطهارة، ستر العورة، دخول الوقت، القبلة، النية.',
            en: '6 conditions: Islam, Wudu, covering Awrah, entry of time, Qibla, Niyyah.',
          },
        },
        {
          type: 'drag_drop',
          title: { es: 'Ordena las condiciones', ar: 'رتّب الشروط', en: 'Order the conditions' },
          instruction: { es: 'Arrastra para ordenarlas', ar: 'اسحب للترتيب', en: 'Drag to order them' },
          items: [
            { id: 'islam', label: { es: 'Islam y discernimiento', ar: 'الإسلام والعقل', en: 'Islam & sanity' }, order: 1 },
            { id: 'tahara', label: { es: 'Tahara (Wudu)', ar: 'الطهارة', en: 'Tahara (Wudu)' }, order: 2 },
            { id: 'awrah', label: { es: 'Cubrir el Awrah', ar: 'ستر العورة', en: 'Cover Awrah' }, order: 3 },
            { id: 'time', label: { es: 'Entrada del tiempo', ar: 'دخول الوقت', en: 'Entry of time' }, order: 4 },
            { id: 'qibla', label: { es: 'Orientarse a la Qibla', ar: 'استقبال القبلة', en: 'Face Qibla' }, order: 5 },
            { id: 'niyyah', label: { es: 'Niyyah (intención)', ar: 'النية', en: 'Niyyah' }, order: 6 },
          ],
        },
        // ── v20: Extended content ────────────────────────────────
        {
          type: 'card',
          title: { es: 'Detalles: cubrir el \'Awrah', ar: 'تفصيل: ستر العورة', en: 'Details: covering the \'Awrah' },
          content: {
            es: '👨 **Para el hombre**: del ombligo hasta debajo de la rodilla.\n\n👩 **Para la mujer libre adulta**: todo el cuerpo excepto la cara y las manos (según la mayoría) — incluyendo los pies según muchos ulemas.\n\n👗 La ropa debe:\n• No ser transparente.\n• No ser ajustada al punto de describir la forma del cuerpo.\n• Cubrir el hombro (al menos algo del hombro) para el hombre en Salah.\n\n📖 «No acepta Allah la oración de una mujer adulta sin khimar (velo).» (Abu Dawud 641, sahih)',
            ar: '👨 **الرجل**: من السرّة إلى ما تحت الركبة.\n\n👩 **المرأة الحرّة البالغة**: جميع بدنها إلا الوجه والكفّين (على الراجح) — والقدمان يستران عند كثير من العلماء.\n\n👗 يشترط في اللباس:\n• ألا يكون شفّافاً.\n• ألا يكون ضيّقاً يصف حجم الأعضاء.\n• سَتْر جزء من العاتق للرجل في الصلاة.\n\n📖 «لا يقبل الله صلاة حائض إلا بخمار.» (أبو داود 641، صحيح)',
            en: '👨 **For a man**: from navel to below the knee.\n\n👩 **For an adult free woman**: her entire body except the face and hands (per the majority) — including feet per many scholars.\n\n👗 The clothing must:\n• Not be transparent.\n• Not be so tight it describes the body\'s shape.\n• Cover at least part of the shoulder for a man in Salah.\n\n📖 «Allah does not accept the prayer of a mature woman without a khimār.» (Abu Dawud 641, ṣaḥīḥ)',
          },
          source: 'Sunan Abu Dawud 641 · Sahih Muslim 516',
        },
        {
          type: 'card',
          title: { es: 'Detalles: la Qibla', ar: 'تفصيل: القبلة', en: 'Details: the Qibla' },
          content: {
            es: '🕋 Orientarse hacia la **Ka\'aba** en La Meca es obligatorio (Quran 2:144).\n\n📍 Si NO conoces la dirección: haz tu mejor esfuerzo (ijtihād). Tu Salah es válida aunque falles.\n\n🚗 En transporte: reza sentado hacia donde puedas si el vehículo se mueve; para el Fard debes bajarte si puedes.\n\n⏳ Si comienzas y descubres el error de dirección DURANTE la Salah: gira hacia la Qibla sin cortar la oración.\n\n🌍 La aplicación tiene una brújula Qibla precisa.',
            ar: '🕋 استقبال **الكعبة** في مكة واجب (البقرة 144).\n\n📍 إذا لم تعرف الجهة: اجتهد. صلاتك صحيحة ولو أخطأت.\n\n🚗 في السفر: صلِّ النافلة على الراحلة حيث توجّهت؛ أما الفرض فينزل ويستقبل القبلة إن استطاع.\n\n⏳ إذا اكتشفت خطأ الاتجاه في الصلاة: استدر دون قطع.\n\n🌍 يوجد في التطبيق بوصلة قبلة دقيقة.',
            en: '🕋 Facing the **Ka\'aba** in Makkah is obligatory (Quran 2:144).\n\n📍 If you don\'t know the direction: do your best (ijtihād). Your Salah is valid even if wrong.\n\n🚗 In transit: pray Nafl in the direction of travel; for Fard, dismount and face Qibla if you can.\n\n⏳ If you discover the wrong direction DURING Salah: turn to Qibla without breaking.\n\n🌍 This app has an accurate Qibla compass.',
          },
          source: 'Quran 2:144 · Sahih al-Bukhari 401',
        },
        {
          type: 'quiz',
          question: {
            es: '¿Qué es el \'awrah del hombre en la Salah?',
            ar: 'ما عورة الرجل في الصلاة؟',
            en: 'What is a man\'s \'awrah in Salah?',
          },
          options: [
            { es: 'Solo las partes íntimas', ar: 'العورة المغلّظة فقط', en: 'Only private parts' },
            { es: 'De la cintura hasta el suelo', ar: 'من الخصر إلى الأرض', en: 'Waist to floor' },
            { es: 'Del ombligo hasta debajo de la rodilla', ar: 'من السرّة إلى ما تحت الركبة', en: 'Navel to below the knee' },
            { es: 'Todo el cuerpo', ar: 'جميع البدن', en: 'The entire body' },
          ],
          correct: 2,
          feedback: {
            es: 'Correcto. Del ombligo hasta debajo de la rodilla. Además debe cubrirse parte del hombro en Salah.',
            ar: 'صحيح. من السرّة إلى ما تحت الركبة، مع ستر جزء من العاتق في الصلاة.',
            en: 'Correct. Navel to below knee, plus covering some shoulder in Salah.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Se pronuncia la niyyah (intención) en voz alta?',
            ar: 'هل تُلفظ النية بصوت مسموع؟',
            en: 'Is the niyyah pronounced aloud?',
          },
          options: [
            { es: 'Sí, siempre', ar: 'نعم دائماً', en: 'Yes, always' },
            { es: 'No, es acto del corazón. Pronunciarla es una bid\'ah.', ar: 'لا، هي عمل قلبي. التلفّظ بها بدعة.', en: 'No, it\'s an act of the heart. Saying it aloud is a bid\'ah.' },
            { es: 'Solo el imam', ar: 'الإمام فقط', en: 'Only the imam' },
            { es: 'Solo en Fajr', ar: 'في الفجر فقط', en: 'Only in Fajr' },
          ],
          correct: 1,
          feedback: {
            es: 'La niyyah es un acto del CORAZÓN. El Profeta ﷺ y sus compañeros nunca la pronunciaron en voz alta.',
            ar: 'النية محلّها القلب. لم يُنقل عن النبي ﷺ ولا الصحابة التلفّظ بها.',
            en: 'Niyyah is an act of the HEART. Neither the Prophet ﷺ nor his companions pronounced it aloud.',
          },
        },
      ],
    },

    // ============ STATION 2: 14 PILLARS ============
    {
      id: 'pillars',
      icon: '<i class="fas fa-landmark"></i>',
      title: { es: 'Los 14 Pilares (Arkan)', ar: 'الأركان الأربعة عشر', en: 'The 14 Pillars' },
      mascotIntro: {
        es: 'Los pilares no se omiten ni por olvido. Si se omiten, la Salah es inválida.',
        ar: 'الأركان لا تسقط سهواً ولا عمداً. إن سقطت، بطلت الصلاة.',
        en: 'Pillars cannot be omitted, even by mistake.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'Los 14 Pilares', ar: '14 ركناً', en: 'The 14 Pillars' },
          content: {
            es: '1) Qiyam (estar de pie) si puede\n2) Takbirat al-Ihram ("Allahu Akbar")\n3) Recitar Al-Fatiha\n4) Ruku (inclinación)\n5) Levantarse del Ruku\n6) I\'tidal (erguirse)\n7) Sujud (postración)\n8) Levantarse del Sujud\n9) Julus (sentarse entre 2 Sujud)\n10) Tuma\'nina (calma)\n11) Tashahhud final\n12) Sentarse para Tashahhud final\n13) Las 2 Tasleem\n14) Orden correcto',
            ar: '1) القيام في الفرض على القادر\n2) تكبيرة الإحرام\n3) قراءة الفاتحة\n4) الركوع\n5) الرفع من الركوع\n6) الاعتدال قائماً\n7) السجود\n8) الرفع من السجود\n9) الجلوس بين السجدتين\n10) الطمأنينة\n11) التشهد الأخير\n12) الجلوس للتشهد الأخير\n13) التسليمتان\n14) ترتيب الأركان',
            en: '1) Qiyam (standing) if able\n2) Takbirat al-Ihram\n3) Reciting Al-Fatiha\n4) Ruku (bowing)\n5) Rising from Ruku\n6) I\'tidal (standing erect)\n7) Sujud (prostration)\n8) Rising from Sujud\n9) Julus (sitting between 2 Sujuds)\n10) Tuma\'nina (calmness)\n11) Final Tashahhud\n12) Sitting for final Tashahhud\n13) The 2 Tasleem\n14) Correct order',
          },
          source: 'Imam Ibn Qudamah, Al-Mughni',
        },
        {
          type: 'card',
          title: { es: 'La Tuma\'nina — el pilar olvidado', ar: 'الطمأنينة — الركن المنسيّ', en: 'Tuma\'nina — the forgotten pillar' },
          content: {
            es: '🧘 **Tuma\'nina** = quietud, calma. Es UN PILAR de la Salah.\n\nSignifica: en cada Ruku, Sujud, I\'tidal y Julus, DEBES estar quieto un momento — no moverte inmediatamente.\n\n⚠️ Un hombre entró a la mezquita y rezó rápido. El Profeta ﷺ le dijo:\n\n«ارجع فصلِّ فإنك لم تُصلِّ» — «Vuelve y reza, pues NO has rezado.»\n\nY lo repitió 3 veces (Bukhari 757). El error: no había tuma\'nina.\n\n💡 Regla práctica: en cada posición, di el dhikr con calma, no te apures.',
            ar: '🧘 **الطمأنينة** = الاستقرار والسكون. **ركن** من أركان الصلاة.\n\nمعناها: في كلّ ركوع وسجود واعتدال وجلوس، يجب أن تسكن لحظة قبل الانتقال.\n\n⚠️ دخل رجل المسجد وصلّى بسرعة، فقال له النبي ﷺ:\n\n«ارجع فصلِّ فإنك لم تُصلِّ» — ثلاث مرات! (البخاري 757). سبب البطلان: عدم الطمأنينة.\n\n💡 القاعدة: في كلّ ركن استقرّ حتى يعود كلّ عضو إلى مكانه.',
            en: '🧘 **Tuma\'nina** = stillness, calm. It is A PILLAR of the Salah.\n\nMeaning: in every Ruku, Sujud, I\'tidal, and Julus, you MUST pause and be still — do not move immediately.\n\n⚠️ A man entered the mosque and prayed quickly. The Prophet ﷺ said:\n\n«Go back and pray, for you have NOT prayed.»\n\nHe repeated it 3 TIMES (Bukhari 757). The problem: no tuma\'nina.\n\n💡 Practical rule: in every position, say the dhikr calmly, do not rush.',
          },
          source: 'Sahih al-Bukhari 757 (Hadith of the man who prayed badly)',
        },
        {
          type: 'quiz',
          question: { es: '¿Qué pasa si omites un pilar por olvido?', ar: 'ماذا لو نسيتَ ركناً؟', en: 'What if you omit a pillar by mistake?' },
          options: [
            { es: 'La Salah es válida con Sajdat as-Sahw', ar: 'الصلاة صحيحة بسجود السهو', en: 'Valid with Sajdat as-Sahw' },
            { es: 'La Salah es inválida', ar: 'الصلاة باطلة', en: 'Salah is invalid' },
            { es: 'Solo se necesita pedir perdón', ar: 'يكفي الاستغفار', en: 'Just seek forgiveness' },
          ],
          correct: 1,
          feedback: {
            es: 'Los pilares no se compensan con Sajdat as-Sahw. La Salah debe corregirse o repetirse.',
            ar: 'الأركان لا تُجبر بسجود السهو. تجب الإعادة أو التدارك.',
            en: 'Pillars are not compensated by Sajdat as-Sahw. Must be corrected or repeated.',
          },
        },
        // ── v20: Additional questions ────────────────────────────
        {
          type: 'quiz',
          question: {
            es: '¿Cuál NO es un pilar de la Salah?',
            ar: 'أيّ ممّا يلي ليس ركناً في الصلاة؟',
            en: 'Which of these is NOT a pillar of Salah?',
          },
          options: [
            { es: 'Recitar Al-Fatiha', ar: 'قراءة الفاتحة', en: 'Reciting Al-Fatiha' },
            { es: 'La Tuma\'nina', ar: 'الطمأنينة', en: 'Tuma\'nina (stillness)' },
            { es: 'Levantar el índice en el Tashahhud', ar: 'رفع السبابة في التشهد', en: 'Raising index finger in Tashahhud' },
            { es: 'El Tasleem final', ar: 'التسليم', en: 'The final Tasleem' },
          ],
          correct: 2,
          feedback: {
            es: 'Levantar el índice es Sunnah, no un pilar. Los otros 3 sí lo son.',
            ar: 'رفع السبابة سنّة، ليست ركناً. الباقي أركان.',
            en: 'Raising the finger is Sunnah, not a pillar. The other 3 are pillars.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuántas veces repitió el Profeta ﷺ "vuelve y reza" al hombre que rezó mal?',
            ar: 'كم مرّة قال النبي ﷺ للمسيء صلاته «ارجع فصلِّ»؟',
            en: 'How many times did the Prophet ﷺ tell the man who prayed badly to "go back and pray"?',
          },
          options: ['1', '2', '3', '5'],
          correct: 2,
          feedback: {
            es: '3 veces (Bukhari 757). El motivo: falta de Tuma\'nina y Salah apresurada.',
            ar: 'ثلاث مرّات (البخاري 757). السبب: عدم الطمأنينة.',
            en: '3 times (Bukhari 757). The reason: no Tuma\'nina, rushed prayer.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuáles son las partes del cuerpo que tocan el suelo en el Sujud?',
            ar: 'كم عضواً من أعضاء البدن يمسّ الأرض في السجود؟',
            en: 'How many body parts touch the ground in Sujud?',
          },
          options: ['5', '6', '7', '8'],
          correct: 2,
          feedback: {
            es: '7 partes: frente + nariz (juntas), 2 manos, 2 rodillas, 2 puntas de los pies (Bukhari 812).',
            ar: 'سبعة أعضاء: الجبهة والأنف، اليدان، الركبتان، أطراف القدمين (البخاري 812).',
            en: '7 parts: forehead + nose (together), 2 hands, 2 knees, 2 tips of feet (Bukhari 812).',
          },
        },
      ],
    },

    // ============ STATION 3: PRAYER STEPS (with photos) ============
    {
      id: 'steps',
      icon: '<i class="fas fa-shoe-prints"></i>',
      title: { es: 'Pasos de la Salah (con fotos)', ar: 'خطوات الصلاة (بصور)', en: 'Salah Steps (photos)' },
      mascotIntro: {
        es: '¡Mira cada posición con fotos reales y aprende qué decir!',
        ar: 'انظر إلى كل وضعية بصور حقيقية واعرف ماذا تقول!',
        en: 'See each position with real photos!',
      },
      lessons: [
        {
          type: 'prayer_step', stepNumber: 1, image: 'takbeer',
          title: { es: '1. Takbirat al-Ihram', ar: '1. تكبيرة الإحرام', en: '1. Takbirat al-Ihram' },
          description: {
            es: 'Levanta las manos a la altura de los hombros u orejas. Pronuncia con voluntad firme:',
            ar: 'ارفع يديك إلى حذو منكبيك أو أذنيك، ثم قل بنيّة:',
            en: 'Raise your hands to shoulder/ear level. Say with firm intent:',
          },
          dhikr: {
            arabic: 'اللَّهُ أَكْبَرُ',
            translit: 'Allahu Akbar',
            translation: { es: 'Allah es el más Grande', ar: 'الله أكبر', en: 'Allah is the Greatest' },
          },
          tip: { es: '💡 Mira al lugar de Sujud, no al cielo.', ar: '💡 انظر إلى موضع السجود.', en: '💡 Look at the place of Sujud.' },
          source: 'Sahih al-Bukhari 735',
        },
        {
          type: 'prayer_step', stepNumber: 2, image: 'qiyam',
          title: { es: '2. Qiyam — De pie', ar: '2. القيام', en: '2. Qiyam — Standing' },
          description: {
            es: 'Cruza tus manos sobre el pecho (derecha sobre izquierda). Recita Istiftah, A\'udhu billahi, Bismillah, Al-Fatiha y una sura corta.',
            ar: 'ضع يدك اليمنى على اليسرى على الصدر. اقرأ دعاء الاستفتاح، ثم الاستعاذة والبسملة، ثم الفاتحة وسورة قصيرة.',
            en: 'Cross your hands on the chest (right over left). Recite Istiftah, A\'udhu billahi, Bismillah, Al-Fatiha and a short surah.',
          },
          dhikr: {
            arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ...',
            translit: 'Al-hamdu lillahi Rabbil-\'alamin...',
            translation: { es: 'Alabado sea Allah, Señor de los mundos... (Fatiha completa)', ar: 'الحمد لله رب العالمين... (الفاتحة)', en: 'Praise be to Allah, Lord of the worlds... (full Fatiha)' },
          },
          tip: { es: '💡 Lee con tranquilidad, no rápido.', ar: '💡 اقرأ بتأنٍّ ولا تستعجل.', en: '💡 Read calmly, not in haste.' },
          source: 'Sahih al-Bukhari 757',
        },
        {
          type: 'prayer_step', stepNumber: 3, image: 'ruku',
          title: { es: '3. Ruku — Inclinación', ar: '3. الركوع', en: '3. Ruku — Bowing' },
          description: {
            es: 'Di "Allahu Akbar" e inclínate, colocando las manos sobre las rodillas. La espalda recta y paralela al suelo. Repite 3 veces:',
            ar: 'قل "الله أكبر" واركع واضعاً يديك على ركبتيك. اجعل ظهرك مستقيماً موازياً للأرض. ثم قل 3 مرات:',
            en: 'Say "Allahu Akbar" and bow, hands on knees. Back straight and parallel to ground. Say 3 times:',
          },
          dhikr: {
            arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
            translit: 'Subhana Rabbiyal-\'Adheem',
            translation: { es: 'Glorificado sea mi Señor el Inmenso', ar: 'سبحان ربي العظيم', en: 'Glory be to my Lord the Magnificent' },
          },
          tip: { es: '💡 Mira al lugar de Sujud.', ar: '💡 انظر إلى موضع السجود.', en: '💡 Look at the place of Sujud.' },
          source: 'Sahih Muslim 772',
        },
        {
          type: 'prayer_step', stepNumber: 4, image: 'itidal',
          title: { es: '4. I\'tidal — Erguirse', ar: '4. الاعتدال', en: '4. I\'tidal — Standing erect' },
          description: {
            es: 'Levántate del Ruku diciendo al levantar:',
            ar: 'ارفع من الركوع قائلاً عند الرفع:',
            en: 'Rise from Ruku saying while rising:',
          },
          dhikr: {
            arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ',
            translit: 'Sami\' Allahu liman hamidah',
            translation: { es: 'Allah escucha a quien Lo alaba', ar: 'سمع الله لمن حمده', en: 'Allah hears those who praise Him' },
          },
          secondDhikr: {
            arabic: 'رَبَّنَا وَلَكَ الْحَمْدُ',
            translit: 'Rabbana wa lakal-hamd',
            translation: { es: 'Señor nuestro, Tuya es la alabanza (de pie)', ar: 'ربنا ولك الحمد', en: 'Our Lord, to You belongs all praise' },
          },
          tip: { es: '💡 Permanece erguido con calma.', ar: '💡 اعتدل بطمأنينة.', en: '💡 Stand erect with calm.' },
          source: 'Sahih al-Bukhari 795',
        },
        {
          type: 'prayer_step', stepNumber: 5, image: 'sujood',
          title: { es: '5. Sujud — Primera postración', ar: '5. السجود الأول', en: '5. Sujud — First prostration' },
          description: {
            es: 'Di "Allahu Akbar" y baja a postrarte sobre los 7 miembros: frente+nariz, las 2 manos, las 2 rodillas, los dedos de los 2 pies. Repite 3 veces:',
            ar: 'قل "الله أكبر" واسجد على الأعضاء السبعة: الجبهة والأنف، الكفّان، الركبتان، أطراف القدمين. ثم قل 3 مرات:',
            en: 'Say "Allahu Akbar" and prostrate on the 7 body parts: forehead+nose, both hands, both knees, toes. Say 3 times:',
          },
          dhikr: {
            arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
            translit: 'Subhana Rabbiyal-A\'la',
            translation: { es: 'Glorificado sea mi Señor el Altísimo', ar: 'سبحان ربي الأعلى', en: 'Glory be to my Lord the Most High' },
          },
          tip: { es: '💡 Aleja los codos del cuerpo.', ar: '💡 جافِ مرفقيك.', en: '💡 Keep elbows away from sides.' },
          source: 'Sahih al-Bukhari 812',
        },
        {
          type: 'prayer_step', stepNumber: 6, image: 'julus',
          title: { es: '6. Julus — Sentarse entre 2 Sujud', ar: '6. الجلوس بين السجدتين', en: '6. Julus — Sitting between 2 Sujuds' },
          description: {
            es: 'Di "Allahu Akbar" y siéntate sobre tu pie izquierdo, con el derecho erguido. Di con tranquilidad:',
            ar: 'قل "الله أكبر" واجلس على رجلك اليسرى ناصباً اليمنى. ثم قل بطمأنينة:',
            en: 'Say "Allahu Akbar" and sit on your left foot with the right one upright. Say calmly:',
          },
          dhikr: {
            arabic: 'رَبِّ اغْفِرْ لِي',
            translit: 'Rabbi-ghfir li',
            translation: { es: 'Señor mío, perdóname', ar: 'رب اغفر لي', en: 'My Lord, forgive me' },
          },
          tip: { es: '💡 Esta postura se llama "Iftirash". Puedes decirlo 1 o 3 veces.', ar: '💡 هذه الجلسة "الافتراش". قُلها مرة أو 3.', en: '💡 This is "Iftirash". Say 1 or 3 times.' },
          source: 'Sunan an-Nasa\'i 1145',
        },
        {
          type: 'prayer_step', stepNumber: 7, image: 'second_sujood',
          title: { es: '7. Segundo Sujud', ar: '7. السجود الثاني', en: '7. Second Sujud' },
          description: {
            es: 'Di "Allahu Akbar" y postrate de nuevo como el primer Sujud. Repite 3 veces:',
            ar: 'قل "الله أكبر" واسجد كالسجدة الأولى. ثم قل 3 مرات:',
            en: 'Say "Allahu Akbar" and prostrate as the first Sujud. Repeat 3 times:',
          },
          dhikr: {
            arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
            translit: 'Subhana Rabbiyal-A\'la',
            translation: { es: 'Glorificado sea mi Señor el Altísimo', ar: 'سبحان ربي الأعلى', en: 'Glory be to my Lord the Most High' },
          },
          tip: { es: '💡 Esto completa la primera Rakah.', ar: '💡 بهذا تكتمل الركعة الأولى.', en: '💡 This completes the first Rakah.' },
          source: 'Sahih al-Bukhari 812',
        },
        {
          type: 'prayer_step', stepNumber: 8, image: 'standing_again',
          title: { es: '8. Volver a Qiyam — 2ª Rakah', ar: '8. القيام للركعة الثانية', en: '8. Standing again — 2nd Rakah' },
          description: {
            es: 'Di "Allahu Akbar" y levántate. Lee Al-Fatiha y una sura corta. Continúa como en la primera Rakah.',
            ar: 'قل "الله أكبر" وقم معتمداً على الأرض. اقرأ الفاتحة وسورة قصيرة. تابع كالركعة الأولى.',
            en: 'Say "Allahu Akbar" and rise. Read Al-Fatiha and a short surah. Continue as in 1st Rakah.',
          },
          dhikr: {
            arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
            translit: 'Bismillahi-Rahmani-Rahim',
            translation: { es: 'En el nombre de Allah (luego Al-Fatiha)', ar: 'بسم الله الرحمن الرحيم (ثم الفاتحة)', en: 'In the name of Allah (then Al-Fatiha)' },
          },
          tip: { es: '💡 No hay Du\'a de Istiftah en la 2ª Rakah.', ar: '💡 لا دعاء استفتاح في الثانية.', en: '💡 No Istiftah in 2nd Rakah.' },
          source: 'Sahih Muslim 397',
        },
        {
          type: 'prayer_step', stepNumber: 9, image: 'tashahhud',
          title: { es: '9. Tashahhud — Sentarse final', ar: '9. التشهد', en: '9. Tashahhud — Final sitting' },
          description: {
            es: 'Después del 2º Sujud de la última Rakah, siéntate y recita el Tashahhud + Salat Ibrahimiyyah + súplica.',
            ar: 'بعد السجدة الثانية من الركعة الأخيرة، اجلس واقرأ التشهد + الصلاة الإبراهيمية + الدعاء.',
            en: 'After the 2nd Sujud of the last Rakah, sit and recite Tashahhud + Salat Ibrahimiyyah + supplication.',
          },
          dhikr: {
            arabic: 'التَّحِيَّاتُ لِلَّهِ، وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
            translit: 'At-tahiyyatu lillah, was-salawatu wat-tayyibat...',
            translation: { es: 'Los saludos, oraciones y cosas buenas son para Allah...', ar: 'التحيات لله...', en: 'All greetings, prayers, and good things are for Allah...' },
          },
          secondDhikr: {
            arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ',
            translit: 'Allahumma salli \'ala Muhammad...',
            translation: { es: 'Oh Allah, bendice a Muhammad... (Salat Ibrahimiyyah)', ar: 'اللهم صلِّ على محمد... (الإبراهيمية)', en: 'O Allah, bless Muhammad... (Salat Ibrahimiyyah)' },
          },
          tip: { es: '💡 Levanta el índice en la Shahada.', ar: '💡 ارفع السبابة عند الشهادة.', en: '💡 Raise your index finger at Shahada.' },
          source: 'Sahih al-Bukhari 6328',
        },
        {
          type: 'prayer_step', stepNumber: 10, image: 'tasleem_right',
          title: { es: '10. Tasleem derecha', ar: '10. التسليم على اليمين', en: '10. Tasleem to the right' },
          description: {
            es: 'Gira tu cara hacia la derecha hasta ver tu hombro y di:',
            ar: 'التفت بوجهك إلى يمينك حتى تُرى صفحة خدّك وقل:',
            en: 'Turn your face to the right until your cheek is seen and say:',
          },
          dhikr: {
            arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
            translit: 'As-salamu \'alaykum wa rahmatullah',
            translation: { es: 'La paz y la misericordia de Allah sean contigo', ar: 'السلام عليكم ورحمة الله', en: 'Peace and mercy of Allah be upon you' },
          },
          tip: { es: '💡 El Tasleem es un pilar.', ar: '💡 التسليم ركن.', en: '💡 The Tasleem is a pillar.' },
          source: 'Sunan Abi Dawud 996',
        },
        {
          type: 'prayer_step', stepNumber: 11, image: 'tasleem_left',
          title: { es: '11. Tasleem izquierda', ar: '11. التسليم على اليسار', en: '11. Tasleem to the left' },
          description: {
            es: 'Gira tu cara hacia la izquierda y di lo mismo. ¡Has completado tu Salah! 🤲',
            ar: 'التفت إلى يسارك وقل المثل. لقد أتممت صلاتك! 🤲',
            en: 'Turn your face to the left and say the same. You\'ve completed your Salah! 🤲',
          },
          dhikr: {
            arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
            translit: 'As-salamu \'alaykum wa rahmatullah',
            translation: { es: 'La paz y la misericordia de Allah sean contigo', ar: 'السلام عليكم ورحمة الله', en: 'Peace and mercy of Allah be upon you' },
          },
          tip: { es: '🤲 Después: Adhkar de post-oración.', ar: '🤲 بعد: أذكار ما بعد الصلاة.', en: '🤲 After: post-prayer adhkar.' },
          source: 'Sunan Abi Dawud 996',
        },
      ],
    },

    // ============ STATION 4: WAJIBAT ============
    {
      id: 'wajibat',
      icon: '<i class="fas fa-clipboard"></i>',
      title: { es: 'Las 8 Obligaciones (Wajibat)', ar: 'الواجبات الثمانية', en: 'The 8 Wajibat' },
      mascotIntro: {
        es: 'Las Wajibat son obligatorias pero se compensan con Sajdat as-Sahw si se olvidan.',
        ar: 'الواجبات تجب لكن تُجبر بسجود السهو إذا نُسيت.',
        en: 'Wajibat are obligatory but can be compensated.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'Las 8 Wajibat', ar: 'الواجبات الثمانية', en: 'The 8 Wajibat' },
          content: {
            es: '1️⃣ Takbir (excepto Ihram)\n2️⃣ "Sami\' Allahu liman hamidah"\n3️⃣ "Rabbana wa lakal-hamd"\n4️⃣ "Subhana Rabbiyal-Adheem" en Ruku\n5️⃣ "Subhana Rabbiyal-A\'la" en Sujud\n6️⃣ "Rabbi-ghfir li" entre 2 Sujud\n7️⃣ Tashahhud Awwal\n8️⃣ Sentarse para Tashahhud Awwal',
            ar: '1️⃣ التكبير لغير الإحرام\n2️⃣ "سمع الله لمن حمده"\n3️⃣ "ربنا ولك الحمد"\n4️⃣ "سبحان ربي العظيم" في الركوع\n5️⃣ "سبحان ربي الأعلى" في السجود\n6️⃣ "رب اغفر لي" بين السجدتين\n7️⃣ التشهد الأول\n8️⃣ الجلوس للتشهد الأول',
            en: '1️⃣ Takbir (except Ihram)\n2️⃣ "Sami\' Allahu liman hamidah"\n3️⃣ "Rabbana wa lakal-hamd"\n4️⃣ "Subhana Rabbiyal-Adheem" in Ruku\n5️⃣ "Subhana Rabbiyal-A\'la" in Sujud\n6️⃣ "Rabbi-ghfir li" between Sujuds\n7️⃣ First Tashahhud\n8️⃣ Sitting for First Tashahhud',
          },
          source: 'Hanbali madhhab — Imam Ibn Qudamah',
        },
        {
          type: 'quiz',
          question: { es: '¿Diferencia entre Pilar y Wajibah?', ar: 'الفرق بين الركن والواجب؟', en: 'Pillar vs Wajibah?' },
          options: [
            { es: 'No hay diferencia', ar: 'لا فرق', en: 'No difference' },
            { es: 'Pilar: no se omite. Wajibah: se compensa con Sajdat as-Sahw.', ar: 'الركن لا يسقط. الواجب يُجبر بسجود السهو.', en: 'Pillar: cannot omit. Wajibah: compensated by Sajdat as-Sahw.' },
            { es: 'Pilar voluntario, Wajibah obligatorio', ar: 'الركن مستحب، الواجب فرض', en: 'Pillar voluntary, Wajibah obligatory' },
          ],
          correct: 1,
          feedback: {
            es: 'Correcto. El Pilar es esencial; sin él la Salah es inválida.',
            ar: 'صحيح. الركن جزء أساسي من الصلاة.',
            en: 'Correct. The Pillar is essential; Wajibah can be compensated.',
          },
        },
        // ── v20: Sajdat as-Sahw & extras ─────────────────────────
        {
          type: 'card',
          title: { es: 'Sajdat as-Sahw — postración por olvido', ar: 'سجود السهو', en: 'Sajdat as-Sahw — prostration of forgetfulness' },
          content: {
            es: '🔄 Son **2 postraciones** que se hacen para compensar un error o duda en la Salah.\n\n**¿Cuándo se hace?**\n1️⃣ Cuando AÑADES algo por olvido (ej: una rakah extra).\n2️⃣ Cuando OMITES una Wajibah por olvido.\n3️⃣ Cuando DUDAS del número de Rakahs.\n\n**¿Dónde se hacen las 2 postraciones?**\n• Escuela Hanbalí/Shafi\'í: ANTES del Tasleem (mayoría).\n• Si es por adición: DESPUÉS del Tasleem (Malikí/algunos Hanbalíes).\n\n**Cómo:**\nDespués del Tashahhud final → di «Allahu Akbar» → 2 Sujud como cualquier Sujud → Tasleem.\n\n📖 «Cuando uno duda en su Salah y no sabe cuánto rezó, que descarte la duda, construya sobre lo cierto, luego haga 2 sujud antes de Tasleem.» (Muslim 571)',
            ar: '🔄 **سجدتان** تُجبر بهما بعض أخطاء الصلاة.\n\n**متى؟**\n1️⃣ عند الزيادة سهواً (كركعة زائدة).\n2️⃣ عند ترك واجب سهواً.\n3️⃣ عند الشكّ في عدد الركعات.\n\n**أين تُصلّى؟**\n• قبل السلام في مذهب الشافعية والحنابلة (الغالب).\n• بعد السلام إذا كانت للزيادة (المالكية وبعض الحنابلة).\n\n**كيف؟**\nبعد التشهد الأخير → «الله أكبر» → سجدتان كأيّ سجود → التسليم.\n\n📖 «إذا شكّ أحدكم في صلاته فلم يدرِ كم صلّى، فليطرح الشكّ وليَبنِ على ما استيقن، ثم يسجد سجدتين قبل أن يُسلّم.» (مسلم 571)',
            en: '🔄 They are **2 prostrations** to compensate for a mistake or doubt in the Salah.\n\n**When?**\n1️⃣ When you ADD something by mistake (e.g., extra rakah).\n2️⃣ When you OMIT a Wajibah by mistake.\n3️⃣ When you DOUBT the number of Rakahs.\n\n**Where are the 2 prostrations?**\n• Shafi\'i/Hanbali: BEFORE the Tasleem (majority).\n• For addition errors: AFTER Tasleem (Maliki/some Hanbali).\n\n**How:**\nAfter final Tashahhud → say «Allahu Akbar» → 2 Sujud like any Sujud → Tasleem.\n\n📖 «When one doubts in his Salah and does not know how much he prayed, let him discard the doubt, build on certainty, then make 2 sujud before Tasleem.» (Muslim 571)',
          },
          source: 'Sahih Muslim 571 · Bukhari 401',
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuántas postraciones son en Sajdat as-Sahw?',
            ar: 'كم عدد السجدات في سجود السهو؟',
            en: 'How many prostrations in Sajdat as-Sahw?',
          },
          options: ['1', '2', '3', '4'],
          correct: 1,
          feedback: {
            es: '2 postraciones — como en cualquier Rakah. Antes o después del Tasleem según la escuela.',
            ar: 'سجدتان — كسجدتَي أيّ ركعة. قبل السلام أو بعده حسب المذهب.',
            en: '2 prostrations — like any Rakah. Before or after Tasleem per madhhab.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuál es el estatus de la Salat Ibrahimiyyah en el Tashahhud final?',
            ar: 'ما حكم الصلاة الإبراهيمية في التشهد الأخير؟',
            en: 'What is the ruling of Salat Ibrahimiyyah in the final Tashahhud?',
          },
          options: [
            { es: 'Pilar (rukn)', ar: 'ركن', en: 'Pillar (rukn)' },
            { es: 'Sunnah — Wajib en la escuela Shafi\'i', ar: 'سنّة — واجبة عند الشافعية', en: 'Sunnah — Wajib in Shafi\'i school' },
            { es: 'Mustahab solo (no obligatorio)', ar: 'مستحبّ فقط', en: 'Only mustahabb' },
            { es: 'Prohibido en Salah', ar: 'ممنوع في الصلاة', en: 'Forbidden in Salah' },
          ],
          correct: 1,
          feedback: {
            es: 'Los Shafi\'i la consideran Wajib. Otros la consideran Sunnah muy enfatizada. En cualquier caso, no la omitas.',
            ar: 'الشافعية يوجبونها. غيرهم يعدّونها سنّة مؤكّدة. لا تتركها.',
            en: 'Shafi\'is consider it Wajib. Others say strongly-emphasized Sunnah. Don\'t skip it.',
          },
        },
      ],
    },

    // ============ STATION 5: TASHAHHUD & DU'A ============
    {
      id: 'tashahhud_dua',
      icon: '<i class="fas fa-hands-praying"></i>',
      title: { es: 'Tashahhud y Súplicas', ar: 'التشهد والأدعية', en: 'Tashahhud & Du\'as' },
      mascotIntro: {
        es: 'Aprende qué se dice en el Tashahhud y la mejor súplica antes del Tasleem.',
        ar: 'تعلّم ما يُقال في التشهد وأفضل دعاء قبل التسليم.',
        en: 'Learn the Tashahhud text and the best Du\'a before Tasleem.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: '1. Texto del Tashahhud (At-Tahiyyat)', ar: '1. نص التشهد', en: '1. Tashahhud (At-Tahiyyat)' },
          content: {
            es: 'التَّحِيَّاتُ لِلَّهِ، وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ\n\n📖 "Los saludos, oraciones y buenas cosas son para Allah. La paz sea contigo, Profeta, y la misericordia de Allah. La paz sea con nosotros y con los siervos rectos. Testifico que no hay divinidad sino Allah, y que Muhammad es Su siervo y Mensajero."',
            ar: 'التَّحِيَّاتُ لِلَّهِ، وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
            en: 'At-tahiyyatu lillah, was-salawatu wat-tayyibat. As-salamu \'alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh. As-salamu \'alayna wa \'ala \'ibadillahis-salihin. Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan \'abduhu wa Rasuluh.\n\n📖 "All greetings, prayers, and good things are for Allah. Peace be upon you, O Prophet... I testify there is no god but Allah, and Muhammad is His servant and Messenger."',
          },
          source: 'Sahih al-Bukhari 6265',
        },
        {
          type: 'card',
          title: { es: '2. Salat Ibrahimiyyah', ar: '2. الصلاة الإبراهيمية', en: '2. Salat Ibrahimiyyah' },
          content: {
            es: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ. اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ.\n\n📖 "Oh Allah, bendice a Muhammad y a su familia como bendijiste a Ibrahim y su familia. Tú eres Loado, Glorioso."\n\n⚠️ Sunnah — Wajib en la escuela Shafi\'i.',
            ar: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ. اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ.\n\n⚠️ سنّة — وواجبة عند الشافعية.',
            en: 'Allahumma salli \'ala Muhammadin wa \'ala ali Muhammad, kama sallayta \'ala Ibrahima wa \'ala ali Ibrahim, innaka Hamidum Majid. Allahumma barik \'ala Muhammadin wa \'ala ali Muhammad, kama barakta \'ala Ibrahima wa \'ala ali Ibrahim, innaka Hamidum Majid.\n\n📖 "O Allah, bless Muhammad and his family as You blessed Ibrahim and his family..."\n\n⚠️ Sunnah — Wajib in the Shafi\'i school.',
          },
          source: 'Sahih al-Bukhari 3370',
        },
        {
          type: 'card',
          title: { es: '3. Du\'a antes del Tasleem', ar: '3. الدعاء قبل التسليم', en: '3. Du\'a before Tasleem' },
          content: {
            es: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً، وَفِي الْآخِرَةِ حَسَنَةً، وَقِنَا عَذَابَ النَّارِ\n\n📖 "Señor nuestro, danos lo bueno en esta vida y en la próxima, y protégenos del Fuego."\n\nEra la súplica más frecuente del Profeta ﷺ. También puedes pedir cualquier necesidad permitida en cualquier idioma.',
            ar: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً، وَفِي الْآخِرَةِ حَسَنَةً، وَقِنَا عَذَابَ النَّارِ\n\nكان النبي ﷺ يُكثر من هذا الدعاء (البخاري 6389). ويمكن أن تدعو بأي حاجة مباحة.',
            en: 'Rabbana atina fid-dunya hasanah, wa fil-akhirati hasanah, waqina \'adhaban-nar.\n\n📖 "Our Lord, give us good in this world and good in the next, and protect us from the Fire."\n\nThe Prophet\'s ﷺ most frequent supplication. You may ask for any lawful need in any language.',
          },
          source: 'Quran 2:201 + Sahih al-Bukhari 6389',
        },
        {
          type: 'quiz',
          question: {
            es: '¿En qué Tashahhud se recita la Salat Ibrahimiyyah?',
            ar: 'في أيّ تشهد تُقرأ الصلاة الإبراهيمية؟',
            en: 'In which Tashahhud is the Salat Ibrahimiyyah recited?',
          },
          options: [
            { es: 'En el primero solamente', ar: 'في الأول فقط', en: 'In the first only' },
            { es: 'En el último solamente', ar: 'في الأخير فقط', en: 'In the last only' },
            { es: 'En ambos', ar: 'في الاثنين', en: 'In both' },
          ],
          correct: 1,
          feedback: {
            es: 'En el último. El primer Tashahhud solo lleva At-Tahiyyat, luego se levanta a la 3ª Rakah.',
            ar: 'في الأخير. أما الأول فيُكتفى بالتحيات.',
            en: 'In the final one. The first only has At-Tahiyyat, then rise for 3rd Rakah.',
          },
        },
        // ── v20: 4 protection Du'as before Tasleem ──────────────
        {
          type: 'card',
          title: { es: 'Las 4 Du\'as de protección', ar: 'الأدعية الأربعة للاستعاذة', en: 'The 4 protection Du\'as' },
          content: {
            es: 'Antes del Tasleem, el Profeta ﷺ enseñó a decir:\n\nاللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، وَمِنْ عَذَابِ جَهَنَّمَ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ\n\n📖 «Allāhumma innī a\'ūdhu bika min \'adhābi l-qabri, wa min \'adhābi jahannam, wa min fitnati l-maḥyā wa l-mamāt, wa min sharri fitnati l-Masīḥi d-Dajjāl.»\n\n«Oh Allah, en Ti me refugio de:\n1️⃣ el castigo de la tumba,\n2️⃣ el castigo del Infierno,\n3️⃣ la fitna de la vida y la muerte,\n4️⃣ el mal de la fitna del Anticristo.»\n\n📖 El Profeta ﷺ ordenó: «Cuando termine el último Tashahhud, refúgiese en Allah de estas 4 cosas.» (Muslim 588)',
            ar: 'قبل التسليم، علّم النبي ﷺ:\n\nاللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، وَمِنْ عَذَابِ جَهَنَّمَ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ\n\nقال ﷺ: «إذا فرغ أحدكم من التشهد الأخير فليتعوّذ بالله من أربع…» (مسلم 588)',
            en: 'Before Tasleem, the Prophet ﷺ taught to say:\n\nاللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ...\n\n«O Allah, I seek refuge in You from:\n1️⃣ the punishment of the grave,\n2️⃣ the punishment of Hellfire,\n3️⃣ the trials of life and death,\n4️⃣ the evil of the trial of Al-Masīḥ ad-Dajjāl.»\n\n📖 The Prophet ﷺ commanded: «When one of you finishes the final Tashahhud, seek refuge in Allah from these 4 things.» (Muslim 588)',
          },
          source: 'Sahih Muslim 588',
        },
        {
          type: 'quiz',
          question: {
            es: '¿De cuántas cosas debemos pedir refugio antes del Tasleem final (según hadith)?',
            ar: 'كم عدد الأشياء التي نستعيذ منها قبل التسليم (حسب الحديث)؟',
            en: 'How many things should we seek refuge from before the final Tasleem (per hadith)?',
          },
          options: ['2', '3', '4', '5'],
          correct: 2,
          feedback: {
            es: '4: castigo de la tumba, castigo del Infierno, fitna de la vida y muerte, y fitna del Dajjal (Muslim 588).',
            ar: 'أربع: عذاب القبر، عذاب جهنّم، فتنة المحيا والممات، فتنة المسيح الدجّال (مسلم 588).',
            en: '4: punishment of grave, punishment of Hell, trial of life/death, and trial of the Dajjal (Muslim 588).',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuál era la súplica MÁS FRECUENTE del Profeta ﷺ?',
            ar: 'ما أكثر دعاء كان يدعو به النبي ﷺ؟',
            en: 'What was the Prophet\'s ﷺ MOST FREQUENT supplication?',
          },
          options: [
            { es: '«Rabbana atina fid-dunya hasanah...»', ar: '«ربنا آتنا في الدنيا حسنة...»', en: '«Rabbana atina fid-dunya hasanah...»' },
            { es: '«Allahumma ihdini»', ar: '«اللهم اهدني»', en: '«Allahumma ihdini»' },
            { es: '«Astaghfirullah»', ar: '«أستغفر الله»', en: '«Astaghfirullah»' },
            { es: '«La hawla wa la quwwata illa billah»', ar: '«لا حول ولا قوّة إلا بالله»', en: '«La hawla wa la quwwata illa billah»' },
          ],
          correct: 0,
          feedback: {
            es: 'Anas (رضي الله عنه) dijo: era la súplica más frecuente del Profeta ﷺ (Bukhari 6389).',
            ar: 'قال أنس رضي الله عنه: كان أكثر دعاء النبي ﷺ (البخاري 6389).',
            en: 'Anas (رضي الله عنه) said: it was the Prophet\'s ﷺ most frequent du\'a (Bukhari 6389).',
          },
        },
      ],
    },

    // ============ STATION 6: 4-RAKAH PRAYERS ============
    {
      id: 'four_rakah',
      icon: '4️⃣',
      title: { es: 'Salah de 4 Rakahs', ar: 'الصلاة الرباعية', en: '4-Rakah Prayers' },
      mascotIntro: {
        es: 'Dhuhr, Asr y Isha tienen 4 Rakahs. ¡Te explico cómo!',
        ar: 'الظهر والعصر والعشاء أربع ركعات. سأشرح لك كيف!',
        en: 'Dhuhr, Asr, and Isha have 4 Rakahs. Let me explain!',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'Diferencias con 2 Rakahs', ar: 'الفروقات مع الثنائية', en: 'Differences from 2-Rakah' },
          content: {
            es: 'Rakahs 1 y 2: idénticas a Fajr (Fatiha + sura corta).\n\nDespués del 2º Sujud de la 2ª Rakah:\n→ Tashahhud Awwal (solo At-Tahiyyat).\n→ Te levantas a la 3ª Rakah.\n\nRakahs 3 y 4 (en Fard):\n→ Solo Al-Fatiha (sin sura adicional).\n→ Lo demás igual.\n→ Después del 2º Sujud de la 4ª Rakah → Tashahhud final completo → Tasleem.',
            ar: 'الركعتان 1 و2: مثل الفجر (الفاتحة + سورة).\n\nبعد السجدة الثانية من الثانية:\n→ التشهد الأول (التحيات فقط).\n→ القيام إلى الثالثة.\n\nالركعتان 3 و4 (في الفرض):\n→ الفاتحة فقط.\n→ الباقي كالمعتاد.\n→ التشهد الأخير → التسليم.',
            en: 'Rakahs 1-2: identical to Fajr (Fatiha + short surah).\n\nAfter 2nd Sujud of Rakah 2:\n→ First Tashahhud (only At-Tahiyyat).\n→ Rise to Rakah 3.\n\nRakahs 3-4 (in Fard):\n→ Only Al-Fatiha.\n→ Everything else same.\n→ After 2nd Sujud of Rakah 4 → full final Tashahhud → Tasleem.',
          },
          source: 'Sahih al-Bukhari 757',
        },
        {
          type: 'quiz',
          question: {
            es: '¿En Rakahs 3-4 de un Fard se recita una sura?',
            ar: 'هل تُقرأ سورة في الركعتين 3-4 من الفرض؟',
            en: 'In Rakahs 3-4 of a Fard, is a surah recited?',
          },
          options: [
            { es: 'Sí, siempre', ar: 'نعم دائماً', en: 'Yes, always' },
            { es: 'No, solo Al-Fatiha', ar: 'لا، الفاتحة فقط', en: 'No, only Al-Fatiha' },
            { es: 'Solo en Dhuhr', ar: 'فقط في الظهر', en: 'Only in Dhuhr' },
          ],
          correct: 1,
          feedback: {
            es: 'En Fard: solo Fatiha en 3-4. En Sunan/Nawafil sí se puede añadir sura.',
            ar: 'في الفرض: الفاتحة فقط. أما السنن فيمكن إضافة سورة.',
            en: 'Fard: only Fatiha in 3-4. Sunan/Nawafil may add a surah.',
          },
        },
        {
          type: 'drag_drop',
          title: { es: 'Ordena la Salah de 4 Rakahs', ar: 'رتّب الصلاة الرباعية', en: 'Order the 4-Rakah Salah' },
          instruction: { es: 'Arrastra al orden correcto', ar: 'اسحب بالترتيب الصحيح', en: 'Drag in correct order' },
          items: [
            { id: 'r1', label: { es: '1ª Rakah completa', ar: 'الركعة الأولى', en: '1st Rakah' }, order: 1 },
            { id: 'r2', label: { es: '2ª Rakah + Tashahhud Awwal', ar: 'الركعة الثانية + التشهد الأول', en: '2nd Rakah + First Tashahhud' }, order: 2 },
            { id: 'r3', label: { es: '3ª Rakah (solo Fatiha)', ar: 'الثالثة (الفاتحة فقط)', en: '3rd Rakah (Fatiha only)' }, order: 3 },
            { id: 'r4', label: { es: '4ª Rakah (solo Fatiha)', ar: 'الرابعة (الفاتحة فقط)', en: '4th Rakah (Fatiha only)' }, order: 4 },
            { id: 'final', label: { es: 'Tashahhud final + Tasleem', ar: 'التشهد الأخير + التسليم', en: 'Final Tashahhud + Tasleem' }, order: 5 },
          ],
        },
      ],
    },

    // ============ STATION 7: SUMMARY ============
    {
      id: 'summary',
      icon: '<i class="fas fa-star"></i>',
      title: { es: 'Resumen y Hadith Final', ar: 'الخلاصة والحديث الختامي', en: 'Summary & Final Hadith' },
      mascotIntro: {
        es: '¡Has llegado al final! Repasa y recibe tu certificado.',
        ar: 'وصلتَ إلى النهاية! راجع واستلم شهادتك.',
        en: 'You\'ve reached the end! Review and claim your certificate.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'El Hadith del Profeta ﷺ', ar: 'حديث النبي ﷺ', en: 'The Hadith of the Prophet ﷺ' },
          content: {
            es: 'صَلُّوا كَمَا رَأَيْتُمُونِي أُصَلِّي\n\n📖 "Rezad como me habéis visto rezar."\n\nEste hadith establece el principio: imitar al Profeta ﷺ en todos los detalles de la Salah. Cada gesto, cada palabra, cada postura debe seguir su Sunnah.\n\n🌟 La Salah es el pilar de la religión.',
            ar: 'صَلُّوا كَمَا رَأَيْتُمُونِي أُصَلِّي\n\n📖 يقرّر هذا الحديث المبدأ: الاقتداء بالنبي ﷺ في كلّ تفاصيل الصلاة.\n\n🌟 الصلاة عمود الدين.',
            en: '"Pray as you have seen me pray."\n\n📖 This hadith establishes the principle: emulate the Prophet ﷺ in every detail of the Salah.\n\n🌟 Salah is the pillar of the religion.',
          },
          source: 'Sahih al-Bukhari 631',
        },
        {
          type: 'card',
          title: { es: 'Recordatorio sobre Khushu', ar: 'تذكير حول الخشوع', en: 'A Reminder on Khushu' },
          content: {
            es: '🧘 **Khushu** (humildad y presencia) es el alma de la Salah.\n\n• Ora con tranquilidad (Tuma\'nina), no a la prisa.\n• Comprende lo que recitas.\n• Imagina que Allah te observa.\n• Aleja distracciones del corazón.\n\n📖 El Profeta ﷺ: "Cuando uno reza, está hablando en privado con su Señor." (Bukhari 405)',
            ar: '🧘 **الخشوع** هو روح الصلاة.\n\n• صلّ بطمأنينة لا بسرعة.\n• افهم ما تقرأ.\n• تخيّل أن الله يراك.\n• ابعد الشواغل عن قلبك.\n\n📖 قال النبي ﷺ: "إن أحدكم إذا صلّى يناجي ربه." (البخاري)',
            en: '🧘 **Khushu** (humility and presence) is the soul of Salah.\n\n• Pray with Tuma\'nina, not in haste.\n• Understand what you recite.\n• Imagine that Allah is watching.\n• Keep distractions out of your heart.\n\n📖 The Prophet ﷺ: "When one prays, he converses privately with his Lord." (Bukhari 405)',
          },
          source: 'Sahih al-Bukhari 405',
        },
        {
          type: 'quiz',
          question: {
            es: '¿Qué dijo el Profeta ﷺ sobre cómo rezar?',
            ar: 'ماذا قال النبي ﷺ عن كيفية الصلاة؟',
            en: 'What did the Prophet ﷺ say about how to pray?',
          },
          options: [
            { es: 'Rezad como queráis', ar: 'صلّوا كما شئتم', en: 'Pray as you wish' },
            { es: 'Rezad como me habéis visto rezar', ar: 'صلّوا كما رأيتموني أُصلّي', en: 'Pray as you have seen me pray' },
            { es: 'Rezad rápido', ar: 'صلّوا بسرعة', en: 'Pray fast' },
          ],
          correct: 1,
          feedback: {
            es: '"Rezad como me habéis visto rezar" (Sahih al-Bukhari 631).',
            ar: '"صلّوا كما رأيتموني أُصلّي" (البخاري 631).',
            en: '"Pray as you have seen me pray" (Sahih al-Bukhari 631).',
          },
        },
        // ── v20: Final review questions ──────────────────────────
        {
          type: 'quiz',
          question: {
            es: '¿Cuántas Rakahs tiene la oración de Maghrib?',
            ar: 'كم عدد ركعات صلاة المغرب؟',
            en: 'How many Rakahs does Maghrib have?',
          },
          options: ['2', '3', '4', '5'],
          correct: 1,
          feedback: {
            es: '3 Rakahs. Es la única oración obligatoria con número IMPAR.',
            ar: 'ثلاث ركعات. الوحيدة الفريضة ذات العدد الفردي.',
            en: '3 Rakahs. The only obligatory prayer with an ODD number.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Cuál es la primera cosa por la que se juzgará al siervo el Día del Juicio?',
            ar: 'ما أوّل ما يُحاسب عليه العبد يوم القيامة؟',
            en: 'What is the first thing a servant will be judged on on the Day of Judgment?',
          },
          options: [
            { es: 'El zakat', ar: 'الزكاة', en: 'Zakat' },
            { es: 'La Salah', ar: 'الصلاة', en: 'The Salah' },
            { es: 'El ayuno', ar: 'الصيام', en: 'Fasting' },
            { es: 'La Shahada', ar: 'الشهادة', en: 'The Shahada' },
          ],
          correct: 1,
          feedback: {
            es: '📖 «Lo primero por lo que se juzgará al siervo el Día del Juicio es la Salah. Si es aceptada, el resto es aceptado; si es rechazada, el resto es rechazado.» (Tirmidhi 413, sahih)',
            ar: '«أوّل ما يُحاسب به العبد يوم القيامة الصلاة، فإن صلحت صلح سائر عمله، وإن فسدت فسد سائر عمله.» (الترمذي 413، صحيح)',
            en: '📖 «The first thing a servant is judged on on the Day of Judgment is the Salah. If accepted, the rest is accepted; if rejected, the rest is rejected.» (Tirmidhi 413, ṣaḥīḥ)',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿Qué significa Khushu\' en la Salah?',
            ar: 'ما معنى الخشوع في الصلاة؟',
            en: 'What does Khushu\' mean in Salah?',
          },
          options: [
            { es: 'Rezar en árabe perfecto', ar: 'الصلاة بعربية فصيحة', en: 'Praying in perfect Arabic' },
            { es: 'Humildad, tranquilidad, y presencia del corazón', ar: 'الخضوع والطمأنينة وحضور القلب', en: 'Humility, calm, and presence of the heart' },
            { es: 'Rezar en voz muy baja', ar: 'الصلاة بصوت خافت جدّاً', en: 'Praying very quietly' },
            { es: 'Cerrar los ojos', ar: 'إغماض العينين', en: 'Closing the eyes' },
          ],
          correct: 1,
          feedback: {
            es: 'Khushu\' es la ESENCIA de la Salah. Sin ella, la oración es como un cuerpo sin alma.',
            ar: 'الخشوع روح الصلاة. الصلاة بلا خشوع كالجسد بلا روح.',
            en: 'Khushu\' is the ESSENCE of Salah. Without it, prayer is like a body without soul.',
          },
        },
        {
          type: 'quiz',
          question: {
            es: '¿En qué posición está uno MÁS CERCA de Allah?',
            ar: 'في أيّ وضع يكون العبد أقرب إلى الله؟',
            en: 'In which position is one CLOSEST to Allah?',
          },
          options: [
            { es: 'En el Qiyam (de pie)', ar: 'في القيام', en: 'In Qiyam (standing)' },
            { es: 'En el Ruku (inclinación)', ar: 'في الركوع', en: 'In Ruku (bowing)' },
            { es: 'En el Sujud (postración)', ar: 'في السجود', en: 'In Sujud (prostration)' },
            { es: 'En el Tashahhud', ar: 'في التشهد', en: 'In Tashahhud' },
          ],
          correct: 2,
          feedback: {
            es: '📖 «El siervo está más cerca de su Señor cuando está postrado. Multiplicad las súplicas [en Sujud].» (Muslim 482)',
            ar: '«أقرب ما يكون العبد من ربّه وهو ساجد، فأكثروا الدعاء.» (مسلم 482)',
            en: '📖 «The servant is closest to his Lord when he is prostrating. So multiply supplications [in Sujud].» (Muslim 482)',
          },
        },
      ],
    },
  ],
};

if (typeof window !== 'undefined') window.COURSE_SALAH_COMPLETE = COURSE_SALAH_COMPLETE;
