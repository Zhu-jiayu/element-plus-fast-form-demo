import { defineAsyncComponent } from "vue";

// 新增表单样式配置
export const attrs = {
  colProps: {
    soan: 12,
  },
  rowProps: {
    gutter: 24,
  },
  formProps: {
    "label-position": "right",
    "label-suffix": "：",
    "label-width": "auto",
  },
};

// 新增表单配置
export const formConfig = [
  {
    component: defineAsyncComponent<any>(
      () => import("@/components/Avatar-upload/index.vue")
    ),
    formItemProps: {
      prop: "avatar",
      label: "头像",
    },
    componentProps: {},
  },
  {
    component: defineAsyncComponent<any>(
      () => import("@/components/Select/index.vue")
    ),
    formItemProps: {
      prop: "select",
      label: "select",
    },
    defaultValue: "female",
  },
  {
 
    component: defineAsyncComponent<any>(
      () => import("@/components/Radio/index.vue")
    ),
    formItemProps: {
      prop: "radio-group",
      label: "radio-group",
    },
    defaultValue: "A",
  },
];
