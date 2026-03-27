"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

interface ShineButtonProps extends Omit<ButtonProps, "variant"> {
  href?: string;
  target?: string;
  rel?: string;
}

const ShineButton = React.forwardRef<HTMLButtonElement, ShineButtonProps>(
  ({ className, children, href, target, rel, asChild, ...props }, ref) => {
    const classes = cn(
      "relative overflow-hidden bg-navy-900 text-gold-400 border border-gold-400/30",
      "group",
      className
    );

    const inner = (
      <>
        <span
          className={cn(
            "pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg]",
            "bg-gradient-to-r from-transparent via-white/30 to-transparent",
            "group-hover:animate-[shine_0.6s_ease-in-out]"
          )}
          aria-hidden="true"
        />
        {children}
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2",
            "h-11 px-6",
            classes
          )}
        >
          {inner}
        </a>
      );
    }

    return (
      <Button
        ref={ref}
        variant="default"
        className={classes}
        asChild={asChild}
        {...props}
      >
        {inner}
      </Button>
    );
  }
);
ShineButton.displayName = "ShineButton";

export { ShineButton };
