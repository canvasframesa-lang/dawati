/**
 * Cosmos background — the warm-gold + violet nebula gradient over near-black.
 * Used on every public-facing page. Server-rendered (no JS needed).
 */
export function Cosmos() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: `
          radial-gradient(ellipse 55% 45% at 22% 18%, rgba(244, 208, 107, 0.16) 0%, transparent 65%),
          radial-gradient(ellipse 50% 40% at 78% 85%, rgba(217, 152, 120, 0.12) 0%, transparent 65%),
          radial-gradient(ellipse 60% 40% at 50% 45%, rgba(40, 18, 80, 0.35) 0%, transparent 70%),
          radial-gradient(ellipse 30% 20% at 85% 25%, rgba(120, 180, 255, 0.06) 0%, transparent 70%),
          #020207
        `,
      }}
    />
  );
}
