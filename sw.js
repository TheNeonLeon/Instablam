const static = 'site-static-v1';
const dynamicCache = 'site-static-v2';
const offline = 'offline.html';
const assets = [
    '/', 
    '/index.html',
    '/script/index.js',
    '/css/style.css',
    '/img/phone-192.png',
    '/img/phone-512.png',
    '/offline.html'
];

self.addEventListener('install', evt =>{
    //console.log('service worker has been installed');
    evt.waitUntil(caches.open(dynamicCache)
    .then(cache =>{
        console.log('caching assets');
        cache.addAll(assets);
    }))
});

self.addEventListener('activate', evt =>{
    console.log('service worker has been activated');
    evt.waitUntil(caches.keys()
    .then(keys => {
        return Promise.all(keys.filter(key => key !== static && key !== dynamicCache)
        .map(key => caches.delete(key))
        )
    }))
});


self.addEventListener('fetch', evt =>{
    console.log('fetch event', evt);

    evt.respondWith(
        caches.match(evt.request)
        .then(cacheRes =>{
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        }).catch(() => { 
            return caches.match('/offline.html');
    })
  );
});