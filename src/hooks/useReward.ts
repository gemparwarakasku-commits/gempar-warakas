// ============================================================
// GEMPAR v2.1 — useReward Hook
// Reward operations: list, tukar, list kupon
// ============================================================

import { useCallback, useState } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase/client';
import type { Reward, Kupon, TukarRewardFormData } from '@/types';

export function useReward() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // List active rewards
  const listRewards = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = getSupabaseBrowser();
      const { data, error: fetchError } = await supabase
        .from('reward')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      return { success: true, data: (data || []) as Reward[] };
    } catch (err: any) {
      const message = err.message || 'Gagal memuat reward';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Tukar reward
  const tukarReward = useCallback(
    async (data: TukarRewardFormData & { anggotaId: string }) => {
      setIsLoading(true);
      setError(null);

      try {
        // TODO: Implement tukar reward with PIN verification
        // 1. Verify PIN
        // 2. Check saldo
        // 3. Check stok
        // 4. Create kupon
        // 5. Deduct GEM

        await new Promise((r) => setTimeout(r, 1000));

        return { success: true, data: { kuponId: 'mock-kupon-id' } };
      } catch (err: any) {
        const message = err.message || 'Gagal menukar reward';
        setError(message);
        return { success: false, error: message };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // List kupon anggota
  const listKupon = useCallback(async (anggotaId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = getSupabaseBrowser();
      const { data, error: fetchError } = await supabase
        .from('kupon')
        .select('*, reward(*)')
        .eq('anggota_id', anggotaId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      return { success: true, data: (data || []) as Kupon[] };
    } catch (err: any) {
      const message = err.message || 'Gagal memuat kupon';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    listRewards,
    tukarReward,
    listKupon,
  };
}
