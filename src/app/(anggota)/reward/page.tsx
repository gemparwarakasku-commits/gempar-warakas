'use client';

// ============================================================
// GEMPAR v2.1 — Reward Marketplace
// Route: /reward
// Referensi: GEMPAR_FINAL_BLUEPRINT.md §12.3
// ============================================================

import { useState } from 'react';
import { GEMPHeader } from '@/components/ui/GEMPHeader';
import { GEMPCard } from '@/components/ui/GEMPCard';
import { GEMPBadge } from '@/components/ui/GEMPBadge';
import { GEMPButton } from '@/components/ui/GEMPButton';
import { formatGEM } from '@/lib/utils/formatCurrency';

type RewardCategory = 'semua' | 'digital' | 'fisik' | 'voucher';
type RewardSort = 'popular' | 'termurah' | 'termahal' | 'terbaru';

interface RewardItem {
  id: string;
  nama: string;
  harga_gem: number;
  stok: number;
  kategori: RewardCategory;
  gambar_url?: string | null;
  syarat_level?: string;
}

const MOCK_REWARDS: RewardItem[] = [
  { id: '1', nama: 'Voucher Diskon 10%', harga_gem: 100, stok: 50, kategori: 'voucher' },
  { id: '2', nama: 'Tote Bag Eco', harga_gem: 500, stok: 20, kategori: 'fisik' },
  { id: '3', nama: 'E-Book Zero Waste', harga_gem: 200, stok: 999, kategori: 'digital' },
  { id: '4', nama: 'Tumbler Stainless', harga_gem: 750, stok: 15, kategori: 'fisik' },
  { id: '5', nama: 'Voucher Ojek Online', harga_gem: 300, stok: 30, kategori: 'voucher' },
  { id: '6', nama: 'Sticker Pack', harga_gem: 150, stok: 100, kategori: 'fisik' },
];

const CATEGORIES: { key: RewardCategory; label: string }[] = [
  { key: 'semua', label: 'Semua' },
  { key: 'digital', label: 'Digital' },
  { key: 'fisik', label: 'Fisik' },
  { key: 'voucher', label: 'Voucher' },
];

export default function RewardPage() {
  const [activeCategory, setActiveCategory] = useState<RewardCategory>('semua');
  const [sortBy, setSortBy] = useState<RewardSort>('popular');
  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null);

  const filtered = MOCK_REWARDS.filter(
    (r) => activeCategory === 'semua' || r.kategori === activeCategory
  );

  return (
    <div className="min-h-screen bg-[#FAFBFA]">
      <GEMPHeader
        title="Reward"
        action={{
          label: 'Filter',
          icon: <FilterIcon />,
          onClick: () => {},
        }}
      />

      {/* Saldo */}
      <div className="px-4 py-3 bg-white shadow-sm">
        <p className="text-xs text-[#999999]">Saldo GEM Anda</p>
        <p className="text-xl font-bold text-[#2E7D32]">{formatGEM(1250)}</p>
      </div>

      {/* Filter tabs */}
      <div className="px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.key
                  ? 'bg-[#2E7D32] text-white'
                  : 'bg-white text-[#666666] border border-[#EEEEEE]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="px-4 pb-2 flex items-center justify-between">
        <p className="text-xs text-[#999999]">{filtered.length} reward tersedia</p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as RewardSort)}
          className="text-xs text-[#666666] bg-transparent border-none outline-none"
        >
          <option value="popular">Populer</option>
          <option value="termurah">Termurah</option>
          <option value="termahal">Termahal</option>
          <option value="terbaru">Terbaru</option>
        </select>
      </div>

      {/* Grid */}
      <div className="px-4 pb-6">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((reward) => (
              <button
                key={reward.id}
                onClick={() => setSelectedReward(reward)}
                className="bg-white rounded-2xl shadow-sm overflow-hidden text-left active:scale-[0.98] transition-transform"
              >
                {/* Image */}
                <div className="w-full h-[120px] bg-[#F5F5F5] flex items-center justify-center">
                  {reward.gambar_url ? (
                    <img src={reward.gambar_url} alt={reward.nama} className="w-full h-full object-cover" />
                  ) : (
                    <GiftPlaceholder />
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-xs font-medium text-[#1A1A1A] line-clamp-2 min-h-[2.5em]">{reward.nama}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-[#2E7D32]">{formatGEM(reward.harga_gem)}</span>
                    <GEMPBadge color="neutral" size="small">Stok {reward.stok}</GEMPBadge>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-sm text-[#999999]">Belum ada reward yang tersedia</p>
          </div>
        )}
      </div>

      {/* Bottom sheet detail */}
      {selectedReward && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedReward(null)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 animate-slide-up">
            <div className="w-10 h-1 bg-[#CCCCCC] rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#1A1A1A]">{selectedReward.nama}</h3>
            <p className="text-2xl font-bold text-[#2E7D32] mt-2">{formatGEM(selectedReward.harga_gem)}</p>
            <p className="text-sm text-[#666666] mt-1">Stok tersedia: {selectedReward.stok}</p>
            <GEMPButton
              variant="primary"
              size="large"
              fullWidth
              className="mt-6"
              onClick={() => {}}
            >
              Tukar Sekarang
            </GEMPButton>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterIcon() {
  return (
    <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
    </svg>
  );
}

function GiftPlaceholder() {
  return (
    <svg className="w-10 h-10 text-[#CCCCCC]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0v8.25m-8.25 3.75h16.5" />
    </svg>
  );
}
