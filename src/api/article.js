// 这个文件主要用于处理与新闻相关的业务
import axios from '@/utils/zq_axios.js'

// 所有新闻数据
export const getArticleList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
