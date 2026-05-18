# 🕌 Mezquita Abdullah - Sitio Web v3.0

Sitio web completo, multilingüe e interactivo para la **Mezquita Abdullah**, ubicada en Habana Vieja, La Habana, Cuba.

---

## 📄 Estructura del proyecto

```
mezquita-abdullah/
├── index.html              ← Página principal con horarios de oración
├── learn-islam.html        ← 🆕 NUEVA: Conoce el Islam (5 secciones interactivas)
├── new-muslims.html        ← Nuevos musulmanes (con infográficos + Formspree)
├── events.html             ← Eventos semanales/mensuales + tahfiz + tablón
├── support.html            ← 🆕 NUEVA: Apoyo no monetario
├── visit.html              ← Información de visita + mapa
├── contact.html            ← Centro de contacto (redes sociales)
├── calendar.html           ← 🆕 ACTUALIZADO: Calendario Hijri 2026 con virtudes
├── prayer-times.html       ← 🆕 ACTUALIZADO: Horarios + descarga como imagen
├── thanks.html             ← 🆕 NUEVA: Página de agradecimiento (Formspree)
├── css/
│   ├── style.css           ← Estilos principales
│   ├── learn-islam.css     ← 🆕 Estilos de "Conoce el Islam"
│   ├── new-muslims.css     ← 🆕 Estilos de "Nuevos musulmanes" (infográficos)
│   └── calendar.css        ← 🆕 Estilos del nuevo calendario
├── js/
│   ├── translations.js     ← Traducciones humanas (ES/EN/AR/FR)
│   ├── main.js             ← Lógica general + cambio de idioma
│   ├── prayer-times.js     ← API Aladhan
│   ├── prayer-download.js  ← 🆕 Descarga imagen de horarios
│   ├── calendar.js         ← 🆕 Calendario interactivo con virtudes
│   ├── calendar-data.js    ← 🆕 Base de datos islámica (90 eventos)
│   └── learn-islam.js      ← 🆕 Lógica de "Conoce el Islam"
├── images/
└── README.md
```

---

## 🆕 Cambios en v3.0

### 1. ✅ Nueva página: **"Conoce el Islam"** (`learn-islam.html`)
Reemplaza el botón "¿Eres nuevo musulmán?" en el navbar. **5 secciones interactivas**:

- **🌱 De la duda a la certeza**: 4 grandes preguntas con tarjetas flip
- **⚖️ Mitos vs. Realidad**: 4 comparativas con botones de compartir (Twitter, Facebook, WhatsApp)
- **💚 ¿Por qué eligieron el Islam?**: Carrusel con 5 testimonios reales + filtros por región/profesión
- **☁️ 3 preguntas al cielo**: Juego interactivo (¿Quién soy? ¿Por qué sufro? ¿Después de la muerte?) con versículos del Corán
- **🌹 Profeta de la Misericordia**: Timeline con sus rasgos (tolerancia, compasión, mujeres, niños, animales, medio ambiente, perdón)
- **🌟 ¿Cómo entrar al Islam?**: Pasos detallados (Shahada, ghusl, salat, comunidad) al final de la página

### 2. ✅ Página "Nuevos Musulmanes" actualizada
- **Infográficos visuales** del Wudu (8 pasos) y de la Salat (9 pasos)
- **Videos en 4 idiomas** con los enlaces correctos:
  - **Wudu**: ES `gR-7oGOpYB0`, EN `2xS70Zn-jRk`, AR `ll6ayvYc3X4`, FR `o-5wVAvLxMg`
  - **Salat**: ES `O7jBANtNHHU`, EN `zalLv2NY98k`, AR `QIi6YSJfPTw`, FR `vgPo185P-oY`
- **Formspree integrado** en formulario de mentor:
  - Endpoint: `https://formspree.io/f/mdajodow`
  - Email destino: `mezquitaabdullah1@gmail.com`
  - Campos: nombre, email, teléfono, idioma, tipo de mentor, mensaje
  - Auto-respuesta + redirección a `thanks.html`

### 3. ✅ Donaciones → Apoyo
- Eliminada toda mención de donaciones monetarias
- Nueva página `support.html` con 9 formas de apoyo: Corán, comida, limpieza, traducción, niños, tecnología, visitas, da'wah, reparaciones
- Contacto único con el Imam: **+53 5 9490936**

