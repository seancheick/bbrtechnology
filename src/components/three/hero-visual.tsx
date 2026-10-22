"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const HeroScene = React.lazy(() => import("@/components/three/hero-scene"));

function canWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

// Phones, reduced motion and no-WebGL get the static poster. Desktop gets the 3D scene,
// loaded on the visitor's first move, scroll or key (or after 6s), so the engine never
// competes with the page's own load.
export function HeroVisual({ className }: { className?: string }) {
  const [live, setLive] = React.useState(false);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!wide || calm || !canWebGL()) return;
    const events = ["pointermove", "scroll", "keydown", "touchstart"] as const;
    let done = false;
    const start = () => {
      if (done) return;
      done = true;
      cleanup();
      setLive(true);
    };
    const timer = window.setTimeout(start, 6000);
    const cleanup = () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, start));
    };
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    return cleanup;
  }, []);

  return (
    <div className={cn("relative aspect-square w-full", className)}>
      <Image
        src="/hero/stack-poster.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="(min-width: 1024px) 480px, 80vw"
        className={cn("object-contain transition-opacity duration-700", ready && "opacity-0")}
      />
      {live && (
        <React.Suspense fallback={null}>
          <HeroScene onReady={() => window.setTimeout(() => setReady(true), 150)} />
        </React.Suspense>
      )}
    </div>
  );
}
