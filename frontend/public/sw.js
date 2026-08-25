// v2 — the original cache-first strategy trapped users on stale, possibly
// broken deploys forever (no versioning, no skipWaiting/clients.claim). This
// bumps the cache name to purge that old cache, and switches the HTML shell
// and navigations to network-first so a new deploy is always picked up —
// only true static assets (icons, manifest) are cache-first.
const CACHE_NAME = 'tatkaleasy-v2'
const STATIC_ASSETS = ['/manifest.json', '/icon-192.png', '/icon-512.png']

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)

  // API calls: always network, fall back to cache only if fully offline
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(request).catch(() => caches.match(request)))
    return
  }

  // Navigations and the HTML shell itself: always network-first, so a new
  // deploy is picked up on next load instead of being cached forever
  if (request.mode === 'navigate' || url.pathname === '/') {
    event.respondWith(
      fetch(request).catch(() => caches.match(request))
    )
    return
  }

  // Hashed JS/CSS bundles and static assets: cache-first is safe here since
  // Vite gives every build a new filename hash — stale cache can't leak in
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached
      return fetch(request).then((response) => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
        }
        return response
      })
    })
  )
})
