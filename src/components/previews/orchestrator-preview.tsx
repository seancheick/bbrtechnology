"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";

// Illustrates the documented loop of Sean-Agentic-Orchestrator: decompose, route by cost,
// drift check every three tasks, nine-point Done Gate. The task names are an example run.

const lines = [
  ["$", "orchestrate \"add invoice reminders to the billing service\""],
  ["›", "plan: 6 atomic tasks, dependencies ordered"],
  ["›", "T1 schema migration           → tier: fast"],
  ["›", "T2 reminder scheduler         → tier: standard"],
  ["›", "T3 email template + preview   → tier: fast"],
  ["✓", "drift check after 3 tasks: on plan"],
  ["›", "T4 retry + idempotency        → tier: deep (advisor)"],
  ["›", "T5 tests for edge cases       → tier: standard"],
  ["›", "T6 docs + changelog           → tier: fast"],
  ["✓", "drift check after 6 tasks: on plan"],
  ["✓", "Done Gate 9/9: tests, types, lint, diff review, criteria met"],
];

export function OrchestratorPreview() {
  const reduce = useReducedMotion();
  const [shown, setShown] = React.useState(reduce ? lines.length : 1);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    if (!running) return;
    if (shown >= lines.length) {
      setRunning(false);
      return;
    }
    const t = setTimeout(() => setShown((n) => n + 1), 380);
    return () => clearTimeout(t);
  }, [running, shown]);

  return (
    <div className="bg-[#120d1f] p-5 font-[family-name:var(--font-mono)] text-[12px] leading-relaxed text-[#d9d2f0] sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-[#8f80c4]">claude code · orchestrator</span>
        <button
          type="button"
          onClick={() => {
            setShown(reduce ? lines.length : 1);
            setRunning(!reduce);
          }}
          className="inline-flex items-center gap-1 rounded-full bg-[#6d28d9] px-3 py-1 font-sans text-[11px] font-semibold text-white"
        >
          <Play className="h-3 w-3" /> Run
        </button>
      </div>
      <div className="min-h-[250px]">
        {lines.slice(0, shown).map(([mark, text], i) => (
          <div key={i} className="flex gap-2 whitespace-pre-wrap">
            <span className={mark === "✓" ? "text-[#7ee2b8]" : mark === "$" ? "text-[#c4b5fd]" : "text-[#8f80c4]"}>{mark}</span>
            <span className={mark === "✓" ? "text-[#7ee2b8]" : undefined}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
