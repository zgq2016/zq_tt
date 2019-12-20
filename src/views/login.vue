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
        error-message="手机号格式错误"
      />
      <van-field v-model="users.password" label="密码" placeholder="密码" />
    </van-cell-group>
    <!-- 注册账号 account number -->
    <div class="account">
      没有账号?
      <a href="/account">注册账号</a>
    </div>
    <!-- 登录 -->
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: {
        username: '',
        password: ''
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
