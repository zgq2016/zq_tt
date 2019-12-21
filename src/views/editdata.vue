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
    <van-cell title="昵称" is-link :value="users.nickname" @click="nickShow=!nickShow" />
    <van-cell title="密码" is-link @click="passShow=!passShow" value="*****"></van-cell>
    <!-- <van-cell title="密码" is-link type='password' :value="users.password" @click="passShow=!passShow" /> -->
    <van-cell title="性别" is-link :value="users.gender===1?'男':'女'" @click="genderShow=!genderShow" />
    <!-- 弹框 -->
    <!-- nickname -->
    <van-dialog v-model="nickShow" title="编辑昵称" show-cancel-button @confirm="updateNick">
      <van-field :value="users.nickname" placeholder="编辑昵称" ref="nickname" />
    </van-dialog>
    <!-- password -->
    <van-dialog
      v-model="passShow"
      title="修改密码"
      show-cancel-button
      @confirm="updatePass"
      :before-close="beforeClose"
    >
      <van-field placeholder="旧密码" ref="oldpass" />
      <van-field placeholder="新密码" ref="newpass" />
    </van-dialog>
    <!-- gender -->
    <van-dialog v-model="genderShow" title="选择性别" show-cancel-button @confirm="updateGender" width='200'>
      <van-radio-group v-model="radio">
        <van-radio label-position='left' name="0">女</van-radio>
        <van-radio label-position='left' name="1">男</van-radio>
      </van-radio-group>
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
      id: '',
      users: {},
      nickShow: false,
      passShow: false,
      genderShow: false,
      radio: ''
    }
  },
  methods: {
    // 性别
    async updateGender () {
      this.users.gender = Number(this.radio)
      // this.radio = this.users.gender
      console.log(this.radio)
      console.log(this.users.gender)
      let res = await userUpdate(this.id, { gender: this.radio })
      console.log(res)
      if (res.data.massage === '修改成功') {
        this.$toast.success(res.data.massage)
        this.users.gender = Number(this.radio)
      }
    },
    // 修改密码取消事件
    beforeClose (action, done) {
      let oldPwd = this.$refs.oldpass.$refs.input.value
      let password = this.$refs.newpass.$refs.input.value
      // 2.判断输入的原密码是否和真正的原始密码一致
      // 只有单击了确定的时候才需要让原始密码输入正确
      if (action === 'confirm' && this.users.password !== oldPwd) {
        this.$toast.fail('原始密码输入不正确')
        done(false)
      } else if (action === 'confirm' && !/\w{3,16}/.test(password)) {
        this.$toast.fail('请输入3~16位的新密码')
        done(false)
      } else {
        done()
      }
    },
    // 修改密码
    async updatePass () {
      // console.log(this.$refs.oldpass.$refs.input.value)
      let oldpass = this.$refs.oldpass.$refs.input.value
      if (this.users.password === oldpass) {
        let password = this.$refs.newpass.$refs.input.value
        if (!/\w{3,16}/.test(password)) {
          this.$toast.fail('请输入3~16位的新密码')
          return
        }
        let res = await userUpdate(this.id, { password })
        console.log(res)
        if (res.data.message === '修改成功') {
          this.$toast.success(res.data.message)
          localStorage.clear()
          this.$router.push({ name: 'Login' })
        }
      }
    },
    // 编辑昵称
    async updateNick () {
      // let id = localStorage.getItem('zq_id')
      // console.log(this.$refs.nickname.$refs.input.value)
      let nickname = this.$refs.nickname.$refs.input.value
      let res = await userUpdate(this.id, { nickname })
      // console.log(res)
      if (res.data.message === '修改成功') {
        this.$toast.success(res.data.message)
        this.users.nickname = res.data.data.nickname
      }
    },
    // 上传图片
    async afterRead (file) {
      // console.log(file)
      let formdata = new FormData()
      formdata.append('file', file.file)
      let res = await uploadFile(formdata)
      // console.log(res)
      if (res.data.message === '文件上传成功') {
        // let id = localStorage.getItem('zq_id')
        let res1 = await userUpdate(this.id, { head_img: res.data.data.url })
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
  // 默认数据
  async mounted () {
    this.id = localStorage.getItem('zq_id')
    let baseurl = localStorage.getItem('baseurl')
    let res = await userDetail(this.id)
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
  /deep/.van-icon-success{
    border: 1px solid #000;
    border-radius: 50%;
  }
}
</style>
