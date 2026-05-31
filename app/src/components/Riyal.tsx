/**
 * Riyal — the Saudi Riyal symbol as an inline SVG.
 *
 * Use this component anywhere a price is rendered in the UI. The
 * Unicode character ﷼ (U+FDFC) renders inconsistently across systems —
 * many fonts decompose it back to the four-letter word "ريال" instead
 * of a single glyph. An SVG is the only way to guarantee one identical
 * symbol on every browser and OS.
 *
 * Strings stored in data (formatPrice, share text, JSON-LD) may keep
 * the unicode ﷼; only the rendered UI should use this component.
 */

/**
 * Price — convenience wrapper that renders a number + Riyal symbol on
 * a single LTR line. Use this anywhere a price string would otherwise
 * be rendered (e.g., "690 ﷼") to guarantee the symbol displays.
 *
 *   <Price amount={1990} size={16} color="var(--color-gold-3)" />
 */
export function Price({
  amount,
  size = 16,
  color,
  className,
}: {
  amount: number;
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={className}
      dir="ltr"
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: Math.max(2, size * 0.18),
        fontFamily: 'var(--font-latin)',
      }}
    >
      <span>{amount.toLocaleString('en-US')}</span>
      <Riyal size={size} color={color} />
    </span>
  );
}

export function Riyal({
  size = 22,
  className,
  color,
}: {
  size?: number;
  className?: string;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-label="ريال سعودي"
      className={className}
      style={{ display: 'inline-block', verticalAlign: '-0.12em' }}
    >
      <g
        stroke={color ?? 'currentColor'}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Two parallel horizontal bars — the "$" axis of the new SAR mark */}
        <line x1="3.2" y1="9" x2="16.5" y2="9" />
        <line x1="3.2" y1="14" x2="13" y2="14" />
        {/* Stylized ر (raa) silhouette on the right */}
        <path d="M13 5.8 Q20 5.8 20 12.2 Q20 19.5 12.5 19.5" />
      </g>
    </svg>
  );
}
