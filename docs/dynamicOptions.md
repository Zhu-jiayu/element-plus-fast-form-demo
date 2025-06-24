## 效果预览

<DemoDynamicOptions />

## 示例代码

### index.vue
```vue
<template>
  <h3>动态组件属性</h3>
  <FastForm />

  <el-space>
    <el-button @click="submit" type="primary">提交</el-button>
    <el-button @click="reset">重置</el-button>
    <el-button @click="edit">设置options</el-button>
    <el-button @click="disabled">设置第2个disabled</el-button>
    <el-button @click="required">设置第3个必填</el-button>
  </el-space>
</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form"; 

import { formConfig, attrs } from "./config";
import { ElMessage } from "element-plus";

const {
  FastForm,
  formValue,
  formRef,
  rawFormValue,
  setComponentProps,
  setFormConfig,
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
  // Select
  setComponentProps("el-select", {
    options: [
      { label: "选项1", value: "option1" },
      { label: "选项2", value: "option2" },
      { label: "选项3", value: "option3" },
    ],
  });

  // Cascader
  setComponentProps("el-cascader", {
    options: [
      {
        label: "选项1",
        value: "选项1",
        children: [
          {
            label: "选项1-1",
            value: "1-1",
          },
          {
            label: "选项1-2",
            value: "1-2",
          },
        ],
      },
      {
        label: "选项2",
        value: "2",
        children: [
          {
            label: "选项2-1",
            value: "2-1",
          },
          {
            label: "选项2-2",
            value: "2-2",
          },
        ],
      },
    ],
  });

  // Checkbox Group
  setComponentProps("el-checkbox-group", {
    options: [
      { label: "选项1", value: "option1" },
      { label: "选项2", value: "option2" },
      { label: "选项3", value: "option3" },
    ],
  });

  // Radio Group
  setComponentProps("el-radio-group", {
    options: [
      { label: "选项A", value: "A" },
      { label: "选项B", value: "B" },
      { label: "选项C", value: "C" },
    ],
  });

  // Tree Select
  setComponentProps("el-tree-select", {
    data: [
      {
        label: "选项1",
        value: "1",
        children: [
          {
            label: "选项1-1",
            value: "1-1",
          },
          {
            label: "选项1-2",
            value: "1-2",
          },
        ],
      },
      {
        label: "选项2",
        value: "2",
        children: [
          {
            label: "选项2-1",
            value: "2-1",
          },
          {
            label: "选项2-2",
            value: "2-2",
          },
        ],
      },
    ],
  });
  setComponentProps("el-select-multiple", {
    options: [
      { label: "A", value: "A" },
      { label: "B", value: "B" },
      { label: "C", value: "C" },
    ],
  });
}

function disabled() {
  setComponentProps("el-cascader", { disabled: true });
}

function required() {
  setFormConfig("el-select-multiple", {
    formItemProps: {
      rules: [
        {
          required: true,
          message: "请选择一个选项",
          trigger: "change",
        },
      ],
    },
  });
}
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
    gutter: 12,
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
 
];

```

