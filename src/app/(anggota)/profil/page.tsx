'use client';

// ============================================================
// GEMPAR v2.1 — Dashboard Anggota
// Menggabungkan 12 komponen dashboard
// Referensi: GEMPAR_FINAL_BLUEPRINT.md §12.1
// ============================================================

import { useState } from 'react';
import { GEMPHeaderPremium } from '@/components/ui/GEMPHeaderPremium';
import { GEMPKartuGEMPremium } from '@/components/ui/GEMPKartuGEMPremium';
import { GEMPPencapaianBerikutnya } from '@/components/ui/GEMPPencapaianBerikutnya';
import { GEMPStatCard } from '@/components/ui/GEMPStatCard';
import { GEMPTimeline } from '@/components/ui/GEMPTimeline';
import { GEMPSemangatHariIni } from '@/components/ui/GEMPSemangatHariIni';
import { GEMPHadiahDitukar } from '@/components/ui/GEMPHadiahDitukar';
import { GEMPPenghargaanSaya } from '@/components/ui/GEMPPenghargaanSaya';
import { GEMPSkeleton } from '@/components/ui/GEMPSkeleton';
import type { DashboardData, TimelineItem, HadiahItem, BadgeItem } from '@/types';

// Mock data
const MOCK_DASHBOARD: DashboardData = {
  anggota: {
    id: '1',
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
    level_anggota: {
      id: '2',
      urutan: 2,
      nama: 'Aktif',
      min_gem: 1000,
      min_setoran: 20,
      warna: '#4CAF50',
      icon_url: null,
      deskripsi: null,
      is_active: true,
      created_at: '',
      updated_at: '',
    },
  },
  saldo_gem: 1250,
  level_saat_ini: {
    id: '2',
    urutan: 2,
    nama: 'Aktif',
    min_gem: 1000,
    min_setoran: 20,
    warna: '#4CAF50',
    icon_url: null,
    deskripsi: null,
    is_active: true,
    created_at: '',
    updated_at: '',
  },
  level_berikutnya: {
    id: '3',
    urutan: 3,
    nama: 'Rajin',
    min_gem: 2500,
    min_setoran: 50,
    warna: '#2E7D32',
    icon_url: null,
    deskripsi: null,
    is_active: true,
    created_at: '',
    updated_at: '',
  },
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

const MOCK_TIMELINE: TimelineItem[] = [
  {
    id: '1',
    title: 'Setoran Plastik',
    detail: '2.5 kg — 50 GEM',
    time: '2026-06-04T10:30:00Z',
    iconBg: 'bg-[#E8F5E9]',
    iconColor: 'text-[#2E7D32]',
  },
  {
    id: '2',
    title: 'Setoran Kertas',
    detail: '1.8 kg — 36 GEM',
    time: '2026-06-03T14:15:00Z',
    iconBg: 'bg-[#E3F2FD]',
    iconColor: 'text-[#2196F3]',
  },
  {
    id: '3',
    title: 'Tukar Reward',
    detail: 'Voucher Diskon 10%',
    time: '2026-06-02T09:00:00Z',
    iconBg: 'bg-[#FFF8E1]',
    iconColor: 'text-[#F9A825]',
  },
];

const MOCK_HADIAH: HadiahItem[] = [
  { id: '1', nama: 'Voucher Diskon', hargaGem: 100, tanggalTukar: '2026-06-02', status: 'aktif' },
  { id: '2', nama: 'Tote Bag', hargaGem
