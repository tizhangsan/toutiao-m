<template>
  <!-- 收藏组件 -->
  <div>
   

    <van-button
      :icon="value ? `star` : `star-o`"
      :class="{ bb: value }"
      @click="collection"
    />
  </div>
</template>

<script>
import { FavoriteArticlesapi, Unsellapi } from "@/api/user";
export default {
  props: {
    value: {
      type: Boolean,
      require: true,
    },
    id: {
      require: true,
    },
  },
  methods: {
    async collection() {
    
      try {
        if (this.value) {
          //取消
          await Unsellapi(this.id);
        } else {
          //收藏
          await FavoriteArticlesapi(this.id);
        }
        this.$emit("input", !this.value)
        this.$toast(!this.value?'收藏成功':'取消成功')
      } catch (arr) {
        console.log("收藏失败", arr);
        thus.$toast('操作失败 请稍后再试')
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.bb {
  color: red;
}
</style>