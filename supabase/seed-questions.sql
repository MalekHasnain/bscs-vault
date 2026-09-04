-- ============================================================
-- BSCS VAULT — Seed past-paper questions (REAL, from public
-- VU past-paper collections; sources noted per subject)
--
-- Run AFTER supabase/schema.sql in the SQL Editor.
-- Run ONCE. (To start over: delete from public.questions
-- where created_by is null;  then run this again.)
--
-- Disclosure: question text and correct answers come from
-- solved past-paper files shared publicly by VU students
-- (Moaaz / Waqar Siddhu / Vu Topper RM / vuZs Team files on
-- studocu.com, vusolvedpaper.com, coursehero, vuinsider).
-- Where a source listed only the question + correct answer,
-- plausible distractor options were reconstructed — flagged
-- in a comment above those inserts.
-- ============================================================

-- ---------- CS101 (source: solved MCQ file by Masoom Fairy,
-- vusolvedpaper.com — Spring 2010 paper + others, answers with
-- handout page references) ----------
insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Vacuum tubes were replaced by _______.',
  '["Punch cards","Transistors","Micro processors","Resistors"]'::jsonb, 1, 'midterm', 2010, 'approved'
from public.subjects where code = 'CS101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Hexadecimal number system is based on _______ digits.',
  '["2","8","12","16"]'::jsonb, 3, 'midterm', 2010, 'approved'
from public.subjects where code = 'CS101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'JavaScript interacts with the user through _______.',
  '["Special control","Internet explorer","Event handlers","JavaScript does not interact with the user"]'::jsonb, 2, 'midterm', 2010, 'approved'
from public.subjects where code = 'CS101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Which one is correct for JavaScript?',
  '["onMouseOver","OnMouseOver","onmouseover","All of the given"]'::jsonb, 0, 'midterm', 2010, 'approved'
from public.subjects where code = 'CS101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Programs that reside on Web servers and receive info that a user enters in a form are known as:',
  '["Server-Side Scripts","Client-Side Scripts","Super Scripts","Form Scripts"]'::jsonb, 0, 'midterm', 2010, 'approved'
from public.subjects where code = 'CS101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'The _______ is connected to all other modules of the microprocessor.',
  '["Control unit","Memory unit","Floating Point unit","Arithmetic and Logic unit"]'::jsonb, 0, 'midterm', 2010, 'approved'
from public.subjects where code = 'CS101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'WWW stands for:',
  '["Wide World Web","World Wide Web","World White Web","World Web Wide"]'::jsonb, 1, 'midterm', 2010, 'approved'
from public.subjects where code = 'CS101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Supercomputers are used in:',
  '["Weather forecasting","Aeroplane manufacturing","Atomic bomb experiments","All of the given choices"]'::jsonb, 3, 'midterm', 2010, 'approved'
from public.subjects where code = 'CS101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', '_______ consists of cells arranged in rows and columns.',
  '["Spreadsheets Software","Word processor","Presentation Software","Microsoft Paint Software"]'::jsonb, 0, 'midterm', 2008, 'approved'
from public.subjects where code = 'CS101';

-- (distractors below reconstructed; question + answer verbatim from source)
insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Google Drive is an example of _______.',
  '["Grid and cluster computing","Cluster computing","Cloud computing","Grid computing"]'::jsonb, 2, 'midterm', null, 'approved'
from public.subjects where code = 'CS101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Deep Blue was designed by _______.',
  '["IBM","Macintosh","Apple Computers","Microsoft"]'::jsonb, 0, 'midterm', null, 'approved'
from public.subjects where code = 'CS101';

insert into public.questions (subject_id, q_type, question_text, answer_text, paper_type, paper_year, status)
select id, 'short',
  'I am following a procedure to solve a problem. My selected procedure is not giving the right answer each time, but gives a nearly right answer. The procedure can be called as _________.',
  'A heuristic. (An algorithm guarantees the correct answer every time; a heuristic is a rule-of-thumb procedure that usually gives a good-enough answer but does not guarantee it.)',
  'midterm', null, 'approved'
from public.subjects where code = 'CS101';

