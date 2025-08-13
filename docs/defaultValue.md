## 效果预览

<DemoDefaultValue />

## 示例代码

::: code-group

```vue [index.vue]
<template>
  <h3>表单默认值</h3>
  <FastForm />

  <el-space>
    <el-button @click="submit" type="primary">提交</el-button>
    <el-button @click="reset">重置</el-button>
  </el-space>
</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form";

import { ref, watch, reactive } from "vue";
import { formConfig, attrs } from "./config";
import { ElMessage } from "element-plus";

const {
  FastForm,
  formValue,
  formRef,
  rawFormValue,
  setFormValue,
} = useForm({
  ...attrs,
  formConfig
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

```ts [config.ts]
const initials = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const moreOptions = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}));

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
    "label-width": "160",
    model: {
      "el-input": "123",
      "el-select": "A",
      "el-select2": "Option 1",
      "el-cascader": ["艺术", "1-1"],
      "el-select-multiple": ["A", "B"],
      "el-radio-group": "Y",
      "el-checkbox-group": ["1", "2"],
      "el-input-number": 10,
      "el-date-picker": "2021-01-01",
      "el-time-picker": "12:00:00",
      "el-tree-select": "beijing",
    },
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
      ],
    },
    componentProps: {
      placeholder: "去输入",
    },
    suffix: "%",
    defaultValue: "100",
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
        { label: "A", value: "A" },
        { label: "B", value: "B" },
      ],
      filterable: true,
    },
  },
  {
    component: "el-select-v2",
    formItemProps: {
      prop: "el-select2",
      label: "虚拟化下拉",
    },
    componentProps: {
      placeholder: "去选择",
      options: moreOptions,
      filterable: true,
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
      style: { width: "100%" },
    },
    suffix: "元",
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
      "value-format": "YYYY-MM-DD",
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
      "value-format": "HH:mm:ss",
    },
  },
];

```

:::

