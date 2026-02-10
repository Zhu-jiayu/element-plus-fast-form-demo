## 效果预览

<DemoFormlistListMethods />

## 示例代码

::: code-group

```vue [index.vue]
<template>
  <div class="list-methods">
    <h3>列表方法</h3>
    <p class="desc">演示表单列表的添加（相同/不同表单项）与删除方法。</p>

    <FastForm>
      <template #points2="{ formValue, nestedKey, nestedProp, modelValue }">
        <el-input placeholder="请输入" v-model="formValue[nestedProp][nestedKey].points2" />
      </template>
    </FastForm>

    <el-space>
      <el-button @click="add" type="primary">添加1个相同表单</el-button>
      <el-button @click="customeAdd" type="primary">添加1个不同表单</el-button>
      <el-button @click="remove" type="primary">删除第2个</el-button>
    </el-space>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form";
import { formConfig, attrs } from "./config";

const { FastForm, addItem, removeItem } = useForm({
  ...attrs,
  formConfig,
});

const add = () => {
  addItem("children");
};

const customeAdd = () => {
  addItem("children", [
    {
      component: "el-input",
      formItemProps: {
        prop: "input2",
        label: "输入框",
        rules: [
          {
            required: true,
            message: "请输入",
          },
        ],
      },
      componentProps: {
        placeholder: "请输入",
      },
    },
  ]);
};

const remove = () => {
  removeItem("children", 1);
};
</script>

<style scoped>
.list-methods {
  padding: 0;
}
.desc {
  color: var(--el-text-color-secondary);
  margin-bottom: 16px;
  font-size: 14px;
}
</style>

```

```ts [config.ts]
// 复用表单列表基础配置，专注演示列表方法（添加相同/不同项、删除项）
export { attrs, formConfig } from "../formlist/config";

```

:::

