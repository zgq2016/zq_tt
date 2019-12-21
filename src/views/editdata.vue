<template>
  <div class="editdata">
    <!-- Navbar -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" />
    <!-- 上传图片 -->
    <div class="imgs">
      <img :src="users.head_img" alt />
      <van-uploader :after-read="afterRead" />
    </div>
    <!-- 数据 -->
    <van-cell title="昵称" is-link :value="users.nickname" @click="nicknameShow=!nicknameShow" />
    <van-cell title="密码" is-link :value="users.password" />
    <van-cell title="性别" is-link :value="users.gender===1?'男':'女'" />
    <!-- 弹框 -->
    <!-- nickname -->
    <van-dialog v-model="nicknameShow" title="编辑昵称" show-cancel-button @confirm='updateNick'>
      <van-field :value='users.nickname' placeholder="编辑昵称" ref="nickname" />
    </van-dialog>
  </div>
</template>

<script>
//
import { userDetail, userUpdate } from '@/api/user.js'
import { uploadFile } from '@/api/uploadFile.js'
export default {
  data () {
    return {
      users: {},
      nicknameShow: false
    }
  },
  methods: {
    async updateNick () {
      let id = localStorage.getItem('zq_id')
      // console.log(this.$refs.nickname.$refs.input.value)
      let nickname = this.$refs.nickname.$refs.input.value
      let res = await userUpdate(id, { nickname })
      // console.log(res)
      if (res.data.message === '修改成功') {
        this.$toast.success(res.data.message)
        this.users.nickname = res.data.data.nickname
      }
    },
    async afterRead (file) {
      // console.log(file)
      let formdata = new FormData()
      formdata.append('file', file.file)
      let res = await uploadFile(formdata)
      // console.log(res)
      if (res.data.message === '文件上传成功') {
        let id = localStorage.getItem('zq_id')
        let res1 = await userUpdate(id, { head_img: res.data.data.url })
        if (res1.data.message === '修改成功') {
          this.$toast.success(res1.data.message)
          this.users.head_img =
            localStorage.getItem('baseurl') + res.data.data.url
        } else {
          this.$toast.success('修改失败')
        }
      } else {
        this.$toast('上传失败')
      }
    }
  },
  async mounted () {
    let id = localStorage.getItem('zq_id')
    let baseurl = localStorage.getItem('baseurl')
    let res = await userDetail(id)
    // console.log(res)
    this.users = res.data.data
    if (this.users.head_img) {
      this.users.head_img = baseurl + this.users.head_img
    } else {
      this.users.head_img = baseurl + '/uploads/image/default.png'
    }
  }
}
</script>

<style lang="less" scoped>
.editdata {
  .imgs {
    position: relative;
    img {
      width: 100vw * 100/360;
      height: 100vw * 100/360;
      margin: 20px auto;
      border-radius: 50%;
    }
    // 修改元素的大小
    /deep/.van-uploader__upload {
      width: 100 / 360 * 100vw;
      height: 100 / 360 * 100vw;
    }
    // 设置元素的对齐方式
    /deep/.van-uploader {
      // 实现任意元素居中
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }
  }
}
</style>
