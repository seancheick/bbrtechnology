import { resultJsonSchema, validateResult, type DemoResult } from "@/lib/demo/schema";

export type ProviderName = "groq" | "gemini";

interface ProviderCall {
  system: string;
  message: string;
  timeoutMs: number;
}

interface ProviderResult {
  provider: ProviderName;
  model: string;
  result: DemoResult;
}

class ProviderError extends Error {
  constructor(public provider: ProviderName, public code: string) {
    super(`${provider}:${code}`);
  }
}

// Groq rate limits are per model, so a second model gives a fresh allowance when the
// first one is busy. GROQ_MODELS overrides the order; GROQ_MODEL is the older single value.
function groqModels() {
  const raw = process.env.GROQ_MODELS || process.env.GROQ_MODEL || "openai/gpt-oss-120b,openai/gpt-oss-20b";
  return raw.split(",").map((m) => m.trim()).filter(Boolean);
}

function geminiModel() {
  return process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
}

function parseJson(text: string | undefined): unknown {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

async function callGroq(call: ProviderCall): Promise<ProviderResult> {
  let last: unknown = new ProviderError("groq", "no_model");
  for (const model of groqModels()) {
    try {
      return await callGroqModel(call, model);
    } catch (err) {
      last = err;
    }
  }
  throw last;
}

async function callGroqModel({ system, message, timeoutMs }: ProviderCall, model: string): Promise<ProviderResult> {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new ProviderError("groq", "not_configured");
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    signal: AbortSignal.timeout(timeoutMs),
    body: JSON.stringify({
      model,
      temperature: 0.2,
      max_completion_tokens: 1100,
      reasoning_effort: "low",
      include_reasoning: false,
      messages: [
        { role: "system", content: system },
        { role: "user", content: `Customer message:\n"""\n${message}\n"""` },
      ],
      response_format: {
        type: "json_schema",
        json_schema: { name: "inquiry_triage", strict: true, schema: resultJsonSchema },
      },
    }),
  });
  if (!res.ok) throw new ProviderError("groq", `http_${res.status}`);
  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const result = validateResult(parseJson(data.choices?.[0]?.message?.content));
  if (!result) throw new ProviderError("groq", "invalid_output");
  return { provider: "groq", model, result };
}

// Gemini's responseSchema uses the OpenAPI subset (uppercase types).
function toGeminiSchema(node: unknown): unknown {
  if (Array.isArray(node)) return node.map(toGeminiSchema);
  if (typeof node !== "object" || node === null) return node;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(node)) {
    if (k === "additionalProperties") continue;
    if (k === "type" && typeof v === "string") out.type = v.toUpperCase();
    else out[k] = toGeminiSchema(v);
  }
  return out;
}

async function callGemini({ system, message, timeoutMs }: ProviderCall): Promise<ProviderResult> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new ProviderError("gemini", "not_configured");
  const model = geminiModel();
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: "POST",
      headers: { "x-goog-api-key": key, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(timeoutMs),
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts: [{ text: `Customer message:\n"""\n${message}\n"""` }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1200,
          responseMimeType: "application/json",
          responseSchema: toGeminiSchema(resultJsonSchema),
        },
      }),
    }
  );
  if (!res.ok) throw new ProviderError("gemini", `http_${res.status}`);
  const data = (await res.json()) as {
    candidates?: { finishReason?: string; content?: { parts?: { text?: string }[] } }[];
  };
  const candidate = data.candidates?.[0];
  if (candidate?.finishReason && candidate.finishReason !== "STOP") {
    throw new ProviderError("gemini", `finish_${candidate.finishReason.toLowerCase()}`);
  }
  const result = validateResult(parseJson(candidate?.content?.parts?.map((p) => p.text ?? "").join("")));
  if (!result) throw new ProviderError("gemini", "invalid_output");
  return { provider: "gemini", model, result };
}

const registry: Record<ProviderName, { configured: () => boolean; call: (c: ProviderCall) => Promise<ProviderResult> }> = {
  groq: { configured: () => Boolean(process.env.GROQ_API_KEY), call: callGroq },
  gemini: { configured: () => Boolean(process.env.GEMINI_API_KEY), call: callGemini },
};

export function providerOrder(): ProviderName[] {
  const raw = (process.env.DEMO_PROVIDER_ORDER || "groq,gemini").split(",").map((s) => s.trim());
  return raw.filter((p): p is ProviderName => p === "groq" || p === "gemini");
}

export function configuredProviders(): ProviderName[] {
  return providerOrder().filter((p) => registry[p].configured());
}

export async function runProviders(
  system: string,
  message: string,
  log: (entry: Record<string, unknown>) => void
): Promise<ProviderResult | null> {
  // Groq answers in about a second; the Gemini free tier can take 10s+ when busy.
  const timeouts: Record<ProviderName, number> = {
    groq: Number(process.env.DEMO_PROVIDER_TIMEOUT_MS) || 8000,
    gemini: Number(process.env.GEMINI_TIMEOUT_MS) || 20000,
  };
  for (const name of configuredProviders()) {
    const started = Date.now();
    try {
      const out = await registry[name].call({ system, message, timeoutMs: timeouts[name] });
      log({ provider: name, outcome: "ok", ms: Date.now() - started });
      return out;
    } catch (err) {
      const code =
        err instanceof ProviderError ? err.code : err instanceof Error && err.name === "TimeoutError" ? "timeout" : "error";
      log({ provider: name, outcome: code, ms: Date.now() - started });
    }
  }
  return null;
}
