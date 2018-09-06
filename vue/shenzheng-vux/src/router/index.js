import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import HelloFromVux from './../components/HelloFromVux'
// import Home from './../components/Home'
// import Application from './../components/Application'
import HelloWorld from './../views/HelloWorld'
import HelloFromVux from './../views/HelloFromVux'
import Home from './../views/Home'
import Application from './../views/Application'
import Apply from './../views/Apply'
import Senility from './../views/Senility'
import Succ from './../views/Succ'
import Notify from './../views/Notify'
import Contact from './../views/Contact'
import Progress from './../views/Progress'
import Neither from './../views/Neither'
import PageTransition from './../components/PageTransition'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PageTransition',
      component: PageTransition, // 引入页面切换组件
      children: [
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: '/helloWorld',
          name: 'HelloWorld',
          component: HelloWorld,
          meta: {
            title: '用血审证',
            description: 'HelloWorld'
          }
        },
        {
          path: '/vux',
          name: 'HelloFromVux',
          component: HelloFromVux,
          meta: {
            title: '用血审证',
            description: 'HelloFromVux'
          }
        },
        {
          path: '/home',
          name: 'home',
          component: Home,
          meta: {
            title: '用血审证',
            description: 'home'
          }
        },
        {
          path: '/application/:type?',
          name: 'application',
          component: Application,
          meta: {
            title: '用血审证',
            description: 'application'
          }
        },
        {
          path: '/apply',
          name: 'apply',
          component: Apply,
          meta: {
            title: '用血审证',
            description: 'apply'
          }
        },
        {
          path: '/senility/:caseType',
          name: 'senility',
          component: Senility,
          meta: {
            title: '用血审证',
            description: 'senility'
          }
        },
        {
          path: '/succ/:caseType?',
          name: 'succ',
          component: Succ,
          meta: {
            title: '用血审证',
            description: 'succ'
          }
        },
        {
          path: '/notify',
          name: 'notify',
          component: Notify,
          meta: {
            title: '用血审证',
            description: 'notify'
          }
        },
        {
          path: '/contact',
          name: 'contact',
          component: Contact,
          meta: {
            title: '用血审证',
            description: 'contact'
          }
        },
        {
          path: '/progress/:data?',
          name: 'progress',
          component: Progress,
          meta: {
            title: '用血审证',
            description: 'progress'
          }
        },
        {
          path: '/neither',
          name: 'neither',
          component: Neither,
          meta: {
            title: '用血审证',
            description: 'neither'
          }
        }
      ]
    }
  ]
})
