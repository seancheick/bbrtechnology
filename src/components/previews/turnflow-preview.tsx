"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Loader2, RefreshCw, ShieldAlert, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

// Rebuild of TurnFlow's Bookability Guardian and agent repair flow, from the STR-Management
// README (rule ids, severities, the 153-night finding, the approve-then-verify sequence).
// Listings, dates and prices are fictional.

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
  critical: "bg-[#b43f33] text-white",
  warning: "bg-[#a3480a] text-white",
  info: "bg-[#1e5aa8] text-white",
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
    <div className="bg-[#f4f1ea] p-4 text-[#1d1b18] sm:p-5">
      {phase !== "idle" && phase !== "scanning" && (
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-[#b43f33] px-3 py-2 text-xs font-medium text-white">
          <ShieldAlert className="h-3.5 w-3.5" />
          {step >= agentSteps.length ? "All critical findings resolved." : "1 critical bookability problem is open."}
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-display text-lg font-extrabold text-[#16423c]">Bookability Guardian</p>
          <p className="text-xs text-[#61594f]">6 channel calendars · next 180 days · fictional portfolio</p>
        </div>
        <button
          type="button"
          onClick={startScan}
          disabled={phase === "scanning"}
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#16423c] px-4 text-xs font-semibold text-white disabled:opacity-60"
        >
          {phase === "scanning" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
          {phase === "idle" ? "Run scan" : "Scan again"}
        </button>
      </div>

      {(phase === "idle" || phase === "scanning") && (
        <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
          {calendars.map((c, i) => (
            <li key={c} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-xs">
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
        <ul className="mt-4 space-y-2">
          {findings.map((f, i) => {
            const resolved = f.fixable && step >= agentSteps.length;
            return (
              <motion.li
                key={f.rule}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : i * 0.08 }}
                className={cn("rounded-lg bg-white p-3", resolved && "opacity-60")}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn("rounded px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[10px] uppercase", sev[f.severity])}>
                    {f.severity}
                  </span>
                  <code className="font-[family-name:var(--font-mono)] text-[11px] text-[#16423c]">{f.rule}</code>
                  <span className="text-[11px] text-[#61594f]">{f.calendar}</span>
                  {resolved && <span className="ml-auto text-[11px] font-semibold text-[#16423c]">Resolved</span>}
                </div>
                <p className="mt-1.5 text-xs">{f.detail}</p>
                {f.fixable && phase === "found" && (
                  <button
                    type="button"
                    onClick={() => setPhase("agent")}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#16423c]/30 px-3 py-1 text-[11px] font-semibold text-[#16423c] hover:bg-[#16423c]/5"
                  >
                    <Bot className="h-3 w-3" /> Let an agent fix it
                  </button>
                )}
              </motion.li>
            );
          })}
        </ul>
      )}

      {phase === "agent" && (
        <div className="mt-3 rounded-lg bg-[#16423c] p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed text-[#e9f1ee]">
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
    </div>
  );
}
