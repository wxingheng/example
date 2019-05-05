/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View, Input, Button } from "@tarojs/components";
import { AtSwipeAction, AtIcon } from "taro-ui";
import "./index.scss";
// import { Mcheckbox } from "./../../components/MCheckbox/index.js";
// eslint-disable-next-line import/first
import Mcheckbox from "@/components/Mcheckbox";
import { connect } from '@tarojs/redux';
import { login, getCollection, removeRecordItem } from '../../actions/user'


@connect(({ user }) => ({
  user
}), (dispatch) => ({
  // login(callback) {
  //   dispatch(login(callback))
  // },
  // getCollection(list) {
  //   dispatch(getCollection(list))
  // },
  // removeRecordItem(id, callback = () => { }) {
  //   dispatch(removeRecordItem(id))
  //   callback()
  // }
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: "待办"
  };

  constructor(props) {
    super(props);
    this.state = {
      val: "",
      todos: [], // Taro.getStorageSync("todos") || [],
      // show add button
      showAdd: true,
      // add input is focus
      addFocus: false
      // todos: [{ title: "吃饭饭", done: false }, { title: "写代码", done: true }]
    };
    console.log(Taro.getEnv());
  }

  componentWillMount() {
    this.login();
    console.log('11111111111', this.props)
  }

  componentDidShow = () => {
    this.login();
    console.log('22222222')
  }

  async getSetting() {
    const setting = await Taro.getSetting();
    console.log("setting----->", setting);
  }

  async login() {
    let userInfo, loginRes;
    try {
      userInfo = await Taro.getUserInfo();
      loginRes = await Taro.login();
    } catch (err) {
      console.log('err---->', err);
      Taro.switchTab({
        url: '../mine/index'
      });
      return;
    }
    const loginPost = {
      code: loginRes.code,
      rawData: userInfo.rawData,
      signature: userInfo.signature,
      encryptedData: userInfo.encryptedData
    };
    this.loginServer(loginPost);
  }

  async openSetting() {
    Taro.openSetting().then(d => {
      console.log(d);
    });
  }


  // 请求server登录成功
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
    // 拉取列表
    this.getData();
  }

  async getData() {
    const result = await Taro.ajax({
      url: "/api/lists"
    });
    if (result.code === -1) {
      Taro.showToast({
        title: result.msg,
        icon: "none",
        duration: 2000
      });
    } else {
      this.setState({
        todos: result.data.rows
      });
    }
  }

  async createItem(data) {
    const result = await Taro.ajax({
      url: "/api/list",
      method: "post",
      data
    });
    console.log("result", result);
  }

  async listSync() {
    const result = await Taro.ajax({
      url: "/api/lists",
      method: "post",
      data: this.state.todos
    });
    console.log("listSync--->", result);
    this.getData();
  }

  save = () => {
    Taro.setStorageSync("todos", this.state.todos);
    // this.listSync();
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
  async handleAddBlur(e) {
    console.log("handleAddBlur--->>>", e.target.value);
    const result = e.target.value;
    if (result && result.trim()) {
      const r = await Taro.ajax({
        url: "/api/lists",
        method: "post",
        data: [{ title: result.trim(), done: false }]
      });
      console.log("listSync--->", r);
      this.getData();
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
      this.setState({
        showAdd: true,
        addFocus: false
      });
    }
  }

  handleCheckboxChange = (i, done) => {
    const todos = [...this.state.todos];
    todos[i]["done"] = !done;
    this.setState(
      {
        todos
      },
      this.save
    );
  };

  async handleItemBlur(e, i) {
    console.log("+++++++++++>>>", e.target.value);
    const todos = [...this.state.todos];
    todos[i]["title"] = e.target.value;
    const result = await Taro.ajax({
      url: "/api/lists",
      method: "post",
      data: [todos[i]]
    });
    console.log("listSync--->", result);
    this.getData();
    this.setState(
      {
        todos
      },
      this.save
    );
  }

  async handleSwipeClick(i) {
    console.log("handleSwipeClick");
    let todos = this.state.todos;
    const item = this.state.todos[i];
    if (item.id) {
      const result = await Taro.ajax({
        url: "/api/list/delete",
        method: "post",
        data: { id: item.id }
      });

      console.log("delete---->>>", result);

      todos.splice(i, 1);
      this.setState(
        {
          todos
        },
        this.save
      );
    } else {
      todos.splice(i, 1);
      this.setState(
        {
          todos
        },
        this.save
      );
    }
  }

  render() {
    console.log('this.props---->', this.props)
    const { todos, showAdd, val, addFocus } = this.state;
    console.log("this.state---->", this.state);
    return (
      <View>
        <View className="header">
          {/**
     <View className="header_left">编辑</View>
          <View className="header_center">清单</View>
    */}
          <View className="header_right" onClick={this.listSync}>
            同步
          </View>
        </View>
        <View className="main">
          <View className="ul">
            {todos.map((item, i) => (
              <AtSwipeAction
                onClick={() => this.handleSwipeClick(i)}
                key={i}
                options={[
                  {
                    text: "删除",
                    style: {
                      backgroundColor: "#FF4949"
                    }
                  }
                ]}
              >
                <View className="li">
                  <Mcheckbox
                    checked={item.done}
                    onClick={() => {
                      this.handleCheckboxChange(i, item.done);
                    }}
                  />

                  <Input
                    className={`input ${item.done && "line-through"}`}
                    disabled={item.done ? true : null}
                    onBlur={e => this.handleItemBlur(e, i)}
                    type="text"
                    value={item.title}
                  />
                </View>
              </AtSwipeAction>
            ))}
          </View>

          {showAdd ? (
            <View className="add" onClick={this.handleAdd}>
              <AtIcon value="add" size="20" color="#bbbbbb" />
            </View>
          ) : (
              // 只能第一次自动获取焦点
              <View className="ul">
                <View className="li">
                  <Mcheckbox />
                  <Input className="input" focus={addFocus} autoFocus type="text" value={val} onBlur={this.handleAddBlur} />
                </View>
              </View>
            )}
        </View>
        <Button onClick={this.openSetting}>设置权限</Button>
      </View>
    );
  }
}
