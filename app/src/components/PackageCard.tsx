/**
 * PackageCard — the canonical price/package card used across the site.
 *
 * One card design, two visual modes:
 *
 *   variant="marketing"   Full card — name, tagline, big price, delivery
 *                         line, features list, CTA. Used on /pricing and
 *                         the marah/tanzeem micro-site pricing sections.
 *
 *   variant="selector"    Compact card — name, big price, delivery line.
 *                         Used inside forms (/order step 1). Honors the
 *                         `selected` prop for radio-style selection.
 *
 * Theme tokens make the card adapt to each micro-site's palette
 * (gold for Dawati, warm orange for Marah, navy/gold for Tanzeem) while
 * the structural design stays one and the same — same hierarchy on
 * mobile and desktop.
 *
 * All prices render with <Riyal /> instead of the unicode ﷼ character
 * to guarantee the symbol displays identically on every browser.
 */

import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { Riyal } from './Riyal';

/* ============ Theme ============ */

export interface PackageTheme {
  /** Light end of the gold/accent gradient (used in ribbon top, price gradient) */
  accentLight: string;
  /** Deep end of the accent gradient */
  accentDeep: string;
  /** Darkest accent (used for small labels and dark text on light bg) */
  accentDarkest: string;
  /** Text color used on top of the accent gradient (e.g. ribbon text). Must contrast with accentLight. */
  onAccentText: string;
  /** Background tint for the selected/recommended card */
  selectedBg: string;
  /** Border color for the selected/recommended card */
  selectedBorder: string;
  /** Shadow when recommended (saturated accent glow) */
  recommendedShadow: string;
  /** Optional ribbon label text override (defaults per language) */
}

export const GOLD_THEME: PackageTheme = {
  accentLight: '#f4d56e',
  accentDeep: '#d4a93a',
  accentDarkest: '#8a6817',
  onAccentText: '#2a1505',
  selectedBg: 'linear-gradient(180deg, rgba(244,213,110,0.16) 0%, rgba(212,169,58,0.06) 100%)',
  selectedBorder: '#f4d56e',
  recommendedShadow: '0 24px 48px rgba(184, 138, 30, 0.22), 0 4px 12px rgba(15, 15, 30, 0.05)',
};

export const ORANGE_THEME: PackageTheme = {
  accentLight: '#ffb380',
  accentDeep: '#ff7a3c',
  accentDarkest: '#c54a14',
  onAccentText: '#3a1605',
  selectedBg: 'linear-gradient(180deg, rgba(255,179,128,0.18) 0%, rgba(255,122,60,0.06) 100%)',
  selectedBorder: '#ff7a3c',
  recommendedShadow: '0 24px 48px rgba(197, 74, 20, 0.22), 0 4px 12px rgba(15, 15, 30, 0.05)',
};

export const NAVY_THEME: PackageTheme = {
  accentLight: '#f4d56e',
  accentDeep: '#c9a23d',
  accentDarkest: '#0e1d2e',
  onAccentText: '#0e1d2e',
  selectedBg: 'linear-gradient(180deg, rgba(244,213,110,0.14) 0%, rgba(14,29,46,0.04) 100%)',
  selectedBorder: '#0e1d2e',
  recommendedShadow: '0 24px 48px rgba(14, 29, 46, 0.20), 0 4px 12px rgba(15, 15, 30, 0.05)',
};

/* ============ Card ============ */

export interface PackageCardProps {
  /** Name shown in the card header (e.g., "المُمَيَّزَة"). */
  name: string;
  /** Optional tagline shown under the name (marketing variant only). */
  tagline?: string;
  /** Price in SAR (rendered as digit + Riyal SVG). */
  price: number;
  /** Optional delivery line — e.g., "تسليم خلال 24 ساعة · شامل الضريبة". */
  deliveryText?: string;
  /** Optional features list (marketing variant only). */
  features?: string[];
  /** CTA target URL (marketing variant). */
  ctaHref?: string;
  /** CTA label — defaults to "اطلب باقة {name} ←". */
  ctaLabel?: string;
  /** Marks the card as the recommended tier — adds gold ribbon + glow. */
  recommended?: boolean;
  /** Ribbon text override (defaults to "الأكثر طلبًا"). */
  ribbonText?: string;
  /** "marketing" (default) shows everything; "selector" hides features list. */
  variant?: 'marketing' | 'selector';
  /** Selector mode: marks this card as currently selected (radio behavior). */
  selected?: boolean;
  /** Selector mode: click handler. */
  onSelect?: () => void;
  /** Theme tokens. Defaults to GOLD_THEME. */
  theme?: PackageTheme;
  /** Stagger animation index (for the ai-rise reveal). */
  index?: number;
  /** Optional extra content rendered above the CTA / under features. */
  extra?: ReactNode;
}

