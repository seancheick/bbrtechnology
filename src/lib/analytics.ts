import posthog from "posthog-js";

export type AnalyticsEvent =
  | "cta_clicked"
  | "service_viewed"
  | "demo_run"
  | "demo_completed"
  | "estimator_used"
  | "estimate_sent"
  | "inquiry_submitted"
  | "inquiry_failed"
  | "booking_completed";

type Props = Record<string, string | number | boolean | undefined>;

export function track(event: AnalyticsEvent, props?: Props) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  try {
    posthog.capture(event, props);
  } catch {
    // ignore
  }
}
