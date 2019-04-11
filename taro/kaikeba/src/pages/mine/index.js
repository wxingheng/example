/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
import Taro, { Component } from "@tarojs/taro";
import { View, Image, Button, Text } from "@tarojs/components";
import "./index.scss";
import defaultValues from "@/config/default-value.js";

console.log('defaultValues', defaultValues);

export default class Mine extends Component {
  config = {
    navigationBarTitleText: "我的"
  };

  render() {
    const cover =  defaultValues.mineCover
    return (
      <View className='mine'>
        <View className='mine-top'>
          <Button className='mine-top-cover' openType='getUserInfo'>
            <Image className='mine-top-cover-img' src={cover} />
          </Button>
          <Text className='mine-top-name'>Wuxh</Text>
        </View>
      </View>
    );
  }
}
