# Quba Changelog

## v1.0.0 — 2026-09-04 · Correcciones: guardar audio en el dispositivo, PDF y copiar du'as
> **La versión pública de la app se mantiene en v1.0.0** (`js/version.js`, `package.json`, Ajustes/Perfil).

### 💾 FIX «Guardar en el dispositivo» (audio del Corán) — fallaba siempre
- **Causa raíz**: el CDN `cdn.islamic.network/quran/audio-surah/…` (MP3 de la sura completa) devuelve **403** desde mediados de 2026 → el botón «Guardar en el dispositivo» del gestor de audio mostraba `⚠️ Error` sin descargar nada.
- **Nueva cadena de descarga con fuentes verificadas** (todas responden 200 con CORS `*`):
  - **Plan A** — MP3 de la sura completa por recitador en `download.quranicaudio.com` (7 recitadores mapeados, incl. Maher al-Muaiqly año 1440 con respaldo 1422-1423).
  - **Plan B** — unión de las aleyas ya descargadas en la Cache API (MP3 MPEG-1 Layer III concatenables).
  - **Plan C** — descarga aleya por aleya con **triple reintento** (CDN 128k → CDN 64k → `everyayah.com`) y unión del resultado; lo descargado queda también offline en la Cache API.
- La descarga de suras del gestor usa ahora el mismo triple reintento — antes 3 de 7 recitadores (Sudais, Ghamdi, Abdul Basit) daban 403 a 128 kbps y la sura quedaba incompleta para siempre; ahora caen a 64 kbps o a everyayah automáticamente.
- Ventana de revocación del `blob:` URL ampliada de 4 s a 10 s (Safari/iOS y archivos grandes).
- CSP `connect-src` ampliado en `index.html` y en el Worker: `download.quranicaudio.com` + `everyayah.com`.

### 📄 FIX PDF de horarios de oración — nombre de la mezquita
- El encabezado y el pie del PDF (diario y mensual) mostraban «قباء»; ahora muestran **«قبة»** en todos los idiomas.

### 🤲 FIX copiar du'a — no copiaba nada
- **Causa raíz 1**: los ids del dataset local son STRING (`sayyid_istighfar`) y se inyectaban en `onclick` SIN comillas → `ReferenceError: sayyid_istighfar is not defined`. Ahora se inyectan escapados y entre comillas (`escapeJs`).
- **Causa raíz 2**: ids numéricos de la API cacheada antigua no encontraban la du'a al comparar con `===` contra strings. Ahora la búsqueda, marcadores y compartición comparan siempre como `String` (tolerante a tipos).
- El texto copiado se reconstruye desde la tarjeta visible → incluye la traducción ya aplicada en segundo plano (no la inglesa original).
- Copia robusta: Clipboard API con reintento y fallback `execCommand` ejecutado dentro del gesto del usuario (HTTP antiguos / WebViews).
- Compartir (`navigator.share`) con captura de cancelación; sin Web Share API cae a copiar.

## v1.1.0 — 2026-08-28 · Tafsir bajo demanda (APK 93% más ligero)

### 📦 APK más ligero — tafsir fuera del bundle
- **Eliminados los ~82 MB de JSON de tafsir que venían empaquetados** (`data/tafsir/al-i-rab-al-muyassar/`, `data/tafsir/en-tafsir-al-mukhtasar/`, `data/tafsir/spanish-mokhtasar/`). El tamaño del proyecto baja de **87 MB a ~5,9 MB** (~93% menos).
- El tafsir ahora se descarga desde el CDN público de `spa5k/tafsir_api` vía jsDelivr (`https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/<slug>/<surah>.json`) — sin límites de uso, sin clave de API.

### 💾 Caché permanente en IndexedDB (igual que el Corán)
- Cada sura de tafsir se guarda una única vez en IndexedDB vía `CacheDB` **sin caducidad**. Primera lectura online, todas las siguientes sin conexión — mismo modelo que ya usa el texto del Corán desde v5.0.0.
- `TafsirService` reescrito (`CACHE_VER: 'v4'`): fetch → IndexedDB → memoria, con fallback a la sura árabe cuando el idioma es es/en para conservar la pestaña «Original en árabe».

