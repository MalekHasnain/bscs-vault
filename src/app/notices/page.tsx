import { FALL_2026_NOTICES } from "@/lib/notices";

export const metadata = {
  title: "Notices & Key Dates",
  description:
    "Fall 2026 key dates for VU BSCS students — admissions, course selection, exams.",
};
export const revalidate = 3600; // ISR for date freshness

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function NoticesPage() {
  const today = new Date().toISOString().slice(0, 10);
  const sorted = [...FALL_2026_NOTICES].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">Notices &amp; Key Dates</h1>
      <p className="mt-2 text-black/60 dark:text-white/60">
        Important Fall 2026 dates every VU BSCS student should know. Confirmed
        dates come from VU&apos;s official admission schedule; items marked
        &quot;expected&quot; are projections from the Fall 2025 pattern until VU
        publishes the official Fall 2026 calendar.
      </p>

      <ol className="relative mt-10 space-y-6 border-l-2 border-emerald-500/30 pl-6">
        {sorted.map((n) => {
          const past = n.date < today;
          const upcoming = !past;
          return (
            <li key={n.title} className="relative">
              <span
                className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ring-4 ring-white dark:ring-[#0a0a0a] ${
                  past
                    ? "bg-black/25 dark:bg-white/25"
                    : "bg-emerald-500 shadow-md shadow-emerald-500/40"
                }`}
              />
              <div className="flex flex-wrap items-center gap-2">
                <time className="font-mono text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  {formatDate(n.date)}
                </time>
                {n.confirmed ? (
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                    Official
                  </span>
                ) : (
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:text-amber-400">
                    Expected — to be confirmed
                  </span>
                )}
                {past && (
                  <span className="rounded-full bg-black/5 px-2 py-0.5 text-[11px] text-black/40 dark:bg-white/10 dark:text-white/40">
                    Passed
                  </span>
                )}
              </div>
              <h2
                className={`mt-1 font-semibold ${past ? "text-black/50 dark:text-white/50" : ""}`}
              >
                {n.title}
              </h2>
              <p
                className={`mt-1 text-sm leading-relaxed ${
                  past
                    ? "text-black/40 dark:text-white/40"
                    : "text-black/60 dark:text-white/60"
                }`}
              >
                {n.detail}
              </p>
              <a
                href={n.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-xs text-sky-600 hover:underline dark:text-sky-400"
              >
                source ↗
              </a>
            </li>
          );
        })}
      </ol>

      <p className="mt-10 rounded-xl bg-amber-500/10 p-4 text-xs leading-relaxed text-amber-800 dark:text-amber-300">
        ⚠️ VU can change any published date. Always confirm on{" "}
        <a
          href="https://www.vu.edu.pk/StudentServices/AcademicCalendar"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          VU&apos;s official academic calendar
        </a>{" "}
        and your LMS notice board. This timeline is a study aid, not an official
        VU publication — BSCS Vault is not affiliated with Virtual University.
      </p>
    </div>
  );
}
