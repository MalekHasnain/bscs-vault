import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export const metadata = { title: "Subjects" };

export default async function SubjectsPage() {
  const supabase = await createClient();

  const { data: subjects } = await supabase
    .from("subjects")
    .select("*")
    .order("semester")
    .order("code");

  // Approved question counts per subject
  const { data: counts } = await supabase
    .from("questions")
    .select("subject_id")
    .eq("status", "approved");

  const countMap = new Map<string, number>();
  for (const row of counts ?? []) {
    countMap.set(row.subject_id, (countMap.get(row.subject_id) ?? 0) + 1);
  }

  const bySemester = new Map<number, typeof subjects>();
  for (const s of subjects ?? []) {
    const list = bySemester.get(s.semester) ?? [];
    list.push(s);
    bySemester.set(s.semester, list);
  }

  const typeLabel: Record<string, string> = {
    required: "Required",
    elective: "Elective",
    deficiency: "Deficiency",
  };
  const typeClass: Record<string, string> = {
    required:
      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    elective: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
    deficiency: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold">Subjects</h1>
      <p className="mt-2 text-black/60 dark:text-white/60">
        VU BSCS study scheme, semester by semester. Pick a subject for past
        papers, MCQs and handouts.
      </p>

      {[...bySemester.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([semester, list]) => (
          <section key={semester} className="mt-10">
            <h2 className="text-lg font-semibold">Semester {semester}</h2>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {list!.map((subject) => (
                <Link
                  key={subject.id}
                  href={`/subjects/${subject.code}`}
                  className="rounded-xl border border-black/10 p-4 hover:border-emerald-600 dark:border-white/15 dark:hover:border-emerald-500"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold">
                      {subject.code}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${typeClass[subject.course_type]}`}
                    >
                      {typeLabel[subject.course_type]}
                    </span>
                  </div>
                  <div className="mt-1 text-sm">{subject.title}</div>
                  <div className="mt-2 text-xs text-black/50 dark:text-white/50">
                    {countMap.get(subject.id) ?? 0} questions ·{" "}
                    {subject.credit_hours} credit hours
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

      {(!subjects || subjects.length === 0) && (
        <p className="mt-10 text-black/60 dark:text-white/60">
          No subjects yet — an admin needs to add them (Admin → Add Subject).
        </p>
      )}
    </div>
  );
}
