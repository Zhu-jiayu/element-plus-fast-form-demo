<template>
  <h3>表单项联动示例(自定义组件)</h3>
  <FastFormB />
  <el-space>
    <el-button @click="submitB" type="primary">提交</el-button>
    <el-button @click="resetB">重置</el-button>
  </el-space>
</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form";

import { attrs, formConfigB } from "./config";
import { ElMessage } from "element-plus";



// 自定义组件-表单项联动
const {
  FastForm: FastFormB,
  rawFormValue: rawFormValueB,
  formRef: formRefB,
} = useForm({
  ...attrs,
  formConfig: formConfigB,
});

const submitB = () => {
  if (formRefB.value) {
    formRefB.value.validate((valid: boolean) => {
      if (valid) {
        ElMessage.warning("查看控制台");
        console.log({ rawFormValueB });
      }
    });
  }
};
const resetB = () => {
  if (formRefB.value) {
    formRefB.value.resetFields();
  }
};

</script>
