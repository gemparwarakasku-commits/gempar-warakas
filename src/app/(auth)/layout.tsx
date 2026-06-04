// ============================================================
// GEMPAR v2.1 — Auth Layout
// Clean layout untuk login, forgot-password, reset-password
// ============================================================

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAFBFA] flex flex-col">
      {/* Logo area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-8">
        <div className="w-16 h-16 rounded-2xl bg-[#2E7D32] flex items-center justify-center mb-4 shadow-lg shadow-[#2E7D32]/20">
          <span className="text-white text-2xl font-bold">G</span>
        </div>
        <h1 className="text-xl font-bold text-[#1A1A1A]">GEMPAR</h1>
        <p className="text-xs text-[#999999] mt-1">Gerakan Memilah Sampah</p>
      </div>

      {/* Form area */}
      <div className="flex-1 bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-6 pt-8 pb-12">
        {children}
      </div>
    </div>
  );
}
