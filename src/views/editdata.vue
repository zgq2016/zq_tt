<template>
  <div class="editdata">
    <!-- Navbar -->
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 上传图片 -->
    <div class="imgs">
      <img src="../assets/aaa.png" alt="">
    </div>
    <!-- 数据 -->
    <van-cell title="昵称" is-link value="火星网友" />
    <van-cell title="密码" is-link value="***" />
    <van-cell title="性别" is-link value="男" />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.editdata{
  .imgs{
    text-align: center;
    margin: 10px 0;
    img{
      width: 70vw*100/360;
      height: 70vw*100/360;
    }
  }
}
</style>
