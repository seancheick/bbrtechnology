"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export type HairlineName = "stack" | "sorter" | "devices";

const titles: Record<HairlineName, string> = {
  stack: "Interactive line figure: a product stack that opens into its layers",
  sorter: "Interactive line figure: a pigeonhole rack routing letters",
  devices: "Interactive line figure: a phone, a tablet and a monitor",
};

const subscribe = () => () => {};

// The Hairline pages are self-contained (kernel + bench, MIT) and are never edited.
// To show only the drawing, the iframe is offset by the bench's body padding (24px top,
// 16px sides) and the frame clips everything below the 400 × 320 plate: no slider, no play.
const PAD_TOP = 24;
const PAD_X = 16;

export function HairlineFigure({ name, className }: { name: HairlineName; className?: string }) {
  const { resolvedTheme } = useTheme();
  const mounted = React.useSyncExternalStore(subscribe, () => true, () => false);
  const theme = mounted && resolvedTheme === "dark" ? "dark" : "light";
  const box = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // the plate is 400 × 320 plus its 1px border
  const height = width ? Math.round(width * 0.8) + 2 : 0;

  return (
    <div
      ref={box}
      className={cn("relative w-full max-w-[640px] overflow-hidden rounded-[14px]", className)}
      style={{ height: height || undefined, aspectRatio: height ? undefined : "5 / 4" }}
    >
      {mounted && width > 0 && (
        <iframe
          key={theme}
          src={`/hairline/${name}.html?theme=${theme}`}
          title={titles[name]}
          loading="lazy"
          scrolling="no"
          className="absolute border-0"
          style={{ top: -PAD_TOP, left: -PAD_X, width: width + PAD_X * 2, height: height + PAD_TOP + 260 }}
        />
      )}
    </div>
  );
}
