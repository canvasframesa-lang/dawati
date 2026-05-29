import type { Tier } from './types';

export interface TierDef {
  id: Tier;
  /** Arabic display name */
  name: string;
  /** Short Arabic tagline */
  tagline: string;
  /** Price in SAR (VAT inclusive). */
  price: number;
  /** Currency display */
  currency: 'SAR';
  /** Highlighted feature bullets (Arabic) */
  features: string[];
  /** Whether this tier is the recommended/middle one. */
  recommended?: boolean;
  /** Promised delivery window. */
  deliveryHours: number;
}

/**
 * Concierge model: the customer submits a request, our team designs.
 * Pricing reflects done-for-you positioning.
 */
export const TIERS: TierDef[] = [
  {
    id: 'mumayyaza',
    name: 'المُمَيَّزَة',
    tagline: 'دعوة فاخرة جاهزة — يصمّمها فريقنا حسب تفاصيلك',
    price: 700,
    currency: 'SAR',
    deliveryHours: 48,
    features: [
      '🎨 تصميم احترافي يصنعه فريقنا حسب طلبك',
      '📜 آية قرآنية ودعاء ختامي نختاره معك',
      '🌙 التاريخ الهجري والميلادي تلقائيًّا',
      '📍 زر الموقع الجغرافي (Google Maps / Apple)',
      '✅ نموذج تأكيد حضور للضيوف',
      '📊 لوحة تحكم احترافية — تشاهد عدد الحاضرين والمعتذرين لحظيًّا',
      '💬 رسائل الضيوف تصلك في لوحتك',
      '🔗 رابط مشاركة جاهز لواتساب مع معاينة فاخرة',
      '✏️ تعديل واحد مجاني بعد التسليم',
      '⏱ تسليم خلال ٤٨ ساعة من اعتماد التفاصيل',
      '📆 صلاحية الرابط ٩٠ يومًا',
    ],
  },
  {
    id: 'fakhira',
    name: 'الفاخِرَة',
    tagline: 'الأكثر طلبًا — تصميم مخصّص + لوحة متقدّمة + باركود',
    price: 1200,
    currency: 'SAR',
    recommended: true,
    deliveryHours: 24,
    features: [
      'كل ما في المميّزة — بالإضافة إلى:',
      '🎨 تصميم مخصّص بألوان من اختيارك (٥ لوحات أو حسب طلبك)',
      '🖼️ خلفية صورة اختيارية للعروسَين أو شعار العائلة',
      '🎟 باركود فردي لكل ضيف + تسجيل دخول بالمسح عند القاعة',
      '📱 رسالة واتس مخصّصة لكل ضيف باسمه',
      '🤖 ردّ تلقائي على أسئلة الضيوف على واتساب (متى؟ وين؟)',
      '⏰ تذكير تلقائي قبل ٢٤ ساعة لمن أكّد الحضور',
      '🌍 نسخة عربية + إنجليزية (للضيوف من خارج المنطقة)',
      '📊 لوحة تحكم متقدّمة — خط زمني، إحصاءات، خرائط حرارية',
      '📥 تصدير قائمة الضيوف Excel / PDF / CSV',
      '🎙 رسالة صوتية اختيارية من العروسَين تشغل عند فتح الدعوة',
      '✏️ ٣ تعديلات مجانية بعد التسليم',
      '⏱ تسليم خلال ٢٤ ساعة من اعتماد التفاصيل',
      '📆 صلاحية الرابط ٦ أشهر',
    ],
  },
  {
    id: 'malakiyya',
    name: 'المَلَكِيَّة',
    tagline: 'الدعوة تصبح هويّة بصرية كاملة لمناسبتك',
    price: 2000,
    currency: 'SAR',
    deliveryHours: 12,
    features: [
      'كل ما في الفاخرة — بالإضافة إلى:',
      '🎨 استشارة تصميمية ١-إلى-١ مع المصمم (٤٥ دقيقة)',
      '👑 شعار عائلي / مونوغرام مخصّص يُصمَّم لك',
      '🎬 فيديو افتتاحي قصير + GIF متحرّك للمشاركة',
      '🌐 دومين فرعي مخصّص باسمك (مثل: nawra-wedding.da3wati.com)',
      '🗣 حتى ٤ لغات (عربي + إنجليزي + فرنسي + لغة رابعة حسب الحاجة)',
      '👥 قائمة ضيوف VIP منفصلة + مجموعات (عائلة العريس، صديقات العروس، VIP)',
      '🏷 شارات دخول للضيوف للطباعة (اسم + باركود + رقم طاولة)',
      '📅 جدول الحفل المرئي للضيوف (استقبال، زفّة، عشاء)',
      '💝 صفحة قائمة هدايا افتراضية',
      '🎉 صفحات للفعاليات المصاحبة (حنّاء، استقبال عائلي، وداع)',
      '✈ معلومات الفنادق والتنقّل للضيوف من خارج المدينة',
      '📞 مدير حساب مخصّص — رقم واتس مباشر، يردّ خلال ٣٠ دقيقة',
      '🚀 خيار النشر بالنيابة — فريقنا يرسل الدعوات على قوائمك',
      '✏️ تعديلات غير محدودة مدى حياة الدعوة',
      '⏱ تسليم خلال ١٢ ساعة من اعتماد التفاصيل',
      '📆 صلاحية الرابط سنتان + أرشيف دائم',
    ],
  },
];