### 🚀 Descarga automática al primer arranque — sin botón
- Al abrir la app por primera vez con conexión, `TafsirService.maybeAutoDownload()` empieza a descargar las 114 suras del tafsir del idioma actual en segundo plano (arranque diferido 2,5 s para no bloquear la UI). El usuario **no tiene que pulsar ningún botón de descarga** — igual que el prefetch de 14 días de horarios de oración.
- Idempotente: sura ya guardada se salta; si un JSON individual falla, se reintenta en el siguiente arranque.
- Respeta el modo de ahorro de datos del dispositivo (`navigator.connection.saveData`).
- Al recuperar conexión (`online` event), reanuda la descarga donde se había quedado.
- Manifiesto en `CacheDB` (`tafsir_offline_manifest_v1`) que registra por edición las suras ya completadas.

### 🔒 CSP ampliado
- Añadido `https://cdn.jsdelivr.net` a `connect-src` en `index.html` para permitir la descarga del tafsir desde el CDN.

### 🌍 Nuevos textos i18n (es/ar/en)
- `tafsirDownloading`, `tafsirDownloaded`, `tafsirDownloadPaused`.

### 🧹 Compatibilidad
- API pública de `TafsirService` intacta (`getTafsir`, `getAvailableTafsirs`, `clearCache`) — `pages/quran.js` y el botón de reintentar traducción siguen funcionando sin cambios.

## v1.0.0 — 2026-08-27 · Rendimiento y pulido

### 🦴 Skeleton loaders
- Todos los spinners reemplazados por barras grises tipo skeleton que replican el layout real de cada pantalla (Inicio, Oración, mensual, Calendario, Corán, lector, tafsir, Duas) — nuevo módulo `js/skeleton.js`.
- Splash: barras skeleton en lugar del spinner.

### 🎛️ Estados de UI completos
- `UIState` (en `js/skeleton.js`): estados de error con reintento, éxito y vacío, en los 3 idiomas; detecta sin conexión.
- Estados de error unificados en Inicio, Calendario, Corán y Duas.

### ⚡ Caché y ligereza
- `Storage` ahora tiene caché en memoria (Map): los datos se cargan una vez y la navegación entre pestañas es instantánea (sumado al IndexedDB de `cache-db.js` y los TTL existentes).
- Eliminado `dist/` (bundles sin referenciar) y scripts de build sin uso — app más ligera.

### 🧹 PWA eliminado
- Quitados `sw.js`, `manifest.json`, `js/pwa-install.js`, registro del service worker y CSS del banner; notificaciones ahora van directas vía API Notification.

### 🔧 Perfil
- Versión mostrada: **1.0.0** (`js/version.js`, `package.json`).
- Logo de la Mezquita Abdullah (`assets/mosque-logo.png`) al pie de la página de perfil.

## v5.0.0 — 2026-08-26 · Modo offline real (fusionado desde Quba v20.0 a Quba 2)

### 📴 Funcionamiento sin conexión (portado de v20.0)
- **Corán legible sin internet**: lista de las 114 suras vive local (`js/quran-offline.js`, IndexedDB permanente). El texto se guarda de forma permanente al leerlo una vez y la app descarga el Corán completo en segundo plano al detectar conexión. Banner con barra de progreso e insignias ✓ por sura en la pantalla del Corán. *Solo texto — el audio sigue requiriendo conexión.*
- **Horarios de oración sin internet**: motor de cálculo astronómico 100% local (`js/prayer-calc.js`) que se activa cuando no hay red ni caché (Inicio, pestaña de horarios y tabla mensual), marcado como «Horario aproximado (sin conexión)».
- **Calendario Hijri sin internet**: la conversión de un solo día cae al cálculo aritmético local si falla la red.
- **Inicio con "esqueleto" offline**: distingue "sin conexión" de "sin permiso de ubicación" y ofrece reintentar.
- **FIX crítico del app shell**: archivos que faltaban en la precarga del SW (`arabic_language.js`, `env.public.js`, `validate.js`, `glass-theme.css`, `restyle-layout.css`) añadidos — causaban fallos silenciosos sin conexión.
- **Fuentes e iconos offline**: Google Fonts y Font Awesome precargados y cacheados en runtime (condición de caché ampliada a CDN externos).
- **Avisos de conectividad**: aviso breve al perder/recuperar conexión en toda la app.
- **Nuevos textos i18n** (es/ar/en): offlineNowMsg, backOnlineMsg, estimatedTimes, downloadQuranOffline, quranDownloading, quranDownloaded, quranDownloadPaused, offlineHomeTitle, offlineHomeDesc.
- *Se conservan intactas las novedades propias de Quba 2 (tafsir local empaquetado, colecciones de adhkar extendidas, precache de tafsir JSON, etc.).*

