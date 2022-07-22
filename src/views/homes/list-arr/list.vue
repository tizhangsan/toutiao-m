
<template>
  <div class="box2">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      success-duration="1500"
      :success-text="text"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >

        <articleItem   v-for="(item, i) in list" :key="i" :text="item" />   
      
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
function findScroller(element) {
  element.onscroll = function () {
    console.log(element);
  };

  Array.from(element.children).forEach(findScroller);
}

findScroller(document.body);

import { recommendapi } from "@/api/text/index";
import articleItem from "@/components/article-item/index.vue";
export default {
  props: ["obj"],
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      date: null,
      isLoading: false,
      text: "刷新成功",
    };
  },

  methods: {
    async onLoad() {
      try {
        let res = await recommendapi({
          channel_id: this.obj.id,
          timestamp: this.date || Date.now(),
          with_top: 0,
        });

        this.list.push(...res.data.data.results);

        this.loading = false;
        if (res.data.data.results.length) {
          this.date = res.data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (arr) {
        console.log("失败", arr);
        console.log(this.obj.id);
      }
    },
    async onRefresh() {
      try {
        let res = await recommendapi({
          channel_id: this.obj.id,
          timestamp: Date.now(),
          with_top: 0,
        });
        let { results } = res.data.data;
        this.list.unshift(...results);
        this.text = `刷新成功 更新了 ${results.length}条数据`;
        this.isLoading = false;
      } catch (arr) {
        this.isLoading = false;
        this.text = "刷新失败";
      }
    },
  },
  components: {
    articleItem,
  },
};
</script>

<style lang="less" scoped>
.box2 {
  height: 79vh;
  overflow-y: auto;
  // width: 97vh;
}
</style>