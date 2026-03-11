import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Primor Holding — Consultoria Empresarial";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A1628",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#C9A227",
            letterSpacing: "-1px",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          PRIMOR HOLDING
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#FBF8F1",
            marginTop: 24,
            textAlign: "center",
            opacity: 0.85,
          }}
        >
          Consultoria Empresarial de Excelencia
        </div>
        <div
          style={{
            width: 80,
            height: 4,
            backgroundColor: "#C9A227",
            marginTop: 40,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
