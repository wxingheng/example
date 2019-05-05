import { PREV, NEXT, PREVPAGE, NEXTPAGE, ADDURL, SETINDEX, SETLIST, SETDETAIL, SETSTATE } from '../constants/player'
import { createReducer, updateObject, updateItemInArray } from './utils'

function prev (state, action) {
  return updateObject(state, { currentIndex: state.currentIndex - 1 })
}

function next (state, action) {
  return updateObject(state, { currentIndex: state.currentIndex + 1 })
}

function setIndex (state, action) {
  return updateObject(state, { currentIndex: action.index })
}

function setList (state, action) {
  return updateObject(state, { songslist: [...action.list] })
}

function setDetail (state, action) {
  return updateObject(state, { detail: action.detail })
}

function setState (state, action) {
  return updateObject(state, { isPlay: action.state })
}

function prevPage (state, action) {
  return updateObject(state, {
    currentIndex: state.currentIndex + action.list.length,
    songslist: [...action.list, ...state.songslist]
  })
}

function nextPage (state, action) {
  return updateObject(state, {
    songslist: [...state.songslist, ...action.list]
  })
}

function addUrl (state, action) {
  return updateObject(state, {
    songslist: updateItemInArray(
      state.songslist,
      item => item.id === action.id,
      item => updateObject(item, { path: action.path })
    )
  })
}

export default createReducer({}, {
  [PREV]: prev,
  [NEXT]: next,
  [PREVPAGE]: prevPage,
  [NEXTPAGE]: nextPage,
  [ADDURL]: addUrl,
  [SETINDEX]: setIndex,
  [SETLIST]: setList,
  [SETDETAIL]: setDetail,
  [SETSTATE]: setState
})
