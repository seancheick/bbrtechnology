"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const subscribe = () => () => {};

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  // true only after hydration, without a setState-in-effect
  const mounted = React.useSyncExternalStore(subscribe, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";

  if (compact) {
    return (
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
      >
        {mounted ? isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" /> : <span className="h-4 w-4" />}
      </button>
    );
  }

  return (
    <div className="relative flex h-9 items-center rounded-full border border-border bg-bg-alt px-1">
      {mounted && (
        <motion.div
          className="absolute bottom-1 top-1 rounded-full border border-border bg-bg shadow-sm"
          initial={false}
          animate={{ left: isDark ? "50%" : "4px", right: isDark ? "4px" : "50%" }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      {(["light", "dark"] as const).map((mode) => {
        const active = mode === "dark" ? isDark : !isDark;
        const Icon = mode === "dark" ? Moon : Sun;
        return (
          <button
            key={mode}
            type="button"
            onClick={() => setTheme(mode)}
            aria-pressed={active}
            aria-label={`Switch to ${mode} theme`}
            className={`relative z-10 flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium capitalize transition-colors ${
              active ? "text-foreground" : "text-foreground-muted"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600`}
          >
            <Icon className="h-3.5 w-3.5" />
            {mode}
          </button>
        );
      })}
    </div>
  );
}
