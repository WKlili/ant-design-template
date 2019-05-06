import router from './router'
import { getToken } from './utils/token'
import store from './store'

const whiteList = ['/login', '/register']

router.beforeEach(async (to, from, next) => {
  if (getToken()) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      await store.dispatch('user/logout')
      next()
    }
  }
})
