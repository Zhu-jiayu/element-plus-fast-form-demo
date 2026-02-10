<template>
  <h3>基础示例</h3>
  <FastForm />

  <el-space>
    <el-button @click="submit" type="primary">提交</el-button>
    <el-button @click="reset">重置</el-button>
    <el-button @click="edit">赋值</el-button>
  </el-space>
</template>

<script lang="ts" setup>
// import { useForm } from "../../../dist/index.umd.js"; // 从构建产物引入
import { useForm } from "element-plus-fast-form";

// import { useForm } from "element-plus-fast-form";
// const { useForm } = ElementPlusFastForm;
import { ref, watch, reactive } from "vue";
import { formConfig, attrs } from "./config";
import { ElMessage } from "element-plus";

const {
  FastForm,
  formValue,
  formRef,
  rawFormValue,
  setFormValue,
} = useForm({
  ...attrs,
  formConfig
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
    "el-input": "123",
    "el-select": "A",
    "el-select2": "Option 1",
    "el-cascader": ['艺术', '1-1'],
    "el-select-multiple": ["A", "B"],
    "el-radio-group": "Y",
    "hobby": ["reading"],
    "el-input-number": 10,
    "el-date-picker": "2021-01-01",
    "el-time-picker": "12:00:00",
    "el-tree-select": "beijing",
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
