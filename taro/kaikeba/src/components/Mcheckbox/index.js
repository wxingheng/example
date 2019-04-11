import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtIcon } from "taro-ui";

export default class Mcheckbox extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <View onClick={onClick}>
        <AtIcon value='stop' size='20' color='#0f0' />
      </View>
    );
  }
}
