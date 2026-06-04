// ============================================================
// GEMPAR v2.1 — Service Worker
// Cache strategies: static-first, network-first for API
// Background sync for setoran
// ============================================================

const CACHE_NAME = 'gempar-v1';
const STATIC_CACHE = 'gempar-static-v1';
const IMAGE_CACHE = 'gempar-images-v1';
const API_CACHE = 'gempar-api-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// Install: cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name.startsWith('gempar-') && name !== STATIC_CACHE && name !== IMAGE_CACHE && name !== API_CACHE)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: route-based caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip Supabase realtime/WebSocket
  if (request.url.includes('supabase.co/realtime')) return;

  // Strategy: Cache First for static assets (JS, CSS, fonts)
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Strategy: Cache First for images
  if (isImage(request)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE, 30 * 24 * 60 * 60 * 1000)); // 30 days
    return;
  }

  // Strategy: Network First for API calls
  if (isAPI(request)) {
    event.respondWith(networkFirst(request, API_CACHE, 5 * 60 * 1000)); // 5 min stale
    return;
  }

  // Strategy: Network First for HTML pages
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() => caches.match('/offline.html'))
    );
    return;
  }
});

// Background Sync: sync pending setoran
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-setoran') {
    console.log('[SW] Background sync: setoran');
    event.waitUntil(syncPendingSetoran());
  }
  if (event.tag === 'sync-mutasi') {
    console.log('[SW] Background sync: mutasi');
    event.waitUntil(syncPendingMutasi());
  }
});

// Push Notification
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  const title = data.title || 'GEMPAR';
  const options = {
    body: data.body || 'Notifikasi baru dari GEMPAR',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    tag: data.tag || 'default',
    requireInteraction: false,
    data: data.data || {},
    actions: data.actions || [],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    })
  );
});

// ── Helper Functions ──

function isStaticAsset(request) {
  const url = new URL(request.url);
  return (
    url.pathname.match(/\.(js|css|woff2|woff)$/) ||
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'font'
  );
}

function isImage(request) {
  return request.destination === 'image';
}

function isAPI(request) {
  return request.url.includes('/api/') || request.url.includes('supabase.co/rest');
}

async function cacheFirst(request, cacheName, maxAge = null) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    // Check cache age if maxAge specified
    if (maxAge) {
      const dateHeader = cached.headers.get('date');
      if (dateHeader) {
        const age = Date.now() - new Date(dateHeader).getTime();
        if (age < maxAge) return cached;
      } else {
        return cached;
      }
    } else {
      return cached;
    }
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return cached || new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request, cacheName, staleTime) {
  const cache = await caches.open(cacheName);

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    const cached = await cache.match(request);
    if (cached) {
      const dateHeader = cached.headers.get('date');
      if (dateHeader) {
        const age = Date.now() - new Date(dateHeader).getTime();
        if (age < staleTime) return cached;
      }
    }
    return cached || new Response(JSON.stringify({ error: 'Offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function syncPendingSetoran() {
  // TODO: Read from IndexedDB and sync pending setoran
  console.log('[SW] Syncing pending setoran...');
}

async function syncPendingMutasi() {
  // TODO: Read from IndexedDB and sync pending mutasi
  console.log('[SW] Syncing pending mutasi...');
}
