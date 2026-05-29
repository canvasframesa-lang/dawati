import type { CardData } from './types';
import { defaultVerseFor, defaultFlourishFor } from './verses';

/**
 * A reference sample card. Used by:
 *  - /preview     (live preview at /preview)
 *  - The landing page's hero "preview card" miniature
 *  - Storybook stories (once added)
 *  - Tests
 *
 * Names intentionally generic so this isn't tied to a real customer.
 */
export const sampleWeddingCard: CardData = {
  slug: 'sample-wedding',
  templateId: 'wedding-cosmos-v1',
  occasion: 'wedding',
  palette: 'gold',
  senderVoice: 'families',

  groom: {
    fullName: 'محمد عبد الله الفهد',
    firstName: 'محمد',
    family: 'الفهد',
  },
  bride: {
    fullName: 'ابنة عبد الرحمن الراشد',
    firstName: 'ـ',
    family: 'الراشد',
  },
  groomFamily: 'الفهد',
  brideFamily: 'الراشد',

  date: {
    gregorian: '2026-08-14',
    time: '21:00',
    hijriLabel: 'الجمعة ٢٩ صفر ١٤٤٨ هـ',
    gregorianLabel: 'الجمعة ١٤ أغسطس ٢٠٢٦ م',
    timeOfDayLabel: 'مساءً',
  },
  venue: {
    city: 'الرياض',
    area: 'حي الياسمين',
    hall: 'قاعة الفيصلية',
    lat: 24.7136,
    lng: 46.6753,
  },

  verse: defaultVerseFor('wedding'),
  flourish: defaultFlourishFor('wedding'),

  salam: 'السلامُ عليكم ورحمةُ اللهِ وبركاتُه',
  greeting: 'يا أهلَ الفَضلِ والمَحَبَّة، يا مَن أنتُم مِنّا وإلينا',

  stanzas: [
    'الحمدُ للهِ الذي خلَقَ مِن أنفُسِنا أزواجًا،\nوجعَلَ بَيننا مَوَدَّةً ورَحمَة،\nوالصلاةُ والسلامُ على نبيِّ الرَّحمَة.',
    'حُضورُكم تاجٌ على رُؤوسِنا،\nودُعاؤُكم زادٌ نَتَزَوَّدُ بِه،\nفلا تَحرِمونا طِيبَ صُحبَتِكم.',
  ],

  signatureLabel: 'بِكُلِّ المَحَبَّةِ والتَّقدير',
  signatureName: 'العائلتان الكريمتان',
  signatureFamily: '— والأهلُ جَميعًا',

  rsvp: {
    enabled: true,
    allowMessage: true,
    requireApologyMessage: true,
  },

  showBrideFirstNameInProse: false,

  tier: 'fakhira',
};
