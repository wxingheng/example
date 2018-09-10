export default [
  {
    path: '/',
    component: require('./assets/vue/pages/home.vue')
  },
  {
    path: '/about/',
    component: require('./assets/vue/pages/about.vue')
  },
  {
    path: '/form/',
    component: require('./assets/vue/pages/form.vue')
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: require('./assets/vue/pages/dynamic-route.vue')
  },
  {
    path: '/panel-left/',
    component: require('./assets/vue/pages/panel-left.vue')
  },
  {
    path: '/color-themes/',
    component: require('./assets/vue/pages/color-themes.vue')
  },
  {
    path: '/chat/',
    component: require('./assets/vue/pages/chat.vue')
  },
  {
    path: '/vuex/',
    component: require('./assets/vue/pages/vuex.vue')
  },

  {
    path: '/blood-station/',
    component: require('./assets/vue/pages/blood-station.vue')
  },
  {
    path: '/hospital-station/',
    component: require('./assets/vue/pages/hospital-station.vue')
  },
  {
    path: '/plasma-station/',
    component: require('./assets/vue/pages/plasma-station.vue')
  },
  {
    path: '/blood-search/',
    component: require('./assets/vue/pages/blood-search.vue')
  },
  {
    path: '/hospital-search/',
    component: require('./assets/vue/pages/hospital-search.vue')
  },
  {
    path: '/plasma-search/',
    component: require('./assets/vue/pages/plasma-search.vue')
  },
  {
    path: '/plasma-search-2/',
    component: require('./assets/vue/pages/plasma-search-2.vue')
  },
  // plasma-station.vue
]
