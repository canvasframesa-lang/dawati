/**
 * Brand-aligned line-art icon set.
 *
 * Every icon used across the landing page lives here — categories,
 * the four "how it works" steps, and the dashboard feature tiles. One
 * coherent visual language: 40×40 viewBox, 1.8px stroke, rounded
 * caps/joins, gold gradient stroke (matches the wordmark + envelope
 * mark). No colour emoji, no hand-drawn inconsistency.
 *
 * Add a new icon by adding an entry to ICONS and to the IconName type.
 */

import type { JSX } from 'react';

export type IconName =
  // Occasion category tiles
  | 'wedding' | 'religious' | 'family' | 'milestone'
  | 'commercial' | 'national' | 'social' | 'other'
  // Four-step "how it works" section
  | 'form' | 'design' | 'check' | 'share'
  // Dashboard feature tiles
  | 'counter' | 'messages' | 'barcode' | 'food'
  | 'kids' | 'accessibility' | 'export' | 'reminder' | 'stats';

/** Back-compat type — same shape as CategoryName before this refactor. */
export type CategoryName = Extract<
  IconName,
  'wedding' | 'religious' | 'family' | 'milestone' | 'commercial' | 'national' | 'social' | 'other'
>;

export function CategoryIcon({
  name,
  size = 36,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const gid = `icon-${name}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#fff8d8" />
          <stop offset="40%"  stopColor="#f4d56e" />
          <stop offset="100%" stopColor="#8a6817" />
        </linearGradient>
      </defs>
      <g
        stroke={`url(#${gid})`}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {ICONS[name](gid)}
      </g>
    </svg>
  );
}

const ICONS: Record<IconName, (gid: string) => JSX.Element> = {
  /* ============ Occasion categories ============ */

  wedding: () => (
    <>
      <circle cx="15" cy="23" r="8" />
      <circle cx="25" cy="23" r="8" />
      <path d="M14 14 L16 11" />
      <path d="M24 14 L26 11" />
    </>
  ),

  religious: (gid) => (
    <>
      <path
        d="M26 8 a13 13 0 1 0 0 24 a10 10 0 1 1 0-24z"
        fill={`url(#${gid})`}
        stroke="none"
      />
      <path
        d="M8 11 L9 13 L11 13 L9.5 14.5 L10 17 L8 15.5 L6 17 L6.5 14.5 L5 13 L7 13 Z"
        fill={`url(#${gid})`}
        stroke="none"
      />
    </>
  ),

  family: () => (
    <path d="M20 32 C 6 23 6 11 14 11 C 17 11 19 13 20 15 C 21 13 23 11 26 11 C 34 11 34 23 20 32 Z" />
  ),

  milestone: (gid) => (
    <>
      <path d="M20 11 L34 17 L20 23 L6 17 Z" />
      <path d="M10 19 L10 26 C 10 28 14 30 20 30 C 26 30 30 28 30 26 L30 19" />
      <path d="M34 17 L34 25" />
      <circle cx="34" cy="26" r="1.5" fill={`url(#${gid})`} stroke="none" />
    </>
  ),

  commercial: (gid) => (
    <>
      <path d="M11 31 L11 13 L20 9 L20 31 Z" />
      <path d="M20 31 L20 17 L29 14 L29 31 Z" />
      <circle cx="14" cy="17" r="0.8" fill={`url(#${gid})`} stroke="none" />
      <circle cx="17" cy="17" r="0.8" fill={`url(#${gid})`} stroke="none" />
      <circle cx="14" cy="22" r="0.8" fill={`url(#${gid})`} stroke="none" />
      <circle cx="17" cy="22" r="0.8" fill={`url(#${gid})`} stroke="none" />
      <circle cx="14" cy="27" r="0.8" fill={`url(#${gid})`} stroke="none" />
      <circle cx="17" cy="27" r="0.8" fill={`url(#${gid})`} stroke="none" />
      <circle cx="24" cy="22" r="0.8" fill={`url(#${gid})`} stroke="none" />
      <circle cx="24" cy="27" r="0.8" fill={`url(#${gid})`} stroke="none" />
    </>
  ),

  national: () => (
    <>
      <path d="M20 32 L20 18" />
      <path d="M20 18 Q 11 15 7 17" />
      <path d="M20 18 Q 29 15 33 17" />
      <path d="M20 18 Q 14 10 11 7" />
      <path d="M20 18 Q 26 10 29 7" />
      <path d="M20 18 Q 20 11 19 8" />
      <path d="M11 32 L29 32" />
      <path d="M9 35 L31 35" />
    </>
  ),

  social: (gid) => (
    <>
      <circle cx="13" cy="25" r="3.5" />
      <circle cx="27" cy="25" r="3.5" />
      <circle cx="20" cy="12" r="3.5" />
      <path d="M16.5 25 L23.5 25" />
      <path d="M14.6 22 L18.4 14.8" />
      <path d="M25.4 22 L21.6 14.8" />
      <circle cx="13" cy="25" r="0.8" fill={`url(#${gid})`} stroke="none" />
      <circle cx="27" cy="25" r="0.8" fill={`url(#${gid})`} stroke="none" />
      <circle cx="20" cy="12" r="0.8" fill={`url(#${gid})`} stroke="none" />
    </>
  ),

  other: (gid) => (
    <g fill={`url(#${gid})`} stroke="none">
      <polygon points="20,7 22.5,17.5 33,20 22.5,22.5 20,33 17.5,22.5 7,20 17.5,17.5" />
      <polygon
        points="20,7 22.5,17.5 33,20 22.5,22.5 20,33 17.5,22.5 7,20 17.5,17.5"
        transform="rotate(22.5 20 20)"
        opacity="0.55"
      />
    </g>
  ),

  /* ============ Process steps ============ */

  /* Document with lines + nib tip — "fill the form" */
  form: () => (
    <>
      <path d="M11 8 L25 8 L29 12 L29 32 L11 32 Z" />
      <path d="M25 8 L25 12 L29 12" />
      <line x1="15" y1="18" x2="25" y2="18" />
      <line x1="15" y1="23" x2="25" y2="23" />
      <line x1="15" y1="28" x2="22" y2="28" />
    </>
  ),

  /* Artist's palette with three paint wells — "we design" */
  design: (gid) => (
    <>
      <path d="M20 9 C 12 9 8 14 8 20 C 8 26 12 31 18 31 C 20 31 21 30 21 28 C 21 26 22 25 24 25 L26 25 C 30 25 32 22 32 18 C 32 13 27 9 20 9 Z" />
      <circle cx="13" cy="18" r="1.4" fill={`url(#${gid})`} stroke="none" />
      <circle cx="19" cy="14" r="1.4" fill={`url(#${gid})`} stroke="none" />
      <circle cx="26" cy="16" r="1.4" fill={`url(#${gid})`} stroke="none" />
    </>
  ),

  /* Checkmark inside circle — "review & approve" */
  check: () => (
    <>
      <circle cx="20" cy="20" r="13" />
      <path d="M14 20 L18.5 24.5 L27 16" />
    </>
  ),

  /* Share network — three nodes joined — "share & track" */
  share: (gid) => (
    <>
      <circle cx="11" cy="20" r="3" />
      <circle cx="29" cy="11" r="3" />
      <circle cx="29" cy="29" r="3" />
      <path d="M13.6 18.5 L26.4 12.5" />
      <path d="M13.6 21.5 L26.4 27.5" />
      <circle cx="11" cy="20" r="0.6" fill={`url(#${gid})`} stroke="none" />
      <circle cx="29" cy="11" r="0.6" fill={`url(#${gid})`} stroke="none" />
      <circle cx="29" cy="29" r="0.6" fill={`url(#${gid})`} stroke="none" />
    </>
  ),

  /* ============ Dashboard features ============ */

  /* Circular gauge with needle — "live counter" */
  counter: (gid) => (
    <>
      <path d="M9 26 A 13 13 0 1 1 31 26" />
      <line x1="20" y1="22" x2="26" y2="14" />
      <circle cx="20" cy="22" r="1.6" fill={`url(#${gid})`} stroke="none" />
    </>
  ),

  /* Speech bubble with reply tail — "guest messages" */
  messages: (gid) => (
    <>
      <path d="M9 13 Q 9 9 13 9 L27 9 Q 31 9 31 13 L31 22 Q 31 26 27 26 L18 26 L13 31 L13 26 L13 26 Q 9 26 9 22 Z" />
      <circle cx="15" cy="17.5" r="0.9" fill={`url(#${gid})`} stroke="none" />
      <circle cx="20" cy="17.5" r="0.9" fill={`url(#${gid})`} stroke="none" />
      <circle cx="25" cy="17.5" r="0.9" fill={`url(#${gid})`} stroke="none" />
    </>
  ),

  /* QR-style vertical bars — "barcode per guest" */
  barcode: () => (
    <g strokeWidth="1.6">
      <line x1="9"  y1="11" x2="9"  y2="29" />
      <line x1="12" y1="11" x2="12" y2="29" strokeWidth="2.6" />
      <line x1="16" y1="11" x2="16" y2="29" strokeWidth="1.2" />
      <line x1="19" y1="11" x2="19" y2="29" strokeWidth="2.2" />
      <line x1="23" y1="11" x2="23" y2="29" />
      <line x1="26" y1="11" x2="26" y2="29" strokeWidth="2.6" />
      <line x1="30" y1="11" x2="30" y2="29" strokeWidth="1.2" />
    </g>
  ),

  /* Fork + knife — "meal preferences" */
  food: () => (
    <>
      <path d="M12 8 L12 16 Q 12 18 14 18 Q 16 18 16 16 L16 8" />
      <line x1="14" y1="18" x2="14" y2="32" />
      <path d="M26 8 Q 30 12 30 18 Q 30 19 28 19 L26 19 Z" />
      <line x1="26" y1="19" x2="26" y2="32" />
    </>
  ),

  /* Adult + child silhouettes — "companions count" */
  kids: () => (
    <>
      <circle cx="14" cy="13" r="3.2" />
      <path d="M9 27 Q 9 19 14 19 Q 19 19 19 27" />
      <line x1="9" y1="27" x2="19" y2="27" />
      <circle cx="26" cy="16" r="2.6" />
      <path d="M22 28 Q 22 22 26 22 Q 30 22 30 28" />
      <line x1="22" y1="28" x2="30" y2="28" />
    </>
  ),

  /* Wheelchair user — "accessibility needs" */
  accessibility: (gid) => (
    <>
      <circle cx="23" cy="9" r="2.4" />
      <path d="M23 12 L23 22 L29 22" />
      <circle cx="22" cy="27" r="6" />
      <line x1="23" y1="17" x2="17" y2="22" />
      <circle cx="22" cy="27" r="0.8" fill={`url(#${gid})`} stroke="none" />
    </>
  ),

  /* Tray with down-arrow — "export list" */
  export: () => (
    <>
      <line x1="20" y1="8" x2="20" y2="22" />
      <path d="M14 17 L20 23 L26 17" />
      <path d="M8 24 L8 30 Q 8 32 10 32 L30 32 Q 32 32 32 30 L32 24" />
    </>
  ),

  /* Alarm clock with bell ears — "auto reminder" */
  reminder: (gid) => (
    <>
      <circle cx="20" cy="22" r="11" />
      <path d="M20 16 L20 22 L25 24" />
      <path d="M11 10 L8 13" />
      <path d="M29 10 L32 13" />
      <circle cx="20" cy="22" r="0.9" fill={`url(#${gid})`} stroke="none" />
    </>
  ),

  /* Ascending bar chart + trend line — "smart stats" */
  stats: () => (
    <>
      <line x1="8" y1="32" x2="32" y2="32" />
      <rect x="11" y="22" width="4" height="10" />
      <rect x="18" y="17" width="4" height="15" />
      <rect x="25" y="12" width="4" height="20" />
      <path d="M11 18 L18 14 L25 9 L31 6" strokeWidth="1.4" />
    </>
  ),
};
