# B&Br Technology Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild B&Br Technology's website from WordPress to a premium Next.js application with 4 pages, 10-section homepage, dark mode, and high-end animations.

**Architecture:** Next.js 14 App Router with TypeScript. All content lives in typed data files (`src/data/`), rendered by reusable section components. Design system tokens in CSS variables, applied via Tailwind. Animation orchestrated with Framer Motion. Deployed to Vercel.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS 4, shadcn/ui, Framer Motion, Lucide React, next-themes, Magic UI (AnimatedBeam), Cal.com embed, Formspree

**Design Spec:** `docs/superpowers/specs/2026-03-26-bbr-website-redesign-design.md`

---

## Phase 1: Foundation (Tasks 1-5)

Scaffold the Next.js project, install dependencies, set up the design system, fonts, and shared utilities. After this phase: the app runs, shows a blank page with correct fonts and colors.

---

### Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `tailwind.config.ts` (if needed), `src/styles/globals.css`

- [ ] **Step 1: Create Next.js project with TypeScript and Tailwind**

```bash
cd /Users/seancheick/Downloads/bbr-website
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack
```

If the directory is not empty, move existing files (`.txt`, `.css`, `.js` content files) to a `_legacy/` folder first:

```bash
mkdir -p _legacy
mv bbr-*.txt bbr-*.css bbr-*.js _legacy/ 2>/dev/null || true
```

Then run create-next-app.

- [ ] **Step 2: Install all project dependencies**

```bash
npm install framer-motion lucide-react next-themes class-variance-authority clsx tailwind-merge @radix-ui/react-slot tw-animate-css
```

- [ ] **Step 3: Verify the app builds and runs**

```bash
npm run dev
```

Expected: Next.js dev server starts on localhost:3000, shows the default Next.js welcome page.

- [ ] **Step 4: Commit**

```bash
git init
echo "node_modules/\n.next/\n.superpowers/" > .gitignore
git add -A
git commit -m "feat: scaffold Next.js 14 project with dependencies"
```

---

### Task 2: Design System — CSS Variables and Global Styles

**Files:**
- Modify: `src/styles/globals.css` (replace default content)

- [ ] **Step 1: Replace globals.css with the B&Br design system**

Replace the entire contents of `src/styles/globals.css` with:

```css
@import "tailwindcss";
@import "tw-animate-css";

/* ============================================
   B&Br Technology Design System
   ============================================ */

@theme inline {
  /* Navy palette */
  --color-navy-950: #0a0f1a;
  --color-navy-900: #0f172a;
  --color-navy-800: #1e293b;
  --color-navy-700: #334155;
  --color-navy-600: #475569;
  --color-navy-400: #94a3b8;

  /* Amber / Gold accent */
  --color-amber-600: #d97706;
  --color-gold-400: #fbbf24;

  /* Surfaces */
  --color-bg: #ffffff;
  --color-bg-alt: #fafafa;
  --color-border: #e2e5ee;

  /* Semantic */
  --color-success: #22c55e;

  /* Fonts */
  --font-display: "Cabinet Grotesk", sans-serif;
  --font-body: "Satoshi", sans-serif;
}

/* Dark mode overrides */
.dark {
  --color-bg: #0a0f1a;
  --color-bg-alt: #111827;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-navy-900: #f8fafc;
  --color-navy-600: #94a3b8;
  --color-navy-400: #64748b;
}

/* Base layer */
@layer base {
  body {
    font-family: var(--font-body);
    background-color: var(--color-bg);
    color: var(--color-navy-900);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

/* Custom keyframes */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shine {
  from {
    transform: translateX(-100%) skewX(-20deg);
  }
  to {
    transform: translateX(200%) skewX(-20deg);
  }
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 0;
    transform: scale(2);
  }
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* Utility: gradient text (used on hero + final CTA only) */
.gradient-text {
  background: linear-gradient(to bottom right, #0f172a 30%, rgba(15, 23, 42, 0.4));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .gradient-text {
  background: linear-gradient(to bottom right, #ffffff 30%, rgba(255, 255, 255, 0.4));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

- [ ] **Step 2: Verify dev server still works**

```bash
npm run dev
```

Expected: Page loads with no CSS errors in console.

- [ ] **Step 3: Commit**

```bash
git add src/styles/globals.css
git commit -m "feat: add B&Br design system CSS variables and keyframes"
```

---

### Task 3: Font Setup

**Files:**
- Create: `src/lib/fonts.ts`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create font configuration**

Create `src/lib/fonts.ts`:

```typescript
import localFont from "next/font/local";

