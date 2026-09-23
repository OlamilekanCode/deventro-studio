import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "DevEntro Studio — From a rough idea to a working product.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0e2d28",
          color: "white",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px 80px",
          width: "100%",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: 20 }}>
          <div
            style={{
              alignItems: "center",
              background: "#a9f4cf",
              borderRadius: 12,
              color: "#0e2d28",
              display: "flex",
              fontSize: 40,
              fontWeight: 700,
              height: 64,
              justifyContent: "center",
              width: 64,
            }}
          >
            D
          </div>
          <div style={{ display: "flex", fontSize: 34 }}>
            DevEntro&nbsp;<span style={{ color: "#a9f4cf" }}>Studio</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, letterSpacing: -2, lineHeight: 1.05 }}>
            From a rough idea to a
          </div>
          <div
            style={{
              color: "#77efb5",
              fontSize: 76,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            working product.
          </div>
        </div>
        <div style={{ color: "#c2dbd4", display: "flex", fontSize: 26 }}>
          Websites · Custom platforms · APIs · AI workflows — dev.deventro.site
        </div>
      </div>
    ),
    size,
  );
}
