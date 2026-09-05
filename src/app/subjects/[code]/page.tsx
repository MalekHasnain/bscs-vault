import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { VOCAB_BY_CODE } from "@/lib/vocabulary";
import { HANDOUTS_BY_CODE } from "@/lib/handouts";

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
  const curatedHandouts = HANDOUTS_BY_CODE[subject.code] ?? [];

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

      {/* Handouts — official downloads + community links */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Handouts</h2>
        {(curatedHandouts.length === 0 && (handouts ?? []).length === 0) ? (
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
          <>
            {/* Official curated handouts — download boxes */}
            {curatedHandouts.length > 0 && (
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {curatedHandouts.map((h) => (
                  <div
                    key={h.url}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-emerald-600/20 bg-gradient-to-br from-emerald-500/5 to-sky-500/5 p-5 transition hover:border-emerald-600/50 hover:shadow-md dark:border-emerald-500/20"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-2xl">
                        📄
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold leading-snug">
                          {h.title}
                        </h3>
                        {h.description && (
                          <p className="mt-1 text-xs text-black/55 dark:text-white/55">
                            {h.description}
                          </p>
                        )}
                        <p className="mt-1 text-xs font-medium text-black/40 dark:text-white/40">
                          PDF · Official VU handouts
                        </p>
                      </div>
                    </div>
                    <a
                      href={h.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-500/25 transition hover:shadow-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                        aria-hidden
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download PDF
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* Community-submitted handouts */}
            {(handouts ?? []).length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-black/50 dark:text-white/50">
                  Community handouts
                </h3>
                <ul className="mt-2 divide-y divide-black/10 dark:divide-white/10">
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
              </div>
            )}

            <p className="mt-4 text-xs text-black/45 dark:text-white/45">
              Have a handout that&apos;s missing?{" "}
              <Link
                href={`/submit?subject=${subject.code}&type=handout`}
                className="text-emerald-600 hover:underline dark:text-emerald-400"
              >
                Share it with everyone →
              </Link>
            </p>
          </>
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
