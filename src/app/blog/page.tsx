import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import type { Post } from "@/lib/database.types";

export const revalidate = 60; // ISR: new posts appear within a minute
export const metadata = {
  title: "Blog",
  description:
    "Guides, tips and survival strategies for Virtual University BSCS students — written by students who've been there.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const supabase = await createClient();

  // Missing table / DB hiccup → empty page instead of a crash
  const { data: posts } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, cover_image_url, tags, published_at, updated_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(50);

  const list = (posts ?? []) as Pick<
    Post,
    "id" | "slug" | "title" | "excerpt" | "cover_image_url" | "tags" | "published_at" | "updated_at"
  >[];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <p className="mt-2 max-w-2xl text-black/60 dark:text-white/60">
        Guides, tips and survival strategies for VU BSCS students — how to
        crack semester work, exams and everything in between.

      </p>

      {list.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-black/15 p-10 text-center dark:border-white/15">
          <p className="text-4xl">✍️</p>
          <h2 className="mt-3 text-xl font-semibold">No posts yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-black/55 dark:text-white/55">
            The blog is warming up — the first guides are on the way.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {list.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white transition hover:-translate-y-0.5 hover:border-emerald-600/40 hover:shadow-lg dark:border-white/10 dark:bg-[#0a0a0a]"
            >
              {post.cover_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="h-40 w-full object-cover"
                />
              ) : (
                <div className="flex h-40 w-full items-center justify-center bg-gradient-to-br from-emerald-500/15 via-sky-500/10 to-violet-500/10 text-4xl">
                  📝
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="mt-2 text-lg font-semibold leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-black/65 dark:text-white/65">
                    {post.excerpt}
                  </p>
                )}
                <p className="mt-auto pt-4 text-xs text-black/45 dark:text-white/45">
                  {formatDate(post.published_at ?? post.updated_at)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
