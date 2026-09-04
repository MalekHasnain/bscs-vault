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

export default function PracticePage() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const subjectFilter = searchParams.get("subject");

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selected, setSelected] = useState<string>(subjectFilter ?? "");
  const [count, setCount] = useState(10);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  const [session, setSession] = useState<{
    order: Question[];
    index: number;
    picked: (number | null)[];
    finished: boolean;
  } | null>(null);

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
    const picked = shuffle(questions).slice(0, Math.min(count, questions.length));
    if (picked.length === 0) return;
    setSession({ order: picked, index: 0, picked: [], finished: false });
  }

  const current = session?.order[session.index];
  const score = useMemo(() => {
    if (!session) return 0;
    return session.order.reduce((acc, q, i) => {
      const p = session.picked[i];
      return p !== null && p !== undefined && p === q.correct_option
        ? acc + 1
        : acc;
    }, 0);
  }, [session]);

  const choose = useCallback(
    (option: number) => {
      setSession((s) =>
        s
          ? {
              ...s,
              picked: s.picked.map((v, i) =>
                i === s.index && v === null ? option : v
              ),
            }
          : s
      );
    },
    []
  );

  if (session) {
    const total = session.order.length;
    const answered = session.picked[session.index];

    if (session.finished) {
      return (
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <h1 className="text-3xl font-bold">Session complete</h1>
          <p className="mt-4 text-5xl font-bold text-emerald-600 dark:text-emerald-400">
            {score}/{total}
          </p>
          <p className="mt-2 text-black/60 dark:text-white/60">
            {score === total
              ? "Perfect score! 🎯"
              : score >= total * 0.7
                ? "Solid work — review the misses and go again."
                : "Keep practicing — every question here appeared in a real VU paper."}
          </p>
          <div className="mt-8 space-y-3 text-left">
            {session.order.map((q, i) => {
              const p = session.picked[i];
              const ok = p === q.correct_option;
              return (
                <div
                  key={q.id}
                  className={`rounded-lg border p-4 ${
                    ok
                      ? "border-emerald-500/50"
                      : "border-red-500/50"
                  }`}
                >
                  <p className="text-sm font-medium">
                    {i + 1}. {q.question_text}
                  </p>
                  <p className="mt-2 text-xs text-black/60 dark:text-white/60">
                    Correct: {q.options?.[q.correct_option ?? 0]}
                    {!ok && p !== null && p !== undefined && (
                      <> · You picked: {q.options?.[p]}</>
                    )}
                    {p === null && <> · Skipped</>}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={() => setSession(null)}
              className="rounded-lg border border-black/15 px-5 py-2.5 font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
            >
              New session
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="flex items-center justify-between text-sm text-black/60 dark:text-white/60">
          <span>
            Question {session.index + 1} of {total}
          </span>
          <span>Score: {score}</span>
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-black/10 dark:bg-white/10">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all"
            style={{
              width: `${((session.index + 1) / total) * 100}%`,
            }}
          />
        </div>

        <h2 className="mt-8 text-xl font-medium leading-relaxed">
          {current?.question_text}
        </h2>

        <div className="mt-6 flex flex-col gap-3">
          {current?.options?.map((opt, i) => {
            const isPicked = answered === i;
            const reveal = answered !== null && answered !== undefined;
            const isCorrect = i === current.correct_option;
            return (
              <button
                key={i}
                onClick={() => answered === null && choose(i)}
                disabled={answered !== null && answered !== undefined}
                className={`rounded-lg border p-4 text-left transition ${
                  reveal
                    ? isCorrect
                      ? "border-emerald-500 bg-emerald-500/10"
                      : isPicked
                        ? "border-red-500 bg-red-500/10"
                        : "border-black/10 opacity-60 dark:border-white/15"
                    : "border-black/15 hover:border-emerald-600 dark:border-white/20 dark:hover:border-emerald-500"
                }`}
              >
                <span className="mr-2 font-mono text-sm">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
              </button>
            );
          })}
        </div>

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
            className="rounded-lg bg-emerald-600 px-6 py-2.5 font-medium text-white hover:bg-emerald-700 disabled:opacity-40"
          >
            {session.index + 1 >= total ? "Finish" : "Next →"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold">Practice MCQs</h1>
      <p className="mt-2 text-black/60 dark:text-white/60">
        Every question here was submitted by a student from a real VU past
        paper. Pick a subject and go.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium">Subject</label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="mt-1 w-full rounded-md border border-black/15 bg-transparent px-3 py-2 dark:border-white/20"
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
            className="mt-1 w-full rounded-md border border-black/15 bg-transparent px-3 py-2 dark:border-white/20"
          >
            {[5, 10, 20, 30, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={async () => {
            await loadQuestions();
          }}
          disabled={loading}
          className="rounded-lg border border-black/15 px-5 py-2.5 font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
        >
          {loading ? "Loading…" : "Load questions"}
        </button>

        {questions.length > 0 && (
          <div className="rounded-lg border border-black/10 p-4 dark:border-white/15">
            <p className="font-medium">
              {questions.length} MCQs available
              {selected ? ` for ${selected}` : ""}.
            </p>
            <button
              onClick={start}
              className="mt-3 rounded-lg bg-emerald-600 px-6 py-2.5 font-medium text-white hover:bg-emerald-700"
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
