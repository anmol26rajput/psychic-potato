import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { person, siteDescription } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${person.name} — ${person.jobTitle}`;

/** Read at build time — this route prerenders, so nothing here runs per
 * request. Satori has no system fonts and no woff2 support, hence the two
 * committed TTFs: without them the card falls back to a single generic
 * weight, which is why the headline looked thin next to the real site. */
const root = process.cwd();
const bold = readFileSync(join(root, "src/app/og/PublicSans-ExtraBold.ttf"));
const medium = readFileSync(join(root, "src/app/og/PublicSans-Medium.ttf"));
/** Literal paths, not a helper taking a variable: a computed path makes the
 * bundler trace the entire project into the build. */
const logo = `data:image/png;base64,${readFileSync(
  join(root, "src/app/icon.png"),
).toString("base64")}`;
const photo = `data:image/jpeg;base64,${readFileSync(
  join(root, "public/me.jpg"),
).toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 88% 12%, rgba(102,112,255,0.20), transparent 52%), radial-gradient(circle at 6% 96%, rgba(249,71,6,0.10), transparent 48%)",
          fontFamily: "Public Sans",
        }}
      >
        {/* Left: the words. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 0 64px 72px",
            width: 760,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src={logo} width={56} height={56} alt="" />
            <span style={{ fontSize: 26, fontWeight: 500, color: "#4d4d4d" }}>
              {person.jobTitle}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 92,
                fontWeight: 800,
                color: "#000000",
                letterSpacing: -3.5,
                lineHeight: 1.02,
              }}
            >
              Anmol Rajput
            </span>
            <span
              style={{
                marginTop: 24,
                fontSize: 27,
                fontWeight: 500,
                lineHeight: 1.45,
                color: "#4d4d4d",
                maxWidth: 620,
              }}
            >
              {/* The name is already the headline, so the sentence starts
                  after it rather than repeating it. */}
              {siteDescription
                .replace(/^Anmol Rajput is an? /, "")
                .replace(/^./, (c) => c.toUpperCase())}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                background: "#00cc99",
              }}
            />
            <span style={{ fontSize: 24, fontWeight: 500, color: "#000" }}>
              anmolrajput.com
            </span>
          </div>
        </div>

        {/* Right: the same portrait card the hero opens with, so the preview
            and the page look like the same site. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              padding: 14,
              borderRadius: 56,
              background: "rgba(102,112,255,0.12)",
            }}
          >
            <img
              src={photo}
              width={310}
              height={310}
              alt=""
              style={{ borderRadius: 44, objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Public Sans", data: bold, weight: 800, style: "normal" },
        { name: "Public Sans", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
