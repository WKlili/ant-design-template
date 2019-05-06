export default {
  namespaced: true,
  state: {
    isReset: false
  },
  mutations: {
    updateIsReset (state, data) {
      state.isReset = data
    }
  }
}
