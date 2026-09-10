import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPost, posts } from "@/data/posts";
import { person, siteUrl } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

/** The only inline markup the post bodies use: *emphasis*. */
function emphasise(text: string) {
  return text
    .split(/(\*[^*]+\*)/g)
    .map((part, i) =>
      part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
        <em key={i}>{part.slice(1, -1)}</em>
      ) : (
        part
      ),
    );
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${siteUrl}/blog/${post.slug}` },
    authors: [{ name: person.name, url: siteUrl }],
    openGraph: {
      type: "article",
      // Without this the post inherits the root og:url and every share points
      // at the home page.
      url: `${siteUrl}/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [person.name],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="pb-14 pt-[130px] md:pb-20 md:pt-[160px]">
      <div className="container-x">
        <Link
          href="/blog"
          className="text-[16px] font-medium text-muted transition-colors hover:text-ink"
        >
          ← All posts
        </Link>

        <p className="eyebrow mt-8">{formatDate(post.date)}</p>
        <h1 className="h1 mt-4 max-w-[900px]">{post.title}</h1>
        <p className="body-lg mt-6 max-w-[760px]">{post.description}</p>

        <div className="panel mt-10 p-6 md:p-12">
          <div className="max-w-[760px]">
            {/* "## " marks a subheading; anything else is a paragraph. */}
            {post.body.map((block, idx) =>
              block.startsWith("## ") ? (
                <h2 key={idx} className="h2 mt-10 first:mt-0">
                  {block.slice(3)}
                </h2>
              ) : (
                <p key={idx} className="body-lg mt-5 first:mt-0 leading-relaxed">
                  {emphasise(block)}
                </p>
              ),
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/#contact" className="btn">
            <span>Let&apos;s Work Together!</span>
          </Link>
          <Link href="/blog" className="btn">
            <span>More Posts</span>
          </Link>
        </div>
      </div>

      <JsonLd
        schemas={[
          {
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            // Cross-references the Person node emitted by the root layout.
            author: { "@id": `${siteUrl}/#person` },
            publisher: { "@id": `${siteUrl}/#person` },
            isPartOf: { "@id": `${siteUrl}/blog#blog` },
            mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
            url: `${siteUrl}/blog/${post.slug}`,
            image: `${siteUrl}/blog/${post.slug}/opengraph-image`,
            inLanguage: "en",
            wordCount: post.body.join(" ").split(/\s+/).length,
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
    </article>
  );
}
