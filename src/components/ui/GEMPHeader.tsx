'use client';

// ============================================================
// GEMPAR v2.1 — GEMPHeader
// Logo + back + title + action
// Referensi: GEMPAR_FINAL_BLUEPRINT.md §16.1
// ============================================================

import { cn } from '@/lib/utils/cn';

interface GEMPHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  showLogo?: boolean;
  onBack?: () => void;
  action?: {
    icon: React.ReactNode;
    onClick: () => void;
    label: string;
  };
  className?: string;
}

export function GEMPHeader({
  title,
  subtitle,
  showBack = false,
  showLogo = false,
  onBack,
  action,
  className,
}: GEMPHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 bg-white/95 backdrop-blur-sm',
        'shadow-[0_1px_2px_rgba(0,0,0,0.05)]',
        className
      )}
    >
      <div className="flex items-center h-14 px-4">
        {/* Left */}
        <div className="flex items-center w-10">
          {showBack && (
            <button
              onClick={onBack}
              className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full active:bg-[#F5F5F5] transition-colors"
              aria-label="Kembali"
            >
              <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}
          {showLogo && (
            <div className="w-8 h-8 rounded-lg bg-[#2E7D32] flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
          )}
        </div>

        {/* Center */}
        <div className="flex-1 text-center">
          {title && (
            <h1 className="text-base font-semibold text-[#1A1A1A] truncate">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-xs text-[#999999] -mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center justify-end w-10">
          {action && (
            <button
              onClick={action.onClick}
              className="flex items-center justify-center w-10 h-10 -mr-2 rounded-full active:bg-[#F5F5F5] transition-colors"
              aria-label={action.label}
            >
              {action.icon}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
