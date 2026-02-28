const CACHE_NAME = 'los-domi-cache-v1';
const STATIC_ASSETS = [
    '/salon-hair/',
    '/salon-hair/noise.svg',
    '/salon-hair/salon_interior_minimalist_1772169180364.png',
    '/salon-hair/salon_wash_area_1772169213820.png',
    '/salon-hair/salon_station_closeup_1772169197334.png'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(STATIC_ASSETS);
        })
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached response if found
            if (response) {
                return response;
            }

            // Otherwise fetch from network
            return fetch(event.request).then((networkResponse) => {
                // Don't cache if not a valid response or not a GET request
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' || event.request.method !== 'GET') {
                    return networkResponse;
                }

                // Clone response to cache it
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            }).catch(() => {
                // Fallback for failed network requests (e.g. offline and not in cache)
                return new Response('Offline content not available');
            });
        })
    );
});

// Activate Event
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
