import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { formatDate, getPost, posts } from "@/data/posts";
import { person } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Same fonts and mark as the site card, so a shared post looks like it came
 * from the same place. Read at build time; these routes prerender. */
const root = process.cwd();
const bold = readFileSync(join(root, "src/app/og/PublicSans-ExtraBold.ttf"));
const medium = readFileSync(join(root, "src/app/og/PublicSans-Medium.ttf"));
const logo = `data:image/png;base64,${readFileSync(
  join(root, "src/app/icon.png"),
).toString("base64")}`;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

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
            "radial-gradient(circle at 88% 12%, rgba(102,112,255,0.20), transparent 52%), radial-gradient(circle at 6% 96%, rgba(249,71,6,0.10), transparent 48%)",
          fontFamily: "Public Sans",
        }}
      >
        <span style={{ fontSize: 26, fontWeight: 500, color: "#4d4d4d" }}>
          {post ? formatDate(post.date) : "Writing"}
        </span>

        <span
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: "#000000",
            letterSpacing: -2,
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          {post?.title ?? "Writing & Notes"}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={logo} width={56} height={56} alt="" />
          <span style={{ fontSize: 28, fontWeight: 500, color: "#000" }}>
            {person.name}
          </span>
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
