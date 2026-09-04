/**
 * 🚦 Rate limiting para despliegues Node/Express multi-servidor (referencia).
 *
 * Usa Redis como store distribuido → los límites son GLOBALES y compartidos
 * entre todas las réplicas del backend (a diferencia del store en memoria,
 * que es por proceso).
 *
 * Instalación:
 *   npm i express-rate-limit rate-limit-redis ioredis
 *
 * Uso:
 *   import { authLimiter, globalLimiter, payloadLimits } from './middleware/express-rate-limit.js';
 *   app.use(globalLimiter);                 // 100 req/min en todo
 *   app.use('/auth', authLimiter);          // 5 intentos / 15 min en login
 *   app.use(express.json({ limit: '1mb' }));        // límite JSON
 *   app.use('/upload', express.raw({ limit: '10mb' })); // límite subidas
 */
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

// REDIS_URL es un SECRETO de servidor: nunca usar prefijo público ni exponerlo al frontend.
const redis = new Redis(process.env.REDIS_URL, { lazyConnect: true });

const store = (prefix) =>
  new RedisStore({
    sendCommand: (...args) => redis.call(...args),
    prefix,
  });

const tooMany = (req, res) =>
  res.status(429).json({
    error: 'too_many_requests',
    retryAfter: Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000),
  });

/** Login: 5 intentos cada 15 minutos → HTTP 429 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,   // RateLimit-* headers
  legacyHeaders: false,
  store: store('rl:auth:'),
  handler: tooMany,
  message: undefined,
});

/** Global: 100 req/minuto por IP → HTTP 429 */
export const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  store: store('rl:global:'),
  handler: tooMany,
});

/** Límites de payload anti-DoS (aplicar con express.json/raw). */
export const payloadLimits = {
  json: '1mb',
  upload: '10mb',
};
