## 效果预览

<DemoFormlistButtonC />

## 示例代码

::: code-group

```vue [index.vue]
<template>
  <h3>自定义操作按钮(组件)</h3>
  <FastForm>
    <template #points2="{ formValue, nestedKey, nestedProp, modelValue }">
      <el-input placeholder="请输入" v-model="formValue[nestedProp][nestedKey].points2" />
    </template>
  </FastForm>

  <el-space>
    <el-button @click="submit" type="primary">提交</el-button>
    <el-button @click="reset">重置</el-button>
  </el-space>
</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form";
import { formConfig, attrs } from "./config";
import { ElMessage } from "element-plus";

const { FastForm, formValue, formRef, addItem, removeItem, setFormValue } = useForm({
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

```ts [config.ts]
import { defineAsyncComponent, h } from "vue";
import AddButton from "./components/AddButton.vue";
import DeleteButton from "./components/DeleteButton.vue";

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
      "el-input": "前端管理系统开发",
      children: [
        {
          "el-input": "张三",
          "el-radio-group": "leader",
          "points2": "负责前端架构设计",
        },
      ],
    },
  },
  showOperate: true,
  operatePosition: 'tr',
  showOperateAdd: true,
  showOperateDelete: true,
  operateButtons: {
    addButton: AddButton,
    deleteButton: DeleteButton,
  },
};

// 新增表单配置
export const formConfig = [
  {
    formItemProps: {
      prop: "children",
      label: "项目成员",
    },
    children: [
      [
        {
          component: 'span',
          formItemProps: {
          },
          componentProps: {
            style: {
              fontSize: '18px',
              marginLeft: '-90px'
            }
          },
          defaultValue: "成员信息",
          colProps: {
            span: 24,
          },
        },
        {
          component: "el-input",
          formItemProps: {
            prop: "el-input",
            label: "成员姓名",
            rules: [
              {
                required: true,
                message: "请输入成员姓名",
              },
            ],
          },
          componentProps: {
            placeholder: "请输入成员姓名",
          },
        },
        {
          component: "el-radio-group",
          formItemProps: {
            prop: "el-radio-group",
            label: "角色类型",
          },
          componentProps: {
            placeholder: "请选择角色",
            options: [
              { label: "项目经理", value: "leader" },
              { label: "开发工程师", value: "developer" },
            ],
          },
        },

        {
          component: "slot",
          formItemProps: {
            prop: "points2",
            label: "工作职责",
            rules: [
              {
                required: true,
                message: "请输入工作职责",
              },
            ],
          },
        },

        {
          colProps: {
            span: 24,
          },
          component: defineAsyncComponent<any>(
            () => import("@/components/Avatar-upload/index.vue")
          ),
          formItemProps: {
            prop: "avatar",
            label: "头像上传",
          },
          componentProps: {},
        },
      ],
    ],
  },
];

```

```vue [views/formlistButtonC/components/AddButton.vue]
<template>
    <el-button type="primary" @click="add">添加</el-button>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
    onClick: () => void;
    prop: string;
    index: number;
}>();

const add = () => {
    props.onClick();
};
</script>
```

```vue [views/formlistButtonC/components/DeleteButton.vue]
<template>
    <el-button type="danger" @click="click" v-if="props.length > 1">删除</el-button>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
    onClick: () => void;
    prop: string;
    index: number;
    length: number;
}>();

const click = () => {
    props.onClick();
};
</script>
```

:::

