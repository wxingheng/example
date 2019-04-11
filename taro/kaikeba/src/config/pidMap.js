/*
* page id
* 主要用于生成二维码的分享url,及分享落地页的跳转
* {
*  page: 'pages/Share/landing/index',
*  scene: `pid=${pidMap[path]}${query && ('&' + query)}`
* }
*/
const pidMap = {
  1: '/pages/detail/book/index',
  2: '/pages/detail/album/index',
  3: '/pages/topic/index',
  4: '/pages/personal/index',
  5: '/pages/player/index'
}

Object.keys(pidMap).forEach(k => {
  pidMap[pidMap[k]] = k
})

export default pidMap
