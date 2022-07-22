<template>
  <div>
      <!-- 关注组件 -->
         <van-button
            v-if="zz.is_followed"
               :loading='tt'
            @click="api(zz.aut_id)"   
            class="follow-btn"
            round
            size="small"
          >已关注</van-button>
          <van-button
          v-else
             @click="api(zz.aut_id)"  
             :loading='tt'
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            >关注</van-button
          >
  </div>
</template>

<script>
import {pushconcernapi} from '@/api/user'  //添加关注
import {remconcernapi} from '@/api/user' //删除关注
export default {
    props:{
        zz:{
            require:true
        }
    },
    methods:{
         async  api(id){
        this.tt=true
        if(this.zz.is_followed){//取消关注
          try{
               await remconcernapi(id)
              //    this.zz.is_followed=false
                    this.$emit('update',!this.zz.is_followed)
                     this.$toast('取消关注成功')
          }catch(arr){
             
                  this.$toast('取消关注失败')
          }


        }else{  //添加关注
            try{
               await pushconcernapi(id)
            //     this.zz.is_followed=true
                      this.$emit('update',!this.zz.is_followed)
                this.$toast('关注成功')
            }catch(arr){
            
              this.$toast('关注失败')
            }

        }
        this.tt=false
    }  
    },
    data(){
        return{
             tt:false
        }
    }
}
</script>

<style>

</style>