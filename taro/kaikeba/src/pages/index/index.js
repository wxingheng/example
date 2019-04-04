import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input, Button } from "@tarojs/components";
import "./index.scss";
import { AtList, AtListItem, AtSwipeAction } from "taro-ui";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "收集箱"
  };

  constructor(props) {
    super(props);
    this.state = {
      val: "",
      todos: Taro.getStorageSync("todos") || []
      // todos: [{ title: "吃饭饭", done: false }, { title: "写代码", done: true }]
    };
    console.log(Taro.getEnv());
  }

  save = () => {
    Taro.setStorageSync("todos", this.state.todos);
  };

  handleInout = e => {
    this.setState({
      val: e.detail.value
    });
  };

  handleClick = () => {
    console.log("handleClick");
    this.setState(
      {
        todos: [...this.state.todos, { title: this.state.val, done: false }],
        val: ""
      },
      this.save
    );
  };

  handleChange = (e, i) => {
    console.log(e);
    console.log(i);
    this.setState(
      {
        todos: (() => {
          const todos = [...this.state.todos];
          todos[i]["done"] = e.detail.value;
          return todos;
        })()
      },
      this.save
    );
  };

  handleClear = () => {
    Taro.showLoading({
      title: "清理中"
    });
    setTimeout(() => {
      this.setState(
        {
          todos: this.state.todos.filter(v => !v.done)
        },
        this.save
      );
      Taro.hideLoading();
    }, 2000);
  };

  handleSingle = (i) => {
    console.log(i)
  }
  handleItem = (i) => {
    console.log(i)
  }

  render() {
    const { todos } = this.state;
    return (
      // <AtList>
      //   {todos.map((item, index) => (
      //     <AtSwipeAction
      //       key={index}
      //       onOpened={this.handleSingle.bind(this, index)}
      //       options={[
      //         {
      //           text: '取消',
      //           style: {
      //             backgroundColor: '#6190E8'
      //           }
      //         },
      //         {
      //           text: '删除',
      //           style: {
      //             backgroundColor: '#FF4949'
      //           }
      //         }
      //       ]}
      //     >
      //       {item.title}
      //     </AtSwipeAction>
      //   ))}
      // </AtList>
      <View >
        <Text>Hello world! wuxh</Text>
        <Input value={this.state.val} onInput={this.handleInout} />
        <Button onClick={this.handleClick}>添加</Button>
        <AtList>
          {this.state.todos.map((todo, i) => (
            <AtListItem
              className={{ kkdone: todo.done }}
              key={i}
              title={todo.title}
              isSwitch
              switchIsCheck={todo.done}
              onSwitchChange={e => this.handleChange(e, i)}
            />
          ))}
        </AtList>
        <Button onClick={this.handleClear}>清空</Button>
      </View>
    );
  }
}