export const cabinetGrotesk = localFont({
  src: [
    {
      path: "../fonts/CabinetGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/CabinetGrotesk-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

export const satoshi = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Bold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});
```

- [ ] **Step 2: Download font files**

```bash
mkdir -p src/fonts
# Download Cabinet Grotesk from Fontshare
curl -L "https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&display=swap" -o /dev/null
# Since direct woff2 downloads may vary, use @fontsource as a reliable alternative:
npm install @fontsource-variable/cabinet-grotesk
```

If Fontshare direct download isn't straightforward, use Google Fonts or @fontsource fallback. Update `src/lib/fonts.ts` to use the `next/font/local` approach with the downloaded files, OR switch to a simpler approach:

```typescript
// Alternative: src/lib/fonts.ts using next/font/google for Satoshi-like fonts
// If Cabinet Grotesk isn't available via next/font, use the CSS @import approach
// by adding to globals.css:
// @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&display=swap');
// @import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap');
```

The engineer should test which approach works and use it. The key requirement is that `--font-display` resolves to Cabinet Grotesk and `--font-body` resolves to Satoshi.

- [ ] **Step 3: Update root layout with fonts and theme provider**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "B&Br Technology — AI-Powered Tech. Built for Real Growth.",
  description:
    "Boston-based digital studio building websites, apps, and AI automation systems for founders and growing businesses.",
  openGraph: {
    title: "B&Br Technology",
    description: "AI-Powered Tech. Built for Real Growth.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-navy-900 antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify fonts load**

```bash
npm run dev
```

Visit localhost:3000, open DevTools > Network > Font. Confirm Cabinet Grotesk and Satoshi are loading.

- [ ] **Step 5: Commit**

```bash
git add src/lib/fonts.ts src/app/layout.tsx
git commit -m "feat: add Cabinet Grotesk + Satoshi fonts and ThemeProvider"
```

---

### Task 4: Shared Utilities — cn() helper

**Files:**
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Create the cn() utility**

Create `src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/utils.ts
git commit -m "feat: add cn() utility for class merging"
```

---

### Task 5: shadcn/ui Base Components

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/card.tsx`

- [ ] **Step 1: Create Button component**

Create `src/components/ui/button.tsx`:

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-navy-900 text-gold-400 hover:bg-navy-800",
        outline: "border-2 border-border bg-transparent text-navy-900 hover:bg-bg-alt dark:text-white",
        ghost: "hover:bg-bg-alt",
        link: "text-amber-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

- [ ] **Step 2: Create Badge component**

Create `src/components/ui/badge.tsx`:

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-navy-900 text-white",
        outline: "border-border text-navy-600",
        accent: "border-amber-600/20 bg-amber-600/5 text-amber-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
```

- [ ] **Step 3: Create Card component**

Create `src/components/ui/card.tsx`:

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-xl border border-border bg-bg shadow-sm", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-[family-name:var(--font-display)] text-xl font-bold tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };
```

- [ ] **Step 4: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add shadcn/ui base components (button, badge, card)"
```

---

## Phase 2: Layout Shell (Tasks 6-8)

Build the header, footer, and a placeholder homepage so you can navigate. After this phase: the site has a working nav, theme toggle, and all 4 page routes.

---

### Task 6: Header Component

**Files:**
- Create: `src/components/layout/header.tsx`
- Create: `src/components/effects/shine-button.tsx`

- [ ] **Step 1: Create ShineButton effect component**

Create `src/components/effects/shine-button.tsx`:

```tsx
"use client";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

export function ShineButton({ className, children, ...props }: ButtonProps) {
  return (
    <Button
      className={cn(
        "relative overflow-hidden bg-navy-900 text-gold-400 border border-gold-400/30",
        "hover:border-gold-400/50 transition-all duration-300",
        "dark:bg-navy-800",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span
        className="absolute inset-0 z-0 opacity-0 hover:opacity-100 transition-opacity"
        aria-hidden="true"
      >
        <span className="absolute inset-0 -translate-x-full hover:animate-[shine_0.6s_ease-in-out_forwards] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]" />
      </span>
    </Button>
  );
}
```

- [ ] **Step 2: Create Header component**

Create `src/components/layout/header.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShineButton } from "@/components/effects/shine-button";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight text-navy-900"
        >
          B&Br<span className="text-amber-600">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy-600 transition-colors hover:text-navy-900"
            >
              {link.label}
            </Link>
          ))}

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 text-navy-600 transition-colors hover:bg-bg-alt hover:text-navy-900"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          {/* CTA */}
          <ShineButton asChild size="sm">
            <a href="https://cal.com" target="_blank" rel="noopener noreferrer">
              Book a Call
            </a>
          </ShineButton>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden rounded-lg p-2 text-navy-600"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-bg px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-navy-900"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center gap-2 text-sm text-navy-600"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            )}
            <ShineButton asChild className="mt-2 w-full">
              <a href="https://cal.com" target="_blank" rel="noopener noreferrer">
                Book a Call
              </a>
            </ShineButton>
          </div>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 3: Verify header renders**

Add to `src/app/layout.tsx` body:

```tsx
import { Header } from "@/components/layout/header";

// Inside body, before {children}:
<Header />
<main>{children}</main>
```

Run `npm run dev` and confirm: logo, nav links, theme toggle, and "Book a Call" button are visible.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/header.tsx src/components/effects/shine-button.tsx src/app/layout.tsx
git commit -m "feat: add sticky header with theme toggle and shine CTA button"
```

---

### Task 7: Footer Component

**Files:**
- Create: `src/components/layout/footer.tsx`

- [ ] **Step 1: Create Footer component**

Create `src/components/layout/footer.tsx`:

```tsx
import Link from "next/link";

