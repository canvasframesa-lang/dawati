# HANDOFF · دعوتي / Dawati

> **For Hermes (هرمز):** This is your starting point. Read `PROJECT_BRIEF.md` first for vision/scope, then this doc for the *state of the codebase* and your next steps. Owner: Abdelrahman (عبدالرحمن). The reference build that validated the whole approach is in production at https://canvasframesa-lang.github.io/nuwairi-wedding/ — that is the visual & technical bar to meet for every card the platform produces. Verbatim copies of every file from that build are checked into this repo under `reference-templates/` so you don't need access to the original machine.

## 0. Get the code

```bash
git clone https://github.com/canvasframesa-lang/dawati.git
cd dawati
# everything in this doc is relative to the repo root
```

You won't need access to the original developer's machine — every file you need is in this repo, including the production wedding-card reference templates under `reference-templates/`. If anything appears missing, open an issue on the repo.

---

## 1. What this project is, in one paragraph

A SaaS that lets a Saudi/Sudanese/Gulf host fill a 30-minute form and receive a live, animated, RTL Arabic invitation card URL (with embedded RSVP form + real-time admin dashboard). Domain target: `da3wati.com` / `da3wati.sa` (brand: **دعوتي**). The first template (wedding) is already proven in production with the Nuwairi card — your job is to turn that one-off card into a multi-tenant SaaS.

---

## 2. State at handoff

