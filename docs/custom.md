## 效果预览

<DemoCustom />

## 示例代码

### index.vue
```vue
<template>
  <h3>自定义组件</h3>
  <FastForm />

  <el-space>
    <el-button @click="submit" type="primary">提交</el-button>
    <el-button @click="reset">重置</el-button>
  </el-space>
</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form";
import { formConfig, attrs } from "./config";
import { ElMessage } from "element-plus";

const { FastForm, formValue, formRef } = useForm({
  ...attrs,
  formConfig,
});

const submit = () => {
  if (formRef.value) {
    formRef.value.validate((valid: boolean) => {
      if (valid) {
        ElMessage.warning("查看控制台");
        console.log(formValue);
      }
    });
  }
};
const reset = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
};
</script>

```

### config.ts
```ts
import { defineAsyncComponent } from "vue";

// 新增表单样式配置
export const attrs = {
  colProps: {
    soan: 12,
  },
  rowProps: {
    gutter: 24,
  },
  formProps: {
    "label-position": "right",
    "label-suffix": "：",
    "label-width": "auto",
  },
};

// 新增表单配置
export const formConfig = [
  {
    component: defineAsyncComponent<any>(
      () => import("@/components/Avatar-upload/index.vue")
    ),
    formItemProps: {
      prop: "avatar",
      label: "头像",
    },
    componentProps: {},
  },
  {
    component: defineAsyncComponent<any>(
      () => import("@/components/Select/index.vue")
    ),
    formItemProps: {
      prop: "select",
      label: "select",
    },
    defaultValue: "female",
  },
  {
 
    component: defineAsyncComponent<any>(
      () => import("@/components/Radio/index.vue")
    ),
    formItemProps: {
      prop: "radio-group",
      label: "radio-group",
    },
    defaultValue: "A",
  },
];

```

