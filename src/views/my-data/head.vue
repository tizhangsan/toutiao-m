<template>
  <div class="box">
    <!-- 编辑头像组件 -->
    <img :src="img" class="img" ref="img" />
    <div class="bb">
      <div class="cc xx" @click="$emit('jj')">取消</div>
      <div class="cc zz" @click="bbvc">完成</div>
    </div>
  </div>
</template>

<script>
import Cropper from "cropperjs";

import "cropperjs/dist/cropper.css";
import { imgapi } from "@/api/user";
export default {
  props: {
    img: {
      require: true,
    },
  },
  data() {
    return {
      cropper: null,
    };
  },
  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    });
  },
  methods: {
    bbvc() {
      // console.log(this.cropper.getData());
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        console.log(blob);
        // 一  如果接口文档要求是 json
        //   const {data}= await imgapi({
        //      photo:  blob
        //   })

        //   二  如果接口文档里的参数是formdata就
        const formData = new FormData(); //new 出一个formdata实例
        formData.append("photo", blob); // 给这个实例添加key  网络请求直接把这个传过去
        const { data } = await imgapi(formData);
        console.log(data)
        this.$emit('jj')
        this.$emit('tou',data.data.photo)

      });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  background-color: #000;
  height: 100%;
}
.img {
  display: block;
  max-width: 100%;
}

.bb {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  .cc {
    font-size: 20px;
    color: #fff;
  }
  .xx {
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .zz {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>