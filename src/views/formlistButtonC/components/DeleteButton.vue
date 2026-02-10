<template>
    <el-button type="danger" @click="click" v-if="props.length > 1">删除</el-button>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
    onClick: () => void;
    prop: string;
    index: number;
    length: number;
}>();

const click = () => {
    props.onClick();
};
</script>