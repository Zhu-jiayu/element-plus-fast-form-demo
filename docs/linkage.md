## 效果预览

<DemoLinkage />

## 示例代码

::: code-group

```vue [index.vue]
<template>
  <h3>表单项联动示例(hooks方法)</h3>
  <FastForm />
  <el-space>
    <el-button @click="submit" type="primary">提交</el-button>
    <el-button @click="reset">重置</el-button>
  </el-space>

</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form";

import { formConfigA, attrs, } from "./config";
import { ElMessage } from "element-plus";
import { watch, ref } from "vue";

// hooks方法-表单项联动
const { FastForm, formValue, formRef, rawFormValue, setFormConfig } = useForm({
  ...attrs,
  formConfig: formConfigA,
});
const submit = () => {
  if (formRef.value) {
    formRef.value.validate((valid: boolean) => {
      if (valid) {
        ElMessage.warning("查看控制台");
        console.log({ rawFormValue });
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
  () => formValue["food"],
  async (newVal) => {
    console.log("value changed:", newVal);
    if (newVal === "pork") {
      setFormConfig("type", {
        componentProps: {
          options: [
            { label: "bbq", value: "bbq" },
            { label: "水煮", value: "water" },
          ],
        },
        formItemProps: {
          rules: [
            {
              required: false,
              message: "请选择",
              trigger: "change",
            },
          ],
        },
        defaultValue: "bbq",
      });

      setFormConfig("package", {
        componentProps: {
          disabled: true,
        },
        defaultValue: "box",
      });
    } else {
      setFormConfig("type", {
        componentProps: {
          options: [
            { label: "bbq", value: "bbq" },
            { label: "水煮", value: "water" },
            { label: "油炸", value: "oil" },
            { label: "清蒸", value: "steam" },
          ],
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: "请选择",
              trigger: "change",
            },
          ],
        },
        defaultValue: "steam",
      });

      setFormConfig("package", {
        componentProps: {
          disabled: false,
        },
        defaultValue: "paper",
      });
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
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

export const formConfigA = [
  {
    colProps: {
      span: 12,
    },
    component: "el-select",
    defaultValue: "pork",
    formItemProps: {
      prop: "food",
      label: "食材",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "猪肉", value: "pork" },
        { label: "牛肉", value: "beef" },
      ],
    },
  },

  {
    colProps: {
      span: 12,
    },
    // defaultValue: "water",
    component: "el-radio-group",
    formItemProps: {
      prop: "type",
      label: "烹饪方式",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "bbq", value: "bbq" },
        { label: "水煮", value: "water" },
      ],
    },
  },

  {
    colProps: {
      span: 12,
    },
    component: "el-select",
    formItemProps: {
      prop: "package",
      label: "包装",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "纸包", value: "paper" },
        { label: "盒装", value: "box" },
      ],
    },
  },
];

```

:::

