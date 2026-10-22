import type { PreviewKey } from "@/data/case-studies";
import { BrowserFrame } from "@/components/ui/device-frame";
import { TurnFlowPreview } from "@/components/previews/turnflow-preview";
import { FieldOpsPreview } from "@/components/previews/fieldops-preview";
import { PharmaGuidePreview } from "@/components/previews/pharmaguide-preview";
import { KeniyaPreview } from "@/components/previews/keniya-preview";
import { PerksPreview } from "@/components/previews/perks-preview";
import { OrchestratorPreview } from "@/components/previews/orchestrator-preview";

const previews: Record<PreviewKey, { url: string; Component: () => React.JSX.Element }> = {
  turnflow: { url: "turnflow / bookability", Component: TurnFlowPreview },
  fieldops: { url: "fieldops / crew + supervisor", Component: FieldOpsPreview },
  pharmaguide: { url: "pharmaguide / product score", Component: PharmaGuidePreview },
  keniya: { url: "keniya / boxes", Component: KeniyaPreview },
  perks: { url: "perksledger / perk graph", Component: PerksPreview },
  orchestrator: { url: "terminal", Component: OrchestratorPreview },
};

// Every preview is a hand-built rebuild of one documented screen, with fictional data.
export function ProductPreview({ preview, className }: { preview: PreviewKey; className?: string }) {
  const { url, Component } = previews[preview];
  return (
    <BrowserFrame url={url} label="Interactive preview" className={className}>
      <Component />
    </BrowserFrame>
  );
}
