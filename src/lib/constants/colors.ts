// ============================================================
// GEMPAR v2.1 — Color Tokens
// Soft Premium Green Design System
// Referensi: GEMPAR_FINAL_BLUEPRINT.md §11.2
// ============================================================

export const COLORS = {
  // ── Brand Colors ──
  primary: '#2E7D32',
  premium: '#1B5E20',
  soft: '#4CAF50',
  mint: '#E8F5E9',

  // ── Background ──
  background: '#FAFBFA',
  surface: '#FFFFFF',

  // ── Semantic ──
  danger: '#F44336',
  info: '#2196F3',
  warning: '#FFC107',
  success: '#4CAF50',

  // ── Neutral Scale ──
  neutral: {
    900: '#1A1A1A',
    600: '#666666',
    500: '#999999',
    400: '#CCCCCC',
    200: '#EEEEEE',
    100: '#F5F5F5',
  },
} as const;

// ── Tailwind-safe color map for dynamic classes ──
export const TAILWIND_COLORS: Record<string, string> = {
  primary: 'text-[#2E7D32]',
  'primary-bg': 'bg-[#2E7D32]',
  'primary-border': 'border-[#2E7D32]',
  premium: 'text-[#1B5E20]',
  'premium-bg': 'bg-[#1B5E20]',
  soft: 'text-[#4CAF50]',
  'soft-bg': 'bg-[#4CAF50]',
  mint: 'text-[#E8F5E9]',
  'mint-bg': 'bg-[#E8F5E9]',
  danger: 'text-[#F44336]',
  'danger-bg': 'bg-[#F44336]',
  info: 'text-[#2196F3]',
  'info-bg': 'bg-[#2196F3]',
  warning: 'text-[#FFC107]',
  'warning-bg': 'bg-[#FFC107]',
} as const;

// ── Gradient definitions ──
export const GRADIENTS = {
  primary: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
  premium: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
  soft: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
  mint: 'linear-gradient(135deg, #E8F5E9 0%, #FFFFFF 100%)',
} as const;

// ── Color by status ──
export const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  pending:     { bg: 'bg-[#FFF8E1]', text: 'text-[#F9A825]', border: 'border-[#F9A825]' },
  terverifikasi: { bg: 'bg-[#E8F5E9]', text: 'text-[#2E7D32]', border: 'border-[#2E7D32]' },
  ditolak:     { bg: 'bg-[#FFEBEE]', text: 'text-[#C62828]', border: 'border-[#C62828]' },
  aktif:       { bg: 'bg-[#E8F5E9]', text: 'text-[#2E7D32]', border: 'border-[#2E7D32]' },
  terklaim:    { bg: 'bg-[#E3F2FD]', text: 'text-[#1565C0]', border: 'border-[#1565C0]' },
  kadaluarsa:  { bg: 'bg-[#FFEBEE]', text: 'text-[#C62828]', border: 'border-[#C62828]' },
  unread:      { bg: 'bg-[#E8F5E9]', text: 'text-[#2E7D32]', border: 'border-[#2E7D32]' },
  read:        { bg: 'bg-[#F5F5F5]', text: 'text-[#999999]', border: 'border-[#CCCCCC]' },
} as const;
