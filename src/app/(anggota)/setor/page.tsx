'use client';

// ============================================================
// GEMPAR v2.1 — Halaman Setor (Panduan + QR)
// Route: /setor
// Referensi: GEMPAR_FINAL_BLUEPRINT.md §12.2
// ============================================================

import { useState } from 'react';
import { GEMPHeader } from '@/components/ui/GEMPHeader';
import { GEMPButton } from '@/components/ui/GEMPButton';
import { GEMPModal } from '@/components/ui/GEMPModal';

const STEPS = [
  { num: 1, title: 'Pilah', desc: 'Pisahkan sampah organik dan anorganik' },
  { num: 2, title: 'Timbang', desc: 'Datang ke TPS terdekat untuk ditimbang' },
  { num: 3, title: 'Scan', desc: 'Tunjukkan QR ke petugas' },
];

export default function SetorPage() {
  const [showSaveModal, setShowSaveModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFBFA]">
      <GEMPHeader title="Cara Setor Sampah" showBack />

      <div className="p-4 space-y-6">
        {/* Steps */}
        <div className="space-y-3">
          {STEPS.map((step) => (
            <div key={step.num} className="bg-white rounded-2xl shadow-sm p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#2E7D32] text-white flex items-center justify-center text-sm font-bold shrink-0">
                {step.num}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1A1A1A]">{step.title}</h3>
                <p className="text-xs text-[#666666] mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* QR Code */}
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
          <p className="text-sm font-medium text-[#1A1A1A] mb-4">Tunjukkan QR ini ke Petugas</p>

          <div className="w-[200px] h-[200px] mx-auto bg-[#F5F5F5] rounded-xl flex items-center justify-center mb-4">
            {/* Placeholder QR — nanti diganti dengan QRCode component */}
            <div className="w-40 h-40 bg-[#1A1A1A] rounded-lg flex items-center justify-center">
              <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h3v3h-3v-3zm-2 2h3v3h-3v-3zm-2 2h3v3h-3v-3zm2 2h3v3h-3v-3zm-2 2h3v3h-3v-3zM13 3h2v2h-2V3zm0 4h2v2h-2V7zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z"/>
              </svg>
            </div>
          </div>

          <GEMPButton
            variant="ghost"
            size="medium"
            leftIcon={<DownloadIcon />}
            onClick={() => setShowSaveModal(true)}
          >
            Simpan QR ke Galeri
          </GEMPButton>
        </div>

        {/* History link */}
        <div className="text-center">
          <a href="/riwayat" className="text-sm font-medium text-[#2E7D32] hover:underline">
            Lihat riwayat setoran →
          </a>
        </div>
      </div>

      {/* Save modal */}
      <GEMPModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        title="Simpan QR"
        description="Fitur ini akan tersedia setelah integrasi dengan native API."
        confirmLabel="Mengerti"
        onConfirm={() => setShowSaveModal(false)}
      />
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}