export function PackageCard({
  name,
  tagline,
  price,
  deliveryText,
  features,
  ctaHref,
  ctaLabel,
  recommended = false,
  ribbonText = 'الأكثر طلبًا',
  variant = 'marketing',
  selected = false,
  onSelect,
  theme = GOLD_THEME,
  index = 0,
  extra,
}: PackageCardProps) {
  const isSelector = variant === 'selector';
  const showHighlight = recommended || selected;

  const cardStyle: CSSProperties = {
    border: showHighlight
      ? `1.5px solid ${theme.selectedBorder}`
      : '1px solid var(--color-line)',
    boxShadow: showHighlight
      ? theme.recommendedShadow
      : '0 12px 32px rgba(15, 15, 30, 0.08)',
    background: selected ? theme.selectedBg : '#ffffff',
    animationDelay: `${0.05 + index * 0.08}s`,
  };

  const innerPadding = isSelector ? 'p-5 sm:p-6' : 'p-6 sm:p-8';
  const Wrapper: React.ElementType = onSelect ? 'button' : 'article';

  return (
    <Wrapper
      type={onSelect ? 'button' : undefined}
      onClick={onSelect}
      className={`relative bg-white rounded-3xl flex flex-col overflow-hidden ai-rise text-right w-full transition ${
        onSelect ? 'cursor-pointer hover:-translate-y-0.5' : ''
      }`}
      style={cardStyle}
      aria-pressed={onSelect ? selected : undefined}
    >
      {/* Recommended ribbon */}
      {recommended && (
        <div
          className="text-center py-2 text-[11px] font-bold uppercase tracking-[4px]"
          style={{
            background: `linear-gradient(180deg, ${theme.accentLight} 0%, ${theme.accentDeep} 100%)`,
            color: theme.onAccentText,
            fontFamily: 'var(--font-latin)',
          }}
        >
          {ribbonText}
        </div>
      )}

      <div className={`${innerPadding} flex flex-col flex-1`}>
        <h3
          className="text-center text-[var(--color-ink)] mb-1"
          style={{ fontSize: isSelector ? 22 : 26, fontWeight: 800, letterSpacing: -0.5 }}
        >
          {name}
        </h3>

        {!isSelector && tagline && (
          <p className="text-center mb-6 text-sm leading-relaxed text-[var(--color-ink-mute)] min-h-[42px]">
            {tagline}
          </p>
        )}

        <PriceBlock price={price} theme={theme} compact={isSelector} />

        {deliveryText && (
          <div className="text-center mt-2 mb-2 text-[11px] text-[var(--color-ink-mute)] uppercase tracking-[3px] font-semibold">
            {deliveryText}
          </div>
        )}

        {!isSelector && features && features.length > 0 && (
          <>
            <div className="border-t border-[var(--color-line)] mt-4 mb-5" />
            <ul className="space-y-2.5 mb-7 flex-1 text-sm">
              {features.map((f) => {
                const isHeader = f.startsWith('كل ما في');
                return (
                  <li
                    key={f}
                    className="flex gap-2.5 items-start leading-relaxed"
                    style={
                      isHeader
                        ? { color: theme.accentDarkest, fontWeight: 700, marginBottom: 4 }
                        : { color: 'var(--color-ink-soft)' }
                    }
                  >
                    {isHeader ? (
                      <span className="shrink-0 mt-0.5" style={{ color: theme.accentDeep }} aria-hidden="true">
                        ⇡
                      </span>
                    ) : (
                      <CheckIcon theme={theme} />
                    )}
                    <span>{f}</span>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {extra}

        {!isSelector && ctaHref && (
          <Link
            href={ctaHref}
            className={recommended ? 'btn-gold' : 'btn-ghost'}
            style={{ width: '100%' }}
          >
            {ctaLabel ?? `اطلب باقة ${name} ←`}
          </Link>
        )}
      </div>
    </Wrapper>
  );
}

/* ============ Price block (number + Riyal SVG) ============ */

function PriceBlock({
  price,
  theme,
  compact,
}: {
  price: number;
  theme: PackageTheme;
  compact: boolean;
}) {
  const numberSize = compact ? 'clamp(34px, 5.5vw, 44px)' : 'clamp(44px, 7vw, 60px)';
  const riyalSize = compact ? 22 : 28;
  return (
    <div className="text-center">
      <div
        className="inline-flex items-baseline gap-2"
        dir="ltr"
        style={{ fontFamily: 'var(--font-latin)' }}
      >
        <span
          className="font-black"
          style={{
            fontSize: numberSize,
            lineHeight: 1,
            letterSpacing: -1,
            background: `linear-gradient(135deg, ${theme.accentLight} 0%, ${theme.accentDeep} 70%, ${theme.accentDarkest} 100%)`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}
        >
          {price.toLocaleString('en-US')}
        </span>
        <Riyal size={riyalSize} color={theme.accentDeep} />
      </div>
    </div>
  );
}

/* ============ Themed check icon for feature rows ============ */

function CheckIcon({ theme }: { theme: PackageTheme }) {
  const id = `pchk-${theme.accentDeep.replace('#', '')}`;
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className="shrink-0 mt-0.5" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={theme.accentLight} />
          <stop offset="100%" stopColor={theme.accentDarkest} />
        </linearGradient>
      </defs>
      <circle cx="9" cy="9" r="8" fill={`url(#${id})`} opacity="0.18" />
      <path
        d="M5 9.2 L8 12 L13.5 6"
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
