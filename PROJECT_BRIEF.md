# دعوتي · Da3wati — Project Brief

> Online platform for selling premium, interactive Arabic invitation cards on demand. Customer fills a form → pays → gets a live card URL + admin dashboard for RSVPs. Spun out from the proven Nuwairi wedding card (built 2026-05-29 — production reference).

---

## 1. Vision & Positioning

### What it is
A SaaS that turns a 30-minute form into a luxury, fully interactive WhatsApp-shareable invitation card with:
- Beautiful animated design (gold cosmos, white frosted glass, calligraphic Arabic)
- Embedded RSVP form
- Real-time admin dashboard for the host (counts + messages)
- WhatsApp-optimized OG preview image (auto-generated)

### Why now
There's a gap in the Saudi/Sudanese/Gulf invitation market: traditional printers are expensive, slow, and don't support RSVPs. Existing online invitations (Paperless Post / Greenvelope) are Western-coded — they don't speak Arabic typography (Aref Ruqaa, Amiri) or Islamic ornamentation natively. The Nuwairi card validated the visual bar: dark cosmos + gold + frosted glass + mandala won across two cultures (Eid + wedding).

### Target users (primary, MVP)
- Saudi / Gulf / Sudanese hosts organizing weddings, engagements, Eid receptions, graduation walimas, baby aqiqas.
- Age 22-55, WhatsApp-native, comfortable paying online (Mada/Apple Pay/STC Pay).
- Care about *taste* — wouldn't send a Canva template, but won't pay a designer 2000 SAR.

