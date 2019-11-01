npm install -g ionic

ionic start --list

ionic start myApp tabs

cd myApp
ionic serve

ionic generate



### ios
在ios打包运行
    先打包
    ionic cordova prepare ios
    然后使用xcode运行
在ios上开发运行
    ionic cordova run ios -l --address=0.0.0.0
调试
    使用safari调试

### android
在安卓运行
    先添加安卓平台
    ionic cordova prepare android
在安卓上开发运行
    sudo ionic cordova run android -l --address=192.168.3.124
    sudo cordova run android
调试
    使用Chrome DevTools