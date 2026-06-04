// ============================================================
// GEMPAR v2.1 — Spacing & Design Tokens
// Referensi: GEMPAR_FINAL_BLUEPRINT.md §11.3–11.7
// ============================================================

// ── Spacing Scale (base 4px) ──
export const SPACING = {
  4: '4px',
  8: '8px',
  12: '12px',
  16: '16px',
  20: '20px',
  24: '24px',
  32: '32px',
  40: '40px',
  48: '48px',
  64: '64px',
} as const;

export const SPACE_CLASS: Record<number, string> = {
  4: 'p-1',
  8: 'p-2',
  12: 'p-3',
  16: 'p-4',
  20: 'p-5',
  24: 'p-6',
  32: 'p-8',
  40: 'p-10',
  48: 'p-12',
  64: 'p-16',
} as const;

// ── Border Radius ──
export const RADIUS = {
  xs: '6px',
  sm: '10px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  full: '999px',
} as const;

export const RADIUS_CLASS: Record<string, string> = {
  xs: 'rounded-md',
  sm: 'rounded-lg',
  md: 'rounded-2xl',
  lg: 'rounded-3xl',
  xl: 'rounded-[32px]',
  full: 'rounded-full',
} as const;

// ── Shadows ──
export const SHADOWS = {
  xs: '0 1px 2px rgba(0,0,0,0.05)',
  sm: '0 2px 4px rgba(0,0,0,0.08)',
  md: '0 4px 12px rgba(0,0,0,0.12)',
  lg: '0 8px 24px rgba(0,0,0,0.16)',
} as const;

export const SHADOW_CLASS: Record<string, string> = {
  xs: 'shadow-sm',
  sm: 'shadow',
  md: 'shadow-lg',
  lg: 'shadow-xl',
} as const;

// ── Typography ──
export const TYPOGRAPHY = {
  display:   { size: '32px', weight: 700, lineHeight: 1.2, class: 'text-[32px] font-bold leading-tight' },
  heading1:  { size: '24px', weight: 700, lineHeight: 1.3, class: 'text-2xl font-bold leading-snug' },
  heading2:  { size: '20px', weight: 600, lineHeight: 1.3, class: 'text-xl font-semibold leading-snug' },
  heading3:  { size: '16px', weight: 600, lineHeight: 1.4, class: 'text-base font-semibold leading-snug' },
  body:      { size: '14px', weight: 400, lineHeight: 1.5, class: 'text-sm font-normal leading-relaxed' },
  caption:   { size: '12px', weight: 400, lineHeight: 1.4, class: 'text-xs font-normal leading-snug' },
  overline:  { size: '10px', weight: 600, lineHeight: 1.2, class: 'text-[10px] font-semibold leading-tight' },
} as const;

// ── Motion / Animation ──
export const MOTION = {
  fast:     { duration: '150ms',  easing: 'ease-out',                           class: 'duration-150 ease-out' },
  normal:   { duration: '250ms',  easing: 'ease-in-out',                        class: 'duration-250 ease-in-out' },
  slow:     { duration: '400ms',  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',       class: 'duration-400' },
  progress: { duration: '600ms',  easing: 'ease-out',                           class: 'duration-600 ease-out' },
  shimmer:  { duration: '1500ms', easing: 'linear',                             class: 'animate-pulse' },
} as const;

// ── Breakpoints ──
export const BREAKPOINTS = {
  mobile:  '320px',
  tablet:  '768px',
  desktop: '1024px',
} as const;

// ── Z-Index Scale ──
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  toast: 60,
  tooltip: 70,
} as const;
