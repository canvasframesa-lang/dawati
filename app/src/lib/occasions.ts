/**
 * Comprehensive Saudi/Arabic occasion catalog.
 * Weddings have their own elevated tier — they're 70% of our market.
 */

export type OccasionCategory =
  | 'wedding'      // أعراس وأنكحة
  | 'religious'    // أعياد دينية
  | 'family'       // مناسبات أسرية
  | 'milestone'    // مناسبات تعليمية ومهنية
  | 'commercial'   // مناسبات تجارية وافتتاحات
  | 'national'     // مناسبات وطنية سعودية
  | 'social';      // مناسبات اجتماعية متنوّعة

export interface Occasion {
  id: string;
  label: string;            // عربي قصير
  description: string;      // وصف موجز
  category: OccasionCategory;
  emoji: string;
  popular?: boolean;        // الأكثر طلبًا
  recommendedTier?: 'mumayyaza' | 'fakhira' | 'malakiyya';
  defaultVerseId?: string;
  defaultFlourishKey?: string;
}

/* ============ الأعراس — مفصّلة بعناية ============ */
export const WEDDING_OCCASIONS: Occasion[] = [
  {
    id: 'wedding',
    label: 'حفل زواج',
    description: 'حفل العرس الرسمي الكبير — الكوشة، العشاء، استقبال الضيوف.',
    category: 'wedding',
    emoji: '💍',
    popular: true,
    recommendedTier: 'fakhira',
    defaultVerseId: 'rum-21',
  },
  {
    id: 'milka',
    label: 'حفل ملكة',
    description: 'عقد القران (الملكة) — يُحتفل به قبل العرس بأشهر أو معه.',
    category: 'wedding',
    emoji: '📜',
    popular: true,
    recommendedTier: 'fakhira',
    defaultVerseId: 'rum-21',
  },
  {
    id: 'engagement',
    label: 'حفل خطوبة',
    description: 'إعلان الخطوبة بجلسة عائلية أو حفل صغير.',
    category: 'wedding',
    emoji: '✨',
    popular: true,
    recommendedTier: 'mumayyaza',
    defaultVerseId: 'nur-32',
  },
  {
    id: 'henna',
    label: 'ليلة الحنّاء',
    description: 'الليلة النسائية الفاخرة قبل العرس بيوم أو يومين.',
    category: 'wedding',
    emoji: '🌹',
    popular: true,
    recommendedTier: 'fakhira',
  },
  {
    id: 'aqd-qaran',
    label: 'عقد قِران',
    description: 'مراسم العقد الديني الرسمية في المسجد أو البيت.',
    category: 'wedding',
    emoji: '🕌',
    recommendedTier: 'mumayyaza',
    defaultVerseId: 'rum-21',
  },
  {
    id: 'bride-reception',
    label: 'استقبال العروس',
    description: 'استقبال صديقات العروس في بيت الأهل بعد العرس.',
    category: 'wedding',
    emoji: '👯‍♀️',
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'farewell',
    label: 'وداع العزوبية',
    description: 'حفل صغير للأصدقاء قبل الزفاف.',
    category: 'wedding',
    emoji: '🥂',
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'walima',
    label: 'وَليمة عُرس',
    description: 'وليمة الطعام في اليوم التالي للعرس — تقليد سعودي راسخ.',
    category: 'wedding',
    emoji: '🍽',
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'anniversary',
    label: 'ذكرى زواج',
    description: 'تجديد الفرحة بعد سنوات — للأقارب أو خاصّة بالزوجَين.',
    category: 'wedding',
    emoji: '💞',
    recommendedTier: 'mumayyaza',
  },
];

