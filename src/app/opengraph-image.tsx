import { ImageResponse } from "next/og";
import { person, siteDescription } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${person.name} — ${person.jobTitle}`;

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
          padding: 80,
          backgroundColor: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 82% 22%, rgba(102,112,255,0.18), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: "#6670ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 32,
              fontStyle: "italic",
            }}
          >
            AR
          </div>
          <span style={{ fontSize: 28, color: "#4d4d4d" }}>
            {person.jobTitle}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <span
            style={{
              fontSize: 108,
              fontWeight: 900,
              color: "#000000",
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            ANMOL RAJPUT
          </span>
          <span style={{ fontSize: 30, color: "#4d4d4d", maxWidth: 900 }}>
            {siteDescription}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
