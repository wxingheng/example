/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
import Taro, { Component } from "@tarojs/taro";
import { View, Image, Button, Text } from "@tarojs/components";
import "./index.scss";
import defaultValues from "@/config/default-value.js";
import { connect } from '@tarojs/redux'
import { loginDone } from '../../actions/user'


console.log("defaultValues", defaultValues);


@connect(({ user, config }) => ({
  user, config
}), (dispatch) => ({
  loginDone(user) {
    dispatch(loginDone(user))
  },
}))
export default class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = { userInfo: {} };
  }

  config = {
    navigationBarTitleText: "我的"
  };

  login = (userInfo) => {

    if (typeof userInfo.target.userInfo === "undefined") {
      return;
    } else {
      Taro.login().then(loginRes => {
        const loginPost = {
          code: loginRes.code,
          rawData: userInfo.detail.rawData,
          signature: userInfo.detail.signature,
          encryptedData: userInfo.detail.encryptedData
        };
        this.loginServer(loginPost);
      });

      Taro.setStorage({
        key: "userInfo",
        data: userInfo.target.userInfo
      });
      console.log("-------userInfo--->>>", userInfo.target.userInfo);
      this.props.loginDone(userInfo.target.userInfo)
    }
  }

  async loginServer(data) {
    const result = await Taro.ajax({
      url: "/api/login",
      method: "post",
      data
    });
    const {
      data: { token }
    } = result;
    Taro.setStorage({
      key: "token",
      data: token
    });
    this.setState({
      userInfo: Taro.getStorageSync("userInfo")
    });
  }

  render() {
    console.log('this.props---->', this.props)

    const { userInfo } = this.state;
    const cover = userInfo.avatarUrl || defaultValues.mineCover;
    const name = userInfo.nickName || "点击登录";
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
