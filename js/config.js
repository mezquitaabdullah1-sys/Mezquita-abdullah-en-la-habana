// ⚙️ Configuración global (v20: variables de entorno)
//
// REGLA DE ORO: este archivo se sirve al navegador → SOLO valores PÚBLICOS.
//   • Variables de cliente: prefijo QUBA_PUBLIC_*, generadas en js/env.public.js
//     por `npm run env` (build/inject-env.js) a partir de .env / process.env.
//   • Secretos de servidor (DB passwords, API keys privadas, JWT secrets, REDIS_URL):
//     viven SOLO en el backend (Worker secrets / Redis / process.env del servidor)
//     y NUNCA deben aparecer aquí ni en ningún bundle del frontend.
//     build/check-secrets.js falla el build si detecta alguno.

const ENV = (typeof window !== 'undefined' && window.QUBA_ENV) || {};
const env = (key, fallback) =>
  ENV[key] !== undefined && ENV[key] !== '' ? ENV[key] : fallback;

const CONFIG = {
  KAABA: { lat: 21.4225, lng: 39.8262 },

  CALCULATION_METHODS: {
    2: 'ISNA (Norteamérica)',
    3: 'Liga Mundial Musulmana',
    4: 'Umm Al-Qura (Makkah)',
    5: 'Autoridad General de Egipto',
    8: 'Gulf Region',
    12: 'UOIF (Europa)',
    13: 'Diyanet (Turquía)',
    14: 'Espiritualidad Islámica España',
  },

  // Recitadores disponibles (Mishary Alafasy removido completamente)
  RECITERS: [
    { id: 'ar.abdurrahmaansudais', name: 'Abdurrahman As-Sudais', country: 'Arabia Saudí' },
    { id: 'ar.mahermuaiqly', name: 'Maher Al-Muaiqly', country: 'Arabia Saudí' },
    { id: 'ar.husary', name: 'Mahmoud Khalil Al-Husary', country: 'Egipto' },
    { id: 'ar.saadalghamdi', name: 'Saad Al-Ghamdi', country: 'Arabia Saudí' },
    { id: 'ar.minshawi', name: 'Mohamed Siddiq El-Minshawi', country: 'Egipto' },
    { id: 'ar.abdulbasitmurattal', name: 'Abdul Basit (Murattal)', country: 'Egipto' },
    { id: 'ar.hudhaify', name: 'Ali Al-Hudhaify', country: 'Arabia Saudí' },
  ],

  TRANSLATIONS: {
    'es.cortes': 'Julio Cortés (Español)',
    'es.garcia': 'García (Español)',
    'en.sahih': 'Sahih International (English)',
    'en.pickthall': 'Pickthall (English)',
  },

  API: {
    // Endpoints públicos (no son secretos; se pueden sobreescribir por entorno)
    ALADHAN: env('QUBA_PUBLIC_API_ALADHAN', 'https://api.aladhan.com/v1'),
    QURAN: env('QUBA_PUBLIC_API_QURAN', 'https://api.alquran.cloud/v1'),
    UMMAH: env('QUBA_PUBLIC_API_UMMAH', 'https://ummahapi.com/api'),
    // ☁️ Proxy backend (Cloudflare Worker). Si está configurado, se usa como
    // primera opción para /translate, /duas y /geocode (evita rate limits).
    PROXY: env('QUBA_PUBLIC_API_PROXY', ''),
  },

  // Preferir dataset local vetado para du'as (recomendado en producción)
  USE_LOCAL_DUAS: env('QUBA_PUBLIC_USE_LOCAL_DUAS', 'true') !== 'false',

  CACHE_TTL: Number(env('QUBA_PUBLIC_CACHE_TTL_MS', String(24 * 60 * 60 * 1000))), // 24h
};

const AppState = {
  location: null,
  timings: null,
  hijri: null,
  settings: {
    locale: 'es',
    theme: 'auto',
    calculationMethod: 3,
    // v26: ajuste de horario — 'auto' (el sistema aplica DST automáticamente),
    //      'summer' (+1h) o 'winter' (-1h) a petición manual del usuario
    timeShift: 'auto',
    // Default reciter: Maher Al-Muaiqly (selección automática en el primer uso)
    reciter: 'ar.mahermuaiqly',
    translation: 'es.cortes',
    userName: '',  // v15: nombre para certificados
  },
};
