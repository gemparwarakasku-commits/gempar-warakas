// ============================================================
// GEMPAR v2.1 — useOffline Hook
// Offline detection & queue management
// ============================================================

import { useEffect, useCallback } from 'react';
import { useOfflineStore, useUIStore } from '@/store';

export function useOffline() {
  const { isOnline, setOnline, queue, pendingSetoran, addToQueue, removeFromQueue } = useOfflineStore();
  const { addToast } = useUIStore();

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      addToast({ message: 'Koneksi internet tersedia', type: 'success', duration: 2000 });
    };

    const handleOffline = () => {
      setOnline(false);
      addToast({ message: 'Anda sedang offline. Data akan disimpan lokal.', type: 'warning', duration: 3000 });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    setOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOnline, addToast]);

  // Sync queue when back online
  const syncQueue = useCallback(async () => {
    if (!isOnline || queue.length === 0) return;

    addToast({ message: `Menyinkronkan ${queue.length} aksi...`, type: 'info' });

    for (const action of queue) {
      try {
        // TODO: Process each action based on type
        console.log('Syncing action:', action);
        removeFromQueue(action.id);
      } catch (err) {
        console.error('Sync failed for action:', action.id, err);
      }
    }

    addToast({ message: 'Sinkronisasi selesai', type: 'success' });
  }, [isOnline, queue, removeFromQueue, addToast]);

  useEffect(() => {
    if (isOnline && queue.length > 0) {
      syncQueue();
    }
  }, [isOnline, queue.length, syncQueue]);

  return {
    isOnline,
    queueLength: queue.length,
    pendingSetoranCount: pendingSetoran.length,
    syncQueue,
  };
}
