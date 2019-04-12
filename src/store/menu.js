export default {
  namespaced: true,
  state: {
    showBigMenu: true,
    showsmallMenu: false
  },
  mutations: {
    update (state, data) {
      state.showBigMenu = data
    },
    updateSmall (state, data) {
      state.showsmallMenu = data
    }
  }
}
