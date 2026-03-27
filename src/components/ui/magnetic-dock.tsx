"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { Mail } from "lucide-react";

/* ---------- Brand SVG icons (lucide-react no longer ships brand marks) ---------- */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ---------- Mouse context ---------- */
interface MouseContextValue {
  mouseX: MotionValue<number>;
}

const MouseContext = React.createContext<MouseContextValue | null>(null);

function useMouseContext(): MouseContextValue {
  const ctx = React.useContext(MouseContext);
  if (!ctx) throw new Error("useMouseContext must be used inside MagneticDock");
  return ctx;
}

/* ---------- DockIcon ---------- */
interface DockIconProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

function DockIcon({ href, label, children }: DockIconProps) {
  const { mouseX } = useMouseContext();
  const ref = React.useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 200; // large = far away → no scale
    return val - (rect.x + rect.width / 2);
  });

  // Map distance to size: close → 40, far → 32 (compact)
  const sizeRaw = useTransform(distance, [-80, 0, 80], [32, 40, 32]);
  const size = useSpring(sizeRaw, { mass: 0.1, stiffness: 200, damping: 15 });

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="relative flex items-end"
    >
      <motion.div
        ref={ref}
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        {children}
      </motion.div>
    </a>
  );
}

/* ---------- MagneticDock ---------- */
const socialLinks = [
  {
    href: "https://github.com/bbrtechnology",
    label: "GitHub",
    icon: <GithubIcon className="h-4 w-4" />,
  },
  {
    href: "https://linkedin.com/company/bbrtechnology",
    label: "LinkedIn",
    icon: <LinkedinIcon className="h-4 w-4" />,
  },
  {
    href: "https://twitter.com/bbrtechnology",
    label: "Twitter / X",
    icon: <XIcon className="h-4 w-4" />,
  },
  {
    href: "mailto:hello@bbrtechnology.com",
    label: "Email",
    icon: <Mail className="h-4 w-4" />,
  },
];

export function MagneticDock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <MouseContext.Provider value={{ mouseX }}>
      <motion.div
        onMouseMove={(e: React.MouseEvent) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="inline-flex items-end gap-2 rounded-xl bg-white/5 border border-white/10 px-3 pb-2 pt-4"
      >
        {socialLinks.map((link) => (
          <DockIcon key={link.href} href={link.href} label={link.label}>
            {link.icon}
          </DockIcon>
        ))}
      </motion.div>
    </MouseContext.Provider>
  );
}
