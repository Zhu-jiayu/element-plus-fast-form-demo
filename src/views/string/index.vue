<template>
  <h3>文本组件</h3>
  <FastForm />


</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form";
import { formConfig, attrs } from "./config";

const { FastForm } = useForm({
  ...attrs,
  formConfig,
});


</script>