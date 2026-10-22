"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BellRing,
  BookOpen,
  ClipboardCheck,
  FileText,
  Handshake,
  Terminal,
  Inbox,
  Loader2,
  Mail,
  MessageSquare,
  MessageSquareText,
  Play,
  ShieldCheck,
  Smartphone,
  Tags,
  UserRoundCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { demoScenarios } from "@/data/demo-scenarios";
import { demoBusinesses } from "@/lib/demo/businesses";
import { MAX_MESSAGE, industries, type DemoResponse, type DemoResult, type Industry } from "@/lib/demo/schema";

type RunState =
  | { status: "idle" }
  | { status: "running" }
  | { status: "done"; result: DemoResult; source: "live" | "simulated"; meta: string; notice?: string }
  | { status: "unavailable"; notice: string };

const urgencyStyle: Record<DemoResult["urgency"], string> = {
  urgent: "bg-red-500/10 text-red-600 ring-red-500/30 dark:text-red-400",
  high: "bg-amber-500/10 text-amber-700 ring-amber-500/30 dark:text-gold-400",
  normal: "bg-sky-500/10 text-sky-700 ring-sky-500/30 dark:text-sky-300",
  low: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/30 dark:text-emerald-300",
};

const channelIcon = { sms: Smartphone, email: Mail, slack: MessageSquare } as const;

const reasonText: Record<string, string> = {
  no_provider: "Live AI isn't configured on this deployment.",
  providers_failed: "The AI providers didn't answer in time.",
  daily_cap: "Today's free demo capacity is used up.",
  rate_limited: "You've run the demo a lot in a short time.",
  network: "We couldn't reach the demo service.",
};

