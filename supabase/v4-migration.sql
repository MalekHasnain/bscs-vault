-- ============================================================
-- BSCS VAULT — v4 migration: Blog + full BSCS study scheme
--
-- Paste this whole file into: Supabase Dashboard → SQL Editor →
-- New query → Run. Safe to re-run (idempotent).
-- Supersedes blog-migration.sql (everything is included here).
-- ============================================================

-- ============================================================
-- PART 1 — BLOG
-- ============================================================

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null,
  cover_image_url text,
  tags text[] not null default '{}',
  meta_title text,
  meta_description text,
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  published_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_status_idx on public.posts(status);
create index if not exists posts_published_idx on public.posts(published_at desc);

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_updated_at on public.posts;
create trigger posts_updated_at
  before update on public.posts
  for each row execute procedure public.handle_updated_at();

alter table public.posts enable row level security;

drop policy if exists "published posts are public" on public.posts;
create policy "published posts are public"
  on public.posts for select
  using (status = 'published' or public.is_admin());

drop policy if exists "admins insert posts" on public.posts;
create policy "admins insert posts"
  on public.posts for insert with check (public.is_admin());

drop policy if exists "admins update posts" on public.posts;
create policy "admins update posts"
  on public.posts for update using (public.is_admin());

drop policy if exists "admins delete posts" on public.posts;
create policy "admins delete posts"
  on public.posts for delete using (public.is_admin());

-- ============================================================
-- PART 2 — FULL BSCS STUDY SCHEME (semesters 2–8)
-- Semester 1 is already seeded. Codes that exist are skipped.
-- ============================================================

insert into public.subjects (code, title, semester, course_type, credit_hours) values
  -- Semester 2
  ('CS302',  'Digital Logic Design',                       2, 'required',   3),
  ('ENG201', 'Business and Technical English Writing',     2, 'required',   3),
  ('STA301', 'Statistics and Probability',                 2, 'required',   3),
  ('MTH104', 'Sets and Logic',                             2, 'deficiency', 3),
  ('PAK302', 'Pakistan Studies',                           2, 'required',   2),
  ('ETH202', 'Ethics (for Non-Muslims)',                   2, 'elective',   2),
  ('ISL202', 'Islamic Studies',                            2, 'elective',   2),
  -- Semester 3
  ('CS301',  'Data Structures',                            3, 'required',   3),
  ('CS304',  'Object Oriented Programming',                3, 'required',   3),
  ('CS601',  'Data Communication',                         3, 'required',   3),
  ('MCM301', 'Communication Skills',                       3, 'required',   3),
  ('MTH401', 'Differential Equations',                     3, 'required',   3),
  ('CS301P', 'Data Structures (Practical)',                3, 'required',   1),
  ('CS304P', 'Object Oriented Programming (Practical)',    3, 'required',   1),
  -- Semester 5
  ('CS306',  'Introduction to Python',                     5, 'required',   3),
  ('CS402',  'Theory of Automata',                         5, 'required',   3),
  ('CS502',  'Fundamentals of Algorithms',                 5, 'required',   3),
  ('CS604',  'Operating Systems',                          5, 'required',   3),
  ('CSI619', 'Field Experience / Internship',              5, 'required',   3),
  ('MTH603', 'Numerical Analysis',                         5, 'required',   3),
  ('CS202',  'Fundamentals of Front End Development',      5, 'elective',   3),
  ('CS605',  'Software Engineering-II',                    5, 'elective',   3),
  ('CS610',  'Computer Networks',                          5, 'elective',   3),
  -- Semester 6
  ('CS411',  'Visual Programming',                         6, 'required',   3),
  ('CS501',  'Advanced Computer Architecture',             6, 'required',   3),
  ('CS602',  'Computer Graphics',                          6, 'required',   3),
  ('CS607',  'Artificial Intelligence',                    6, 'required',   3),
  ('CS314',  'Introduction to Cellular Networks',          6, 'elective',   3),
  ('CS405',  'Database Programming using Oracle 11g',      6, 'elective',   3),
  ('CS603',  'Software Architecture and Design',           6, 'elective',   3),
  -- Semester 7
  ('CS619',  'Final Project',                              7, 'required',   3),
  ('CS515',  'Advanced Database Management System',        7, 'required',   3),
  ('CS609',  'System Programming',                         7, 'required',   3),
  ('CS621',  'Parallel and Distributed Computing',         7, 'required',   3),
  ('MGT502', 'Organizational Behaviour',                   7, 'elective',   3),
  ('MGT610', 'Business Ethics',                            7, 'elective',   3),
  -- Semester 8
  ('CS205',  'Information Security',                       8, 'required',   3),
  ('CS606',  'Compiler Construction',                      8, 'required',   3),
  ('CS311',  'Introduction to Web Services Development',   8, 'elective',   3),
  ('CS407',  'Routing and Switching',                      8, 'elective',   3),
  ('CS408',  'Human Computer Interaction',                 8, 'elective',   3),
  ('CS435',  'Cloud Computing',                            8, 'elective',   3),
  ('CS506',  'Web Design and Development',                 8, 'elective',   3),
  ('CS611',  'Software Quality Engineering',               8, 'elective',   3),
  ('CS614',  'Data Warehousing',                           8, 'elective',   3)
on conflict (code) do nothing;
