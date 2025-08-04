const CACHE_NAME = 'ejs-pwa-v1';
const urlsToCache = [
  '/',
  '/style.css',
  '/manifest.json',
  '/images/icons/icon-192.png',
  '/images/icons/icon-512.png'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
