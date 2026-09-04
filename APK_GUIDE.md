# 📱 Guía Completa: Convertir Quba Web a APK

Tienes **4 opciones principales** para convertir esta app web a APK Android. Empezamos por la más fácil.

---

## 🏆 Opción 1: PWA Builder (RECOMENDADO — 10 minutos)

### Paso 1: Subir el sitio a un host HTTPS

PWA Builder necesita una URL pública con HTTPS. Aquí las opciones gratuitas más rápidas:

#### 🟦 Netlify Drop (drag & drop, 2 minutos)
1. Abre [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arrastra la carpeta **`quba-web/`** completa
3. Espera ~30 segundos
4. ✅ Te dan una URL como `https://quba-abc123.netlify.app`

#### ⬛ Vercel (con CLI)
```bash
cd quba-web
npx vercel
# Sigue las instrucciones, te dará una URL https://...
```

#### ⚪ GitHub Pages
```bash
cd quba-web
git init
git add .
git commit -m "Initial commit"
gh repo create quba --public --source=. --push
# Activa Pages en Settings > Pages > Source: main
# URL: https://tu-usuario.github.io/quba/
```

#### 🟧 Firebase Hosting (gratis)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Public dir: . (la carpeta actual)
firebase deploy
```

---

### Paso 2: Generar APK con PWA Builder

1. Ve a **[pwabuilder.com](https://www.pwabuilder.com/)**

2. Pega tu URL (ej: `https://quba.netlify.app`) y haz clic en **"Start"**

3. PWA Builder analizará tu app. Deberías ver puntuación alta porque:
   - ✅ Tienes `manifest.json`
   - ✅ Tienes Service Worker (`sw.js`)
   - ✅ Servida por HTTPS
   - ✅ Es responsive

4. Haz clic en **"Package For Stores"** (botón verde grande)

5. Selecciona **"Android"**

6. Configura:
   | Campo | Valor sugerido |
   |---|---|
   | Package ID | `com.quba.app` |
   | App name | `Quba` |
   | Launcher name | `Quba` |
   | App version | `1.0.0` |
   | Display mode | `Standalone` |
   | Notification | Activado |
   | Location delegation | Activado (para GPS) |

7. Haz clic en **"Generate"**

8. Descarga el archivo `.zip` que contiene:
   - **`app-release-signed.apk`** ← este es el que instalas
   - `app-release-bundle.aab` ← para subir a Play Store
   - Documentación completa

9. **Instala el APK en tu teléfono Android**:
   - Transfiere el `.apk` al teléfono
   - Activa "Orígenes desconocidos" en Ajustes
   - Toca el archivo `.apk` → Instalar ✅

---

## 🛠️ Opción 2: Capacitor (más control técnico)

Capacitor es la opción profesional. Permite añadir plugins nativos.

### Requisitos
- **Node.js 18+** ([descargar](https://nodejs.org))
- **Android Studio** ([descargar](https://developer.android.com/studio)) — instala SDK 33+
- **JDK 17+** (incluido en Android Studio)

### Paso a paso

```bash
# 1) Entrar en el directorio
cd quba-web

# 2) Inicializar package.json
npm init -y

# 3) Instalar Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
npm install @capacitor/geolocation @capacitor/haptics

# 4) Inicializar Capacitor (web-dir = "." porque los archivos están aquí)
npx cap init "Quba" "com.quba.app" --web-dir="."

# 5) Añadir plataforma Android
npx cap add android

# 6) Sincronizar archivos
npx cap sync android

# 7) Abrir en Android Studio
npx cap open android
```

### En Android Studio:

1. Espera a que indexe el proyecto (~5 min la primera vez)
2. **Build > Make Project** (verifica que compile)
3. **Build > Generate Signed Bundle / APK**
4. Selecciona **APK** (no AAB)
5. Crea un keystore nuevo (guárdalo bien — necesario para futuras actualizaciones)
6. Selecciona **release**
7. Espera a que compile → APK generado en:
   ```
   android/app/release/app-release.apk
   ```

### Personalizar ícono y splash en Capacitor

```bash
# Instalar herramienta
npm install -D @capacitor/assets

# Crea carpeta resources/ con icon-only.png (1024x1024) y splash.png (2732x2732)
mkdir resources
cp assets/icon.png resources/icon-only.png
cp assets/splash.png resources/splash.png

# Generar todos los tamaños automáticamente
npx capacitor-assets generate
```

---

## 🚀 Opción 3: Median.co (de pago, más rápido)

Para quienes prefieren no tocar código.

1. Ve a [median.co](https://median.co)
2. Crea cuenta + nuevo proyecto
3. Pega tu URL HTTPS
4. Configura:
   - Ícono (sube `assets/icon.png`)
   - Nombre, colores, splash
   - Permisos (geolocalización, notificaciones)
5. Descarga el APK generado (~5 min)

**Precio:** ~$33/mes por app, prueba gratuita disponible.

---

## 🤖 Opción 4: Bubblewrap (oficial de Google)

Solución oficial para TWA (Trusted Web Activity).

```bash
# Instalar
npm install -g @bubblewrap/cli

# Inicializar (requiere URL pública del manifest)
bubblewrap init --manifest=https://tu-url.com/manifest.json

# Compilar
bubblewrap build

# El APK estará en: ./app-release-signed.apk
```

Requisitos:
- JDK 17
- Android SDK
- App debe pasar Digital Asset Links (verificación dominio)

---

## 📊 Comparación de opciones

| Característica | PWA Builder | Capacitor | Median.co | Bubblewrap |
|---|---|---|---|---|
| Dificultad | 🟢 Fácil | 🟡 Media | 🟢 Fácil | 🟡 Media |
| Tiempo | 10 min | 1-2 h | 10 min | 30 min |
| Costo | Gratis | Gratis | $33/mes | Gratis |
| Plugins nativos | ⚠️ Limitado | ✅ Todos | ⚠️ Limitado | ⚠️ Limitado |
| Mantener app | Automático | Manual | Automático | Manual |
| Apto Play Store | ✅ | ✅ | ✅ | ✅ |

---

## 🔧 Permisos necesarios en el APK

Asegúrate de que tu APK final tenga estos permisos en `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-feature android:name="android.hardware.sensor.compass" android:required="false" />
```

PWA Builder y Capacitor los añaden automáticamente si los detectan en el código.

---

## 🐛 Problemas comunes

### "El APK no abre la app, pantalla en blanco"
- Verifica que la URL del manifest sea HTTPS
- Asegúrate de que `start_url` en `manifest.json` apunte a `./index.html`

### "Geolocation no funciona en APK"
- En Capacitor: añade el plugin `@capacitor/geolocation`
- En PWA Builder: marca "Location delegation" durante el packaging

### "Brújula Qibla no rota"
- En iOS: el usuario debe tocar el botón "Activar brújula"
- En Android: funciona automáticamente

### "Audio del Corán no reproduce"
- Política de autoplay: el usuario debe hacer al menos un toque antes
- Esto es nativo de los navegadores, no es un bug

### "CORS error en APIs"
- Sólo ocurre si abres `file://index.html`. Usa servidor local o el APK.

---

## 📤 Publicar en Google Play Store

Una vez tengas el APK firmado:

1. Crear cuenta de desarrollador: [play.google.com/console](https://play.google.com/console) — $25 una sola vez
2. Crear nueva aplicación
3. Subir el archivo `.aab` (Android App Bundle, no APK)
4. Completar metadata, screenshots, política de privacidad
5. Revisión Google (~1-3 días) → publicación 🎉

---

## ✨ Recomendación final

Para empezar **rápido y gratis**: **PWA Builder** (Opción 1).
Para una app **profesional con plugins**: **Capacitor** (Opción 2).

¡Que Allah ﷻ bendiga tu proyecto! 🤲
