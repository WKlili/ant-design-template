import router from './router'
import { getToken } from './utils/token'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  if (getToken()) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
