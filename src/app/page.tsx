import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { FALL_2026_NOTICES } from "@/lib/notices";
import { NEW_STUDENT_FAQS } from "@/lib/faqs";
import { TOTAL_VOCAB_TERMS } from "@/lib/vocabulary";

export const revalidate = 3600; // ISR: keep stats and teasers fresh

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
    desc: "Contribute and browse course handouts per subject. This section is being built — help us grow it.",
    href: "/subjects",
    cta: "Browse & contribute",
    icon: "📚",
    gradient: "from-amber-500/15 to-amber-500/5",
  },
  {
    title: "Vocabulary Flashcards",
    desc: `${TOTAL_VOCAB_TERMS} key terms with exam-ready definitions for every semester-1 subject — search the list or drill flip-cards.`,
    href: "/vocabulary",
    cta: "Learn the terms",
    icon: "🧠",
    gradient: "from-rose-500/15 to-rose-500/5",
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
      <section className="py-16 text-center sm:py-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {questionCount ?? 0} real past-paper questions and counting
        </div>
        <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-bold tracking-[-1.5px] sm:text-7xl">
          Everything you need to{" "}
          <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text text-transparent">
            survive VU BSCS
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-black/60 dark:text-white/60">
          A free student-built vault with real past papers, MCQ practice,
          vocabulary flashcards, GPA tools and handouts — made by a
          semester-1 student for everyone.
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

      {/* Feature cards — more distinct and eye-catching */}
      <section className="grid grid-cols-1 gap-4 pb-14 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, index) => (
          <Link
            key={f.title}
            href={f.href}
            className={`group relative overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 ${f.gradient} ${
              index === features.length - 1 && features.length % 2 === 1
                ? "sm:col-span-2 lg:col-span-2"
                : ""
            }`}
          >
            <div className="text-4xl mb-4 transition-transform group-hover:scale-110">{f.icon}</div>
            <h3 className="text-lg font-semibold leading-tight">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-black/65 dark:text-white/65 line-clamp-3">
              {f.desc}
            </p>
            <div className="mt-5 flex items-center text-sm font-medium text-emerald-700 group-hover:text-emerald-600 dark:text-emerald-400">
              {f.cta} 
              <span className="ml-1.5 transition-transform group-hover:translate-x-0.5">→</span>
            </div>
          </Link>
        ))}
      </section>

      {/* Notices preview — next upcoming key dates */}
      <section className="mb-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Key dates · Fall 2026</h2>
            <p className="mt-1 text-sm text-black/50 dark:text-white/50">
              Deadlines every VU student should know.
            </p>
          </div>
          <Link
            href="/notices"
            className="shrink-0 text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
          >
            All dates →
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {(() => {
            const today = new Date().toISOString().slice(0, 10);
            const upcoming = FALL_2026_NOTICES.filter((n) => n.date >= today).slice(0, 3);
            return upcoming.map((n) => (
              <Link
                key={n.title}
                href="/notices"
                className="rounded-2xl border border-black/10 p-5 transition hover:-translate-y-0.5 hover:border-emerald-500/50 hover:shadow-md dark:border-white/10"
              >
                <div className="flex items-center gap-2">
                  <time className="font-mono text-sm font-bold text-emerald-700 dark:text-emerald-400">
                    {new Date(n.date + "T00:00:00").toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </time>
                  {!n.confirmed && (
                    <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:text-amber-400">
                      Expected
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm font-semibold leading-snug">
                  {n.title}
                </p>
              </Link>
            ));
          })()}
        </div>
      </section>

      {/* FAQ preview */}
      <section className="mb-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">New to VU?</h2>
            <p className="mt-1 text-sm text-black/50 dark:text-white/50">
              The questions every fresher asks — answered in plain English.
            </p>
          </div>
          <Link
            href="/faq"
            className="shrink-0 text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
          >
            All 16 FAQs →
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[NEW_STUDENT_FAQS[5], NEW_STUDENT_FAQS[8], NEW_STUDENT_FAQS[9], NEW_STUDENT_FAQS[10]].map(
            (f) => (
              <Link
                key={f.q}
                href="/faq"
                className="group rounded-2xl border border-black/10 p-5 transition hover:-translate-y-0.5 hover:border-sky-500/50 hover:shadow-md dark:border-white/10"
              >
                <p className="font-semibold leading-snug group-hover:text-sky-700 dark:group-hover:text-sky-400">
                  {f.q}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-black/55 dark:text-white/55">
                  {f.a}
                </p>
              </Link>
            )
          )}
        </div>
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
