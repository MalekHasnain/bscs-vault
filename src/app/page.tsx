import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

const features = [
  {
    title: "Past-Paper Bank",
    desc: "MCQs, short and long questions from real VU exams — submitted by students who sat them.",
    href: "/subjects",
    cta: "Browse subjects",
    icon: "📄",
    gradient: "from-emerald-500/15 to-emerald-500/5",
  },
  {
    title: "MCQ Practice Engine",
    desc: "Pick a subject, answer instant-feedback questions, see your score with a full review at the end.",
    href: "/practice",
    cta: "Start practicing",
    icon: "⚡",
    gradient: "from-sky-500/15 to-sky-500/5",
  },
  {
    title: "GPA & CGPA Tools",
    desc: "VU's official 12-grade scale with linear in-band points, plus a target-CGPA projector.",
    href: "/gpa",
    cta: "Calculate GPA",
    icon: "🎯",
    gradient: "from-violet-500/15 to-violet-500/5",
  },
  {
    title: "Handouts Library",
    desc: "Course handouts shared by students, per subject — contribute what you have, help the next batch.",
    href: "/subjects",
    cta: "Find handouts",
    icon: "📚",
    gradient: "from-amber-500/15 to-amber-500/5",
  },
];

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
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="py-20 text-center sm:py-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {questionCount ?? 0} real past-paper questions and counting
        </div>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Everything you need to survive{" "}
          <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text text-transparent">
            VU BSCS
          </span>
        </h1>
 <p className="mx-auto mt-6 max-w-2xl text-lg text-black/60 dark:text-white/60">
          A free, student-built vault: past papers, MCQ practice, handouts and
          GPA tools — built by a semester-1 student, for every VU BSCS student.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/subjects"
            className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:shadow-xl hover:shadow-emerald-500/30"
          >
            Browse Subjects
          </Link>
          <Link
            href="/practice"
            className="rounded-xl border border-black/15 bg-white/50 px-7 py-3.5 font-semibold backdrop-blur transition hover:bg-white dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10"
          >
            Practice MCQs →
          </Link>
        </div>
      </section>

      {/* Feature cards */}
      <section className="grid grid-cols-1 gap-5 pb-16 sm:grid-cols-2">
        {features.map((f) => (
          <Link
            key={f.title}
            href={f.href}
            className={`group rounded-2xl border border-black/10 bg-gradient-to-br p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 ${f.gradient}`}
          >
            <div className="text-3xl">{f.icon}</div>
            <h2 className="mt-4 text-xl font-bold">{f.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-black/60 dark:text-white/60">
              {f.desc}
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-emerald-700 transition group-hover:underline dark:text-emerald-400">
              {f.cta} →
            </span>
          </Link>
        ))}
      </section>

      {/* Stats strip */}
      <section className="mb-20 grid grid-cols-1 gap-4 rounded-2xl border border-black/10 p-8 text-center dark:border-white/10 sm:grid-cols-3">
        <div>
          <div className="text-4xl font-bold">{subjectCount ?? 0}</div>
          <div className="mt-1 text-sm text-black/50 dark:text-white/50">
            Subjects in the catalog
          </div>
        </div>
        <div>
          <div className="text-4xl font-bold">{questionCount ?? 0}</div>
          <div className="mt-1 text-sm text-black/50 dark:text-white/50">
            Approved past-paper questions
          </div>
        </div>
        <div>
          <div className="text-4xl font-bold">100%</div>
          <div className="mt-1 text-sm text-black/50 dark:text-white/50">
            Free, forever — no ads
          </div>
        </div>
      </section>
    </div>
  );
}
