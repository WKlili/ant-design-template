export default {
  namespaced: true,
  state: {
    ajaxState: 0,
    currentRouter: '/',
    ifAjax: false
  },
  mutations: {
    update (state, data) {
      const ifhaveAjaxState = Object.keys(data).map(name => name).includes('ajaxState')

      if (ifhaveAjaxState && data.ajaxState !== 0) {
        state.ajaxState += data.ajaxState
      } else {
        Object.assign(state, data)
      }
    }
  }
}
