# ANSWER SECTION react

* __`01`__ 生命周期
  * ![react生命周期](../assets/react_vue/react-life-cycle.jpeg 'react生命周期')
  * ![vue生命周期](../assets/react_vue/vue-life-cycle.png 'vue生命周期')
  * > getDriveredStateFromProps
  * > getSnapshotBeforeUpdate
  * > componentWillUnmount
* __`02`__ 虚拟DOM的diff算法原理
  * 操作 DOM 是很耗费性能的一件事情，既然如此，我们可以考虑通过 JS 对象来模拟 DOM 对象，毕竟操作 JS 对象比操作 DOM 省时的多。
  * 实现 O(n) 复杂度的关键就是只对比同层的节点，而不是跨层对比
  * 首先从上至下，从左往右遍历对象，也就是树的深度遍历，这一步中会给每个节点添加索引，便于最后渲染差异
  * 一旦节点有子元素，就去判断子元素是否有不同
  * 树的递归
    * 新的节点的 tagName 或者 key 和旧的不同，这种情况代表需要替换旧的节点，并且也不再需要遍历新旧节点的子元素了，因为整个旧节点都被删掉了
    * 新的节点的 tagName 和 key（可能都没有）和旧的相同，开始遍历子树
    * 没有新的节点，那么什么都不用做
  * 判断属性的更改(节点存在 但是只是属性被修改了)
    * 遍历旧的属性列表，查看每个属性是否还存在于新的属性列表中(判断属性有没有删除)
    * 遍历新的属性列表，判断两个列表中都存在的属性的值是否有变化(判断属性有没有修改)
    * 在第二步中同时查看是否有属性不存在与旧的属性列列表中(判断属性是否被新增)
  * 判断列表差异算法实现
    * 遍历旧的节点列表，查看每个节点是否还存在于新的节点列表中(判断节点有没有被删除)
    * 遍历新的节点列表，判断是否有新的节点(判断节点有没有新增)
    * 在第二步中同时判断节点是否有移动(判断节点有没有被移动)
  * 渲染差异
    * 深度遍历树，将需要做变更操作的取出来
    * 局部更新 DOM
* __`03`__ 为什么选用redux及如何使用
  <!-- https://www.jianshu.com/p/d6614feef303 -->
  * Redux的主要优势之一是它可以帮你处理应用的共享状态
  * 你可以将该状态提升到附近的父组件，但是如果该父组件在组件树中向上好几个组件的位置，那么将状态当做属性向下一个一个地传递，这项工作很快就会变得乏味
  * 单个状态树 状态集中到一个位置后，调试和检测过程也会简单很多！
  * Redux应用中的状态是只读的，即Redux状态不可变 因为状态的更新受到严格控制，使得Redux非常具有可预测性
  * Action 是把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。它是 store 数据的唯一来源。一般来说你会通过 store.dispatch() 将 action 传到 store
    * function addTodo(text) {
        return { type: ADD_TODO, text }
      }
  * Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的，记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。
  * function todos(state = [], action) {
    switch (action.type) {
      case ADD_TODO:
        return [
          ...state,
          {
            text: action.text,
            completed: false
          }
        ]
      case TOGGLE_TODO:
        return state.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo
        })
      default:
        return state
    }
  }

  const todoApp = combineReducers({
    visibilityFilter,
    todos
  })
  * Store 就是把它们联系到一起的对象
* __`04`__ 自己写的组件库
* __`05`__ vue和react有什么不同 ，为什么选择react
  <!-- https://zhuanlan.zhihu.com/p/33051365 -->
  <!-- https://cn.vuejs.org/v2/guide/comparison.html -->
  * 相同点
    * 虚拟DOM
    * 提供响应式和可组合性的视图组件
  * 不同点
    * Vue使用templates与React的JSX
    * Vue处理CSS的方式相当不错
    * 生态 React的生态是比Vue的大的
    * 状态管理
    * 尽管你的需求越来越复杂，React专注于使您的代码易于理解。但不专注于让简单的例子竟可能简短。
* __`06`__ immutable
  <!-- https://zhuanlan.zhihu.com/p/20295971 -->
  * 共享的可变状态是万恶之源
  * Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。Immutable 实现的原理是 Persistent Data Structure（持久化数据结构），也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 Structural Sharing（结构共享），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。
  * Immutable 降低了 Mutable 带来的复杂度，Mutable造成了数据很难被回溯
  * Structure Sharing 会尽量复用内存。没有被引用的对象会被垃圾回收
  * Undo/Redo，Copy/Paste，甚至时间旅行这些功能做起来小菜一碟，因为每次数据都是不一样的，只要把这些数据放到一个数组里储存起来，想回退到哪里就拿出对应数据即可，很容易开发出撤销重做这种功能。
* __`07`__ 主流框架的设计理念
  <!-- ReacBasicTheoreticalConcepts.jpg -->
  * ![react设计理念](../assets/react_vue/ReacBasicTheoreticalConcepts.jpg 'react设计理念')
  * 变换
  * 抽象
  * 组合
  * 状态
  * 记忆
  * 代数效应
* __`08`__ vue双向绑定原理
  <!-- https://www.cnblogs.com/libin-1/p/6893712.html -->
  * ![vue双向绑定原理](../assets/react_vue/vue-bind.png 'vue双向绑定原理')
  * 实现一个监听器Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者。
    * Object.defineProperty( )。如果要对所有属性都进行监听的话，那么可以通过递归方法遍历所有属性值，并对其进行Object.defineProperty( )处理
  * 实现一个订阅者Watcher，可以收到属性的变化通知并执行相应的函数，从而更新视图
    * 监听器Observer是在get函数执行了添加订阅者Wather的操作的
    * 创建一个可以容纳订阅者的消息订阅器Dep，订阅器Dep主要负责收集订阅者，然后再属性变化的时候执行对应订阅者的更新函数。
  * 实现一个解析器Compile，可以扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器。
    * 解析模板指令，并替换模板数据，初始化视图
    * 将模板指令对应的节点绑定对应的更新函数，初始化相应的订阅器