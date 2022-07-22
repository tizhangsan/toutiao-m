<template>
  <div>
    <!-- 评论 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error="error"
      :immediate-check='false'
      error-text="加载失败 请重试"
      @load="onLoad"
    >
      <pinglun v-for="(arr, i) in list" :key="i" :obj="arr"
      @replyclick='$emit(`replyclick`, $event)'  />
    </van-list>
  </div>
</template>

<script>
import { commentapi } from "@/api/commentapi";
import pinglun from "@/views/essay/pinglun.vue";
export default {
  created() {
    this.onLoad();
  },
  components: {
    pinglun,
  },
  props: {
    comment: {
      //id
      require: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
    type:{
        type:String,
        default:'a'
    }
  },
  data() {
    return {
      //   list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false,
    };
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await commentapi({
          type: this.type,
          source: this.comment,
          offset: this.offset,
          limit: this.limit,
        });

        console.log(data, "data");
        const { results } = data.data;
        this.list.push(...results);

        this.loading = false;
        if (results.length) {
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
        this.$emit("con", data.data);
      } catch (arr) {
        console.log("获取评论失败", arr);
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>