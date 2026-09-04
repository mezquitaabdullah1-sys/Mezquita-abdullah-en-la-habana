/**
 * 💧 Curso completo de Wudu (Ablución) — Quba v12
 *
 * Basado en:
 * - Sahih Al-Bukhari 159, 164 (descripción de Uthman ibn Affan رضي الله عنه)
 * - Sahih Muslim 226
 * - Sunan Abu Dawud 106
 * - Al-Ma'idah 5:6 (versículo del wudu)
 *
 * @theological_review PENDIENTE — Revisar por imám antes de producción.
 */

const COURSE_WUDU_COMPLETE = {
  id: 'wudu_complete',
  slug: 'wudu-complete',
  title: {
    es: 'La Ablución (Wudu) paso a paso',
    ar: 'الوضوء خطوة بخطوة',
    en: 'Ablution (Wudu) step by step',
  },
  description: {
    es: 'Aprende la ablución correcta: pasos en orden, condiciones, errores comunes y cuándo se requiere.',
    ar: 'تعلّم الوضوء الصحيح: الخطوات بالترتيب، الشروط، الأخطاء الشائعة، وأوقات الوجوب.',
    en: 'Learn correct ablution: ordered steps, conditions, common mistakes and when it is required.',
  },
  icon: '<i class="fas fa-droplet"></i>',
  color: '#42A5F5',
  ageGroup: 'all',
  durationMin: 20,
  difficulty: 'beginner',
  stations: [
    // ============ STATION 1: General info & when required ============
    {
      id: 'wudu_intro',
      title: { es: 'Información general', ar: 'معلومات عامة', en: 'General information' },
      icon: '<i class="fas fa-book-open-reader"></i>',
      mascotIntro: {
      es: '¡Hola! Hoy aprenderemos todo sobre el Wudu, la purificación que precede a la oración. ¡Empecemos!',
      ar: 'أهلاً بك! اليوم سنتعلم كل شيء عن الوضوء، الطهارة التي تسبق الصلاة. لنبدأ!',
      en: 'Hello! Today we will learn all about Wudu, the purification that precedes prayer. Let\'s start!',
      },

      lessons: [
        {
          type: 'card',
          title: { es: '¿Qué es el Wudu?', ar: 'ما هو الوضوء؟', en: 'What is Wudu?' },
          content_es: 'El wudu (وضوء) es la ablución menor, la purificación ritual con agua que precede a la oración, al tawaf y a la recitación del Corán en su mushaf.\n\nAllah dice en el Corán:\n\n"¡Oh creyentes! Cuando os dispongáis a hacer la oración, lavaos la cara y las manos hasta los codos, pasaos las manos por la cabeza y lavaos los pies hasta los tobillos."\n\n(Al-Ma\'ida 5:6)',
          content_ar: 'الوضوء هو الطهارة الصغرى، طهارة شرعية بالماء تسبق الصلاة والطواف ومسّ المصحف.\n\nقال الله تعالى:\n\n{يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ}\n\n(المائدة 5:6)',
          content_en: 'Wudu (وضوء) is the minor ablution, ritual purification with water performed before prayer, tawaf, and touching the Qur\'an.\n\nAllah says in the Qur\'an:\n\n"O you who believe! When you rise up for prayer, wash your faces and your hands up to the elbows, wipe your heads and wash your feet up to the ankles."\n\n(Al-Ma\'idah 5:6)',
        },
        {
          type: 'card',
          title: { es: '¿Cuándo se requiere el Wudu?', ar: 'متى يجب الوضوء؟', en: 'When is Wudu required?' },
          content_es: 'El wudu es obligatorio para:\n\n• 🕌 Realizar la oración (obligatoria o voluntaria)\n• 🕋 Hacer el tawaf alrededor de la Kaaba\n• 📖 Tocar el mushaf del Corán directamente\n\nEs recomendado (mustahabb) para:\n\n• Antes de dormir\n• Al leer el Corán de memoria\n• Antes del dhikr\n• Al entrar a la mezquita\n• Después de cargar un difunto\n• Al enfadarse (calma la ira)\n• Después de comer carne de camello',
          content_ar: 'يجب الوضوء لـ:\n\n• 🕌 الصلاة (الفريضة والنافلة)\n• 🕋 الطواف بالكعبة\n• 📖 مسّ المصحف\n\nويُستحبّ لـ:\n\n• قبل النوم\n• عند قراءة القرآن حفظًا\n• قبل الذكر\n• عند دخول المسجد\n• بعد حمل الميت\n• عند الغضب\n• بعد أكل لحم الإبل',
          content_en: 'Wudu is obligatory for:\n\n• 🕌 Performing prayer (obligatory or voluntary)\n• 🕋 Tawaf around the Kaaba\n• 📖 Directly touching the Qur\'an mushaf\n\nIt is recommended (mustahabb) for:\n\n• Before sleeping\n• Reciting Qur\'an from memory\n• Before dhikr\n• Entering the mosque\n• After carrying a deceased person\n• When angry (calms anger)\n• After eating camel meat',
        },
        {
          type: 'card',
          title: { es: 'Condiciones (شروط) del Wudu', ar: 'شروط الوضوء', en: 'Conditions of Wudu' },
          content_es: 'Para que el wudu sea válido, deben cumplirse:\n\n1. Islam · Ser musulmán\n2. Discernimiento (تمييز) · Edad de razón\n3. Intención (نية) · En el corazón, no en voz alta\n4. Agua pura (طهور) · No contaminada\n5. Agua permitida · No robada ni prohibida\n6. Eliminar todo lo que impida el agua llegar a la piel (esmalte de uñas, cera espesa, etc.)\n7. Haber finalizado lo que anula el wudu (istinjá si se necesita)',
          content_ar: 'يشترط لصحة الوضوء:\n\n١. الإسلام\n٢. التمييز (بلوغ سن العقل)\n٣. النية في القلب\n٤. الماء الطهور\n٥. الماء المباح (غير مغصوب)\n٦. إزالة ما يمنع وصول الماء إلى البشرة (طلاء الأظافر، الشمع الكثيف...)\n٧. الاستنجاء أو الاستجمار قبله إن احتيج',
          content_en: 'For wudu to be valid:\n\n1. Islam · Being Muslim\n2. Discernment (tamyiz) · Age of reason\n3. Intention (niyyah) · In the heart, not verbally\n4. Pure water (tahur) · Uncontaminated\n5. Permitted water · Not stolen or forbidden\n6. Remove anything blocking water from reaching skin (nail polish, thick wax...)\n7. Complete istinja before if needed',
        },
      ],
    },

    // ============ STATION 2: The 12 steps ============
    {
      id: 'wudu_steps',
      title: { es: 'Los 12 pasos en orden', ar: 'الخطوات الاثنتا عشرة بالترتيب', en: 'The 12 steps in order' },
      icon: '<i class="fas fa-droplet"></i>',
      mascotIntro: {
      es: '¡Ahora lo importante! Te mostraré los 12 pasos del Wudu, uno por uno, con imágenes.',
      ar: 'الآن المهم! سأريك خطوات الوضوء الاثنتي عشرة، واحدة تلو الأخرى، بالصور.',
      en: 'Now the important part! I will show you the 12 steps of Wudu, one by one, with images.',
      },

      lessons: [
        {
          type: 'wudu_step',
          number: 1,
          image: 'niyyah',
          title: { es: 'La intención (النية)', ar: 'النية', en: 'The intention' },
          description: { es: 'La intención se hace en el corazón antes de comenzar. No se pronuncia en voz alta. Se decide interiormente que se realiza el wudu para purificarse y adorar a Allah.', ar: 'تكون النية بالقلب قبل البدء ولا تُلفظ باللسان. يعقد قلبه على أداء الوضوء رفعًا للحدث وطاعةً لله.', en: 'The intention is made in the heart before beginning. It is not spoken aloud. Inwardly, one intends to perform wudu to purify oneself and worship Allah.' },
          dhikr: null,
          hadith: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ (Sahih Al-Bukhari 1)',
          hadith_translation_es: 'Ciertamente las obras son según las intenciones.',
          hadith_translation_en: 'Actions are only by intentions.',
          hadith_translation_ar: 'إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى.'
        },
        {
          type: 'wudu_step',
          number: 2,
          image: 'bismillah',
          title: { es: 'Bismillah (التسمية)', ar: 'التسمية', en: 'Saying Bismillah' },
          description: { es: 'Se dice "Bismillah" antes de comenzar a lavar. Es sunnah muy enfatizada.', ar: 'يقول: "بسم الله" قبل الشروع في الغسل. وهي سنة مؤكدة.', en: 'Say "Bismillah" before starting to wash. It is a highly emphasized sunnah.' },
          dhikr: 'بِسْمِ اللَّهِ',
          dhikr_translit: 'Bismillah',
          dhikr_meaning_es: 'En el nombre de Allah',
          dhikr_meaning_en: 'In the name of Allah',
          hadith: 'لَا وُضُوءَ لِمَنْ لَمْ يَذْكُرِ اسْمَ اللَّهِ عَلَيْهِ (Ibn Majah 399, sahih)',
          hadith_translation_es: 'No hay wudu para quien no menciona el nombre de Allah sobre él.',
          hadith_translation_en: 'There is no wudu for the one who does not mention the name of Allah over it.',
          hadith_translation_ar: 'لا وضوءَ لمن لم يذكرِ اسمَ اللهِ عليه — فالتسميةُ سنةٌ مؤكدةٌ عند الشروع في الوضوء.'
        },
        {
          type: 'wudu_step',
          number: 3,
          image: 'wash_hands',
          title: { es: 'Lavar las manos ×3', ar: 'غسل الكفين ثلاثًا', en: 'Wash hands 3 times' },
          description: { es: 'Lava ambas manos hasta las muñecas, tres veces, empezando por la derecha. Frota entre los dedos.', ar: 'يغسل يديه إلى الكوعين ثلاث مرات، بدءًا باليمنى، ويخلل بين الأصابع.', en: 'Wash both hands up to the wrists, three times, starting with the right. Rub between the fingers.' },
          hadith: 'Sahih Al-Bukhari 159',
        },
        {
          type: 'wudu_step',
          number: 4,
          image: 'madmadah',
          title: { es: 'Enjuagar la boca (المضمضة)', ar: 'المضمضة', en: 'Rinse the mouth' },
          description: { es: 'Toma agua con la mano derecha, enjuaga la boca moviendo el agua dentro, luego escúpela. Repite 3 veces.', ar: 'يأخذ الماء بيده اليمنى، ويُدير الماء في فمه ثم يمجّه. يكرر ثلاثًا.', en: 'Take water with the right hand, swish it inside the mouth, then spit it out. Repeat 3 times.' },
          hadith: 'Sahih Al-Bukhari 164',
        },
        {
          type: 'wudu_step',
          number: 5,
          image: 'istinshaq',
          title: { es: 'Sorber agua por la nariz (الاستنشاق)', ar: 'الاستنشاق والاستنثار', en: 'Sniff water into nose' },
          description: { es: 'Con la mano derecha, sorbe agua por la nariz. Luego, con la izquierda, expúlsala (istinthar). Repite 3 veces.\n\nSi no estás ayunando, se recomienda sorber profundamente.', ar: 'يستنشق الماء بيده اليمنى في أنفه، ثم يستنثره بيده اليسرى. يكرر ثلاثًا.\n\nإذا لم يكن صائمًا، يبالغ في الاستنشاق.', en: 'With the right hand, sniff water into the nose. Then with the left, blow it out (istinthar). Repeat 3 times.\n\nIf not fasting, sniff deeply.' },
          hadith: 'وَبَالِغْ فِي الاِسْتِنْشَاقِ إِلاَّ أَنْ تَكُونَ صَائِمًا (Abu Dawud 142)',
          hadith_translation_es: 'Y exagera al sorber agua por la nariz, salvo si estás ayunando.',
          hadith_translation_en: 'And exaggerate in sniffing water into the nose unless you are fasting.',
          hadith_translation_ar: 'وبالِغْ في الاستنشاقِ إلا أن تكونَ صائمًا — أي أَوصِلِ الماءَ إلى أعلى الأنفِ إن لم تكن صائمًا.'
        },
        {
          type: 'wudu_step',
          number: 6,
          image: 'wash_face',
          title: { es: 'Lavar la cara ×3 (غسل الوجه)', ar: 'غسل الوجه ثلاثًا', en: 'Wash the face 3 times' },
          description: { es: 'Lava toda la cara con ambas manos, de la frente al mentón, y de oreja a oreja. Frota la barba (si es densa, pásale los dedos húmedos). Repite 3 veces.', ar: 'يغسل وجهه ثلاثًا: من منابت الشعر إلى الذقن، ومن الأذن إلى الأذن. ويخلل لحيته الكثيفة.', en: 'Wash the entire face with both hands, from forehead to chin, ear to ear. Rub the beard (if thick, run wet fingers through it). Repeat 3 times.' },
          hadith: 'Al-Ma\'idah 5:6 · Sahih Al-Bukhari 159',
        },
        {
          type: 'wudu_step',
          number: 7,
          image: 'right_arm',
          title: { es: 'Lavar el brazo derecho ×3', ar: 'غسل اليد اليمنى إلى المرفق ثلاثًا', en: 'Wash right arm 3 times' },
          description: { es: 'Lava el brazo derecho hasta y **incluyendo** el codo, tres veces. Frota bien, asegurándote de que el agua llega a toda la piel.', ar: 'يغسل يده اليمنى إلى المرفق (ويدخل المرفق في الغسل) ثلاث مرات، ويعرك ويتأكد من وصول الماء لكل جزء.', en: 'Wash the right arm up to **and including** the elbow, three times. Rub well, ensuring water reaches all skin.' },
          hadith: 'Sahih Muslim 246',
        },
        {
          type: 'wudu_step',
          number: 8,
          image: 'left_arm',
          title: { es: 'Lavar el brazo izquierdo ×3', ar: 'غسل اليد اليسرى إلى المرفق ثلاثًا', en: 'Wash left arm 3 times' },
          description: { es: 'Después del derecho, lava el brazo izquierdo del mismo modo hasta el codo, tres veces.', ar: 'يغسل يده اليسرى إلى المرفق ثلاث مرات كما فعل باليمنى.', en: 'After the right, wash the left arm the same way up to the elbow, three times.' },
          hadith: 'Sahih Muslim 246',
        },
        {
          type: 'wudu_step',
          number: 9,
          image: 'mas_h_head',
          title: { es: 'Pasar las manos por la cabeza (مسح الرأس)', ar: 'مسح الرأس', en: 'Wipe the head' },
          description: { es: 'Con las manos mojadas (agua nueva, no la que sobró), pasa las manos desde el frente del cabello hasta la nuca y regrésalas al frente. **Una sola vez.**', ar: 'يمسح رأسه بيديه المبتلّتين مرة واحدة: يبدأ من مقدّم رأسه إلى قفاه ثم يردّهما إلى المقدّم.', en: 'With wet hands (fresh water, not leftover), wipe from the front of the hair to the nape, then return to the front. **Only once.**' },
          hadith: 'Sahih Al-Bukhari 185',
        },
        {
          type: 'wudu_step',
          number: 10,
          image: 'mas_h_ears',
          title: { es: 'Limpiar las orejas (مسح الأذنين)', ar: 'مسح الأذنين', en: 'Wipe the ears' },
          description: { es: 'Inmediatamente después del mas-h de la cabeza (**con la misma agua**), introduce los índices en los oídos y pasa los pulgares por la parte exterior de las orejas.', ar: 'يمسح أذنيه بعد الرأس مباشرة بنفس ماء الرأس: يُدخل السبّابتين في الأذنين، ويمسح الإبهامين على ظاهر الأذنين.', en: 'Right after wiping the head (**with the same water**), insert index fingers into the ears and wipe the outer ears with the thumbs.' },
          hadith: 'الأُذُنَانِ مِنَ الرَّأْسِ (Abu Dawud 134)',
          hadith_translation_es: 'Las orejas forman parte de la cabeza.',
          hadith_translation_en: 'The ears are part of the head.',
          hadith_translation_ar: 'الأذنانِ من الرأسِ — تُمسحانِ معه بماءِ الرأسِ نفسِه، لا بماءٍ جديد.'
        },
        {
          type: 'wudu_step',
          number: 11,
          image: 'right_foot',
          title: { es: 'Lavar el pie derecho ×3', ar: 'غسل القدم اليمنى إلى الكعبين ثلاثًا', en: 'Wash right foot 3 times' },
          description: { es: 'Lava el pie derecho hasta y **incluyendo** el tobillo. Frota entre los dedos (con el meñique de la izquierda, por ejemplo). Tres veces.', ar: 'يغسل قدمه اليمنى إلى الكعبين (ويدخل الكعبان)، ويخلل بين أصابعه، ثلاث مرات.', en: 'Wash the right foot up to **and including** the ankle. Rub between the toes (using the left pinky, for example). Three times.' },
          hadith: 'Sahih Muslim 246',
        },
        {
          type: 'wudu_step',
          number: 12,
          image: 'left_foot',
          title: { es: 'Lavar el pie izquierdo ×3', ar: 'غسل القدم اليسرى إلى الكعبين ثلاثًا', en: 'Wash left foot 3 times' },
          description: { es: 'Finalmente, lava el pie izquierdo del mismo modo hasta el tobillo, tres veces.', ar: 'وأخيرًا يغسل قدمه اليسرى إلى الكعبين ثلاث مرات كما فعل باليمنى.', en: 'Finally, wash the left foot the same way up to the ankle, three times.' },
          hadith: 'Sahih Muslim 246',
        },
      ],
    },

    // ============ STATION 3: Du'a after wudu ============
    {
      id: 'wudu_dua',
      title: { es: 'Du\'a después del Wudu', ar: 'الدعاء بعد الوضوء', en: 'Du\'a after Wudu' },
      icon: '<i class="fas fa-hands-praying"></i>',
      mascotIntro: {
      es: 'Al terminar el Wudu, hay súplicas especiales que elevan tu purificación. ¡Aprendámoslas!',
      ar: 'عند الانتهاء من الوضوء، هناك أدعية خاصة ترفع طهارتك. لنتعلمها!',
      en: 'When finishing Wudu, there are special supplications that elevate your purification. Let\'s learn them!',
      },

      lessons: [
        {
          type: 'card',
          title: { es: 'Du\'a al terminar', ar: 'الدعاء عند الانتهاء', en: 'Du\'a upon finishing' },
          content_es: 'Al terminar el wudu, mira hacia el cielo y di:\n\nأَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ\n\n"Ashhadu an la ilaha illallahu wahdahu la sharika lahu, wa ashhadu anna Muhammadan ‘abduhu wa rasuluhu"\n\n"Atestiguo que no hay divinidad excepto Allah, Único, sin asociados, y atestiguo que Muhammad es Su siervo y Su Mensajero."\n\n**Virtud:** Se le abrirán las 8 puertas del Paraíso para que entre por la que quiera. (Sahih Muslim 234)',
          content_ar: 'إذا انتهى من الوضوء يرفع بصره إلى السماء ويقول:\n\n"أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ"\n\n**الفضل:** فُتحت له أبواب الجنة الثمانية يدخل من أيها شاء. (صحيح مسلم ٢٣٤)',
          content_en: 'Upon finishing wudu, look up to the sky and say:\n\n"Ashhadu an la ilaha illallahu wahdahu la sharika lahu, wa ashhadu anna Muhammadan ‘abduhu wa rasuluhu"\n\n"I testify that none has the right to be worshipped except Allah, alone with no partners, and I testify that Muhammad is His servant and Messenger."\n\n**Virtue:** The 8 gates of Paradise will be opened for him to enter through whichever he wishes. (Sahih Muslim 234)',
        },
        {
          type: 'card',
          title: { es: 'Du\'a adicional (recomendada)', ar: 'دعاء آخر مستحب', en: 'Additional (recommended) du\'a' },
          content_es: 'También se puede añadir:\n\nاللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ\n\n"Allahumma ij‘alni min at-tawwabin wa ij‘alni min al-mutatahhirin"\n\n"Oh Allah, hazme de los que se arrepienten y hazme de los que se purifican."\n\n(At-Tirmidhi 55)',
          content_ar: 'ويستحب أن يزيد:\n\n"اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ، وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ"\n\n(الترمذي ٥٥)',
          content_en: 'One may also add:\n\n"Allahumma ij‘alni min at-tawwabin wa ij‘alni min al-mutatahhirin"\n\n"O Allah, make me among those who repent and make me among those who purify themselves."\n\n(At-Tirmidhi 55)',
        },
        // ── v20: Extra du'a & virtue ────────────────────────────
        {
          type: 'card',
          title: { es: 'La virtud de las gotas del wudu', ar: 'فضل قطرات الوضوء', en: 'The virtue of wudu drops' },
          content_es: '💧 El Profeta ﷺ dijo:\n\n«Cuando un musulmán se lava el rostro en el wudu, salen de su cara todas las faltas que cometió con la mirada, junto con el agua o con la última gota. Cuando se lava las manos, salen con el agua todas las faltas que cometió con ellas. Cuando se lava los pies, salen con el agua todas las faltas hacia las que caminaron. Hasta que sale limpio de pecados.»\n\n(Sahih Muslim 244)\n\n💫 Cada gota que cae es un pecado que se va. ¡Alhamdulillah!',
          content_ar: '💧 قال النبي ﷺ:\n\n«إذا توضّأ العبد المسلم فغسل وجهه خرجت من وجهه كلّ خطيئة نظر إليها بعينيه مع الماء أو مع آخر قطر الماء، فإذا غسل يديه خرج من يديه كلّ خطيئة كان بطشتهما يداه مع الماء، فإذا غسل رجليه خرجت كلّ خطيئة مشتها رجلاه مع الماء، حتّى يخرج نقيّاً من الذنوب.»\n\n(مسلم 244)\n\n💫 كلّ قطرة تسقط ذنب يخرج. الحمد لله!',
          content_en: '💧 The Prophet ﷺ said:\n\n«When a Muslim washes his face in wudu, every sin his eyes committed departs with the water or the last drop. When he washes his hands, every sin they committed departs with the water. When he washes his feet, every sin they walked toward departs. Until he emerges cleansed of sins.»\n\n(Sahih Muslim 244)\n\n💫 Every drop that falls is a sin that leaves. Alhamdulillah!',
        },
        {
          type: 'quiz',
          question_es: '¿Hacia dónde se mira al decir la du\'a después del wudu?',
          question_ar: 'إلى أين يُنظر عند قول الدعاء بعد الوضوء؟',
          question_en: 'Where does one look when saying the du\'a after wudu?',
          options_es: ['Al suelo', 'Al cielo', 'A la Ka\'aba', 'Con ojos cerrados'],
          options_ar: ['إلى الأرض', 'إلى السماء', 'إلى الكعبة', 'مغمض العينين'],
          options_en: ['At the floor', 'At the sky', 'At the Ka\'aba', 'With closed eyes'],
          correct: 1,
          explanation_es: 'El Profeta ﷺ levantaba la vista al cielo al decir la Shahada después del wudu (Muslim 234).',
          explanation_en: 'The Prophet ﷺ raised his gaze to the sky when saying the Shahada after wudu (Muslim 234).',
        },
        {
          type: 'quiz',
          question_es: '¿Qué se abre a quien completa el wudu y dice la Shahada?',
          question_ar: 'ما الذي يُفتح لمن أتمّ الوضوء وقال الشهادة؟',
          question_en: 'What is opened for one who completes wudu and says the Shahada?',
          options_es: ['Una puerta del Paraíso', 'Las 8 puertas del Paraíso', 'La puerta del arrepentimiento', 'La puerta de la Ka\'aba'],
          options_ar: ['باب واحد من الجنّة', 'أبواب الجنّة الثمانية', 'باب التوبة', 'باب الكعبة'],
          options_en: ['One gate of Paradise', 'The 8 gates of Paradise', 'The gate of repentance', 'The gate of the Ka\'aba'],
          correct: 1,
          explanation_es: 'Las 8 puertas del Paraíso se abren para que entre por la que quiera (Muslim 234).',
          explanation_en: 'The 8 gates of Paradise open so he may enter through any (Muslim 234).',
        },
      ],
    },

    // ============ STATION 4: What breaks wudu ============
    {
      id: 'wudu_nullifiers',
      title: { es: 'Lo que anula el Wudu', ar: 'نواقض الوضوء', en: 'What breaks Wudu' },
      icon: '<i class="fas fa-triangle-exclamation"></i>',
      mascotIntro: {
      es: 'Es muy importante saber qué anula el Wudu para no orar sin estar puro. ¡Presta atención!',
      ar: 'من المهم جدًا معرفة ما ينقض الوضوء حتى لا تصلي وأنت غير طاهر. انتبه جيدًا!',
      en: 'It is very important to know what nullifies Wudu so you don\'t pray without being pure. Pay attention!',
      },

      lessons: [
        {
          type: 'card',
          title: { es: 'Nawaqid (نواقض) — Anuladores', ar: 'نواقض الوضوء', en: 'Nullifiers of wudu' },
          content_es: '1. **Todo lo que sale por las dos vías** (orina, heces, gases, madhi, wadi).\n\n2. **Sueño profundo** que hace perder la consciencia.\n\n3. **Pérdida del intelecto** por locura, desmayo, embriaguez.\n\n4. **Tocar los órganos genitales** directamente sin barrera.\n\n5. **Comer carne de camello.**\n\n6. **Salida de sangre, pus o vómito abundante** (según algunos madhhabs).\n\n7. **Apostasía** (que Allah nos proteja).\n\n8. **Todo lo que obliga al ghusl** (relaciones íntimas, eyaculación, menstruación, nifás).',
          content_ar: '١. الخارج من السبيلين (بول، غائط، ريح، مذي، ودي).\n\n٢. النوم الثقيل الذي يذهب معه الشعور.\n\n٣. زوال العقل بجنون أو إغماء أو سُكْر.\n\n٤. مسّ الفرج بيده مباشرة بلا حائل.\n\n٥. أكل لحم الإبل.\n\n٦. خروج الدم أو القيح أو القيء الكثير (على خلاف بين المذاهب).\n\n٧. الردة (نعوذ بالله).\n\n٨. كل ما يوجب الغسل (جماع، إنزال، حيض، نفاس).',
          content_en: '1. **Anything exiting from the two paths** (urine, feces, gas, madhi, wadi).\n\n2. **Deep sleep** where consciousness is lost.\n\n3. **Loss of intellect** through madness, fainting, intoxication.\n\n4. **Touching the private parts** directly without a barrier.\n\n5. **Eating camel meat.**\n\n6. **Bleeding, pus, or abundant vomiting** (per some madhhabs).\n\n7. **Apostasy** (may Allah protect us).\n\n8. **Anything requiring ghusl** (intimate relations, ejaculation, menstruation, nifas).',
        },
        // ── v20: what does NOT nullify + camel-meat + duration ───
        {
          type: 'card',
          title: { es: 'Lo que NO anula el wudu', ar: 'ما لا ينقض الوضوء', en: 'What does NOT nullify wudu' },
          content_es: 'Es importante saber lo que NO rompe el wudu (contrario a creencias populares):\n\n✅ Comer o beber (excepto carne de camello).\n✅ Tocar a una mujer sin deseo (según la mayoría).\n✅ Sangrar por herida pequeña (según Shafi\'i y Maliki).\n✅ Vomitar poco.\n✅ Reír en Salah — rompe la Salah pero NO el wudu (contra la escuela Hanafi).\n✅ Cortarse las uñas o el cabello.\n✅ Lavar a un difunto (según la mayoría).\n✅ Cambiar de ropa.\n✅ Dudar si se rompió el wudu — la certeza previa vale.\n\n📖 El Profeta ﷺ dijo: «Cuando uno de vosotros sienta algo en su vientre y dude si salió o no, que no salga de la mezquita hasta que oiga sonido o perciba olor.» (Muslim 361)',
          content_ar: 'من المهم معرفة ما لا ينقض الوضوء (خلافاً للاعتقادات الشائعة):\n\n✅ الأكل والشرب (ما عدا لحم الإبل).\n✅ مسّ المرأة بغير شهوة (على قول الجمهور).\n✅ خروج الدم من جرح قليل (عند الشافعية والمالكية).\n✅ القيء اليسير.\n✅ الضحك في الصلاة — يبطل الصلاة لكن لا ينقض الوضوء (خلافاً للحنفية).\n✅ قصّ الأظافر أو الشعر.\n✅ تغسيل الميّت (عند الجمهور).\n✅ تغيير الثوب.\n✅ الشكّ في نقض الوضوء — اليقين لا يزول بالشكّ.\n\n📖 قال ﷺ: «إذا وجد أحدكم في بطنه شيئاً فأشكل عليه أخرج منه شيء أم لا، فلا يخرجنّ من المسجد حتّى يسمع صوتاً أو يجد ريحاً.» (مسلم 361)',
          content_en: 'It is important to know what does NOT break wudu (contrary to popular beliefs):\n\n✅ Eating or drinking (except camel meat).\n✅ Touching a woman without desire (per the majority).\n✅ Bleeding from a small wound (per Shafi\'i and Maliki).\n✅ Little vomiting.\n✅ Laughing in Salah — breaks the Salah but NOT wudu (against Hanafi).\n✅ Cutting nails or hair.\n✅ Washing a deceased (per the majority).\n✅ Changing clothes.\n✅ Doubting if wudu was broken — previous certainty prevails.\n\n📖 The Prophet ﷺ said: «If one of you feels something in his stomach and doubts if something exited, he should not leave the mosque until he hears a sound or smells an odor.» (Muslim 361)',
        },
        {
          type: 'card',
          title: { es: '¿Por qué la carne de camello?', ar: 'لماذا لحم الإبل خاصّة؟', en: 'Why camel meat specifically?' },
          content_es: '🐫 ¿Por qué la carne de camello anula el wudu pero no la de vaca ni cordero?\n\nEs una regla ESPECÍFICA enseñada por el Profeta ﷺ. Un hombre le preguntó:\n\n— «¿Hacemos wudu por comer carne de cordero?»\n— «Si quieres, sí. Y si no quieres, no.»\n— «¿Hacemos wudu por comer carne de camello?»\n— «Sí, haced wudu por la carne de camello.»\n\n(Sahih Muslim 360)\n\n📖 No preguntamos el porqué — la Shari\'ah es sabiduría. Algunos ulemas sugieren que se debe a su naturaleza calorífica, pero es especulación.\n\n💡 Se aplica solo a la carne (لحم), no a la leche u otros derivados.',
          content_ar: '🐫 لماذا ينقض لحم الإبل دون لحم البقر والغنم؟\n\nهذا حكم خاصّ علّمه النبي ﷺ. سأله رجل:\n\n— «أنتوضّأ من لحوم الغنم؟»\n— «إن شئت. وإن شئت فلا.»\n— «أنتوضّأ من لحوم الإبل؟»\n— «نعم، فتوضّؤوا من لحوم الإبل.»\n\n(مسلم 360)\n\n📖 لا نسأل عن العلّة — الشرع حكمة تامّة. وقيل: لأنّ فيه قوّة وحرارة.\n\n💡 يختصّ باللحم دون مشتقّاته كالحليب.',
          content_en: '🐫 Why does camel meat break wudu but not cow or lamb?\n\nIt is a SPECIFIC ruling taught by the Prophet ﷺ. A man asked:\n\n— «Do we do wudu from lamb meat?»\n— «If you wish, yes. If not, no.»\n— «Do we do wudu from camel meat?»\n— «Yes, do wudu from camel meat.»\n\n(Sahih Muslim 360)\n\n📖 We do not question why — the Shari\'ah is complete wisdom.\n\n💡 Applies only to the meat, not milk or other derivatives.',
        },
        {
          type: 'card',
          title: { es: '¿Cuánto dura el wudu?', ar: 'كم يدوم الوضوء؟', en: 'How long does wudu last?' },
          content_es: '⏰ El wudu NO tiene tiempo límite. Dura hasta que ocurra un anulador.\n\n🔄 Puedes rezar TODAS las 5 oraciones con un solo wudu si no lo has roto.\n\n🌙 Recomendado: renovar el wudu para cada oración si es posible. El Profeta ﷺ dijo:\n\n«Quien haga wudu estando ya en wudu, se le escriben 10 buenas obras.» (Abu Dawud 62, hasan)\n\n💯 El wudu constante es una de las señales de la comunidad del Profeta ﷺ el Día del Juicio — reconocibles por sus manos, cara y pies luminosos.',
          content_ar: '⏰ لا موقّت للوضوء. يبقى حتّى يحدث ناقض.\n\n🔄 يمكنك أداء الصلوات الخمس بوضوء واحد إن لم ينتقض.\n\n🌙 يُستحبّ تجديده لكلّ صلاة إن أمكن. قال ﷺ:\n\n«من توضّأ على طُهر كتب الله له عشر حسنات.» (أبو داود 62، حسن)\n\n💯 الوضوء الدائم من علامات أمّة النبي ﷺ الغرّ المحجّلين يوم القيامة.',
          content_en: '⏰ Wudu has NO time limit. It lasts until a nullifier occurs.\n\n🔄 You can pray ALL 5 prayers with one wudu if unbroken.\n\n🌙 Recommended: renew wudu for each prayer if possible. The Prophet ﷺ said:\n\n«Whoever performs wudu upon wudu — 10 good deeds are recorded.» (Abu Dawud 62, hasan)\n\n💯 Constant wudu is a sign of the Prophet\'s ﷺ community on the Day of Judgment — recognizable by their luminous hands, faces, and feet.',
        },
      ],
    },

    // ============ STATION 5: Common mistakes ============
    {
      id: 'wudu_mistakes',
      title: { es: 'Errores comunes a evitar', ar: 'أخطاء شائعة', en: 'Common mistakes to avoid' },
      icon: '<i class="fas fa-circle-xmark"></i>',
      mascotIntro: {
      es: '¡Cuidado! Hay errores comunes que muchos cometen sin saber. Te los mostraré para que los evites.',
      ar: 'احذر! هناك أخطاء شائعة يرتكبها كثيرون دون علم. سأريك إياها لتتجنبها.',
      en: 'Be careful! There are common mistakes many make unknowingly. I\'ll show you so you can avoid them.',
      },

      lessons: [
        {
          type: 'card',
          title: { es: 'Los 10 errores más frecuentes', ar: 'أشهر عشرة أخطاء', en: 'The 10 most common mistakes' },
          content_es: '❌ **1. Pronunciar la niyyah en voz alta.** La intención es del corazón; decirla es una innovación.\n\n❌ **2. Desperdiciar agua.** El Profeta ﷺ hacía wudu con muy poca agua. Cerrar el grifo entre pasos.\n\n❌ **3. No lavar los codos y tobillos.** El límite se **incluye**, no se detiene antes.\n\n❌ **4. No frotar entre los dedos** de manos y pies. Es obligatorio asegurar que llegue el agua.\n\n❌ **5. Alterar el orden.** El orden es obligatorio: manos → boca → nariz → cara → brazos → cabeza → oídos → pies.\n\n❌ **6. Grandes pausas entre pasos** (muwalat). Deben hacerse seguidos, sin que se sequen los miembros.\n\n❌ **7. Pasar el mas-h por la cabeza más de una vez** o solo por una parte pequeña. Debe cubrir toda la cabeza, una sola vez.\n\n❌ **8. Frotar la cabeza como si se lavara con jabón.** Es **mas-h** (frotar suavemente), no ghasl (lavar).\n\n❌ **9. Esmalte de uñas o cera** que impide el agua. El wudu no es válido.\n\n❌ **10. No hacer istinja** después de ir al baño antes del wudu.',
          content_ar: '❌ ١. التلفّظ بالنية بصوت مسموع (بدعة).\n\n❌ ٢. الإسراف في الماء.\n\n❌ ٣. عدم إدخال المرفقين والكعبين في الغسل.\n\n❌ ٤. ترك تخليل الأصابع.\n\n❌ ٥. الإخلال بالترتيب.\n\n❌ ٦. الفصل الطويل بين الأعضاء (ترك الموالاة).\n\n❌ ٧. تكرار مسح الرأس أو الاقتصار على جزء يسير.\n\n❌ ٨. غسل الرأس بدل مسحها.\n\n❌ ٩. وجود طلاء أو شمع يمنع وصول الماء.\n\n❌ ١٠. ترك الاستنجاء قبله عند الحاجة.',
          content_en: '❌ **1. Saying niyyah aloud.** The intention is from the heart; voicing it is an innovation.\n\n❌ **2. Wasting water.** The Prophet ﷺ made wudu with very little water. Turn off the tap between steps.\n\n❌ **3. Not washing elbows and ankles.** The limit is **included**, not stopped before.\n\n❌ **4. Not rubbing between fingers and toes.** Ensuring water reaches is mandatory.\n\n❌ **5. Changing the order.** Order is mandatory: hands → mouth → nose → face → arms → head → ears → feet.\n\n❌ **6. Long pauses between steps** (muwalat). They must be continuous, without the limbs drying.\n\n❌ **7. Wiping the head more than once** or only a small part. It must cover the entire head, only once.\n\n❌ **8. Washing the head like with soap.** It is **mas-h** (gentle wiping), not ghasl (washing).\n\n❌ **9. Nail polish or wax** blocking water. Wudu is invalid.\n\n❌ **10. Not doing istinja** after using the toilet before wudu.',
        },
        // ── v20: Mas-h over socks + Tayammum ────────────────────
        {
          type: 'card',
          title: { es: 'El Mas-h sobre calcetines (مسح الخفّين)', ar: 'المسح على الخفّين', en: 'Wiping over socks (Mas-h al-Khuffain)' },
          content_es: '🧦 En vez de lavarlos, se pueden pasar las manos mojadas por encima de los calcetines/khuffs.\n\n**¿Cuándo permitido?**\n✅ Cuando los pusiste ESTANDO en estado de wudu.\n✅ Deben cubrir hasta el tobillo.\n✅ Deben estar limpios.\n\n**Duración:**\n• Residente: 1 día y 1 noche (24 horas) desde la primera vez que se rompe el wudu.\n• Viajero: 3 días y 3 noches (72 horas).\n\n**Cómo:**\nMoja tu mano derecha y pásala UNA vez por la parte SUPERIOR del calcetín derecho (dedos hacia tobillo). Igual para el izquierdo.\n\n❌ NO se pasa por debajo del pie.\n❌ NO válido si te los pusiste sin wudu.\n\n📖 «El Profeta ﷺ hizo wudu y pasó sobre sus khuffs.» (Bukhari 202, Muslim 274)',
          content_ar: '🧦 يمكن المسح على الجورب أو الخفّ بدل غسل الرجلين.\n\n**متى يجوز؟**\n✅ إذا لبسته على طهارة كاملة.\n✅ يستر محلّ الفرض (إلى الكعبين).\n✅ أن يكون طاهراً ومتيناً.\n\n**المدّة:**\n• المقيم: يوم وليلة (24 ساعة) من أوّل انتقاض للوضوء بعد لبسه.\n• المسافر: ثلاثة أيّام بلياليهنّ (72 ساعة).\n\n**الكيفية:**\nتبلّل يدك وتمسح على أعلى الخفّ مرّة واحدة من الأصابع إلى الساق. الحكم نفسه لليسرى.\n\n❌ لا يمسح أسفل الخفّ.\n❌ لا يجوز إن لبسته دون وضوء.\n\n📖 «أنّ النبي ﷺ توضّأ ومسح على خفّيه.» (البخاري 202، مسلم 274)',
          content_en: '🧦 Instead of washing, one can wipe wet hands over socks/khuffs.\n\n**When permitted?**\n✅ When put on WHILE in wudu.\n✅ Must cover to the ankle.\n✅ Must be clean.\n\n**Duration:**\n• Resident: 1 day 1 night (24h) from the first broken wudu.\n• Traveler: 3 days 3 nights (72h).\n\n**How:**\nWet right hand and wipe ONCE over the TOP of the right sock (toes to shin). Same for left.\n\n❌ Do NOT wipe under the sock.\n❌ NOT valid if put on without wudu.\n\n📖 «The Prophet ﷺ made wudu and wiped over his khuffs.» (Bukhari 202, Muslim 274)',
        },
        {
          type: 'card',
          title: { es: 'Tayammum — wudu con tierra', ar: 'التيمّم', en: 'Tayammum — dry ablution' },
          content_es: '🏜️ Cuando no hay agua o no puedes usarla, Allah te da una alternativa:\n\n**¿Cuándo?**\n❌ No hay agua disponible.\n🩺 Enfermo y el agua le daña.\n❄️ Frío extremo sin manera de calentar el agua.\n💧 Agua limitada, necesaria para beber.\n\n**¿Cómo?**\n1. Intención en el corazón.\n2. Di Bismillah.\n3. Golpea AMBAS manos suavemente sobre TIERRA LIMPIA.\n4. Sopla el exceso.\n5. Frota tu CARA con las palmas UNA vez.\n6. Frota tus MANOS hasta las muñecas: derecha con izquierda, luego izquierda con derecha.\n\n¡Eso es todo! El tayammum reemplaza wudu y ghusl.\n\n📖 «La tierra ha sido hecha para mí pura y lugar de oración.» (Bukhari 335)',
          content_ar: '🏜️ التيمّم بديل عن الوضوء والغسل عند فقد الماء أو العجز عنه.\n\n**متى يجوز؟**\n❌ فقدان الماء.\n🩺 مرض يتضرّر معه بالماء.\n❄️ برد شديد مع عدم إمكان التدفئة.\n💧 ماء قليل يحتاجه للشرب.\n\n**كيفيّته:**\n1. النيّة في القلب.\n2. التسمية: "بسم الله".\n3. يضرب بيديه على التراب الطاهر ضربة واحدة.\n4. ينفخ فيهما لتخفيف الغبار.\n5. يمسح وجهه مرّة واحدة.\n6. يمسح كفّيه إلى الرسغين، اليمنى باليسرى ثمّ العكس.\n\nيقوم مقام الوضوء والغسل.\n\n📖 «وجُعلت لي الأرض مسجداً وطهوراً.» (البخاري 335)',
          content_en: '🏜️ When no water is available or you cannot use it, Allah has given you an alternative:\n\n**When?**\n❌ No water available.\n🩺 Sick, water would harm.\n❄️ Extreme cold with no way to warm water.\n💧 Limited water needed for drinking.\n\n**How?**\n1. Intention in the heart.\n2. Say Bismillah.\n3. Strike BOTH hands gently on CLEAN EARTH.\n4. Blow off excess.\n5. Wipe your FACE with palms ONCE.\n6. Wipe your HANDS to the wrists: right with left, then left with right.\n\nThat is all! Tayammum replaces both wudu and ghusl.\n\n📖 «The earth has been made for me pure and a place of prayer.» (Bukhari 335)',
        },
      ],
    },

    // ============ STATION 6: Interactive Quiz ============
    {
      id: 'wudu_quiz',
      title: { es: 'Evaluación', ar: 'اختبار', en: 'Quiz' },
      icon: '<i class="fas fa-brain"></i>',
      mascotIntro: {
      es: '¡Hora de poner a prueba lo que aprendiste! Responde estas preguntas sobre el Wudu. ¡Tú puedes!',
      ar: 'حان وقت اختبار ما تعلمته! أجب على هذه الأسئلة عن الوضوء. يمكنك فعلها!',
      en: 'Time to test what you learned! Answer these questions about Wudu. You can do it!',
      },

      lessons: [
        {
          type: 'quiz',
          question_es: '¿Cuántos pasos tiene el wudu completo según la sunnah?',
          question_ar: 'كم عدد خطوات الوضوء الكامل حسب السنة؟',
          question_en: 'How many steps does complete wudu have according to the sunnah?',
          options_es: ['8 pasos', '10 pasos', '12 pasos', '14 pasos'],
          options_ar: ['٨ خطوات', '١٠ خطوات', '١٢ خطوة', '١٤ خطوة'],
          options_en: ['8 steps', '10 steps', '12 steps', '14 steps'],
          correct: 2,
          explanation_es: 'El wudu completo tiene 12 pasos: niyyah, bismillah, lavar manos, madmadah, istinshaq, lavar cara, brazo derecho, brazo izquierdo, mas-h cabeza, mas-h orejas, pie derecho, pie izquierdo.',
          explanation_en: 'Complete wudu has 12 steps: niyyah, bismillah, wash hands, madmadah, istinshaq, wash face, right arm, left arm, wipe head, wipe ears, right foot, left foot.',
        },
        {
          type: 'quiz',
          question_es: '¿Cuántas veces se pasa el mas-h por la cabeza?',
          question_ar: 'كم مرة يُمسح على الرأس؟',
          question_en: 'How many times is the head wiped?',
          options_es: ['1 vez', '2 veces', '3 veces', '7 veces'],
          options_ar: ['مرة واحدة', 'مرّتان', 'ثلاث مرات', 'سبع مرات'],
          options_en: ['1 time', '2 times', '3 times', '7 times'],
          correct: 0,
          explanation_es: 'El mas-h de la cabeza se hace UNA SOLA VEZ, del frente a la nuca y de regreso.',
          explanation_en: 'The head is wiped only ONCE, from front to nape and back.',
        },
        {
          type: 'quiz',
          question_es: '¿Cuál de estas cosas NO anula el wudu?',
          question_ar: 'أيّ ممّا يلي لا ينقض الوضوء؟',
          question_en: 'Which of these does NOT nullify wudu?',
          options_es: ['Orinar', 'Dormir profundamente', 'Comer pan', 'Tocar los genitales directamente'],
          options_ar: ['البول', 'النوم العميق', 'أكل الخبز', 'مسّ الفرج مباشرة'],
          options_en: ['Urinating', 'Deep sleep', 'Eating bread', 'Directly touching the genitals'],
          correct: 2,
          explanation_es: 'Comer alimentos generales (pan, arroz, verduras...) NO anula el wudu. Solo la carne de camello lo anula específicamente.',
          explanation_en: 'Eating general foods (bread, rice, vegetables...) does NOT nullify wudu. Only camel meat specifically nullifies it.',
        },
        {
          type: 'quiz',
          question_es: 'Después del wudu, ¿qué du\'a se recomienda decir mirando al cielo?',
          question_ar: 'بعد الوضوء، ما الدعاء المستحب رفع البصر إلى السماء عنده؟',
          question_en: 'After wudu, what du\'a is recommended while looking up to the sky?',
          options_es: ['Bismillah al-Rahman al-Rahim', 'Ashhadu an la ilaha illallah...', 'Al-hamdulillah rabbil alamin', 'Subhanallah'],
          options_ar: ['بسم الله الرحمن الرحيم', 'أشهد أن لا إله إلا الله...', 'الحمد لله رب العالمين', 'سبحان الله'],
          options_en: ['Bismillah al-Rahman al-Rahim', 'Ashhadu an la ilaha illallah...', 'Al-hamdulillah rabbil alamin', 'Subhanallah'],
          correct: 1,
          explanation_es: 'Se dice la Shahada completa: "Ashhadu an la ilaha illallah wahdahu la sharika lah, wa ashhadu anna Muhammadan ‘abduhu wa rasuluh". Se abren las 8 puertas del Paraíso.',
          explanation_en: 'The complete Shahada is said. The 8 gates of Paradise are opened.',
        },
        {
          type: 'quiz',
          question_es: '¿Es obligatorio pronunciar la intención (niyyah) en voz alta?',
          question_ar: 'هل يجب التلفّظ بالنية بصوت مسموع؟',
          question_en: 'Is it obligatory to pronounce the intention (niyyah) aloud?',
          options_es: ['Sí, siempre', 'No, es una innovación', 'Solo en la primera vez del día', 'Solo antes del Fajr'],
          options_ar: ['نعم دائمًا', 'لا، بل هي بدعة', 'فقط أول مرة في اليوم', 'فقط قبل الفجر'],
          options_en: ['Yes, always', 'No, it is an innovation', 'Only the first time of the day', 'Only before Fajr'],
          correct: 1,
          explanation_es: 'La niyyah es un acto del CORAZÓN. Pronunciarla en voz alta es una innovación (bid‘ah) no transmitida del Profeta ﷺ ni de sus compañeros.',
          explanation_en: 'Niyyah is an act of the HEART. Voicing it is an innovation (bid‘ah) not transmitted from the Prophet ﷺ or his companions.',
        },
        // ── v20: Additional quiz questions ──────────────────────
        {
          type: 'quiz',
          question_es: '¿Por cuánto tiempo puede un residente hacer mas-h sobre calcetines?',
          question_ar: 'كم مدّة المسح على الخفّين للمقيم؟',
          question_en: 'How long can a resident wipe over socks (mas-h)?',
          options_es: ['6 horas', '12 horas', '24 horas (1 día y 1 noche)', '72 horas (3 días)'],
          options_ar: ['6 ساعات', '12 ساعة', '24 ساعة (يوم وليلة)', '72 ساعة (3 أيام)'],
          options_en: ['6 hours', '12 hours', '24 hours (1 day, 1 night)', '72 hours (3 days)'],
          correct: 2,
          explanation_es: '24 horas desde el primer wudu roto después de ponerlos. Los viajeros: 72 horas.',
          explanation_en: '24 hours from the first broken wudu after putting them on. Travelers: 72 hours.',
        },
        {
          type: 'quiz',
          question_es: '¿Sobre qué se hace el tayammum cuando no hay agua?',
          question_ar: 'ما الذي يُتيمّم به عند فقد الماء؟',
          question_en: 'What is used for tayammum when there is no water?',
          options_es: ['Aceite', 'Tierra limpia / polvo', 'Perfume', 'Nada, se pospone la oración'],
          options_ar: ['الزيت', 'التراب الطاهر', 'العطر', 'لا يتيمّم، تؤجّل الصلاة'],
          options_en: ['Oil', 'Clean earth / dust', 'Perfume', 'Nothing, delay the prayer'],
          correct: 1,
          explanation_es: 'Tierra limpia. Allah dice: «Si no encontráis agua, recurrid a tierra pura.» (Ma\'idah 6)',
          explanation_en: 'Clean earth. Allah says: «If you find no water, then go to clean earth.» (Ma\'idah 6)',
        },
        {
          type: 'quiz',
          question_es: '¿Qué sale de la cara al lavarla en wudu (según hadith)?',
          question_ar: 'ما الذي يخرج من الوجه عند غسله في الوضوء (حسب الحديث)؟',
          question_en: 'What departs from the face when washed in wudu (per hadith)?',
          options_es: ['Nada', 'Todas las faltas cometidas con la mirada', 'La grasa', 'El maquillaje'],
          options_ar: ['لا شيء', 'كلّ خطيئة نظرتها العين', 'الدهن', 'المساحيق'],
          options_en: ['Nothing', 'Every sin the eyes committed', 'The oil', 'Makeup'],
          correct: 1,
          explanation_es: 'Cada pecado cometido con la mirada sale con el agua o la última gota (Sahih Muslim 244).',
          explanation_en: 'Every sin the eyes committed departs with the water or last drop (Sahih Muslim 244).',
        },
        {
          type: 'quiz',
          question_es: '¿Cuál es el orden correcto del wudu?',
          question_ar: 'ما الترتيب الصحيح للوضوء؟',
          question_en: 'What is the correct order of wudu?',
          options_es: ['Cara → manos → boca → pies', 'Manos → boca → nariz → cara → brazos → cabeza → orejas → pies', 'Pies → manos → cara → cabeza', 'No hay orden específico'],
          options_ar: ['الوجه → اليدان → الفم → القدمان', 'اليدان → الفم → الأنف → الوجه → الذراعان → الرأس → الأذنان → القدمان', 'القدمان → اليدان → الوجه → الرأس', 'لا ترتيب محدّد'],
          options_en: ['Face → hands → mouth → feet', 'Hands → mouth → nose → face → arms → head → ears → feet', 'Feet → hands → face → head', 'No specific order'],
          correct: 1,
          explanation_es: 'El orden es obligatorio y sigue la sunnah descrita por Uthman en Bukhari 159.',
          explanation_en: 'The order is mandatory and follows the sunnah described by Uthman in Bukhari 159.',
        },
        {
          type: 'quiz',
          question_es: '¿Es problemático desperdiciar agua en wudu?',
          question_ar: 'ما حكم الإسراف في الماء في الوضوء؟',
          question_en: 'Is wasting water problematic in wudu?',
          options_es: ['Es preferido usar mucha agua', 'Es igual, no importa', 'Está prohibido incluso en un río caudaloso', 'Solo importa si el agua escasea'],
          options_ar: ['يُستحبّ الإكثار', 'لا يهمّ', 'مكروه ولو على نهر جارٍ', 'فقط إذا قلّ الماء'],
          options_en: ['Preferred to use much water', 'Same, does not matter', 'Prohibited even at a flowing river', 'Only if water is scarce'],
          correct: 2,
          explanation_es: 'El Profeta ﷺ pasó junto a Sa\'d haciendo wudu y le dijo: «¿Por qué este derroche?» Sa\'d preguntó: «¿Hay derroche en el wudu?» Y el Profeta ﷺ dijo: «Sí, aunque estés en un río caudaloso.» (Ibn Majah 425, hasan)',
          explanation_en: 'The Prophet ﷺ passed by Sa\'d making wudu and said: «Why this waste?» Sa\'d asked: «Is there waste in wudu?» The Prophet ﷺ replied: «Yes, even if you are at a flowing river.» (Ibn Majah 425, hasan)',
        },
        {
          type: 'quiz',
          question_es: '¿Es válido el wudu con esmalte de uñas?',
          question_ar: 'هل يصحّ الوضوء مع طلاء الأظافر؟',
          question_en: 'Is wudu valid with nail polish?',
          options_es: ['Sí, siempre', 'No, porque impide que el agua llegue a la piel', 'Solo el transparente', 'Solo en emergencia'],
          options_ar: ['نعم مطلقاً', 'لا، لأنّه يمنع وصول الماء', 'فقط الشفّاف', 'في الضرورة'],
          options_en: ['Yes, always', 'No, it blocks water from reaching the skin', 'Only clear polish', 'Only in emergency'],
          correct: 1,
          explanation_es: 'El esmalte forma una capa impermeable. La henna (حنّاء) sí es válida porque no impide el agua.',
          explanation_en: 'Nail polish forms a waterproof layer. However, henna does not block water and is valid.',
        },
        {
          type: 'quiz',
          question_es: '¿Cuál es la diferencia entre wudu y ghusl?',
          question_ar: 'ما الفرق بين الوضوء والغسل؟',
          question_en: 'What is the difference between wudu and ghusl?',
          options_es: ['No hay diferencia', 'Wudu = purificación menor. Ghusl = purificación mayor (todo el cuerpo)', 'Wudu es voluntario, ghusl es obligatorio', 'Ghusl solo en la mezquita'],
          options_ar: ['لا فرق', 'الوضوء طهارة صغرى، والغسل طهارة كبرى لجميع البدن', 'الوضوء مستحبّ والغسل واجب', 'الغسل في المسجد فقط'],
          options_en: ['No difference', 'Wudu = minor purification. Ghusl = major purification (whole body)', 'Wudu is voluntary, ghusl is mandatory', 'Ghusl only in the mosque'],
          correct: 1,
          explanation_es: 'Wudu se hace para la Salah y menores impurezas. Ghusl es obligatorio después de janabah (relaciones íntimas), menstruación, nifás.',
          explanation_en: 'Wudu is done for Salah and minor impurities. Ghusl is mandatory after janabah, menstruation, nifas.',
        },
        {
          type: 'quiz',
          question_es: '¿Anula el wudu comer pollo o vaca?',
          question_ar: 'هل ينقض أكل الدجاج أو البقر الوضوء؟',
          question_en: 'Does eating chicken or beef nullify wudu?',
          options_es: ['Sí, ambos', 'Solo el pollo', 'Solo la vaca', 'No, únicamente la carne de camello lo anula'],
          options_ar: ['نعم كلاهما', 'الدجاج فقط', 'البقر فقط', 'لا، لحم الإبل فقط ينقض'],
          options_en: ['Yes, both', 'Only chicken', 'Only beef', 'No, only camel meat nullifies'],
          correct: 3,
          explanation_es: 'Solo la carne de camello. Es una regla específica del Profeta ﷺ (Muslim 360).',
          explanation_en: 'Only camel meat. It is a specific ruling of the Prophet ﷺ (Muslim 360).',
        },
      ],
    },
  ],
};

if (typeof window !== 'undefined') window.COURSE_WUDU_COMPLETE = COURSE_WUDU_COMPLETE;
