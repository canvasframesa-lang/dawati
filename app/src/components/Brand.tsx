/**
 * Dawati brand marks.
 *
 *   <BrandMark />       The seal — a black octagonal medallion with a
 *                       gold 8-point najmah inside and a tiny gem at its
 *                       center. Bold by design: high-contrast even at
 *                       favicon size (16×16) and presidential at hero
 *                       size (200×200). Defaults to 28×28.
 *
 *   <BrandWordmark />   The Arabic wordmark "دعوتي" set in Cairo Black
 *                       (weight 900) — bold, contemporary, commanding.
 *                       Solid deep-ink black with a single gold diamond
 *                       accent — confidence over decoration.
 *
 *   <BrandLockup />     Mark + wordmark side by side (RTL: mark on the
 *                       right, wordmark on the left). Default used in
 *                       the header and footer.
 */

type Size = number | string;

export function BrandMark({
  size = 28,
  className,
  ariaHidden = true,
  title,
}: {
  size?: Size;
  className?: string;
  ariaHidden?: boolean;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role={ariaHidden ? undefined : 'img'}
      aria-hidden={ariaHidden ? true : undefined}
      aria-label={ariaHidden ? undefined : title || 'دعوتي'}
    >
      <defs>
        <linearGradient id="bm-coal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1a25" />
          <stop offset="55%" stopColor="#0e0e14" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
        <linearGradient id="bm-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff8d8" />
          <stop offset="35%" stopColor="#f4d56e" />
          <stop offset="70%" stopColor="#c9a23d" />
          <stop offset="100%" stopColor="#8a6817" />
        </linearGradient>
        <radialGradient id="bm-jewel" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fffce5" />
          <stop offset="55%" stopColor="#f4d56e" />
          <stop offset="100%" stopColor="#8a6817" />
        </radialGradient>
      </defs>

      {/* Octagonal black medallion — geometric, Islamic, instantly readable */}
      <polygon points="18,1 46,1 63,18 63,46 46,63 18,63 1,46 1,18" fill="url(#bm-coal)" />

      {/* Inset gold rim — couture detail, only visible at large sizes */}
      <polygon
        points="20,4 44,4 60,20 60,44 44,60 20,60 4,44 4,20"
        fill="none"
        stroke="url(#bm-gold)"
        strokeWidth="0.7"
        opacity="0.55"
      />

      {/* 8-point najmah in gold — the brand signature, scaled to fill */}
      <g transform="translate(32 32)" fill="url(#bm-gold)">
        <polygon points="0,-19 5,-5 19,0 5,5 0,19 -5,5 -19,0 -5,-5" />
        <polygon
          points="0,-19 5,-5 19,0 5,5 0,19 -5,5 -19,0 -5,-5"
          transform="rotate(22.5)"
          opacity="0.5"
        />
      </g>

      {/* Central jewel — the seal's drop of wax */}
      <circle cx="32" cy="32" r="3.4" fill="url(#bm-jewel)" />
      <circle
        cx="32"
        cy="32"
        r="3.4"
        fill="none"
        stroke="#1a0f06"
        strokeWidth="0.5"
        opacity="0.8"
      />
    </svg>
  );
}

export function BrandWordmark({
  fontSize = 22,
  className,
}: {
  fontSize?: number;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: Math.max(2, fontSize * 0.1),
        fontFamily: 'var(--font-cairo), sans-serif',
        fontSize,
        fontWeight: 900,
        lineHeight: 1,
        color: '#0e0e14',
        letterSpacing: '-0.02em',
      }}
    >
      دعوتي
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: Math.max(4, fontSize * 0.18),
          height: Math.max(4, fontSize * 0.18),
          background: 'linear-gradient(135deg, #f4d56e 0%, #c9a23d 60%, #8a6817 100%)',
          transform: 'rotate(45deg)',
          boxShadow: '0 1px 2px rgba(138, 104, 23, 0.30)',
          alignSelf: 'center',
        }}
      />
    </span>
  );
}

export function BrandLockup({
  size = 28,
  fontSize = 22,
  gap = 10,
  className,
}: {
  size?: number;
  fontSize?: number;
  gap?: number;
  className?: string;
}) {
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap }}>
      <BrandMark size={size} />
      <BrandWordmark fontSize={fontSize} />
    </span>
  );
}