const pageLinks = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter/X", href: "https://twitter.com" },
  { label: "GitHub", href: "https://github.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Brand */}
          <div>
            <div className="font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight">
              B&Br<span className="text-amber-600">.</span>
            </div>
            <p className="mt-2 text-sm text-navy-400">
              AI-Powered Tech Studio · Boston, MA
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-navy-400">
                Pages
              </h4>
              <ul className="space-y-2">
                {pageLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-navy-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-navy-400">
                Connect
              </h4>
              <ul className="space-y-2">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-navy-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-navy-400">
                Direct
              </h4>
              <ul className="space-y-2 text-sm text-navy-400">
                <li>
                  <a href="mailto:hello@bbrtechnology.com" className="hover:text-white transition-colors">
                    hello@bbrtechnology.com
                  </a>
                </li>
                <li>
                  <a href="tel:+16467268345" className="hover:text-white transition-colors">
                    (646) 726-8345
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-navy-600 md:flex-row">
          <span>&copy; {new Date().getFullYear()} B&Br Technology. All rights reserved.</span>
          <div className="flex gap-4">
            <span>Privacy</span>
            <span>Terms</span>
            <span className="text-navy-700">Built with Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Add Footer to layout**

In `src/app/layout.tsx`, add after `</main>`:

```tsx
import { Footer } from "@/components/layout/footer";

// After </main>:
<Footer />
```

- [ ] **Step 3: Verify and commit**

```bash
npm run dev
# Check footer renders at bottom of page
git add src/components/layout/footer.tsx src/app/layout.tsx
git commit -m "feat: add footer with links, contact info, and Built with Next.js badge"
```

---

### Task 8: Page Route Stubs

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/app/services/page.tsx`
- Create: `src/app/about/page.tsx`
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Create all 4 page stubs**

`src/app/page.tsx`:

```tsx
export default function HomePage() {
  return (
    <div className="pt-20">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-center py-40">
        B&Br Technology
      </h1>
    </div>
  );
}
```

`src/app/services/page.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — B&Br Technology",
  description: "Web development, AI automation, SEO, data analytics, and IT support for founders and growing businesses.",
};

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-center py-40">
        Services
      </h1>
    </div>
  );
}
```

`src/app/about/page.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — B&Br Technology",
  description: "Boston-based digital studio founded by Sean Cheick Baradji. Building real systems for real businesses.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-center py-40">
        About
      </h1>
    </div>
  );
}
```

`src/app/contact/page.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — B&Br Technology",
  description: "Start a conversation about your project. Free 30-minute discovery call.",
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-center py-40">
        Contact
      </h1>
    </div>
  );
}
```

- [ ] **Step 2: Verify all routes work**

```bash
npm run dev
```

Navigate to `/`, `/services`, `/about`, `/contact` — each should show its heading with the header and footer.

- [ ] **Step 3: Commit**

```bash
git add src/app/
git commit -m "feat: add page route stubs for all 4 pages"
```

---

## Phase 3: Data Layer (Task 9)

Create all typed content data files. After this phase: all business content is available for components to import.

---

### Task 9: Content Data Files

**Files:**
- Create: `src/data/services.ts`
- Create: `src/data/testimonials.ts`
- Create: `src/data/faq.ts`
- Create: `src/data/portfolio.ts`
- Create: `src/data/tools.ts`

- [ ] **Step 1: Create services data**

Create `src/data/services.ts`:

```typescript
import { Globe, Bot, TrendingUp, BarChart3, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  audience: string;
}

