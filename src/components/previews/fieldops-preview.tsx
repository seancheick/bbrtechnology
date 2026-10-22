"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BriefcaseBusiness, Camera, CheckCircle2, CloudOff, ListChecks, MapPin, Timer, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import { fieldOpsFonts } from "@/components/previews/fonts";

// Rebuild of FieldOps AI's worker flow (from the FieldOpsAi README): GPS-verified clock-in,
// server-stamped proof photo, offline queue, supervisor timeline. Names and places are fictional.
// The phone uses the mobile app's theme (lib/app/theme/app_theme.dart: slate, signal orange,
// Space Grotesk + IBM Plex Sans, the job card and sync pill); the timeline uses the supervisor
// web app's warm neutrals with Manrope headings.

const f = {
  slate: "#0F172A",
  canvas: "#FAFAFA",
  steel: "#64748B",
  signal: "#F38B2A",
  success: "#16A34A",
  border: "#E2E8F0",
  muted: "#F1F5F9",
  web: "#FCFBF8",
  webFg: "#2A2722",
  webMuted: "#76726B",
  webBorder: "#E9E6E0",
};

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
  const queued = events.filter((e) => !e.synced).length;

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
    <div
      className={cn(fieldOpsFonts, "grid items-center gap-6 p-5 font-[family-name:var(--font-fo-sans)] sm:grid-cols-[auto_1fr] sm:p-6")}
      style={{ background: `linear-gradient(135deg, ${f.muted}, ${f.web})`, color: f.slate }}
    >
      {/* the crew app */}
      <div className="mx-auto w-[250px] rounded-[2.2rem] p-2 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.55)]" style={{ background: f.slate }}>
        <div className="flex h-[440px] flex-col overflow-hidden rounded-[1.75rem] px-3.5 pb-4 pt-3" style={{ background: f.canvas }}>
          <div className="flex items-center justify-between text-[10px] font-medium" style={{ color: f.steel }}>
            <span>9:41</span>
            <span className="h-4 w-14 rounded-full" style={{ background: f.slate }} aria-hidden />
            <button
              type="button"
              onClick={toggleNetwork}
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold"
              style={offline ? { background: "rgba(243,139,42,0.14)", color: "#B45309" } : { background: "rgba(22,163,74,0.12)", color: f.success }}
            >
              {offline ? <CloudOff className="h-3 w-3" /> : <Wifi className="h-3 w-3" />}
              {offline ? (queued ? `Offline · ${queued}` : "Offline") : "Synced"}
            </button>
          </div>
          <p className="mt-3 font-[family-name:var(--font-fo-display)] text-[17px] font-bold">Good morning, Diego</p>

          <div className="mt-3 rounded-2xl border bg-white p-3.5" style={{ borderColor: f.border }}>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-[14px]" style={{ background: "rgba(243,139,42,0.12)", color: f.signal }}>
                <BriefcaseBusiness className="h-4 w-4" />
              </span>
              <p className="font-[family-name:var(--font-fo-display)] text-[14px] font-bold leading-tight">Riverside Substation</p>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5 text-[10px] font-medium" style={{ color: f.steel }}>
              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5" style={{ background: f.muted }}>
                <ListChecks className="h-3 w-3" /> 3 tasks ready
              </span>
              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5" style={{ background: f.muted }}>
                <MapPin className="h-3 w-3" /> 75m geofence
              </span>
            </div>
          </div>

          <div className="relative mt-3 flex-1 overflow-hidden rounded-2xl" style={{ background: f.muted }}>
            {lastPhoto ? (
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#475569,#1e293b)]">
                <div className="absolute inset-x-2 bottom-2 rounded-md bg-black/60 p-2 font-mono text-[8.5px] leading-snug text-white">
                  D. ALVAREZ · JOB 2417
                  <br />
                  42.3601 N, 71.0589 W · {lastPhoto.time}
                  <br />
                  SHA-256 9f3c…a71e
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center px-4 text-center text-[10px]" style={{ color: f.steel }}>
                Stamped proof photos appear here
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={act}
            disabled={!next}
            className="mt-3 inline-flex h-12 items-center justify-center gap-2 rounded-2xl text-sm font-semibold text-white disabled:opacity-50"
            style={{ background: f.signal }}
          >
            <NextIcon className="h-4 w-4" />
            {next ? (next.kind === "clock_in" ? "Clock in" : next.kind === "photo" ? "Proof photo" : "Mark task done") : "Shift logged"}
          </button>
        </div>
      </div>

      {/* the supervisor dashboard */}
      <div className="min-w-0 rounded-2xl border p-4" style={{ background: f.web, borderColor: f.webBorder, color: f.webFg }}>
        <div className="flex items-center justify-between">
          <p className="font-[family-name:var(--font-fo-web)] text-sm font-bold">Live timeline</p>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: f.webMuted }}>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full motion-reduce:animate-none" style={{ background: f.success }} /> Realtime
          </span>
        </div>
        <ol className="mt-3 space-y-2 font-[family-name:var(--font-pg-sans)]">
          {events.length === 0 && (
            <li className="rounded-xl border border-dashed p-4 text-sm" style={{ borderColor: f.webBorder, color: f.webMuted }}>
              Tap the phone to clock in. Try going offline first: events queue on the device and sync when the signal comes back.
            </li>
          )}
          {events.map((e) => (
            <motion.li
              key={e.id}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 rounded-xl border bg-white p-3 text-sm"
              style={{ borderColor: f.webBorder }}
            >
              <span className="w-16 shrink-0 text-xs tabular-nums" style={{ color: f.webMuted }}>
                {e.time}
              </span>
              <span className="min-w-0 flex-1">{e.label}</span>
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={e.synced ? { background: "rgba(22,163,74,0.1)", color: f.success } : { background: "rgba(243,139,42,0.14)", color: "#B45309" }}
              >
                {e.synced ? "synced" : "queued"}
              </span>
            </motion.li>
          ))}
        </ol>
        <p className="mt-3 text-xs" style={{ color: f.webMuted }}>
          Events are appended, never edited. Each one carries server time, GPS and the worker who did it.
        </p>
      </div>
    </div>
  );
}
