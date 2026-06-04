// ============================================================
// GEMPAR v2.1 — Anggota Layout
// Layout dengan BottomNavigation
// ============================================================

import { BottomNavigation } from '@/components/layout/BottomNavigation';

export default function AnggotaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pb-24">
      {children}
      <BottomNavigation />
    </div>
  );
}
