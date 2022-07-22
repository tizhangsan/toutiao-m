<template>
  <div>
    <!--推荐  -->
    <van-cell icon="search" v-for="(text, i) in list" :key="i">
      <span slot="title" v-html="ht(text)" @click="btn(text)"> </span>
    </van-cell>
  </div>
</template>

<script>
import { associationapi } from "@/api/text/index";
import { debounce } from "lodash";
export default {
  props: {
    str: {
      
    },
  },
  watch: {
    str: {
      // handler(k) {
      //  this.han(k)

      // },
      handler: debounce(function (q) {
        this.han(q);
      }, 700),
    
      immediate: true,
    },
  },
  methods: {
    async han(q) {
      try {
        let { data } = await associationapi(q);

        this.list = data.data.options;
      } catch (arr) {
       
      }
    },
    ht(text) {
      let bb = `<span style='color:red'>${this.str}</span>`;
      const reg = new RegExp(this.str, "gi");
      return text.replace(reg, bb);
    },
    btn(text){
       
        this.$emit('li',text)
        
    }
  },
  data() {
    return {
      list: [],
    };
  },
};
</script>

<style>
</style>