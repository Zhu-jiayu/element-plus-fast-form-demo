<template>
    <el-button type="primary" @click="add">添加</el-button>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
    onClick: () => void;
    prop: string;
    index: number;
}>();

const add = () => {
    props.onClick();
};
</script>