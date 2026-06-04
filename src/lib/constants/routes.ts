// ============================================================
// GEMPAR v2.1 — Route Paths
// Referensi: GEMPAR_FINAL_BLUEPRINT.md §12–14
// ============================================================

// ── Auth Routes ──
export const AUTH_ROUTES = {
  login: '/login',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
} as const;

// ── Anggota Routes ──
export const ANGGOTA_ROUTES = {
  dashboard: '/',
  setor: '/setor',
  reward: '/reward',
  rewardSaya: '/reward-saya',
  riwayat: '/riwayat',
  mutasi: '/mutasi',
  ranking: '/ranking',
  profil: '/profil',
  badge: '/profil/badge',
  level: '/profil/level',
  team: '/profil/team',
} as const;

// ── Petugas Routes ──
export const PETUGAS_ROUTES = {
  dashboard: '/',
  scan: '/scan',
  input: '/input',
  riwayat: '/riwayat',
  profil: '/profil',
} as const;

// ── Admin Routes ──
export const ADMIN_ROUTES = {
  dashboard: '/',
  anggota: '/anggota',
  anggotaDetail: (id: string) => `/anggota/${id}`,
  petugas: '/petugas',
  wilayah: '/wilayah',
  jenisSampah: '/jenis-sampah',
  reward: '/reward',
  badge: '/badge',
  level: '/level',
  economy: '/economy',
  laporan: '/laporan',
  sistem: '/sistem',
  audit: '/audit',
} as const;

// ── API Routes ──
export const API_ROUTES = {
  auth: {
    login: '/api/auth/login',
    refresh: '/api/auth/refresh',
    logout: '/api/auth/logout',
    verifyPin: '/api/auth/verify-pin',
  },
  anggota: {
    base: '/api/anggota',
    detail: (id: string) => `/api/anggota/${id}`,
    dashboard: (id: string) => `/api/anggota/${id}/dashboard`,
    riwayat: (id: string) => `/api/anggota/${id}/riwayat`,
    mutasi: (id: string) => `/api/anggota/${id}/mutasi`,
    badge: (id: string) => `/api/anggota/${id}/badge`,
    level: (id: string) => `/api/anggota/${id}/level`,
    reward: (id: string) => `/api/anggota/${id}/reward`,
    team: (id: string) => `/api/anggota/${id}/team`,
  },
  setoran: {
    base: '/api/setoran',
    detail: (id: string) => `/api/setoran/${id}`,
    verifikasi: (id: string) => `/api/setoran/${id}/verifikasi`,
  },
  reward: {
    base: '/api/reward',
    detail: (id: string) => `/api/reward/${id}`,
    tukar: (id: string) => `/api/reward/${id}/tukar`,
  },
  kupon: {
    base: '/api/kupon',
    detail: (id: string) => `/api/kupon/${id}`,
    klaim: (id: string) => `/api/kupon/${id}/klaim`,
  },
  mutasi: {
    base: '/api/mutasi',
    koreksi: '/api/mutasi/koreksi',
  },
  ranking: {
    wilayah: (id: string) => `/api/ranking/wilayah/${id}`,
    nasional: '/api/ranking/nasional',
  },
} as const;

// ── External Links ──
export const EXTERNAL_LINKS = {
  github: 'https://github.com',
  vercel: 'https://vercel.com',
  supabase: 'https://supabase.com',
  docs: 'https://nextjs.org/docs',
} as const;

// ── Route access by role ──
export const ROLE_ACCESS: Record<string, string[]> = {
  anggota: [
    ...Object.values(ANGGOTA_ROUTES),
  ],
  petugas: [
    ...Object.values(PETUGAS_ROUTES),
  ],
  admin: [
    ...Object.values(ADMIN_ROUTES).filter((r): r is string => typeof r === 'string'),
  ],
} as const;
