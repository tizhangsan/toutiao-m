<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="outcomeshow = false"
        background="red"
      />
    </form>

    <!-- 结果 -->
    <outcome v-if="outcomeshow" :str="value" />

    <!-- 推荐 -->
    <recommend v-else-if="value" :str="value" @li="onSearch" />

    <!-- 历史 -->
    <history v-else :arr="arr" @mm='ii' @cc='onSearch' />
  </div>
</template>

<script>
import history from "./history.vue"
import recommend from "./recommend.vue"
import outcome from "./outcome.vue"
import {setitem ,getitem} from '@/utlis/loca'
export default {
  data() {
    return {
      value: "",
      outcomeshow: false,
      arr:getitem('lishi')|| [], //搜索记录
    };
  },
  methods: {
    onSearch(val) {
      let i = this.arr.indexOf(val);
      if (i != -1) {
        this.arr.splice(i, 1);
      }
      this.arr.unshift(val);
    
      this.outcomeshow = true
          this.value = val
    },
    onCancel() {
      this.$router.back();
    },
    ii(){
        this.arr=[]

    }
   
  },
  components: {
    history,
    recommend,
    outcome,
  },
  watch:{
    arr(v){
        setitem('lishi',v)
      
    }
  }
};
</script>

<style>
</style>