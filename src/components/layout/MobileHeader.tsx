'use client';

// ============================================================
// GEMPAR v2.1 — Mobile Header
// Logo + back button + title + action
// ============================================================

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  showLogo?: boolean;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  className?: string;
}

export function MobileHeader({
  title,
  showBack = false,
  showLogo = false,
  action,
  className,
}: MobileHeaderProps) {
  const router = useRouter();

  return (
    <header
      className={cn(
        'sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-[0_1px_2px_rgba(0,0,0,0.05)]',
        className
      )}
    >
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left: Back or Logo */}
        <div className="flex items-center w-10">
          {showBack && (
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full transition-colors active:bg-[#F5F5F5]"
              aria-label="Kembali"
            >
              <BackIcon className="w-5 h-5 text-[#1A1A1A]" />
            </button>
          )}
          {showLogo && (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2E7D32] flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
            </Link>
          )}
        </div>

        {/* Center: Title */}
        <div className="flex-1 text-center">
          {title && (
            <h1 className="text-base font-semibold text-[#1A1A1A] truncate">
              {title}
            </h1>
          )}
        </div>

        {/* Right: Action */}
        <div className="flex items-center justify-end w-10">
          {action && (
            <button
              onClick={action.onClick}
              className="flex items-center justify-center w-10 h-10 -mr-2 rounded-full transition-colors active:bg-[#F5F5F5]"
              aria-label={action.label}
            >
              {action.icon || <span className="text-sm text-[#2E7D32] font-medium">{action.label}</span>}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

// ── Icons ──
function BackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  );
}
