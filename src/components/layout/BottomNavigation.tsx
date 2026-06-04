'use client';

// ============================================================
// GEMPAR v2.1 — Bottom Navigation (Anggota)
// 5 tab: Dashboard, Reward, QR (primary), Ranking, Profil
// QR floating center, 72px
// ============================================================

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

const NAV_ITEMS = [
  { label: 'Beranda',  href: '/',        icon: HomeIcon },
  { label: 'Reward',   href: '/reward',  icon: GiftIcon },
  { label: 'QR',       href: '/setor',   icon: QRIcon,    isPrimary: true },
  { label: 'Ranking',  href: '/ranking', icon: TrophyIcon },
  { label: 'Profil',   href: '/profil',  icon: UserIcon },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="mx-auto max-w-[600px]">
        <div className="bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] rounded-t-3xl px-2 pt-2 pb-4">
          <ul className="flex items-end justify-around">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

              if (item.isPrimary) {
                return (
                  <li key={item.href} className="relative -top-5">
                    <Link
                      href={item.href}
                      className={cn(
                        'flex flex-col items-center justify-center w-[72px] h-[72px] rounded-full shadow-lg transition-all duration-150 ease-out active:scale-95',
                        isActive
                          ? 'bg-[#1B5E20] shadow-[#1B5E20]/30'
                          : 'bg-[#2E7D32] shadow-[#2E7D32]/30'
                      )}
                      aria-label={item.label}
                    >
                      <item.icon className="w-7 h-7 text-white" />
                      <span className="text-[10px] font-semibold text-white mt-0.5">{item.label}</span>
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

function GiftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0v8.25m-8.25 3.75h16.5" />
    </svg>
  );
}

function QRIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 16.5h.75v.75h-.75v-.75zM16.5 13.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
    </svg>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a3 3 0 01-5.007 0m5.007 0V6.375A1.125 1.125 0 0015.375 5.25h-6.75A1.125 1.125 0 007.5 6.375v3.375m0 0a3 3 0 015.007 0" />
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
