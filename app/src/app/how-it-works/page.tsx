import type { Metadata } from 'next';
import { PageShell, H1, Lead, H2, Prose, Cta } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'كيف يشتغل',
  description: 'صمّم دعوتك في ٤ خطوات بسيطة — نموذج طلب، دفع آمن، تصميم احترافي، وتسليم بنقرة',
};

export default function HowPage() {
  return (
    <PageShell>
      <H1>كيف يشتغل دعوتي؟</H1>
      <Lead>
        أربع خطوات تفصلك عن دعوة فاخرة تليق بمناسبتك — أنت تطلب، ونحن نُسلّم.
      </Lead>

      <div className="space-y-6 max-w-3xl mx-auto">
        <Step
          n="١"
          title="املأ نموذج طلبك"
          body="ادخل صفحة الطلب، اختر باقتك، واملأ التفاصيل: نوع المناسبة، الأسماء، التاريخ، المكان، وأهم شيء — وصف التصميم الذي تتخيّله بكلامك. كل ما زادت التفاصيل، كانت دعوتك أقرب لذوقك. النموذج يحفظ تلقائيًّا، تقدر ترجع له أيّ وقت."
        />
        <Step
          n="٢"
          title="ادفع بأمان"
          body="بعد ما تنتهي، ادفع عبر بوّابة موياسر الآمنة — مدى، Apple Pay، STC Pay، فيزا، ماستركارد. الفاتورة الضريبية تصلك على البريد خلال يوم. الاسترداد متاح بالكامل قبل ما نبدأ بالتصميم."
        />
        <Step
          n="٣"
          title="فريقنا يصمّمها"
          body="بمجرّد تأكيد الدفع، يبدأ مصمّمونا فورًا — يدرسون طلبك، يختارون الزخارف والآية والدعاء المناسبة، ويصنعون دعوة تليق بمناسبتك. الوقت يعتمد على باقتك: ١٢ ساعة (المَلَكِيَّة)، ٢٤ ساعة (الفاخِرَة)، ٤٨ ساعة (المُمَيَّزَة)."
        />
        <Step
          n="٤"
          title="استلم وشاركها"
          body="يصلك رابط الدعوة + بيانات لوحة التحكم على البريد والواتساب. تفتح اللوحة، تشوف معاينة الدعوة، تطلب تعديل إن أردت، ثم تشاركها على واتساب بضغطة. ضيوفك يفتحونها بمعاينة فاخرة، يأكّدون حضورهم، وتتابع كل شيء من لوحتك."
        />
      </div>

      <H2>أسئلة شائعة عن سير العمل</H2>
      <div className="space-y-4 max-w-3xl mx-auto">
        <Faq q="هل أقدر أعدّل بعد التسليم؟">
          نعم. المُمَيَّزَة فيها تعديل واحد مجاني، الفاخِرَة ٣ تعديلات، الملكية غير محدودة. التعديلات الإضافية في الباقتين الأقل متاحة كإضافة بسيطة (١٥٠ ر.س لكل ٥ تعديلات).
        </Faq>
        <Faq q="كم وقت تستغرق التعديلات؟">
          أيّ تعديل بسيط (تغيير اسم، تاريخ، أو نص) ننفّذه خلال ٣-٦ ساعات. التعديلات الجوهرية (تغيير لوحة الألوان، عناصر تصميمية) تأخذ يوم كامل.
        </Faq>
        <Faq q="هل تتعاملون مع المصوّر/منسّق الحفل لتسليم البطاقات المطبوعة؟">
          نعم. إذا اخترت إضافة الطباعة، نتواصل معك أو مع منسّق حفلك مباشرة للتسليم في الموعد المناسب. التوصيل للرياض وجدة خلال ٣-٥ أيام عمل.
        </Faq>
        <Faq q="ماذا لو أحببت طلب دعوة لحفلة عائلية صغيرة جدًّا — بأقل من ١٠ ضيوف؟">
          كل الباقات بدون حد للضيوف. الفرق بين الباقات ليس في عدد المدعوّين، بل في عمق التخصيص وامتيازات لوحة التحكم.
        </Faq>
        <Faq q="هل تشتغلون أيام الجمعة والسبت؟">
          نعم — فريقنا متاح ٧ أيام في الأسبوع. خصوصًا أيام نهاية الأسبوع لأنها أيام الأعراس الذهبية في السعودية.
        </Faq>
      </div>

      <Cta href="/order" label="ابدأ طلبك" />
    </PageShell>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <article
      className="p-6 rounded-2xl border flex gap-5 items-start"
      style={{
        borderColor: 'rgba(184, 138, 30, 0.3)',
        background: 'rgba(20, 14, 39, 0.4)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-gold-grad"
        style={{
          background: 'radial-gradient(circle at 35% 30%, rgba(244,208,107,0.25), rgba(184,138,30,0.1))',
          fontFamily: 'var(--font-display)',
          fontSize: 26,
          fontWeight: 700,
        }}
      >
        {n}
      </div>
      <div>
        <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-gold-1)', fontWeight: 700, fontSize: 20 }}>
          {title}
        </h3>
        <p className="mt-2 leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-ink-light)', fontSize: 16 }}>
          {body}
        </p>
      </div>
    </article>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details
      className="group rounded-2xl p-5 border cursor-pointer"
      style={{
        borderColor: 'rgba(184, 138, 30, 0.3)',
        background: 'rgba(20, 14, 39, 0.4)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <summary className="flex items-center justify-between list-none" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-gold-1)', fontSize: 17, fontWeight: 700 }}>
        <span>{q}</span>
        <span className="text-2xl transition-transform group-open:rotate-45" style={{ color: 'var(--color-gold-2)' }} aria-hidden="true">
          +
        </span>
      </summary>
      <p className="mt-4 leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-ink-light)', fontSize: 16 }}>
        {children}
      </p>
    </details>
  );
}
