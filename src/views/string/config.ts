// 新增表单样式配置
export const attrs = {
  colProps: {
    span: 8,
  },
  rowProps: {
    gutter: 24,
  },
  formProps: {
    "label-position": "right",
    "label-suffix": "：",
    "label-width": "160",
  },
  showOperate: false,
};

// 新增表单配置
export const formConfig = [
  {
    component: "span",
    formItemProps: {
      label: "年级",
    },
    componentProps: {
      style: {
        fontSize: "18px",
        color: "green",
      },
    },
    defaultValue: "一年级",
  },

  {
    formItemProps: {
      prop: "children",
      label: "children",
    },
    children: [
      [
        {
          component: "span",
          formItemProps: {
            "label-width": "0",
          },
          componentProps: {
            style: {
              fontSize: "18px",
            },
          },
          defaultValue: "一班",
          colProps: {
            span: 24,
          },
        },
        {
          component: "span",
          formItemProps: {
            label: "姓名",
          },
          defaultValue: "kun",
        },
        {
          component: "span",
          formItemProps: {
            label: "年龄",
          },
          defaultValue: "19",
        },

        {
          component: "span",
          formItemProps: {
            prop: "hobbies",
            label: "爱好",
          },
          defaultValue: "唱跳rap篮球",
        },
      ],
    ],
  },
];
