import { NEW_STUDENT_FAQS } from "@/lib/faqs";

export const metadata = {
  title: "New Student FAQ",
  description:
    "Answers to the most common questions from students who just joined Virtual University — LMS, lectures, handouts, exams, grading, fees.",
};
export const revalidate = 3600; // ISR

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">New to VU? Start here.</h1>
      <p className="mt-2 text-black/60 dark:text-white/60">
        The 16 questions every new Virtual University student asks in their
        first weeks — answered in plain English, with official sources.
      </p>

      <div className="mt-8 space-y-3">
        {NEW_STUDENT_FAQS.map((f, i) => (
          <details
            key={i}
            className="group rounded-xl border border-black/10 bg-white/50 open:border-emerald-500/40 open:bg-emerald-500/[0.04] dark:border-white/10 dark:bg-white/[0.02]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 font-medium [&::-webkit-details-marker]:hidden">
              <span>
                <span className="mr-2 font-mono text-xs text-emerald-600 dark:text-emerald-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {f.q}
              </span>
              <span className="shrink-0 text-black/30 transition group-open:rotate-180 dark:text-white/30">
                ▾
              </span>
            </summary>
            <div className="px-4 pb-4">
              <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">
                {f.a}
              </p>
              <a
                href={f.source}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs text-sky-600 hover:underline dark:text-sky-400"
              >
                source ↗
              </a>
            </div>
          </details>
        ))}
      </div>

      <div className="mt-10 rounded-xl bg-gradient-to-r from-emerald-500/10 to-sky-500/10 p-5">
        <p className="font-semibold">Still stuck?</p>
        <p className="mt-1 text-sm text-black/70 dark:text-white/70">
          Open a ticket at the{" "}
          <a
            href="https://vu.edu.pk/SupportSystem"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            VU Support System
          </a>{" "}
          or call 111-880-880. And check the{" "}
          <a href="/notices" className="underline">
            key dates page
          </a>{" "}
          so you never miss a deadline.
        </p>
      </div>
    </div>
  );
}
