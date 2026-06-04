'use client';

// ============================================================
// GEMPAR v2.1 — GEMPModal
// Modal dialog dengan overlay, close button
// Referensi: GEMPAR_FINAL_BLUEPRINT.md §16.1
// ============================================================

import { cn } from '@/lib/utils/cn';
import { useEffect, useRef } from 'react';
import { GEMPButton } from './GEMPButton';

interface GEMPModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  variant?: 'default' | 'danger';
  hideCloseButton?: boolean;
  className?: string;
}

export function GEMPModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  confirmLabel = 'Konfirmasi',
  cancelLabel = 'Batal',
  onConfirm,
  variant = 'default',
  hideCloseButton = false,
  className,
}: GEMPModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 animate-fade-in" />

      {/* Modal */}
      <div
        className={cn(
          'relative bg-white rounded-2xl shadow-lg w-full max-w-sm',
          'animate-scale-in',
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        {!hideCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full text-[#999999] hover:bg-[#F5F5F5] transition-colors"
            aria-label="Tutup"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="p-5">
          {title && (
            <h2 className="text-lg font-semibold text-[#1A1A1A] pr-8">{title}</h2>
          )}
          {description && (
            <p className="mt-1.5 text-sm text-[#666666]">{description}</p>
          )}
          {children && <div className="mt-4">{children}</div>}

          {(onConfirm || !hideCloseButton) && (
            <div className="flex gap-3 mt-5">
              <GEMPButton
                variant="ghost"
                size="medium"
                fullWidth
                onClick={onClose}
              >
                {cancelLabel}
              </GEMPButton>
              {onConfirm && (
                <GEMPButton
                  variant={variant === 'danger' ? 'danger' : 'primary'}
                  size="medium"
                  fullWidth
                  onClick={() => { onConfirm(); onClose(); }}
                >
                  {confirmLabel}
                </GEMPButton>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
