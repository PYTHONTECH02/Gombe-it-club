# Gombe SS ICT Club Website

A full-featured web portal for Gombe Senior Secondary School's ICT Club — rebuilt from a static HTML site into a React + Supabase app with auth, role-based access, and synced student progress.

## Run & Operate

- `pnpm --filter @workspace/gombe-ict-club run dev` — run the frontend (port assigned by workflow)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite, Tailwind CSS, wouter (routing)
- Backend/Auth/DB: Supabase (auth, PostgreSQL, Storage)
- Design system: Neubrutalism 2.0 (Bebas Neue + Space Grotesk fonts)
- No internal API needed — all data goes through Supabase client

## Where things live

- `artifacts/gombe-ict-club/src/` — React frontend
- `artifacts/gombe-ict-club/src/lib/supabase.ts` — Supabase client
- `artifacts/gombe-ict-club/src/contexts/AuthContext.tsx` — auth context + useAuth hook
- `artifacts/gombe-ict-club/src/pages/` — all page components

## Supabase Configuration

- Supabase URL: stored in `VITE_SUPABASE_URL` env var
- Anon Key: stored in `VITE_SUPABASE_ANON_KEY` env var
- Google Client ID: `VITE_GOOGLE_CLIENT_ID`
- Super Admin Email: `VITE_SUPER_ADMIN_EMAIL` (hpro453176@gmail.com)

## Supabase Tables Required

Create these tables in the Supabase dashboard:

```sql
-- User profiles + roles
create table profiles (
  id uuid references auth.users primary key,
  email text,
  full_name text,
  role text default 'student', -- 'super_admin' | 'admin' | 'student'
  avatar_url text,
  created_at timestamptz default now()
);

-- Gaming sessions
create table gaming_sessions (
  id uuid primary key default gen_random_uuid(),
  console text, -- 'ps4' or 'ps5'
  day int,
  month text,
  year int,
  title text,
  time text,
  created_at timestamptz default now()
);

-- Announcements
create table announcements (
  id uuid primary key default gen_random_uuid(),
  tag text, -- 'urgent' | 'event' | 'update' | 'info'
  title text,
  body text,
  created_at timestamptz default now()
);

-- Officers / Members
create table officers (
  id uuid primary key default gen_random_uuid(),
  role_title text,
  name text,
  class_year text,
  bio text,
  skills text[],
  color text,
  sort_order int default 0
);

-- Coding progress
create table coding_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  track_id text, -- 'beginner' | 'intermediate' | 'pro'
  lesson_idx int,
  completed_at timestamptz default now()
);

-- Coding exam scores
create table coding_exam_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  track_id text,
  score int,
  grade text,
  taken_at timestamptz default now()
);

-- Cyber progress
create table cyber_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  track_id text, -- 'recon' | 'defence' | 'attack'
  lesson_idx int,
  completed_at timestamptz default now()
);

-- Cyber exam scores
create table cyber_exam_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  track_id text,
  score int,
  grade text,
  taken_at timestamptz default now()
);
```

Also enable Row Level Security (RLS) on all tables and add policies as appropriate.

## Role Hierarchy

- **Super Admin** (hpro453176@gmail.com) — manages who is admin, full access
- **Admin** — can create/edit/delete gaming sessions, announcements, officers
- **Student** — read-only on admin pages, tracks own lesson/exam progress

## Auth

- Email + password sign-up/sign-in
- Google OAuth (Google Client ID in VITE_GOOGLE_CLIENT_ID)
- Password reset via Supabase email

## Architecture Decisions

- Supabase used instead of internal DB to allow easy static hosting (InfinityFree)
- No internal API server needed for the frontend — Supabase client handles all data
- Role stored in `profiles` table; super_admin auto-assigned by email check on signup
- Lesson progress stored per-user in Supabase (replaces old localStorage approach)
- App can be built with `pnpm --filter @workspace/gombe-ict-club run build` then upload `dist/public` to InfinityFree

## Hosting Notes

For InfinityFree deployment:
1. Run `pnpm --filter @workspace/gombe-ict-club run build`
2. Upload contents of `artifacts/gombe-ict-club/dist/public/` to InfinityFree
3. The app is fully static (no server needed) — Supabase handles all backend

## User Preferences

- Keep design system exact: Neubrutalism 2.0, Bebas Neue + Space Grotesk fonts
- Admin pages: editable by admin/super_admin roles only
- No emojis in navigation or UI elements
- Easy to host on InfinityFree (static build, upload-to-deploy)

## Gotchas

- Always set VITE_ prefix on env vars used in the frontend
- Google OAuth redirect URL must be added to Supabase auth settings: https://mrlftterlytsjiczkcgy.supabase.co
- For InfinityFree: configure .htaccess to redirect all routes to index.html (SPA routing)
