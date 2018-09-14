// index.js
// 收件检查是否支持pwa
if ('serviceWorker' in navigator) {
    // 当你register一个文件之后，install会被调用
    navigator.serviceWorker.register('/sw.js').then(reg => {
        setInterval(function() {
            console.log('setInterval');
            reg.update();
        }, 4000);
        console.log('service worker registed!');
    })
    .catch(err => {
        console.log('Opooos, something wrong happend!');
    })
}

window.onload = function() {
    document.body.append('PWA!333')
}
