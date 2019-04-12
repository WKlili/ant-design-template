import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'
import store from './store'
import api from './api'
import i18n from './assets/lang/i18n'
import './permission'
import 'ant-design-vue/dist/antd.less'
import './assets/styles/index.less'

Vue.config.productionTip = true

Vue.use(api)

Vue.use(Antd, {
  i18n: (key, value) => i18n.t(key, value)
})

window.addEventListener('selectLanguage', function (e) {
  i18n.locale = e.detail
}, false)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
