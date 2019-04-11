const defaults = {
  shareTitle: '懒人听书-热门有声小说评书电台',
  userDesc: '我是懒人我骄傲！',
  mineCover: require('@/assets/image/icon_avatar_default.png'),
  userCover: require('@/assets/image/icon_default_head.svg'),
  anchorCover: require('@/assets/image/icon_default_head.png'),
  bannerCover: require('@/assets/image/banner_default.png'),
  categoryCover: require('@/assets/image/category.svg'),
  pictureList: {
    'rectangle': require('@/assets/image/book_default.png'),
    'square': require('@/assets/image/show_default.png'),
    'circle': require('@/assets/image/icon_default_head.png')
  },
  help: {
    vipServiceProtocol: 'http://m.lrts.me/h5/help/vip_service_protocol' // 懒人会员协议
  },
  uploadAlbumGuide: 'http://m.lrts.me/about/anchor/index?source=download-header-footer-search', // 节目上传指引
  // privilegeList: [ // 会员权益
  //   { src: require('~/assets/image/icon_book_vip.png'), iconSrc: require('~/assets/image/icon_book_vip.svg'), name: '会员书库', desc: '免费收听付费书籍', href: 'http://m.lrts.me/h5/help/vip_book_stack' },
  //   { src: require('~/assets/image/icon_coupon_vip.png'), iconSrc: require('~/assets/image/icon_coupon_vip.svg'), name: '每月送券', desc: '每月获赠听读券', href: 'http://m.lrts.me/h5/help/vip_gift_ticket' },
  //   { src: require('~/assets/image/icon_new_vip.png'), iconSrc: require('~/assets/image/icon_new_vip.svg'), name: '新书抢先', desc: '抢先收听热门新书', href: 'http://m.lrts.me/h5/help/vip_book_first' },
  //   { src: require('~/assets/image/icon_sale_vip.png'), iconSrc: require('~/assets/image/icon_sale_vip.svg'), name: '折扣购买', desc: '购书享受折扣价格', href: 'http://m.lrts.me/h5/help/vip_discount' },
  //   { src: require('~/assets/image/icon_free_vip.png'), iconSrc: require('~/assets/image/icon_free_vip.svg'), name: '限免听书', desc: '收听专属限免书籍', href: 'http://m.lrts.me/h5/help/vip_book_free' },
  //   { src: require('~/assets/image/icon_read_vip.png'), iconSrc: require('~/assets/image/icon_read_vip.svg'), name: '限免读书', desc: '阅读专属限免书籍', href: 'http://m.lrts.me/h5/help/vip_read_book_free' },
  //   { src: require('~/assets/image/icon_noAD_vip.png'), iconSrc: require('~/assets/image/icon_noAD_vip.svg'), name: '免广告', desc: '免除页面商业广告', href: 'http://m.lrts.me/h5/help/vip_adve_free' },
  //   { src: require('~/assets/image/icon_identity_vip.png'), iconSrc: require('~/assets/image/icon_identity_vip.svg'), name: '尊享身份', desc: '专属标识彰显身份', href: 'http://m.lrts.me/h5/help/vip_honour' }
  // ]
}

export default defaults
