<template>
  <div>
    <van-nav-bar :title="`${reply.reply_count}条回复`">
      <van-icon class="bb" slot="left" name="cross" @click="$emit('guan')">
      </van-icon>
    </van-nav-bar>
    <!--  -->
    <div class="box" @click.stop="ss=true">
      <pinglun :obj="reply" />
      <p>全部回复</p>
      <!-- 二级评论组件 -->
      <comment :comment="reply.com_id" type="c" />
    </div>
  <div class="bboo">
      <van-button  v-if="ss"  @click="ss=false"> 写评论 </van-button>
  <!-- 发布评论组件 -->
      <fabupinglun v-else :obj="reply.com_id">  </fabupinglun>
  </div>
  </div>
</template>

<script>
import pinglun from "../pinglun.vue";
import comment from "@/components/comment/index.vue"
import fabupinglun from '@/views/essay/fabupinglun.vue'
export default {
  props: {
    reply: {
      type: Object,
      require: true,
    },
  },

  components: {
    pinglun,
    comment,
    fabupinglun
  },
  data() {
    return {
      ss:true
    };
  },
};
</script>

<style lang="less" scoped>
/deep/.bb {
  color: #fff !important;
}
.bboo {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  .van-button{
    width: 100%;
  }
}
.box {
  position: fixed;
  top: 180px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}
</style>