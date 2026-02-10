<template>
  <h3>异步表单示例</h3>
  <el-divider>setFormConfigs 配置</el-divider>
  <div v-if="count > 0">{{ count }}s后渲染表单</div>
  <el-button @click="setFormConfigs(formConfig2)">setFormConfigs</el-button>
  <FastForm1 />
  <el-divider>响应式数据配置</el-divider>

  <div v-if="count2 > 0">{{ count2 }}s后渲染表单</div>

  <FastForm2 />
</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form";

import { ref, reactive } from "vue";
import { formConfig, attrs, formConfig2 } from "./config";


const {
  FastForm: FastForm1,
  setFormConfigs
} = useForm({
  ...attrs,
  formConfig: []
});
const count = ref(3);

const timer = setInterval(() => {
  count.value--;
  if (count.value === 0) {
    clearInterval(timer);
    setFormConfigs(formConfig);
  }
}, 1000);



const formConfigReactive = reactive({
  ...attrs,
  formConfig: []
});
const {
  FastForm: FastForm2,
} = useForm(formConfigReactive);

const count2 = ref(5);

const timer2 = setInterval(() => {
  count2.value--;
  if (count2.value === 0) {
    clearInterval(timer2);
    formConfigReactive.formConfig = formConfig;
  }
}, 1000);
</script>
