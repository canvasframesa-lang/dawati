/**
 * Dawati brand marks.
 *
 *   <BrandMark />       Just the seal — a layered 8-point najmah star
 *                       containing an octagonal frame, an inner star,
 *                       and a jewelled center. Works at 16×16 (favicon)
 *                       and at 200×200 (hero). Defaults to 28×28.
 *
 *   <BrandWordmark />   The Arabic wordmark "دعوتي" set in Aref Ruqaa
 *                       with a soft gold gradient. Standalone, no mark.
 *
 *   <BrandLockup />     Mark + wordmark side by side (RTL: mark on
 *                       the right, wordmark on the left). The default
 *                       used in the header and footer.
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
  // Stable gradient IDs scoped to a single SVG — duplicating them in
  // the same document is fine (browsers de-duplicate by lookup order).
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
        <linearGradient id="bm-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#fff8d8" />
          <stop offset="35%"  stopColor="#f4d56e" />
          <stop offset="70%"  stopColor="#c9a23d" />
          <stop offset="100%" stopColor="#8a6817" />
        </linearGradient>
        <linearGradient id="bm-gold-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#f4d56e" />
          <stop offset="100%" stopColor="#5a4310" />
        </linearGradient>
        <radialGradient id="bm-jewel" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%"   stopColor="#fffce5" />
          <stop offset="60%"  stopColor="#f4d56e" />
          <stop offset="100%" stopColor="#8a6817" />
        </radialGradient>
      </defs>

      <g transform="translate(32 32)">
        {/* Outer 8-point najmah — two overlapping rotated rosettes */}
        <polygon
          points="0,-30 7.5,-7.5 30,0 7.5,7.5 0,30 -7.5,7.5 -30,0 -7.5,-7.5"
          fill="url(#bm-gold)"
        />
        <polygon
          points="0,-30 7.5,-7.5 30,0 7.5,7.5 0,30 -7.5,7.5 -30,0 -7.5,-7.5"
          fill="url(#bm-gold)"
          transform="rotate(22.5)"
          opacity="0.65"
        />

        {/* Inner octagonal seal — dark wax body for contrast */}
        <polygon
          points="0,-15 10.6,-10.6 15,0 10.6,10.6 0,15 -10.6,10.6 -15,0 -10.6,-10.6"
          fill="#1a0f06"
        />
        <polygon
          points="0,-15 10.6,-10.6 15,0 10.6,10.6 0,15 -10.6,10.6 -15,0 -10.6,-10.6"
          fill="none"
          stroke="url(#bm-gold-rim)"
          strokeWidth="0.8"
        />

        {/* Inner small najmah — gold on dark */}
        <polygon
          points="0,-9 2.2,-2.2 9,0 2.2,2.2 0,9 -2.2,2.2 -9,0 -2.2,-2.2"
          fill="url(#bm-gold)"
        />
        <polygon
          points="0,-9 2.2,-2.2 9,0 2.2,2.2 0,9 -2.2,2.2 -9,0 -2.2,-2.2"
          fill="url(#bm-gold)"
          transform="rotate(45)"
          opacity="0.75"
        />

        {/* Center jewel */}
        <circle r="2.2" fill="url(#bm-jewel)" />
        <circle r="2.2" fill="none" stroke="#fff8d8" strokeWidth="0.3" opacity="0.6" />
      </g>
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
        fontFamily: 'var(--font-aref-ruqaa), serif',
        fontSize,
        fontWeight: 700,
        lineHeight: 1,
        background:
          'linear-gradient(135deg, #fff8d8 0%, #f4d56e 35%, #c9a23d 70%, #8a6817 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        letterSpacing: '-0.01em',
      }}
    >
      دعوتي
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
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap }}
    >
      <BrandMark size={size} />
      <BrandWordmark fontSize={fontSize} />
    </span>
  );
}
