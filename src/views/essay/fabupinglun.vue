<template>
  <div class="comment-post">
      <!-- 发布评论组件 -->
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="btn">发布</van-button>
  </div>
</template>

<script>
import { PostCommentsapi } from "@/api/commentapi";
export default {
  components: {},
  props: {
    obj: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
    inject: {
        essayid:{
          default:null
        }
    },
  methods: {
    async btn() {
        if(this.message.length===0){
            return this.$toast('请输入内容')
        }
        this.$toast.loading({
            message:'发布中',
            forbidClick:true,
            duration:0
        })
        
      try {
        const { data } = await PostCommentsapi({
          target: this.obj.art_id,
          content: this.message,
          art_id: this.essayid,
        })

        this.$toast("发布成功");
        this.message = "";
        this.$emit("shows", data.data);
        console.log(data)

      } catch (arr) {
        this.$toast("发布失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
