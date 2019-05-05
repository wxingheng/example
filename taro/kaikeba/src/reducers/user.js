import { LOGIN_START, LOGIN_DONE, LOGIN_ERROR, GET_COLLECTION, ADD_COLLECTION_ITEM, REMOVE_COLLECTION_ITEM, GET_RECORD, REMOVE_RECORD_ITEM } from '../constants/user'
import { createReducer, updateObject } from './utils'

const DEFAULT = {
  isLogin: false,
  loading: false,
  user: {},
  record: [],
  collections: []
}

function loginStart (state, action) {
  return updateObject(state, {
    isLogin: false,
    loading: true
  })
}

function loginDone (state, action) {
  console.log('loginDone--->loginDone');

  return updateObject(state, {
    isLogin: true,
    loading: false,
    user: action.user
  })
}

function loginError (state, action) {
  return updateObject(state, {
    isLogin: false,
    loading: false
  })
}

function getCollection (state, action) {
  return updateObject(state, {
    collections: action.list
  })
}

function addCollectionItem (state, action) {
  return updateObject(state, {
    collections: [
      ...state.collections,
      action.item
    ]
  })
}

function removeCollectionItem (state, action) {
  const index = state.collections.findIndex(item => item.id === action.id)
  const collections = state.collections.slice(0)
  collections.splice(index, 1)
  return updateObject(state, {
    collections: collections
  })
}

function getRecord (state, action) {
  return updateObject(state, {
    record: action.record
  })
}

function removeRecordItem (state, action) {
  const index = state.record.findIndex(item => item.bookId + (item.entityType === 4 ? 'book' : 'album') === action.id)
  const newRecord = state.record.slice(0)
  newRecord.splice(index, 1)
  return updateObject(state, {
    record: newRecord
  })
}

export default createReducer(DEFAULT, {
  [LOGIN_START]: loginStart,
  [LOGIN_DONE]: loginDone,
  [LOGIN_ERROR]: loginError,
  [GET_RECORD]: getRecord,
  [REMOVE_RECORD_ITEM]: removeRecordItem,
  [GET_COLLECTION]: getCollection,
  [ADD_COLLECTION_ITEM]: addCollectionItem,
  [REMOVE_COLLECTION_ITEM]: removeCollectionItem
})
