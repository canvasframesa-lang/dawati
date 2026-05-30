/**
 * AnimatedInvitation — a full-size animated mockup of an invitation card
 * in any of the six house styles. Server-rendered (no JS), all motion
 * comes from CSS keyframes defined in globals.css under the ai-* prefix.
 *
 * Reduced-motion users get the static layout (animations short-circuited
 * by the media query in globals.css).
 *
 * The data prop is intentionally tiny — defaults pulled from the matching
 * STYLE_DETAILS entry when not supplied. Callers can override any field
 * to preview a real customer's draft.
 */

import { STYLE_DETAILS } from '@/lib/style-details';
import type { SampleStyle } from '@/components/SampleCardTile';

export interface InvitationData {
  occasion: string;
  topLine?: string;
  bismillah?: string;
  verse?: { text: string; source: string };
  groomName: string;
  groomFamily?: string;
  brideName?: string;
  brideFamily?: string;
  date: string;
  dateGregorian?: string;
  time?: string;
  venue: string;
  venueCity?: string;
}

export function AnimatedInvitation({
  style,
  data,
}: {
  style: SampleStyle;
  data?: Partial<InvitationData>;
}) {
  const merged = mergeWithDefaults(style, data);

  return (
    <div
      className="relative mx-auto"
      style={{ width: '100%', maxWidth: 520, aspectRatio: '5 / 7' }}
    >
      <div className="absolute inset-0">
        {style === 'royal-cosmos'         && <RoyalCosmos data={merged} />}
        {style === 'modern-minimal'       && <ModernMinimal data={merged} />}
        {style === 'andalusian-arch'      && <AndalusianArch data={merged} />}
        {style === 'classical-manuscript' && <Manuscript data={merged} />}
        {style === 'botanical-rose'       && <BotanicalRose data={merged} />}
        {style === 'geometric-kufic'      && <GeometricKufic data={merged} />}
      </div>
    </div>
  );
}

function mergeWithDefaults(style: SampleStyle, data?: Partial<InvitationData>): InvitationData {
  const d = STYLE_DETAILS[style];
  return {
    occasion: d.sampleOccasion,
    topLine: d.sampleTopLine,
    groomName: d.sampleGroom,
    brideName: d.sampleBride,
    date: d.sampleDate,
    venue: d.sampleVenue,
    bismillah: 'بسم الله الرحمن الرحيم',
    verse: { text: 'وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً', source: 'الروم: ٢١' },
    ...data,
  };
}

/* ============ 1 · royal-cosmos =================================== */

