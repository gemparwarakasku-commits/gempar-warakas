// ============================================================
// GEMPAR v2.1 — Utility: Format Tanggal Indonesia
// ============================================================

const BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
] as const;

const BULAN_SINGKAT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
] as const;

const HARI = [
  'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
] as const;

/**
 * Format tanggal lengkap: "Senin, 4 Juni 2026"
 */
export function formatDateLong(date: string | Date | null): string {
  if (!date) return '-';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '-';

  const hari = HARI[d.getDay()];
  const tanggal = d.getDate();
  const bulan = BULAN[d.getMonth()];
  const tahun = d.getFullYear();

  return `${hari}, ${tanggal} ${bulan} ${tahun}`;
}

/**
 * Format tanggal singkat: "4 Jun 2026"
 */
export function formatDateShort(date: string | Date | null): string {
  if (!date) return '-';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '-';

  const tanggal = d.getDate();
  const bulan = BULAN_SINGKAT[d.getMonth()];
  const tahun = d.getFullYear();

  return `${tanggal} ${bulan} ${tahun}`;
}

/**
 * Format tanggal numeric: "04/06/2026"
 */
export function formatDateNumeric(date: string | Date | null): string {
  if (!date) return '-';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '-';

  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
}

/**
 * Format waktu: "14:30"
 */
export function formatTime(date: string | Date | null): string {
  if (!date) return '-';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '-';

  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');

  return `${hh}:${mm}`;
}

/**
 * Format datetime lengkap: "Senin, 4 Juni 2026 · 14:30"
 */
export function formatDateTime(date: string | Date | null): string {
  if (!date) return '-';
  return `${formatDateLong(date)} · ${formatTime(date)}`;
}

/**
 * Format relative time: "2 jam yang lalu", "Kemarin", "Baru saja"
 */
export function formatRelativeTime(date: string | Date | null): string {
  if (!date) return '-';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '-';

  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'Baru saja';
  if (diffMin < 60) return `${diffMin} menit yang lalu`;
  if (diffHour < 24) return `${diffHour} jam yang lalu`;
  if (diffDay === 1) return 'Kemarin';
  if (diffDay < 7) return `${diffDay} hari yang lalu`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)} minggu yang lalu`;

  return formatDateShort(date);
}

/**
 * Format periode: "Juni 2026"
 */
export function formatPeriod(year: number, month: number): string {
  return `${BULAN[month - 1]} ${year}`;
}

/**
 * Format tanggal untuk input HTML: "2026-06-04"
 */
export function formatDateInput(date: string | Date | null): string {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
}
