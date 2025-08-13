<template>
  <el-radio-group
    :model-value="props.modelValue"
    placeholder="请选择"
    @change="handleSelectChange"
  >
    <el-radio
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-radio-group>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, onUpdated } from "vue";

const options = ref([
  { label: "bbq", value: "bbq" },
  { label: "水煮", value: "water" },
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
});
const emits = defineEmits(["update:modelValue"]);

function handleSelectChange(value: string) {
  emits("update:modelValue", value);
}

// 观察组件更新
onUpdated(() => {
  console.log("Radio组件 updated, 当前值:", props.modelValue);
});
</script>
