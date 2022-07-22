<template>
  <div>
    <!-- 历史 -->
    <van-cell title="历史记录">
      <div v-if="show">
        <span @click="but">全部清空</span>
        <span style="padding-left:10px" @click="show=false">完成</span>
      </div>
      <van-icon name="delete-o" v-else  @click="show=true"/>
    </van-cell>

    <van-cell :title="arr" v-for="(arr, i) in arr" :key="i" @click="btn(arr,i)">
      <van-icon name="close" v-if="show" />
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    arr: {
      type: Array,
    },
  },
  data(){
    return{
      show:false
    }
  },
  methods:{
    btn(arr,i){
      if(this.show){//删除
          this.arr.splice(i,1)
          if(this.arr.length===0){
            this.show=false
          }
      }else{
          this.$emit('cc',arr)
      }
    },
    but(){
     
     this.$emit('mm')
     show=false
    }
  }
};
</script>

<style>

</style>