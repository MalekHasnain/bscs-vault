"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import type { Question, Subject } from "@/lib/database.types";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Session = {
  order: Question[];
  index: number;
  // one entry per question: null = unanswered, 0-3 = chosen option
  picked: (number | null)[];
  finished: boolean;
};

export default function PracticePage() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const subjectFilter = searchParams.get("subject");

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selected, setSelected] = useState<string>(subjectFilter ?? "");
  const [count, setCount] = useState(10);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase
      .from("subjects")
      .select("*")
      .order("semester")
      .order("code")
      .then(({ data }) => setSubjects((data as Subject[]) ?? []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadQuestions() {
    setLoading(true);
    let query = supabase
      .from("questions")
      .select("*")
      .eq("status", "approved")
      .eq("q_type", "mcq");
    if (selected) {
      const { data: subj } = await supabase
        .from("subjects")
        .select("id")
        .eq("code", selected)
        .maybeSingle();
      if (subj) query = query.eq("subject_id", subj.id);
    }
    const { data } = await query.limit(200);
    setQuestions((data as Question[]) ?? []);
    setLoading(false);
  }

  function start() {
    const pool = shuffle(questions).slice(0, Math.min(count, questions.length));
    if (pool.length === 0) return;
    setSession({
      order: pool,
      index: 0,
      picked: Array(pool.length).fill(null),
      finished: false,
    });
  }

  const score = useMemo(() => {
    if (!session) return 0;
    return session.order.reduce(
      (acc, q, i) =>
        session.picked[i] !== null && session.picked[i] === q.correct_option
          ? acc + 1
          : acc,
      0
    );
  }, [session]);

  const current = session?.order[session.index];
  const answered = session ? session.picked[session.index] : undefined;
  const isCorrect =
    answered !== null &&
    answered !== undefined &&
    answered === current?.correct_option;

  const choose = useCallback((option: number) => {
    setSession((s) => {
      if (!s || s.picked[s.index] !== null) return s; // locked after checking
      return {
        ...s,
        picked: s.picked.map((v, i) => (i === s.index ? option : v)),
      };
    });
  }, []);

  /* ---------- Finished: results screen ---------- */
  if (session?.finished) {
    const total = session.order.length;
    const pct = total ? Math.round((score / total) * 100) : 0;
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <div className="rounded-2xl border border-black/10 p-8 text-center dark:border-white/10">
          <h1 className="text-2xl font-bold">Session complete</h1>
          {pct === 100 && <p className="mt-1 text-3xl">🏆</p>}
          <p className="mt-4 text-6xl font-bold text-emerald-600 dark:text-emerald-400">
            {score}/{total}
          </p>
          <p className="mt-1 text-sm text-black/50 dark:text-white/50">
            {pct}% correct
          </p>
          <p className="mt-3 text-black/70 dark:text-white/70">
            {pct === 100
              ? "Perfect score! 🎯"
              : pct >= 70
                ? "Solid work — review the misses and go again."
                : "Keep practicing — repetition is how VU papers get cracked."}
          </p>
          <button
            onClick={() => setSession(null)}
            className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            New session
          </button>
        </div>

        <div className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold">Review all questions</h2>
          {session.order.map((q, i) => {
            const p = session.picked[i];
            const ok = p !== null && p === q.correct_option;
            return (
              <div
                key={q.id}
                className={`rounded-xl border p-4 ${
                  ok
                    ? "border-emerald-500/50 bg-emerald-500/5"
                    : "border-red-500/50 bg-red-500/5"
                }`}
              >
                <p className="text-sm font-medium">
                  {i + 1}. {q.question_text}
                </p>
                <p className="mt-2 text-xs text-black/60 dark:text-white/60">
                  Correct answer:{" "}
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    {String.fromCharCode(65 + (q.correct_option ?? 0))}.{" "}
                    {q.options?.[q.correct_option ?? 0]}
                  </span>
                  {p !== null && !ok && (
                    <>
                      {" "}
                      · You picked:{" "}
                      {String.fromCharCode(65 + p)}. {q.options?.[p]}
                    </>
                  )}
                  {p === null && <> · Skipped</>}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ---------- Active question ---------- */
  if (session && current) {
    const total = session.order.length;
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="flex items-center justify-between text-sm text-black/60 dark:text-white/60">
          <span>
            Question {session.index + 1} of {total}
          </span>
          <span>
            Score: <strong>{score}</strong>
          </span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-black/10 dark:bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all"
            style={{ width: `${((session.index + 1) / total) * 100}%` }}
          />
        </div>

        <h2 className="mt-8 text-xl font-medium leading-relaxed">
          {current.question_text}
        </h2>

        <div className="mt-6 flex flex-col gap-3">
          {current.options?.map((opt, i) => {
            const pickedThis = answered === i;
            const revealed = answered !== null && answered !== undefined;
            const isRight = i === current.correct_option;
            let cls =
              "rounded-xl border p-4 text-left transition border-black/15 hover:border-emerald-500 dark:border-white/20";
            if (revealed) {
              if (isRight)
                cls =
                  "rounded-xl border-2 border-emerald-500 bg-emerald-500/10 p-4 text-left";
              else if (pickedThis)
                cls =
                  "rounded-xl border-2 border-red-500 bg-red-500/10 p-4 text-left";
              else
                cls =
                  "rounded-xl border border-black/10 p-4 text-left opacity-50 dark:border-white/10";
            }
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={revealed}
                className={cls}
              >
                <span className="mr-2 font-mono text-sm font-bold">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
                {revealed && isRight && (
                  <span className="ml-2 font-bold text-emerald-600 dark:text-emerald-400">
                    ✓
                  </span>
                )}
                {revealed && pickedThis && !isRight && (
                  <span className="ml-2 font-bold text-red-500">✕</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback after checking */}
        {answered !== null && answered !== undefined && (
          <div
            className={`mt-5 rounded-xl p-4 ${
              isCorrect
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "bg-red-500/10 text-red-600 dark:text-red-400"
            }`}
          >
            {isCorrect ? (
              <p className="font-semibold">✅ Correct! Great job.</p>
            ) : (
              <p className="font-semibold">
                ❌ Not quite. The correct answer is{" "}
                <span className="underline">
                  {String.fromCharCode(65 + (current.correct_option ?? 0))}.{" "}
                  {current.options?.[current.correct_option ?? 0]}
                </span>
              </p>
            )}
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button
            onClick={() =>
              setSession((s) => {
                if (!s) return s;
                if (s.index + 1 >= s.order.length)
                  return { ...s, finished: true };
                return { ...s, index: s.index + 1 };
              })
            }
            disabled={answered === null || answered === undefined}
            className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-7 py-3 font-semibold text-white shadow-md shadow-emerald-500/25 transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
          >
            {session.index + 1 >= total ? "Finish →" : "Next →"}
          </button>
        </div>
        {answered === null && (
          <p className="mt-3 text-center text-xs text-black/40 dark:text-white/40">
            Pick an option to enable Next — you&apos;ll see the correct answer
            after checking.
          </p>
        )}
      </div>
    );
  }

  /* ---------- Setup screen ---------- */
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold">Practice MCQs</h1>
      <p className="mt-2 text-black/60 dark:text-white/60">
        Every question here was submitted from a real VU past paper. Pick a
        subject, choose how many, and go.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium">Subject</label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/15 bg-transparent px-3 py-2.5 dark:border-white/20"
          >
            <option value="">All subjects</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.code}>
                {s.code} — {s.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Number of questions</label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-black/15 bg-transparent px-3 py-2.5 dark:border-white/20"
          >
            {[5, 10, 15, 20, 30, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={loadQuestions}
          disabled={loading}
          className="rounded-xl border border-black/15 px-5 py-2.5 font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
        >
          {loading ? "Loading…" : "Load questions"}
        </button>

        {questions.length > 0 && (
          <div className="rounded-xl border border-black/10 p-4 dark:border-white/10">
            <p className="font-medium">
              {questions.length} MCQs available
              {selected ? ` for ${selected}` : " across all subjects"}.
            </p>
            <button
              onClick={start}
              className="mt-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 font-semibold text-white shadow-md shadow-emerald-500/25 hover:shadow-lg"
            >
              Start practice
            </button>
          </div>
        )}
        {questions.length === 0 && !loading && selected !== "" && (
          <p className="text-sm text-black/60 dark:text-white/60">
            No MCQs for this subject yet.{" "}
            <a
              href={`/submit?subject=${selected}&type=mcq`}
              className="text-emerald-600 hover:underline dark:text-emerald-400"
            >
              Add the first one →
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
