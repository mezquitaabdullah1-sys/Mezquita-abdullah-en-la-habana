# Mezquita Abdullah - Centro Islámico de La Habana
## Sitio Web Oficial v4.0

Sitio web informativo, multilingüe (Español, Inglés, Árabe, Francés) para Mezquita Abdullah, La Habana, Cuba.

---

## 📂 Estructura del proyecto

```
mezquita-abdullah/
├── index.html              # Página principal con carrusel de eventos y barra de oración
├── learn-islam.html        # Conoce el Islam (5 secciones interactivas)
├── new-muslims.html        # Guía del Nuevo Musulmán (inspirada en newmuslimguide.com)
├── events.html             # Eventos semanales y mensuales
├── calendar.html           # Calendario Hijri/Gregoriano + próximos eventos
├── prayer-times.html       # Horarios de oración (API Aladhan)
├── visit.html              # Visítanos (mapa, parking, horario)
├── contact.html            # Contacto (WhatsApp, Instagram, Facebook, Email)
├── support.html            # Apoya el centro (9 tarjetas de apoyo)
├── thanks.html             # Página de agradecimiento de formulario
├── translations.json       # Traducciones EN/ES/AR/FR (164 claves cada uno)
├── css/
│   ├── style.css           # Estilos globales (navegación, footer, formularios)
│   ├── home.css            # Página principal (carrusel, barra de oración)
│   ├── calendar.css        # Calendario y eventos próximos
│   ├── learn-islam.css     # Conoce el Islam
│   ├── new-muslims.css     # Guía del Nuevo Musulmán
│   └── support.css         # Tarjetas de apoyo
├── js/
│   ├── i18n.js             # Sistema dinámico de traducciones (carga JSON, localStorage)
│   ├── translations.js     # Traducciones fallback embebidas
│   ├── main.js             # Lógica común (menú móvil, scroll, etc.)
│   ├── calendar.js         # Calendario + render de eventos próximos
│   ├── calendar-data.js    # Datos islámicos 1447-1448 H (90 eventos)
│   ├── prayer-times.js     # API Aladhan para Habana (método 3)
│   ├── prayer-download.js  # Generación de imagen PNG con html2canvas
│   └── learn-islam.js      # Lógica de la página Conoce el Islam
└── images/
    ├── logo.jpg
    ├── mosque-exterior.jpg, mosque-interior-1.jpg, mosque-interior-2.jpg
    ├── mosque-prayer.jpg
    └── quran.jpg
```

---

## ✨ Novedades v4.0

| Mejora | Detalle |
|---|---|
| 🌍 **Traducciones dinámicas** | Todas las páginas usan `i18n.js` que carga `translations.json` y aplica `data-lang-key`. El idioma elegido se guarda en `localStorage`. |
| 📅 **Próximos eventos islámicos** | Nueva sección en `calendar.html` con tarjetas para Ramadán, Eid al-Fitr, Eid al-Adha, Arafah, Hégira, Ashura, Mawlid, Isra/Mi'raj y mitad de Sha'ban con cuenta regresiva. |
| 📆 **Calendario corregido** | Orden de días correcto (Dom–Sáb) según `getDay()`; el día actual se destaca con gradiente verde y escala. |
| 🎥 **Video Ghusl actualizado** | `learn-islam.html` ahora apunta a `https://youtu.be/yFJj2uZjE6o`. |
| 🎠 **Carrusel de eventos** | Estilo inspirado en diyanetamerica.org, autoplay, flechas y puntos de navegación. |
| 🕌 **Barra de oración compacta** | 5 tarjetas horizontales (Fajr, Dhuhr, Asr, Maghrib, Isha) con destacado de la próxima oración. |
| 📖 **Guía del Nuevo Musulmán** | Estructura inspirada en newmuslimguide.com (9 capítulos: creencias, Shahada, Wudu, Salat, Zakat, Sawm, Hajj, Akhlaq) con banner de atribución y enlaces directos a cada capítulo en el sitio original. |
| 💝 **Apoya el centro** | 9 tarjetas con imagen, ícono, descripción atractiva y CTA por WhatsApp. |
| 🚫 **Sin sección de mentor** | Eliminados todos los formularios, botones, traducciones y CSS relativos a "mentor". |

---

## 🌐 Atribución de contenido

La página **"Guía del Nuevo Musulmán"** está estructurada y inspirada en **The New Muslim Guide** (Fahd ibn Saalim Baa Hammaam), traducido a 26 idiomas. Los textos de esta página son resúmenes propios y/o adaptaciones. Para leer el contenido completo y oficial:

🔗 **Sitio original:** [https://newmuslimguide.com/es](https://newmuslimguide.com/es)

Cada capítulo en `new-muslims.html` enlaza directamente al sitio original. La atribución aparece tanto en un **banner superior** como en el **footer** de la página.

---

## 🚀 Ejecución local

```bash
cd mezquita-abdullah
python3 -m http.server 8000
# Abrir http://localhost:8000
```

> ⚠️ Es necesario ejecutar el sitio desde un servidor (no `file://`) para que `fetch('translations.json')` y la API Aladhan funcionen correctamente.

---

## 🌐 Publicación gratuita

- **Netlify** — arrastra y suelta la carpeta `mezquita-abdullah` en netlify.com/drop.
- **Vercel** — `vercel deploy` desde la carpeta.
- **GitHub Pages** — sube a un repositorio y activa Pages.

---

## 📞 Contacto

- WhatsApp: [+53 5 9490936](https://wa.me/5359490936)
- Canal WhatsApp: [Mezquita Abdullah](https://whatsapp.com/channel/0029Vb7hD1KKmCPJx0NlLU06)
- Instagram: [@mezquita__abdullah](https://www.instagram.com/mezquita__abdullah)
- Facebook: [Mezquita Abdullah](https://www.facebook.com/share/18zo94WL5i/)
- Email: mezquitaabdullah1@gmail.com
- Dirección: Obispo #13 e/ Ave del Puerto, Habana Vieja, Habana, Cuba

---

© 2026 Mezquita Abdullah · La Habana, Cuba
