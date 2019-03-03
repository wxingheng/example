import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { Tab } from "./../../components/tab/tab";
import { Clock } from "./../../components/clock/clock";
import { connect } from "@tarojs/redux";
import "./index.scss";

import { add, minus, asyncAdd } from "../../actions/counter";

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
export default class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "首页"
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onPullDownRefresh() {
    console.log("onPullDownRefresh--->>>");
  }
  navigateTo() {
    // 跳转到目的页面，打开新页面
    Taro.navigateTo({
      url: "/pages/test001/index"
    });
  }

  redirectTo() {
    // 跳转到目的页面，在当前页面打开
    Taro.redirectTo({
      url: "/pages/test001/index"
    });
  }

  render() {
    return (
      <View className="index">
        <Text>Hello world!122223000</Text>
        <Tab />
        <Button onClick={this.navigateTo}>navigateTo 跳转</Button>
        <Button onClick={this.redirectTo}>redirectTo 跳转</Button>
        <Clock />
        <View>{this.props.counter.num}</View>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
      </View>
    );
  }
}
