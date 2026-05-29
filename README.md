# دعوتي · Dawati

> Premium custom Arabic invitation cards on demand. Saudi-first. Concierge model — the customer describes what they want, our team designs it.

## What's in this repo

```
.
├── PROJECT_BRIEF.md         ← vision, scope, target users, roadmap
├── HANDOFF.md               ← start here if you're picking up the build
├── DESIGN_SYSTEM.md         ← gold/cosmos/glass tokens (verbatim from Nuwairi)
├── TECH_STACK.md            ← chosen stack + rationale
├── CULTURAL_NOTES.md        ← Arabic & Islamic invitation conventions
├── SEO_AND_KEYWORDS.md      ← Saudi market SEO + schema.org templates
├── UX_2026.md               ← 2026-grade UX patterns + accessibility
├── PRICING_AND_TIERS.md     ← 3 tiers (700/1200/2000 SAR) + add-ons
├── reference-templates/     ← production wedding card files (read-only)
└── app/                     ← Next.js 15 web app (the codebase)
    ├── package.json
    ├── README.md            ← dev quickstart
    ├── src/
    │   ├── app/             ← App Router routes
    │   ├── components/      ← shared UI (Cosmos, GoldDust, ...)
    │   └── lib/             ← types, verses, tiers, seo helpers
    └── supabase/schema.sql  ← run against Supabase on first setup
```

## Status (at this commit)

- ✓ Landing page (`/`) — hero, how-it-works, dashboard callout, pricing, FAQ
- ✓ Order intake form (`/order`) — 10 sections, auto-saves draft, live total
- ✓ Sample preview (`/preview`) — iframes the production Nuwairi card
- ✓ SEO baseline — sitemap, robots, manifest, schema.org Org/Website/Service
- ✓ Design tokens + 4 Google Fonts loaded RTL
- ✓ Supabase schema (orders, cards, rsvps, guest_links, referrals, audit)

## Status (next — Hermes' queue)

- ⏳ Supabase project creation + auth (magic link)
- ⏳ Moyasar payment integration + webhook
- ⏳ Cloudflare Worker (card serving + RSVP write-through to Supabase)
- ⏳ Customer dashboard (`/dashboard`)
- ⏳ Operator console (`/admin`)
- ⏳ Card React component (replace iframe in `/preview`)
- ⏳ OG image generation (`@vercel/og`)
- ⏳ Occasion landing pages (`/wedding`, `/engagement`, ...)

## Quick start

```bash
cd app
pnpm install
cp .env.example .env.local
pnpm dev
```

Read `HANDOFF.md` for the full picture.

— Started 2026-05-29 in Riyadh.
