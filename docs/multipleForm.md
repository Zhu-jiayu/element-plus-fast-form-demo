# multipleForm 页面

## 效果预览

<DemoMultipleForm />

## 示例代码

### index.vue
```vue
<template>
  <h3>多表单示例</h3>

  <el-divider>表单A</el-divider>
  <FastFormA />
  <el-space>
    <el-button @click="submitA" type="primary">提交</el-button>
    <el-button @click="resetA">重置</el-button>
  </el-space>

  <el-divider>表单B</el-divider>
  <FastFormB />
  <el-space>
    <el-button @click="submitB" type="primary">提交</el-button>
    <el-button @click="resetB">重置</el-button>
  </el-space>
</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form"; // 直接从源码引入

import * as formConfigA from "./configA";
import * as formConfigB from "./configB";
import { ElMessage } from "element-plus";
import { watch } from "vue";

// 第一个表单
const {
  FastForm: FastFormA,
  formValue,
  formRef,
  rawFormValue,
} = useForm({ ...formConfigA, ...formConfigA.attrs });
const submitA = () => {
  if (formRef.value) {
    formRef.value.validate((valid: boolean) => {
      if (valid) {
        ElMessage.warning("查看控制台");
        console.log({ rawFormValue });
      }
    });
  }
};
const resetA = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
};

watch(
  () => formValue["el-select"],
  async (newVal) => {
    console.log("el-select value changed:", newVal);
  },
  {
    immediate: true,
    deep: true,
  }
);

// 第二个表单
const {
  FastForm: FastFormB,
  formValue: formValueB,
  formRef: formRefB,
  rawFormValue: rawFormValueB,
} = useForm({ ...formConfigB, ...formConfigB.attrs });
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

watch(
  () => formValueB["el-select"],
  async (newVal) => {
    console.log("el-select value changed:", newVal);
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

```

### configA.ts
```ts
// 新增表单样式配置
export const attrs = {
  colProps: {
    span: 6,
  },
  rowProps: {
    gutter: 24,
  },
  formProps: {
    "label-position": "right",
    "label-suffix": "：",
    "label-width": "auto",
    "model": {
      'el-select': 'female'
    }
  },
};

// 新增表单配置
export const formConfig = [
  {
    component: "el-select",
    defaultValue: "male",
    formItemProps: {
      prop: "el-select",
      label: "el-select",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "男", value: "male" },
        { label: "女", value: "female" },
      ],
    },
  },

  {
    colProps: {
      span: 18,
    },
    component: "el-radio-group",
    formItemProps: {
      prop: "el-radio-group",
      label: "el-radio-group",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "1", value: "Y" },
        { label: "2", value: "N" },
      ],
    },
  },
];

```

### configB.ts
```ts
// 新增表单样式配置
export const attrs = {
  colProps: {
    span: 6,
  },
  rowProps: {
    gutter: 24,
  },
  formProps: {
    "label-position": "right",
    "label-suffix": "：",
    "label-width": "auto",
    "model": {
      'el-select': 'banana'
    }
  },
};

// 新增表单配置
export const formConfig = [
  {
    component: "el-select",
    defaultValue: "male",
    formItemProps: {
      prop: "el-select",
      label: "el-select",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "苹果", value: "apple" },
        { label: "香蕉", value: "banana" },
      ],
    },
  },

  {
    colProps: {
      span: 18,
    },
    component: "el-radio-group",
    formItemProps: {
      prop: "el-radio-group",
      label: "el-radio-group",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "是", value: "Y" },
        { label: "否", value: "N" },
      ],
    },
  },
];

```

