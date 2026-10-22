"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

type TrackedLinkProps = React.ComponentProps<typeof Link> & {
  cta: string;
  external?: boolean;
};

// A link that records which call-to-action was used (location label only).
export function TrackedLink({ cta, external, onClick, ...props }: TrackedLinkProps) {
  const handle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    track("cta_clicked", { cta });
    onClick?.(e);
  };
  if (external) {
    const { href, ...rest } = props;
    return (
      <a
        href={typeof href === "string" ? href : String(href)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handle}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }
  return <Link onClick={handle} {...props} />;
}
