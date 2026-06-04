-- ============================================
-- GEMPAR Database Schema v2.1
-- 001_initial_schema.sql
-- Single Source of Truth
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. WILAYAH
-- ============================================
CREATE TABLE wilayah (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kode VARCHAR(10) NOT NULL UNIQUE,
  nama VARCHAR(100) NOT NULL,
  provinsi VARCHAR(50),
  kabupaten VARCHAR(50),
  kecamatan VARCHAR(50),
  desa VARCHAR(50),
  total_anggota INTEGER DEFAULT 0,
  total_petugas INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. JENIS_SAMPAH
-- ============================================
CREATE TABLE jenis_sampah (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kode VARCHAR(10) NOT NULL UNIQUE,
  nama VARCHAR(50) NOT NULL,
  kategori VARCHAR(20) NOT NULL CHECK (kategori IN ('organik', 'anorganik', 'B3', 'lainnya')),
  konversi_gem_per_kg DECIMAL(10,2) NOT NULL DEFAULT 1.00,
  deskripsi TEXT,
  icon_url TEXT,
  status VARCHAR(10) DEFAULT 'aktif' CHECK (status IN ('aktif', 'nonaktif')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. LEVEL_ANGGOTA
-- ============================================
CREATE TABLE level_anggota (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  urutan INTEGER NOT NULL UNIQUE,
  nama VARCHAR(50) NOT NULL,
  min_gem INTEGER NOT NULL DEFAULT 0,
  min_setoran INTEGER NOT NULL DEFAULT 0,
  warna VARCHAR(7) DEFAULT '#2E7D32',
  icon_url TEXT,
  deskripsi TEXT,
  benefit TEXT,
  status VARCHAR(10) DEFAULT 'aktif' CHECK (status IN ('aktif', 'nonaktif')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. BADGE
-- ============================================
CREATE TABLE badge (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nama VARCHAR(50) NOT NULL,
  deskripsi TEXT,
  icon_url TEXT,
  kriteria JSONB NOT NULL,
  tipe VARCHAR(20) NOT NULL CHECK (tipe IN ('setoran', 'level', 'event', 'streak')),
  total_penerima INTEGER DEFAULT 0,
  status VARCHAR(10) DEFAULT 'aktif' CHECK (status IN ('aktif', 'nonaktif')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. SYSTEM_SETTING
-- ============================================
CREATE TABLE system_setting (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  konversi_default DECIMAL(10,2) NOT NULL DEFAULT 1.00,
  batas_harian_setoran DECIMAL(10,2) DEFAULT 50.00,
  minimal_berat_setoran DECIMAL(10,2) DEFAULT 0.50,
  quote_motivasi TEXT[],
  maintenance_mode BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. ANGGOTA (Users)
-- ============================================
CREATE TABLE anggota (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  nama VARCHAR(100) NOT NULL,
  telepon VARCHAR(20),
  alamat TEXT,
  foto_profil_url TEXT,
  level_anggota_id UUID REFERENCES level_anggota(id) ON DELETE SET NULL,
  wilayah_id UUID REFERENCES wilayah(id) ON DELETE SET NULL,
  total_gem INTEGER DEFAULT 0,
  total_setoran INTEGER DEFAULT 0,
  total_berat DECIMAL(10,2) DEFAULT 0,
  streak_hari INTEGER DEFAULT 0,
  streak_terpanjang INTEGER DEFAULT 0,
  tanggal_bergabung DATE DEFAULT CURRENT_DATE,
  status VARCHAR(10) DEFAULT 'aktif' CHECK (status IN ('aktif', 'nonaktif', 'dihapus')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 7. PETUGAS
-- ============================================
CREATE TABLE petugas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  nama VARCHAR(100) NOT NULL,
  telepon VARCHAR(20),
  foto_profil_url TEXT,
  wilayah_id UUID REFERENCES wilayah(id) ON DELETE SET NULL,
  pin_hash VARCHAR(255),
  total_setoran_verifikasi INTEGER DEFAULT 0,
  total_anggota_dilayani INTEGER DEFAULT 0,
  status VARCHAR(10) DEFAULT 'aktif' CHECK (status IN ('aktif', 'nonaktif')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 8. ADMIN (OCC)
-- ============================================
CREATE TABLE admin (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  nama VARCHAR(100) NOT NULL,
  telepon VARCHAR(20),
  foto_profil_url TEXT,
  role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'superadmin')),
  status VARCHAR(10) DEFAULT 'aktif' CHECK (status IN ('aktif', 'nonaktif')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 9. MY_TEAM (Anggota Keluarga)
-- ============================================
CREATE TABLE my_team (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  anggota_id UUID NOT NULL REFERENCES anggota(id) ON DELETE CASCADE,
  nomor_kk VARCHAR(20) NOT NULL,
  nama_kk VARCHAR(100) NOT NULL,
  jumlah_kk INTEGER DEFAULT 1,
  jumlah_jiwa INTEGER DEFAULT 1,
  jenis_sampah_id UUID REFERENCES jenis_sampah(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(anggota_id, nomor_kk)
);

-- ============================================
-- 10. SETORAN
-- ============================================
CREATE TABLE setoran (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  anggota_id UUID NOT NULL REFERENCES anggota(id) ON DELETE CASCADE,
  petugas_id UUID REFERENCES petugas(id) ON DELETE SET NULL,
  jenis_sampah_id UUID NOT NULL REFERENCES jenis_sampah(id) ON DELETE RESTRICT,
  berat DECIMAL(10,2) NOT NULL CHECK (berat >= 0.5),
  kualitas INTEGER NOT NULL CHECK (kualitas BETWEEN 1 AND 5),
  gem_didapat INTEGER NOT NULL DEFAULT 0,
  multiplier DECIMAL(3,2) DEFAULT 1.00,
  bonus_gem INTEGER DEFAULT 0,
  foto_bukti_url TEXT,
  catatan TEXT,
  lokasi JSONB,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'verifikasi', 'ditolak', 'dibatalkan')),
  tanggal_setor TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tanggal_verifikasi TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 11. MUTASI_GEM
-- ============================================
CREATE TABLE mutasi_gem (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  anggota_id UUID NOT NULL REFERENCES anggota(id) ON DELETE CASCADE,
  tipe VARCHAR(10) NOT NULL CHECK (tipe IN ('setoran', 'tukar', 'koreksi', 'bonus', 'refund')),
  jumlah INTEGER NOT NULL,
  saldo_akhir INTEGER NOT NULL,
  keterangan TEXT,
  referensi_id UUID,
  referensi_tipe VARCHAR(20),
  admin_id UUID REFERENCES admin(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 12. REWARD
-- ============================================
CREATE TABLE reward (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nama VARCHAR(100) NOT NULL,
  deskripsi TEXT,
  harga_gem INTEGER NOT NULL CHECK (harga_gem > 0),
  stok INTEGER NOT NULL DEFAULT 0,
  kategori VARCHAR(20) NOT NULL CHECK (kategori IN ('digital', 'fisik', 'voucher')),
  gambar_url TEXT,
  syarat_level_id UUID REFERENCES level_anggota(id) ON DELETE SET NULL,
  syarat_gem INTEGER DEFAULT 0,
  periode_mulai DATE,
  periode_selesai DATE,
  total_penukaran INTEGER DEFAULT 0,
  status VARCHAR(10) DEFAULT 'aktif' CHECK (status IN ('aktif', 'nonaktif', 'habis')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 13. KUPON
-- ============================================
CREATE TABLE kupon (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  anggota_id UUID NOT NULL REFERENCES anggota(id) ON DELETE CASCADE,
  reward_id UUID NOT NULL REFERENCES reward(id) ON DELETE RESTRICT,
  kode VARCHAR(20) NOT NULL UNIQUE,
  status VARCHAR(10) DEFAULT 'aktif' CHECK (status IN ('aktif', 'terklaim', 'kadaluarsa', 'dibatalkan')),
  tanggal_tukar TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tanggal_kadaluarsa TIMESTAMP WITH TIME ZONE,
  tanggal_klaim TIMESTAMP WITH TIME ZONE,
  petugas_klaim_id UUID REFERENCES petugas(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 14. ANGGOTA_BADGE
-- ============================================
CREATE TABLE anggota_badge (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  anggota_id UUID NOT NULL REFERENCES anggota(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badge(id) ON DELETE CASCADE,
  tanggal_diperoleh TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(anggota_id, badge_id)
);

-- ============================================
-- 15. NOTIFIKASI
-- ============================================
CREATE TABLE notifikasi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  user_tipe VARCHAR(10) NOT NULL CHECK (user_tipe IN ('anggota', 'petugas', 'admin')),
  judul VARCHAR(100) NOT NULL,
  pesan TEXT NOT NULL,
  tipe VARCHAR(20) NOT NULL CHECK (tipe IN ('setoran', 'reward', 'badge', 'level', 'system', 'team')),
  dibaca BOOLEAN DEFAULT FALSE,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 16. AUDIT_LOG
-- ============================================
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  user_tipe VARCHAR(10) CHECK (user_tipe IN ('anggota', 'petugas', 'admin')),
  aksi VARCHAR(50) NOT NULL,
  entitas VARCHAR(50) NOT NULL,
  entitas_id UUID,
  detail JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_anggota_email ON anggota(email);
CREATE INDEX idx_anggota_wilayah ON anggota(wilayah_id);
CREATE INDEX idx_anggota_level ON anggota(level_anggota_id);
CREATE INDEX idx_petugas_email ON petugas(email);
CREATE INDEX idx_petugas_wilayah ON petugas(wilayah_id);
CREATE INDEX idx_setoran_anggota ON setoran(anggota_id);
CREATE INDEX idx_setoran_petugas ON setoran(petugas_id);
CREATE INDEX idx_setoran_tanggal ON setoran(tanggal_setor);
CREATE INDEX idx_setoran_status ON setoran(status);
CREATE INDEX idx_mutasi_anggota ON mutasi_gem(anggota_id);
CREATE INDEX idx_mutasi_tipe ON mutasi_gem(tipe);
CREATE INDEX idx_kupon_anggota ON kupon(anggota_id);
CREATE INDEX idx_kupon_status ON kupon(status);
CREATE INDEX idx_kupon_kode ON kupon(kode);
CREATE INDEX idx_notifikasi_user ON notifikasi(user_id, user_tipe);
CREATE INDEX idx_notifikasi_dibaca ON notifikasi(dibaca);
CREATE INDEX idx_audit_user ON audit_log(user_id, user_tipe);
CREATE INDEX idx_audit_created ON audit_log(created_at);
CREATE INDEX idx_my_team_anggota ON my_team(anggota_id);
CREATE INDEX idx_wilayah_kode ON wilayah(kode);
CREATE INDEX idx_jenis_sampah_kode ON jenis_sampah(kode);
CREATE INDEX idx_reward_status ON reward(status);
CREATE INDEX idx_badge_tipe ON badge(tipe);

-- ============================================
-- ROW LEVEL SECURITY (RLS) - ENABLE
-- ============================================
ALTER TABLE anggota ENABLE ROW LEVEL SECURITY;
ALTER TABLE petugas ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE setoran ENABLE ROW LEVEL SECURITY;
ALTER TABLE mutasi_gem ENABLE ROW LEVEL SECURITY;
ALTER TABLE kupon ENABLE ROW LEVEL SECURITY;
ALTER TABLE my_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifikasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES - ANGGOTA
-- ============================================
CREATE POLICY "anggota_select_own" ON anggota
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "anggota_update_own" ON anggota
  FOR UPDATE USING (auth.uid() = id);

-- ============================================
-- RLS POLICIES - SETORAN
-- ============================================
CREATE POLICY "setoran_select_own" ON setoran
  FOR SELECT USING (auth.uid() = anggota_id);

CREATE POLICY "setoran_insert_petugas" ON setoran
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM petugas WHERE id = auth.uid())
  );

-- ============================================
-- RLS POLICIES - MUTASI_GEM
-- ============================================
CREATE POLICY "mutasi_select_own" ON mutasi_gem
  FOR SELECT USING (auth.uid() = anggota_id);

-- ============================================
-- RLS POLICIES - KUPON
-- ============================================
CREATE POLICY "kupon_select_own" ON kupon
  FOR SELECT USING (auth.uid() = anggota_id);

-- ============================================
-- RLS POLICIES - MY_TEAM
-- ============================================
CREATE POLICY "my_team_select_own" ON my_team
  FOR SELECT USING (auth.uid() = anggota_id);

CREATE POLICY "my_team_insert_own" ON my_team
  FOR INSERT WITH CHECK (auth.uid() = anggota_id);

CREATE POLICY "my_team_update_own" ON my_team
  FOR UPDATE USING (auth.uid() = anggota_id);

CREATE POLICY "my_team_delete_own" ON my_team
  FOR DELETE USING (auth.uid() = anggota_id);

-- ============================================
-- RLS POLICIES - NOTIFIKASI
-- ============================================
CREATE POLICY "notifikasi_select_own" ON notifikasi
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- SEED DATA - LEVEL ANGGOTA
-- ============================================
INSERT INTO level_anggota (urutan, nama, min_gem, min_setoran, warna, deskripsi, benefit) VALUES
(1, 'Pemula Hijau', 0, 0, '#4CAF50', 'Level awal untuk anggota baru', 'Akses dasar reward'),
(2, 'Penjaga Bumi', 500, 10, '#2E7D32', 'Aktif menyetor 10 kali', 'Diskon 5% reward'),
(3, 'Pahlawan Lingkungan', 2000, 50, '#1B5E20', 'Setor 50 kali, 2000 GEM', 'Diskon 10% reward + badge khusus'),
(4, 'Sahabat Bumi', 5000, 100, '#0D47A1', 'Setor 100 kali, 5000 GEM', 'Diskon 15% reward + prioritas reward'),
(5, 'Legenda Hijau', 10000, 200, '#FFD700', 'Setor 200 kali, 10000 GEM', 'Diskon 20% reward + akses reward eksklusif');

-- ============================================
-- SEED DATA - JENIS SAMPAH
-- ============================================
INSERT INTO jenis_sampah (kode, nama, kategori, konversi_gem_per_kg, deskripsi) VALUES
('PLS', 'Plastik', 'anorganik', 2.00, 'Sampah plastik: botol, kantong, kemasan'),
('KRT', 'Kertas', 'anorganik', 1.50, 'Sampah kertas: koran, kardus, kertas bekas'),
('LOG', 'Logam', 'anorganik', 3.00, 'Sampah logam: kaleng, aluminium, besi'),
('KCA', 'Kaca', 'anorganik', 2.50, 'Sampah kaca: botol kaca, pecahan kaca'),
('ORG', 'Organik', 'organik', 1.00, 'Sampah organik: sisa makanan, daun'),
('ELE', 'Elektronik', 'B3', 5.00, 'Sampah elektronik: baterai, charger, gadget'),
('BAT', 'Baterai', 'B3', 4.00, 'Sampah baterai: AA, AAA, baterai HP'),
('LAIN', 'Lainnya', 'lainnya', 1.00, 'Jenis sampah lainnya');

-- ============================================
-- SEED DATA - SYSTEM SETTING
-- ============================================
INSERT INTO system_setting (konversi_default, batas_harian_setoran, minimal_berat_setoran, quote_motivasi) VALUES
(1.00, 50.00, 0.50, ARRAY[
  'Setiap sampah terpilah adalah langkah menyelamatkan bumi.',
  'Hari ini kita pilah, esok generasi mendatang bersyukur.',
  'Tidak ada yang terlalu kecil untuk membuat perbedaan.',
  'Bumi tidak butuh kita, tapi kita butuh bumi.',
  'Pilah sampahmu, lindungi masa depanmu.'
]);

-- ============================================
-- SEED DATA - WILAYAH (Contoh)
-- ============================================
INSERT INTO wilayah (kode, nama, provinsi, kabupaten, kecamatan, desa) VALUES
('W001', 'Kelurahan Green Village', 'Jawa Barat', 'Bandung', 'Cibeunying', 'Sukajadi'),
('W002', 'Kelurahan Eco Park', 'Jawa Barat', 'Bandung', 'Cibeunying', 'Cicadas');

-- ============================================
-- SEED DATA - BADGE (Contoh)
-- ============================================
INSERT INTO badge (nama, deskripsi, icon_url, kriteria, tipe) VALUES
('Setor Pertama', 'Melakukan setoran sampah pertama kali', 'badge_first.svg', '{"min_setoran": 1}', 'setoran'),
('Rajin Menyetor', 'Menyetor 10 kali dalam sebulan', 'badge_streak.svg', '{"min_setoran": 10, "periode_hari": 30}', 'streak'),
('Pahlawan Plastik', 'Menyetor plastik sebanyak 50 kg', 'badge_plastic.svg', '{"jenis_sampah": "PLS", "min_berat": 50}', 'setoran'),
('Naik Level', 'Mencapai level Penjaga Bumi', 'badge_level.svg', '{"target_level": 2}', 'level'),
('Event Spesial', 'Berpartisipasi dalam event lingkungan', 'badge_event.svg', '{"event_id": "event_001"}', 'event');

-- ============================================
-- SEED DATA - ADMIN (Default)
-- ============================================
-- Password: admin123 (bcrypt hash)
INSERT INTO admin (email, password_hash, nama, role) VALUES
('admin@gempar.id', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiAYMyzJ/I1O', 'Admin GEMPAR', 'superadmin');

-- ============================================
-- FUNCTION: Update timestamp
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- TRIGGERS: Auto update updated_at
-- ============================================
CREATE TRIGGER update_wilayah_updated_at BEFORE UPDATE ON wilayah
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jenis_sampah_updated_at BEFORE UPDATE ON jenis_sampah
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_anggota_updated_at BEFORE UPDATE ON anggota
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_petugas_updated_at BEFORE UPDATE ON petugas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_updated_at BEFORE UPDATE ON admin
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_my_team_updated_at BEFORE UPDATE ON my_team
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_setoran_updated_at BEFORE UPDATE ON setoran
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reward_updated_at BEFORE UPDATE ON reward
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_setting_updated_at BEFORE UPDATE ON system_setting
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- COMPLETE
-- ============================================
