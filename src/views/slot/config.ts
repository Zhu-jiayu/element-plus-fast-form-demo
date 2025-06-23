
// 新增表单样式配置
export const attrs = {
  colProps: {
    span: 12,
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
    component: "slot",
    formItemProps: {
      prop: "points",
      label: "points",
      rules: [
        {
          required: true,
          message: "请填写完整",
        },
      ],
    },
  },
  {
    component: "slot",
    formItemProps: {
      prop: "select",
      label: "select",
      rules: [
        {
          required: true,
          message: "请选择",
        },
      ],
    },
  },
];
