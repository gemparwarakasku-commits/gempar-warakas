// ============================================================
// GEMPAR v2.1 — Role Definitions & Permissions
// Referensi: GEMPAR_FINAL_BLUEPRINT.md §20.2
// ============================================================

import { Role } from '@/types';

// ── Role Hierarchy ──
export const ROLE_HIERARCHY: Record<<Role, number> = {
  anggota: 1,
  petugas: 2,
  admin: 3,
} as const;

// ── Role Labels ──
export const ROLE_LABELS: Record<<Role, string> = {
  anggota: 'Anggota',
  petugas: 'Petugas',
  admin: 'Admin',
} as const;

// ── Role Colors ──
export const ROLE_COLORS: Record<<Role, { bg: string; text: string; dot: string }> = {
  anggota: {
    bg: 'bg-[#E8F5E9]',
    text: 'text-[#2E7D32]',
    dot: 'bg-[#4CAF50]',
  },
  petugas: {
    bg: 'bg-[#E3F2FD]',
    text: 'text-[#1565C0]',
    dot: 'bg-[#2196F3]',
  },
  admin: {
    bg: 'bg-[#FFF3E0]',
    text: 'text-[#E65100]',
    dot: 'bg-[#FF9800]',
  },
} as const;

// ── Permissions Matrix ──
export type Permission =
  | 'dashboard:view'
  | 'setoran:create'
  | 'setoran:edit'
  | 'setoran:verify'
  | 'reward:view'
  | 'reward:tukar'
  | 'reward:manage'
  | 'anggota:view'
  | 'anggota:edit'
  | 'anggota:delete'
  | 'petugas:view'
  | 'petugas:manage'
  | 'wilayah:manage'
  | 'jenis_sampah:manage'
  | 'badge:manage'
  | 'level:manage'
  | 'mutasi:koreksi'
  | 'laporan:view'
  | 'sistem:manage'
  | 'audit:view';

export const PERMISSIONS: Record<<Role, Permission[]> = {
  anggota: [
    'dashboard:view',
    'reward:view',
    'reward:tukar',
  ],
  petugas: [
    'dashboard:view',
    'setoran:create',
    'setoran:edit',
    'anggota:view',
  ],
  admin: [
    'dashboard:view',
    'setoran:verify',
    'reward:view',
    'reward:manage',
    'anggota:view',
    'anggota:edit',
    'anggota:delete',
    'petugas:view',
    'petugas:manage',
    'wilayah:manage',
    'jenis_sampah:manage',
    'badge:manage',
    'level:manage',
    'mutasi:koreksi',
    'laporan:view',
    'sistem:manage',
    'audit:view',
  ],
} as const;

/**
 * Check if a role has a specific permission.
 */
export function hasPermission(role: Role, permission: Permission): boolean {
  return PERMISSIONS[role]?.includes(permission) ?? false;
}

/**
 * Check if role A can access role B's data (hierarchy check).
 * Admin > Petugas > Anggota
 */
export function canAccess(role: Role, targetRole: Role): boolean {
  return ROLE_HIERARCHY[role] >= ROLE_HIERARCHY[targetRole];
}

/**
 * Get all permissions for a role.
 */
export function getRolePermissions(role: Role): Permission[] {
  return PERMISSIONS[role] ?? [];
}

/**
 * Check if user is at least a certain role level.
 */
export function isAtLeast(role: Role, minRole: Role): boolean {
  return ROLE_HIERARCHY[role] >= ROLE_HIERARCHY[minRole];
}

// ── Navigation visibility by role ──
export const NAV_VISIBILITY: Record<<Role, { showQR: boolean; showAdmin: boolean; showPetugas: boolean }> = {
  anggota:  { showQR: true,  showAdmin: false, showPetugas: false },
  petugas:  { showQR: false, showAdmin: false, showPetugas: true },
  admin:    { showQR: false, showAdmin: true,  showPetugas: false },
} as const;
