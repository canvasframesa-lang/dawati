import type { CardData } from './types';
import { defaultVerseFor, defaultFlourishFor } from './verses';

/**
 * Showcase sample cards — for /examples gallery and template previews.
 * Names use prestigious Najdi families (mixed and fictional pairings —
 * none of these are real people). Designed to look like the kind of
 * customer who would buy a Malakiyya or Fakhira tier card.
 */

export const sampleCards: CardData[] = [
  // 1. Royal wedding — gold palette, full pomp
  {
    slug: 'sample-rajhi-fawzan',
    templateId: 'wedding-cosmos-v1',
    occasion: 'wedding',
    palette: 'gold',
    senderVoice: 'families',
    groom: { fullName: 'فيصل بن محمد الراجحي', firstName: 'فيصل', family: 'الراجحي' },
    bride: { fullName: 'كريمة عبد الله الفوزان', family: 'الفوزان' },
    groomFamily: 'الراجحي',
    brideFamily: 'الفوزان',
    date: {
      gregorian: '2026-06-19',
      time: '21:00',
      hijriLabel: 'الجمعة ٤ محرّم ١٤٤٨ هـ',
      gregorianLabel: 'الجمعة ١٩ يونيو ٢٠٢٦ م',
      timeOfDayLabel: 'ليلًا',
    },
    venue: { city: 'الرياض', area: 'حي السفارات', hall: 'قاعة الفيصلية الكبرى', lat: 24.6968, lng: 46.6868 },
    verse: defaultVerseFor('wedding'),
    flourish: defaultFlourishFor('wedding'),
    salam: 'السلامُ عليكم ورحمةُ اللهِ وبركاتُه',
    greeting: 'يا أهلَ الفَضلِ والمَحَبَّة، يا مَن أنتُم مِنّا وإلينا',
    signatureLabel: 'بِكُلِّ المَحَبَّةِ والتَّقدير',
    signatureName: 'آل الراجحي وآل الفوزان',
    rsvp: { enabled: true, allowMessage: true, requireApologyMessage: true },
    showBrideFirstNameInProse: false,
    tier: 'malakiyya',
  },

  // 2. Wedding — rose-gold palette, Jeddah seaside
  {
    slug: 'sample-tuwaijri-sudairi',
    templateId: 'wedding-cosmos-v1',
    occasion: 'wedding',
    palette: 'rose-gold',
    senderVoice: 'families',
    groom: { fullName: 'عبد العزيز بن سعد التويجري', firstName: 'عبد العزيز', family: 'التويجري' },
    bride: { fullName: 'كريمة سلطان السديري', family: 'السديري' },
    groomFamily: 'التويجري',
    brideFamily: 'السديري',
    date: {
      gregorian: '2026-07-30',
      time: '20:30',
      hijriLabel: 'الخميس ١٦ صفر ١٤٤٨ هـ',
      gregorianLabel: 'الخميس ٣٠ يوليو ٢٠٢٦ م',
      timeOfDayLabel: 'مساءً',
    },
    venue: { city: 'جدة', area: 'الواجهة البحرية', hall: 'قاعة شاطئ السلام' },
    verse: defaultVerseFor('wedding'),
    flourish: 'اللَّهُمَّ بارِك لَهُما واجمَع بَينَهُما في خَير',
    salam: 'السلامُ عليكم ورحمةُ اللهِ وبركاتُه',
    greeting: 'يا أحبّتنا — حضوركم يكمِّل فرحتنا',
    signatureLabel: 'بأطيبِ التَّحايا',
    signatureName: 'آل التويجري وآل السديري',
    rsvp: { enabled: true, allowMessage: true, requireApologyMessage: true },
    showBrideFirstNameInProse: false,
    tier: 'fakhira',
  },

  // 3. Engagement — royal midnight palette
  {
    slug: 'sample-babtain-zamil-engagement',
    templateId: 'wedding-cosmos-v1',
    occasion: 'engagement',
    palette: 'royal-midnight',
    senderVoice: 'families',
    groom: { fullName: 'سلطان بن خالد البابطين', firstName: 'سلطان', family: 'البابطين' },
    bride: { fullName: 'كريمة فهد الزامل', family: 'الزامل' },
    groomFamily: 'البابطين',
    brideFamily: 'الزامل',
    date: {
      gregorian: '2026-08-09',
      time: '20:00',
      hijriLabel: 'الأحد ٢٦ صفر ١٤٤٨ هـ',
      gregorianLabel: 'الأحد ٩ أغسطس ٢٠٢٦ م',
      timeOfDayLabel: 'مساءً',
    },
    venue: { city: 'الرياض', area: 'حي حطّين', hall: 'قاعة بيت العائلة' },
    verse: defaultVerseFor('engagement'),
    flourish: 'بارَكَ اللهُ لَهُما وأتَمَّ عَلَيهِما بِالخَير',
    salam: 'السلامُ عليكم ورحمةُ اللهِ وبركاتُه',
    greeting: 'حِبر القلوب وأنوار المسرّات — أنتم في خاطرنا',
    signatureLabel: 'تَتَشَرَّفُ بِدَعوَتِكم',
    signatureName: 'آل البابطين وآل الزامل',
    rsvp: { enabled: true, allowMessage: true, requireApologyMessage: true },
    showBrideFirstNameInProse: false,
    tier: 'fakhira',
  },

  // 4. Eid greetings — olive Arabic palette
  {
    slug: 'sample-bassam-eid',
    templateId: 'eid-cosmos-v1',
    occasion: 'eid',
    palette: 'olive-arabic',
    senderVoice: 'host',
    host: { fullName: 'أبو ناصر — عبد الكريم البسّام', family: 'البسّام' },
    date: {
      gregorian: '2026-05-30',
      time: '08:00',
      hijriLabel: 'السبت ١٣ ذو الحجة ١٤٤٧ هـ',
      gregorianLabel: 'السبت ٣٠ مايو ٢٠٢٦ م',
      timeOfDayLabel: 'صباحًا',
    },
    venue: { city: 'الرياض', area: 'حي الملك فهد', hall: 'منزل العائلة' },
    verse: defaultVerseFor('eid'),
    flourish: 'تَقَبَّلَ اللهُ مِنّا ومِنكُم صالِحَ الأعمال',
    salam: 'السلامُ عليكم ورحمةُ اللهِ وبركاتُه',
    greeting: 'كلُّ عامٍ وأنتم بألفِ خَير',
    signatureLabel: 'مع أصدقِ التَّهاني',
    signatureName: 'عبد الكريم البسّام',
    signatureFamily: '— وجميعُ أفراد العائلة',
    rsvp: { enabled: true, allowMessage: true, requireApologyMessage: false },
    showBrideFirstNameInProse: false,
    tier: 'mumayyaza',
  },

  // 5. Aqiqa — emerald palette
  {
    slug: 'sample-jurayssi-aqiqa',
    templateId: 'aqiqa-cosmos-v1',
    occasion: 'aqiqa',
    palette: 'emerald',
    senderVoice: 'host',
    host: { fullName: 'عبد الله الجريسي', family: 'الجريسي' },
    date: {
      gregorian: '2026-06-06',
      time: '11:00',
      hijriLabel: 'السبت ٢٠ ذو الحجة ١٤٤٧ هـ',
      gregorianLabel: 'السبت ٦ يونيو ٢٠٢٦ م',
      timeOfDayLabel: 'ضحى',
    },
    venue: { city: 'الرياض', area: 'حي الياسمين', hall: 'استراحة الجريسي' },
    verse: defaultVerseFor('aqiqa'),
    flourish: 'بارَكَ اللهُ لَنا في المَولُود وجَعَلَهُ مِن الصّالِحين',
    salam: 'السلامُ عليكم ورحمةُ اللهِ وبركاتُه',
    greeting: 'نُشارِكُكم فَرحَةَ قدومِ المولود — عبد الملك',
    signatureLabel: 'بِكُلِّ المَحَبَّة',
    signatureName: 'آل الجريسي',
    rsvp: { enabled: true, allowMessage: true, requireApologyMessage: false },
    showBrideFirstNameInProse: false,
    tier: 'mumayyaza',
  },

  // 6. Graduation — gold palette with academic tone
  {
    slug: 'sample-fahd-graduation',
    templateId: 'graduation-cosmos-v1',
    occasion: 'graduation',
    palette: 'gold',
    senderVoice: 'host',
    host: { fullName: 'فهد بن عبد الرحمن الفهد', family: 'الفهد' },
    date: {
      gregorian: '2026-07-12',
      time: '19:00',
      hijriLabel: 'الأحد ٢٨ ذو الحجة ١٤٤٧ هـ',
      gregorianLabel: 'الأحد ١٢ يوليو ٢٠٢٦ م',
      timeOfDayLabel: 'مساءً',
    },
    venue: { city: 'الرياض', area: 'جامعة الملك سعود', hall: 'قاعة المؤتمرات الكبرى' },
    verse: defaultVerseFor('graduation'),
    flourish: 'مُبارَكٌ التَّخَرُّج — جَعَلَ اللهُ عِلمَكَ نافِعًا',
    salam: 'السلامُ عليكم ورحمةُ اللهِ وبركاتُه',
    greeting: 'نُشارِكُكم لحظةَ تتويجِ سنواتِ الجدّ والاجتهاد',
    signatureLabel: 'بِفَخرٍ واعتِزاز',
    signatureName: 'آل الفهد',
    signatureFamily: '— والأهلُ جَميعًا',
    rsvp: { enabled: true, allowMessage: true, requireApologyMessage: false },
    showBrideFirstNameInProse: false,
    tier: 'mumayyaza',
  },
];

/** First sample, used as default `/preview` content. */
export const defaultSample = sampleCards[0]!;
