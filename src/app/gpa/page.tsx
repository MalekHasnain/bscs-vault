"use client";

import { useMemo, useState } from "react";
import {
  VU_GRADE_BANDS,
  computeCGPA,
  computeGPA,
  marksToGradePoint,
  marksToLetter,
  projectRequiredGPA,
} from "@/lib/vu-grading";

type Course = { id: number; name: string; credits: number; marks: number; total: number };

let nextId = 4;

export default function GPACalculatorPage() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "CS101", credits: 3, marks: 78, total: 100 },
    { id: 2, name: "CS201", credits: 3, marks: 65, total: 100 },
    { id: 3, name: "ENG101", credits: 3, marks: 82, total: 100 },
  ]);

  // CGPA projector inputs
  const [currentCGPA, setCurrentCGPA] = useState("2.90");
  const [completedCredits, setCompletedCredits] = useState("18");
  const [targetCGPA, setTargetCGPA] = useState("3.20");
  const [nextCredits, setNextCredits] = useState("18");

  function update(id: number, patch: Partial<Course>) {
    setCourses((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  const result = useMemo(
    () =>
      computeGPA(
        courses.map((c) => ({
          creditHours: c.credits,
          percentage: c.total > 0 ? (c.marks / c.total) * 100 : 0,
        }))
      ),
    [courses]
  );

  const perCourse = useMemo(
    () =>
      courses.map((c) => {
        const pct = c.total > 0 ? (c.marks / c.total) * 100 : 0;
        return { ...c, pct, gp: marksToGradePoint(pct), letter: marksToLetter(pct) };
      }),
    [courses]
  );

  const projection = useMemo(() => {
    const cur = parseFloat(currentCGPA);
    const done = parseFloat(completedCredits);
    const target = parseFloat(targetCGPA);
    const next = parseFloat(nextCredits);
    if ([cur, done, target, next].some(isNaN) || next <= 0) return null;
    return projectRequiredGPA(cur, done, target, next);
  }, [currentCGPA, completedCredits, targetCGPA, nextCredits]);

  const inputCls =
    "w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/20";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
        GPA Calculator
      </h1>
      <p className="mt-2 text-black/60 dark:text-white/60">
        Built on VU&apos;s official grading scheme (12 grades, 4.0 scale) — grade
        points scale linearly inside each percentage band, so results match your
        LMS transcript closely.
      </p>

      {/* Semester GPA */}
      <section className="mt-8 rounded-2xl border border-black/10 p-5 shadow-sm dark:border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Semester GPA</h2>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {result.gpa.toFixed(2)}
              </div>
              <div className="text-xs text-black/50 dark:text-white/50">
                Grade {result.letter}
              </div>
            </div>
            <button
              onClick={() =>
                setCourses((cs) => [
                  ...cs,
                  { id: nextId++, name: "", credits: 3, marks: 0, total: 100 },
                ])
              }
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              + Add course
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="hidden grid-cols-12 gap-2 px-1 text-xs font-medium text-black/50 dark:text-white/50 sm:grid">
            <div className="col-span-4">Course</div>
            <div className="col-span-2">Credit hrs</div>
            <div className="col-span-2">Marks</div>
            <div className="col-span-2">Out of</div>
            <div className="col-span-2 text-right">Grade point</div>
          </div>
          {perCourse.map((c) => (
            <div
              key={c.id}
              className="grid grid-cols-12 items-center gap-2 rounded-xl bg-black/[0.03] p-2 dark:bg-white/[0.04]"
            >
              <input
                className={`${inputCls} col-span-4`}
                placeholder="Subject"
                value={c.name}
                onChange={(e) => update(c.id, { name: e.target.value })}
              />
              <input
                className={`${inputCls} col-span-2`}
                type="number"
                min={1}
                max={6}
                value={c.credits}
                onChange={(e) =>
                  update(c.id, { credits: Number(e.target.value) || 0 })
                }
              />
              <input
                className={`${inputCls} col-span-2`}
                type="number"
                min={0}
                value={c.marks}
                onChange={(e) =>
                  update(c.id, { marks: Number(e.target.value) || 0 })
                }
              />
              <input
                className={`${inputCls} col-span-2`}
                type="number"
                min={1}
                value={c.total}
                onChange={(e) =>
                  update(c.id, { total: Number(e.target.value) || 1 })
                }
              />
              <div className="col-span-1 text-right text-sm font-semibold">
                {c.gp.toFixed(2)}
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <button
                  onClick={() => setCourses((cs) => cs.filter((x) => x.id !== c.id))}
                  className="rounded-md px-2 py-1 text-sm text-red-500 hover:bg-red-500/10"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CGPA projector */}
      <section className="mt-6 rounded-2xl border border-black/10 p-5 shadow-sm dark:border-white/10">
        <h2 className="text-lg font-semibold">CGPA Projector</h2>
        <p className="mt-1 text-sm text-black/60 dark:text-white/60">
          What GPA do you need next semester to reach your target CGPA?
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div>
            <label className="text-xs font-medium">Current CGPA</label>
            <input className={inputCls} type="number" step="0.01" min={0} max={4} value={currentCGPA} onChange={(e) => setCurrentCGPA(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium">Credits done</label>
            <input className={inputCls} type="number" min={0} value={completedCredits} onChange={(e) => setCompletedCredits(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium">Target CGPA</label>
            <input className={inputCls} type="number" step="0.01" min={0} max={4} value={targetCGPA} onChange={(e) => setTargetCGPA(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium">Next sem credits</label>
            <input className={inputCls} type="number" min={1} value={nextCredits} onChange={(e) => setNextCredits(e.target.value)} />
          </div>
        </div>
        {projection !== null && (
          <div className="mt-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-sky-500/10 p-4">
            {projection > 4 ? (
              <p className="text-sm font-medium text-red-500">
                You&apos;d need {projection.toFixed(2)} — above the 4.0 maximum.
                Consider lowering the target or adding more credits.
              </p>
            ) : projection <= 0 ? (
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                You&apos;ve already secured this target — even a 0.00 next
                semester keeps you above {targetCGPA}. 🎉
              </p>
            ) : (
              <p className="text-sm">
                You need{" "}
                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  {projection.toFixed(2)}
                </span>{" "}
                GPA next semester ({nextCredits} credits) to reach a CGPA of{" "}
                {targetCGPA}.
              </p>
            )}
          </div>
        )}
      </section>

      {/* CGPA combiner */}
      <section className="mt-6 rounded-2xl border border-black/10 p-5 shadow-sm dark:border-white/10">
        <h2 className="text-lg font-semibold">Combine semester GPAs</h2>
        <p className="mt-1 text-sm text-black/60 dark:text-white/60">
          Enter each semester&apos;s GPA and total credits to get your CGPA.
        </p>
        <CGPACombiner />
      </section>

      {/* Official scale */}
      <section className="mt-6 rounded-2xl border border-black/10 p-5 shadow-sm dark:border-white/10">
        <h2 className="text-lg font-semibold">Official VU grading scale</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 text-left text-black/50 dark:border-white/10 dark:text-white/50">
                <th className="py-2 pr-4">Grade</th>
                <th className="py-2 pr-4">Percentage</th>
                <th className="py-2 pr-4">Grade points</th>
              </tr>
            </thead>
            <tbody>
              {VU_GRADE_BANDS.map((b) => (
                <tr key={b.letter} className="border-b border-black/5 dark:border-white/5">
                  <td className="py-2 pr-4 font-semibold">{b.letter}</td>
                  <td className="py-2 pr-4">
                    {b.min}–{b.max}%
                  </td>
                  <td className="py-2 pr-4">
                    {b.gpMin === b.gpMax
                      ? b.gpMin.toFixed(2)
                      : `${b.gpMin.toFixed(2)} – ${b.gpMax.toFixed(2)}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-black/40 dark:text-white/40">
          Source: VU official grading scheme (vu.edu.pk). Pass = D (46%) and 40%
          aggregate with 20% each in formative + final assessments.
        </p>
      </section>
    </div>
  );
}

function CGPACombiner() {
  const [rows, setRows] = useState([
    { id: 1, gpa: "3.10", credits: "18" },
    { id: 2, gpa: "2.80", credits: "18" },
  ]);
  const [nextRow, setNextRow] = useState(3);

  const cgpa = useMemo(() => {
    const sems = rows
      .map((r) => ({ gpa: parseFloat(r.gpa), credits: parseFloat(r.credits) }))
      .filter((r) => !isNaN(r.gpa) && !isNaN(r.credits) && r.credits > 0);
    return sems.length ? computeCGPA(sems) : 0;
  }, [rows]);

  const inputCls =
    "w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/20";

  return (
    <div className="mt-3">
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.id} className="grid grid-cols-12 items-center gap-2">
            <div className="col-span-4 text-xs font-medium text-black/50 dark:text-white/50 sm:col-span-3">
              Semester {rows.indexOf(r) + 1}
            </div>
            <input
              className={`${inputCls} col-span-3 sm:col-span-4`}
              type="number"
              step="0.01"
              min={0}
              max={4}
              placeholder="GPA"
              value={r.gpa}
              onChange={(e) =>
                setRows((rs) =>
                  rs.map((x) => (x.id === r.id ? { ...x, gpa: e.target.value } : x))
                )
              }
            />
            <input
              className={`${inputCls} col-span-3 sm:col-span-4`}
              type="number"
              min={1}
              placeholder="Credits"
              value={r.credits}
              onChange={(e) =>
                setRows((rs) =>
                  rs.map((x) => (x.id === r.id ? { ...x, credits: e.target.value } : x))
                )
              }
            />
            <div className="col-span-2 flex justify-end">
              <button
                onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))}
                className="rounded-md px-2 py-1 text-sm text-red-500 hover:bg-red-500/10"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <button
          onClick={() => {
            setRows((rs) => [...rs, { id: nextRow, gpa: "", credits: "" }]);
            setNextRow((n) => n + 1);
          }}
          className="rounded-lg border border-black/15 px-4 py-1.5 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
        >
          + Add semester
        </button>
        <div className="text-right">
          <span className="text-xs text-black/50 dark:text-white/50">CGPA</span>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {cgpa.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
