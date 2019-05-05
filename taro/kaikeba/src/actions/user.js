import Taro from '@tarojs/taro'
import { LOGIN_START, LOGIN_DONE, LOGIN_ERROR, GET_COLLECTION, ADD_COLLECTION_ITEM, REMOVE_COLLECTION_ITEM, GET_RECORD, REMOVE_RECORD_ITEM } from '../constants/user'
import thirdLoginTypes from '../config/third-login-types'
// import { uploadRecord } from '../utils/userData'

function loginStart () {
  return {
    type: LOGIN_START
  }
}

function loginError () {
  return {
    type: LOGIN_ERROR
  }
}

export  function loginDone (user) {
  console.log('action--->loginDone');
  return {
    type: LOGIN_DONE,
    user
  }
}

function getRecord (record) {
  return {
    type: GET_RECORD,
    record
  }
}

export function removeRecordItem (id) {
  return {
    type: REMOVE_RECORD_ITEM,
    id
  }
}

export function getCollection (list) {
  return {
    type: GET_COLLECTION,
    list
  }
}

export function addCollectionItem (item) {
  return {
    type: ADD_COLLECTION_ITEM,
    item
  }
}

export function removeCollectionItem (id) {
  return {
    type: REMOVE_COLLECTION_ITEM,
    id
  }
}

export function loginFunc (params) {
  const { type = 'wechat' } = params
  return async (dispatch) => {
    let toastErrorMsg = (msg) => {
      Taro.showToast({
        title: msg || '登录失败',
        icon: 'none',
        duration: 2000
      })
      dispatch(loginError())
    }
    let handleLoginDone = (userData) => {
      if (!userData.cover) {
        userData.cover = require('@/assets/image/icon_default_head.svg')
      }
      Taro.hideLoading()
      Taro.showToast({ title: '登录成功', icon: 'success' })
      dispatch(loginDone(userData))
      if (typeof params.loginSuccess === 'function') {
        params.loginSuccess()
      }
    }
    dispatch(loginStart())
    Taro.showLoading({ title: '登录中...' })
    let loginRes = await Taro.login()
    if (!loginRes.code) {
      return toastErrorMsg(loginRes.errMsg)
    }
    let thirdType = thirdLoginTypes[type]
    let data = { thirdType, code: loginRes.code }
    let thirdLoginRes = await Taro.ajax({
      url: 'thirdPartyLogin',
      data,
      noToast: true
    })
    if (!thirdLoginRes || thirdLoginRes.status !== 0) {
      if (thirdLoginRes.status !== 1) {
        return toastErrorMsg(thirdLoginRes.msg)
      }
      let reLoginRes = await Taro.login()
      if (!reLoginRes.code) {
        return toastErrorMsg(reLoginRes.errMsg)
      }
      data.code = reLoginRes.code
      let userInfoRes = params.userInfo.target
      if (!userInfoRes.userInfo) {
        return toastErrorMsg(userInfoRes.errMsg)
      }
      data.weixinUserInfo = userInfoRes.rawData
      data.noToast = false
      let registerRes = await Taro.ajax({
        url: 'thirdPartyRegister',
        method: 'post',
        data
      })
      if (!registerRes || registerRes.status !== 0) {
        return toastErrorMsg(registerRes.msg)
      }
      return handleLoginDone(registerRes)
    }
    return handleLoginDone(thirdLoginRes)
  }
}

export function login (params = {}) {
  return async (dispatch) => {
    params.loginSuccess = async () => {
      await dispatch(getUserData())
      // uploadRecord()
      if (typeof params.cb === 'function') {
        params.cb()
      }
    }
    dispatch(loginFunc(params))
  }
}

export function getUserData () {
  return async (dispatch) => {
    const [collection, recent] = await Promise.all([
      Taro.ajax({ url: 'getCollectionBooks', data: { ids: 0 } }),
      Taro.ajax({ url: 'getRecentList', data: { srcType: 101 } })
    ])
    if (collection.status === 0) {
      dispatch(getCollection(collection.list))
    }
    if (recent.status === 0) {
      const record = recent.list.filter(item => item.isDelete === 0)
      dispatch(getRecord(record))
    }
  }
}
