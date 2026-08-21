/* ============================================
   Learn Islam page - Interactive logic
   ============================================ */

const SKY_ANSWERS = {
    identity: {
        titleEs: "¿Quién soy yo?",
        titleAr: "من أنا؟",
        titleEn: "Who am I?",
        titleFr: "Qui suis-je?",
        verseAr: "وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً",
        versesEs: "\"Y cuando tu Señor dijo a los ángeles: 'En verdad, voy a poner en la Tierra un califa [representante]'\"",
        versesEn: "\"And when your Lord said to the angels: 'Indeed, I will place upon the earth a successive authority'\"",
        versesAr: "\"وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً\"",
        versesFr: "\"Lorsque Ton Seigneur dit aux Anges: 'Je vais établir sur la terre un vicaire'\"",
        ref: "Al-Baqarah 2:30",
        explanationEs: "Eres un califa de Allah en la Tierra. Un ser elegido entre toda la creación con dignidad, libertad y propósito. Eres más que un cuerpo: eres un alma eterna, conocida por su Creador antes de nacer.",
        explanationEn: "You are a vicegerent of Allah on Earth. A being chosen from all creation with dignity, freedom and purpose. You are more than a body: you are an eternal soul, known by your Creator before being born.",
        explanationAr: "أنت خليفة الله في الأرض. كائن مختار من بين الخلق بكرامة وحرية وهدف. أنت أكثر من جسد: أنت روح خالدة، يعرفك خالقك قبل أن تولد.",
        explanationFr: "Tu es un vicaire d'Allah sur Terre. Un être choisi avec dignité, liberté et but. Plus qu'un corps: une âme éternelle connue de ton Créateur avant ta naissance."
    },
    pain: {
        titleEs: "¿Por qué sufro?",
        titleAr: "لماذا أتألم؟",
        titleEn: "Why do I suffer?",
        titleFr: "Pourquoi je souffre?",
        verseAr: "وَلَنَبْلُوَنَّكُمْ بِشَيْءٍ مِنَ الْخَوْفِ وَالْجُوعِ وَنَقْصٍ مِنَ الْأَمْوَالِ وَالْأَنْفُسِ وَالثَّمَرَاتِ ۗ وَبَشِّرِ الصَّابِرِينَ",
        versesEs: "\"Os pondremos a prueba con algo de temor, hambre, mengua de bienes, vidas y frutos. ¡Pero anuncia buenas nuevas a los pacientes!\"",
        versesEn: "\"And We will surely test you with something of fear and hunger and a loss of wealth and lives and fruits, but give good tidings to the patient\"",
        versesAr: "\"وَلَنَبْلُوَنَّكُمْ بِشَيْءٍ مِنَ الْخَوْفِ وَالْجُوعِ وَنَقْصٍ مِنَ الْأَمْوَالِ وَالْأَنْفُسِ وَالثَّمَرَاتِ ۗ وَبَشِّرِ الصَّابِرِينَ\"",
        versesFr: "\"Très certainement, Nous vous éprouverons par un peu de peur, de faim et de diminution de biens, de personnes et de fruits. Et fais la bonne annonce aux endurants\"",
        ref: "Al-Baqarah 2:155",
        explanationEs: "El dolor no es castigo: es prueba. Allah eleva a quienes ama con dificultades, como el oro se purifica con fuego. Cada lágrima en este mundo lava un pecado, cada paciencia se convierte en luz eterna. Tu sufrimiento tiene sentido.",
        explanationEn: "Pain is not punishment: it is a test. Allah elevates those He loves through difficulties, as gold is purified by fire. Every tear in this world washes a sin, every patience becomes eternal light. Your suffering has meaning.",
        explanationAr: "الألم ليس عقاباً: إنه ابتلاء. الله يرفع من يحبهم بالمصاعب، كما يُصفّى الذهب بالنار. كل دمعة في هذا العالم تغسل ذنباً، كل صبر يتحول إلى نور أبدي. ألمك له معنى.",
        explanationFr: "La douleur n'est pas une punition: c'est une épreuve. Allah élève ceux qu'Il aime par les difficultés, comme l'or se purifie par le feu. Chaque larme lave un péché, chaque patience devient lumière éternelle."
    },
    death: {
        titleEs: "¿Qué hay después de la muerte?",
        titleAr: "ماذا بعد الموت؟",
        titleEn: "What is after death?",
        titleFr: "Qu'y a-t-il après la mort?",
        verseAr: "كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ ۗ وَإِنَّمَا تُوَفَّوْنَ أُجُورَكُمْ يَوْمَ الْقِيَامَةِ",
        versesEs: "\"Cada alma probará la muerte. Y vuestras recompensas se os pagarán íntegras el Día de la Resurrección\"",
        versesEn: "\"Every soul will taste death, and you will only be given your full compensation on the Day of Resurrection\"",
        versesAr: "\"كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ ۗ وَإِنَّمَا تُوَفَّوْنَ أُجُورَكُمْ يَوْمَ الْقِيَامَةِ\"",
        versesFr: "\"Toute âme goûtera la mort. Mais c'est seulement au Jour de la Résurrection que vous recevrez votre entière rétribution\"",
        ref: "Aal-Imran 3:185",
        explanationEs: "La muerte no es el fin: es una transición. Tu alma viaja al Barzaj (mundo intermedio), luego resucitará en el Día del Juicio. Los justos heredarán el Paraíso eterno, descrito con jardines, ríos y paz infinita. No estás muriendo: estás regresando a casa.",
        explanationEn: "Death is not the end: it is a transition. Your soul travels to Barzakh (intermediate world), then will be resurrected on Judgment Day. The righteous will inherit eternal Paradise, described with gardens, rivers and infinite peace. You are not dying: you are returning home.",
        explanationAr: "الموت ليس النهاية: إنه انتقال. تسافر روحك إلى البرزخ، ثم تُبعث يوم القيامة. الصالحون يرثون الجنة الأبدية الموصوفة بالحدائق والأنهار والسلام اللانهائي. أنت لا تموت: أنت تعود إلى الديار.",
        explanationFr: "La mort n'est pas la fin: c'est une transition. Ton âme voyage vers le Barzakh, puis ressuscitera au Jour du Jugement. Les justes hériteront du Paradis éternel. Tu ne meurs pas: tu rentres à la maison."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 3 Questions to the Sky game
    document.querySelectorAll('.sky-choice').forEach(btn => {
        btn.addEventListener('click', () => {
            const q = btn.dataset.q;
            showSkyAnswer(q);
        });
    });

    // Stories filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterStories(btn.dataset.filter);
        });
    });

    // Stories carousel
    const track = document.getElementById('storiesTrack');
    const prevBtn = document.getElementById('storyPrev');
    const nextBtn = document.getElementById('storyNext');
    if (track && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -340, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: 340, behavior: 'smooth' });
        });
    }
});

