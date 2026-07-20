-- daddysomm Phase 2 schema
-- Run in Supabase SQL editor. Identity lives in Clerk; users are synced here
-- via webhook so admin queries can join against domain data.

create table users (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text unique not null,
  email text unique not null,
  display_name text,
  -- bottle exclusion preferences (combinable)
  no_red boolean not null default false,
  no_white boolean not null default false,
  no_sparkling boolean not null default false,
  -- investment bottle: opting out swaps in a 12th regular bottle
  investment_bottle_opt_out boolean not null default false,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table drops (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  theme text,
  description text,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'closed', 'completed')),
  confirmation_deadline timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table drop_wines (
  id uuid primary key default gen_random_uuid(),
  drop_id uuid not null references drops(id) on delete cascade,
  name text not null,
  producer text,
  region text,
  vintage text,
  colour text check (colour in ('red', 'white', 'sparkling', 'rose', 'orange')),
  is_investment boolean not null default false,
  sort_order int not null default 0
);

create table confirmations (
  id uuid primary key default gen_random_uuid(),
  drop_id uuid not null references drops(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  -- snapshot of preferences at time of confirmation
  no_red boolean not null default false,
  no_white boolean not null default false,
  no_sparkling boolean not null default false,
  investment_bottle_opt_out boolean not null default false,
  confirmed_at timestamptz not null default now(),
  unique (drop_id, user_id)
);

create table wine_notes (
  id uuid primary key default gen_random_uuid(),
  drop_id uuid not null references drops(id) on delete cascade,
  body text not null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  unique (drop_id)
);

-- indexes for the admin panel's core query:
-- "who confirmed for this drop, with what preferences"
create index idx_confirmations_drop on confirmations(drop_id);
create index idx_confirmations_user on confirmations(user_id);
create index idx_drop_wines_drop on drop_wines(drop_id);

-- RLS: enabled, no policies. All access goes through the Next.js server
-- using the service role key. Nothing is exposed client-side.
alter table users enable row level security;
alter table drops enable row level security;
alter table drop_wines enable row level security;
alter table confirmations enable row level security;
alter table wine_notes enable row level security;
