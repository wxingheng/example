import axios from 'axios'
import config from './../config/config'

const createError = (code, msg) => {
  // const err = new Error(msg)
  // err.code = code
  return msg
}

const request = () =>
  axios.create({
    baseURL: `${config.baseUrl}/api/`,
    headers: {
      Authorization: (() => window.weixinToken)()
    }
  })

const requestBao = () =>
  axios.create({
    baseURL: `${config.baseUrl}/bao/`,
    headers: {
      Authorization: (() => window.weixinToken)()
    }
  })

const requestBase = axios.create({
  baseURL: `${config.baseUrl}/`
})

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(resp => {
      const data = resp.data
      if ((!data && resp.status !== 200) || data.success === false) {
        return reject(createError(400, data.msg))
      }
      resolve(data)
    }).catch(err => {
      const resp = err.response
      if (resp.status === 401) {
        reject(createError(401, 'need auth'))
      } else {
        reject(err)
      }
    })
  })
}

export default {
  getIdentityType() {
    return handleRequest(request().get('/service/wechatevidence/getIdentityType'))
  },
  getHospitals(query) {
    return handleRequest(requestBao().get('/service/weixin/getTopFacility?name=' + query))
  },
  getDisease() {
    return handleRequest(requestBao().get('/service/weixin/getDisease?name'))
  },
  getBloodSubType() {
    return handleRequest(request().get('/service/wechatevidence/getBloodSubType'))
  },
  saveData(query) {
    return handleRequest(request().post('/service/wechatevidence/save', query))
  },
  getEmployments(query) {
    return handleRequest(requestBao().get('/service/weixin/getTopEmployment?name=' + query))
  },
  getArea() {
    return handleRequest(requestBao().get('/service/weixin/getArea'))
  },
  getEvidence(query) {
    return handleRequest(request().get(`/service/wechatevidence/getEvidence?id=${query.id}&name=${query.name}`))
  },
  getToken() {
    return handleRequest(requestBase.get(`/ids/oauth/token?grant_type=client_credentials&client_id=weixin&client_secret=weixin`))
  }
}
