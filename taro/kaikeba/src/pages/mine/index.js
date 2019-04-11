/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
import Taro, { Component } from "@tarojs/taro";
import { View, Image, Button, Text } from "@tarojs/components";
import "./index.scss";
import defaultValues from "@/config/default-value.js";

console.log("defaultValues", defaultValues);

export default class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = { userInfo: {} };
  }

  config = {
    navigationBarTitleText: "我的"
  };

  login(userInfo) {
    console.log("login--->>>>>", userInfo);
    if (typeof userInfo.target.userInfo === "undefined") {
      return;
    } else {
      Taro.login().then(loginRes => {
        console.log("loginRes---->>>", loginRes);
      });
      this.setState({
        userInfo: userInfo.target.userInfo
      });
    }
  }

  render() {
    const {userInfo} = this.state
    const cover = userInfo.avatarUrl || defaultValues.mineCover
    const name = userInfo.nickName || '点击登录'
    return (
      <View className="mine">
        <View className="mine-top">
          <Button className="mine-top-cover" openType="getUserInfo" onGetUserInfo={this.login}>
            <Image className="mine-top-cover-img" src={cover} />
          </Button>
          <Text className="mine-top-name">{name}</Text>
        </View>
      </View>
    );
  }
}
