'use client';

// ============================================================
// GEMPAR v2.1 — GEMPProgressBar
// Progress bar dengan label, percentage
// Referensi: GEMPAR_FINAL_BLUEPRINT.md §16.1
// ============================================================

import { cn } from '@/lib/utils/cn';

interface GEMPProgressBarProps {
  value: number;        // 0-100
  max?: number;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  label?: string;
  color?: string;
  trackColor?: string;
  className?: string;
}

export function GEMPProgressBar({
  value,
  max = 100,
  size = 'medium',
  showLabel = false,
  label,
  color = 'bg-[#2E7D32]',
  trackColor = 'bg-[#EEEEEE]',
  className,
}: GEMPProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeStyles = {
    small:  'h-1 rounded-full',
    medium: 'h-2 rounded-full',
    large:  'h-3 rounded-full',
  };

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-xs text-[#666666]">{label}</span>}
          {showLabel && (
            <span className="text-xs font-semibold text-[#2E7D32]">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={cn('w-full overflow-hidden', trackColor, sizeStyles[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-600 ease-out', color)}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={Math.round(percentage)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
