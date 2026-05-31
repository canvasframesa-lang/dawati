/**
 * Dawati brand marks.
 *
 *   <BrandMark />       The seal — a rounded black envelope with an
 *                       open V flap, two corner folds, and a four-point
 *                       burst inside. Solid deep-ink black throughout.
 *                       `size` sets the height; width auto-derives from
 *                       the 1080×759.53 viewBox.
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
  // Custom mark: rounded envelope with an open flap, two corner folds,
  // and a four-point burst inside (the "contents" of the invitation).
  // Source SVG supplied by the brand owner — scaled by height so the
  // 1080×759.53 viewBox auto-computes the right width.
  return (
    <svg
      viewBox="0 0 1080 759.53"
      height={size}
      className={className}
      role={ariaHidden ? undefined : 'img'}
      aria-hidden={ariaHidden ? true : undefined}
      aria-label={ariaHidden ? undefined : title || 'دعوتي'}
      fill="#0e0e14"
    >
      <path d="M1014.99,139.94c-14.84-38.22-44.8-68.96-82.49-84.84-18.01-7.59-37.79-11.79-58.53-11.79H206.02c-7.54,0-14.96.56-22.2,1.63-52.31,7.73-95.97,42.34-116.46,89.3-8.06,18.47-12.54,38.86-12.54,60.27v370.52c0,82.47,66.38,149.74,148.51,151.17.9.02,1.79.03,2.69.03h667.95c8.28,0,16.41-.67,24.33-1.96,71.85-11.67,126.88-74.15,126.88-149.24V194.51c0-19.23-3.61-37.64-10.19-54.57ZM979.18,565.03c0,58.01-47.2,105.2-105.21,105.2H206.02c-58.01,0-105.2-47.19-105.2-105.2V194.51c0-16.79,3.96-32.68,11-46.78,17.23-34.6,52.99-58.42,94.2-58.42h667.95c41.31,0,77.14,23.93,94.33,58.66,6.97,14.04,10.88,29.84,10.88,46.54v370.52Z" />
      <path d="M380.22,539.32l-130.92,130.91h65.06l98.39-98.38-32.53-32.53ZM698.48,514.45l-32.52,32.53,123.25,123.25h65.05l-155.78-155.78Z" />
      <path d="M979.18,194.51v38.54c-2.67,3.13-5.47,6.17-8.41,9.11l-272.29,272.29-32.52,32.53-32.12,32.12c-29.48,29.47-68.2,44.21-106.92,44.21s-77.44-14.74-106.92-44.21L109.22,268.32c-2.94-2.94-5.74-5.97-8.4-9.1v-64.71c0-16.79,3.96-32.68,11-46.78-.59,4.5-.88,9.06-.88,13.67,0,28.1,10.94,54.52,30.81,74.39l271,271,32.52,32.53,7.25,7.25c19.88,19.87,46.3,30.81,74.4,30.81s54.52-10.94,74.39-30.81l32.12-32.12,32.53-32.52,272.29-272.3c16.84-16.84,27.26-38.38,30.05-61.66,6.97,14.04,10.88,29.84,10.88,46.54Z" />
      <path d="M564.93,283.11c20.7,30.51,52.2,46.77,86.92,51.41,3.91.52,9.5-.32,13.27,1.17.77.3.95-.19.77,1.24-10.06.37-19.59,1.39-29.43,3.69-16.94,3.97-33.32,11.16-47.37,21.98-37.31,28.73-57.97,93.62-61.42,140.71-.23,3.16.98,8.09-1.1,10.3-1.2-4.41-.71-9.35-1.18-13.76-5.64-51.96-27.86-118.18-72.99-145.47-18.64-11.27-41.34-17.28-62.61-18.12l-4.21-1.1,24.47-3.09c36.45-7.46,64.21-27,83.91-60.22,19.76-33.32,30.05-72.89,32.06-112.2,2.89.58,1.45,6.98,1.66,9.71,2.95,37.52,16.39,82.97,37.26,113.74Z" />
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
