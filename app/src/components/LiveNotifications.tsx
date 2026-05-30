'use client';

import { useEffect, useState } from 'react';

type Notif = {
  id: number;
  title: string;
  body: string;
  time: string;
};

const FEED: Notif[] = [
  { id: 1, title: 'تأكيد حضور',        body: 'أحمد الزامل أكّد حضوره',                 time: 'الآن' },
  { id: 2, title: 'رسالة جديدة',       body: 'كريمة الفوزان: «ألف مبروك يا غالي»',      time: 'قبل دقيقة' },
  { id: 3, title: 'تأكيد حضور',        body: 'فيصل القحطاني + ٢ مرافقين',              time: 'قبل ٣ دقائق' },
  { id: 4, title: 'تفضيل وجبة',        body: 'سارة الراشد اختارت: نباتي',               time: 'قبل ٥ دقائق' },
  { id: 5, title: 'اعتذار',            body: 'محمد السبيعي يعتذر مع تمنياته بالتوفيق',  time: 'قبل ٧ دقائق' },
];

export function LiveNotifications() {
  const [head, setHead] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setHead((v) => (v + 1) % FEED.length), 2800);
    return () => clearInterval(id);
  }, []);

  // Stack: newest on top, two older peek below (iOS lock-screen pattern).
  const cards = [
    { n: FEED[head]!,                                          depth: 0 },
    { n: FEED[(head - 1 + FEED.length) % FEED.length]!,        depth: 1 },
    { n: FEED[(head - 2 + FEED.length) % FEED.length]!,        depth: 2 },
  ];

  return (
    <div
      aria-hidden="true"
      className="absolute z-30 pointer-events-none"
      style={{ top: 260, left: 12, right: 12 }}
    >
      <div className="relative" style={{ height: 130 }}>
        {/* Render deepest first so newest paints on top */}
        {cards.slice().reverse().map(({ n, depth }) => (
          <div
            key={`${head}-${depth}`}
            className="absolute left-0 right-0"
            style={{
              top: depth * 14,
              transform: `scale(${1 - depth * 0.05})`,
              transformOrigin: 'top center',
              opacity: 1 - depth * 0.28,
              zIndex: 10 - depth,
            }}
          >
            {/* Inner wrapper: handles entrance animation so it doesn't
                fight with the parent's depth-based transform/opacity. */}
            <div
              className="notif-stack-enter"
              style={{ animationDelay: `${(2 - depth) * 0.05}s` }}
            >
              <NotifBubble notif={n} />
            </div>
          </div>
        ))}
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
      {/* Top row: app icon + app name + time */}
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
          {notif.time}
        </span>
      </div>

      {/* Title + body */}
      <div className="mt-1 text-white text-[11px] font-bold leading-tight">{notif.title}</div>
      <div className="text-white/85 text-[11px] leading-tight mt-0.5 truncate">{notif.body}</div>
    </div>
  );
}
