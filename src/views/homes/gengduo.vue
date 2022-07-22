<template>
  <div class="box">
    <!-- 我的频道 -->
    <van-cell>
      <div slot="title">我的频道</div>
      <van-button
        round
        plain
        size="small"
        type="primary  "
        color="red"
        @click="btn"
      >
        {{ show === false ? "编辑" : "完成" }}
      </van-button>
    </van-cell>

    <van-grid :gutter="10" class="my">
      <van-grid-item
        v-for="(arr, i) in mylist"
        :key="i"
        :class="{ sse: myactive === i }"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="show && !is.includes(arr.id)"
        >
        </van-icon>
        <span slot="text" @click="split(arr, i)"> {{ arr.name }} </span>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell>
      <div slot="title">推荐频道</div>
    </van-cell>

    <van-grid :gutter="10" class="tuijian">
      <van-grid-item
        v-for="(val, i) in tuijian"
        :key="i"
        icon="plus"
        :text="val.name"
        @click="push(val)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { tuijianapi, pindaopushapi ,pindaoremovapi} from "@/api/user";
import { mapState } from "vuex";
import { setitem } from "@/utlis/loca";

//import { computed } from 'vue';
export default {
  data() {
    return {
      list: [], //推荐频道数据
      show: false, //显示小叉号
      is: [0],
    };
  },
  props: {
    mylist: {
      //我的频道数据
      type: Array,
      require: true,
    },
    myactive: {
      //索引
      type: Number,
      require: true,
    },
  },
  created() {
    this.tuijianapi();
  },
  methods: {
    async tuijianapi() {
      try {
        const { data } = await tuijianapi();
        this.list = data.data.channels;
        console.log(data.data.channels);
      } catch (arr) {
        console.log("失败", arr);
      }
    },
  async  push(k) {
      //添加频道列表
      this.mylist.push(k);

      if (this.user) {
        //已登录

        try {
          await   pindaopushapi({
            id: k.id,
            seq: this.mylist.length,
          });
          console.log('添加频道成功');
        } catch (arr) {
          console.log("添加频道失败", arr);
        }
      } else {
        //未登录
        setitem("toutiaoliebiao", this.mylist);
      }
    },
    btn() {
      this.show = !this.show;
    },
    split(arr, i) {
      if (this.show) {
        //编辑  要删除数据
        if (this.is.includes(i)) return;

        this.$emit("shanchu", arr, i);
        this.rem(arr)
      } else {
        //  切换目录
        this.$emit("qq", i);
      }
    },
   async rem(arr){  //删除数据
        if(this.user){   //已登录删除
           try{
                await  pindaoremovapi(arr.id)
                console.log('删除频道成功');
           }catch(arr){
               console.log('删除频道失败',arr);
           }
             

        }else{  //未登录  在本地删除
             setitem("toutiaoliebiao", this.mylist);
        }
    }
  },
  computed: {
    tuijian() {
      const lii = [];
      this.list.forEach((all) => {
        let rea = this.mylist.find((my) => {
          return all.id === my.id;
        });
        if (!rea) {
          lii.push(all);
        }
      });

      return lii;
    },
    ...mapState(['user']),
  },
};
</script>

<style lang="less" scoped>
.box {
  padding: 30px 0 0 0;
}
.van-button {
  height: 24px;
}
/deep/.van-grid-item__content {
  background-color: #f4f5f6;
  // width: 80px;
  height: 43px;
}
.van-cell {
  font-size: 18px;
  font-weight: 600;
}
.van-button__text {
  font-weight: 400;
}
//推荐
/deep/.tuijian {
  .van-grid-item__content {
    flex-direction: row;
  }
  .van-grid-item__text {
    margin-top: 0;
  }
  i {
    font-size: 16px;
  }
}

//我的
/deep/.my {
  .van-grid-item__icon {
    position: absolute;
    top: -10px;
    left: 69px;
    font-size: 0.74667rem;
    font-size: 20px;
    z-index: 3;
    color: #cacaca;
  }
}
/deep/.van-grid-item__icon + .van-grid-item__text {
  margin-top: 0;
}

/deep/ .sse {
  color: red;
}
/deep/.tuijian .van-grid-item__content {
  padding: 0;
}
/deep/.van-grid-item__icon-wrapper {
  .van-icon {
    position: absolute;
    top: -20px;
    right: -45px;
  }
}
</style>