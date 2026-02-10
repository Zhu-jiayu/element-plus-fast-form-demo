<template>
  <h3>自定义操作按钮(h函数)</h3>
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

const { FastForm, formValue, formRef } = useForm({
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
