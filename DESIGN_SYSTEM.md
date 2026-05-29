# Design System · دعوتي

> Extracted from the production Nuwairi card. These tokens were validated by real customers — do not invent new values.

---

## 1. Colors

### Cosmic ground (page background)
```css
--bg-0: #050714;  /* deep void */
--bg-1: #0a0e27;  /* midnight */
--bg-2: #15082a;  /* violet depth */
```

### Gold scale — premium
```css
--gold-hi:   #fff8d8;  /* highlight, near-white pearl */
--gold-1:    #ffe7a3;  /* champagne */
--gold-2:    #f4d06b;  /* warm gold (most-used) */
--gold-3:    #d4a93a;  /* mid gold (icons, ornaments) */
--gold-4:    #b88a1e;  /* brass */
--gold-5:    #8a6817;  /* deep gold (text on white) */
--gold-deep: #4a2c0a;  /* almost-bronze, for shadows */
--gold-glow: rgba(212, 169, 58, 0.55);
```

### Gradients (named)
```css
/* Vertical pearl-to-bronze for text/emblems */
--gold-grad: linear-gradient(180deg, #fff8d8 0%, #f4d06b 35%, #d4a93a 70%, #8a6817 100%);

/* Horizontal shimmer for animated headings */
--gold-shim: linear-gradient(90deg, #8a6817 0%, #b88a1e 25%, #f4d06b 50%, #b88a1e 75%, #8a6817 100%);

/* Glass card multi-layer (white frosted with warm tint) */
--card-bg:
  radial-gradient(ellipse at 18% 8%, rgba(255,255,255,0.55) 0%, rgba(255,253,245,0.45) 55%, transparent 90%),
  radial-gradient(ellipse at 88% 92%, rgba(244,208,107,0.24) 0%, transparent 60%),
  linear-gradient(155deg, rgba(255,255,255,0.42) 0%, rgba(252,248,235,0.36) 45%, rgba(244,208,107,0.25) 100%);
```

### Rose-gold accent (wedding-specific)
```css
--rose-1: #f4c8a8;
--rose-2: #d99878;
--red-petal-1: rgba(232, 76, 96, 1);
--red-petal-2: rgba(155, 24, 48, 1);
```

### Ink (text)
```css
/* Inside the white frosted glass — PURE BLACK, never navy */
--ink-body:  #000000;
--ink-deep:  #000000;
--ink-mute:  #3a3a3a;

/* Outside the glass — light cream against cosmos */
--ink-light: #ebd9b0;
--ink-soft:  #cbd3f0;
--ink-dim:   #6a72a0;

/* Gold-tinted text (for accents inside glass) */
--gold-text: #8a6817;
```

### Semantic
```css
--success: #2da640;  --success-dark: #1e6e2a;
--warning: #f4d06b;
--danger:  #c72e48;  --danger-dark:  #7a1830;
```

---

## 2. Typography

### Font stack (Google Fonts — load all four)
```html
<link href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Reem+Kufi:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### Role assignments
| Use | Font | Why |
|---|---|---|
| Display / hero / names / signatures | **Aref Ruqaa**, 700 | Classical naskhi calligraphic, formal occasions |
| Quranic verse / body prose / italic emphasis | **Amiri**, 400-700 | Quran-grade naskh with full diacritics support |
| UI labels / Arabic chrome / details / form fields | **Reem Kufi**, 500-700 | Clean modern Kufi for readable UI |
| Latin labels / English numbers / EN watermarks | **Inter**, 300-600 | Quiet sans for non-Arabic |

### Sizing
Use `clamp(min, vw-based, max)` so the card looks right from 320px mobile up to 660px container. Examples in production:
```css
.hero-title    { font-size: clamp(32px, 7.2vw, 52px); }
.bride-name    { font-size: clamp(22px, 5.6vw, 34px); }
.verse-body    { font-size: clamp(17px, 3.9vw, 22px); }
.stanza        { font-size: clamp(16px, 3.7vw, 20px); }
.signature     { font-size: clamp(22px, 5.2vw, 30px); }
.label-small   { font-size: 10px; letter-spacing: 7px; text-transform: uppercase; }
```

### Diacritics requirement
Every Arabic UI string with religious or formal weight uses tashkeel:
- `يَتَشَرَّفُ` not `يتشرف`
- `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ` not `بسم الله الرحمن الرحيم`

This is a tone-of-voice choice; the harakat are part of the brand.

---

## 3. Effects

### Backdrop blur (the frosted glass)
```css
backdrop-filter: blur(20px) saturate(1.5) brightness(1.06);
-webkit-backdrop-filter: blur(20px) saturate(1.5) brightness(1.06);
```
**Never less than 14px** (text becomes hard to read against the cosmos showing through). **Never more than 28px** (hides the falling petal animation behind the glass and stutters on low-end Android).

### Text shadow (legibility halo on black text)
```css
text-shadow:
  0 1px 2px rgba(255, 253, 240, 0.7),    /* near-shadow for crispness */
  0 0 14px rgba(255, 253, 240, 0.45);    /* outer glow against the cosmos */
```
Apply to `.stanza`, `.verse-text`, `.detail-row .body`, RSVP `input`/`textarea`. **Do NOT apply to gold-gradient text** (transparent fill means the halo paints alone, producing a bright blob behind invisible text — set `text-shadow: none` there explicitly).

### Drop shadow (for SVG ornaments — crown, mandala, palm pavilion)
```css
filter:
  drop-shadow(0 4px 12px rgba(212, 169, 58, 0.45))
  drop-shadow(0 0 16px rgba(244, 208, 107, 0.3));
