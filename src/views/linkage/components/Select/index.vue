<template>
  <el-select
    :model-value="props.modelValue"
    placeholder="请选择"
    @change="handleSelectChange"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
<script lang="ts" setup>
import { ref, defineProps, onUpdated, defineEmits } from "vue";

const options = ref([
  { label: "猪肉", value: "pork" },
  { label: "牛肉", value: "beef" },
]);
const props = defineProps({
  formValue: {
    type: Object,
    default: () => ({}),
  },
  modelValue: {
    // 当前组件数据
    type: String,
    default: "",
  },
  prop: {
    type: String,
  },
  // 用于设置表单项的值
  setFormValue: {
    type: Function,
    default: () => void 0,
  },
});
const emits = defineEmits(["update:modelValue"]);

function handleSelectChange(value: string) {
  emits("update:modelValue", value);

  if (value === "beef") {
    props.setFormValue({
      type: "bbq",
    });
  } else {
    props.setFormValue({
      type: "water",
    });
  }
}
onUpdated(() => {
  console.log("Select组件 updated, 当前值:", props.modelValue);
});
</script>
