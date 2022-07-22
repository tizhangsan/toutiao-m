<template>
  <div>
    <!-- 跟路由 -->
    <router-view> </router-view>

    <van-tabbar v-model="active" router>
      <van-tabbar-item class="ii" to='/'>
        <i class="toutiao toutiao-shouye"></i>
        <p>首页</p>
      </van-tabbar-item>
      <van-tabbar-item class="ii" to='/wenda'>
        <i class="toutiao toutiao-wenda"></i>
        <p>问答</p>
      </van-tabbar-item>
      <van-tabbar-item class="ii" to='/shipin'>
        <i class="toutiao toutiao-shipin"> </i>
        <p>视频</p>
      </van-tabbar-item>
      <van-tabbar-item class="ii" to='/my'>
        <i class="toutiao toutiao-wode"> </i>
        <p>{{$store.state.user? '我的':'未登录'}}</p>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: '',
    };
  },
};
</script>

<style lang="less" scoped>
i {
  font-size: 18px;
}
.ii {
  text-align: center;
}
</style>