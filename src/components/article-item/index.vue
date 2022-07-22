<template>
  <div>
    <van-cell :to="`essay/${text.art_id}`">
      <!-- 标题 -->
      <div class="bboo van-multi-ellipsis--l2" slot="title">
        {{ text.title }}
      </div>
      <!-- 图片  -3 -->
      <div slot="label" class="img3" v-if="text.cover.type === 3">
        <div v-for="(img, i) in text.cover.images" :key="i">
          <van-image class="ii" width="100" :src="img" />
        </div>
      </div>
      <!-- 描述 -->
      <div slot="label">
        <span> {{ text.aut_name }} </span>
        <span> {{ text.comm_count }} </span>
        <span> {{ text.pubdate | relativeTime }} </span>
      </div>
      <!-- 图片  一张 右 -->
      <div class="img" slot="default">
        <van-image
          v-if="text.cover.type === 1"
          width="100"
          :src="text.cover.images[0]"
        />
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style lang="less" scoped>
.img {
  flex: unset;
}
.van-cell__value {
  flex: unset;
  margin-left: 10px;
}
.bboo {
  font-size: 16px;
}
.img3 {
  display: flex;
  height: 78px;
  margin: 5px 0;
  .ii {
    flex: 1;
    height: 78px;
    margin-left: 10px;
  }
}
</style>