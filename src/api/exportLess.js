import { post } from '../utils/request'

export default {
  set: data => post('http://localhost:3000/exportLess', data)
}
