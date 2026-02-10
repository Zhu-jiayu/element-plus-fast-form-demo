## 效果预览

<DemoFormEnableDisable />

## 示例代码

::: code-group

```vue [index.vue]
<template>
  <div class="form-enable-disable">
    <h3>表单禁启用</h3>
    <p class="desc">通过 setFormDisabled 动态切换表单的启用/禁用状态。</p>

    <FastForm />

    <el-space>
      <el-button @click="setFormDisabled(false)" type="primary">启用表单</el-button>
      <el-button @click="setFormDisabled(true)">禁用表单</el-button>
    </el-space>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form";
import { formConfig, attrs } from "./config";

const { FastForm, setFormDisabled } = useForm({
  ...attrs,
  formConfig,
});
</script>

<style scoped>
.form-enable-disable {
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
// 复用 useForm 配置，默认禁用以演示启用/禁用切换
import { attrs as useFormAttrs, formConfig as useFormConfig } from "../useForm/config";

export const attrs = {
  ...useFormAttrs,
  formProps: {
    ...useFormAttrs.formProps,
    disabled: true,
  },
};

export const formConfig = useFormConfig;

```

:::

