import { ImageResponse } from "next/og";

export const alt = "EasyEdit: AI photo editor for Android";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e0e0d",
          color: "#f1f1ed",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 40, fontWeight: 800 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              border: "2px solid #f1f1ed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            e
          </div>
          easyedit.
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 120, fontWeight: 800, lineHeight: 1 }}>
          <div>Make something</div>
          <div style={{ display: "flex" }}>
            <span style={{ borderBottom: "14px solid #c8f23c", paddingBottom: 6 }}>unordinary.</span>
          </div>
        </div>
        <div style={{ fontSize: 32, color: "#a6a6a0" }}>AI photo editor for Android</div>
      </div>
    ),
    size,
  );
}
