export const publishType = {
  '0':
  {
    title: '书籍详情',
    shape: 'rectangle',
    label: '书籍',
    urlName: '/pages/detail/book/index'
  },
  '1':
  {
    title: '内部运营活动',
    urlName: '/pages/h5/index',
    label: '活动'
  },
  '2':
  {
    title: '节目详情',
    shape: 'square',
    label: '节目',
    urlName: '/pages/detail/album/index'
  },
  '3':
  {
    title: '专题详情',
    shape: 'rectangle',
    label: '专题',
    urlName: '/pages/topic/index'
  },
  '4':
  {
    title: '主播首页(个人主页)',
    shape: 'square',
    label: '',
    urlName: 'user-id'
  },
  '5':
  {
    title: '书籍分类(二级分类)包含节目精品tab虚拟分类',
    label: '书籍',
    urlName: '/pages/category/list/index'
  },
  '6':
  {
    title: '主播电台',
    label: '节目',
    urlName: '/pages/category/list/index',
    query: {
      index: -1,
      title: '主播电台',
      rootId: 1000,
      from: 'hot'
    }
  },
  '7':
  {
    title: '应用外打开商业广告'
  },
  '8':
  {
    title: '书籍分类(一级分类)',
    label: '书籍',
    urlName: '/pages/category/list/index',
    query: {
      index: -1
    }
  },
  '9':
  {
    title: '听友会详情',
    shape: 'square'
  },
  '10':
  {
    title: '游戏中心'
  },
  '11':
  {
    title: '游戏详情'
  },
  '12':
  {
    title: '无连接广告'
  },
  '13':
  {
    title: '听单详情',
    label: '听单',
    urlName: ''
  },
  '14':
  {
    title: '节目分类页',
    label: '节目',
    urlName: '/pages/category/list/index',
    query: {
      title: '主播电台',
      rootId: 1000
    }
  },
  '15':
  {
    title: '专题列表',
    label: '专题',
    urlName: '/pages/topic/index'
  },
  '16':
  {
    title: '主播列表(热门主播页)',
    label: '推荐',
    urlName: 'explore-anchor'
  },
  '17':
  {
    title: '听友会首页',
    label: '听友会',
    urlName: ''
  },
  '18':
  {
    title: '听单列表(热门听单页)',
    label: '听单',
    urlName: ''
  },
  '19':
  {
    title: '阅读书籍详情'
  },
  '20':
  {
    title: '书籍独立的分类页(有声书城一级末端分类)'
  },
  '21':
  {
    title: '阅读书城首页'
  },
  '22':
  {
    title: '阅读二级分类'
  },
  '23':
  {
    title: '阅读书架'
  },
  '24':
  {
    title: '热门频道'
  },
  '25':
  {
    title: '版权专区'
  },
  '26':
  {
    title: '版权机构'
  },
  '27':
  {
    title: 'VIP会员',
    label: '会员',
    urlName: 'vip-buy'
  },
  '28':
  {
    title: '懒人出品(书籍独立的分类页)'
  },
  '29':
  {
    title: '阅读男生频道'
  },
  '30':
  {
    title: '阅读女生频道'
  },
  '31':
  {
    title: '阅读三级分类'
  },
  '32':
  {
    title: '精品首发',
    label: '精品',
    urlName: 'boutique-list'
  },
  '33':
  {
    title: '游戏中心链接跳转(跳到合作方的游戏中心去)'
  },
  '34':
  {
    title: '付费专区首页',
    label: '精品',
    urlName: 'boutique'
  },
  '35':
  {
    title: '付费分类页',
    label: '精品',
    urlName: 'boutique'
  },
  '36':
  {
    title: '作者分栏分类(阅读作者列表)'
  },
  '37':
  {
    title: '阅读书单列表(书单首页)'
  },
  '38':
  {
    title: '作者书籍(阅读作者详情)'
  },
  '39':
  {
    title: '完善个人资料',
    label: '推荐',
    urlName: 'user-settings-personalSettings'
  },
  '40':
  {
    title: '安全设置'
  },
  '41':
  {
    title: '绑定社交账号',
    label: '推荐',
    urlName: 'user-settings-social'
  },
  '42':
  {
    title: '去充值/我的钱包(新版本这里标识为去充值)',
    label: '推荐',
    urlName: 'pay-recharge'
  },
  '43':
  {
    title: '内部webview带任务事件'
  },
  '44':
  {
    title: '积分兑换页'
  },
  '45':
  {
    title: '任务列表'
  },
  '46':
  {
    title: '会员专区',
    label: '会员',
    urlName: 'vip'
  },
  '47':
  {
    title: '签到页面'
  },
  '48':
  {
    title: '内部webview特殊跳转地址'
  },
  '50':
  {
    title: '听读券页面'
  },
  '51':
  {
    title: '阅读书单详情'
  },
  '52':
  {
    title: '阅读限免首页'
  },
  '53':
  {
    title: '收听限免首页/今日限免列表/全体限免听',
    label: '推荐',
    urlName: 'boutique-freeLimit',
    tags: true
  },
  '54':
  {
    title: '男生必听'
  },
  '55':
  {
    title: '女生爱听'
  },
  '56':
  {
    title: '听友动态首页'
  },
  '57':
  {
    title: '小编推荐',
    label: '推荐',
    urlName: '/pages/book/list/index',
    tags: true,
    query: { id: 37 }
  },
  '58':
  {
    title: '新书推荐',
    label: '推荐',
    urlName: '/pages/book/list/index',
    tags: true,
    query: { id: 38 }
  },
  '59':
  {
    title: '首页广告'
  },
  '60':
  {
    title: '外部运营活动'
  },
  '61':
  {
    title: '应用内打开商业广告'
  },
  '62':
  {
    title: '听吧页',
    label: '推荐',
    urlName: 'index'
  },
  '63':
  {
    title: '我的页',
    label: '推荐',
    urlName: 'user'
  },
  '64':
  {
    title: '发现页'
  },
  '65':
  {
    title: '帐号页'
  },
  '66':
  {
    title: '榜单首页',
    label: '榜单',
    urlName: 'rankList'
  },
  '67':
  {
    title: '有声榜单详情',
    label: '榜单',
    urlName: 'rankList'
  },
  '68':
  {
    title: '阅读榜单首页'
  },
  '69':
  {
    title: '阅读分类列表'
  },
  '70':
  {
    title: '阅读榜单详情'
  },
  '71':
  {
    title: '会员书库',
    label: '会员',
    urlName: 'vip-bookstore'
  },
  '72':
  {
    title: '会员限免听',
    label: '会员',
    urlName: 'vip-list',
    query: {
      type: '2',
      title: '会员限免听'
    }
  },
  '73':
  {
    title: '会员限免读'
  },
  '74':
  {
    title: '会员抢先听',
    label: '会员',
    urlName: 'vip-list',
    query: {
      type: '3,5',
      title: '会员抢先听'
    }
  },
  '75':
  {
    title: '开通会员页面',
    label: '会员',
    urlName: 'vip-buy'
  },
  '76':
  {
    title: '有声书城分类列表',
    label: '推荐',
    urlName: 'category'
  },
  '77':
  {
    title: '下载/非跳转页面,下载给定链接'
  },
  '78':
  {
    title: '节目榜单详情',
    label: '榜单',
    urlName: 'rankList',
    query: {
      rankIndex: 1
    }
  },
  '79':
  {
    title: '主播榜单详情',
    label: '榜单',
    urlName: 'rankList',
    query: {
      rankIndex: 2
    }
  },
  '80':
  {
    title: '打赏节目榜详情'
  },
  '81':
  {
    title: '打赏书籍帮详情'
  },
  '82':
  {
    title: '打赏用户榜详情'
  },
  '83':
  {
    title: '打赏主播榜详情'
  },
  '84':
  {
    title: '书籍播放器页面',
    label: '推荐',
    urlName: '/pages/player/index',
    query: {
      type: 'book'
    }
  },
  '85':
  {
    title: '节目播放器页面',
    label: '推荐',
    urlName: '/pages/player/index',
    query: {
      type: 'album'
    }
  },
  '86':
  {
    title: '听友会帖子详情',
    label: '听友会',
    urlName: ''
  },
  '87':
  {
    title: '更多精选节目',
    label: '推荐',
    urlName: 'category-popularAlbum'
  },
  '88':
  {
    title: '有声付费合辑',
    label: '合辑',
    urlName: 'marketing-collection'
  },
  '89':
  {
    title: '阅读付费合辑'
  },
  '90':
  {
    title: '有声折扣活动专区',
    label: '活动',
    urlName: 'marketing-discountActivity'
  },
  '91':
  {
    title: '阅读折扣活动专区'
  },
  '92':
  {
    title: '绑定手机号',
    label: '推荐',
    urlName: 'user-settings-changePhone'
  },
  '93':
  {
    title: '我的钱包',
    label: '推荐',
    urlName: 'user-wallet'
  },
  '94':
  {
    title: '邀请好友'
  },
  '95':
  {
    title: '提交反馈'
  },
  '96':
  {
    title: '话题详情',
    label: '听友会',
    urlName: ''
  },
  '97':
  {
    title: '听友会我的',
    label: '听友会',
    urlName: ''
  },
  '98':
  {
    title: '听友会列表',
    label: '听友会',
    urlName: ''
  },
  '99':
  {
    title: '猜你想听'
  },
  '100':
  {
    title: '节目导航推荐页',
    name: 'album',
    label: '节目',
    urlName: '/pages/category/list/index',
    query: {
      index: -1,
      title: '主播电台',
      rootId: 1000
    }
  },
  '101':
  {
    title: '有声一级分类导航',
    label: '书籍',
    urlName: '/pages/category/list/index',
    name: 'book',
    query: { index: -1 }
  },
  '102':
  {
    title: '标签列表',
    label: '推荐',
    urlName: 'user-followLabel',
    query: { id: -1 }
  },
  '103':
  {
    title: '标签主页',
    label: '标签',
    urlName: 'label-id',
    query: {
      index: -2,
      type: 103
    }
  },
  '104':
  {
    title: '标签类别推荐页-书籍',
    name: 'label',
    label: '标签',
    urlName: 'category-label',
    query: {
      index: -2,
      type: 104
    }
  },
  '105':
  {
    title: '标签类别推荐页-混合',
    name: 'label',
    label: '标签',
    urlName: 'category-label',
    query: {
      index: -2,
      type: 105
    }
  },
  '106':
  {
    title: '标签类别推荐页-资源列表',
    name: 'label-resourceList',
    label: '标签',
    urlName: 'category-label-resourceList',
    query: {
      index: -1,
      type: 106
    }
  },
  '107':
  {
    title: '标签类型筛选页',
    label: '标签',
    urlName: 'category-label',
    query: {
      index: -1,
      type: 104
    }
  },
  '108':
  {
    title: '标签类型子标签筛选页',
    label: '标签',
    urlName: 'category-label',
    query: {
      type: 104
    }
  },
  '109':
  {
    title: '购买成功页'
  },
  '110':
  {
    title: '每日推荐页',
    urlName: '/pages/recommend/daily/index',
    label: '推荐'
  },
  '111':
  {
    title: '用户属性设置'
  },
  '112':
  {
    title: '每日福利页'
  },
  '113':
  {
    title: '主播列表页'
  },
  '114':
  {
    title: '发现-福利页'
  },
  '115':
  {
    title: '评论查看对话'
  },
  '116':
  {
    title: '发现-热门帖子页'
  },
  '117':
  {
    title: '发现-荐书帖子页'
  },
  '118':
  {
    title: '发现-关注主播动态页'
  },
  '119':
  {
    title: '用户榜单页'
  }
}

export default publishType
