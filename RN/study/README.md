中文官网
https://reactnative.cn/docs/getting-started.html
https://github.com/thecodingmachine/react-native-boilerplate

1，初始化项目
react-native init AwesomeProject

2，运行项目  react-native run-ios    react-native run-android

react-native run-ios --simulator "iPhone Xs"

3, 查看iOS设备：在终端中输入xcrun simctl list devices

4, 启动模拟器  open -a Simulator

5,   Run instructions for iOS:
    • cd AwesomeProject && react-native run-ios
    - or -
    • Open AwesomeProject/ios/AwesomeProject.xcworkspace in Xcode or run "xed -b ios"
    • Hit the Run button

  Run instructions for Android:
    • Have an Android emulator running (quickest way to get started), or a device connected.
    • cd AwesomeProject && react-native run-android

6, react-native run-ios --device "your device name"，需要先全局安装 ios-deploy 模块，不然会运行失败。

7, 打包apk 
     cd android
     ./gradlew assembleRelease


- [x] 安卓开发环境成功
- [x] ios开发环境成功
- [x] 安卓打包输出
- [x] 基于antd-rn
- [ ] ios真机调试
- [ ] ios发布测试版本
- [ ] ios相机
- [ ] ios通讯录
- [ ] ios蓝牙
- [ ] ios相册

