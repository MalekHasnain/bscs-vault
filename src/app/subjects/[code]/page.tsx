import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { VOCAB_BY_CODE } from "@/lib/vocabulary";

type Params = { code: string };

export default async function SubjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { code } = await params;
  const supabase = await createClient();

  const { data: subject } = await supabase
    .from("subjects")
    .select("*")
    .eq("code", code)
    .maybeSingle();

  if (!subject) notFound();

  const [{ data: questions }, { data: handouts }] = await Promise.all([
    supabase
      .from("questions")
      .select("*")
      .eq("subject_id", subject.id)
      .eq("status", "approved")
      .order("created_at", { ascending: false }),
    supabase
      .from("handouts")
      .select("*")
      .eq("subject_id", subject.id)
      .eq("status", "approved")
      .order("created_at", { ascending: false }),
  ]);

  const mcqs = (questions ?? []).filter((q) => q.q_type === "mcq");
  const shorts = (questions ?? []).filter((q) => q.q_type === "short");
  const longs = (questions ?? []).filter((q) => q.q_type === "long");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link
        href="/subjects"
        className="text-sm text-emerald-600 hover:underline dark:text-emerald-400"
      >
        ← All subjects
      </Link>
      <h1 className="mt-2 text-3xl font-bold">
        <span className="font-mono">{subject.code}</span> — {subject.title}
      </h1>
      <p className="mt-1 text-sm text-black/60 dark:text-white/60">
        Semester {subject.semester} · {subject.credit_hours} credit hours ·{" "}
        {subject.course_type}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {mcqs.length > 0 && (
          <Link
            href={`/practice?subject=${subject.code}`}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Practice {mcqs.length} MCQs
          </Link>
        )}
        <Link
          href={`/submit?subject=${subject.code}&type=mcq`}
          className="rounded-lg border border-black/15 px-4 py-2 text-sm font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
        >
          + Add a past-paper question
        </Link>
        {VOCAB_BY_CODE[subject.code] && (
          <Link
            href={`/vocabulary?subject=${subject.code}`}
            className="rounded-lg border border-emerald-600/40 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-500/10 dark:text-emerald-400"
          >
            🧠 {VOCAB_BY_CODE[subject.code].terms.length} vocabulary terms
          </Link>
        )}
      </div>

      {/* Handouts */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Handouts</h2>
        {(handouts ?? []).length === 0 ? (
          <p className="mt-2 text-sm text-black/60 dark:text-white/60">
            No handouts yet.{" "}
            <Link
              href={`/submit?subject=${subject.code}&type=handout`}
              className="text-emerald-600 hover:underline dark:text-emerald-400"
            >
              Be the first to share one →
            </Link>
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-black/10 dark:divide-white/10">
            {(handouts ?? []).map((h) => (
              <li key={h.id} className="py-3">
                <a
                  href={h.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
                >
                  {h.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Short questions */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">
          Short Questions{" "}
          <span className="text-sm font-normal text-black/50 dark:text-white/50">
            ({shorts.length})
          </span>
        </h2>
        {shorts.length === 0 ? (
          <p className="mt-2 text-sm text-black/60 dark:text-white/60">
            None yet — add the ones you remember from your papers.
          </p>
        ) : (
          <ul className="mt-3 space-y-4">
            {shorts.map((q) => (
              <li
                key={q.id}
                className="rounded-lg border border-black/10 p-4 dark:border-white/15"
              >
                <p className="font-medium">{q.question_text}</p>
                <p className="mt-1 text-xs text-black/50 dark:text-white/50">
                  {q.paper_type}
                  {q.paper_year ? ` ${q.paper_year}` : ""}
                </p>
                {q.answer_text && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-emerald-600 dark:text-emerald-400">
                      Show answer
                    </summary>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-black/80 dark:text-white/80">
                      {q.answer_text}
                    </p>
                  </details>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Long questions */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">
          Long Questions{" "}
          <span className="text-sm font-normal text-black/50 dark:text-white/50">
            ({longs.length})
          </span>
        </h2>
        {longs.length === 0 ? (
          <p className="mt-2 text-sm text-black/60 dark:text-white/60">
            None yet.
          </p>
        ) : (
          <ul className="mt-3 space-y-4">
            {longs.map((q) => (
              <li
                key={q.id}
                className="rounded-lg border border-black/10 p-4 dark:border-white/15"
              >
                <p className="font-medium">{q.question_text}</p>
                <p className="mt-1 text-xs text-black/50 dark:text-white/50">
                  {q.paper_type}
                  {q.paper_year ? ` ${q.paper_year}` : ""}
                </p>
                {q.answer_text && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-emerald-600 dark:text-emerald-400">
                      Show answer
                    </summary>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-black/80 dark:text-white/80">
                      {q.answer_text}
                    </p>
                  </details>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
