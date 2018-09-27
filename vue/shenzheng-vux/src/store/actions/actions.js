import model from './../../model/client-model'

export default {
  getIdentityType({
    commit
  }) {
    return model.getIdentityType()
      .then(data => {
        commit('setIdentityType', data)
      })
  },
  updateUserbase({
    commit
  }, data) {
    commit('setUserbase', data)
  },
  updateIsImplant({
    commit
  }, data) {
    commit('setIsImplant', data)
  }
}
