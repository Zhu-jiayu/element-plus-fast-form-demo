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
    "model": {
      'el-select': 'female'
    }
  },
};

// 新增表单配置
export const formConfig = [
  {
    component: "el-select",
    defaultValue: "male",
    formItemProps: {
      prop: "el-select",
      label: "性别",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "男", value: "male" },
        { label: "女", value: "female" },
      ],
    },
  },

  {
    component: "el-radio-group",
    formItemProps: {
      prop: "el-radio-group",
      label: "工作年限",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "1-3年", value: "junior" },
        { label: "3-5年", value: "middle" },
        { label: "5年以上", value: "senior" },
      ],
    },
  },
];
