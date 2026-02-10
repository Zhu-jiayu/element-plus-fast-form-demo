<template>
  <h3>表单列表</h3>
  <FastForm>
    <template #points2="{ formValue, nestedKey, nestedProp, modelValue }">
      <el-input placeholder="请输入" v-model="formValue[nestedProp][nestedKey].points2" />
    </template>
  </FastForm>

  <el-space>
    <el-button @click="submit" type="primary">提交</el-button>
    <el-button @click="reset">重置</el-button>
    <el-button @click="setFormDisabled(false)">启用表单</el-button>
    <el-button @click="setFormDisabled(true)">禁用表单</el-button>
    <el-button @click="setFormVal">赋值</el-button>
  </el-space>
</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form";
import { formConfig, attrs } from "./config";
import { ElMessage } from "element-plus";

const { FastForm, formValue, formRef, setFormDisabled, setFormValue } = useForm({
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

const setFormVal = () => {
  setFormValue({
    "children": [
      {
        'el-input': '2', 'el-radio-group': null, points2: '3'
      }
    ]
  });
};
</script>
