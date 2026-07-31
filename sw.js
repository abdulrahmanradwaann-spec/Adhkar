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
    './update.json',
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

// Handle update messages from the client
self.addEventListener('message', e => {
    if (e.data && e.data.type === 'APPLY_UPDATE') {
        const files = e.data.files;
        caches.open(CACHE_NAME).then(cache => {
            for (const [path, content] of Object.entries(files)) {
                const url = path === 'index.html' ? './' + path : './' + path;
                const response = new Response(content, {
                    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
                });
                cache.put(url, response);
            }
        }).then(() => {
            // Notify all clients that update is applied
            self.clients.matchAll().then(clients => {
                clients.forEach(client => client.postMessage({ type: 'UPDATE_APPLIED' }));
            });
        });
    }
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
