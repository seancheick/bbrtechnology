import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// One look for every social card: navy ground, amber mark, big display line.
export function ogImage({ eyebrow, title, subtitle, accent = "#fbbf24" }: { eyebrow: string; title: string; subtitle?: string; accent?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0a0f1a",
          color: "#f8fafc",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 34, fontWeight: 800 }}>
          B&amp;Br
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#d97706", marginLeft: 6, marginTop: 14 }} />
          <div style={{ marginLeft: 22, fontSize: 22, fontWeight: 500, color: "#94a3b8", letterSpacing: 3 }}>TECHNOLOGY</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, letterSpacing: 4, color: accent, textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ marginTop: 22, fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
          {subtitle && <div style={{ marginTop: 26, fontSize: 30, color: "#94a3b8", maxWidth: 980 }}>{subtitle}</div>}
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#94a3b8" }}>Websites · Web & mobile apps · AI & automation</div>
      </div>
    ),
    ogSize
  );
}
