import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import menu from './menu'
import progress from './progress'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    user,
    menu,
    progress
  }
})
