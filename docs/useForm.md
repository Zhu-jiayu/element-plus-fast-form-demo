# useForm 页面

## 效果预览

<DemoUseForm />

## 示例代码

### index.vue
```vue
<template>
  <h3>基础示例</h3>
  <FastForm />

  <el-space>
    <el-button @click="submit" type="primary">提交</el-button>
    <el-button @click="reset">重置</el-button>
    <el-button @click="edit">赋值</el-button>
    <el-button @click="setFormDisabled(false)">启用表单</el-button>
    <el-button @click="setFormDisabled(true)">禁用表单</el-button>
  </el-space>
</template>

<script lang="ts" setup>
// import { useForm } from "../../../dist/index.umd.js"; // 从构建产物引入
import { useForm } from "element-plus-fast-form"; // 直接从源码引入

// import { useForm } from "element-plus-fast-form";
// const { useForm } = ElementPlusFastForm;
import { watch } from "vue";
import { formConfig, attrs } from "./config";
import { ElMessage } from "element-plus";

const {
  FastForm,
  formValue,
  formRef,
  rawFormValue,
  setFormDisabled,
  setFormValue,
} = useForm({
  ...attrs,
  formConfig,
});
const submit = () => {
  if (formRef.value) {
    formRef.value.validate((valid: boolean) => {
      if (valid) {
        ElMessage.warning("查看控制台");
        console.log({ formValue, rawFormValue });
      }
    });
  }
};
const reset = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
};
function edit() {
  setFormValue({
    "el-input": "啊",
  });
}

watch(
  () => rawFormValue,
  (newValue) => {
    console.log("watch----rawFormValue", newValue);
  },
  { deep: true, immediate: true }
);

watch(
  () => formValue,
  (newValue) => {
    console.log("watch----formValue", newValue);
  },
  { deep: true, immediate: true }
);
</script>

```

### config.ts
```ts

// 新增表单样式配置
export const attrs = {
  colProps: {
    span: 12,
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
    component: "el-input",
    formItemProps: {
      prop: "el-input",
      label: "el-input",
      rules: [
        {
          required: true,
          message: "请填写完整",
        },
        {
          validator: (
            _rule: any,
            value: string,
            callback: (arg0?: Error | undefined) => void
          ) => {
            if (/\w/.test(value)) {
              return callback(new Error("请输入非字母数字下划线字符"));
            }
            callback();
          },
          trigger: ["change", "blur"],
        },
      ],
    },
    componentProps: {
      placeholder: "去输入",
    },
  },

  {
    component: "el-select",
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
    component: "el-cascader",
    formItemProps: {
      prop: "el-cascader",
      label: "el-cascader",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        {
          label: "艺术",
          value: "艺术",
          children: [
            {
              label: "音乐",
              value: "1-1",
            },
            {
              label: "绘画",
              value: "1-2",
            },
          ],
        },
        {
          label: "体育",
          value: "2",
          children: [
            {
              label: "足球",
              value: "2-1",
            },
            {
              label: "拳击",
              value: "2-2",
            },
          ],
        },
      ],
    },
  },
  {
    component: "el-select",
    formItemProps: {
      prop: "el-select-multiple",
      label: "el-select-multiple",
    },
    componentProps: {
      placeholder: "去选择",
      multiple: true,
      options: [
        { label: "A", value: "A" },
        { label: "B", value: "B" },
      ],
    },
  },
  {
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
  {
    component: "el-checkbox-group",
    formItemProps: {
      prop: "el-checkbox-group",
      label: "el-checkbox-group",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
      ],
    },
  },
  {
    component: "el-input-number",
    formItemProps: {
      prop: "el-input-number",
      label: "el-input-number",
    },
    componentProps: {
      placeholder: "去输入",
      min: 1,
      max: 99,
      precision: 0,
      "controls-position": "right",
    },
  },
  {
    component: "el-date-picker",
    formItemProps: {
      prop: "el-date-picker",
      label: "el-date-picker",
    },
    componentProps: {
      placeholder: "去输入",
      type: "date",
    },
  },
  {
    component: "el-tree-select",
    formItemProps: {
      prop: "el-tree-select",
      label: "el-tree-select",
    },
    componentProps: {
      placeholder: "去选择",
      data: [
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "chaoyang",
              label: "朝阳",
            },
            {
              value: "tongzhou",
              label: "通州",
            },
          ],
        },
        {
          value: "xiamen",
          label: "厦门",
          children: [
            {
              value: "jimei",
              label: "集美",
            },
            {
              value: "huli",
              label: "湖里",
            },
          ],
        },
      ],
    },
  },
  {
    component: "el-time-picker",
    formItemProps: {
      prop: "el-time-picker",
      label: "el-time-picker",
    },
    componentProps: {
      placeholder: "去选择",
    },
  },
  
];

```

