import { defineAsyncComponent } from "vue";

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
    "label-width": "160",
  },
};

// 新增表单配置
export const formConfig = [
  {
    component: "el-input",
    formItemProps: {
      prop: "el-input",
      label: "el-input",
      rules: [
        {
          required: true,
          message: "请填写完整",
        },
        {
          validator: (
            _rule: any,
            value: string,
            callback: (arg0?: Error | undefined) => void
          ) => {
            if (/\w/.test(value)) {
              return callback(new Error("请输入非字母数字下划线字符"));
            }
            callback();
          },
          trigger: ["change", "blur"],
        },
      ],
    },
    componentProps: {
      placeholder: "去输入",
    },
  },



  {
    formItemProps: {
      prop: "children",
      label: "children",
    },
    children: [
      [
        {
          component: "el-input",
          formItemProps: {
            prop: "el-input",
            label: "el-input",
            rules: [
              {
                required: true,
                message: "请填写完整",
              },
            ],
          },
          componentProps: {
            placeholder: "去输入",
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
          component: "slot",
          formItemProps: {
            prop: "points2",
            label: "slot",
            rules: [
              {
                required: true,
                message: "请填写完整",
              },
            ],
          },
        },

        {
          colProps: {
            span: 24,
          },
          component: defineAsyncComponent<any>(
            () => import("@/components/Avatar-upload/index.vue")
          ),
          formItemProps: {
            prop: "avatar",
            label: "头像",
          },
          componentProps: {},
        },
      ],
    ],
  },
];
