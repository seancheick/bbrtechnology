"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Camera, CheckCircle2, CloudOff, MapPin, Timer, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import { PhoneFrame } from "@/components/ui/device-frame";

// Rebuild of FieldOps AI's worker flow (from the FieldOpsAi README): GPS-verified clock-in,
// server-stamped proof photo, offline queue, supervisor timeline. Names and places are fictional.

type Event = { id: number; kind: string; label: string; time: string; synced: boolean };

const actions = [
  { kind: "clock_in", label: "Clocked in · Job 2417, Riverside Substation", icon: Timer },
  { kind: "photo", label: "Proof photo · panel B2 before", icon: Camera },
  { kind: "task", label: "Task done · conduit run, east wall", icon: CheckCircle2 },
];

function clock(offset: number) {
  const d = new Date(2026, 9, 14, 7, 2 + offset * 17);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function FieldOpsPreview() {
  const reduce = useReducedMotion();
  const [events, setEvents] = React.useState<Event[]>([]);
  const [offline, setOffline] = React.useState(false);
  const next = actions[events.length];

  function act() {
    if (!next) return;
    setEvents((e) => [...e, { id: e.length, kind: next.kind, label: next.label, time: clock(e.length), synced: !offline }]);
  }

  function toggleNetwork() {
    if (offline) setEvents((e) => e.map((ev) => ({ ...ev, synced: true })));
    setOffline(!offline);
  }

  const lastPhoto = events.find((e) => e.kind === "photo");
  const NextIcon = next?.icon ?? CheckCircle2;

  return (
    <div className="grid items-center gap-6 bg-gradient-to-br from-[#e8f3f1] to-[#f7faf9] p-5 sm:grid-cols-[auto_1fr] sm:p-6">
      <PhoneFrame className="w-[230px]">
        <div className="flex h-[430px] flex-col bg-[#0f2f2c] px-4 pb-5 pt-10 text-white">
          <div className="flex items-center justify-between text-[10px] text-white/60">
            <span>Crew · D. Alvarez</span>
            <button type="button" onClick={toggleNetwork} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5">
              {offline ? <CloudOff className="h-3 w-3" /> : <Wifi className="h-3 w-3" />}
              {offline ? "Offline" : "Online"}
            </button>
          </div>
          <p className="mt-4 text-[11px] text-white/60">Job 2417</p>
          <p className="font-display text-lg font-extrabold leading-tight">Riverside Substation</p>
          <p className="mt-1 flex items-center gap-1 text-[10px] text-[#7fd1c1]">
            <MapPin className="h-3 w-3" /> GPS locked · ±5 m
          </p>

          <div className="relative mt-4 flex-1 overflow-hidden rounded-xl bg-[#174a45]">
            {lastPhoto ? (
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#2f6b63,#183f3b)]">
                <div className="absolute inset-x-2 bottom-2 rounded-md bg-black/55 p-2 font-[family-name:var(--font-mono)] text-[8.5px] leading-snug">
                  D. ALVAREZ · JOB 2417
                  <br />
                  42.3601 N, 71.0589 W · {lastPhoto.time}
                  <br />
                  SHA-256 9f3c…a71e
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-center text-[10px] text-white/70">
                Stamped proof photos appear here
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={act}
            disabled={!next}
            className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#7fd1c1] text-sm font-bold text-[#0f2f2c] disabled:opacity-50"
          >
            <NextIcon className="h-4 w-4" />
            {next ? (next.kind === "clock_in" ? "Clock in" : next.kind === "photo" ? "Take proof photo" : "Mark task done") : "Shift logged"}
          </button>
        </div>
      </PhoneFrame>

      <div className="min-w-0">
        <p className="eyebrow text-[#0f766e]">Supervisor timeline · live</p>
        <ol className="mt-3 space-y-2">
          {events.length === 0 && (
            <li className="rounded-xl border border-dashed border-[#0f766e]/30 p-4 text-sm text-[#335e59]">
              Tap the phone to clock in. Try going offline first: events queue on the device and sync when the
              signal comes back.
            </li>
          )}
          {events.map((e) => (
            <motion.li
              key={e.id}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 rounded-xl bg-white p-3 text-sm text-[#0f2f2c] shadow-sm"
            >
              <span className="tabular w-16 shrink-0 text-xs text-[#335e59]">{e.time}</span>
              <span className="min-w-0 flex-1">{e.label}</span>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                  e.synced ? "bg-[#0f766e]/10 text-[#0f766e]" : "bg-amber-500/15 text-amber-700"
                )}
              >
                {e.synced ? "synced" : "queued"}
              </span>
            </motion.li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-[#335e59]">
          Events are appended, never edited. Each one carries server time, GPS and the worker who did it.
        </p>
      </div>
    </div>
  );
}
