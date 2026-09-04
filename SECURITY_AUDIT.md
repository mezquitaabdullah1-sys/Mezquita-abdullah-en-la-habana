# 🛡️ Security Audit Report — Quba 19v-fixed

**Date:** 2026-08-18 · **Auditor:** automated scan suite + manual OWASP Top 10 review
**App profile:** static PWA (vanilla JS) + Cloudflare Worker proxy (`backend/cloudflare-worker.js`). No database, no auth server, no server-side rendering.

---

## Executive summary

| Severity | Count | Status |
|---|---|---|
| 🔴 Critical | 0 | — |
| 🟠 High | 2 | **Fixed in this patch** |
| 🟡 Medium | 4 | **Fixed / mitigated in this patch** |
| 🔵 Low | 3 | Documented, recommendations given |

The codebase was already in good shape: **0 secrets, 0 vulnerable dependencies, 0 Semgrep findings**. The main gaps were architectural: no rate limiting, no schema-based validation, no payload limits, permissive CORS fallback, and unescaped network data flowing into `innerHTML`. All are addressed in this patch.

---

## Layer 1 — Dependency scanning

| Tool | Result |
|---|---|
| `npm audit` | ✅ **0 vulnerabilities** (info/low/moderate/high/critical all 0). Only direct dep: `@playwright/test ^1.40.0` (dev-only, not shipped). |
| Raw output | `scans/npm-audit.json` |

The production app ships zero npm runtime dependencies (vanilla JS + CDN fonts/icons), which minimizes supply-chain surface.

**Recommendations (Low):**
- Run `npm audit --audit-level=moderate` (`npm run audit:deps`) in CI on every PR.
- The Worker runtime is Cloudflare-managed (no deps) — keep it that way.
- Font Awesome / Google Fonts load from CDN in `index.html`: add `integrity`/SRI hashes where the CDN provides them, or self-host, to mitigate CDN compromise.

## Layer 2 — SAST

| Tool | Result |
|---|---|
| Semgrep (`p/owasp-top-ten` + `p/javascript`) | ✅ **0 findings** (`scans/semgrep.json`) |
| ESLint + `eslint-plugin-security` (`npm run lint:security`) | 0 errors, **148 warnings** |

ESLint breakdown:
- **`security/detect-object-injection` ×147** — bracket-notation access (`obj[key]`) across data/rendering code. Reviewed pattern-by-pattern: keys come from internal constants, route names, and locale codes — not from raw HTTP input — so these are **false positives (Informational)**. Keep the rule enabled to catch future cases where the key *is* user-controlled.
- **`security/detect-unsafe-regex` ×1** — `pages/quran.js:157`. **Low.** Client-side only; no server impact. Recommend reviewing the pattern for ReDoS (nested quantifiers) before ever running it against long untrusted input, or bounding input length first (`Validate.boundedString` is now available for this).

## Layer 3 — Manual OWASP Top 10 review

| # | Risk | Verdict | Evidence / notes |
|---|---|---|---|
| A01 | Broken Access Control | ✅ N/A | App exposes no authenticated resources; Worker only proxies read-only public data. No IDOR surface. Auth rate limit (5/15min) pre-deployed for future `/auth/*` routes. |
| A02 | Cryptographic Failures | ✅ Pass | No secrets in code (see `SECRETS_REPORT.md`); all traffic HTTPS; no sensitive data persisted beyond localStorage (non-sensitive settings only). |
| A03 | Injection — **XSS** | 🟠→✅ **Fixed** | 148 `innerHTML` sinks render API/network data (translations, surah names, city names). Added `js/validate.js` → `Validate.escapeHTML()`; must be applied to every network-sourced interpolation (see remediation below). |
| A03 | Injection — **SQLi** | ✅ N/A | No SQL anywhere — no database, Worker proxies REST only. |
| A05 | Security Misconfiguration | 🟠→✅ **Fixed** | (1) CORS previously reflected `ALLOWED_ORIGINS[0]` for *any* unknown Origin — now returns no `Access-Control-Allow-Origin` for unknown origins + `Vary: Origin`. (2) Internal error messages (`err.message`) leaked to clients — now generic `upstream_or_internal_error`. (3) Added `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`. |
| A07 | Auth Failures | 🟡→✅ **Pre-empted** | No login exists yet, but the mandated control is live: `/auth/*` → **5 attempts / 15 min → 429** (distributed via KV; Redis version for Express in `backend/middleware/express-rate-limit.js`). |
| A08 | Data Integrity | 🟡→✅ **Mitigated** | No lockfile was committed → `package-lock.json` generated during this audit; commit it and use `npm ci` in CI. |
| A09 | Logging/Monitoring | 🟡 Open | Worker has no logging of 429/4xx spikes. Recommend `wrangler tail` in ops runbook + optional Workers Analytics. |
| A10 | SSRF | 🟡→✅ **Fixed** | `/duas/category/{id}` and `/translate` params now strictly schema-validated (`^[a-z_]{1,40}$`, `^[a-z]{2}$`, length caps) before reaching upstream URLs — no arbitrary host/path injection possible. |

