# BBR Technology market research (October 2026)

Compiled 2026-10-21 for the site redesign and the 30-day launch plan. Every figure that comes from a source has its URL next to it. Anything under **Inferred** is judgement, not a finding. Some primary pages (Gartner, eMarketer, TrustRadius, the full Upwork report) blocked automated reading. Their figures came from press releases or secondary coverage, and that is noted where it applies. Fiverr's gig pages showed a bot check, so per-tier prices for individual gigs were not collected.

## 1. Demand signals

| Signal | Figure | Source |
|---|---|---|
| Upwork In-Demand Skills 2026 (released 2026-02-04) | AI integration +178% YoY, AI chatbot development +71%, applied AI skills +109%, AI video generation +329% | https://www.upwork.com/press/releases/upworks-in-demand-skills-2026-demand-for-top-ai-skills-more-than-doubles-as-ai-is-embedded-into-everyday-work |
| Fiverr Business Trends Index (2026-06-09, searches Nov 2025 to Apr 2026) | Claude Code specialists +938%, n8n AI automation +125%, vibe coding +61%, AI voice agents +49% | https://finviz.com/news/360535/businesses-race-to-hire-claude-code-specialists-as-demand-surges-938 |
| Fiverr Spring 2025 index | AI agent development +18,347%, Go High Level +1,489%, Make.com +1,083% | https://smallbiztrends.com/fiverr-ai-agent-freelancer-demand-surges/ |
| Small Business Expo survey (Feb 2026, n=693) | 71.4% use AI in some way, 36.2% regularly | https://www.thesmallbusinessexpo.com/blog/ai-adoption-in-2026/ |

The Upwork and Fiverr figures measure different things (hiring demand vs search growth), so they should not be compared directly.

## 2. Marketplace pricing

- **Upwork chatbot developers.** Median $45/hr, typical range $30 to $61/hr. Custom GPT assistant $340 to $520 per project. https://www.upwork.com/hire/chatbot-developers/cost/
- **Upwork chatbot job posts, October 2026.** "AI Support Chatbot Development" $4,750 fixed and "AI-Powered Chatbot Development" $1,000 fixed. https://www.upwork.com/freelance-jobs/apply/Support-Chatbot-Development_~022109273067046062032/
- **Upwork AI agent role.** Python, LLMs, n8n and Zapier, $60 to $90/hr. https://www.upwork.com/freelance-jobs/apply/Agent-Expert-Python-LLMs-n8n-Zapier_~022107895098261529550/
- **Upwork voice agent posts.** Very low budgets: $10 fixed, $50 fixed, $15 to $38/hr. https://www.upwork.com/jobs/~022069437445595310439
- **Fiverr "n8n ai automation" search (2026-10-21).** 32,000+ results. Most gigs start at $50 to $100, with outliers from $10 to $300. https://www.fiverr.com/search/gigs?query=n8n%20ai%20automation
- **Clutch web design pricing (updated 2026-09-21).** Most projects come in under $10k; US rates are $100 to $149/hr. https://clutch.co/web-designers/pricing
- **AI voice agent agency pricing (illustrative, 2026-01-08).**
  - Starter: $1.5 to 2.5k setup, $300 to 450/mo.
  - Booking agent: $2.5 to 4k, $450 to 650/mo.
  - Full front desk: $4 to 5k, $650 to 800/mo.
  - https://ciela.ai/blogs/how-much-to-charge-for-ai-voice-agent
- **Off-the-shelf AI receptionists.** $39 to $300/mo. https://hyperleap.ai/blog/ai-receptionist-cost

## 3. Showing prices vs "contact us"

- **TrustRadius buyer survey.** Transparent pricing was buyers' most-wanted improvement: 45% in 2025, 42% in 2026. Read via eMarketer. https://www.emarketer.com/content/b2b-tech-buyers-crave-pricing-transparency
- **Gartner (2025-06-25, 632 buyers).** 61% prefer a buying experience with no sales rep. https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-sales-survey-finds-61-percent-of-b2b-buyers-prefer-a-rep-free-buying-experience
- **A/B tests.** Both are old, single-company vendor cases.
  - SafeSoft: showing the price next to the lead form roughly doubled leads. https://vwo.com/blog/prominent-price-display-increases-leads-generated-by-100/
  - iProspect: a price range for a variable-price service gave +15% conversion. https://www.convert.com/case-studies/iprospect/
- **Studios that publish prices.**
  - Designjoy: $4,995/mo with Stripe checkout on the page.
  - Mobibean MVP: "From $5,000", fixed quote in 48h.
  - Goodspeed: n8n work, $5,000 fixed for up to 4 automations.

These findings support publishing prices. They do not prove that a new custom-development studio will convert better by doing so.

## 4. Short-term rental and property-manager tools

- **HostBuddy AI.** About 40 to 50% of guest messages fully automated in independent tests. No CRM. Works through Hostaway, Guesty, Hostfully and OwnerRez. https://strspecialist.com/reviews/hostbuddy-ai-guest-messaging-review
- **Enso Connect.** $15 to 20 per door, $150 onboarding, charges for every SMS, 5% of upsells. https://capterra.com/p/275827/Enso-Connect/
- **Hostex.** From $4.90/mo, with HostGPT messaging. https://hostex.io/blog/?p=4143 . OpenAPI access is a Pro feature (Hostex API docs).
- **Guesty and Hostaway.** Guesty about $27 to $300+ per listing; Hostaway about $20 to 40 per listing. https://strspecialist.com/compare/guesty-vs-hostaway
- **Airbnb.** AI auto-replies started rolling out in May 2026, which makes a "basic FAQ bot" for hosts much less valuable.

## 5. Platform facts that affect the build

- **Groq.** `llama-3.1-8b-instant` and `llama-3.3-70b-versatile` were shut down on 2026-08-16 for free and developer tiers. The listed replacement is `openai/gpt-oss-20b`. https://console.groq.com/docs/deprecations (checked 2026-10-21)
- **Vercel.** Hobby is "restricted to non-commercial personal use only". https://vercel.com/docs/limits/fair-use-guidelines (checked 2026-10-21). Decision: stay on Vercel for now and move to Pro before using the site commercially.
- **Gemini API free tier.** Inputs and outputs may be used to improve Google products (ai.google.dev pricing). The public demo therefore uses fictional data only and tells visitors not to enter personal information.

## Inferred (judgement, not sourced)

- Competing as "an n8n person" puts BBR in a race to the bottom. The better margin is in integration: AI features inside existing apps, workflow automation that touches real systems, and internal tools.
- Plain websites face Fiverr price pressure. Mobile MVPs pay well but compete with offshore teams.
- In short-term rentals, the gaps around the PMS are cleaner and maintenance dispatch, escalation, owner reporting and joining up data across tools. These are integration jobs, not chatbot jobs. TurnFlow already does this for a live portfolio.
- What makes a visitor trust a small studio: demos they can try, real case studies written as problem, build, result and stack, visible starting prices, a written reply-time promise, and booking built into the page.

## Resulting decisions

- Show prices as "From $X", with a typical range and timeline, plus "Reply within one business day; fixed quote within two business days of receiving project details."
- The entry offers ($250 audit, $750 sprint) bring in first clients. The higher tiers (websites from $2,500 up to mobile from $15,000) set the studio's positioning.
- The flagship website proof is a live inquiry-to-workflow demo, plus interactive previews of TurnFlow, PharmaGuide and FieldOps AI.
