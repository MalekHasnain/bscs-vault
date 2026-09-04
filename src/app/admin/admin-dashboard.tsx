"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import type { Subject } from "@/lib/database.types";

type Row = {
  id: string;
  question_text?: string;
  title?: string;
  file_url?: string;
  q_type?: string;
  options?: string[] | null;
  correct_option?: number | null;
  answer_text?: string | null;
  paper_type?: string;
  paper_year?: number | null;
  subjects?: { code: string; title: string } | null;
  profiles?: { username: string } | null;
};

export default function AdminDashboard({
  pendingQuestions,
  pendingHandouts,
  subjects,
}: {
  pendingQuestions: Row[];
  pendingHandouts: Row[];
  subjects: Subject[];
}) {
  const router = useRouter();
  const supabase = createClient();

  const [tab, setTab] = useState<"queue" | "add-subject">("queue");
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [semester, setSemester] = useState(1);
  const [courseType, setCourseType] = useState<
    "required" | "elective" | "deficiency"
  >("required");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function moderate(
    table: "questions" | "handouts",
    id: string,
    status: "approved" | "rejected"
  ) {
    const { error } = await supabase.from(table).update({ status }).eq("id", id);
    if (error) setErr(error.message);
    else router.refresh();
  }

  async function deleteRow(table: "questions" | "handouts", id: string) {
    if (!confirm("Delete permanently?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) setErr(error.message);
    else router.refresh();
  }

  async function addSubject(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    const { error } = await supabase.from("subjects").insert({
      code: code.toUpperCase().trim(),
      title: title.trim(),
      semester,
      course_type: courseType,
    });
    if (error) {
      setErr(error.message);
    } else {
      setMsg(`Added ${code.toUpperCase()}.`);
      setCode("");
      setTitle("");
      router.refresh();
    }
  }

  const inputClass =
    "mt-1 w-full rounded-md border border-black/15 bg-transparent px-3 py-2 dark:border-white/20";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">Admin</h1>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setTab("queue")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === "queue"
              ? "bg-emerald-600 text-white"
              : "border border-black/15 dark:border-white/20"
          }`}
        >
          Moderation queue ({pendingQuestions.length + pendingHandouts.length})
        </button>
        <button
          onClick={() => setTab("add-subject")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === "add-subject"
              ? "bg-emerald-600 text-white"
              : "border border-black/15 dark:border-white/20"
          }`}
        >
          Add subject
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

      {tab === "queue" && (
        <>
          <section className="mt-6">
            <h2 className="text-lg font-semibold">Questions</h2>
            {pendingQuestions.length === 0 && (
              <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                Queue is empty. 🎉
              </p>
            )}
            <div className="mt-3 space-y-4">
              {pendingQuestions.map((q) => (
                <div
                  key={q.id}
                  className="rounded-lg border border-black/10 p-4 dark:border-white/15"
                >
                  <div className="flex items-center gap-2 text-xs text-black/50 dark:text-white/50">
                    <span className="font-mono font-semibold">
                      {q.subjects?.code}
                    </span>
                    <span>·</span>
                    <span>{q.q_type}</span>
                    <span>·</span>
                    <span>
                      {q.paper_type} {q.paper_year ?? ""}
                    </span>
                    <span>·</span>
                    <span>by {q.profiles?.username ?? "unknown"}</span>
                  </div>
                  <p className="mt-2 font-medium">{q.question_text}</p>
                  {q.q_type === "mcq" && q.options && (
                    <ul className="mt-2 space-y-1 text-sm">
                      {q.options.map((o, i) => (
                        <li
                          key={i}
                          className={
                            i === q.correct_option
                              ? "font-medium text-emerald-700 dark:text-emerald-400"
                              : ""
                          }
                        >
                          {String.fromCharCode(65 + i)}. {o}
                          {i === q.correct_option ? " ✓" : ""}
                        </li>
                      ))}
                    </ul>
                  )}
                  {q.answer_text && (
                    <p className="mt-2 whitespace-pre-wrap text-sm text-black/70 dark:text-white/70">
                      {q.answer_text}
                    </p>
                  )}
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => moderate("questions", q.id, "approved")}
                      className="rounded-md bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => moderate("questions", q.id, "rejected")}
                      className="rounded-md border border-black/15 px-4 py-1.5 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => deleteRow("questions", q.id)}
                      className="rounded-md border border-red-500/40 px-4 py-1.5 text-sm text-red-600 hover:bg-red-500/10 dark:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-semibold">Handout links</h2>
            {pendingHandouts.length === 0 && (
              <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                Queue is empty. 🎉
              </p>
            )}
            <div className="mt-3 space-y-4">
              {pendingHandouts.map((h) => (
                <div
                  key={h.id}
                  className="rounded-lg border border-black/10 p-4 dark:border-white/15"
                >
                  <div className="flex items-center gap-2 text-xs text-black/50 dark:text-white/50">
                    <span className="font-mono font-semibold">
                      {h.subjects?.code}
                    </span>
                    <span>·</span>
                    <span>by {h.profiles?.username ?? "unknown"}</span>
                  </div>
                  <p className="mt-2 font-medium">{h.title}</p>
                  <a
                    href={h.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block break-all text-sm text-emerald-600 hover:underline dark:text-emerald-400"
                  >
                    {h.file_url}
                  </a>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => moderate("handouts", h.id, "approved")}
                      className="rounded-md bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => moderate("handouts", h.id, "rejected")}
                      className="rounded-md border border-black/15 px-4 py-1.5 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => deleteRow("handouts", h.id)}
                      className="rounded-md border border-red-500/40 px-4 py-1.5 text-sm text-red-600 hover:bg-red-500/10 dark:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {tab === "add-subject" && (
        <form onSubmit={addSubject} className="mt-6 flex max-w-md flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Course code</label>
            <input
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={inputClass}
              placeholder="e.g. CS302"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              placeholder="e.g. Digital Logic Design"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Semester</label>
            <input
              type="number"
              min={1}
              max={8}
              value={semester}
              onChange={(e) => setSemester(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Type</label>
            <select
              value={courseType}
              onChange={(e) =>
                setCourseType(
                  e.target.value as "required" | "elective" | "deficiency"
                )
              }
              className={inputClass}
            >
              <option value="required">Required</option>
              <option value="elective">Elective</option>
              <option value="deficiency">Deficiency</option>
            </select>
          </div>
          <button
            type="submit"
            className="rounded-lg bg-emerald-600 py-2.5 font-medium text-white hover:bg-emerald-700"
          >
            Add subject
          </button>
          <p className="text-xs text-black/50 dark:text-white/50">
            {subjects.length} subjects currently in the catalog.
          </p>
        </form>
      )}
    </div>
  );
}
