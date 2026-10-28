import { cn } from "@/lib/utils";

export function BrowserFrame({
  url,
  children,
  className,
  label,
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_30px_80px_-30px_rgba(10,15,26,0.45)] dark:border-white/10 dark:bg-navy-900",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-black/5 bg-[#f4f3ef] px-4 py-2.5 dark:border-white/10 dark:bg-navy-950">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex min-w-0 max-w-xs flex-1 items-center justify-center rounded-md bg-white px-3 py-1 text-[11px] text-navy-600 dark:bg-navy-800 dark:text-navy-400">
          <span className="truncate">{url}</span>
        </div>
        {label ? (
          <span className="eyebrow hidden shrink-0 text-[9px] text-navy-600 sm:inline dark:text-navy-400">{label}</span>
        ) : (
          <span className="w-10" aria-hidden />
        )}
      </div>
      <div className="relative">{children}</div>
    </figure>
  );
}

export function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <figure
      className={cn(
        "relative mx-auto w-[260px] rounded-[2.4rem] border border-black/10 bg-navy-950 p-2.5 shadow-[0_30px_80px_-30px_rgba(10,15,26,0.6)] dark:border-white/10",
        className
      )}
    >
      <div className="absolute left-1/2 top-4 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-navy-950" aria-hidden />
      <div className="relative overflow-hidden rounded-[1.9rem] bg-white dark:bg-navy-900">{children}</div>
    </figure>
  );
}
