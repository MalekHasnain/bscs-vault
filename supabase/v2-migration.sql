-- ============================================================
-- BSCS VAULT — v2 migration: user dashboards & profile pics
--
-- Run ONCE in Supabase → SQL Editor → New query → Run.
-- (Requires schema.sql to have been run first.)
-- Adds: avatar_url column on profiles + an 'avatars' storage
-- bucket with security policies (users can only touch their
-- own folder; everyone can view avatars).
-- ============================================================

-- 1. Avatar column
alter table public.profiles
  add column if not exists avatar_url text;

-- 2. Avatars storage bucket (public read)
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- 3. Storage policies: anyone can view, owner can upload/update
drop policy if exists "avatar public read" on storage.objects;
create policy "avatar public read"
  on storage.objects for select
  using (bucket_id = 'avatars');

drop policy if exists "avatar owner insert" on storage.objects;
create policy "avatar owner insert"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "avatar owner update" on storage.objects;
create policy "avatar owner update"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Done. The "users update own profile" policy from schema.sql
-- already allows saving profiles.avatar_url.
