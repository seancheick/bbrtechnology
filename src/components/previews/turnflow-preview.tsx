"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Loader2, RefreshCw, ShieldAlert, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

// Rebuild of TurnFlow's Bookability Guardian and agent repair flow, from the STR-Management
// README (rule ids, severities, the 153-night finding, the approve-then-verify sequence).
// Listings, dates and prices are fictional. Styled in TurnFlow's own theme (globals.css and
// components/dashboard/bookability-section.tsx): warm paper, #16423c, system type, severity pills.

type Severity = "critical" | "warning" | "info";
const findings: { rule: string; severity: Severity; calendar: string; detail: string; fixable?: boolean }[] = [
  {
    rule: "missing_price",
    severity: "critical",
    calendar: "Harbor Loft · Booking.com · Standard Rate",
    detail: "153 sellable nights have no price. Guests can't book them.",
    fixable: true,
  },
  {
    rule: "pricing_stale",
    severity: "warning",
    calendar: "Cape House · Airbnb",
    detail: "No price change in 72 hours from the pricing tool.",
  },
  {
    rule: "restriction_conflict",
    severity: "warning",
    calendar: "Cape House · VRBO",
    detail: "Minimum stay 5 is above maximum stay 4 on an open night.",
  },
  {
    rule: "far_out_min_stay",
    severity: "info",
    calendar: "Beacon Studio · Booking.com",
    detail: "7-night minimum on open dates in July.",
  },
];

const calendars = [
  "Harbor Loft · Airbnb",
  "Harbor Loft · Booking.com",
  "Cape House · Airbnb",
  "Cape House · VRBO",
  "Beacon Studio · Booking.com",
  "Beacon Studio · Airbnb",
];

const sev: Record<Severity, string> = {
  critical: "border-red-200 bg-red-50 text-red-800",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  info: "border-[#1d1b18]/15 bg-[#ebe4d7] text-[#61594f]",
};

const agentSteps = [
  { tool: "get_bookability_report", out: "missing_price on Standard Rate, Mar 1–2" },
  { tool: "preview_calendar_change", out: "dry run: current = none, proposed = $165, no warnings" },
  { tool: "owner approval", out: "“Set Mar 1–2 to $165?”", approval: true },
  { tool: "apply_calendar_change", out: "approved: true, requestId claimed, sent to channel manager" },
  { tool: "verify_calendar_change", out: "read back from the channel: live" },
];

export function TurnFlowPreview() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = React.useState<"idle" | "scanning" | "found" | "agent">("found");
  const [scanned, setScanned] = React.useState(0);
  const [step, setStep] = React.useState(0);
  const [approved, setApproved] = React.useState(false);

  React.useEffect(() => {
    if (phase !== "scanning") return;
    if (scanned >= calendars.length) {
      const t = setTimeout(() => setPhase("found"), 250);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setScanned((n) => n + 1), reduce ? 0 : 220);
    return () => clearTimeout(t);
  }, [phase, scanned, reduce]);

  React.useEffect(() => {
    if (phase !== "agent") return;
    const waiting = agentSteps[step]?.approval && !approved;
    if (waiting || step >= agentSteps.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), reduce ? 0 : 650);
    return () => clearTimeout(t);
  }, [phase, step, approved, reduce]);

  const startScan = () => {
    setScanned(0);
    setStep(0);
    setApproved(false);
    setPhase("scanning");
  };

  return (
    <div
      className="p-4 text-[#1d1b18] antialiased sm:p-5"
      style={{
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        background: "radial-gradient(circle at top left, rgba(217,195,161,0.25), transparent 32%), linear-gradient(180deg, #faf7f1 0%, #f4f1ea 100%)",
      }}
    >
      <section className="rounded-2xl border border-[#1d1b18]/[0.13] bg-[#fffdf8] p-4 sm:p-5">
        {phase !== "idle" && phase !== "scanning" && (
          <div
            role="status"
            className={cn(
              "mb-3 flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs",
              step >= agentSteps.length ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-red-200 bg-red-50 text-red-800"
            )}
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            {step >= agentSteps.length ? "All critical findings resolved." : "1 critical bookability problem is open."}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold">Bookability</h3>
            <p className="mt-1 text-xs text-[#61594f]">Read-only scan of 6 channel calendars, 180 days ahead · fictional portfolio</p>
          </div>
          <button
            type="button"
            onClick={startScan}
            disabled={phase === "scanning"}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#16423c] px-4 text-xs font-medium text-[#f7f5ef] disabled:opacity-60"
          >
            {phase === "scanning" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
            {phase === "idle" ? "Run scan" : "Scan again"}
          </button>
        </div>

        {(phase === "idle" || phase === "scanning") && (
          <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
            {calendars.map((c, i) => (
              <li key={c} className="flex items-center justify-between rounded-xl border border-[#1d1b18]/10 px-3 py-2 text-xs">
                <span>{c}</span>
                {phase === "scanning" && i < scanned ? (
                  <Check className="h-3.5 w-3.5 text-[#16423c]" />
                ) : phase === "scanning" && i === scanned ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-[#61594f]" />
                ) : (
                  <span className="text-[#61594f]">—</span>
                )}
              </li>
            ))}
          </ul>
        )}

        {(phase === "found" || phase === "agent") && (
          <ul className="mt-3 divide-y divide-[#1d1b18]/10">
            {findings.map((f, i) => {
              const resolved = f.fixable && step >= agentSteps.length;
              return (
                <motion.li
                  key={f.rule}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : i * 0.08 }}
                  className={cn("flex items-start justify-between gap-3 py-3", resolved && "opacity-60")}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{f.detail}</p>
                    <p className="mt-1 text-xs text-[#61594f]">
                      {f.calendar} · <code className="font-[family-name:var(--font-mono)] text-[11px] text-[#16423c]">{f.rule}</code>
                      {resolved && <span className="font-medium text-[#16423c]"> · Resolved</span>}
                    </p>
                    {f.fixable && phase === "found" && (
                      <button
                        type="button"
                        onClick={() => setPhase("agent")}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#16423c]/30 px-3 py-1 text-[11px] font-semibold text-[#16423c] hover:bg-[#16423c]/5"
                      >
                        <Bot className="h-3 w-3" /> Let an agent fix it
                      </button>
                    )}
                  </div>
                  <span className={cn("inline-flex shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium capitalize", sev[f.severity])}>
                    {f.severity}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        )}

        {phase === "agent" && (
          <div className="mt-3 rounded-xl bg-[#16423c] p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed text-[#e9f1ee]">
            {agentSteps.slice(0, step + 1).map((s, i) => (
              <div key={s.tool} className="flex gap-2">
                <span className="text-[#9fc3b8]">{i < step ? "✓" : "›"}</span>
                <span>
                  <span className="text-white">{s.tool}</span> <span className="text-[#9fc3b8]">{s.out}</span>
                  {s.approval && i === step && !approved && (
                    <button
                      type="button"
                      onClick={() => {
                        setApproved(true);
                        setStep((x) => x + 1);
                      }}
                      className="ml-2 rounded bg-[#f4f1ea] px-2 py-0.5 font-sans text-[11px] font-semibold text-[#16423c]"
                    >
                      Approve as owner
                    </button>
                  )}
                </span>
              </div>
            ))}
            {step >= agentSteps.length && <div className="mt-1 text-white">✓ verified, live on channel · audit log entry written</div>}
          </div>
        )}
      </section>
    </div>
  );
}
