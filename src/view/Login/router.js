export const login = {
  path: '/login',
  name: 'Login',
  hidden: true,
  meta: {
    name: '登录'
  },
  component: () => import('./index')
}

export const register = {
  path: '/register',
  name: 'Register',
  hidden: true,
  meta: {
    name: '注册'
  },
  component: () => import('./register')
}
