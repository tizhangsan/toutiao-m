<template>
  <div>
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('cc')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { EditMaterialsapi } from "@/api/user"

export default {
  props: {
    value: {
      type: Number,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      i: this.value,
    };
  },
  methods: {
    async onConfirm() {
      
      try {
        await EditMaterialsapi({
          gender: this.i,
        });
   
        this.$emit("input", this.i);
        this.$emit("cc");
        this.$toast("成功");
      } catch {
        this.$toast("修改失败");
      }
    },
    onChange(picker, value, index) {
      this.i = index
    },
  },
};
</script>

<style>
</style>