/* ============ الأعياد الدينية ============ */
export const RELIGIOUS_OCCASIONS: Occasion[] = [
  {
    id: 'eid-fitr',
    label: 'عيدية فطر',
    description: 'معايدة عيد الفطر للأهل والأصدقاء.',
    category: 'religious',
    emoji: '🌙',
    popular: true,
    recommendedTier: 'mumayyaza',
    defaultVerseId: 'baqara-185',
  },
  {
    id: 'eid-adha',
    label: 'عيدية أضحى',
    description: 'معايدة عيد الأضحى وتقبّل الطاعات.',
    category: 'religious',
    emoji: '🐏',
    recommendedTier: 'mumayyaza',
    defaultVerseId: 'hajj-27',
  },
  {
    id: 'ramadan-iftar',
    label: 'دعوة إفطار رمضاني',
    description: 'دعوة عائلية لإفطار جماعي.',
    category: 'religious',
    emoji: '🌅',
    recommendedTier: 'mumayyaza',
    defaultVerseId: 'baqara-185',
  },
  {
    id: 'suhoor',
    label: 'دعوة سحور',
    description: 'دعوة سحور رمضاني — اجتماع ليلي عائلي.',
    category: 'religious',
    emoji: '🌃',
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'mawlid',
    label: 'إحياء المولد النبوي',
    description: 'تذكّر مولد النبي ﷺ بقراءات وأمسيات.',
    category: 'religious',
    emoji: '🕊',
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'quran-completion',
    label: 'حفل ختم القرآن',
    description: 'احتفال بإتمام طفل لحفظ القرآن، أو دار تحفيظ.',
    category: 'religious',
    emoji: '📖',
    recommendedTier: 'mumayyaza',
    defaultVerseId: 'taha-114',
  },
  {
    id: 'umra-welcome',
    label: 'استقبال معتمر',
    description: 'استقبال من عاد من العمرة أو الحجّ.',
    category: 'religious',
    emoji: '🕋',
    recommendedTier: 'mumayyaza',
  },
];

/* ============ المناسبات الأسرية ============ */
export const FAMILY_OCCASIONS: Occasion[] = [
  {
    id: 'aqiqa',
    label: 'دعوة عقيقة',
    description: 'حفل عقيقة المولود — تقديم الذبيحة وإعلان الاسم.',
    category: 'family',
    emoji: '👶',
    popular: true,
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'newborn',
    label: 'إعلان مولود',
    description: 'بشرى مولود جديد للأهل والأصدقاء.',
    category: 'family',
    emoji: '🍼',
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'pregnancy',
    label: 'إعلان حمل',
    description: 'بشرى الحمل (Gender Reveal أو إعلان عام).',
    category: 'family',
    emoji: '🤰',
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'gender-reveal',
    label: 'حفل كشف الجنس',
    description: 'حفل صغير لكشف جنس الجنين.',
    category: 'family',
    emoji: '🎈',
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'circumcision',
    label: 'حفل خِتان',
    description: 'احتفال بخِتان الطفل — تقليد عائلي.',
    category: 'family',
    emoji: '🌟',
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'birthday',
    label: 'عيد ميلاد',
    description: 'حفل عيد ميلاد لطفل أو كبير.',
    category: 'family',
    emoji: '🎂',
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'family-gathering',
    label: 'لمّة عائلية',
    description: 'اجتماع عائلي شهري أو موسمي.',
    category: 'family',
    emoji: '👨‍👩‍👧‍👦',
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'mothers-day',
    label: 'يوم الأم',
    description: 'تكريم أم العائلة في ٢١ مارس.',
    category: 'family',
    emoji: '🌸',
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'fathers-day',
    label: 'يوم الأب',
    description: 'تكريم أب العائلة في الأحد الثالث من يونيو.',
    category: 'family',
    emoji: '👨',
    recommendedTier: 'mumayyaza',
  },
];

