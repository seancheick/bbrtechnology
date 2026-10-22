import { parseRequest, type DemoResponse } from "@/lib/demo/schema";
import { systemPrompt } from "@/lib/demo/prompt";
import { configuredProviders, runProviders } from "@/lib/demo/providers";
import { checkLimits, clientKey } from "@/lib/demo/rate-limit";

const MAX_BODY_BYTES = 2048;

function json(body: DemoResponse, status: number, headers?: Record<string, string>) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

// Logs carry outcome, provider and timing only. Message text is never logged or stored.
function log(entry: Record<string, unknown>) {
  console.info(JSON.stringify({ at: "api/demo", ...entry }));
}

export async function POST(request: Request) {
  const type = request.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) return json({ error: "Expected application/json." }, 415);

  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return json({ error: "Request too large." }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid JSON." }, 400);
  }

  const parsed = parseRequest(body);
  if (!parsed.ok) return json({ error: parsed.error }, 400);

  const limit = await checkLimits(clientKey(request.headers));
  if (!limit.ok) {
    log({ outcome: limit.reason });
    if (limit.reason === "daily_cap") return json({ mode: "unavailable", reason: "daily_cap" }, 503);
    return json({ mode: "rate_limited", retryAfter: limit.retryAfter }, 429, { "Retry-After": String(limit.retryAfter) });
  }

  if (configuredProviders().length === 0) {
    log({ outcome: "no_provider" });
    return json({ mode: "unavailable", reason: "no_provider" }, 503);
  }

  const started = Date.now();
  const out = await runProviders(systemPrompt(parsed.industry), parsed.message, (e) =>
    log({ industry: parsed.industry, length: parsed.message.length, ...e })
  );
  if (!out) return json({ mode: "unavailable", reason: "providers_failed" }, 503);

  return json({ mode: "live", provider: out.provider, model: out.model, result: out.result, ms: Date.now() - started }, 200);
}
