-- Dawati · Postgres schema (Supabase)
-- Run this in the Supabase SQL editor or via `psql $DATABASE_URL -f schema.sql`.
-- Idempotent: safe to re-run.

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- =============================================================
-- USERS (Supabase auth.users is the source of truth — we add profile)
-- =============================================================
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  display_name  text,
  phone         text,
  prefer_whatsapp boolean default true,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table public.profiles enable row level security;
create policy "own profile read"  on public.profiles for select using (auth.uid() = id);
create policy "own profile write" on public.profiles for update using (auth.uid() = id);
create policy "own profile insert" on public.profiles for insert with check (auth.uid() = id);

-- =============================================================
-- ORDERS (the intake form submission, before / during design)
-- =============================================================
create table if not exists public.orders (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references auth.users(id) on delete set null,
  status        text not null default 'pending_payment'
                check (status in ('pending_payment','paid','in_design','delivered','cancelled','refunded')),
  tier          text not null
                check (tier in ('mumayyaza','fakhira','malakiyya')),
  addons        text[] default '{}',
  total_sar     numeric(10,2) not null,
  intake        jsonb not null,                -- full OrderDraft snapshot
  payment_ref   text,                          -- moyasar payment id
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index if not exists orders_user_idx on public.orders(user_id);
create index if not exists orders_status_idx on public.orders(status);

alter table public.orders enable row level security;
create policy "own orders read"  on public.orders for select using (auth.uid() = user_id);
create policy "own orders insert" on public.orders for insert with check (auth.uid() = user_id);
-- updates locked to service-role (Workers) only

-- =============================================================
-- CARDS (the actual delivered invitation)
-- =============================================================
create table if not exists public.cards (
  id                    uuid primary key default uuid_generate_v4(),
  slug                  text unique not null,
  order_id              uuid not null references public.orders(id) on delete cascade,
  user_id               uuid references auth.users(id) on delete set null,
  template_id           text not null,         -- e.g., 'wedding-cosmos-v1'
  data                  jsonb not null,        -- CardData
  rsvp_enabled          boolean default true,
  rsvp_admin_pass_hash  text not null,         -- bcrypt
  is_published          boolean default false,
  published_at          timestamptz,
  expires_at            timestamptz,
  view_count            integer default 0,
  rendered_html_url     text,                  -- R2 URL
  rendered_og_url       text,                  -- R2 URL
  created_at            timestamptz default now(),
  updated_at            timestamptz default now()
);

create index if not exists cards_user_idx on public.cards(user_id);
create index if not exists cards_slug_idx on public.cards(slug);
create index if not exists cards_published_idx on public.cards(is_published, expires_at);

alter table public.cards enable row level security;
create policy "own cards read"  on public.cards for select using (auth.uid() = user_id);
-- Public cards readable via the Worker using service role; no public RLS policy.

-- =============================================================
-- RSVPS (guest responses)
-- =============================================================
create table if not exists public.rsvps (
  id          uuid primary key default uuid_generate_v4(),
  card_id     uuid not null references public.cards(id) on delete cascade,
  guest_name  text not null,
  attend      text not null check (attend in ('yes','no')),
  message     text,
  qr_token    text,                            -- unique per guest (for door scan)
  ts          timestamptz default now(),
  ip          inet,                            -- anonymized after 30d (job)
  user_agent  text,
  country     text(2),
  checked_in_at timestamptz                    -- when scanned at the door
);

create index if not exists rsvps_card_idx on public.rsvps(card_id, ts desc);
create index if not exists rsvps_attend_idx on public.rsvps(card_id, attend);

alter table public.rsvps enable row level security;
-- Card owners can read their own card's rsvps:
create policy "card owner reads rsvps" on public.rsvps for select
  using (exists (select 1 from public.cards c where c.id = card_id and c.user_id = auth.uid()));
-- Writes are service-role only (from the Worker).

-- =============================================================
-- GUEST_LINKS (Fakhira/Malakiyya: per-guest personalised URL + QR)
-- =============================================================
create table if not exists public.guest_links (
  id          uuid primary key default uuid_generate_v4(),
  card_id     uuid not null references public.cards(id) on delete cascade,
  token       text unique not null,            -- short, URL-safe, e.g. nanoid(10)
  guest_name  text,
  guest_phone text,
  group_name  text,                            -- 'VIP', 'عائلة العريس', ...
  table_number integer,
  rsvp_id     uuid references public.rsvps(id) on delete set null,
  created_at  timestamptz default now()
);

create index if not exists guest_links_card_idx on public.guest_links(card_id);

-- =============================================================
-- REFERRALS (loyalty system, Phase 1.5)
-- =============================================================
create table if not exists public.referrals (
  id            uuid primary key default uuid_generate_v4(),
  referrer_user_id uuid not null references auth.users(id) on delete cascade,
  code          text unique not null,           -- short share code
  uses_count    integer default 0,
  total_credit_sar numeric(10,2) default 0,
  created_at    timestamptz default now()
);

-- =============================================================
-- AUDIT LOG (operator actions on customer data)
-- =============================================================
create table if not exists public.audit_log (
  id        uuid primary key default uuid_generate_v4(),
  actor_id  uuid references auth.users(id) on delete set null,
  action    text not null,
  target    text,
  payload   jsonb,
  ts        timestamptz default now()
);

-- =============================================================
-- Triggers — keep updated_at fresh
-- =============================================================
create or replace function public.touch_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();

drop trigger if exists orders_touch on public.orders;
create trigger orders_touch before update on public.orders
  for each row execute function public.touch_updated_at();

drop trigger if exists cards_touch on public.cards;
create trigger cards_touch before update on public.cards
  for each row execute function public.touch_updated_at();
