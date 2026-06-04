'use client';

// ============================================================
// GEMPAR v2.1 — Login Page
// Email + password, link ke forgot-password
// ============================================================

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GEMPInput } from '@/components/ui/GEMPInput';
import { GEMPButton } from '@/components/ui/GEMPButton';
import { GEMPToast } from '@/components/ui/GEMPToast';
import { loginSchema } from '@/lib/utils/validators';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0]?.message || 'Validasi gagal');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Integrasi dengan Supabase Auth
      // const { error } = await supabase.auth.signInWithPassword({ email, password });
      // if (error) throw error;

      // Mock success
      await new Promise(r => setTimeout(r, 1000));
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Login gagal. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-lg font-semibold text-[#1A1A1A] mb-1">Masuk ke Akun</h2>
      <p className="text-sm text-[#999999] mb-6">Silakan masukkan email dan password Anda</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <GEMPInput
          type="email"
          label="Email"
          placeholder="nama@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<EmailIcon />}
          state={error ? 'error' : 'default'}
        />

        <GEMPInput
          type="password"
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<LockIcon />}
          state={error ? 'error' : 'default'}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-[#CCCCCC] text-[#2E7D32] focus:ring-[#2E7D32]" />
            <span className="text-xs text-[#666666]">Ingat saya</span>
          </label>
          <Link href="/forgot-password" className="text-xs font-medium text-[#2E7D32] hover:underline">
            Lupa password?
          </Link>
        </div>

        <GEMPButton
          type="submit"
          variant="primary"
          size="large"
          fullWidth
          isLoading={isLoading}
        >
          Masuk
        </GEMPButton>
      </form>

      {error && (
        <GEMPToast
          message={error}
          type="error"
          onClose={() => setError('')}
        />
      )}
    </div>
  );
}

function EmailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}
