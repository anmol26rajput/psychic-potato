import { ImageResponse } from "next/og";
import { formatDate, getPost, posts } from "@/data/posts";
import { person } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
            "radial-gradient(circle at 82% 22%, rgba(102,112,255,0.18), transparent 55%)",
        }}
      >
        <span style={{ fontSize: 26, color: "#4d4d4d" }}>
          {post ? formatDate(post.date) : "Writing"}
        </span>

        <span
          style={{
            fontSize: 68,
            fontWeight: 700,
            color: "#000000",
            letterSpacing: -2,
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          {post?.title ?? "Writing & Notes"}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              background: "#6670ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 28,
              fontStyle: "italic",
            }}
          >
            AR
          </div>
          <span style={{ fontSize: 28, color: "#000" }}>{person.name}</span>
        </div>
      </div>
    ),
    size,
  );
}
