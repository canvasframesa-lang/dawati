import Link from 'next/link';
import type { Metadata } from 'next';
import { PageShell, PageBanner, PageContainer, Cta } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'الصفحة غير موجودة',
  description: 'الصفحة التي تبحث عنها غير موجودة — ربما حُذفت أو تغيّر رابطها',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageShell>
      <PageBanner
        eyebrow="٤٠٤"
        emoji="🌙"
        title="الصفحة غير موجودة"
        subtitle="الرابط الذي طلبته لم يعد متاحًا — لعلّه حُذف أو تغيّر اسمه."
      />
      <PageContainer>
        <div className="text-center max-w-md mx-auto">
          <p className="text-[var(--color-ink-mute)] leading-relaxed mb-8">
            بإمكانك العودة إلى الرئيسية لاستكشاف خدماتنا، أو استعراض المناسبات
            والأمثلة المتاحة.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="btn-gold w-full sm:w-auto">
              العودة للرئيسية
            </Link>
            <Link href="/occasions" className="btn-ghost w-full sm:w-auto">
              استعرض المناسبات
            </Link>
          </div>
        </div>
        <Cta href="/order" label="ابدأ تصميم دعوتك" />
      </PageContainer>
    </PageShell>
  );
}
