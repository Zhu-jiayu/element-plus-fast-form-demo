## 效果预览

<DemoString />

## 示例代码

### index.vue
```vue
<template>
    <h3>文本表单组件</h3>
    <FastForm>
      <template #points2="{ formValue, nestedKey }">
        <el-input
          placeholder="请输入"
          v-model="formValue[nestedKey.prop][nestedKey.key].points2"
        />
      </template>
    </FastForm>
  
    <el-space>
      <el-button @click="add" type="primary">添加1个</el-button>
      <el-button @click="remove" type="primary">删除第2个</el-button>
      <el-button @click="submit" type="primary">提交</el-button>
      <el-button @click="reset">重置</el-button>
      <el-button @click="setFormDisabled(false)">启用表单</el-button>
      <el-button @click="setFormDisabled(true)">禁用表单</el-button>
    </el-space>
  </template>
  
  <script lang="ts" setup>
  import { useForm } from "@/index";
  import { formConfig, attrs } from "./config";
  import { ElMessage } from "element-plus";
  
  const { FastForm, formValue, formRef, addItem, removeItem, setFormDisabled } = useForm({
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
  
  const add = () => {
    addItem("children");
  };
  const remove = () => {
    removeItem("children", 1);
  };
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
    "label-width": "160",
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
    component: "span",
    formItemProps: {
        label: '姓名',
    },
    componentProps: {
      style: {
        fontSize: "18px",
        color: 'green'
      },
    },
    defaultValue: "A1",
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
          formItemProps: {},
          componentProps: {
            style: {
              fontSize: "18px",
              marginLeft: "-90px",
              color: 'red'
            },
          },
          defaultValue: "标题",
          colProps: {
            span: 24,
          },
        },
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
          component: "slot",
          formItemProps: {
            prop: "points2",
            label: "slot",
            rules: [
              {
                required: true,
                message: "请填写完整",
              },
            ],
          },
        },
      ],
    ],
  },
];

```

