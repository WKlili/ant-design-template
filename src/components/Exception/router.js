import BasicLayout from '@/layouts/BasicLayout'

export default {
  path: '/error',
  hidden: true,
  name: 'error',
  redirect: '/error/404',
  component: BasicLayout,
  children: [{
    path: '404',
    name: '404',
    meta: {
      name: '404'
    },
    component: () => import('@/components/Exception')
  }]
}
