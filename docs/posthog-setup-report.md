# PostHog Self-driving setup report

## Summary
PostHog Self-driving is configured for this web project. Session Replay, Error Tracking, and Support are enabled; native health, error, and support signal sources are active; and focused scouts and Replay Vision monitors are armed.

Findings will begin appearing in the [Self-driving inbox](https://us.posthog.com/project/681295/inbox) within about 30 minutes as new data arrives.

## AI data processing

Approved.

## GitHub

Connected before this setup run; no GitHub Issues responder was enabled because no external tools were selected.

## Products enabled

| Product | Status | Notes |
| --- | --- | --- |
| Session Replay | enabled | Browser initialization was edited to remove the override that disabled recording. |
| Error Tracking | enabled | Browser initialization has no exception-capture opt-out. |
| Support (Conversations) | enabled | An inbound email, inbox, or Slack channel still needs to be connected before tickets can arrive. |

The browser integration also now keeps PostHog’s default autocapture enabled. The required browser environment values were written to `.env.local`, and the privacy page now accurately discloses that session replays may be recorded.

## Signal sources

| Signal source | Action | Notes |
| --- | --- | --- |
| `signals_scout` / `cross_source_issue` | on by default | No row is required; custom and built-in scout findings may enter the inbox. |
| `health_checks` / `health_issue` | enabled | Source config `01a16431-4d12-700b-8ccd-cd83b9838eab`. |
| `error_tracking` / `issue_created` | enabled | Source config `01a16431-4bce-70a3-ad4d-b95034b48b27`. |
| `error_tracking` / `issue_reopened` | enabled | Source config `01a16431-4b88-7ba0-b50f-096f62e96c69`. |
| `error_tracking` / `issue_spiking` | enabled | Source config `01a16431-4bec-77b0-b80f-d39654c5adfe`. |
| `conversations` / `ticket` | enabled | Source config `01a16431-4bb2-7491-8523-64f5f2d0165c`; remains idle until a Support channel is connected. |
| Logs | skipped | Project profile was unavailable and no Logs usage was found. |
| Endpoints | skipped | Endpoint usage could not be checked with the available scope, so no responder was enabled. |
| Session replay source row | skipped intentionally | Replay Vision scanners below are the sole replay route into Self-driving. |

## Connected tools

The connected-tools selection was **None of these**. No external warehouse sources or external-tool responders were created.

## Scout troop

### Active scouts

| Scout | What it watches |
| --- | --- |
| General | Cross-product correlations and unowned surfaces. |
| Web analytics | Traffic, acquisition, landing-page health, and attribution changes. |
| Product analytics | Website journey and conversion behavior. |
| Unused features | Reachable interactions that visitors rarely use. |

The operational **Inbox validation** scout remains enabled. It runs report follow-up checks and sits outside the normal troop ceiling.

**Verified limits:** 100 scout runs per day; 0 runs used today; 100 remaining; 250 enabled-scout slots. One operational slot is occupied, leaving 249 slots; the configured non-operational troop uses 4 of them. The announcement banner says: “Scouts are in early access. Each project gets up to 100 scout runs a day. Contact team-self-driving@posthog.com if you need more.”

### Disabled built-in scouts

The remaining 24 specialists are deliberately disabled to keep the troop selective: AI observability, APM, Conversations, CSP violations, Customer analytics, Data pipelines, Data warehouse, Experiments, Feature flags, Health checks, Insight alerts, Logs, MCP tool calls, Observability gaps, PR follow-up, Replay Vision, Revenue analytics, Skills store, Surveys, Tasks, Web vitals, and Workflows have no current evidence of active use. Error Tracking is disabled because its native responder is enabled; Session Replay is disabled because the Replay Vision scanners cover that route. These can be enabled later if the corresponding product becomes actively used.

## Custom scouts

No custom scouts were created. Two product-specific proposals were presented and declined:

- **Lead conversion journeys** — would watch the estimator-to-contact and booking paths for a meaningful completion drop.
- **Interactive demo reliability** — would watch the live AI demo for completion loss or increasing fallback use.

The built-in troop covers generic traffic, journey, interaction, health, error, and replay surfaces. If a future custom scout becomes noisy, set its `emit` configuration to `false` in PostHog to switch it to dry-run.

## Replay Vision scanners

A scanner is an LLM that watches individual session recordings on a schedule and pushes visible defects to the Self-driving inbox. These are the only components in this setup that spend Replay Vision quota. Scanner findings arrive at half weight and need corroboration before being promoted into a report.

| Status | Scanner | Watches | Query scope | Sampling | Estimate |
| --- | --- | --- | --- | --- | --- |
| created | Contact and booking breakage | Visible failures while a prospective client contacts the business or books a discovery call. | Recordings that visited `/contact`, the site’s booking and inquiry completion flow. | 50% | 0 matching recordings; 0 observations/month; 0 credits/month at creation. |
| created | Lead journey frustration | Visible struggle with booking, inquiry, or moving an estimator brief into contact options. | Sessions containing `$rageclick` only. | 100% | 0 matching recordings; 0 observations/month; 0 credits/month at creation. |

No recordings were present during setup. Both scanners are armed and will begin working as soon as new recordings arrive. The organization has 2,500 Replay Vision credits remaining for the current period and was not exhausted at setup time.

## Files modified or created

| File | Change |
| --- | --- |
| `.env.local` | Created with the browser PostHog environment values required by the existing integration. |
| `src/instrumentation-client.ts` | Removed the autocapture and session-recording opt-outs. |
| `src/app/privacy/page.tsx` | Updated the analytics disclosure for session replay. |
| `posthog-self-driving-report.md` | Created this setup handoff. |

## Follow-ups

- [ ] Connect an inbound Support channel (email, inbox, or Slack) in PostHog so Support tickets can populate the enabled responder.
- [ ] Let the site receive traffic after deployment so browser events and Session Replay recordings begin arriving; the initial profile could not yet be built and Replay Vision estimates were zero.
- [ ] Optionally enable a Logs or Endpoints responder after confirming those PostHog products are in use.
- [ ] Review and rate early Replay Vision observations in their scanner pages to improve the two prompts.

## What happens next

Fresh scout configurations are picked up within about 30 minutes and draw from the verified daily run budget. Findings cluster into reports in the Self-driving inbox; immediately actionable reports can start coding tasks.