export const services: Service[] = [
  {
    id: "web-mobile",
    icon: Globe,
    label: "Core Service",
    title: "Web & Mobile Development",
    tagline: "The foundation of your brand. Fast, SEO-ready, and built to last.",
    description:
      "Your website is more than a brochure — it's the engine of your business. We build fast, responsive, SEO-ready sites and mobile apps that look great, load quickly, and convert visitors into customers. Every project is architected for growth, so you're never stuck rebuilding from scratch when your business scales.",
    deliverables: [
      "Custom business websites built with React, Next.js, or WordPress",
      "Shopify and WooCommerce eCommerce stores",
      "iOS and Android mobile applications",
      "Landing pages optimized for lead generation and conversions",
      "Portfolio and personal brand sites",
      "UX/UI design with performance and accessibility baked in",
    ],
    audience:
      "Founders launching their first site, established businesses needing a redesign, creators building a personal brand, and startups that need an MVP shipped fast without cutting corners.",
  },
  {
    id: "ai-automation",
    icon: Bot,
    label: "Key Differentiator",
    title: "AI & Automation Solutions",
    tagline: "Our key differentiator. We turn manual tasks into automated assets.",
    description:
      "This is what sets us apart. While other agencies treat AI as a buzzword, we implement it as practical infrastructure. We identify the repetitive tasks eating your time, then build automation systems that handle them — accurately, consistently, and at scale.",
    deliverables: [
      "AI chatbots for customer support, lead capture, and FAQ automation",
      "Custom GPT-powered internal assistants",
      "Zapier and Make workflow automation",
      "CRM automation and pipeline management",
      "Smart forms with conditional logic and AI processing",
      "Internal tools that replace manual spreadsheet work",
      "AI-powered onboarding and client intake flows",
    ],
    audience:
      "Solopreneurs drowning in admin work, service businesses with repetitive client intake, growing teams that need structure without hiring more people, and anyone spending hours on tasks a machine could do better.",
  },
  {
    id: "seo-growth",
    icon: TrendingUp,
    label: "Long-Term Value",
    title: "SEO & Growth Marketing",
    tagline: "Long-term value engines that ensure you're found by the right people.",
    description:
      "Getting found online isn't optional — it's survival. We implement technical SEO foundations, content strategies, and local search optimization that compound over time. No black-hat tricks, no empty promises — just methodical work that builds real organic traffic and turns searchers into paying customers.",
    deliverables: [
      "Technical SEO audits and fixes (speed, structure, indexing)",
      "On-page optimization for target keywords",
      "Local SEO for service-based businesses (Google Business, citations)",
      "Content strategy and ranking roadmaps",
      "Conversion rate optimization (CRO)",
      "Personal and business brand positioning",
    ],
    audience:
      "Local businesses that depend on \"near me\" searches, eCommerce stores competing for product keywords, consultants building authority in their niche, and any business with a website that isn't generating leads.",
  },
  {
    id: "data-analytics",
    icon: BarChart3,
    label: "Insight Engine",
    title: "Data Analysis & Visualization",
    tagline: "Clear, visual insights for founders. Stop guessing, start knowing.",
    description:
      "You can't improve what you don't measure. We set up proper analytics, build custom dashboards, and deliver clear reporting that helps you make smarter decisions faster. No more guessing whether your marketing is working or where your revenue is coming from.",
    deliverables: [
      "Google Analytics 4 setup with custom events and goals",
      "Looker Studio, Tableau, and Power BI dashboards",
      "Traffic, sales, and performance reporting",
      "Funnel analysis and conversion tracking",
      "Decision-focused data storytelling for teams and investors",
    ],
    audience:
      "Startups that need investor-ready metrics, eCommerce brands tracking multi-channel performance, marketing teams that want clarity on ROI, and founders who are tired of flying blind.",
  },
  {
    id: "it-support",
    icon: Wrench,
    label: "Trust & Retention",
    title: "IT Support & Maintenance",
    tagline: "We don't just build and leave. We keep your systems healthy and secure.",
    description:
      "We don't build and disappear. Your website, apps, and systems need ongoing care — security updates, performance tuning, bug fixes, and someone to call when something breaks. We act as your on-call technical team so you never have to scramble for help or worry about downtime.",
    deliverables: [
      "Website and application maintenance",
      "Proactive system monitoring and health checks",
      "Security patches and software updates",
      "Office IT setup (networks, devices, software provisioning)",
      "Troubleshooting and ongoing technical support",
      "Preventive maintenance and performance optimization",
    ],
    audience:
      "Any business that depends on its website being up and fast, teams without a dedicated IT person, growing companies that need reliable infrastructure, and anyone who's been burned by a developer who disappeared after launch.",
  },
];

export const metrics = [
  { value: "7–21 Days", label: "Typical Launch Window", sub: "From concept to live site or MVP — depending on scope." },
  { value: "Up to 40%", label: "SEO Traffic Growth", sub: "Targeted organic growth within the first 120 days." },
  { value: "20+ Hrs/Mo", label: "Time Savings Potential", sub: "Through workflow automation tailored to your operations." },
];

export const techStack = [
  "React", "Next.js", "Flutter", "Shopify", "Zapier", "Make", "Google Analytics 4", "Tableau", "Python", "OpenAI",
];

export const comparisonTable = {
  headers: ["Feature", "B&Br Technology", "Traditional Agency", "Freelancer"],
  rows: [
    ["Web & Mobile", "Unified Strategy", "Expensive", "Limited Scope"],
    ["AI & Automation", "Native Core", "Expensive Add-on", "Rare Skill"],
    ["Support Model", "Built-in Partner", "Hourly Contracts", "Inconsistent"],
    ["Communication", "Founder-Led", "Account Managers", "Direct"],
    ["Flexibility", "High", "Low", "Medium"],
  ],
};

export const differentiators = [
  { title: "Founder-Led", description: "You talk directly to the person building your product. No layers, no hand-offs." },
  { title: "AI-Native", description: "AI is baked into every solution — not bolted on as an afterthought." },
  { title: "System-First", description: "We build scalable systems, not fragile one-offs that break when you grow." },
  { title: "No BS", description: "Honest timelines. Transparent pricing. Real results you can measure." },
];