### Already done in this folder
- `PROJECT_BRIEF.md` — full vision, target users, pricing, roadmap, lessons learned. **Read this first.**
- `DESIGN_SYSTEM.md` — extracted gold/cosmos/glass tokens from the Nuwairi card. Use these CSS custom properties verbatim — they were validated by real customers, do not invent new gold hexes.
- `TECH_STACK.md` — chosen stack with rationale (Next.js 15 + Cloudflare Workers + Supabase + Moyasar + Resend).
- `CULTURAL_NOTES.md` — Arabic-language and Islamic invitation conventions the platform must honor. **Read before touching any user-facing string.**
- `GOTCHAS.md` — non-obvious issues I hit during the Nuwairi build (Cloudflare account scope, CORS, backdrop-blur perf, gendered Arabic verbs, etc.). Saves you days.
- `reference-templates/` — verbatim copies of the production Nuwairi files. Treat as read-only source-of-truth for the card markup, OG image, admin UI, and RSVP Worker:
  - `01-card-template.html` — the card itself (the thing customers will configure variants of)
  - `02-og-template.html` — 1200×630 OG preview
  - `03-admin-template.html` — admin RSVP dashboard
  - `04-worker.js` — Cloudflare Worker handling POST /api/rsvp + GET /api/admin/rsvps
  - `05-wrangler.toml` — worker config (account/KV IDs are Nuwairi-specific — for Dawati you'll create fresh)
- `app/` — Next.js 15 scaffold (App Router + TypeScript + Tailwind + RTL). Detailed below.

### Not yet built — your queue (priority order)
1. **Supabase setup.** Create project, run the schema in `app/supabase/schema.sql` (yes — I left the SQL ready). Wire `@supabase/ssr` for auth.
2. **Auth (magic link only).** `app/src/app/(auth)/...`. Customers sign in with email → magic link.
3. **Cloudflare Worker for Dawati (multi-tenant).** Adapt `reference-templates/04-worker.js`. Key change: KV keys become `card:<slug>:rsvp:<id>` instead of a single per-namespace prefix. ADMIN_PASS per-card, hashed in Supabase.
4. **Card-render pipeline.** On publish, render the card HTML from the React component → push to Cloudflare KV (or R2) → serve via Worker. OG JPG generated via `@vercel/og` or Cloudflare Browser Rendering.
5. **Moyasar checkout.** `app/src/app/checkout/...`. Webhook → mark card published.
6. **Customer dashboard.** List of cards, RSVP counts, share buttons.
7. **More templates.** Eid, engagement, aqiqa, graduation. Each = a variant of the wedding template with different content slots + maybe palette.

---

## 3. Repo layout (after handoff)

```
<repo root>/
├── PROJECT_BRIEF.md         ← vision, scope, pricing, roadmap
├── HANDOFF.md               ← this file
├── DESIGN_SYSTEM.md
├── TECH_STACK.md
├── CULTURAL_NOTES.md
├── GOTCHAS.md
├── reference-templates/     ← verbatim copies of the production Nuwairi files
└── app/                     ← the Next.js project (this is the codebase)
    ├── package.json
    ├── next.config.ts
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── postcss.config.mjs
    ├── .env.example
    ├── README.md            ← dev quickstart for the Next.js app
    ├── supabase/
    │   └── schema.sql       ← run this when you create the Supabase project
    ├── public/
    │   └── fonts/           ← (optional) self-hosted Aref Ruqaa / Amiri for speed
    └── src/
        ├── app/             ← App Router pages
        │   ├── layout.tsx   ← global RTL + font loading
        │   ├── page.tsx     ← landing (DONE)
        │   ├── globals.css
        │   └── configure/   ← the configurator (DONE — skeleton)
        ├── components/
        │   ├── Card/        ← the parametrized invitation card (DONE)
        │   │   ├── Card.tsx
        │   │   ├── Card.module.css
        │   │   └── types.ts
        │   ├── Configurator/
        │   └── ui/
        └── lib/
            ├── types.ts     ← CardData, CardTemplate, etc.
            └── verses.ts    ← curated Quranic verses per occasion
```

---

## 4. Conventions the platform enforces

These are non-negotiable — they're why the Nuwairi card landed so well. Don't drift.

### Visual
- Cards always use the locked design tokens from `DESIGN_SYSTEM.md`. No new colors, no new fonts. If a customer asks for a different palette, add it as a *template variant* — don't override per-card.
- Body text inside the white frosted glass: pure `#000` with a cream `text-shadow` halo. Never navy. Never gray.
- Glass opacity ~0.55 with `backdrop-filter: blur(20px) saturate(1.5)`. More blur = pretty but hides the petal animation. Less blur = unreadable text. Stay in the 18–22px range.
- Gold-gradient text (`background-clip:text` + transparent fill) must have `text-shadow: none` — otherwise the inherited halo paints a bright blob behind invisible text.
- Boxed sections (rounded gold tint cards around verse / details / form) were *rejected* in user testing. Use hairlines + typography hierarchy.

### Content
- Bride's first name does **not** appear in the prose invitation line. Use `كَريمة آل [father's family] بنت [father's full name]`. Her first name lives only in the centerpiece. (See `CULTURAL_NOTES.md` for full conventions.)
- All Arabic text gets tashkeel (diacritics): "يَتَشَرَّفُ" not "يتشرف".
- Quranic verses are sourced from a curated library (`src/lib/verses.ts`) — customers select, never free-type. Use Tanzil text with diacritics.
- Hijri + Gregorian dates always shown side by side. Compute Hijri server-side with `@umalqura/core` or similar.
- Sender voice (groom / bride / families) flips gendered verbs throughout the card. `data.sender_voice: 'groom' | 'bride' | 'families'`.

### Code
- TypeScript strict mode on. `noUncheckedIndexedAccess: true`.
- Server Components by default. Client only when interactive (`'use client'` at the top, kept small).
- All user-input goes through Zod validation at the server boundary.
- All API responses through a `Result<T, E>` type — no thrown exceptions across the network.
- Tailwind utility-first; component-scoped CSS Modules only for the card markup (where the existing Nuwairi CSS is too organic to translate to utilities).

---

## 5. Dev quickstart

```bash
# from <repo-root>/app
pnpm install
cp .env.example .env.local
# fill SUPABASE_URL, SUPABASE_ANON_KEY, MOYASAR_KEY, etc.
pnpm dev
```

Then open http://localhost:3000.

### Recommended order of fix-ups before you start adding features
1. Run `pnpm install` and resolve any version mismatches.
2. Verify the landing page renders (`/`).
3. Verify the card preview renders (`/preview` — uses dummy data from `src/lib/sample-card.ts`).
4. Verify configurator skeleton renders (`/configure`).
5. *Then* start on auth / Supabase / payments.

---

## 6. Things I deliberately did NOT do — and why

- **No Supabase project created.** You'll do this with the customer's own account so it's owned by them.
- **No Cloudflare worker deployed.** Same reason — the Nuwairi worker is under one account, Dawati should be under the customer's production account from day one.
- **No real Moyasar account.** Requires Saudi CR (commercial registration) — customer-owned.
- **No domain bought.** Same.
- **No production deploy script.** Once Vercel is connected to the customer's GitHub, a push to `main` deploys. Add a CI workflow only if you need preview environments per PR.
- **No images.** All graphics are inline SVG — by design, so the card has zero asset dependencies and renders even when offline.
- **No tests yet.** MVP-first; add tests when the schema stabilises (Phase 2). I'd add Playwright e2e for the configurator → publish → admin-view flow, and a Vitest unit suite for the Hijri date helpers and verse library.

---

## 7. Open decisions you'll need to make with the customer

These are documented in `PROJECT_BRIEF.md` §9 — re-confirm before you build the affected feature:
- Subdomain-per-card vs path-per-card URL scheme
- Magic link only vs also OAuth at signup
- Card download / PDF export option in MVP or Phase 2
- Free 24h trial card with watermark, yes or no
- Refund policy when a guest has already visited
- IP/UA logging duration on RSVPs (default in code: 30d)

---

## 8. Contact for context I might know that isn't written down

Open a question issue on the repo (https://github.com/canvasframesa-lang/dawati/issues) and tag the owner. The Nuwairi build's commit history (a useful narrative of what worked and what didn't) lives at https://github.com/canvasframesa-lang/nuwairi-wedding — `git log` there is worth a read before you make architectural decisions about the multi-tenant version.

— Built and handed off 2026-05-29.
