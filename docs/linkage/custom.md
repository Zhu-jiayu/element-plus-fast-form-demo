## 效果预览

<DemoLinkage2 />

## 示例代码

::: code-group

```vue [index.vue]
<template>
  <h3>表单项联动示例(自定义组件)</h3>
  <FastFormB />
  <el-space>
    <el-button @click="submitB" type="primary">提交</el-button>
    <el-button @click="resetB">重置</el-button>
  </el-space>
</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form";

import { attrs, formConfigB } from "./config";
import { ElMessage } from "element-plus";



// 自定义组件-表单项联动
const {
  FastForm: FastFormB,
  rawFormValue: rawFormValueB,
  formRef: formRefB,
} = useForm({
  ...attrs,
  formConfig: formConfigB,
});

const submitB = () => {
  if (formRefB.value) {
    formRefB.value.validate((valid: boolean) => {
      if (valid) {
        ElMessage.warning("查看控制台");
        console.log({ rawFormValueB });
      }
    });
  }
};
const resetB = () => {
  if (formRefB.value) {
    formRefB.value.resetFields();
  }
};

</script>

```

```ts [config.ts]
import { defineAsyncComponent } from "vue";

// 新增表单样式配置
export const attrs = {
  colProps: {
    span: 6,
  },
  rowProps: {
    gutter: 24,
  },
  formProps: {
    "label-suffix": "：",
    "label-width": "auto",
    "label-position": "top",
  },
};

export const formConfigB = [
  {
    component: defineAsyncComponent<any>(
      () => import("./components/Select/index.vue")
    ),
    formItemProps: {
      prop: "food",
      label: "食材",
    },
    defaultValue: "pork",
  },
  {
    colProps: {
      span: 6,
    },
    component: defineAsyncComponent<any>(
      () => import("./components/Radio/index.vue")
    ),
    formItemProps: {
      prop: "type",
      label: "烹饪方式",
    },
    defaultValue: "water",
  },
];

```

```vue [views/linkage2/components/Select/index.vue]
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

```

```vue [views/linkage2/components/Radio/index.vue]
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

```

:::

