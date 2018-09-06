export default {
  setIdentityType (state, data) {
    state.identityTypeList = data
  },
  setUserbase (state, data) {
    state.userbase = data
    localStorage.setItem('userbase', JSON.stringify(data))
  }
}
