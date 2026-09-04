-- ============================================================
-- BSCS VAULT — seed v2: additional REAL past-paper MCQs
-- Sources: vusolvedpaper.com solved PDFs (CS201 Sadia Ali file,
-- ENG101 Moaaz blue-marked PDF, PSY101 bold-marked PDF,
-- vuexamprep.com MTH101/MTH202 correct-flagged sets,
-- ECO401 blue-marked solved paper). Verbatim questions with
-- source-marked correct answers; 6 source items with provably
-- wrong markings were excluded by hand.
-- Run AFTER schema.sql (+ previous seeds). Safe alongside them.
-- ============================================================

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'What is the output of the following statement? int i = 2.5; do { cout << i * 2; } while (i > 3 && i < 10);',
  '["510", "5", "48", "error"]'::jsonb, 3, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'If an array has 100 elements, what is the allowable range of subscripts?',
  '["0 \u2013 99", "1 \u2013 99", "0 \u2013 100", "1 \u2013 100"]'::jsonb, 0, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Which of the following functions returns the size of a string variable?',
  '["strlength()", "stringlen()", "strlen()", "strLength()"]'::jsonb, 2, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Which of the following header files includes string conversion functions?',
  '["string.h", "stdlib.h", "ctype.h", "sconvert.h"]'::jsonb, 0, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'The function of cin is:',
  '["To display message", "To read data from keyboard", "To display output on the screen", "To send data to printer"]'::jsonb, 1, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'In C/C++ language, the header file which is used to perform useful tasks and manipulation of character data is:',
  '["cplext.h", "ctype.h", "stdio.h", "delay.h"]'::jsonb, 1, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Each pass through a loop is called a/an:',
  '["enumeration", "Iteration", "culmination", "pass through"]'::jsonb, 1, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Analysis is the _______ step in designing a program.',
  '["Last", "Middle", "Post Design", "First"]'::jsonb, 3, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Paying attention to detail in designing a program is _________.',
  '["Time consuming", "Redundant", "Necessary", "Somewhat Good"]'::jsonb, 2, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Which of the following values does C++ use to represent true and false?',
  '["1 and 0", "1 and -1", "11 and 00", "Any numerical value"]'::jsonb, 0, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Which of the following can NOT be a variable name?',
  '["area", "_area", "10area", "area2"]'::jsonb, 2, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'What''s wrong with this for loop? for (int k = 2, k <= 12, k++)',
  '["the increment should always be ++k", "the variable must always be the letter i", "there should be a semicolon at the end of the statement", "the commas should be semicolons"]'::jsonb, 3, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'In a flow chart, the symbol used for decision making is:',
  '["Rectangle", "Circle", "Arrow", "Diamond"]'::jsonb, 3, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'The header file which is used for input and output is:',
  '["maths.h", "string.h", "iostream.h", "ctype.h"]'::jsonb, 2, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Which character is inserted at the end of a string to indicate the end of the string?',
  '["new line", "tab", "null", "carriage return"]'::jsonb, 2, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'The syntax of a union is identical to _______.',
  '["Structure", "Class", "Function", "None of the given options"]'::jsonb, 0, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', '&& is a/an _______ operator.',
  '["arithmetic", "logical", "relational", "unary"]'::jsonb, 1, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', '<, <=, >, >= are called _______ operators.',
  '["Logical", "Arithmetic", "Relational", "Conditional"]'::jsonb, 2, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'What will be the output of the following code segment? char *x = "programming"; cout << *(x+2) << *(x+3) << *(x+5) << *(x+8);',
  '["prgm", "rorm", "ogai", "ramg"]'::jsonb, 2, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'What will be the result of the expression z = x % y, if x = 19 and y = 4?',
  '["3", "4", "15", "19"]'::jsonb, 0, 'midterm', null, 'approved'
from public.subjects where code = 'CS201';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Choose antonym for the underlined word. Our investigation will reveal the truth.',
  '["conceal", "expose", "inspect", "announce"]'::jsonb, 0, 'midterm', 2010, 'approved'
from public.subjects where code = 'ENG101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Which suffix can correctly be added to the root word ''electric'' to make a new word?',
  '["ed", "ian", "sion", "y"]'::jsonb, 1, 'midterm', 2010, 'approved'
from public.subjects where code = 'ENG101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Choose a suitable option to fill in the blank. Newton imagined light to ________ of particles emitted from luminous bodies.',
  '["assist", "desist", "consist", "persist"]'::jsonb, 2, 'midterm', 2010, 'approved'
from public.subjects where code = 'ENG101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Read the sentence carefully and decide which of the five choices provided comes closest in meaning to the word underlined. Sue affected to like her only until she found a better friend.',
  '["Agreed", "Pretended", "Wanted", "Bothered"]'::jsonb, 0, 'midterm', 2010, 'approved'
