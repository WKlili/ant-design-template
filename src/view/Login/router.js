export const login = {
  path: '/login',
  name: 'login',
  hidden: true,
  meta: {
    name: '登录'
  },
  component: () => import('./index')
}

export const register = {
  path: '/register',
  name: 'register',
  hidden: true,
  meta: {
    name: '注册'
  },
  component: () => import('./register')
}
