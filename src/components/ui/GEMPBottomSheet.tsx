'use client';

// ============================================================
// GEMPAR v2.1 — GEMPBottomSheet
// Bottom sheet dengan drag handle
// Referensi: GEMPAR_FINAL_BLUEPRINT.md §16.1
// ============================================================

import { cn } from '@/lib/utils/cn';
import { useEffect, useRef, useState } from 'react';

interface GEMPBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showHandle?: boolean;
  maxHeight?: string;
  className?: string;
}

export function GEMPBottomSheet({
  isOpen,
  onClose,
  title,
  children,
  showHandle = true,
  maxHeight = '85vh',
  className,
}: GEMPBottomSheetProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
      }, 300);
      return () => clearTimeout(timer);
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

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startY.current = e.touches[0].clientY;
    currentY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    currentY.current = e.touches[0].clientY;
    const diff = currentY.current - startY.current;
    if (diff > 0 && sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${diff}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = currentY.current - startY.current;
    if (diff > 100) {
      onClose();
    } else if (sheetRef.current) {
      sheetRef.current.style.transform = '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-black/50 transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className={cn(
          'absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg',
          'transition-transform duration-300 ease-out',
          isVisible ? 'translate-y-0' : 'translate-y-full',
          className
        )}
        style={{ maxHeight }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {showHandle && (
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-[#CCCCCC]" />
          </div>
        )}

        {title && (
          <div className="px-5 pt-2 pb-3">
            <h3 className="text-lg font-semibold text-[#1A1A1A]">{title}</h3>
          </div>
        )}

        <div className="overflow-y-auto" style={{ maxHeight: `calc(${maxHeight} - ${title ? '80px' : '40px'})` }}>
          <div className="px-5 pb-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
