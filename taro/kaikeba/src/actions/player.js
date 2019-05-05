import { PREV, NEXT, PREVPAGE, SETINDEX, NEXTPAGE, ADDURL, SETLIST, SETDETAIL, SETSTATE } from '../constants/player'

export const next = () => ({ type: NEXT })

export const nextPage = (list) => ({
  type: NEXTPAGE, list
})

export const prev = () => ({ type: PREV })

export const prevPage = (list) => ({
  type: PREVPAGE, list
})

export const setIndex = (index) => ({
  type: SETINDEX, index
})

export const setList = (list) => ({
  type: SETLIST, list
})

export const setDetail = (detail) => ({
  type: SETDETAIL, detail
})

export const setState = (state) => ({
  type: SETSTATE, state
})

export const addUrl = (id, path) => ({
  type: ADDURL, id, path
})