function showSkyAnswer(qKey) {
    const data = SKY_ANSWERS[qKey];
    const lang = (typeof currentLanguage !== 'undefined' ? currentLanguage : 'es') || 'es';
    
    const titleKey = `title${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
    const versesKey = `verses${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
    const explanationKey = `explanation${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
    
    document.getElementById('skyAnswerTitle').textContent = data[titleKey] || data.titleEs;
    document.getElementById('skyVerseAr').textContent = data.verseAr;
    document.getElementById('skyVerseTrans').textContent = data[versesKey] || data.versesEs;
    document.getElementById('skyVerseRef').textContent = data.ref;
    document.getElementById('skyExplanation').textContent = data[explanationKey] || data.explanationEs;
    
    document.getElementById('skyStep1').classList.remove('active');
    document.getElementById('skyStep2').classList.add('active');
    
    document.getElementById('skyStep2').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function resetSky() {
    document.getElementById('skyStep2').classList.remove('active');
    document.getElementById('skyStep1').classList.add('active');
    document.getElementById('skyStep1').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function filterStories(filter) {
    const cards = document.querySelectorAll('.story-card');
    cards.forEach(card => {
        if (filter === 'all') {
            card.style.display = '';
        } else if (filter === 'professional') {
            card.style.display = card.dataset.cat === 'professional' ? '' : 'none';
        } else {
            card.style.display = card.dataset.region === filter ? '' : 'none';
        }
    });
}
