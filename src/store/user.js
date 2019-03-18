import { getToken, setToken } from '../utils/token'
import api from '../api'
import store from 'store'
import router from '../router'

export default {
  namespaced: true,
  state: {
    menuList: [],
    token: getToken(),
    info: store.get('userInfo') || {
      createAt: 0,
      groupId: 0,
      id: '',
      mail: '',
      nickname: '',
      password: '',
      phone: '',
      userRights: '',
      username: '',
      departmentName: '',
      fullname: ''
    }
  },
  mutations: {
    update (state, data) {
      Object.assign(state, data)
    }
  },
  actions: {
    async login ({ commit, dispatch }, info) {
      const { key: token } = await api.user.login({ info: info })

      setToken(token)

      commit('update', {
        token,
        info
      })

      dispatch('getUserInfo')
    },
    async getUserInfo ({ commit, state }) {
      const info = await api.user.userInfo(state.info)
      commit('update', {
        info
      })
      store.set('userInfo', info)
    },
    logout ({ commit, state }) {
      setToken('')
      store.remove('userInfo')
      commit('update', {
        token: ''
      })
      router.replace('/login')
    }
  }
}