export function InquiryPipeline({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();
  const [industry, setIndustry] = React.useState<Industry>(industries[0]);
  const [presetId, setPresetId] = React.useState<string>(demoScenarios[industries[0]][0].id);
  const [message, setMessage] = React.useState(demoScenarios[industries[0]][0].message);
  const [run, setRun] = React.useState<RunState>({ status: "idle" });
  const [website, setWebsite] = React.useState("");
  const business = demoBusinesses[industry];
  const scenarios = demoScenarios[industry];
  const preset = scenarios.find((s) => s.id === presetId && s.message === message);

  function chooseIndustry(next: Industry) {
    setIndustry(next);
    setPresetId(demoScenarios[next][0].id);
    setMessage(demoScenarios[next][0].message);
    setRun({ status: "idle" });
  }

  function choosePreset(id: string) {
    const s = scenarios.find((x) => x.id === id);
    if (!s) return;
    setPresetId(id);
    setMessage(s.message);
    setRun({ status: "idle" });
  }

  async function execute() {
    const text = message.trim();
    if (!text || run.status === "running") return;
    setRun({ status: "running" });
    track("demo_run", { industry, input: preset ? "preset" : "custom" });

    let reason = "network";
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry, message: text, website }),
      });
      const data = (await res.json()) as DemoResponse;
      if ("mode" in data && data.mode === "live") {
        setRun({
          status: "done",
          result: data.result,
          source: "live",
          meta: `${data.provider === "groq" ? "Groq" : "Gemini"} · ${data.model.replace(/^openai\//, "")} · ${(data.ms / 1000).toFixed(1)}s`,
        });
        track("demo_completed", { industry, mode: "live", provider: data.provider });
        return;
      }
      if ("mode" in data && data.mode === "unavailable") reason = data.reason;
      else if ("mode" in data && data.mode === "rate_limited") reason = "rate_limited";
      else if ("error" in data) {
        setRun({ status: "unavailable", notice: data.error });
        return;
      }
    } catch {
      reason = "network";
    }

    const why = reasonText[reason] ?? reasonText.network;
    if (preset) {
      // Only a preset may fall back, and it is always labeled as simulated.
      setRun({
        status: "done",
        result: preset.simulated,
        source: "simulated",
        meta: "Pre-written example",
        notice: `${why} Showing a simulated run of this example instead.`,
      });
      track("demo_completed", { industry, mode: "simulated" });
    } else {
      setRun({
        status: "unavailable",
        notice: `${why} Your message wasn't processed. Pick one of the examples to see a simulated run.`,
      });
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-bg-elevated shadow-[0_40px_120px_-60px_rgba(10,15,26,0.5)]">
      {/* Industry switcher */}
      <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div role="tablist" aria-label="Choose a business" className="-mx-5 flex gap-1.5 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
          {industries.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={industry === id}
              onClick={() => chooseIndustry(id)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600",
                industry === id
                  ? "bg-navy-900 text-white dark:bg-white dark:text-navy-950"
                  : "text-foreground-muted hover:bg-bg-alt hover:text-foreground"
              )}
            >
              {demoBusinesses[id].label}
            </button>
          ))}
        </div>
        <p className="eyebrow text-foreground-subtle">
          Fictional business · <span className="text-foreground-muted">{business.name}</span>
        </p>
      </div>

      <div className={cn("grid", compact ? "lg:grid-cols-[0.9fr_1.1fr]" : "lg:grid-cols-[0.85fr_1.15fr]")}>
        {/* Input */}
        <div className="flex flex-col gap-4 border-b border-border p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Inbox className="h-4 w-4 text-amber-600" /> Incoming message
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Example messages">
            {scenarios.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => choosePreset(s.id)}
                aria-pressed={preset?.id === s.id}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600",
                  preset?.id === s.id
                    ? "border-amber-600/50 bg-amber-600/10 text-foreground"
                    : "border-border text-foreground-muted hover:text-foreground"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
          <label htmlFor="demo-message" className="sr-only">
            Customer message
          </label>
          <div className="relative">
            <textarea
              id="demo-message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value.slice(0, MAX_MESSAGE));
                if (run.status !== "running") setRun({ status: "idle" });
              }}
              rows={compact ? 3 : 4}
              maxLength={MAX_MESSAGE}
              className="w-full resize-none rounded-2xl border border-border bg-bg p-4 pb-8 text-base leading-relaxed text-foreground placeholder:text-foreground-subtle focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/20"
              placeholder="Write a message a customer might send…"
            />
            <span className="tabular pointer-events-none absolute bottom-3 right-4 text-xs text-foreground-subtle">
              {message.length}/{MAX_MESSAGE}
            </span>
          </div>
          {/* Honeypot: hidden from people, tempting to bots */}
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <button
            type="button"
            onClick={execute}
            disabled={!message.trim() || run.status === "running"}
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-navy-900 px-6 text-sm font-semibold text-gold-400 transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gold-400 dark:text-navy-950 dark:hover:bg-gold-400/90"
          >
            {run.status === "running" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Running workflow…
              </>
            ) : (
              <>
                <Play className="h-4 w-4" /> Run the workflow
              </>
            )}
          </button>
          <p className="text-xs leading-relaxed text-foreground-subtle">
            Sandbox. Nothing is sent, booked or stored, and messages are processed by a third-party AI
            provider, so please don&apos;t include personal details.
          </p>
        </div>

        {/* Output */}
        <div className="relative bg-bg-alt/60 p-5 sm:p-6 lg:min-h-[420px]" aria-live="polite" data-ph-mask>
          <StatusLine run={run} />
          <AnimatePresence mode="wait">
            {run.status === "done" ? (
              <motion.ol
                key={`${run.source}-${run.result.summary}`}
                className="mt-4 space-y-3"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.14 } } }}
              >
                <Stage icon={Tags} title="Classified">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-navy-900 px-2 py-1 text-xs font-semibold capitalize text-white dark:bg-white dark:text-navy-950">
                      {run.result.category.replace("_", " ")}
                    </span>
                    <span className={cn("rounded-md px-2 py-1 text-xs font-semibold capitalize ring-1", urgencyStyle[run.result.urgency])}>
                      {run.result.urgency}
                    </span>
                    <span className="tabular ml-auto text-xs text-foreground-subtle">
                      {Math.round(run.result.confidence * 100)}% confidence
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-foreground-muted">{run.result.summary}</p>
                </Stage>
                {run.result.extracted.length > 0 && (
                  <Stage icon={FileText} title="Fields read from the document">
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                      {run.result.extracted.map((f) => (
                        <div key={f.field} className="min-w-0">
                          <dt className="text-xs text-foreground-subtle">{f.field}</dt>
                          <dd className="truncate font-medium text-foreground">{f.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-2 text-xs text-foreground-subtle">Front desk verifies before anything reaches the chart.</p>
                  </Stage>
                )}
                {run.result.sources.length > 0 && (
                  <Stage icon={BookOpen} title="Checked against records">
                    <ul className="space-y-2">
                      {run.result.sources.map((src) => (
                        <li key={src.title} className="rounded-xl bg-bg-elevated p-3 text-sm ring-1 ring-border">
                          <p className="text-xs font-semibold text-amber-600 dark:text-gold-400">{src.title}</p>
                          <p className="mt-1 text-foreground-muted">&ldquo;{src.quote}&rdquo;</p>
                        </li>
                      ))}
                    </ul>
                  </Stage>
                )}
                <Stage icon={ClipboardCheck} title={run.result.task.needed ? "Task created" : "No task needed"}>
                  {run.result.task.needed ? (
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm font-medium text-foreground">{run.result.task.title}</p>
                      <p className="text-xs text-foreground-subtle">
                        {run.result.task.assignee_role} · {run.result.task.due}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-foreground-muted">Nothing for the team to do yet.</p>
                  )}
                </Stage>
                {run.result.handoff.needed && (
                  <Stage icon={Handshake} title={`Handed off · ${run.result.handoff.partner}`}>
                    <p className="text-sm font-medium text-foreground">{run.result.handoff.service}</p>
                    <p className="mt-1 text-sm text-foreground-muted">{run.result.handoff.detail}</p>
                    {/homecierge/i.test(run.result.handoff.partner) && (
                      <a
                        href="https://www.homeciergeapp.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-xs font-semibold text-amber-600 underline-offset-4 hover:underline dark:text-gold-400"
                      >
                        Homecierge, our home-services partner ↗
                      </a>
                    )}
                  </Stage>
                )}
                {run.result.tool_call.needed && (
                  <Stage icon={Terminal} title={`Tool call proposed · ${run.result.tool_call.system}`}>
                    <code className="block overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-navy-950 p-3 font-[family-name:var(--font-mono)] text-xs text-gold-400">
                      {run.result.tool_call.action}
                    </code>
                    <p className="mt-2 text-xs text-foreground-subtle">{run.result.tool_call.summary} Nothing runs until a person approves.</p>
                  </Stage>
                )}
                <Stage icon={BellRing} title="Alert routed">
                  <AlertLine alert={run.result.alert} />
                </Stage>
                <Stage icon={MessageSquareText} title="Reply drafted">
                  <p className="rounded-2xl rounded-tl-sm bg-bg-elevated p-3 text-sm leading-relaxed text-foreground shadow-sm ring-1 ring-border">
                    {run.result.draft_reply}
                  </p>
                  <p className="mt-2 text-xs text-foreground-subtle">Waits for staff approval before sending.</p>
                </Stage>
                <Stage icon={run.result.escalate ? UserRoundCheck : ShieldCheck} title={run.result.escalate ? "Escalated to a person" : "Within the rules"}>
                  <p className="text-sm text-foreground-muted">
                    {run.result.escalate
                      ? run.result.escalation_reason || "A team member needs to decide."
                      : "Handled by the playbook. A person still approves the reply."}
                  </p>
                </Stage>
              </motion.ol>
            ) : (
              <motion.ol key="placeholder" className="mt-4 hidden space-y-3 lg:block" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {["Classified", "Task created", "Alert routed", "Reply drafted", "Escalation decision"].map((t, i) => (
                  <li
                    key={t}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border border-dashed border-border px-4 py-3.5 text-sm text-foreground-subtle",
                      run.status === "running" && "animate-pulse"
                    )}
                    style={{ animationDelay: `${i * 120}ms` }}
                  >
                    <span className="tabular eyebrow">{String(i + 1).padStart(2, "0")}</span>
                    {t}
                  </li>
                ))}
              </motion.ol>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function StatusLine({ run }: { run: RunState }) {
  if (run.status === "done") {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
            run.source === "live" ? "bg-success/15 text-emerald-700 dark:text-emerald-300" : "bg-amber-600/15 text-amber-700 dark:text-gold-400"
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", run.source === "live" ? "bg-success" : "bg-amber-600")} />
          {run.source === "live" ? "Live AI" : "Simulated"}
        </span>
        <span className="text-xs text-foreground-subtle">{run.meta}</span>
        {run.notice && <p className="w-full text-xs text-foreground-muted">{run.notice}</p>}
      </div>
    );
  }
  if (run.status === "unavailable") {
    return <p className="rounded-xl bg-amber-600/10 px-3 py-2 text-sm text-foreground">{run.notice}</p>;
  }
  return (
    <p className="text-sm text-foreground-muted">
      {run.status === "running" ? "Reading the message against the business rules…" : "Pick an example or write your own, then run it."}
    </p>
  );
}

function Stage({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.li
      variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } } }}
      className="rounded-2xl border border-border bg-bg-elevated p-4"
    >
      <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
        <Icon className="h-3.5 w-3.5 text-amber-600" /> {title}
      </p>
      {children}
    </motion.li>
  );
}

function AlertLine({ alert }: { alert: DemoResult["alert"] }) {
  const Icon = channelIcon[alert.channel];
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bg-alt ring-1 ring-border">
        <Icon className="h-4 w-4 text-foreground" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">
          {alert.to_role} <span className="font-normal uppercase text-foreground-subtle">· {alert.channel}</span>
        </p>
        <p className="text-sm text-foreground-muted">{alert.message}</p>
      </div>
    </div>
  );
}
