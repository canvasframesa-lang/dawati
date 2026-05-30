import type { Tier } from './types';

export interface TierDef {
  id: Tier;
  name: string;
  tagline: string;
  price: number;
  currency: 'SAR';
  features: string[];
  recommended?: boolean;
  deliveryHours: number;
}

export const TIERS: TierDef[] = [
  {
    id: 'mumayyaza',
    name: 'المُمَيَّزَة',
    tagline: 'دعوة فاخرة جاهزة — يصمّمها فريقنا حسب تفاصيلك',
    price: 700,
    currency: 'SAR',
    deliveryHours: 48,
    features: [
      'تصميم احترافي يصنعه فريقنا حسب طلبك',
      'آية قرآنية ودعاء ختامي نختاره معك من مكتبتنا',
      'التاريخ الهجري والميلادي تلقائيًّا',
      'زر الموقع الجغرافي (Google Maps / Apple Maps / Waze)',
      'سياسة التصوير على البطاقة (مسموح / ممنوع / منطقة مخصّصة)',
      'عدد الضيوف الكلّي + عدد الأطفال للتوقّع',
      'نموذج تأكيد حضور للضيوف',
      'لوحة تحكم احترافية — عدد الحاضرين والمعتذرين لحظيًّا',
      'رسائل الضيوف تصلك في لوحتك',
      'رابط مشاركة جاهز لواتساب مع معاينة فاخرة',
      'تعديل واحد مجاني بعد التسليم',
      'تسليم خلال ٤٨ ساعة من اعتماد التفاصيل',
      'صلاحية الرابط ٩٠ يومًا',
    ],
  },
  {
    id: 'fakhira',
    name: 'الفاخِرَة',
    tagline: 'الأكثر طلبًا — تصميم مخصّص + باركود + استعلامات الضيوف',
    price: 1200,
    currency: 'SAR',
    recommended: true,
    deliveryHours: 24,
    features: [
      'كل ما في المميّزة — بالإضافة إلى:',
      'تصميم مخصّص بألوان من اختيارك (٥ لوحات أو حسب طلبك)',
      'خلفية صورة اختيارية للعروسَين أو شعار العائلة',
      'باركود فردي لكل ضيف + تسجيل دخول بالمسح عند القاعة',
      'سؤال الضيف عن تفضيلاته الغذائية (نوع الوجبة، حساسيات، وجبة أطفال)',
      'سؤال الضيف عن عدد البالغين والأطفال المرافقين',
      'سؤال الضيف عن احتياجات الوصول (كرسي متحرّك، رعاية خاصة)',
      'رسالة واتساب مخصّصة لكل ضيف باسمه',
      'ردّ تلقائي على أسئلة الضيوف على واتساب (متى؟ أين؟ ما الوجبة؟)',
      'تذكير تلقائي قبل ٢٤ ساعة لمن أكّد الحضور',
      'نسخة عربية + إنجليزية',
      'لوحة متقدّمة — تجميع الوجبات، الحساسيات، الأطفال، الاحتياجات',
      'تصدير قائمة الضيوف Excel / PDF / CSV (مع كل تفضيلاتهم)',
      'رسالة صوتية اختيارية من العروسَين',
      '٣ تعديلات مجانية بعد التسليم',
      'تسليم خلال ٢٤ ساعة من اعتماد التفاصيل',
      'صلاحية الرابط ٦ أشهر',
    ],
  },
  {
    id: 'malakiyya',
    name: 'المَلَكِيَّة',
    tagline: 'الدعوة تصبح هويّة بصرية وتجربة متكاملة لمناسبتك',
    price: 2000,
    currency: 'SAR',
    deliveryHours: 12,
    features: [
      'كل ما في الفاخرة — بالإضافة إلى:',
      'استشارة تصميمية ١-إلى-١ مع المصمّم (٤٥ دقيقة)',
      'شعار عائلي / مونوغرام مخصّص يُصمَّم لك',
      'فيديو افتتاحي قصير + GIF متحرّك',
      'دومين فرعي مخصّص (مثل: nawra-wedding.da3wati.com)',
      'حتى ٤ لغات (عربي + إنجليزي + فرنسي + رابعة)',
      'قائمة الطعام الكاملة في الدعوة + قائمة منفصلة للأطفال',
      'خيارات نباتية / صحية / طبية موضّحة، وساعة العشاء معلنة',
      'توضيح كامل لسياسة التصوير + وقت التصوير الرسمي',
      'جدول الحفل المفصّل: استقبال، زفّة، عشاء، تصوير، مغادرة',
      'قائمة ضيوف VIP منفصلة + مجموعات (عائلة العريس، صديقات العروس...)',
      'شارات دخول للضيوف للطباعة (اسم + باركود + رقم طاولة + مجموعة)',
      'خرائط للمداخل المخصّصة (مدخل الرجال / النساء / VIP)',
      'معلومات أماكن الصلاة وأوقاتها داخل القاعة',
      'منطقة الأطفال + خدمة الحضانة (إن وُجدت)',
      'تفاصيل الوصول لذوي الاحتياجات الخاصة',
      'معلومات المواقف والـ Valet',
      'صفحة قائمة هدايا افتراضية',
      'صفحات للفعاليات المصاحبة (حنّاء، استقبال عائلي، وداع)',
      'معلومات الفنادق والتنقّل للضيوف من خارج المدينة',
      'مدير حساب مخصّص — رقم واتساب مباشر، يردّ خلال ٣٠ دقيقة',
      'خيار النشر بالنيابة — فريقنا يرسل الدعوات على قوائمك',
      'تعديلات غير محدودة مدى حياة الدعوة',
      'تسليم خلال ١٢ ساعة من اعتماد التفاصيل',
      'صلاحية الرابط سنتان + أرشيف دائم',
    ],
  },
];

