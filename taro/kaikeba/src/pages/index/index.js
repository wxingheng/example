/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View, Checkbox, Input } from "@tarojs/components";
import "./index.scss";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "收集箱"
  };

  constructor(props) {
    super(props);
    this.state = {
      val: "",
      todos: Taro.getStorageSync("todos") || [],
      // show add button
      showAdd: true,
      // add input is focus
      addFocus: false
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

  handleSingle = i => {
    console.log(i);
  };
  handleItem = i => {
    console.log(i);
  };
  handleAdd = () => {
    console.log("handleAdd");
    this.setState({
      showAdd: !this.state.showAdd,
      addFocus: true
    });
  };
  handleAddBlur = e => {
    console.log("handleAddBlur--->>>", e);
    console.log("handleAddBlur--->>>", e.target.value);
    const result = e.target.value;
    if (result && result.trim()) {
      console.log("11111");
      this.setState(
        {
          todos: [...this.state.todos, { title: result.trim(), done: false }],
          showAdd: true,
          addFocus: false,
          val: ""
        },
        this.save
      );
    } else {
      console.log("2222");
      this.setState({
        showAdd: true,
        addFocus: false
      });
    }
  };

  handleCheckboxChange = (i, done) => {
    console.log(i);
    console.log(done);
    const todos = [...this.state.todos];
    todos[i]['done'] = !done;
    console.log('todos', todos);
    this.setState({
      todos
    }, this.save)
  }

  render() {
    const { todos, showAdd, val, addFocus } = this.state;
    console.log('this.state---->', this.state);
    return (
      <View>
        <View className="header">
          <View className="header_left">编辑</View>
          <View className="header_center">清单</View>
          <View className="header_right">删除</View>
        </View>
        <View className="main">
          <View className="ul">
            {todos.map((item, i) => (
              <View className="li" key={i}>
                <Checkbox className="checkbox" onChange={() => {this.handleCheckboxChange(i, item.done)}} checked={item.done} />
                <Input className={`input ${item.done && "line-through"}`} disabled={item.done} type="text" value={item.title} />
              </View>
            ))}
          </View>

          {showAdd ? (
            <View className="add" onClick={this.handleAdd}>
              +
            </View>
          ) : (
            // 只能第一次自动获取焦点
            <View className="ul">
              <View className="li">
                <Checkbox className="checkbox" />
                <Input className="input" focus={addFocus} autoFocus type="text" value={val} onBlur={this.handleAddBlur} />
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}
