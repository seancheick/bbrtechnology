"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  // Avoid hydration mismatch — render placeholder until mounted
  if (!mounted) {
    return (
      <div className="flex h-9 items-center rounded-full border border-border bg-bg-alt px-1">
        <div className="flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium text-foreground-muted">
          <Sun className="h-3.5 w-3.5" />
          <span>Light</span>
        </div>
        <div className="flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium text-foreground-muted">
          <Moon className="h-3.5 w-3.5" />
          <span>Dark</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-9 items-center rounded-full border border-border bg-bg-alt px-1">
      {/* Sliding indicator */}
      <motion.div
        className="absolute top-1 bottom-1 rounded-full border border-border bg-bg shadow-sm"
        initial={false}
        animate={{
          left: isDark ? "50%" : "4px",
          right: isDark ? "4px" : "50%",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      />

      {/* Light button */}
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`relative z-10 flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium transition-colors ${
          !isDark ? "text-foreground" : "text-foreground-muted"
        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 focus-visible:ring-offset-bg`}
        aria-label="Switch to light theme"
        aria-pressed={!isDark}
      >
        <Sun className="h-3.5 w-3.5" />
        <span>Light</span>
      </button>

      {/* Dark button */}
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`relative z-10 flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium transition-colors ${
          isDark ? "text-foreground" : "text-foreground-muted"
        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 focus-visible:ring-offset-bg`}
        aria-label="Switch to dark theme"
        aria-pressed={isDark}
      >
        <Moon className="h-3.5 w-3.5" />
        <span>Dark</span>
      </button>
    </div>
  );
}
