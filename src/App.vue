<template>
  <el-container class="container">
    <el-header class="header">
      <div>
        <h2>FastComponent</h2>
        <el-text>基于Vue3 Composition api和element plus表单组件封装</el-text>
      </div>
    </el-header>

    <el-container>
      <el-aside width="150px">
        <el-menu
          class="el-menu-vertical"
          @select="menuSelect"
          :default-active="activePath"
        >
          <el-menu-item v-for="i in routes" :index="i.path" :key="i.name">
            <span>{{ i.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { routes } from "./router";
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const activePath = ref("");
watch(
  () => route.path,
  (newpath) => {
    activePath.value = newpath;
  },
  { immediate: true }
);
function menuSelect(index) {
  activePath.value = index;
  router.push(index);
}
</script>
<style lang="scss" scoped>
@import "./normalize.css";
.container {
  height: 100vh;
}
.header {
  border-bottom: 1px solid var(--el-border-color);
  & > div {
    display: flex;
    align-items: center;
    height: 100%;
    & > * {
      margin-right: 10px;
    }
  }
}
.el-menu-vertical {
  height: 100%;
}
</style>
