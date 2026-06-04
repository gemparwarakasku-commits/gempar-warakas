'use client';

// ============================================================
// GEMPAR v2.1 — GEMPCard
// 5 variant: default, elevated, flat, gradient, mint
// Referensi: GEMPAR_FINAL_BLUEPRINT.md §16.4
// ============================================================

import { cn } from '@/lib/utils/cn';
import { HTMLAttributes, forwardRef } from 'react';

export type CardVariant = 'default' | 'elevated' | 'flat' | 'gradient' | 'mint';

interface GEMPCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: 'none' | 'small' | 'medium' | 'large';
  isHoverable?: boolean;
}

const VARIANT_STYLES: Record<CardVariant, string> = {
  default:  'bg-white rounded-2xl shadow-sm',
  elevated: 'bg-white rounded-2xl shadow-lg',
  flat:     'bg-[#FAFBFA] rounded-2xl shadow-none',
  gradient: 'rounded-3xl shadow-lg text-white',
  mint:     'bg-[#E8F5E9] rounded-2xl shadow-sm',
};

const PADDING_STYLES: Record<string, string> = {
  none:   '',
  small:  'p-3',
  medium: 'p-4',
  large:  'p-6',
};

const GEMPCard = forwardRef<HTMLDivElement, GEMPCardProps>(
  (
    {
      variant = 'default',
      padding = 'medium',
      isHoverable = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isGradient = variant === 'gradient';

    return (
      <div
        ref={ref}
        className={cn(
          VARIANT_STYLES[variant],
          PADDING_STYLES[padding],
          isHoverable && 'transition-all duration-250 ease-in-out hover:-translate-y-0.5 hover:shadow-md cursor-pointer',
          isGradient && 'bg-gradient-to-br from-[#2E7D32] to-[#1B5E20]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GEMPCard.displayName = 'GEMPCard';
export { GEMPCard };
