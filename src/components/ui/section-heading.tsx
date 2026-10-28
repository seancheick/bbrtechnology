import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

interface SectionHeadingProps {
  index?: string;
  /** Only when the title doesn't already say what the section is. */
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  className?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "default",
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  const inverse = tone === "inverse";
  // Page titles render immediately; only section headings below the fold rise in.
  const Wrap = Heading === "h1" ? "div" : Reveal;
  return (
    <Wrap className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      {eyebrow && (
        <p
          className={cn(
            "eyebrow mb-5 flex items-center gap-3",
            align === "center" && "justify-center",
            inverse ? "text-gold-400" : "text-amber-600"
          )}
        >
          {index && (
            <span className={cn("tabular", inverse ? "text-white/40" : "text-foreground-subtle")}>{index}</span>
          )}
          {index && <span aria-hidden className={cn("h-px w-8", inverse ? "bg-white/20" : "bg-border")} />}
          <span>{eyebrow}</span>
        </p>
      )}
      <Heading
        className={cn(
          "font-display text-balance text-4xl font-extrabold leading-[1.02] sm:text-5xl lg:text-[3.5rem]",
          inverse ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </Heading>
      {lede && (
        <p
          className={cn(
            "mt-6 text-pretty text-lg leading-relaxed",
            inverse ? "text-navy-400" : "text-foreground-muted"
          )}
        >
          {lede}
        </p>
      )}
    </Wrap>
  );
}
