// ============================================================
// GEMPAR v2.1 — useDashboard Hook
// Fetch & cache dashboard data
// ============================================================

import { useCallback, useEffect, useState } from 'react';
import { useDataStore } from '@/store';
import { getSupabaseBrowser } from '@/lib/supabase/client';
import type { DashboardData } from '@/types';

export function useDashboard(anggotaId?: string) {
  const { dashboardData, setDashboardData, setLastSync } = useDataStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    if (!anggotaId) return;
    setIsLoading(true);
    setError(null);

    try {
      const supabase = getSupabaseBrowser();

      // TODO: Replace with actual API call
      // const { data, error: apiError } = await supabase
      //   .from('anggota')
      //   .select('*, level_anggota(*), wilayah(*)')
      //   .eq('id', anggotaId)
      //   .single();

      // Mock for now
      await new Promise((r) => setTimeout(r, 500));
      const mockData: DashboardData = {
        anggota: {
          id: anggotaId,
          user_id: '1',
          nama_lengkap: 'Budi Santoso',
          email: 'budi@example.com',
          telepon: null,
          jenis_kelamin: null,
          tanggal_lahir: null,
          alamat: null,
          foto_profil_url: null,
          level_anggota_id: '2',
          total_gem: 1250,
          total_setoran: 24,
          total_berat_kg: 45.5,
          wilayah_id: '1',
          pin: null,
          created_at: '2026-01-01',
          updated_at: '2026-06-04',
        },
        saldo_gem: 1250,
        level_saat_ini: null,
        level_berikutnya: null,
        progress_level: 16.7,
        total_setoran_bulan_ini: 5,
        total_berat_bulan_ini: 12.3,
        streak_hari: 3,
        badge_terbaru: [],
        reward_terbaru: [],
        aktivitas_terakhir: [],
        peringkat: { rank: 12, total_anggota: 156, trend: 2 },
        dampak: {
          total_berat_kg: 45.5,
          total_setoran: 24,
          pohon_setara: 2.28,
          co2_dihindari: 113.75,
        },
        semangat_hari_ini: {
          quote: 'Setiap sampah yang dipilah adalah langkah kecil untuk bumi yang lebih bersih.',
          author: 'GEMPAR',
        },
      };

      setDashboardData(mockData);
      setLastSync(new Date().toISOString());
    } catch (err: any) {
      setError(err.message || 'Gagal memuat data dashboard');
    } finally {
      setIsLoading(false);
    }
  }, [anggotaId, setDashboardData, setLastSync]);

  useEffect(() => {
    // Fetch if no cached data or cache is stale (> 5 minutes)
    const lastSync = useDataStore.getState().lastSync;
    const isStale = !lastSync || Date.now() - new Date(lastSync).getTime() > 5 * 60 * 1000;

    if (!dashboardData || isStale) {
      fetchDashboard();
    }
  }, [anggotaId, dashboardData, fetchDashboard]);

  return {
    data: dashboardData,
    isLoading,
    error,
    refetch: fetchDashboard,
  };
}
