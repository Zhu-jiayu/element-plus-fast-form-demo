
// 新增表单样式配置
export const attrs = {
  colProps: {
    span: 12,
  },
  rowProps: {
    gutter: 12,
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
    component: "el-select",
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
    component: "el-cascader",
    formItemProps: {
      prop: "el-cascader",
      label: "el-cascader",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        {
          label: "艺术",
          value: "艺术",
          children: [
            {
              label: "音乐",
              value: "1-1",
            },
            {
              label: "绘画",
              value: "1-2",
            },
          ],
        },
        {
          label: "体育",
          value: "2",
          children: [
            {
              label: "足球",
              value: "2-1",
            },
            {
              label: "拳击",
              value: "2-2",
            },
          ],
        },
      ],
    },
  },
  {
    component: "el-select",
    formItemProps: {
      prop: "el-select-multiple",
      label: "el-select-multiple",
    },
    componentProps: {
      placeholder: "去选择",
      multiple: true,
      options: [
        { label: "A", value: "A" },
        { label: "B", value: "B" },
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
        { label: "是", value: "Y" },
        { label: "否", value: "N" },
      ],
    },
  },
  {
    component: "el-checkbox-group",
    formItemProps: {
      prop: "el-checkbox-group",
      label: "el-checkbox-group",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
      ],
    },
  },
 
  {
    component: "el-tree-select",
    formItemProps: {
      prop: "el-tree-select",
      label: "el-tree-select",
    },
    componentProps: {
      placeholder: "去选择",
      data: [
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "chaoyang",
              label: "朝阳",
            },
            {
              value: "tongzhou",
              label: "通州",
            },
          ],
        },
        {
          value: "xiamen",
          label: "厦门",
          children: [
            {
              value: "jimei",
              label: "集美",
            },
            {
              value: "huli",
              label: "湖里",
            },
          ],
        },
      ],
    },
  },
 
];