export const TIER_BY_ID: Record<Tier, TierDef> = Object.fromEntries(
  TIERS.map((t) => [t.id, t]),
) as Record<Tier, TierDef>;

export type AddOnCategory = 'print' | 'premium' | 'event' | 'digital';

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  availableFor: Tier[];
  category: AddOnCategory;
}

export const ADD_ON_CATEGORIES: Record<AddOnCategory, { label: string; description: string }> = {
  print:   { label: 'الطباعة القياسية',     description: 'بطاقات مطبوعة بورق فاخر ٣٥٠ جرام، باركود فردي لكل ضيف' },
  premium: { label: 'البريميوم',            description: 'نقش ذهبي بارز وتأثير Letterpress — للبطاقات التي تُلتقط لها صور' },
  event:   { label: 'مرافقات الحفل',         description: 'شارات VIP، قوائم طعام، بطاقات شكر بعد الحفل' },
  digital: { label: 'إضافات رقمية',          description: 'تسليم سريع، دومين خاص، لغات إضافية، تعديلات إضافية' },
};

/**
 * ملاحظة مهمّة: المطبوعات الفيزيائية ليست مشمولة في أي باقة — هي إضافات مستقلّة
 * يدفع العميل تكلفتها بالكامل حسب الكمية والمقاس وجودة الطباعة.
 * كل الأسعار شامل التوصيل لداخل الرياض وجدة، وتُحسب رسوم إضافية لباقي المدن.
 */
