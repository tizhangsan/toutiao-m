<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(arr,i) in list" :key="i" :title="arr.title" />
    </van-list>
  </div>
</template>

<script>
import {searchapi} from '@/api/text/index'
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page:1,
      per_page:10,
    };
  },
  methods: {
    async    onLoad() {
       
        try{
         let {data:{data:{results}}}=   await searchapi({
                page: this.page ,
                per_page: this.per_page ,
                q:this.str,
         })
           
            this.list.push(...results)  
            this.loading=false
            if(results.length){
                this.page++

            }else{
                this.finished=true
            }
        }catch(arr){
          
        }
       
      
    },

  },
  props: {
    str: {
      type: String,
    },
  },


};
</script>

<style>
</style>