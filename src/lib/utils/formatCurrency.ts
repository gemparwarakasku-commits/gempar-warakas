// ============================================================
// GEMPAR v2.1 — Utility: Format GEM + Rupiah
// ============================================================

/**
 * Format GEM dengan icon dan separator
 * @example formatGEM(1250) // => "1.250 GEM"
 */
export function formatGEM(amount: number): string {
  const absAmount = Math.abs(amount);
  const formatted = new Intl.NumberFormat('id-ID').format(absAmount);
  const sign = amount < 0 ? '-' : '';
  return `${sign}${formatted} GEM`;
}

/**
 * Format GEM compact untuk display kecil
 * @example formatGEMCompact(1250) // => "1,2K GEM"
 */
export function formatGEMCompact(amount: number): string {
  const absAmount = Math.abs(amount);
  if (absAmount >= 1_000_000) {
    return `${(absAmount / 1_000_000).toFixed(1)}M GEM`;
  }
  if (absAmount >= 1_000) {
    return `${(absAmount / 1_000).toFixed(1)}K GEM`;
  }
  return `${absAmount} GEM`;
}

/**
 * Format saldo GEM dengan styling indicator
 * @example formatSaldoGEM(1250, true) // => "+1.250 GEM"
 */
export function formatSaldoGEM(amount: number, showSign = false): string {
  const sign = showSign ? (amount > 0 ? '+' : amount < 0 ? '-' : '') : '';
  const absAmount = Math.abs(amount);
  const formatted = new Intl.NumberFormat('id-ID').format(absAmount);
  return `${sign}${formatted} GEM`;
}

/**
 * Format Rupiah
 * @example formatRupiah(50000) // => "Rp 50.000"
 */
export function formatRupiah(amount: number): string {
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  return formatted;
}

/**
 * Format Rupiah compact
 * @example formatRupiahCompact(50000) // => "Rp 50rb"
 */
export function formatRupiahCompact(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `Rp ${(amount / 1_000_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000_000) {
    return `Rp ${(amount / 1_000_000).toFixed(1)}jt`;
  }
  if (amount >= 1_000) {
    return `Rp ${(amount / 1_000).toFixed(0)}rb`;
  }
  return `Rp ${amount}`;
}

/**
 * Format angka dengan separator Indonesia
 * @example formatNumber(1250) // => "1.250"
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num);
}

/**
 * Format berat dalam kg
 * @example formatBerat(2.5) // => "2,5 kg"
 */
export function formatBerat(kg: number): string {
  return `${kg.toLocaleString('id-ID')} kg`;
}

/**
 * Format persentase
 * @example formatPercent(75.5) // => "75,5%"
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals).replace('.', ',')}%`;
}
