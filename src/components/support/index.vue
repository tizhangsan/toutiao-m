<template>
  <div>
    <!-- 点赞组件 -->
    <van-button
      :icon="value === 1 ? `good-job` : `good-job-o`"
      :class="{ bb: value === 1 }"
      @click="collection"
    />
  </div>
</template>

<script>
import { supportapi, remsupportapi } from "@/api/user";
export default {
  props: {
    value: {
      type: Number,
      require: true,
    },
    id: {
      require: true,
    },
  },
  methods: {
    async collection() {
      try {
          let num=-1
        if (this.value === 1) {
          //取消点赞
             await remsupportapi(this.id);
      
        } else {
          //点赞
          await supportapi(this.id);
         num=1
        }
        this.$emit('input',num)
        this.$toast(num === 1 ? "点赞成功" : "取消点赞");
      } catch (arr) {
        console.log("点赞失败", arr);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.bb {
  color: red;
}
</style>