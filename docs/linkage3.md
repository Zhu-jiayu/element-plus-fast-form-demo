## 效果预览

<DemoLinkage3 />

## 示例代码

::: code-group

```vue [index.vue]
<template>
  <h3>表单项联动示例(slot)</h3>
  <FastFormC>
    <template #food="{ modelValue }">
      <el-select :model-value="modelValue" placeholder="请选择" @change="handleSelectChange">
        <el-option v-for="item in foodOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </template>

    <template #type="{ modelValue }">
      <el-radio-group :model-value="modelValue" placeholder="请选择" @change="handleRadioChange">
        <el-radio v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-radio-group>
    </template>
  </FastFormC>
  <el-space>
    <el-button @click="submitC" type="primary">提交</el-button>
    <el-button @click="resetC">重置</el-button>
  </el-space>
</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form";

import { attrs, formConfigC } from "./config";
import { ElMessage } from "element-plus";
import { ref } from "vue";

// slot-表单项联动

const foodOptions = ref([
  { label: "猪肉", value: "pork" },
  { label: "牛肉", value: "beef" },
]);
const typeOptions = ref([
  { label: "bbq", value: "bbq" },
  { label: "水煮", value: "water" },
]);
const {
  FastForm: FastFormC,
  rawFormValue: rawFormValueC,
  formRef: formRefC,
  setFormValue: setFormValueC,
} = useForm({
  ...attrs,
  formConfig: formConfigC,
});

const submitC = () => {
  if (formRefC.value) {
    formRefC.value.validate((valid: boolean) => {
      if (valid) {
        ElMessage.warning("查看控制台");
        console.log({ rawFormValueC });
      }
    });
  }
};
const resetC = () => {
  if (formRefC.value) {
    formRefC.value.resetFields();
  }
};

function handleSelectChange(value: string) {
  setFormValueC({
    food: value,
  });

  if (value === "beef") {
    setFormValueC({
      type: "bbq",
    });
  } else {
    setFormValueC({
      type: "water",
    });
  }
}

function handleRadioChange(value: string) {
  setFormValueC({
    type: value,
  });
}
</script>

```

```ts [config.ts]
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

export const formConfigC = [
  {
    colProps: {
      span: 12,
    },
    component: "slot",
    defaultValue: "pork",
    formItemProps: {
      prop: "food",
      label: "食材",
    },
  },

  {
    colProps: {
      span: 12,
    },
    defaultValue: "water",
    component: "slot",
    formItemProps: {
      prop: "type",
      label: "烹饪方式",
    },
  },
];

```

:::

