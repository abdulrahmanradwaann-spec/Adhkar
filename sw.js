const CACHE_NAME = 'adhkar-v2';
const ASSETS = [
    './',
    './index.html',
    './css/style.css',
    './js/i18n.js',
    './js/locales-inline.js',
    './js/data.js',
    './js/app.js',
    './locales/ar.json',
    './locales/en.json',
    './locales/so.json',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './images/developer.jpg',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(cached => {
            if (cached) return cached;
            return fetch(e.request).then(response => {
                if (response && response.status === 200 && response.type === 'basic') {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
                }
                return response;
            }).catch(() => {
                if (e.request.destination === 'document') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});
