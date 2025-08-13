import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "基础用法",
    component: () =>
      import(/* webpackChunkName: "useForm" */ "../views/useForm/index.vue"),
  },
  {
    path: "/defaultValue",
    name: "表单默认值",
    component: () =>
      import(
        /* webpackChunkName: "defaultValue" */ "../views/defaultValue/index.vue"
      ),
  },
  {
    path: "/slot",
    name: "slot插槽",
    component: () =>
      import(/* webpackChunkName: "slot" */ "../views/slot/index.vue"),
  },
  {
    path: "/custom",
    name: "自定义组件",
    component: () =>
      import(/* webpackChunkName: "custom" */ "../views/custom/index.vue"),
  },
  {
    path: "/string",
    name: "文本组件",
    component: () =>
      import(/* webpackChunkName: "string" */ "../views/string/index.vue"),
  },
  {
    path: "/setFormConfigs",
    name: "异步表单",
    component: () =>
      import(/* webpackChunkName: "async" */ "../views/setFormConfigs/index.vue"),
  },
  {
    path: "/formlist",
    name: "嵌套表单(表单列表)",
    component: () =>
      import(/* webpackChunkName: "formlist" */ "../views/formlist/index.vue"),
  },
  {
    path: "/multipleForm",
    name: "多表单实例",
    component: () =>
      import(
        /* webpackChunkName: "multipleForm" */ "../views/multipleForm/index.vue"
      ),
  },
  {
    path: "/dynamicOptions",
    name: "动态组件属性",
    component: () =>
      import(
        /* webpackChunkName: "dynamicOptions" */ "../views/dynamicOptions/index.vue"
      ),
  },

  {
    path: "/setFormConfig",
    name: "表单项增删改",
    component: () =>
      import(
        /* webpackChunkName: "setFormConfig" */ "../views/setFormConfig/index.vue"
      ),
  },
  {
    path: "/linkage",
    name: "表单项联动(hooks方法)",
    component: () =>
      import(/* webpackChunkName: "linkage" */ "../views/linkage/index.vue"),
  },
  {
    path: "/linkage2",
    name: "表单项联动(自定义组件)",
    component: () =>
      import(/* webpackChunkName: "linkage2" */ "../views/linkage2/index.vue"),
  },
  {
    path: "/linkage3",
    name: "表单项联动(slot)",
    component: () =>
      import(/* webpackChunkName: "linkage3" */ "../views/linkage3/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(""),
  routes,
});

export default router;
