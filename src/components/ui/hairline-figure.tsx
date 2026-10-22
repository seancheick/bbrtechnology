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

// The Hairline pages are self-contained (kernel + bench, MIT). They follow the
// site's theme through the bench's own ?theme= parameter.
export function HairlineFigure({ name, className }: { name: HairlineName; className?: string }) {
  const { resolvedTheme } = useTheme();
  const mounted = React.useSyncExternalStore(subscribe, () => true, () => false);
  const theme = mounted && resolvedTheme === "dark" ? "dark" : "light";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border border-border bg-white dark:bg-[#08090a]",
        className
      )}
    >
      {mounted ? (
        <iframe
          key={theme}
          src={`/hairline/${name}.html?theme=${theme}`}
          title={titles[name]}
          loading="lazy"
          className="block aspect-[5/6] w-full border-0 sm:aspect-[20/21]"
        />
      ) : (
        <div className="aspect-[5/6] w-full sm:aspect-[20/21]" aria-hidden />
      )}
    </div>
  );
}
