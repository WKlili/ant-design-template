import store from 'store'

const TOKEN = 'token'

export function setToken (token) {
  store.set(TOKEN, token)
}

export function getToken () {
  return store.get(TOKEN)
}

export function clearToken () {
  store.remove(TOKEN)
}

export default {
  set: setToken,
  get: getToken,
  clear: clearToken
}
