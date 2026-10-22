import { createHash } from "node:crypto";

// Fixed-window limits. Upstash REST when configured (durable across serverless
// instances); an in-memory map otherwise, which is only suitable for local dev.
export const LIMITS = {
  perMinute: Number(process.env.DEMO_PER_MINUTE) || 5,
  perDay: Number(process.env.DEMO_PER_DAY) || 30,
  globalPerDay: Number(process.env.DEMO_DAILY_CAP) || 300,
};

const memory = new Map<string, { count: number; expires: number }>();
let warned = false;

function upstash() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

async function incr(keys: { key: string; ttl: number }[]): Promise<number[]> {
  const remote = upstash();
  if (remote) {
    const commands = keys.flatMap(({ key, ttl }) => [
      ["INCR", key],
      ["EXPIRE", key, String(ttl), "NX"],
    ]);
    const res = await fetch(`${remote.url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${remote.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(commands),
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) throw new Error(`upstash_${res.status}`);
    const out = (await res.json()) as { result: number }[];
    return keys.map((_, i) => Number(out[i * 2]?.result ?? 0));
  }
  if (!warned && process.env.NODE_ENV === "production") {
    console.warn("[demo] UPSTASH_REDIS_REST_URL not set; using per-instance memory rate limits");
    warned = true;
  }
  const now = Date.now();
  return keys.map(({ key, ttl }) => {
    const hit = memory.get(key);
    if (!hit || hit.expires < now) {
      memory.set(key, { count: 1, expires: now + ttl * 1000 });
      return 1;
    }
    hit.count += 1;
    return hit.count;
  });
}

export function clientKey(headers: Headers): string {
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
  // Only a salted hash is stored, never the address itself.
  return createHash("sha256").update(`${process.env.DEMO_IP_SALT ?? "bbr-demo"}:${ip}`).digest("hex").slice(0, 24);
}

export type LimitOutcome =
  | { ok: true }
  | { ok: false; reason: "rate_limited"; retryAfter: number }
  | { ok: false; reason: "daily_cap" };

export async function checkLimits(client: string): Promise<LimitOutcome> {
  const now = new Date();
  const minute = Math.floor(now.getTime() / 60000);
  const day = now.toISOString().slice(0, 10);
  let counts: number[];
  try {
    counts = await incr([
      { key: `demo:m:${client}:${minute}`, ttl: 60 },
      { key: `demo:d:${client}:${day}`, ttl: 86400 },
      { key: `demo:g:${day}`, ttl: 86400 },
    ]);
  } catch {
    // Limiter unavailable: fail closed for the expensive path.
    return { ok: false, reason: "daily_cap" };
  }
  const [m, d, g] = counts;
  if (g > LIMITS.globalPerDay) return { ok: false, reason: "daily_cap" };
  if (m > LIMITS.perMinute) return { ok: false, reason: "rate_limited", retryAfter: 60 - now.getSeconds() };
  if (d > LIMITS.perDay) {
    const tomorrow = new Date(`${day}T00:00:00Z`).getTime() + 86400000;
    return { ok: false, reason: "rate_limited", retryAfter: Math.ceil((tomorrow - now.getTime()) / 1000) };
  }
  return { ok: true };
}