/* ============ مناسبات تعليمية ومهنية ============ */
export const MILESTONE_OCCASIONS: Occasion[] = [
  {
    id: 'graduation-school',
    label: 'تخرّج ثانوي',
    description: 'احتفال بتخرّج طالب الثانوية العامة.',
    category: 'milestone',
    emoji: '🎓',
    recommendedTier: 'mumayyaza',
    defaultVerseId: 'taha-114',
  },
  {
    id: 'graduation-uni',
    label: 'تخرّج جامعي',
    description: 'حفل تخرّج بكالوريوس — أكبر حدث في رحلة الدراسة.',
    category: 'milestone',
    emoji: '🎓',
    popular: true,
    recommendedTier: 'fakhira',
    defaultVerseId: 'taha-114',
  },
  {
    id: 'graduation-masters',
    label: 'تخرّج ماجستير',
    description: 'احتفال بإتمام درجة الماجستير.',
    category: 'milestone',
    emoji: '📚',
    recommendedTier: 'fakhira',
    defaultVerseId: 'taha-114',
  },
  {
    id: 'graduation-phd',
    label: 'تخرّج دكتوراة',
    description: 'احتفال بنيل درجة الدكتوراة — أعلى مراحل الدراسة.',
    category: 'milestone',
    emoji: '🎩',
    recommendedTier: 'malakiyya',
    defaultVerseId: 'taha-114',
  },
  {
    id: 'promotion',
    label: 'حفل ترقية',
    description: 'احتفال بترقية في العمل أو نيل منصب.',
    category: 'milestone',
    emoji: '⬆️',
    recommendedTier: 'fakhira',
  },
  {
    id: 'retirement',
    label: 'حفل تقاعد',
    description: 'تكريم لمن يدخل التقاعد بعد سنوات خدمة.',
    category: 'milestone',
    emoji: '🏆',
    recommendedTier: 'fakhira',
  },
  {
    id: 'achievement',
    label: 'احتفال بإنجاز',
    description: 'فوز ببطولة، جائزة، نشر كتاب، أيّ إنجاز.',
    category: 'milestone',
    emoji: '🥇',
    recommendedTier: 'fakhira',
  },
  {
    id: 'work-anniversary',
    label: 'يوبيل العمل',
    description: 'مرور ٥/١٠/٢٥ سنة على بدء العمل.',
    category: 'milestone',
    emoji: '🎖',
    recommendedTier: 'fakhira',
  },
];

/* ============ مناسبات تجارية ============ */
export const COMMERCIAL_OCCASIONS: Occasion[] = [
  {
    id: 'opening',
    label: 'افتتاح',
    description: 'افتتاح متجر، شركة، مكتب، أو فرع جديد.',
    category: 'commercial',
    emoji: '✂️',
    recommendedTier: 'fakhira',
  },
  {
    id: 'product-launch',
    label: 'إطلاق منتج',
    description: 'حفل إطلاق منتج أو خدمة جديدة.',
    category: 'commercial',
    emoji: '🚀',
    recommendedTier: 'fakhira',
  },
  {
    id: 'exhibition',
    label: 'افتتاح معرض',
    description: 'افتتاح معرض فنّي أو تجاري أو معرض كتاب.',
    category: 'commercial',
    emoji: '🖼',
    recommendedTier: 'fakhira',
  },
  {
    id: 'conference',
    label: 'مؤتمر / ندوة',
    description: 'دعوة لمؤتمر علمي أو ندوة متخصّصة.',
    category: 'commercial',
    emoji: '🎤',
    recommendedTier: 'fakhira',
  },
  {
    id: 'corporate-gala',
    label: 'حفل مؤسسي',
    description: 'حفل سنوي لشركة أو مؤسسة — تكريم موظّفين.',
    category: 'commercial',
    emoji: '🏢',
    recommendedTier: 'malakiyya',
  },
  {
    id: 'partnership',
    label: 'إعلان شراكة',
    description: 'إعلان تأسيس شراكة أو مشروع مشترك.',
    category: 'commercial',
    emoji: '🤝',
    recommendedTier: 'fakhira',
  },
];

/* ============ المناسبات الوطنية السعودية ============ */
export const NATIONAL_OCCASIONS: Occasion[] = [
  {
    id: 'national-day',
    label: 'اليوم الوطني',
    description: 'الاحتفال باليوم الوطني السعودي في ٢٣ سبتمبر.',
    category: 'national',
    emoji: '🇸🇦',
    popular: true,
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'founding-day',
    label: 'يوم التأسيس',
    description: 'الاحتفال بيوم التأسيس السعودي في ٢٢ فبراير.',
    category: 'national',
    emoji: '👑',
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'flag-day',
    label: 'يوم العَلَم',
    description: 'يوم العَلَم السعودي — ١١ مارس.',
    category: 'national',
    emoji: '🟢',
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'allegiance-anniversary',
    label: 'ذكرى البيعة',
    description: 'ذكرى بيعة خادم الحرمين الشريفين.',
    category: 'national',
    emoji: '🕌',
    recommendedTier: 'mumayyaza',
  },
];