export const TIER_BY_ID: Record<Tier, TierDef> = Object.fromEntries(
  TIERS.map((t) => [t.id, t]),
) as Record<Tier, TierDef>;

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  /** Which tier(s) this add-on is available for. */
  availableFor: Tier[];
}

/** Print add-ons + extras — sold alongside any tier. */
export const ADD_ONS: AddOn[] = [
  {
    id: 'print-100',
    name: 'طباعة ١٠٠ بطاقة فاخرة',
    description: 'بطاقات مطبوعة بورق ٣٥٠ جرام + باركود لكل ضيف. توصيل خلال ٣ أيام (الرياض/جدة).',
    price: 300,
    availableFor: ['mumayyaza', 'fakhira', 'malakiyya'],
  },
  {
    id: 'print-250',
    name: 'طباعة ٢٥٠ بطاقة فاخرة',
    description: 'بطاقات مطبوعة بورق ٣٥٠ جرام + باركود لكل ضيف. توصيل خلال ٣ أيام.',
    price: 600,
    availableFor: ['mumayyaza', 'fakhira', 'malakiyya'],
  },
  {
    id: 'print-500',
    name: 'طباعة ٥٠٠ بطاقة فاخرة',
    description: 'بطاقات مطبوعة بورق ٣٥٠ جرام + باركود لكل ضيف. توصيل خلال ٤ أيام.',
    price: 1000,
    availableFor: ['mumayyaza', 'fakhira', 'malakiyya'],
  },
  {
    id: 'print-premium-100',
    name: 'طباعة بريميوم — ١٠٠ بطاقة (ذهبي + بارز)',
    description: 'بطاقات بنقش ذهبي حراري + تأثير بارز + باركود فردي. توصيل ٥ أيام.',
    price: 700,
    availableFor: ['fakhira', 'malakiyya'],
  },
  {
    id: 'vip-badges-30',
    name: 'شارات VIP مطبوعة — ٣٠ ضيف',
    description: 'شارات فردية بأسماء الضيوف + شعار العائلة + باركود + رقم طاولة.',
    price: 350,
    availableFor: ['fakhira', 'malakiyya'],
  },
  {
    id: 'custom-domain',
    name: 'دومين مستقلّ خاص بك',
    description: 'نربط الدعوة على دومين تشتريه أنت (مثل: nawra-wedding.com).',
    price: 200,
    availableFor: ['mumayyaza', 'fakhira'],
  },
  {
    id: 'extra-revisions',
    name: 'تعديلات إضافية (٥ تعديلات)',
    description: 'دفعة إضافية من التعديلات بعد استنفاذ الباقة.',
    price: 150,
    availableFor: ['mumayyaza', 'fakhira'],
  },
  {
    id: 'rush-6h',
    name: 'تسليم سريع خلال ٦ ساعات',
    description: 'تسليم خلال ٦ ساعات من اعتماد التفاصيل (للحالات العاجلة).',
    price: 250,
    availableFor: ['mumayyaza', 'fakhira'],
  },
  {
    id: 'voice-message',
    name: 'تسجيل صوتي احترافي للعروسَين',
    description: 'استوديو صغير في الرياض أو جدة (موعد مسبق) لتسجيل رسالة بجودة عالية.',
    price: 400,
    availableFor: ['mumayyaza', 'fakhira', 'malakiyya'],
  },
  {
    id: 'extra-language',
    name: 'إضافة لغة ترجمة',
    description: 'نسخة كاملة من الدعوة بلغة إضافية (إنجليزي، فرنسي، أو أيّ لغة أخرى).',
    price: 200,
    availableFor: ['fakhira'],
  },
];

/** Format the price for display: "٧٠٠ ر.س". */
export function formatPrice(price: number): string {
  return `${price.toLocaleString('ar-SA')} ر.س`;
}
