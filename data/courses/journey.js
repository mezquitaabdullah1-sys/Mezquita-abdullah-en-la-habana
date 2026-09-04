// 🗺️ Course: "Rihlat al-Muslim" (Muslim's Journey) — 4 stations, interactive
const COURSE_JOURNEY = {
  id: 'journey',
  icon: '<i class="fas fa-map"></i>',
  mascotPose: 'welcome',
  color: '#0F4C3A',
  ageGroup: 'all',
  durationMin: 25,
  difficulty: 'beginner',
  title: {
    es: 'Rihlat al-Muslim (Viaje del Musulmán)',
    ar: 'رحلة المسلم',
    en: "Muslim's Journey",
  },
  description: {
    es: 'Una aventura interactiva por 4 estaciones: Iman, Ibadah, Akhlaq y Mu\'amalat',
    ar: 'مغامرة تفاعلية عبر 4 محطات: الإيمان، العبادة، الأخلاق، والمعاملات',
    en: 'An interactive journey through 4 stations: Faith, Worship, Character, and Conduct',
  },
  stations: [
    {
      id: 'iman',
      icon: '<i class="fas fa-star"></i>',
      title: { es: 'Estación del Iman', ar: 'محطة الإيمان', en: 'Station of Faith' },
      mascotIntro: { es: '¡Bienvenido! Empecemos por los 6 pilares de la fe.', ar: 'أهلاً بك! لنبدأ بأركان الإيمان الستة.', en: 'Welcome! Let\'s start with the 6 pillars of faith.' },
      lessons: [
        {
          type: 'card',
          title: { es: 'Los 6 Pilares del Iman', ar: 'أركان الإيمان الستة', en: 'The 6 Pillars of Faith' },
          content: {
            es: 'El Iman se basa en creer en: 1) Allah, 2) Sus Ángeles, 3) Sus Libros, 4) Sus Mensajeros, 5) el Día del Juicio, 6) el Decreto Divino (Qadar).',
            ar: 'الإيمان يقوم على: 1) الله، 2) الملائكة، 3) الكتب، 4) الرسل، 5) اليوم الآخر، 6) القدر خيره وشرّه.',
            en: 'Iman is to believe in: 1) Allah, 2) His Angels, 3) His Books, 4) His Messengers, 5) the Last Day, 6) Divine Decree (Qadar).',
          },
          source: 'Hadith of Jibril — Sahih Muslim',
        },
        {
          type: 'quiz',
          question: { es: '¿Cuántos pilares tiene el Iman?', ar: 'كم عدد أركان الإيمان؟', en: 'How many pillars does Iman have?' },
          options: ['4', '5', '6', '7'],
          correct: 2,
          feedback: { es: 'Correcto: 6 pilares. Allah, ángeles, libros, mensajeros, día del juicio, y qadar.', ar: 'صحيح: 6 أركان.', en: 'Correct: 6 pillars.' },
        },
        {
          type: 'flashcards',
          title: { es: 'Aprende los Pilares', ar: 'تعلّم الأركان', en: 'Learn the Pillars' },
          cards: [
            { front: { es: 'Pilar 1', ar: 'الركن 1', en: 'Pillar 1' }, back: { es: 'Creer en Allah', ar: 'الإيمان بالله', en: 'Belief in Allah' } },
            { front: { es: 'Pilar 2', ar: 'الركن 2', en: 'Pillar 2' }, back: { es: 'Creer en los Ángeles', ar: 'الإيمان بالملائكة', en: 'Belief in Angels' } },
            { front: { es: 'Pilar 3', ar: 'الركن 3', en: 'Pillar 3' }, back: { es: 'Creer en los Libros Revelados', ar: 'الإيمان بالكتب', en: 'Belief in the Books' } },
            { front: { es: 'Pilar 4', ar: 'الركن 4', en: 'Pillar 4' }, back: { es: 'Creer en los Mensajeros', ar: 'الإيمان بالرسل', en: 'Belief in the Messengers' } },
            { front: { es: 'Pilar 5', ar: 'الركن 5', en: 'Pillar 5' }, back: { es: 'Creer en el Día del Juicio', ar: 'الإيمان باليوم الآخر', en: 'Belief in the Last Day' } },
            { front: { es: 'Pilar 6', ar: 'الركن 6', en: 'Pillar 6' }, back: { es: 'Creer en el Qadar', ar: 'الإيمان بالقدر', en: 'Belief in Qadar' } },
          ],
        },
        // ── v20: extended iman content ──────────────────────────
        {
          type: 'card',
          title: { es: 'Los 3 niveles: Islam, Iman, Ihsan', ar: 'المراتب الثلاث: الإسلام والإيمان والإحسان', en: 'The 3 levels: Islam, Iman, Ihsan' },
          content: {
            es: '📚 En el famoso Hadith de Jibril (عليه السلام):\n\n1️⃣ **Islam** — sumisión externa (5 pilares).\n2️⃣ **Iman** — creencia interna (6 pilares).\n3️⃣ **Ihsan** — excelencia espiritual: «Adorar a Allah como si Lo vieras; si no Lo ves, Él te ve.»\n\nJibril vino en forma de hombre y preguntó al Profeta ﷺ sobre estos 3 niveles. Al final el Profeta ﷺ dijo: «Ese era Jibril, vino a enseñaros vuestra religión.»',
            ar: '📚 في حديث جبريل عليه السلام:\n\n1️⃣ **الإسلام** — الاستسلام الظاهر (5 أركان).\n2️⃣ **الإيمان** — التصديق الباطن (6 أركان).\n3️⃣ **الإحسان** — «أن تعبد الله كأنك تراه، فإن لم تكن تراه فإنه يراك.»\n\nجاء جبريل في صورة رجل يسأل النبي ﷺ، ثم قال ﷺ: «هذا جبريل أتاكم يعلمكم دينكم.»',
            en: '📚 In the famous Hadith of Jibril (عليه السلام):\n\n1️⃣ **Islam** — outward submission (5 pillars).\n2️⃣ **Iman** — inner belief (6 pillars).\n3️⃣ **Ihsan** — spiritual excellence: «To worship Allah as if you see Him; if you do not see Him, He sees you.»\n\nJibril came as a man asking the Prophet ﷺ about the 3 levels. The Prophet ﷺ said: «That was Jibril, he came to teach you your religion.»',
          },
          source: 'Sahih Muslim 8 (Hadith Jibril)',
        },
        {
          type: 'quiz',
          question: { es: '¿Cuál es la definición de Ihsan?', ar: 'ما تعريف الإحسان؟', en: 'What is the definition of Ihsan?' },
          options: [
            { es: 'Ayudar a los pobres', ar: 'مساعدة الفقراء', en: 'Helping the poor' },
            { es: 'Adorar a Allah como si Lo vieras', ar: 'أن تعبد الله كأنك تراه', en: 'Worship Allah as if you see Him' },
            { es: 'Aprender el Corán', ar: 'حفظ القرآن', en: 'Memorize the Quran' },
            { es: 'Rezar 5 veces al día', ar: 'الصلوات الخمس', en: 'Pray 5 times a day' },
          ],
          correct: 1,
          feedback: {
            es: 'Ihsan es la EXCELENCIA espiritual: consciencia constante de que Allah nos ve (Muslim 8).',
            ar: 'الإحسان هو مراقبة الله والشعور بأنه يرانا (مسلم 8).',
            en: 'Ihsan is spiritual EXCELLENCE: constant awareness that Allah sees us (Muslim 8).',
          },
        },
        {
          type: 'quiz',
          question: { es: '¿Cuántos ángeles conocemos por nombre?', ar: 'كم عدد الملائكة الذين نعرفهم بأسمائهم؟', en: 'How many angels do we know by name?' },
          options: [
            { es: '3: Jibril, Mikail, Israfil', ar: '3: جبريل وميكائيل وإسرافيل', en: '3: Jibril, Mikail, Israfil' },
            { es: '4', ar: '4', en: '4' },
            { es: '10', ar: '10', en: '10' },
            { es: 'Muchos', ar: 'كثير', en: 'Many' },
          ],
          correct: 0,
          feedback: {
            es: 'Jibril (revelación), Mikail (lluvia y sustento), Israfil (trompeta). También conocemos a Malik (Infierno) y los 2 escribas Raqib y Atid.',
            ar: 'جبريل (الوحي)، ميكائيل (المطر والرزق)، إسرافيل (الصور). ومنكر ونكير في القبر، ومالك خازن النار.',
            en: 'Jibril (revelation), Mikail (rain and sustenance), Israfil (trumpet). Also Malik (Hell) and the 2 scribes Raqib and Atid.',
          },
        },
        {
          type: 'card',
          title: { es: 'Los Libros Revelados', ar: 'الكتب المنزلة', en: 'The Revealed Books' },
          content: {
            es: '📖 Creemos en TODOS los libros revelados por Allah:\n\n1️⃣ **Suhuf** de Ibrahim y Musa (hojas, perdidas).\n2️⃣ **Tawrat** (Torá) — revelada a Musa عليه السلام.\n3️⃣ **Zabur** (Salmos) — revelado a Dawud عليه السلام.\n4️⃣ **Injil** (Evangelio) — revelado a Isa عليه السلام.\n5️⃣ **Quran** — revelado a Muhammad ﷺ, el ÚLTIMO y PRESERVADO por Allah.\n\n💡 Los libros anteriores fueron alterados por el tiempo. El Corán es el único protegido: «Somos Nosotros quienes hemos revelado el Recuerdo, y Somos Nosotros quienes lo protegeremos.» (Al-Hijr 15:9)',
            ar: '📖 نؤمن بجميع الكتب التي أنزلها الله:\n\n1️⃣ **صحف** إبراهيم وموسى.\n2️⃣ **التوراة** — نزلت على موسى عليه السلام.\n3️⃣ **الزبور** — نزل على داود عليه السلام.\n4️⃣ **الإنجيل** — نزل على عيسى عليه السلام.\n5️⃣ **القرآن** — نزل على محمد ﷺ، الآخر والمحفوظ.\n\n💡 الكتب السابقة حُرِّفت بمرور الزمن. القرآن وحده محفوظ: «إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ» (الحجر 9)',
            en: '📖 We believe in ALL the books revealed by Allah:\n\n1️⃣ **Suhuf** of Ibrahim and Musa (leaves, lost).\n2️⃣ **Tawrat** (Torah) — revealed to Musa عليه السلام.\n3️⃣ **Zabur** (Psalms) — revealed to Dawud عليه السلام.\n4️⃣ **Injil** (Gospel) — revealed to Isa عليه السلام.\n5️⃣ **Quran** — revealed to Muhammad ﷺ, the LAST and PRESERVED.\n\n💡 The earlier books were altered over time. Only the Quran is protected: «It is We who sent down the Reminder, and it is We who will guard it.» (Al-Hijr 15:9)',
          },
          source: 'Quran 15:9 · 2:285',
        },
        {
          type: 'quiz',
          question: { es: '¿Cuál es el libro sagrado revelado a Musa عليه السلام?', ar: 'ما الكتاب المنزل على موسى عليه السلام؟', en: 'Which sacred book was revealed to Musa عليه السلام?' },
          options: [
            { es: 'El Corán', ar: 'القرآن', en: 'The Quran' },
            { es: 'El Injil (Evangelio)', ar: 'الإنجيل', en: 'The Injil (Gospel)' },
            { es: 'La Tawrat (Torá)', ar: 'التوراة', en: 'The Tawrat (Torah)' },
            { es: 'El Zabur (Salmos)', ar: 'الزبور', en: 'The Zabur (Psalms)' },
          ],
          correct: 2,
          feedback: {
            es: 'La Tawrat. El Injil a Isa, el Zabur a Dawud, y el Corán a Muhammad ﷺ.',
            ar: 'التوراة. الإنجيل لعيسى، والزبور لداود، والقرآن لمحمد ﷺ.',
            en: 'The Tawrat. Injil to Isa, Zabur to Dawud, Quran to Muhammad ﷺ.',
          },
        },
      ],
    },
    {
      id: 'ibadah',
      icon: '<i class="fas fa-mosque"></i>',
      title: { es: 'Estación de la Ibadah', ar: 'محطة العبادة', en: 'Station of Worship' },
      mascotIntro: { es: 'Ahora los 5 pilares del Islam, las obras que sostienen al musulmán.', ar: 'الآن أركان الإسلام الخمسة، الأعمال التي يقوم عليها المسلم.', en: 'Now the 5 pillars of Islam, the deeds that uphold a Muslim.' },
      lessons: [
        {
          type: 'card',
          title: { es: 'Los 5 Pilares del Islam', ar: 'أركان الإسلام الخمسة', en: 'The 5 Pillars of Islam' },
          content: {
            es: '1) Shahada (testimonio de fe), 2) Salat (5 oraciones diarias), 3) Zakat (caridad obligatoria), 4) Sawm (ayuno de Ramadán), 5) Hajj (peregrinación a Meca).',
            ar: '1) الشهادتان، 2) إقام الصلاة، 3) إيتاء الزكاة، 4) صوم رمضان، 5) حج البيت لمن استطاع.',
            en: '1) Shahada (testimony), 2) Salah (5 daily prayers), 3) Zakat (obligatory charity), 4) Sawm (fasting Ramadan), 5) Hajj (pilgrimage to Makkah).',
          },
          source: 'Sahih al-Bukhari & Muslim',
        },
        {
          type: 'drag_drop',
          title: { es: 'Ordena los Pilares', ar: 'رتّب الأركان', en: 'Order the Pillars' },
          instruction: { es: 'Arrastra los pilares en el orden correcto', ar: 'اسحب الأركان بالترتيب الصحيح', en: 'Drag the pillars in the correct order' },
          items: [
            { id: 'shahada', label: { es: 'Shahada', ar: 'الشهادتان', en: 'Shahada' }, order: 1 },
            { id: 'salah', label: { es: 'Salah', ar: 'الصلاة', en: 'Salah' }, order: 2 },
            { id: 'zakat', label: { es: 'Zakat', ar: 'الزكاة', en: 'Zakat' }, order: 3 },
            { id: 'sawm', label: { es: 'Sawm', ar: 'الصوم', en: 'Sawm' }, order: 4 },
            { id: 'hajj', label: { es: 'Hajj', ar: 'الحج', en: 'Hajj' }, order: 5 },
          ],
        },
        {
          type: 'quiz',
          question: { es: '¿Cuántas oraciones diarias prescribió Allah?', ar: 'كم عدد الصلوات اليومية المفروضة؟', en: 'How many daily prayers did Allah prescribe?' },
          options: ['3', '5', '7', '17'],
          correct: 1,
          feedback: { es: '5 oraciones obligatorias: Fajr, Dhuhr, Asr, Maghrib, Isha.', ar: '5 صلوات: الفجر، الظهر، العصر، المغرب، العشاء.', en: '5 prayers: Fajr, Dhuhr, Asr, Maghrib, Isha.' },
        },
      ],
    },
    {
      id: 'akhlaq',
      icon: '<i class="fas fa-spa"></i>',
      title: { es: 'Estación de los Akhlaq', ar: 'محطة الأخلاق', en: 'Station of Character' },
      mascotIntro: { es: 'El Profeta ﷺ dijo: "Fui enviado para perfeccionar los buenos modales."', ar: 'قال النبي ﷺ: "إنما بُعثت لأتمم مكارم الأخلاق."', en: 'The Prophet ﷺ said: "I was sent to perfect noble character."' },
      lessons: [
        {
          type: 'card',
          title: { es: 'Akhlaq esenciales', ar: 'أخلاق أساسية', en: 'Essential character traits' },
          content: {
            es: '✅ Honestidad (Sidq) · Confianza (Amana) · Paciencia (Sabr) · Gratitud (Shukr) · Modestia (Haya) · Justicia (Adl) · Misericordia (Rahma) · Generosidad (Karam).',
            ar: '✅ الصدق · الأمانة · الصبر · الشكر · الحياء · العدل · الرحمة · الكرم.',
            en: '✅ Honesty (Sidq) · Trust (Amana) · Patience (Sabr) · Gratitude (Shukr) · Modesty (Haya) · Justice (Adl) · Mercy (Rahma) · Generosity (Karam).',
          },
          source: 'Sahih al-Bukhari 6029',
        },
        {
          type: 'quiz',
          question: { es: '¿Qué dijo el Profeta ﷺ que es la mitad del Iman?', ar: 'ما هو نصف الإيمان حسب قول النبي ﷺ؟', en: 'What did the Prophet ﷺ say is half of Iman?' },
          options: [
            { es: 'La oración', ar: 'الصلاة', en: 'Prayer' },
            { es: 'La pureza (Tahara)', ar: 'الطهور', en: 'Purity (Tahara)' },
            { es: 'La paciencia', ar: 'الصبر', en: 'Patience' },
            { es: 'La caridad', ar: 'الصدقة', en: 'Charity' },
          ],
          correct: 1,
          feedback: { es: 'La purificación es la mitad del Iman (Sahih Muslim 223).', ar: 'الطهور شطر الإيمان (صحيح مسلم).', en: 'Purification is half of Iman (Sahih Muslim 223).' },
        },
      ],
    },
    {
      id: 'muamalat',
      icon: '<i class="fas fa-handshake"></i>',
      title: { es: 'Estación de las Mu\'amalat', ar: 'محطة المعاملات', en: 'Station of Conduct' },
      mascotIntro: { es: 'Cómo tratar a los demás: familia, vecinos, comunidad.', ar: 'كيف نتعامل مع الآخرين: الأهل، الجيران، المجتمع.', en: 'How to treat others: family, neighbors, community.' },
      lessons: [
        {
          type: 'card',
          title: { es: 'Derechos del musulmán sobre el musulmán', ar: 'حقوق المسلم على المسلم', en: 'Rights of a Muslim upon another' },
          content: {
            es: 'Saludar (Salam), responder a su invitación, aconsejarle cuando lo pide, decirle "Yarhamukallah" al estornudar (con Alhamdulillah), visitarlo si está enfermo, y acompañar su funeral.',
            ar: '1) إذا لقيته فسلّم عليه، 2) إذا دعاك فأجبه، 3) إذا استنصحك فانصح له، 4) إذا عطس فحمد الله فشمّته، 5) إذا مرض فعُده، 6) إذا مات فاتبعه.',
            en: '6 rights: 1) Greet with Salam, 2) Respond to invitations, 3) Give sincere advice when asked, 4) Say Yarhamukallah on his sneeze, 5) Visit when ill, 6) Attend funeral.',
          },
          source: 'Sahih Muslim 2162',
        },
        {
          type: 'quiz',
          question: { es: '¿Cuál es el mejor de los musulmanes según el Profeta ﷺ?', ar: 'من خير الناس عند النبي ﷺ؟', en: 'Who is the best of Muslims per the Prophet ﷺ?' },
          options: [
            { es: 'Quien más reza', ar: 'أكثرهم صلاة', en: 'The one who prays most' },
            { es: 'Quien es mejor con su familia', ar: 'خيركم لأهله', en: 'The best to his family' },
            { es: 'Quien más ayuna', ar: 'أكثرهم صياماً', en: 'The one who fasts most' },
            { es: 'Quien tiene más conocimiento', ar: 'أكثرهم علماً', en: 'The most knowledgeable' },
          ],
          correct: 1,
          feedback: { es: '"El mejor de vosotros es el mejor con su familia." (Tirmidhi 3895)', ar: '"خيركم خيركم لأهله." (الترمذي)', en: '"The best of you is the best to his family." (Tirmidhi 3895)' },
        },
        // ── v20: additional mu'amalat content ────────────────────
        {
          type: 'card',
          title: { es: 'Los derechos de los padres', ar: 'حقوق الوالدين', en: 'The rights of parents' },
          content: {
            es: '👨‍👩‍👦 Allah dice: «Tu Señor ha decretado que no adoréis sino a Él, y que se trate bien a los padres. Si uno de ellos o ambos llegan a la vejez contigo, no les digas ni "uf!" ni los rechaces, sino háblales con palabras nobles.» (Al-Isra 17:23)\n\n**Deberes hacia los padres:**\n1️⃣ Obedecerlos en todo lo permitido.\n2️⃣ Hablarles con dulzura, nunca alzar la voz.\n3️⃣ Mantenerlos económicamente si lo necesitan.\n4️⃣ Hacer du\'a por ellos, vivos o muertos.\n5️⃣ Visitar a sus amigos después de que fallezcan.\n\n📖 El Profeta ﷺ fue preguntado: «¿Cuál es el acto más querido por Allah?» Dijo: «La Salah en su tiempo.» Luego: «¿Y después?» Dijo: «La obediencia a los padres.» (Bukhari 527)',
            ar: '👨‍👩‍👦 قال الله: «وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا ۚ إِمَّا يَبْلُغَنَّ عِنْدَكَ الْكِبَرَ أَحَدُهُمَا أَوْ كِلَاهُمَا فَلَا تَقُلْ لَهُمَا أُفٍّ وَلَا تَنْهَرْهُمَا وَقُلْ لَهُمَا قَوْلًا كَرِيمًا» (الإسراء 23)\n\n**واجباتنا نحو الوالدين:**\n1️⃣ طاعتهما في المعروف.\n2️⃣ الكلام بلين ولا يُرفع الصوت.\n3️⃣ النفقة عليهما عند الحاجة.\n4️⃣ الدعاء لهما حيَّين وميَّتين.\n5️⃣ صلة أصدقائهما بعد وفاتهما.\n\n📖 سُئل النبي ﷺ: «أيّ العمل أحبّ إلى الله؟» قال: «الصلاة على وقتها.» قيل: «ثمّ أيّ؟» قال: «برّ الوالدين.» (البخاري 527)',
            en: '👨‍👩‍👦 Allah says: «Your Lord has decreed that you worship none but Him, and that you be kind to parents. If one or both reach old age with you, say not even "uf!" nor rebuke them, but speak to them with noble words.» (Al-Isra 17:23)\n\n**Duties toward parents:**\n1️⃣ Obey them in all that is permissible.\n2️⃣ Speak gently, never raise your voice.\n3️⃣ Support them financially if needed.\n4️⃣ Make du\'a for them, alive or dead.\n5️⃣ Visit their friends after they pass.\n\n📖 The Prophet ﷺ was asked: «What deed is most beloved to Allah?» He said: «Salah at its time.» Then: «What next?» He said: «Kindness to parents.» (Bukhari 527)',
          },
          source: 'Quran 17:23 · Sahih al-Bukhari 527',
        },
        {
          type: 'quiz',
          question: { es: '¿Qué acto viene DESPUÉS de la Salah en importancia según Bukhari 527?', ar: 'ما العمل الذي يلي الصلاة في الأهمية (البخاري 527)؟', en: 'What deed comes AFTER Salah in importance per Bukhari 527?' },
          options: [
            { es: 'El zakat', ar: 'الزكاة', en: 'Zakat' },
            { es: 'La obediencia a los padres', ar: 'برّ الوالدين', en: 'Kindness to parents' },
            { es: 'El Hajj', ar: 'الحجّ', en: 'Hajj' },
            { es: 'El Jihad', ar: 'الجهاد', en: 'Jihad' },
          ],
          correct: 1,
          feedback: {
            es: '«Birr al-walidayn» (obediencia a los padres). Después el Jihad fi sabilillah.',
            ar: 'برّ الوالدين. ثمّ الجهاد في سبيل الله.',
            en: '«Birr al-walidayn» (kindness to parents). Then Jihad fi sabilillah.',
          },
        },
        {
          type: 'card',
          title: { es: 'Los derechos del vecino', ar: 'حقوق الجار', en: 'The rights of the neighbor' },
          content: {
            es: '🏘️ El Profeta ﷺ dijo:\n\n«Jibril seguía recomendándome tratar bien al vecino, hasta que pensé que le daría derecho a la herencia.» (Bukhari 6014)\n\n**3 tipos de vecinos:**\n1️⃣ Vecino musulmán y pariente — 3 derechos: parentesco, vecindad e Islam.\n2️⃣ Vecino musulmán no pariente — 2 derechos: vecindad e Islam.\n3️⃣ Vecino no musulmán — 1 derecho: vecindad.\n\n**Cómo tratarlo bien:**\n• 🍲 Compartir comida.\n• 🚪 Saludar al encontrarlo.\n• 🛠️ Ayudar en dificultades.\n• 🤫 No molestarlo con ruidos ni olores.\n• 🎁 Regalar de vez en cuando.\n\n📖 «Quien crea en Allah y el Último Día, que trate bien a su vecino.» (Bukhari 6018)',
            ar: '🏘️ قال النبي ﷺ:\n\n«ما زال جبريل يوصيني بالجار حتى ظننت أنه سيورّثه.» (البخاري 6014)\n\n**أنواع الجيران:**\n1️⃣ جار مسلم قريب — له 3 حقوق: القرابة والجوار والإسلام.\n2️⃣ جار مسلم غير قريب — له حقان.\n3️⃣ جار غير مسلم — له حق الجوار.\n\n**كيفية الإحسان إليه:**\n• 🍲 مشاركة الطعام.\n• 🚪 السلام عند اللقاء.\n• 🛠️ إعانته عند الحاجة.\n• 🤫 عدم إيذائه بصوت أو رائحة.\n• 🎁 الهدية أحياناً.\n\n📖 «من كان يؤمن بالله واليوم الآخر فليُكرم جاره.» (البخاري 6018)',
            en: '🏘️ The Prophet ﷺ said:\n\n«Jibril kept recommending kindness to the neighbor to me, until I thought he would give him a share of inheritance.» (Bukhari 6014)\n\n**3 types of neighbors:**\n1️⃣ Muslim neighbor and relative — 3 rights: kinship, neighborhood, Islam.\n2️⃣ Muslim neighbor not related — 2 rights.\n3️⃣ Non-Muslim neighbor — 1 right: neighborhood.\n\n**How to treat them well:**\n• 🍲 Share food.\n• 🚪 Greet on meeting.\n• 🛠️ Help in difficulty.\n• 🤫 Don\'t disturb with noise or smells.\n• 🎁 Give gifts occasionally.\n\n📖 «Whoever believes in Allah and the Last Day, let him honor his neighbor.» (Bukhari 6018)',
          },
          source: 'Sahih al-Bukhari 6014 & 6018',
        },
        {
          type: 'quiz',
          question: { es: '¿Cuántos derechos tiene un vecino musulmán no pariente?', ar: 'كم حقاً للجار المسلم غير القريب؟', en: 'How many rights does a Muslim non-relative neighbor have?' },
          options: ['1', '2', '3', '4'],
          correct: 1,
          feedback: {
            es: '2 derechos: la vecindad + el Islam. Un pariente vecino musulmán: 3 derechos (añade el parentesco).',
            ar: 'حقّان: الجوار + الإسلام. القريب المسلم: 3 حقوق (يُضاف القرابة).',
            en: '2 rights: neighborhood + Islam. A relative Muslim neighbor: 3 rights (add kinship).',
          },
        },
        {
          type: 'card',
          title: { es: 'La honestidad en negocios', ar: 'الأمانة في التجارة', en: 'Honesty in business' },
          content: {
            es: '💼 El Islam eleva la ética comercial. El Profeta ﷺ dijo:\n\n«El comerciante veraz y honrado estará con los Profetas, los veraces y los mártires.» (Tirmidhi 1209)\n\n**Reglas del comercio islámico:**\n1️⃣ ❌ Prohibido el **Riba** (interés/usura).\n2️⃣ ❌ Prohibido el **Gharar** (incertidumbre excesiva).\n3️⃣ ❌ Prohibido el **Maysir** (juegos de azar, especulación).\n4️⃣ ✅ Ser honesto en el peso y medida.\n5️⃣ ✅ Cumplir contratos y promesas.\n6️⃣ ✅ Perdonar deudas cuando sea posible.\n\n📖 «Los creyentes fieles a sus compromisos triunfarán.» (Al-Mu\'minun 23:8)',
            ar: '💼 الإسلام يرفع أخلاق التجارة. قال النبي ﷺ:\n\n«التاجر الصدوق الأمين مع النبيين والصدّيقين والشهداء.» (الترمذي 1209)\n\n**قواعد التجارة الإسلامية:**\n1️⃣ ❌ حرمة **الربا**.\n2️⃣ ❌ حرمة **الغرر**.\n3️⃣ ❌ حرمة **الميسر** (القمار).\n4️⃣ ✅ الصدق في الوزن والكيل.\n5️⃣ ✅ الوفاء بالعقود والوعود.\n6️⃣ ✅ إنظار المعسر أو الوضع عنه.\n\n📖 «وَالَّذِينَ هُمْ لِأَمَانَاتِهِمْ وَعَهْدِهِمْ رَاعُونَ» (المؤمنون 8)',
            en: '💼 Islam elevates commercial ethics. The Prophet ﷺ said:\n\n«The truthful, trustworthy merchant will be with the Prophets, the truthful, and the martyrs.» (Tirmidhi 1209)\n\n**Islamic business rules:**\n1️⃣ ❌ **Riba** (interest/usury) forbidden.\n2️⃣ ❌ **Gharar** (excessive uncertainty) forbidden.\n3️⃣ ❌ **Maysir** (gambling, speculation) forbidden.\n4️⃣ ✅ Be honest in weight and measure.\n5️⃣ ✅ Fulfill contracts and promises.\n6️⃣ ✅ Forgive debts when possible.\n\n📖 «Believers faithful to their trusts will triumph.» (Al-Mu\'minun 23:8)',
          },
          source: 'Sunan at-Tirmidhi 1209 · Quran 23:8',
        },
        {
          type: 'quiz',
          question: { es: '¿Con quién estará el comerciante veraz según el Profeta ﷺ?', ar: 'مع من يكون التاجر الصدوق حسب النبي ﷺ؟', en: 'With whom will the truthful merchant be per the Prophet ﷺ?' },
          options: [
            { es: 'Con los ricos', ar: 'مع الأغنياء', en: 'With the wealthy' },
            { es: 'Con los Profetas, veraces y mártires', ar: 'مع النبيين والصدّيقين والشهداء', en: 'With the Prophets, truthful, and martyrs' },
            { es: 'Solo con los sabios', ar: 'مع العلماء فقط', en: 'Only with scholars' },
            { es: 'En el Paraíso pero solo', ar: 'في الجنّة وحده', en: 'In Paradise but alone' },
          ],
          correct: 1,
          feedback: {
            es: 'Con los Profetas, los veraces (siddiqin) y los mártires (Tirmidhi 1209).',
            ar: 'مع النبيين والصدّيقين والشهداء (الترمذي 1209).',
            en: 'With the Prophets, the truthful (siddiqin) and the martyrs (Tirmidhi 1209).',
          },
        },
      ],
    },
  ],
};

if (typeof window !== 'undefined') window.COURSE_JOURNEY = COURSE_JOURNEY;
