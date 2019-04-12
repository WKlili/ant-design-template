import axios from 'axios'
import NProgress from 'nprogress'
import { getToken } from './token'
import * as antd from 'ant-design-vue'
import store from '../store'
import router from '../router'

const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL + '/',
  timeout: 1000 * 60,
  validateStatus (status) {
    return status >= 200
  }
})

service.interceptors.request.use(config => {
  store.commit('progress/update', { ifAjax: true })
  const token = getToken()

  if (token) {
    config.headers['X-Token'] = token
  }
  if (store.state.progress.currentRouter !== router.history.current.fullPath) {
    store.commit('progress/update', { ajaxState: 0 })
  }
  store.commit('progress/update', { currentRouter: router.history.current.fullPath })
  store.commit('progress/update', { ajaxState: 1 })

  if (router) {
    config.router = router.history.current.fullPath
  }

  return config
})

service.interceptors.response.use(
  response => {
    const msg = response.data.msg

    if (msg === '未登陆/登陆失效，请重新登陆') {
      antd.message.error(msg)

      return store.dispatch('user/logout')
    }

    if (response.data.code === 'ERROR') {
      antd.message.error(msg || '服务器在开小差')

      return Promise.reject(new Error(response.data.msg))
    }

    if (response.config.router !== '/') {
      store.commit('progress/update', { ajaxState: -1 })
    }
    if (store.state.progress.ajaxState === 0) {
      NProgress.done()
      store.commit('progress/update', { ifAjax: false })
    }
    return response.data.data
  },
  error => {
    console.log('error', error)
    return Promise.reject(error)
  }
)

export const get = service.get
export const put = service.put
export const del = service.delete
export const post = service.post
export default service
