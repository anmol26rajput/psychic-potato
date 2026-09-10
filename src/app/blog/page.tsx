import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, posts } from "@/data/posts";
import { siteUrl } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Anmol Rajput on Django, AI agents, and running freelance software projects end to end.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/blog`,
    title: "Blog — Anmol Rajput",
    description:
      "Anmol Rajput on Django, AI agents, and running freelance software projects end to end.",
  },
};

export default function BlogPage() {
  return (
    <section className="pb-14 pt-[130px] md:pb-20 md:pt-[160px]">
      <JsonLd
        schemas={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
          {
            "@type": "Blog",
            "@id": `${siteUrl}/blog#blog`,
            name: "Anmol Rajput's Blog",
            url: `${siteUrl}/blog`,
            author: { "@id": `${siteUrl}/#person` },
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: `${siteUrl}/blog/${post.slug}`,
              datePublished: post.date,
            })),
          },
        ]}
      />
      <div className="container-x">
        <Reveal>
          <h1 className="h1">
            Writing & <span className="font-serif italic">Notes</span>
          </h1>
          <p className="body-lg mt-4 max-w-[720px]">
            What I&apos;ve learned shipping backends, agents, and client work.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-4">
          {posts.map((post, idx) => (
            <Reveal key={post.slug} delay={Math.min(idx, 5) * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="panel group block p-6 transition-transform duration-300 hover:-translate-y-1 md:p-10"
              >
                <span className="eyebrow">{formatDate(post.date)}</span>
                <span className="h2 mt-4 block transition-colors group-hover:text-indigo">
                  {post.title}
                </span>
                <span className="body-lg mt-4 block max-w-[760px]">
                  {post.description}
                </span>
                <span className="mt-6 inline-block text-[14px] font-bold">
                  Read the post →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
