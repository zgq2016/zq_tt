<template>
  <div class="personal">
    <!-- header -->
    <router-link to="/editdata">
      <div class="header">
        <div class="left">
          <img :src="personal.head_img" alt />
          <div>
            <div class="name iconfont iconxingbienan">{{personal.nickname}}</div>
            <div class="time">{{timer|timeformat}}</div>
          </div>
        </div>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </div>
    </router-link>
    <!-- 数据 -->
    <van-cell title="我的关注" is-link value="关注的用户" />
    <van-cell title="我的跟帖" is-link value="跟帖/回复" />
    <van-cell title="我的收藏" is-link value="文章/视频" />
    <van-cell title="设置" is-link />
    <!-- 退出 -->
    <van-button type="primary" @click="quit">退出</van-button>
  </div>
</template>

<script>
import { userDetail } from '@/api/user.js'
import { timeformat } from '@/utils/zq_filters.js'
export default {
  filters: {
    timeformat
  },
  data () {
    return {
      personal: {
        head_img: '',
        gender: 1,
        nickname: ''
      },
      timer: Date.now()
    }
  },
  methods: {
    quit () {
      localStorage.clear()
      this.$router.push({ name: 'Login' })
      this.$toast('退出成功')
    }
  },
  async mounted () {
    let id = localStorage.getItem('zq_id')
    let baseurl = localStorage.getItem('baseurl')
    let res = await userDetail(id)
    console.log(res)
    this.personal = res.data.data
    if (this.personal.head_img) {
      this.personal.head_img = baseurl + this.personal.head_img
    } else {
      this.personal.head_img = baseurl + '/uploads/image/default.png'
    }
    // this.users.nickname = res.data.data.nickname
    // console.log(baseurl + res.data.data.head_img)
    // this.users.head_img = baseurl + res.data.data.head_img
  }
}
</script>

<style lang="less" scoped>
.personal {
  background-color: #eee;
  .header {
    padding: 30vw * 100/360 0;
    display: flex;
    border-bottom: 5px solid #bbb;
    .left {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 70px;
        height: 70px;
        margin-right: 10px;
        border-radius: 50%;
      }
      div {
        .name {
          font-size: 14vw * 100/360;
          display: -webkit-box;
          overflow: hidden;
          white-space: normal !important;
          text-overflow: ellipsis;
          word-wrap: break-word;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .time {
          margin-top: 5px;
          font-size: 10vw * 100/360;
          color: #bbb;
        }
      }
    }
    .right {
      flex: 0 0 130vw*100/360;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .van-icon-arrow {
        padding: 10vw * 100/360;
      }
    }
  }
  .van-cell--clickable {
    border-bottom: 1px solid #ccc;
  }
  .van-button--normal {
    width: 90%;
    margin: 10vw * 100/360 5%;
  }
}
</style>
