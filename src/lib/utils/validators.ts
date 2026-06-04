// ============================================================
// GEMPAR v2.1 — Utility: Zod Validators
// Validasi form: login, register, setoran, profil, team
// ============================================================

import { z } from 'zod';

// ────────────────────────────────────────────────────────────
// AUTH VALIDATORS
// ────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),
  password: z
    .string()
    .min(1, 'Password wajib diisi')
    .min(6, 'Password minimal 6 karakter'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const pinSchema = z.object({
  pin: z
    .string()
    .min(1, 'PIN wajib diisi')
    .length(6, 'PIN harus 6 digit')
    .regex(/^\d{6}$/, 'PIN hanya boleh angka'),
});

export type PinSchema = z.infer<typeof pinSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password minimal 8 karakter')
      .regex(/[A-Z]/, 'Password harus mengandung huruf besar')
      .regex(/[a-z]/, 'Password harus mengandung huruf kecil')
      .regex(/[0-9]/, 'Password harus mengandung angka'),
    confirmPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak cocok',
    path: ['confirmPassword'],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

// ────────────────────────────────────────────────────────────
// SETORAN VALIDATORS
// ────────────────────────────────────────────────────────────

export const setoranSchema = z.object({
  jenis_sampah_id: z
    .string()
    .min(1, 'Jenis sampah wajib dipilih'),
  berat_kg: z
    .number()
    .min(0.5, 'Berat minimal 0.5 kg')
    .max(1000, 'Berat maksimal 1000 kg'),
  kualitas: z
    .number()
    .int()
    .min(1, 'Kualitas minimal 1')
    .max(5, 'Kualitas maksimal 5'),
  catatan: z
    .string()
    .max(500, 'Catatan maksimal 500 karakter')
    .optional(),
});

export type SetoranSchema = z.infer<typeof setoranSchema>;

// ────────────────────────────────────────────────────────────
// REWARD VALIDATORS
// ────────────────────────────────────────────────────────────

export const tukarRewardSchema = z.object({
  reward_id: z.string().min(1, 'Reward wajib dipilih'),
  pin: z
    .string()
    .length(6, 'PIN harus 6 digit')
    .regex(/^\d{6}$/, 'PIN hanya boleh angka'),
});

export type TukarRewardSchema = z.infer<typeof tukarRewardSchema>;

// ────────────────────────────────────────────────────────────
// PROFIL VALIDATORS
// ────────────────────────────────────────────────────────────

export const profilUpdateSchema = z.object({
  nama_lengkap: z
    .string()
    .min(1, 'Nama lengkap wajib diisi')
    .min(3, 'Nama minimal 3 karakter')
    .max(100, 'Nama maksimal 100 karakter'),
  telepon: z
    .string()
    .regex(/^\d{10,15}$/, 'Nomor telepon tidak valid (10-15 digit)')
    .optional()
    .or(z.literal('')),
  jenis_kelamin: z
    .enum(['L', 'P'])
    .optional()
    .nullable(),
  tanggal_lahir: z
    .string()
    .optional()
    .nullable(),
  alamat: z
    .string()
    .max(500, 'Alamat maksimal 500 karakter')
    .optional()
    .or(z.literal('')),
});

export type ProfilUpdateSchema = z.infer<typeof profilUpdateSchema>;

// ────────────────────────────────────────────────────────────
// MY TEAM VALIDATORS
// ────────────────────────────────────────────────────────────

export const myTeamSchema = z.object({
  nomor_kk: z
    .string()
    .min(16, 'Nomor KK harus 16 digit')
    .max(16, 'Nomor KK harus 16 digit')
    .regex(/^\d{16}$/, 'Nomor KK hanya boleh angka'),
  nama_kk: z
    .string()
    .min(1, 'Nama KK wajib diisi')
    .min(3, 'Nama KK minimal 3 karakter')
    .max(100, 'Nama KK maksimal 100 karakter'),
  jumlah_kk: z
    .number()
    .int()
    .min(1, 'Jumlah KK minimal 1'),
  jumlah_jiwa: z
    .number()
    .int()
    .min(1, 'Jumlah jiwa minimal 1'),
  jenis_sampah_id: z
    .string()
    .min(1, 'Jenis sampah wajib dipilih'),
});

export type MyTeamSchema = z.infer<typeof myTeamSchema>;

// ────────────────────────────────────────────────────────────
// FILE UPLOAD VALIDATORS
// ────────────────────────────────────────────────────────────

export const fotoProfilSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 200 * 1024, 'Ukuran file maksimal 200KB')
    .refine(
      (file) => ['image/jpeg', 'image/png'].includes(file.type),
      'Format file harus JPG atau PNG'
    ),
});

export const fotoBuktiSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 1 * 1024 * 1024, 'Ukuran file maksimal 1MB')
    .refine(
      (file) => ['image/jpeg', 'image/png'].includes(file.type),
      'Format file harus JPG atau PNG'
    ),
});

// ────────────────────────────────────────────────────────────
// SYSTEM SETTING VALIDATORS
// ────────────────────────────────────────────────────────────

export const systemSettingSchema = z.object({
  konversi_default: z.number().positive().optional(),
  batas_harian: z.number().positive().optional(),
  minimal_berat: z.number().positive().optional(),
  quote_motivasi: z.string().max(500).optional(),
  maintenance_mode: z.boolean().optional(),
});

export type SystemSettingSchema = z.infer<typeof systemSettingSchema>;
