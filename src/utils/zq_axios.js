import axios from 'axios'

let zqaxios = axios.create({
  baseURL: 'http://127.0.0.1:3000'
})
// Add a request interceptor
zqaxios.interceptors.request.use(function (config) {
  localStorage.setItem('baseurl', zqaxios.defaults.baseURL)
  // Do something before request is sent
  let token = localStorage.getItem('zq_token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
zqaxios.interceptors.response.use(function (response) {
  // if (response.data.message === '用户信息验证失败!' || response.data.message === '用户信息验证失败') {
  //   // 给出提示
  //   this.$toast.fail('用户信息验证失败')
  //   // 重定向
  //   location.href = '#/login'
  // }
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default zqaxios
