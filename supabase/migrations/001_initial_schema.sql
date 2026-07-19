-- H Infinity demo schema
-- Run in a new Supabase project, then create an initial cohort with status application_open.

create extension if not exists pgcrypto;

create type cohort_status as enum ('draft', 'application_open', 'application_closed', 'active', 'completed', 'archived');
create type application_status as enum ('submitted', 'eligibility_check', 'under_review', 'shortlisted', 'interview', 'accepted', 'waitlisted', 'rejected', 'withdrawn', 'confirmed');

create table public.people (
  id uuid primary key default gen_random_uuid(),
  primary_email text not null unique,
  chinese_name text,
  english_name text,
  preferred_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.cohorts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  year_label text not null,
  theme text,
  application_open_at timestamptz,
  application_close_at timestamptz,
  programme_start_at timestamptz,
  programme_end_at timestamptz,
  status cohort_status not null default 'draft',
  created_at timestamptz not null default now()
);

create table public.application_drafts (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references public.people(id) on delete cascade,
  cohort_id uuid not null references public.cohorts(id) on delete cascade,
  verified_email text not null,
  resume_token_hash text not null unique,
  current_step integer not null default 0,
  draft_data jsonb not null default '{}'::jsonb,
  last_saved_at timestamptz not null default now(),
  expires_at timestamptz not null,
  submitted_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references public.people(id),
  cohort_id uuid not null references public.cohorts(id),
  draft_id uuid unique references public.application_drafts(id),
  status application_status not null default 'submitted',
  submitted_at timestamptz not null default now(),
  final_snapshot jsonb not null,
  schema_version text not null,
  reference_number text not null unique,
  source text,
  internal_tags text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.consents (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references public.people(id),
  application_id uuid references public.applications(id),
  consent_type text not null,
  notice_version text not null,
  granted boolean not null,
  granted_at timestamptz not null default now(),
  withdrawn_at timestamptz
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  reviewer_user_id uuid not null,
  scores jsonb not null default '{}'::jsonb,
  comments text,
  recommendation text,
  submitted_at timestamptz
);

create table public.participants (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references public.people(id),
  cohort_id uuid not null references public.cohorts(id),
  application_id uuid references public.applications(id),
  participant_status text not null default 'confirmed',
  completion_status text,
  created_at timestamptz not null default now(),
  unique(person_id, cohort_id)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references public.cohorts(id),
  slug text not null unique,
  title text not null,
  summary text,
  content jsonb not null default '{}'::jsonb,
  public_visibility boolean not null default false,
  created_at timestamptz not null default now()
);

-- Deny public browser access by default. API routes use the server-only service role.
alter table public.people enable row level security;
alter table public.cohorts enable row level security;
alter table public.application_drafts enable row level security;
alter table public.applications enable row level security;
alter table public.consents enable row level security;
alter table public.reviews enable row level security;
alter table public.participants enable row level security;
alter table public.projects enable row level security;

-- Public can read only published project portfolio records.
create policy "published projects are public" on public.projects for select using (public_visibility = true);

-- Example seed cohort. Update dates before production.
insert into public.cohorts (title, year_label, theme, application_open_at, application_close_at, status)
values ('H Infinity Next Cohort', '2026–27', 'Ideas in Motion', now(), now() + interval '90 days', 'application_open');