### Brand
- Name: **دعوتي** (Da'wati = "My Invitation")
- Tagline candidates:
  - «دعوتك تستحق أن تَلمع» (Your invitation deserves to shine)
  - «دعوة تليق بالمناسبة» (An invitation worthy of the occasion)
- Domain candidates (in preference order):
  - `da3wati.com` (probably taken — check)
  - `da3wati.sa` (Saudi TLD, premium credibility)
  - `daawati.com`
  - Punycode IDN `xn--igbo3a.com` for `دعوتي.com` (works but unfriendly to type)
- Visual identity: **distinct** from individual cards. Cards = ornate. Brand = restrained. Suggested logo motif: a single 8-pointed gold star (نجمة ثُمانية) on dark, with "دعوتي" beneath it in Aref Ruqaa.

---

## 2. The Card Template (Nuwairi reference)

### Visual DNA (locked, validated, do not drift)
Carry over from the Nuwairi reference (`reference-templates/01-card-template.html` in this repo, mirror of https://github.com/canvasframesa-lang/nuwairi-wedding/blob/main/index.html):

- **Background:** dark cosmos — `radial-gradient` of warm-gold nebula upper-left + soft champagne lower-right + violet depth behind card + cyan distant star cluster + pure black base (`#020207`). See `:root .cosmos` rule.
- **Card:** white frosted glass with `backdrop-filter: blur(20px) saturate(1.5) brightness(1.06)`, opacity ~0.55 (translucent enough to see falling petals behind, but with text-shadow halos for legibility — see §5).
- **Gold scale:** `--gold-hi: #fff8d8`, `--gold-1: #ffe7a3`, `--gold-2: #f4d06b`, `--gold-3: #d4a93a`, `--gold-4: #b88a1e`, `--gold-5: #8a6817`. Never invent new gold hexes — reuse these.
- **Fonts (Google Fonts):** Aref Ruqaa (display/calligraphic), Amiri (body Quranic-style with diacritics), Reem Kufi (UI labels), Inter (Latin labels/numbers).
- **Signature elements (per card):**
  - Royal crown SVG (5 spires with pearl tips)
  - Bismillah (font: Amiri 700, gold shimmer)
  - Multi-layer rotating Islamic mandala (4 SVG layers spinning at different speeds/directions)
  - 8-pointed Najmah star separators between stanzas
- **Background animations (canvas):**
  - Twinkling parallax stars (2 layers, mouse/gyro parallax)
  - Rising gold dust particles (drift sideways while ascending)
  - Falling gold + rose-gold petals (sway, rotate)
  - Falling red rose petals + occasional full 5-petal blossoms with gold centers
  - Swaying lanterns top corners
- **Interactive:**
  - Click anywhere outside form → gold ripple + petal burst + sparkle (throttled 60ms)
  - Hover/tap a name → name scales 1.04, glows brighter, emits petals + sparkles
  - Scroll-triggered "journey" — IntersectionObserver fires one-shot moments at the verse / centerpiece / RSVP / closing dua
- **RSVP burst:** "سأحضر" → ~110 rose petals explode from button + 8 staggered multi-color fireworks. "أعتذر وأوجه رسالة" → requires message + soft dua confirmation.

### Card content structure (sections, top to bottom)
1. Crown emblem
2. Bismillah
3. Families ribbon: `بِدَعوَةٍ مِن — آلُ [groom-family] ✦ آلُ [bride-family]` (or single-host equivalent)
4. Rotating mandala with centerpiece date inside it
5. Hero verse fragment (large gold shimmer) + subtitle
6. Full Quranic verse (with diacritics, no surrounding box)
7. Names centerpiece: `كَريم آل [X]` / [groom full name] / **و** / `كَريمة آل [Y]` / [bride full name]
8. Salam + greeting line
9. Hamd stanza (الحمد لله...)
10. Invitation stanza ("يَتَشَرَّفُ آل X وآل Y بدعوتكم...")
11. Details rows: date / walima / venue (each = icon + label + value + sub, hairline separator)
12. RSVP form: name + message + two buttons
13. Closing dua stanza
14. Flourish: "بارَكَ اللهُ لَهُما وبارَكَ عَلَيهِما وجَمَعَ بَينَهُما في خَير"
15. Pavilion SVG (palm-arch with central star + hanging lantern)
16. Signature

### Text & cultural conventions (validated by Sudanese family for Nuwairi)
- Bride's first name does **NOT** appear in `كَريمة الأسرة [name]` line — she's identified by father's name (Ahmad Hassan Tola). Her first name lives only in the centerpiece.
- Groom: keep full name including kunya ("أبو عبيدة").
- "آل الشايقي" = groom's family; "آل تولا" = bride's family. Frame as: `كَريم آل الشَّايِقي [groom]` / `كَريمة آل تولا [father's name]`.
- For non-Sudanese, may simplify to "ابنهم" / "ابنتهم" or just full names.
- All text uses tashkeel (diacritics) for elegance: "يَتَشَرَّفُ" not "يتشرف".
- No Ramadan references in wedding/Adha cards. Audit content per occasion type.

### What NOT to do (rejected directions from real customer feedback)
- ❌ Rounded boxes around verse / details / form (felt cluttered — strip to typography + hairlines)
- ❌ Glowing gold "sun" behind the "و" joiner (looked busy)
- ❌ Bride's full name in the prose invitation (cultural mismatch)
- ❌ Navy text on translucent glass (read as blur — switch to pure black + cream text-shadow halo)
- ❌ Heavy backdrop blur that hides the petals (drop blur to 14-20px so flowers stay visible)
- ❌ "آية الزواج" caption above the Quran verse (redundant)
- ❌ Bright cream halo behind `<strong>` gold-gradient text (kill text-shadow on gradient elements)

---

## 3. Technical Architecture (recommended MVP)

### Stack
| Layer | Choice | Why |
|---|---|---|
| Main app | **Next.js 15 App Router** | SSR + SSG hybrid, good for both marketing pages and customer cards |
| Hosting (main) | **Vercel** | Zero-config Next.js, edge functions, generous free tier |
| Cards & API | **Cloudflare Workers + KV** | Cheap, fast at edge, proven by Nuwairi (~free up to 100k req/day) |
| DB (customers + cards metadata) | **Supabase** (Postgres + Auth + Storage) | Auth + RLS + storage in one, Saudi-friendly latency from MEA region |
| Card preview rendering (OG images) | **Cloudflare Browser Rendering API** or **`@vercel/og`** | Auto-generate the 1200×630 JPG per card |
| Payment | **Moyasar** (primary) + **Stripe** (backup for non-SA) | Moyasar = Mada/Apple Pay native, no merchant of record headaches in KSA |
| Transactional email | **Resend** | Modern API, Arabic templates work, good deliverability |
| Customer support | **WhatsApp Business API** (later) | Where users already are |
| Analytics | **Plausible** or **Vercel Analytics** | Privacy-respecting, no cookie banner needed |
| Error monitoring | **Sentry** | Sourcemap support, alerts |

### URL strategy (pick one)
- **A. Subdomain-per-card:** `nuwairi.da3wati.com`, `ahmed-wedding.da3wati.com` — feels premium, harder to set up (wildcard SSL + DNS), but each card is its own brand
- **B. Path-per-card:** `da3wati.com/c/nuwairi-2026` — simpler, easier SEO, less premium feel
- **C. Custom domain upsell:** customer pays extra to put on their own domain — Phase 5+

**Recommendation:** Start with B (path-based) for MVP, offer A as premium tier later.

### Multi-tenant card storage
Each card = a row in `cards` table:
```sql
cards (
  id            uuid pk,
  slug          text unique not null,        -- nuwairi-2026
  template_id   text not null,               -- "wedding-cosmos-v1"
  owner_id      uuid fk users(id),
  data          jsonb not null,              -- {names, date, venue, families, verse, ...}
  rsvp_enabled  bool default true,
  rsvp_admin_pass_hash text,                 -- bcrypt
  is_published  bool default false,
  published_at  timestamptz,
  expires_at    timestamptz,                 -- e.g., 90 days after event
  view_count    int default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

rsvps (
  id          uuid pk,
  card_id     uuid fk cards(id) on delete cascade,
  name        text not null,
  attend      text check (attend in ('yes','no')),
  message     text,
  ts          timestamptz default now(),
  ip          inet,
  country     text(2),
  user_agent  text
);
```

KV mirror (optional, for edge-fast reads): the published card's JSON snapshot keyed by slug, so the Worker can serve the card HTML without touching Postgres.

### Card rendering pipeline
1. Customer fills form in Next.js app → saves to `cards.data`
2. On publish, a job:
   - Renders the card HTML from a server-side template (single file like Nuwairi's `index.html`, with placeholders replaced from `data`)
   - Renders the OG JPG (Browser Rendering or @vercel/og at 1200×630)
   - Pushes both to Cloudflare R2 (or to a Worker's KV)
   - Marks `is_published = true`
3. Request to `da3wati.com/c/<slug>` → Worker reads from KV → returns HTML + RSVP API points
4. RSVPs POST to `da3wati.com/api/rsvp` → Worker writes to D1 / Postgres / Supabase
5. Customer views `da3wati.com/dashboard/<slug>` (auth required) → shows RSVPs

---

## 4. MVP Features (Phase 1, 4-6 weeks)

### Customer flow
1. **Landing page** — hero + sample cards carousel + pricing + CTA
2. **Template gallery** — browse 1-3 templates with live previews
3. **Configurator** — multi-step form:
   - Step 1: occasion type (wedding / engagement / Eid / aqiqa)
   - Step 2: names (groom, bride, families OR host name)
   - Step 3: date + Hijri + venue + walima time
   - Step 4: optional verse / dua selection from library
   - Step 5: optional message + sender signature
   - Step 6: choose RSVP on/off, set admin password
4. **Live preview** — iframe of the actual card updating as form changes
5. **Pay & publish** — Moyasar checkout, returns to dashboard
6. **Customer dashboard** — list of cards, RSVP counts, share buttons (WhatsApp, copy link)
7. **Card detail / Admin view** — same gold dashboard as `admin.html` from Nuwairi

### Admin (for Da3wati operators, internal)
- `/admin` (separate from customer dashboard)
- Auth: Supabase magic link, role-based access
- View all cards, RSVPs, payments, refund / disable cards, support queue

### What's *not* in MVP
- Custom design / per-card variations (just use the proven template + content swap)
- Multiple languages (Arabic only)
- Email invitations (WhatsApp-only)
- Photo uploads (Phase 2 — adds complexity)
- Group/family bulk RSVP (single guest per submission)

---

## 5. Pricing (proposal — validate with 5 users)

| Tier | Price (SAR) | What's included |
|---|---|---|
| **Basic** | 49 | Card with all content, RSVP form, 30-day expiry, no admin dashboard |
| **Premium** | 99 | + Admin dashboard, RSVP messages, 90-day expiry, OG image, WhatsApp sharing kit |
| **VIP** | 199 | + Custom domain (`yourname.da3wati.com`), priority delivery, unlimited RSVPs, 1-year expiry |

Notes:
- Saudi wedding market is price-insensitive at this range — the *quality* sells, not the price.
- Compare: physical printed invitations cost 5-15 SAR per piece × 200 = 1000-3000 SAR. So 199 SAR online is cheap.
- Free trial: customer can configure + preview but not publish/share without paying.
- Payment: one-time per card. Don't do subscriptions (wrong mental model for events).

---

## 6. Roadmap

### Phase 0 — Discovery (1 week)
- [ ] Validate price + features with 5 target users (Saudi WhatsApp interview)
- [ ] Buy domain (`da3wati.com` or `da3wati.sa`)
- [ ] Register Moyasar merchant account (requires CR — commercial registration)
- [ ] Set up Cloudflare account dedicated to the brand (separate from personal)
- [ ] Set up Supabase project + Vercel project + GitHub org

### Phase 1 — MVP wedding template (4 weeks)
- [ ] Next.js scaffold with App Router, Supabase auth, Tailwind
- [ ] Configurator form (the 6 steps above)
- [ ] Server-side card renderer (extract Nuwairi's `index.html` into a templated React component or string template)
- [ ] OG image generation
- [ ] Worker + KV for serving cards + RSVPs
- [ ] Customer dashboard
- [ ] Moyasar checkout
- [ ] Landing page + pricing + 1 sample card

### Phase 2 — Polish + expand (3 weeks)
- [ ] Eid template variant
- [ ] Engagement template variant
- [ ] Photo upload (couple photo as background option)
- [ ] PDF export (for printable backup)
- [ ] WhatsApp sharing helper (deep link with preformatted message)
- [ ] Refer-a-friend (discount code system)

### Phase 3 — Scale (ongoing)
- [ ] Custom domains
- [ ] More templates (graduation, aqiqa, opening ceremonies)
- [ ] Per-template design variants (let customer pick palette: gold / silver / rose-gold)
- [ ] Multi-language (English template)
- [ ] White-label for event planners (resellers)
- [ ] WhatsApp Business integration (auto-send confirmations)

---

## 7. Lessons & Gotchas from Nuwairi build

### Frontend / design
- **Translucency vs. legibility tension:** every time you increase glass transparency to show background petals, dark text becomes harder to read. Solution: pure black ink (`#000`) + cream text-shadow halo, not navy.
- **Gold-gradient text + drop-shadow:** `background-clip:text` with transparent fill means text-shadow draws a halo even though no opaque text exists. Set `text-shadow: none` on these elements or you get a bright blob behind them.
- **Mobile width edge cases:** long Arabic names like "أبو عبيدة عبد المجيد محمد النويري" don't fit in a 320px viewport at large font. Use `clamp()` for font-size + `white-space: nowrap` + `overflow-wrap: anywhere` strategically.
- **Bidi text + Latin dates:** "30 · MAY · 2026" in an RTL container renders as "MAY · 2026 · 30" visually. Either wrap in `<span dir="ltr">` or accept the reordering.
- **Backdrop-filter blur cost:** 28-34px blur on a tall card during scroll can stutter on low-end Android. Cap at ~20px.
- **Diacritics font support:** not every font has full Quranic harakat. Amiri does; Aref Ruqaa does for the basics. Test the verse text in actual font, not in editor.

### Backend / Cloudflare
- **Account scope is sticky:** an API token belongs to one Cloudflare account, even though wrangler can OAuth-login to a different one. If `wrangler whoami` shows account A but `CLOUDFLARE_API_TOKEN` belongs to account B, you'll silently deploy to B. Always verify both accounts match.
- **workers.dev subdomain is one-time setup per account:** wrangler can't register it non-interactively. Either do it via dashboard once, or PUT `/accounts/{id}/workers/subdomain` directly with the token.
- **Per-worker subdomain enable:** after registering account subdomain, also POST `/accounts/{id}/workers/scripts/{name}/subdomain` with `{"enabled": true}` to expose THIS worker on `<worker>.<account-subdomain>.workers.dev`.
- **CORS in Workers:** if you forget to add CORS headers to *every* response branch (including error responses), browser fetches fail silently. Pattern in Nuwairi: build response → loop `cors` entries and `set` on headers.
- **KV is eventually consistent:** writes propagate in ~1 minute globally. Don't expect read-your-writes within the same second.
- **Wrangler 4.x non-interactive prompts default to NO:** any "would you like to register / create / deploy" prompt = "no" in CI mode. Stage these via direct API calls.
- **Secrets via wrangler:** `echo "value" | wrangler secret put NAME` — works but secret will be visible in shell history; use `--from-file` for sensitive prod values.

### Payments (researched, not built)
- **Moyasar:** Saudi-based, Mada + Apple Pay + STC Pay + Visa/MC. Requires Saudi CR. ~2.75% fees.
- **Tap:** Pan-Gulf, similar features, requires entity in one of the Gulf countries.
- **Stripe:** No KSA support yet (as of 2026 — re-check). If using, route through Stripe Atlas or a UAE entity.
- **Reconciliation:** every card sale must mark `cards.is_published = true` *only after* webhook confirms payment, not on checkout init.

### Cultural / content
- **Verse selection matters:** different occasions have canonical verses:
  - Wedding: Ar-Rum 21 (وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم...)
  - Aqiqa: hadith of naming
  - Eid: Al-Hajj 32 or similar
  - Build a curated library — don't let users free-type Quran (typo risk).
- **Hijri/Gregorian dual date:** always show both. Use a server-side Hijri library — `hijri-date` (JS), `umm-al-qura` (Python), or the Cloudflare-friendly `@umalqura/core`.
- **Gendered verbs in dua text:** for wedding cards "سائلًا" (he asks, masculine sg.) vs "سائلةً" (she, fem.) vs "سائلين" (they, plural for both families). Match to the sender voice — `data.sender_voice: 'groom' | 'bride' | 'families'`.
- **Bride's name visibility:** offer a toggle "Show bride's first name in invitation prose?" — default OFF per Sudanese convention, ON for more liberal Saudi cards. Always show in the names centerpiece regardless.

### Operational
- **Card expiry:** auto-expire cards 30/90/365 days after `published_at` (per tier). After expiry, redirect to a "this invitation has ended" page with the dua. Saves KV/storage costs.
- **Admin password storage:** never plaintext. bcrypt in DB. Send via WhatsApp + email at purchase, also displayable on customer dashboard.
- **Backup RSVPs:** daily export to email (or to customer's email) as JSON + CSV. Reassures hosts.
- **Privacy:** RSVPs are private to the host. Never share guest names/messages across cards or with the platform owner publicly.
- **Quran text:** use the public-domain Tanzil text (uthmani script with diacritics). Cite it. Don't paraphrase the verse — only the surrounding dua is the host's words.

---

## 8. Files to extract from Nuwairi as starter templates

All five files are checked into this repo under `reference-templates/` (verbatim copies of the live Nuwairi build). Treat them as read-only source-of-truth:

- `reference-templates/01-card-template.html` — the canonical card template. Strip the hardcoded names/dates and turn into a parametrized React component or `{{handlebars}}`-style template.
- `reference-templates/03-admin-template.html` — the admin dashboard. Will become per-card dashboard, password gated.
- `reference-templates/02-og-template.html` — the 1200×630 OG template. Same: parametrize.
- `reference-templates/04-worker.js` — the RSVP API. Multi-tenant version will switch from one KV namespace to a key-prefix scheme (`card:<slug>:rsvp:<id>`).
- `reference-templates/05-wrangler.toml` — config (account ID + KV bindings will be replaced with Dawati's own when Hermes provisions Cloudflare).

Upstream source: https://github.com/canvasframesa-lang/nuwairi-wedding

---

## 9. Open questions to resolve before Phase 1

- [ ] Single Cloudflare account for both prod + staging, or split? (recommend split — easier rollback)
- [ ] Customer auth: magic link only, or also Google/Apple? (recommend magic link only at MVP — fewer surfaces)
- [ ] Do we let customers download the card as HTML/PDF for archival? (recommend yes — adds perceived value, low effort)
- [ ] Do we offer a free trial card that expires in 24h without payment? (recommend yes — proves the magic, low fraud risk since it expires)
- [ ] Refund policy — what if customer publishes by mistake / wrong date? (recommend: 1 free edit within 24h of publish; refund only before any guest visits)
- [ ] Storing IP + UA on RSVPs is convenient but may need a privacy note in Arabic. (Recommend: anonymise IP after 30 days; UA is purely diagnostic — fine to keep).
- [ ] WhatsApp link previews cache aggressively (~24h). Provide a "force refresh" button in dashboard that appends `?v=<ts>` to the share URL.

---

## 10. Reference repos & live URLs

All accessible to anyone with a browser — no machine access needed.

- **Nuwairi wedding card** (production reference, the proven build):
  - Source: https://github.com/canvasframesa-lang/nuwairi-wedding
  - Live: https://canvasframesa-lang.github.io/nuwairi-wedding/
  - Admin: https://canvasframesa-lang.github.io/nuwairi-wedding/admin.html (password kept private with the owner)
  - Worker: https://nuwairi-wedding-api.nuwairi-wedding.workers.dev
- **Eid Mubarak cards** (visual DNA origin):
  - Source: https://github.com/canvasframesa-lang/eid-mubarak
  - Live: https://canvasframesa-lang.github.io/eid-mubarak/
- **CanvasFrame HQ** (owner's main product — sets the brand quality bar): private, not part of this codebase. If style decisions need cross-referencing, ask the owner.

---

## Document conventions

- This file is the source of truth for the Da3wati project until a proper repo + CLAUDE.md exist.
- Update it as decisions land. Don't let it drift from reality.
- When Phase 1 begins, copy this into `da3wati` repo as `docs/01-brief.md` and start writing `docs/02-architecture.md`, etc.
