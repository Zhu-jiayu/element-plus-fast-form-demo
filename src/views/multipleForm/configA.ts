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
      label: "el-select",
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
      label: "el-radio-group",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "1", value: "Y" },
        { label: "2", value: "N" },
      ],
    },
  },
];
