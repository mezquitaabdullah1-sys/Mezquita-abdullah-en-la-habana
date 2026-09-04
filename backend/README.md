# ☁️ Quba Backend Proxy

Cloudflare Worker que actúa como escudo entre la app Quba y APIs públicas con rate limits.

## Endpoints

| Ruta | Descripción | Cache KV |
|---|---|---|
| `GET /health` | Estado del worker | — |
| `GET /translate?text=&source=&target=` | Traducir texto (cascade MyMemory→Lingva→LibreTranslate) | 30 días |
| `GET /duas/categories` | Categorías de du'as | 7 días |
| `GET /duas/category/{id}` | Du'as de una categoría | 7 días |
| `GET /geocode?lat=&lng=` | Reverse geocoding (Nominatim) | 30 días |

## Deploy

```bash
# 1) Instalar wrangler
npm install -g wrangler

# 2) Login
wrangler login

# 3) Crear KV namespace
wrangler kv:namespace create "QUBA_KV"
# → copia el id devuelto y pégalo en wrangler.toml

# 4) Ajustar ALLOWED_ORIGINS en cloudflare-worker.js
#    con tu dominio real (ej: https://quba.tudominio.com)

# 5) Deploy
wrangler deploy
```

## Uso desde la app

En `js/config.js`, añade:

```js
API: {
  // ... existente
  PROXY: 'https://quba-proxy.tu-usuario.workers.dev',
},
```

Y en `js/tafsir.js` o `js/duas.js`, usa el proxy como primera opción:

```js
const url = CONFIG.API.PROXY
  ? `${CONFIG.API.PROXY}/translate?text=${encodeURIComponent(text)}&source=ar&target=${target}`
  : `https://api.mymemory.translated.net/get?q=...`; // fallback directo
```

## Ventajas

- **Rate limits compartidos**: 1 IP (el Worker) vs miles de IPs individuales → nunca alcanzas límites.
- **Cache 30 días**: la mayoría de traducciones se sirven desde KV en <5ms.
- **CORS controlado**: solo tus dominios permitidos.
- **Fallback automático**: si MyMemory falla, prueba Lingva, luego LibreTranslate.
- **Ocultamiento de API keys** (si añades algún API con key).

## Costes

Cloudflare Workers free tier: **100.000 req/día gratis** — suficiente para miles de usuarios activos.
KV free tier: **100.000 reads/día + 1000 writes/día** gratis.
