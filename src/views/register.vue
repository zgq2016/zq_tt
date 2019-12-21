<template>
  <div class="login">
    <!-- cross 关闭 -->
    <van-icon name="cross" size="30" />
    <!-- logo -->
    <div class="iconfont iconnew"></div>
    <!-- input -->
    <van-cell-group>
      <van-field
        v-model="users.username"
        label="用户名"
        placeholder="用户名/手机号"
        :error-message="err_msg"
        @input="handleInput"
      />
      <van-field v-model="users.nickname" label="昵称" placeholder="昵称" />
      <van-field v-model="users.password" type='password' label="密码" placeholder="密码" />
    </van-cell-group>
    <!-- 登录 -->
    <van-button type="primary" @click="register">注册</van-button>
  </div>
</template>

<script>
import { register } from '@/api/user.js'
export default {
  data () {
    return {
      users: {
        username: '',
        nickname: '',
        password: ''
      },
      err_msg: ''
    }
  },
  methods: {
    async register () {
      let res = await register(this.users)
      console.log(res)
      if (res.data.message === '注册成功') {
        this.$toast.success(res.data.message)
        this.$router.push({ name: 'Login' })
      }
    },
    handleInput (username) {
      if ((/^1[34578]\d{9}$/.test(username))) {
        this.err_msg = ''
      } else {
        this.err_msg = '手机号格式错误'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .van-icon-cross {
    padding: 10px;
  }
  .iconnew {
    color: red;
    font-size: 100vw * 100/360;
    // margin: 0 auto;
    text-align: center;
  }
  .account {
    font-size: 10vw * 100/360;
    text-align: right;
    padding-right: 20vw * 100/360;
    margin: 10vw * 100/360;
  }
  .van-button--normal {
    width: 90%;
    margin: 10vw * 100/360 5%;
  }
}
</style>