export const processSteps = [
  { id: 1, title: "Audit & Strategy", description: "Clarity before code. We analyze your setup and define clear goals." },
  { id: 2, title: "Blueprint & Architecture", description: "We design your system logic and visual identity before building." },
  { id: 3, title: "Build & Deploy", description: "Performance-first execution using modern, scalable tech stacks." },
  { id: 4, title: "Optimize & Scale", description: "Continuous improvements, data insights, and automation expansion." },
];
```

- [ ] **Step 2: Create testimonials data**

Create `src/data/testimonials.ts`:

```typescript
export interface Testimonial {
  text: string;
  name: string;
  role: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    text: "They completely transformed how we handle client onboarding. What used to take 2 hours per client now happens automatically.",
    name: "Sarah K.",
    role: "Clinic Owner",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    text: "Fast, honest, and the AI integration was a game-changer. Our customer support runs 24/7 now without extra staff.",
    name: "Mike R.",
    role: "eCommerce Founder",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    text: "Best tech investment we've made. Our site converts 3x more than the old one, and the dashboard saves us hours every week.",
    name: "Jasmine P.",
    role: "Startup CEO",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    text: "Sean understood our vision immediately and delivered beyond expectations. The automated lead pipeline changed our business.",
    name: "Tina L.",
    role: "Marketing Director",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    text: "The dashboard they built saves us 10+ hours per week. We finally know where every dollar of ad spend goes.",
    name: "David M.",
    role: "Operations Manager",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    text: "Finally, a dev who talks business, not just code. They built exactly what we needed and nothing we didn't.",
    name: "Ana V.",
    role: "Solopreneur",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    text: "The SEO results were real — we went from page 3 to the top 5 for our main keywords in under 4 months.",
    name: "James T.",
    role: "Local Business Owner",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.",
    name: "Sana S.",
    role: "Sales Manager",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    text: "Using their systems, our online presence and conversions significantly improved. Highly recommend.",
    name: "Hassan A.",
    role: "E-commerce Manager",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
  },
];
```

- [ ] **Step 3: Create FAQ data**

Create `src/data/faq.ts`:

```typescript
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqCategories: Record<string, string> = {
  general: "General",
  services: "Services",
  pricing: "Pricing",
  process: "Process",
};

export const faqData: Record<string, FaqItem[]> = {
  general: [
    {
      question: "How long does a typical project take?",
      answer: "Most projects launch within 7–21 days depending on scope. A simple business website might take 1–2 weeks, while a full automation system or custom app could take 3–6 weeks. We'll give you a realistic timeline during our discovery call.",
    },
    {
      question: "Do you work with clients outside Boston?",
      answer: "Absolutely. While we're based in Boston, we work with clients across the US and internationally. Everything is done remotely with regular check-ins via video call.",
    },
    {
      question: "What makes B&Br different from other agencies?",
      answer: "We're founder-led, AI-native, and system-first. You work directly with Sean — no account managers, no hand-offs. AI isn't an add-on; it's core to how we build. And we focus on systems that scale, not fragile one-offs.",
    },
    {
      question: "Do I need to know about technology to work with you?",
      answer: "Not at all. We translate technical concepts into plain language. You tell us your business goals, and we handle the technical decisions. We'll explain everything along the way so you always know what's happening and why.",
    },
  ],
  services: [
    {
      question: "Can you rebuild my existing website?",
      answer: "Yes — redesigns and rebuilds are one of our most common projects. We'll audit your current site, preserve what's working, and rebuild it on a modern, fast, SEO-optimized stack.",
    },
    {
      question: "What platforms do you build on?",
      answer: "We work with React, Next.js, WordPress, Shopify, WooCommerce, and Flutter for mobile. We pick the platform that best fits your needs and budget — not what's trending.",
    },
    {
      question: "Do you offer ongoing support after launch?",
      answer: "Yes. Our IT Support & Maintenance service covers security updates, performance monitoring, bug fixes, and ongoing technical support. We don't build and disappear.",
    },
    {
      question: "Can you help with just AI automation without a new website?",
      answer: "Absolutely. Many clients come to us specifically for workflow automation, chatbot setup, or AI assistant development. We can work with your existing tech stack.",
    },
  ],
  pricing: [
    {
      question: "How does pricing work?",
      answer: "We offer two models: project-based pricing for defined scope work (websites, apps, automation setup), and monthly retainers for ongoing support and continuous development. We'll recommend the right model during your discovery call.",
    },
    {
      question: "What's a 'Launch & Build' engagement?",
      answer: "Launch & Build is our project-based model — perfect for websites, app launches, or setting up a new automation system. Clear scope, clear timeline, fixed price. It includes custom website development, app MVP launch, one-time automation setup, and brand identity systems.",
    },
    {
      question: "Do you offer monthly retainers?",
      answer: "Yes. Retainers are ideal for businesses that need ongoing development, maintenance, SEO work, or continuous automation improvements. You get a dedicated allocation of hours each month with priority response times.",
    },
    {
      question: "What if my budget is small?",
      answer: "We work with businesses at every stage. If a $50/month tool solves your problem, we'll tell you — even if it means a smaller invoice. We'd rather build trust than pad a proposal. During the discovery call, we'll be honest about what makes sense for your budget.",
    },
  ],
  process: [
    {
      question: "What's the discovery call like?",
      answer: "It's a free 30-minute conversation where we learn about your business, your goals, and your current setup. No sales scripts, no pressure. We'll give you honest feedback on what you need and whether we're the right fit.",
    },
    {
      question: "How involved do I need to be?",
      answer: "We keep you in the loop without overwhelming you. Expect brief weekly check-ins and milestone reviews. We handle the technical decisions — you focus on your business. We'll ask for your input when it matters (brand, content, priorities) and handle the rest.",
    },
    {
      question: "What if I'm not happy with the direction?",
      answer: "We build in review checkpoints at every phase. If something isn't right, we course-correct before moving forward. Our Blueprint phase exists specifically to align on direction before any code is written.",
    },
    {
      question: "How do you handle revisions?",
      answer: "Revisions are built into every project. Each milestone includes a review round where you can request changes. We find that our Blueprint phase eliminates most major revisions because we align on direction early.",
    },
  ],
};
```

- [ ] **Step 4: Create portfolio data**

Create `src/data/portfolio.ts`:

```typescript
export interface Project {
  title: string;
  category: string;
  categoryColor: string;
  description: string;
  techStack: string[];
}

