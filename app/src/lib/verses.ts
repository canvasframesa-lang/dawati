import type { CuratedVerse, OccasionType } from './types';

/**
 * Curated Quranic verses for invitation cards.
 * Source: Tanzil Uthmani script. Diacritics preserved.
 * NEVER let users free-type Quranic text — pick from this library.
 */
export const VERSES: CuratedVerse[] = [
  {
    id: 'rum-21',
    occasion: ['wedding', 'engagement'],
    text: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
    source: { surah: 'الروم', ayah: 21 },
    fragment: 'وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
  },
  {
    id: 'nur-32',
    occasion: ['wedding', 'engagement'],
    text: 'وَأَنكِحُوا الْأَيَامَىٰ مِنكُمْ وَالصَّالِحِينَ مِنْ عِبَادِكُمْ وَإِمَائِكُمْ ۚ إِن يَكُونُوا فُقَرَاءَ يُغْنِهِمُ اللَّهُ مِن فَضْلِهِ ۗ وَاللَّهُ وَاسِعٌ عَلِيمٌ',
    source: { surah: 'النور', ayah: 32 },
    fragment: 'وَأَنكِحُوا الْأَيَامَىٰ مِنكُمْ',
  },
  {
    id: 'hajj-27',
    occasion: ['eid'],
    text: 'وَأَذِّن فِي النَّاسِ بِالْحَجِّ يَأْتُوكَ رِجَالًا وَعَلَىٰ كُلِّ ضَامِرٍ يَأْتِينَ مِن كُلِّ فَجٍّ عَمِيقٍ',
    source: { surah: 'الحج', ayah: 27 },
    fragment: 'وَأَذِّن فِي النَّاسِ بِالْحَجِّ',
  },
  {
    id: 'baqara-185',
    occasion: ['eid', 'iftar'],
    text: 'شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ وَبَيِّنَاتٍ مِّنَ الْهُدَىٰ وَالْفُرْقَانِ ۚ ... وَلِتُكْمِلُوا الْعِدَّةَ وَلِتُكَبِّرُوا اللَّهَ عَلَىٰ مَا هَدَاكُمْ',
    source: { surah: 'البقرة', ayah: 185 },
    fragment: 'وَلِتُكَبِّرُوا اللَّهَ عَلَىٰ مَا هَدَاكُمْ',
  },
  {
    id: 'taha-114',
    occasion: ['graduation'],
    text: 'وَقُل رَّبِّ زِدْنِي عِلْمًا',
    source: { surah: 'طه', ayah: 114 },
    fragment: 'وَقُل رَّبِّ زِدْنِي عِلْمًا',
  },
  {
    id: 'maida-2',
    occasion: ['opening', 'iftar', 'aqiqa'],
    text: 'وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ ۖ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ',
    source: { surah: 'المائدة', ayah: 2 },
    fragment: 'وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ',
  },
];

/** Curated dua/flourish phrases by occasion. */
export const FLOURISHES: Record<OccasionType, string[]> = {
  wedding: [
    'بارَكَ اللهُ لَهُما وبارَكَ عَلَيهِما وجَمَعَ بَينَهُما في خَير',
    'اللَّهُمَّ بارِك لَهُما واجمَع بَينَهُما في خَير',
    'بَلَّغَكُمُ اللهُ مَواسِمَ الفَرَح',
  ],
  engagement: [
    'بارَكَ اللهُ لَهُما وأتَمَّ عَلَيهِما بِالخَير',
    'تَمَّت بِفَضلِ اللهِ ورَحمَتِه',
  ],
  eid: [
    'تَقَبَّلَ اللهُ مِنّا ومِنكُم صالِحَ الأعمال',
    'وكلُّ عامٍ وأنتُم بِأَلفِ خَير',
    'أعادَهُ اللهُ علينا وعليكُم بالخَيرِ واليُمنِ والبَركات',
  ],
  aqiqa: [
    'بارَكَ اللهُ لَكُم في المَولُود',
    'جَعَلَهُ اللهُ مِن الصّالِحين',
  ],
  graduation: [
    'مُبارَكٌ التَّخَرُّج — جَعَلَ اللهُ عِلمَكَ نافِعًا',
  ],
  opening: [
    'بَوَّأَ اللهُ مَكانَكُم بَركَةً ونَجاحًا',
  ],
  iftar: [
    'تَقَبَّلَ اللهُ صِيامَكُم وقِيامَكُم',
  ],
};

export function findVersesForOccasion(occasion: OccasionType): CuratedVerse[] {
  return VERSES.filter((v) => v.occasion.includes(occasion));
}

export function defaultVerseFor(occasion: OccasionType): CuratedVerse | undefined {
  return findVersesForOccasion(occasion)[0];
}

export function defaultFlourishFor(occasion: OccasionType): string {
  return FLOURISHES[occasion]?.[0] ?? '';
}
