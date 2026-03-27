# B&Br Technology — Website Redesign Design Spec

## Overview

Complete rebuild of B&Br Technology's business website from WordPress/Elementor to a modern Next.js application. The goal is a premium, high-end tech aesthetic that makes visitors say "wow" — clean like Apple/Stripe, technically impressive, and rich with the existing business content that already differentiates B&Br.

**Business:** B&Br Technology — full-stack digital studio in Boston, MA
**Founder:** Sean Cheick Baradji
**Target audience:** Founders, solopreneurs, local businesses, startups
**Primary CTA:** Book a discovery call (Cal.com)
**Secondary CTA:** Contact form

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 14+ (App Router) | SSR for SEO, React ecosystem, Vercel deploy |
| Language | TypeScript | Type safety, better DX |
| Styling | Tailwind CSS 4 | Utility-first, works natively with shadcn. Note: test shadcn components early — some docs still reference v3 conventions |
| Components | shadcn/ui | Headless primitives we customize with our palette |
| Animation | Framer Motion | Orchestrated page loads, scroll reveals, micro-interactions |
| Special FX | Magic UI (AnimatedBeam) | Data flow visualization |
| Icons | Lucide React | Clean, consistent icon set |
| Fonts | Cabinet Grotesk (display) + Satoshi (body) | Distinctive, not generic |
| Scheduling | Cal.com (free tier) | Lazy-loaded embed on Contact page only; nav CTA links to Cal.com page directly |
| Forms | Formspree (existing account: mzdaenay) | Contact form — same provider as current site |
| Deployment | Vercel | Free tier, automatic deploys from git |

---

## Design System

### Color Palette

**Light Mode:**

| Token | Value | Usage |
|-------|-------|-------|
| `--navy-950` | `#0a0f1a` | Dark sections background (NOT pure black) |
| `--navy-900` | `#0f172a` | Primary text, nav, headings |
| `--navy-800` | `#1e293b` | Secondary dark backgrounds |
| `--navy-600` | `#475569` | Muted text |
| `--navy-400` | `#94a3b8` | Placeholder, disabled |
| `--amber-600` | `#d97706` | Primary actions (CTAs, buttons) |
| `--gold-400` | `#fbbf24` | Accents, highlights, hover states |
| `--bg` | `#ffffff` | Page background |
| `--bg-alt` | `#fafafa` | Alternating section background |
| `--border` | `#e2e5ee` | Borders, dividers |
| `--success` | `#22c55e` | "Now booking" badge, trust checkmarks |

**Dark Mode:**

| Token | Value | Usage |
|-------|-------|-------|
| `--navy-950` | `#0a0f1a` | Page background |
| `--navy-900` | `#111827` | Card backgrounds |
| `--text` | `#f8fafc` | Primary text |
| `--text-mid` | `#94a3b8` | Secondary text |
| `--amber-600` | `#d97706` | Primary actions (same) |
| `--gold-400` | `#fbbf24` | Accents (same) |
| `--border` | `rgba(255,255,255,0.08)` | Borders |

