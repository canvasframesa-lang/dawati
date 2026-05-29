import Link from 'next/link';

/**
 * Distinct visual styles for sample card thumbnails — show range.
 * Every style differs in font, frame, ornament, background, and feeling.
 */
export type SampleStyle =
  | 'royal-cosmos'      // Aref Ruqaa, dark gold-cosmos with star ornament (the Nuwairi look)
  | 'modern-minimal'    // Tajawal, all-white minimal with thin gold underlines
  | 'andalusian-arch'   // Reem Kufi, horseshoe arch top + zellige pattern
  | 'classical-manuscript' // Amiri italic, illuminated frame, golden filigree
  | 'botanical-rose'    // El Messiri, soft rose-gold with floral SVG corners
  | 'geometric-kufic';  // Cairo bold, geometric tile background

export interface SampleTileData {
  style: SampleStyle;
  occasion: string;
  badge?: string;          // e.g., 'الأكثر طلبًا'
  topLine?: string;        // e.g., 'دعوة زواج'
  groomName: string;
  brideName?: string;
  date: string;
  venue: string;
  href: string;
  tierLabel: string;
}

export function SampleCardTile({ data }: { data: SampleTileData }) {
  return (
    <article
      className="group rounded-2xl overflow-hidden bg-white border border-[var(--color-line)] hover:shadow-lg transition-all hover:-translate-y-0.5"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="aspect-[3/4]">
        {data.style === 'royal-cosmos' && <RoyalCosmosTile data={data} />}
        {data.style === 'modern-minimal' && <ModernMinimalTile data={data} />}
        {data.style === 'andalusian-arch' && <AndalusianTile data={data} />}
        {data.style === 'classical-manuscript' && <ManuscriptTile data={data} />}
        {data.style === 'botanical-rose' && <BotanicalRoseTile data={data} />}
        {data.style === 'geometric-kufic' && <GeometricKuficTile data={data} />}
      </div>
      <div className="p-4 flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[var(--color-ink)]">{data.occasion}</span>
          <span className="text-[10px] text-[var(--color-ink-mute)]">{data.tierLabel}</span>
        </div>
        <Link
          href={data.href}
          className="text-xs font-bold text-[var(--color-ink)] hover:text-[var(--color-gold-3)] transition"
        >
          مثل هذي ←
        </Link>
      </div>
    </article>
  );
}

