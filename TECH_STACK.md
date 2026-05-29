# Tech Stack · دعوتي

> Locked choices with rationale. Anything not listed here = not yet decided / not in MVP.

---

## Core

| Layer | Choice | Version | Why |
|---|---|---|---|
| Runtime / language | **Node 22 LTS** + TypeScript 5.7 strict | — | Long-term LTS; strict TS catches the Arabic-name edge cases early |
| Web framework | **Next.js 15.x (App Router)** | 15 | RSC for fast Arabic SSR, native ISR for cards, Edge runtime support |
| Styling | **Tailwind CSS 4** + CSS Modules (for the card markup only) | 4 | Utility-first for chrome; module CSS for the organic card layout |
| Package manager | **pnpm** | 10+ | Faster installs, strict peer deps, monorepo-ready |
| Hosting (main app) | **Vercel** | — | Zero-config Next.js, edge functions, free tier covers MVP |

---

## Backend (card serving + RSVPs)

| Concern | Choice | Why |
|---|---|---|
| Card hosting | **Cloudflare Workers + KV** | Edge-fast (read-anywhere), ~free at our scale, proven by the Nuwairi card |
| RSVP storage | **Supabase Postgres** (with Worker → Supabase REST API for writes) | Real-time subscriptions for the admin dashboard, RLS for per-customer isolation |
| Card asset storage (OG JPGs, future photos) | **Cloudflare R2** | S3-compatible, no egress fees, same Cloudflare account as Workers |
| File rendering (OG image gen) | **`@vercel/og`** for MVP; **Cloudflare Browser Rendering** if we need real DOM (Phase 2) | `@vercel/og` is React-based and 30ms cold start |
| Background jobs (publish card, generate OG, send confirmation email) | **Vercel Cron** + **Supabase Edge Functions** | No separate queue infra; sufficient for MVP volume |

---

## Auth & data

| Concern | Choice | Why |
|---|---|---|
| Authentication | **Supabase Auth** (magic link only at MVP) | One less surface; Saudi users prefer email link over passwords |
| Database | **Supabase Postgres** + Drizzle ORM | Drizzle = SQL-first, type-safe, no overhead vs raw queries |
| Validation | **Zod** | Standard, integrates with React Hook Form and tRPC if we add it |
| Forms | **React Hook Form** + Zod resolver | Best Arabic RTL support, controlled inputs work cleanly |

---

## Payment & comms

| Concern | Choice | Why |
|---|---|---|
| Payment (primary) | **Moyasar** | Saudi-native: Mada, Apple Pay, STC Pay, Visa/MC. Saudi CR required. |
| Payment (backup, intl.) | **Stripe** (via Atlas if needed) | For non-KSA customers — Phase 3 |
| Transactional email | **Resend** | Modern API, decent MEA deliverability, RTL HTML emails work |
| WhatsApp share helper (Phase 2) | **wa.me** deep links with pre-formatted text | Free, no API needed |
| WhatsApp Business API (Phase 3) | **Twilio** or **360dialog** | When we add automated guest reminders |

---

## Observability

| Concern | Choice | Why |
|---|---|---|
| Analytics (privacy-first) | **Plausible Self-Hosted** or **Vercel Analytics** | No cookie banner needed under PDPL/GDPR; lightweight script |
| Error monitoring | **Sentry** | Sourcemap support, alerts to Slack/email |
| Logs | **Vercel logs** + **Cloudflare Logpush** to R2 | Free, sufficient for MVP |
| Uptime | **UptimeRobot** | Free 5-min checks |

---

## Local dev

| Need | Tool |
|---|---|
| Hot reload | `pnpm dev` (Next.js) |
| Supabase locally | `supabase start` (Docker required) |
| Worker locally | `wrangler dev --remote` (use real KV to avoid local divergence) |
| Linting | **Biome** (replaces ESLint + Prettier) — fast, single tool |
| Type checking | `tsc --noEmit` in CI |
| Pre-commit | **lefthook** running biome + tsc on staged files |

---

## Dependencies we'll add (and won't)

