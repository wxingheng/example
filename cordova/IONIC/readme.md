## ionic-conference

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


### ionic 常用命令

npm install -g cnpm –registry=https://registry.npm.taobao.org（npm镜像源指向淘宝）

cnpm install -g cordova ionic（安装cordova ionic）

cnpm update -g cordova ionic（更新cordova ionic）

ionic -help（查看帮助）

ionic -v（查看版本）

ionic start myionictest blank（空项目）

ionic start myionictest tabs（带导航条）

ionic start myionictest sidemenu（带侧滑菜单）

ionic g page login(添加页面)

ionic g provider BaseService(添加服务端口)

ionic platform add android（添加android平台）

ionic platform remove android（移除android平台） ionic cordova  platform rm android

ionic build android（编译项目apk）

ionic emulate android（运行项目apk 
手机连接在手机运行模拟器连接在模拟器运行）

ionic run android （相当于build + emulate）

ionic serve（开启服务调试）

ionic cordova build android –prod 加开App启动速度

ionic g page YourPageName //创建新页面

ionic g directive YourPageName //创建指令

ionic g component YourComponentName //创建组件

ionic g provider YourProviderName //创建服务

ionic g pipe YourPipeName //创建过滤器

