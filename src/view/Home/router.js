import BasicLayout from '@/layouts/BasicLayout'

export default {
  path: '/Home',
  name: 'home',
  meta: {
    name: 'navList.home',
    icon: 'dashboard'
  },
  component: BasicLayout,
  children: [{
    path: 'index',
    name: 'home_index',
    meta: {
      name: 'navList.home_index'
    },
    component: () => import('./index')
  }, {
    path: 'other',
    name: 'home_index_other',
    hidden: true,
    meta: {
      name: 'navList.other'
    },
    component: () => import('./other')
  }, {
    path: 'last',
    name: 'home_index_last',
    hidden: true,
    meta: {
      name: 'navList.last'
    },
    component: () => import('./last')
  }]
}
