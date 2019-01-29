import user from './user'

const api = {
  user
}

export default {
  ...api,
  install: Vue => {
    Vue.prototype.$api = api
  }
}
