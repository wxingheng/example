export const config = {
  'book': {
    listUrl: 'getBookMenu',
    getParams: (id, sortType = 0, pageNum) => ({
      bookId: id,
      pageNum: pageNum,
      pageSize: 50,
      sortType: sortType
    }),
    infoUrl: 'getBookInfo'
  },
  'album': {
    listUrl: 'getAlbumAudios',
    getParams: (id, sortType = 0) => ({
      ablumnId: id,
      sortType: sortType
    }),
    infoUrl: 'getAlbumInfo'
  }
}

export const mini = {
  play: require('../assets/image/icon_play.gif'),
  stop: require('../assets/image/icon_stop.svg')
}