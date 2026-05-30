'use client';

import { useHeroTick, TOTAL_NOTIFS } from '@/lib/useHeroTick';

type Notif = { id: number; title: string; body: string };

const FEED: Notif[] = [
  { id: 1, title: 'تأكيد حضور',  body: 'أحمد الزامل أكّد حضوره' },
  { id: 2, title: 'رسالة جديدة', body: 'كريمة الفوزان: «ألف مبروك يا غالي»' },
  { id: 3, title: 'تأكيد حضور',  body: 'فيصل القحطاني + ٢ مرافقين' },
  { id: 4, title: 'تفضيل وجبة',  body: 'سارة الراشد اختارت: نباتي' },
  { id: 5, title: 'اعتذار',      body: 'محمد السبيعي يعتذر، مع تمنياته بالتوفيق' },
];

/* ============ The notification feed inside the phone ============ */

const CARD_HEIGHT = 64;
const CARD_GAP = 6;
const CARD_STEP = CARD_HEIGHT + CARD_GAP;

export function NotificationStack() {
  const { cycle, arrivedCount, isFading } = useHeroTick();

  return (
    <div
      aria-hidden="true"
      className="absolute z-30 pointer-events-none"
      style={{ top: 230, left: 12, right: 12 }}
    >
      <div className="relative" style={{ height: CARD_STEP * TOTAL_NOTIFS }}>
        {FEED.slice(0, arrivedCount).map((notif, idx) => {
          // depth = 0 means newest (top); each older card sits one slot below.
          const depth = arrivedCount - 1 - idx;
          const yPos = depth * CARD_STEP;
          // Subtle dim so the eye reads newest-first without losing legibility.
          const restingOpacity = depth === 0 ? 1 : depth === 1 ? 0.92 : 0.82;

          return (
            <div
              key={`${cycle}-${notif.id}`}
              className="absolute left-0 right-0"
              style={{
                top: yPos,
                opacity: isFading ? 0 : restingOpacity,
                zIndex: 100 - depth,
                transition:
                  'top 380ms cubic-bezier(0.4, 0, 0.2, 1), ' +
                  'opacity 400ms ease',
              }}
            >
              {/* Inner wrapper: entrance animation isolated from
                  parent's top/opacity transitions. */}
              <div className="notif-enter">
                <NotifBubble notif={notif} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NotifBubble({ notif }: { notif: Notif }) {
  return (
    <div
      className="rounded-[18px] px-3 pt-2 pb-2.5"
      style={{
        background: 'rgba(28, 22, 18, 0.55)',
        backdropFilter: 'blur(22px) saturate(160%)',
        WebkitBackdropFilter: 'blur(22px) saturate(160%)',
        border: '0.5px solid rgba(255, 255, 255, 0.14)',
        boxShadow: '0 8px 22px rgba(0, 0, 0, 0.4)',
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="flex-shrink-0 rounded-[6px] flex items-center justify-center"
          style={{
            width: 18,
            height: 18,
            background:
              'linear-gradient(135deg, #fff8d8 0%, #f4d56e 35%, #c9a23d 70%, #8a6817 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          <span
            className="text-[8px] font-black"
            style={{ color: '#3a2806', fontFamily: 'var(--font-aref-ruqaa)', lineHeight: 1 }}
          >
            د
          </span>
        </div>
        <span className="text-white/75 text-[9px] font-bold uppercase tracking-wider flex-1">
          دعوتي
        </span>
        <span
          className="text-white/55 text-[9px]"
          style={{ fontFamily: 'var(--font-latin)' }}
        >
          الآن
        </span>
      </div>
      <div className="mt-1 text-white text-[12px] font-bold leading-tight">{notif.title}</div>
      <div
        className="text-white/85 text-[11.5px] leading-tight mt-0.5"
        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
      >
        {notif.body}
      </div>
    </div>
  );
}

/* ============ Floating RSVP counter (right side, desktop only) ============ */

export function RsvpCounterCard() {
  const { counter, cycle } = useHeroTick();
  const pct = Math.round((counter / 200) * 100);

  return (
    <div
      className="hidden md:block absolute -right-12 top-1/3 rounded-2xl p-4 bg-white"
      style={{
        animation: 'float-soft 4s ease-in-out infinite',
        border: '1px solid rgba(15, 15, 30, 0.08)',
        boxShadow: '0 14px 36px rgba(15, 15, 30, 0.18), 0 4px 8px rgba(15, 15, 30, 0.08)',
        minWidth: 156,
      }}
    >
      <div className="text-[10px] uppercase tracking-widest text-[var(--color-ink-mute)] mb-1 font-bold">
        أكّدوا الحضور
      </div>
      <div
        className="text-2xl font-black text-[var(--color-success-dark)] leading-none overflow-hidden"
        style={{ fontFamily: 'var(--font-latin)', height: 28 }}
      >
        <span
          key={`${cycle}-${counter}`}
          className="counter-flip block"
          dir="ltr"
        >
          {counter}
        </span>
      </div>
      <div
        className="text-[11px] text-[var(--color-ink-mute)] mt-1.5"
        dir="ltr"
        style={{ fontFamily: 'var(--font-latin)' }}
      >
        من أصل 200
      </div>
      <div className="mt-2 h-1 rounded-full bg-[var(--color-line)] overflow-hidden">
        <div
          className="h-full bg-[var(--color-success)]"
          style={{
            width: `${pct}%`,
            transition: 'width 480ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>
    </div>
  );
}

/* ============ Floating latest-message (left side, desktop only) ============ */

export function LatestMessageCard() {
  const { arrivedCount, cycle, isFading } = useHeroTick();
  const latest = FEED[Math.min(arrivedCount, TOTAL_NOTIFS) - 1] ?? FEED[0]!;

  return (
    <div
      className="hidden md:block absolute -left-12 bottom-1/4 rounded-2xl p-4 bg-white"
      style={{
        animation: 'float-soft 5s ease-in-out infinite reverse',
        border: '1px solid rgba(15, 15, 30, 0.08)',
        boxShadow: '0 14px 36px rgba(15, 15, 30, 0.18), 0 4px 8px rgba(15, 15, 30, 0.08)',
        minWidth: 220,
        opacity: isFading ? 0.55 : 1,
        transition: 'opacity 400ms ease',
      }}
    >
      <div className="text-[10px] uppercase tracking-widest text-[var(--color-ink-mute)] mb-1 font-bold">
        آخر رسالة
      </div>
      <div
        key={`${cycle}-${latest.id}`}
        className="text-sm font-bold text-[var(--color-ink)] message-flip"
      >
        {latest.body}
      </div>
      <div
        className="text-[11px] text-[var(--color-ink-mute)] mt-1.5"
        style={{ fontFamily: 'var(--font-latin)' }}
      >
        منذ ثوانٍ · دعوتي
      </div>
    </div>
  );
}
