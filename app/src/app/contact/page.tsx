import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell, H1, Lead, H2 } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'تواصل معنا',
  description: 'نسعد بسماعك — تواصل مع فريق دعوتي عبر واتساب، البريد، أو نموذج الطلب',
};

export default function ContactPage() {
  return (
    <PageShell>
      <H1>تواصل معنا</H1>
      <Lead>نسعد بسماعك. اختر القناة اللي تريحك — نردّ خلال ساعات.</Lead>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
        <Method
          title="واتساب"
          subtitle="الأسرع — نردّ خلال ٣٠ دقيقة في ساعات العمل"
          href="https://wa.me/966500000000"
          cta="افتح واتساب"
          icon="💬"
        />
        <Method
          title="البريد الإلكتروني"
          subtitle="للأسئلة التفصيلية والمرفقات"
          href="mailto:hello@da3wati.com"
          cta="ابعث إيميل"
          icon="✉️"
        />
        <Method
          title="ابدأ طلبًا"
          subtitle="إن كنت جاهزًا، عبّ النموذج مباشرة"
          href="/order"
          cta="نموذج الطلب"
          icon="🌙"
        />
        <Method
          title="الأسئلة الشائعة"
          subtitle="معظم الإجابات هنا"
          href="/faq"
          cta="اقرأ الأسئلة"
          icon="❓"
        />
      </div>

      <H2>ساعات العمل</H2>
      <div className="max-w-2xl mx-auto p-6 rounded-2xl border text-center"
        style={{
          borderColor: 'rgba(184, 138, 30, 0.3)',
          background: 'rgba(20, 14, 39, 0.4)',
          backdropFilter: 'blur(10px)',
          color: 'var(--color-ink-light)',
          fontFamily: 'var(--font-body)',
        }}
      >
        <p className="mb-3">السبت — الخميس · ٩ صباحًا — ١١ مساءً (توقيت الرياض)</p>
        <p className="mb-3">الجمعة · ٢ ظهرًا — ١١ مساءً</p>
        <p className="text-sm" style={{ color: 'var(--color-gold-1)', fontStyle: 'italic' }}>
          فريقنا متاح ٧ أيام في الأسبوع، خاصّة أيام نهاية الأسبوع — أيام الأعراس الذهبية في السعودية
        </p>
      </div>

      <H2>للأسئلة المخصّصة</H2>
      <div className="max-w-2xl mx-auto space-y-3 text-center" style={{ color: 'var(--color-ink-light)', fontFamily: 'var(--font-body)' }}>
        <p>للخصوصية والبيانات: <a href="mailto:privacy@da3wati.com" style={{ color: 'var(--color-gold-2)', textDecoration: 'underline' }}>privacy@da3wati.com</a></p>
        <p>للشراكات والوكلاء: <a href="mailto:partners@da3wati.com" style={{ color: 'var(--color-gold-2)', textDecoration: 'underline' }}>partners@da3wati.com</a></p>
        <p>للدعم الفنّي: <a href="mailto:support@da3wati.com" style={{ color: 'var(--color-gold-2)', textDecoration: 'underline' }}>support@da3wati.com</a></p>
      </div>
    </PageShell>
  );
}

function Method({ title, subtitle, href, cta, icon }: { title: string; subtitle: string; href: string; cta: string; icon: string }) {
  return (
    <Link
      href={href}
      className="block p-6 rounded-2xl border transition hover:-translate-y-1"
      style={{
        borderColor: 'rgba(184, 138, 30, 0.3)',
        background: 'rgba(20, 14, 39, 0.45)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="text-5xl mb-3" aria-hidden="true">{icon}</div>
      <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-gold-1)', fontWeight: 700, fontSize: 22 }}>
        {title}
      </h3>
      <p className="mt-1 text-sm" style={{ color: 'var(--color-ink-light)', fontFamily: 'var(--font-body)', opacity: 0.85 }}>
        {subtitle}
      </p>
      <span className="mt-4 inline-block text-sm font-bold" style={{ color: 'var(--color-gold-2)' }}>
        {cta} ←
      </span>
    </Link>
  );
}
