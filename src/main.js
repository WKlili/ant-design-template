import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'
import store from './store'
import i18n from './assets/lang/i18n'
import 'ant-design-vue/dist/antd.css'
import './permission'

Vue.config.productionTip = true

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
