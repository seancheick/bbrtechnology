import { ImageResponse } from "next/og";

export const dynamic = "force-static";

// The logo referenced by the Organization JSON-LD.
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0f1a",
          color: "#fbbf24",
          fontSize: 150,
          fontWeight: 800,
          letterSpacing: -4,
        }}
      >
        B&amp;Br
        <div style={{ width: 30, height: 30, borderRadius: 15, background: "#d97706", marginLeft: 10, marginTop: 70 }} />
      </div>
    ),
    { width: 512, height: 512 }
  );
}
