import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export const metadata = { title: "Subjects" };
export const revalidate = 3600; // ISR: rebuild every hour for fresh counts

const ALL_SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

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

  const bySemester = new Map<number, NonNullable<typeof subjects>>();
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
    required: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    elective: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
    deficiency: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold">Subjects</h1>
      <p className="mt-2 text-black/60 dark:text-white/60">
        The VU BSCS study scheme, semester by semester. Semester 1 is fully
        live — we&apos;re filling it with past papers and MCQs over the coming
        months, and later semesters unlock as our batch moves forward.
      </p>

      {ALL_SEMESTERS.map((semester) => {
        const list = bySemester.get(semester) ?? [];
        const active = list.length > 0;
        return (
          <section key={semester} className="mt-10">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">Semester {semester}</h2>
              {!active && (
                <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-xs text-black/50 dark:bg-white/10 dark:text-white/50">
                  Coming soon
                </span>
              )}
            </div>

            {active ? (
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((subject) => (
                  <Link
                    key={subject.id}
                    href={`/subjects/${subject.code}`}
                    className="rounded-xl border border-black/10 p-4 transition hover:-translate-y-0.5 hover:border-emerald-600 hover:shadow-md dark:border-white/10 dark:hover:border-emerald-500"
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
            ) : (
              <p className="mt-3 rounded-xl border border-dashed border-black/15 p-4 text-sm text-black/40 dark:border-white/15 dark:text-white/40">
                Opens when we reach semester {semester}. Subjects will be added
                from the official VU study scheme as we go.
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}
