import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import "./index.scss";

export default class Mcheckbox extends Component {
  render() {
    const { onClick, checked } = this.props;
    return (
      <View className='checkbox' onClick={onClick}>
        <AtIcon value={checked ? "check-circle" : "stop"} size='20' color='#000000' />
      </View>
    );
  }
}
