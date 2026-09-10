import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import { siteUrl } from "@/lib/site";

/** The home and archive pages change with the build (new projects, new copy),
 * so they carry the build date. Pinning them to the newest post instead told
 * crawlers nothing had changed since that post, which is how a stale title can
 * sit in the results for months. The blog index still follows its newest post,
 * because that is genuinely when it last changed. */
const latestPost = posts[0]?.date;

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();
  const blogModified = latestPost ? new Date(latestPost) : buildDate;

  return [
    {
      url: siteUrl,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: blogModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
