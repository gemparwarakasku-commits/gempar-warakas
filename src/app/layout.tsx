// ============================================================
// GEMPAR v2.1 — Root Layout
// Inter font, metadata, providers, global styles
// ============================================================

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'GEMPAR — Gerakan Memilah Sampah',
  description: 'Platform komunitas lingkungan berbasis GEM. Setor sampah, dapatkan GEM, tukar reward.',
  keywords: ['sampah', 'daur ulang', 'lingkungan', 'GEM', 'komunitas'],
  authors: [{ name: 'GEMPAR Team' }],
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'GEMPAR',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2E7D32',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-sans antialiased bg-[#FAFBFA] text-[#1A1A1A] min-h-screen">
        <div className="mx-auto max-w-[600px] min-h-screen relative">
          {children}
        </div>
      </body>
    </html>
  );
}
