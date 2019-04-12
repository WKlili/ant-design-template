import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from './store'

import { login, register } from '@/view/Login/router'
import errorPage from '@/components/Exception/router'

import dashboard from '@/view/Dashboard/router'
import home from '@/view/Home/router'

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.use(Router)
Vue.use(Meta)

const RoutesList = [
  login, register, errorPage, dashboard, home
]

const routes = RoutesList.map(item => {
  if (!item.redirect && !item.hidden) item.redirect = item.path + '/index'
  return item
})

let router = new Router({
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

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  setTimeout(() => {
    if (!store.state.progress.ifAjax) {
      NProgress.done()
    }
  }, 0)
})

export default router