/* ============ Style 1 — Royal Cosmos (the Nuwairi look) ============ */
function RoyalCosmosTile({ data }: { data: SampleTileData }) {
  return (
    <div
      className="h-full flex flex-col items-center justify-center text-center p-6 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 60% 50% at 30% 20%, rgba(244,208,107,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 80% 90%, rgba(217,152,120,0.12) 0%, transparent 60%),
          #050714
        `,
      }}
    >
      {/* Star ornament */}
      <svg width="40" height="40" viewBox="0 0 40 40" className="mb-3" aria-hidden="true">
        <g transform="translate(20 20)" fill="#f4d56e">
          <polygon points="0,-14 4,-4 14,0 4,4 0,14 -4,4 -14,0 -4,-4" />
          <polygon points="0,-14 4,-4 14,0 4,4 0,14 -4,4 -14,0 -4,-4" transform="rotate(45)" opacity="0.5" />
        </g>
      </svg>
      <div className="text-[9px] tracking-[3px] mb-2" style={{ color: '#b88a1e', fontFamily: 'var(--font-latin)' }}>
        EID · CLASSIC · 1448
      </div>
      <div
        className="font-bold text-gradient-gold leading-tight mb-3"
        style={{ fontFamily: 'var(--font-aref-ruqaa)', fontSize: 'clamp(15px, 2.2vw, 20px)' }}
      >
        {data.groomName}
        {data.brideName && (
          <>
            <div className="text-[#b88a1e] my-1" style={{ fontSize: 18 }}>و</div>
            {data.brideName}
          </>
        )}
      </div>
      <div className="text-[10px]" style={{ color: '#d4a93a' }}>
        {data.date}
      </div>
      <div className="text-[9px] mt-1" style={{ color: '#8a6817', opacity: 0.9 }}>
        {data.venue}
      </div>
      {/* Corner ornaments */}
      <span className="absolute top-3 right-3 w-5 h-5 border-t border-r" style={{ borderColor: 'rgba(244,213,110,0.5)' }} />
      <span className="absolute top-3 left-3 w-5 h-5 border-t border-l" style={{ borderColor: 'rgba(244,213,110,0.5)' }} />
      <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r" style={{ borderColor: 'rgba(244,213,110,0.5)' }} />
      <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l" style={{ borderColor: 'rgba(244,213,110,0.5)' }} />
    </div>
  );
}

/* ============ Style 2 — Modern Minimal ============ */
function ModernMinimalTile({ data }: { data: SampleTileData }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-white relative">
      <div className="w-12 h-px mb-4" style={{ background: 'linear-gradient(90deg, transparent, #b88a1e, transparent)' }} />
      <div className="text-[9px] tracking-[4px] uppercase mb-5" style={{ color: '#b88a1e', fontFamily: 'var(--font-latin)' }}>
        — Save the Date —
      </div>
      <div
        className="text-[var(--color-ink)] leading-tight mb-1"
        style={{ fontFamily: 'var(--font-tajawal)', fontWeight: 900, fontSize: 'clamp(18px, 2.6vw, 24px)' }}
      >
        {data.groomName}
      </div>
      {data.brideName && (
        <>
          <div className="text-[#d4a93a] my-1.5" style={{ fontFamily: 'var(--font-tajawal)', fontWeight: 300, fontSize: 14, letterSpacing: 8 }}>
            &amp;
          </div>
          <div
            className="text-[var(--color-ink)] leading-tight mb-4"
            style={{ fontFamily: 'var(--font-tajawal)', fontWeight: 900, fontSize: 'clamp(18px, 2.6vw, 24px)' }}
          >
            {data.brideName}
          </div>
        </>
      )}
      <div className="w-12 h-px mb-3" style={{ background: 'linear-gradient(90deg, transparent, #b88a1e, transparent)' }} />
      <div className="text-[11px]" style={{ color: '#6a6a7a', fontFamily: 'var(--font-tajawal)' }}>
        {data.date}
      </div>
      <div className="text-[10px] mt-0.5" style={{ color: '#b0b0bd', fontFamily: 'var(--font-tajawal)' }}>
        {data.venue}
      </div>
    </div>
  );
}

/* ============ Style 3 — Andalusian Arch ============ */
function AndalusianTile({ data }: { data: SampleTileData }) {
  return (
    <div
      className="h-full flex flex-col items-center justify-end text-center px-5 pb-7 pt-2 relative overflow-hidden"
      style={{
        background: `
          repeating-linear-gradient(45deg, transparent 0px, transparent 8px, rgba(184,138,30,0.04) 8px, rgba(184,138,30,0.04) 16px),
          linear-gradient(180deg, #f4e8d2 0%, #fdf6e3 100%)
        `,
      }}
    >
      {/* Andalusian horseshoe arch */}
      <svg viewBox="0 0 200 240" className="absolute inset-x-0 top-0 w-full h-3/5" preserveAspectRatio="xMidYMin meet">
        <defs>
          <linearGradient id="arch-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#fdf6e3" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M 30 240 L 30 110 A 70 70 0 0 1 100 40 A 70 70 0 0 1 170 110 L 170 240 Z"
          fill="url(#arch-fill)"
          stroke="#b88a1e"
          strokeWidth="1.5"
        />
        {/* Inner arch lines */}
        <path
          d="M 45 240 L 45 115 A 55 55 0 0 1 100 60 A 55 55 0 0 1 155 115 L 155 240"
          fill="none"
          stroke="#b88a1e"
          strokeWidth="0.7"
          opacity="0.4"
        />
      </svg>
      <div className="relative z-10">
        <div className="text-[9px] tracking-[3px] mb-2 font-semibold" style={{ color: '#8a6817', fontFamily: 'var(--font-reem-kufi)' }}>
          ✦ {data.topLine ?? data.occasion} ✦
        </div>
        <div
          className="leading-tight mb-2"
          style={{ fontFamily: 'var(--font-reem-kufi)', fontWeight: 700, fontSize: 'clamp(15px, 2.2vw, 19px)', color: '#4a2c0a' }}
        >
          {data.groomName}
          {data.brideName && (
            <>
              <div className="text-[#b88a1e] my-1" style={{ fontSize: 16 }}>و</div>
              {data.brideName}
            </>
          )}
        </div>
        <div className="text-[10px] mt-2" style={{ color: '#8a6817', fontFamily: 'var(--font-reem-kufi)' }}>
          {data.date}
        </div>
        <div className="text-[10px]" style={{ color: '#b88a1e', fontFamily: 'var(--font-reem-kufi)' }}>
          {data.venue}
        </div>
      </div>
    </div>
  );
}

/* ============ Style 4 — Classical Manuscript ============ */
function ManuscriptTile({ data }: { data: SampleTileData }) {
  return (
    <div
      className="h-full p-5 relative"
      style={{
        background: 'linear-gradient(180deg, #faf5e6 0%, #f4ead0 100%)',
      }}
    >
      {/* Illuminated double frame */}
      <div
        className="absolute inset-4 border-2"
        style={{
          borderColor: '#b88a1e',
          borderRadius: 2,
        }}
      />
      <div
        className="absolute inset-5 border"
        style={{
          borderColor: 'rgba(184, 138, 30, 0.5)',
          borderRadius: 2,
        }}
      />
      {/* Corner decorations (filigree dots) */}
      {[
        ['top-3', 'right-3'],
        ['top-3', 'left-3'],
        ['bottom-3', 'right-3'],
        ['bottom-3', 'left-3'],
      ].map(([y, x]) => (
        <div key={`${y}-${x}`} className={`absolute ${y} ${x} w-2 h-2 rounded-full`} style={{ background: '#b88a1e' }} />
      ))}

      <div className="h-full flex flex-col items-center justify-center text-center px-3 relative">
        <div className="mb-3" style={{ color: '#b88a1e' }}>❀</div>
        <div className="text-[9px] tracking-[3px] mb-3" style={{ color: '#8a6817', fontFamily: 'var(--font-amiri)', fontStyle: 'italic' }}>
          بسم الله الرحمن الرحيم
        </div>
        <div
          className="leading-tight mb-2"
          style={{
            fontFamily: 'var(--font-amiri)',
            fontWeight: 700,
            fontStyle: 'italic',
            fontSize: 'clamp(15px, 2.3vw, 20px)',
            color: '#3a1f08',
          }}
        >
          {data.groomName}
          {data.brideName && (
            <>
              <div style={{ color: '#b88a1e', fontStyle: 'normal', fontSize: 14, margin: '4px 0' }}>—</div>
              {data.brideName}
            </>
          )}
        </div>
        <div className="text-[10px] mt-3" style={{ color: '#8a6817', fontFamily: 'var(--font-amiri)' }}>
          {data.date}
        </div>
        <div className="text-[9px]" style={{ color: '#b88a1e', fontFamily: 'var(--font-amiri)', fontStyle: 'italic' }}>
          {data.venue}
        </div>
      </div>
    </div>
  );
}

/* ============ Style 5 — Botanical Rose ============ */
function BotanicalRoseTile({ data }: { data: SampleTileData }) {
  return (
    <div
      className="h-full p-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(155deg, #fdf2ee 0%, #f5d2c8 100%)',
      }}
    >
      {/* Floral SVG decorations in corners */}
      <FloralCorner className="absolute top-2 right-2 w-16 h-16 opacity-60" rotate={0} />
      <FloralCorner className="absolute bottom-2 left-2 w-16 h-16 opacity-60" rotate={180} />

      <div className="h-full flex flex-col items-center justify-center text-center relative">
        <div className="text-[10px] tracking-[3px] mb-3 font-semibold" style={{ color: '#8a4a30', fontFamily: 'var(--font-el-messiri)' }}>
          ❀ {data.topLine ?? data.occasion} ❀
        </div>
        <div
          className="leading-tight mb-3"
          style={{
            fontFamily: 'var(--font-el-messiri)',
            fontWeight: 700,
            fontSize: 'clamp(16px, 2.4vw, 21px)',
            color: '#5a2010',
          }}
        >
          {data.groomName}
          {data.brideName && (
            <>
              <div style={{ color: '#d99878', fontSize: 18, margin: '4px 0' }}>♡</div>
              {data.brideName}
            </>
          )}
        </div>
        <div className="text-[10px] mt-2" style={{ color: '#8a4a30', fontFamily: 'var(--font-el-messiri)' }}>
          {data.date}
        </div>
        <div className="text-[10px]" style={{ color: '#a76040', fontFamily: 'var(--font-el-messiri)', fontStyle: 'italic' }}>
          {data.venue}
        </div>
      </div>
    </div>
  );
}

function FloralCorner({ className, rotate }: { className?: string; rotate: number }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true" style={{ transform: `rotate(${rotate}deg)` }}>
      <g fill="none" stroke="#a76040" strokeWidth="1" opacity="0.7">
        {/* Stem */}
        <path d="M 5 55 Q 15 35 25 25" />
        {/* Leaves */}
        <ellipse cx="15" cy="40" rx="4" ry="8" transform="rotate(-30 15 40)" fill="#d99878" fillOpacity="0.4" />
        <ellipse cx="22" cy="32" rx="3" ry="6" transform="rotate(-50 22 32)" fill="#d99878" fillOpacity="0.4" />
        {/* Rose head — 3 layered circles */}
        <circle cx="30" cy="20" r="8" fill="#e09a85" fillOpacity="0.7" stroke="none" />
        <circle cx="30" cy="20" r="5" fill="#c97560" fillOpacity="0.7" stroke="none" />
        <circle cx="30" cy="20" r="2.5" fill="#a04a35" stroke="none" />
      </g>
    </svg>
  );
}

/* ============ Style 6 — Geometric Kufic ============ */
function GeometricKuficTile({ data }: { data: SampleTileData }) {
  return (
    <div
      className="h-full relative overflow-hidden"
      style={{
        background: '#0e1d2e',
      }}
    >
      {/* Geometric pattern background */}
      <svg className="absolute inset-0 w-full h-full opacity-25" aria-hidden="true">
        <defs>
          <pattern id="kufic-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="none" />
            <path d="M 20 0 L 40 20 L 20 40 L 0 20 Z" fill="none" stroke="#d4a93a" strokeWidth="0.7" />
            <circle cx="20" cy="20" r="3" fill="#d4a93a" />
            <line x1="0" y1="20" x2="40" y2="20" stroke="#d4a93a" strokeWidth="0.5" />
            <line x1="20" y1="0" x2="20" y2="40" stroke="#d4a93a" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#kufic-pattern)" />
      </svg>

      {/* Central content */}
      <div className="h-full flex flex-col items-center justify-center text-center px-5 relative">
        <div
          className="px-3 py-1 mb-4 rounded-sm text-[9px] tracking-[3px]"
          style={{
            background: '#d4a93a',
            color: '#0e1d2e',
            fontFamily: 'var(--font-cairo)',
            fontWeight: 700,
          }}
        >
          {data.topLine ?? data.occasion}
        </div>
        <div
          className="leading-tight mb-3"
          style={{
            fontFamily: 'var(--font-cairo)',
            fontWeight: 900,
            fontSize: 'clamp(16px, 2.4vw, 21px)',
            color: '#f4d56e',
            letterSpacing: 1,
          }}
        >
          {data.groomName}
          {data.brideName && (
            <>
              <div style={{ color: '#d4a93a', fontSize: 14, margin: '6px 0', letterSpacing: 4 }}>◆◆◆</div>
              {data.brideName}
            </>
          )}
        </div>
        <div
          className="text-[10px] mt-2 px-3 py-1 border"
          style={{
            color: '#f4d56e',
            borderColor: 'rgba(212,169,58,0.5)',
            fontFamily: 'var(--font-cairo)',
            fontWeight: 600,
          }}
        >
          {data.date}
        </div>
        <div className="text-[10px] mt-2" style={{ color: '#d4a93a', fontFamily: 'var(--font-cairo)' }}>
          {data.venue}
        </div>
      </div>
    </div>
  );
}
