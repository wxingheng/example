import Taro, { Component } from "@tarojs/taro";
import Index from "./pages/index";

import "./app.scss";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: ["pages/index/index", "pages/mine/index","pages/user/user"],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      selectedColor: "#E7A240",
      list: [
        {
          pagePath: "pages/index/index",
          text: "待办",
          iconPath: "assets/image/ic_find_tablebar_normal.png",
          selectedIconPath: "assets/image/ic_find_tablebar_focused.png"
        },
        {
          pagePath: "pages/mine/index",
          text: "我的",
          iconPath: "assets/image/ic_personal_tablebar_normal.png",
          selectedIconPath: "assets/image/ic_personal_tablebar_focused.png"
        }
      ]
    }
  };

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById("app"));
