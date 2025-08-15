
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
      label: "积分输入",
      rules: [
        {
          required: true,
          message: "请输入积分",
        },
      ],
    },
  },
  {
    component: "slot",
    formItemProps: {
      prop: "select",
      label: "会员等级",
      rules: [
        {
          required: true,
          message: "请选择会员等级",
        },
      ],
    },
  },
];
