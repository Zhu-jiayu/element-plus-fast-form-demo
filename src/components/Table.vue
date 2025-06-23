<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      v-for="(column, index) in tableConfig.columns"
      :key="index"
      :prop="column.field"
      :label="column.header"
    />
    <!-- 操作列等 -->
  </el-table>
</template>

<script setup>
import { defineProps } from "vue";
import { ElTable, ElTableColumn } from "element-plus";

const props = defineProps({
  tableData: {
    type: Array,
    required: true,
  },
  tableConfig: {
    type: Object,
    required: true,
  },
});
</script>
