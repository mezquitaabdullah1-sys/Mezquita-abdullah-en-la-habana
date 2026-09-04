// 📚 Mini-curso: Cómo rezar paso a paso — TRILINGÜE (es/ar/en)
// v21: title/description/content/tip ahora son objetos {es, ar, en}.
// Nota: las etiquetas HTML internas (<strong>, <ol>, <li>, etc.) se conservan intactas en los tres idiomas.
const COURSE_HOW_TO_PRAY = {
  id: 'how_to_pray',
  title: {
    es: 'Cómo rezar paso a paso',
    ar: 'كيف تصلي خطوة بخطوة',
    en: 'How to pray step by step',
  },
  description: {
    es: 'Aprende a realizar la oración (salat) correctamente desde cero.',
    ar: 'تعلّم كيفية أداء الصلاة بشكل صحيح من الصفر.',
    en: 'Learn how to perform the prayer (salah) correctly from scratch.',
  },
  icon: '<i class="fas fa-mosque"></i>',
  color: '#0F4C3A',
  duration: '15 min',
  lessons: [
    {
      id: 'lesson_1',
      title: {
        es: '1. Preparación: Wudu (Ablución)',
        ar: '1. التهيئة: الوضوء',
        en: '1. Preparation: Wudu (Ablution)',
      },
      content: {
        es: `<p>Antes de orar, realiza el <strong>wudu</strong> (ablución):</p>
<ol>
  <li>Di "Bismillah" e intenta la pureza con el corazón.</li>
  <li>Lava las <strong>manos</strong> 3 veces (hasta las muñecas).</li>
  <li>Enjuaga la <strong>boca</strong> 3 veces.</li>
  <li>Inhala agua por la <strong>nariz</strong> y sopla 3 veces.</li>
  <li>Lava la <strong>cara</strong> 3 veces.</li>
  <li>Lava los <strong>brazos</strong> hasta los codos (derecho luego izquierdo), 3 veces cada uno.</li>
  <li>Pasa las manos mojadas por la <strong>cabeza</strong> una vez.</li>
  <li>Limpia las <strong>orejas</strong> con los dedos índices y pulgares.</li>
  <li>Lava los <strong>pies</strong> hasta los tobillos (derecho luego izquierdo), 3 veces.</li>
</ol>
<p>💡 El wudu se mantiene válido hasta que algo lo invalida (orinar, defecar, gases, sueño profundo, etc.).</p>`,
        ar: `<p>قبل الصلاة، توضّأ <strong>الوضوء</strong>:</p>
<ol>
  <li>قل "بسم الله" وانوِ الطهارة بقلبك.</li>
  <li>اغسل <strong>اليدين</strong> 3 مرات (حتى الرسغين).</li>
  <li>تمضمض <strong>الفم</strong> 3 مرات.</li>
  <li>استنشق الماء <strong>بالأنف</strong> واستنثر 3 مرات.</li>
  <li>اغسل <strong>الوجه</strong> 3 مرات.</li>
  <li>اغسل <strong>الذراعين</strong> حتى المرفقين (الأيمن ثم الأيسر)، 3 مرات لكل منهما.</li>
  <li>امسح بيدين مبللتين على <strong>الرأس</strong> مرة واحدة.</li>
  <li>نظّف <strong>الأذنين</strong> بالسبابتين والإبهامين.</li>
  <li>اغسل <strong>القدمين</strong> حتى الكعبين (اليمنى ثم اليسرى)، 3 مرات لكل منهما.</li>
</ol>
<p>💡 يبقى الوضوء صحيحاً حتى ينتقض بأحد نواقضه (التبول، التغوط، الغازات، النوم العميق، إلخ).</p>`,
        en: `<p>Before praying, perform <strong>wudu</strong> (ablution):</p>
<ol>
  <li>Say "Bismillah" and intend purity in your heart.</li>
  <li>Wash the <strong>hands</strong> 3 times (up to the wrists).</li>
  <li>Rinse the <strong>mouth</strong> 3 times.</li>
  <li>Sniff water into the <strong>nose</strong> and blow it out 3 times.</li>
  <li>Wash the <strong>face</strong> 3 times.</li>
  <li>Wash the <strong>arms</strong> up to the elbows (right then left), 3 times each.</li>
  <li>Wipe wet hands over the <strong>head</strong> once.</li>
  <li>Clean the <strong>ears</strong> with the index fingers and thumbs.</li>
  <li>Wash the <strong>feet</strong> up to the ankles (right then left), 3 times each.</li>
</ol>
<p>💡 Wudu remains valid until something invalidates it (urinating, defecating, passing gas, deep sleep, etc.).</p>`,
      },
      tip: {
        es: 'Hadiz: "La limpieza es la mitad de la fe" (Muslim).',
        ar: 'حديث: "الطُّهُورُ شَطْرُ الإِيمَانِ" (رواه مسلم).',
        en: 'Hadith: "Purity is half of faith" (Muslim).',
      },
    },
    {
      id: 'lesson_2',
      title: {
        es: '2. Niyyah (Intención) y Takbir',
        ar: '2. النية والتكبير',
        en: '2. Niyyah (Intention) and Takbir',
      },
      content: {
        es: `<p>Antes de empezar:</p>
<ul>
  <li>Verifica que estás <strong>en dirección a la Qibla</strong> (La Meca).</li>
  <li>Cubre tu 'awrah (partes íntimas).</li>
  <li>Haz la <strong>niyyah</strong> en tu corazón: "Voy a rezar [Fajr/Dhuhr/etc.]"</li>
  <li>Levanta las manos hasta las orejas/hombros y di:</li>
</ul>
<p class="arabic-block">اللَّهُ أَكْبَرُ</p>
<p><em>Allahu Akbar</em> — "Allah es el más Grande"</p>
<p>Esto se llama <strong>Takbir al-Ihram</strong> y marca el inicio formal de la oración.</p>`,
        ar: `<p>قبل أن تبدأ:</p>
<ul>
  <li>تأكد أنك <strong>متجه نحو القبلة</strong> (مكة المكرمة).</li>
  <li>استر عورتك.</li>
  <li>اعقد <strong>النية</strong> في قلبك: "سأصلي [الفجر/الظهر/إلخ]"</li>
  <li>ارفع يديك إلى حذاء أذنيك/كتفيك وقل:</li>
</ul>
<p class="arabic-block">اللَّهُ أَكْبَرُ</p>
<p><em>الله أكبر</em> — "الله أكبر من كل شيء"</p>
<p>هذا يسمى <strong>تكبيرة الإحرام</strong> وبه يبدأ الدخول الرسمي في الصلاة.</p>`,
        en: `<p>Before you begin:</p>
<ul>
  <li>Make sure you are <strong>facing the Qibla</strong> (Makkah).</li>
  <li>Cover your 'awrah (private parts).</li>
  <li>Make the <strong>niyyah</strong> in your heart: "I will pray [Fajr/Dhuhr/etc.]"</li>
  <li>Raise your hands to your ears/shoulders and say:</li>
</ul>
<p class="arabic-block">اللَّهُ أَكْبَرُ</p>
<p><em>Allahu Akbar</em> — "Allah is the Greatest"</p>
<p>This is called <strong>Takbir al-Ihram</strong> and marks the formal start of the prayer.</p>`,
      },
      tip: {
        es: 'Desde este momento, no hables ni hagas movimientos innecesarios.',
        ar: 'من هذه اللحظة، لا تتكلم ولا تتحرك حركات غير ضرورية.',
        en: 'From this moment on, do not speak or make unnecessary movements.',
      },
    },
    {
      id: 'lesson_3',
      title: {
        es: '3. Qiyam (De pie): Al-Fatihah',
        ar: '3. القيام: قراءة الفاتحة',
        en: '3. Qiyam (Standing): Al-Fatihah',
      },
      content: {
        es: `<p>Coloca la mano derecha sobre la izquierda sobre el pecho. Recita:</p>
<p class="arabic-block">سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ</p>
<p><em>Subhanaka Allahumma...</em> (Du'a al-Istiftah)</p>
<p>Luego recita <strong>Al-Fatihah</strong>:</p>
<p class="arabic-block">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ • الرَّحْمَٰنِ الرَّحِيمِ • مَالِكِ يَوْمِ الدِّينِ • إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ • اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ • صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ</p>
<p>Di "Ameen" al terminar. Luego recita una sura corta (en los 2 primeros rak'ah).</p>`,
        ar: `<p>ضع يدك اليمنى على اليسرى على صدرك. اقرأ:</p>
<p class="arabic-block">سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ</p>
<p><em>سبحانك اللهم...</em> (دعاء الاستفتاح)</p>
<p>ثم اقرأ <strong>سورة الفاتحة</strong>:</p>
<p class="arabic-block">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ • الرَّحْمَٰنِ الرَّحِيمِ • مَالِكِ يَوْمِ الدِّينِ • إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ • اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ • صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ</p>
<p>قل "آمين" عند الانتهاء. ثم اقرأ سورة قصيرة (في أول ركعتين).</p>`,
        en: `<p>Place your right hand over your left on your chest. Recite:</p>
<p class="arabic-block">سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ</p>
<p><em>Subhanaka Allahumma...</em> (Du'a al-Istiftah — opening supplication)</p>
<p>Then recite <strong>Al-Fatihah</strong>:</p>
<p class="arabic-block">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ • الرَّحْمَٰنِ الرَّحِيمِ • مَالِكِ يَوْمِ الدِّينِ • إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ • اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ • صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ</p>
<p>Say "Ameen" when finished. Then recite a short surah (in the first 2 rak'ah).</p>`,
      },
      tip: {
        es: "Al-Fatihah se recita en TODOS los rak'ahs. Es obligatoria.",
        ar: 'تُقرأ الفاتحة في كل الركعات. وهي واجبة.',
        en: "Al-Fatihah is recited in EVERY rak'ah. It is obligatory.",
      },
    },
    {
      id: 'lesson_4',
      title: {
        es: '4. Ruku (Inclinación)',
        ar: '4. الركوع',
        en: '4. Ruku (Bowing)',
      },
      content: {
        es: `<p>Di "Allahu Akbar" y inclínate poniendo las manos sobre las rodillas. Espalda recta, paralela al suelo.</p>
<p>Repite 3 veces:</p>
<p class="arabic-block">سُبْحَانَ رَبِّيَ الْعَظِيمِ</p>
<p><em>Subhana Rabbiya al-'Adheem</em> — "Glorificado sea mi Señor, el Grandioso"</p>
<p>Luego levántate diciendo:</p>
<p class="arabic-block">سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ</p>
<p><em>Sami' Allahu liman hamidah</em> — "Allah escucha a quien Le alaba"</p>
<p>Una vez de pie, di:</p>
<p class="arabic-block">رَبَّنَا وَلَكَ الْحَمْدُ</p>
<p><em>Rabbana wa laka-l-hamd</em> — "Señor nuestro, Tuya es la alabanza"</p>`,
        ar: `<p>قل "الله أكبر" واركع واضعاً يديك على ركبتيك. ظهرك مستقيم وموازٍ للأرض.</p>
<p>كرر 3 مرات:</p>
<p class="arabic-block">سُبْحَانَ رَبِّيَ الْعَظِيمِ</p>
<p><em>سبحان ربي العظيم</em> — "سبحان ربي العظيم"</p>
<p>ثم ارفع رأسك قائلاً:</p>
<p class="arabic-block">سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ</p>
<p><em>سمع الله لمن حمده</em> — "سمع الله لمن حمده"</p>
<p>وإذا اعتدلت قائماً فقل:</p>
<p class="arabic-block">رَبَّنَا وَلَكَ الْحَمْدُ</p>
<p><em>ربنا ولك الحمد</em> — "ربنا ولك الحمد"</p>`,
        en: `<p>Say "Allahu Akbar" and bow, placing your hands on your knees. Keep your back straight, parallel to the ground.</p>
<p>Repeat 3 times:</p>
<p class="arabic-block">سُبْحَانَ رَبِّيَ الْعَظِيمِ</p>
<p><em>Subhana Rabbiya al-'Adheem</em> — "Glory be to my Lord, the Magnificent"</p>
<p>Then rise up saying:</p>
<p class="arabic-block">سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ</p>
<p><em>Sami' Allahu liman hamidah</em> — "Allah hears the one who praises Him"</p>
<p>Once standing, say:</p>
<p class="arabic-block">رَبَّنَا وَلَكَ الْحَمْدُ</p>
<p><em>Rabbana wa laka-l-hamd</em> — "Our Lord, to You belongs all praise"</p>`,
      },
      tip: {
        es: 'Mantén la cabeza al nivel de la espalda, sin levantarla ni bajarla.',
        ar: 'أبقِ رأسك بمستوى ظهرك، دون رفعه أو خفضه.',
        en: 'Keep your head level with your back, neither raising nor lowering it.',
      },
    },
    {
      id: 'lesson_5',
      title: {
        es: '5. Sujud (Postración)',
        ar: '5. السجود',
        en: '5. Sujud (Prostration)',
      },
      content: {
        es: `<p>Di "Allahu Akbar" y postérnate, apoyando 7 partes del cuerpo en el suelo:</p>
<ol>
  <li><strong>Frente y nariz</strong></li>
  <li><strong>Ambas palmas de las manos</strong></li>
  <li><strong>Ambas rodillas</strong></li>
  <li><strong>Ambos pies</strong> (puntas tocando el suelo)</li>
</ol>
<p>Repite 3 veces:</p>
<p class="arabic-block">سُبْحَانَ رَبِّيَ الْأَعْلَى</p>
<p><em>Subhana Rabbiya al-A'la</em> — "Glorificado sea mi Señor, el Altísimo"</p>
<p>Luego siéntate brevemente (jalsa), di "Allahu Akbar", y haz una <strong>segunda postración</strong> igual.</p>`,
        ar: `<p>قل "الله أكبر" واسجد، ممكّناً 7 أعضاء من الأرض:</p>
<ol>
  <li><strong>الجبهة والأنف</strong></li>
  <li><strong>كفّي اليدين</strong></li>
  <li><strong>الركبتين</strong></li>
  <li><strong>القدمين</strong> (بأطراف الأصابع على الأرض)</li>
</ol>
<p>كرر 3 مرات:</p>
<p class="arabic-block">سُبْحَانَ رَبِّيَ الْأَعْلَى</p>
<p><em>سبحان ربي الأعلى</em> — "سبحان ربي الأعلى"</p>
<p>ثم اجلس جلسة قصيرة (جلسة الاستراحة)، وقل "الله أكبر"، واسجد <strong>السجدة الثانية</strong> مثلها.</p>`,
        en: `<p>Say "Allahu Akbar" and prostrate, placing 7 body parts on the ground:</p>
<ol>
  <li><strong>Forehead and nose</strong></li>
  <li><strong>Both palms</strong></li>
  <li><strong>Both knees</strong></li>
  <li><strong>Both feet</strong> (toes touching the ground)</li>
</ol>
<p>Repeat 3 times:</p>
<p class="arabic-block">سُبْحَانَ رَبِّيَ الْأَعْلَى</p>
<p><em>Subhana Rabbiya al-A'la</em> — "Glory be to my Lord, the Most High"</p>
<p>Then sit briefly (jalsa), say "Allahu Akbar", and perform a <strong>second prostration</strong> the same way.</p>`,
      },
      tip: {
        es: 'La postración es el momento más cercano a Allah. Aprovecha para pedir.',
        ar: 'السجود هو أقرب ما يكون العبد إلى الله. فاغتنمه بالدعاء.',
        en: 'Prostration is the closest moment to Allah. Make the most of it by supplicating.',
      },
    },
    {
      id: 'lesson_6',
      title: {
        es: "6. Continuar los rak'ah",
        ar: '6. متابعة الركعات',
        en: "6. Continuing the rak'ah",
      },
      content: {
        es: `<p>Esto completa <strong>1 rak'ah</strong>. Cada oración tiene un número específico:</p>
<table class="prayer-rakat-table">
  <tr><th>Oración</th><th>Rak'ahs obligatorios</th></tr>
  <tr><td>Fajr</td><td>2</td></tr>
  <tr><td>Dhuhr</td><td>4</td></tr>
  <tr><td>Asr</td><td>4</td></tr>
  <tr><td>Maghrib</td><td>3</td></tr>
  <tr><td>Isha</td><td>4</td></tr>
</table>
<p>En cada rak'ah, después de los 2 sujud, te levantas para empezar el siguiente.</p>
<p>Tras el 2° rak'ah (y el último), te sientas para el <strong>tashahhud</strong>.</p>`,
        ar: `<p>بهذا تكتمل <strong>ركعة واحدة</strong>. ولكل صلاة عدد محدد:</p>
<table class="prayer-rakat-table">
  <tr><th>الصلاة</th><th>الركعات المفروضة</th></tr>
  <tr><td>الفجر</td><td>2</td></tr>
  <tr><td>الظهر</td><td>4</td></tr>
  <tr><td>العصر</td><td>4</td></tr>
  <tr><td>المغرب</td><td>3</td></tr>
  <tr><td>العشاء</td><td>4</td></tr>
</table>
<p>في كل ركعة، بعد السجدتين، تقوم لبدء الركعة التالية.</p>
<p>وبعد الركعة الثانية (والأخيرة)، تجلس <strong>للتشهد</strong>.</p>`,
        en: `<p>This completes <strong>1 rak'ah</strong>. Each prayer has a specific number:</p>
<table class="prayer-rakat-table">
  <tr><th>Prayer</th><th>Obligatory rak'ah</th></tr>
  <tr><td>Fajr</td><td>2</td></tr>
  <tr><td>Dhuhr</td><td>4</td></tr>
  <tr><td>Asr</td><td>4</td></tr>
  <tr><td>Maghrib</td><td>3</td></tr>
  <tr><td>Isha</td><td>4</td></tr>
</table>
<p>In each rak'ah, after the 2 sujud, you stand up to begin the next one.</p>
<p>After the 2nd rak'ah (and the last one), you sit for the <strong>tashahhud</strong>.</p>`,
      },
      tip: {
        es: "Sigue el orden: Qiyam → Ruku → 2 Sujud → siguiente rak'ah.",
        ar: 'اتبع الترتيب: قيام ← ركوع ← سجدتان ← الركعة التالية.',
        en: "Follow the order: Qiyam → Ruku → 2 Sujud → next rak'ah.",
      },
    },
    {
      id: 'lesson_7',
      title: {
        es: '7. Tashahhud y Taslim (Final)',
        ar: '7. التشهد والتسليم (الختام)',
        en: '7. Tashahhud and Taslim (Ending)',
      },
      content: {
        es: `<p>Después del último sujud, te sientas y dices el <strong>Tashahhud</strong>:</p>
<p class="arabic-block">التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ</p>
<p>Luego añade el <strong>Salat Ibrahimiyyah</strong>:</p>
<p class="arabic-block">اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ...</p>
<p>Finalmente, gira la cabeza a la <strong>derecha</strong> y di:</p>
<p class="arabic-block">السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ</p>
<p>Luego a la <strong>izquierda</strong> y repite. ¡Tu oración está completa! 🎉</p>`,
        ar: `<p>بعد السجدة الأخيرة، اجلس وقل <strong>التشهد</strong>:</p>
<p class="arabic-block">التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ</p>
<p>ثم أضف <strong>الصلاة الإبراهيمية</strong>:</p>
<p class="arabic-block">اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ...</p>
<p>وأخيراً، أدر وجهك إلى <strong>اليمين</strong> وقل:</p>
<p class="arabic-block">السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ</p>
<p>ثم إلى <strong>اليسار</strong> وكررها. صلاتك اكتملت! 🎉</p>`,
        en: `<p>After the last sujud, sit and say the <strong>Tashahhud</strong>:</p>
<p class="arabic-block">التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ</p>
<p>Then add the <strong>Salat Ibrahimiyyah</strong>:</p>
<p class="arabic-block">اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ...</p>
<p>Finally, turn your head to the <strong>right</strong> and say:</p>
<p class="arabic-block">السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ</p>
<p>Then to the <strong>left</strong> and repeat. Your prayer is complete! 🎉</p>`,
      },
      tip: {
        es: 'Después de la oración, haz dhikr (Subhanallah 33, Alhamdulillah 33, Allahu Akbar 33).',
        ar: 'بعد الصلاة، اذكر الله (سبحان الله 33، الحمد لله 33، الله أكبر 33).',
        en: 'After the prayer, make dhikr (Subhanallah 33, Alhamdulillah 33, Allahu Akbar 33).',
      },
    },
  ],
};
