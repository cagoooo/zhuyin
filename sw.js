const CACHE_NAME = 'bopomofo-v3.1.0';
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
    // 1. 僅處理 GET 請求，忽略 POST, PUT, DELETE (解決 Cache.put 報錯)
    if (event.request.method !== 'GET') return;

    // 2. 忽略外部 API、Firebase、Google Analytics 與 Chrome 擴充功能
    const url = event.request.url;
    if (
        url.startsWith('chrome-extension') ||
        url.includes('google-analytics') ||
        url.includes('googleapis.com') ||
        url.includes('firebaseio.com') ||
        url.includes('firebasestorage.googleapis.com')
    ) return;

    event.respondWith(
        caches.match(event.request).then((response) => {
            // 3. Cache Hit: 直接返回
            if (response) return response;

            // 4. Cache Miss: 從網絡獲取
            return fetch(event.request).then((networkResponse) => {
                // 如果是有效的本地資源或 CDN 圖片，且請求是 GET，則存入快取
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