function RoyalCosmos({ data }: { data: InvitationData }) {
  const stars = Array.from({ length: 28 }, (_, i) => i);
  const particles = Array.from({ length: 14 }, (_, i) => i);

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 55% 40% at 30% 22%, rgba(244,213,110,0.30) 0%, transparent 60%),
          radial-gradient(ellipse 65% 50% at 78% 85%, rgba(160,90,200,0.20) 0%, transparent 60%),
          linear-gradient(180deg, #050410 0%, #0a0820 50%, #050410 100%)
        `,
      }}
    >
      {/* Twinkling star field */}
      {stars.map((i) => {
        const x = ((i * 37) % 100);
        const y = ((i * 53) % 100);
        const size = (i % 3) + 1;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-white ai-twinkle"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: size, height: size,
              animationDelay: `${(i * 0.27) % 3}s`,
            }}
          />
        );
      })}

      {/* Drifting gold particles */}
      {particles.map((i) => (
        <span
          key={`p-${i}`}
          className="absolute rounded-full ai-drift"
          style={{
            left: `${(i * 41) % 90 + 5}%`,
            bottom: 0,
            width: 3, height: 3,
            background: 'radial-gradient(circle, #fff8d8, transparent 70%)',
            animationDelay: `${(i * 0.6) % 9}s`,
          }}
        />
      ))}

      {/* Lens-flare sweep (one-shot on load) */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-full w-1/3 pointer-events-none ai-flare"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,248,216,0.18), transparent)',
        }}
      />

      {/* Gold corner ornaments */}
      {([0, 1, 2, 3] as const).map((corner) => (
        <CornerOrnament key={corner} corner={corner} color="#f4d56e" />
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 py-10">
        {/* Rotating najmah at top */}
        <div className="ai-spin-slow mb-5" style={{ width: 64, height: 64 }}>
          <Najmah size={64} color="#f4d56e" />
        </div>

        <div
          className="text-[10px] tracking-[4px] mb-3 ai-rise text-[#b88a1e]"
          style={{ fontFamily: 'var(--font-latin)', animationDelay: '0.2s' }}
        >
          WEDDING · 1448 H
        </div>

        <div
          className="text-[11px] mb-1 ai-rise"
          style={{ color: '#fff8d8', animationDelay: '0.35s' }}
        >
          {data.bismillah}
        </div>

        <div
          className="ai-letter font-bold mb-3 text-gradient-gold"
          style={{
            fontFamily: 'var(--font-aref-ruqaa)',
            fontSize: 26, lineHeight: 1.3,
            animationDelay: '0.6s',
          }}
        >
          {data.verse?.text}
        </div>

        <div className="w-12 h-px bg-[#b88a1e] mb-4 ai-line" style={{ animationDelay: '0.9s' }} />

        <div
          className="text-[10px] tracking-[3px] mb-2 ai-rise"
          style={{ color: '#b88a1e', animationDelay: '1.0s' }}
        >
          العَريس
        </div>
        <div
          className="font-bold mb-3 text-gradient-gold ai-letter"
          style={{ fontFamily: 'var(--font-aref-ruqaa)', fontSize: 18, animationDelay: '1.15s' }}
        >
          {data.groomName}
        </div>

        <div className="text-2xl text-[#b88a1e] mb-2 ai-rise" style={{ fontFamily: 'var(--font-aref-ruqaa)', animationDelay: '1.3s' }}>
          و
        </div>

        <div
          className="text-[10px] tracking-[3px] mb-2 ai-rise"
          style={{ color: '#b88a1e', animationDelay: '1.4s' }}
        >
          العَروس
        </div>
        <div
          className="font-bold mb-5 text-gradient-gold ai-letter"
          style={{ fontFamily: 'var(--font-aref-ruqaa)', fontSize: 18, animationDelay: '1.55s' }}
        >
          {data.brideName ?? '—'}
        </div>

        <div
          className="text-[12px] pt-4 border-t border-[#8a6817]/40 ai-rise"
          style={{ color: '#fff8d8', animationDelay: '1.75s' }}
        >
          {data.date}
        </div>
        <div className="text-[11px] mt-1 ai-rise" style={{ color: '#c9a23d', animationDelay: '1.85s' }}>
          {data.venue}
        </div>
      </div>
    </div>
  );
}

/* ============ 2 · modern-minimal ================================ */

function ModernMinimal({ data }: { data: InvitationData }) {
  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden"
      style={{
        background: '#fafaf7',
        boxShadow: 'inset 0 0 80px rgba(0,0,0,0.04)',
      }}
    >
      {/* Subtle paper grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(0,0,0,0.05) 0.5px, transparent 1px)',
          backgroundSize: '6px 6px',
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10 py-12">
        <div
          className="text-[10px] tracking-[6px] mb-8 ai-rise"
          style={{ color: '#8a6817', fontFamily: 'var(--font-latin)', animationDelay: '0.1s' }}
        >
          SAVE THE DATE
        </div>

        <div
          className="text-xs mb-3 ai-rise"
          style={{ color: '#666', fontFamily: 'var(--font-tajawal)', animationDelay: '0.3s' }}
        >
          {data.topLine ?? data.occasion}
        </div>

        <div
          className="ai-letter font-bold mb-1 text-[var(--color-ink)]"
          style={{ fontFamily: 'var(--font-tajawal)', fontSize: 28, animationDelay: '0.5s' }}
        >
          {data.groomName}
        </div>

        <div className="w-16 h-px bg-[#d4a93a] my-4 ai-line" style={{ animationDelay: '0.8s' }} />

        <div
          className="ai-letter font-bold mb-8 text-[var(--color-ink)]"
          style={{ fontFamily: 'var(--font-tajawal)', fontSize: 28, animationDelay: '1.0s' }}
        >
          {data.brideName ?? '—'}
        </div>

        <div
          className="text-[11px] tracking-[2px] mb-1 ai-rise"
          style={{ color: '#8a6817', fontFamily: 'var(--font-latin)', animationDelay: '1.3s' }}
        >
          {data.date}
        </div>
        <div
          className="text-[11px] ai-rise"
          style={{ color: '#999', animationDelay: '1.4s' }}
        >
          {data.venue}
        </div>

        <div className="w-8 h-px bg-[#d4a93a] mt-8 ai-line" style={{ animationDelay: '1.6s' }} />
      </div>
    </div>
  );
}

/* ============ 3 · andalusian-arch =============================== */

function AndalusianArch({ data }: { data: InvitationData }) {
  // 6x9 zellige grid
  const tiles = Array.from({ length: 54 }, (_, i) => i);

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #f7ecd1 0%, #f0deb0 100%)',
      }}
    >
      {/* Zellige tile pattern, revealing one at a time */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-9 opacity-25">
        {tiles.map((i) => (
          <div
            key={i}
            className="border border-[#b88a1e] ai-tile flex items-center justify-center"
            style={{ animationDelay: `${i * 0.018}s` }}
          >
            <span
              className="block"
              style={{
                width: '60%', height: '60%',
                background: 'radial-gradient(circle, #b88a1e 30%, transparent 31%)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Horseshoe arch outline (draws on) */}
      <svg
        className="absolute top-6 left-1/2 -translate-x-1/2"
        width="200" height="240" viewBox="0 0 200 240" fill="none"
        aria-hidden="true"
      >
        <path
          d="M 30 230 L 30 110 Q 30 30 100 30 Q 170 30 170 110 L 170 230"
          stroke="#8a6817"
          strokeWidth="2"
          className="ai-draw"
          style={{ '--ai-len': '700' } as React.CSSProperties}
        />
      </svg>

      {/* Content under the arch */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10 pt-16 pb-10">
        <div
          className="text-[11px] tracking-[3px] mb-2 ai-rise"
          style={{ color: '#5a4310', fontFamily: 'var(--font-latin)', animationDelay: '1.5s' }}
        >
          AL-ANDALUS · 1448
        </div>

        <div
          className="ai-letter font-bold mb-1 mt-2"
          style={{
            fontFamily: 'var(--font-reem-kufi)',
            fontSize: 32, color: '#3a2806',
            animationDelay: '1.7s',
          }}
        >
          {data.groomName}
        </div>

        <div
          className="text-2xl mb-1 ai-rise"
          style={{ color: '#8a6817', fontFamily: 'var(--font-reem-kufi)', animationDelay: '1.9s' }}
        >
          و
        </div>

        <div
          className="ai-letter font-bold mb-5"
          style={{
            fontFamily: 'var(--font-reem-kufi)',
            fontSize: 32, color: '#3a2806',
            animationDelay: '2.1s',
          }}
        >
          {data.brideName ?? '—'}
        </div>

        <div className="w-20 h-px bg-[#8a6817] mb-4 ai-line" style={{ animationDelay: '2.4s' }} />

        <div
          className="text-[12px] mb-1 ai-rise"
          style={{ color: '#3a2806', animationDelay: '2.5s' }}
        >
          {data.date}
        </div>
        <div
          className="text-[11px] ai-rise"
          style={{ color: '#5a4310', animationDelay: '2.6s' }}
        >
          {data.venue}
        </div>
      </div>
    </div>
  );
}

/* ============ 4 · classical-manuscript ========================== */

function Manuscript({ data }: { data: InvitationData }) {
  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 100% 100% at 50% 50%, #fef7e3 0%, #f5e8c0 100%)
        `,
        boxShadow: 'inset 0 0 60px rgba(120, 80, 20, 0.18)',
      }}
    >
      {/* Filigree border — drawn on */}
      <svg
        className="absolute inset-4 pointer-events-none"
        viewBox="0 0 100 140"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect
          x="2" y="2" width="96" height="136"
          rx="2"
          fill="none"
          stroke="#8a6817"
          strokeWidth="0.4"
          className="ai-draw"
          style={{ '--ai-len': '500' } as React.CSSProperties}
        />
        <rect
          x="5" y="5" width="90" height="130"
          rx="1"
          fill="none"
          stroke="#c9a23d"
          strokeWidth="0.25"
          className="ai-draw"
          style={{ '--ai-len': '480', animationDelay: '0.3s' } as React.CSSProperties}
        />
      </svg>

      {/* Illuminated corner flourishes */}
      {([0, 1, 2, 3] as const).map((corner) => (
        <Flourish key={corner} corner={corner} color="#8a6817" delay={0.6 + corner * 0.12} />
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10 py-12">
        {/* Bismillah */}
        <div
          className="mb-5 ai-rise"
          style={{
            fontFamily: 'var(--font-amiri)',
            fontStyle: 'italic',
            fontSize: 16, color: '#5a4310',
            animationDelay: '1.1s',
          }}
        >
          {data.bismillah}
        </div>

        {/* Verse */}
        <div
          className="ai-letter font-bold mb-4"
          style={{
            fontFamily: 'var(--font-amiri)',
            fontStyle: 'italic',
            fontSize: 22, color: '#3a2806',
            lineHeight: 1.4,
            animationDelay: '1.3s',
          }}
        >
          {data.verse?.text}
        </div>

        <div
          className="text-[10px] mb-6 ai-rise"
          style={{ color: '#8a6817', animationDelay: '1.5s' }}
        >
          {data.verse?.source}
        </div>

        <div
          className="font-bold mb-1 ai-letter"
          style={{ fontFamily: 'var(--font-amiri)', fontSize: 18, color: '#3a2806', animationDelay: '1.7s' }}
        >
          {data.groomName}
        </div>
        <div className="text-xl my-1 ai-rise" style={{ color: '#8a6817', fontFamily: 'var(--font-amiri)', animationDelay: '1.9s' }}>
          و
        </div>
        <div
          className="font-bold mb-6 ai-letter"
          style={{ fontFamily: 'var(--font-amiri)', fontSize: 18, color: '#3a2806', animationDelay: '2.1s' }}
        >
          {data.brideName ?? '—'}
        </div>

        <div
          className="text-[12px] mb-1 ai-rise"
          style={{ color: '#5a4310', fontFamily: 'var(--font-amiri)', animationDelay: '2.3s' }}
        >
          {data.date}
        </div>
        <div
          className="text-[11px] ai-rise"
          style={{ color: '#5a4310', fontFamily: 'var(--font-amiri)', animationDelay: '2.4s' }}
        >
          {data.venue}
        </div>
      </div>
    </div>
  );
}

/* ============ 5 · botanical-rose ================================ */

function BotanicalRose({ data }: { data: InvitationData }) {
  const petals = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #fdf2ed 0%, #f7d7d2 100%)',
      }}
    >
      {/* Drifting petals */}
      {petals.map((i) => (
        <span
          key={i}
          className="absolute ai-petal pointer-events-none"
          style={{
            left: `${(i * 17 + 5) % 90}%`,
            top: '-20px',
            width: 8, height: 12,
            background: 'radial-gradient(ellipse at 50% 0%, #f49ea0, #c97078)',
            borderRadius: '50% 50% 50% 50% / 80% 80% 20% 20%',
            transformOrigin: 'center top',
            animationDelay: `${i * 0.9}s`,
            ['--ai-px' as string]: `${(i % 2 === 0 ? 1 : -1) * 30}px`,
          } as React.CSSProperties}
        />
      ))}

      {/* Corner blooms */}
      {([0, 1, 2, 3] as const).map((corner) => (
        <RoseCorner key={corner} corner={corner} delay={0.2 + corner * 0.18} />
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10 py-12">
        <div
          className="text-[10px] tracking-[4px] mb-4 ai-rise"
          style={{ color: '#a04050', fontFamily: 'var(--font-latin)', animationDelay: '1.0s' }}
        >
          A ROSE GARDEN AFFAIR
        </div>

        <div
          className="ai-letter font-bold mb-1"
          style={{
            fontFamily: 'var(--font-el-messiri)',
            fontSize: 30, color: '#5a1a25',
            animationDelay: '1.2s',
          }}
        >
          {data.groomName}
        </div>

        <div className="text-xl my-2 ai-rise" style={{ color: '#a04050', fontFamily: 'var(--font-el-messiri)', animationDelay: '1.5s' }}>
          ❀
        </div>

        <div
          className="ai-letter font-bold mb-6"
          style={{
            fontFamily: 'var(--font-el-messiri)',
            fontSize: 30, color: '#5a1a25',
            animationDelay: '1.7s',
          }}
        >
          {data.brideName ?? '—'}
        </div>

        <div className="w-12 h-px bg-[#a04050] mb-4 ai-line" style={{ animationDelay: '2.0s' }} />

        <div className="text-[12px] mb-1 ai-rise" style={{ color: '#5a1a25', animationDelay: '2.1s' }}>
          {data.date}
        </div>
        <div className="text-[11px] ai-rise" style={{ color: '#a04050', animationDelay: '2.2s' }}>
          {data.venue}
        </div>
      </div>
    </div>
  );
}

/* ============ 6 · geometric-kufic =============================== */

function GeometricKufic({ data }: { data: InvitationData }) {
  // 8x12 tile grid in deep tones
  const tiles = Array.from({ length: 96 }, (_, i) => i);

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a1532 0%, #2a1530 50%, #1a1532 100%)',
      }}
    >
      {/* Geometric tile pattern */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-12 opacity-30">
        {tiles.map((i) => {
          const variant = i % 4;
          return (
            <div
              key={i}
              className="ai-tile flex items-center justify-center"
              style={{ animationDelay: `${(i * 0.012) % 1.4}s` }}
            >
              <span
                className="block"
                style={{
                  width: '55%', height: '55%',
                  border: '1px solid #d4a93a',
                  transform: variant === 0 ? 'rotate(0)' : variant === 1 ? 'rotate(45deg)' : variant === 2 ? 'rotate(22.5deg)' : 'none',
                  borderRadius: variant === 3 ? '50%' : '0',
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10 py-12">
        <div className="ai-spin-slow mb-5" style={{ width: 56, height: 56 }}>
          <Najmah size={56} color="#f4d56e" />
        </div>

        <div
          className="text-[10px] tracking-[5px] mb-6 ai-rise"
          style={{ color: '#d4a93a', fontFamily: 'var(--font-latin)', animationDelay: '0.3s' }}
        >
          KUFI · GEOMETRIC
        </div>

        <div
          className="ai-letter font-bold mb-2"
          style={{
            fontFamily: 'var(--font-cairo)',
            fontWeight: 900,
            fontSize: 30, color: '#fff8d8',
            letterSpacing: '0.04em',
            animationDelay: '0.6s',
          }}
        >
          {data.groomName}
        </div>

        <div className="w-16 h-px bg-[#d4a93a] my-4 ai-line" style={{ animationDelay: '0.9s' }} />

        <div
          className="ai-letter font-bold mb-6"
          style={{
            fontFamily: 'var(--font-cairo)',
            fontWeight: 900,
            fontSize: 30, color: '#fff8d8',
            letterSpacing: '0.04em',
            animationDelay: '1.1s',
          }}
        >
          {data.brideName ?? '—'}
        </div>

        <div
          className="text-[12px] mb-1 ai-rise"
          style={{ color: '#d4a93a', fontFamily: 'var(--font-cairo)', animationDelay: '1.4s' }}
        >
          {data.date}
        </div>
        <div
          className="text-[11px] ai-rise"
          style={{ color: '#c9a23d', animationDelay: '1.5s' }}
        >
          {data.venue}
        </div>
      </div>
    </div>
  );
}

/* ============ Shared ornament primitives ======================== */

function Najmah({ size, color }: { size: number; color: string }) {
  const half = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <g transform={`translate(${half} ${half})`} fill={color}>
        <polygon points={`0,-${half * 0.85} ${half * 0.18},-${half * 0.18} ${half * 0.85},0 ${half * 0.18},${half * 0.18} 0,${half * 0.85} -${half * 0.18},${half * 0.18} -${half * 0.85},0 -${half * 0.18},-${half * 0.18}`} />
        <polygon
          points={`0,-${half * 0.85} ${half * 0.18},-${half * 0.18} ${half * 0.85},0 ${half * 0.18},${half * 0.18} 0,${half * 0.85} -${half * 0.18},${half * 0.18} -${half * 0.85},0 -${half * 0.18},-${half * 0.18}`}
          transform="rotate(22.5)" opacity="0.55"
        />
      </g>
    </svg>
  );
}

function CornerOrnament({ corner, color }: { corner: 0 | 1 | 2 | 3; color: string }) {
  // corner: 0=top-left, 1=top-right, 2=bottom-right, 3=bottom-left
  const positions = [
    { top: 10, left: 10, transform: 'rotate(0deg)' },
    { top: 10, right: 10, transform: 'rotate(90deg)' },
    { bottom: 10, right: 10, transform: 'rotate(180deg)' },
    { bottom: 10, left: 10, transform: 'rotate(270deg)' },
  ];
  const pos = positions[corner]!;
  return (
    <svg
      className="absolute ai-bloom"
      width="36" height="36" viewBox="0 0 36 36"
      style={{ ...pos, animationDelay: `${0.2 + corner * 0.1}s` }}
      aria-hidden="true"
    >
      <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
        <path d="M 4 4 L 28 4" />
        <path d="M 4 4 L 4 28" />
        <path d="M 4 10 Q 10 10 10 4" />
      </g>
    </svg>
  );
}

function Flourish({ corner, color, delay }: { corner: 0 | 1 | 2 | 3; color: string; delay: number }) {
  const positions = [
    { top: 12, left: 12, transform: 'rotate(0deg)' },
    { top: 12, right: 12, transform: 'rotate(90deg)' },
    { bottom: 12, right: 12, transform: 'rotate(180deg)' },
    { bottom: 12, left: 12, transform: 'rotate(270deg)' },
  ];
  const pos = positions[corner]!;
  return (
    <svg
      className="absolute ai-bloom"
      width="46" height="46" viewBox="0 0 46 46"
      style={{ ...pos, animationDelay: `${delay}s` }}
      aria-hidden="true"
    >
      <g fill="none" stroke={color} strokeWidth="0.8" strokeLinecap="round">
        <path d="M 4 4 Q 14 4 18 14 Q 24 8 30 14 Q 36 22 30 30" />
        <path d="M 4 4 Q 4 14 14 18 Q 8 24 14 30 Q 22 36 30 30" />
        <circle cx="22" cy="22" r="1.6" fill={color} />
      </g>
    </svg>
  );
}

function RoseCorner({ corner, delay }: { corner: 0 | 1 | 2 | 3; delay: number }) {
  const positions = [
    { top: 8, left: 8, transform: 'rotate(0deg)' },
    { top: 8, right: 8, transform: 'rotate(90deg)' },
    { bottom: 8, right: 8, transform: 'rotate(180deg)' },
    { bottom: 8, left: 8, transform: 'rotate(270deg)' },
  ];
  const pos = positions[corner]!;
  return (
    <svg
      className="absolute ai-bloom"
      width="64" height="64" viewBox="0 0 64 64"
      style={{ ...pos, animationDelay: `${delay}s` }}
      aria-hidden="true"
    >
      <g fill="none" stroke="#a04050" strokeWidth="1" strokeLinecap="round">
        <path d="M 6 6 Q 16 10 24 6 Q 22 16 28 24 Q 18 22 10 30 Q 14 20 6 6" />
        <circle cx="16" cy="16" r="3" fill="#c97078" stroke="none" opacity="0.7" />
        <circle cx="22" cy="22" r="2" fill="#a04050" stroke="none" opacity="0.5" />
      </g>
    </svg>
  );
}
