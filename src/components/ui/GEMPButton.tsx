'use client';

// ============================================================
// GEMPAR v2.1 — GEMPButton
// 5 variant, 3 size, press scale animation
// Referensi: GEMPAR_FINAL_BLUEPRINT.md §16.4
// ============================================================

import { cn } from '@/lib/utils/cn';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'soft' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

interface GEMPButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:   'bg-[#2E7D32] text-white shadow-sm hover:bg-[#1B5E20] active:bg-[#1B5E20]',
  secondary: 'bg-[#1B5E20] text-white shadow-sm hover:bg-[#2E7D32] active:bg-[#2E7D32]',
  soft:      'bg-[#4CAF50] text-white shadow-sm hover:bg-[#2E7D32] active:bg-[#2E7D32]',
  ghost:     'bg-transparent text-[#2E7D32] border border-[#2E7D32] hover:bg-[#E8F5E9] active:bg-[#E8F5E9]',
  danger:    'bg-[#F44336] text-white shadow-sm hover:bg-[#D32F2F] active:bg-[#D32F2F]',
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  small:  'h-8 px-3 text-xs font-medium rounded-md gap-1.5',
  medium: 'h-10 px-4 text-sm font-semibold rounded-lg gap-2',
  large:  'h-12 px-6 text-base font-semibold rounded-lg gap-2',
};

const GEMPButton = forwardRef<HTMLButtonElement, GEMPButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-150 ease-out',
          'active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
          VARIANT_STYLES[variant],
          SIZE_STYLES[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

GEMPButton.displayName = 'GEMPButton';
export { GEMPButton };
