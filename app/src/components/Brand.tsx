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

      {/* Envelope outline — gold line art */}
      <g
        stroke="url(#bm-gold)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <rect x="6" y="14" width="52" height="40" rx="4" />
        {/* Flap V — top corners meeting at the seal */}
        <path d="M6 14 L32 34 L58 14" />
      </g>

      {/* Gold wax seal on the flap, with najmah star */}
      <g transform="translate(32 34)">
        <circle r="10" fill="url(#bm-jewel)" />
        <circle r="10" fill="none" stroke="url(#bm-gold-rim)" strokeWidth="0.8" />
        {/* 8-point najmah inside the seal */}
        <g fill="#1a0f06">
          <polygon points="0,-6.5 1.7,-1.7 6.5,0 1.7,1.7 0,6.5 -1.7,1.7 -6.5,0 -1.7,-1.7" />
          <polygon
            points="0,-5.5 1.4,-1.4 5.5,0 1.4,1.4 0,5.5 -1.4,1.4 -5.5,0 -1.4,-1.4"
            transform="rotate(22.5)"
            opacity="0.55"
          />
        </g>
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
