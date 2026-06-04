'use client';

// ============================================================
// GEMPAR v2.1 — GEMPSkeleton
// Skeleton loader shimmer
// Referensi: GEMPAR_FINAL_BLUEPRINT.md §16.1
// ============================================================

import { cn } from '@/lib/utils/cn';

interface GEMPSkeletonProps {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  className?: string;
}

export function GEMPSkeleton({
  width = '100%',
  height = '16px',
  circle = false,
  className,
}: GEMPSkeletonProps) {
  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={cn(
        'animate-shimmer bg-gradient-to-r from-[#EEEEEE] via-[#F5F5F5] to-[#EEEEEE] bg-[length:200%_100%]',
        circle ? 'rounded-full' : 'rounded-lg',
        className
      )}
      style={style}
      aria-hidden="true"
    />
  );
}

// ── Preset skeletons ──
export function SkeletonText({ lines = 1, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <GEMPSkeleton
          key={i}
          width={i === lines - 1 ? '70%' : '100%'}
          height={14}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('bg-white rounded-2xl p-4 shadow-sm space-y-3', className)}>
      <div className="flex items-center gap-3">
        <GEMPSkeleton width={40} height={40} circle />
        <div className="flex-1 space-y-2">
          <GEMPSkeleton width="60%" height={16} />
          <GEMPSkeleton width="40%" height={12} />
        </div>
      </div>
      <GEMPSkeleton width="100%" height={60} />
    </div>
  );
}

export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return <GEMPSkeleton width={size} height={size} circle />;
}
