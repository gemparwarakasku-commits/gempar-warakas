'use client';

// ============================================================
// GEMPAR v2.1 — GEMPToast
// Toast notification auto-dismiss
// Referensi: GEMPAR_FINAL_BLUEPRINT.md §16.1
// ============================================================

import { cn } from '@/lib/utils/cn';
import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface GEMPToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

const TYPE_STYLES: Record<ToastType, string> = {
  success: 'bg-[#2E7D32] text-white',
  error:   'bg-[#F44336] text-white',
  info:    'bg-[#2196F3] text-white',
  warning: 'bg-[#FFC107] text-[#1A1A1A]',
};

const TYPE_ICONS: Record<ToastType, React.ReactNode> = {
  success: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
};

export function GEMPToast({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  className,
}: GEMPToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => setIsVisible(true));

    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onClose?.();
      }, 200);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={cn(
        'fixed top-4 left-4 right-4 z-[60] mx-auto max-w-[400px]',
        'flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg',
        'transition-all duration-300',
        isVisible && !isExiting ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0',
        TYPE_STYLES[type],
        className
      )}
      role="alert"
    >
      {TYPE_ICONS[type]}
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={() => { setIsExiting(true); setTimeout(() => onClose?.(), 200); }}
        className="shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Tutup"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
