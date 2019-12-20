import axios from '@/utils/zq_axios.js'
// 图片上传
export const uploadFile = (data) => {
  return axios({
    method: 'post',
    url: '/upload',
    data
  })
}
