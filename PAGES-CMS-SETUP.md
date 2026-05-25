# 📝 Pages CMS - Guía de configuración

Esta guía explica cómo administrar los eventos del sitio web de **Mezquita Abdullah** usando [Pages CMS](https://pagescms.org).

---

## ✅ Lo que ya está hecho

1. ✅ Archivo `.pages.yml` creado en la raíz del repositorio.
2. ✅ Carpetas creadas: `data/events/`, `data/announcements/`, `public/uploads/`.
3. ✅ Tres eventos de ejemplo (Salat al-Jumu'ah, Clase de Corán, Iftar comunitario).
4. ✅ `index.html` modificado: nueva sección "Próximas actividades" que carga eventos automáticamente.
5. ✅ `js/cms-events.js` añadido: lee los archivos JSON de `data/events/` y los renderiza como tarjetas.

---

## 🚀 Pasos finales (5 minutos)

### 1. Subir todo a GitHub

```bash
cd mezquita-abdullah
git add .
git commit -m "Add Pages CMS configuration and events"
git push origin main
```

### 2. Conectar Pages CMS (ya lo hiciste)

Has iniciado sesión en [app.pagescms.org](https://app.pagescms.org) y vinculado tu repositorio. Pages CMS detectará automáticamente el archivo `.pages.yml` y mostrará dos colecciones:
- **Eventos / فعاليات** (carpeta `data/events`)
- **Anuncios / إعلانات** (carpeta `data/announcements`)

### 3. (Opcional) Activar auto-discovery con GitHub API

Edita `js/cms-events.js` y rellena estas dos líneas:

```js
const CMS_EVENTS = {
    githubUser: 'TU-USUARIO-GITHUB',   // ej. 'mezquita-abdullah'
    githubRepo: 'TU-REPOSITORIO',      // ej. 'mezquita-abdullah-web'
    githubBranch: 'main',
    ...
};
```

**Beneficio:** así el sitio detectará automáticamente cualquier nuevo archivo JSON sin tener que actualizar `data/events/index.json`. Funciona porque la API pública de GitHub permite 60 peticiones/hora sin autenticación, suficiente para el tráfico de una mezquita.

### 4. Mantener `index.json` actualizado (si NO usas la API)

Si prefieres no usar GitHub API, cada vez que añadas/elimines un evento desde Pages CMS, debes editar `data/events/index.json` y actualizar la lista:

```json
{
  "files": [
    "2026-05-22-jumua.json",
    "2026-05-25-clase-quran.json",
    "2026-05-30-iftar-comunitario.json"
  ]
}
```

Pages CMS NO actualiza este archivo automáticamente. Si te resulta tedioso, activa el modo GitHub API (paso 3).

---

## 📖 Cómo añadir un evento

1. Entra a [app.pagescms.org](https://app.pagescms.org).
2. Selecciona tu repositorio.
3. Haz clic en **"Eventos / فعاليات"**.
4. Haz clic en **"+ New"** (Nuevo).
5. Rellena los campos:
   - **Título** — ej. "Clase de Tajwid para principiantes"
   - **Fecha** — selecciona día y hora
   - **Lugar** — por defecto "Mezquita Abdullah, Habana Vieja"
   - **Categoría** — religioso / educativo / comunitario / Ramadán / etc.
   - **Descripción** — texto largo
   - **Imagen** (opcional) — sube una foto (se guardará en `public/uploads/`)
   - **Enlace de registro** (opcional) — WhatsApp, formulario, etc.
   - **Destacado** — marca si quieres una estrella dorada
6. Haz clic en **"Save"**. Pages CMS crea automáticamente:
   - `data/events/2026-05-30-titulo.json` (commit automático en GitHub)
   - `public/uploads/imagen.jpg` (si subiste imagen)
7. **Si NO activaste GitHub API:** edita `data/events/index.json` y añade el nombre del nuevo archivo.

En menos de un minuto, el sitio mostrará el nuevo evento.

---

## 📂 Estructura de los archivos JSON

Cada evento es un archivo JSON con esta forma:

```json
{
  "title": "Salat al-Jumu'ah",
  "date": "2026-05-22 12:30",
  "location": "Mezquita Abdullah, Habana Vieja",
  "category": "religious",
  "description": "Khutbah semanal del viernes...",
  "image": "public/uploads/jumua.jpg",
  "register_url": "https://wa.me/5359490936",
  "featured": true
}
```

Si editas a mano un archivo y luego haces commit en GitHub, Pages CMS también lo verá.

---

## 🌐 Hosting

El sitio funciona en:
- ✅ **GitHub Pages** (gratis) — el método recomendado para Pages CMS
- ✅ **Netlify** — arrastra y suelta la carpeta
- ✅ **Vercel** — `vercel deploy`

Para GitHub Pages:
1. En GitHub, ve a **Settings → Pages**.
2. Source: **Deploy from a branch** → `main` → `/ (root)`.
3. URL: `https://TU-USUARIO.github.io/TU-REPO/`.

---

## 🛠️ Probar localmente

```bash
cd mezquita-abdullah
python3 -m http.server 8000
# Abre http://localhost:8000
```

El sitio funcionará incluso sin servidor (abriendo `index.html` directo), gracias a las traducciones embebidas.

---

## ❓ Solución de problemas

| Problema | Solución |
|---|---|
| "Sin eventos por ahora" aparece pero hay archivos | Verifica que `data/events/index.json` lista los nombres correctos, **o** activa GitHub API. |
| Imagen no aparece | Revisa que la ruta empiece por `public/uploads/` (sin `/` inicial). |
| Pages CMS no muestra mi config | Espera 1-2 min tras el push; verifica que `.pages.yml` esté en la raíz. |
| CORS error al cargar JSON | Sirve el sitio con `python3 -m http.server` o súbelo a GitHub Pages. |

---

## 📞 Soporte

Documentación oficial: https://pagescms.org/docs/

© 2026 Mezquita Abdullah · La Habana, Cuba
