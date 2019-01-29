import axios from 'axios'
import { getToken } from './token'
import * as antd from 'ant-design-vue'
import store from '../store'

const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL + '/',
  timeout: 1000 * 60,
  validateStatus (status) {
    return status >= 200
  }
})

service.interceptors.request.use(config => {
  const token = getToken()

  if (token) {
    config.headers['X-Token'] = token
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
