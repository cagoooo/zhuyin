const CACHE_NAME = 'bopomofo-v2.5.0';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './assets/sounds/correct.mp3',
    './assets/sounds/wrong.mp3',
    './assets/sounds/touch.mp3',
    './assets/sounds/bgm.mp3'
];

// Install: 預取靜態資源
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('SW: Pre-caching core assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate: 清理舊快取
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        console.log('SW: Removing old cache', name);
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});

// Fetch: 離線策略
self.addEventListener('fetch', (event) => {
    // 忽略外部語音 API 與 Chrome 擴充功能
    if (event.request.url.startsWith('chrome-extension') || event.request.url.includes('google-analytics')) return;

    event.respondWith(
        caches.match(event.request).then((response) => {
            // 1. Cache Hit: 直接返回
            if (response) return response;

            // 2. Cache Miss: 從網絡獲取
            return fetch(event.request).then((networkResponse) => {
                // 如果是有效的本地資源或 CDN 圖片，存入快取
                if (networkResponse && networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // 如果網絡失敗且未命中快取，對於導航請求返回首頁（離線容錯）
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});
