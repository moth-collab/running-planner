// Running Schedule Planner — service worker
// Network-first for navigations (always fresh when online), cache fallback offline.
const CACHE = 'rp-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put('/', copy)); return res; })
        .catch(() => caches.match('/').then(r => r || caches.match('/index.html')))
    );
  }
});