export const projects: Project[] = [
  {
    title: "PharmaGuide AI — Supplement & Medication Scanner",
    category: "Health Technology",
    categoryColor: "#2563eb",
    description:
      "First-of-its-kind AI pharmacist app that scans supplements via barcode and OCR, evaluates quality on a 100-point deterministic scoring algorithm, checks drug-supplement interactions, and provides personalized safety recommendations — all with HIPAA-compliant, privacy-first architecture.",
    techStack: ["Flutter", "Python", "NLP/RAG", "DSLD Database", "HIPAA"],
  },
  {
    title: "Clinical EHR Integration & Workflow Systems",
    category: "Healthcare",
    categoryColor: "#059669",
    description:
      "Custom electronic health record integrations for medical clinics — connecting patient intake, scheduling, billing, and clinical documentation into unified workflows. Designed with HIPAA compliance, role-based access controls, and automated reporting.",
    techStack: ["EHR/EMR", "HL7/FHIR", "HIPAA", "API Integration"],
  },
  {
    title: "eCommerce Platforms & Conversion Optimization",
    category: "eCommerce",
    categoryColor: "#7c3aed",
    description:
      "Full-stack eCommerce builds on Shopify and WooCommerce — custom storefronts, payment processing, inventory management, and conversion-optimized checkout flows. Includes SEO structure, analytics integration, and automated email sequences.",
    techStack: ["Shopify", "WooCommerce", "Stripe", "GA4"],
  },
  {
    title: "AI Chatbots & Automated Lead Pipelines",
    category: "AI & Automation",
    categoryColor: "#f59e0b",
    description:
      "Custom GPT-powered chatbots deployed on business websites for 24/7 customer support, lead qualification, appointment booking, and FAQ handling. Integrated with CRM systems and connected to automated follow-up workflows via Zapier and Make.",
    techStack: ["GPT API", "RAG", "Zapier", "CRM"],
  },
  {
    title: "Pharmaceutical Data Management & Pipeline Architecture",
    category: "Data Engineering",
    categoryColor: "#06b6d4",
    description:
      "Designed and built multi-phase data pipelines for processing 100,000+ supplement products from the DSLD database — including cleaning, normalization, ingredient identity preservation, enrichment, and deterministic scoring.",
    techStack: ["Python", "JSON/CSV", "DSLD", "Data Validation"],
  },
  {
    title: "Business Websites & Landing Pages",
    category: "Web Development",
    categoryColor: "#8b5cf6",
    description:
      "Custom responsive websites for small businesses and professional brands — built with React, Next.js, or WordPress depending on the client's needs. SEO-optimized, fast-loading, accessible, and designed for lead conversion from day one.",
    techStack: ["React", "Next.js", "WordPress", "SEO"],
  },
];

export const principles = [
  { title: "Accuracy Over Hype", description: "We don't recommend tools because they're trending — we recommend them because they solve the problem. Every technical decision is evidence-based and tested under real conditions." },
  { title: "Performance First", description: "Fast load times, clean code, zero bloat. We obsess over the details that users feel but can't name — the milliseconds, the smooth transitions, the pages that just work." },
  { title: "Continuous Learning", description: "In AI, today's best practice is tomorrow's anti-pattern. We invest hours every week studying new models, frameworks, and research — so our clients never inherit outdated systems." },
  { title: "Authenticity", description: "We cut through the noise. If a $50/month tool solves your problem, we'll tell you — even if it means a smaller invoice. Our reputation is built on honesty, not upsells." },
  { title: "Human-Centered", description: "Technology is a tool, not the point. We build for the humans on the other end — the patient checking their meds, the founder checking their dashboard at midnight." },
  { title: "Ship, Then Iterate", description: "Perfection is the enemy of progress. We get functional systems into your hands fast, then refine based on real data and real user behavior — not assumptions." },
];
```

- [ ] **Step 5: Create tools data**

Create `src/data/tools.ts`:

```typescript
export interface ToolCategory {
  title: string;
  items: string[];
}

export const toolCategories: ToolCategory[] = [
  {
    title: "Frontend",
    items: ["React / Next.js", "Flutter", "WordPress / Elementor", "Tailwind CSS", "HTML / CSS / JS"],
  },
  {
    title: "Backend & Data",
    items: ["Python / Node.js", "PostgreSQL / Firebase", "REST / GraphQL", "Pandas / NumPy", "Supabase"],
  },
  {
    title: "AI & Tools",
    items: ["OpenAI / Claude API", "RAG / Vector Search", "Zapier / Make", "GA4 / Looker Studio", "Figma / Notion"],
  },
];
```

- [ ] **Step 6: Verify all data imports cleanly**

Create a quick test in `src/app/page.tsx`:

```tsx
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { faqData } from "@/data/faq";
import { projects } from "@/data/portfolio";
import { toolCategories } from "@/data/tools";

