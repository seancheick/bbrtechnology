// Contract shared by /api/demo and the demo UI.

export const industries = ["home-services", "ecommerce", "property"] as const;
export type Industry = (typeof industries)[number];

export const categories = ["maintenance", "cleaning", "booking", "billing", "question", "complaint", "other"] as const;
export const urgencies = ["low", "normal", "high", "urgent"] as const;
export const channels = ["sms", "email", "slack"] as const;

export interface DemoResult {
  category: (typeof categories)[number];
  urgency: (typeof urgencies)[number];
  summary: string;
  task: { needed: boolean; title: string; assignee_role: string; due: string };
  alert: { channel: (typeof channels)[number]; to_role: string; message: string };
  draft_reply: string;
  escalate: boolean;
  escalation_reason: string;
  confidence: number;
}

export type DemoResponse =
  | { mode: "live"; provider: "groq" | "gemini"; model: string; result: DemoResult; ms: number }
  | { mode: "unavailable"; reason: "no_provider" | "providers_failed" | "daily_cap" }
  | { mode: "rate_limited"; retryAfter: number }
  | { error: string };

export const MAX_MESSAGE = 500;

const LIMITS = { summary: 160, title: 90, role: 40, due: 40, alert: 200, reply: 600, reason: 160 };

// JSON Schema for Groq strict mode: every field required, no extra properties.
export const resultJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["category", "urgency", "summary", "task", "alert", "draft_reply", "escalate", "escalation_reason", "confidence"],
  properties: {
    category: { type: "string", enum: [...categories] },
    urgency: { type: "string", enum: [...urgencies] },
    summary: { type: "string" },
    task: {
      type: "object",
      additionalProperties: false,
      required: ["needed", "title", "assignee_role", "due"],
      properties: {
        needed: { type: "boolean" },
        title: { type: "string" },
        assignee_role: { type: "string" },
        due: { type: "string" },
      },
    },
    alert: {
      type: "object",
      additionalProperties: false,
      required: ["channel", "to_role", "message"],
      properties: {
        channel: { type: "string", enum: [...channels] },
        to_role: { type: "string" },
        message: { type: "string" },
      },
    },
    draft_reply: { type: "string" },
    escalate: { type: "boolean" },
    escalation_reason: { type: "string" },
    confidence: { type: "number" },
  },
} as const;

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const str = (v: unknown, max: number): string | null =>
  typeof v === "string" ? v.trim().replace(/\s+\n/g, "\n").slice(0, max) : null;
const oneOf = <T extends readonly string[]>(v: unknown, list: T): T[number] | null =>
  typeof v === "string" && (list as readonly string[]).includes(v) ? (v as T[number]) : null;

// Returns a clean DemoResult or null. Wrong types or enum values reject the whole result;
// over-long strings are clipped.
export function validateResult(raw: unknown): DemoResult | null {
  if (!isObj(raw) || !isObj(raw.task) || !isObj(raw.alert)) return null;
  const category = oneOf(raw.category, categories);
  const urgency = oneOf(raw.urgency, urgencies);
  const channel = oneOf(raw.alert.channel, channels);
  const summary = str(raw.summary, LIMITS.summary);
  const title = str(raw.task.title, LIMITS.title);
  const role = str(raw.task.assignee_role, LIMITS.role);
  const due = str(raw.task.due, LIMITS.due);
  const toRole = str(raw.alert.to_role, LIMITS.role);
  const alertMsg = str(raw.alert.message, LIMITS.alert);
  const reply = str(raw.draft_reply, LIMITS.reply);
  const reason = str(raw.escalation_reason, LIMITS.reason);
  const conf = typeof raw.confidence === "number" && Number.isFinite(raw.confidence) ? raw.confidence : null;
  if (
    !category || !urgency || !channel || summary === null || title === null || role === null || due === null ||
    toRole === null || alertMsg === null || reply === null || reason === null || conf === null ||
    typeof raw.task.needed !== "boolean" || typeof raw.escalate !== "boolean" || !summary || !reply
  ) {
    return null;
  }
  return {
    category,
    urgency,
    summary,
    task: { needed: raw.task.needed, title, assignee_role: role, due },
    alert: { channel, to_role: toRole, message: alertMsg },
    draft_reply: reply,
    escalate: raw.escalate,
    escalation_reason: reason,
    confidence: Math.min(1, Math.max(0, conf > 1 ? conf / 100 : conf)),
  };
}

export function parseRequest(body: unknown):
  | { ok: true; industry: Industry; message: string }
  | { ok: false; error: string } {
  if (!isObj(body)) return { ok: false, error: "Body must be a JSON object." };
  if (typeof body.website === "string" && body.website.trim() !== "") return { ok: false, error: "Rejected." };
  const industry = oneOf(body.industry, industries);
  if (!industry) return { ok: false, error: "Unknown industry." };
  if (typeof body.message !== "string") return { ok: false, error: "Message is required." };
  const message = body.message.trim();
  if (message.length === 0) return { ok: false, error: "Message is required." };
  if (message.length > MAX_MESSAGE) return { ok: false, error: `Message must be ${MAX_MESSAGE} characters or fewer.` };
  return { ok: true, industry, message };
}
