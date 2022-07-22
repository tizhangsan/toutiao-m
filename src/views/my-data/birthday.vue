<template>
  <div>
    <!-- 生日组件 -->
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('hh')"
      @confirm="api"
    />
  </div>
</template>

<script>
import { EditMaterialsapi } from "@/api/user";
import dayjs from "dayjs";
export default {
  props: {
    value: {},
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    };
  },
  methods: {
    async api() {
      try {
        const gg = dayjs(this.currentDate).format("YYYY-MM-DD")
        console.log(gg);
        await EditMaterialsapi({
          birthday: gg,
        });

        this.$emit("input", gg);
        this.$emit("hh");
        this.$toast("成功");
      } catch {
        this.$toast("修改失败");
      }
    },
  },
};

//   async onConfirm() {

//       try {
//         await EditMaterialsapi({
//           gender: this.i,
//         });

//         this.$emit("input", this.i);
//         this.$emit("cc");
//         this.$toast("成功");
//       } catch {
//         this.$toast("修改失败");
//       }
//     },
</script>

<style>
</style>