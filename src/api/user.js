// import axios from 'axios'
// axios.defaults.baseURL = 'http://127.0.0.1:3000'
import axios from '@/utils/zq_axios.js'
// 登录
export const userLogin = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
// 用户详情
export const userDetail = (id) => {
  return axios({
    method: 'get',
    url: `/user/${id}`
  })
}
