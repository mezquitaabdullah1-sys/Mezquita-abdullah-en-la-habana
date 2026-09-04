// 👶 Kids course (5-12 years) — Simple, illustrated, fun
const COURSE_KIDS = {
  id: 'kids',
  icon: '<i class="fas fa-child"></i>',
  mascotPose: 'welcome',
  color: '#FF7043',
  ageGroup: 'kids',
  durationMin: 15,
  difficulty: 'easy',
  title: { es: 'Islam para Pequeños', ar: 'الإسلام للصغار', en: 'Islam for Kids' },
  description: {
    es: '¡Aprende sobre Allah y el Profeta ﷺ con historias divertidas!',
    ar: 'تعلّم عن الله والنبي ﷺ بقصص ممتعة!',
    en: 'Learn about Allah and the Prophet ﷺ with fun stories!',
  },
  stations: [
    {
      id: 'who_is_allah',
      icon: '<i class="fas fa-star"></i>',
      title: { es: '¿Quién es Allah?', ar: 'من هو الله؟', en: 'Who is Allah?' },
      mascotIntro: { es: '¡Hola pequeño amigo! Vamos a aprender juntos.', ar: 'مرحباً يا صغيري! تعالَ نتعلّم معاً.', en: 'Hello little friend! Let\'s learn together.' },
      lessons: [
        {
          type: 'card',
          title: { es: 'Allah es Uno', ar: 'الله واحد', en: 'Allah is One' },
          content: {
            es: '🌟 Allah es Nuestro Creador. Él creó el sol, la luna, las estrellas, los árboles, los animales y a ti también. Allah es Uno, no tiene padre ni hijos. Él nos ama mucho.',
            ar: '🌟 الله هو خالقنا. هو الذي خلق الشمس والقمر والنجوم والشجر والحيوانات وأنتَ كذلك. الله واحد، ليس له والد ولا أبناء. يحبنا كثيراً.',
            en: '🌟 Allah is Our Creator. He created the sun, moon, stars, trees, animals — and you too! Allah is One. He has no father, no children. He loves us very much.',
          },
          source: 'Quran 112:1-4 (Al-Ikhlas)',
        },
        {
          type: 'quiz',
          question: { es: '¿Cuántos Allah hay?', ar: 'كم عدد الإله؟', en: 'How many Allahs are there?' },
          options: ['1', '2', '3', 'Muchos'],
          correct: 0,
          feedback: { es: '¡Sí! Allah es Uno. 🌟', ar: 'نعم! الله واحد. 🌟', en: 'Yes! Allah is One. 🌟' },
        },
        // ── v20: extended kids content ────────────────────────────
        {
          type: 'card',
          title: { es: 'Allah ve todo lo que hacemos', ar: 'الله يرى كل ما نفعل', en: 'Allah sees everything we do' },
          content: {
            es: '👁️ Allah ve TODO — cuando juegas, cuando comes, cuando duermes.\n\n✨ Cuando haces algo bueno (compartir, ayudar, sonreír), Allah te ve y te ama.\n\n💫 Los ángeles escriben todo lo bueno que haces. ¡Trata de llenar tu libro de buenas obras!',
            ar: '👁️ الله يرى كلّ شيء — عندما تلعب، عندما تأكل، عندما تنام.\n\n✨ عندما تعمل خيراً (تشارك، تساعد، تبتسم)، الله يراك ويحبّك.\n\n💫 الملائكة تكتب كلّ حسنة. حاول أن تملأ كتابك بالحسنات!',
            en: '👁️ Allah sees EVERYTHING — when you play, eat, sleep.\n\n✨ When you do something good (share, help, smile), Allah sees you and loves you.\n\n💫 Angels write down every good deed. Try to fill your book with good deeds!',
          },
          source: 'Quran 96:14 · Sahih Muslim 8',
        },
        {
          type: 'quiz',
          question: { es: '¿Quién ve todo lo que haces, incluso cuando estás solo?', ar: 'من يرى كل ما تفعله حتى وأنت وحدك؟', en: 'Who sees everything you do, even when alone?' },
          options: [
            { es: 'Nadie 🙈', ar: 'لا أحد', en: 'Nobody 🙈' },
            { es: 'Allah 🌟', ar: 'الله', en: 'Allah 🌟' },
            { es: 'Solo mi mamá', ar: 'أمي فقط', en: 'Only my mom' },
            { es: 'Los pájaros 🐦', ar: 'الطيور', en: 'The birds 🐦' },
          ],
          correct: 1,
          feedback: {
            es: '¡Sí! Allah nos ve siempre, en todo lugar y en todo momento. ✨',
            ar: 'نعم! الله يرانا دائماً في كلّ مكان وكلّ وقت. ✨',
            en: 'Yes! Allah sees us always, everywhere, at all times. ✨',
          },
        },
      ],
    },
    {
      id: 'the_prophet',
      icon: '<i class="fas fa-mosque"></i>',
      title: { es: 'Nuestro Profeta ﷺ', ar: 'نبيّنا ﷺ', en: 'Our Prophet ﷺ' },
      mascotIntro: { es: 'El Profeta Muhammad ﷺ era el mejor amigo de Allah.', ar: 'النبي محمد ﷺ كان أحبّ الناس إلى الله.', en: 'Prophet Muhammad ﷺ was Allah\'s most beloved.' },
      lessons: [
        {
          type: 'card',
          title: { es: 'El Profeta amaba a los niños', ar: 'النبي ﷺ يحبّ الأطفال', en: 'The Prophet loved children' },
          content: {
            es: '👶 El Profeta Muhammad ﷺ jugaba con los niños, los abrazaba y les sonreía. Decía: "No es de los nuestros quien no es misericordioso con nuestros pequeños."',
            ar: '👶 كان النبي ﷺ يلعب مع الأطفال ويعانقهم ويبتسم لهم. قال: "ليس منا من لم يرحم صغيرنا."',
            en: '👶 Prophet Muhammad ﷺ played with children, hugged them, and smiled at them. He said: "He is not of us who does not show mercy to our young."',
          },
          source: 'Sunan Abu Dawud 4943',
        },
        {
          type: 'quiz',
          question: { es: '¿Cómo trataba el Profeta ﷺ a los niños?', ar: 'كيف كان النبي ﷺ يعامل الأطفال؟', en: 'How did the Prophet ﷺ treat children?' },
          options: [
            { es: 'Con amor y sonrisas', ar: 'بالحبّ والابتسامة', en: 'With love and smiles' },
            { es: 'Los ignoraba', ar: 'كان يتجاهلهم', en: 'Ignored them' },
            { es: 'Solo hablaba con adultos', ar: 'كان يتكلم مع الكبار فقط', en: 'Talked only to adults' },
          ],
          correct: 0,
          feedback: { es: '¡Correcto! 💝 El Profeta amaba mucho a los niños.', ar: 'صحيح! 💝 كان النبي يحبّ الأطفال.', en: 'Correct! 💝 The Prophet loved children dearly.' },
        },
        // ── v20: extended prophet content ─────────────────────────
        {
          type: 'card',
          title: { es: 'La historia de Hassan y Hussain', ar: 'قصة الحسن والحسين', en: 'The story of Hassan and Hussain' },
          content: {
            es: '👦👦 El Profeta ﷺ tenía dos nietos que amaba mucho: **Hassan** y **Hussain**.\n\n🕌 Un día, mientras el Profeta ﷺ estaba en Sujud (postración), sus nietos se subieron a su espalda. ¡El Profeta ﷺ alargó su Sujud para no molestarlos! 😊\n\n💝 Él decía: «Estos dos son mis flores en este mundo.» (Bukhari 5994)\n\n💡 ¡El Profeta ﷺ era muy tierno con los niños!',
            ar: '👦👦 كان للنبي ﷺ حفيدان يحبّهما كثيراً: **الحسن** و **الحسين**.\n\n🕌 يوم صعدا على ظهره وهو ساجد في الصلاة، فأطال ﷺ السجود حتى نزلا! 😊\n\n💝 وكان يقول: «هما ريحانتاي من الدنيا.» (البخاري 5994)\n\n💡 كان النبي ﷺ رحيماً جداً بالأطفال!',
            en: '👦👦 The Prophet ﷺ had two grandsons he loved dearly: **Hassan** and **Hussain**.\n\n🕌 One day while the Prophet ﷺ was in Sujud (prostration), they climbed on his back. He ﷺ lengthened his Sujud so as not to disturb them! 😊\n\n💝 He said: «These two are my flowers in this world.» (Bukhari 5994)\n\n💡 The Prophet ﷺ was so gentle with children!',
          },
          source: 'Sahih al-Bukhari 5994 · An-Nasa\'i 1141',
        },
        {
          type: 'quiz',
          question: { es: '¿Cómo se llamaban los nietos que el Profeta ﷺ amaba mucho?', ar: 'ما اسم حفيدَي النبي ﷺ اللذين كان يحبّهما كثيراً؟', en: 'What were the names of the Prophet\'s ﷺ beloved grandsons?' },
          options: [
            { es: 'Ali y Umar', ar: 'علي وعمر', en: 'Ali and Umar' },
            { es: 'Hassan y Hussain', ar: 'الحسن والحسين', en: 'Hassan and Hussain' },
            { es: 'Abu Bakr y Bilal', ar: 'أبو بكر وبلال', en: 'Abu Bakr and Bilal' },
            { es: 'Yaqub y Yusuf', ar: 'يعقوب ويوسف', en: 'Yaqub and Yusuf' },
          ],
          correct: 1,
          feedback: {
            es: '¡Correcto! 🌸 Hassan y Hussain — «las dos flores» del Profeta ﷺ.',
            ar: 'صحيح! 🌸 الحسن والحسين — «ريحانتا» النبي ﷺ.',
            en: 'Correct! 🌸 Hassan and Hussain — the Prophet\'s ﷺ «two flowers».',
          },
        },
      ],
    },
    {
      id: 'good_manners',
      icon: '<i class="fas fa-spa"></i>',
      title: { es: 'Buenos Modales', ar: 'الأخلاق الحسنة', en: 'Good Manners' },
      mascotIntro: { es: '¿Sabías que decir Salam es como regalar flores?', ar: 'هل تعلم أن السلام كالهدية؟', en: 'Did you know saying Salam is like giving a gift?' },
      lessons: [
        {
          type: 'card',
          title: { es: 'Di siempre Bismillah 🍎', ar: 'قُل بسم الله 🍎', en: 'Always say Bismillah 🍎' },
          content: {
            es: 'Antes de comer: 🍎 Bismillah ("En el nombre de Allah").\nDespués: 🤲 Alhamdulillah ("Gracias a Allah").\nAl saludar: 👋 As-salamu alaykum ("La paz sea contigo").',
            ar: 'قبل الأكل: 🍎 بسم الله.\nبعد الأكل: 🤲 الحمد لله.\nعند السلام: 👋 السلام عليكم.',
            en: 'Before eating: 🍎 Bismillah ("In Allah\'s name").\nAfter eating: 🤲 Alhamdulillah ("Praise be to Allah").\nWhen greeting: 👋 As-salamu alaykum ("Peace be upon you").',
          },
          source: 'Sahih al-Bukhari 5376',
        },
        {
          type: 'flashcards',
          title: { es: 'Aprende estas palabras', ar: 'تعلّم هذه الكلمات', en: 'Learn these words' },
          cards: [
            { front: '🍎', back: { es: 'Bismillah', ar: 'بسم الله', en: 'Bismillah' } },
            { front: '🤲', back: { es: 'Alhamdulillah', ar: 'الحمد لله', en: 'Alhamdulillah' } },
            { front: '👋', back: { es: 'As-salamu alaykum', ar: 'السلام عليكم', en: 'As-salamu alaykum' } },
            { front: '🙏', back: { es: 'Subhan Allah', ar: 'سبحان الله', en: 'Subhan Allah' } },
          ],
        },
        // ── v20: more good manners for kids ────────────────────────
        {
          type: 'card',
          title: { es: 'Sé bueno con los animales 🐱', ar: 'كن رحيماً بالحيوانات 🐱', en: 'Be kind to animals 🐱' },
          content: {
            es: '🐈 El Profeta ﷺ amaba a los animales. Contó la historia de una mujer que vio un perro sediento en el desierto. Le dio agua de su zapato, ¡y Allah la perdonó por eso! (Bukhari 3321)\n\n💝 Cómo ser bueno con los animales:\n• 🍖 Darles comida y agua.\n• 🚫 Nunca lastimarlos ni pegarles.\n• 🐦 No romper los nidos de los pájaros.\n• 🌸 Cuidar a las mascotas.\n\n📖 «Allah es bondadoso y ama la bondad en todo.» (Muslim 2593)',
            ar: '🐈 كان النبي ﷺ يحبّ الحيوانات. حكى قصة امرأة رأت كلباً عطشاناً في الصحراء، فسقته من حذائها، فغفر الله لها! (البخاري 3321)\n\n💝 كيف نكون رحماء بالحيوانات:\n• 🍖 نطعمها ونسقيها.\n• 🚫 لا نؤذيها أبداً.\n• 🐦 لا نكسر أعشاش الطيور.\n• 🌸 نعتني بحيواناتنا الأليفة.\n\n📖 «إنّ الله رفيق يحبّ الرفق في الأمر كلّه.» (مسلم 2593)',
            en: '🐈 The Prophet ﷺ loved animals. He told the story of a woman who saw a thirsty dog in the desert. She gave it water from her shoe, and Allah forgave her for that! (Bukhari 3321)\n\n💝 How to be kind to animals:\n• 🍖 Give them food and water.\n• 🚫 Never hurt or hit them.\n• 🐦 Don\'t break birds\' nests.\n• 🌸 Take care of pets.\n\n📖 «Allah is kind and loves kindness in all matters.» (Muslim 2593)',
          },
          source: 'Sahih al-Bukhari 3321 · Sahih Muslim 2593',
        },
        {
          type: 'quiz',
          question: { es: '¿Qué le pasó a la mujer que dio agua al perro sediento?', ar: 'ماذا حدث للمرأة التي سقت الكلب العطشان؟', en: 'What happened to the woman who gave water to the thirsty dog?' },
          options: [
            { es: 'Se enfadó', ar: 'غضبت', en: 'She got angry' },
            { es: 'Allah la perdonó y la premió 💝', ar: 'غفر الله لها', en: 'Allah forgave her and rewarded her 💝' },
            { es: 'Se cansó', ar: 'تعبت', en: 'She got tired' },
            { es: 'Perdió su zapato', ar: 'فقدت حذاءها', en: 'She lost her shoe' },
          ],
          correct: 1,
          feedback: {
            es: '¡Sí! 💝 Allah la perdonó por su bondad con el animal. ¡La bondad tiene una GRAN recompensa!',
            ar: 'نعم! 💝 غفر الله لها لرحمتها بالحيوان. الرحمة لها ثواب عظيم!',
            en: 'Yes! 💝 Allah forgave her for her kindness to the animal. Kindness has HUGE reward!',
          },
        },
        {
          type: 'card',
          title: { es: 'Comparte con tus amigos 🍎', ar: 'شارك مع أصدقائك 🍎', en: 'Share with your friends 🍎' },
          content: {
            es: '💫 El Profeta ﷺ dijo:\n\n«Ninguno de vosotros creerá verdaderamente hasta que quiera para su hermano lo que quiere para sí mismo.» (Bukhari 13)\n\n🍎 Cuando tengas dos manzanas, da una a tu amigo.\n🎮 Cuando juegues, comparte tus juguetes.\n📚 Cuando aprendas algo, enseña a otros.\n\n💝 Compartir hace felices a los demás Y a Allah.\n\n😊 ¡Un corazón que comparte es un corazón grande!',
            ar: '💫 قال النبي ﷺ:\n\n«لا يؤمن أحدكم حتى يحبّ لأخيه ما يحبّ لنفسه.» (البخاري 13)\n\n🍎 إذا كان لديك تفّاحتان، أعطِ واحدة لصديقك.\n🎮 عند اللعب، شارك ألعابك.\n📚 إذا تعلّمت شيئاً، علّم الآخرين.\n\n💝 المشاركة تُسعد الآخرين وتُرضي الله.\n\n😊 القلب الذي يشارك قلب كبير!',
            en: '💫 The Prophet ﷺ said:\n\n«None of you truly believes until he loves for his brother what he loves for himself.» (Bukhari 13)\n\n🍎 When you have two apples, give one to your friend.\n🎮 When you play, share your toys.\n📚 When you learn something, teach others.\n\n💝 Sharing makes others AND Allah happy.\n\n😊 A sharing heart is a big heart!',
          },
          source: 'Sahih al-Bukhari 13',
        },
        {
          type: 'quiz',
          question: { es: '¿Qué hacen los niños musulmanes cuando tienen algo bueno?', ar: 'ماذا يفعل الأطفال المسلمون عندما يكون لديهم شيء جميل؟', en: 'What do Muslim children do when they have something good?' },
          options: [
            { es: 'Guardarlo solo para ellos 😤', ar: 'يحتفظون به لأنفسهم', en: 'Keep it only for themselves 😤' },
            { es: 'Compartirlo con otros 💝', ar: 'يشاركون الآخرين', en: 'Share it with others 💝' },
            { es: 'Esconderlo', ar: 'يخفونه', en: 'Hide it' },
            { es: 'Tirarlo', ar: 'يرمونه', en: 'Throw it away' },
          ],
          correct: 1,
          feedback: {
            es: '¡Correcto! 💝 Compartir es de las cosas más queridas por Allah y el Profeta ﷺ.',
            ar: 'صحيح! 💝 المشاركة من أحبّ الأعمال إلى الله ونبيّه ﷺ.',
            en: 'Correct! 💝 Sharing is among the most beloved acts to Allah and the Prophet ﷺ.',
          },
        },
        {
          type: 'card',
          title: { es: 'La honestidad — nunca mientas 🌟', ar: 'الصدق — لا تكذب أبداً 🌟', en: 'Honesty — never lie 🌟' },
          content: {
            es: '🌟 Los musulmanes SIEMPRE dicen la verdad.\n\n📖 El Profeta ﷺ dijo:\n«La verdad lleva a la bondad, y la bondad al Paraíso. La mentira lleva a lo malo, y lo malo al Fuego.» (Bukhari 6094)\n\n😊 Aunque tengas miedo, di la verdad — Allah te ama por ser honesto.\n\n💡 Los profetas eran los MÁS honestos. El Profeta Muhammad ﷺ era llamado «Al-Amin» (el confiable) antes del Islam.\n\n✨ La honestidad es una LUZ en tu corazón.',
            ar: '🌟 المسلم يقول الصدق دائماً.\n\n📖 قال النبي ﷺ:\n«إنّ الصدق يهدي إلى البرّ، وإنّ البرّ يهدي إلى الجنّة. وإنّ الكذب يهدي إلى الفجور، وإنّ الفجور يهدي إلى النار.» (البخاري 6094)\n\n😊 حتى لو خفتَ، قل الحقّ — الله يحبّك على صدقك.\n\n💡 الأنبياء كانوا أصدق الناس. كان النبي محمد ﷺ يُلقّب بـ «الأمين» قبل الإسلام.\n\n✨ الصدق نور في القلب.',
            en: '🌟 Muslims ALWAYS tell the truth.\n\n📖 The Prophet ﷺ said:\n«Truthfulness leads to righteousness, and righteousness to Paradise. Lying leads to evil, and evil to the Fire.» (Bukhari 6094)\n\n😊 Even if you\'re scared, tell the truth — Allah loves you for being honest.\n\n💡 The Prophets were the MOST honest. Prophet Muhammad ﷺ was called «Al-Amin» (the trustworthy) before Islam.\n\n✨ Honesty is a LIGHT in your heart.',
          },
          source: 'Sahih al-Bukhari 6094 · Sahih Muslim 2607',
        },
        {
          type: 'quiz',
          question: { es: '¿Qué apodo tenía el Profeta ﷺ antes del Islam?', ar: 'ما كان لقب النبي ﷺ قبل الإسلام؟', en: 'What was the Prophet\'s ﷺ nickname before Islam?' },
          options: [
            { es: 'Al-Amin (el confiable) 🌟', ar: 'الأمين', en: 'Al-Amin (the trustworthy) 🌟' },
            { es: 'Al-Malik (el rey)', ar: 'الملك', en: 'Al-Malik (the king)' },
            { es: 'Al-Kabir (el grande)', ar: 'الكبير', en: 'Al-Kabir (the great)' },
            { es: 'Al-Ghani (el rico)', ar: 'الغني', en: 'Al-Ghani (the rich)' },
          ],
          correct: 0,
          feedback: {
            es: '¡Al-Amin! 🌟 Todos confiaban en él, incluso los que no eran musulmanes.',
            ar: 'الأمين! 🌟 كان الجميع يثقون به، حتى غير المسلمين.',
            en: 'Al-Amin! 🌟 Everyone trusted him, even those who weren\'t Muslim.',
          },
        },
      ],
    },
    // ── v20: NEW STATION 4: Du'as for kids ─────────────────────────
    {
      id: 'kids_duas',
      icon: '<i class="fas fa-hands-praying"></i>',
      title: { es: 'Mis primeras Du\'as 🤲', ar: 'أولى دعواتي 🤲', en: 'My first Du\'as 🤲' },
      mascotIntro: {
        es: '¡Vamos a aprender pequeñas Du\'as (súplicas) para cada momento del día!',
        ar: 'هيا نتعلّم أدعية صغيرة لكلّ وقت من اليوم!',
        en: 'Let\'s learn small Du\'as (supplications) for every moment of the day!',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'Al despertar 🌅', ar: 'عند الاستيقاظ 🌅', en: 'When waking up 🌅' },
          content: {
            es: 'Al abrir tus ojos por la mañana, di:\n\nالْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ\n\n«Al-hamdu lillahi alladhi ahyana ba\'da ma amatana wa ilayhil-nushur»\n\n«Alabado sea Allah que nos dio la vida después de la muerte (sueño), y a Él es el retorno.»',
            ar: 'عند فتح عينيك في الصباح، قل:\n\nالْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
            en: 'When you open your eyes in the morning, say:\n\nالْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ\n\n«Al-hamdu lillahi alladhi ahyana ba\'da ma amatana wa ilayhil-nushur»\n\n«Praise be to Allah who gave us life after death (sleep), and to Him is the return.»',
          },
          source: 'Sahih al-Bukhari 6312',
        },
        {
          type: 'card',
          title: { es: 'Antes de comer 🍽️', ar: 'قبل الأكل 🍽️', en: 'Before eating 🍽️' },
          content: {
            es: 'Antes de comer, di:\n\nبِسْمِ اللَّهِ · «Bismillah» · «En el nombre de Allah»\n\nSi olvidaste al principio, di al recordarlo:\n\nبِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ · «Bismillahi awwalahu wa akhirahu»',
            ar: 'قبل الأكل قل: بسم الله.\n\nوإن نسيتَ في البداية فقل عند التذكّر:\n\nبِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ',
            en: 'Before eating, say:\n\nبِسْمِ اللَّهِ · «Bismillah» · «In the name of Allah»\n\nIf you forget at the start, say when you remember:\n\nبِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ',
          },
          source: 'Sunan Abu Dawud 3767',
        },
        {
          type: 'card',
          title: { es: 'Después de comer 🤲', ar: 'بعد الأكل 🤲', en: 'After eating 🤲' },
          content: {
            es: 'Después de comer, di:\n\nالْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ\n\n«Gracias a Allah que nos alimentó y nos dio de beber, y nos hizo musulmanes.»',
            ar: 'بعد الأكل قل:\n\nالْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
            en: 'After eating, say:\n\nالْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ\n\n«Praise be to Allah who fed us, gave us drink, and made us Muslims.»',
          },
          source: 'Sunan Abu Dawud 3850',
        },
        {
          type: 'card',
          title: { es: 'Al dormir 😴', ar: 'عند النوم 😴', en: 'When sleeping 😴' },
          content: {
            es: 'Antes de dormir, di 3 veces:\n\nبِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا\n\n«En Tu nombre, oh Allah, muero y vivo.»\n\n🌙 También puedes recitar la Sura Al-Ikhlas (قل هو الله أحد) y las 2 Mu\'awwidhat (Falaq y Nas) 3 veces, y luego frotar tu cuerpo. El Profeta ﷺ lo hacía cada noche. (Bukhari 5017)',
            ar: 'قبل النوم قل:\n\nبِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا\n\n🌙 ويُستحبّ قراءة الإخلاص والمعوّذتين 3 مرّات، ومسح الجسد. (البخاري 5017)',
            en: 'Before sleeping, say:\n\nبِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا\n\n«In Your name, O Allah, I die and I live.»\n\n🌙 You can also recite Surah Al-Ikhlas and the 2 Mu\'awwidhat (Falaq and Nas) 3 times, then wipe your body. The Prophet ﷺ did this every night. (Bukhari 5017)',
          },
          source: 'Sahih al-Bukhari 6314 & 5017',
        },
        {
          type: 'flashcards',
          title: { es: 'Aprende las Du\'as', ar: 'تعلّم الأدعية', en: 'Learn the Du\'as' },
          cards: [
            { front: '🌅', back: { es: 'Al despertar: Alhamdulillah...', ar: 'الاستيقاظ: الحمد لله...', en: 'Waking: Alhamdulillah...' } },
            { front: '🍽️', back: { es: 'Antes de comer: Bismillah', ar: 'قبل الأكل: بسم الله', en: 'Before eating: Bismillah' } },
            { front: '🤲', back: { es: 'Después: Alhamdulillah', ar: 'بعد الأكل: الحمد لله', en: 'After: Alhamdulillah' } },
            { front: '😴', back: { es: 'Al dormir: Bismika Allahumma...', ar: 'النوم: باسمك اللهم...', en: 'Sleep: Bismika Allahumma...' } },
            { front: '🚪', back: { es: 'Al entrar al baño: Allahumma inni...', ar: 'دخول الخلاء: اللهم إني...', en: 'Bathroom: Allahumma inni...' } },
            { front: '🚗', back: { es: 'En vehículo: Subhana alladhi...', ar: 'الركوب: سبحان الذي...', en: 'Vehicle: Subhana alladhi...' } },
          ],
        },
        {
          type: 'quiz',
          question: { es: '¿Qué dices ANTES de comer?', ar: 'ماذا تقول قبل الأكل؟', en: 'What do you say BEFORE eating?' },
          options: [
            { es: 'Alhamdulillah', ar: 'الحمد لله', en: 'Alhamdulillah' },
            { es: 'Bismillah 🍎', ar: 'بسم الله', en: 'Bismillah 🍎' },
            { es: 'Allahu Akbar', ar: 'الله أكبر', en: 'Allahu Akbar' },
            { es: 'La ilaha illa Allah', ar: 'لا إله إلا الله', en: 'La ilaha illa Allah' },
          ],
          correct: 1,
          feedback: {
            es: '¡Sí! 🍎 «Bismillah» — en el nombre de Allah. Luego, después de comer, decimos «Alhamdulillah».',
            ar: 'نعم! 🍎 «بسم الله» قبل، و«الحمد لله» بعد.',
            en: 'Yes! 🍎 «Bismillah» — in the name of Allah. After eating, say «Alhamdulillah».',
          },
        },
        {
          type: 'quiz',
          question: { es: '¿Qué haces al dormir para protegerte?', ar: 'ماذا تفعل عند النوم لتحفظ نفسك؟', en: 'What do you do when sleeping to protect yourself?' },
          options: [
            { es: 'Nada', ar: 'لا شيء', en: 'Nothing' },
            { es: 'Recitar Al-Ikhlas y las 2 Mu\'awwidhat 🌙', ar: 'قراءة الإخلاص والمعوّذتين', en: 'Recite Al-Ikhlas and the 2 Mu\'awwidhat 🌙' },
            { es: 'Ver la TV', ar: 'أشاهد التلفاز', en: 'Watch TV' },
            { es: 'Correr', ar: 'أركض', en: 'Run' },
          ],
          correct: 1,
          feedback: {
            es: '¡Sí! 🌙 El Profeta ﷺ las recitaba cada noche. Te protegen mientras duermes.',
            ar: 'نعم! 🌙 كان النبي ﷺ يقرأها كلّ ليلة. تحفظك أثناء النوم.',
            en: 'Yes! 🌙 The Prophet ﷺ recited them every night. They protect you while you sleep.',
          },
        },
      ],
    },
  ],
};

if (typeof window !== 'undefined') window.COURSE_KIDS = COURSE_KIDS;
