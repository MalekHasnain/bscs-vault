"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import type { Subject } from "@/lib/database.types";

type Tab = "mcq" | "short" | "long" | "handout";

export default function SubmitPage() {
  const supabase = createClient();
  const searchParams = useSearchParams();

  const initialType = (searchParams.get("type") as Tab) || "mcq";
  const [tab, setTab] = useState<Tab>(
    ["mcq", "short", "long", "handout"].includes(initialType)
      ? initialType
      : "mcq"
  );
  const [subjectCode, setSubjectCode] = useState(
    searchParams.get("subject") ?? ""
  );
  const [subjects, setSubjects] = useState<Subject[]>([]);

  // shared fields
  const [questionText, setQuestionText] = useState("");
  const [paperType, setPaperType] = useState("midterm");
  const [paperYear, setPaperYear] = useState<string>("");

  // mcq fields
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState<number>(0);

  // short/long fields
  const [answerText, setAnswerText] = useState("");

  // handout fields
  const [title, setTitle] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from("subjects")
      .select("*")
      .order("semester")
      .order("code")
      .then(({ data }) => setSubjects((data as Subject[]) ?? []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setSaving(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Please log in first.");

      const { data: subject } = await supabase
        .from("subjects")
        .select("id")
        .eq("code", subjectCode)
        .maybeSingle();
      if (!subject) throw new Error("Pick a subject.");

      let insertError: Error | null = null;

      if (tab === "handout") {
        const res = await supabase.from("handouts").insert({
          subject_id: subject.id,
          title,
          file_url: fileUrl,
          uploaded_by: user.id,
          status: "pending",
        });
        insertError = res.error;
      } else {
        const base = {
          subject_id: subject.id,
          question_text: questionText,
          paper_type: paperType as "midterm" | "final" | "quiz" | "other",
          paper_year: paperYear ? Number(paperYear) : null,
          created_by: user.id,
          status: "pending" as const,
        };
        const res =
          tab === "mcq"
            ? await supabase.from("questions").insert({
                ...base,
                q_type: "mcq" as const,
                options,
                correct_option: correct,
              })
            : await supabase.from("questions").insert({
                ...base,
                q_type: tab,
                answer_text: answerText,
              });
        insertError = res.error;
      }

      if (insertError) throw insertError;

      setMessage(
        "Submitted for review — a moderator will approve it shortly. Thank you! 🎉"
      );
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setAnswerText("");
      setTitle("");
      setFileUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "mt-1 w-full rounded-md border border-black/15 bg-transparent px-3 py-2 dark:border-white/20";

  const tabs: { id: Tab; label: string }[] = [
    { id: "mcq", label: "MCQ" },
    { id: "short", label: "Short Question" },
    { id: "long", label: "Long Question" },
    { id: "handout", label: "Handout Link" },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold">Submit to the Vault</h1>
      <p className="mt-2 text-black/60 dark:text-white/60">
        Share what appeared in your exams — midterm, final, quiz or GDB. Every
        approved submission helps the next batch of students.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              tab === t.id
                ? "bg-emerald-600 text-white"
                : "border border-black/15 hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium">Subject</label>
          <select
            required
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            className={inputClass}
          >
            <option value="">Choose a subject…</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.code}>
                {s.code} — {s.title}
              </option>
            ))}
          </select>
        </div>

        {tab !== "handout" && (
          <>
            <div>
              <label className="text-sm font-medium">
                Question (exactly as it appeared in the paper)
              </label>
              <textarea
                required
                rows={tab === "mcq" ? 2 : 3}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Paper type</label>
                <select
                  value={paperType}
                  onChange={(e) => setPaperType(e.target.value)}
                  className={inputClass}
                >
                  <option value="midterm">Midterm</option>
                  <option value="final">Final term</option>
                  <option value="quiz">Quiz</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Year (optional)</label>
                <input
                  type="number"
                  min={2000}
                  max={2100}
                  value={paperYear}
                  onChange={(e) => setPaperYear(e.target.value)}
                  className={inputClass}
                  placeholder="e.g. 2025"
                />
              </div>
            </div>
          </>
        )}

        {tab === "mcq" && (
          <div>
            <label className="text-sm font-medium">Options</label>
            {options.map((opt, i) => (
              <div key={i} className="mt-2 flex items-center gap-2">
                <input
                  type="radio"
                  name="correct"
                  checked={correct === i}
                  onChange={() => setCorrect(i)}
                  title="Mark as the correct answer"
                />
                <input
                  required
                  value={opt}
                  onChange={(e) =>
                    setOptions(options.map((o, j) => (j === i ? e.target.value : o)))
                  }
                  placeholder={`Option ${String.fromCharCode(65 + i)}`}
                  className="w-full rounded-md border border-black/15 bg-transparent px-3 py-2 dark:border-white/20"
                />
              </div>
            ))}
            <p className="mt-2 text-xs text-black/50 dark:text-white/50">
              Select the radio button next to the correct option.
            </p>
          </div>
        )}

        {(tab === "short" || tab === "long") && (
          <div>
            <label className="text-sm font-medium">
              Answer (optional — your solution or the one from your notes)
            </label>
            <textarea
              rows={tab === "short" ? 3 : 6}
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              className={inputClass}
            />
          </div>
        )}

        {tab === "handout" && (
          <>
            <div>
              <label className="text-sm font-medium">Title</label>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
                placeholder="e.g. CS101 Handouts — Complete PDF"
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Link to the PDF (Google Drive or any public link)
              </label>
              <input
                required
                type="url"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                className={inputClass}
                placeholder="https://drive.google.com/…"
              />
            </div>
          </>
        )}

        {error && (
          <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        {message && (
          <p className="rounded-md bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-emerald-600 py-2.5 font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {saving ? "Submitting…" : "Submit for review"}
        </button>
      </form>
    </div>
  );
}
