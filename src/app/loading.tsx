// ============================================================
// GEMPAR v2.1 — Loading State (Global)
// Skeleton loader untuk page transitions
// ============================================================

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAFBFA] animate-pulse">
      {/* Header skeleton */}
      <div className="h-16 bg-white shadow-sm" />

      {/* Content skeleton */}
      <div className="p-4 space-y-4">
        {/* Hero card skeleton */}
        <div className="h-48 bg-[#EEEEEE] rounded-2xl" />

        {/* Stats row skeleton */}
        <div className="grid grid-cols-3 gap-3">
          <div className="h-20 bg-[#EEEEEE] rounded-2xl" />
          <div className="h-20 bg-[#EEEEEE] rounded-2xl" />
          <div className="h-20 bg-[#EEEEEE] rounded-2xl" />
        </div>

        {/* List skeleton */}
        <div className="space-y-3">
          <div className="h-16 bg-[#EEEEEE] rounded-2xl" />
          <div className="h-16 bg-[#EEEEEE] rounded-2xl" />
          <div className="h-16 bg-[#EEEEEE] rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
