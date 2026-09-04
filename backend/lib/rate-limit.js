/**
 * 🚦 Distributed rate limiting (Cloudflare KV sliding window)
 *
 * Shared across ALL Worker isolates worldwide → limits are global, not per-instance.
 * For multi-server Node/Express deployments use backend/middleware/express-rate-limit.js
 * (Redis-backed) instead.
 *
 * NOTE: KV is eventually consistent; under extreme concurrency a few extra
 * requests may slip through. For strict, strongly-consistent limiting use a
 * Durable Object counter or Redis (see middleware/express-rate-limit.js).
 */

/**
 * @param {KVNamespace} kv
 * @param {{ bucket: string, limit: number, windowSec: number }} policy
 * @returns {Promise<{allowed:boolean, remaining:number, retryAfter:number, reset:number}>}
 */
export async function checkRateLimit(kv, { bucket, limit, windowSec }) {
  const now = Date.now();
  const key = `rl:${bucket}`;
  let rec = await kv.get(key, 'json');

  if (!rec || rec.reset <= now) {
    rec = { count: 0, reset: now + windowSec * 1000 };
  }
  rec.count += 1;

  const ttlSec = Math.max(1, Math.ceil((rec.reset - now) / 1000));
  await kv.put(key, JSON.stringify(rec), { expirationTtl: ttlSec + 60 });

  const allowed = rec.count <= limit;
  return {
    allowed,
    remaining: Math.max(0, limit - rec.count),
    retryAfter: allowed ? 0 : ttlSec,
    reset: Math.ceil(rec.reset / 1000),
  };
}

/** Standard rate-limit headers (draft IETF style). */
export function rateLimitHeaders(result, limit) {
  return {
    'X-RateLimit-Limit': String(limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(result.reset),
  };
}

/** HTTP 429 Too Many Requests with Retry-After. */
export function rateLimitResponse(result, limit, extraHeaders = {}) {
  return new Response(
    JSON.stringify({
      error: 'too_many_requests',
      message: `Rate limit exceeded. Retry in ${result.retryAfter}s.`,
      retryAfter: result.retryAfter,
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(result.retryAfter),
        ...rateLimitHeaders(result, limit),
        ...extraHeaders,
      },
    },
  );
}
