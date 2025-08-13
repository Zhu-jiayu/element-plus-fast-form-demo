import { defineAsyncComponent } from "vue";

// 新增表单样式配置
export const attrs = {
  colProps: {
    span: 6,
  },
  rowProps: {
    gutter: 24,
  },
  formProps: {
    "label-suffix": "：",
    "label-width": "auto",
    "label-position": "top",
  },
};

export const formConfigB = [
  {
    component: defineAsyncComponent<any>(
      () => import("./components/Select/index.vue")
    ),
    formItemProps: {
      prop: "food",
      label: "食材",
    },
    defaultValue: "pork",
  },
  {
    colProps: {
      span: 6,
    },
    component: defineAsyncComponent<any>(
      () => import("./components/Radio/index.vue")
    ),
    formItemProps: {
      prop: "type",
      label: "烹饪方式",
    },
    defaultValue: "water",
  },
];