-- ---------- CS201 (source: Vu Topper RM midterm MCQ file +
-- Moaaz solved midterm file — question + verified answers) ----------
-- (options reconstructed around verified answers)
insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Following is the declaration of a 2D array: how many columns are declared for this array?  int arr[3][2];',
  '["3","2","6","5"]'::jsonb, 1, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'How can we declare an array of characters whose size is 12 with the array name "country"?',
  '["char country(12);","char country[12];","char[12] country;","character country[12];"]'::jsonb, 1, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'We can access a global variable _______.',
  '["From anywhere in the program","Only inside main()","Only inside the function where it is declared","Only in header files"]'::jsonb, 0, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', '_______ are used to compile the code.',
  '["Compilers","Interpreters","Linkers","Debuggers"]'::jsonb, 0, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'A _______ structure specifies that an action is to be repeated while some condition remains true.',
  '["Selection","Sequence","Repetition","Sorting"]'::jsonb, 2, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, answer_text, paper_type, paper_year, status)
select id, 'short',
  'Find out the logical error in the following lines of code:  if (x = 10)  cout << "x is 10";',
  'The assignment operator (=) has been used for comparison. To compare x with 10, the equality operator (==) must be used:  if (x == 10).  As written, the code assigns 10 to x and the condition always evaluates to true.',
  'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, answer_text, paper_type, paper_year, status)
select id, 'short',
  'A function is a block of statements that can be defined once and used _______ in the program.',
  'Many times — after a function is defined once, it can be called/reused anywhere in the program (and in other programs by including its definition).',
  'midterm', null, 'approved'
from public.subjects where code = 'CS201';

-- ---------- ENG101 (source: Moaaz midterm solved MCQs +
-- vuassassins subjective papers) ----------
insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Complete the sentence by choosing the best option/pair of connectives:  _____ the men _____ their supervisor is to be blamed for the mishap.',
  '["Neither ... nor","Either ... or","Both ... and","Whether ... or"]'::jsonb, 0, 'midterm', 2011, 'approved'
from public.subjects where code = 'ENG101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Complete the sentence by choosing the correct option:  "Oh, dear! I have left _____ my purse _____ keys in the other bag," said Seema.',
  '["both ... and","either ... or","neither ... nor","not only ... but also"]'::jsonb, 0, 'midterm', 2010, 'approved'
from public.subjects where code = 'ENG101';

-- (options reconstructed; sentence + highlighted word verbatim)
insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Choose the best meaning for the highlighted word:  Santos knew that the reading class would improve his vocabulary and comprehension, thus increasing his chances of success in [subsequent] college courses.',
  '["following / coming after","earlier / previous","difficult / advanced","unnecessary / optional"]'::jsonb, 0, 'midterm', null, 'approved'
from public.subjects where code = 'ENG101';

insert into public.questions (subject_id, q_type, question_text, answer_text, paper_type, paper_year, status)
select id, 'short',
  'The sentence below contains a comma splice. Correct it without creating any new errors:  Hot summer weather is nice, it can be dangerous for various groups of people when certain temperatures get too high.',
  'Join the two clauses properly, e.g.:  "Hot summer weather is nice; however, it can be dangerous for various groups of people when certain temperatures get too high."  (Also correct: a period + new sentence, or a comma + coordinating conjunction: "nice, but it can be dangerous...")',
  'midterm', null, 'approved'
from public.subjects where code = 'ENG101';

insert into public.questions (subject_id, q_type, question_text, answer_text, paper_type, paper_year, status)
select id, 'short',
  'Write down the objectives of an introductory paragraph in essay writing.',
  'An introductory paragraph should: (1) grab the reader''s attention (hook), (2) introduce the topic and give necessary background, and (3) state the thesis — the main point/claim the essay will develop.',
  'midterm', null, 'approved'
from public.subjects where code = 'ENG101';

-- ---------- MTH202 (source: vuZs/VURANK solved papers +
-- VU handout exercise) ----------
insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'The statement p -> q is logically equivalent to _______.',
  '["~q -> ~p (the contrapositive)","q -> p (the converse)","~p -> ~q (the inverse)","None of these"]'::jsonb, 0, 'final', null, 'approved'
from public.subjects where code = 'MTH202';

insert into public.questions (subject_id, q_type, question_text, answer_text, paper_type, paper_year, status)
select id, 'short',
  'Find x and y given that (2x, x + y) = (6, 2).',
  'Two ordered pairs are equal if and only if corresponding components are equal. So: 2x = 6  =>  x = 3, and x + y = 2 => 3 + y = 2 => y = -1.  Hence x = 3, y = -1.',
  'midterm', null, 'approved'
