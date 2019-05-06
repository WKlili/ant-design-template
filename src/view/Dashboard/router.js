import BasicLayout from '@/layouts/BasicLayout'

export default {
  path: '/Dashboard',
  name: 'dashboard',
  meta: {
    name: 'test.index',
    icon: 'dashboard'
  },
  component: BasicLayout,
  children: [{
    path: 'index',
    name: 'dashboardIndex',
    meta: {
      name: 'test.dashboard_index',
      routeName: 'dashboard_dashboardIndex'
    },
    component: () => import('./index')
  }, {
    path: 'table',
    name: 'dashboardTable',
    hidden: true,
    meta: {
      name: 'test.dashboard_table',
      routeName: 'dashboard_dashboardIndex'
    },
    component: () => import('./table')
  }, {
    path: 'form',
    name: 'dashboardForm',
    meta: {
      name: 'test.dashboard_form',
      routeName: 'dashboard_dashboardForm'
    },
    component: () => import('./form')
  }]
}
