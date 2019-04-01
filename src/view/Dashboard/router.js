import BasicLayout from '@/layouts/BasicLayout'

export default {
  path: '/Dashboard',
  name: 'dashboard',
  meta: {
    name: '看板',
    icon: 'dashboard'
  },
  component: BasicLayout,
  children: [{
    path: 'index',
    name: 'dashboard_index',
    meta: {
      name: 'index',
      routeName: 'dashboard_index'
    },
    component: () => import('./index')
  }, {
    path: 'table',
    name: 'dashboard_table',
    hidden: true,
    meta: {
      name: 'table',
      routeName: 'dashboard_table'
    },
    component: () => import('./table')
  }, {
    path: 'form',
    name: 'dashboard_form',
    meta: {
      name: 'table',
      routeName: 'dashboard_form'
    },
    component: () => import('./form')
  }]
}
