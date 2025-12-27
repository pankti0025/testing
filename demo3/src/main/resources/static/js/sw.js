const CACHE_NAME = "pwa-cache-v1";
const FILES = [
    "/register",
    "/css/style.css",
    "/js/offline.js",
    "/js/manifest.json"
];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
