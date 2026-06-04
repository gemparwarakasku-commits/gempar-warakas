-- ============================================
-- GEMPAR Seed Data v2.1
-- ============================================

-- SEED: PETUGAS (2 orang)
-- Password: petugas123
INSERT INTO petugas (email, password_hash, nama, telepon, wilayah_id, pin_hash) VALUES
('petugas1@gempar.id', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiAYMyzJ/I1O', 'Ahmad Petugas', '081111111111', (SELECT id FROM wilayah WHERE kode = 'W001'), '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiAYMyzJ/I1O'),
('petugas2@gempar.id', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiAYMyzJ/I1O', 'Siti Petugas', '081222222222', (SELECT id FROM wilayah WHERE kode = 'W002'), '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiAYMyzJ/I1O');

-- SEED: ANGGOTA (5 orang)
-- Password: anggota123
INSERT INTO anggota (email, password_hash, nama, telepon, alamat, wilayah_id, level_anggota_id, total_gem, total_setoran, total_berat, streak_hari) VALUES
('budi@gempar.id', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiAYMyzJ/I1O', 'Budi Santoso', '081234567890', 'Jl. Mawar No. 1', (SELECT id FROM wilayah WHERE kode = 'W001'), (SELECT id FROM level_anggota WHERE urutan = 2), 750, 15, 45.5, 3),
('ani@gempar.id', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiAYMyzJ/I1O', 'Ani Wijaya', '081987654321', 'Jl. Melati No. 5', (SELECT id FROM wilayah WHERE kode = 'W001'), (SELECT id FROM level_anggota WHERE urutan = 1), 120, 5, 12.0, 1),
('cahyo@gempar.id', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiAYMyzJ/I1O', 'Cahyo Nugroho', '081333333333', 'Jl. Anggrek No. 10', (SELECT id FROM wilayah WHERE kode = 'W002'), (SELECT id FROM level_anggota WHERE urutan = 3), 2500, 60, 180.0, 7),
('dewi@gempar.id', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiAYMyzJ/I1O', 'Dewi Kusuma', '081444444444', 'Jl. Kenanga No. 3', (SELECT id FROM wilayah WHERE kode = 'W002'), (SELECT id FROM level_anggota WHERE urutan = 2), 600, 12, 35.0, 2),
('eko@gempar.id', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiAYMyzJ/I1O', 'Eko Prasetyo', '081555555555', 'Jl. Cempaka No. 7', (SELECT id FROM wilayah WHERE kode = 'W001'), (SELECT id FROM level_anggota WHERE urutan = 1), 50, 2, 5.0, 0);

-- SEED: MY_TEAM
INSERT INTO my_team (anggota_id, nomor_kk, nama_kk, jumlah_kk, jumlah_jiwa, jenis_sampah_id) VALUES
((SELECT id FROM anggota WHERE email = 'budi@gempar.id'), '3175010201010001', 'Budi Santoso', 1, 4, (SELECT id FROM jenis_sampah WHERE kode = 'PLS')),
((SELECT id FROM anggota WHERE email = 'budi@gempar.id'), '3175010201010002', 'Sri Wahyuni', 1, 3, (SELECT id FROM jenis_sampah WHERE kode = 'KRT')),
((SELECT id FROM anggota WHERE email = 'ani@gempar.id'), '3175010201020001', 'Ani Wijaya', 1, 5, (SELECT id FROM jenis_sampah WHERE kode = 'ORG')),
((SELECT id FROM anggota WHERE email = 'cahyo@gempar.id'), '3175010201030001', 'Cahyo Nugroho', 1, 6, (SELECT id FROM jenis_sampah WHERE kode = 'PLS'));

-- SEED: SETORAN
INSERT INTO setoran (anggota_id, petugas_id, jenis_sampah_id, berat, kualitas, gem_didapat, multiplier, bonus_gem, status, tanggal_setor) VALUES
((SELECT id FROM anggota WHERE email = 'budi@gempar.id'), (SELECT id FROM petugas WHERE email = 'petugas1@gempar.id'), (SELECT id FROM jenis_sampah WHERE kode = 'PLS'), 3.5, 4, 8, 1.20, 0, 'verifikasi', NOW() - INTERVAL '2 days'),
((SELECT id FROM anggota WHERE email = 'budi@gempar.id'), (SELECT id FROM petugas WHERE email = 'petugas1@gempar.id'), (SELECT id FROM jenis_sampah WHERE kode = 'KRT'), 2.0, 3, 3, 1.00, 0, 'verifikasi', NOW() - INTERVAL '5 days'),
((SELECT id FROM anggota WHERE email = 'ani@gempar.id'), (SELECT id FROM petugas WHERE email = 'petugas1@gempar.id'), (SELECT id FROM jenis_sampah WHERE kode = 'ORG'), 1.5, 5, 2, 1.50, 1, 'verifikasi', NOW() - INTERVAL '1 day'),
((SELECT id FROM anggota WHERE email = 'cahyo@gempar.id'), (SELECT id FROM petugas WHERE email = 'petugas2@gempar.id'), (SELECT id FROM jenis_sampah WHERE kode = 'LOG'), 5.0, 4, 18, 1.20, 0, 'verifikasi', NOW() - INTERVAL '3 days'),
((SELECT id FROM anggota WHERE email = 'cahyo@gempar.id'), (SELECT id FROM petugas WHERE email = 'petugas2@gempar.id'), (SELECT id FROM jenis_sampah WHERE kode = 'ELE'), 0.8, 5, 6, 1.50, 1, 'verifikasi', NOW() - INTERVAL '7 days'),
((SELECT id FROM anggota WHERE email = 'dewi@gempar.id'), (SELECT id FROM petugas WHERE email = 'petugas2@gempar.id'), (SELECT id FROM jenis_sampah WHERE kode = 'KCA'), 2.5, 3, 6, 1.00, 0, 'verifikasi', NOW() - INTERVAL '4 days'),
((SELECT id FROM anggota WHERE email = 'eko@gempar.id'), (SELECT id FROM petugas WHERE email = 'petugas1@gempar.id'), (SELECT id FROM jenis_sampah WHERE kode = 'PLS'), 1.0, 2, 1, 0.70, 0, 'verifikasi', NOW() - INTERVAL '10 days');

-- SEED: MUTASI_GEM
INSERT INTO mutasi_gem (anggota_id, tipe, jumlah, saldo_akhir, keterangan, referensi_tipe) VALUES
((SELECT id FROM anggota WHERE email = 'budi@gempar.id'), 'setoran', 8, 750, 'Setoran 3.5 kg Plastik', 'setoran'),
((SELECT id FROM anggota WHERE email = 'budi@gempar.id'), 'setoran', 3, 742, 'Setoran 2.0 kg Kertas', 'setoran'),
((SELECT id FROM anggota WHERE email = 'ani@gempar.id'), 'setoran', 3, 120, 'Setoran 1.5 kg Organik', 'setoran'),
((SELECT id FROM anggota WHERE email = 'cahyo@gempar.id'), 'setoran', 18, 2500, 'Setoran 5.0 kg Logam', 'setoran'),
((SELECT id FROM anggota WHERE email = 'cahyo@gempar.id'), 'setoran', 7, 2482, 'Setoran 0.8 kg Elektronik', 'setoran'),
((SELECT id FROM anggota WHERE email = 'dewi@gempar.id'), 'setoran', 6, 600, 'Setoran 2.5 kg Kaca', 'setoran'),
((SELECT id FROM anggota WHERE email = 'eko@gempar.id'), 'setoran', 1, 50, 'Setoran 1.0 kg Plastik', 'setoran');

-- SEED: REWARD
INSERT INTO reward (nama, deskripsi, harga_gem, stok, kategori, gambar_url, syarat_level_id, syarat_gem, periode_mulai, periode_selesai) VALUES
('Voucher GoPay 10K', 'Voucher GoPay Rp 10.000', 100, 50, 'voucher', 'reward_gopay_10k.jpg', (SELECT id FROM level_anggota WHERE urutan = 1), 0, '2026-01-01', '2026-12-31'),
('Voucher GoPay 25K', 'Voucher GoPay Rp 25.000', 250, 30, 'voucher', 'reward_gopay_25k.jpg', (SELECT id FROM level_anggota WHERE urutan = 2), 0, '2026-01-01', '2026-12-31'),
('Tote Bag GEMPAR', 'Tote bag ramah lingkungan', 500, 20, 'fisik', 'reward_totebag.jpg', (SELECT id FROM level_anggota WHERE urutan = 2), 0, '2026-01-01', '2026-12-31'),
('Tumbler Stainless', 'Tumbler stainless 500ml', 1000, 15, 'fisik', 'reward_tumbler.jpg', (SELECT id FROM level_anggota WHERE urutan = 3), 0, '2026-01-01', '2026-12-31'),
('Voucher Grab 50K', 'Voucher Grab Rp 50.000', 750, 10, 'voucher', 'reward_grab_50k.jpg', (SELECT id FROM level_anggota WHERE urutan = 3), 0, '2026-01-01', '2026-12-31'),
('Kaos GEMPAR', 'Kaos cotton combed', 1500, 10, 'fisik', 'reward_kaos.jpg', (SELECT id FROM level_anggota WHERE urutan = 4), 0, '2026-01-01', '2026-12-31'),
('Voucher Pulsa 100K', 'Voucher pulsa all operator', 1200, 20, 'digital', 'reward_pulsa_100k.jpg', (SELECT id FROM level_anggota WHERE urutan = 4), 0, '2026-01-01', '2026-12-31'),
('Sepeda Lipat', 'Sepeda lipat ramah lingkungan', 5000, 2, 'fisik', 'reward_sepeda.jpg', (SELECT id FROM level_anggota WHERE urutan = 5), 0, '2026-01-01', '2026-12-31');

-- SEED: ANGGOTA_BADGE
INSERT INTO anggota_badge (anggota_id, badge_id) VALUES
((SELECT id FROM anggota WHERE email = 'budi@gempar.id'), (SELECT id FROM badge WHERE nama = 'Setor Pertama')),
((SELECT id FROM anggota WHERE email = 'budi@gempar.id'), (SELECT id FROM badge WHERE nama = 'Rajin Menyetor')),
((SELECT id FROM anggota WHERE email = 'cahyo@gempar.id'), (SELECT id FROM badge WHERE nama = 'Setor Pertama')),
((SELECT id FROM anggota WHERE email = 'cahyo@gempar.id'), (SELECT id FROM badge WHERE nama = 'Rajin Menyetor')),
((SELECT id FROM anggota WHERE email = 'cahyo@gempar.id'), (SELECT id FROM badge WHERE nama = 'Pahlawan Plastik')),
((SELECT id FROM anggota WHERE email = 'cahyo@gempar.id'), (SELECT id FROM badge WHERE nama = 'Naik Level'));

-- SEED: NOTIFIKASI
INSERT INTO notifikasi (user_id, user_tipe, judul, pesan, tipe, dibaca) VALUES
((SELECT id FROM anggota WHERE email = 'budi@gempar.id'), 'anggota', 'Setoran Berhasil!', 'Anda mendapat 8 GEM dari setoran plastik 3.5 kg', 'setoran', FALSE),
((SELECT id FROM anggota WHERE email = 'budi@gempar.id'), 'anggota', 'Badge Baru!', 'Selamat! Anda mendapat badge Rajin Menyetor', 'badge', FALSE),
((SELECT id FROM anggota WHERE email = 'ani@gempar.id'), 'anggota', 'Setoran Berhasil!', 'Anda mendapat 3 GEM dari setoran organik 1.5 kg', 'setoran', FALSE),
((SELECT id FROM anggota WHERE email = 'cahyo@gempar.id'), 'anggota', 'Naik Level!', 'Selamat! Anda naik ke level Pahlawan Lingkungan', 'level', FALSE),
((SELECT id FROM petugas WHERE email = 'petugas1@gempar.id'), 'petugas', 'Setoran Baru', 'Budi Santoso menyetor 3.5 kg plastik', 'setoran', FALSE);

-- SEED: KUPON
INSERT INTO kupon (anggota_id, reward_id, kode, status, tanggal_tukar, tanggal_kadaluarsa) VALUES
((SELECT id FROM anggota WHERE email = 'budi@gempar.id'), (SELECT id FROM reward WHERE nama = 'Voucher GoPay 10K'), 'GEMPAR001ABC', 'aktif', NOW(), NOW() + INTERVAL '30 days'),
((SELECT id FROM anggota WHERE email = 'cahyo@gempar.id'), (SELECT id FROM reward WHERE nama = 'Tote Bag GEMPAR'), 'GEMPAR002DEF', 'aktif', NOW() - INTERVAL '5 days', NOW() + INTERVAL '25 days');
