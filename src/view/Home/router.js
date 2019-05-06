import BasicLayout from '@/layouts/BasicLayout'

export default {
  path: '/Home',
  name: 'home',
  meta: {
    name: 'test.Home',
    icon: 'dashboard'
  },
  component: BasicLayout,
  children: [{
    path: 'index',
    name: 'homeIndex',
    meta: {
      name: 'test.home_index',
      routeName: 'home_homeIndex'
    },
    component: () => import('./index')
  }, {
    path: 'other',
    name: 'homeIndexOther',
    hidden: true,
    meta: {
      name: 'other',
      routeName: 'home_homeIndex'
    },
    component: () => import('./other')
  }, {
    path: 'last',
    name: 'homeIndexLast',
    hidden: true,
    meta: {
      name: 'last',
      routeName: 'home_homeIndex'
    },
    component: () => import('./last')
  }]
}
