import user from './user'
import exportLess from './exportLess'

const api = {
  user,
  exportLess
}

export default {
  ...api,
  install: Vue => {
    Vue.prototype.$api = api
  }
}
