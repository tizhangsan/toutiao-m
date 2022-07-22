<template>
  <div>
    <!-- 编辑昵称的组件 -->
    <van-nav-bar>
      <p slot="title">编辑昵称</p>
      <van-icon slot="left" @click="$emit('ss')" name="cross" />
      <van-icon slot="right" name="success" @click="getapi" />
    </van-nav-bar>

    <van-field
      v-model.trim="message"
      rows="2"
      autosize
  
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import {EditMaterialsapi} from '@/api/user'
export default {
    props:{
        value:{
            require:true,
        }
    },
    data(){
        return{
            message:this.value
        }
    },
    methods:{
   async  getapi(){
            if(!this.message.length){
                return this.$toast('请输入内容')
            }
            if(this.message===this.value){
                return this.$toast('改个毛')
            }
            try{
              await EditMaterialsapi({
                 name:this.message
             })
             
                this.$emit('input',this.message)
                this.$emit('ss')
                this.$toast('成功')
            }catch{
                this.$toast('修改失败')
            }

        }
    }
};
</script>

<style lang="less" scoped>
    
.van-field{
    background-color: rgb(230, 235, 236);
}
</style>