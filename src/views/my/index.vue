<template>
  <div>
    <!-- my 个人信息 -->
    <header v-if="user">
      <div class="top">
        <div class="left">
          <van-image round :src="obj.photo" />
          <span>{{obj.name}}</span>
        </div>

        <div class="right">
          <van-button round type="info" to="/user/mydata">编辑资料</van-button>
        </div>
      </div>

      <div class="bottom">
        <div>
          <span>{{obj.follow_count}}</span>
          <span>头条</span>
        </div>
        <div>
          <span>{{obj.art_count}}</span>
          <span>关注</span>
        </div>
        <div>
          <span>{{obj.fans_count}}</span>
          <span>粉丝</span>
        </div>
        <div>
          <span>{{obj.like_count}}</span>
          <span>获赞</span>
        </div>
      </div>
    </header>

    <header v-else>
      <div class="login_btn" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" /><br />
        <span> 登录/注册</span>
      </div>
    </header>

    <van-grid :column-num="2" clickable>
      <van-grid-item>
        <i class="toutiao toutiao-shoucang"></i>
        <span>收藏</span>
      </van-grid-item>

      <van-grid-item>
        <i class="toutiao toutiao-lishi"></i>
        <span>历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell title="消息提示" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell title="退出登录" @click="btnn" class="btn" v-if="user" >  </van-cell>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {userinfo} from '@/api/user'
export default {
  computed: {
    ...mapState(["user"]),
  },
  created(){
    if(this.user){
      this.userinfo()
    }
  },
  data(){
    return{
      obj:{}
    }
  },
  methods: {
    btnn() {
     this.$dialog.confirm({
       
        message: "确认退出码",
         closeOnPopstate: false,
      })
        .then(() => {
          // on confirm
          this.$store.commit('setuser',null)
        })
        .catch(() => {
          // on cancel
        })
    },
   async userinfo(){
      try{
         const {data}= await userinfo()
        console.log(data.data)
        this.obj=data.data
      }catch(arr){
        console.log('失败',arr);
        this.$toast(arr.response.data)
      }
    }
  },
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
body {
  background-color: #333;
}
header {
  height: 180px;

  background-image: url("~@/assets/banner.png");
  background-size: cover;
  .login_btn {
    text-align: center;

    //  line-height: 180px;
    img {
      margin-top: 50px;
      margin-bottom: 10px;
      width: 40px;
      height: 40px;
    }
    span {
      font-size: 18px;
      height: 10px;
    }
  }
}
.top {
  height: 130px;

  padding: 34px 10px 11px;
  display: flex;

  justify-content: center;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    .van-image {
      width: 70px;
      height: 70px;
      border: 1px solid #fff;
    }
    span {
      margin-left: 11px;
      font-size: 18px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .van-button {
      width: 90px;
      height: 25px;
      background-color: #333;
    }
  }
}
.bottom {
  height: 50px;
  display: flex;
  div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 15px;
    flex-direction: column;
  }
}
.van-grid i {
  color: red;
}
.btn {
  margin-top: 10px;
  text-align: center;
  color: red;
}
</style>