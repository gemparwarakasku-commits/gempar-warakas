-- ============================================
-- GEMPAR Database Functions & Triggers v2.1
-- ============================================

-- FUNCTION 1: Hitung GEM dari Setoran
CREATE OR REPLACE FUNCTION hitung_gem_setoran(
  p_berat DECIMAL,
  p_kualitas INTEGER,
  p_konversi_gem DECIMAL
)
RETURNS INTEGER AS $$
DECLARE
  v_base_gem INTEGER;
  v_multiplier DECIMAL(3,2);
  v_total_gem INTEGER;
BEGIN
  v_base_gem := FLOOR(p_berat * p_konversi_gem);
  
  v_multiplier := CASE p_kualitas
    WHEN 1 THEN 0.50
    WHEN 2 THEN 0.70
    WHEN 3 THEN 1.00
    WHEN 4 THEN 1.20
    WHEN 5 THEN 1.50
    ELSE 1.00
  END;
  
  v_total_gem := FLOOR(v_base_gem * v_multiplier);
  
  IF v_total_gem < 1 THEN
    v_total_gem := 1;
  END IF;
  
  RETURN v_total_gem;
END;
$$ LANGUAGE plpgsql;

-- FUNCTION 2: Update Statistik Anggota
CREATE OR REPLACE FUNCTION update_statistik_anggota(
  p_anggota_id UUID
)
RETURNS VOID AS $$
BEGIN
  UPDATE anggota
  SET
    total_gem = (
      SELECT COALESCE(SUM(jumlah), 0) 
      FROM mutasi_gem 
      WHERE anggota_id = p_anggota_id
    ),
    total_setoran = (
      SELECT COUNT(*) 
      FROM setoran 
      WHERE anggota_id = p_anggota_id 
      AND status = 'verifikasi'
    ),
    total_berat = (
      SELECT COALESCE(SUM(berat), 0) 
      FROM setoran 
      WHERE anggota_id = p_anggota_id 
      AND status = 'verifikasi'
    ),
    updated_at = NOW()
  WHERE id = p_anggota_id;
END;
$$ LANGUAGE plpgsql;

-- FUNCTION 3: Cek dan Update Level Anggota
CREATE OR REPLACE FUNCTION cek_level_anggota(
  p_anggota_id UUID
)
RETURNS TABLE(
  naik_level BOOLEAN,
  level_baru UUID,
  nama_level VARCHAR
) AS $$
DECLARE
  v_anggota RECORD;
  v_level_baru RECORD;
BEGIN
  SELECT * INTO v_anggota FROM anggota WHERE id = p_anggota_id;
  
  SELECT * INTO v_level_baru
  FROM level_anggota
  WHERE min_gem <= v_anggota.total_gem
    AND min_setoran <= v_anggota.total_setoran
    AND status = 'aktif'
  ORDER BY urutan DESC
  LIMIT 1;
  
  IF v_level_baru IS NOT NULL AND v_level_baru.id != v_anggota.level_anggota_id THEN
    UPDATE anggota
    SET level_anggota_id = v_level_baru.id,
        updated_at = NOW()
    WHERE id = p_anggota_id;
    
    naik_level := TRUE;
    level_baru := v_level_baru.id;
    nama_level := v_level_baru.nama;
  ELSE
    naik_level := FALSE;
    level_baru := NULL;
    nama_level := NULL;
  END IF;
  
  RETURN NEXT;
END;
$$ LANGUAGE plpgsql;

-- FUNCTION 4: Cek Badge yang Didapat
CREATE OR REPLACE FUNCTION cek_badge_anggota(
  p_anggota_id UUID
)
RETURNS TABLE(
  badge_id UUID,
  badge_nama VARCHAR
) AS $$
BEGIN
  RETURN QUERY
  SELECT b.id, b.nama
  FROM badge b
  WHERE b.kriteria->>'min_setoran' IS NOT NULL
    AND NOT EXISTS (
      SELECT 1 FROM anggota_badge ab 
      WHERE ab.anggota_id = p_anggota_id AND ab.badge_id = b.id
    )
    AND (
      SELECT COUNT(*) FROM setoran 
      WHERE anggota_id = p_anggota_id AND status = 'verifikasi'
    ) >= (b.kriteria->>'min_setoran')::INTEGER;
  
  RETURN QUERY
  SELECT b.id, b.nama
  FROM badge b
  WHERE b.kriteria->>'jenis_sampah' IS NOT NULL
    AND NOT EXISTS (
      SELECT 1 FROM anggota_badge ab 
      WHERE ab.anggota_id = p_anggota_id AND ab.badge_id = b.id
    )
    AND (
      SELECT COALESCE(SUM(berat), 0) FROM setoran s
      JOIN jenis_sampah js ON s.jenis_sampah_id = js.id
      WHERE s.anggota_id = p_anggota_id 
        AND s.status = 'verifikasi'
        AND js.kode = b.kriteria->>'jenis_sampah'
    ) >= (b.kriteria->>'min_berat')::DECIMAL;