export const ADD_ONS: AddOn[] = [
  /* === Standard print A6 (105×148 mm) — the most common === */
  { id: 'print-a6-50',  category: 'print', name: 'طباعة ٥٠ بطاقة (مقاس A6)',  description: 'ورق فاخر ٣٥٠ جرام، طباعة عالية الجودة، باركود فردي لكل ضيف. توصيل ٣ أيام (الرياض/جدة).',  price: 250,  availableFor: ['mumayyaza', 'fakhira', 'malakiyya'] },
  { id: 'print-a6-100', category: 'print', name: 'طباعة ١٠٠ بطاقة (مقاس A6)', description: 'ورق فاخر ٣٥٠ جرام + باركود فردي. توصيل ٣ أيام.', price: 400,  availableFor: ['mumayyaza', 'fakhira', 'malakiyya'] },
  { id: 'print-a6-250', category: 'print', name: 'طباعة ٢٥٠ بطاقة (مقاس A6)', description: 'ورق فاخر ٣٥٠ جرام + باركود فردي. توصيل ٤ أيام.', price: 800,  availableFor: ['mumayyaza', 'fakhira', 'malakiyya'] },
  { id: 'print-a6-500', category: 'print', name: 'طباعة ٥٠٠ بطاقة (مقاس A6)', description: 'ورق فاخر ٣٥٠ جرام + باركود فردي. توصيل ٥ أيام.', price: 1400, availableFor: ['mumayyaza', 'fakhira', 'malakiyya'] },

  /* === A5 print (148×210 mm) — larger, shows more detail === */
  { id: 'print-a5-100', category: 'print', name: 'طباعة ١٠٠ بطاقة (مقاس A5 — أكبر)', description: 'مقاس مضاعف لـ A6، يعرض زخارف وتفاصيل أكثر. ورق ٣٥٠ جرام + باركود. توصيل ٤ أيام.', price: 600, availableFor: ['mumayyaza', 'fakhira', 'malakiyya'] },
  { id: 'print-a5-250', category: 'print', name: 'طباعة ٢٥٠ بطاقة (مقاس A5)',         description: 'مقاس A5 فاخر + باركود فردي. توصيل ٥ أيام.', price: 1200, availableFor: ['mumayyaza', 'fakhira', 'malakiyya'] },

  /* === Square print 15×15 cm — modern === */
  { id: 'print-square-100', category: 'print', name: 'طباعة ١٠٠ بطاقة مربعة (١٥×١٥ سم)', description: 'مقاس مربّع عصري — مميّز للأعراس الحديثة. ورق ٣٥٠ جرام + باركود. توصيل ٤ أيام.', price: 550, availableFor: ['mumayyaza', 'fakhira', 'malakiyya'] },

  /* === Premium — embossed gold === */
  { id: 'print-premium-100', category: 'premium', name: 'بريميوم — ١٠٠ بطاقة بنقش ذهبي بارز', description: 'نقش ذهبي حراري + تأثير بارز (Letterpress) + ورق قطني فاخر + باركود. توصيل ٦ أيام.', price: 1100, availableFor: ['fakhira', 'malakiyya'] },
  { id: 'print-premium-250', category: 'premium', name: 'بريميوم — ٢٥٠ بطاقة بنقش ذهبي بارز', description: 'نفس مواصفات البريميوم، كميّة أكبر. توصيل ٧ أيام.', price: 2400, availableFor: ['fakhira', 'malakiyya'] },

  /* === Event accessories === */
  { id: 'vip-badges-30',  category: 'event', name: 'شارات VIP مطبوعة — ٣٠ ضيف',  description: 'شارات بأسماء + شعار العائلة + باركود + رقم طاولة، بجودة فندقية.', price: 350, availableFor: ['fakhira', 'malakiyya'] },
  { id: 'vip-badges-100', category: 'event', name: 'شارات VIP مطبوعة — ١٠٠ ضيف', description: 'نفس مواصفات الشارات، كميّة أكبر للحفلات الكبيرة.', price: 900, availableFor: ['fakhira', 'malakiyya'] },
  { id: 'menu-cards-20',  category: 'event', name: 'بطاقات قائمة طعام — ٢٠ طاولة', description: 'بطاقة قائمة طعام لكل طاولة، بنفس تصميم الدعوة، ورق فاخر.', price: 350, availableFor: ['fakhira', 'malakiyya'] },
  { id: 'thank-you-cards', category: 'event', name: 'بطاقات شكر إلكترونية بعد الحفل', description: 'تُرسل تلقائيًّا لكل من حضر بعد الحفل بساعات.', price: 150, availableFor: ['fakhira', 'malakiyya'] },

  /* === Custom sizes & large quantities === */
  { id: 'print-custom-quote', category: 'print', name: 'طلب كمية أو مقاس مخصّص', description: 'أكثر من ٥٠٠ بطاقة أو مقاس غير قياسي (مظاريف، علب، ...) — نتواصل معك بعرض سعر مخصّص خلال ٦ ساعات.', price: 0, availableFor: ['mumayyaza', 'fakhira', 'malakiyya'] },

  /* === Digital extras === */
  { id: 'custom-domain',    category: 'digital', name: 'دومين مستقلّ خاص بك',         description: 'نربط الدعوة على دومين تشتريه أنت (مثل: nawra-wedding.com).', price: 200, availableFor: ['mumayyaza', 'fakhira'] },
  { id: 'extra-revisions',  category: 'digital', name: 'تعديلات إضافية (٥ تعديلات)',  description: 'بعد استنفاذ تعديلات باقتك.', price: 150, availableFor: ['mumayyaza', 'fakhira'] },
  { id: 'rush-6h',          category: 'digital', name: 'تسليم سريع خلال ٦ ساعات',     description: 'للحالات العاجلة جدًّا.', price: 250, availableFor: ['mumayyaza', 'fakhira'] },
  { id: 'voice-message',    category: 'digital', name: 'تسجيل صوتي احترافي للعروسَين', description: 'استوديو في الرياض أو جدة (موعد مسبق) لتسجيل رسالة بجودة عالية.', price: 400, availableFor: ['mumayyaza', 'fakhira', 'malakiyya'] },
  { id: 'extra-language',   category: 'digital', name: 'إضافة لغة ترجمة',             description: 'نسخة كاملة بلغة إضافية (إنجليزي، فرنسي، أو أيّ لغة).', price: 200, availableFor: ['fakhira'] },
  { id: 'kids-corner',      category: 'digital', name: 'دعوة منفصلة لمنطقة الأطفال',  description: 'صفحة مرافقة فيها أنشطة وألعاب — يفتحونها على جوّال أهلهم.', price: 200, availableFor: ['fakhira', 'malakiyya'] },
];

/** Format a price as English numerals + Saudi Riyal symbol (LTR-safe). */
export function formatPrice(price: number): string {
  return `${price.toLocaleString('en-US')} ﷼`;
}

/** Just the number, English numerals, no symbol — for splitting display. */
export function formatPriceNumber(price: number): string {
  return price.toLocaleString('en-US');
}
