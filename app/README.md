# دعوتي · Dawati — Web app

> Next.js 15 + Tailwind 4 + Supabase + Cloudflare. RTL Arabic-first SaaS for premium custom invitation cards. Read `../HANDOFF.md` first.

## Quickstart

```bash
pnpm install
cp .env.example .env.local
# Fill SUPABASE_URL, SUPABASE_ANON_KEY, MOYASAR_*, etc.
pnpm dev
```

Open http://localhost:3000.

## Routes (built)

- `/` — landing page (Arabic, RTL, gold/cosmos brand)
- `/order` — order intake form (auto-saves draft to localStorage; submit is stubbed pending Moyasar wiring)
- `/preview` — sample card preview (currently iframes the production Nuwairi card; Hermes will replace with `<Card />` React component)
- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` — generated

## Routes (not yet built — Hermes' queue)

- `/wedding`, `/engagement`, `/eid`, `/aqiqa`, `/graduation`, `/opening` — occasion landing pages (SEO silo)
- `/pricing` — pricing detail page (currently inline on `/`)
- `/how-it-works` — full explanation
- `/templates`, `/examples` — gallery + showcase
- `/faq` — full FAQ page (currently inline on `/`)
- `/privacy`, `/terms` — legal pages
- `/login`, `/signup` — Supabase magic-link auth
- `/dashboard` — customer dashboard listing all their orders/cards
- `/dashboard/[slug]` — per-card admin (RSVPs + messages + stats)
- `/c/[slug]` — public card view (proxies to Cloudflare Worker)
- `/checkout` — Moyasar checkout flow
- `/admin` — internal operator console
- `/api/orders` — order intake → Moyasar session
- `/api/rsvp` — guest RSVP endpoint
- `/api/webhooks/moyasar` — payment confirmation webhook

## Conventions

- TypeScript strict + `noUncheckedIndexedAccess`
- App Router with Server Components by default; `'use client'` only where needed
- All Arabic UI text with diacritics where formal (see `../CULTURAL_NOTES.md`)
- Tailwind utility-first; design tokens live in `src/app/globals.css` `@theme` block
- Never invent new gold hex values — reuse `--color-gold-*`
- Body text on glass: pure `#000` with cream text-shadow halo (see `../DESIGN_SYSTEM.md`)

## Reference templates

The production wedding card (the visual bar) lives at:
- Live: https://canvasframesa-lang.github.io/nuwairi-wedding/
- Source: `../reference-templates/01-card-template.html`

The OG image template: `../reference-templates/02-og-template.html`.
The admin dashboard (single-card RSVP): `../reference-templates/03-admin-template.html`.
The RSVP worker: `../reference-templates/04-worker.js`.

## Tests

Not yet. When the schema stabilises (Phase 2):
- Playwright e2e for `/order → checkout → /dashboard` flow
- Vitest unit suite for `lib/verses.ts` and Hijri date helpers

## Deployment

Push to `main` → Vercel auto-deploys.

The Cloudflare Worker for cards + RSVPs is a separate deployment under
`../worker/` (Hermes builds this; see HANDOFF.md §2).