export default function HomePage() {
  return (
    <div className="pt-20 px-6">
      <p>Services: {services.length}</p>
      <p>Testimonials: {testimonials.length}</p>
      <p>FAQ categories: {Object.keys(faqData).length}</p>
      <p>Projects: {projects.length}</p>
      <p>Tool categories: {toolCategories.length}</p>
    </div>
  );
}
```

Run `npm run dev` — verify the counts show: 5, 9, 4, 6, 3.

- [ ] **Step 7: Commit**

```bash
git add src/data/
git commit -m "feat: add all typed content data files (services, testimonials, FAQ, portfolio, tools)"
```

---

## Phase 4: Homepage Sections (Tasks 10-19)

Build each homepage section one at a time. After each task, the homepage gains one more section. After this phase: the full 10-section homepage is complete.

**Note to engineer:** Each section task follows the same pattern — create the section component, import it in `src/app/page.tsx`, verify visually. Tasks 10-19 are listed in the spec's section order (1-10). Build them in order since the page reads top to bottom.

---

### Task 10: Hero Section

**Files:**
- Create: `src/components/effects/scroll-reveal.tsx`
- Create: `src/components/sections/hero.tsx`
- Modify: `src/app/page.tsx`

Implement the full hero from the design spec: grid background, "Now Booking" badge, headline with gradient text, subtitle, dual CTAs (ShineButton + outline), audience pills, trust signals. Use Framer Motion for the orchestrated entrance (staggered delays per element as specified in the motion strategy).

Reference: Design spec Section 1: Hero. The grid background pattern and radial accent are adapted from the 21st.dev hero component provided by the user.

---

### Task 11: Metrics Bar + Tech Stack Marquee

**Files:**
- Create: `src/components/sections/metrics-bar.tsx`
- Create: `src/components/effects/tech-marquee.tsx`
- Modify: `src/app/page.tsx`

Implement the compact metrics row (3 columns with large numbers in Cabinet Grotesk 800, tabular-nums) and the horizontal infinite-scroll tech stack logo marquee underneath. Use CSS `animation: marquee` for the marquee. Logos are text-based (no images) in muted gray, with hover colorize effect.

Reference: Design spec Section 2: Metrics + Tech Stack.

---

### Task 12: Services Grid (Expandable Cards)

**Files:**
- Create: `src/components/sections/services-grid.tsx`
- Modify: `src/app/page.tsx`

Implement the 2x2 + 1 grid of service cards that expand on click to reveal "What We Deliver" bullets and "Who This Is For" text. Use Framer Motion `AnimatePresence` + `motion.div` with `layout` prop for smooth height animation. Import data from `src/data/services.ts`.

Reference: Design spec Section 3: Services Grid.

---

### Task 13: AnimatedBeam Section

**Files:**
- Create: `src/components/effects/animated-beam.tsx`
- Create: `src/components/sections/animated-beam-section.tsx`
- Modify: `src/app/page.tsx`

Implement the AnimatedBeam component (adapted from Magic UI). The storytelling version: left side shows pain point nodes ("Manual Tasks", "Lost Leads", "Bad Analytics"), center is B&Br node with pulsing glow, right side shows solution nodes ("Automation", "Growth", "Insights"). Animated gradient beams flow left→center and center→right.

Reference: Design spec Section 4. The base AnimatedBeam component code was provided by the user — adapt it to the storytelling layout.

---

### Task 14: Why B&Br + Comparison Table (Dark Section)

**Files:**
- Create: `src/components/sections/why-bbr.tsx`
- Create: `src/components/sections/comparison-table.tsx`
- Modify: `src/app/page.tsx`

Two sub-sections in one dark (`bg-navy-950`) section. Top: 2x2 grid of differentiator cards. Bottom: comparison table that breaks wider than the container. B&Br column gets subtle amber-600/10 background. Import data from `src/data/services.ts` (differentiators + comparisonTable).

Reference: Design spec Section 5.

---

### Task 15: Orbital Process Timeline

**Files:**
- Create: `src/components/sections/orbital-process.tsx`
- Modify: `src/app/page.tsx`

Adapt the radial orbital timeline from 21st.dev. 4 nodes (Audit, Blueprint, Build, Optimize) orbit a central pulsing core on dark background. Auto-rotates via `setInterval` at 0.3°/50ms. Click a node to stop, center it, and expand a detail card. Import data from `src/data/services.ts` (processSteps).

Reference: Design spec Section 6. The base component code was provided by the user — adapt it to use B&Br's 4 process steps and color palette.

---

### Task 16: Testimonials (Scrolling Columns)

**Files:**
- Create: `src/components/sections/testimonials.tsx`
- Modify: `src/app/page.tsx`

Implement the 3-column scrolling testimonials from 21st.dev. Each column auto-scrolls vertically at a different speed (15s, 19s, 17s) using Framer Motion `animate={{ translateY: "-50%" }}` with infinite loop. Top/bottom gradient mask. Responsive: 1 col mobile, 2 tablet, 3 desktop. Import data from `src/data/testimonials.ts`.

Reference: Design spec Section 7. The base component code was provided by the user.

---

### Task 17: FAQ Section (Tabbed Accordion)

**Files:**
- Create: `src/components/sections/faq-section.tsx`
- Modify: `src/app/page.tsx`

Implement the tabbed FAQ from 21st.dev. Category tabs at top with animated active indicator. Accordion items expand/collapse with Framer Motion height animation. Plus icon rotates 45° when open. Import data from `src/data/faq.ts`.

Reference: Design spec Section 8. The base component code was provided by the user — adapt to B&Br palette and data structure.

---

### Task 18: Final CTA Banner

**Files:**
- Create: `src/components/sections/cta-banner.tsx`
- Modify: `src/app/page.tsx`

Dark gradient section with grid overlay, gradient text headline, ShineButton CTA, email fallback link, and trust signal text. This section reuses the gradient-text class and ShineButton component.

Reference: Design spec Section 9.

---

### Task 19: Assemble Homepage

**Files:**
- Modify: `src/app/page.tsx`

Final homepage assembly — import all section components and render them in order. Remove the test data display from Task 9. Verify the complete page flow renders correctly with all 10 sections (hero through footer).

```tsx
import { Hero } from "@/components/sections/hero";
import { MetricsBar } from "@/components/sections/metrics-bar";
import { ServicesGrid } from "@/components/sections/services-grid";
import { AnimatedBeamSection } from "@/components/sections/animated-beam-section";
import { WhyBbr } from "@/components/sections/why-bbr";
import { OrbitalProcess } from "@/components/sections/orbital-process";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricsBar />
      <ServicesGrid />
      <AnimatedBeamSection />
      <WhyBbr />
      <OrbitalProcess />
      <Testimonials />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
