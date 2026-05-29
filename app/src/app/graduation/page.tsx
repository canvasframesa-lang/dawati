import type { Metadata } from 'next';
import { OccasionLanding } from '@/components/OccasionLanding';

export const metadata: Metadata = {
  title: 'دعوة تخرّج إلكترونية',
  description: 'بطاقة تخرّج فاخرة تعلن لحظة التتويج — ادعو الأهل والأصدقاء بأسلوب رسمي وأنيق',
};

export default function GraduationPage() {
  return (
    <OccasionLanding
      cfg={{
        title: 'التخرّج',
        hero: 'بطاقة تخرّج تليق بسنواتك',
        intro: 'بطاقة دعوة تخرّج رسمية وأنيقة — تعلن للأهل والأصدقاء لحظة التتويج. ترسلها على واتساب وتتابع من سيحضر معك يومك الكبير.',
        verseFragment: 'وَقُل رَّبِّ زِدْنِي عِلْمًا',
        verseSource: 'طه: ١١٤',
        bullets: [
          '🎓 تصميم رسمي أنيق يعكس روح التحصيل العلمي',
          '📜 الآية الخاصّة بالعلم والمعرفة',
          '✨ اسمك ودرجتك العلمية وتخصّصك',
          '📅 التاريخ والمكان (الجامعة أو القاعة)',
          '📍 زر الموقع الجغرافي',
          '✅ تأكيد حضور للأهل والأصدقاء',
          '💌 رسائل تهنئة من الجميع',
          '🎙 رسالة صوتية اختيارية منك أو من والديك',
          '🔗 مشاركة على واتساب بنقرة',
        ],
        vibes: ['classic', 'royal', 'minimal'],
        recommendedTier: 'mumayyaza',
        cta: 'ابدأ دعوة تخرّجك',
      }}
    />
  );
}
