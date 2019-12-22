<template>
  <div class="index">
    <!-- 头部 -->
    <van-nav-bar left-text="返回" left-arrow>
      <van-icon class="iconfont iconnew" slot="left" />
      <div class="search" slot="title">
        <van-icon name="search" />搜索新闻
      </div>
      <van-icon name="manager-o" slot="right" />
    </van-nav-bar>
    <van-tabs v-model="active" sticky swipeable>
      <van-tab v-for="v1 in cateList" :key="v1.id" :title="v1.name">
        <div v-for="v2 in v1.postList" :key="v2.id">
          <div class="single" v-if="v2.cover.length <= 2 && v2.type===1">
            <div class="left">
              <p class="content">{{v2.title}}</p>
              <p class="info">
                <span>{{v2.user.nickname}}</span>
                <span>{{v2.comment_length}}跟帖</span>
              </p>
            </div>
            <img :src="v2.cover[0].url" alt />
          </div>
          <div class="single1" v-else-if="v2.cover.length > 2 && v2.type === 1">
            <p class="content" style="padding: 0px 5px;">{{v2.title}}</p>
            <div class="imgs">
              <img v-for="item in v2.cover" :key="item.id" :src="item.url" alt />
            </div>
            <p class="info">
              <span>{{v2.user.nickname}}</span>
              <span>{{v2.comment_length}}跟帖</span>
            </p>
          </div>
          <div class="single2" v-else-if="v2.type === 2">
            <p class="content" style="padding: 0px 5px;">{{v2.title}}</p>
            <div class="myvideo">
              <img :src="v2.cover[0].url" alt />
              <div class="playbtn">
                <van-icon name="play" />
              </div>
            </div>
            <p class="info">
              <span>{{v2.user.nickname}}</span>
              <span>{{v2.comment_length}}跟帖</span>
            </p>
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
  methods: {
    async getPostList () {
      let res1 = await getArticleList({
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize,
        category: this.cateList[this.active].id
      })
      console.log(res1)
      this.cateList[this.active].postList = res1.data.data
      // console.log(res1.data.data[0].cover.length)
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
      this.getPostList()
    }
  },
  watch: {
    active () {
      if (this.cateList[this.active].postList.length === 0) {
        this.getPostList()
      }
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
  .single {
    padding: 15px 0px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    flex-wrap: wrap;
    .content {
      width: 200/360 * 100vw;
      display: -webkit-box;
      overflow: hidden;
      white-space: normal !important;
      text-overflow: ellipsis;
      word-wrap: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .info {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      color: #999;
      font-size: 12vw * 100/360;
    }
    img {
      width: 120/360 * 100vw;
      height: 70/360 * 100vw;
      object-fit: cover;
      padding-right: 5px;
    }
  }
  .single1 {
    .content {
      width: 100%;
      display: -webkit-box;
      overflow: hidden;
      white-space: normal !important;
      text-overflow: ellipsis;
      word-wrap: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    padding: 15px 0px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border-bottom: 1px solid #ccc;
    .imgs {
      flex: 1;
      display: flex;
      padding: 10px 0 0 0;
      > img {
        width: 33.33%;
        padding: 0 5px;
        box-sizing: border-box;
      }
    }
  }
  .single2 {
    padding: 15px 0px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border-bottom: 1px solid #ccc;
    .info {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      color: #999;
      font-size: 12vw * 100/360;
    }
    .myvideo {
      margin: 5px 0;
      width: 100%;
      position: relative;
      > img {
        width: 100%;
        display: block;
      }
      .playbtn {
        width: 50 * 100vw/360;
        height: 50 * 100vw/360;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        box-shadow: 0px 0px 10px #fff;
        text-align: center;
        color: #fff;
        font-size: 40px;
        .van-icon {
          line-height: 50 * 100vw/360;
        }
      }
    }
  }
}
</style>
