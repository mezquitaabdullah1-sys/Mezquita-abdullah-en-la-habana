/**
 * ✅ Strict, allowlist/schema-based input validation (zero dependencies).
 *
 * Anything not declared in the schema is stripped. Type coercion is explicit
 * (query params arrive as strings). Malformed input → ValidationError → 400.
 */

export class ValidationError extends Error {
  constructor(details) {
    super('validation_error');
    this.name = 'ValidationError';
    this.details = details; // [{ field, message }]
  }
}

/**
 * @param {Record<string, {type:'string'|'number', required?:boolean, default?:any,
 *   min?:number, max?:number, pattern?:RegExp, enum?:any[]}>} schema
 * @param {Record<string, unknown>} input
 */
export function validate(schema, input = {}) {
  const out = {};
  const errors = [];

  for (const [field, rules] of Object.entries(schema)) {
    const raw = input[field];

    if (raw === undefined || raw === null || raw === '') {
      if (rules.required) {
        errors.push({ field, message: 'is required' });
      } else if ('default' in rules) {
        out[field] = rules.default;
      }
      continue;
    }

    if (rules.type === 'number') {
      const n = Number(raw);
      if (!Number.isFinite(n)) { errors.push({ field, message: 'must be a number' }); continue; }
      if (rules.min !== undefined && n < rules.min) { errors.push({ field, message: `must be >= ${rules.min}` }); continue; }
      if (rules.max !== undefined && n > rules.max) { errors.push({ field, message: `must be <= ${rules.max}` }); continue; }
      out[field] = n;
      continue;
    }

    const s = String(raw);
    if (rules.min !== undefined && s.length < rules.min) { errors.push({ field, message: `must be at least ${rules.min} chars` }); continue; }
    if (rules.max !== undefined && s.length > rules.max) { errors.push({ field, message: `must be at most ${rules.max} chars` }); continue; }
    if (rules.pattern && !rules.pattern.test(s)) { errors.push({ field, message: 'has invalid format' }); continue; }
    if (rules.enum && !rules.enum.includes(s)) { errors.push({ field, message: `must be one of: ${rules.enum.join(', ')}` }); continue; }
    out[field] = s;
  }

  if (errors.length) throw new ValidationError(errors);
  return out;
}

/** Schemas for every public endpoint (allowlist — unknown params are dropped). */
export const SCHEMAS = {
  translate: {
    text:   { type: 'string', required: true, min: 1, max: 500 },
    source: { type: 'string', pattern: /^[a-z]{2}$/, default: 'ar' },
    target: { type: 'string', pattern: /^[a-z]{2}$/, default: 'es' },
  },
  geocode: {
    lat: { type: 'number', required: true, min: -90,  max: 90 },
    lng: { type: 'number', required: true, min: -180, max: 180 },
  },
  duasCategory: {
    id: { type: 'string', required: true, pattern: /^[a-z_]{1,40}$/ },
  },
};