END;
$$ LANGUAGE plpgsql;

-- FUNCTION 5: Generate Kode Kupon
CREATE OR REPLACE FUNCTION generate_kupon_kode()
RETURNS VARCHAR(20) AS $$
DECLARE
  v_kode VARCHAR(20);
  v_exists BOOLEAN;
BEGIN
  LOOP
    v_kode := UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 12));
    SELECT EXISTS(SELECT 1 FROM kupon WHERE kode = v_kode) INTO v_exists;
    EXIT WHEN NOT v_exists;
  END LOOP;
  
  RETURN v_kode;
END;
$$ LANGUAGE plpgsql;

-- FUNCTION 6: Auto Hitung GEM (Trigger Function)
CREATE OR REPLACE FUNCTION auto_hitung_gem()
RETURNS TRIGGER AS $$
DECLARE
  v_konversi DECIMAL;
BEGIN
  SELECT konversi_gem_per_kg INTO v_konversi
  FROM jenis_sampah
  WHERE id = NEW.jenis_sampah_id;
  
  NEW.gem_didapat := hitung_gem_setoran(NEW.berat, NEW.kualitas, v_konversi);
  NEW.multiplier := CASE NEW.kualitas
    WHEN 1 THEN 0.50
    WHEN 2 THEN 0.70
    WHEN 3 THEN 1.00
    WHEN 4 THEN 1.20
    WHEN 5 THEN 1.50
    ELSE 1.00
  END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER 1: Auto Hitung GEM
CREATE TRIGGER trg_setoran_hitung_gem
  BEFORE INSERT ON setoran
  FOR EACH ROW
  EXECUTE FUNCTION auto_hitung_gem();

-- FUNCTION 7: Auto Update Statistik (Trigger Function)
CREATE OR REPLACE FUNCTION trigger_update_statistik()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO mutasi_gem (anggota_id, tipe, jumlah, saldo_akhir, keterangan, referensi_id, referensi_tipe)
  VALUES (
    NEW.anggota_id,
    'setoran',
    NEW.gem_didapat + NEW.bonus_gem,
    (SELECT total_gem + NEW.gem_didapat + NEW.bonus_gem FROM anggota WHERE id = NEW.anggota_id),
    'Setoran ' || NEW.berat || ' kg',
    NEW.id,
    'setoran'
  );
  
  PERFORM update_statistik_anggota(NEW.anggota_id);
  PERFORM cek_level_anggota(NEW.anggota_id);
  PERFORM cek_badge_anggota(NEW.anggota_id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER 2: Auto Update Statistik
CREATE TRIGGER trg_setoran_update_statistik
  AFTER INSERT ON setoran
  FOR EACH ROW
  WHEN (NEW.status = 'verifikasi')
  EXECUTE FUNCTION trigger_update_statistik();

-- FUNCTION 8: Update Stok Reward
CREATE OR REPLACE FUNCTION update_stok_reward()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE reward
  SET stok = stok - 1,
      total_penukaran = total_penukaran + 1,
      updated_at = NOW()
  WHERE id = NEW.reward_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER 3: Auto Update Stok
CREATE TRIGGER trg_kupon_update_stok
  AFTER INSERT ON kupon
  FOR EACH ROW
  EXECUTE FUNCTION update_stok_reward();

-- FUNCTION 9: Update Badge Count
CREATE OR REPLACE FUNCTION update_badge_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE badge
  SET total_penerima = total_penerima + 1
  WHERE id = NEW.badge_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER 4: Auto Count Badge
CREATE TRIGGER trg_anggota_badge_count
  AFTER INSERT ON anggota_badge
  FOR EACH ROW
  EXECUTE FUNCTION update_badge_count();

-- FUNCTION 10: Update Wilayah Count
CREATE OR REPLACE FUNCTION update_wilayah_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE wilayah
  SET total_anggota = (
    SELECT COUNT(*) FROM anggota 
    WHERE wilayah_id = NEW.wilayah_id AND status = 'aktif'
  )
  WHERE id = NEW.wilayah_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER 5: Auto Count Wilayah
CREATE TRIGGER trg_anggota_wilayah_count
  AFTER INSERT ON anggota
  FOR EACH ROW
  WHEN (NEW.wilayah_id IS NOT NULL)
  EXECUTE FUNCTION update_wilayah_count();
