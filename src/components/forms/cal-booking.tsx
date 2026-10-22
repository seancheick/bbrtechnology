"use client";

import * as React from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useTheme } from "next-themes";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";

const NAMESPACE = "discovery";

// Inline Cal.com booking. Prefill uses Cal's documented `config` keys: `notes` is the
// booking form's default notes field, and `metadata[...]` is stored on the booking.
export function CalBooking({ notes, estimate }: { notes?: string; estimate?: string }) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      if (cancelled) return;
      cal("ui", { theme, hideEventTypeDetails: false, layout: "month_view", cssVarsPerTheme: { light: { "cal-brand": "#0f172a" }, dark: { "cal-brand": "#fbbf24" } } });
      cal("on", { action: "bookingSuccessful", callback: () => track("booking_completed", { estimate: Boolean(estimate) }) });
    })();
    return () => {
      cancelled = true;
    };
  }, [theme, estimate]);

  const config: Record<string, string> = { layout: "month_view", theme };
  if (notes) config.notes = notes;
  if (estimate) config["metadata[estimate]"] = estimate;

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-bg-elevated">
      <Cal
        namespace={NAMESPACE}
        calLink={site.calBooking}
        style={{ width: "100%", height: "100%", minHeight: 640, overflow: "auto" }}
        config={config}
      />
      <p className="border-t border-border px-5 py-3 text-xs text-foreground-subtle">
        Calendar not loading?{" "}
        <a href={`${site.calUrl}/30min`} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground underline underline-offset-4">
          Book on Cal.com
        </a>
      </p>
    </div>
  );
}
