-- Performance indexes for blazing fast queries
-- Run this in Supabase SQL Editor

-- For practice cards and subject lists (counts)
CREATE INDEX IF NOT EXISTS idx_questions_subject_status_type 
ON public.questions (subject_id, status, q_type);

-- For subject pages and filtering
CREATE INDEX IF NOT EXISTS idx_questions_subject_paper 
ON public.questions (subject_id, paper_year, paper_type);

-- For homepage stats and recent
CREATE INDEX IF NOT EXISTS idx_questions_status_created 
ON public.questions (status, created_at DESC);

-- Subjects are small, but for safety
CREATE INDEX IF NOT EXISTS idx_subjects_semester_code 
ON public.subjects (semester, code);

COMMENT ON INDEX idx_questions_subject_status_type IS 'Speeds up MCQ count per subject and practice loads dramatically';