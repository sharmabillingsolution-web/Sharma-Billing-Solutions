/**
 * BASIC, NON-DISTRIBUTED fallback limiter (in-memory per server instance).
 * On serverless platforms each instance has its own memory, so this is a speed bump only.
 * For production, swap in Upstash Redis / Vercel KV (e.g. @upstash/ratelimit) behind this same function.
 */
const hits = new Map<string, number[]>();
export function rateLimit(key: string, limit = 5, windowMs = 10 * 60_000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) { hits.set(key, recent); return false; }
  recent.push(now); hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  return true;
}