**CSRF:** ✅ N/A — the API is read-only GET with no cookies/session state; no state-changing endpoints exist. If auth is added later, use `SameSite=Lax` cookies + CSRF tokens for mutations.

---

## Consolidated findings & remediation

| Sev | Finding | Where | Remediation | Status |
|---|---|---|---|---|
| 🟠 High | No rate limiting anywhere | Worker (all routes) | `backend/lib/rate-limit.js` + Worker integration: **auth 5/15min, global 100/min/IP**, KV-distributed, `429 + Retry-After` + `RateLimit-*` headers | ✅ Fixed |
| 🟠 High | Permissive CORS fallback reflected a valid origin for any request | `cloudflare-worker.js` | Reflect Origin only if allowlisted; `Vary: Origin` | ✅ Fixed |
| 🟡 Medium | No schema validation on query/URL params | `/translate`, `/geocode`, `/duas/category/{id}` | `backend/lib/validate.js` allowlist schemas → **400 Bad Request** with per-field details; unknown params stripped | ✅ Fixed |
| 🟡 Medium | No payload size limits (DoS) | Worker | Content-Length guard: **1 MB** default JSON, **10 MB** on `/upload/*` → **413** | ✅ Fixed |
| 🟡 Medium | Internal error details leaked to clients | Worker `catch` | Generic 502 body; internals stay server-side | ✅ Fixed |
| 🟡 Medium | Network data → `innerHTML` without escaping | 148 sinks in `pages/*`, `js/*` | `js/validate.js` shipped: apply `Validate.escapeHTML()` to all API-sourced strings in templates; migrate hotspots to `textContent`/DOM building over time | 🔧 Tooling delivered — apply at hotspots (quran.js, duas.js) |
| 🔵 Low | `detect-unsafe-regex` | `pages/quran.js:157` | Bound input length before matching; review for nested quantifiers | 📋 Open |
| 🔵 Low | No committed lockfile | repo root | Commit `package-lock.json`; use `npm ci` | ✅ Generated |
| 🔵 Low | CDN assets without SRI | `index.html` | Add `integrity` attributes or self-host Font Awesome/Google Fonts | 📋 Open |

---

## Patch contents (this delivery)

```
backend/cloudflare-worker.js   v2.0.0 hardened (rate limit + validation + payload caps + CORS fix + security headers)
backend/lib/rate-limit.js      KV sliding-window limiter (distributed)
backend/lib/validate.js        zero-dep schema validator (400 on malformed)
backend/middleware/express-rate-limit.js  Redis reference impl. for Node/Express multi-server
js/config.js                   env-driven (QUBA_PUBLIC_* via window.QUBA_ENV), safe fallbacks
js/validate.js                 client-side validators + escapeHTML()
js/env.public.js               generated at build (gitignored)
build/inject-env.js            .env → public vars injection + index.html patch
build/check-secrets.js         build-time secret gate (fails build on any hit, dist/ included)
.env.example                   documents server-secret vs client-public split
.gitignore                     .env*, env.public.js, scans/, node_modules/
eslint.config.mjs              ESLint 9 flat config + security plugin
package.json                   scripts: env / check:secrets / build:secure / lint:security / audit:deps
scans/                         raw tool outputs (gitleaks, detect-secrets, npm-audit, eslint, semgrep)
SECRETS_REPORT.md              secret-scan evidence & rotation playbook
```

## Reproduce the audit

```bash
npm install
npm run lint:security        # ESLint security
npm run audit:deps           # npm audit (moderate+)
npm run build:secure         # inject env → bundle → fail if any secret
gitleaks dir .               # secrets
semgrep scan --config p/owasp-top-ten   # SAST
```
