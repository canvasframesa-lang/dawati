/**
 * Domain types for the Dawati card platform.
 * Single source of truth — extend here, never inline.
 */

export type OccasionType =
  | 'wedding'
  | 'engagement'
  | 'eid'
  | 'aqiqa'
  | 'graduation'
  | 'opening'
  | 'iftar';

export type SenderVoice = 'groom' | 'bride' | 'families' | 'couple' | 'host';

export type Tier = 'mumayyaza' | 'fakhira' | 'malakiyya';

export type Palette = 'gold' | 'rose-gold' | 'royal-midnight' | 'olive-arabic' | 'emerald';

export interface Person {
  /** Display name as written on the card (may include kunya, multiple given names). */
  fullName: string;
  /** First name only — used in the centerpiece when bride convention hides full name in prose. */
  firstName?: string;
  /** Family / surname for the families ribbon. */
  family?: string;
}

export interface VenueData {
  /** City (e.g., "الرياض"). */
  city: string;
  /** Neighborhood or detailed location (e.g., "حي الأندلس"). */
  area?: string;
  /** Hall / venue name (e.g., "قاعة الفيصلية"). */
  hall?: string;
  /** Latitude/longitude for the maps button. */
  lat?: number;
  lng?: number;
  /** Free-form address line, optional. */
  address?: string;
}

export interface DateData {
  /** ISO date (YYYY-MM-DD) of the event in Gregorian. */
  gregorian: string;
  /** Optional time (HH:MM, 24h). */
  time?: string;
  /** Computed Hijri label, e.g., "السبت ١٣ ذو الحجة ١٤٤٧ هـ". */
  hijriLabel?: string;
  /** Computed Gregorian label in Arabic, e.g., "السبت ٣٠ مايو ٢٠٢٦ م". */
  gregorianLabel?: string;
  /** "صباحًا" / "مساءً" / "ليلًا" — for walima / nightly events. */
  timeOfDayLabel?: string;
}

export interface VerseRef {
  /** Free-text Quranic verse (with full diacritics — pulled from curated library). */
  text: string;
  /** Source citation, e.g. { surah: "الروم", ayah: 21 }. */
  source: { surah: string; ayah: number };
}

export interface RsvpConfig {
  enabled: boolean;
  /** Per-card admin password (bcrypt hash stored server-side). */
  adminPasswordHash?: string;
  /** Allow guests to attach a message? */
  allowMessage: boolean;
  /** Require a message when apologizing? */
  requireApologyMessage: boolean;
}

export interface CardData {
  /** Stable card identifier (used in URL: /c/<slug>). */
  slug: string;
  /** Which template variant — keyed by template ID + version, e.g., "wedding-cosmos-v1". */
  templateId: string;
  occasion: OccasionType;
  palette: Palette;
  senderVoice: SenderVoice;

  /** Names. For weddings: groom + bride. For Eid/host events: host only. */
  groom?: Person;
  bride?: Person;
  host?: Person;

  /** Families (for weddings — "بدعوة من آل X وآل Y"). */
  groomFamily?: string;
  brideFamily?: string;

  /** Date & venue. */
  date: DateData;
  venue: VenueData;

  /** Verse (optional — defaults to occasion's canonical verse). */
  verse?: VerseRef;

  /** Hero verse fragment (the big text on the card). Defaults to a 2-3 word slice of `verse`. */
  heroFragment?: string;

  /** Salam / greeting line (defaults from occasion). */
  salam?: string;
  greeting?: string;

  /** Body stanzas — array of paragraphs. */
  stanzas?: string[];

  /** Final dua (defaults from occasion). */
  flourish?: string;

  /** Signature block. */
  signatureLabel?: string;
  signatureName?: string;
  signatureFamily?: string;

  /** RSVP settings. */
  rsvp: RsvpConfig;

  /** Convention: show bride's first name in the prose invitation? (Default false.) */
  showBrideFirstNameInProse: boolean;

  /** Optional uploads (Fakhira / Malakiyya tiers). */
  backgroundPhotoUrl?: string;
  voiceMessageUrl?: string;

  /** Tier — drives which features are enabled. */
  tier: Tier;

  /** Lifecycle. */
  publishedAt?: string;
  expiresAt?: string;
}

export interface RsvpRecord {
  id: string;
  cardId: string;
  guestName: string;
  attend: 'yes' | 'no';
  message?: string;
  ts: number;
  country?: string;
  /** Per-guest QR code data (Fakhira/Malakiyya). */
  qrToken?: string;
}

/** A curated entry in the verse library. */
export interface CuratedVerse {
  id: string;
  occasion: OccasionType[];
  text: string;
  source: { surah: string; ayah: number };
  /** Hero fragment (the headline-sized cut of the verse). */
  fragment: string;
}
