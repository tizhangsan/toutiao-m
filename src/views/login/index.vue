<template>
  <div>
    <!-- 登录页面 -->
    <van-nav-bar title="注册"    > <van-icon slot="left" name="cross" style="color:red" @click="$router.back()"/>  </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginform">
      <van-field
        class="toutiao toutiao-shouji"
        v-model="user.mobile"
        placeholder="手机号"
        :rules="userFome.mobile"
        type="number"
        name="mobile"
      >
      </van-field>
      <van-field
        class="toutiao toutiao-yanzhengma"
        v-model="user.code"
        placeholder="验证码"
        :rules="userFome.code"
        type="number"
      >
        <template #button>
            <van-count-down time="6000" format="ss" v-if="ss"  @finish='ss=false'/>
          <van-button
            class="button"
            redue
            size="small"
            type="primary"
            @click.prevent="btn"
            v-else
            >发送验证码
          
          </van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginapi } from "@/api/user";
import {sendsms} from '@/api/user'
export default {
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
      userFome: {
        mobile: [
          { required: true, message: "请填写手机号" },
          { pattern: /^1[3|7|5|8]\d{9}$/, message: "格式错误" },
        ],
        code: [
          { required: true, message: "请填写验证码" },
          { pattern: /^\d{6}$/, message: "格式错误" },
        ],
      },
      ss: false,
    };
  },
  methods: {
    async onSubmit() {
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });
      let user = this.user;
      try {
        let res = await loginapi(user);
        console.log("成功", res);
        this.$toast.success("成功");
            this.$store.commit('setuser',res.data.data)
            this.$router.push('/my')

      } catch (err) {
        console.log("失败了", err);
        this.$toast.fail("失败了");
      }
    },
    async btn() {
      try {
        await this.$refs.loginform.validate("mobile");
        console.log("成功");
      } catch (arr) {
        return console.log("失败", arr);
      }
      this.ss = true;
      try{
      let api=   await sendsms(this.user.mobile)
    
      this.$toast('成功')
  


      }catch(arr){
          console.log('失败了',arr);
          this.ss=false
          if(arr.response.status===429){
            this.$toast('太频繁了')
          }else{
              this.$toast('发送失败')
          }

      }
    },
  },
};
</script>

<style lang="less" scoped>
.toutiao-shouji:before,
.toutiao-yanzhengma:before {
  font-size: 19px;
}
.button {
  background-color: #ededed;
  color: #666666;
}
.van-cell {
  border: 1px solid #eeeeee;
}


.van-nav-bar .van-icon {
  color: #fff;
}
</style>
