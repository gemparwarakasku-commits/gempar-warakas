// GEMPAR TypeScript Types v2.1

export interface User {
  id: string;
  email: string;
  nama: string;
  telepon?: string;
  foto_profil_url?: string;
  role: 'anggota' | 'petugas' | 'admin';
  status: 'aktif' | 'nonaktif';
}

export interface Wilayah {
  id: string;
  kode: string;
  nama: string;
  provinsi?: string;
  kabupaten?: string;
  kecamatan?: string;
  desa?: string;
  total_anggota: number;
  total_petugas: number;
}

export interface JenisSampah {
  id: string;
  kode: string;
  nama: string;
  kategori: 'organik' | 'anorganik' | 'B3' | 'lainnya';
  konversi_gem_per_kg: number;
  deskripsi?: string;
  icon_url?: string;
  status: 'aktif' | 'nonaktif';
}

export interface LevelAnggota {
  id: string;
  urutan: number;
  nama: string;
  min_gem: number;
  min_setoran: number;
  warna: string;
  icon_url?: string;
  deskripsi?: string;
  benefit?: string;
}

export interface Badge {
  id: string;
  nama: string;
  deskripsi?: string;
  icon_url?: string;
  kriteria: Record<string, unknown>;
  tipe: 'setoran' | 'level' | 'event' | 'streak';
  total_penerima: number;
}

export interface Anggota {
  id: string;
  email: string;
  nama: string;
  telepon?: string;
  alamat?: string;
  foto_profil_url?: string;
  level_anggota_id?: string;
  wilayah_id?: string;
  total_gem: number;
  total_setoran: number;
  total_berat: number;
  streak_hari: number;
  streak_terpanjang: number;
  tanggal_bergabung: string;
}

export interface Petugas {
  id: string;
  email: string;
  nama: string;
  telepon?: string;
  foto_profil_url?: string;
  wilayah_id?: string;
  total_setoran_verifikasi: number;
  total_anggota_dilayani: number;
}

export interface Admin {
  id: string;
  email: string;
  nama: string;
  telepon?: string;
  foto_profil_url?: string;
  role: 'admin' | 'superadmin';
}

export interface MyTeam {
  id: string;
  anggota_id: string;
  nomor_kk: string;
  nama_kk: string;
  jumlah_kk: number;
  jumlah_jiwa: number;
  jenis_sampah_id?: string;
}

export interface Setoran {
  id: string;
  anggota_id: string;
  petugas_id?: string;
  jenis_sampah_id: string;
  berat: number;
  kualitas: number;
  gem_didapat: number;
  multiplier: number;
  bonus_gem: number;
  foto_bukti_url?: string;
  catatan?: string;
  status: 'pending' | 'verifikasi' | 'ditolak' | 'dibatalkan';
  tanggal_setor: string;
}

export interface MutasiGEM {
  id: string;
  anggota_id: string;
  tipe: 'setoran' | 'tukar' | 'koreksi' | 'bonus' | 'refund';
  jumlah: number;
  saldo_akhir: number;
  keterangan?: string;
  referensi_id?: string;
  referensi_tipe?: string;
  created_at: string;
}

export interface Reward {
  id: string;
  nama: string;
  deskripsi?: string;
  harga_gem: number;
  stok: number;
  kategori: 'digital' | 'fisik' | 'voucher';
  gambar_url?: string;
  syarat_level_id?: string;
  syarat_gem: number;
  periode_mulai?: string;
  periode_selesai?: string;
}

export interface Kupon {
  id: string;
  anggota_id: string;
  reward_id: string;
  kode: string;
  status: 'aktif' | 'terklaim' | 'kadaluarsa' | 'dibatalkan';
  tanggal_tukar: string;
  tanggal_kadaluarsa?: string;
  tanggal_klaim?: string;
}

export interface Notifikasi {
  id: string;
  user_id: string;
  user_tipe: 'anggota' | 'petugas' | 'admin';
  judul: string;
  pesan: string;
  tipe: 'setoran' | 'reward' | 'badge' | 'level' | 'system' | 'team';
  dibaca: boolean;
  data?: Record<string, unknown>;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    request_id: string;
    timestamp: string;
  };
}
