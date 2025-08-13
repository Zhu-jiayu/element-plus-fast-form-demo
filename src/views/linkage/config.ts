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

export const formConfigA = [
  {
    colProps: {
      span: 12,
    },
    component: "el-select",
    defaultValue: "pork",
    formItemProps: {
      prop: "food",
      label: "食材",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "猪肉", value: "pork" },
        { label: "牛肉", value: "beef" },
      ],
    },
  },

  {
    colProps: {
      span: 12,
    },
    // defaultValue: "water",
    component: "el-radio-group",
    formItemProps: {
      prop: "type",
      label: "烹饪方式",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "bbq", value: "bbq" },
        { label: "水煮", value: "water" },
      ],
    },
  },

  {
    colProps: {
      span: 12,
    },
    component: "el-select",
    formItemProps: {
      prop: "package",
      label: "包装",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "纸包", value: "paper" },
        { label: "盒装", value: "box" },
      ],
    },
  },
];
