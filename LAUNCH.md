# BSCS Vault — Launch Guide

A free, community-driven study site for Virtual University BSCS students:
handout links, past-paper questions (MCQ / short / long), and an interactive
MCQ practice engine. Students sign up → submit → admin approves → everyone
benefits.

**Stack:** Next.js 16 (App Router) · Supabase (database + auth) · Tailwind CSS
v4 · TypeScript. Total cost: **$0/month** (Vercel Hobby + Supabase Free).

---

## Your 15-minute launch checklist (MALIK)

You do these once. No coding needed — everything is copy-paste.

### 1. Create the Supabase project (~5 min)

1. Go to https://supabase.com → **Sign up** (free plan, no card needed).
2. **New project** → name it `bscs-vault` → set a database password (save it
   somewhere safe) → region: choose the closest (e.g. Singapore / Frankfurt)
   → **Create**. Wait ~2 min for provisioning.
3. When ready, open **SQL Editor → New query**.
4. Open `supabase/schema.sql` from this project, **copy everything**, paste
   into the query box, click **Run**. It will create all 4 tables, security
   rules (RLS), and seed the 12 official VU semester-1 subjects.
5. Copy your keys: **Project Settings → API**:
   - `Project URL` → that's `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → that's `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Point the app at your database (~1 min)

Create a file named `.env.local` in the project root (`~/jarvis/bscs-vault/`)
with exactly two lines:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Test locally (~2 min)

```bash
cd ~/jarvis/bscs-vault
npm run build && npm start
```

Open http://localhost:3000 — you should see the BSCS Vault homepage with the
subject counts working.

### 4. Make yourself admin (~2 min)

1. On the site, click **Login → Create an account** (use your real email —
   confirm the email Supabase sends you).
2. Back in Supabase → **SQL Editor**, run:

```sql
update public.profiles set is_admin = true where username = 'your-username';
```

(Use the username you signed up with — you can check it in the **Table
Editor → profiles** table. Re-open the site; the **Admin** link appears in
the header.)

### 5. Deploy to Vercel (free) (~5 min)

1. Push the code to GitHub:

```bash
cd ~/jarvis/bscs-vault
git add -A && git commit -m "BSCS Vault v1"
# create an empty repo on github.com first, then:
git remote add origin https://github.com/YOUR-USERNAME/bscs-vault.git
git branch -M main
git push -u origin main
```

2. https://vercel.com → sign up with GitHub → **Add New → Project** → import
   `bscs-vault`.
3. When prompted for **Environment Variables**, add the same two variables
   from step 2 (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. **Deploy**. In ~2 minutes you get a live URL like
   `bscs-vault.vercel.app`. You can attach a custom domain later (free on
   Vercel): Project → Settings → Domains.

### 6. One Supabase setting after going live

**Authentication → URL Configuration**: set **Site URL** to your Vercel URL
and add `http://localhost:3000` to **Redirect URLs**. This makes
confirmation/login emails link back to the right place.

---

## How the site works

| Page | Route | What it does |
|---|---|---|
| Home | `/` | Hero + live counts of subjects/questions |
| Subjects | `/subjects` | Official VU sem-1 study scheme, grouped by semester |
| Subject detail | `/subjects/CS101` | Handouts + short/long questions with collapsible answers; link to practice |
| Practice | `/practice` | Interactive MCQ quiz: pick subject → N questions → instant right/wrong feedback → score summary with review |
| Submit | `/submit` | Login required. 4 tabs: MCQ / Short / Long / Handout link |
| Login / Signup | `/login` | Email + password auth (Supabase). Username shown on submissions |
| Admin | `/admin` | Moderation queue (approve/reject/delete) + Add Subject form |

**Moderation flow:** student submits → status `pending` → visible ONLY to
them and admins → admin approves → live for everyone. RLS (row-level
security) enforces all of this at the database level — even a bug in the app
can't leak unapproved content or let students edit each other's data.

**Adding semester 2+ subjects:** Admin → Add Subject (code, title, semester,
type). The subjects page groups automatically by semester.

## Where things live

```
~/jarvis/bscs-vault/
├── supabase/schema.sql          ← the ONE file you paste into Supabase
├── src/
│   ├── proxy.ts                  ← auth guard + session refresh (Next 16's "middleware")
│   ├── lib/
│   │   ├── database.types.ts     ← TypeScript types matching the schema
│   │   ├── supabase-browser.ts   ← client-side Supabase (forms, practice)
│   │   └── supabase-server.ts    ← server-side Supabase (pages, layouts)
│   ├── app/
│   │   ├── layout.tsx            ← header/nav/footer (shows Admin link if admin)
│   │   ├── page.tsx              ← home
│   │   ├── subjects/             ← list + [code] detail
│   │   ├── practice/page.tsx     ← MCQ engine
│   │   ├── submit/page.tsx       ← submission forms
│   │   ├── login/page.tsx        ← login/signup
│   │   ├── admin/                ← server guard + client dashboard
│   │   └── auth/                 ← callback + signout routes
```

## Budget: literally $0

| Service | Free tier | This site needs |
|---|---|---|
| Supabase | 500 MB DB, 50k MAU | 1 project, a few MB, low hundreds of users |
| Vercel Hobby | 100 GB bandwidth | A static-ish Next app — tiny |
| Total | | **$0 until thousands of users** |

When you outgrow free tiers (a good problem): Supabase Pro $25/mo or
self-host on your ASUS laptop via Tailscale + Cloudflare Tunnel.

## Security notes

- Row Level Security on every table; anon users can only read approved
  content.
- Students can only edit their own PENDING submissions; admins moderate.
- `.env.local` is git-ignored (check: `git check-ignore .env.local`).
- The anon key is designed to be public (like a username); RLS is the real
  security layer.
- Handouts are links (Google Drive etc.) for v1 — no file hosting on day
  one.

## v2 ideas (when v1 gains traction)

- Direct PDF upload to Supabase Storage with a 10 MB cap
- Attempt history / spaced repetition for practiced MCQs
- Leaderboard of top contributors (counts by username)
- Search across all questions
- Semester 2–8 subject catalogs as you reach them
- Telegram-style share buttons for each subject page
```
