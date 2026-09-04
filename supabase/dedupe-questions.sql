-- ============================================================
-- BSCS VAULT — Remove duplicate questions
-- (the seed file was accidentally run twice, doubling every
-- question: 78 rows instead of 39)
--
-- Run ONCE in Supabase → SQL Editor → New query → Run.
-- Keeps one copy of each question, deletes the twin.
-- After running, questions count should show exactly 39.
-- ============================================================

delete from public.questions a
using public.questions b
where a.id > b.id
  and a.subject_id = b.subject_id
  and a.q_type = b.q_type
  and a.question_text = b.question_text;

-- Verify (should return 39):
-- select count(*) from public.questions;
