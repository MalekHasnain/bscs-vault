"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";
import { renderMarkdown, readingTime } from "@/lib/markdown";
import type { Post } from "@/lib/database.types";

type PostRow = Pick<
  Post,
  "id" | "slug" | "title" | "status" | "published_at" | "updated_at" | "tags" | "excerpt"
>;

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const inputClass =
  "mt-1 w-full rounded-md border border-black/15 bg-transparent px-3 py-2 dark:border-white/20";

export default function BlogEditor({ posts }: { posts: PostRow[] }) {
  const router = useRouter();
  const supabase = createClient();

  const [tab, setTab] = useState<"posts" | "editor">("posts");
  const [editingId, setEditingId] = useState<string | null>(null);

  // form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [preview, setPreview] = useState(false);

  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const effectiveSlug = slugEdited ? slug : slugify(title);
  const html = useMemo(() => renderMarkdown(content || "_Nothing to preview yet._"), [content]);

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setSlugEdited(false);
    setExcerpt("");
    setContent("");
    setCoverImage("");
    setTags("");
    setMetaTitle("");
    setMetaDescription("");
    setStatus("draft");
    setPreview(false);
  }

  function loadPost(p: PostRow) {
    // full row needed; posts list has the essentials + content fetched on demand
    supabase
      .from("posts")
      .select("*")
      .eq("id", p.id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setErr(error?.message ?? "Could not load post");
          return;
        }
        const post = data as Post;
        setEditingId(post.id);
        setTitle(post.title);
        setSlug(post.slug);
        setSlugEdited(true);
        setExcerpt(post.excerpt ?? "");
        setContent(post.content);
        setCoverImage(post.cover_image_url ?? "");
        setTags(post.tags.join(", "));
        setMetaTitle(post.meta_title ?? "");
        setMetaDescription(post.meta_description ?? "");
        setStatus(post.status);
        setPreview(false);
        setTab("editor");
      });
  }

  async function save(publish?: boolean) {
    setErr(null);
    setMsg(null);
    if (!title.trim() || !content.trim()) {
      setErr("Title and content are required.");
      return;
    }
    const finalStatus = publish ? "published" : status;
    const finalSlug = (slugEdited ? slug : slugify(title)) || slugify(title);
    if (!finalSlug) {
      setErr("Slug is empty — add a title first.");
      return;
    }

    setSaving(true);
    const payload = {
      slug: finalSlug,
      title: title.trim(),
      excerpt: excerpt.trim() || null,
      content,
      cover_image_url: coverImage.trim() || null,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      meta_title: metaTitle.trim() || null,
      meta_description: metaDescription.trim() || null,
      status: finalStatus,
      ...(finalStatus === "published" && !editingId
        ? { published_at: new Date().toISOString() }
        : {}),
    };

    const { error } = editingId
      ? await supabase.from("posts").update(payload).eq("id", editingId)
      : await supabase.from("posts").insert(payload);

    setSaving(false);
    if (error) {
      setErr(error.message);
      return;
    }
    setMsg(
      `${editingId ? "Updated" : "Created"} “${title.trim()}” (${finalStatus}).${
        finalStatus === "published" ? " Live on /blog within a minute." : ""
      }`
    );
    if (!editingId) resetForm();
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this post permanently?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) setErr(error.message);
    else {
      if (editingId === id) resetForm();
      router.refresh();
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Blog Admin</h1>
        <Link
          href="/admin"
          className="text-sm text-emerald-600 hover:underline dark:text-emerald-400"
        >
          ← Main admin
        </Link>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setTab("posts")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === "posts"
              ? "bg-emerald-600 text-white"
              : "border border-black/15 dark:border-white/20"
          }`}
        >
          All posts ({posts.length})
        </button>
        <button
          onClick={() => {
            if (tab !== "editor") resetForm();
            setTab("editor");
          }}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === "editor"
              ? "bg-emerald-600 text-white"
              : "border border-black/15 dark:border-white/20"
          }`}
        >
          ✍️ New post
        </button>
      </div>

      {err && (
        <p className="mt-4 rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
          {err}
        </p>
      )}
      {msg && (
        <p className="mt-4 rounded-md bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400">
          {msg}
        </p>
      )}

      {/* ---------- POSTS LIST ---------- */}
      {tab === "posts" && (
        <div className="mt-6 space-y-3">
          {posts.length === 0 && (
            <p className="text-sm text-black/60 dark:text-white/60">
              No posts yet — write your first one.
            </p>
          )}
          {posts.map((p) => (
            <div
              key={p.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-black/10 p-4 dark:border-white/15"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      p.status === "published"
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                        : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                    }`}
                  >
                    {p.status}
                  </span>
                  <span className="truncate font-medium">{p.title}</span>
                </div>
                <p className="mt-1 text-xs text-black/50 dark:text-white/50">
                  /blog/{p.slug} · updated{" "}
                  {new Date(p.updated_at).toLocaleDateString("en-GB")}
                </p>
              </div>
              <div className="flex gap-2">
                {p.status === "published" && (
                  <a
                    href={`/blog/${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-black/15 px-3 py-1.5 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
                  >
                    View
                  </a>
                )}
                <button
                  onClick={() => loadPost(p)}
                  className="rounded-md bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(p.id)}
                  className="rounded-md border border-red-500/40 px-3 py-1.5 text-sm text-red-600 hover:bg-red-500/10 dark:text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------- EDITOR ---------- */}
      {tab === "editor" && (
        <div className="mt-6 space-y-6">
          {/* Main fields */}
          <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <div>
                <label className="text-sm font-medium">Title *</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClass}
                  placeholder="How to Pass CS201 at VU — A Student's Guide"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                  className={inputClass}
                  placeholder="Short summary shown on cards and search results (~150 chars)"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Content (Markdown) *{" "}
                    <span className="font-normal text-black/40 dark:text-white/40">
                      · {readingTime(content || " ")} min read
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setPreview((p) => !p)}
                    className="text-sm text-emerald-600 hover:underline dark:text-emerald-400"
                  >
                    {preview ? "✏️ Edit" : "👁 Preview"}
                  </button>
                </div>
                {preview ? (
                  <div
                    className="blog-content mt-1 min-h-[16rem] rounded-md border border-black/15 p-4 dark:border-white/20"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                ) : (
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={14}
                    className={`${inputClass} font-mono text-sm`}
                    placeholder={"## Introduction\n\nWrite your guide here…"}
                  />
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="rounded-xl border border-black/10 p-4 dark:border-white/15">
                <h3 className="text-sm font-semibold">Publish</h3>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                  className={inputClass}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => save(false)}
                    disabled={saving}
                    className="flex-1 rounded-lg border border-black/15 py-2 text-sm font-medium hover:bg-black/5 disabled:opacity-50 dark:border-white/20 dark:hover:bg-white/10"
                  >
                    {saving ? "Saving…" : "Save"}
                  </button>
                  <button
                    onClick={() => save(true)}
                    disabled={saving}
                    className="flex-1 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 py-2 text-sm font-semibold text-white disabled:opacity-50"
                  >
                    Publish →
                  </button>
                </div>
                {editingId && (
                  <button
                    onClick={resetForm}
                    className="mt-2 w-full text-xs text-black/50 hover:underline dark:text-white/50"
                  >
                    Clear form (start new post)
                  </button>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">URL slug</label>
                <input
                  value={effectiveSlug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setSlugEdited(true);
                  }}
                  className={`${inputClass} font-mono text-sm`}
                  placeholder="auto-generated-from-title"
                />
                <p className="mt-1 text-xs text-black/45 dark:text-white/45">
                  /blog/{effectiveSlug || "…"}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">Tags (comma-separated)</label>
                <input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className={inputClass}
                  placeholder="CS201, programming, exam tips"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Cover image URL</label>
                <input
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className={inputClass}
                  placeholder="https://… (optional — auto OG image otherwise)"
                />
              </div>

              <details className="rounded-xl border border-black/10 p-4 dark:border-white/15">
                <summary className="cursor-pointer text-sm font-semibold">
                  🔍 SEO overrides
                </summary>
                <div className="mt-3 space-y-3">
                  <div>
                    <label className="text-sm font-medium">Meta title</label>
                    <input
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      className={inputClass}
                      placeholder={title || "Defaults to post title"}
                    />
                    <p className="mt-1 text-xs text-black/45 dark:text-white/45">
                      {(metaTitle || title).length}/60 characters
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Meta description</label>
                    <textarea
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      rows={3}
                      className={inputClass}
                      placeholder={excerpt || "Defaults to excerpt"}
                    />
                    <p className="mt-1 text-xs text-black/45 dark:text-white/45">
                      {(metaDescription || excerpt).length}/160 characters
                    </p>
                  </div>
                </div>
              </details>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