from public.subjects where code = 'MTH202';

-- ---------- MTH5101 Calculus I (source: MTH101 old-code solved
-- papers, Gulshan Ali + Kamran Altaf file — same syllabus) ----------
insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'If f is twice differentiable at a stationary point x0 and f''''(x0) > 0, then f has relative _______ at x0.',
  '["Minima","Maxima","None of these"]'::jsonb, 0, 'midterm', null, 'approved'
from public.subjects where code = 'MTH5101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'If f is twice differentiable at a stationary point x0 and f''''(x0) < 0, then f has relative _______ at x0.',
  '["Minima","Maxima","None of these"]'::jsonb, 1, 'midterm', null, 'approved'
from public.subjects where code = 'MTH5101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'A line y = y0 is called a _______ for the graph of f if lim(x->+inf) f(x) = y0 or lim(x->-inf) f(x) = y0.',
  '["Vertical asymptote","Horizontal asymptote","Tangent line","None of these"]'::jsonb, 1, 'midterm', null, 'approved'
from public.subjects where code = 'MTH5101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'If f(x) = 3x^8 + 2x + 1, then f''(x) = _______.',
  '["3x^7 + 2","24x^7 + 2","3x^8 + 2","24x^8 + 2"]'::jsonb, 1, 'midterm', null, 'approved'
from public.subjects where code = 'MTH5101';

-- ---------- ECO401 (source: vuZs Team solved MCQs +
-- vusolvedpaper.com midterm file) ----------
insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'In a free-market economy, the allocation of resources is determined by:',
  '["Votes taken by consumers","A central planning authority","By consumer preferences","The level of profits of firms"]'::jsonb, 2, 'midterm', null, 'approved'
from public.subjects where code = 'ECO401';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'The cost which does not vary with the level of production is known as:',
  '["Fixed cost","Variable cost","Total cost","Marginal cost"]'::jsonb, 0, 'final', null, 'approved'
from public.subjects where code = 'ECO401';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'The investment demand curve shows the negative relationship between:',
  '["The level of investment and the interest rate","The level of investment and income","The level of investment and the price level","None of the given options"]'::jsonb, 0, 'final', null, 'approved'
from public.subjects where code = 'ECO401';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'An increase in the economy''s level of production, output or income is called:',
  '["Economic growth","Inflation","Recession","Unemployment"]'::jsonb, 0, 'final', null, 'approved'
from public.subjects where code = 'ECO401';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Which of the following indicates the country''s increasing indebtedness to the rest of the world?',
  '["Capital account surplus","Capital account deficit","Trade surplus","Current account deficit"]'::jsonb, 0, 'final', null, 'approved'
from public.subjects where code = 'ECO401';

insert into public.questions (subject_id, q_type, question_text, answer_text, paper_type, paper_year, status)
select id, 'short',
  'Briefly explain the quantity theory of money along with its equation.',
  'The quantity theory of money states that the general price level is directly proportional to the money supply in an economy, assuming velocity and output are constant. Equation of exchange:  M x V = P x T  (or MV = PY), where M = money supply, V = velocity of circulation of money, P = general price level, T/Y = volume of transactions / real output. If V and Y are fixed, an increase in M raises P proportionally — i.e. "too much money chasing too few goods" causes inflation.',
  'final', null, 'approved'
from public.subjects where code = 'ECO401';

-- ---------- PSY101 (source: Arslan Ali PSY101 solved MCQ
-- mega collection + VURANK midterm file) ----------
insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Which of the following is NOT a type of learning?',
  '["Verbal learning","Problem solving","Motor learning","Synchronicity"]'::jsonb, 3, 'midterm', null, 'approved'
from public.subjects where code = 'PSY101';

-- (distractors reconstructed; question + answer verbatim)
insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'The branchlike structures that receive messages from other neurons are called _______.',
  '["Dendrites","Axons","Nerve bundles","Synapses"]'::jsonb, 0, 'midterm', null, 'approved'
from public.subjects where code = 'PSY101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Laws of perceptual organization were proposed by which of the following schools of thought?',
  '["Structuralism","Functionalism","Gestalt psychology","Behaviorism"]'::jsonb, 2, 'midterm', null, 'approved'
from public.subjects where code = 'PSY101';
