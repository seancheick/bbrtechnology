import posthog from "posthog-js";

// Cookieless analytics: memory persistence means no cookies or localStorage, so no
// consent banner is needed. Events carry only the names and coarse props in
// src/lib/analytics.ts, never form fields or demo message text.
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (key) {
  try {
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      persistence: "memory",
      autocapture: false,
      capture_pageview: "history_change",
      disable_session_recording: true,
      person_profiles: "never",
    });
  } catch {
    // Analytics must never break the page.
  }
}
