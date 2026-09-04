export type Notice = {
  date: string;
  title: string;
  detail: string;
  source_url: string;
  confirmed: boolean;
};

// Fall 2026 key dates for VU BSCS students.
// Confirmed items: official VU admission instructions page (Fall 2026).
// Expected items: projected from the verified Fall 2025 pattern —
// re-check when VU publishes the official Fall 2026 academic calendar.
export const FALL_2026_NOTICES: Notice[] = [
  {
    date: "2026-07-06",
    title: "Admissions open — Fall 2026 (all programs incl. BSCS)",
    detail:
      "VU officially opened Fall 2026 admissions. BS Computer Science and other undergraduate programs can be applied for online through the VU admission portal.",
    source_url: "https://www.vu.edu.pk/Admissions/AdmissionProcedure",
    confirmed: true,
  },
  {
    date: "2026-09-09",
    title: "Course selection link opens on VULMS",
    detail:
      "The course selection link on VULMS opens. New and continuing students can start enrolling in their Fall 2026 courses from this date.",
    source_url: "https://www.vu.edu.pk/Admissions/AdmissionProcedure",
    confirmed: true,
  },
  {
    date: "2026-09-15",
    title: "Last date to apply for Fall 2026 admissions",
    detail:
      "Final day to submit admission forms (except merit-based programs), and also the last day to apply for course exemption or transfer of credits. Late forms are not accepted.",
    source_url: "https://www.vu.edu.pk/Admissions/AdmissionProcedure",
    confirmed: true,
  },
  {
    date: "2026-09-21",
    title: "Last date to deposit admission processing fee (Rs. 500)",
    detail:
      "The Rs. 500 admission processing fee must be deposited by this date. Paying fees for multiple admission forms can get your admission cancelled — pay for one form only.",
    source_url: "https://www.vu.edu.pk/Admissions/AdmissionProcedure",
    confirmed: true,
  },
  {
    date: "2026-09-28",
    title: "Orientation for newly admitted students (Sep 28 – Oct 5)",
    detail:
      "Orientation week for new Fall 2026 admits. New BSCS students should attend to learn how VULMS, exams and course selection work.",
    source_url: "https://www.vu.edu.pk/Admissions/AdmissionProcedure",
    confirmed: true,
  },
  {
    date: "2026-09-30",
    title: "Last date to apply for readmission (existing students)",
    detail:
      "Existing students who want readmission for Fall 2026 must apply by this date.",
    source_url: "https://www.vu.edu.pk/Admissions/AdmissionProcedure",
    confirmed: true,
  },
  {
    date: "2026-10-02",
    title: "Last date for change of study program",
    detail:
      "Deadline for both existing and newly admitted students to apply for a change of study program (e.g., switching into or within BS programs).",
    source_url: "https://www.vu.edu.pk/Admissions/AdmissionProcedure",
    confirmed: true,
  },
  {
    date: "2026-10-05",
    title: "Fall 2026 classes commence",
    detail:
      "Classes for the Fall 2026 semester officially begin. Lectures, handouts and activities start appearing on VULMS from this week.",
    source_url: "https://www.vu.edu.pk/Admissions/AdmissionProcedure",
    confirmed: true,
  },
  {
    date: "2026-10-15",
    title: "Last date for course selection (add / drop / replace)",
    detail:
      "Final day to add, drop or replace courses for Fall 2026. No course-change requests are entertained after this date.",
    source_url: "https://www.vu.edu.pk/Admissions/AdmissionProcedure",
    confirmed: true,
  },
  {
    date: "2026-12-07",
    title: "Mid-term exams — expected early-to-mid December 2026",
    detail:
      "VU has not yet published the Fall 2026 academic calendar. Based on the official Fall 2025 pattern (mid-terms commenced Dec 8, 2025, datesheet signup in late November), Fall 2026 mid-terms are expected in the first half of December — to be confirmed.",
    source_url: "https://www.vu.edu.pk/StudentServices/AcademicCalendar",
    confirmed: false,
  },
  {
    date: "2027-01-25",
    title: "Final-term exams — expected late January 2027",
    detail:
      "Fall 2026 final-exam dates are not yet published. In Fall 2025 the datesheet interface opened January 14 with exams commencing around January 26, so Fall 2026 finals are expected in late January 2027 — to be confirmed.",
    source_url: "https://www.vu.edu.pk/StudentServices/AcademicCalendar",
    confirmed: false,
  },
  {
    date: "2027-03-01",
    title: "Final-term result announcement — expected early March 2027",
    detail:
      "Based on the Fall 2025 pattern (results announced March 4, 2026, roughly five weeks after finals), Fall 2026 results are expected in early March 2027 — to be confirmed.",
    source_url: "https://www.vu.edu.pk/StudentServices/AcademicCalendar",
    confirmed: false,
  },
];
