-- ============================================================
-- BSCS VAULT — Supabase schema
-- Paste this whole file into: Supabase Dashboard → SQL Editor → New query → Run
-- Safe to re-run (idempotent).
-- ============================================================

-- ---------- PROFILES ----------
-- One row per logged-in student, auto-created on signup.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- Auto-create a profile whenever a student signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and is_admin = true
  );
$$;

-- ---------- SUBJECTS ----------
create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  title text not null,
  semester int not null default 1,
  course_type text not null default 'required'
    check (course_type in ('required', 'elective', 'deficiency')),
  credit_hours numeric not null default 3,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------- QUESTIONS (past-paper bank) ----------
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  q_type text not null check (q_type in ('mcq', 'short', 'long')),
  question_text text not null,
  -- MCQ only: exactly 4 options
  options jsonb,
  -- MCQ only: 0-3 index into options[]
  correct_option int
    check (correct_option is null or (correct_option between 0 and 3)),
  -- short/long only: model answer
  answer_text text,
  paper_type text not null default 'midterm'
    check (paper_type in ('midterm', 'final', 'quiz', 'other')),
  paper_year int,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists questions_subject_idx on public.questions(subject_id);
create index if not exists questions_status_idx on public.questions(status);

-- ---------- HANDOUTS ----------
create table if not exists public.handouts (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  title text not null,
  -- v1: students paste a Google Drive / link to the PDF
  file_url text not null,
  uploaded_by uuid references public.profiles(id) on delete set null,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists handouts_subject_idx on public.handouts(subject_id);
create index if not exists handouts_status_idx on public.handouts(status);

-- ============================================================
-- ROW LEVEL SECURITY — the public can read, students can
-- submit, admins moderate. Nobody can touch other people's rows.
-- ============================================================
alter table public.profiles  enable row level security;
alter table public.subjects  enable row level security;
alter table public.questions enable row level security;
alter table public.handouts  enable row level security;

-- PROFILES
drop policy if exists "profiles are public" on public.profiles;
create policy "profiles are public"
  on public.profiles for select using (true);

drop policy if exists "users update own profile" on public.profiles;
create policy "users update own profile"
  on public.profiles for update using (auth.uid() = id);

-- SUBJECTS: readable by everyone, creatable by admins
drop policy if exists "subjects are public" on public.subjects;
create policy "subjects are public"
  on public.subjects for select using (true);

drop policy if exists "admins manage subjects" on public.subjects;
create policy "admins manage subjects"
  on public.subjects for insert with check (public.is_admin());

drop policy if exists "admins update subjects" on public.subjects;
create policy "admins update subjects"
  on public.subjects for update using (public.is_admin());

-- QUESTIONS
drop policy if exists "approved questions are public" on public.questions;
create policy "approved questions are public"
  on public.questions for select
  using (status = 'approved' or auth.uid() = created_by or public.is_admin());

drop policy if exists "students submit questions" on public.questions;
create policy "students submit questions"
  on public.questions for insert
  with check (auth.uid() = created_by and status = 'pending');

drop policy if exists "students edit own pending questions" on public.questions;
create policy "students edit own pending questions"
  on public.questions for update
  using (auth.uid() = created_by and status = 'pending');

drop policy if exists "admins moderate questions" on public.questions;
create policy "admins moderate questions"
  on public.questions for update using (public.is_admin());

drop policy if exists "admins delete questions" on public.questions;
create policy "admins delete questions"
  on public.questions for delete using (public.is_admin());

-- HANDOUTS (same pattern)
drop policy if exists "approved handouts are public" on public.handouts;
create policy "approved handouts are public"
  on public.handouts for select
  using (status = 'approved' or auth.uid() = uploaded_by or public.is_admin());

drop policy if exists "students submit handouts" on public.handouts;
create policy "students submit handouts"
  on public.handouts for insert
  with check (auth.uid() = uploaded_by and status = 'pending');

drop policy if exists "students edit own pending handouts" on public.handouts;
create policy "students edit own pending handouts"
  on public.handouts for update
  using (auth.uid() = uploaded_by and status = 'pending');

drop policy if exists "admins moderate handouts" on public.handouts;
create policy "admins moderate handouts"
  on public.handouts for update using (public.is_admin());

drop policy if exists "admins delete handouts" on public.handouts;
create policy "admins delete handouts"
  on public.handouts for delete using (public.is_admin());

-- ============================================================
-- SEED: VU BSCS Semester 1 (official study scheme, verified
-- from vu.edu.pk/academicprograms/studyscheme?sp=computer_science)
-- ============================================================
insert into public.subjects (code, title, semester, course_type, credit_hours) values
  ('CS101',   'Introduction to Computing',              1, 'required',   3),
  ('CS201',   'Introduction to Programming',            1, 'required',   3),
  ('CS201P',  'Introduction to Programming (Practical)',1, 'required',   1),
  ('ENG101',  'English Comprehension',                  1, 'required',   3),
  ('MTH202',  'Discrete Mathematics',                   1, 'required',   3),
  ('MTH5101', 'Calculus I',                             1, 'required',   3),
  ('VU001',   'Introduction to e-Learning',             1, 'required',   1),
  ('ECO401',  'Economics',                              1, 'elective',   3),
  ('MCM101',  'Introduction to Mass Communication',     1, 'elective',   3),
  ('PSY101',  'Introduction to Psychology',             1, 'elective',   3),
  ('SOC101',  'Introduction to Sociology',              1, 'elective',   3),
  ('MTH100',  'General Mathematics',                    1, 'deficiency', 3)
on conflict (code) do nothing;

-- ============================================================
-- AFTER YOU SIGN UP: make yourself admin (replace the email)
-- update public.profiles set is_admin = true
--   where username = 'your-email-prefix';
-- ============================================================
