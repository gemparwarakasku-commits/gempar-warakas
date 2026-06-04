// ============================================================
// GEMPAR v2.1 — Zustand Store Combine
// Global store: auth + UI + data + offline
// Referensi: GEMPAR_FINAL_BLUEPRINT.md §18.1–18.2
// ============================================================

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {
  AuthState,
  UIState,
  DataState,
  OfflineState,
  User,
  Role,
  ToastItem,
  BottomSheetConfig,
  ModalConfig,
  DashboardData,
  OfflineAction,
  DraftSetoran,
} from '@/types';

// ── Auth Store ──
interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setRole: (role: Role | null) => void;
  setAuthenticated: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        role: null,
        isLoading: true,

        setUser: (user) => set({ user }),
        setToken: (token) => set({ token }),
        setRefreshToken: (refreshToken) => set({ refreshToken }),
        setRole: (role) => set({ role }),
        setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
        setLoading: (isLoading) => set({ isLoading }),
        logout: () =>
          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            role: null,
            isLoading: false,
          }),
      }),
      {
        name: 'gempar-auth',
        partialize: (state) => ({
          user: state.user,
          role: state.role,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
);

// ── UI Store ──
interface UIStore extends UIState {
  openBottomSheet: (config: Omit<BottomSheetConfig, 'isOpen'>) => void;
  closeBottomSheet: () => void;
  openModal: (config: Omit<ModalConfig, 'isOpen'>) => void;
  closeModal: () => void;
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
  setLoading: (value: boolean) => void;
}

export const useUIStore = create<UIStore>()(
  devtools(
    (set, get) => ({
      theme: 'light',
      bottomSheet: { isOpen: false },
      modal: { isOpen: false, type: '' },
      toasts: [],
      isLoading: false,

      openBottomSheet: (config) =>
        set({ bottomSheet: { ...config, isOpen: true } }),
      closeBottomSheet: () =>
        set({ bottomSheet: { isOpen: false } }),

      openModal: (config) =>
        set({ modal: { ...config, isOpen: true } }),
      closeModal: () =>
        set({ modal: { isOpen: false, type: '' } }),

      addToast: (toast) => {
        const id = Math.random().toString(36).substring(2, 9);
        set({ toasts: [...get().toasts, { ...toast, id }] });
        // Auto remove after duration
        setTimeout(() => {
          get().removeToast(id);
        }, toast.duration || 3000);
      },
      removeToast: (id) =>
        set({ toasts: get().toasts.filter((t) => t.id !== id) }),

      setLoading: (isLoading) => set({ isLoading }),
    }),
    { name: 'UIStore' }
  )
);

// ── Data Store ──
interface DataStore extends DataState {
  setUnreadNotifCount: (count: number) => void;
  setDashboardData: (data: DashboardData | null) => void;
  setLastSync: (date: string) => void;
  incrementNotif: () => void;
  decrementNotif: () => void;
}

export const useDataStore = create<DataStore>()(
  devtools(
    persist(
      (set, get) => ({
        unreadNotifCount: 0,
        dashboardData: null,
        lastSync: null,

        setUnreadNotifCount: (unreadNotifCount) => set({ unreadNotifCount }),
        setDashboardData: (dashboardData) => set({ dashboardData }),
        setLastSync: (lastSync) => set({ lastSync }),
        incrementNotif: () =>
          set({ unreadNotifCount: get().unreadNotifCount + 1 }),
        decrementNotif: () =>
          set({ unreadNotifCount: Math.max(0, get().unreadNotifCount - 1) }),
      }),
      {
        name: 'gempar-data',
        partialize: (state) => ({
          unreadNotifCount: state.unreadNotifCount,
          lastSync: state.lastSync,
        }),
      }
    ),
    { name: 'DataStore' }
  )
);

// ── Offline Store ──
interface OfflineStore extends OfflineState {
  setOnline: (value: boolean) => void;
  addToQueue: (action: Omit<OfflineAction, 'id' | 'created_at'>) => void;
  removeFromQueue: (id: string) => void;
  clearQueue: () => void;
  addPendingSetoran: (setoran: Omit<DraftSetoran, 'id' | 'created_at'>) => void;
  removePendingSetoran: (id: string) => void;
  clearPendingSetoran: () => void;
}

export const useOfflineStore = create<OfflineStore>()(
  devtools(
    persist(
      (set, get) => ({
        isOnline: true,
        queue: [],
        pendingSetoran: [],

        setOnline: (isOnline) => set({ isOnline }),

        addToQueue: (action) => {
          const newAction: OfflineAction = {
            ...action,
            id: Math.random().toString(36).substring(2, 9),
            created_at: new Date().toISOString(),
            retry_count: 0,
          };
          set({ queue: [...get().queue, newAction] });
        },
        removeFromQueue: (id) =>
          set({ queue: get().queue.filter((a) => a.id !== id) }),
        clearQueue: () => set({ queue: [] }),

        addPendingSetoran: (setoran) => {
          const newSetoran: DraftSetoran = {
            ...setoran,
            id: Math.random().toString(36).substring(2, 9),
            created_at: new Date().toISOString(),
          };
          set({ pendingSetoran: [...get().pendingSetoran, newSetoran] });
        },
        removePendingSetoran: (id) =>
          set({ pendingSetoran: get().pendingSetoran.filter((s) => s.id !== id) }),
        clearPendingSetoran: () => set({ pendingSetoran: [] }),
      }),
      {
        name: 'gempar-offline',
        partialize: (state) => ({
          queue: state.queue,
          pendingSetoran: state.pendingSetoran,
        }),
      }
    ),
    { name: 'OfflineStore' }
  )
);

// ── Combined Hook ──
export function useAppStore() {
  return {
    auth: useAuthStore(),
    ui: useUIStore(),
    data: useDataStore(),
    offline: useOfflineStore(),
  };
}
