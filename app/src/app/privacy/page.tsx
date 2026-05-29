import type { Metadata } from 'next';
import { PageShell, H1, Lead, H2 } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية',
  description: 'كيف نحمي بياناتك وبيانات ضيوفك في دعوتي — متوافقون مع نظام حماية البيانات الشخصية السعودي (PDPL)',
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <H1>سياسة الخصوصية</H1>
      <Lead>
        خصوصيّتك أمانة. هذي السياسة تشرح بلغة بسيطة ما الذي نجمع، وما لا نجمع، وكيف نحمي بيانات
        ضيوفك. متوافقون مع نظام حماية البيانات الشخصية السعودي (PDPL).
      </Lead>

      <div className="max-w-3xl mx-auto space-y-8" style={{ color: 'var(--color-ink-light)', fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.9 }}>
        <Section title="ما الذي نجمعه عنك (كعميل)">
          <ul className="list-disc pr-6 space-y-2">
            <li><strong style={{ color: 'var(--color-gold-1)' }}>الاسم والبريد ورقم الجوّال:</strong> للتواصل معك وتسليم الدعوة.</li>
            <li><strong style={{ color: 'var(--color-gold-1)' }}>تفاصيل الطلب:</strong> الأسماء، التاريخ، المكان، الوصف التصميمي — نستخدمها فقط لتنفيذ دعوتك.</li>
            <li><strong style={{ color: 'var(--color-gold-1)' }}>معلومات الدفع:</strong> لا نخزّن رقم بطاقتك. الدفع يمرّ مباشرة عبر موياسر، ولا يصلنا منها إلا تأكيد العملية ومعرّفها.</li>
            <li><strong style={{ color: 'var(--color-gold-1)' }}>عنوان IP والمتصفّح:</strong> لأغراض أمنية تقنية فقط، ويُحذف بعد ٣٠ يومًا.</li>
          </ul>
        </Section>

        <Section title="ما الذي نجمعه عن ضيوفك">
          <ul className="list-disc pr-6 space-y-2">
            <li>الاسم وحالة التأكيد (سيحضر/معتذر).</li>
            <li>الرسالة الاختيارية للعروسَين أو المُضيف.</li>
            <li>تفضيلات الوجبة والحساسيات (إن فعّلت هذي الخيارات في باقة الفاخرة فأعلى).</li>
            <li>وقت تأكيد الحضور والدولة (للإحصاءات في لوحتك فقط).</li>
            <li>عنوان IP للحماية من البريد المزعج، يُحذف بعد ٣٠ يومًا.</li>
          </ul>
          <p className="mt-3" style={{ color: 'var(--color-gold-1)' }}>
            بيانات ضيوفك ملكك أنت. لا نشاركها مع أيّ طرف، ولا نستخدمها للتسويق، ولا نعرضها على عملاء آخرين.
          </p>
        </Section>

        <Section title="ما الذي لا نفعله">
          <ul className="list-disc pr-6 space-y-2">
            <li>لا نبيع بيانات أبدًا، لأيّ جهة.</li>
            <li>لا نستخدم أدوات تتبّع أو إعلانات تابعة لطرف ثالث (لا Google Analytics، لا Facebook Pixel).</li>
            <li>لا نشارك بيانات ضيوفك مع غيرك، حتى لأغراض إحصائية مجمّعة.</li>
            <li>لا نحتفظ ببياناتك بعد طلبك الحذف.</li>
          </ul>
        </Section>

        <Section title="حقّك في التحكّم">
          <ul className="list-disc pr-6 space-y-2">
            <li><strong style={{ color: 'var(--color-gold-1)' }}>الحذف الفوري:</strong> تقدر تحذف الدعوة وكل بياناتها بنقرة من لوحتك. الحذف نهائي ولا يُسترجع.</li>
            <li><strong style={{ color: 'var(--color-gold-1)' }}>التصدير:</strong> تقدر تصدّر قائمة ضيوفك بصيغة Excel أو PDF أيّ وقت من اللوحة.</li>
            <li><strong style={{ color: 'var(--color-gold-1)' }}>الاستعلام:</strong> تواصل معنا على privacy@da3wati.com لأي طلب يخصّ بياناتك.</li>
          </ul>
        </Section>

        <Section title="الأمان التقني">
          <ul className="list-disc pr-6 space-y-2">
            <li>كل البيانات مشفّرة عند النقل (TLS 1.3) وعند التخزين (AES-256).</li>
            <li>لوحات التحكم محميّة بكلمات سرّ مُشفّرة (bcrypt) ولا تُخزَّن بنص واضح أبدًا.</li>
            <li>الباركود الفردي للضيوف عشوائي ولا يحوي بيانات حسّاسة.</li>
            <li>نسخ احتياطية يومية، تُحذف بعد ٣٠ يومًا تلقائيًّا.</li>
          </ul>
        </Section>

        <Section title="مشاركة البيانات مع أطراف ثالثة">
          <p>نشارك الحد الأدنى من البيانات مع هذي الجهات فقط لتقديم الخدمة:</p>
          <ul className="list-disc pr-6 space-y-2 mt-3">
            <li><strong style={{ color: 'var(--color-gold-1)' }}>موياسر</strong> (الدفع): اسمك ومبلغ الفاتورة فقط، لا تفاصيل الطلب.</li>
            <li><strong style={{ color: 'var(--color-gold-1)' }}>Cloudflare</strong> (استضافة): يمرّ بياناتك بحماية WAF — لا يخزّنها.</li>
            <li><strong style={{ color: 'var(--color-gold-1)' }}>Resend</strong> (البريد): إيميلك واسم الدعوة فقط، لإرسال الإشعارات.</li>
          </ul>
          <p className="mt-3">جميع هؤلاء الشركاء متوافقون مع GDPR وملتزمون بمعايير حماية البيانات العالمية.</p>
        </Section>

        <Section title="ملفات تعريف الارتباط (Cookies)">
          <p>نستخدم cookies تقنية فقط (للجلسات وحفظ التفضيلات). لا نستخدم cookies تتبّع. لذلك ما تحتاج تضغط زرّ موافقة على cookies — مافي شيء يحتاج موافقة.</p>
        </Section>

        <Section title="الأطفال">
          <p>خدماتنا موجّهة للبالغين فقط (١٨+). لا نجمع بيانات أطفال بقصد، وإن وصلتنا بطريق الخطأ، نحذفها فورًا.</p>
        </Section>

        <Section title="تغييرات على السياسة">
          <p>إن طوّرنا هذي السياسة، نُعلمك بالإيميل قبل ٣٠ يومًا من سريانها. النسخة الحالية محدّثة في ٢٠٢٦/٠٥/٢٩.</p>
        </Section>

        <Section title="التواصل بشأن الخصوصية">
          <p>أيّ استفسار أو شكوى تخصّ بياناتك: <a href="mailto:privacy@da3wati.com" style={{ color: 'var(--color-gold-2)', textDecoration: 'underline' }}>privacy@da3wati.com</a></p>
          <p className="mt-2">للشكاوى الرسمية: تقدر أيضًا تتواصل مع الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا).</p>
        </Section>
      </div>
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-gold-grad mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}
