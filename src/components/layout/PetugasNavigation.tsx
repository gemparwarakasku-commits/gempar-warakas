'use client';

// ============================================================
// GEMPAR v2.1 — Petugas Navigation
// 4 tab: Dashboard, Scan, Riwayat, Profil
// ============================================================

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

const PETUGAS_NAV_ITEMS = [
  { label: 'Beranda',  href: '/',        icon: HomeIcon },
  { label: 'Scan',     href: '/scan',    icon: ScanIcon, isPrimary: true },
  { label: 'Riwayat',  href: '/riwayat', icon: ClockIcon },
  { label: 'Profil',   href: '/profil',  icon: UserIcon },
];

export function PetugasNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="mx-auto max-w-[600px]">
        <div className="bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] rounded-t-3xl px-4 pt-2 pb-4">
          <ul className="flex items-end justify-around">
            {PETUGAS_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

              if (item.isPrimary) {
                return (
                  <li key={item.href} className="relative -top-4">
                    <Link
                      href={item.href}
                      className={cn(
                        'flex flex-col items-center justify-center w-16 h-16 rounded-full shadow-lg transition-all duration-150 ease-out active:scale-95',
                        isActive
                          ? 'bg-[#1B5E20]'
                          : 'bg-[#2E7D32]'
                      )}
                      aria-label={item.label}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-150 ease-out active:scale-95',
                      isActive
                        ? 'text-[#2E7D32]'
                        : 'text-[#999999]'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

// ── Icons ──
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function ScanIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}
