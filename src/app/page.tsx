import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function Home() {
  const supabase = await createClient();

  const [{ count: subjectCount }, { count: questionCount }] = await Promise.all([
    supabase.from("subjects").select("*", { count: "exact", head: true }),
    supabase
      .from("questions")
      .select("*", { count: "exact", head: true })
      .eq("status", "approved"),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Past papers. MCQs. Handouts.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-black/70 dark:text-white/70">
          BSCS Vault is a free, student-built library for Virtual University
          BSCS students. Download handouts, practice MCQs, and share the
          questions that actually appeared in your exams.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/subjects"
            className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700"
          >
            Browse Subjects
          </Link>
          <Link
            href="/practice"
            className="rounded-lg border border-black/15 px-6 py-3 font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
          >
            Practice MCQs
          </Link>
        </div>
      </section>

      <section className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          href="/subjects"
          className="rounded-xl border border-black/10 p-6 hover:border-emerald-600 dark:border-white/15 dark:hover:border-emerald-500"
        >
          <div className="text-3xl font-bold">{subjectCount ?? 0}</div>
          <div className="mt-1 text-sm text-black/60 dark:text-white/60">
            Subjects
          </div>
        </Link>
        <Link
          href="/practice"
          className="rounded-xl border border-black/10 p-6 hover:border-emerald-600 dark:border-white/15 dark:hover:border-emerald-500"
        >
          <div className="text-3xl font-bold">{questionCount ?? 0}</div>
          <div className="mt-1 text-sm text-black/60 dark:text-white/60">
            Approved Questions
          </div>
        </Link>
        <div className="rounded-xl border border-black/10 p-6 dark:border-white/15">
          <div className="text-3xl font-bold">100%</div>
          <div className="mt-1 text-sm text-black/60 dark:text-white/60">
            Free, forever
          </div>
        </div>
      </section>
    </div>
  );
}
