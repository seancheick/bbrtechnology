import posthog from "posthog-js";

// Cookieless analytics: memory persistence means no cookies or localStorage. Autocapture,
// session replay and error tracking are on (set up through PostHog Self-driving); replays
// mask every input and textarea, so form fields and demo messages are never recorded.
// Custom conversion events live in src/lib/analytics.ts.
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (key) {
  try {
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      persistence: "memory",
      capture_pageview: "history_change",
      capture_exceptions: true,
      session_recording: { maskAllInputs: true, maskTextSelector: "[data-ph-mask]" },
      person_profiles: "never",
    });
  } catch {
    // Analytics must never break the page.
  }
}
