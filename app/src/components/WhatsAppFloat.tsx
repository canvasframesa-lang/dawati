/**
 * Floating WhatsApp support button — rendered once in the root layout
 * so every page on the site shows it (landing, order, preview, marah,
 * tanzeem, all PageShell pages). Bottom-right fixed position.
 *
 * The phone number and prefilled greeting are constants here so a
 * future tweak only touches one file. The number is also exported as
 * SOCIAL_LINKS in PageShell.tsx — keep them in sync if either moves.
 */

export const WHATSAPP_NUMBER = '966550047481';
export const WHATSAPP_MESSAGE = 'السلام عليكم، عندي استفسار عن دعوتي';

export function WhatsAppFloat() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا على واتساب"
      className="fixed bottom-5 right-5 z-[60] flex items-center justify-center rounded-full transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
      style={{
        width: 60,
        height: 60,
        background: '#25D366',
        boxShadow: '0 10px 28px rgba(37, 211, 102, 0.45), 0 4px 10px rgba(0, 0, 0, 0.18)',
      }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="#ffffff" aria-hidden="true">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.832.736 5.49 2.022 7.797L0 32l8.413-2.225A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.357a13.31 13.31 0 0 1-6.776-1.846l-.486-.288-5.04 1.331 1.345-4.92-.317-.504A13.31 13.31 0 0 1 2.643 16C2.643 8.6 8.6 2.643 16 2.643c7.4 0 13.357 5.957 13.357 13.357S23.4 29.357 16 29.357zm7.276-9.972c-.39-.195-2.31-1.14-2.668-1.27-.358-.13-.618-.195-.878.195-.26.39-1.008 1.27-1.236 1.53-.227.26-.455.293-.845.098-.39-.195-1.647-.607-3.137-1.937-1.16-1.035-1.943-2.314-2.171-2.704-.227-.39-.024-.6.171-.795.176-.176.39-.455.585-.683.195-.227.26-.39.39-.65.13-.26.065-.488-.033-.683-.098-.195-.878-2.116-1.203-2.896-.317-.762-.64-.659-.878-.671a16.85 16.85 0 0 0-.748-.014c-.26 0-.683.098-1.04.488-.358.39-1.366 1.334-1.366 3.255 0 1.92 1.398 3.778 1.594 4.038.195.26 2.751 4.202 6.668 5.892.932.402 1.659.642 2.226.821.935.297 1.787.255 2.46.155.75-.112 2.31-.944 2.636-1.856.325-.911.325-1.692.228-1.856-.098-.163-.358-.26-.748-.455z" />
      </svg>
    </a>
  );
}
