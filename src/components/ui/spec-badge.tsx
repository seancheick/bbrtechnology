import { cn } from "@/lib/utils";

export function SpecBadge({
  label,
  value,
  className,
  tone = "default",
}: {
  label: string;
  value?: string;
  className?: string;
  tone?: "default" | "inverse";
}) {
  const inverse = tone === "inverse";
  return (
    <span
      className={cn(
        "inline-flex items-center overflow-hidden rounded-md border font-[family-name:var(--font-mono)] text-[11px] leading-none",
        inverse ? "border-white/15 text-white/80" : "border-border text-foreground-muted",
        className
      )}
    >
      <span className={cn("px-2 py-1.5", inverse ? "bg-white/5" : "bg-bg-alt")}>{label}</span>
      {value && (
        <span className={cn("px-2 py-1.5 font-semibold", inverse ? "text-gold-400" : "text-foreground")}>
          {value}
        </span>
      )}
    </span>
  );
}

export function StatusDot({ status, className }: { status: string; className?: string }) {
  const live = /live/i.test(status);
  return (
    <span className={cn("inline-flex items-center gap-2 text-xs font-medium", className)}>
      <span className="relative flex h-2 w-2">
        {live && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60 motion-reduce:hidden" />
        )}
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", live ? "bg-success" : "bg-amber-600")} />
      </span>
      {status}
    </span>
  );
}
