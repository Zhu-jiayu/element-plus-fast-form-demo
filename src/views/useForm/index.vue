<template>
  <h3>基础示例</h3>
  <FastForm />

  <el-space>
    <el-button @click="submit" type="primary">提交</el-button>
    <el-button @click="reset">重置</el-button>
    <el-button @click="edit">赋值</el-button>
    <el-button @click="setFormDisabled(false)">启用表单</el-button>
    <el-button @click="setFormDisabled(true)">禁用表单</el-button>
  </el-space>
</template>

<script lang="ts" setup>
// import { useForm } from "../../../dist/index.umd.js"; // 从构建产物引入
import { useForm } from "element-plus-fast-form"; // 直接从源码引入

// import { useForm } from "element-plus-fast-form";
// const { useForm } = ElementPlusFastForm;
import { watch } from "vue";
import { formConfig, attrs } from "./config";
import { ElMessage } from "element-plus";

const {
  FastForm,
  formValue,
  formRef,
  rawFormValue,
  setFormDisabled,
  setFormValue,
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
  setFormValue({
    "el-input": "啊",
  });
}

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
