# 🕌 Quba v4.0 — Compañero espiritual islámico completo

**Tu compañero espiritual islámico** — PWA web con lector de Corán, tafsir multi-idioma, oraciones, Qibla, calendario hijri, curso interactivo de Salah y módulos de Sabiduría (Quiz, Du'as, Adhkar, Tasbih, Cursos).

> ✨ **Novedades v4:** Service Worker completo (offline con 74 assets), CSP + SRI, router con history.pushState (URL sharing), escapeHtml global (XSS mitigado), splash reactivo, i18n unificado (locale), notificaciones de oración.

---

## 🆕 Cambios en v3 — Lector de Corán Renovado

### 📖 1. Diseño tipo Muslim Pro
- **Banner ornamental** con nombre de la sura en árabe (sin tashkeel) + traducción + metadata
- **Bismillah** centrado en su propia fila al inicio (no se repite en la 1ª aleya — excepto Al-Fatihah)
- **Marcador árabe ﴿1﴾** al final de cada aleya (estilo mushaf tradicional)
- **Resaltado dorado** cuando la aleya se está reproduciendo

### 🔤 2. Transliteración (pronunciación)
- Para no-arabófonos: **pronunciación en alfabeto latino** sobre la traducción
- Fuente: `en.transliteration` de Al-Quran Cloud API
- Estilo destacado con borde dorado y emoji 📢
- Toggle on/off en los ajustes del lector
- Auto-oculto si el idioma de la UI es árabe

### 🔍 3. Búsqueda sin tashkeel
- "النَّاسِ" se encuentra escribiendo "الناس" ✅
- "بِسْمِ" se encuentra escribiendo "بسم" ✅
- Normalización inteligente: elimina harakat, fatha, kasra, damma, shadda, tanween + normaliza alefs (ا/أ/إ/آ)
- Los nombres de sura se muestran limpios (sin tashkeel) en la lista
- Búsqueda por nombre inglés, transliterado, árabe limpio o número

### 📜 4. Sistema de Tafsir (estilo Ayah)
- **Botón "Tafsir"** en cada aleya → abre modal con explicación
- **4 tafsirs disponibles**:
  - **Al-Muyassar** — Conciso y moderno (recomendado)
  - **Al-Jalalayn** — Clásico, breve
  - **Al-Qurtubi** — Clásico, detallado
  - **Al-Baghawi** — Clásico tradicional
- **Traducción automática** al español/inglés via MyMemory API (gratis, sin clave)
- **Toggle entre traducción y árabe original** con pestañas
- Selector de tafsir preferido en ajustes
- Caché de 30 días por aleya/tafsir

### 🧭 5. Navegación rápida entre suras/aleyas
- **Barra de herramientas** con 2 botones grandes: Selector de Sura | Selector de Aleya
- **Modal selector de Sura** con:
  - Búsqueda en vivo (con remoción de tashkeel)
  - Lista scrollable de las 114 suras
  - Resaltado de la sura actual
- **Modal selector de Aleya** con:
  - Input numérico directo (con Enter para saltar)
  - **Grid táctil** de números (1, 2, 3... hasta total)
  - Animación de resaltado al saltar
- **Botón flotante (FAB)** siempre visible para acceso rápido a aleya
- **Footer de navegación** con botones "Sura anterior / siguiente" con nombre
- **Scroll suave + highlight dorado** al saltar a una aleya específica

### 🎛️ 6. Ajustes del lector
- **4 tamaños de fuente** árabe (S, M, L, XL) con preview
- Toggle de transliteración on/off
- Toggle de traducción on/off
- Selector de tafsir preferido
- Persistencia en localStorage

### 🎵 7. Mejoras de audio
- Auto-play de la siguiente aleya al terminar
- Auto-scroll suave a la aleya en reproducción
- Indicador visual (resaltado dorado) del verso actual

### 📑 8. Otras mejoras
- **Marcadores** (bookmark) por aleya con persistencia
- **Compartir aleya** (Web Share API + fallback al portapapeles)
- **Animaciones suaves** de scroll y resaltado
- **Diseño "mushaf"** con fondo beige perla en modo claro
- **Modo oscuro** completo para lectura nocturna

---

## ✨ Características anteriores (mantenidas)

### 🏠 Inicio
Saludo dinámico, próxima oración con countdown, versículo del día, du'a, virtud del día.

### 🕋 Oración + Qibla
Aladhan API, 8 métodos de cálculo, brújula con feedback háptico.

### 📅 Calendario hijri
Festividades islámicas, días recomendados de ayuno, virtud del día.

### 🎯 Sabiduría (Phase 2)
- **305 preguntas** quiz gamificado en 6 categorías
- **Sistema XP/niveles** (Iniciado → Imam)
- **Tasbih digital** con háptica
- **4 colecciones Adhkar** (mañana/tarde/dormir/post-oración)
- **3 mini-cursos** (Cómo rezar, 99 Nombres, 5 Pilares)
- **18 logros** desbloqueables

---

## 🚀 Cómo usar localmente

```bash
unzip quba-web-v3.zip
cd quba-web-v3
python3 -m http.server 8080
# Abrir http://localhost:8080
```

## 📱 Convertir a APK

Igual que v1/v2: usa **PWA Builder** (10 min) o **Capacitor**. Ver `APK_GUIDE.md`.

---

## 🔌 APIs usadas (todas gratuitas, sin clave)

| API | Uso |
|---|---|
| [Al-Quran Cloud](https://alquran.cloud/api) | 114 suras + traducciones + audio + **transliteración** + **4 tafasir** |
| [Aladhan](https://aladhan.com/prayer-times-api) | Oración + calendario hijri |
| [MyMemory Translate](https://mymemory.translated.net/) | Traducción AR→ES/EN del tafsir (1000/día gratis) |
| [Nominatim](https://nominatim.org/) | Reverse geocoding |

---

## 📊 Estadísticas v3

| Métrica | Valor |
|---|---|
| Líneas de código | ~7,200 |
| Archivos JS | 27+ |
| Archivos CSS | 5 |
| Total preguntas | 305 |
| Tafsirs disponibles | 4 |
| Recitadores | 6 |
| Traducciones | 4 (ES Cortés, ES García, EN Sahih, EN Pickthall) |
| Idiomas UI | 3 (ES/AR/EN con RTL) |
| Suras | 114 (con búsqueda sin tashkeel) |

---

## 💡 Detalles técnicos clave

### Remoción de tashkeel (Arabic diacritics)
```js
QuranHelpers.removeTashkeel('النَّاسِ')  // → 'الناس'
QuranHelpers.removeTashkeel('بِسْمِ')    // → 'بسم'
```

### No duplicar Bismillah
```js
// Solo se muestra Bismillah al inicio si la sura NO es Al-Fatihah (1) ni At-Tawbah (9)
if (QuranHelpers.shouldShowBismillah(surahNumber)) {
  // Strip Bismillah from first ayah text
  ayah.arabicDisplay = QuranHelpers.stripBismillahFromFirstAyah(ayah.arabic);
}
```

### Tafsir con traducción automática
```js
const tafsir = await TafsirService.getTafsir(
  surahNum, ayahNum,
  'ar.muyassar',  // source tafsir (Arabic)
  'es'            // target language for auto-translation
);
// Returns: { arabic, translated, source, sourceAr, targetLang }
```

---

## 📜 Licencia

MIT © 2026 — Hecho con ❤️ para la ummah hispanohablante.

> *"إِنَّا نَحْنُ نَزَّلْنَا ٱلذِّكْرَ وَإِنَّا لَهُۥ لَحَـٰفِظُونَ"*
> *— Somos Nosotros quienes hemos revelado el Recuerdo y somos Nosotros sus custodios.* (Q 15:9)
