<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <!-- <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    > -->
    <van-cell>
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px"
        :src="obj.aut_photo"
      />
      <span style="color: #466b9d" slot="title">{{ obj.aut_name }}</span>
      <div slot="label">
        <p style="color: #363636">{{ obj.content }}</p>
        <p>
          <span style="margin-right: 10px">{{
            obj.pubdate | relativeTime
          }}</span>
          <van-button size="mini" type="default"
          @click="$emit('replyclick',obj)"
            >回复 {{ obj.reply_count }}
          </van-button>
        </p>
      </div>
      <van-icon
        slot="right-icon"
        :name="obj.is_liking ? 'like' : 'like-o'"
        @click="zan"
        :class="{
          bb: obj.is_liking,
        }"
        :loading='loading'
      >
        {{ obj.like_count || "赞" }}
      </van-icon>
    </van-cell>
    <!-- </van-list> -->
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <!-- <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group> -->
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { CommentCancelLikeapi, CommentLikeapi } from "@/api/commentapi";
export default {
  name: "ArticleComment",
  props: {
    obj: {
      type: Object,
      
    },
  
  },
  data() {
    return {
      list: [], // 评论列表
  //    loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      loading:false
    };
  },

  methods: {
    // onLoad() {
    //   // 异步更新数据
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1);
    //     }
    //     // 加载状态结束
    //     this.loading = false;

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true;
    //     }
    //   }, 500);
    // },
   async zan() {  
        this.loading=true
        try{
            if(this.obj.is_liking){//取消点赞
                await CommentCancelLikeapi(this.obj.com_id)
                  this.obj.like_count--
            }else{ //点赞
            console.log(this.obj.is_liking);
                  await CommentLikeapi(this.obj.com_id)
                   this.obj.like_count++
            }
            this.obj.is_liking=!this.obj.is_liking
           

        }catch(arr){
            this.$toast('操作失败')
        }
        this.loading=false
      
    },
  },
};
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
.bb {
  color: red;
}
</style>