-- ============================================================
-- BSCS VAULT — v3 migration: account deletion (GDPR-style)
--
-- Run ONCE in Supabase → SQL Editor → New query → Run.
-- Lets a logged-in student delete their OWN account row from
-- profiles (cascades handled by DB). Auth user removal itself
-- is done via the Supabase JS SDK in the app.
-- ============================================================

drop policy if exists "users delete own profile" on public.profiles;
create policy "users delete own profile"
  on public.profiles for delete
  using (auth.uid() = id);
