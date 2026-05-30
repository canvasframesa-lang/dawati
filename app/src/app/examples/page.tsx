import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell, H1, Lead, PageContainer } from '@/components/PageShell';
import { SampleCardTile, type SampleStyle } from '@/components/SampleCardTile';

export const metadata: Metadata = {
  title: 'أمثلة من تصاميمنا',
  description: 'استعرض ٦ أنماط مختلفة من بطاقات الدعوة — فخامة كلاسيكية، نعومة عصرية، زخارف أندلسية، خط مخطوطات، طبيعية وردية، وكوفي هندسي',
};

interface Sample {
  style: SampleStyle;
  styleLabel: string;
  styleNote: string;
  occasion: string;
  topLine?: string;
  groomName: string;
  brideName?: string;
  date: string;
  venue: string;
  tierLabel: string;
  href: string;
}

const SAMPLES: Sample[] = [
  {
    style: 'royal-cosmos',
    styleLabel: 'الفخامة الكلاسيكية',
    styleNote: 'كوزموز ذهبي وخط Aref Ruqaa — تليق بزواج عائلي كبير.',
    occasion: 'زواج',
    topLine: 'دعوة زواج',
    groomName: 'فيصل الراجحي',
    brideName: 'كريمة الفوزان',
    date: 'الجمعة ٤ محرّم ١٤٤٨',
    venue: 'الرياض · الفيصلية',
    tierLabel: 'الفاخرة',
    href: '/order?tier=fakhira',
  },
  {
    style: 'modern-minimal',
    styleLabel: 'النعومة العصرية',
    styleNote: 'تخطيط مينيمال بخط Tajawal — للأذواق الحديثة الراقية.',
    occasion: 'زواج',
    topLine: 'Save the Date',
    groomName: 'عبد العزيز التويجري',
    brideName: 'كريمة السديري',
    date: 'الخميس ١٦ صفر ١٤٤٨',
    venue: 'جدة · شاطئ السلام',
    tierLabel: 'الملكية',
    href: '/order?tier=malakiyya',
  },
  {
    style: 'andalusian-arch',
    styleLabel: 'الزخارف الأندلسية',
    styleNote: 'قوس أندلسي وخط Reem Kufi — لأجواء العمارة الإسلامية.',
    occasion: 'خطوبة',
    topLine: 'دعوة خطوبة',
    groomName: 'سلطان البابطين',
    brideName: 'كريمة الزامل',
    date: 'الأحد ٢٦ صفر ١٤٤٨',
    venue: 'الرياض · حطّين',
    tierLabel: 'الفاخرة',
    href: '/order?tier=fakhira',
  },
  {
    style: 'classical-manuscript',
    styleLabel: 'المخطوط الكلاسيكي',
    styleNote: 'إطار مذهَّب وخط Amiri مائل — يحاكي المخطوطات القديمة.',
    occasion: 'عقيقة',
    topLine: 'بشرى مولود',
    groomName: 'عبد الملك',
    date: 'السبت ٢٠ ذو الحجة ١٤٤٧',
    venue: 'الرياض · الياسمين',
    tierLabel: 'المميّزة',
    href: '/order?tier=mumayyaza',
  },
  {
    style: 'botanical-rose',
    styleLabel: 'الطبيعية الوردية',
    styleNote: 'زهور ودرجات الورد وخط El Messiri — للحفلات النسائية الراقية.',
    occasion: 'استقبال',
    topLine: 'استقبال عروس',
    groomName: 'الأميرة لمياء',
    brideName: 'وصديقاتها',
    date: 'الخميس ١٠ ربيع الأول ١٤٤٨',
    venue: 'جدة · قصر السلام',
    tierLabel: 'الملكية',
    href: '/order?tier=malakiyya',
  },
  {
    style: 'geometric-kufic',
    styleLabel: 'الكوفي الهندسي',
    styleNote: 'نمط هندسي وخط Cairo — للحفلات المعاصرة الجريئة.',
    occasion: 'تخرّج',
    topLine: 'حفل تخرّج',
    groomName: 'م. عبد الرحمن الفهد',
    date: 'الأحد ٢٨ ذو الحجة ١٤٤٧',
    venue: 'الرياض · جامعة الملك سعود',
    tierLabel: 'المميّزة',
    href: '/order?tier=mumayyaza',
  },
];

export default function ExamplesPage() {
  return (
    <PageShell>
      <PageContainer>
        <H1>ستة أنماط · ستة أذواق</H1>
        <Lead>
          لكل مناسبة لمستها الخاصة. اختر النمط الذي يعكس روح حفلك، ووصِفه لنا — ونحن ننفّذه.
          هذي عيّنات توضّح المدى، لكن كل بطاقة فعليّة تُصمَّم خصّيصًا لطلبك.
        </Lead>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLES.map((s) => (
            <div key={s.style} className="flex flex-col gap-3">
              <SampleCardTile data={s} />
              <div className="px-2">
                <h3 className="text-base font-bold text-[var(--color-ink)] mb-1">{s.styleLabel}</h3>
                <p className="text-sm text-[var(--color-ink-mute)] leading-relaxed mb-2">{s.styleNote}</p>
                <Link
                  href={`/examples/${s.style}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-[var(--color-ink)] hover:text-[var(--color-gold-3)] transition"
                >
                  شف التفاصيل الكاملة ←
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <p className="text-[var(--color-ink-mute)] mb-6">
            ما لقيت النمط اللي يناسبك؟ احكِ لنا في طلبك وسنُصمّم نمطًا خاصًّا بك.
          </p>
          <Link href="/order" className="btn-gold">
            ابدأ طلبك ←
          </Link>
        </div>
      </PageContainer>
    </PageShell>
  );
}
