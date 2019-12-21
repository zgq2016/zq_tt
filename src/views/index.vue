<template>
  <div class="index">
    <!-- 头部 -->
    <van-nav-bar left-text="返回" left-arrow>
      <van-icon class="iconfont iconnew" slot="left" />
      <!-- <van-icon name="manager-o" slot="title" /> -->
      <div class="search" slot="title">
        <van-icon name="search" />搜索新闻
      </div>
      <van-icon name="manager-o" slot="right" />
    </van-nav-bar>
    <van-tabs v-model="active" sticky swipeable>
      <van-tab v-for="(v1) in cateList" :key="v1.id" :title="v1.name">
        <div class="news" v-for="(v2) in v1.postList" :key="v2.id">
          <p>{{v2.title}}</p>
          <img :src="v2.cover[0].url" alt />
          <div class="invitation">
            <span>{{v2.user.nickname}}</span>
            <span>{{v2.comment_length}}跟帖</span>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCateList } from '@/api/cate.js'
import { getArticleList } from '@/api/article.js'
export default {
  data () {
    return {
      cateList: [],
      active: localStorage.getItem('zq_token') ? 1 : 0
    }
  },
  async mounted () {
    let res = await getCateList()
    // console.log(res)
    if (res.status === 200) {
      this.cateList = res.data.data
      this.cateList = this.cateList.map((v, i) => {
        return {
          ...v,
          postList: [], // 新闻列表数据
          pageIndex: 1, // 页码
          pageSize: 5 // 每页个数
        }
      })
      let res1 = await getArticleList({
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize,
        category: this.cateList[this.active].id
      })
      console.log(res1)
      this.cateList[this.active].postList = res1.data.data
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  .van-nav-bar {
    background-color: red;
    border-bottom: 1px solid #ccc;
  }
  .van-nav-bar .van-icon {
    color: #eee;
    vertical-align: middle;
  }
  .van-nav-bar__left {
    font-size: 50vw * 100/360;
    left: 16px;
    top: -5px;
  }
  .van-icon-manager-o {
    font-size: 26vw * 100/360;
  }
  .search {
    width: 100%;
    height: 30vw * 100/360;
    line-height: 30vw * 100/360;
    font-size: 12px;
    margin: 6vw * 100/360 0;
    color: #fff;
    background-color: #a09e9e;
    border-radius: 20px;
  }
  .news {
    border-bottom: 2px solid #ccc;
    p {
      font-size: 14vw * 100/360;
    }
    .invitation {
      width: 200px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #999;
      font-size: 12vw * 100/360;
    }
    img {
      display: block;
      width: 100%;
      height: 100px;
      margin: 5px;
    }
  }
}
</style>
