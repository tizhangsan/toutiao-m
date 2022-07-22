<template>
  <div class="bbooxx">
    <!-- 首页 -->
    <van-nav-bar fixed>
      <van-button
        style="color: #fff"
        slot="title"
        round
        type="info"
        icon="search"
        to="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!--  .van-nav-bar__title -->
    <van-tabs class="tab" v-model="active" id="ssdd">
      <van-tab :title="arr.name" v-for="arr in list" :key="arr.id" class="clas">
        <!-- 组件    -->
        <list :obj="arr"> </list>
      </van-tab>

      <div class="gengduo" @click="xianshi" slot="nav-right">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '90%' }"
    >
      <gengduo :mylist="list" :myactive="active" @shanchu="sc" @qq="ww">
      </gengduo>
    </van-popup>
  </div>
</template>

<script>
import { navapi } from "@/api/user";
import list from "@/views/homes/list-arr/list.vue";
import gengduo from "./gengduo.vue";
import { getitem } from "@/utlis/loca";
import { mapState } from "vuex";
export default {
  data() {
    return {
      active: 0,
      list: [], //数据
      show: false,
    };
  },
  created() {
   this.navapi();
  },
  components: {
    list,
    gengduo,
  },
  methods: {
    async navapi() {
      try {
        let  calsjh = []
        if (this.user) {
          const { data } = await navapi()

          calsjh = data.data.channels
        } else {
          let dd = getitem("toutiaoliebiao")
          if (dd) {
            calsjh = dd
          } else {
            const { data } = await navapi()

            calsjh = data.data.channels
          }
        }

        this.list = calsjh
      } catch (arr) {
        console.log("失败00", arr);
      }
    },
    xianshi() {
      this.show = true;
    },
    sc(arr, i) {
      this.list.splice(i, 1);
      if (i <= this.active) this.active -= 1;
    },
    ww(i) {
      this.active = i;
      this.show = false;
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="less" scoped>
.bbooxx {
  padding-bottom: 50px;
}
.van-nav-bar .van-icon {
  color: #fff;
}

//  .van-nav-bar__title{
//     max-width: unset!important;
// }
.van-nav-bar__title {
  max-width: 100%;
}
.van-button {
  background-color: #5babfb;
  width: 200px;
  height: 40px;
}
/deep/.tab {
  .van-tabs__line {
    background-color: #1989fa;
  }
  .van-tab__text--ellipsis {
    font-weight: 600;
  }
  .gengduo {
    position: fixed;
    right: 2px;
    margin-top: 11px;
    background-color: #fff;
    opacity: 0.921;
    font-size: 18px;
    width: 26px;
  }
}
/deep/.van-tabs__wrap--scrollable .van-tab {
  margin-right: 20px;
}
/deep/.van-tabs--line .van-tabs__wrap {
  position: relative;
  top: 45px;
  z-index: 2;
}
.clas {
  margin-top: 85px;
}
/deep/[data-v-45350a66] .van-tabs--line .van-tabs__wrap {
  position: relative !important;
}
.van-tabs--line .van-tabs__wrap {
  position: relative;
}

.clas[data-v-45350a66] {
  margin-top: 35px;
}
</style>