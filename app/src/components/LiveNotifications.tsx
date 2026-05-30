'use client';

import { useEffect, useState } from 'react';

type Notif = {
  id: number;
  kind: 'rsvp-yes' | 'rsvp-no' | 'message' | 'meal' | 'companions';
  title: string;
  body: string;
};

const FEED: Notif[] = [
  { id: 1, kind: 'rsvp-yes',   title: 'تأكيد حضور',        body: 'أحمد الزامل أكّد حضوره' },
  { id: 2, kind: 'message',    title: 'رسالة جديدة',       body: 'كريمة الفوزان: ألف مبروك يا غالي' },
  { id: 3, kind: 'companions', title: 'تأكيد حضور',        body: 'فيصل القحطاني + ٢ مرافقين' },
  { id: 4, kind: 'meal',       title: 'تفضيل وجبة',        body: 'سارة الراشد اختارت: نباتي' },
  { id: 5, kind: 'rsvp-no',    title: 'اعتذار مع رسالة',   body: 'محمد السبيعي يعتذر مع تمنياته بالتوفيق' },
];

const KIND_ICON: Record<Notif['kind'], string> = {
  'rsvp-yes':   '✓',
  'rsvp-no':    '·',
  'message':    '✉',
  'meal':       '🍽',
  'companions': '+',
};

export function LiveNotifications() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % FEED.length), 3200);
    return () => clearInterval(id);
  }, []);

  const n = FEED[i]!;

  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 -translate-x-1/2 z-40 pointer-events-none"
      style={{ top: 64, width: 'calc(100% - 24px)' }}
    >
      {/* key swap re-triggers the CSS animation on every cycle */}
      <div
        key={n.id}
        className="rounded-[20px] px-3 py-2.5 flex items-center gap-2.5 notif-slide"
        style={{
          background: 'rgba(28, 22, 18, 0.62)',
          backdropFilter: 'blur(22px) saturate(160%)',
          WebkitBackdropFilter: 'blur(22px) saturate(160%)',
          border: '0.5px solid rgba(255, 255, 255, 0.14)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
        }}
      >
        <div
          className="flex-shrink-0 rounded-[8px] flex items-center justify-center text-white text-[12px] font-bold"
          style={{
            width: 28,
            height: 28,
            background: 'linear-gradient(135deg, #f4d56e 0%, #c9a23d 50%, #8a6817 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          <span>{KIND_ICON[n.kind]}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-white/95 text-[11px] font-bold truncate">{n.title}</span>
            <span
              className="text-white/55 text-[10px] flex-shrink-0"
              style={{ fontFamily: 'var(--font-latin)' }}
            >
              الآن
            </span>
          </div>
          <div className="text-white/85 text-[11px] leading-tight truncate mt-0.5">{n.body}</div>
        </div>
      </div>
    </div>
  );
}
