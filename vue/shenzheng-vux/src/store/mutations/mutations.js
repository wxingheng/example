export default {
  setIdentityType (state, data) {
    state.identityTypeList = data
  },
  setUserbase (state, data) {
    state.userbase = {...state.userbase, ...data}
    localStorage.setItem('userbase', JSON.stringify( state.userbase))
  },
  setIsImplant (state, data) {
    state.isImplant = data
    console.log('data-->', data)
  }
}
