export type Faq = { q: string; a: string; source: string };

// Common questions from students who just joined Virtual University.
// Answers compiled from official VU sources (handbook.vu.edu.pk, vu.edu.pk FAQs)
// and reputable VU guide sites; each item links its source.
export const NEW_STUDENT_FAQS: Faq[] = [
  {
    q: "What is Virtual University of Pakistan and how does studying there work?",
    a: "VU is Pakistan's first university based completely on modern information technology, established by the Government of Pakistan in 2002. Instead of daily classroom lectures, you watch recorded video lectures, study handouts, and interact with instructors online through the Learning Management System (LMS). Exams are still held in a formal, supervised environment at designated exam centers, and VU degrees are fully recognized by HEC.",
    source: "https://vu.edu.pk/FAQs/FAQs",
  },
  {
    q: "Do I need to attend a campus, or can I study from home?",
    a: "It's your choice. VU has 190+ campuses across Pakistan where you can attend classes, or you can study entirely from home — all you need is a computer or even an Android phone with internet. Lectures reach you through VU's TV channels and the internet either way, and exams happen at designated exam centers regardless of how you study.",
    source: "https://vu.edu.pk/pages/HowVuWorks",
  },
  {
    q: "What is VULMS (the LMS) and what can I do on it?",
    a: "VULMS (lms.vu.edu.pk) is where almost everything happens: log in with your student ID to see announcements, view your lecture schedule, download and submit assignments, attempt quizzes, ask tutors questions, and check your marks. You can also view fee status and download fee vouchers. Never share your password — you're responsible for everything done through your account.",
    source: "https://handbook.vu.edu.pk/HandBook_Pages/GettingStarted.htm",
  },
  {
    q: "Where can I watch video lectures?",
    a: "Lectures are broadcast on VU's own TV channels (VTV1–4) per the timetable in your LMS 'Lecture Schedule' tab. More conveniently, all lectures are available anytime on VU's YouTube channel (youtube.com/vu). You can also order complete course lectures on DVDs from the VU bookshop if bandwidth is a problem.",
    source: "https://handbook.vu.edu.pk/HandBook_Pages/GettingStarted.htm",
  },
  {
    q: "How do I download handouts for my courses?",
    a: "Handouts are on each course's website in your LMS under the 'Lessons' tab and the 'Download' tab, free from the VU Content Library. Printed copies can be bought from the VU bookshop. BSCS Vault also collects student-shared handout links per subject.",
    source: "https://handbook.vu.edu.pk/HandBook_Pages/GettingStarted.htm",
  },
  {
    q: "Is there attendance at VU?",
    a: "No daily attendance — but participation in semester work (assignments, quizzes, GDBs, midterm) is effectively compulsory: skip all of it or miss the final exam and you get an F in that course. Your activity on the LMS is your attendance.",
    source: "https://handbook.vu.edu.pk/HandBook_Pages/Criteria_for_Qualifying_a_Semester.htm",
  },
  {
    q: "How do assignments and online quizzes work?",
    a: "Each assignment has an opening date and deadline: download the question file, prepare your solution, upload it before the due date — submit early, the system slows down near deadlines. Quizzes open for a limited window, must be done in one sitting, usually allow one attempt, and a missed quiz means zero with no retake.",
    source: "https://handbook.vu.edu.pk/HandBook_Pages/GettingStarted.htm",
  },
  {
    q: "What is a GDB and how do I attempt it?",
    a: "GDB = Graded Discussion Board — a graded activity where you post your own written answer to a topic within a short window (usually ~24 hours). Post on the Graded Discussion Board, not the Moderated Discussion Board (MDB). Answers must be in your own words — copied answers get zero — and there's no grace period after the due date.",
    source: "https://handbook.vu.edu.pk/HandBook_Pages/GettingStarted.htm",
  },
  {
    q: "How much do assignments, quizzes, GDBs and exams count toward my grade?",
    a: "Semester work is worth 40% of the total — assignments, quizzes and GDBs together (about 10–20%) plus the midterm (20–30%). The final term exam carries 60%. Exact weightages per course are on the course website's overview tab — check it at semester start, and never skip the weekly activities.",
    source: "https://handbook.vu.edu.pk/HandBook_Pages/Academic%20Rules%20and%20Regulations.htm",
  },
  {
    q: "What is the passing criteria for a course (the 20/20/40 rule)?",
    a: "To pass any course you need all three: at least 20% in formative assessments (everything except the final), at least 20% in the final exam, and at least 40% overall. Fail any one condition and you fail the course — even if your total marks look fine.",
    source: "https://handbook.vu.edu.pk/HandBook_Pages/Result.htm",
  },
  {
    q: "How do midterm and final-term exams work?",
    a: "Both are computer-based, held in a formal proctored environment at designated exam centers using special exam software — never casually from home (only overseas students get a remote option). The midterm covers the first half of the syllabus; the final covers the whole course. You choose your own exam city, center, date and slot when the datesheet portal opens — book early.",
    source: "https://vu.edu.pk/FAQs/FAQs",
  },
  {
    q: "How do I make my exam datesheet and get my admit card?",
    a: "When exams are announced, log in at datesheet.vu.edu.pk with your VULMS ID, choose your exam city and center (the center can't be changed later), pick date/time slots per course, confirm, then print your Exam Entrance Slip — that printout is your admit card. Seats are first-come, first-served.",
    source: "https://www.vu.edu.pk/NewsDetails?NewsId=9382&type=",
  },
  {
    q: "What is VU's grading scale and how is GPA calculated?",
    a: "VU uses letter grades on a 4.00 scale: A+ and A (85–100%) = 4.00, B = 3.00, C = 2.00, D (46–55%+) = 1.00 minimum pass, below that F. Semester GPA = Σ(grade points × credit hours) ÷ total credit hours. CGPA is the same across all semesters; repeated courses count once with the higher grade. Try our built-in GPA calculator.",
    source: "https://handbook.vu.edu.pk/HandBook_Pages/Result.htm",
  },
  {
    q: "How do I pay my VU fee?",
    a: "Download the voucher from your LMS 'Account Book', then pay via approved channels only: HBL branches/Konnect, Bank Alfalah, EasyPaisa, NADRA e-Sahulat, UBL, or the LMS 'Pay' option by debit/credit card. Do NOT transfer directly into the university's account via IBFT/RAAST — it's often untraceable. Keep payment proof until your fee status updates.",
    source: "https://www.vu.edu.pk/NewsDetails?NewsId=9080&type",
  },
  {
    q: "What happens if I miss an assignment, quiz or GDB deadline?",
    a: "The LMS locks the submission portal automatically — no grace periods, extensions, or retakes; a missed activity scores zero. Those zeroes hurt twice: once in the 10–20% activity weightage, and again in the 20% formative passing requirement. Check each course's overview tab regularly and submit at least a day early.",
    source: "https://handbook.vu.edu.pk/HandBook_Pages/Criteria_for_Qualifying_a_Semester.htm",
  },
  {
    q: "Who do I contact for help, and why check VU email daily?",
    a: "Open a ticket in the VU Support System (vu.edu.pk/SupportSystem) with your VULMS ID — they respond within ~24 hours. Helpline: 111-880-880; password problems: password@vu.edu.pk. Official communication (including exam confirmations) goes to your VU email, so check it and the LMS notice board daily.",
    source: "https://vu.edu.pk/FAQs/FAQs",
  },
];
