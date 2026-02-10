import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  // 根路径重定向到「基础用法」目录下第一项（无 name 会被菜单过滤）
  { path: "/", redirect: "/basic/element" },
  { path: "", redirect: "/basic/element" },
  // 基础用法目录：子菜单为 element-plus组件、slot插槽、自定义组件、文本组件
  {
    path: "/basic",
    name: "基础用法",
    component: () =>
      import(/* webpackChunkName: "routeLayout" */ "../views/RouteLayout.vue"),
    redirect: "/basic/element",
    children: [
      {
        path: "element",
        name: "element-plus组件",
        component: () =>
          import(/* webpackChunkName: "useForm" */ "../views/useForm/index.vue"),
      },
      {
        path: "slot",
        name: "基础用法-slot插槽",
        component: () =>
          import(/* webpackChunkName: "slot" */ "../views/slot/index.vue"),
      },
      {
        path: "custom",
        name: "基础用法-自定义组件",
        component: () =>
          import(/* webpackChunkName: "custom" */ "../views/custom/index.vue"),
      },
      {
        path: "string",
        name: "文本组件",
        component: () =>
          import(/* webpackChunkName: "string" */ "../views/string/index.vue"),
      },
    ],
  },


  {
    path: "/formlist",
    name: "表单列表",
    component: () =>
      import(/* webpackChunkName: "routeLayout" */ "../views/RouteLayout.vue"),
    redirect: "/formlist/base",
    children: [
      {
        path: "base",
        name: "列表基础",
        component: () =>
          import(/* webpackChunkName: "formlist" */ "../views/formlist/index.vue"),
      },
      {
        path: "list-methods",
        name: "列表方法",
        component: () =>
          import(/* webpackChunkName: "formlistListMethods" */ "../views/formlistListMethods/index.vue"),
      },
      {
        path: "operate-display",
        name: "操作按钮展示和位置",
        component: () =>
          import(/* webpackChunkName: "formlistOperateDisplay" */ "../views/formlistOperateDisplay/index.vue"),
      },
      {
        path: "custom",
        name: "自定义操作按钮(组件)",
        component: () =>
          import(/* webpackChunkName: "formlistButtonC" */ "../views/formlistButtonC/index.vue"),
      },
      {
        path: "custom-h",
        name: "自定义操作按钮(h函数)",
        component: () =>
          import(/* webpackChunkName: "formlistButtonH" */ "../views/formlistButtonH/index.vue"),
      },

    ],
  },

  // 表单方法目录：子菜单为表单禁启用、设置组件属性、表单项增删改
  {
    path: "/form-methods",
    name: "表单方法",
    component: () =>
      import(/* webpackChunkName: "routeLayout" */ "../views/RouteLayout.vue"),
    redirect: "/form-methods/enable-disable",
    children: [
      {
        path: "enable-disable",
        name: "表单禁启用",
        component: () =>
          import(/* webpackChunkName: "formEnableDisable" */ "../views/formEnableDisable/index.vue"),
      },
      {
        path: "dynamic-options",
        name: "设置组件属性",
        component: () =>
          import(
            /* webpackChunkName: "dynamicOptions" */ "../views/dynamicOptions/index.vue"
          ),
      },
      {
        path: "set-config",
        name: "表单项增删改",
        component: () =>
          import(
            /* webpackChunkName: "setFormConfig" */ "../views/setFormConfig/index.vue"
          ),
      },
    ],
  },
  {
    path: "/linkage",
    name: "表单项联动",
    component: () =>
      import(/* webpackChunkName: "routeLayout" */ "../views/RouteLayout.vue"),
    redirect: "/linkage/hooks",
    children: [
      {
        path: "hooks",
        name: "hooks方法",
        component: () =>
          import(/* webpackChunkName: "linkage" */ "../views/linkage/index.vue"),
      },
      {
        path: "custom",
        name: "表单项联动-自定义组件",
        component: () =>
          import(/* webpackChunkName: "linkage2" */ "../views/linkage2/index.vue"),
      },
      {
        path: "slot",
        name: "表单项联动-slot插槽",
        component: () =>
          import(/* webpackChunkName: "linkage3" */ "../views/linkage3/index.vue"),
      },
    ],
  },

  // 其他表单场景目录：子菜单为表单默认值、异步表单、多表单实例
  {
    path: "/other-scenarios",
    name: "其他表单场景",
    component: () =>
      import(/* webpackChunkName: "routeLayout" */ "../views/RouteLayout.vue"),
    redirect: "/other-scenarios/default-value",
    children: [
      {
        path: "default-value",
        name: "表单默认值",
        component: () =>
          import(
            /* webpackChunkName: "defaultValue" */ "../views/defaultValue/index.vue"
          ),
      },
      {
        path: "async-form",
        name: "异步表单",
        component: () =>
          import(
            /* webpackChunkName: "setFormConfigs" */ "../views/setFormConfigs/index.vue"
          ),
      },
      {
        path: "multiple-form",
        name: "多表单实例",
        component: () =>
          import(
            /* webpackChunkName: "multipleForm" */ "../views/multipleForm/index.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL ?? "/"),
  routes,
});

export default router;
