<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      class="box"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- body -->


    <!-- 头像 -->

     <input type="file" hidden ref="file" @change="btn">
    <van-cell title="头像" is-link  >
      <van-image class="img" round fit="cover" :src="user.photo" @click="$refs.file.click()" />
    </van-cell>
     <van-popup
      v-model="headshow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!--编辑昵称的组件  -->
      <headss :img="img" @jj='headshow=false' @tou="user.photo=$event" v-if="headshow">    </headss>
    
    </van-popup>





    <van-cell title="生日" :value="user.birthday" is-link @click="birthdayshow=true" />
    <van-popup
      v-model="birthdayshow"
      position="bottom"

    >
      <!--编辑生日的组件  -->
        <birthday v-model="user.birthday" @hh='birthdayshow=false' >   </birthday>
    </van-popup>

    <!-- 昵称 -->
    <van-cell
      title="昵称"
      :value="user.name"
      @click.stop="nicknameshow = true"
      is-link
    >
    </van-cell>
    <!-- 编辑昵称 -->
    <van-popup
      v-model="nicknameshow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!--编辑昵称的组件  -->
      <nickname
        v-model="user.name"
        v-if="nicknameshow"
        @ss="nicknameshow = false"
      >
      </nickname>
    </van-popup>

    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      @click="ageshow = true"
      is-link
    />
    <van-popup v-model="ageshow" position="bottom">
      <!-- 编辑age组件 -->
      <age @cc="ageshow = false" v-model="user.gender"> </age>
    </van-popup>
  </div>
</template>

<script>
import { mydataapi } from "@/api/user";
import nickname from "./nickname.vue";
import age from "./age.vue"
import birthday from './birthday.vue'
import  headss from './head.vue'

export default {
  created() {
    this.mydataapi();
  },
  methods: {
    async mydataapi() {
      try {
        const { data } = await mydataapi();
        console.log(data.data, "00");
        this.user = data.data;
      } catch {
        this.$toast("加载失败");
      }
    },
    btn(){
        const file =this.$refs.file.files[0]
        const data =window.URL.createObjectURL(file)
        this.img=data
        this.headshow=true
        this.$refs.file.value=''
    }
  },
  data() {
    return {
      user: {},
      nicknameshow: false, // 编辑昵称的组件显示状态
      ageshow: false,
      birthdayshow:false,
      headshow:false,
      img:null
    };
  },
  components: {
    nickname,
    age,
    birthday,
    headss
  },
};
</script>

<style lang="less" scoped>
/deep/.van-nav-bar__content {
  background-color: red !important;
}
.img {
  margin-right: 10px;
  width: 30px;
  height: 30px;
}
</style>