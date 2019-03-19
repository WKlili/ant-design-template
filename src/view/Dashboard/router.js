import BasicLayout from '@/layouts/BasicLayout'

export default {
  path: '/Dashboard',
  name: 'dashboard',
  meta: {
    name: 'navList.showBoard',
    icon: 'dashboard'
  },
  component: BasicLayout,
  children: [{
    path: 'index',
    name: 'dashboard_index',
    meta: {
      name: 'navList.index'
    },
    component: () => import('./index')
  }, {
    path: 'table',
    name: 'dashboard_table',
    hidden: true,
    meta: {
      name: 'navList.table'
    },
    component: () => import('./table')
  }, {
    path: 'form',
    name: 'dashboard_form',
    meta: {
      name: 'navList.form'
    },
    component: () => import('./form')
  }]
}
