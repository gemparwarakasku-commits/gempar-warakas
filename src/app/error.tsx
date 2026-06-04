'use client';

// ============================================================
// GEMPAR v2.1 — Error Boundary
// Fallback UI untuk runtime errors
// ============================================================

import { useEffect } from 'react';
import { GEMPEmptyState } from '@/components/ui/GEMPEmptyState';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error ke monitoring (Sentry, dll)
    console.error('GEMPAR Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAFBFA] flex items-center justify-center p-4">
      <GEMPEmptyState
        type="error"
        title="Terjadi Kesalahan"
        description={error.message || 'Maaf, halaman ini tidak dapat dimuat. Silakan coba lagi.'}
        actionLabel="Coba Lagi"
        onAction={reset}
      />
    </div>
  );
}
