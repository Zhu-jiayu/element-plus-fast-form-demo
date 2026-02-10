## 效果预览

<DemoString />

## 示例代码

::: code-group

```vue [index.vue]
<template>
  <h3>文本组件</h3>
  <FastForm />


</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form";
import { formConfig, attrs } from "./config";

const { FastForm } = useForm({
  ...attrs,
  formConfig,
});


</script>
```

```ts [config.ts]
// 新增表单样式配置
export const attrs = {
  colProps: {
    span: 8,
  },
  rowProps: {
    gutter: 24,
  },
  formProps: {
    "label-position": "right",
    "label-suffix": "：",
    "label-width": "160",
  },
  showOperate: false,
};

// 新增表单配置
export const formConfig = [
  {
    component: "span",
    formItemProps: {
      label: "年级",
    },
    componentProps: {
      style: {
        fontSize: "18px",
        color: "green",
      },
    },
    defaultValue: "一年级",
  },

  {
    formItemProps: {
      prop: "children",
      label: "children",
    },
    children: [
      [
        {
          component: "span",
          formItemProps: {
            "label-width": "0",
          },
          componentProps: {
            style: {
              fontSize: "18px",
            },
          },
          defaultValue: "一班",
          colProps: {
            span: 24,
          },
        },
        {
          component: "span",
          formItemProps: {
            label: "姓名",
          },
          defaultValue: "kun",
        },
        {
          component: "span",
          formItemProps: {
            label: "年龄",
          },
          defaultValue: "19",
        },

        {
          component: "span",
          formItemProps: {
            prop: "hobbies",
            label: "爱好",
          },
          defaultValue: "唱跳rap篮球",
        },
      ],
    ],
  },
];

```

:::

