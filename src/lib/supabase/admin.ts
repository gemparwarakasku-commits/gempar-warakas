// ============================================================
// GEMPAR v2.1 — Supabase Admin Client (Service Role)
// Untuk: Admin-only operations, bypass RLS
// ⚠️ HANYA digunakan di Server Actions/API yang sudah di-auth guard
// ============================================================

import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

let adminClient: ReturnType<typeof createClient<Database>> | null = null;

/**
 * Create Supabase admin client with service_role key.
 * Bypasses RLS. ONLY use in authenticated admin routes.
 * 
 * @example
 * // Server Action (with admin role check)
 * const admin = getSupabaseAdmin();
 * const { data } = await admin.from('audit_log').select('*');
 */
export function getSupabaseAdmin() {
  if (adminClient) return adminClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Missing admin Supabase credentials. ' +
      'Check SUPABASE_SERVICE_ROLE_KEY.'
    );
  }

  adminClient = createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return adminClient;
}

/**
 * Admin-only: List all users (bypass RLS).
 * Must be wrapped in role guard middleware.
 */
export async function adminListUsers() {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.auth.admin.listUsers();
  if (error) throw error;
  return data.users;
}

/**
 * Admin-only: Get user by ID.
 */
export async function adminGetUser(userId: string) {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.auth.admin.getUserById(userId);
  if (error) throw error;
  return data.user;
}

/**
 * Admin-only: Delete user.
 */
export async function adminDeleteUser(userId: string) {
  const admin = getSupabaseAdmin();
  const { error } = await admin.auth.admin.deleteUser(userId);
  if (error) throw error;
}

/**
 * Admin-only: Send password reset email.
 */
export async function adminResetPassword(email: string) {
  const admin = getSupabaseAdmin();
  const { error } = await admin.auth.admin.generateLink({
    type: 'recovery',
    email,
  });
  if (error) throw error;
}
