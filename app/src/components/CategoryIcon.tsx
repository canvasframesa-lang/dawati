/**
 * Premium line-art category icons.
 *
 * Replaces the colour-emoji set (💍🌙👨‍👩‍👧‍👦🎓🏢🇸🇦🤝✨) with a coherent
 * gold-gradient set drawn as SVG so they match the wordmark, the
 * brand-mark seal, and the cosmic palette. Each icon uses a 40×40
 * viewBox, 2px stroke, rounded caps/joins, and is unitless so it
 * scales cleanly from the landing-page tiles (36px) down to a tab
 * favicon (16px).
 */

import type { JSX } from 'react';

export type CategoryName =
  | 'wedding'
  | 'religious'
  | 'family'
  | 'milestone'
  | 'commercial'
  | 'national'
  | 'social'
  | 'other';

export function CategoryIcon({
  name,
  size = 36,
  className,
}: {
  name: CategoryName;
  size?: number;
  className?: string;
}) {
  const gid = `cat-${name}`;
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

const ICONS: Record<CategoryName, (gid: string) => JSX.Element> = {
  /* Two interlocking rings — wedding/marriage */
  wedding: () => (
    <>
      <circle cx="15" cy="23" r="8" />
      <circle cx="25" cy="23" r="8" />
      <path d="M14 14 L16 11" />
      <path d="M24 14 L26 11" />
    </>
  ),

  /* Crescent + small star — Islamic / religious occasions */
  religious: (gid) => (
    <>
      <path
        d="M26 8 a13 13 0 1 0 0 24 a10 10 0 1 1 0-24z"
        fill={`url(#${gid})`}
        stroke="none"
      />
      <path d="M8 11 L9 13 L11 13 L9.5 14.5 L10 17 L8 15.5 L6 17 L6.5 14.5 L5 13 L7 13 Z"
            fill={`url(#${gid})`} stroke="none" />
    </>
  ),

  /* Heart — family/kinship */
  family: () => (
    <path d="M20 32 C 6 23 6 11 14 11 C 17 11 19 13 20 15 C 21 13 23 11 26 11 C 34 11 34 23 20 32 Z" />
  ),

  /* Mortarboard — graduation/milestone */
  milestone: () => (
    <>
      <path d="M20 11 L34 17 L20 23 L6 17 Z" />
      <path d="M10 19 L10 26 C 10 28 14 30 20 30 C 26 30 30 28 30 26 L30 19" />
      <path d="M34 17 L34 25" />
      <circle cx="34" cy="26" r="1.5" fill={`url(#cat-milestone)`} stroke="none" />
    </>
  ),

  /* Tower with windows — commercial / business */
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

  /* Palm tree above two crossed swords — Saudi national emblem */
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

  /* Three connected nodes — community/social */
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

  /* Eight-point najmah — matches the brand mark; "other" / sparkle */
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
};
