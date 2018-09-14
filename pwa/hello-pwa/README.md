[pwd 入门](https://juejin.im/post/5abba6a7f265da239706ec60)


###  非常重要
1、如果业务的静态资源更新了， 需要修改sw.js文件，一个B的修改都会引起浏览器的重新下载sw文件， 然后触发install , 装载新的离线资源。 但要注意，新的service worker不会立即activate , 因为老的service worker还在， 新的sw处于waiting状态。 