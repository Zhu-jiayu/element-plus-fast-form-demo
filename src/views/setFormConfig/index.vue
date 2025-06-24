<template>
  <h3>表单项增删改示例</h3>
  <FastForm />

  <el-space>
    <el-button @click="submit" type="primary">提交</el-button>
    <el-button @click="reset">重置</el-button>
    <el-button @click="remove">删除el-input</el-button>
    <el-button @click="add">添加el-input2</el-button>
    <el-button @click="edit">修改el-cascader必填</el-button>
  </el-space>
</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form"; 
// import { useForm } from "../../../dist/index.umd.js"; // 从构建产物引入


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
  removeFormConfig,
  addFormConfig,
  setFormConfig,
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
function remove() {
  removeFormConfig(["el-input"]);
}
function add() {
  addFormConfig(
    {
      component: "el-input",
      formItemProps: {
        prop: "el-input2",
        label: "el-input2",
        rules: [
          {
            required: true,
            message: "请填写完整",
          },
          {
            validator: (
              _rule: any,
              value: string,
              callback: (arg0?: Error | undefined) => void
            ) => {
              if (/\w/.test(value)) {
                return callback(new Error("请输入非字母数字下划线字符"));
              }
              callback();
            },
            trigger: ["change", "blur"],
          },
        ],
      },
      componentProps: {
        placeholder: "去输入",
      },
    },
    1
  );
}

function edit() {
  setFormConfig("el-cascader", {
    formItemProps: {
      rules: [
        {
          required: true,
          message: "请选择",
          trigger: "change",
        },
      ],
    },
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