### Will add
- `@supabase/ssr` `@supabase/supabase-js` — auth + queries
- `drizzle-orm` `drizzle-kit` `postgres` — DB layer
- `zod` `react-hook-form` `@hookform/resolvers` — forms
- `@vercel/og` — OG image generation
- `lucide-react` — icons (filtered to only what we need; not all Lucide icons match the Arabic aesthetic)
- `@umalqura/core` — Hijri date conversion
- `clsx` `tailwind-merge` — class composition
- `framer-motion` — only for the configurator transitions; the card itself uses CSS + canvas (no React state churn during animations)
- `nanoid` — short URL slug generation
- `bcryptjs` — password hashing for per-card admin password
- `resend` — email
- `moyasar` (or build a small wrapper) — payment

### Won't add (resist temptation)
- Component libraries (shadcn, MUI, Chakra) — the card has its own aesthetic; the admin UI is simple enough to hand-craft in Tailwind
- Animation libraries beyond Framer Motion — the card already animates via raw canvas + CSS
- State management (Redux, Zustand) — RSC + URL state + form state is enough for MVP
- GraphQL — REST/RPC via Next.js route handlers covers everything

---

## Environment variables (initial set)

```env
# Public (NEXT_PUBLIC_* are bundled in client JS — only put non-secrets here)
NEXT_PUBLIC_APP_URL=https://da3wati.com
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<from supabase dashboard>
NEXT_PUBLIC_MOYASAR_PUBLISHABLE_KEY=<from moyasar>
NEXT_PUBLIC_WORKER_API_URL=https://dawati-api.<account>.workers.dev

# Server-only
SUPABASE_SERVICE_ROLE_KEY=<from supabase — never expose>
MOYASAR_SECRET_KEY=<from moyasar — server side webhook verification>
MOYASAR_WEBHOOK_SECRET=<random>
RESEND_API_KEY=<from resend>
CLOUDFLARE_API_TOKEN=<scoped: Workers + KV + R2 write>
CLOUDFLARE_ACCOUNT_ID=<id>
CLOUDFLARE_KV_NAMESPACE_ID=<id>
DATABASE_URL=postgres://...  # Drizzle direct connection
SENTRY_DSN=<from sentry>
```

`.env.example` shipped in `app/` — duplicate to `.env.local` and fill.

---

## Deployment topology

```
User browser
   │
   ├─→ da3wati.com (Vercel · Next.js)
   │       ├─ marketing pages
   │       ├─ configurator
   │       ├─ checkout
   │       ├─ customer dashboard
   │       └─ admin (operator) console
   │
   ├─→ da3wati.com/c/<slug>  (Vercel rewrite → Cloudflare Worker)
   │       └─ Worker serves the rendered card HTML from KV
   │
   └─→ dawati-api.<account>.workers.dev/api/...
           ├─ POST /api/rsvp/<slug>     → writes to Supabase via service role
           └─ GET  /api/admin/<slug>    → Basic auth, reads from Supabase
```

The Worker is the *only* surface the public card touches. Supabase service role key lives in the Worker secret (`wrangler secret put`). Cards are statically rendered React → HTML → stored in KV at publish time, so the Worker doesn't need to do React rendering at request time.

---

## Why not [X]?

- **Astro / Remix:** Next.js wins on Vercel integration + RSC + the team being one person
- **Cloudflare Pages instead of Vercel for everything:** Pages doesn't yet have the same Next.js fidelity (image opt, ISR) — re-evaluate at Phase 3
- **Self-hosted Postgres:** Supabase Auth + storage + realtime in one is too good to pass up at MVP
- **Firebase:** vendor lock-in is worse than Supabase, and Firestore's data model fights us on RSVP queries
- **PayPal:** ~no Saudi penetration, weak Mada support

---

## Versioning / migrations

- Database: Drizzle migrations under `app/src/db/migrations/`. Apply via `drizzle-kit push` in CI.
- Card template versioning: each card record stores `template_id` (e.g. `"wedding-cosmos-v1"`). If we ever change the template substantively, we mint a `v2` and old cards keep rendering at `v1`. Never mutate a deployed template.

---

## Performance budget

- LCP < 2.0s on 4G in Riyadh
- Total card page size < 200KB (excluding fonts)
- Fonts: 4 Google Font families = ~120KB. Worth it; self-host with `next/font` if first paint becomes an issue.
- No images on the card itself (all SVG inline) → no waterfalls
- OG JPG < 80KB
