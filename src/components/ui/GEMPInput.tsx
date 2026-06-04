'use client';

// ============================================================
// GEMPAR v2.1 — GEMPInput
// 5 state: default, focus, error, disabled, success
// Referensi: GEMPAR_FINAL_BLUEPRINT.md §16.4
// ============================================================

import { cn } from '@/lib/utils/cn';
import { InputHTMLAttributes, forwardRef, useState } from 'react';

export type InputState = 'default' | 'error' | 'success' | 'disabled';

interface GEMPInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  state?: InputState;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const STATE_STYLES: Record<InputState, string> = {
  default:  'border-[#CCCCCC] bg-white focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20',
  error:    'border-[#F44336] bg-white focus:border-[#F44336] focus:ring-2 focus:ring-[#F44336]/20',
  success:  'border-[#4CAF50] bg-white focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20',
  disabled: 'border-[#EEEEEE] bg-[#F5F5F5] text-[#999999] cursor-not-allowed',
};

const LABEL_COLORS: Record<InputState, string> = {
  default:  'text-[#666666]',
  error:    'text-[#F44336]',
  success:  'text-[#4CAF50]',
  disabled: 'text-[#999999]',
};

const GEMPInput = forwardRef<HTMLInputElement, GEMPInputProps>(
  (
    {
      label,
      helperText,
      errorText,
      state = 'default',
      leftIcon,
      rightIcon,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const currentState = disabled ? 'disabled' : state;

    return (
      <div className="w-full">
        {label && (
          <label className={cn('block text-sm font-medium mb-1.5', LABEL_COLORS[currentState])}>
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={cn(
              'w-full h-11 px-4 text-sm rounded-lg border transition-all duration-150 outline-none',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              STATE_STYLES[currentState],
              className
            )}
            onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
            onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999]">
              {rightIcon}
            </div>
          )}
        </div>
        {(helperText || errorText) && (
          <p className={cn('mt-1.5 text-xs', errorText ? 'text-[#F44336]' : 'text-[#999999]')}>
            {errorText || helperText}
          </p>
        )}
      </div>
    );
  }
);

GEMPInput.displayName = 'GEMPInput';
export { GEMPInput };
