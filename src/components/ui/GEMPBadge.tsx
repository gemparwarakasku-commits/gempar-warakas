'use client';

// ============================================================
// GEMPAR v2.1 — GEMPBadge
// Status badge dengan warna
// Referensi: GEMPAR_FINAL_BLUEPRINT.md §16.1
// ============================================================

import { cn } from '@/lib/utils/cn';

export type BadgeColor = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface GEMPBadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  size?: 'small' | 'medium';
  dot?: boolean;
  className?: string;
}

const COLOR_STYLES: Record<BadgeColor, string> = {
  primary: 'bg-[#E8F5E9] text-[#2E7D32] border-[#2E7D32]',
  success: 'bg-[#E8F5E9] text-[#2E7D32] border-[#4CAF50]',
  warning: 'bg-[#FFF8E1] text-[#F9A825] border-[#FFC107]',
  danger:  'bg-[#FFEBEE] text-[#C62828] border-[#F44336]',
  info:    'bg-[#E3F2FD] text-[#1565C0] border-[#2196F3]',
  neutral: 'bg-[#F5F5F5] text-[#999999] border-[#CCCCCC]',
};

const DOT_COLORS: Record<BadgeColor, string> = {
  primary: 'bg-[#2E7D32]',
  success: 'bg-[#4CAF50]',
  warning: 'bg-[#FFC107]',
  danger:  'bg-[#F44336]',
  info:    'bg-[#2196F3]',
  neutral: 'bg-[#999999]',
};

export function GEMPBadge({
  children,
  color = 'primary',
  size = 'medium',
  dot = false,
  className,
}: GEMPBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        size === 'small' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs',
        COLOR_STYLES[color],
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', DOT_COLORS[color])} />}
      {children}
    </span>
  );
}
