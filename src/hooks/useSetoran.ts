// ============================================================
// GEMPAR v2.1 — useSetoran Hook
// Setoran operations: create, list, detail
// ============================================================

import { useCallback, useState } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase/client';
import { calculateGEM } from '@/lib/utils/calculateGEM';
import type { Setoran, JenisSampah, SetoranFormData } from '@/types';

export function useSetoran() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create setoran (petugas)
  const createSetoran = useCallback(
    async (data: SetoranFormData & { anggotaId: string; petugasId: string }) => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch jenis sampah for calculation
        const supabase = getSupabaseBrowser();
        const { data: jenisSampah, error: jenisError } = await supabase
          .from('jenis_sampah')
          .select('*')
          .eq('id', data.jenis_sampah_id)
          .single();

        if (jenisError || !jenisSampah) {
          throw new Error('Jenis sampah tidak ditemukan');
        }

        // Calculate GEM
        const calc = calculateGEM(data.berat_kg, data.kualitas, jenisSampah as JenisSampah);

        // Insert setoran
        const { data: result, error: insertError } = await supabase
          .from('setoran')
          .insert({
            anggota_id: data.anggotaId,
            petugas_id: data.petugasId,
            jenis_sampah_id: data.jenis_sampah_id,
            berat_kg: data.berat_kg,
            kualitas: data.kualitas,
            gem_didapat: calc.totalGEM,
            multiplier: calc.qualityMultiplier,
            bonus_gem: calc.bonusGEM,
            catatan: data.catatan,
            status: 'pending',
          })
          .select()
          .single();

        if (insertError) throw insertError;

        return { success: true, data: result as Setoran };
      } catch (err: any) {
        const message = err.message || 'Gagal menyimpan setoran';
        setError(message);
        return { success: false, error: message };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // List setoran by anggota
  const listSetoran = useCallback(async (anggotaId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = getSupabaseBrowser();
      const { data, error: fetchError } = await supabase
        .from('setoran')
        .select('*, jenis_sampah(*)')
        .eq('anggota_id', anggotaId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      return { success: true, data: (data || []) as Setoran[] };
    } catch (err: any) {
      const message = err.message || 'Gagal memuat riwayat setoran';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    createSetoran,
    listSetoran,
  };
}