/* ============ مناسبات اجتماعية متنوّعة ============ */
export const SOCIAL_OCCASIONS: Occasion[] = [
  {
    id: 'welcome-back',
    label: 'استقبال قادم',
    description: 'استقبال مسافر، طالب من ابتعاث، شخصية مهمّة.',
    category: 'social',
    emoji: '🛬',
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'farewell',
    label: 'حفل وداع',
    description: 'وداع مسافر، موظّف مغادر، طالب مبتعث.',
    category: 'social',
    emoji: '🛫',
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'tribute',
    label: 'حفل تكريم',
    description: 'تكريم شخصية لإنجازات أو خدمة طويلة.',
    category: 'social',
    emoji: '🏅',
    recommendedTier: 'fakhira',
  },
  {
    id: 'recovery',
    label: 'شفاء من مرض',
    description: 'احتفال بالشفاء أو دعوة لإحياء روح الفقيد.',
    category: 'social',
    emoji: '🤲',
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'new-home',
    label: 'انتقال لمنزل جديد',
    description: 'دعوة لمنزل جديد — تقليد عائلي مهمّ.',
    category: 'social',
    emoji: '🏡',
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'mourning-thanks',
    label: 'شكر على مواساة',
    description: 'بطاقة شكر لمن واسى العائلة في حدث صعب.',
    category: 'social',
    emoji: '🤍',
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'teachers-day',
    label: 'يوم المعلّم',
    description: 'تكريم معلّم أو معلّمة في ٥ أكتوبر.',
    category: 'social',
    emoji: '👨‍🏫',
    recommendedTier: 'mumayyaza',
  },
  {
    id: 'other',
    label: 'مناسبة أخرى',
    description: 'مناسبة لم نُدرجها — اكتبها لنا في طلبك.',
    category: 'social',
    emoji: '✨',
    recommendedTier: 'mumayyaza',
  },
];

export const ALL_OCCASIONS: Occasion[] = [
  ...WEDDING_OCCASIONS,
  ...RELIGIOUS_OCCASIONS,
  ...FAMILY_OCCASIONS,
  ...MILESTONE_OCCASIONS,
  ...COMMERCIAL_OCCASIONS,
  ...NATIONAL_OCCASIONS,
  ...SOCIAL_OCCASIONS,
];

export const OCCASIONS_BY_ID: Record<string, Occasion> = Object.fromEntries(
  ALL_OCCASIONS.map((o) => [o.id, o]),
);

export const CATEGORY_LABELS: Record<OccasionCategory, { ar: string; emoji: string; tagline: string }> = {
  wedding:    { ar: 'الأعراس والأنكحة',       emoji: '💍', tagline: 'لحظة العمر — تستاهل تصميم يبقى في الذاكرة.' },
  religious:  { ar: 'الأعياد الدينية',         emoji: '🌙', tagline: 'تقبّل الله منّا ومنكم — معايدات تليق بالمناسبة.' },
  family:     { ar: 'مناسبات أسرية',           emoji: '👨‍👩‍👧‍👦', tagline: 'عائلتك ذكرياتها — وثّقها ببطاقة فاخرة.' },
  milestone:  { ar: 'إنجازات وتخرّجات',       emoji: '🎓', tagline: 'سنوات تعب — لحظة تتويج.' },
  commercial: { ar: 'مناسبات تجارية',          emoji: '🏢', tagline: 'أعمالك ووعدها يستحقّون إعلانًا جدّيًّا.' },
  national:   { ar: 'مناسبات وطنية',           emoji: '🇸🇦', tagline: 'فخر سعودي — في كل لحظة.' },
  social:     { ar: 'مناسبات اجتماعية',        emoji: '🤝', tagline: 'لكل تجمّع قصّته — ولكل قصّة دعوة.' },
};

export function occasionsByCategory(cat: OccasionCategory): Occasion[] {
  return ALL_OCCASIONS.filter((o) => o.category === cat);
}
