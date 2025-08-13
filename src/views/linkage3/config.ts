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

export const formConfigC = [
  {
    colProps: {
      span: 12,
    },
    component: "slot",
    defaultValue: "pork",
    formItemProps: {
      prop: "food",
      label: "食材",
    },
  },

  {
    colProps: {
      span: 12,
    },
    defaultValue: "water",
    component: "slot",
    formItemProps: {
      prop: "type",
      label: "烹饪方式",
    },
  },
];
