import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import { login, register } from '@/view/Login/router'
import errorPage from '@/components/Exception/router'

import dashboard from '@/view/Dashboard/router'
import home from '@/view/Home/router'

Vue.use(Router)
Vue.use(Meta)

const RoutesList = [
  login, register, errorPage, dashboard, home
]

const routes = RoutesList.map(item => {
  if (!item.redirect && !item.hidden) item.redirect = item.path + '/index'
  return item
})

export default new Router({
  routes: [
    { path: '/', redirect: '/Dashboard/index', hidden: true },
    ...routes,
    {
      path: '*',
      hidden: true,
      redirect: '/error/404'
    }
  ]
})
