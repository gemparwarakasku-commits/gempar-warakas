# GEMPAR — Gerakan Memilah Sampah Dari Rumah

> **Community Environmental Platform** | Mobile-First PWA | Zero PC Development

---

## 🚀 Quick Start (Full HP, Zero PC)

### 1. Setup Akun (15 menit)

| Akun | Daftar Via | Link |
|------|-----------|------|
| **GitHub** | Browser HP | [github.com](https://github.com) |
| **Vercel** | Login pakai GitHub | [vercel.com](https://vercel.com) |
| **Supabase** | Browser HP | [supabase.com](https://supabase.com) |

### 2. Clone & Deploy (10 menit)

```bash
# Di Vercel dashboard (browser HP):
# 1. Import repo GitHub → pilih "gempar"
# 2. Add Environment Variables (lihat .env.example)
# 3. Deploy → selesai
```

### 3. Setup Database (30 menit)

```bash
# Di Supabase dashboard (browser HP):
# 1. Buka SQL Editor
# 2. Jalankan file di /supabase/migrations/001_initial_schema.sql
# 3. Jalankan /supabase/migrations/002_functions_triggers.sql
# 4. Jalankan /supabase/migrations/003_seed_data.sql
```

---

## 🏗️ Arsitektur

```
Vercel (Frontend + API)
    ├── Next.js 14 App Router
    ├── Tailwind CSS
    ├── Zustand (State)
    └── Vercel Serverless Functions

Supabase (Backend Services)
    ├── PostgreSQL Database
    ├── Auth (JWT)
    ├── Storage (Foto profil, bukti)
    └── Realtime (Notifikasi)
```

---

## 📱 Tech Stack

| Layer | Teknologi | Tujuan |
|-------|-----------|--------|
| Framework | Next.js 14 | App Router, Serverless Functions |
| Styling | Tailwind CSS | Utility-first, mobile-first |
| State | Zustand | Global state, lightweight |
| Server State | TanStack Query | Auto cache, refetch |
| Forms | React Hook Form | Validasi real-time |
| Database | Supabase PostgreSQL | Persistent, relational |
| Auth | Supabase Auth | JWT, RBAC |
| Storage | Supabase Storage | File upload |
| PWA | next-pwa | Offline, installable |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| **Primary** | `#2E7D32` |
| **Premium** | `#1B5E20` |
| **Soft** | `#4CAF50` |
| **Mint** | `#E8F5E9` |
| **Background** | `#FAFBFA` |
| **Surface** | `#FFFFFF` |
| **Font** | Inter |
| **Base Spacing** | `4px` |
| **Card Radius** | `16px` |
| **Card Shadow** | `0 2px 4px rgba(0,0,0,0.08)` |

**Referensi Visual:** Jago, Livin, Gojek, Bibit

---

## 📂 Struktur Folder

```
gempar/
├── src/
│   ├── app/              # Routes (Next.js App Router)
│   │   ├── (auth)/       # Login, forgot password
│   │   ├── (anggota)/    # Dashboard, reward, profil
│   │   ├── (petugas)/    # Scan QR, input setoran
│   │   └── (admin)/      # OCC dashboard, manajemen
│   ├── components/
│   │   ├── ui/           # 28 reusable components
│   │   ├── layout/       # Navigation, sidebar
│   │   └── page-specific/# 10 page components
│   ├── hooks/            # 14 custom hooks
│   ├── lib/              # Utils, constants, Supabase clients
│   ├── types/            # TypeScript interfaces
│   ├── store/            # Zustand stores
│   ├── api/              # Vercel Serverless Functions
│   └── middleware.ts     # Auth & role guards
├── supabase/
│   ├── migrations/         # SQL schema
│   ├── functions/        # Database functions
│   └── policies/         # Storage policies
├── public/               # PWA assets, images
└── docs/                 # Setup guide, API reference
```

---

## 🔑 Environment Variables

Copy `.env.example` → `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

---

## 👥 Role System

| Role | Akses |
|------|-------|
| **Anggota** | Dashboard, setor, reward, profil, ranking |
| **Petugas** | Scan QR, input setoran, riwayat verifikasi |
| **Admin** | Manajemen anggota, petugas, reward, laporan |

---

## 📋 Development Checklist

### Phase 1: Foundation
- [ ] Setup akun GitHub, Vercel, Supabase
- [ ] Import repo ke Vercel
- [ ] Setup database schema
- [ ] Deploy skeleton app

### Phase 2: Auth & Core
- [ ] Login page
- [ ] Middleware auth guard
- [ ] Dashboard skeleton
- [ ] Bottom navigation

### Phase 3: Anggota Features
- [ ] Kartu GEM Premium
- [ ] Swipe Insight Area
- [ ] Setor (QR + panduan)
- [ ] Reward marketplace
- [ ] Profil + My Team

### Phase 4: Petugas Features
- [ ] Scan QR
- [ ] Input setoran form
- [ ] Riwayat verifikasi

### Phase 5: Admin Features
- [ ] Dashboard OCC
- [ ] Manajemen anggota/petugas
- [ ] GEM Economy Center
- [ ] Laporan

### Phase 6: Polish
- [ ] PWA installable
- [ ] Offline mode
- [ ] Push notifikasi
- [ ] Performance audit

---

## 🛠️ Development dari HP

### Edit File via GitHub Mobile

1. Buka repo di GitHub Mobile
2. Tap file → Edit (icon pensil)
3. Edit → Commit dengan pesan deskriptif
4. Vercel auto-deploy dalam 30 detik

### Workflow per Sesi

```
Saya kirim kode → Anda copy-paste ke GitHub Mobile
→ Commit → Vercel deploy → Test di browser HP
→ Lapor bug/feedback → Saya perbaiki
```

---

## 📦 Asset Requirements

| Asset | File | Ukuran | Sumber |
|-------|------|--------|--------|
| Logo App | `logogempar.png` | 32/40/48px | Custom |
| Logo Horizontal | `logoteks.png` | — | Custom |
| Maskot 1-5 | `maskot1-5.png` | 200px | Custom |
| Icon PWA | `icon-192.png` | 192×192px | Generate |
| Icon PWA | `icon-512.png` | 512×512px | Generate |

---

## 🔒 Security

- JWT via Supabase Auth (RS256)
- RLS (Row Level Security) di PostgreSQL
- Input sanitization DOMPurify
- File upload validation (type, size, dimension)
- Rate limiting 100 req/min

---

## 📄 License

MIT License — Digi_Warakas @2026

**Disclaimer:** Sistem GEM tidak memiliki nilai monetari resmi. Reward bersifat sukarela dari mitra GEMPAR.

---

## 🆘 Bantuan

| Masalah | Solusi |
|---------|--------|
| Deploy gagal | Cek Environment Variables di Vercel |
| Database error | Cek RLS policies di Supabase |
| Auth tidak jalan | Cek redirect URL di Supabase Auth settings |
| File upload error | Cek Storage policies & bucket permissions |

---

> **GEMPAR v2.1** — Single Source of Truth | UI LOCK | Siap Implementasi