## v4.9.2 — 2026-08-23 · Correcciones solicitadas por el Masjid (fadal, Eid, Iqamah, Jumuah, Adhan)

### 📅 Calendario Hijri
- **FIX fadal del día desfasado**: `getCalendarInfo()` parseaba 'YYYY-MM-DD' como medianoche UTC → en La Habana (UTC-4) retrocedía al día anterior (el fadal del viernes aparecía el sábado). Ahora parsea como fecha local al mediodía.
- **Icono de Eid al-Fitr**: sustituido `fa-champagne-glasses` (copa de champán, inapropiada) por `fa-star-and-crescent` (هلال ونجمة).

### 🕌 Oración
- **Iqamah por oración**: Fajr +20 · Dhuhr +15 · Asr +15 · Maghrib +5 · Isha +15. Visible en Inicio, pestaña de horarios y tabla mensual.
- **Aviso urgente de Jumuah**: al seleccionar un viernes en el calendario se muestra la nota «صلاة الجمعة على الساعة 2:10 بتوقيت هافانا».

### 🔊 Adhan
- **FIX reproducción**: URLs antiguas (cdn.islamic.network) devuelven 403. Nuevas fuentes verificadas (cdn.aladhan.com + islamcan.com) con fallback automático por voz.
- CSP `media-src` actualizado; settings (voces, volumen, silencio) intactos.

## v4.2.0 — 2026-07-10 · Long-term Architecture (v11)

### 🏗️ Infrastructure
- **Cloudflare Worker backend** (`backend/cloudflare-worker.js`) — proxy con KV cache para MyMemory, UmmahAPI, Nominatim. 100.000 req/día gratis, cache 30 días para traducciones.
- **Bundler simple** (`build/bundle.js`) — genera `dist/core.bundle.js`, `dist/data.bundle.js`, `dist/pages.bundle.js`. Reduce 51 requests HTTP a 3. Total: 464 KB.
- **TypeScript declarations** (`types/quba.d.ts`) — IntelliSense en VS Code sin migrar código. Compatible con `checkJs: true`.
- **Playwright test suite** (`tests/smoke.spec.js`) — 10 tests: home, CSP, wisdom, SW, manifest, escapeHtml, i18n parity, services, LocalDuas, Router pushState.

### 📿 Dataset Local Vetado
- **`data/duas/local_duas.js`** — 10 categorías, 15+ du'as auténticas con referencias explícitas (Bukhari, Muslim, Abu Dawud, Tirmidhi, Corán).
- Reemplaza dependencia de UmmahAPI unofficial → `CONFIG.USE_LOCAL_DUAS = true` por defecto.
- API compatible con estructura anterior (drop-in replacement).
- Marca `@theological_review PENDIENTE` para revisión formal por imám cualificado.

### 🔧 Config
- `CONFIG.API.PROXY` — endpoint del backend Worker (vacío por defecto).
- `CONFIG.USE_LOCAL_DUAS` — usa dataset local en lugar de UmmahAPI.
- Fallback en cascada: Local → Proxy → UmmahAPI directo.

### 📦 Estadísticas v11
- ZIP: 3.9 MB (114 archivos + `dist/` opcional + `backend/` + `types/` + `tests/`).
- 51 archivos JS válidos.
- SW: 4.2.0, 101 assets cacheados.
- i18n: 283 claves × 3 idiomas (paridad total).
- Bundles: 3 archivos, 464 KB total.

---

## v4.1.0 — 2026-07-09 · Priority Media (v10)
- IndexedDB (`js/cache-db.js`), WakeLock, PWA install banner, event delegation, WebP images, reset progress, export data.

## v4.0.0 — 2026-07-07 · Critical Fixes (v9)
- Global `escapeHtml`, CSP meta, SRI, Router `history.pushState`, language bug fix, splash reactivo, prayer notifications, accessibility CSS.

## v3.0.0 — Curso de Salah completo, 11 imágenes de posiciones, 26 lecciones.

## v2.0.0 — Adhkar page, Tasbih, Quiz gamificado con 305 preguntas.

## v1.0.0 — Lector Corán, oraciones, Qibla, calendario hijri.
