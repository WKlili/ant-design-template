// import { post, get, put } from '../utils/request'

export default {
  userInfo (userInfo) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(userInfo)
      }, 1000)
    })
  },
  login (info) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ key: 'test', info })
      }, 1000)
    })
  }
}
