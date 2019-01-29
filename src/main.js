import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import './permission'

Vue.config.productionTip = true

Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