### 4. ✅ Calendario Islámico
- 90 eventos islámicos importantes ya programados para 2026 (1447-1448 H):
  - Ramadán, Eid al-Fitr/Adha, Laylat al-Qadr, Arafah, Ashura, Mawlid, Hijri New Year, Isra-Mi'raj, Días Blancos, etc.
- **Click en cualquier día** → modal con virtud + versículo del Corán o hadiz
- Navegación entre meses
- Diseño armonizado con el sitio

### 5. ✅ Descarga de Horarios de Oración como Imagen
- Tarjeta con logo + fecha + 6 horarios
- Botón **"Descargar imagen"** (genera PNG con `html2canvas`)
- Botón **"Compartir"** vía Web Share API o WhatsApp

### 6. ✅ Contacto actualizado
- WhatsApp Canal: `https://whatsapp.com/channel/0029Vb7hD1KKmCPJx0NlLU06`
- Email: `mezquitaabdullah1@gmail.com`
- Teléfono: `+53 5 9490936`

### 7. ✅ Sistema de traducción mejorado
- Más de 200 claves nuevas para "Conoce el Islam", "Apoyo", calendario
- Fallback automático al inglés/español si una traducción no existe
- Persistencia del idioma en `localStorage`

---

## 🚀 Cómo usar

### Opción 1: Abrir directamente
1. Descomprime el ZIP
2. Abre `index.html` en cualquier navegador moderno
3. ¡Listo!

### Opción 2: Servidor local (recomendado)
```bash
cd mezquita-abdullah
python3 -m http.server 8000
# Abre: http://localhost:8000
```

### Opción 3: Hosting gratuito
Sube todos los archivos a:
- **Netlify** (arrastra y suelta la carpeta)
- **Vercel**
- **GitHub Pages**

---

## 🔧 Configuración importante

### Formspree (formulario de mentor)
El endpoint ya está configurado: `https://formspree.io/f/mdajodow`

Los emails llegan automáticamente a: **mezquitaabdullah1@gmail.com**

Para personalizar:
1. Inicia sesión en https://formspree.io
2. Verifica el email
3. Edita auto-respuesta y campos opcionales

### API de Horarios de Oración (Aladhan)
- **Coordenadas Habana**: 23.139272, -82.349244
- **Método**: 3 (Liga Mundial Islámica)
- **Costo**: GRATIS, sin API key

---

## 📋 Resumen de archivos

| Archivo | Líneas | Función |
|---------|--------|---------|
| `learn-islam.html` | ~770 | Página educativa interactiva |
| `new-muslims.html` | ~525 | Nuevos musulmanes + infográficos |
| `support.html` | ~225 | Apoyo no monetario |
| `calendar.html` | ~205 | Calendario hijri/gregoriano |
| `js/calendar-data.js` | ~200 | Base de datos de eventos islámicos |
| `js/learn-islam.js` | ~145 | Lógica de juego "3 preguntas" + filtros |
| `css/calendar.css` | ~410 | Estilos calendario |
| `css/learn-islam.css` | ~640 | Estilos de la nueva página |

---

## 📞 Información de contacto del centro

- **Dirección**: Obispo #13 e/ Ave del Puerto, Habana Vieja, La Habana, Cuba
- **Coordenadas**: 23.139272, -82.349244
- **Teléfono / WhatsApp**: +53 5 9490936
- **Email**: mezquitaabdullah1@gmail.com
- **Instagram**: [@mezquita__abdullah](https://www.instagram.com/mezquita__abdullah)
- **Facebook**: [Mezquita Abdullah](https://www.facebook.com/share/18zo94WL5i/)
- **Canal WhatsApp**: [Unirse](https://whatsapp.com/channel/0029Vb7hD1KKmCPJx0NlLU06)

---

## 🤲 Du'a

> *"رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ"*
>
> "¡Señor Nuestro! Acepta de nosotros. Tú eres el que todo lo oye, el que todo lo sabe." - Al-Baqarah 2:127

**Que Allah acepte este esfuerzo y haga de esta mezquita una fuente de hidayah para Cuba y el mundo.** 🤲
