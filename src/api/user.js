// import axios from 'axios'
// axios.defaults.baseURL = 'http://127.0.0.1:3000'
import axios from '@/utils/zq_axios.js'

export const userLogin = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
