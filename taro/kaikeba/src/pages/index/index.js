import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input, Button } from "@tarojs/components";
import "./index.scss";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  constructor(props) {
    super(props);
    this.state = {
      val: "",
      todos: [
        { title: "吃饭饭", done: false },
        { title: "写代码", done: false }
      ]
    };
  }

  handleInout = (e) => {
    this.setState({
      val: e.detail.value
    })
  }

  handleClick = () => {
    console.log('handleClick')
    this.setState({
      todos: [...this.state.todos, {title: this.state.val, done: false}],
      val: ''
    })
  }

  render() {
    return (
      <View className="index">
        <Text >Hello world! wuxh</Text>
        <Input value={this.state.val} onInput={this.handleInout}></Input>
        <Button onClick={this.handleClick}>添加</Button>
        {this.state.todos.map((todo, i) => (
          <View key={i}>{todo.title}</View>
        ))}
      </View>
    );
  }
}
