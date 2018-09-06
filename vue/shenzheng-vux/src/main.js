// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import Vuex from 'vuex'
import './assets/style/weui.css'

import createStore from './store/store'

// vux 全局组件的注册
import {
  XButton,
  XInput,
  Group,
  Selector,
  Toast,
  XNumber,
  Checklist,
  ToastPlugin,
  LoadingPlugin,
  Datetime,
  XTable,
  Icon,
  Checker,
  CheckerItem,
  Flexbox,
  FlexboxItem 
} from 'vux'

import HeaderHistory from './components/HeaderHistory.vue'

Vue.use(Vuex)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

const store = createStore()

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.component('x-button', XButton)
Vue.component('x-input', XInput)
Vue.component('group', Group)
Vue.component('selector', Selector)
Vue.component('toast', Toast)
Vue.component('x-number', XNumber)
Vue.component('checklist', Checklist)
Vue.component('datetime', Datetime)
Vue.component('x-table', XTable)
Vue.component('icon', Icon)
Vue.component('header-history', HeaderHistory)
Vue.component('checker', Checker)
Vue.component('checker-item', CheckerItem)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)


router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面meta */
  if (to.meta.content) {
    let head = document.getElementsByTagName('head')
    let meta = document.createElement('meta')
    meta.content = to.meta.content;
    head[0].appendChild(meta)
  }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
