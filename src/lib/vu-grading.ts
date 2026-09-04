// VU (Virtual University of Pakistan) official grading scheme.
// Source: vu.edu.pk/pages/VUGradingScheme + handbook.vu.edu.pk
// Grade points scale LINEARLY within each percentage band.

export type GradeBand = {
  letter: string;
  min: number; // min percentage (inclusive)
  max: number; // max percentage (inclusive)
  gpMin: number; // grade point at min
  gpMax: number; // grade point at max
};

// Official VU bands (12 grades on the 4.0 scale)
export const VU_GRADE_BANDS: GradeBand[] = [
  { letter: "A+", min: 90, max: 100, gpMin: 4.0, gpMax: 4.0 },
  { letter: "A", min: 85, max: 89, gpMin: 3.95, gpMax: 3.99 },
  { letter: "A-", min: 80, max: 84, gpMin: 3.66, gpMax: 3.94 },
  { letter: "B+", min: 75, max: 79, gpMin: 3.33, gpMax: 3.65 },
  { letter: "B", min: 71, max: 74, gpMin: 3.0, gpMax: 3.32 },
  { letter: "B-", min: 68, max: 70, gpMin: 2.66, gpMax: 2.99 },
  { letter: "C+", min: 61, max: 67, gpMin: 2.33, gpMax: 2.65 },
  { letter: "C", min: 58, max: 60, gpMin: 2.0, gpMax: 2.32 },
  { letter: "C-", min: 56, max: 57, gpMin: 1.66, gpMax: 1.99 },
  { letter: "D+", min: 50, max: 55, gpMin: 1.33, gpMax: 1.65 },
  { letter: "D", min: 46, max: 49, gpMin: 1.0, gpMax: 1.32 },
  { letter: "F", min: 0, max: 45, gpMin: 0.0, gpMax: 0.0 },
];

export function marksToGradePoint(percentage: number): number {
  const p = Math.max(0, Math.min(100, percentage));
  const band =
    VU_GRADE_BANDS.find((b) => p >= b.min && p <= b.max) ??
    VU_GRADE_BANDS[VU_GRADE_BANDS.length - 1];
  if (band.gpMax === band.gpMin) return band.gpMin;
  // Linear interpolation inside the band
  const t = (p - band.min) / (band.max - band.min);
  return round2(band.gpMin + t * (band.gpMax - band.gpMin));
}

export function marksToLetter(percentage: number): string {
  const p = Math.max(0, Math.min(100, percentage));
  const band =
    VU_GRADE_BANDS.find((b) => p >= b.min && p <= b.max) ??
    VU_GRADE_BANDS[VU_GRADE_BANDS.length - 1];
  return band.letter;
}

export function gpToLetter(gp: number): string {
  if (gp >= 4.0) return "A+";
  if (gp >= 3.95) return "A";
  if (gp >= 3.66) return "A-";
  if (gp >= 3.33) return "B+";
  if (gp >= 3.0) return "B";
  if (gp >= 2.66) return "B-";
  if (gp >= 2.33) return "C+";
  if (gp >= 2.0) return "C";
  if (gp >= 1.66) return "C-";
  if (gp >= 1.33) return "D+";
  if (gp >= 1.0) return "D";
  return "F";
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// GPA = Σ(grade points × credit hours) / Σ(credit hours)
export function computeGPA(
  courses: { creditHours: number; percentage: number }[]
): { gpa: number; letter: string } {
  const totalCredits = courses.reduce((s, c) => s + c.creditHours, 0);
  if (totalCredits === 0) return { gpa: 0, letter: "-" };
  const qualityPoints = courses.reduce(
    (s, c) => s + marksToGradePoint(c.percentage) * c.creditHours,
    0
  );
  const gpa = round2(qualityPoints / totalCredits);
  return { gpa, letter: gpToLetter(gpa) };
}

// CGPA across semesters = Σ(GPA_sem × credits_sem) / Σ(credits_sem)
export function computeCGPA(
  semesters: { gpa: number; credits: number }[]
): number {
  const totalCredits = semesters.reduce((s, x) => s + x.credits, 0);
  if (totalCredits === 0) return 0;
  const qp = semesters.reduce((s, x) => s + x.gpa * x.credits, 0);
  return round2(qp / totalCredits);
}

// Target CGPA projector: what GPA is needed next semester?
// needed = (target × (done + next) − current × done) / next
export function projectRequiredGPA(
  currentCGPA: number,
  completedCredits: number,
  targetCGPA: number,
  nextSemesterCredits: number
): number {
  if (nextSemesterCredits <= 0) return NaN;
  const needed =
    (targetCGPA * (completedCredits + nextSemesterCredits) -
      currentCGPA * completedCredits) /
    nextSemesterCredits;
  return round2(needed);
}