**Rules:**
- Amber (#d97706) is for PRIMARY actions only — CTA buttons, active states
- Gold (#fbbf24) is for ACCENTS — highlights, hover effects, decorative elements
- Never mix amber and gold in the same element
- Dark sections use #0a0f1a, never pure #000000
- Gradient text: `bg-gradient-to-br from-navy-900 from-30% to-navy-900/40` (light) / `from-white to-white/40` (dark) — used ONLY on hero and final CTA headings

### Typography

| Role | Font | Weight | Size | Tracking |
|------|------|--------|------|----------|
| Display | Cabinet Grotesk | 800 | clamp(40px, 6.5vw, 76px) | -0.04em |
| Heading | Cabinet Grotesk | 700 | clamp(26px, 3.5vw, 38px) | -0.03em |
| Subheading | Satoshi | 600 | 18-20px | -0.02em |
| Body | Satoshi | 400 | 16px | -0.01em |
| Label | Satoshi | 600 | 12-13px, uppercase | 0.08em |
| Metrics/Numbers | Cabinet Grotesk or monospace variant | 800 | varies | tabular-nums |

**Source:** Cabinet Grotesk from Fontshare (free). Satoshi from Fontshare (free).

### Motion Strategy

**Page load orchestration (hero only):**
1. Grid background fades in — 0-200ms
2. "Now Booking" badge slides down — 200-400ms
3. Headline reveals — 300-500ms
4. Subtitle fades up — 400-600ms
5. CTA buttons pop up — 500-700ms
6. Trust pills stagger in — 600-900ms

**Scroll reveals (all sections):**
- Staggered children, not whole sections
- Each child enters 80-100ms after the previous
- `y: 20px → 0`, `opacity: 0 → 1`, ease: `[0.16, 1, 0.3, 1]`
- Trigger: `whileInView`, `once: true`, `margin: "-100px"`

**Interactive elements:**
- Service cards: smooth height animation on expand (300ms ease-out)
- Orbital timeline: auto-rotates at 0.3°/50ms, stops on click, centers clicked node
- Testimonials: infinite vertical scroll at different speeds per column
- Tech stack: horizontal infinite marquee
- Shine effect on primary CTA buttons: diagonal light sweep on hover
- Comparison table: checkmarks animate in on scroll, B&Br column gets subtle amber glow

**DON'T:** Bounce effects, aggressive parallax, simultaneous section reveals, anything that feels like a template.

### Shine Button Component

Primary CTA buttons get a diagonal light sweep animation:
- On hover: a diagonal gradient band (rgba(255,255,255,0.3)) sweeps left-to-right across the button over 600ms
- Button background: navy-900 with gold-400 text
- Border: 1px solid rgba(251,191,36,0.3) for subtle amber border glow

---

## Site Structure

### Pages

1. **Homepage** (`/`) — 10 sections
2. **Services** (`/services`) — Hero + 5 service deep-dives + On-Demand + CTA
3. **About** (`/about`) — Hero + Story + Founder + Principles + Portfolio + Tools + CTA
4. **Contact** (`/contact`) — Hero + Info sidebar + Form + Cal.com embed

### Global Components

**Header (sticky):**
- Logo: "B&Br" with amber dot accent ("B&Br.")
- Nav links: Services, About, Contact
- Dark/light mode toggle (sun/moon icon toggle)
- Primary CTA button: "Book a Call" with shine effect
- Mobile: hamburger menu with smooth slide-in panel
- Scroll effect: subtle backdrop blur + border-bottom appears on scroll

**Footer:**
- Logo + tagline ("AI-Powered Tech Studio · Boston, MA")
- Page links column
- Connect column (LinkedIn, Twitter/X, GitHub)
- Direct contact: email + phone
- Bottom bar: copyright, Privacy, Terms
- "Built with Next.js" subtle badge — reinforces technical credibility to dev-savvy visitors

---

## Homepage — 10 Sections

### Section 1: Hero

**Height:** min-h-[90vh] on desktop — let it breathe.

**Background:** Subtle grid pattern (from 21st.dev hero) with radial gradient mask fading to white. Grid lines at very low opacity (0.06-0.08).

**Content:**
- **"Now Booking" badge** — green pulse dot + "Now booking new projects" in pill shape
- **Headline:** "AI-Powered Tech. Built for Real Growth." — gradient text effect on second line
- **Subtitle:** "We build strong digital foundations — websites, apps, and automation systems — that help founders and growing businesses operate efficiently in the digital-first economy."
- **Dual CTAs:** "Book a Discovery Call" (primary/shine) + "View Services" (outline/secondary)
- **Audience pills** (horizontal, below CTAs): "For Founders · Solopreneurs · Local Biz · Startups" — small, muted, establishes who this is for without a full section
- **Trust signals** (below divider): Founder-Led ✓ | System-First ✓ | AI-Native ✓ | Scalable ✓

### Section 2: Metrics + Tech Stack

**Compact data-dense bar — contrast with the spacious hero above.**

**Metrics row (3 columns):**
- "7–21 Days" / Typical Launch Window / "From concept to live site"
- "Up to 40%" / SEO Traffic Growth / "Within first 120 days"
- "20+ Hrs/Mo" / Time Savings / "Through workflow automation"

Numbers use Cabinet Grotesk 800 weight with tabular-nums for that data-driven feel.

**Tech stack logo strip** underneath: horizontal infinite marquee of logos — React, Next.js, Flutter, Shopify, Zapier, Make, GA4, Tableau, Python, OpenAI. Subtle, muted (grayscale), colorize on hover.

### Section 3: Services Grid

**Heading:** "What We Build" (label) + "Systems Built to Scale" (heading)

**Layout:** 2x2 grid + 1 full-width card (IT Support)

**Each card contains:**
- Icon (Lucide, in navy square with gold icon)
- Service name (bold)
- One-line description
- "What We Deliver" bullet list (hidden by default)
- "Who This Is For" paragraph (hidden by default)
- "+ Expand" trigger with Framer Motion height animation

**Content per card (from existing site):**

1. **Web & Mobile Development** — "Core Service"
   - Custom React/Next.js sites, Shopify/WooCommerce, iOS/Android apps, Landing pages, UX/UI
   - For: founders launching first site, businesses needing redesign, creators, startups

2. **AI & Automation** — "Key Differentiator"
   - AI chatbots, Custom GPT assistants, Zapier/Make workflows, CRM automation, Smart forms, Internal tools
   - For: solopreneurs drowning in admin, service businesses, growing teams

3. **SEO & Growth Marketing** — "Long-Term Value"
   - Technical SEO audits, On-page optimization, Local SEO, Content strategy, CRO
   - For: local businesses, eCommerce, consultants, anyone not generating leads

4. **Data & Analytics** — "Insight Engine"
   - GA4 setup, Looker/Tableau/Power BI dashboards, Sales reporting, Funnel analysis, Data storytelling
   - For: startups needing investor metrics, eCommerce, marketing teams, founders flying blind

5. **IT Support & Maintenance** — "Trust & Retention"
   - Website maintenance, System monitoring, Security patches, Office IT, Troubleshooting
   - For: businesses depending on uptime, teams without IT, companies burned by devs who disappeared

### Section 4: AnimatedBeam — "Everything Flows Into One System"

**Storytelling version (per frontend-design feedback):**

Left side (pain points flowing IN):
- "Manual Tasks" icon
- "Lost Leads" icon
- "Bad Analytics" icon

Center: B&Br logo node (gravitational center, pulsing glow)

Right side (solutions flowing OUT):
- "Automation" icon
- "Growth" icon
- "Insights" icon

Animated beams flow from left → center and center → right. The visual tells the story: "Your problems flow into B&Br, solutions flow out."

**Heading:** "Integrations" (label) + "Everything Flows Into One System" + "Your tools, data, and clients — connected"

### Section 5: Why B&Br (Dark Section)

**Background:** #0a0f1a with very subtle grid pattern at low opacity.

**Top half — 4 Differentiators:**
Cards in 2x2 grid on dark background:
1. **Founder-Led** — "You talk directly to the person building your product. No layers, no hand-offs."
2. **AI-Native** — "AI is baked into every solution — not bolted on as an afterthought."
3. **System-First** — "We build scalable systems, not fragile one-offs that break when you grow."
4. **No BS** — "Honest timelines. Transparent pricing. Real results you can measure."

**Bottom half — Comparison Table:**
Wider than content container (breaks the grid — signals importance).

| Feature | B&Br Technology | Traditional Agency | Freelancer |
|---------|----------------|-------------------|------------|
| Web & Mobile | Unified Strategy | Expensive | Limited Scope |
| AI & Automation | Native Core | Expensive Add-on | Rare Skill |
| Support Model | Built-in Partner | Hourly Contracts | Inconsistent |
| Communication | Founder-Led | Account Managers | Direct |
| Flexibility | High | Low | Medium |

B&Br column gets subtle amber glow/highlight. Checkmarks animate in on scroll.

### Section 6: How We Work — Orbital Timeline

**Background:** #0a0f1a (continues dark theme from Section 5)

**Component:** Adapted radial orbital timeline from 21st.dev

**4 nodes orbiting a central pulsing core:**
1. **Audit & Strategy** — "Clarity before code. We analyze your setup and define clear goals."
2. **Blueprint & Architecture** — "We design your system logic and visual identity before building."
3. **Build & Deploy** — "Performance-first execution using modern, scalable tech stacks."
4. **Optimize & Scale** — "Continuous improvements, data insights, and automation expansion."

Auto-rotates when in view. Click a node to stop rotation, expand details, and highlight connected nodes.

### Section 7: Testimonials — Scrolling Columns

**Background:** White (#fff)

**Component:** TestimonialsColumn from 21st.dev — 3 columns scrolling at different speeds (15s, 19s, 17s), with top/bottom gradient mask.

**Heading:** "Testimonials" badge + "What Our Clients Say"

**Content:** Client testimonials with photos, names, roles. (Placeholder testimonials for now — Sean will replace with real ones.)

**Responsive:** 1 column on mobile, 2 on tablet, 3 on desktop.

### Section 8: FAQ — Tabbed Accordion

**Background:** #fafafa

**Component:** Tabbed FAQ from 21st.dev

**4 tabs:** General, Services, Pricing, Process

**General tab includes:**
- How long does a typical project take?
- Do you work with clients outside Boston?
- What makes B&Br different from other agencies?
- Do I need to know about technology to work with you?

**Services tab:** Questions about each service category

**Pricing tab (merges Engagement Models):**
- How does pricing work?
- What's a "Launch & Build" engagement?
- Do you offer monthly retainers?
- What's included in a retainer?

**Process tab:**
- What's the discovery call like?
- How involved do I need to be?
- What if I'm not happy with the direction?
- How do you handle revisions?

### Section 9: Final CTA

**Background:** Gradient from #0a0f1a to #1e293b with subtle grid overlay.

**Content:**
- Headline: "Ready to Build Something Real?" — gradient text
- Subtitle: "Free 30-minute discovery call. No pressure, no fluff."
- Primary CTA: "Book Your Discovery Call" with shine effect
- Secondary: "or email hello@bbrtechnology.com"
- Trust signal: "No sales scripts — just a conversation about your goals."

### Section 10: Footer

Standard footer as described in Global Components section.

---

## Services Page (`/services`)

### Hero
- Label: "What We Do"
- Headline: "Digital Systems That Actually Move the Needle"
- Subtitle: "We don't just build websites. We design complete digital systems..."
- Quick-nav pills: Web & Mobile | AI & Automation | SEO & Growth | Data & Insights | IT Support

### 5 Service Deep-Dive Sections
Each service gets a full two-column layout (alternating sides):
- **Left:** Content — label, heading, description, "What We Deliver" list, "Who This Is For"
- **Right:** Visual cards (metric cards or feature cards with accent borders)

All content preserved verbatim from existing site.

### On-Demand Services
2-card grid: Cloud Infrastructure + Cybersecurity with partner-led framing.

### Bottom CTA
"Not Sure Which Service You Need?" with "Start a Conversation" + "View Pricing Models" buttons.

---

## About Page (`/about`)

### Hero
- "Built by Builders. Not by Hype."
- "Boston-based digital studio that ships real systems for real businesses."

### The Story
Full origin story preserved — Sean's background, why B&Br was founded, collaboration ethos, intern program, community investment.

### Founder Section
Two-column: Founder card (avatar initials, name, role, location, specialties) + full bio including PharmaGuide AI showcase.

### Operating Principles
6-card grid: Accuracy Over Hype, Performance First, Continuous Learning, Authenticity, Human-Centered, Ship Then Iterate. All descriptions preserved.

### Systems We've Built (Portfolio)
6 project cards in 2-column grid with accent-colored left borders:
1. PharmaGuide AI (Health Tech)
2. Clinical EHR Integration (Healthcare)
3. eCommerce Platforms (eCommerce)
4. AI Chatbots & Lead Pipelines (AI)
5. Pharmaceutical Data Pipelines (Data Engineering)
6. Business Websites & Landing Pages (Web Dev)

Each with description and tech stack tags.

### Tools We Trust
3-column grid: Frontend / Backend & Data / AI & Tools — all items preserved.

### Bottom CTA
"Ready to Work With a Team That Delivers?"

---

## Contact Page (`/contact`)

### Hero
- "Let's Build Something That Actually Works"
- Honest, no-fluff positioning

### Two-Column Layout

**Left sidebar:**
- "What Happens Next" — 3-step process (We Read, We Respond in 24hrs, Free Discovery Call)
- "Reach Us Directly" — email, phone, location
- Trust signals: No contracts, Free discovery call, Honest about fit, Data stays private
- Cal.com embed for instant booking

**Right: Contact Form**
- Decorative gradient line at top
- Fields: First Name*, Last Name, Email*, Phone, Service dropdown*, Budget Range dropdown, How did you find us?, Project description textarea*
- Honeypot anti-spam field
- Submit: "Send Project Inquiry" with arrow animation
- Privacy notice

---

## Component Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts, theme provider
│   ├── page.tsx            # Homepage
│   ├── services/page.tsx
│   ├── about/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── ui/                 # shadcn/ui primitives (button, badge, card, etc.)
│   ├── layout/
│   │   ├── header.tsx      # Sticky nav with theme toggle
│   │   └── footer.tsx
│   ├── sections/           # Page-level sections
│   │   ├── hero.tsx
│   │   ├── metrics-bar.tsx
│   │   ├── services-grid.tsx
│   │   ├── animated-beam-section.tsx
│   │   ├── why-bbr.tsx
│   │   ├── comparison-table.tsx
│   │   ├── orbital-process.tsx
│   │   ├── testimonials.tsx
│   │   ├── faq-section.tsx
│   │   └── cta-banner.tsx
│   ├── effects/
│   │   ├── shine-button.tsx
│   │   ├── animated-beam.tsx
│   │   ├── scroll-reveal.tsx
│   │   └── tech-marquee.tsx
│   └── forms/
│       └── contact-form.tsx
├── lib/
│   ├── utils.ts            # cn() helper
│   └── fonts.ts            # Cabinet Grotesk + Satoshi setup
├── data/
│   ├── services.ts         # Service content data
│   ├── testimonials.ts     # Testimonial data
│   ├── faq.ts              # FAQ data by category
│   ├── portfolio.ts        # Project portfolio data
│   └── tools.ts            # Tech stack data
└── styles/
    └── globals.css         # Tailwind imports, CSS variables, keyframes
```

---

## Data / Content Strategy

All rich content from the existing site is preserved in typed data files (`data/*.ts`). Page components import data and render it — clean separation of content from presentation. This makes it easy for Sean to update copy without touching component code.

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| `sm` (640px) | Stack hero CTAs, single-column services |
| `md` (768px) | 2-column grids → 1 column, testimonials 1→2 columns |
| `lg` (1024px) | Full layouts, 3-column testimonials, orbital full-size |
| `xl` (1280px) | Max-width containers, generous spacing |

---

## Dark Mode

Toggle in header persists to localStorage. Uses `next-themes` with `class` strategy on `<html>`. All color tokens switch via Tailwind `dark:` prefix. The dark mode should feel native — not an afterthought. Dark sections (Why B&Br, How We Work) look the same in both modes since they're already dark.

---

## SEO

- Next.js Metadata API for all pages (title, description, Open Graph, Twitter cards)
- Semantic HTML (proper heading hierarchy, landmarks)
- Schema.org structured data: Organization, LocalBusiness, Service
- Sitemap generation via next-sitemap
- robots.txt
- Fast Core Web Vitals (SSR + optimized images + font preload)

---

## Dependencies

```json
{
  "next": "^14",
  "react": "^18",
  "typescript": "^5",
  "tailwindcss": "^4",
  "@radix-ui/react-slot": "latest",
  "class-variance-authority": "latest",
  "clsx": "latest",
  "tailwind-merge": "latest",
  "framer-motion": "latest",
  "lucide-react": "latest",
  "next-themes": "latest",
  "@calcom/embed-react": "latest",
  "tw-animate-css": "latest"
}
```

---

## Out of Scope

- Blog/CMS (can be added later)
- Client portal/dashboard
- Payment processing
- User authentication
- Analytics backend (using GA4 externally)
- Real testimonials (placeholder for now — Sean adds real ones)
