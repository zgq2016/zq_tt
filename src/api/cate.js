// 这个文件主要用来处理与栏目分类相关的业务
import axios from '@/utils/zq_axios.js'

// 获取栏目数据
export const getCateList = () => {
  return axios({
    url: '/category'
  })
}
