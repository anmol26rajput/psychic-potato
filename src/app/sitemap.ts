import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import { siteUrl } from "@/lib/site";

/** Newest post drives the home/blog lastModified, so the sitemap moves
 * whenever the site actually changes rather than on every deploy. */
const latestPost = posts[0]?.date;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = latestPost ? new Date(latestPost) : new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/work`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified,
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
