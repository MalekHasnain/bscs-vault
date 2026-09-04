"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

type Props = {
  username: string;
  avatarUrl: string | null;
  isAdmin: boolean;
  stats: {
    questions: number;
    handouts: number;
    approved: number;
    pending: number;
    rejected: number;
    bySubject: Record<string, number>;
  };
};

export default function DashboardClient({
  username,
  avatarUrl,
  isAdmin,
  stats,
}: Props) {
  const router = useRouter();
  const supabase = createClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be under 2 MB.");
      return;
    }
    if (!["image/png", "image/jpeg", "image/webp", "image/gif"].includes(file.type)) {
      setError("Use PNG, JPG, WEBP or GIF.");
      return;
    }

    setUploading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in");

      const ext = file.name.split(".").pop() ?? "png";
      const path = `${user.id}/avatar.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true });
      if (upErr) throw upErr;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(path);

      const { error: dbErr } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);
      if (dbErr) throw dbErr;

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const initials = username.slice(0, 2).toUpperCase();

  const cards = [
    { label: "Questions submitted", value: stats.questions, accent: "from-emerald-500/15 to-emerald-500/5" },
    { label: "Handouts shared", value: stats.handouts, accent: "from-sky-500/15 to-sky-500/5" },
    { label: "Approved & live", value: stats.approved, accent: "from-violet-500/15 to-violet-500/5" },
    { label: "Awaiting review", value: stats.pending, accent: "from-amber-500/15 to-amber-500/5" },
  ];

  const subjectEntries = Object.entries(stats.bySubject).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Profile header */}
      <div className="flex flex-col items-start gap-5 rounded-2xl border border-black/10 p-6 shadow-sm sm:flex-row sm:items-center dark:border-white/10">
        <button
          onClick={() => fileRef.current?.click()}
          className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-emerald-500/60"
          title="Change profile picture"
        >
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={username}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-500 to-sky-500 text-xl font-bold text-white">
              {initials}
            </span>
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
            {uploading ? "…" : "Change"}
          </span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="hidden"
          onChange={handleAvatarChange}
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold">{username}</h1>
          <p className="text-sm text-black/50 dark:text-white/50">
            {isAdmin ? "Moderator" : "Contributor"} ·{" "}
            {stats.approved > 0
              ? `${stats.approved} of your questions are live 🎉`
              : "Submit your first past-paper question to get started!"}
          </p>
        </div>

        <a
          href="/submit"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          + Submit
        </a>
      </div>

      {error && (
        <p className="mt-3 rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className={`rounded-2xl border border-black/10 bg-gradient-to-br p-5 dark:border-white/10 ${c.accent}`}
          >
            <div className="text-3xl font-bold">{c.value}</div>
            <div className="mt-1 text-xs text-black/60 dark:text-white/60">
              {c.label}
            </div>
          </div>
        ))}
      </div>

      {/* Per-subject breakdown */}
      {subjectEntries.length > 0 && (
        <div className="mt-6 rounded-2xl border border-black/10 p-5 shadow-sm dark:border-white/10">
          <h2 className="text-lg font-semibold">Your contributions by subject</h2>
          <div className="mt-4 space-y-2">
            {subjectEntries.map(([code, count]) => {
              const max = subjectEntries[0][1];
              const pct = (count / max) * 100;
              return (
                <div key={code} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 font-mono text-sm font-semibold">
                    {code}
                  </span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-sm text-black/60 dark:text-white/60">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
          {stats.rejected > 0 && (
            <p className="mt-4 text-xs text-black/50 dark:text-white/50">
              {stats.rejected} submission(s) were rejected by a moderator.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
