import axios from 'axios'

const createError = (code, msg) => {
  // const err = new Error(msg)
  // err.code = code
  return msg
}

const request = axios.create({
  // baseURL: 'https://sbc.stpass.com/synergy-api/'
  baseURL: 'https://sbc.stpass.com/api/'

})

const requestBao = axios.create({
  baseURL: 'https://sbc.stpass.com/bao/'
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
      }
    })
  })
}

export default {
  getIdentityType() {
    return handleRequest(request.get('/service/wechatevidence/getIdentityType'))
  },
  getHospitals(query) {
    return handleRequest(requestBao.get('/service/weixin/getTopFacility?name=' + query))
  },
  getDisease() {
    return handleRequest(requestBao.get('/service/weixin/getDisease?name'))
  },
  getBloodSubType() {
    return handleRequest(request.get('/service/wechatevidence/getBloodSubType'))
  },
  saveData(query) {
    return handleRequest(request.post('/service/wechatevidence/save', query))
  },
  getEmployments(query){
    return handleRequest(requestBao.get('/service/weixin/getTopEmployment?name=' + query))
  },
  getArea(){
    return handleRequest(requestBao.get('/service/weixin/getArea'))
  },
  getEvidence(query){
    return handleRequest(request.get(`/service/wechatevidence/getEvidence?id=${query.id}&name=${query.name}`))
  }
}
