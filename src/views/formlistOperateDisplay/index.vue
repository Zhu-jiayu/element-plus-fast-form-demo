<template>
  <div class="operate-display">
    <h3>操作按钮展示</h3>
    <p class="desc">表单列表操作按钮的展示与位置为写死配置（展示、右下、展示增加与删除）。</p>

    <FastForm>
      <template #points2="{ formValue, nestedKey, nestedProp }">
        <el-input placeholder="请输入" v-model="formValue[nestedProp][nestedKey].points2" />
      </template>
    </FastForm>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form";
import { attrs, formConfig } from "./config";

const { FastForm } = useForm({
  ...attrs,
  formConfig,
});
</script>

<style scoped>
.operate-display {
  padding: 0;
}

.desc {
  color: var(--el-text-color-secondary);
  margin-bottom: 16px;
  font-size: 14px;
}

.form-card {
  margin-bottom: 20px;
}

.form-card :deep(.el-card__body) {
  padding-top: 16px;
}
</style>