```

### Shimmer (animated gold gradient text)
```css
background: var(--gold-shim);
background-size: 220% 100%;
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
animation: shimmer 6s linear infinite;

@keyframes shimmer {
  0%   { background-position: 200% 50%; }
  100% { background-position: -200% 50%; }
}
```

### Rise (entrance animation)
```css
@keyframes rise {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.card { animation: rise 1s cubic-bezier(.16,1,.3,1) 0.1s both; }
```

### Halo pulse (around mandala)
```css
@keyframes halo-pulse {
  0%, 100% { transform: scale(1);    opacity: 0.9; }
  50%      { transform: scale(1.08); opacity: 1; }
}
```

---

## 4. Layout primitives

### Container
- Card max-width: **660px** centered with `padding: 48px 16px 80px`.
- On `max-width: 480px`: padding becomes `40px 12px 60px`, glass card padding `44px 18px 36px`, border-radius `28px`.
- Card border-radius desktop: **36px**.

### Card border
```css
border: 1px solid rgba(255, 255, 255, 0.55);
box-shadow:
  inset 0 1px 0 rgba(255, 255, 255, 0.85),
  inset 0 -1px 0 rgba(184, 138, 30, 0.3),
  0 30px 80px rgba(0, 0, 0, 0.55),
  0 0 80px rgba(244, 208, 107, 0.22),
  0 0 140px rgba(255, 255, 255, 0.06);
```
Plus two pseudo-element 1px lines: white at top (`::before`), gold at bottom (`::after`).

### Corner ornaments (the four right-angle gold ticks)
38px × 38px in desktop, 28px on mobile. `border: 1.5px solid rgba(184, 138, 30, 0.55)` with only two sides + a 12px outer radius corner. Anchored absolutely to the four card corners.

---

## 5. Motion / canvas layers

Each canvas is a separate `<canvas>` with `position: fixed; inset: 0; pointer-events: none` and DPR-aware sizing.

Stack (z-index ascending):
1. `.cosmos` div — radial-gradient background (z 0)
2. `#stars` canvas — parallax twinkling stars (z 1)
3. `#roses` canvas — falling red rose petals + 5-petal blossoms (z 1)
4. `#petals` canvas — falling gold/rose-gold petals (z 1)
5. `#particles` canvas — rising gold dust (z 1)
6. `<main>` — card content (z 2)
7. `#fireworks` canvas — celebratory bursts on RSVP (z 100)
8. Lanterns — fixed-position SVG, top-left + top-right (z 2)

Spawn rates (per frame, throttled by capacity ceiling):
- Stars: ~`(w*h)/6500` count, max 220
- Petals: 18% chance/frame, cap 45
- Roses: 12% chance/frame, cap 30
- Particles: 35% chance/frame, cap 70
- Fireworks: 8 staggered launches, cleared after particles die

Performance: keep `dpr = Math.min(2, devicePixelRatio)`. Don't draw with shadows every frame for every particle — only the large stars (`layer === 2`) get a `shadowBlur` pass.

---

## 6. Iconography & ornaments (SVG inline)

All ornaments are inline SVG — zero asset dependencies. Reuse from `reference-templates/01-card-template.html`:

- **Crown** (5 spires, 5 pearl tips, banded base) — top of card
- **Mandala** (4 rotating SVG layers: outer pearl ring, 12-petal rosette, octagonal frame, hairline tick marks) — centerpiece moment
- **8-pointed Najmah star** — stanza separator
- **Palm-arch pavilion** (two date palms, central star, hanging lantern, dune horizon) — bottom of card
- **Lantern** (two variants for left/right) — fixed corners

These should become React components in `app/src/components/Card/ornaments/` — see the wedding card React component for the extracted versions.

---

## 7. Anti-patterns (reject these in code review)

| ❌ Don't | ✅ Do |
|---|---|
| `color: #1a1738` (navy) on glass | `color: #000000` |
| Rounded gold-tint boxes around verse / details / form | Hairline gold dividers + typography |
| `text-shadow` on `background-clip: text` element | `text-shadow: none` on these |
| `backdrop-filter: blur(34px)` | Keep blur in 14-22px range |
| Bridal first name in invitation prose stanza | Use `كَريمة آل [father's family] بنت [father's name]` |
| New gold hex `#abc123` | Use existing `--gold-N` variables |
| Free-typed Quranic verse | Select from `lib/verses.ts` library |
| `يتشرف` (no diacritics) | `يَتَشَرَّفُ` (full harakat) |
| Latin date in RTL flow as raw text | Wrap in `<span dir="ltr">` |
| Sound autoplay | No sound — opt-in only if added later |

---

## 8. Quick reference — minimal stylesheet shell

If you need to bootstrap a new card variant quickly:
```css
:root {
  /* paste full token block from §1 */
}
* { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
html, body { background: var(--bg-0); color: var(--ink-light); }
body {
  font-family: 'Reem Kufi', sans-serif;
  min-height: 100vh;
  overscroll-behavior-y: contain;
  -webkit-font-smoothing: antialiased;
  direction: rtl;
}
```
Then layer the card markup from `reference-templates/01-card-template.html`.
