<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="bb">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="zz.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ zz.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="zz.aut_photo"
          />
          <div slot="title" class="user-name">{{ zz.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ zz.pubdate | relativeTime }}
          </div>

          <concern :zz="zz" @update="zz.is_followed = $event" 
          
          ></concern>   
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content" v-html="zz.content" ref="imgss"></div>
        <van-divider>正文结束</van-divider>


        <!-- 评论弹层 -->
        <van-popup v-model="show" position="bottom"   >
          <!-- 发布组件 -->
          <fabu :obj='zz' @shows='gg'>   </fabu>  
        </van-popup>



          <!-- 二级评论弹曾 -->
        <van-popup v-model="replyshow" position="bottom" :style="{ height: '80%' }" >
              <erji :reply="reply" @guan='replyshow=false' v-if="replyshow" >   </erji>   
        </van-popup>











        <!-- 评论组件 -->
      <comment  :comment="zz.art_id" @con='consts=$event.total_count' :list="fulist"  @replyclick='baba' >    </comment>



        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small" @click="show=true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="consts" color="#777" />

          <!-- 收藏组件 -->
          <collection
            class="van-icon"
            v-model="zz.is_collected"
            :id="zz.art_id"
          >
          </collection>

          <!-- 点赞 -->
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <support v-model="zz.attitude" :id="zz.art_id"> </support>

          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->



      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="num === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="essayidapi">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { essayidapi } from "@/api/text/index"
import { ImagePreview } from "vant"
import concern from "@/components/concern/concern.vue"
import collection from "@/components/collection/index.vue"
import support from "@/components/support/index.vue"
import comment from '@/components/comment/index.vue'
import fabu from '@/views/essay/fabupinglun.vue'
import erji from '@/views/essay/er-ji/index.vue'

export default {
  name: "ArticleIndex",
  components: {
    concern,
    collection,
    support,
    comment,
    fabu,
    erji,//二级评论组件
  },
  provide: function () {
  return {
    essayid: this.essayid
  }
},
  props: {
    essayid: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      zz: {},
      bb: true,
      num: 0,
      tt: false,
      consts:0,
      show:false,
      fulist:[],
      replyshow:false,//二级弹层显示状态
      reply:{}
    };
  },
  computed: {},
  watch: {},
  created() {
    this.essayidapi();
  },
  mounted() {},
  methods: {
    async essayidapi() {
      this.bb = true;
      try {
        const { data } = await essayidapi(this.essayid);

        this.zz = data.data;
        console.log(data.data);

        setImmediate(() => {
          let aa = this.$refs["imgss"];
          let img = aa.querySelectorAll("img");
          let im = [];
          img.forEach((img, i) => {
            im.push(img.src);
            img.onclick = () => {
              ImagePreview({
                images: im,

                startPosition: i,
              });
            };
          });
        }, 0);
      } catch (arr) {
        if (arr.response && arr.response.status === 404) {
          this.num = 404;
        }
      }
      this.bb = false;
    },
    gg(data){
      this.show=false
      this.fulist.unshift(data.new_obj)
    },
    baba(x){
        this.replyshow=true
        this.reply=x
    }
  },
};
</script>


  <style  lang="less"  scoped>
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 10px;
      padding: 12px 8px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 16px;
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 8px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 12px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 11px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 85px;
        height: 29px;
      }
    }

    .article-content {
      padding: 27px 16px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 100px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 100px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 68px;
      color: #b4b4b4;
    }
    .text {
      font-size: 15px;
      color: #666666;
      margin: 16px 0 23px;
    }
    .retry-btn {
      width: 140px;
      height: 35px;
      line-height: 35px;
      border: 1px solid #c3c3c3;
      font-size: 15px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 142px;
      height: 23px;
      border: 2px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 8px;
        background-color: #e22829;
      }
    }
  }
}
</style>
