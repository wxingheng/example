console.log('./sw.js...ss2233332s');

let cacheName = 'pwa-demo-assets'; // 缓存名字
// 所需要缓存的文件
let filesToCache = [
    '/'
]
self.addEventListener('install', function (e) {
    self.skipWaiting();
    e.waitUntil(
        // 安装服务者时，对需要缓存的文件进行缓存
        caches.open(cacheName).then(cache => {
            return cache.addAll(filesToCache)
        })
    )
})

self.addEventListener('fetch', function (event) {
    // 判断地址是不是需要实时去请求，是就继续发送请求
    if (event.request.url.indexOf('/api') > -1) {
        event.respondWith(
            caches.open(imgCacheName).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone()); // 每请求一次缓存更新一次新加载的图片
                    return response;
                });
            })
        );

    } else {
        event.respondWith(
            // 匹配到缓存资源，就从缓存中返回数据
            caches.match(event.request)
            .then(function (response) {
                // 检测是否已经缓存过
                if (response) {
                    return response;
                }

                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function (response) {
                        // 检测请求是否有效
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        var responseToCache = response.clone();

                        caches.open(cacheName)
                            .then(function (cache) {
                                
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
        );
    }

});