<template>
  <h3>表单列表</h3>
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
  </el-space>
</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form";
import { formConfig, attrs } from "./config";
import { ElMessage } from "element-plus";

const { FastForm, formValue, formRef, addItem, removeItem } = useForm({
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
