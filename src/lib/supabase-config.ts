// Supabase config — environment variables only.
// Set these in Vercel: Project → Settings → Environment Variables.
// (Values also live in .env.local for local dev — git-ignored.)

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