```

Commit: `"feat: complete 10-section homepage assembly"`

---

## Phase 5: Inner Pages (Tasks 20-22)

Build Services, About, and Contact pages using section components and data. Each page follows the layout described in the design spec.

---

### Task 20: Services Page

**Files:**
- Create: `src/components/sections/service-deep-dive.tsx` (reusable two-column service section)
- Modify: `src/app/services/page.tsx`

Build the full services page: hero with quick-nav pills, 5 service deep-dive sections (alternating left/right layout), on-demand services section (Cloud + Cybersecurity), and bottom CTA. Import all content from `src/data/services.ts`.

Reference: Design spec — Services Page section.

---

### Task 21: About Page

**Files:**
- Create: `src/components/sections/founder-card.tsx`
- Modify: `src/app/about/page.tsx`

Build the about page: hero, origin story section, founder two-column section (card + bio), 6-card operating principles grid, portfolio section (6 project cards with colored borders), tools we trust (3-column grid), and bottom CTA. Import from `src/data/portfolio.ts` and `src/data/tools.ts`.

Reference: Design spec — About Page section. All content is preserved verbatim from the existing site.

---

### Task 22: Contact Page

**Files:**
- Create: `src/components/forms/contact-form.tsx`
- Modify: `src/app/contact/page.tsx`

Build the contact page: hero, two-column layout (info sidebar + form). Left sidebar has "What Happens Next" 3-step process, direct contact info, trust signals, and a Cal.com link/embed (lazy-loaded). Right has the full contact form posting to Formspree (action: `https://formspree.io/f/mzdaenay`). Includes honeypot field, submit button with arrow animation, and success state.

Reference: Design spec — Contact Page section. Form fields match the existing site's form exactly.

---

## Phase 6: Polish & SEO (Tasks 23-25)

Final pass: scroll animations, SEO metadata, and build verification.

---

### Task 23: Scroll Reveal Animations

**Files:**
- Create: `src/components/effects/scroll-reveal.tsx` (if not already created in Task 10)
- Modify: All section components

Create a reusable `ScrollReveal` wrapper component using Framer Motion `whileInView`. Apply it to all section components with staggered children (80-100ms delay per child). Parameters from spec: `y: 20 → 0`, `opacity: 0 → 1`, ease `[0.16, 1, 0.3, 1]`, `once: true`, `margin: "-100px"`.

---

### Task 24: SEO & Metadata

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Modify: All page files (metadata exports)

Add Next.js Metadata API exports to all pages with title, description, and Open Graph tags. Create sitemap.ts and robots.ts for crawlability. Add JSON-LD structured data (Organization + LocalBusiness) to the root layout.

---

### Task 25: Final Build Verification

**Files:** None created — verification only.

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds with zero errors.

- [ ] **Step 2: Run production server and verify all pages**

```bash
npm start
```

Visit all 4 pages. Verify: fonts load, dark mode toggles, animations play, forms submit, mobile menu works.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete B&Br Technology website redesign"
```

---

## Summary

| Phase | Tasks | What's built |
|-------|-------|-------------|
| 1: Foundation | 1-5 | Next.js scaffold, design system, fonts, utils, shadcn components |
| 2: Layout Shell | 6-8 | Header, footer, 4 page routes, theme toggle |
| 3: Data Layer | 9 | All typed content data files |
| 4: Homepage | 10-19 | All 10 homepage sections |
| 5: Inner Pages | 20-22 | Services, About, Contact pages |
| 6: Polish | 23-25 | Scroll animations, SEO, final verification |

**Total: 25 tasks across 6 phases.**
