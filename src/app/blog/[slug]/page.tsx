import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { renderMarkdown, readingTime } from "@/lib/markdown";
import { SITE_URL, SITE_NAME, SITE_AUTHOR } from "@/lib/site";
import type { Post } from "@/lib/database.types";

export const revalidate = 60; // ISR: edits appear within a minute

type Params = { slug: string };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function getPost(slug: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return (data as Post) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };

  const title = post.meta_title || post.title;
  const description =
    post.meta_description || post.excerpt || `Read ${post.title} on ${SITE_NAME}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.published_at ?? post.created_at,
      modifiedTime: post.updated_at,
      authors: [SITE_AUTHOR],
      tags: post.tags,
      // explicit cover wins; otherwise the dynamic OG image takes over
      ...(post.cover_image_url ? { images: [{ url: post.cover_image_url }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const html = renderMarkdown(post.content);
  const minutes = readingTime(post.content);
  const published = post.published_at ?? post.created_at;

  // ----- JSON-LD structured data -----
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.meta_description || post.excerpt || undefined,
        image: post.cover_image_url
          ? [post.cover_image_url]
          : [`${SITE_URL}/blog/${post.slug}/opengraph-image`],
        datePublished: published,
        dateModified: post.updated_at,
        author: { "@type": "Person", name: SITE_AUTHOR },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
        keywords: post.tags.join(", ") || undefined,
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `${SITE_URL}/blog/${post.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      {/* Breadcrumbs (visible mirror of JSON-LD) */}
      <nav
        aria-label="Breadcrumb"
        className="text-sm text-black/50 dark:text-white/50"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link
              href="/blog"
              className="hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              Blog
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="max-w-[16rem] truncate text-black/70 dark:text-white/70">
            {post.title}
          </li>
        </ol>
      </nav>

      <header className="mt-6">
        <h1 className="text-4xl font-bold leading-tight tracking-tight">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-black/50 dark:text-white/50">
          By {SITE_AUTHOR} · {formatDate(published)} · {minutes} min read
        </p>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {post.cover_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover_image_url}
          alt={post.title}
          className="mt-8 w-full rounded-2xl border border-black/10 dark:border-white/10"
        />
      )}

      {/* Markdown body */}
      <div
        className="blog-content mt-8"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <footer className="mt-12 rounded-2xl border border-black/10 bg-gradient-to-br from-emerald-500/10 to-sky-500/5 p-6 dark:border-white/10">
        <p className="font-semibold">Enjoyed this guide?</p>
        <p className="mt-1 text-sm text-black/65 dark:text-white/65">
          Practice what you learned —{" "}
          <Link
            href="/practice"
            className="font-medium text-emerald-700 underline dark:text-emerald-400"
          >
            try the MCQ engine
          </Link>{" "}
          or{" "}
          <Link
            href="/vocabulary"
            className="font-medium text-emerald-700 underline dark:text-emerald-400"
          >
            drill the vocabulary flashcards
          </Link>
          .
        </p>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
