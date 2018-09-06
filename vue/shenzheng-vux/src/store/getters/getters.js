export default {
  textPlus (state, getters, rootState) {
    return state.text + rootState.b.text
  }
}