from public.subjects where code = 'ENG101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Read the statement carefully and choose ‘inference’ from the given options. If you get fired from your job, you can infer that:',
  '["You did something wrong.", "You will never get a job again", "You were the best worker.", "You might get a raise."]'::jsonb, 0, 'midterm', 2010, 'approved'
from public.subjects where code = 'ENG101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Complete the following sentence by choosing the correct option. The coach''s ___________ voice could be heard over all the other noise in the gymnasium.',
  '["sanguine", "ingratiating", "strident", "mellifluous"]'::jsonb, 2, 'midterm', 2010, 'approved'
from public.subjects where code = 'ENG101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'which individuals have little control?',
  '["Cognitive model", "Psychodynamic model", "Humanistic model", "Behavioral model"]'::jsonb, 1, 'midterm', null, 'approved'
from public.subjects where code = 'PSY101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Which one of the following schools of thought focused on what the mind does and how it does?',
  '["Structuralism", "Functionalism", "Gestalt", "Behaviorist"]'::jsonb, 1, 'midterm', null, 'approved'
from public.subjects where code = 'PSY101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Which one of the following drugs is a stimulant?',
  '["Nicotine", "Lorazepam", "Barbiturates", "LSD"]'::jsonb, 0, 'midterm', null, 'approved'
from public.subjects where code = 'PSY101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'type of defense mechanism?',
  '["Projection", "Displacement", "Repression", "Sublimation"]'::jsonb, 3, 'midterm', null, 'approved'
from public.subjects where code = 'PSY101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', '______________ refers to genetic composition of a person.',
  '["Genotype", "Phenotype", "Monotype", "None of the given options"]'::jsonb, 0, 'midterm', null, 'approved'
from public.subjects where code = 'PSY101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'In a correlational study, when one variable goes up as another goes down is known as a _________.',
  '["Positive Correlation", "No Correlation", "Negative Correlation", "Illusory Correlation"]'::jsonb, 2, 'midterm', null, 'approved'
from public.subjects where code = 'PSY101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Range of function f(x)=e^x is ___________',
  '["Set of positive real numbers", "Set of real numbers", "Set of integers", "Set of natural numbers"]'::jsonb, 0, 'midterm', null, 'approved'
from public.subjects where code = 'MTH202';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Composite relation symbolically written as _______',
  '["SoR={(a,c)aeA, ceC, 3eB, (a,b)eR and (b,c)eS}", "RoS={(a,c)aeA, ceC, 3eB, (a,b)eR and (b,c)eS}", "SoR={(a,b)aeA, beB, (a,c)eR and (c,b)eS}", "RoS={(b,c)beB, ceC, (a,b)eR and (a,c)eS}"]'::jsonb, 0, 'midterm', null, 'approved'
from public.subjects where code = 'MTH202';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'If x=17(mod 5) which of the following integers are valid solution for x ?',
  '["12", "2", "7", "17"]'::jsonb, 0, 'midterm', null, 'approved'
from public.subjects where code = 'MTH202';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Range of the relation {(0,1),(3,22),(90,34)}',
  '["{1,22,34}", "{0,3,90}", "{1,22,34,90}", "{0,1,3,22,34,90}"]'::jsonb, 0, 'midterm', null, 'approved'
from public.subjects where code = 'MTH202';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Operation of subtraction is a binary operation on the set of __________',
  '["Integers", "Natural numbers", "Real numbers", "Rational numbers"]'::jsonb, 0, 'midterm', null, 'approved'
from public.subjects where code = 'MTH202';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'The value of I d= N',
  '["1", "2", "3", "4"]'::jsonb, 0, 'midterm', null, 'approved'
from public.subjects where code = 'MTH5101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'The region bounded by the curves y = sqrt(x), y=1 and x=4',
  '["1", "2", "5", "3"]'::jsonb, 3, 'midterm', null, 'approved'
from public.subjects where code = 'MTH5101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'Find the area of the region between the x-axis, the f(z) = 2^z - 2^z - 22, 1\u003cz\u003c2',
  '["3", "5", "37/12", "15"]'::jsonb, 2, 'midterm', null, 'approved'
from public.subjects where code = 'MTH5101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'First fundamental theorem of calculus tells us how to evaluate the ...... in a quick way.',
  '["Definite integral", "None of these", "Differential", "Indefinite integral"]'::jsonb, 0, 'midterm', null, 'approved'
from public.subjects where code = 'MTH5101';

insert into public.questions (subject_id, q_type, question_text, options, correct_option, paper_type, paper_year, status)
select id, 'mcq', 'The volume of a cylinder is the area of a cross section of the cylinder multiplied by the ______ of the cylinder.',
  '["Diameter", "Height", "Radius", "Base"]'::jsonb, 1, 'midterm', null, 'approved'
from public.subjects where code = 'MTH5101';
